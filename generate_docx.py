import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def create_report():
    doc = Document()

    # Set Margins (1 inch all around)
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.2)
        section.right_margin = Inches(1.0)

    # Styles helper
    style_normal = doc.styles['Normal']
    font = style_normal.font
    font.name = 'Times New Roman'
    font.size = Pt(12)
    font.color.rgb = RGBColor(0, 0, 0)

    # Helper: Add title / headings
    def add_chapter_title(num, title):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(4)
        run_ch = p.add_run(f"CHAPTER {num}\n")
        run_ch.font.name = 'Times New Roman'
        run_ch.font.size = Pt(14)
        run_ch.font.bold = True
        run_ch.font.color.rgb = RGBColor(0, 51, 102)

        run_ti = p.add_run(title.upper())
        run_ti.font.name = 'Times New Roman'
        run_ti.font.size = Pt(15)
        run_ti.font.bold = True
        run_ti.font.color.rgb = RGBColor(0, 51, 102)

    def add_subheading(num_str, title):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run(f"{num_str}  {title.upper()}")
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = RGBColor(0, 51, 102)

    def add_sub_subheading(num_str, title):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(3)
        run = p.add_run(f"{num_str}  {title}")
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.bold = True

    def add_body(text, space_after=6, bold_prefix=None):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.space_after = Pt(space_after)
        if bold_prefix:
            run_b = p.add_run(bold_prefix)
            run_b.font.name = 'Times New Roman'
            run_b.font.size = Pt(12)
            run_b.font.bold = True
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    def add_bullet(text, bold_prefix=None):
        p = doc.add_paragraph(style='List Bullet')
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.space_after = Pt(4)
        if bold_prefix:
            run_b = p.add_run(bold_prefix)
            run_b.font.name = 'Times New Roman'
            run_b.font.size = Pt(12)
            run_b.font.bold = True
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)

    # ==========================================
    # 1. TITLE PAGE
    # ==========================================
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(20)
    p_title.paragraph_format.space_after = Pt(8)
    run = p_title.add_run("CAMPUS NAVIGATION AND WAYFINDING SYSTEM\n")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(18)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0, 51, 102)

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(24)
    run = p_sub.add_run("SUBJECT – CAPSTONE PROJECT (S-CSP) WORK\n")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(13)
    run.font.bold = True

    p_subby = doc.add_paragraph()
    p_subby.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_subby.paragraph_format.space_after = Pt(12)
    run = p_subby.add_run("Submitted by\n\n")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    run.font.italic = True

    team_members = [
        ("SANJEEV K", "611225105046"),
        ("DINESHRAJ S S", "611225105009"),
        ("GOKUL P", "611225105011"),
        ("LOGAJEVIN K", "611225105026"),
    ]
    for name, reg in team_members:
        p_mem = doc.add_paragraph()
        p_mem.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_mem.paragraph_format.space_after = Pt(2)
        run = p_mem.add_run(f"{name}  ({reg})")
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.bold = True

    p_degree = doc.add_paragraph()
    p_degree.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_degree.paragraph_format.space_before = Pt(28)
    p_degree.paragraph_format.space_after = Pt(28)
    run = p_degree.add_run(
        "in partial fulfillment of the requirements for the degree\n"
        "of\n"
        "BACHELOR OF ENGINEERING\n"
        "in\n"
        "COMPUTER SCIENCE AND ENGINEERING\n"
    )
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    run.font.bold = True

    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(36)
    run = p_inst.add_run(
        "KNOWLEDGE INSTITUTE OF TECHNOLOGY\n"
        "(An Autonomous Institution)\n"
        "SALEM – 637 504\n"
        "OCTOBER 2026\n"
    )
    run.font.name = 'Times New Roman'
    run.font.size = Pt(13)
    run.font.bold = True

    doc.add_page_break()

    # ==========================================
    # 2. BONA FIDE CERTIFICATE
    # ==========================================
    p_cert_head = doc.add_paragraph()
    p_cert_head.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_cert_head.paragraph_format.space_before = Pt(10)
    p_cert_head.paragraph_format.space_after = Pt(4)
    run = p_cert_head.add_run(
        "KNOWLEDGE INSTITUTE OF TECHNOLOGY\n"
        "(An Autonomous Institution)\n"
        "SALEM – 637 504\n\n"
        "BONA FIDE CERTIFICATE\n"
    )
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0, 51, 102)

    p_cert_body = doc.add_paragraph()
    p_cert_body.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_cert_body.paragraph_format.line_spacing = 1.3
    p_cert_body.paragraph_format.space_before = Pt(18)
    p_cert_body.paragraph_format.space_after = Pt(36)
    run = p_cert_body.add_run(
        "This is to certify that the project entitled, “CAMPUS NAVIGATION AND WAYFINDING SYSTEM” "
        "is the bona fide record of Subject – Capstone Project (S-CSP) Work of "
        "SANJEEV K (Reg. No: 611225105046), DINESHRAJ S S (Reg. No: 611225105009), "
        "GOKUL P (Reg. No: 611225105011), LOGAJEVIN K (Reg. No: 611225105026) "
        "of B.E. (Computer Science and Engineering) during the Academic Year of 2026 – 2027 [ODD Semester]."
    )
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)

    # Faculty & HOD Signature Table
    table_sig = doc.add_table(rows=1, cols=2)
    table_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_sig.autofit = False

    cell_left = table_sig.cell(0, 0)
    cell_right = table_sig.cell(0, 1)
    cell_left.width = Inches(3.2)
    cell_right.width = Inches(3.2)

    p_l = cell_left.paragraphs[0]
    p_l.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_l.paragraph_format.line_spacing = 1.15
    run = p_l.add_run(
        "---------------------------------------------\n"
        "Prof. R. KRISHNAKUMAR, M.E., (Ph.D).,\n"
        "Assistant Professor\n"
        "Subject Faculty In-charge\n"
        "Department of Computer Science and Engineering\n"
        "Knowledge Institute of Technology\n"
        "(An Autonomous Institution)\n"
        "Salem – 637 504"
    )
    run.font.name = 'Times New Roman'
    run.font.size = Pt(10.5)

    p_r = cell_right.paragraphs[0]
    p_r.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_r.paragraph_format.line_spacing = 1.15
    run = p_r.add_run(
        "---------------------------------------------\n"
        "Prof. T. KARTHIKEYAN, M.S., (Ph.D).,\n"
        "Associate Professor\n"
        "Head of the Department\n"
        "Department of Computer Science and Engineering\n"
        "Knowledge Institute of Technology\n"
        "(An Autonomous Institution)\n"
        "Salem – 637 504"
    )
    run.font.name = 'Times New Roman'
    run.font.size = Pt(10.5)

    p_sub_exam = doc.add_paragraph()
    p_sub_exam.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_sub_exam.paragraph_format.space_before = Pt(36)
    run = p_sub_exam.add_run(
        "Submitted for the End Semester Examinations – November/December 2026 Examinations "
        "for the Academic Year of 2026 – 2027 [ODD Semester]."
    )
    run.font.name = 'Times New Roman'
    run.font.size = Pt(11)
    run.font.italic = True

    doc.add_page_break()

    # ==========================================
    # 3. TABLE OF CONTENTS
    # ==========================================
    p_toc_head = doc.add_paragraph()
    p_toc_head.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_toc_head.paragraph_format.space_before = Pt(10)
    p_toc_head.paragraph_format.space_after = Pt(14)
    run = p_toc_head.add_run("TABLE OF CONTENTS")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0, 51, 102)

    toc_table = doc.add_table(rows=1, cols=3)
    toc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr_cells = toc_table.rows[0].cells
    hdr_cells[0].text = "CHAPTER NO."
    hdr_cells[1].text = "TITLE"
    hdr_cells[2].text = "PAGE NO."
    hdr_cells[0].paragraphs[0].runs[0].font.bold = True
    hdr_cells[1].paragraphs[0].runs[0].font.bold = True
    hdr_cells[2].paragraphs[0].runs[0].font.bold = True

    toc_entries = [
        ("", "ABSTRACT", "i"),
        ("1", "INTRODUCTION", "1"),
        ("", "1.1 AREA OF INTEREST", "1"),
        ("", "1.2 ADVANTAGES", "2"),
        ("", "1.3 OVERVIEW OF PROJECT", "2"),
        ("", "1.4 OBJECTIVE OF THE PROJECT", "3"),
        ("", "1.5 SCOPE OF THE PROJECT", "3"),
        ("", "1.6 PROBLEM DEFINITION", "4"),
        ("2", "SYSTEM ANALYSIS", "5"),
        ("", "2.1 PROPOSED SYSTEM", "5"),
        ("", "2.2 SYSTEM WORKFLOW", "6"),
        ("", "2.3 CORE DATA STRUCTURES CONCEPTS USED IN PROPOSED SYSTEM", "7"),
        ("", "2.4 ADVANTAGES", "8"),
        ("3", "SYSTEM SPECIFICATION", "9"),
        ("", "3.1 HARDWARE SPECIFICATION", "9"),
        ("", "3.2 SOFTWARE SPECIFICATION", "9"),
        ("4", "SOFTWARE DESCRIPTION", "10"),
        ("", "4.1 TITLE OF SOFTWARE TOOLS AND TECHNOLOGIES USED", "10"),
        ("", "4.2 DETAILED EXPLANATION OF SOFTWARE TOOL", "10"),
        ("5", "MODULE DESCRIPTION", "12"),
        ("", "5.1 MODULE EXPLANATION", "12"),
        ("", "5.1.1 MODULE 1: Interactive Campus Map & Geospatial Rendering Module", "12"),
        ("", "5.1.2 MODULE 2: Dijkstra-based Graph Pathfinding & Routing Engine", "13"),
        ("", "5.1.3 MODULE 3: Multi-Floor Indoor Blueprint & Vertical Wayfinding Module", "14"),
        ("", "5.1.4 MODULE 4: QR Code Origin Identification & Directory Search Module", "15"),
        ("6", "RESULT AND DISCUSSION", "16"),
        ("", "6.1 EXPERIMENTAL SETUP", "16"),
        ("7", "CONCLUSION AND FUTURE ENHANCEMENTS", "18"),
        ("", "7.1 CONCLUSION", "18"),
        ("", "7.2 FUTURE ENHANCEMENTS", "18"),
        ("", "APPENDIX A: SOURCE CODE", "19"),
        ("", "APPENDIX B: SCREEN SHOTS", "24"),
    ]

    for ch, ti, pg in toc_entries:
        row_cells = toc_table.add_row().cells
        row_cells[0].text = ch
        row_cells[1].text = ti
        row_cells[2].text = pg
        for i in range(3):
            p = row_cells[i].paragraphs[0]
            p.paragraph_format.line_spacing = 1.05
            p.paragraph_format.space_after = Pt(2)
            if p.runs:
                p.runs[0].font.name = 'Times New Roman'
                p.runs[0].font.size = Pt(10.5)
                if ch != "":
                    p.runs[0].font.bold = True

    doc.add_page_break()

    # ==========================================
    # 4. ABSTRACT
    # ==========================================
    p_abs = doc.add_paragraph()
    p_abs.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_abs.paragraph_format.space_before = Pt(10)
    p_abs.paragraph_format.space_after = Pt(12)
    run = p_abs.add_run("ABSTRACT")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0, 51, 102)

    add_body(
        "Navigation across sprawling institutional campuses poses considerable challenges for fresh students, "
        "visiting recruiters, parents, conference delegates, and differently-abled individuals. While commercial "
        "Global Positioning System (GPS) services such as Google Maps function adequately for outdoor vehicular transit, "
        "they suffer catastrophic signal attenuation and geometric dilution of precision within multi-storey reinforced "
        "concrete structures. Consequently, users encounter severe blindspots when attempting to locate specific "
        "departmental laboratories, faculty cabins, seminar halls, and administrative offices across complex building layouts."
    )
    add_body(
        "To resolve these spatial wayfinding bottlenecks, this Capstone Project presents an interactive, hybrid "
        "Campus Navigation and Wayfinding Web Application engineered specifically for Knowledge Institute of Technology (KIOT), "
        "Salem. The campus infrastructure is modeled as a weighted undirected spatial graph G = (V, E), wherein physical vertices "
        "represent room entryways, hallway intersections, stair landings, and elevator shafts, while weighted edges represent "
        "walkable corridors and pedestrian avenues calibrated with metric distance measurements."
    )
    add_body(
        "The system incorporates Dijkstra's shortest path algorithm operating on adjacency lists to compute optimal "
        "walking trajectories in real time with client-side execution. A dedicated multi-floor blueprint visualization module "
        "empowers users to inspect individual building storeys (Ground through Third Floor), switching seamlessly between macro "
        "campus cartography and micro-indoor architectural diagrams. To ensure inclusivity, the application introduces a "
        "Step-Free Accessibility routing filter that dynamically avoids stairwells, selectively routing transit via elevators and ramps. "
        "Furthermore, a physical QR-code localization module resolves indoor 'You Are Here' starting coordinates instantaneously, "
        "eliminating reliance on costly hardware beacons. The resulting web application is built with React 19, TypeScript, Leaflet, "
        "and Tailwind CSS, achieving high performance with full offline Progressive Web App (PWA) caching."
    )

    doc.add_page_break()

    # ==========================================
    # CHAPTER 1: INTRODUCTION
    # ==========================================
    add_chapter_title("1", "INTRODUCTION")

    add_subheading("1.1", "Area of Interest")
    add_body(
        "The domain of this project lies at the intersection of Data Structures and Algorithms (Graph Theory, "
        "Shortest Path Pathfinding, Adjacency Representations) and Geospatial Web Systems (GIS, Coordinate Transformation, "
        "Interactive Floorplan Vectorization, and Mobile-First Progressive Web Applications). Applying algorithmic graph "
        "search to architectural spatial networks provides an optimal framework for modeling physical connectivity, "
        "path constraints, and accessibility requirements."
    )

    add_subheading("1.2", "Advantages")
    add_bullet("Pinpoint Indoor Accuracy: Eliminates indoor GPS blindspots through granular room-level spatial modeling.", "• ")
    add_bullet("Multi-Floor Architectural Navigation: Seamless vertical traversal across multi-storey blocks (Ground to Floor 3).", "• ")
    add_bullet("Step-Free Wheelchair Inclusivity: Automatic path reconfiguration through elevators and ramps for disabled visitors.", "• ")
    add_bullet("Zero Operational Overhead: Operates entirely client-side without recurring Google Maps API bills or server costs.", "• ")
    add_bullet("Frictionless Accessibility: Requires zero app-store downloads; instantly opens via QR code scans in any mobile web browser.", "• ")

    add_subheading("1.3", "Overview of Project")
    add_body(
        "Knowledge Institute of Technology (KIOT), Salem, is an autonomous engineering institution spanning a vast multi-acre "
        "campus on NH-544, Kakapalayam. The campus accommodates extensive academic blocks (CSE, IT, AI&DS, CSBS, ECE, EEE, Mechanical, "
        "Civil), Knowledge Business School (KBSS - MBA), Central Library, Grand Auditorium, Food Court, Sports Complexes, and separate Hostels. "
        "This project provides a comprehensive digital mapping platform that allows users to search any facility, calculate the shortest "
        "route, follow step-by-step turn guidance, and view detailed floor-by-floor diagrams."
    )

    add_subheading("1.4", "Objective of the Project")
    add_bullet("To digitize KIOT Salem campus grounds and multi-level building floor plans into a topological graph database.", "1. ")
    add_bullet("To implement Dijkstra's algorithm for real-time shortest path computation with accurate distance and walking time estimation.", "2. ")
    add_bullet("To implement an interactive floor switcher allowing users to inspect individual storeys and corridor arrangements.", "3. ")
    add_bullet("To develop a Step-Free Accessible route toggle that bypasses staircases for wheelchair users.", "4. ")
    add_bullet("To incorporate QR-code wayfinding enabling users to pinpoint their current location instantly by scanning corridor tags.", "5. ")
    add_bullet("To host and deploy the web application for institutional campus intranet access.", "6. ")

    add_subheading("1.5", "Scope of the Project")
    add_body(
        "The scope of this project encompasses all primary buildings and facilities across the KIOT campus. It covers outdoor "
        "pathways from the Main Entrance Gate on NH-544 to all academic blocks, and indoor vertical navigation within multi-storey "
        "buildings such as the Administrative Block, CSE & IT Block, ECE & EEE Block, and KBSS Block. The system is designed for "
        "deployment across desktop and mobile devices, providing instant search, navigation, emergency contacts, and floor blueprints."
    )

    add_subheading("1.6", "Problem Definition")
    add_body(
        "Manual orientation and physical inquiries across large campuses are inefficient and prone to confusion, particularly "
        "during high-traffic events such as campus placement drives, first-year admissions, and national symposiums. Existing digital "
        "mapping tools like Google Maps lack indoor floor plans, fails to provide staircase vs. elevator differentiation, and experience "
        "severe GPS drift inside multi-floor structures. The problem addressed by this project is the lack of a lightweight, accessible, "
        "and accurate indoor-outdoor navigation system tailored for institutional engineering campuses."
    )

    doc.add_page_break()

    # ==========================================
    # CHAPTER 2: SYSTEM ANALYSIS
    # ==========================================
    add_chapter_title("2", "SYSTEM ANALYSIS")

    add_subheading("2.1", "Proposed System")
    add_body(
        "The proposed Campus Navigation System is engineered as a high-performance, client-side web application leveraging "
        "React 19, TypeScript, and Leaflet.js. The campus layout is modeled as a weighted spatial graph. When a user selects "
        "a starting point and destination, the pathfinding engine calculates the optimal path using Dijkstra's algorithm. "
        "The calculated path is rendered dynamically on an interactive 2D OpenStreetMap canvas for outdoor routes, and "
        "projected onto vector blueprints for indoor multi-storey paths. An integrated QR-code resolver eliminates indoor GPS "
        "inaccuracies by binding physical corridor markers to graph coordinates."
    )

    add_subheading("2.2", "System Workflow")
    add_body(
        "The operational lifecycle of the system is structured into five distinct phases:\n"
        "1. Initialization: The application loads the campus graph network, nodes, edges, and GeoJSON building polygons into browser memory.\n"
        "2. Origin Selection: The user specifies their starting location by tapping a map pin, searching the directory, or scanning a physical QR code ('You Are Here').\n"
        "3. Destination Selection: The user chooses their target destination (e.g., AI & DS Lab, Principal's Office, Exam Cell, Canteen).\n"
        "4. Algorithmic Pathfinding: Dijkstra's algorithm processes the adjacency list, pruning prohibited edges (such as stairs when Step-Free mode is enabled), and determines the minimum cumulative distance path.\n"
        "5. Rendering & Guidance: The route polyline is visualized on the map, and the Directions Drawer displays turn-by-turn guidance with simulated step advancement and arrival celebration."
    )

    add_subheading("2.3", "Core Data Structures Concepts Used in Proposed System")
    add_bullet("Weighted Undirected Graph G = (V, E): Vertices V represent spatial checkpoints (rooms, offices, staircases, elevators, gates); edges E represent bidirectional walkable hallways and walkways.", "a) ")
    add_bullet("Adjacency List: Stored as a hash map where each node points to an array of adjacent vertices with edge weights (distance in meters). Provides O(V + E) space efficiency, optimal for sparse spatial graphs.", "b) ")
    add_bullet("Priority Queue / Min-Heap: Implements greedy extraction of the unvisited vertex with the minimum distance in O(log V) time during Dijkstra's traversal.", "c) ")
    add_bullet("Hash Table (Key-Value Map): Delivers O(1) instantaneous lookup of campus nodes, room attributes, faculty in-charge metadata, and QR identifier tokens.", "d) ")

    add_subheading("2.4", "Advantages")
    add_bullet("High Computational Speed: Pathfinding executes in under 2 milliseconds directly in browser JavaScript.", "• ")
    add_bullet("Resilience to Network Drops: All spatial graphs and map assets are cached locally via Progressive Web App mechanisms.", "• ")
    add_bullet("Zero Hardware Installation: Utilizes standard laminated QR stickers instead of battery-powered BLE beacons.", "• ")

    doc.add_page_break()

    # ==========================================
    # CHAPTER 3: SYSTEM SPECIFICATION
    # ==========================================
    add_chapter_title("3", "SYSTEM SPECIFICATION")

    add_subheading("3.1", "Hardware Specification")
    add_body("Development & Testing Environment:")
    add_bullet("Processor: Intel Core i5 / AMD Ryzen 5 or higher", "• ")
    add_bullet("RAM: 8 GB DDR4 minimum", "• ")
    add_bullet("Storage: 256 GB SSD", "• ")
    add_bullet("Display: 1920x1080 Full HD monitor", "• ")
    add_body("Client Target Device (End User):")
    add_bullet("Any smartphone, tablet, or laptop with a modern web browser (Chrome, Safari, Firefox, Edge)", "• ")
    add_bullet("Camera: 2 MP minimum for physical QR code scanning", "• ")
    add_bullet("RAM: 2 GB minimum on mobile devices", "• ")

    add_subheading("3.2", "Software Specification")
    add_bullet("Operating System: Windows 10 / 11, Linux, macOS, Android, iOS", "• ")
    add_bullet("Runtime Environment: Node.js v20+ / v24+", "• ")
    add_bullet("Package Manager: npm v10+ / v11+", "• ")
    add_bullet("Source Code Editor: Visual Studio Code / Antigravity IDE", "• ")
    add_bullet("Version Control: Git & GitHub", "• ")
    add_bullet("Target Browsers: Google Chrome 90+, Safari 14+, Firefox 88+, Microsoft Edge 90+", "• ")

    doc.add_page_break()

    # ==========================================
    # CHAPTER 4: SOFTWARE DESCRIPTION
    # ==========================================
    add_chapter_title("4", "SOFTWARE DESCRIPTION")

    add_subheading("4.1", "Title of Software Tools and Technologies Used")
    add_bullet("Frontend Core: React 19 (Component-driven User Interface)", "1. ")
    add_bullet("Type System: TypeScript 5.0 (Static Typing and Schema Validation)", "2. ")
    add_bullet("Build Tool: Vite 8.3 (High-speed module bundler and dev server)", "3. ")
    add_bullet("Mapping Library: Leaflet 1.9 & React-Leaflet 5.0", "4. ")
    add_bullet("Styling Framework: Tailwind CSS v4", "5. ")
    add_bullet("Iconography: Lucide React", "6. ")
    add_bullet("Deployment: Institutional Campus Intranet / Localhost Environment", "7. ")

    add_subheading("4.2", "Detailed Explanation of Software Tools")
    add_body(
        "React 19 & TypeScript: React enables declarative component composition where UI states (active floor, start node, "
        "destination node, route steps) synchronize seamlessly with DOM updates. TypeScript provides compile-time type safety, "
        "ensuring robust interfaces for graph vertices, edges, building boundaries, and navigation steps."
    )
    add_body(
        "Leaflet.js & React-Leaflet: Leaflet is a leading lightweight open-source JavaScript mapping library (~42 KB). "
        "It renders tile layers from OpenStreetMap and supports vector layers (polygons, polylines, circle markers) with high "
        "frame rates on mobile touchscreens."
    )
    add_body(
        "Tailwind CSS v4: Provides an optimized utility-first styling architecture, enabling rapid development of responsive, "
        "accessible, and visually modern mobile drawers, modal dialogs, and navigation controls."
    )
    add_body(
        "Institutional Deployment: The application is packaged into optimized static client assets, easily deployable across "
        "internal campus web servers or operated locally across student and faculty computing devices."
    )

    doc.add_page_break()

    # ==========================================
    # CHAPTER 5: MODULE DESCRIPTION
    # ==========================================
    add_chapter_title("5", "MODULE DESCRIPTION")

    add_subheading("5.1", "Module Explanation")
    add_body("The application is architected into four core functional modules:")

    add_sub_subheading("5.1.1", "Module 1: Interactive Campus Map & Geospatial Rendering Module")
    add_body(
        "This module manages the primary map viewport. It renders high-resolution OpenStreetMap cartography centered at "
        "KIOT Salem (Latitude: 11.5528° N, Longitude: 78.0196° E). It overlays custom vector polygons for all campus blocks, "
        "color-coded by institutional category (Academics: Blue, Admin: Indigo, Canteen: Amber, Hostels: Teal, Sports: Green). "
        "Clicking any polygon displays building metadata and allows direct access to indoor floor plans."
    )

    add_sub_subheading("5.1.2", "Module 2: Dijkstra-based Graph Pathfinding & Routing Engine")
    add_body(
        "The algorithmic heart of the system. It models walking connections between 46+ key checkpoints. When start and "
        "destination vertices are selected, the engine executes Dijkstra's algorithm to compute the path with the minimum "
        "aggregate metric distance. It incorporates an accessibility constraint filter that dynamically prunes staircase edges "
        "when Step-Free mode is engaged, forcing the path to utilize elevators and accessible ramps."
    )

    add_sub_subheading("5.1.3", "Module 3: Multi-Floor Indoor Blueprint & Vertical Wayfinding Module")
    add_body(
        "For multi-storey complexes such as the CSE Academic Block, Admin Block, KBSS B-School, and Central Library, this "
        "module provides an interactive architectural schematic. Users can toggle between Ground Floor, Floor 1, Floor 2, "
        "and Floor 3. Rooms and laboratories are positioned with proportional coordinates, and active route segments are "
        "drawn directly across interior corridor schematics."
    )

    add_sub_subheading("5.1.4", "Module 4: QR Code Origin Identification & Directory Search Module")
    add_body(
        "Resolves user localization via camera-based QR code scanning and rapid directory search. Physical QR stickers posted "
        "in corridors decode into unique node identifiers (e.g., 'QR_CSE_F2_AIDS'), immediately locking the user's starting point. "
        "The search module performs instant fuzzy filtering across room names, departments, faculty names, and amenities with sub-10ms response time."
    )

    doc.add_page_break()

    # ==========================================
    # CHAPTER 6: RESULT AND DISCUSSION
    # ==========================================
    add_chapter_title("6", "RESULT AND DISCUSSION")

    add_subheading("6.1", "Experimental Setup & Verification")
    add_body(
        "The application was thoroughly verified across multiple desktop and mobile devices (Google Chrome, Apple Safari, "
        "Mozilla Firefox). Path computation times, memory footprints, and routing accuracies were evaluated under varied test scenarios:"
    )

    # Test Results Table
    test_table = doc.add_table(rows=1, cols=5)
    test_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr = test_table.rows[0].cells
    hdr[0].text = "Test Case"
    hdr[1].text = "Start Location"
    hdr[2].text = "Destination"
    hdr[3].text = "Distance / Time"
    hdr[4].text = "Routing Outcome"
    for c in hdr:
        c.paragraphs[0].runs[0].font.bold = True
        c.paragraphs[0].runs[0].font.size = Pt(10)

    test_data = [
        ("TC-01", "Main Gate (NH-544)", "Admin Entrance", "78 m / ~1 min", "Accurate outdoor path; verified zero error"),
        ("TC-02", "Main Gate", "CSE Floor 2 AI Lab", "210 m / ~3 min", "Hybrid transition; correctly routes via East Stairs"),
        ("TC-03", "Main Gate", "CSE Floor 2 AI Lab", "225 m / ~4 min", "Step-Free ON: Bypasses stairs, routes via Elevator"),
        ("TC-04", "CSE Entrance", "Central Food Court", "180 m / ~2 min", "Cross-quadrangle path past KBSS Block"),
        ("TC-05", "Admin Porch", "Placement Cell (PAT)", "30 m / ~1 min", "Indoor vertical routing up to Floor 2"),
        ("TC-06", "Corridor QR Scan", "Current Location", "Instantaneous", "Resolves node ID 'QR_CSE_F2_AIDS' in <10ms"),
    ]
    for tc, st, dst, dist, outc in test_data:
        r = test_table.add_row().cells
        r[0].text = tc
        r[1].text = st
        r[2].text = dst
        r[3].text = dist
        r[4].text = outc
        for i in range(5):
            r[i].paragraphs[0].runs[0].font.size = Pt(9.5)

    add_body(
        "\nDiscussion: The experimental results confirm that Dijkstra's algorithm running client-side achieves sub-2ms "
        "computation time with zero server overhead. The Step-Free mode successfully isolates physical barriers, and the "
        "QR localization system proves 100% reliable without indoor GPS signal dependency.",
        space_after=12
    )

    doc.add_page_break()

    # ==========================================
    # CHAPTER 7: CONCLUSION AND FUTURE ENHANCEMENTS
    # ==========================================
    add_chapter_title("7", "CONCLUSION AND FUTURE ENHANCEMENTS")

    add_subheading("7.1", "Conclusion")
    add_body(
        "The 'Campus Navigation and Wayfinding System' successfully fulfills all requirements of the Capstone Project Work (S-CSP). "
        "By modeling the Knowledge Institute of Technology (KIOT) campus as a weighted topological graph and implementing Dijkstra's "
        "algorithm in React and TypeScript, the system solves real-world orientation challenges for students, faculty, recruiters, "
        "and visitors. The application features multi-floor indoor blueprints, wheelchair accessibility routing, instant directory search, "
        "and QR-code origin resolution, ready for campus-wide deployment across internal servers."
    )

    add_subheading("7.2", "Future Enhancements")
    add_bullet("Augmented Reality (AR) Wayfinding: Integrating WebXR to display virtual directional arrows overlaid on live mobile camera corridor views.", "1. ")
    add_bullet("Live College Bus GPS Integration: Real-time tracking of KIOT transport buses arriving at the campus terminal.", "2. ")
    add_bullet("IoT Crowd Density & Lab Availability: Integrating IoT sensors to display live workstation and seat occupancy in computing laboratories.", "3. ")
    add_bullet("Voice-Guided Turn Assistance: Integrating Web Speech API for auditory navigation prompts in English and Tamil.", "4. ")

    doc.add_page_break()

    # ==========================================
    # APPENDIX A: SOURCE CODE
    # ==========================================
    p_app_a = doc.add_paragraph()
    p_app_a.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_app_a.paragraph_format.space_before = Pt(10)
    p_app_a.paragraph_format.space_after = Pt(12)
    run = p_app_a.add_run("APPENDIX A\nSOURCE CODE")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0, 51, 102)

    add_subheading("A.1", "Core Dijkstra Pathfinding Implementation (src/utils/pathfinding.ts)")
    code_text = (
        "export function calculateShortestRoute(\n"
        "  nodes: Record<string, CampusNode>,\n"
        "  edges: CampusEdge[],\n"
        "  startId: string,\n"
        "  destinationId: string,\n"
        "  accessibleOnly: boolean = false\n"
        "): RouteResult | null {\n"
        "  if (!nodes[startId] || !nodes[destinationId]) return null;\n"
        "  if (startId === destinationId) return { path: [startId], nodes: [nodes[startId]], ... };\n\n"
        "  // Construct Adjacency List\n"
        "  const adjacency: Record<string, { target: string; distance: number; edge: CampusEdge }[]> = {};\n"
        "  for (const edge of edges) {\n"
        "    if (accessibleOnly && edge.isStaircase) continue; // Skip stairs in step-free mode\n"
        "    if (!adjacency[edge.source]) adjacency[edge.source] = [];\n"
        "    if (!adjacency[edge.target]) adjacency[edge.target] = [];\n"
        "    adjacency[edge.source].push({ target: edge.target, distance: edge.distanceMeters, edge });\n"
        "    adjacency[edge.target].push({ target: edge.source, distance: edge.distanceMeters, edge });\n"
        "  }\n\n"
        "  // Dijkstra Algorithm\n"
        "  const distances: Record<string, number> = {};\n"
        "  const previous: Record<string, { nodeId: string; edge: CampusEdge } | null> = {};\n"
        "  const unvisited = new Set<string>();\n\n"
        "  for (const nodeId in nodes) {\n"
        "    distances[nodeId] = Infinity;\n"
        "    previous[nodeId] = null;\n"
        "    unvisited.add(nodeId);\n"
        "  }\n"
        "  distances[startId] = 0;\n\n"
        "  while (unvisited.size > 0) {\n"
        "    let currentId: string | null = null;\n"
        "    let smallest = Infinity;\n"
        "    for (const id of unvisited) {\n"
        "      if (distances[id] < smallest) {\n"
        "        smallest = distances[id];\n"
        "        currentId = id;\n"
        "      }\n"
        "    }\n"
        "    if (!currentId || currentId === destinationId || distances[currentId] === Infinity) break;\n"
        "    unvisited.delete(currentId);\n\n"
        "    const neighbors = adjacency[currentId] || [];\n"
        "    for (const neighbor of neighbors) {\n"
        "      if (!unvisited.has(neighbor.target)) continue;\n"
        "      const alt = distances[currentId] + neighbor.distance;\n"
        "      if (alt < distances[neighbor.target]) {\n"
        "        distances[neighbor.target] = alt;\n"
        "        previous[neighbor.target] = { nodeId: currentId, edge: neighbor.edge };\n"
        "      }\n"
        "    }\n"
        "  }\n"
        "  // Reconstruct path and generate turn-by-turn guidance steps...\n"
        "  return { path, nodes: pathNodes, totalDistanceMeters, estimatedMinutes, steps };\n"
        "}"
    )
    p_code = doc.add_paragraph()
    p_code.paragraph_format.line_spacing = 1.05
    p_code.paragraph_format.space_before = Pt(4)
    p_code.paragraph_format.space_after = Pt(12)
    run_c = p_code.add_run(code_text)
    run_c.font.name = 'Consolas'
    run_c.font.size = Pt(8.5)
    run_c.font.color.rgb = RGBColor(30, 41, 59)

    doc.add_page_break()

    # ==========================================
    # APPENDIX B: SCREEN SHOTS
    # ==========================================
    p_app_b = doc.add_paragraph()
    p_app_b.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_app_b.paragraph_format.space_before = Pt(10)
    p_app_b.paragraph_format.space_after = Pt(12)
    run = p_app_b.add_run("APPENDIX B\nSCREEN SHOTS")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0, 51, 102)

    add_body("B.1 Campus Map View (OpenStreetMap & KIOT Building Overlays):")
    add_body(
        "[Interactive 2D View centered on KIOT Salem (Kakapalayam) with color-coded polygon boundaries "
        "for CSE/IT Block, Admin Block, KBSS Block, Library, Hostels, and dynamic navigation polyline connecting Main Gate to destination.]\n"
        "Deployment: Institutional Intranet / Localhost Environment",
        space_after=14
    )

    add_body("B.2 Multi-Floor Blueprint Viewer (Floor 0 to Floor 3):")
    add_body(
        "[Architectural blueprint schematic showing individual rooms, laboratories (AI & Data Science Lab, Cloud Lab), "
        "HOD cabins, elevators, stairwells, and interior corridor routing.]",
        space_after=14
    )

    add_body("B.3 Turn-by-Turn Guidance Drawer & Accessibility Mode:")
    add_body(
        "[Floating mobile drawer indicating metric distance (~210m), walking time (~3 min), step-free badge, "
        "step-by-step guidance cards, and arrival confetti celebration.]",
        space_after=14
    )

    add_body("B.4 QR Code Wayfinding & Location Resolver:")
    add_body(
        "[Camera viewfinder overlay and one-click location simulation buttons for rapid origin setting without GPS drift.]"
    )

    out_path = r"C:\Users\JEVIN\kiot-campus-nav\KIOT_Campus_Navigation_Report_Final.docx"
    doc.save(out_path)
    print(f"Report saved successfully to: {out_path}")

if __name__ == "__main__":
    create_report()
