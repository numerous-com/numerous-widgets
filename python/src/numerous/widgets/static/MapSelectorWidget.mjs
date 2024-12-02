var a0 = Object.defineProperty;
var u0 = (t, e, n) => e in t ? a0(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var yd = (t, e, n) => u0(t, typeof e != "symbol" ? e + "" : e, n);
var Mg = { exports: {} }, H = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uo = Symbol.for("react.element"), c0 = Symbol.for("react.portal"), h0 = Symbol.for("react.fragment"), d0 = Symbol.for("react.strict_mode"), f0 = Symbol.for("react.profiler"), g0 = Symbol.for("react.provider"), p0 = Symbol.for("react.context"), m0 = Symbol.for("react.forward_ref"), _0 = Symbol.for("react.suspense"), y0 = Symbol.for("react.memo"), v0 = Symbol.for("react.lazy"), vd = Symbol.iterator;
function E0(t) {
  return t === null || typeof t != "object" ? null : (t = vd && t[vd] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Pg = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Ag = Object.assign, Dg = {};
function Yr(t, e, n) {
  this.props = t, this.context = e, this.refs = Dg, this.updater = n || Pg;
}
Yr.prototype.isReactComponent = {};
Yr.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
Yr.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function Og() {
}
Og.prototype = Yr.prototype;
function Dc(t, e, n) {
  this.props = t, this.context = e, this.refs = Dg, this.updater = n || Pg;
}
var Oc = Dc.prototype = new Og();
Oc.constructor = Dc;
Ag(Oc, Yr.prototype);
Oc.isPureReactComponent = !0;
var Ed = Array.isArray, Fg = Object.prototype.hasOwnProperty, Fc = { current: null }, Ng = { key: !0, ref: !0, __self: !0, __source: !0 };
function zg(t, e, n) {
  var i, r = {}, s = null, o = null;
  if (e != null) for (i in e.ref !== void 0 && (o = e.ref), e.key !== void 0 && (s = "" + e.key), e) Fg.call(e, i) && !Ng.hasOwnProperty(i) && (r[i] = e[i]);
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  if (t && t.defaultProps) for (i in l = t.defaultProps, l) r[i] === void 0 && (r[i] = l[i]);
  return { $$typeof: uo, type: t, key: s, ref: o, props: r, _owner: Fc.current };
}
function x0(t, e) {
  return { $$typeof: uo, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function Nc(t) {
  return typeof t == "object" && t !== null && t.$$typeof === uo;
}
function w0(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(n) {
    return e[n];
  });
}
var xd = /\/+/g;
function Na(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? w0("" + t.key) : e.toString(36);
}
function el(t, e, n, i, r) {
  var s = typeof t;
  (s === "undefined" || s === "boolean") && (t = null);
  var o = !1;
  if (t === null) o = !0;
  else switch (s) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (t.$$typeof) {
        case uo:
        case c0:
          o = !0;
      }
  }
  if (o) return o = t, r = r(o), t = i === "" ? "." + Na(o, 0) : i, Ed(r) ? (n = "", t != null && (n = t.replace(xd, "$&/") + "/"), el(r, e, n, "", function(u) {
    return u;
  })) : r != null && (Nc(r) && (r = x0(r, n + (!r.key || o && o.key === r.key ? "" : ("" + r.key).replace(xd, "$&/") + "/") + t)), e.push(r)), 1;
  if (o = 0, i = i === "" ? "." : i + ":", Ed(t)) for (var l = 0; l < t.length; l++) {
    s = t[l];
    var a = i + Na(s, l);
    o += el(s, e, n, a, r);
  }
  else if (a = E0(t), typeof a == "function") for (t = a.call(t), l = 0; !(s = t.next()).done; ) s = s.value, a = i + Na(s, l++), o += el(s, e, n, a, r);
  else if (s === "object") throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function To(t, e, n) {
  if (t == null) return t;
  var i = [], r = 0;
  return el(t, i, "", "", function(s) {
    return e.call(n, s, r++);
  }), i;
}
function S0(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(n) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = n);
    }, function(n) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = n);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var $e = { current: null }, tl = { transition: null }, C0 = { ReactCurrentDispatcher: $e, ReactCurrentBatchConfig: tl, ReactCurrentOwner: Fc };
function Gg() {
  throw Error("act(...) is not supported in production builds of React.");
}
H.Children = { map: To, forEach: function(t, e, n) {
  To(t, function() {
    e.apply(this, arguments);
  }, n);
}, count: function(t) {
  var e = 0;
  return To(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return To(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!Nc(t)) throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
H.Component = Yr;
H.Fragment = h0;
H.Profiler = f0;
H.PureComponent = Dc;
H.StrictMode = d0;
H.Suspense = _0;
H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = C0;
H.act = Gg;
H.cloneElement = function(t, e, n) {
  if (t == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var i = Ag({}, t.props), r = t.key, s = t.ref, o = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (s = e.ref, o = Fc.current), e.key !== void 0 && (r = "" + e.key), t.type && t.type.defaultProps) var l = t.type.defaultProps;
    for (a in e) Fg.call(e, a) && !Ng.hasOwnProperty(a) && (i[a] = e[a] === void 0 && l !== void 0 ? l[a] : e[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    i.children = l;
  }
  return { $$typeof: uo, type: t.type, key: r, ref: s, props: i, _owner: o };
};
H.createContext = function(t) {
  return t = { $$typeof: p0, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: g0, _context: t }, t.Consumer = t;
};
H.createElement = zg;
H.createFactory = function(t) {
  var e = zg.bind(null, t);
  return e.type = t, e;
};
H.createRef = function() {
  return { current: null };
};
H.forwardRef = function(t) {
  return { $$typeof: m0, render: t };
};
H.isValidElement = Nc;
H.lazy = function(t) {
  return { $$typeof: v0, _payload: { _status: -1, _result: t }, _init: S0 };
};
H.memo = function(t, e) {
  return { $$typeof: y0, type: t, compare: e === void 0 ? null : e };
};
H.startTransition = function(t) {
  var e = tl.transition;
  tl.transition = {};
  try {
    t();
  } finally {
    tl.transition = e;
  }
};
H.unstable_act = Gg;
H.useCallback = function(t, e) {
  return $e.current.useCallback(t, e);
};
H.useContext = function(t) {
  return $e.current.useContext(t);
};
H.useDebugValue = function() {
};
H.useDeferredValue = function(t) {
  return $e.current.useDeferredValue(t);
};
H.useEffect = function(t, e) {
  return $e.current.useEffect(t, e);
};
H.useId = function() {
  return $e.current.useId();
};
H.useImperativeHandle = function(t, e, n) {
  return $e.current.useImperativeHandle(t, e, n);
};
H.useInsertionEffect = function(t, e) {
  return $e.current.useInsertionEffect(t, e);
};
H.useLayoutEffect = function(t, e) {
  return $e.current.useLayoutEffect(t, e);
};
H.useMemo = function(t, e) {
  return $e.current.useMemo(t, e);
};
H.useReducer = function(t, e, n) {
  return $e.current.useReducer(t, e, n);
};
H.useRef = function(t) {
  return $e.current.useRef(t);
};
H.useState = function(t) {
  return $e.current.useState(t);
};
H.useSyncExternalStore = function(t, e, n) {
  return $e.current.useSyncExternalStore(t, e, n);
};
H.useTransition = function() {
  return $e.current.useTransition();
};
H.version = "18.3.1";
Mg.exports = H;
var Me = Mg.exports, Wg = { exports: {} }, ft = {}, Xg = { exports: {} }, jg = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(t) {
  function e(I, O) {
    var M = I.length;
    I.push(O);
    e: for (; 0 < M; ) {
      var W = M - 1 >>> 1, U = I[W];
      if (0 < r(U, O)) I[W] = O, I[M] = U, M = W;
      else break e;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function i(I) {
    if (I.length === 0) return null;
    var O = I[0], M = I.pop();
    if (M !== O) {
      I[0] = M;
      e: for (var W = 0, U = I.length, me = U >>> 1; W < me; ) {
        var k = 2 * (W + 1) - 1, Ie = I[k], ae = k + 1, de = I[ae];
        if (0 > r(Ie, M)) ae < U && 0 > r(de, Ie) ? (I[W] = de, I[ae] = M, W = ae) : (I[W] = Ie, I[k] = M, W = k);
        else if (ae < U && 0 > r(de, M)) I[W] = de, I[ae] = M, W = ae;
        else break e;
      }
    }
    return O;
  }
  function r(I, O) {
    var M = I.sortIndex - O.sortIndex;
    return M !== 0 ? M : I.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var s = performance;
    t.unstable_now = function() {
      return s.now();
    };
  } else {
    var o = Date, l = o.now();
    t.unstable_now = function() {
      return o.now() - l;
    };
  }
  var a = [], u = [], c = 1, h = null, d = 3, f = !1, m = !1, y = !1, E = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function _(I) {
    for (var O = n(u); O !== null; ) {
      if (O.callback === null) i(u);
      else if (O.startTime <= I) i(u), O.sortIndex = O.expirationTime, e(a, O);
      else break;
      O = n(u);
    }
  }
  function v(I) {
    if (y = !1, _(I), !m) if (n(a) !== null) m = !0, P(x);
    else {
      var O = n(u);
      O !== null && K(v, O.startTime - I);
    }
  }
  function x(I, O) {
    m = !1, y && (y = !1, p(w), w = -1), f = !0;
    var M = d;
    try {
      for (_(O), h = n(a); h !== null && (!(h.expirationTime > O) || I && !N()); ) {
        var W = h.callback;
        if (typeof W == "function") {
          h.callback = null, d = h.priorityLevel;
          var U = W(h.expirationTime <= O);
          O = t.unstable_now(), typeof U == "function" ? h.callback = U : h === n(a) && i(a), _(O);
        } else i(a);
        h = n(a);
      }
      if (h !== null) var me = !0;
      else {
        var k = n(u);
        k !== null && K(v, k.startTime - O), me = !1;
      }
      return me;
    } finally {
      h = null, d = M, f = !1;
    }
  }
  var C = !1, S = null, w = -1, T = 5, A = -1;
  function N() {
    return !(t.unstable_now() - A < T);
  }
  function G() {
    if (S !== null) {
      var I = t.unstable_now();
      A = I;
      var O = !0;
      try {
        O = S(!0, I);
      } finally {
        O ? X() : (C = !1, S = null);
      }
    } else C = !1;
  }
  var X;
  if (typeof g == "function") X = function() {
    g(G);
  };
  else if (typeof MessageChannel < "u") {
    var D = new MessageChannel(), Y = D.port2;
    D.port1.onmessage = G, X = function() {
      Y.postMessage(null);
    };
  } else X = function() {
    E(G, 0);
  };
  function P(I) {
    S = I, C || (C = !0, X());
  }
  function K(I, O) {
    w = E(function() {
      I(t.unstable_now());
    }, O);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, t.unstable_continueExecution = function() {
    m || f || (m = !0, P(x));
  }, t.unstable_forceFrameRate = function(I) {
    0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : T = 0 < I ? Math.floor(1e3 / I) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, t.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, t.unstable_next = function(I) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var O = 3;
        break;
      default:
        O = d;
    }
    var M = d;
    d = O;
    try {
      return I();
    } finally {
      d = M;
    }
  }, t.unstable_pauseExecution = function() {
  }, t.unstable_requestPaint = function() {
  }, t.unstable_runWithPriority = function(I, O) {
    switch (I) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        I = 3;
    }
    var M = d;
    d = I;
    try {
      return O();
    } finally {
      d = M;
    }
  }, t.unstable_scheduleCallback = function(I, O, M) {
    var W = t.unstable_now();
    switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? W + M : W) : M = W, I) {
      case 1:
        var U = -1;
        break;
      case 2:
        U = 250;
        break;
      case 5:
        U = 1073741823;
        break;
      case 4:
        U = 1e4;
        break;
      default:
        U = 5e3;
    }
    return U = M + U, I = { id: c++, callback: O, priorityLevel: I, startTime: M, expirationTime: U, sortIndex: -1 }, M > W ? (I.sortIndex = M, e(u, I), n(a) === null && I === n(u) && (y ? (p(w), w = -1) : y = !0, K(v, M - W))) : (I.sortIndex = U, e(a, I), m || f || (m = !0, P(x))), I;
  }, t.unstable_shouldYield = N, t.unstable_wrapCallback = function(I) {
    var O = d;
    return function() {
      var M = d;
      d = O;
      try {
        return I.apply(this, arguments);
      } finally {
        d = M;
      }
    };
  };
})(jg);
Xg.exports = jg;
var R0 = Xg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var T0 = Me, dt = R0;
function L(t) {
  for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Yg = /* @__PURE__ */ new Set(), As = {};
function Ni(t, e) {
  Lr(t, e), Lr(t + "Capture", e);
}
function Lr(t, e) {
  for (As[t] = e, t = 0; t < e.length; t++) Yg.add(e[t]);
}
var Sn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Lu = Object.prototype.hasOwnProperty, I0 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, wd = {}, Sd = {};
function L0(t) {
  return Lu.call(Sd, t) ? !0 : Lu.call(wd, t) ? !1 : I0.test(t) ? Sd[t] = !0 : (wd[t] = !0, !1);
}
function k0(t, e, n, i) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof e) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return i ? !1 : n !== null ? !n.acceptsBooleans : (t = t.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-");
    default:
      return !1;
  }
}
function M0(t, e, n, i) {
  if (e === null || typeof e > "u" || k0(t, e, n, i)) return !0;
  if (i) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !e;
    case 4:
      return e === !1;
    case 5:
      return isNaN(e);
    case 6:
      return isNaN(e) || 1 > e;
  }
  return !1;
}
function qe(t, e, n, i, r, s, o) {
  this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = s, this.removeEmptyString = o;
}
var Ge = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
  Ge[t] = new qe(t, 0, !1, t, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
  var e = t[0];
  Ge[e] = new qe(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
  Ge[t] = new qe(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
  Ge[t] = new qe(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
  Ge[t] = new qe(t, 3, !1, t.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(t) {
  Ge[t] = new qe(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function(t) {
  Ge[t] = new qe(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(t) {
  Ge[t] = new qe(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function(t) {
  Ge[t] = new qe(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var zc = /[\-:]([a-z])/g;
function Gc(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
  var e = t.replace(
    zc,
    Gc
  );
  Ge[e] = new qe(e, 1, !1, t, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
  var e = t.replace(zc, Gc);
  Ge[e] = new qe(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
  var e = t.replace(zc, Gc);
  Ge[e] = new qe(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(t) {
  Ge[t] = new qe(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
Ge.xlinkHref = new qe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(t) {
  Ge[t] = new qe(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
function Wc(t, e, n, i) {
  var r = Ge.hasOwnProperty(e) ? Ge[e] : null;
  (r !== null ? r.type !== 0 : i || !(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (M0(e, n, r, i) && (n = null), i || r === null ? L0(e) && (n === null ? t.removeAttribute(e) : t.setAttribute(e, "" + n)) : r.mustUseProperty ? t[r.propertyName] = n === null ? r.type === 3 ? !1 : "" : n : (e = r.attributeName, i = r.attributeNamespace, n === null ? t.removeAttribute(e) : (r = r.type, n = r === 3 || r === 4 && n === !0 ? "" : "" + n, i ? t.setAttributeNS(i, e, n) : t.setAttribute(e, n))));
}
var Ln = T0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Io = Symbol.for("react.element"), ir = Symbol.for("react.portal"), rr = Symbol.for("react.fragment"), Xc = Symbol.for("react.strict_mode"), ku = Symbol.for("react.profiler"), Ug = Symbol.for("react.provider"), Bg = Symbol.for("react.context"), jc = Symbol.for("react.forward_ref"), Mu = Symbol.for("react.suspense"), Pu = Symbol.for("react.suspense_list"), Yc = Symbol.for("react.memo"), Xn = Symbol.for("react.lazy"), Vg = Symbol.for("react.offscreen"), Cd = Symbol.iterator;
function Jr(t) {
  return t === null || typeof t != "object" ? null : (t = Cd && t[Cd] || t["@@iterator"], typeof t == "function" ? t : null);
}
var pe = Object.assign, za;
function ds(t) {
  if (za === void 0) try {
    throw Error();
  } catch (n) {
    var e = n.stack.trim().match(/\n( *(at )?)/);
    za = e && e[1] || "";
  }
  return `
` + za + t;
}
var Ga = !1;
function Wa(t, e) {
  if (!t || Ga) return "";
  Ga = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (e) if (e = function() {
      throw Error();
    }, Object.defineProperty(e.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(e, []);
      } catch (u) {
        var i = u;
      }
      Reflect.construct(t, [], e);
    } else {
      try {
        e.call();
      } catch (u) {
        i = u;
      }
      t.call(e.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        i = u;
      }
      t();
    }
  } catch (u) {
    if (u && i && typeof u.stack == "string") {
      for (var r = u.stack.split(`
`), s = i.stack.split(`
`), o = r.length - 1, l = s.length - 1; 1 <= o && 0 <= l && r[o] !== s[l]; ) l--;
      for (; 1 <= o && 0 <= l; o--, l--) if (r[o] !== s[l]) {
        if (o !== 1 || l !== 1)
          do
            if (o--, l--, 0 > l || r[o] !== s[l]) {
              var a = `
` + r[o].replace(" at new ", " at ");
              return t.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", t.displayName)), a;
            }
          while (1 <= o && 0 <= l);
        break;
      }
    }
  } finally {
    Ga = !1, Error.prepareStackTrace = n;
  }
  return (t = t ? t.displayName || t.name : "") ? ds(t) : "";
}
function P0(t) {
  switch (t.tag) {
    case 5:
      return ds(t.type);
    case 16:
      return ds("Lazy");
    case 13:
      return ds("Suspense");
    case 19:
      return ds("SuspenseList");
    case 0:
    case 2:
    case 15:
      return t = Wa(t.type, !1), t;
    case 11:
      return t = Wa(t.type.render, !1), t;
    case 1:
      return t = Wa(t.type, !0), t;
    default:
      return "";
  }
}
function Au(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case rr:
      return "Fragment";
    case ir:
      return "Portal";
    case ku:
      return "Profiler";
    case Xc:
      return "StrictMode";
    case Mu:
      return "Suspense";
    case Pu:
      return "SuspenseList";
  }
  if (typeof t == "object") switch (t.$$typeof) {
    case Bg:
      return (t.displayName || "Context") + ".Consumer";
    case Ug:
      return (t._context.displayName || "Context") + ".Provider";
    case jc:
      var e = t.render;
      return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
    case Yc:
      return e = t.displayName || null, e !== null ? e : Au(t.type) || "Memo";
    case Xn:
      e = t._payload, t = t._init;
      try {
        return Au(t(e));
      } catch {
      }
  }
  return null;
}
function A0(t) {
  var e = t.type;
  switch (t.tag) {
    case 24:
      return "Cache";
    case 9:
      return (e.displayName || "Context") + ".Consumer";
    case 10:
      return (e._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return t = e.render, t = t.displayName || t.name || "", e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return e;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Au(e);
    case 8:
      return e === Xc ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
  }
  return null;
}
function ri(t) {
  switch (typeof t) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function Kg(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function D0(t) {
  var e = Kg(t) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e), i = "" + t[e];
  if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var r = n.get, s = n.set;
    return Object.defineProperty(t, e, { configurable: !0, get: function() {
      return r.call(this);
    }, set: function(o) {
      i = "" + o, s.call(this, o);
    } }), Object.defineProperty(t, e, { enumerable: n.enumerable }), { getValue: function() {
      return i;
    }, setValue: function(o) {
      i = "" + o;
    }, stopTracking: function() {
      t._valueTracker = null, delete t[e];
    } };
  }
}
function Lo(t) {
  t._valueTracker || (t._valueTracker = D0(t));
}
function bg(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var n = e.getValue(), i = "";
  return t && (i = Kg(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
}
function fl(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
function Du(t, e) {
  var n = e.checked;
  return pe({}, e, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? t._wrapperState.initialChecked });
}
function Rd(t, e) {
  var n = e.defaultValue == null ? "" : e.defaultValue, i = e.checked != null ? e.checked : e.defaultChecked;
  n = ri(e.value != null ? e.value : n), t._wrapperState = { initialChecked: i, initialValue: n, controlled: e.type === "checkbox" || e.type === "radio" ? e.checked != null : e.value != null };
}
function Zg(t, e) {
  e = e.checked, e != null && Wc(t, "checked", e, !1);
}
function Ou(t, e) {
  Zg(t, e);
  var n = ri(e.value), i = e.type;
  if (n != null) i === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + n) : t.value !== "" + n && (t.value = "" + n);
  else if (i === "submit" || i === "reset") {
    t.removeAttribute("value");
    return;
  }
  e.hasOwnProperty("value") ? Fu(t, e.type, n) : e.hasOwnProperty("defaultValue") && Fu(t, e.type, ri(e.defaultValue)), e.checked == null && e.defaultChecked != null && (t.defaultChecked = !!e.defaultChecked);
}
function Td(t, e, n) {
  if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
    var i = e.type;
    if (!(i !== "submit" && i !== "reset" || e.value !== void 0 && e.value !== null)) return;
    e = "" + t._wrapperState.initialValue, n || e === t.value || (t.value = e), t.defaultValue = e;
  }
  n = t.name, n !== "" && (t.name = ""), t.defaultChecked = !!t._wrapperState.initialChecked, n !== "" && (t.name = n);
}
function Fu(t, e, n) {
  (e !== "number" || fl(t.ownerDocument) !== t) && (n == null ? t.defaultValue = "" + t._wrapperState.initialValue : t.defaultValue !== "" + n && (t.defaultValue = "" + n));
}
var fs = Array.isArray;
function vr(t, e, n, i) {
  if (t = t.options, e) {
    e = {};
    for (var r = 0; r < n.length; r++) e["$" + n[r]] = !0;
    for (n = 0; n < t.length; n++) r = e.hasOwnProperty("$" + t[n].value), t[n].selected !== r && (t[n].selected = r), r && i && (t[n].defaultSelected = !0);
  } else {
    for (n = "" + ri(n), e = null, r = 0; r < t.length; r++) {
      if (t[r].value === n) {
        t[r].selected = !0, i && (t[r].defaultSelected = !0);
        return;
      }
      e !== null || t[r].disabled || (e = t[r]);
    }
    e !== null && (e.selected = !0);
  }
}
function Nu(t, e) {
  if (e.dangerouslySetInnerHTML != null) throw Error(L(91));
  return pe({}, e, { value: void 0, defaultValue: void 0, children: "" + t._wrapperState.initialValue });
}
function Id(t, e) {
  var n = e.value;
  if (n == null) {
    if (n = e.children, e = e.defaultValue, n != null) {
      if (e != null) throw Error(L(92));
      if (fs(n)) {
        if (1 < n.length) throw Error(L(93));
        n = n[0];
      }
      e = n;
    }
    e == null && (e = ""), n = e;
  }
  t._wrapperState = { initialValue: ri(n) };
}
function Hg(t, e) {
  var n = ri(e.value), i = ri(e.defaultValue);
  n != null && (n = "" + n, n !== t.value && (t.value = n), e.defaultValue == null && t.defaultValue !== n && (t.defaultValue = n)), i != null && (t.defaultValue = "" + i);
}
function Ld(t) {
  var e = t.textContent;
  e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
}
function $g(t) {
  switch (t) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function zu(t, e) {
  return t == null || t === "http://www.w3.org/1999/xhtml" ? $g(e) : t === "http://www.w3.org/2000/svg" && e === "foreignObject" ? "http://www.w3.org/1999/xhtml" : t;
}
var ko, qg = function(t) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(e, n, i, r) {
    MSApp.execUnsafeLocalFunction(function() {
      return t(e, n, i, r);
    });
  } : t;
}(function(t, e) {
  if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t) t.innerHTML = e;
  else {
    for (ko = ko || document.createElement("div"), ko.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>", e = ko.firstChild; t.firstChild; ) t.removeChild(t.firstChild);
    for (; e.firstChild; ) t.appendChild(e.firstChild);
  }
});
function Ds(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var ws = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, O0 = ["Webkit", "ms", "Moz", "O"];
Object.keys(ws).forEach(function(t) {
  O0.forEach(function(e) {
    e = e + t.charAt(0).toUpperCase() + t.substring(1), ws[e] = ws[t];
  });
});
function Qg(t, e, n) {
  return e == null || typeof e == "boolean" || e === "" ? "" : n || typeof e != "number" || e === 0 || ws.hasOwnProperty(t) && ws[t] ? ("" + e).trim() : e + "px";
}
function Jg(t, e) {
  t = t.style;
  for (var n in e) if (e.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, r = Qg(n, e[n], i);
    n === "float" && (n = "cssFloat"), i ? t.setProperty(n, r) : t[n] = r;
  }
}
var F0 = pe({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Gu(t, e) {
  if (e) {
    if (F0[t] && (e.children != null || e.dangerouslySetInnerHTML != null)) throw Error(L(137, t));
    if (e.dangerouslySetInnerHTML != null) {
      if (e.children != null) throw Error(L(60));
      if (typeof e.dangerouslySetInnerHTML != "object" || !("__html" in e.dangerouslySetInnerHTML)) throw Error(L(61));
    }
    if (e.style != null && typeof e.style != "object") throw Error(L(62));
  }
}
function Wu(t, e) {
  if (t.indexOf("-") === -1) return typeof e.is == "string";
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Xu = null;
function Uc(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var ju = null, Er = null, xr = null;
function kd(t) {
  if (t = fo(t)) {
    if (typeof ju != "function") throw Error(L(280));
    var e = t.stateNode;
    e && (e = ta(e), ju(t.stateNode, t.type, e));
  }
}
function ep(t) {
  Er ? xr ? xr.push(t) : xr = [t] : Er = t;
}
function tp() {
  if (Er) {
    var t = Er, e = xr;
    if (xr = Er = null, kd(t), e) for (t = 0; t < e.length; t++) kd(e[t]);
  }
}
function np(t, e) {
  return t(e);
}
function ip() {
}
var Xa = !1;
function rp(t, e, n) {
  if (Xa) return t(e, n);
  Xa = !0;
  try {
    return np(t, e, n);
  } finally {
    Xa = !1, (Er !== null || xr !== null) && (ip(), tp());
  }
}
function Os(t, e) {
  var n = t.stateNode;
  if (n === null) return null;
  var i = ta(n);
  if (i === null) return null;
  n = i[e];
  e: switch (e) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (i = !i.disabled) || (t = t.type, i = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !i;
      break e;
    default:
      t = !1;
  }
  if (t) return null;
  if (n && typeof n != "function") throw Error(L(231, e, typeof n));
  return n;
}
var Yu = !1;
if (Sn) try {
  var es = {};
  Object.defineProperty(es, "passive", { get: function() {
    Yu = !0;
  } }), window.addEventListener("test", es, es), window.removeEventListener("test", es, es);
} catch {
  Yu = !1;
}
function N0(t, e, n, i, r, s, o, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    e.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var Ss = !1, gl = null, pl = !1, Uu = null, z0 = { onError: function(t) {
  Ss = !0, gl = t;
} };
function G0(t, e, n, i, r, s, o, l, a) {
  Ss = !1, gl = null, N0.apply(z0, arguments);
}
function W0(t, e, n, i, r, s, o, l, a) {
  if (G0.apply(this, arguments), Ss) {
    if (Ss) {
      var u = gl;
      Ss = !1, gl = null;
    } else throw Error(L(198));
    pl || (pl = !0, Uu = u);
  }
}
function zi(t) {
  var e = t, n = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do
      e = t, e.flags & 4098 && (n = e.return), t = e.return;
    while (t);
  }
  return e.tag === 3 ? n : null;
}
function sp(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
  }
  return null;
}
function Md(t) {
  if (zi(t) !== t) throw Error(L(188));
}
function X0(t) {
  var e = t.alternate;
  if (!e) {
    if (e = zi(t), e === null) throw Error(L(188));
    return e !== t ? null : t;
  }
  for (var n = t, i = e; ; ) {
    var r = n.return;
    if (r === null) break;
    var s = r.alternate;
    if (s === null) {
      if (i = r.return, i !== null) {
        n = i;
        continue;
      }
      break;
    }
    if (r.child === s.child) {
      for (s = r.child; s; ) {
        if (s === n) return Md(r), t;
        if (s === i) return Md(r), e;
        s = s.sibling;
      }
      throw Error(L(188));
    }
    if (n.return !== i.return) n = r, i = s;
    else {
      for (var o = !1, l = r.child; l; ) {
        if (l === n) {
          o = !0, n = r, i = s;
          break;
        }
        if (l === i) {
          o = !0, i = r, n = s;
          break;
        }
        l = l.sibling;
      }
      if (!o) {
        for (l = s.child; l; ) {
          if (l === n) {
            o = !0, n = s, i = r;
            break;
          }
          if (l === i) {
            o = !0, i = s, n = r;
            break;
          }
          l = l.sibling;
        }
        if (!o) throw Error(L(189));
      }
    }
    if (n.alternate !== i) throw Error(L(190));
  }
  if (n.tag !== 3) throw Error(L(188));
  return n.stateNode.current === n ? t : e;
}
function op(t) {
  return t = X0(t), t !== null ? lp(t) : null;
}
function lp(t) {
  if (t.tag === 5 || t.tag === 6) return t;
  for (t = t.child; t !== null; ) {
    var e = lp(t);
    if (e !== null) return e;
    t = t.sibling;
  }
  return null;
}
var ap = dt.unstable_scheduleCallback, Pd = dt.unstable_cancelCallback, j0 = dt.unstable_shouldYield, Y0 = dt.unstable_requestPaint, xe = dt.unstable_now, U0 = dt.unstable_getCurrentPriorityLevel, Bc = dt.unstable_ImmediatePriority, up = dt.unstable_UserBlockingPriority, ml = dt.unstable_NormalPriority, B0 = dt.unstable_LowPriority, cp = dt.unstable_IdlePriority, ql = null, tn = null;
function V0(t) {
  if (tn && typeof tn.onCommitFiberRoot == "function") try {
    tn.onCommitFiberRoot(ql, t, void 0, (t.current.flags & 128) === 128);
  } catch {
  }
}
var Wt = Math.clz32 ? Math.clz32 : Z0, K0 = Math.log, b0 = Math.LN2;
function Z0(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (K0(t) / b0 | 0) | 0;
}
var Mo = 64, Po = 4194304;
function gs(t) {
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return t & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return t;
  }
}
function _l(t, e) {
  var n = t.pendingLanes;
  if (n === 0) return 0;
  var i = 0, r = t.suspendedLanes, s = t.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var l = o & ~r;
    l !== 0 ? i = gs(l) : (s &= o, s !== 0 && (i = gs(s)));
  } else o = n & ~r, o !== 0 ? i = gs(o) : s !== 0 && (i = gs(s));
  if (i === 0) return 0;
  if (e !== 0 && e !== i && !(e & r) && (r = i & -i, s = e & -e, r >= s || r === 16 && (s & 4194240) !== 0)) return e;
  if (i & 4 && (i |= n & 16), e = t.entangledLanes, e !== 0) for (t = t.entanglements, e &= i; 0 < e; ) n = 31 - Wt(e), r = 1 << n, i |= t[n], e &= ~r;
  return i;
}
function H0(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
      return e + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function $0(t, e) {
  for (var n = t.suspendedLanes, i = t.pingedLanes, r = t.expirationTimes, s = t.pendingLanes; 0 < s; ) {
    var o = 31 - Wt(s), l = 1 << o, a = r[o];
    a === -1 ? (!(l & n) || l & i) && (r[o] = H0(l, e)) : a <= e && (t.expiredLanes |= l), s &= ~l;
  }
}
function Bu(t) {
  return t = t.pendingLanes & -1073741825, t !== 0 ? t : t & 1073741824 ? 1073741824 : 0;
}
function hp() {
  var t = Mo;
  return Mo <<= 1, !(Mo & 4194240) && (Mo = 64), t;
}
function ja(t) {
  for (var e = [], n = 0; 31 > n; n++) e.push(t);
  return e;
}
function co(t, e, n) {
  t.pendingLanes |= e, e !== 536870912 && (t.suspendedLanes = 0, t.pingedLanes = 0), t = t.eventTimes, e = 31 - Wt(e), t[e] = n;
}
function q0(t, e) {
  var n = t.pendingLanes & ~e;
  t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.expiredLanes &= e, t.mutableReadLanes &= e, t.entangledLanes &= e, e = t.entanglements;
  var i = t.eventTimes;
  for (t = t.expirationTimes; 0 < n; ) {
    var r = 31 - Wt(n), s = 1 << r;
    e[r] = 0, i[r] = -1, t[r] = -1, n &= ~s;
  }
}
function Vc(t, e) {
  var n = t.entangledLanes |= e;
  for (t = t.entanglements; n; ) {
    var i = 31 - Wt(n), r = 1 << i;
    r & e | t[i] & e && (t[i] |= e), n &= ~r;
  }
}
var se = 0;
function dp(t) {
  return t &= -t, 1 < t ? 4 < t ? t & 268435455 ? 16 : 536870912 : 4 : 1;
}
var fp, Kc, gp, pp, mp, Vu = !1, Ao = [], Hn = null, $n = null, qn = null, Fs = /* @__PURE__ */ new Map(), Ns = /* @__PURE__ */ new Map(), Un = [], Q0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Ad(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      Hn = null;
      break;
    case "dragenter":
    case "dragleave":
      $n = null;
      break;
    case "mouseover":
    case "mouseout":
      qn = null;
      break;
    case "pointerover":
    case "pointerout":
      Fs.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ns.delete(e.pointerId);
  }
}
function ts(t, e, n, i, r, s) {
  return t === null || t.nativeEvent !== s ? (t = { blockedOn: e, domEventName: n, eventSystemFlags: i, nativeEvent: s, targetContainers: [r] }, e !== null && (e = fo(e), e !== null && Kc(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
}
function J0(t, e, n, i, r) {
  switch (e) {
    case "focusin":
      return Hn = ts(Hn, t, e, n, i, r), !0;
    case "dragenter":
      return $n = ts($n, t, e, n, i, r), !0;
    case "mouseover":
      return qn = ts(qn, t, e, n, i, r), !0;
    case "pointerover":
      var s = r.pointerId;
      return Fs.set(s, ts(Fs.get(s) || null, t, e, n, i, r)), !0;
    case "gotpointercapture":
      return s = r.pointerId, Ns.set(s, ts(Ns.get(s) || null, t, e, n, i, r)), !0;
  }
  return !1;
}
function _p(t) {
  var e = Ei(t.target);
  if (e !== null) {
    var n = zi(e);
    if (n !== null) {
      if (e = n.tag, e === 13) {
        if (e = sp(n), e !== null) {
          t.blockedOn = e, mp(t.priority, function() {
            gp(n);
          });
          return;
        }
      } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function nl(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var n = Ku(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var i = new n.constructor(n.type, n);
      Xu = i, n.target.dispatchEvent(i), Xu = null;
    } else return e = fo(n), e !== null && Kc(e), t.blockedOn = n, !1;
    e.shift();
  }
  return !0;
}
function Dd(t, e, n) {
  nl(t) && n.delete(e);
}
function ey() {
  Vu = !1, Hn !== null && nl(Hn) && (Hn = null), $n !== null && nl($n) && ($n = null), qn !== null && nl(qn) && (qn = null), Fs.forEach(Dd), Ns.forEach(Dd);
}
function ns(t, e) {
  t.blockedOn === e && (t.blockedOn = null, Vu || (Vu = !0, dt.unstable_scheduleCallback(dt.unstable_NormalPriority, ey)));
}
function zs(t) {
  function e(r) {
    return ns(r, t);
  }
  if (0 < Ao.length) {
    ns(Ao[0], t);
    for (var n = 1; n < Ao.length; n++) {
      var i = Ao[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
  }
  for (Hn !== null && ns(Hn, t), $n !== null && ns($n, t), qn !== null && ns(qn, t), Fs.forEach(e), Ns.forEach(e), n = 0; n < Un.length; n++) i = Un[n], i.blockedOn === t && (i.blockedOn = null);
  for (; 0 < Un.length && (n = Un[0], n.blockedOn === null); ) _p(n), n.blockedOn === null && Un.shift();
}
var wr = Ln.ReactCurrentBatchConfig, yl = !0;
function ty(t, e, n, i) {
  var r = se, s = wr.transition;
  wr.transition = null;
  try {
    se = 1, bc(t, e, n, i);
  } finally {
    se = r, wr.transition = s;
  }
}
function ny(t, e, n, i) {
  var r = se, s = wr.transition;
  wr.transition = null;
  try {
    se = 4, bc(t, e, n, i);
  } finally {
    se = r, wr.transition = s;
  }
}
function bc(t, e, n, i) {
  if (yl) {
    var r = Ku(t, e, n, i);
    if (r === null) qa(t, e, i, vl, n), Ad(t, i);
    else if (J0(r, t, e, n, i)) i.stopPropagation();
    else if (Ad(t, i), e & 4 && -1 < Q0.indexOf(t)) {
      for (; r !== null; ) {
        var s = fo(r);
        if (s !== null && fp(s), s = Ku(t, e, n, i), s === null && qa(t, e, i, vl, n), s === r) break;
        r = s;
      }
      r !== null && i.stopPropagation();
    } else qa(t, e, i, null, n);
  }
}
var vl = null;
function Ku(t, e, n, i) {
  if (vl = null, t = Uc(i), t = Ei(t), t !== null) if (e = zi(t), e === null) t = null;
  else if (n = e.tag, n === 13) {
    if (t = sp(e), t !== null) return t;
    t = null;
  } else if (n === 3) {
    if (e.stateNode.current.memoizedState.isDehydrated) return e.tag === 3 ? e.stateNode.containerInfo : null;
    t = null;
  } else e !== t && (t = null);
  return vl = t, null;
}
function yp(t) {
  switch (t) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (U0()) {
        case Bc:
          return 1;
        case up:
          return 4;
        case ml:
        case B0:
          return 16;
        case cp:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Vn = null, Zc = null, il = null;
function vp() {
  if (il) return il;
  var t, e = Zc, n = e.length, i, r = "value" in Vn ? Vn.value : Vn.textContent, s = r.length;
  for (t = 0; t < n && e[t] === r[t]; t++) ;
  var o = n - t;
  for (i = 1; i <= o && e[n - i] === r[s - i]; i++) ;
  return il = r.slice(t, 1 < i ? 1 - i : void 0);
}
function rl(t) {
  var e = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function Do() {
  return !0;
}
function Od() {
  return !1;
}
function gt(t) {
  function e(n, i, r, s, o) {
    this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = s, this.target = o, this.currentTarget = null;
    for (var l in t) t.hasOwnProperty(l) && (n = t[l], this[l] = n ? n(s) : s[l]);
    return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Do : Od, this.isPropagationStopped = Od, this;
  }
  return pe(e.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Do);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Do);
  }, persist: function() {
  }, isPersistent: Do }), e;
}
var Ur = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
  return t.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Hc = gt(Ur), ho = pe({}, Ur, { view: 0, detail: 0 }), iy = gt(ho), Ya, Ua, is, Ql = pe({}, ho, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: $c, button: 0, buttons: 0, relatedTarget: function(t) {
  return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
}, movementX: function(t) {
  return "movementX" in t ? t.movementX : (t !== is && (is && t.type === "mousemove" ? (Ya = t.screenX - is.screenX, Ua = t.screenY - is.screenY) : Ua = Ya = 0, is = t), Ya);
}, movementY: function(t) {
  return "movementY" in t ? t.movementY : Ua;
} }), Fd = gt(Ql), ry = pe({}, Ql, { dataTransfer: 0 }), sy = gt(ry), oy = pe({}, ho, { relatedTarget: 0 }), Ba = gt(oy), ly = pe({}, Ur, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ay = gt(ly), uy = pe({}, Ur, { clipboardData: function(t) {
  return "clipboardData" in t ? t.clipboardData : window.clipboardData;
} }), cy = gt(uy), hy = pe({}, Ur, { data: 0 }), Nd = gt(hy), dy = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, fy = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, gy = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function py(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = gy[t]) ? !!e[t] : !1;
}
function $c() {
  return py;
}
var my = pe({}, ho, { key: function(t) {
  if (t.key) {
    var e = dy[t.key] || t.key;
    if (e !== "Unidentified") return e;
  }
  return t.type === "keypress" ? (t = rl(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? fy[t.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: $c, charCode: function(t) {
  return t.type === "keypress" ? rl(t) : 0;
}, keyCode: function(t) {
  return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
}, which: function(t) {
  return t.type === "keypress" ? rl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
} }), _y = gt(my), yy = pe({}, Ql, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), zd = gt(yy), vy = pe({}, ho, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: $c }), Ey = gt(vy), xy = pe({}, Ur, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), wy = gt(xy), Sy = pe({}, Ql, {
  deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  },
  deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Cy = gt(Sy), Ry = [9, 13, 27, 32], qc = Sn && "CompositionEvent" in window, Cs = null;
Sn && "documentMode" in document && (Cs = document.documentMode);
var Ty = Sn && "TextEvent" in window && !Cs, Ep = Sn && (!qc || Cs && 8 < Cs && 11 >= Cs), Gd = " ", Wd = !1;
function xp(t, e) {
  switch (t) {
    case "keyup":
      return Ry.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function wp(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var sr = !1;
function Iy(t, e) {
  switch (t) {
    case "compositionend":
      return wp(e);
    case "keypress":
      return e.which !== 32 ? null : (Wd = !0, Gd);
    case "textInput":
      return t = e.data, t === Gd && Wd ? null : t;
    default:
      return null;
  }
}
function Ly(t, e) {
  if (sr) return t === "compositionend" || !qc && xp(t, e) ? (t = vp(), il = Zc = Vn = null, sr = !1, t) : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return Ep && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var ky = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Xd(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!ky[t.type] : e === "textarea";
}
function Sp(t, e, n, i) {
  ep(i), e = El(e, "onChange"), 0 < e.length && (n = new Hc("onChange", "change", null, n, i), t.push({ event: n, listeners: e }));
}
var Rs = null, Gs = null;
function My(t) {
  Op(t, 0);
}
function Jl(t) {
  var e = ar(t);
  if (bg(e)) return t;
}
function Py(t, e) {
  if (t === "change") return e;
}
var Cp = !1;
if (Sn) {
  var Va;
  if (Sn) {
    var Ka = "oninput" in document;
    if (!Ka) {
      var jd = document.createElement("div");
      jd.setAttribute("oninput", "return;"), Ka = typeof jd.oninput == "function";
    }
    Va = Ka;
  } else Va = !1;
  Cp = Va && (!document.documentMode || 9 < document.documentMode);
}
function Yd() {
  Rs && (Rs.detachEvent("onpropertychange", Rp), Gs = Rs = null);
}
function Rp(t) {
  if (t.propertyName === "value" && Jl(Gs)) {
    var e = [];
    Sp(e, Gs, t, Uc(t)), rp(My, e);
  }
}
function Ay(t, e, n) {
  t === "focusin" ? (Yd(), Rs = e, Gs = n, Rs.attachEvent("onpropertychange", Rp)) : t === "focusout" && Yd();
}
function Dy(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown") return Jl(Gs);
}
function Oy(t, e) {
  if (t === "click") return Jl(e);
}
function Fy(t, e) {
  if (t === "input" || t === "change") return Jl(e);
}
function Ny(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Yt = typeof Object.is == "function" ? Object.is : Ny;
function Ws(t, e) {
  if (Yt(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null) return !1;
  var n = Object.keys(t), i = Object.keys(e);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var r = n[i];
    if (!Lu.call(e, r) || !Yt(t[r], e[r])) return !1;
  }
  return !0;
}
function Ud(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function Bd(t, e) {
  var n = Ud(t);
  t = 0;
  for (var i; n; ) {
    if (n.nodeType === 3) {
      if (i = t + n.textContent.length, t <= e && i >= e) return { node: n, offset: e - t };
      t = i;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Ud(n);
  }
}
function Tp(t, e) {
  return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Tp(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
}
function Ip() {
  for (var t = window, e = fl(); e instanceof t.HTMLIFrameElement; ) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) t = e.contentWindow;
    else break;
    e = fl(t.document);
  }
  return e;
}
function Qc(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
function zy(t) {
  var e = Ip(), n = t.focusedElem, i = t.selectionRange;
  if (e !== n && n && n.ownerDocument && Tp(n.ownerDocument.documentElement, n)) {
    if (i !== null && Qc(n)) {
      if (e = i.start, t = i.end, t === void 0 && (t = e), "selectionStart" in n) n.selectionStart = e, n.selectionEnd = Math.min(t, n.value.length);
      else if (t = (e = n.ownerDocument || document) && e.defaultView || window, t.getSelection) {
        t = t.getSelection();
        var r = n.textContent.length, s = Math.min(i.start, r);
        i = i.end === void 0 ? s : Math.min(i.end, r), !t.extend && s > i && (r = i, i = s, s = r), r = Bd(n, s);
        var o = Bd(
          n,
          i
        );
        r && o && (t.rangeCount !== 1 || t.anchorNode !== r.node || t.anchorOffset !== r.offset || t.focusNode !== o.node || t.focusOffset !== o.offset) && (e = e.createRange(), e.setStart(r.node, r.offset), t.removeAllRanges(), s > i ? (t.addRange(e), t.extend(o.node, o.offset)) : (e.setEnd(o.node, o.offset), t.addRange(e)));
      }
    }
    for (e = [], t = n; t = t.parentNode; ) t.nodeType === 1 && e.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < e.length; n++) t = e[n], t.element.scrollLeft = t.left, t.element.scrollTop = t.top;
  }
}
var Gy = Sn && "documentMode" in document && 11 >= document.documentMode, or = null, bu = null, Ts = null, Zu = !1;
function Vd(t, e, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Zu || or == null || or !== fl(i) || (i = or, "selectionStart" in i && Qc(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), Ts && Ws(Ts, i) || (Ts = i, i = El(bu, "onSelect"), 0 < i.length && (e = new Hc("onSelect", "select", null, e, n), t.push({ event: e, listeners: i }), e.target = or)));
}
function Oo(t, e) {
  var n = {};
  return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
}
var lr = { animationend: Oo("Animation", "AnimationEnd"), animationiteration: Oo("Animation", "AnimationIteration"), animationstart: Oo("Animation", "AnimationStart"), transitionend: Oo("Transition", "TransitionEnd") }, ba = {}, Lp = {};
Sn && (Lp = document.createElement("div").style, "AnimationEvent" in window || (delete lr.animationend.animation, delete lr.animationiteration.animation, delete lr.animationstart.animation), "TransitionEvent" in window || delete lr.transitionend.transition);
function ea(t) {
  if (ba[t]) return ba[t];
  if (!lr[t]) return t;
  var e = lr[t], n;
  for (n in e) if (e.hasOwnProperty(n) && n in Lp) return ba[t] = e[n];
  return t;
}
var kp = ea("animationend"), Mp = ea("animationiteration"), Pp = ea("animationstart"), Ap = ea("transitionend"), Dp = /* @__PURE__ */ new Map(), Kd = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ai(t, e) {
  Dp.set(t, e), Ni(e, [t]);
}
for (var Za = 0; Za < Kd.length; Za++) {
  var Ha = Kd[Za], Wy = Ha.toLowerCase(), Xy = Ha[0].toUpperCase() + Ha.slice(1);
  ai(Wy, "on" + Xy);
}
ai(kp, "onAnimationEnd");
ai(Mp, "onAnimationIteration");
ai(Pp, "onAnimationStart");
ai("dblclick", "onDoubleClick");
ai("focusin", "onFocus");
ai("focusout", "onBlur");
ai(Ap, "onTransitionEnd");
Lr("onMouseEnter", ["mouseout", "mouseover"]);
Lr("onMouseLeave", ["mouseout", "mouseover"]);
Lr("onPointerEnter", ["pointerout", "pointerover"]);
Lr("onPointerLeave", ["pointerout", "pointerover"]);
Ni("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ni("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ni("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ni("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ni("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ni("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var ps = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), jy = new Set("cancel close invalid load scroll toggle".split(" ").concat(ps));
function bd(t, e, n) {
  var i = t.type || "unknown-event";
  t.currentTarget = n, W0(i, e, void 0, t), t.currentTarget = null;
}
function Op(t, e) {
  e = (e & 4) !== 0;
  for (var n = 0; n < t.length; n++) {
    var i = t[n], r = i.event;
    i = i.listeners;
    e: {
      var s = void 0;
      if (e) for (var o = i.length - 1; 0 <= o; o--) {
        var l = i[o], a = l.instance, u = l.currentTarget;
        if (l = l.listener, a !== s && r.isPropagationStopped()) break e;
        bd(r, l, u), s = a;
      }
      else for (o = 0; o < i.length; o++) {
        if (l = i[o], a = l.instance, u = l.currentTarget, l = l.listener, a !== s && r.isPropagationStopped()) break e;
        bd(r, l, u), s = a;
      }
    }
  }
  if (pl) throw t = Uu, pl = !1, Uu = null, t;
}
function ue(t, e) {
  var n = e[Ju];
  n === void 0 && (n = e[Ju] = /* @__PURE__ */ new Set());
  var i = t + "__bubble";
  n.has(i) || (Fp(e, t, 2, !1), n.add(i));
}
function $a(t, e, n) {
  var i = 0;
  e && (i |= 4), Fp(n, t, i, e);
}
var Fo = "_reactListening" + Math.random().toString(36).slice(2);
function Xs(t) {
  if (!t[Fo]) {
    t[Fo] = !0, Yg.forEach(function(n) {
      n !== "selectionchange" && (jy.has(n) || $a(n, !1, t), $a(n, !0, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[Fo] || (e[Fo] = !0, $a("selectionchange", !1, e));
  }
}
function Fp(t, e, n, i) {
  switch (yp(e)) {
    case 1:
      var r = ty;
      break;
    case 4:
      r = ny;
      break;
    default:
      r = bc;
  }
  n = r.bind(null, e, n, t), r = void 0, !Yu || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), i ? r !== void 0 ? t.addEventListener(e, n, { capture: !0, passive: r }) : t.addEventListener(e, n, !0) : r !== void 0 ? t.addEventListener(e, n, { passive: r }) : t.addEventListener(e, n, !1);
}
function qa(t, e, n, i, r) {
  var s = i;
  if (!(e & 1) && !(e & 2) && i !== null) e: for (; ; ) {
    if (i === null) return;
    var o = i.tag;
    if (o === 3 || o === 4) {
      var l = i.stateNode.containerInfo;
      if (l === r || l.nodeType === 8 && l.parentNode === r) break;
      if (o === 4) for (o = i.return; o !== null; ) {
        var a = o.tag;
        if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === r || a.nodeType === 8 && a.parentNode === r)) return;
        o = o.return;
      }
      for (; l !== null; ) {
        if (o = Ei(l), o === null) return;
        if (a = o.tag, a === 5 || a === 6) {
          i = s = o;
          continue e;
        }
        l = l.parentNode;
      }
    }
    i = i.return;
  }
  rp(function() {
    var u = s, c = Uc(n), h = [];
    e: {
      var d = Dp.get(t);
      if (d !== void 0) {
        var f = Hc, m = t;
        switch (t) {
          case "keypress":
            if (rl(n) === 0) break e;
          case "keydown":
          case "keyup":
            f = _y;
            break;
          case "focusin":
            m = "focus", f = Ba;
            break;
          case "focusout":
            m = "blur", f = Ba;
            break;
          case "beforeblur":
          case "afterblur":
            f = Ba;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            f = Fd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            f = sy;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            f = Ey;
            break;
          case kp:
          case Mp:
          case Pp:
            f = ay;
            break;
          case Ap:
            f = wy;
            break;
          case "scroll":
            f = iy;
            break;
          case "wheel":
            f = Cy;
            break;
          case "copy":
          case "cut":
          case "paste":
            f = cy;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            f = zd;
        }
        var y = (e & 4) !== 0, E = !y && t === "scroll", p = y ? d !== null ? d + "Capture" : null : d;
        y = [];
        for (var g = u, _; g !== null; ) {
          _ = g;
          var v = _.stateNode;
          if (_.tag === 5 && v !== null && (_ = v, p !== null && (v = Os(g, p), v != null && y.push(js(g, v, _)))), E) break;
          g = g.return;
        }
        0 < y.length && (d = new f(d, m, null, n, c), h.push({ event: d, listeners: y }));
      }
    }
    if (!(e & 7)) {
      e: {
        if (d = t === "mouseover" || t === "pointerover", f = t === "mouseout" || t === "pointerout", d && n !== Xu && (m = n.relatedTarget || n.fromElement) && (Ei(m) || m[Cn])) break e;
        if ((f || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, f ? (m = n.relatedTarget || n.toElement, f = u, m = m ? Ei(m) : null, m !== null && (E = zi(m), m !== E || m.tag !== 5 && m.tag !== 6) && (m = null)) : (f = null, m = u), f !== m)) {
          if (y = Fd, v = "onMouseLeave", p = "onMouseEnter", g = "mouse", (t === "pointerout" || t === "pointerover") && (y = zd, v = "onPointerLeave", p = "onPointerEnter", g = "pointer"), E = f == null ? d : ar(f), _ = m == null ? d : ar(m), d = new y(v, g + "leave", f, n, c), d.target = E, d.relatedTarget = _, v = null, Ei(c) === u && (y = new y(p, g + "enter", m, n, c), y.target = _, y.relatedTarget = E, v = y), E = v, f && m) t: {
            for (y = f, p = m, g = 0, _ = y; _; _ = Bi(_)) g++;
            for (_ = 0, v = p; v; v = Bi(v)) _++;
            for (; 0 < g - _; ) y = Bi(y), g--;
            for (; 0 < _ - g; ) p = Bi(p), _--;
            for (; g--; ) {
              if (y === p || p !== null && y === p.alternate) break t;
              y = Bi(y), p = Bi(p);
            }
            y = null;
          }
          else y = null;
          f !== null && Zd(h, d, f, y, !1), m !== null && E !== null && Zd(h, E, m, y, !0);
        }
      }
      e: {
        if (d = u ? ar(u) : window, f = d.nodeName && d.nodeName.toLowerCase(), f === "select" || f === "input" && d.type === "file") var x = Py;
        else if (Xd(d)) if (Cp) x = Fy;
        else {
          x = Dy;
          var C = Ay;
        }
        else (f = d.nodeName) && f.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (x = Oy);
        if (x && (x = x(t, u))) {
          Sp(h, x, n, c);
          break e;
        }
        C && C(t, d, u), t === "focusout" && (C = d._wrapperState) && C.controlled && d.type === "number" && Fu(d, "number", d.value);
      }
      switch (C = u ? ar(u) : window, t) {
        case "focusin":
          (Xd(C) || C.contentEditable === "true") && (or = C, bu = u, Ts = null);
          break;
        case "focusout":
          Ts = bu = or = null;
          break;
        case "mousedown":
          Zu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Zu = !1, Vd(h, n, c);
          break;
        case "selectionchange":
          if (Gy) break;
        case "keydown":
        case "keyup":
          Vd(h, n, c);
      }
      var S;
      if (qc) e: {
        switch (t) {
          case "compositionstart":
            var w = "onCompositionStart";
            break e;
          case "compositionend":
            w = "onCompositionEnd";
            break e;
          case "compositionupdate":
            w = "onCompositionUpdate";
            break e;
        }
        w = void 0;
      }
      else sr ? xp(t, n) && (w = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (w = "onCompositionStart");
      w && (Ep && n.locale !== "ko" && (sr || w !== "onCompositionStart" ? w === "onCompositionEnd" && sr && (S = vp()) : (Vn = c, Zc = "value" in Vn ? Vn.value : Vn.textContent, sr = !0)), C = El(u, w), 0 < C.length && (w = new Nd(w, t, null, n, c), h.push({ event: w, listeners: C }), S ? w.data = S : (S = wp(n), S !== null && (w.data = S)))), (S = Ty ? Iy(t, n) : Ly(t, n)) && (u = El(u, "onBeforeInput"), 0 < u.length && (c = new Nd("onBeforeInput", "beforeinput", null, n, c), h.push({ event: c, listeners: u }), c.data = S));
    }
    Op(h, e);
  });
}
function js(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function El(t, e) {
  for (var n = e + "Capture", i = []; t !== null; ) {
    var r = t, s = r.stateNode;
    r.tag === 5 && s !== null && (r = s, s = Os(t, n), s != null && i.unshift(js(t, s, r)), s = Os(t, e), s != null && i.push(js(t, s, r))), t = t.return;
  }
  return i;
}
function Bi(t) {
  if (t === null) return null;
  do
    t = t.return;
  while (t && t.tag !== 5);
  return t || null;
}
function Zd(t, e, n, i, r) {
  for (var s = e._reactName, o = []; n !== null && n !== i; ) {
    var l = n, a = l.alternate, u = l.stateNode;
    if (a !== null && a === i) break;
    l.tag === 5 && u !== null && (l = u, r ? (a = Os(n, s), a != null && o.unshift(js(n, a, l))) : r || (a = Os(n, s), a != null && o.push(js(n, a, l)))), n = n.return;
  }
  o.length !== 0 && t.push({ event: e, listeners: o });
}
var Yy = /\r\n?/g, Uy = /\u0000|\uFFFD/g;
function Hd(t) {
  return (typeof t == "string" ? t : "" + t).replace(Yy, `
`).replace(Uy, "");
}
function No(t, e, n) {
  if (e = Hd(e), Hd(t) !== e && n) throw Error(L(425));
}
function xl() {
}
var Hu = null, $u = null;
function qu(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var Qu = typeof setTimeout == "function" ? setTimeout : void 0, By = typeof clearTimeout == "function" ? clearTimeout : void 0, $d = typeof Promise == "function" ? Promise : void 0, Vy = typeof queueMicrotask == "function" ? queueMicrotask : typeof $d < "u" ? function(t) {
  return $d.resolve(null).then(t).catch(Ky);
} : Qu;
function Ky(t) {
  setTimeout(function() {
    throw t;
  });
}
function Qa(t, e) {
  var n = e, i = 0;
  do {
    var r = n.nextSibling;
    if (t.removeChild(n), r && r.nodeType === 8) if (n = r.data, n === "/$") {
      if (i === 0) {
        t.removeChild(r), zs(e);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = r;
  } while (n);
  zs(e);
}
function Qn(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (e = t.data, e === "$" || e === "$!" || e === "$?") break;
      if (e === "/$") return null;
    }
  }
  return t;
}
function qd(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (e === 0) return t;
        e--;
      } else n === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
var Br = Math.random().toString(36).slice(2), Ht = "__reactFiber$" + Br, Ys = "__reactProps$" + Br, Cn = "__reactContainer$" + Br, Ju = "__reactEvents$" + Br, by = "__reactListeners$" + Br, Zy = "__reactHandles$" + Br;
function Ei(t) {
  var e = t[Ht];
  if (e) return e;
  for (var n = t.parentNode; n; ) {
    if (e = n[Cn] || n[Ht]) {
      if (n = e.alternate, e.child !== null || n !== null && n.child !== null) for (t = qd(t); t !== null; ) {
        if (n = t[Ht]) return n;
        t = qd(t);
      }
      return e;
    }
    t = n, n = t.parentNode;
  }
  return null;
}
function fo(t) {
  return t = t[Ht] || t[Cn], !t || t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3 ? null : t;
}
function ar(t) {
  if (t.tag === 5 || t.tag === 6) return t.stateNode;
  throw Error(L(33));
}
function ta(t) {
  return t[Ys] || null;
}
var ec = [], ur = -1;
function ui(t) {
  return { current: t };
}
function ce(t) {
  0 > ur || (t.current = ec[ur], ec[ur] = null, ur--);
}
function oe(t, e) {
  ur++, ec[ur] = t.current, t.current = e;
}
var si = {}, Ve = ui(si), ot = ui(!1), ki = si;
function kr(t, e) {
  var n = t.type.contextTypes;
  if (!n) return si;
  var i = t.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === e) return i.__reactInternalMemoizedMaskedChildContext;
  var r = {}, s;
  for (s in n) r[s] = e[s];
  return i && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = e, t.__reactInternalMemoizedMaskedChildContext = r), r;
}
function lt(t) {
  return t = t.childContextTypes, t != null;
}
function wl() {
  ce(ot), ce(Ve);
}
function Qd(t, e, n) {
  if (Ve.current !== si) throw Error(L(168));
  oe(Ve, e), oe(ot, n);
}
function Np(t, e, n) {
  var i = t.stateNode;
  if (e = e.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var r in i) if (!(r in e)) throw Error(L(108, A0(t) || "Unknown", r));
  return pe({}, n, i);
}
function Sl(t) {
  return t = (t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext || si, ki = Ve.current, oe(Ve, t), oe(ot, ot.current), !0;
}
function Jd(t, e, n) {
  var i = t.stateNode;
  if (!i) throw Error(L(169));
  n ? (t = Np(t, e, ki), i.__reactInternalMemoizedMergedChildContext = t, ce(ot), ce(Ve), oe(Ve, t)) : ce(ot), oe(ot, n);
}
var gn = null, na = !1, Ja = !1;
function zp(t) {
  gn === null ? gn = [t] : gn.push(t);
}
function Hy(t) {
  na = !0, zp(t);
}
function ci() {
  if (!Ja && gn !== null) {
    Ja = !0;
    var t = 0, e = se;
    try {
      var n = gn;
      for (se = 1; t < n.length; t++) {
        var i = n[t];
        do
          i = i(!0);
        while (i !== null);
      }
      gn = null, na = !1;
    } catch (r) {
      throw gn !== null && (gn = gn.slice(t + 1)), ap(Bc, ci), r;
    } finally {
      se = e, Ja = !1;
    }
  }
  return null;
}
var cr = [], hr = 0, Cl = null, Rl = 0, xt = [], wt = 0, Mi = null, mn = 1, _n = "";
function _i(t, e) {
  cr[hr++] = Rl, cr[hr++] = Cl, Cl = t, Rl = e;
}
function Gp(t, e, n) {
  xt[wt++] = mn, xt[wt++] = _n, xt[wt++] = Mi, Mi = t;
  var i = mn;
  t = _n;
  var r = 32 - Wt(i) - 1;
  i &= ~(1 << r), n += 1;
  var s = 32 - Wt(e) + r;
  if (30 < s) {
    var o = r - r % 5;
    s = (i & (1 << o) - 1).toString(32), i >>= o, r -= o, mn = 1 << 32 - Wt(e) + r | n << r | i, _n = s + t;
  } else mn = 1 << s | n << r | i, _n = t;
}
function Jc(t) {
  t.return !== null && (_i(t, 1), Gp(t, 1, 0));
}
function eh(t) {
  for (; t === Cl; ) Cl = cr[--hr], cr[hr] = null, Rl = cr[--hr], cr[hr] = null;
  for (; t === Mi; ) Mi = xt[--wt], xt[wt] = null, _n = xt[--wt], xt[wt] = null, mn = xt[--wt], xt[wt] = null;
}
var ht = null, ct = null, he = !1, Ft = null;
function Wp(t, e) {
  var n = Ct(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = e, n.return = t, e = t.deletions, e === null ? (t.deletions = [n], t.flags |= 16) : e.push(n);
}
function ef(t, e) {
  switch (t.tag) {
    case 5:
      var n = t.type;
      return e = e.nodeType !== 1 || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e, e !== null ? (t.stateNode = e, ht = t, ct = Qn(e.firstChild), !0) : !1;
    case 6:
      return e = t.pendingProps === "" || e.nodeType !== 3 ? null : e, e !== null ? (t.stateNode = e, ht = t, ct = null, !0) : !1;
    case 13:
      return e = e.nodeType !== 8 ? null : e, e !== null ? (n = Mi !== null ? { id: mn, overflow: _n } : null, t.memoizedState = { dehydrated: e, treeContext: n, retryLane: 1073741824 }, n = Ct(18, null, null, 0), n.stateNode = e, n.return = t, t.child = n, ht = t, ct = null, !0) : !1;
    default:
      return !1;
  }
}
function tc(t) {
  return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
}
function nc(t) {
  if (he) {
    var e = ct;
    if (e) {
      var n = e;
      if (!ef(t, e)) {
        if (tc(t)) throw Error(L(418));
        e = Qn(n.nextSibling);
        var i = ht;
        e && ef(t, e) ? Wp(i, n) : (t.flags = t.flags & -4097 | 2, he = !1, ht = t);
      }
    } else {
      if (tc(t)) throw Error(L(418));
      t.flags = t.flags & -4097 | 2, he = !1, ht = t;
    }
  }
}
function tf(t) {
  for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13; ) t = t.return;
  ht = t;
}
function zo(t) {
  if (t !== ht) return !1;
  if (!he) return tf(t), he = !0, !1;
  var e;
  if ((e = t.tag !== 3) && !(e = t.tag !== 5) && (e = t.type, e = e !== "head" && e !== "body" && !qu(t.type, t.memoizedProps)), e && (e = ct)) {
    if (tc(t)) throw Xp(), Error(L(418));
    for (; e; ) Wp(t, e), e = Qn(e.nextSibling);
  }
  if (tf(t), t.tag === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(L(317));
    e: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "/$") {
            if (e === 0) {
              ct = Qn(t.nextSibling);
              break e;
            }
            e--;
          } else n !== "$" && n !== "$!" && n !== "$?" || e++;
        }
        t = t.nextSibling;
      }
      ct = null;
    }
  } else ct = ht ? Qn(t.stateNode.nextSibling) : null;
  return !0;
}
function Xp() {
  for (var t = ct; t; ) t = Qn(t.nextSibling);
}
function Mr() {
  ct = ht = null, he = !1;
}
function th(t) {
  Ft === null ? Ft = [t] : Ft.push(t);
}
var $y = Ln.ReactCurrentBatchConfig;
function rs(t, e, n) {
  if (t = n.ref, t !== null && typeof t != "function" && typeof t != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(L(309));
        var i = n.stateNode;
      }
      if (!i) throw Error(L(147, t));
      var r = i, s = "" + t;
      return e !== null && e.ref !== null && typeof e.ref == "function" && e.ref._stringRef === s ? e.ref : (e = function(o) {
        var l = r.refs;
        o === null ? delete l[s] : l[s] = o;
      }, e._stringRef = s, e);
    }
    if (typeof t != "string") throw Error(L(284));
    if (!n._owner) throw Error(L(290, t));
  }
  return t;
}
function Go(t, e) {
  throw t = Object.prototype.toString.call(e), Error(L(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
}
function nf(t) {
  var e = t._init;
  return e(t._payload);
}
function jp(t) {
  function e(p, g) {
    if (t) {
      var _ = p.deletions;
      _ === null ? (p.deletions = [g], p.flags |= 16) : _.push(g);
    }
  }
  function n(p, g) {
    if (!t) return null;
    for (; g !== null; ) e(p, g), g = g.sibling;
    return null;
  }
  function i(p, g) {
    for (p = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? p.set(g.key, g) : p.set(g.index, g), g = g.sibling;
    return p;
  }
  function r(p, g) {
    return p = ni(p, g), p.index = 0, p.sibling = null, p;
  }
  function s(p, g, _) {
    return p.index = _, t ? (_ = p.alternate, _ !== null ? (_ = _.index, _ < g ? (p.flags |= 2, g) : _) : (p.flags |= 2, g)) : (p.flags |= 1048576, g);
  }
  function o(p) {
    return t && p.alternate === null && (p.flags |= 2), p;
  }
  function l(p, g, _, v) {
    return g === null || g.tag !== 6 ? (g = ou(_, p.mode, v), g.return = p, g) : (g = r(g, _), g.return = p, g);
  }
  function a(p, g, _, v) {
    var x = _.type;
    return x === rr ? c(p, g, _.props.children, v, _.key) : g !== null && (g.elementType === x || typeof x == "object" && x !== null && x.$$typeof === Xn && nf(x) === g.type) ? (v = r(g, _.props), v.ref = rs(p, g, _), v.return = p, v) : (v = hl(_.type, _.key, _.props, null, p.mode, v), v.ref = rs(p, g, _), v.return = p, v);
  }
  function u(p, g, _, v) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== _.containerInfo || g.stateNode.implementation !== _.implementation ? (g = lu(_, p.mode, v), g.return = p, g) : (g = r(g, _.children || []), g.return = p, g);
  }
  function c(p, g, _, v, x) {
    return g === null || g.tag !== 7 ? (g = Ii(_, p.mode, v, x), g.return = p, g) : (g = r(g, _), g.return = p, g);
  }
  function h(p, g, _) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = ou("" + g, p.mode, _), g.return = p, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Io:
          return _ = hl(g.type, g.key, g.props, null, p.mode, _), _.ref = rs(p, null, g), _.return = p, _;
        case ir:
          return g = lu(g, p.mode, _), g.return = p, g;
        case Xn:
          var v = g._init;
          return h(p, v(g._payload), _);
      }
      if (fs(g) || Jr(g)) return g = Ii(g, p.mode, _, null), g.return = p, g;
      Go(p, g);
    }
    return null;
  }
  function d(p, g, _, v) {
    var x = g !== null ? g.key : null;
    if (typeof _ == "string" && _ !== "" || typeof _ == "number") return x !== null ? null : l(p, g, "" + _, v);
    if (typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case Io:
          return _.key === x ? a(p, g, _, v) : null;
        case ir:
          return _.key === x ? u(p, g, _, v) : null;
        case Xn:
          return x = _._init, d(
            p,
            g,
            x(_._payload),
            v
          );
      }
      if (fs(_) || Jr(_)) return x !== null ? null : c(p, g, _, v, null);
      Go(p, _);
    }
    return null;
  }
  function f(p, g, _, v, x) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return p = p.get(_) || null, l(g, p, "" + v, x);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Io:
          return p = p.get(v.key === null ? _ : v.key) || null, a(g, p, v, x);
        case ir:
          return p = p.get(v.key === null ? _ : v.key) || null, u(g, p, v, x);
        case Xn:
          var C = v._init;
          return f(p, g, _, C(v._payload), x);
      }
      if (fs(v) || Jr(v)) return p = p.get(_) || null, c(g, p, v, x, null);
      Go(g, v);
    }
    return null;
  }
  function m(p, g, _, v) {
    for (var x = null, C = null, S = g, w = g = 0, T = null; S !== null && w < _.length; w++) {
      S.index > w ? (T = S, S = null) : T = S.sibling;
      var A = d(p, S, _[w], v);
      if (A === null) {
        S === null && (S = T);
        break;
      }
      t && S && A.alternate === null && e(p, S), g = s(A, g, w), C === null ? x = A : C.sibling = A, C = A, S = T;
    }
    if (w === _.length) return n(p, S), he && _i(p, w), x;
    if (S === null) {
      for (; w < _.length; w++) S = h(p, _[w], v), S !== null && (g = s(S, g, w), C === null ? x = S : C.sibling = S, C = S);
      return he && _i(p, w), x;
    }
    for (S = i(p, S); w < _.length; w++) T = f(S, p, w, _[w], v), T !== null && (t && T.alternate !== null && S.delete(T.key === null ? w : T.key), g = s(T, g, w), C === null ? x = T : C.sibling = T, C = T);
    return t && S.forEach(function(N) {
      return e(p, N);
    }), he && _i(p, w), x;
  }
  function y(p, g, _, v) {
    var x = Jr(_);
    if (typeof x != "function") throw Error(L(150));
    if (_ = x.call(_), _ == null) throw Error(L(151));
    for (var C = x = null, S = g, w = g = 0, T = null, A = _.next(); S !== null && !A.done; w++, A = _.next()) {
      S.index > w ? (T = S, S = null) : T = S.sibling;
      var N = d(p, S, A.value, v);
      if (N === null) {
        S === null && (S = T);
        break;
      }
      t && S && N.alternate === null && e(p, S), g = s(N, g, w), C === null ? x = N : C.sibling = N, C = N, S = T;
    }
    if (A.done) return n(
      p,
      S
    ), he && _i(p, w), x;
    if (S === null) {
      for (; !A.done; w++, A = _.next()) A = h(p, A.value, v), A !== null && (g = s(A, g, w), C === null ? x = A : C.sibling = A, C = A);
      return he && _i(p, w), x;
    }
    for (S = i(p, S); !A.done; w++, A = _.next()) A = f(S, p, w, A.value, v), A !== null && (t && A.alternate !== null && S.delete(A.key === null ? w : A.key), g = s(A, g, w), C === null ? x = A : C.sibling = A, C = A);
    return t && S.forEach(function(G) {
      return e(p, G);
    }), he && _i(p, w), x;
  }
  function E(p, g, _, v) {
    if (typeof _ == "object" && _ !== null && _.type === rr && _.key === null && (_ = _.props.children), typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case Io:
          e: {
            for (var x = _.key, C = g; C !== null; ) {
              if (C.key === x) {
                if (x = _.type, x === rr) {
                  if (C.tag === 7) {
                    n(p, C.sibling), g = r(C, _.props.children), g.return = p, p = g;
                    break e;
                  }
                } else if (C.elementType === x || typeof x == "object" && x !== null && x.$$typeof === Xn && nf(x) === C.type) {
                  n(p, C.sibling), g = r(C, _.props), g.ref = rs(p, C, _), g.return = p, p = g;
                  break e;
                }
                n(p, C);
                break;
              } else e(p, C);
              C = C.sibling;
            }
            _.type === rr ? (g = Ii(_.props.children, p.mode, v, _.key), g.return = p, p = g) : (v = hl(_.type, _.key, _.props, null, p.mode, v), v.ref = rs(p, g, _), v.return = p, p = v);
          }
          return o(p);
        case ir:
          e: {
            for (C = _.key; g !== null; ) {
              if (g.key === C) if (g.tag === 4 && g.stateNode.containerInfo === _.containerInfo && g.stateNode.implementation === _.implementation) {
                n(p, g.sibling), g = r(g, _.children || []), g.return = p, p = g;
                break e;
              } else {
                n(p, g);
                break;
              }
              else e(p, g);
              g = g.sibling;
            }
            g = lu(_, p.mode, v), g.return = p, p = g;
          }
          return o(p);
        case Xn:
          return C = _._init, E(p, g, C(_._payload), v);
      }
      if (fs(_)) return m(p, g, _, v);
      if (Jr(_)) return y(p, g, _, v);
      Go(p, _);
    }
    return typeof _ == "string" && _ !== "" || typeof _ == "number" ? (_ = "" + _, g !== null && g.tag === 6 ? (n(p, g.sibling), g = r(g, _), g.return = p, p = g) : (n(p, g), g = ou(_, p.mode, v), g.return = p, p = g), o(p)) : n(p, g);
  }
  return E;
}
var Pr = jp(!0), Yp = jp(!1), Tl = ui(null), Il = null, dr = null, nh = null;
function ih() {
  nh = dr = Il = null;
}
function rh(t) {
  var e = Tl.current;
  ce(Tl), t._currentValue = e;
}
function ic(t, e, n) {
  for (; t !== null; ) {
    var i = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
    t = t.return;
  }
}
function Sr(t, e) {
  Il = t, nh = dr = null, t = t.dependencies, t !== null && t.firstContext !== null && (t.lanes & e && (rt = !0), t.firstContext = null);
}
function It(t) {
  var e = t._currentValue;
  if (nh !== t) if (t = { context: t, memoizedValue: e, next: null }, dr === null) {
    if (Il === null) throw Error(L(308));
    dr = t, Il.dependencies = { lanes: 0, firstContext: t };
  } else dr = dr.next = t;
  return e;
}
var xi = null;
function sh(t) {
  xi === null ? xi = [t] : xi.push(t);
}
function Up(t, e, n, i) {
  var r = e.interleaved;
  return r === null ? (n.next = n, sh(e)) : (n.next = r.next, r.next = n), e.interleaved = n, Rn(t, i);
}
function Rn(t, e) {
  t.lanes |= e;
  var n = t.alternate;
  for (n !== null && (n.lanes |= e), n = t, t = t.return; t !== null; ) t.childLanes |= e, n = t.alternate, n !== null && (n.childLanes |= e), n = t, t = t.return;
  return n.tag === 3 ? n.stateNode : null;
}
var jn = !1;
function oh(t) {
  t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Bp(t, e) {
  t = t.updateQueue, e.updateQueue === t && (e.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, effects: t.effects });
}
function yn(t, e) {
  return { eventTime: t, lane: e, tag: 0, payload: null, callback: null, next: null };
}
function Jn(t, e, n) {
  var i = t.updateQueue;
  if (i === null) return null;
  if (i = i.shared, Q & 2) {
    var r = i.pending;
    return r === null ? e.next = e : (e.next = r.next, r.next = e), i.pending = e, Rn(t, n);
  }
  return r = i.interleaved, r === null ? (e.next = e, sh(i)) : (e.next = r.next, r.next = e), i.interleaved = e, Rn(t, n);
}
function sl(t, e, n) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194240) !== 0)) {
    var i = e.lanes;
    i &= t.pendingLanes, n |= i, e.lanes = n, Vc(t, n);
  }
}
function rf(t, e) {
  var n = t.updateQueue, i = t.alternate;
  if (i !== null && (i = i.updateQueue, n === i)) {
    var r = null, s = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        s === null ? r = s = o : s = s.next = o, n = n.next;
      } while (n !== null);
      s === null ? r = s = e : s = s.next = e;
    } else r = s = e;
    n = { baseState: i.baseState, firstBaseUpdate: r, lastBaseUpdate: s, shared: i.shared, effects: i.effects }, t.updateQueue = n;
    return;
  }
  t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
}
function Ll(t, e, n, i) {
  var r = t.updateQueue;
  jn = !1;
  var s = r.firstBaseUpdate, o = r.lastBaseUpdate, l = r.shared.pending;
  if (l !== null) {
    r.shared.pending = null;
    var a = l, u = a.next;
    a.next = null, o === null ? s = u : o.next = u, o = a;
    var c = t.alternate;
    c !== null && (c = c.updateQueue, l = c.lastBaseUpdate, l !== o && (l === null ? c.firstBaseUpdate = u : l.next = u, c.lastBaseUpdate = a));
  }
  if (s !== null) {
    var h = r.baseState;
    o = 0, c = u = a = null, l = s;
    do {
      var d = l.lane, f = l.eventTime;
      if ((i & d) === d) {
        c !== null && (c = c.next = {
          eventTime: f,
          lane: 0,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null
        });
        e: {
          var m = t, y = l;
          switch (d = e, f = n, y.tag) {
            case 1:
              if (m = y.payload, typeof m == "function") {
                h = m.call(f, h, d);
                break e;
              }
              h = m;
              break e;
            case 3:
              m.flags = m.flags & -65537 | 128;
            case 0:
              if (m = y.payload, d = typeof m == "function" ? m.call(f, h, d) : m, d == null) break e;
              h = pe({}, h, d);
              break e;
            case 2:
              jn = !0;
          }
        }
        l.callback !== null && l.lane !== 0 && (t.flags |= 64, d = r.effects, d === null ? r.effects = [l] : d.push(l));
      } else f = { eventTime: f, lane: d, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, c === null ? (u = c = f, a = h) : c = c.next = f, o |= d;
      if (l = l.next, l === null) {
        if (l = r.shared.pending, l === null) break;
        d = l, l = d.next, d.next = null, r.lastBaseUpdate = d, r.shared.pending = null;
      }
    } while (!0);
    if (c === null && (a = h), r.baseState = a, r.firstBaseUpdate = u, r.lastBaseUpdate = c, e = r.shared.interleaved, e !== null) {
      r = e;
      do
        o |= r.lane, r = r.next;
      while (r !== e);
    } else s === null && (r.shared.lanes = 0);
    Ai |= o, t.lanes = o, t.memoizedState = h;
  }
}
function sf(t, e, n) {
  if (t = e.effects, e.effects = null, t !== null) for (e = 0; e < t.length; e++) {
    var i = t[e], r = i.callback;
    if (r !== null) {
      if (i.callback = null, i = n, typeof r != "function") throw Error(L(191, r));
      r.call(i);
    }
  }
}
var go = {}, nn = ui(go), Us = ui(go), Bs = ui(go);
function wi(t) {
  if (t === go) throw Error(L(174));
  return t;
}
function lh(t, e) {
  switch (oe(Bs, e), oe(Us, t), oe(nn, go), t = e.nodeType, t) {
    case 9:
    case 11:
      e = (e = e.documentElement) ? e.namespaceURI : zu(null, "");
      break;
    default:
      t = t === 8 ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = zu(e, t);
  }
  ce(nn), oe(nn, e);
}
function Ar() {
  ce(nn), ce(Us), ce(Bs);
}
function Vp(t) {
  wi(Bs.current);
  var e = wi(nn.current), n = zu(e, t.type);
  e !== n && (oe(Us, t), oe(nn, n));
}
function ah(t) {
  Us.current === t && (ce(nn), ce(Us));
}
var fe = ui(0);
function kl(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      e.child.return = e, e = e.child;
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    e.sibling.return = e.return, e = e.sibling;
  }
  return null;
}
var eu = [];
function uh() {
  for (var t = 0; t < eu.length; t++) eu[t]._workInProgressVersionPrimary = null;
  eu.length = 0;
}
var ol = Ln.ReactCurrentDispatcher, tu = Ln.ReactCurrentBatchConfig, Pi = 0, ge = null, Re = null, Pe = null, Ml = !1, Is = !1, Vs = 0, qy = 0;
function We() {
  throw Error(L(321));
}
function ch(t, e) {
  if (e === null) return !1;
  for (var n = 0; n < e.length && n < t.length; n++) if (!Yt(t[n], e[n])) return !1;
  return !0;
}
function hh(t, e, n, i, r, s) {
  if (Pi = s, ge = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, ol.current = t === null || t.memoizedState === null ? t1 : n1, t = n(i, r), Is) {
    s = 0;
    do {
      if (Is = !1, Vs = 0, 25 <= s) throw Error(L(301));
      s += 1, Pe = Re = null, e.updateQueue = null, ol.current = i1, t = n(i, r);
    } while (Is);
  }
  if (ol.current = Pl, e = Re !== null && Re.next !== null, Pi = 0, Pe = Re = ge = null, Ml = !1, e) throw Error(L(300));
  return t;
}
function dh() {
  var t = Vs !== 0;
  return Vs = 0, t;
}
function Zt() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Pe === null ? ge.memoizedState = Pe = t : Pe = Pe.next = t, Pe;
}
function Lt() {
  if (Re === null) {
    var t = ge.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = Re.next;
  var e = Pe === null ? ge.memoizedState : Pe.next;
  if (e !== null) Pe = e, Re = t;
  else {
    if (t === null) throw Error(L(310));
    Re = t, t = { memoizedState: Re.memoizedState, baseState: Re.baseState, baseQueue: Re.baseQueue, queue: Re.queue, next: null }, Pe === null ? ge.memoizedState = Pe = t : Pe = Pe.next = t;
  }
  return Pe;
}
function Ks(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function nu(t) {
  var e = Lt(), n = e.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = t;
  var i = Re, r = i.baseQueue, s = n.pending;
  if (s !== null) {
    if (r !== null) {
      var o = r.next;
      r.next = s.next, s.next = o;
    }
    i.baseQueue = r = s, n.pending = null;
  }
  if (r !== null) {
    s = r.next, i = i.baseState;
    var l = o = null, a = null, u = s;
    do {
      var c = u.lane;
      if ((Pi & c) === c) a !== null && (a = a.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), i = u.hasEagerState ? u.eagerState : t(i, u.action);
      else {
        var h = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        a === null ? (l = a = h, o = i) : a = a.next = h, ge.lanes |= c, Ai |= c;
      }
      u = u.next;
    } while (u !== null && u !== s);
    a === null ? o = i : a.next = l, Yt(i, e.memoizedState) || (rt = !0), e.memoizedState = i, e.baseState = o, e.baseQueue = a, n.lastRenderedState = i;
  }
  if (t = n.interleaved, t !== null) {
    r = t;
    do
      s = r.lane, ge.lanes |= s, Ai |= s, r = r.next;
    while (r !== t);
  } else r === null && (n.lanes = 0);
  return [e.memoizedState, n.dispatch];
}
function iu(t) {
  var e = Lt(), n = e.queue;
  if (n === null) throw Error(L(311));
  n.lastRenderedReducer = t;
  var i = n.dispatch, r = n.pending, s = e.memoizedState;
  if (r !== null) {
    n.pending = null;
    var o = r = r.next;
    do
      s = t(s, o.action), o = o.next;
    while (o !== r);
    Yt(s, e.memoizedState) || (rt = !0), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), n.lastRenderedState = s;
  }
  return [s, i];
}
function Kp() {
}
function bp(t, e) {
  var n = ge, i = Lt(), r = e(), s = !Yt(i.memoizedState, r);
  if (s && (i.memoizedState = r, rt = !0), i = i.queue, fh($p.bind(null, n, i, t), [t]), i.getSnapshot !== e || s || Pe !== null && Pe.memoizedState.tag & 1) {
    if (n.flags |= 2048, bs(9, Hp.bind(null, n, i, r, e), void 0, null), Ae === null) throw Error(L(349));
    Pi & 30 || Zp(n, e, r);
  }
  return r;
}
function Zp(t, e, n) {
  t.flags |= 16384, t = { getSnapshot: e, value: n }, e = ge.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, ge.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
}
function Hp(t, e, n, i) {
  e.value = n, e.getSnapshot = i, qp(e) && Qp(t);
}
function $p(t, e, n) {
  return n(function() {
    qp(e) && Qp(t);
  });
}
function qp(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Yt(t, n);
  } catch {
    return !0;
  }
}
function Qp(t) {
  var e = Rn(t, 1);
  e !== null && Xt(e, t, 1, -1);
}
function of(t) {
  var e = Zt();
  return typeof t == "function" && (t = t()), e.memoizedState = e.baseState = t, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ks, lastRenderedState: t }, e.queue = t, t = t.dispatch = e1.bind(null, ge, t), [e.memoizedState, t];
}
function bs(t, e, n, i) {
  return t = { tag: t, create: e, destroy: n, deps: i, next: null }, e = ge.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, ge.updateQueue = e, e.lastEffect = t.next = t) : (n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t)), t;
}
function Jp() {
  return Lt().memoizedState;
}
function ll(t, e, n, i) {
  var r = Zt();
  ge.flags |= t, r.memoizedState = bs(1 | e, n, void 0, i === void 0 ? null : i);
}
function ia(t, e, n, i) {
  var r = Lt();
  i = i === void 0 ? null : i;
  var s = void 0;
  if (Re !== null) {
    var o = Re.memoizedState;
    if (s = o.destroy, i !== null && ch(i, o.deps)) {
      r.memoizedState = bs(e, n, s, i);
      return;
    }
  }
  ge.flags |= t, r.memoizedState = bs(1 | e, n, s, i);
}
function lf(t, e) {
  return ll(8390656, 8, t, e);
}
function fh(t, e) {
  return ia(2048, 8, t, e);
}
function em(t, e) {
  return ia(4, 2, t, e);
}
function tm(t, e) {
  return ia(4, 4, t, e);
}
function nm(t, e) {
  if (typeof e == "function") return t = t(), e(t), function() {
    e(null);
  };
  if (e != null) return t = t(), e.current = t, function() {
    e.current = null;
  };
}
function im(t, e, n) {
  return n = n != null ? n.concat([t]) : null, ia(4, 4, nm.bind(null, e, t), n);
}
function gh() {
}
function rm(t, e) {
  var n = Lt();
  e = e === void 0 ? null : e;
  var i = n.memoizedState;
  return i !== null && e !== null && ch(e, i[1]) ? i[0] : (n.memoizedState = [t, e], t);
}
function sm(t, e) {
  var n = Lt();
  e = e === void 0 ? null : e;
  var i = n.memoizedState;
  return i !== null && e !== null && ch(e, i[1]) ? i[0] : (t = t(), n.memoizedState = [t, e], t);
}
function om(t, e, n) {
  return Pi & 21 ? (Yt(n, e) || (n = hp(), ge.lanes |= n, Ai |= n, t.baseState = !0), e) : (t.baseState && (t.baseState = !1, rt = !0), t.memoizedState = n);
}
function Qy(t, e) {
  var n = se;
  se = n !== 0 && 4 > n ? n : 4, t(!0);
  var i = tu.transition;
  tu.transition = {};
  try {
    t(!1), e();
  } finally {
    se = n, tu.transition = i;
  }
}
function lm() {
  return Lt().memoizedState;
}
function Jy(t, e, n) {
  var i = ti(t);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, am(t)) um(e, n);
  else if (n = Up(t, e, n, i), n !== null) {
    var r = He();
    Xt(n, t, i, r), cm(n, e, i);
  }
}
function e1(t, e, n) {
  var i = ti(t), r = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (am(t)) um(e, r);
  else {
    var s = t.alternate;
    if (t.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null)) try {
      var o = e.lastRenderedState, l = s(o, n);
      if (r.hasEagerState = !0, r.eagerState = l, Yt(l, o)) {
        var a = e.interleaved;
        a === null ? (r.next = r, sh(e)) : (r.next = a.next, a.next = r), e.interleaved = r;
        return;
      }
    } catch {
    } finally {
    }
    n = Up(t, e, r, i), n !== null && (r = He(), Xt(n, t, i, r), cm(n, e, i));
  }
}
function am(t) {
  var e = t.alternate;
  return t === ge || e !== null && e === ge;
}
function um(t, e) {
  Is = Ml = !0;
  var n = t.pending;
  n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
}
function cm(t, e, n) {
  if (n & 4194240) {
    var i = e.lanes;
    i &= t.pendingLanes, n |= i, e.lanes = n, Vc(t, n);
  }
}
var Pl = { readContext: It, useCallback: We, useContext: We, useEffect: We, useImperativeHandle: We, useInsertionEffect: We, useLayoutEffect: We, useMemo: We, useReducer: We, useRef: We, useState: We, useDebugValue: We, useDeferredValue: We, useTransition: We, useMutableSource: We, useSyncExternalStore: We, useId: We, unstable_isNewReconciler: !1 }, t1 = { readContext: It, useCallback: function(t, e) {
  return Zt().memoizedState = [t, e === void 0 ? null : e], t;
}, useContext: It, useEffect: lf, useImperativeHandle: function(t, e, n) {
  return n = n != null ? n.concat([t]) : null, ll(
    4194308,
    4,
    nm.bind(null, e, t),
    n
  );
}, useLayoutEffect: function(t, e) {
  return ll(4194308, 4, t, e);
}, useInsertionEffect: function(t, e) {
  return ll(4, 2, t, e);
}, useMemo: function(t, e) {
  var n = Zt();
  return e = e === void 0 ? null : e, t = t(), n.memoizedState = [t, e], t;
}, useReducer: function(t, e, n) {
  var i = Zt();
  return e = n !== void 0 ? n(e) : e, i.memoizedState = i.baseState = e, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: e }, i.queue = t, t = t.dispatch = Jy.bind(null, ge, t), [i.memoizedState, t];
}, useRef: function(t) {
  var e = Zt();
  return t = { current: t }, e.memoizedState = t;
}, useState: of, useDebugValue: gh, useDeferredValue: function(t) {
  return Zt().memoizedState = t;
}, useTransition: function() {
  var t = of(!1), e = t[0];
  return t = Qy.bind(null, t[1]), Zt().memoizedState = t, [e, t];
}, useMutableSource: function() {
}, useSyncExternalStore: function(t, e, n) {
  var i = ge, r = Zt();
  if (he) {
    if (n === void 0) throw Error(L(407));
    n = n();
  } else {
    if (n = e(), Ae === null) throw Error(L(349));
    Pi & 30 || Zp(i, e, n);
  }
  r.memoizedState = n;
  var s = { value: n, getSnapshot: e };
  return r.queue = s, lf($p.bind(
    null,
    i,
    s,
    t
  ), [t]), i.flags |= 2048, bs(9, Hp.bind(null, i, s, n, e), void 0, null), n;
}, useId: function() {
  var t = Zt(), e = Ae.identifierPrefix;
  if (he) {
    var n = _n, i = mn;
    n = (i & ~(1 << 32 - Wt(i) - 1)).toString(32) + n, e = ":" + e + "R" + n, n = Vs++, 0 < n && (e += "H" + n.toString(32)), e += ":";
  } else n = qy++, e = ":" + e + "r" + n.toString(32) + ":";
  return t.memoizedState = e;
}, unstable_isNewReconciler: !1 }, n1 = {
  readContext: It,
  useCallback: rm,
  useContext: It,
  useEffect: fh,
  useImperativeHandle: im,
  useInsertionEffect: em,
  useLayoutEffect: tm,
  useMemo: sm,
  useReducer: nu,
  useRef: Jp,
  useState: function() {
    return nu(Ks);
  },
  useDebugValue: gh,
  useDeferredValue: function(t) {
    var e = Lt();
    return om(e, Re.memoizedState, t);
  },
  useTransition: function() {
    var t = nu(Ks)[0], e = Lt().memoizedState;
    return [t, e];
  },
  useMutableSource: Kp,
  useSyncExternalStore: bp,
  useId: lm,
  unstable_isNewReconciler: !1
}, i1 = { readContext: It, useCallback: rm, useContext: It, useEffect: fh, useImperativeHandle: im, useInsertionEffect: em, useLayoutEffect: tm, useMemo: sm, useReducer: iu, useRef: Jp, useState: function() {
  return iu(Ks);
}, useDebugValue: gh, useDeferredValue: function(t) {
  var e = Lt();
  return Re === null ? e.memoizedState = t : om(e, Re.memoizedState, t);
}, useTransition: function() {
  var t = iu(Ks)[0], e = Lt().memoizedState;
  return [t, e];
}, useMutableSource: Kp, useSyncExternalStore: bp, useId: lm, unstable_isNewReconciler: !1 };
function Dt(t, e) {
  if (t && t.defaultProps) {
    e = pe({}, e), t = t.defaultProps;
    for (var n in t) e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function rc(t, e, n, i) {
  e = t.memoizedState, n = n(i, e), n = n == null ? e : pe({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
}
var ra = { isMounted: function(t) {
  return (t = t._reactInternals) ? zi(t) === t : !1;
}, enqueueSetState: function(t, e, n) {
  t = t._reactInternals;
  var i = He(), r = ti(t), s = yn(i, r);
  s.payload = e, n != null && (s.callback = n), e = Jn(t, s, r), e !== null && (Xt(e, t, r, i), sl(e, t, r));
}, enqueueReplaceState: function(t, e, n) {
  t = t._reactInternals;
  var i = He(), r = ti(t), s = yn(i, r);
  s.tag = 1, s.payload = e, n != null && (s.callback = n), e = Jn(t, s, r), e !== null && (Xt(e, t, r, i), sl(e, t, r));
}, enqueueForceUpdate: function(t, e) {
  t = t._reactInternals;
  var n = He(), i = ti(t), r = yn(n, i);
  r.tag = 2, e != null && (r.callback = e), e = Jn(t, r, i), e !== null && (Xt(e, t, i, n), sl(e, t, i));
} };
function af(t, e, n, i, r, s, o) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, s, o) : e.prototype && e.prototype.isPureReactComponent ? !Ws(n, i) || !Ws(r, s) : !0;
}
function hm(t, e, n) {
  var i = !1, r = si, s = e.contextType;
  return typeof s == "object" && s !== null ? s = It(s) : (r = lt(e) ? ki : Ve.current, i = e.contextTypes, s = (i = i != null) ? kr(t, r) : si), e = new e(n, s), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = ra, t.stateNode = e, e._reactInternals = t, i && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = r, t.__reactInternalMemoizedMaskedChildContext = s), e;
}
function uf(t, e, n, i) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && ra.enqueueReplaceState(e, e.state, null);
}
function sc(t, e, n, i) {
  var r = t.stateNode;
  r.props = n, r.state = t.memoizedState, r.refs = {}, oh(t);
  var s = e.contextType;
  typeof s == "object" && s !== null ? r.context = It(s) : (s = lt(e) ? ki : Ve.current, r.context = kr(t, s)), r.state = t.memoizedState, s = e.getDerivedStateFromProps, typeof s == "function" && (rc(t, e, s, n), r.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (e = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), e !== r.state && ra.enqueueReplaceState(r, r.state, null), Ll(t, n, r, i), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308);
}
function Dr(t, e) {
  try {
    var n = "", i = e;
    do
      n += P0(i), i = i.return;
    while (i);
    var r = n;
  } catch (s) {
    r = `
Error generating stack: ` + s.message + `
` + s.stack;
  }
  return { value: t, source: e, stack: r, digest: null };
}
function ru(t, e, n) {
  return { value: t, source: null, stack: n ?? null, digest: e ?? null };
}
function oc(t, e) {
  try {
    console.error(e.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var r1 = typeof WeakMap == "function" ? WeakMap : Map;
function dm(t, e, n) {
  n = yn(-1, n), n.tag = 3, n.payload = { element: null };
  var i = e.value;
  return n.callback = function() {
    Dl || (Dl = !0, mc = i), oc(t, e);
  }, n;
}
function fm(t, e, n) {
  n = yn(-1, n), n.tag = 3;
  var i = t.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var r = e.value;
    n.payload = function() {
      return i(r);
    }, n.callback = function() {
      oc(t, e);
    };
  }
  var s = t.stateNode;
  return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function() {
    oc(t, e), typeof i != "function" && (ei === null ? ei = /* @__PURE__ */ new Set([this]) : ei.add(this));
    var o = e.stack;
    this.componentDidCatch(e.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function cf(t, e, n) {
  var i = t.pingCache;
  if (i === null) {
    i = t.pingCache = new r1();
    var r = /* @__PURE__ */ new Set();
    i.set(e, r);
  } else r = i.get(e), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(e, r));
  r.has(n) || (r.add(n), t = y1.bind(null, t, e, n), e.then(t, t));
}
function hf(t) {
  do {
    var e;
    if ((e = t.tag === 13) && (e = t.memoizedState, e = e !== null ? e.dehydrated !== null : !0), e) return t;
    t = t.return;
  } while (t !== null);
  return null;
}
function df(t, e, n, i, r) {
  return t.mode & 1 ? (t.flags |= 65536, t.lanes = r, t) : (t === e ? t.flags |= 65536 : (t.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (e = yn(-1, 1), e.tag = 2, Jn(n, e, 1))), n.lanes |= 1), t);
}
var s1 = Ln.ReactCurrentOwner, rt = !1;
function be(t, e, n, i) {
  e.child = t === null ? Yp(e, null, n, i) : Pr(e, t.child, n, i);
}
function ff(t, e, n, i, r) {
  n = n.render;
  var s = e.ref;
  return Sr(e, r), i = hh(t, e, n, i, s, r), n = dh(), t !== null && !rt ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~r, Tn(t, e, r)) : (he && n && Jc(e), e.flags |= 1, be(t, e, i, r), e.child);
}
function gf(t, e, n, i, r) {
  if (t === null) {
    var s = n.type;
    return typeof s == "function" && !wh(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (e.tag = 15, e.type = s, gm(t, e, s, i, r)) : (t = hl(n.type, null, i, e, e.mode, r), t.ref = e.ref, t.return = e, e.child = t);
  }
  if (s = t.child, !(t.lanes & r)) {
    var o = s.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Ws, n(o, i) && t.ref === e.ref) return Tn(t, e, r);
  }
  return e.flags |= 1, t = ni(s, i), t.ref = e.ref, t.return = e, e.child = t;
}
function gm(t, e, n, i, r) {
  if (t !== null) {
    var s = t.memoizedProps;
    if (Ws(s, i) && t.ref === e.ref) if (rt = !1, e.pendingProps = i = s, (t.lanes & r) !== 0) t.flags & 131072 && (rt = !0);
    else return e.lanes = t.lanes, Tn(t, e, r);
  }
  return lc(t, e, n, i, r);
}
function pm(t, e, n) {
  var i = e.pendingProps, r = i.children, s = t !== null ? t.memoizedState : null;
  if (i.mode === "hidden") if (!(e.mode & 1)) e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, oe(gr, ut), ut |= n;
  else {
    if (!(n & 1073741824)) return t = s !== null ? s.baseLanes | n : n, e.lanes = e.childLanes = 1073741824, e.memoizedState = { baseLanes: t, cachePool: null, transitions: null }, e.updateQueue = null, oe(gr, ut), ut |= t, null;
    e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = s !== null ? s.baseLanes : n, oe(gr, ut), ut |= i;
  }
  else s !== null ? (i = s.baseLanes | n, e.memoizedState = null) : i = n, oe(gr, ut), ut |= i;
  return be(t, e, r, n), e.child;
}
function mm(t, e) {
  var n = e.ref;
  (t === null && n !== null || t !== null && t.ref !== n) && (e.flags |= 512, e.flags |= 2097152);
}
function lc(t, e, n, i, r) {
  var s = lt(n) ? ki : Ve.current;
  return s = kr(e, s), Sr(e, r), n = hh(t, e, n, i, s, r), i = dh(), t !== null && !rt ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~r, Tn(t, e, r)) : (he && i && Jc(e), e.flags |= 1, be(t, e, n, r), e.child);
}
function pf(t, e, n, i, r) {
  if (lt(n)) {
    var s = !0;
    Sl(e);
  } else s = !1;
  if (Sr(e, r), e.stateNode === null) al(t, e), hm(e, n, i), sc(e, n, i, r), i = !0;
  else if (t === null) {
    var o = e.stateNode, l = e.memoizedProps;
    o.props = l;
    var a = o.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = It(u) : (u = lt(n) ? ki : Ve.current, u = kr(e, u));
    var c = n.getDerivedStateFromProps, h = typeof c == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (l !== i || a !== u) && uf(e, o, i, u), jn = !1;
    var d = e.memoizedState;
    o.state = d, Ll(e, i, o, r), a = e.memoizedState, l !== i || d !== a || ot.current || jn ? (typeof c == "function" && (rc(e, n, c, i), a = e.memoizedState), (l = jn || af(e, n, l, i, d, a, u)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = a), o.props = i, o.state = a, o.context = u, i = l) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
  } else {
    o = e.stateNode, Bp(t, e), l = e.memoizedProps, u = e.type === e.elementType ? l : Dt(e.type, l), o.props = u, h = e.pendingProps, d = o.context, a = n.contextType, typeof a == "object" && a !== null ? a = It(a) : (a = lt(n) ? ki : Ve.current, a = kr(e, a));
    var f = n.getDerivedStateFromProps;
    (c = typeof f == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (l !== h || d !== a) && uf(e, o, i, a), jn = !1, d = e.memoizedState, o.state = d, Ll(e, i, o, r);
    var m = e.memoizedState;
    l !== h || d !== m || ot.current || jn ? (typeof f == "function" && (rc(e, n, f, i), m = e.memoizedState), (u = jn || af(e, n, u, i, d, m, a) || !1) ? (c || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(i, m, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(i, m, a)), typeof o.componentDidUpdate == "function" && (e.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || l === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || l === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = m), o.props = i, o.state = m, o.context = a, i = u) : (typeof o.componentDidUpdate != "function" || l === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || l === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), i = !1);
  }
  return ac(t, e, n, i, s, r);
}
function ac(t, e, n, i, r, s) {
  mm(t, e);
  var o = (e.flags & 128) !== 0;
  if (!i && !o) return r && Jd(e, n, !1), Tn(t, e, s);
  i = e.stateNode, s1.current = e;
  var l = o && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return e.flags |= 1, t !== null && o ? (e.child = Pr(e, t.child, null, s), e.child = Pr(e, null, l, s)) : be(t, e, l, s), e.memoizedState = i.state, r && Jd(e, n, !0), e.child;
}
function _m(t) {
  var e = t.stateNode;
  e.pendingContext ? Qd(t, e.pendingContext, e.pendingContext !== e.context) : e.context && Qd(t, e.context, !1), lh(t, e.containerInfo);
}
function mf(t, e, n, i, r) {
  return Mr(), th(r), e.flags |= 256, be(t, e, n, i), e.child;
}
var uc = { dehydrated: null, treeContext: null, retryLane: 0 };
function cc(t) {
  return { baseLanes: t, cachePool: null, transitions: null };
}
function ym(t, e, n) {
  var i = e.pendingProps, r = fe.current, s = !1, o = (e.flags & 128) !== 0, l;
  if ((l = o) || (l = t !== null && t.memoizedState === null ? !1 : (r & 2) !== 0), l ? (s = !0, e.flags &= -129) : (t === null || t.memoizedState !== null) && (r |= 1), oe(fe, r & 1), t === null)
    return nc(e), t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null) ? (e.mode & 1 ? t.data === "$!" ? e.lanes = 8 : e.lanes = 1073741824 : e.lanes = 1, null) : (o = i.children, t = i.fallback, s ? (i = e.mode, s = e.child, o = { mode: "hidden", children: o }, !(i & 1) && s !== null ? (s.childLanes = 0, s.pendingProps = o) : s = la(o, i, 0, null), t = Ii(t, i, n, null), s.return = e, t.return = e, s.sibling = t, e.child = s, e.child.memoizedState = cc(n), e.memoizedState = uc, t) : ph(e, o));
  if (r = t.memoizedState, r !== null && (l = r.dehydrated, l !== null)) return o1(t, e, o, i, l, r, n);
  if (s) {
    s = i.fallback, o = e.mode, r = t.child, l = r.sibling;
    var a = { mode: "hidden", children: i.children };
    return !(o & 1) && e.child !== r ? (i = e.child, i.childLanes = 0, i.pendingProps = a, e.deletions = null) : (i = ni(r, a), i.subtreeFlags = r.subtreeFlags & 14680064), l !== null ? s = ni(l, s) : (s = Ii(s, o, n, null), s.flags |= 2), s.return = e, i.return = e, i.sibling = s, e.child = i, i = s, s = e.child, o = t.child.memoizedState, o = o === null ? cc(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, s.memoizedState = o, s.childLanes = t.childLanes & ~n, e.memoizedState = uc, i;
  }
  return s = t.child, t = s.sibling, i = ni(s, { mode: "visible", children: i.children }), !(e.mode & 1) && (i.lanes = n), i.return = e, i.sibling = null, t !== null && (n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t)), e.child = i, e.memoizedState = null, i;
}
function ph(t, e) {
  return e = la({ mode: "visible", children: e }, t.mode, 0, null), e.return = t, t.child = e;
}
function Wo(t, e, n, i) {
  return i !== null && th(i), Pr(e, t.child, null, n), t = ph(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
}
function o1(t, e, n, i, r, s, o) {
  if (n)
    return e.flags & 256 ? (e.flags &= -257, i = ru(Error(L(422))), Wo(t, e, o, i)) : e.memoizedState !== null ? (e.child = t.child, e.flags |= 128, null) : (s = i.fallback, r = e.mode, i = la({ mode: "visible", children: i.children }, r, 0, null), s = Ii(s, r, o, null), s.flags |= 2, i.return = e, s.return = e, i.sibling = s, e.child = i, e.mode & 1 && Pr(e, t.child, null, o), e.child.memoizedState = cc(o), e.memoizedState = uc, s);
  if (!(e.mode & 1)) return Wo(t, e, o, null);
  if (r.data === "$!") {
    if (i = r.nextSibling && r.nextSibling.dataset, i) var l = i.dgst;
    return i = l, s = Error(L(419)), i = ru(s, i, void 0), Wo(t, e, o, i);
  }
  if (l = (o & t.childLanes) !== 0, rt || l) {
    if (i = Ae, i !== null) {
      switch (o & -o) {
        case 4:
          r = 2;
          break;
        case 16:
          r = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          r = 32;
          break;
        case 536870912:
          r = 268435456;
          break;
        default:
          r = 0;
      }
      r = r & (i.suspendedLanes | o) ? 0 : r, r !== 0 && r !== s.retryLane && (s.retryLane = r, Rn(t, r), Xt(i, t, r, -1));
    }
    return xh(), i = ru(Error(L(421))), Wo(t, e, o, i);
  }
  return r.data === "$?" ? (e.flags |= 128, e.child = t.child, e = v1.bind(null, t), r._reactRetry = e, null) : (t = s.treeContext, ct = Qn(r.nextSibling), ht = e, he = !0, Ft = null, t !== null && (xt[wt++] = mn, xt[wt++] = _n, xt[wt++] = Mi, mn = t.id, _n = t.overflow, Mi = e), e = ph(e, i.children), e.flags |= 4096, e);
}
function _f(t, e, n) {
  t.lanes |= e;
  var i = t.alternate;
  i !== null && (i.lanes |= e), ic(t.return, e, n);
}
function su(t, e, n, i, r) {
  var s = t.memoizedState;
  s === null ? t.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: r } : (s.isBackwards = e, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = n, s.tailMode = r);
}
function vm(t, e, n) {
  var i = e.pendingProps, r = i.revealOrder, s = i.tail;
  if (be(t, e, i.children, n), i = fe.current, i & 2) i = i & 1 | 2, e.flags |= 128;
  else {
    if (t !== null && t.flags & 128) e: for (t = e.child; t !== null; ) {
      if (t.tag === 13) t.memoizedState !== null && _f(t, n, e);
      else if (t.tag === 19) _f(t, n, e);
      else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break e;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) break e;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    i &= 1;
  }
  if (oe(fe, i), !(e.mode & 1)) e.memoizedState = null;
  else switch (r) {
    case "forwards":
      for (n = e.child, r = null; n !== null; ) t = n.alternate, t !== null && kl(t) === null && (r = n), n = n.sibling;
      n = r, n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null), su(e, !1, r, n, s);
      break;
    case "backwards":
      for (n = null, r = e.child, e.child = null; r !== null; ) {
        if (t = r.alternate, t !== null && kl(t) === null) {
          e.child = r;
          break;
        }
        t = r.sibling, r.sibling = n, n = r, r = t;
      }
      su(e, !0, n, null, s);
      break;
    case "together":
      su(e, !1, null, null, void 0);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function al(t, e) {
  !(e.mode & 1) && t !== null && (t.alternate = null, e.alternate = null, e.flags |= 2);
}
function Tn(t, e, n) {
  if (t !== null && (e.dependencies = t.dependencies), Ai |= e.lanes, !(n & e.childLanes)) return null;
  if (t !== null && e.child !== t.child) throw Error(L(153));
  if (e.child !== null) {
    for (t = e.child, n = ni(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; ) t = t.sibling, n = n.sibling = ni(t, t.pendingProps), n.return = e;
    n.sibling = null;
  }
  return e.child;
}
function l1(t, e, n) {
  switch (e.tag) {
    case 3:
      _m(e), Mr();
      break;
    case 5:
      Vp(e);
      break;
    case 1:
      lt(e.type) && Sl(e);
      break;
    case 4:
      lh(e, e.stateNode.containerInfo);
      break;
    case 10:
      var i = e.type._context, r = e.memoizedProps.value;
      oe(Tl, i._currentValue), i._currentValue = r;
      break;
    case 13:
      if (i = e.memoizedState, i !== null)
        return i.dehydrated !== null ? (oe(fe, fe.current & 1), e.flags |= 128, null) : n & e.child.childLanes ? ym(t, e, n) : (oe(fe, fe.current & 1), t = Tn(t, e, n), t !== null ? t.sibling : null);
      oe(fe, fe.current & 1);
      break;
    case 19:
      if (i = (n & e.childLanes) !== 0, t.flags & 128) {
        if (i) return vm(t, e, n);
        e.flags |= 128;
      }
      if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), oe(fe, fe.current), i) break;
      return null;
    case 22:
    case 23:
      return e.lanes = 0, pm(t, e, n);
  }
  return Tn(t, e, n);
}
var Em, hc, xm, wm;
Em = function(t, e) {
  for (var n = e.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) t.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
hc = function() {
};
xm = function(t, e, n, i) {
  var r = t.memoizedProps;
  if (r !== i) {
    t = e.stateNode, wi(nn.current);
    var s = null;
    switch (n) {
      case "input":
        r = Du(t, r), i = Du(t, i), s = [];
        break;
      case "select":
        r = pe({}, r, { value: void 0 }), i = pe({}, i, { value: void 0 }), s = [];
        break;
      case "textarea":
        r = Nu(t, r), i = Nu(t, i), s = [];
        break;
      default:
        typeof r.onClick != "function" && typeof i.onClick == "function" && (t.onclick = xl);
    }
    Gu(n, i);
    var o;
    n = null;
    for (u in r) if (!i.hasOwnProperty(u) && r.hasOwnProperty(u) && r[u] != null) if (u === "style") {
      var l = r[u];
      for (o in l) l.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (As.hasOwnProperty(u) ? s || (s = []) : (s = s || []).push(u, null));
    for (u in i) {
      var a = i[u];
      if (l = r != null ? r[u] : void 0, i.hasOwnProperty(u) && a !== l && (a != null || l != null)) if (u === "style") if (l) {
        for (o in l) !l.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in a) a.hasOwnProperty(o) && l[o] !== a[o] && (n || (n = {}), n[o] = a[o]);
      } else n || (s || (s = []), s.push(
        u,
        n
      )), n = a;
      else u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, l = l ? l.__html : void 0, a != null && l !== a && (s = s || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (s = s || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (As.hasOwnProperty(u) ? (a != null && u === "onScroll" && ue("scroll", t), s || l === a || (s = [])) : (s = s || []).push(u, a));
    }
    n && (s = s || []).push("style", n);
    var u = s;
    (e.updateQueue = u) && (e.flags |= 4);
  }
};
wm = function(t, e, n, i) {
  n !== i && (e.flags |= 4);
};
function ss(t, e) {
  if (!he) switch (t.tailMode) {
    case "hidden":
      e = t.tail;
      for (var n = null; e !== null; ) e.alternate !== null && (n = e), e = e.sibling;
      n === null ? t.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = t.tail;
      for (var i = null; n !== null; ) n.alternate !== null && (i = n), n = n.sibling;
      i === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : i.sibling = null;
  }
}
function Xe(t) {
  var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
  if (e) for (var r = t.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags & 14680064, i |= r.flags & 14680064, r.return = t, r = r.sibling;
  else for (r = t.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = t, r = r.sibling;
  return t.subtreeFlags |= i, t.childLanes = n, e;
}
function a1(t, e, n) {
  var i = e.pendingProps;
  switch (eh(e), e.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Xe(e), null;
    case 1:
      return lt(e.type) && wl(), Xe(e), null;
    case 3:
      return i = e.stateNode, Ar(), ce(ot), ce(Ve), uh(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (zo(e) ? e.flags |= 4 : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, Ft !== null && (vc(Ft), Ft = null))), hc(t, e), Xe(e), null;
    case 5:
      ah(e);
      var r = wi(Bs.current);
      if (n = e.type, t !== null && e.stateNode != null) xm(t, e, n, i, r), t.ref !== e.ref && (e.flags |= 512, e.flags |= 2097152);
      else {
        if (!i) {
          if (e.stateNode === null) throw Error(L(166));
          return Xe(e), null;
        }
        if (t = wi(nn.current), zo(e)) {
          i = e.stateNode, n = e.type;
          var s = e.memoizedProps;
          switch (i[Ht] = e, i[Ys] = s, t = (e.mode & 1) !== 0, n) {
            case "dialog":
              ue("cancel", i), ue("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              ue("load", i);
              break;
            case "video":
            case "audio":
              for (r = 0; r < ps.length; r++) ue(ps[r], i);
              break;
            case "source":
              ue("error", i);
              break;
            case "img":
            case "image":
            case "link":
              ue(
                "error",
                i
              ), ue("load", i);
              break;
            case "details":
              ue("toggle", i);
              break;
            case "input":
              Rd(i, s), ue("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!s.multiple }, ue("invalid", i);
              break;
            case "textarea":
              Id(i, s), ue("invalid", i);
          }
          Gu(n, s), r = null;
          for (var o in s) if (s.hasOwnProperty(o)) {
            var l = s[o];
            o === "children" ? typeof l == "string" ? i.textContent !== l && (s.suppressHydrationWarning !== !0 && No(i.textContent, l, t), r = ["children", l]) : typeof l == "number" && i.textContent !== "" + l && (s.suppressHydrationWarning !== !0 && No(
              i.textContent,
              l,
              t
            ), r = ["children", "" + l]) : As.hasOwnProperty(o) && l != null && o === "onScroll" && ue("scroll", i);
          }
          switch (n) {
            case "input":
              Lo(i), Td(i, s, !0);
              break;
            case "textarea":
              Lo(i), Ld(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof s.onClick == "function" && (i.onclick = xl);
          }
          i = r, e.updateQueue = i, i !== null && (e.flags |= 4);
        } else {
          o = r.nodeType === 9 ? r : r.ownerDocument, t === "http://www.w3.org/1999/xhtml" && (t = $g(n)), t === "http://www.w3.org/1999/xhtml" ? n === "script" ? (t = o.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild)) : typeof i.is == "string" ? t = o.createElement(n, { is: i.is }) : (t = o.createElement(n), n === "select" && (o = t, i.multiple ? o.multiple = !0 : i.size && (o.size = i.size))) : t = o.createElementNS(t, n), t[Ht] = e, t[Ys] = i, Em(t, e, !1, !1), e.stateNode = t;
          e: {
            switch (o = Wu(n, i), n) {
              case "dialog":
                ue("cancel", t), ue("close", t), r = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                ue("load", t), r = i;
                break;
              case "video":
              case "audio":
                for (r = 0; r < ps.length; r++) ue(ps[r], t);
                r = i;
                break;
              case "source":
                ue("error", t), r = i;
                break;
              case "img":
              case "image":
              case "link":
                ue(
                  "error",
                  t
                ), ue("load", t), r = i;
                break;
              case "details":
                ue("toggle", t), r = i;
                break;
              case "input":
                Rd(t, i), r = Du(t, i), ue("invalid", t);
                break;
              case "option":
                r = i;
                break;
              case "select":
                t._wrapperState = { wasMultiple: !!i.multiple }, r = pe({}, i, { value: void 0 }), ue("invalid", t);
                break;
              case "textarea":
                Id(t, i), r = Nu(t, i), ue("invalid", t);
                break;
              default:
                r = i;
            }
            Gu(n, r), l = r;
            for (s in l) if (l.hasOwnProperty(s)) {
              var a = l[s];
              s === "style" ? Jg(t, a) : s === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && qg(t, a)) : s === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Ds(t, a) : typeof a == "number" && Ds(t, "" + a) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (As.hasOwnProperty(s) ? a != null && s === "onScroll" && ue("scroll", t) : a != null && Wc(t, s, a, o));
            }
            switch (n) {
              case "input":
                Lo(t), Td(t, i, !1);
                break;
              case "textarea":
                Lo(t), Ld(t);
                break;
              case "option":
                i.value != null && t.setAttribute("value", "" + ri(i.value));
                break;
              case "select":
                t.multiple = !!i.multiple, s = i.value, s != null ? vr(t, !!i.multiple, s, !1) : i.defaultValue != null && vr(
                  t,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof r.onClick == "function" && (t.onclick = xl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
          }
          i && (e.flags |= 4);
        }
        e.ref !== null && (e.flags |= 512, e.flags |= 2097152);
      }
      return Xe(e), null;
    case 6:
      if (t && e.stateNode != null) wm(t, e, t.memoizedProps, i);
      else {
        if (typeof i != "string" && e.stateNode === null) throw Error(L(166));
        if (n = wi(Bs.current), wi(nn.current), zo(e)) {
          if (i = e.stateNode, n = e.memoizedProps, i[Ht] = e, (s = i.nodeValue !== n) && (t = ht, t !== null)) switch (t.tag) {
            case 3:
              No(i.nodeValue, n, (t.mode & 1) !== 0);
              break;
            case 5:
              t.memoizedProps.suppressHydrationWarning !== !0 && No(i.nodeValue, n, (t.mode & 1) !== 0);
          }
          s && (e.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[Ht] = e, e.stateNode = i;
      }
      return Xe(e), null;
    case 13:
      if (ce(fe), i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (he && ct !== null && e.mode & 1 && !(e.flags & 128)) Xp(), Mr(), e.flags |= 98560, s = !1;
        else if (s = zo(e), i !== null && i.dehydrated !== null) {
          if (t === null) {
            if (!s) throw Error(L(318));
            if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(L(317));
            s[Ht] = e;
          } else Mr(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          Xe(e), s = !1;
        } else Ft !== null && (vc(Ft), Ft = null), s = !0;
        if (!s) return e.flags & 65536 ? e : null;
      }
      return e.flags & 128 ? (e.lanes = n, e) : (i = i !== null, i !== (t !== null && t.memoizedState !== null) && i && (e.child.flags |= 8192, e.mode & 1 && (t === null || fe.current & 1 ? Te === 0 && (Te = 3) : xh())), e.updateQueue !== null && (e.flags |= 4), Xe(e), null);
    case 4:
      return Ar(), hc(t, e), t === null && Xs(e.stateNode.containerInfo), Xe(e), null;
    case 10:
      return rh(e.type._context), Xe(e), null;
    case 17:
      return lt(e.type) && wl(), Xe(e), null;
    case 19:
      if (ce(fe), s = e.memoizedState, s === null) return Xe(e), null;
      if (i = (e.flags & 128) !== 0, o = s.rendering, o === null) if (i) ss(s, !1);
      else {
        if (Te !== 0 || t !== null && t.flags & 128) for (t = e.child; t !== null; ) {
          if (o = kl(t), o !== null) {
            for (e.flags |= 128, ss(s, !1), i = o.updateQueue, i !== null && (e.updateQueue = i, e.flags |= 4), e.subtreeFlags = 0, i = n, n = e.child; n !== null; ) s = n, t = i, s.flags &= 14680066, o = s.alternate, o === null ? (s.childLanes = 0, s.lanes = t, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = o.childLanes, s.lanes = o.lanes, s.child = o.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = o.memoizedProps, s.memoizedState = o.memoizedState, s.updateQueue = o.updateQueue, s.type = o.type, t = o.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), n = n.sibling;
            return oe(fe, fe.current & 1 | 2), e.child;
          }
          t = t.sibling;
        }
        s.tail !== null && xe() > Or && (e.flags |= 128, i = !0, ss(s, !1), e.lanes = 4194304);
      }
      else {
        if (!i) if (t = kl(o), t !== null) {
          if (e.flags |= 128, i = !0, n = t.updateQueue, n !== null && (e.updateQueue = n, e.flags |= 4), ss(s, !0), s.tail === null && s.tailMode === "hidden" && !o.alternate && !he) return Xe(e), null;
        } else 2 * xe() - s.renderingStartTime > Or && n !== 1073741824 && (e.flags |= 128, i = !0, ss(s, !1), e.lanes = 4194304);
        s.isBackwards ? (o.sibling = e.child, e.child = o) : (n = s.last, n !== null ? n.sibling = o : e.child = o, s.last = o);
      }
      return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = xe(), e.sibling = null, n = fe.current, oe(fe, i ? n & 1 | 2 : n & 1), e) : (Xe(e), null);
    case 22:
    case 23:
      return Eh(), i = e.memoizedState !== null, t !== null && t.memoizedState !== null !== i && (e.flags |= 8192), i && e.mode & 1 ? ut & 1073741824 && (Xe(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Xe(e), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(L(156, e.tag));
}
function u1(t, e) {
  switch (eh(e), e.tag) {
    case 1:
      return lt(e.type) && wl(), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return Ar(), ce(ot), ce(Ve), uh(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
    case 5:
      return ah(e), null;
    case 13:
      if (ce(fe), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null) throw Error(L(340));
        Mr();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 19:
      return ce(fe), null;
    case 4:
      return Ar(), null;
    case 10:
      return rh(e.type._context), null;
    case 22:
    case 23:
      return Eh(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Xo = !1, Ue = !1, c1 = typeof WeakSet == "function" ? WeakSet : Set, z = null;
function fr(t, e) {
  var n = t.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    ve(t, e, i);
  }
  else n.current = null;
}
function dc(t, e, n) {
  try {
    n();
  } catch (i) {
    ve(t, e, i);
  }
}
var yf = !1;
function h1(t, e) {
  if (Hu = yl, t = Ip(), Qc(t)) {
    if ("selectionStart" in t) var n = { start: t.selectionStart, end: t.selectionEnd };
    else e: {
      n = (n = t.ownerDocument) && n.defaultView || window;
      var i = n.getSelection && n.getSelection();
      if (i && i.rangeCount !== 0) {
        n = i.anchorNode;
        var r = i.anchorOffset, s = i.focusNode;
        i = i.focusOffset;
        try {
          n.nodeType, s.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, l = -1, a = -1, u = 0, c = 0, h = t, d = null;
        t: for (; ; ) {
          for (var f; h !== n || r !== 0 && h.nodeType !== 3 || (l = o + r), h !== s || i !== 0 && h.nodeType !== 3 || (a = o + i), h.nodeType === 3 && (o += h.nodeValue.length), (f = h.firstChild) !== null; )
            d = h, h = f;
          for (; ; ) {
            if (h === t) break t;
            if (d === n && ++u === r && (l = o), d === s && ++c === i && (a = o), (f = h.nextSibling) !== null) break;
            h = d, d = h.parentNode;
          }
          h = f;
        }
        n = l === -1 || a === -1 ? null : { start: l, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for ($u = { focusedElem: t, selectionRange: n }, yl = !1, z = e; z !== null; ) if (e = z, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null) t.return = e, z = t;
  else for (; z !== null; ) {
    e = z;
    try {
      var m = e.alternate;
      if (e.flags & 1024) switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (m !== null) {
            var y = m.memoizedProps, E = m.memoizedState, p = e.stateNode, g = p.getSnapshotBeforeUpdate(e.elementType === e.type ? y : Dt(e.type, y), E);
            p.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var _ = e.stateNode.containerInfo;
          _.nodeType === 1 ? _.textContent = "" : _.nodeType === 9 && _.documentElement && _.removeChild(_.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(L(163));
      }
    } catch (v) {
      ve(e, e.return, v);
    }
    if (t = e.sibling, t !== null) {
      t.return = e.return, z = t;
      break;
    }
    z = e.return;
  }
  return m = yf, yf = !1, m;
}
function Ls(t, e, n) {
  var i = e.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var r = i = i.next;
    do {
      if ((r.tag & t) === t) {
        var s = r.destroy;
        r.destroy = void 0, s !== void 0 && dc(e, n, s);
      }
      r = r.next;
    } while (r !== i);
  }
}
function sa(t, e) {
  if (e = e.updateQueue, e = e !== null ? e.lastEffect : null, e !== null) {
    var n = e = e.next;
    do {
      if ((n.tag & t) === t) {
        var i = n.create;
        n.destroy = i();
      }
      n = n.next;
    } while (n !== e);
  }
}
function fc(t) {
  var e = t.ref;
  if (e !== null) {
    var n = t.stateNode;
    switch (t.tag) {
      case 5:
        t = n;
        break;
      default:
        t = n;
    }
    typeof e == "function" ? e(t) : e.current = t;
  }
}
function Sm(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, Sm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && (delete e[Ht], delete e[Ys], delete e[Ju], delete e[by], delete e[Zy])), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
function Cm(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 4;
}
function vf(t) {
  e: for (; ; ) {
    for (; t.sibling === null; ) {
      if (t.return === null || Cm(t.return)) return null;
      t = t.return;
    }
    for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
      if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
      t.child.return = t, t = t.child;
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function gc(t, e, n) {
  var i = t.tag;
  if (i === 5 || i === 6) t = t.stateNode, e ? n.nodeType === 8 ? n.parentNode.insertBefore(t, e) : n.insertBefore(t, e) : (n.nodeType === 8 ? (e = n.parentNode, e.insertBefore(t, n)) : (e = n, e.appendChild(t)), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = xl));
  else if (i !== 4 && (t = t.child, t !== null)) for (gc(t, e, n), t = t.sibling; t !== null; ) gc(t, e, n), t = t.sibling;
}
function pc(t, e, n) {
  var i = t.tag;
  if (i === 5 || i === 6) t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
  else if (i !== 4 && (t = t.child, t !== null)) for (pc(t, e, n), t = t.sibling; t !== null; ) pc(t, e, n), t = t.sibling;
}
var De = null, Ot = !1;
function An(t, e, n) {
  for (n = n.child; n !== null; ) Rm(t, e, n), n = n.sibling;
}
function Rm(t, e, n) {
  if (tn && typeof tn.onCommitFiberUnmount == "function") try {
    tn.onCommitFiberUnmount(ql, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Ue || fr(n, e);
    case 6:
      var i = De, r = Ot;
      De = null, An(t, e, n), De = i, Ot = r, De !== null && (Ot ? (t = De, n = n.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n)) : De.removeChild(n.stateNode));
      break;
    case 18:
      De !== null && (Ot ? (t = De, n = n.stateNode, t.nodeType === 8 ? Qa(t.parentNode, n) : t.nodeType === 1 && Qa(t, n), zs(t)) : Qa(De, n.stateNode));
      break;
    case 4:
      i = De, r = Ot, De = n.stateNode.containerInfo, Ot = !0, An(t, e, n), De = i, Ot = r;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ue && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        r = i = i.next;
        do {
          var s = r, o = s.destroy;
          s = s.tag, o !== void 0 && (s & 2 || s & 4) && dc(n, e, o), r = r.next;
        } while (r !== i);
      }
      An(t, e, n);
      break;
    case 1:
      if (!Ue && (fr(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (l) {
        ve(n, e, l);
      }
      An(t, e, n);
      break;
    case 21:
      An(t, e, n);
      break;
    case 22:
      n.mode & 1 ? (Ue = (i = Ue) || n.memoizedState !== null, An(t, e, n), Ue = i) : An(t, e, n);
      break;
    default:
      An(t, e, n);
  }
}
function Ef(t) {
  var e = t.updateQueue;
  if (e !== null) {
    t.updateQueue = null;
    var n = t.stateNode;
    n === null && (n = t.stateNode = new c1()), e.forEach(function(i) {
      var r = E1.bind(null, t, i);
      n.has(i) || (n.add(i), i.then(r, r));
    });
  }
}
function Pt(t, e) {
  var n = e.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var r = n[i];
    try {
      var s = t, o = e, l = o;
      e: for (; l !== null; ) {
        switch (l.tag) {
          case 5:
            De = l.stateNode, Ot = !1;
            break e;
          case 3:
            De = l.stateNode.containerInfo, Ot = !0;
            break e;
          case 4:
            De = l.stateNode.containerInfo, Ot = !0;
            break e;
        }
        l = l.return;
      }
      if (De === null) throw Error(L(160));
      Rm(s, o, r), De = null, Ot = !1;
      var a = r.alternate;
      a !== null && (a.return = null), r.return = null;
    } catch (u) {
      ve(r, e, u);
    }
  }
  if (e.subtreeFlags & 12854) for (e = e.child; e !== null; ) Tm(e, t), e = e.sibling;
}
function Tm(t, e) {
  var n = t.alternate, i = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Pt(e, t), bt(t), i & 4) {
        try {
          Ls(3, t, t.return), sa(3, t);
        } catch (y) {
          ve(t, t.return, y);
        }
        try {
          Ls(5, t, t.return);
        } catch (y) {
          ve(t, t.return, y);
        }
      }
      break;
    case 1:
      Pt(e, t), bt(t), i & 512 && n !== null && fr(n, n.return);
      break;
    case 5:
      if (Pt(e, t), bt(t), i & 512 && n !== null && fr(n, n.return), t.flags & 32) {
        var r = t.stateNode;
        try {
          Ds(r, "");
        } catch (y) {
          ve(t, t.return, y);
        }
      }
      if (i & 4 && (r = t.stateNode, r != null)) {
        var s = t.memoizedProps, o = n !== null ? n.memoizedProps : s, l = t.type, a = t.updateQueue;
        if (t.updateQueue = null, a !== null) try {
          l === "input" && s.type === "radio" && s.name != null && Zg(r, s), Wu(l, o);
          var u = Wu(l, s);
          for (o = 0; o < a.length; o += 2) {
            var c = a[o], h = a[o + 1];
            c === "style" ? Jg(r, h) : c === "dangerouslySetInnerHTML" ? qg(r, h) : c === "children" ? Ds(r, h) : Wc(r, c, h, u);
          }
          switch (l) {
            case "input":
              Ou(r, s);
              break;
            case "textarea":
              Hg(r, s);
              break;
            case "select":
              var d = r._wrapperState.wasMultiple;
              r._wrapperState.wasMultiple = !!s.multiple;
              var f = s.value;
              f != null ? vr(r, !!s.multiple, f, !1) : d !== !!s.multiple && (s.defaultValue != null ? vr(
                r,
                !!s.multiple,
                s.defaultValue,
                !0
              ) : vr(r, !!s.multiple, s.multiple ? [] : "", !1));
          }
          r[Ys] = s;
        } catch (y) {
          ve(t, t.return, y);
        }
      }
      break;
    case 6:
      if (Pt(e, t), bt(t), i & 4) {
        if (t.stateNode === null) throw Error(L(162));
        r = t.stateNode, s = t.memoizedProps;
        try {
          r.nodeValue = s;
        } catch (y) {
          ve(t, t.return, y);
        }
      }
      break;
    case 3:
      if (Pt(e, t), bt(t), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        zs(e.containerInfo);
      } catch (y) {
        ve(t, t.return, y);
      }
      break;
    case 4:
      Pt(e, t), bt(t);
      break;
    case 13:
      Pt(e, t), bt(t), r = t.child, r.flags & 8192 && (s = r.memoizedState !== null, r.stateNode.isHidden = s, !s || r.alternate !== null && r.alternate.memoizedState !== null || (yh = xe())), i & 4 && Ef(t);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, t.mode & 1 ? (Ue = (u = Ue) || c, Pt(e, t), Ue = u) : Pt(e, t), bt(t), i & 8192) {
        if (u = t.memoizedState !== null, (t.stateNode.isHidden = u) && !c && t.mode & 1) for (z = t, c = t.child; c !== null; ) {
          for (h = z = c; z !== null; ) {
            switch (d = z, f = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Ls(4, d, d.return);
                break;
              case 1:
                fr(d, d.return);
                var m = d.stateNode;
                if (typeof m.componentWillUnmount == "function") {
                  i = d, n = d.return;
                  try {
                    e = i, m.props = e.memoizedProps, m.state = e.memoizedState, m.componentWillUnmount();
                  } catch (y) {
                    ve(i, n, y);
                  }
                }
                break;
              case 5:
                fr(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  wf(h);
                  continue;
                }
            }
            f !== null ? (f.return = d, z = f) : wf(h);
          }
          c = c.sibling;
        }
        e: for (c = null, h = t; ; ) {
          if (h.tag === 5) {
            if (c === null) {
              c = h;
              try {
                r = h.stateNode, u ? (s = r.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (l = h.stateNode, a = h.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, l.style.display = Qg("display", o));
              } catch (y) {
                ve(t, t.return, y);
              }
            }
          } else if (h.tag === 6) {
            if (c === null) try {
              h.stateNode.nodeValue = u ? "" : h.memoizedProps;
            } catch (y) {
              ve(t, t.return, y);
            }
          } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === t) && h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
          if (h === t) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === t) break e;
            c === h && (c = null), h = h.return;
          }
          c === h && (c = null), h.sibling.return = h.return, h = h.sibling;
        }
      }
      break;
    case 19:
      Pt(e, t), bt(t), i & 4 && Ef(t);
      break;
    case 21:
      break;
    default:
      Pt(
        e,
        t
      ), bt(t);
  }
}
function bt(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      e: {
        for (var n = t.return; n !== null; ) {
          if (Cm(n)) {
            var i = n;
            break e;
          }
          n = n.return;
        }
        throw Error(L(160));
      }
      switch (i.tag) {
        case 5:
          var r = i.stateNode;
          i.flags & 32 && (Ds(r, ""), i.flags &= -33);
          var s = vf(t);
          pc(t, s, r);
          break;
        case 3:
        case 4:
          var o = i.stateNode.containerInfo, l = vf(t);
          gc(t, l, o);
          break;
        default:
          throw Error(L(161));
      }
    } catch (a) {
      ve(t, t.return, a);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function d1(t, e, n) {
  z = t, Im(t);
}
function Im(t, e, n) {
  for (var i = (t.mode & 1) !== 0; z !== null; ) {
    var r = z, s = r.child;
    if (r.tag === 22 && i) {
      var o = r.memoizedState !== null || Xo;
      if (!o) {
        var l = r.alternate, a = l !== null && l.memoizedState !== null || Ue;
        l = Xo;
        var u = Ue;
        if (Xo = o, (Ue = a) && !u) for (z = r; z !== null; ) o = z, a = o.child, o.tag === 22 && o.memoizedState !== null ? Sf(r) : a !== null ? (a.return = o, z = a) : Sf(r);
        for (; s !== null; ) z = s, Im(s), s = s.sibling;
        z = r, Xo = l, Ue = u;
      }
      xf(t);
    } else r.subtreeFlags & 8772 && s !== null ? (s.return = r, z = s) : xf(t);
  }
}
function xf(t) {
  for (; z !== null; ) {
    var e = z;
    if (e.flags & 8772) {
      var n = e.alternate;
      try {
        if (e.flags & 8772) switch (e.tag) {
          case 0:
          case 11:
          case 15:
            Ue || sa(5, e);
            break;
          case 1:
            var i = e.stateNode;
            if (e.flags & 4 && !Ue) if (n === null) i.componentDidMount();
            else {
              var r = e.elementType === e.type ? n.memoizedProps : Dt(e.type, n.memoizedProps);
              i.componentDidUpdate(r, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var s = e.updateQueue;
            s !== null && sf(e, s, i);
            break;
          case 3:
            var o = e.updateQueue;
            if (o !== null) {
              if (n = null, e.child !== null) switch (e.child.tag) {
                case 5:
                  n = e.child.stateNode;
                  break;
                case 1:
                  n = e.child.stateNode;
              }
              sf(e, o, n);
            }
            break;
          case 5:
            var l = e.stateNode;
            if (n === null && e.flags & 4) {
              n = l;
              var a = e.memoizedProps;
              switch (e.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a.autoFocus && n.focus();
                  break;
                case "img":
                  a.src && (n.src = a.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (e.memoizedState === null) {
              var u = e.alternate;
              if (u !== null) {
                var c = u.memoizedState;
                if (c !== null) {
                  var h = c.dehydrated;
                  h !== null && zs(h);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(L(163));
        }
        Ue || e.flags & 512 && fc(e);
      } catch (d) {
        ve(e, e.return, d);
      }
    }
    if (e === t) {
      z = null;
      break;
    }
    if (n = e.sibling, n !== null) {
      n.return = e.return, z = n;
      break;
    }
    z = e.return;
  }
}
function wf(t) {
  for (; z !== null; ) {
    var e = z;
    if (e === t) {
      z = null;
      break;
    }
    var n = e.sibling;
    if (n !== null) {
      n.return = e.return, z = n;
      break;
    }
    z = e.return;
  }
}
function Sf(t) {
  for (; z !== null; ) {
    var e = z;
    try {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          var n = e.return;
          try {
            sa(4, e);
          } catch (a) {
            ve(e, n, a);
          }
          break;
        case 1:
          var i = e.stateNode;
          if (typeof i.componentDidMount == "function") {
            var r = e.return;
            try {
              i.componentDidMount();
            } catch (a) {
              ve(e, r, a);
            }
          }
          var s = e.return;
          try {
            fc(e);
          } catch (a) {
            ve(e, s, a);
          }
          break;
        case 5:
          var o = e.return;
          try {
            fc(e);
          } catch (a) {
            ve(e, o, a);
          }
      }
    } catch (a) {
      ve(e, e.return, a);
    }
    if (e === t) {
      z = null;
      break;
    }
    var l = e.sibling;
    if (l !== null) {
      l.return = e.return, z = l;
      break;
    }
    z = e.return;
  }
}
var f1 = Math.ceil, Al = Ln.ReactCurrentDispatcher, mh = Ln.ReactCurrentOwner, Tt = Ln.ReactCurrentBatchConfig, Q = 0, Ae = null, Se = null, ze = 0, ut = 0, gr = ui(0), Te = 0, Zs = null, Ai = 0, oa = 0, _h = 0, ks = null, Qe = null, yh = 0, Or = 1 / 0, fn = null, Dl = !1, mc = null, ei = null, jo = !1, Kn = null, Ol = 0, Ms = 0, _c = null, ul = -1, cl = 0;
function He() {
  return Q & 6 ? xe() : ul !== -1 ? ul : ul = xe();
}
function ti(t) {
  return t.mode & 1 ? Q & 2 && ze !== 0 ? ze & -ze : $y.transition !== null ? (cl === 0 && (cl = hp()), cl) : (t = se, t !== 0 || (t = window.event, t = t === void 0 ? 16 : yp(t.type)), t) : 1;
}
function Xt(t, e, n, i) {
  if (50 < Ms) throw Ms = 0, _c = null, Error(L(185));
  co(t, n, i), (!(Q & 2) || t !== Ae) && (t === Ae && (!(Q & 2) && (oa |= n), Te === 4 && Bn(t, ze)), at(t, i), n === 1 && Q === 0 && !(e.mode & 1) && (Or = xe() + 500, na && ci()));
}
function at(t, e) {
  var n = t.callbackNode;
  $0(t, e);
  var i = _l(t, t === Ae ? ze : 0);
  if (i === 0) n !== null && Pd(n), t.callbackNode = null, t.callbackPriority = 0;
  else if (e = i & -i, t.callbackPriority !== e) {
    if (n != null && Pd(n), e === 1) t.tag === 0 ? Hy(Cf.bind(null, t)) : zp(Cf.bind(null, t)), Vy(function() {
      !(Q & 6) && ci();
    }), n = null;
    else {
      switch (dp(i)) {
        case 1:
          n = Bc;
          break;
        case 4:
          n = up;
          break;
        case 16:
          n = ml;
          break;
        case 536870912:
          n = cp;
          break;
        default:
          n = ml;
      }
      n = Fm(n, Lm.bind(null, t));
    }
    t.callbackPriority = e, t.callbackNode = n;
  }
}
function Lm(t, e) {
  if (ul = -1, cl = 0, Q & 6) throw Error(L(327));
  var n = t.callbackNode;
  if (Cr() && t.callbackNode !== n) return null;
  var i = _l(t, t === Ae ? ze : 0);
  if (i === 0) return null;
  if (i & 30 || i & t.expiredLanes || e) e = Fl(t, i);
  else {
    e = i;
    var r = Q;
    Q |= 2;
    var s = Mm();
    (Ae !== t || ze !== e) && (fn = null, Or = xe() + 500, Ti(t, e));
    do
      try {
        m1();
        break;
      } catch (l) {
        km(t, l);
      }
    while (!0);
    ih(), Al.current = s, Q = r, Se !== null ? e = 0 : (Ae = null, ze = 0, e = Te);
  }
  if (e !== 0) {
    if (e === 2 && (r = Bu(t), r !== 0 && (i = r, e = yc(t, r))), e === 1) throw n = Zs, Ti(t, 0), Bn(t, i), at(t, xe()), n;
    if (e === 6) Bn(t, i);
    else {
      if (r = t.current.alternate, !(i & 30) && !g1(r) && (e = Fl(t, i), e === 2 && (s = Bu(t), s !== 0 && (i = s, e = yc(t, s))), e === 1)) throw n = Zs, Ti(t, 0), Bn(t, i), at(t, xe()), n;
      switch (t.finishedWork = r, t.finishedLanes = i, e) {
        case 0:
        case 1:
          throw Error(L(345));
        case 2:
          yi(t, Qe, fn);
          break;
        case 3:
          if (Bn(t, i), (i & 130023424) === i && (e = yh + 500 - xe(), 10 < e)) {
            if (_l(t, 0) !== 0) break;
            if (r = t.suspendedLanes, (r & i) !== i) {
              He(), t.pingedLanes |= t.suspendedLanes & r;
              break;
            }
            t.timeoutHandle = Qu(yi.bind(null, t, Qe, fn), e);
            break;
          }
          yi(t, Qe, fn);
          break;
        case 4:
          if (Bn(t, i), (i & 4194240) === i) break;
          for (e = t.eventTimes, r = -1; 0 < i; ) {
            var o = 31 - Wt(i);
            s = 1 << o, o = e[o], o > r && (r = o), i &= ~s;
          }
          if (i = r, i = xe() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * f1(i / 1960)) - i, 10 < i) {
            t.timeoutHandle = Qu(yi.bind(null, t, Qe, fn), i);
            break;
          }
          yi(t, Qe, fn);
          break;
        case 5:
          yi(t, Qe, fn);
          break;
        default:
          throw Error(L(329));
      }
    }
  }
  return at(t, xe()), t.callbackNode === n ? Lm.bind(null, t) : null;
}
function yc(t, e) {
  var n = ks;
  return t.current.memoizedState.isDehydrated && (Ti(t, e).flags |= 256), t = Fl(t, e), t !== 2 && (e = Qe, Qe = n, e !== null && vc(e)), t;
}
function vc(t) {
  Qe === null ? Qe = t : Qe.push.apply(Qe, t);
}
function g1(t) {
  for (var e = t; ; ) {
    if (e.flags & 16384) {
      var n = e.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var r = n[i], s = r.getSnapshot;
        r = r.value;
        try {
          if (!Yt(s(), r)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = e.child, e.subtreeFlags & 16384 && n !== null) n.return = e, e = n;
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
  }
  return !0;
}
function Bn(t, e) {
  for (e &= ~_h, e &= ~oa, t.suspendedLanes |= e, t.pingedLanes &= ~e, t = t.expirationTimes; 0 < e; ) {
    var n = 31 - Wt(e), i = 1 << n;
    t[n] = -1, e &= ~i;
  }
}
function Cf(t) {
  if (Q & 6) throw Error(L(327));
  Cr();
  var e = _l(t, 0);
  if (!(e & 1)) return at(t, xe()), null;
  var n = Fl(t, e);
  if (t.tag !== 0 && n === 2) {
    var i = Bu(t);
    i !== 0 && (e = i, n = yc(t, i));
  }
  if (n === 1) throw n = Zs, Ti(t, 0), Bn(t, e), at(t, xe()), n;
  if (n === 6) throw Error(L(345));
  return t.finishedWork = t.current.alternate, t.finishedLanes = e, yi(t, Qe, fn), at(t, xe()), null;
}
function vh(t, e) {
  var n = Q;
  Q |= 1;
  try {
    return t(e);
  } finally {
    Q = n, Q === 0 && (Or = xe() + 500, na && ci());
  }
}
function Di(t) {
  Kn !== null && Kn.tag === 0 && !(Q & 6) && Cr();
  var e = Q;
  Q |= 1;
  var n = Tt.transition, i = se;
  try {
    if (Tt.transition = null, se = 1, t) return t();
  } finally {
    se = i, Tt.transition = n, Q = e, !(Q & 6) && ci();
  }
}
function Eh() {
  ut = gr.current, ce(gr);
}
function Ti(t, e) {
  t.finishedWork = null, t.finishedLanes = 0;
  var n = t.timeoutHandle;
  if (n !== -1 && (t.timeoutHandle = -1, By(n)), Se !== null) for (n = Se.return; n !== null; ) {
    var i = n;
    switch (eh(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && wl();
        break;
      case 3:
        Ar(), ce(ot), ce(Ve), uh();
        break;
      case 5:
        ah(i);
        break;
      case 4:
        Ar();
        break;
      case 13:
        ce(fe);
        break;
      case 19:
        ce(fe);
        break;
      case 10:
        rh(i.type._context);
        break;
      case 22:
      case 23:
        Eh();
    }
    n = n.return;
  }
  if (Ae = t, Se = t = ni(t.current, null), ze = ut = e, Te = 0, Zs = null, _h = oa = Ai = 0, Qe = ks = null, xi !== null) {
    for (e = 0; e < xi.length; e++) if (n = xi[e], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var r = i.next, s = n.pending;
      if (s !== null) {
        var o = s.next;
        s.next = r, i.next = o;
      }
      n.pending = i;
    }
    xi = null;
  }
  return t;
}
function km(t, e) {
  do {
    var n = Se;
    try {
      if (ih(), ol.current = Pl, Ml) {
        for (var i = ge.memoizedState; i !== null; ) {
          var r = i.queue;
          r !== null && (r.pending = null), i = i.next;
        }
        Ml = !1;
      }
      if (Pi = 0, Pe = Re = ge = null, Is = !1, Vs = 0, mh.current = null, n === null || n.return === null) {
        Te = 1, Zs = e, Se = null;
        break;
      }
      e: {
        var s = t, o = n.return, l = n, a = e;
        if (e = ze, l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var u = a, c = l, h = c.tag;
          if (!(c.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var d = c.alternate;
            d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var f = hf(o);
          if (f !== null) {
            f.flags &= -257, df(f, o, l, s, e), f.mode & 1 && cf(s, u, e), e = f, a = u;
            var m = e.updateQueue;
            if (m === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(a), e.updateQueue = y;
            } else m.add(a);
            break e;
          } else {
            if (!(e & 1)) {
              cf(s, u, e), xh();
              break e;
            }
            a = Error(L(426));
          }
        } else if (he && l.mode & 1) {
          var E = hf(o);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256), df(E, o, l, s, e), th(Dr(a, l));
            break e;
          }
        }
        s = a = Dr(a, l), Te !== 4 && (Te = 2), ks === null ? ks = [s] : ks.push(s), s = o;
        do {
          switch (s.tag) {
            case 3:
              s.flags |= 65536, e &= -e, s.lanes |= e;
              var p = dm(s, a, e);
              rf(s, p);
              break e;
            case 1:
              l = a;
              var g = s.type, _ = s.stateNode;
              if (!(s.flags & 128) && (typeof g.getDerivedStateFromError == "function" || _ !== null && typeof _.componentDidCatch == "function" && (ei === null || !ei.has(_)))) {
                s.flags |= 65536, e &= -e, s.lanes |= e;
                var v = fm(s, l, e);
                rf(s, v);
                break e;
              }
          }
          s = s.return;
        } while (s !== null);
      }
      Am(n);
    } catch (x) {
      e = x, Se === n && n !== null && (Se = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Mm() {
  var t = Al.current;
  return Al.current = Pl, t === null ? Pl : t;
}
function xh() {
  (Te === 0 || Te === 3 || Te === 2) && (Te = 4), Ae === null || !(Ai & 268435455) && !(oa & 268435455) || Bn(Ae, ze);
}
function Fl(t, e) {
  var n = Q;
  Q |= 2;
  var i = Mm();
  (Ae !== t || ze !== e) && (fn = null, Ti(t, e));
  do
    try {
      p1();
      break;
    } catch (r) {
      km(t, r);
    }
  while (!0);
  if (ih(), Q = n, Al.current = i, Se !== null) throw Error(L(261));
  return Ae = null, ze = 0, Te;
}
function p1() {
  for (; Se !== null; ) Pm(Se);
}
function m1() {
  for (; Se !== null && !j0(); ) Pm(Se);
}
function Pm(t) {
  var e = Om(t.alternate, t, ut);
  t.memoizedProps = t.pendingProps, e === null ? Am(t) : Se = e, mh.current = null;
}
function Am(t) {
  var e = t;
  do {
    var n = e.alternate;
    if (t = e.return, e.flags & 32768) {
      if (n = u1(n, e), n !== null) {
        n.flags &= 32767, Se = n;
        return;
      }
      if (t !== null) t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null;
      else {
        Te = 6, Se = null;
        return;
      }
    } else if (n = a1(n, e, ut), n !== null) {
      Se = n;
      return;
    }
    if (e = e.sibling, e !== null) {
      Se = e;
      return;
    }
    Se = e = t;
  } while (e !== null);
  Te === 0 && (Te = 5);
}
function yi(t, e, n) {
  var i = se, r = Tt.transition;
  try {
    Tt.transition = null, se = 1, _1(t, e, n, i);
  } finally {
    Tt.transition = r, se = i;
  }
  return null;
}
function _1(t, e, n, i) {
  do
    Cr();
  while (Kn !== null);
  if (Q & 6) throw Error(L(327));
  n = t.finishedWork;
  var r = t.finishedLanes;
  if (n === null) return null;
  if (t.finishedWork = null, t.finishedLanes = 0, n === t.current) throw Error(L(177));
  t.callbackNode = null, t.callbackPriority = 0;
  var s = n.lanes | n.childLanes;
  if (q0(t, s), t === Ae && (Se = Ae = null, ze = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || jo || (jo = !0, Fm(ml, function() {
    return Cr(), null;
  })), s = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || s) {
    s = Tt.transition, Tt.transition = null;
    var o = se;
    se = 1;
    var l = Q;
    Q |= 4, mh.current = null, h1(t, n), Tm(n, t), zy($u), yl = !!Hu, $u = Hu = null, t.current = n, d1(n), Y0(), Q = l, se = o, Tt.transition = s;
  } else t.current = n;
  if (jo && (jo = !1, Kn = t, Ol = r), s = t.pendingLanes, s === 0 && (ei = null), V0(n.stateNode), at(t, xe()), e !== null) for (i = t.onRecoverableError, n = 0; n < e.length; n++) r = e[n], i(r.value, { componentStack: r.stack, digest: r.digest });
  if (Dl) throw Dl = !1, t = mc, mc = null, t;
  return Ol & 1 && t.tag !== 0 && Cr(), s = t.pendingLanes, s & 1 ? t === _c ? Ms++ : (Ms = 0, _c = t) : Ms = 0, ci(), null;
}
function Cr() {
  if (Kn !== null) {
    var t = dp(Ol), e = Tt.transition, n = se;
    try {
      if (Tt.transition = null, se = 16 > t ? 16 : t, Kn === null) var i = !1;
      else {
        if (t = Kn, Kn = null, Ol = 0, Q & 6) throw Error(L(331));
        var r = Q;
        for (Q |= 4, z = t.current; z !== null; ) {
          var s = z, o = s.child;
          if (z.flags & 16) {
            var l = s.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (z = u; z !== null; ) {
                  var c = z;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ls(8, c, s);
                  }
                  var h = c.child;
                  if (h !== null) h.return = c, z = h;
                  else for (; z !== null; ) {
                    c = z;
                    var d = c.sibling, f = c.return;
                    if (Sm(c), c === u) {
                      z = null;
                      break;
                    }
                    if (d !== null) {
                      d.return = f, z = d;
                      break;
                    }
                    z = f;
                  }
                }
              }
              var m = s.alternate;
              if (m !== null) {
                var y = m.child;
                if (y !== null) {
                  m.child = null;
                  do {
                    var E = y.sibling;
                    y.sibling = null, y = E;
                  } while (y !== null);
                }
              }
              z = s;
            }
          }
          if (s.subtreeFlags & 2064 && o !== null) o.return = s, z = o;
          else e: for (; z !== null; ) {
            if (s = z, s.flags & 2048) switch (s.tag) {
              case 0:
              case 11:
              case 15:
                Ls(9, s, s.return);
            }
            var p = s.sibling;
            if (p !== null) {
              p.return = s.return, z = p;
              break e;
            }
            z = s.return;
          }
        }
        var g = t.current;
        for (z = g; z !== null; ) {
          o = z;
          var _ = o.child;
          if (o.subtreeFlags & 2064 && _ !== null) _.return = o, z = _;
          else e: for (o = g; z !== null; ) {
            if (l = z, l.flags & 2048) try {
              switch (l.tag) {
                case 0:
                case 11:
                case 15:
                  sa(9, l);
              }
            } catch (x) {
              ve(l, l.return, x);
            }
            if (l === o) {
              z = null;
              break e;
            }
            var v = l.sibling;
            if (v !== null) {
              v.return = l.return, z = v;
              break e;
            }
            z = l.return;
          }
        }
        if (Q = r, ci(), tn && typeof tn.onPostCommitFiberRoot == "function") try {
          tn.onPostCommitFiberRoot(ql, t);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      se = n, Tt.transition = e;
    }
  }
  return !1;
}
function Rf(t, e, n) {
  e = Dr(n, e), e = dm(t, e, 1), t = Jn(t, e, 1), e = He(), t !== null && (co(t, 1, e), at(t, e));
}
function ve(t, e, n) {
  if (t.tag === 3) Rf(t, t, n);
  else for (; e !== null; ) {
    if (e.tag === 3) {
      Rf(e, t, n);
      break;
    } else if (e.tag === 1) {
      var i = e.stateNode;
      if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (ei === null || !ei.has(i))) {
        t = Dr(n, t), t = fm(e, t, 1), e = Jn(e, t, 1), t = He(), e !== null && (co(e, 1, t), at(e, t));
        break;
      }
    }
    e = e.return;
  }
}
function y1(t, e, n) {
  var i = t.pingCache;
  i !== null && i.delete(e), e = He(), t.pingedLanes |= t.suspendedLanes & n, Ae === t && (ze & n) === n && (Te === 4 || Te === 3 && (ze & 130023424) === ze && 500 > xe() - yh ? Ti(t, 0) : _h |= n), at(t, e);
}
function Dm(t, e) {
  e === 0 && (t.mode & 1 ? (e = Po, Po <<= 1, !(Po & 130023424) && (Po = 4194304)) : e = 1);
  var n = He();
  t = Rn(t, e), t !== null && (co(t, e, n), at(t, n));
}
function v1(t) {
  var e = t.memoizedState, n = 0;
  e !== null && (n = e.retryLane), Dm(t, n);
}
function E1(t, e) {
  var n = 0;
  switch (t.tag) {
    case 13:
      var i = t.stateNode, r = t.memoizedState;
      r !== null && (n = r.retryLane);
      break;
    case 19:
      i = t.stateNode;
      break;
    default:
      throw Error(L(314));
  }
  i !== null && i.delete(e), Dm(t, n);
}
var Om;
Om = function(t, e, n) {
  if (t !== null) if (t.memoizedProps !== e.pendingProps || ot.current) rt = !0;
  else {
    if (!(t.lanes & n) && !(e.flags & 128)) return rt = !1, l1(t, e, n);
    rt = !!(t.flags & 131072);
  }
  else rt = !1, he && e.flags & 1048576 && Gp(e, Rl, e.index);
  switch (e.lanes = 0, e.tag) {
    case 2:
      var i = e.type;
      al(t, e), t = e.pendingProps;
      var r = kr(e, Ve.current);
      Sr(e, n), r = hh(null, e, i, t, r, n);
      var s = dh();
      return e.flags |= 1, typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0 ? (e.tag = 1, e.memoizedState = null, e.updateQueue = null, lt(i) ? (s = !0, Sl(e)) : s = !1, e.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, oh(e), r.updater = ra, e.stateNode = r, r._reactInternals = e, sc(e, i, t, n), e = ac(null, e, i, !0, s, n)) : (e.tag = 0, he && s && Jc(e), be(null, e, r, n), e = e.child), e;
    case 16:
      i = e.elementType;
      e: {
        switch (al(t, e), t = e.pendingProps, r = i._init, i = r(i._payload), e.type = i, r = e.tag = w1(i), t = Dt(i, t), r) {
          case 0:
            e = lc(null, e, i, t, n);
            break e;
          case 1:
            e = pf(null, e, i, t, n);
            break e;
          case 11:
            e = ff(null, e, i, t, n);
            break e;
          case 14:
            e = gf(null, e, i, Dt(i.type, t), n);
            break e;
        }
        throw Error(L(
          306,
          i,
          ""
        ));
      }
      return e;
    case 0:
      return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : Dt(i, r), lc(t, e, i, r, n);
    case 1:
      return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : Dt(i, r), pf(t, e, i, r, n);
    case 3:
      e: {
        if (_m(e), t === null) throw Error(L(387));
        i = e.pendingProps, s = e.memoizedState, r = s.element, Bp(t, e), Ll(e, i, null, n);
        var o = e.memoizedState;
        if (i = o.element, s.isDehydrated) if (s = { element: i, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
          r = Dr(Error(L(423)), e), e = mf(t, e, i, n, r);
          break e;
        } else if (i !== r) {
          r = Dr(Error(L(424)), e), e = mf(t, e, i, n, r);
          break e;
        } else for (ct = Qn(e.stateNode.containerInfo.firstChild), ht = e, he = !0, Ft = null, n = Yp(e, null, i, n), e.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Mr(), i === r) {
            e = Tn(t, e, n);
            break e;
          }
          be(t, e, i, n);
        }
        e = e.child;
      }
      return e;
    case 5:
      return Vp(e), t === null && nc(e), i = e.type, r = e.pendingProps, s = t !== null ? t.memoizedProps : null, o = r.children, qu(i, r) ? o = null : s !== null && qu(i, s) && (e.flags |= 32), mm(t, e), be(t, e, o, n), e.child;
    case 6:
      return t === null && nc(e), null;
    case 13:
      return ym(t, e, n);
    case 4:
      return lh(e, e.stateNode.containerInfo), i = e.pendingProps, t === null ? e.child = Pr(e, null, i, n) : be(t, e, i, n), e.child;
    case 11:
      return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : Dt(i, r), ff(t, e, i, r, n);
    case 7:
      return be(t, e, e.pendingProps, n), e.child;
    case 8:
      return be(t, e, e.pendingProps.children, n), e.child;
    case 12:
      return be(t, e, e.pendingProps.children, n), e.child;
    case 10:
      e: {
        if (i = e.type._context, r = e.pendingProps, s = e.memoizedProps, o = r.value, oe(Tl, i._currentValue), i._currentValue = o, s !== null) if (Yt(s.value, o)) {
          if (s.children === r.children && !ot.current) {
            e = Tn(t, e, n);
            break e;
          }
        } else for (s = e.child, s !== null && (s.return = e); s !== null; ) {
          var l = s.dependencies;
          if (l !== null) {
            o = s.child;
            for (var a = l.firstContext; a !== null; ) {
              if (a.context === i) {
                if (s.tag === 1) {
                  a = yn(-1, n & -n), a.tag = 2;
                  var u = s.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var c = u.pending;
                    c === null ? a.next = a : (a.next = c.next, c.next = a), u.pending = a;
                  }
                }
                s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), ic(
                  s.return,
                  n,
                  e
                ), l.lanes |= n;
                break;
              }
              a = a.next;
            }
          } else if (s.tag === 10) o = s.type === e.type ? null : s.child;
          else if (s.tag === 18) {
            if (o = s.return, o === null) throw Error(L(341));
            o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), ic(o, n, e), o = s.sibling;
          } else o = s.child;
          if (o !== null) o.return = s;
          else for (o = s; o !== null; ) {
            if (o === e) {
              o = null;
              break;
            }
            if (s = o.sibling, s !== null) {
              s.return = o.return, o = s;
              break;
            }
            o = o.return;
          }
          s = o;
        }
        be(t, e, r.children, n), e = e.child;
      }
      return e;
    case 9:
      return r = e.type, i = e.pendingProps.children, Sr(e, n), r = It(r), i = i(r), e.flags |= 1, be(t, e, i, n), e.child;
    case 14:
      return i = e.type, r = Dt(i, e.pendingProps), r = Dt(i.type, r), gf(t, e, i, r, n);
    case 15:
      return gm(t, e, e.type, e.pendingProps, n);
    case 17:
      return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : Dt(i, r), al(t, e), e.tag = 1, lt(i) ? (t = !0, Sl(e)) : t = !1, Sr(e, n), hm(e, i, r), sc(e, i, r, n), ac(null, e, i, !0, t, n);
    case 19:
      return vm(t, e, n);
    case 22:
      return pm(t, e, n);
  }
  throw Error(L(156, e.tag));
};
function Fm(t, e) {
  return ap(t, e);
}
function x1(t, e, n, i) {
  this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ct(t, e, n, i) {
  return new x1(t, e, n, i);
}
function wh(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function w1(t) {
  if (typeof t == "function") return wh(t) ? 1 : 0;
  if (t != null) {
    if (t = t.$$typeof, t === jc) return 11;
    if (t === Yc) return 14;
  }
  return 2;
}
function ni(t, e) {
  var n = t.alternate;
  return n === null ? (n = Ct(t.tag, e, t.key, t.mode), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 14680064, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n;
}
function hl(t, e, n, i, r, s) {
  var o = 2;
  if (i = t, typeof t == "function") wh(t) && (o = 1);
  else if (typeof t == "string") o = 5;
  else e: switch (t) {
    case rr:
      return Ii(n.children, r, s, e);
    case Xc:
      o = 8, r |= 8;
      break;
    case ku:
      return t = Ct(12, n, e, r | 2), t.elementType = ku, t.lanes = s, t;
    case Mu:
      return t = Ct(13, n, e, r), t.elementType = Mu, t.lanes = s, t;
    case Pu:
      return t = Ct(19, n, e, r), t.elementType = Pu, t.lanes = s, t;
    case Vg:
      return la(n, r, s, e);
    default:
      if (typeof t == "object" && t !== null) switch (t.$$typeof) {
        case Ug:
          o = 10;
          break e;
        case Bg:
          o = 9;
          break e;
        case jc:
          o = 11;
          break e;
        case Yc:
          o = 14;
          break e;
        case Xn:
          o = 16, i = null;
          break e;
      }
      throw Error(L(130, t == null ? t : typeof t, ""));
  }
  return e = Ct(o, n, e, r), e.elementType = t, e.type = i, e.lanes = s, e;
}
function Ii(t, e, n, i) {
  return t = Ct(7, t, i, e), t.lanes = n, t;
}
function la(t, e, n, i) {
  return t = Ct(22, t, i, e), t.elementType = Vg, t.lanes = n, t.stateNode = { isHidden: !1 }, t;
}
function ou(t, e, n) {
  return t = Ct(6, t, null, e), t.lanes = n, t;
}
function lu(t, e, n) {
  return e = Ct(4, t.children !== null ? t.children : [], t.key, e), e.lanes = n, e.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, e;
}
function S1(t, e, n, i, r) {
  this.tag = e, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ja(0), this.expirationTimes = ja(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ja(0), this.identifierPrefix = i, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null;
}
function Sh(t, e, n, i, r, s, o, l, a) {
  return t = new S1(t, e, n, l, a), e === 1 ? (e = 1, s === !0 && (e |= 8)) : e = 0, s = Ct(3, null, null, e), t.current = s, s.stateNode = t, s.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, oh(s), t;
}
function C1(t, e, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: ir, key: i == null ? null : "" + i, children: t, containerInfo: e, implementation: n };
}
function Nm(t) {
  if (!t) return si;
  t = t._reactInternals;
  e: {
    if (zi(t) !== t || t.tag !== 1) throw Error(L(170));
    var e = t;
    do {
      switch (e.tag) {
        case 3:
          e = e.stateNode.context;
          break e;
        case 1:
          if (lt(e.type)) {
            e = e.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      e = e.return;
    } while (e !== null);
    throw Error(L(171));
  }
  if (t.tag === 1) {
    var n = t.type;
    if (lt(n)) return Np(t, n, e);
  }
  return e;
}
function zm(t, e, n, i, r, s, o, l, a) {
  return t = Sh(n, i, !0, t, r, s, o, l, a), t.context = Nm(null), n = t.current, i = He(), r = ti(n), s = yn(i, r), s.callback = e ?? null, Jn(n, s, r), t.current.lanes = r, co(t, r, i), at(t, i), t;
}
function aa(t, e, n, i) {
  var r = e.current, s = He(), o = ti(r);
  return n = Nm(n), e.context === null ? e.context = n : e.pendingContext = n, e = yn(s, o), e.payload = { element: t }, i = i === void 0 ? null : i, i !== null && (e.callback = i), t = Jn(r, e, o), t !== null && (Xt(t, r, o, s), sl(t, r, o)), o;
}
function Nl(t) {
  if (t = t.current, !t.child) return null;
  switch (t.child.tag) {
    case 5:
      return t.child.stateNode;
    default:
      return t.child.stateNode;
  }
}
function Tf(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function Ch(t, e) {
  Tf(t, e), (t = t.alternate) && Tf(t, e);
}
function R1() {
  return null;
}
var Gm = typeof reportError == "function" ? reportError : function(t) {
  console.error(t);
};
function Rh(t) {
  this._internalRoot = t;
}
ua.prototype.render = Rh.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null) throw Error(L(409));
  aa(t, e, null, null);
};
ua.prototype.unmount = Rh.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    Di(function() {
      aa(null, t, null, null);
    }), e[Cn] = null;
  }
};
function ua(t) {
  this._internalRoot = t;
}
ua.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = pp();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < Un.length && e !== 0 && e < Un[n].priority; n++) ;
    Un.splice(n, 0, t), n === 0 && _p(t);
  }
};
function Th(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function ca(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 && (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "));
}
function If() {
}
function T1(t, e, n, i, r) {
  if (r) {
    if (typeof i == "function") {
      var s = i;
      i = function() {
        var u = Nl(o);
        s.call(u);
      };
    }
    var o = zm(e, i, t, 0, null, !1, !1, "", If);
    return t._reactRootContainer = o, t[Cn] = o.current, Xs(t.nodeType === 8 ? t.parentNode : t), Di(), o;
  }
  for (; r = t.lastChild; ) t.removeChild(r);
  if (typeof i == "function") {
    var l = i;
    i = function() {
      var u = Nl(a);
      l.call(u);
    };
  }
  var a = Sh(t, 0, !1, null, null, !1, !1, "", If);
  return t._reactRootContainer = a, t[Cn] = a.current, Xs(t.nodeType === 8 ? t.parentNode : t), Di(function() {
    aa(e, a, n, i);
  }), a;
}
function ha(t, e, n, i, r) {
  var s = n._reactRootContainer;
  if (s) {
    var o = s;
    if (typeof r == "function") {
      var l = r;
      r = function() {
        var a = Nl(o);
        l.call(a);
      };
    }
    aa(e, o, t, r);
  } else o = T1(n, e, t, r, i);
  return Nl(o);
}
fp = function(t) {
  switch (t.tag) {
    case 3:
      var e = t.stateNode;
      if (e.current.memoizedState.isDehydrated) {
        var n = gs(e.pendingLanes);
        n !== 0 && (Vc(e, n | 1), at(e, xe()), !(Q & 6) && (Or = xe() + 500, ci()));
      }
      break;
    case 13:
      Di(function() {
        var i = Rn(t, 1);
        if (i !== null) {
          var r = He();
          Xt(i, t, 1, r);
        }
      }), Ch(t, 1);
  }
};
Kc = function(t) {
  if (t.tag === 13) {
    var e = Rn(t, 134217728);
    if (e !== null) {
      var n = He();
      Xt(e, t, 134217728, n);
    }
    Ch(t, 134217728);
  }
};
gp = function(t) {
  if (t.tag === 13) {
    var e = ti(t), n = Rn(t, e);
    if (n !== null) {
      var i = He();
      Xt(n, t, e, i);
    }
    Ch(t, e);
  }
};
pp = function() {
  return se;
};
mp = function(t, e) {
  var n = se;
  try {
    return se = t, e();
  } finally {
    se = n;
  }
};
ju = function(t, e, n) {
  switch (e) {
    case "input":
      if (Ou(t, n), e = n.name, n.type === "radio" && e != null) {
        for (n = t; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + e) + '][type="radio"]'), e = 0; e < n.length; e++) {
          var i = n[e];
          if (i !== t && i.form === t.form) {
            var r = ta(i);
            if (!r) throw Error(L(90));
            bg(i), Ou(i, r);
          }
        }
      }
      break;
    case "textarea":
      Hg(t, n);
      break;
    case "select":
      e = n.value, e != null && vr(t, !!n.multiple, e, !1);
  }
};
np = vh;
ip = Di;
var I1 = { usingClientEntryPoint: !1, Events: [fo, ar, ta, ep, tp, vh] }, os = { findFiberByHostInstance: Ei, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, L1 = { bundleType: os.bundleType, version: os.version, rendererPackageName: os.rendererPackageName, rendererConfig: os.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ln.ReactCurrentDispatcher, findHostInstanceByFiber: function(t) {
  return t = op(t), t === null ? null : t.stateNode;
}, findFiberByHostInstance: os.findFiberByHostInstance || R1, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Yo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Yo.isDisabled && Yo.supportsFiber) try {
    ql = Yo.inject(L1), tn = Yo;
  } catch {
  }
}
ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = I1;
ft.createPortal = function(t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Th(e)) throw Error(L(200));
  return C1(t, e, null, n);
};
ft.createRoot = function(t, e) {
  if (!Th(t)) throw Error(L(299));
  var n = !1, i = "", r = Gm;
  return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onRecoverableError !== void 0 && (r = e.onRecoverableError)), e = Sh(t, 1, !1, null, null, n, !1, i, r), t[Cn] = e.current, Xs(t.nodeType === 8 ? t.parentNode : t), new Rh(e);
};
ft.findDOMNode = function(t) {
  if (t == null) return null;
  if (t.nodeType === 1) return t;
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function" ? Error(L(188)) : (t = Object.keys(t).join(","), Error(L(268, t)));
  return t = op(e), t = t === null ? null : t.stateNode, t;
};
ft.flushSync = function(t) {
  return Di(t);
};
ft.hydrate = function(t, e, n) {
  if (!ca(e)) throw Error(L(200));
  return ha(null, t, e, !0, n);
};
ft.hydrateRoot = function(t, e, n) {
  if (!Th(t)) throw Error(L(405));
  var i = n != null && n.hydratedSources || null, r = !1, s = "", o = Gm;
  if (n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), e = zm(e, null, t, 1, n ?? null, r, !1, s, o), t[Cn] = e.current, Xs(t), i) for (t = 0; t < i.length; t++) n = i[t], r = n._getVersion, r = r(n._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, r] : e.mutableSourceEagerHydrationData.push(
    n,
    r
  );
  return new ua(e);
};
ft.render = function(t, e, n) {
  if (!ca(e)) throw Error(L(200));
  return ha(null, t, e, !1, n);
};
ft.unmountComponentAtNode = function(t) {
  if (!ca(t)) throw Error(L(40));
  return t._reactRootContainer ? (Di(function() {
    ha(null, null, t, !1, function() {
      t._reactRootContainer = null, t[Cn] = null;
    });
  }), !0) : !1;
};
ft.unstable_batchedUpdates = vh;
ft.unstable_renderSubtreeIntoContainer = function(t, e, n, i) {
  if (!ca(n)) throw Error(L(200));
  if (t == null || t._reactInternals === void 0) throw Error(L(38));
  return ha(t, e, n, !1, i);
};
ft.version = "18.3.1-next-f1338f8080-20240426";
function Wm() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Wm);
    } catch (t) {
      console.error(t);
    }
}
Wm(), Wg.exports = ft;
var k1 = Wg.exports, Xm, Lf = k1;
Xm = Lf.createRoot, Lf.hydrateRoot;
let jm = Me.createContext(
  /** @type {any} */
  null
);
function M1() {
  let t = Me.useContext(jm);
  if (!t) throw new Error("RenderContext not found");
  return t;
}
function P1() {
  return M1().model;
}
function ls(t) {
  let e = P1(), [n, i] = Me.useState(e.get(t));
  return Me.useEffect(() => {
    let r = () => i(e.get(t));
    return e.on(`change:${t}`, r), () => e.off(`change:${t}`, r);
  }, [e, t]), [
    n,
    (r) => {
      e.set(t, r), e.save_changes();
    }
  ];
}
function A1(t) {
  return ({ el: e, model: n, experimental: i }) => {
    let r = Xm(e);
    return r.render(
      Me.createElement(
        Me.StrictMode,
        null,
        Me.createElement(
          jm.Provider,
          { value: { model: n, experimental: i } },
          Me.createElement(t)
        )
      )
    ), () => r.unmount();
  };
}
class kn {
  /**
   * @param {string} type Type.
   */
  constructor(e) {
    this.propagationStopped, this.defaultPrevented, this.type = e, this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */
  preventDefault() {
    this.defaultPrevented = !0;
  }
  /**
   * Stop event propagation.
   * @api
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
const Fr = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
};
class da {
  constructor() {
    this.disposed = !1;
  }
  /**
   * Clean up.
   */
  dispose() {
    this.disposed || (this.disposed = !0, this.disposeInternal());
  }
  /**
   * Extension point for disposable objects.
   * @protected
   */
  disposeInternal() {
  }
}
function D1(t, e, n) {
  let i, r;
  n = n || vn;
  let s = 0, o = t.length, l = !1;
  for (; s < o; )
    i = s + (o - s >> 1), r = +n(t[i], e), r < 0 ? s = i + 1 : (o = i, l = !r);
  return l ? s : ~s;
}
function vn(t, e) {
  return t > e ? 1 : t < e ? -1 : 0;
}
function Ih(t, e, n) {
  if (t[0] <= e)
    return 0;
  const i = t.length;
  if (e <= t[i - 1])
    return i - 1;
  if (typeof n == "function") {
    for (let r = 1; r < i; ++r) {
      const s = t[r];
      if (s === e)
        return r;
      if (s < e)
        return n(e, t[r - 1], s) > 0 ? r - 1 : r;
    }
    return i - 1;
  }
  if (n > 0) {
    for (let r = 1; r < i; ++r)
      if (t[r] < e)
        return r - 1;
    return i - 1;
  }
  if (n < 0) {
    for (let r = 1; r < i; ++r)
      if (t[r] <= e)
        return r;
    return i - 1;
  }
  for (let r = 1; r < i; ++r) {
    if (t[r] == e)
      return r;
    if (t[r] < e)
      return t[r - 1] - e < e - t[r] ? r - 1 : r;
  }
  return i - 1;
}
function O1(t, e, n) {
  for (; e < n; ) {
    const i = t[e];
    t[e] = t[n], t[n] = i, ++e, --n;
  }
}
function Lh(t, e) {
  const n = Array.isArray(e) ? e : [e], i = n.length;
  for (let r = 0; r < i; r++)
    t[t.length] = n[r];
}
function hi(t, e) {
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (t[i] !== e[i])
      return !1;
  return !0;
}
function F1(t, e, n) {
  const i = e || vn;
  return t.every(function(r, s) {
    if (s === 0)
      return !0;
    const o = i(t[s - 1], r);
    return !(o > 0 || o === 0);
  });
}
function Hs() {
  return !0;
}
function fa() {
  return !1;
}
function Nr() {
}
function Ym(t) {
  let e, n, i;
  return function() {
    const r = Array.prototype.slice.call(arguments);
    return (!n || this !== i || !hi(r, n)) && (i = this, n = r, e = t.apply(this, arguments)), e;
  };
}
function N1(t) {
  function e() {
    let n;
    try {
      n = t();
    } catch (i) {
      return Promise.reject(i);
    }
    return n instanceof Promise ? n : Promise.resolve(n);
  }
  return e();
}
function po(t) {
  for (const e in t)
    delete t[e];
}
function zr(t) {
  let e;
  for (e in t)
    return !1;
  return !e;
}
class ga extends da {
  /**
   * @param {*} [target] Default event target for dispatched events.
   */
  constructor(e) {
    super(), this.eventTarget_ = e, this.pendingRemovals_ = null, this.dispatching_ = null, this.listeners_ = null;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  addEventListener(e, n) {
    if (!e || !n)
      return;
    const i = this.listeners_ || (this.listeners_ = {}), r = i[e] || (i[e] = []);
    r.includes(n) || r.push(n);
  }
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */
  dispatchEvent(e) {
    const n = typeof e == "string", i = n ? e : e.type, r = this.listeners_ && this.listeners_[i];
    if (!r)
      return;
    const s = n ? new kn(e) : (
      /** @type {Event} */
      e
    );
    s.target || (s.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}), l = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    i in o || (o[i] = 0, l[i] = 0), ++o[i];
    let a;
    for (let u = 0, c = r.length; u < c; ++u)
      if ("handleEvent" in r[u] ? a = /** @type {import("../events.js").ListenerObject} */
      r[u].handleEvent(s) : a = /** @type {import("../events.js").ListenerFunction} */
      r[u].call(this, s), a === !1 || s.propagationStopped) {
        a = !1;
        break;
      }
    if (--o[i] === 0) {
      let u = l[i];
      for (delete l[i]; u--; )
        this.removeEventListener(i, Nr);
      delete o[i];
    }
    return a;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.listeners_ && po(this.listeners_);
  }
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */
  getListeners(e) {
    return this.listeners_ && this.listeners_[e] || void 0;
  }
  /**
   * @param {string} [type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */
  hasListener(e) {
    return this.listeners_ ? e ? e in this.listeners_ : Object.keys(this.listeners_).length > 0 : !1;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  removeEventListener(e, n) {
    if (!this.listeners_)
      return;
    const i = this.listeners_[e];
    if (!i)
      return;
    const r = i.indexOf(n);
    r !== -1 && (this.pendingRemovals_ && e in this.pendingRemovals_ ? (i[r] = Nr, ++this.pendingRemovals_[e]) : (i.splice(r, 1), i.length === 0 && delete this.listeners_[e]));
  }
}
const V = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: "change",
  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: "error",
  BLUR: "blur",
  CLEAR: "clear",
  CONTEXTMENU: "contextmenu",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  FOCUS: "focus",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  RESIZE: "resize",
  TOUCHMOVE: "touchmove",
  WHEEL: "wheel"
};
function q(t, e, n, i, r) {
  if (r) {
    const o = n;
    n = function() {
      t.removeEventListener(e, n), o.apply(i ?? this, arguments);
    };
  } else i && i !== t && (n = n.bind(i));
  const s = {
    target: t,
    type: e,
    listener: n
  };
  return t.addEventListener(e, n), s;
}
function zl(t, e, n, i) {
  return q(t, e, n, i, !0);
}
function le(t) {
  t && t.target && (t.target.removeEventListener(t.type, t.listener), po(t));
}
class mo extends ga {
  constructor() {
    super(), this.on = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onInternal, this.once = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onceInternal, this.un = /** @type {ObservableOnSignature<void>} */
    this.unInternal, this.revision_ = 0;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */
  changed() {
    ++this.revision_, this.dispatchEvent(V.CHANGE);
  }
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */
  getRevision() {
    return this.revision_;
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onInternal(e, n) {
    if (Array.isArray(e)) {
      const i = e.length, r = new Array(i);
      for (let s = 0; s < i; ++s)
        r[s] = q(this, e[s], n);
      return r;
    }
    return q(
      this,
      /** @type {string} */
      e,
      n
    );
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onceInternal(e, n) {
    let i;
    if (Array.isArray(e)) {
      const r = e.length;
      i = new Array(r);
      for (let s = 0; s < r; ++s)
        i[s] = zl(this, e[s], n);
    } else
      i = zl(
        this,
        /** @type {string} */
        e,
        n
      );
    return n.ol_key = i, i;
  }
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */
  unInternal(e, n) {
    const i = (
      /** @type {Object} */
      n.ol_key
    );
    if (i)
      z1(i);
    else if (Array.isArray(e))
      for (let r = 0, s = e.length; r < s; ++r)
        this.removeEventListener(e[r], n);
    else
      this.removeEventListener(e, n);
  }
}
mo.prototype.on;
mo.prototype.once;
mo.prototype.un;
function z1(t) {
  if (Array.isArray(t))
    for (let e = 0, n = t.length; e < n; ++e)
      le(t[e]);
  else
    le(
      /** @type {import("./events.js").EventsKey} */
      t
    );
}
function J() {
  throw new Error("Unimplemented abstract method.");
}
let G1 = 0;
function ie(t) {
  return t.ol_uid || (t.ol_uid = String(++G1));
}
class kf extends kn {
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */
  constructor(e, n, i) {
    super(e), this.key = n, this.oldValue = i;
  }
}
class rn extends mo {
  /**
   * @param {Object<string, *>} [values] An object with key-value pairs.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, ie(this), this.values_ = null, e !== void 0 && this.setProperties(e);
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */
  get(e) {
    let n;
    return this.values_ && this.values_.hasOwnProperty(e) && (n = this.values_[e]), n;
  }
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */
  getKeys() {
    return this.values_ && Object.keys(this.values_) || [];
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */
  getProperties() {
    return this.values_ && Object.assign({}, this.values_) || {};
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.values_;
  }
  /**
   * @return {boolean} The object has properties.
   */
  hasProperties() {
    return !!this.values_;
  }
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */
  notify(e, n) {
    let i;
    i = `change:${e}`, this.hasListener(i) && this.dispatchEvent(new kf(i, e, n)), i = Fr.PROPERTYCHANGE, this.hasListener(i) && this.dispatchEvent(new kf(i, e, n));
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  addChangeListener(e, n) {
    this.addEventListener(`change:${e}`, n);
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  removeChangeListener(e, n) {
    this.removeEventListener(`change:${e}`, n);
  }
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  set(e, n, i) {
    const r = this.values_ || (this.values_ = {});
    if (i)
      r[e] = n;
    else {
      const s = r[e];
      r[e] = n, s !== n && this.notify(e, s);
    }
  }
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  setProperties(e, n) {
    for (const i in e)
      this.set(i, e[i], n);
  }
  /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */
  applyProperties(e) {
    e.values_ && Object.assign(this.values_ || (this.values_ = {}), e.values_);
  }
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [silent] Unset without triggering an event.
   * @api
   */
  unset(e, n) {
    if (this.values_ && e in this.values_) {
      const i = this.values_[e];
      delete this.values_[e], zr(this.values_) && (this.values_ = null), n || this.notify(e, i);
    }
  }
}
const Je = {
  /**
   * Triggered when an item is added to the collection.
   * @event module:ol/Collection.CollectionEvent#add
   * @api
   */
  ADD: "add",
  /**
   * Triggered when an item is removed from the collection.
   * @event module:ol/Collection.CollectionEvent#remove
   * @api
   */
  REMOVE: "remove"
}, Mf = {
  LENGTH: "length"
};
class Uo extends kn {
  /**
   * @param {import("./CollectionEventType.js").default} type Type.
   * @param {T} element Element.
   * @param {number} index The index of the added or removed element.
   */
  constructor(e, n, i) {
    super(e), this.element = n, this.index = i;
  }
}
class Qt extends rn {
  /**
   * @param {Array<T>} [array] Array.
   * @param {Options} [options] Collection options.
   */
  constructor(e, n) {
    if (super(), this.on, this.once, this.un, n = n || {}, this.unique_ = !!n.unique, this.array_ = e || [], this.unique_)
      for (let i = 0, r = this.array_.length; i < r; ++i)
        this.assertUnique_(this.array_[i], i);
    this.updateLength_();
  }
  /**
   * Remove all elements from the collection.
   * @api
   */
  clear() {
    for (; this.getLength() > 0; )
      this.pop();
  }
  /**
   * Add elements to the collection.  This pushes each item in the provided array
   * to the end of the collection.
   * @param {!Array<T>} arr Array.
   * @return {Collection<T>} This collection.
   * @api
   */
  extend(e) {
    for (let n = 0, i = e.length; n < i; ++n)
      this.push(e[n]);
    return this;
  }
  /**
   * Iterate over each element, calling the provided callback.
   * @param {function(T, number, Array<T>): *} f The function to call
   *     for every element. This function takes 3 arguments (the element, the
   *     index and the array). The return value is ignored.
   * @api
   */
  forEach(e) {
    const n = this.array_;
    for (let i = 0, r = n.length; i < r; ++i)
      e(n[i], i, n);
  }
  /**
   * Get a reference to the underlying Array object. Warning: if the array
   * is mutated, no events will be dispatched by the collection, and the
   * collection's "length" property won't be in sync with the actual length
   * of the array.
   * @return {!Array<T>} Array.
   * @api
   */
  getArray() {
    return this.array_;
  }
  /**
   * Get the element at the provided index.
   * @param {number} index Index.
   * @return {T} Element.
   * @api
   */
  item(e) {
    return this.array_[e];
  }
  /**
   * Get the length of this collection.
   * @return {number} The length of the array.
   * @observable
   * @api
   */
  getLength() {
    return this.get(Mf.LENGTH);
  }
  /**
   * Insert an element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
  insertAt(e, n) {
    if (e < 0 || e > this.getLength())
      throw new Error("Index out of bounds: " + e);
    this.unique_ && this.assertUnique_(n), this.array_.splice(e, 0, n), this.updateLength_(), this.dispatchEvent(
      new Uo(Je.ADD, n, e)
    );
  }
  /**
   * Remove the last element of the collection and return it.
   * Return `undefined` if the collection is empty.
   * @return {T|undefined} Element.
   * @api
   */
  pop() {
    return this.removeAt(this.getLength() - 1);
  }
  /**
   * Insert the provided element at the end of the collection.
   * @param {T} elem Element.
   * @return {number} New length of the collection.
   * @api
   */
  push(e) {
    this.unique_ && this.assertUnique_(e);
    const n = this.getLength();
    return this.insertAt(n, e), this.getLength();
  }
  /**
   * Remove the first occurrence of an element from the collection.
   * @param {T} elem Element.
   * @return {T|undefined} The removed element or undefined if none found.
   * @api
   */
  remove(e) {
    const n = this.array_;
    for (let i = 0, r = n.length; i < r; ++i)
      if (n[i] === e)
        return this.removeAt(i);
  }
  /**
   * Remove the element at the provided index and return it.
   * Return `undefined` if the collection does not contain this index.
   * @param {number} index Index.
   * @return {T|undefined} Value.
   * @api
   */
  removeAt(e) {
    if (e < 0 || e >= this.getLength())
      return;
    const n = this.array_[e];
    return this.array_.splice(e, 1), this.updateLength_(), this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new Uo(Je.REMOVE, n, e)
    ), n;
  }
  /**
   * Set the element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
  setAt(e, n) {
    const i = this.getLength();
    if (e >= i) {
      this.insertAt(e, n);
      return;
    }
    if (e < 0)
      throw new Error("Index out of bounds: " + e);
    this.unique_ && this.assertUnique_(n, e);
    const r = this.array_[e];
    this.array_[e] = n, this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new Uo(Je.REMOVE, r, e)
    ), this.dispatchEvent(
      /** @type {CollectionEvent<T>} */
      new Uo(Je.ADD, n, e)
    );
  }
  /**
   * @private
   */
  updateLength_() {
    this.set(Mf.LENGTH, this.array_.length);
  }
  /**
   * @private
   * @param {T} elem Element.
   * @param {number} [except] Optional index to ignore.
   */
  assertUnique_(e, n) {
    for (let i = 0, r = this.array_.length; i < r; ++i)
      if (this.array_[i] === e && i !== n)
        throw new Error("Duplicate item added to a unique collection");
  }
}
const re = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source",
  MAP: "map"
};
function ee(t, e) {
  if (!t)
    throw new Error(e);
}
function Ee(t, e, n) {
  return Math.min(Math.max(t, e), n);
}
function W1(t, e, n, i, r, s) {
  const o = r - n, l = s - i;
  if (o !== 0 || l !== 0) {
    const a = ((t - n) * o + (e - i) * l) / (o * o + l * l);
    a > 1 ? (n = r, i = s) : a > 0 && (n += o * a, i += l * a);
  }
  return Rr(t, e, n, i);
}
function Rr(t, e, n, i) {
  const r = n - t, s = i - e;
  return r * r + s * s;
}
function X1(t) {
  const e = t.length;
  for (let i = 0; i < e; i++) {
    let r = i, s = Math.abs(t[i][i]);
    for (let l = i + 1; l < e; l++) {
      const a = Math.abs(t[l][i]);
      a > s && (s = a, r = l);
    }
    if (s === 0)
      return null;
    const o = t[r];
    t[r] = t[i], t[i] = o;
    for (let l = i + 1; l < e; l++) {
      const a = -t[l][i] / t[i][i];
      for (let u = i; u < e + 1; u++)
        i == u ? t[l][u] = 0 : t[l][u] += a * t[i][u];
    }
  }
  const n = new Array(e);
  for (let i = e - 1; i >= 0; i--) {
    n[i] = t[i][e] / t[i][i];
    for (let r = i - 1; r >= 0; r--)
      t[r][e] -= t[r][i] * n[i];
  }
  return n;
}
function dl(t) {
  return t * Math.PI / 180;
}
function Tr(t, e) {
  const n = t % e;
  return n * e < 0 ? n + e : n;
}
function St(t, e, n) {
  return t + n * (e - t);
}
function kh(t, e) {
  const n = Math.pow(10, e);
  return Math.round(t * n) / n;
}
function Bo(t, e) {
  return Math.floor(kh(t, e));
}
function Vo(t, e) {
  return Math.ceil(kh(t, e));
}
class Um extends rn {
  /**
   * @param {Options} options Layer options.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, this.background_ = e.background;
    const n = Object.assign({}, e);
    typeof e.properties == "object" && (delete n.properties, Object.assign(n, e.properties)), n[re.OPACITY] = e.opacity !== void 0 ? e.opacity : 1, ee(
      typeof n[re.OPACITY] == "number",
      "Layer opacity must be a number"
    ), n[re.VISIBLE] = e.visible !== void 0 ? e.visible : !0, n[re.Z_INDEX] = e.zIndex, n[re.MAX_RESOLUTION] = e.maxResolution !== void 0 ? e.maxResolution : 1 / 0, n[re.MIN_RESOLUTION] = e.minResolution !== void 0 ? e.minResolution : 0, n[re.MIN_ZOOM] = e.minZoom !== void 0 ? e.minZoom : -1 / 0, n[re.MAX_ZOOM] = e.maxZoom !== void 0 ? e.maxZoom : 1 / 0, this.className_ = n.className !== void 0 ? n.className : "ol-layer", delete n.className, this.setProperties(n), this.state_ = null;
  }
  /**
   * Get the background for this layer.
   * @return {BackgroundColor|false} Layer background.
   */
  getBackground() {
    return this.background_;
  }
  /**
   * @return {string} CSS class name.
   */
  getClassName() {
    return this.className_;
  }
  /**
   * This method is not meant to be called by layers or layer renderers because the state
   * is incorrect if the layer is included in a layer group.
   *
   * @param {boolean} [managed] Layer is managed.
   * @return {import("./Layer.js").State} Layer state.
   */
  getLayerState(e) {
    const n = this.state_ || /** @type {?} */
    {
      layer: this,
      managed: e === void 0 ? !0 : e
    }, i = this.getZIndex();
    return n.opacity = Ee(Math.round(this.getOpacity() * 100) / 100, 0, 1), n.visible = this.getVisible(), n.extent = this.getExtent(), n.zIndex = i === void 0 && !n.managed ? 1 / 0 : i, n.maxResolution = this.getMaxResolution(), n.minResolution = Math.max(this.getMinResolution(), 0), n.minZoom = this.getMinZoom(), n.maxZoom = this.getMaxZoom(), this.state_ = n, n;
  }
  /**
   * @abstract
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */
  getLayersArray(e) {
    return J();
  }
  /**
   * @abstract
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */
  getLayerStatesArray(e) {
    return J();
  }
  /**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */
  getExtent() {
    return (
      /** @type {import("../extent.js").Extent|undefined} */
      this.get(re.EXTENT)
    );
  }
  /**
   * Return the maximum resolution of the layer. Returns Infinity if
   * the layer has no maximum resolution set.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */
  getMaxResolution() {
    return (
      /** @type {number} */
      this.get(re.MAX_RESOLUTION)
    );
  }
  /**
   * Return the minimum resolution of the layer. Returns 0 if
   * the layer has no minimum resolution set.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */
  getMinResolution() {
    return (
      /** @type {number} */
      this.get(re.MIN_RESOLUTION)
    );
  }
  /**
   * Return the minimum zoom level of the layer. Returns -Infinity if
   * the layer has no minimum zoom set.
   * @return {number} The minimum zoom level of the layer.
   * @observable
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.get(re.MIN_ZOOM)
    );
  }
  /**
   * Return the maximum zoom level of the layer. Returns Infinity if
   * the layer has no maximum zoom set.
   * @return {number} The maximum zoom level of the layer.
   * @observable
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.get(re.MAX_ZOOM)
    );
  }
  /**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */
  getOpacity() {
    return (
      /** @type {number} */
      this.get(re.OPACITY)
    );
  }
  /**
   * @abstract
   * @return {import("../source/Source.js").State} Source state.
   */
  getSourceState() {
    return J();
  }
  /**
   * Return the value of this layer's `visible` property. To find out whether the layer
   * is visible on a map, use `isVisible()` instead.
   * @return {boolean} The value of the `visible` property of the layer.
   * @observable
   * @api
   */
  getVisible() {
    return (
      /** @type {boolean} */
      this.get(re.VISIBLE)
    );
  }
  /**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. Returns undefined if the layer is unmanaged.
   * @return {number|undefined} The Z-index of the layer.
   * @observable
   * @api
   */
  getZIndex() {
    return (
      /** @type {number|undefined} */
      this.get(re.Z_INDEX)
    );
  }
  /**
   * Sets the background color.
   * @param {BackgroundColor} [background] Background color.
   */
  setBackground(e) {
    this.background_ = e, this.changed();
  }
  /**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */
  setExtent(e) {
    this.set(re.EXTENT, e);
  }
  /**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */
  setMaxResolution(e) {
    this.set(re.MAX_RESOLUTION, e);
  }
  /**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */
  setMinResolution(e) {
    this.set(re.MIN_RESOLUTION, e);
  }
  /**
   * Set the maximum zoom (exclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} maxZoom The maximum zoom of the layer.
   * @observable
   * @api
   */
  setMaxZoom(e) {
    this.set(re.MAX_ZOOM, e);
  }
  /**
   * Set the minimum zoom (inclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} minZoom The minimum zoom of the layer.
   * @observable
   * @api
   */
  setMinZoom(e) {
    this.set(re.MIN_ZOOM, e);
  }
  /**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */
  setOpacity(e) {
    ee(typeof e == "number", "Layer opacity must be a number"), this.set(re.OPACITY, e);
  }
  /**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */
  setVisible(e) {
    this.set(re.VISIBLE, e);
  }
  /**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */
  setZIndex(e) {
    this.set(re.Z_INDEX, e);
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.state_ && (this.state_.layer = null, this.state_ = null), super.disposeInternal();
  }
}
const Rt = {
  /**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */
  PRERENDER: "prerender",
  /**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered before layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */
  PRECOMPOSE: "precompose",
  /**
   * Triggered after layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */
  POSTCOMPOSE: "postcompose",
  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */
  RENDERCOMPLETE: "rendercomplete"
}, Ye = {
  ANIMATING: 0,
  INTERACTING: 1
}, At = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
}, j1 = 42, Mh = 256, Ph = {
  // use the radius of the Normal sphere
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class Bm {
  /**
   * @param {Options} options Projection options.
   */
  constructor(e) {
    this.code_ = e.code, this.units_ = /** @type {import("./Units.js").Units} */
    e.units, this.extent_ = e.extent !== void 0 ? e.extent : null, this.worldExtent_ = e.worldExtent !== void 0 ? e.worldExtent : null, this.axisOrientation_ = e.axisOrientation !== void 0 ? e.axisOrientation : "enu", this.global_ = e.global !== void 0 ? e.global : !1, this.canWrapX_ = !!(this.global_ && this.extent_), this.getPointResolutionFunc_ = e.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = e.metersPerUnit;
  }
  /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */
  canWrapX() {
    return this.canWrapX_;
  }
  /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */
  getCode() {
    return this.code_;
  }
  /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */
  getUnits() {
    return this.units_;
  }
  /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */
  getMetersPerUnit() {
    return this.metersPerUnit_ || Ph[this.units_];
  }
  /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getWorldExtent() {
    return this.worldExtent_;
  }
  /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */
  isGlobal() {
    return this.global_;
  }
  /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */
  setGlobal(e) {
    this.global_ = e, this.canWrapX_ = !!(e && this.extent_);
  }
  /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */
  setDefaultTileGrid(e) {
    this.defaultTileGrid_ = e;
  }
  /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  setExtent(e) {
    this.extent_ = e, this.canWrapX_ = !!(this.global_ && e);
  }
  /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */
  setWorldExtent(e) {
    this.worldExtent_ = e;
  }
  /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */
  setGetPointResolution(e) {
    this.getPointResolutionFunc_ = e;
  }
  /**
   * Get the custom point resolution function for this projection (if set).
   * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
   * resolution function (if set).
   */
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const _o = 6378137, pr = Math.PI * _o, Y1 = [-pr, -pr, pr, pr], U1 = [-180, -85, 180, 85], Ko = _o * Math.log(Math.tan(Math.PI / 2));
class Vi extends Bm {
  /**
   * @param {string} code Code.
   */
  constructor(e) {
    super({
      code: e,
      units: "m",
      extent: Y1,
      global: !0,
      worldExtent: U1,
      getPointResolution: function(n, i) {
        return n / Math.cosh(i[1] / _o);
      }
    });
  }
}
const Pf = [
  new Vi("EPSG:3857"),
  new Vi("EPSG:102100"),
  new Vi("EPSG:102113"),
  new Vi("EPSG:900913"),
  new Vi("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new Vi("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function B1(t, e, n, i) {
  const r = t.length;
  n = n > 1 ? n : 2, i = i ?? n, e === void 0 && (n > 2 ? e = t.slice() : e = new Array(r));
  for (let s = 0; s < r; s += i) {
    e[s] = pr * t[s] / 180;
    let o = _o * Math.log(Math.tan(Math.PI * (+t[s + 1] + 90) / 360));
    o > Ko ? o = Ko : o < -Ko && (o = -Ko), e[s + 1] = o;
  }
  return e;
}
function V1(t, e, n, i) {
  const r = t.length;
  n = n > 1 ? n : 2, i = i ?? n, e === void 0 && (n > 2 ? e = t.slice() : e = new Array(r));
  for (let s = 0; s < r; s += i)
    e[s] = 180 * t[s] / pr, e[s + 1] = 360 * Math.atan(Math.exp(t[s + 1] / _o)) / Math.PI - 90;
  return e;
}
const K1 = 6378137, Af = [-180, -90, 180, 90], b1 = Math.PI * K1 / 180;
class pi extends Bm {
  /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */
  constructor(e, n) {
    super({
      code: e,
      units: "degrees",
      extent: Af,
      axisOrientation: n,
      global: !0,
      metersPerUnit: b1,
      worldExtent: Af
    });
  }
}
const Df = [
  new pi("CRS:84"),
  new pi("EPSG:4326", "neu"),
  new pi("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new pi("urn:ogc:def:crs:OGC:2:84"),
  new pi("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new pi("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new pi("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let Ec = {};
function Z1(t) {
  return Ec[t] || Ec[t.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function H1(t, e) {
  Ec[t] = e;
}
let Ir = {};
function Gl(t, e, n) {
  const i = t.getCode(), r = e.getCode();
  i in Ir || (Ir[i] = {}), Ir[i][r] = n;
}
function $1(t, e) {
  let n;
  return t in Ir && e in Ir[t] && (n = Ir[t][e]), n;
}
const ke = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function Of(t) {
  const e = kt();
  for (let n = 0, i = t.length; n < i; ++n)
    Ps(e, t[n]);
  return e;
}
function Ah(t, e, n) {
  return n ? (n[0] = t[0] - e, n[1] = t[1] - e, n[2] = t[2] + e, n[3] = t[3] + e, n) : [
    t[0] - e,
    t[1] - e,
    t[2] + e,
    t[3] + e
  ];
}
function Vm(t, e) {
  return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t.slice();
}
function Km(t, e, n) {
  let i, r;
  return e < t[0] ? i = t[0] - e : t[2] < e ? i = e - t[2] : i = 0, n < t[1] ? r = t[1] - n : t[3] < n ? r = n - t[3] : r = 0, i * i + r * r;
}
function Gr(t, e) {
  return bm(t, e[0], e[1]);
}
function mr(t, e) {
  return t[0] <= e[0] && e[2] <= t[2] && t[1] <= e[1] && e[3] <= t[3];
}
function bm(t, e, n) {
  return t[0] <= e && e <= t[2] && t[1] <= n && n <= t[3];
}
function xc(t, e) {
  const n = t[0], i = t[1], r = t[2], s = t[3], o = e[0], l = e[1];
  let a = ke.UNKNOWN;
  return o < n ? a = a | ke.LEFT : o > r && (a = a | ke.RIGHT), l < i ? a = a | ke.BELOW : l > s && (a = a | ke.ABOVE), a === ke.UNKNOWN && (a = ke.INTERSECTING), a;
}
function kt() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function oi(t, e, n, i, r) {
  return r ? (r[0] = t, r[1] = e, r[2] = n, r[3] = i, r) : [t, e, n, i];
}
function pa(t) {
  return oi(1 / 0, 1 / 0, -1 / 0, -1 / 0, t);
}
function Zm(t, e) {
  const n = t[0], i = t[1];
  return oi(n, i, n, i, e);
}
function Dh(t, e, n, i, r) {
  const s = pa(r);
  return Hm(s, t, e, n, i);
}
function $s(t, e) {
  return t[0] == e[0] && t[2] == e[2] && t[1] == e[1] && t[3] == e[3];
}
function q1(t, e) {
  return e[0] < t[0] && (t[0] = e[0]), e[2] > t[2] && (t[2] = e[2]), e[1] < t[1] && (t[1] = e[1]), e[3] > t[3] && (t[3] = e[3]), t;
}
function Ps(t, e) {
  e[0] < t[0] && (t[0] = e[0]), e[0] > t[2] && (t[2] = e[0]), e[1] < t[1] && (t[1] = e[1]), e[1] > t[3] && (t[3] = e[1]);
}
function Hm(t, e, n, i, r) {
  for (; n < i; n += r)
    Q1(t, e[n], e[n + 1]);
  return t;
}
function Q1(t, e, n) {
  t[0] = Math.min(t[0], e), t[1] = Math.min(t[1], n), t[2] = Math.max(t[2], e), t[3] = Math.max(t[3], n);
}
function $m(t, e) {
  let n;
  return n = e(ma(t)), n || (n = e(_a(t)), n) || (n = e(ya(t)), n) || (n = e(Gi(t)), n) ? n : !1;
}
function qs(t) {
  let e = 0;
  return va(t) || (e = ne(t) * Be(t)), e;
}
function ma(t) {
  return [t[0], t[1]];
}
function _a(t) {
  return [t[2], t[1]];
}
function Oi(t) {
  return [(t[0] + t[2]) / 2, (t[1] + t[3]) / 2];
}
function J1(t, e) {
  let n;
  if (e === "bottom-left")
    n = ma(t);
  else if (e === "bottom-right")
    n = _a(t);
  else if (e === "top-left")
    n = Gi(t);
  else if (e === "top-right")
    n = ya(t);
  else
    throw new Error("Invalid corner");
  return n;
}
function wc(t, e, n, i, r) {
  const [s, o, l, a, u, c, h, d] = ev(
    t,
    e,
    n,
    i
  );
  return oi(
    Math.min(s, l, u, h),
    Math.min(o, a, c, d),
    Math.max(s, l, u, h),
    Math.max(o, a, c, d),
    r
  );
}
function ev(t, e, n, i) {
  const r = e * i[0] / 2, s = e * i[1] / 2, o = Math.cos(n), l = Math.sin(n), a = r * o, u = r * l, c = s * o, h = s * l, d = t[0], f = t[1];
  return [
    d - a + h,
    f - u - c,
    d - a - h,
    f - u + c,
    d + a - h,
    f + u + c,
    d + a + h,
    f + u - c,
    d - a + h,
    f - u - c
  ];
}
function Be(t) {
  return t[3] - t[1];
}
function Gt(t, e, n) {
  const i = n || kt();
  return nt(t, e) ? (t[0] > e[0] ? i[0] = t[0] : i[0] = e[0], t[1] > e[1] ? i[1] = t[1] : i[1] = e[1], t[2] < e[2] ? i[2] = t[2] : i[2] = e[2], t[3] < e[3] ? i[3] = t[3] : i[3] = e[3]) : pa(i), i;
}
function Gi(t) {
  return [t[0], t[3]];
}
function ya(t) {
  return [t[2], t[3]];
}
function ne(t) {
  return t[2] - t[0];
}
function nt(t, e) {
  return t[0] <= e[2] && t[2] >= e[0] && t[1] <= e[3] && t[3] >= e[1];
}
function va(t) {
  return t[2] < t[0] || t[3] < t[1];
}
function tv(t, e) {
  return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t;
}
function nv(t, e, n) {
  let i = !1;
  const r = xc(t, e), s = xc(t, n);
  if (r === ke.INTERSECTING || s === ke.INTERSECTING)
    i = !0;
  else {
    const o = t[0], l = t[1], a = t[2], u = t[3], c = e[0], h = e[1], d = n[0], f = n[1], m = (f - h) / (d - c);
    let y, E;
    s & ke.ABOVE && !(r & ke.ABOVE) && (y = d - (f - u) / m, i = y >= o && y <= a), !i && s & ke.RIGHT && !(r & ke.RIGHT) && (E = f - (d - a) * m, i = E >= l && E <= u), !i && s & ke.BELOW && !(r & ke.BELOW) && (y = d - (f - l) / m, i = y >= o && y <= a), !i && s & ke.LEFT && !(r & ke.LEFT) && (E = f - (d - o) * m, i = E >= l && E <= u);
  }
  return i;
}
function qm(t, e) {
  const n = e.getExtent(), i = Oi(t);
  if (e.canWrapX() && (i[0] < n[0] || i[0] >= n[2])) {
    const r = ne(n), o = Math.floor(
      (i[0] - n[0]) / r
    ) * r;
    t[0] -= o, t[2] -= o;
  }
  return t;
}
function Oh(t, e, n) {
  if (e.canWrapX()) {
    const i = e.getExtent();
    if (!isFinite(t[0]) || !isFinite(t[2]))
      return [[i[0], t[1], i[2], t[3]]];
    qm(t, e);
    const r = ne(i);
    if (ne(t) > r && !n)
      return [[i[0], t[1], i[2], t[3]]];
    if (t[0] < i[0])
      return [
        [t[0] + r, t[1], i[2], t[3]],
        [i[0], t[1], t[2], t[3]]
      ];
    if (t[2] > i[2])
      return [
        [t[0], t[1], i[2], t[3]],
        [i[0], t[1], t[2] - r, t[3]]
      ];
  }
  return [t];
}
function iv(t, e) {
  return t[0] += +e[0], t[1] += +e[1], t;
}
function Wl(t, e) {
  let n = !0;
  for (let i = t.length - 1; i >= 0; --i)
    if (t[i] != e[i]) {
      n = !1;
      break;
    }
  return n;
}
function Fh(t, e) {
  const n = Math.cos(e), i = Math.sin(e), r = t[0] * n - t[1] * i, s = t[1] * n + t[0] * i;
  return t[0] = r, t[1] = s, t;
}
function rv(t, e) {
  return t[0] *= e, t[1] *= e, t;
}
function Qm(t, e) {
  if (e.canWrapX()) {
    const n = ne(e.getExtent()), i = sv(t, e, n);
    i && (t[0] -= i * n);
  }
  return t;
}
function sv(t, e, n) {
  const i = e.getExtent();
  let r = 0;
  return e.canWrapX() && (t[0] < i[0] || t[0] > i[2]) && (n = n || ne(i), r = Math.floor(
    (t[0] - i[0]) / n
  )), r;
}
const ov = 63710088e-1;
function Ff(t, e, n) {
  n = n || ov;
  const i = dl(t[1]), r = dl(e[1]), s = (r - i) / 2, o = dl(e[0] - t[0]) / 2, l = Math.sin(s) * Math.sin(s) + Math.sin(o) * Math.sin(o) * Math.cos(i) * Math.cos(r);
  return 2 * n * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l));
}
function Jm(...t) {
  console.warn(...t);
}
let Sc = !0;
function e_(t) {
  Sc = !1;
}
function Nh(t, e) {
  if (e !== void 0) {
    for (let n = 0, i = t.length; n < i; ++n)
      e[n] = t[n];
    e = e;
  } else
    e = t.slice();
  return e;
}
function t_(t, e) {
  if (e !== void 0 && t !== e) {
    for (let n = 0, i = t.length; n < i; ++n)
      e[n] = t[n];
    t = e;
  }
  return t;
}
function lv(t) {
  H1(t.getCode(), t), Gl(t, t, Nh);
}
function av(t) {
  t.forEach(lv);
}
function Mt(t) {
  return typeof t == "string" ? Z1(
    /** @type {string} */
    t
  ) : (
    /** @type {Projection} */
    t || null
  );
}
function Nf(t, e, n, i) {
  t = Mt(t);
  let r;
  const s = t.getPointResolutionFunc();
  if (s)
    r = s(e, n);
  else {
    const o = t.getUnits();
    if (o == "degrees" && !i || i == "degrees")
      r = e;
    else {
      const l = Gh(
        t,
        Mt("EPSG:4326")
      );
      if (l === t_ && o !== "degrees")
        r = e * t.getMetersPerUnit();
      else {
        let u = [
          n[0] - e / 2,
          n[1],
          n[0] + e / 2,
          n[1],
          n[0],
          n[1] - e / 2,
          n[0],
          n[1] + e / 2
        ];
        u = l(u, u, 2);
        const c = Ff(u.slice(0, 2), u.slice(2, 4)), h = Ff(u.slice(4, 6), u.slice(6, 8));
        r = (c + h) / 2;
      }
      const a = t.getMetersPerUnit();
      a !== void 0 && (r /= a);
    }
  }
  return r;
}
function zf(t) {
  av(t), t.forEach(function(e) {
    t.forEach(function(n) {
      e !== n && Gl(e, n, Nh);
    });
  });
}
function uv(t, e, n, i) {
  t.forEach(function(r) {
    e.forEach(function(s) {
      Gl(r, s, n), Gl(s, r, i);
    });
  });
}
function zh(t, e) {
  return t ? typeof t == "string" ? Mt(t) : (
    /** @type {Projection} */
    t
  ) : Mt(e);
}
function au(t, e) {
  return e_(), Wh(
    t,
    "EPSG:4326",
    "EPSG:3857"
  );
}
function uu(t, e) {
  if (t === e)
    return !0;
  const n = t.getUnits() === e.getUnits();
  return (t.getCode() === e.getCode() || Gh(t, e) === Nh) && n;
}
function Gh(t, e) {
  const n = t.getCode(), i = e.getCode();
  let r = $1(n, i);
  return r || (r = t_), r;
}
function Xl(t, e) {
  const n = Mt(t), i = Mt(e);
  return Gh(n, i);
}
function Wh(t, e, n) {
  return Xl(e, n)(t, void 0, t.length);
}
function Cc(t, e) {
  return t;
}
function hn(t, e) {
  return Sc && !Wl(t, [0, 0]) && t[0] >= -180 && t[0] <= 180 && t[1] >= -90 && t[1] <= 90 && (Sc = !1, Jm(
    "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
  )), t;
}
function n_(t, e) {
  return t;
}
function bn(t, e) {
  return t;
}
function cv() {
  zf(Pf), zf(Df), uv(
    Df,
    Pf,
    B1,
    V1
  );
}
cv();
function Gf(t, e, n) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number|undefined} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function(i, r, s, o, l) {
      if (!i)
        return;
      if (!r && !e)
        return i;
      const a = e ? 0 : s[0] * r, u = e ? 0 : s[1] * r, c = l ? l[0] : 0, h = l ? l[1] : 0;
      let d = t[0] + a / 2 + c, f = t[2] - a / 2 + c, m = t[1] + u / 2 + h, y = t[3] - u / 2 + h;
      d > f && (d = (f + d) / 2, f = d), m > y && (m = (y + m) / 2, y = m);
      let E = Ee(i[0], d, f), p = Ee(i[1], m, y);
      if (o && n && r) {
        const g = 30 * r;
        E += -g * Math.log(1 + Math.max(0, d - i[0]) / g) + g * Math.log(1 + Math.max(0, i[0] - f) / g), p += -g * Math.log(1 + Math.max(0, m - i[1]) / g) + g * Math.log(1 + Math.max(0, i[1] - y) / g);
      }
      return [E, p];
    }
  );
}
function hv(t) {
  return t;
}
function Xh(t, e, n, i) {
  const r = ne(e) / n[0], s = Be(e) / n[1];
  return i ? Math.min(t, Math.max(r, s)) : Math.min(t, Math.min(r, s));
}
function jh(t, e, n) {
  let i = Math.min(t, e);
  const r = 50;
  return i *= Math.log(1 + r * Math.max(0, t / e - 1)) / r + 1, n && (i = Math.max(i, n), i /= Math.log(1 + r * Math.max(0, n / t - 1)) / r + 1), Ee(i, n / 2, e * 2);
}
function dv(t, e, n, i) {
  return e = e !== void 0 ? e : !0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(r, s, o, l) {
    if (r !== void 0) {
      const a = t[0], u = t[t.length - 1], c = n ? Xh(
        a,
        n,
        o,
        i
      ) : a;
      if (l)
        return e ? jh(
          r,
          c,
          u
        ) : Ee(r, u, c);
      const h = Math.min(c, r), d = Math.floor(Ih(t, h, s));
      return t[d] > c && d < t.length - 1 ? t[d + 1] : t[d];
    }
  };
}
function fv(t, e, n, i, r, s) {
  return i = i !== void 0 ? i : !0, n = n !== void 0 ? n : 0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(o, l, a, u) {
    if (o !== void 0) {
      const c = r ? Xh(
        e,
        r,
        a,
        s
      ) : e;
      if (u)
        return i ? jh(
          o,
          c,
          n
        ) : Ee(o, n, c);
      const h = 1e-9, d = Math.ceil(
        Math.log(e / c) / Math.log(t) - h
      ), f = -l * (0.5 - h) + 0.5, m = Math.min(c, o), y = Math.floor(
        Math.log(e / m) / Math.log(t) + f
      ), E = Math.max(d, y), p = e / Math.pow(t, E);
      return Ee(p, n, c);
    }
  };
}
function Wf(t, e, n, i, r) {
  return n = n !== void 0 ? n : !0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(s, o, l, a) {
    if (s !== void 0) {
      const u = i ? Xh(
        t,
        i,
        l,
        r
      ) : t;
      return !n || !a ? Ee(s, e, u) : jh(
        s,
        u,
        e
      );
    }
  };
}
function Yh(t) {
  if (t !== void 0)
    return 0;
}
function Xf(t) {
  if (t !== void 0)
    return t;
}
function gv(t) {
  const e = 2 * Math.PI / t;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(n, i) {
      if (i)
        return n;
      if (n !== void 0)
        return n = Math.floor(n / e + 0.5) * e, n;
    }
  );
}
function pv(t) {
  const e = dl(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(n, i) {
      return i || n === void 0 ? n : Math.abs(n) <= e ? 0 : n;
    }
  );
}
function i_(t) {
  return Math.pow(t, 3);
}
function Vr(t) {
  return 1 - i_(1 - t);
}
function mv(t) {
  return 3 * t * t - 2 * t * t * t;
}
function _v(t) {
  return t;
}
new Array(6);
function jt() {
  return [1, 0, 0, 1, 0, 0];
}
function yv(t, e) {
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
}
function Oe(t, e) {
  const n = e[0], i = e[1];
  return e[0] = t[0] * n + t[2] * i + t[4], e[1] = t[1] * n + t[3] * i + t[5], e;
}
function In(t, e, n, i, r, s, o, l) {
  const a = Math.sin(s), u = Math.cos(s);
  return t[0] = i * u, t[1] = r * a, t[2] = -i * a, t[3] = r * u, t[4] = o * i * u - l * i * a + e, t[5] = o * r * a + l * r * u + n, t;
}
function r_(t, e) {
  const n = vv(e);
  ee(n !== 0, "Transformation matrix cannot be inverted");
  const i = e[0], r = e[1], s = e[2], o = e[3], l = e[4], a = e[5];
  return t[0] = o / n, t[1] = -r / n, t[2] = -s / n, t[3] = i / n, t[4] = (s * a - o * l) / n, t[5] = -(i * a - r * l) / n, t;
}
function vv(t) {
  return t[0] * t[3] - t[1] * t[2];
}
const jf = [1e6, 1e6, 1e6, 1e6, 2, 2];
function Ev(t) {
  return "matrix(" + t.map(
    (n, i) => Math.round(n * jf[i]) / jf[i]
  ).join(", ") + ")";
}
function ii(t, e, n, i, r, s, o) {
  s = s || [], o = o || 2;
  let l = 0;
  for (let a = e; a < n; a += i) {
    const u = t[a], c = t[a + 1];
    s[l++] = r[0] * u + r[2] * c + r[4], s[l++] = r[1] * u + r[3] * c + r[5];
    for (let h = 2; h < o; h++)
      s[l++] = t[a + h];
  }
  return s && s.length != l && (s.length = l), s;
}
function s_(t, e, n, i, r, s, o) {
  o = o || [];
  const l = Math.cos(r), a = Math.sin(r), u = s[0], c = s[1];
  let h = 0;
  for (let d = e; d < n; d += i) {
    const f = t[d] - u, m = t[d + 1] - c;
    o[h++] = u + f * l - m * a, o[h++] = c + f * a + m * l;
    for (let y = d + 2; y < d + i; ++y)
      o[h++] = t[y];
  }
  return o && o.length != h && (o.length = h), o;
}
function xv(t, e, n, i, r, s, o, l) {
  l = l || [];
  const a = o[0], u = o[1];
  let c = 0;
  for (let h = e; h < n; h += i) {
    const d = t[h] - a, f = t[h + 1] - u;
    l[c++] = a + r * d, l[c++] = u + s * f;
    for (let m = h + 2; m < h + i; ++m)
      l[c++] = t[m];
  }
  return l && l.length != c && (l.length = c), l;
}
function wv(t, e, n, i, r, s, o) {
  o = o || [];
  let l = 0;
  for (let a = e; a < n; a += i) {
    o[l++] = t[a] + r, o[l++] = t[a + 1] + s;
    for (let u = a + 2; u < a + i; ++u)
      o[l++] = t[u];
  }
  return o && o.length != l && (o.length = l), o;
}
const Yf = jt();
class Sv extends rn {
  constructor() {
    super(), this.extent_ = kt(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = Ym(
      (e, n, i) => {
        if (!i)
          return this.getSimplifiedGeometry(n);
        const r = this.clone();
        return r.applyTransform(i), r.getSimplifiedGeometry(n);
      }
    );
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */
  simplifyTransformed(e, n) {
    return this.simplifyTransformedInternal(
      this.getRevision(),
      e,
      n
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */
  clone() {
    return J();
  }
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(e, n, i, r) {
    return J();
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(e, n) {
    const i = this.getClosestPoint([e, n]);
    return i[0] === e && i[1] === n;
  }
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */
  getClosestPoint(e, n) {
    return n = n || [NaN, NaN], this.closestPointXY(e[0], e[1], n, 1 / 0), n;
  }
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */
  intersectsCoordinate(e) {
    return this.containsXY(e[0], e[1]);
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(e) {
    return J();
  }
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */
  getExtent(e) {
    if (this.extentRevision_ != this.getRevision()) {
      const n = this.computeExtent(this.extent_);
      (isNaN(n[0]) || isNaN(n[1])) && pa(n), this.extentRevision_ = this.getRevision();
    }
    return tv(this.extent_, e);
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(e, n) {
    J();
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(e, n, i) {
    J();
  }
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */
  simplify(e) {
    return this.getSimplifiedGeometry(e * e);
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */
  getSimplifiedGeometry(e) {
    return J();
  }
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */
  getType() {
    return J();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */
  applyTransform(e) {
    J();
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */
  intersectsExtent(e) {
    return J();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(e, n) {
    J();
  }
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {this} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */
  transform(e, n) {
    const i = Mt(e), r = i.getUnits() == "tile-pixels" ? function(s, o, l) {
      const a = i.getExtent(), u = i.getWorldExtent(), c = Be(u) / Be(a);
      return In(
        Yf,
        u[0],
        u[3],
        c,
        -c,
        0,
        0,
        0
      ), ii(
        s,
        0,
        s.length,
        l,
        Yf,
        o
      ), Xl(i, n)(
        s,
        o,
        l
      );
    } : Xl(i, n);
    return this.applyTransform(r), this;
  }
}
class Uh extends Sv {
  constructor() {
    super(), this.layout = "XY", this.stride = 2, this.flatCoordinates;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(e) {
    return Dh(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      e
    );
  }
  /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */
  getCoordinates() {
    return J();
  }
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */
  getLastCoordinate() {
    return this.flatCoordinates.slice(
      this.flatCoordinates.length - this.stride
    );
  }
  /**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */
  getLayout() {
    return this.layout;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @override
   */
  getSimplifiedGeometry(e) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), e < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && e <= this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const n = this.getSimplifiedGeometryInternal(e);
    return n.getFlatCoordinates().length < this.flatCoordinates.length ? n : (this.simplifiedGeometryMaxMinSquaredTolerance = e, this);
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */
  getSimplifiedGeometryInternal(e) {
    return this;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride;
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */
  setFlatCoordinates(e, n) {
    this.stride = Uf(e), this.layout = e, this.flatCoordinates = n;
  }
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  setCoordinates(e, n) {
    J();
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */
  setLayout(e, n, i) {
    let r;
    if (e)
      r = Uf(e);
    else {
      for (let s = 0; s < i; ++s) {
        if (n.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        }
        n = /** @type {Array<unknown>} */
        n[0];
      }
      r = n.length, e = Cv(r);
    }
    this.layout = e, this.stride = r;
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   * @override
   */
  applyTransform(e) {
    this.flatCoordinates && (e(
      this.flatCoordinates,
      this.flatCoordinates,
      this.layout.startsWith("XYZ") ? 3 : 2,
      this.stride
    ), this.changed());
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   * @override
   */
  rotate(e, n) {
    const i = this.getFlatCoordinates();
    if (i) {
      const r = this.getStride();
      s_(
        i,
        0,
        i.length,
        r,
        e,
        n,
        i
      ), this.changed();
    }
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   * @override
   */
  scale(e, n, i) {
    n === void 0 && (n = e), i || (i = Oi(this.getExtent()));
    const r = this.getFlatCoordinates();
    if (r) {
      const s = this.getStride();
      xv(
        r,
        0,
        r.length,
        s,
        e,
        n,
        i,
        r
      ), this.changed();
    }
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   * @override
   */
  translate(e, n) {
    const i = this.getFlatCoordinates();
    if (i) {
      const r = this.getStride();
      wv(
        i,
        0,
        i.length,
        r,
        e,
        n,
        i
      ), this.changed();
    }
  }
}
function Cv(t) {
  let e;
  return t == 2 ? e = "XY" : t == 3 ? e = "XYZ" : t == 4 && (e = "XYZM"), /** @type {import("./Geometry.js").GeometryLayout} */
  e;
}
function Uf(t) {
  let e;
  return t == "XY" ? e = 2 : t == "XYZ" || t == "XYM" ? e = 3 : t == "XYZM" && (e = 4), /** @type {number} */
  e;
}
function Rv(t, e, n) {
  const i = t.getFlatCoordinates();
  if (!i)
    return null;
  const r = t.getStride();
  return ii(
    i,
    0,
    i.length,
    r,
    e,
    n
  );
}
function Bf(t, e, n, i, r, s, o) {
  const l = t[e], a = t[e + 1], u = t[n] - l, c = t[n + 1] - a;
  let h;
  if (u === 0 && c === 0)
    h = e;
  else {
    const d = ((r - l) * u + (s - a) * c) / (u * u + c * c);
    if (d > 1)
      h = n;
    else if (d > 0) {
      for (let f = 0; f < i; ++f)
        o[f] = St(
          t[e + f],
          t[n + f],
          d
        );
      o.length = i;
      return;
    } else
      h = e;
  }
  for (let d = 0; d < i; ++d)
    o[d] = t[h + d];
  o.length = i;
}
function o_(t, e, n, i, r) {
  let s = t[e], o = t[e + 1];
  for (e += i; e < n; e += i) {
    const l = t[e], a = t[e + 1], u = Rr(s, o, l, a);
    u > r && (r = u), s = l, o = a;
  }
  return r;
}
function Tv(t, e, n, i, r) {
  for (let s = 0, o = n.length; s < o; ++s) {
    const l = n[s];
    r = o_(t, e, l, i, r), e = l;
  }
  return r;
}
function l_(t, e, n, i, r, s, o, l, a, u, c) {
  if (e == n)
    return u;
  let h, d;
  if (r === 0) {
    if (d = Rr(
      o,
      l,
      t[e],
      t[e + 1]
    ), d < u) {
      for (h = 0; h < i; ++h)
        a[h] = t[e + h];
      return a.length = i, d;
    }
    return u;
  }
  c = c || [NaN, NaN];
  let f = e + i;
  for (; f < n; )
    if (Bf(
      t,
      f - i,
      f,
      i,
      o,
      l,
      c
    ), d = Rr(o, l, c[0], c[1]), d < u) {
      for (u = d, h = 0; h < i; ++h)
        a[h] = c[h];
      a.length = i, f += i;
    } else
      f += i * Math.max(
        (Math.sqrt(d) - Math.sqrt(u)) / r | 0,
        1
      );
  if (Bf(
    t,
    n - i,
    e,
    i,
    o,
    l,
    c
  ), d = Rr(o, l, c[0], c[1]), d < u) {
    for (u = d, h = 0; h < i; ++h)
      a[h] = c[h];
    a.length = i;
  }
  return u;
}
function Iv(t, e, n, i, r, s, o, l, a, u, c) {
  c = c || [NaN, NaN];
  for (let h = 0, d = n.length; h < d; ++h) {
    const f = n[h];
    u = l_(
      t,
      e,
      f,
      i,
      r,
      s,
      o,
      l,
      a,
      u,
      c
    ), e = f;
  }
  return u;
}
function Lv(t, e, n, i) {
  for (let r = 0, s = n.length; r < s; ++r)
    t[e++] = n[r];
  return e;
}
function a_(t, e, n, i) {
  for (let r = 0, s = n.length; r < s; ++r) {
    const o = n[r];
    for (let l = 0; l < i; ++l)
      t[e++] = o[l];
  }
  return e;
}
function kv(t, e, n, i, r) {
  r = r || [];
  let s = 0;
  for (let o = 0, l = n.length; o < l; ++o) {
    const a = a_(
      t,
      e,
      n[o],
      i
    );
    r[s++] = a, e = a;
  }
  return r.length = s, r;
}
function Bh(t, e, n, i, r, s, o) {
  const l = (n - e) / i;
  if (l < 3) {
    for (; e < n; e += i)
      s[o++] = t[e], s[o++] = t[e + 1];
    return o;
  }
  const a = new Array(l);
  a[0] = 1, a[l - 1] = 1;
  const u = [e, n - i];
  let c = 0;
  for (; u.length > 0; ) {
    const h = u.pop(), d = u.pop();
    let f = 0;
    const m = t[d], y = t[d + 1], E = t[h], p = t[h + 1];
    for (let g = d + i; g < h; g += i) {
      const _ = t[g], v = t[g + 1], x = W1(_, v, m, y, E, p);
      x > f && (c = g, f = x);
    }
    f > r && (a[(c - e) / i] = 1, d + i < c && u.push(d, c), c + i < h && u.push(c, h));
  }
  for (let h = 0; h < l; ++h)
    a[h] && (s[o++] = t[e + h * i], s[o++] = t[e + h * i + 1]);
  return o;
}
function Mv(t, e, n, i, r, s, o, l) {
  for (let a = 0, u = n.length; a < u; ++a) {
    const c = n[a];
    o = Bh(
      t,
      e,
      c,
      i,
      r,
      s,
      o
    ), l.push(o), e = c;
  }
  return o;
}
function vi(t, e) {
  return e * Math.round(t / e);
}
function Pv(t, e, n, i, r, s, o) {
  if (e == n)
    return o;
  let l = vi(t[e], r), a = vi(t[e + 1], r);
  e += i, s[o++] = l, s[o++] = a;
  let u, c;
  do
    if (u = vi(t[e], r), c = vi(t[e + 1], r), e += i, e == n)
      return s[o++] = u, s[o++] = c, o;
  while (u == l && c == a);
  for (; e < n; ) {
    const h = vi(t[e], r), d = vi(t[e + 1], r);
    if (e += i, h == u && d == c)
      continue;
    const f = u - l, m = c - a, y = h - l, E = d - a;
    if (f * E == m * y && (f < 0 && y < f || f == y || f > 0 && y > f) && (m < 0 && E < m || m == E || m > 0 && E > m)) {
      u = h, c = d;
      continue;
    }
    s[o++] = u, s[o++] = c, l = u, a = c, u = h, c = d;
  }
  return s[o++] = u, s[o++] = c, o;
}
function u_(t, e, n, i, r, s, o, l) {
  for (let a = 0, u = n.length; a < u; ++a) {
    const c = n[a];
    o = Pv(
      t,
      e,
      c,
      i,
      r,
      s,
      o
    ), l.push(o), e = c;
  }
  return o;
}
function _r(t, e, n, i, r) {
  r = r !== void 0 ? r : [];
  let s = 0;
  for (let o = e; o < n; o += i)
    r[s++] = t.slice(o, o + i);
  return r.length = s, r;
}
function jl(t, e, n, i, r) {
  r = r !== void 0 ? r : [];
  let s = 0;
  for (let o = 0, l = n.length; o < l; ++o) {
    const a = n[o];
    r[s++] = _r(
      t,
      e,
      a,
      i,
      r[s]
    ), e = a;
  }
  return r.length = s, r;
}
function Vf(t, e, n, i, r) {
  r = r !== void 0 ? r : [];
  let s = 0;
  for (let o = 0, l = n.length; o < l; ++o) {
    const a = n[o];
    r[s++] = a.length === 1 && a[0] === e ? [] : jl(
      t,
      e,
      a,
      i,
      r[s]
    ), e = a[a.length - 1];
  }
  return r.length = s, r;
}
function c_(t, e, n, i) {
  let r = 0;
  const s = t[n - i], o = t[n - i + 1];
  let l = 0, a = 0;
  for (; e < n; e += i) {
    const u = t[e] - s, c = t[e + 1] - o;
    r += a * u - l * c, l = u, a = c;
  }
  return r / 2;
}
function Av(t, e, n, i) {
  let r = 0;
  for (let s = 0, o = n.length; s < o; ++s) {
    const l = n[s];
    r += c_(t, e, l, i), e = l;
  }
  return r;
}
class Qs extends Uh {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(e, n) {
    super(), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, n !== void 0 && !Array.isArray(e[0]) ? this.setFlatCoordinates(
      n,
      /** @type {Array<number>} */
      e
    ) : this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      e,
      n
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   * @override
   */
  clone() {
    return new Qs(this.flatCoordinates.slice(), this.layout);
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(e, n, i, r) {
    return r < Km(this.getExtent(), e, n) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      o_(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), l_(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !0,
      e,
      n,
      i,
      r
    ));
  }
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return c_(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return _r(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(e) {
    const n = [];
    return n.length = Bh(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      e,
      n,
      0
    ), new Qs(n, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "LinearRing";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(e) {
    return !1;
  }
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(e, n) {
    this.setLayout(n, e, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = a_(
      this.flatCoordinates,
      0,
      e,
      this.stride
    ), this.changed();
  }
}
class Ea extends Uh {
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(e, n) {
    super(), this.setCoordinates(e, n);
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   * @override
   */
  clone() {
    const e = new Ea(this.flatCoordinates.slice(), this.layout);
    return e.applyProperties(this), e;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(e, n, i, r) {
    const s = this.flatCoordinates, o = Rr(
      e,
      n,
      s[0],
      s[1]
    );
    if (o < r) {
      const l = this.stride;
      for (let a = 0; a < l; ++a)
        i[a] = s[a];
      return i.length = l, o;
    }
    return r;
  }
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return this.flatCoordinates.slice();
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(e) {
    return Zm(this.flatCoordinates, e);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Point";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(e) {
    return bm(e, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(e, n) {
    this.setLayout(n, e, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Lv(
      this.flatCoordinates,
      0,
      e,
      this.stride
    ), this.changed();
  }
}
function Dv(t, e, n, i, r) {
  return !$m(
    r,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(o) {
      return !Si(
        t,
        e,
        n,
        i,
        o[0],
        o[1]
      );
    }
  );
}
function Si(t, e, n, i, r, s) {
  let o = 0, l = t[n - i], a = t[n - i + 1];
  for (; e < n; e += i) {
    const u = t[e], c = t[e + 1];
    a <= s ? c > s && (u - l) * (s - a) - (r - l) * (c - a) > 0 && o++ : c <= s && (u - l) * (s - a) - (r - l) * (c - a) < 0 && o--, l = u, a = c;
  }
  return o !== 0;
}
function h_(t, e, n, i, r, s) {
  if (n.length === 0 || !Si(t, e, n[0], i, r, s))
    return !1;
  for (let o = 1, l = n.length; o < l; ++o)
    if (Si(t, n[o - 1], n[o], i, r, s))
      return !1;
  return !0;
}
function Vh(t, e, n, i, r, s, o) {
  let l, a, u, c, h, d, f;
  const m = r[s + 1], y = [];
  for (let g = 0, _ = n.length; g < _; ++g) {
    const v = n[g];
    for (c = t[v - i], d = t[v - i + 1], l = e; l < v; l += i)
      h = t[l], f = t[l + 1], (m <= d && f <= m || d <= m && m <= f) && (u = (m - d) / (f - d) * (h - c) + c, y.push(u)), c = h, d = f;
  }
  let E = NaN, p = -1 / 0;
  for (y.sort(vn), c = y[0], l = 1, a = y.length; l < a; ++l) {
    h = y[l];
    const g = Math.abs(h - c);
    g > p && (u = (c + h) / 2, h_(t, e, n, i, u, m) && (E = u, p = g)), c = h;
  }
  return isNaN(E) && (E = r[s]), o ? (o.push(E, m, p), o) : [E, m, p];
}
function Ov(t, e, n, i, r) {
  let s = [];
  for (let o = 0, l = n.length; o < l; ++o) {
    const a = n[o];
    s = Vh(
      t,
      e,
      a,
      i,
      r,
      2 * o,
      s
    ), e = a[a.length - 1];
  }
  return s;
}
function Fv(t, e, n, i, r) {
  let s;
  for (e += i; e < n; e += i)
    if (s = r(
      t.slice(e - i, e),
      t.slice(e, e + i)
    ), s)
      return s;
  return !1;
}
function d_(t, e, n, i, r) {
  const s = Hm(
    kt(),
    t,
    e,
    n,
    i
  );
  return nt(r, s) ? mr(r, s) || s[0] >= r[0] && s[2] <= r[2] || s[1] >= r[1] && s[3] <= r[3] ? !0 : Fv(
    t,
    e,
    n,
    i,
    /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function(o, l) {
      return nv(r, o, l);
    }
  ) : !1;
}
function f_(t, e, n, i, r) {
  return !!(d_(t, e, n, i, r) || Si(
    t,
    e,
    n,
    i,
    r[0],
    r[1]
  ) || Si(
    t,
    e,
    n,
    i,
    r[0],
    r[3]
  ) || Si(
    t,
    e,
    n,
    i,
    r[2],
    r[1]
  ) || Si(
    t,
    e,
    n,
    i,
    r[2],
    r[3]
  ));
}
function Nv(t, e, n, i, r) {
  if (!f_(t, e, n[0], i, r))
    return !1;
  if (n.length === 1)
    return !0;
  for (let s = 1, o = n.length; s < o; ++s)
    if (Dv(
      t,
      n[s - 1],
      n[s],
      i,
      r
    ) && !d_(
      t,
      n[s - 1],
      n[s],
      i,
      r
    ))
      return !1;
  return !0;
}
function zv(t, e, n, i) {
  for (; e < n - i; ) {
    for (let r = 0; r < i; ++r) {
      const s = t[e + r];
      t[e + r] = t[n - i + r], t[n - i + r] = s;
    }
    e += i, n -= i;
  }
}
function Kh(t, e, n, i) {
  let r = 0, s = t[n - i], o = t[n - i + 1];
  for (; e < n; e += i) {
    const l = t[e], a = t[e + 1];
    r += (l - s) * (a + o), s = l, o = a;
  }
  return r === 0 ? void 0 : r > 0;
}
function Gv(t, e, n, i, r) {
  r = r !== void 0 ? r : !1;
  for (let s = 0, o = n.length; s < o; ++s) {
    const l = n[s], a = Kh(
      t,
      e,
      l,
      i
    );
    if (s === 0) {
      if (r && a || !r && !a)
        return !1;
    } else if (r && !a || !r && a)
      return !1;
    e = l;
  }
  return !0;
}
function Kf(t, e, n, i, r) {
  r = r !== void 0 ? r : !1;
  for (let s = 0, o = n.length; s < o; ++s) {
    const l = n[s], a = Kh(
      t,
      e,
      l,
      i
    );
    (s === 0 ? r && a || !r && !a : r && !a || !r && a) && zv(t, e, l, i), e = l;
  }
  return e;
}
function Wv(t, e) {
  const n = [];
  let i = 0, r = 0, s;
  for (let o = 0, l = e.length; o < l; ++o) {
    const a = e[o], u = Kh(t, i, a, 2);
    if (s === void 0 && (s = u), u === s)
      n.push(e.slice(r, o + 1));
    else {
      if (n.length === 0)
        continue;
      n[n.length - 1].push(e[r]);
    }
    r = o + 1, i = a;
  }
  return n;
}
class Js extends Uh {
  /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
   */
  constructor(e, n, i) {
    super(), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, n !== void 0 && i ? (this.setFlatCoordinates(
      n,
      /** @type {Array<number>} */
      e
    ), this.ends_ = i) : this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      e,
      n
    );
  }
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */
  appendLinearRing(e) {
    this.flatCoordinates ? Lh(this.flatCoordinates, e.getFlatCoordinates()) : this.flatCoordinates = e.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   * @override
   */
  clone() {
    const e = new Js(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return e.applyProperties(this), e;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(e, n, i, r) {
    return r < Km(this.getExtent(), e, n) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Tv(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Iv(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !0,
      e,
      n,
      i,
      r
    ));
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(e, n) {
    return h_(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      e,
      n
    );
  }
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return Av(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   * @override
   */
  getCoordinates(e) {
    let n;
    return e !== void 0 ? (n = this.getOrientedFlatCoordinates().slice(), Kf(n, 0, this.ends_, this.stride, e)) : n = this.flatCoordinates, jl(n, 0, this.ends_, this.stride);
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * @return {Array<number>} Interior point.
   */
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const e = Oi(this.getExtent());
      this.flatInteriorPoint_ = Vh(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        e,
        0
      ), this.flatInteriorPointRevision_ = this.getRevision();
    }
    return (
      /** @type {import("../coordinate.js").Coordinate} */
      this.flatInteriorPoint_
    );
  }
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoint() {
    return new Ea(this.getFlatInteriorPoint(), "XYM");
  }
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */
  getLinearRingCount() {
    return this.ends_.length;
  }
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */
  getLinearRing(e) {
    return e < 0 || this.ends_.length <= e ? null : new Qs(
      this.flatCoordinates.slice(
        e === 0 ? 0 : this.ends_[e - 1],
        this.ends_[e]
      ),
      this.layout
    );
  }
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */
  getLinearRings() {
    const e = this.layout, n = this.flatCoordinates, i = this.ends_, r = [];
    let s = 0;
    for (let o = 0, l = i.length; o < l; ++o) {
      const a = i[o], u = new Qs(
        n.slice(s, a),
        e
      );
      r.push(u), s = a;
    }
    return r;
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const e = this.flatCoordinates;
      Gv(e, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = e : (this.orientedFlatCoordinates_ = e.slice(), this.orientedFlatCoordinates_.length = Kf(
        this.orientedFlatCoordinates_,
        0,
        this.ends_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.orientedFlatCoordinates_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(e) {
    const n = [], i = [];
    return n.length = u_(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(e),
      n,
      0,
      i
    ), new Js(n, "XY", i);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Polygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(e) {
    return Nv(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      e
    );
  }
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(e, n) {
    this.setLayout(n, e, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const i = kv(
      this.flatCoordinates,
      0,
      e,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1], this.changed();
  }
}
function bf(t) {
  if (va(t))
    throw new Error("Cannot create polygon from empty extent");
  const e = t[0], n = t[1], i = t[2], r = t[3], s = [
    e,
    n,
    e,
    r,
    i,
    r,
    i,
    n,
    e,
    n
  ];
  return new Js(s, "XY", [s.length]);
}
const cu = 0;
class $t extends rn {
  /**
   * @param {ViewOptions} [options] View options.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, e = Object.assign({}, e), this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.projection_ = zh(e.projection, "EPSG:3857"), this.viewportSize_ = [100, 100], this.targetCenter_ = null, this.targetResolution_, this.targetRotation_, this.nextCenter_ = null, this.nextResolution_, this.nextRotation_, this.cancelAnchor_ = void 0, e.projection && e_(), e.center && (e.center = hn(e.center, this.projection_)), e.extent && (e.extent = bn(e.extent, this.projection_)), this.applyOptions_(e);
  }
  /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */
  applyOptions_(e) {
    const n = Object.assign({}, e);
    for (const l in At)
      delete n[l];
    this.setProperties(n, !0);
    const i = jv(e);
    this.maxResolution_ = i.maxResolution, this.minResolution_ = i.minResolution, this.zoomFactor_ = i.zoomFactor, this.resolutions_ = e.resolutions, this.padding_ = e.padding, this.minZoom_ = i.minZoom;
    const r = Xv(e), s = i.constraint, o = Yv(e);
    this.constraints_ = {
      center: r,
      resolution: s,
      rotation: o
    }, this.setRotation(e.rotation !== void 0 ? e.rotation : 0), this.setCenterInternal(
      e.center !== void 0 ? e.center : null
    ), e.resolution !== void 0 ? this.setResolution(e.resolution) : e.zoom !== void 0 && this.setZoom(e.zoom);
  }
  /**
   * Padding (in css pixels).
   * If the map viewport is partially covered with other content (overlays) along
   * its edges, this setting allows to shift the center of the viewport away from that
   * content. The order of the values in the array is top, right, bottom, left.
   * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
   * @type {Array<number>|undefined}
   * @api
   */
  get padding() {
    return this.padding_;
  }
  set padding(e) {
    let n = this.padding_;
    this.padding_ = e;
    const i = this.getCenterInternal();
    if (i) {
      const r = e || [0, 0, 0, 0];
      n = n || [0, 0, 0, 0];
      const s = this.getResolution(), o = s / 2 * (r[3] - n[3] + n[1] - r[1]), l = s / 2 * (r[0] - n[0] + n[2] - r[2]);
      this.setCenterInternal([i[0] + o, i[1] - l]);
    }
  }
  /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */
  getUpdatedOptions_(e) {
    const n = this.getProperties();
    return n.resolution !== void 0 ? n.resolution = this.getResolution() : n.zoom = this.getZoom(), n.center = this.getCenterInternal(), n.rotation = this.getRotation(), Object.assign({}, n, e);
  }
  /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */
  animate(e) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
    const n = new Array(arguments.length);
    for (let i = 0; i < n.length; ++i) {
      let r = arguments[i];
      r.center && (r = Object.assign({}, r), r.center = hn(
        r.center,
        this.getProjection()
      )), r.anchor && (r = Object.assign({}, r), r.anchor = hn(
        r.anchor,
        this.getProjection()
      )), n[i] = r;
    }
    this.animateInternal.apply(this, n);
  }
  /**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */
  animateInternal(e) {
    let n = arguments.length, i;
    n > 1 && typeof arguments[n - 1] == "function" && (i = arguments[n - 1], --n);
    let r = 0;
    for (; r < n && !this.isDef(); ++r) {
      const c = arguments[r];
      c.center && this.setCenterInternal(c.center), c.zoom !== void 0 ? this.setZoom(c.zoom) : c.resolution && this.setResolution(c.resolution), c.rotation !== void 0 && this.setRotation(c.rotation);
    }
    if (r === n) {
      i && bo(i, !0);
      return;
    }
    let s = Date.now(), o = this.targetCenter_.slice(), l = this.targetResolution_, a = this.targetRotation_;
    const u = [];
    for (; r < n; ++r) {
      const c = (
        /** @type {AnimationOptions} */
        arguments[r]
      ), h = {
        start: s,
        complete: !1,
        anchor: c.anchor,
        duration: c.duration !== void 0 ? c.duration : 1e3,
        easing: c.easing || mv,
        callback: i
      };
      if (c.center && (h.sourceCenter = o, h.targetCenter = c.center.slice(), o = h.targetCenter), c.zoom !== void 0 ? (h.sourceResolution = l, h.targetResolution = this.getResolutionForZoom(c.zoom), l = h.targetResolution) : c.resolution && (h.sourceResolution = l, h.targetResolution = c.resolution, l = h.targetResolution), c.rotation !== void 0) {
        h.sourceRotation = a;
        const d = Tr(c.rotation - a + Math.PI, 2 * Math.PI) - Math.PI;
        h.targetRotation = a + d, a = h.targetRotation;
      }
      Uv(h) ? h.complete = !0 : s += h.duration, u.push(h);
    }
    this.animations_.push(u), this.setHint(Ye.ANIMATING, 1), this.updateAnimations_();
  }
  /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */
  getAnimating() {
    return this.hints_[Ye.ANIMATING] > 0;
  }
  /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */
  getInteracting() {
    return this.hints_[Ye.INTERACTING] > 0;
  }
  /**
   * Cancel any ongoing animations.
   * @api
   */
  cancelAnimations() {
    this.setHint(Ye.ANIMATING, -this.hints_[Ye.ANIMATING]);
    let e;
    for (let n = 0, i = this.animations_.length; n < i; ++n) {
      const r = this.animations_[n];
      if (r[0].callback && bo(r[0].callback, !1), !e)
        for (let s = 0, o = r.length; s < o; ++s) {
          const l = r[s];
          if (!l.complete) {
            e = l.anchor;
            break;
          }
        }
    }
    this.animations_.length = 0, this.cancelAnchor_ = e, this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
  }
  /**
   * Update all animations.
   */
  updateAnimations_() {
    if (this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), !this.getAnimating())
      return;
    const e = Date.now();
    let n = !1;
    for (let i = this.animations_.length - 1; i >= 0; --i) {
      const r = this.animations_[i];
      let s = !0;
      for (let o = 0, l = r.length; o < l; ++o) {
        const a = r[o];
        if (a.complete)
          continue;
        const u = e - a.start;
        let c = a.duration > 0 ? u / a.duration : 1;
        c >= 1 ? (a.complete = !0, c = 1) : s = !1;
        const h = a.easing(c);
        if (a.sourceCenter) {
          const d = a.sourceCenter[0], f = a.sourceCenter[1], m = a.targetCenter[0], y = a.targetCenter[1];
          this.nextCenter_ = a.targetCenter;
          const E = d + h * (m - d), p = f + h * (y - f);
          this.targetCenter_ = [E, p];
        }
        if (a.sourceResolution && a.targetResolution) {
          const d = h === 1 ? a.targetResolution : a.sourceResolution + h * (a.targetResolution - a.sourceResolution);
          if (a.anchor) {
            const f = this.getViewportSize_(this.getRotation()), m = this.constraints_.resolution(
              d,
              0,
              f,
              !0
            );
            this.targetCenter_ = this.calculateCenterZoom(
              m,
              a.anchor
            );
          }
          this.nextResolution_ = a.targetResolution, this.targetResolution_ = d, this.applyTargetState_(!0);
        }
        if (a.sourceRotation !== void 0 && a.targetRotation !== void 0) {
          const d = h === 1 ? Tr(a.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : a.sourceRotation + h * (a.targetRotation - a.sourceRotation);
          if (a.anchor) {
            const f = this.constraints_.rotation(
              d,
              !0
            );
            this.targetCenter_ = this.calculateCenterRotate(
              f,
              a.anchor
            );
          }
          this.nextRotation_ = a.targetRotation, this.targetRotation_ = d;
        }
        if (this.applyTargetState_(!0), n = !0, !a.complete)
          break;
      }
      if (s) {
        this.animations_[i] = null, this.setHint(Ye.ANIMATING, -1), this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
        const o = r[0].callback;
        o && bo(o, !0);
      }
    }
    this.animations_ = this.animations_.filter(Boolean), n && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(
      this.updateAnimations_.bind(this)
    ));
  }
  /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */
  calculateCenterRotate(e, n) {
    let i;
    const r = this.getCenterInternal();
    return r !== void 0 && (i = [r[0] - n[0], r[1] - n[1]], Fh(i, e - this.getRotation()), iv(i, n)), i;
  }
  /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */
  calculateCenterZoom(e, n) {
    let i;
    const r = this.getCenterInternal(), s = this.getResolution();
    if (r !== void 0 && s !== void 0) {
      const o = n[0] - e * (n[0] - r[0]) / s, l = n[1] - e * (n[1] - r[1]) / s;
      i = [o, l];
    }
    return i;
  }
  /**
   * Returns the current viewport size.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */
  getViewportSize_(e) {
    const n = this.viewportSize_;
    if (e) {
      const i = n[0], r = n[1];
      return [
        Math.abs(i * Math.cos(e)) + Math.abs(r * Math.sin(e)),
        Math.abs(i * Math.sin(e)) + Math.abs(r * Math.cos(e))
      ];
    }
    return n;
  }
  /**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [size] Viewport size; if undefined, [100, 100] is assumed
   */
  setViewportSize(e) {
    this.viewportSize_ = Array.isArray(e) ? e.slice() : [100, 100], this.getAnimating() || this.resolveConstraints(0);
  }
  /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */
  getCenter() {
    const e = this.getCenterInternal();
    return e && Cc(e, this.getProjection());
  }
  /**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */
  getCenterInternal() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(At.CENTER)
    );
  }
  /**
   * @return {Constraints} Constraints.
   */
  getConstraints() {
    return this.constraints_;
  }
  /**
   * @return {boolean} Resolution constraint is set
   */
  getConstrainResolution() {
    return this.get("constrainResolution");
  }
  /**
   * @param {Array<number>} [hints] Destination array.
   * @return {Array<number>} Hint.
   */
  getHints(e) {
    return e !== void 0 ? (e[0] = this.hints_[0], e[1] = this.hints_[1], e) : this.hints_.slice();
  }
  /**
   * Calculate the extent for the current view state and the passed box size.
   * @param {import("./size.js").Size} [size] The pixel dimensions of the box
   * into which the calculated extent should fit. Defaults to the size of the
   * map the view is associated with.
   * If no map or multiple maps are connected to the view, provide the desired
   * box size (e.g. `map.getSize()`).
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */
  calculateExtent(e) {
    const n = this.calculateExtentInternal(e);
    return n_(n, this.getProjection());
  }
  /**
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */
  calculateExtentInternal(e) {
    e = e || this.getViewportSizeMinusPadding_();
    const n = (
      /** @type {!import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    ee(n, "The view center is not defined");
    const i = (
      /** @type {!number} */
      this.getResolution()
    );
    ee(i !== void 0, "The view resolution is not defined");
    const r = (
      /** @type {!number} */
      this.getRotation()
    );
    return ee(r !== void 0, "The view rotation is not defined"), wc(n, i, r, e);
  }
  /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */
  getMaxResolution() {
    return this.maxResolution_;
  }
  /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */
  getMinResolution() {
    return this.minResolution_;
  }
  /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.minResolution_)
    );
  }
  /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */
  setMaxZoom(e) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: e }));
  }
  /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.maxResolution_)
    );
  }
  /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */
  setMinZoom(e) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: e }));
  }
  /**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */
  setConstrainResolution(e) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: e }));
  }
  /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */
  getProjection() {
    return this.projection_;
  }
  /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */
  getResolution() {
    return (
      /** @type {number|undefined} */
      this.get(At.RESOLUTION)
    );
  }
  /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */
  getResolutionForExtent(e, n) {
    return this.getResolutionForExtentInternal(
      bn(e, this.getProjection()),
      n
    );
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */
  getResolutionForExtentInternal(e, n) {
    n = n || this.getViewportSizeMinusPadding_();
    const i = ne(e) / n[0], r = Be(e) / n[1];
    return Math.max(i, r);
  }
  /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Resolution for value function.
   */
  getResolutionForValueFunction(e) {
    e = e || 2;
    const n = this.getConstrainedResolution(this.maxResolution_), i = this.minResolution_, r = Math.log(n / i) / Math.log(e);
    return (
      /**
       * @param {number} value Value.
       * @return {number} Resolution.
       */
      function(s) {
        return n / Math.pow(e, s * r);
      }
    );
  }
  /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */
  getRotation() {
    return (
      /** @type {number} */
      this.get(At.ROTATION)
    );
  }
  /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Value for resolution function.
   */
  getValueForResolutionFunction(e) {
    const n = Math.log(e || 2), i = this.getConstrainedResolution(this.maxResolution_), r = this.minResolution_, s = Math.log(i / r) / n;
    return (
      /**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */
      function(o) {
        return Math.log(i / o) / n / s;
      }
    );
  }
  /**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */
  getViewportSizeMinusPadding_(e) {
    let n = this.getViewportSize_(e);
    const i = this.padding_;
    return i && (n = [
      n[0] - i[1] - i[3],
      n[1] - i[0] - i[2]
    ]), n;
  }
  /**
   * @return {State} View state.
   */
  getState() {
    const e = this.getProjection(), n = this.getResolution(), i = this.getRotation();
    let r = (
      /** @type {import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    const s = this.padding_;
    if (s) {
      const o = this.getViewportSizeMinusPadding_();
      r = hu(
        r,
        this.getViewportSize_(),
        [o[0] / 2 + s[3], o[1] / 2 + s[0]],
        n,
        i
      );
    }
    return {
      center: r.slice(0),
      projection: e !== void 0 ? e : null,
      resolution: n,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: i,
      zoom: this.getZoom()
    };
  }
  /**
   * @return {ViewStateLayerStateExtent} Like `FrameState`, but just `viewState` and `extent`.
   */
  getViewStateAndExtent() {
    return {
      viewState: this.getState(),
      extent: this.calculateExtent()
    };
  }
  /**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */
  getZoom() {
    let e;
    const n = this.getResolution();
    return n !== void 0 && (e = this.getZoomForResolution(n)), e;
  }
  /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */
  getZoomForResolution(e) {
    let n = this.minZoom_ || 0, i, r;
    if (this.resolutions_) {
      const s = Ih(this.resolutions_, e, 1);
      n = s, i = this.resolutions_[s], s == this.resolutions_.length - 1 ? r = 2 : r = i / this.resolutions_[s + 1];
    } else
      i = this.maxResolution_, r = this.zoomFactor_;
    return n + Math.log(i / e) / Math.log(r);
  }
  /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */
  getResolutionForZoom(e) {
    var n;
    if ((n = this.resolutions_) != null && n.length) {
      if (this.resolutions_.length === 1)
        return this.resolutions_[0];
      const i = Ee(
        Math.floor(e),
        0,
        this.resolutions_.length - 2
      ), r = this.resolutions_[i] / this.resolutions_[i + 1];
      return this.resolutions_[i] / Math.pow(r, Ee(e - i, 0, 1));
    }
    return this.maxResolution_ / Math.pow(this.zoomFactor_, e - this.minZoom_);
  }
  /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [options] Options.
   * @api
   */
  fit(e, n) {
    let i;
    if (ee(
      Array.isArray(e) || typeof /** @type {?} */
      e.getSimplifiedGeometry == "function",
      "Invalid extent or geometry provided as `geometry`"
    ), Array.isArray(e)) {
      ee(
        !va(e),
        "Cannot fit empty extent provided as `geometry`"
      );
      const r = bn(e, this.getProjection());
      i = bf(r);
    } else if (e.getType() === "Circle") {
      const r = bn(
        e.getExtent(),
        this.getProjection()
      );
      i = bf(r), i.rotate(this.getRotation(), Oi(r));
    } else
      i = e;
    this.fitInternal(i, n);
  }
  /**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */
  rotatedExtentForGeometry(e) {
    const n = this.getRotation(), i = Math.cos(n), r = Math.sin(-n), s = e.getFlatCoordinates(), o = e.getStride();
    let l = 1 / 0, a = 1 / 0, u = -1 / 0, c = -1 / 0;
    for (let h = 0, d = s.length; h < d; h += o) {
      const f = s[h] * i - s[h + 1] * r, m = s[h] * r + s[h + 1] * i;
      l = Math.min(l, f), a = Math.min(a, m), u = Math.max(u, f), c = Math.max(c, m);
    }
    return [l, a, u, c];
  }
  /**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [options] Options.
   */
  fitInternal(e, n) {
    n = n || {};
    let i = n.size;
    i || (i = this.getViewportSizeMinusPadding_());
    const r = n.padding !== void 0 ? n.padding : [0, 0, 0, 0], s = n.nearest !== void 0 ? n.nearest : !1;
    let o;
    n.minResolution !== void 0 ? o = n.minResolution : n.maxZoom !== void 0 ? o = this.getResolutionForZoom(n.maxZoom) : o = 0;
    const l = this.rotatedExtentForGeometry(e);
    let a = this.getResolutionForExtentInternal(l, [
      i[0] - r[1] - r[3],
      i[1] - r[0] - r[2]
    ]);
    a = isNaN(a) ? o : Math.max(a, o), a = this.getConstrainedResolution(a, s ? 0 : 1);
    const u = this.getRotation(), c = Math.sin(u), h = Math.cos(u), d = Oi(l);
    d[0] += (r[1] - r[3]) / 2 * a, d[1] += (r[0] - r[2]) / 2 * a;
    const f = d[0] * h - d[1] * c, m = d[1] * h + d[0] * c, y = this.getConstrainedCenter([f, m], a), E = n.callback ? n.callback : Nr;
    n.duration !== void 0 ? this.animateInternal(
      {
        resolution: a,
        center: y,
        duration: n.duration,
        easing: n.easing
      },
      E
    ) : (this.targetResolution_ = a, this.targetCenter_ = y, this.applyTargetState_(!1, !0), bo(E, !0));
  }
  /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */
  centerOn(e, n, i) {
    this.centerOnInternal(
      hn(e, this.getProjection()),
      n,
      i
    );
  }
  /**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */
  centerOnInternal(e, n, i) {
    this.setCenterInternal(
      hu(
        e,
        n,
        i,
        this.getResolution(),
        this.getRotation()
      )
    );
  }
  /**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */
  calculateCenterShift(e, n, i, r) {
    let s;
    const o = this.padding_;
    if (o && e) {
      const l = this.getViewportSizeMinusPadding_(-i), a = hu(
        e,
        r,
        [l[0] / 2 + o[3], l[1] / 2 + o[0]],
        n,
        i
      );
      s = [
        e[0] - a[0],
        e[1] - a[1]
      ];
    }
    return s;
  }
  /**
   * @return {boolean} Is defined.
   */
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */
  adjustCenter(e) {
    const n = Cc(this.targetCenter_, this.getProjection());
    this.setCenter([
      n[0] + e[0],
      n[1] + e[1]
    ]);
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */
  adjustCenterInternal(e) {
    const n = this.targetCenter_;
    this.setCenterInternal([
      n[0] + e[0],
      n[1] + e[1]
    ]);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustResolution(e, n) {
    n = n && hn(n, this.getProjection()), this.adjustResolutionInternal(e, n);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  adjustResolutionInternal(e, n) {
    const i = this.getAnimating() || this.getInteracting(), r = this.getViewportSize_(this.getRotation()), s = this.constraints_.resolution(
      this.targetResolution_ * e,
      0,
      r,
      i
    );
    n && (this.targetCenter_ = this.calculateCenterZoom(s, n)), this.targetResolution_ *= e, this.applyTargetState_();
  }
  /**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustZoom(e, n) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -e), n);
  }
  /**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   * @api
   */
  adjustRotation(e, n) {
    n && (n = hn(n, this.getProjection())), this.adjustRotationInternal(e, n);
  }
  /**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   */
  adjustRotationInternal(e, n) {
    const i = this.getAnimating() || this.getInteracting(), r = this.constraints_.rotation(
      this.targetRotation_ + e,
      i
    );
    n && (this.targetCenter_ = this.calculateCenterRotate(r, n)), this.targetRotation_ += e, this.applyTargetState_();
  }
  /**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */
  setCenter(e) {
    this.setCenterInternal(
      e && hn(e, this.getProjection())
    );
  }
  /**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */
  setCenterInternal(e) {
    this.targetCenter_ = e, this.applyTargetState_();
  }
  /**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */
  setHint(e, n) {
    return this.hints_[e] += n, this.changed(), this.hints_[e];
  }
  /**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */
  setResolution(e) {
    this.targetResolution_ = e, this.applyTargetState_();
  }
  /**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */
  setRotation(e) {
    this.targetRotation_ = e, this.applyTargetState_();
  }
  /**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */
  setZoom(e) {
    this.setResolution(this.getResolutionForZoom(e));
  }
  /**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [forceMoving] Apply constraints as if the view is moving.
   * @private
   */
  applyTargetState_(e, n) {
    const i = this.getAnimating() || this.getInteracting() || n, r = this.constraints_.rotation(
      this.targetRotation_,
      i
    ), s = this.getViewportSize_(r), o = this.constraints_.resolution(
      this.targetResolution_,
      0,
      s,
      i
    ), l = this.constraints_.center(
      this.targetCenter_,
      o,
      s,
      i,
      this.calculateCenterShift(
        this.targetCenter_,
        o,
        r,
        s
      )
    );
    this.get(At.ROTATION) !== r && this.set(At.ROTATION, r), this.get(At.RESOLUTION) !== o && (this.set(At.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)), (!l || !this.get(At.CENTER) || !Wl(this.get(At.CENTER), l)) && this.set(At.CENTER, l), this.getAnimating() && !e && this.cancelAnimations(), this.cancelAnchor_ = void 0;
  }
  /**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [duration] The animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  resolveConstraints(e, n, i) {
    e = e !== void 0 ? e : 200;
    const r = n || 0, s = this.constraints_.rotation(this.targetRotation_), o = this.getViewportSize_(s), l = this.constraints_.resolution(
      this.targetResolution_,
      r,
      o
    ), a = this.constraints_.center(
      this.targetCenter_,
      l,
      o,
      !1,
      this.calculateCenterShift(
        this.targetCenter_,
        l,
        s,
        o
      )
    );
    if (e === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = l, this.targetRotation_ = s, this.targetCenter_ = a, this.applyTargetState_();
      return;
    }
    i = i || (e === 0 ? this.cancelAnchor_ : void 0), this.cancelAnchor_ = void 0, (this.getResolution() !== l || this.getRotation() !== s || !this.getCenterInternal() || !Wl(this.getCenterInternal(), a)) && (this.getAnimating() && this.cancelAnimations(), this.animateInternal({
      rotation: s,
      center: a,
      resolution: l,
      duration: e,
      easing: Vr,
      anchor: i
    }));
  }
  /**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(Ye.INTERACTING, 1);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  endInteraction(e, n, i) {
    i = i && hn(i, this.getProjection()), this.endInteractionInternal(e, n, i);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  endInteractionInternal(e, n, i) {
    this.getInteracting() && (this.setHint(Ye.INTERACTING, -1), this.resolveConstraints(e, n, i));
  }
  /**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */
  getConstrainedCenter(e, n) {
    const i = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(
      e,
      n || this.getResolution(),
      i
    );
  }
  /**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */
  getConstrainedZoom(e, n) {
    const i = this.getResolutionForZoom(e);
    return this.getZoomForResolution(
      this.getConstrainedResolution(i, n)
    );
  }
  /**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */
  getConstrainedResolution(e, n) {
    n = n || 0;
    const i = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(e, n, i);
  }
}
function bo(t, e) {
  setTimeout(function() {
    t(e);
  }, 0);
}
function Xv(t) {
  if (t.extent !== void 0) {
    const n = t.smoothExtentConstraint !== void 0 ? t.smoothExtentConstraint : !0;
    return Gf(t.extent, t.constrainOnlyCenter, n);
  }
  const e = zh(t.projection, "EPSG:3857");
  if (t.multiWorld !== !0 && e.isGlobal()) {
    const n = e.getExtent().slice();
    return n[0] = -1 / 0, n[2] = 1 / 0, Gf(n, !1, !1);
  }
  return hv;
}
function jv(t) {
  let e, n, i, o = t.minZoom !== void 0 ? t.minZoom : cu, l = t.maxZoom !== void 0 ? t.maxZoom : 28;
  const a = t.zoomFactor !== void 0 ? t.zoomFactor : 2, u = t.multiWorld !== void 0 ? t.multiWorld : !1, c = t.smoothResolutionConstraint !== void 0 ? t.smoothResolutionConstraint : !0, h = t.showFullExtent !== void 0 ? t.showFullExtent : !1, d = zh(t.projection, "EPSG:3857"), f = d.getExtent();
  let m = t.constrainOnlyCenter, y = t.extent;
  if (!u && !y && d.isGlobal() && (m = !1, y = f), t.resolutions !== void 0) {
    const E = t.resolutions;
    n = E[o], i = E[l] !== void 0 ? E[l] : E[E.length - 1], t.constrainResolution ? e = dv(
      E,
      c,
      !m && y,
      h
    ) : e = Wf(
      n,
      i,
      c,
      !m && y,
      h
    );
  } else {
    const p = (f ? Math.max(ne(f), Be(f)) : (
      // use an extent that can fit the whole world if need be
      360 * Ph.degrees / d.getMetersPerUnit()
    )) / Mh / Math.pow(2, cu), g = p / Math.pow(2, 28 - cu);
    n = t.maxResolution, n !== void 0 ? o = 0 : n = p / Math.pow(a, o), i = t.minResolution, i === void 0 && (t.maxZoom !== void 0 ? t.maxResolution !== void 0 ? i = n / Math.pow(a, l) : i = p / Math.pow(a, l) : i = g), l = o + Math.floor(
      Math.log(n / i) / Math.log(a)
    ), i = n / Math.pow(a, l - o), t.constrainResolution ? e = fv(
      a,
      n,
      i,
      c,
      !m && y,
      h
    ) : e = Wf(
      n,
      i,
      c,
      !m && y,
      h
    );
  }
  return {
    constraint: e,
    maxResolution: n,
    minResolution: i,
    minZoom: o,
    zoomFactor: a
  };
}
function Yv(t) {
  if (t.enableRotation !== void 0 ? t.enableRotation : !0) {
    const n = t.constrainRotation;
    return n === void 0 || n === !0 ? pv() : n === !1 ? Xf : typeof n == "number" ? gv(n) : Xf;
  }
  return Yh;
}
function Uv(t) {
  return !(t.sourceCenter && t.targetCenter && !Wl(t.sourceCenter, t.targetCenter) || t.sourceResolution !== t.targetResolution || t.sourceRotation !== t.targetRotation);
}
function hu(t, e, n, i, r) {
  const s = Math.cos(-r);
  let o = Math.sin(-r), l = t[0] * s - t[1] * o, a = t[1] * s + t[0] * o;
  l += (e[0] / 2 - n[0]) * i, a += (n[1] - e[1] / 2) * i, o = -o;
  const u = l * s - a * o, c = a * s + l * o;
  return [u, c];
}
class xa extends Um {
  /**
   * @param {Options<SourceType>} options Layer options.
   */
  constructor(e) {
    const n = Object.assign({}, e);
    delete n.source, super(n), this.on, this.once, this.un, this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, this.renderer_ = null, this.sourceReady_ = !1, this.rendered = !1, e.render && (this.render = e.render), e.map && this.setMap(e.map), this.addChangeListener(
      re.SOURCE,
      this.handleSourcePropertyChange_
    );
    const i = e.source ? (
      /** @type {SourceType} */
      e.source
    ) : null;
    this.setSource(i);
  }
  /**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   * @override
   */
  getLayersArray(e) {
    return e = e || [], e.push(this), e;
  }
  /**
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   * @override
   */
  getLayerStatesArray(e) {
    return e = e || [], e.push(this.getLayerState()), e;
  }
  /**
   * Get the layer source.
   * @return {SourceType|null} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */
  getSource() {
    return (
      /** @type {SourceType} */
      this.get(re.SOURCE) || null
    );
  }
  /**
   * @return {SourceType|null} The source being rendered.
   */
  getRenderSource() {
    return this.getSource();
  }
  /**
   * @return {import("../source/Source.js").State} Source state.
   * @override
   */
  getSourceState() {
    const e = this.getSource();
    return e ? e.getState() : "undefined";
  }
  /**
   * @private
   */
  handleSourceChange_() {
    this.changed(), !(this.sourceReady_ || this.getSource().getState() !== "ready") && (this.sourceReady_ = !0, this.dispatchEvent("sourceready"));
  }
  /**
   * @private
   */
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ && (le(this.sourceChangeKey_), this.sourceChangeKey_ = null), this.sourceReady_ = !1;
    const e = this.getSource();
    e && (this.sourceChangeKey_ = q(
      e,
      V.CHANGE,
      this.handleSourceChange_,
      this
    ), e.getState() === "ready" && (this.sourceReady_ = !0, setTimeout(() => {
      this.dispatchEvent("sourceready");
    }, 0))), this.changed();
  }
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */
  getFeatures(e) {
    return this.renderer_ ? this.renderer_.getFeatures(e) : Promise.resolve([]);
  }
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */
  getData(e) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(e);
  }
  /**
   * The layer is visible on the map view, i.e. within its min/max resolution or zoom and
   * extent, not set to `visible: false`, and not inside a layer group that is set
   * to `visible: false`.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {boolean} The layer is visible in the map view.
   * @api
   */
  isVisible(e) {
    let n;
    const i = this.getMapInternal();
    !e && i && (e = i.getView()), e instanceof $t ? n = {
      viewState: e.getState(),
      extent: e.calculateExtent()
    } : n = e, !n.layerStatesArray && i && (n.layerStatesArray = i.getLayerGroup().getLayerStatesArray());
    let r;
    n.layerStatesArray ? r = n.layerStatesArray.find(
      (o) => o.layer === this
    ) : r = this.getLayerState();
    const s = this.getExtent();
    return bh(r, n.viewState) && (!s || nt(s, n.extent));
  }
  /**
   * Get the attributions of the source of this layer for the given view.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {Array<string>} Attributions for this layer at the given view.
   * @api
   */
  getAttributions(e) {
    var s;
    if (!this.isVisible(e))
      return [];
    const n = (s = this.getSource()) == null ? void 0 : s.getAttributions();
    if (!n)
      return [];
    const i = e instanceof $t ? e.getViewStateAndExtent() : e;
    let r = n(i);
    return Array.isArray(r) || (r = [r]), r;
  }
  /**
   * In charge to manage the rendering of the layer. One layer type is
   * bounded with one layer renderer.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement|null} The rendered element.
   */
  render(e, n) {
    const i = this.getRenderer();
    return i.prepareFrame(e) ? (this.rendered = !0, i.renderFrame(e, n)) : null;
  }
  /**
   * Called when a layer is not visible during a map render.
   */
  unrender() {
    this.rendered = !1;
  }
  /** @return {string} Declutter */
  getDeclutter() {
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {import("../layer/Layer.js").State} layerState Layer state.
   */
  renderDeclutter(e, n) {
  }
  /**
   * When the renderer follows a layout -> render approach, do the final rendering here.
   * @param {import('../Map.js').FrameState} frameState Frame state
   */
  renderDeferred(e) {
    const n = this.getRenderer();
    n && n.renderDeferred(e);
  }
  /**
   * For use inside the library only.
   * @param {import("../Map.js").default|null} map Map.
   */
  setMapInternal(e) {
    e || this.unrender(), this.set(re.MAP, e);
  }
  /**
   * For use inside the library only.
   * @return {import("../Map.js").default|null} Map.
   */
  getMapInternal() {
    return this.get(re.MAP);
  }
  /**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map~Map#addLayer} instead.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */
  setMap(e) {
    this.mapPrecomposeKey_ && (le(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), e || this.changed(), this.mapRenderKey_ && (le(this.mapRenderKey_), this.mapRenderKey_ = null), e && (this.mapPrecomposeKey_ = q(
      e,
      Rt.PRECOMPOSE,
      this.handlePrecompose_,
      this
    ), this.mapRenderKey_ = q(this, V.CHANGE, e.render, e), this.changed());
  }
  /**
   * @param {import("../events/Event.js").default} renderEvent Render event
   * @private
   */
  handlePrecompose_(e) {
    const n = (
      /** @type {import("../render/Event.js").default} */
      e.frameState.layerStatesArray
    ), i = this.getLayerState(!1);
    ee(
      !n.some(
        (r) => r.layer === i.layer
      ),
      "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both."
    ), n.push(i);
  }
  /**
   * Set the layer source.
   * @param {SourceType|null} source The layer source.
   * @observable
   * @api
   */
  setSource(e) {
    this.set(re.SOURCE, e);
  }
  /**
   * Get the renderer for this layer.
   * @return {RendererType|null} The layer renderer.
   */
  getRenderer() {
    return this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_;
  }
  /**
   * @return {boolean} The layer has a renderer.
   */
  hasRenderer() {
    return !!this.renderer_;
  }
  /**
   * Create a renderer for this layer.
   * @return {RendererType} A layer renderer.
   * @protected
   */
  createRenderer() {
    return null;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.renderer_ && (this.renderer_.dispose(), delete this.renderer_), this.setSource(null), super.disposeInternal();
  }
}
function bh(t, e) {
  if (!t.visible)
    return !1;
  const n = e.resolution;
  if (n < t.minResolution || n >= t.maxResolution)
    return !1;
  const i = e.zoom;
  return i > t.minZoom && i <= t.maxZoom;
}
function g_(t, e, n = 0, i = t.length - 1, r = Bv) {
  for (; i > n; ) {
    if (i - n > 600) {
      const a = i - n + 1, u = e - n + 1, c = Math.log(a), h = 0.5 * Math.exp(2 * c / 3), d = 0.5 * Math.sqrt(c * h * (a - h) / a) * (u - a / 2 < 0 ? -1 : 1), f = Math.max(n, Math.floor(e - u * h / a + d)), m = Math.min(i, Math.floor(e + (a - u) * h / a + d));
      g_(t, e, f, m, r);
    }
    const s = t[e];
    let o = n, l = i;
    for (as(t, n, e), r(t[i], s) > 0 && as(t, n, i); o < l; ) {
      for (as(t, o, l), o++, l--; r(t[o], s) < 0; ) o++;
      for (; r(t[l], s) > 0; ) l--;
    }
    r(t[n], s) === 0 ? as(t, n, l) : (l++, as(t, l, i)), l <= e && (n = l + 1), e <= l && (i = l - 1);
  }
}
function as(t, e, n) {
  const i = t[e];
  t[e] = t[n], t[n] = i;
}
function Bv(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
let p_ = class {
  constructor(e = 9) {
    this._maxEntries = Math.max(4, e), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(e) {
    let n = this.data;
    const i = [];
    if (!Ho(e, n)) return i;
    const r = this.toBBox, s = [];
    for (; n; ) {
      for (let o = 0; o < n.children.length; o++) {
        const l = n.children[o], a = n.leaf ? r(l) : l;
        Ho(e, a) && (n.leaf ? i.push(l) : fu(e, a) ? this._all(l, i) : s.push(l));
      }
      n = s.pop();
    }
    return i;
  }
  collides(e) {
    let n = this.data;
    if (!Ho(e, n)) return !1;
    const i = [];
    for (; n; ) {
      for (let r = 0; r < n.children.length; r++) {
        const s = n.children[r], o = n.leaf ? this.toBBox(s) : s;
        if (Ho(e, o)) {
          if (n.leaf || fu(e, o)) return !0;
          i.push(s);
        }
      }
      n = i.pop();
    }
    return !1;
  }
  load(e) {
    if (!(e && e.length)) return this;
    if (e.length < this._minEntries) {
      for (let i = 0; i < e.length; i++)
        this.insert(e[i]);
      return this;
    }
    let n = this._build(e.slice(), 0, e.length - 1, 0);
    if (!this.data.children.length)
      this.data = n;
    else if (this.data.height === n.height)
      this._splitRoot(this.data, n);
    else {
      if (this.data.height < n.height) {
        const i = this.data;
        this.data = n, n = i;
      }
      this._insert(n, this.data.height - n.height - 1, !0);
    }
    return this;
  }
  insert(e) {
    return e && this._insert(e, this.data.height - 1), this;
  }
  clear() {
    return this.data = Ji([]), this;
  }
  remove(e, n) {
    if (!e) return this;
    let i = this.data;
    const r = this.toBBox(e), s = [], o = [];
    let l, a, u;
    for (; i || s.length; ) {
      if (i || (i = s.pop(), a = s[s.length - 1], l = o.pop(), u = !0), i.leaf) {
        const c = Vv(e, i.children, n);
        if (c !== -1)
          return i.children.splice(c, 1), s.push(i), this._condense(s), this;
      }
      !u && !i.leaf && fu(i, r) ? (s.push(i), o.push(l), l = 0, a = i, i = i.children[0]) : a ? (l++, i = a.children[l], u = !1) : i = null;
    }
    return this;
  }
  toBBox(e) {
    return e;
  }
  compareMinX(e, n) {
    return e.minX - n.minX;
  }
  compareMinY(e, n) {
    return e.minY - n.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(e) {
    return this.data = e, this;
  }
  _all(e, n) {
    const i = [];
    for (; e; )
      e.leaf ? n.push(...e.children) : i.push(...e.children), e = i.pop();
    return n;
  }
  _build(e, n, i, r) {
    const s = i - n + 1;
    let o = this._maxEntries, l;
    if (s <= o)
      return l = Ji(e.slice(n, i + 1)), Ki(l, this.toBBox), l;
    r || (r = Math.ceil(Math.log(s) / Math.log(o)), o = Math.ceil(s / Math.pow(o, r - 1))), l = Ji([]), l.leaf = !1, l.height = r;
    const a = Math.ceil(s / o), u = a * Math.ceil(Math.sqrt(o));
    Zf(e, n, i, u, this.compareMinX);
    for (let c = n; c <= i; c += u) {
      const h = Math.min(c + u - 1, i);
      Zf(e, c, h, a, this.compareMinY);
      for (let d = c; d <= h; d += a) {
        const f = Math.min(d + a - 1, h);
        l.children.push(this._build(e, d, f, r - 1));
      }
    }
    return Ki(l, this.toBBox), l;
  }
  _chooseSubtree(e, n, i, r) {
    for (; r.push(n), !(n.leaf || r.length - 1 === i); ) {
      let s = 1 / 0, o = 1 / 0, l;
      for (let a = 0; a < n.children.length; a++) {
        const u = n.children[a], c = du(u), h = Zv(e, u) - c;
        h < o ? (o = h, s = c < s ? c : s, l = u) : h === o && c < s && (s = c, l = u);
      }
      n = l || n.children[0];
    }
    return n;
  }
  _insert(e, n, i) {
    const r = i ? e : this.toBBox(e), s = [], o = this._chooseSubtree(r, this.data, n, s);
    for (o.children.push(e), _s(o, r); n >= 0 && s[n].children.length > this._maxEntries; )
      this._split(s, n), n--;
    this._adjustParentBBoxes(r, s, n);
  }
  // split overflowed node into two
  _split(e, n) {
    const i = e[n], r = i.children.length, s = this._minEntries;
    this._chooseSplitAxis(i, s, r);
    const o = this._chooseSplitIndex(i, s, r), l = Ji(i.children.splice(o, i.children.length - o));
    l.height = i.height, l.leaf = i.leaf, Ki(i, this.toBBox), Ki(l, this.toBBox), n ? e[n - 1].children.push(l) : this._splitRoot(i, l);
  }
  _splitRoot(e, n) {
    this.data = Ji([e, n]), this.data.height = e.height + 1, this.data.leaf = !1, Ki(this.data, this.toBBox);
  }
  _chooseSplitIndex(e, n, i) {
    let r, s = 1 / 0, o = 1 / 0;
    for (let l = n; l <= i - n; l++) {
      const a = ms(e, 0, l, this.toBBox), u = ms(e, l, i, this.toBBox), c = Hv(a, u), h = du(a) + du(u);
      c < s ? (s = c, r = l, o = h < o ? h : o) : c === s && h < o && (o = h, r = l);
    }
    return r || i - n;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(e, n, i) {
    const r = e.leaf ? this.compareMinX : Kv, s = e.leaf ? this.compareMinY : bv, o = this._allDistMargin(e, n, i, r), l = this._allDistMargin(e, n, i, s);
    o < l && e.children.sort(r);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(e, n, i, r) {
    e.children.sort(r);
    const s = this.toBBox, o = ms(e, 0, n, s), l = ms(e, i - n, i, s);
    let a = Zo(o) + Zo(l);
    for (let u = n; u < i - n; u++) {
      const c = e.children[u];
      _s(o, e.leaf ? s(c) : c), a += Zo(o);
    }
    for (let u = i - n - 1; u >= n; u--) {
      const c = e.children[u];
      _s(l, e.leaf ? s(c) : c), a += Zo(l);
    }
    return a;
  }
  _adjustParentBBoxes(e, n, i) {
    for (let r = i; r >= 0; r--)
      _s(n[r], e);
  }
  _condense(e) {
    for (let n = e.length - 1, i; n >= 0; n--)
      e[n].children.length === 0 ? n > 0 ? (i = e[n - 1].children, i.splice(i.indexOf(e[n]), 1)) : this.clear() : Ki(e[n], this.toBBox);
  }
};
function Vv(t, e, n) {
  if (!n) return e.indexOf(t);
  for (let i = 0; i < e.length; i++)
    if (n(t, e[i])) return i;
  return -1;
}
function Ki(t, e) {
  ms(t, 0, t.children.length, e, t);
}
function ms(t, e, n, i, r) {
  r || (r = Ji(null)), r.minX = 1 / 0, r.minY = 1 / 0, r.maxX = -1 / 0, r.maxY = -1 / 0;
  for (let s = e; s < n; s++) {
    const o = t.children[s];
    _s(r, t.leaf ? i(o) : o);
  }
  return r;
}
function _s(t, e) {
  return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t;
}
function Kv(t, e) {
  return t.minX - e.minX;
}
function bv(t, e) {
  return t.minY - e.minY;
}
function du(t) {
  return (t.maxX - t.minX) * (t.maxY - t.minY);
}
function Zo(t) {
  return t.maxX - t.minX + (t.maxY - t.minY);
}
function Zv(t, e) {
  return (Math.max(e.maxX, t.maxX) - Math.min(e.minX, t.minX)) * (Math.max(e.maxY, t.maxY) - Math.min(e.minY, t.minY));
}
function Hv(t, e) {
  const n = Math.max(t.minX, e.minX), i = Math.max(t.minY, e.minY), r = Math.min(t.maxX, e.maxX), s = Math.min(t.maxY, e.maxY);
  return Math.max(0, r - n) * Math.max(0, s - i);
}
function fu(t, e) {
  return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY;
}
function Ho(t, e) {
  return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY;
}
function Ji(t) {
  return {
    children: t,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function Zf(t, e, n, i, r) {
  const s = [e, n];
  for (; s.length; ) {
    if (n = s.pop(), e = s.pop(), n - e <= i) continue;
    const o = e + Math.ceil((n - e) / i / 2) * i;
    g_(t, o, e, n, r), s.push(e, o, o, n);
  }
}
const Z = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};
function Hf(t) {
  return t[0] > 0 && t[1] > 0;
}
function $v(t, e, n) {
  return n === void 0 && (n = [0, 0]), n[0] = t[0] * e + 0.5 | 0, n[1] = t[1] * e + 0.5 | 0, n;
}
function st(t, e) {
  return Array.isArray(t) ? t : (e === void 0 ? e = [t, t] : (e[0] = t, e[1] = t), e);
}
class wa {
  /**
   * @param {Options} options Options.
   */
  constructor(e) {
    this.opacity_ = e.opacity, this.rotateWithView_ = e.rotateWithView, this.rotation_ = e.rotation, this.scale_ = e.scale, this.scaleArray_ = st(e.scale), this.displacement_ = e.displacement, this.declutterMode_ = e.declutterMode;
  }
  /**
   * Clones the style.
   * @return {ImageStyle} The cloned style.
   * @api
   */
  clone() {
    const e = this.getScale();
    return new wa({
      opacity: this.getOpacity(),
      scale: Array.isArray(e) ? e.slice() : e,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the symbolizer opacity.
   * @return {number} Opacity.
   * @api
   */
  getOpacity() {
    return this.opacity_;
  }
  /**
   * Determine whether the symbolizer rotates with the map.
   * @return {boolean} Rotate with map.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Get the symoblizer rotation.
   * @return {number} Rotation.
   * @api
   */
  getRotation() {
    return this.rotation_;
  }
  /**
   * Get the symbolizer scale.
   * @return {number|import("../size.js").Size} Scale.
   * @api
   */
  getScale() {
    return this.scale_;
  }
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */
  getScaleArray() {
    return this.scaleArray_;
  }
  /**
   * Get the displacement of the shape
   * @return {Array<number>} Shape's center displacement
   * @api
   */
  getDisplacement() {
    return this.displacement_;
  }
  /**
   * Get the declutter mode of the shape
   * @return {import("./Style.js").DeclutterMode} Shape's declutter mode
   * @api
   */
  getDeclutterMode() {
    return this.declutterMode_;
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @abstract
   * @return {Array<number>} Anchor.
   */
  getAnchor() {
    return J();
  }
  /**
   * Get the image element for the symbolizer.
   * @abstract
   * @param {number} pixelRatio Pixel ratio.
   * @return {import('../DataTile.js').ImageLike} Image element.
   */
  getImage(e) {
    return J();
  }
  /**
   * @abstract
   * @return {import('../DataTile.js').ImageLike} Image element.
   */
  getHitDetectionImage() {
    return J();
  }
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */
  getPixelRatio(e) {
    return 1;
  }
  /**
   * @abstract
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return J();
  }
  /**
   * @abstract
   * @return {import("../size.js").Size} Image size.
   */
  getImageSize() {
    return J();
  }
  /**
   * Get the origin of the symbolizer.
   * @abstract
   * @return {Array<number>} Origin.
   */
  getOrigin() {
    return J();
  }
  /**
   * Get the size of the symbolizer (in pixels).
   * @abstract
   * @return {import("../size.js").Size} Size.
   */
  getSize() {
    return J();
  }
  /**
   * Set the displacement.
   *
   * @param {Array<number>} displacement Displacement.
   * @api
   */
  setDisplacement(e) {
    this.displacement_ = e;
  }
  /**
   * Set the opacity.
   *
   * @param {number} opacity Opacity.
   * @api
   */
  setOpacity(e) {
    this.opacity_ = e;
  }
  /**
   * Set whether to rotate the style with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */
  setRotateWithView(e) {
    this.rotateWithView_ = e;
  }
  /**
   * Set the rotation.
   *
   * @param {number} rotation Rotation.
   * @api
   */
  setRotation(e) {
    this.rotation_ = e;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */
  setScale(e) {
    this.scale_ = e, this.scaleArray_ = st(e);
  }
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  listenImageChange(e) {
    J();
  }
  /**
   * Load not yet loaded URI.
   * @abstract
   */
  load() {
    J();
  }
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  unlistenImageChange(e) {
    J();
  }
  /**
   * @return {Promise<void>} `false` or Promise that resolves when the style is ready to use.
   */
  ready() {
    return Promise.resolve();
  }
}
const eo = {
  name: "rgb",
  min: [0, 0, 0],
  max: [255, 255, 255],
  channel: ["red", "green", "blue"],
  alias: ["RGB"]
};
var Fe = {
  name: "xyz",
  min: [0, 0, 0],
  channel: ["X", "Y", "Z"],
  alias: ["XYZ", "ciexyz", "cie1931"]
};
Fe.whitepoint = {
  //1931 2°
  2: {
    //incadescent
    A: [109.85, 100, 35.585],
    // B:[],
    C: [98.074, 100, 118.232],
    D50: [96.422, 100, 82.521],
    D55: [95.682, 100, 92.149],
    //daylight
    D65: [95.045592705167, 100, 108.9057750759878],
    D75: [94.972, 100, 122.638],
    //flourescent
    // F1: [],
    F2: [99.187, 100, 67.395],
    // F3: [],
    // F4: [],
    // F5: [],
    // F6:[],
    F7: [95.044, 100, 108.755],
    // F8: [],
    // F9: [],
    // F10: [],
    F11: [100.966, 100, 64.37],
    // F12: [],
    E: [100, 100, 100]
  },
  //1964  10°
  10: {
    //incadescent
    A: [111.144, 100, 35.2],
    C: [97.285, 100, 116.145],
    D50: [96.72, 100, 81.427],
    D55: [95.799, 100, 90.926],
    //daylight
    D65: [94.811, 100, 107.304],
    D75: [94.416, 100, 120.641],
    //flourescent
    F2: [103.28, 100, 69.026],
    F7: [95.792, 100, 107.687],
    F11: [103.866, 100, 65.627],
    E: [100, 100, 100]
  }
};
Fe.max = Fe.whitepoint[2].D65;
Fe.rgb = function(t, e) {
  e = e || Fe.whitepoint[2].E;
  var n = t[0] / e[0], i = t[1] / e[1], r = t[2] / e[2], s, o, l;
  return s = n * 3.240969941904521 + i * -1.537383177570093 + r * -0.498610760293, o = n * -0.96924363628087 + i * 1.87596750150772 + r * 0.041555057407175, l = n * 0.055630079696993 + i * -0.20397695888897 + r * 1.056971514242878, s = s > 31308e-7 ? 1.055 * Math.pow(s, 1 / 2.4) - 0.055 : s = s * 12.92, o = o > 31308e-7 ? 1.055 * Math.pow(o, 1 / 2.4) - 0.055 : o = o * 12.92, l = l > 31308e-7 ? 1.055 * Math.pow(l, 1 / 2.4) - 0.055 : l = l * 12.92, s = Math.min(Math.max(0, s), 1), o = Math.min(Math.max(0, o), 1), l = Math.min(Math.max(0, l), 1), [s * 255, o * 255, l * 255];
};
eo.xyz = function(t, e) {
  var n = t[0] / 255, i = t[1] / 255, r = t[2] / 255;
  n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92, r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  var s = n * 0.41239079926595 + i * 0.35758433938387 + r * 0.18048078840183, o = n * 0.21263900587151 + i * 0.71516867876775 + r * 0.072192315360733, l = n * 0.019330818715591 + i * 0.11919477979462 + r * 0.95053215224966;
  return e = e || Fe.whitepoint[2].E, [s * e[0], o * e[1], l * e[2]];
};
const Zh = {
  name: "luv",
  //NOTE: luv has no rigidly defined limits
  //easyrgb fails to get proper coords
  //boronine states no rigid limits
  //colorMine refers this ones:
  min: [0, -134, -140],
  max: [100, 224, 122],
  channel: ["lightness", "u", "v"],
  alias: ["LUV", "cieluv", "cie1976"],
  xyz: function(t, e, n) {
    var i, r, s, o, l, a, u, c, h, d, f, m, y;
    if (s = t[0], o = t[1], l = t[2], s === 0) return [0, 0, 0];
    var E = 0.0011070564598794539;
    return e = e || "D65", n = n || 2, h = Fe.whitepoint[n][e][0], d = Fe.whitepoint[n][e][1], f = Fe.whitepoint[n][e][2], m = 4 * h / (h + 15 * d + 3 * f), y = 9 * d / (h + 15 * d + 3 * f), i = o / (13 * s) + m || 0, r = l / (13 * s) + y || 0, u = s > 8 ? d * Math.pow((s + 16) / 116, 3) : d * s * E, a = u * 9 * i / (4 * r) || 0, c = u * (12 - 3 * i - 20 * r) / (4 * r) || 0, [a, u, c];
  }
};
Fe.luv = function(t, e, n) {
  var i, r, s, o, l, a, u, c, h, d, f, m, y, E = 0.008856451679035631, p = 903.2962962962961;
  e = e || "D65", n = n || 2, h = Fe.whitepoint[n][e][0], d = Fe.whitepoint[n][e][1], f = Fe.whitepoint[n][e][2], m = 4 * h / (h + 15 * d + 3 * f), y = 9 * d / (h + 15 * d + 3 * f), a = t[0], u = t[1], c = t[2], i = 4 * a / (a + 15 * u + 3 * c) || 0, r = 9 * u / (a + 15 * u + 3 * c) || 0;
  var g = u / d;
  return s = g <= E ? p * g : 116 * Math.pow(g, 1 / 3) - 16, o = 13 * s * (i - m), l = 13 * s * (r - y), [s, o, l];
};
var m_ = {
  name: "lchuv",
  channel: ["lightness", "chroma", "hue"],
  alias: ["LCHuv", "cielchuv"],
  min: [0, 0, 0],
  max: [100, 100, 360],
  luv: function(t) {
    var e = t[0], n = t[1], i = t[2], r, s, o;
    return o = i / 360 * 2 * Math.PI, r = n * Math.cos(o), s = n * Math.sin(o), [e, r, s];
  },
  xyz: function(t) {
    return Zh.xyz(m_.luv(t));
  }
};
Zh.lchuv = function(t) {
  var e = t[0], n = t[1], i = t[2], r = Math.sqrt(n * n + i * i), s = Math.atan2(i, n), o = s * 360 / 2 / Math.PI;
  return o < 0 && (o += 360), [e, r, o];
};
Fe.lchuv = function(t) {
  return Zh.lchuv(Fe.luv(t));
};
const $f = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
var qf = {
  red: 0,
  orange: 60,
  yellow: 120,
  green: 180,
  blue: 240,
  purple: 300
};
function qv(t) {
  var c, h;
  var e, n = [], i = 1, r;
  if (typeof t == "number")
    return { space: "rgb", values: [t >>> 16, (t & 65280) >>> 8, t & 255], alpha: 1 };
  if (typeof t == "number") return { space: "rgb", values: [t >>> 16, (t & 65280) >>> 8, t & 255], alpha: 1 };
  if (t = String(t).toLowerCase(), $f[t])
    n = $f[t].slice(), r = "rgb";
  else if (t === "transparent")
    i = 0, r = "rgb", n = [0, 0, 0];
  else if (t[0] === "#") {
    var s = t.slice(1), o = s.length, l = o <= 4;
    i = 1, l ? (n = [
      parseInt(s[0] + s[0], 16),
      parseInt(s[1] + s[1], 16),
      parseInt(s[2] + s[2], 16)
    ], o === 4 && (i = parseInt(s[3] + s[3], 16) / 255)) : (n = [
      parseInt(s[0] + s[1], 16),
      parseInt(s[2] + s[3], 16),
      parseInt(s[4] + s[5], 16)
    ], o === 8 && (i = parseInt(s[6] + s[7], 16) / 255)), n[0] || (n[0] = 0), n[1] || (n[1] = 0), n[2] || (n[2] = 0), r = "rgb";
  } else if (e = /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(t)) {
    var a = e[1];
    r = a.replace(/a$/, "");
    var u = r === "cmyk" ? 4 : r === "gray" ? 1 : 3;
    n = e[2].trim().split(/\s*[,\/]\s*|\s+/), r === "color" && (r = n.shift()), n = n.map(function(d, f) {
      if (d[d.length - 1] === "%")
        return d = parseFloat(d) / 100, f === 3 ? d : r === "rgb" ? d * 255 : r[0] === "h" || r[0] === "l" && !f ? d * 100 : r === "lab" ? d * 125 : r === "lch" ? f < 2 ? d * 150 : d * 360 : r[0] === "o" && !f ? d : r === "oklab" ? d * 0.4 : r === "oklch" ? f < 2 ? d * 0.4 : d * 360 : d;
      if (r[f] === "h" || f === 2 && r[r.length - 1] === "h") {
        if (qf[d] !== void 0) return qf[d];
        if (d.endsWith("deg")) return parseFloat(d);
        if (d.endsWith("turn")) return parseFloat(d) * 360;
        if (d.endsWith("grad")) return parseFloat(d) * 360 / 400;
        if (d.endsWith("rad")) return parseFloat(d) * 180 / Math.PI;
      }
      return d === "none" ? 0 : parseFloat(d);
    }), i = n.length > u ? n.pop() : 1;
  } else /[0-9](?:\s|\/|,)/.test(t) && (n = t.match(/([0-9]+)/g).map(function(d) {
    return parseFloat(d);
  }), r = ((h = (c = t.match(/([a-z])/ig)) == null ? void 0 : c.join("")) == null ? void 0 : h.toLowerCase()) || "rgb");
  return {
    space: r,
    values: n,
    alpha: i
  };
}
const gu = {
  name: "hsl",
  min: [0, 0, 0],
  max: [360, 100, 100],
  channel: ["hue", "saturation", "lightness"],
  alias: ["HSL"],
  rgb: function(t) {
    var e = t[0] / 360, n = t[1] / 100, i = t[2] / 100, r, s, o, l, a, u = 0;
    if (n === 0) return a = i * 255, [a, a, a];
    for (s = i < 0.5 ? i * (1 + n) : i + n - i * n, r = 2 * i - s, l = [0, 0, 0]; u < 3; )
      o = e + 1 / 3 * -(u - 1), o < 0 ? o++ : o > 1 && o--, a = 6 * o < 1 ? r + (s - r) * 6 * o : 2 * o < 1 ? s : 3 * o < 2 ? r + (s - r) * (2 / 3 - o) * 6 : r, l[u++] = a * 255;
    return l;
  }
};
eo.hsl = function(t) {
  var e = t[0] / 255, n = t[1] / 255, i = t[2] / 255, r = Math.min(e, n, i), s = Math.max(e, n, i), o = s - r, l, a, u;
  return s === r ? l = 0 : e === s ? l = (n - i) / o : n === s ? l = 2 + (i - e) / o : i === s && (l = 4 + (e - n) / o), l = Math.min(l * 60, 360), l < 0 && (l += 360), u = (r + s) / 2, s === r ? a = 0 : u <= 0.5 ? a = o / (s + r) : a = o / (2 - s - r), [l, a * 100, u * 100];
};
function Qv(t) {
  Array.isArray(t) && t.raw && (t = String.raw(...arguments)), t instanceof Number && (t = +t);
  var e, n = qv(t);
  if (!n.space) return [];
  const i = n.space[0] === "h" ? gu.min : eo.min, r = n.space[0] === "h" ? gu.max : eo.max;
  return e = Array(3), e[0] = Math.min(Math.max(n.values[0], i[0]), r[0]), e[1] = Math.min(Math.max(n.values[1], i[1]), r[1]), e[2] = Math.min(Math.max(n.values[2], i[2]), r[2]), n.space[0] === "h" && (e = gu.rgb(e)), e.push(Math.min(Math.max(n.alpha, 0), 1)), e;
}
const Hh = [NaN, NaN, NaN, 0];
function Jv(t) {
  return typeof t == "string" ? t : qh(t);
}
const eE = 1024, us = {};
let pu = 0;
function tE(t) {
  if (t.length === 4)
    return t;
  const e = t.slice();
  return e[3] = 1, e;
}
function Qf(t) {
  const e = Fe.lchuv(eo.xyz(t));
  return e[3] = t[3], e;
}
function nE(t) {
  const e = Fe.rgb(m_.xyz(t));
  return e[3] = t[3], e;
}
function $h(t) {
  if (t === "none")
    return Hh;
  if (us.hasOwnProperty(t))
    return us[t];
  if (pu >= eE) {
    let n = 0;
    for (const i in us)
      n++ & 3 || (delete us[i], --pu);
  }
  const e = Qv(t);
  if (e.length !== 4)
    throw new Error('failed to parse "' + t + '" as color');
  for (const n of e)
    if (isNaN(n))
      throw new Error('failed to parse "' + t + '" as color');
  return __(e), us[t] = e, ++pu, e;
}
function to(t) {
  return Array.isArray(t) ? t : $h(t);
}
function __(t) {
  return t[0] = Ee(t[0] + 0.5 | 0, 0, 255), t[1] = Ee(t[1] + 0.5 | 0, 0, 255), t[2] = Ee(t[2] + 0.5 | 0, 0, 255), t[3] = Ee(t[3], 0, 1), t;
}
function qh(t) {
  let e = t[0];
  e != (e | 0) && (e = e + 0.5 | 0);
  let n = t[1];
  n != (n | 0) && (n = n + 0.5 | 0);
  let i = t[2];
  i != (i | 0) && (i = i + 0.5 | 0);
  const r = t[3] === void 0 ? 1 : Math.round(t[3] * 1e3) / 1e3;
  return "rgba(" + e + "," + n + "," + i + "," + r + ")";
}
const li = typeof navigator < "u" && typeof navigator.userAgent < "u" ? navigator.userAgent.toLowerCase() : "", iE = li.includes("firefox"), rE = li.includes("safari") && !li.includes("chrom");
rE && (li.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(li));
const sE = li.includes("webkit") && !li.includes("edge"), y_ = li.includes("macintosh"), v_ = typeof devicePixelRatio < "u" ? devicePixelRatio : 1, E_ = typeof WorkerGlobalScope < "u" && typeof OffscreenCanvas < "u" && self instanceof WorkerGlobalScope, x_ = typeof Image < "u" && Image.prototype.decode, w_ = function() {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: function() {
        t = !0;
      }
    });
    window.addEventListener("_", null, e), window.removeEventListener("_", null, e);
  } catch {
  }
  return t;
}();
function we(t, e, n, i) {
  let r;
  return n && n.length ? r = /** @type {HTMLCanvasElement} */
  n.shift() : E_ ? r = new OffscreenCanvas(t || 300, e || 300) : r = document.createElement("canvas"), t && (r.width = t), e && (r.height = e), /** @type {CanvasRenderingContext2D} */
  r.getContext("2d", i);
}
let mu;
function Yl() {
  return mu || (mu = we(1, 1)), mu;
}
function Wr(t) {
  const e = t.canvas;
  e.width = 1, e.height = 1, t.clearRect(0, 0, 1, 1);
}
function Jf(t, e) {
  const n = e.parentNode;
  n && n.replaceChild(t, e);
}
function oE(t) {
  for (; t.lastChild; )
    t.lastChild.remove();
}
function lE(t, e) {
  const n = t.childNodes;
  for (let i = 0; ; ++i) {
    const r = n[i], s = e[i];
    if (!r && !s)
      break;
    if (r !== s) {
      if (!r) {
        t.appendChild(s);
        continue;
      }
      if (!s) {
        t.removeChild(r), --i;
        continue;
      }
      t.insertBefore(s, r);
    }
  }
}
function aE(t, e, n) {
  const i = (
    /** @type {HTMLImageElement} */
    t
  );
  let r = !0, s = !1, o = !1;
  const l = [
    zl(i, V.LOAD, function() {
      o = !0, s || e();
    })
  ];
  return i.src && x_ ? (s = !0, i.decode().then(function() {
    r && e();
  }).catch(function(a) {
    r && (o ? e() : n());
  })) : l.push(zl(i, V.ERROR, n)), function() {
    r = !1, l.forEach(le);
  };
}
function uE(t, e) {
  return new Promise((n, i) => {
    function r() {
      o(), n(t);
    }
    function s() {
      o(), i(new Error("Image load error"));
    }
    function o() {
      t.removeEventListener("load", r), t.removeEventListener("error", s);
    }
    t.addEventListener("load", r), t.addEventListener("error", s);
  });
}
function cE(t, e) {
  return e && (t.src = e), t.src && x_ ? new Promise(
    (n, i) => t.decode().then(() => n(t)).catch(
      (r) => t.complete && t.width ? n(t) : i(r)
    )
  ) : uE(t);
}
class hE {
  constructor() {
    this.cache_ = {}, this.patternCache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 32;
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.cache_ = {}, this.patternCache_ = {}, this.cacheSize_ = 0;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.cacheSize_ > this.maxCacheSize_;
  }
  /**
   * FIXME empty description for jsdoc
   */
  expire() {
    if (this.canExpireCache()) {
      let e = 0;
      for (const n in this.cache_) {
        const i = this.cache_[n];
        !(e++ & 3) && !i.hasListener() && (delete this.cache_[n], delete this.patternCache_[n], --this.cacheSize_);
      }
    }
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @return {import("./IconImage.js").default} Icon image.
   */
  get(e, n, i) {
    const r = _u(e, n, i);
    return r in this.cache_ ? this.cache_[r] : null;
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @return {CanvasPattern} Icon image.
   */
  getPattern(e, n, i) {
    const r = _u(e, n, i);
    return r in this.patternCache_ ? this.patternCache_[r] : null;
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color|string|null} color Color.
   * @param {import("./IconImage.js").default|null} iconImage Icon image.
   * @param {boolean} [pattern] Also cache a `'repeat'` pattern with this `iconImage`.
   */
  set(e, n, i, r, s) {
    const o = _u(e, n, i), l = o in this.cache_;
    this.cache_[o] = r, s && (r.getImageState() === Z.IDLE && r.load(), r.getImageState() === Z.LOADING ? r.ready().then(() => {
      this.patternCache_[o] = Yl().createPattern(
        r.getImage(1),
        "repeat"
      );
    }) : this.patternCache_[o] = Yl().createPattern(
      r.getImage(1),
      "repeat"
    )), l || ++this.cacheSize_;
  }
  /**
   * Set the cache size of the icon cache. Default is `32`. Change this value when
   * your map uses more than 32 different icon images and you are not caching icon
   * styles on the application level.
   * @param {number} maxCacheSize Cache max size.
   * @api
   */
  setSize(e) {
    this.maxCacheSize_ = e, this.expire();
  }
}
function _u(t, e, n) {
  const i = n ? to(n) : "null";
  return e + ":" + t + ":" + i;
}
const Jt = new hE();
let cs = null;
class dE extends ga {
  /**
   * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap|null} image Image.
   * @param {string|undefined} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../ImageState.js").default|undefined} imageState Image state.
   * @param {import("../color.js").Color|string|null} color Color.
   */
  constructor(e, n, i, r, s) {
    super(), this.hitDetectionImage_ = null, this.image_ = e, this.crossOrigin_ = i, this.canvas_ = {}, this.color_ = s, this.imageState_ = r === void 0 ? Z.IDLE : r, this.size_ = e && e.width && e.height ? [e.width, e.height] : null, this.src_ = n, this.tainted_, this.ready_ = null;
  }
  /**
   * @private
   */
  initializeImage_() {
    this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_);
  }
  /**
   * @private
   * @return {boolean} The image canvas is tainted.
   */
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === Z.LOADED) {
      cs || (cs = we(1, 1, void 0, {
        willReadFrequently: !0
      })), cs.drawImage(this.image_, 0, 0);
      try {
        cs.getImageData(0, 0, 1, 1), this.tainted_ = !1;
      } catch {
        cs = null, this.tainted_ = !0;
      }
    }
    return this.tainted_ === !0;
  }
  /**
   * @private
   */
  dispatchChangeEvent_() {
    this.dispatchEvent(V.CHANGE);
  }
  /**
   * @private
   */
  handleImageError_() {
    this.imageState_ = Z.ERROR, this.dispatchChangeEvent_();
  }
  /**
   * @private
   */
  handleImageLoad_() {
    this.imageState_ = Z.LOADED, this.size_ = [this.image_.width, this.image_.height], this.dispatchChangeEvent_();
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element or image bitmap.
   */
  getImage(e) {
    return this.image_ || this.initializeImage_(), this.replaceColor_(e), this.canvas_[e] ? this.canvas_[e] : this.image_;
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Image or Canvas element.
   */
  getPixelRatio(e) {
    return this.replaceColor_(e), this.canvas_[e] ? e : 1;
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return this.imageState_;
  }
  /**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   */
  getHitDetectionImage() {
    if (this.image_ || this.initializeImage_(), !this.hitDetectionImage_)
      if (this.isTainted_()) {
        const e = this.size_[0], n = this.size_[1], i = we(e, n);
        i.fillRect(0, 0, e, n), this.hitDetectionImage_ = i.canvas;
      } else
        this.hitDetectionImage_ = this.image_;
    return this.hitDetectionImage_;
  }
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   */
  getSize() {
    return this.size_;
  }
  /**
   * @return {string|undefined} Image src.
   */
  getSrc() {
    return this.src_;
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.imageState_ === Z.IDLE) {
      this.image_ || this.initializeImage_(), this.imageState_ = Z.LOADING;
      try {
        this.src_ !== void 0 && (this.image_.src = this.src_);
      } catch {
        this.handleImageError_();
      }
      this.image_ instanceof HTMLImageElement && cE(this.image_, this.src_).then((e) => {
        this.image_ = e, this.handleImageLoad_();
      }).catch(this.handleImageError_.bind(this));
    }
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @private
   */
  replaceColor_(e) {
    if (!this.color_ || this.canvas_[e] || this.imageState_ !== Z.LOADED)
      return;
    const n = this.image_, i = we(
      Math.ceil(n.width * e),
      Math.ceil(n.height * e)
    ), r = i.canvas;
    i.scale(e, e), i.drawImage(n, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = Jv(this.color_), i.fillRect(0, 0, r.width / e, r.height / e), i.globalCompositeOperation = "destination-in", i.drawImage(n, 0, 0), this.canvas_[e] = r;
  }
  /**
   * @return {Promise<void>} Promise that resolves when the image is loaded.
   */
  ready() {
    return this.ready_ || (this.ready_ = new Promise((e) => {
      if (this.imageState_ === Z.LOADED || this.imageState_ === Z.ERROR)
        e();
      else {
        const n = () => {
          (this.imageState_ === Z.LOADED || this.imageState_ === Z.ERROR) && (this.removeEventListener(V.CHANGE, n), e());
        };
        this.addEventListener(V.CHANGE, n);
      }
    })), this.ready_;
  }
}
function Qh(t, e, n, i, r, s) {
  let o = e === void 0 ? void 0 : Jt.get(e, n, r);
  return o || (o = new dE(
    t,
    t && "src" in t ? t.src || void 0 : e,
    n,
    i,
    r
  ), Jt.set(e, n, r, o, s)), s && o && !Jt.getPattern(e, n, r) && Jt.set(e, n, r, o, s), o;
}
function en(t) {
  return t ? Array.isArray(t) ? qh(t) : typeof t == "object" && "src" in t ? fE(t) : t : null;
}
function fE(t) {
  if (!t.offset || !t.size)
    return Jt.getPattern(t.src, "anonymous", t.color);
  const e = t.src + ":" + t.offset, n = Jt.getPattern(
    e,
    void 0,
    t.color
  );
  if (n)
    return n;
  const i = Jt.get(t.src, "anonymous", null);
  if (i.getImageState() !== Z.LOADED)
    return null;
  const r = we(
    t.size[0],
    t.size[1]
  );
  return r.drawImage(
    i.getImage(1),
    t.offset[0],
    t.offset[1],
    t.size[0],
    t.size[1],
    0,
    0,
    t.size[0],
    t.size[1]
  ), Qh(
    r.canvas,
    e,
    void 0,
    Z.LOADED,
    t.color,
    !0
  ), Jt.getPattern(e, void 0, t.color);
}
const $o = "ol-hidden", Sa = "ol-unselectable", Jh = "ol-control", eg = "ol-collapsed", gE = new RegExp(
  [
    "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
    "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
    "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
    "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
    `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`
  ].join(""),
  "i"
), tg = [
  "style",
  "variant",
  "weight",
  "size",
  "lineHeight",
  "family"
], S_ = function(t) {
  const e = t.match(gE);
  if (!e)
    return null;
  const n = (
    /** @type {FontParameters} */
    {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal"
    }
  );
  for (let i = 0, r = tg.length; i < r; ++i) {
    const s = e[i + 1];
    s !== void 0 && (n[tg[i]] = s);
  }
  return n.families = n.family.split(/,\s?/), n;
}, C_ = "10px sans-serif", et = "#000", Xr = "round", En = [], xn = 0, jr = "round", no = 10, io = "#000", ro = "center", Ul = "middle", Ci = [0, 0, 0, 0], so = 1, dn = new rn();
let er = null, Rc;
const Tc = {}, pE = function() {
  const e = "32px ", n = ["monospace", "serif"], i = n.length, r = "wmytzilWMYTZIL@#/&?$%10";
  let s, o;
  function l(u, c, h) {
    let d = !0;
    for (let f = 0; f < i; ++f) {
      const m = n[f];
      if (o = Bl(
        u + " " + c + " " + e + m,
        r
      ), h != m) {
        const y = Bl(
          u + " " + c + " " + e + h + "," + m,
          r
        );
        d = d && y != o;
      }
    }
    return !!d;
  }
  function a() {
    let u = !0;
    const c = dn.getKeys();
    for (let h = 0, d = c.length; h < d; ++h) {
      const f = c[h];
      if (dn.get(f) < 100) {
        const [m, y, E] = f.split(`
`);
        l(m, y, E) ? (po(Tc), er = null, Rc = void 0, dn.set(f, 100)) : (dn.set(f, dn.get(f) + 1, !0), u = !1);
      }
    }
    u && (clearInterval(s), s = void 0);
  }
  return function(u) {
    const c = S_(u);
    if (!c)
      return;
    const h = c.families;
    for (let d = 0, f = h.length; d < f; ++d) {
      const m = h[d], y = c.style + `
` + c.weight + `
` + m;
      dn.get(y) === void 0 && (dn.set(y, 100, !0), l(c.style, c.weight, m) || (dn.set(y, 0, !0), s === void 0 && (s = setInterval(a, 32))));
    }
  };
}(), mE = /* @__PURE__ */ function() {
  let t;
  return function(e) {
    let n = Tc[e];
    if (n == null) {
      if (E_) {
        const i = S_(e), r = R_(e, "Žg");
        n = (isNaN(Number(i.lineHeight)) ? 1.2 : Number(i.lineHeight)) * (r.actualBoundingBoxAscent + r.actualBoundingBoxDescent);
      } else
        t || (t = document.createElement("div"), t.innerHTML = "M", t.style.minHeight = "0", t.style.maxHeight = "none", t.style.height = "auto", t.style.padding = "0", t.style.border = "none", t.style.position = "absolute", t.style.display = "block", t.style.left = "-99999px"), t.style.font = e, document.body.appendChild(t), n = t.offsetHeight, document.body.removeChild(t);
      Tc[e] = n;
    }
    return n;
  };
}();
function R_(t, e) {
  return er || (er = we(1, 1)), t != Rc && (er.font = t, Rc = er.font), er.measureText(e);
}
function Bl(t, e) {
  return R_(t, e).width;
}
function ng(t, e, n) {
  if (e in n)
    return n[e];
  const i = e.split(`
`).reduce((r, s) => Math.max(r, Bl(t, s)), 0);
  return n[e] = i, i;
}
function _E(t, e) {
  const n = [], i = [], r = [];
  let s = 0, o = 0, l = 0, a = 0;
  for (let u = 0, c = e.length; u <= c; u += 2) {
    const h = e[u];
    if (h === `
` || u === c) {
      s = Math.max(s, o), r.push(o), o = 0, l += a, a = 0;
      continue;
    }
    const d = e[u + 1] || t.font, f = Bl(d, h);
    n.push(f), o += f;
    const m = mE(d);
    i.push(m), a = Math.max(a, m);
  }
  return { width: s, height: l, widths: n, heights: i, lineWidths: r };
}
function yE(t, e, n, i, r, s, o, l, a, u, c) {
  t.save(), n !== 1 && (t.globalAlpha === void 0 ? t.globalAlpha = (h) => h.globalAlpha *= n : t.globalAlpha *= n), e && t.transform.apply(t, e), /** @type {*} */
  i.contextInstructions ? (t.translate(a, u), t.scale(c[0], c[1]), vE(
    /** @type {Label} */
    i,
    t
  )) : c[0] < 0 || c[1] < 0 ? (t.translate(a, u), t.scale(c[0], c[1]), t.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    i,
    r,
    s,
    o,
    l,
    0,
    0,
    o,
    l
  )) : t.drawImage(
    /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
    i,
    r,
    s,
    o,
    l,
    a,
    u,
    o * c[0],
    l * c[1]
  ), t.restore();
}
function vE(t, e) {
  const n = t.contextInstructions;
  for (let i = 0, r = n.length; i < r; i += 2)
    Array.isArray(n[i + 1]) ? e[n[i]].apply(
      e,
      n[i + 1]
    ) : e[n[i]] = n[i + 1];
}
class Ca extends wa {
  /**
   * @param {Options} options Options.
   */
  constructor(e) {
    super({
      opacity: 1,
      rotateWithView: e.rotateWithView !== void 0 ? e.rotateWithView : !1,
      rotation: e.rotation !== void 0 ? e.rotation : 0,
      scale: e.scale !== void 0 ? e.scale : 1,
      displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
      declutterMode: e.declutterMode
    }), this.canvases_, this.hitDetectionCanvas_ = null, this.fill_ = e.fill !== void 0 ? e.fill : null, this.origin_ = [0, 0], this.points_ = e.points, this.radius = e.radius, this.radius2_ = e.radius2, this.angle_ = e.angle !== void 0 ? e.angle : 0, this.stroke_ = e.stroke !== void 0 ? e.stroke : null, this.size_, this.renderOptions_, this.imageState_ = this.fill_ && this.fill_.loading() ? Z.LOADING : Z.LOADED, this.imageState_ === Z.LOADING && this.ready().then(() => this.imageState_ = Z.LOADED), this.render();
  }
  /**
   * Clones the style.
   * @return {RegularShape} The cloned style.
   * @api
   * @override
   */
  clone() {
    const e = this.getScale(), n = new Ca({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      points: this.getPoints(),
      radius: this.getRadius(),
      radius2: this.getRadius2(),
      angle: this.getAngle(),
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(e) ? e.slice() : e,
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    return n.setOpacity(this.getOpacity()), n;
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   * @override
   */
  getAnchor() {
    const e = this.size_, n = this.getDisplacement(), i = this.getScaleArray();
    return [
      e[0] / 2 - n[0] / i[0],
      e[1] / 2 + n[1] / i[1]
    ];
  }
  /**
   * Get the angle used in generating the shape.
   * @return {number} Shape's rotation in radians.
   * @api
   */
  getAngle() {
    return this.angle_;
  }
  /**
   * Get the fill style for the shape.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(e) {
    this.fill_ = e, this.render();
  }
  /**
   * @return {HTMLCanvasElement} Image element.
   * @override
   */
  getHitDetectionImage() {
    return this.hitDetectionCanvas_ || (this.hitDetectionCanvas_ = this.createHitDetectionCanvas_(
      this.renderOptions_
    )), this.hitDetectionCanvas_;
  }
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement} Image or Canvas element.
   * @api
   * @override
   */
  getImage(e) {
    let n = this.canvases_[e];
    if (!n) {
      const i = this.renderOptions_, r = we(
        i.size * e,
        i.size * e
      );
      this.draw_(i, r, e), n = r.canvas, this.canvases_[e] = n;
    }
    return n;
  }
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   * @override
   */
  getPixelRatio(e) {
    return e;
  }
  /**
   * @return {import("../size.js").Size} Image size.
   * @override
   */
  getImageSize() {
    return this.size_;
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   * @override
   */
  getImageState() {
    return this.imageState_;
  }
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   * @override
   */
  getOrigin() {
    return this.origin_;
  }
  /**
   * Get the number of points for generating the shape.
   * @return {number} Number of points for stars and regular polygons.
   * @api
   */
  getPoints() {
    return this.points_;
  }
  /**
   * Get the (primary) radius for the shape.
   * @return {number} Radius.
   * @api
   */
  getRadius() {
    return this.radius;
  }
  /**
   * Get the secondary radius for the shape.
   * @return {number|undefined} Radius2.
   * @api
   */
  getRadius2() {
    return this.radius2_;
  }
  /**
   * Get the size of the symbolizer (in pixels).
   * @return {import("../size.js").Size} Size.
   * @api
   * @override
   */
  getSize() {
    return this.size_;
  }
  /**
   * Get the stroke style for the shape.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(e) {
    this.stroke_ = e, this.render();
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   * @override
   */
  listenImageChange(e) {
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   * @override
   */
  unlistenImageChange(e) {
  }
  /**
   * Calculate additional canvas size needed for the miter.
   * @param {string} lineJoin Line join
   * @param {number} strokeWidth Stroke width
   * @param {number} miterLimit Miter limit
   * @return {number} Additional canvas size needed
   * @private
   */
  calculateLineJoinSize_(e, n, i) {
    if (n === 0 || this.points_ === 1 / 0 || e !== "bevel" && e !== "miter")
      return n;
    let r = this.radius, s = this.radius2_ === void 0 ? r : this.radius2_;
    if (r < s) {
      const C = r;
      r = s, s = C;
    }
    const o = this.radius2_ === void 0 ? this.points_ : this.points_ * 2, l = 2 * Math.PI / o, a = s * Math.sin(l), u = Math.sqrt(s * s - a * a), c = r - u, h = Math.sqrt(a * a + c * c), d = h / a;
    if (e === "miter" && d <= i)
      return d * n;
    const f = n / 2 / d, m = n / 2 * (c / h), E = Math.sqrt((r + f) * (r + f) + m * m) - r;
    if (this.radius2_ === void 0 || e === "bevel")
      return E * 2;
    const p = r * Math.sin(l), g = Math.sqrt(r * r - p * p), _ = s - g, x = Math.sqrt(p * p + _ * _) / p;
    if (x <= i) {
      const C = x * n / 2 - s - r;
      return 2 * Math.max(E, C);
    }
    return E * 2;
  }
  /**
   * @return {RenderOptions}  The render options
   * @protected
   */
  createRenderOptions() {
    let e = Xr, n = jr, i = 0, r = null, s = 0, o, l = 0;
    this.stroke_ && (o = en(this.stroke_.getColor() ?? io), l = this.stroke_.getWidth() ?? so, r = this.stroke_.getLineDash(), s = this.stroke_.getLineDashOffset() ?? 0, n = this.stroke_.getLineJoin() ?? jr, e = this.stroke_.getLineCap() ?? Xr, i = this.stroke_.getMiterLimit() ?? no);
    const a = this.calculateLineJoinSize_(n, l, i), u = Math.max(this.radius, this.radius2_ || 0), c = Math.ceil(2 * u + a);
    return {
      strokeStyle: o,
      strokeWidth: l,
      size: c,
      lineCap: e,
      lineDash: r,
      lineDashOffset: s,
      lineJoin: n,
      miterLimit: i
    };
  }
  /**
   * @protected
   */
  render() {
    this.renderOptions_ = this.createRenderOptions();
    const e = this.renderOptions_.size;
    this.canvases_ = {}, this.hitDetectionCanvas_ = null, this.size_ = [e, e];
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The rendering context.
   * @param {number} pixelRatio The pixel ratio.
   */
  draw_(e, n, i) {
    if (n.scale(i, i), n.translate(e.size / 2, e.size / 2), this.createPath_(n), this.fill_) {
      let r = this.fill_.getColor();
      r === null && (r = et), n.fillStyle = en(r), n.fill();
    }
    e.strokeStyle && (n.strokeStyle = e.strokeStyle, n.lineWidth = e.strokeWidth, e.lineDash && (n.setLineDash(e.lineDash), n.lineDashOffset = e.lineDashOffset), n.lineCap = e.lineCap, n.lineJoin = e.lineJoin, n.miterLimit = e.miterLimit, n.stroke());
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @return {HTMLCanvasElement} Canvas containing the icon
   */
  createHitDetectionCanvas_(e) {
    let n;
    if (this.fill_) {
      let i = this.fill_.getColor(), r = 0;
      typeof i == "string" && (i = to(i)), i === null ? r = 1 : Array.isArray(i) && (r = i.length === 4 ? i[3] : 1), r === 0 && (n = we(e.size, e.size), this.drawHitDetectionCanvas_(e, n));
    }
    return n ? n.canvas : this.getImage(1);
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context The context to draw in.
   */
  createPath_(e) {
    let n = this.points_;
    const i = this.radius;
    if (n === 1 / 0)
      e.arc(0, 0, i, 0, 2 * Math.PI);
    else {
      const r = this.radius2_ === void 0 ? i : this.radius2_;
      this.radius2_ !== void 0 && (n *= 2);
      const s = this.angle_ - Math.PI / 2, o = 2 * Math.PI / n;
      for (let l = 0; l < n; l++) {
        const a = s + l * o, u = l % 2 === 0 ? i : r;
        e.lineTo(u * Math.cos(a), u * Math.sin(a));
      }
      e.closePath();
    }
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The context.
   */
  drawHitDetectionCanvas_(e, n) {
    n.translate(e.size / 2, e.size / 2), this.createPath_(n), n.fillStyle = et, n.fill(), e.strokeStyle && (n.strokeStyle = e.strokeStyle, n.lineWidth = e.strokeWidth, e.lineDash && (n.setLineDash(e.lineDash), n.lineDashOffset = e.lineDashOffset), n.lineJoin = e.lineJoin, n.miterLimit = e.miterLimit, n.stroke());
  }
  /**
   * @override
   */
  ready() {
    return this.fill_ ? this.fill_.ready() : Promise.resolve();
  }
}
class Ra extends Ca {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || { radius: 5 }, super({
      points: 1 / 0,
      fill: e.fill,
      radius: e.radius,
      stroke: e.stroke,
      scale: e.scale !== void 0 ? e.scale : 1,
      rotation: e.rotation !== void 0 ? e.rotation : 0,
      rotateWithView: e.rotateWithView !== void 0 ? e.rotateWithView : !1,
      displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
      declutterMode: e.declutterMode
    });
  }
  /**
   * Clones the style.
   * @return {CircleStyle} The cloned style.
   * @api
   * @override
   */
  clone() {
    const e = this.getScale(), n = new Ra({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      radius: this.getRadius(),
      scale: Array.isArray(e) ? e.slice() : e,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    return n.setOpacity(this.getOpacity()), n;
  }
  /**
   * Set the circle radius.
   *
   * @param {number} radius Circle radius.
   * @api
   */
  setRadius(e) {
    this.radius = e, this.render();
  }
}
class yo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, this.patternImage_ = null, this.color_ = null, e.color !== void 0 && this.setColor(e.color);
  }
  /**
   * Clones the style. The color is not cloned if it is a {@link module:ol/colorlike~ColorLike}.
   * @return {Fill} The cloned style.
   * @api
   */
  clone() {
    const e = this.getColor();
    return new yo({
      color: Array.isArray(e) ? e.slice() : e || void 0
    });
  }
  /**
   * Get the fill color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} color Color.
   * @api
   */
  setColor(e) {
    if (e !== null && typeof e == "object" && "src" in e) {
      const n = Qh(
        null,
        e.src,
        "anonymous",
        void 0,
        e.offset ? null : e.color ? e.color : null,
        !(e.offset && e.size)
      );
      n.ready().then(() => {
        this.patternImage_ = null;
      }), n.getImageState() === Z.IDLE && n.load(), n.getImageState() === Z.LOADING && (this.patternImage_ = n);
    }
    this.color_ = e;
  }
  /**
   * @return {boolean} The fill style is loading an image pattern.
   */
  loading() {
    return !!this.patternImage_;
  }
  /**
   * @return {Promise<void>} `false` or a promise that resolves when the style is ready to use.
   */
  ready() {
    return this.patternImage_ ? this.patternImage_.ready() : Promise.resolve();
  }
}
class Ta {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, this.color_ = e.color !== void 0 ? e.color : null, this.lineCap_ = e.lineCap, this.lineDash_ = e.lineDash !== void 0 ? e.lineDash : null, this.lineDashOffset_ = e.lineDashOffset, this.lineJoin_ = e.lineJoin, this.miterLimit_ = e.miterLimit, this.width_ = e.width;
  }
  /**
   * Clones the style.
   * @return {Stroke} The cloned style.
   * @api
   */
  clone() {
    const e = this.getColor();
    return new Ta({
      color: Array.isArray(e) ? e.slice() : e || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth()
    });
  }
  /**
   * Get the stroke color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Get the line cap type for the stroke.
   * @return {CanvasLineCap|undefined} Line cap.
   * @api
   */
  getLineCap() {
    return this.lineCap_;
  }
  /**
   * Get the line dash style for the stroke.
   * @return {Array<number>|null} Line dash.
   * @api
   */
  getLineDash() {
    return this.lineDash_;
  }
  /**
   * Get the line dash offset for the stroke.
   * @return {number|undefined} Line dash offset.
   * @api
   */
  getLineDashOffset() {
    return this.lineDashOffset_;
  }
  /**
   * Get the line join type for the stroke.
   * @return {CanvasLineJoin|undefined} Line join.
   * @api
   */
  getLineJoin() {
    return this.lineJoin_;
  }
  /**
   * Get the miter limit for the stroke.
   * @return {number|undefined} Miter limit.
   * @api
   */
  getMiterLimit() {
    return this.miterLimit_;
  }
  /**
   * Get the stroke width.
   * @return {number|undefined} Width.
   * @api
   */
  getWidth() {
    return this.width_;
  }
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */
  setColor(e) {
    this.color_ = e;
  }
  /**
   * Set the line cap.
   *
   * @param {CanvasLineCap|undefined} lineCap Line cap.
   * @api
   */
  setLineCap(e) {
    this.lineCap_ = e;
  }
  /**
   * Set the line dash.
   *
   * @param {Array<number>|null} lineDash Line dash.
   * @api
   */
  setLineDash(e) {
    this.lineDash_ = e;
  }
  /**
   * Set the line dash offset.
   *
   * @param {number|undefined} lineDashOffset Line dash offset.
   * @api
   */
  setLineDashOffset(e) {
    this.lineDashOffset_ = e;
  }
  /**
   * Set the line join.
   *
   * @param {CanvasLineJoin|undefined} lineJoin Line join.
   * @api
   */
  setLineJoin(e) {
    this.lineJoin_ = e;
  }
  /**
   * Set the miter limit.
   *
   * @param {number|undefined} miterLimit Miter limit.
   * @api
   */
  setMiterLimit(e) {
    this.miterLimit_ = e;
  }
  /**
   * Set the width.
   *
   * @param {number|undefined} width Width.
   * @api
   */
  setWidth(e) {
    this.width_ = e;
  }
}
class Li {
  /**
   * @param {Options} [options] Style options.
   */
  constructor(e) {
    e = e || {}, this.geometry_ = null, this.geometryFunction_ = ig, e.geometry !== void 0 && this.setGeometry(e.geometry), this.fill_ = e.fill !== void 0 ? e.fill : null, this.image_ = e.image !== void 0 ? e.image : null, this.renderer_ = e.renderer !== void 0 ? e.renderer : null, this.hitDetectionRenderer_ = e.hitDetectionRenderer !== void 0 ? e.hitDetectionRenderer : null, this.stroke_ = e.stroke !== void 0 ? e.stroke : null, this.text_ = e.text !== void 0 ? e.text : null, this.zIndex_ = e.zIndex;
  }
  /**
   * Clones the style.
   * @return {Style} The cloned style.
   * @api
   */
  clone() {
    let e = this.getGeometry();
    return e && typeof e == "object" && (e = /** @type {import("../geom/Geometry.js").default} */
    e.clone()), new Li({
      geometry: e ?? void 0,
      fill: this.getFill() ? this.getFill().clone() : void 0,
      image: this.getImage() ? this.getImage().clone() : void 0,
      renderer: this.getRenderer() ?? void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      text: this.getText() ? this.getText().clone() : void 0,
      zIndex: this.getZIndex()
    });
  }
  /**
   * Get the custom renderer function that was configured with
   * {@link #setRenderer} or the `renderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */
  getRenderer() {
    return this.renderer_;
  }
  /**
   * Sets a custom renderer function for this style. When set, `fill`, `stroke`
   * and `image` options of the style will be ignored.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */
  setRenderer(e) {
    this.renderer_ = e;
  }
  /**
   * Sets a custom renderer function for this style used
   * in hit detection.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */
  setHitDetectionRenderer(e) {
    this.hitDetectionRenderer_ = e;
  }
  /**
   * Get the custom renderer function that was configured with
   * {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */
  getHitDetectionRenderer() {
    return this.hitDetectionRenderer_;
  }
  /**
   * Get the geometry to be rendered.
   * @return {string|import("../geom/Geometry.js").default|GeometryFunction|null}
   * Feature property or geometry or function that returns the geometry that will
   * be rendered with this style.
   * @api
   */
  getGeometry() {
    return this.geometry_;
  }
  /**
   * Get the function used to generate a geometry for rendering.
   * @return {!GeometryFunction} Function that is called with a feature
   * and returns the geometry to render instead of the feature's geometry.
   * @api
   */
  getGeometryFunction() {
    return this.geometryFunction_;
  }
  /**
   * Get the fill style.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(e) {
    this.fill_ = e;
  }
  /**
   * Get the image style.
   * @return {import("./Image.js").default|null} Image style.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Set the image style.
   * @param {import("./Image.js").default} image Image style.
   * @api
   */
  setImage(e) {
    this.image_ = e;
  }
  /**
   * Get the stroke style.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(e) {
    this.stroke_ = e;
  }
  /**
   * Get the text style.
   * @return {import("./Text.js").default|null} Text style.
   * @api
   */
  getText() {
    return this.text_;
  }
  /**
   * Set the text style.
   * @param {import("./Text.js").default} text Text style.
   * @api
   */
  setText(e) {
    this.text_ = e;
  }
  /**
   * Get the z-index for the style.
   * @return {number|undefined} ZIndex.
   * @api
   */
  getZIndex() {
    return this.zIndex_;
  }
  /**
   * Set a geometry that is rendered instead of the feature's geometry.
   *
   * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
   *     Feature property or geometry or function returning a geometry to render
   *     for this style.
   * @api
   */
  setGeometry(e) {
    typeof e == "function" ? this.geometryFunction_ = e : typeof e == "string" ? this.geometryFunction_ = function(n) {
      return (
        /** @type {import("../geom/Geometry.js").default} */
        n.get(e)
      );
    } : e ? e !== void 0 && (this.geometryFunction_ = function() {
      return (
        /** @type {import("../geom/Geometry.js").default} */
        e
      );
    }) : this.geometryFunction_ = ig, this.geometry_ = e;
  }
  /**
   * Set the z-index.
   *
   * @param {number|undefined} zIndex ZIndex.
   * @api
   */
  setZIndex(e) {
    this.zIndex_ = e;
  }
}
function EE(t) {
  let e;
  if (typeof t == "function")
    e = t;
  else {
    let n;
    Array.isArray(t) ? n = t : (ee(
      typeof /** @type {?} */
      t.getZIndex == "function",
      "Expected an `Style` or an array of `Style`"
    ), n = [
      /** @type {Style} */
      t
    ]), e = function() {
      return n;
    };
  }
  return e;
}
let yu = null;
function T_(t, e) {
  if (!yu) {
    const n = new yo({
      color: "rgba(255,255,255,0.4)"
    }), i = new Ta({
      color: "#3399CC",
      width: 1.25
    });
    yu = [
      new Li({
        image: new Ra({
          fill: n,
          stroke: i,
          radius: 5
        }),
        fill: n,
        stroke: i
      })
    ];
  }
  return yu;
}
function ig(t) {
  return t.getGeometry();
}
function rg(t, e, n, i) {
  return n !== void 0 && i !== void 0 ? [n / t, i / e] : n !== void 0 ? n / t : i !== void 0 ? i / e : 1;
}
class Ia extends wa {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = e.opacity !== void 0 ? e.opacity : 1, i = e.rotation !== void 0 ? e.rotation : 0, r = e.scale !== void 0 ? e.scale : 1, s = e.rotateWithView !== void 0 ? e.rotateWithView : !1;
    super({
      opacity: n,
      rotation: i,
      scale: r,
      displacement: e.displacement !== void 0 ? e.displacement : [0, 0],
      rotateWithView: s,
      declutterMode: e.declutterMode
    }), this.anchor_ = e.anchor !== void 0 ? e.anchor : [0.5, 0.5], this.normalizedAnchor_ = null, this.anchorOrigin_ = e.anchorOrigin !== void 0 ? e.anchorOrigin : "top-left", this.anchorXUnits_ = e.anchorXUnits !== void 0 ? e.anchorXUnits : "fraction", this.anchorYUnits_ = e.anchorYUnits !== void 0 ? e.anchorYUnits : "fraction", this.crossOrigin_ = e.crossOrigin !== void 0 ? e.crossOrigin : null;
    const o = e.img !== void 0 ? e.img : null;
    let l = e.src;
    ee(
      !(l !== void 0 && o),
      "`image` and `src` cannot be provided at the same time"
    ), (l === void 0 || l.length === 0) && o && (l = /** @type {HTMLImageElement} */
    o.src || ie(o)), ee(
      l !== void 0 && l.length > 0,
      "A defined and non-empty `src` or `image` must be provided"
    ), ee(
      !((e.width !== void 0 || e.height !== void 0) && e.scale !== void 0),
      "`width` or `height` cannot be provided together with `scale`"
    );
    let a;
    if (e.src !== void 0 ? a = Z.IDLE : o !== void 0 && ("complete" in o ? o.complete ? a = o.src ? Z.LOADED : Z.IDLE : a = Z.LOADING : a = Z.LOADED), this.color_ = e.color !== void 0 ? to(e.color) : null, this.iconImage_ = Qh(
      o,
      /** @type {string} */
      l,
      this.crossOrigin_,
      a,
      this.color_
    ), this.offset_ = e.offset !== void 0 ? e.offset : [0, 0], this.offsetOrigin_ = e.offsetOrigin !== void 0 ? e.offsetOrigin : "top-left", this.origin_ = null, this.size_ = e.size !== void 0 ? e.size : null, this.initialOptions_, e.width !== void 0 || e.height !== void 0) {
      let u, c;
      if (e.size)
        [u, c] = e.size;
      else {
        const h = this.getImage(1);
        if (h.width && h.height)
          u = h.width, c = h.height;
        else if (h instanceof HTMLImageElement) {
          this.initialOptions_ = e;
          const d = () => {
            if (this.unlistenImageChange(d), !this.initialOptions_)
              return;
            const f = this.iconImage_.getSize();
            this.setScale(
              rg(
                f[0],
                f[1],
                e.width,
                e.height
              )
            );
          };
          this.listenImageChange(d);
          return;
        }
      }
      u !== void 0 && this.setScale(
        rg(u, c, e.width, e.height)
      );
    }
  }
  /**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   * @override
   */
  clone() {
    let e, n, i;
    return this.initialOptions_ ? (n = this.initialOptions_.width, i = this.initialOptions_.height) : (e = this.getScale(), e = Array.isArray(e) ? e.slice() : e), new Ia({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
      crossOrigin: this.crossOrigin_,
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      opacity: this.getOpacity(),
      rotateWithView: this.getRotateWithView(),
      rotation: this.getRotation(),
      scale: e,
      width: n,
      height: i,
      size: this.size_ !== null ? this.size_.slice() : void 0,
      src: this.getSrc(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   * @override
   */
  getAnchor() {
    let e = this.normalizedAnchor_;
    if (!e) {
      e = this.anchor_;
      const r = this.getSize();
      if (this.anchorXUnits_ == "fraction" || this.anchorYUnits_ == "fraction") {
        if (!r)
          return null;
        e = this.anchor_.slice(), this.anchorXUnits_ == "fraction" && (e[0] *= r[0]), this.anchorYUnits_ == "fraction" && (e[1] *= r[1]);
      }
      if (this.anchorOrigin_ != "top-left") {
        if (!r)
          return null;
        e === this.anchor_ && (e = this.anchor_.slice()), (this.anchorOrigin_ == "top-right" || this.anchorOrigin_ == "bottom-right") && (e[0] = -e[0] + r[0]), (this.anchorOrigin_ == "bottom-left" || this.anchorOrigin_ == "bottom-right") && (e[1] = -e[1] + r[1]);
      }
      this.normalizedAnchor_ = e;
    }
    const n = this.getDisplacement(), i = this.getScaleArray();
    return [
      e[0] - n[0] / i[0],
      e[1] + n[1] / i[1]
    ];
  }
  /**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */
  setAnchor(e) {
    this.anchor_ = e, this.normalizedAnchor_ = null;
  }
  /**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element. If the Icon
   * style was configured with `src` or with a not let loaded `img`, an `ImageBitmap` will be returned.
   * @api
   * @override
   */
  getImage(e) {
    return this.iconImage_.getImage(e);
  }
  /**
   * Get the pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} The pixel ratio of the image.
   * @api
   * @override
   */
  getPixelRatio(e) {
    return this.iconImage_.getPixelRatio(e);
  }
  /**
   * @return {import("../size.js").Size} Image size.
   * @override
   */
  getImageSize() {
    return this.iconImage_.getSize();
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   * @override
   */
  getImageState() {
    return this.iconImage_.getImageState();
  }
  /**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   * @override
   */
  getHitDetectionImage() {
    return this.iconImage_.getHitDetectionImage();
  }
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   * @override
   */
  getOrigin() {
    if (this.origin_)
      return this.origin_;
    let e = this.offset_;
    if (this.offsetOrigin_ != "top-left") {
      const n = this.getSize(), i = this.iconImage_.getSize();
      if (!n || !i)
        return null;
      e = e.slice(), (this.offsetOrigin_ == "top-right" || this.offsetOrigin_ == "bottom-right") && (e[0] = i[0] - n[0] - e[0]), (this.offsetOrigin_ == "bottom-left" || this.offsetOrigin_ == "bottom-right") && (e[1] = i[1] - n[1] - e[1]);
    }
    return this.origin_ = e, this.origin_;
  }
  /**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */
  getSrc() {
    return this.iconImage_.getSrc();
  }
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   * @api
   * @override
   */
  getSize() {
    return this.size_ ? this.size_ : this.iconImage_.getSize();
  }
  /**
   * Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon width (in pixels).
   * @api
   */
  getWidth() {
    const e = this.getScaleArray();
    if (this.size_)
      return this.size_[0] * e[0];
    if (this.iconImage_.getImageState() == Z.LOADED)
      return this.iconImage_.getSize()[0] * e[0];
  }
  /**
   * Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon height (in pixels).
   * @api
   */
  getHeight() {
    const e = this.getScaleArray();
    if (this.size_)
      return this.size_[1] * e[1];
    if (this.iconImage_.getImageState() == Z.LOADED)
      return this.iconImage_.getSize()[1] * e[1];
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   * @override
   */
  setScale(e) {
    delete this.initialOptions_, super.setScale(e);
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   * @override
   */
  listenImageChange(e) {
    this.iconImage_.addEventListener(V.CHANGE, e);
  }
  /**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @api
   * @override
   */
  load() {
    this.iconImage_.load();
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   * @override
   */
  unlistenImageChange(e) {
    this.iconImage_.removeEventListener(V.CHANGE, e);
  }
  /**
   * @override
   */
  ready() {
    return this.iconImage_.ready();
  }
}
const xE = "#333";
class ed {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, this.font_ = e.font, this.rotation_ = e.rotation, this.rotateWithView_ = e.rotateWithView, this.scale_ = e.scale, this.scaleArray_ = st(e.scale !== void 0 ? e.scale : 1), this.text_ = e.text, this.textAlign_ = e.textAlign, this.justify_ = e.justify, this.repeat_ = e.repeat, this.textBaseline_ = e.textBaseline, this.fill_ = e.fill !== void 0 ? e.fill : new yo({ color: xE }), this.maxAngle_ = e.maxAngle !== void 0 ? e.maxAngle : Math.PI / 4, this.placement_ = e.placement !== void 0 ? e.placement : "point", this.overflow_ = !!e.overflow, this.stroke_ = e.stroke !== void 0 ? e.stroke : null, this.offsetX_ = e.offsetX !== void 0 ? e.offsetX : 0, this.offsetY_ = e.offsetY !== void 0 ? e.offsetY : 0, this.backgroundFill_ = e.backgroundFill ? e.backgroundFill : null, this.backgroundStroke_ = e.backgroundStroke ? e.backgroundStroke : null, this.padding_ = e.padding === void 0 ? null : e.padding, this.declutterMode_ = e.declutterMode;
  }
  /**
   * Clones the style.
   * @return {Text} The cloned style.
   * @api
   */
  clone() {
    const e = this.getScale();
    return new ed({
      font: this.getFont(),
      placement: this.getPlacement(),
      repeat: this.getRepeat(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(e) ? e.slice() : e,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      justify: this.getJustify(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
      padding: this.getPadding() || void 0,
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the `overflow` configuration.
   * @return {boolean} Let text overflow the length of the path they follow.
   * @api
   */
  getOverflow() {
    return this.overflow_;
  }
  /**
   * Get the font name.
   * @return {string|undefined} Font.
   * @api
   */
  getFont() {
    return this.font_;
  }
  /**
   * Get the maximum angle between adjacent characters.
   * @return {number} Angle in radians.
   * @api
   */
  getMaxAngle() {
    return this.maxAngle_;
  }
  /**
   * Get the label placement.
   * @return {TextPlacement} Text placement.
   * @api
   */
  getPlacement() {
    return this.placement_;
  }
  /**
   * Get the repeat interval of the text.
   * @return {number|undefined} Repeat interval in pixels.
   * @api
   */
  getRepeat() {
    return this.repeat_;
  }
  /**
   * Get the x-offset for the text.
   * @return {number} Horizontal text offset.
   * @api
   */
  getOffsetX() {
    return this.offsetX_;
  }
  /**
   * Get the y-offset for the text.
   * @return {number} Vertical text offset.
   * @api
   */
  getOffsetY() {
    return this.offsetY_;
  }
  /**
   * Get the fill style for the text.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Determine whether the text rotates with the map.
   * @return {boolean|undefined} Rotate with map.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Get the text rotation.
   * @return {number|undefined} Rotation.
   * @api
   */
  getRotation() {
    return this.rotation_;
  }
  /**
   * Get the text scale.
   * @return {number|import("../size.js").Size|undefined} Scale.
   * @api
   */
  getScale() {
    return this.scale_;
  }
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */
  getScaleArray() {
    return this.scaleArray_;
  }
  /**
   * Get the stroke style for the text.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Get the text to be rendered.
   * @return {string|Array<string>|undefined} Text.
   * @api
   */
  getText() {
    return this.text_;
  }
  /**
   * Get the text alignment.
   * @return {CanvasTextAlign|undefined} Text align.
   * @api
   */
  getTextAlign() {
    return this.textAlign_;
  }
  /**
   * Get the justification.
   * @return {TextJustify|undefined} Justification.
   * @api
   */
  getJustify() {
    return this.justify_;
  }
  /**
   * Get the text baseline.
   * @return {CanvasTextBaseline|undefined} Text baseline.
   * @api
   */
  getTextBaseline() {
    return this.textBaseline_;
  }
  /**
   * Get the background fill style for the text.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getBackgroundFill() {
    return this.backgroundFill_;
  }
  /**
   * Get the background stroke style for the text.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getBackgroundStroke() {
    return this.backgroundStroke_;
  }
  /**
   * Get the padding for the text.
   * @return {Array<number>|null} Padding.
   * @api
   */
  getPadding() {
    return this.padding_;
  }
  /**
   * Get the declutter mode of the shape
   * @return {import("./Style.js").DeclutterMode} Shape's declutter mode
   * @api
   */
  getDeclutterMode() {
    return this.declutterMode_;
  }
  /**
   * Set the `overflow` property.
   *
   * @param {boolean} overflow Let text overflow the path that it follows.
   * @api
   */
  setOverflow(e) {
    this.overflow_ = e;
  }
  /**
   * Set the font.
   *
   * @param {string|undefined} font Font.
   * @api
   */
  setFont(e) {
    this.font_ = e;
  }
  /**
   * Set the maximum angle between adjacent characters.
   *
   * @param {number} maxAngle Angle in radians.
   * @api
   */
  setMaxAngle(e) {
    this.maxAngle_ = e;
  }
  /**
   * Set the x offset.
   *
   * @param {number} offsetX Horizontal text offset.
   * @api
   */
  setOffsetX(e) {
    this.offsetX_ = e;
  }
  /**
   * Set the y offset.
   *
   * @param {number} offsetY Vertical text offset.
   * @api
   */
  setOffsetY(e) {
    this.offsetY_ = e;
  }
  /**
   * Set the text placement.
   *
   * @param {TextPlacement} placement Placement.
   * @api
   */
  setPlacement(e) {
    this.placement_ = e;
  }
  /**
   * Set the repeat interval of the text.
   * @param {number|undefined} [repeat] Repeat interval in pixels.
   * @api
   */
  setRepeat(e) {
    this.repeat_ = e;
  }
  /**
   * Set whether to rotate the text with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */
  setRotateWithView(e) {
    this.rotateWithView_ = e;
  }
  /**
   * Set the fill.
   *
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(e) {
    this.fill_ = e;
  }
  /**
   * Set the rotation.
   *
   * @param {number|undefined} rotation Rotation.
   * @api
   */
  setRotation(e) {
    this.rotation_ = e;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size|undefined} scale Scale.
   * @api
   */
  setScale(e) {
    this.scale_ = e, this.scaleArray_ = st(e !== void 0 ? e : 1);
  }
  /**
   * Set the stroke.
   *
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(e) {
    this.stroke_ = e;
  }
  /**
   * Set the text.
   *
   * @param {string|Array<string>|undefined} text Text.
   * @api
   */
  setText(e) {
    this.text_ = e;
  }
  /**
   * Set the text alignment.
   *
   * @param {CanvasTextAlign|undefined} textAlign Text align.
   * @api
   */
  setTextAlign(e) {
    this.textAlign_ = e;
  }
  /**
   * Set the justification.
   *
   * @param {TextJustify|undefined} justify Justification.
   * @api
   */
  setJustify(e) {
    this.justify_ = e;
  }
  /**
   * Set the text baseline.
   *
   * @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
   * @api
   */
  setTextBaseline(e) {
    this.textBaseline_ = e;
  }
  /**
   * Set the background fill.
   *
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setBackgroundFill(e) {
    this.backgroundFill_ = e;
  }
  /**
   * Set the background stroke.
   *
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setBackgroundStroke(e) {
    this.backgroundStroke_ = e;
  }
  /**
   * Set the padding (`[top, right, bottom, left]`).
   *
   * @param {Array<number>|null} padding Padding.
   * @api
   */
  setPadding(e) {
    this.padding_ = e;
  }
}
let Wi = 0;
const Ze = 1 << Wi++, $ = 1 << Wi++, tt = 1 << Wi++, zt = 1 << Wi++, Fi = 1 << Wi++, ys = 1 << Wi++, qo = Math.pow(2, Wi) - 1, td = {
  [Ze]: "boolean",
  [$]: "number",
  [tt]: "string",
  [zt]: "color",
  [Fi]: "number[]",
  [ys]: "size"
}, wE = Object.keys(td).map(Number).sort(vn);
function SE(t) {
  return t in td;
}
function vs(t) {
  const e = [];
  for (const n of wE)
    Es(t, n) && e.push(td[n]);
  return e.length === 0 ? "untyped" : e.length < 3 ? e.join(" or ") : e.slice(0, -1).join(", ") + ", or " + e[e.length - 1];
}
function Es(t, e) {
  return (t & e) === e;
}
function Dn(t, e) {
  return t === e;
}
class Ce {
  /**
   * @param {number} type The value type.
   * @param {LiteralValue} value The literal value.
   */
  constructor(e, n) {
    if (!SE(e))
      throw new Error(
        `literal expressions must have a specific type, got ${vs(e)}`
      );
    this.type = e, this.value = n;
  }
}
class CE {
  /**
   * @param {number} type The return type.
   * @param {string} operator The operator.
   * @param {...Expression} args The arguments.
   */
  constructor(e, n, ...i) {
    this.type = e, this.operator = n, this.args = i;
  }
}
function I_() {
  return {
    variables: /* @__PURE__ */ new Set(),
    properties: /* @__PURE__ */ new Set(),
    featureId: !1,
    geometryType: !1
  };
}
function Ne(t, e, n) {
  switch (typeof t) {
    case "boolean": {
      if (Dn(e, tt))
        return new Ce(tt, t ? "true" : "false");
      if (!Es(e, Ze))
        throw new Error(
          `got a boolean, but expected ${vs(e)}`
        );
      return new Ce(Ze, t);
    }
    case "number": {
      if (Dn(e, ys))
        return new Ce(ys, st(t));
      if (Dn(e, Ze))
        return new Ce(Ze, !!t);
      if (Dn(e, tt))
        return new Ce(tt, t.toString());
      if (!Es(e, $))
        throw new Error(`got a number, but expected ${vs(e)}`);
      return new Ce($, t);
    }
    case "string": {
      if (Dn(e, zt))
        return new Ce(zt, $h(t));
      if (Dn(e, Ze))
        return new Ce(Ze, !!t);
      if (!Es(e, tt))
        throw new Error(`got a string, but expected ${vs(e)}`);
      return new Ce(tt, t);
    }
  }
  if (!Array.isArray(t))
    throw new Error("expression must be an array or a primitive value");
  if (t.length === 0)
    throw new Error("empty expression");
  if (typeof t[0] == "string")
    return FE(t, e, n);
  for (const i of t)
    if (typeof i != "number")
      throw new Error("expected an array of numbers");
  if (Dn(e, ys)) {
    if (t.length !== 2)
      throw new Error(
        `expected an array of two values for a size, got ${t.length}`
      );
    return new Ce(ys, t);
  }
  if (Dn(e, zt)) {
    if (t.length === 3)
      return new Ce(zt, [...t, 1]);
    if (t.length === 4)
      return new Ce(zt, t);
    throw new Error(
      `expected an array of 3 or 4 values for a color, got ${t.length}`
    );
  }
  if (!Es(e, Fi))
    throw new Error(
      `got an array of numbers, but expected ${vs(e)}`
    );
  return new Ce(Fi, t);
}
const R = {
  Get: "get",
  Var: "var",
  Concat: "concat",
  GeometryType: "geometry-type",
  LineMetric: "line-metric",
  Any: "any",
  All: "all",
  Not: "!",
  Resolution: "resolution",
  Zoom: "zoom",
  Time: "time",
  Equal: "==",
  NotEqual: "!=",
  GreaterThan: ">",
  GreaterThanOrEqualTo: ">=",
  LessThan: "<",
  LessThanOrEqualTo: "<=",
  Multiply: "*",
  Divide: "/",
  Add: "+",
  Subtract: "-",
  Clamp: "clamp",
  Mod: "%",
  Pow: "^",
  Abs: "abs",
  Floor: "floor",
  Ceil: "ceil",
  Round: "round",
  Sin: "sin",
  Cos: "cos",
  Atan: "atan",
  Sqrt: "sqrt",
  Match: "match",
  Between: "between",
  Interpolate: "interpolate",
  Coalesce: "coalesce",
  Case: "case",
  In: "in",
  Number: "number",
  String: "string",
  Array: "array",
  Color: "color",
  Id: "id",
  Band: "band",
  Palette: "palette",
  ToString: "to-string",
  Has: "has"
}, RE = {
  [R.Get]: B(b(1, 1 / 0), sg),
  [R.Var]: B(b(1, 1), TE),
  [R.Has]: B(b(1, 1 / 0), sg),
  [R.Id]: B(IE, bi),
  [R.Concat]: B(
    b(2, 1 / 0),
    te(tt)
  ),
  [R.GeometryType]: B(LE, bi),
  [R.LineMetric]: B(bi),
  [R.Resolution]: B(bi),
  [R.Zoom]: B(bi),
  [R.Time]: B(bi),
  [R.Any]: B(
    b(2, 1 / 0),
    te(Ze)
  ),
  [R.All]: B(
    b(2, 1 / 0),
    te(Ze)
  ),
  [R.Not]: B(
    b(1, 1),
    te(Ze)
  ),
  [R.Equal]: B(
    b(2, 2),
    te(qo)
  ),
  [R.NotEqual]: B(
    b(2, 2),
    te(qo)
  ),
  [R.GreaterThan]: B(
    b(2, 2),
    te($)
  ),
  [R.GreaterThanOrEqualTo]: B(
    b(2, 2),
    te($)
  ),
  [R.LessThan]: B(
    b(2, 2),
    te($)
  ),
  [R.LessThanOrEqualTo]: B(
    b(2, 2),
    te($)
  ),
  [R.Multiply]: B(
    b(2, 1 / 0),
    og
  ),
  [R.Coalesce]: B(
    b(2, 1 / 0),
    og
  ),
  [R.Divide]: B(
    b(2, 2),
    te($)
  ),
  [R.Add]: B(
    b(2, 1 / 0),
    te($)
  ),
  [R.Subtract]: B(
    b(2, 2),
    te($)
  ),
  [R.Clamp]: B(
    b(3, 3),
    te($)
  ),
  [R.Mod]: B(
    b(2, 2),
    te($)
  ),
  [R.Pow]: B(
    b(2, 2),
    te($)
  ),
  [R.Abs]: B(
    b(1, 1),
    te($)
  ),
  [R.Floor]: B(
    b(1, 1),
    te($)
  ),
  [R.Ceil]: B(
    b(1, 1),
    te($)
  ),
  [R.Round]: B(
    b(1, 1),
    te($)
  ),
  [R.Sin]: B(
    b(1, 1),
    te($)
  ),
  [R.Cos]: B(
    b(1, 1),
    te($)
  ),
  [R.Atan]: B(
    b(1, 2),
    te($)
  ),
  [R.Sqrt]: B(
    b(1, 1),
    te($)
  ),
  [R.Match]: B(
    b(4, 1 / 0),
    lg,
    ME
  ),
  [R.Between]: B(
    b(3, 3),
    te($)
  ),
  [R.Interpolate]: B(
    b(6, 1 / 0),
    lg,
    PE
  ),
  [R.Case]: B(
    b(3, 1 / 0),
    kE,
    AE
  ),
  [R.In]: B(b(2, 2), DE),
  [R.Number]: B(
    b(1, 1 / 0),
    te(qo)
  ),
  [R.String]: B(
    b(1, 1 / 0),
    te(qo)
  ),
  [R.Array]: B(
    b(1, 1 / 0),
    te($)
  ),
  [R.Color]: B(
    b(1, 4),
    te($)
  ),
  [R.Band]: B(
    b(1, 3),
    te($)
  ),
  [R.Palette]: B(
    b(2, 2),
    OE
  ),
  [R.ToString]: B(
    b(1, 1),
    te(Ze | $ | tt | zt)
  )
};
function sg(t, e, n) {
  const i = t.length - 1, r = new Array(i);
  for (let s = 0; s < i; ++s) {
    const o = t[s + 1];
    switch (typeof o) {
      case "number": {
        r[s] = new Ce($, o);
        break;
      }
      case "string": {
        r[s] = new Ce(tt, o);
        break;
      }
      default:
        throw new Error(
          `expected a string key or numeric array index for a get operation, got ${o}`
        );
    }
    s === 0 && n.properties.add(String(o));
  }
  return r;
}
function TE(t, e, n) {
  const i = t[1];
  if (typeof i != "string")
    throw new Error("expected a string argument for var operation");
  return n.variables.add(i), [new Ce(tt, i)];
}
function IE(t, e, n) {
  n.featureId = !0;
}
function LE(t, e, n) {
  n.geometryType = !0;
}
function bi(t, e, n) {
  const i = t[0];
  if (t.length !== 1)
    throw new Error(`expected no arguments for ${i} operation`);
  return [];
}
function b(t, e) {
  return function(n, i, r) {
    const s = n[0], o = n.length - 1;
    if (t === e) {
      if (o !== t) {
        const l = t === 1 ? "" : "s";
        throw new Error(
          `expected ${t} argument${l} for ${s}, got ${o}`
        );
      }
    } else if (o < t || o > e) {
      const l = e === 1 / 0 ? `${t} or more` : `${t} to ${e}`;
      throw new Error(
        `expected ${l} arguments for ${s}, got ${o}`
      );
    }
  };
}
function og(t, e, n) {
  const i = t.length - 1, r = new Array(i);
  for (let s = 0; s < i; ++s) {
    const o = Ne(t[s + 1], e, n);
    r[s] = o;
  }
  return r;
}
function te(t) {
  return function(e, n, i) {
    const r = e.length - 1, s = new Array(r);
    for (let o = 0; o < r; ++o) {
      const l = Ne(e[o + 1], t, i);
      s[o] = l;
    }
    return s;
  };
}
function kE(t, e, n) {
  const i = t[0], r = t.length - 1;
  if (r % 2 === 0)
    throw new Error(
      `expected an odd number of arguments for ${i}, got ${r} instead`
    );
}
function lg(t, e, n) {
  const i = t[0], r = t.length - 1;
  if (r % 2 === 1)
    throw new Error(
      `expected an even number of arguments for operation ${i}, got ${r} instead`
    );
}
function ME(t, e, n) {
  const i = t.length - 1, r = tt | $ | Ze, s = Ne(t[1], r, n), o = Ne(t[t.length - 1], e, n), l = new Array(i - 2);
  for (let a = 0; a < i - 2; a += 2) {
    try {
      const u = Ne(t[a + 2], s.type, n);
      l[a] = u;
    } catch (u) {
      throw new Error(
        `failed to parse argument ${a + 1} of match expression: ${u.message}`
      );
    }
    try {
      const u = Ne(t[a + 3], o.type, n);
      l[a + 1] = u;
    } catch (u) {
      throw new Error(
        `failed to parse argument ${a + 2} of match expression: ${u.message}`
      );
    }
  }
  return [s, ...l, o];
}
function PE(t, e, n) {
  const i = t[1];
  let r;
  switch (i[0]) {
    case "linear":
      r = 1;
      break;
    case "exponential":
      const a = i[1];
      if (typeof a != "number" || a <= 0)
        throw new Error(
          `expected a number base for exponential interpolation, got ${JSON.stringify(a)} instead`
        );
      r = a;
      break;
    default:
      throw new Error(
        `invalid interpolation type: ${JSON.stringify(i)}`
      );
  }
  const s = new Ce($, r);
  let o;
  try {
    o = Ne(t[2], $, n);
  } catch (a) {
    throw new Error(
      `failed to parse argument 1 in interpolate expression: ${a.message}`
    );
  }
  const l = new Array(t.length - 3);
  for (let a = 0; a < l.length; a += 2) {
    try {
      const u = Ne(t[a + 3], $, n);
      l[a] = u;
    } catch (u) {
      throw new Error(
        `failed to parse argument ${a + 2} for interpolate expression: ${u.message}`
      );
    }
    try {
      const u = Ne(t[a + 4], e, n);
      l[a + 1] = u;
    } catch (u) {
      throw new Error(
        `failed to parse argument ${a + 3} for interpolate expression: ${u.message}`
      );
    }
  }
  return [s, o, ...l];
}
function AE(t, e, n) {
  const i = Ne(t[t.length - 1], e, n), r = new Array(t.length - 1);
  for (let s = 0; s < r.length - 1; s += 2) {
    try {
      const o = Ne(t[s + 1], Ze, n);
      r[s] = o;
    } catch (o) {
      throw new Error(
        `failed to parse argument ${s} of case expression: ${o.message}`
      );
    }
    try {
      const o = Ne(t[s + 2], i.type, n);
      r[s + 1] = o;
    } catch (o) {
      throw new Error(
        `failed to parse argument ${s + 1} of case expression: ${o.message}`
      );
    }
  }
  return r[r.length - 1] = i, r;
}
function DE(t, e, n) {
  let i = t[2];
  if (!Array.isArray(i))
    throw new Error(
      'the second argument for the "in" operator must be an array'
    );
  let r;
  if (typeof i[0] == "string") {
    if (i[0] !== "literal")
      throw new Error(
        'for the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions'
      );
    if (!Array.isArray(i[1]))
      throw new Error(
        'failed to parse "in" expression: the literal operator must be followed by an array'
      );
    i = i[1], r = tt;
  } else
    r = $;
  const s = new Array(i.length);
  for (let l = 0; l < s.length; l++)
    try {
      const a = Ne(i[l], r, n);
      s[l] = a;
    } catch (a) {
      throw new Error(
        `failed to parse haystack item ${l} for "in" expression: ${a.message}`
      );
    }
  return [Ne(t[1], r, n), ...s];
}
function OE(t, e, n) {
  let i;
  try {
    i = Ne(t[1], $, n);
  } catch (o) {
    throw new Error(
      `failed to parse first argument in palette expression: ${o.message}`
    );
  }
  const r = t[2];
  if (!Array.isArray(r))
    throw new Error("the second argument of palette must be an array");
  const s = new Array(r.length);
  for (let o = 0; o < s.length; o++) {
    let l;
    try {
      l = Ne(r[o], zt, n);
    } catch (a) {
      throw new Error(
        `failed to parse color at index ${o} in palette expression: ${a.message}`
      );
    }
    if (!(l instanceof Ce))
      throw new Error(
        `the palette color at index ${o} must be a literal value`
      );
    s[o] = l;
  }
  return [i, ...s];
}
function B(...t) {
  return function(e, n, i) {
    const r = e[0];
    let s;
    for (let o = 0; o < t.length; o++) {
      const l = t[o](e, n, i);
      if (o == t.length - 1) {
        if (!l)
          throw new Error(
            "expected last argument validator to return the parsed args"
          );
        s = l;
      }
    }
    return new CE(n, r, ...s);
  };
}
function FE(t, e, n) {
  const i = t[0], r = RE[i];
  if (!r)
    throw new Error(`unknown operator: ${i}`);
  return r(t, e, n);
}
function L_(t) {
  if (!t)
    return "";
  const e = t.getType();
  switch (e) {
    case "Point":
    case "LineString":
    case "Polygon":
      return e;
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
      return (
        /** @type {'Point'|'LineString'|'Polygon'} */
        e.substring(5)
      );
    case "Circle":
      return "Polygon";
    case "GeometryCollection":
      return L_(
        /** @type {import("../geom/GeometryCollection.js").default} */
        t.getGeometries()[0]
      );
    default:
      return "";
  }
}
function k_() {
  return {
    variables: {},
    properties: {},
    resolution: NaN,
    featureId: null,
    geometryType: ""
  };
}
function Mn(t, e, n) {
  const i = Ne(t, e, n);
  return Ut(i);
}
function Ut(t, e) {
  if (t instanceof Ce) {
    if (t.type === zt && typeof t.value == "string") {
      const i = $h(t.value);
      return function() {
        return i;
      };
    }
    return function() {
      return t.value;
    };
  }
  const n = t.operator;
  switch (n) {
    case R.Number:
    case R.String:
    case R.Coalesce:
      return NE(t);
    case R.Get:
    case R.Var:
    case R.Has:
      return zE(t);
    case R.Id:
      return (i) => i.featureId;
    case R.GeometryType:
      return (i) => i.geometryType;
    case R.Concat: {
      const i = t.args.map((r) => Ut(r));
      return (r) => "".concat(...i.map((s) => s(r).toString()));
    }
    case R.Resolution:
      return (i) => i.resolution;
    case R.Any:
    case R.All:
    case R.Between:
    case R.In:
    case R.Not:
      return WE(t);
    case R.Equal:
    case R.NotEqual:
    case R.LessThan:
    case R.LessThanOrEqualTo:
    case R.GreaterThan:
    case R.GreaterThanOrEqualTo:
      return GE(t);
    case R.Multiply:
    case R.Divide:
    case R.Add:
    case R.Subtract:
    case R.Clamp:
    case R.Mod:
    case R.Pow:
    case R.Abs:
    case R.Floor:
    case R.Ceil:
    case R.Round:
    case R.Sin:
    case R.Cos:
    case R.Atan:
    case R.Sqrt:
      return XE(t);
    case R.Case:
      return jE(t);
    case R.Match:
      return YE(t);
    case R.Interpolate:
      return UE(t);
    case R.ToString:
      return BE(t);
    default:
      throw new Error(`Unsupported operator ${n}`);
  }
}
function NE(t, e) {
  const n = t.operator, i = t.args.length, r = new Array(i);
  for (let s = 0; s < i; ++s)
    r[s] = Ut(t.args[s]);
  switch (n) {
    case R.Coalesce:
      return (s) => {
        for (let o = 0; o < i; ++o) {
          const l = r[o](s);
          if (typeof l < "u" && l !== null)
            return l;
        }
        throw new Error("Expected one of the values to be non-null");
      };
    case R.Number:
    case R.String:
      return (s) => {
        for (let o = 0; o < i; ++o) {
          const l = r[o](s);
          if (typeof l === n)
            return l;
        }
        throw new Error(`Expected one of the values to be a ${n}`);
      };
    default:
      throw new Error(`Unsupported assertion operator ${n}`);
  }
}
function zE(t, e) {
  const i = (
    /** @type {string} */
    /** @type {LiteralExpression} */
    t.args[0].value
  );
  switch (t.operator) {
    case R.Get:
      return (r) => {
        const s = t.args;
        let o = r.properties[i];
        for (let l = 1, a = s.length; l < a; ++l) {
          const c = (
            /** @type {string|number} */
            /** @type {LiteralExpression} */
            s[l].value
          );
          o = o[c];
        }
        return o;
      };
    case R.Var:
      return (r) => r.variables[i];
    case R.Has:
      return (r) => {
        const s = t.args;
        if (!(i in r.properties))
          return !1;
        let o = r.properties[i];
        for (let l = 1, a = s.length; l < a; ++l) {
          const c = (
            /** @type {string|number} */
            /** @type {LiteralExpression} */
            s[l].value
          );
          if (!o || !Object.hasOwn(o, c))
            return !1;
          o = o[c];
        }
        return !0;
      };
    default:
      throw new Error(`Unsupported accessor operator ${t.operator}`);
  }
}
function GE(t, e) {
  const n = t.operator, i = Ut(t.args[0]), r = Ut(t.args[1]);
  switch (n) {
    case R.Equal:
      return (s) => i(s) === r(s);
    case R.NotEqual:
      return (s) => i(s) !== r(s);
    case R.LessThan:
      return (s) => i(s) < r(s);
    case R.LessThanOrEqualTo:
      return (s) => i(s) <= r(s);
    case R.GreaterThan:
      return (s) => i(s) > r(s);
    case R.GreaterThanOrEqualTo:
      return (s) => i(s) >= r(s);
    default:
      throw new Error(`Unsupported comparison operator ${n}`);
  }
}
function WE(t, e) {
  const n = t.operator, i = t.args.length, r = new Array(i);
  for (let s = 0; s < i; ++s)
    r[s] = Ut(t.args[s]);
  switch (n) {
    case R.Any:
      return (s) => {
        for (let o = 0; o < i; ++o)
          if (r[o](s))
            return !0;
        return !1;
      };
    case R.All:
      return (s) => {
        for (let o = 0; o < i; ++o)
          if (!r[o](s))
            return !1;
        return !0;
      };
    case R.Between:
      return (s) => {
        const o = r[0](s), l = r[1](s), a = r[2](s);
        return o >= l && o <= a;
      };
    case R.In:
      return (s) => {
        const o = r[0](s);
        for (let l = 1; l < i; ++l)
          if (o === r[l](s))
            return !0;
        return !1;
      };
    case R.Not:
      return (s) => !r[0](s);
    default:
      throw new Error(`Unsupported logical operator ${n}`);
  }
}
function XE(t, e) {
  const n = t.operator, i = t.args.length, r = new Array(i);
  for (let s = 0; s < i; ++s)
    r[s] = Ut(t.args[s]);
  switch (n) {
    case R.Multiply:
      return (s) => {
        let o = 1;
        for (let l = 0; l < i; ++l)
          o *= r[l](s);
        return o;
      };
    case R.Divide:
      return (s) => r[0](s) / r[1](s);
    case R.Add:
      return (s) => {
        let o = 0;
        for (let l = 0; l < i; ++l)
          o += r[l](s);
        return o;
      };
    case R.Subtract:
      return (s) => r[0](s) - r[1](s);
    case R.Clamp:
      return (s) => {
        const o = r[0](s), l = r[1](s);
        if (o < l)
          return l;
        const a = r[2](s);
        return o > a ? a : o;
      };
    case R.Mod:
      return (s) => r[0](s) % r[1](s);
    case R.Pow:
      return (s) => Math.pow(r[0](s), r[1](s));
    case R.Abs:
      return (s) => Math.abs(r[0](s));
    case R.Floor:
      return (s) => Math.floor(r[0](s));
    case R.Ceil:
      return (s) => Math.ceil(r[0](s));
    case R.Round:
      return (s) => Math.round(r[0](s));
    case R.Sin:
      return (s) => Math.sin(r[0](s));
    case R.Cos:
      return (s) => Math.cos(r[0](s));
    case R.Atan:
      return i === 2 ? (s) => Math.atan2(r[0](s), r[1](s)) : (s) => Math.atan(r[0](s));
    case R.Sqrt:
      return (s) => Math.sqrt(r[0](s));
    default:
      throw new Error(`Unsupported numeric operator ${n}`);
  }
}
function jE(t, e) {
  const n = t.args.length, i = new Array(n);
  for (let r = 0; r < n; ++r)
    i[r] = Ut(t.args[r]);
  return (r) => {
    for (let s = 0; s < n - 1; s += 2)
      if (i[s](r))
        return i[s + 1](r);
    return i[n - 1](r);
  };
}
function YE(t, e) {
  const n = t.args.length, i = new Array(n);
  for (let r = 0; r < n; ++r)
    i[r] = Ut(t.args[r]);
  return (r) => {
    const s = i[0](r);
    for (let o = 1; o < n; o += 2)
      if (s === i[o](r))
        return i[o + 1](r);
    return i[n - 1](r);
  };
}
function UE(t, e) {
  const n = t.args.length, i = new Array(n);
  for (let r = 0; r < n; ++r)
    i[r] = Ut(t.args[r]);
  return (r) => {
    const s = i[0](r), o = i[1](r);
    let l, a;
    for (let u = 2; u < n; u += 2) {
      const c = i[u](r);
      let h = i[u + 1](r);
      const d = Array.isArray(h);
      if (d && (h = tE(h)), c >= o)
        return u === 2 ? h : d ? VE(
          s,
          o,
          l,
          a,
          c,
          h
        ) : xs(
          s,
          o,
          l,
          a,
          c,
          h
        );
      l = c, a = h;
    }
    return a;
  };
}
function BE(t, e) {
  const n = t.operator, i = t.args.length, r = new Array(i);
  for (let s = 0; s < i; ++s)
    r[s] = Ut(t.args[s]);
  switch (n) {
    case R.ToString:
      return (s) => {
        const o = r[0](s);
        return t.args[0].type === zt ? qh(o) : o.toString();
      };
    default:
      throw new Error(`Unsupported convert operator ${n}`);
  }
}
function xs(t, e, n, i, r, s) {
  const o = r - n;
  if (o === 0)
    return i;
  const l = e - n, a = t === 1 ? l / o : (Math.pow(t, l) - 1) / (Math.pow(t, o) - 1);
  return i + a * (s - i);
}
function VE(t, e, n, i, r, s) {
  if (r - n === 0)
    return i;
  const l = Qf(i), a = Qf(s);
  let u = a[2] - l[2];
  u > 180 ? u -= 360 : u < -180 && (u += 360);
  const c = [
    xs(t, e, n, l[0], r, a[0]),
    xs(t, e, n, l[1], r, a[1]),
    l[2] + xs(t, e, n, 0, r, u),
    xs(t, e, n, i[3], r, s[3])
  ];
  return __(nE(c));
}
function KE(t) {
  return !0;
}
function bE(t) {
  const e = I_(), n = ZE(t, e), i = k_();
  return function(r, s) {
    if (i.properties = r.getPropertiesInternal(), i.resolution = s, e.featureId) {
      const o = r.getId();
      o !== void 0 ? i.featureId = o : i.featureId = null;
    }
    return e.geometryType && (i.geometryType = L_(
      r.getGeometry()
    )), n(i);
  };
}
function ag(t) {
  const e = I_(), n = t.length, i = new Array(n);
  for (let o = 0; o < n; ++o)
    i[o] = Ic(t[o], e);
  const r = k_(), s = new Array(n);
  return function(o, l) {
    if (r.properties = o.getPropertiesInternal(), r.resolution = l, e.featureId) {
      const u = o.getId();
      u !== void 0 ? r.featureId = u : r.featureId = null;
    }
    let a = 0;
    for (let u = 0; u < n; ++u) {
      const c = i[u](r);
      c && (s[a] = c, a += 1);
    }
    return s.length = a, s;
  };
}
function ZE(t, e) {
  const n = t.length, i = new Array(n);
  for (let r = 0; r < n; ++r) {
    const s = t[r], o = "filter" in s ? Mn(s.filter, Ze, e) : KE;
    let l;
    if (Array.isArray(s.style)) {
      const a = s.style.length;
      l = new Array(a);
      for (let u = 0; u < a; ++u)
        l[u] = Ic(s.style[u], e);
    } else
      l = [Ic(s.style, e)];
    i[r] = { filter: o, styles: l };
  }
  return function(r) {
    const s = [];
    let o = !1;
    for (let l = 0; l < n; ++l) {
      const a = i[l].filter;
      if (a(r) && !(t[l].else && o)) {
        o = !0;
        for (const u of i[l].styles) {
          const c = u(r);
          c && s.push(c);
        }
      }
    }
    return s;
  };
}
function Ic(t, e) {
  const n = oo(t, "", e), i = lo(t, "", e), r = HE(t, e), s = $E(t, e), o = it(t, "z-index", e);
  if (!n && !i && !r && !s && !zr(t))
    throw new Error(
      "No fill, stroke, point, or text symbolizer properties in style: " + JSON.stringify(t)
    );
  const l = new Li();
  return function(a) {
    let u = !0;
    if (n) {
      const c = n(a);
      c && (u = !1), l.setFill(c);
    }
    if (i) {
      const c = i(a);
      c && (u = !1), l.setStroke(c);
    }
    if (r) {
      const c = r(a);
      c && (u = !1), l.setText(c);
    }
    if (s) {
      const c = s(a);
      c && (u = !1), l.setImage(c);
    }
    return o && l.setZIndex(o(a)), u ? null : l;
  };
}
function oo(t, e, n) {
  let i;
  if (e + "fill-pattern-src" in t)
    i = ex(t, e + "fill-", n);
  else {
    if (t[e + "fill-color"] === "none")
      return (s) => null;
    i = nd(
      t,
      e + "fill-color",
      n
    );
  }
  if (!i)
    return null;
  const r = new yo();
  return function(s) {
    const o = i(s);
    return o === Hh ? null : (r.setColor(o), r);
  };
}
function lo(t, e, n) {
  const i = it(
    t,
    e + "stroke-width",
    n
  ), r = nd(
    t,
    e + "stroke-color",
    n
  );
  if (!i && !r)
    return null;
  const s = pn(
    t,
    e + "stroke-line-cap",
    n
  ), o = pn(
    t,
    e + "stroke-line-join",
    n
  ), l = M_(
    t,
    e + "stroke-line-dash",
    n
  ), a = it(
    t,
    e + "stroke-line-dash-offset",
    n
  ), u = it(
    t,
    e + "stroke-miter-limit",
    n
  ), c = new Ta();
  return function(h) {
    if (r) {
      const d = r(h);
      if (d === Hh)
        return null;
      c.setColor(d);
    }
    if (i && c.setWidth(i(h)), s) {
      const d = s(h);
      if (d !== "butt" && d !== "round" && d !== "square")
        throw new Error("Expected butt, round, or square line cap");
      c.setLineCap(d);
    }
    if (o) {
      const d = o(h);
      if (d !== "bevel" && d !== "round" && d !== "miter")
        throw new Error("Expected bevel, round, or miter line join");
      c.setLineJoin(d);
    }
    return l && c.setLineDash(l(h)), a && c.setLineDashOffset(a(h)), u && c.setMiterLimit(u(h)), c;
  };
}
function HE(t, e) {
  const n = "text-", i = pn(t, n + "value", e);
  if (!i)
    return null;
  const r = oo(t, n, e), s = oo(
    t,
    n + "background-",
    e
  ), o = lo(t, n, e), l = lo(
    t,
    n + "background-",
    e
  ), a = pn(t, n + "font", e), u = it(
    t,
    n + "max-angle",
    e
  ), c = it(
    t,
    n + "offset-x",
    e
  ), h = it(
    t,
    n + "offset-y",
    e
  ), d = ao(
    t,
    n + "overflow",
    e
  ), f = pn(
    t,
    n + "placement",
    e
  ), m = it(t, n + "repeat", e), y = La(t, n + "scale", e), E = ao(
    t,
    n + "rotate-with-view",
    e
  ), p = it(
    t,
    n + "rotation",
    e
  ), g = pn(t, n + "align", e), _ = pn(
    t,
    n + "justify",
    e
  ), v = pn(
    t,
    n + "baseline",
    e
  ), x = M_(
    t,
    n + "padding",
    e
  ), C = ka(
    t,
    n + "declutter-mode"
  ), S = new ed({ declutterMode: C });
  return function(w) {
    if (S.setText(i(w)), r && S.setFill(r(w)), s && S.setBackgroundFill(s(w)), o && S.setStroke(o(w)), l && S.setBackgroundStroke(l(w)), a && S.setFont(a(w)), u && S.setMaxAngle(u(w)), c && S.setOffsetX(c(w)), h && S.setOffsetY(h(w)), d && S.setOverflow(d(w)), f) {
      const T = f(w);
      if (T !== "point" && T !== "line")
        throw new Error("Expected point or line for text-placement");
      S.setPlacement(T);
    }
    if (m && S.setRepeat(m(w)), y && S.setScale(y(w)), E && S.setRotateWithView(E(w)), p && S.setRotation(p(w)), g) {
      const T = g(w);
      if (T !== "left" && T !== "center" && T !== "right" && T !== "end" && T !== "start")
        throw new Error(
          "Expected left, right, center, start, or end for text-align"
        );
      S.setTextAlign(T);
    }
    if (_) {
      const T = _(w);
      if (T !== "left" && T !== "right" && T !== "center")
        throw new Error("Expected left, right, or center for text-justify");
      S.setJustify(T);
    }
    if (v) {
      const T = v(w);
      if (T !== "bottom" && T !== "top" && T !== "middle" && T !== "alphabetic" && T !== "hanging")
        throw new Error(
          "Expected bottom, top, middle, alphabetic, or hanging for text-baseline"
        );
      S.setTextBaseline(T);
    }
    return x && S.setPadding(x(w)), S;
  };
}
function $E(t, e) {
  return "icon-src" in t ? qE(t, e) : "shape-points" in t ? QE(t, e) : "circle-radius" in t ? JE(t, e) : null;
}
function qE(t, e) {
  const n = "icon-", i = n + "src", r = P_(t[i], i), s = Vl(
    t,
    n + "anchor",
    e
  ), o = La(t, n + "scale", e), l = it(
    t,
    n + "opacity",
    e
  ), a = Vl(
    t,
    n + "displacement",
    e
  ), u = it(
    t,
    n + "rotation",
    e
  ), c = ao(
    t,
    n + "rotate-with-view",
    e
  ), h = cg(t, n + "anchor-origin"), d = hg(
    t,
    n + "anchor-x-units"
  ), f = hg(
    t,
    n + "anchor-y-units"
  ), m = rx(t, n + "color"), y = nx(t, n + "cross-origin"), E = ix(t, n + "offset"), p = cg(t, n + "offset-origin"), g = Kl(t, n + "width"), _ = Kl(t, n + "height"), v = tx(t, n + "size"), x = ka(
    t,
    n + "declutter-mode"
  ), C = new Ia({
    src: r,
    anchorOrigin: h,
    anchorXUnits: d,
    anchorYUnits: f,
    color: m,
    crossOrigin: y,
    offset: E,
    offsetOrigin: p,
    height: _,
    width: g,
    size: v,
    declutterMode: x
  });
  return function(S) {
    return l && C.setOpacity(l(S)), a && C.setDisplacement(a(S)), u && C.setRotation(u(S)), c && C.setRotateWithView(c(S)), o && C.setScale(o(S)), s && C.setAnchor(s(S)), C;
  };
}
function QE(t, e) {
  const n = "shape-", i = n + "points", r = n + "radius", s = Lc(t[i], i), o = Lc(t[r], r), l = oo(t, n, e), a = lo(t, n, e), u = La(t, n + "scale", e), c = Vl(
    t,
    n + "displacement",
    e
  ), h = it(
    t,
    n + "rotation",
    e
  ), d = ao(
    t,
    n + "rotate-with-view",
    e
  ), f = Kl(t, n + "radius2"), m = Kl(t, n + "angle"), y = ka(
    t,
    n + "declutter-mode"
  ), E = new Ca({
    points: s,
    radius: o,
    radius2: f,
    angle: m,
    declutterMode: y
  });
  return function(p) {
    return l && E.setFill(l(p)), a && E.setStroke(a(p)), c && E.setDisplacement(c(p)), h && E.setRotation(h(p)), d && E.setRotateWithView(d(p)), u && E.setScale(u(p)), E;
  };
}
function JE(t, e) {
  const n = "circle-", i = oo(t, n, e), r = lo(t, n, e), s = it(t, n + "radius", e), o = La(t, n + "scale", e), l = Vl(
    t,
    n + "displacement",
    e
  ), a = it(
    t,
    n + "rotation",
    e
  ), u = ao(
    t,
    n + "rotate-with-view",
    e
  ), c = ka(
    t,
    n + "declutter-mode"
  ), h = new Ra({
    radius: 5,
    // this is arbitrary, but required - the evaluated radius is used below
    declutterMode: c
  });
  return function(d) {
    return s && h.setRadius(s(d)), i && h.setFill(i(d)), r && h.setStroke(r(d)), l && h.setDisplacement(l(d)), a && h.setRotation(a(d)), u && h.setRotateWithView(u(d)), o && h.setScale(o(d)), h;
  };
}
function it(t, e, n) {
  if (!(e in t))
    return;
  const i = Mn(t[e], $, n);
  return function(r) {
    return Lc(i(r), e);
  };
}
function pn(t, e, n) {
  if (!(e in t))
    return null;
  const i = Mn(t[e], tt, n);
  return function(r) {
    return P_(i(r), e);
  };
}
function ex(t, e, n) {
  const i = pn(
    t,
    e + "pattern-src",
    n
  ), r = ug(
    t,
    e + "pattern-offset",
    n
  ), s = ug(
    t,
    e + "pattern-size",
    n
  ), o = nd(
    t,
    e + "color",
    n
  );
  return function(l) {
    return {
      src: i(l),
      offset: r && r(l),
      size: s && s(l),
      color: o && o(l)
    };
  };
}
function ao(t, e, n) {
  if (!(e in t))
    return null;
  const i = Mn(t[e], Ze, n);
  return function(r) {
    const s = i(r);
    if (typeof s != "boolean")
      throw new Error(`Expected a boolean for ${e}`);
    return s;
  };
}
function nd(t, e, n) {
  if (!(e in t))
    return null;
  const i = Mn(t[e], zt, n);
  return function(r) {
    return A_(i(r), e);
  };
}
function M_(t, e, n) {
  if (!(e in t))
    return null;
  const i = Mn(t[e], Fi, n);
  return function(r) {
    return vo(i(r), e);
  };
}
function Vl(t, e, n) {
  if (!(e in t))
    return null;
  const i = Mn(t[e], Fi, n);
  return function(r) {
    const s = vo(i(r), e);
    if (s.length !== 2)
      throw new Error(`Expected two numbers for ${e}`);
    return s;
  };
}
function ug(t, e, n) {
  if (!(e in t))
    return null;
  const i = Mn(t[e], Fi, n);
  return function(r) {
    return D_(i(r), e);
  };
}
function La(t, e, n) {
  if (!(e in t))
    return null;
  const i = Mn(
    t[e],
    Fi | $,
    n
  );
  return function(r) {
    return sx(i(r), e);
  };
}
function Kl(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (typeof n != "number")
      throw new Error(`Expected a number for ${e}`);
    return n;
  }
}
function tx(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (typeof n == "number")
      return st(n);
    if (!Array.isArray(n))
      throw new Error(`Expected a number or size array for ${e}`);
    if (n.length !== 2 || typeof n[0] != "number" || typeof n[1] != "number")
      throw new Error(`Expected a number or size array for ${e}`);
    return n;
  }
}
function nx(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (typeof n != "string")
      throw new Error(`Expected a string for ${e}`);
    return n;
  }
}
function cg(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (n !== "bottom-left" && n !== "bottom-right" && n !== "top-left" && n !== "top-right")
      throw new Error(
        `Expected bottom-left, bottom-right, top-left, or top-right for ${e}`
      );
    return n;
  }
}
function hg(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (n !== "pixels" && n !== "fraction")
      throw new Error(`Expected pixels or fraction for ${e}`);
    return n;
  }
}
function ix(t, e) {
  const n = t[e];
  if (n !== void 0)
    return vo(n, e);
}
function ka(t, e) {
  const n = t[e];
  if (n !== void 0) {
    if (typeof n != "string")
      throw new Error(`Expected a string for ${e}`);
    if (n !== "declutter" && n !== "obstacle" && n !== "none")
      throw new Error(`Expected declutter, obstacle, or none for ${e}`);
    return n;
  }
}
function rx(t, e) {
  const n = t[e];
  if (n !== void 0)
    return A_(n, e);
}
function vo(t, e) {
  if (!Array.isArray(t))
    throw new Error(`Expected an array for ${e}`);
  const n = t.length;
  for (let i = 0; i < n; ++i)
    if (typeof t[i] != "number")
      throw new Error(`Expected an array of numbers for ${e}`);
  return t;
}
function P_(t, e) {
  if (typeof t != "string")
    throw new Error(`Expected a string for ${e}`);
  return t;
}
function Lc(t, e) {
  if (typeof t != "number")
    throw new Error(`Expected a number for ${e}`);
  return t;
}
function A_(t, e) {
  if (typeof t == "string")
    return t;
  const n = vo(t, e), i = n.length;
  if (i < 3 || i > 4)
    throw new Error(`Expected a color with 3 or 4 values for ${e}`);
  return n;
}
function D_(t, e) {
  const n = vo(t, e);
  if (n.length !== 2)
    throw new Error(`Expected an array of two numbers for ${e}`);
  return n;
}
function sx(t, e) {
  return typeof t == "number" ? t : D_(t, e);
}
const dg = {
  RENDER_ORDER: "renderOrder"
};
class O_ extends xa {
  /**
   * @param {Options<FeatureType, VectorSourceType>} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = Object.assign({}, e);
    delete n.style, delete n.renderBuffer, delete n.updateWhileAnimating, delete n.updateWhileInteracting, super(n), this.declutter_ = e.declutter ? String(e.declutter) : void 0, this.renderBuffer_ = e.renderBuffer !== void 0 ? e.renderBuffer : 100, this.style_ = null, this.styleFunction_ = void 0, this.setStyle(e.style), this.updateWhileAnimating_ = e.updateWhileAnimating !== void 0 ? e.updateWhileAnimating : !1, this.updateWhileInteracting_ = e.updateWhileInteracting !== void 0 ? e.updateWhileInteracting : !1;
  }
  /**
   * @return {string} Declutter group.
   * @override
   */
  getDeclutter() {
    return this.declutter_;
  }
  /**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in [map.getFeaturesAtPixel()]{@link import("../Map.js").default#getFeaturesAtPixel}.
   * Text is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with an array of features.
   * @api
   * @override
   */
  getFeatures(e) {
    return super.getFeatures(e);
  }
  /**
   * @return {number|undefined} Render buffer.
   */
  getRenderBuffer() {
    return this.renderBuffer_;
  }
  /**
   * @return {function(import("../Feature.js").default, import("../Feature.js").default): number|null|undefined} Render
   *     order.
   */
  getRenderOrder() {
    return (
      /** @type {import("../render.js").OrderFunction|null|undefined} */
      this.get(dg.RENDER_ORDER)
    );
  }
  /**
   * Get the style for features.  This returns whatever was passed to the `style`
   * option at construction or to the `setStyle` method.
   * @return {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null|undefined} Layer style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Get the style function.
   * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
   * @api
   */
  getStyleFunction() {
    return this.styleFunction_;
  }
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     animating.
   */
  getUpdateWhileAnimating() {
    return this.updateWhileAnimating_;
  }
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     interacting.
   */
  getUpdateWhileInteracting() {
    return this.updateWhileInteracting_;
  }
  /**
   * Render declutter items for this layer
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {import("../layer/Layer.js").State} layerState Layer state.
   * @override
   */
  renderDeclutter(e, n) {
    const i = this.getDeclutter();
    i in e.declutter || (e.declutter[i] = new p_(9)), this.getRenderer().renderDeclutter(e, n);
  }
  /**
   * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
   *     Render order.
   */
  setRenderOrder(e) {
    this.set(dg.RENDER_ORDER, e);
  }
  /**
   * Set the style for features.  This can be a single style object, an array
   * of styles, or a function that takes a feature and resolution and returns
   * an array of styles. If set to `null`, the layer has no style (a `null` style),
   * so only features that have their own styles will be rendered in the layer. Call
   * `setStyle()` without arguments to reset to the default style. See
   * [the ol/style/Style module]{@link module:ol/style/Style~Style} for information on the default style.
   *
   * If your layer has a static style, you can use [flat style]{@link module:ol/style/flat~FlatStyle} object
   * literals instead of using the `Style` and symbolizer constructors (`Fill`, `Stroke`, etc.):
   * ```js
   * vectorLayer.setStyle({
   *   "fill-color": "yellow",
   *   "stroke-color": "black",
   *   "stroke-width": 4
   * })
   * ```
   *
   * @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
   * @api
   */
  setStyle(e) {
    this.style_ = e === void 0 ? T_ : e;
    const n = ox(e);
    this.styleFunction_ = e === null ? void 0 : EE(n), this.changed();
  }
}
function ox(t) {
  if (t === void 0)
    return T_;
  if (!t)
    return null;
  if (typeof t == "function" || t instanceof Li)
    return t;
  if (!Array.isArray(t))
    return ag([t]);
  if (t.length === 0)
    return [];
  const e = t.length, n = t[0];
  if (n instanceof Li) {
    const r = new Array(e);
    for (let s = 0; s < e; ++s) {
      const o = t[s];
      if (!(o instanceof Li))
        throw new Error("Expected a list of style instances");
      r[s] = o;
    }
    return r;
  }
  if ("style" in n) {
    const r = new Array(e);
    for (let s = 0; s < e; ++s) {
      const o = t[s];
      if (!("style" in o))
        throw new Error("Expected a list of rules with a style property");
      r[s] = o;
    }
    return bE(r);
  }
  return ag(
    /** @type {Array<import("../style/flat.js").FlatStyle>} */
    t
  );
}
class lx extends da {
  /**
   * @param {import("../Map.js").default} map Map.
   */
  constructor(e) {
    super(), this.map_ = e;
  }
  /**
   * @abstract
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  dispatchRenderEvent(e, n) {
    J();
  }
  /**
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @protected
   */
  calculateMatrices2D(e) {
    const n = e.viewState, i = e.coordinateToPixelTransform, r = e.pixelToCoordinateTransform;
    In(
      i,
      e.size[0] / 2,
      e.size[1] / 2,
      1 / n.resolution,
      -1 / n.resolution,
      -n.rotation,
      -n.center[0],
      -n.center[1]
    ), r_(r, i);
  }
  /**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {boolean} checkWrapped Check for wrapped geometries.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {S} thisArg Value to use as `this` when executing `callback`.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
   * @return {T|undefined} Callback result.
   * @template S,T,U
   */
  forEachFeatureAtCoordinate(e, n, i, r, s, o, l, a) {
    let u;
    const c = n.viewState;
    function h(v, x, C, S) {
      return s.call(o, x, v ? C : null, S);
    }
    const d = c.projection, f = Qm(e.slice(), d), m = [[0, 0]];
    if (d.canWrapX() && r) {
      const v = d.getExtent(), x = ne(v);
      m.push([-x, 0], [x, 0]);
    }
    const y = n.layerStatesArray, E = y.length, p = (
      /** @type {Array<HitMatch<T>>} */
      []
    ), g = [];
    for (let v = 0; v < m.length; v++)
      for (let x = E - 1; x >= 0; --x) {
        const C = y[x], S = C.layer;
        if (S.hasRenderer() && bh(C, c) && l.call(a, S)) {
          const w = S.getRenderer(), T = S.getSource();
          if (w && T) {
            const A = T.getWrapX() ? f : e, N = h.bind(
              null,
              C.managed
            );
            g[0] = A[0] + m[v][0], g[1] = A[1] + m[v][1], u = w.forEachFeatureAtCoordinate(
              g,
              n,
              i,
              N,
              p
            );
          }
          if (u)
            return u;
        }
      }
    if (p.length === 0)
      return;
    const _ = 1 / p.length;
    return p.forEach((v, x) => v.distanceSq += x * _), p.sort((v, x) => v.distanceSq - x.distanceSq), p.some((v) => u = v.callback(v.feature, v.layer, v.geometry)), u;
  }
  /**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {boolean} checkWrapped Check for wrapped geometries.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg Value to use as `this` when executing `layerFilter`.
   * @return {boolean} Is there a feature at the given coordinate?
   * @template U
   */
  hasFeatureAtCoordinate(e, n, i, r, s, o) {
    return this.forEachFeatureAtCoordinate(
      e,
      n,
      i,
      r,
      Hs,
      this,
      s,
      o
    ) !== void 0;
  }
  /**
   * @return {import("../Map.js").default} Map.
   */
  getMap() {
    return this.map_;
  }
  /**
   * Render.
   * @abstract
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   */
  renderFrame(e) {
    J();
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  scheduleExpireIconCache(e) {
    Jt.canExpireCache() && e.postRenderFunctions.push(ax);
  }
}
function ax(t, e) {
  Jt.expire();
}
class F_ extends kn {
  /**
   * @param {import("./EventType.js").default} type Type.
   * @param {import("../transform.js").Transform} [inversePixelTransform] Transform for
   *     CSS pixels to rendered pixels.
   * @param {import("../Map.js").FrameState} [frameState] Frame state.
   * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [context] Context.
   */
  constructor(e, n, i, r) {
    super(e), this.inversePixelTransform = n, this.frameState = i, this.context = r;
  }
}
class ux extends lx {
  /**
   * @param {import("../Map.js").default} map Map.
   */
  constructor(e) {
    super(e), this.fontChangeListenerKey_ = q(
      dn,
      Fr.PROPERTYCHANGE,
      e.redrawText,
      e
    ), this.element_ = document.createElement("div");
    const n = this.element_.style;
    n.position = "absolute", n.width = "100%", n.height = "100%", n.zIndex = "0", this.element_.className = Sa + " ol-layers";
    const i = e.getViewport();
    i.insertBefore(this.element_, i.firstChild || null), this.children_ = [], this.renderedVisible_ = !0;
  }
  /**
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @override
   */
  dispatchRenderEvent(e, n) {
    const i = this.getMap();
    if (i.hasListener(e)) {
      const r = new F_(e, void 0, n);
      i.dispatchEvent(r);
    }
  }
  /**
   * @override
   */
  disposeInternal() {
    le(this.fontChangeListenerKey_), this.element_.remove(), super.disposeInternal();
  }
  /**
   * Render.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   * @override
   */
  renderFrame(e) {
    if (!e) {
      this.renderedVisible_ && (this.element_.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    this.calculateMatrices2D(e), this.dispatchRenderEvent(Rt.PRECOMPOSE, e);
    const n = e.layerStatesArray.sort(
      (l, a) => l.zIndex - a.zIndex
    );
    n.some(
      (l) => l.layer instanceof O_ && l.layer.getDeclutter()
    ) && (e.declutter = {});
    const r = e.viewState;
    this.children_.length = 0;
    const s = [];
    let o = null;
    for (let l = 0, a = n.length; l < a; ++l) {
      const u = n[l];
      e.layerIndex = l;
      const c = u.layer, h = c.getSourceState();
      if (!bh(u, r) || h != "ready" && h != "undefined") {
        c.unrender();
        continue;
      }
      const d = c.render(e, o);
      d && (d !== o && (this.children_.push(d), o = d), s.push(u));
    }
    this.declutter(e, s), lE(this.element_, this.children_), this.dispatchRenderEvent(Rt.POSTCOMPOSE, e), this.renderedVisible_ || (this.element_.style.display = "", this.renderedVisible_ = !0), this.scheduleExpireIconCache(e);
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {Array<import('../layer/Layer.js').State>} layerStates Layers.
   */
  declutter(e, n) {
    if (e.declutter) {
      for (let i = n.length - 1; i >= 0; --i) {
        const r = n[i], s = r.layer;
        s.getDeclutter() && s.renderDeclutter(e, r);
      }
      n.forEach(
        (i) => i.layer.renderDeferred(e)
      );
    }
  }
}
class Yn extends kn {
  /**
   * @param {GroupEventType} type The event type.
   * @param {BaseLayer} layer The layer.
   */
  constructor(e, n) {
    super(e), this.layer = n;
  }
}
const vu = {
  LAYERS: "layers"
};
class Kr extends Um {
  /**
   * @param {Options} [options] Layer options.
   */
  constructor(e) {
    e = e || {};
    const n = (
      /** @type {Options} */
      Object.assign({}, e)
    );
    delete n.layers;
    let i = e.layers;
    super(n), this.on, this.once, this.un, this.layersListenerKeys_ = [], this.listenerKeys_ = {}, this.addChangeListener(vu.LAYERS, this.handleLayersChanged_), i ? Array.isArray(i) ? i = new Qt(i.slice(), { unique: !0 }) : ee(
      typeof /** @type {?} */
      i.getArray == "function",
      "Expected `layers` to be an array or a `Collection`"
    ) : i = new Qt(void 0, { unique: !0 }), this.setLayers(i);
  }
  /**
   * @private
   */
  handleLayerChange_() {
    this.changed();
  }
  /**
   * @private
   */
  handleLayersChanged_() {
    this.layersListenerKeys_.forEach(le), this.layersListenerKeys_.length = 0;
    const e = this.getLayers();
    this.layersListenerKeys_.push(
      q(e, Je.ADD, this.handleLayersAdd_, this),
      q(
        e,
        Je.REMOVE,
        this.handleLayersRemove_,
        this
      )
    );
    for (const i in this.listenerKeys_)
      this.listenerKeys_[i].forEach(le);
    po(this.listenerKeys_);
    const n = e.getArray();
    for (let i = 0, r = n.length; i < r; i++) {
      const s = n[i];
      this.registerLayerListeners_(s), this.dispatchEvent(new Yn("addlayer", s));
    }
    this.changed();
  }
  /**
   * @param {BaseLayer} layer The layer.
   */
  registerLayerListeners_(e) {
    const n = [
      q(
        e,
        Fr.PROPERTYCHANGE,
        this.handleLayerChange_,
        this
      ),
      q(e, V.CHANGE, this.handleLayerChange_, this)
    ];
    e instanceof Kr && n.push(
      q(e, "addlayer", this.handleLayerGroupAdd_, this),
      q(e, "removelayer", this.handleLayerGroupRemove_, this)
    ), this.listenerKeys_[ie(e)] = n;
  }
  /**
   * @param {GroupEvent} event The layer group event.
   */
  handleLayerGroupAdd_(e) {
    this.dispatchEvent(new Yn("addlayer", e.layer));
  }
  /**
   * @param {GroupEvent} event The layer group event.
   */
  handleLayerGroupRemove_(e) {
    this.dispatchEvent(new Yn("removelayer", e.layer));
  }
  /**
   * @param {import("../Collection.js").CollectionEvent<import("./Base.js").default>} collectionEvent CollectionEvent.
   * @private
   */
  handleLayersAdd_(e) {
    const n = e.element;
    this.registerLayerListeners_(n), this.dispatchEvent(new Yn("addlayer", n)), this.changed();
  }
  /**
   * @param {import("../Collection.js").CollectionEvent<import("./Base.js").default>} collectionEvent CollectionEvent.
   * @private
   */
  handleLayersRemove_(e) {
    const n = e.element, i = ie(n);
    this.listenerKeys_[i].forEach(le), delete this.listenerKeys_[i], this.dispatchEvent(new Yn("removelayer", n)), this.changed();
  }
  /**
   * Returns the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @return {!Collection<import("./Base.js").default>} Collection of
   *   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
   * @observable
   * @api
   */
  getLayers() {
    return (
      /** @type {!Collection<import("./Base.js").default>} */
      this.get(vu.LAYERS)
    );
  }
  /**
   * Set the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @param {!Collection<import("./Base.js").default>} layers Collection of
   *   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
   * @observable
   * @api
   */
  setLayers(e) {
    const n = this.getLayers();
    if (n) {
      const i = n.getArray();
      for (let r = 0, s = i.length; r < s; ++r)
        this.dispatchEvent(new Yn("removelayer", i[r]));
    }
    this.set(vu.LAYERS, e);
  }
  /**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   * @override
   */
  getLayersArray(e) {
    return e = e !== void 0 ? e : [], this.getLayers().forEach(function(n) {
      n.getLayersArray(e);
    }), e;
  }
  /**
   * Get the layer states list and use this groups z-index as the default
   * for all layers in this and nested groups, if it is unset at this point.
   * If dest is not provided and this group's z-index is undefined
   * 0 is used a the default z-index.
   * @param {Array<import("./Layer.js").State>} [dest] Optional list
   * of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   * @override
   */
  getLayerStatesArray(e) {
    const n = e !== void 0 ? e : [], i = n.length;
    this.getLayers().forEach(function(o) {
      o.getLayerStatesArray(n);
    });
    const r = this.getLayerState();
    let s = r.zIndex;
    !e && r.zIndex === void 0 && (s = 0);
    for (let o = i, l = n.length; o < l; o++) {
      const a = n[o];
      a.opacity *= r.opacity, a.visible = a.visible && r.visible, a.maxResolution = Math.min(
        a.maxResolution,
        r.maxResolution
      ), a.minResolution = Math.max(
        a.minResolution,
        r.minResolution
      ), a.minZoom = Math.max(a.minZoom, r.minZoom), a.maxZoom = Math.min(a.maxZoom, r.maxZoom), r.extent !== void 0 && (a.extent !== void 0 ? a.extent = Gt(
        a.extent,
        r.extent
      ) : a.extent = r.extent), a.zIndex === void 0 && (a.zIndex = s);
    }
    return n;
  }
  /**
   * @return {import("../source/Source.js").State} Source state.
   * @override
   */
  getSourceState() {
    return "ready";
  }
}
class tr extends kn {
  /**
   * @param {string} type Event type.
   * @param {import("./Map.js").default} map Map.
   * @param {?import("./Map.js").FrameState} [frameState] Frame state.
   */
  constructor(e, n, i) {
    super(e), this.map = n, this.frameState = i !== void 0 ? i : null;
  }
}
class Gn extends tr {
  /**
   * @param {string} type Event type.
   * @param {import("./Map.js").default} map Map.
   * @param {EVENT} originalEvent Original event.
   * @param {boolean} [dragging] Is the map currently being dragged?
   * @param {import("./Map.js").FrameState} [frameState] Frame state.
   * @param {Array<PointerEvent>} [activePointers] Active pointers.
   */
  constructor(e, n, i, r, s, o) {
    super(e, n, s), this.originalEvent = i, this.pixel_ = null, this.coordinate_ = null, this.dragging = r !== void 0 ? r : !1, this.activePointers = o;
  }
  /**
   * The map pixel relative to the viewport corresponding to the original event.
   * @type {import("./pixel.js").Pixel}
   * @api
   */
  get pixel() {
    return this.pixel_ || (this.pixel_ = this.map.getEventPixel(this.originalEvent)), this.pixel_;
  }
  set pixel(e) {
    this.pixel_ = e;
  }
  /**
   * The coordinate corresponding to the original browser event.  This will be in the user
   * projection if one is set.  Otherwise it will be in the view projection.
   * @type {import("./coordinate.js").Coordinate}
   * @api
   */
  get coordinate() {
    return this.coordinate_ || (this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel)), this.coordinate_;
  }
  set coordinate(e) {
    this.coordinate_ = e;
  }
  /**
   * Prevents the default browser action.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
   * @api
   * @override
   */
  preventDefault() {
    super.preventDefault(), "preventDefault" in this.originalEvent && this.originalEvent.preventDefault();
  }
  /**
   * Prevents further propagation of the current event.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
   * @api
   * @override
   */
  stopPropagation() {
    super.stopPropagation(), "stopPropagation" in this.originalEvent && this.originalEvent.stopPropagation();
  }
}
const ye = {
  /**
   * A true single click with no dragging and no double click. Note that this
   * event is delayed by 250 ms to ensure that it is not a double click.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#singleclick
   * @api
   */
  SINGLECLICK: "singleclick",
  /**
   * A click with no dragging. A double click will fire two of this.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#click
   * @api
   */
  CLICK: V.CLICK,
  /**
   * A true double click, with no dragging.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#dblclick
   * @api
   */
  DBLCLICK: V.DBLCLICK,
  /**
   * Triggered when a pointer is dragged.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointerdrag
   * @api
   */
  POINTERDRAG: "pointerdrag",
  /**
   * Triggered when a pointer is moved. Note that on touch devices this is
   * triggered when the map is panned, so is not the same as mousemove.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointermove
   * @api
   */
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
}, kc = {
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};
class cx extends ga {
  /**
   * @param {import("./Map.js").default} map The map with the viewport to listen to events on.
   * @param {number} [moveTolerance] The minimal distance the pointer must travel to trigger a move.
   */
  constructor(e, n) {
    super(e), this.map_ = e, this.clickTimeoutId_, this.emulateClicks_ = !1, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = n === void 0 ? 1 : n, this.down_ = null;
    const i = this.map_.getViewport();
    this.activePointers_ = [], this.trackedTouches_ = {}, this.element_ = i, this.pointerdownListenerKey_ = q(
      i,
      kc.POINTERDOWN,
      this.handlePointerDown_,
      this
    ), this.originalPointerMoveEvent_, this.relayedListenerKey_ = q(
      i,
      kc.POINTERMOVE,
      this.relayMoveEvent_,
      this
    ), this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this), this.element_.addEventListener(
      V.TOUCHMOVE,
      this.boundHandleTouchMove_,
      w_ ? { passive: !1 } : !1
    );
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  emulateClick_(e) {
    let n = new Gn(
      ye.CLICK,
      this.map_,
      e
    );
    this.dispatchEvent(n), this.clickTimeoutId_ !== void 0 ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = void 0, n = new Gn(
      ye.DBLCLICK,
      this.map_,
      e
    ), this.dispatchEvent(n)) : this.clickTimeoutId_ = setTimeout(() => {
      this.clickTimeoutId_ = void 0;
      const i = new Gn(
        ye.SINGLECLICK,
        this.map_,
        e
      );
      this.dispatchEvent(i);
    }, 250);
  }
  /**
   * Keeps track on how many pointers are currently active.
   *
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  updateActivePointers_(e) {
    const n = e, i = n.pointerId;
    if (n.type == ye.POINTERUP || n.type == ye.POINTERCANCEL) {
      delete this.trackedTouches_[i];
      for (const r in this.trackedTouches_)
        if (this.trackedTouches_[r].target !== n.target) {
          delete this.trackedTouches_[r];
          break;
        }
    } else (n.type == ye.POINTERDOWN || n.type == ye.POINTERMOVE) && (this.trackedTouches_[i] = n);
    this.activePointers_ = Object.values(this.trackedTouches_);
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  handlePointerUp_(e) {
    this.updateActivePointers_(e);
    const n = new Gn(
      ye.POINTERUP,
      this.map_,
      e,
      void 0,
      void 0,
      this.activePointers_
    );
    this.dispatchEvent(n), this.emulateClicks_ && !n.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(e) && this.emulateClick_(this.down_), this.activePointers_.length === 0 && (this.dragListenerKeys_.forEach(le), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null);
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @return {boolean} If the left mouse button was pressed.
   * @private
   */
  isMouseActionButton_(e) {
    return e.button === 0;
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  handlePointerDown_(e) {
    this.emulateClicks_ = this.activePointers_.length === 0, this.updateActivePointers_(e);
    const n = new Gn(
      ye.POINTERDOWN,
      this.map_,
      e,
      void 0,
      void 0,
      this.activePointers_
    );
    if (this.dispatchEvent(n), this.down_ = new PointerEvent(e.type, e), Object.defineProperty(this.down_, "target", {
      writable: !1,
      value: e.target
    }), this.dragListenerKeys_.length === 0) {
      const i = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push(
        q(
          i,
          ye.POINTERMOVE,
          this.handlePointerMove_,
          this
        ),
        q(i, ye.POINTERUP, this.handlePointerUp_, this),
        /* Note that the listener for `pointercancel is set up on
         * `pointerEventHandler_` and not `documentPointerEventHandler_` like
         * the `pointerup` and `pointermove` listeners.
         *
         * The reason for this is the following: `TouchSource.vacuumTouches_()`
         * issues `pointercancel` events, when there was no `touchend` for a
         * `touchstart`. Now, let's say a first `touchstart` is registered on
         * `pointerEventHandler_`. The `documentPointerEventHandler_` is set up.
         * But `documentPointerEventHandler_` doesn't know about the first
         * `touchstart`. If there is no `touchend` for the `touchstart`, we can
         * only receive a `touchcancel` from `pointerEventHandler_`, because it is
         * only registered there.
         */
        q(
          this.element_,
          ye.POINTERCANCEL,
          this.handlePointerUp_,
          this
        )
      ), this.element_.getRootNode && this.element_.getRootNode() !== i && this.dragListenerKeys_.push(
        q(
          this.element_.getRootNode(),
          ye.POINTERUP,
          this.handlePointerUp_,
          this
        )
      );
    }
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  handlePointerMove_(e) {
    if (this.isMoving_(e)) {
      this.updateActivePointers_(e), this.dragging_ = !0;
      const n = new Gn(
        ye.POINTERDRAG,
        this.map_,
        e,
        this.dragging_,
        void 0,
        this.activePointers_
      );
      this.dispatchEvent(n);
    }
  }
  /**
   * Wrap and relay a pointermove event.
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */
  relayMoveEvent_(e) {
    this.originalPointerMoveEvent_ = e;
    const n = !!(this.down_ && this.isMoving_(e));
    this.dispatchEvent(
      new Gn(
        ye.POINTERMOVE,
        this.map_,
        e,
        n
      )
    );
  }
  /**
   * Flexible handling of a `touch-action: none` css equivalent: because calling
   * `preventDefault()` on a `pointermove` event does not stop native page scrolling
   * and zooming, we also listen for `touchmove` and call `preventDefault()` on it
   * when an interaction (currently `DragPan` handles the event.
   * @param {TouchEvent} event Event.
   * @private
   */
  handleTouchMove_(e) {
    const n = this.originalPointerMoveEvent_;
    (!n || n.defaultPrevented) && (typeof e.cancelable != "boolean" || e.cancelable === !0) && e.preventDefault();
  }
  /**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @return {boolean} Is moving.
   * @private
   */
  isMoving_(e) {
    return this.dragging_ || Math.abs(e.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(e.clientY - this.down_.clientY) > this.moveTolerance_;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.relayedListenerKey_ && (le(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.element_.removeEventListener(
      V.TOUCHMOVE,
      this.boundHandleTouchMove_
    ), this.pointerdownListenerKey_ && (le(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(le), this.dragListenerKeys_.length = 0, this.element_ = null, super.disposeInternal();
  }
}
const Wn = {
  /**
   * Triggered after a map frame is rendered.
   * @event module:ol/MapEvent~MapEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered when the map starts moving.
   * @event module:ol/MapEvent~MapEvent#movestart
   * @api
   */
  MOVESTART: "movestart",
  /**
   * Triggered after the map is moved.
   * @event module:ol/MapEvent~MapEvent#moveend
   * @api
   */
  MOVEEND: "moveend",
  /**
   * Triggered when loading of additional map data (tiles, images, features) starts.
   * @event module:ol/MapEvent~MapEvent#loadstart
   * @api
   */
  LOADSTART: "loadstart",
  /**
   * Triggered when loading of additional map data has completed.
   * @event module:ol/MapEvent~MapEvent#loadend
   * @api
   */
  LOADEND: "loadend"
}, je = {
  LAYERGROUP: "layergroup",
  SIZE: "size",
  TARGET: "target",
  VIEW: "view"
}, bl = 1 / 0;
class hx {
  /**
   * @param {function(T): number} priorityFunction Priority function.
   * @param {function(T): string} keyFunction Key function.
   */
  constructor(e, n) {
    this.priorityFunction_ = e, this.keyFunction_ = n, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {};
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.elements_.length = 0, this.priorities_.length = 0, po(this.queuedElements_);
  }
  /**
   * Remove and return the highest-priority element. O(log N).
   * @return {T} Element.
   */
  dequeue() {
    const e = this.elements_, n = this.priorities_, i = e[0];
    e.length == 1 ? (e.length = 0, n.length = 0) : (e[0] = /** @type {T} */
    e.pop(), n[0] = /** @type {number} */
    n.pop(), this.siftUp_(0));
    const r = this.keyFunction_(i);
    return delete this.queuedElements_[r], i;
  }
  /**
   * Enqueue an element. O(log N).
   * @param {T} element Element.
   * @return {boolean} The element was added to the queue.
   */
  enqueue(e) {
    ee(
      !(this.keyFunction_(e) in this.queuedElements_),
      "Tried to enqueue an `element` that was already added to the queue"
    );
    const n = this.priorityFunction_(e);
    return n != bl ? (this.elements_.push(e), this.priorities_.push(n), this.queuedElements_[this.keyFunction_(e)] = !0, this.siftDown_(0, this.elements_.length - 1), !0) : !1;
  }
  /**
   * @return {number} Count.
   */
  getCount() {
    return this.elements_.length;
  }
  /**
   * Gets the index of the left child of the node at the given index.
   * @param {number} index The index of the node to get the left child for.
   * @return {number} The index of the left child.
   * @private
   */
  getLeftChildIndex_(e) {
    return e * 2 + 1;
  }
  /**
   * Gets the index of the right child of the node at the given index.
   * @param {number} index The index of the node to get the right child for.
   * @return {number} The index of the right child.
   * @private
   */
  getRightChildIndex_(e) {
    return e * 2 + 2;
  }
  /**
   * Gets the index of the parent of the node at the given index.
   * @param {number} index The index of the node to get the parent for.
   * @return {number} The index of the parent.
   * @private
   */
  getParentIndex_(e) {
    return e - 1 >> 1;
  }
  /**
   * Make this a heap. O(N).
   * @private
   */
  heapify_() {
    let e;
    for (e = (this.elements_.length >> 1) - 1; e >= 0; e--)
      this.siftUp_(e);
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return this.elements_.length === 0;
  }
  /**
   * @param {string} key Key.
   * @return {boolean} Is key queued.
   */
  isKeyQueued(e) {
    return e in this.queuedElements_;
  }
  /**
   * @param {T} element Element.
   * @return {boolean} Is queued.
   */
  isQueued(e) {
    return this.isKeyQueued(this.keyFunction_(e));
  }
  /**
   * @param {number} index The index of the node to move down.
   * @private
   */
  siftUp_(e) {
    const n = this.elements_, i = this.priorities_, r = n.length, s = n[e], o = i[e], l = e;
    for (; e < r >> 1; ) {
      const a = this.getLeftChildIndex_(e), u = this.getRightChildIndex_(e), c = u < r && i[u] < i[a] ? u : a;
      n[e] = n[c], i[e] = i[c], e = c;
    }
    n[e] = s, i[e] = o, this.siftDown_(l, e);
  }
  /**
   * @param {number} startIndex The index of the root.
   * @param {number} index The index of the node to move up.
   * @private
   */
  siftDown_(e, n) {
    const i = this.elements_, r = this.priorities_, s = i[n], o = r[n];
    for (; n > e; ) {
      const l = this.getParentIndex_(n);
      if (r[l] > o)
        i[n] = i[l], r[n] = r[l], n = l;
      else
        break;
    }
    i[n] = s, r[n] = o;
  }
  /**
   * FIXME empty description for jsdoc
   */
  reprioritize() {
    const e = this.priorityFunction_, n = this.elements_, i = this.priorities_;
    let r = 0;
    const s = n.length;
    let o, l, a;
    for (l = 0; l < s; ++l)
      o = n[l], a = e(o), a == bl ? delete this.queuedElements_[this.keyFunction_(o)] : (i[r] = a, n[r++] = o);
    n.length = r, i.length = r, this.heapify_();
  }
}
const F = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  /**
   * Indicates that tile loading failed
   * @type {number}
   */
  ERROR: 3,
  EMPTY: 4
};
class dx extends hx {
  /**
   * @param {PriorityFunction} tilePriorityFunction Tile priority function.
   * @param {function(): ?} tileChangeCallback Function called on each tile change event.
   */
  constructor(e, n) {
    super(
      /**
       * @param {Array} element Element.
       * @return {number} Priority.
       */
      function(i) {
        return e.apply(null, i);
      },
      /**
       * @param {Array} element Element.
       * @return {string} Key.
       */
      function(i) {
        return (
          /** @type {import("./Tile.js").default} */
          i[0].getKey()
        );
      }
    ), this.boundHandleTileChange_ = this.handleTileChange.bind(this), this.tileChangeCallback_ = n, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {};
  }
  /**
   * @param {Array} element Element.
   * @return {boolean} The element was added to the queue.
   * @override
   */
  enqueue(e) {
    const n = super.enqueue(e);
    return n && e[0].addEventListener(V.CHANGE, this.boundHandleTileChange_), n;
  }
  /**
   * @return {number} Number of tiles loading.
   */
  getTilesLoading() {
    return this.tilesLoading_;
  }
  /**
   * @param {import("./events/Event.js").default} event Event.
   * @protected
   */
  handleTileChange(e) {
    const n = (
      /** @type {import("./Tile.js").default} */
      e.target
    ), i = n.getState();
    if (i === F.LOADED || i === F.ERROR || i === F.EMPTY) {
      i !== F.ERROR && n.removeEventListener(V.CHANGE, this.boundHandleTileChange_);
      const r = n.getKey();
      r in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[r], --this.tilesLoading_), this.tileChangeCallback_();
    }
  }
  /**
   * @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
   * @param {number} maxNewLoads Maximum number of new tiles to load.
   */
  loadMoreTiles(e, n) {
    let i = 0;
    for (; this.tilesLoading_ < e && i < n && this.getCount() > 0; ) {
      const r = this.dequeue()[0], s = r.getKey();
      r.getState() === F.IDLE && !(s in this.tilesLoadingKeys_) && (this.tilesLoadingKeys_[s] = !0, ++this.tilesLoading_, ++i, r.load());
    }
  }
}
function fx(t, e, n, i, r) {
  if (!t || !(n in t.wantedTiles) || !t.wantedTiles[n][e.getKey()])
    return bl;
  const s = t.viewState.center, o = i[0] - s[0], l = i[1] - s[1];
  return 65536 * Math.log(r) + Math.sqrt(o * o + l * l) / r;
}
class id extends rn {
  /**
   * @param {Options} options Control options.
   */
  constructor(e) {
    super();
    const n = e.element;
    n && !e.target && !n.style.pointerEvents && (n.style.pointerEvents = "auto"), this.element = n || null, this.target_ = null, this.map_ = null, this.listenerKeys = [], e.render && (this.render = e.render), e.target && this.setTarget(e.target);
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    var e;
    (e = this.element) == null || e.remove(), super.disposeInternal();
  }
  /**
   * Get the map associated with this control.
   * @return {import("../Map.js").default|null} Map.
   * @api
   */
  getMap() {
    return this.map_;
  }
  /**
   * Remove the control from its current map and attach it to the new map.
   * Pass `null` to just remove the control from the current map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */
  setMap(e) {
    var n;
    this.map_ && ((n = this.element) == null || n.remove());
    for (let i = 0, r = this.listenerKeys.length; i < r; ++i)
      le(this.listenerKeys[i]);
    this.listenerKeys.length = 0, this.map_ = e, e && ((this.target_ ?? e.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== Nr && this.listenerKeys.push(
      q(e, Wn.POSTRENDER, this.render, this)
    ), e.render());
  }
  /**
   * Renders the control.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @api
   */
  render(e) {
  }
  /**
   * This function is used to set a target element for the control. It has no
   * effect if it is called after the control has been added to the map (i.e.
   * after `setMap` is called on the control). If no `target` is set in the
   * options passed to the control constructor and if `setTarget` is not called
   * then the control is added to the map's overlay container.
   * @param {HTMLElement|string} target Target.
   * @api
   */
  setTarget(e) {
    this.target_ = typeof e == "string" ? document.getElementById(e) : e;
  }
}
class gx extends id {
  /**
   * @param {Options} [options] Attribution options.
   */
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      render: e.render,
      target: e.target
    }), this.ulElement_ = document.createElement("ul"), this.collapsed_ = e.collapsed !== void 0 ? e.collapsed : !0, this.userCollapsed_ = this.collapsed_, this.overrideCollapsible_ = e.collapsible !== void 0, this.collapsible_ = e.collapsible !== void 0 ? e.collapsible : !0, this.collapsible_ || (this.collapsed_ = !1), this.attributions_ = e.attributions;
    const n = e.className !== void 0 ? e.className : "ol-attribution", i = e.tipLabel !== void 0 ? e.tipLabel : "Attributions", r = e.expandClassName !== void 0 ? e.expandClassName : n + "-expand", s = e.collapseLabel !== void 0 ? e.collapseLabel : "›", o = e.collapseClassName !== void 0 ? e.collapseClassName : n + "-collapse";
    typeof s == "string" ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = s, this.collapseLabel_.className = o) : this.collapseLabel_ = s;
    const l = e.label !== void 0 ? e.label : "i";
    typeof l == "string" ? (this.label_ = document.createElement("span"), this.label_.textContent = l, this.label_.className = r) : this.label_ = l;
    const a = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    this.toggleButton_ = document.createElement("button"), this.toggleButton_.setAttribute("type", "button"), this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_)), this.toggleButton_.title = i, this.toggleButton_.appendChild(a), this.toggleButton_.addEventListener(
      V.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const u = n + " " + Sa + " " + Jh + (this.collapsed_ && this.collapsible_ ? " " + eg : "") + (this.collapsible_ ? "" : " ol-uncollapsible"), c = this.element;
    c.className = u, c.appendChild(this.toggleButton_), c.appendChild(this.ulElement_), this.renderedAttributions_ = [], this.renderedVisible_ = !0;
  }
  /**
   * Collect a list of visible attributions and set the collapsible state.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {Array<string>} Attributions.
   * @private
   */
  collectSourceAttributions_(e) {
    const n = this.getMap().getAllLayers(), i = new Set(
      n.flatMap((r) => r.getAttributions(e))
    );
    if (this.attributions_ !== void 0 && (Array.isArray(this.attributions_) ? this.attributions_.forEach((r) => i.add(r)) : i.add(this.attributions_)), !this.overrideCollapsible_) {
      const r = !n.some(
        (s) => {
          var o;
          return ((o = s.getSource()) == null ? void 0 : o.getAttributionsCollapsible()) === !1;
        }
      );
      this.setCollapsible(r);
    }
    return Array.from(i);
  }
  /**
   * @private
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   */
  async updateElement_(e) {
    if (!e) {
      this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1);
      return;
    }
    const n = await Promise.all(
      this.collectSourceAttributions_(e).map(
        (r) => N1(() => r)
      )
    ), i = n.length > 0;
    if (this.renderedVisible_ != i && (this.element.style.display = i ? "" : "none", this.renderedVisible_ = i), !hi(n, this.renderedAttributions_)) {
      oE(this.ulElement_);
      for (let r = 0, s = n.length; r < s; ++r) {
        const o = document.createElement("li");
        o.innerHTML = n[r], this.ulElement_.appendChild(o);
      }
      this.renderedAttributions_ = n;
    }
  }
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(e) {
    e.preventDefault(), this.handleToggle_(), this.userCollapsed_ = this.collapsed_;
  }
  /**
   * @private
   */
  handleToggle_() {
    this.element.classList.toggle(eg), this.collapsed_ ? Jf(this.collapseLabel_, this.label_) : Jf(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_, this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
  }
  /**
   * Return `true` if the attribution is collapsible, `false` otherwise.
   * @return {boolean} True if the widget is collapsible.
   * @api
   */
  getCollapsible() {
    return this.collapsible_;
  }
  /**
   * Set whether the attribution should be collapsible.
   * @param {boolean} collapsible True if the widget is collapsible.
   * @api
   */
  setCollapsible(e) {
    this.collapsible_ !== e && (this.collapsible_ = e, this.element.classList.toggle("ol-uncollapsible"), this.userCollapsed_ && this.handleToggle_());
  }
  /**
   * Collapse or expand the attribution according to the passed parameter. Will
   * not do anything if the attribution isn't collapsible or if the current
   * collapsed state is already the one requested.
   * @param {boolean} collapsed True if the widget is collapsed.
   * @api
   */
  setCollapsed(e) {
    this.userCollapsed_ = e, !(!this.collapsible_ || this.collapsed_ === e) && this.handleToggle_();
  }
  /**
   * Return `true` when the attribution is currently collapsed or `false`
   * otherwise.
   * @return {boolean} True if the widget is collapsed.
   * @api
   */
  getCollapsed() {
    return this.collapsed_;
  }
  /**
   * Update the attribution element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */
  render(e) {
    this.updateElement_(e.frameState);
  }
}
class px extends id {
  /**
   * @param {Options} [options] Rotate options.
   */
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      render: e.render,
      target: e.target
    });
    const n = e.className !== void 0 ? e.className : "ol-rotate", i = e.label !== void 0 ? e.label : "⇧", r = e.compassClassName !== void 0 ? e.compassClassName : "ol-compass";
    this.label_ = null, typeof i == "string" ? (this.label_ = document.createElement("span"), this.label_.className = r, this.label_.textContent = i) : (this.label_ = i, this.label_.classList.add(r));
    const s = e.tipLabel ? e.tipLabel : "Reset rotation", o = document.createElement("button");
    o.className = n + "-reset", o.setAttribute("type", "button"), o.title = s, o.appendChild(this.label_), o.addEventListener(
      V.CLICK,
      this.handleClick_.bind(this),
      !1
    );
    const l = n + " " + Sa + " " + Jh, a = this.element;
    a.className = l, a.appendChild(o), this.callResetNorth_ = e.resetNorth ? e.resetNorth : void 0, this.duration_ = e.duration !== void 0 ? e.duration : 250, this.autoHide_ = e.autoHide !== void 0 ? e.autoHide : !0, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add($o);
  }
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(e) {
    e.preventDefault(), this.callResetNorth_ !== void 0 ? this.callResetNorth_() : this.resetNorth_();
  }
  /**
   * @private
   */
  resetNorth_() {
    const n = this.getMap().getView();
    if (!n)
      return;
    const i = n.getRotation();
    i !== void 0 && (this.duration_ > 0 && i % (2 * Math.PI) !== 0 ? n.animate({
      rotation: 0,
      duration: this.duration_,
      easing: Vr
    }) : n.setRotation(0));
  }
  /**
   * Update the rotate control element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */
  render(e) {
    const n = e.frameState;
    if (!n)
      return;
    const i = n.viewState.rotation;
    if (i != this.rotation_) {
      const r = "rotate(" + i + "rad)";
      if (this.autoHide_) {
        const s = this.element.classList.contains($o);
        !s && i === 0 ? this.element.classList.add($o) : s && i !== 0 && this.element.classList.remove($o);
      }
      this.label_.style.transform = r;
    }
    this.rotation_ = i;
  }
}
class mx extends id {
  /**
   * @param {Options} [options] Zoom options.
   */
  constructor(e) {
    e = e || {}, super({
      element: document.createElement("div"),
      target: e.target
    });
    const n = e.className !== void 0 ? e.className : "ol-zoom", i = e.delta !== void 0 ? e.delta : 1, r = e.zoomInClassName !== void 0 ? e.zoomInClassName : n + "-in", s = e.zoomOutClassName !== void 0 ? e.zoomOutClassName : n + "-out", o = e.zoomInLabel !== void 0 ? e.zoomInLabel : "+", l = e.zoomOutLabel !== void 0 ? e.zoomOutLabel : "–", a = e.zoomInTipLabel !== void 0 ? e.zoomInTipLabel : "Zoom in", u = e.zoomOutTipLabel !== void 0 ? e.zoomOutTipLabel : "Zoom out", c = document.createElement("button");
    c.className = r, c.setAttribute("type", "button"), c.title = a, c.appendChild(
      typeof o == "string" ? document.createTextNode(o) : o
    ), c.addEventListener(
      V.CLICK,
      this.handleClick_.bind(this, i),
      !1
    );
    const h = document.createElement("button");
    h.className = s, h.setAttribute("type", "button"), h.title = u, h.appendChild(
      typeof l == "string" ? document.createTextNode(l) : l
    ), h.addEventListener(
      V.CLICK,
      this.handleClick_.bind(this, -i),
      !1
    );
    const d = n + " " + Sa + " " + Jh, f = this.element;
    f.className = d, f.appendChild(c), f.appendChild(h), this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  /**
   * @param {number} delta Zoom delta.
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(e, n) {
    n.preventDefault(), this.zoomByDelta_(e);
  }
  /**
   * @param {number} delta Zoom delta.
   * @private
   */
  zoomByDelta_(e) {
    const i = this.getMap().getView();
    if (!i)
      return;
    const r = i.getZoom();
    if (r !== void 0) {
      const s = i.getConstrainedZoom(r + e);
      this.duration_ > 0 ? (i.getAnimating() && i.cancelAnimations(), i.animate({
        zoom: s,
        duration: this.duration_,
        easing: Vr
      })) : i.setZoom(s);
    }
  }
}
function _x(t) {
  t = t || {};
  const e = new Qt();
  return (t.zoom !== void 0 ? t.zoom : !0) && e.push(new mx(t.zoomOptions)), (t.rotate !== void 0 ? t.rotate : !0) && e.push(new px(t.rotateOptions)), (t.attribution !== void 0 ? t.attribution : !0) && e.push(new gx(t.attributionOptions)), e;
}
const fg = {
  ACTIVE: "active"
};
class Eo extends rn {
  /**
   * @param {InteractionOptions} [options] Options.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, e && e.handleEvent && (this.handleEvent = e.handleEvent), this.map_ = null, this.setActive(!0);
  }
  /**
   * Return whether the interaction is currently active.
   * @return {boolean} `true` if the interaction is active, `false` otherwise.
   * @observable
   * @api
   */
  getActive() {
    return (
      /** @type {boolean} */
      this.get(fg.ACTIVE)
    );
  }
  /**
   * Get the map associated with this interaction.
   * @return {import("../Map.js").default|null} Map.
   * @api
   */
  getMap() {
    return this.map_;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event}.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   */
  handleEvent(e) {
    return !0;
  }
  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   */
  setActive(e) {
    this.set(fg.ACTIVE, e);
  }
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default|null} map Map.
   */
  setMap(e) {
    this.map_ = e;
  }
}
function yx(t, e, n) {
  const i = t.getCenterInternal();
  if (i) {
    const r = [i[0] + e[0], i[1] + e[1]];
    t.animateInternal({
      duration: n !== void 0 ? n : 250,
      easing: _v,
      center: t.getConstrainedCenter(r)
    });
  }
}
function rd(t, e, n, i) {
  const r = t.getZoom();
  if (r === void 0)
    return;
  const s = t.getConstrainedZoom(r + e), o = t.getResolutionForZoom(s);
  t.getAnimating() && t.cancelAnimations(), t.animate({
    resolution: o,
    anchor: n,
    duration: i !== void 0 ? i : 250,
    easing: Vr
  });
}
class vx extends Eo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super(), e = e || {}, this.delta_ = e.delta ? e.delta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} (if it was a
   * doubleclick) and eventually zooms the map.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @override
   */
  handleEvent(e) {
    let n = !1;
    if (e.type == ye.DBLCLICK) {
      const i = (
        /** @type {MouseEvent} */
        e.originalEvent
      ), r = e.map, s = e.coordinate, o = i.shiftKey ? -this.delta_ : this.delta_, l = r.getView();
      rd(l, o, s, this.duration_), i.preventDefault(), n = !0;
    }
    return !n;
  }
}
class xo extends Eo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, super(
      /** @type {import("./Interaction.js").InteractionOptions} */
      e
    ), e.handleDownEvent && (this.handleDownEvent = e.handleDownEvent), e.handleDragEvent && (this.handleDragEvent = e.handleDragEvent), e.handleMoveEvent && (this.handleMoveEvent = e.handleMoveEvent), e.handleUpEvent && (this.handleUpEvent = e.handleUpEvent), e.stopDown && (this.stopDown = e.stopDown), this.handlingDownUpSequence = !1, this.targetPointers = [];
  }
  /**
   * Returns the current number of pointers involved in the interaction,
   * e.g. `2` when two fingers are used.
   * @return {number} The number of pointers.
   * @api
   */
  getPointerCount() {
    return this.targetPointers.length;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @protected
   */
  handleDownEvent(e) {
    return !1;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @protected
   */
  handleDragEvent(e) {
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may call into
   * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
   * detected.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   * @override
   */
  handleEvent(e) {
    if (!e.originalEvent)
      return !0;
    let n = !1;
    if (this.updateTrackedPointers_(e), this.handlingDownUpSequence) {
      if (e.type == ye.POINTERDRAG)
        this.handleDragEvent(e), e.originalEvent.preventDefault();
      else if (e.type == ye.POINTERUP) {
        const i = this.handleUpEvent(e);
        this.handlingDownUpSequence = i && this.targetPointers.length > 0;
      }
    } else if (e.type == ye.POINTERDOWN) {
      const i = this.handleDownEvent(e);
      this.handlingDownUpSequence = i, n = this.stopDown(i);
    } else e.type == ye.POINTERMOVE && this.handleMoveEvent(e);
    return !n;
  }
  /**
   * Handle pointer move events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @protected
   */
  handleMoveEvent(e) {
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @protected
   */
  handleUpEvent(e) {
    return !1;
  }
  /**
   * This function is used to determine if "down" events should be propagated
   * to other interactions or should be stopped.
   * @param {boolean} handled Was the event handled by the interaction?
   * @return {boolean} Should the `down` event be stopped?
   */
  stopDown(e) {
    return e;
  }
  /**
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @private
   */
  updateTrackedPointers_(e) {
    e.activePointers && (this.targetPointers = e.activePointers);
  }
}
function sd(t) {
  const e = t.length;
  let n = 0, i = 0;
  for (let r = 0; r < e; r++)
    n += t[r].clientX, i += t[r].clientY;
  return { clientX: n / e, clientY: i / e };
}
function Mc(t) {
  const e = arguments;
  return function(n) {
    let i = !0;
    for (let r = 0, s = e.length; r < s && (i = i && e[r](n), !!i); ++r)
      ;
    return i;
  };
}
const Ex = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  );
  return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
}, xx = function(t) {
  const e = t.map.getTargetElement(), n = e.getRootNode(), i = t.map.getOwnerDocument().activeElement;
  return n instanceof ShadowRoot ? n.host.contains(i) : e.contains(i);
}, N_ = function(t) {
  const e = t.map.getTargetElement(), n = e.getRootNode();
  return (n instanceof ShadowRoot ? n.host : e).hasAttribute("tabindex") ? xx(t) : !0;
}, wx = Hs, z_ = function(t) {
  const e = (
    /** @type {MouseEvent} */
    t.originalEvent
  );
  return e.button == 0 && !(sE && y_ && e.ctrlKey);
}, G_ = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  );
  return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey;
}, Sx = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  );
  return y_ ? e.metaKey : e.ctrlKey;
}, Cx = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  );
  return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey;
}, W_ = function(t) {
  const e = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    t.originalEvent
  ), n = (
    /** @type {Element} */
    e.target.tagName
  );
  return n !== "INPUT" && n !== "SELECT" && n !== "TEXTAREA" && // `isContentEditable` is only available on `HTMLElement`, but it may also be a
  // different type like `SVGElement`.
  // @ts-ignore
  !e.target.isContentEditable;
}, Eu = function(t) {
  const e = (
    /** @type {import("../MapBrowserEvent").default} */
    t.originalEvent
  );
  return ee(
    e !== void 0,
    "mapBrowserEvent must originate from a pointer event"
  ), e.pointerType == "mouse";
}, Rx = function(t) {
  const e = (
    /** @type {import("../MapBrowserEvent").default} */
    t.originalEvent
  );
  return ee(
    e !== void 0,
    "mapBrowserEvent must originate from a pointer event"
  ), e.isPrimary && e.button === 0;
};
class Tx extends xo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super({
      stopDown: fa
    }), e = e || {}, this.kinetic_ = e.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.panning_ = !1;
    const n = e.condition ? e.condition : Mc(G_, Rx);
    this.condition_ = e.onFocusOnly ? Mc(N_, n) : n, this.noKinetic_ = !1;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @override
   */
  handleDragEvent(e) {
    const n = e.map;
    this.panning_ || (this.panning_ = !0, n.getView().beginInteraction());
    const i = this.targetPointers, r = n.getEventPixel(sd(i));
    if (i.length == this.lastPointersCount_) {
      if (this.kinetic_ && this.kinetic_.update(r[0], r[1]), this.lastCentroid) {
        const s = [
          this.lastCentroid[0] - r[0],
          r[1] - this.lastCentroid[1]
        ], l = e.map.getView();
        rv(s, l.getResolution()), Fh(s, l.getRotation()), l.adjustCenterInternal(s);
      }
    } else this.kinetic_ && this.kinetic_.begin();
    this.lastCentroid = r, this.lastPointersCount_ = i.length, e.originalEvent.preventDefault();
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(e) {
    const n = e.map, i = n.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        const r = this.kinetic_.getDistance(), s = this.kinetic_.getAngle(), o = i.getCenterInternal(), l = n.getPixelFromCoordinateInternal(o), a = n.getCoordinateFromPixelInternal([
          l[0] - r * Math.cos(s),
          l[1] - r * Math.sin(s)
        ]);
        i.animateInternal({
          center: i.getConstrainedCenter(a),
          duration: 500,
          easing: Vr
        });
      }
      return this.panning_ && (this.panning_ = !1, i.endInteraction()), !1;
    }
    return this.kinetic_ && this.kinetic_.begin(), this.lastCentroid = null, !0;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(e) {
    if (this.targetPointers.length > 0 && this.condition_(e)) {
      const i = e.map.getView();
      return this.lastCentroid = null, i.getAnimating() && i.cancelAnimations(), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = this.targetPointers.length > 1, !0;
    }
    return !1;
  }
}
class Ix extends xo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, super({
      stopDown: fa
    }), this.condition_ = e.condition ? e.condition : Ex, this.lastAngle_ = void 0, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @override
   */
  handleDragEvent(e) {
    if (!Eu(e))
      return;
    const n = e.map, i = n.getView();
    if (i.getConstraints().rotation === Yh)
      return;
    const r = n.getSize(), s = e.pixel, o = Math.atan2(r[1] / 2 - s[1], s[0] - r[0] / 2);
    if (this.lastAngle_ !== void 0) {
      const l = o - this.lastAngle_;
      i.adjustRotationInternal(-l);
    }
    this.lastAngle_ = o;
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(e) {
    return Eu(e) ? (e.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(e) {
    return Eu(e) && z_(e) && this.condition_(e) ? (e.map.getView().beginInteraction(), this.lastAngle_ = void 0, !0) : !1;
  }
}
class Lx extends da {
  /**
   * @param {string} className CSS class name.
   */
  constructor(e) {
    super(), this.geometry_ = null, this.element_ = document.createElement("div"), this.element_.style.position = "absolute", this.element_.style.pointerEvents = "auto", this.element_.className = "ol-box " + e, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.setMap(null);
  }
  /**
   * @private
   */
  render_() {
    const e = this.startPixel_, n = this.endPixel_, i = "px", r = this.element_.style;
    r.left = Math.min(e[0], n[0]) + i, r.top = Math.min(e[1], n[1]) + i, r.width = Math.abs(n[0] - e[0]) + i, r.height = Math.abs(n[1] - e[1]) + i;
  }
  /**
   * @param {import("../Map.js").default|null} map Map.
   */
  setMap(e) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_);
      const n = this.element_.style;
      n.left = "inherit", n.top = "inherit", n.width = "inherit", n.height = "inherit";
    }
    this.map_ = e, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
  }
  /**
   * @param {import("../pixel.js").Pixel} startPixel Start pixel.
   * @param {import("../pixel.js").Pixel} endPixel End pixel.
   */
  setPixels(e, n) {
    this.startPixel_ = e, this.endPixel_ = n, this.createOrUpdateGeometry(), this.render_();
  }
  /**
   * Creates or updates the cached geometry.
   */
  createOrUpdateGeometry() {
    if (!this.map_)
      return;
    const e = this.startPixel_, n = this.endPixel_, r = [
      e,
      [e[0], n[1]],
      n,
      [n[0], e[1]]
    ].map(
      this.map_.getCoordinateFromPixelInternal,
      this.map_
    );
    r[4] = r[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([r]) : this.geometry_ = new Js([r]);
  }
  /**
   * @return {import("../geom/Polygon.js").default} Geometry.
   */
  getGeometry() {
    return this.geometry_;
  }
}
const Zi = {
  /**
   * Triggered upon drag box start.
   * @event DragBoxEvent#boxstart
   * @api
   */
  BOXSTART: "boxstart",
  /**
   * Triggered on drag when box is active.
   * @event DragBoxEvent#boxdrag
   * @api
   */
  BOXDRAG: "boxdrag",
  /**
   * Triggered upon drag box end.
   * @event DragBoxEvent#boxend
   * @api
   */
  BOXEND: "boxend",
  /**
   * Triggered upon drag box canceled.
   * @event DragBoxEvent#boxcancel
   * @api
   */
  BOXCANCEL: "boxcancel"
};
class hs extends kn {
  /**
   * @param {string} type The event type.
   * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Originating event.
   */
  constructor(e, n, i) {
    super(e), this.coordinate = n, this.mapBrowserEvent = i;
  }
}
class kx extends xo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super(), this.on, this.once, this.un, e = e ?? {}, this.box_ = new Lx(e.className || "ol-dragbox"), this.minArea_ = e.minArea ?? 64, e.onBoxEnd && (this.onBoxEnd = e.onBoxEnd), this.startPixel_ = null, this.condition_ = e.condition ?? z_, this.boxEndCondition_ = e.boxEndCondition ?? this.defaultBoxEndCondition;
  }
  /**
   * The default condition for determining whether the boxend event
   * should fire.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent The originating MapBrowserEvent
   *     leading to the box end.
   * @param {import("../pixel.js").Pixel} startPixel The starting pixel of the box.
   * @param {import("../pixel.js").Pixel} endPixel The end pixel of the box.
   * @return {boolean} Whether or not the boxend condition should be fired.
   */
  defaultBoxEndCondition(e, n, i) {
    const r = i[0] - n[0], s = i[1] - n[1];
    return r * r + s * s >= this.minArea_;
  }
  /**
   * Returns geometry of last drawn box.
   * @return {import("../geom/Polygon.js").default} Geometry.
   * @api
   */
  getGeometry() {
    return this.box_.getGeometry();
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @override
   */
  handleDragEvent(e) {
    this.startPixel_ && (this.box_.setPixels(this.startPixel_, e.pixel), this.dispatchEvent(
      new hs(
        Zi.BOXDRAG,
        e.coordinate,
        e
      )
    ));
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(e) {
    if (!this.startPixel_)
      return !1;
    const n = this.boxEndCondition_(
      e,
      this.startPixel_,
      e.pixel
    );
    return n && this.onBoxEnd(e), this.dispatchEvent(
      new hs(
        n ? Zi.BOXEND : Zi.BOXCANCEL,
        e.coordinate,
        e
      )
    ), this.box_.setMap(null), this.startPixel_ = null, !1;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(e) {
    return this.condition_(e) ? (this.startPixel_ = e.pixel, this.box_.setMap(e.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(
      new hs(
        Zi.BOXSTART,
        e.coordinate,
        e
      )
    ), !0) : !1;
  }
  /**
   * Function to execute just before `onboxend` is fired
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */
  onBoxEnd(e) {
  }
  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   * @override
   */
  setActive(e) {
    e || (this.box_.setMap(null), this.startPixel_ && (this.dispatchEvent(
      new hs(Zi.BOXCANCEL, this.startPixel_, null)
    ), this.startPixel_ = null)), super.setActive(e);
  }
  /**
   * @param {import("../Map.js").default|null} map Map.
   * @override
   */
  setMap(e) {
    this.getMap() && (this.box_.setMap(null), this.startPixel_ && (this.dispatchEvent(
      new hs(Zi.BOXCANCEL, this.startPixel_, null)
    ), this.startPixel_ = null)), super.setMap(e);
  }
}
class Mx extends kx {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = e.condition ? e.condition : Cx;
    super({
      condition: n,
      className: e.className || "ol-dragzoom",
      minArea: e.minArea
    }), this.duration_ = e.duration !== void 0 ? e.duration : 200, this.out_ = e.out !== void 0 ? e.out : !1;
  }
  /**
   * Function to execute just before `onboxend` is fired
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @override
   */
  onBoxEnd(e) {
    const i = (
      /** @type {!import("../View.js").default} */
      this.getMap().getView()
    );
    let r = this.getGeometry();
    if (this.out_) {
      const s = i.rotatedExtentForGeometry(r), o = i.getResolutionForExtentInternal(s), l = i.getResolution() / o;
      r = r.clone(), r.scale(l * l);
    }
    i.fitInternal(r, {
      duration: this.duration_,
      easing: Vr
    });
  }
}
const mi = {
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown"
};
class Px extends Eo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super(), e = e || {}, this.defaultCondition_ = function(n) {
      return G_(n) && W_(n);
    }, this.condition_ = e.condition !== void 0 ? e.condition : this.defaultCondition_, this.duration_ = e.duration !== void 0 ? e.duration : 100, this.pixelDelta_ = e.pixelDelta !== void 0 ? e.pixelDelta : 128;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} if it was a
   * `KeyEvent`, and decides the direction to pan to (if an arrow key was
   * pressed).
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @override
   */
  handleEvent(e) {
    let n = !1;
    if (e.type == V.KEYDOWN) {
      const i = (
        /** @type {KeyboardEvent} */
        e.originalEvent
      ), r = i.key;
      if (this.condition_(e) && (r == mi.DOWN || r == mi.LEFT || r == mi.RIGHT || r == mi.UP)) {
        const o = e.map.getView(), l = o.getResolution() * this.pixelDelta_;
        let a = 0, u = 0;
        r == mi.DOWN ? u = -l : r == mi.LEFT ? a = -l : r == mi.RIGHT ? a = l : u = l;
        const c = [a, u];
        Fh(c, o.getRotation()), yx(o, c, this.duration_), i.preventDefault(), n = !0;
      }
    }
    return !n;
  }
}
class Ax extends Eo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    super(), e = e || {}, this.condition_ = e.condition ? e.condition : function(n) {
      return !Sx(n) && W_(n);
    }, this.delta_ = e.delta ? e.delta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 100;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} if it was a
   * `KeyEvent`, and decides whether to zoom in or out (depending on whether the
   * key pressed was '+' or '-').
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @override
   */
  handleEvent(e) {
    let n = !1;
    if (e.type == V.KEYDOWN || e.type == V.KEYPRESS) {
      const i = (
        /** @type {KeyboardEvent} */
        e.originalEvent
      ), r = i.key;
      if (this.condition_(e) && (r === "+" || r === "-")) {
        const s = e.map, o = r === "+" ? this.delta_ : -this.delta_, l = s.getView();
        rd(l, o, void 0, this.duration_), i.preventDefault(), n = !0;
      }
    }
    return !n;
  }
}
class Dx {
  /**
   * @param {number} decay Rate of decay (must be negative).
   * @param {number} minVelocity Minimum velocity (pixels/millisecond).
   * @param {number} delay Delay to consider to calculate the kinetic
   *     initial values (milliseconds).
   */
  constructor(e, n, i) {
    this.decay_ = e, this.minVelocity_ = n, this.delay_ = i, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0;
  }
  /**
   * FIXME empty description for jsdoc
   */
  begin() {
    this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   */
  update(e, n) {
    this.points_.push(e, n, Date.now());
  }
  /**
   * @return {boolean} Whether we should do kinetic animation.
   */
  end() {
    if (this.points_.length < 6)
      return !1;
    const e = Date.now() - this.delay_, n = this.points_.length - 3;
    if (this.points_[n + 2] < e)
      return !1;
    let i = n - 3;
    for (; i > 0 && this.points_[i + 2] > e; )
      i -= 3;
    const r = this.points_[n + 2] - this.points_[i + 2];
    if (r < 1e3 / 60)
      return !1;
    const s = this.points_[n] - this.points_[i], o = this.points_[n + 1] - this.points_[i + 1];
    return this.angle_ = Math.atan2(o, s), this.initialVelocity_ = Math.sqrt(s * s + o * o) / r, this.initialVelocity_ > this.minVelocity_;
  }
  /**
   * @return {number} Total distance travelled (pixels).
   */
  getDistance() {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  }
  /**
   * @return {number} Angle of the kinetic panning animation (radians).
   */
  getAngle() {
    return this.angle_;
  }
}
class Ox extends Eo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {}, super(
      /** @type {import("./Interaction.js").InteractionOptions} */
      e
    ), this.totalDelta_ = 0, this.lastDelta_ = 0, this.maxDelta_ = e.maxDelta !== void 0 ? e.maxDelta : 1, this.duration_ = e.duration !== void 0 ? e.duration : 250, this.timeout_ = e.timeout !== void 0 ? e.timeout : 80, this.useAnchor_ = e.useAnchor !== void 0 ? e.useAnchor : !0, this.constrainResolution_ = e.constrainResolution !== void 0 ? e.constrainResolution : !1;
    const n = e.condition ? e.condition : wx;
    this.condition_ = e.onFocusOnly ? Mc(N_, n) : n, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_, this.deltaPerZoom_ = 300;
  }
  /**
   * @private
   */
  endInteraction_() {
    this.trackpadTimeoutId_ = void 0;
    const e = this.getMap();
    if (!e)
      return;
    e.getView().endInteraction(
      void 0,
      this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0,
      this.lastAnchor_ ? e.getCoordinateFromPixel(this.lastAnchor_) : null
    );
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} (if it was a mousewheel-event) and eventually
   * zooms the map.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @override
   */
  handleEvent(e) {
    if (!this.condition_(e) || e.type !== V.WHEEL)
      return !0;
    const i = e.map, r = (
      /** @type {WheelEvent} */
      e.originalEvent
    );
    r.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = e.pixel);
    let s;
    if (e.type == V.WHEEL && (s = r.deltaY, iE && r.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (s /= v_), r.deltaMode === WheelEvent.DOM_DELTA_LINE && (s *= 40)), s === 0)
      return !1;
    this.lastDelta_ = s;
    const o = Date.now();
    this.startTime_ === void 0 && (this.startTime_ = o), (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(s) < 4 ? "trackpad" : "wheel");
    const l = i.getView();
    if (this.mode_ === "trackpad" && !(l.getConstrainResolution() || this.constrainResolution_))
      return this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : (l.getAnimating() && l.cancelAnimations(), l.beginInteraction()), this.trackpadTimeoutId_ = setTimeout(
        this.endInteraction_.bind(this),
        this.timeout_
      ), l.adjustZoom(
        -s / this.deltaPerZoom_,
        this.lastAnchor_ ? i.getCoordinateFromPixel(this.lastAnchor_) : null
      ), this.startTime_ = o, !1;
    this.totalDelta_ += s;
    const a = Math.max(this.timeout_ - (o - this.startTime_), 0);
    return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(
      this.handleWheelZoom_.bind(this, i),
      a
    ), !1;
  }
  /**
   * @private
   * @param {import("../Map.js").default} map Map.
   */
  handleWheelZoom_(e) {
    const n = e.getView();
    n.getAnimating() && n.cancelAnimations();
    let i = -Ee(
      this.totalDelta_,
      -this.maxDelta_ * this.deltaPerZoom_,
      this.maxDelta_ * this.deltaPerZoom_
    ) / this.deltaPerZoom_;
    (n.getConstrainResolution() || this.constrainResolution_) && (i = i ? i > 0 ? 1 : -1 : 0), rd(
      n,
      i,
      this.lastAnchor_ ? e.getCoordinateFromPixel(this.lastAnchor_) : null,
      this.duration_
    ), this.mode_ = void 0, this.totalDelta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0;
  }
  /**
   * Enable or disable using the mouse's location as an anchor when zooming
   * @param {boolean} useAnchor true to zoom to the mouse's location, false
   * to zoom to the center of the map
   * @api
   */
  setMouseAnchor(e) {
    this.useAnchor_ = e, e || (this.lastAnchor_ = null);
  }
}
class Fx extends xo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = (
      /** @type {import("./Pointer.js").Options} */
      e
    );
    n.stopDown || (n.stopDown = fa), super(n), this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = e.threshold !== void 0 ? e.threshold : 0.3, this.duration_ = e.duration !== void 0 ? e.duration : 250;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @override
   */
  handleDragEvent(e) {
    let n = 0;
    const i = this.targetPointers[0], r = this.targetPointers[1], s = Math.atan2(
      r.clientY - i.clientY,
      r.clientX - i.clientX
    );
    if (this.lastAngle_ !== void 0) {
      const a = s - this.lastAngle_;
      this.rotationDelta_ += a, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), n = a;
    }
    this.lastAngle_ = s;
    const o = e.map, l = o.getView();
    l.getConstraints().rotation !== Yh && (this.anchor_ = o.getCoordinateFromPixelInternal(
      o.getEventPixel(sd(this.targetPointers))
    ), this.rotating_ && (o.render(), l.adjustRotationInternal(n, this.anchor_)));
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(e) {
    return this.targetPointers.length < 2 ? (e.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(e) {
    if (this.targetPointers.length >= 2) {
      const n = e.map;
      return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || n.getView().beginInteraction(), !0;
    }
    return !1;
  }
}
class Nx extends xo {
  /**
   * @param {Options} [options] Options.
   */
  constructor(e) {
    e = e || {};
    const n = (
      /** @type {import("./Pointer.js").Options} */
      e
    );
    n.stopDown || (n.stopDown = fa), super(n), this.anchor_ = null, this.duration_ = e.duration !== void 0 ? e.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @override
   */
  handleDragEvent(e) {
    let n = 1;
    const i = this.targetPointers[0], r = this.targetPointers[1], s = i.clientX - r.clientX, o = i.clientY - r.clientY, l = Math.sqrt(s * s + o * o);
    this.lastDistance_ !== void 0 && (n = this.lastDistance_ / l), this.lastDistance_ = l;
    const a = e.map, u = a.getView();
    n != 1 && (this.lastScaleDelta_ = n), this.anchor_ = a.getCoordinateFromPixelInternal(
      a.getEventPixel(sd(this.targetPointers))
    ), a.render(), u.adjustResolutionInternal(n, this.anchor_);
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(e) {
    if (this.targetPointers.length < 2) {
      const i = e.map.getView(), r = this.lastScaleDelta_ > 1 ? 1 : -1;
      return i.endInteraction(this.duration_, r), !1;
    }
    return !0;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(e) {
    if (this.targetPointers.length >= 2) {
      const n = e.map;
      return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || n.getView().beginInteraction(), !0;
    }
    return !1;
  }
}
function zx(t) {
  t = t || {};
  const e = new Qt(), n = new Dx(-5e-3, 0.05, 100);
  return (t.altShiftDragRotate !== void 0 ? t.altShiftDragRotate : !0) && e.push(new Ix()), (t.doubleClickZoom !== void 0 ? t.doubleClickZoom : !0) && e.push(
    new vx({
      delta: t.zoomDelta,
      duration: t.zoomDuration
    })
  ), (t.dragPan !== void 0 ? t.dragPan : !0) && e.push(
    new Tx({
      onFocusOnly: t.onFocusOnly,
      kinetic: n
    })
  ), (t.pinchRotate !== void 0 ? t.pinchRotate : !0) && e.push(new Fx()), (t.pinchZoom !== void 0 ? t.pinchZoom : !0) && e.push(
    new Nx({
      duration: t.zoomDuration
    })
  ), (t.keyboard !== void 0 ? t.keyboard : !0) && (e.push(new Px()), e.push(
    new Ax({
      delta: t.zoomDelta,
      duration: t.zoomDuration
    })
  )), (t.mouseWheelZoom !== void 0 ? t.mouseWheelZoom : !0) && e.push(
    new Ox({
      onFocusOnly: t.onFocusOnly,
      duration: t.zoomDuration
    })
  ), (t.shiftDragZoom !== void 0 ? t.shiftDragZoom : !0) && e.push(
    new Mx({
      duration: t.zoomDuration
    })
  ), e;
}
function X_(t) {
  if (t instanceof xa) {
    t.setMapInternal(null);
    return;
  }
  t instanceof Kr && t.getLayers().forEach(X_);
}
function j_(t, e) {
  if (t instanceof xa) {
    t.setMapInternal(e);
    return;
  }
  if (t instanceof Kr) {
    const n = t.getLayers().getArray();
    for (let i = 0, r = n.length; i < r; ++i)
      j_(n[i], e);
  }
}
let Gx = class extends rn {
  /**
   * @param {MapOptions} [options] Map options.
   */
  constructor(e) {
    super(), e = e || {}, this.on, this.once, this.un;
    const n = Wx(e);
    this.renderComplete_ = !1, this.loaded_ = !0, this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this), this.maxTilesLoading_ = e.maxTilesLoading !== void 0 ? e.maxTilesLoading : 16, this.pixelRatio_ = e.pixelRatio !== void 0 ? e.pixelRatio : v_, this.postRenderTimeoutHandle_, this.animationDelayKey_, this.animationDelay_ = this.animationDelay_.bind(this), this.coordinateToPixelTransform_ = jt(), this.pixelToCoordinateTransform_ = jt(), this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("div"), this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.overlayContainer_ = document.createElement("div"), this.overlayContainer_.style.position = "absolute", this.overlayContainer_.style.zIndex = "0", this.overlayContainer_.style.width = "100%", this.overlayContainer_.style.height = "100%", this.overlayContainer_.style.pointerEvents = "none", this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("div"), this.overlayContainerStopEvent_.style.position = "absolute", this.overlayContainerStopEvent_.style.zIndex = "0", this.overlayContainerStopEvent_.style.width = "100%", this.overlayContainerStopEvent_.style.height = "100%", this.overlayContainerStopEvent_.style.pointerEvents = "none", this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent", this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = null, this.moveTolerance_ = e.moveTolerance, this.keyboardEventTarget_ = n.keyboardEventTarget, this.targetChangeHandlerKeys_ = null, this.targetElement_ = null, this.resizeObserver_ = new ResizeObserver(() => this.updateSize()), this.controls = n.controls || _x(), this.interactions = n.interactions || zx({
      onFocusOnly: !0
    }), this.overlays_ = n.overlays, this.overlayIdIndex_ = {}, this.renderer_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new dx(
      this.getTilePriority.bind(this),
      this.handleTileChange_.bind(this)
    ), this.addChangeListener(
      je.LAYERGROUP,
      this.handleLayerGroupChanged_
    ), this.addChangeListener(je.VIEW, this.handleViewChanged_), this.addChangeListener(je.SIZE, this.handleSizeChanged_), this.addChangeListener(je.TARGET, this.handleTargetChanged_), this.setProperties(n.values);
    const i = this;
    e.view && !(e.view instanceof $t) && e.view.then(function(r) {
      i.setView(new $t(r));
    }), this.controls.addEventListener(
      Je.ADD,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./control/Control.js").default>} event CollectionEvent
       */
      (r) => {
        r.element.setMap(this);
      }
    ), this.controls.addEventListener(
      Je.REMOVE,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./control/Control.js").default>} event CollectionEvent.
       */
      (r) => {
        r.element.setMap(null);
      }
    ), this.interactions.addEventListener(
      Je.ADD,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./interaction/Interaction.js").default>} event CollectionEvent.
       */
      (r) => {
        r.element.setMap(this);
      }
    ), this.interactions.addEventListener(
      Je.REMOVE,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./interaction/Interaction.js").default>} event CollectionEvent.
       */
      (r) => {
        r.element.setMap(null);
      }
    ), this.overlays_.addEventListener(
      Je.ADD,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./Overlay.js").default>} event CollectionEvent.
       */
      (r) => {
        this.addOverlayInternal_(r.element);
      }
    ), this.overlays_.addEventListener(
      Je.REMOVE,
      /**
       * @param {import("./Collection.js").CollectionEvent<import("./Overlay.js").default>} event CollectionEvent.
       */
      (r) => {
        const s = r.element.getId();
        s !== void 0 && delete this.overlayIdIndex_[s.toString()], r.element.setMap(null);
      }
    ), this.controls.forEach(
      /**
       * @param {import("./control/Control.js").default} control Control.
       */
      (r) => {
        r.setMap(this);
      }
    ), this.interactions.forEach(
      /**
       * @param {import("./interaction/Interaction.js").default} interaction Interaction.
       */
      (r) => {
        r.setMap(this);
      }
    ), this.overlays_.forEach(this.addOverlayInternal_.bind(this));
  }
  /**
   * Add the given control to the map.
   * @param {import("./control/Control.js").default} control Control.
   * @api
   */
  addControl(e) {
    this.getControls().push(e);
  }
  /**
   * Add the given interaction to the map. If you want to add an interaction
   * at another point of the collection use `getInteractions()` and the methods
   * available on {@link module:ol/Collection~Collection}. This can be used to
   * stop the event propagation from the handleEvent function. The interactions
   * get to handle the events in the reverse order of this collection.
   * @param {import("./interaction/Interaction.js").default} interaction Interaction to add.
   * @api
   */
  addInteraction(e) {
    this.getInteractions().push(e);
  }
  /**
   * Adds the given layer to the top of this map. If you want to add a layer
   * elsewhere in the stack, use `getLayers()` and the methods available on
   * {@link module:ol/Collection~Collection}.
   * @param {import("./layer/Base.js").default} layer Layer.
   * @api
   */
  addLayer(e) {
    this.getLayerGroup().getLayers().push(e);
  }
  /**
   * @param {import("./layer/Group.js").GroupEvent} event The layer add event.
   * @private
   */
  handleLayerAdd_(e) {
    j_(e.layer, this);
  }
  /**
   * Add the given overlay to the map.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @api
   */
  addOverlay(e) {
    this.getOverlays().push(e);
  }
  /**
   * This deals with map's overlay collection changes.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @private
   */
  addOverlayInternal_(e) {
    const n = e.getId();
    n !== void 0 && (this.overlayIdIndex_[n.toString()] = e), e.setMap(this);
  }
  /**
   *
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.controls.clear(), this.interactions.clear(), this.overlays_.clear(), this.resizeObserver_.disconnect(), this.setTarget(null), super.disposeInternal();
  }
  /**
   * Detect features that intersect a pixel on the viewport, and execute a
   * callback with each intersecting feature. Layers included in the detection can
   * be configured through the `layerFilter` option in `options`.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {function(import("./Feature.js").FeatureLike, import("./layer/Layer.js").default<import("./source/Source").default>, import("./geom/SimpleGeometry.js").default): T} callback Feature callback. The callback will be
   *     called with two arguments. The first argument is one
   *     {@link module:ol/Feature~Feature feature} or
   *     {@link module:ol/render/Feature~RenderFeature render feature} at the pixel, the second is
   *     the {@link module:ol/layer/Layer~Layer layer} of the feature and will be null for
   *     unmanaged layers. To stop detection, callback functions can return a
   *     truthy value.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {T|undefined} Callback result, i.e. the return value of last
   * callback execution, or the first truthy callback return value.
   * @template T
   * @api
   */
  forEachFeatureAtPixel(e, n, i) {
    if (!this.frameState_ || !this.renderer_)
      return;
    const r = this.getCoordinateFromPixelInternal(e);
    i = i !== void 0 ? i : {};
    const s = i.hitTolerance !== void 0 ? i.hitTolerance : 0, o = i.layerFilter !== void 0 ? i.layerFilter : Hs, l = i.checkWrapped !== !1;
    return this.renderer_.forEachFeatureAtCoordinate(
      r,
      this.frameState_,
      s,
      l,
      n,
      null,
      o,
      null
    );
  }
  /**
   * Get all features that intersect a pixel on the viewport.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {Array<import("./Feature.js").FeatureLike>} The detected features or
   * an empty array if none were found.
   * @api
   */
  getFeaturesAtPixel(e, n) {
    const i = [];
    return this.forEachFeatureAtPixel(
      e,
      function(r) {
        i.push(r);
      },
      n
    ), i;
  }
  /**
   * Get all layers from all layer groups.
   * @return {Array<import("./layer/Layer.js").default>} Layers.
   * @api
   */
  getAllLayers() {
    const e = [];
    function n(i) {
      i.forEach(function(r) {
        r instanceof Kr ? n(r.getLayers()) : e.push(r);
      });
    }
    return n(this.getLayers()), e;
  }
  /**
   * Detect if features intersect a pixel on the viewport. Layers included in the
   * detection can be configured through the `layerFilter` option.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {boolean} Is there a feature at the given pixel?
   * @api
   */
  hasFeatureAtPixel(e, n) {
    if (!this.frameState_ || !this.renderer_)
      return !1;
    const i = this.getCoordinateFromPixelInternal(e);
    n = n !== void 0 ? n : {};
    const r = n.layerFilter !== void 0 ? n.layerFilter : Hs, s = n.hitTolerance !== void 0 ? n.hitTolerance : 0, o = n.checkWrapped !== !1;
    return this.renderer_.hasFeatureAtCoordinate(
      i,
      this.frameState_,
      s,
      o,
      r,
      null
    );
  }
  /**
   * Returns the coordinate in user projection for a browser event.
   * @param {MouseEvent} event Event.
   * @return {import("./coordinate.js").Coordinate} Coordinate.
   * @api
   */
  getEventCoordinate(e) {
    return this.getCoordinateFromPixel(this.getEventPixel(e));
  }
  /**
   * Returns the coordinate in view projection for a browser event.
   * @param {MouseEvent} event Event.
   * @return {import("./coordinate.js").Coordinate} Coordinate.
   */
  getEventCoordinateInternal(e) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(e));
  }
  /**
   * Returns the map pixel position for a browser event relative to the viewport.
   * @param {UIEvent|{clientX: number, clientY: number}} event Event.
   * @return {import("./pixel.js").Pixel} Pixel.
   * @api
   */
  getEventPixel(e) {
    const i = this.viewport_.getBoundingClientRect(), r = this.getSize(), s = i.width / r[0], o = i.height / r[1], l = (
      //FIXME Are we really calling this with a TouchEvent anywhere?
      "changedTouches" in e ? (
        /** @type {TouchEvent} */
        e.changedTouches[0]
      ) : (
        /** @type {MouseEvent} */
        e
      )
    );
    return [
      (l.clientX - i.left) / s,
      (l.clientY - i.top) / o
    ];
  }
  /**
   * Get the target in which this map is rendered.
   * Note that this returns what is entered as an option or in setTarget:
   * if that was an element, it returns an element; if a string, it returns that.
   * @return {HTMLElement|string|undefined} The Element or id of the Element that the
   *     map is rendered in.
   * @observable
   * @api
   */
  getTarget() {
    return (
      /** @type {HTMLElement|string|undefined} */
      this.get(je.TARGET)
    );
  }
  /**
   * Get the DOM element into which this map is rendered. In contrast to
   * `getTarget` this method always return an `Element`, or `null` if the
   * map has no target.
   * @return {HTMLElement} The element that the map is rendered in.
   * @api
   */
  getTargetElement() {
    return this.targetElement_;
  }
  /**
   * Get the coordinate for a given pixel.  This returns a coordinate in the
   * user projection.
   * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
   * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
   * @api
   */
  getCoordinateFromPixel(e) {
    return Cc(
      this.getCoordinateFromPixelInternal(e),
      this.getView().getProjection()
    );
  }
  /**
   * Get the coordinate for a given pixel.  This returns a coordinate in the
   * map view projection.
   * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
   * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
   */
  getCoordinateFromPixelInternal(e) {
    const n = this.frameState_;
    return n ? Oe(n.pixelToCoordinateTransform, e.slice()) : null;
  }
  /**
   * Get the map controls. Modifying this collection changes the controls
   * associated with the map.
   * @return {Collection<import("./control/Control.js").default>} Controls.
   * @api
   */
  getControls() {
    return this.controls;
  }
  /**
   * Get the map overlays. Modifying this collection changes the overlays
   * associated with the map.
   * @return {Collection<import("./Overlay.js").default>} Overlays.
   * @api
   */
  getOverlays() {
    return this.overlays_;
  }
  /**
   * Get an overlay by its identifier (the value returned by overlay.getId()).
   * Note that the index treats string and numeric identifiers as the same. So
   * `map.getOverlayById(2)` will return an overlay with id `'2'` or `2`.
   * @param {string|number} id Overlay identifier.
   * @return {import("./Overlay.js").default|null} Overlay.
   * @api
   */
  getOverlayById(e) {
    const n = this.overlayIdIndex_[e.toString()];
    return n !== void 0 ? n : null;
  }
  /**
   * Get the map interactions. Modifying this collection changes the interactions
   * associated with the map.
   *
   * Interactions are used for e.g. pan, zoom and rotate.
   * @return {Collection<import("./interaction/Interaction.js").default>} Interactions.
   * @api
   */
  getInteractions() {
    return this.interactions;
  }
  /**
   * Get the layergroup associated with this map.
   * @return {LayerGroup} A layer group containing the layers in this map.
   * @observable
   * @api
   */
  getLayerGroup() {
    return (
      /** @type {LayerGroup} */
      this.get(je.LAYERGROUP)
    );
  }
  /**
   * Clear any existing layers and add layers to the map.
   * @param {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>} layers The layers to be added to the map.
   * @api
   */
  setLayers(e) {
    const n = this.getLayerGroup();
    if (e instanceof Qt) {
      n.setLayers(e);
      return;
    }
    const i = n.getLayers();
    i.clear(), i.extend(e);
  }
  /**
   * Get the collection of layers associated with this map.
   * @return {!Collection<import("./layer/Base.js").default>} Layers.
   * @api
   */
  getLayers() {
    return this.getLayerGroup().getLayers();
  }
  /**
   * @return {boolean} Layers have sources that are still loading.
   */
  getLoadingOrNotReady() {
    const e = this.getLayerGroup().getLayerStatesArray();
    for (let n = 0, i = e.length; n < i; ++n) {
      const r = e[n];
      if (!r.visible)
        continue;
      const s = r.layer.getRenderer();
      if (s && !s.ready)
        return !0;
      const o = r.layer.getSource();
      if (o && o.loading)
        return !0;
    }
    return !1;
  }
  /**
   * Get the pixel for a coordinate.  This takes a coordinate in the user
   * projection and returns the corresponding pixel.
   * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
   * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
   * @api
   */
  getPixelFromCoordinate(e) {
    const n = hn(
      e,
      this.getView().getProjection()
    );
    return this.getPixelFromCoordinateInternal(n);
  }
  /**
   * Get the pixel for a coordinate.  This takes a coordinate in the map view
   * projection and returns the corresponding pixel.
   * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
   * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
   */
  getPixelFromCoordinateInternal(e) {
    const n = this.frameState_;
    return n ? Oe(
      n.coordinateToPixelTransform,
      e.slice(0, 2)
    ) : null;
  }
  /**
   * Get the map renderer.
   * @return {import("./renderer/Map.js").default|null} Renderer
   */
  getRenderer() {
    return this.renderer_;
  }
  /**
   * Get the size of this map.
   * @return {import("./size.js").Size|undefined} The size in pixels of the map in the DOM.
   * @observable
   * @api
   */
  getSize() {
    return (
      /** @type {import("./size.js").Size|undefined} */
      this.get(je.SIZE)
    );
  }
  /**
   * Get the view associated with this map. A view manages properties such as
   * center and resolution.
   * @return {View} The view that controls this map.
   * @observable
   * @api
   */
  getView() {
    return (
      /** @type {View} */
      this.get(je.VIEW)
    );
  }
  /**
   * Get the element that serves as the map viewport.
   * @return {HTMLElement} Viewport.
   * @api
   */
  getViewport() {
    return this.viewport_;
  }
  /**
   * Get the element that serves as the container for overlays.  Elements added to
   * this container will let mousedown and touchstart events through to the map,
   * so clicks and gestures on an overlay will trigger {@link module:ol/MapBrowserEvent~MapBrowserEvent}
   * events.
   * @return {!HTMLElement} The map's overlay container.
   */
  getOverlayContainer() {
    return this.overlayContainer_;
  }
  /**
   * Get the element that serves as a container for overlays that don't allow
   * event propagation. Elements added to this container won't let mousedown and
   * touchstart events through to the map, so clicks and gestures on an overlay
   * don't trigger any {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
   * @return {!HTMLElement} The map's overlay container that stops events.
   */
  getOverlayContainerStopEvent() {
    return this.overlayContainerStopEvent_;
  }
  /**
   * @return {!Document} The document where the map is displayed.
   */
  getOwnerDocument() {
    const e = this.getTargetElement();
    return e ? e.ownerDocument : document;
  }
  /**
   * @param {import("./Tile.js").default} tile Tile.
   * @param {string} tileSourceKey Tile source key.
   * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
   * @param {number} tileResolution Tile resolution.
   * @return {number} Tile priority.
   */
  getTilePriority(e, n, i, r) {
    return fx(
      this.frameState_,
      e,
      n,
      i,
      r
    );
  }
  /**
   * @param {UIEvent} browserEvent Browser event.
   * @param {string} [type] Type.
   */
  handleBrowserEvent(e, n) {
    n = n || e.type;
    const i = new Gn(n, this, e);
    this.handleMapBrowserEvent(i);
  }
  /**
   * @param {MapBrowserEvent} mapBrowserEvent The event to handle.
   */
  handleMapBrowserEvent(e) {
    if (!this.frameState_)
      return;
    const n = (
      /** @type {PointerEvent} */
      e.originalEvent
    ), i = n.type;
    if (i === kc.POINTERDOWN || i === V.WHEEL || i === V.KEYDOWN) {
      const r = this.getOwnerDocument(), s = this.viewport_.getRootNode ? this.viewport_.getRootNode() : r, o = (
        /** @type {Node} */
        n.target
      ), l = s instanceof ShadowRoot ? s.host === o ? s.host.ownerDocument : s : s === r ? r.documentElement : s;
      if (
        // Abort if the target is a child of the container for elements whose events are not meant
        // to be handled by map interactions.
        this.overlayContainerStopEvent_.contains(o) || // Abort if the event target is a child of the container that is no longer in the page.
        // It's possible for the target to no longer be in the page if it has been removed in an
        // event listener, this might happen in a Control that recreates it's content based on
        // user interaction either manually or via a render in something like https://reactjs.org/
        !l.contains(o)
      )
        return;
    }
    if (e.frameState = this.frameState_, this.dispatchEvent(e) !== !1) {
      const r = this.getInteractions().getArray().slice();
      for (let s = r.length - 1; s >= 0; s--) {
        const o = r[s];
        if (o.getMap() !== this || !o.getActive() || !this.getTargetElement())
          continue;
        if (!o.handleEvent(e) || e.propagationStopped)
          break;
      }
    }
  }
  /**
   * @protected
   */
  handlePostRender() {
    const e = this.frameState_, n = this.tileQueue_;
    if (!n.isEmpty()) {
      let r = this.maxTilesLoading_, s = r;
      if (e) {
        const o = e.viewHints;
        if (o[Ye.ANIMATING] || o[Ye.INTERACTING]) {
          const l = Date.now() - e.time > 8;
          r = l ? 0 : 8, s = l ? 0 : 2;
        }
      }
      n.getTilesLoading() < r && (n.reprioritize(), n.loadMoreTiles(r, s));
    }
    e && this.renderer_ && !e.animate && (this.renderComplete_ ? (this.hasListener(Rt.RENDERCOMPLETE) && this.renderer_.dispatchRenderEvent(
      Rt.RENDERCOMPLETE,
      e
    ), this.loaded_ === !1 && (this.loaded_ = !0, this.dispatchEvent(
      new tr(Wn.LOADEND, this, e)
    ))) : this.loaded_ === !0 && (this.loaded_ = !1, this.dispatchEvent(
      new tr(Wn.LOADSTART, this, e)
    )));
    const i = this.postRenderFunctions_;
    for (let r = 0, s = i.length; r < s; ++r)
      i[r](this, e);
    i.length = 0;
  }
  /**
   * @private
   */
  handleSizeChanged_() {
    this.getView() && !this.getView().getAnimating() && this.getView().resolveConstraints(0), this.render();
  }
  /**
   * @private
   */
  handleTargetChanged_() {
    if (this.mapBrowserEventHandler_) {
      for (let i = 0, r = this.targetChangeHandlerKeys_.length; i < r; ++i)
        le(this.targetChangeHandlerKeys_[i]);
      this.targetChangeHandlerKeys_ = null, this.viewport_.removeEventListener(
        V.CONTEXTMENU,
        this.boundHandleBrowserEvent_
      ), this.viewport_.removeEventListener(
        V.WHEEL,
        this.boundHandleBrowserEvent_
      ), this.mapBrowserEventHandler_.dispose(), this.mapBrowserEventHandler_ = null, this.viewport_.remove();
    }
    if (this.targetElement_) {
      this.resizeObserver_.unobserve(this.targetElement_);
      const i = this.targetElement_.getRootNode();
      i instanceof ShadowRoot && this.resizeObserver_.unobserve(i.host), this.setSize(void 0);
    }
    const e = this.getTarget(), n = typeof e == "string" ? document.getElementById(e) : e;
    if (this.targetElement_ = n, !n)
      this.renderer_ && (clearTimeout(this.postRenderTimeoutHandle_), this.postRenderTimeoutHandle_ = void 0, this.postRenderFunctions_.length = 0, this.renderer_.dispose(), this.renderer_ = null), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0);
    else {
      n.appendChild(this.viewport_), this.renderer_ || (this.renderer_ = new ux(this)), this.mapBrowserEventHandler_ = new cx(
        this,
        this.moveTolerance_
      );
      for (const s in ye)
        this.mapBrowserEventHandler_.addEventListener(
          ye[s],
          this.handleMapBrowserEvent.bind(this)
        );
      this.viewport_.addEventListener(
        V.CONTEXTMENU,
        this.boundHandleBrowserEvent_,
        !1
      ), this.viewport_.addEventListener(
        V.WHEEL,
        this.boundHandleBrowserEvent_,
        w_ ? { passive: !1 } : !1
      );
      let i;
      if (this.keyboardEventTarget_)
        i = this.keyboardEventTarget_;
      else {
        const s = n.getRootNode();
        i = s instanceof ShadowRoot ? s.host : n;
      }
      this.targetChangeHandlerKeys_ = [
        q(
          i,
          V.KEYDOWN,
          this.handleBrowserEvent,
          this
        ),
        q(
          i,
          V.KEYPRESS,
          this.handleBrowserEvent,
          this
        )
      ];
      const r = n.getRootNode();
      r instanceof ShadowRoot && this.resizeObserver_.observe(r.host), this.resizeObserver_.observe(n);
    }
    this.updateSize();
  }
  /**
   * @private
   */
  handleTileChange_() {
    this.render();
  }
  /**
   * @private
   */
  handleViewPropertyChanged_() {
    this.render();
  }
  /**
   * @private
   */
  handleViewChanged_() {
    this.viewPropertyListenerKey_ && (le(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (le(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null);
    const e = this.getView();
    e && (this.updateViewportSize_(this.getSize()), this.viewPropertyListenerKey_ = q(
      e,
      Fr.PROPERTYCHANGE,
      this.handleViewPropertyChanged_,
      this
    ), this.viewChangeListenerKey_ = q(
      e,
      V.CHANGE,
      this.handleViewPropertyChanged_,
      this
    ), e.resolveConstraints(0)), this.render();
  }
  /**
   * @private
   */
  handleLayerGroupChanged_() {
    this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(le), this.layerGroupPropertyListenerKeys_ = null);
    const e = this.getLayerGroup();
    e && (this.handleLayerAdd_(new Yn("addlayer", e)), this.layerGroupPropertyListenerKeys_ = [
      q(e, Fr.PROPERTYCHANGE, this.render, this),
      q(e, V.CHANGE, this.render, this),
      q(e, "addlayer", this.handleLayerAdd_, this),
      q(e, "removelayer", this.handleLayerRemove_, this)
    ]), this.render();
  }
  /**
   * @return {boolean} Is rendered.
   */
  isRendered() {
    return !!this.frameState_;
  }
  /**
   * @private
   */
  animationDelay_() {
    this.animationDelayKey_ = void 0, this.renderFrame_(Date.now());
  }
  /**
   * Requests an immediate render in a synchronous manner.
   * @api
   */
  renderSync() {
    this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_();
  }
  /**
   * Redraws all text after new fonts have loaded
   */
  redrawText() {
    const e = this.getLayerGroup().getLayerStatesArray();
    for (let n = 0, i = e.length; n < i; ++n) {
      const r = e[n].layer;
      r.hasRenderer() && r.getRenderer().handleFontsChanged();
    }
  }
  /**
   * Request a map rendering (at the next animation frame).
   * @api
   */
  render() {
    this.renderer_ && this.animationDelayKey_ === void 0 && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_));
  }
  /**
   * Remove the given control from the map.
   * @param {import("./control/Control.js").default} control Control.
   * @return {import("./control/Control.js").default|undefined} The removed control (or undefined
   *     if the control was not found).
   * @api
   */
  removeControl(e) {
    return this.getControls().remove(e);
  }
  /**
   * Remove the given interaction from the map.
   * @param {import("./interaction/Interaction.js").default} interaction Interaction to remove.
   * @return {import("./interaction/Interaction.js").default|undefined} The removed interaction (or
   *     undefined if the interaction was not found).
   * @api
   */
  removeInteraction(e) {
    return this.getInteractions().remove(e);
  }
  /**
   * Removes the given layer from the map.
   * @param {import("./layer/Base.js").default} layer Layer.
   * @return {import("./layer/Base.js").default|undefined} The removed layer (or undefined if the
   *     layer was not found).
   * @api
   */
  removeLayer(e) {
    return this.getLayerGroup().getLayers().remove(e);
  }
  /**
   * @param {import("./layer/Group.js").GroupEvent} event The layer remove event.
   * @private
   */
  handleLayerRemove_(e) {
    X_(e.layer);
  }
  /**
   * Remove the given overlay from the map.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @return {import("./Overlay.js").default|undefined} The removed overlay (or undefined
   *     if the overlay was not found).
   * @api
   */
  removeOverlay(e) {
    return this.getOverlays().remove(e);
  }
  /**
   * @param {number} time Time.
   * @private
   */
  renderFrame_(e) {
    const n = this.getSize(), i = this.getView(), r = this.frameState_;
    let s = null;
    if (n !== void 0 && Hf(n) && i && i.isDef()) {
      const o = i.getHints(
        this.frameState_ ? this.frameState_.viewHints : void 0
      ), l = i.getState();
      if (s = {
        animate: !1,
        coordinateToPixelTransform: this.coordinateToPixelTransform_,
        declutter: null,
        extent: wc(
          l.center,
          l.resolution,
          l.rotation,
          n
        ),
        index: this.frameIndex_++,
        layerIndex: 0,
        layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
        pixelRatio: this.pixelRatio_,
        pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
        postRenderFunctions: [],
        size: n,
        tileQueue: this.tileQueue_,
        time: e,
        usedTiles: {},
        viewState: l,
        viewHints: o,
        wantedTiles: {},
        mapId: ie(this),
        renderTargets: {}
      }, l.nextCenter && l.nextResolution) {
        const a = isNaN(l.nextRotation) ? l.rotation : l.nextRotation;
        s.nextExtent = wc(
          l.nextCenter,
          l.nextResolution,
          a,
          n
        );
      }
    }
    this.frameState_ = s, this.renderer_.renderFrame(s), s && (s.animate && this.render(), Array.prototype.push.apply(
      this.postRenderFunctions_,
      s.postRenderFunctions
    ), r && (!this.previousExtent_ || !va(this.previousExtent_) && !$s(s.extent, this.previousExtent_)) && (this.dispatchEvent(
      new tr(Wn.MOVESTART, this, r)
    ), this.previousExtent_ = pa(this.previousExtent_)), this.previousExtent_ && !s.viewHints[Ye.ANIMATING] && !s.viewHints[Ye.INTERACTING] && !$s(s.extent, this.previousExtent_) && (this.dispatchEvent(
      new tr(Wn.MOVEEND, this, s)
    ), Vm(s.extent, this.previousExtent_))), this.dispatchEvent(new tr(Wn.POSTRENDER, this, s)), this.renderComplete_ = (this.hasListener(Wn.LOADSTART) || this.hasListener(Wn.LOADEND) || this.hasListener(Rt.RENDERCOMPLETE)) && !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady(), this.postRenderTimeoutHandle_ || (this.postRenderTimeoutHandle_ = setTimeout(() => {
      this.postRenderTimeoutHandle_ = void 0, this.handlePostRender();
    }, 0));
  }
  /**
   * Sets the layergroup of this map.
   * @param {LayerGroup} layerGroup A layer group containing the layers in this map.
   * @observable
   * @api
   */
  setLayerGroup(e) {
    const n = this.getLayerGroup();
    n && this.handleLayerRemove_(new Yn("removelayer", n)), this.set(je.LAYERGROUP, e);
  }
  /**
   * Set the size of this map.
   * @param {import("./size.js").Size|undefined} size The size in pixels of the map in the DOM.
   * @observable
   * @api
   */
  setSize(e) {
    this.set(je.SIZE, e);
  }
  /**
   * Set the target element to render this map into.
   * For accessibility (focus and keyboard events for map navigation), the `target` element must have a
   *  properly configured `tabindex` attribute. If the `target` element is inside a Shadow DOM, the
   *  `tabindex` atribute must be set on the custom element's host element.
   * @param {HTMLElement|string} [target] The Element or id of the Element
   *     that the map is rendered in.
   * @observable
   * @api
   */
  setTarget(e) {
    this.set(je.TARGET, e);
  }
  /**
   * Set the view for this map.
   * @param {View|Promise<import("./View.js").ViewOptions>} view The view that controls this map.
   * It is also possible to pass a promise that resolves to options for constructing a view.  This
   * alternative allows view properties to be resolved by sources or other components that load
   * view-related metadata.
   * @observable
   * @api
   */
  setView(e) {
    if (!e || e instanceof $t) {
      this.set(je.VIEW, e);
      return;
    }
    this.set(je.VIEW, new $t());
    const n = this;
    e.then(function(i) {
      n.setView(new $t(i));
    });
  }
  /**
   * Force a recalculation of the map viewport size.  This should be called when
   * third-party code changes the size of the map viewport.
   * @api
   */
  updateSize() {
    const e = this.getTargetElement();
    let n;
    if (e) {
      const r = getComputedStyle(e), s = e.offsetWidth - parseFloat(r.borderLeftWidth) - parseFloat(r.paddingLeft) - parseFloat(r.paddingRight) - parseFloat(r.borderRightWidth), o = e.offsetHeight - parseFloat(r.borderTopWidth) - parseFloat(r.paddingTop) - parseFloat(r.paddingBottom) - parseFloat(r.borderBottomWidth);
      !isNaN(s) && !isNaN(o) && (n = [Math.max(0, s), Math.max(0, o)], !Hf(n) && (e.offsetWidth || e.offsetHeight || e.getClientRects().length) && Jm(
        "No map visible because the map container's width or height are 0."
      ));
    }
    const i = this.getSize();
    n && (!i || !hi(n, i)) && (this.setSize(n), this.updateViewportSize_(n));
  }
  /**
   * Recomputes the viewport size and save it on the view object (if any)
   * @param {import("./size.js").Size|undefined} size The size.
   * @private
   */
  updateViewportSize_(e) {
    const n = this.getView();
    n && n.setViewportSize(e);
  }
};
function Wx(t) {
  let e = null;
  t.keyboardEventTarget !== void 0 && (e = typeof t.keyboardEventTarget == "string" ? document.getElementById(t.keyboardEventTarget) : t.keyboardEventTarget);
  const n = {}, i = t.layers && typeof /** @type {?} */
  t.layers.getLayers == "function" ? (
    /** @type {LayerGroup} */
    t.layers
  ) : new Kr({
    layers: (
      /** @type {Collection<import("./layer/Base.js").default>|Array<import("./layer/Base.js").default>} */
      t.layers
    )
  });
  n[je.LAYERGROUP] = i, n[je.TARGET] = t.target, n[je.VIEW] = t.view instanceof $t ? t.view : new $t();
  let r;
  t.controls !== void 0 && (Array.isArray(t.controls) ? r = new Qt(t.controls.slice()) : (ee(
    typeof /** @type {?} */
    t.controls.getArray == "function",
    "Expected `controls` to be an array or an `ol/Collection.js`"
  ), r = t.controls));
  let s;
  t.interactions !== void 0 && (Array.isArray(t.interactions) ? s = new Qt(t.interactions.slice()) : (ee(
    typeof /** @type {?} */
    t.interactions.getArray == "function",
    "Expected `interactions` to be an array or an `ol/Collection.js`"
  ), s = t.interactions));
  let o;
  return t.overlays !== void 0 ? Array.isArray(t.overlays) ? o = new Qt(t.overlays.slice()) : (ee(
    typeof /** @type {?} */
    t.overlays.getArray == "function",
    "Expected `overlays` to be an array or an `ol/Collection.js`"
  ), o = t.overlays) : o = new Qt(), {
    controls: r,
    interactions: s,
    keyboardEventTarget: e,
    overlays: o,
    values: n
  };
}
const Qo = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};
class Xx extends xa {
  /**
   * @param {Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(e) {
    e = e || {};
    const n = Object.assign({}, e), i = e.cacheSize;
    delete e.cacheSize, delete n.preload, delete n.useInterimTilesOnError, super(n), this.on, this.once, this.un, this.cacheSize_ = i, this.setPreload(e.preload !== void 0 ? e.preload : 0), this.setUseInterimTilesOnError(
      e.useInterimTilesOnError !== void 0 ? e.useInterimTilesOnError : !0
    );
  }
  /**
   * @return {number|undefined} The suggested cache size
   * @protected
   */
  getCacheSize() {
    return this.cacheSize_;
  }
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */
  getPreload() {
    return (
      /** @type {number} */
      this.get(Qo.PRELOAD)
    );
  }
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */
  setPreload(e) {
    this.set(Qo.PRELOAD, e);
  }
  /**
   * Deprecated.  Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */
  getUseInterimTilesOnError() {
    return (
      /** @type {boolean} */
      this.get(Qo.USE_INTERIM_TILES_ON_ERROR)
    );
  }
  /**
   * Deprecated.  Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */
  setUseInterimTilesOnError(e) {
    this.set(Qo.USE_INTERIM_TILES_ON_ERROR, e);
  }
  /**
   * Get data for a pixel location.  The return type depends on the source data.  For image tiles,
   * a four element RGBA array will be returned.  For data tiles, the array length will match the
   * number of bands in the dataset.  For requests outside the layer extent, `null` will be returned.
   * Data for a image tiles can only be retrieved if the source's `crossOrigin` property is set.
   *
   * ```js
   * // display layer data on every pointer move
   * map.on('pointermove', (event) => {
   *   console.log(layer.getData(event.pixel));
   * });
   * ```
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   * @api
   * @override
   */
  getData(e) {
    return super.getData(e);
  }
}
const jx = 5;
class Yx extends mo {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(e) {
    super(), this.ready = !0, this.boundHandleImageChange_ = this.handleImageChange_.bind(this), this.layer_ = e, this.staleKeys_ = new Array(), this.maxStaleKeys = jx;
  }
  /**
   * @return {Array<string>} Get the list of stale keys.
   */
  getStaleKeys() {
    return this.staleKeys_;
  }
  /**
   * @param {string} key The new stale key.
   */
  prependStaleKey(e) {
    this.staleKeys_.unshift(e), this.staleKeys_.length > this.maxStaleKeys && (this.staleKeys_.length = this.maxStaleKeys);
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */
  getFeatures(e) {
    return J();
  }
  /**
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */
  getData(e) {
    return null;
  }
  /**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */
  prepareFrame(e) {
    return J();
  }
  /**
   * Render the layer.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   */
  renderFrame(e, n) {
    return J();
  }
  /**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(e, n, i, r, s) {
  }
  /**
   * @return {LayerType} Layer.
   */
  getLayer() {
    return this.layer_;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */
  handleFontsChanged() {
  }
  /**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */
  handleImageChange_(e) {
    const n = (
      /** @type {import("../Image.js").default} */
      e.target
    );
    (n.getState() === Z.LOADED || n.getState() === Z.ERROR) && this.renderIfReadyAndVisible();
  }
  /**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../Image.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */
  loadImage(e) {
    let n = e.getState();
    return n != Z.LOADED && n != Z.ERROR && e.addEventListener(V.CHANGE, this.boundHandleImageChange_), n == Z.IDLE && (e.load(), n = e.getState()), n == Z.LOADED;
  }
  /**
   * @protected
   */
  renderIfReadyAndVisible() {
    const e = this.getLayer();
    e && e.getVisible() && e.getSourceState() === "ready" && e.changed();
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  renderDeferred(e) {
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
class Y_ {
  constructor() {
    /**
     * @private
     * @param {...*} args Args.
     * @return {ZIndexContext} This.
     */
    yd(this, "pushMethodArgs_", (...e) => (this.instructions_[this.zIndex + this.offset_].push(e), this));
    this.instructions_ = [], this.zIndex = 0, this.offset_ = 0, this.context_ = /** @type {ZIndexContextProxy} */
    new Proxy(Yl(), {
      get: (e, n) => {
        if (typeof /** @type {*} */
        Yl()[n] == "function")
          return this.instructions_[this.zIndex + this.offset_] || (this.instructions_[this.zIndex + this.offset_] = []), this.instructions_[this.zIndex + this.offset_].push(n), this.pushMethodArgs_;
      },
      set: (e, n, i) => (this.instructions_[this.zIndex + this.offset_] || (this.instructions_[this.zIndex + this.offset_] = []), this.instructions_[this.zIndex + this.offset_].push(n, i), !0)
    });
  }
  /**
   * Push a function that renders to the context directly.
   * @param {function(CanvasRenderingContext2D): void} render Function.
   */
  pushFunction(e) {
    this.instructions_[this.zIndex + this.offset_].push(e);
  }
  /**
   * Get a proxy for CanvasRenderingContext2D which does not support getting state
   * (e.g. `context.globalAlpha`, which will return `undefined`). To set state, if it relies on a
   * previous state (e.g. `context.globalAlpha = context.globalAlpha / 2`), set a function,
   * e.g. `context.globalAlpha = (context) => context.globalAlpha / 2`.
   * @return {ZIndexContextProxy} Context.
   */
  getContext() {
    return this.context_;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   */
  draw(e) {
    this.instructions_.forEach((n) => {
      for (let i = 0, r = n.length; i < r; ++i) {
        const s = n[i];
        if (typeof s == "function") {
          s(e);
          continue;
        }
        const o = n[++i];
        if (typeof /** @type {*} */
        e[s] == "function")
          e[s](...o);
        else {
          if (typeof o == "function") {
            e[s] = o(e);
            continue;
          }
          e[s] = o;
        }
      }
    });
  }
  clear() {
    this.instructions_.length = 0, this.zIndex = 0, this.offset_ = 0;
  }
  /**
   * Offsets the zIndex by the highest current zIndex. Useful for rendering multiple worlds or tiles, to
   * avoid conflicting context.clip() or context.save()/restore() calls.
   */
  offset() {
    this.offset_ = this.instructions_.length, this.zIndex = 0;
  }
}
const gg = [];
let nr = null;
function Ux() {
  nr = we(1, 1, void 0, {
    willReadFrequently: !0
  });
}
class U_ extends Yx {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(e) {
    super(e), this.container = null, this.renderedResolution, this.tempTransform = jt(), this.pixelTransform = jt(), this.inversePixelTransform = jt(), this.context = null, this.deferredContext_ = null, this.containerReused = !1, this.frameState = null;
  }
  /**
   * @param {import('../../DataTile.js').ImageLike} image Image.
   * @param {number} col The column index.
   * @param {number} row The row index.
   * @return {Uint8ClampedArray|null} The image data.
   */
  getImageData(e, n, i) {
    nr || Ux(), nr.clearRect(0, 0, 1, 1);
    let r;
    try {
      nr.drawImage(e, n, i, 1, 1, 0, 0, 1, 1), r = nr.getImageData(0, 0, 1, 1).data;
    } catch {
      return nr = null, null;
    }
    return r;
  }
  /**
   * @param {import('../../Map.js').FrameState} frameState Frame state.
   * @return {string} Background color.
   */
  getBackground(e) {
    let i = this.getLayer().getBackground();
    return typeof i == "function" && (i = i(e.viewState.resolution)), i || void 0;
  }
  /**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {string} [backgroundColor] Background color.
   */
  useContainer(e, n, i) {
    const r = this.getLayer().getClassName();
    let s, o;
    if (e && e.className === r && (!i || e && e.style.backgroundColor && hi(
      to(e.style.backgroundColor),
      to(i)
    ))) {
      const l = e.firstElementChild;
      l instanceof HTMLCanvasElement && (o = l.getContext("2d"));
    }
    if (o && o.canvas.style.transform === n ? (this.container = e, this.context = o, this.containerReused = !0) : this.containerReused ? (this.container = null, this.context = null, this.containerReused = !1) : this.container && (this.container.style.backgroundColor = null), !this.container) {
      s = document.createElement("div"), s.className = r;
      let l = s.style;
      l.position = "absolute", l.width = "100%", l.height = "100%", o = we();
      const a = o.canvas;
      s.appendChild(a), l = a.style, l.position = "absolute", l.left = "0", l.transformOrigin = "top left", this.container = s, this.context = o;
    }
    !this.containerReused && i && !this.container.style.backgroundColor && (this.container.style.backgroundColor = i);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent Clip extent.
   * @protected
   */
  clipUnrotated(e, n, i) {
    const r = Gi(i), s = ya(i), o = _a(i), l = ma(i);
    Oe(n.coordinateToPixelTransform, r), Oe(n.coordinateToPixelTransform, s), Oe(n.coordinateToPixelTransform, o), Oe(n.coordinateToPixelTransform, l);
    const a = this.inversePixelTransform;
    Oe(a, r), Oe(a, s), Oe(a, o), Oe(a, l), e.save(), e.beginPath(), e.moveTo(Math.round(r[0]), Math.round(r[1])), e.lineTo(Math.round(s[0]), Math.round(s[1])), e.lineTo(Math.round(o[0]), Math.round(o[1])), e.lineTo(Math.round(l[0]), Math.round(l[1])), e.clip();
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @protected
   */
  prepareContainer(e, n) {
    const i = e.extent, r = e.viewState.resolution, s = e.viewState.rotation, o = e.pixelRatio, l = Math.round(ne(i) / r * o), a = Math.round(Be(i) / r * o);
    In(
      this.pixelTransform,
      e.size[0] / 2,
      e.size[1] / 2,
      1 / o,
      1 / o,
      s,
      -l / 2,
      -a / 2
    ), r_(this.inversePixelTransform, this.pixelTransform);
    const u = Ev(this.pixelTransform);
    if (this.useContainer(n, u, this.getBackground(e)), !this.containerReused) {
      const c = this.context.canvas;
      c.width != l || c.height != a ? (c.width = l, c.height = a) : this.context.clearRect(0, 0, l, a), u !== c.style.transform && (c.style.transform = u);
    }
  }
  /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @private
   */
  dispatchRenderEvent_(e, n, i) {
    const r = this.getLayer();
    if (r.hasListener(e)) {
      const s = new F_(
        e,
        this.inversePixelTransform,
        i,
        n
      );
      r.dispatchEvent(s);
    }
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  preRender(e, n) {
    this.frameState = n, !n.declutter && this.dispatchRenderEvent_(Rt.PRERENDER, e, n);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  postRender(e, n) {
    n.declutter || this.dispatchRenderEvent_(Rt.POSTRENDER, e, n);
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeferredInternal(e) {
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import('../../render/canvas/ZIndexContext.js').ZIndexContextProxy} Context.
   */
  getRenderContext(e) {
    return e.declutter && !this.deferredContext_ && (this.deferredContext_ = new Y_()), e.declutter ? this.deferredContext_.getContext() : this.context;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @override
   */
  renderDeferred(e) {
    e.declutter && (this.dispatchRenderEvent_(
      Rt.PRERENDER,
      this.context,
      e
    ), e.declutter && this.deferredContext_ && (this.deferredContext_.draw(this.context), this.deferredContext_.clear()), this.renderDeferredInternal(e), this.dispatchRenderEvent_(
      Rt.POSTRENDER,
      this.context,
      e
    ));
  }
  /**
   * Creates a transform for rendering to an element that will be rotated after rendering.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} width Width of the rendered element (in pixels).
   * @param {number} height Height of the rendered element (in pixels).
   * @param {number} offsetX Offset on the x-axis in view coordinates.
   * @protected
   * @return {!import("../../transform.js").Transform} Transform.
   */
  getRenderTransform(e, n, i, r, s, o, l) {
    const a = s / 2, u = o / 2, c = r / n, h = -c, d = -e[0] + l, f = -e[1];
    return In(
      this.tempTransform,
      a,
      u,
      c,
      h,
      -i,
      d,
      f
    );
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    delete this.frameState, super.disposeInternal();
  }
}
class od extends ga {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {Options} [options] Tile options.
   */
  constructor(e, n, i) {
    super(), i = i || {}, this.tileCoord = e, this.state = n, this.key = "", this.transition_ = i.transition === void 0 ? 250 : i.transition, this.transitionStarts_ = {}, this.interpolate = !!i.interpolate;
  }
  /**
   * @protected
   */
  changed() {
    this.dispatchEvent(V.CHANGE);
  }
  /**
   * Called by the tile cache when the tile is removed from the cache due to expiry
   */
  release() {
    this.state === F.ERROR && this.setState(F.EMPTY);
  }
  /**
   * @return {string} Key.
   */
  getKey() {
    return this.key + "/" + this.tileCoord;
  }
  /**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */
  getTileCoord() {
    return this.tileCoord;
  }
  /**
   * @return {import("./TileState.js").default} State.
   */
  getState() {
    return this.state;
  }
  /**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {import("./TileState.js").default} state State.
   * @api
   */
  setState(e) {
    if (this.state !== F.ERROR && this.state > e)
      throw new Error("Tile load sequence violation");
    this.state = e, this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */
  load() {
    J();
  }
  /**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */
  getAlpha(e, n) {
    if (!this.transition_)
      return 1;
    let i = this.transitionStarts_[e];
    if (!i)
      i = n, this.transitionStarts_[e] = i;
    else if (i === -1)
      return 1;
    const r = n - i + 1e3 / 60;
    return r >= this.transition_ ? 1 : i_(r / this.transition_);
  }
  /**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */
  inTransition(e) {
    return this.transition_ ? this.transitionStarts_[e] !== -1 : !1;
  }
  /**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */
  endTransition(e) {
    this.transition_ && (this.transitionStarts_[e] = -1);
  }
  /**
   * @override
   */
  disposeInternal() {
    this.release(), super.disposeInternal();
  }
}
function Zl(t) {
  return t instanceof Image || t instanceof HTMLCanvasElement || t instanceof HTMLVideoElement || t instanceof ImageBitmap ? t : null;
}
function Bx(t) {
  return t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Float32Array || t instanceof DataView ? t : null;
}
const Vx = new Error("disposed");
let Hi = null;
function Kx(t) {
  Hi || (Hi = we(
    t.width,
    t.height,
    void 0,
    { willReadFrequently: !0 }
  ));
  const e = Hi.canvas, n = t.width;
  e.width !== n && (e.width = n);
  const i = t.height;
  return e.height !== i && (e.height = i), Hi.clearRect(0, 0, n, i), Hi.drawImage(t, 0, 0), Hi.getImageData(0, 0, n, i).data;
}
const bx = [256, 256];
class Pc extends od {
  /**
   * @param {Options} options Tile options.
   */
  constructor(e) {
    const n = F.IDLE;
    super(e.tileCoord, n, {
      transition: e.transition,
      interpolate: e.interpolate
    }), this.loader_ = e.loader, this.data_ = null, this.error_ = null, this.size_ = e.size || null, this.controller_ = e.controller || null;
  }
  /**
   * Get the tile size.
   * @return {import('./size.js').Size} Tile size.
   */
  getSize() {
    if (this.size_)
      return this.size_;
    const e = Zl(this.data_);
    return e ? [e.width, e.height] : bx;
  }
  /**
   * Get the data for the tile.
   * @return {Data} Tile data.
   * @api
   */
  getData() {
    return this.data_;
  }
  /**
   * Get any loading error.
   * @return {Error} Loading error.
   * @api
   */
  getError() {
    return this.error_;
  }
  /**
   * Load the tile data.
   * @api
   * @override
   */
  load() {
    if (this.state !== F.IDLE && this.state !== F.ERROR)
      return;
    this.state = F.LOADING, this.changed();
    const e = this;
    this.loader_().then(function(n) {
      e.data_ = n, e.state = F.LOADED, e.changed();
    }).catch(function(n) {
      e.error_ = n, e.state = F.ERROR, e.changed();
    });
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.controller_ && (this.controller_.abort(Vx), this.controller_ = null), super.disposeInternal();
  }
}
class B_ extends od {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [options] Tile options.
   */
  constructor(e, n, i, r, s, o) {
    super(e, n, o), this.crossOrigin_ = r, this.src_ = i, this.key = i, this.image_ = new Image(), r !== null && (this.image_.crossOrigin = r), this.unlisten_ = null, this.tileLoadFunction_ = s;
  }
  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
   * @param {HTMLCanvasElement|HTMLImageElement} element Element.
   */
  setImage(e) {
    this.image_ = e, this.state = F.LOADED, this.unlistenImage_(), this.changed();
  }
  /**
   * Tracks loading or read errors.
   *
   * @private
   */
  handleImageError_() {
    this.state = F.ERROR, this.unlistenImage_(), this.image_ = Zx(), this.changed();
  }
  /**
   * Tracks successful image load.
   *
   * @private
   */
  handleImageLoad_() {
    const e = (
      /** @type {HTMLImageElement} */
      this.image_
    );
    e.naturalWidth && e.naturalHeight ? this.state = F.LOADED : this.state = F.EMPTY, this.unlistenImage_(), this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   *
   * To retry loading tiles on failed requests, use a custom `tileLoadFunction`
   * that checks for error status codes and reloads only when the status code is
   * 408, 429, 500, 502, 503 and 504, and only when not too many retries have been
   * made already:
   *
   * ```js
   * const retryCodes = [408, 429, 500, 502, 503, 504];
   * const retries = {};
   * source.setTileLoadFunction((tile, src) => {
   *   const image = tile.getImage();
   *   fetch(src)
   *     .then((response) => {
   *       if (retryCodes.includes(response.status)) {
   *         retries[src] = (retries[src] || 0) + 1;
   *         if (retries[src] <= 3) {
   *           setTimeout(() => tile.load(), retries[src] * 1000);
   *         }
   *         return Promise.reject();
   *       }
   *       return response.blob();
   *     })
   *     .then((blob) => {
   *       const imageUrl = URL.createObjectURL(blob);
   *       image.src = imageUrl;
   *       setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
   *     })
   *     .catch(() => tile.setState(3)); // error
   * });
   * ```
   * @api
   * @override
   */
  load() {
    this.state == F.ERROR && (this.state = F.IDLE, this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)), this.state == F.IDLE && (this.state = F.LOADING, this.changed(), this.tileLoadFunction_(this, this.src_), this.unlisten_ = aE(
      this.image_,
      this.handleImageLoad_.bind(this),
      this.handleImageError_.bind(this)
    ));
  }
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
  /**
   * @override
   */
  disposeInternal() {
    this.unlistenImage_(), this.image_ = null, super.disposeInternal();
  }
}
function Zx() {
  const t = we(1, 1);
  return t.fillStyle = "rgba(0,0,0,0)", t.fillRect(0, 0, 1, 1), t.canvas;
}
class Hx {
  /**
   * @param {number} [highWaterMark] High water mark.
   */
  constructor(e) {
    this.highWaterMark = e !== void 0 ? e : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  /**
   * Expire the cache. When the cache entry is a {@link module:ol/Disposable~Disposable},
   * the entry will be disposed.
   * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
   */
  expireCache(e) {
    for (; this.canExpireCache(); ) {
      const n = this.pop();
      n instanceof da && n.dispose();
    }
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  /**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */
  containsKey(e) {
    return this.entries_.hasOwnProperty(e);
  }
  /**
   * @param {function(T, string, LRUCache<T>): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   */
  forEach(e) {
    let n = this.oldest_;
    for (; n; )
      e(n.value_, n.key_, this), n = n.newer;
  }
  /**
   * @param {string} key Key.
   * @param {*} [options] Options (reserved for subclasses).
   * @return {T} Value.
   */
  get(e, n) {
    const i = this.entries_[e];
    return ee(
      i !== void 0,
      "Tried to get a value for a key that does not exist in the cache"
    ), i === this.newest_ || (i === this.oldest_ ? (this.oldest_ = /** @type {Entry} */
    this.oldest_.newer, this.oldest_.older = null) : (i.newer.older = i.older, i.older.newer = i.newer), i.newer = null, i.older = this.newest_, this.newest_.newer = i, this.newest_ = i), i.value_;
  }
  /**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */
  remove(e) {
    const n = this.entries_[e];
    return ee(
      n !== void 0,
      "Tried to get a value for a key that does not exist in the cache"
    ), n === this.newest_ ? (this.newest_ = /** @type {Entry} */
    n.older, this.newest_ && (this.newest_.newer = null)) : n === this.oldest_ ? (this.oldest_ = /** @type {Entry} */
    n.newer, this.oldest_ && (this.oldest_.older = null)) : (n.newer.older = n.older, n.older.newer = n.newer), delete this.entries_[e], --this.count_, n.value_;
  }
  /**
   * @return {number} Count.
   */
  getCount() {
    return this.count_;
  }
  /**
   * @return {Array<string>} Keys.
   */
  getKeys() {
    const e = new Array(this.count_);
    let n = 0, i;
    for (i = this.newest_; i; i = i.older)
      e[n++] = i.key_;
    return e;
  }
  /**
   * @return {Array<T>} Values.
   */
  getValues() {
    const e = new Array(this.count_);
    let n = 0, i;
    for (i = this.newest_; i; i = i.older)
      e[n++] = i.value_;
    return e;
  }
  /**
   * @return {T} Last value.
   */
  peekLast() {
    return this.oldest_.value_;
  }
  /**
   * @return {string} Last key.
   */
  peekLastKey() {
    return this.oldest_.key_;
  }
  /**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */
  peekFirstKey() {
    return this.newest_.key_;
  }
  /**
   * Return an entry without updating least recently used time.
   * @param {string} key Key.
   * @return {T|undefined} Value.
   */
  peek(e) {
    var n;
    return (n = this.entries_[e]) == null ? void 0 : n.value_;
  }
  /**
   * @return {T} value Value.
   */
  pop() {
    const e = this.oldest_;
    return delete this.entries_[e.key_], e.newer && (e.newer.older = null), this.oldest_ = /** @type {Entry} */
    e.newer, this.oldest_ || (this.newest_ = null), --this.count_, e.value_;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  replace(e, n) {
    this.get(e), this.entries_[e].value_ = n;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  set(e, n) {
    ee(
      !(e in this.entries_),
      "Tried to set a value for a key that is used already"
    );
    const i = {
      key_: e,
      newer: null,
      older: this.newest_,
      value_: n
    };
    this.newest_ ? this.newest_.newer = i : this.oldest_ = i, this.newest_ = i, this.entries_[e] = i, ++this.count_;
  }
  /**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */
  setSize(e) {
    this.highWaterMark = e;
  }
}
const V_ = 0.5, $x = 10, pg = 0.25;
class K_ {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
   * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
   * @param {number} errorThreshold Acceptable error (in source units).
   * @param {?number} destinationResolution The (optional) resolution of the destination.
   */
  constructor(e, n, i, r, s, o) {
    this.sourceProj_ = e, this.targetProj_ = n;
    let l = {};
    const a = Xl(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(g) {
      const _ = g[0] + "/" + g[1];
      return l[_] || (l[_] = a(g)), l[_];
    }, this.maxSourceExtent_ = r, this.errorThresholdSquared_ = s * s, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!r && !!this.sourceProj_.getExtent() && ne(r) >= ne(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? ne(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? ne(this.targetProj_.getExtent()) : null;
    const u = Gi(i), c = ya(i), h = _a(i), d = ma(i), f = this.transformInv_(u), m = this.transformInv_(c), y = this.transformInv_(h), E = this.transformInv_(d), p = $x + (o ? Math.max(
      0,
      Math.ceil(
        Math.log2(
          qs(i) / (o * o * 256 * 256)
        )
      )
    ) : 0);
    if (this.addQuad_(
      u,
      c,
      h,
      d,
      f,
      m,
      y,
      E,
      p
    ), this.wrapsXInSource_) {
      let g = 1 / 0;
      this.triangles_.forEach(function(_, v, x) {
        g = Math.min(
          g,
          _.source[0][0],
          _.source[1][0],
          _.source[2][0]
        );
      }), this.triangles_.forEach((_) => {
        if (Math.max(
          _.source[0][0],
          _.source[1][0],
          _.source[2][0]
        ) - g > this.sourceWorldWidth_ / 2) {
          const v = [
            [_.source[0][0], _.source[0][1]],
            [_.source[1][0], _.source[1][1]],
            [_.source[2][0], _.source[2][1]]
          ];
          v[0][0] - g > this.sourceWorldWidth_ / 2 && (v[0][0] -= this.sourceWorldWidth_), v[1][0] - g > this.sourceWorldWidth_ / 2 && (v[1][0] -= this.sourceWorldWidth_), v[2][0] - g > this.sourceWorldWidth_ / 2 && (v[2][0] -= this.sourceWorldWidth_);
          const x = Math.min(
            v[0][0],
            v[1][0],
            v[2][0]
          );
          Math.max(
            v[0][0],
            v[1][0],
            v[2][0]
          ) - x < this.sourceWorldWidth_ / 2 && (_.source = v);
        }
      });
    }
    l = {};
  }
  /**
   * Adds triangle to the triangulation.
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @private
   */
  addTriangle_(e, n, i, r, s, o) {
    this.triangles_.push({
      source: [r, s, o],
      target: [e, n, i]
    });
  }
  /**
   * Adds quad (points in clock-wise order) to the triangulation
   * (and reprojects the vertices) if valid.
   * Performs quad subdivision if needed to increase precision.
   *
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
   * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
   * @private
   */
  addQuad_(e, n, i, r, s, o, l, a, u) {
    const c = Of([s, o, l, a]), h = this.sourceWorldWidth_ ? ne(c) / this.sourceWorldWidth_ : null, d = (
      /** @type {number} */
      this.sourceWorldWidth_
    ), f = this.sourceProj_.canWrapX() && h > 0.5 && h < 1;
    let m = !1;
    if (u > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const E = Of([e, n, i, r]);
        m = ne(E) / this.targetWorldWidth_ > pg || m;
      }
      !f && this.sourceProj_.isGlobal() && h && (m = h > pg || m);
    }
    if (!m && this.maxSourceExtent_ && isFinite(c[0]) && isFinite(c[1]) && isFinite(c[2]) && isFinite(c[3]) && !nt(c, this.maxSourceExtent_))
      return;
    let y = 0;
    if (!m && (!isFinite(s[0]) || !isFinite(s[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(l[0]) || !isFinite(l[1]) || !isFinite(a[0]) || !isFinite(a[1]))) {
      if (u > 0)
        m = !0;
      else if (y = (!isFinite(s[0]) || !isFinite(s[1]) ? 8 : 0) + (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) + (!isFinite(l[0]) || !isFinite(l[1]) ? 2 : 0) + (!isFinite(a[0]) || !isFinite(a[1]) ? 1 : 0), y != 1 && y != 2 && y != 4 && y != 8)
        return;
    }
    if (u > 0) {
      if (!m) {
        const E = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2], p = this.transformInv_(E);
        let g;
        f ? g = (Tr(s[0], d) + Tr(l[0], d)) / 2 - Tr(p[0], d) : g = (s[0] + l[0]) / 2 - p[0];
        const _ = (s[1] + l[1]) / 2 - p[1];
        m = g * g + _ * _ > this.errorThresholdSquared_;
      }
      if (m) {
        if (Math.abs(e[0] - i[0]) <= Math.abs(e[1] - i[1])) {
          const E = [(n[0] + i[0]) / 2, (n[1] + i[1]) / 2], p = this.transformInv_(E), g = [(r[0] + e[0]) / 2, (r[1] + e[1]) / 2], _ = this.transformInv_(g);
          this.addQuad_(
            e,
            n,
            E,
            g,
            s,
            o,
            p,
            _,
            u - 1
          ), this.addQuad_(
            g,
            E,
            i,
            r,
            _,
            p,
            l,
            a,
            u - 1
          );
        } else {
          const E = [(e[0] + n[0]) / 2, (e[1] + n[1]) / 2], p = this.transformInv_(E), g = [(i[0] + r[0]) / 2, (i[1] + r[1]) / 2], _ = this.transformInv_(g);
          this.addQuad_(
            e,
            E,
            g,
            r,
            s,
            p,
            _,
            a,
            u - 1
          ), this.addQuad_(
            E,
            n,
            i,
            g,
            p,
            o,
            l,
            _,
            u - 1
          );
        }
        return;
      }
    }
    if (f) {
      if (!this.canWrapXInSource_)
        return;
      this.wrapsXInSource_ = !0;
    }
    y & 11 || this.addTriangle_(e, i, r, s, l, a), y & 14 || this.addTriangle_(e, i, n, s, l, o), y && (y & 13 || this.addTriangle_(n, r, e, o, a, s), y & 7 || this.addTriangle_(n, r, i, o, a, l));
  }
  /**
   * Calculates extent of the `source` coordinates from all the triangles.
   *
   * @return {import("../extent.js").Extent} Calculated extent.
   */
  calculateSourceExtent() {
    const e = kt();
    return this.triangles_.forEach(function(n, i, r) {
      const s = n.source;
      Ps(e, s[0]), Ps(e, s[1]), Ps(e, s[2]);
    }), e;
  }
  /**
   * @return {Array<Triangle>} Array of the calculated triangles.
   */
  getTriangles() {
    return this.triangles_;
  }
}
let xu;
const wn = [];
function mg(t, e, n, i, r) {
  t.beginPath(), t.moveTo(0, 0), t.lineTo(e, n), t.lineTo(i, r), t.closePath(), t.save(), t.clip(), t.fillRect(0, 0, Math.max(e, i) + 1, Math.max(n, r)), t.restore();
}
function wu(t, e) {
  return Math.abs(t[e * 4] - 210) > 2 || Math.abs(t[e * 4 + 3] - 0.75 * 255) > 2;
}
function qx() {
  if (xu === void 0) {
    const t = we(6, 6, wn);
    t.globalCompositeOperation = "lighter", t.fillStyle = "rgba(210, 0, 0, 0.75)", mg(t, 4, 5, 4, 0), mg(t, 4, 5, 0, 5);
    const e = t.getImageData(0, 0, 3, 3).data;
    xu = wu(e, 0) || wu(e, 4) || wu(e, 8), Wr(t), wn.push(t.canvas);
  }
  return xu;
}
function _g(t, e, n, i) {
  const r = Wh(n, e, t);
  let s = Nf(
    e,
    i,
    n
  );
  const o = e.getMetersPerUnit();
  o !== void 0 && (s *= o);
  const l = t.getMetersPerUnit();
  l !== void 0 && (s /= l);
  const a = t.getExtent();
  if (!a || Gr(a, r)) {
    const u = Nf(t, s, r) / s;
    isFinite(u) && u > 0 && (s /= u);
  }
  return s;
}
function b_(t, e, n, i) {
  const r = Oi(n);
  let s = _g(
    t,
    e,
    r,
    i
  );
  return (!isFinite(s) || s <= 0) && $m(n, function(o) {
    return s = _g(
      t,
      e,
      o,
      i
    ), isFinite(s) && s > 0;
  }), s;
}
function Z_(t, e, n, i, r, s, o, l, a, u, c, h, d, f) {
  const m = we(
    Math.round(n * t),
    Math.round(n * e),
    wn
  );
  if (h || (m.imageSmoothingEnabled = !1), a.length === 0)
    return m.canvas;
  m.scale(n, n);
  function y(x) {
    return Math.round(x * n) / n;
  }
  m.globalCompositeOperation = "lighter";
  const E = kt();
  a.forEach(function(x, C, S) {
    q1(E, x.extent);
  });
  let p;
  const g = n / i, _ = (h ? 1 : 1 + Math.pow(2, -24)) / g;
  if (!d || a.length !== 1 || u !== 0) {
    if (p = we(
      Math.round(ne(E) * g),
      Math.round(Be(E) * g),
      wn
    ), h || (p.imageSmoothingEnabled = !1), r && f) {
      const x = (r[0] - E[0]) * g, C = -(r[3] - E[3]) * g, S = ne(r) * g, w = Be(r) * g;
      p.rect(x, C, S, w), p.clip();
    }
    a.forEach(function(x, C, S) {
      if (x.image.width > 0 && x.image.height > 0) {
        if (x.clipExtent) {
          p.save();
          const G = (x.clipExtent[0] - E[0]) * g, X = -(x.clipExtent[3] - E[3]) * g, D = ne(x.clipExtent) * g, Y = Be(x.clipExtent) * g;
          p.rect(
            h ? G : Math.round(G),
            h ? X : Math.round(X),
            h ? D : Math.round(G + D) - Math.round(G),
            h ? Y : Math.round(X + Y) - Math.round(X)
          ), p.clip();
        }
        const w = (x.extent[0] - E[0]) * g, T = -(x.extent[3] - E[3]) * g, A = ne(x.extent) * g, N = Be(x.extent) * g;
        p.drawImage(
          x.image,
          u,
          u,
          x.image.width - 2 * u,
          x.image.height - 2 * u,
          h ? w : Math.round(w),
          h ? T : Math.round(T),
          h ? A : Math.round(w + A) - Math.round(w),
          h ? N : Math.round(T + N) - Math.round(T)
        ), x.clipExtent && p.restore();
      }
    });
  }
  const v = Gi(o);
  return l.getTriangles().forEach(function(x, C, S) {
    const w = x.source, T = x.target;
    let A = w[0][0], N = w[0][1], G = w[1][0], X = w[1][1], D = w[2][0], Y = w[2][1];
    const P = y((T[0][0] - v[0]) / s), K = y(
      -(T[0][1] - v[1]) / s
    ), I = y((T[1][0] - v[0]) / s), O = y(
      -(T[1][1] - v[1]) / s
    ), M = y((T[2][0] - v[0]) / s), W = y(
      -(T[2][1] - v[1]) / s
    ), U = A, me = N;
    A = 0, N = 0, G -= U, X -= me, D -= U, Y -= me;
    const k = [
      [G, X, 0, 0, I - P],
      [D, Y, 0, 0, M - P],
      [0, 0, G, X, O - K],
      [0, 0, D, Y, W - K]
    ], Ie = X1(k);
    if (!Ie)
      return;
    if (m.save(), m.beginPath(), qx() || !h) {
      m.moveTo(I, O);
      const de = 4, Bt = P - I, sn = K - O;
      for (let pt = 0; pt < de; pt++)
        m.lineTo(
          I + y((pt + 1) * Bt / de),
          O + y(pt * sn / (de - 1))
        ), pt != de - 1 && m.lineTo(
          I + y((pt + 1) * Bt / de),
          O + y((pt + 1) * sn / (de - 1))
        );
      m.lineTo(M, W);
    } else
      m.moveTo(I, O), m.lineTo(P, K), m.lineTo(M, W);
    m.clip(), m.transform(
      Ie[0],
      Ie[2],
      Ie[1],
      Ie[3],
      P,
      K
    ), m.translate(
      E[0] - U,
      E[3] - me
    );
    let ae;
    if (p)
      ae = p.canvas, m.scale(_, -_);
    else {
      const de = a[0], Bt = de.extent;
      ae = de.image, m.scale(
        ne(Bt) / ae.width,
        -Be(Bt) / ae.height
      );
    }
    m.drawImage(ae, 0, 0), m.restore();
  }), p && (Wr(p), wn.push(p.canvas)), c && (m.save(), m.globalCompositeOperation = "source-over", m.strokeStyle = "black", m.lineWidth = 1, l.getTriangles().forEach(function(x, C, S) {
    const w = x.target, T = (w[0][0] - v[0]) / s, A = -(w[0][1] - v[1]) / s, N = (w[1][0] - v[0]) / s, G = -(w[1][1] - v[1]) / s, X = (w[2][0] - v[0]) / s, D = -(w[2][1] - v[1]) / s;
    m.beginPath(), m.moveTo(N, G), m.lineTo(T, A), m.lineTo(X, D), m.closePath(), m.stroke();
  }), m.restore()), m.canvas;
}
class Qx extends Pc {
  /**
   * @param {Options} options Tile options.
   */
  constructor(e) {
    super({
      tileCoord: e.tileCoord,
      loader: () => Promise.resolve(new Uint8ClampedArray(4)),
      interpolate: e.interpolate,
      transition: e.transition
    }), this.pixelRatio_ = e.pixelRatio, this.gutter_ = e.gutter, this.reprojData_ = null, this.reprojError_ = null, this.reprojSize_ = void 0, this.sourceTileGrid_ = e.sourceTileGrid, this.targetTileGrid_ = e.targetTileGrid, this.wrappedTileCoord_ = e.wrappedTileCoord || e.tileCoord, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
    const n = e.sourceProj, i = n.getExtent(), r = e.sourceTileGrid.getExtent();
    this.clipExtent_ = n.canWrapX() ? r ? Gt(i, r) : i : r;
    const s = this.targetTileGrid_.getTileCoordExtent(
      this.wrappedTileCoord_
    ), o = this.targetTileGrid_.getExtent();
    let l = this.sourceTileGrid_.getExtent();
    const a = o ? Gt(s, o) : s;
    if (qs(a) === 0) {
      this.state = F.EMPTY;
      return;
    }
    i && (l ? l = Gt(l, i) : l = i);
    const u = this.targetTileGrid_.getResolution(
      this.wrappedTileCoord_[0]
    ), c = e.targetProj, h = b_(
      n,
      c,
      a,
      u
    );
    if (!isFinite(h) || h <= 0) {
      this.state = F.EMPTY;
      return;
    }
    const d = e.errorThreshold !== void 0 ? e.errorThreshold : V_;
    if (this.triangulation_ = new K_(
      n,
      c,
      a,
      l,
      h * d,
      u
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = F.EMPTY;
      return;
    }
    this.sourceZ_ = this.sourceTileGrid_.getZForResolution(h);
    let f = this.triangulation_.calculateSourceExtent();
    if (l && (n.canWrapX() ? (f[1] = Ee(
      f[1],
      l[1],
      l[3]
    ), f[3] = Ee(
      f[3],
      l[1],
      l[3]
    )) : f = Gt(f, l)), !qs(f))
      this.state = F.EMPTY;
    else {
      let m = 0, y = 0;
      n.canWrapX() && (m = ne(i), y = Math.floor(
        (f[0] - i[0]) / m
      )), Oh(
        f.slice(),
        n,
        !0
      ).forEach((p) => {
        const g = this.sourceTileGrid_.getTileRangeForExtentAndZ(
          p,
          this.sourceZ_
        ), _ = e.getTileFunction;
        for (let v = g.minX; v <= g.maxX; v++)
          for (let x = g.minY; x <= g.maxY; x++) {
            const C = _(this.sourceZ_, v, x, this.pixelRatio_);
            if (C) {
              const S = y * m;
              this.sourceTiles_.push({ tile: C, offset: S });
            }
          }
        ++y;
      }), this.sourceTiles_.length === 0 && (this.state = F.EMPTY);
    }
  }
  /**
   * Get the tile size.
   * @return {import('../size.js').Size} Tile size.
   * @override
   */
  getSize() {
    return this.reprojSize_;
  }
  /**
   * Get the data for the tile.
   * @return {import("../DataTile.js").Data} Tile data.
   * @override
   */
  getData() {
    return this.reprojData_;
  }
  /**
   * Get any loading error.
   * @return {Error} Loading error.
   * @override
   */
  getError() {
    return this.reprojError_;
  }
  /**
   * @private
   */
  reproject_() {
    const e = [];
    let n = !1;
    if (this.sourceTiles_.forEach((m) => {
      var K;
      const y = m.tile;
      if (!y || y.getState() !== F.LOADED)
        return;
      const E = y.getSize(), p = this.gutter_;
      let g;
      const _ = Bx(y.getData());
      _ ? g = _ : (n = !0, g = Kx(Zl(y.getData())));
      const v = [E[0] + 2 * p, E[1] + 2 * p], x = g instanceof Float32Array, C = v[0] * v[1], S = x ? Float32Array : Uint8ClampedArray, w = new S(g.buffer), T = S.BYTES_PER_ELEMENT, A = T * w.length / C, N = w.byteLength / v[1], G = Math.floor(
        N / T / v[0]
      ), X = C * G;
      let D = w;
      if (w.length !== X) {
        D = new S(X);
        let I = 0, O = 0;
        const M = v[0] * G;
        for (let W = 0; W < v[1]; ++W) {
          for (let U = 0; U < M; ++U)
            D[I++] = w[O + U];
          O += N / T;
        }
      }
      const Y = this.sourceTileGrid_.getTileCoordExtent(y.tileCoord);
      Y[0] += m.offset, Y[2] += m.offset;
      const P = (K = this.clipExtent_) == null ? void 0 : K.slice();
      P && (P[0] += m.offset, P[2] += m.offset), e.push({
        extent: Y,
        clipExtent: P,
        data: new Uint8ClampedArray(D.buffer),
        dataType: S,
        bytesPerPixel: A,
        pixelSize: v
      });
    }), this.sourceTiles_.length = 0, e.length === 0) {
      this.state = F.ERROR, this.changed();
      return;
    }
    const i = this.wrappedTileCoord_[0], r = this.targetTileGrid_.getTileSize(i), s = typeof r == "number" ? r : r[0], o = typeof r == "number" ? r : r[1], l = this.targetTileGrid_.getResolution(i), a = this.sourceTileGrid_.getResolution(this.sourceZ_), u = this.targetTileGrid_.getTileCoordExtent(
      this.wrappedTileCoord_
    );
    let c, h;
    const d = e[0].bytesPerPixel, f = Math.ceil(d / 3);
    for (let m = f - 1; m >= 0; --m) {
      const y = [];
      for (let x = 0, C = e.length; x < C; ++x) {
        const S = e[x], w = S.data, T = S.pixelSize, A = T[0], N = T[1], G = we(A, N, wn), X = G.createImageData(A, N), D = X.data;
        let Y = m * 3;
        for (let P = 0, K = D.length; P < K; P += 4)
          D[P] = w[Y], D[P + 1] = w[Y + 1], D[P + 2] = w[Y + 2], D[P + 3] = 255, Y += d;
        G.putImageData(X, 0, 0), y.push({
          extent: S.extent,
          clipExtent: S.clipExtent,
          image: G.canvas
        });
      }
      const E = Z_(
        s,
        o,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        l,
        u,
        this.triangulation_,
        y,
        this.gutter_,
        !1,
        !1,
        !1
      );
      for (let x = 0, C = y.length; x < C; ++x) {
        const w = y[x].image.getContext("2d");
        Wr(w), wn.push(w.canvas);
      }
      const p = E.getContext("2d"), g = p.getImageData(0, 0, E.width, E.height);
      Wr(p), wn.push(E), c || (h = new Uint8ClampedArray(
        d * g.width * g.height
      ), c = new e[0].dataType(h.buffer));
      const _ = g.data;
      let v = m * 3;
      for (let x = 0, C = _.length; x < C; x += 4)
        _[x + 3] === 255 ? (h[v] = _[x], h[v + 1] = _[x + 1], h[v + 2] = _[x + 2]) : (h[v] = 0, h[v + 1] = 0, h[v + 2] = 0), v += d;
    }
    if (n) {
      const m = we(s, o), y = new ImageData(c, s);
      m.putImageData(y, 0, 0), this.reprojData_ = m.canvas;
    } else
      this.reprojData_ = c;
    this.reprojSize_ = [
      Math.round(s * this.pixelRatio_),
      Math.round(o * this.pixelRatio_)
    ], this.state = F.LOADED, this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state !== F.IDLE && this.state !== F.ERROR)
      return;
    this.state = F.LOADING, this.changed();
    let e = 0;
    this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(({ tile: n }) => {
      const i = n.getState();
      if (i !== F.IDLE && i !== F.LOADING)
        return;
      e++;
      const r = q(n, V.CHANGE, () => {
        const s = n.getState();
        (s == F.LOADED || s == F.ERROR || s == F.EMPTY) && (le(r), e--, e === 0 && (this.unlistenSources_(), this.reproject_()));
      });
      this.sourcesListenerKeys_.push(r);
    }), e === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function({ tile: n }) {
      n.getState() == F.IDLE && n.load();
    });
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(le), this.sourcesListenerKeys_ = null;
  }
}
class Ac extends od {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
   * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} gutter Gutter of the source tiles.
   * @param {FunctionType} getTileFunction
   *     Function returning source tiles (z, x, y, pixelRatio).
   * @param {number} [errorThreshold] Acceptable reprojection error (in px).
   * @param {boolean} [renderEdges] Render reprojection edges.
   * @param {import("../Tile.js").Options} [options] Tile options.
   */
  constructor(e, n, i, r, s, o, l, a, u, c, h, d) {
    super(s, F.IDLE, d), this.renderEdges_ = h !== void 0 ? h : !1, this.pixelRatio_ = l, this.gutter_ = a, this.canvas_ = null, this.sourceTileGrid_ = n, this.targetTileGrid_ = r, this.wrappedTileCoord_ = o || s, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0, this.clipExtent_ = e.canWrapX() ? e.getExtent() : void 0;
    const f = r.getTileCoordExtent(
      this.wrappedTileCoord_
    ), m = this.targetTileGrid_.getExtent();
    let y = this.sourceTileGrid_.getExtent();
    const E = m ? Gt(f, m) : f;
    if (qs(E) === 0) {
      this.state = F.EMPTY;
      return;
    }
    const p = e.getExtent();
    p && (y ? y = Gt(y, p) : y = p);
    const g = r.getResolution(
      this.wrappedTileCoord_[0]
    ), _ = b_(
      e,
      i,
      E,
      g
    );
    if (!isFinite(_) || _ <= 0) {
      this.state = F.EMPTY;
      return;
    }
    const v = c !== void 0 ? c : V_;
    if (this.triangulation_ = new K_(
      e,
      i,
      E,
      y,
      _ * v,
      g
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = F.EMPTY;
      return;
    }
    this.sourceZ_ = n.getZForResolution(_);
    let x = this.triangulation_.calculateSourceExtent();
    if (y && (e.canWrapX() ? (x[1] = Ee(
      x[1],
      y[1],
      y[3]
    ), x[3] = Ee(
      x[3],
      y[1],
      y[3]
    )) : x = Gt(x, y)), !qs(x))
      this.state = F.EMPTY;
    else {
      let C = 0, S = 0;
      e.canWrapX() && (C = ne(p), S = Math.floor(
        (x[0] - p[0]) / C
      )), Oh(
        x.slice(),
        e,
        !0
      ).forEach((T) => {
        const A = n.getTileRangeForExtentAndZ(
          T,
          this.sourceZ_
        );
        for (let N = A.minX; N <= A.maxX; N++)
          for (let G = A.minY; G <= A.maxY; G++) {
            const X = u(this.sourceZ_, N, G, l);
            if (X) {
              const D = S * C;
              this.sourceTiles_.push({ tile: X, offset: D });
            }
          }
        ++S;
      }), this.sourceTiles_.length === 0 && (this.state = F.EMPTY);
    }
  }
  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */
  getImage() {
    return this.canvas_;
  }
  /**
   * @private
   */
  reproject_() {
    const e = [];
    if (this.sourceTiles_.forEach((n) => {
      var r;
      const i = n.tile;
      if (i && i.getState() == F.LOADED) {
        const s = this.sourceTileGrid_.getTileCoordExtent(i.tileCoord);
        s[0] += n.offset, s[2] += n.offset;
        const o = (r = this.clipExtent_) == null ? void 0 : r.slice();
        o && (o[0] += n.offset, o[2] += n.offset), e.push({
          extent: s,
          clipExtent: o,
          image: i.getImage()
        });
      }
    }), this.sourceTiles_.length = 0, e.length === 0)
      this.state = F.ERROR;
    else {
      const n = this.wrappedTileCoord_[0], i = this.targetTileGrid_.getTileSize(n), r = typeof i == "number" ? i : i[0], s = typeof i == "number" ? i : i[1], o = this.targetTileGrid_.getResolution(n), l = this.sourceTileGrid_.getResolution(
        this.sourceZ_
      ), a = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_
      );
      this.canvas_ = Z_(
        r,
        s,
        this.pixelRatio_,
        l,
        this.sourceTileGrid_.getExtent(),
        o,
        a,
        this.triangulation_,
        e,
        this.gutter_,
        this.renderEdges_,
        this.interpolate
      ), this.state = F.LOADED;
    }
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state == F.IDLE) {
      this.state = F.LOADING, this.changed();
      let e = 0;
      this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(({ tile: n }) => {
        const i = n.getState();
        if (i == F.IDLE || i == F.LOADING) {
          e++;
          const r = q(n, V.CHANGE, (s) => {
            const o = n.getState();
            (o == F.LOADED || o == F.ERROR || o == F.EMPTY) && (le(r), e--, e === 0 && (this.unlistenSources_(), this.reproject_()));
          });
          this.sourcesListenerKeys_.push(r);
        }
      }), e === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function({ tile: n }, i, r) {
        n.getState() == F.IDLE && n.load();
      });
    }
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(le), this.sourcesListenerKeys_ = null;
  }
  /**
   * Remove from the cache due to expiry
   * @override
   */
  release() {
    this.canvas_ && (Wr(this.canvas_.getContext("2d")), wn.push(this.canvas_), this.canvas_ = null), super.release();
  }
}
class ld {
  /**
   * @param {number} minX Minimum X.
   * @param {number} maxX Maximum X.
   * @param {number} minY Minimum Y.
   * @param {number} maxY Maximum Y.
   */
  constructor(e, n, i, r) {
    this.minX = e, this.maxX = n, this.minY = i, this.maxY = r;
  }
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {boolean} Contains tile coordinate.
   */
  contains(e) {
    return this.containsXY(e[1], e[2]);
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Contains.
   */
  containsTileRange(e) {
    return this.minX <= e.minX && e.maxX <= this.maxX && this.minY <= e.minY && e.maxY <= this.maxY;
  }
  /**
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @return {boolean} Contains coordinate.
   */
  containsXY(e, n) {
    return this.minX <= e && e <= this.maxX && this.minY <= n && n <= this.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Equals.
   */
  equals(e) {
    return this.minX == e.minX && this.minY == e.minY && this.maxX == e.maxX && this.maxY == e.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   */
  extend(e) {
    e.minX < this.minX && (this.minX = e.minX), e.maxX > this.maxX && (this.maxX = e.maxX), e.minY < this.minY && (this.minY = e.minY), e.maxY > this.maxY && (this.maxY = e.maxY);
  }
  /**
   * @return {number} Height.
   */
  getHeight() {
    return this.maxY - this.minY + 1;
  }
  /**
   * @return {import("./size.js").Size} Size.
   */
  getSize() {
    return [this.getWidth(), this.getHeight()];
  }
  /**
   * @return {number} Width.
   */
  getWidth() {
    return this.maxX - this.minX + 1;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Intersects.
   */
  intersects(e) {
    return this.minX <= e.maxX && this.maxX >= e.minX && this.minY <= e.maxY && this.maxY >= e.minY;
  }
}
function $i(t, e, n, i, r) {
  return r !== void 0 ? (r.minX = t, r.maxX = e, r.minY = n, r.maxY = i, r) : new ld(t, e, n, i);
}
function Hl(t, e, n, i) {
  return i !== void 0 ? (i[0] = t, i[1] = e, i[2] = n, i) : [t, e, n];
}
function Jx(t, e, n) {
  return t + "/" + e + "/" + n;
}
function ew(t) {
  return tw(t[0], t[1], t[2]);
}
function tw(t, e, n) {
  return (e << t) + n;
}
function nw(t, e) {
  const n = t[0], i = t[1], r = t[2];
  if (e.getMinZoom() > n || n > e.getMaxZoom())
    return !1;
  const s = e.getFullTileRange(n);
  return s ? s.containsXY(i, r) : !0;
}
function Su(t, e, n, i) {
  return `${t},${Jx(e, n, i)}`;
}
function Cu(t, e, n) {
  if (!(n in t))
    return t[n] = /* @__PURE__ */ new Set([e]), !0;
  const i = t[n], r = i.has(e);
  return r || i.add(e), !r;
}
function iw(t, e, n) {
  const i = t[n];
  return i ? i.delete(e) : !1;
}
function yg(t, e) {
  const n = t.layerStatesArray[t.layerIndex];
  n.extent && (e = Gt(
    e,
    bn(n.extent, t.viewState.projection)
  ));
  const i = (
    /** @type {import("../../source/Tile.js").default} */
    n.layer.getRenderSource()
  );
  if (!i.getWrapX()) {
    const r = i.getTileGridForProjection(t.viewState.projection).getExtent();
    r && (e = Gt(e, r));
  }
  return e;
}
class rw extends U_ {
  /**
   * @param {LayerType} tileLayer Tile layer.
   * @param {Options} [options] Options.
   */
  constructor(e, n) {
    super(e), n = n || {}, this.extentChanged = !0, this.renderComplete = !1, this.renderedExtent_ = null, this.renderedPixelRatio, this.renderedProjection = null, this.renderedRevision, this.renderedTiles = [], this.renderedSourceKey_, this.renderedSourceRevision_, this.tempExtent = kt(), this.tempTileRange_ = new ld(0, 0, 0, 0), this.tempTileCoord_ = Hl(0, 0, 0);
    const i = n.cacheSize !== void 0 ? n.cacheSize : 512;
    this.tileCache_ = new Hx(i), this.renderedProjection_ = void 0, this.maxStaleKeys = i * 0.5;
  }
  /**
   * @return {LRUCache} Tile cache.
   */
  getTileCache() {
    return this.tileCache_;
  }
  /**
   * Get a tile from the cache or create one if needed.
   *
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @protected
   */
  getOrCreateTile(e, n, i, r) {
    const s = this.tileCache_, l = this.getLayer().getSource(), a = Su(l.getKey(), e, n, i);
    let u;
    if (s.containsKey(a))
      u = s.get(a);
    else {
      if (u = l.getTile(
        e,
        n,
        i,
        r.pixelRatio,
        r.viewState.projection
      ), !u)
        return null;
      s.set(a, u);
    }
    return u;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @protected
   */
  getTile(e, n, i, r) {
    const s = this.getOrCreateTile(e, n, i, r);
    return s || null;
  }
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray} Data at the pixel location.
   * @override
   */
  getData(e) {
    const n = this.frameState;
    if (!n)
      return null;
    const i = this.getLayer(), r = Oe(
      n.pixelToCoordinateTransform,
      e.slice()
    ), s = i.getExtent();
    if (s && !Gr(s, r))
      return null;
    const o = n.viewState, l = i.getRenderSource(), a = l.getTileGridForProjection(o.projection), u = l.getTilePixelRatio(n.pixelRatio);
    for (let c = a.getZForResolution(o.resolution); c >= a.getMinZoom(); --c) {
      const h = a.getTileCoordForCoordAndZ(r, c), d = this.getTile(c, h[1], h[2], n);
      if (!d || d.getState() !== F.LOADED)
        continue;
      const f = a.getOrigin(c), m = st(a.getTileSize(c)), y = a.getResolution(c);
      let E;
      if (d instanceof B_ || d instanceof Ac)
        E = d.getImage();
      else if (d instanceof Pc) {
        if (E = Zl(d.getData()), !E)
          continue;
      } else
        continue;
      const p = Math.floor(
        u * ((r[0] - f[0]) / y - h[1] * m[0])
      ), g = Math.floor(
        u * ((f[1] - r[1]) / y - h[2] * m[1])
      ), _ = Math.round(
        u * l.getGutterForProjection(o.projection)
      );
      return this.getImageData(E, p + _, g + _);
    }
    return null;
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(e) {
    this.renderedProjection_ ? e.viewState.projection !== this.renderedProjection_ && (this.tileCache_.clear(), this.renderedProjection_ = e.viewState.projection) : this.renderedProjection_ = e.viewState.projection;
    const n = this.getLayer().getSource();
    if (!n)
      return !1;
    const i = n.getRevision();
    return this.renderedRevision_ ? this.renderedRevision_ !== i && (this.renderedRevision_ = i, this.renderedSourceKey_ === n.getKey() && this.tileCache_.clear()) : this.renderedRevision_ = i, !0;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent The extent to be rendered.
   * @param {number} initialZ The zoom level.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @param {number} preload Number of additional levels to load.
   */
  enqueueTiles(e, n, i, r, s) {
    const o = e.viewState, l = this.getLayer(), a = l.getRenderSource(), u = a.getTileGridForProjection(o.projection), c = ie(a);
    c in e.wantedTiles || (e.wantedTiles[c] = {});
    const h = e.wantedTiles[c], d = l.getMapInternal(), f = Math.max(
      i - s,
      u.getMinZoom(),
      u.getZForResolution(
        Math.min(
          l.getMaxResolution(),
          d ? d.getView().getResolutionForZoom(Math.max(l.getMinZoom(), 0)) : u.getResolution(0)
        ),
        a.zDirection
      )
    );
    for (let m = i; m >= f; --m) {
      const y = u.getTileRangeForExtentAndZ(
        n,
        m,
        this.tempTileRange_
      ), E = u.getResolution(m);
      for (let p = y.minX; p <= y.maxX; ++p)
        for (let g = y.minY; g <= y.maxY; ++g) {
          const _ = this.getTile(m, p, g, e);
          if (!_ || !Cu(r, _, m))
            continue;
          const x = _.getKey();
          if (h[x] = !0, _.getState() === F.IDLE && !e.tileQueue.isKeyQueued(x)) {
            const C = Hl(m, p, g, this.tempTileCoord_);
            e.tileQueue.enqueue([
              _,
              c,
              u.getTileCoordCenter(C),
              E
            ]);
          }
        }
    }
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findStaleTile_(e, n) {
    const i = this.tileCache_, r = e[0], s = e[1], o = e[2], l = this.getStaleKeys();
    for (let a = 0; a < l.length; ++a) {
      const u = Su(l[a], r, s, o);
      if (i.containsKey(u)) {
        const c = i.get(u);
        if (c.getState() === F.LOADED)
          return c.endTransition(ie(this)), Cu(n, c, r), !0;
      }
    }
    return !1;
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {number} altZ The alternate zoom level.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findAltTiles_(e, n, i, r) {
    const s = e.getTileRangeForTileCoordAndZ(
      n,
      i,
      this.tempTileRange_
    );
    if (!s)
      return !1;
    let o = !0;
    const l = this.tileCache_, u = this.getLayer().getRenderSource().getKey();
    for (let c = s.minX; c <= s.maxX; ++c)
      for (let h = s.minY; h <= s.maxY; ++h) {
        const d = Su(u, i, c, h);
        let f = !1;
        if (l.containsKey(d)) {
          const m = l.get(d);
          m.getState() === F.LOADED && (Cu(r, m, i), f = !0);
        }
        f || (o = !1);
      }
    return o;
  }
  /**
   * Render the layer.
   *
   * The frame rendering logic has three parts:
   *
   *  1. Enqueue tiles
   *  2. Find alt tiles for those that are not yet loaded
   *  3. Render loaded tiles
   *
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  renderFrame(e, n) {
    this.renderComplete = !0;
    const i = e.layerStatesArray[e.layerIndex], r = e.viewState, s = r.projection, o = r.resolution, l = r.center, a = e.pixelRatio, u = this.getLayer(), c = u.getSource(), h = c.getRevision(), d = c.getTileGridForProjection(s), f = d.getZForResolution(o, c.zDirection), m = d.getResolution(f), y = c.getKey();
    this.renderedSourceKey_ ? this.renderedSourceKey_ !== y && (this.prependStaleKey(this.renderedSourceKey_), this.renderedSourceKey_ = y) : this.renderedSourceKey_ = y;
    let E = e.extent;
    const p = c.getTilePixelRatio(a);
    this.prepareContainer(e, n);
    const g = this.context.canvas.width, _ = this.context.canvas.height, v = i.extent && bn(i.extent);
    v && (E = Gt(
      E,
      bn(i.extent)
    ));
    const x = m * g / 2 / p, C = m * _ / 2 / p, S = [
      l[0] - x,
      l[1] - C,
      l[0] + x,
      l[1] + C
    ], w = {};
    this.renderedTiles.length = 0;
    const T = u.getPreload();
    if (e.nextExtent) {
      const M = d.getZForResolution(
        r.nextResolution,
        c.zDirection
      ), W = yg(e, e.nextExtent);
      this.enqueueTiles(e, W, M, w, T);
    }
    const A = yg(e, E);
    if (this.enqueueTiles(e, A, f, w, 0), T > 0 && setTimeout(() => {
      this.enqueueTiles(
        e,
        A,
        f - 1,
        w,
        T - 1
      );
    }, 0), !(f in w))
      return this.container;
    const N = ie(this), G = e.time;
    for (const M of w[f]) {
      const W = M.getState();
      if ((M instanceof Ac || M instanceof Qx) && W === F.EMPTY)
        continue;
      const U = M.tileCoord;
      if (W === F.LOADED && M.getAlpha(N, G) === 1) {
        M.endTransition(N);
        continue;
      }
      if (this.renderComplete = !1, this.findStaleTile_(U, w)) {
        iw(w, M, f), e.animate = !0;
        continue;
      }
      if (this.findAltTiles_(
        d,
        U,
        f + 1,
        w
      ))
        continue;
      const Ie = d.getMinZoom();
      for (let ae = f - 1; ae >= Ie && !this.findAltTiles_(
        d,
        U,
        ae,
        w
      ); --ae)
        ;
    }
    const X = m / o * a / p, D = this.getRenderContext(e);
    In(
      this.tempTransform,
      g / 2,
      _ / 2,
      X,
      X,
      0,
      -g / 2,
      -_ / 2
    ), i.extent && this.clipUnrotated(D, e, v), c.getInterpolate() || (D.imageSmoothingEnabled = !1), this.preRender(D, e);
    const Y = Object.keys(w).map(Number);
    Y.sort(vn);
    let P;
    const K = [], I = [];
    for (let M = Y.length - 1; M >= 0; --M) {
      const W = Y[M], U = c.getTilePixelSize(
        W,
        a,
        s
      ), k = d.getResolution(W) / m, Ie = U[0] * k * X, ae = U[1] * k * X, de = d.getTileCoordForCoordAndZ(
        Gi(S),
        W
      ), Bt = d.getTileCoordExtent(de), sn = Oe(this.tempTransform, [
        p * (Bt[0] - S[0]) / m,
        p * (S[3] - Bt[3]) / m
      ]), pt = p * c.getGutterForProjection(s);
      for (const Pn of w[W]) {
        if (Pn.getState() !== F.LOADED)
          continue;
        const br = Pn.tileCoord, So = de[1] - br[1], Ma = Math.round(sn[0] - (So - 1) * Ie), Zr = de[2] - br[2], di = Math.round(sn[1] - (Zr - 1) * ae), mt = Math.round(sn[0] - So * Ie), Vt = Math.round(sn[1] - Zr * ae), Xi = Ma - mt, ji = di - Vt, Hr = Y.length === 1;
        let fi = !1;
        P = [mt, Vt, mt + Xi, Vt, mt + Xi, Vt + ji, mt, Vt + ji];
        for (let Yi = 0, Ui = K.length; Yi < Ui; ++Yi)
          if (!Hr && W < I[Yi]) {
            const Le = K[Yi];
            nt(
              [mt, Vt, mt + Xi, Vt + ji],
              [Le[0], Le[3], Le[4], Le[7]]
            ) && (fi || (D.save(), fi = !0), D.beginPath(), D.moveTo(P[0], P[1]), D.lineTo(P[2], P[3]), D.lineTo(P[4], P[5]), D.lineTo(P[6], P[7]), D.moveTo(Le[6], Le[7]), D.lineTo(Le[4], Le[5]), D.lineTo(Le[2], Le[3]), D.lineTo(Le[0], Le[1]), D.clip());
          }
        K.push(P), I.push(W), this.drawTile(Pn, e, mt, Vt, Xi, ji, pt, Hr), fi && D.restore(), this.renderedTiles.unshift(Pn), this.updateUsedTiles(e.usedTiles, c, Pn);
      }
    }
    this.renderedRevision = h, this.renderedResolution = m, this.extentChanged = !this.renderedExtent_ || !$s(this.renderedExtent_, S), this.renderedExtent_ = S, this.renderedPixelRatio = a, this.renderedProjection = s, this.postRender(this.context, e), i.extent && D.restore(), D.imageSmoothingEnabled = !0;
    const O = (M, W) => {
      const U = ie(c), me = W.wantedTiles[U], k = me ? Object.keys(me).length : 0;
      this.updateCacheSize(k), this.tileCache_.expireCache();
    };
    return e.postRenderFunctions.push(O), this.container;
  }
  /**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   */
  updateCacheSize(e) {
    this.tileCache_.highWaterMark = Math.max(
      this.tileCache_.highWaterMark,
      e * 2
    );
  }
  /**
   * @param {import("../../Tile.js").default} tile Tile.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   * @protected
   */
  drawTile(e, n, i, r, s, o, l, a) {
    let u;
    if (e instanceof Pc) {
      if (u = Zl(e.getData()), !u)
        throw new Error("Rendering array data is not yet supported");
    } else
      u = this.getTileImage(
        /** @type {import("../../ImageTile.js").default} */
        e
      );
    if (!u)
      return;
    const c = this.getRenderContext(n), h = ie(this), d = n.layerStatesArray[n.layerIndex], f = d.opacity * (a ? e.getAlpha(h, n.time) : 1), m = f !== c.globalAlpha;
    m && (c.save(), c.globalAlpha = f), c.drawImage(
      u,
      l,
      l,
      u.width - 2 * l,
      u.height - 2 * l,
      i,
      r,
      s,
      o
    ), m && c.restore(), f !== d.opacity ? n.animate = !0 : a && e.endTransition(h);
  }
  /**
   * @return {HTMLCanvasElement} Image
   */
  getImage() {
    const e = this.context;
    return e ? e.canvas : null;
  }
  /**
   * Get the image from a tile.
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @protected
   */
  getTileImage(e) {
    return e.getImage();
  }
  /**
   * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import('../../Tile.js').default} tile Tile.
   * @protected
   */
  updateUsedTiles(e, n, i) {
    const r = ie(n);
    r in e || (e[r] = {}), e[r][i.getKey()] = !0;
  }
}
class sw extends Xx {
  /**
   * @param {import("./BaseTile.js").Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(e) {
    super(e);
  }
  /**
   * @override
   */
  createRenderer() {
    return new rw(this, {
      cacheSize: this.getCacheSize()
    });
  }
}
const j = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
}, Jo = [j.FILL], Zn = [j.STROKE], Ri = [j.BEGIN_PATH], vg = [j.CLOSE_PATH];
class H_ {
  /**
   * Render a geometry with a custom renderer.
   *
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   * @param {number} [index] Render order index.
   */
  drawCustom(e, n, i, r, s) {
  }
  /**
   * Render a geometry.
   *
   * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
   */
  drawGeometry(e) {
  }
  /**
   * Set the rendering style.
   *
   * @param {import("../style/Style.js").default} style The rendering style.
   */
  setStyle(e) {
  }
  /**
   * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawCircle(e, n, i) {
  }
  /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../style/Style.js").default} style Style.
   * @param {number} [index] Render order index.
   */
  drawFeature(e, n, i) {
  }
  /**
   * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawGeometryCollection(e, n, i) {
  }
  /**
   * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawLineString(e, n, i) {
  }
  /**
   * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiLineString(e, n, i) {
  }
  /**
   * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiPoint(e, n, i) {
  }
  /**
   * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawMultiPolygon(e, n, i) {
  }
  /**
   * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawPoint(e, n, i) {
  }
  /**
   * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawPolygon(e, n, i) {
  }
  /**
   * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   */
  drawText(e, n, i) {
  }
  /**
   * @param {import("../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(e, n) {
  }
  /**
   * @param {import("../style/Image.js").default} imageStyle Image style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with a text style.
   */
  setImageStyle(e, n) {
  }
  /**
   * @param {import("../style/Text.js").default} textStyle Text style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with an image style.
   */
  setTextStyle(e, n) {
  }
}
class wo extends H_ {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, r) {
    super(), this.tolerance = e, this.maxExtent = n, this.pixelRatio = r, this.maxLineWidth = 0, this.resolution = i, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.tmpCoordinate_ = [], this.hitDetectionInstructions = [], this.state = /** @type {import("../canvas.js").FillStrokeState} */
    {};
  }
  /**
   * @protected
   * @param {Array<number>} dashArray Dash array.
   * @return {Array<number>} Dash array with pixel ratio applied
   */
  applyPixelRatio(e) {
    const n = this.pixelRatio;
    return n == 1 ? e : e.map(function(i) {
      return i * n;
    });
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} stride Stride.
   * @protected
   * @return {number} My end
   */
  appendFlatPointCoordinates(e, n) {
    const i = this.getBufferedMaxExtent(), r = this.tmpCoordinate_, s = this.coordinates;
    let o = s.length;
    for (let l = 0, a = e.length; l < a; l += n)
      r[0] = e[l], r[1] = e[l + 1], Gr(i, r) && (s[o++] = r[0], s[o++] = r[1]);
    return o;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} closed Last input coordinate equals first.
   * @param {boolean} skipFirst Skip first coordinate.
   * @protected
   * @return {number} My end.
   */
  appendFlatLineCoordinates(e, n, i, r, s, o) {
    const l = this.coordinates;
    let a = l.length;
    const u = this.getBufferedMaxExtent();
    o && (n += r);
    let c = e[n], h = e[n + 1];
    const d = this.tmpCoordinate_;
    let f = !0, m, y, E;
    for (m = n + r; m < i; m += r)
      d[0] = e[m], d[1] = e[m + 1], E = xc(u, d), E !== y ? (f && (l[a++] = c, l[a++] = h, f = !1), l[a++] = d[0], l[a++] = d[1]) : E === ke.INTERSECTING ? (l[a++] = d[0], l[a++] = d[1], f = !1) : f = !0, c = d[0], h = d[1], y = E;
    return (s && f || m === n + r) && (l[a++] = c, l[a++] = h), a;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Array<number>} builderEnds Builder ends.
   * @return {number} Offset.
   */
  drawCustomCoordinates_(e, n, i, r, s) {
    for (let o = 0, l = i.length; o < l; ++o) {
      const a = i[o], u = this.appendFlatLineCoordinates(
        e,
        n,
        a,
        r,
        !1,
        !1
      );
      s.push(u), n = a;
    }
    return n;
  }
  /**
   * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   * @param {number} [index] Render order index.
   * @override
   */
  drawCustom(e, n, i, r, s) {
    this.beginGeometry(e, n, s);
    const o = e.getType(), l = e.getStride(), a = this.coordinates.length;
    let u, c, h, d, f;
    switch (o) {
      case "MultiPolygon":
        u = /** @type {import("../../geom/MultiPolygon.js").default} */
        e.getOrientedFlatCoordinates(), d = [];
        const m = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          e.getEndss()
        );
        f = 0;
        for (let y = 0, E = m.length; y < E; ++y) {
          const p = [];
          f = this.drawCustomCoordinates_(
            u,
            f,
            m[y],
            l,
            p
          ), d.push(p);
        }
        this.instructions.push([
          j.CUSTOM,
          a,
          d,
          e,
          i,
          Vf,
          s
        ]), this.hitDetectionInstructions.push([
          j.CUSTOM,
          a,
          d,
          e,
          r || i,
          Vf,
          s
        ]);
        break;
      case "Polygon":
      case "MultiLineString":
        h = [], u = o == "Polygon" ? (
          /** @type {import("../../geom/Polygon.js").default} */
          e.getOrientedFlatCoordinates()
        ) : e.getFlatCoordinates(), f = this.drawCustomCoordinates_(
          u,
          0,
          /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */
          e.getEnds(),
          l,
          h
        ), this.instructions.push([
          j.CUSTOM,
          a,
          h,
          e,
          i,
          jl,
          s
        ]), this.hitDetectionInstructions.push([
          j.CUSTOM,
          a,
          h,
          e,
          r || i,
          jl,
          s
        ]);
        break;
      case "LineString":
      case "Circle":
        u = e.getFlatCoordinates(), c = this.appendFlatLineCoordinates(
          u,
          0,
          u.length,
          l,
          !1,
          !1
        ), this.instructions.push([
          j.CUSTOM,
          a,
          c,
          e,
          i,
          _r,
          s
        ]), this.hitDetectionInstructions.push([
          j.CUSTOM,
          a,
          c,
          e,
          r || i,
          _r,
          s
        ]);
        break;
      case "MultiPoint":
        u = e.getFlatCoordinates(), c = this.appendFlatPointCoordinates(u, l), c > a && (this.instructions.push([
          j.CUSTOM,
          a,
          c,
          e,
          i,
          _r,
          s
        ]), this.hitDetectionInstructions.push([
          j.CUSTOM,
          a,
          c,
          e,
          r || i,
          _r,
          s
        ]));
        break;
      case "Point":
        u = e.getFlatCoordinates(), this.coordinates.push(u[0], u[1]), c = this.coordinates.length, this.instructions.push([
          j.CUSTOM,
          a,
          c,
          e,
          i,
          void 0,
          s
        ]), this.hitDetectionInstructions.push([
          j.CUSTOM,
          a,
          c,
          e,
          r || i,
          void 0,
          s
        ]);
        break;
    }
    this.endGeometry(n);
  }
  /**
   * @protected
   * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} index Render order index
   */
  beginGeometry(e, n, i) {
    this.beginGeometryInstruction1_ = [
      j.BEGIN_GEOMETRY,
      n,
      0,
      e,
      i
    ], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [
      j.BEGIN_GEOMETRY,
      n,
      0,
      e,
      i
    ], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates
    };
  }
  /**
   * Reverse the hit detection instructions.
   */
  reverseHitDetectionInstructions() {
    const e = this.hitDetectionInstructions;
    e.reverse();
    let n;
    const i = e.length;
    let r, s, o = -1;
    for (n = 0; n < i; ++n)
      r = e[n], s = /** @type {import("./Instruction.js").default} */
      r[0], s == j.END_GEOMETRY ? o = n : s == j.BEGIN_GEOMETRY && (r[2] = n, O1(this.hitDetectionInstructions, o, n), o = -1);
  }
  /**
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   * @override
   */
  setFillStrokeStyle(e, n) {
    const i = this.state;
    if (e) {
      const r = e.getColor();
      i.fillPatternScale = r && typeof r == "object" && "src" in r ? this.pixelRatio : 1, i.fillStyle = en(
        r || et
      );
    } else
      i.fillStyle = void 0;
    if (n) {
      const r = n.getColor();
      i.strokeStyle = en(
        r || io
      );
      const s = n.getLineCap();
      i.lineCap = s !== void 0 ? s : Xr;
      const o = n.getLineDash();
      i.lineDash = o ? o.slice() : En;
      const l = n.getLineDashOffset();
      i.lineDashOffset = l || xn;
      const a = n.getLineJoin();
      i.lineJoin = a !== void 0 ? a : jr;
      const u = n.getWidth();
      i.lineWidth = u !== void 0 ? u : so;
      const c = n.getMiterLimit();
      i.miterLimit = c !== void 0 ? c : no, i.lineWidth > this.maxLineWidth && (this.maxLineWidth = i.lineWidth, this.bufferedMaxExtent_ = null);
    } else
      i.strokeStyle = void 0, i.lineCap = void 0, i.lineDash = null, i.lineDashOffset = void 0, i.lineJoin = void 0, i.lineWidth = void 0, i.miterLimit = void 0;
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Fill instruction.
   */
  createFill(e) {
    const n = e.fillStyle, i = [j.SET_FILL_STYLE, n];
    return typeof n != "string" && i.push(e.fillPatternScale), i;
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */
  applyStroke(e) {
    this.instructions.push(this.createStroke(e));
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Stroke instruction.
   */
  createStroke(e) {
    return [
      j.SET_STROKE_STYLE,
      e.strokeStyle,
      e.lineWidth * this.pixelRatio,
      e.lineCap,
      e.lineJoin,
      e.miterLimit,
      this.applyPixelRatio(e.lineDash),
      e.lineDashOffset * this.pixelRatio
    ];
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
   */
  updateFillStyle(e, n) {
    const i = e.fillStyle;
    (typeof i != "string" || e.currentFillStyle != i) && (i !== void 0 && this.instructions.push(n.call(this, e)), e.currentFillStyle = i);
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
   */
  updateStrokeStyle(e, n) {
    const i = e.strokeStyle, r = e.lineCap, s = e.lineDash, o = e.lineDashOffset, l = e.lineJoin, a = e.lineWidth, u = e.miterLimit;
    (e.currentStrokeStyle != i || e.currentLineCap != r || s != e.currentLineDash && !hi(e.currentLineDash, s) || e.currentLineDashOffset != o || e.currentLineJoin != l || e.currentLineWidth != a || e.currentMiterLimit != u) && (i !== void 0 && n.call(this, e), e.currentStrokeStyle = i, e.currentLineCap = r, e.currentLineDash = s, e.currentLineDashOffset = o, e.currentLineJoin = l, e.currentLineWidth = a, e.currentMiterLimit = u);
  }
  /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  endGeometry(e) {
    this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null;
    const n = [j.END_GEOMETRY, e];
    this.instructions.push(n), this.hitDetectionInstructions.push(n);
  }
  /**
   * Get the buffered rendering extent.  Rendering will be clipped to the extent
   * provided to the constructor.  To account for symbolizers that may intersect
   * this extent, we calculate a buffered extent (e.g. based on stroke width).
   * @return {import("../../extent.js").Extent} The buffered rendering extent.
   * @protected
   */
  getBufferedMaxExtent() {
    if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = Vm(this.maxExtent), this.maxLineWidth > 0)) {
      const e = this.resolution * (this.maxLineWidth + 1) / 2;
      Ah(this.bufferedMaxExtent_, e, this.bufferedMaxExtent_);
    }
    return this.bufferedMaxExtent_;
  }
}
class ow extends wo {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, r) {
    super(e, n, i, r), this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.width_ = void 0, this.declutterMode_ = void 0, this.declutterImageWithText_ = void 0;
  }
  /**
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} pointGeometry Point geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawPoint(e, n, i) {
    if (!this.image_ || this.maxExtent && !Gr(this.maxExtent, e.getFlatCoordinates()))
      return;
    this.beginGeometry(e, n, i);
    const r = e.getFlatCoordinates(), s = e.getStride(), o = this.coordinates.length, l = this.appendFlatPointCoordinates(r, s);
    this.instructions.push([
      j.DRAW_IMAGE,
      o,
      l,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.hitDetectionInstructions.push([
      j.DRAW_IMAGE,
      o,
      l,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.height_,
      1,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.endGeometry(n);
  }
  /**
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawMultiPoint(e, n, i) {
    if (!this.image_)
      return;
    this.beginGeometry(e, n, i);
    const r = e.getFlatCoordinates(), s = [];
    for (let a = 0, u = r.length; a < u; a += e.getStride())
      (!this.maxExtent || Gr(this.maxExtent, r.slice(a, a + 2))) && s.push(
        r[a],
        r[a + 1]
      );
    const o = this.coordinates.length, l = this.appendFlatPointCoordinates(s, 2);
    this.instructions.push([
      j.DRAW_IMAGE,
      o,
      l,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.hitDetectionInstructions.push([
      j.DRAW_IMAGE,
      o,
      l,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.height_,
      1,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]), this.endGeometry(n);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   * @override
   */
  finish() {
    return this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.imagePixelRatio_ = void 0, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.width_ = void 0, super.finish();
  }
  /**
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @param {Object} [sharedData] Shared data.
   * @override
   */
  setImageStyle(e, n) {
    const i = e.getAnchor(), r = e.getSize(), s = e.getOrigin();
    this.imagePixelRatio_ = e.getPixelRatio(this.pixelRatio), this.anchorX_ = i[0], this.anchorY_ = i[1], this.hitDetectionImage_ = e.getHitDetectionImage(), this.image_ = e.getImage(this.pixelRatio), this.height_ = r[1], this.opacity_ = e.getOpacity(), this.originX_ = s[0], this.originY_ = s[1], this.rotateWithView_ = e.getRotateWithView(), this.rotation_ = e.getRotation(), this.scale_ = e.getScaleArray(), this.width_ = r[0], this.declutterMode_ = e.getDeclutterMode(), this.declutterImageWithText_ = n;
  }
}
class lw extends wo {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, r) {
    super(e, n, i, r);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   * @return {number} end.
   */
  drawFlatCoordinates_(e, n, i, r) {
    const s = this.coordinates.length, o = this.appendFlatLineCoordinates(
      e,
      n,
      i,
      r,
      !1,
      !1
    ), l = [
      j.MOVE_TO_LINE_TO,
      s,
      o
    ];
    return this.instructions.push(l), this.hitDetectionInstructions.push(l), i;
  }
  /**
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawLineString(e, n, i) {
    const r = this.state, s = r.strokeStyle, o = r.lineWidth;
    if (s === void 0 || o === void 0)
      return;
    this.updateStrokeStyle(r, this.applyStroke), this.beginGeometry(e, n, i), this.hitDetectionInstructions.push(
      [
        j.SET_STROKE_STYLE,
        r.strokeStyle,
        r.lineWidth,
        r.lineCap,
        r.lineJoin,
        r.miterLimit,
        En,
        xn
      ],
      Ri
    );
    const l = e.getFlatCoordinates(), a = e.getStride();
    this.drawFlatCoordinates_(
      l,
      0,
      l.length,
      a
    ), this.hitDetectionInstructions.push(Zn), this.endGeometry(n);
  }
  /**
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawMultiLineString(e, n, i) {
    const r = this.state, s = r.strokeStyle, o = r.lineWidth;
    if (s === void 0 || o === void 0)
      return;
    this.updateStrokeStyle(r, this.applyStroke), this.beginGeometry(e, n, i), this.hitDetectionInstructions.push(
      [
        j.SET_STROKE_STYLE,
        r.strokeStyle,
        r.lineWidth,
        r.lineCap,
        r.lineJoin,
        r.miterLimit,
        En,
        xn
      ],
      Ri
    );
    const l = e.getEnds(), a = e.getFlatCoordinates(), u = e.getStride();
    let c = 0;
    for (let h = 0, d = l.length; h < d; ++h)
      c = this.drawFlatCoordinates_(
        a,
        c,
        /** @type {number} */
        l[h],
        u
      );
    this.hitDetectionInstructions.push(Zn), this.endGeometry(n);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   * @override
   */
  finish() {
    const e = this.state;
    return e.lastStroke != null && e.lastStroke != this.coordinates.length && this.instructions.push(Zn), this.reverseHitDetectionInstructions(), this.state = null, super.finish();
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @override
   */
  applyStroke(e) {
    e.lastStroke != null && e.lastStroke != this.coordinates.length && (this.instructions.push(Zn), e.lastStroke = this.coordinates.length), e.lastStroke = 0, super.applyStroke(e), this.instructions.push(Ri);
  }
}
class Eg extends wo {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, r) {
    super(e, n, i, r);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawFlatCoordinatess_(e, n, i, r) {
    const s = this.state, o = s.fillStyle !== void 0, l = s.strokeStyle !== void 0, a = i.length;
    this.instructions.push(Ri), this.hitDetectionInstructions.push(Ri);
    for (let u = 0; u < a; ++u) {
      const c = i[u], h = this.coordinates.length, d = this.appendFlatLineCoordinates(
        e,
        n,
        c,
        r,
        !0,
        !l
      ), f = [
        j.MOVE_TO_LINE_TO,
        h,
        d
      ];
      this.instructions.push(f), this.hitDetectionInstructions.push(f), l && (this.instructions.push(vg), this.hitDetectionInstructions.push(vg)), n = c;
    }
    return o && (this.instructions.push(Jo), this.hitDetectionInstructions.push(Jo)), l && (this.instructions.push(Zn), this.hitDetectionInstructions.push(Zn)), n;
  }
  /**
   * @param {import("../../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawCircle(e, n, i) {
    const r = this.state, s = r.fillStyle, o = r.strokeStyle;
    if (s === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(e, n, i), r.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      j.SET_FILL_STYLE,
      et
    ]), r.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      j.SET_STROKE_STYLE,
      r.strokeStyle,
      r.lineWidth,
      r.lineCap,
      r.lineJoin,
      r.miterLimit,
      En,
      xn
    ]);
    const l = e.getFlatCoordinates(), a = e.getStride(), u = this.coordinates.length;
    this.appendFlatLineCoordinates(
      l,
      0,
      l.length,
      a,
      !1,
      !1
    );
    const c = [j.CIRCLE, u];
    this.instructions.push(Ri, c), this.hitDetectionInstructions.push(Ri, c), r.fillStyle !== void 0 && (this.instructions.push(Jo), this.hitDetectionInstructions.push(Jo)), r.strokeStyle !== void 0 && (this.instructions.push(Zn), this.hitDetectionInstructions.push(Zn)), this.endGeometry(n);
  }
  /**
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawPolygon(e, n, i) {
    const r = this.state, s = r.fillStyle, o = r.strokeStyle;
    if (s === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(e, n, i), r.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      j.SET_FILL_STYLE,
      et
    ]), r.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      j.SET_STROKE_STYLE,
      r.strokeStyle,
      r.lineWidth,
      r.lineCap,
      r.lineJoin,
      r.miterLimit,
      En,
      xn
    ]);
    const l = e.getEnds(), a = e.getOrientedFlatCoordinates(), u = e.getStride();
    this.drawFlatCoordinatess_(
      a,
      0,
      /** @type {Array<number>} */
      l,
      u
    ), this.endGeometry(n);
  }
  /**
   * @param {import("../../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawMultiPolygon(e, n, i) {
    const r = this.state, s = r.fillStyle, o = r.strokeStyle;
    if (s === void 0 && o === void 0)
      return;
    this.setFillStrokeStyles_(), this.beginGeometry(e, n, i), r.fillStyle !== void 0 && this.hitDetectionInstructions.push([
      j.SET_FILL_STYLE,
      et
    ]), r.strokeStyle !== void 0 && this.hitDetectionInstructions.push([
      j.SET_STROKE_STYLE,
      r.strokeStyle,
      r.lineWidth,
      r.lineCap,
      r.lineJoin,
      r.miterLimit,
      En,
      xn
    ]);
    const l = e.getEndss(), a = e.getOrientedFlatCoordinates(), u = e.getStride();
    let c = 0;
    for (let h = 0, d = l.length; h < d; ++h)
      c = this.drawFlatCoordinatess_(
        a,
        c,
        l[h],
        u
      );
    this.endGeometry(n);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   * @override
   */
  finish() {
    this.reverseHitDetectionInstructions(), this.state = null;
    const e = this.tolerance;
    if (e !== 0) {
      const n = this.coordinates;
      for (let i = 0, r = n.length; i < r; ++i)
        n[i] = vi(n[i], e);
    }
    return super.finish();
  }
  /**
   * @private
   */
  setFillStrokeStyles_() {
    const e = this.state;
    e.fillStyle !== void 0 && this.updateFillStyle(e, this.createFill), e.strokeStyle !== void 0 && this.updateStrokeStyle(e, this.applyStroke);
  }
}
function aw(t, e, n, i, r) {
  const s = [];
  let o = n, l = 0, a = e.slice(n, 2);
  for (; l < t && o + r < i; ) {
    const [u, c] = a.slice(-2), h = e[o + r], d = e[o + r + 1], f = Math.sqrt(
      (h - u) * (h - u) + (d - c) * (d - c)
    );
    if (l += f, l >= t) {
      const m = (t - l + f) / f, y = St(u, h, m), E = St(c, d, m);
      a.push(y, E), s.push(a), a = [y, E], l == t && (o += r), l = 0;
    } else if (l < t)
      a.push(
        e[o + r],
        e[o + r + 1]
      ), o += r;
    else {
      const m = f - l, y = St(u, h, m / f), E = St(c, d, m / f);
      a.push(y, E), s.push(a), a = [y, E], l = 0, o += r;
    }
  }
  return l > 0 && s.push(a), s;
}
function uw(t, e, n, i, r) {
  let s = n, o = n, l = 0, a = 0, u = n, c, h, d, f, m, y, E, p, g, _;
  for (h = n; h < i; h += r) {
    const v = e[h], x = e[h + 1];
    m !== void 0 && (g = v - m, _ = x - y, f = Math.sqrt(g * g + _ * _), E !== void 0 && (a += d, c = Math.acos((E * g + p * _) / (d * f)), c > t && (a > l && (l = a, s = u, o = h), a = 0, u = h - r)), d = f, E = g, p = _), m = v, y = x;
  }
  return a += f, a > l ? [u, h] : [s, o];
}
const $l = {
  left: 0,
  center: 0.5,
  right: 1,
  top: 0,
  middle: 0.5,
  hanging: 0.2,
  alphabetic: 0.8,
  ideographic: 0.8,
  bottom: 1
};
class cw extends wo {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, r) {
    super(e, n, i, r), this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.fillStates[et] = { fillStyle: et }, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = /** @type {import("../canvas.js").TextState} */
    {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.declutterMode_ = void 0, this.declutterImageWithText_ = void 0;
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   * @override
   */
  finish() {
    const e = super.finish();
    return e.textStates = this.textStates, e.fillStates = this.fillStates, e.strokeStates = this.strokeStates, e;
  }
  /**
   * @param {import("../../geom/SimpleGeometry.js").default|import("../Feature.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} [index] Render order index.
   * @override
   */
  drawText(e, n, i) {
    const r = this.textFillState_, s = this.textStrokeState_, o = this.textState_;
    if (this.text_ === "" || !o || !r && !s)
      return;
    const l = this.coordinates;
    let a = l.length;
    const u = e.getType();
    let c = null, h = e.getStride();
    if (o.placement === "line" && (u == "LineString" || u == "MultiLineString" || u == "Polygon" || u == "MultiPolygon")) {
      if (!nt(this.maxExtent, e.getExtent()))
        return;
      let d;
      if (c = e.getFlatCoordinates(), u == "LineString")
        d = [c.length];
      else if (u == "MultiLineString")
        d = /** @type {import("../../geom/MultiLineString.js").default} */
        e.getEnds();
      else if (u == "Polygon")
        d = /** @type {import("../../geom/Polygon.js").default} */
        e.getEnds().slice(0, 1);
      else if (u == "MultiPolygon") {
        const E = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          e.getEndss()
        );
        d = [];
        for (let p = 0, g = E.length; p < g; ++p)
          d.push(E[p][0]);
      }
      this.beginGeometry(e, n, i);
      const f = o.repeat, m = f ? void 0 : o.textAlign;
      let y = 0;
      for (let E = 0, p = d.length; E < p; ++E) {
        let g;
        f ? g = aw(
          f * this.resolution,
          c,
          y,
          d[E],
          h
        ) : g = [c.slice(y, d[E])];
        for (let _ = 0, v = g.length; _ < v; ++_) {
          const x = g[_];
          let C = 0, S = x.length;
          if (m == null) {
            const T = uw(
              o.maxAngle,
              x,
              0,
              x.length,
              2
            );
            C = T[0], S = T[1];
          }
          for (let T = C; T < S; T += h)
            l.push(x[T], x[T + 1]);
          const w = l.length;
          y = d[E], this.drawChars_(a, w), a = w;
        }
      }
      this.endGeometry(n);
    } else {
      let d = o.overflow ? null : [];
      switch (u) {
        case "Point":
        case "MultiPoint":
          c = /** @type {import("../../geom/MultiPoint.js").default} */
          e.getFlatCoordinates();
          break;
        case "LineString":
          c = /** @type {import("../../geom/LineString.js").default} */
          e.getFlatMidpoint();
          break;
        case "Circle":
          c = /** @type {import("../../geom/Circle.js").default} */
          e.getCenter();
          break;
        case "MultiLineString":
          c = /** @type {import("../../geom/MultiLineString.js").default} */
          e.getFlatMidpoints(), h = 2;
          break;
        case "Polygon":
          c = /** @type {import("../../geom/Polygon.js").default} */
          e.getFlatInteriorPoint(), o.overflow || d.push(c[2] / this.resolution), h = 3;
          break;
        case "MultiPolygon":
          const g = (
            /** @type {import("../../geom/MultiPolygon.js").default} */
            e.getFlatInteriorPoints()
          );
          c = [];
          for (let _ = 0, v = g.length; _ < v; _ += 3)
            o.overflow || d.push(g[_ + 2] / this.resolution), c.push(g[_], g[_ + 1]);
          if (c.length === 0)
            return;
          h = 2;
          break;
      }
      const f = this.appendFlatPointCoordinates(c, h);
      if (f === a)
        return;
      if (d && (f - a) / 2 !== c.length / h) {
        let g = a / 2;
        d = d.filter((_, v) => {
          const x = l[(g + v) * 2] === c[v * h] && l[(g + v) * 2 + 1] === c[v * h + 1];
          return x || --g, x;
        });
      }
      this.saveTextStates_(), (o.backgroundFill || o.backgroundStroke) && (this.setFillStrokeStyle(
        o.backgroundFill,
        o.backgroundStroke
      ), o.backgroundFill && this.updateFillStyle(this.state, this.createFill), o.backgroundStroke && (this.updateStrokeStyle(this.state, this.applyStroke), this.hitDetectionInstructions.push(this.createStroke(this.state)))), this.beginGeometry(e, n, i);
      let m = o.padding;
      if (m != Ci && (o.scale[0] < 0 || o.scale[1] < 0)) {
        let g = o.padding[0], _ = o.padding[1], v = o.padding[2], x = o.padding[3];
        o.scale[0] < 0 && (_ = -_, x = -x), o.scale[1] < 0 && (g = -g, v = -v), m = [g, _, v, x];
      }
      const y = this.pixelRatio;
      this.instructions.push([
        j.DRAW_IMAGE,
        a,
        f,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        this.declutterMode_,
        this.declutterImageWithText_,
        m == Ci ? Ci : m.map(function(g) {
          return g * y;
        }),
        !!o.backgroundFill,
        !!o.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        d
      ]);
      const E = 1 / y, p = this.state.fillStyle;
      o.backgroundFill && (this.state.fillStyle = et, this.hitDetectionInstructions.push(this.createFill(this.state))), this.hitDetectionInstructions.push([
        j.DRAW_IMAGE,
        a,
        f,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [E, E],
        NaN,
        this.declutterMode_,
        this.declutterImageWithText_,
        m,
        !!o.backgroundFill,
        !!o.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_ ? et : this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        d
      ]), o.backgroundFill && (this.state.fillStyle = p, this.hitDetectionInstructions.push(this.createFill(this.state))), this.endGeometry(n);
    }
  }
  /**
   * @private
   */
  saveTextStates_() {
    const e = this.textStrokeState_, n = this.textState_, i = this.textFillState_, r = this.strokeKey_;
    e && (r in this.strokeStates || (this.strokeStates[r] = {
      strokeStyle: e.strokeStyle,
      lineCap: e.lineCap,
      lineDashOffset: e.lineDashOffset,
      lineWidth: e.lineWidth,
      lineJoin: e.lineJoin,
      miterLimit: e.miterLimit,
      lineDash: e.lineDash
    }));
    const s = this.textKey_;
    s in this.textStates || (this.textStates[s] = {
      font: n.font,
      textAlign: n.textAlign || ro,
      justify: n.justify,
      textBaseline: n.textBaseline || Ul,
      scale: n.scale
    });
    const o = this.fillKey_;
    i && (o in this.fillStates || (this.fillStates[o] = {
      fillStyle: i.fillStyle
    }));
  }
  /**
   * @private
   * @param {number} begin Begin.
   * @param {number} end End.
   */
  drawChars_(e, n) {
    const i = this.textStrokeState_, r = this.textState_, s = this.strokeKey_, o = this.textKey_, l = this.fillKey_;
    this.saveTextStates_();
    const a = this.pixelRatio, u = $l[r.textBaseline], c = this.textOffsetY_ * a, h = this.text_, d = i ? i.lineWidth * Math.abs(r.scale[0]) / 2 : 0;
    this.instructions.push([
      j.DRAW_CHARS,
      e,
      n,
      u,
      r.overflow,
      l,
      r.maxAngle,
      a,
      c,
      s,
      d * a,
      h,
      o,
      1,
      this.declutterMode_
    ]), this.hitDetectionInstructions.push([
      j.DRAW_CHARS,
      e,
      n,
      u,
      r.overflow,
      l && et,
      r.maxAngle,
      a,
      c,
      s,
      d * a,
      h,
      o,
      1 / a,
      this.declutterMode_
    ]);
  }
  /**
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @param {Object} [sharedData] Shared data.
   * @override
   */
  setTextStyle(e, n) {
    let i, r, s;
    if (!e)
      this.text_ = "";
    else {
      const o = e.getFill();
      o ? (r = this.textFillState_, r || (r = /** @type {import("../canvas.js").FillState} */
      {}, this.textFillState_ = r), r.fillStyle = en(
        o.getColor() || et
      )) : (r = null, this.textFillState_ = r);
      const l = e.getStroke();
      if (!l)
        s = null, this.textStrokeState_ = s;
      else {
        s = this.textStrokeState_, s || (s = /** @type {import("../canvas.js").StrokeState} */
        {}, this.textStrokeState_ = s);
        const m = l.getLineDash(), y = l.getLineDashOffset(), E = l.getWidth(), p = l.getMiterLimit();
        s.lineCap = l.getLineCap() || Xr, s.lineDash = m ? m.slice() : En, s.lineDashOffset = y === void 0 ? xn : y, s.lineJoin = l.getLineJoin() || jr, s.lineWidth = E === void 0 ? so : E, s.miterLimit = p === void 0 ? no : p, s.strokeStyle = en(
          l.getColor() || io
        );
      }
      i = this.textState_;
      const a = e.getFont() || C_;
      pE(a);
      const u = e.getScaleArray();
      i.overflow = e.getOverflow(), i.font = a, i.maxAngle = e.getMaxAngle(), i.placement = e.getPlacement(), i.textAlign = e.getTextAlign(), i.repeat = e.getRepeat(), i.justify = e.getJustify(), i.textBaseline = e.getTextBaseline() || Ul, i.backgroundFill = e.getBackgroundFill(), i.backgroundStroke = e.getBackgroundStroke(), i.padding = e.getPadding() || Ci, i.scale = u === void 0 ? [1, 1] : u;
      const c = e.getOffsetX(), h = e.getOffsetY(), d = e.getRotateWithView(), f = e.getRotation();
      this.text_ = e.getText() || "", this.textOffsetX_ = c === void 0 ? 0 : c, this.textOffsetY_ = h === void 0 ? 0 : h, this.textRotateWithView_ = d === void 0 ? !1 : d, this.textRotation_ = f === void 0 ? 0 : f, this.strokeKey_ = s ? (typeof s.strokeStyle == "string" ? s.strokeStyle : ie(s.strokeStyle)) + s.lineCap + s.lineDashOffset + "|" + s.lineWidth + s.lineJoin + s.miterLimit + "[" + s.lineDash.join() + "]" : "", this.textKey_ = i.font + i.scale + (i.textAlign || "?") + (i.repeat || "?") + (i.justify || "?") + (i.textBaseline || "?"), this.fillKey_ = r && r.fillStyle ? typeof r.fillStyle == "string" ? r.fillStyle : "|" + ie(r.fillStyle) : "";
    }
    this.declutterMode_ = e.getDeclutterMode(), this.declutterImageWithText_ = n;
  }
}
const hw = {
  Circle: Eg,
  Default: wo,
  Image: ow,
  LineString: lw,
  Polygon: Eg,
  Text: cw
};
class dw {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Max extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(e, n, i, r) {
    this.tolerance_ = e, this.maxExtent_ = n, this.pixelRatio_ = r, this.resolution_ = i, this.buildersByZIndex_ = {};
  }
  /**
   * @return {!Object<string, !Object<import("../canvas.js").BuilderType, import("./Builder.js").SerializableInstructions>>} The serializable instructions
   */
  finish() {
    const e = {};
    for (const n in this.buildersByZIndex_) {
      e[n] = e[n] || {};
      const i = this.buildersByZIndex_[n];
      for (const r in i) {
        const s = i[r].finish();
        e[n][r] = s;
      }
    }
    return e;
  }
  /**
   * @param {number|undefined} zIndex Z index.
   * @param {import("../canvas.js").BuilderType} builderType Replay type.
   * @return {import("../VectorContext.js").default} Replay.
   */
  getBuilder(e, n) {
    const i = e !== void 0 ? e.toString() : "0";
    let r = this.buildersByZIndex_[i];
    r === void 0 && (r = {}, this.buildersByZIndex_[i] = r);
    let s = r[n];
    if (s === void 0) {
      const o = hw[n];
      s = new o(
        this.tolerance_,
        this.maxExtent_,
        this.resolution_,
        this.pixelRatio_
      ), r[n] = s;
    }
    return s;
  }
}
function fw(t, e, n, i, r, s, o, l, a, u, c, h) {
  let d = t[e], f = t[e + 1], m = 0, y = 0, E = 0, p = 0;
  function g() {
    m = d, y = f, e += i, d = t[e], f = t[e + 1], p += E, E = Math.sqrt((d - m) * (d - m) + (f - y) * (f - y));
  }
  do
    g();
  while (e < n - i && p + E < s);
  let _ = E === 0 ? 0 : (s - p) / E;
  const v = St(m, d, _), x = St(y, f, _), C = e - i, S = p, w = s + l * a(u, r, c);
  for (; e < n - i && p + E < w; )
    g();
  _ = E === 0 ? 0 : (w - p) / E;
  const T = St(m, d, _), A = St(y, f, _);
  let N;
  if (h) {
    const P = [v, x, T, A];
    s_(P, 0, 4, 2, h, P, P), N = P[0] > P[2];
  } else
    N = v > T;
  const G = Math.PI, X = [], D = C + i === e;
  e = C, E = 0, p = S, d = t[e], f = t[e + 1];
  let Y;
  if (D) {
    g(), Y = Math.atan2(f - y, d - m), N && (Y += Y > 0 ? -G : G);
    const P = (T + v) / 2, K = (A + x) / 2;
    return X[0] = [P, K, (w - s) / 2, Y, r], X;
  }
  r = r.replace(/\n/g, " ");
  for (let P = 0, K = r.length; P < K; ) {
    g();
    let I = Math.atan2(f - y, d - m);
    if (N && (I += I > 0 ? -G : G), Y !== void 0) {
      let k = I - Y;
      if (k += k > G ? -2 * G : k < -G ? 2 * G : 0, Math.abs(k) > o)
        return null;
    }
    Y = I;
    const O = P;
    let M = 0;
    for (; P < K; ++P) {
      const k = N ? K - P - 1 : P, Ie = l * a(u, r[k], c);
      if (e + i < n && p + E < s + M + Ie / 2)
        break;
      M += Ie;
    }
    if (P === O)
      continue;
    const W = N ? r.substring(K - O, K - P) : r.substring(O, P);
    _ = E === 0 ? 0 : (s + M / 2 - p) / E;
    const U = St(m, d, _), me = St(y, f, _);
    X.push([U, me, M / 2, I, W]), s += M;
  }
  return X;
}
function gw(t, e, n, i) {
  let r = t[e], s = t[e + 1], o = 0;
  for (let l = e + i; l < n; l += i) {
    const a = t[l], u = t[l + 1];
    o += Math.sqrt((a - r) * (a - r) + (u - s) * (u - s)), r = a, s = u;
  }
  return o;
}
const qi = kt(), On = [], un = [], cn = [], Fn = [];
function xg(t) {
  return t[3].declutterBox;
}
const wg = new RegExp(
  /* eslint-disable prettier/prettier */
  "[֑-ࣿיִ-﷿ﹰ-ﻼࠀ-࿿-]"
  /* eslint-enable prettier/prettier */
);
function Ru(t, e) {
  return e === "start" ? e = wg.test(t) ? "right" : "left" : e === "end" && (e = wg.test(t) ? "left" : "right"), $l[e];
}
function pw(t, e, n) {
  return n > 0 && t.push(`
`, ""), t.push(e, ""), t;
}
class mw {
  /**
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The replay can have overlapping geometries.
   * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions.
   * @param {boolean} [deferredRendering] Enable deferred rendering.
   */
  constructor(e, n, i, r, s) {
    this.overlaps = i, this.pixelRatio = n, this.resolution = e, this.alignAndScaleFill_, this.instructions = r.instructions, this.coordinates = r.coordinates, this.coordinateCache_ = {}, this.renderedTransform_ = jt(), this.hitDetectionInstructions = r.hitDetectionInstructions, this.pixelCoordinates_ = null, this.viewRotation_ = 0, this.fillStates = r.fillStates || {}, this.strokeStates = r.strokeStates || {}, this.textStates = r.textStates || {}, this.widths_ = {}, this.labels_ = {}, this.zIndexContext_ = s ? new Y_() : null;
  }
  /**
   * @return {ZIndexContext} ZIndex context.
   */
  getZIndexContext() {
    return this.zIndexContext_;
  }
  /**
   * @param {string|Array<string>} text Text.
   * @param {string} textKey Text style key.
   * @param {string} fillKey Fill style key.
   * @param {string} strokeKey Stroke style key.
   * @return {import("../canvas.js").Label} Label.
   */
  createLabel(e, n, i, r) {
    const s = e + n + i + r;
    if (this.labels_[s])
      return this.labels_[s];
    const o = r ? this.strokeStates[r] : null, l = i ? this.fillStates[i] : null, a = this.textStates[n], u = this.pixelRatio, c = [
      a.scale[0] * u,
      a.scale[1] * u
    ], h = a.justify ? $l[a.justify] : Ru(
      Array.isArray(e) ? e[0] : e,
      a.textAlign || ro
    ), d = r && o.lineWidth ? o.lineWidth : 0, f = Array.isArray(e) ? e : String(e).split(`
`).reduce(pw, []), { width: m, height: y, widths: E, heights: p, lineWidths: g } = _E(
      a,
      f
    ), _ = m + d, v = [], x = (_ + 2) * c[0], C = (y + d) * c[1], S = {
      width: x < 0 ? Math.floor(x) : Math.ceil(x),
      height: C < 0 ? Math.floor(C) : Math.ceil(C),
      contextInstructions: v
    };
    (c[0] != 1 || c[1] != 1) && v.push("scale", c), r && (v.push("strokeStyle", o.strokeStyle), v.push("lineWidth", d), v.push("lineCap", o.lineCap), v.push("lineJoin", o.lineJoin), v.push("miterLimit", o.miterLimit), v.push("setLineDash", [o.lineDash]), v.push("lineDashOffset", o.lineDashOffset)), i && v.push("fillStyle", l.fillStyle), v.push("textBaseline", "middle"), v.push("textAlign", "center");
    const w = 0.5 - h;
    let T = h * _ + w * d;
    const A = [], N = [];
    let G = 0, X = 0, D = 0, Y = 0, P;
    for (let K = 0, I = f.length; K < I; K += 2) {
      const O = f[K];
      if (O === `
`) {
        X += G, G = 0, T = h * _ + w * d, ++Y;
        continue;
      }
      const M = f[K + 1] || a.font;
      M !== P && (r && A.push("font", M), i && N.push("font", M), P = M), G = Math.max(G, p[D]);
      const W = [
        O,
        T + w * E[D] + h * (E[D] - g[Y]),
        0.5 * (d + G) + X
      ];
      T += E[D], r && A.push("strokeText", W), i && N.push("fillText", W), ++D;
    }
    return Array.prototype.push.apply(v, A), Array.prototype.push.apply(v, N), this.labels_[s] = S, S;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   */
  replayTextBackground_(e, n, i, r, s, o, l) {
    e.beginPath(), e.moveTo.apply(e, n), e.lineTo.apply(e, i), e.lineTo.apply(e, r), e.lineTo.apply(e, s), e.lineTo.apply(e, n), o && (this.alignAndScaleFill_ = /** @type {number} */
    o[2], this.fill_(e)), l && (this.setStrokeStyle_(
      e,
      /** @type {Array<*>} */
      l
    ), e.stroke());
  }
  /**
   * @private
   * @param {number} sheetWidth Width of the sprite sheet.
   * @param {number} sheetHeight Height of the sprite sheet.
   * @param {number} centerX X.
   * @param {number} centerY Y.
   * @param {number} width Width.
   * @param {number} height Height.
   * @param {number} anchorX Anchor X.
   * @param {number} anchorY Anchor Y.
   * @param {number} originX Origin X.
   * @param {number} originY Origin Y.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} scale Scale.
   * @param {boolean} snapToPixel Snap to pixel.
   * @param {Array<number>} padding Padding.
   * @param {boolean} fillStroke Background fill or stroke.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
   */
  calculateImageOrLabelDimensions_(e, n, i, r, s, o, l, a, u, c, h, d, f, m, y, E) {
    l *= d[0], a *= d[1];
    let p = i - l, g = r - a;
    const _ = s + u > e ? e - u : s, v = o + c > n ? n - c : o, x = m[3] + _ * d[0] + m[1], C = m[0] + v * d[1] + m[2], S = p - m[3], w = g - m[0];
    (y || h !== 0) && (On[0] = S, Fn[0] = S, On[1] = w, un[1] = w, un[0] = S + x, cn[0] = un[0], cn[1] = w + C, Fn[1] = cn[1]);
    let T;
    return h !== 0 ? (T = In(
      jt(),
      i,
      r,
      1,
      1,
      h,
      -i,
      -r
    ), Oe(T, On), Oe(T, un), Oe(T, cn), Oe(T, Fn), oi(
      Math.min(On[0], un[0], cn[0], Fn[0]),
      Math.min(On[1], un[1], cn[1], Fn[1]),
      Math.max(On[0], un[0], cn[0], Fn[0]),
      Math.max(On[1], un[1], cn[1], Fn[1]),
      qi
    )) : oi(
      Math.min(S, S + x),
      Math.min(w, w + C),
      Math.max(S, S + x),
      Math.max(w, w + C),
      qi
    ), f && (p = Math.round(p), g = Math.round(g)), {
      drawImageX: p,
      drawImageY: g,
      drawImageW: _,
      drawImageH: v,
      originX: u,
      originY: c,
      declutterBox: {
        minX: qi[0],
        minY: qi[1],
        maxX: qi[2],
        maxY: qi[3],
        value: E
      },
      canvasTransform: T,
      scale: d
    };
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size.
   * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
   * @param {ImageOrLabelDimensions} dimensions Dimensions.
   * @param {number} opacity Opacity.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   * @return {boolean} The image or label was rendered.
   */
  replayImageOrLabel_(e, n, i, r, s, o, l) {
    const a = !!(o || l), u = r.declutterBox, c = l ? l[2] * r.scale[0] / 2 : 0;
    return u.minX - c <= n[0] && u.maxX + c >= 0 && u.minY - c <= n[1] && u.maxY + c >= 0 && (a && this.replayTextBackground_(
      e,
      On,
      un,
      cn,
      Fn,
      /** @type {Array<*>} */
      o,
      /** @type {Array<*>} */
      l
    ), yE(
      e,
      r.canvasTransform,
      s,
      i,
      r.originX,
      r.originY,
      r.drawImageW,
      r.drawImageH,
      r.drawImageX,
      r.drawImageY,
      r.scale
    )), !0;
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   */
  fill_(e) {
    const n = this.alignAndScaleFill_;
    if (n) {
      const i = Oe(this.renderedTransform_, [0, 0]), r = 512 * this.pixelRatio;
      e.save(), e.translate(i[0] % r, i[1] % r), n !== 1 && e.scale(n, n), e.rotate(this.viewRotation_);
    }
    e.fill(), n && e.restore();
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {Array<*>} instruction Instruction.
   */
  setStrokeStyle_(e, n) {
    e.strokeStyle = /** @type {import("../../colorlike.js").ColorLike} */
    n[1], e.lineWidth = /** @type {number} */
    n[2], e.lineCap = /** @type {CanvasLineCap} */
    n[3], e.lineJoin = /** @type {CanvasLineJoin} */
    n[4], e.miterLimit = /** @type {number} */
    n[5], e.lineDashOffset = /** @type {number} */
    n[7], e.setLineDash(
      /** @type {Array<number>} */
      n[6]
    );
  }
  /**
   * @private
   * @param {string|Array<string>} text The text to draw.
   * @param {string} textKey The key of the text state.
   * @param {string} strokeKey The key for the stroke state.
   * @param {string} fillKey The key for the fill state.
   * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
   */
  drawLabelWithPointPlacement_(e, n, i, r) {
    const s = this.textStates[n], o = this.createLabel(e, n, r, i), l = this.strokeStates[i], a = this.pixelRatio, u = Ru(
      Array.isArray(e) ? e[0] : e,
      s.textAlign || ro
    ), c = $l[s.textBaseline || Ul], h = l && l.lineWidth ? l.lineWidth : 0, d = o.width / a - 2 * s.scale[0], f = u * d + 2 * (0.5 - u) * h, m = c * o.height / a + 2 * (0.5 - c) * h;
    return {
      label: o,
      anchorX: f,
      anchorY: m
    };
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {Array<*>} instructions Instructions array.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @param {import("rbush").default<DeclutterEntry>} [declutterTree] Declutter tree.
   * @return {T|undefined} Callback result.
   * @template T
   */
  execute_(e, n, i, r, s, o, l, a) {
    const u = this.zIndexContext_;
    let c;
    this.pixelCoordinates_ && hi(i, this.renderedTransform_) ? c = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), c = ii(
      this.coordinates,
      0,
      this.coordinates.length,
      2,
      i,
      this.pixelCoordinates_
    ), yv(this.renderedTransform_, i));
    let h = 0;
    const d = r.length;
    let f = 0, m, y, E, p, g, _, v, x, C, S, w, T, A, N = 0, G = 0, X = null, D = null;
    const Y = this.coordinateCache_, P = this.viewRotation_, K = Math.round(Math.atan2(-i[1], i[0]) * 1e12) / 1e12, I = (
      /** @type {import("../../render.js").State} */
      {
        context: e,
        pixelRatio: this.pixelRatio,
        resolution: this.resolution,
        rotation: P
      }
    ), O = this.instructions != r || this.overlaps ? 0 : 200;
    let M, W, U, me;
    for (; h < d; ) {
      const k = r[h];
      switch (
        /** @type {import("./Instruction.js").default} */
        k[0]
      ) {
        case j.BEGIN_GEOMETRY:
          M = /** @type {import("../../Feature.js").FeatureLike} */
          k[1], me = k[3], M.getGeometry() ? l !== void 0 && !nt(l, me.getExtent()) ? h = /** @type {number} */
          k[2] + 1 : ++h : h = /** @type {number} */
          k[2], u && (u.zIndex = k[4]);
          break;
        case j.BEGIN_PATH:
          N > O && (this.fill_(e), N = 0), G > O && (e.stroke(), G = 0), !N && !G && (e.beginPath(), g = NaN, _ = NaN), ++h;
          break;
        case j.CIRCLE:
          f = /** @type {number} */
          k[1];
          const ae = c[f], de = c[f + 1], Bt = c[f + 2], sn = c[f + 3], pt = Bt - ae, Pn = sn - de, br = Math.sqrt(pt * pt + Pn * Pn);
          e.moveTo(ae + br, de), e.arc(ae, de, br, 0, 2 * Math.PI, !0), ++h;
          break;
        case j.CLOSE_PATH:
          e.closePath(), ++h;
          break;
        case j.CUSTOM:
          f = /** @type {number} */
          k[1], m = k[2];
          const So = (
            /** @type {import("../../geom/SimpleGeometry.js").default} */
            k[3]
          ), Ma = k[4], Zr = k[5];
          I.geometry = So, I.feature = M, h in Y || (Y[h] = []);
          const di = Y[h];
          Zr ? Zr(c, f, m, 2, di) : (di[0] = c[f], di[1] = c[f + 1], di.length = 2), u && (u.zIndex = k[6]), Ma(di, I), ++h;
          break;
        case j.DRAW_IMAGE:
          f = /** @type {number} */
          k[1], m = /** @type {number} */
          k[2], C = /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */
          k[3], y = /** @type {number} */
          k[4], E = /** @type {number} */
          k[5];
          let mt = (
            /** @type {number} */
            k[6]
          );
          const Vt = (
            /** @type {number} */
            k[7]
          ), Xi = (
            /** @type {number} */
            k[8]
          ), ji = (
            /** @type {number} */
            k[9]
          ), Hr = (
            /** @type {boolean} */
            k[10]
          );
          let fi = (
            /** @type {number} */
            k[11]
          );
          const Yi = (
            /** @type {import("../../size.js").Size} */
            k[12]
          );
          let Ui = (
            /** @type {number} */
            k[13]
          );
          p = k[14] || "declutter";
          const Le = (
            /** @type {{args: import("../canvas.js").DeclutterImageWithText, declutterMode: import('../../style/Style.js').DeclutterMode}} */
            k[15]
          );
          if (!C && k.length >= 20) {
            S = /** @type {string} */
            k[19], w = /** @type {string} */
            k[20], T = /** @type {string} */
            k[21], A = /** @type {string} */
            k[22];
            const _t = this.drawLabelWithPointPlacement_(
              S,
              w,
              T,
              A
            );
            C = _t.label, k[3] = C;
            const gi = (
              /** @type {number} */
              k[23]
            );
            y = (_t.anchorX - gi) * this.pixelRatio, k[4] = y;
            const yt = (
              /** @type {number} */
              k[24]
            );
            E = (_t.anchorY - yt) * this.pixelRatio, k[5] = E, mt = C.height, k[6] = mt, Ui = C.width, k[13] = Ui;
          }
          let Pa;
          k.length > 25 && (Pa = /** @type {number} */
          k[25]);
          let Aa, Co, Ro;
          k.length > 17 ? (Aa = /** @type {Array<number>} */
          k[16], Co = /** @type {boolean} */
          k[17], Ro = /** @type {boolean} */
          k[18]) : (Aa = Ci, Co = !1, Ro = !1), Hr && K ? fi += P : !Hr && !K && (fi -= P);
          let r0 = 0;
          for (; f < m; f += 2) {
            if (Pa && Pa[r0++] < Ui / this.pixelRatio)
              continue;
            const _t = this.calculateImageOrLabelDimensions_(
              C.width,
              C.height,
              c[f],
              c[f + 1],
              Ui,
              mt,
              y,
              E,
              Xi,
              ji,
              fi,
              Yi,
              s,
              Aa,
              Co || Ro,
              M
            ), gi = [
              e,
              n,
              C,
              _t,
              Vt,
              Co ? (
                /** @type {Array<*>} */
                X
              ) : null,
              Ro ? (
                /** @type {Array<*>} */
                D
              ) : null
            ];
            if (a) {
              let yt, Kt, vt;
              if (Le) {
                const _e = m - f;
                if (!Le[_e]) {
                  Le[_e] = { args: gi, declutterMode: p };
                  continue;
                }
                const Ke = Le[_e];
                yt = Ke.args, Kt = Ke.declutterMode, delete Le[_e], vt = xg(yt);
              }
              let on, ln;
              if (yt && (Kt !== "declutter" || !a.collides(vt)) && (on = !0), (p !== "declutter" || !a.collides(_t.declutterBox)) && (ln = !0), Kt === "declutter" && p === "declutter") {
                const _e = on && ln;
                on = _e, ln = _e;
              }
              on && (Kt !== "none" && a.insert(vt), this.replayImageOrLabel_.apply(this, yt)), ln && (p !== "none" && a.insert(_t.declutterBox), this.replayImageOrLabel_.apply(this, gi));
            } else
              this.replayImageOrLabel_.apply(this, gi);
          }
          ++h;
          break;
        case j.DRAW_CHARS:
          const hd = (
            /** @type {number} */
            k[1]
          ), dd = (
            /** @type {number} */
            k[2]
          ), Da = (
            /** @type {number} */
            k[3]
          ), s0 = (
            /** @type {number} */
            k[4]
          );
          A = /** @type {string} */
          k[5];
          const o0 = (
            /** @type {number} */
            k[6]
          ), fd = (
            /** @type {number} */
            k[7]
          ), gd = (
            /** @type {number} */
            k[8]
          );
          T = /** @type {string} */
          k[9];
          const Oa = (
            /** @type {number} */
            k[10]
          );
          S = /** @type {string} */
          k[11], w = /** @type {string} */
          k[12];
          const pd = [
            /** @type {number} */
            k[13],
            /** @type {number} */
            k[13]
          ];
          p = k[14] || "declutter";
          const Fa = this.textStates[w], $r = Fa.font, qr = [
            Fa.scale[0] * fd,
            Fa.scale[1] * fd
          ];
          let Qr;
          $r in this.widths_ ? Qr = this.widths_[$r] : (Qr = {}, this.widths_[$r] = Qr);
          const md = gw(c, hd, dd, 2), _d = Math.abs(qr[0]) * ng($r, S, Qr);
          if (s0 || _d <= md) {
            const _t = this.textStates[w].textAlign, gi = (md - _d) * Ru(S, _t), yt = fw(
              c,
              hd,
              dd,
              2,
              S,
              gi,
              o0,
              Math.abs(qr[0]),
              ng,
              $r,
              Qr,
              K ? 0 : this.viewRotation_
            );
            e: if (yt) {
              const Kt = [];
              let vt, on, ln, _e, Ke;
              if (T)
                for (vt = 0, on = yt.length; vt < on; ++vt) {
                  Ke = yt[vt], ln = /** @type {string} */
                  Ke[4], _e = this.createLabel(ln, w, "", T), y = /** @type {number} */
                  Ke[2] + (qr[0] < 0 ? -Oa : Oa), E = Da * _e.height + (0.5 - Da) * 2 * Oa * qr[1] / qr[0] - gd;
                  const an = this.calculateImageOrLabelDimensions_(
                    _e.width,
                    _e.height,
                    Ke[0],
                    Ke[1],
                    _e.width,
                    _e.height,
                    y,
                    E,
                    0,
                    0,
                    Ke[3],
                    pd,
                    !1,
                    Ci,
                    !1,
                    M
                  );
                  if (a && p === "declutter" && a.collides(an.declutterBox))
                    break e;
                  Kt.push([
                    e,
                    n,
                    _e,
                    an,
                    1,
                    null,
                    null
                  ]);
                }
              if (A)
                for (vt = 0, on = yt.length; vt < on; ++vt) {
                  Ke = yt[vt], ln = /** @type {string} */
                  Ke[4], _e = this.createLabel(ln, w, A, ""), y = /** @type {number} */
                  Ke[2], E = Da * _e.height - gd;
                  const an = this.calculateImageOrLabelDimensions_(
                    _e.width,
                    _e.height,
                    Ke[0],
                    Ke[1],
                    _e.width,
                    _e.height,
                    y,
                    E,
                    0,
                    0,
                    Ke[3],
                    pd,
                    !1,
                    Ci,
                    !1,
                    M
                  );
                  if (a && p === "declutter" && a.collides(an.declutterBox))
                    break e;
                  Kt.push([
                    e,
                    n,
                    _e,
                    an,
                    1,
                    null,
                    null
                  ]);
                }
              a && p !== "none" && a.load(Kt.map(xg));
              for (let an = 0, l0 = Kt.length; an < l0; ++an)
                this.replayImageOrLabel_.apply(this, Kt[an]);
            }
          }
          ++h;
          break;
        case j.END_GEOMETRY:
          if (o !== void 0) {
            M = /** @type {import("../../Feature.js").FeatureLike} */
            k[1];
            const _t = o(
              M,
              me,
              p
            );
            if (_t)
              return _t;
          }
          ++h;
          break;
        case j.FILL:
          O ? N++ : this.fill_(e), ++h;
          break;
        case j.MOVE_TO_LINE_TO:
          for (f = /** @type {number} */
          k[1], m = /** @type {number} */
          k[2], W = c[f], U = c[f + 1], e.moveTo(W, U), g = W + 0.5 | 0, _ = U + 0.5 | 0, f += 2; f < m; f += 2)
            W = c[f], U = c[f + 1], v = W + 0.5 | 0, x = U + 0.5 | 0, (f == m - 2 || v !== g || x !== _) && (e.lineTo(W, U), g = v, _ = x);
          ++h;
          break;
        case j.SET_FILL_STYLE:
          X = k, this.alignAndScaleFill_ = k[2], N && (this.fill_(e), N = 0, G && (e.stroke(), G = 0)), e.fillStyle = k[1], ++h;
          break;
        case j.SET_STROKE_STYLE:
          D = k, G && (e.stroke(), G = 0), this.setStrokeStyle_(
            e,
            /** @type {Array<*>} */
            k
          ), ++h;
          break;
        case j.STROKE:
          O ? G++ : e.stroke(), ++h;
          break;
        default:
          ++h;
          break;
      }
    }
    N && this.fill_(e), G && e.stroke();
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scaled canvas size.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {import("rbush").default<DeclutterEntry>} [declutterTree] Declutter tree.
   */
  execute(e, n, i, r, s, o) {
    this.viewRotation_ = r, this.execute_(
      e,
      n,
      i,
      this.instructions,
      s,
      void 0,
      void 0,
      o
    );
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @return {T|undefined} Callback result.
   * @template T
   */
  executeHitDetection(e, n, i, r, s) {
    return this.viewRotation_ = i, this.execute_(
      e,
      [e.canvas.width, e.canvas.height],
      n,
      this.hitDetectionInstructions,
      !0,
      r,
      s
    );
  }
}
const yr = [
  "Polygon",
  "Circle",
  "LineString",
  "Image",
  "Text",
  "Default"
], $_ = ["Image", "Text"], _w = yr.filter(
  (t) => !$_.includes(t)
);
class yw {
  /**
   * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
   * `maxExtent` was set on the Builder for this executor group, the same `maxExtent`
   * should be set here, unless the target context does not exceed that extent (which
   * can be the case when rendering to tiles).
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The executor group can have overlapping geometries.
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions
   * The serializable instructions.
   * @param {number} [renderBuffer] Optional rendering buffer.
   * @param {boolean} [deferredRendering] Enable deferred rendering with renderDeferred().
   */
  constructor(e, n, i, r, s, o, l) {
    this.maxExtent_ = e, this.overlaps_ = r, this.pixelRatio_ = i, this.resolution_ = n, this.renderBuffer_ = o, this.executorsByZIndex_ = {}, this.hitDetectionContext_ = null, this.hitDetectionTransform_ = jt(), this.renderedContext_ = null, this.deferredZIndexContexts_ = {}, this.createExecutors_(s, l);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  clip(e, n) {
    const i = this.getClipCoords(n);
    e.beginPath(), e.moveTo(i[0], i[1]), e.lineTo(i[2], i[3]), e.lineTo(i[4], i[5]), e.lineTo(i[6], i[7]), e.clip();
  }
  /**
   * Create executors and populate them using the provided instructions.
   * @private
   * @param {!Object<string, !Object<string, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
   * @param {boolean} deferredRendering Enable deferred rendering.
   */
  createExecutors_(e, n) {
    for (const i in e) {
      let r = this.executorsByZIndex_[i];
      r === void 0 && (r = {}, this.executorsByZIndex_[i] = r);
      const s = e[i];
      for (const o in s) {
        const l = s[o];
        r[o] = new mw(
          this.resolution_,
          this.pixelRatio_,
          this.overlaps_,
          l,
          n
        );
      }
    }
  }
  /**
   * @param {Array<import("../canvas.js").BuilderType>} executors Executors.
   * @return {boolean} Has executors of the provided types.
   */
  hasExecutors(e) {
    for (const n in this.executorsByZIndex_) {
      const i = this.executorsByZIndex_[n];
      for (let r = 0, s = e.length; r < s; ++r)
        if (e[r] in i)
          return !0;
    }
    return !1;
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default, number): T} callback Feature callback.
   * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(e, n, i, r, s, o) {
    r = Math.round(r);
    const l = r * 2 + 1, a = In(
      this.hitDetectionTransform_,
      r + 0.5,
      r + 0.5,
      1 / n,
      -1 / n,
      -i,
      -e[0],
      -e[1]
    ), u = !this.hitDetectionContext_;
    u && (this.hitDetectionContext_ = we(
      l,
      l,
      void 0,
      { willReadFrequently: !0 }
    ));
    const c = this.hitDetectionContext_;
    c.canvas.width !== l || c.canvas.height !== l ? (c.canvas.width = l, c.canvas.height = l) : u || c.clearRect(0, 0, l, l);
    let h;
    this.renderBuffer_ !== void 0 && (h = kt(), Ps(h, e), Ah(
      h,
      n * (this.renderBuffer_ + r),
      h
    ));
    const d = vw(r);
    let f;
    function m(x, C, S) {
      const w = c.getImageData(
        0,
        0,
        l,
        l
      ).data;
      for (let T = 0, A = d.length; T < A; T++)
        if (w[d[T]] > 0) {
          if (!o || S === "none" || f !== "Image" && f !== "Text" || o.includes(x)) {
            const N = (d[T] - 3) / 4, G = r - N % l, X = r - (N / l | 0), D = s(x, C, G * G + X * X);
            if (D)
              return D;
          }
          c.clearRect(0, 0, l, l);
          break;
        }
    }
    const y = Object.keys(this.executorsByZIndex_).map(Number);
    y.sort(vn);
    let E, p, g, _, v;
    for (E = y.length - 1; E >= 0; --E) {
      const x = y[E].toString();
      for (g = this.executorsByZIndex_[x], p = yr.length - 1; p >= 0; --p)
        if (f = yr[p], _ = g[f], _ !== void 0 && (v = _.executeHitDetection(
          c,
          a,
          i,
          m,
          h
        ), v))
          return v;
    }
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   * @return {Array<number>|null} Clip coordinates.
   */
  getClipCoords(e) {
    const n = this.maxExtent_;
    if (!n)
      return null;
    const i = n[0], r = n[1], s = n[2], o = n[3], l = [i, r, i, o, s, o, s, r];
    return ii(l, 0, 8, 2, e, l), l;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return zr(this.executorsByZIndex_);
  }
  /**
   * @param {CanvasRenderingContext2D} targetContext Context.
   * @param {import('../../size.js').Size} scaledCanvasSize Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
   * @param {Array<import("../canvas.js").BuilderType>} [builderTypes] Ordered replay types to replay.
   *     Default is {@link module:ol/render/replay~ALL}
   * @param {import("rbush").default<import('./Executor.js').DeclutterEntry>|null} [declutterTree] Declutter tree.
   *     When set to null, no decluttering is done, even when the executor group has a `ZIndexContext`.
   */
  execute(e, n, i, r, s, o, l) {
    const a = Object.keys(this.executorsByZIndex_).map(Number);
    a.sort(vn), o = o || yr;
    const u = yr.length;
    let c, h, d, f, m;
    for (l && a.reverse(), c = 0, h = a.length; c < h; ++c) {
      const y = a[c].toString();
      for (m = this.executorsByZIndex_[y], d = 0, f = o.length; d < f; ++d) {
        const E = o[d], p = m[E];
        if (p !== void 0) {
          const g = l === null ? void 0 : p.getZIndexContext(), _ = g ? g.getContext() : e, v = this.maxExtent_ && E !== "Image" && E !== "Text";
          if (v && (_.save(), this.clip(_, i)), !g || E === "Text" || E === "Image" ? p.execute(
            _,
            n,
            i,
            r,
            s,
            l
          ) : g.pushFunction(
            (x) => p.execute(
              x,
              n,
              i,
              r,
              s,
              l
            )
          ), v && _.restore(), g) {
            g.offset();
            const x = a[c] * u + d;
            this.deferredZIndexContexts_[x] || (this.deferredZIndexContexts_[x] = []), this.deferredZIndexContexts_[x].push(g);
          }
        }
      }
    }
    this.renderedContext_ = e;
  }
  getDeferredZIndexContexts() {
    return this.deferredZIndexContexts_;
  }
  getRenderedContext() {
    return this.renderedContext_;
  }
  renderDeferred() {
    const e = this.deferredZIndexContexts_, n = Object.keys(e).map(Number).sort(vn);
    for (let i = 0, r = n.length; i < r; ++i)
      e[n[i]].forEach((s) => {
        s.draw(this.renderedContext_), s.clear();
      }), e[n[i]].length = 0;
  }
}
const Tu = {};
function vw(t) {
  if (Tu[t] !== void 0)
    return Tu[t];
  const e = t * 2 + 1, n = t * t, i = new Array(n + 1);
  for (let s = 0; s <= t; ++s)
    for (let o = 0; o <= t; ++o) {
      const l = s * s + o * o;
      if (l > n)
        break;
      let a = i[l];
      a || (a = [], i[l] = a), a.push(((t + s) * e + (t + o)) * 4 + 3), s > 0 && a.push(((t - s) * e + (t + o)) * 4 + 3), o > 0 && (a.push(((t + s) * e + (t - o)) * 4 + 3), s > 0 && a.push(((t - s) * e + (t - o)) * 4 + 3));
    }
  const r = [];
  for (let s = 0, o = i.length; s < o; ++s)
    i[s] && r.push(...i[s]);
  return Tu[t] = r, r;
}
class Ew extends H_ {
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {number} [squaredTolerance] Optional squared tolerance for simplification.
   * @param {import("../../proj.js").TransformFunction} [userTransform] Transform from user to view projection.
   */
  constructor(e, n, i, r, s, o, l) {
    super(), this.context_ = e, this.pixelRatio_ = n, this.extent_ = i, this.transform_ = r, this.transformRotation_ = r ? kh(Math.atan2(r[1], r[0]), 10) : 0, this.viewRotation_ = s, this.squaredTolerance_ = o, this.userTransform_ = l, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = [0, 0], this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = [0, 0], this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = jt();
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawImages_(e, n, i, r) {
    if (!this.image_)
      return;
    const s = ii(
      e,
      n,
      i,
      r,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_, l = this.tmpLocalTransform_, a = o.globalAlpha;
    this.imageOpacity_ != 1 && (o.globalAlpha = a * this.imageOpacity_);
    let u = this.imageRotation_;
    this.transformRotation_ === 0 && (u -= this.viewRotation_), this.imageRotateWithView_ && (u += this.viewRotation_);
    for (let c = 0, h = s.length; c < h; c += 2) {
      const d = s[c] - this.imageAnchorX_, f = s[c + 1] - this.imageAnchorY_;
      if (u !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const m = d + this.imageAnchorX_, y = f + this.imageAnchorY_;
        In(
          l,
          m,
          y,
          1,
          1,
          u,
          -m,
          -y
        ), o.save(), o.transform.apply(o, l), o.translate(m, y), o.scale(this.imageScale_[0], this.imageScale_[1]), o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          -this.imageAnchorX_,
          -this.imageAnchorY_,
          this.imageWidth_,
          this.imageHeight_
        ), o.restore();
      } else
        o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          d,
          f,
          this.imageWidth_,
          this.imageHeight_
        );
    }
    this.imageOpacity_ != 1 && (o.globalAlpha = a);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawText_(e, n, i, r) {
    if (!this.textState_ || this.text_ === "")
      return;
    this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
    const s = ii(
      e,
      n,
      i,
      r,
      this.transform_,
      this.pixelCoordinates_
    ), o = this.context_;
    let l = this.textRotation_;
    for (this.transformRotation_ === 0 && (l -= this.viewRotation_), this.textRotateWithView_ && (l += this.viewRotation_); n < i; n += r) {
      const a = s[n] + this.textOffsetX_, u = s[n + 1] + this.textOffsetY_;
      l !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1 ? (o.save(), o.translate(a - this.textOffsetX_, u - this.textOffsetY_), o.rotate(l), o.translate(this.textOffsetX_, this.textOffsetY_), o.scale(this.textScale_[0], this.textScale_[1]), this.textStrokeState_ && o.strokeText(this.text_, 0, 0), this.textFillState_ && o.fillText(this.text_, 0, 0), o.restore()) : (this.textStrokeState_ && o.strokeText(this.text_, a, u), this.textFillState_ && o.fillText(this.text_, a, u));
    }
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} close Close.
   * @private
   * @return {number} end End.
   */
  moveToLineTo_(e, n, i, r, s) {
    const o = this.context_, l = ii(
      e,
      n,
      i,
      r,
      this.transform_,
      this.pixelCoordinates_
    );
    o.moveTo(l[0], l[1]);
    let a = l.length;
    s && (a -= 2);
    for (let u = 2; u < a; u += 2)
      o.lineTo(l[u], l[u + 1]);
    return s && o.closePath(), i;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawRings_(e, n, i, r) {
    for (let s = 0, o = i.length; s < o; ++s)
      n = this.moveToLineTo_(
        e,
        n,
        i[s],
        r,
        !0
      );
    return n;
  }
  /**
   * Render a circle geometry into the canvas.  Rendering is immediate and uses
   * the current fill and stroke styles.
   *
   * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
   * @api
   * @override
   */
  drawCircle(e) {
    if (this.squaredTolerance_ && (e = /** @type {import("../../geom/Circle.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!nt(this.extent_, e.getExtent())) {
      if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const n = Rv(
          e,
          this.transform_,
          this.pixelCoordinates_
        ), i = n[2] - n[0], r = n[3] - n[1], s = Math.sqrt(i * i + r * r), o = this.context_;
        o.beginPath(), o.arc(
          n[0],
          n[1],
          s,
          0,
          2 * Math.PI
        ), this.fillState_ && o.fill(), this.strokeState_ && o.stroke();
      }
      this.text_ !== "" && this.drawText_(e.getCenter(), 0, 2, 2);
    }
  }
  /**
   * Set the rendering style.  Note that since this is an immediate rendering API,
   * any `zIndex` on the provided style will be ignored.
   *
   * @param {import("../../style/Style.js").default} style The rendering style.
   * @api
   * @override
   */
  setStyle(e) {
    this.setFillStrokeStyle(e.getFill(), e.getStroke()), this.setImageStyle(e.getImage()), this.setTextStyle(e.getText());
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  setTransform(e) {
    this.transform_ = e;
  }
  /**
   * Render a geometry into the canvas.  Call
   * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
   *
   * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
   * @api
   * @override
   */
  drawGeometry(e) {
    switch (e.getType()) {
      case "Point":
        this.drawPoint(
          /** @type {import("../../geom/Point.js").default} */
          e
        );
        break;
      case "LineString":
        this.drawLineString(
          /** @type {import("../../geom/LineString.js").default} */
          e
        );
        break;
      case "Polygon":
        this.drawPolygon(
          /** @type {import("../../geom/Polygon.js").default} */
          e
        );
        break;
      case "MultiPoint":
        this.drawMultiPoint(
          /** @type {import("../../geom/MultiPoint.js").default} */
          e
        );
        break;
      case "MultiLineString":
        this.drawMultiLineString(
          /** @type {import("../../geom/MultiLineString.js").default} */
          e
        );
        break;
      case "MultiPolygon":
        this.drawMultiPolygon(
          /** @type {import("../../geom/MultiPolygon.js").default} */
          e
        );
        break;
      case "GeometryCollection":
        this.drawGeometryCollection(
          /** @type {import("../../geom/GeometryCollection.js").default} */
          e
        );
        break;
      case "Circle":
        this.drawCircle(
          /** @type {import("../../geom/Circle.js").default} */
          e
        );
        break;
    }
  }
  /**
   * Render a feature into the canvas.  Note that any `zIndex` on the provided
   * style will be ignored - features are rendered immediately in the order that
   * this method is called.  If you need `zIndex` support, you should be using an
   * {@link module:ol/layer/Vector~VectorLayer} instead.
   *
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {import("../../style/Style.js").default} style Style.
   * @api
   * @override
   */
  drawFeature(e, n) {
    const i = n.getGeometryFunction()(e);
    i && (this.setStyle(n), this.drawGeometry(i));
  }
  /**
   * Render a GeometryCollection to the canvas.  Rendering is immediate and
   * uses the current styles appropriate for each geometry in the collection.
   *
   * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
   * @override
   */
  drawGeometryCollection(e) {
    const n = e.getGeometriesArray();
    for (let i = 0, r = n.length; i < r; ++i)
      this.drawGeometry(n[i]);
  }
  /**
   * Render a Point geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
   * @override
   */
  drawPoint(e) {
    this.squaredTolerance_ && (e = /** @type {import("../../geom/Point.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const n = e.getFlatCoordinates(), i = e.getStride();
    this.image_ && this.drawImages_(n, 0, n.length, i), this.text_ !== "" && this.drawText_(n, 0, n.length, i);
  }
  /**
   * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
   * uses the current style.
   *
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
   * @override
   */
  drawMultiPoint(e) {
    this.squaredTolerance_ && (e = /** @type {import("../../geom/MultiPoint.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const n = e.getFlatCoordinates(), i = e.getStride();
    this.image_ && this.drawImages_(n, 0, n.length, i), this.text_ !== "" && this.drawText_(n, 0, n.length, i);
  }
  /**
   * Render a LineString into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
   * @override
   */
  drawLineString(e) {
    if (this.squaredTolerance_ && (e = /** @type {import("../../geom/LineString.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!nt(this.extent_, e.getExtent())) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const n = this.context_, i = e.getFlatCoordinates();
        n.beginPath(), this.moveToLineTo_(
          i,
          0,
          i.length,
          e.getStride(),
          !1
        ), n.stroke();
      }
      if (this.text_ !== "") {
        const n = e.getFlatMidpoint();
        this.drawText_(n, 0, 2, 2);
      }
    }
  }
  /**
   * Render a MultiLineString geometry into the canvas.  Rendering is immediate
   * and uses the current style.
   *
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
   * @override
   */
  drawMultiLineString(e) {
    this.squaredTolerance_ && (e = /** @type {import("../../geom/MultiLineString.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    ));
    const n = e.getExtent();
    if (nt(this.extent_, n)) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const i = this.context_, r = e.getFlatCoordinates();
        let s = 0;
        const o = (
          /** @type {Array<number>} */
          e.getEnds()
        ), l = e.getStride();
        i.beginPath();
        for (let a = 0, u = o.length; a < u; ++a)
          s = this.moveToLineTo_(
            r,
            s,
            o[a],
            l,
            !1
          );
        i.stroke();
      }
      if (this.text_ !== "") {
        const i = e.getFlatMidpoints();
        this.drawText_(i, 0, i.length, 2);
      }
    }
  }
  /**
   * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
   * @override
   */
  drawPolygon(e) {
    if (this.squaredTolerance_ && (e = /** @type {import("../../geom/Polygon.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!nt(this.extent_, e.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const n = this.context_;
        n.beginPath(), this.drawRings_(
          e.getOrientedFlatCoordinates(),
          0,
          /** @type {Array<number>} */
          e.getEnds(),
          e.getStride()
        ), this.fillState_ && n.fill(), this.strokeState_ && n.stroke();
      }
      if (this.text_ !== "") {
        const n = e.getFlatInteriorPoint();
        this.drawText_(n, 0, 2, 2);
      }
    }
  }
  /**
   * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
   * uses the current style.
   * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   * @override
   */
  drawMultiPolygon(e) {
    if (this.squaredTolerance_ && (e = /** @type {import("../../geom/MultiPolygon.js").default} */
    e.simplifyTransformed(
      this.squaredTolerance_,
      this.userTransform_
    )), !!nt(this.extent_, e.getExtent())) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const n = this.context_, i = e.getOrientedFlatCoordinates();
        let r = 0;
        const s = e.getEndss(), o = e.getStride();
        n.beginPath();
        for (let l = 0, a = s.length; l < a; ++l) {
          const u = s[l];
          r = this.drawRings_(i, r, u, o);
        }
        this.fillState_ && n.fill(), this.strokeState_ && n.stroke();
      }
      if (this.text_ !== "") {
        const n = e.getFlatInteriorPoints();
        this.drawText_(n, 0, n.length, 2);
      }
    }
  }
  /**
   * @param {import("../canvas.js").FillState} fillState Fill state.
   * @private
   */
  setContextFillState_(e) {
    const n = this.context_, i = this.contextFillState_;
    i ? i.fillStyle != e.fillStyle && (i.fillStyle = e.fillStyle, n.fillStyle = e.fillStyle) : (n.fillStyle = e.fillStyle, this.contextFillState_ = {
      fillStyle: e.fillStyle
    });
  }
  /**
   * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
   * @private
   */
  setContextStrokeState_(e) {
    const n = this.context_, i = this.contextStrokeState_;
    i ? (i.lineCap != e.lineCap && (i.lineCap = e.lineCap, n.lineCap = e.lineCap), hi(i.lineDash, e.lineDash) || n.setLineDash(
      i.lineDash = e.lineDash
    ), i.lineDashOffset != e.lineDashOffset && (i.lineDashOffset = e.lineDashOffset, n.lineDashOffset = e.lineDashOffset), i.lineJoin != e.lineJoin && (i.lineJoin = e.lineJoin, n.lineJoin = e.lineJoin), i.lineWidth != e.lineWidth && (i.lineWidth = e.lineWidth, n.lineWidth = e.lineWidth), i.miterLimit != e.miterLimit && (i.miterLimit = e.miterLimit, n.miterLimit = e.miterLimit), i.strokeStyle != e.strokeStyle && (i.strokeStyle = e.strokeStyle, n.strokeStyle = e.strokeStyle)) : (n.lineCap = e.lineCap, n.setLineDash(e.lineDash), n.lineDashOffset = e.lineDashOffset, n.lineJoin = e.lineJoin, n.lineWidth = e.lineWidth, n.miterLimit = e.miterLimit, n.strokeStyle = e.strokeStyle, this.contextStrokeState_ = {
      lineCap: e.lineCap,
      lineDash: e.lineDash,
      lineDashOffset: e.lineDashOffset,
      lineJoin: e.lineJoin,
      lineWidth: e.lineWidth,
      miterLimit: e.miterLimit,
      strokeStyle: e.strokeStyle
    });
  }
  /**
   * @param {import("../canvas.js").TextState} textState Text state.
   * @private
   */
  setContextTextState_(e) {
    const n = this.context_, i = this.contextTextState_, r = e.textAlign ? e.textAlign : ro;
    i ? (i.font != e.font && (i.font = e.font, n.font = e.font), i.textAlign != r && (i.textAlign = r, n.textAlign = r), i.textBaseline != e.textBaseline && (i.textBaseline = e.textBaseline, n.textBaseline = e.textBaseline)) : (n.font = e.font, n.textAlign = r, n.textBaseline = e.textBaseline, this.contextTextState_ = {
      font: e.font,
      textAlign: r,
      textBaseline: e.textBaseline
    });
  }
  /**
   * Set the fill and stroke style for subsequent draw operations.  To clear
   * either fill or stroke styles, pass null for the appropriate parameter.
   *
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   * @override
   */
  setFillStrokeStyle(e, n) {
    if (!e)
      this.fillState_ = null;
    else {
      const i = e.getColor();
      this.fillState_ = {
        fillStyle: en(
          i || et
        )
      };
    }
    if (!n)
      this.strokeState_ = null;
    else {
      const i = n.getColor(), r = n.getLineCap(), s = n.getLineDash(), o = n.getLineDashOffset(), l = n.getLineJoin(), a = n.getWidth(), u = n.getMiterLimit(), c = s || En;
      this.strokeState_ = {
        lineCap: r !== void 0 ? r : Xr,
        lineDash: this.pixelRatio_ === 1 ? c : c.map((h) => h * this.pixelRatio_),
        lineDashOffset: (o || xn) * this.pixelRatio_,
        lineJoin: l !== void 0 ? l : jr,
        lineWidth: (a !== void 0 ? a : so) * this.pixelRatio_,
        miterLimit: u !== void 0 ? u : no,
        strokeStyle: en(
          i || io
        )
      };
    }
  }
  /**
   * Set the image style for subsequent draw operations.  Pass null to remove
   * the image style.
   *
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @override
   */
  setImageStyle(e) {
    let n;
    if (!e || !(n = e.getSize())) {
      this.image_ = null;
      return;
    }
    const i = e.getPixelRatio(this.pixelRatio_), r = e.getAnchor(), s = e.getOrigin();
    this.image_ = e.getImage(this.pixelRatio_), this.imageAnchorX_ = r[0] * i, this.imageAnchorY_ = r[1] * i, this.imageHeight_ = n[1] * i, this.imageOpacity_ = e.getOpacity(), this.imageOriginX_ = s[0], this.imageOriginY_ = s[1], this.imageRotateWithView_ = e.getRotateWithView(), this.imageRotation_ = e.getRotation();
    const o = e.getScaleArray();
    this.imageScale_ = [
      o[0] * this.pixelRatio_ / i,
      o[1] * this.pixelRatio_ / i
    ], this.imageWidth_ = n[0] * i;
  }
  /**
   * Set the text style for subsequent draw operations.  Pass null to
   * remove the text style.
   *
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @override
   */
  setTextStyle(e) {
    if (!e)
      this.text_ = "";
    else {
      const n = e.getFill();
      if (!n)
        this.textFillState_ = null;
      else {
        const f = n.getColor();
        this.textFillState_ = {
          fillStyle: en(
            f || et
          )
        };
      }
      const i = e.getStroke();
      if (!i)
        this.textStrokeState_ = null;
      else {
        const f = i.getColor(), m = i.getLineCap(), y = i.getLineDash(), E = i.getLineDashOffset(), p = i.getLineJoin(), g = i.getWidth(), _ = i.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: m !== void 0 ? m : Xr,
          lineDash: y || En,
          lineDashOffset: E || xn,
          lineJoin: p !== void 0 ? p : jr,
          lineWidth: g !== void 0 ? g : so,
          miterLimit: _ !== void 0 ? _ : no,
          strokeStyle: en(
            f || io
          )
        };
      }
      const r = e.getFont(), s = e.getOffsetX(), o = e.getOffsetY(), l = e.getRotateWithView(), a = e.getRotation(), u = e.getScaleArray(), c = e.getText(), h = e.getTextAlign(), d = e.getTextBaseline();
      this.textState_ = {
        font: r !== void 0 ? r : C_,
        textAlign: h !== void 0 ? h : ro,
        textBaseline: d !== void 0 ? d : Ul
      }, this.text_ = c !== void 0 ? Array.isArray(c) ? c.reduce((f, m, y) => f += y % 2 ? " " : m, "") : c : "", this.textOffsetX_ = s !== void 0 ? this.pixelRatio_ * s : 0, this.textOffsetY_ = o !== void 0 ? this.pixelRatio_ * o : 0, this.textRotateWithView_ = l !== void 0 ? l : !1, this.textRotation_ = a !== void 0 ? a : 0, this.textScale_ = [
        this.pixelRatio_ * u[0],
        this.pixelRatio_ * u[1]
      ];
    }
  }
}
const qt = 0.5;
function xw(t, e, n, i, r, s, o, l, a) {
  const u = r, c = t[0] * qt, h = t[1] * qt, d = we(c, h);
  d.imageSmoothingEnabled = !1;
  const f = d.canvas, m = new Ew(
    d,
    qt,
    r,
    null,
    o,
    l,
    null
  ), y = n.length, E = Math.floor((256 * 256 * 256 - 1) / y), p = {};
  for (let _ = 1; _ <= y; ++_) {
    const v = n[_ - 1], x = v.getStyleFunction() || i;
    if (!x)
      continue;
    let C = x(v, s);
    if (!C)
      continue;
    Array.isArray(C) || (C = [C]);
    const w = (_ * E).toString(16).padStart(7, "#00000");
    for (let T = 0, A = C.length; T < A; ++T) {
      const N = C[T], G = N.getGeometryFunction()(v);
      if (!G || !nt(u, G.getExtent()))
        continue;
      const X = N.clone(), D = X.getFill();
      D && D.setColor(w);
      const Y = X.getStroke();
      Y && (Y.setColor(w), Y.setLineDash(null)), X.setText(void 0);
      const P = N.getImage();
      if (P) {
        const M = P.getImageSize();
        if (!M)
          continue;
        const W = we(
          M[0],
          M[1],
          void 0,
          { alpha: !1 }
        ), U = W.canvas;
        W.fillStyle = w, W.fillRect(0, 0, U.width, U.height), X.setImage(
          new Ia({
            img: U,
            anchor: P.getAnchor(),
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            offset: P.getOrigin(),
            opacity: 1,
            size: P.getSize(),
            scale: P.getScale(),
            rotation: P.getRotation(),
            rotateWithView: P.getRotateWithView()
          })
        );
      }
      const K = X.getZIndex() || 0;
      let I = p[K];
      I || (I = {}, p[K] = I, I.Polygon = [], I.Circle = [], I.LineString = [], I.Point = []);
      const O = G.getType();
      if (O === "GeometryCollection") {
        const M = (
          /** @type {import("../../geom/GeometryCollection.js").default} */
          G.getGeometriesArrayRecursive()
        );
        for (let W = 0, U = M.length; W < U; ++W) {
          const me = M[W];
          I[me.getType().replace("Multi", "")].push(
            me,
            X
          );
        }
      } else
        I[O.replace("Multi", "")].push(G, X);
    }
  }
  const g = Object.keys(p).map(Number).sort(vn);
  for (let _ = 0, v = g.length; _ < v; ++_) {
    const x = p[g[_]];
    for (const C in x) {
      const S = x[C];
      for (let w = 0, T = S.length; w < T; w += 2) {
        m.setStyle(S[w + 1]);
        for (let A = 0, N = e.length; A < N; ++A)
          m.setTransform(e[A]), m.drawGeometry(S[w]);
      }
    }
  }
  return d.getImageData(0, 0, f.width, f.height);
}
function ww(t, e, n) {
  const i = [];
  if (n) {
    const r = Math.floor(Math.round(t[0]) * qt), s = Math.floor(Math.round(t[1]) * qt), o = (Ee(r, 0, n.width - 1) + Ee(s, 0, n.height - 1) * n.width) * 4, l = n.data[o], a = n.data[o + 1], c = n.data[o + 2] + 256 * (a + 256 * l), h = Math.floor((256 * 256 * 256 - 1) / e.length);
    c && c % h === 0 && i.push(e[c / h - 1]);
  }
  return i;
}
const Sw = 0.5, q_ = {
  Point: Pw,
  LineString: Lw,
  Polygon: Dw,
  MultiPoint: Aw,
  MultiLineString: kw,
  MultiPolygon: Mw,
  GeometryCollection: Iw,
  Circle: Rw
};
function Cw(t, e) {
  return parseInt(ie(t), 10) - parseInt(ie(e), 10);
}
function Sg(t, e) {
  const n = Q_(t, e);
  return n * n;
}
function Q_(t, e) {
  return Sw * t / e;
}
function Rw(t, e, n, i, r) {
  const s = n.getFill(), o = n.getStroke();
  if (s || o) {
    const a = t.getBuilder(n.getZIndex(), "Circle");
    a.setFillStrokeStyle(s, o), a.drawCircle(e, i, r);
  }
  const l = n.getText();
  if (l && l.getText()) {
    const a = t.getBuilder(n.getZIndex(), "Text");
    a.setTextStyle(l), a.drawText(e, i);
  }
}
function Cg(t, e, n, i, r, s, o, l) {
  const a = [], u = n.getImage();
  if (u) {
    let d = !0;
    const f = u.getImageState();
    f == Z.LOADED || f == Z.ERROR ? d = !1 : f == Z.IDLE && u.load(), d && a.push(u.ready());
  }
  const c = n.getFill();
  c && c.loading() && a.push(c.ready());
  const h = a.length > 0;
  return h && Promise.all(a).then(() => r(null)), Tw(
    t,
    e,
    n,
    i,
    s,
    o,
    l
  ), h;
}
function Tw(t, e, n, i, r, s, o) {
  const l = n.getGeometryFunction()(e);
  if (!l)
    return;
  const a = l.simplifyTransformed(
    i,
    r
  );
  if (n.getRenderer())
    J_(t, a, n, e, o);
  else {
    const c = q_[a.getType()];
    c(
      t,
      a,
      n,
      e,
      o,
      s
    );
  }
}
function J_(t, e, n, i, r) {
  if (e.getType() == "GeometryCollection") {
    const o = (
      /** @type {import("../geom/GeometryCollection.js").default} */
      e.getGeometries()
    );
    for (let l = 0, a = o.length; l < a; ++l)
      J_(t, o[l], n, i, r);
    return;
  }
  t.getBuilder(n.getZIndex(), "Default").drawCustom(
    /** @type {import("../geom/SimpleGeometry.js").default} */
    e,
    i,
    n.getRenderer(),
    n.getHitDetectionRenderer(),
    r
  );
}
function Iw(t, e, n, i, r, s) {
  const o = e.getGeometriesArray();
  let l, a;
  for (l = 0, a = o.length; l < a; ++l) {
    const u = q_[o[l].getType()];
    u(
      t,
      o[l],
      n,
      i,
      r,
      s
    );
  }
}
function Lw(t, e, n, i, r) {
  const s = n.getStroke();
  if (s) {
    const l = t.getBuilder(
      n.getZIndex(),
      "LineString"
    );
    l.setFillStrokeStyle(null, s), l.drawLineString(e, i, r);
  }
  const o = n.getText();
  if (o && o.getText()) {
    const l = t.getBuilder(n.getZIndex(), "Text");
    l.setTextStyle(o), l.drawText(e, i, r);
  }
}
function kw(t, e, n, i, r) {
  const s = n.getStroke();
  if (s) {
    const l = t.getBuilder(
      n.getZIndex(),
      "LineString"
    );
    l.setFillStrokeStyle(null, s), l.drawMultiLineString(e, i, r);
  }
  const o = n.getText();
  if (o && o.getText()) {
    const l = t.getBuilder(n.getZIndex(), "Text");
    l.setTextStyle(o), l.drawText(e, i, r);
  }
}
function Mw(t, e, n, i, r) {
  const s = n.getFill(), o = n.getStroke();
  if (o || s) {
    const a = t.getBuilder(n.getZIndex(), "Polygon");
    a.setFillStrokeStyle(s, o), a.drawMultiPolygon(e, i, r);
  }
  const l = n.getText();
  if (l && l.getText()) {
    const a = t.getBuilder(n.getZIndex(), "Text");
    a.setTextStyle(l), a.drawText(e, i, r);
  }
}
function Pw(t, e, n, i, r, s) {
  const o = n.getImage(), l = n.getText(), a = l && l.getText(), u = s && o && a ? {} : void 0;
  if (o) {
    if (o.getImageState() != Z.LOADED)
      return;
    const c = t.getBuilder(n.getZIndex(), "Image");
    c.setImageStyle(o, u), c.drawPoint(e, i, r);
  }
  if (a) {
    const c = t.getBuilder(n.getZIndex(), "Text");
    c.setTextStyle(l, u), c.drawText(e, i, r);
  }
}
function Aw(t, e, n, i, r, s) {
  const o = n.getImage(), l = o && o.getOpacity() !== 0, a = n.getText(), u = a && a.getText(), c = s && l && u ? {} : void 0;
  if (l) {
    if (o.getImageState() != Z.LOADED)
      return;
    const h = t.getBuilder(n.getZIndex(), "Image");
    h.setImageStyle(o, c), h.drawMultiPoint(e, i, r);
  }
  if (u) {
    const h = t.getBuilder(n.getZIndex(), "Text");
    h.setTextStyle(a, c), h.drawText(e, i, r);
  }
}
function Dw(t, e, n, i, r) {
  const s = n.getFill(), o = n.getStroke();
  if (s || o) {
    const a = t.getBuilder(n.getZIndex(), "Polygon");
    a.setFillStrokeStyle(s, o), a.drawPolygon(e, i, r);
  }
  const l = n.getText();
  if (l && l.getText()) {
    const a = t.getBuilder(n.getZIndex(), "Text");
    a.setTextStyle(l), a.drawText(e, i, r);
  }
}
class Ow extends U_ {
  /**
   * @param {import("../../layer/BaseVector.js").default} vectorLayer Vector layer.
   */
  constructor(e) {
    super(e), this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this), this.animatingOrInteracting_, this.hitDetectionImageData_ = null, this.clipped_ = !1, this.renderedFeatures_ = null, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = kt(), this.wrappedRenderedExtent_ = kt(), this.renderedRotation_, this.renderedCenter_ = null, this.renderedProjection_ = null, this.renderedPixelRatio_ = 1, this.renderedRenderOrder_ = null, this.renderedFrameDeclutter_, this.replayGroup_ = null, this.replayGroupChanged = !0, this.clipping = !0, this.targetContext_ = null, this.opacity_ = 1;
  }
  /**
   * @param {ExecutorGroup} executorGroup Executor group.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {boolean} [declutterable] `true` to only render declutterable items,
   *     `false` to only render non-declutterable items, `undefined` to render all.
   */
  renderWorlds(e, n, i) {
    const r = n.extent, s = n.viewState, o = s.center, l = s.resolution, a = s.projection, u = s.rotation, c = a.getExtent(), h = this.getLayer().getSource(), d = this.getLayer().getDeclutter(), f = n.pixelRatio, m = n.viewHints, y = !(m[Ye.ANIMATING] || m[Ye.INTERACTING]), E = this.context, p = Math.round(ne(r) / l * f), g = Math.round(Be(r) / l * f), _ = h.getWrapX() && a.canWrapX(), v = _ ? ne(c) : null, x = _ ? Math.ceil((r[2] - c[2]) / v) + 1 : 1;
    let C = _ ? Math.floor((r[0] - c[0]) / v) : 0;
    do {
      let S = this.getRenderTransform(
        o,
        l,
        0,
        f,
        p,
        g,
        C * v
      );
      n.declutter && (S = S.slice(0)), e.execute(
        E,
        [E.canvas.width, E.canvas.height],
        S,
        u,
        y,
        i === void 0 ? yr : i ? $_ : _w,
        i ? d && n.declutter[d] : void 0
      );
    } while (++C < x);
  }
  /**
   * @private
   */
  setDrawContext_() {
    this.opacity_ !== 1 && (this.targetContext_ = this.context, this.context = we(
      this.context.canvas.width,
      this.context.canvas.height,
      gg
    ));
  }
  /**
   * @private
   */
  resetDrawContext_() {
    if (this.opacity_ !== 1) {
      const e = this.targetContext_.globalAlpha;
      this.targetContext_.globalAlpha = this.opacity_, this.targetContext_.drawImage(this.context.canvas, 0, 0), this.targetContext_.globalAlpha = e, Wr(this.context), gg.push(this.context.canvas), this.context = this.targetContext_, this.targetContext_ = null;
    }
  }
  /**
   * Render declutter items for this layer
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeclutter(e) {
    !this.replayGroup_ || !this.getLayer().getDeclutter() || this.renderWorlds(this.replayGroup_, e, !0);
  }
  /**
   * Render deferred instructions.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @override
   */
  renderDeferredInternal(e) {
    this.replayGroup_ && (this.replayGroup_.renderDeferred(), this.clipped_ && this.context.restore(), this.resetDrawContext_());
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   * @override
   */
  renderFrame(e, n) {
    const i = e.layerStatesArray[e.layerIndex];
    this.opacity_ = i.opacity;
    const r = e.viewState;
    this.prepareContainer(e, n);
    const s = this.context, o = this.replayGroup_;
    let l = o && !o.isEmpty();
    if (!l && !(this.getLayer().hasListener(Rt.PRERENDER) || this.getLayer().hasListener(Rt.POSTRENDER)))
      return null;
    if (this.setDrawContext_(), this.preRender(s, e), r.projection, this.clipped_ = !1, l && i.extent && this.clipping) {
      const a = bn(i.extent);
      l = nt(a, e.extent), this.clipped_ = l && !mr(a, e.extent), this.clipped_ && this.clipUnrotated(s, e, a);
    }
    return l && this.renderWorlds(
      o,
      e,
      this.getLayer().getDeclutter() ? !1 : void 0
    ), !e.declutter && this.clipped_ && s.restore(), this.postRender(s, e), this.renderedRotation_ !== r.rotation && (this.renderedRotation_ = r.rotation, this.hitDetectionImageData_ = null), e.declutter || this.resetDrawContext_(), this.container;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise
   * that resolves with an array of features.
   * @override
   */
  getFeatures(e) {
    return new Promise((n) => {
      if (this.frameState && !this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
        const i = this.frameState.size.slice(), r = this.renderedCenter_, s = this.renderedResolution_, o = this.renderedRotation_, l = this.renderedProjection_, a = this.wrappedRenderedExtent_, u = this.getLayer(), c = [], h = i[0] * qt, d = i[1] * qt;
        c.push(
          this.getRenderTransform(
            r,
            s,
            o,
            qt,
            h,
            d,
            0
          ).slice()
        );
        const f = u.getSource(), m = l.getExtent();
        if (f.getWrapX() && l.canWrapX() && !mr(m, a)) {
          let y = a[0];
          const E = ne(m);
          let p = 0, g;
          for (; y < m[0]; )
            --p, g = E * p, c.push(
              this.getRenderTransform(
                r,
                s,
                o,
                qt,
                h,
                d,
                g
              ).slice()
            ), y += E;
          for (p = 0, y = a[2]; y > m[2]; )
            ++p, g = E * p, c.push(
              this.getRenderTransform(
                r,
                s,
                o,
                qt,
                h,
                d,
                g
              ).slice()
            ), y -= E;
        }
        this.hitDetectionImageData_ = xw(
          i,
          c,
          this.renderedFeatures_,
          u.getStyleFunction(),
          a,
          s,
          o,
          Sg(s, this.renderedPixelRatio_)
        );
      }
      n(
        ww(e, this.renderedFeatures_, this.hitDetectionImageData_)
      );
    });
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   * @override
   */
  forEachFeatureAtCoordinate(e, n, i, r, s) {
    if (!this.replayGroup_)
      return;
    const o = n.viewState.resolution, l = n.viewState.rotation, a = this.getLayer(), u = {}, c = function(m, y, E) {
      const p = ie(m), g = u[p];
      if (g) {
        if (g !== !0 && E < g.distanceSq) {
          if (E === 0)
            return u[p] = !0, s.splice(s.lastIndexOf(g), 1), r(m, a, y);
          g.geometry = y, g.distanceSq = E;
        }
      } else {
        if (E === 0)
          return u[p] = !0, r(m, a, y);
        s.push(
          u[p] = {
            feature: m,
            layer: a,
            geometry: y,
            distanceSq: E,
            callback: r
          }
        );
      }
    };
    let h;
    const d = [this.replayGroup_], f = this.getLayer().getDeclutter();
    return d.some((m) => h = m.forEachFeatureAtCoordinate(
      e,
      o,
      l,
      i,
      c,
      f && n.declutter[f] ? n.declutter[f].all().map((y) => y.value) : null
    )), h;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @override
   */
  handleFontsChanged() {
    const e = this.getLayer();
    e.getVisible() && this.replayGroup_ && e.changed();
  }
  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */
  handleStyleImageChange_(e) {
    this.renderIfReadyAndVisible();
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(e) {
    const n = this.getLayer(), i = n.getSource();
    if (!i)
      return !1;
    const r = e.viewHints[Ye.ANIMATING], s = e.viewHints[Ye.INTERACTING], o = n.getUpdateWhileAnimating(), l = n.getUpdateWhileInteracting();
    if (this.ready && !o && r || !l && s)
      return this.animatingOrInteracting_ = !0, !0;
    this.animatingOrInteracting_ = !1;
    const a = e.extent, u = e.viewState, c = u.projection, h = u.resolution, d = e.pixelRatio, f = n.getRevision(), m = n.getRenderBuffer();
    let y = n.getRenderOrder();
    y === void 0 && (y = Cw);
    const E = u.center.slice(), p = Ah(
      a,
      m * h
    ), g = p.slice(), _ = [p.slice()], v = c.getExtent();
    if (i.getWrapX() && c.canWrapX() && !mr(v, e.extent)) {
      const D = ne(v), Y = Math.max(ne(p) / 2, D);
      p[0] = v[0] - Y, p[2] = v[2] + Y, Qm(E, c);
      const P = qm(_[0], c);
      P[0] < v[0] && P[2] < v[2] ? _.push([
        P[0] + D,
        P[1],
        P[2] + D,
        P[3]
      ]) : P[0] > v[0] && P[2] > v[2] && _.push([
        P[0] - D,
        P[1],
        P[2] - D,
        P[3]
      ]);
    }
    if (this.ready && this.renderedResolution_ == h && this.renderedRevision_ == f && this.renderedRenderOrder_ == y && this.renderedFrameDeclutter_ === !!e.declutter && mr(this.wrappedRenderedExtent_, p))
      return hi(this.renderedExtent_, g) || (this.hitDetectionImageData_ = null, this.renderedExtent_ = g), this.renderedCenter_ = E, this.replayGroupChanged = !1, !0;
    this.replayGroup_ = null;
    const x = new dw(
      Q_(h, d),
      p,
      h,
      d
    );
    let C;
    for (let D = 0, Y = _.length; D < Y; ++D)
      i.loadFeatures(_[D], h, c);
    const S = Sg(h, d);
    let w = !0;
    const T = (
      /**
       * @param {import("../../Feature.js").default} feature Feature.
       * @param {number} index Index.
       */
      (D, Y) => {
        let P;
        const K = D.getStyleFunction() || n.getStyleFunction();
        if (K && (P = K(D, h)), P) {
          const I = this.renderFeature(
            D,
            S,
            P,
            x,
            C,
            this.getLayer().getDeclutter(),
            Y
          );
          w = w && !I;
        }
      }
    ), A = n_(p), N = i.getFeaturesInExtent(A);
    y && N.sort(y);
    for (let D = 0, Y = N.length; D < Y; ++D)
      T(N[D], D);
    this.renderedFeatures_ = N, this.ready = w;
    const G = x.finish(), X = new yw(
      p,
      h,
      d,
      i.getOverlaps(),
      G,
      n.getRenderBuffer(),
      !!e.declutter
    );
    return this.renderedResolution_ = h, this.renderedRevision_ = f, this.renderedRenderOrder_ = y, this.renderedFrameDeclutter_ = !!e.declutter, this.renderedExtent_ = g, this.wrappedRenderedExtent_ = p, this.renderedCenter_ = E, this.renderedProjection_ = c, this.renderedPixelRatio_ = d, this.replayGroup_ = X, this.hitDetectionImageData_ = null, this.replayGroupChanged = !0, !0;
  }
  /**
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} squaredTolerance Squared render tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
   * @param {import("../../proj.js").TransformFunction} [transform] Transform from user to view projection.
   * @param {boolean} [declutter] Enable decluttering.
   * @param {number} [index] Render order index.
   * @return {boolean} `true` if an image is loading.
   */
  renderFeature(e, n, i, r, s, o, l) {
    if (!i)
      return !1;
    let a = !1;
    if (Array.isArray(i))
      for (let u = 0, c = i.length; u < c; ++u)
        a = Cg(
          r,
          e,
          i[u],
          n,
          this.boundHandleStyleImageChange_,
          s,
          o,
          l
        ) || a;
    else
      a = Cg(
        r,
        e,
        i,
        n,
        this.boundHandleStyleImageChange_,
        s,
        o,
        l
      );
    return a;
  }
}
class Fw extends O_ {
  /**
   * @param {Options<VectorSourceType, FeatureType>} [options] Options.
   */
  constructor(e) {
    super(e);
  }
  /**
   * @override
   */
  createRenderer() {
    return new Ow(this);
  }
}
const Iu = {
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: "tileloadstart",
  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: "tileloadend",
  /**
   * Triggered if tile loading results in an error. Note that this is not the
   * right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
   * for details.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: "tileloaderror"
};
class e0 extends rn {
  /**
   * @param {Options} options Source options.
   */
  constructor(e) {
    super(), this.projection = Mt(e.projection), this.attributions_ = Rg(e.attributions), this.attributionsCollapsible_ = e.attributionsCollapsible ?? !0, this.loading = !1, this.state_ = e.state !== void 0 ? e.state : "ready", this.wrapX_ = e.wrapX !== void 0 ? e.wrapX : !1, this.interpolate_ = !!e.interpolate, this.viewResolver = null, this.viewRejector = null;
    const n = this;
    this.viewPromise_ = new Promise(function(i, r) {
      n.viewResolver = i, n.viewRejector = r;
    });
  }
  /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */
  getAttributions() {
    return this.attributions_;
  }
  /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  }
  /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default|null} Projection.
   * @api
   */
  getProjection() {
    return this.projection;
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */
  getResolutions(e) {
    return null;
  }
  /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */
  getView() {
    return this.viewPromise_;
  }
  /**
   * Get the state of the source, see {@link import("./Source.js").State} for possible states.
   * @return {import("./Source.js").State} State.
   * @api
   */
  getState() {
    return this.state_;
  }
  /**
   * @return {boolean|undefined} Wrap X.
   */
  getWrapX() {
    return this.wrapX_;
  }
  /**
   * @return {boolean} Use linear interpolation when resampling.
   */
  getInterpolate() {
    return this.interpolate_;
  }
  /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */
  refresh() {
    this.changed();
  }
  /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */
  setAttributions(e) {
    this.attributions_ = Rg(e), this.changed();
  }
  /**
   * Set the state of the source.
   * @param {import("./Source.js").State} state State.
   */
  setState(e) {
    this.state_ = e, this.changed();
  }
}
function Rg(t) {
  return t ? typeof t == "function" ? t : (Array.isArray(t) || (t = [t]), (e) => t) : null;
}
const Qi = [0, 0, 0], Nn = 5;
class t0 {
  /**
   * @param {Options} options Tile grid options.
   */
  constructor(e) {
    this.minZoom = e.minZoom !== void 0 ? e.minZoom : 0, this.resolutions_ = e.resolutions, ee(
      F1(
        this.resolutions_,
        /**
         * @param {number} a First resolution
         * @param {number} b Second resolution
         * @return {number} Comparison result
         */
        (r, s) => s - r
      ),
      "`resolutions` must be sorted in descending order"
    );
    let n;
    if (!e.origins) {
      for (let r = 0, s = this.resolutions_.length - 1; r < s; ++r)
        if (!n)
          n = this.resolutions_[r] / this.resolutions_[r + 1];
        else if (this.resolutions_[r] / this.resolutions_[r + 1] !== n) {
          n = void 0;
          break;
        }
    }
    this.zoomFactor_ = n, this.maxZoom = this.resolutions_.length - 1, this.origin_ = e.origin !== void 0 ? e.origin : null, this.origins_ = null, e.origins !== void 0 && (this.origins_ = e.origins, ee(
      this.origins_.length == this.resolutions_.length,
      "Number of `origins` and `resolutions` must be equal"
    ));
    const i = e.extent;
    i !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = Gi(i)), ee(
      !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
      "Either `origin` or `origins` must be configured, never both"
    ), this.tileSizes_ = null, e.tileSizes !== void 0 && (this.tileSizes_ = e.tileSizes, ee(
      this.tileSizes_.length == this.resolutions_.length,
      "Number of `tileSizes` and `resolutions` must be equal"
    )), this.tileSize_ = e.tileSize !== void 0 ? e.tileSize : this.tileSizes_ ? null : Mh, ee(
      !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
      "Either `tileSize` or `tileSizes` must be configured, never both"
    ), this.extent_ = i !== void 0 ? i : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], this.tmpExtent_ = [0, 0, 0, 0], e.sizes !== void 0 ? this.fullTileRanges_ = e.sizes.map((r, s) => {
      const o = new ld(
        Math.min(0, r[0]),
        Math.max(r[0] - 1, -1),
        Math.min(0, r[1]),
        Math.max(r[1] - 1, -1)
      );
      if (i) {
        const l = this.getTileRangeForExtentAndZ(i, s);
        o.minX = Math.max(l.minX, o.minX), o.maxX = Math.min(l.maxX, o.maxX), o.minY = Math.max(l.minY, o.minY), o.maxY = Math.min(l.maxY, o.maxY);
      }
      return o;
    }) : i && this.calculateTileRanges_(i);
  }
  /**
   * Call a function with each tile coordinate for a given extent and zoom level.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} zoom Integer zoom level.
   * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
   * @api
   */
  forEachTileCoord(e, n, i) {
    const r = this.getTileRangeForExtentAndZ(e, n);
    for (let s = r.minX, o = r.maxX; s <= o; ++s)
      for (let l = r.minY, a = r.maxY; l <= a; ++l)
        i([n, s, l]);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {boolean} Callback succeeded.
   */
  forEachTileCoordParentTileRange(e, n, i, r) {
    let s, o, l, a = null, u = e[0] - 1;
    for (this.zoomFactor_ === 2 ? (o = e[1], l = e[2]) : a = this.getTileCoordExtent(e, r); u >= this.minZoom; ) {
      if (o !== void 0 && l !== void 0 ? (o = Math.floor(o / 2), l = Math.floor(l / 2), s = $i(o, o, l, l, i)) : s = this.getTileRangeForExtentAndZ(
        a,
        u,
        i
      ), n(u, s))
        return !0;
      --u;
    }
    return !1;
  }
  /**
   * Get the extent for this tile grid, if it was configured.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the maximum zoom level for the grid.
   * @return {number} Max zoom.
   * @api
   */
  getMaxZoom() {
    return this.maxZoom;
  }
  /**
   * Get the minimum zoom level for the grid.
   * @return {number} Min zoom.
   * @api
   */
  getMinZoom() {
    return this.minZoom;
  }
  /**
   * Get the origin for the grid at the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {import("../coordinate.js").Coordinate} Origin.
   * @api
   */
  getOrigin(e) {
    return this.origin_ ? this.origin_ : this.origins_[e];
  }
  /**
   * Get the resolution for the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {number} Resolution.
   * @api
   */
  getResolution(e) {
    return this.resolutions_[e];
  }
  /**
   * Get the list of resolutions for the tile grid.
   * @return {Array<number>} Resolutions.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileCoordChildTileRange(e, n, i) {
    if (e[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const s = e[1] * 2, o = e[2] * 2;
        return $i(
          s,
          s + 1,
          o,
          o + 1,
          n
        );
      }
      const r = this.getTileCoordExtent(
        e,
        i || this.tmpExtent_
      );
      return this.getTileRangeForExtentAndZ(
        r,
        e[0] + 1,
        n
      );
    }
    return null;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileRangeForTileCoordAndZ(e, n, i) {
    if (n > this.maxZoom || n < this.minZoom)
      return null;
    const r = e[0], s = e[1], o = e[2];
    if (n === r)
      return $i(
        s,
        o,
        s,
        o,
        i
      );
    if (this.zoomFactor_) {
      const a = Math.pow(this.zoomFactor_, n - r), u = Math.floor(s * a), c = Math.floor(o * a);
      if (n < r)
        return $i(u, u, c, c, i);
      const h = Math.floor(a * (s + 1)) - 1, d = Math.floor(a * (o + 1)) - 1;
      return $i(u, h, c, d, i);
    }
    const l = this.getTileCoordExtent(e, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(l, n, i);
  }
  /**
   * Get a tile range for the given extent and integer zoom level.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
   * @return {import("../TileRange.js").default} Tile range.
   */
  getTileRangeForExtentAndZ(e, n, i) {
    this.getTileCoordForXYAndZ_(e[0], e[3], n, !1, Qi);
    const r = Qi[1], s = Qi[2];
    this.getTileCoordForXYAndZ_(e[2], e[1], n, !0, Qi);
    const o = Qi[1], l = Qi[2];
    return $i(r, o, s, l, i);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {import("../coordinate.js").Coordinate} Tile center.
   */
  getTileCoordCenter(e) {
    const n = this.getOrigin(e[0]), i = this.getResolution(e[0]), r = st(this.getTileSize(e[0]), this.tmpSize_);
    return [
      n[0] + (e[1] + 0.5) * r[0] * i,
      n[1] - (e[2] + 0.5) * r[1] * i
    ];
  }
  /**
   * Get the extent of a tile coordinate.
   *
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getTileCoordExtent(e, n) {
    const i = this.getOrigin(e[0]), r = this.getResolution(e[0]), s = st(this.getTileSize(e[0]), this.tmpSize_), o = i[0] + e[1] * s[0] * r, l = i[1] - (e[2] + 1) * s[1] * r, a = o + s[0] * r, u = l + s[1] * r;
    return oi(o, l, a, u, n);
  }
  /**
   * Get the tile coordinate for the given map coordinate and resolution.  This
   * method considers that coordinates that intersect tile boundaries should be
   * assigned the higher tile coordinate.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndResolution(e, n, i) {
    return this.getTileCoordForXYAndResolution_(
      e[0],
      e[1],
      n,
      !1,
      i
    );
  }
  /**
   * Note that this method should not be called for resolutions that correspond
   * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
   * @param {number} x X.
   * @param {number} y Y.
   * @param {number} resolution Resolution (for a non-integer zoom level).
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndResolution_(e, n, i, r, s) {
    const o = this.getZForResolution(i), l = i / this.getResolution(o), a = this.getOrigin(o), u = st(this.getTileSize(o), this.tmpSize_);
    let c = l * (e - a[0]) / i / u[0], h = l * (a[1] - n) / i / u[1];
    return r ? (c = Vo(c, Nn) - 1, h = Vo(h, Nn) - 1) : (c = Bo(c, Nn), h = Bo(h, Nn)), Hl(o, c, h, s);
  }
  /**
   * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
   * they should have separate implementations.  This method is for integer zoom
   * levels.  The other method should only be called for resolutions corresponding
   * to non-integer zoom levels.
   * @param {number} x Map x coordinate.
   * @param {number} y Map y coordinate.
   * @param {number} z Integer zoom level.
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndZ_(e, n, i, r, s) {
    const o = this.getOrigin(i), l = this.getResolution(i), a = st(this.getTileSize(i), this.tmpSize_);
    let u = (e - o[0]) / l / a[0], c = (o[1] - n) / l / a[1];
    return r ? (u = Vo(u, Nn) - 1, c = Vo(c, Nn) - 1) : (u = Bo(u, Nn), c = Bo(c, Nn)), Hl(i, u, c, s);
  }
  /**
   * Get a tile coordinate given a map coordinate and zoom level.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndZ(e, n, i) {
    return this.getTileCoordForXYAndZ_(
      e[0],
      e[1],
      n,
      !1,
      i
    );
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {number} Tile resolution.
   */
  getTileCoordResolution(e) {
    return this.resolutions_[e[0]];
  }
  /**
   * Get the tile size for a zoom level. The type of the return value matches the
   * `tileSize` or `tileSizes` that the tile grid was configured with. To always
   * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
   * @param {number} z Z.
   * @return {number|import("../size.js").Size} Tile size.
   * @api
   */
  getTileSize(e) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[e];
  }
  /**
   * @param {number} z Zoom level.
   * @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
   */
  getFullTileRange(e) {
    return this.fullTileRanges_ ? this.fullTileRanges_[e] : this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, e) : null;
  }
  /**
   * @param {number} resolution Resolution.
   * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
   *     If 0, the nearest resolution will be used.
   *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
   *     nearest lower resolution (higher Z) will be used. Default is 0.
   *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
   *
   * For example to change tile Z at the midpoint of zoom levels
   * ```js
   * function(value, high, low) {
   *   return value - low * Math.sqrt(high / low);
   * }
   * ```
   * @return {number} Z.
   * @api
   */
  getZForResolution(e, n) {
    const i = Ih(
      this.resolutions_,
      e,
      n || 0
    );
    return Ee(i, this.minZoom, this.maxZoom);
  }
  /**
   * The tile with the provided tile coordinate intersects the given viewport.
   * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
   * @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
   * @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
   */
  tileCoordIntersectsViewport(e, n) {
    return f_(
      n,
      0,
      n.length,
      2,
      this.getTileCoordExtent(e)
    );
  }
  /**
   * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
   * @private
   */
  calculateTileRanges_(e) {
    const n = this.resolutions_.length, i = new Array(n);
    for (let r = this.minZoom; r < n; ++r)
      i[r] = this.getTileRangeForExtentAndZ(e, r);
    this.fullTileRanges_ = i;
  }
}
function n0(t) {
  let e = t.getDefaultTileGrid();
  return e || (e = Ww(t), t.setDefaultTileGrid(e)), e;
}
function Nw(t, e, n) {
  const i = e[0], r = t.getTileCoordCenter(e), s = ad(n);
  if (!Gr(s, r)) {
    const o = ne(s), l = Math.ceil(
      (s[0] - r[0]) / o
    );
    return r[0] += o * l, t.getTileCoordForCoordAndZ(r, i);
  }
  return e;
}
function zw(t, e, n, i) {
  i = i !== void 0 ? i : "top-left";
  const r = i0(t, e, n);
  return new t0({
    extent: t,
    origin: J1(t, i),
    resolutions: r,
    tileSize: n
  });
}
function Gw(t) {
  const e = t || {}, n = e.extent || Mt("EPSG:3857").getExtent(), i = {
    extent: n,
    minZoom: e.minZoom,
    tileSize: e.tileSize,
    resolutions: i0(
      n,
      e.maxZoom,
      e.tileSize,
      e.maxResolution
    )
  };
  return new t0(i);
}
function i0(t, e, n, i) {
  e = e !== void 0 ? e : j1, n = st(n !== void 0 ? n : Mh);
  const r = Be(t), s = ne(t);
  i = i > 0 ? i : Math.max(s / n[0], r / n[1]);
  const o = e + 1, l = new Array(o);
  for (let a = 0; a < o; ++a)
    l[a] = i / Math.pow(2, a);
  return l;
}
function Ww(t, e, n, i) {
  const r = ad(t);
  return zw(r, e, n, i);
}
function ad(t) {
  t = Mt(t);
  let e = t.getExtent();
  if (!e) {
    const n = 180 * Ph.degrees / t.getMetersPerUnit();
    e = oi(-n, -n, n, n);
  }
  return e;
}
class Xw extends e0 {
  /**
   * @param {Options} options SourceTile source options.
   */
  constructor(e) {
    super({
      attributions: e.attributions,
      attributionsCollapsible: e.attributionsCollapsible,
      projection: e.projection,
      state: e.state,
      wrapX: e.wrapX,
      interpolate: e.interpolate
    }), this.on, this.once, this.un, this.tilePixelRatio_ = e.tilePixelRatio !== void 0 ? e.tilePixelRatio : 1, this.tileGrid = e.tileGrid !== void 0 ? e.tileGrid : null;
    const n = [256, 256];
    this.tileGrid && st(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), n), this.tmpSize = [0, 0], this.key_ = e.key || ie(this), this.tileOptions = {
      transition: e.transition,
      interpolate: e.interpolate
    }, this.zDirection = e.zDirection ? e.zDirection : 0;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */
  getGutterForProjection(e) {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */
  getKey() {
    return this.key_;
  }
  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */
  setKey(e) {
    this.key_ !== e && (this.key_ = e, this.changed());
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   * @override
   */
  getResolutions(e) {
    const n = e ? this.getTileGridForProjection(e) : this.tileGrid;
    return n ? n.getResolutions() : null;
  }
  /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {TileType|null} Tile.
   */
  getTile(e, n, i, r, s) {
    return J();
  }
  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
   * @api
   */
  getTileGrid() {
    return this.tileGrid;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */
  getTileGridForProjection(e) {
    return this.tileGrid ? this.tileGrid : n0(e);
  }
  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */
  getTilePixelRatio(e) {
    return this.tilePixelRatio_;
  }
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */
  getTilePixelSize(e, n, i) {
    const r = this.getTileGridForProjection(i), s = this.getTilePixelRatio(n), o = st(r.getTileSize(e), this.tmpSize);
    return s == 1 ? o : $v(o, s, this.tmpSize);
  }
  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */
  getTileCoordForTileUrlFunction(e, n) {
    n = n !== void 0 ? n : this.getProjection();
    const i = this.getTileGridForProjection(n);
    return this.getWrapX() && n.isGlobal() && (e = Nw(i, e, n)), nw(e, i) ? e : null;
  }
  /**
   * Remove all cached reprojected tiles from the source. The next render cycle will create new tiles.
   * @api
   */
  clear() {
  }
  /**
   * @override
   */
  refresh() {
    this.clear(), super.refresh();
  }
}
class jw extends kn {
  /**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */
  constructor(e, n) {
    super(e), this.tile = n;
  }
}
const Yw = /\{z\}/g, Uw = /\{x\}/g, Bw = /\{y\}/g, Vw = /\{-y\}/g;
function Kw(t, e, n, i, r) {
  return t.replace(Yw, e.toString()).replace(Uw, n.toString()).replace(Bw, i.toString()).replace(Vw, function() {
    if (r === void 0)
      throw new Error(
        "If the URL template has a {-y} placeholder, the grid extent must be known"
      );
    return (r - i).toString();
  });
}
function bw(t) {
  const e = [];
  let n = /\{([a-z])-([a-z])\}/.exec(t);
  if (n) {
    const i = n[1].charCodeAt(0), r = n[2].charCodeAt(0);
    let s;
    for (s = i; s <= r; ++s)
      e.push(t.replace(n[0], String.fromCharCode(s)));
    return e;
  }
  if (n = /\{(\d+)-(\d+)\}/.exec(t), n) {
    const i = parseInt(n[2], 10);
    for (let r = parseInt(n[1], 10); r <= i; r++)
      e.push(t.replace(n[0], r.toString()));
    return e;
  }
  return e.push(t), e;
}
function Zw(t, e) {
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(n, i, r) {
      if (!n)
        return;
      let s;
      const o = n[0];
      if (e) {
        const l = e.getFullTileRange(o);
        l && (s = l.getHeight() - 1);
      }
      return Kw(t, o, n[1], n[2], s);
    }
  );
}
function Hw(t, e) {
  const n = t.length, i = new Array(n);
  for (let r = 0; r < n; ++r)
    i[r] = Zw(t[r], e);
  return $w(i);
}
function $w(t) {
  return t.length === 1 ? t[0] : (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(e, n, i) {
      if (!e)
        return;
      const r = ew(e), s = Tr(r, t.length);
      return t[s](e, n, i);
    }
  );
}
class ud extends Xw {
  /**
   * @param {Options} options Image tile options.
   */
  constructor(e) {
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      projection: e.projection,
      state: e.state,
      tileGrid: e.tileGrid,
      tilePixelRatio: e.tilePixelRatio,
      wrapX: e.wrapX,
      transition: e.transition,
      interpolate: e.interpolate,
      key: e.key,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.generateTileUrlFunction_ = this.tileUrlFunction === ud.prototype.tileUrlFunction, this.tileLoadFunction = e.tileLoadFunction, e.tileUrlFunction && (this.tileUrlFunction = e.tileUrlFunction), this.urls = null, e.urls ? this.setUrls(e.urls) : e.url && this.setUrl(e.url), this.tileLoadingKeys_ = {};
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */
  getTileLoadFunction() {
    return this.tileLoadFunction;
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */
  getUrls() {
    return this.urls;
  }
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */
  handleTileChange(e) {
    const n = (
      /** @type {import("../Tile.js").default} */
      e.target
    ), i = ie(n), r = n.getState();
    let s;
    r == F.LOADING ? (this.tileLoadingKeys_[i] = !0, s = Iu.TILELOADSTART) : i in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[i], s = r == F.ERROR ? Iu.TILELOADERROR : r == F.LOADED ? Iu.TILELOADEND : void 0), s != null && this.dispatchEvent(new jw(s, n));
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */
  setTileLoadFunction(e) {
    this.tileLoadFunction = e, this.changed();
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */
  setTileUrlFunction(e, n) {
    this.tileUrlFunction = e, typeof n < "u" ? this.setKey(n) : this.changed();
  }
  /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */
  setUrl(e) {
    const n = bw(e);
    this.urls = n, this.setUrls(n);
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */
  setUrls(e) {
    this.urls = e;
    const n = e.join(`
`);
    this.generateTileUrlFunction_ ? this.setTileUrlFunction(Hw(e, this.tileGrid), n) : this.setKey(n);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */
  tileUrlFunction(e, n, i) {
  }
}
class qw extends ud {
  /**
   * @param {!Options} options Image tile options.
   */
  constructor(e) {
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      projection: e.projection,
      state: e.state,
      tileGrid: e.tileGrid,
      tileLoadFunction: e.tileLoadFunction ? e.tileLoadFunction : Qw,
      tilePixelRatio: e.tilePixelRatio,
      tileUrlFunction: e.tileUrlFunction,
      url: e.url,
      urls: e.urls,
      wrapX: e.wrapX,
      transition: e.transition,
      interpolate: e.interpolate !== void 0 ? e.interpolate : !0,
      key: e.key,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.crossOrigin = e.crossOrigin !== void 0 ? e.crossOrigin : null, this.tileClass = e.tileClass !== void 0 ? e.tileClass : B_, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = e.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   * @override
   */
  getGutterForProjection(e) {
    return this.getProjection() && e && !uu(this.getProjection(), e) ? 0 : this.getGutter();
  }
  /**
   * @return {number} Gutter.
   */
  getGutter() {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @override
   */
  getKey() {
    let e = super.getKey();
    return this.getInterpolate() || (e += ":disable-interpolation"), e;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   * @override
   */
  getTileGridForProjection(e) {
    const n = this.getProjection();
    if (this.tileGrid && (!n || uu(n, e)))
      return this.tileGrid;
    const i = ie(e);
    return i in this.tileGridForProjection || (this.tileGridForProjection[i] = n0(e)), this.tileGridForProjection[i];
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!ImageTile} Tile.
   * @private
   */
  createTile_(e, n, i, r, s, o) {
    const l = [e, n, i], a = this.getTileCoordForTileUrlFunction(
      l,
      s
    ), u = a ? this.tileUrlFunction(a, r, s) : void 0, c = new this.tileClass(
      l,
      u !== void 0 ? F.IDLE : F.EMPTY,
      u !== void 0 ? u : "",
      this.crossOrigin,
      this.tileLoadFunction,
      this.tileOptions
    );
    return c.key = o, c.addEventListener(V.CHANGE, this.handleTileChange.bind(this)), c;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!(ImageTile|ReprojTile)} Tile.
   * @override
   */
  getTile(e, n, i, r, s) {
    const o = this.getProjection();
    if (!o || !s || uu(o, s))
      return this.getTileInternal(
        e,
        n,
        i,
        r,
        o || s
      );
    const l = [e, n, i], a = this.getKey(), u = this.getTileGridForProjection(o), c = this.getTileGridForProjection(s), h = this.getTileCoordForTileUrlFunction(
      l,
      s
    ), d = new Ac(
      o,
      u,
      s,
      c,
      l,
      h,
      this.getTilePixelRatio(r),
      this.getGutter(),
      (f, m, y, E) => this.getTileInternal(f, m, y, E, o),
      this.reprojectionErrorThreshold_,
      this.renderReprojectionEdges_,
      this.tileOptions
    );
    return d.key = a, d;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!ImageTile} Tile.
   * @protected
   */
  getTileInternal(e, n, i, r, s) {
    const o = this.getKey();
    return this.createTile_(e, n, i, r, s, o);
  }
  /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */
  setRenderReprojectionEdges(e) {
    this.renderReprojectionEdges_ != e && (this.renderReprojectionEdges_ = e, this.changed());
  }
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */
  setTileGridForProjection(e, n) {
    const i = Mt(e);
    if (i) {
      const r = ie(i);
      r in this.tileGridForProjection || (this.tileGridForProjection[r] = n);
    }
  }
}
function Qw(t, e) {
  t.getImage().src = e;
}
class Jw extends qw {
  /**
   * @param {Options} [options] XYZ options.
   */
  constructor(e) {
    e = e || {};
    const n = e.projection !== void 0 ? e.projection : "EPSG:3857", i = e.tileGrid !== void 0 ? e.tileGrid : Gw({
      extent: ad(n),
      maxResolution: e.maxResolution,
      maxZoom: e.maxZoom,
      minZoom: e.minZoom,
      tileSize: e.tileSize
    });
    super({
      attributions: e.attributions,
      cacheSize: e.cacheSize,
      crossOrigin: e.crossOrigin,
      interpolate: e.interpolate,
      projection: n,
      reprojectionErrorThreshold: e.reprojectionErrorThreshold,
      tileGrid: i,
      tileLoadFunction: e.tileLoadFunction,
      tilePixelRatio: e.tilePixelRatio,
      tileUrlFunction: e.tileUrlFunction,
      url: e.url,
      urls: e.urls,
      wrapX: e.wrapX !== void 0 ? e.wrapX : !0,
      transition: e.transition,
      attributionsCollapsible: e.attributionsCollapsible,
      zDirection: e.zDirection
    }), this.gutter_ = e.gutter !== void 0 ? e.gutter : 0;
  }
  /**
   * @return {number} Gutter.
   * @override
   */
  getGutter() {
    return this.gutter_;
  }
}
class Tg {
  /**
   * @param {number} [maxEntries] Max entries.
   */
  constructor(e) {
    this.rbush_ = new p_(e), this.items_ = {};
  }
  /**
   * Insert a value into the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */
  insert(e, n) {
    const i = {
      minX: e[0],
      minY: e[1],
      maxX: e[2],
      maxY: e[3],
      value: n
    };
    this.rbush_.insert(i), this.items_[ie(n)] = i;
  }
  /**
   * Bulk-insert values into the RBush.
   * @param {Array<import("../extent.js").Extent>} extents Extents.
   * @param {Array<T>} values Values.
   */
  load(e, n) {
    const i = new Array(n.length);
    for (let r = 0, s = n.length; r < s; r++) {
      const o = e[r], l = n[r], a = {
        minX: o[0],
        minY: o[1],
        maxX: o[2],
        maxY: o[3],
        value: l
      };
      i[r] = a, this.items_[ie(l)] = a;
    }
    this.rbush_.load(i);
  }
  /**
   * Remove a value from the RBush.
   * @param {T} value Value.
   * @return {boolean} Removed.
   */
  remove(e) {
    const n = ie(e), i = this.items_[n];
    return delete this.items_[n], this.rbush_.remove(i) !== null;
  }
  /**
   * Update the extent of a value in the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */
  update(e, n) {
    const i = this.items_[ie(n)], r = [i.minX, i.minY, i.maxX, i.maxY];
    $s(r, e) || (this.remove(n), this.insert(e, n));
  }
  /**
   * Return all values in the RBush.
   * @return {Array<T>} All.
   */
  getAll() {
    return this.rbush_.all().map(function(n) {
      return n.value;
    });
  }
  /**
   * Return all values in the given extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<T>} All in extent.
   */
  getInExtent(e) {
    const n = {
      minX: e[0],
      minY: e[1],
      maxX: e[2],
      maxY: e[3]
    };
    return this.rbush_.search(n).map(function(r) {
      return r.value;
    });
  }
  /**
   * Calls a callback function with each value in the tree.
   * If the callback returns a truthy value, this value is returned without
   * checking the rest of the tree.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */
  forEach(e) {
    return this.forEach_(this.getAll(), e);
  }
  /**
   * Calls a callback function with each value in the provided extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */
  forEachInExtent(e, n) {
    return this.forEach_(this.getInExtent(e), n);
  }
  /**
   * @param {Array<T>} values Values.
   * @param {function(T): *} callback Callback.
   * @private
   * @return {*} Callback return value.
   */
  forEach_(e, n) {
    let i;
    for (let r = 0, s = e.length; r < s; r++)
      if (i = n(e[r]), i)
        return i;
    return i;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return zr(this.items_);
  }
  /**
   * Remove all values from the RBush.
   */
  clear() {
    this.rbush_.clear(), this.items_ = {};
  }
  /**
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} Extent.
   */
  getExtent(e) {
    const n = this.rbush_.toJSON();
    return oi(n.minX, n.minY, n.maxX, n.maxY, e);
  }
  /**
   * @param {RBush<T>} rbush R-Tree.
   */
  concat(e) {
    this.rbush_.load(e.rbush_.all());
    for (const n in e.items_)
      this.items_[n] = e.items_[n];
  }
}
class cd extends rn {
  /**
   * @param {Geometry|ObjectWithGeometry<Geometry>} [geometryOrProperties]
   *     You may pass a Geometry object directly, or an object literal containing
   *     properties. If you pass an object literal, you may include a Geometry
   *     associated with a `geometry` key.
   */
  constructor(e) {
    if (super(), this.on, this.once, this.un, this.id_ = void 0, this.geometryName_ = "geometry", this.style_ = null, this.styleFunction_ = void 0, this.geometryChangeKey_ = null, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), e)
      if (typeof /** @type {?} */
      e.getSimplifiedGeometry == "function") {
        const n = (
          /** @type {Geometry} */
          e
        );
        this.setGeometry(n);
      } else {
        const n = e;
        this.setProperties(n);
      }
  }
  /**
   * Clone this feature. If the original feature has a geometry it
   * is also cloned. The feature id is not set in the clone.
   * @return {Feature<Geometry>} The clone.
   * @api
   */
  clone() {
    const e = (
      /** @type {Feature<Geometry>} */
      new cd(this.hasProperties() ? this.getProperties() : null)
    );
    e.setGeometryName(this.getGeometryName());
    const n = this.getGeometry();
    n && e.setGeometry(
      /** @type {Geometry} */
      n.clone()
    );
    const i = this.getStyle();
    return i && e.setStyle(i), e;
  }
  /**
   * Get the feature's default geometry.  A feature may have any number of named
   * geometries.  The "default" geometry (the one that is rendered by default) is
   * set when calling {@link module:ol/Feature~Feature#setGeometry}.
   * @return {Geometry|undefined} The default geometry for the feature.
   * @api
   * @observable
   */
  getGeometry() {
    return (
      /** @type {Geometry|undefined} */
      this.get(this.geometryName_)
    );
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is either set when reading data from a remote source or set explicitly by
   * calling {@link module:ol/Feature~Feature#setId}.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * Get the name of the feature's default geometry.  By default, the default
   * geometry is named `geometry`.
   * @return {string} Get the property name associated with the default geometry
   *     for this feature.
   * @api
   */
  getGeometryName() {
    return this.geometryName_;
  }
  /**
   * Get the feature's style. Will return what was provided to the
   * {@link module:ol/Feature~Feature#setStyle} method.
   * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Get the feature's style function.
   * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
   * representing the current style of this feature.
   * @api
   */
  getStyleFunction() {
    return this.styleFunction_;
  }
  /**
   * @private
   */
  handleGeometryChange_() {
    this.changed();
  }
  /**
   * @private
   */
  handleGeometryChanged_() {
    this.geometryChangeKey_ && (le(this.geometryChangeKey_), this.geometryChangeKey_ = null);
    const e = this.getGeometry();
    e && (this.geometryChangeKey_ = q(
      e,
      V.CHANGE,
      this.handleGeometryChange_,
      this
    )), this.changed();
  }
  /**
   * Set the default geometry for the feature.  This will update the property
   * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
   * @param {Geometry|undefined} geometry The new geometry.
   * @api
   * @observable
   */
  setGeometry(e) {
    this.set(this.geometryName_, e);
  }
  /**
   * Set the style for the feature to override the layer style.  This can be a
   * single style object, an array of styles, or a function that takes a
   * resolution and returns an array of styles. To unset the feature style, call
   * `setStyle()` without arguments or a falsey value.
   * @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */
  setStyle(e) {
    this.style_ = e, this.styleFunction_ = e ? eS(e) : void 0, this.changed();
  }
  /**
   * Set the feature id.  The feature id is considered stable and may be used when
   * requesting features or comparing identifiers returned from a remote source.
   * The feature id can be used with the
   * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
   * @param {number|string|undefined} id The feature id.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */
  setId(e) {
    this.id_ = e, this.changed();
  }
  /**
   * Set the property name to be used when getting the feature's default geometry.
   * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
   * this name will be returned.
   * @param {string} name The property name of the default geometry.
   * @api
   */
  setGeometryName(e) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_), this.geometryName_ = e, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), this.handleGeometryChanged_();
  }
}
function eS(t) {
  if (typeof t == "function")
    return t;
  let e;
  return Array.isArray(t) ? e = t : (ee(
    typeof /** @type {?} */
    t.getZIndex == "function",
    "Expected an `ol/style/Style` or an array of `ol/style/Style.js`"
  ), e = [
    /** @type {import("./style/Style.js").default} */
    t
  ]), function() {
    return e;
  };
}
function Ig(t, e, n, i, r, s, o) {
  let l, a;
  const u = (n - e) / i;
  if (u === 1)
    l = e;
  else if (u === 2)
    l = e, a = r;
  else if (u !== 0) {
    let c = t[e], h = t[e + 1], d = 0;
    const f = [0];
    for (let E = e + i; E < n; E += i) {
      const p = t[E], g = t[E + 1];
      d += Math.sqrt((p - c) * (p - c) + (g - h) * (g - h)), f.push(d), c = p, h = g;
    }
    const m = r * d, y = D1(f, m);
    y < 0 ? (a = (m - f[-y - 2]) / (f[-y - 1] - f[-y - 2]), l = e + (-y - 2) * i) : l = e + y * i;
  }
  o = o > 1 ? o : 2, s = s || new Array(o);
  for (let c = 0; c < o; ++c)
    s[c] = l === void 0 ? NaN : a === void 0 ? t[l + c] : St(t[l + c], t[l + i + c], a);
  return s;
}
function tS(t, e, n, i) {
  const r = [];
  let s = kt();
  for (let o = 0, l = n.length; o < l; ++o) {
    const a = n[o];
    s = Dh(
      t,
      e,
      a[0],
      i
    ), r.push((s[0] + s[2]) / 2, (s[1] + s[3]) / 2), e = a[a.length - 1];
  }
  return r;
}
const Lg = jt();
class Nt {
  /**
   * @param {Type} type Geometry type.
   * @param {Array<number>} flatCoordinates Flat coordinates. These always need
   *     to be right-handed for polygons.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Object<string, *>} properties Properties.
   * @param {number|string|undefined} id Feature id.
   */
  constructor(e, n, i, r, s, o) {
    this.styleFunction, this.extent_, this.id_ = o, this.type_ = e, this.flatCoordinates_ = n, this.flatInteriorPoints_ = null, this.flatMidpoints_ = null, this.ends_ = i || null, this.properties_ = s, this.squaredTolerance_, this.stride_ = r, this.simplifiedGeometry_;
  }
  /**
   * Get a feature property by its key.
   * @param {string} key Key
   * @return {*} Value for the requested key.
   * @api
   */
  get(e) {
    return this.properties_[e];
  }
  /**
   * Get the extent of this feature's geometry.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_ || (this.extent_ = this.type_ === "Point" ? Zm(this.flatCoordinates_) : Dh(
      this.flatCoordinates_,
      0,
      this.flatCoordinates_.length,
      2
    )), this.extent_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoint() {
    if (!this.flatInteriorPoints_) {
      const e = Oi(this.getExtent());
      this.flatInteriorPoints_ = Vh(
        this.flatCoordinates_,
        0,
        this.ends_,
        2,
        e,
        0
      );
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoints() {
    if (!this.flatInteriorPoints_) {
      const e = Wv(this.flatCoordinates_, this.ends_), n = tS(this.flatCoordinates_, 0, e, 2);
      this.flatInteriorPoints_ = Ov(
        this.flatCoordinates_,
        0,
        e,
        2,
        n
      );
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat midpoint.
   */
  getFlatMidpoint() {
    return this.flatMidpoints_ || (this.flatMidpoints_ = Ig(
      this.flatCoordinates_,
      0,
      this.flatCoordinates_.length,
      2,
      0.5
    )), this.flatMidpoints_;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = [];
      const e = this.flatCoordinates_;
      let n = 0;
      const i = (
        /** @type {Array<number>} */
        this.ends_
      );
      for (let r = 0, s = i.length; r < s; ++r) {
        const o = i[r], l = Ig(e, n, o, 2, 0.5);
        Lh(this.flatMidpoints_, l), n = o;
      }
    }
    return this.flatMidpoints_;
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is set when reading data from a remote source.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getOrientedFlatCoordinates() {
    return this.flatCoordinates_;
  }
  /**
   * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
   * determining the geometry type in style function (see {@link #getType}).
   * @return {RenderFeature} Feature.
   * @api
   */
  getGeometry() {
    return this;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {RenderFeature} Simplified geometry.
   */
  getSimplifiedGeometry(e) {
    return this;
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {RenderFeature} Simplified geometry.
   */
  simplifyTransformed(e, n) {
    return this;
  }
  /**
   * Get the feature properties.
   * @return {Object<string, *>} Feature properties.
   * @api
   */
  getProperties() {
    return this.properties_;
  }
  /**
   * Get an object of all property names and values.  This has the same behavior as getProperties,
   * but is here to conform with the {@link module:ol/Feature~Feature} interface.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.properties_;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride_;
  }
  /**
   * @return {import('../style/Style.js').StyleFunction|undefined} Style
   */
  getStyleFunction() {
    return this.styleFunction;
  }
  /**
   * Get the type of this feature's geometry.
   * @return {Type} Geometry type.
   * @api
   */
  getType() {
    return this.type_;
  }
  /**
   * Transform geometry coordinates from tile pixel space to projected.
   *
   * @param {import("../proj.js").ProjectionLike} projection The data projection
   */
  transform(e) {
    e = Mt(e);
    const n = e.getExtent(), i = e.getWorldExtent();
    if (n && i) {
      const r = Be(i) / Be(n);
      In(
        Lg,
        i[0],
        i[3],
        r,
        -r,
        0,
        0,
        0
      ), ii(
        this.flatCoordinates_,
        0,
        this.flatCoordinates_.length,
        2,
        Lg,
        this.flatCoordinates_
      );
    }
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   */
  applyTransform(e) {
    e(this.flatCoordinates_, this.flatCoordinates_, this.stride_);
  }
  /**
   * @return {RenderFeature} A cloned render feature.
   */
  clone() {
    var e;
    return new Nt(
      this.type_,
      this.flatCoordinates_.slice(),
      (e = this.ends_) == null ? void 0 : e.slice(),
      this.stride_,
      Object.assign({}, this.properties_),
      this.id_
    );
  }
  /**
   * @return {Array<number>|null} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * Add transform and resolution based geometry simplification to this instance.
   * @return {RenderFeature} This render feature.
   */
  enableSimplifyTransformed() {
    return this.simplifyTransformed = Ym((e, n) => {
      if (e === this.squaredTolerance_)
        return this.simplifiedGeometry_;
      this.simplifiedGeometry_ = this.clone(), n && this.simplifiedGeometry_.applyTransform(n);
      const i = this.simplifiedGeometry_.getFlatCoordinates();
      let r;
      switch (this.type_) {
        case "LineString":
          i.length = Bh(
            i,
            0,
            this.simplifiedGeometry_.flatCoordinates_.length,
            this.simplifiedGeometry_.stride_,
            e,
            i,
            0
          ), r = [i.length];
          break;
        case "MultiLineString":
          r = [], i.length = Mv(
            i,
            0,
            this.simplifiedGeometry_.ends_,
            this.simplifiedGeometry_.stride_,
            e,
            i,
            0,
            r
          );
          break;
        case "Polygon":
          r = [], i.length = u_(
            i,
            0,
            this.simplifiedGeometry_.ends_,
            this.simplifiedGeometry_.stride_,
            Math.sqrt(e),
            i,
            0,
            r
          );
          break;
      }
      return r && (this.simplifiedGeometry_ = new Nt(
        this.type_,
        i,
        r,
        2,
        this.properties_,
        this.id_
      )), this.squaredTolerance_ = e, this.simplifiedGeometry_;
    }), this;
  }
}
Nt.prototype.getFlatCoordinates = Nt.prototype.getOrientedFlatCoordinates;
const Et = {
  /**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */
  ADDFEATURE: "addfeature",
  /**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */
  CHANGEFEATURE: "changefeature",
  /**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */
  CLEAR: "clear",
  /**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector~VectorSource#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */
  REMOVEFEATURE: "removefeature",
  /**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */
  FEATURESLOADSTART: "featuresloadstart",
  /**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */
  FEATURESLOADEND: "featuresloadend",
  /**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */
  FEATURESLOADERROR: "featuresloaderror"
};
function nS(t, e) {
  return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]];
}
let iS = !1;
function rS(t, e, n, i, r, s, o) {
  const l = new XMLHttpRequest();
  l.open(
    "GET",
    typeof t == "function" ? t(n, i, r) : t,
    !0
  ), e.getType() == "arraybuffer" && (l.responseType = "arraybuffer"), l.withCredentials = iS, l.onload = function(a) {
    if (!l.status || l.status >= 200 && l.status < 300) {
      const u = e.getType();
      try {
        let c;
        u == "text" || u == "json" ? c = l.responseText : u == "xml" ? c = l.responseXML || l.responseText : u == "arraybuffer" && (c = /** @type {ArrayBuffer} */
        l.response), c ? s(
          /** @type {Array<FeatureType>} */
          e.readFeatures(c, {
            extent: n,
            featureProjection: r
          }),
          e.readProjection(c)
        ) : o();
      } catch {
        o();
      }
    } else
      o();
  }, l.onerror = o, l.send();
}
function kg(t, e) {
  return function(n, i, r, s, o) {
    const l = (
      /** @type {import("./source/Vector").default<FeatureType>} */
      this
    );
    rS(
      t,
      e,
      n,
      i,
      r,
      /**
       * @param {Array<FeatureType>} features The loaded features.
       * @param {import("./proj/Projection.js").default} dataProjection Data
       * projection.
       */
      function(a, u) {
        l.addFeatures(a), s !== void 0 && s(a);
      },
      /* FIXME handle error */
      o || Nr
    );
  };
}
class zn extends kn {
  /**
   * @param {string} type Type.
   * @param {FeatureType} [feature] Feature.
   * @param {Array<FeatureType>} [features] Features.
   */
  constructor(e, n, i) {
    super(e), this.feature = n, this.features = i;
  }
}
class sS extends e0 {
  /**
   * @param {Options<FeatureType>} [options] Vector source options.
   */
  constructor(e) {
    e = e || {}, super({
      attributions: e.attributions,
      interpolate: !0,
      projection: void 0,
      state: "ready",
      wrapX: e.wrapX !== void 0 ? e.wrapX : !0
    }), this.on, this.once, this.un, this.loader_ = Nr, this.format_ = e.format || null, this.overlaps_ = e.overlaps === void 0 ? !0 : e.overlaps, this.url_ = e.url, e.loader !== void 0 ? this.loader_ = e.loader : this.url_ !== void 0 && (ee(this.format_, "`format` must be set when `url` is set"), this.loader_ = kg(this.url_, this.format_)), this.strategy_ = e.strategy !== void 0 ? e.strategy : nS;
    const n = e.useSpatialIndex !== void 0 ? e.useSpatialIndex : !0;
    this.featuresRtree_ = n ? new Tg() : null, this.loadedExtentsRtree_ = new Tg(), this.loadingExtentsCount_ = 0, this.nullGeometryFeatures_ = {}, this.idIndex_ = {}, this.uidIndex_ = {}, this.featureChangeKeys_ = {}, this.featuresCollection_ = null;
    let i, r;
    Array.isArray(e.features) ? r = e.features : e.features && (i = e.features, r = i.getArray()), !n && i === void 0 && (i = new Qt(r)), r !== void 0 && this.addFeaturesInternal(r), i !== void 0 && this.bindFeaturesCollection_(i);
  }
  /**
   * Add a single feature to the source.  If you want to add a batch of features
   * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
   * instead. A feature will not be added to the source if feature with
   * the same id is already there. The reason for this behavior is to avoid
   * feature duplication when using bbox or tile loading strategies.
   * Note: this also applies if a {@link module:ol/Collection~Collection} is used for features,
   * meaning that if a feature with a duplicate id is added in the collection, it will
   * be removed from it right away.
   * @param {FeatureType} feature Feature to add.
   * @api
   */
  addFeature(e) {
    this.addFeatureInternal(e), this.changed();
  }
  /**
   * Add a feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @protected
   */
  addFeatureInternal(e) {
    const n = ie(e);
    if (!this.addToIndex_(n, e)) {
      this.featuresCollection_ && this.featuresCollection_.remove(e);
      return;
    }
    this.setupChangeEvents_(n, e);
    const i = e.getGeometry();
    if (i) {
      const r = i.getExtent();
      this.featuresRtree_ && this.featuresRtree_.insert(r, e);
    } else
      this.nullGeometryFeatures_[n] = e;
    this.dispatchEvent(
      new zn(Et.ADDFEATURE, e)
    );
  }
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @private
   */
  setupChangeEvents_(e, n) {
    n instanceof Nt || (this.featureChangeKeys_[e] = [
      q(n, V.CHANGE, this.handleFeatureChange_, this),
      q(
        n,
        Fr.PROPERTYCHANGE,
        this.handleFeatureChange_,
        this
      )
    ]);
  }
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @return {boolean} The feature is "valid", in the sense that it is also a
   *     candidate for insertion into the Rtree.
   * @private
   */
  addToIndex_(e, n) {
    let i = !0;
    if (n.getId() !== void 0) {
      const r = String(n.getId());
      if (!(r in this.idIndex_))
        this.idIndex_[r] = n;
      else if (n instanceof Nt) {
        const s = this.idIndex_[r];
        s instanceof Nt ? Array.isArray(s) ? s.push(n) : this.idIndex_[r] = [s, n] : i = !1;
      } else
        i = !1;
    }
    return i && (ee(
      !(e in this.uidIndex_),
      "The passed `feature` was already added to the source"
    ), this.uidIndex_[e] = n), i;
  }
  /**
   * Add a batch of features to the source.
   * @param {Array<FeatureType>} features Features to add.
   * @api
   */
  addFeatures(e) {
    this.addFeaturesInternal(e), this.changed();
  }
  /**
   * Add features without firing a `change` event.
   * @param {Array<FeatureType>} features Features.
   * @protected
   */
  addFeaturesInternal(e) {
    const n = [], i = [], r = [];
    for (let s = 0, o = e.length; s < o; s++) {
      const l = e[s], a = ie(l);
      this.addToIndex_(a, l) && i.push(l);
    }
    for (let s = 0, o = i.length; s < o; s++) {
      const l = i[s], a = ie(l);
      this.setupChangeEvents_(a, l);
      const u = l.getGeometry();
      if (u) {
        const c = u.getExtent();
        n.push(c), r.push(l);
      } else
        this.nullGeometryFeatures_[a] = l;
    }
    if (this.featuresRtree_ && this.featuresRtree_.load(n, r), this.hasListener(Et.ADDFEATURE))
      for (let s = 0, o = i.length; s < o; s++)
        this.dispatchEvent(
          new zn(Et.ADDFEATURE, i[s])
        );
  }
  /**
   * @param {!Collection<FeatureType>} collection Collection.
   * @private
   */
  bindFeaturesCollection_(e) {
    let n = !1;
    this.addEventListener(
      Et.ADDFEATURE,
      /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */
      function(i) {
        n || (n = !0, e.push(i.feature), n = !1);
      }
    ), this.addEventListener(
      Et.REMOVEFEATURE,
      /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */
      function(i) {
        n || (n = !0, e.remove(i.feature), n = !1);
      }
    ), e.addEventListener(
      Je.ADD,
      /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */
      (i) => {
        n || (n = !0, this.addFeature(i.element), n = !1);
      }
    ), e.addEventListener(
      Je.REMOVE,
      /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */
      (i) => {
        n || (n = !0, this.removeFeature(i.element), n = !1);
      }
    ), this.featuresCollection_ = e;
  }
  /**
   * Remove all features from the source.
   * @param {boolean} [fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature} events.
   * @api
   */
  clear(e) {
    if (e) {
      for (const i in this.featureChangeKeys_)
        this.featureChangeKeys_[i].forEach(le);
      this.featuresCollection_ || (this.featureChangeKeys_ = {}, this.idIndex_ = {}, this.uidIndex_ = {});
    } else if (this.featuresRtree_) {
      const i = (r) => {
        this.removeFeatureInternal(r);
      };
      this.featuresRtree_.forEach(i);
      for (const r in this.nullGeometryFeatures_)
        this.removeFeatureInternal(this.nullGeometryFeatures_[r]);
    }
    this.featuresCollection_ && this.featuresCollection_.clear(), this.featuresRtree_ && this.featuresRtree_.clear(), this.nullGeometryFeatures_ = {};
    const n = new zn(Et.CLEAR);
    this.dispatchEvent(n), this.changed();
  }
  /**
   * Iterate through all features on the source, calling the provided callback
   * with each one.  If the callback returns any "truthy" value, iteration will
   * stop and the function will return the same value.
   * Note: this function only iterate through the feature that have a defined geometry.
   *
   * @param {function(FeatureType): T} callback Called with each feature
   *     on the source.  Return a truthy value to stop iteration.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeature(e) {
    if (this.featuresRtree_)
      return this.featuresRtree_.forEach(e);
    this.featuresCollection_ && this.featuresCollection_.forEach(e);
  }
  /**
   * Iterate through all features whose geometries contain the provided
   * coordinate, calling the callback with each feature.  If the callback returns
   * a "truthy" value, iteration will stop and the function will return the same
   * value.
   *
   * For {@link module:ol/render/Feature~RenderFeature} features, the callback will be
   * called for all features.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose goemetry contains the provided coordinate.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   */
  forEachFeatureAtCoordinateDirect(e, n) {
    const i = [e[0], e[1], e[0], e[1]];
    return this.forEachFeatureInExtent(i, function(r) {
      const s = r.getGeometry();
      if (s instanceof Nt || s.intersectsCoordinate(e))
        return n(r);
    });
  }
  /**
   * Iterate through all features whose bounding box intersects the provided
   * extent (note that the feature's geometry may not intersect the extent),
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you are interested in features whose geometry intersects an extent, call
   * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
   *
   * When `useSpatialIndex` is set to false, this method will loop through all
   * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose bounding box intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeatureInExtent(e, n) {
    if (this.featuresRtree_)
      return this.featuresRtree_.forEachInExtent(e, n);
    this.featuresCollection_ && this.featuresCollection_.forEach(n);
  }
  /**
   * Iterate through all features whose geometry intersects the provided extent,
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you only want to test for bounding box intersection, call the
   * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose geometry intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeatureIntersectingExtent(e, n) {
    return this.forEachFeatureInExtent(
      e,
      /**
       * @param {FeatureType} feature Feature.
       * @return {T|undefined} The return value from the last call to the callback.
       */
      function(i) {
        const r = i.getGeometry();
        if (r instanceof Nt || r.intersectsExtent(e)) {
          const s = n(i);
          if (s)
            return s;
        }
      }
    );
  }
  /**
   * Get the features collection associated with this source. Will be `null`
   * unless the source was configured with `useSpatialIndex` set to `false`, or
   * with a {@link module:ol/Collection~Collection} as `features`.
   * @return {Collection<FeatureType>|null} The collection of features.
   * @api
   */
  getFeaturesCollection() {
    return this.featuresCollection_;
  }
  /**
   * Get a snapshot of the features currently on the source in random order. The returned array
   * is a copy, the features are references to the features in the source.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeatures() {
    let e;
    return this.featuresCollection_ ? e = this.featuresCollection_.getArray().slice(0) : this.featuresRtree_ && (e = this.featuresRtree_.getAll(), zr(this.nullGeometryFeatures_) || Lh(e, Object.values(this.nullGeometryFeatures_))), e;
  }
  /**
   * Get all features whose geometry intersects the provided coordinate.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {Array<import("../Feature.js").default>} Features.
   * @api
   */
  getFeaturesAtCoordinate(e) {
    const n = [];
    return this.forEachFeatureAtCoordinateDirect(e, function(i) {
      n.push(i);
    }), n;
  }
  /**
   * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
   * all features intersecting the given extent in random order (so it may include
   * features whose geometries do not intersect the extent).
   *
   * When `useSpatialIndex` is set to false, this method will return all
   * features.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../proj/Projection.js").default} [projection] Include features
   * where `extent` exceeds the x-axis bounds of `projection` and wraps around the world.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeaturesInExtent(e, n) {
    if (this.featuresRtree_) {
      if (!(n && n.canWrapX() && this.getWrapX()))
        return this.featuresRtree_.getInExtent(e);
      const r = Oh(e, n);
      return [].concat(
        ...r.map((s) => this.featuresRtree_.getInExtent(s))
      );
    }
    return this.featuresCollection_ ? this.featuresCollection_.getArray().slice(0) : [];
  }
  /**
   * Get the closest feature to the provided coordinate.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false` and the features in this source are of type
   * {@link module:ol/Feature~Feature}.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType):boolean} [filter] Feature filter function.
   *     The filter function will receive one argument, the {@link module:ol/Feature~Feature feature}
   *     and it should return a boolean value. By default, no filtering is made.
   * @return {FeatureType} Closest feature.
   * @api
   */
  getClosestFeatureToCoordinate(e, n) {
    const i = e[0], r = e[1];
    let s = null;
    const o = [NaN, NaN];
    let l = 1 / 0;
    const a = [-1 / 0, -1 / 0, 1 / 0, 1 / 0];
    return n = n || Hs, this.featuresRtree_.forEachInExtent(
      a,
      /**
       * @param {FeatureType} feature Feature.
       */
      function(u) {
        if (n(u)) {
          const c = u.getGeometry(), h = l;
          if (l = c instanceof Nt ? 0 : c.closestPointXY(i, r, o, l), l < h) {
            s = u;
            const d = Math.sqrt(l);
            a[0] = i - d, a[1] = r - d, a[2] = i + d, a[3] = r + d;
          }
        }
      }
    ), s;
  }
  /**
   * Get the extent of the features currently in the source.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../extent.js").Extent} [extent] Destination extent. If provided, no new extent
   *     will be created. Instead, that extent's coordinates will be overwritten.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent(e) {
    return this.featuresRtree_.getExtent(e);
  }
  /**
   * Get a feature by its identifier (the value returned by feature.getId()). When `RenderFeature`s
   * are used, `getFeatureById()` can return an array of `RenderFeature`s. This allows for handling
   * of `GeometryCollection` geometries, where format readers create one `RenderFeature` per
   * `GeometryCollection` member.
   * Note that the index treats string and numeric identifiers as the same.  So
   * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
   *
   * @param {string|number} id Feature identifier.
   * @return {FeatureClassOrArrayOfRenderFeatures<FeatureType>|null} The feature (or `null` if not found).
   * @api
   */
  getFeatureById(e) {
    const n = this.idIndex_[e.toString()];
    return n !== void 0 ? (
      /** @type {FeatureClassOrArrayOfRenderFeatures<FeatureType>} */
      n
    ) : null;
  }
  /**
   * Get a feature by its internal unique identifier (using `getUid`).
   *
   * @param {string} uid Feature identifier.
   * @return {FeatureType|null} The feature (or `null` if not found).
   */
  getFeatureByUid(e) {
    const n = this.uidIndex_[e];
    return n !== void 0 ? n : null;
  }
  /**
   * Get the format associated with this source.
   *
   * @return {import("../format/Feature.js").default<FeatureType>|null}} The feature format.
   * @api
   */
  getFormat() {
    return this.format_;
  }
  /**
   * @return {boolean} The source can have overlapping geometries.
   */
  getOverlaps() {
    return this.overlaps_;
  }
  /**
   * Get the url associated with this source.
   *
   * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
   * @api
   */
  getUrl() {
    return this.url_;
  }
  /**
   * @param {Event} event Event.
   * @private
   */
  handleFeatureChange_(e) {
    const n = (
      /** @type {FeatureType} */
      e.target
    ), i = ie(n), r = n.getGeometry();
    if (!r)
      i in this.nullGeometryFeatures_ || (this.featuresRtree_ && this.featuresRtree_.remove(n), this.nullGeometryFeatures_[i] = n);
    else {
      const o = r.getExtent();
      i in this.nullGeometryFeatures_ ? (delete this.nullGeometryFeatures_[i], this.featuresRtree_ && this.featuresRtree_.insert(o, n)) : this.featuresRtree_ && this.featuresRtree_.update(o, n);
    }
    const s = n.getId();
    if (s !== void 0) {
      const o = s.toString();
      this.idIndex_[o] !== n && (this.removeFromIdIndex_(n), this.idIndex_[o] = n);
    } else
      this.removeFromIdIndex_(n), this.uidIndex_[i] = n;
    this.changed(), this.dispatchEvent(
      new zn(Et.CHANGEFEATURE, n)
    );
  }
  /**
   * Returns true if the feature is contained within the source.
   * @param {FeatureType} feature Feature.
   * @return {boolean} Has feature.
   * @api
   */
  hasFeature(e) {
    const n = e.getId();
    return n !== void 0 ? n in this.idIndex_ : ie(e) in this.uidIndex_;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return this.featuresRtree_ ? this.featuresRtree_.isEmpty() && zr(this.nullGeometryFeatures_) : this.featuresCollection_ ? this.featuresCollection_.getLength() === 0 : !0;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  loadFeatures(e, n, i) {
    const r = this.loadedExtentsRtree_, s = this.strategy_(e, n, i);
    for (let o = 0, l = s.length; o < l; ++o) {
      const a = s[o];
      r.forEachInExtent(
        a,
        /**
         * @param {{extent: import("../extent.js").Extent}} object Object.
         * @return {boolean} Contains.
         */
        function(c) {
          return mr(c.extent, a);
        }
      ) || (++this.loadingExtentsCount_, this.dispatchEvent(
        new zn(Et.FEATURESLOADSTART)
      ), this.loader_.call(
        this,
        a,
        n,
        i,
        (c) => {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new zn(
              Et.FEATURESLOADEND,
              void 0,
              c
            )
          );
        },
        () => {
          --this.loadingExtentsCount_, this.dispatchEvent(
            new zn(Et.FEATURESLOADERROR)
          );
        }
      ), r.insert(a, { extent: a.slice() }));
    }
    this.loading = this.loader_.length < 4 ? !1 : this.loadingExtentsCount_ > 0;
  }
  /**
   * @override
   */
  refresh() {
    this.clear(!0), this.loadedExtentsRtree_.clear(), super.refresh();
  }
  /**
   * Remove an extent from the list of loaded extents.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  removeLoadedExtent(e) {
    const n = this.loadedExtentsRtree_;
    let i;
    n.forEachInExtent(e, function(r) {
      if ($s(r.extent, e))
        return i = r, !0;
    }), i && n.remove(i);
  }
  /**
   * Batch remove features from the source.  If you want to remove all features
   * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
   * instead.
   * @param {Array<FeatureType>} features Features to remove.
   * @api
   */
  removeFeatures(e) {
    let n = !1;
    for (let i = 0, r = e.length; i < r; ++i)
      n = this.removeFeatureInternal(e[i]) || n;
    n && this.changed();
  }
  /**
   * Remove a single feature from the source. If you want to batch remove
   * features, use the {@link module:ol/source/Vector~VectorSource#removeFeatures #removeFeatures()} method
   * instead.
   * @param {FeatureType} feature Feature to remove.
   * @api
   */
  removeFeature(e) {
    if (!e)
      return;
    this.removeFeatureInternal(e) && this.changed();
  }
  /**
   * Remove feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @return {boolean} True if the feature was removed, false if it was not found.
   * @protected
   */
  removeFeatureInternal(e) {
    const n = ie(e);
    if (!(n in this.uidIndex_))
      return !1;
    n in this.nullGeometryFeatures_ ? delete this.nullGeometryFeatures_[n] : this.featuresRtree_ && this.featuresRtree_.remove(e);
    const i = this.featureChangeKeys_[n];
    i == null || i.forEach(le), delete this.featureChangeKeys_[n];
    const r = e.getId();
    if (r !== void 0) {
      const s = r.toString(), o = this.idIndex_[s];
      o === e ? delete this.idIndex_[s] : Array.isArray(o) && (o.splice(o.indexOf(e), 1), o.length === 1 && (this.idIndex_[s] = o[0]));
    }
    return delete this.uidIndex_[n], this.hasListener(Et.REMOVEFEATURE) && this.dispatchEvent(
      new zn(Et.REMOVEFEATURE, e)
    ), !0;
  }
  /**
   * Remove a feature from the id index.  Called internally when the feature id
   * may have changed.
   * @param {FeatureType} feature The feature.
   * @private
   */
  removeFromIdIndex_(e) {
    for (const n in this.idIndex_)
      if (this.idIndex_[n] === e) {
        delete this.idIndex_[n];
        break;
      }
  }
  /**
   * Set the new loader of the source. The next render cycle will use the
   * new loader.
   * @param {import("../featureloader.js").FeatureLoader<FeatureType>} loader The loader to set.
   * @api
   */
  setLoader(e) {
    this.loader_ = e;
  }
  /**
   * Points the source to a new url. The next render cycle will use the new url.
   * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
   * @api
   */
  setUrl(e) {
    ee(this.format_, "`format` must be set when `url` is set"), this.url_ = e, this.setLoader(kg(e, this.format_));
  }
}
function oS({ points: t = {}, value: e, center: n = [0, 0], zoom: i, onChange: r, onLocationClick: s }) {
  const o = Me.useRef(null), [l, a] = Me.useState(null), [u, c] = Me.useState(null);
  return Me.useState(null), Me.useEffect(() => {
    if (!l || !u || !t) return;
    const h = u.getSource();
    if (h && (h.clear(), typeof t == "object")) {
      Object.entries(t).forEach(([f, m]) => {
        if (Array.isArray(m) && m.length === 2) {
          const y = new cd({
            geometry: new Ea(au([m[0], m[1]]))
          });
          y.set("id", f), h.addFeature(y);
        }
      });
      const d = h.getExtent();
      Object.keys(t).length > 0 && d && l.getView().fit(d, {
        padding: [50, 50, 50, 50],
        maxZoom: 15
      });
    }
  }, [l, u, t]), Me.useEffect(() => {
    l && (l.getView().setCenter(au(n)), l.getView().setZoom(i));
  }, [l, n, i]), Me.useEffect(() => {
    if (!o.current) return;
    const h = new sS(), d = new Fw({
      source: h
    }), f = new Gx({
      target: o.current,
      layers: [
        new sw({
          source: new Jw({
            url: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          })
        }),
        d
      ],
      view: new $t({
        center: au(n),
        zoom: i
      })
    }), m = (E) => {
      const p = f.getEventPixel(E.originalEvent), g = f.hasFeatureAtPixel(p);
      f.getTarget().style.cursor = g ? "pointer" : "";
    }, y = (E) => {
      const p = Wh(E.coordinate, "EPSG:3857", "EPSG:4326");
      s([p[0], p[1]]);
      const g = f.forEachFeatureAtPixel(E.pixel, (_) => _);
      r(g ? g.get("id") : "");
    };
    return f.on("click", y), f.on("touchend", y), f.on("pointermove", m), a(f), c(d), () => {
      f.dispose(), f.un("click", y), f.un("touchend", y), f.un("pointermove", m);
    };
  }, []), /* @__PURE__ */ Me.createElement("div", { ref: o, style: { width: "100%", height: "300px" } });
}
function lS() {
  const [t, e] = ls("points"), [n, i] = ls("value"), [r, s] = ls("center"), [o, l] = ls("zoom"), [a, u] = ls("location_clicked");
  return /* @__PURE__ */ Me.createElement(
    oS,
    {
      points: t,
      value: n,
      center: r,
      zoom: o,
      onChange: i,
      onLocationClick: u
    }
  );
}
const hS = {
  render: A1(lS)
};
export {
  hS as default
};
