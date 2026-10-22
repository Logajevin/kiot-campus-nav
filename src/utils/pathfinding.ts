import type { CampusEdge, CampusNode, NavigationStep, RouteResult } from '../types/navigation';

export function calculateShortestRoute(
  nodes: Record<string, CampusNode>,
  edges: CampusEdge[],
  startId: string,
  destinationId: string,
  accessibleOnly: boolean = false
): RouteResult | null {
  if (!nodes[startId] || !nodes[destinationId]) {
    return null;
  }

  if (startId === destinationId) {
    const startNode = nodes[startId];
    return {
      path: [startId],
      nodes: [startNode],
      totalDistanceMeters: 0,
      estimatedMinutes: 0,
      steps: [
        {
          instruction: `You are already at ${startNode.name}.`,
          distanceMeters: 0,
          nodeId: startId,
          type: 'arrival',
          floor: startNode.floor,
        },
      ],
    };
  }

  // Build Adjacency Graph
  const adjacency: Record<string, { target: string; distance: number; edge: CampusEdge }[]> = {};

  for (const edge of edges) {
    // If wheelchair accessible mode is enabled, avoid staircases
    if (accessibleOnly && edge.isStaircase) {
      continue;
    }

    if (!adjacency[edge.source]) adjacency[edge.source] = [];
    if (!adjacency[edge.target]) adjacency[edge.target] = [];

    adjacency[edge.source].push({ target: edge.target, distance: edge.distanceMeters, edge });
    adjacency[edge.target].push({ target: edge.source, distance: edge.distanceMeters, edge });
  }

  // Dijkstra Algorithm
  const distances: Record<string, number> = {};
  const previous: Record<string, { nodeId: string; edge: CampusEdge } | null> = {};
  const unvisited = new Set<string>();

  for (const nodeId in nodes) {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    unvisited.add(nodeId);
  }
  distances[startId] = 0;

  while (unvisited.size > 0) {
    // Pick unvisited node with lowest distance
    let currentId: string | null = null;
    let smallest = Infinity;
    for (const id of unvisited) {
      if (distances[id] < smallest) {
        smallest = distances[id];
        currentId = id;
      }
    }

    if (!currentId || currentId === destinationId || distances[currentId] === Infinity) {
      break;
    }

    unvisited.delete(currentId);

    const neighbors = adjacency[currentId] || [];
    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor.target)) continue;

      const alt = distances[currentId] + neighbor.distance;
      if (alt < distances[neighbor.target]) {
        distances[neighbor.target] = alt;
        previous[neighbor.target] = { nodeId: currentId, edge: neighbor.edge };
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  const edgeSequence: CampusEdge[] = [];
  let curr: string | null = destinationId;

  while (curr && curr !== startId) {
    path.unshift(curr);
    const prevItem: { nodeId: string; edge: CampusEdge } | null = previous[curr] ?? null;
    if (prevItem) {
      edgeSequence.unshift(prevItem.edge);
      curr = prevItem.nodeId;
    } else {
      break;
    }
  }

  if (curr === startId) {
    path.unshift(startId);
  } else {
    // No route found
    return null;
  }

  const pathNodes = path.map((id) => nodes[id]);
  const totalDistanceMeters = distances[destinationId];

  // Walking speed approx 1.2 m/sec = 72 m/min + extra 30 sec for floor vertical transfers
  const baseMinutes = totalDistanceMeters / 70;
  const verticalPenaltyMinutes = edgeSequence.filter((e) => e.isElevator || e.isStaircase).length * 0.5;
  const estimatedMinutes = Math.max(1, Math.round(baseMinutes + verticalPenaltyMinutes));

  // Generate Step-by-Step Instructions
  const steps: NavigationStep[] = [];

  steps.push({
    instruction: `Depart from ${nodes[startId].name}`,
    distanceMeters: 0,
    nodeId: startId,
    type: 'start',
    floor: nodes[startId].floor,
  });

  for (let i = 0; i < pathNodes.length - 1; i++) {
    const from = pathNodes[i];
    const to = pathNodes[i + 1];
    const edge = edgeSequence[i];

    if (edge.isElevator) {
      steps.push({
        instruction: `Take the elevator from Floor ${from.floor} to Floor ${to.floor} in ${to.buildingName}`,
        distanceMeters: edge.distanceMeters,
        nodeId: to.id,
        type: 'elevator',
        floor: to.floor,
      });
    } else if (edge.isStaircase) {
      steps.push({
        instruction: `Take the stairs up to Floor ${to.floor} in ${to.buildingName}`,
        distanceMeters: edge.distanceMeters,
        nodeId: to.id,
        type: 'stairs',
        floor: to.floor,
      });
    } else if (from.buildingId !== to.buildingId && to.type === 'entrance') {
      steps.push({
        instruction: `Enter ${to.buildingName} via ${to.name}`,
        distanceMeters: edge.distanceMeters,
        nodeId: to.id,
        type: 'straight',
        floor: to.floor,
      });
    } else {
      steps.push({
        instruction: `Head toward ${to.name} (${Math.round(edge.distanceMeters)}m)`,
        distanceMeters: edge.distanceMeters,
        nodeId: to.id,
        type: 'straight',
        floor: to.floor,
      });
    }
  }

  const destNode = nodes[destinationId];
  steps.push({
    instruction: `You have arrived at your destination: ${destNode.name} (Floor ${destNode.floor}, ${destNode.buildingName})`,
    distanceMeters: 0,
    nodeId: destinationId,
    type: 'arrival',
    floor: destNode.floor,
  });

  return {
    path,
    nodes: pathNodes,
    totalDistanceMeters: Math.round(totalDistanceMeters),
    estimatedMinutes,
    steps,
  };
}
