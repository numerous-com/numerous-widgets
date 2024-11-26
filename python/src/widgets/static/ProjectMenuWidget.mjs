import { R as e, r as v, c as D, u as g } from "./index-DQLPm7-6.mjs";
const w = ({
  items: t,
  onSelectItem: n,
  selectedItemId: l
}) => /* @__PURE__ */ e.createElement("div", { className: "items-list flex flex-col overflow-auto" }, t.map((s) => /* @__PURE__ */ e.createElement(
  "button",
  {
    key: s.id,
    className: `w-full text-left p-3 hover:bg-gray-50 ${l === s.id ? "bg-blue-100 border-l-4 border-blue-500" : ""}`,
    onClick: () => n(s.id),
    "aria-selected": l === s.id,
    role: "option"
  },
  /* @__PURE__ */ e.createElement("h3", { className: "font-medium" }, s.name)
))), O = ({
  projects: t,
  onSelectProject: n,
  selectedProjectId: l
}) => /* @__PURE__ */ e.createElement("div", { className: "mt-4" }, /* @__PURE__ */ e.createElement("h3", { className: "text-md font-semibold mb-2" }, "Projects"), /* @__PURE__ */ e.createElement("div", { className: "border rounded", role: "listbox" }, /* @__PURE__ */ e.createElement(
  w,
  {
    items: t,
    onSelectItem: n,
    selectedItemId: l
  }
))), I = ({
  scenarios: t,
  projectId: n,
  onSelectScenario: l,
  selectedScenarioId: s
}) => {
  const i = t.filter(
    (m) => m.projectId === n
  );
  return /* @__PURE__ */ e.createElement("div", { className: "mt-4" }, /* @__PURE__ */ e.createElement("h3", { className: "text-md font-semibold mb-2" }, "Scenarios"), /* @__PURE__ */ e.createElement("div", { className: "border rounded", role: "listbox" }, /* @__PURE__ */ e.createElement(
    w,
    {
      items: i,
      onSelectItem: l,
      selectedItemId: s
    }
  )));
}, k = ({
  name: t,
  description: n,
  title: l,
  onNameChange: s,
  onDescriptionChange: i,
  children: m
}) => /* @__PURE__ */ e.createElement("div", { className: "flex flex-col h-full overflow-hidden" }, /* @__PURE__ */ e.createElement("div", { className: "scrollable-content" }, /* @__PURE__ */ e.createElement("h2", { className: "text-lg font-semibold mb-4" }, l), /* @__PURE__ */ e.createElement("div", { className: "mb-4" }, /* @__PURE__ */ e.createElement("label", { className: "block mb-2" }, "Name"), /* @__PURE__ */ e.createElement(
  "input",
  {
    type: "text",
    value: t,
    onChange: (o) => s(o.target.value),
    className: "w-full border rounded p-2"
  }
)), /* @__PURE__ */ e.createElement("div", { className: "mb-4" }, /* @__PURE__ */ e.createElement("label", { className: "block mb-2" }, "Description"), /* @__PURE__ */ e.createElement(
  "textarea",
  {
    value: n,
    onChange: (o) => i(o.target.value),
    className: "w-full border rounded p-2",
    rows: 4
  }
)), m)), L = ({
  project: t,
  scenarios: n,
  selectedScenarioId: l,
  onSelectScenario: s,
  onClose: i,
  onSave: m,
  onSaveScenario: o
}) => {
  const [r, d] = v.useState(t.name), [N, x] = v.useState(t.description), [f, E] = v.useState(""), [p, u] = v.useState(""), a = n.find((S) => S.id === l);
  v.useEffect(() => {
    a && (E(a.name), u(a.description || ""));
  }, [a]);
  const h = () => {
    d(t.name), x(t.description), a && (E(a.name), u(a.description || "")), i(!0);
  }, c = () => {
    a ? o == null || o(a.id, f, p) : m(r, N), i(!1);
  };
  return /* @__PURE__ */ e.createElement("div", { className: "flex gap-4" }, /* @__PURE__ */ e.createElement("div", { className: "flex-1 flex flex-col gap-4" }, /* @__PURE__ */ e.createElement(
    k,
    {
      name: r,
      description: N,
      onNameChange: d,
      onDescriptionChange: x,
      title: "Project Details"
    }
  ), /* @__PURE__ */ e.createElement(
    I,
    {
      scenarios: n,
      projectId: t.id,
      onSelectScenario: s,
      selectedScenarioId: l
    }
  )), /* @__PURE__ */ e.createElement("div", { className: "flex-1 flex flex-col gap-4" }, a ? /* @__PURE__ */ e.createElement(
    k,
    {
      name: f,
      description: p,
      onNameChange: E,
      onDescriptionChange: u,
      title: "Scenario Details"
    }
  ) : /* @__PURE__ */ e.createElement("div", { className: "h-full flex items-center justify-center text-gray-500" }, "Select a scenario to view details"), /* @__PURE__ */ e.createElement("div", { className: "flex justify-end gap-2" }, /* @__PURE__ */ e.createElement(
    "button",
    {
      type: "button",
      onClick: h,
      className: "px-4 py-2 border rounded hover:bg-gray-50"
    },
    "Cancel"
  ), /* @__PURE__ */ e.createElement(
    "button",
    {
      type: "button",
      onClick: c,
      disabled: !r || !a,
      className: `px-4 py-2 rounded text-white ${!r || !a ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`
    },
    "OK"
  ))));
}, B = ({
  isOpen: t,
  onClose: n,
  projects: l,
  scenarios: s,
  onUpdateProject: i,
  onSelectProject: m,
  onSelectScenario: o,
  selectedProjectId: r,
  selectedScenarioId: d
}) => {
  if (!t) return null;
  const N = e.useRef(r), x = e.useRef(d), f = l.find((c) => c.id === r), E = e.useMemo(
    () => s.filter((c) => c.projectId === r),
    [s, r]
  ), p = (c) => {
    c === null ? (m(N.current ?? null), o(x.current), n()) : (m(c), c !== r && o(null));
  }, u = (c) => {
    c && (m(N.current ?? null), o(x.current)), n();
  }, a = (c, S) => {
    r && i(r, c, S);
  }, h = (c) => {
    c.target === c.currentTarget && n();
  };
  return /* @__PURE__ */ e.createElement("div", { className: "modal-overlay", onClick: h }, /* @__PURE__ */ e.createElement("div", { className: "modal-container" }, /* @__PURE__ */ e.createElement("div", { className: "modal-header" }, /* @__PURE__ */ e.createElement("h1", { className: "text-2xl font-bold" }, "Project Browser"), /* @__PURE__ */ e.createElement("button", { className: "modal-close-button", onClick: n }, /* @__PURE__ */ e.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ e.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })))), /* @__PURE__ */ e.createElement("div", { className: "flex" }, /* @__PURE__ */ e.createElement("div", { className: "project-list-container" }, /* @__PURE__ */ e.createElement(
    O,
    {
      projects: l,
      onSelectProject: p,
      selectedProjectId: r ?? void 0
    }
  )), f && /* @__PURE__ */ e.createElement("div", { className: "project-details-container" }, /* @__PURE__ */ e.createElement(
    L,
    {
      project: f,
      scenarios: E,
      selectedScenarioId: d,
      onSelectScenario: o,
      onClose: u,
      onSave: a
    }
  )))));
}, R = ({
  selectedProjectName: t,
  selectedScenarioName: n,
  projects: l,
  scenarios: s,
  onUpdateProject: i,
  onSelectProject: m,
  onSelectScenario: o,
  changed: r,
  hasSelection: d,
  onSave: N,
  selectedProjectId: x,
  selectedScenarioId: f
}) => {
  const [E, p] = e.useState(!1), [u, a] = e.useState(!1), h = () => {
    p(!1), t ? N() : a(!0);
  };
  return /* @__PURE__ */ e.createElement("div", { className: "inline-block relative" }, /* @__PURE__ */ e.createElement("div", { className: "flex items-center h-9 border rounded-lg bg-white shadow-sm" }, /* @__PURE__ */ e.createElement("div", { className: "flex items-center px-2 h-full border-r" }, t ? /* @__PURE__ */ e.createElement("div", { className: "flex items-center gap-1.5" }, r && /* @__PURE__ */ e.createElement("div", { className: "w-2 h-2 rounded-full bg-blue-500" }), /* @__PURE__ */ e.createElement("span", { className: "px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-xs font-medium" }, t), n && /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("span", { className: "text-gray-400 text-sm" }, "/"), /* @__PURE__ */ e.createElement("span", { className: "px-2 py-0.5 bg-green-100 text-green-800 rounded-md text-xs font-medium" }, n))) : /* @__PURE__ */ e.createElement("span", { className: "text-gray-500 italic text-xs" }, "No project selected")), /* @__PURE__ */ e.createElement(
    "button",
    {
      onClick: () => p(!E),
      className: "h-full px-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 text-xs font-medium transition-colors"
    },
    /* @__PURE__ */ e.createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ e.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }))
  )), E && /* @__PURE__ */ e.createElement("div", { className: "dropdown-menu" }, /* @__PURE__ */ e.createElement(
    "button",
    {
      onClick: () => {
        a(!0), p(!1);
      },
      className: "dropdown-item"
    },
    "Select"
  ), d && r && /* @__PURE__ */ e.createElement(
    "button",
    {
      onClick: h,
      className: "dropdown-item"
    },
    "Save"
  )), u && /* @__PURE__ */ e.createElement(
    B,
    {
      isOpen: u,
      onClose: () => a(!1),
      projects: l,
      scenarios: s,
      onUpdateProject: i,
      onSelectProject: m,
      onSelectScenario: o,
      selectedProjectId: x,
      selectedScenarioId: f
    }
  ));
};
function W() {
  console.log("ProjectMenuWidget loaded");
  const [t, n] = g("projects"), [l, s] = g("selected_project_id"), [i, m] = g("selected_scenario_id"), [o, r] = g("changed"), [d, N] = g("scenarios"), [x, f] = g("do_save"), [E, p] = v.useState(!1), u = t == null ? void 0 : t.find((b) => b.id === l), a = d == null ? void 0 : d.find((b) => b.id === i), h = (b, C, M) => {
    const P = t == null ? void 0 : t.map(
      (j) => j.id === b ? { ...j, name: C, description: M } : j
    );
    n(P || []), p(!1);
  }, c = (b) => {
    s(b);
  }, S = (b) => {
    m(b);
  }, y = () => {
    f(!0), setTimeout(() => f(!1), 100);
  };
  return /* @__PURE__ */ v.createElement("div", { className: "widget" }, /* @__PURE__ */ v.createElement(
    R,
    {
      selectedProjectName: u == null ? void 0 : u.name,
      selectedScenarioName: a == null ? void 0 : a.name,
      projects: t || [],
      scenarios: d || [],
      onUpdateProject: h,
      onSelectProject: c,
      onSelectScenario: S,
      onSave: y,
      changed: o || !1,
      hasSelection: !!(l && i),
      selectedProjectId: l,
      selectedScenarioId: i
    }
  ));
}
const $ = {
  render: D(W)
};
export {
  $ as default
};
