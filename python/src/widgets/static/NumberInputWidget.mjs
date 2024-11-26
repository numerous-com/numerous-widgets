import { r as e, c as T, u as i } from "./index-DQLPm7-6.mjs";
function S({ tooltip: o }) {
  return /* @__PURE__ */ e.createElement("span", { className: "tooltip-icon ml-1.5", "data-tooltip": o }, /* @__PURE__ */ e.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
    /* @__PURE__ */ e.createElement("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ e.createElement("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
    /* @__PURE__ */ e.createElement("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
  ));
}
function w({
  value: o,
  start: u,
  stop: c,
  step: n,
  uiLabel: E,
  uiTooltip: d,
  onChange: p
}) {
  const [b, v] = e.useState(1), l = e.useRef(null), s = e.useRef(null), M = (t) => {
    const r = t.toString();
    return r.includes(".") ? r.split(".")[1].length : 0;
  }, N = (t, r) => Number(t.toFixed(r)), x = (t) => {
    if (!u || !c || !n) return t;
    const r = M(n);
    let m = N(t, r);
    m = Math.max(u, Math.min(c, m));
    const g = Math.round((m - u) / n);
    return m = N(u + g * n, r), Math.max(u, Math.min(c, m));
  }, f = (t) => {
    if (!n) return;
    if (M(n), t === "" || isNaN(Number(t))) {
      p(o || 0);
      return;
    }
    const r = x(Number(t));
    p(r);
  }, h = (t) => {
    n && (f(o + t * n * b), s.current = setTimeout(() => {
      l.current = setInterval(() => {
        v((r) => Math.min(r + 0.5, 10)), f(o + t * n * b);
      }, 50);
    }, 500));
  }, a = () => {
    l.current && (clearInterval(l.current), l.current = null), s.current && (clearTimeout(s.current), s.current = null), v(1);
  };
  return e.useEffect(() => () => {
    l.current && clearInterval(l.current), s.current && clearTimeout(s.current);
  }, []), /* @__PURE__ */ e.createElement("div", { className: "number-input-container" }, /* @__PURE__ */ e.createElement("div", { className: "input-wrapper" }, /* @__PURE__ */ e.createElement("label", { className: "number-label" }, /* @__PURE__ */ e.createElement("span", null, E), d && /* @__PURE__ */ e.createElement(S, { tooltip: d })), /* @__PURE__ */ e.createElement(
    "input",
    {
      type: "number",
      value: o,
      min: u,
      max: c,
      step: n,
      onChange: (t) => f(t.target.value),
      onBlur: (t) => f(t.target.value)
    }
  ), /* @__PURE__ */ e.createElement("div", { className: "buttons" }, /* @__PURE__ */ e.createElement(
    "button",
    {
      className: "step-button",
      onMouseDown: () => h(-1),
      onMouseUp: a,
      onMouseLeave: a,
      onTouchStart: () => h(-1),
      onTouchEnd: a,
      onTouchCancel: a
    },
    "−"
  ), /* @__PURE__ */ e.createElement(
    "button",
    {
      className: "step-button",
      onMouseDown: () => h(1),
      onMouseUp: a,
      onMouseLeave: a,
      onTouchStart: () => h(1),
      onTouchEnd: a,
      onTouchCancel: a
    },
    "+"
  ))));
}
function y() {
  const [o, u] = i("value"), [c] = i("start"), [n] = i("stop"), [E] = i("step"), [d] = i("ui_label"), [p] = i("ui_tooltip");
  return /* @__PURE__ */ e.createElement(
    w,
    {
      value: o,
      start: c,
      stop: n,
      step: E,
      uiLabel: d,
      uiTooltip: p,
      onChange: u
    }
  );
}
const I = {
  render: T(y)
};
export {
  I as default
};
