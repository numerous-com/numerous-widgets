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
var Xr = Symbol.for("react.element"), Md = Symbol.for("react.portal"), Fd = Symbol.for("react.fragment"), jd = Symbol.for("react.strict_mode"), Bd = Symbol.for("react.profiler"), Ud = Symbol.for("react.provider"), Vd = Symbol.for("react.context"), Hd = Symbol.for("react.forward_ref"), $d = Symbol.for("react.suspense"), Wd = Symbol.for("react.memo"), Qd = Symbol.for("react.lazy"), za = Symbol.iterator;
function Kd(e) {
  return e === null || typeof e != "object" ? null : (e = za && e[za] || e["@@iterator"], typeof e == "function" ? e : null);
}
var zc = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Ic = Object.assign, Nc = {};
function Jt(e, n, t) {
  this.props = e, this.context = n, this.refs = Nc, this.updater = t || zc;
}
Jt.prototype.isReactComponent = {};
Jt.prototype.setState = function(e, n) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, n, "setState");
};
Jt.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Lc() {
}
Lc.prototype = Jt.prototype;
function hu(e, n, t) {
  this.props = e, this.context = n, this.refs = Nc, this.updater = t || zc;
}
var mu = hu.prototype = new Lc();
mu.constructor = hu;
Ic(mu, Jt.prototype);
mu.isPureReactComponent = !0;
var Ia = Array.isArray, Oc = Object.prototype.hasOwnProperty, gu = { current: null }, Rc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Dc(e, n, t) {
  var r, l = {}, i = null, o = null;
  if (n != null) for (r in n.ref !== void 0 && (o = n.ref), n.key !== void 0 && (i = "" + n.key), n) Oc.call(n, r) && !Rc.hasOwnProperty(r) && (l[r] = n[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = t;
  else if (1 < u) {
    for (var a = Array(u), s = 0; s < u; s++) a[s] = arguments[s + 2];
    l.children = a;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: Xr, type: e, key: i, ref: o, props: l, _owner: gu.current };
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
function zi(e, n) {
  return typeof e == "object" && e !== null && e.key != null ? Xd("" + e.key) : n.toString(36);
}
function Sl(e, n, t, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
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
  if (o) return o = e, l = l(o), e = r === "" ? "." + zi(o, 0) : r, Ia(l) ? (t = "", e != null && (t = e.replace(Na, "$&/") + "/"), Sl(l, n, t, "", function(s) {
    return s;
  })) : l != null && (yu(l) && (l = Yd(l, t + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Na, "$&/") + "/") + e)), n.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Ia(e)) for (var u = 0; u < e.length; u++) {
    i = e[u];
    var a = r + zi(i, u);
    o += Sl(i, n, t, a, l);
  }
  else if (a = Kd(e), typeof a == "function") for (e = a.call(e), u = 0; !(i = e.next()).done; ) i = i.value, a = r + zi(i, u++), o += Sl(i, n, t, a, l);
  else if (i === "object") throw n = String(e), Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function tl(e, n, t) {
  if (e == null) return e;
  var r = [], l = 0;
  return Sl(e, r, "", "", function(i) {
    return n.call(t, i, l++);
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
var Ne = { current: null }, El = { transition: null }, Gd = { ReactCurrentDispatcher: Ne, ReactCurrentBatchConfig: El, ReactCurrentOwner: gu };
function Ac() {
  throw Error("act(...) is not supported in production builds of React.");
}
V.Children = { map: tl, forEach: function(e, n, t) {
  tl(e, function() {
    n.apply(this, arguments);
  }, t);
}, count: function(e) {
  var n = 0;
  return tl(e, function() {
    n++;
  }), n;
}, toArray: function(e) {
  return tl(e, function(n) {
    return n;
  }) || [];
}, only: function(e) {
  if (!yu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
V.Component = Jt;
V.Fragment = Fd;
V.Profiler = Bd;
V.PureComponent = hu;
V.StrictMode = jd;
V.Suspense = $d;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gd;
V.act = Ac;
V.cloneElement = function(e, n, t) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Ic({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (n != null) {
    if (n.ref !== void 0 && (i = n.ref, o = gu.current), n.key !== void 0 && (l = "" + n.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (a in n) Oc.call(n, a) && !Rc.hasOwnProperty(a) && (r[a] = n[a] === void 0 && u !== void 0 ? u[a] : n[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = t;
  else if (1 < a) {
    u = Array(a);
    for (var s = 0; s < a; s++) u[s] = arguments[s + 2];
    r.children = u;
  }
  return { $$typeof: Xr, type: e.type, key: l, ref: i, props: r, _owner: o };
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
  var n = El.transition;
  El.transition = {};
  try {
    e();
  } finally {
    El.transition = n;
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
var de = Tc.exports, Mc = { exports: {} }, Ke = {}, Fc = { exports: {} }, jc = {};
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
      if (0 < l(q, M)) N[W] = M, N[g] = q, g = W;
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
        if (0 > l(tn, g)) ee < q && 0 > l(pn, tn) ? (N[W] = pn, N[ee] = g, W = ee) : (N[W] = tn, N[me] = g, W = me);
        else if (ee < q && 0 > l(pn, g)) N[W] = pn, N[ee] = g, W = ee;
        else break e;
      }
    }
    return M;
  }
  function l(N, M) {
    var g = N.sortIndex - M.sortIndex;
    return g !== 0 ? g : N.id - M.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, u = o.now();
    e.unstable_now = function() {
      return o.now() - u;
    };
  }
  var a = [], s = [], c = 1, f = null, d = 3, p = !1, k = !1, w = !1, z = typeof setTimeout == "function" ? setTimeout : null, h = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
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
    if (w = !1, y(N), !k) if (t(a) !== null) k = !0, fe(C);
    else {
      var M = t(s);
      M !== null && se(S, M.startTime - N);
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
        me !== null && se(S, me.startTime - M), v = !1;
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
    z(A, 0);
  };
  function fe(N) {
    T = N, x || (x = !0, Y());
  }
  function se(N, M) {
    L = z(function() {
      N(e.unstable_now());
    }, M);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(N) {
    N.callback = null;
  }, e.unstable_continueExecution = function() {
    k || p || (k = !0, fe(C));
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
    return q = g + q, N = { id: c++, callback: M, priorityLevel: N, startTime: g, expirationTime: q, sortIndex: -1 }, g > W ? (N.sortIndex = g, n(s, N), t(a) === null && N === t(s) && (w ? (h(L), L = -1) : w = !0, se(S, g - W))) : (N.sortIndex = q, n(a, N), k || p || (k = !0, fe(C))), N;
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
var Jd = de, Qe = Zd;
function P(e) {
  for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++) n += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Bc = /* @__PURE__ */ new Set(), Nr = {};
function yt(e, n) {
  Qt(e, n), Qt(e + "Capture", n);
}
function Qt(e, n) {
  for (Nr[e] = n, e = 0; e < n.length; e++) Bc.add(n[e]);
}
var zn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), po = Object.prototype.hasOwnProperty, bd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, La = {}, Oa = {};
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
function Le(e, n, t, r, l, i, o) {
  this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = t, this.propertyName = e, this.type = n, this.sanitizeURL = i, this.removeEmptyString = o;
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
  var l = Se.hasOwnProperty(n) ? Se[n] : null;
  (l !== null ? l.type !== 0 : r || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (th(n, t, l, r) && (t = null), r || l === null ? eh(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : l.mustUseProperty ? e[l.propertyName] = t === null ? l.type === 3 ? !1 : "" : t : (n = l.attributeName, r = l.attributeNamespace, t === null ? e.removeAttribute(n) : (l = l.type, t = l === 3 || l === 4 && t === !0 ? "" : "" + t, r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
}
var On = Jd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, rl = Symbol.for("react.element"), Pt = Symbol.for("react.portal"), _t = Symbol.for("react.fragment"), xu = Symbol.for("react.strict_mode"), ho = Symbol.for("react.profiler"), Uc = Symbol.for("react.provider"), Vc = Symbol.for("react.context"), Su = Symbol.for("react.forward_ref"), mo = Symbol.for("react.suspense"), go = Symbol.for("react.suspense_list"), Eu = Symbol.for("react.memo"), Fn = Symbol.for("react.lazy"), Hc = Symbol.for("react.offscreen"), Ra = Symbol.iterator;
function ir(e) {
  return e === null || typeof e != "object" ? null : (e = Ra && e[Ra] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ue = Object.assign, Ii;
function mr(e) {
  if (Ii === void 0) try {
    throw Error();
  } catch (t) {
    var n = t.stack.trim().match(/\n( *(at )?)/);
    Ii = n && n[1] || "";
  }
  return `
` + Ii + e;
}
var Ni = !1;
function Li(e, n) {
  if (!e || Ni) return "";
  Ni = !0;
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
      for (var l = s.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u]; ) u--;
      for (; 1 <= o && 0 <= u; o--, u--) if (l[o] !== i[u]) {
        if (o !== 1 || u !== 1)
          do
            if (o--, u--, 0 > u || l[o] !== i[u]) {
              var a = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
            }
          while (1 <= o && 0 <= u);
        break;
      }
    }
  } finally {
    Ni = !1, Error.prepareStackTrace = t;
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
      return e = Li(e.type, !1), e;
    case 11:
      return e = Li(e.type.render, !1), e;
    case 1:
      return e = Li(e.type, !0), e;
    default:
      return "";
  }
}
function yo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case _t:
      return "Fragment";
    case Pt:
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
    case Fn:
      n = e._payload, e = e._init;
      try {
        return yo(e(n));
      } catch {
      }
  }
  return null;
}
function lh(e) {
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
function Zn(e) {
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
function ih(e) {
  var n = $c(e) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), r = "" + e[n];
  if (!e.hasOwnProperty(n) && typeof t < "u" && typeof t.get == "function" && typeof t.set == "function") {
    var l = t.get, i = t.set;
    return Object.defineProperty(e, n, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      r = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, n, { enumerable: t.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[n];
    } };
  }
}
function ll(e) {
  e._valueTracker || (e._valueTracker = ih(e));
}
function Wc(e) {
  if (!e) return !1;
  var n = e._valueTracker;
  if (!n) return !0;
  var t = n.getValue(), r = "";
  return e && (r = $c(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== t ? (n.setValue(e), !0) : !1;
}
function Ml(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function vo(e, n) {
  var t = n.checked;
  return ue({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: t ?? e._wrapperState.initialChecked });
}
function Da(e, n) {
  var t = n.defaultValue == null ? "" : n.defaultValue, r = n.checked != null ? n.checked : n.defaultChecked;
  t = Zn(n.value != null ? n.value : t), e._wrapperState = { initialChecked: r, initialValue: t, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
}
function Qc(e, n) {
  n = n.checked, n != null && wu(e, "checked", n, !1);
}
function ko(e, n) {
  Qc(e, n);
  var t = Zn(n.value), r = n.type;
  if (t != null) r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  n.hasOwnProperty("value") ? wo(e, n.type, t) : n.hasOwnProperty("defaultValue") && wo(e, n.type, Zn(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
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
  (n !== "number" || Ml(e.ownerDocument) !== e) && (t == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
}
var gr = Array.isArray;
function Ft(e, n, t, r) {
  if (e = e.options, n) {
    n = {};
    for (var l = 0; l < t.length; l++) n["$" + t[l]] = !0;
    for (t = 0; t < e.length; t++) l = n.hasOwnProperty("$" + e[t].value), e[t].selected !== l && (e[t].selected = l), l && r && (e[t].defaultSelected = !0);
  } else {
    for (t = "" + Zn(t), n = null, l = 0; l < e.length; l++) {
      if (e[l].value === t) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      n !== null || e[l].disabled || (n = e[l]);
    }
    n !== null && (n.selected = !0);
  }
}
function xo(e, n) {
  if (n.dangerouslySetInnerHTML != null) throw Error(P(91));
  return ue({}, n, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
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
  e._wrapperState = { initialValue: Zn(t) };
}
function Kc(e, n) {
  var t = Zn(n.value), r = Zn(n.defaultValue);
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
var il, Xc = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, t, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(n, t, r, l);
    });
  } : e;
}(function(e, n) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n;
  else {
    for (il = il || document.createElement("div"), il.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = il.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
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
    var r = t.indexOf("--") === 0, l = qc(t, n[t], r);
    t === "float" && (t = "cssFloat"), r ? e.setProperty(t, l) : e[t] = l;
  }
}
var uh = ue({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
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
var _o = null, jt = null, Bt = null;
function ja(e) {
  if (e = Zr(e)) {
    if (typeof _o != "function") throw Error(P(280));
    var n = e.stateNode;
    n && (n = di(n), _o(e.stateNode, e.type, n));
  }
}
function Zc(e) {
  jt ? Bt ? Bt.push(e) : Bt = [e] : jt = e;
}
function Jc() {
  if (jt) {
    var e = jt, n = Bt;
    if (Bt = jt = null, ja(e), n) for (e = 0; e < n.length; e++) ja(n[e]);
  }
}
function bc(e, n) {
  return e(n);
}
function ef() {
}
var Oi = !1;
function nf(e, n, t) {
  if (Oi) return e(n, t);
  Oi = !0;
  try {
    return bc(e, n, t);
  } finally {
    Oi = !1, (jt !== null || Bt !== null) && (ef(), Jc());
  }
}
function Or(e, n) {
  var t = e.stateNode;
  if (t === null) return null;
  var r = di(t);
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
if (zn) try {
  var or = {};
  Object.defineProperty(or, "passive", { get: function() {
    To = !0;
  } }), window.addEventListener("test", or, or), window.removeEventListener("test", or, or);
} catch {
  To = !1;
}
function ah(e, n, t, r, l, i, o, u, a) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    n.apply(t, s);
  } catch (c) {
    this.onError(c);
  }
}
var wr = !1, Fl = null, jl = !1, zo = null, sh = { onError: function(e) {
  wr = !0, Fl = e;
} };
function ch(e, n, t, r, l, i, o, u, a) {
  wr = !1, Fl = null, ah.apply(sh, arguments);
}
function fh(e, n, t, r, l, i, o, u, a) {
  if (ch.apply(this, arguments), wr) {
    if (wr) {
      var s = Fl;
      wr = !1, Fl = null;
    } else throw Error(P(198));
    jl || (jl = !0, zo = s);
  }
}
function vt(e) {
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
  if (vt(e) !== e) throw Error(P(188));
}
function ph(e) {
  var n = e.alternate;
  if (!n) {
    if (n = vt(e), n === null) throw Error(P(188));
    return n !== e ? null : e;
  }
  for (var t = e, r = n; ; ) {
    var l = t.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        t = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === t) return Ba(l), e;
        if (i === r) return Ba(l), n;
        i = i.sibling;
      }
      throw Error(P(188));
    }
    if (t.return !== r.return) t = l, r = i;
    else {
      for (var o = !1, u = l.child; u; ) {
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
      if (!o) {
        for (u = i.child; u; ) {
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
var of = Qe.unstable_scheduleCallback, Ua = Qe.unstable_cancelCallback, dh = Qe.unstable_shouldYield, hh = Qe.unstable_requestPaint, ce = Qe.unstable_now, mh = Qe.unstable_getCurrentPriorityLevel, Pu = Qe.unstable_ImmediatePriority, uf = Qe.unstable_UserBlockingPriority, Bl = Qe.unstable_NormalPriority, gh = Qe.unstable_LowPriority, af = Qe.unstable_IdlePriority, si = null, vn = null;
function yh(e) {
  if (vn && typeof vn.onCommitFiberRoot == "function") try {
    vn.onCommitFiberRoot(si, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var sn = Math.clz32 ? Math.clz32 : wh, vh = Math.log, kh = Math.LN2;
function wh(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (vh(e) / kh | 0) | 0;
}
var ol = 64, ul = 4194304;
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
function Ul(e, n) {
  var t = e.pendingLanes;
  if (t === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = t & 268435455;
  if (o !== 0) {
    var u = o & ~l;
    u !== 0 ? r = yr(u) : (i &= o, i !== 0 && (r = yr(i)));
  } else o = t & ~l, o !== 0 ? r = yr(o) : i !== 0 && (r = yr(i));
  if (r === 0) return 0;
  if (n !== 0 && n !== r && !(n & l) && (l = r & -r, i = n & -n, l >= i || l === 16 && (i & 4194240) !== 0)) return n;
  if (r & 4 && (r |= t & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= r; 0 < n; ) t = 31 - sn(n), l = 1 << t, r |= e[t], n &= ~l;
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
  for (var t = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - sn(i), u = 1 << o, a = l[o];
    a === -1 ? (!(u & t) || u & r) && (l[o] = xh(u, n)) : a <= n && (e.expiredLanes |= u), i &= ~u;
  }
}
function Io(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function sf() {
  var e = ol;
  return ol <<= 1, !(ol & 4194240) && (ol = 64), e;
}
function Ri(e) {
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
    var l = 31 - sn(t), i = 1 << l;
    n[l] = 0, r[l] = -1, e[l] = -1, t &= ~i;
  }
}
function _u(e, n) {
  var t = e.entangledLanes |= n;
  for (e = e.entanglements; t; ) {
    var r = 31 - sn(t), l = 1 << r;
    l & n | e[r] & n && (e[r] |= n), t &= ~l;
  }
}
var X = 0;
function cf(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var ff, Tu, pf, df, hf, No = !1, al = [], $n = null, Wn = null, Qn = null, Rr = /* @__PURE__ */ new Map(), Dr = /* @__PURE__ */ new Map(), Bn = [], Ch = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Va(e, n) {
  switch (e) {
    case "focusin":
    case "focusout":
      $n = null;
      break;
    case "dragenter":
    case "dragleave":
      Wn = null;
      break;
    case "mouseover":
    case "mouseout":
      Qn = null;
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
function ur(e, n, t, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: n, domEventName: t, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, n !== null && (n = Zr(n), n !== null && Tu(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, l !== null && n.indexOf(l) === -1 && n.push(l), e);
}
function Ph(e, n, t, r, l) {
  switch (n) {
    case "focusin":
      return $n = ur($n, e, n, t, r, l), !0;
    case "dragenter":
      return Wn = ur(Wn, e, n, t, r, l), !0;
    case "mouseover":
      return Qn = ur(Qn, e, n, t, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Rr.set(i, ur(Rr.get(i) || null, e, n, t, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Dr.set(i, ur(Dr.get(i) || null, e, n, t, r, l)), !0;
  }
  return !1;
}
function mf(e) {
  var n = ut(e.target);
  if (n !== null) {
    var t = vt(n);
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
function Cl(e) {
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
  Cl(e) && t.delete(n);
}
function _h() {
  No = !1, $n !== null && Cl($n) && ($n = null), Wn !== null && Cl(Wn) && (Wn = null), Qn !== null && Cl(Qn) && (Qn = null), Rr.forEach(Ha), Dr.forEach(Ha);
}
function ar(e, n) {
  e.blockedOn === n && (e.blockedOn = null, No || (No = !0, Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority, _h)));
}
function Ar(e) {
  function n(l) {
    return ar(l, e);
  }
  if (0 < al.length) {
    ar(al[0], e);
    for (var t = 1; t < al.length; t++) {
      var r = al[t];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for ($n !== null && ar($n, e), Wn !== null && ar(Wn, e), Qn !== null && ar(Qn, e), Rr.forEach(n), Dr.forEach(n), t = 0; t < Bn.length; t++) r = Bn[t], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Bn.length && (t = Bn[0], t.blockedOn === null); ) mf(t), t.blockedOn === null && Bn.shift();
}
var Ut = On.ReactCurrentBatchConfig, Vl = !0;
function Th(e, n, t, r) {
  var l = X, i = Ut.transition;
  Ut.transition = null;
  try {
    X = 1, zu(e, n, t, r);
  } finally {
    X = l, Ut.transition = i;
  }
}
function zh(e, n, t, r) {
  var l = X, i = Ut.transition;
  Ut.transition = null;
  try {
    X = 4, zu(e, n, t, r);
  } finally {
    X = l, Ut.transition = i;
  }
}
function zu(e, n, t, r) {
  if (Vl) {
    var l = Lo(e, n, t, r);
    if (l === null) $i(e, n, r, Hl, t), Va(e, r);
    else if (Ph(l, e, n, t, r)) r.stopPropagation();
    else if (Va(e, r), n & 4 && -1 < Ch.indexOf(e)) {
      for (; l !== null; ) {
        var i = Zr(l);
        if (i !== null && ff(i), i = Lo(e, n, t, r), i === null && $i(e, n, r, Hl, t), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else $i(e, n, r, null, t);
  }
}
var Hl = null;
function Lo(e, n, t, r) {
  if (Hl = null, e = Cu(r), e = ut(e), e !== null) if (n = vt(e), n === null) e = null;
  else if (t = n.tag, t === 13) {
    if (e = tf(n), e !== null) return e;
    e = null;
  } else if (t === 3) {
    if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
    e = null;
  } else n !== e && (e = null);
  return Hl = e, null;
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
        case Bl:
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
var Vn = null, Iu = null, Pl = null;
function yf() {
  if (Pl) return Pl;
  var e, n = Iu, t = n.length, r, l = "value" in Vn ? Vn.value : Vn.textContent, i = l.length;
  for (e = 0; e < t && n[e] === l[e]; e++) ;
  var o = t - e;
  for (r = 1; r <= o && n[t - r] === l[i - r]; r++) ;
  return Pl = l.slice(e, 1 < r ? 1 - r : void 0);
}
function _l(e) {
  var n = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function sl() {
  return !0;
}
function $a() {
  return !1;
}
function Ye(e) {
  function n(t, r, l, i, o) {
    this._reactName = t, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (t = e[u], this[u] = t ? t(i) : i[u]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? sl : $a, this.isPropagationStopped = $a, this;
  }
  return ue(n.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var t = this.nativeEvent;
    t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = sl);
  }, stopPropagation: function() {
    var t = this.nativeEvent;
    t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = sl);
  }, persist: function() {
  }, isPersistent: sl }), n;
}
var bt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Nu = Ye(bt), Gr = ue({}, bt, { view: 0, detail: 0 }), Ih = Ye(Gr), Di, Ai, sr, ci = ue({}, Gr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Lu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== sr && (sr && e.type === "mousemove" ? (Di = e.screenX - sr.screenX, Ai = e.screenY - sr.screenY) : Ai = Di = 0, sr = e), Di);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ai;
} }), Wa = Ye(ci), Nh = ue({}, ci, { dataTransfer: 0 }), Lh = Ye(Nh), Oh = ue({}, Gr, { relatedTarget: 0 }), Mi = Ye(Oh), Rh = ue({}, bt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Dh = Ye(Rh), Ah = ue({}, bt, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Mh = Ye(Ah), Fh = ue({}, bt, { data: 0 }), Qa = Ye(Fh), jh = {
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
var Hh = ue({}, Gr, { key: function(e) {
  if (e.key) {
    var n = jh[e.key] || e.key;
    if (n !== "Unidentified") return n;
  }
  return e.type === "keypress" ? (e = _l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Bh[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Lu, charCode: function(e) {
  return e.type === "keypress" ? _l(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), $h = Ye(Hh), Wh = ue({}, ci, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ka = Ye(Wh), Qh = ue({}, Gr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Lu }), Kh = Ye(Qh), Yh = ue({}, bt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xh = Ye(Yh), qh = ue({}, ci, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gh = Ye(qh), Zh = [9, 13, 27, 32], Ou = zn && "CompositionEvent" in window, xr = null;
zn && "documentMode" in document && (xr = document.documentMode);
var Jh = zn && "TextEvent" in window && !xr, vf = zn && (!Ou || xr && 8 < xr && 11 >= xr), Ya = " ", Xa = !1;
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
var Tt = !1;
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
  if (Tt) return e === "compositionend" || !Ou && kf(e, n) ? (e = yf(), Pl = Iu = Vn = null, Tt = !1, e) : null;
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
  Zc(r), n = $l(n, "onChange"), 0 < n.length && (t = new Nu("onChange", "change", null, t, r), e.push({ event: t, listeners: n }));
}
var Sr = null, Mr = null;
function tm(e) {
  Of(e, 0);
}
function fi(e) {
  var n = Nt(e);
  if (Wc(n)) return e;
}
function rm(e, n) {
  if (e === "change") return n;
}
var Sf = !1;
if (zn) {
  var Fi;
  if (zn) {
    var ji = "oninput" in document;
    if (!ji) {
      var Ga = document.createElement("div");
      Ga.setAttribute("oninput", "return;"), ji = typeof Ga.oninput == "function";
    }
    Fi = ji;
  } else Fi = !1;
  Sf = Fi && (!document.documentMode || 9 < document.documentMode);
}
function Za() {
  Sr && (Sr.detachEvent("onpropertychange", Ef), Mr = Sr = null);
}
function Ef(e) {
  if (e.propertyName === "value" && fi(Mr)) {
    var n = [];
    xf(n, Mr, e, Cu(e)), nf(tm, n);
  }
}
function lm(e, n, t) {
  e === "focusin" ? (Za(), Sr = n, Mr = t, Sr.attachEvent("onpropertychange", Ef)) : e === "focusout" && Za();
}
function im(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return fi(Mr);
}
function om(e, n) {
  if (e === "click") return fi(n);
}
function um(e, n) {
  if (e === "input" || e === "change") return fi(n);
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
    var l = t[r];
    if (!po.call(n, l) || !fn(e[l], n[l])) return !1;
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
  for (var e = window, n = Ml(); n instanceof e.HTMLIFrameElement; ) {
    try {
      var t = typeof n.contentWindow.location.href == "string";
    } catch {
      t = !1;
    }
    if (t) e = n.contentWindow;
    else break;
    n = Ml(e.document);
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
        var l = t.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = ba(t, i);
        var o = ba(
          t,
          r
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (n = n.createRange(), n.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(n), e.extend(o.node, o.offset)) : (n.setEnd(o.node, o.offset), e.addRange(n)));
      }
    }
    for (n = [], e = t; e = e.parentNode; ) e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof t.focus == "function" && t.focus(), t = 0; t < n.length; t++) e = n[t], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var cm = zn && "documentMode" in document && 11 >= document.documentMode, zt = null, Oo = null, Er = null, Ro = !1;
function es(e, n, t) {
  var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
  Ro || zt == null || zt !== Ml(r) || (r = zt, "selectionStart" in r && Ru(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Er && Fr(Er, r) || (Er = r, r = $l(Oo, "onSelect"), 0 < r.length && (n = new Nu("onSelect", "select", null, n, t), e.push({ event: n, listeners: r }), n.target = zt)));
}
function cl(e, n) {
  var t = {};
  return t[e.toLowerCase()] = n.toLowerCase(), t["Webkit" + e] = "webkit" + n, t["Moz" + e] = "moz" + n, t;
}
var It = { animationend: cl("Animation", "AnimationEnd"), animationiteration: cl("Animation", "AnimationIteration"), animationstart: cl("Animation", "AnimationStart"), transitionend: cl("Transition", "TransitionEnd") }, Bi = {}, _f = {};
zn && (_f = document.createElement("div").style, "AnimationEvent" in window || (delete It.animationend.animation, delete It.animationiteration.animation, delete It.animationstart.animation), "TransitionEvent" in window || delete It.transitionend.transition);
function pi(e) {
  if (Bi[e]) return Bi[e];
  if (!It[e]) return e;
  var n = It[e], t;
  for (t in n) if (n.hasOwnProperty(t) && t in _f) return Bi[e] = n[t];
  return e;
}
var Tf = pi("animationend"), zf = pi("animationiteration"), If = pi("animationstart"), Nf = pi("transitionend"), Lf = /* @__PURE__ */ new Map(), ns = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function bn(e, n) {
  Lf.set(e, n), yt(n, [e]);
}
for (var Ui = 0; Ui < ns.length; Ui++) {
  var Vi = ns[Ui], fm = Vi.toLowerCase(), pm = Vi[0].toUpperCase() + Vi.slice(1);
  bn(fm, "on" + pm);
}
bn(Tf, "onAnimationEnd");
bn(zf, "onAnimationIteration");
bn(If, "onAnimationStart");
bn("dblclick", "onDoubleClick");
bn("focusin", "onFocus");
bn("focusout", "onBlur");
bn(Nf, "onTransitionEnd");
Qt("onMouseEnter", ["mouseout", "mouseover"]);
Qt("onMouseLeave", ["mouseout", "mouseover"]);
Qt("onPointerEnter", ["pointerout", "pointerover"]);
Qt("onPointerLeave", ["pointerout", "pointerover"]);
yt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
yt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
yt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
yt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
yt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
yt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var vr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), dm = new Set("cancel close invalid load scroll toggle".split(" ").concat(vr));
function ts(e, n, t) {
  var r = e.type || "unknown-event";
  e.currentTarget = t, fh(r, n, void 0, e), e.currentTarget = null;
}
function Of(e, n) {
  n = (n & 4) !== 0;
  for (var t = 0; t < e.length; t++) {
    var r = e[t], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (n) for (var o = r.length - 1; 0 <= o; o--) {
        var u = r[o], a = u.instance, s = u.currentTarget;
        if (u = u.listener, a !== i && l.isPropagationStopped()) break e;
        ts(l, u, s), i = a;
      }
      else for (o = 0; o < r.length; o++) {
        if (u = r[o], a = u.instance, s = u.currentTarget, u = u.listener, a !== i && l.isPropagationStopped()) break e;
        ts(l, u, s), i = a;
      }
    }
  }
  if (jl) throw e = zo, jl = !1, zo = null, e;
}
function ne(e, n) {
  var t = n[jo];
  t === void 0 && (t = n[jo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  t.has(r) || (Rf(n, e, 2, !1), t.add(r));
}
function Hi(e, n, t) {
  var r = 0;
  n && (r |= 4), Rf(t, e, r, n);
}
var fl = "_reactListening" + Math.random().toString(36).slice(2);
function jr(e) {
  if (!e[fl]) {
    e[fl] = !0, Bc.forEach(function(t) {
      t !== "selectionchange" && (dm.has(t) || Hi(t, !1, e), Hi(t, !0, e));
    });
    var n = e.nodeType === 9 ? e : e.ownerDocument;
    n === null || n[fl] || (n[fl] = !0, Hi("selectionchange", !1, n));
  }
}
function Rf(e, n, t, r) {
  switch (gf(n)) {
    case 1:
      var l = Th;
      break;
    case 4:
      l = zh;
      break;
    default:
      l = zu;
  }
  t = l.bind(null, n, t, e), l = void 0, !To || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(n, t, { capture: !0, passive: l }) : e.addEventListener(n, t, !0) : l !== void 0 ? e.addEventListener(n, t, { passive: l }) : e.addEventListener(n, t, !1);
}
function $i(e, n, t, r, l) {
  var i = r;
  if (!(n & 1) && !(n & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var u = r.stateNode.containerInfo;
      if (u === l || u.nodeType === 8 && u.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var a = o.tag;
        if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === l || a.nodeType === 8 && a.parentNode === l)) return;
        o = o.return;
      }
      for (; u !== null; ) {
        if (o = ut(u), o === null) return;
        if (a = o.tag, a === 5 || a === 6) {
          r = i = o;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  nf(function() {
    var s = i, c = Cu(t), f = [];
    e: {
      var d = Lf.get(e);
      if (d !== void 0) {
        var p = Nu, k = e;
        switch (e) {
          case "keypress":
            if (_l(t) === 0) break e;
          case "keydown":
          case "keyup":
            p = $h;
            break;
          case "focusin":
            k = "focus", p = Mi;
            break;
          case "focusout":
            k = "blur", p = Mi;
            break;
          case "beforeblur":
          case "afterblur":
            p = Mi;
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
          case zf:
          case If:
            p = Dh;
            break;
          case Nf:
            p = Xh;
            break;
          case "scroll":
            p = Ih;
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
        var w = (n & 4) !== 0, z = !w && e === "scroll", h = w ? d !== null ? d + "Capture" : null : d;
        w = [];
        for (var m = s, y; m !== null; ) {
          y = m;
          var S = y.stateNode;
          if (y.tag === 5 && S !== null && (y = S, h !== null && (S = Or(m, h), S != null && w.push(Br(m, S, y)))), z) break;
          m = m.return;
        }
        0 < w.length && (d = new p(d, k, null, t, c), f.push({ event: d, listeners: w }));
      }
    }
    if (!(n & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", d && t !== Po && (k = t.relatedTarget || t.fromElement) && (ut(k) || k[In])) break e;
        if ((p || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, p ? (k = t.relatedTarget || t.toElement, p = s, k = k ? ut(k) : null, k !== null && (z = vt(k), k !== z || k.tag !== 5 && k.tag !== 6) && (k = null)) : (p = null, k = s), p !== k)) {
          if (w = Wa, S = "onMouseLeave", h = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (w = Ka, S = "onPointerLeave", h = "onPointerEnter", m = "pointer"), z = p == null ? d : Nt(p), y = k == null ? d : Nt(k), d = new w(S, m + "leave", p, t, c), d.target = z, d.relatedTarget = y, S = null, ut(c) === s && (w = new w(h, m + "enter", k, t, c), w.target = y, w.relatedTarget = z, S = w), z = S, p && k) n: {
            for (w = p, h = k, m = 0, y = w; y; y = Et(y)) m++;
            for (y = 0, S = h; S; S = Et(S)) y++;
            for (; 0 < m - y; ) w = Et(w), m--;
            for (; 0 < y - m; ) h = Et(h), y--;
            for (; m--; ) {
              if (w === h || h !== null && w === h.alternate) break n;
              w = Et(w), h = Et(h);
            }
            w = null;
          }
          else w = null;
          p !== null && rs(f, d, p, w, !1), k !== null && z !== null && rs(f, z, k, w, !0);
        }
      }
      e: {
        if (d = s ? Nt(s) : window, p = d.nodeName && d.nodeName.toLowerCase(), p === "select" || p === "input" && d.type === "file") var C = rm;
        else if (qa(d)) if (Sf) C = um;
        else {
          C = im;
          var x = lm;
        }
        else (p = d.nodeName) && p.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (C = om);
        if (C && (C = C(e, s))) {
          xf(f, C, t, c);
          break e;
        }
        x && x(e, d, s), e === "focusout" && (x = d._wrapperState) && x.controlled && d.type === "number" && wo(d, "number", d.value);
      }
      switch (x = s ? Nt(s) : window, e) {
        case "focusin":
          (qa(x) || x.contentEditable === "true") && (zt = x, Oo = s, Er = null);
          break;
        case "focusout":
          Er = Oo = zt = null;
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
      else Tt ? kf(e, t) && (L = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (L = "onCompositionStart");
      L && (vf && t.locale !== "ko" && (Tt || L !== "onCompositionStart" ? L === "onCompositionEnd" && Tt && (T = yf()) : (Vn = c, Iu = "value" in Vn ? Vn.value : Vn.textContent, Tt = !0)), x = $l(s, L), 0 < x.length && (L = new Qa(L, e, null, t, c), f.push({ event: L, listeners: x }), T ? L.data = T : (T = wf(t), T !== null && (L.data = T)))), (T = Jh ? bh(e, t) : em(e, t)) && (s = $l(s, "onBeforeInput"), 0 < s.length && (c = new Qa("onBeforeInput", "beforeinput", null, t, c), f.push({ event: c, listeners: s }), c.data = T));
    }
    Of(f, n);
  });
}
function Br(e, n, t) {
  return { instance: e, listener: n, currentTarget: t };
}
function $l(e, n) {
  for (var t = n + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Or(e, t), i != null && r.unshift(Br(e, i, l)), i = Or(e, n), i != null && r.push(Br(e, i, l))), e = e.return;
  }
  return r;
}
function Et(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function rs(e, n, t, r, l) {
  for (var i = n._reactName, o = []; t !== null && t !== r; ) {
    var u = t, a = u.alternate, s = u.stateNode;
    if (a !== null && a === r) break;
    u.tag === 5 && s !== null && (u = s, l ? (a = Or(t, i), a != null && o.unshift(Br(t, a, u))) : l || (a = Or(t, i), a != null && o.push(Br(t, a, u)))), t = t.return;
  }
  o.length !== 0 && e.push({ event: n, listeners: o });
}
var hm = /\r\n?/g, mm = /\u0000|\uFFFD/g;
function ls(e) {
  return (typeof e == "string" ? e : "" + e).replace(hm, `
`).replace(mm, "");
}
function pl(e, n, t) {
  if (n = ls(n), ls(e) !== n && t) throw Error(P(425));
}
function Wl() {
}
var Do = null, Ao = null;
function Mo(e, n) {
  return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
}
var Fo = typeof setTimeout == "function" ? setTimeout : void 0, gm = typeof clearTimeout == "function" ? clearTimeout : void 0, is = typeof Promise == "function" ? Promise : void 0, ym = typeof queueMicrotask == "function" ? queueMicrotask : typeof is < "u" ? function(e) {
  return is.resolve(null).then(e).catch(vm);
} : Fo;
function vm(e) {
  setTimeout(function() {
    throw e;
  });
}
function Wi(e, n) {
  var t = n, r = 0;
  do {
    var l = t.nextSibling;
    if (e.removeChild(t), l && l.nodeType === 8) if (t = l.data, t === "/$") {
      if (r === 0) {
        e.removeChild(l), Ar(n);
        return;
      }
      r--;
    } else t !== "$" && t !== "$?" && t !== "$!" || r++;
    t = l;
  } while (t);
  Ar(n);
}
function Kn(e) {
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
var er = Math.random().toString(36).slice(2), gn = "__reactFiber$" + er, Ur = "__reactProps$" + er, In = "__reactContainer$" + er, jo = "__reactEvents$" + er, km = "__reactListeners$" + er, wm = "__reactHandles$" + er;
function ut(e) {
  var n = e[gn];
  if (n) return n;
  for (var t = e.parentNode; t; ) {
    if (n = t[In] || t[gn]) {
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
  return e = e[gn] || e[In], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Nt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(P(33));
}
function di(e) {
  return e[Ur] || null;
}
var Bo = [], Lt = -1;
function et(e) {
  return { current: e };
}
function te(e) {
  0 > Lt || (e.current = Bo[Lt], Bo[Lt] = null, Lt--);
}
function J(e, n) {
  Lt++, Bo[Lt] = e.current, e.current = n;
}
var Jn = {}, _e = et(Jn), Ae = et(!1), pt = Jn;
function Kt(e, n) {
  var t = e.type.contextTypes;
  if (!t) return Jn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in t) l[i] = n[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Me(e) {
  return e = e.childContextTypes, e != null;
}
function Ql() {
  te(Ae), te(_e);
}
function us(e, n, t) {
  if (_e.current !== Jn) throw Error(P(168));
  J(_e, n), J(Ae, t);
}
function Df(e, n, t) {
  var r = e.stateNode;
  if (n = n.childContextTypes, typeof r.getChildContext != "function") return t;
  r = r.getChildContext();
  for (var l in r) if (!(l in n)) throw Error(P(108, lh(e) || "Unknown", l));
  return ue({}, t, r);
}
function Kl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Jn, pt = _e.current, J(_e, e), J(Ae, Ae.current), !0;
}
function as(e, n, t) {
  var r = e.stateNode;
  if (!r) throw Error(P(169));
  t ? (e = Df(e, n, pt), r.__reactInternalMemoizedMergedChildContext = e, te(Ae), te(_e), J(_e, e)) : te(Ae), J(Ae, t);
}
var Cn = null, hi = !1, Qi = !1;
function Af(e) {
  Cn === null ? Cn = [e] : Cn.push(e);
}
function xm(e) {
  hi = !0, Af(e);
}
function nt() {
  if (!Qi && Cn !== null) {
    Qi = !0;
    var e = 0, n = X;
    try {
      var t = Cn;
      for (X = 1; e < t.length; e++) {
        var r = t[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Cn = null, hi = !1;
    } catch (l) {
      throw Cn !== null && (Cn = Cn.slice(e + 1)), of(Pu, nt), l;
    } finally {
      X = n, Qi = !1;
    }
  }
  return null;
}
var Ot = [], Rt = 0, Yl = null, Xl = 0, Xe = [], qe = 0, dt = null, Pn = 1, _n = "";
function lt(e, n) {
  Ot[Rt++] = Xl, Ot[Rt++] = Yl, Yl = e, Xl = n;
}
function Mf(e, n, t) {
  Xe[qe++] = Pn, Xe[qe++] = _n, Xe[qe++] = dt, dt = e;
  var r = Pn;
  e = _n;
  var l = 32 - sn(r) - 1;
  r &= ~(1 << l), t += 1;
  var i = 32 - sn(n) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Pn = 1 << 32 - sn(n) + l | t << l | r, _n = i + e;
  } else Pn = 1 << i | t << l | r, _n = e;
}
function Du(e) {
  e.return !== null && (lt(e, 1), Mf(e, 1, 0));
}
function Au(e) {
  for (; e === Yl; ) Yl = Ot[--Rt], Ot[Rt] = null, Xl = Ot[--Rt], Ot[Rt] = null;
  for (; e === dt; ) dt = Xe[--qe], Xe[qe] = null, _n = Xe[--qe], Xe[qe] = null, Pn = Xe[--qe], Xe[qe] = null;
}
var We = null, He = null, re = !1, an = null;
function Ff(e, n) {
  var t = Ze(5, null, null, 0);
  t.elementType = "DELETED", t.stateNode = n, t.return = e, n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t);
}
function ss(e, n) {
  switch (e.tag) {
    case 5:
      var t = e.type;
      return n = n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, We = e, He = Kn(n.firstChild), !0) : !1;
    case 6:
      return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, We = e, He = null, !0) : !1;
    case 13:
      return n = n.nodeType !== 8 ? null : n, n !== null ? (t = dt !== null ? { id: Pn, overflow: _n } : null, e.memoizedState = { dehydrated: n, treeContext: t, retryLane: 1073741824 }, t = Ze(18, null, null, 0), t.stateNode = n, t.return = e, e.child = t, We = e, He = null, !0) : !1;
    default:
      return !1;
  }
}
function Uo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Vo(e) {
  if (re) {
    var n = He;
    if (n) {
      var t = n;
      if (!ss(e, n)) {
        if (Uo(e)) throw Error(P(418));
        n = Kn(t.nextSibling);
        var r = We;
        n && ss(e, n) ? Ff(r, t) : (e.flags = e.flags & -4097 | 2, re = !1, We = e);
      }
    } else {
      if (Uo(e)) throw Error(P(418));
      e.flags = e.flags & -4097 | 2, re = !1, We = e;
    }
  }
}
function cs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  We = e;
}
function dl(e) {
  if (e !== We) return !1;
  if (!re) return cs(e), re = !0, !1;
  var n;
  if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !Mo(e.type, e.memoizedProps)), n && (n = He)) {
    if (Uo(e)) throw jf(), Error(P(418));
    for (; n; ) Ff(e, n), n = Kn(n.nextSibling);
  }
  if (cs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(P(317));
    e: {
      for (e = e.nextSibling, n = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (t === "/$") {
            if (n === 0) {
              He = Kn(e.nextSibling);
              break e;
            }
            n--;
          } else t !== "$" && t !== "$!" && t !== "$?" || n++;
        }
        e = e.nextSibling;
      }
      He = null;
    }
  } else He = We ? Kn(e.stateNode.nextSibling) : null;
  return !0;
}
function jf() {
  for (var e = He; e; ) e = Kn(e.nextSibling);
}
function Yt() {
  He = We = null, re = !1;
}
function Mu(e) {
  an === null ? an = [e] : an.push(e);
}
var Sm = On.ReactCurrentBatchConfig;
function cr(e, n, t) {
  if (e = t.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (t._owner) {
      if (t = t._owner, t) {
        if (t.tag !== 1) throw Error(P(309));
        var r = t.stateNode;
      }
      if (!r) throw Error(P(147, e));
      var l = r, i = "" + e;
      return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === i ? n.ref : (n = function(o) {
        var u = l.refs;
        o === null ? delete u[i] : u[i] = o;
      }, n._stringRef = i, n);
    }
    if (typeof e != "string") throw Error(P(284));
    if (!t._owner) throw Error(P(290, e));
  }
  return e;
}
function hl(e, n) {
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
  function l(h, m) {
    return h = Gn(h, m), h.index = 0, h.sibling = null, h;
  }
  function i(h, m, y) {
    return h.index = y, e ? (y = h.alternate, y !== null ? (y = y.index, y < m ? (h.flags |= 2, m) : y) : (h.flags |= 2, m)) : (h.flags |= 1048576, m);
  }
  function o(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function u(h, m, y, S) {
    return m === null || m.tag !== 6 ? (m = Ji(y, h.mode, S), m.return = h, m) : (m = l(m, y), m.return = h, m);
  }
  function a(h, m, y, S) {
    var C = y.type;
    return C === _t ? c(h, m, y.props.children, S, y.key) : m !== null && (m.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Fn && fs(C) === m.type) ? (S = l(m, y.props), S.ref = cr(h, m, y), S.return = h, S) : (S = Rl(y.type, y.key, y.props, null, h.mode, S), S.ref = cr(h, m, y), S.return = h, S);
  }
  function s(h, m, y, S) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== y.containerInfo || m.stateNode.implementation !== y.implementation ? (m = bi(y, h.mode, S), m.return = h, m) : (m = l(m, y.children || []), m.return = h, m);
  }
  function c(h, m, y, S, C) {
    return m === null || m.tag !== 7 ? (m = ft(y, h.mode, S, C), m.return = h, m) : (m = l(m, y), m.return = h, m);
  }
  function f(h, m, y) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = Ji("" + m, h.mode, y), m.return = h, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case rl:
          return y = Rl(m.type, m.key, m.props, null, h.mode, y), y.ref = cr(h, null, m), y.return = h, y;
        case Pt:
          return m = bi(m, h.mode, y), m.return = h, m;
        case Fn:
          var S = m._init;
          return f(h, S(m._payload), y);
      }
      if (gr(m) || ir(m)) return m = ft(m, h.mode, y, null), m.return = h, m;
      hl(h, m);
    }
    return null;
  }
  function d(h, m, y, S) {
    var C = m !== null ? m.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number") return C !== null ? null : u(h, m, "" + y, S);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case rl:
          return y.key === C ? a(h, m, y, S) : null;
        case Pt:
          return y.key === C ? s(h, m, y, S) : null;
        case Fn:
          return C = y._init, d(
            h,
            m,
            C(y._payload),
            S
          );
      }
      if (gr(y) || ir(y)) return C !== null ? null : c(h, m, y, S, null);
      hl(h, y);
    }
    return null;
  }
  function p(h, m, y, S, C) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return h = h.get(y) || null, u(m, h, "" + S, C);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case rl:
          return h = h.get(S.key === null ? y : S.key) || null, a(m, h, S, C);
        case Pt:
          return h = h.get(S.key === null ? y : S.key) || null, s(m, h, S, C);
        case Fn:
          var x = S._init;
          return p(h, m, y, x(S._payload), C);
      }
      if (gr(S) || ir(S)) return h = h.get(y) || null, c(m, h, S, C, null);
      hl(m, S);
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
      e && T && R.alternate === null && n(h, T), m = i(R, m, L), x === null ? C = R : x.sibling = R, x = R, T = F;
    }
    if (L === y.length) return t(h, T), re && lt(h, L), C;
    if (T === null) {
      for (; L < y.length; L++) T = f(h, y[L], S), T !== null && (m = i(T, m, L), x === null ? C = T : x.sibling = T, x = T);
      return re && lt(h, L), C;
    }
    for (T = r(h, T); L < y.length; L++) F = p(T, h, L, y[L], S), F !== null && (e && F.alternate !== null && T.delete(F.key === null ? L : F.key), m = i(F, m, L), x === null ? C = F : x.sibling = F, x = F);
    return e && T.forEach(function(D) {
      return n(h, D);
    }), re && lt(h, L), C;
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
      e && T && D.alternate === null && n(h, T), m = i(D, m, L), x === null ? C = D : x.sibling = D, x = D, T = F;
    }
    if (R.done) return t(
      h,
      T
    ), re && lt(h, L), C;
    if (T === null) {
      for (; !R.done; L++, R = y.next()) R = f(h, R.value, S), R !== null && (m = i(R, m, L), x === null ? C = R : x.sibling = R, x = R);
      return re && lt(h, L), C;
    }
    for (T = r(h, T); !R.done; L++, R = y.next()) R = p(T, h, L, R.value, S), R !== null && (e && R.alternate !== null && T.delete(R.key === null ? L : R.key), m = i(R, m, L), x === null ? C = R : x.sibling = R, x = R);
    return e && T.forEach(function(A) {
      return n(h, A);
    }), re && lt(h, L), C;
  }
  function z(h, m, y, S) {
    if (typeof y == "object" && y !== null && y.type === _t && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case rl:
          e: {
            for (var C = y.key, x = m; x !== null; ) {
              if (x.key === C) {
                if (C = y.type, C === _t) {
                  if (x.tag === 7) {
                    t(h, x.sibling), m = l(x, y.props.children), m.return = h, h = m;
                    break e;
                  }
                } else if (x.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Fn && fs(C) === x.type) {
                  t(h, x.sibling), m = l(x, y.props), m.ref = cr(h, x, y), m.return = h, h = m;
                  break e;
                }
                t(h, x);
                break;
              } else n(h, x);
              x = x.sibling;
            }
            y.type === _t ? (m = ft(y.props.children, h.mode, S, y.key), m.return = h, h = m) : (S = Rl(y.type, y.key, y.props, null, h.mode, S), S.ref = cr(h, m, y), S.return = h, h = S);
          }
          return o(h);
        case Pt:
          e: {
            for (x = y.key; m !== null; ) {
              if (m.key === x) if (m.tag === 4 && m.stateNode.containerInfo === y.containerInfo && m.stateNode.implementation === y.implementation) {
                t(h, m.sibling), m = l(m, y.children || []), m.return = h, h = m;
                break e;
              } else {
                t(h, m);
                break;
              }
              else n(h, m);
              m = m.sibling;
            }
            m = bi(y, h.mode, S), m.return = h, h = m;
          }
          return o(h);
        case Fn:
          return x = y._init, z(h, m, x(y._payload), S);
      }
      if (gr(y)) return k(h, m, y, S);
      if (ir(y)) return w(h, m, y, S);
      hl(h, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, m !== null && m.tag === 6 ? (t(h, m.sibling), m = l(m, y), m.return = h, h = m) : (t(h, m), m = Ji(y, h.mode, S), m.return = h, h = m), o(h)) : t(h, m);
  }
  return z;
}
var Xt = Bf(!0), Uf = Bf(!1), ql = et(null), Gl = null, Dt = null, Fu = null;
function ju() {
  Fu = Dt = Gl = null;
}
function Bu(e) {
  var n = ql.current;
  te(ql), e._currentValue = n;
}
function Ho(e, n, t) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === t) break;
    e = e.return;
  }
}
function Vt(e, n) {
  Gl = e, Fu = Dt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & n && (De = !0), e.firstContext = null);
}
function be(e) {
  var n = e._currentValue;
  if (Fu !== e) if (e = { context: e, memoizedValue: n, next: null }, Dt === null) {
    if (Gl === null) throw Error(P(308));
    Dt = e, Gl.dependencies = { lanes: 0, firstContext: e };
  } else Dt = Dt.next = e;
  return n;
}
var at = null;
function Uu(e) {
  at === null ? at = [e] : at.push(e);
}
function Vf(e, n, t, r) {
  var l = n.interleaved;
  return l === null ? (t.next = t, Uu(n)) : (t.next = l.next, l.next = t), n.interleaved = t, Nn(e, r);
}
function Nn(e, n) {
  e.lanes |= n;
  var t = e.alternate;
  for (t !== null && (t.lanes |= n), t = e, e = e.return; e !== null; ) e.childLanes |= n, t = e.alternate, t !== null && (t.childLanes |= n), t = e, e = e.return;
  return t.tag === 3 ? t.stateNode : null;
}
var jn = !1;
function Vu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Hf(e, n) {
  e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Tn(e, n) {
  return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
}
function Yn(e, n, t) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, Q & 2) {
    var l = r.pending;
    return l === null ? n.next = n : (n.next = l.next, l.next = n), r.pending = n, Nn(e, t);
  }
  return l = r.interleaved, l === null ? (n.next = n, Uu(r)) : (n.next = l.next, l.next = n), r.interleaved = n, Nn(e, t);
}
function Tl(e, n, t) {
  if (n = n.updateQueue, n !== null && (n = n.shared, (t & 4194240) !== 0)) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, _u(e, t);
  }
}
function ps(e, n) {
  var t = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, t === r)) {
    var l = null, i = null;
    if (t = t.firstBaseUpdate, t !== null) {
      do {
        var o = { eventTime: t.eventTime, lane: t.lane, tag: t.tag, payload: t.payload, callback: t.callback, next: null };
        i === null ? l = i = o : i = i.next = o, t = t.next;
      } while (t !== null);
      i === null ? l = i = n : i = i.next = n;
    } else l = i = n;
    t = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = t;
    return;
  }
  e = t.lastBaseUpdate, e === null ? t.firstBaseUpdate = n : e.next = n, t.lastBaseUpdate = n;
}
function Zl(e, n, t, r) {
  var l = e.updateQueue;
  jn = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var a = u, s = a.next;
    a.next = null, o === null ? i = s : o.next = s, o = a;
    var c = e.alternate;
    c !== null && (c = c.updateQueue, u = c.lastBaseUpdate, u !== o && (u === null ? c.firstBaseUpdate = s : u.next = s, c.lastBaseUpdate = a));
  }
  if (i !== null) {
    var f = l.baseState;
    o = 0, c = s = a = null, u = i;
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
              f = ue({}, f, d);
              break e;
            case 2:
              jn = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, d = l.effects, d === null ? l.effects = [u] : d.push(u));
      } else p = { eventTime: p, lane: d, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, c === null ? (s = c = p, a = f) : c = c.next = p, o |= d;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        d = u, u = d.next, d.next = null, l.lastBaseUpdate = d, l.shared.pending = null;
      }
    } while (!0);
    if (c === null && (a = f), l.baseState = a, l.firstBaseUpdate = s, l.lastBaseUpdate = c, n = l.shared.interleaved, n !== null) {
      l = n;
      do
        o |= l.lane, l = l.next;
      while (l !== n);
    } else i === null && (l.shared.lanes = 0);
    mt |= o, e.lanes = o, e.memoizedState = f;
  }
}
function ds(e, n, t) {
  if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
    var r = e[n], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = t, typeof l != "function") throw Error(P(191, l));
      l.call(r);
    }
  }
}
var Jr = {}, kn = et(Jr), Vr = et(Jr), Hr = et(Jr);
function st(e) {
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
function qt() {
  te(kn), te(Vr), te(Hr);
}
function $f(e) {
  st(Hr.current);
  var n = st(kn.current), t = So(n, e.type);
  n !== t && (J(Vr, e), J(kn, t));
}
function $u(e) {
  Vr.current === e && (te(kn), te(Vr));
}
var ie = et(0);
function Jl(e) {
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
var Ki = [];
function Wu() {
  for (var e = 0; e < Ki.length; e++) Ki[e]._workInProgressVersionPrimary = null;
  Ki.length = 0;
}
var zl = On.ReactCurrentDispatcher, Yi = On.ReactCurrentBatchConfig, ht = 0, oe = null, ge = null, ve = null, bl = !1, Cr = !1, $r = 0, Em = 0;
function Ee() {
  throw Error(P(321));
}
function Qu(e, n) {
  if (n === null) return !1;
  for (var t = 0; t < n.length && t < e.length; t++) if (!fn(e[t], n[t])) return !1;
  return !0;
}
function Ku(e, n, t, r, l, i) {
  if (ht = i, oe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, zl.current = e === null || e.memoizedState === null ? Tm : zm, e = t(r, l), Cr) {
    i = 0;
    do {
      if (Cr = !1, $r = 0, 25 <= i) throw Error(P(301));
      i += 1, ve = ge = null, n.updateQueue = null, zl.current = Im, e = t(r, l);
    } while (Cr);
  }
  if (zl.current = ei, n = ge !== null && ge.next !== null, ht = 0, ve = ge = oe = null, bl = !1, n) throw Error(P(300));
  return e;
}
function Yu() {
  var e = $r !== 0;
  return $r = 0, e;
}
function hn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ve === null ? oe.memoizedState = ve = e : ve = ve.next = e, ve;
}
function en() {
  if (ge === null) {
    var e = oe.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ge.next;
  var n = ve === null ? oe.memoizedState : ve.next;
  if (n !== null) ve = n, ge = e;
  else {
    if (e === null) throw Error(P(310));
    ge = e, e = { memoizedState: ge.memoizedState, baseState: ge.baseState, baseQueue: ge.baseQueue, queue: ge.queue, next: null }, ve === null ? oe.memoizedState = ve = e : ve = ve.next = e;
  }
  return ve;
}
function Wr(e, n) {
  return typeof n == "function" ? n(e) : n;
}
function Xi(e) {
  var n = en(), t = n.queue;
  if (t === null) throw Error(P(311));
  t.lastRenderedReducer = e;
  var r = ge, l = r.baseQueue, i = t.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, t.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var u = o = null, a = null, s = i;
    do {
      var c = s.lane;
      if ((ht & c) === c) a !== null && (a = a.next = { lane: 0, action: s.action, hasEagerState: s.hasEagerState, eagerState: s.eagerState, next: null }), r = s.hasEagerState ? s.eagerState : e(r, s.action);
      else {
        var f = {
          lane: c,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null
        };
        a === null ? (u = a = f, o = r) : a = a.next = f, oe.lanes |= c, mt |= c;
      }
      s = s.next;
    } while (s !== null && s !== i);
    a === null ? o = r : a.next = u, fn(r, n.memoizedState) || (De = !0), n.memoizedState = r, n.baseState = o, n.baseQueue = a, t.lastRenderedState = r;
  }
  if (e = t.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, oe.lanes |= i, mt |= i, l = l.next;
    while (l !== e);
  } else l === null && (t.lanes = 0);
  return [n.memoizedState, t.dispatch];
}
function qi(e) {
  var n = en(), t = n.queue;
  if (t === null) throw Error(P(311));
  t.lastRenderedReducer = e;
  var r = t.dispatch, l = t.pending, i = n.memoizedState;
  if (l !== null) {
    t.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    fn(i, n.memoizedState) || (De = !0), n.memoizedState = i, n.baseQueue === null && (n.baseState = i), t.lastRenderedState = i;
  }
  return [i, r];
}
function Wf() {
}
function Qf(e, n) {
  var t = oe, r = en(), l = n(), i = !fn(r.memoizedState, l);
  if (i && (r.memoizedState = l, De = !0), r = r.queue, Xu(Xf.bind(null, t, r, e), [e]), r.getSnapshot !== n || i || ve !== null && ve.memoizedState.tag & 1) {
    if (t.flags |= 2048, Qr(9, Yf.bind(null, t, r, l, n), void 0, null), ke === null) throw Error(P(349));
    ht & 30 || Kf(t, n, l);
  }
  return l;
}
function Kf(e, n, t) {
  e.flags |= 16384, e = { getSnapshot: n, value: t }, n = oe.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, oe.updateQueue = n, n.stores = [e]) : (t = n.stores, t === null ? n.stores = [e] : t.push(e));
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
  return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Wr, lastRenderedState: e }, n.queue = e, e = e.dispatch = _m.bind(null, oe, e), [n.memoizedState, e];
}
function Qr(e, n, t, r) {
  return e = { tag: e, create: n, destroy: t, deps: r, next: null }, n = oe.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, oe.updateQueue = n, n.lastEffect = e.next = e) : (t = n.lastEffect, t === null ? n.lastEffect = e.next = e : (r = t.next, t.next = e, e.next = r, n.lastEffect = e)), e;
}
function Zf() {
  return en().memoizedState;
}
function Il(e, n, t, r) {
  var l = hn();
  oe.flags |= e, l.memoizedState = Qr(1 | n, t, void 0, r === void 0 ? null : r);
}
function mi(e, n, t, r) {
  var l = en();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ge !== null) {
    var o = ge.memoizedState;
    if (i = o.destroy, r !== null && Qu(r, o.deps)) {
      l.memoizedState = Qr(n, t, i, r);
      return;
    }
  }
  oe.flags |= e, l.memoizedState = Qr(1 | n, t, i, r);
}
function ms(e, n) {
  return Il(8390656, 8, e, n);
}
function Xu(e, n) {
  return mi(2048, 8, e, n);
}
function Jf(e, n) {
  return mi(4, 2, e, n);
}
function bf(e, n) {
  return mi(4, 4, e, n);
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
  return t = t != null ? t.concat([e]) : null, mi(4, 4, ep.bind(null, n, e), t);
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
function lp(e, n, t) {
  return ht & 21 ? (fn(t, n) || (t = sf(), oe.lanes |= t, mt |= t, e.baseState = !0), n) : (e.baseState && (e.baseState = !1, De = !0), e.memoizedState = t);
}
function Cm(e, n) {
  var t = X;
  X = t !== 0 && 4 > t ? t : 4, e(!0);
  var r = Yi.transition;
  Yi.transition = {};
  try {
    e(!1), n();
  } finally {
    X = t, Yi.transition = r;
  }
}
function ip() {
  return en().memoizedState;
}
function Pm(e, n, t) {
  var r = qn(e);
  if (t = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null }, op(e)) up(n, t);
  else if (t = Vf(e, n, t, r), t !== null) {
    var l = Ie();
    cn(t, e, r, l), ap(t, n, r);
  }
}
function _m(e, n, t) {
  var r = qn(e), l = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null };
  if (op(e)) up(n, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = n.lastRenderedReducer, i !== null)) try {
      var o = n.lastRenderedState, u = i(o, t);
      if (l.hasEagerState = !0, l.eagerState = u, fn(u, o)) {
        var a = n.interleaved;
        a === null ? (l.next = l, Uu(n)) : (l.next = a.next, a.next = l), n.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    t = Vf(e, n, l, r), t !== null && (l = Ie(), cn(t, e, r, l), ap(t, n, r));
  }
}
function op(e) {
  var n = e.alternate;
  return e === oe || n !== null && n === oe;
}
function up(e, n) {
  Cr = bl = !0;
  var t = e.pending;
  t === null ? n.next = n : (n.next = t.next, t.next = n), e.pending = n;
}
function ap(e, n, t) {
  if (t & 4194240) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, _u(e, t);
  }
}
var ei = { readContext: be, useCallback: Ee, useContext: Ee, useEffect: Ee, useImperativeHandle: Ee, useInsertionEffect: Ee, useLayoutEffect: Ee, useMemo: Ee, useReducer: Ee, useRef: Ee, useState: Ee, useDebugValue: Ee, useDeferredValue: Ee, useTransition: Ee, useMutableSource: Ee, useSyncExternalStore: Ee, useId: Ee, unstable_isNewReconciler: !1 }, Tm = { readContext: be, useCallback: function(e, n) {
  return hn().memoizedState = [e, n === void 0 ? null : n], e;
}, useContext: be, useEffect: ms, useImperativeHandle: function(e, n, t) {
  return t = t != null ? t.concat([e]) : null, Il(
    4194308,
    4,
    ep.bind(null, n, e),
    t
  );
}, useLayoutEffect: function(e, n) {
  return Il(4194308, 4, e, n);
}, useInsertionEffect: function(e, n) {
  return Il(4, 2, e, n);
}, useMemo: function(e, n) {
  var t = hn();
  return n = n === void 0 ? null : n, e = e(), t.memoizedState = [e, n], e;
}, useReducer: function(e, n, t) {
  var r = hn();
  return n = t !== void 0 ? t(n) : n, r.memoizedState = r.baseState = n, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: n }, r.queue = e, e = e.dispatch = Pm.bind(null, oe, e), [r.memoizedState, e];
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
  var r = oe, l = hn();
  if (re) {
    if (t === void 0) throw Error(P(407));
    t = t();
  } else {
    if (t = n(), ke === null) throw Error(P(349));
    ht & 30 || Kf(r, n, t);
  }
  l.memoizedState = t;
  var i = { value: t, getSnapshot: n };
  return l.queue = i, ms(Xf.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, Qr(9, Yf.bind(null, r, i, t, n), void 0, null), t;
}, useId: function() {
  var e = hn(), n = ke.identifierPrefix;
  if (re) {
    var t = _n, r = Pn;
    t = (r & ~(1 << 32 - sn(r) - 1)).toString(32) + t, n = ":" + n + "R" + t, t = $r++, 0 < t && (n += "H" + t.toString(32)), n += ":";
  } else t = Em++, n = ":" + n + "r" + t.toString(32) + ":";
  return e.memoizedState = n;
}, unstable_isNewReconciler: !1 }, zm = {
  readContext: be,
  useCallback: tp,
  useContext: be,
  useEffect: Xu,
  useImperativeHandle: np,
  useInsertionEffect: Jf,
  useLayoutEffect: bf,
  useMemo: rp,
  useReducer: Xi,
  useRef: Zf,
  useState: function() {
    return Xi(Wr);
  },
  useDebugValue: qu,
  useDeferredValue: function(e) {
    var n = en();
    return lp(n, ge.memoizedState, e);
  },
  useTransition: function() {
    var e = Xi(Wr)[0], n = en().memoizedState;
    return [e, n];
  },
  useMutableSource: Wf,
  useSyncExternalStore: Qf,
  useId: ip,
  unstable_isNewReconciler: !1
}, Im = { readContext: be, useCallback: tp, useContext: be, useEffect: Xu, useImperativeHandle: np, useInsertionEffect: Jf, useLayoutEffect: bf, useMemo: rp, useReducer: qi, useRef: Zf, useState: function() {
  return qi(Wr);
}, useDebugValue: qu, useDeferredValue: function(e) {
  var n = en();
  return ge === null ? n.memoizedState = e : lp(n, ge.memoizedState, e);
}, useTransition: function() {
  var e = qi(Wr)[0], n = en().memoizedState;
  return [e, n];
}, useMutableSource: Wf, useSyncExternalStore: Qf, useId: ip, unstable_isNewReconciler: !1 };
function on(e, n) {
  if (e && e.defaultProps) {
    n = ue({}, n), e = e.defaultProps;
    for (var t in e) n[t] === void 0 && (n[t] = e[t]);
    return n;
  }
  return n;
}
function $o(e, n, t, r) {
  n = e.memoizedState, t = t(r, n), t = t == null ? n : ue({}, n, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t);
}
var gi = { isMounted: function(e) {
  return (e = e._reactInternals) ? vt(e) === e : !1;
}, enqueueSetState: function(e, n, t) {
  e = e._reactInternals;
  var r = Ie(), l = qn(e), i = Tn(r, l);
  i.payload = n, t != null && (i.callback = t), n = Yn(e, i, l), n !== null && (cn(n, e, l, r), Tl(n, e, l));
}, enqueueReplaceState: function(e, n, t) {
  e = e._reactInternals;
  var r = Ie(), l = qn(e), i = Tn(r, l);
  i.tag = 1, i.payload = n, t != null && (i.callback = t), n = Yn(e, i, l), n !== null && (cn(n, e, l, r), Tl(n, e, l));
}, enqueueForceUpdate: function(e, n) {
  e = e._reactInternals;
  var t = Ie(), r = qn(e), l = Tn(t, r);
  l.tag = 2, n != null && (l.callback = n), n = Yn(e, l, r), n !== null && (cn(n, e, r, t), Tl(n, e, r));
} };
function gs(e, n, t, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : n.prototype && n.prototype.isPureReactComponent ? !Fr(t, r) || !Fr(l, i) : !0;
}
function sp(e, n, t) {
  var r = !1, l = Jn, i = n.contextType;
  return typeof i == "object" && i !== null ? i = be(i) : (l = Me(n) ? pt : _e.current, r = n.contextTypes, i = (r = r != null) ? Kt(e, l) : Jn), n = new n(t, i), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = gi, e.stateNode = n, n._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), n;
}
function ys(e, n, t, r) {
  e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(t, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(t, r), n.state !== e && gi.enqueueReplaceState(n, n.state, null);
}
function Wo(e, n, t, r) {
  var l = e.stateNode;
  l.props = t, l.state = e.memoizedState, l.refs = {}, Vu(e);
  var i = n.contextType;
  typeof i == "object" && i !== null ? l.context = be(i) : (i = Me(n) ? pt : _e.current, l.context = Kt(e, i)), l.state = e.memoizedState, i = n.getDerivedStateFromProps, typeof i == "function" && ($o(e, n, i, t), l.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (n = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), n !== l.state && gi.enqueueReplaceState(l, l.state, null), Zl(e, t, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Gt(e, n) {
  try {
    var t = "", r = n;
    do
      t += rh(r), r = r.return;
    while (r);
    var l = t;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: n, stack: l, digest: null };
}
function Gi(e, n, t) {
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
    ti || (ti = !0, nu = r), Qo(e, n);
  }, t;
}
function fp(e, n, t) {
  t = Tn(-1, t), t.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = n.value;
    t.payload = function() {
      return r(l);
    }, t.callback = function() {
      Qo(e, n);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
    Qo(e, n), typeof r != "function" && (Xn === null ? Xn = /* @__PURE__ */ new Set([this]) : Xn.add(this));
    var o = n.stack;
    this.componentDidCatch(n.value, { componentStack: o !== null ? o : "" });
  }), t;
}
function vs(e, n, t) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Nm();
    var l = /* @__PURE__ */ new Set();
    r.set(n, l);
  } else l = r.get(n), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(n, l));
  l.has(t) || (l.add(t), e = Wm.bind(null, e, n, t), n.then(e, e));
}
function ks(e) {
  do {
    var n;
    if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ws(e, n, t, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === n ? e.flags |= 65536 : (e.flags |= 128, t.flags |= 131072, t.flags &= -52805, t.tag === 1 && (t.alternate === null ? t.tag = 17 : (n = Tn(-1, 1), n.tag = 2, Yn(t, n, 1))), t.lanes |= 1), e);
}
var Lm = On.ReactCurrentOwner, De = !1;
function ze(e, n, t, r) {
  n.child = e === null ? Uf(n, null, t, r) : Xt(n, e.child, t, r);
}
function xs(e, n, t, r, l) {
  t = t.render;
  var i = n.ref;
  return Vt(n, l), r = Ku(e, n, t, r, i, l), t = Yu(), e !== null && !De ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, Ln(e, n, l)) : (re && t && Du(n), n.flags |= 1, ze(e, n, r, l), n.child);
}
function Ss(e, n, t, r, l) {
  if (e === null) {
    var i = t.type;
    return typeof i == "function" && !ra(i) && i.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (n.tag = 15, n.type = i, pp(e, n, i, r, l)) : (e = Rl(t.type, null, r, n, n.mode, l), e.ref = n.ref, e.return = n, n.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (t = t.compare, t = t !== null ? t : Fr, t(o, r) && e.ref === n.ref) return Ln(e, n, l);
  }
  return n.flags |= 1, e = Gn(i, r), e.ref = n.ref, e.return = n, n.child = e;
}
function pp(e, n, t, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Fr(i, r) && e.ref === n.ref) if (De = !1, n.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (De = !0);
    else return n.lanes = e.lanes, Ln(e, n, l);
  }
  return Ko(e, n, t, r, l);
}
function dp(e, n, t) {
  var r = n.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(n.mode & 1)) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, J(Mt, Ve), Ve |= t;
  else {
    if (!(t & 1073741824)) return e = i !== null ? i.baseLanes | t : t, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, n.updateQueue = null, J(Mt, Ve), Ve |= e, null;
    n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : t, J(Mt, Ve), Ve |= r;
  }
  else i !== null ? (r = i.baseLanes | t, n.memoizedState = null) : r = t, J(Mt, Ve), Ve |= r;
  return ze(e, n, l, t), n.child;
}
function hp(e, n) {
  var t = n.ref;
  (e === null && t !== null || e !== null && e.ref !== t) && (n.flags |= 512, n.flags |= 2097152);
}
function Ko(e, n, t, r, l) {
  var i = Me(t) ? pt : _e.current;
  return i = Kt(n, i), Vt(n, l), t = Ku(e, n, t, r, i, l), r = Yu(), e !== null && !De ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, Ln(e, n, l)) : (re && r && Du(n), n.flags |= 1, ze(e, n, t, l), n.child);
}
function Es(e, n, t, r, l) {
  if (Me(t)) {
    var i = !0;
    Kl(n);
  } else i = !1;
  if (Vt(n, l), n.stateNode === null) Nl(e, n), sp(n, t, r), Wo(n, t, r, l), r = !0;
  else if (e === null) {
    var o = n.stateNode, u = n.memoizedProps;
    o.props = u;
    var a = o.context, s = t.contextType;
    typeof s == "object" && s !== null ? s = be(s) : (s = Me(t) ? pt : _e.current, s = Kt(n, s));
    var c = t.getDerivedStateFromProps, f = typeof c == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    f || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || a !== s) && ys(n, o, r, s), jn = !1;
    var d = n.memoizedState;
    o.state = d, Zl(n, r, o, l), a = n.memoizedState, u !== r || d !== a || Ae.current || jn ? (typeof c == "function" && ($o(n, t, c, r), a = n.memoizedState), (u = jn || gs(n, t, u, r, d, a, s)) ? (f || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = a), o.props = r, o.state = a, o.context = s, r = u) : (typeof o.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
  } else {
    o = n.stateNode, Hf(e, n), u = n.memoizedProps, s = n.type === n.elementType ? u : on(n.type, u), o.props = s, f = n.pendingProps, d = o.context, a = t.contextType, typeof a == "object" && a !== null ? a = be(a) : (a = Me(t) ? pt : _e.current, a = Kt(n, a));
    var p = t.getDerivedStateFromProps;
    (c = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== f || d !== a) && ys(n, o, r, a), jn = !1, d = n.memoizedState, o.state = d, Zl(n, r, o, l);
    var k = n.memoizedState;
    u !== f || d !== k || Ae.current || jn ? (typeof p == "function" && ($o(n, t, p, r), k = n.memoizedState), (s = jn || gs(n, t, s, r, d, k, a) || !1) ? (c || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, a)), typeof o.componentDidUpdate == "function" && (n.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (n.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = k), o.props = r, o.state = k, o.context = a, r = s) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (n.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (n.flags |= 1024), r = !1);
  }
  return Yo(e, n, t, r, i, l);
}
function Yo(e, n, t, r, l, i) {
  hp(e, n);
  var o = (n.flags & 128) !== 0;
  if (!r && !o) return l && as(n, t, !1), Ln(e, n, i);
  r = n.stateNode, Lm.current = n;
  var u = o && typeof t.getDerivedStateFromError != "function" ? null : r.render();
  return n.flags |= 1, e !== null && o ? (n.child = Xt(n, e.child, null, i), n.child = Xt(n, null, u, i)) : ze(e, n, u, i), n.memoizedState = r.state, l && as(n, t, !0), n.child;
}
function mp(e) {
  var n = e.stateNode;
  n.pendingContext ? us(e, n.pendingContext, n.pendingContext !== n.context) : n.context && us(e, n.context, !1), Hu(e, n.containerInfo);
}
function Cs(e, n, t, r, l) {
  return Yt(), Mu(l), n.flags |= 256, ze(e, n, t, r), n.child;
}
var Xo = { dehydrated: null, treeContext: null, retryLane: 0 };
function qo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function gp(e, n, t) {
  var r = n.pendingProps, l = ie.current, i = !1, o = (n.flags & 128) !== 0, u;
  if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (i = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), J(ie, l & 1), e === null)
    return Vo(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (n.mode & 1 ? e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824 : n.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = n.mode, i = n.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = ki(o, r, 0, null), e = ft(e, r, t, null), i.return = n, e.return = n, i.sibling = e, n.child = i, n.child.memoizedState = qo(t), n.memoizedState = Xo, e) : Gu(n, o));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Om(e, n, o, r, u, l, t);
  if (i) {
    i = r.fallback, o = n.mode, l = e.child, u = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(o & 1) && n.child !== l ? (r = n.child, r.childLanes = 0, r.pendingProps = a, n.deletions = null) : (r = Gn(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? i = Gn(u, i) : (i = ft(i, o, t, null), i.flags |= 2), i.return = n, r.return = n, r.sibling = i, n.child = r, r = i, i = n.child, o = e.child.memoizedState, o = o === null ? qo(t) : { baseLanes: o.baseLanes | t, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~t, n.memoizedState = Xo, r;
  }
  return i = e.child, e = i.sibling, r = Gn(i, { mode: "visible", children: r.children }), !(n.mode & 1) && (r.lanes = t), r.return = n, r.sibling = null, e !== null && (t = n.deletions, t === null ? (n.deletions = [e], n.flags |= 16) : t.push(e)), n.child = r, n.memoizedState = null, r;
}
function Gu(e, n) {
  return n = ki({ mode: "visible", children: n }, e.mode, 0, null), n.return = e, e.child = n;
}
function ml(e, n, t, r) {
  return r !== null && Mu(r), Xt(n, e.child, null, t), e = Gu(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
}
function Om(e, n, t, r, l, i, o) {
  if (t)
    return n.flags & 256 ? (n.flags &= -257, r = Gi(Error(P(422))), ml(e, n, o, r)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (i = r.fallback, l = n.mode, r = ki({ mode: "visible", children: r.children }, l, 0, null), i = ft(i, l, o, null), i.flags |= 2, r.return = n, i.return = n, r.sibling = i, n.child = r, n.mode & 1 && Xt(n, e.child, null, o), n.child.memoizedState = qo(o), n.memoizedState = Xo, i);
  if (!(n.mode & 1)) return ml(e, n, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, i = Error(P(419)), r = Gi(i, r, void 0), ml(e, n, o, r);
  }
  if (u = (o & e.childLanes) !== 0, De || u) {
    if (r = ke, r !== null) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
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
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Nn(e, l), cn(r, e, l, -1));
    }
    return ta(), r = Gi(Error(P(421))), ml(e, n, o, r);
  }
  return l.data === "$?" ? (n.flags |= 128, n.child = e.child, n = Qm.bind(null, e), l._reactRetry = n, null) : (e = i.treeContext, He = Kn(l.nextSibling), We = n, re = !0, an = null, e !== null && (Xe[qe++] = Pn, Xe[qe++] = _n, Xe[qe++] = dt, Pn = e.id, _n = e.overflow, dt = n), n = Gu(n, r.children), n.flags |= 4096, n);
}
function Ps(e, n, t) {
  e.lanes |= n;
  var r = e.alternate;
  r !== null && (r.lanes |= n), Ho(e.return, n, t);
}
function Zi(e, n, t, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: r, tail: t, tailMode: l } : (i.isBackwards = n, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = t, i.tailMode = l);
}
function yp(e, n, t) {
  var r = n.pendingProps, l = r.revealOrder, i = r.tail;
  if (ze(e, n, r.children, t), r = ie.current, r & 2) r = r & 1 | 2, n.flags |= 128;
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
  if (J(ie, r), !(n.mode & 1)) n.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (t = n.child, l = null; t !== null; ) e = t.alternate, e !== null && Jl(e) === null && (l = t), t = t.sibling;
      t = l, t === null ? (l = n.child, n.child = null) : (l = t.sibling, t.sibling = null), Zi(n, !1, l, t, i);
      break;
    case "backwards":
      for (t = null, l = n.child, n.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Jl(e) === null) {
          n.child = l;
          break;
        }
        e = l.sibling, l.sibling = t, t = l, l = e;
      }
      Zi(n, !0, t, null, i);
      break;
    case "together":
      Zi(n, !1, null, null, void 0);
      break;
    default:
      n.memoizedState = null;
  }
  return n.child;
}
function Nl(e, n) {
  !(n.mode & 1) && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2);
}
function Ln(e, n, t) {
  if (e !== null && (n.dependencies = e.dependencies), mt |= n.lanes, !(t & n.childLanes)) return null;
  if (e !== null && n.child !== e.child) throw Error(P(153));
  if (n.child !== null) {
    for (e = n.child, t = Gn(e, e.pendingProps), n.child = t, t.return = n; e.sibling !== null; ) e = e.sibling, t = t.sibling = Gn(e, e.pendingProps), t.return = n;
    t.sibling = null;
  }
  return n.child;
}
function Rm(e, n, t) {
  switch (n.tag) {
    case 3:
      mp(n), Yt();
      break;
    case 5:
      $f(n);
      break;
    case 1:
      Me(n.type) && Kl(n);
      break;
    case 4:
      Hu(n, n.stateNode.containerInfo);
      break;
    case 10:
      var r = n.type._context, l = n.memoizedProps.value;
      J(ql, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = n.memoizedState, r !== null)
        return r.dehydrated !== null ? (J(ie, ie.current & 1), n.flags |= 128, null) : t & n.child.childLanes ? gp(e, n, t) : (J(ie, ie.current & 1), e = Ln(e, n, t), e !== null ? e.sibling : null);
      J(ie, ie.current & 1);
      break;
    case 19:
      if (r = (t & n.childLanes) !== 0, e.flags & 128) {
        if (r) return yp(e, n, t);
        n.flags |= 128;
      }
      if (l = n.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), J(ie, ie.current), r) break;
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
  var l = e.memoizedProps;
  if (l !== r) {
    e = n.stateNode, st(kn.current);
    var i = null;
    switch (t) {
      case "input":
        l = vo(e, l), r = vo(e, r), i = [];
        break;
      case "select":
        l = ue({}, l, { value: void 0 }), r = ue({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = xo(e, l), r = xo(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Wl);
    }
    Eo(t, r);
    var o;
    t = null;
    for (s in l) if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null) if (s === "style") {
      var u = l[s];
      for (o in u) u.hasOwnProperty(o) && (t || (t = {}), t[o] = "");
    } else s !== "dangerouslySetInnerHTML" && s !== "children" && s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (Nr.hasOwnProperty(s) ? i || (i = []) : (i = i || []).push(s, null));
    for (s in r) {
      var a = r[s];
      if (u = l != null ? l[s] : void 0, r.hasOwnProperty(s) && a !== u && (a != null || u != null)) if (s === "style") if (u) {
        for (o in u) !u.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (t || (t = {}), t[o] = "");
        for (o in a) a.hasOwnProperty(o) && u[o] !== a[o] && (t || (t = {}), t[o] = a[o]);
      } else t || (i || (i = []), i.push(
        s,
        t
      )), t = a;
      else s === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, u = u ? u.__html : void 0, a != null && u !== a && (i = i || []).push(s, a)) : s === "children" ? typeof a != "string" && typeof a != "number" || (i = i || []).push(s, "" + a) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && (Nr.hasOwnProperty(s) ? (a != null && s === "onScroll" && ne("scroll", e), i || u === a || (i = [])) : (i = i || []).push(s, a));
    }
    t && (i = i || []).push("style", t);
    var s = i;
    (n.updateQueue = s) && (n.flags |= 4);
  }
};
wp = function(e, n, t, r) {
  t !== r && (n.flags |= 4);
};
function fr(e, n) {
  if (!re) switch (e.tailMode) {
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
  if (n) for (var l = e.child; l !== null; ) t |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) t |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
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
      return Me(n.type) && Ql(), Ce(n), null;
    case 3:
      return r = n.stateNode, qt(), te(Ae), te(_e), Wu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (dl(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, an !== null && (lu(an), an = null))), Go(e, n), Ce(n), null;
    case 5:
      $u(n);
      var l = st(Hr.current);
      if (t = n.type, e !== null && n.stateNode != null) kp(e, n, t, r, l), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
      else {
        if (!r) {
          if (n.stateNode === null) throw Error(P(166));
          return Ce(n), null;
        }
        if (e = st(kn.current), dl(n)) {
          r = n.stateNode, t = n.type;
          var i = n.memoizedProps;
          switch (r[gn] = n, r[Ur] = i, e = (n.mode & 1) !== 0, t) {
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
              for (l = 0; l < vr.length; l++) ne(vr[l], r);
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
              Da(r, i), ne("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, ne("invalid", r);
              break;
            case "textarea":
              Ma(r, i), ne("invalid", r);
          }
          Eo(t, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var u = i[o];
            o === "children" ? typeof u == "string" ? r.textContent !== u && (i.suppressHydrationWarning !== !0 && pl(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (i.suppressHydrationWarning !== !0 && pl(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : Nr.hasOwnProperty(o) && u != null && o === "onScroll" && ne("scroll", r);
          }
          switch (t) {
            case "input":
              ll(r), Aa(r, i, !0);
              break;
            case "textarea":
              ll(r), Fa(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Wl);
          }
          r = l, n.updateQueue = r, r !== null && (n.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Yc(t)), e === "http://www.w3.org/1999/xhtml" ? t === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(t, { is: r.is }) : (e = o.createElement(t), t === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, t), e[gn] = n, e[Ur] = r, vp(e, n, !1, !1), n.stateNode = e;
          e: {
            switch (o = Co(t, r), t) {
              case "dialog":
                ne("cancel", e), ne("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                ne("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < vr.length; l++) ne(vr[l], e);
                l = r;
                break;
              case "source":
                ne("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                ne(
                  "error",
                  e
                ), ne("load", e), l = r;
                break;
              case "details":
                ne("toggle", e), l = r;
                break;
              case "input":
                Da(e, r), l = vo(e, r), ne("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = ue({}, r, { value: void 0 }), ne("invalid", e);
                break;
              case "textarea":
                Ma(e, r), l = xo(e, r), ne("invalid", e);
                break;
              default:
                l = r;
            }
            Eo(t, l), u = l;
            for (i in u) if (u.hasOwnProperty(i)) {
              var a = u[i];
              i === "style" ? Gc(e, a) : i === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Xc(e, a)) : i === "children" ? typeof a == "string" ? (t !== "textarea" || a !== "") && Lr(e, a) : typeof a == "number" && Lr(e, "" + a) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Nr.hasOwnProperty(i) ? a != null && i === "onScroll" && ne("scroll", e) : a != null && wu(e, i, a, o));
            }
            switch (t) {
              case "input":
                ll(e), Aa(e, r, !1);
                break;
              case "textarea":
                ll(e), Fa(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Zn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? Ft(e, !!r.multiple, i, !1) : r.defaultValue != null && Ft(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Wl);
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
        if (t = st(Hr.current), st(kn.current), dl(n)) {
          if (r = n.stateNode, t = n.memoizedProps, r[gn] = n, (i = r.nodeValue !== t) && (e = We, e !== null)) switch (e.tag) {
            case 3:
              pl(r.nodeValue, t, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && pl(r.nodeValue, t, (e.mode & 1) !== 0);
          }
          i && (n.flags |= 4);
        } else r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[gn] = n, n.stateNode = r;
      }
      return Ce(n), null;
    case 13:
      if (te(ie), r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (re && He !== null && n.mode & 1 && !(n.flags & 128)) jf(), Yt(), n.flags |= 98560, i = !1;
        else if (i = dl(n), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(P(318));
            if (i = n.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(P(317));
            i[gn] = n;
          } else Yt(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
          Ce(n), i = !1;
        } else an !== null && (lu(an), an = null), i = !0;
        if (!i) return n.flags & 65536 ? n : null;
      }
      return n.flags & 128 ? (n.lanes = t, n) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (n.child.flags |= 8192, n.mode & 1 && (e === null || ie.current & 1 ? ye === 0 && (ye = 3) : ta())), n.updateQueue !== null && (n.flags |= 4), Ce(n), null);
    case 4:
      return qt(), Go(e, n), e === null && jr(n.stateNode.containerInfo), Ce(n), null;
    case 10:
      return Bu(n.type._context), Ce(n), null;
    case 17:
      return Me(n.type) && Ql(), Ce(n), null;
    case 19:
      if (te(ie), i = n.memoizedState, i === null) return Ce(n), null;
      if (r = (n.flags & 128) !== 0, o = i.rendering, o === null) if (r) fr(i, !1);
      else {
        if (ye !== 0 || e !== null && e.flags & 128) for (e = n.child; e !== null; ) {
          if (o = Jl(e), o !== null) {
            for (n.flags |= 128, fr(i, !1), r = o.updateQueue, r !== null && (n.updateQueue = r, n.flags |= 4), n.subtreeFlags = 0, r = t, t = n.child; t !== null; ) i = t, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), t = t.sibling;
            return J(ie, ie.current & 1 | 2), n.child;
          }
          e = e.sibling;
        }
        i.tail !== null && ce() > Zt && (n.flags |= 128, r = !0, fr(i, !1), n.lanes = 4194304);
      }
      else {
        if (!r) if (e = Jl(o), e !== null) {
          if (n.flags |= 128, r = !0, t = e.updateQueue, t !== null && (n.updateQueue = t, n.flags |= 4), fr(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !re) return Ce(n), null;
        } else 2 * ce() - i.renderingStartTime > Zt && t !== 1073741824 && (n.flags |= 128, r = !0, fr(i, !1), n.lanes = 4194304);
        i.isBackwards ? (o.sibling = n.child, n.child = o) : (t = i.last, t !== null ? t.sibling = o : n.child = o, i.last = o);
      }
      return i.tail !== null ? (n = i.tail, i.rendering = n, i.tail = n.sibling, i.renderingStartTime = ce(), n.sibling = null, t = ie.current, J(ie, r ? t & 1 | 2 : t & 1), n) : (Ce(n), null);
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
      return Me(n.type) && Ql(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 3:
      return qt(), te(Ae), te(_e), Wu(), e = n.flags, e & 65536 && !(e & 128) ? (n.flags = e & -65537 | 128, n) : null;
    case 5:
      return $u(n), null;
    case 13:
      if (te(ie), e = n.memoizedState, e !== null && e.dehydrated !== null) {
        if (n.alternate === null) throw Error(P(340));
        Yt();
      }
      return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 19:
      return te(ie), null;
    case 4:
      return qt(), null;
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
var gl = !1, Pe = !1, Mm = typeof WeakSet == "function" ? WeakSet : Set, O = null;
function At(e, n) {
  var t = e.ref;
  if (t !== null) if (typeof t == "function") try {
    t(null);
  } catch (r) {
    ae(e, n, r);
  }
  else t.current = null;
}
function Zo(e, n, t) {
  try {
    t();
  } catch (r) {
    ae(e, n, r);
  }
}
var _s = !1;
function Fm(e, n) {
  if (Do = Vl, e = Pf(), Ru(e)) {
    if ("selectionStart" in e) var t = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      t = (t = e.ownerDocument) && t.defaultView || window;
      var r = t.getSelection && t.getSelection();
      if (r && r.rangeCount !== 0) {
        t = r.anchorNode;
        var l = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          t.nodeType, i.nodeType;
        } catch {
          t = null;
          break e;
        }
        var o = 0, u = -1, a = -1, s = 0, c = 0, f = e, d = null;
        n: for (; ; ) {
          for (var p; f !== t || l !== 0 && f.nodeType !== 3 || (u = o + l), f !== i || r !== 0 && f.nodeType !== 3 || (a = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (p = f.firstChild) !== null; )
            d = f, f = p;
          for (; ; ) {
            if (f === e) break n;
            if (d === t && ++s === l && (u = o), d === i && ++c === r && (a = o), (p = f.nextSibling) !== null) break;
            f = d, d = f.parentNode;
          }
          f = p;
        }
        t = u === -1 || a === -1 ? null : { start: u, end: a };
      } else t = null;
    }
    t = t || { start: 0, end: 0 };
  } else t = null;
  for (Ao = { focusedElem: e, selectionRange: t }, Vl = !1, O = n; O !== null; ) if (n = O, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, O = e;
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
            var w = k.memoizedProps, z = k.memoizedState, h = n.stateNode, m = h.getSnapshotBeforeUpdate(n.elementType === n.type ? w : on(n.type, w), z);
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
      ae(n, n.return, S);
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
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Zo(n, t, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function yi(e, n) {
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
  if (r === 5 || r === 6) e = e.stateNode, n ? t.nodeType === 8 ? t.parentNode.insertBefore(e, n) : t.insertBefore(e, n) : (t.nodeType === 8 ? (n = t.parentNode, n.insertBefore(e, t)) : (n = t, n.appendChild(e)), t = t._reactRootContainer, t != null || n.onclick !== null || (n.onclick = Wl));
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
    vn.onCommitFiberUnmount(si, t);
  } catch {
  }
  switch (t.tag) {
    case 5:
      Pe || At(t, n);
    case 6:
      var r = we, l = un;
      we = null, Dn(e, n, t), we = r, un = l, we !== null && (un ? (e = we, t = t.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t)) : we.removeChild(t.stateNode));
      break;
    case 18:
      we !== null && (un ? (e = we, t = t.stateNode, e.nodeType === 8 ? Wi(e.parentNode, t) : e.nodeType === 1 && Wi(e, t), Ar(e)) : Wi(we, t.stateNode));
      break;
    case 4:
      r = we, l = un, we = t.stateNode.containerInfo, un = !0, Dn(e, n, t), we = r, un = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Pe && (r = t.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Zo(t, n, o), l = l.next;
        } while (l !== r);
      }
      Dn(e, n, t);
      break;
    case 1:
      if (!Pe && (At(t, n), r = t.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = t.memoizedProps, r.state = t.memoizedState, r.componentWillUnmount();
      } catch (u) {
        ae(t, n, u);
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
function zs(e) {
  var n = e.updateQueue;
  if (n !== null) {
    e.updateQueue = null;
    var t = e.stateNode;
    t === null && (t = e.stateNode = new Mm()), n.forEach(function(r) {
      var l = Km.bind(null, e, r);
      t.has(r) || (t.add(r), r.then(l, l));
    });
  }
}
function ln(e, n) {
  var t = n.deletions;
  if (t !== null) for (var r = 0; r < t.length; r++) {
    var l = t[r];
    try {
      var i = e, o = n, u = o;
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
      Ep(i, o, l), we = null, un = !1;
      var a = l.alternate;
      a !== null && (a.return = null), l.return = null;
    } catch (s) {
      ae(l, n, s);
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
          Pr(3, e, e.return), yi(3, e);
        } catch (w) {
          ae(e, e.return, w);
        }
        try {
          Pr(5, e, e.return);
        } catch (w) {
          ae(e, e.return, w);
        }
      }
      break;
    case 1:
      ln(n, e), dn(e), r & 512 && t !== null && At(t, t.return);
      break;
    case 5:
      if (ln(n, e), dn(e), r & 512 && t !== null && At(t, t.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Lr(l, "");
        } catch (w) {
          ae(e, e.return, w);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = t !== null ? t.memoizedProps : i, u = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          u === "input" && i.type === "radio" && i.name != null && Qc(l, i), Co(u, o);
          var s = Co(u, i);
          for (o = 0; o < a.length; o += 2) {
            var c = a[o], f = a[o + 1];
            c === "style" ? Gc(l, f) : c === "dangerouslySetInnerHTML" ? Xc(l, f) : c === "children" ? Lr(l, f) : wu(l, c, f, s);
          }
          switch (u) {
            case "input":
              ko(l, i);
              break;
            case "textarea":
              Kc(l, i);
              break;
            case "select":
              var d = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var p = i.value;
              p != null ? Ft(l, !!i.multiple, p, !1) : d !== !!i.multiple && (i.defaultValue != null ? Ft(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : Ft(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Ur] = i;
        } catch (w) {
          ae(e, e.return, w);
        }
      }
      break;
    case 6:
      if (ln(n, e), dn(e), r & 4) {
        if (e.stateNode === null) throw Error(P(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (w) {
          ae(e, e.return, w);
        }
      }
      break;
    case 3:
      if (ln(n, e), dn(e), r & 4 && t !== null && t.memoizedState.isDehydrated) try {
        Ar(n.containerInfo);
      } catch (w) {
        ae(e, e.return, w);
      }
      break;
    case 4:
      ln(n, e), dn(e);
      break;
    case 13:
      ln(n, e), dn(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (bu = ce())), r & 4 && zs(e);
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
                At(d, d.return);
                var k = d.stateNode;
                if (typeof k.componentWillUnmount == "function") {
                  r = d, t = d.return;
                  try {
                    n = r, k.props = n.memoizedProps, k.state = n.memoizedState, k.componentWillUnmount();
                  } catch (w) {
                    ae(r, t, w);
                  }
                }
                break;
              case 5:
                At(d, d.return);
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
                l = f.stateNode, s ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (u = f.stateNode, a = f.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, u.style.display = qc("display", o));
              } catch (w) {
                ae(e, e.return, w);
              }
            }
          } else if (f.tag === 6) {
            if (c === null) try {
              f.stateNode.nodeValue = s ? "" : f.memoizedProps;
            } catch (w) {
              ae(e, e.return, w);
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
      ln(n, e), dn(e), r & 4 && zs(e);
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
          var l = r.stateNode;
          r.flags & 32 && (Lr(l, ""), r.flags &= -33);
          var i = Ts(e);
          eu(e, i, l);
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
      ae(e, e.return, a);
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
    var l = O, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || gl;
      if (!o) {
        var u = l.alternate, a = u !== null && u.memoizedState !== null || Pe;
        u = gl;
        var s = Pe;
        if (gl = o, (Pe = a) && !s) for (O = l; O !== null; ) o = O, a = o.child, o.tag === 22 && o.memoizedState !== null ? Ls(l) : a !== null ? (a.return = o, O = a) : Ls(l);
        for (; i !== null; ) O = i, Pp(i), i = i.sibling;
        O = l, gl = u, Pe = s;
      }
      Is(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, O = i) : Is(e);
  }
}
function Is(e) {
  for (; O !== null; ) {
    var n = O;
    if (n.flags & 8772) {
      var t = n.alternate;
      try {
        if (n.flags & 8772) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Pe || yi(5, n);
            break;
          case 1:
            var r = n.stateNode;
            if (n.flags & 4 && !Pe) if (t === null) r.componentDidMount();
            else {
              var l = n.elementType === n.type ? t.memoizedProps : on(n.type, t.memoizedProps);
              r.componentDidUpdate(l, t.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = n.updateQueue;
            i !== null && ds(n, i, r);
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
        ae(n, n.return, d);
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
            yi(4, n);
          } catch (a) {
            ae(n, t, a);
          }
          break;
        case 1:
          var r = n.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = n.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ae(n, l, a);
            }
          }
          var i = n.return;
          try {
            Jo(n);
          } catch (a) {
            ae(n, i, a);
          }
          break;
        case 5:
          var o = n.return;
          try {
            Jo(n);
          } catch (a) {
            ae(n, o, a);
          }
      }
    } catch (a) {
      ae(n, n.return, a);
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
var Bm = Math.ceil, ni = On.ReactCurrentDispatcher, Zu = On.ReactCurrentOwner, Je = On.ReactCurrentBatchConfig, Q = 0, ke = null, he = null, xe = 0, Ve = 0, Mt = et(0), ye = 0, Kr = null, mt = 0, vi = 0, Ju = 0, _r = null, Re = null, bu = 0, Zt = 1 / 0, En = null, ti = !1, nu = null, Xn = null, yl = !1, Hn = null, ri = 0, Tr = 0, tu = null, Ll = -1, Ol = 0;
function Ie() {
  return Q & 6 ? ce() : Ll !== -1 ? Ll : Ll = ce();
}
function qn(e) {
  return e.mode & 1 ? Q & 2 && xe !== 0 ? xe & -xe : Sm.transition !== null ? (Ol === 0 && (Ol = sf()), Ol) : (e = X, e !== 0 || (e = window.event, e = e === void 0 ? 16 : gf(e.type)), e) : 1;
}
function cn(e, n, t, r) {
  if (50 < Tr) throw Tr = 0, tu = null, Error(P(185));
  qr(e, t, r), (!(Q & 2) || e !== ke) && (e === ke && (!(Q & 2) && (vi |= t), ye === 4 && Un(e, xe)), Fe(e, r), t === 1 && Q === 0 && !(n.mode & 1) && (Zt = ce() + 500, hi && nt()));
}
function Fe(e, n) {
  var t = e.callbackNode;
  Sh(e, n);
  var r = Ul(e, e === ke ? xe : 0);
  if (r === 0) t !== null && Ua(t), e.callbackNode = null, e.callbackPriority = 0;
  else if (n = r & -r, e.callbackPriority !== n) {
    if (t != null && Ua(t), n === 1) e.tag === 0 ? xm(Os.bind(null, e)) : Af(Os.bind(null, e)), ym(function() {
      !(Q & 6) && nt();
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
          t = Bl;
          break;
        case 536870912:
          t = af;
          break;
        default:
          t = Bl;
      }
      t = Rp(t, _p.bind(null, e));
    }
    e.callbackPriority = n, e.callbackNode = t;
  }
}
function _p(e, n) {
  if (Ll = -1, Ol = 0, Q & 6) throw Error(P(327));
  var t = e.callbackNode;
  if (Ht() && e.callbackNode !== t) return null;
  var r = Ul(e, e === ke ? xe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || n) n = li(e, r);
  else {
    n = r;
    var l = Q;
    Q |= 2;
    var i = zp();
    (ke !== e || xe !== n) && (En = null, Zt = ce() + 500, ct(e, n));
    do
      try {
        Hm();
        break;
      } catch (u) {
        Tp(e, u);
      }
    while (!0);
    ju(), ni.current = i, Q = l, he !== null ? n = 0 : (ke = null, xe = 0, n = ye);
  }
  if (n !== 0) {
    if (n === 2 && (l = Io(e), l !== 0 && (r = l, n = ru(e, l))), n === 1) throw t = Kr, ct(e, 0), Un(e, r), Fe(e, ce()), t;
    if (n === 6) Un(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Um(l) && (n = li(e, r), n === 2 && (i = Io(e), i !== 0 && (r = i, n = ru(e, i))), n === 1)) throw t = Kr, ct(e, 0), Un(e, r), Fe(e, ce()), t;
      switch (e.finishedWork = l, e.finishedLanes = r, n) {
        case 0:
        case 1:
          throw Error(P(345));
        case 2:
          it(e, Re, En);
          break;
        case 3:
          if (Un(e, r), (r & 130023424) === r && (n = bu + 500 - ce(), 10 < n)) {
            if (Ul(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Ie(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Fo(it.bind(null, e, Re, En), n);
            break;
          }
          it(e, Re, En);
          break;
        case 4:
          if (Un(e, r), (r & 4194240) === r) break;
          for (n = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - sn(r);
            i = 1 << o, o = n[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = ce() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Bm(r / 1960)) - r, 10 < r) {
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
  return Fe(e, ce()), e.callbackNode === t ? _p.bind(null, e) : null;
}
function ru(e, n) {
  var t = _r;
  return e.current.memoizedState.isDehydrated && (ct(e, n).flags |= 256), e = li(e, n), e !== 2 && (n = Re, Re = t, n !== null && lu(n)), e;
}
function lu(e) {
  Re === null ? Re = e : Re.push.apply(Re, e);
}
function Um(e) {
  for (var n = e; ; ) {
    if (n.flags & 16384) {
      var t = n.updateQueue;
      if (t !== null && (t = t.stores, t !== null)) for (var r = 0; r < t.length; r++) {
        var l = t[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!fn(i(), l)) return !1;
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
function Un(e, n) {
  for (n &= ~Ju, n &= ~vi, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n; ) {
    var t = 31 - sn(n), r = 1 << t;
    e[t] = -1, n &= ~r;
  }
}
function Os(e) {
  if (Q & 6) throw Error(P(327));
  Ht();
  var n = Ul(e, 0);
  if (!(n & 1)) return Fe(e, ce()), null;
  var t = li(e, n);
  if (e.tag !== 0 && t === 2) {
    var r = Io(e);
    r !== 0 && (n = r, t = ru(e, r));
  }
  if (t === 1) throw t = Kr, ct(e, 0), Un(e, n), Fe(e, ce()), t;
  if (t === 6) throw Error(P(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = n, it(e, Re, En), Fe(e, ce()), null;
}
function ea(e, n) {
  var t = Q;
  Q |= 1;
  try {
    return e(n);
  } finally {
    Q = t, Q === 0 && (Zt = ce() + 500, hi && nt());
  }
}
function gt(e) {
  Hn !== null && Hn.tag === 0 && !(Q & 6) && Ht();
  var n = Q;
  Q |= 1;
  var t = Je.transition, r = X;
  try {
    if (Je.transition = null, X = 1, e) return e();
  } finally {
    X = r, Je.transition = t, Q = n, !(Q & 6) && nt();
  }
}
function na() {
  Ve = Mt.current, te(Mt);
}
function ct(e, n) {
  e.finishedWork = null, e.finishedLanes = 0;
  var t = e.timeoutHandle;
  if (t !== -1 && (e.timeoutHandle = -1, gm(t)), he !== null) for (t = he.return; t !== null; ) {
    var r = t;
    switch (Au(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ql();
        break;
      case 3:
        qt(), te(Ae), te(_e), Wu();
        break;
      case 5:
        $u(r);
        break;
      case 4:
        qt();
        break;
      case 13:
        te(ie);
        break;
      case 19:
        te(ie);
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
  if (ke = e, he = e = Gn(e.current, null), xe = Ve = n, ye = 0, Kr = null, Ju = vi = mt = 0, Re = _r = null, at !== null) {
    for (n = 0; n < at.length; n++) if (t = at[n], r = t.interleaved, r !== null) {
      t.interleaved = null;
      var l = r.next, i = t.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      t.pending = r;
    }
    at = null;
  }
  return e;
}
function Tp(e, n) {
  do {
    var t = he;
    try {
      if (ju(), zl.current = ei, bl) {
        for (var r = oe.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        bl = !1;
      }
      if (ht = 0, ve = ge = oe = null, Cr = !1, $r = 0, Zu.current = null, t === null || t.return === null) {
        ye = 1, Kr = n, he = null;
        break;
      }
      e: {
        var i = e, o = t.return, u = t, a = n;
        if (n = xe, u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var s = a, c = u, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var p = ks(o);
          if (p !== null) {
            p.flags &= -257, ws(p, o, u, i, n), p.mode & 1 && vs(i, s, n), n = p, a = s;
            var k = n.updateQueue;
            if (k === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(a), n.updateQueue = w;
            } else k.add(a);
            break e;
          } else {
            if (!(n & 1)) {
              vs(i, s, n), ta();
              break e;
            }
            a = Error(P(426));
          }
        } else if (re && u.mode & 1) {
          var z = ks(o);
          if (z !== null) {
            !(z.flags & 65536) && (z.flags |= 256), ws(z, o, u, i, n), Mu(Gt(a, u));
            break e;
          }
        }
        i = a = Gt(a, u), ye !== 4 && (ye = 2), _r === null ? _r = [i] : _r.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, n &= -n, i.lanes |= n;
              var h = cp(i, a, n);
              ps(i, h);
              break e;
            case 1:
              u = a;
              var m = i.type, y = i.stateNode;
              if (!(i.flags & 128) && (typeof m.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Xn === null || !Xn.has(y)))) {
                i.flags |= 65536, n &= -n, i.lanes |= n;
                var S = fp(i, u, n);
                ps(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Np(t);
    } catch (C) {
      n = C, he === t && t !== null && (he = t = t.return);
      continue;
    }
    break;
  } while (!0);
}
function zp() {
  var e = ni.current;
  return ni.current = ei, e === null ? ei : e;
}
function ta() {
  (ye === 0 || ye === 3 || ye === 2) && (ye = 4), ke === null || !(mt & 268435455) && !(vi & 268435455) || Un(ke, xe);
}
function li(e, n) {
  var t = Q;
  Q |= 2;
  var r = zp();
  (ke !== e || xe !== n) && (En = null, ct(e, n));
  do
    try {
      Vm();
      break;
    } catch (l) {
      Tp(e, l);
    }
  while (!0);
  if (ju(), Q = t, ni.current = r, he !== null) throw Error(P(261));
  return ke = null, xe = 0, ye;
}
function Vm() {
  for (; he !== null; ) Ip(he);
}
function Hm() {
  for (; he !== null && !dh(); ) Ip(he);
}
function Ip(e) {
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
  var r = X, l = Je.transition;
  try {
    Je.transition = null, X = 1, $m(e, n, t, r);
  } finally {
    Je.transition = l, X = r;
  }
  return null;
}
function $m(e, n, t, r) {
  do
    Ht();
  while (Hn !== null);
  if (Q & 6) throw Error(P(327));
  t = e.finishedWork;
  var l = e.finishedLanes;
  if (t === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, t === e.current) throw Error(P(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = t.lanes | t.childLanes;
  if (Eh(e, i), e === ke && (he = ke = null, xe = 0), !(t.subtreeFlags & 2064) && !(t.flags & 2064) || yl || (yl = !0, Rp(Bl, function() {
    return Ht(), null;
  })), i = (t.flags & 15990) !== 0, t.subtreeFlags & 15990 || i) {
    i = Je.transition, Je.transition = null;
    var o = X;
    X = 1;
    var u = Q;
    Q |= 4, Zu.current = null, Fm(e, t), Cp(t, e), sm(Ao), Vl = !!Do, Ao = Do = null, e.current = t, jm(t), hh(), Q = u, X = o, Je.transition = i;
  } else e.current = t;
  if (yl && (yl = !1, Hn = e, ri = l), i = e.pendingLanes, i === 0 && (Xn = null), yh(t.stateNode), Fe(e, ce()), n !== null) for (r = e.onRecoverableError, t = 0; t < n.length; t++) l = n[t], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ti) throw ti = !1, e = nu, nu = null, e;
  return ri & 1 && e.tag !== 0 && Ht(), i = e.pendingLanes, i & 1 ? e === tu ? Tr++ : (Tr = 0, tu = e) : Tr = 0, nt(), null;
}
function Ht() {
  if (Hn !== null) {
    var e = cf(ri), n = Je.transition, t = X;
    try {
      if (Je.transition = null, X = 16 > e ? 16 : e, Hn === null) var r = !1;
      else {
        if (e = Hn, Hn = null, ri = 0, Q & 6) throw Error(P(331));
        var l = Q;
        for (Q |= 4, O = e.current; O !== null; ) {
          var i = O, o = i.child;
          if (O.flags & 16) {
            var u = i.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var s = u[a];
                for (O = s; O !== null; ) {
                  var c = O;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pr(8, c, i);
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
              var k = i.alternate;
              if (k !== null) {
                var w = k.child;
                if (w !== null) {
                  k.child = null;
                  do {
                    var z = w.sibling;
                    w.sibling = null, w = z;
                  } while (w !== null);
                }
              }
              O = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, O = o;
          else e: for (; O !== null; ) {
            if (i = O, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Pr(9, i, i.return);
            }
            var h = i.sibling;
            if (h !== null) {
              h.return = i.return, O = h;
              break e;
            }
            O = i.return;
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
                  yi(9, u);
              }
            } catch (C) {
              ae(u, u.return, C);
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
        if (Q = l, nt(), vn && typeof vn.onPostCommitFiberRoot == "function") try {
          vn.onPostCommitFiberRoot(si, e);
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
  n = Gt(t, n), n = cp(e, n, 1), e = Yn(e, n, 1), n = Ie(), e !== null && (qr(e, 1, n), Fe(e, n));
}
function ae(e, n, t) {
  if (e.tag === 3) Rs(e, e, t);
  else for (; n !== null; ) {
    if (n.tag === 3) {
      Rs(n, e, t);
      break;
    } else if (n.tag === 1) {
      var r = n.stateNode;
      if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Xn === null || !Xn.has(r))) {
        e = Gt(t, e), e = fp(n, e, 1), n = Yn(n, e, 1), e = Ie(), n !== null && (qr(n, 1, e), Fe(n, e));
        break;
      }
    }
    n = n.return;
  }
}
function Wm(e, n, t) {
  var r = e.pingCache;
  r !== null && r.delete(n), n = Ie(), e.pingedLanes |= e.suspendedLanes & t, ke === e && (xe & t) === t && (ye === 4 || ye === 3 && (xe & 130023424) === xe && 500 > ce() - bu ? ct(e, 0) : Ju |= t), Fe(e, n);
}
function Lp(e, n) {
  n === 0 && (e.mode & 1 ? (n = ul, ul <<= 1, !(ul & 130023424) && (ul = 4194304)) : n = 1);
  var t = Ie();
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
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (t = l.retryLane);
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
  else De = !1, re && n.flags & 1048576 && Mf(n, Xl, n.index);
  switch (n.lanes = 0, n.tag) {
    case 2:
      var r = n.type;
      Nl(e, n), e = n.pendingProps;
      var l = Kt(n, _e.current);
      Vt(n, t), l = Ku(null, n, r, e, l, t);
      var i = Yu();
      return n.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, Me(r) ? (i = !0, Kl(n)) : i = !1, n.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Vu(n), l.updater = gi, n.stateNode = l, l._reactInternals = n, Wo(n, r, e, t), n = Yo(null, n, r, !0, i, t)) : (n.tag = 0, re && i && Du(n), ze(null, n, l, t), n = n.child), n;
    case 16:
      r = n.elementType;
      e: {
        switch (Nl(e, n), e = n.pendingProps, l = r._init, r = l(r._payload), n.type = r, l = n.tag = Xm(r), e = on(r, e), l) {
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
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : on(r, l), Ko(e, n, r, l, t);
    case 1:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : on(r, l), Es(e, n, r, l, t);
    case 3:
      e: {
        if (mp(n), e === null) throw Error(P(387));
        r = n.pendingProps, i = n.memoizedState, l = i.element, Hf(e, n), Zl(n, r, null, t);
        var o = n.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, n.updateQueue.baseState = i, n.memoizedState = i, n.flags & 256) {
          l = Gt(Error(P(423)), n), n = Cs(e, n, r, t, l);
          break e;
        } else if (r !== l) {
          l = Gt(Error(P(424)), n), n = Cs(e, n, r, t, l);
          break e;
        } else for (He = Kn(n.stateNode.containerInfo.firstChild), We = n, re = !0, an = null, t = Uf(n, null, r, t), n.child = t; t; ) t.flags = t.flags & -3 | 4096, t = t.sibling;
        else {
          if (Yt(), r === l) {
            n = Ln(e, n, t);
            break e;
          }
          ze(e, n, r, t);
        }
        n = n.child;
      }
      return n;
    case 5:
      return $f(n), e === null && Vo(n), r = n.type, l = n.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Mo(r, l) ? o = null : i !== null && Mo(r, i) && (n.flags |= 32), hp(e, n), ze(e, n, o, t), n.child;
    case 6:
      return e === null && Vo(n), null;
    case 13:
      return gp(e, n, t);
    case 4:
      return Hu(n, n.stateNode.containerInfo), r = n.pendingProps, e === null ? n.child = Xt(n, null, r, t) : ze(e, n, r, t), n.child;
    case 11:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : on(r, l), xs(e, n, r, l, t);
    case 7:
      return ze(e, n, n.pendingProps, t), n.child;
    case 8:
      return ze(e, n, n.pendingProps.children, t), n.child;
    case 12:
      return ze(e, n, n.pendingProps.children, t), n.child;
    case 10:
      e: {
        if (r = n.type._context, l = n.pendingProps, i = n.memoizedProps, o = l.value, J(ql, r._currentValue), r._currentValue = o, i !== null) if (fn(i.value, o)) {
          if (i.children === l.children && !Ae.current) {
            n = Ln(e, n, t);
            break e;
          }
        } else for (i = n.child, i !== null && (i.return = n); i !== null; ) {
          var u = i.dependencies;
          if (u !== null) {
            o = i.child;
            for (var a = u.firstContext; a !== null; ) {
              if (a.context === r) {
                if (i.tag === 1) {
                  a = Tn(-1, t & -t), a.tag = 2;
                  var s = i.updateQueue;
                  if (s !== null) {
                    s = s.shared;
                    var c = s.pending;
                    c === null ? a.next = a : (a.next = c.next, c.next = a), s.pending = a;
                  }
                }
                i.lanes |= t, a = i.alternate, a !== null && (a.lanes |= t), Ho(
                  i.return,
                  t,
                  n
                ), u.lanes |= t;
                break;
              }
              a = a.next;
            }
          } else if (i.tag === 10) o = i.type === n.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(P(341));
            o.lanes |= t, u = o.alternate, u !== null && (u.lanes |= t), Ho(o, t, n), o = i.sibling;
          } else o = i.child;
          if (o !== null) o.return = i;
          else for (o = i; o !== null; ) {
            if (o === n) {
              o = null;
              break;
            }
            if (i = o.sibling, i !== null) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        ze(e, n, l.children, t), n = n.child;
      }
      return n;
    case 9:
      return l = n.type, r = n.pendingProps.children, Vt(n, t), l = be(l), r = r(l), n.flags |= 1, ze(e, n, r, t), n.child;
    case 14:
      return r = n.type, l = on(r, n.pendingProps), l = on(r.type, l), Ss(e, n, r, l, t);
    case 15:
      return pp(e, n, n.type, n.pendingProps, t);
    case 17:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : on(r, l), Nl(e, n), n.tag = 1, Me(r) ? (e = !0, Kl(n)) : e = !1, Vt(n, t), sp(n, r, l), Wo(n, r, l, t), Yo(null, n, r, !0, e, t);
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
function Gn(e, n) {
  var t = e.alternate;
  return t === null ? (t = Ze(e.tag, n, e.key, e.mode), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = n, t.type = e.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = e.flags & 14680064, t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, n = e.dependencies, t.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t;
}
function Rl(e, n, t, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") ra(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case _t:
      return ft(t.children, l, i, n);
    case xu:
      o = 8, l |= 8;
      break;
    case ho:
      return e = Ze(12, t, n, l | 2), e.elementType = ho, e.lanes = i, e;
    case mo:
      return e = Ze(13, t, n, l), e.elementType = mo, e.lanes = i, e;
    case go:
      return e = Ze(19, t, n, l), e.elementType = go, e.lanes = i, e;
    case Hc:
      return ki(t, l, i, n);
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
        case Fn:
          o = 16, r = null;
          break e;
      }
      throw Error(P(130, e == null ? e : typeof e, ""));
  }
  return n = Ze(o, t, n, l), n.elementType = e, n.type = r, n.lanes = i, n;
}
function ft(e, n, t, r) {
  return e = Ze(7, e, r, n), e.lanes = t, e;
}
function ki(e, n, t, r) {
  return e = Ze(22, e, r, n), e.elementType = Hc, e.lanes = t, e.stateNode = { isHidden: !1 }, e;
}
function Ji(e, n, t) {
  return e = Ze(6, e, null, n), e.lanes = t, e;
}
function bi(e, n, t) {
  return n = Ze(4, e.children !== null ? e.children : [], e.key, n), n.lanes = t, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
}
function qm(e, n, t, r, l) {
  this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ri(0), this.expirationTimes = Ri(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ri(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function la(e, n, t, r, l, i, o, u, a) {
  return e = new qm(e, n, t, u, a), n === 1 ? (n = 1, i === !0 && (n |= 8)) : n = 0, i = Ze(3, null, null, n), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: t, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Vu(i), e;
}
function Gm(e, n, t) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Pt, key: r == null ? null : "" + r, children: e, containerInfo: n, implementation: t };
}
function Dp(e) {
  if (!e) return Jn;
  e = e._reactInternals;
  e: {
    if (vt(e) !== e || e.tag !== 1) throw Error(P(170));
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
function Ap(e, n, t, r, l, i, o, u, a) {
  return e = la(t, r, !0, e, l, i, o, u, a), e.context = Dp(null), t = e.current, r = Ie(), l = qn(t), i = Tn(r, l), i.callback = n ?? null, Yn(t, i, l), e.current.lanes = l, qr(e, l, r), Fe(e, r), e;
}
function wi(e, n, t, r) {
  var l = n.current, i = Ie(), o = qn(l);
  return t = Dp(t), n.context === null ? n.context = t : n.pendingContext = t, n = Tn(i, o), n.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (n.callback = r), e = Yn(l, n, o), e !== null && (cn(e, l, o, i), Tl(e, l, o)), o;
}
function ii(e) {
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
function ia(e, n) {
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
xi.prototype.render = oa.prototype.render = function(e) {
  var n = this._internalRoot;
  if (n === null) throw Error(P(409));
  wi(e, n, null, null);
};
xi.prototype.unmount = oa.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var n = e.containerInfo;
    gt(function() {
      wi(null, e, null, null);
    }), n[In] = null;
  }
};
function xi(e) {
  this._internalRoot = e;
}
xi.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var n = df();
    e = { blockedOn: null, target: e, priority: n };
    for (var t = 0; t < Bn.length && n !== 0 && n < Bn[t].priority; t++) ;
    Bn.splice(t, 0, e), t === 0 && mf(e);
  }
};
function ua(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Si(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function As() {
}
function Jm(e, n, t, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var s = ii(o);
        i.call(s);
      };
    }
    var o = Ap(n, r, e, 0, null, !1, !1, "", As);
    return e._reactRootContainer = o, e[In] = o.current, jr(e.nodeType === 8 ? e.parentNode : e), gt(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var s = ii(a);
      u.call(s);
    };
  }
  var a = la(e, 0, !1, null, null, !1, !1, "", As);
  return e._reactRootContainer = a, e[In] = a.current, jr(e.nodeType === 8 ? e.parentNode : e), gt(function() {
    wi(n, a, t, r);
  }), a;
}
function Ei(e, n, t, r, l) {
  var i = t._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var a = ii(o);
        u.call(a);
      };
    }
    wi(n, o, e, l);
  } else o = Jm(t, n, e, l, r);
  return ii(o);
}
ff = function(e) {
  switch (e.tag) {
    case 3:
      var n = e.stateNode;
      if (n.current.memoizedState.isDehydrated) {
        var t = yr(n.pendingLanes);
        t !== 0 && (_u(n, t | 1), Fe(n, ce()), !(Q & 6) && (Zt = ce() + 500, nt()));
      }
      break;
    case 13:
      gt(function() {
        var r = Nn(e, 1);
        if (r !== null) {
          var l = Ie();
          cn(r, e, 1, l);
        }
      }), ia(e, 1);
  }
};
Tu = function(e) {
  if (e.tag === 13) {
    var n = Nn(e, 134217728);
    if (n !== null) {
      var t = Ie();
      cn(n, e, 134217728, t);
    }
    ia(e, 134217728);
  }
};
pf = function(e) {
  if (e.tag === 13) {
    var n = qn(e), t = Nn(e, n);
    if (t !== null) {
      var r = Ie();
      cn(t, e, n, r);
    }
    ia(e, n);
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
            var l = di(r);
            if (!l) throw Error(P(90));
            Wc(r), ko(r, l);
          }
        }
      }
      break;
    case "textarea":
      Kc(e, t);
      break;
    case "select":
      n = t.value, n != null && Ft(e, !!t.multiple, n, !1);
  }
};
bc = ea;
ef = gt;
var bm = { usingClientEntryPoint: !1, Events: [Zr, Nt, di, Zc, Jc, ea] }, pr = { findFiberByHostInstance: ut, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, eg = { bundleType: pr.bundleType, version: pr.version, rendererPackageName: pr.rendererPackageName, rendererConfig: pr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: On.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = rf(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: pr.findFiberByHostInstance || Zm, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    si = vl.inject(eg), vn = vl;
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
  var t = !1, r = "", l = Mp;
  return n != null && (n.unstable_strictMode === !0 && (t = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), n = la(e, 1, !1, null, null, t, !1, r, l), e[In] = n.current, jr(e.nodeType === 8 ? e.parentNode : e), new oa(n);
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
  return gt(e);
};
Ke.hydrate = function(e, n, t) {
  if (!Si(n)) throw Error(P(200));
  return Ei(null, e, n, !0, t);
};
Ke.hydrateRoot = function(e, n, t) {
  if (!ua(e)) throw Error(P(405));
  var r = t != null && t.hydratedSources || null, l = !1, i = "", o = Mp;
  if (t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), n = Ap(n, null, e, 1, t ?? null, l, !1, i, o), e[In] = n.current, jr(e), r) for (e = 0; e < r.length; e++) t = r[e], l = t._getVersion, l = l(t._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [t, l] : n.mutableSourceEagerHydrationData.push(
    t,
    l
  );
  return new xi(n);
};
Ke.render = function(e, n, t) {
  if (!Si(n)) throw Error(P(200));
  return Ei(null, e, n, !1, t);
};
Ke.unmountComponentAtNode = function(e) {
  if (!Si(e)) throw Error(P(40));
  return e._reactRootContainer ? (gt(function() {
    Ei(null, null, e, !1, function() {
      e._reactRootContainer = null, e[In] = null;
    });
  }), !0) : !1;
};
Ke.unstable_batchedUpdates = ea;
Ke.unstable_renderSubtreeIntoContainer = function(e, n, t, r) {
  if (!Si(t)) throw Error(P(200));
  if (e == null || e._reactInternals === void 0) throw Error(P(38));
  return Ei(e, n, t, !1, r);
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
let Bp = de.createContext(
  /** @type {any} */
  null
);
function tg() {
  let e = de.useContext(Bp);
  if (!e) throw new Error("RenderContext not found");
  return e;
}
function rg() {
  return tg().model;
}
function An(e) {
  let n = rg(), [t, r] = de.useState(n.get(e));
  return de.useEffect(() => {
    let l = () => r(n.get(e));
    return n.on(`change:${e}`, l), () => n.off(`change:${e}`, l);
  }, [n, e]), [
    t,
    (l) => {
      n.set(e, l), n.save_changes();
    }
  ];
}
function lg(e) {
  return ({ el: n, model: t, experimental: r }) => {
    let l = jp(n);
    return l.render(
      de.createElement(
        de.StrictMode,
        null,
        de.createElement(
          Bp.Provider,
          { value: { model: t, experimental: r } },
          de.createElement(e)
        )
      )
    ), () => l.unmount();
  };
}
function ig(e, n) {
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
  let l = -1;
  for (; ++l < e.length; )
    Object.assign(t, e[l].property), Object.assign(r, e[l].normal);
  return new br(t, r, n);
}
function iu(e) {
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
const U = kt(), pe = kt(), Vp = kt(), _ = kt(), Z = kt(), $t = kt(), Ue = kt();
function kt() {
  return 2 ** ++fg;
}
const ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: U,
  booleanish: pe,
  commaOrSpaceSeparated: Ue,
  commaSeparated: $t,
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
  constructor(n, t, r, l) {
    let i = -1;
    if (super(n, t), Bs(this, "space", l), typeof r == "number")
      for (; ++i < eo.length; ) {
        const o = eo[i];
        Bs(this, eo[i], (r & ou[o]) === ou[o]);
      }
  }
}
aa.prototype.defined = !0;
function Bs(e, n, t) {
  t && (e[n] = t);
}
const pg = {}.hasOwnProperty;
function nr(e) {
  const n = {}, t = {};
  let r;
  for (r in e.properties)
    if (pg.call(e.properties, r)) {
      const l = e.properties[r], i = new aa(
        r,
        e.transform(e.attributes || {}, r),
        l,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(r) && (i.mustUseProperty = !0), n[r] = i, t[iu(r)] = r, t[iu(i.attribute)] = r;
    }
  return new br(n, t, e.space);
}
const Hp = nr({
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
}), $p = nr({
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
const Kp = nr({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: Qp,
  properties: { xmlns: null, xmlnsXLink: null }
}), Yp = nr({
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: pe,
    ariaAutoComplete: null,
    ariaBusy: pe,
    ariaChecked: pe,
    ariaColCount: _,
    ariaColIndex: _,
    ariaColSpan: _,
    ariaControls: Z,
    ariaCurrent: null,
    ariaDescribedBy: Z,
    ariaDetails: null,
    ariaDisabled: pe,
    ariaDropEffect: Z,
    ariaErrorMessage: null,
    ariaExpanded: pe,
    ariaFlowTo: Z,
    ariaGrabbed: pe,
    ariaHasPopup: null,
    ariaHidden: pe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Z,
    ariaLevel: _,
    ariaLive: null,
    ariaModal: pe,
    ariaMultiLine: pe,
    ariaMultiSelectable: pe,
    ariaOrientation: null,
    ariaOwns: Z,
    ariaPlaceholder: null,
    ariaPosInSet: _,
    ariaPressed: pe,
    ariaReadOnly: pe,
    ariaRelevant: null,
    ariaRequired: pe,
    ariaRoleDescription: Z,
    ariaRowCount: _,
    ariaRowIndex: _,
    ariaRowSpan: _,
    ariaSelected: pe,
    ariaSetSize: _,
    ariaSort: null,
    ariaValueMax: _,
    ariaValueMin: _,
    ariaValueNow: _,
    ariaValueText: null,
    role: null
  }
}), dg = nr({
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
    accept: $t,
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
    contentEditable: pe,
    controls: U,
    controlsList: Z,
    coords: _ | $t,
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
    draggable: pe,
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
    spellCheck: pe,
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
    value: pe,
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
    scrolling: pe,
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
}), hg = nr({
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
    g1: $t,
    g2: $t,
    glyphName: $t,
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
  const t = iu(n);
  let r = n, l = nn;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && mg.test(n)) {
    if (n.charAt(4) === "-") {
      const i = n.slice(5).replace(Us, kg);
      r = "data" + i.charAt(0).toUpperCase() + i.slice(1);
    } else {
      const i = n.slice(4);
      if (!Us.test(i)) {
        let o = i.replace(gg, vg);
        o.charAt(0) !== "-" && (o = "-" + o), n = "data" + o;
      }
    }
    l = aa;
  }
  return new l(r, n);
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
var Xp = {}, Vs = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Eg = /\n/g, Cg = /^\s*/, Pg = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, _g = /^:\s*/, Tg = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, zg = /^[;\s]*/, Ig = /^\s+|\s+$/g, Ng = `
`, Hs = "/", $s = "*", ot = "", Lg = "comment", Og = "declaration", Rg = function(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function l(k) {
    var w = k.match(Eg);
    w && (t += w.length);
    var z = k.lastIndexOf(Ng);
    r = ~z ? k.length - z : r + k.length;
  }
  function i() {
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
      var z = w[0];
      return l(z), e = e.slice(z.length), w;
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
    var k = i();
    if (!(Hs != e.charAt(0) || $s != e.charAt(1))) {
      for (var w = 2; ot != e.charAt(w) && ($s != e.charAt(w) || Hs != e.charAt(w + 1)); )
        ++w;
      if (w += 2, ot === e.charAt(w - 1))
        return u("End of comment missing");
      var z = e.slice(2, w - 2);
      return r += 2, l(z), e = e.slice(w), r += 2, k({
        type: Lg,
        comment: z
      });
    }
  }
  function d() {
    var k = i(), w = a(Pg);
    if (w) {
      if (f(), !a(_g)) return u("property missing ':'");
      var z = a(Tg), h = k({
        type: Og,
        property: Ws(w[0].replace(Vs, ot)),
        value: z ? Ws(z[0].replace(Vs, ot)) : ot
      });
      return a(zg), h;
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
  return e ? e.replace(Ig, ot) : ot;
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
  var r = (0, Ag.default)(e), l = typeof n == "function";
  return r.forEach(function(i) {
    if (i.type === "declaration") {
      var o = i.property, u = i.value;
      l ? n(o, u, i) : u && (t = t || {}, t[o] = u);
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
function zr(e) {
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
    let l = "", i = {}, o = !1;
    if (t && ("line" in t && "column" in t ? i = { place: t } : "start" in t && "end" in t ? i = { place: t } : "type" in t ? i = {
      ancestors: [t],
      place: t.position
    } : i = { ...t }), typeof n == "string" ? l = n : !i.cause && n && (o = !0, l = n.message, i.cause = n), !i.ruleId && !i.source && typeof r == "string") {
      const a = r.indexOf(":");
      a === -1 ? i.ruleId = r : (i.source = r.slice(0, a), i.ruleId = r.slice(a + 1));
    }
    if (!i.place && i.ancestors && i.ancestors) {
      const a = i.ancestors[i.ancestors.length - 1];
      a && (i.place = a.position);
    }
    const u = i.place && "start" in i.place ? i.place.start : i.place;
    this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = u ? u.column : void 0, this.fatal = void 0, this.file, this.message = l, this.line = u ? u.line : void 0, this.name = zr(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = o && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual, this.expected, this.note, this.url;
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
  const l = {
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
  }, i = Jp(l, e, void 0);
  return i && typeof i != "string" ? i : l.create(
    e,
    l.Fragment,
    { children: i || void 0 },
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
  let l = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (l = sa, e.schema = l), e.ancestors.push(n);
  const i = ed(e, n.tagName, !1), o = bg(e, n);
  let u = da(e, n);
  return Hg.has(n.tagName) && (u = u.filter(function(a) {
    return typeof a == "string" ? !cg(a) : !0;
  })), bp(e, o, i, n), pa(o, u), e.ancestors.pop(), e.schema = r, e.create(n, i, o, t);
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
  let l = r;
  n.name === "svg" && r.space === "html" && (l = sa, e.schema = l), e.ancestors.push(n);
  const i = n.name === null ? e.Fragment : ed(e, n.name, !0), o = ey(e, n), u = da(e, n);
  return bp(e, o, i, n), pa(o, u), e.ancestors.pop(), e.schema = r, e.create(n, i, o, t);
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
  function r(l, i, o, u) {
    const s = Array.isArray(o.children) ? t : n;
    return u ? s(i, o, u) : s(i, o);
  }
}
function Jg(e, n) {
  return t;
  function t(r, l, i, o) {
    const u = Array.isArray(i.children), a = ca(r);
    return n(
      l,
      i,
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
  let r, l;
  for (l in n.properties)
    if (l !== "children" && fa.call(n.properties, l)) {
      const i = ny(e, l, n.properties[l]);
      if (i) {
        const [o, u] = i;
        e.tableCellAlignToStyle && o === "align" && typeof u == "string" && $g.has(n.tagName) ? r = u : t[o] = u;
      }
    }
  if (r) {
    const i = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    i[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function ey(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const i = r.data.estree.body[0];
        i.type;
        const o = i.expression;
        o.type;
        const u = o.properties[0];
        u.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(u.argument)
        );
      } else
        Yr(e, n.position);
    else {
      const l = r.name;
      let i;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const u = r.value.data.estree.body[0];
          u.type, i = e.evaluater.evaluateExpression(u.expression);
        } else
          Yr(e, n.position);
      else
        i = r.value === null ? !0 : r.value;
      t[l] = /** @type {Props[keyof Props]} */
      i;
    }
  return t;
}
function da(e, n) {
  const t = [];
  let r = -1;
  const l = e.passKeys ? /* @__PURE__ */ new Map() : Bg;
  for (; ++r < n.children.length; ) {
    const i = n.children[r];
    let o;
    if (e.passKeys) {
      const a = i.type === "element" ? i.tagName : i.type === "mdxJsxFlowElement" || i.type === "mdxJsxTextElement" ? i.name : void 0;
      if (a) {
        const s = l.get(a) || 0;
        o = a + "-" + s, l.set(a, s + 1);
      }
    }
    const u = Jp(e, i, o);
    u !== void 0 && t.push(u);
  }
  return t;
}
function ny(e, n, t) {
  const r = yg(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? ig(t) : Sg(t)), r.property === "style") {
      let l = typeof t == "object" ? t : ty(e, String(t));
      return e.stylePropertyNameCase === "css" && (l = ry(l)), ["style", l];
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
  } catch (l) {
    if (!e.ignoreInvalidStyle) {
      const i = (
        /** @type {Error} */
        l
      ), o = new Te("Cannot parse `style` attribute", {
        ancestors: e.ancestors,
        cause: i,
        ruleId: "style",
        source: "hast-util-to-jsx-runtime"
      });
      throw o.file = e.filePath || void 0, o.url = Zp + "#cannot-parse-style-attribute", o;
    }
  }
  return t;
  function r(l, i) {
    let o = l;
    o.slice(0, 2) !== "--" && (o.slice(0, 4) === "-ms-" && (o = "ms-" + o.slice(4)), o = o.replace(Vg, iy)), t[o] = i;
  }
}
function ed(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const l = n.split(".");
    let i = -1, o;
    for (; ++i < l.length; ) {
      const u = Fs(l[i]) ? { type: "Identifier", name: l[i] } : { type: "Literal", value: l[i] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: u,
        computed: !!(i && u.type === "Literal"),
        optional: !1
      } : u;
    }
    r = o;
  } else
    r = Fs(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const l = (
      /** @type {keyof JSX.IntrinsicElements} */
      r.value
    );
    return fa.call(e.components, l) ? e.components[l] : l;
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
    fa.call(e, t) && (n[ly(t)] = e[t]);
  return n;
}
function ly(e) {
  let n = e.replace(Ug, oy);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function iy(e, n) {
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
var nd = { exports: {} }, Ci = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uy = de, ay = Symbol.for("react.element"), sy = Symbol.for("react.fragment"), cy = Object.prototype.hasOwnProperty, fy = uy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, py = { key: !0, ref: !0, __self: !0, __source: !0 };
function td(e, n, t) {
  var r, l = {}, i = null, o = null;
  t !== void 0 && (i = "" + t), n.key !== void 0 && (i = "" + n.key), n.ref !== void 0 && (o = n.ref);
  for (r in n) cy.call(n, r) && !py.hasOwnProperty(r) && (l[r] = n[r]);
  if (e && e.defaultProps) for (r in n = e.defaultProps, n) l[r] === void 0 && (l[r] = n[r]);
  return { $$typeof: ay, type: e, key: i, ref: o, props: l, _owner: fy.current };
}
Ci.Fragment = sy;
Ci.jsx = td;
Ci.jsxs = td;
nd.exports = Ci;
var to = nd.exports;
const dy = {};
function hy(e, n) {
  const t = dy, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, l = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return rd(e, r, l);
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
  let l = -1;
  for (; ++l < e.length; )
    r[l] = rd(e[l], n, t);
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
  const l = e.length;
  let i = 0, o;
  if (n < 0 ? n = -n > l ? 0 : l + n : n = n > l ? l : n, t = t > 0 ? t : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(n, t), e.splice(...o);
  else
    for (t && e.splice(n, t); i < r.length; )
      o = r.slice(i, i + 1e4), o.unshift(n, 0), e.splice(...o), i += 1e4, n += 1e4;
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
    const l = (Gs.call(e, t) ? e[t] : void 0) || (e[t] = {}), i = n[t];
    let o;
    if (i)
      for (o in i) {
        Gs.call(l, o) || (l[o] = []);
        const u = i[o];
        vy(
          // @ts-expect-error Looks like a list.
          l[o],
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
function ld(e, n) {
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
function Wt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const yn = tt(/[A-Za-z]/), $e = tt(/[\dA-Za-z]/), ky = tt(/[#-'*+\--9=?A-Z^-~]/);
function au(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const su = tt(/\d/), wy = tt(/[\dA-Fa-f]/), xy = tt(/[!-/:-@[-`{-~]/);
function j(e) {
  return e !== null && e < -2;
}
function je(e) {
  return e !== null && (e < 0 || e === 32);
}
function K(e) {
  return e === -2 || e === -1 || e === 32;
}
const Sy = tt(new RegExp("\\p{P}|\\p{S}", "u")), Ey = tt(/\s/);
function tt(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function tr(e) {
  const n = [];
  let t = -1, r = 0, l = 0;
  for (; ++t < e.length; ) {
    const i = e.charCodeAt(t);
    let o = "";
    if (i === 37 && $e(e.charCodeAt(t + 1)) && $e(e.charCodeAt(t + 2)))
      l = 2;
    else if (i < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) || (o = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      const u = e.charCodeAt(t + 1);
      i < 56320 && u > 56319 && u < 57344 ? (o = String.fromCharCode(i, u), l = 1) : o = "�";
    } else
      o = String.fromCharCode(i);
    o && (n.push(e.slice(r, t), encodeURIComponent(o)), r = t + l + 1, o = ""), l && (t += l, l = 0);
  }
  return n.join("") + e.slice(r);
}
function b(e, n, t, r) {
  const l = r ? r - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return o;
  function o(a) {
    return K(a) ? (e.enter(t), u(a)) : n(a);
  }
  function u(a) {
    return K(a) && i++ < l ? (e.consume(a), u) : (e.exit(t), n(a));
  }
}
const Cy = {
  tokenize: Py
};
function Py(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, l);
  let t;
  return n;
  function r(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), b(e, n, "linePrefix");
  }
  function l(u) {
    return e.enter("paragraph"), i(u);
  }
  function i(u) {
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
    return j(u) ? (e.consume(u), e.exit("chunkText"), i) : (e.consume(u), o);
  }
}
const _y = {
  tokenize: Ty
}, Zs = {
  tokenize: zy
};
function Ty(e) {
  const n = this, t = [];
  let r = 0, l, i, o;
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
      n.containerState._closeFlow = void 0, l && m();
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
      if (!l)
        return d(y);
      if (l.currentConstruct && l.currentConstruct.concrete)
        return k(y);
      n.interrupt = !!(l.currentConstruct && !l._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(Zs, c, f)(y);
  }
  function c(y) {
    return l && m(), h(r), d(y);
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
      l && m(), h(0), e.consume(y);
      return;
    }
    return l = l || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: l,
      contentType: "flow",
      previous: i
    }), w(y);
  }
  function w(y) {
    if (y === null) {
      z(e.exit("chunkFlow"), !0), h(0), e.consume(y);
      return;
    }
    return j(y) ? (e.consume(y), z(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, u) : (e.consume(y), w);
  }
  function z(y, S) {
    const C = n.sliceStream(y);
    if (S && C.push(null), y.previous = i, i && (i.next = y), i = y, l.defineSkip(y.start), l.write(C), n.parser.lazy[y.start.line]) {
      let x = l.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          l.events[x][1].start.offset < o && // …and either is not ended yet…
          (!l.events[x][1].end || // …or ends after it.
          l.events[x][1].end.offset > o)
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
    l.write([null]), i = void 0, l = void 0, n.containerState._closeFlow = void 0;
  }
}
function zy(e, n, t) {
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
  let l = -1;
  for (; ++l < e.length; ) {
    const i = e[l].resolveAll;
    i && !r.includes(i) && (n = i(n, t), r.push(i));
  }
  return n;
}
const cu = {
  name: "attention",
  resolveAll: Iy,
  tokenize: Ny
};
function Iy(e, n) {
  let t = -1, r, l, i, o, u, a, s, c;
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
          }, i = {
            type: a > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, l = {
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
          }, s = [], e[r][1].end.offset - e[r][1].start.offset && (s = Ge(s, [["enter", e[r][1], n], ["exit", e[r][1], n]])), s = Ge(s, [["enter", l, n], ["enter", o, n], ["exit", o, n], ["enter", i, n]]), s = Ge(s, ma(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), s = Ge(s, [["exit", i, n], ["enter", u, n], ["exit", u, n], ["exit", l, n]]), e[t][1].end.offset - e[t][1].start.offset ? (c = 2, s = Ge(s, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : c = 0, wn(e, r - 1, t - r + 3, s), t = r + s.length - c - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Ny(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, l = Js(r);
  let i;
  return o;
  function o(a) {
    return i = a, e.enter("attentionSequence"), u(a);
  }
  function u(a) {
    if (a === i)
      return e.consume(a), u;
    const s = e.exit("attentionSequence"), c = Js(a), f = !c || c === 2 && l || t.includes(a), d = !l || l === 2 && c || t.includes(r);
    return s._open = !!(i === 42 ? f : f && (l || !d)), s._close = !!(i === 42 ? d : d && (c || !f)), n(a);
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
  return l;
  function l(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), i;
  }
  function i(p) {
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
const Pi = {
  partial: !0,
  tokenize: Ry
};
function Ry(e, n, t) {
  return r;
  function r(i) {
    return K(i) ? b(e, l, "linePrefix")(i) : l(i);
  }
  function l(i) {
    return i === null || j(i) ? n(i) : t(i);
  }
}
const id = {
  continuation: {
    tokenize: Ay
  },
  exit: My,
  name: "blockQuote",
  tokenize: Dy
};
function Dy(e, n, t) {
  const r = this;
  return l;
  function l(o) {
    if (o === 62) {
      const u = r.containerState;
      return u.open || (e.enter("blockQuote", {
        _container: !0
      }), u.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), i;
    }
    return t(o);
  }
  function i(o) {
    return K(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(o));
  }
}
function Ay(e, n, t) {
  const r = this;
  return l;
  function l(o) {
    return K(o) ? b(e, i, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : i(o);
  }
  function i(o) {
    return e.attempt(id, n, t)(o);
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
  function r(i) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(i), e.exit("escapeMarker"), l;
  }
  function l(i) {
    return xy(i) ? (e.enter("characterEscapeValue"), e.consume(i), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(i);
  }
}
const ud = {
  name: "characterReference",
  tokenize: jy
};
function jy(e, n, t) {
  const r = this;
  let l = 0, i, o;
  return u;
  function u(f) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), a;
  }
  function a(f) {
    return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), s) : (e.enter("characterReferenceValue"), i = 31, o = $e, c(f));
  }
  function s(f) {
    return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), i = 6, o = wy, c) : (e.enter("characterReferenceValue"), i = 7, o = su, c(f));
  }
  function c(f) {
    if (f === 59 && l) {
      const d = e.exit("characterReferenceValue");
      return o === $e && !ha(r.sliceSerialize(d)) ? t(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return o(f) && l++ < i ? (e.consume(f), c) : t(f);
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
  const r = this, l = {
    partial: !0,
    tokenize: C
  };
  let i = 0, o = 0, u;
  return a;
  function a(x) {
    return s(x);
  }
  function s(x) {
    const T = r.events[r.events.length - 1];
    return i = T && T[1].type === "linePrefix" ? T[2].sliceSerialize(T[1], !0).length : 0, u = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(x);
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
    return e.attempt(l, S, z)(x);
  }
  function z(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), h;
  }
  function h(x) {
    return i > 0 && K(x) ? b(e, m, "linePrefix", i + 1)(x) : m(x);
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
  return l;
  function l(o) {
    return o === null ? t(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i);
  }
  function i(o) {
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
  return l;
  function l(s) {
    return e.enter("codeIndented"), b(e, i, "linePrefix", 5)(s);
  }
  function i(s) {
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
  return l;
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : j(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : b(e, i, "linePrefix", 5)(o);
  }
  function i(o) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? n(o) : j(o) ? l(o) : t(o);
  }
}
const Wy = {
  name: "codeText",
  previous: Ky,
  resolve: Qy,
  tokenize: Yy
};
function Qy(e) {
  let n = e.length - 4, t = 3, r, l;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    l === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (l = r) : (r === n || e[r][1].type === "lineEnding") && (e[l][1].type = "codeTextData", r !== l + 2 && (e[l][1].end = e[r - 1][1].end, e.splice(l + 2, r - l - 2), n -= r - l - 2, r = l + 2), l = void 0);
  return e;
}
function Ky(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Yy(e, n, t) {
  let r = 0, l, i;
  return o;
  function o(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), u(f);
  }
  function u(f) {
    return f === 96 ? (e.consume(f), r++, u) : (e.exit("codeTextSequence"), a(f));
  }
  function a(f) {
    return f === null ? t(f) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), a) : f === 96 ? (i = e.enter("codeTextSequence"), l = 0, c(f)) : j(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), a) : (e.enter("codeTextData"), s(f));
  }
  function s(f) {
    return f === null || f === 32 || f === 96 || j(f) ? (e.exit("codeTextData"), a(f)) : (e.consume(f), s);
  }
  function c(f) {
    return f === 96 ? (e.consume(f), l++, c) : l === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(f)) : (i.type = "codeTextData", s(f));
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
    const l = t || 0;
    this.setCursor(Math.trunc(n));
    const i = this.right.splice(this.right.length - l, Number.POSITIVE_INFINITY);
    return r && dr(this.left, r), i.reverse();
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
  let t = -1, r, l, i, o, u, a, s;
  const c = new Xy(e);
  for (; ++t < c.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = c.get(t), t && r[1].type === "chunkFlow" && c.get(t - 1)[1].type === "listItemPrefix" && (a = r[1]._tokenizer.events, i = 0, i < a.length && a[i][1].type === "lineEndingBlank" && (i += 2), i < a.length && a[i][1].type === "content"))
      for (; ++i < a.length && a[i][1].type !== "content"; )
        a[i][1].type === "chunkText" && (a[i][1]._isInFirstContentOfListItem = !0, i++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, qy(c, t)), t = n[t], s = !0);
    else if (r[1]._container) {
      for (i = t, l = void 0; i-- && (o = c.get(i), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank"); )
        o[0] === "enter" && (l && (c.get(l)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", l = i);
      l && (r[1].end = {
        ...c.get(l)[1].start
      }, u = c.slice(l, t), u.unshift(r), c.splice(l, t - l + 1, u));
    }
  }
  return wn(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !s;
}
function qy(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let l = n - 1;
  const i = [], o = t._tokenizer || r.parser[t.contentType](t.start), u = o.events, a = [], s = {};
  let c, f, d = -1, p = t, k = 0, w = 0;
  const z = [w];
  for (; p; ) {
    for (; e.get(++l)[1] !== p; )
      ;
    i.push(l), p._tokenizer || (c = r.sliceStream(p), p.next || c.push(null), f && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(c), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), f = p, p = p.next;
  }
  for (p = t; ++d < u.length; )
    // Find a void token that includes a break.
    u[d][0] === "exit" && u[d - 1][0] === "enter" && u[d][1].type === u[d - 1][1].type && u[d][1].start.line !== u[d][1].end.line && (w = d + 1, z.push(w), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : z.pop(), d = z.length; d--; ) {
    const h = u.slice(z[d], z[d + 1]), m = i.pop();
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
    }), l(u);
  }
  function l(u) {
    return u === null ? i(u) : j(u) ? e.check(Zy, o, i)(u) : (e.consume(u), l);
  }
  function i(u) {
    return e.exit("chunkContent"), e.exit("content"), n(u);
  }
  function o(u) {
    return e.consume(u), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, l;
  }
}
function e1(e, n, t) {
  const r = this;
  return l;
  function l(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), b(e, i, "linePrefix");
  }
  function i(o) {
    if (o === null || j(o))
      return t(o);
    const u = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && u && u[1].type === "linePrefix" && u[2].sliceSerialize(u[1], !0).length >= 4 ? n(o) : e.interrupt(r.parser.constructs.flow, t, n)(o);
  }
}
function sd(e, n, t, r, l, i, o, u, a) {
  const s = a || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(h) {
    return h === 60 ? (e.enter(r), e.enter(l), e.enter(i), e.consume(h), e.exit(i), d) : h === null || h === 32 || h === 41 || au(h) ? t(h) : (e.enter(r), e.enter(o), e.enter(u), e.enter("chunkString", {
      contentType: "string"
    }), w(h));
  }
  function d(h) {
    return h === 62 ? (e.enter(i), e.consume(h), e.exit(i), e.exit(l), e.exit(r), n) : (e.enter(u), e.enter("chunkString", {
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
    return !c && (h === null || h === 41 || je(h)) ? (e.exit("chunkString"), e.exit(u), e.exit(o), e.exit(r), n(h)) : c < s && h === 40 ? (e.consume(h), c++, w) : h === 41 ? (e.consume(h), c--, w) : h === null || h === 32 || h === 40 || au(h) ? t(h) : (e.consume(h), h === 92 ? z : w);
  }
  function z(h) {
    return h === 40 || h === 41 || h === 92 ? (e.consume(h), w) : w(h);
  }
}
function cd(e, n, t, r, l, i) {
  const o = this;
  let u = 0, a;
  return s;
  function s(p) {
    return e.enter(r), e.enter(l), e.consume(p), e.exit(l), e.enter(i), c;
  }
  function c(p) {
    return u > 999 || p === null || p === 91 || p === 93 && !a || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !u && "_hiddenFootnoteSupport" in o.parser.constructs ? t(p) : p === 93 ? (e.exit(i), e.enter(l), e.consume(p), e.exit(l), e.exit(r), n) : j(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), c) : (e.enter("chunkString", {
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
function fd(e, n, t, r, l, i) {
  let o;
  return u;
  function u(d) {
    return d === 34 || d === 39 || d === 40 ? (e.enter(r), e.enter(l), e.consume(d), e.exit(l), o = d === 40 ? 41 : d, a) : t(d);
  }
  function a(d) {
    return d === o ? (e.enter(l), e.consume(d), e.exit(l), e.exit(r), n) : (e.enter(i), s(d));
  }
  function s(d) {
    return d === o ? (e.exit(i), a(o)) : d === null ? t(d) : j(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), b(e, s, "linePrefix")) : (e.enter("chunkString", {
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
function Ir(e, n) {
  let t;
  return r;
  function r(l) {
    return j(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), t = !0, r) : K(l) ? b(e, r, t ? "linePrefix" : "lineSuffix")(l) : n(l);
  }
}
const n1 = {
  name: "definition",
  tokenize: r1
}, t1 = {
  partial: !0,
  tokenize: l1
};
function r1(e, n, t) {
  const r = this;
  let l;
  return i;
  function i(p) {
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
    return l = Wt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), a) : t(p);
  }
  function a(p) {
    return je(p) ? Ir(e, s)(p) : s(p);
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
    return p === null || j(p) ? (e.exit("definition"), r.parser.defined.push(l), n(p)) : t(p);
  }
}
function l1(e, n, t) {
  return r;
  function r(u) {
    return je(u) ? Ir(e, l)(u) : t(u);
  }
  function l(u) {
    return fd(e, i, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(u);
  }
  function i(u) {
    return K(u) ? b(e, o, "whitespace")(u) : o(u);
  }
  function o(u) {
    return u === null || j(u) ? n(u) : t(u);
  }
}
const i1 = {
  name: "hardBreakEscape",
  tokenize: o1
};
function o1(e, n, t) {
  return r;
  function r(i) {
    return e.enter("hardBreakEscape"), e.consume(i), l;
  }
  function l(i) {
    return j(i) ? (e.exit("hardBreakEscape"), n(i)) : t(i);
  }
}
const u1 = {
  name: "headingAtx",
  resolve: a1,
  tokenize: s1
};
function a1(e, n) {
  let t = e.length - 2, r = 3, l, i;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (l = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, i = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, wn(e, r, t - r + 1, [["enter", l, n], ["enter", i, n], ["exit", i, n], ["exit", l, n]])), e;
}
function s1(e, n, t) {
  let r = 0;
  return l;
  function l(c) {
    return e.enter("atxHeading"), i(c);
  }
  function i(c) {
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
  let l, i, o, u, a;
  return s;
  function s(v) {
    return c(v);
  }
  function c(v) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(v), f;
  }
  function f(v) {
    return v === 33 ? (e.consume(v), d) : v === 47 ? (e.consume(v), i = !0, w) : v === 63 ? (e.consume(v), l = 3, r.interrupt ? n : g) : yn(v) ? (e.consume(v), o = String.fromCharCode(v), z) : t(v);
  }
  function d(v) {
    return v === 45 ? (e.consume(v), l = 2, p) : v === 91 ? (e.consume(v), l = 5, u = 0, k) : yn(v) ? (e.consume(v), l = 4, r.interrupt ? n : g) : t(v);
  }
  function p(v) {
    return v === 45 ? (e.consume(v), r.interrupt ? n : g) : t(v);
  }
  function k(v) {
    const me = "CDATA[";
    return v === me.charCodeAt(u++) ? (e.consume(v), u === me.length ? r.interrupt ? n : A : k) : t(v);
  }
  function w(v) {
    return yn(v) ? (e.consume(v), o = String.fromCharCode(v), z) : t(v);
  }
  function z(v) {
    if (v === null || v === 47 || v === 62 || je(v)) {
      const me = v === 47, tn = o.toLowerCase();
      return !me && !i && tc.includes(tn) ? (l = 1, r.interrupt ? n(v) : A(v)) : c1.includes(o.toLowerCase()) ? (l = 6, me ? (e.consume(v), h) : r.interrupt ? n(v) : A(v)) : (l = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(v) : i ? m(v) : y(v));
    }
    return v === 45 || $e(v) ? (e.consume(v), o += String.fromCharCode(v), z) : t(v);
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
    return v === 45 && l === 2 ? (e.consume(v), fe) : v === 60 && l === 1 ? (e.consume(v), se) : v === 62 && l === 4 ? (e.consume(v), W) : v === 63 && l === 3 ? (e.consume(v), g) : v === 93 && l === 5 ? (e.consume(v), M) : j(v) && (l === 6 || l === 7) ? (e.exit("htmlFlowData"), e.check(p1, q, Y)(v)) : v === null || j(v) ? (e.exit("htmlFlowData"), Y(v)) : (e.consume(v), A);
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
  function fe(v) {
    return v === 45 ? (e.consume(v), g) : A(v);
  }
  function se(v) {
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
    return v === 62 ? (e.consume(v), W) : v === 45 && l === 2 ? (e.consume(v), g) : A(v);
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
  return l;
  function l(o) {
    return j(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : t(o);
  }
  function i(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
function y1(e, n, t) {
  return r;
  function r(l) {
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), e.attempt(Pi, n, t);
  }
}
const v1 = {
  name: "htmlText",
  tokenize: k1
};
function k1(e, n, t) {
  const r = this;
  let l, i, o;
  return u;
  function u(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), a;
  }
  function a(g) {
    return g === 33 ? (e.consume(g), s) : g === 47 ? (e.consume(g), C) : g === 63 ? (e.consume(g), y) : yn(g) ? (e.consume(g), L) : t(g);
  }
  function s(g) {
    return g === 45 ? (e.consume(g), c) : g === 91 ? (e.consume(g), i = 0, k) : yn(g) ? (e.consume(g), m) : t(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), p) : t(g);
  }
  function f(g) {
    return g === null ? t(g) : g === 45 ? (e.consume(g), d) : j(g) ? (o = f, se(g)) : (e.consume(g), f);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), p) : f(g);
  }
  function p(g) {
    return g === 62 ? fe(g) : g === 45 ? d(g) : f(g);
  }
  function k(g) {
    const W = "CDATA[";
    return g === W.charCodeAt(i++) ? (e.consume(g), i === W.length ? w : k) : t(g);
  }
  function w(g) {
    return g === null ? t(g) : g === 93 ? (e.consume(g), z) : j(g) ? (o = w, se(g)) : (e.consume(g), w);
  }
  function z(g) {
    return g === 93 ? (e.consume(g), h) : w(g);
  }
  function h(g) {
    return g === 62 ? fe(g) : g === 93 ? (e.consume(g), h) : w(g);
  }
  function m(g) {
    return g === null || g === 62 ? fe(g) : j(g) ? (o = m, se(g)) : (e.consume(g), m);
  }
  function y(g) {
    return g === null ? t(g) : g === 63 ? (e.consume(g), S) : j(g) ? (o = y, se(g)) : (e.consume(g), y);
  }
  function S(g) {
    return g === 62 ? fe(g) : y(g);
  }
  function C(g) {
    return yn(g) ? (e.consume(g), x) : t(g);
  }
  function x(g) {
    return g === 45 || $e(g) ? (e.consume(g), x) : T(g);
  }
  function T(g) {
    return j(g) ? (o = T, se(g)) : K(g) ? (e.consume(g), T) : fe(g);
  }
  function L(g) {
    return g === 45 || $e(g) ? (e.consume(g), L) : g === 47 || g === 62 || je(g) ? F(g) : t(g);
  }
  function F(g) {
    return g === 47 ? (e.consume(g), fe) : g === 58 || g === 95 || yn(g) ? (e.consume(g), R) : j(g) ? (o = F, se(g)) : K(g) ? (e.consume(g), F) : fe(g);
  }
  function R(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || $e(g) ? (e.consume(g), R) : D(g);
  }
  function D(g) {
    return g === 61 ? (e.consume(g), A) : j(g) ? (o = D, se(g)) : K(g) ? (e.consume(g), D) : F(g);
  }
  function A(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? t(g) : g === 34 || g === 39 ? (e.consume(g), l = g, Y) : j(g) ? (o = A, se(g)) : K(g) ? (e.consume(g), A) : (e.consume(g), le);
  }
  function Y(g) {
    return g === l ? (e.consume(g), l = void 0, H) : g === null ? t(g) : j(g) ? (o = Y, se(g)) : (e.consume(g), Y);
  }
  function le(g) {
    return g === null || g === 34 || g === 39 || g === 60 || g === 61 || g === 96 ? t(g) : g === 47 || g === 62 || je(g) ? F(g) : (e.consume(g), le);
  }
  function H(g) {
    return g === 47 || g === 62 || je(g) ? F(g) : t(g);
  }
  function fe(g) {
    return g === 62 ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(g);
  }
  function se(g) {
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
  tokenize: z1
};
function E1(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const l = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += l;
    }
  }
  return e.length !== t.length && wn(e, 0, e.length, t), e;
}
function C1(e, n) {
  let t = e.length, r = 0, l, i, o, u;
  for (; t--; )
    if (l = e[t][1], i) {
      if (l.type === "link" || l.type === "labelLink" && l._inactive)
        break;
      e[t][0] === "enter" && l.type === "labelLink" && (l._inactive = !0);
    } else if (o) {
      if (e[t][0] === "enter" && (l.type === "labelImage" || l.type === "labelLink") && !l._balanced && (i = t, l.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else l.type === "labelEnd" && (o = t);
  const a = {
    type: e[i][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, s = {
    type: "label",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, c = {
    type: "labelText",
    start: {
      ...e[i + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return u = [["enter", a, n], ["enter", s, n]], u = Ge(u, e.slice(i + 1, i + r + 3)), u = Ge(u, [["enter", c, n]]), u = Ge(u, ma(n.parser.constructs.insideSpan.null, e.slice(i + r + 4, o - 3), n)), u = Ge(u, [["exit", c, n], e[o - 2], e[o - 1], ["exit", s, n]]), u = Ge(u, e.slice(o + 1)), u = Ge(u, [["exit", a, n]]), wn(e, i, e.length, u), e;
}
function P1(e, n, t) {
  const r = this;
  let l = r.events.length, i, o;
  for (; l--; )
    if ((r.events[l][1].type === "labelImage" || r.events[l][1].type === "labelLink") && !r.events[l][1]._balanced) {
      i = r.events[l][1];
      break;
    }
  return u;
  function u(d) {
    return i ? i._inactive ? f(d) : (o = r.parser.defined.includes(Wt(r.sliceSerialize({
      start: i.end,
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
    return i._balanced = !0, t(d);
  }
}
function _1(e, n, t) {
  return r;
  function r(f) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), l;
  }
  function l(f) {
    return je(f) ? Ir(e, i)(f) : i(f);
  }
  function i(f) {
    return f === 41 ? c(f) : sd(e, o, u, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function o(f) {
    return je(f) ? Ir(e, a)(f) : c(f);
  }
  function u(f) {
    return t(f);
  }
  function a(f) {
    return f === 34 || f === 39 || f === 40 ? fd(e, s, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : c(f);
  }
  function s(f) {
    return je(f) ? Ir(e, c)(f) : c(f);
  }
  function c(f) {
    return f === 41 ? (e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), e.exit("resource"), n) : t(f);
  }
}
function T1(e, n, t) {
  const r = this;
  return l;
  function l(u) {
    return cd.call(r, e, i, o, "reference", "referenceMarker", "referenceString")(u);
  }
  function i(u) {
    return r.parser.defined.includes(Wt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(u) : t(u);
  }
  function o(u) {
    return t(u);
  }
}
function z1(e, n, t) {
  return r;
  function r(i) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(i), e.exit("referenceMarker"), l;
  }
  function l(i) {
    return i === 93 ? (e.enter("referenceMarker"), e.consume(i), e.exit("referenceMarker"), e.exit("reference"), n) : t(i);
  }
}
const I1 = {
  name: "labelStartImage",
  resolveAll: ga.resolveAll,
  tokenize: N1
};
function N1(e, n, t) {
  const r = this;
  return l;
  function l(u) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(u), e.exit("labelImageMarker"), i;
  }
  function i(u) {
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
  return l;
  function l(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), i;
  }
  function i(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : n(o);
  }
}
const lo = {
  name: "lineEnding",
  tokenize: R1
};
function R1(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), b(e, n, "linePrefix");
  }
}
const Dl = {
  name: "thematicBreak",
  tokenize: D1
};
function D1(e, n, t) {
  let r = 0, l;
  return i;
  function i(s) {
    return e.enter("thematicBreak"), o(s);
  }
  function o(s) {
    return l = s, u(s);
  }
  function u(s) {
    return s === l ? (e.enter("thematicBreakSequence"), a(s)) : r >= 3 && (s === null || j(s)) ? (e.exit("thematicBreak"), n(s)) : t(s);
  }
  function a(s) {
    return s === l ? (e.consume(s), r++, a) : (e.exit("thematicBreakSequence"), K(s) ? b(e, u, "whitespace")(s) : u(s));
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
  const r = this, l = r.events[r.events.length - 1];
  let i = l && l[1].type === "linePrefix" ? l[2].sliceSerialize(l[1], !0).length : 0, o = 0;
  return u;
  function u(p) {
    const k = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (k === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : su(p)) {
      if (r.containerState.type || (r.containerState.type = k, e.enter(k, {
        _container: !0
      })), k === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(Dl, t, s)(p) : s(p);
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
      Pi,
      // Can’t be empty when interrupting.
      r.interrupt ? t : c,
      e.attempt(A1, d, f)
    );
  }
  function c(p) {
    return r.containerState.initialBlankLine = !0, i++, d(p);
  }
  function f(p) {
    return K(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), d) : t(p);
  }
  function d(p) {
    return r.containerState.size = i + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(p);
  }
}
function j1(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Pi, l, i);
  function l(u) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, b(e, n, "listItemIndent", r.containerState.size + 1)(u);
  }
  function i(u) {
    return r.containerState.furtherBlankLines || !K(u) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(u)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(M1, n, o)(u));
  }
  function o(u) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, b(e, e.attempt(Oe, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(u);
  }
}
function B1(e, n, t) {
  const r = this;
  return b(e, l, "listItemIndent", r.containerState.size + 1);
  function l(i) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? n(i) : t(i);
  }
}
function U1(e) {
  e.exit(this.containerState.type);
}
function V1(e, n, t) {
  const r = this;
  return b(e, l, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function l(i) {
    const o = r.events[r.events.length - 1];
    return !K(i) && o && o[1].type === "listItemPrefixWhitespace" ? n(i) : t(i);
  }
}
const rc = {
  name: "setextUnderline",
  resolveTo: H1,
  tokenize: $1
};
function H1(e, n) {
  let t = e.length, r, l, i;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (l = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !i && e[t][1].type === "definition" && (i = t);
  const o = {
    type: "setextHeading",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[l][1].type = "setextHeadingText", i ? (e.splice(l, 0, ["enter", o, n]), e.splice(i + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[i][1].end
  }) : e[r][1] = o, e.push(["exit", o, n]), e;
}
function $1(e, n, t) {
  const r = this;
  let l;
  return i;
  function i(s) {
    let c = r.events.length, f;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        f = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (e.enter("setextHeadingLine"), l = s, o(s)) : t(s);
  }
  function o(s) {
    return e.enter("setextHeadingLineSequence"), u(s);
  }
  function u(s) {
    return s === l ? (e.consume(s), u) : (e.exit("setextHeadingLineSequence"), K(s) ? b(e, a, "lineSuffix")(s) : a(s));
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
    Pi,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, l, b(e, e.attempt(this.parser.constructs.flow, l, e.attempt(Gy, l)), "linePrefix"))
  );
  return t;
  function r(i) {
    if (i === null) {
      e.consume(i);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(i), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function l(i) {
    if (i === null) {
      e.consume(i);
      return;
    }
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n.currentConstruct = void 0, t;
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
    const r = this, l = this.parser.constructs[e], i = t.attempt(l, o, u);
    return o;
    function o(c) {
      return s(c) ? i(c) : u(c);
    }
    function u(c) {
      if (c === null) {
        t.consume(c);
        return;
      }
      return t.enter("data"), t.consume(c), a;
    }
    function a(c) {
      return s(c) ? (t.exit("data"), i(c)) : (t.consume(c), a);
    }
    function s(c) {
      if (c === null)
        return !0;
      const f = l[c];
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
    let l = -1, i;
    for (; ++l <= t.length; )
      i === void 0 ? t[l] && t[l][1].type === "data" && (i = l, l++) : (!t[l] || t[l][1].type !== "data") && (l !== i + 2 && (t[i][1].end = t[l - 1][1].end, t.splice(i + 2, l - i - 2), l = i + 2), i = void 0);
    return e ? e(t, r) : t;
  }
}
function q1(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], l = n.sliceStream(r);
      let i = l.length, o = -1, u = 0, a;
      for (; i--; ) {
        const s = l[i];
        if (typeof s == "string") {
          for (o = s.length; s.charCodeAt(o - 1) === 32; )
            u++, o--;
          if (o) break;
          o = -1;
        } else if (s === -2)
          a = !0, u++;
        else if (s !== -1) {
          i++;
          break;
        }
      }
      if (u) {
        const s = {
          type: t === e.length || a || u < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: i ? o : r.start._bufferIndex + o,
            _index: r.start._index + i,
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
  62: id
}, Z1 = {
  91: n1
}, J1 = {
  [-2]: ro,
  [-1]: ro,
  32: ro
}, b1 = {
  35: u1,
  42: Dl,
  45: [rc, Dl],
  60: f1,
  61: rc,
  95: Dl,
  96: nc,
  126: nc
}, e0 = {
  38: ud,
  92: od
}, n0 = {
  [-5]: lo,
  [-4]: lo,
  [-3]: lo,
  33: I1,
  38: ud,
  42: cu,
  60: [Ly, v1],
  91: L1,
  92: [i1, od],
  93: ga,
  95: cu,
  96: Wy
}, t0 = {
  null: [cu, K1]
}, r0 = {
  null: [42, 95]
}, l0 = {
  null: []
}, i0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: r0,
  contentInitial: Z1,
  disable: l0,
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
  const l = {}, i = [];
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
  return n.resolveAll && i.push(n), s;
  function f(D) {
    return o = Ge(o, D), z(), o[o.length - 1] !== null ? [] : (L(n, 0), s.events = ma(i, s.events, s), s.events);
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
    l[D.line] = D.column, R();
  }
  function z() {
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
    function Y(le, H, fe) {
      let se, N, M, g;
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
          const wt = Rn !== null && ee[Rn], xt = Rn !== null && ee.null, nl = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(wt) ? wt : wt ? [wt] : [],
            ...Array.isArray(xt) ? xt : xt ? [xt] : []
          ];
          return q(nl)(Rn);
        }
      }
      function q(ee) {
        return se = ee, N = 0, ee.length === 0 ? fe : v(ee[N]);
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
        return g.restore(), ++N < se.length ? v(se[N]) : fe;
      }
    }
  }
  function L(D, A) {
    D.resolveAll && !i.includes(D) && i.push(D), D.resolve && wn(s.events, A, s.events.length - A, D.resolve(s.events.slice(A), s)), D.resolveTo && (s.events = D.resolveTo(s.events, s));
  }
  function F() {
    const D = k(), A = s.previous, Y = s.currentConstruct, le = s.events.length, H = Array.from(u);
    return {
      from: le,
      restore: fe
    };
    function fe() {
      r = D, s.previous = A, s.currentConstruct = Y, s.events.length = le, u = H, R();
    }
  }
  function R() {
    r.line in l && r.column < 2 && (r.column = l[r.line], r.offset += l[r.line] - 1);
  }
}
function u0(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, l = n.end._index, i = n.end._bufferIndex;
  let o;
  if (t === l)
    o = [e[t].slice(r, i)];
  else {
    if (o = e.slice(t, l), r > -1) {
      const u = o[0];
      typeof u == "string" ? o[0] = u.slice(r) : o.shift();
    }
    i > 0 && o.push(e[l].slice(0, i));
  }
  return o;
}
function a0(e, n) {
  let t = -1;
  const r = [];
  let l;
  for (; ++t < e.length; ) {
    const i = e[t];
    let o;
    if (typeof i == "string")
      o = i;
    else switch (i) {
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
        if (!n && l) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(i);
    }
    l = i === -2, r.push(o);
  }
  return r.join("");
}
function s0(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      gy([i0, ...(e || {}).extensions || []])
    ),
    content: l(Cy),
    defined: [],
    document: l(_y),
    flow: l(W1),
    lazy: {},
    string: l(Y1),
    text: l(X1)
  };
  return r;
  function l(i) {
    return o;
    function o(u) {
      return o0(r, i, u);
    }
  }
}
function c0(e) {
  for (; !ad(e); )
    ;
  return e;
}
const lc = /[\0\t\n\r]/g;
function f0() {
  let e = 1, n = "", t = !0, r;
  return l;
  function l(i, o, u) {
    const a = [];
    let s, c, f, d, p;
    for (i = n + (typeof i == "string" ? i.toString() : new TextDecoder(o || void 0).decode(i)), f = 0, n = "", t && (i.charCodeAt(0) === 65279 && f++, t = void 0); f < i.length; ) {
      if (lc.lastIndex = f, s = lc.exec(i), d = s && s.index !== void 0 ? s.index : i.length, p = i.charCodeAt(d), !s) {
        n = i.slice(f);
        break;
      }
      if (p === 10 && f === d && r)
        a.push(-3), r = void 0;
      else
        switch (r && (a.push(-5), r = void 0), f < d && (a.push(i.slice(f, d)), e += d - f), p) {
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
    const l = t.charCodeAt(1), i = l === 120 || l === 88;
    return ld(t.slice(i ? 2 : 1), i ? 16 : 10);
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
      autolink: i(Pa),
      autolinkProtocol: F,
      autolinkEmail: F,
      atxHeading: i(Sa),
      blockQuote: i(xt),
      characterEscape: F,
      characterReference: F,
      codeFenced: i(nl),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: i(nl, o),
      codeText: i(_d, o),
      codeTextData: F,
      data: F,
      codeFlowValue: F,
      definition: i(Td),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: i(zd),
      hardBreakEscape: i(Ea),
      hardBreakTrailing: i(Ea),
      htmlFlow: i(Ca, o),
      htmlFlowData: F,
      htmlText: i(Ca, o),
      htmlTextData: F,
      image: i(Id),
      label: o,
      link: i(Pa),
      listItem: i(Nd),
      listItemValue: d,
      listOrdered: i(_a, f),
      listUnordered: i(_a),
      paragraph: i(Ld),
      reference: v,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: i(Sa),
      strong: i(Od),
      thematicBreak: i(Dd)
    },
    exit: {
      atxHeading: a(),
      atxHeadingSequence: C,
      autolink: a(),
      autolinkEmail: wt,
      autolinkProtocol: Rn,
      blockQuote: a(),
      characterEscapeValue: R,
      characterReferenceMarkerHexadecimal: tn,
      characterReferenceMarkerNumeric: tn,
      characterReferenceValue: ee,
      characterReference: pn,
      codeFenced: a(z),
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
      image: a(se),
      label: M,
      labelText: N,
      lineEnding: D,
      link: a(fe),
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
    let I = {
      type: "root",
      children: []
    };
    const B = {
      stack: [I],
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
          G = l(E, rn, G);
        }
    for (G = -1; ++G < E.length; ) {
      const rn = n[E[G][0]];
      hd.call(rn, E[G][1].type) && rn[E[G][1].type].call(Object.assign({
        sliceSerialize: E[G][2].sliceSerialize
      }, B), E[G][1]);
    }
    if (B.tokenStack.length > 0) {
      const rn = B.tokenStack[B.tokenStack.length - 1];
      (rn[1] || ic).call(B, void 0, rn[0]);
    }
    for (I.position = {
      start: Mn(E.length > 0 ? E[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Mn(E.length > 0 ? E[E.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, G = -1; ++G < n.transforms.length; )
      I = n.transforms[G](I) || I;
    return I;
  }
  function l(E, I, B) {
    let $ = I - 1, G = -1, rn = !1, rt, xn, rr, lr;
    for (; ++$ <= B; ) {
      const Be = E[$];
      switch (Be[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Be[0] === "enter" ? G++ : G--, lr = void 0;
          break;
        }
        case "lineEndingBlank": {
          Be[0] === "enter" && (rt && !lr && !G && !rr && (rr = $), lr = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          lr = void 0;
      }
      if (!G && Be[0] === "enter" && Be[1].type === "listItemPrefix" || G === -1 && Be[0] === "exit" && (Be[1].type === "listUnordered" || Be[1].type === "listOrdered")) {
        if (rt) {
          let St = $;
          for (xn = void 0; St--; ) {
            const Sn = E[St];
            if (Sn[1].type === "lineEnding" || Sn[1].type === "lineEndingBlank") {
              if (Sn[0] === "exit") continue;
              xn && (E[xn][1].type = "lineEndingBlank", rn = !0), Sn[1].type = "lineEnding", xn = St;
            } else if (!(Sn[1].type === "linePrefix" || Sn[1].type === "blockQuotePrefix" || Sn[1].type === "blockQuotePrefixWhitespace" || Sn[1].type === "blockQuoteMarker" || Sn[1].type === "listItemIndent")) break;
          }
          rr && (!xn || rr < xn) && (rt._spread = !0), rt.end = Object.assign({}, xn ? E[xn][1].start : Be[1].end), E.splice(xn || $, 0, ["exit", rt, Be[2]]), $++, B++;
        }
        if (Be[1].type === "listItemPrefix") {
          const St = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Be[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          rt = St, E.splice($, 0, ["enter", St, Be[2]]), $++, B++, rr = void 0, lr = !0;
        }
      }
    }
    return E[I][1]._spread = rn, B;
  }
  function i(E, I) {
    return B;
    function B($) {
      u.call(this, E($), $), I && I.call(this, $);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function u(E, I, B) {
    this.stack[this.stack.length - 1].children.push(E), this.stack.push(E), this.tokenStack.push([I, B || void 0]), E.position = {
      start: Mn(I.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function a(E) {
    return I;
    function I(B) {
      E && E.call(this, B), s.call(this, B);
    }
  }
  function s(E, I) {
    const B = this.stack.pop(), $ = this.tokenStack.pop();
    if ($)
      $[0].type !== E.type && (I ? I.call(this, E, $[0]) : ($[1] || ic).call(this, E, $[0]));
    else throw new Error("Cannot close `" + E.type + "` (" + zr({
      start: E.start,
      end: E.end
    }) + "): it’s not open");
    B.position.end = Mn(E.end);
  }
  function c() {
    return hy(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(E) {
    if (this.data.expectingFirstListItemValue) {
      const I = this.stack[this.stack.length - 2];
      I.start = Number.parseInt(this.sliceSerialize(E), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.lang = E;
  }
  function k() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.meta = E;
  }
  function w() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function z() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function h() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function m(E) {
    const I = this.resume(), B = this.stack[this.stack.length - 1];
    B.label = I, B.identifier = Wt(this.sliceSerialize(E)).toLowerCase();
  }
  function y() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = E;
  }
  function S() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = E;
  }
  function C(E) {
    const I = this.stack[this.stack.length - 1];
    if (!I.depth) {
      const B = this.sliceSerialize(E).length;
      I.depth = B;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function T(E) {
    const I = this.stack[this.stack.length - 1];
    I.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function L() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function F(E) {
    const B = this.stack[this.stack.length - 1].children;
    let $ = B[B.length - 1];
    (!$ || $.type !== "text") && ($ = Rd(), $.position = {
      start: Mn(E.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, B.push($)), this.stack.push($);
  }
  function R(E) {
    const I = this.stack.pop();
    I.value += this.sliceSerialize(E), I.position.end = Mn(E.end);
  }
  function D(E) {
    const I = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const B = I.children[I.children.length - 1];
      B.position.end = Mn(E.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(I.type) && (F.call(this, E), R.call(this, E));
  }
  function A() {
    this.data.atHardBreak = !0;
  }
  function Y() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = E;
  }
  function le() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = E;
  }
  function H() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.value = E;
  }
  function fe() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = I, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function se() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const I = this.data.referenceType || "shortcut";
      E.type += "Reference", E.referenceType = I, delete E.url, delete E.title;
    } else
      delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function N(E) {
    const I = this.sliceSerialize(E), B = this.stack[this.stack.length - 2];
    B.label = d0(I), B.identifier = Wt(I).toLowerCase();
  }
  function M() {
    const E = this.stack[this.stack.length - 1], I = this.resume(), B = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, B.type === "link") {
      const $ = E.children;
      B.children = $;
    } else
      B.alt = I;
  }
  function g() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.url = E;
  }
  function W() {
    const E = this.resume(), I = this.stack[this.stack.length - 1];
    I.title = E;
  }
  function q() {
    this.data.inReference = void 0;
  }
  function v() {
    this.data.referenceType = "collapsed";
  }
  function me(E) {
    const I = this.resume(), B = this.stack[this.stack.length - 1];
    B.label = I, B.identifier = Wt(this.sliceSerialize(E)).toLowerCase(), this.data.referenceType = "full";
  }
  function tn(E) {
    this.data.characterReferenceType = E.type;
  }
  function ee(E) {
    const I = this.sliceSerialize(E), B = this.data.characterReferenceType;
    let $;
    B ? ($ = ld(I, B === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : $ = ha(I);
    const G = this.stack[this.stack.length - 1];
    G.value += $;
  }
  function pn(E) {
    const I = this.stack.pop();
    I.position.end = Mn(E.end);
  }
  function Rn(E) {
    R.call(this, E);
    const I = this.stack[this.stack.length - 1];
    I.url = this.sliceSerialize(E);
  }
  function wt(E) {
    R.call(this, E);
    const I = this.stack[this.stack.length - 1];
    I.url = "mailto:" + this.sliceSerialize(E);
  }
  function xt() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function nl() {
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
  function zd() {
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
  function Id() {
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
function Mn(e) {
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
function ic(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + zr({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + zr({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + zr({
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
  let l = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (l.data = { meta: n.meta }), e.patch(n, l), l = e.applyData(n, l), l = { type: "element", tagName: "pre", properties: {}, children: [l] }, e.patch(n, l), l;
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
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), l = tr(r.toLowerCase()), i = e.footnoteOrder.indexOf(r);
  let o, u = e.footnoteCounts.get(r);
  u === void 0 ? (u = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = i + 1, u += 1, e.footnoteCounts.set(r, u);
  const a = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + l,
      id: t + "fnref-" + l + (u > 1 ? "-" + u : ""),
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
  const l = e.all(n), i = l[0];
  i && i.type === "text" ? i.value = "[" + i.value : l.unshift({ type: "text", value: "[" });
  const o = l[l.length - 1];
  return o && o.type === "text" ? o.value += r : l.push({ type: "text", value: r }), l;
}
function T0(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return gd(e, n);
  const l = { src: tr(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (l.title = r.title);
  const i = { type: "element", tagName: "img", properties: l, children: [] };
  return e.patch(n, i), e.applyData(n, i);
}
function z0(e, n) {
  const t = { src: tr(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function I0(e, n) {
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
  const l = { href: tr(r.url || "") };
  r.title !== null && r.title !== void 0 && (l.title = r.title);
  const i = {
    type: "element",
    tagName: "a",
    properties: l,
    children: e.all(n)
  };
  return e.patch(n, i), e.applyData(n, i);
}
function L0(e, n) {
  const t = { href: tr(n.url) };
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
  const r = e.all(n), l = t ? R0(t) : yd(n), i = {}, o = [];
  if (typeof n.checked == "boolean") {
    const c = r[0];
    let f;
    c && c.type === "element" && c.tagName === "p" ? f = c : (f = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), i.className = ["task-list-item"];
  }
  let u = -1;
  for (; ++u < r.length; ) {
    const c = r[u];
    (l || u !== 0 || c.type !== "element" || c.tagName !== "p") && o.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !l ? o.push(...c.children) : o.push(c);
  }
  const a = r[r.length - 1];
  a && (l || a.type !== "element" || a.tagName !== "p") && o.push({ type: "text", value: `
` });
  const s = { type: "element", tagName: "li", properties: i, children: o };
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
  let l = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++l < r.length; ) {
    const o = r[l];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const i = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, i), e.applyData(n, i);
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
  const t = e.all(n), r = t.shift(), l = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], o), l.push(o);
  }
  if (t.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, u = ca(n.children[1]), a = qp(n.children[n.children.length - 1]);
    u && a && (o.position = { start: u, end: a }), l.push(o);
  }
  const i = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(l, !0)
  };
  return e.patch(n, i), e.applyData(n, i);
}
function B0(e, n, t) {
  const r = t ? t.children : void 0, i = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", o = t && t.type === "table" ? t.align : void 0, u = o ? o.length : n.children.length;
  let a = -1;
  const s = [];
  for (; ++a < u; ) {
    const f = n.children[a], d = {}, p = o ? o[a] : void 0;
    p && (d.align = p);
    let k = { type: "element", tagName: i, properties: d, children: [] };
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
  let r = t.exec(n), l = 0;
  const i = [];
  for (; r; )
    i.push(
      ac(n.slice(l, r.index), l > 0, !0),
      r[0]
    ), l = r.index + r[0].length, r = t.exec(n);
  return i.push(ac(n.slice(l), l > 0, !1)), i.join("");
}
function ac(e, n, t) {
  let r = 0, l = e.length;
  if (n) {
    let i = e.codePointAt(r);
    for (; i === oc || i === uc; )
      r++, i = e.codePointAt(r);
  }
  if (t) {
    let i = e.codePointAt(l - 1);
    for (; i === oc || i === uc; )
      l--, i = e.codePointAt(l - 1);
  }
  return l > r ? e.slice(r, l) : "";
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
  image: z0,
  inlineCode: I0,
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
  toml: kl,
  yaml: kl,
  definition: kl,
  footnoteDefinition: kl
};
function kl() {
}
const vd = -1, _i = 0, oi = 1, ui = 2, ya = 3, va = 4, ka = 5, wa = 6, kd = 7, wd = 8, sc = typeof self == "object" ? self : globalThis, Q0 = (e, n) => {
  const t = (l, i) => (e.set(i, l), l), r = (l) => {
    if (e.has(l))
      return e.get(l);
    const [i, o] = n[l];
    switch (i) {
      case _i:
      case vd:
        return t(o, l);
      case oi: {
        const u = t([], l);
        for (const a of o)
          u.push(r(a));
        return u;
      }
      case ui: {
        const u = t({}, l);
        for (const [a, s] of o)
          u[r(a)] = r(s);
        return u;
      }
      case ya:
        return t(new Date(o), l);
      case va: {
        const { source: u, flags: a } = o;
        return t(new RegExp(u, a), l);
      }
      case ka: {
        const u = t(/* @__PURE__ */ new Map(), l);
        for (const [a, s] of o)
          u.set(r(a), r(s));
        return u;
      }
      case wa: {
        const u = t(/* @__PURE__ */ new Set(), l);
        for (const a of o)
          u.add(r(a));
        return u;
      }
      case kd: {
        const { name: u, message: a } = o;
        return t(new sc[u](a), l);
      }
      case wd:
        return t(BigInt(o), l);
      case "BigInt":
        return t(Object(BigInt(o)), l);
    }
    return t(new sc[i](o), l);
  };
  return r;
}, cc = (e) => Q0(/* @__PURE__ */ new Map(), e)(0), Ct = "", { toString: K0 } = {}, { keys: Y0 } = Object, hr = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [_i, n];
  const t = K0.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [oi, Ct];
    case "Object":
      return [ui, Ct];
    case "Date":
      return [ya, Ct];
    case "RegExp":
      return [va, Ct];
    case "Map":
      return [ka, Ct];
    case "Set":
      return [wa, Ct];
  }
  return t.includes("Array") ? [oi, t] : t.includes("Error") ? [kd, t] : [ui, t];
}, wl = ([e, n]) => e === _i && (n === "function" || n === "symbol"), X0 = (e, n, t, r) => {
  const l = (o, u) => {
    const a = r.push(o) - 1;
    return t.set(u, a), a;
  }, i = (o) => {
    if (t.has(o))
      return t.get(o);
    let [u, a] = hr(o);
    switch (u) {
      case _i: {
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
            return l([vd], o);
        }
        return l([u, c], o);
      }
      case oi: {
        if (a)
          return l([a, [...o]], o);
        const c = [], f = l([u, c], o);
        for (const d of o)
          c.push(i(d));
        return f;
      }
      case ui: {
        if (a)
          switch (a) {
            case "BigInt":
              return l([a, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return l([a, o.valueOf()], o);
          }
        if (n && "toJSON" in o)
          return i(o.toJSON());
        const c = [], f = l([u, c], o);
        for (const d of Y0(o))
          (e || !wl(hr(o[d]))) && c.push([i(d), i(o[d])]);
        return f;
      }
      case ya:
        return l([u, o.toISOString()], o);
      case va: {
        const { source: c, flags: f } = o;
        return l([u, { source: c, flags: f }], o);
      }
      case ka: {
        const c = [], f = l([u, c], o);
        for (const [d, p] of o)
          (e || !(wl(hr(d)) || wl(hr(p)))) && c.push([i(d), i(p)]);
        return f;
      }
      case wa: {
        const c = [], f = l([u, c], o);
        for (const d of o)
          (e || !wl(hr(d))) && c.push(i(d));
        return f;
      }
    }
    const { message: s } = o;
    return l([u, { name: a, message: s }], o);
  };
  return i;
}, fc = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return X0(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, ai = typeof structuredClone == "function" ? (
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
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || q0, r = e.options.footnoteBackLabel || G0, l = e.options.footnoteLabel || "Footnotes", i = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, u = [];
  let a = -1;
  for (; ++a < e.footnoteOrder.length; ) {
    const s = e.footnoteById.get(
      e.footnoteOrder[a]
    );
    if (!s)
      continue;
    const c = e.all(s), f = String(s.identifier).toUpperCase(), d = tr(f.toLowerCase());
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
    const z = c[c.length - 1];
    if (z && z.type === "element" && z.tagName === "p") {
      const m = z.children[z.children.length - 1];
      m && m.type === "text" ? m.value += " " : z.children.push({ type: "text", value: " " }), z.children.push(...k);
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
          tagName: i,
          properties: {
            ...ai(o),
            id: "footnote-label"
          },
          children: [{ type: "text", value: l }]
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
      return Ti(e);
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
  return Ti(r);
  function r(...l) {
    let i = -1;
    for (; ++i < n.length; )
      if (n[i].apply(this, l)) return !0;
    return !1;
  }
}
function b0(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Ti(t);
  function t(r) {
    const l = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let i;
    for (i in e)
      if (l[i] !== n[i]) return !1;
    return !0;
  }
}
function ev(e) {
  return Ti(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Ti(e) {
  return n;
  function n(t, r, l) {
    return !!(tv(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      l || void 0
    ));
  }
}
function nv() {
  return !0;
}
function tv(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Sd = [], rv = !0, pc = !1, lv = "skip";
function iv(e, n, t, r) {
  let l;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : l = n;
  const i = xd(l), o = r ? -1 : 1;
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
      let p = Sd, k, w, z;
      if ((!n || i(a, s, c[c.length - 1] || void 0)) && (p = ov(t(a, c)), p[0] === pc))
        return p;
      if ("children" in a && a.children) {
        const h = (
          /** @type {UnistParent} */
          a
        );
        if (h.children && p[0] !== lv)
          for (w = (r ? h.children.length : -1) + o, z = c.concat(h); w > -1 && w < h.children.length; ) {
            const m = h.children[w];
            if (k = u(m, w, z)(), k[0] === pc)
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
  let l, i, o;
  typeof n == "function" && typeof t != "function" ? (i = void 0, o = n, l = t) : (i = n, o = t, l = r), iv(e, i, u, l);
  function u(a, s) {
    const c = s[s.length - 1], f = c ? c.children.indexOf(a) : void 0;
    return o(a, f, c);
  }
}
const fu = {}.hasOwnProperty, uv = {};
function av(e, n) {
  const t = n || uv, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = { ...W0, ...t.handlers }, u = {
    all: s,
    applyData: cv,
    definitionById: r,
    footnoteById: l,
    footnoteCounts: i,
    footnoteOrder: [],
    handlers: o,
    one: a,
    options: t,
    patch: sv,
    wrap: pv
  };
  return Ed(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const f = c.type === "definition" ? r : l, d = String(c.identifier).toUpperCase();
      f.has(d) || f.set(d, c);
    }
  }), u;
  function a(c, f) {
    const d = c.type, p = u.handlers[d];
    if (fu.call(u.handlers, d) && p)
      return p(u, c, f);
    if (u.options.passThrough && u.options.passThrough.includes(d)) {
      if ("children" in c) {
        const { children: w, ...z } = c, h = ai(z);
        return h.children = u.all(c), h;
      }
      return ai(c);
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
    const r = e.data.hName, l = e.data.hChildren, i = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const o = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: o };
      }
    t.type === "element" && i && Object.assign(t.properties, ai(i)), "children" in t && t.children && l !== null && l !== void 0 && (t.children = l);
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
  const t = av(e, n), r = t.one(e, void 0), l = Z0(t), i = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return l && i.children.push({ type: "text", value: `
` }, l), i;
}
function dv(e, n) {
  return e && "run" in e ? async function(t, r) {
    const l = (
      /** @type {HastRoot} */
      hc(t, { file: r, ...n })
    );
    await e.run(l, r);
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
var Al = Object.prototype.hasOwnProperty, Cd = Object.prototype.toString, gc = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, vc = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : Cd.call(n) === "[object Array]";
}, kc = function(n) {
  if (!n || Cd.call(n) !== "[object Object]")
    return !1;
  var t = Al.call(n, "constructor"), r = n.constructor && n.constructor.prototype && Al.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var l;
  for (l in n)
    ;
  return typeof l > "u" || Al.call(n, l);
}, wc = function(n, t) {
  gc && t.name === "__proto__" ? gc(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, xc = function(n, t) {
  if (t === "__proto__")
    if (Al.call(n, t)) {
      if (yc)
        return yc(n, t).value;
    } else return;
  return n[t];
}, hv = function e() {
  var n, t, r, l, i, o, u = arguments[0], a = 1, s = arguments.length, c = !1;
  for (typeof u == "boolean" && (c = u, u = arguments[1] || {}, a = 2), (u == null || typeof u != "object" && typeof u != "function") && (u = {}); a < s; ++a)
    if (n = arguments[a], n != null)
      for (t in n)
        r = xc(u, t), l = xc(n, t), u !== l && (c && l && (kc(l) || (i = vc(l))) ? (i ? (i = !1, o = r && vc(r) ? r : []) : o = r && kc(r) ? r : {}, wc(u, { name: t, newValue: e(c, o, l) })) : typeof l < "u" && wc(u, { name: t, newValue: l }));
  return u;
};
const io = /* @__PURE__ */ Ad(hv);
function pu(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function mv() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...l) {
    let i = -1;
    const o = l.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    u(null, ...l);
    function u(a, ...s) {
      const c = e[++i];
      let f = -1;
      if (a) {
        o(a);
        return;
      }
      for (; ++f < l.length; )
        (s[f] === null || s[f] === void 0) && (s[f] = l[f]);
      l = s, c ? gv(c, u)(...s) : o(null, ...s);
    }
  }
  function r(l) {
    if (typeof l != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + l
      );
    return e.push(l), n;
  }
}
function gv(e, n) {
  let t;
  return r;
  function r(...o) {
    const u = e.length > o.length;
    let a;
    u && o.push(l);
    try {
      a = e.apply(this, o);
    } catch (s) {
      const c = (
        /** @type {Error} */
        s
      );
      if (u && t)
        throw c;
      return l(c);
    }
    u || (a && a.then && typeof a.then == "function" ? a.then(i, l) : a instanceof Error ? l(a) : i(a));
  }
  function l(o, ...u) {
    t || (t = !0, n(o, ...u));
  }
  function i(o) {
    l(null, o);
  }
}
const mn = { basename: yv, dirname: vv, extname: kv, join: wv, sep: "/" };
function yv(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  el(e);
  let t = 0, r = -1, l = e.length, i;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; l--; )
      if (e.codePointAt(l) === 47) {
        if (i) {
          t = l + 1;
          break;
        }
      } else r < 0 && (i = !0, r = l + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let o = -1, u = n.length - 1;
  for (; l--; )
    if (e.codePointAt(l) === 47) {
      if (i) {
        t = l + 1;
        break;
      }
    } else
      o < 0 && (i = !0, o = l + 1), u > -1 && (e.codePointAt(l) === n.codePointAt(u--) ? u < 0 && (r = l) : (u = -1, r = o));
  return t === r ? r = o : r < 0 && (r = e.length), e.slice(t, r);
}
function vv(e) {
  if (el(e), e.length === 0)
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
  el(e);
  let n = e.length, t = -1, r = 0, l = -1, i = 0, o;
  for (; n--; ) {
    const u = e.codePointAt(n);
    if (u === 47) {
      if (o) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (o = !0, t = n + 1), u === 46 ? l < 0 ? l = n : i !== 1 && (i = 1) : l > -1 && (i = -1);
  }
  return l < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  i === 0 || // The (right-most) trimmed path component is exactly `..`.
  i === 1 && l === t - 1 && l === r + 1 ? "" : e.slice(l, t);
}
function wv(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    el(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : xv(t);
}
function xv(e) {
  el(e);
  const n = e.codePointAt(0) === 47;
  let t = Sv(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function Sv(e, n) {
  let t = "", r = 0, l = -1, i = 0, o = -1, u, a;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      u = e.codePointAt(o);
    else {
      if (u === 47)
        break;
      u = 47;
    }
    if (u === 47) {
      if (!(l === o - 1 || i === 1)) if (l !== o - 1 && i === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (a = t.lastIndexOf("/"), a !== t.length - 1) {
              a < 0 ? (t = "", r = 0) : (t = t.slice(0, a), r = t.length - 1 - t.lastIndexOf("/")), l = o, i = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, l = o, i = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(l + 1, o) : t = e.slice(l + 1, o), r = o - l - 1;
      l = o, i = 0;
    } else u === 46 && i > -1 ? i++ : i = -1;
  }
  return t;
}
function el(e) {
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
        const l = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw l.code = "ERR_INVALID_FILE_URL_PATH", l;
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
      const i = oo[r];
      i in t && t[i] !== void 0 && t[i] !== null && (this[i] = i === "history" ? [...t[i]] : t[i]);
    }
    let l;
    for (l in t)
      oo.includes(l) || (this[l] = t[l]);
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
    const l = this.message(n, t, r);
    throw l.fatal = !0, l;
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
    const l = this.message(n, t, r);
    return l.fatal = void 0, l;
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
    const l = new Te(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (l.name = this.path + ":" + l.name, l.file = this.path), l.fatal = !1, this.messages.push(l), l;
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
const zv = (
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
    ), l = r[e], i = function() {
      return l.apply(i, arguments);
    };
    return Object.setPrototypeOf(i, r), i;
  }
), Iv = {}.hasOwnProperty;
class xa extends zv {
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
    return n.data(io(!0, {}, this.namespace)), n;
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
    return typeof n == "string" ? arguments.length === 2 ? (fo("data", this.frozen), this.namespace[n] = t, this) : Iv.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (fo("data", this.frozen), this.namespace = n, this) : this.namespace;
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
      const l = t.call(n, ...r);
      typeof l == "function" && this.transformers.use(l);
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
    const t = xl(n), r = this.parser || this.Parser;
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
    return this.freeze(), so("process", this.parser || this.Parser), co("process", this.compiler || this.Compiler), t ? l(void 0, t) : new Promise(l);
    function l(i, o) {
      const u = xl(n), a = (
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
        c || !f ? o(c) : i ? i(f) : t(void 0, f);
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
    return this.freeze(), so("processSync", this.parser || this.Parser), co("processSync", this.compiler || this.Compiler), this.process(n, l), Cc("processSync", "process", t), r;
    function l(i, o) {
      t = !0, mc(i), r = o;
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
    const l = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? i(void 0, r) : new Promise(i);
    function i(o, u) {
      const a = xl(t);
      l.run(n, a, s);
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
    let r = !1, l;
    return this.run(n, t, i), Cc("runSync", "run", r), l;
    function i(o, u) {
      mc(o), l = u, r = !0;
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
    const r = xl(t), l = this.compiler || this.Compiler;
    return co("stringify", l), Ec(n), l(n, r);
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
    const r = this.attachers, l = this.namespace;
    if (fo("use", this.frozen), n != null) if (typeof n == "function")
      a(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? u(n) : o(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function i(s) {
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
      u(s.plugins), s.settings && (l.settings = io(!0, l.settings, s.settings));
    }
    function u(s) {
      let c = -1;
      if (s != null) if (Array.isArray(s))
        for (; ++c < s.length; ) {
          const f = s[c];
          i(f);
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
        pu(w) && pu(p) && (p = io(!0, w, p)), r[d] = [s, p, ...k];
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
function xl(e) {
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
  const n = e.allowedElements, t = e.allowElement, r = e.children || "", l = e.className, i = e.components, o = e.disallowedElements, u = e.rehypePlugins || Pc, a = e.remarkPlugins || Pc, s = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ..._c } : _c, c = e.skipHtml, f = e.unwrapDisallowed, d = e.urlTransform || jv, p = Nv().use(v0).use(a).use(dv, s).use(u), k = new Pd();
  typeof r == "string" && (k.value = r);
  for (const m of Mv)
    Object.hasOwn(e, m.from) && ("" + m.from + (m.to ? "use `" + m.to + "` instead" : "remove it") + Dv + m.id, void 0);
  const w = p.parse(k);
  let z = p.runSync(w, k);
  return l && (z = {
    type: "element",
    tagName: "div",
    properties: { className: l },
    // Assume no doctypes.
    children: (
      /** @type {Array<ElementContent>} */
      z.type === "root" ? z.children : [z]
    )
  }), Ed(z, h), Wg(z, {
    Fragment: to.Fragment,
    components: i,
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
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), l = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n < 0 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    l > -1 && n > l || t > -1 && n > t || r > -1 && n > r || // It is a protocol, it should be allowed.
    Av.test(e.slice(0, n)) ? e : ""
  );
}
function Bv({
  isOpen: e,
  title: n,
  message: t,
  showCancel: r,
  okLabel: l,
  cancelLabel: i,
  className: o = "",
  onResult: u
}) {
  if (!e) return null;
  const a = () => {
    u("ok");
  }, s = () => {
    u("cancel");
  }, c = (f) => {
    f.stopPropagation();
  };
  return /* @__PURE__ */ de.createElement("div", { className: "modal-overlay", onClick: s }, /* @__PURE__ */ de.createElement(
    "div",
    {
      className: `modal-dialog ${o}`,
      onClick: c
    },
    /* @__PURE__ */ de.createElement("div", { className: "modal-header" }, n && /* @__PURE__ */ de.createElement("h3", { className: "modal-title" }, n)),
    /* @__PURE__ */ de.createElement("div", { className: "modal-content" }, /* @__PURE__ */ de.createElement(Fv, null, t)),
    /* @__PURE__ */ de.createElement("div", { className: "modal-footer" }, /* @__PURE__ */ de.createElement(
      "button",
      {
        className: "modal-button primary",
        onClick: a
      },
      l
    ), r && /* @__PURE__ */ de.createElement(
      "button",
      {
        className: "modal-button secondary",
        onClick: s
      },
      i
    ))
  ));
}
function Uv() {
  const [e] = An("is_open"), [n] = An("title"), [t] = An("message"), [r] = An("show_cancel"), [l] = An("ok_label"), [i] = An("cancel_label"), [o] = An("class_name"), [, u] = An("result"), a = (s) => {
    u(s);
  };
  return /* @__PURE__ */ de.createElement(
    Bv,
    {
      isOpen: e,
      title: n,
      message: t,
      showCancel: r,
      okLabel: l,
      cancelLabel: i,
      className: o,
      onResult: a
    }
  );
}
const Vv = {
  render: lg(Uv)
};
export {
  Vv as default
};
