/* FactoryOS — shared app shell (sidebar + header)
   Each screen sets <body data-page="..." data-title="..." data-breadcrumb="...">
   and includes <div id="sidebar-root"></div> and <div id="header-root"></div> */

const NAV = [
  { group: null, items: [
    { key: "overview", label: "Overview", href: "dashboard.html" }
  ]},
  { group: "Operations", items: [
    { key: "orders", label: "Orders", href: "order-detail.html" },
    { key: "production", label: "Production", href: "production.html" },
    { key: "planning", label: "Planning", href: "production.html" },
    { key: "ongoing", label: "Ongoing Production", href: "dashboard.html" }
  ]},
  { group: "Materials", items: [
    { key: "inventory", label: "Inventory", href: "inventory.html" },
    { key: "warehouse", label: "Warehouse", href: "warehouse.html" }
  ]},
  { group: "Control", items: [
    { key: "quality-waste", label: "Quality & Waste", href: "quality-waste.html" }
  ]},
  { group: "Resources", items: [
    { key: "machines", label: "Machines", href: "machines.html" },
    { key: "employees", label: "Employees", href: "employees.html" },
    { key: "maintenance", label: "Maintenance", href: "machines.html" }
  ]},
  { group: "Insights", items: [
    { key: "reports", label: "Reports", href: "reports.html" },
  ]}
];

function renderSidebar(activeKey){
  const root = document.getElementById("sidebar-root");
  if (!root) return;

  let html = `
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="mark"></div>
        <div class="word">FactoryOS</div>
      </div>
      <div class="nav-scroll">`;

  for (const section of NAV){
    if (section.group) html += `<div><div class="nav-group-label">${section.group}</div><div class="nav-list">`;
    else html += `<div class="nav-list">`;
    for (const item of section.items){
      const active = item.key === activeKey ? "active" : "";
      html += `<a class="nav-item ${active}" href="${item.href}"><span class="icon"></span>${item.label}</a>`;
    }
    html += `</div>${section.group ? "</div>" : ""}`;
  }

  html += `
      </div>
      <div class="sidebar-footer">
        <a class="nav-item" href="#"><span class="icon"></span>Settings</a>
      </div>
    </div>`;

  root.innerHTML = html;
}

function renderHeader(title, breadcrumb){
  const root = document.getElementById("header-root");
  if (!root) return;
  root.innerHTML = `
    <div class="header">
      <div class="header-titles">
        <div class="header-breadcrumb">${breadcrumb || ""}</div>
        <div class="header-title">${title || ""}</div>
      </div>
      <div class="header-search"><span class="icon"></span>Ask about your factory...</div>
      <div class="header-right">
        <div class="header-icon-btn">⌕</div>
        <div class="header-icon-btn">🔔<span class="dot"></span></div>
        <div class="header-avatar">AD</div>
      </div>
    </div>`;
}

function initTabs(){
  const tabs = document.querySelectorAll(".tab[data-tab-target]");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const group = tab.closest(".tabs");
      const panelWrap = group.nextElementSibling ? group.parentElement : document;
      group.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab-target");
      const panels = document.querySelectorAll(".tab-panel");
      panels.forEach(p => p.classList.remove("active"));
      const activePanel = document.getElementById(target);
      if (activePanel) activePanel.classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  renderSidebar(body.getAttribute("data-page"));
  renderHeader(body.getAttribute("data-title"), body.getAttribute("data-breadcrumb"));
  initTabs();
});
