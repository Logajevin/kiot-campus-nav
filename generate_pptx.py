import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # 16:9 widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_slide_layout = prs.slide_layouts[6]

    # Colors
    c_dark_navy = RGBColor(15, 30, 54)     # #0F1E36
    c_blue_primary = RGBColor(30, 64, 175) # #1E40AF
    c_blue_light = RGBColor(239, 246, 255) # #EFF6FF
    c_text_dark = RGBColor(30, 41, 59)     # #1E293B
    c_text_muted = RGBColor(100, 116, 139) # #64748B
    c_white = RGBColor(255, 255, 255)
    c_accent_cyan = RGBColor(14, 165, 233) # #0EA5E9
    c_card_bg = RGBColor(248, 250, 252)    # #F8FAFC
    c_card_border = RGBColor(226, 232, 240)

    # Helper: Add Footer
    def add_footer(slide, slide_num_str):
        tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.0), Inches(11.733), Inches(0.4))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_top = Inches(0)
        p = tf.paragraphs[0]
        p.text = f"CAMPUS NAVIGATION SYSTEM  |  FINAL PRESENTATION                         {slide_num_str}"
        p.font.size = Pt(9)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_muted
        p.font.bold = True

    # Helper: Add Standard Slide Header
    def add_slide_header(slide, title_text, category="CAPSTONE PROJECT"):
        # Top banner / accent line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.6), Inches(0.4), Inches(0.08))
        line.fill.solid()
        line.fill.fore_color.rgb = c_accent_cyan
        line.line.color.rgb = c_accent_cyan

        tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.733), Inches(0.9))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_top = Inches(0)
        tf.margin_left = Inches(0)

        p_cat = tf.paragraphs[0]
        p_cat.text = category.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.name = "Arial"
        p_cat.font.color.rgb = c_blue_primary

        p_title = tf.add_paragraph()
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.name = "Arial"
        p_title.font.color.rgb = c_dark_navy

    # ==========================================
    # SLIDE 1: Title Slide
    # ==========================================
    s1 = prs.slides.add_slide(blank_slide_layout)
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = c_dark_navy
    bg1.line.color.rgb = c_dark_navy

    # Inner decorative accent
    dec = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.8), Inches(0.12), Inches(5.9))
    dec.fill.solid()
    dec.fill.fore_color.rgb = c_accent_cyan
    dec.line.color.rgb = c_accent_cyan

    tb1 = s1.shapes.add_textbox(Inches(1.2), Inches(0.8), Inches(11.0), Inches(5.9))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "CAPSTONE PROJECT"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = c_accent_cyan

    p = tf1.add_paragraph()
    p.text = "CAMPUS NAVIGATION AND WAYFINDING SYSTEM"
    p.font.size = Pt(30)
    p.font.bold = True
    p.font.color.rgb = c_white
    p.space_before = Pt(8)
    p.space_after = Pt(4)

    p = tf1.add_paragraph()
    p.text = "Data Structures and Algorithms • Graph Theory & Shortest Path Navigation"
    p.font.size = Pt(15)
    p.font.color.rgb = RGBColor(191, 219, 254)
    p.space_after = Pt(24)

    p = tf1.add_paragraph()
    p.text = "Presented by:"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = c_white

    team = [
        "Sanjeev K              (Reg. No: 611225105046)",
        "Dineshraj S S       (Reg. No: 611225105009)",
        "Gokul P                 (Reg. No: 611225105011)",
        "Logajevin K           (Reg. No: 611225105026)"
    ]
    for mem in team:
        p_mem = tf1.add_paragraph()
        p_mem.text = f"•  {mem}"
        p_mem.font.size = Pt(12)
        p_mem.font.color.rgb = RGBColor(226, 232, 240)

    p_info = tf1.add_paragraph()
    p_info.text = "\nDepartment: Computer Science and Engineering\nFaculty In-charge: Prof. R. Krishnakumar, M.E., (Ph.D)., Assistant Professor\nHead of Department: Prof. T. Karthikeyan, M.S., (Ph.D)., Associate Professor\nKnowledge Institute of Technology (An Autonomous), Salem – 637 504"
    p_info.font.size = Pt(11)
    p_info.font.color.rgb = RGBColor(148, 163, 184)

    # ==========================================
    # SLIDE 2: Project Overview
    # ==========================================
    s2 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s2, "Project Overview")
    add_footer(s2, "02")

    box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s2 = [
        "A responsive, interactive campus navigation web application engineered for Knowledge Institute of Technology (KIOT), Kakapalayam, Salem.",
        "Accurately maps the multi-acre campus infrastructure including Academic Blocks (CSE, ECE, Mech, Civil), Admin Block, KBSS MBA School, Central Library, Hostels, and Cafeteria.",
        "Implements hybrid outdoor and indoor wayfinding, allowing seamless switching across building floors (Ground to 3rd Floor).",
        "Computes optimal shortest paths between any two locations using Dijkstra's algorithm and spatial graph modeling.",
        "Provides wheelchair/step-free accessibility routing and physical QR code 'You Are Here' origin resolution.",
        "Demonstrates core Data Structures and Algorithms: Weighted Graphs, Adjacency Lists, Priority Queues, and client-side graph traversal."
    ]
    for i, it in enumerate(items_s2):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(15)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(14)

    # ==========================================
    # SLIDE 3: Problem Statement
    # ==========================================
    s3 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s3, "Problem Statement")
    add_footer(s3, "03")

    box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s3 = [
        "Standard commercial GPS applications (like Google Maps) fail inside multi-storey concrete campus buildings due to signal obstruction and indoor blindspots.",
        "First-year students, parents, visiting recruiters, and symposium delegates struggle to locate specific laboratories, faculty cabins, and interview rooms.",
        "Lack of indoor floor-level visualization causes confusion during large-scale placement drives and conferences.",
        "Conventional navigation lacks step-free / accessibility options, making navigation difficult for physically challenged visitors requiring elevators or ramps.",
        "A dedicated digital campus navigation system provides precise spatial mapping, multi-floor routing, and instant QR-based localization."
    ]
    for i, it in enumerate(items_s3):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(15)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(16)

    # ==========================================
    # SLIDE 4: Objectives
    # ==========================================
    s4 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s4, "Objectives")
    add_footer(s4, "04")

    box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s4 = [
        "Digitize and model the KIOT campus layout as a weighted, undirected spatial graph G = (V, E).",
        "Implement Dijkstra's shortest path algorithm to calculate real-time walking routes with meter-level distance and time estimates.",
        "Provide an interactive multi-floor indoor blueprint viewer supporting Ground, 1st, 2nd, and 3rd floors.",
        "Implement a Wheelchair / Step-Free Accessible mode that bypasses staircases in favor of elevators and ground ramps.",
        "Integrate physical QR Code scanning ('You Are Here') to pinpoint user position instantly without expensive indoor beacons.",
        "Deliver a lightweight, zero-cost web application accessible on all mobile browsers via GitHub Pages."
    ]
    for i, it in enumerate(items_s4):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(15)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(14)

    # ==========================================
    # SLIDE 5: Scope and Features
    # ==========================================
    s5 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s5, "Scope and Features")
    add_footer(s5, "05")

    box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s5 = [
        "Interactive 2D Campus Map: OpenStreetMap cartography with polygon overlays for all KIOT blocks, hostels, cafeteria, and parking bays.",
        "Multi-Floor Indoor Schematics: Dynamic floor switching for CSE/IT block, Admin block, KBSS MBA block, and Central Library.",
        "Step-by-Step Turn-by-Turn Guidance: Clear directions ('Head straight 60m', 'Take elevator to Floor 2') with interactive step progression.",
        "Smart Search & Directory: Instant search by department name, laboratory code, faculty in-charge, or student amenity (ATM, Xerox, Medical Clinic).",
        "QR Code Origin Resolution: Scan corridor QR stickers to set starting location instantly.",
        "Campus Emergency Helpdesk: One-touch quick dialing for 24/7 Security Desk, Campus Medical Clinic, and Transport Bay."
    ]
    for i, it in enumerate(items_s5):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(15)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(14)

    # ==========================================
    # SLIDE 6: Tools and Technologies
    # ==========================================
    s6 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s6, "Tools and Technologies")
    add_footer(s6, "06")

    box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s6 = [
        "Frontend Framework: React 19 (Component-driven architecture, reactive state hooks).",
        "Programming Language: TypeScript (Strict static typing, interfaces for nodes, edges, and routes).",
        "Build & Bundler Tool: Vite 8 (Ultra-fast development server and optimized production packaging).",
        "Mapping & GIS Engine: Leaflet.js & React-Leaflet with OpenStreetMap tiles and custom GeoJSON polygon layers.",
        "Styling & UI Library: Tailwind CSS v4 (Mobile-first responsive styling) and Lucide React icons.",
        "Core Algorithms & Data Structures: Weighted Undirected Graph, Adjacency Lists, Priority Queues, Dijkstra's Algorithm.",
        "Hosting & Deployment: Institutional Web Server / Campus Intranet."
    ]
    for i, it in enumerate(items_s6):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(14.5)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(12)

    # ==========================================
    # SLIDE 7: System Workflow
    # ==========================================
    s7 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s7, "System Workflow")
    add_footer(s7, "07")

    # Workflow pill box
    pbox = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(1.1))
    pbox.fill.solid()
    pbox.fill.fore_color.rgb = c_blue_primary
    pbox.line.color.rgb = c_blue_primary
    ptf = pbox.text_frame
    ptf.margin_top = Inches(0.3)
    p_flow = ptf.paragraphs[0]
    p_flow.text = "Start  →  Scan QR / Select Origin  →  Select Destination  →  Compute Shortest Route  →  Render Path & Directions  →  Arrival"
    p_flow.font.size = Pt(14.5)
    p_flow.font.bold = True
    p_flow.font.color.rgb = c_white
    p_flow.alignment = PP_ALIGN.CENTER

    box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.2), Inches(11.733), Inches(3.5))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.3)

    items_s7 = [
        "Initialize spatial graph network containing campus gates, building entrances, stairwells, elevators, and rooms.",
        "User establishes current starting location by tapping a map node, searching the directory, or scanning a corridor QR code.",
        "User chooses target destination (e.g., AI & DS Lab, Principal's Office, Central Canteen).",
        "Pathfinding engine triggers Dijkstra's algorithm over the adjacency list, pruning stair edges if Step-Free mode is active.",
        "Interactive navigation polyline and turn-by-turn guidance drawer render in real-time.",
        "User steps through route instructions with interactive progress indicators and arrival confirmation."
    ]
    for i, it in enumerate(items_s7):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(14)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(10)

    # ==========================================
    # SLIDE 8: Data Structure Used
    # ==========================================
    s8 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s8, "Data Structure Used")
    add_footer(s8, "08")

    box = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s8 = [
        "Weighted Undirected Graph G = (V, E): Vertices V represent physical locations (rooms, labs, entrance porches, stair landings); edges E represent walkable corridors and walkways.",
        "Adjacency List: Stores connections for each node with edge weights (distances in meters). Space complexity is O(V + E), providing optimal memory efficiency for sparse spatial networks.",
        "Priority Queue / Min-Heap: Powers Dijkstra's algorithm to greedily extract the unvisited node with the smallest cumulative distance in O(log V) time.",
        "Hash Map (Key-Value Dictionary): Enables O(1) constant-time direct retrieval of nodes by unique identifier (e.g., 'cse_f2_aids_lab') and QR code tokens.",
        "Dynamic Arrays (Polylines): Stores ordered sequences of latitude/longitude coordinates for rendering SVG and Leaflet map paths."
    ]
    for i, it in enumerate(items_s8):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(15)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(14)

    # ==========================================
    # SLIDE 9: Sample Record / Graph Node Design
    # ==========================================
    s9 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s9, "Sample Graph Node & Edge Design")
    add_footer(s9, "09")

    # Left card: Sample Node
    c1 = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(5.7), Inches(4.8))
    c1.fill.solid()
    c1.fill.fore_color.rgb = c_card_bg
    c1.line.color.rgb = c_card_border
    tf1 = c1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = Inches(0.4)
    tf1.margin_top = Inches(0.3)

    p = tf1.paragraphs[0]
    p.text = "SAMPLE CAMPUS NODE (VERTEX)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = c_blue_primary
    p.space_after = Pt(10)

    node_data = [
        "Node ID: 'cse_f2_aids_lab'",
        "Name: 'AI & Data Science (AI-DS) Lab'",
        "Building: 'CSE, IT & AI Academic Block'",
        "Floor: 2 (Second Floor)",
        "Category: 'lab' | Type: 'room'",
        "Coordinates: [11.552700, 78.018500]",
        "Indoor Coordinates: { x: 25%, y: 30% }",
        "QR Code ID: 'QR_CSE_F2_AIDS'",
        "isAccessible: true (Serviced by elevator)",
        "Keywords: ['ai', 'data science', 'gpu', 'ml']"
    ]
    for nd in node_data:
        p = tf1.add_paragraph()
        p.text = f"•  {nd}"
        p.font.size = Pt(12)
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(6)

    # Right card: Sample Edge
    c2 = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.9), Inches(5.7), Inches(4.8))
    c2.fill.solid()
    c2.fill.fore_color.rgb = c_card_bg
    c2.line.color.rgb = c_card_border
    tf2 = c2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = Inches(0.4)
    tf2.margin_top = Inches(0.3)

    p = tf2.paragraphs[0]
    p.text = "SAMPLE PATHWAY CONNECTION (EDGE)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = c_blue_primary
    p.space_after = Pt(10)

    edge_data = [
        "Edge ID: 'e38'",
        "Source: 'cse_elevator' (Floor 0)",
        "Target: 'cse_f2_aids_lab' (Floor 2)",
        "Distance: 30.0 Meters",
        "isElevator: true",
        "isStaircase: false",
        "isOutdoor: false",
        "Accessible Mode Filtering:",
        "  - Normal Mode: Available",
        "  - Step-Free Mode: Available (Prioritized)",
        "Estimated Walk Time: ~0.5 minutes"
    ]
    for ed in edge_data:
        p = tf2.add_paragraph()
        p.text = f"•  {ed}"
        p.font.size = Pt(12)
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(6)

    # ==========================================
    # SLIDE 10: Main Modules
    # ==========================================
    s10 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s10, "Main Modules")
    add_footer(s10, "10")

    box = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s10 = [
        "CampusMapModule: Renders interactive 2D geospatial map of KIOT Salem with custom polygon building footprints and animated route polylines.",
        "PathfindingEngine (Dijkstra): Core mathematical module constructing adjacency lists, relaxing graph edges, and extracting shortest path sequences.",
        "IndoorFloorPlanModule: Dynamic multi-floor blueprint viewer allowing users to inspect individual floors (Ground to 3rd Floor) for multi-level buildings.",
        "DirectionsDrawerModule: Step-by-step turn guidance generating human-readable instructions, distance badges, and walk time estimates.",
        "SearchAndDirectoryModule: High-speed fuzzy search modal across departments, laboratory suites, faculty chambers, and student utility arcade.",
        "QRWayfindingModule: Resolves camera-scanned or simulated QR stickers to set origin coordinates instantly without GPS drift."
    ]
    for i, it in enumerate(items_s10):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(14)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(12)

    # ==========================================
    # SLIDE 11: Testing and Validation
    # ==========================================
    s11 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s11, "Testing and Validation")
    add_footer(s11, "11")

    box = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s11 = [
        "Outdoor Walkway Validation: Main Gate → Admin Entrance correctly yields 78m distance and 1 minute walk time.",
        "Multi-Floor Indoor Transition Test: Main Gate → CSE Floor 2 AI Lab correctly transitions from outdoor road to indoor elevator/stairs landing.",
        "Step-Free Accessibility Test: Enabling 'Step-Free' mode excludes stair edges and reroutes path through the passenger elevator.",
        "Directory Search Test: Querying 'AI Lab', 'Principal', or 'Canteen' filters nodes instantly in <10ms with zero server latency.",
        "QR Code Origin Test: Selecting 'QR_CSE_F2_AIDS' or scanning camera code immediately resets origin with location badge.",
        "Cross-Browser & Mobile Responsiveness: Verified responsive on mobile touchscreens and desktop screens with full offline caching capability."
    ]
    for i, it in enumerate(items_s11):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(14)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(12)

    # ==========================================
    # SLIDE 12: Advantages and Limitations
    # ==========================================
    s12 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s12, "Advantages and Limitations")
    add_footer(s12, "12")

    box = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s12 = [
        "Advantages: Zero infrastructure cost, client-side computation running directly in modern web browsers.",
        "Advantages: High computational speed; operates reliably even in areas with spotty cellular coverage.",
        "Advantages: Multi-floor support and wheelchair step-free accessibility promote institutional inclusivity.",
        "Limitations: Graph database requires manual updates when new physical structures or temporary barriers are erected.",
        "Limitations: Relies on physical QR markers for indoor positioning rather than active Bluetooth BLE beacon triangulation.",
        "Future Enhancements: Augmented Reality (AR) camera wayfinding with floating direction arrows, live KIOT college bus GPS tracking, and IoT room occupancy monitoring."
    ]
    for i, it in enumerate(items_s12):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(14)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(12)

    # ==========================================
    # SLIDE 13: Conclusion
    # ==========================================
    s13 = prs.slides.add_slide(blank_slide_layout)
    add_slide_header(s13, "Conclusion")
    add_footer(s13, "13")

    box = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = c_card_bg
    box.line.color.rgb = c_card_border
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.5)
    tf.margin_right = Inches(0.5)
    tf.margin_top = Inches(0.4)

    items_s13 = [
        "The project successfully implements an end-to-end Campus Navigation & Wayfinding Web Application for Knowledge Institute of Technology (KIOT), Salem.",
        "Effectively bridges academic Data Structures and Algorithms (graphs, adjacency lists, Dijkstra's algorithm) with practical spatial engineering.",
        "Solves real-world orientation challenges for freshers, visiting company recruiters, parents, and symposium participants.",
        "Achieves institutional sustainability with high accessibility and mobile-friendly usability.",
        "Demonstrates complete operational functionality for the Capstone Project Work."
    ]
    for i, it in enumerate(items_s13):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = f"•  {it}"
        p.font.size = Pt(15)
        p.font.name = "Arial"
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(16)

    # ==========================================
    # SLIDE 14: Thank You
    # ==========================================
    s14 = prs.slides.add_slide(blank_slide_layout)
    bg14 = s14.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg14.fill.solid()
    bg14.fill.fore_color.rgb = c_dark_navy
    bg14.line.color.rgb = c_dark_navy

    tb14 = s14.shapes.add_textbox(Inches(1.5), Inches(1.5), Inches(10.333), Inches(4.5))
    tf14 = tb14.text_frame
    tf14.word_wrap = True

    p = tf14.paragraphs[0]
    p.text = "THANK YOU!"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = c_white
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(16)

    p = tf14.add_paragraph()
    p.text = "Questions & Discussion"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = c_accent_cyan
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(28)

    p = tf14.add_paragraph()
    p.text = "Project Team:\nSanjeev K (611225105046)   |   Dineshraj S S (611225105009)\nGokul P (611225105011)   |   Logajevin K (611225105026)"
    p.font.size = Pt(14)
    p.font.color.rgb = RGBColor(226, 232, 240)
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(20)

    p = tf14.add_paragraph()
    p.text = "Department of Computer Science and Engineering\nKnowledge Institute of Technology, Salem"
    p.font.size = Pt(13)
    p.font.color.rgb = RGBColor(148, 163, 184)
    p.alignment = PP_ALIGN.CENTER

    add_footer(s14, "14")

    out_path = r"C:\Users\JEVIN\kiot-campus-nav\KIOT_Campus_Navigation_Presentation.pptx"
    prs.save(out_path)
    print(f"Presentation saved successfully to: {out_path}")

if __name__ == "__main__":
    create_presentation()
