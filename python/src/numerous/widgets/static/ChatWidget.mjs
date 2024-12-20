var Ta = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ad(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Tc = { exports: {} }, V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xr = Symbol.for("react.element"), Md = Symbol.for("react.portal"), Fd = Symbol.for("react.fragment"), jd = Symbol.for("react.strict_mode"), Bd = Symbol.for("react.profiler"), Ud = Symbol.for("react.provider"), Vd = Symbol.for("react.context"), Hd = Symbol.for("react.forward_ref"), $d = Symbol.for("react.suspense"), Wd = Symbol.for("react.memo"), Qd = Symbol.for("react.lazy"), Ia = Symbol.iterator;
function Kd(e) {
  return e === null || typeof e != "object" ? null : (e = Ia && e[Ia] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Ic = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, zc = Object.assign, Nc = {};
function Zt(e, n, t) {
  this.props = e, this.context = n, this.refs = Nc, this.updater = t || Ic;
}
Zt.prototype.isReactComponent = {};
Zt.prototype.setState = function(e, n) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, n, "setState");
};
Zt.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Lc() {
}
Lc.prototype = Zt.prototype;
function hu(e, n, t) {
  this.props = e, this.context = n, this.refs = Nc, this.updater = t || Ic;
}
var mu = hu.prototype = new Lc();
mu.constructor = hu;
zc(mu, Zt.prototype);
mu.isPureReactComponent = !0;
var za = Array.isArray, Oc = Object.prototype.hasOwnProperty, gu = { current: null }, Rc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Dc(e, n, t) {
  var r, i = {}, l = null, o = null;
  if (n != null) for (r in n.ref !== void 0 && (o = n.ref), n.key !== void 0 && (l = "" + n.key), n) Oc.call(n, r) && !Rc.hasOwnProperty(r) && (i[r] = n[r]);
  var u = arguments.length - 2;
  if (u === 1) i.children = t;
  else if (1 < u) {
    for (var a = Array(u), s = 0; s < u; s++) a[s] = arguments[s + 2];
    i.children = a;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) i[r] === void 0 && (i[r] = u[r]);
  return { $$typeof: Xr, type: e, key: l, ref: o, props: i, _owner: gu.current };
}
function Yd(e, n) {
  return { $$typeof: Xr, type: e.type, key: n, ref: e.ref, props: e.props, _owner: e._owner };
}
function yu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Xr;
}
function Xd(e) {
  var n = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(t) {
    return n[t];
  });
}
var Na = /\/+/g;
function Il(e, n) {
  return typeof e == "object" && e !== null && e.key != null ? Xd("" + e.key) : n.toString(36);
}
function Si(e, n, t, r, i) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (l) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Xr:
        case Md:
          o = !0;
      }
  }
  if (o) return o = e, i = i(o), e = r === "" ? "." + Il(o, 0) : r, za(i) ? (t = "", e != null && (t = e.replace(Na, "$&/") + "/"), Si(i, n, t, "", function(s) {
    return s;
  })) : i != null && (yu(i) && (i = Yd(i, t + (!i.key || o && o.key === i.key ? "" : ("" + i.key).replace(Na, "$&/") + "/") + e)), n.push(i)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", za(e)) for (var u = 0; u < e.length; u++) {
    l = e[u];
    var a = r + Il(l, u);
    o += Si(l, n, t, a, i);
  }
  else if (a = Kd(e), typeof a == "function") for (e = a.call(e), u = 0; !(l = e.next()).done; ) l = l.value, a = r + Il(l, u++), o += Si(l, n, t, a, i);
  else if (l === "object") throw n = String(e), Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function ti(e, n, t) {
  if (e == null) return e;
  var r = [], i = 0;
  return Si(e, r, "", "", function(l) {
    return n.call(t, l, i++);
  }), r;
}
function qd(e) {
  if (e._status === -1) {
    var n = e._result;
    n = n(), n.then(function(t) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
    }, function(t) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
    }), e._status === -1 && (e._status = 0, e._result = n);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ne = { current: null }, Ei = { transition: null }, Gd = { ReactCurrentDispatcher: Ne, ReactCurrentBatchConfig: Ei, ReactCurrentOwner: gu };
