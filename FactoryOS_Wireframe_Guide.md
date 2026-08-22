# Yuva Polyprint — Wireframe Walkthrough & Client Pitch Guide

**For:** Yuva Polyprint (flexible packaging / plastic pouch manufacturer)
**What this is:** A clickable HTML/CSS prototype of a manufacturing management portal, covering the business end-to-end — from quotation to dispatch. No backend, no real data storage; every screen is populated with realistic sample data so it reads like a working system.
**How to open it:** Open `index.html` in any browser. Every page links to every other page through the sidebar and row clicks — click around exactly as a user would.

---

## 1. The one-line pitch

Yuva Polyprint replaces the spreadsheets, WhatsApp updates, and paper job cards Yuva Polyprint currently uses to run production, with a single system that tracks a customer order from the moment it's quoted to the moment it's delivered — including which machine, which operator, and how much material was used at every single stage.

The one idea to lead with in the pitch: **not every product goes through the same process**, and the system already knows that. A roll-fed label skips lamination. A laminated roll skips pouch-making. An industrial bag skips printing. This is configured once in Product Master and every quotation, job card, and cost report automatically follows the right path — you don't have to explain this manually to every customer or operator.

---

## 2. How the app is organized (sidebar map)

The left sidebar is grouped by business function, top to bottom:

| Group | Pages | What it covers |
|---|---|---|
| — | **Overview** (`index.html`) | Daily control-room dashboard |
| **Commercial** | Orders, Quotations | Sales-side: what's been quoted, what's been ordered |
| **Production** | Planning, Production, Product Master, Design & Cylinders | Factory-side: what's running, on what machine, per what recipe |
| **Materials** | Inventory, Warehouse, Purchase & Suppliers, Rates Update | Raw material stock, storage location, procurement, daily pricing |
| **Control** | Quality & Waste | Rejections, waste %, open issues |
| **Resources** | Machines, Employees, Maintenance | Who and what is running the floor right now |
| **Dispatch** | Dispatch | Finished goods leaving the factory |
| **Insights** | Reports | Standard reports across all of the above |

This structure mirrors how the business actually flows: a job is quoted (Commercial) → planned and produced (Production, using Materials) → checked (Control) → shipped (Dispatch). Reports sits on top of all of it.

---

## 3. Screen-by-screen

### 3.1 Overview (`index.html`) — the daily control room
The page a supervisor or owner opens first thing in the morning.
- **KPI row**: Active Jobs, Production Running, Today's Output (KG), Today's Waste %, Inventory Value, Machines Running, Attention Required — a 10-second health check of the entire factory.
- **Live Production board**: a Kanban-style view of every job currently on the floor, grouped by stage (Rotogravure Printing → Lamination → Slitting → Pouch Making). Each card shows order, customer, quantity, machine, operator, and progress %. Click a card to jump into that job's full Job Card.
- **Alerts**: auto-surfaced problems — a job running behind schedule, a material running low — each with a direct link to go fix it (Job Card / Purchase & Suppliers).
- Quick actions: **+ New Quotation**, **+ New Job**.

**Pitch angle:** this is the screen that sells the system in the first 30 seconds — it's the difference between "I think we're on schedule" and knowing exactly where every job stands.

