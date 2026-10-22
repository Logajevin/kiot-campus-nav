export type Category = 
  | 'academic'
  | 'lab'
  | 'admin'
  | 'hostel'
  | 'canteen'
  | 'sports'
  | 'amenity'
  | 'transport';

export type NodeType = 
  | 'building'
  | 'room'
  | 'lab'
  | 'office'
  | 'staircase'
  | 'elevator'
  | 'entrance'
  | 'junction'
  | 'amenity';

export interface CampusNode {
  id: string;
  name: string;
  shortCode?: string;
  category: Category;
  type: NodeType;
  buildingId: string;
  buildingName: string;
  floor: number; // 0 = Ground, 1 = 1st, 2 = 2nd, etc.
  coordinates: [number, number]; // [lat, lng]
  indoorCoordinates?: { x: number; y: number }; // For 2D indoor floorplan (0 to 100 percentage)
  description?: string;
  keywords: string[];
  isAccessible: boolean;
  qrCodeId?: string;
  facultyIncharge?: string;
}

export interface CampusEdge {
  id: string;
  source: string;
  target: string;
  distanceMeters: number;
  isStaircase?: boolean;
  isElevator?: boolean;
  isOutdoor?: boolean;
  description?: string;
}

export interface CampusBuilding {
  id: string;
  name: string;
  tamilName?: string;
  code: string;
  category: Category;
  center: [number, number];
  polygon: [number, number][];
  floorsCount: number;
  floors: {
    floorNumber: number;
    floorName: string;
    description: string;
  }[];
  description: string;
  departments: string[];
  head: string;
  contact?: string;
}

export interface NavigationStep {
  instruction: string;
  distanceMeters: number;
  nodeId: string;
  type: 'start' | 'straight' | 'turn-left' | 'turn-right' | 'stairs' | 'elevator' | 'arrival';
  floor?: number;
}

export interface RouteResult {
  path: string[];
  nodes: CampusNode[];
  totalDistanceMeters: number;
  estimatedMinutes: number;
  steps: NavigationStep[];
}