function Ac() {
  throw Error("act(...) is not supported in production builds of React.");
}
V.Children = { map: ti, forEach: function(e, n, t) {
  ti(e, function() {
    n.apply(this, arguments);
  }, t);
}, count: function(e) {
  var n = 0;
  return ti(e, function() {
    n++;
  }), n;
}, toArray: function(e) {
  return ti(e, function(n) {
    return n;
  }) || [];
}, only: function(e) {
  if (!yu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
V.Component = Zt;
V.Fragment = Fd;
V.Profiler = Bd;
V.PureComponent = hu;
V.StrictMode = jd;
V.Suspense = $d;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gd;
V.act = Ac;
V.cloneElement = function(e, n, t) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = zc({}, e.props), i = e.key, l = e.ref, o = e._owner;
  if (n != null) {
    if (n.ref !== void 0 && (l = n.ref, o = gu.current), n.key !== void 0 && (i = "" + n.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (a in n) Oc.call(n, a) && !Rc.hasOwnProperty(a) && (r[a] = n[a] === void 0 && u !== void 0 ? u[a] : n[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = t;
  else if (1 < a) {
    u = Array(a);
    for (var s = 0; s < a; s++) u[s] = arguments[s + 2];
    r.children = u;
  }
  return { $$typeof: Xr, type: e.type, key: i, ref: l, props: r, _owner: o };
};
V.createContext = function(e) {
  return e = { $$typeof: Vd, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Ud, _context: e }, e.Consumer = e;
};
V.createElement = Dc;
V.createFactory = function(e) {
  var n = Dc.bind(null, e);
  return n.type = e, n;
};
V.createRef = function() {
  return { current: null };
};
V.forwardRef = function(e) {
  return { $$typeof: Hd, render: e };
};
V.isValidElement = yu;
V.lazy = function(e) {
  return { $$typeof: Qd, _payload: { _status: -1, _result: e }, _init: qd };
};
V.memo = function(e, n) {
  return { $$typeof: Wd, type: e, compare: n === void 0 ? null : n };
};
V.startTransition = function(e) {
  var n = Ei.transition;
  Ei.transition = {};
  try {
    e();
  } finally {
    Ei.transition = n;
  }
};
V.unstable_act = Ac;
V.useCallback = function(e, n) {
  return Ne.current.useCallback(e, n);
};
V.useContext = function(e) {
  return Ne.current.useContext(e);
};
V.useDebugValue = function() {
};
V.useDeferredValue = function(e) {
  return Ne.current.useDeferredValue(e);
};
V.useEffect = function(e, n) {
  return Ne.current.useEffect(e, n);
};
V.useId = function() {
  return Ne.current.useId();
};
V.useImperativeHandle = function(e, n, t) {
  return Ne.current.useImperativeHandle(e, n, t);
};
V.useInsertionEffect = function(e, n) {
  return Ne.current.useInsertionEffect(e, n);
};
V.useLayoutEffect = function(e, n) {
  return Ne.current.useLayoutEffect(e, n);
};
V.useMemo = function(e, n) {
  return Ne.current.useMemo(e, n);
};
V.useReducer = function(e, n, t) {
  return Ne.current.useReducer(e, n, t);
};
V.useRef = function(e) {
  return Ne.current.useRef(e);
};
V.useState = function(e) {
  return Ne.current.useState(e);
};
V.useSyncExternalStore = function(e, n, t) {
  return Ne.current.useSyncExternalStore(e, n, t);
};
V.useTransition = function() {
  return Ne.current.useTransition();
};
V.version = "18.3.1";
Tc.exports = V;
var re = Tc.exports, Mc = { exports: {} }, Ke = {}, Fc = { exports: {} }, jc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function n(N, M) {
    var g = N.length;
    N.push(M);
    e: for (; 0 < g; ) {
      var W = g - 1 >>> 1, q = N[W];
      if (0 < i(q, M)) N[W] = M, N[g] = q, g = W;
      else break e;
    }
  }
  function t(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var M = N[0], g = N.pop();
    if (g !== M) {
      N[0] = g;
      e: for (var W = 0, q = N.length, v = q >>> 1; W < v; ) {
        var me = 2 * (W + 1) - 1, tn = N[me], ee = me + 1, pn = N[ee];
        if (0 > i(tn, g)) ee < q && 0 > i(pn, tn) ? (N[W] = pn, N[ee] = g, W = ee) : (N[W] = tn, N[me] = g, W = me);
        else if (ee < q && 0 > i(pn, g)) N[W] = pn, N[ee] = g, W = ee;
        else break e;
      }
    }
    return M;
  }
  function i(N, M) {
    var g = N.sortIndex - M.sortIndex;
    return g !== 0 ? g : N.id - M.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function() {
      return l.now();
    };
  } else {
    var o = Date, u = o.now();
    e.unstable_now = function() {
      return o.now() - u;
    };
  }
  var a = [], s = [], c = 1, f = null, d = 3, p = !1, k = !1, w = !1, I = typeof setTimeout == "function" ? setTimeout : null, h = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(N) {
    for (var M = t(s); M !== null; ) {
      if (M.callback === null) r(s);
      else if (M.startTime <= N) r(s), M.sortIndex = M.expirationTime, n(a, M);
      else break;
      M = t(s);
    }
  }
  function S(N) {
    if (w = !1, y(N), !k) if (t(a) !== null) k = !0, pe(C);
    else {
      var M = t(s);
      M !== null && ce(S, M.startTime - N);
    }
  }
  function C(N, M) {
    k = !1, w && (w = !1, h(L), L = -1), p = !0;
    var g = d;
    try {
      for (y(M), f = t(a); f !== null && (!(f.expirationTime > M) || N && !D()); ) {
        var W = f.callback;
        if (typeof W == "function") {
          f.callback = null, d = f.priorityLevel;
          var q = W(f.expirationTime <= M);
          M = e.unstable_now(), typeof q == "function" ? f.callback = q : f === t(a) && r(a), y(M);
        } else r(a);
        f = t(a);
      }
      if (f !== null) var v = !0;
      else {
        var me = t(s);
        me !== null && ce(S, me.startTime - M), v = !1;
      }
      return v;
    } finally {
      f = null, d = g, p = !1;
    }
  }
  var x = !1, T = null, L = -1, F = 5, R = -1;
  function D() {
    return !(e.unstable_now() - R < F);
  }
  function A() {
    if (T !== null) {
      var N = e.unstable_now();
      R = N;
      var M = !0;
      try {
        M = T(!0, N);
      } finally {
        M ? Y() : (x = !1, T = null);
      }
    } else x = !1;
  }
  var Y;
  if (typeof m == "function") Y = function() {
    m(A);
  };
  else if (typeof MessageChannel < "u") {
    var le = new MessageChannel(), H = le.port2;
    le.port1.onmessage = A, Y = function() {
      H.postMessage(null);
    };
  } else Y = function() {
    I(A, 0);
  };
  function pe(N) {
    T = N, x || (x = !0, Y());
  }
  function ce(N, M) {
    L = I(function() {
      N(e.unstable_now());
    }, M);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(N) {
    N.callback = null;
  }, e.unstable_continueExecution = function() {
    k || p || (k = !0, pe(C));
  }, e.unstable_forceFrameRate = function(N) {
    0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : F = 0 < N ? Math.floor(1e3 / N) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, e.unstable_getFirstCallbackNode = function() {
    return t(a);
  }, e.unstable_next = function(N) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var M = 3;
        break;
      default:
        M = d;
    }
    var g = d;
    d = M;
    try {
      return N();
    } finally {
      d = g;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(N, M) {
    switch (N) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        N = 3;
    }
    var g = d;
    d = N;
    try {
      return M();
    } finally {
      d = g;
    }
  }, e.unstable_scheduleCallback = function(N, M, g) {
    var W = e.unstable_now();
    switch (typeof g == "object" && g !== null ? (g = g.delay, g = typeof g == "number" && 0 < g ? W + g : W) : g = W, N) {
      case 1:
        var q = -1;
        break;
      case 2:
        q = 250;
        break;
      case 5:
        q = 1073741823;
        break;
      case 4:
        q = 1e4;
        break;
      default:
        q = 5e3;
    }
    return q = g + q, N = { id: c++, callback: M, priorityLevel: N, startTime: g, expirationTime: q, sortIndex: -1 }, g > W ? (N.sortIndex = g, n(s, N), t(a) === null && N === t(s) && (w ? (h(L), L = -1) : w = !0, ce(S, g - W))) : (N.sortIndex = q, n(a, N), k || p || (k = !0, pe(C))), N;
  }, e.unstable_shouldYield = D, e.unstable_wrapCallback = function(N) {
    var M = d;
    return function() {
      var g = d;
      d = M;
      try {
        return N.apply(this, arguments);
      } finally {
        d = g;
      }
    };
  };
})(jc);
Fc.exports = jc;
var Zd = Fc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jd = re, Qe = Zd;
function P(e) {
  for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++) n += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Bc = /* @__PURE__ */ new Set(), Nr = {};
function gt(e, n) {
  Wt(e, n), Wt(e + "Capture", n);
}
function Wt(e, n) {
  for (Nr[e] = n, e = 0; e < n.length; e++) Bc.add(n[e]);
}
var In = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), po = Object.prototype.hasOwnProperty, bd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, La = {}, Oa = {};
function eh(e) {
  return po.call(Oa, e) ? !0 : po.call(La, e) ? !1 : bd.test(e) ? Oa[e] = !0 : (La[e] = !0, !1);
}
function nh(e, n, t, r) {
  if (t !== null && t.type === 0) return !1;
  switch (typeof n) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : t !== null ? !t.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function th(e, n, t, r) {
  if (n === null || typeof n > "u" || nh(e, n, t, r)) return !0;
  if (r) return !1;
  if (t !== null) switch (t.type) {
    case 3:
      return !n;
    case 4:
      return n === !1;
    case 5:
      return isNaN(n);
    case 6:
      return isNaN(n) || 1 > n;
  }
  return !1;
}
function Le(e, n, t, r, i, l, o) {
  this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = t, this.propertyName = e, this.type = n, this.sanitizeURL = l, this.removeEmptyString = o;
}
var Se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Se[e] = new Le(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var n = e[0];
  Se[n] = new Le(n, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Se[e] = new Le(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Se[e] = new Le(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Se[e] = new Le(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Se[e] = new Le(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Se[e] = new Le(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Se[e] = new Le(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Se[e] = new Le(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var vu = /[\-:]([a-z])/g;
function ku(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var n = e.replace(
    vu,
    ku
  );
  Se[n] = new Le(n, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var n = e.replace(vu, ku);
  Se[n] = new Le(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var n = e.replace(vu, ku);
  Se[n] = new Le(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Se[e] = new Le(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Se.xlinkHref = new Le("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Se[e] = new Le(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function wu(e, n, t, r) {
  var i = Se.hasOwnProperty(n) ? Se[n] : null;
  (i !== null ? i.type !== 0 : r || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (th(n, t, i, r) && (t = null), r || i === null ? eh(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : i.mustUseProperty ? e[i.propertyName] = t === null ? i.type === 3 ? !1 : "" : t : (n = i.attributeName, r = i.attributeNamespace, t === null ? e.removeAttribute(n) : (i = i.type, t = i === 3 || i === 4 && t === !0 ? "" : "" + t, r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
}
var On = Jd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ri = Symbol.for("react.element"), Ct = Symbol.for("react.portal"), Pt = Symbol.for("react.fragment"), xu = Symbol.for("react.strict_mode"), ho = Symbol.for("react.profiler"), Uc = Symbol.for("react.provider"), Vc = Symbol.for("react.context"), Su = Symbol.for("react.forward_ref"), mo = Symbol.for("react.suspense"), go = Symbol.for("react.suspense_list"), Eu = Symbol.for("react.memo"), Mn = Symbol.for("react.lazy"), Hc = Symbol.for("react.offscreen"), Ra = Symbol.iterator;
function ir(e) {
  return e === null || typeof e != "object" ? null : (e = Ra && e[Ra] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ae = Object.assign, zl;
function mr(e) {
  if (zl === void 0) try {
    throw Error();
  } catch (t) {
    var n = t.stack.trim().match(/\n( *(at )?)/);
    zl = n && n[1] || "";
  }
  return `
` + zl + e;
}
var Nl = !1;
function Ll(e, n) {
  if (!e || Nl) return "";
  Nl = !0;
  var t = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (n) if (n = function() {
      throw Error();
    }, Object.defineProperty(n.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(n, []);
      } catch (s) {
        var r = s;
      }
      Reflect.construct(e, [], n);
    } else {
      try {
        n.call();
      } catch (s) {
        r = s;
      }
      e.call(n.prototype);
    }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (var i = s.stack.split(`
`), l = r.stack.split(`
`), o = i.length - 1, u = l.length - 1; 1 <= o && 0 <= u && i[o] !== l[u]; ) u--;
      for (; 1 <= o && 0 <= u; o--, u--) if (i[o] !== l[u]) {
        if (o !== 1 || u !== 1)
          do
            if (o--, u--, 0 > u || i[o] !== l[u]) {
              var a = `
` + i[o].replace(" at new ", " at ");
              return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
            }
          while (1 <= o && 0 <= u);
        break;
      }
    }
  } finally {
    Nl = !1, Error.prepareStackTrace = t;
  }
  return (e = e ? e.displayName || e.name : "") ? mr(e) : "";
}
function rh(e) {
  switch (e.tag) {
    case 5:
      return mr(e.type);
    case 16:
      return mr("Lazy");
    case 13:
      return mr("Suspense");
    case 19:
      return mr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ll(e.type, !1), e;
    case 11:
      return e = Ll(e.type.render, !1), e;
    case 1:
      return e = Ll(e.type, !0), e;
    default:
      return "";
  }
}
function yo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Pt:
      return "Fragment";
    case Ct:
      return "Portal";
    case ho:
      return "Profiler";
    case xu:
      return "StrictMode";
    case mo:
      return "Suspense";
    case go:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Vc:
      return (e.displayName || "Context") + ".Consumer";
    case Uc:
      return (e._context.displayName || "Context") + ".Provider";
    case Su:
      var n = e.render;
      return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Eu:
      return n = e.displayName || null, n !== null ? n : yo(e.type) || "Memo";
    case Mn:
      n = e._payload, e = e._init;
      try {
        return yo(e(n));
      } catch {
      }
  }
  return null;
}
function ih(e) {
  var n = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (n.displayName || "Context") + ".Consumer";
    case 10:
      return (n._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = n.render, e = e.displayName || e.name || "", n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return n;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return yo(n);
    case 8:
      return n === xu ? "StrictMode" : "Mode";
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
      if (typeof n == "function") return n.displayName || n.name || null;
      if (typeof n == "string") return n;
  }
  return null;
}
function Gn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function $c(e) {
  var n = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
}
function lh(e) {
  var n = $c(e) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), r = "" + e[n];
  if (!e.hasOwnProperty(n) && typeof t < "u" && typeof t.get == "function" && typeof t.set == "function") {
    var i = t.get, l = t.set;
    return Object.defineProperty(e, n, { configurable: !0, get: function() {
      return i.call(this);
    }, set: function(o) {
      r = "" + o, l.call(this, o);
    } }), Object.defineProperty(e, n, { enumerable: t.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[n];
    } };
  }
}
function ii(e) {
  e._valueTracker || (e._valueTracker = lh(e));
}
function Wc(e) {
  if (!e) return !1;
  var n = e._valueTracker;
  if (!n) return !0;
  var t = n.getValue(), r = "";
  return e && (r = $c(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== t ? (n.setValue(e), !0) : !1;
}
function Mi(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function vo(e, n) {
  var t = n.checked;
  return ae({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: t ?? e._wrapperState.initialChecked });
}
function Da(e, n) {
  var t = n.defaultValue == null ? "" : n.defaultValue, r = n.checked != null ? n.checked : n.defaultChecked;
  t = Gn(n.value != null ? n.value : t), e._wrapperState = { initialChecked: r, initialValue: t, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
}
function Qc(e, n) {
  n = n.checked, n != null && wu(e, "checked", n, !1);
}
function ko(e, n) {
  Qc(e, n);
  var t = Gn(n.value), r = n.type;
  if (t != null) r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  n.hasOwnProperty("value") ? wo(e, n.type, t) : n.hasOwnProperty("defaultValue") && wo(e, n.type, Gn(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
}
function Aa(e, n, t) {
  if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
    var r = n.type;
    if (!(r !== "submit" && r !== "reset" || n.value !== void 0 && n.value !== null)) return;
    n = "" + e._wrapperState.initialValue, t || n === e.value || (e.value = n), e.defaultValue = n;
  }
  t = e.name, t !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, t !== "" && (e.name = t);
}
function wo(e, n, t) {
  (n !== "number" || Mi(e.ownerDocument) !== e) && (t == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
}
var gr = Array.isArray;
function Mt(e, n, t, r) {
  if (e = e.options, n) {
    n = {};
    for (var i = 0; i < t.length; i++) n["$" + t[i]] = !0;
    for (t = 0; t < e.length; t++) i = n.hasOwnProperty("$" + e[t].value), e[t].selected !== i && (e[t].selected = i), i && r && (e[t].defaultSelected = !0);
  } else {
    for (t = "" + Gn(t), n = null, i = 0; i < e.length; i++) {
      if (e[i].value === t) {
        e[i].selected = !0, r && (e[i].defaultSelected = !0);
        return;
      }
      n !== null || e[i].disabled || (n = e[i]);
    }
    n !== null && (n.selected = !0);
  }
}
function xo(e, n) {
  if (n.dangerouslySetInnerHTML != null) throw Error(P(91));
  return ae({}, n, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ma(e, n) {
  var t = n.value;
  if (t == null) {
    if (t = n.children, n = n.defaultValue, t != null) {
      if (n != null) throw Error(P(92));
      if (gr(t)) {
        if (1 < t.length) throw Error(P(93));
        t = t[0];
      }
      n = t;
    }
    n == null && (n = ""), t = n;
  }
  e._wrapperState = { initialValue: Gn(t) };
}
function Kc(e, n) {
  var t = Gn(n.value), r = Gn(n.defaultValue);
  t != null && (t = "" + t, t !== e.value && (e.value = t), n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)), r != null && (e.defaultValue = "" + r);
}
function Fa(e) {
  var n = e.textContent;
  n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
}
function Yc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function So(e, n) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Yc(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var li, Xc = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, t, r, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(n, t, r, i);
    });
  } : e;
}(function(e, n) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n;
  else {
    for (li = li || document.createElement("div"), li.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = li.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; n.firstChild; ) e.appendChild(n.firstChild);
  }
});
function Lr(e, n) {
  if (n) {
    var t = e.firstChild;
    if (t && t === e.lastChild && t.nodeType === 3) {
      t.nodeValue = n;
      return;
    }
  }
  e.textContent = n;
}
var kr = {
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
}, oh = ["Webkit", "ms", "Moz", "O"];
Object.keys(kr).forEach(function(e) {
  oh.forEach(function(n) {
    n = n + e.charAt(0).toUpperCase() + e.substring(1), kr[n] = kr[e];
  });
});
function qc(e, n, t) {
  return n == null || typeof n == "boolean" || n === "" ? "" : t || typeof n != "number" || n === 0 || kr.hasOwnProperty(e) && kr[e] ? ("" + n).trim() : n + "px";
}
function Gc(e, n) {
  e = e.style;
  for (var t in n) if (n.hasOwnProperty(t)) {
    var r = t.indexOf("--") === 0, i = qc(t, n[t], r);
    t === "float" && (t = "cssFloat"), r ? e.setProperty(t, i) : e[t] = i;
  }
}
var uh = ae({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Eo(e, n) {
  if (n) {
    if (uh[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(P(137, e));
    if (n.dangerouslySetInnerHTML != null) {
      if (n.children != null) throw Error(P(60));
      if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(P(61));
    }
    if (n.style != null && typeof n.style != "object") throw Error(P(62));
  }
}
function Co(e, n) {
  if (e.indexOf("-") === -1) return typeof n.is == "string";
  switch (e) {
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
var Po = null;
function Cu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var _o = null, Ft = null, jt = null;
function ja(e) {
  if (e = Zr(e)) {
    if (typeof _o != "function") throw Error(P(280));
    var n = e.stateNode;
    n && (n = dl(n), _o(e.stateNode, e.type, n));
  }
}
function Zc(e) {
  Ft ? jt ? jt.push(e) : jt = [e] : Ft = e;
}
function Jc() {
  if (Ft) {
    var e = Ft, n = jt;
    if (jt = Ft = null, ja(e), n) for (e = 0; e < n.length; e++) ja(n[e]);
  }
}
function bc(e, n) {
  return e(n);
}
function ef() {
}
var Ol = !1;
function nf(e, n, t) {
  if (Ol) return e(n, t);
  Ol = !0;
  try {
    return bc(e, n, t);
  } finally {
    Ol = !1, (Ft !== null || jt !== null) && (ef(), Jc());
  }
}
function Or(e, n) {
  var t = e.stateNode;
  if (t === null) return null;
  var r = dl(t);
  if (r === null) return null;
  t = r[n];
  e: switch (n) {
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
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (t && typeof t != "function") throw Error(P(231, n, typeof t));
  return t;
}
var To = !1;
if (In) try {
  var lr = {};
  Object.defineProperty(lr, "passive", { get: function() {
    To = !0;
  } }), window.addEventListener("test", lr, lr), window.removeEventListener("test", lr, lr);
} catch {
  To = !1;
}
function ah(e, n, t, r, i, l, o, u, a) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    n.apply(t, s);
  } catch (c) {
    this.onError(c);
  }
}
var wr = !1, Fi = null, ji = !1, Io = null, sh = { onError: function(e) {
  wr = !0, Fi = e;
} };
function ch(e, n, t, r, i, l, o, u, a) {
  wr = !1, Fi = null, ah.apply(sh, arguments);
}
function fh(e, n, t, r, i, l, o, u, a) {
  if (ch.apply(this, arguments), wr) {
    if (wr) {
      var s = Fi;
      wr = !1, Fi = null;
    } else throw Error(P(198));
    ji || (ji = !0, Io = s);
  }
}
function yt(e) {
  var n = e, t = e;
  if (e.alternate) for (; n.return; ) n = n.return;
  else {
    e = n;
    do
      n = e, n.flags & 4098 && (t = n.return), e = n.return;
    while (e);
  }
  return n.tag === 3 ? t : null;
}
function tf(e) {
  if (e.tag === 13) {
    var n = e.memoizedState;
    if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
  }
  return null;
}
function Ba(e) {
  if (yt(e) !== e) throw Error(P(188));
}
function ph(e) {
  var n = e.alternate;
  if (!n) {
    if (n = yt(e), n === null) throw Error(P(188));
    return n !== e ? null : e;
  }
  for (var t = e, r = n; ; ) {
    var i = t.return;
    if (i === null) break;
    var l = i.alternate;
    if (l === null) {
      if (r = i.return, r !== null) {
        t = r;
        continue;
      }
      break;
    }
    if (i.child === l.child) {
      for (l = i.child; l; ) {
        if (l === t) return Ba(i), e;
        if (l === r) return Ba(i), n;
        l = l.sibling;
      }
      throw Error(P(188));
    }
    if (t.return !== r.return) t = i, r = l;
    else {
      for (var o = !1, u = i.child; u; ) {
        if (u === t) {
          o = !0, t = i, r = l;
          break;
        }
        if (u === r) {
          o = !0, r = i, t = l;
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = l.child; u; ) {
          if (u === t) {
            o = !0, t = l, r = i;
            break;
          }
          if (u === r) {
            o = !0, r = l, t = i;
            break;
          }
          u = u.sibling;
        }
        if (!o) throw Error(P(189));
      }
    }
    if (t.alternate !== r) throw Error(P(190));
  }
  if (t.tag !== 3) throw Error(P(188));
  return t.stateNode.current === t ? e : n;
}
function rf(e) {
  return e = ph(e), e !== null ? lf(e) : null;
}
function lf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var n = lf(e);
    if (n !== null) return n;
    e = e.sibling;
  }
  return null;
}
var of = Qe.unstable_scheduleCallback, Ua = Qe.unstable_cancelCallback, dh = Qe.unstable_shouldYield, hh = Qe.unstable_requestPaint, fe = Qe.unstable_now, mh = Qe.unstable_getCurrentPriorityLevel, Pu = Qe.unstable_ImmediatePriority, uf = Qe.unstable_UserBlockingPriority, Bi = Qe.unstable_NormalPriority, gh = Qe.unstable_LowPriority, af = Qe.unstable_IdlePriority, sl = null, vn = null;
function yh(e) {
  if (vn && typeof vn.onCommitFiberRoot == "function") try {
    vn.onCommitFiberRoot(sl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var sn = Math.clz32 ? Math.clz32 : wh, vh = Math.log, kh = Math.LN2;
function wh(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (vh(e) / kh | 0) | 0;
}
var oi = 64, ui = 4194304;
function yr(e) {
  switch (e & -e) {
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
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ui(e, n) {
  var t = e.pendingLanes;
  if (t === 0) return 0;
  var r = 0, i = e.suspendedLanes, l = e.pingedLanes, o = t & 268435455;
  if (o !== 0) {
    var u = o & ~i;
    u !== 0 ? r = yr(u) : (l &= o, l !== 0 && (r = yr(l)));
  } else o = t & ~i, o !== 0 ? r = yr(o) : l !== 0 && (r = yr(l));
  if (r === 0) return 0;
  if (n !== 0 && n !== r && !(n & i) && (i = r & -r, l = n & -n, i >= l || i === 16 && (l & 4194240) !== 0)) return n;
  if (r & 4 && (r |= t & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= r; 0 < n; ) t = 31 - sn(n), i = 1 << t, r |= e[t], n &= ~i;
  return r;
}
function xh(e, n) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return n + 250;
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
      return n + 5e3;
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
function Sh(e, n) {
  for (var t = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
    var o = 31 - sn(l), u = 1 << o, a = i[o];
    a === -1 ? (!(u & t) || u & r) && (i[o] = xh(u, n)) : a <= n && (e.expiredLanes |= u), l &= ~u;
  }
}
function zo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function sf() {
  var e = oi;
  return oi <<= 1, !(oi & 4194240) && (oi = 64), e;
}
function Rl(e) {
  for (var n = [], t = 0; 31 > t; t++) n.push(e);
  return n;
}
function qr(e, n, t) {
  e.pendingLanes |= n, n !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, n = 31 - sn(n), e[n] = t;
}
function Eh(e, n) {
  var t = e.pendingLanes & ~n;
  e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n, n = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < t; ) {
    var i = 31 - sn(t), l = 1 << i;
    n[i] = 0, r[i] = -1, e[i] = -1, t &= ~l;
  }
}
function _u(e, n) {
  var t = e.entangledLanes |= n;
  for (e = e.entanglements; t; ) {
    var r = 31 - sn(t), i = 1 << r;
    i & n | e[r] & n && (e[r] |= n), t &= ~i;
  }
}
var X = 0;
function cf(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var ff, Tu, pf, df, hf, No = !1, ai = [], Hn = null, $n = null, Wn = null, Rr = /* @__PURE__ */ new Map(), Dr = /* @__PURE__ */ new Map(), jn = [], Ch = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Va(e, n) {
  switch (e) {
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
      Wn = null;
      break;
    case "pointerover":
    case "pointerout":
      Rr.delete(n.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Dr.delete(n.pointerId);
  }
}
function or(e, n, t, r, i, l) {
  return e === null || e.nativeEvent !== l ? (e = { blockedOn: n, domEventName: t, eventSystemFlags: r, nativeEvent: l, targetContainers: [i] }, n !== null && (n = Zr(n), n !== null && Tu(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, i !== null && n.indexOf(i) === -1 && n.push(i), e);
}
function Ph(e, n, t, r, i) {
  switch (n) {
    case "focusin":
      return Hn = or(Hn, e, n, t, r, i), !0;
    case "dragenter":
      return $n = or($n, e, n, t, r, i), !0;
    case "mouseover":
      return Wn = or(Wn, e, n, t, r, i), !0;
    case "pointerover":
      var l = i.pointerId;
      return Rr.set(l, or(Rr.get(l) || null, e, n, t, r, i)), !0;
    case "gotpointercapture":
      return l = i.pointerId, Dr.set(l, or(Dr.get(l) || null, e, n, t, r, i)), !0;
  }
  return !1;
}
function mf(e) {
  var n = ot(e.target);
  if (n !== null) {
    var t = yt(n);
    if (t !== null) {
      if (n = t.tag, n === 13) {
        if (n = tf(t), n !== null) {
          e.blockedOn = n, hf(e.priority, function() {
            pf(t);
          });
          return;
        }
      } else if (n === 3 && t.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Ci(e) {
  if (e.blockedOn !== null) return !1;
  for (var n = e.targetContainers; 0 < n.length; ) {
    var t = Lo(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
    if (t === null) {
      t = e.nativeEvent;
      var r = new t.constructor(t.type, t);
      Po = r, t.target.dispatchEvent(r), Po = null;
    } else return n = Zr(t), n !== null && Tu(n), e.blockedOn = t, !1;
    n.shift();
  }
  return !0;
}
function Ha(e, n, t) {
  Ci(e) && t.delete(n);
}
function _h() {
  No = !1, Hn !== null && Ci(Hn) && (Hn = null), $n !== null && Ci($n) && ($n = null), Wn !== null && Ci(Wn) && (Wn = null), Rr.forEach(Ha), Dr.forEach(Ha);
}
function ur(e, n) {
  e.blockedOn === n && (e.blockedOn = null, No || (No = !0, Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority, _h)));
}
function Ar(e) {
  function n(i) {
    return ur(i, e);
  }
  if (0 < ai.length) {
    ur(ai[0], e);
    for (var t = 1; t < ai.length; t++) {
      var r = ai[t];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Hn !== null && ur(Hn, e), $n !== null && ur($n, e), Wn !== null && ur(Wn, e), Rr.forEach(n), Dr.forEach(n), t = 0; t < jn.length; t++) r = jn[t], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < jn.length && (t = jn[0], t.blockedOn === null); ) mf(t), t.blockedOn === null && jn.shift();
}
var Bt = On.ReactCurrentBatchConfig, Vi = !0;
function Th(e, n, t, r) {
  var i = X, l = Bt.transition;
  Bt.transition = null;
  try {
    X = 1, Iu(e, n, t, r);
  } finally {
    X = i, Bt.transition = l;
  }
}
function Ih(e, n, t, r) {
  var i = X, l = Bt.transition;
  Bt.transition = null;
  try {
    X = 4, Iu(e, n, t, r);
  } finally {
    X = i, Bt.transition = l;
  }
}
function Iu(e, n, t, r) {
  if (Vi) {
    var i = Lo(e, n, t, r);
    if (i === null) $l(e, n, r, Hi, t), Va(e, r);
    else if (Ph(i, e, n, t, r)) r.stopPropagation();
    else if (Va(e, r), n & 4 && -1 < Ch.indexOf(e)) {
      for (; i !== null; ) {
        var l = Zr(i);
        if (l !== null && ff(l), l = Lo(e, n, t, r), l === null && $l(e, n, r, Hi, t), l === i) break;
        i = l;
      }
      i !== null && r.stopPropagation();
    } else $l(e, n, r, null, t);
  }
}
var Hi = null;
function Lo(e, n, t, r) {
  if (Hi = null, e = Cu(r), e = ot(e), e !== null) if (n = yt(e), n === null) e = null;
  else if (t = n.tag, t === 13) {
    if (e = tf(n), e !== null) return e;
    e = null;
  } else if (t === 3) {
    if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
    e = null;
  } else n !== e && (e = null);
  return Hi = e, null;
}
function gf(e) {
  switch (e) {
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
      switch (mh()) {
        case Pu:
          return 1;
        case uf:
          return 4;
        case Bi:
        case gh:
          return 16;
        case af:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Un = null, zu = null, Pi = null;
function yf() {
  if (Pi) return Pi;
  var e, n = zu, t = n.length, r, i = "value" in Un ? Un.value : Un.textContent, l = i.length;
  for (e = 0; e < t && n[e] === i[e]; e++) ;
  var o = t - e;
  for (r = 1; r <= o && n[t - r] === i[l - r]; r++) ;
  return Pi = i.slice(e, 1 < r ? 1 - r : void 0);
}
function _i(e) {
  var n = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function si() {
  return !0;
}
function $a() {
  return !1;
}
function Ye(e) {
  function n(t, r, i, l, o) {
    this._reactName = t, this._targetInst = i, this.type = r, this.nativeEvent = l, this.target = o, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (t = e[u], this[u] = t ? t(l) : l[u]);
    return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? si : $a, this.isPropagationStopped = $a, this;
  }
  return ae(n.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var t = this.nativeEvent;
    t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = si);
  }, stopPropagation: function() {
    var t = this.nativeEvent;
    t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = si);
  }, persist: function() {
  }, isPersistent: si }), n;
}
var Jt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Nu = Ye(Jt), Gr = ae({}, Jt, { view: 0, detail: 0 }), zh = Ye(Gr), Dl, Al, ar, cl = ae({}, Gr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Lu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ar && (ar && e.type === "mousemove" ? (Dl = e.screenX - ar.screenX, Al = e.screenY - ar.screenY) : Al = Dl = 0, ar = e), Dl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Al;
} }), Wa = Ye(cl), Nh = ae({}, cl, { dataTransfer: 0 }), Lh = Ye(Nh), Oh = ae({}, Gr, { relatedTarget: 0 }), Ml = Ye(Oh), Rh = ae({}, Jt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Dh = Ye(Rh), Ah = ae({}, Jt, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Mh = Ye(Ah), Fh = ae({}, Jt, { data: 0 }), Qa = Ye(Fh), jh = {
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
}, Bh = {
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
}, Uh = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Vh(e) {
  var n = this.nativeEvent;
  return n.getModifierState ? n.getModifierState(e) : (e = Uh[e]) ? !!n[e] : !1;
}
function Lu() {
  return Vh;
}
var Hh = ae({}, Gr, { key: function(e) {
  if (e.key) {
    var n = jh[e.key] || e.key;
    if (n !== "Unidentified") return n;
  }
  return e.type === "keypress" ? (e = _i(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Bh[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Lu, charCode: function(e) {
  return e.type === "keypress" ? _i(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _i(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), $h = Ye(Hh), Wh = ae({}, cl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ka = Ye(Wh), Qh = ae({}, Gr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Lu }), Kh = Ye(Qh), Yh = ae({}, Jt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xh = Ye(Yh), qh = ae({}, cl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gh = Ye(qh), Zh = [9, 13, 27, 32], Ou = In && "CompositionEvent" in window, xr = null;
In && "documentMode" in document && (xr = document.documentMode);
var Jh = In && "TextEvent" in window && !xr, vf = In && (!Ou || xr && 8 < xr && 11 >= xr), Ya = " ", Xa = !1;
function kf(e, n) {
  switch (e) {
    case "keyup":
      return Zh.indexOf(n.keyCode) !== -1;
    case "keydown":
      return n.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function wf(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var _t = !1;
function bh(e, n) {
  switch (e) {
    case "compositionend":
      return wf(n);
    case "keypress":
      return n.which !== 32 ? null : (Xa = !0, Ya);
    case "textInput":
      return e = n.data, e === Ya && Xa ? null : e;
    default:
      return null;
  }
}
function em(e, n) {
  if (_t) return e === "compositionend" || !Ou && kf(e, n) ? (e = yf(), Pi = zu = Un = null, _t = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
        if (n.char && 1 < n.char.length) return n.char;
        if (n.which) return String.fromCharCode(n.which);
      }
      return null;
    case "compositionend":
      return vf && n.locale !== "ko" ? null : n.data;
    default:
      return null;
  }
}
var nm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function qa(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n === "input" ? !!nm[e.type] : n === "textarea";
}
function xf(e, n, t, r) {
  Zc(r), n = $i(n, "onChange"), 0 < n.length && (t = new Nu("onChange", "change", null, t, r), e.push({ event: t, listeners: n }));
}
var Sr = null, Mr = null;
function tm(e) {
  Of(e, 0);
}
function fl(e) {
  var n = zt(e);
  if (Wc(n)) return e;
}
function rm(e, n) {
  if (e === "change") return n;
}
var Sf = !1;
if (In) {
  var Fl;
  if (In) {
    var jl = "oninput" in document;
    if (!jl) {
      var Ga = document.createElement("div");
      Ga.setAttribute("oninput", "return;"), jl = typeof Ga.oninput == "function";
    }
    Fl = jl;
  } else Fl = !1;
  Sf = Fl && (!document.documentMode || 9 < document.documentMode);
}
function Za() {
  Sr && (Sr.detachEvent("onpropertychange", Ef), Mr = Sr = null);
}
function Ef(e) {
  if (e.propertyName === "value" && fl(Mr)) {
    var n = [];
    xf(n, Mr, e, Cu(e)), nf(tm, n);
  }
}
function im(e, n, t) {
  e === "focusin" ? (Za(), Sr = n, Mr = t, Sr.attachEvent("onpropertychange", Ef)) : e === "focusout" && Za();
}
function lm(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return fl(Mr);
}
function om(e, n) {
  if (e === "click") return fl(n);
}
function um(e, n) {
  if (e === "input" || e === "change") return fl(n);
}
function am(e, n) {
  return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
}
var fn = typeof Object.is == "function" ? Object.is : am;
function Fr(e, n) {
  if (fn(e, n)) return !0;
  if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
  var t = Object.keys(e), r = Object.keys(n);
  if (t.length !== r.length) return !1;
  for (r = 0; r < t.length; r++) {
    var i = t[r];
    if (!po.call(n, i) || !fn(e[i], n[i])) return !1;
  }
  return !0;
}
function Ja(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ba(e, n) {
  var t = Ja(e);
  e = 0;
  for (var r; t; ) {
    if (t.nodeType === 3) {
      if (r = e + t.textContent.length, e <= n && r >= n) return { node: t, offset: n - e };
      e = r;
    }
    e: {
      for (; t; ) {
        if (t.nextSibling) {
          t = t.nextSibling;
          break e;
        }
        t = t.parentNode;
      }
      t = void 0;
    }
    t = Ja(t);
  }
}
function Cf(e, n) {
  return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Cf(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
}
function Pf() {
  for (var e = window, n = Mi(); n instanceof e.HTMLIFrameElement; ) {
    try {
      var t = typeof n.contentWindow.location.href == "string";
    } catch {
      t = !1;
    }
    if (t) e = n.contentWindow;
    else break;
    n = Mi(e.document);
  }
  return n;
}
function Ru(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
}
function sm(e) {
  var n = Pf(), t = e.focusedElem, r = e.selectionRange;
  if (n !== t && t && t.ownerDocument && Cf(t.ownerDocument.documentElement, t)) {
    if (r !== null && Ru(t)) {
      if (n = r.start, e = r.end, e === void 0 && (e = n), "selectionStart" in t) t.selectionStart = n, t.selectionEnd = Math.min(e, t.value.length);
      else if (e = (n = t.ownerDocument || document) && n.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var i = t.textContent.length, l = Math.min(r.start, i);
        r = r.end === void 0 ? l : Math.min(r.end, i), !e.extend && l > r && (i = r, r = l, l = i), i = ba(t, l);
        var o = ba(
          t,
          r
        );
        i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (n = n.createRange(), n.setStart(i.node, i.offset), e.removeAllRanges(), l > r ? (e.addRange(n), e.extend(o.node, o.offset)) : (n.setEnd(o.node, o.offset), e.addRange(n)));
      }
    }
    for (n = [], e = t; e = e.parentNode; ) e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof t.focus == "function" && t.focus(), t = 0; t < n.length; t++) e = n[t], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var cm = In && "documentMode" in document && 11 >= document.documentMode, Tt = null, Oo = null, Er = null, Ro = !1;
function es(e, n, t) {
  var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
  Ro || Tt == null || Tt !== Mi(r) || (r = Tt, "selectionStart" in r && Ru(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Er && Fr(Er, r) || (Er = r, r = $i(Oo, "onSelect"), 0 < r.length && (n = new Nu("onSelect", "select", null, n, t), e.push({ event: n, listeners: r }), n.target = Tt)));
}
function ci(e, n) {
  var t = {};
  return t[e.toLowerCase()] = n.toLowerCase(), t["Webkit" + e] = "webkit" + n, t["Moz" + e] = "moz" + n, t;
}
var It = { animationend: ci("Animation", "AnimationEnd"), animationiteration: ci("Animation", "AnimationIteration"), animationstart: ci("Animation", "AnimationStart"), transitionend: ci("Transition", "TransitionEnd") }, Bl = {}, _f = {};
In && (_f = document.createElement("div").style, "AnimationEvent" in window || (delete It.animationend.animation, delete It.animationiteration.animation, delete It.animationstart.animation), "TransitionEvent" in window || delete It.transitionend.transition);
function pl(e) {
  if (Bl[e]) return Bl[e];
  if (!It[e]) return e;
  var n = It[e], t;
  for (t in n) if (n.hasOwnProperty(t) && t in _f) return Bl[e] = n[t];
  return e;
}
var Tf = pl("animationend"), If = pl("animationiteration"), zf = pl("animationstart"), Nf = pl("transitionend"), Lf = /* @__PURE__ */ new Map(), ns = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Jn(e, n) {
  Lf.set(e, n), gt(n, [e]);
}
for (var Ul = 0; Ul < ns.length; Ul++) {
  var Vl = ns[Ul], fm = Vl.toLowerCase(), pm = Vl[0].toUpperCase() + Vl.slice(1);
  Jn(fm, "on" + pm);
}
Jn(Tf, "onAnimationEnd");
Jn(If, "onAnimationIteration");
Jn(zf, "onAnimationStart");
Jn("dblclick", "onDoubleClick");
Jn("focusin", "onFocus");
Jn("focusout", "onBlur");
Jn(Nf, "onTransitionEnd");
Wt("onMouseEnter", ["mouseout", "mouseover"]);
Wt("onMouseLeave", ["mouseout", "mouseover"]);
Wt("onPointerEnter", ["pointerout", "pointerover"]);
Wt("onPointerLeave", ["pointerout", "pointerover"]);
gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
gt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var vr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), dm = new Set("cancel close invalid load scroll toggle".split(" ").concat(vr));
function ts(e, n, t) {
  var r = e.type || "unknown-event";
  e.currentTarget = t, fh(r, n, void 0, e), e.currentTarget = null;
}
function Of(e, n) {
  n = (n & 4) !== 0;
  for (var t = 0; t < e.length; t++) {
    var r = e[t], i = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (n) for (var o = r.length - 1; 0 <= o; o--) {
        var u = r[o], a = u.instance, s = u.currentTarget;
        if (u = u.listener, a !== l && i.isPropagationStopped()) break e;
        ts(i, u, s), l = a;
      }
      else for (o = 0; o < r.length; o++) {
        if (u = r[o], a = u.instance, s = u.currentTarget, u = u.listener, a !== l && i.isPropagationStopped()) break e;
        ts(i, u, s), l = a;
      }
    }
  }
  if (ji) throw e = Io, ji = !1, Io = null, e;
}
function ne(e, n) {
  var t = n[jo];
  t === void 0 && (t = n[jo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  t.has(r) || (Rf(n, e, 2, !1), t.add(r));
}
function Hl(e, n, t) {
  var r = 0;
  n && (r |= 4), Rf(t, e, r, n);
}
var fi = "_reactListening" + Math.random().toString(36).slice(2);
function jr(e) {
  if (!e[fi]) {
    e[fi] = !0, Bc.forEach(function(t) {
      t !== "selectionchange" && (dm.has(t) || Hl(t, !1, e), Hl(t, !0, e));
    });
    var n = e.nodeType === 9 ? e : e.ownerDocument;
    n === null || n[fi] || (n[fi] = !0, Hl("selectionchange", !1, n));
  }
}
function Rf(e, n, t, r) {
  switch (gf(n)) {
    case 1:
      var i = Th;
      break;
    case 4:
      i = Ih;
      break;
    default:
      i = Iu;
  }
  t = i.bind(null, n, t, e), i = void 0, !To || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(n, t, { capture: !0, passive: i }) : e.addEventListener(n, t, !0) : i !== void 0 ? e.addEventListener(n, t, { passive: i }) : e.addEventListener(n, t, !1);
}
function $l(e, n, t, r, i) {
  var l = r;
  if (!(n & 1) && !(n & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var u = r.stateNode.containerInfo;
      if (u === i || u.nodeType === 8 && u.parentNode === i) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var a = o.tag;
        if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === i || a.nodeType === 8 && a.parentNode === i)) return;
        o = o.return;
      }
      for (; u !== null; ) {
        if (o = ot(u), o === null) return;
        if (a = o.tag, a === 5 || a === 6) {
          r = l = o;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  nf(function() {
    var s = l, c = Cu(t), f = [];
    e: {
      var d = Lf.get(e);
      if (d !== void 0) {
        var p = Nu, k = e;
        switch (e) {
          case "keypress":
            if (_i(t) === 0) break e;
          case "keydown":
          case "keyup":
            p = $h;
            break;
          case "focusin":
            k = "focus", p = Ml;
            break;
          case "focusout":
            k = "blur", p = Ml;
            break;
          case "beforeblur":
          case "afterblur":
            p = Ml;
            break;
          case "click":
            if (t.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            p = Wa;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = Lh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = Kh;
            break;
          case Tf:
          case If:
          case zf:
            p = Dh;
            break;
          case Nf:
            p = Xh;
            break;
          case "scroll":
            p = zh;
            break;
          case "wheel":
            p = Gh;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = Mh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = Ka;
        }
        var w = (n & 4) !== 0, I = !w && e === "scroll", h = w ? d !== null ? d + "Capture" : null : d;
        w = [];
        for (var m = s, y; m !== null; ) {
          y = m;
          var S = y.stateNode;
          if (y.tag === 5 && S !== null && (y = S, h !== null && (S = Or(m, h), S != null && w.push(Br(m, S, y)))), I) break;
          m = m.return;
        }
        0 < w.length && (d = new p(d, k, null, t, c), f.push({ event: d, listeners: w }));
      }
    }
    if (!(n & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", d && t !== Po && (k = t.relatedTarget || t.fromElement) && (ot(k) || k[zn])) break e;
        if ((p || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, p ? (k = t.relatedTarget || t.toElement, p = s, k = k ? ot(k) : null, k !== null && (I = yt(k), k !== I || k.tag !== 5 && k.tag !== 6) && (k = null)) : (p = null, k = s), p !== k)) {
          if (w = Wa, S = "onMouseLeave", h = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (w = Ka, S = "onPointerLeave", h = "onPointerEnter", m = "pointer"), I = p == null ? d : zt(p), y = k == null ? d : zt(k), d = new w(S, m + "leave", p, t, c), d.target = I, d.relatedTarget = y, S = null, ot(c) === s && (w = new w(h, m + "enter", k, t, c), w.target = y, w.relatedTarget = I, S = w), I = S, p && k) n: {
            for (w = p, h = k, m = 0, y = w; y; y = St(y)) m++;
            for (y = 0, S = h; S; S = St(S)) y++;
            for (; 0 < m - y; ) w = St(w), m--;
            for (; 0 < y - m; ) h = St(h), y--;
            for (; m--; ) {
              if (w === h || h !== null && w === h.alternate) break n;
              w = St(w), h = St(h);
            }
            w = null;
          }
          else w = null;
          p !== null && rs(f, d, p, w, !1), k !== null && I !== null && rs(f, I, k, w, !0);
        }
      }
      e: {
        if (d = s ? zt(s) : window, p = d.nodeName && d.nodeName.toLowerCase(), p === "select" || p === "input" && d.type === "file") var C = rm;
        else if (qa(d)) if (Sf) C = um;
        else {
          C = lm;
          var x = im;
        }
        else (p = d.nodeName) && p.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (C = om);
        if (C && (C = C(e, s))) {
          xf(f, C, t, c);
          break e;
        }
        x && x(e, d, s), e === "focusout" && (x = d._wrapperState) && x.controlled && d.type === "number" && wo(d, "number", d.value);
      }
      switch (x = s ? zt(s) : window, e) {
        case "focusin":
          (qa(x) || x.contentEditable === "true") && (Tt = x, Oo = s, Er = null);
          break;
        case "focusout":
          Er = Oo = Tt = null;
          break;
        case "mousedown":
          Ro = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ro = !1, es(f, t, c);
          break;
        case "selectionchange":
          if (cm) break;
        case "keydown":
        case "keyup":
          es(f, t, c);
      }
      var T;
      if (Ou) e: {
        switch (e) {
          case "compositionstart":
            var L = "onCompositionStart";
            break e;
          case "compositionend":
            L = "onCompositionEnd";
            break e;
          case "compositionupdate":
            L = "onCompositionUpdate";
            break e;
        }
        L = void 0;
      }
      else _t ? kf(e, t) && (L = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (L = "onCompositionStart");
      L && (vf && t.locale !== "ko" && (_t || L !== "onCompositionStart" ? L === "onCompositionEnd" && _t && (T = yf()) : (Un = c, zu = "value" in Un ? Un.value : Un.textContent, _t = !0)), x = $i(s, L), 0 < x.length && (L = new Qa(L, e, null, t, c), f.push({ event: L, listeners: x }), T ? L.data = T : (T = wf(t), T !== null && (L.data = T)))), (T = Jh ? bh(e, t) : em(e, t)) && (s = $i(s, "onBeforeInput"), 0 < s.length && (c = new Qa("onBeforeInput", "beforeinput", null, t, c), f.push({ event: c, listeners: s }), c.data = T));
    }
    Of(f, n);
  });
}
function Br(e, n, t) {
  return { instance: e, listener: n, currentTarget: t };
}
function $i(e, n) {
  for (var t = n + "Capture", r = []; e !== null; ) {
    var i = e, l = i.stateNode;
    i.tag === 5 && l !== null && (i = l, l = Or(e, t), l != null && r.unshift(Br(e, l, i)), l = Or(e, n), l != null && r.push(Br(e, l, i))), e = e.return;
  }
  return r;
}
function St(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function rs(e, n, t, r, i) {
  for (var l = n._reactName, o = []; t !== null && t !== r; ) {
    var u = t, a = u.alternate, s = u.stateNode;
    if (a !== null && a === r) break;
    u.tag === 5 && s !== null && (u = s, i ? (a = Or(t, l), a != null && o.unshift(Br(t, a, u))) : i || (a = Or(t, l), a != null && o.push(Br(t, a, u)))), t = t.return;
  }
  o.length !== 0 && e.push({ event: n, listeners: o });
}
var hm = /\r\n?/g, mm = /\u0000|\uFFFD/g;
function is(e) {
  return (typeof e == "string" ? e : "" + e).replace(hm, `
`).replace(mm, "");
}
function pi(e, n, t) {
  if (n = is(n), is(e) !== n && t) throw Error(P(425));
}
function Wi() {
}
var Do = null, Ao = null;
function Mo(e, n) {
  return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
}
var Fo = typeof setTimeout == "function" ? setTimeout : void 0, gm = typeof clearTimeout == "function" ? clearTimeout : void 0, ls = typeof Promise == "function" ? Promise : void 0, ym = typeof queueMicrotask == "function" ? queueMicrotask : typeof ls < "u" ? function(e) {
  return ls.resolve(null).then(e).catch(vm);
} : Fo;
function vm(e) {
  setTimeout(function() {
    throw e;
  });
}
function Wl(e, n) {
  var t = n, r = 0;
  do {
    var i = t.nextSibling;
    if (e.removeChild(t), i && i.nodeType === 8) if (t = i.data, t === "/$") {
      if (r === 0) {
        e.removeChild(i), Ar(n);
        return;
      }
      r--;
    } else t !== "$" && t !== "$?" && t !== "$!" || r++;
    t = i;
  } while (t);
  Ar(n);
}
function Qn(e) {
  for (; e != null; e = e.nextSibling) {
    var n = e.nodeType;
    if (n === 1 || n === 3) break;
    if (n === 8) {
      if (n = e.data, n === "$" || n === "$!" || n === "$?") break;
      if (n === "/$") return null;
    }
  }
  return e;
}
function os(e) {
  e = e.previousSibling;
  for (var n = 0; e; ) {
    if (e.nodeType === 8) {
      var t = e.data;
      if (t === "$" || t === "$!" || t === "$?") {
        if (n === 0) return e;
        n--;
      } else t === "/$" && n++;
    }
    e = e.previousSibling;
  }
  return null;
}
var bt = Math.random().toString(36).slice(2), gn = "__reactFiber$" + bt, Ur = "__reactProps$" + bt, zn = "__reactContainer$" + bt, jo = "__reactEvents$" + bt, km = "__reactListeners$" + bt, wm = "__reactHandles$" + bt;
function ot(e) {
  var n = e[gn];
  if (n) return n;
  for (var t = e.parentNode; t; ) {
    if (n = t[zn] || t[gn]) {
      if (t = n.alternate, n.child !== null || t !== null && t.child !== null) for (e = os(e); e !== null; ) {
        if (t = e[gn]) return t;
        e = os(e);
      }
      return n;
    }
    e = t, t = e.parentNode;
  }
  return null;
}
function Zr(e) {
  return e = e[gn] || e[zn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function zt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(P(33));
}
function dl(e) {
  return e[Ur] || null;
}
var Bo = [], Nt = -1;
function bn(e) {
  return { current: e };
}
function te(e) {
  0 > Nt || (e.current = Bo[Nt], Bo[Nt] = null, Nt--);
}
function J(e, n) {
  Nt++, Bo[Nt] = e.current, e.current = n;
}
var Zn = {}, _e = bn(Zn), Ae = bn(!1), ft = Zn;
function Qt(e, n) {
  var t = e.type.contextTypes;
  if (!t) return Zn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) return r.__reactInternalMemoizedMaskedChildContext;
  var i = {}, l;
  for (l in t) i[l] = n[l];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = i), i;
}
function Me(e) {
  return e = e.childContextTypes, e != null;
}
function Qi() {
  te(Ae), te(_e);
}
function us(e, n, t) {
  if (_e.current !== Zn) throw Error(P(168));
  J(_e, n), J(Ae, t);
}
function Df(e, n, t) {
  var r = e.stateNode;
  if (n = n.childContextTypes, typeof r.getChildContext != "function") return t;
  r = r.getChildContext();
  for (var i in r) if (!(i in n)) throw Error(P(108, ih(e) || "Unknown", i));
  return ae({}, t, r);
}
function Ki(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Zn, ft = _e.current, J(_e, e), J(Ae, Ae.current), !0;
}
function as(e, n, t) {
  var r = e.stateNode;
  if (!r) throw Error(P(169));
  t ? (e = Df(e, n, ft), r.__reactInternalMemoizedMergedChildContext = e, te(Ae), te(_e), J(_e, e)) : te(Ae), J(Ae, t);
}
var Cn = null, hl = !1, Ql = !1;
function Af(e) {
  Cn === null ? Cn = [e] : Cn.push(e);
}
function xm(e) {
  hl = !0, Af(e);
}
function et() {
  if (!Ql && Cn !== null) {
    Ql = !0;
    var e = 0, n = X;
    try {
      var t = Cn;
      for (X = 1; e < t.length; e++) {
        var r = t[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Cn = null, hl = !1;
    } catch (i) {
      throw Cn !== null && (Cn = Cn.slice(e + 1)), of(Pu, et), i;
    } finally {
      X = n, Ql = !1;
    }
  }
  return null;
}
var Lt = [], Ot = 0, Yi = null, Xi = 0, Xe = [], qe = 0, pt = null, Pn = 1, _n = "";
function rt(e, n) {
  Lt[Ot++] = Xi, Lt[Ot++] = Yi, Yi = e, Xi = n;
}
function Mf(e, n, t) {
  Xe[qe++] = Pn, Xe[qe++] = _n, Xe[qe++] = pt, pt = e;
  var r = Pn;
  e = _n;
  var i = 32 - sn(r) - 1;
  r &= ~(1 << i), t += 1;
  var l = 32 - sn(n) + i;
  if (30 < l) {
    var o = i - i % 5;
    l = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Pn = 1 << 32 - sn(n) + i | t << i | r, _n = l + e;
  } else Pn = 1 << l | t << i | r, _n = e;
}
function Du(e) {
  e.return !== null && (rt(e, 1), Mf(e, 1, 0));
}
function Au(e) {
  for (; e === Yi; ) Yi = Lt[--Ot], Lt[Ot] = null, Xi = Lt[--Ot], Lt[Ot] = null;
  for (; e === pt; ) pt = Xe[--qe], Xe[qe] = null, _n = Xe[--qe], Xe[qe] = null, Pn = Xe[--qe], Xe[qe] = null;
}
var We = null, He = null, ie = !1, an = null;
function Ff(e, n) {
  var t = Ze(5, null, null, 0);
  t.elementType = "DELETED", t.stateNode = n, t.return = e, n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t);
}
function ss(e, n) {
  switch (e.tag) {
    case 5:
      var t = e.type;
      return n = n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, We = e, He = Qn(n.firstChild), !0) : !1;
    case 6:
      return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, We = e, He = null, !0) : !1;
    case 13:
      return n = n.nodeType !== 8 ? null : n, n !== null ? (t = pt !== null ? { id: Pn, overflow: _n } : null, e.memoizedState = { dehydrated: n, treeContext: t, retryLane: 1073741824 }, t = Ze(18, null, null, 0), t.stateNode = n, t.return = e, e.child = t, We = e, He = null, !0) : !1;
    default:
      return !1;
  }
}
function Uo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Vo(e) {
  if (ie) {
    var n = He;
    if (n) {
      var t = n;
      if (!ss(e, n)) {
        if (Uo(e)) throw Error(P(418));
        n = Qn(t.nextSibling);
        var r = We;
        n && ss(e, n) ? Ff(r, t) : (e.flags = e.flags & -4097 | 2, ie = !1, We = e);
      }
    } else {
      if (Uo(e)) throw Error(P(418));
      e.flags = e.flags & -4097 | 2, ie = !1, We = e;
    }
  }
}
function cs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  We = e;
}
function di(e) {
  if (e !== We) return !1;
  if (!ie) return cs(e), ie = !0, !1;
  var n;
  if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !Mo(e.type, e.memoizedProps)), n && (n = He)) {
    if (Uo(e)) throw jf(), Error(P(418));
    for (; n; ) Ff(e, n), n = Qn(n.nextSibling);
  }
  if (cs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(P(317));
    e: {
      for (e = e.nextSibling, n = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (t === "/$") {
            if (n === 0) {
              He = Qn(e.nextSibling);
              break e;
            }
            n--;
          } else t !== "$" && t !== "$!" && t !== "$?" || n++;
        }
        e = e.nextSibling;
      }
      He = null;
    }
  } else He = We ? Qn(e.stateNode.nextSibling) : null;
  return !0;
}
function jf() {
  for (var e = He; e; ) e = Qn(e.nextSibling);
}
function Kt() {
  He = We = null, ie = !1;
}
function Mu(e) {
  an === null ? an = [e] : an.push(e);
}
var Sm = On.ReactCurrentBatchConfig;
function sr(e, n, t) {
  if (e = t.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (t._owner) {
      if (t = t._owner, t) {
        if (t.tag !== 1) throw Error(P(309));
        var r = t.stateNode;
      }
      if (!r) throw Error(P(147, e));
      var i = r, l = "" + e;
      return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === l ? n.ref : (n = function(o) {
        var u = i.refs;
        o === null ? delete u[l] : u[l] = o;
      }, n._stringRef = l, n);
    }
    if (typeof e != "string") throw Error(P(284));
    if (!t._owner) throw Error(P(290, e));
  }
  return e;
}
function hi(e, n) {
  throw e = Object.prototype.toString.call(n), Error(P(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
}
function fs(e) {
  var n = e._init;
  return n(e._payload);
}
function Bf(e) {
  function n(h, m) {
    if (e) {
      var y = h.deletions;
      y === null ? (h.deletions = [m], h.flags |= 16) : y.push(m);
    }
  }
  function t(h, m) {
    if (!e) return null;
    for (; m !== null; ) n(h, m), m = m.sibling;
    return null;
  }
  function r(h, m) {
    for (h = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? h.set(m.key, m) : h.set(m.index, m), m = m.sibling;
    return h;
  }
  function i(h, m) {
    return h = qn(h, m), h.index = 0, h.sibling = null, h;
  }
  function l(h, m, y) {
    return h.index = y, e ? (y = h.alternate, y !== null ? (y = y.index, y < m ? (h.flags |= 2, m) : y) : (h.flags |= 2, m)) : (h.flags |= 1048576, m);
  }
  function o(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function u(h, m, y, S) {
    return m === null || m.tag !== 6 ? (m = Jl(y, h.mode, S), m.return = h, m) : (m = i(m, y), m.return = h, m);
  }
  function a(h, m, y, S) {
    var C = y.type;
    return C === Pt ? c(h, m, y.props.children, S, y.key) : m !== null && (m.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Mn && fs(C) === m.type) ? (S = i(m, y.props), S.ref = sr(h, m, y), S.return = h, S) : (S = Ri(y.type, y.key, y.props, null, h.mode, S), S.ref = sr(h, m, y), S.return = h, S);
  }
  function s(h, m, y, S) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== y.containerInfo || m.stateNode.implementation !== y.implementation ? (m = bl(y, h.mode, S), m.return = h, m) : (m = i(m, y.children || []), m.return = h, m);
  }
  function c(h, m, y, S, C) {
    return m === null || m.tag !== 7 ? (m = ct(y, h.mode, S, C), m.return = h, m) : (m = i(m, y), m.return = h, m);
  }
  function f(h, m, y) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = Jl("" + m, h.mode, y), m.return = h, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case ri:
          return y = Ri(m.type, m.key, m.props, null, h.mode, y), y.ref = sr(h, null, m), y.return = h, y;
        case Ct:
          return m = bl(m, h.mode, y), m.return = h, m;
        case Mn:
          var S = m._init;
          return f(h, S(m._payload), y);
      }
      if (gr(m) || ir(m)) return m = ct(m, h.mode, y, null), m.return = h, m;
      hi(h, m);
    }
    return null;
  }
  function d(h, m, y, S) {
    var C = m !== null ? m.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number") return C !== null ? null : u(h, m, "" + y, S);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ri:
          return y.key === C ? a(h, m, y, S) : null;
        case Ct:
          return y.key === C ? s(h, m, y, S) : null;
        case Mn:
          return C = y._init, d(
            h,
            m,
            C(y._payload),
            S
          );
      }
      if (gr(y) || ir(y)) return C !== null ? null : c(h, m, y, S, null);
      hi(h, y);
    }
    return null;
  }
  function p(h, m, y, S, C) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return h = h.get(y) || null, u(m, h, "" + S, C);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case ri:
          return h = h.get(S.key === null ? y : S.key) || null, a(m, h, S, C);
        case Ct:
          return h = h.get(S.key === null ? y : S.key) || null, s(m, h, S, C);
        case Mn:
          var x = S._init;
          return p(h, m, y, x(S._payload), C);
      }
      if (gr(S) || ir(S)) return h = h.get(y) || null, c(m, h, S, C, null);
      hi(m, S);
    }
    return null;
  }
  function k(h, m, y, S) {
    for (var C = null, x = null, T = m, L = m = 0, F = null; T !== null && L < y.length; L++) {
      T.index > L ? (F = T, T = null) : F = T.sibling;
      var R = d(h, T, y[L], S);
      if (R === null) {
        T === null && (T = F);
        break;
      }
      e && T && R.alternate === null && n(h, T), m = l(R, m, L), x === null ? C = R : x.sibling = R, x = R, T = F;
    }
    if (L === y.length) return t(h, T), ie && rt(h, L), C;
    if (T === null) {
      for (; L < y.length; L++) T = f(h, y[L], S), T !== null && (m = l(T, m, L), x === null ? C = T : x.sibling = T, x = T);
      return ie && rt(h, L), C;
    }
    for (T = r(h, T); L < y.length; L++) F = p(T, h, L, y[L], S), F !== null && (e && F.alternate !== null && T.delete(F.key === null ? L : F.key), m = l(F, m, L), x === null ? C = F : x.sibling = F, x = F);
    return e && T.forEach(function(D) {
      return n(h, D);
    }), ie && rt(h, L), C;
  }
  function w(h, m, y, S) {
    var C = ir(y);
    if (typeof C != "function") throw Error(P(150));
    if (y = C.call(y), y == null) throw Error(P(151));
    for (var x = C = null, T = m, L = m = 0, F = null, R = y.next(); T !== null && !R.done; L++, R = y.next()) {
      T.index > L ? (F = T, T = null) : F = T.sibling;
      var D = d(h, T, R.value, S);
      if (D === null) {
        T === null && (T = F);
        break;
      }
      e && T && D.alternate === null && n(h, T), m = l(D, m, L), x === null ? C = D : x.sibling = D, x = D, T = F;
    }
    if (R.done) return t(
      h,
      T
    ), ie && rt(h, L), C;
    if (T === null) {
      for (; !R.done; L++, R = y.next()) R = f(h, R.value, S), R !== null && (m = l(R, m, L), x === null ? C = R : x.sibling = R, x = R);
      return ie && rt(h, L), C;
    }
    for (T = r(h, T); !R.done; L++, R = y.next()) R = p(T, h, L, R.value, S), R !== null && (e && R.alternate !== null && T.delete(R.key === null ? L : R.key), m = l(R, m, L), x === null ? C = R : x.sibling = R, x = R);
    return e && T.forEach(function(A) {
      return n(h, A);
    }), ie && rt(h, L), C;
  }
  function I(h, m, y, S) {
    if (typeof y == "object" && y !== null && y.type === Pt && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ri:
          e: {
            for (var C = y.key, x = m; x !== null; ) {
              if (x.key === C) {
                if (C = y.type, C === Pt) {
                  if (x.tag === 7) {
                    t(h, x.sibling), m = i(x, y.props.children), m.return = h, h = m;
                    break e;
                  }
                } else if (x.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Mn && fs(C) === x.type) {
                  t(h, x.sibling), m = i(x, y.props), m.ref = sr(h, x, y), m.return = h, h = m;
                  break e;
                }
                t(h, x);
                break;
              } else n(h, x);
              x = x.sibling;
            }
            y.type === Pt ? (m = ct(y.props.children, h.mode, S, y.key), m.return = h, h = m) : (S = Ri(y.type, y.key, y.props, null, h.mode, S), S.ref = sr(h, m, y), S.return = h, h = S);
          }
          return o(h);
        case Ct:
          e: {
            for (x = y.key; m !== null; ) {
              if (m.key === x) if (m.tag === 4 && m.stateNode.containerInfo === y.containerInfo && m.stateNode.implementation === y.implementation) {
                t(h, m.sibling), m = i(m, y.children || []), m.return = h, h = m;
                break e;
              } else {
                t(h, m);
                break;
              }
              else n(h, m);
              m = m.sibling;
            }
            m = bl(y, h.mode, S), m.return = h, h = m;
          }
          return o(h);
        case Mn:
          return x = y._init, I(h, m, x(y._payload), S);
      }
      if (gr(y)) return k(h, m, y, S);
      if (ir(y)) return w(h, m, y, S);
      hi(h, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, m !== null && m.tag === 6 ? (t(h, m.sibling), m = i(m, y), m.return = h, h = m) : (t(h, m), m = Jl(y, h.mode, S), m.return = h, h = m), o(h)) : t(h, m);
  }
  return I;
}
var Yt = Bf(!0), Uf = Bf(!1), qi = bn(null), Gi = null, Rt = null, Fu = null;
function ju() {
  Fu = Rt = Gi = null;
}
function Bu(e) {
  var n = qi.current;
  te(qi), e._currentValue = n;
}
function Ho(e, n, t) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === t) break;
    e = e.return;
  }
}
function Ut(e, n) {
  Gi = e, Fu = Rt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & n && (De = !0), e.firstContext = null);
}
function be(e) {
  var n = e._currentValue;
  if (Fu !== e) if (e = { context: e, memoizedValue: n, next: null }, Rt === null) {
    if (Gi === null) throw Error(P(308));
    Rt = e, Gi.dependencies = { lanes: 0, firstContext: e };
  } else Rt = Rt.next = e;
  return n;
}
var ut = null;
function Uu(e) {
  ut === null ? ut = [e] : ut.push(e);
}
function Vf(e, n, t, r) {
  var i = n.interleaved;
  return i === null ? (t.next = t, Uu(n)) : (t.next = i.next, i.next = t), n.interleaved = t, Nn(e, r);
}
function Nn(e, n) {
  e.lanes |= n;
  var t = e.alternate;
  for (t !== null && (t.lanes |= n), t = e, e = e.return; e !== null; ) e.childLanes |= n, t = e.alternate, t !== null && (t.childLanes |= n), t = e, e = e.return;
  return t.tag === 3 ? t.stateNode : null;
}
var Fn = !1;
function Vu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Hf(e, n) {
  e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Tn(e, n) {
  return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
}
function Kn(e, n, t) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, Q & 2) {
    var i = r.pending;
    return i === null ? n.next = n : (n.next = i.next, i.next = n), r.pending = n, Nn(e, t);
  }
  return i = r.interleaved, i === null ? (n.next = n, Uu(r)) : (n.next = i.next, i.next = n), r.interleaved = n, Nn(e, t);
}
function Ti(e, n, t) {
  if (n = n.updateQueue, n !== null && (n = n.shared, (t & 4194240) !== 0)) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, _u(e, t);
  }
}
function ps(e, n) {
  var t = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, t === r)) {
    var i = null, l = null;
    if (t = t.firstBaseUpdate, t !== null) {
      do {
        var o = { eventTime: t.eventTime, lane: t.lane, tag: t.tag, payload: t.payload, callback: t.callback, next: null };
        l === null ? i = l = o : l = l.next = o, t = t.next;
      } while (t !== null);
      l === null ? i = l = n : l = l.next = n;
    } else i = l = n;
    t = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: l, shared: r.shared, effects: r.effects }, e.updateQueue = t;
    return;
  }
  e = t.lastBaseUpdate, e === null ? t.firstBaseUpdate = n : e.next = n, t.lastBaseUpdate = n;
}
function Zi(e, n, t, r) {
  var i = e.updateQueue;
  Fn = !1;
  var l = i.firstBaseUpdate, o = i.lastBaseUpdate, u = i.shared.pending;
  if (u !== null) {
    i.shared.pending = null;
    var a = u, s = a.next;
    a.next = null, o === null ? l = s : o.next = s, o = a;
    var c = e.alternate;
    c !== null && (c = c.updateQueue, u = c.lastBaseUpdate, u !== o && (u === null ? c.firstBaseUpdate = s : u.next = s, c.lastBaseUpdate = a));
  }
  if (l !== null) {
    var f = i.baseState;
    o = 0, c = s = a = null, u = l;
    do {
      var d = u.lane, p = u.eventTime;
      if ((r & d) === d) {
        c !== null && (c = c.next = {
          eventTime: p,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var k = e, w = u;
          switch (d = n, p = t, w.tag) {
            case 1:
              if (k = w.payload, typeof k == "function") {
                f = k.call(p, f, d);
                break e;
              }
              f = k;
              break e;
            case 3:
              k.flags = k.flags & -65537 | 128;
            case 0:
              if (k = w.payload, d = typeof k == "function" ? k.call(p, f, d) : k, d == null) break e;
              f = ae({}, f, d);
              break e;
            case 2:
              Fn = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, d = i.effects, d === null ? i.effects = [u] : d.push(u));
      } else p = { eventTime: p, lane: d, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, c === null ? (s = c = p, a = f) : c = c.next = p, o |= d;
      if (u = u.next, u === null) {
        if (u = i.shared.pending, u === null) break;
        d = u, u = d.next, d.next = null, i.lastBaseUpdate = d, i.shared.pending = null;
      }
    } while (!0);
    if (c === null && (a = f), i.baseState = a, i.firstBaseUpdate = s, i.lastBaseUpdate = c, n = i.shared.interleaved, n !== null) {
      i = n;
      do
        o |= i.lane, i = i.next;
      while (i !== n);
    } else l === null && (i.shared.lanes = 0);
    ht |= o, e.lanes = o, e.memoizedState = f;
  }
}
function ds(e, n, t) {
  if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
    var r = e[n], i = r.callback;
    if (i !== null) {
      if (r.callback = null, r = t, typeof i != "function") throw Error(P(191, i));
      i.call(r);
    }
  }
}
var Jr = {}, kn = bn(Jr), Vr = bn(Jr), Hr = bn(Jr);
function at(e) {
  if (e === Jr) throw Error(P(174));
  return e;
}
function Hu(e, n) {
  switch (J(Hr, n), J(Vr, e), J(kn, Jr), e = n.nodeType, e) {
    case 9:
    case 11:
      n = (n = n.documentElement) ? n.namespaceURI : So(null, "");
      break;
    default:
      e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = So(n, e);
  }
  te(kn), J(kn, n);
}
function Xt() {
  te(kn), te(Vr), te(Hr);
}
function $f(e) {
  at(Hr.current);
  var n = at(kn.current), t = So(n, e.type);
  n !== t && (J(Vr, e), J(kn, t));
}
function $u(e) {
  Vr.current === e && (te(kn), te(Vr));
}
var oe = bn(0);
function Ji(e) {
  for (var n = e; n !== null; ) {
    if (n.tag === 13) {
      var t = n.memoizedState;
      if (t !== null && (t = t.dehydrated, t === null || t.data === "$?" || t.data === "$!")) return n;
    } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
      if (n.flags & 128) return n;
    } else if (n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e) return null;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
  return null;
}
var Kl = [];
function Wu() {
  for (var e = 0; e < Kl.length; e++) Kl[e]._workInProgressVersionPrimary = null;
  Kl.length = 0;
}
var Ii = On.ReactCurrentDispatcher, Yl = On.ReactCurrentBatchConfig, dt = 0, ue = null, ge = null, ve = null, bi = !1, Cr = !1, $r = 0, Em = 0;
function Ee() {
  throw Error(P(321));
}
function Qu(e, n) {
  if (n === null) return !1;
  for (var t = 0; t < n.length && t < e.length; t++) if (!fn(e[t], n[t])) return !1;
  return !0;
}
function Ku(e, n, t, r, i, l) {
  if (dt = l, ue = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, Ii.current = e === null || e.memoizedState === null ? Tm : Im, e = t(r, i), Cr) {
    l = 0;
    do {
      if (Cr = !1, $r = 0, 25 <= l) throw Error(P(301));
      l += 1, ve = ge = null, n.updateQueue = null, Ii.current = zm, e = t(r, i);
    } while (Cr);
  }
  if (Ii.current = el, n = ge !== null && ge.next !== null, dt = 0, ve = ge = ue = null, bi = !1, n) throw Error(P(300));
  return e;
}
function Yu() {
  var e = $r !== 0;
  return $r = 0, e;
}
function hn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ve === null ? ue.memoizedState = ve = e : ve = ve.next = e, ve;
}
function en() {
  if (ge === null) {
    var e = ue.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ge.next;
  var n = ve === null ? ue.memoizedState : ve.next;
  if (n !== null) ve = n, ge = e;
  else {
    if (e === null) throw Error(P(310));
    ge = e, e = { memoizedState: ge.memoizedState, baseState: ge.baseState, baseQueue: ge.baseQueue, queue: ge.queue, next: null }, ve === null ? ue.memoizedState = ve = e : ve = ve.next = e;
  }
  return ve;
}
function Wr(e, n) {
  return typeof n == "function" ? n(e) : n;
}
function Xl(e) {
  var n = en(), t = n.queue;
  if (t === null) throw Error(P(311));
  t.lastRenderedReducer = e;
  var r = ge, i = r.baseQueue, l = t.pending;
  if (l !== null) {
    if (i !== null) {
      var o = i.next;
      i.next = l.next, l.next = o;
    }
    r.baseQueue = i = l, t.pending = null;
  }
  if (i !== null) {
    l = i.next, r = r.baseState;
    var u = o = null, a = null, s = l;
    do {
      var c = s.lane;
      if ((dt & c) === c) a !== null && (a = a.next = { lane: 0, action: s.action, hasEagerState: s.hasEagerState, eagerState: s.eagerState, next: null }), r = s.hasEagerState ? s.eagerState : e(r, s.action);
      else {
        var f = {
          lane: c,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null
        };
        a === null ? (u = a = f, o = r) : a = a.next = f, ue.lanes |= c, ht |= c;
      }
      s = s.next;
    } while (s !== null && s !== l);
    a === null ? o = r : a.next = u, fn(r, n.memoizedState) || (De = !0), n.memoizedState = r, n.baseState = o, n.baseQueue = a, t.lastRenderedState = r;
  }
  if (e = t.interleaved, e !== null) {
    i = e;
    do
      l = i.lane, ue.lanes |= l, ht |= l, i = i.next;
    while (i !== e);
  } else i === null && (t.lanes = 0);
  return [n.memoizedState, t.dispatch];
}
function ql(e) {
  var n = en(), t = n.queue;
  if (t === null) throw Error(P(311));
  t.lastRenderedReducer = e;
  var r = t.dispatch, i = t.pending, l = n.memoizedState;
  if (i !== null) {
    t.pending = null;
    var o = i = i.next;
    do
      l = e(l, o.action), o = o.next;
    while (o !== i);
    fn(l, n.memoizedState) || (De = !0), n.memoizedState = l, n.baseQueue === null && (n.baseState = l), t.lastRenderedState = l;
  }
  return [l, r];
}
function Wf() {
}
function Qf(e, n) {
  var t = ue, r = en(), i = n(), l = !fn(r.memoizedState, i);
  if (l && (r.memoizedState = i, De = !0), r = r.queue, Xu(Xf.bind(null, t, r, e), [e]), r.getSnapshot !== n || l || ve !== null && ve.memoizedState.tag & 1) {
    if (t.flags |= 2048, Qr(9, Yf.bind(null, t, r, i, n), void 0, null), ke === null) throw Error(P(349));
    dt & 30 || Kf(t, n, i);
  }
  return i;
}
function Kf(e, n, t) {
  e.flags |= 16384, e = { getSnapshot: n, value: t }, n = ue.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, ue.updateQueue = n, n.stores = [e]) : (t = n.stores, t === null ? n.stores = [e] : t.push(e));
}
function Yf(e, n, t, r) {
  n.value = t, n.getSnapshot = r, qf(n) && Gf(e);
}
function Xf(e, n, t) {
  return t(function() {
    qf(n) && Gf(e);
  });
}
function qf(e) {
  var n = e.getSnapshot;
  e = e.value;
  try {
    var t = n();
    return !fn(e, t);
  } catch {
    return !0;
  }
}
function Gf(e) {
  var n = Nn(e, 1);
  n !== null && cn(n, e, 1, -1);
}
function hs(e) {
  var n = hn();
  return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Wr, lastRenderedState: e }, n.queue = e, e = e.dispatch = _m.bind(null, ue, e), [n.memoizedState, e];
}
function Qr(e, n, t, r) {
  return e = { tag: e, create: n, destroy: t, deps: r, next: null }, n = ue.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, ue.updateQueue = n, n.lastEffect = e.next = e) : (t = n.lastEffect, t === null ? n.lastEffect = e.next = e : (r = t.next, t.next = e, e.next = r, n.lastEffect = e)), e;
}
function Zf() {
  return en().memoizedState;
}
function zi(e, n, t, r) {
  var i = hn();
  ue.flags |= e, i.memoizedState = Qr(1 | n, t, void 0, r === void 0 ? null : r);
}
function ml(e, n, t, r) {
  var i = en();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (ge !== null) {
    var o = ge.memoizedState;
    if (l = o.destroy, r !== null && Qu(r, o.deps)) {
      i.memoizedState = Qr(n, t, l, r);
      return;
    }
  }
  ue.flags |= e, i.memoizedState = Qr(1 | n, t, l, r);
}
function ms(e, n) {
  return zi(8390656, 8, e, n);
}
function Xu(e, n) {
  return ml(2048, 8, e, n);
}
function Jf(e, n) {
  return ml(4, 2, e, n);
}
function bf(e, n) {
  return ml(4, 4, e, n);
}
function ep(e, n) {
  if (typeof n == "function") return e = e(), n(e), function() {
    n(null);
  };
  if (n != null) return e = e(), n.current = e, function() {
    n.current = null;
  };
}
function np(e, n, t) {
  return t = t != null ? t.concat([e]) : null, ml(4, 4, ep.bind(null, n, e), t);
}
function qu() {
}
function tp(e, n) {
  var t = en();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && Qu(n, r[1]) ? r[0] : (t.memoizedState = [e, n], e);
}
function rp(e, n) {
  var t = en();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && Qu(n, r[1]) ? r[0] : (e = e(), t.memoizedState = [e, n], e);
}
function ip(e, n, t) {
  return dt & 21 ? (fn(t, n) || (t = sf(), ue.lanes |= t, ht |= t, e.baseState = !0), n) : (e.baseState && (e.baseState = !1, De = !0), e.memoizedState = t);
}
function Cm(e, n) {
  var t = X;
  X = t !== 0 && 4 > t ? t : 4, e(!0);
  var r = Yl.transition;
  Yl.transition = {};
  try {
    e(!1), n();
  } finally {
    X = t, Yl.transition = r;
  }
}
function lp() {
  return en().memoizedState;
}
function Pm(e, n, t) {
  var r = Xn(e);
  if (t = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null }, op(e)) up(n, t);
  else if (t = Vf(e, n, t, r), t !== null) {
    var i = ze();
    cn(t, e, r, i), ap(t, n, r);
  }
}
function _m(e, n, t) {
  var r = Xn(e), i = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null };
  if (op(e)) up(n, i);
  else {
    var l = e.alternate;
    if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = n.lastRenderedReducer, l !== null)) try {
      var o = n.lastRenderedState, u = l(o, t);
      if (i.hasEagerState = !0, i.eagerState = u, fn(u, o)) {
        var a = n.interleaved;
        a === null ? (i.next = i, Uu(n)) : (i.next = a.next, a.next = i), n.interleaved = i;
        return;
      }
    } catch {
    } finally {
    }
    t = Vf(e, n, i, r), t !== null && (i = ze(), cn(t, e, r, i), ap(t, n, r));
  }
}
function op(e) {
  var n = e.alternate;
  return e === ue || n !== null && n === ue;
}
function up(e, n) {
  Cr = bi = !0;
  var t = e.pending;
  t === null ? n.next = n : (n.next = t.next, t.next = n), e.pending = n;
}
function ap(e, n, t) {
  if (t & 4194240) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, _u(e, t);
  }
}
var el = { readContext: be, useCallback: Ee, useContext: Ee, useEffect: Ee, useImperativeHandle: Ee, useInsertionEffect: Ee, useLayoutEffect: Ee, useMemo: Ee, useReducer: Ee, useRef: Ee, useState: Ee, useDebugValue: Ee, useDeferredValue: Ee, useTransition: Ee, useMutableSource: Ee, useSyncExternalStore: Ee, useId: Ee, unstable_isNewReconciler: !1 }, Tm = { readContext: be, useCallback: function(e, n) {
  return hn().memoizedState = [e, n === void 0 ? null : n], e;
}, useContext: be, useEffect: ms, useImperativeHandle: function(e, n, t) {
  return t = t != null ? t.concat([e]) : null, zi(
    4194308,
    4,
    ep.bind(null, n, e),
    t
  );
}, useLayoutEffect: function(e, n) {
  return zi(4194308, 4, e, n);
}, useInsertionEffect: function(e, n) {
  return zi(4, 2, e, n);
}, useMemo: function(e, n) {
  var t = hn();
  return n = n === void 0 ? null : n, e = e(), t.memoizedState = [e, n], e;
}, useReducer: function(e, n, t) {
  var r = hn();
  return n = t !== void 0 ? t(n) : n, r.memoizedState = r.baseState = n, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: n }, r.queue = e, e = e.dispatch = Pm.bind(null, ue, e), [r.memoizedState, e];
}, useRef: function(e) {
  var n = hn();
  return e = { current: e }, n.memoizedState = e;
}, useState: hs, useDebugValue: qu, useDeferredValue: function(e) {
  return hn().memoizedState = e;
}, useTransition: function() {
  var e = hs(!1), n = e[0];
  return e = Cm.bind(null, e[1]), hn().memoizedState = e, [n, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, n, t) {
  var r = ue, i = hn();
  if (ie) {
    if (t === void 0) throw Error(P(407));
    t = t();
  } else {
    if (t = n(), ke === null) throw Error(P(349));
    dt & 30 || Kf(r, n, t);
  }
  i.memoizedState = t;
  var l = { value: t, getSnapshot: n };
  return i.queue = l, ms(Xf.bind(
    null,
    r,
    l,
    e
  ), [e]), r.flags |= 2048, Qr(9, Yf.bind(null, r, l, t, n), void 0, null), t;
}, useId: function() {
  var e = hn(), n = ke.identifierPrefix;
  if (ie) {
    var t = _n, r = Pn;
    t = (r & ~(1 << 32 - sn(r) - 1)).toString(32) + t, n = ":" + n + "R" + t, t = $r++, 0 < t && (n += "H" + t.toString(32)), n += ":";
  } else t = Em++, n = ":" + n + "r" + t.toString(32) + ":";
  return e.memoizedState = n;
}, unstable_isNewReconciler: !1 }, Im = {
  readContext: be,
  useCallback: tp,
  useContext: be,
  useEffect: Xu,
  useImperativeHandle: np,
  useInsertionEffect: Jf,
  useLayoutEffect: bf,
  useMemo: rp,
  useReducer: Xl,
  useRef: Zf,
  useState: function() {
    return Xl(Wr);
  },
  useDebugValue: qu,
  useDeferredValue: function(e) {
    var n = en();
    return ip(n, ge.memoizedState, e);
  },
  useTransition: function() {
    var e = Xl(Wr)[0], n = en().memoizedState;
    return [e, n];
  },
  useMutableSource: Wf,
  useSyncExternalStore: Qf,
  useId: lp,
  unstable_isNewReconciler: !1
}, zm = { readContext: be, useCallback: tp, useContext: be, useEffect: Xu, useImperativeHandle: np, useInsertionEffect: Jf, useLayoutEffect: bf, useMemo: rp, useReducer: ql, useRef: Zf, useState: function() {
  return ql(Wr);
}, useDebugValue: qu, useDeferredValue: function(e) {
  var n = en();
  return ge === null ? n.memoizedState = e : ip(n, ge.memoizedState, e);
}, useTransition: function() {
  var e = ql(Wr)[0], n = en().memoizedState;
  return [e, n];
}, useMutableSource: Wf, useSyncExternalStore: Qf, useId: lp, unstable_isNewReconciler: !1 };
function on(e, n) {
  if (e && e.defaultProps) {
    n = ae({}, n), e = e.defaultProps;
    for (var t in e) n[t] === void 0 && (n[t] = e[t]);
    return n;
  }
  return n;
}
function $o(e, n, t, r) {
  n = e.memoizedState, t = t(r, n), t = t == null ? n : ae({}, n, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t);
}
var gl = { isMounted: function(e) {
  return (e = e._reactInternals) ? yt(e) === e : !1;
}, enqueueSetState: function(e, n, t) {
  e = e._reactInternals;
  var r = ze(), i = Xn(e), l = Tn(r, i);
  l.payload = n, t != null && (l.callback = t), n = Kn(e, l, i), n !== null && (cn(n, e, i, r), Ti(n, e, i));
}, enqueueReplaceState: function(e, n, t) {
  e = e._reactInternals;
  var r = ze(), i = Xn(e), l = Tn(r, i);
  l.tag = 1, l.payload = n, t != null && (l.callback = t), n = Kn(e, l, i), n !== null && (cn(n, e, i, r), Ti(n, e, i));
}, enqueueForceUpdate: function(e, n) {
  e = e._reactInternals;
  var t = ze(), r = Xn(e), i = Tn(t, r);
  i.tag = 2, n != null && (i.callback = n), n = Kn(e, i, r), n !== null && (cn(n, e, r, t), Ti(n, e, r));
} };
function gs(e, n, t, r, i, l, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, l, o) : n.prototype && n.prototype.isPureReactComponent ? !Fr(t, r) || !Fr(i, l) : !0;
}
function sp(e, n, t) {
  var r = !1, i = Zn, l = n.contextType;
  return typeof l == "object" && l !== null ? l = be(l) : (i = Me(n) ? ft : _e.current, r = n.contextTypes, l = (r = r != null) ? Qt(e, i) : Zn), n = new n(t, l), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = gl, e.stateNode = n, n._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = l), n;
}
function ys(e, n, t, r) {
  e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(t, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(t, r), n.state !== e && gl.enqueueReplaceState(n, n.state, null);
}
function Wo(e, n, t, r) {
  var i = e.stateNode;
  i.props = t, i.state = e.memoizedState, i.refs = {}, Vu(e);
  var l = n.contextType;
  typeof l == "object" && l !== null ? i.context = be(l) : (l = Me(n) ? ft : _e.current, i.context = Qt(e, l)), i.state = e.memoizedState, l = n.getDerivedStateFromProps, typeof l == "function" && ($o(e, n, l, t), i.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (n = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), n !== i.state && gl.enqueueReplaceState(i, i.state, null), Zi(e, t, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function qt(e, n) {
  try {
    var t = "", r = n;
    do
      t += rh(r), r = r.return;
    while (r);
    var i = t;
  } catch (l) {
    i = `
Error generating stack: ` + l.message + `
` + l.stack;
  }
  return { value: e, source: n, stack: i, digest: null };
}
function Gl(e, n, t) {
  return { value: e, source: null, stack: t ?? null, digest: n ?? null };
}
function Qo(e, n) {
  try {
    console.error(n.value);
  } catch (t) {
    setTimeout(function() {
      throw t;
    });
  }
}
var Nm = typeof WeakMap == "function" ? WeakMap : Map;
function cp(e, n, t) {
  t = Tn(-1, t), t.tag = 3, t.payload = { element: null };
  var r = n.value;
  return t.callback = function() {
    tl || (tl = !0, nu = r), Qo(e, n);
  }, t;
}
function fp(e, n, t) {
  t = Tn(-1, t), t.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = n.value;
    t.payload = function() {
      return r(i);
    }, t.callback = function() {
      Qo(e, n);
    };
  }
  var l = e.stateNode;
  return l !== null && typeof l.componentDidCatch == "function" && (t.callback = function() {
    Qo(e, n), typeof r != "function" && (Yn === null ? Yn = /* @__PURE__ */ new Set([this]) : Yn.add(this));
    var o = n.stack;
    this.componentDidCatch(n.value, { componentStack: o !== null ? o : "" });
  }), t;
}
function vs(e, n, t) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Nm();
    var i = /* @__PURE__ */ new Set();
    r.set(n, i);
  } else i = r.get(n), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(n, i));
  i.has(t) || (i.add(t), e = Wm.bind(null, e, n, t), n.then(e, e));
}
function ks(e) {
  do {
    var n;
    if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ws(e, n, t, r, i) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === n ? e.flags |= 65536 : (e.flags |= 128, t.flags |= 131072, t.flags &= -52805, t.tag === 1 && (t.alternate === null ? t.tag = 17 : (n = Tn(-1, 1), n.tag = 2, Kn(t, n, 1))), t.lanes |= 1), e);
}
var Lm = On.ReactCurrentOwner, De = !1;
function Ie(e, n, t, r) {
  n.child = e === null ? Uf(n, null, t, r) : Yt(n, e.child, t, r);
}
function xs(e, n, t, r, i) {
  t = t.render;
  var l = n.ref;
  return Ut(n, i), r = Ku(e, n, t, r, l, i), t = Yu(), e !== null && !De ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~i, Ln(e, n, i)) : (ie && t && Du(n), n.flags |= 1, Ie(e, n, r, i), n.child);
}
function Ss(e, n, t, r, i) {
  if (e === null) {
    var l = t.type;
    return typeof l == "function" && !ra(l) && l.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (n.tag = 15, n.type = l, pp(e, n, l, r, i)) : (e = Ri(t.type, null, r, n, n.mode, i), e.ref = n.ref, e.return = n, n.child = e);
  }
  if (l = e.child, !(e.lanes & i)) {
    var o = l.memoizedProps;
    if (t = t.compare, t = t !== null ? t : Fr, t(o, r) && e.ref === n.ref) return Ln(e, n, i);
  }
  return n.flags |= 1, e = qn(l, r), e.ref = n.ref, e.return = n, n.child = e;
}
function pp(e, n, t, r, i) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (Fr(l, r) && e.ref === n.ref) if (De = !1, n.pendingProps = r = l, (e.lanes & i) !== 0) e.flags & 131072 && (De = !0);
    else return n.lanes = e.lanes, Ln(e, n, i);
  }
  return Ko(e, n, t, r, i);
}
function dp(e, n, t) {
  var r = n.pendingProps, i = r.children, l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(n.mode & 1)) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, J(At, Ve), Ve |= t;
  else {
    if (!(t & 1073741824)) return e = l !== null ? l.baseLanes | t : t, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, n.updateQueue = null, J(At, Ve), Ve |= e, null;
    n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = l !== null ? l.baseLanes : t, J(At, Ve), Ve |= r;
  }
  else l !== null ? (r = l.baseLanes | t, n.memoizedState = null) : r = t, J(At, Ve), Ve |= r;
  return Ie(e, n, i, t), n.child;
}
function hp(e, n) {
  var t = n.ref;
  (e === null && t !== null || e !== null && e.ref !== t) && (n.flags |= 512, n.flags |= 2097152);
}
function Ko(e, n, t, r, i) {
  var l = Me(t) ? ft : _e.current;
  return l = Qt(n, l), Ut(n, i), t = Ku(e, n, t, r, l, i), r = Yu(), e !== null && !De ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~i, Ln(e, n, i)) : (ie && r && Du(n), n.flags |= 1, Ie(e, n, t, i), n.child);
}
function Es(e, n, t, r, i) {
  if (Me(t)) {
    var l = !0;
    Ki(n);
  } else l = !1;
  if (Ut(n, i), n.stateNode === null) Ni(e, n), sp(n, t, r), Wo(n, t, r, i), r = !0;
  else if (e === null) {
    var o = n.stateNode, u = n.memoizedProps;
    o.props = u;
    var a = o.context, s = t.contextType;
    typeof s == "object" && s !== null ? s = be(s) : (s = Me(t) ? ft : _e.current, s = Qt(n, s));
    var c = t.getDerivedStateFromProps, f = typeof c == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    f || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || a !== s) && ys(n, o, r, s), Fn = !1;
    var d = n.memoizedState;
    o.state = d, Zi(n, r, o, i), a = n.memoizedState, u !== r || d !== a || Ae.current || Fn ? (typeof c == "function" && ($o(n, t, c, r), a = n.memoizedState), (u = Fn || gs(n, t, u, r, d, a, s)) ? (f || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = a), o.props = r, o.state = a, o.context = s, r = u) : (typeof o.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
  } else {
    o = n.stateNode, Hf(e, n), u = n.memoizedProps, s = n.type === n.elementType ? u : on(n.type, u), o.props = s, f = n.pendingProps, d = o.context, a = t.contextType, typeof a == "object" && a !== null ? a = be(a) : (a = Me(t) ? ft : _e.current, a = Qt(n, a));
    var p = t.getDerivedStateFromProps;
    (c = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== f || d !== a) && ys(n, o, r, a), Fn = !1, d = n.memoizedState, o.state = d, Zi(n, r, o, i);
    var k = n.memoizedState;
    u !== f || d !== k || Ae.current || Fn ? (typeof p == "function" && ($o(n, t, p, r), k = n.memoizedState), (s = Fn || gs(n, t, s, r, d, k, a) || !1) ? (c || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, a)), typeof o.componentDidUpdate == "function" && (n.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (n.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = k), o.props = r, o.state = k, o.context = a, r = s) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (n.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (n.flags |= 1024), r = !1);
  }
  return Yo(e, n, t, r, l, i);
}
function Yo(e, n, t, r, i, l) {
  hp(e, n);
  var o = (n.flags & 128) !== 0;
  if (!r && !o) return i && as(n, t, !1), Ln(e, n, l);
  r = n.stateNode, Lm.current = n;
  var u = o && typeof t.getDerivedStateFromError != "function" ? null : r.render();
  return n.flags |= 1, e !== null && o ? (n.child = Yt(n, e.child, null, l), n.child = Yt(n, null, u, l)) : Ie(e, n, u, l), n.memoizedState = r.state, i && as(n, t, !0), n.child;
}
function mp(e) {
  var n = e.stateNode;
  n.pendingContext ? us(e, n.pendingContext, n.pendingContext !== n.context) : n.context && us(e, n.context, !1), Hu(e, n.containerInfo);
}
function Cs(e, n, t, r, i) {
  return Kt(), Mu(i), n.flags |= 256, Ie(e, n, t, r), n.child;
}
var Xo = { dehydrated: null, treeContext: null, retryLane: 0 };
function qo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function gp(e, n, t) {
  var r = n.pendingProps, i = oe.current, l = !1, o = (n.flags & 128) !== 0, u;
  if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), u ? (l = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), J(oe, i & 1), e === null)
    return Vo(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (n.mode & 1 ? e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824 : n.lanes = 1, null) : (o = r.children, e = r.fallback, l ? (r = n.mode, l = n.child, o = { mode: "hidden", children: o }, !(r & 1) && l !== null ? (l.childLanes = 0, l.pendingProps = o) : l = kl(o, r, 0, null), e = ct(e, r, t, null), l.return = n, e.return = n, l.sibling = e, n.child = l, n.child.memoizedState = qo(t), n.memoizedState = Xo, e) : Gu(n, o));
  if (i = e.memoizedState, i !== null && (u = i.dehydrated, u !== null)) return Om(e, n, o, r, u, i, t);
  if (l) {
    l = r.fallback, o = n.mode, i = e.child, u = i.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(o & 1) && n.child !== i ? (r = n.child, r.childLanes = 0, r.pendingProps = a, n.deletions = null) : (r = qn(i, a), r.subtreeFlags = i.subtreeFlags & 14680064), u !== null ? l = qn(u, l) : (l = ct(l, o, t, null), l.flags |= 2), l.return = n, r.return = n, r.sibling = l, n.child = r, r = l, l = n.child, o = e.child.memoizedState, o = o === null ? qo(t) : { baseLanes: o.baseLanes | t, cachePool: null, transitions: o.transitions }, l.memoizedState = o, l.childLanes = e.childLanes & ~t, n.memoizedState = Xo, r;
  }
  return l = e.child, e = l.sibling, r = qn(l, { mode: "visible", children: r.children }), !(n.mode & 1) && (r.lanes = t), r.return = n, r.sibling = null, e !== null && (t = n.deletions, t === null ? (n.deletions = [e], n.flags |= 16) : t.push(e)), n.child = r, n.memoizedState = null, r;
}
function Gu(e, n) {
  return n = kl({ mode: "visible", children: n }, e.mode, 0, null), n.return = e, e.child = n;
}
function mi(e, n, t, r) {
  return r !== null && Mu(r), Yt(n, e.child, null, t), e = Gu(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
}
function Om(e, n, t, r, i, l, o) {
  if (t)
    return n.flags & 256 ? (n.flags &= -257, r = Gl(Error(P(422))), mi(e, n, o, r)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (l = r.fallback, i = n.mode, r = kl({ mode: "visible", children: r.children }, i, 0, null), l = ct(l, i, o, null), l.flags |= 2, r.return = n, l.return = n, r.sibling = l, n.child = r, n.mode & 1 && Yt(n, e.child, null, o), n.child.memoizedState = qo(o), n.memoizedState = Xo, l);
  if (!(n.mode & 1)) return mi(e, n, o, null);
  if (i.data === "$!") {
    if (r = i.nextSibling && i.nextSibling.dataset, r) var u = r.dgst;
    return r = u, l = Error(P(419)), r = Gl(l, r, void 0), mi(e, n, o, r);
  }
  if (u = (o & e.childLanes) !== 0, De || u) {
    if (r = ke, r !== null) {
      switch (o & -o) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
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
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      i = i & (r.suspendedLanes | o) ? 0 : i, i !== 0 && i !== l.retryLane && (l.retryLane = i, Nn(e, i), cn(r, e, i, -1));
    }
    return ta(), r = Gl(Error(P(421))), mi(e, n, o, r);
  }
  return i.data === "$?" ? (n.flags |= 128, n.child = e.child, n = Qm.bind(null, e), i._reactRetry = n, null) : (e = l.treeContext, He = Qn(i.nextSibling), We = n, ie = !0, an = null, e !== null && (Xe[qe++] = Pn, Xe[qe++] = _n, Xe[qe++] = pt, Pn = e.id, _n = e.overflow, pt = n), n = Gu(n, r.children), n.flags |= 4096, n);
}
function Ps(e, n, t) {
  e.lanes |= n;
  var r = e.alternate;
  r !== null && (r.lanes |= n), Ho(e.return, n, t);
}
function Zl(e, n, t, r, i) {
  var l = e.memoizedState;
  l === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: r, tail: t, tailMode: i } : (l.isBackwards = n, l.rendering = null, l.renderingStartTime = 0, l.last = r, l.tail = t, l.tailMode = i);
}
function yp(e, n, t) {
  var r = n.pendingProps, i = r.revealOrder, l = r.tail;
  if (Ie(e, n, r.children, t), r = oe.current, r & 2) r = r & 1 | 2, n.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = n.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ps(e, t, n);
      else if (e.tag === 19) Ps(e, t, n);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === n) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === n) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (J(oe, r), !(n.mode & 1)) n.memoizedState = null;
  else switch (i) {
    case "forwards":
      for (t = n.child, i = null; t !== null; ) e = t.alternate, e !== null && Ji(e) === null && (i = t), t = t.sibling;
      t = i, t === null ? (i = n.child, n.child = null) : (i = t.sibling, t.sibling = null), Zl(n, !1, i, t, l);
      break;
    case "backwards":
      for (t = null, i = n.child, n.child = null; i !== null; ) {
        if (e = i.alternate, e !== null && Ji(e) === null) {
          n.child = i;
          break;
        }
        e = i.sibling, i.sibling = t, t = i, i = e;
      }
      Zl(n, !0, t, null, l);
      break;
    case "together":
      Zl(n, !1, null, null, void 0);
      break;
    default:
      n.memoizedState = null;
  }
  return n.child;
}
function Ni(e, n) {
  !(n.mode & 1) && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2);
}
function Ln(e, n, t) {
  if (e !== null && (n.dependencies = e.dependencies), ht |= n.lanes, !(t & n.childLanes)) return null;
  if (e !== null && n.child !== e.child) throw Error(P(153));
  if (n.child !== null) {
    for (e = n.child, t = qn(e, e.pendingProps), n.child = t, t.return = n; e.sibling !== null; ) e = e.sibling, t = t.sibling = qn(e, e.pendingProps), t.return = n;
    t.sibling = null;
  }
  return n.child;
}
function Rm(e, n, t) {
  switch (n.tag) {
    case 3:
      mp(n), Kt();
      break;
    case 5:
      $f(n);
      break;
    case 1:
      Me(n.type) && Ki(n);
      break;
    case 4:
      Hu(n, n.stateNode.containerInfo);
      break;
    case 10:
      var r = n.type._context, i = n.memoizedProps.value;
      J(qi, r._currentValue), r._currentValue = i;
      break;
    case 13:
      if (r = n.memoizedState, r !== null)
        return r.dehydrated !== null ? (J(oe, oe.current & 1), n.flags |= 128, null) : t & n.child.childLanes ? gp(e, n, t) : (J(oe, oe.current & 1), e = Ln(e, n, t), e !== null ? e.sibling : null);
      J(oe, oe.current & 1);
      break;
    case 19:
      if (r = (t & n.childLanes) !== 0, e.flags & 128) {
        if (r) return yp(e, n, t);
        n.flags |= 128;
      }
      if (i = n.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), J(oe, oe.current), r) break;
      return null;
    case 22:
    case 23:
      return n.lanes = 0, dp(e, n, t);
  }
  return Ln(e, n, t);
}
var vp, Go, kp, wp;
vp = function(e, n) {
  for (var t = n.child; t !== null; ) {
    if (t.tag === 5 || t.tag === 6) e.appendChild(t.stateNode);
    else if (t.tag !== 4 && t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === n) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === n) return;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
};
Go = function() {
};
kp = function(e, n, t, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    e = n.stateNode, at(kn.current);
    var l = null;
    switch (t) {
      case "input":
        i = vo(e, i), r = vo(e, r), l = [];
        break;
      case "select":
        i = ae({}, i, { value: void 0 }), r = ae({}, r, { value: void 0 }), l = [];
        break;
      case "textarea":
        i = xo(e, i), r = xo(e, r), l = [];
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Wi);
    }
    Eo(t, r);
    var o;
    t = null;
    for (s in i) if (!r.hasOwnProperty(s) && i.hasOwnProperty(s) && i[s] != null) if (s === "style") {
      var u = i[s];
      for (o in u) u.hasOwnProperty(o) && (t || (t = {}), t[o] = "");
    } else s !== "dangerouslySetInnerHTML" && s !== "children" && s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (Nr.hasOwnProperty(s) ? l || (l = []) : (l = l || []).push(s, null));
    for (s in r) {
      var a = r[s];
      if (u = i != null ? i[s] : void 0, r.hasOwnProperty(s) && a !== u && (a != null || u != null)) if (s === "style") if (u) {
        for (o in u) !u.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (t || (t = {}), t[o] = "");
        for (o in a) a.hasOwnProperty(o) && u[o] !== a[o] && (t || (t = {}), t[o] = a[o]);
      } else t || (l || (l = []), l.push(
        s,
        t
      )), t = a;
      else s === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, u = u ? u.__html : void 0, a != null && u !== a && (l = l || []).push(s, a)) : s === "children" ? typeof a != "string" && typeof a != "number" || (l = l || []).push(s, "" + a) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && (Nr.hasOwnProperty(s) ? (a != null && s === "onScroll" && ne("scroll", e), l || u === a || (l = [])) : (l = l || []).push(s, a));
    }
    t && (l = l || []).push("style", t);
    var s = l;
    (n.updateQueue = s) && (n.flags |= 4);
  }
};
wp = function(e, n, t, r) {
  t !== r && (n.flags |= 4);
};
function cr(e, n) {
  if (!ie) switch (e.tailMode) {
    case "hidden":
      n = e.tail;
      for (var t = null; n !== null; ) n.alternate !== null && (t = n), n = n.sibling;
      t === null ? e.tail = null : t.sibling = null;
      break;
    case "collapsed":
      t = e.tail;
      for (var r = null; t !== null; ) t.alternate !== null && (r = t), t = t.sibling;
      r === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function Ce(e) {
  var n = e.alternate !== null && e.alternate.child === e.child, t = 0, r = 0;
  if (n) for (var i = e.child; i !== null; ) t |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
  else for (i = e.child; i !== null; ) t |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
  return e.subtreeFlags |= r, e.childLanes = t, n;
}
function Dm(e, n, t) {
  var r = n.pendingProps;
  switch (Au(n), n.tag) {
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
      return Ce(n), null;
    case 1:
      return Me(n.type) && Qi(), Ce(n), null;
    case 3:
      return r = n.stateNode, Xt(), te(Ae), te(_e), Wu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (di(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, an !== null && (iu(an), an = null))), Go(e, n), Ce(n), null;
    case 5:
      $u(n);
      var i = at(Hr.current);
      if (t = n.type, e !== null && n.stateNode != null) kp(e, n, t, r, i), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
      else {
        if (!r) {
          if (n.stateNode === null) throw Error(P(166));
          return Ce(n), null;
        }
        if (e = at(kn.current), di(n)) {
          r = n.stateNode, t = n.type;
          var l = n.memoizedProps;
          switch (r[gn] = n, r[Ur] = l, e = (n.mode & 1) !== 0, t) {
            case "dialog":
              ne("cancel", r), ne("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              ne("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < vr.length; i++) ne(vr[i], r);
              break;
            case "source":
              ne("error", r);
              break;
            case "img":
            case "image":
            case "link":
              ne(
                "error",
                r
              ), ne("load", r);
              break;
            case "details":
              ne("toggle", r);
              break;
            case "input":
              Da(r, l), ne("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!l.multiple }, ne("invalid", r);
              break;
            case "textarea":
              Ma(r, l), ne("invalid", r);
          }
          Eo(t, l), i = null;
          for (var o in l) if (l.hasOwnProperty(o)) {
            var u = l[o];
            o === "children" ? typeof u == "string" ? r.textContent !== u && (l.suppressHydrationWarning !== !0 && pi(r.textContent, u, e), i = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (l.suppressHydrationWarning !== !0 && pi(
              r.textContent,
              u,
              e
            ), i = ["children", "" + u]) : Nr.hasOwnProperty(o) && u != null && o === "onScroll" && ne("scroll", r);
          }
          switch (t) {
            case "input":
              ii(r), Aa(r, l, !0);
              break;
            case "textarea":
              ii(r), Fa(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = Wi);
          }
          r = i, n.updateQueue = r, r !== null && (n.flags |= 4);
        } else {
          o = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Yc(t)), e === "http://www.w3.org/1999/xhtml" ? t === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(t, { is: r.is }) : (e = o.createElement(t), t === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, t), e[gn] = n, e[Ur] = r, vp(e, n, !1, !1), n.stateNode = e;
          e: {
            switch (o = Co(t, r), t) {
              case "dialog":
                ne("cancel", e), ne("close", e), i = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                ne("load", e), i = r;
                break;
              case "video":
              case "audio":
                for (i = 0; i < vr.length; i++) ne(vr[i], e);
                i = r;
                break;
              case "source":
                ne("error", e), i = r;
                break;
              case "img":
              case "image":
              case "link":
                ne(
                  "error",
                  e
                ), ne("load", e), i = r;
                break;
              case "details":
                ne("toggle", e), i = r;
                break;
              case "input":
                Da(e, r), i = vo(e, r), ne("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, i = ae({}, r, { value: void 0 }), ne("invalid", e);
                break;
              case "textarea":
                Ma(e, r), i = xo(e, r), ne("invalid", e);
                break;
              default:
                i = r;
            }
            Eo(t, i), u = i;
            for (l in u) if (u.hasOwnProperty(l)) {
              var a = u[l];
              l === "style" ? Gc(e, a) : l === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Xc(e, a)) : l === "children" ? typeof a == "string" ? (t !== "textarea" || a !== "") && Lr(e, a) : typeof a == "number" && Lr(e, "" + a) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (Nr.hasOwnProperty(l) ? a != null && l === "onScroll" && ne("scroll", e) : a != null && wu(e, l, a, o));
            }
            switch (t) {
              case "input":
                ii(e), Aa(e, r, !1);
                break;
              case "textarea":
                ii(e), Fa(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Gn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, l = r.value, l != null ? Mt(e, !!r.multiple, l, !1) : r.defaultValue != null && Mt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Wi);
            }
            switch (t) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (n.flags |= 4);
        }
        n.ref !== null && (n.flags |= 512, n.flags |= 2097152);
      }
      return Ce(n), null;
    case 6:
      if (e && n.stateNode != null) wp(e, n, e.memoizedProps, r);
      else {
        if (typeof r != "string" && n.stateNode === null) throw Error(P(166));
        if (t = at(Hr.current), at(kn.current), di(n)) {
          if (r = n.stateNode, t = n.memoizedProps, r[gn] = n, (l = r.nodeValue !== t) && (e = We, e !== null)) switch (e.tag) {
            case 3:
              pi(r.nodeValue, t, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && pi(r.nodeValue, t, (e.mode & 1) !== 0);
          }
          l && (n.flags |= 4);
        } else r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[gn] = n, n.stateNode = r;
      }
      return Ce(n), null;
    case 13:
      if (te(oe), r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (ie && He !== null && n.mode & 1 && !(n.flags & 128)) jf(), Kt(), n.flags |= 98560, l = !1;
        else if (l = di(n), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!l) throw Error(P(318));
            if (l = n.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(P(317));
            l[gn] = n;
          } else Kt(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
          Ce(n), l = !1;
        } else an !== null && (iu(an), an = null), l = !0;
        if (!l) return n.flags & 65536 ? n : null;
      }
      return n.flags & 128 ? (n.lanes = t, n) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (n.child.flags |= 8192, n.mode & 1 && (e === null || oe.current & 1 ? ye === 0 && (ye = 3) : ta())), n.updateQueue !== null && (n.flags |= 4), Ce(n), null);
    case 4:
      return Xt(), Go(e, n), e === null && jr(n.stateNode.containerInfo), Ce(n), null;
    case 10:
      return Bu(n.type._context), Ce(n), null;
    case 17:
      return Me(n.type) && Qi(), Ce(n), null;
    case 19:
      if (te(oe), l = n.memoizedState, l === null) return Ce(n), null;
      if (r = (n.flags & 128) !== 0, o = l.rendering, o === null) if (r) cr(l, !1);
      else {
        if (ye !== 0 || e !== null && e.flags & 128) for (e = n.child; e !== null; ) {
          if (o = Ji(e), o !== null) {
            for (n.flags |= 128, cr(l, !1), r = o.updateQueue, r !== null && (n.updateQueue = r, n.flags |= 4), n.subtreeFlags = 0, r = t, t = n.child; t !== null; ) l = t, e = r, l.flags &= 14680066, o = l.alternate, o === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = o.childLanes, l.lanes = o.lanes, l.child = o.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = o.memoizedProps, l.memoizedState = o.memoizedState, l.updateQueue = o.updateQueue, l.type = o.type, e = o.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), t = t.sibling;
            return J(oe, oe.current & 1 | 2), n.child;
          }
          e = e.sibling;
        }
        l.tail !== null && fe() > Gt && (n.flags |= 128, r = !0, cr(l, !1), n.lanes = 4194304);
      }
      else {
        if (!r) if (e = Ji(o), e !== null) {
          if (n.flags |= 128, r = !0, t = e.updateQueue, t !== null && (n.updateQueue = t, n.flags |= 4), cr(l, !0), l.tail === null && l.tailMode === "hidden" && !o.alternate && !ie) return Ce(n), null;
        } else 2 * fe() - l.renderingStartTime > Gt && t !== 1073741824 && (n.flags |= 128, r = !0, cr(l, !1), n.lanes = 4194304);
        l.isBackwards ? (o.sibling = n.child, n.child = o) : (t = l.last, t !== null ? t.sibling = o : n.child = o, l.last = o);
      }
      return l.tail !== null ? (n = l.tail, l.rendering = n, l.tail = n.sibling, l.renderingStartTime = fe(), n.sibling = null, t = oe.current, J(oe, r ? t & 1 | 2 : t & 1), n) : (Ce(n), null);
    case 22:
    case 23:
      return na(), r = n.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (n.flags |= 8192), r && n.mode & 1 ? Ve & 1073741824 && (Ce(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Ce(n), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(P(156, n.tag));
}
function Am(e, n) {
  switch (Au(n), n.tag) {
    case 1:
      return Me(n.type) && Qi(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 3:
      return Xt(), te(Ae), te(_e), Wu(), e = n.flags, e & 65536 && !(e & 128) ? (n.flags = e & -65537 | 128, n) : null;
    case 5:
      return $u(n), null;
    case 13:
      if (te(oe), e = n.memoizedState, e !== null && e.dehydrated !== null) {
        if (n.alternate === null) throw Error(P(340));
        Kt();
      }
      return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 19:
      return te(oe), null;
    case 4:
      return Xt(), null;
    case 10:
      return Bu(n.type._context), null;
    case 22:
    case 23:
      return na(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var gi = !1, Pe = !1, Mm = typeof WeakSet == "function" ? WeakSet : Set, O = null;
function Dt(e, n) {
  var t = e.ref;
  if (t !== null) if (typeof t == "function") try {
    t(null);
  } catch (r) {
    se(e, n, r);
  }
  else t.current = null;
}
function Zo(e, n, t) {
  try {
    t();
  } catch (r) {
    se(e, n, r);
  }
}
var _s = !1;
function Fm(e, n) {
  if (Do = Vi, e = Pf(), Ru(e)) {
    if ("selectionStart" in e) var t = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      t = (t = e.ownerDocument) && t.defaultView || window;
      var r = t.getSelection && t.getSelection();
      if (r && r.rangeCount !== 0) {
        t = r.anchorNode;
        var i = r.anchorOffset, l = r.focusNode;
        r = r.focusOffset;
        try {
          t.nodeType, l.nodeType;
        } catch {
          t = null;
          break e;
        }
        var o = 0, u = -1, a = -1, s = 0, c = 0, f = e, d = null;
        n: for (; ; ) {
          for (var p; f !== t || i !== 0 && f.nodeType !== 3 || (u = o + i), f !== l || r !== 0 && f.nodeType !== 3 || (a = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (p = f.firstChild) !== null; )
            d = f, f = p;
          for (; ; ) {
            if (f === e) break n;
            if (d === t && ++s === i && (u = o), d === l && ++c === r && (a = o), (p = f.nextSibling) !== null) break;
            f = d, d = f.parentNode;
          }
          f = p;
        }
        t = u === -1 || a === -1 ? null : { start: u, end: a };
      } else t = null;
    }
    t = t || { start: 0, end: 0 };
  } else t = null;
  for (Ao = { focusedElem: e, selectionRange: t }, Vi = !1, O = n; O !== null; ) if (n = O, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, O = e;
  else for (; O !== null; ) {
    n = O;
    try {
      var k = n.alternate;
      if (n.flags & 1024) switch (n.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (k !== null) {
            var w = k.memoizedProps, I = k.memoizedState, h = n.stateNode, m = h.getSnapshotBeforeUpdate(n.elementType === n.type ? w : on(n.type, w), I);
            h.__reactInternalSnapshotBeforeUpdate = m;
          }
          break;
        case 3:
          var y = n.stateNode.containerInfo;
          y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(P(163));
      }
    } catch (S) {
      se(n, n.return, S);
    }
    if (e = n.sibling, e !== null) {
      e.return = n.return, O = e;
      break;
    }
    O = n.return;
  }
  return k = _s, _s = !1, k;
}
function Pr(e, n, t) {
  var r = n.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var i = r = r.next;
    do {
      if ((i.tag & e) === e) {
        var l = i.destroy;
        i.destroy = void 0, l !== void 0 && Zo(n, t, l);
      }
      i = i.next;
    } while (i !== r);
  }
}
function yl(e, n) {
  if (n = n.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
    var t = n = n.next;
    do {
      if ((t.tag & e) === e) {
        var r = t.create;
        t.destroy = r();
      }
      t = t.next;
    } while (t !== n);
  }
}
function Jo(e) {
  var n = e.ref;
  if (n !== null) {
    var t = e.stateNode;
    switch (e.tag) {
      case 5:
        e = t;
        break;
      default:
        e = t;
    }
    typeof n == "function" ? n(e) : n.current = e;
  }
}
function xp(e) {
  var n = e.alternate;
  n !== null && (e.alternate = null, xp(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && (delete n[gn], delete n[Ur], delete n[jo], delete n[km], delete n[wm])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Sp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ts(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Sp(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function bo(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, n ? t.nodeType === 8 ? t.parentNode.insertBefore(e, n) : t.insertBefore(e, n) : (t.nodeType === 8 ? (n = t.parentNode, n.insertBefore(e, t)) : (n = t, n.appendChild(e)), t = t._reactRootContainer, t != null || n.onclick !== null || (n.onclick = Wi));
  else if (r !== 4 && (e = e.child, e !== null)) for (bo(e, n, t), e = e.sibling; e !== null; ) bo(e, n, t), e = e.sibling;
}
function eu(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, n ? t.insertBefore(e, n) : t.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (eu(e, n, t), e = e.sibling; e !== null; ) eu(e, n, t), e = e.sibling;
}
var we = null, un = !1;
function Dn(e, n, t) {
  for (t = t.child; t !== null; ) Ep(e, n, t), t = t.sibling;
}
function Ep(e, n, t) {
  if (vn && typeof vn.onCommitFiberUnmount == "function") try {
    vn.onCommitFiberUnmount(sl, t);
  } catch {
  }
  switch (t.tag) {
    case 5:
      Pe || Dt(t, n);
    case 6:
      var r = we, i = un;
      we = null, Dn(e, n, t), we = r, un = i, we !== null && (un ? (e = we, t = t.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t)) : we.removeChild(t.stateNode));
      break;
    case 18:
      we !== null && (un ? (e = we, t = t.stateNode, e.nodeType === 8 ? Wl(e.parentNode, t) : e.nodeType === 1 && Wl(e, t), Ar(e)) : Wl(we, t.stateNode));
      break;
    case 4:
      r = we, i = un, we = t.stateNode.containerInfo, un = !0, Dn(e, n, t), we = r, un = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Pe && (r = t.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        i = r = r.next;
        do {
          var l = i, o = l.destroy;
          l = l.tag, o !== void 0 && (l & 2 || l & 4) && Zo(t, n, o), i = i.next;
        } while (i !== r);
      }
      Dn(e, n, t);
      break;
    case 1:
      if (!Pe && (Dt(t, n), r = t.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = t.memoizedProps, r.state = t.memoizedState, r.componentWillUnmount();
      } catch (u) {
        se(t, n, u);
      }
      Dn(e, n, t);
      break;
    case 21:
      Dn(e, n, t);
      break;
    case 22:
      t.mode & 1 ? (Pe = (r = Pe) || t.memoizedState !== null, Dn(e, n, t), Pe = r) : Dn(e, n, t);
      break;
    default:
      Dn(e, n, t);
  }
}
function Is(e) {
  var n = e.updateQueue;
  if (n !== null) {
    e.updateQueue = null;
    var t = e.stateNode;
    t === null && (t = e.stateNode = new Mm()), n.forEach(function(r) {
      var i = Km.bind(null, e, r);
      t.has(r) || (t.add(r), r.then(i, i));
    });
  }
}
function ln(e, n) {
  var t = n.deletions;
  if (t !== null) for (var r = 0; r < t.length; r++) {
    var i = t[r];
    try {
      var l = e, o = n, u = o;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            we = u.stateNode, un = !1;
            break e;
          case 3:
            we = u.stateNode.containerInfo, un = !0;
            break e;
          case 4:
            we = u.stateNode.containerInfo, un = !0;
            break e;
        }
        u = u.return;
      }
      if (we === null) throw Error(P(160));
      Ep(l, o, i), we = null, un = !1;
      var a = i.alternate;
      a !== null && (a.return = null), i.return = null;
    } catch (s) {
      se(i, n, s);
    }
  }
  if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) Cp(n, e), n = n.sibling;
}
function Cp(e, n) {
  var t = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ln(n, e), dn(e), r & 4) {
        try {
          Pr(3, e, e.return), yl(3, e);
        } catch (w) {
          se(e, e.return, w);
        }
        try {
          Pr(5, e, e.return);
        } catch (w) {
          se(e, e.return, w);
        }
      }
      break;
    case 1:
      ln(n, e), dn(e), r & 512 && t !== null && Dt(t, t.return);
      break;
    case 5:
      if (ln(n, e), dn(e), r & 512 && t !== null && Dt(t, t.return), e.flags & 32) {
        var i = e.stateNode;
        try {
          Lr(i, "");
        } catch (w) {
          se(e, e.return, w);
        }
      }
      if (r & 4 && (i = e.stateNode, i != null)) {
        var l = e.memoizedProps, o = t !== null ? t.memoizedProps : l, u = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          u === "input" && l.type === "radio" && l.name != null && Qc(i, l), Co(u, o);
          var s = Co(u, l);
          for (o = 0; o < a.length; o += 2) {
            var c = a[o], f = a[o + 1];
            c === "style" ? Gc(i, f) : c === "dangerouslySetInnerHTML" ? Xc(i, f) : c === "children" ? Lr(i, f) : wu(i, c, f, s);
          }
          switch (u) {
            case "input":
              ko(i, l);
              break;
            case "textarea":
              Kc(i, l);
              break;
            case "select":
              var d = i._wrapperState.wasMultiple;
              i._wrapperState.wasMultiple = !!l.multiple;
              var p = l.value;
              p != null ? Mt(i, !!l.multiple, p, !1) : d !== !!l.multiple && (l.defaultValue != null ? Mt(
                i,
                !!l.multiple,
                l.defaultValue,
                !0
              ) : Mt(i, !!l.multiple, l.multiple ? [] : "", !1));
          }
          i[Ur] = l;
        } catch (w) {
          se(e, e.return, w);
        }
      }
      break;
    case 6:
      if (ln(n, e), dn(e), r & 4) {
        if (e.stateNode === null) throw Error(P(162));
        i = e.stateNode, l = e.memoizedProps;
        try {
          i.nodeValue = l;
        } catch (w) {
          se(e, e.return, w);
        }
      }
      break;
    case 3:
      if (ln(n, e), dn(e), r & 4 && t !== null && t.memoizedState.isDehydrated) try {
        Ar(n.containerInfo);
      } catch (w) {
        se(e, e.return, w);
      }
      break;
    case 4:
      ln(n, e), dn(e);
      break;
    case 13:
      ln(n, e), dn(e), i = e.child, i.flags & 8192 && (l = i.memoizedState !== null, i.stateNode.isHidden = l, !l || i.alternate !== null && i.alternate.memoizedState !== null || (bu = fe())), r & 4 && Is(e);
      break;
    case 22:
      if (c = t !== null && t.memoizedState !== null, e.mode & 1 ? (Pe = (s = Pe) || c, ln(n, e), Pe = s) : ln(n, e), dn(e), r & 8192) {
        if (s = e.memoizedState !== null, (e.stateNode.isHidden = s) && !c && e.mode & 1) for (O = e, c = e.child; c !== null; ) {
          for (f = O = c; O !== null; ) {
            switch (d = O, p = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pr(4, d, d.return);
                break;
              case 1:
                Dt(d, d.return);
                var k = d.stateNode;
                if (typeof k.componentWillUnmount == "function") {
                  r = d, t = d.return;
                  try {
                    n = r, k.props = n.memoizedProps, k.state = n.memoizedState, k.componentWillUnmount();
                  } catch (w) {
                    se(r, t, w);
                  }
                }
                break;
              case 5:
                Dt(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  Ns(f);
                  continue;
                }
            }
            p !== null ? (p.return = d, O = p) : Ns(f);
          }
          c = c.sibling;
        }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                i = f.stateNode, s ? (l = i.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (u = f.stateNode, a = f.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, u.style.display = qc("display", o));
              } catch (w) {
                se(e, e.return, w);
              }
            }
          } else if (f.tag === 6) {
            if (c === null) try {
              f.stateNode.nodeValue = s ? "" : f.memoizedProps;
            } catch (w) {
              se(e, e.return, w);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), f = f.return;
          }
          c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      ln(n, e), dn(e), r & 4 && Is(e);
      break;
    case 21:
      break;
    default:
      ln(
        n,
        e
      ), dn(e);
  }
}
function dn(e) {
  var n = e.flags;
  if (n & 2) {
    try {
      e: {
        for (var t = e.return; t !== null; ) {
          if (Sp(t)) {
            var r = t;
            break e;
          }
          t = t.return;
        }
        throw Error(P(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Lr(i, ""), r.flags &= -33);
          var l = Ts(e);
          eu(e, l, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, u = Ts(e);
          bo(e, u, o);
          break;
        default:
          throw Error(P(161));
      }
    } catch (a) {
      se(e, e.return, a);
    }
    e.flags &= -3;
  }
  n & 4096 && (e.flags &= -4097);
}
function jm(e, n, t) {
  O = e, Pp(e);
}
function Pp(e, n, t) {
  for (var r = (e.mode & 1) !== 0; O !== null; ) {
    var i = O, l = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || gi;
      if (!o) {
        var u = i.alternate, a = u !== null && u.memoizedState !== null || Pe;
        u = gi;
        var s = Pe;
        if (gi = o, (Pe = a) && !s) for (O = i; O !== null; ) o = O, a = o.child, o.tag === 22 && o.memoizedState !== null ? Ls(i) : a !== null ? (a.return = o, O = a) : Ls(i);
        for (; l !== null; ) O = l, Pp(l), l = l.sibling;
        O = i, gi = u, Pe = s;
      }
      zs(e);
    } else i.subtreeFlags & 8772 && l !== null ? (l.return = i, O = l) : zs(e);
  }
}
function zs(e) {
  for (; O !== null; ) {
    var n = O;
    if (n.flags & 8772) {
      var t = n.alternate;
      try {
        if (n.flags & 8772) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Pe || yl(5, n);
            break;
          case 1:
            var r = n.stateNode;
            if (n.flags & 4 && !Pe) if (t === null) r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : on(n.type, t.memoizedProps);
              r.componentDidUpdate(i, t.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var l = n.updateQueue;
            l !== null && ds(n, l, r);
            break;
          case 3:
            var o = n.updateQueue;
            if (o !== null) {
              if (t = null, n.child !== null) switch (n.child.tag) {
                case 5:
                  t = n.child.stateNode;
                  break;
                case 1:
                  t = n.child.stateNode;
              }
              ds(n, o, t);
            }
            break;
          case 5:
            var u = n.stateNode;
            if (t === null && n.flags & 4) {
              t = u;
              var a = n.memoizedProps;
              switch (n.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a.autoFocus && t.focus();
                  break;
                case "img":
                  a.src && (t.src = a.src);
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
            if (n.memoizedState === null) {
              var s = n.alternate;
              if (s !== null) {
                var c = s.memoizedState;
                if (c !== null) {
                  var f = c.dehydrated;
                  f !== null && Ar(f);
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
            throw Error(P(163));
        }
        Pe || n.flags & 512 && Jo(n);
      } catch (d) {
        se(n, n.return, d);
      }
    }
    if (n === e) {
      O = null;
      break;
    }
    if (t = n.sibling, t !== null) {
      t.return = n.return, O = t;
      break;
    }
    O = n.return;
  }
}
function Ns(e) {
  for (; O !== null; ) {
    var n = O;
    if (n === e) {
      O = null;
      break;
    }
    var t = n.sibling;
    if (t !== null) {
      t.return = n.return, O = t;
      break;
    }
    O = n.return;
  }
}
function Ls(e) {
  for (; O !== null; ) {
    var n = O;
    try {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          var t = n.return;
          try {
            yl(4, n);
          } catch (a) {
            se(n, t, a);
          }
          break;
        case 1:
          var r = n.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = n.return;
            try {
              r.componentDidMount();
            } catch (a) {
              se(n, i, a);
            }
          }
          var l = n.return;
          try {
            Jo(n);
          } catch (a) {
            se(n, l, a);
          }
          break;
        case 5:
          var o = n.return;
          try {
            Jo(n);
          } catch (a) {
            se(n, o, a);
          }
      }
    } catch (a) {
      se(n, n.return, a);
    }
    if (n === e) {
      O = null;
      break;
    }
    var u = n.sibling;
    if (u !== null) {
      u.return = n.return, O = u;
      break;
    }
    O = n.return;
  }
}
var Bm = Math.ceil, nl = On.ReactCurrentDispatcher, Zu = On.ReactCurrentOwner, Je = On.ReactCurrentBatchConfig, Q = 0, ke = null, he = null, xe = 0, Ve = 0, At = bn(0), ye = 0, Kr = null, ht = 0, vl = 0, Ju = 0, _r = null, Re = null, bu = 0, Gt = 1 / 0, En = null, tl = !1, nu = null, Yn = null, yi = !1, Vn = null, rl = 0, Tr = 0, tu = null, Li = -1, Oi = 0;
function ze() {
  return Q & 6 ? fe() : Li !== -1 ? Li : Li = fe();
}
function Xn(e) {
  return e.mode & 1 ? Q & 2 && xe !== 0 ? xe & -xe : Sm.transition !== null ? (Oi === 0 && (Oi = sf()), Oi) : (e = X, e !== 0 || (e = window.event, e = e === void 0 ? 16 : gf(e.type)), e) : 1;
}
function cn(e, n, t, r) {
  if (50 < Tr) throw Tr = 0, tu = null, Error(P(185));
  qr(e, t, r), (!(Q & 2) || e !== ke) && (e === ke && (!(Q & 2) && (vl |= t), ye === 4 && Bn(e, xe)), Fe(e, r), t === 1 && Q === 0 && !(n.mode & 1) && (Gt = fe() + 500, hl && et()));
}
function Fe(e, n) {
  var t = e.callbackNode;
  Sh(e, n);
  var r = Ui(e, e === ke ? xe : 0);
  if (r === 0) t !== null && Ua(t), e.callbackNode = null, e.callbackPriority = 0;
  else if (n = r & -r, e.callbackPriority !== n) {
    if (t != null && Ua(t), n === 1) e.tag === 0 ? xm(Os.bind(null, e)) : Af(Os.bind(null, e)), ym(function() {
      !(Q & 6) && et();
    }), t = null;
    else {
      switch (cf(r)) {
        case 1:
          t = Pu;
          break;
        case 4:
          t = uf;
          break;
        case 16:
          t = Bi;
          break;
        case 536870912:
          t = af;
          break;
        default:
          t = Bi;
      }
      t = Rp(t, _p.bind(null, e));
    }
    e.callbackPriority = n, e.callbackNode = t;
  }
}
function _p(e, n) {
  if (Li = -1, Oi = 0, Q & 6) throw Error(P(327));
  var t = e.callbackNode;
  if (Vt() && e.callbackNode !== t) return null;
  var r = Ui(e, e === ke ? xe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || n) n = il(e, r);
  else {
    n = r;
    var i = Q;
    Q |= 2;
    var l = Ip();
    (ke !== e || xe !== n) && (En = null, Gt = fe() + 500, st(e, n));
    do
      try {
        Hm();
        break;
      } catch (u) {
        Tp(e, u);
      }
    while (!0);
    ju(), nl.current = l, Q = i, he !== null ? n = 0 : (ke = null, xe = 0, n = ye);
  }
  if (n !== 0) {
    if (n === 2 && (i = zo(e), i !== 0 && (r = i, n = ru(e, i))), n === 1) throw t = Kr, st(e, 0), Bn(e, r), Fe(e, fe()), t;
    if (n === 6) Bn(e, r);
    else {
      if (i = e.current.alternate, !(r & 30) && !Um(i) && (n = il(e, r), n === 2 && (l = zo(e), l !== 0 && (r = l, n = ru(e, l))), n === 1)) throw t = Kr, st(e, 0), Bn(e, r), Fe(e, fe()), t;
      switch (e.finishedWork = i, e.finishedLanes = r, n) {
        case 0:
        case 1:
          throw Error(P(345));
        case 2:
          it(e, Re, En);
          break;
        case 3:
          if (Bn(e, r), (r & 130023424) === r && (n = bu + 500 - fe(), 10 < n)) {
            if (Ui(e, 0) !== 0) break;
            if (i = e.suspendedLanes, (i & r) !== r) {
              ze(), e.pingedLanes |= e.suspendedLanes & i;
              break;
            }
            e.timeoutHandle = Fo(it.bind(null, e, Re, En), n);
            break;
          }
          it(e, Re, En);
          break;
        case 4:
          if (Bn(e, r), (r & 4194240) === r) break;
          for (n = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - sn(r);
            l = 1 << o, o = n[o], o > i && (i = o), r &= ~l;
          }
          if (r = i, r = fe() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Bm(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Fo(it.bind(null, e, Re, En), r);
            break;
          }
          it(e, Re, En);
          break;
        case 5:
          it(e, Re, En);
          break;
        default:
          throw Error(P(329));
      }
    }
  }
  return Fe(e, fe()), e.callbackNode === t ? _p.bind(null, e) : null;
}
function ru(e, n) {
  var t = _r;
  return e.current.memoizedState.isDehydrated && (st(e, n).flags |= 256), e = il(e, n), e !== 2 && (n = Re, Re = t, n !== null && iu(n)), e;
}
function iu(e) {
  Re === null ? Re = e : Re.push.apply(Re, e);
}
function Um(e) {
  for (var n = e; ; ) {
    if (n.flags & 16384) {
      var t = n.updateQueue;
      if (t !== null && (t = t.stores, t !== null)) for (var r = 0; r < t.length; r++) {
        var i = t[r], l = i.getSnapshot;
        i = i.value;
        try {
          if (!fn(l(), i)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (t = n.child, n.subtreeFlags & 16384 && t !== null) t.return = n, n = t;
    else {
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return !0;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }
  return !0;
}
function Bn(e, n) {
  for (n &= ~Ju, n &= ~vl, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n; ) {
    var t = 31 - sn(n), r = 1 << t;
    e[t] = -1, n &= ~r;
  }
}
function Os(e) {
  if (Q & 6) throw Error(P(327));
  Vt();
  var n = Ui(e, 0);
  if (!(n & 1)) return Fe(e, fe()), null;
  var t = il(e, n);
  if (e.tag !== 0 && t === 2) {
    var r = zo(e);
    r !== 0 && (n = r, t = ru(e, r));
  }
  if (t === 1) throw t = Kr, st(e, 0), Bn(e, n), Fe(e, fe()), t;
  if (t === 6) throw Error(P(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = n, it(e, Re, En), Fe(e, fe()), null;
}
function ea(e, n) {
  var t = Q;
  Q |= 1;
  try {
    return e(n);
  } finally {
    Q = t, Q === 0 && (Gt = fe() + 500, hl && et());
  }
}
function mt(e) {
  Vn !== null && Vn.tag === 0 && !(Q & 6) && Vt();
  var n = Q;
  Q |= 1;
  var t = Je.transition, r = X;
  try {
    if (Je.transition = null, X = 1, e) return e();
  } finally {
    X = r, Je.transition = t, Q = n, !(Q & 6) && et();
  }
}
function na() {
  Ve = At.current, te(At);
}
function st(e, n) {
  e.finishedWork = null, e.finishedLanes = 0;
  var t = e.timeoutHandle;
  if (t !== -1 && (e.timeoutHandle = -1, gm(t)), he !== null) for (t = he.return; t !== null; ) {
    var r = t;
    switch (Au(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Qi();
        break;
      case 3:
        Xt(), te(Ae), te(_e), Wu();
        break;
      case 5:
        $u(r);
        break;
      case 4:
        Xt();
        break;
      case 13:
        te(oe);
        break;
      case 19:
        te(oe);
        break;
      case 10:
        Bu(r.type._context);
        break;
      case 22:
      case 23:
        na();
    }
    t = t.return;
  }
  if (ke = e, he = e = qn(e.current, null), xe = Ve = n, ye = 0, Kr = null, Ju = vl = ht = 0, Re = _r = null, ut !== null) {
    for (n = 0; n < ut.length; n++) if (t = ut[n], r = t.interleaved, r !== null) {
      t.interleaved = null;
      var i = r.next, l = t.pending;
      if (l !== null) {
        var o = l.next;
        l.next = i, r.next = o;
      }
      t.pending = r;
    }
    ut = null;
  }
  return e;
}
function Tp(e, n) {
  do {
    var t = he;
    try {
      if (ju(), Ii.current = el, bi) {
        for (var r = ue.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), r = r.next;
        }
        bi = !1;
      }
      if (dt = 0, ve = ge = ue = null, Cr = !1, $r = 0, Zu.current = null, t === null || t.return === null) {
        ye = 1, Kr = n, he = null;
        break;
      }
      e: {
        var l = e, o = t.return, u = t, a = n;
        if (n = xe, u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var s = a, c = u, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var p = ks(o);
          if (p !== null) {
            p.flags &= -257, ws(p, o, u, l, n), p.mode & 1 && vs(l, s, n), n = p, a = s;
            var k = n.updateQueue;
            if (k === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(a), n.updateQueue = w;
            } else k.add(a);
            break e;
          } else {
            if (!(n & 1)) {
              vs(l, s, n), ta();
              break e;
            }
            a = Error(P(426));
          }
        } else if (ie && u.mode & 1) {
          var I = ks(o);
          if (I !== null) {
            !(I.flags & 65536) && (I.flags |= 256), ws(I, o, u, l, n), Mu(qt(a, u));
            break e;
          }
        }
        l = a = qt(a, u), ye !== 4 && (ye = 2), _r === null ? _r = [l] : _r.push(l), l = o;
        do {
          switch (l.tag) {
            case 3:
              l.flags |= 65536, n &= -n, l.lanes |= n;
              var h = cp(l, a, n);
              ps(l, h);
              break e;
            case 1:
              u = a;
              var m = l.type, y = l.stateNode;
              if (!(l.flags & 128) && (typeof m.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Yn === null || !Yn.has(y)))) {
                l.flags |= 65536, n &= -n, l.lanes |= n;
                var S = fp(l, u, n);
                ps(l, S);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      Np(t);
    } catch (C) {
      n = C, he === t && t !== null && (he = t = t.return);
      continue;
    }
    break;
  } while (!0);
}
function Ip() {
  var e = nl.current;
  return nl.current = el, e === null ? el : e;
}
function ta() {
  (ye === 0 || ye === 3 || ye === 2) && (ye = 4), ke === null || !(ht & 268435455) && !(vl & 268435455) || Bn(ke, xe);
}
function il(e, n) {
  var t = Q;
  Q |= 2;
  var r = Ip();
  (ke !== e || xe !== n) && (En = null, st(e, n));
  do
    try {
      Vm();
      break;
    } catch (i) {
      Tp(e, i);
    }
  while (!0);
  if (ju(), Q = t, nl.current = r, he !== null) throw Error(P(261));
  return ke = null, xe = 0, ye;
}
function Vm() {
  for (; he !== null; ) zp(he);
}
function Hm() {
  for (; he !== null && !dh(); ) zp(he);
}
function zp(e) {
  var n = Op(e.alternate, e, Ve);
  e.memoizedProps = e.pendingProps, n === null ? Np(e) : he = n, Zu.current = null;
}
function Np(e) {
  var n = e;
  do {
    var t = n.alternate;
    if (e = n.return, n.flags & 32768) {
      if (t = Am(t, n), t !== null) {
        t.flags &= 32767, he = t;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ye = 6, he = null;
        return;
      }
    } else if (t = Dm(t, n, Ve), t !== null) {
      he = t;
      return;
    }
    if (n = n.sibling, n !== null) {
      he = n;
      return;
    }
    he = n = e;
  } while (n !== null);
  ye === 0 && (ye = 5);
}
function it(e, n, t) {
  var r = X, i = Je.transition;
  try {
    Je.transition = null, X = 1, $m(e, n, t, r);
  } finally {
    Je.transition = i, X = r;
  }
  return null;
}
function $m(e, n, t, r) {
  do
    Vt();
  while (Vn !== null);
  if (Q & 6) throw Error(P(327));
  t = e.finishedWork;
  var i = e.finishedLanes;
  if (t === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, t === e.current) throw Error(P(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var l = t.lanes | t.childLanes;
  if (Eh(e, l), e === ke && (he = ke = null, xe = 0), !(t.subtreeFlags & 2064) && !(t.flags & 2064) || yi || (yi = !0, Rp(Bi, function() {
    return Vt(), null;
  })), l = (t.flags & 15990) !== 0, t.subtreeFlags & 15990 || l) {
    l = Je.transition, Je.transition = null;
    var o = X;
    X = 1;
    var u = Q;
    Q |= 4, Zu.current = null, Fm(e, t), Cp(t, e), sm(Ao), Vi = !!Do, Ao = Do = null, e.current = t, jm(t), hh(), Q = u, X = o, Je.transition = l;
  } else e.current = t;
  if (yi && (yi = !1, Vn = e, rl = i), l = e.pendingLanes, l === 0 && (Yn = null), yh(t.stateNode), Fe(e, fe()), n !== null) for (r = e.onRecoverableError, t = 0; t < n.length; t++) i = n[t], r(i.value, { componentStack: i.stack, digest: i.digest });
  if (tl) throw tl = !1, e = nu, nu = null, e;
  return rl & 1 && e.tag !== 0 && Vt(), l = e.pendingLanes, l & 1 ? e === tu ? Tr++ : (Tr = 0, tu = e) : Tr = 0, et(), null;
}
function Vt() {
  if (Vn !== null) {
    var e = cf(rl), n = Je.transition, t = X;
    try {
      if (Je.transition = null, X = 16 > e ? 16 : e, Vn === null) var r = !1;
      else {
        if (e = Vn, Vn = null, rl = 0, Q & 6) throw Error(P(331));
        var i = Q;
        for (Q |= 4, O = e.current; O !== null; ) {
          var l = O, o = l.child;
          if (O.flags & 16) {
            var u = l.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var s = u[a];
                for (O = s; O !== null; ) {
                  var c = O;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pr(8, c, l);
                  }
                  var f = c.child;
                  if (f !== null) f.return = c, O = f;
                  else for (; O !== null; ) {
                    c = O;
                    var d = c.sibling, p = c.return;
                    if (xp(c), c === s) {
                      O = null;
                      break;
                    }
                    if (d !== null) {
                      d.return = p, O = d;
                      break;
                    }
                    O = p;
                  }
                }
              }
              var k = l.alternate;
              if (k !== null) {
                var w = k.child;
                if (w !== null) {
                  k.child = null;
                  do {
                    var I = w.sibling;
                    w.sibling = null, w = I;
                  } while (w !== null);
                }
              }
              O = l;
            }
          }
          if (l.subtreeFlags & 2064 && o !== null) o.return = l, O = o;
          else e: for (; O !== null; ) {
            if (l = O, l.flags & 2048) switch (l.tag) {
              case 0:
              case 11:
              case 15:
                Pr(9, l, l.return);
            }
            var h = l.sibling;
            if (h !== null) {
              h.return = l.return, O = h;
              break e;
            }
            O = l.return;
          }
        }
        var m = e.current;
        for (O = m; O !== null; ) {
          o = O;
          var y = o.child;
          if (o.subtreeFlags & 2064 && y !== null) y.return = o, O = y;
          else e: for (o = m; O !== null; ) {
            if (u = O, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  yl(9, u);
              }
            } catch (C) {
              se(u, u.return, C);
            }
            if (u === o) {
              O = null;
              break e;
            }
            var S = u.sibling;
            if (S !== null) {
              S.return = u.return, O = S;
              break e;
            }
            O = u.return;
          }
        }
        if (Q = i, et(), vn && typeof vn.onPostCommitFiberRoot == "function") try {
          vn.onPostCommitFiberRoot(sl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      X = t, Je.transition = n;
    }
  }
  return !1;
}
function Rs(e, n, t) {
  n = qt(t, n), n = cp(e, n, 1), e = Kn(e, n, 1), n = ze(), e !== null && (qr(e, 1, n), Fe(e, n));
}
function se(e, n, t) {
  if (e.tag === 3) Rs(e, e, t);
  else for (; n !== null; ) {
    if (n.tag === 3) {
      Rs(n, e, t);
      break;
    } else if (n.tag === 1) {
      var r = n.stateNode;
      if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Yn === null || !Yn.has(r))) {
        e = qt(t, e), e = fp(n, e, 1), n = Kn(n, e, 1), e = ze(), n !== null && (qr(n, 1, e), Fe(n, e));
        break;
      }
    }
    n = n.return;
  }
}
function Wm(e, n, t) {
  var r = e.pingCache;
  r !== null && r.delete(n), n = ze(), e.pingedLanes |= e.suspendedLanes & t, ke === e && (xe & t) === t && (ye === 4 || ye === 3 && (xe & 130023424) === xe && 500 > fe() - bu ? st(e, 0) : Ju |= t), Fe(e, n);
}
function Lp(e, n) {
  n === 0 && (e.mode & 1 ? (n = ui, ui <<= 1, !(ui & 130023424) && (ui = 4194304)) : n = 1);
  var t = ze();
  e = Nn(e, n), e !== null && (qr(e, n, t), Fe(e, t));
}
function Qm(e) {
  var n = e.memoizedState, t = 0;
  n !== null && (t = n.retryLane), Lp(e, t);
}
function Km(e, n) {
  var t = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, i = e.memoizedState;
      i !== null && (t = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(P(314));
  }
  r !== null && r.delete(n), Lp(e, t);
}
var Op;
Op = function(e, n, t) {
  if (e !== null) if (e.memoizedProps !== n.pendingProps || Ae.current) De = !0;
  else {
    if (!(e.lanes & t) && !(n.flags & 128)) return De = !1, Rm(e, n, t);
    De = !!(e.flags & 131072);
  }
  else De = !1, ie && n.flags & 1048576 && Mf(n, Xi, n.index);
  switch (n.lanes = 0, n.tag) {
    case 2:
      var r = n.type;
      Ni(e, n), e = n.pendingProps;
      var i = Qt(n, _e.current);
      Ut(n, t), i = Ku(null, n, r, e, i, t);
      var l = Yu();
      return n.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, Me(r) ? (l = !0, Ki(n)) : l = !1, n.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, Vu(n), i.updater = gl, n.stateNode = i, i._reactInternals = n, Wo(n, r, e, t), n = Yo(null, n, r, !0, l, t)) : (n.tag = 0, ie && l && Du(n), Ie(null, n, i, t), n = n.child), n;
    case 16:
      r = n.elementType;
      e: {
        switch (Ni(e, n), e = n.pendingProps, i = r._init, r = i(r._payload), n.type = r, i = n.tag = Xm(r), e = on(r, e), i) {
          case 0:
            n = Ko(null, n, r, e, t);
            break e;
          case 1:
            n = Es(null, n, r, e, t);
            break e;
          case 11:
            n = xs(null, n, r, e, t);
            break e;
          case 14:
            n = Ss(null, n, r, on(r.type, e), t);
            break e;
        }
        throw Error(P(
          306,
          r,
          ""
        ));
      }
      return n;
    case 0:
      return r = n.type, i = n.pendingProps, i = n.elementType === r ? i : on(r, i), Ko(e, n, r, i, t);
    case 1:
      return r = n.type, i = n.pendingProps, i = n.elementType === r ? i : on(r, i), Es(e, n, r, i, t);
    case 3:
      e: {
        if (mp(n), e === null) throw Error(P(387));
        r = n.pendingProps, l = n.memoizedState, i = l.element, Hf(e, n), Zi(n, r, null, t);
        var o = n.memoizedState;
        if (r = o.element, l.isDehydrated) if (l = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, n.updateQueue.baseState = l, n.memoizedState = l, n.flags & 256) {
          i = qt(Error(P(423)), n), n = Cs(e, n, r, t, i);
          break e;
        } else if (r !== i) {
          i = qt(Error(P(424)), n), n = Cs(e, n, r, t, i);
          break e;
        } else for (He = Qn(n.stateNode.containerInfo.firstChild), We = n, ie = !0, an = null, t = Uf(n, null, r, t), n.child = t; t; ) t.flags = t.flags & -3 | 4096, t = t.sibling;
        else {
          if (Kt(), r === i) {
            n = Ln(e, n, t);
            break e;
          }
          Ie(e, n, r, t);
        }
        n = n.child;
      }
      return n;
    case 5:
      return $f(n), e === null && Vo(n), r = n.type, i = n.pendingProps, l = e !== null ? e.memoizedProps : null, o = i.children, Mo(r, i) ? o = null : l !== null && Mo(r, l) && (n.flags |= 32), hp(e, n), Ie(e, n, o, t), n.child;
    case 6:
      return e === null && Vo(n), null;
    case 13:
      return gp(e, n, t);
    case 4:
      return Hu(n, n.stateNode.containerInfo), r = n.pendingProps, e === null ? n.child = Yt(n, null, r, t) : Ie(e, n, r, t), n.child;
    case 11:
      return r = n.type, i = n.pendingProps, i = n.elementType === r ? i : on(r, i), xs(e, n, r, i, t);
    case 7:
      return Ie(e, n, n.pendingProps, t), n.child;
    case 8:
      return Ie(e, n, n.pendingProps.children, t), n.child;
    case 12:
      return Ie(e, n, n.pendingProps.children, t), n.child;
    case 10:
      e: {
        if (r = n.type._context, i = n.pendingProps, l = n.memoizedProps, o = i.value, J(qi, r._currentValue), r._currentValue = o, l !== null) if (fn(l.value, o)) {
          if (l.children === i.children && !Ae.current) {
            n = Ln(e, n, t);
            break e;
          }
        } else for (l = n.child, l !== null && (l.return = n); l !== null; ) {
          var u = l.dependencies;
          if (u !== null) {
            o = l.child;
            for (var a = u.firstContext; a !== null; ) {
              if (a.context === r) {
                if (l.tag === 1) {
                  a = Tn(-1, t & -t), a.tag = 2;
                  var s = l.updateQueue;
                  if (s !== null) {
                    s = s.shared;
                    var c = s.pending;
                    c === null ? a.next = a : (a.next = c.next, c.next = a), s.pending = a;
                  }
                }
                l.lanes |= t, a = l.alternate, a !== null && (a.lanes |= t), Ho(
                  l.return,
                  t,
                  n
                ), u.lanes |= t;
                break;
              }
              a = a.next;
            }
          } else if (l.tag === 10) o = l.type === n.type ? null : l.child;
          else if (l.tag === 18) {
            if (o = l.return, o === null) throw Error(P(341));
            o.lanes |= t, u = o.alternate, u !== null && (u.lanes |= t), Ho(o, t, n), o = l.sibling;
          } else o = l.child;
          if (o !== null) o.return = l;
          else for (o = l; o !== null; ) {
            if (o === n) {
              o = null;
              break;
            }
            if (l = o.sibling, l !== null) {
              l.return = o.return, o = l;
              break;
            }
            o = o.return;
          }
          l = o;
        }
        Ie(e, n, i.children, t), n = n.child;
      }
      return n;
    case 9:
      return i = n.type, r = n.pendingProps.children, Ut(n, t), i = be(i), r = r(i), n.flags |= 1, Ie(e, n, r, t), n.child;
    case 14:
      return r = n.type, i = on(r, n.pendingProps), i = on(r.type, i), Ss(e, n, r, i, t);
    case 15:
      return pp(e, n, n.type, n.pendingProps, t);
    case 17:
      return r = n.type, i = n.pendingProps, i = n.elementType === r ? i : on(r, i), Ni(e, n), n.tag = 1, Me(r) ? (e = !0, Ki(n)) : e = !1, Ut(n, t), sp(n, r, i), Wo(n, r, i, t), Yo(null, n, r, !0, e, t);
    case 19:
      return yp(e, n, t);
    case 22:
      return dp(e, n, t);
  }
  throw Error(P(156, n.tag));
};
function Rp(e, n) {
  return of(e, n);
}
function Ym(e, n, t, r) {
  this.tag = e, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ze(e, n, t, r) {
  return new Ym(e, n, t, r);
}
function ra(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Xm(e) {
  if (typeof e == "function") return ra(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Su) return 11;
    if (e === Eu) return 14;
  }
  return 2;
}
function qn(e, n) {
  var t = e.alternate;
  return t === null ? (t = Ze(e.tag, n, e.key, e.mode), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = n, t.type = e.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = e.flags & 14680064, t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, n = e.dependencies, t.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t;
}
function Ri(e, n, t, r, i, l) {
  var o = 2;
  if (r = e, typeof e == "function") ra(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Pt:
      return ct(t.children, i, l, n);
    case xu:
      o = 8, i |= 8;
      break;
    case ho:
      return e = Ze(12, t, n, i | 2), e.elementType = ho, e.lanes = l, e;
    case mo:
      return e = Ze(13, t, n, i), e.elementType = mo, e.lanes = l, e;
    case go:
      return e = Ze(19, t, n, i), e.elementType = go, e.lanes = l, e;
    case Hc:
      return kl(t, i, l, n);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Uc:
          o = 10;
          break e;
        case Vc:
          o = 9;
          break e;
        case Su:
          o = 11;
          break e;
        case Eu:
          o = 14;
          break e;
        case Mn:
          o = 16, r = null;
          break e;
      }
      throw Error(P(130, e == null ? e : typeof e, ""));
  }
  return n = Ze(o, t, n, i), n.elementType = e, n.type = r, n.lanes = l, n;
}
function ct(e, n, t, r) {
  return e = Ze(7, e, r, n), e.lanes = t, e;
}
function kl(e, n, t, r) {
  return e = Ze(22, e, r, n), e.elementType = Hc, e.lanes = t, e.stateNode = { isHidden: !1 }, e;
}
function Jl(e, n, t) {
  return e = Ze(6, e, null, n), e.lanes = t, e;
}
function bl(e, n, t) {
  return n = Ze(4, e.children !== null ? e.children : [], e.key, n), n.lanes = t, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
}
function qm(e, n, t, r, i) {
  this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Rl(0), this.expirationTimes = Rl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Rl(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
}
function ia(e, n, t, r, i, l, o, u, a) {
  return e = new qm(e, n, t, u, a), n === 1 ? (n = 1, l === !0 && (n |= 8)) : n = 0, l = Ze(3, null, null, n), e.current = l, l.stateNode = e, l.memoizedState = { element: r, isDehydrated: t, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Vu(l), e;
}
function Gm(e, n, t) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ct, key: r == null ? null : "" + r, children: e, containerInfo: n, implementation: t };
}
function Dp(e) {
  if (!e) return Zn;
  e = e._reactInternals;
  e: {
    if (yt(e) !== e || e.tag !== 1) throw Error(P(170));
    var n = e;
    do {
      switch (n.tag) {
        case 3:
          n = n.stateNode.context;
          break e;
        case 1:
          if (Me(n.type)) {
            n = n.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      n = n.return;
    } while (n !== null);
    throw Error(P(171));
  }
  if (e.tag === 1) {
    var t = e.type;
    if (Me(t)) return Df(e, t, n);
  }
  return n;
}
function Ap(e, n, t, r, i, l, o, u, a) {
  return e = ia(t, r, !0, e, i, l, o, u, a), e.context = Dp(null), t = e.current, r = ze(), i = Xn(t), l = Tn(r, i), l.callback = n ?? null, Kn(t, l, i), e.current.lanes = i, qr(e, i, r), Fe(e, r), e;
}
function wl(e, n, t, r) {
  var i = n.current, l = ze(), o = Xn(i);
  return t = Dp(t), n.context === null ? n.context = t : n.pendingContext = t, n = Tn(l, o), n.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (n.callback = r), e = Kn(i, n, o), e !== null && (cn(e, i, o, l), Ti(e, i, o)), o;
}
function ll(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ds(e, n) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var t = e.retryLane;
    e.retryLane = t !== 0 && t < n ? t : n;
  }
}
function la(e, n) {
  Ds(e, n), (e = e.alternate) && Ds(e, n);
}
function Zm() {
  return null;
}
var Mp = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function oa(e) {
  this._internalRoot = e;
}
xl.prototype.render = oa.prototype.render = function(e) {
  var n = this._internalRoot;
  if (n === null) throw Error(P(409));
  wl(e, n, null, null);
};
xl.prototype.unmount = oa.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var n = e.containerInfo;
    mt(function() {
      wl(null, e, null, null);
    }), n[zn] = null;
  }
};
function xl(e) {
  this._internalRoot = e;
}
xl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var n = df();
    e = { blockedOn: null, target: e, priority: n };
    for (var t = 0; t < jn.length && n !== 0 && n < jn[t].priority; t++) ;
    jn.splice(t, 0, e), t === 0 && mf(e);
  }
};
function ua(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Sl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function As() {
}
function Jm(e, n, t, r, i) {
  if (i) {
    if (typeof r == "function") {
      var l = r;
      r = function() {
        var s = ll(o);
        l.call(s);
      };
    }
    var o = Ap(n, r, e, 0, null, !1, !1, "", As);
    return e._reactRootContainer = o, e[zn] = o.current, jr(e.nodeType === 8 ? e.parentNode : e), mt(), o;
  }
  for (; i = e.lastChild; ) e.removeChild(i);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var s = ll(a);
      u.call(s);
    };
  }
  var a = ia(e, 0, !1, null, null, !1, !1, "", As);
  return e._reactRootContainer = a, e[zn] = a.current, jr(e.nodeType === 8 ? e.parentNode : e), mt(function() {
    wl(n, a, t, r);
  }), a;
}
function El(e, n, t, r, i) {
  var l = t._reactRootContainer;
  if (l) {
    var o = l;
    if (typeof i == "function") {
      var u = i;
      i = function() {
        var a = ll(o);
        u.call(a);
      };
    }
    wl(n, o, e, i);
  } else o = Jm(t, n, e, i, r);
  return ll(o);
}
ff = function(e) {
  switch (e.tag) {
    case 3:
      var n = e.stateNode;
      if (n.current.memoizedState.isDehydrated) {
        var t = yr(n.pendingLanes);
        t !== 0 && (_u(n, t | 1), Fe(n, fe()), !(Q & 6) && (Gt = fe() + 500, et()));
      }
      break;
    case 13:
      mt(function() {
        var r = Nn(e, 1);
        if (r !== null) {
          var i = ze();
          cn(r, e, 1, i);
        }
      }), la(e, 1);
  }
};
Tu = function(e) {
  if (e.tag === 13) {
    var n = Nn(e, 134217728);
    if (n !== null) {
      var t = ze();
      cn(n, e, 134217728, t);
    }
    la(e, 134217728);
  }
};
pf = function(e) {
  if (e.tag === 13) {
    var n = Xn(e), t = Nn(e, n);
    if (t !== null) {
      var r = ze();
      cn(t, e, n, r);
    }
    la(e, n);
  }
};
df = function() {
  return X;
};
hf = function(e, n) {
  var t = X;
  try {
    return X = e, n();
  } finally {
    X = t;
  }
};
_o = function(e, n, t) {
  switch (n) {
    case "input":
      if (ko(e, t), n = t.name, t.type === "radio" && n != null) {
        for (t = e; t.parentNode; ) t = t.parentNode;
        for (t = t.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < t.length; n++) {
          var r = t[n];
          if (r !== e && r.form === e.form) {
            var i = dl(r);
            if (!i) throw Error(P(90));
            Wc(r), ko(r, i);
          }
        }
      }
      break;
    case "textarea":
      Kc(e, t);
      break;
    case "select":
      n = t.value, n != null && Mt(e, !!t.multiple, n, !1);
  }
};
bc = ea;
ef = mt;
var bm = { usingClientEntryPoint: !1, Events: [Zr, zt, dl, Zc, Jc, ea] }, fr = { findFiberByHostInstance: ot, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, eg = { bundleType: fr.bundleType, version: fr.version, rendererPackageName: fr.rendererPackageName, rendererConfig: fr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: On.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = rf(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: fr.findFiberByHostInstance || Zm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var vi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vi.isDisabled && vi.supportsFiber) try {
    sl = vi.inject(eg), vn = vi;
  } catch {
  }
}
Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bm;
Ke.createPortal = function(e, n) {
  var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ua(n)) throw Error(P(200));
  return Gm(e, n, null, t);
};
Ke.createRoot = function(e, n) {
  if (!ua(e)) throw Error(P(299));
  var t = !1, r = "", i = Mp;
  return n != null && (n.unstable_strictMode === !0 && (t = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), n = ia(e, 1, !1, null, null, t, !1, r, i), e[zn] = n.current, jr(e.nodeType === 8 ? e.parentNode : e), new oa(n);
};
Ke.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var n = e._reactInternals;
  if (n === void 0)
    throw typeof e.render == "function" ? Error(P(188)) : (e = Object.keys(e).join(","), Error(P(268, e)));
  return e = rf(n), e = e === null ? null : e.stateNode, e;
};
Ke.flushSync = function(e) {
  return mt(e);
};
Ke.hydrate = function(e, n, t) {
  if (!Sl(n)) throw Error(P(200));
  return El(null, e, n, !0, t);
};
Ke.hydrateRoot = function(e, n, t) {
  if (!ua(e)) throw Error(P(405));
  var r = t != null && t.hydratedSources || null, i = !1, l = "", o = Mp;
  if (t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), n = Ap(n, null, e, 1, t ?? null, i, !1, l, o), e[zn] = n.current, jr(e), r) for (e = 0; e < r.length; e++) t = r[e], i = t._getVersion, i = i(t._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [t, i] : n.mutableSourceEagerHydrationData.push(
    t,
    i
  );
  return new xl(n);
};
Ke.render = function(e, n, t) {
  if (!Sl(n)) throw Error(P(200));
  return El(null, e, n, !1, t);
};
Ke.unmountComponentAtNode = function(e) {
  if (!Sl(e)) throw Error(P(40));
  return e._reactRootContainer ? (mt(function() {
    El(null, null, e, !1, function() {
      e._reactRootContainer = null, e[zn] = null;
    });
  }), !0) : !1;
};
Ke.unstable_batchedUpdates = ea;
Ke.unstable_renderSubtreeIntoContainer = function(e, n, t, r) {
  if (!Sl(t)) throw Error(P(200));
  if (e == null || e._reactInternals === void 0) throw Error(P(38));
  return El(e, n, t, !1, r);
};
Ke.version = "18.3.1-next-f1338f8080-20240426";
function Fp() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fp);
    } catch (e) {
      console.error(e);
    }
}
Fp(), Mc.exports = Ke;
var ng = Mc.exports, jp, Ms = ng;
jp = Ms.createRoot, Ms.hydrateRoot;
let Bp = re.createContext(
  /** @type {any} */
  null
);
function tg() {
  let e = re.useContext(Bp);
  if (!e) throw new Error("RenderContext not found");
  return e;
}
function rg() {
  return tg().model;
}
function pr(e) {
  let n = rg(), [t, r] = re.useState(n.get(e));
  return re.useEffect(() => {
    let i = () => r(n.get(e));
    return n.on(`change:${e}`, i), () => n.off(`change:${e}`, i);
  }, [n, e]), [
    t,
    (i) => {
      n.set(e, i), n.save_changes();
    }
  ];
}
function ig(e) {
  return ({ el: n, model: t, experimental: r }) => {
    let i = jp(n);
    return i.render(
      re.createElement(
        re.StrictMode,
        null,
        re.createElement(
          Bp.Provider,
          { value: { model: t, experimental: r } },
          re.createElement(e)
        )
      )
    ), () => i.unmount();
  };
}
function lg(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const og = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ug = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ag = {};
function Fs(e, n) {
  return (ag.jsx ? ug : og).test(e);
}
const sg = /[ \t\n\f\r]/g;
function cg(e) {
  return typeof e == "object" ? e.type === "text" ? js(e.value) : !1 : js(e);
}
function js(e) {
  return e.replace(sg, "") === "";
}
class br {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(n, t, r) {
    this.property = n, this.normal = t, r && (this.space = r);
  }
}
br.prototype.property = {};
br.prototype.normal = {};
br.prototype.space = null;
function Up(e, n) {
  const t = {}, r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(t, e[i].property), Object.assign(r, e[i].normal);
  return new br(t, r, n);
}
function lu(e) {
  return e.toLowerCase();
}
class nn {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(n, t) {
    this.property = n, this.attribute = t;
  }
}
nn.prototype.space = null;
nn.prototype.boolean = !1;
nn.prototype.booleanish = !1;
nn.prototype.overloadedBoolean = !1;
nn.prototype.number = !1;
nn.prototype.commaSeparated = !1;
nn.prototype.spaceSeparated = !1;
nn.prototype.commaOrSpaceSeparated = !1;
nn.prototype.mustUseProperty = !1;
nn.prototype.defined = !1;
let fg = 0;
const U = vt(), de = vt(), Vp = vt(), _ = vt(), Z = vt(), Ht = vt(), Ue = vt();
function vt() {
  return 2 ** ++fg;
}
const ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: U,
  booleanish: de,
  commaOrSpaceSeparated: Ue,
  commaSeparated: Ht,
  number: _,
  overloadedBoolean: Vp,
  spaceSeparated: Z
}, Symbol.toStringTag, { value: "Module" })), eo = Object.keys(ou);
class aa extends nn {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(n, t, r, i) {
    let l = -1;
    if (super(n, t), Bs(this, "space", i), typeof r == "number")
      for (; ++l < eo.length; ) {
        const o = eo[l];
        Bs(this, eo[l], (r & ou[o]) === ou[o]);
      }
  }
}
aa.prototype.defined = !0;
function Bs(e, n, t) {
  t && (e[n] = t);
}
const pg = {}.hasOwnProperty;
function er(e) {
  const n = {}, t = {};
  let r;
  for (r in e.properties)
    if (pg.call(e.properties, r)) {
      const i = e.properties[r], l = new aa(
        r,
        e.transform(e.attributes || {}, r),
        i,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), n[r] = l, t[lu(r)] = r, t[lu(l.attribute)] = r;
    }
  return new br(n, t, e.space);
}
const Hp = er({
  space: "xlink",
  transform(e, n) {
    return "xlink:" + n.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
}), $p = er({
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function Wp(e, n) {
  return n in e ? e[n] : n;
}
function Qp(e, n) {
  return Wp(e, n.toLowerCase());
}
const Kp = er({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: Qp,
  properties: { xmlns: null, xmlnsXLink: null }
}), Yp = er({
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: de,
    ariaAutoComplete: null,
    ariaBusy: de,
    ariaChecked: de,
    ariaColCount: _,
    ariaColIndex: _,
    ariaColSpan: _,
    ariaControls: Z,
    ariaCurrent: null,
    ariaDescribedBy: Z,
    ariaDetails: null,
    ariaDisabled: de,
    ariaDropEffect: Z,
    ariaErrorMessage: null,
    ariaExpanded: de,
    ariaFlowTo: Z,
    ariaGrabbed: de,
    ariaHasPopup: null,
    ariaHidden: de,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Z,
    ariaLevel: _,
    ariaLive: null,
    ariaModal: de,
    ariaMultiLine: de,
    ariaMultiSelectable: de,
    ariaOrientation: null,
    ariaOwns: Z,
    ariaPlaceholder: null,
    ariaPosInSet: _,
    ariaPressed: de,
    ariaReadOnly: de,
    ariaRelevant: null,
    ariaRequired: de,
    ariaRoleDescription: Z,
    ariaRowCount: _,
    ariaRowIndex: _,
    ariaRowSpan: _,
    ariaSelected: de,
    ariaSetSize: _,
    ariaSort: null,
    ariaValueMax: _,
    ariaValueMin: _,
    ariaValueNow: _,
    ariaValueText: null,
    role: null
  }
}), dg = er({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: Qp,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Ht,
    acceptCharset: Z,
    accessKey: Z,
    action: null,
    allow: null,
    allowFullScreen: U,
    allowPaymentRequest: U,
    allowUserMedia: U,
    alt: null,
    as: null,
    async: U,
    autoCapitalize: null,
    autoComplete: Z,
    autoFocus: U,
    autoPlay: U,
    blocking: Z,
    capture: null,
    charSet: null,
    checked: U,
    cite: null,
    className: Z,
    cols: _,
    colSpan: null,
    content: null,
    contentEditable: de,
    controls: U,
    controlsList: Z,
    coords: _ | Ht,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: U,
    defer: U,
    dir: null,
    dirName: null,
    disabled: U,
    download: Vp,
    draggable: de,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: U,
    formTarget: null,
    headers: Z,
    height: _,
    hidden: U,
    high: _,
    href: null,
    hrefLang: null,
    htmlFor: Z,
    httpEquiv: Z,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: U,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: U,
    itemId: null,
    itemProp: Z,
    itemRef: Z,
    itemScope: U,
    itemType: Z,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: U,
    low: _,
    manifest: null,
    max: null,
    maxLength: _,
    media: null,
    method: null,
    min: null,
    minLength: _,
    multiple: U,
    muted: U,
    name: null,
    nonce: null,
    noModule: U,
    noValidate: U,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: U,
    optimum: _,
    pattern: null,
    ping: Z,
    placeholder: null,
    playsInline: U,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: U,
    referrerPolicy: null,
    rel: Z,
    required: U,
    reversed: U,
    rows: _,
    rowSpan: _,
    sandbox: Z,
    scope: null,
    scoped: U,
    seamless: U,
    selected: U,
    shadowRootClonable: U,
    shadowRootDelegatesFocus: U,
    shadowRootMode: null,
    shape: null,
    size: _,
    sizes: null,
    slot: null,
    span: _,
    spellCheck: de,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: _,
    step: null,
    style: null,
    tabIndex: _,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: U,
    useMap: null,
    value: de,
    width: _,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Z,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: _,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: _,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: U,
    // Lists. Use CSS to reduce space between items instead
    declare: U,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: _,
    // `<img>` and `<object>`
    leftMargin: _,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: _,
    // `<body>`
    marginWidth: _,
    // `<body>`
    noResize: U,
    // `<frame>`
    noHref: U,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: U,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: U,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: _,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: de,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: _,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: _,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: U,
    disableRemotePlayback: U,
    prefix: null,
    property: null,
    results: _,
    security: null,
    unselectable: null
  }
}), hg = er({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: Wp,
  properties: {
    about: Ue,
    accentHeight: _,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: _,
    amplitude: _,
    arabicForm: null,
    ascent: _,
    attributeName: null,
    attributeType: null,
    azimuth: _,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: _,
    by: null,
    calcMode: null,
    capHeight: _,
    className: Z,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: _,
    diffuseConstant: _,
    direction: null,
    display: null,
    dur: null,
    divisor: _,
    dominantBaseline: null,
    download: U,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: _,
    enableBackground: null,
    end: null,
    event: null,
    exponent: _,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: _,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Ht,
    g2: Ht,
    glyphName: Ht,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: _,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: _,
    horizOriginX: _,
    horizOriginY: _,
    id: null,
    ideographic: _,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: _,
    k: _,
    k1: _,
    k2: _,
    k3: _,
    k4: _,
    kernelMatrix: Ue,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: _,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: _,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: _,
    overlineThickness: _,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: _,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Z,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: _,
    pointsAtY: _,
    pointsAtZ: _,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Ue,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Ue,
    rev: Ue,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Ue,
    requiredFeatures: Ue,
    requiredFonts: Ue,
    requiredFormats: Ue,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: _,
    specularExponent: _,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: _,
    strikethroughThickness: _,
    string: null,
    stroke: null,
    strokeDashArray: Ue,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: _,
    strokeOpacity: _,
    strokeWidth: null,
    style: null,
    surfaceScale: _,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Ue,
    tabIndex: _,
    tableValues: null,
    target: null,
    targetX: _,
    targetY: _,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Ue,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: _,
    underlineThickness: _,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: _,
    values: null,
    vAlphabetic: _,
    vMathematical: _,
    vectorEffect: null,
    vHanging: _,
    vIdeographic: _,
    version: null,
    vertAdvY: _,
    vertOriginX: _,
    vertOriginY: _,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: _,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), mg = /^data[-\w.:]+$/i, Us = /-[a-z]/g, gg = /[A-Z]/g;
function yg(e, n) {
  const t = lu(n);
  let r = n, i = nn;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && mg.test(n)) {
    if (n.charAt(4) === "-") {
      const l = n.slice(5).replace(Us, kg);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = n.slice(4);
      if (!Us.test(l)) {
        let o = l.replace(gg, vg);
        o.charAt(0) !== "-" && (o = "-" + o), n = "data" + o;
      }
    }
    i = aa;
  }
  return new i(r, n);
}
function vg(e) {
  return "-" + e.toLowerCase();
}
function kg(e) {
  return e.charAt(1).toUpperCase();
}
const wg = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, xg = Up([$p, Hp, Kp, Yp, dg], "html"), sa = Up([$p, Hp, Kp, Yp, hg], "svg");
function Sg(e) {
  return e.join(" ").trim();
}
var Xp = {}, Vs = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Eg = /\n/g, Cg = /^\s*/, Pg = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, _g = /^:\s*/, Tg = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Ig = /^[;\s]*/, zg = /^\s+|\s+$/g, Ng = `
`, Hs = "/", $s = "*", lt = "", Lg = "comment", Og = "declaration", Rg = function(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function i(k) {
    var w = k.match(Eg);
    w && (t += w.length);
    var I = k.lastIndexOf(Ng);
    r = ~I ? k.length - I : r + k.length;
  }
  function l() {
    var k = { line: t, column: r };
    return function(w) {
      return w.position = new o(k), s(), w;
    };
  }
  function o(k) {
    this.start = k, this.end = { line: t, column: r }, this.source = n.source;
  }
  o.prototype.content = e;
  function u(k) {
    var w = new Error(
      n.source + ":" + t + ":" + r + ": " + k
    );
    if (w.reason = k, w.filename = n.source, w.line = t, w.column = r, w.source = e, !n.silent) throw w;
  }
  function a(k) {
    var w = k.exec(e);
    if (w) {
      var I = w[0];
      return i(I), e = e.slice(I.length), w;
    }
  }
  function s() {
    a(Cg);
  }
  function c(k) {
    var w;
    for (k = k || []; w = f(); )
      w !== !1 && k.push(w);
    return k;
  }
  function f() {
    var k = l();
    if (!(Hs != e.charAt(0) || $s != e.charAt(1))) {
      for (var w = 2; lt != e.charAt(w) && ($s != e.charAt(w) || Hs != e.charAt(w + 1)); )
        ++w;
      if (w += 2, lt === e.charAt(w - 1))
        return u("End of comment missing");
      var I = e.slice(2, w - 2);
      return r += 2, i(I), e = e.slice(w), r += 2, k({
        type: Lg,
        comment: I
      });
    }
  }
  function d() {
    var k = l(), w = a(Pg);
    if (w) {
      if (f(), !a(_g)) return u("property missing ':'");
      var I = a(Tg), h = k({
        type: Og,
        property: Ws(w[0].replace(Vs, lt)),
        value: I ? Ws(I[0].replace(Vs, lt)) : lt
      });
      return a(Ig), h;
    }
  }
  function p() {
    var k = [];
    c(k);
    for (var w; w = d(); )
      w !== !1 && (k.push(w), c(k));
    return k;
  }
  return s(), p();
};
function Ws(e) {
  return e ? e.replace(zg, lt) : lt;
}
var Dg = Ta && Ta.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Xp, "__esModule", { value: !0 });
var Qs = Xp.default = Mg, Ag = Dg(Rg);
function Mg(e, n) {
  var t = null;
  if (!e || typeof e != "string")
    return t;
  var r = (0, Ag.default)(e), i = typeof n == "function";
  return r.forEach(function(l) {
    if (l.type === "declaration") {
      var o = l.property, u = l.value;
      i ? n(o, u, l) : u && (t = t || {}, t[o] = u);
    }
  }), t;
}
const Fg = Qs.default || Qs, qp = Gp("end"), ca = Gp("start");
function Gp(e) {
  return n;
  function n(t) {
    const r = t && t.position && t.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function jg(e) {
  const n = ca(e), t = qp(e);
  if (n && t)
    return { start: n, end: t };
}
function Ir(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ks(e.position) : "start" in e || "end" in e ? Ks(e) : "line" in e || "column" in e ? uu(e) : "";
}
function uu(e) {
  return Ys(e && e.line) + ":" + Ys(e && e.column);
}
function Ks(e) {
  return uu(e && e.start) + "-" + uu(e && e.end);
}
function Ys(e) {
  return e && typeof e == "number" ? e : 1;
}
class Te extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", l = {}, o = !1;
    if (t && ("line" in t && "column" in t ? l = { place: t } : "start" in t && "end" in t ? l = { place: t } : "type" in t ? l = {
      ancestors: [t],
      place: t.position
    } : l = { ...t }), typeof n == "string" ? i = n : !l.cause && n && (o = !0, i = n.message, l.cause = n), !l.ruleId && !l.source && typeof r == "string") {
      const a = r.indexOf(":");
      a === -1 ? l.ruleId = r : (l.source = r.slice(0, a), l.ruleId = r.slice(a + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const a = l.ancestors[l.ancestors.length - 1];
      a && (l.place = a.position);
    }
    const u = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = u ? u.column : void 0, this.fatal = void 0, this.file, this.message = i, this.line = u ? u.line : void 0, this.name = Ir(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
Te.prototype.file = "";
Te.prototype.name = "";
Te.prototype.reason = "";
Te.prototype.message = "";
Te.prototype.stack = "";
Te.prototype.column = void 0;
Te.prototype.line = void 0;
Te.prototype.ancestors = void 0;
Te.prototype.cause = void 0;
Te.prototype.fatal = void 0;
Te.prototype.place = void 0;
Te.prototype.ruleId = void 0;
Te.prototype.source = void 0;
const fa = {}.hasOwnProperty, Bg = /* @__PURE__ */ new Map(), Ug = /[A-Z]/g, Vg = /-([a-z])/g, Hg = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), $g = /* @__PURE__ */ new Set(["td", "th"]), Zp = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Wg(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Jg(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Zg(t, n.jsx, n.jsxs);
  }
  const i = {
    Fragment: n.Fragment,
    ancestors: [],
    components: n.components || {},
    create: r,
    elementAttributeNameCase: n.elementAttributeNameCase || "react",
    evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
    filePath: t,
    ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
    passKeys: n.passKeys !== !1,
    passNode: n.passNode || !1,
    schema: n.space === "svg" ? sa : xg,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, l = Jp(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function Jp(e, n, t) {
  if (n.type === "element")
    return Qg(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return Kg(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return Xg(e, n, t);
  if (n.type === "mdxjsEsm")
    return Yg(e, n);
  if (n.type === "root")
    return qg(e, n, t);
  if (n.type === "text")
    return Gg(e, n);
}
function Qg(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = sa, e.schema = i), e.ancestors.push(n);
  const l = ed(e, n.tagName, !1), o = bg(e, n);
  let u = da(e, n);
  return Hg.has(n.tagName) && (u = u.filter(function(a) {
    return typeof a == "string" ? !cg(a) : !0;
  })), bp(e, o, l, n), pa(o, u), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function Kg(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Yr(e, n.position);
}
function Yg(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Yr(e, n.position);
}
function Xg(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = sa, e.schema = i), e.ancestors.push(n);
  const l = n.name === null ? e.Fragment : ed(e, n.name, !0), o = ey(e, n), u = da(e, n);
  return bp(e, o, l, n), pa(o, u), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function qg(e, n, t) {
  const r = {};
  return pa(r, da(e, n)), e.create(n, e.Fragment, r, t);
}
function Gg(e, n) {
  return n.value;
}
function bp(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function pa(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function Zg(e, n, t) {
  return r;
  function r(i, l, o, u) {
    const s = Array.isArray(o.children) ? t : n;
    return u ? s(l, o, u) : s(l, o);
  }
}
function Jg(e, n) {
  return t;
  function t(r, i, l, o) {
    const u = Array.isArray(l.children), a = ca(r);
    return n(
      i,
      l,
      o,
      u,
      {
        columnNumber: a ? a.column - 1 : void 0,
        fileName: e,
        lineNumber: a ? a.line : void 0
      },
      void 0
    );
  }
}
function bg(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && fa.call(n.properties, i)) {
      const l = ny(e, i, n.properties[i]);
      if (l) {
        const [o, u] = l;
        e.tableCellAlignToStyle && o === "align" && typeof u == "string" && $g.has(n.tagName) ? r = u : t[o] = u;
      }
    }
  if (r) {
    const l = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    l[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function ey(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0];
        l.type;
        const o = l.expression;
        o.type;
        const u = o.properties[0];
        u.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(u.argument)
        );
      } else
        Yr(e, n.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const u = r.value.data.estree.body[0];
          u.type, l = e.evaluater.evaluateExpression(u.expression);
        } else
          Yr(e, n.position);
      else
        l = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return t;
}
function da(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Bg;
  for (; ++r < n.children.length; ) {
    const l = n.children[r];
    let o;
    if (e.passKeys) {
      const a = l.type === "element" ? l.tagName : l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement" ? l.name : void 0;
      if (a) {
        const s = i.get(a) || 0;
        o = a + "-" + s, i.set(a, s + 1);
      }
    }
    const u = Jp(e, l, o);
    u !== void 0 && t.push(u);
  }
  return t;
}
function ny(e, n, t) {
  const r = yg(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? lg(t) : Sg(t)), r.property === "style") {
      let i = typeof t == "object" ? t : ty(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = ry(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? wg[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function ty(e, n) {
  const t = {};
  try {
    Fg(n, r);
  } catch (i) {
    if (!e.ignoreInvalidStyle) {
      const l = (
        /** @type {Error} */
        i
      ), o = new Te("Cannot parse `style` attribute", {
        ancestors: e.ancestors,
        cause: l,
        ruleId: "style",
        source: "hast-util-to-jsx-runtime"
      });
      throw o.file = e.filePath || void 0, o.url = Zp + "#cannot-parse-style-attribute", o;
    }
  }
  return t;
  function r(i, l) {
    let o = i;
    o.slice(0, 2) !== "--" && (o.slice(0, 4) === "-ms-" && (o = "ms-" + o.slice(4)), o = o.replace(Vg, ly)), t[o] = l;
  }
}
function ed(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const u = Fs(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: u,
        computed: !!(l && u.type === "Literal"),
        optional: !1
      } : u;
    }
    r = o;
  } else
    r = Fs(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {keyof JSX.IntrinsicElements} */
      r.value
    );
    return fa.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Yr(e);
}
function Yr(e, n) {
  const t = new Te(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = Zp + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function ry(e) {
  const n = {};
  let t;
  for (t in e)
    fa.call(e, t) && (n[iy(t)] = e[t]);
  return n;
}
function iy(e) {
  let n = e.replace(Ug, oy);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function ly(e, n) {
  return n.toUpperCase();
}
function oy(e) {
  return "-" + e.toLowerCase();
}
const no = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
};
var nd = { exports: {} }, Cl = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uy = re, ay = Symbol.for("react.element"), sy = Symbol.for("react.fragment"), cy = Object.prototype.hasOwnProperty, fy = uy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, py = { key: !0, ref: !0, __self: !0, __source: !0 };
function td(e, n, t) {
  var r, i = {}, l = null, o = null;
  t !== void 0 && (l = "" + t), n.key !== void 0 && (l = "" + n.key), n.ref !== void 0 && (o = n.ref);
  for (r in n) cy.call(n, r) && !py.hasOwnProperty(r) && (i[r] = n[r]);
  if (e && e.defaultProps) for (r in n = e.defaultProps, n) i[r] === void 0 && (i[r] = n[r]);
  return { $$typeof: ay, type: e, key: l, ref: o, props: i, _owner: fy.current };
}
Cl.Fragment = sy;
Cl.jsx = td;
Cl.jsxs = td;
nd.exports = Cl;
var to = nd.exports;
const dy = {};
function hy(e, n) {
  const t = dy, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return rd(e, r, i);
}
function rd(e, n, t) {
  if (my(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Xs(e.children, n, t);
  }
  return Array.isArray(e) ? Xs(e, n, t) : "";
}
function Xs(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = rd(e[i], n, t);
  return r.join("");
}
function my(e) {
  return !!(e && typeof e == "object");
}
const qs = document.createElement("i");
function ha(e) {
  const n = "&" + e + ";";
  qs.innerHTML = n;
  const t = qs.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function wn(e, n, t, r) {
  const i = e.length;
  let l = 0, o;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(n, t), e.splice(...o);
  else
    for (t && e.splice(n, t); l < r.length; )
      o = r.slice(l, l + 1e4), o.unshift(n, 0), e.splice(...o), l += 1e4, n += 1e4;
}
function Ge(e, n) {
  return e.length > 0 ? (wn(e, e.length, 0, n), e) : n;
}
const Gs = {}.hasOwnProperty;
function gy(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    yy(n, e[t]);
  return n;
}
function yy(e, n) {
  let t;
  for (t in n) {
    const i = (Gs.call(e, t) ? e[t] : void 0) || (e[t] = {}), l = n[t];
    let o;
    if (l)
      for (o in l) {
        Gs.call(i, o) || (i[o] = []);
        const u = l[o];
        vy(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(u) ? u : u ? [u] : []
        );
      }
  }
}
function vy(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  wn(e, 0, 0, r);
}
function id(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function $t(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const yn = nt(/[A-Za-z]/), $e = nt(/[\dA-Za-z]/), ky = nt(/[#-'*+\--9=?A-Z^-~]/);
function au(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const su = nt(/\d/), wy = nt(/[\dA-Fa-f]/), xy = nt(/[!-/:-@[-`{-~]/);
function j(e) {
  return e !== null && e < -2;
}
function je(e) {
  return e !== null && (e < 0 || e === 32);
}
function K(e) {
  return e === -2 || e === -1 || e === 32;
}
const Sy = nt(new RegExp("\\p{P}|\\p{S}", "u")), Ey = nt(/\s/);
function nt(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function nr(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t);
    let o = "";
    if (l === 37 && $e(e.charCodeAt(t + 1)) && $e(e.charCodeAt(t + 2)))
      i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const u = e.charCodeAt(t + 1);
      l < 56320 && u > 56319 && u < 57344 ? (o = String.fromCharCode(l, u), i = 1) : o = "�";
    } else
      o = String.fromCharCode(l);
    o && (n.push(e.slice(r, t), encodeURIComponent(o)), r = t + i + 1, o = ""), i && (t += i, i = 0);
  }
  return n.join("") + e.slice(r);
}
function b(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(a) {
    return K(a) ? (e.enter(t), u(a)) : n(a);
  }
  function u(a) {
    return K(a) && l++ < i ? (e.consume(a), u) : (e.exit(t), n(a));
  }
}
const Cy = {
  tokenize: Py
};
function Py(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), b(e, n, "linePrefix");
  }
  function i(u) {
    return e.enter("paragraph"), l(u);
  }
  function l(u) {
    const a = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = a), t = a, o(u);
  }
  function o(u) {
    if (u === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(u);
      return;
    }
    return j(u) ? (e.consume(u), e.exit("chunkText"), l) : (e.consume(u), o);
  }
}
const _y = {
  tokenize: Ty
}, Zs = {
  tokenize: Iy
};
function Ty(e) {
  const n = this, t = [];
  let r = 0, i, l, o;
  return u;
  function u(y) {
    if (r < t.length) {
      const S = t[r];
      return n.containerState = S[1], e.attempt(S[0].continuation, a, s)(y);
    }
    return s(y);
  }
  function a(y) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && m();
      const S = n.events.length;
      let C = S, x;
      for (; C--; )
        if (n.events[C][0] === "exit" && n.events[C][1].type === "chunkFlow") {
          x = n.events[C][1].end;
          break;
        }
      h(r);
      let T = S;
      for (; T < n.events.length; )
        n.events[T][1].end = {
          ...x
        }, T++;
      return wn(n.events, C + 1, 0, n.events.slice(S)), n.events.length = T, s(y);
    }
    return u(y);
  }
  function s(y) {
    if (r === t.length) {
      if (!i)
        return d(y);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return k(y);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(Zs, c, f)(y);
  }
  function c(y) {
    return i && m(), h(r), d(y);
  }
  function f(y) {
    return n.parser.lazy[n.now().line] = r !== t.length, o = n.now().offset, k(y);
  }
  function d(y) {
    return n.containerState = {}, e.attempt(Zs, p, k)(y);
  }
  function p(y) {
    return r++, t.push([n.currentConstruct, n.containerState]), d(y);
  }
  function k(y) {
    if (y === null) {
      i && m(), h(0), e.consume(y);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), w(y);
  }
  function w(y) {
    if (y === null) {
      I(e.exit("chunkFlow"), !0), h(0), e.consume(y);
      return;
    }
    return j(y) ? (e.consume(y), I(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, u) : (e.consume(y), w);
  }
  function I(y, S) {
    const C = n.sliceStream(y);
    if (S && C.push(null), y.previous = l, l && (l.next = y), l = y, i.defineSkip(y.start), i.write(C), n.parser.lazy[y.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < o && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > o)
        )
          return;
      const T = n.events.length;
      let L = T, F, R;
      for (; L--; )
        if (n.events[L][0] === "exit" && n.events[L][1].type === "chunkFlow") {
          if (F) {
            R = n.events[L][1].end;
            break;
          }
          F = !0;
        }
      for (h(r), x = T; x < n.events.length; )
        n.events[x][1].end = {
          ...R
        }, x++;
      wn(n.events, L + 1, 0, n.events.slice(T)), n.events.length = x;
    }
  }
  function h(y) {
    let S = t.length;
    for (; S-- > y; ) {
      const C = t[S];
      n.containerState = C[1], C[0].exit.call(n, e);
    }
    t.length = y;
  }
  function m() {
    i.write([null]), l = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function Iy(e, n, t) {
  return b(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Js(e) {
  if (e === null || je(e) || Ey(e))
    return 1;
  if (Sy(e))
    return 2;
}
function ma(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (n = l(n, t), r.push(l));
  }
  return n;
}
const cu = {
  name: "attention",
  resolveAll: zy,
  tokenize: Ny
};
function zy(e, n) {
  let t = -1, r, i, l, o, u, a, s, c;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          a = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const f = {
            ...e[r][1].end
          }, d = {
            ...e[t][1].start
          };
          bs(f, -a), bs(d, a), o = {
            type: a > 1 ? "strongSequence" : "emphasisSequence",
            start: f,
            end: {
              ...e[r][1].end
            }
          }, u = {
            type: a > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: d
          }, l = {
            type: a > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, i = {
            type: a > 1 ? "strong" : "emphasis",
            start: {
              ...o.start
            },
            end: {
              ...u.end
            }
          }, e[r][1].end = {
            ...o.start
          }, e[t][1].start = {
            ...u.end
          }, s = [], e[r][1].end.offset - e[r][1].start.offset && (s = Ge(s, [["enter", e[r][1], n], ["exit", e[r][1], n]])), s = Ge(s, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["enter", l, n]]), s = Ge(s, ma(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), s = Ge(s, [["exit", l, n], ["enter", u, n], ["exit", u, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (c = 2, s = Ge(s, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : c = 0, wn(e, r - 1, t - r + 3, s), t = r + s.length - c - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Ny(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Js(r);
  let l;
  return o;
  function o(a) {
    return l = a, e.enter("attentionSequence"), u(a);
  }
  function u(a) {
    if (a === l)
      return e.consume(a), u;
    const s = e.exit("attentionSequence"), c = Js(a), f = !c || c === 2 && i || t.includes(a), d = !i || i === 2 && c || t.includes(r);
    return s._open = !!(l === 42 ? f : f && (i || !d)), s._close = !!(l === 42 ? d : d && (c || !f)), n(a);
  }
}
function bs(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Ly = {
  name: "autolink",
  tokenize: Oy
};
function Oy(e, n, t) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(p) {
    return yn(p) ? (e.consume(p), o) : p === 64 ? t(p) : s(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || $e(p) ? (r = 1, u(p)) : s(p);
  }
  function u(p) {
    return p === 58 ? (e.consume(p), r = 0, a) : (p === 43 || p === 45 || p === 46 || $e(p)) && r++ < 32 ? (e.consume(p), u) : (r = 0, s(p));
  }
  function a(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : p === null || p === 32 || p === 60 || au(p) ? t(p) : (e.consume(p), a);
  }
  function s(p) {
    return p === 64 ? (e.consume(p), c) : ky(p) ? (e.consume(p), s) : t(p);
  }
  function c(p) {
    return $e(p) ? f(p) : t(p);
  }
  function f(p) {
    return p === 46 ? (e.consume(p), r = 0, c) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : d(p);
  }
  function d(p) {
    if ((p === 45 || $e(p)) && r++ < 63) {
      const k = p === 45 ? d : f;
      return e.consume(p), k;
    }
    return t(p);
  }
}
const Pl = {
  partial: !0,
  tokenize: Ry
};
function Ry(e, n, t) {
  return r;
  function r(l) {
    return K(l) ? b(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || j(l) ? n(l) : t(l);
  }
}
const ld = {
  continuation: {
    tokenize: Ay
  },
  exit: My,
  name: "blockQuote",
  tokenize: Dy
};
function Dy(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const u = r.containerState;
      return u.open || (e.enter("blockQuote", {
        _container: !0
      }), u.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), l;
    }
    return t(o);
  }
  function l(o) {
    return K(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(o));
  }
}
function Ay(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return K(o) ? b(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(ld, n, t)(o);
  }
}
function My(e) {
  e.exit("blockQuote");
}
const od = {
  name: "characterEscape",
  tokenize: Fy
};
function Fy(e, n, t) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return xy(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(l);
  }
}
const ud = {
  name: "characterReference",
  tokenize: jy
};
function jy(e, n, t) {
  const r = this;
  let i = 0, l, o;
  return u;
  function u(f) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), a;
  }
  function a(f) {
    return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), s) : (e.enter("characterReferenceValue"), l = 31, o = $e, c(f));
  }
  function s(f) {
    return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = wy, c) : (e.enter("characterReferenceValue"), l = 7, o = su, c(f));
  }
  function c(f) {
    if (f === 59 && i) {
      const d = e.exit("characterReferenceValue");
      return o === $e && !ha(r.sliceSerialize(d)) ? t(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return o(f) && i++ < l ? (e.consume(f), c) : t(f);
  }
}
const ec = {
  partial: !0,
  tokenize: Uy
}, nc = {
  concrete: !0,
  name: "codeFenced",
  tokenize: By
};
function By(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: C
  };
  let l = 0, o = 0, u;
  return a;
  function a(x) {
    return s(x);
  }
  function s(x) {
    const T = r.events[r.events.length - 1];
    return l = T && T[1].type === "linePrefix" ? T[2].sliceSerialize(T[1], !0).length : 0, u = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(x);
  }
  function c(x) {
    return x === u ? (o++, e.consume(x), c) : o < 3 ? t(x) : (e.exit("codeFencedFenceSequence"), K(x) ? b(e, f, "whitespace")(x) : f(x));
  }
  function f(x) {
    return x === null || j(x) ? (e.exit("codeFencedFence"), r.interrupt ? n(x) : e.check(ec, w, S)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), d(x));
  }
  function d(x) {
    return x === null || j(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(x)) : K(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), b(e, p, "whitespace")(x)) : x === 96 && x === u ? t(x) : (e.consume(x), d);
  }
  function p(x) {
    return x === null || j(x) ? f(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), k(x));
  }
  function k(x) {
    return x === null || j(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(x)) : x === 96 && x === u ? t(x) : (e.consume(x), k);
  }
  function w(x) {
    return e.attempt(i, S, I)(x);
  }
  function I(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), h;
  }
  function h(x) {
    return l > 0 && K(x) ? b(e, m, "linePrefix", l + 1)(x) : m(x);
  }
  function m(x) {
    return x === null || j(x) ? e.check(ec, w, S)(x) : (e.enter("codeFlowValue"), y(x));
  }
  function y(x) {
    return x === null || j(x) ? (e.exit("codeFlowValue"), m(x)) : (e.consume(x), y);
  }
  function S(x) {
    return e.exit("codeFenced"), n(x);
  }
  function C(x, T, L) {
    let F = 0;
    return R;
    function R(H) {
      return x.enter("lineEnding"), x.consume(H), x.exit("lineEnding"), D;
    }
    function D(H) {
      return x.enter("codeFencedFence"), K(H) ? b(x, A, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(H) : A(H);
    }
    function A(H) {
      return H === u ? (x.enter("codeFencedFenceSequence"), Y(H)) : L(H);
    }
    function Y(H) {
      return H === u ? (F++, x.consume(H), Y) : F >= o ? (x.exit("codeFencedFenceSequence"), K(H) ? b(x, le, "whitespace")(H) : le(H)) : L(H);
    }
    function le(H) {
      return H === null || j(H) ? (x.exit("codeFencedFence"), T(H)) : L(H);
    }
  }
}
function Uy(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? t(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
const ro = {
  name: "codeIndented",
  tokenize: Hy
}, Vy = {
  partial: !0,
  tokenize: $y
};
function Hy(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("codeIndented"), b(e, l, "linePrefix", 5)(s);
  }
  function l(s) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? o(s) : t(s);
  }
  function o(s) {
    return s === null ? a(s) : j(s) ? e.attempt(Vy, o, a)(s) : (e.enter("codeFlowValue"), u(s));
  }
  function u(s) {
    return s === null || j(s) ? (e.exit("codeFlowValue"), o(s)) : (e.consume(s), u);
  }
  function a(s) {
    return e.exit("codeIndented"), n(s);
  }
}
function $y(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? t(o) : j(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : b(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? n(o) : j(o) ? i(o) : t(o);
  }
}
const Wy = {
  name: "codeText",
  previous: Ky,
  resolve: Qy,
  tokenize: Yy
};
function Qy(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Ky(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Yy(e, n, t) {
  let r = 0, i, l;
  return o;
  function o(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), u(f);
  }
  function u(f) {
    return f === 96 ? (e.consume(f), r++, u) : (e.exit("codeTextSequence"), a(f));
  }
  function a(f) {
    return f === null ? t(f) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), a) : f === 96 ? (l = e.enter("codeTextSequence"), i = 0, c(f)) : j(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), a) : (e.enter("codeTextData"), s(f));
  }
  function s(f) {
    return f === null || f === 32 || f === 96 || j(f) ? (e.exit("codeTextData"), a(f)) : (e.consume(f), s);
  }
  function c(f) {
    return f === 96 ? (e.consume(f), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(f)) : (l.type = "codeTextData", s(f));
  }
}
class Xy {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(n, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && dr(this.left, r), l.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), dr(this.left, n);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(n) {
    this.setCursor(0), this.right.push(n);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(n) {
    this.setCursor(0), dr(this.right, n.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        dr(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        dr(this.left, t.reverse());
      }
  }
}
function dr(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function ad(e) {
  const n = {};
  let t = -1, r, i, l, o, u, a, s;
  const c = new Xy(e);
  for (; ++t < c.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = c.get(t), t && r[1].type === "chunkFlow" && c.get(t - 1)[1].type === "listItemPrefix" && (a = r[1]._tokenizer.events, l = 0, l < a.length && a[l][1].type === "lineEndingBlank" && (l += 2), l < a.length && a[l][1].type === "content"))
      for (; ++l < a.length && a[l][1].type !== "content"; )
        a[l][1].type === "chunkText" && (a[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, qy(c, t)), t = n[t], s = !0);
    else if (r[1]._container) {
      for (l = t, i = void 0; l-- && (o = c.get(l), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank"); )
        o[0] === "enter" && (i && (c.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = l);
      i && (r[1].end = {
        ...c.get(i)[1].start
      }, u = c.slice(i, t), u.unshift(r), c.splice(i, t - i + 1, u));
    }
  }
  return wn(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !s;
}
function qy(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const l = [], o = t._tokenizer || r.parser[t.contentType](t.start), u = o.events, a = [], s = {};
  let c, f, d = -1, p = t, k = 0, w = 0;
  const I = [w];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    l.push(i), p._tokenizer || (c = r.sliceStream(p), p.next || c.push(null), f && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = p, p = p.next;
  }
  for (p = t; ++d < u.length; )
    // Find a void token that includes a break.
    u[d][0] === "exit" && u[d - 1][0] === "enter" && u[d][1].type === u[d - 1][1].type && u[d][1].start.line !== u[d][1].end.line && (w = d + 1, I.push(w), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : I.pop(), d = I.length; d--; ) {
    const h = u.slice(I[d], I[d + 1]), m = l.pop();
    a.push([m, m + h.length - 1]), e.splice(m, 2, h);
  }
  for (a.reverse(), d = -1; ++d < a.length; )
    s[k + a[d][0]] = k + a[d][1], k += a[d][1] - a[d][0] - 1;
  return s;
}
const Gy = {
  resolve: Jy,
  tokenize: by
}, Zy = {
  partial: !0,
  tokenize: e1
};
function Jy(e) {
  return ad(e), e;
}
function by(e, n) {
  let t;
  return r;
  function r(u) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(u);
  }
  function i(u) {
    return u === null ? l(u) : j(u) ? e.check(Zy, o, l)(u) : (e.consume(u), i);
  }
  function l(u) {
    return e.exit("chunkContent"), e.exit("content"), n(u);
  }
  function o(u) {
    return e.consume(u), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function e1(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), b(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || j(o))
      return t(o);
    const u = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? n(o) : e.interrupt(r.parser.constructs.flow, t, n)(o);
  }
}
function sd(e, n, t, r, i, l, o, u, a) {
  const s = a || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(h) {
    return h === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(h), e.exit(l), d) : h === null || h === 32 || h === 41 || au(h) ? t(h) : (e.enter(r), e.enter(o), e.enter(u), e.enter("chunkString", {
      contentType: "string"
    }), w(h));
  }
  function d(h) {
    return h === 62 ? (e.enter(l), e.consume(h), e.exit(l), e.exit(i), e.exit(r), n) : (e.enter(u), e.enter("chunkString", {
      contentType: "string"
    }), p(h));
  }
  function p(h) {
    return h === 62 ? (e.exit("chunkString"), e.exit(u), d(h)) : h === null || h === 60 || j(h) ? t(h) : (e.consume(h), h === 92 ? k : p);
  }
  function k(h) {
    return h === 60 || h === 62 || h === 92 ? (e.consume(h), p) : p(h);
  }
  function w(h) {
    return !c && (h === null || h === 41 || je(h)) ? (e.exit("chunkString"), e.exit(u), e.exit(o), e.exit(r), n(h)) : c < s && h === 40 ? (e.consume(h), c++, w) : h === 41 ? (e.consume(h), c--, w) : h === null || h === 32 || h === 40 || au(h) ? t(h) : (e.consume(h), h === 92 ? I : w);
  }
  function I(h) {
    return h === 40 || h === 41 || h === 92 ? (e.consume(h), w) : w(h);
  }
}
function cd(e, n, t, r, i, l) {
  const o = this;
  let u = 0, a;
  return s;
  function s(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(l), c;
  }
  function c(p) {
    return u > 999 || p === null || p === 91 || p === 93 && !a || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !u && "_hiddenFootnoteSupport" in o.parser.constructs ? t(p) : p === 93 ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : j(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), f(p));
  }
  function f(p) {
    return p === null || p === 91 || p === 93 || j(p) || u++ > 999 ? (e.exit("chunkString"), c(p)) : (e.consume(p), a || (a = !K(p)), p === 92 ? d : f);
  }
  function d(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), u++, f) : f(p);
  }
}
function fd(e, n, t, r, i, l) {
  let o;
  return u;
  function u(d) {
    return d === 34 || d === 39 || d === 40 ? (e.enter(r), e.enter(i), e.consume(d), e.exit(i), o = d === 40 ? 41 : d, a) : t(d);
  }
  function a(d) {
    return d === o ? (e.enter(i), e.consume(d), e.exit(i), e.exit(r), n) : (e.enter(l), s(d));
  }
  function s(d) {
    return d === o ? (e.exit(l), a(o)) : d === null ? t(d) : j(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), b(e, s, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(d));
  }
  function c(d) {
    return d === o || d === null || j(d) ? (e.exit("chunkString"), s(d)) : (e.consume(d), d === 92 ? f : c);
  }
  function f(d) {
    return d === o || d === 92 ? (e.consume(d), c) : c(d);
  }
}
function zr(e, n) {
  let t;
  return r;
  function r(i) {
    return j(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : K(i) ? b(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const n1 = {
  name: "definition",
  tokenize: r1
}, t1 = {
  partial: !0,
  tokenize: i1
};
function r1(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(p) {
    return e.enter("definition"), o(p);
  }
  function o(p) {
    return cd.call(
      r,
      e,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function u(p) {
    return i = $t(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), a) : t(p);
  }
  function a(p) {
    return je(p) ? zr(e, s)(p) : s(p);
  }
  function s(p) {
    return sd(
      e,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function c(p) {
    return e.attempt(t1, f, f)(p);
  }
  function f(p) {
    return K(p) ? b(e, d, "whitespace")(p) : d(p);
  }
  function d(p) {
    return p === null || j(p) ? (e.exit("definition"), r.parser.defined.push(i), n(p)) : t(p);
  }
}
function i1(e, n, t) {
  return r;
  function r(u) {
    return je(u) ? zr(e, i)(u) : t(u);
  }
  function i(u) {
    return fd(e, l, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(u);
  }
  function l(u) {
    return K(u) ? b(e, o, "whitespace")(u) : o(u);
  }
  function o(u) {
    return u === null || j(u) ? n(u) : t(u);
  }
}
const l1 = {
  name: "hardBreakEscape",
  tokenize: o1
};
function o1(e, n, t) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return j(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
  }
}
const u1 = {
  name: "headingAtx",
  resolve: a1,
  tokenize: s1
};
function a1(e, n) {
  let t = e.length - 2, r = 3, i, l;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, l = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, wn(e, r, t - r + 1, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["exit", i, n]])), e;
}
function s1(e, n, t) {
  let r = 0;
  return i;
  function i(c) {
    return e.enter("atxHeading"), l(c);
  }
  function l(c) {
    return e.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && r++ < 6 ? (e.consume(c), o) : c === null || je(c) ? (e.exit("atxHeadingSequence"), u(c)) : t(c);
  }
  function u(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), a(c)) : c === null || j(c) ? (e.exit("atxHeading"), n(c)) : K(c) ? b(e, u, "whitespace")(c) : (e.enter("atxHeadingText"), s(c));
  }
  function a(c) {
    return c === 35 ? (e.consume(c), a) : (e.exit("atxHeadingSequence"), u(c));
  }
  function s(c) {
    return c === null || c === 35 || je(c) ? (e.exit("atxHeadingText"), u(c)) : (e.consume(c), s);
  }
}
const c1 = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], tc = ["pre", "script", "style", "textarea"], f1 = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: h1,
  tokenize: m1
}, p1 = {
  partial: !0,
  tokenize: y1
}, d1 = {
  partial: !0,
  tokenize: g1
};
function h1(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function m1(e, n, t) {
  const r = this;
  let i, l, o, u, a;
  return s;
  function s(v) {
    return c(v);
  }
  function c(v) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(v), f;
  }
  function f(v) {
    return v === 33 ? (e.consume(v), d) : v === 47 ? (e.consume(v), l = !0, w) : v === 63 ? (e.consume(v), i = 3, r.interrupt ? n : g) : yn(v) ? (e.consume(v), o = String.fromCharCode(v), I) : t(v);
  }
  function d(v) {
    return v === 45 ? (e.consume(v), i = 2, p) : v === 91 ? (e.consume(v), i = 5, u = 0, k) : yn(v) ? (e.consume(v), i = 4, r.interrupt ? n : g) : t(v);
  }
  function p(v) {
    return v === 45 ? (e.consume(v), r.interrupt ? n : g) : t(v);
  }
  function k(v) {
    const me = "CDATA[";
    return v === me.charCodeAt(u++) ? (e.consume(v), u === me.length ? r.interrupt ? n : A : k) : t(v);
  }
  function w(v) {
    return yn(v) ? (e.consume(v), o = String.fromCharCode(v), I) : t(v);
  }
  function I(v) {
    if (v === null || v === 47 || v === 62 || je(v)) {
      const me = v === 47, tn = o.toLowerCase();
      return !me && !l && tc.includes(tn) ? (i = 1, r.interrupt ? n(v) : A(v)) : c1.includes(o.toLowerCase()) ? (i = 6, me ? (e.consume(v), h) : r.interrupt ? n(v) : A(v)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(v) : l ? m(v) : y(v));
    }
    return v === 45 || $e(v) ? (e.consume(v), o += String.fromCharCode(v), I) : t(v);
  }
  function h(v) {
    return v === 62 ? (e.consume(v), r.interrupt ? n : A) : t(v);
  }
  function m(v) {
    return K(v) ? (e.consume(v), m) : R(v);
  }
  function y(v) {
    return v === 47 ? (e.consume(v), R) : v === 58 || v === 95 || yn(v) ? (e.consume(v), S) : K(v) ? (e.consume(v), y) : R(v);
  }
  function S(v) {
    return v === 45 || v === 46 || v === 58 || v === 95 || $e(v) ? (e.consume(v), S) : C(v);
  }
  function C(v) {
    return v === 61 ? (e.consume(v), x) : K(v) ? (e.consume(v), C) : y(v);
  }
  function x(v) {
    return v === null || v === 60 || v === 61 || v === 62 || v === 96 ? t(v) : v === 34 || v === 39 ? (e.consume(v), a = v, T) : K(v) ? (e.consume(v), x) : L(v);
  }
  function T(v) {
    return v === a ? (e.consume(v), a = null, F) : v === null || j(v) ? t(v) : (e.consume(v), T);
  }
  function L(v) {
    return v === null || v === 34 || v === 39 || v === 47 || v === 60 || v === 61 || v === 62 || v === 96 || je(v) ? C(v) : (e.consume(v), L);
  }
  function F(v) {
    return v === 47 || v === 62 || K(v) ? y(v) : t(v);
  }
  function R(v) {
    return v === 62 ? (e.consume(v), D) : t(v);
  }
  function D(v) {
    return v === null || j(v) ? A(v) : K(v) ? (e.consume(v), D) : t(v);
  }
  function A(v) {
    return v === 45 && i === 2 ? (e.consume(v), pe) : v === 60 && i === 1 ? (e.consume(v), ce) : v === 62 && i === 4 ? (e.consume(v), W) : v === 63 && i === 3 ? (e.consume(v), g) : v === 93 && i === 5 ? (e.consume(v), M) : j(v) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(p1, q, Y)(v)) : v === null || j(v) ? (e.exit("htmlFlowData"), Y(v)) : (e.consume(v), A);
  }
  function Y(v) {
    return e.check(d1, le, q)(v);
  }
  function le(v) {
    return e.enter("lineEnding"), e.consume(v), e.exit("lineEnding"), H;
  }
  function H(v) {
    return v === null || j(v) ? Y(v) : (e.enter("htmlFlowData"), A(v));
  }
  function pe(v) {
    return v === 45 ? (e.consume(v), g) : A(v);
  }
  function ce(v) {
    return v === 47 ? (e.consume(v), o = "", N) : A(v);
  }
  function N(v) {
    if (v === 62) {
      const me = o.toLowerCase();
      return tc.includes(me) ? (e.consume(v), W) : A(v);
    }
    return yn(v) && o.length < 8 ? (e.consume(v), o += String.fromCharCode(v), N) : A(v);
  }
  function M(v) {
    return v === 93 ? (e.consume(v), g) : A(v);
  }
  function g(v) {
    return v === 62 ? (e.consume(v), W) : v === 45 && i === 2 ? (e.consume(v), g) : A(v);
  }
  function W(v) {
    return v === null || j(v) ? (e.exit("htmlFlowData"), q(v)) : (e.consume(v), W);
  }
  function q(v) {
    return e.exit("htmlFlow"), n(v);
  }
}
function g1(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return j(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : t(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
function y1(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Pl, n, t);
  }
}
const v1 = {
  name: "htmlText",
  tokenize: k1
};
function k1(e, n, t) {
  const r = this;
  let i, l, o;
  return u;
  function u(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), a;
  }
  function a(g) {
    return g === 33 ? (e.consume(g), s) : g === 47 ? (e.consume(g), C) : g === 63 ? (e.consume(g), y) : yn(g) ? (e.consume(g), L) : t(g);
  }
  function s(g) {
    return g === 45 ? (e.consume(g), c) : g === 91 ? (e.consume(g), l = 0, k) : yn(g) ? (e.consume(g), m) : t(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), p) : t(g);
  }
  function f(g) {
    return g === null ? t(g) : g === 45 ? (e.consume(g), d) : j(g) ? (o = f, ce(g)) : (e.consume(g), f);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), p) : f(g);
  }
  function p(g) {
    return g === 62 ? pe(g) : g === 45 ? d(g) : f(g);
  }
  function k(g) {
    const W = "CDATA[";
    return g === W.charCodeAt(l++) ? (e.consume(g), l === W.length ? w : k) : t(g);
  }
  function w(g) {
    return g === null ? t(g) : g === 93 ? (e.consume(g), I) : j(g) ? (o = w, ce(g)) : (e.consume(g), w);
  }
  function I(g) {
    return g === 93 ? (e.consume(g), h) : w(g);
  }
  function h(g) {
    return g === 62 ? pe(g) : g === 93 ? (e.consume(g), h) : w(g);
  }
  function m(g) {
    return g === null || g === 62 ? pe(g) : j(g) ? (o = m, ce(g)) : (e.consume(g), m);
  }
  function y(g) {
    return g === null ? t(g) : g === 63 ? (e.consume(g), S) : j(g) ? (o = y, ce(g)) : (e.consume(g), y);
  }
  function S(g) {
    return g === 62 ? pe(g) : y(g);
  }
  function C(g) {
    return yn(g) ? (e.consume(g), x) : t(g);
  }
  function x(g) {
    return g === 45 || $e(g) ? (e.consume(g), x) : T(g);
  }
  function T(g) {
    return j(g) ? (o = T, ce(g)) : K(g) ? (e.consume(g), T) : pe(g);
  }
  function L(g) {
    return g === 45 || $e(g) ? (e.consume(g), L) : g === 47 || g === 62 || je(g) ? F(g) : t(g);
  }
  function F(g) {
    return g === 47 ? (e.consume(g), pe) : g === 58 || g === 95 || yn(g) ? (e.consume(g), R) : j(g) ? (o = F, ce(g)) : K(g) ? (e.consume(g), F) : pe(g);
  }
  function R(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || $e(g) ? (e.consume(g), R) : D(g);
  }
  function D(g) {
    return g === 61 ? (e.consume(g), A) : j(g) ? (o = D, ce(g)) : K(g) ? (e.consume(g), D) : F(g);
  }
  function A(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? t(g) : g === 34 || g === 39 ? (e.consume(g), i = g, Y) : j(g) ? (o = A, ce(g)) : K(g) ? (e.consume(g), A) : (e.consume(g), le);
  }
  function Y(g) {
    return g === i ? (e.consume(g), i = void 0, H) : g === null ? t(g) : j(g) ? (o = Y, ce(g)) : (e.consume(g), Y);
  }
  function le(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? t(g) : g === 47 || g === 62 || je(g) ? F(g) : (e.consume(g), le);
  }
  function H(g) {
    return g === 47 || g === 62 || je(g) ? F(g) : t(g);
  }
  function pe(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(g);
  }
  function ce(g) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), N;
  }
  function N(g) {
    return K(g) ? b(e, M, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(g) : M(g);
  }
  function M(g) {
    return e.enter("htmlTextData"), o(g);
  }
}
const ga = {
  name: "labelEnd",
  resolveAll: E1,
  resolveTo: C1,
  tokenize: P1
}, w1 = {
  tokenize: _1
}, x1 = {
  tokenize: T1
}, S1 = {
  tokenize: I1
};
function E1(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && wn(e, 0, e.length, t), e;
}
function C1(e, n) {
  let t = e.length, r = 0, i, l, o, u;
  for (; t--; )
    if (i = e[t][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = t);
  const a = {
    type: e[l][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, s = {
    type: "label",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, c = {
    type: "labelText",
    start: {
      ...e[l + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return u = [["enter", a, n], ["enter", s, n]], u = Ge(u, e.slice(l + 1, l + r + 3)), u = Ge(u, [["enter", c, n]]), u = Ge(u, ma(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), n)), u = Ge(u, [["exit", c, n], e[o - 2], e[o - 1], ["exit", s, n]]), u = Ge(u, e.slice(o + 1)), u = Ge(u, [["exit", a, n]]), wn(e, l, e.length, u), e;
}
function P1(e, n, t) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return u;
  function u(d) {
    return l ? l._inactive ? f(d) : (o = r.parser.defined.includes($t(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(d), e.exit("labelMarker"), e.exit("labelEnd"), a) : t(d);
  }
  function a(d) {
    return d === 40 ? e.attempt(w1, c, o ? c : f)(d) : d === 91 ? e.attempt(x1, c, o ? s : f)(d) : o ? c(d) : f(d);
  }
  function s(d) {
    return e.attempt(S1, c, f)(d);
  }
  function c(d) {
    return n(d);
  }
  function f(d) {
    return l._balanced = !0, t(d);
  }
}
function _1(e, n, t) {
  return r;
  function r(f) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), i;
  }
  function i(f) {
    return je(f) ? zr(e, l)(f) : l(f);
  }
  function l(f) {
    return f === 41 ? c(f) : sd(e, o, u, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function o(f) {
    return je(f) ? zr(e, a)(f) : c(f);
  }
  function u(f) {
    return t(f);
  }
  function a(f) {
    return f === 34 || f === 39 || f === 40 ? fd(e, s, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : c(f);
  }
  function s(f) {
    return je(f) ? zr(e, c)(f) : c(f);
  }
  function c(f) {
    return f === 41 ? (e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), e.exit("resource"), n) : t(f);
  }
}
function T1(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return cd.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(u);
  }
  function l(u) {
    return r.parser.defined.includes($t(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(u) : t(u);
  }
  function o(u) {
    return t(u);
  }
}
function I1(e, n, t) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), n) : t(l);
  }
}
const z1 = {
  name: "labelStartImage",
  resolveAll: ga.resolveAll,
  tokenize: N1
};
function N1(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(u), e.exit("labelImageMarker"), l;
  }
  function l(u) {
    return u === 91 ? (e.enter("labelMarker"), e.consume(u), e.exit("labelMarker"), e.exit("labelImage"), o) : t(u);
  }
  function o(u) {
    return u === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(u) : n(u);
  }
}
const L1 = {
  name: "labelStartLink",
  resolveAll: ga.resolveAll,
  tokenize: O1
};
function O1(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : n(o);
  }
}
const io = {
  name: "lineEnding",
  tokenize: R1
};
function R1(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), b(e, n, "linePrefix");
  }
}
const Di = {
  name: "thematicBreak",
  tokenize: D1
};
function D1(e, n, t) {
  let r = 0, i;
  return l;
  function l(s) {
    return e.enter("thematicBreak"), o(s);
  }
  function o(s) {
    return i = s, u(s);
  }
  function u(s) {
    return s === i ? (e.enter("thematicBreakSequence"), a(s)) : r >= 3 && (s === null || j(s)) ? (e.exit("thematicBreak"), n(s)) : t(s);
  }
  function a(s) {
    return s === i ? (e.consume(s), r++, a) : (e.exit("thematicBreakSequence"), K(s) ? b(e, u, "whitespace")(s) : u(s));
  }
}
const Oe = {
  continuation: {
    tokenize: j1
  },
  exit: U1,
  name: "list",
  tokenize: F1
}, A1 = {
  partial: !0,
  tokenize: V1
}, M1 = {
  partial: !0,
  tokenize: B1
};
function F1(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return u;
  function u(p) {
    const k = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (k === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : su(p)) {
      if (r.containerState.type || (r.containerState.type = k, e.enter(k, {
        _container: !0
      })), k === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(Di, t, s)(p) : s(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), a(p);
    }
    return t(p);
  }
  function a(p) {
    return su(p) && ++o < 10 ? (e.consume(p), a) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), s(p)) : t(p);
  }
  function s(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      Pl,
      // Can’t be empty when interrupting.
      r.interrupt ? t : c,
      e.attempt(A1, d, f)
    );
  }
  function c(p) {
    return r.containerState.initialBlankLine = !0, l++, d(p);
  }
  function f(p) {
    return K(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), d) : t(p);
  }
  function d(p) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(p);
  }
}
function j1(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Pl, i, l);
  function i(u) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, b(e, n, "listItemIndent", r.containerState.size + 1)(u);
  }
  function l(u) {
    return r.containerState.furtherBlankLines || !K(u) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(u)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(M1, n, o)(u));
  }
  function o(u) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, b(e, e.attempt(Oe, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(u);
  }
}
function B1(e, n, t) {
  const r = this;
  return b(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? n(l) : t(l);
  }
}
function U1(e) {
  e.exit(this.containerState.type);
}
function V1(e, n, t) {
  const r = this;
  return b(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !K(l) && o && o[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const rc = {
  name: "setextUnderline",
  resolveTo: H1,
  tokenize: $1
};
function H1(e, n) {
  let t = e.length, r, i, l;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !l && e[t][1].type === "definition" && (l = t);
  const o = {
    type: "setextHeading",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", l ? (e.splice(i, 0, ["enter", o, n]), e.splice(l + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[l][1].end
  }) : e[r][1] = o, e.push(["exit", o, n]), e;
}
function $1(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(s) {
    let c = r.events.length, f;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        f = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (e.enter("setextHeadingLine"), i = s, o(s)) : t(s);
  }
  function o(s) {
    return e.enter("setextHeadingLineSequence"), u(s);
  }
  function u(s) {
    return s === i ? (e.consume(s), u) : (e.exit("setextHeadingLineSequence"), K(s) ? b(e, a, "lineSuffix")(s) : a(s));
  }
  function a(s) {
    return s === null || j(s) ? (e.exit("setextHeadingLine"), n(s)) : t(s);
  }
}
const W1 = {
  tokenize: Q1
};
function Q1(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    Pl,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, b(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Gy, i)), "linePrefix"))
  );
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(l), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const K1 = {
  resolveAll: dd()
}, Y1 = pd("string"), X1 = pd("text");
function pd(e) {
  return {
    resolveAll: dd(e === "text" ? q1 : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], l = t.attempt(i, o, u);
    return o;
    function o(c) {
      return s(c) ? l(c) : u(c);
    }
    function u(c) {
      if (c === null) {
        t.consume(c);
        return;
      }
      return t.enter("data"), t.consume(c), a;
    }
    function a(c) {
      return s(c) ? (t.exit("data"), l(c)) : (t.consume(c), a);
    }
    function s(c) {
      if (c === null)
        return !0;
      const f = i[c];
      let d = -1;
      if (f)
        for (; ++d < f.length; ) {
          const p = f[d];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function dd(e) {
  return n;
  function n(t, r) {
    let i = -1, l;
    for (; ++i <= t.length; )
      l === void 0 ? t[i] && t[i][1].type === "data" && (l = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== l + 2 && (t[l][1].end = t[i - 1][1].end, t.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(t, r) : t;
  }
}
function q1(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let l = i.length, o = -1, u = 0, a;
      for (; l--; ) {
        const s = i[l];
        if (typeof s == "string") {
          for (o = s.length; s.charCodeAt(o - 1) === 32; )
            u++, o--;
          if (o) break;
          o = -1;
        } else if (s === -2)
          a = !0, u++;
        else if (s !== -1) {
          l++;
          break;
        }
      }
      if (u) {
        const s = {
          type: t === e.length || a || u < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: l ? o : r.start._bufferIndex + o,
            _index: r.start._index + l,
            line: r.end.line,
            column: r.end.column - u,
            offset: r.end.offset - u
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...s.start
        }, r.start.offset === r.end.offset ? Object.assign(r, s) : (e.splice(t, 0, ["enter", s, n], ["exit", s, n]), t += 2);
      }
      t++;
    }
  return e;
}
const G1 = {
  42: Oe,
  43: Oe,
  45: Oe,
  48: Oe,
  49: Oe,
  50: Oe,
  51: Oe,
  52: Oe,
  53: Oe,
  54: Oe,
  55: Oe,
  56: Oe,
  57: Oe,
  62: ld
}, Z1 = {
  91: n1
}, J1 = {
  [-2]: ro,
  [-1]: ro,
  32: ro
}, b1 = {
  35: u1,
  42: Di,
  45: [rc, Di],
  60: f1,
  61: rc,
  95: Di,
  96: nc,
  126: nc
}, e0 = {
  38: ud,
  92: od
}, n0 = {
  [-5]: io,
  [-4]: io,
  [-3]: io,
  33: z1,
  38: ud,
  42: cu,
  60: [Ly, v1],
  91: L1,
  92: [l1, od],
  93: ga,
  95: cu,
  96: Wy
}, t0 = {
  null: [cu, K1]
}, r0 = {
  null: [42, 95]
}, i0 = {
  null: []
}, l0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: r0,
  contentInitial: Z1,
  disable: i0,
  document: G1,
  flow: b1,
  flowInitial: J1,
  insideSpan: t0,
  string: e0,
  text: n0
}, Symbol.toStringTag, { value: "Module" }));
function o0(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, l = [];
  let o = [], u = [];
  const a = {
    attempt: T(C),
    check: T(x),
    consume: m,
    enter: y,
    exit: S,
    interrupt: T(x, {
      interrupt: !0
    })
  }, s = {
    code: null,
    containerState: {},
    defineSkip: w,
    events: [],
    now: k,
    parser: e,
    previous: null,
    sliceSerialize: d,
    sliceStream: p,
    write: f
  };
  let c = n.tokenize.call(s, a);
  return n.resolveAll && l.push(n), s;
  function f(D) {
    return o = Ge(o, D), I(), o[o.length - 1] !== null ? [] : (L(n, 0), s.events = ma(l, s.events, s), s.events);
  }
  function d(D, A) {
    return a0(p(D), A);
  }
  function p(D) {
    return u0(o, D);
  }
  function k() {
    const {
      _bufferIndex: D,
      _index: A,
      line: Y,
      column: le,
      offset: H
    } = r;
    return {
      _bufferIndex: D,
      _index: A,
      line: Y,
      column: le,
      offset: H
    };
  }
  function w(D) {
    i[D.line] = D.column, R();
  }
  function I() {
    let D;
    for (; r._index < o.length; ) {
      const A = o[r._index];
      if (typeof A == "string")
        for (D = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === D && r._bufferIndex < A.length; )
          h(A.charCodeAt(r._bufferIndex));
      else
        h(A);
    }
  }
  function h(D) {
    c = c(D);
  }
  function m(D) {
    j(D) ? (r.line++, r.column = 1, r.offset += D === -3 ? 2 : 1, R()) : D !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = D;
  }
  function y(D, A) {
    const Y = A || {};
    return Y.type = D, Y.start = k(), s.events.push(["enter", Y, s]), u.push(Y), Y;
  }
  function S(D) {
    const A = u.pop();
    return A.end = k(), s.events.push(["exit", A, s]), A;
  }
  function C(D, A) {
    L(D, A.from);
  }
  function x(D, A) {
    A.restore();
  }
  function T(D, A) {
    return Y;
    function Y(le, H, pe) {
      let ce, N, M, g;
      return Array.isArray(le) ? (
        /* c8 ignore next 1 */
        q(le)
      ) : "tokenize" in le ? (
        // Looks like a construct.
        q([
          /** @type {Construct} */
          le
        ])
      ) : W(le);
      function W(ee) {
        return pn;
        function pn(Rn) {
          const kt = Rn !== null && ee[Rn], wt = Rn !== null && ee.null, ni = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(kt) ? kt : kt ? [kt] : [],
            ...Array.isArray(wt) ? wt : wt ? [wt] : []
          ];
          return q(ni)(Rn);
        }
      }
      function q(ee) {
        return ce = ee, N = 0, ee.length === 0 ? pe : v(ee[N]);
      }
      function v(ee) {
        return pn;
        function pn(Rn) {
          return g = F(), M = ee, ee.partial || (s.currentConstruct = ee), ee.name && s.parser.constructs.disable.null.includes(ee.name) ? tn() : ee.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            A ? Object.assign(Object.create(s), A) : s,
            a,
            me,
            tn
          )(Rn);
        }
      }
      function me(ee) {
        return D(M, g), H;
      }
      function tn(ee) {
        return g.restore(), ++N < ce.length ? v(ce[N]) : pe;
      }
    }
  }
  function L(D, A) {
    D.resolveAll && !l.includes(D) && l.push(D), D.resolve && wn(s.events, A, s.events.length - A, D.resolve(s.events.slice(A), s)), D.resolveTo && (s.events = D.resolveTo(s.events, s));
  }
  function F() {
    const D = k(), A = s.previous, Y = s.currentConstruct, le = s.events.length, H = Array.from(u);
    return {
      from: le,
      restore: pe
    };
    function pe() {
      r = D, s.previous = A, s.currentConstruct = Y, s.events.length = le, u = H, R();
    }
  }
  function R() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function u0(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, l = n.end._bufferIndex;
  let o;
  if (t === i)
    o = [e[t].slice(r, l)];
  else {
    if (o = e.slice(t, i), r > -1) {
      const u = o[0];
      typeof u == "string" ? o[0] = u.slice(r) : o.shift();
    }
    l > 0 && o.push(e[i].slice(0, l));
  }
  return o;
}
function a0(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const l = e[t];
    let o;
    if (typeof l == "string")
      o = l;
    else switch (l) {
      case -5: {
        o = "\r";
        break;
      }
      case -4: {
        o = `
`;
        break;
      }
      case -3: {
        o = `\r
`;
        break;
      }
      case -2: {
        o = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(l);
    }
    i = l === -2, r.push(o);
  }
  return r.join("");
}
function s0(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      gy([l0, ...(e || {}).extensions || []])
    ),
    content: i(Cy),
    defined: [],
    document: i(_y),
    flow: i(W1),
    lazy: {},
    string: i(Y1),
    text: i(X1)
  };
  return r;
  function i(l) {
    return o;
    function o(u) {
      return o0(r, l, u);
    }
  }
}
function c0(e) {
  for (; !ad(e); )
    ;
  return e;
}
const ic = /[\0\t\n\r]/g;
function f0() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(l, o, u) {
    const a = [];
    let s, c, f, d, p;
    for (l = n + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), f = 0, n = "", t && (l.charCodeAt(0) === 65279 && f++, t = void 0); f < l.length; ) {
      if (ic.lastIndex = f, s = ic.exec(l), d = s && s.index !== void 0 ? s.index : l.length, p = l.charCodeAt(d), !s) {
        n = l.slice(f);
        break;
      }
      if (p === 10 && f === d && r)
        a.push(-3), r = void 0;
      else
        switch (r && (a.push(-5), r = void 0), f < d && (a.push(l.slice(f, d)), e += d - f), p) {
          case 0: {
            a.push(65533), e++;
            break;
          }
          case 9: {
            for (c = Math.ceil(e / 4) * 4, a.push(-2); e++ < c; ) a.push(-1);
            break;
          }
          case 10: {
            a.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      f = d + 1;
    }
    return u && (r && a.push(-5), n && a.push(n), a.push(null)), a;
  }
}
const p0 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function d0(e) {
  return e.replace(p0, h0);
}
function h0(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), l = i === 120 || i === 88;
    return id(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return ha(t) || e;
}
const hd = {}.hasOwnProperty;
function m0(e, n, t) {
  return typeof n != "string" && (t = n, n = void 0), g0(t)(c0(s0(t).document().write(f0()(e, n, !0))));
}
function g0(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Pa),
      autolinkProtocol: F,
      autolinkEmail: F,
      atxHeading: l(Sa),
      blockQuote: l(wt),
      characterEscape: F,
      characterReference: F,
      codeFenced: l(ni),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(ni, o),
      codeText: l(_d, o),
      codeTextData: F,
      data: F,
      codeFlowValue: F,
      definition: l(Td),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(Id),
      hardBreakEscape: l(Ea),
      hardBreakTrailing: l(Ea),
      htmlFlow: l(Ca, o),
      htmlFlowData: F,
      htmlText: l(Ca, o),
      htmlTextData: F,
      image: l(zd),
      label: o,
      link: l(Pa),
      listItem: l(Nd),
      listItemValue: d,
      listOrdered: l(_a, f),
      listUnordered: l(_a),
      paragraph: l(Ld),
      reference: v,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(Sa),
      strong: l(Od),
      thematicBreak: l(Dd)
    },
    exit: {
      atxHeading: a(),
      atxHeadingSequence: C,
      autolink: a(),
      autolinkEmail: kt,
      autolinkProtocol: Rn,
      blockQuote: a(),
      characterEscapeValue: R,
      characterReferenceMarkerHexadecimal: tn,
      characterReferenceMarkerNumeric: tn,
      characterReferenceValue: ee,
      characterReference: pn,
      codeFenced: a(I),
      codeFencedFence: w,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: k,
      codeFlowValue: R,
      codeIndented: a(h),
      codeText: a(H),
      codeTextData: R,
      data: R,
      definition: a(),
      definitionDestinationString: S,
      definitionLabelString: m,
      definitionTitleString: y,
      emphasis: a(),
      hardBreakEscape: a(A),
      hardBreakTrailing: a(A),
      htmlFlow: a(Y),
      htmlFlowData: R,
      htmlText: a(le),
      htmlTextData: R,
      image: a(ce),
      label: M,
      labelText: N,
      lineEnding: D,
      link: a(pe),
      listItem: a(),
      listOrdered: a(),
      listUnordered: a(),
      paragraph: a(),
      referenceString: me,
      resourceDestinationString: g,
      resourceTitleString: W,
      resource: q,
      setextHeading: a(L),
      setextHeadingLineSequence: T,
      setextHeadingText: x,
      strong: a(),
      thematicBreak: a()
    }
  };
  md(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(E) {
    let z = {
      type: "root",
      children: []
    };
    const B = {
      stack: [z],
      tokenStack: [],
      config: n,
      enter: u,
      exit: s,
      buffer: o,
      resume: c,
      data: t
    }, $ = [];
    let G = -1;
    for (; ++G < E.length; )
      if (E[G][1].type === "listOrdered" || E[G][1].type === "listUnordered")
        if (E[G][0] === "enter")
          $.push(G);
        else {
          const rn = $.pop();
          G = i(E, rn, G);
        }
    for (G = -1; ++G < E.length; ) {
      const rn = n[E[G][0]];
      hd.call(rn, E[G][1].type) && rn[E[G][1].type].call(Object.assign({
        sliceSerialize: E[G][2].sliceSerialize
      }, B), E[G][1]);
    }
    if (B.tokenStack.length > 0) {
      const rn = B.tokenStack[B.tokenStack.length - 1];
      (rn[1] || lc).call(B, void 0, rn[0]);
    }
    for (z.position = {
      start: An(E.length > 0 ? E[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: An(E.length > 0 ? E[E.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, G = -1; ++G < n.transforms.length; )
      z = n.transforms[G](z) || z;
    return z;
  }
  function i(E, z, B) {
    let $ = z - 1, G = -1, rn = !1, tt, xn, tr, rr;
    for (; ++$ <= B; ) {
      const Be = E[$];
      switch (Be[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Be[0] === "enter" ? G++ : G--, rr = void 0;
          break;
        }
        case "lineEndingBlank": {
          Be[0] === "enter" && (tt && !rr && !G && !tr && (tr = $), rr = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          rr = void 0;
      }
      if (!G && Be[0] === "enter" && Be[1].type === "listItemPrefix" || G === -1 && Be[0] === "exit" && (Be[1].type === "listUnordered" || Be[1].type === "listOrdered")) {
        if (tt) {
          let xt = $;
          for (xn = void 0; xt--; ) {
            const Sn = E[xt];
            if (Sn[1].type === "lineEnding" || Sn[1].type === "lineEndingBlank") {
              if (Sn[0] === "exit") continue;
              xn && (E[xn][1].type = "lineEndingBlank", rn = !0), Sn[1].type = "lineEnding", xn = xt;
            } else if (!(Sn[1].type === "linePrefix" || Sn[1].type === "blockQuotePrefix" || Sn[1].type === "blockQuotePrefixWhitespace" || Sn[1].type === "blockQuoteMarker" || Sn[1].type === "listItemIndent")) break;
          }
          tr && (!xn || tr < xn) && (tt._spread = !0), tt.end = Object.assign({}, xn ? E[xn][1].start : Be[1].end), E.splice(xn || $, 0, ["exit", tt, Be[2]]), $++, B++;
        }
        if (Be[1].type === "listItemPrefix") {
          const xt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Be[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          tt = xt, E.splice($, 0, ["enter", xt, Be[2]]), $++, B++, tr = void 0, rr = !0;
        }
      }
    }
    return E[z][1]._spread = rn, B;
  }
  function l(E, z) {
    return B;
    function B($) {
      u.call(this, E($), $), z && z.call(this, $);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function u(E, z, B) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([z, B || void 0]), E.position = {
      start: An(z.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function a(E) {
    return z;
    function z(B) {
      E && E.call(this, B), s.call(this, B);
    }
  }
  function s(E, z) {
    const B = this.stack.pop(), $ = this.tokenStack.pop();
    if ($)
      $[0].type !== E.type && (z ? z.call(this, E, $[0]) : ($[1] || lc).call(this, E, $[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + Ir({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    B.position.end = An(E.end);
  }
  function c() {
    return hy(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(E) {
    if (this.data.expectingFirstListItemValue) {
      const z = this.stack[this.stack.length - 2];
      z.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.lang = E;
  }
  function k() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.meta = E;
  }
  function w() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function h() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function m(E) {
    const z = this.resume(), B = this.stack[this.stack.length - 1];
    B.label = z, B.identifier = $t(this.sliceSerialize(E)).toLowerCase();
  }
  function y() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.title = E;
  }
  function S() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.url = E;
  }
  function C(E) {
    const z = this.stack[this.stack.length - 1];
    if (!z.depth) {
      const B = this.sliceSerialize(E).length;
      z.depth = B;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function T(E) {
    const z = this.stack[this.stack.length - 1];
    z.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function L() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function F(E) {
    const B = this.stack[this.stack.length - 1].children;
    let $ = B[B.length - 1];
    (!$ || $.type !== "text") && ($ = Rd(), $.position = {
      start: An(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, B.push($)), this.stack.push($);
  }
  function R(E) {
    const z = this.stack.pop();
    z.value += this.sliceSerialize(E), z.position.end = An(E.end);
  }
  function D(E) {
    const z = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const B = z.children[z.children.length - 1];
      B.position.end = An(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(z.type) && (F.call(this, E), R.call(this, E));
  }
  function A() {
    this.data.atHardBreak = !0;
  }
  function Y() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.value = E;
  }
  function le() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.value = E;
  }
  function H() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.value = E;
  }
  function pe() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const z = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = z, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function ce() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const z = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = z, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function N(E) {
    const z = this.sliceSerialize(E), B = this.stack[this.stack.length - 2];
    B.label = d0(z), B.identifier = $t(z).toLowerCase();
  }
  function M() {
    const E = this.stack[this.stack.length - 1], z = this.resume(), B = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, B.type === "link") {
      const $ = E.children;
      B.children = $;
    } else
      B.alt = z;
  }
  function g() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.url = E;
  }
  function W() {
    const E = this.resume(), z = this.stack[this.stack.length - 1];
    z.title = E;
  }
  function q() {
    this.data.inReference = void 0;
  }
  function v() {
    this.data.referenceType = "collapsed";
  }
  function me(E) {
    const z = this.resume(), B = this.stack[this.stack.length - 1];
    B.label = z, B.identifier = $t(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function tn(E) {
    this.data.characterReferenceType = E.type;
  }
  function ee(E) {
    const z = this.sliceSerialize(E), B = this.data.characterReferenceType;
    let $;
    B ? ($ = id(z, B === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : $ = ha(z);
    const G = this.stack[this.stack.length - 1];
    G.value += $;
  }
  function pn(E) {
    const z = this.stack.pop();
    z.position.end = An(E.end);
  }
  function Rn(E) {
    R.call(this, E);
    const z = this.stack[this.stack.length - 1];
    z.url = this.sliceSerialize(E);
  }
  function kt(E) {
    R.call(this, E);
    const z = this.stack[this.stack.length - 1];
    z.url = "mailto:" + this.sliceSerialize(E);
  }
  function wt() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ni() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function _d() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Td() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Id() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Sa() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Ea() {
    return {
      type: "break"
    };
  }
  function Ca() {
    return {
      type: "html",
      value: ""
    };
  }
  function zd() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Pa() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function _a(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: []
    };
  }
  function Nd(E) {
    return {
      type: "listItem",
      spread: E._spread,
      checked: null,
      children: []
    };
  }
  function Ld() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Od() {
    return {
      type: "strong",
      children: []
    };
  }
  function Rd() {
    return {
      type: "text",
      value: ""
    };
  }
  function Dd() {
    return {
      type: "thematicBreak"
    };
  }
}
function An(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function md(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? md(e, r) : y0(e, r);
  }
}
function y0(e, n) {
  let t;
  for (t in n)
    if (hd.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function lc(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Ir({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + Ir({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + Ir({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function v0(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return m0(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
function k0(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function w0(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function x0(e, n) {
  const t = n.value ? n.value + `
` : "", r = {};
  n.lang && (r.className = ["language-" + n.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (i.data = { meta: n.meta }), e.patch(n, i), i = e.applyData(n, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, e.patch(n, i), i;
}
function S0(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function E0(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function C0(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = nr(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
  let o, u = e.footnoteCounts.get(r);
  u === void 0 ? (u = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = l + 1, u += 1, e.footnoteCounts.set(r, u);
  const a = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (u > 1 ? "-" + u : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  e.patch(n, a);
  const s = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [a]
  };
  return e.patch(n, s), e.applyData(n, s);
}
function P0(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function _0(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function gd(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function T0(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return gd(e, n);
  const i = { src: nr(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, l), e.applyData(n, l);
}
function I0(e, n) {
  const t = { src: nr(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function z0(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return e.patch(n, r), e.applyData(n, r);
}
function N0(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return gd(e, n);
  const i = { href: nr(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function L0(e, n) {
  const t = { href: nr(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function O0(e, n, t) {
  const r = e.all(n), i = t ? R0(t) : yd(n), l = {}, o = [];
  if (typeof n.checked == "boolean") {
    const c = r[0];
    let f;
    c && c.type === "element" && c.tagName === "p" ? f = c : (f = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), l.className = ["task-list-item"];
  }
  let u = -1;
  for (; ++u < r.length; ) {
    const c = r[u];
    (i || u !== 0 || c.type !== "element" || c.tagName !== "p") && o.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !i ? o.push(...c.children) : o.push(c);
  }
  const a = r[r.length - 1];
  a && (i || a.type !== "element" || a.tagName !== "p") && o.push({ type: "text", value: `
` });
  const s = { type: "element", tagName: "li", properties: l, children: o };
  return e.patch(n, s), e.applyData(n, s);
}
function R0(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = yd(t[r]);
  }
  return n;
}
function yd(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function D0(e, n) {
  const t = {}, r = e.all(n);
  let i = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function A0(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function M0(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function F0(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function j0(e, n) {
  const t = e.all(n), r = t.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], o), i.push(o);
  }
  if (t.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, u = ca(n.children[1]), a = qp(n.children[n.children.length - 1]);
    u && a && (o.position = { start: u, end: a }), i.push(o);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function B0(e, n, t) {
  const r = t ? t.children : void 0, l = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", o = t && t.type === "table" ? t.align : void 0, u = o ? o.length : n.children.length;
  let a = -1;
  const s = [];
  for (; ++a < u; ) {
    const f = n.children[a], d = {}, p = o ? o[a] : void 0;
    p && (d.align = p);
    let k = { type: "element", tagName: l, properties: d, children: [] };
    f && (k.children = e.all(f), e.patch(f, k), k = e.applyData(f, k)), s.push(k);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(s, !0)
  };
  return e.patch(n, c), e.applyData(n, c);
}
function U0(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const oc = 9, uc = 32;
function V0(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const l = [];
  for (; r; )
    l.push(
      ac(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return l.push(ac(n.slice(i), i > 0, !1)), l.join("");
}
function ac(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let l = e.codePointAt(r);
    for (; l === oc || l === uc; )
      r++, l = e.codePointAt(r);
  }
  if (t) {
    let l = e.codePointAt(i - 1);
    for (; l === oc || l === uc; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function H0(e, n) {
  const t = { type: "text", value: V0(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function $0(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const W0 = {
  blockquote: k0,
  break: w0,
  code: x0,
  delete: S0,
  emphasis: E0,
  footnoteReference: C0,
  heading: P0,
  html: _0,
  imageReference: T0,
  image: I0,
  inlineCode: z0,
  linkReference: N0,
  link: L0,
  listItem: O0,
  list: D0,
  paragraph: A0,
  // @ts-expect-error: root is different, but hard to type.
  root: M0,
  strong: F0,
  table: j0,
  tableCell: U0,
  tableRow: B0,
  text: H0,
  thematicBreak: $0,
  toml: ki,
  yaml: ki,
  definition: ki,
  footnoteDefinition: ki
};
function ki() {
}
const vd = -1, _l = 0, ol = 1, ul = 2, ya = 3, va = 4, ka = 5, wa = 6, kd = 7, wd = 8, sc = typeof self == "object" ? self : globalThis, Q0 = (e, n) => {
  const t = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = n[i];
    switch (l) {
      case _l:
      case vd:
        return t(o, i);
      case ol: {
        const u = t([], i);
        for (const a of o)
          u.push(r(a));
        return u;
      }
      case ul: {
        const u = t({}, i);
        for (const [a, s] of o)
          u[r(a)] = r(s);
        return u;
      }
      case ya:
        return t(new Date(o), i);
      case va: {
        const { source: u, flags: a } = o;
        return t(new RegExp(u, a), i);
      }
      case ka: {
        const u = t(/* @__PURE__ */ new Map(), i);
        for (const [a, s] of o)
          u.set(r(a), r(s));
        return u;
      }
      case wa: {
        const u = t(/* @__PURE__ */ new Set(), i);
        for (const a of o)
          u.add(r(a));
        return u;
      }
      case kd: {
        const { name: u, message: a } = o;
        return t(new sc[u](a), i);
      }
      case wd:
        return t(BigInt(o), i);
      case "BigInt":
        return t(Object(BigInt(o)), i);
    }
    return t(new sc[l](o), i);
  };
  return r;
}, cc = (e) => Q0(/* @__PURE__ */ new Map(), e)(0), Et = "", { toString: K0 } = {}, { keys: Y0 } = Object, hr = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [_l, n];
  const t = K0.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [ol, Et];
    case "Object":
      return [ul, Et];
    case "Date":
      return [ya, Et];
    case "RegExp":
      return [va, Et];
    case "Map":
      return [ka, Et];
    case "Set":
      return [wa, Et];
  }
  return t.includes("Array") ? [ol, t] : t.includes("Error") ? [kd, t] : [ul, t];
}, wi = ([e, n]) => e === _l && (n === "function" || n === "symbol"), X0 = (e, n, t, r) => {
  const i = (o, u) => {
    const a = r.push(o) - 1;
    return t.set(u, a), a;
  }, l = (o) => {
    if (t.has(o))
      return t.get(o);
    let [u, a] = hr(o);
    switch (u) {
      case _l: {
        let c = o;
        switch (a) {
          case "bigint":
            u = wd, c = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + a);
            c = null;
            break;
          case "undefined":
            return i([vd], o);
        }
        return i([u, c], o);
      }
      case ol: {
        if (a)
          return i([a, [...o]], o);
        const c = [], f = i([u, c], o);
        for (const d of o)
          c.push(l(d));
        return f;
      }
      case ul: {
        if (a)
          switch (a) {
            case "BigInt":
              return i([a, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([a, o.valueOf()], o);
          }
        if (n && "toJSON" in o)
          return l(o.toJSON());
        const c = [], f = i([u, c], o);
        for (const d of Y0(o))
          (e || !wi(hr(o[d]))) && c.push([l(d), l(o[d])]);
        return f;
      }
      case ya:
        return i([u, o.toISOString()], o);
      case va: {
        const { source: c, flags: f } = o;
        return i([u, { source: c, flags: f }], o);
      }
      case ka: {
        const c = [], f = i([u, c], o);
        for (const [d, p] of o)
          (e || !(wi(hr(d)) || wi(hr(p)))) && c.push([l(d), l(p)]);
        return f;
      }
      case wa: {
        const c = [], f = i([u, c], o);
        for (const d of o)
          (e || !wi(hr(d))) && c.push(l(d));
        return f;
      }
    }
    const { message: s } = o;
    return i([u, { name: a, message: s }], o);
  };
  return l;
}, fc = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return X0(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, al = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? cc(fc(e, n)) : structuredClone(e)
) : (e, n) => cc(fc(e, n));
function q0(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function G0(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function Z0(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || q0, r = e.options.footnoteBackLabel || G0, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, u = [];
  let a = -1;
  for (; ++a < e.footnoteOrder.length; ) {
    const s = e.footnoteById.get(
      e.footnoteOrder[a]
    );
    if (!s)
      continue;
    const c = e.all(s), f = String(s.identifier).toUpperCase(), d = nr(f.toLowerCase());
    let p = 0;
    const k = [], w = e.footnoteCounts.get(f);
    for (; w !== void 0 && ++p <= w; ) {
      k.length > 0 && k.push({ type: "text", value: " " });
      let m = typeof t == "string" ? t : t(a, p);
      typeof m == "string" && (m = { type: "text", value: m }), k.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + d + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(a, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(m) ? m : [m]
      });
    }
    const I = c[c.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const m = I.children[I.children.length - 1];
      m && m.type === "text" ? m.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...k);
    } else
      c.push(...k);
    const h = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + d },
      children: e.wrap(c, !0)
    };
    e.patch(s, h), u.push(h);
  }
  if (u.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: l,
          properties: {
            ...al(o),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(u, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const xd = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return nv;
    if (typeof e == "function")
      return Tl(e);
    if (typeof e == "object")
      return Array.isArray(e) ? J0(e) : b0(e);
    if (typeof e == "string")
      return ev(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function J0(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = xd(e[t]);
  return Tl(r);
  function r(...i) {
    let l = -1;
    for (; ++l < n.length; )
      if (n[l].apply(this, i)) return !0;
    return !1;
  }
}
function b0(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Tl(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in e)
      if (i[l] !== n[l]) return !1;
    return !0;
  }
}
function ev(e) {
  return Tl(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Tl(e) {
  return n;
  function n(t, r, i) {
    return !!(tv(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function nv() {
  return !0;
}
function tv(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Sd = [], rv = !0, pc = !1, iv = "skip";
function lv(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const l = xd(i), o = r ? -1 : 1;
  u(e, void 0, [])();
  function u(a, s, c) {
    const f = (
      /** @type {Record<string, unknown>} */
      a && typeof a == "object" ? a : {}
    );
    if (typeof f.type == "string") {
      const p = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(d, "name", {
        value: "node (" + (a.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return d;
    function d() {
      let p = Sd, k, w, I;
      if ((!n || l(a, s, c[c.length - 1] || void 0)) && (p = ov(t(a, c)), p[0] === pc))
        return p;
      if ("children" in a && a.children) {
        const h = (
          /** @type {UnistParent} */
          a
        );
        if (h.children && p[0] !== iv)
          for (w = (r ? h.children.length : -1) + o, I = c.concat(h); w > -1 && w < h.children.length; ) {
            const m = h.children[w];
            if (k = u(m, w, I)(), k[0] === pc)
              return k;
            w = typeof k[1] == "number" ? k[1] : w + o;
          }
      }
      return p;
    }
  }
}
function ov(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [rv, e] : e == null ? Sd : [e];
}
function Ed(e, n, t, r) {
  let i, l, o;
  typeof n == "function" && typeof t != "function" ? (l = void 0, o = n, i = t) : (l = n, o = t, i = r), lv(e, l, u, i);
  function u(a, s) {
    const c = s[s.length - 1], f = c ? c.children.indexOf(a) : void 0;
    return o(a, f, c);
  }
}
const fu = {}.hasOwnProperty, uv = {};
function av(e, n) {
  const t = n || uv, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...W0, ...t.handlers }, u = {
    all: s,
    applyData: cv,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: a,
    options: t,
    patch: sv,
    wrap: pv
  };
  return Ed(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const f = c.type === "definition" ? r : i, d = String(c.identifier).toUpperCase();
      f.has(d) || f.set(d, c);
    }
  }), u;
  function a(c, f) {
    const d = c.type, p = u.handlers[d];
    if (fu.call(u.handlers, d) && p)
      return p(u, c, f);
    if (u.options.passThrough && u.options.passThrough.includes(d)) {
      if ("children" in c) {
        const { children: w, ...I } = c, h = al(I);
        return h.children = u.all(c), h;
      }
      return al(c);
    }
    return (u.options.unknownHandler || fv)(u, c, f);
  }
  function s(c) {
    const f = [];
    if ("children" in c) {
      const d = c.children;
      let p = -1;
      for (; ++p < d.length; ) {
        const k = u.one(d[p], c);
        if (k) {
          if (p && d[p - 1].type === "break" && (!Array.isArray(k) && k.type === "text" && (k.value = dc(k.value)), !Array.isArray(k) && k.type === "element")) {
            const w = k.children[0];
            w && w.type === "text" && (w.value = dc(w.value));
          }
          Array.isArray(k) ? f.push(...k) : f.push(k);
        }
      }
    }
    return f;
  }
}
function sv(e, n) {
  e.position && (n.position = jg(e));
}
function cv(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, l = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const o = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: o };
      }
    t.type === "element" && l && Object.assign(t.properties, al(l)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function fv(e, n) {
  const t = n.data || {}, r = "value" in n && !(fu.call(t, "hProperties") || fu.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function pv(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function dc(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function hc(e, n) {
  const t = av(e, n), r = t.one(e, void 0), i = Z0(t), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function dv(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      hc(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      hc(t, { file: r, ...e || n })
    );
  };
}
function mc(e) {
  if (e)
    throw e;
}
var Ai = Object.prototype.hasOwnProperty, Cd = Object.prototype.toString, gc = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, vc = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : Cd.call(n) === "[object Array]";
}, kc = function(n) {
  if (!n || Cd.call(n) !== "[object Object]")
    return !1;
  var t = Ai.call(n, "constructor"), r = n.constructor && n.constructor.prototype && Ai.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var i;
  for (i in n)
    ;
  return typeof i > "u" || Ai.call(n, i);
}, wc = function(n, t) {
  gc && t.name === "__proto__" ? gc(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, xc = function(n, t) {
  if (t === "__proto__")
    if (Ai.call(n, t)) {
      if (yc)
        return yc(n, t).value;
    } else return;
  return n[t];
}, hv = function e() {
  var n, t, r, i, l, o, u = arguments[0], a = 1, s = arguments.length, c = !1;
  for (typeof u == "boolean" && (c = u, u = arguments[1] || {}, a = 2), (u == null || typeof u != "object" && typeof u != "function") && (u = {}); a < s; ++a)
    if (n = arguments[a], n != null)
      for (t in n)
        r = xc(u, t), i = xc(n, t), u !== i && (c && i && (kc(i) || (l = vc(i))) ? (l ? (l = !1, o = r && vc(r) ? r : []) : o = r && kc(r) ? r : {}, wc(u, { name: t, newValue: e(c, o, i) })) : typeof i < "u" && wc(u, { name: t, newValue: i }));
  return u;
};
const lo = /* @__PURE__ */ Ad(hv);
function pu(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function mv() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    u(null, ...i);
    function u(a, ...s) {
      const c = e[++l];
      let f = -1;
      if (a) {
        o(a);
        return;
      }
      for (; ++f < i.length; )
        (s[f] === null || s[f] === void 0) && (s[f] = i[f]);
      i = s, c ? gv(c, u)(...s) : o(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function gv(e, n) {
  let t;
  return r;
  function r(...o) {
    const u = e.length > o.length;
    let a;
    u && o.push(i);
    try {
      a = e.apply(this, o);
    } catch (s) {
      const c = (
        /** @type {Error} */
        s
      );
      if (u && t)
        throw c;
      return i(c);
    }
    u || (a && a.then && typeof a.then == "function" ? a.then(l, i) : a instanceof Error ? i(a) : l(a));
  }
  function i(o, ...u) {
    t || (t = !0, n(o, ...u));
  }
  function l(o) {
    i(null, o);
  }
}
const mn = { basename: yv, dirname: vv, extname: kv, join: wv, sep: "/" };
function yv(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  ei(e);
  let t = 0, r = -1, i = e.length, l;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          t = i + 1;
          break;
        }
      } else r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let o = -1, u = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        t = i + 1;
        break;
      }
    } else
      o < 0 && (l = !0, o = i + 1), u > -1 && (e.codePointAt(i) === n.codePointAt(u--) ? u < 0 && (r = i) : (u = -1, r = o));
  return t === r ? r = o : r < 0 && (r = e.length), e.slice(t, r);
}
function vv(e) {
  if (ei(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function kv(e) {
  ei(e);
  let n = e.length, t = -1, r = 0, i = -1, l = 0, o;
  for (; n--; ) {
    const u = e.codePointAt(n);
    if (u === 47) {
      if (o) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (o = !0, t = n + 1), u === 46 ? i < 0 ? i = n : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function wv(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    ei(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : xv(t);
}
function xv(e) {
  ei(e);
  const n = e.codePointAt(0) === 47;
  let t = Sv(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function Sv(e, n) {
  let t = "", r = 0, i = -1, l = 0, o = -1, u, a;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      u = e.codePointAt(o);
    else {
      if (u === 47)
        break;
      u = 47;
    }
    if (u === 47) {
      if (!(i === o - 1 || l === 1)) if (i !== o - 1 && l === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (a = t.lastIndexOf("/"), a !== t.length - 1) {
              a < 0 ? (t = "", r = 0) : (t = t.slice(0, a), r = t.length - 1 - t.lastIndexOf("/")), i = o, l = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = o, l = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, o) : t = e.slice(i + 1, o), r = o - i - 1;
      i = o, l = 0;
    } else u === 46 && l > -1 ? l++ : l = -1;
  }
  return t;
}
function ei(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Ev = { cwd: Cv };
function Cv() {
  return "/";
}
function du(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Pv(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!du(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return _v(e);
}
function _v(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
}
const oo = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Pd {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(n) {
    let t;
    n ? du(n) ? t = { path: n } : typeof n == "string" || Tv(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : Ev.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < oo.length; ) {
      const l = oo[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      oo.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? mn.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(n) {
    ao(n, "basename"), uo(n, "basename"), this.path = mn.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? mn.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(n) {
    Sc(this.basename, "dirname"), this.path = mn.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? mn.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(n) {
    if (uo(n, "extname"), Sc(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = mn.join(this.dirname, this.stem + (n || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(n) {
    du(n) && (n = Pv(n)), ao(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? mn.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(n) {
    ao(n, "stem"), uo(n, "stem"), this.path = mn.join(this.dirname || "", n + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(n, t, r) {
    const i = this.message(n, t, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(n, t, r) {
    const i = this.message(n, t, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(n, t, r) {
    const i = new Te(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function uo(e, n) {
  if (e && e.includes(mn.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + mn.sep + "`"
    );
}
function ao(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function Sc(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Tv(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Iv = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], l = function() {
      return i.apply(l, arguments);
    };
    return Object.setPrototypeOf(l, r), l;
  }
), zv = {}.hasOwnProperty;
class xa extends Iv {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = mv();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new xa()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(lo(!0, {}, this.namespace)), n;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (fo("data", this.frozen), this.namespace[n] = t, this) : zv.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (fo("data", this.frozen), this.namespace = n, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(n, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(n) {
    this.freeze();
    const t = xi(n), r = this.parser || this.Parser;
    return so("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(n, t) {
    const r = this;
    return this.freeze(), so("process", this.parser || this.Parser), co("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, o) {
      const u = xi(n), a = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(u)
      );
      r.run(a, u, function(c, f, d) {
        if (c || !f || !d)
          return s(c);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), k = r.stringify(p, d);
        Ov(k) ? d.value = k : d.result = k, s(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          d
        );
      });
      function s(c, f) {
        c || !f ? o(c) : l ? l(f) : t(void 0, f);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(n) {
    let t = !1, r;
    return this.freeze(), so("processSync", this.parser || this.Parser), co("processSync", this.compiler || this.Compiler), this.process(n, i), Cc("processSync", "process", t), r;
    function i(l, o) {
      t = !0, mc(l), r = o;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(n, t, r) {
    Ec(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, u) {
      const a = xi(t);
      i.run(n, a, s);
      function s(c, f, d) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || n
        );
        c ? u(c) : o ? o(p) : r(void 0, p, d);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(n, t) {
    let r = !1, i;
    return this.run(n, t, l), Cc("runSync", "run", r), i;
    function l(o, u) {
      mc(o), i = u, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(n, t) {
    this.freeze();
    const r = xi(t), i = this.compiler || this.Compiler;
    return co("stringify", i), Ec(n), i(n, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(n, ...t) {
    const r = this.attachers, i = this.namespace;
    if (fo("use", this.frozen), n != null) if (typeof n == "function")
      a(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? u(n) : o(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function l(s) {
      if (typeof s == "function")
        a(s, []);
      else if (typeof s == "object")
        if (Array.isArray(s)) {
          const [c, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            s
          );
          a(c, f);
        } else
          o(s);
      else
        throw new TypeError("Expected usable value, not `" + s + "`");
    }
    function o(s) {
      if (!("plugins" in s) && !("settings" in s))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      u(s.plugins), s.settings && (i.settings = lo(!0, i.settings, s.settings));
    }
    function u(s) {
      let c = -1;
      if (s != null) if (Array.isArray(s))
        for (; ++c < s.length; ) {
          const f = s[c];
          l(f);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + s + "`");
    }
    function a(s, c) {
      let f = -1, d = -1;
      for (; ++f < r.length; )
        if (r[f][0] === s) {
          d = f;
          break;
        }
      if (d === -1)
        r.push([s, ...c]);
      else if (c.length > 0) {
        let [p, ...k] = c;
        const w = r[d][1];
        pu(w) && pu(p) && (p = lo(!0, w, p)), r[d] = [s, p, ...k];
      }
    }
  }
}
const Nv = new xa().freeze();
function so(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function co(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function fo(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Ec(e) {
  if (!pu(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Cc(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function xi(e) {
  return Lv(e) ? e : new Pd(e);
}
function Lv(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ov(e) {
  return typeof e == "string" || Rv(e);
}
function Rv(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Dv = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Pc = [], _c = { allowDangerousHtml: !0 }, Av = /^(https?|ircs?|mailto|xmpp)$/i, Mv = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Fv(e) {
  const n = e.allowedElements, t = e.allowElement, r = e.children || "", i = e.className, l = e.components, o = e.disallowedElements, u = e.rehypePlugins || Pc, a = e.remarkPlugins || Pc, s = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ..._c } : _c, c = e.skipHtml, f = e.unwrapDisallowed, d = e.urlTransform || jv, p = Nv().use(v0).use(a).use(dv, s).use(u), k = new Pd();
  typeof r == "string" && (k.value = r);
  for (const m of Mv)
    Object.hasOwn(e, m.from) && ("" + m.from + (m.to ? "use `" + m.to + "` instead" : "remove it") + Dv + m.id, void 0);
  const w = p.parse(k);
  let I = p.runSync(w, k);
  return i && (I = {
    type: "element",
    tagName: "div",
    properties: { className: i },
    // Assume no doctypes.
    children: (
      /** @type {Array<ElementContent>} */
      I.type === "root" ? I.children : [I]
    )
  }), Ed(I, h), Wg(I, {
    Fragment: to.Fragment,
    components: l,
    ignoreInvalidStyle: !0,
    jsx: to.jsx,
    jsxs: to.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function h(m, y, S) {
    if (m.type === "raw" && S && typeof y == "number")
      return c ? S.children.splice(y, 1) : S.children[y] = { type: "text", value: m.value }, y;
    if (m.type === "element") {
      let C;
      for (C in no)
        if (Object.hasOwn(no, C) && Object.hasOwn(m.properties, C)) {
          const x = m.properties[C], T = no[C];
          (T === null || T.includes(m.tagName)) && (m.properties[C] = d(String(x || ""), C, m));
        }
    }
    if (m.type === "element") {
      let C = n ? !n.includes(m.tagName) : o ? o.includes(m.tagName) : !1;
      if (!C && t && typeof y == "number" && (C = !t(m, y, S)), C && S && typeof y == "number")
        return f && m.children ? S.children.splice(y, 1, ...m.children) : S.children.splice(y, 1), y;
    }
  }
}
function jv(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i > -1 && n > i || t > -1 && n > t || r > -1 && n > r || // It is a protocol, it should be allowed.
    Av.test(e.slice(0, n)) ? e : ""
  );
}
function Bv({
  messages: e,
  placeholder: n,
  maxHeight: t,
  className: r = "",
  onNewMessage: i
}) {
  const [l, o] = re.useState(""), u = re.useRef(null), a = () => {
    var f;
    (f = u.current) == null || f.scrollIntoView({ behavior: "smooth" });
  };
  re.useEffect(() => {
    a();
  }, [e]);
  const s = (f) => {
    if (f.preventDefault(), l.trim()) {
      const d = {
        id: String(e.length),
        content: l.trim(),
        type: "user",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      i(d), o("");
    }
  }, c = (f) => new Date(f).toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ re.createElement(
    "div",
    {
      className: `chat-container ${r}`,
      style: { maxHeight: t }
    },
    /* @__PURE__ */ re.createElement("div", { className: "chat-messages" }, e.map((f) => /* @__PURE__ */ re.createElement(
      "div",
      {
        key: f.id,
        className: `chat-message ${f.type}`
      },
      /* @__PURE__ */ re.createElement("div", { className: "message-content" }, /* @__PURE__ */ re.createElement(Fv, null, f.content)),
      /* @__PURE__ */ re.createElement("div", { className: "message-timestamp" }, c(f.timestamp))
    )), /* @__PURE__ */ re.createElement("div", { ref: u })),
    /* @__PURE__ */ re.createElement("form", { className: "chat-input", onSubmit: s }, /* @__PURE__ */ re.createElement(
      "input",
      {
        type: "text",
        value: l,
        onChange: (f) => o(f.target.value),
        placeholder: n,
        className: "chat-input-field"
      }
    ), /* @__PURE__ */ re.createElement(
      "button",
      {
        type: "submit",
        className: "chat-submit-button",
        disabled: !l.trim()
      },
      "Send"
    ))
  );
}
function Uv() {
  const [e] = pr("messages"), [n] = pr("placeholder"), [t] = pr("max_height"), [r] = pr("class_name"), [, i] = pr("new_message"), l = (o) => {
    i(o);
  };
  return /* @__PURE__ */ re.createElement(
    Bv,
    {
      messages: e,
      placeholder: n,
      maxHeight: t,
      className: r,
      onNewMessage: l
    }
  );
}
const Vv = {
  render: ig(Uv)
};
export {
  Vv as default
};