### 3.2 Orders (`orders.html`) — customer orders before they touch the floor
List of everything a customer has ordered, before material allocation happens. Columns: Order, Customer, Product, Product Type, Design, Quantity, Order Date, Due Date, Status (Pending Materials / In Production / Awaiting QC / Completed).
- **+ New Order** to log a new customer order.
- Two orders are marked **Completed** (#1011, #0994) — click either to open a full traceability Job Card (see 3.11).

**Pitch angle:** this is the single source of truth for "what has the customer actually asked for," separate from whether the factory has started making it yet.

### 3.3 Quotations (`quotation.html`) — costing before commitment
Every quote sent to a customer, with status (Draft / Sent / Won / Lost), cost estimate, quoted price, and margin %.
- **+ New Quotation** opens a form (see 4.1 — the flagship interactive feature).
- A live **Quotation Builder** card shows the full cost breakdown for a draft quote (material, ink, adhesive, cylinder amortization, labour, machine, overheads → total cost → margin → quoted price).
- A **Current Rate Card** reference table shows the material rates the quote is built on, with a note that this pulls from what's entered in Rates Update.

**Pitch angle:** shows the client this isn't just a form — margin is calculated automatically off real material rates, so quoting stops being guesswork.

### 3.4 Planning (`planning.html`) — the gate before production
Bridges Orders and Production. For every order, shows Material Status (Available / Checking / Shortage) and whether it's ready to be scheduled onto a machine.
- **Run Material Check** button.
- A blocked order (material shortage) is visibly flagged red — this is the moment the system prevents a job from starting without material, instead of finding out on the floor.

### 3.5 Production (`production.html`) — the live floor
Every production order, its current stage, assigned machine, operator, and progress bar, with filters (Stage / Machine / Status / Due Date).
- **+ Create Production Order** opens the Job Card creation form (see 4.2).
- Two completed rows (#1011, #0994) link to their full traceability Job Cards.

### 3.6 Product Master (`product-master.html`) — the workflow rulebook
This is the screen that explains *why* the system can handle so many different product types without becoming chaos. Every product (Stand-up Pouch, Roll-fed Label, Shrink Sleeve, Laminated Roll, Industrial Bag, etc.) has its own row showing:
- Category, Type, Material Structure
- **Required Operations** as chips — active stages are solid, skipped stages are shown crossed out (e.g. Roll-fed Label shows Lamination struck through)

An explanatory callout at the bottom spells it out: *"Each product defines its own workflow... When a job is created against a product, the ERP should only present the stages that product actually requires."*

**Pitch angle:** this is the technical heart of the pitch. Walk the client through 2–3 contrasting rows (a pouch that needs all 4 stages vs. a label that skips lamination) so they see the system already understands their real production variety — this isn't a generic template.

### 3.7 Design & Cylinder Management (`design-cylinder.html`) — the print-specific asset registry
Every Rotogravure design and its engraved cylinder set: customer, product, cylinder numbers, colors, storage location, ownership (Customer-owned vs Yuva-owned), cost, and status (Active / Damaged / Needs Rework).
- A **Cylinder History** table shows a full lifecycle for one cylinder set — engraved → allocated to a job → in use → returned to store.

**Pitch angle:** cylinders are an expensive, reusable, easy-to-lose-track-of asset in gravure printing. This screen alone can justify the system to a client who's ever had to re-engrave a cylinder because nobody could find the old one.

### 3.8 Inventory (`inventory.html`) & Warehouse (`warehouse.html`) — raw material stock
- **Inventory**: every material batch, quantity available, warehouse location, health status (Healthy / Low Stock), and current rate. Filterable by category (Films / Ink / Adhesive / Solvents / Consumables / Finished Goods).
- **Warehouse**: a physical zone map — Raw Material Storage, Ink & Chemical Storage, Roll Storage (WIP: printed/laminated/slit rolls), Finished Goods — each location showing what's stored there and how much.

### 3.9 Purchase & Suppliers (`purchase.html`) — procurement
Supplier directory (with materials supplied and last rate) and open Purchase Orders (material, quantity, rate, total, expected date, status: Ordered / In Transit / Delayed / Received).

### 3.10 Rates Update (`rates.html`) — daily pricing entry ⭐ *new*
A dedicated page for the morning ritual of entering today's raw material rates — PET, PE, LDPE, BOPP, Foil, PVC/PETG, POF, PP Woven, all 4 ink colors, adhesive, and solvent (16 materials total). Each row shows yesterday's rate next to an editable "today's rate" field. Hitting **Save Today's Rates** flags what changed with a ▲/▼ % delta and confirms the update.

A callout explains the roadmap honestly: **manual entry today, automatic 3rd-party rate-feed API later** — this is explicitly a Phase 2 item, not something the client should expect on day one.

**Pitch angle:** the client specifically flagged that rates change daily and someone has to key them in each morning — this screen is the direct answer to that requirement, and it's wired so that Quotations and Job Costing automatically use whatever's saved here.

### 3.11 Quality & Waste (`quality-waste.html`) — the control layer
Today's waste %, rejected quantity, open quality issues by severity (Low/Medium/High), and a 7-day waste trend chart. Waste-by-stage breakdown shows where material is being lost across the process.

### 3.12 Machines (`machines.html`) — floor equipment status
A live card per machine (Rotogravure Printing ×2, Lamination ×2, Slitting ×2, Pouch Making) showing current job, operator, today's output, waste %, and downtime — or a Maintenance flag if it's down.

### 3.13 Employees (`employees.html`) — who's on shift
Every staff member, role (Rotogravure Operator, Lamination Operator, Slitting Operator, Pouch Making Operator, Supervisor, Quality Inspector, Warehouse Staff), shift, current machine, and current order.

### 3.14 Dispatch (`dispatch.html`) — finished goods leaving the factory
Orders ready for dispatch, in transit, or delivered, with vehicle/LR number. Includes a real example of a logged delivery issue (short receipt reported by a customer) to show how exceptions are tracked, not hidden.

### 3.15 Reports (`reports.html`) — everything rolled up
Report cards grouped into Commercial & Profitability, Production, Inventory & Cost, and Waste & Quality — each a placeholder "View Report" / "Export" pair, several linking back to their source screen (Quotation, Purchase & Suppliers, Design & Cylinders).

### 3.16 Operator View (`operator.html`) — the shop-floor screen
A separate, large-button, tablet-friendly screen (no sidebar) for the machine operator, not the office. Shows just what they need: current order, product, machine, input roll, input weight, ink used, output, waste — with four big buttons: START JOB, PAUSE, ADD ISSUE, COMPLETE JOB.

**Pitch angle:** this is intentionally a different UI from the rest of the system — the client should understand the office dashboard and the floor tablet are two different experiences for two different users.

---

## 4. The interactive features worth demoing live

### 4.1 New Quotation — auto-filling form
On Quotations, **+ New Quotation** opens a modal. Selecting a **Product** automatically fills in Category, Product Type, Material Structure, Required Operations (as the same chip pattern from Product Master), Unit, and a reference material rate — all without the salesperson typing any of it. This is a direct, visible demonstration of Product Master driving the rest of the system.

### 4.2 New Job / Create Production Order — cascading auto-fill
On Production, **+ Create Production Order** opens a modal. Selecting an **open Order** auto-fills Customer, Product, Quantity, Design/Cylinder, Required Operations, a suggested Machine, and — because a machine was just chosen — the suggested Operator updates too. Changing the machine manually re-suggests a different operator. This shows the system doing scheduling logic, not just data entry.

*(Note for the pitch: these forms don't save anywhere — they're a preview of the intended behavior, useful for the client to click through, not a working data layer yet.)*

### 4.3 Full order traceability — "who did what, and how much material"
This directly answers the requirement to backtrack a completed order. Two finished orders demonstrate it:
- **#1011 (Sugar Pouch, Madhur Sugars)** — a full 4-stage job: Printing → Lamination → Slitting → Pouch Making, each row naming the machine, the operator, and material input/output/waste, plus a timeline, cost breakdown, and dispatch record.
- **#0994 (Shrink Wrap Film, Zenith Beverages)** — deliberately only **one** stage (Slitting), because that product is configured in Product Master to skip Printing, Lamination, and Pouch Making. The other three stages show as "Skipped — not required" instead of being blank or broken. This is the Product Master concept proven end-to-end on a real completed job.

Open either from Orders, Production, or Dispatch — same destination, three entry points.

---

## 5. End-to-end workflow to walk the client through

This is the sequence to click through live, in order — it tells the whole business story in under 10 minutes:

1. **Rates Update** → today's PET/PE/ink rates are entered.
2. **Quotations** → New Quotation, pick a customer + product, watch the form auto-fill the recipe, see the Quotation Builder cost it out using today's rates, quote is sent and won.
3. **Orders** → the won quote becomes a customer order, status "Pending Materials."
4. **Planning** → material check runs; once available, order is ready to schedule.
5. **Production** → Create Production Order (New Job), auto-filled from the order, machine + operator suggested.
6. **Job Card** (click into any running order, e.g. #1024) → watch the stage-by-stage timeline update as it moves through Printing → Lamination → Slitting → Pouch Making → QC.
7. **Quality & Waste** → any issue logged during production shows up here.
8. **Dispatch** → finished job leaves the factory with a vehicle/LR number.
9. **Completed order traceability** (#1011 or #0994) → prove that everything from step 5–8 is retrievable after the fact, stage by stage.
10. **Reports** → roll it all up.

---

## 6. Setting client expectations correctly

Be upfront about what this prototype is and isn't:

- **It's a clickable design, not a working system.** No login, no database, no real calculations happening behind the buttons — every number is realistic sample data, not live computation.
- **Forms (New Quotation, New Job, Rates Update save) don't persist data.** They demonstrate the intended interaction and auto-fill logic, not a functioning backend.
- **This is the basis for the technical proposal** (see `Yuva Polyprint_ERP_Proposal.docx` in this same folder) — the wireframe is what gets scoped and estimated in that document.
- **Rates auto-fetch via 3rd-party API is explicitly Phase 2** — manual entry is the Phase 1 plan, and the wireframe reflects that honestly rather than over-promising.

---

## 7. File reference

All files are flat HTML/CSS/JS in one folder — open `index.html` to start, everything else is linked.

| File | Screen |
|---|---|
| `index.html` | Overview / Dashboard (entry point) |
| `orders.html` | Orders |
| `quotation.html` | Quotations |
| `planning.html` | Planning |
| `production.html` | Production |
| `product-master.html` | Product Master |
| `design-cylinder.html` | Design & Cylinder Management |
| `inventory.html` / `material-detail.html` | Inventory |
| `warehouse.html` | Warehouse |
| `purchase.html` | Purchase & Suppliers |
| `rates.html` | Rates Update |
| `quality-waste.html` | Quality & Waste |
| `machines.html` | Machines |
| `employees.html` | Employees |
| `dispatch.html` | Dispatch |
| `reports.html` | Reports |
| `operator.html` | Operator shop-floor view |
| `order-detail.html` | Job Card template (in-progress order, e.g. #1024) |
| `order-1011.html` | Completed order — full 4-stage traceability |
| `order-0994.html` | Completed order — short workflow traceability |
| `styles.css` | Shared design system (colors, components, typography) |
| `shell.js` | Shared tab-switching logic |
