var Kp = Object.defineProperty;
var Qp = (e, t, n) => t in e ? Kp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var O = (e, t, n) => Qp(e, typeof t != "symbol" ? t + "" : t, n);
function Gp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Xf = { exports: {} }, I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ss = Symbol.for("react.element"), Zp = Symbol.for("react.portal"), Jp = Symbol.for("react.fragment"), qp = Symbol.for("react.strict_mode"), tg = Symbol.for("react.profiler"), eg = Symbol.for("react.provider"), ng = Symbol.for("react.context"), ig = Symbol.for("react.forward_ref"), sg = Symbol.for("react.suspense"), rg = Symbol.for("react.memo"), og = Symbol.for("react.lazy"), Su = Symbol.iterator;
function lg(e) {
  return e === null || typeof e != "object" ? null : (e = Su && e[Su] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Kf = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Qf = Object.assign, Gf = {};
function hi(e, t, n) {
  this.props = e, this.context = t, this.refs = Gf, this.updater = n || Kf;
}
hi.prototype.isReactComponent = {};
hi.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
hi.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Zf() {
}
Zf.prototype = hi.prototype;
function fa(e, t, n) {
  this.props = e, this.context = t, this.refs = Gf, this.updater = n || Kf;
}
var da = fa.prototype = new Zf();
da.constructor = fa;
Qf(da, hi.prototype);
da.isPureReactComponent = !0;
var bu = Array.isArray, Jf = Object.prototype.hasOwnProperty, ha = { current: null }, qf = { key: !0, ref: !0, __self: !0, __source: !0 };
function td(e, t, n) {
  var i, s = {}, r = null, o = null;
  if (t != null) for (i in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (r = "" + t.key), t) Jf.call(t, i) && !qf.hasOwnProperty(i) && (s[i] = t[i]);
  var l = arguments.length - 2;
  if (l === 1) s.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    s.children = a;
  }
  if (e && e.defaultProps) for (i in l = e.defaultProps, l) s[i] === void 0 && (s[i] = l[i]);
  return { $$typeof: Ss, type: e, key: r, ref: o, props: s, _owner: ha.current };
}
function ag(e, t) {
  return { $$typeof: Ss, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function pa(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ss;
}
function ug(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Mu = /\/+/g;
function ko(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ug("" + e.key) : t.toString(36);
}
function ar(e, t, n, i, s) {
  var r = typeof e;
  (r === "undefined" || r === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (r) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Ss:
        case Zp:
          o = !0;
      }
  }
  if (o) return o = e, s = s(o), e = i === "" ? "." + ko(o, 0) : i, bu(s) ? (n = "", e != null && (n = e.replace(Mu, "$&/") + "/"), ar(s, t, n, "", function(u) {
    return u;
  })) : s != null && (pa(s) && (s = ag(s, n + (!s.key || o && o.key === s.key ? "" : ("" + s.key).replace(Mu, "$&/") + "/") + e)), t.push(s)), 1;
  if (o = 0, i = i === "" ? "." : i + ":", bu(e)) for (var l = 0; l < e.length; l++) {
    r = e[l];
    var a = i + ko(r, l);
    o += ar(r, t, n, a, s);
  }
  else if (a = lg(e), typeof a == "function") for (e = a.call(e), l = 0; !(r = e.next()).done; ) r = r.value, a = i + ko(r, l++), o += ar(r, t, n, a, s);
  else if (r === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function Ds(e, t, n) {
  if (e == null) return e;
  var i = [], s = 0;
  return ar(e, i, "", "", function(r) {
    return t.call(n, r, s++);
  }), i;
}
function cg(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ot = { current: null }, ur = { transition: null }, fg = { ReactCurrentDispatcher: Ot, ReactCurrentBatchConfig: ur, ReactCurrentOwner: ha };
function ed() {
  throw Error("act(...) is not supported in production builds of React.");
}
I.Children = { map: Ds, forEach: function(e, t, n) {
  Ds(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Ds(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Ds(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!pa(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
I.Component = hi;
I.Fragment = Jp;
I.Profiler = tg;
I.PureComponent = fa;
I.StrictMode = qp;
I.Suspense = sg;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fg;
I.act = ed;
I.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = Qf({}, e.props), s = e.key, r = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (r = t.ref, o = ha.current), t.key !== void 0 && (s = "" + t.key), e.type && e.type.defaultProps) var l = e.type.defaultProps;
    for (a in t) Jf.call(t, a) && !qf.hasOwnProperty(a) && (i[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    i.children = l;
  }
  return { $$typeof: Ss, type: e.type, key: s, ref: r, props: i, _owner: o };
};
I.createContext = function(e) {
  return e = { $$typeof: ng, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: eg, _context: e }, e.Consumer = e;
};
I.createElement = td;
I.createFactory = function(e) {
  var t = td.bind(null, e);
  return t.type = e, t;
};
I.createRef = function() {
  return { current: null };
};
I.forwardRef = function(e) {
  return { $$typeof: ig, render: e };
};
I.isValidElement = pa;
I.lazy = function(e) {
  return { $$typeof: og, _payload: { _status: -1, _result: e }, _init: cg };
};
I.memo = function(e, t) {
  return { $$typeof: rg, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function(e) {
  var t = ur.transition;
  ur.transition = {};
  try {
    e();
  } finally {
    ur.transition = t;
  }
};
I.unstable_act = ed;
I.useCallback = function(e, t) {
  return Ot.current.useCallback(e, t);
};
I.useContext = function(e) {
  return Ot.current.useContext(e);
};
I.useDebugValue = function() {
};
I.useDeferredValue = function(e) {
  return Ot.current.useDeferredValue(e);
};
I.useEffect = function(e, t) {
  return Ot.current.useEffect(e, t);
};
I.useId = function() {
  return Ot.current.useId();
};
I.useImperativeHandle = function(e, t, n) {
  return Ot.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function(e, t) {
  return Ot.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function(e, t) {
  return Ot.current.useLayoutEffect(e, t);
};
I.useMemo = function(e, t) {
  return Ot.current.useMemo(e, t);
};
I.useReducer = function(e, t, n) {
  return Ot.current.useReducer(e, t, n);
};
I.useRef = function(e) {
  return Ot.current.useRef(e);
};
I.useState = function(e) {
  return Ot.current.useState(e);
};
I.useSyncExternalStore = function(e, t, n) {
  return Ot.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function() {
  return Ot.current.useTransition();
};
I.version = "18.3.1";
Xf.exports = I;
var it = Xf.exports;
const dg = /* @__PURE__ */ Gp(it);
var nd = { exports: {} }, Vt = {}, id = { exports: {} }, sd = {};
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
  function t(C, D) {
    var L = C.length;
    C.push(D);
    t: for (; 0 < L; ) {
      var V = L - 1 >>> 1, X = C[V];
      if (0 < s(X, D)) C[V] = D, C[L] = X, L = V;
      else break t;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function i(C) {
    if (C.length === 0) return null;
    var D = C[0], L = C.pop();
    if (L !== D) {
      C[0] = L;
      t: for (var V = 0, X = C.length, ue = X >>> 1; V < ue; ) {
        var Ct = 2 * (V + 1) - 1, _e = C[Ct], Pt = Ct + 1, Os = C[Pt];
        if (0 > s(_e, L)) Pt < X && 0 > s(Os, _e) ? (C[V] = Os, C[Pt] = L, V = Pt) : (C[V] = _e, C[Ct] = L, V = Ct);
        else if (Pt < X && 0 > s(Os, L)) C[V] = Os, C[Pt] = L, V = Pt;
        else break t;
      }
    }
    return D;
  }
  function s(C, D) {
    var L = C.sortIndex - D.sortIndex;
    return L !== 0 ? L : C.id - D.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var r = performance;
    e.unstable_now = function() {
      return r.now();
    };
  } else {
    var o = Date, l = o.now();
    e.unstable_now = function() {
      return o.now() - l;
    };
  }
  var a = [], u = [], c = 1, f = null, d = 3, h = !1, m = !1, y = !1, _ = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(C) {
    for (var D = n(u); D !== null; ) {
      if (D.callback === null) i(u);
      else if (D.startTime <= C) i(u), D.sortIndex = D.expirationTime, t(a, D);
      else break;
      D = n(u);
    }
  }
  function x(C) {
    if (y = !1, v(C), !m) if (n(a) !== null) m = !0, H(w);
    else {
      var D = n(u);
      D !== null && Y(x, D.startTime - C);
    }
  }
  function w(C, D) {
    m = !1, y && (y = !1, p(b), b = -1), h = !0;
    var L = d;
    try {
      for (v(D), f = n(a); f !== null && (!(f.expirationTime > D) || C && !R()); ) {
        var V = f.callback;
        if (typeof V == "function") {
          f.callback = null, d = f.priorityLevel;
          var X = V(f.expirationTime <= D);
          D = e.unstable_now(), typeof X == "function" ? f.callback = X : f === n(a) && i(a), v(D);
        } else i(a);
        f = n(a);
      }
      if (f !== null) var ue = !0;
      else {
        var Ct = n(u);
        Ct !== null && Y(x, Ct.startTime - D), ue = !1;
      }
      return ue;
    } finally {
      f = null, d = L, h = !1;
    }
  }
  var k = !1, S = null, b = -1, E = 5, P = -1;
  function R() {
    return !(e.unstable_now() - P < E);
  }
  function z() {
    if (S !== null) {
      var C = e.unstable_now();
      P = C;
      var D = !0;
      try {
        D = S(!0, C);
      } finally {
        D ? J() : (k = !1, S = null);
      }
    } else k = !1;
  }
  var J;
  if (typeof g == "function") J = function() {
    g(z);
  };
  else if (typeof MessageChannel < "u") {
    var vt = new MessageChannel(), B = vt.port2;
    vt.port1.onmessage = z, J = function() {
      B.postMessage(null);
    };
  } else J = function() {
    _(z, 0);
  };
  function H(C) {
    S = C, k || (k = !0, J());
  }
  function Y(C, D) {
    b = _(function() {
      C(e.unstable_now());
    }, D);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    m || h || (m = !0, H(w));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(C) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var D = 3;
        break;
      default:
        D = d;
    }
    var L = d;
    d = D;
    try {
      return C();
    } finally {
      d = L;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, D) {
    switch (C) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        C = 3;
    }
    var L = d;
    d = C;
    try {
      return D();
    } finally {
      d = L;
    }
  }, e.unstable_scheduleCallback = function(C, D, L) {
    var V = e.unstable_now();
    switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? V + L : V) : L = V, C) {
      case 1:
        var X = -1;
        break;
      case 2:
        X = 250;
        break;
      case 5:
        X = 1073741823;
        break;
      case 4:
        X = 1e4;
        break;
      default:
        X = 5e3;
    }
    return X = L + X, C = { id: c++, callback: D, priorityLevel: C, startTime: L, expirationTime: X, sortIndex: -1 }, L > V ? (C.sortIndex = L, t(u, C), n(a) === null && C === n(u) && (y ? (p(b), b = -1) : y = !0, Y(x, L - V))) : (C.sortIndex = X, t(a, C), m || h || (m = !0, H(w))), C;
  }, e.unstable_shouldYield = R, e.unstable_wrapCallback = function(C) {
    var D = d;
    return function() {
      var L = d;
      d = D;
      try {
        return C.apply(this, arguments);
      } finally {
        d = L;
      }
    };
  };
})(sd);
id.exports = sd;
var hg = id.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pg = it, Ht = hg;
function M(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var rd = /* @__PURE__ */ new Set(), Ji = {};
function Dn(e, t) {
  si(e, t), si(e + "Capture", t);
}
function si(e, t) {
  for (Ji[e] = t, e = 0; e < t.length; e++) rd.add(t[e]);
}
var Oe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ll = Object.prototype.hasOwnProperty, gg = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Cu = {}, Pu = {};
function mg(e) {
  return ll.call(Pu, e) ? !0 : ll.call(Cu, e) ? !1 : gg.test(e) ? Pu[e] = !0 : (Cu[e] = !0, !1);
}
function yg(e, t, n, i) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return i ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function vg(e, t, n, i) {
  if (t === null || typeof t > "u" || yg(e, t, n, i)) return !0;
  if (i) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function Dt(e, t, n, i, s, r, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = s, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = r, this.removeEmptyString = o;
}
var yt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  yt[e] = new Dt(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  yt[t] = new Dt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  yt[e] = new Dt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  yt[e] = new Dt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  yt[e] = new Dt(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  yt[e] = new Dt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  yt[e] = new Dt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  yt[e] = new Dt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  yt[e] = new Dt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ga = /[\-:]([a-z])/g;
function ma(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ga,
    ma
  );
  yt[t] = new Dt(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ga, ma);
  yt[t] = new Dt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ga, ma);
  yt[t] = new Dt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  yt[e] = new Dt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
yt.xlinkHref = new Dt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  yt[e] = new Dt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ya(e, t, n, i) {
  var s = yt.hasOwnProperty(t) ? yt[t] : null;
  (s !== null ? s.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (vg(t, n, s, i) && (n = null), i || s === null ? mg(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : s.mustUseProperty ? e[s.propertyName] = n === null ? s.type === 3 ? !1 : "" : n : (t = s.attributeName, i = s.attributeNamespace, n === null ? e.removeAttribute(t) : (s = s.type, n = s === 3 || s === 4 && n === !0 ? "" : "" + n, i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))));
}
var ze = pg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Rs = Symbol.for("react.element"), Fn = Symbol.for("react.portal"), Nn = Symbol.for("react.fragment"), va = Symbol.for("react.strict_mode"), al = Symbol.for("react.profiler"), od = Symbol.for("react.provider"), ld = Symbol.for("react.context"), _a = Symbol.for("react.forward_ref"), ul = Symbol.for("react.suspense"), cl = Symbol.for("react.suspense_list"), xa = Symbol.for("react.memo"), Ne = Symbol.for("react.lazy"), ad = Symbol.for("react.offscreen"), Eu = Symbol.iterator;
function yi(e) {
  return e === null || typeof e != "object" ? null : (e = Eu && e[Eu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var et = Object.assign, So;
function Oi(e) {
  if (So === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    So = t && t[1] || "";
  }
  return `
` + So + e;
}
var bo = !1;
function Mo(e, t) {
  if (!e || bo) return "";
  bo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (u) {
        var i = u;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (u) {
        i = u;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        i = u;
      }
      e();
    }
  } catch (u) {
    if (u && i && typeof u.stack == "string") {
      for (var s = u.stack.split(`
`), r = i.stack.split(`
`), o = s.length - 1, l = r.length - 1; 1 <= o && 0 <= l && s[o] !== r[l]; ) l--;
      for (; 1 <= o && 0 <= l; o--, l--) if (s[o] !== r[l]) {
        if (o !== 1 || l !== 1)
          do
            if (o--, l--, 0 > l || s[o] !== r[l]) {
              var a = `
` + s[o].replace(" at new ", " at ");
              return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
            }
          while (1 <= o && 0 <= l);
        break;
      }
    }
  } finally {
    bo = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Oi(e) : "";
}
function _g(e) {
  switch (e.tag) {
    case 5:
      return Oi(e.type);
    case 16:
      return Oi("Lazy");
    case 13:
      return Oi("Suspense");
    case 19:
      return Oi("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Mo(e.type, !1), e;
    case 11:
      return e = Mo(e.type.render, !1), e;
    case 1:
      return e = Mo(e.type, !0), e;
    default:
      return "";
  }
}
function fl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Nn:
      return "Fragment";
    case Fn:
      return "Portal";
    case al:
      return "Profiler";
    case va:
      return "StrictMode";
    case ul:
      return "Suspense";
    case cl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ld:
      return (e.displayName || "Context") + ".Consumer";
    case od:
      return (e._context.displayName || "Context") + ".Provider";
    case _a:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case xa:
      return t = e.displayName || null, t !== null ? t : fl(e.type) || "Memo";
    case Ne:
      t = e._payload, e = e._init;
      try {
        return fl(e(t));
      } catch {
      }
  }
  return null;
}
function xg(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return fl(t);
    case 8:
      return t === va ? "StrictMode" : "Mode";
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
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function nn(e) {
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
function ud(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function wg(e) {
  var t = ud(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var s = n.get, r = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return s.call(this);
    }, set: function(o) {
      i = "" + o, r.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return i;
    }, setValue: function(o) {
      i = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Ls(e) {
  e._valueTracker || (e._valueTracker = wg(e));
}
function cd(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), i = "";
  return e && (i = ud(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
}
function Cr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function dl(e, t) {
  var n = t.checked;
  return et({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Tu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  n = nn(t.value != null ? t.value : n), e._wrapperState = { initialChecked: i, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function fd(e, t) {
  t = t.checked, t != null && ya(e, "checked", t, !1);
}
function hl(e, t) {
  fd(e, t);
  var n = nn(t.value), i = t.type;
  if (n != null) i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? pl(e, t.type, n) : t.hasOwnProperty("defaultValue") && pl(e, t.type, nn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ou(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function pl(e, t, n) {
  (t !== "number" || Cr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Di = Array.isArray;
function Gn(e, t, n, i) {
  if (e = e.options, t) {
    t = {};
    for (var s = 0; s < n.length; s++) t["$" + n[s]] = !0;
    for (n = 0; n < e.length; n++) s = t.hasOwnProperty("$" + e[n].value), e[n].selected !== s && (e[n].selected = s), s && i && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + nn(n), t = null, s = 0; s < e.length; s++) {
      if (e[s].value === n) {
        e[s].selected = !0, i && (e[s].defaultSelected = !0);
        return;
      }
      t !== null || e[s].disabled || (t = e[s]);
    }
    t !== null && (t.selected = !0);
  }
}
function gl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(M(91));
  return et({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Du(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(M(92));
      if (Di(n)) {
        if (1 < n.length) throw Error(M(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: nn(n) };
}
function dd(e, t) {
  var n = nn(t.value), i = nn(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), i != null && (e.defaultValue = "" + i);
}
function Ru(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function hd(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ml(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? hd(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var zs, pd = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, i, s) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, i, s);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (zs = zs || document.createElement("div"), zs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = zs.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function qi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Bi = {
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
}, kg = ["Webkit", "ms", "Moz", "O"];
Object.keys(Bi).forEach(function(e) {
  kg.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Bi[t] = Bi[e];
  });
});
function gd(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Bi.hasOwnProperty(e) && Bi[e] ? ("" + t).trim() : t + "px";
}
function md(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, s = gd(n, t[n], i);
    n === "float" && (n = "cssFloat"), i ? e.setProperty(n, s) : e[n] = s;
  }
}
var Sg = et({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function yl(e, t) {
  if (t) {
    if (Sg[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(M(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(M(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(M(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(M(62));
  }
}
function vl(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
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
var _l = null;
function wa(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var xl = null, Zn = null, Jn = null;
function Lu(e) {
  if (e = Cs(e)) {
    if (typeof xl != "function") throw Error(M(280));
    var t = e.stateNode;
    t && (t = ao(t), xl(e.stateNode, e.type, t));
  }
}
function yd(e) {
  Zn ? Jn ? Jn.push(e) : Jn = [e] : Zn = e;
}
function vd() {
  if (Zn) {
    var e = Zn, t = Jn;
    if (Jn = Zn = null, Lu(e), t) for (e = 0; e < t.length; e++) Lu(t[e]);
  }
}
function _d(e, t) {
  return e(t);
}
function xd() {
}
var Co = !1;
function wd(e, t, n) {
  if (Co) return e(t, n);
  Co = !0;
  try {
    return _d(e, t, n);
  } finally {
    Co = !1, (Zn !== null || Jn !== null) && (xd(), vd());
  }
}
function ts(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = ao(n);
  if (i === null) return null;
  n = i[t];
  t: switch (t) {
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
      (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
      break t;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(M(231, t, typeof n));
  return n;
}
var wl = !1;
if (Oe) try {
  var vi = {};
  Object.defineProperty(vi, "passive", { get: function() {
    wl = !0;
  } }), window.addEventListener("test", vi, vi), window.removeEventListener("test", vi, vi);
} catch {
  wl = !1;
}
function bg(e, t, n, i, s, r, o, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var ji = !1, Pr = null, Er = !1, kl = null, Mg = { onError: function(e) {
  ji = !0, Pr = e;
} };
function Cg(e, t, n, i, s, r, o, l, a) {
  ji = !1, Pr = null, bg.apply(Mg, arguments);
}
function Pg(e, t, n, i, s, r, o, l, a) {
  if (Cg.apply(this, arguments), ji) {
    if (ji) {
      var u = Pr;
      ji = !1, Pr = null;
    } else throw Error(M(198));
    Er || (Er = !0, kl = u);
  }
}
function Rn(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function kd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function zu(e) {
  if (Rn(e) !== e) throw Error(M(188));
}
function Eg(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Rn(e), t === null) throw Error(M(188));
    return t !== e ? null : e;
  }
  for (var n = e, i = t; ; ) {
    var s = n.return;
    if (s === null) break;
    var r = s.alternate;
    if (r === null) {
      if (i = s.return, i !== null) {
        n = i;
        continue;
      }
      break;
    }
    if (s.child === r.child) {
      for (r = s.child; r; ) {
        if (r === n) return zu(s), e;
        if (r === i) return zu(s), t;
        r = r.sibling;
      }
      throw Error(M(188));
    }
    if (n.return !== i.return) n = s, i = r;
    else {
      for (var o = !1, l = s.child; l; ) {
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
      if (!o) {
        for (l = r.child; l; ) {
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
        if (!o) throw Error(M(189));
      }
    }
    if (n.alternate !== i) throw Error(M(190));
  }
  if (n.tag !== 3) throw Error(M(188));
  return n.stateNode.current === n ? e : t;
}
function Sd(e) {
  return e = Eg(e), e !== null ? bd(e) : null;
}
function bd(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = bd(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Md = Ht.unstable_scheduleCallback, Au = Ht.unstable_cancelCallback, Tg = Ht.unstable_shouldYield, Og = Ht.unstable_requestPaint, ot = Ht.unstable_now, Dg = Ht.unstable_getCurrentPriorityLevel, ka = Ht.unstable_ImmediatePriority, Cd = Ht.unstable_UserBlockingPriority, Tr = Ht.unstable_NormalPriority, Rg = Ht.unstable_LowPriority, Pd = Ht.unstable_IdlePriority, so = null, me = null;
function Lg(e) {
  if (me && typeof me.onCommitFiberRoot == "function") try {
    me.onCommitFiberRoot(so, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var re = Math.clz32 ? Math.clz32 : Ig, zg = Math.log, Ag = Math.LN2;
function Ig(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (zg(e) / Ag | 0) | 0;
}
var As = 64, Is = 4194304;
function Ri(e) {
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
function Or(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var i = 0, s = e.suspendedLanes, r = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var l = o & ~s;
    l !== 0 ? i = Ri(l) : (r &= o, r !== 0 && (i = Ri(r)));
  } else o = n & ~s, o !== 0 ? i = Ri(o) : r !== 0 && (i = Ri(r));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & s) && (s = i & -i, r = t & -t, s >= r || s === 16 && (r & 4194240) !== 0)) return t;
  if (i & 4 && (i |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) n = 31 - re(t), s = 1 << n, i |= e[n], t &= ~s;
  return i;
}
function Fg(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
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
      return t + 5e3;
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
function Ng(e, t) {
  for (var n = e.suspendedLanes, i = e.pingedLanes, s = e.expirationTimes, r = e.pendingLanes; 0 < r; ) {
    var o = 31 - re(r), l = 1 << o, a = s[o];
    a === -1 ? (!(l & n) || l & i) && (s[o] = Fg(l, t)) : a <= t && (e.expiredLanes |= l), r &= ~l;
  }
}
function Sl(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ed() {
  var e = As;
  return As <<= 1, !(As & 4194240) && (As = 64), e;
}
function Po(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function bs(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - re(t), e[t] = n;
}
function Bg(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var s = 31 - re(n), r = 1 << s;
    t[s] = 0, i[s] = -1, e[s] = -1, n &= ~r;
  }
}
function Sa(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var i = 31 - re(n), s = 1 << i;
    s & t | e[i] & t && (e[i] |= t), n &= ~s;
  }
}
var W = 0;
function Td(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Od, ba, Dd, Rd, Ld, bl = !1, Fs = [], Xe = null, Ke = null, Qe = null, es = /* @__PURE__ */ new Map(), ns = /* @__PURE__ */ new Map(), je = [], jg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Iu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Xe = null;
      break;
    case "dragenter":
    case "dragleave":
      Ke = null;
      break;
    case "mouseover":
    case "mouseout":
      Qe = null;
      break;
    case "pointerover":
    case "pointerout":
      es.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ns.delete(t.pointerId);
  }
}
function _i(e, t, n, i, s, r) {
  return e === null || e.nativeEvent !== r ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: r, targetContainers: [s] }, t !== null && (t = Cs(t), t !== null && ba(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
}
function Wg(e, t, n, i, s) {
  switch (t) {
    case "focusin":
      return Xe = _i(Xe, e, t, n, i, s), !0;
    case "dragenter":
      return Ke = _i(Ke, e, t, n, i, s), !0;
    case "mouseover":
      return Qe = _i(Qe, e, t, n, i, s), !0;
    case "pointerover":
      var r = s.pointerId;
      return es.set(r, _i(es.get(r) || null, e, t, n, i, s)), !0;
    case "gotpointercapture":
      return r = s.pointerId, ns.set(r, _i(ns.get(r) || null, e, t, n, i, s)), !0;
  }
  return !1;
}
function zd(e) {
  var t = mn(e.target);
  if (t !== null) {
    var n = Rn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = kd(n), t !== null) {
          e.blockedOn = t, Ld(e.priority, function() {
            Dd(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function cr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ml(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      _l = i, n.target.dispatchEvent(i), _l = null;
    } else return t = Cs(n), t !== null && ba(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Fu(e, t, n) {
  cr(e) && n.delete(t);
}
function Hg() {
  bl = !1, Xe !== null && cr(Xe) && (Xe = null), Ke !== null && cr(Ke) && (Ke = null), Qe !== null && cr(Qe) && (Qe = null), es.forEach(Fu), ns.forEach(Fu);
}
function xi(e, t) {
  e.blockedOn === t && (e.blockedOn = null, bl || (bl = !0, Ht.unstable_scheduleCallback(Ht.unstable_NormalPriority, Hg)));
}
function is(e) {
  function t(s) {
    return xi(s, e);
  }
  if (0 < Fs.length) {
    xi(Fs[0], e);
    for (var n = 1; n < Fs.length; n++) {
      var i = Fs[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (Xe !== null && xi(Xe, e), Ke !== null && xi(Ke, e), Qe !== null && xi(Qe, e), es.forEach(t), ns.forEach(t), n = 0; n < je.length; n++) i = je[n], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < je.length && (n = je[0], n.blockedOn === null); ) zd(n), n.blockedOn === null && je.shift();
}
var qn = ze.ReactCurrentBatchConfig, Dr = !0;
function Vg(e, t, n, i) {
  var s = W, r = qn.transition;
  qn.transition = null;
  try {
    W = 1, Ma(e, t, n, i);
  } finally {
    W = s, qn.transition = r;
  }
}
function $g(e, t, n, i) {
  var s = W, r = qn.transition;
  qn.transition = null;
  try {
    W = 4, Ma(e, t, n, i);
  } finally {
    W = s, qn.transition = r;
  }
}
function Ma(e, t, n, i) {
  if (Dr) {
    var s = Ml(e, t, n, i);
    if (s === null) Fo(e, t, i, Rr, n), Iu(e, i);
    else if (Wg(s, e, t, n, i)) i.stopPropagation();
    else if (Iu(e, i), t & 4 && -1 < jg.indexOf(e)) {
      for (; s !== null; ) {
        var r = Cs(s);
        if (r !== null && Od(r), r = Ml(e, t, n, i), r === null && Fo(e, t, i, Rr, n), r === s) break;
        s = r;
      }
      s !== null && i.stopPropagation();
    } else Fo(e, t, i, null, n);
  }
}
var Rr = null;
function Ml(e, t, n, i) {
  if (Rr = null, e = wa(i), e = mn(e), e !== null) if (t = Rn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = kd(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Rr = e, null;
}
function Ad(e) {
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
      switch (Dg()) {
        case ka:
          return 1;
        case Cd:
          return 4;
        case Tr:
        case Rg:
          return 16;
        case Pd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var He = null, Ca = null, fr = null;
function Id() {
  if (fr) return fr;
  var e, t = Ca, n = t.length, i, s = "value" in He ? He.value : He.textContent, r = s.length;
  for (e = 0; e < n && t[e] === s[e]; e++) ;
  var o = n - e;
  for (i = 1; i <= o && t[n - i] === s[r - i]; i++) ;
  return fr = s.slice(e, 1 < i ? 1 - i : void 0);
}
function dr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Ns() {
  return !0;
}
function Nu() {
  return !1;
}
function $t(e) {
  function t(n, i, s, r, o) {
    this._reactName = n, this._targetInst = s, this.type = i, this.nativeEvent = r, this.target = o, this.currentTarget = null;
    for (var l in e) e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(r) : r[l]);
    return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Ns : Nu, this.isPropagationStopped = Nu, this;
  }
  return et(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ns);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ns);
  }, persist: function() {
  }, isPersistent: Ns }), t;
}
var pi = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Pa = $t(pi), Ms = et({}, pi, { view: 0, detail: 0 }), Ug = $t(Ms), Eo, To, wi, ro = et({}, Ms, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ea, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== wi && (wi && e.type === "mousemove" ? (Eo = e.screenX - wi.screenX, To = e.screenY - wi.screenY) : To = Eo = 0, wi = e), Eo);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : To;
} }), Bu = $t(ro), Yg = et({}, ro, { dataTransfer: 0 }), Xg = $t(Yg), Kg = et({}, Ms, { relatedTarget: 0 }), Oo = $t(Kg), Qg = et({}, pi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Gg = $t(Qg), Zg = et({}, pi, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Jg = $t(Zg), qg = et({}, pi, { data: 0 }), ju = $t(qg), tm = {
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
}, em = {
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
}, nm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function im(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = nm[e]) ? !!t[e] : !1;
}
function Ea() {
  return im;
}
var sm = et({}, Ms, { key: function(e) {
  if (e.key) {
    var t = tm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = dr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? em[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ea, charCode: function(e) {
  return e.type === "keypress" ? dr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? dr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), rm = $t(sm), om = et({}, ro, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Wu = $t(om), lm = et({}, Ms, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ea }), am = $t(lm), um = et({}, pi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), cm = $t(um), fm = et({}, ro, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), dm = $t(fm), hm = [9, 13, 27, 32], Ta = Oe && "CompositionEvent" in window, Wi = null;
Oe && "documentMode" in document && (Wi = document.documentMode);
var pm = Oe && "TextEvent" in window && !Wi, Fd = Oe && (!Ta || Wi && 8 < Wi && 11 >= Wi), Hu = " ", Vu = !1;
function Nd(e, t) {
  switch (e) {
    case "keyup":
      return hm.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Bd(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Bn = !1;
function gm(e, t) {
  switch (e) {
    case "compositionend":
      return Bd(t);
    case "keypress":
      return t.which !== 32 ? null : (Vu = !0, Hu);
    case "textInput":
      return e = t.data, e === Hu && Vu ? null : e;
    default:
      return null;
  }
}
function mm(e, t) {
  if (Bn) return e === "compositionend" || !Ta && Nd(e, t) ? (e = Id(), fr = Ca = He = null, Bn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Fd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ym = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function $u(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ym[e.type] : t === "textarea";
}
function jd(e, t, n, i) {
  yd(i), t = Lr(t, "onChange"), 0 < t.length && (n = new Pa("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
}
var Hi = null, ss = null;
function vm(e) {
  Zd(e, 0);
}
function oo(e) {
  var t = Hn(e);
  if (cd(t)) return e;
}
function _m(e, t) {
  if (e === "change") return t;
}
var Wd = !1;
if (Oe) {
  var Do;
  if (Oe) {
    var Ro = "oninput" in document;
    if (!Ro) {
      var Uu = document.createElement("div");
      Uu.setAttribute("oninput", "return;"), Ro = typeof Uu.oninput == "function";
    }
    Do = Ro;
  } else Do = !1;
  Wd = Do && (!document.documentMode || 9 < document.documentMode);
}
function Yu() {
  Hi && (Hi.detachEvent("onpropertychange", Hd), ss = Hi = null);
}
function Hd(e) {
  if (e.propertyName === "value" && oo(ss)) {
    var t = [];
    jd(t, ss, e, wa(e)), wd(vm, t);
  }
}
function xm(e, t, n) {
  e === "focusin" ? (Yu(), Hi = t, ss = n, Hi.attachEvent("onpropertychange", Hd)) : e === "focusout" && Yu();
}
function wm(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return oo(ss);
}
function km(e, t) {
  if (e === "click") return oo(t);
}
function Sm(e, t) {
  if (e === "input" || e === "change") return oo(t);
}
function bm(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var le = typeof Object.is == "function" ? Object.is : bm;
function rs(e, t) {
  if (le(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var s = n[i];
    if (!ll.call(t, s) || !le(e[s], t[s])) return !1;
  }
  return !0;
}
function Xu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ku(e, t) {
  var n = Xu(e);
  e = 0;
  for (var i; n; ) {
    if (n.nodeType === 3) {
      if (i = e + n.textContent.length, e <= t && i >= t) return { node: n, offset: t - e };
      e = i;
    }
    t: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break t;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Xu(n);
  }
}
function Vd(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Vd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function $d() {
  for (var e = window, t = Cr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Cr(e.document);
  }
  return t;
}
function Oa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Mm(e) {
  var t = $d(), n = e.focusedElem, i = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Vd(n.ownerDocument.documentElement, n)) {
    if (i !== null && Oa(n)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var s = n.textContent.length, r = Math.min(i.start, s);
        i = i.end === void 0 ? r : Math.min(i.end, s), !e.extend && r > i && (s = i, i = r, r = s), s = Ku(n, r);
        var o = Ku(
          n,
          i
        );
        s && o && (e.rangeCount !== 1 || e.anchorNode !== s.node || e.anchorOffset !== s.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(s.node, s.offset), e.removeAllRanges(), r > i ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Cm = Oe && "documentMode" in document && 11 >= document.documentMode, jn = null, Cl = null, Vi = null, Pl = !1;
function Qu(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Pl || jn == null || jn !== Cr(i) || (i = jn, "selectionStart" in i && Oa(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), Vi && rs(Vi, i) || (Vi = i, i = Lr(Cl, "onSelect"), 0 < i.length && (t = new Pa("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = jn)));
}
function Bs(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Wn = { animationend: Bs("Animation", "AnimationEnd"), animationiteration: Bs("Animation", "AnimationIteration"), animationstart: Bs("Animation", "AnimationStart"), transitionend: Bs("Transition", "TransitionEnd") }, Lo = {}, Ud = {};
Oe && (Ud = document.createElement("div").style, "AnimationEvent" in window || (delete Wn.animationend.animation, delete Wn.animationiteration.animation, delete Wn.animationstart.animation), "TransitionEvent" in window || delete Wn.transitionend.transition);
function lo(e) {
  if (Lo[e]) return Lo[e];
  if (!Wn[e]) return e;
  var t = Wn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ud) return Lo[e] = t[n];
  return e;
}
var Yd = lo("animationend"), Xd = lo("animationiteration"), Kd = lo("animationstart"), Qd = lo("transitionend"), Gd = /* @__PURE__ */ new Map(), Gu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function on(e, t) {
  Gd.set(e, t), Dn(t, [e]);
}
for (var zo = 0; zo < Gu.length; zo++) {
  var Ao = Gu[zo], Pm = Ao.toLowerCase(), Em = Ao[0].toUpperCase() + Ao.slice(1);
  on(Pm, "on" + Em);
}
on(Yd, "onAnimationEnd");
on(Xd, "onAnimationIteration");
on(Kd, "onAnimationStart");
on("dblclick", "onDoubleClick");
on("focusin", "onFocus");
on("focusout", "onBlur");
on(Qd, "onTransitionEnd");
si("onMouseEnter", ["mouseout", "mouseover"]);
si("onMouseLeave", ["mouseout", "mouseover"]);
si("onPointerEnter", ["pointerout", "pointerover"]);
si("onPointerLeave", ["pointerout", "pointerover"]);
Dn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Dn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Dn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Dn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Dn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Dn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Li = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Tm = new Set("cancel close invalid load scroll toggle".split(" ").concat(Li));
function Zu(e, t, n) {
  var i = e.type || "unknown-event";
  e.currentTarget = n, Pg(i, t, void 0, e), e.currentTarget = null;
}
function Zd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n], s = i.event;
    i = i.listeners;
    t: {
      var r = void 0;
      if (t) for (var o = i.length - 1; 0 <= o; o--) {
        var l = i[o], a = l.instance, u = l.currentTarget;
        if (l = l.listener, a !== r && s.isPropagationStopped()) break t;
        Zu(s, l, u), r = a;
      }
      else for (o = 0; o < i.length; o++) {
        if (l = i[o], a = l.instance, u = l.currentTarget, l = l.listener, a !== r && s.isPropagationStopped()) break t;
        Zu(s, l, u), r = a;
      }
    }
  }
  if (Er) throw e = kl, Er = !1, kl = null, e;
}
function K(e, t) {
  var n = t[Rl];
  n === void 0 && (n = t[Rl] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  n.has(i) || (Jd(t, e, 2, !1), n.add(i));
}
function Io(e, t, n) {
  var i = 0;
  t && (i |= 4), Jd(n, e, i, t);
}
var js = "_reactListening" + Math.random().toString(36).slice(2);
function os(e) {
  if (!e[js]) {
    e[js] = !0, rd.forEach(function(n) {
      n !== "selectionchange" && (Tm.has(n) || Io(n, !1, e), Io(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[js] || (t[js] = !0, Io("selectionchange", !1, t));
  }
}
function Jd(e, t, n, i) {
  switch (Ad(t)) {
    case 1:
      var s = Vg;
      break;
    case 4:
      s = $g;
      break;
    default:
      s = Ma;
  }
  n = s.bind(null, t, n, e), s = void 0, !wl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), i ? s !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: s }) : e.addEventListener(t, n, !0) : s !== void 0 ? e.addEventListener(t, n, { passive: s }) : e.addEventListener(t, n, !1);
}
function Fo(e, t, n, i, s) {
  var r = i;
  if (!(t & 1) && !(t & 2) && i !== null) t: for (; ; ) {
    if (i === null) return;
    var o = i.tag;
    if (o === 3 || o === 4) {
      var l = i.stateNode.containerInfo;
      if (l === s || l.nodeType === 8 && l.parentNode === s) break;
      if (o === 4) for (o = i.return; o !== null; ) {
        var a = o.tag;
        if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === s || a.nodeType === 8 && a.parentNode === s)) return;
        o = o.return;
      }
      for (; l !== null; ) {
        if (o = mn(l), o === null) return;
        if (a = o.tag, a === 5 || a === 6) {
          i = r = o;
          continue t;
        }
        l = l.parentNode;
      }
    }
    i = i.return;
  }
  wd(function() {
    var u = r, c = wa(n), f = [];
    t: {
      var d = Gd.get(e);
      if (d !== void 0) {
        var h = Pa, m = e;
        switch (e) {
          case "keypress":
            if (dr(n) === 0) break t;
          case "keydown":
          case "keyup":
            h = rm;
            break;
          case "focusin":
            m = "focus", h = Oo;
            break;
          case "focusout":
            m = "blur", h = Oo;
            break;
          case "beforeblur":
          case "afterblur":
            h = Oo;
            break;
          case "click":
            if (n.button === 2) break t;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = Bu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = Xg;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = am;
            break;
          case Yd:
          case Xd:
          case Kd:
            h = Gg;
            break;
          case Qd:
            h = cm;
            break;
          case "scroll":
            h = Ug;
            break;
          case "wheel":
            h = dm;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = Jg;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = Wu;
        }
        var y = (t & 4) !== 0, _ = !y && e === "scroll", p = y ? d !== null ? d + "Capture" : null : d;
        y = [];
        for (var g = u, v; g !== null; ) {
          v = g;
          var x = v.stateNode;
          if (v.tag === 5 && x !== null && (v = x, p !== null && (x = ts(g, p), x != null && y.push(ls(g, x, v)))), _) break;
          g = g.return;
        }
        0 < y.length && (d = new h(d, m, null, n, c), f.push({ event: d, listeners: y }));
      }
    }
    if (!(t & 7)) {
      t: {
        if (d = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", d && n !== _l && (m = n.relatedTarget || n.fromElement) && (mn(m) || m[De])) break t;
        if ((h || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, h ? (m = n.relatedTarget || n.toElement, h = u, m = m ? mn(m) : null, m !== null && (_ = Rn(m), m !== _ || m.tag !== 5 && m.tag !== 6) && (m = null)) : (h = null, m = u), h !== m)) {
          if (y = Bu, x = "onMouseLeave", p = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (y = Wu, x = "onPointerLeave", p = "onPointerEnter", g = "pointer"), _ = h == null ? d : Hn(h), v = m == null ? d : Hn(m), d = new y(x, g + "leave", h, n, c), d.target = _, d.relatedTarget = v, x = null, mn(c) === u && (y = new y(p, g + "enter", m, n, c), y.target = v, y.relatedTarget = _, x = y), _ = x, h && m) e: {
            for (y = h, p = m, g = 0, v = y; v; v = zn(v)) g++;
            for (v = 0, x = p; x; x = zn(x)) v++;
            for (; 0 < g - v; ) y = zn(y), g--;
            for (; 0 < v - g; ) p = zn(p), v--;
            for (; g--; ) {
              if (y === p || p !== null && y === p.alternate) break e;
              y = zn(y), p = zn(p);
            }
            y = null;
          }
          else y = null;
          h !== null && Ju(f, d, h, y, !1), m !== null && _ !== null && Ju(f, _, m, y, !0);
        }
      }
      t: {
        if (d = u ? Hn(u) : window, h = d.nodeName && d.nodeName.toLowerCase(), h === "select" || h === "input" && d.type === "file") var w = _m;
        else if ($u(d)) if (Wd) w = Sm;
        else {
          w = wm;
          var k = xm;
        }
        else (h = d.nodeName) && h.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (w = km);
        if (w && (w = w(e, u))) {
          jd(f, w, n, c);
          break t;
        }
        k && k(e, d, u), e === "focusout" && (k = d._wrapperState) && k.controlled && d.type === "number" && pl(d, "number", d.value);
      }
      switch (k = u ? Hn(u) : window, e) {
        case "focusin":
          ($u(k) || k.contentEditable === "true") && (jn = k, Cl = u, Vi = null);
          break;
        case "focusout":
          Vi = Cl = jn = null;
          break;
        case "mousedown":
          Pl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Pl = !1, Qu(f, n, c);
          break;
        case "selectionchange":
          if (Cm) break;
        case "keydown":
        case "keyup":
          Qu(f, n, c);
      }
      var S;
      if (Ta) t: {
        switch (e) {
          case "compositionstart":
            var b = "onCompositionStart";
            break t;
          case "compositionend":
            b = "onCompositionEnd";
            break t;
          case "compositionupdate":
            b = "onCompositionUpdate";
            break t;
        }
        b = void 0;
      }
      else Bn ? Nd(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
      b && (Fd && n.locale !== "ko" && (Bn || b !== "onCompositionStart" ? b === "onCompositionEnd" && Bn && (S = Id()) : (He = c, Ca = "value" in He ? He.value : He.textContent, Bn = !0)), k = Lr(u, b), 0 < k.length && (b = new ju(b, e, null, n, c), f.push({ event: b, listeners: k }), S ? b.data = S : (S = Bd(n), S !== null && (b.data = S)))), (S = pm ? gm(e, n) : mm(e, n)) && (u = Lr(u, "onBeforeInput"), 0 < u.length && (c = new ju("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: u }), c.data = S));
    }
    Zd(f, t);
  });
}
function ls(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Lr(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var s = e, r = s.stateNode;
    s.tag === 5 && r !== null && (s = r, r = ts(e, n), r != null && i.unshift(ls(e, r, s)), r = ts(e, t), r != null && i.push(ls(e, r, s))), e = e.return;
  }
  return i;
}
function zn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ju(e, t, n, i, s) {
  for (var r = t._reactName, o = []; n !== null && n !== i; ) {
    var l = n, a = l.alternate, u = l.stateNode;
    if (a !== null && a === i) break;
    l.tag === 5 && u !== null && (l = u, s ? (a = ts(n, r), a != null && o.unshift(ls(n, a, l))) : s || (a = ts(n, r), a != null && o.push(ls(n, a, l)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Om = /\r\n?/g, Dm = /\u0000|\uFFFD/g;
function qu(e) {
  return (typeof e == "string" ? e : "" + e).replace(Om, `
`).replace(Dm, "");
}
function Ws(e, t, n) {
  if (t = qu(t), qu(e) !== t && n) throw Error(M(425));
}
function zr() {
}
var El = null, Tl = null;
function Ol(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Dl = typeof setTimeout == "function" ? setTimeout : void 0, Rm = typeof clearTimeout == "function" ? clearTimeout : void 0, tc = typeof Promise == "function" ? Promise : void 0, Lm = typeof queueMicrotask == "function" ? queueMicrotask : typeof tc < "u" ? function(e) {
  return tc.resolve(null).then(e).catch(zm);
} : Dl;
function zm(e) {
  setTimeout(function() {
    throw e;
  });
}
function No(e, t) {
  var n = t, i = 0;
  do {
    var s = n.nextSibling;
    if (e.removeChild(n), s && s.nodeType === 8) if (n = s.data, n === "/$") {
      if (i === 0) {
        e.removeChild(s), is(t);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = s;
  } while (n);
  is(t);
}
function Ge(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ec(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var gi = Math.random().toString(36).slice(2), ge = "__reactFiber$" + gi, as = "__reactProps$" + gi, De = "__reactContainer$" + gi, Rl = "__reactEvents$" + gi, Am = "__reactListeners$" + gi, Im = "__reactHandles$" + gi;
function mn(e) {
  var t = e[ge];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[De] || n[ge]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ec(e); e !== null; ) {
        if (n = e[ge]) return n;
        e = ec(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Cs(e) {
  return e = e[ge] || e[De], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Hn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(M(33));
}
function ao(e) {
  return e[as] || null;
}
var Ll = [], Vn = -1;
function ln(e) {
  return { current: e };
}
function G(e) {
  0 > Vn || (e.current = Ll[Vn], Ll[Vn] = null, Vn--);
}
function $(e, t) {
  Vn++, Ll[Vn] = e.current, e.current = t;
}
var sn = {}, Mt = ln(sn), It = ln(!1), bn = sn;
function ri(e, t) {
  var n = e.type.contextTypes;
  if (!n) return sn;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var s = {}, r;
  for (r in n) s[r] = t[r];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = s), s;
}
function Ft(e) {
  return e = e.childContextTypes, e != null;
}
function Ar() {
  G(It), G(Mt);
}
function nc(e, t, n) {
  if (Mt.current !== sn) throw Error(M(168));
  $(Mt, t), $(It, n);
}
function qd(e, t, n) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var s in i) if (!(s in t)) throw Error(M(108, xg(e) || "Unknown", s));
  return et({}, n, i);
}
function Ir(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || sn, bn = Mt.current, $(Mt, e), $(It, It.current), !0;
}
function ic(e, t, n) {
  var i = e.stateNode;
  if (!i) throw Error(M(169));
  n ? (e = qd(e, t, bn), i.__reactInternalMemoizedMergedChildContext = e, G(It), G(Mt), $(Mt, e)) : G(It), $(It, n);
}
var be = null, uo = !1, Bo = !1;
function th(e) {
  be === null ? be = [e] : be.push(e);
}
function Fm(e) {
  uo = !0, th(e);
}
function an() {
  if (!Bo && be !== null) {
    Bo = !0;
    var e = 0, t = W;
    try {
      var n = be;
      for (W = 1; e < n.length; e++) {
        var i = n[e];
        do
          i = i(!0);
        while (i !== null);
      }
      be = null, uo = !1;
    } catch (s) {
      throw be !== null && (be = be.slice(e + 1)), Md(ka, an), s;
    } finally {
      W = t, Bo = !1;
    }
  }
  return null;
}
var $n = [], Un = 0, Fr = null, Nr = 0, Yt = [], Xt = 0, Mn = null, Ce = 1, Pe = "";
function dn(e, t) {
  $n[Un++] = Nr, $n[Un++] = Fr, Fr = e, Nr = t;
}
function eh(e, t, n) {
  Yt[Xt++] = Ce, Yt[Xt++] = Pe, Yt[Xt++] = Mn, Mn = e;
  var i = Ce;
  e = Pe;
  var s = 32 - re(i) - 1;
  i &= ~(1 << s), n += 1;
  var r = 32 - re(t) + s;
  if (30 < r) {
    var o = s - s % 5;
    r = (i & (1 << o) - 1).toString(32), i >>= o, s -= o, Ce = 1 << 32 - re(t) + s | n << s | i, Pe = r + e;
  } else Ce = 1 << r | n << s | i, Pe = e;
}
function Da(e) {
  e.return !== null && (dn(e, 1), eh(e, 1, 0));
}
function Ra(e) {
  for (; e === Fr; ) Fr = $n[--Un], $n[Un] = null, Nr = $n[--Un], $n[Un] = null;
  for (; e === Mn; ) Mn = Yt[--Xt], Yt[Xt] = null, Pe = Yt[--Xt], Yt[Xt] = null, Ce = Yt[--Xt], Yt[Xt] = null;
}
var Wt = null, jt = null, Z = !1, se = null;
function nh(e, t) {
  var n = Kt(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function sc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Wt = e, jt = Ge(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Wt = e, jt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Mn !== null ? { id: Ce, overflow: Pe } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Kt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Wt = e, jt = null, !0) : !1;
    default:
      return !1;
  }
}
function zl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Al(e) {
  if (Z) {
    var t = jt;
    if (t) {
      var n = t;
      if (!sc(e, t)) {
        if (zl(e)) throw Error(M(418));
        t = Ge(n.nextSibling);
        var i = Wt;
        t && sc(e, t) ? nh(i, n) : (e.flags = e.flags & -4097 | 2, Z = !1, Wt = e);
      }
    } else {
      if (zl(e)) throw Error(M(418));
      e.flags = e.flags & -4097 | 2, Z = !1, Wt = e;
    }
  }
}
function rc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Wt = e;
}
function Hs(e) {
  if (e !== Wt) return !1;
  if (!Z) return rc(e), Z = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ol(e.type, e.memoizedProps)), t && (t = jt)) {
    if (zl(e)) throw ih(), Error(M(418));
    for (; t; ) nh(e, t), t = Ge(t.nextSibling);
  }
  if (rc(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(M(317));
    t: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              jt = Ge(e.nextSibling);
              break t;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      jt = null;
    }
  } else jt = Wt ? Ge(e.stateNode.nextSibling) : null;
  return !0;
}
function ih() {
  for (var e = jt; e; ) e = Ge(e.nextSibling);
}
function oi() {
  jt = Wt = null, Z = !1;
}
function La(e) {
  se === null ? se = [e] : se.push(e);
}
var Nm = ze.ReactCurrentBatchConfig;
function ki(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(M(309));
        var i = n.stateNode;
      }
      if (!i) throw Error(M(147, e));
      var s = i, r = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === r ? t.ref : (t = function(o) {
        var l = s.refs;
        o === null ? delete l[r] : l[r] = o;
      }, t._stringRef = r, t);
    }
    if (typeof e != "string") throw Error(M(284));
    if (!n._owner) throw Error(M(290, e));
  }
  return e;
}
function Vs(e, t) {
  throw e = Object.prototype.toString.call(t), Error(M(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function oc(e) {
  var t = e._init;
  return t(e._payload);
}
function sh(e) {
  function t(p, g) {
    if (e) {
      var v = p.deletions;
      v === null ? (p.deletions = [g], p.flags |= 16) : v.push(g);
    }
  }
  function n(p, g) {
    if (!e) return null;
    for (; g !== null; ) t(p, g), g = g.sibling;
    return null;
  }
  function i(p, g) {
    for (p = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? p.set(g.key, g) : p.set(g.index, g), g = g.sibling;
    return p;
  }
  function s(p, g) {
    return p = tn(p, g), p.index = 0, p.sibling = null, p;
  }
  function r(p, g, v) {
    return p.index = v, e ? (v = p.alternate, v !== null ? (v = v.index, v < g ? (p.flags |= 2, g) : v) : (p.flags |= 2, g)) : (p.flags |= 1048576, g);
  }
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function l(p, g, v, x) {
    return g === null || g.tag !== 6 ? (g = Yo(v, p.mode, x), g.return = p, g) : (g = s(g, v), g.return = p, g);
  }
  function a(p, g, v, x) {
    var w = v.type;
    return w === Nn ? c(p, g, v.props.children, x, v.key) : g !== null && (g.elementType === w || typeof w == "object" && w !== null && w.$$typeof === Ne && oc(w) === g.type) ? (x = s(g, v.props), x.ref = ki(p, g, v), x.return = p, x) : (x = _r(v.type, v.key, v.props, null, p.mode, x), x.ref = ki(p, g, v), x.return = p, x);
  }
  function u(p, g, v, x) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== v.containerInfo || g.stateNode.implementation !== v.implementation ? (g = Xo(v, p.mode, x), g.return = p, g) : (g = s(g, v.children || []), g.return = p, g);
  }
  function c(p, g, v, x, w) {
    return g === null || g.tag !== 7 ? (g = wn(v, p.mode, x, w), g.return = p, g) : (g = s(g, v), g.return = p, g);
  }
  function f(p, g, v) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = Yo("" + g, p.mode, v), g.return = p, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Rs:
          return v = _r(g.type, g.key, g.props, null, p.mode, v), v.ref = ki(p, null, g), v.return = p, v;
        case Fn:
          return g = Xo(g, p.mode, v), g.return = p, g;
        case Ne:
          var x = g._init;
          return f(p, x(g._payload), v);
      }
      if (Di(g) || yi(g)) return g = wn(g, p.mode, v, null), g.return = p, g;
      Vs(p, g);
    }
    return null;
  }
  function d(p, g, v, x) {
    var w = g !== null ? g.key : null;
    if (typeof v == "string" && v !== "" || typeof v == "number") return w !== null ? null : l(p, g, "" + v, x);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Rs:
          return v.key === w ? a(p, g, v, x) : null;
        case Fn:
          return v.key === w ? u(p, g, v, x) : null;
        case Ne:
          return w = v._init, d(
            p,
            g,
            w(v._payload),
            x
          );
      }
      if (Di(v) || yi(v)) return w !== null ? null : c(p, g, v, x, null);
      Vs(p, v);
    }
    return null;
  }
  function h(p, g, v, x, w) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return p = p.get(v) || null, l(g, p, "" + x, w);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Rs:
          return p = p.get(x.key === null ? v : x.key) || null, a(g, p, x, w);
        case Fn:
          return p = p.get(x.key === null ? v : x.key) || null, u(g, p, x, w);
        case Ne:
          var k = x._init;
          return h(p, g, v, k(x._payload), w);
      }
      if (Di(x) || yi(x)) return p = p.get(v) || null, c(g, p, x, w, null);
      Vs(g, x);
    }
    return null;
  }
  function m(p, g, v, x) {
    for (var w = null, k = null, S = g, b = g = 0, E = null; S !== null && b < v.length; b++) {
      S.index > b ? (E = S, S = null) : E = S.sibling;
      var P = d(p, S, v[b], x);
      if (P === null) {
        S === null && (S = E);
        break;
      }
      e && S && P.alternate === null && t(p, S), g = r(P, g, b), k === null ? w = P : k.sibling = P, k = P, S = E;
    }
    if (b === v.length) return n(p, S), Z && dn(p, b), w;
    if (S === null) {
      for (; b < v.length; b++) S = f(p, v[b], x), S !== null && (g = r(S, g, b), k === null ? w = S : k.sibling = S, k = S);
      return Z && dn(p, b), w;
    }
    for (S = i(p, S); b < v.length; b++) E = h(S, p, b, v[b], x), E !== null && (e && E.alternate !== null && S.delete(E.key === null ? b : E.key), g = r(E, g, b), k === null ? w = E : k.sibling = E, k = E);
    return e && S.forEach(function(R) {
      return t(p, R);
    }), Z && dn(p, b), w;
  }
  function y(p, g, v, x) {
    var w = yi(v);
    if (typeof w != "function") throw Error(M(150));
    if (v = w.call(v), v == null) throw Error(M(151));
    for (var k = w = null, S = g, b = g = 0, E = null, P = v.next(); S !== null && !P.done; b++, P = v.next()) {
      S.index > b ? (E = S, S = null) : E = S.sibling;
      var R = d(p, S, P.value, x);
      if (R === null) {
        S === null && (S = E);
        break;
      }
      e && S && R.alternate === null && t(p, S), g = r(R, g, b), k === null ? w = R : k.sibling = R, k = R, S = E;
    }
    if (P.done) return n(
      p,
      S
    ), Z && dn(p, b), w;
    if (S === null) {
      for (; !P.done; b++, P = v.next()) P = f(p, P.value, x), P !== null && (g = r(P, g, b), k === null ? w = P : k.sibling = P, k = P);
      return Z && dn(p, b), w;
    }
    for (S = i(p, S); !P.done; b++, P = v.next()) P = h(S, p, b, P.value, x), P !== null && (e && P.alternate !== null && S.delete(P.key === null ? b : P.key), g = r(P, g, b), k === null ? w = P : k.sibling = P, k = P);
    return e && S.forEach(function(z) {
      return t(p, z);
    }), Z && dn(p, b), w;
  }
  function _(p, g, v, x) {
    if (typeof v == "object" && v !== null && v.type === Nn && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Rs:
          t: {
            for (var w = v.key, k = g; k !== null; ) {
              if (k.key === w) {
                if (w = v.type, w === Nn) {
                  if (k.tag === 7) {
                    n(p, k.sibling), g = s(k, v.props.children), g.return = p, p = g;
                    break t;
                  }
                } else if (k.elementType === w || typeof w == "object" && w !== null && w.$$typeof === Ne && oc(w) === k.type) {
                  n(p, k.sibling), g = s(k, v.props), g.ref = ki(p, k, v), g.return = p, p = g;
                  break t;
                }
                n(p, k);
                break;
              } else t(p, k);
              k = k.sibling;
            }
            v.type === Nn ? (g = wn(v.props.children, p.mode, x, v.key), g.return = p, p = g) : (x = _r(v.type, v.key, v.props, null, p.mode, x), x.ref = ki(p, g, v), x.return = p, p = x);
          }
          return o(p);
        case Fn:
          t: {
            for (k = v.key; g !== null; ) {
              if (g.key === k) if (g.tag === 4 && g.stateNode.containerInfo === v.containerInfo && g.stateNode.implementation === v.implementation) {
                n(p, g.sibling), g = s(g, v.children || []), g.return = p, p = g;
                break t;
              } else {
                n(p, g);
                break;
              }
              else t(p, g);
              g = g.sibling;
            }
            g = Xo(v, p.mode, x), g.return = p, p = g;
          }
          return o(p);
        case Ne:
          return k = v._init, _(p, g, k(v._payload), x);
      }
      if (Di(v)) return m(p, g, v, x);
      if (yi(v)) return y(p, g, v, x);
      Vs(p, v);
    }
    return typeof v == "string" && v !== "" || typeof v == "number" ? (v = "" + v, g !== null && g.tag === 6 ? (n(p, g.sibling), g = s(g, v), g.return = p, p = g) : (n(p, g), g = Yo(v, p.mode, x), g.return = p, p = g), o(p)) : n(p, g);
  }
  return _;
}
var li = sh(!0), rh = sh(!1), Br = ln(null), jr = null, Yn = null, za = null;
function Aa() {
  za = Yn = jr = null;
}
function Ia(e) {
  var t = Br.current;
  G(Br), e._currentValue = t;
}
function Il(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function ti(e, t) {
  jr = e, za = Yn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (At = !0), e.firstContext = null);
}
function Zt(e) {
  var t = e._currentValue;
  if (za !== e) if (e = { context: e, memoizedValue: t, next: null }, Yn === null) {
    if (jr === null) throw Error(M(308));
    Yn = e, jr.dependencies = { lanes: 0, firstContext: e };
  } else Yn = Yn.next = e;
  return t;
}
var yn = null;
function Fa(e) {
  yn === null ? yn = [e] : yn.push(e);
}
function oh(e, t, n, i) {
  var s = t.interleaved;
  return s === null ? (n.next = n, Fa(t)) : (n.next = s.next, s.next = n), t.interleaved = n, Re(e, i);
}
function Re(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Be = !1;
function Na(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Te(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Ze(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, F & 2) {
    var s = i.pending;
    return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, Re(e, n);
  }
  return s = i.interleaved, s === null ? (t.next = t, Fa(i)) : (t.next = s.next, s.next = t), i.interleaved = t, Re(e, n);
}
function hr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, Sa(e, n);
  }
}
function lc(e, t) {
  var n = e.updateQueue, i = e.alternate;
  if (i !== null && (i = i.updateQueue, n === i)) {
    var s = null, r = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        r === null ? s = r = o : r = r.next = o, n = n.next;
      } while (n !== null);
      r === null ? s = r = t : r = r.next = t;
    } else s = r = t;
    n = { baseState: i.baseState, firstBaseUpdate: s, lastBaseUpdate: r, shared: i.shared, effects: i.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Wr(e, t, n, i) {
  var s = e.updateQueue;
  Be = !1;
  var r = s.firstBaseUpdate, o = s.lastBaseUpdate, l = s.shared.pending;
  if (l !== null) {
    s.shared.pending = null;
    var a = l, u = a.next;
    a.next = null, o === null ? r = u : o.next = u, o = a;
    var c = e.alternate;
    c !== null && (c = c.updateQueue, l = c.lastBaseUpdate, l !== o && (l === null ? c.firstBaseUpdate = u : l.next = u, c.lastBaseUpdate = a));
  }
  if (r !== null) {
    var f = s.baseState;
    o = 0, c = u = a = null, l = r;
    do {
      var d = l.lane, h = l.eventTime;
      if ((i & d) === d) {
        c !== null && (c = c.next = {
          eventTime: h,
          lane: 0,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null
        });
        t: {
          var m = e, y = l;
          switch (d = t, h = n, y.tag) {
            case 1:
              if (m = y.payload, typeof m == "function") {
                f = m.call(h, f, d);
                break t;
              }
              f = m;
              break t;
            case 3:
              m.flags = m.flags & -65537 | 128;
            case 0:
              if (m = y.payload, d = typeof m == "function" ? m.call(h, f, d) : m, d == null) break t;
              f = et({}, f, d);
              break t;
            case 2:
              Be = !0;
          }
        }
        l.callback !== null && l.lane !== 0 && (e.flags |= 64, d = s.effects, d === null ? s.effects = [l] : d.push(l));
      } else h = { eventTime: h, lane: d, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, c === null ? (u = c = h, a = f) : c = c.next = h, o |= d;
      if (l = l.next, l === null) {
        if (l = s.shared.pending, l === null) break;
        d = l, l = d.next, d.next = null, s.lastBaseUpdate = d, s.shared.pending = null;
      }
    } while (!0);
    if (c === null && (a = f), s.baseState = a, s.firstBaseUpdate = u, s.lastBaseUpdate = c, t = s.shared.interleaved, t !== null) {
      s = t;
      do
        o |= s.lane, s = s.next;
      while (s !== t);
    } else r === null && (s.shared.lanes = 0);
    Pn |= o, e.lanes = o, e.memoizedState = f;
  }
}
function ac(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], s = i.callback;
    if (s !== null) {
      if (i.callback = null, i = n, typeof s != "function") throw Error(M(191, s));
      s.call(i);
    }
  }
}
var Ps = {}, ye = ln(Ps), us = ln(Ps), cs = ln(Ps);
function vn(e) {
  if (e === Ps) throw Error(M(174));
  return e;
}
function Ba(e, t) {
  switch ($(cs, t), $(us, e), $(ye, Ps), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ml(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ml(t, e);
  }
  G(ye), $(ye, t);
}
function ai() {
  G(ye), G(us), G(cs);
}
function ah(e) {
  vn(cs.current);
  var t = vn(ye.current), n = ml(t, e.type);
  t !== n && ($(us, e), $(ye, n));
}
function ja(e) {
  us.current === e && (G(ye), G(us));
}
var q = ln(0);
function Hr(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var jo = [];
function Wa() {
  for (var e = 0; e < jo.length; e++) jo[e]._workInProgressVersionPrimary = null;
  jo.length = 0;
}
var pr = ze.ReactCurrentDispatcher, Wo = ze.ReactCurrentBatchConfig, Cn = 0, tt = null, ut = null, ht = null, Vr = !1, $i = !1, fs = 0, Bm = 0;
function _t() {
  throw Error(M(321));
}
function Ha(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!le(e[n], t[n])) return !1;
  return !0;
}
function Va(e, t, n, i, s, r) {
  if (Cn = r, tt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, pr.current = e === null || e.memoizedState === null ? Vm : $m, e = n(i, s), $i) {
    r = 0;
    do {
      if ($i = !1, fs = 0, 25 <= r) throw Error(M(301));
      r += 1, ht = ut = null, t.updateQueue = null, pr.current = Um, e = n(i, s);
    } while ($i);
  }
  if (pr.current = $r, t = ut !== null && ut.next !== null, Cn = 0, ht = ut = tt = null, Vr = !1, t) throw Error(M(300));
  return e;
}
function $a() {
  var e = fs !== 0;
  return fs = 0, e;
}
function he() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ht === null ? tt.memoizedState = ht = e : ht = ht.next = e, ht;
}
function Jt() {
  if (ut === null) {
    var e = tt.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ut.next;
  var t = ht === null ? tt.memoizedState : ht.next;
  if (t !== null) ht = t, ut = e;
  else {
    if (e === null) throw Error(M(310));
    ut = e, e = { memoizedState: ut.memoizedState, baseState: ut.baseState, baseQueue: ut.baseQueue, queue: ut.queue, next: null }, ht === null ? tt.memoizedState = ht = e : ht = ht.next = e;
  }
  return ht;
}
function ds(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ho(e) {
  var t = Jt(), n = t.queue;
  if (n === null) throw Error(M(311));
  n.lastRenderedReducer = e;
  var i = ut, s = i.baseQueue, r = n.pending;
  if (r !== null) {
    if (s !== null) {
      var o = s.next;
      s.next = r.next, r.next = o;
    }
    i.baseQueue = s = r, n.pending = null;
  }
  if (s !== null) {
    r = s.next, i = i.baseState;
    var l = o = null, a = null, u = r;
    do {
      var c = u.lane;
      if ((Cn & c) === c) a !== null && (a = a.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), i = u.hasEagerState ? u.eagerState : e(i, u.action);
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        a === null ? (l = a = f, o = i) : a = a.next = f, tt.lanes |= c, Pn |= c;
      }
      u = u.next;
    } while (u !== null && u !== r);
    a === null ? o = i : a.next = l, le(i, t.memoizedState) || (At = !0), t.memoizedState = i, t.baseState = o, t.baseQueue = a, n.lastRenderedState = i;
  }
  if (e = n.interleaved, e !== null) {
    s = e;
    do
      r = s.lane, tt.lanes |= r, Pn |= r, s = s.next;
    while (s !== e);
  } else s === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Vo(e) {
  var t = Jt(), n = t.queue;
  if (n === null) throw Error(M(311));
  n.lastRenderedReducer = e;
  var i = n.dispatch, s = n.pending, r = t.memoizedState;
  if (s !== null) {
    n.pending = null;
    var o = s = s.next;
    do
      r = e(r, o.action), o = o.next;
    while (o !== s);
    le(r, t.memoizedState) || (At = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), n.lastRenderedState = r;
  }
  return [r, i];
}
function uh() {
}
function ch(e, t) {
  var n = tt, i = Jt(), s = t(), r = !le(i.memoizedState, s);
  if (r && (i.memoizedState = s, At = !0), i = i.queue, Ua(hh.bind(null, n, i, e), [e]), i.getSnapshot !== t || r || ht !== null && ht.memoizedState.tag & 1) {
    if (n.flags |= 2048, hs(9, dh.bind(null, n, i, s, t), void 0, null), pt === null) throw Error(M(349));
    Cn & 30 || fh(n, t, s);
  }
  return s;
}
function fh(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = tt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, tt.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function dh(e, t, n, i) {
  t.value = n, t.getSnapshot = i, ph(t) && gh(e);
}
function hh(e, t, n) {
  return n(function() {
    ph(t) && gh(e);
  });
}
function ph(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !le(e, n);
  } catch {
    return !0;
  }
}
function gh(e) {
  var t = Re(e, 1);
  t !== null && oe(t, e, 1, -1);
}
function uc(e) {
  var t = he();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ds, lastRenderedState: e }, t.queue = e, e = e.dispatch = Hm.bind(null, tt, e), [t.memoizedState, e];
}
function hs(e, t, n, i) {
  return e = { tag: e, create: t, destroy: n, deps: i, next: null }, t = tt.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, tt.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e)), e;
}
function mh() {
  return Jt().memoizedState;
}
function gr(e, t, n, i) {
  var s = he();
  tt.flags |= e, s.memoizedState = hs(1 | t, n, void 0, i === void 0 ? null : i);
}
function co(e, t, n, i) {
  var s = Jt();
  i = i === void 0 ? null : i;
  var r = void 0;
  if (ut !== null) {
    var o = ut.memoizedState;
    if (r = o.destroy, i !== null && Ha(i, o.deps)) {
      s.memoizedState = hs(t, n, r, i);
      return;
    }
  }
  tt.flags |= e, s.memoizedState = hs(1 | t, n, r, i);
}
function cc(e, t) {
  return gr(8390656, 8, e, t);
}
function Ua(e, t) {
  return co(2048, 8, e, t);
}
function yh(e, t) {
  return co(4, 2, e, t);
}
function vh(e, t) {
  return co(4, 4, e, t);
}
function _h(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function xh(e, t, n) {
  return n = n != null ? n.concat([e]) : null, co(4, 4, _h.bind(null, t, e), n);
}
function Ya() {
}
function wh(e, t) {
  var n = Jt();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Ha(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
}
function kh(e, t) {
  var n = Jt();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Ha(t, i[1]) ? i[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Sh(e, t, n) {
  return Cn & 21 ? (le(n, t) || (n = Ed(), tt.lanes |= n, Pn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, At = !0), e.memoizedState = n);
}
function jm(e, t) {
  var n = W;
  W = n !== 0 && 4 > n ? n : 4, e(!0);
  var i = Wo.transition;
  Wo.transition = {};
  try {
    e(!1), t();
  } finally {
    W = n, Wo.transition = i;
  }
}
function bh() {
  return Jt().memoizedState;
}
function Wm(e, t, n) {
  var i = qe(e);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, Mh(e)) Ch(t, n);
  else if (n = oh(e, t, n, i), n !== null) {
    var s = Tt();
    oe(n, e, i, s), Ph(n, t, i);
  }
}
function Hm(e, t, n) {
  var i = qe(e), s = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Mh(e)) Ch(t, s);
  else {
    var r = e.alternate;
    if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null)) try {
      var o = t.lastRenderedState, l = r(o, n);
      if (s.hasEagerState = !0, s.eagerState = l, le(l, o)) {
        var a = t.interleaved;
        a === null ? (s.next = s, Fa(t)) : (s.next = a.next, a.next = s), t.interleaved = s;
        return;
      }
    } catch {
    } finally {
    }
    n = oh(e, t, s, i), n !== null && (s = Tt(), oe(n, e, i, s), Ph(n, t, i));
  }
}
function Mh(e) {
  var t = e.alternate;
  return e === tt || t !== null && t === tt;
}
function Ch(e, t) {
  $i = Vr = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Ph(e, t, n) {
  if (n & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, Sa(e, n);
  }
}
var $r = { readContext: Zt, useCallback: _t, useContext: _t, useEffect: _t, useImperativeHandle: _t, useInsertionEffect: _t, useLayoutEffect: _t, useMemo: _t, useReducer: _t, useRef: _t, useState: _t, useDebugValue: _t, useDeferredValue: _t, useTransition: _t, useMutableSource: _t, useSyncExternalStore: _t, useId: _t, unstable_isNewReconciler: !1 }, Vm = { readContext: Zt, useCallback: function(e, t) {
  return he().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Zt, useEffect: cc, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, gr(
    4194308,
    4,
    _h.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return gr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return gr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = he();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var i = he();
  return t = n !== void 0 ? n(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = Wm.bind(null, tt, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = he();
  return e = { current: e }, t.memoizedState = e;
}, useState: uc, useDebugValue: Ya, useDeferredValue: function(e) {
  return he().memoizedState = e;
}, useTransition: function() {
  var e = uc(!1), t = e[0];
  return e = jm.bind(null, e[1]), he().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var i = tt, s = he();
  if (Z) {
    if (n === void 0) throw Error(M(407));
    n = n();
  } else {
    if (n = t(), pt === null) throw Error(M(349));
    Cn & 30 || fh(i, t, n);
  }
  s.memoizedState = n;
  var r = { value: n, getSnapshot: t };
  return s.queue = r, cc(hh.bind(
    null,
    i,
    r,
    e
  ), [e]), i.flags |= 2048, hs(9, dh.bind(null, i, r, n, t), void 0, null), n;
}, useId: function() {
  var e = he(), t = pt.identifierPrefix;
  if (Z) {
    var n = Pe, i = Ce;
    n = (i & ~(1 << 32 - re(i) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = fs++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Bm++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, $m = {
  readContext: Zt,
  useCallback: wh,
  useContext: Zt,
  useEffect: Ua,
  useImperativeHandle: xh,
  useInsertionEffect: yh,
  useLayoutEffect: vh,
  useMemo: kh,
  useReducer: Ho,
  useRef: mh,
  useState: function() {
    return Ho(ds);
  },
  useDebugValue: Ya,
  useDeferredValue: function(e) {
    var t = Jt();
    return Sh(t, ut.memoizedState, e);
  },
  useTransition: function() {
    var e = Ho(ds)[0], t = Jt().memoizedState;
    return [e, t];
  },
  useMutableSource: uh,
  useSyncExternalStore: ch,
  useId: bh,
  unstable_isNewReconciler: !1
}, Um = { readContext: Zt, useCallback: wh, useContext: Zt, useEffect: Ua, useImperativeHandle: xh, useInsertionEffect: yh, useLayoutEffect: vh, useMemo: kh, useReducer: Vo, useRef: mh, useState: function() {
  return Vo(ds);
}, useDebugValue: Ya, useDeferredValue: function(e) {
  var t = Jt();
  return ut === null ? t.memoizedState = e : Sh(t, ut.memoizedState, e);
}, useTransition: function() {
  var e = Vo(ds)[0], t = Jt().memoizedState;
  return [e, t];
}, useMutableSource: uh, useSyncExternalStore: ch, useId: bh, unstable_isNewReconciler: !1 };
function ne(e, t) {
  if (e && e.defaultProps) {
    t = et({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Fl(e, t, n, i) {
  t = e.memoizedState, n = n(i, t), n = n == null ? t : et({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var fo = { isMounted: function(e) {
  return (e = e._reactInternals) ? Rn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var i = Tt(), s = qe(e), r = Te(i, s);
  r.payload = t, n != null && (r.callback = n), t = Ze(e, r, s), t !== null && (oe(t, e, s, i), hr(t, e, s));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var i = Tt(), s = qe(e), r = Te(i, s);
  r.tag = 1, r.payload = t, n != null && (r.callback = n), t = Ze(e, r, s), t !== null && (oe(t, e, s, i), hr(t, e, s));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Tt(), i = qe(e), s = Te(n, i);
  s.tag = 2, t != null && (s.callback = t), t = Ze(e, s, i), t !== null && (oe(t, e, i, n), hr(t, e, i));
} };
function fc(e, t, n, i, s, r, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, r, o) : t.prototype && t.prototype.isPureReactComponent ? !rs(n, i) || !rs(s, r) : !0;
}
function Eh(e, t, n) {
  var i = !1, s = sn, r = t.contextType;
  return typeof r == "object" && r !== null ? r = Zt(r) : (s = Ft(t) ? bn : Mt.current, i = t.contextTypes, r = (i = i != null) ? ri(e, s) : sn), t = new t(n, r), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = fo, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = s, e.__reactInternalMemoizedMaskedChildContext = r), t;
}
function dc(e, t, n, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && fo.enqueueReplaceState(t, t.state, null);
}
function Nl(e, t, n, i) {
  var s = e.stateNode;
  s.props = n, s.state = e.memoizedState, s.refs = {}, Na(e);
  var r = t.contextType;
  typeof r == "object" && r !== null ? s.context = Zt(r) : (r = Ft(t) ? bn : Mt.current, s.context = ri(e, r)), s.state = e.memoizedState, r = t.getDerivedStateFromProps, typeof r == "function" && (Fl(e, t, r, n), s.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (t = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), t !== s.state && fo.enqueueReplaceState(s, s.state, null), Wr(e, n, s, i), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308);
}
function ui(e, t) {
  try {
    var n = "", i = t;
    do
      n += _g(i), i = i.return;
    while (i);
    var s = n;
  } catch (r) {
    s = `
Error generating stack: ` + r.message + `
` + r.stack;
  }
  return { value: e, source: t, stack: s, digest: null };
}
function $o(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Bl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Ym = typeof WeakMap == "function" ? WeakMap : Map;
function Th(e, t, n) {
  n = Te(-1, n), n.tag = 3, n.payload = { element: null };
  var i = t.value;
  return n.callback = function() {
    Yr || (Yr = !0, Ql = i), Bl(e, t);
  }, n;
}
function Oh(e, t, n) {
  n = Te(-1, n), n.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var s = t.value;
    n.payload = function() {
      return i(s);
    }, n.callback = function() {
      Bl(e, t);
    };
  }
  var r = e.stateNode;
  return r !== null && typeof r.componentDidCatch == "function" && (n.callback = function() {
    Bl(e, t), typeof i != "function" && (Je === null ? Je = /* @__PURE__ */ new Set([this]) : Je.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function hc(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new Ym();
    var s = /* @__PURE__ */ new Set();
    i.set(t, s);
  } else s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
  s.has(n) || (s.add(n), e = o0.bind(null, e, t, n), t.then(e, e));
}
function pc(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function gc(e, t, n, i, s) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = s, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Te(-1, 1), t.tag = 2, Ze(n, t, 1))), n.lanes |= 1), e);
}
var Xm = ze.ReactCurrentOwner, At = !1;
function Et(e, t, n, i) {
  t.child = e === null ? rh(t, null, n, i) : li(t, e.child, n, i);
}
function mc(e, t, n, i, s) {
  n = n.render;
  var r = t.ref;
  return ti(t, s), i = Va(e, t, n, i, r, s), n = $a(), e !== null && !At ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, Le(e, t, s)) : (Z && n && Da(t), t.flags |= 1, Et(e, t, i, s), t.child);
}
function yc(e, t, n, i, s) {
  if (e === null) {
    var r = n.type;
    return typeof r == "function" && !tu(r) && r.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = r, Dh(e, t, r, i, s)) : (e = _r(n.type, null, i, t, t.mode, s), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (r = e.child, !(e.lanes & s)) {
    var o = r.memoizedProps;
    if (n = n.compare, n = n !== null ? n : rs, n(o, i) && e.ref === t.ref) return Le(e, t, s);
  }
  return t.flags |= 1, e = tn(r, i), e.ref = t.ref, e.return = t, t.child = e;
}
function Dh(e, t, n, i, s) {
  if (e !== null) {
    var r = e.memoizedProps;
    if (rs(r, i) && e.ref === t.ref) if (At = !1, t.pendingProps = i = r, (e.lanes & s) !== 0) e.flags & 131072 && (At = !0);
    else return t.lanes = e.lanes, Le(e, t, s);
  }
  return jl(e, t, n, i, s);
}
function Rh(e, t, n) {
  var i = t.pendingProps, s = i.children, r = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $(Kn, Bt), Bt |= n;
  else {
    if (!(n & 1073741824)) return e = r !== null ? r.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, $(Kn, Bt), Bt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = r !== null ? r.baseLanes : n, $(Kn, Bt), Bt |= i;
  }
  else r !== null ? (i = r.baseLanes | n, t.memoizedState = null) : i = n, $(Kn, Bt), Bt |= i;
  return Et(e, t, s, n), t.child;
}
function Lh(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function jl(e, t, n, i, s) {
  var r = Ft(n) ? bn : Mt.current;
  return r = ri(t, r), ti(t, s), n = Va(e, t, n, i, r, s), i = $a(), e !== null && !At ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~s, Le(e, t, s)) : (Z && i && Da(t), t.flags |= 1, Et(e, t, n, s), t.child);
}
function vc(e, t, n, i, s) {
  if (Ft(n)) {
    var r = !0;
    Ir(t);
  } else r = !1;
  if (ti(t, s), t.stateNode === null) mr(e, t), Eh(t, n, i), Nl(t, n, i, s), i = !0;
  else if (e === null) {
    var o = t.stateNode, l = t.memoizedProps;
    o.props = l;
    var a = o.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = Zt(u) : (u = Ft(n) ? bn : Mt.current, u = ri(t, u));
    var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    f || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (l !== i || a !== u) && dc(t, o, i, u), Be = !1;
    var d = t.memoizedState;
    o.state = d, Wr(t, i, o, s), a = t.memoizedState, l !== i || d !== a || It.current || Be ? (typeof c == "function" && (Fl(t, n, c, i), a = t.memoizedState), (l = Be || fc(t, n, l, i, d, a, u)) ? (f || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = a), o.props = i, o.state = a, o.context = u, i = l) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    o = t.stateNode, lh(e, t), l = t.memoizedProps, u = t.type === t.elementType ? l : ne(t.type, l), o.props = u, f = t.pendingProps, d = o.context, a = n.contextType, typeof a == "object" && a !== null ? a = Zt(a) : (a = Ft(n) ? bn : Mt.current, a = ri(t, a));
    var h = n.getDerivedStateFromProps;
    (c = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (l !== f || d !== a) && dc(t, o, i, a), Be = !1, d = t.memoizedState, o.state = d, Wr(t, i, o, s);
    var m = t.memoizedState;
    l !== f || d !== m || It.current || Be ? (typeof h == "function" && (Fl(t, n, h, i), m = t.memoizedState), (u = Be || fc(t, n, u, i, d, m, a) || !1) ? (c || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(i, m, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(i, m, a)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = m), o.props = i, o.state = m, o.context = a, i = u) : (typeof o.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return Wl(e, t, n, i, r, s);
}
function Wl(e, t, n, i, s, r) {
  Lh(e, t);
  var o = (t.flags & 128) !== 0;
  if (!i && !o) return s && ic(t, n, !1), Le(e, t, r);
  i = t.stateNode, Xm.current = t;
  var l = o && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && o ? (t.child = li(t, e.child, null, r), t.child = li(t, null, l, r)) : Et(e, t, l, r), t.memoizedState = i.state, s && ic(t, n, !0), t.child;
}
function zh(e) {
  var t = e.stateNode;
  t.pendingContext ? nc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && nc(e, t.context, !1), Ba(e, t.containerInfo);
}
function _c(e, t, n, i, s) {
  return oi(), La(s), t.flags |= 256, Et(e, t, n, i), t.child;
}
var Hl = { dehydrated: null, treeContext: null, retryLane: 0 };
function Vl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ah(e, t, n) {
  var i = t.pendingProps, s = q.current, r = !1, o = (t.flags & 128) !== 0, l;
  if ((l = o) || (l = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0), l ? (r = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (s |= 1), $(q, s & 1), e === null)
    return Al(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = i.children, e = i.fallback, r ? (i = t.mode, r = t.child, o = { mode: "hidden", children: o }, !(i & 1) && r !== null ? (r.childLanes = 0, r.pendingProps = o) : r = go(o, i, 0, null), e = wn(e, i, n, null), r.return = t, e.return = t, r.sibling = e, t.child = r, t.child.memoizedState = Vl(n), t.memoizedState = Hl, e) : Xa(t, o));
  if (s = e.memoizedState, s !== null && (l = s.dehydrated, l !== null)) return Km(e, t, o, i, l, s, n);
  if (r) {
    r = i.fallback, o = t.mode, s = e.child, l = s.sibling;
    var a = { mode: "hidden", children: i.children };
    return !(o & 1) && t.child !== s ? (i = t.child, i.childLanes = 0, i.pendingProps = a, t.deletions = null) : (i = tn(s, a), i.subtreeFlags = s.subtreeFlags & 14680064), l !== null ? r = tn(l, r) : (r = wn(r, o, n, null), r.flags |= 2), r.return = t, i.return = t, i.sibling = r, t.child = i, i = r, r = t.child, o = e.child.memoizedState, o = o === null ? Vl(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, r.memoizedState = o, r.childLanes = e.childLanes & ~n, t.memoizedState = Hl, i;
  }
  return r = e.child, e = r.sibling, i = tn(r, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = n), i.return = t, i.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i;
}
function Xa(e, t) {
  return t = go({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function $s(e, t, n, i) {
  return i !== null && La(i), li(t, e.child, null, n), e = Xa(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Km(e, t, n, i, s, r, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, i = $o(Error(M(422))), $s(e, t, o, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (r = i.fallback, s = t.mode, i = go({ mode: "visible", children: i.children }, s, 0, null), r = wn(r, s, o, null), r.flags |= 2, i.return = t, r.return = t, i.sibling = r, t.child = i, t.mode & 1 && li(t, e.child, null, o), t.child.memoizedState = Vl(o), t.memoizedState = Hl, r);
  if (!(t.mode & 1)) return $s(e, t, o, null);
  if (s.data === "$!") {
    if (i = s.nextSibling && s.nextSibling.dataset, i) var l = i.dgst;
    return i = l, r = Error(M(419)), i = $o(r, i, void 0), $s(e, t, o, i);
  }
  if (l = (o & e.childLanes) !== 0, At || l) {
    if (i = pt, i !== null) {
      switch (o & -o) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
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
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      s = s & (i.suspendedLanes | o) ? 0 : s, s !== 0 && s !== r.retryLane && (r.retryLane = s, Re(e, s), oe(i, e, s, -1));
    }
    return qa(), i = $o(Error(M(421))), $s(e, t, o, i);
  }
  return s.data === "$?" ? (t.flags |= 128, t.child = e.child, t = l0.bind(null, e), s._reactRetry = t, null) : (e = r.treeContext, jt = Ge(s.nextSibling), Wt = t, Z = !0, se = null, e !== null && (Yt[Xt++] = Ce, Yt[Xt++] = Pe, Yt[Xt++] = Mn, Ce = e.id, Pe = e.overflow, Mn = t), t = Xa(t, i.children), t.flags |= 4096, t);
}
function xc(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), Il(e.return, t, n);
}
function Uo(e, t, n, i, s) {
  var r = e.memoizedState;
  r === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: s } : (r.isBackwards = t, r.rendering = null, r.renderingStartTime = 0, r.last = i, r.tail = n, r.tailMode = s);
}
function Ih(e, t, n) {
  var i = t.pendingProps, s = i.revealOrder, r = i.tail;
  if (Et(e, t, i.children, n), i = q.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) t: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && xc(e, n, t);
      else if (e.tag === 19) xc(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break t;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break t;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    i &= 1;
  }
  if ($(q, i), !(t.mode & 1)) t.memoizedState = null;
  else switch (s) {
    case "forwards":
      for (n = t.child, s = null; n !== null; ) e = n.alternate, e !== null && Hr(e) === null && (s = n), n = n.sibling;
      n = s, n === null ? (s = t.child, t.child = null) : (s = n.sibling, n.sibling = null), Uo(t, !1, s, n, r);
      break;
    case "backwards":
      for (n = null, s = t.child, t.child = null; s !== null; ) {
        if (e = s.alternate, e !== null && Hr(e) === null) {
          t.child = s;
          break;
        }
        e = s.sibling, s.sibling = n, n = s, s = e;
      }
      Uo(t, !0, n, null, r);
      break;
    case "together":
      Uo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function mr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Le(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Pn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(M(153));
  if (t.child !== null) {
    for (e = t.child, n = tn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = tn(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Qm(e, t, n) {
  switch (t.tag) {
    case 3:
      zh(t), oi();
      break;
    case 5:
      ah(t);
      break;
    case 1:
      Ft(t.type) && Ir(t);
      break;
    case 4:
      Ba(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, s = t.memoizedProps.value;
      $(Br, i._currentValue), i._currentValue = s;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? ($(q, q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ah(e, t, n) : ($(q, q.current & 1), e = Le(e, t, n), e !== null ? e.sibling : null);
      $(q, q.current & 1);
      break;
    case 19:
      if (i = (n & t.childLanes) !== 0, e.flags & 128) {
        if (i) return Ih(e, t, n);
        t.flags |= 128;
      }
      if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), $(q, q.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Rh(e, t, n);
  }
  return Le(e, t, n);
}
var Fh, $l, Nh, Bh;
Fh = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
$l = function() {
};
Nh = function(e, t, n, i) {
  var s = e.memoizedProps;
  if (s !== i) {
    e = t.stateNode, vn(ye.current);
    var r = null;
    switch (n) {
      case "input":
        s = dl(e, s), i = dl(e, i), r = [];
        break;
      case "select":
        s = et({}, s, { value: void 0 }), i = et({}, i, { value: void 0 }), r = [];
        break;
      case "textarea":
        s = gl(e, s), i = gl(e, i), r = [];
        break;
      default:
        typeof s.onClick != "function" && typeof i.onClick == "function" && (e.onclick = zr);
    }
    yl(n, i);
    var o;
    n = null;
    for (u in s) if (!i.hasOwnProperty(u) && s.hasOwnProperty(u) && s[u] != null) if (u === "style") {
      var l = s[u];
      for (o in l) l.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Ji.hasOwnProperty(u) ? r || (r = []) : (r = r || []).push(u, null));
    for (u in i) {
      var a = i[u];
      if (l = s != null ? s[u] : void 0, i.hasOwnProperty(u) && a !== l && (a != null || l != null)) if (u === "style") if (l) {
        for (o in l) !l.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in a) a.hasOwnProperty(o) && l[o] !== a[o] && (n || (n = {}), n[o] = a[o]);
      } else n || (r || (r = []), r.push(
        u,
        n
      )), n = a;
      else u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, l = l ? l.__html : void 0, a != null && l !== a && (r = r || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (r = r || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Ji.hasOwnProperty(u) ? (a != null && u === "onScroll" && K("scroll", e), r || l === a || (r = [])) : (r = r || []).push(u, a));
    }
    n && (r = r || []).push("style", n);
    var u = r;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Bh = function(e, t, n, i) {
  n !== i && (t.flags |= 4);
};
function Si(e, t) {
  if (!Z) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var i = null; n !== null; ) n.alternate !== null && (i = n), n = n.sibling;
      i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
  }
}
function xt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
  if (t) for (var s = e.child; s !== null; ) n |= s.lanes | s.childLanes, i |= s.subtreeFlags & 14680064, i |= s.flags & 14680064, s.return = e, s = s.sibling;
  else for (s = e.child; s !== null; ) n |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = e, s = s.sibling;
  return e.subtreeFlags |= i, e.childLanes = n, t;
}
function Gm(e, t, n) {
  var i = t.pendingProps;
  switch (Ra(t), t.tag) {
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
      return xt(t), null;
    case 1:
      return Ft(t.type) && Ar(), xt(t), null;
    case 3:
      return i = t.stateNode, ai(), G(It), G(Mt), Wa(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Hs(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, se !== null && (Jl(se), se = null))), $l(e, t), xt(t), null;
    case 5:
      ja(t);
      var s = vn(cs.current);
      if (n = t.type, e !== null && t.stateNode != null) Nh(e, t, n, i, s), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(M(166));
          return xt(t), null;
        }
        if (e = vn(ye.current), Hs(t)) {
          i = t.stateNode, n = t.type;
          var r = t.memoizedProps;
          switch (i[ge] = t, i[as] = r, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              K("cancel", i), K("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              K("load", i);
              break;
            case "video":
            case "audio":
              for (s = 0; s < Li.length; s++) K(Li[s], i);
              break;
            case "source":
              K("error", i);
              break;
            case "img":
            case "image":
            case "link":
              K(
                "error",
                i
              ), K("load", i);
              break;
            case "details":
              K("toggle", i);
              break;
            case "input":
              Tu(i, r), K("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!r.multiple }, K("invalid", i);
              break;
            case "textarea":
              Du(i, r), K("invalid", i);
          }
          yl(n, r), s = null;
          for (var o in r) if (r.hasOwnProperty(o)) {
            var l = r[o];
            o === "children" ? typeof l == "string" ? i.textContent !== l && (r.suppressHydrationWarning !== !0 && Ws(i.textContent, l, e), s = ["children", l]) : typeof l == "number" && i.textContent !== "" + l && (r.suppressHydrationWarning !== !0 && Ws(
              i.textContent,
              l,
              e
            ), s = ["children", "" + l]) : Ji.hasOwnProperty(o) && l != null && o === "onScroll" && K("scroll", i);
          }
          switch (n) {
            case "input":
              Ls(i), Ou(i, r, !0);
              break;
            case "textarea":
              Ls(i), Ru(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof r.onClick == "function" && (i.onclick = zr);
          }
          i = s, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          o = s.nodeType === 9 ? s : s.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = hd(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = o.createElement(n, { is: i.is }) : (e = o.createElement(n), n === "select" && (o = e, i.multiple ? o.multiple = !0 : i.size && (o.size = i.size))) : e = o.createElementNS(e, n), e[ge] = t, e[as] = i, Fh(e, t, !1, !1), t.stateNode = e;
          t: {
            switch (o = vl(n, i), n) {
              case "dialog":
                K("cancel", e), K("close", e), s = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                K("load", e), s = i;
                break;
              case "video":
              case "audio":
                for (s = 0; s < Li.length; s++) K(Li[s], e);
                s = i;
                break;
              case "source":
                K("error", e), s = i;
                break;
              case "img":
              case "image":
              case "link":
                K(
                  "error",
                  e
                ), K("load", e), s = i;
                break;
              case "details":
                K("toggle", e), s = i;
                break;
              case "input":
                Tu(e, i), s = dl(e, i), K("invalid", e);
                break;
              case "option":
                s = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, s = et({}, i, { value: void 0 }), K("invalid", e);
                break;
              case "textarea":
                Du(e, i), s = gl(e, i), K("invalid", e);
                break;
              default:
                s = i;
            }
            yl(n, s), l = s;
            for (r in l) if (l.hasOwnProperty(r)) {
              var a = l[r];
              r === "style" ? md(e, a) : r === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && pd(e, a)) : r === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && qi(e, a) : typeof a == "number" && qi(e, "" + a) : r !== "suppressContentEditableWarning" && r !== "suppressHydrationWarning" && r !== "autoFocus" && (Ji.hasOwnProperty(r) ? a != null && r === "onScroll" && K("scroll", e) : a != null && ya(e, r, a, o));
            }
            switch (n) {
              case "input":
                Ls(e), Ou(e, i, !1);
                break;
              case "textarea":
                Ls(e), Ru(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + nn(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, r = i.value, r != null ? Gn(e, !!i.multiple, r, !1) : i.defaultValue != null && Gn(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof s.onClick == "function" && (e.onclick = zr);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break t;
              case "img":
                i = !0;
                break t;
              default:
                i = !1;
            }
          }
          i && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return xt(t), null;
    case 6:
      if (e && t.stateNode != null) Bh(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(M(166));
        if (n = vn(cs.current), vn(ye.current), Hs(t)) {
          if (i = t.stateNode, n = t.memoizedProps, i[ge] = t, (r = i.nodeValue !== n) && (e = Wt, e !== null)) switch (e.tag) {
            case 3:
              Ws(i.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Ws(i.nodeValue, n, (e.mode & 1) !== 0);
          }
          r && (t.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[ge] = t, t.stateNode = i;
      }
      return xt(t), null;
    case 13:
      if (G(q), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Z && jt !== null && t.mode & 1 && !(t.flags & 128)) ih(), oi(), t.flags |= 98560, r = !1;
        else if (r = Hs(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!r) throw Error(M(318));
            if (r = t.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(M(317));
            r[ge] = t;
          } else oi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          xt(t), r = !1;
        } else se !== null && (Jl(se), se = null), r = !0;
        if (!r) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || q.current & 1 ? ft === 0 && (ft = 3) : qa())), t.updateQueue !== null && (t.flags |= 4), xt(t), null);
    case 4:
      return ai(), $l(e, t), e === null && os(t.stateNode.containerInfo), xt(t), null;
    case 10:
      return Ia(t.type._context), xt(t), null;
    case 17:
      return Ft(t.type) && Ar(), xt(t), null;
    case 19:
      if (G(q), r = t.memoizedState, r === null) return xt(t), null;
      if (i = (t.flags & 128) !== 0, o = r.rendering, o === null) if (i) Si(r, !1);
      else {
        if (ft !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Hr(e), o !== null) {
            for (t.flags |= 128, Si(r, !1), i = o.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null; ) r = n, e = i, r.flags &= 14680066, o = r.alternate, o === null ? (r.childLanes = 0, r.lanes = e, r.child = null, r.subtreeFlags = 0, r.memoizedProps = null, r.memoizedState = null, r.updateQueue = null, r.dependencies = null, r.stateNode = null) : (r.childLanes = o.childLanes, r.lanes = o.lanes, r.child = o.child, r.subtreeFlags = 0, r.deletions = null, r.memoizedProps = o.memoizedProps, r.memoizedState = o.memoizedState, r.updateQueue = o.updateQueue, r.type = o.type, e = o.dependencies, r.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return $(q, q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        r.tail !== null && ot() > ci && (t.flags |= 128, i = !0, Si(r, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = Hr(o), e !== null) {
          if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Si(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !Z) return xt(t), null;
        } else 2 * ot() - r.renderingStartTime > ci && n !== 1073741824 && (t.flags |= 128, i = !0, Si(r, !1), t.lanes = 4194304);
        r.isBackwards ? (o.sibling = t.child, t.child = o) : (n = r.last, n !== null ? n.sibling = o : t.child = o, r.last = o);
      }
      return r.tail !== null ? (t = r.tail, r.rendering = t, r.tail = t.sibling, r.renderingStartTime = ot(), t.sibling = null, n = q.current, $(q, i ? n & 1 | 2 : n & 1), t) : (xt(t), null);
    case 22:
    case 23:
      return Ja(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Bt & 1073741824 && (xt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : xt(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(M(156, t.tag));
}
function Zm(e, t) {
  switch (Ra(t), t.tag) {
    case 1:
      return Ft(t.type) && Ar(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return ai(), G(It), G(Mt), Wa(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ja(t), null;
    case 13:
      if (G(q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(M(340));
        oi();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return G(q), null;
    case 4:
      return ai(), null;
    case 10:
      return Ia(t.type._context), null;
    case 22:
    case 23:
      return Ja(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Us = !1, kt = !1, Jm = typeof WeakSet == "function" ? WeakSet : Set, T = null;
function Xn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    nt(e, t, i);
  }
  else n.current = null;
}
function Ul(e, t, n) {
  try {
    n();
  } catch (i) {
    nt(e, t, i);
  }
}
var wc = !1;
function qm(e, t) {
  if (El = Dr, e = $d(), Oa(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else t: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var i = n.getSelection && n.getSelection();
      if (i && i.rangeCount !== 0) {
        n = i.anchorNode;
        var s = i.anchorOffset, r = i.focusNode;
        i = i.focusOffset;
        try {
          n.nodeType, r.nodeType;
        } catch {
          n = null;
          break t;
        }
        var o = 0, l = -1, a = -1, u = 0, c = 0, f = e, d = null;
        e: for (; ; ) {
          for (var h; f !== n || s !== 0 && f.nodeType !== 3 || (l = o + s), f !== r || i !== 0 && f.nodeType !== 3 || (a = o + i), f.nodeType === 3 && (o += f.nodeValue.length), (h = f.firstChild) !== null; )
            d = f, f = h;
          for (; ; ) {
            if (f === e) break e;
            if (d === n && ++u === s && (l = o), d === r && ++c === i && (a = o), (h = f.nextSibling) !== null) break;
            f = d, d = f.parentNode;
          }
          f = h;
        }
        n = l === -1 || a === -1 ? null : { start: l, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Tl = { focusedElem: e, selectionRange: n }, Dr = !1, T = t; T !== null; ) if (t = T, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, T = e;
  else for (; T !== null; ) {
    t = T;
    try {
      var m = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (m !== null) {
            var y = m.memoizedProps, _ = m.memoizedState, p = t.stateNode, g = p.getSnapshotBeforeUpdate(t.elementType === t.type ? y : ne(t.type, y), _);
            p.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var v = t.stateNode.containerInfo;
          v.nodeType === 1 ? v.textContent = "" : v.nodeType === 9 && v.documentElement && v.removeChild(v.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(M(163));
      }
    } catch (x) {
      nt(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, T = e;
      break;
    }
    T = t.return;
  }
  return m = wc, wc = !1, m;
}
function Ui(e, t, n) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var s = i = i.next;
    do {
      if ((s.tag & e) === e) {
        var r = s.destroy;
        s.destroy = void 0, r !== void 0 && Ul(t, n, r);
      }
      s = s.next;
    } while (s !== i);
  }
}
function ho(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var i = n.create;
        n.destroy = i();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Yl(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function jh(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, jh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ge], delete t[as], delete t[Rl], delete t[Am], delete t[Im])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Wh(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function kc(e) {
  t: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Wh(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue t;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Xl(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = zr));
  else if (i !== 4 && (e = e.child, e !== null)) for (Xl(e, t, n), e = e.sibling; e !== null; ) Xl(e, t, n), e = e.sibling;
}
function Kl(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (Kl(e, t, n), e = e.sibling; e !== null; ) Kl(e, t, n), e = e.sibling;
}
var gt = null, ie = !1;
function Ae(e, t, n) {
  for (n = n.child; n !== null; ) Hh(e, t, n), n = n.sibling;
}
function Hh(e, t, n) {
  if (me && typeof me.onCommitFiberUnmount == "function") try {
    me.onCommitFiberUnmount(so, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      kt || Xn(n, t);
    case 6:
      var i = gt, s = ie;
      gt = null, Ae(e, t, n), gt = i, ie = s, gt !== null && (ie ? (e = gt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : gt.removeChild(n.stateNode));
      break;
    case 18:
      gt !== null && (ie ? (e = gt, n = n.stateNode, e.nodeType === 8 ? No(e.parentNode, n) : e.nodeType === 1 && No(e, n), is(e)) : No(gt, n.stateNode));
      break;
    case 4:
      i = gt, s = ie, gt = n.stateNode.containerInfo, ie = !0, Ae(e, t, n), gt = i, ie = s;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!kt && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        s = i = i.next;
        do {
          var r = s, o = r.destroy;
          r = r.tag, o !== void 0 && (r & 2 || r & 4) && Ul(n, t, o), s = s.next;
        } while (s !== i);
      }
      Ae(e, t, n);
      break;
    case 1:
      if (!kt && (Xn(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (l) {
        nt(n, t, l);
      }
      Ae(e, t, n);
      break;
    case 21:
      Ae(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (kt = (i = kt) || n.memoizedState !== null, Ae(e, t, n), kt = i) : Ae(e, t, n);
      break;
    default:
      Ae(e, t, n);
  }
}
function Sc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Jm()), t.forEach(function(i) {
      var s = a0.bind(null, e, i);
      n.has(i) || (n.add(i), i.then(s, s));
    });
  }
}
function ee(e, t) {
  var n = t.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var s = n[i];
    try {
      var r = e, o = t, l = o;
      t: for (; l !== null; ) {
        switch (l.tag) {
          case 5:
            gt = l.stateNode, ie = !1;
            break t;
          case 3:
            gt = l.stateNode.containerInfo, ie = !0;
            break t;
          case 4:
            gt = l.stateNode.containerInfo, ie = !0;
            break t;
        }
        l = l.return;
      }
      if (gt === null) throw Error(M(160));
      Hh(r, o, s), gt = null, ie = !1;
      var a = s.alternate;
      a !== null && (a.return = null), s.return = null;
    } catch (u) {
      nt(s, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Vh(t, e), t = t.sibling;
}
function Vh(e, t) {
  var n = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ee(t, e), ce(e), i & 4) {
        try {
          Ui(3, e, e.return), ho(3, e);
        } catch (y) {
          nt(e, e.return, y);
        }
        try {
          Ui(5, e, e.return);
        } catch (y) {
          nt(e, e.return, y);
        }
      }
      break;
    case 1:
      ee(t, e), ce(e), i & 512 && n !== null && Xn(n, n.return);
      break;
    case 5:
      if (ee(t, e), ce(e), i & 512 && n !== null && Xn(n, n.return), e.flags & 32) {
        var s = e.stateNode;
        try {
          qi(s, "");
        } catch (y) {
          nt(e, e.return, y);
        }
      }
      if (i & 4 && (s = e.stateNode, s != null)) {
        var r = e.memoizedProps, o = n !== null ? n.memoizedProps : r, l = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          l === "input" && r.type === "radio" && r.name != null && fd(s, r), vl(l, o);
          var u = vl(l, r);
          for (o = 0; o < a.length; o += 2) {
            var c = a[o], f = a[o + 1];
            c === "style" ? md(s, f) : c === "dangerouslySetInnerHTML" ? pd(s, f) : c === "children" ? qi(s, f) : ya(s, c, f, u);
          }
          switch (l) {
            case "input":
              hl(s, r);
              break;
            case "textarea":
              dd(s, r);
              break;
            case "select":
              var d = s._wrapperState.wasMultiple;
              s._wrapperState.wasMultiple = !!r.multiple;
              var h = r.value;
              h != null ? Gn(s, !!r.multiple, h, !1) : d !== !!r.multiple && (r.defaultValue != null ? Gn(
                s,
                !!r.multiple,
                r.defaultValue,
                !0
              ) : Gn(s, !!r.multiple, r.multiple ? [] : "", !1));
          }
          s[as] = r;
        } catch (y) {
          nt(e, e.return, y);
        }
      }
      break;
    case 6:
      if (ee(t, e), ce(e), i & 4) {
        if (e.stateNode === null) throw Error(M(162));
        s = e.stateNode, r = e.memoizedProps;
        try {
          s.nodeValue = r;
        } catch (y) {
          nt(e, e.return, y);
        }
      }
      break;
    case 3:
      if (ee(t, e), ce(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        is(t.containerInfo);
      } catch (y) {
        nt(e, e.return, y);
      }
      break;
    case 4:
      ee(t, e), ce(e);
      break;
    case 13:
      ee(t, e), ce(e), s = e.child, s.flags & 8192 && (r = s.memoizedState !== null, s.stateNode.isHidden = r, !r || s.alternate !== null && s.alternate.memoizedState !== null || (Ga = ot())), i & 4 && Sc(e);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (kt = (u = kt) || c, ee(t, e), kt = u) : ee(t, e), ce(e), i & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1) for (T = e, c = e.child; c !== null; ) {
          for (f = T = c; T !== null; ) {
            switch (d = T, h = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Ui(4, d, d.return);
                break;
              case 1:
                Xn(d, d.return);
                var m = d.stateNode;
                if (typeof m.componentWillUnmount == "function") {
                  i = d, n = d.return;
                  try {
                    t = i, m.props = t.memoizedProps, m.state = t.memoizedState, m.componentWillUnmount();
                  } catch (y) {
                    nt(i, n, y);
                  }
                }
                break;
              case 5:
                Xn(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  Mc(f);
                  continue;
                }
            }
            h !== null ? (h.return = d, T = h) : Mc(f);
          }
          c = c.sibling;
        }
        t: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                s = f.stateNode, u ? (r = s.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none") : (l = f.stateNode, a = f.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, l.style.display = gd("display", o));
              } catch (y) {
                nt(e, e.return, y);
              }
            }
          } else if (f.tag === 6) {
            if (c === null) try {
              f.stateNode.nodeValue = u ? "" : f.memoizedProps;
            } catch (y) {
              nt(e, e.return, y);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break t;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break t;
            c === f && (c = null), f = f.return;
          }
          c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      ee(t, e), ce(e), i & 4 && Sc(e);
      break;
    case 21:
      break;
    default:
      ee(
        t,
        e
      ), ce(e);
  }
}
function ce(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      t: {
        for (var n = e.return; n !== null; ) {
          if (Wh(n)) {
            var i = n;
            break t;
          }
          n = n.return;
        }
        throw Error(M(160));
      }
      switch (i.tag) {
        case 5:
          var s = i.stateNode;
          i.flags & 32 && (qi(s, ""), i.flags &= -33);
          var r = kc(e);
          Kl(e, r, s);
          break;
        case 3:
        case 4:
          var o = i.stateNode.containerInfo, l = kc(e);
          Xl(e, l, o);
          break;
        default:
          throw Error(M(161));
      }
    } catch (a) {
      nt(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function t0(e, t, n) {
  T = e, $h(e);
}
function $h(e, t, n) {
  for (var i = (e.mode & 1) !== 0; T !== null; ) {
    var s = T, r = s.child;
    if (s.tag === 22 && i) {
      var o = s.memoizedState !== null || Us;
      if (!o) {
        var l = s.alternate, a = l !== null && l.memoizedState !== null || kt;
        l = Us;
        var u = kt;
        if (Us = o, (kt = a) && !u) for (T = s; T !== null; ) o = T, a = o.child, o.tag === 22 && o.memoizedState !== null ? Cc(s) : a !== null ? (a.return = o, T = a) : Cc(s);
        for (; r !== null; ) T = r, $h(r), r = r.sibling;
        T = s, Us = l, kt = u;
      }
      bc(e);
    } else s.subtreeFlags & 8772 && r !== null ? (r.return = s, T = r) : bc(e);
  }
}
function bc(e) {
  for (; T !== null; ) {
    var t = T;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            kt || ho(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !kt) if (n === null) i.componentDidMount();
            else {
              var s = t.elementType === t.type ? n.memoizedProps : ne(t.type, n.memoizedProps);
              i.componentDidUpdate(s, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var r = t.updateQueue;
            r !== null && ac(t, r, i);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              ac(t, o, n);
            }
            break;
          case 5:
            var l = t.stateNode;
            if (n === null && t.flags & 4) {
              n = l;
              var a = t.memoizedProps;
              switch (t.type) {
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
            if (t.memoizedState === null) {
              var u = t.alternate;
              if (u !== null) {
                var c = u.memoizedState;
                if (c !== null) {
                  var f = c.dehydrated;
                  f !== null && is(f);
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
            throw Error(M(163));
        }
        kt || t.flags & 512 && Yl(t);
      } catch (d) {
        nt(t, t.return, d);
      }
    }
    if (t === e) {
      T = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, T = n;
      break;
    }
    T = t.return;
  }
}
function Mc(e) {
  for (; T !== null; ) {
    var t = T;
    if (t === e) {
      T = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, T = n;
      break;
    }
    T = t.return;
  }
}
function Cc(e) {
  for (; T !== null; ) {
    var t = T;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ho(4, t);
          } catch (a) {
            nt(t, n, a);
          }
          break;
        case 1:
          var i = t.stateNode;
          if (typeof i.componentDidMount == "function") {
            var s = t.return;
            try {
              i.componentDidMount();
            } catch (a) {
              nt(t, s, a);
            }
          }
          var r = t.return;
          try {
            Yl(t);
          } catch (a) {
            nt(t, r, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Yl(t);
          } catch (a) {
            nt(t, o, a);
          }
      }
    } catch (a) {
      nt(t, t.return, a);
    }
    if (t === e) {
      T = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      l.return = t.return, T = l;
      break;
    }
    T = t.return;
  }
}
var e0 = Math.ceil, Ur = ze.ReactCurrentDispatcher, Ka = ze.ReactCurrentOwner, Gt = ze.ReactCurrentBatchConfig, F = 0, pt = null, at = null, mt = 0, Bt = 0, Kn = ln(0), ft = 0, ps = null, Pn = 0, po = 0, Qa = 0, Yi = null, Lt = null, Ga = 0, ci = 1 / 0, Se = null, Yr = !1, Ql = null, Je = null, Ys = !1, Ve = null, Xr = 0, Xi = 0, Gl = null, yr = -1, vr = 0;
function Tt() {
  return F & 6 ? ot() : yr !== -1 ? yr : yr = ot();
}
function qe(e) {
  return e.mode & 1 ? F & 2 && mt !== 0 ? mt & -mt : Nm.transition !== null ? (vr === 0 && (vr = Ed()), vr) : (e = W, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ad(e.type)), e) : 1;
}
function oe(e, t, n, i) {
  if (50 < Xi) throw Xi = 0, Gl = null, Error(M(185));
  bs(e, n, i), (!(F & 2) || e !== pt) && (e === pt && (!(F & 2) && (po |= n), ft === 4 && We(e, mt)), Nt(e, i), n === 1 && F === 0 && !(t.mode & 1) && (ci = ot() + 500, uo && an()));
}
function Nt(e, t) {
  var n = e.callbackNode;
  Ng(e, t);
  var i = Or(e, e === pt ? mt : 0);
  if (i === 0) n !== null && Au(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (n != null && Au(n), t === 1) e.tag === 0 ? Fm(Pc.bind(null, e)) : th(Pc.bind(null, e)), Lm(function() {
      !(F & 6) && an();
    }), n = null;
    else {
      switch (Td(i)) {
        case 1:
          n = ka;
          break;
        case 4:
          n = Cd;
          break;
        case 16:
          n = Tr;
          break;
        case 536870912:
          n = Pd;
          break;
        default:
          n = Tr;
      }
      n = Jh(n, Uh.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Uh(e, t) {
  if (yr = -1, vr = 0, F & 6) throw Error(M(327));
  var n = e.callbackNode;
  if (ei() && e.callbackNode !== n) return null;
  var i = Or(e, e === pt ? mt : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = Kr(e, i);
  else {
    t = i;
    var s = F;
    F |= 2;
    var r = Xh();
    (pt !== e || mt !== t) && (Se = null, ci = ot() + 500, xn(e, t));
    do
      try {
        s0();
        break;
      } catch (l) {
        Yh(e, l);
      }
    while (!0);
    Aa(), Ur.current = r, F = s, at !== null ? t = 0 : (pt = null, mt = 0, t = ft);
  }
  if (t !== 0) {
    if (t === 2 && (s = Sl(e), s !== 0 && (i = s, t = Zl(e, s))), t === 1) throw n = ps, xn(e, 0), We(e, i), Nt(e, ot()), n;
    if (t === 6) We(e, i);
    else {
      if (s = e.current.alternate, !(i & 30) && !n0(s) && (t = Kr(e, i), t === 2 && (r = Sl(e), r !== 0 && (i = r, t = Zl(e, r))), t === 1)) throw n = ps, xn(e, 0), We(e, i), Nt(e, ot()), n;
      switch (e.finishedWork = s, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(M(345));
        case 2:
          hn(e, Lt, Se);
          break;
        case 3:
          if (We(e, i), (i & 130023424) === i && (t = Ga + 500 - ot(), 10 < t)) {
            if (Or(e, 0) !== 0) break;
            if (s = e.suspendedLanes, (s & i) !== i) {
              Tt(), e.pingedLanes |= e.suspendedLanes & s;
              break;
            }
            e.timeoutHandle = Dl(hn.bind(null, e, Lt, Se), t);
            break;
          }
          hn(e, Lt, Se);
          break;
        case 4:
          if (We(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, s = -1; 0 < i; ) {
            var o = 31 - re(i);
            r = 1 << o, o = t[o], o > s && (s = o), i &= ~r;
          }
          if (i = s, i = ot() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * e0(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = Dl(hn.bind(null, e, Lt, Se), i);
            break;
          }
          hn(e, Lt, Se);
          break;
        case 5:
          hn(e, Lt, Se);
          break;
        default:
          throw Error(M(329));
      }
    }
  }
  return Nt(e, ot()), e.callbackNode === n ? Uh.bind(null, e) : null;
}
function Zl(e, t) {
  var n = Yi;
  return e.current.memoizedState.isDehydrated && (xn(e, t).flags |= 256), e = Kr(e, t), e !== 2 && (t = Lt, Lt = n, t !== null && Jl(t)), e;
}
function Jl(e) {
  Lt === null ? Lt = e : Lt.push.apply(Lt, e);
}
function n0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var s = n[i], r = s.getSnapshot;
        s = s.value;
        try {
          if (!le(r(), s)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function We(e, t) {
  for (t &= ~Qa, t &= ~po, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - re(t), i = 1 << n;
    e[n] = -1, t &= ~i;
  }
}
function Pc(e) {
  if (F & 6) throw Error(M(327));
  ei();
  var t = Or(e, 0);
  if (!(t & 1)) return Nt(e, ot()), null;
  var n = Kr(e, t);
  if (e.tag !== 0 && n === 2) {
    var i = Sl(e);
    i !== 0 && (t = i, n = Zl(e, i));
  }
  if (n === 1) throw n = ps, xn(e, 0), We(e, t), Nt(e, ot()), n;
  if (n === 6) throw Error(M(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, hn(e, Lt, Se), Nt(e, ot()), null;
}
function Za(e, t) {
  var n = F;
  F |= 1;
  try {
    return e(t);
  } finally {
    F = n, F === 0 && (ci = ot() + 500, uo && an());
  }
}
function En(e) {
  Ve !== null && Ve.tag === 0 && !(F & 6) && ei();
  var t = F;
  F |= 1;
  var n = Gt.transition, i = W;
  try {
    if (Gt.transition = null, W = 1, e) return e();
  } finally {
    W = i, Gt.transition = n, F = t, !(F & 6) && an();
  }
}
function Ja() {
  Bt = Kn.current, G(Kn);
}
function xn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Rm(n)), at !== null) for (n = at.return; n !== null; ) {
    var i = n;
    switch (Ra(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && Ar();
        break;
      case 3:
        ai(), G(It), G(Mt), Wa();
        break;
      case 5:
        ja(i);
        break;
      case 4:
        ai();
        break;
      case 13:
        G(q);
        break;
      case 19:
        G(q);
        break;
      case 10:
        Ia(i.type._context);
        break;
      case 22:
      case 23:
        Ja();
    }
    n = n.return;
  }
  if (pt = e, at = e = tn(e.current, null), mt = Bt = t, ft = 0, ps = null, Qa = po = Pn = 0, Lt = Yi = null, yn !== null) {
    for (t = 0; t < yn.length; t++) if (n = yn[t], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var s = i.next, r = n.pending;
      if (r !== null) {
        var o = r.next;
        r.next = s, i.next = o;
      }
      n.pending = i;
    }
    yn = null;
  }
  return e;
}
function Yh(e, t) {
  do {
    var n = at;
    try {
      if (Aa(), pr.current = $r, Vr) {
        for (var i = tt.memoizedState; i !== null; ) {
          var s = i.queue;
          s !== null && (s.pending = null), i = i.next;
        }
        Vr = !1;
      }
      if (Cn = 0, ht = ut = tt = null, $i = !1, fs = 0, Ka.current = null, n === null || n.return === null) {
        ft = 1, ps = t, at = null;
        break;
      }
      t: {
        var r = e, o = n.return, l = n, a = t;
        if (t = mt, l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var u = a, c = l, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var h = pc(o);
          if (h !== null) {
            h.flags &= -257, gc(h, o, l, r, t), h.mode & 1 && hc(r, u, t), t = h, a = u;
            var m = t.updateQueue;
            if (m === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(a), t.updateQueue = y;
            } else m.add(a);
            break t;
          } else {
            if (!(t & 1)) {
              hc(r, u, t), qa();
              break t;
            }
            a = Error(M(426));
          }
        } else if (Z && l.mode & 1) {
          var _ = pc(o);
          if (_ !== null) {
            !(_.flags & 65536) && (_.flags |= 256), gc(_, o, l, r, t), La(ui(a, l));
            break t;
          }
        }
        r = a = ui(a, l), ft !== 4 && (ft = 2), Yi === null ? Yi = [r] : Yi.push(r), r = o;
        do {
          switch (r.tag) {
            case 3:
              r.flags |= 65536, t &= -t, r.lanes |= t;
              var p = Th(r, a, t);
              lc(r, p);
              break t;
            case 1:
              l = a;
              var g = r.type, v = r.stateNode;
              if (!(r.flags & 128) && (typeof g.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (Je === null || !Je.has(v)))) {
                r.flags |= 65536, t &= -t, r.lanes |= t;
                var x = Oh(r, l, t);
                lc(r, x);
                break t;
              }
          }
          r = r.return;
        } while (r !== null);
      }
      Qh(n);
    } catch (w) {
      t = w, at === n && n !== null && (at = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Xh() {
  var e = Ur.current;
  return Ur.current = $r, e === null ? $r : e;
}
function qa() {
  (ft === 0 || ft === 3 || ft === 2) && (ft = 4), pt === null || !(Pn & 268435455) && !(po & 268435455) || We(pt, mt);
}
function Kr(e, t) {
  var n = F;
  F |= 2;
  var i = Xh();
  (pt !== e || mt !== t) && (Se = null, xn(e, t));
  do
    try {
      i0();
      break;
    } catch (s) {
      Yh(e, s);
    }
  while (!0);
  if (Aa(), F = n, Ur.current = i, at !== null) throw Error(M(261));
  return pt = null, mt = 0, ft;
}
function i0() {
  for (; at !== null; ) Kh(at);
}
function s0() {
  for (; at !== null && !Tg(); ) Kh(at);
}
function Kh(e) {
  var t = Zh(e.alternate, e, Bt);
  e.memoizedProps = e.pendingProps, t === null ? Qh(e) : at = t, Ka.current = null;
}
function Qh(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Zm(n, t), n !== null) {
        n.flags &= 32767, at = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ft = 6, at = null;
        return;
      }
    } else if (n = Gm(n, t, Bt), n !== null) {
      at = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      at = t;
      return;
    }
    at = t = e;
  } while (t !== null);
  ft === 0 && (ft = 5);
}
function hn(e, t, n) {
  var i = W, s = Gt.transition;
  try {
    Gt.transition = null, W = 1, r0(e, t, n, i);
  } finally {
    Gt.transition = s, W = i;
  }
  return null;
}
function r0(e, t, n, i) {
  do
    ei();
  while (Ve !== null);
  if (F & 6) throw Error(M(327));
  n = e.finishedWork;
  var s = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(M(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var r = n.lanes | n.childLanes;
  if (Bg(e, r), e === pt && (at = pt = null, mt = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ys || (Ys = !0, Jh(Tr, function() {
    return ei(), null;
  })), r = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || r) {
    r = Gt.transition, Gt.transition = null;
    var o = W;
    W = 1;
    var l = F;
    F |= 4, Ka.current = null, qm(e, n), Vh(n, e), Mm(Tl), Dr = !!El, Tl = El = null, e.current = n, t0(n), Og(), F = l, W = o, Gt.transition = r;
  } else e.current = n;
  if (Ys && (Ys = !1, Ve = e, Xr = s), r = e.pendingLanes, r === 0 && (Je = null), Lg(n.stateNode), Nt(e, ot()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) s = t[n], i(s.value, { componentStack: s.stack, digest: s.digest });
  if (Yr) throw Yr = !1, e = Ql, Ql = null, e;
  return Xr & 1 && e.tag !== 0 && ei(), r = e.pendingLanes, r & 1 ? e === Gl ? Xi++ : (Xi = 0, Gl = e) : Xi = 0, an(), null;
}
function ei() {
  if (Ve !== null) {
    var e = Td(Xr), t = Gt.transition, n = W;
    try {
      if (Gt.transition = null, W = 16 > e ? 16 : e, Ve === null) var i = !1;
      else {
        if (e = Ve, Ve = null, Xr = 0, F & 6) throw Error(M(331));
        var s = F;
        for (F |= 4, T = e.current; T !== null; ) {
          var r = T, o = r.child;
          if (T.flags & 16) {
            var l = r.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (T = u; T !== null; ) {
                  var c = T;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ui(8, c, r);
                  }
                  var f = c.child;
                  if (f !== null) f.return = c, T = f;
                  else for (; T !== null; ) {
                    c = T;
                    var d = c.sibling, h = c.return;
                    if (jh(c), c === u) {
                      T = null;
                      break;
                    }
                    if (d !== null) {
                      d.return = h, T = d;
                      break;
                    }
                    T = h;
                  }
                }
              }
              var m = r.alternate;
              if (m !== null) {
                var y = m.child;
                if (y !== null) {
                  m.child = null;
                  do {
                    var _ = y.sibling;
                    y.sibling = null, y = _;
                  } while (y !== null);
                }
              }
              T = r;
            }
          }
          if (r.subtreeFlags & 2064 && o !== null) o.return = r, T = o;
          else t: for (; T !== null; ) {
            if (r = T, r.flags & 2048) switch (r.tag) {
              case 0:
              case 11:
              case 15:
                Ui(9, r, r.return);
            }
            var p = r.sibling;
            if (p !== null) {
              p.return = r.return, T = p;
              break t;
            }
            T = r.return;
          }
        }
        var g = e.current;
        for (T = g; T !== null; ) {
          o = T;
          var v = o.child;
          if (o.subtreeFlags & 2064 && v !== null) v.return = o, T = v;
          else t: for (o = g; T !== null; ) {
            if (l = T, l.flags & 2048) try {
              switch (l.tag) {
                case 0:
                case 11:
                case 15:
                  ho(9, l);
              }
            } catch (w) {
              nt(l, l.return, w);
            }
            if (l === o) {
              T = null;
              break t;
            }
            var x = l.sibling;
            if (x !== null) {
              x.return = l.return, T = x;
              break t;
            }
            T = l.return;
          }
        }
        if (F = s, an(), me && typeof me.onPostCommitFiberRoot == "function") try {
          me.onPostCommitFiberRoot(so, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      W = n, Gt.transition = t;
    }
  }
  return !1;
}
function Ec(e, t, n) {
  t = ui(n, t), t = Th(e, t, 1), e = Ze(e, t, 1), t = Tt(), e !== null && (bs(e, 1, t), Nt(e, t));
}
function nt(e, t, n) {
  if (e.tag === 3) Ec(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ec(t, e, n);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Je === null || !Je.has(i))) {
        e = ui(n, e), e = Oh(t, e, 1), t = Ze(t, e, 1), e = Tt(), t !== null && (bs(t, 1, e), Nt(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function o0(e, t, n) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = Tt(), e.pingedLanes |= e.suspendedLanes & n, pt === e && (mt & n) === n && (ft === 4 || ft === 3 && (mt & 130023424) === mt && 500 > ot() - Ga ? xn(e, 0) : Qa |= n), Nt(e, t);
}
function Gh(e, t) {
  t === 0 && (e.mode & 1 ? (t = Is, Is <<= 1, !(Is & 130023424) && (Is = 4194304)) : t = 1);
  var n = Tt();
  e = Re(e, t), e !== null && (bs(e, t, n), Nt(e, n));
}
function l0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Gh(e, n);
}
function a0(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var i = e.stateNode, s = e.memoizedState;
      s !== null && (n = s.retryLane);
      break;
    case 19:
      i = e.stateNode;
      break;
    default:
      throw Error(M(314));
  }
  i !== null && i.delete(t), Gh(e, n);
}
var Zh;
Zh = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || It.current) At = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return At = !1, Qm(e, t, n);
    At = !!(e.flags & 131072);
  }
  else At = !1, Z && t.flags & 1048576 && eh(t, Nr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      mr(e, t), e = t.pendingProps;
      var s = ri(t, Mt.current);
      ti(t, n), s = Va(null, t, i, e, s, n);
      var r = $a();
      return t.flags |= 1, typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ft(i) ? (r = !0, Ir(t)) : r = !1, t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, Na(t), s.updater = fo, t.stateNode = s, s._reactInternals = t, Nl(t, i, e, n), t = Wl(null, t, i, !0, r, n)) : (t.tag = 0, Z && r && Da(t), Et(null, t, s, n), t = t.child), t;
    case 16:
      i = t.elementType;
      t: {
        switch (mr(e, t), e = t.pendingProps, s = i._init, i = s(i._payload), t.type = i, s = t.tag = c0(i), e = ne(i, e), s) {
          case 0:
            t = jl(null, t, i, e, n);
            break t;
          case 1:
            t = vc(null, t, i, e, n);
            break t;
          case 11:
            t = mc(null, t, i, e, n);
            break t;
          case 14:
            t = yc(null, t, i, ne(i.type, e), n);
            break t;
        }
        throw Error(M(
          306,
          i,
          ""
        ));
      }
      return t;
    case 0:
      return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : ne(i, s), jl(e, t, i, s, n);
    case 1:
      return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : ne(i, s), vc(e, t, i, s, n);
    case 3:
      t: {
        if (zh(t), e === null) throw Error(M(387));
        i = t.pendingProps, r = t.memoizedState, s = r.element, lh(e, t), Wr(t, i, null, n);
        var o = t.memoizedState;
        if (i = o.element, r.isDehydrated) if (r = { element: i, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = r, t.memoizedState = r, t.flags & 256) {
          s = ui(Error(M(423)), t), t = _c(e, t, i, n, s);
          break t;
        } else if (i !== s) {
          s = ui(Error(M(424)), t), t = _c(e, t, i, n, s);
          break t;
        } else for (jt = Ge(t.stateNode.containerInfo.firstChild), Wt = t, Z = !0, se = null, n = rh(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (oi(), i === s) {
            t = Le(e, t, n);
            break t;
          }
          Et(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ah(t), e === null && Al(t), i = t.type, s = t.pendingProps, r = e !== null ? e.memoizedProps : null, o = s.children, Ol(i, s) ? o = null : r !== null && Ol(i, r) && (t.flags |= 32), Lh(e, t), Et(e, t, o, n), t.child;
    case 6:
      return e === null && Al(t), null;
    case 13:
      return Ah(e, t, n);
    case 4:
      return Ba(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = li(t, null, i, n) : Et(e, t, i, n), t.child;
    case 11:
      return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : ne(i, s), mc(e, t, i, s, n);
    case 7:
      return Et(e, t, t.pendingProps, n), t.child;
    case 8:
      return Et(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Et(e, t, t.pendingProps.children, n), t.child;
    case 10:
      t: {
        if (i = t.type._context, s = t.pendingProps, r = t.memoizedProps, o = s.value, $(Br, i._currentValue), i._currentValue = o, r !== null) if (le(r.value, o)) {
          if (r.children === s.children && !It.current) {
            t = Le(e, t, n);
            break t;
          }
        } else for (r = t.child, r !== null && (r.return = t); r !== null; ) {
          var l = r.dependencies;
          if (l !== null) {
            o = r.child;
            for (var a = l.firstContext; a !== null; ) {
              if (a.context === i) {
                if (r.tag === 1) {
                  a = Te(-1, n & -n), a.tag = 2;
                  var u = r.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var c = u.pending;
                    c === null ? a.next = a : (a.next = c.next, c.next = a), u.pending = a;
                  }
                }
                r.lanes |= n, a = r.alternate, a !== null && (a.lanes |= n), Il(
                  r.return,
                  n,
                  t
                ), l.lanes |= n;
                break;
              }
              a = a.next;
            }
          } else if (r.tag === 10) o = r.type === t.type ? null : r.child;
          else if (r.tag === 18) {
            if (o = r.return, o === null) throw Error(M(341));
            o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), Il(o, n, t), o = r.sibling;
          } else o = r.child;
          if (o !== null) o.return = r;
          else for (o = r; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (r = o.sibling, r !== null) {
              r.return = o.return, o = r;
              break;
            }
            o = o.return;
          }
          r = o;
        }
        Et(e, t, s.children, n), t = t.child;
      }
      return t;
    case 9:
      return s = t.type, i = t.pendingProps.children, ti(t, n), s = Zt(s), i = i(s), t.flags |= 1, Et(e, t, i, n), t.child;
    case 14:
      return i = t.type, s = ne(i, t.pendingProps), s = ne(i.type, s), yc(e, t, i, s, n);
    case 15:
      return Dh(e, t, t.type, t.pendingProps, n);
    case 17:
      return i = t.type, s = t.pendingProps, s = t.elementType === i ? s : ne(i, s), mr(e, t), t.tag = 1, Ft(i) ? (e = !0, Ir(t)) : e = !1, ti(t, n), Eh(t, i, s), Nl(t, i, s, n), Wl(null, t, i, !0, e, n);
    case 19:
      return Ih(e, t, n);
    case 22:
      return Rh(e, t, n);
  }
  throw Error(M(156, t.tag));
};
function Jh(e, t) {
  return Md(e, t);
}
function u0(e, t, n, i) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Kt(e, t, n, i) {
  return new u0(e, t, n, i);
}
function tu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function c0(e) {
  if (typeof e == "function") return tu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === _a) return 11;
    if (e === xa) return 14;
  }
  return 2;
}
function tn(e, t) {
  var n = e.alternate;
  return n === null ? (n = Kt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function _r(e, t, n, i, s, r) {
  var o = 2;
  if (i = e, typeof e == "function") tu(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else t: switch (e) {
    case Nn:
      return wn(n.children, s, r, t);
    case va:
      o = 8, s |= 8;
      break;
    case al:
      return e = Kt(12, n, t, s | 2), e.elementType = al, e.lanes = r, e;
    case ul:
      return e = Kt(13, n, t, s), e.elementType = ul, e.lanes = r, e;
    case cl:
      return e = Kt(19, n, t, s), e.elementType = cl, e.lanes = r, e;
    case ad:
      return go(n, s, r, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case od:
          o = 10;
          break t;
        case ld:
          o = 9;
          break t;
        case _a:
          o = 11;
          break t;
        case xa:
          o = 14;
          break t;
        case Ne:
          o = 16, i = null;
          break t;
      }
      throw Error(M(130, e == null ? e : typeof e, ""));
  }
  return t = Kt(o, n, t, s), t.elementType = e, t.type = i, t.lanes = r, t;
}
function wn(e, t, n, i) {
  return e = Kt(7, e, i, t), e.lanes = n, e;
}
function go(e, t, n, i) {
  return e = Kt(22, e, i, t), e.elementType = ad, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Yo(e, t, n) {
  return e = Kt(6, e, null, t), e.lanes = n, e;
}
function Xo(e, t, n) {
  return t = Kt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function f0(e, t, n, i, s) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Po(0), this.expirationTimes = Po(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Po(0), this.identifierPrefix = i, this.onRecoverableError = s, this.mutableSourceEagerHydrationData = null;
}
function eu(e, t, n, i, s, r, o, l, a) {
  return e = new f0(e, t, n, l, a), t === 1 ? (t = 1, r === !0 && (t |= 8)) : t = 0, r = Kt(3, null, null, t), e.current = r, r.stateNode = e, r.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Na(r), e;
}
function d0(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Fn, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: n };
}
function qh(e) {
  if (!e) return sn;
  e = e._reactInternals;
  t: {
    if (Rn(e) !== e || e.tag !== 1) throw Error(M(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break t;
        case 1:
          if (Ft(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break t;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(M(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ft(n)) return qd(e, n, t);
  }
  return t;
}
function tp(e, t, n, i, s, r, o, l, a) {
  return e = eu(n, i, !0, e, s, r, o, l, a), e.context = qh(null), n = e.current, i = Tt(), s = qe(n), r = Te(i, s), r.callback = t ?? null, Ze(n, r, s), e.current.lanes = s, bs(e, s, i), Nt(e, i), e;
}
function mo(e, t, n, i) {
  var s = t.current, r = Tt(), o = qe(s);
  return n = qh(n), t.context === null ? t.context = n : t.pendingContext = n, t = Te(r, o), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = Ze(s, t, o), e !== null && (oe(e, s, o, r), hr(e, s, o)), o;
}
function Qr(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Tc(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function nu(e, t) {
  Tc(e, t), (e = e.alternate) && Tc(e, t);
}
function h0() {
  return null;
}
var ep = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function iu(e) {
  this._internalRoot = e;
}
yo.prototype.render = iu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(M(409));
  mo(e, t, null, null);
};
yo.prototype.unmount = iu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    En(function() {
      mo(null, e, null, null);
    }), t[De] = null;
  }
};
function yo(e) {
  this._internalRoot = e;
}
yo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Rd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < je.length && t !== 0 && t < je[n].priority; n++) ;
    je.splice(n, 0, e), n === 0 && zd(e);
  }
};
function su(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function vo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Oc() {
}
function p0(e, t, n, i, s) {
  if (s) {
    if (typeof i == "function") {
      var r = i;
      i = function() {
        var u = Qr(o);
        r.call(u);
      };
    }
    var o = tp(t, i, e, 0, null, !1, !1, "", Oc);
    return e._reactRootContainer = o, e[De] = o.current, os(e.nodeType === 8 ? e.parentNode : e), En(), o;
  }
  for (; s = e.lastChild; ) e.removeChild(s);
  if (typeof i == "function") {
    var l = i;
    i = function() {
      var u = Qr(a);
      l.call(u);
    };
  }
  var a = eu(e, 0, !1, null, null, !1, !1, "", Oc);
  return e._reactRootContainer = a, e[De] = a.current, os(e.nodeType === 8 ? e.parentNode : e), En(function() {
    mo(t, a, n, i);
  }), a;
}
function _o(e, t, n, i, s) {
  var r = n._reactRootContainer;
  if (r) {
    var o = r;
    if (typeof s == "function") {
      var l = s;
      s = function() {
        var a = Qr(o);
        l.call(a);
      };
    }
    mo(t, o, e, s);
  } else o = p0(n, t, e, s, i);
  return Qr(o);
}
Od = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ri(t.pendingLanes);
        n !== 0 && (Sa(t, n | 1), Nt(t, ot()), !(F & 6) && (ci = ot() + 500, an()));
      }
      break;
    case 13:
      En(function() {
        var i = Re(e, 1);
        if (i !== null) {
          var s = Tt();
          oe(i, e, 1, s);
        }
      }), nu(e, 1);
  }
};
ba = function(e) {
  if (e.tag === 13) {
    var t = Re(e, 134217728);
    if (t !== null) {
      var n = Tt();
      oe(t, e, 134217728, n);
    }
    nu(e, 134217728);
  }
};
Dd = function(e) {
  if (e.tag === 13) {
    var t = qe(e), n = Re(e, t);
    if (n !== null) {
      var i = Tt();
      oe(n, e, t, i);
    }
    nu(e, t);
  }
};
Rd = function() {
  return W;
};
Ld = function(e, t) {
  var n = W;
  try {
    return W = e, t();
  } finally {
    W = n;
  }
};
xl = function(e, t, n) {
  switch (t) {
    case "input":
      if (hl(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var i = n[t];
          if (i !== e && i.form === e.form) {
            var s = ao(i);
            if (!s) throw Error(M(90));
            cd(i), hl(i, s);
          }
        }
      }
      break;
    case "textarea":
      dd(e, n);
      break;
    case "select":
      t = n.value, t != null && Gn(e, !!n.multiple, t, !1);
  }
};
_d = Za;
xd = En;
var g0 = { usingClientEntryPoint: !1, Events: [Cs, Hn, ao, yd, vd, Za] }, bi = { findFiberByHostInstance: mn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, m0 = { bundleType: bi.bundleType, version: bi.version, rendererPackageName: bi.rendererPackageName, rendererConfig: bi.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ze.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Sd(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: bi.findFiberByHostInstance || h0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Xs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Xs.isDisabled && Xs.supportsFiber) try {
    so = Xs.inject(m0), me = Xs;
  } catch {
  }
}
Vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = g0;
Vt.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!su(t)) throw Error(M(200));
  return d0(e, t, null, n);
};
Vt.createRoot = function(e, t) {
  if (!su(e)) throw Error(M(299));
  var n = !1, i = "", s = ep;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = eu(e, 1, !1, null, null, n, !1, i, s), e[De] = t.current, os(e.nodeType === 8 ? e.parentNode : e), new iu(t);
};
Vt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(M(188)) : (e = Object.keys(e).join(","), Error(M(268, e)));
  return e = Sd(t), e = e === null ? null : e.stateNode, e;
};
Vt.flushSync = function(e) {
  return En(e);
};
Vt.hydrate = function(e, t, n) {
  if (!vo(t)) throw Error(M(200));
  return _o(null, e, t, !0, n);
};
Vt.hydrateRoot = function(e, t, n) {
  if (!su(e)) throw Error(M(405));
  var i = n != null && n.hydratedSources || null, s = !1, r = "", o = ep;
  if (n != null && (n.unstable_strictMode === !0 && (s = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = tp(t, null, e, 1, n ?? null, s, !1, r, o), e[De] = t.current, os(e), i) for (e = 0; e < i.length; e++) n = i[e], s = n._getVersion, s = s(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, s] : t.mutableSourceEagerHydrationData.push(
    n,
    s
  );
  return new yo(t);
};
Vt.render = function(e, t, n) {
  if (!vo(t)) throw Error(M(200));
  return _o(null, e, t, !1, n);
};
Vt.unmountComponentAtNode = function(e) {
  if (!vo(e)) throw Error(M(40));
  return e._reactRootContainer ? (En(function() {
    _o(null, null, e, !1, function() {
      e._reactRootContainer = null, e[De] = null;
    });
  }), !0) : !1;
};
Vt.unstable_batchedUpdates = Za;
Vt.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
  if (!vo(n)) throw Error(M(200));
  if (e == null || e._reactInternals === void 0) throw Error(M(38));
  return _o(e, t, n, !1, i);
};
Vt.version = "18.3.1-next-f1338f8080-20240426";
function np() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(np);
    } catch (e) {
      console.error(e);
    }
}
np(), nd.exports = Vt;
var y0 = nd.exports, ip, Dc = y0;
ip = Dc.createRoot, Dc.hydrateRoot;
let sp = it.createContext(
  /** @type {any} */
  null
);
function v0() {
  let e = it.useContext(sp);
  if (!e) throw new Error("RenderContext not found");
  return e;
}
function _0() {
  return v0().model;
}
function Ko(e) {
  let t = _0(), [n, i] = it.useState(t.get(e));
  return it.useEffect(() => {
    let s = () => i(t.get(e));
    return t.on(`change:${e}`, s), () => t.off(`change:${e}`, s);
  }, [t, e]), [
    n,
    (s) => {
      t.set(e, s), t.save_changes();
    }
  ];
}
function x0(e) {
  return ({ el: t, model: n, experimental: i }) => {
    let s = ip(t);
    return s.render(
      it.createElement(
        it.StrictMode,
        null,
        it.createElement(
          sp.Provider,
          { value: { model: n, experimental: i } },
          it.createElement(e)
        )
      )
    ), () => s.unmount();
  };
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Es(e) {
  return e + 0.5 | 0;
}
const $e = (e, t, n) => Math.max(Math.min(e, n), t);
function zi(e) {
  return $e(Es(e * 2.55), 0, 255);
}
function en(e) {
  return $e(Es(e * 255), 0, 255);
}
function Me(e) {
  return $e(Es(e / 2.55) / 100, 0, 1);
}
function Rc(e) {
  return $e(Es(e * 100), 0, 100);
}
const Ut = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, ql = [..."0123456789ABCDEF"], w0 = (e) => ql[e & 15], k0 = (e) => ql[(e & 240) >> 4] + ql[e & 15], Ks = (e) => (e & 240) >> 4 === (e & 15), S0 = (e) => Ks(e.r) && Ks(e.g) && Ks(e.b) && Ks(e.a);
function b0(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & Ut[e[1]] * 17,
    g: 255 & Ut[e[2]] * 17,
    b: 255 & Ut[e[3]] * 17,
    a: t === 5 ? Ut[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: Ut[e[1]] << 4 | Ut[e[2]],
    g: Ut[e[3]] << 4 | Ut[e[4]],
    b: Ut[e[5]] << 4 | Ut[e[6]],
    a: t === 9 ? Ut[e[7]] << 4 | Ut[e[8]] : 255
  })), n;
}
const M0 = (e, t) => e < 255 ? t(e) : "";
function C0(e) {
  var t = S0(e) ? w0 : k0;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + M0(e.a, t) : void 0;
}
const P0 = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function rp(e, t, n) {
  const i = t * Math.min(n, 1 - n), s = (r, o = (r + e / 30) % 12) => n - i * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [s(0), s(8), s(4)];
}
function E0(e, t, n) {
  const i = (s, r = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(r, 4 - r, 1), 0);
  return [i(5), i(3), i(1)];
}
function T0(e, t, n) {
  const i = rp(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    i[s] *= 1 - t - n, i[s] += t;
  return i;
}
function O0(e, t, n, i, s) {
  return e === s ? (t - n) / i + (t < n ? 6 : 0) : t === s ? (n - e) / i + 2 : (e - t) / i + 4;
}
function ru(e) {
  const n = e.r / 255, i = e.g / 255, s = e.b / 255, r = Math.max(n, i, s), o = Math.min(n, i, s), l = (r + o) / 2;
  let a, u, c;
  return r !== o && (c = r - o, u = l > 0.5 ? c / (2 - r - o) : c / (r + o), a = O0(n, i, s, c, r), a = a * 60 + 0.5), [a | 0, u || 0, l];
}
function ou(e, t, n, i) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, i)).map(en);
}
function lu(e, t, n) {
  return ou(rp, e, t, n);
}
function D0(e, t, n) {
  return ou(T0, e, t, n);
}
function R0(e, t, n) {
  return ou(E0, e, t, n);
}
function op(e) {
  return (e % 360 + 360) % 360;
}
function L0(e) {
  const t = P0.exec(e);
  let n = 255, i;
  if (!t)
    return;
  t[5] !== i && (n = t[6] ? zi(+t[5]) : en(+t[5]));
  const s = op(+t[2]), r = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? i = D0(s, r, o) : t[1] === "hsv" ? i = R0(s, r, o) : i = lu(s, r, o), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: n
  };
}
function z0(e, t) {
  var n = ru(e);
  n[0] = op(n[0] + t), n = lu(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function A0(e) {
  if (!e)
    return;
  const t = ru(e), n = t[0], i = Rc(t[1]), s = Rc(t[2]);
  return e.a < 255 ? `hsla(${n}, ${i}%, ${s}%, ${Me(e.a)})` : `hsl(${n}, ${i}%, ${s}%)`;
}
const Lc = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, zc = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function I0() {
  const e = {}, t = Object.keys(zc), n = Object.keys(Lc);
  let i, s, r, o, l;
  for (i = 0; i < t.length; i++) {
    for (o = l = t[i], s = 0; s < n.length; s++)
      r = n[s], l = l.replace(r, Lc[r]);
    r = parseInt(zc[o], 16), e[l] = [r >> 16 & 255, r >> 8 & 255, r & 255];
  }
  return e;
}
let Qs;
function F0(e) {
  Qs || (Qs = I0(), Qs.transparent = [0, 0, 0, 0]);
  const t = Qs[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const N0 = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function B0(e) {
  const t = N0.exec(e);
  let n = 255, i, s, r;
  if (t) {
    if (t[7] !== i) {
      const o = +t[7];
      n = t[8] ? zi(o) : $e(o * 255, 0, 255);
    }
    return i = +t[1], s = +t[3], r = +t[5], i = 255 & (t[2] ? zi(i) : $e(i, 0, 255)), s = 255 & (t[4] ? zi(s) : $e(s, 0, 255)), r = 255 & (t[6] ? zi(r) : $e(r, 0, 255)), {
      r: i,
      g: s,
      b: r,
      a: n
    };
  }
}
function j0(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Me(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Qo = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, An = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function W0(e, t, n) {
  const i = An(Me(e.r)), s = An(Me(e.g)), r = An(Me(e.b));
  return {
    r: en(Qo(i + n * (An(Me(t.r)) - i))),
    g: en(Qo(s + n * (An(Me(t.g)) - s))),
    b: en(Qo(r + n * (An(Me(t.b)) - r))),
    a: e.a + n * (t.a - e.a)
  };
}
function Gs(e, t, n) {
  if (e) {
    let i = ru(e);
    i[t] = Math.max(0, Math.min(i[t] + i[t] * n, t === 0 ? 360 : 1)), i = lu(i), e.r = i[0], e.g = i[1], e.b = i[2];
  }
}
function lp(e, t) {
  return e && Object.assign(t || {}, e);
}
function Ac(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = en(e[3]))) : (t = lp(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = en(t.a)), t;
}
function H0(e) {
  return e.charAt(0) === "r" ? B0(e) : L0(e);
}
class gs {
  constructor(t) {
    if (t instanceof gs)
      return t;
    const n = typeof t;
    let i;
    n === "object" ? i = Ac(t) : n === "string" && (i = b0(t) || F0(t) || H0(t)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = lp(this._rgb);
    return t && (t.a = Me(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Ac(t);
  }
  rgbString() {
    return this._valid ? j0(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? C0(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? A0(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const i = this.rgb, s = t.rgb;
      let r;
      const o = n === r ? 0.5 : n, l = 2 * o - 1, a = i.a - s.a, u = ((l * a === -1 ? l : (l + a) / (1 + l * a)) + 1) / 2;
      r = 1 - u, i.r = 255 & u * i.r + r * s.r + 0.5, i.g = 255 & u * i.g + r * s.g + 0.5, i.b = 255 & u * i.b + r * s.b + 0.5, i.a = o * i.a + (1 - o) * s.a, this.rgb = i;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = W0(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new gs(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = en(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Es(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = n, this;
  }
  opaquer(t) {
    const n = this._rgb;
    return n.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return Gs(this._rgb, 2, t), this;
  }
  darken(t) {
    return Gs(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Gs(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Gs(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return z0(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.4.7
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
function xe() {
}
const V0 = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function U(e) {
  return e == null;
}
function ct(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function N(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function qt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function fe(e, t) {
  return qt(e) ? e : t;
}
function A(e, t) {
  return typeof e > "u" ? t : e;
}
const $0 = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, ap = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Q(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function j(e, t, n, i) {
  let s, r, o;
  if (ct(e))
    for (r = e.length, s = 0; s < r; s++)
      t.call(n, e[s], s);
  else if (N(e))
    for (o = Object.keys(e), r = o.length, s = 0; s < r; s++)
      t.call(n, e[o[s]], o[s]);
}
function Gr(e, t) {
  let n, i, s, r;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, i = e.length; n < i; ++n)
    if (s = e[n], r = t[n], s.datasetIndex !== r.datasetIndex || s.index !== r.index)
      return !1;
  return !0;
}
function Zr(e) {
  if (ct(e))
    return e.map(Zr);
  if (N(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), i = n.length;
    let s = 0;
    for (; s < i; ++s)
      t[n[s]] = Zr(e[n[s]]);
    return t;
  }
  return e;
}
function up(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function U0(e, t, n, i) {
  if (!up(e))
    return;
  const s = t[e], r = n[e];
  N(s) && N(r) ? ms(s, r, i) : t[e] = Zr(r);
}
function ms(e, t, n) {
  const i = ct(t) ? t : [
    t
  ], s = i.length;
  if (!N(e))
    return e;
  n = n || {};
  const r = n.merger || U0;
  let o;
  for (let l = 0; l < s; ++l) {
    if (o = i[l], !N(o))
      continue;
    const a = Object.keys(o);
    for (let u = 0, c = a.length; u < c; ++u)
      r(a[u], e, o, n);
  }
  return e;
}
function Ki(e, t) {
  return ms(e, t, {
    merger: Y0
  });
}
function Y0(e, t, n) {
  if (!up(e))
    return;
  const i = t[e], s = n[e];
  N(i) && N(s) ? Ki(i, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Zr(s));
}
const Ic = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function X0(e) {
  const t = e.split("."), n = [];
  let i = "";
  for (const s of t)
    i += s, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (n.push(i), i = "");
  return n;
}
function K0(e) {
  const t = X0(e);
  return (n) => {
    for (const i of t) {
      if (i === "")
        break;
      n = n && n[i];
    }
    return n;
  };
}
function Tn(e, t) {
  return (Ic[t] || (Ic[t] = K0(t)))(e);
}
function au(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ys = (e) => typeof e < "u", rn = (e) => typeof e == "function", Fc = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Q0(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const rt = Math.PI, st = 2 * rt, G0 = st + rt, Jr = Number.POSITIVE_INFINITY, Z0 = rt / 180, dt = rt / 2, un = rt / 4, Nc = rt * 2 / 3, ta = Math.log10, ve = Math.sign;
function Qi(e, t, n) {
  return Math.abs(e - t) < n;
}
function Bc(e) {
  const t = Math.round(e);
  e = Qi(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(ta(e))), i = e / n;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
}
function J0(e) {
  const t = [], n = Math.sqrt(e);
  let i;
  for (i = 1; i < n; i++)
    e % i === 0 && (t.push(i), t.push(e / i));
  return n === (n | 0) && t.push(n), t.sort((s, r) => s - r).pop(), t;
}
function vs(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}
function q0(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function ty(e, t, n) {
  let i, s, r;
  for (i = 0, s = e.length; i < s; i++)
    r = e[i][n], isNaN(r) || (t.min = Math.min(t.min, r), t.max = Math.max(t.max, r));
}
function Ee(e) {
  return e * (rt / 180);
}
function ey(e) {
  return e * (180 / rt);
}
function jc(e) {
  if (!qt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function cp(e, t) {
  const n = t.x - e.x, i = t.y - e.y, s = Math.sqrt(n * n + i * i);
  let r = Math.atan2(i, n);
  return r < -0.5 * rt && (r += st), {
    angle: r,
    distance: s
  };
}
function ea(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function ny(e, t) {
  return (e - t + G0) % st - rt;
}
function Fe(e) {
  return (e % st + st) % st;
}
function _s(e, t, n, i) {
  const s = Fe(e), r = Fe(t), o = Fe(n), l = Fe(r - s), a = Fe(o - s), u = Fe(s - r), c = Fe(s - o);
  return s === r || s === o || i && r === o || l > a && u < c;
}
function St(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function iy(e) {
  return St(e, -32768, 32767);
}
function Ue(e, t, n, i = 1e-6) {
  return e >= Math.min(t, n) - i && e <= Math.max(t, n) + i;
}
function uu(e, t, n) {
  n = n || ((o) => e[o] < t);
  let i = e.length - 1, s = 0, r;
  for (; i - s > 1; )
    r = s + i >> 1, n(r) ? s = r : i = r;
  return {
    lo: s,
    hi: i
  };
}
const _n = (e, t, n, i) => uu(e, n, i ? (s) => {
  const r = e[s][t];
  return r < n || r === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), sy = (e, t, n) => uu(e, n, (i) => e[i][t] >= n);
function ry(e, t, n) {
  let i = 0, s = e.length;
  for (; i < s && e[i] < t; )
    i++;
  for (; s > i && e[s - 1] > n; )
    s--;
  return i > 0 || s < e.length ? e.slice(i, s) : e;
}
const fp = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function oy(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), fp.forEach((n) => {
    const i = "_onData" + au(n), s = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...r) {
        const o = s.apply(this, r);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[i] == "function" && l[i](...r);
        }), o;
      }
    });
  });
}
function Wc(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const i = n.listeners, s = i.indexOf(t);
  s !== -1 && i.splice(s, 1), !(i.length > 0) && (fp.forEach((r) => {
    delete e[r];
  }), delete e._chartjs);
}
function dp(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const hp = function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
}();
function pp(e, t) {
  let n = [], i = !1;
  return function(...s) {
    n = s, i || (i = !0, hp.call(window, () => {
      i = !1, e.apply(t, n);
    }));
  };
}
function ly(e, t) {
  let n;
  return function(...i) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, i)) : e.apply(this, i), t;
  };
}
const cu = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", wt = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, ay = (e, t, n, i) => e === (i ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function uy(e, t, n) {
  const i = t.length;
  let s = 0, r = i;
  if (e._sorted) {
    const { iScale: o, _parsed: l } = e, a = o.axis, { min: u, max: c, minDefined: f, maxDefined: d } = o.getUserBounds();
    f && (s = St(Math.min(
      // @ts-expect-error Need to type _parsed
      _n(l, a, u).lo,
      // @ts-expect-error Need to fix types on _lookupByKey
      n ? i : _n(t, a, o.getPixelForValue(u)).lo
    ), 0, i - 1)), d ? r = St(Math.max(
      // @ts-expect-error Need to type _parsed
      _n(l, o.axis, c, !0).hi + 1,
      // @ts-expect-error Need to fix types on _lookupByKey
      n ? 0 : _n(t, a, o.getPixelForValue(c), !0).hi + 1
    ), s, i) - s : r = i - s;
  }
  return {
    start: s,
    count: r
  };
}
function cy(e) {
  const { xScale: t, yScale: n, _scaleRanges: i } = e, s = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!i)
    return e._scaleRanges = s, !0;
  const r = i.xmin !== t.min || i.xmax !== t.max || i.ymin !== n.min || i.ymax !== n.max;
  return Object.assign(i, s), r;
}
const Zs = (e) => e === 0 || e === 1, Hc = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * st / n)), Vc = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * st / n) + 1, Gi = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => -e * (e - 2),
  easeInOutQuad: (e) => (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1),
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => (e -= 1) * e * e + 1,
  easeInOutCubic: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2),
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => -((e -= 1) * e * e * e - 1),
  easeInOutQuart: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => (e -= 1) * e * e * e * e + 1,
  easeInOutQuint: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2),
  easeInSine: (e) => -Math.cos(e * dt) + 1,
  easeOutSine: (e) => Math.sin(e * dt),
  easeInOutSine: (e) => -0.5 * (Math.cos(rt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Zs(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Zs(e) ? e : Hc(e, 0.075, 0.3),
  easeOutElastic: (e) => Zs(e) ? e : Vc(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Zs(e) ? e : e < 0.5 ? 0.5 * Hc(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Vc(e * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(e) {
    return e * e * ((1.70158 + 1) * e - 1.70158);
  },
  easeOutBack(e) {
    return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1;
  },
  easeInOutBack(e) {
    let t = 1.70158;
    return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  },
  easeInBounce: (e) => 1 - Gi.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Gi.easeInBounce(e * 2) * 0.5 : Gi.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function fu(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function $c(e) {
  return fu(e) ? e : new gs(e);
}
function Go(e) {
  return fu(e) ? e : new gs(e).saturate(0.5).darken(0.1).hexString();
}
const fy = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], dy = [
  "color",
  "borderColor",
  "backgroundColor"
];
function hy(e) {
  e.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), e.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), e.set("animations", {
    colors: {
      type: "color",
      properties: dy
    },
    numbers: {
      type: "number",
      properties: fy
    }
  }), e.describe("animations", {
    _fallback: "animation"
  }), e.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function py(e) {
  e.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const Uc = /* @__PURE__ */ new Map();
function gy(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let i = Uc.get(n);
  return i || (i = new Intl.NumberFormat(e, t), Uc.set(n, i)), i;
}
function du(e, t, n) {
  return gy(t, n).format(e);
}
const gp = {
  values(e) {
    return ct(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const i = this.chart.options.locale;
    let s, r = e;
    if (n.length > 1) {
      const u = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (u < 1e-4 || u > 1e15) && (s = "scientific"), r = my(e, n);
    }
    const o = ta(Math.abs(r)), l = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), a = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(a, this.options.ticks.format), du(e, i, a);
  },
  logarithmic(e, t, n) {
    if (e === 0)
      return "0";
    const i = n[t].significand || e / Math.pow(10, Math.floor(ta(e)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(i) || t > 0.8 * n.length ? gp.numeric.call(this, e, t, n) : "";
  }
};
function my(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var mp = {
  formatters: gp
};
function yy(e) {
  e.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, n) => n.lineWidth,
      tickColor: (t, n) => n.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: mp.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), e.route("scale.ticks", "color", "", "color"), e.route("scale.grid", "color", "", "borderColor"), e.route("scale.border", "color", "", "borderColor"), e.route("scale.title", "color", "", "color"), e.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), e.describe("scales", {
    _fallback: "scale"
  }), e.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const On = /* @__PURE__ */ Object.create(null), na = /* @__PURE__ */ Object.create(null);
function Zi(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let i = 0, s = n.length; i < s; ++i) {
    const r = n[i];
    e = e[r] || (e[r] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Zo(e, t, n) {
  return typeof t == "string" ? ms(Zi(e, t), n) : ms(Zi(e, ""), t);
}
class vy {
  constructor(t, n) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (i, s) => Go(s.backgroundColor), this.hoverBorderColor = (i, s) => Go(s.borderColor), this.hoverColor = (i, s) => Go(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Zo(this, t, n);
  }
  get(t) {
    return Zi(this, t);
  }
  describe(t, n) {
    return Zo(na, t, n);
  }
  override(t, n) {
    return Zo(On, t, n);
  }
  route(t, n, i, s) {
    const r = Zi(this, t), o = Zi(this, i), l = "_" + n;
    Object.defineProperties(r, {
      [l]: {
        value: r[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const a = this[l], u = o[s];
          return N(a) ? Object.assign({}, u, a) : A(a, u);
        },
        set(a) {
          this[l] = a;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var lt = /* @__PURE__ */ new vy({
  _scriptable: (e) => !e.startsWith("on"),
  _indexable: (e) => e !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  hy,
  py,
  yy
]);
function _y(e) {
  return !e || U(e.size) || U(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Yc(e, t, n, i, s) {
  let r = t[s];
  return r || (r = t[s] = e.measureText(s).width, n.push(s)), r > i && (i = r), i;
}
function cn(e, t, n) {
  const i = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * i) / i + s;
}
function Xc(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function ia(e, t, n, i) {
  yp(e, t, n, i, null);
}
function yp(e, t, n, i, s) {
  let r, o, l, a, u, c, f, d;
  const h = t.pointStyle, m = t.rotation, y = t.radius;
  let _ = (m || 0) * Z0;
  if (h && typeof h == "object" && (r = h.toString(), r === "[object HTMLImageElement]" || r === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, i), e.rotate(_), e.drawImage(h, -h.width / 2, -h.height / 2, h.width, h.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), h) {
      default:
        s ? e.ellipse(n, i, s / 2, y, 0, 0, st) : e.arc(n, i, y, 0, st), e.closePath();
        break;
      case "triangle":
        c = s ? s / 2 : y, e.moveTo(n + Math.sin(_) * c, i - Math.cos(_) * y), _ += Nc, e.lineTo(n + Math.sin(_) * c, i - Math.cos(_) * y), _ += Nc, e.lineTo(n + Math.sin(_) * c, i - Math.cos(_) * y), e.closePath();
        break;
      case "rectRounded":
        u = y * 0.516, a = y - u, o = Math.cos(_ + un) * a, f = Math.cos(_ + un) * (s ? s / 2 - u : a), l = Math.sin(_ + un) * a, d = Math.sin(_ + un) * (s ? s / 2 - u : a), e.arc(n - f, i - l, u, _ - rt, _ - dt), e.arc(n + d, i - o, u, _ - dt, _), e.arc(n + f, i + l, u, _, _ + dt), e.arc(n - d, i + o, u, _ + dt, _ + rt), e.closePath();
        break;
      case "rect":
        if (!m) {
          a = Math.SQRT1_2 * y, c = s ? s / 2 : a, e.rect(n - c, i - a, 2 * c, 2 * a);
          break;
        }
        _ += un;
      case "rectRot":
        f = Math.cos(_) * (s ? s / 2 : y), o = Math.cos(_) * y, l = Math.sin(_) * y, d = Math.sin(_) * (s ? s / 2 : y), e.moveTo(n - f, i - l), e.lineTo(n + d, i - o), e.lineTo(n + f, i + l), e.lineTo(n - d, i + o), e.closePath();
        break;
      case "crossRot":
        _ += un;
      case "cross":
        f = Math.cos(_) * (s ? s / 2 : y), o = Math.cos(_) * y, l = Math.sin(_) * y, d = Math.sin(_) * (s ? s / 2 : y), e.moveTo(n - f, i - l), e.lineTo(n + f, i + l), e.moveTo(n + d, i - o), e.lineTo(n - d, i + o);
        break;
      case "star":
        f = Math.cos(_) * (s ? s / 2 : y), o = Math.cos(_) * y, l = Math.sin(_) * y, d = Math.sin(_) * (s ? s / 2 : y), e.moveTo(n - f, i - l), e.lineTo(n + f, i + l), e.moveTo(n + d, i - o), e.lineTo(n - d, i + o), _ += un, f = Math.cos(_) * (s ? s / 2 : y), o = Math.cos(_) * y, l = Math.sin(_) * y, d = Math.sin(_) * (s ? s / 2 : y), e.moveTo(n - f, i - l), e.lineTo(n + f, i + l), e.moveTo(n + d, i - o), e.lineTo(n - d, i + o);
        break;
      case "line":
        o = s ? s / 2 : Math.cos(_) * y, l = Math.sin(_) * y, e.moveTo(n - o, i - l), e.lineTo(n + o, i + l);
        break;
      case "dash":
        e.moveTo(n, i), e.lineTo(n + Math.cos(_) * (s ? s / 2 : y), i + Math.sin(_) * y);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function xs(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function hu(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function pu(e) {
  e.restore();
}
function xy(e, t, n, i, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const r = (t.x + n.x) / 2;
    e.lineTo(r, t.y), e.lineTo(r, n.y);
  } else s === "after" != !!i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function wy(e, t, n, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(i ? t.cp1x : t.cp2x, i ? t.cp1y : t.cp2y, i ? n.cp2x : n.cp1x, i ? n.cp2y : n.cp1y, n.x, n.y);
}
function ky(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), U(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Sy(e, t, n, i, s) {
  if (s.strikethrough || s.underline) {
    const r = e.measureText(i), o = t - r.actualBoundingBoxLeft, l = t + r.actualBoundingBoxRight, a = n - r.actualBoundingBoxAscent, u = n + r.actualBoundingBoxDescent, c = s.strikethrough ? (a + u) / 2 : u;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(o, c), e.lineTo(l, c), e.stroke();
  }
}
function by(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function ws(e, t, n, i, s, r = {}) {
  const o = ct(t) ? t : [
    t
  ], l = r.strokeWidth > 0 && r.strokeColor !== "";
  let a, u;
  for (e.save(), e.font = s.string, ky(e, r), a = 0; a < o.length; ++a)
    u = o[a], r.backdrop && by(e, r.backdrop), l && (r.strokeColor && (e.strokeStyle = r.strokeColor), U(r.strokeWidth) || (e.lineWidth = r.strokeWidth), e.strokeText(u, n, i, r.maxWidth)), e.fillText(u, n, i, r.maxWidth), Sy(e, n, i, u, r), i += Number(s.lineHeight);
  e.restore();
}
function qr(e, t) {
  const { x: n, y: i, w: s, h: r, radius: o } = t;
  e.arc(n + o.topLeft, i + o.topLeft, o.topLeft, 1.5 * rt, rt, !0), e.lineTo(n, i + r - o.bottomLeft), e.arc(n + o.bottomLeft, i + r - o.bottomLeft, o.bottomLeft, rt, dt, !0), e.lineTo(n + s - o.bottomRight, i + r), e.arc(n + s - o.bottomRight, i + r - o.bottomRight, o.bottomRight, dt, 0, !0), e.lineTo(n + s, i + o.topRight), e.arc(n + s - o.topRight, i + o.topRight, o.topRight, 0, -dt, !0), e.lineTo(n + o.topLeft, i);
}
const My = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Cy = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Py(e, t) {
  const n = ("" + e).match(My);
  if (!n || n[1] === "normal")
    return t * 1.2;
  switch (e = +n[2], n[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const Ey = (e) => +e || 0;
function gu(e, t) {
  const n = {}, i = N(t), s = i ? Object.keys(t) : t, r = N(e) ? i ? (o) => A(e[o], e[t[o]]) : (o) => e[o] : () => e;
  for (const o of s)
    n[o] = Ey(r(o));
  return n;
}
function vp(e) {
  return gu(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ni(e) {
  return gu(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function te(e) {
  const t = vp(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function bt(e, t) {
  e = e || {}, t = t || lt.font;
  let n = A(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let i = A(e.style, t.style);
  i && !("" + i).match(Cy) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const s = {
    family: A(e.family, t.family),
    lineHeight: Py(A(e.lineHeight, t.lineHeight), n),
    size: n,
    style: i,
    weight: A(e.weight, t.weight),
    string: ""
  };
  return s.string = _y(s), s;
}
function Js(e, t, n, i) {
  let s, r, o;
  for (s = 0, r = e.length; s < r; ++s)
    if (o = e[s], o !== void 0 && o !== void 0)
      return o;
}
function Ty(e, t, n) {
  const { min: i, max: s } = e, r = ap(t, (s - i) / 2), o = (l, a) => n && l === 0 ? 0 : l + a;
  return {
    min: o(i, -Math.abs(r)),
    max: o(s, r)
  };
}
function Ln(e, t) {
  return Object.assign(Object.create(e), t);
}
function mu(e, t = [
  ""
], n, i, s = () => e[0]) {
  const r = n || e;
  typeof i > "u" && (i = kp("_fallback", e));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: r,
    _fallback: i,
    _getTarget: s,
    override: (l) => mu([
      l,
      ...e
    ], t, r, i)
  };
  return new Proxy(o, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, a) {
      return delete l[a], delete l._keys, delete e[0][a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, a) {
      return xp(l, a, () => Fy(a, t, e, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(l, a) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], a);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(l, a) {
      return Qc(l).includes(a);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Qc(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, a, u) {
      const c = l._storage || (l._storage = s());
      return l[a] = c[a] = u, delete l._keys, !0;
    }
  });
}
function fi(e, t, n, i) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: _p(e, i),
    setContext: (r) => fi(e, r, n, i),
    override: (r) => fi(e.override(r), t, n, i)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(r, o) {
      return delete r[o], delete e[o], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(r, o, l) {
      return xp(r, o, () => Dy(r, o, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(r, o) {
      return r._descriptors.allKeys ? Reflect.has(e, o) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, o);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    /**
    * A trap for the in operator.
    */
    has(r, o) {
      return Reflect.has(e, o);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    /**
    * A trap for setting property values.
    */
    set(r, o, l) {
      return e[o] = l, delete r[o], !0;
    }
  });
}
function _p(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: i = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: i,
    isScriptable: rn(n) ? n : () => n,
    isIndexable: rn(i) ? i : () => i
  };
}
const Oy = (e, t) => e ? e + au(t) : t, yu = (e, t) => N(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function xp(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const i = n();
  return e[t] = i, i;
}
function Dy(e, t, n) {
  const { _proxy: i, _context: s, _subProxy: r, _descriptors: o } = e;
  let l = i[t];
  return rn(l) && o.isScriptable(t) && (l = Ry(t, l, e, n)), ct(l) && l.length && (l = Ly(t, l, e, o.isIndexable)), yu(t, l) && (l = fi(l, s, r && r[t], o)), l;
}
function Ry(e, t, n, i) {
  const { _proxy: s, _context: r, _subProxy: o, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let a = t(r, o || i);
  return l.delete(e), yu(e, a) && (a = vu(s._scopes, s, e, a)), a;
}
function Ly(e, t, n, i) {
  const { _proxy: s, _context: r, _subProxy: o, _descriptors: l } = n;
  if (typeof r.index < "u" && i(e))
    return t[r.index % t.length];
  if (N(t[0])) {
    const a = t, u = s._scopes.filter((c) => c !== a);
    t = [];
    for (const c of a) {
      const f = vu(u, s, e, c);
      t.push(fi(f, r, o && o[e], l));
    }
  }
  return t;
}
function wp(e, t, n) {
  return rn(e) ? e(t, n) : e;
}
const zy = (e, t) => e === !0 ? t : typeof e == "string" ? Tn(t, e) : void 0;
function Ay(e, t, n, i, s) {
  for (const r of t) {
    const o = zy(n, r);
    if (o) {
      e.add(o);
      const l = wp(o._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== i)
        return l;
    } else if (o === !1 && typeof i < "u" && n !== i)
      return null;
  }
  return !1;
}
function vu(e, t, n, i) {
  const s = t._rootScopes, r = wp(t._fallback, n, i), o = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(i);
  let a = Kc(l, o, n, r || n, i);
  return a === null || typeof r < "u" && r !== n && (a = Kc(l, o, r, a, i), a === null) ? !1 : mu(Array.from(l), [
    ""
  ], s, r, () => Iy(t, n, i));
}
function Kc(e, t, n, i, s) {
  for (; n; )
    n = Ay(e, t, n, i, s);
  return n;
}
function Iy(e, t, n) {
  const i = e._getTarget();
  t in i || (i[t] = {});
  const s = i[t];
  return ct(s) && N(n) ? n : s || {};
}
function Fy(e, t, n, i) {
  let s;
  for (const r of t)
    if (s = kp(Oy(r, e), n), typeof s < "u")
      return yu(e, s) ? vu(n, i, e, s) : s;
}
function kp(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const i = n[e];
    if (typeof i < "u")
      return i;
  }
}
function Qc(e) {
  let t = e._keys;
  return t || (t = e._keys = Ny(e._scopes)), t;
}
function Ny(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const i of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(i);
  return Array.from(t);
}
const By = Number.EPSILON || 1e-14, di = (e, t) => t < e.length && !e[t].skip && e[t], Sp = (e) => e === "x" ? "y" : "x";
function jy(e, t, n, i) {
  const s = e.skip ? t : e, r = t, o = n.skip ? t : n, l = ea(r, s), a = ea(o, r);
  let u = l / (l + a), c = a / (l + a);
  u = isNaN(u) ? 0 : u, c = isNaN(c) ? 0 : c;
  const f = i * u, d = i * c;
  return {
    previous: {
      x: r.x - f * (o.x - s.x),
      y: r.y - f * (o.y - s.y)
    },
    next: {
      x: r.x + d * (o.x - s.x),
      y: r.y + d * (o.y - s.y)
    }
  };
}
function Wy(e, t, n) {
  const i = e.length;
  let s, r, o, l, a, u = di(e, 0);
  for (let c = 0; c < i - 1; ++c)
    if (a = u, u = di(e, c + 1), !(!a || !u)) {
      if (Qi(t[c], 0, By)) {
        n[c] = n[c + 1] = 0;
        continue;
      }
      s = n[c] / t[c], r = n[c + 1] / t[c], l = Math.pow(s, 2) + Math.pow(r, 2), !(l <= 9) && (o = 3 / Math.sqrt(l), n[c] = s * o * t[c], n[c + 1] = r * o * t[c]);
    }
}
function Hy(e, t, n = "x") {
  const i = Sp(n), s = e.length;
  let r, o, l, a = di(e, 0);
  for (let u = 0; u < s; ++u) {
    if (o = l, l = a, a = di(e, u + 1), !l)
      continue;
    const c = l[n], f = l[i];
    o && (r = (c - o[n]) / 3, l[`cp1${n}`] = c - r, l[`cp1${i}`] = f - r * t[u]), a && (r = (a[n] - c) / 3, l[`cp2${n}`] = c + r, l[`cp2${i}`] = f + r * t[u]);
  }
}
function Vy(e, t = "x") {
  const n = Sp(t), i = e.length, s = Array(i).fill(0), r = Array(i);
  let o, l, a, u = di(e, 0);
  for (o = 0; o < i; ++o)
    if (l = a, a = u, u = di(e, o + 1), !!a) {
      if (u) {
        const c = u[t] - a[t];
        s[o] = c !== 0 ? (u[n] - a[n]) / c : 0;
      }
      r[o] = l ? u ? ve(s[o - 1]) !== ve(s[o]) ? 0 : (s[o - 1] + s[o]) / 2 : s[o - 1] : s[o];
    }
  Wy(e, s, r), Hy(e, r, t);
}
function qs(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function $y(e, t) {
  let n, i, s, r, o, l = xs(e[0], t);
  for (n = 0, i = e.length; n < i; ++n)
    o = r, r = l, l = n < i - 1 && xs(e[n + 1], t), r && (s = e[n], o && (s.cp1x = qs(s.cp1x, t.left, t.right), s.cp1y = qs(s.cp1y, t.top, t.bottom)), l && (s.cp2x = qs(s.cp2x, t.left, t.right), s.cp2y = qs(s.cp2y, t.top, t.bottom)));
}
function Uy(e, t, n, i, s) {
  let r, o, l, a;
  if (t.spanGaps && (e = e.filter((u) => !u.skip)), t.cubicInterpolationMode === "monotone")
    Vy(e, s);
  else {
    let u = i ? e[e.length - 1] : e[0];
    for (r = 0, o = e.length; r < o; ++r)
      l = e[r], a = jy(u, l, e[Math.min(r + 1, o - (i ? 0 : 1)) % o], t.tension), l.cp1x = a.previous.x, l.cp1y = a.previous.y, l.cp2x = a.next.x, l.cp2y = a.next.y, u = l;
  }
  t.capBezierPoints && $y(e, n);
}
function _u() {
  return typeof window < "u" && typeof document < "u";
}
function xu(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function to(e, t, n) {
  let i;
  return typeof e == "string" ? (i = parseInt(e, 10), e.indexOf("%") !== -1 && (i = i / 100 * t.parentNode[n])) : i = e, i;
}
const xo = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Yy(e, t) {
  return xo(e).getPropertyValue(t);
}
const Xy = [
  "top",
  "right",
  "bottom",
  "left"
];
function kn(e, t, n) {
  const i = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const r = Xy[s];
    i[r] = parseFloat(e[t + "-" + r + n]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const Ky = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Qy(e, t) {
  const n = e.touches, i = n && n.length ? n[0] : e, { offsetX: s, offsetY: r } = i;
  let o = !1, l, a;
  if (Ky(s, r, e.target))
    l = s, a = r;
  else {
    const u = t.getBoundingClientRect();
    l = i.clientX - u.left, a = i.clientY - u.top, o = !0;
  }
  return {
    x: l,
    y: a,
    box: o
  };
}
function pn(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: i } = t, s = xo(n), r = s.boxSizing === "border-box", o = kn(s, "padding"), l = kn(s, "border", "width"), { x: a, y: u, box: c } = Qy(e, n), f = o.left + (c && l.left), d = o.top + (c && l.top);
  let { width: h, height: m } = t;
  return r && (h -= o.width + l.width, m -= o.height + l.height), {
    x: Math.round((a - f) / h * n.width / i),
    y: Math.round((u - d) / m * n.height / i)
  };
}
function Gy(e, t, n) {
  let i, s;
  if (t === void 0 || n === void 0) {
    const r = e && xu(e);
    if (!r)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const o = r.getBoundingClientRect(), l = xo(r), a = kn(l, "border", "width"), u = kn(l, "padding");
      t = o.width - u.width - a.width, n = o.height - u.height - a.height, i = to(l.maxWidth, r, "clientWidth"), s = to(l.maxHeight, r, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: i || Jr,
    maxHeight: s || Jr
  };
}
const tr = (e) => Math.round(e * 10) / 10;
function Zy(e, t, n, i) {
  const s = xo(e), r = kn(s, "margin"), o = to(s.maxWidth, e, "clientWidth") || Jr, l = to(s.maxHeight, e, "clientHeight") || Jr, a = Gy(e, t, n);
  let { width: u, height: c } = a;
  if (s.boxSizing === "content-box") {
    const d = kn(s, "border", "width"), h = kn(s, "padding");
    u -= h.width + d.width, c -= h.height + d.height;
  }
  return u = Math.max(0, u - r.width), c = Math.max(0, i ? u / i : c - r.height), u = tr(Math.min(u, o, a.maxWidth)), c = tr(Math.min(c, l, a.maxHeight)), u && !c && (c = tr(u / 2)), (t !== void 0 || n !== void 0) && i && a.height && c > a.height && (c = a.height, u = tr(Math.floor(c * i))), {
    width: u,
    height: c
  };
}
function Gc(e, t, n) {
  const i = t || 1, s = Math.floor(e.height * i), r = Math.floor(e.width * i);
  e.height = Math.floor(e.height), e.width = Math.floor(e.width);
  const o = e.canvas;
  return o.style && (n || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== i || o.height !== s || o.width !== r ? (e.currentDevicePixelRatio = i, o.height = s, o.width = r, e.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const Jy = function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    _u() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
}();
function Zc(e, t) {
  const n = Yy(e, t), i = n && n.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function gn(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function qy(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: i === "middle" ? n < 0.5 ? e.y : t.y : i === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function tv(e, t, n, i) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, r = {
    x: t.cp1x,
    y: t.cp1y
  }, o = gn(e, s, n), l = gn(s, r, n), a = gn(r, t, n), u = gn(o, l, n), c = gn(l, a, n);
  return gn(u, c, n);
}
const ev = function(e, t) {
  return {
    x(n) {
      return e + e + t - n;
    },
    setWidth(n) {
      t = n;
    },
    textAlign(n) {
      return n === "center" ? n : n === "right" ? "left" : "right";
    },
    xPlus(n, i) {
      return n - i;
    },
    leftForLtr(n, i) {
      return n - i;
    }
  };
}, nv = function() {
  return {
    x(e) {
      return e;
    },
    setWidth(e) {
    },
    textAlign(e) {
      return e;
    },
    xPlus(e, t) {
      return e + t;
    },
    leftForLtr(e, t) {
      return e;
    }
  };
};
function ii(e, t, n) {
  return e ? ev(t, n) : nv();
}
function bp(e, t) {
  let n, i;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, i = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = i);
}
function Mp(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Cp(e) {
  return e === "angle" ? {
    between: _s,
    compare: ny,
    normalize: Fe
  } : {
    between: Ue,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Jc({ start: e, end: t, count: n, loop: i, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: i && (t - e + 1) % n === 0,
    style: s
  };
}
function iv(e, t, n) {
  const { property: i, start: s, end: r } = n, { between: o, normalize: l } = Cp(i), a = t.length;
  let { start: u, end: c, loop: f } = e, d, h;
  if (f) {
    for (u += a, c += a, d = 0, h = a; d < h && o(l(t[u % a][i]), s, r); ++d)
      u--, c--;
    u %= a, c %= a;
  }
  return c < u && (c += a), {
    start: u,
    end: c,
    loop: f,
    style: e.style
  };
}
function sv(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: i, start: s, end: r } = n, o = t.length, { compare: l, between: a, normalize: u } = Cp(i), { start: c, end: f, loop: d, style: h } = iv(e, t, n), m = [];
  let y = !1, _ = null, p, g, v;
  const x = () => a(s, v, p) && l(s, v) !== 0, w = () => l(r, p) === 0 || a(r, v, p), k = () => y || x(), S = () => !y || w();
  for (let b = c, E = c; b <= f; ++b)
    g = t[b % o], !g.skip && (p = u(g[i]), p !== v && (y = a(p, s, r), _ === null && k() && (_ = l(p, s) === 0 ? b : E), _ !== null && S() && (m.push(Jc({
      start: _,
      end: b,
      loop: d,
      count: o,
      style: h
    })), _ = null), E = b, v = p));
  return _ !== null && m.push(Jc({
    start: _,
    end: f,
    loop: d,
    count: o,
    style: h
  })), m;
}
function rv(e, t) {
  const n = [], i = e.segments;
  for (let s = 0; s < i.length; s++) {
    const r = sv(i[s], e.points, t);
    r.length && n.push(...r);
  }
  return n;
}
function ov(e, t, n, i) {
  let s = 0, r = t - 1;
  if (n && !i)
    for (; s < t && !e[s].skip; )
      s++;
  for (; s < t && e[s].skip; )
    s++;
  for (s %= t, n && (r += s); r > s && e[r % t].skip; )
    r--;
  return r %= t, {
    start: s,
    end: r
  };
}
function lv(e, t, n, i) {
  const s = e.length, r = [];
  let o = t, l = e[t], a;
  for (a = t + 1; a <= n; ++a) {
    const u = e[a % s];
    u.skip || u.stop ? l.skip || (i = !1, r.push({
      start: t % s,
      end: (a - 1) % s,
      loop: i
    }), t = o = u.stop ? a : null) : (o = a, l.skip && (t = a)), l = u;
  }
  return o !== null && r.push({
    start: t % s,
    end: o % s,
    loop: i
  }), r;
}
function av(e, t) {
  const n = e.points, i = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const r = !!e._loop, { start: o, end: l } = ov(n, s, r, i);
  if (i === !0)
    return qc(e, [
      {
        start: o,
        end: l,
        loop: r
      }
    ], n, t);
  const a = l < o ? l + s : l, u = !!e._fullLoop && o === 0 && l === s - 1;
  return qc(e, lv(n, o, a, u), n, t);
}
function qc(e, t, n, i) {
  return !i || !i.setContext || !n ? t : uv(e, t, n, i);
}
function uv(e, t, n, i) {
  const s = e._chart.getContext(), r = tf(e.options), { _datasetIndex: o, options: { spanGaps: l } } = e, a = n.length, u = [];
  let c = r, f = t[0].start, d = f;
  function h(m, y, _, p) {
    const g = l ? -1 : 1;
    if (m !== y) {
      for (m += a; n[m % a].skip; )
        m -= g;
      for (; n[y % a].skip; )
        y += g;
      m % a !== y % a && (u.push({
        start: m % a,
        end: y % a,
        loop: _,
        style: p
      }), c = p, f = y % a);
    }
  }
  for (const m of t) {
    f = l ? f : m.start;
    let y = n[f % a], _;
    for (d = f + 1; d <= m.end; d++) {
      const p = n[d % a];
      _ = tf(i.setContext(Ln(s, {
        type: "segment",
        p0: y,
        p1: p,
        p0DataIndex: (d - 1) % a,
        p1DataIndex: d % a,
        datasetIndex: o
      }))), cv(_, c) && h(f, d - 1, m.loop, c), y = p, c = _;
    }
    f < d - 1 && h(f, d - 1, m.loop, c);
  }
  return u;
}
function tf(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor
  };
}
function cv(e, t) {
  if (!t)
    return !1;
  const n = [], i = function(s, r) {
    return fu(r) ? (n.includes(r) || n.push(r), n.indexOf(r)) : r;
  };
  return JSON.stringify(e, i) !== JSON.stringify(t, i);
}
/*!
 * Chart.js v4.4.7
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
class fv {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, i, s) {
    const r = n.listeners[s], o = n.duration;
    r.forEach((l) => l({
      chart: t,
      initial: n.initial,
      numSteps: o,
      currentStep: Math.min(i - n.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = hp.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((i, s) => {
      if (!i.running || !i.items.length)
        return;
      const r = i.items;
      let o = r.length - 1, l = !1, a;
      for (; o >= 0; --o)
        a = r[o], a._active ? (a._total > i.duration && (i.duration = a._total), a.tick(t), l = !0) : (r[o] = r[r.length - 1], r.pop());
      l && (s.draw(), this._notify(s, i, t, "progress")), r.length || (i.running = !1, this._notify(s, i, t, "complete"), i.initial = !1), n += r.length;
    }), this._lastDate = t, n === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const n = this._charts;
    let i = n.get(t);
    return i || (i = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(t, i)), i;
  }
  listen(t, n, i) {
    this._getAnims(t).listeners[n].push(i);
  }
  add(t, n) {
    !n || !n.length || this._getAnims(t).items.push(...n);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const n = this._charts.get(t);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((i, s) => Math.max(i, s._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const n = this._charts.get(t);
    return !(!n || !n.running || !n.items.length);
  }
  stop(t) {
    const n = this._charts.get(t);
    if (!n || !n.items.length)
      return;
    const i = n.items;
    let s = i.length - 1;
    for (; s >= 0; --s)
      i[s].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var we = /* @__PURE__ */ new fv();
const ef = "transparent", dv = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const i = $c(e || ef), s = i.valid && $c(t || ef);
    return s && s.valid ? s.mix(i, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class hv {
  constructor(t, n, i, s) {
    const r = n[i];
    s = Js([
      t.to,
      s,
      r,
      t.from
    ]);
    const o = Js([
      t.from,
      r,
      s
    ]);
    this._active = !0, this._fn = t.fn || dv[t.type || typeof o], this._easing = Gi[t.easing] || Gi.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = i, this._from = o, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, i) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], r = i - this._start, o = this._duration - r;
      this._start = i, this._duration = Math.floor(Math.max(o, t.duration)), this._total += r, this._loop = !!t.loop, this._to = Js([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Js([
        t.from,
        s,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, i = this._duration, s = this._prop, r = this._from, o = this._loop, l = this._to;
    let a;
    if (this._active = r !== l && (o || n < i), !this._active) {
      this._target[s] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = r;
      return;
    }
    a = n / i % 2, a = o && a > 1 ? 2 - a : a, a = this._easing(Math.min(1, Math.max(0, a))), this._target[s] = this._fn(r, l, a);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((n, i) => {
      t.push({
        res: n,
        rej: i
      });
    });
  }
  _notify(t) {
    const n = t ? "res" : "rej", i = this._promises || [];
    for (let s = 0; s < i.length; s++)
      i[s][n]();
  }
}
class Pp {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!N(t))
      return;
    const n = Object.keys(lt.animation), i = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const r = t[s];
      if (!N(r))
        return;
      const o = {};
      for (const l of n)
        o[l] = r[l];
      (ct(r.properties) && r.properties || [
        s
      ]).forEach((l) => {
        (l === s || !i.has(l)) && i.set(l, o);
      });
    });
  }
  _animateOptions(t, n) {
    const i = n.options, s = gv(t, i);
    if (!s)
      return [];
    const r = this._createAnimations(s, i);
    return i.$shared && pv(t.options.$animations, i).then(() => {
      t.options = i;
    }, () => {
    }), r;
  }
  _createAnimations(t, n) {
    const i = this._properties, s = [], r = t.$animations || (t.$animations = {}), o = Object.keys(n), l = Date.now();
    let a;
    for (a = o.length - 1; a >= 0; --a) {
      const u = o[a];
      if (u.charAt(0) === "$")
        continue;
      if (u === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const c = n[u];
      let f = r[u];
      const d = i.get(u);
      if (f)
        if (d && f.active()) {
          f.update(d, c, l);
          continue;
        } else
          f.cancel();
      if (!d || !d.duration) {
        t[u] = c;
        continue;
      }
      r[u] = f = new hv(d, t, u, c), s.push(f);
    }
    return s;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const i = this._createAnimations(t, n);
    if (i.length)
      return we.add(this._chart, i), !0;
  }
}
function pv(e, t) {
  const n = [], i = Object.keys(t);
  for (let s = 0; s < i.length; s++) {
    const r = e[i[s]];
    r && r.active() && n.push(r.wait());
  }
  return Promise.all(n);
}
function gv(e, t) {
  if (!t)
    return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, {
    $shared: !1,
    $animations: {}
  })), n;
}
function nf(e, t) {
  const n = e && e.options || {}, i = n.reverse, s = n.min === void 0 ? t : 0, r = n.max === void 0 ? t : 0;
  return {
    start: i ? r : s,
    end: i ? s : r
  };
}
function mv(e, t, n) {
  if (n === !1)
    return !1;
  const i = nf(e, n), s = nf(t, n);
  return {
    top: s.end,
    right: i.end,
    bottom: s.start,
    left: i.start
  };
}
function yv(e) {
  let t, n, i, s;
  return N(e) ? (t = e.top, n = e.right, i = e.bottom, s = e.left) : t = n = i = s = e, {
    top: t,
    right: n,
    bottom: i,
    left: s,
    disabled: e === !1
  };
}
function Ep(e, t) {
  const n = [], i = e._getSortedDatasetMetas(t);
  let s, r;
  for (s = 0, r = i.length; s < r; ++s)
    n.push(i[s].index);
  return n;
}
function sf(e, t, n, i = {}) {
  const s = e.keys, r = i.mode === "single";
  let o, l, a, u;
  if (t === null)
    return;
  let c = !1;
  for (o = 0, l = s.length; o < l; ++o) {
    if (a = +s[o], a === n) {
      if (c = !0, i.all)
        continue;
      break;
    }
    u = e.values[a], qt(u) && (r || t === 0 || ve(t) === ve(u)) && (t += u);
  }
  return !c && !i.all ? 0 : t;
}
function vv(e, t) {
  const { iScale: n, vScale: i } = t, s = n.axis === "x" ? "x" : "y", r = i.axis === "x" ? "x" : "y", o = Object.keys(e), l = new Array(o.length);
  let a, u, c;
  for (a = 0, u = o.length; a < u; ++a)
    c = o[a], l[a] = {
      [s]: c,
      [r]: e[c]
    };
  return l;
}
function Jo(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function _v(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function xv(e) {
  const { min: t, max: n, minDefined: i, maxDefined: s } = e.getUserBounds();
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function wv(e, t, n) {
  const i = e[t] || (e[t] = {});
  return i[n] || (i[n] = {});
}
function rf(e, t, n, i) {
  for (const s of t.getMatchingVisibleMetas(i).reverse()) {
    const r = e[s.index];
    if (n && r > 0 || !n && r < 0)
      return s.index;
  }
  return null;
}
function of(e, t) {
  const { chart: n, _cachedMeta: i } = e, s = n._stacks || (n._stacks = {}), { iScale: r, vScale: o, index: l } = i, a = r.axis, u = o.axis, c = _v(r, o, i), f = t.length;
  let d;
  for (let h = 0; h < f; ++h) {
    const m = t[h], { [a]: y, [u]: _ } = m, p = m._stacks || (m._stacks = {});
    d = p[u] = wv(s, c, y), d[l] = _, d._top = rf(d, o, !0, i.type), d._bottom = rf(d, o, !1, i.type);
    const g = d._visualValues || (d._visualValues = {});
    g[l] = _;
  }
}
function qo(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((i) => n[i].axis === t).shift();
}
function kv(e, t) {
  return Ln(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Sv(e, t, n) {
  return Ln(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Mi(e, t) {
  const n = e.controller.index, i = e.vScale && e.vScale.axis;
  if (i) {
    t = t || e._parsed;
    for (const s of t) {
      const r = s._stacks;
      if (!r || r[i] === void 0 || r[i][n] === void 0)
        return;
      delete r[i][n], r[i]._visualValues !== void 0 && r[i]._visualValues[n] !== void 0 && delete r[i]._visualValues[n];
    }
  }
}
const tl = (e) => e === "reset" || e === "none", lf = (e, t) => t ? e : Object.assign({}, e), bv = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Ep(n, !0),
  values: null
};
class Sn {
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Jo(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Mi(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, i = this.getDataset(), s = (f, d, h, m) => f === "x" ? d : f === "r" ? m : h, r = n.xAxisID = A(i.xAxisID, qo(t, "x")), o = n.yAxisID = A(i.yAxisID, qo(t, "y")), l = n.rAxisID = A(i.rAxisID, qo(t, "r")), a = n.indexAxis, u = n.iAxisID = s(a, r, o, l), c = n.vAxisID = s(a, o, r, l);
    n.xScale = this.getScaleForId(r), n.yScale = this.getScaleForId(o), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(u), n.vScale = this.getScaleForId(c);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const n = this._cachedMeta;
    return t === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Wc(this._data, this), t._stacked && Mi(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), i = this._data;
    if (N(n)) {
      const s = this._cachedMeta;
      this._data = vv(n, s);
    } else if (i !== n) {
      if (i) {
        Wc(i, this);
        const s = this._cachedMeta;
        Mi(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && oy(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, i = this.getDataset();
    let s = !1;
    this._dataCheck();
    const r = n._stacked;
    n._stacked = Jo(n.vScale, n), n.stack !== i.stack && (s = !0, Mi(n), n.stack = i.stack), this._resyncElements(t), (s || r !== n._stacked) && (of(this, n._parsed), n._stacked = Jo(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), i = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: i, _data: s } = this, { iScale: r, _stacked: o } = i, l = r.axis;
    let a = t === 0 && n === s.length ? !0 : i._sorted, u = t > 0 && i._parsed[t - 1], c, f, d;
    if (this._parsing === !1)
      i._parsed = s, i._sorted = !0, d = s;
    else {
      ct(s[t]) ? d = this.parseArrayData(i, s, t, n) : N(s[t]) ? d = this.parseObjectData(i, s, t, n) : d = this.parsePrimitiveData(i, s, t, n);
      const h = () => f[l] === null || u && f[l] < u[l];
      for (c = 0; c < n; ++c)
        i._parsed[c + t] = f = d[c], a && (h() && (a = !1), u = f);
      i._sorted = a;
    }
    o && of(this, d);
  }
  parsePrimitiveData(t, n, i, s) {
    const { iScale: r, vScale: o } = t, l = r.axis, a = o.axis, u = r.getLabels(), c = r === o, f = new Array(s);
    let d, h, m;
    for (d = 0, h = s; d < h; ++d)
      m = d + i, f[d] = {
        [l]: c || r.parse(u[m], m),
        [a]: o.parse(n[m], m)
      };
    return f;
  }
  parseArrayData(t, n, i, s) {
    const { xScale: r, yScale: o } = t, l = new Array(s);
    let a, u, c, f;
    for (a = 0, u = s; a < u; ++a)
      c = a + i, f = n[c], l[a] = {
        x: r.parse(f[0], c),
        y: o.parse(f[1], c)
      };
    return l;
  }
  parseObjectData(t, n, i, s) {
    const { xScale: r, yScale: o } = t, { xAxisKey: l = "x", yAxisKey: a = "y" } = this._parsing, u = new Array(s);
    let c, f, d, h;
    for (c = 0, f = s; c < f; ++c)
      d = c + i, h = n[d], u[c] = {
        x: r.parse(Tn(h, l), d),
        y: o.parse(Tn(h, a), d)
      };
    return u;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, i) {
    const s = this.chart, r = this._cachedMeta, o = n[t.axis], l = {
      keys: Ep(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return sf(l, o, r.index, {
      mode: i
    });
  }
  updateRangeFromParsed(t, n, i, s) {
    const r = i[n.axis];
    let o = r === null ? NaN : r;
    const l = s && i._stacks[n.axis];
    s && l && (s.values = l, o = sf(s, r, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, n) {
    const i = this._cachedMeta, s = i._parsed, r = i._sorted && t === i.iScale, o = s.length, l = this._getOtherScale(t), a = bv(n, i, this.chart), u = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: c, max: f } = xv(l);
    let d, h;
    function m() {
      h = s[d];
      const y = h[l.axis];
      return !qt(h[t.axis]) || c > y || f < y;
    }
    for (d = 0; d < o && !(!m() && (this.updateRangeFromParsed(u, t, h, a), r)); ++d)
      ;
    if (r) {
      for (d = o - 1; d >= 0; --d)
        if (!m()) {
          this.updateRangeFromParsed(u, t, h, a);
          break;
        }
    }
    return u;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, i = [];
    let s, r, o;
    for (s = 0, r = n.length; s < r; ++s)
      o = n[s][t.axis], qt(o) && i.push(o);
    return i;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = n.iScale, s = n.vScale, r = this.getParsed(t);
    return {
      label: i ? "" + i.getLabelForValue(r[i.axis]) : "",
      value: s ? "" + s.getLabelForValue(r[s.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = yv(A(this.options.clip, mv(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, i = this._cachedMeta, s = i.data || [], r = n.chartArea, o = [], l = this._drawStart || 0, a = this._drawCount || s.length - l, u = this.options.drawActiveElementsOnTop;
    let c;
    for (i.dataset && i.dataset.draw(t, r, l, a), c = l; c < l + a; ++c) {
      const f = s[c];
      f.hidden || (f.active && u ? o.push(f) : f.draw(t, r));
    }
    for (c = 0; c < o.length; ++c)
      o[c].draw(t, r);
  }
  getStyle(t, n) {
    const i = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i);
  }
  getContext(t, n, i) {
    const s = this.getDataset();
    let r;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      r = o.$context || (o.$context = Sv(this.getContext(), t, o)), r.parsed = this.getParsed(t), r.raw = s.data[t], r.index = r.dataIndex = t;
    } else
      r = this.$context || (this.$context = kv(this.chart.getContext(), this.index)), r.dataset = s, r.index = r.datasetIndex = this.index;
    return r.active = !!n, r.mode = i, r;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", i) {
    const s = n === "active", r = this._cachedDataOpts, o = t + "-" + n, l = r[o], a = this.enableOptionSharing && ys(i);
    if (l)
      return lf(l, a);
    const u = this.chart.config, c = u.datasetElementScopeKeys(this._type, t), f = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], d = u.getOptionScopes(this.getDataset(), c), h = Object.keys(lt.elements[t]), m = () => this.getContext(i, s, n), y = u.resolveNamedOptions(d, h, m, f);
    return y.$shared && (y.$shared = a, r[o] = Object.freeze(lf(y, a))), y;
  }
  _resolveAnimations(t, n, i) {
    const s = this.chart, r = this._cachedDataOpts, o = `animation-${n}`, l = r[o];
    if (l)
      return l;
    let a;
    if (s.options.animation !== !1) {
      const c = this.chart.config, f = c.datasetAnimationScopeKeys(this._type, n), d = c.getOptionScopes(this.getDataset(), f);
      a = c.createResolver(d, this.getContext(t, i, n));
    }
    const u = new Pp(s, a && a.animations);
    return a && a._cacheable && (r[o] = Object.freeze(u)), u;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || tl(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const i = this.resolveDataElementOptions(t, n), s = this._sharedOptions, r = this.getSharedOptions(i), o = this.includeOptions(n, r) || r !== s;
    return this.updateSharedOptions(r, n, i), {
      sharedOptions: r,
      includeOptions: o
    };
  }
  updateElement(t, n, i, s) {
    tl(s) ? Object.assign(t, i) : this._resolveAnimations(n, s).update(t, i);
  }
  updateSharedOptions(t, n, i) {
    t && !tl(n) && this._resolveAnimations(void 0, n).update(t, i);
  }
  _setStyle(t, n, i, s) {
    t.active = s;
    const r = this.getStyle(n, s);
    this._resolveAnimations(n, i, s).update(t, {
      options: !s && this.getSharedOptions(r) || r
    });
  }
  removeHoverStyle(t, n, i) {
    this._setStyle(t, i, "active", !1);
  }
  setHoverStyle(t, n, i) {
    this._setStyle(t, i, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const n = this._data, i = this._cachedMeta.data;
    for (const [l, a, u] of this._syncList)
      this[l](a, u);
    this._syncList = [];
    const s = i.length, r = n.length, o = Math.min(r, s);
    o && this.parse(0, o), r > s ? this._insertElements(s, r - s, t) : r < s && this._removeElements(r, s - r);
  }
  _insertElements(t, n, i = !0) {
    const s = this._cachedMeta, r = s.data, o = t + n;
    let l;
    const a = (u) => {
      for (u.length += n, l = u.length - 1; l >= o; l--)
        u[l] = u[l - n];
    };
    for (a(r), l = t; l < o; ++l)
      r[l] = new this.dataElementType();
    this._parsing && a(s._parsed), this.parse(t, n), i && this.updateElements(r, t, n, "reset");
  }
  updateElements(t, n, i, s) {
  }
  _removeElements(t, n) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const s = i._parsed.splice(t, n);
      i._stacked && Mi(i, s);
    }
    i.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, i, s] = t;
      this[n](i, s);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, n) {
    n && this._sync([
      "_removeElements",
      t,
      n
    ]);
    const i = arguments.length - 2;
    i && this._sync([
      "_insertElements",
      t,
      i
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
O(Sn, "defaults", {}), O(Sn, "datasetElementType", null), O(Sn, "dataElementType", null);
function Mv(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let i = [];
    for (let s = 0, r = n.length; s < r; s++)
      i = i.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = dp(i.sort((s, r) => s - r));
  }
  return e._cache.$bar;
}
function Cv(e) {
  const t = e.iScale, n = Mv(t, e.type);
  let i = t._length, s, r, o, l;
  const a = () => {
    o === 32767 || o === -32768 || (ys(l) && (i = Math.min(i, Math.abs(o - l) || i)), l = o);
  };
  for (s = 0, r = n.length; s < r; ++s)
    o = t.getPixelForValue(n[s]), a();
  for (l = void 0, s = 0, r = t.ticks.length; s < r; ++s)
    o = t.getPixelForTick(s), a();
  return i;
}
function Pv(e, t, n, i) {
  const s = n.barThickness;
  let r, o;
  return U(s) ? (r = t.min * n.categoryPercentage, o = n.barPercentage) : (r = s * i, o = 1), {
    chunk: r / i,
    ratio: o,
    start: t.pixels[e] - r / 2
  };
}
function Ev(e, t, n, i) {
  const s = t.pixels, r = s[e];
  let o = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const a = n.categoryPercentage;
  o === null && (o = r - (l === null ? t.end - t.start : l - r)), l === null && (l = r + r - o);
  const u = r - (r - Math.min(o, l)) / 2 * a;
  return {
    chunk: Math.abs(l - o) / 2 * a / i,
    ratio: n.barPercentage,
    start: u
  };
}
function Tv(e, t, n, i) {
  const s = n.parse(e[0], i), r = n.parse(e[1], i), o = Math.min(s, r), l = Math.max(s, r);
  let a = o, u = l;
  Math.abs(o) > Math.abs(l) && (a = l, u = o), t[n.axis] = u, t._custom = {
    barStart: a,
    barEnd: u,
    start: s,
    end: r,
    min: o,
    max: l
  };
}
function Tp(e, t, n, i) {
  return ct(e) ? Tv(e, t, n, i) : t[n.axis] = n.parse(e, i), t;
}
function af(e, t, n, i) {
  const s = e.iScale, r = e.vScale, o = s.getLabels(), l = s === r, a = [];
  let u, c, f, d;
  for (u = n, c = n + i; u < c; ++u)
    d = t[u], f = {}, f[s.axis] = l || s.parse(o[u], u), a.push(Tp(d, f, r, u));
  return a;
}
function el(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Ov(e, t, n) {
  return e !== 0 ? ve(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Dv(e) {
  let t, n, i, s, r;
  return e.horizontal ? (t = e.base > e.x, n = "left", i = "right") : (t = e.base < e.y, n = "bottom", i = "top"), t ? (s = "end", r = "start") : (s = "start", r = "end"), {
    start: n,
    end: i,
    reverse: t,
    top: s,
    bottom: r
  };
}
function Rv(e, t, n, i) {
  let s = t.borderSkipped;
  const r = {};
  if (!s) {
    e.borderSkipped = r;
    return;
  }
  if (s === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: o, end: l, reverse: a, top: u, bottom: c } = Dv(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === i ? s = u : (n._bottom || 0) === i ? s = c : (r[uf(c, o, l, a)] = !0, s = u)), r[uf(s, o, l, a)] = !0, e.borderSkipped = r;
}
function uf(e, t, n, i) {
  return i ? (e = Lv(e, t, n), e = cf(e, n, t)) : e = cf(e, t, n), e;
}
function Lv(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function cf(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function zv(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class xr extends Sn {
  parsePrimitiveData(t, n, i, s) {
    return af(t, n, i, s);
  }
  parseArrayData(t, n, i, s) {
    return af(t, n, i, s);
  }
  parseObjectData(t, n, i, s) {
    const { iScale: r, vScale: o } = t, { xAxisKey: l = "x", yAxisKey: a = "y" } = this._parsing, u = r.axis === "x" ? l : a, c = o.axis === "x" ? l : a, f = [];
    let d, h, m, y;
    for (d = i, h = i + s; d < h; ++d)
      y = n[d], m = {}, m[r.axis] = r.parse(Tn(y, u), d), f.push(Tp(Tn(y, c), m, o, d));
    return f;
  }
  updateRangeFromParsed(t, n, i, s) {
    super.updateRangeFromParsed(t, n, i, s);
    const r = i._custom;
    r && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, r.min), t.max = Math.max(t.max, r.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: i, vScale: s } = n, r = this.getParsed(t), o = r._custom, l = el(o) ? "[" + o.start + ", " + o.end + "]" : "" + s.getLabelForValue(r[s.axis]);
    return {
      label: "" + i.getLabelForValue(r[i.axis]),
      value: l
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, t);
  }
  updateElements(t, n, i, s) {
    const r = s === "reset", { index: o, _cachedMeta: { vScale: l } } = this, a = l.getBasePixel(), u = l.isHorizontal(), c = this._getRuler(), { sharedOptions: f, includeOptions: d } = this._getSharedOptions(n, s);
    for (let h = n; h < n + i; h++) {
      const m = this.getParsed(h), y = r || U(m[l.axis]) ? {
        base: a,
        head: a
      } : this._calculateBarValuePixels(h), _ = this._calculateBarIndexPixels(h, c), p = (m._stacks || {})[l.axis], g = {
        horizontal: u,
        base: y.base,
        enableBorderRadius: !p || el(m._custom) || o === p._top || o === p._bottom,
        x: u ? y.head : _.center,
        y: u ? _.center : y.head,
        height: u ? _.size : Math.abs(y.size),
        width: u ? Math.abs(y.size) : _.size
      };
      d && (g.options = f || this.resolveDataElementOptions(h, t[h].active ? "active" : s));
      const v = g.options || t[h].options;
      Rv(g, v, p, o), zv(g, v, c.ratio), this.updateElement(t[h], h, g, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: i } = this._cachedMeta, s = i.getMatchingVisibleMetas(this._type).filter((c) => c.controller.options.grouped), r = i.options.stacked, o = [], l = this._cachedMeta.controller.getParsed(n), a = l && l[i.axis], u = (c) => {
      const f = c._parsed.find((h) => h[i.axis] === a), d = f && f[c.vScale.axis];
      if (U(d) || isNaN(d))
        return !0;
    };
    for (const c of s)
      if (!(n !== void 0 && u(c)) && ((r === !1 || o.indexOf(c.stack) === -1 || r === void 0 && c.stack === void 0) && o.push(c.stack), c.index === t))
        break;
    return o.length || o.push(void 0), o;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getStackIndex(t, n, i) {
    const s = this._getStacks(t, i), r = n !== void 0 ? s.indexOf(n) : -1;
    return r === -1 ? s.length - 1 : r;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, i = n.iScale, s = [];
    let r, o;
    for (r = 0, o = n.data.length; r < o; ++r)
      s.push(i.getPixelForValue(this.getParsed(r)[i.axis], r));
    const l = t.barThickness;
    return {
      min: l || Cv(n),
      pixels: s,
      start: i._startPixel,
      end: i._endPixel,
      stackCount: this._getStackCount(),
      scale: i,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: i, index: s }, options: { base: r, minBarLength: o } } = this, l = r || 0, a = this.getParsed(t), u = a._custom, c = el(u);
    let f = a[n.axis], d = 0, h = i ? this.applyStack(n, a, i) : f, m, y;
    h !== f && (d = h - f, h = f), c && (f = u.barStart, h = u.barEnd - u.barStart, f !== 0 && ve(f) !== ve(u.barEnd) && (d = 0), d += f);
    const _ = !U(r) && !c ? r : d;
    let p = n.getPixelForValue(_);
    if (this.chart.getDataVisibility(t) ? m = n.getPixelForValue(d + h) : m = p, y = m - p, Math.abs(y) < o) {
      y = Ov(y, n, l) * o, f === l && (p -= y / 2);
      const g = n.getPixelForDecimal(0), v = n.getPixelForDecimal(1), x = Math.min(g, v), w = Math.max(g, v);
      p = Math.max(Math.min(p, w), x), m = p + y, i && !c && (a._stacks[n.axis]._visualValues[s] = n.getValueForPixel(m) - n.getValueForPixel(p));
    }
    if (p === n.getPixelForValue(l)) {
      const g = ve(y) * n.getLineWidthForValue(l) / 2;
      p += g, y -= g;
    }
    return {
      size: y,
      base: p,
      head: m,
      center: m + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const i = n.scale, s = this.options, r = s.skipNull, o = A(s.maxBarThickness, 1 / 0);
    let l, a;
    if (n.grouped) {
      const u = r ? this._getStackCount(t) : n.stackCount, c = s.barThickness === "flex" ? Ev(t, n, s, u) : Pv(t, n, s, u), f = this._getStackIndex(this.index, this._cachedMeta.stack, r ? t : void 0);
      l = c.start + c.chunk * f + c.chunk / 2, a = Math.min(o, c.chunk * c.ratio);
    } else
      l = i.getPixelForValue(this.getParsed(t)[i.axis], t), a = Math.min(o, n.min * n.ratio);
    return {
      base: l - a / 2,
      head: l + a / 2,
      center: l,
      size: a
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, i = t.data, s = i.length;
    let r = 0;
    for (; r < s; ++r)
      this.getParsed(r)[n.axis] !== null && !i[r].hidden && i[r].draw(this._ctx);
  }
}
O(xr, "id", "bar"), O(xr, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), O(xr, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
function Av(e, t, n) {
  let i = 1, s = 1, r = 0, o = 0;
  if (t < st) {
    const l = e, a = l + t, u = Math.cos(l), c = Math.sin(l), f = Math.cos(a), d = Math.sin(a), h = (v, x, w) => _s(v, l, a, !0) ? 1 : Math.max(x, x * n, w, w * n), m = (v, x, w) => _s(v, l, a, !0) ? -1 : Math.min(x, x * n, w, w * n), y = h(0, u, f), _ = h(dt, c, d), p = m(rt, u, f), g = m(rt + dt, c, d);
    i = (y - p) / 2, s = (_ - g) / 2, r = -(y + p) / 2, o = -(_ + g) / 2;
  }
  return {
    ratioX: i,
    ratioY: s,
    offsetX: r,
    offsetY: o
  };
}
class Qn extends Sn {
  constructor(t, n) {
    super(t, n), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, n) {
    const i = this.getDataset().data, s = this._cachedMeta;
    if (this._parsing === !1)
      s._parsed = i;
    else {
      let r = (a) => +i[a];
      if (N(i[t])) {
        const { key: a = "value" } = this._parsing;
        r = (u) => +Tn(i[u], a);
      }
      let o, l;
      for (o = t, l = t + n; o < l; ++o)
        s._parsed[o] = r(o);
    }
  }
  _getRotation() {
    return Ee(this.options.rotation - 90);
  }
  _getCircumference() {
    return Ee(this.options.circumference);
  }
  _getRotationExtents() {
    let t = st, n = -st;
    for (let i = 0; i < this.chart.data.datasets.length; ++i)
      if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
        const s = this.chart.getDatasetMeta(i).controller, r = s._getRotation(), o = s._getCircumference();
        t = Math.min(t, r), n = Math.max(n, r + o);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: i } = n, s = this._cachedMeta, r = s.data, o = this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing, l = Math.max((Math.min(i.width, i.height) - o) / 2, 0), a = Math.min($0(this.options.cutout, l), 1), u = this._getRingWeight(this.index), { circumference: c, rotation: f } = this._getRotationExtents(), { ratioX: d, ratioY: h, offsetX: m, offsetY: y } = Av(f, c, a), _ = (i.width - o) / d, p = (i.height - o) / h, g = Math.max(Math.min(_, p) / 2, 0), v = ap(this.options.radius, g), x = Math.max(v * a, 0), w = (v - x) / this._getVisibleDatasetWeightTotal();
    this.offsetX = m * v, this.offsetY = y * v, s.total = this.calculateTotal(), this.outerRadius = v - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * u, 0), this.updateElements(r, 0, r.length, t);
  }
  _circumference(t, n) {
    const i = this.options, s = this._cachedMeta, r = this._getCircumference();
    return n && i.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * r / st);
  }
  updateElements(t, n, i, s) {
    const r = s === "reset", o = this.chart, l = o.chartArea, u = o.options.animation, c = (l.left + l.right) / 2, f = (l.top + l.bottom) / 2, d = r && u.animateScale, h = d ? 0 : this.innerRadius, m = d ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: _ } = this._getSharedOptions(n, s);
    let p = this._getRotation(), g;
    for (g = 0; g < n; ++g)
      p += this._circumference(g, r);
    for (g = n; g < n + i; ++g) {
      const v = this._circumference(g, r), x = t[g], w = {
        x: c + this.offsetX,
        y: f + this.offsetY,
        startAngle: p,
        endAngle: p + v,
        circumference: v,
        outerRadius: m,
        innerRadius: h
      };
      _ && (w.options = y || this.resolveDataElementOptions(g, x.active ? "active" : s)), p += v, this.updateElement(x, g, w, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let i = 0, s;
    for (s = 0; s < n.length; s++) {
      const r = t._parsed[s];
      r !== null && !isNaN(r) && this.chart.getDataVisibility(s) && !n[s].hidden && (i += Math.abs(r));
    }
    return i;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? st * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = this.chart, s = i.data.labels || [], r = du(n._parsed[t], i.options.locale);
    return {
      label: s[t] || "",
      value: r
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const i = this.chart;
    let s, r, o, l, a;
    if (!t) {
      for (s = 0, r = i.data.datasets.length; s < r; ++s)
        if (i.isDatasetVisible(s)) {
          o = i.getDatasetMeta(s), t = o.data, l = o.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (s = 0, r = t.length; s < r; ++s)
      a = l.resolveDataElementOptions(s), a.borderAlign !== "inner" && (n = Math.max(n, a.borderWidth || 0, a.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let i = 0, s = t.length; i < s; ++i) {
      const r = this.resolveDataElementOptions(i);
      n = Math.max(n, r.offset || 0, r.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(t) {
    let n = 0;
    for (let i = 0; i < t; ++i)
      this.chart.isDatasetVisible(i) && (n += this._getRingWeight(i));
    return n;
  }
  _getRingWeight(t) {
    return Math.max(A(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
O(Qn, "id", "doughnut"), O(Qn, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), O(Qn, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), O(Qn, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const n = t.data;
          if (n.labels.length && n.datasets.length) {
            const { labels: { pointStyle: i, color: s } } = t.legend.options;
            return n.labels.map((r, o) => {
              const a = t.getDatasetMeta(0).controller.getStyle(o);
              return {
                text: r,
                fillStyle: a.backgroundColor,
                strokeStyle: a.borderColor,
                fontColor: s,
                lineWidth: a.borderWidth,
                pointStyle: i,
                hidden: !t.getDataVisibility(o),
                index: o
              };
            });
          }
          return [];
        }
      },
      onClick(t, n, i) {
        i.chart.toggleDataVisibility(n.index), i.chart.update();
      }
    }
  }
});
class wr extends Sn {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: i, data: s = [], _dataset: r } = n, o = this.chart._animationsDisabled;
    let { start: l, count: a } = uy(n, s, o);
    this._drawStart = l, this._drawCount = a, cy(n) && (l = 0, a = s.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!r._decimated, i.points = s;
    const u = this.resolveDatasetElementOptions(t);
    this.options.showLine || (u.borderWidth = 0), u.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !o,
      options: u
    }, t), this.updateElements(s, l, a, t);
  }
  updateElements(t, n, i, s) {
    const r = s === "reset", { iScale: o, vScale: l, _stacked: a, _dataset: u } = this._cachedMeta, { sharedOptions: c, includeOptions: f } = this._getSharedOptions(n, s), d = o.axis, h = l.axis, { spanGaps: m, segment: y } = this.options, _ = vs(m) ? m : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || r || s === "none", g = n + i, v = t.length;
    let x = n > 0 && this.getParsed(n - 1);
    for (let w = 0; w < v; ++w) {
      const k = t[w], S = p ? k : {};
      if (w < n || w >= g) {
        S.skip = !0;
        continue;
      }
      const b = this.getParsed(w), E = U(b[h]), P = S[d] = o.getPixelForValue(b[d], w), R = S[h] = r || E ? l.getBasePixel() : l.getPixelForValue(a ? this.applyStack(l, b, a) : b[h], w);
      S.skip = isNaN(P) || isNaN(R) || E, S.stop = w > 0 && Math.abs(b[d] - x[d]) > _, y && (S.parsed = b, S.raw = u.data[w]), f && (S.options = c || this.resolveDataElementOptions(w, k.active ? "active" : s)), p || this.updateElement(k, w, S, s), x = b;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, i = n.options && n.options.borderWidth || 0, s = t.data || [];
    if (!s.length)
      return i;
    const r = s[0].size(this.resolveDataElementOptions(0)), o = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(i, r, o) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
O(wr, "id", "line"), O(wr, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), O(wr, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class sa extends Qn {
}
O(sa, "id", "pie"), O(sa, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
function fn() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class wu {
  constructor(t) {
    O(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(wu.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return fn();
  }
  parse() {
    return fn();
  }
  format() {
    return fn();
  }
  add() {
    return fn();
  }
  diff() {
    return fn();
  }
  startOf() {
    return fn();
  }
  endOf() {
    return fn();
  }
}
var Iv = {
  _date: wu
};
function Fv(e, t, n, i) {
  const { controller: s, data: r, _sorted: o } = e, l = s._cachedMeta.iScale;
  if (l && t === l.axis && t !== "r" && o && r.length) {
    const a = l._reversePixels ? sy : _n;
    if (i) {
      if (s._sharedOptions) {
        const u = r[0], c = typeof u.getRange == "function" && u.getRange(t);
        if (c) {
          const f = a(r, t, n - c), d = a(r, t, n + c);
          return {
            lo: f.lo,
            hi: d.hi
          };
        }
      }
    } else return a(r, t, n);
  }
  return {
    lo: 0,
    hi: r.length - 1
  };
}
function Ts(e, t, n, i, s) {
  const r = e.getSortedVisibleDatasetMetas(), o = n[t];
  for (let l = 0, a = r.length; l < a; ++l) {
    const { index: u, data: c } = r[l], { lo: f, hi: d } = Fv(r[l], t, o, s);
    for (let h = f; h <= d; ++h) {
      const m = c[h];
      m.skip || i(m, u, h);
    }
  }
}
function Nv(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(i, s) {
    const r = t ? Math.abs(i.x - s.x) : 0, o = n ? Math.abs(i.y - s.y) : 0;
    return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
  };
}
function nl(e, t, n, i, s) {
  const r = [];
  return !s && !e.isPointInArea(t) || Ts(e, n, t, function(l, a, u) {
    !s && !xs(l, e.chartArea, 0) || l.inRange(t.x, t.y, i) && r.push({
      element: l,
      datasetIndex: a,
      index: u
    });
  }, !0), r;
}
function Bv(e, t, n, i) {
  let s = [];
  function r(o, l, a) {
    const { startAngle: u, endAngle: c } = o.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: f } = cp(o, {
      x: t.x,
      y: t.y
    });
    _s(f, u, c) && s.push({
      element: o,
      datasetIndex: l,
      index: a
    });
  }
  return Ts(e, n, t, r), s;
}
function jv(e, t, n, i, s, r) {
  let o = [];
  const l = Nv(n);
  let a = Number.POSITIVE_INFINITY;
  function u(c, f, d) {
    const h = c.inRange(t.x, t.y, s);
    if (i && !h)
      return;
    const m = c.getCenterPoint(s);
    if (!(!!r || e.isPointInArea(m)) && !h)
      return;
    const _ = l(t, m);
    _ < a ? (o = [
      {
        element: c,
        datasetIndex: f,
        index: d
      }
    ], a = _) : _ === a && o.push({
      element: c,
      datasetIndex: f,
      index: d
    });
  }
  return Ts(e, n, t, u), o;
}
function il(e, t, n, i, s, r) {
  return !r && !e.isPointInArea(t) ? [] : n === "r" && !i ? Bv(e, t, n, s) : jv(e, t, n, i, s, r);
}
function ff(e, t, n, i, s) {
  const r = [], o = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return Ts(e, n, t, (a, u, c) => {
    a[o] && a[o](t[n], s) && (r.push({
      element: a,
      datasetIndex: u,
      index: c
    }), l = l || a.inRange(t.x, t.y, s));
  }), i && !l ? [] : r;
}
var Wv = {
  evaluateInteractionItems: Ts,
  modes: {
    index(e, t, n, i) {
      const s = pn(t, e), r = n.axis || "x", o = n.includeInvisible || !1, l = n.intersect ? nl(e, s, r, i, o) : il(e, s, r, !1, i, o), a = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((u) => {
        const c = l[0].index, f = u.data[c];
        f && !f.skip && a.push({
          element: f,
          datasetIndex: u.index,
          index: c
        });
      }), a) : [];
    },
    dataset(e, t, n, i) {
      const s = pn(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      let l = n.intersect ? nl(e, s, r, i, o) : il(e, s, r, !1, i, o);
      if (l.length > 0) {
        const a = l[0].datasetIndex, u = e.getDatasetMeta(a).data;
        l = [];
        for (let c = 0; c < u.length; ++c)
          l.push({
            element: u[c],
            datasetIndex: a,
            index: c
          });
      }
      return l;
    },
    point(e, t, n, i) {
      const s = pn(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      return nl(e, s, r, i, o);
    },
    nearest(e, t, n, i) {
      const s = pn(t, e), r = n.axis || "xy", o = n.includeInvisible || !1;
      return il(e, s, r, n.intersect, i, o);
    },
    x(e, t, n, i) {
      const s = pn(t, e);
      return ff(e, s, "x", n.intersect, i);
    },
    y(e, t, n, i) {
      const s = pn(t, e);
      return ff(e, s, "y", n.intersect, i);
    }
  }
};
const Op = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ci(e, t) {
  return e.filter((n) => n.pos === t);
}
function df(e, t) {
  return e.filter((n) => Op.indexOf(n.pos) === -1 && n.box.axis === t);
}
function Pi(e, t) {
  return e.sort((n, i) => {
    const s = t ? i : n, r = t ? n : i;
    return s.weight === r.weight ? s.index - r.index : s.weight - r.weight;
  });
}
function Hv(e) {
  const t = [];
  let n, i, s, r, o, l;
  for (n = 0, i = (e || []).length; n < i; ++n)
    s = e[n], { position: r, options: { stack: o, stackWeight: l = 1 } } = s, t.push({
      index: n,
      box: s,
      pos: r,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: o && r + o,
      stackWeight: l
    });
  return t;
}
function Vv(e) {
  const t = {};
  for (const n of e) {
    const { stack: i, pos: s, stackWeight: r } = n;
    if (!i || !Op.includes(s))
      continue;
    const o = t[i] || (t[i] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += r;
  }
  return t;
}
function $v(e, t) {
  const n = Vv(e), { vBoxMaxWidth: i, hBoxMaxHeight: s } = t;
  let r, o, l;
  for (r = 0, o = e.length; r < o; ++r) {
    l = e[r];
    const { fullSize: a } = l.box, u = n[l.stack], c = u && l.stackWeight / u.weight;
    l.horizontal ? (l.width = c ? c * i : a && t.availableWidth, l.height = s) : (l.width = i, l.height = c ? c * s : a && t.availableHeight);
  }
  return n;
}
function Uv(e) {
  const t = Hv(e), n = Pi(t.filter((u) => u.box.fullSize), !0), i = Pi(Ci(t, "left"), !0), s = Pi(Ci(t, "right")), r = Pi(Ci(t, "top"), !0), o = Pi(Ci(t, "bottom")), l = df(t, "x"), a = df(t, "y");
  return {
    fullSize: n,
    leftAndTop: i.concat(r),
    rightAndBottom: s.concat(a).concat(o).concat(l),
    chartArea: Ci(t, "chartArea"),
    vertical: i.concat(s).concat(a),
    horizontal: r.concat(o).concat(l)
  };
}
function hf(e, t, n, i) {
  return Math.max(e[n], t[n]) + Math.max(e[i], t[i]);
}
function Dp(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Yv(e, t, n, i) {
  const { pos: s, box: r } = n, o = e.maxPadding;
  if (!N(s)) {
    n.size && (e[s] -= n.size);
    const f = i[n.stack] || {
      size: 0,
      count: 1
    };
    f.size = Math.max(f.size, n.horizontal ? r.height : r.width), n.size = f.size / f.count, e[s] += n.size;
  }
  r.getPadding && Dp(o, r.getPadding());
  const l = Math.max(0, t.outerWidth - hf(o, e, "left", "right")), a = Math.max(0, t.outerHeight - hf(o, e, "top", "bottom")), u = l !== e.w, c = a !== e.h;
  return e.w = l, e.h = a, n.horizontal ? {
    same: u,
    other: c
  } : {
    same: c,
    other: u
  };
}
function Xv(e) {
  const t = e.maxPadding;
  function n(i) {
    const s = Math.max(t[i] - e[i], 0);
    return e[i] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Kv(e, t) {
  const n = t.maxPadding;
  function i(s) {
    const r = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((o) => {
      r[o] = Math.max(t[o], n[o]);
    }), r;
  }
  return i(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Ai(e, t, n, i) {
  const s = [];
  let r, o, l, a, u, c;
  for (r = 0, o = e.length, u = 0; r < o; ++r) {
    l = e[r], a = l.box, a.update(l.width || t.w, l.height || t.h, Kv(l.horizontal, t));
    const { same: f, other: d } = Yv(t, n, l, i);
    u |= f && s.length, c = c || d, a.fullSize || s.push(l);
  }
  return u && Ai(s, t, n, i) || c;
}
function er(e, t, n, i, s) {
  e.top = n, e.left = t, e.right = t + i, e.bottom = n + s, e.width = i, e.height = s;
}
function pf(e, t, n, i) {
  const s = n.padding;
  let { x: r, y: o } = t;
  for (const l of e) {
    const a = l.box, u = i[l.stack] || {
      count: 1,
      placed: 0,
      weight: 1
    }, c = l.stackWeight / u.weight || 1;
    if (l.horizontal) {
      const f = t.w * c, d = u.size || a.height;
      ys(u.start) && (o = u.start), a.fullSize ? er(a, s.left, o, n.outerWidth - s.right - s.left, d) : er(a, t.left + u.placed, o, f, d), u.start = o, u.placed += f, o = a.bottom;
    } else {
      const f = t.h * c, d = u.size || a.width;
      ys(u.start) && (r = u.start), a.fullSize ? er(a, r, s.top, d, n.outerHeight - s.bottom - s.top) : er(a, r, t.top + u.placed, d, f), u.start = r, u.placed += f, r = a.right;
    }
  }
  t.x = r, t.y = o;
}
var Qt = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(n) {
            t.draw(n);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const n = e.boxes ? e.boxes.indexOf(t) : -1;
    n !== -1 && e.boxes.splice(n, 1);
  },
  configure(e, t, n) {
    t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
  },
  update(e, t, n, i) {
    if (!e)
      return;
    const s = te(e.options.layout.padding), r = Math.max(t - s.width, 0), o = Math.max(n - s.height, 0), l = Uv(e.boxes), a = l.vertical, u = l.horizontal;
    j(e.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const c = a.reduce((y, _) => _.box.options && _.box.options.display === !1 ? y : y + 1, 0) || 1, f = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: r,
      availableHeight: o,
      vBoxMaxWidth: r / 2 / c,
      hBoxMaxHeight: o / 2
    }), d = Object.assign({}, s);
    Dp(d, te(i));
    const h = Object.assign({
      maxPadding: d,
      w: r,
      h: o,
      x: s.left,
      y: s.top
    }, s), m = $v(a.concat(u), f);
    Ai(l.fullSize, h, f, m), Ai(a, h, f, m), Ai(u, h, f, m) && Ai(a, h, f, m), Xv(h), pf(l.leftAndTop, h, f, m), h.x += h.w, h.y += h.h, pf(l.rightAndBottom, h, f, m), e.chartArea = {
      left: h.left,
      top: h.top,
      right: h.left + h.w,
      bottom: h.top + h.h,
      height: h.h,
      width: h.w
    }, j(l.chartArea, (y) => {
      const _ = y.box;
      Object.assign(_, e.chartArea), _.update(h.w, h.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Rp {
  acquireContext(t, n) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, n, i) {
  }
  removeEventListener(t, n, i) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, n, i, s) {
    return n = Math.max(0, n || t.width), i = i || t.height, {
      width: n,
      height: Math.max(0, s ? Math.floor(n / s) : i)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Qv extends Rp {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const kr = "$chartjs", Gv = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, gf = (e) => e === null || e === "";
function Zv(e, t) {
  const n = e.style, i = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[kr] = {
    initial: {
      height: i,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", gf(s)) {
    const r = Zc(e, "width");
    r !== void 0 && (e.width = r);
  }
  if (gf(i))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const r = Zc(e, "height");
      r !== void 0 && (e.height = r);
    }
  return e;
}
const Lp = Jy ? {
  passive: !0
} : !1;
function Jv(e, t, n) {
  e && e.addEventListener(t, n, Lp);
}
function qv(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Lp);
}
function t1(e, t) {
  const n = Gv[e.type] || e.type, { x: i, y: s } = pn(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: i !== void 0 ? i : null,
    y: s !== void 0 ? s : null
  };
}
function eo(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function e1(e, t, n) {
  const i = e.canvas, s = new MutationObserver((r) => {
    let o = !1;
    for (const l of r)
      o = o || eo(l.addedNodes, i), o = o && !eo(l.removedNodes, i);
    o && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function n1(e, t, n) {
  const i = e.canvas, s = new MutationObserver((r) => {
    let o = !1;
    for (const l of r)
      o = o || eo(l.removedNodes, i), o = o && !eo(l.addedNodes, i);
    o && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const ks = /* @__PURE__ */ new Map();
let mf = 0;
function zp() {
  const e = window.devicePixelRatio;
  e !== mf && (mf = e, ks.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function i1(e, t) {
  ks.size || window.addEventListener("resize", zp), ks.set(e, t);
}
function s1(e) {
  ks.delete(e), ks.size || window.removeEventListener("resize", zp);
}
function r1(e, t, n) {
  const i = e.canvas, s = i && xu(i);
  if (!s)
    return;
  const r = pp((l, a) => {
    const u = s.clientWidth;
    n(l, a), u < s.clientWidth && n();
  }, window), o = new ResizeObserver((l) => {
    const a = l[0], u = a.contentRect.width, c = a.contentRect.height;
    u === 0 && c === 0 || r(u, c);
  });
  return o.observe(s), i1(e, r), o;
}
function sl(e, t, n) {
  n && n.disconnect(), t === "resize" && s1(e);
}
function o1(e, t, n) {
  const i = e.canvas, s = pp((r) => {
    e.ctx !== null && n(t1(r, e));
  }, e);
  return Jv(i, t, s), s;
}
class l1 extends Rp {
  acquireContext(t, n) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t ? (Zv(t, n), i) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[kr])
      return !1;
    const i = n[kr].initial;
    [
      "height",
      "width"
    ].forEach((r) => {
      const o = i[r];
      U(o) ? n.removeAttribute(r) : n.setAttribute(r, o);
    });
    const s = i.style || {};
    return Object.keys(s).forEach((r) => {
      n.style[r] = s[r];
    }), n.width = n.width, delete n[kr], !0;
  }
  addEventListener(t, n, i) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), o = {
      attach: e1,
      detach: n1,
      resize: r1
    }[n] || o1;
    s[n] = o(t, n, i);
  }
  removeEventListener(t, n) {
    const i = t.$proxies || (t.$proxies = {}), s = i[n];
    if (!s)
      return;
    ({
      attach: sl,
      detach: sl,
      resize: sl
    }[n] || qv)(t, n, s), i[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, i, s) {
    return Zy(t, n, i, s);
  }
  isAttached(t) {
    const n = t && xu(t);
    return !!(n && n.isConnected);
  }
}
function a1(e) {
  return !_u() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Qv : l1;
}
class ae {
  constructor() {
    O(this, "x");
    O(this, "y");
    O(this, "active", !1);
    O(this, "options");
    O(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: n, y: i } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: i
    };
  }
  hasValue() {
    return vs(this.x) && vs(this.y);
  }
  getProps(t, n) {
    const i = this.$animations;
    if (!n || !i)
      return this;
    const s = {};
    return t.forEach((r) => {
      s[r] = i[r] && i[r].active() ? i[r]._to : this[r];
    }), s;
  }
}
O(ae, "defaults", {}), O(ae, "defaultRoutes");
function u1(e, t) {
  const n = e.options.ticks, i = c1(e), s = Math.min(n.maxTicksLimit || i, i), r = n.major.enabled ? d1(t) : [], o = r.length, l = r[0], a = r[o - 1], u = [];
  if (o > s)
    return h1(t, u, r, o / s), u;
  const c = f1(r, t, s);
  if (o > 0) {
    let f, d;
    const h = o > 1 ? Math.round((a - l) / (o - 1)) : null;
    for (nr(t, u, c, U(h) ? 0 : l - h, l), f = 0, d = o - 1; f < d; f++)
      nr(t, u, c, r[f], r[f + 1]);
    return nr(t, u, c, a, U(h) ? t.length : a + h), u;
  }
  return nr(t, u, c), u;
}
function c1(e) {
  const t = e.options.offset, n = e._tickSize(), i = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(i, s));
}
function f1(e, t, n) {
  const i = p1(e), s = t.length / n;
  if (!i)
    return Math.max(s, 1);
  const r = J0(i);
  for (let o = 0, l = r.length - 1; o < l; o++) {
    const a = r[o];
    if (a > s)
      return a;
  }
  return Math.max(s, 1);
}
function d1(e) {
  const t = [];
  let n, i;
  for (n = 0, i = e.length; n < i; n++)
    e[n].major && t.push(n);
  return t;
}
function h1(e, t, n, i) {
  let s = 0, r = n[0], o;
  for (i = Math.ceil(i), o = 0; o < e.length; o++)
    o === r && (t.push(e[o]), s++, r = n[s * i]);
}
function nr(e, t, n, i, s) {
  const r = A(i, 0), o = Math.min(A(s, e.length), e.length);
  let l = 0, a, u, c;
  for (n = Math.ceil(n), s && (a = s - i, n = a / Math.floor(a / n)), c = r; c < 0; )
    l++, c = Math.round(r + l * n);
  for (u = Math.max(r, 0); u < o; u++)
    u === c && (t.push(e[u]), l++, c = Math.round(r + l * n));
}
function p1(e) {
  const t = e.length;
  let n, i;
  if (t < 2)
    return !1;
  for (i = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== i)
      return !1;
  return i;
}
const g1 = (e) => e === "left" ? "right" : e === "right" ? "left" : e, yf = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, vf = (e, t) => Math.min(t || e, e);
function _f(e, t) {
  const n = [], i = e.length / t, s = e.length;
  let r = 0;
  for (; r < s; r += i)
    n.push(e[Math.floor(r)]);
  return n;
}
function m1(e, t, n) {
  const i = e.ticks.length, s = Math.min(t, i - 1), r = e._startPixel, o = e._endPixel, l = 1e-6;
  let a = e.getPixelForTick(s), u;
  if (!(n && (i === 1 ? u = Math.max(a - r, o - a) : t === 0 ? u = (e.getPixelForTick(1) - a) / 2 : u = (a - e.getPixelForTick(s - 1)) / 2, a += s < t ? u : -u, a < r - l || a > o + l)))
    return a;
}
function y1(e, t) {
  j(e, (n) => {
    const i = n.gc, s = i.length / 2;
    let r;
    if (s > t) {
      for (r = 0; r < s; ++r)
        delete n.data[i[r]];
      i.splice(0, s);
    }
  });
}
function Ei(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function xf(e, t) {
  if (!e.display)
    return 0;
  const n = bt(e.font, t), i = te(e.padding);
  return (ct(e.text) ? e.text.length : 1) * n.lineHeight + i.height;
}
function v1(e, t) {
  return Ln(e, {
    scale: t,
    type: "scale"
  });
}
function _1(e, t, n) {
  return Ln(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function x1(e, t, n) {
  let i = cu(e);
  return (n && t !== "right" || !n && t === "right") && (i = g1(i)), i;
}
function w1(e, t, n, i) {
  const { top: s, left: r, bottom: o, right: l, chart: a } = e, { chartArea: u, scales: c } = a;
  let f = 0, d, h, m;
  const y = o - s, _ = l - r;
  if (e.isHorizontal()) {
    if (h = wt(i, r, l), N(n)) {
      const p = Object.keys(n)[0], g = n[p];
      m = c[p].getPixelForValue(g) + y - t;
    } else n === "center" ? m = (u.bottom + u.top) / 2 + y - t : m = yf(e, n, t);
    d = l - r;
  } else {
    if (N(n)) {
      const p = Object.keys(n)[0], g = n[p];
      h = c[p].getPixelForValue(g) - _ + t;
    } else n === "center" ? h = (u.left + u.right) / 2 - _ + t : h = yf(e, n, t);
    m = wt(i, o, s), f = n === "left" ? -dt : dt;
  }
  return {
    titleX: h,
    titleY: m,
    maxWidth: d,
    rotation: f
  };
}
class mi extends ae {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, n) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: n, _suggestedMin: i, _suggestedMax: s } = this;
    return t = fe(t, Number.POSITIVE_INFINITY), n = fe(n, Number.NEGATIVE_INFINITY), i = fe(i, Number.POSITIVE_INFINITY), s = fe(s, Number.NEGATIVE_INFINITY), {
      min: fe(t, i),
      max: fe(n, s),
      minDefined: qt(t),
      maxDefined: qt(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: i, minDefined: s, maxDefined: r } = this.getUserBounds(), o;
    if (s && r)
      return {
        min: n,
        max: i
      };
    const l = this.getMatchingVisibleMetas();
    for (let a = 0, u = l.length; a < u; ++a)
      o = l[a].controller.getMinMax(this, t), s || (n = Math.min(n, o.min)), r || (i = Math.max(i, o.max));
    return n = r && n > i ? i : n, i = s && n > i ? n : i, {
      min: fe(n, fe(i, n)),
      max: fe(i, fe(n, i))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    Q(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, i) {
    const { beginAtZero: s, grace: r, ticks: o } = this.options, l = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = i = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Ty(this, r, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const a = l < this.ticks.length;
    this._convertTicksToLabels(a ? _f(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = u1(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), a && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, i;
    this.isHorizontal() ? (n = this.left, i = this.right) : (n = this.top, i = this.bottom, t = !t), this._startPixel = n, this._endPixel = i, this._reversePixels = t, this._length = i - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Q(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Q(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Q(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Q(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    Q(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let i, s, r;
    for (i = 0, s = t.length; i < s; i++)
      r = t[i], r.label = Q(n.callback, [
        r.value,
        i,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Q(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Q(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, i = vf(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, r = n.maxRotation;
    let o = s, l, a, u;
    if (!this._isVisible() || !n.display || s >= r || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const c = this._getLabelSizes(), f = c.widest.width, d = c.highest.height, h = St(this.chart.width - f, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / i : h / (i - 1), f + 6 > l && (l = h / (i - (t.offset ? 0.5 : 1)), a = this.maxHeight - Ei(t.grid) - n.padding - xf(t.title, this.chart.options.font), u = Math.sqrt(f * f + d * d), o = ey(Math.min(Math.asin(St((c.highest.height + 6) / l, -1, 1)), Math.asin(St(a / u, -1, 1)) - Math.asin(St(d / u, -1, 1)))), o = Math.max(s, Math.min(r, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    Q(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Q(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: i, title: s, grid: r } } = this, o = this._isVisible(), l = this.isHorizontal();
    if (o) {
      const a = xf(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = Ei(r) + a) : (t.height = this.maxHeight, t.width = Ei(r) + a), i.display && this.ticks.length) {
        const { first: u, last: c, widest: f, highest: d } = this._getLabelSizes(), h = i.padding * 2, m = Ee(this.labelRotation), y = Math.cos(m), _ = Math.sin(m);
        if (l) {
          const p = i.mirror ? 0 : _ * f.width + y * d.height;
          t.height = Math.min(this.maxHeight, t.height + p + h);
        } else {
          const p = i.mirror ? 0 : y * f.width + _ * d.height;
          t.width = Math.min(this.maxWidth, t.width + p + h);
        }
        this._calculatePadding(u, c, _, y);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, i, s) {
    const { ticks: { align: r, padding: o }, position: l } = this.options, a = this.labelRotation !== 0, u = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const c = this.getPixelForTick(0) - this.left, f = this.right - this.getPixelForTick(this.ticks.length - 1);
      let d = 0, h = 0;
      a ? u ? (d = s * t.width, h = i * n.height) : (d = i * t.height, h = s * n.width) : r === "start" ? h = n.width : r === "end" ? d = t.width : r !== "inner" && (d = t.width / 2, h = n.width / 2), this.paddingLeft = Math.max((d - c + o) * this.width / (this.width - c), 0), this.paddingRight = Math.max((h - f + o) * this.width / (this.width - f), 0);
    } else {
      let c = n.height / 2, f = t.height / 2;
      r === "start" ? (c = 0, f = t.height) : r === "end" && (c = n.height, f = 0), this.paddingTop = c + o, this.paddingBottom = f + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Q(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: n } = this.options;
    return n === "top" || n === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let n, i;
    for (n = 0, i = t.length; n < i; n++)
      U(t[n].label) && (t.splice(n, 1), i--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let i = this.ticks;
      n < i.length && (i = _f(i, n)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, i) {
    const { ctx: s, _longestTextCache: r } = this, o = [], l = [], a = Math.floor(n / vf(n, i));
    let u = 0, c = 0, f, d, h, m, y, _, p, g, v, x, w;
    for (f = 0; f < n; f += a) {
      if (m = t[f].label, y = this._resolveTickFontOptions(f), s.font = _ = y.string, p = r[_] = r[_] || {
        data: {},
        gc: []
      }, g = y.lineHeight, v = x = 0, !U(m) && !ct(m))
        v = Yc(s, p.data, p.gc, v, m), x = g;
      else if (ct(m))
        for (d = 0, h = m.length; d < h; ++d)
          w = m[d], !U(w) && !ct(w) && (v = Yc(s, p.data, p.gc, v, w), x += g);
      o.push(v), l.push(x), u = Math.max(v, u), c = Math.max(x, c);
    }
    y1(r, n);
    const k = o.indexOf(u), S = l.indexOf(c), b = (E) => ({
      width: o[E] || 0,
      height: l[E] || 0
    });
    return {
      first: b(0),
      last: b(n - 1),
      widest: b(k),
      highest: b(S),
      widths: o,
      heights: l
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, n) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const n = this._startPixel + t * this._length;
    return iy(this._alignToPixels ? cn(this.chart, n, 0) : n);
  }
  getDecimalForPixel(t) {
    const n = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: n } = this;
    return t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0;
  }
  getContext(t) {
    const n = this.ticks || [];
    if (t >= 0 && t < n.length) {
      const i = n[t];
      return i.$context || (i.$context = _1(this.getContext(), t, i));
    }
    return this.$context || (this.$context = v1(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Ee(this.labelRotation), i = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), r = this._getLabelSizes(), o = t.autoSkipPadding || 0, l = r ? r.widest.width + o : 0, a = r ? r.highest.height + o : 0;
    return this.isHorizontal() ? a * i > l * s ? l / i : a / s : a * s < l * i ? a / i : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, i = this.chart, s = this.options, { grid: r, position: o, border: l } = s, a = r.offset, u = this.isHorizontal(), f = this.ticks.length + (a ? 1 : 0), d = Ei(r), h = [], m = l.setContext(this.getContext()), y = m.display ? m.width : 0, _ = y / 2, p = function(H) {
      return cn(i, H, y);
    };
    let g, v, x, w, k, S, b, E, P, R, z, J;
    if (o === "top")
      g = p(this.bottom), S = this.bottom - d, E = g - _, R = p(t.top) + _, J = t.bottom;
    else if (o === "bottom")
      g = p(this.top), R = t.top, J = p(t.bottom) - _, S = g + _, E = this.top + d;
    else if (o === "left")
      g = p(this.right), k = this.right - d, b = g - _, P = p(t.left) + _, z = t.right;
    else if (o === "right")
      g = p(this.left), P = t.left, z = p(t.right) - _, k = g + _, b = this.left + d;
    else if (n === "x") {
      if (o === "center")
        g = p((t.top + t.bottom) / 2 + 0.5);
      else if (N(o)) {
        const H = Object.keys(o)[0], Y = o[H];
        g = p(this.chart.scales[H].getPixelForValue(Y));
      }
      R = t.top, J = t.bottom, S = g + _, E = S + d;
    } else if (n === "y") {
      if (o === "center")
        g = p((t.left + t.right) / 2);
      else if (N(o)) {
        const H = Object.keys(o)[0], Y = o[H];
        g = p(this.chart.scales[H].getPixelForValue(Y));
      }
      k = g - _, b = k - d, P = t.left, z = t.right;
    }
    const vt = A(s.ticks.maxTicksLimit, f), B = Math.max(1, Math.ceil(f / vt));
    for (v = 0; v < f; v += B) {
      const H = this.getContext(v), Y = r.setContext(H), C = l.setContext(H), D = Y.lineWidth, L = Y.color, V = C.dash || [], X = C.dashOffset, ue = Y.tickWidth, Ct = Y.tickColor, _e = Y.tickBorderDash || [], Pt = Y.tickBorderDashOffset;
      x = m1(this, v, a), x !== void 0 && (w = cn(i, x, D), u ? k = b = P = z = w : S = E = R = J = w, h.push({
        tx1: k,
        ty1: S,
        tx2: b,
        ty2: E,
        x1: P,
        y1: R,
        x2: z,
        y2: J,
        width: D,
        color: L,
        borderDash: V,
        borderDashOffset: X,
        tickWidth: ue,
        tickColor: Ct,
        tickBorderDash: _e,
        tickBorderDashOffset: Pt
      }));
    }
    return this._ticksLength = f, this._borderValue = g, h;
  }
  _computeLabelItems(t) {
    const n = this.axis, i = this.options, { position: s, ticks: r } = i, o = this.isHorizontal(), l = this.ticks, { align: a, crossAlign: u, padding: c, mirror: f } = r, d = Ei(i.grid), h = d + c, m = f ? -c : h, y = -Ee(this.labelRotation), _ = [];
    let p, g, v, x, w, k, S, b, E, P, R, z, J = "middle";
    if (s === "top")
      k = this.bottom - m, S = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      k = this.top + m, S = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const B = this._getYAxisLabelAlignment(d);
      S = B.textAlign, w = B.x;
    } else if (s === "right") {
      const B = this._getYAxisLabelAlignment(d);
      S = B.textAlign, w = B.x;
    } else if (n === "x") {
      if (s === "center")
        k = (t.top + t.bottom) / 2 + h;
      else if (N(s)) {
        const B = Object.keys(s)[0], H = s[B];
        k = this.chart.scales[B].getPixelForValue(H) + h;
      }
      S = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        w = (t.left + t.right) / 2 - h;
      else if (N(s)) {
        const B = Object.keys(s)[0], H = s[B];
        w = this.chart.scales[B].getPixelForValue(H);
      }
      S = this._getYAxisLabelAlignment(d).textAlign;
    }
    n === "y" && (a === "start" ? J = "top" : a === "end" && (J = "bottom"));
    const vt = this._getLabelSizes();
    for (p = 0, g = l.length; p < g; ++p) {
      v = l[p], x = v.label;
      const B = r.setContext(this.getContext(p));
      b = this.getPixelForTick(p) + r.labelOffset, E = this._resolveTickFontOptions(p), P = E.lineHeight, R = ct(x) ? x.length : 1;
      const H = R / 2, Y = B.color, C = B.textStrokeColor, D = B.textStrokeWidth;
      let L = S;
      o ? (w = b, S === "inner" && (p === g - 1 ? L = this.options.reverse ? "left" : "right" : p === 0 ? L = this.options.reverse ? "right" : "left" : L = "center"), s === "top" ? u === "near" || y !== 0 ? z = -R * P + P / 2 : u === "center" ? z = -vt.highest.height / 2 - H * P + P : z = -vt.highest.height + P / 2 : u === "near" || y !== 0 ? z = P / 2 : u === "center" ? z = vt.highest.height / 2 - H * P : z = vt.highest.height - R * P, f && (z *= -1), y !== 0 && !B.showLabelBackdrop && (w += P / 2 * Math.sin(y))) : (k = b, z = (1 - R) * P / 2);
      let V;
      if (B.showLabelBackdrop) {
        const X = te(B.backdropPadding), ue = vt.heights[p], Ct = vt.widths[p];
        let _e = z - X.top, Pt = 0 - X.left;
        switch (J) {
          case "middle":
            _e -= ue / 2;
            break;
          case "bottom":
            _e -= ue;
            break;
        }
        switch (S) {
          case "center":
            Pt -= Ct / 2;
            break;
          case "right":
            Pt -= Ct;
            break;
          case "inner":
            p === g - 1 ? Pt -= Ct : p > 0 && (Pt -= Ct / 2);
            break;
        }
        V = {
          left: Pt,
          top: _e,
          width: Ct + X.width,
          height: ue + X.height,
          color: B.backdropColor
        };
      }
      _.push({
        label: x,
        font: E,
        textOffset: z,
        options: {
          rotation: y,
          color: Y,
          strokeColor: C,
          strokeWidth: D,
          textAlign: L,
          textBaseline: J,
          translation: [
            w,
            k
          ],
          backdrop: V
        }
      });
    }
    return _;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Ee(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: i, mirror: s, padding: r } } = this.options, o = this._getLabelSizes(), l = t + r, a = o.widest.width;
    let u, c;
    return n === "left" ? s ? (c = this.right + r, i === "near" ? u = "left" : i === "center" ? (u = "center", c += a / 2) : (u = "right", c += a)) : (c = this.right - l, i === "near" ? u = "right" : i === "center" ? (u = "center", c -= a / 2) : (u = "left", c = this.left)) : n === "right" ? s ? (c = this.left + r, i === "near" ? u = "right" : i === "center" ? (u = "center", c -= a / 2) : (u = "left", c -= a)) : (c = this.left + l, i === "near" ? u = "left" : i === "center" ? (u = "center", c += a / 2) : (u = "right", c = this.right)) : u = "right", {
      textAlign: u,
      x: c
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (n === "top" || n === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: n }, left: i, top: s, width: r, height: o } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(i, s, r, o), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const s = this.ticks.findIndex((r) => r.value === t);
    return s >= 0 ? n.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, i = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let r, o;
    const l = (a, u, c) => {
      !c.width || !c.color || (i.save(), i.lineWidth = c.width, i.strokeStyle = c.color, i.setLineDash(c.borderDash || []), i.lineDashOffset = c.borderDashOffset, i.beginPath(), i.moveTo(a.x, a.y), i.lineTo(u.x, u.y), i.stroke(), i.restore());
    };
    if (n.display)
      for (r = 0, o = s.length; r < o; ++r) {
        const a = s[r];
        n.drawOnChartArea && l({
          x: a.x1,
          y: a.y1
        }, {
          x: a.x2,
          y: a.y2
        }, a), n.drawTicks && l({
          x: a.tx1,
          y: a.ty1
        }, {
          x: a.tx2,
          y: a.ty2
        }, {
          color: a.tickColor,
          width: a.tickWidth,
          borderDash: a.tickBorderDash,
          borderDashOffset: a.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { border: i, grid: s } } = this, r = i.setContext(this.getContext()), o = i.display ? r.width : 0;
    if (!o)
      return;
    const l = s.setContext(this.getContext(0)).lineWidth, a = this._borderValue;
    let u, c, f, d;
    this.isHorizontal() ? (u = cn(t, this.left, o) - o / 2, c = cn(t, this.right, l) + l / 2, f = d = a) : (f = cn(t, this.top, o) - o / 2, d = cn(t, this.bottom, l) + l / 2, u = c = a), n.save(), n.lineWidth = r.width, n.strokeStyle = r.color, n.beginPath(), n.moveTo(u, f), n.lineTo(c, d), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, s = this._computeLabelArea();
    s && hu(i, s);
    const r = this.getLabelItems(t);
    for (const o of r) {
      const l = o.options, a = o.font, u = o.label, c = o.textOffset;
      ws(i, u, 0, c, a, l);
    }
    s && pu(i);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: i, reverse: s } } = this;
    if (!i.display)
      return;
    const r = bt(i.font), o = te(i.padding), l = i.align;
    let a = r.lineHeight / 2;
    n === "bottom" || n === "center" || N(n) ? (a += o.bottom, ct(i.text) && (a += r.lineHeight * (i.text.length - 1))) : a += o.top;
    const { titleX: u, titleY: c, maxWidth: f, rotation: d } = w1(this, a, n, l);
    ws(t, i.text, 0, 0, r, {
      color: i.color,
      maxWidth: f,
      rotation: d,
      textAlign: x1(l, n, s),
      textBaseline: "middle",
      translation: [
        u,
        c
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, i = A(t.grid && t.grid.z, -1), s = A(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== mi.prototype.draw ? [
      {
        z: n,
        draw: (r) => {
          this.draw(r);
        }
      }
    ] : [
      {
        z: i,
        draw: (r) => {
          this.drawBackground(), this.drawGrid(r), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: n,
        draw: (r) => {
          this.drawLabels(r);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", s = [];
    let r, o;
    for (r = 0, o = n.length; r < o; ++r) {
      const l = n[r];
      l[i] === this.id && (!t || l.type === t) && s.push(l);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return bt(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ir {
  constructor(t, n, i) {
    this.type = t, this.scope = n, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let i;
    b1(n) && (i = this.register(n));
    const s = this.items, r = t.id, o = this.scope + "." + r;
    if (!r)
      throw new Error("class does not have id: " + t);
    return r in s || (s[r] = t, k1(t, o, i), this.override && lt.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, i = t.id, s = this.scope;
    i in n && delete n[i], s && i in lt[s] && (delete lt[s][i], this.override && delete On[i]);
  }
}
function k1(e, t, n) {
  const i = ms(/* @__PURE__ */ Object.create(null), [
    n ? lt.get(n) : {},
    lt.get(t),
    e.defaults
  ]);
  lt.set(t, i), e.defaultRoutes && S1(t, e.defaultRoutes), e.descriptors && lt.describe(t, e.descriptors);
}
function S1(e, t) {
  Object.keys(t).forEach((n) => {
    const i = n.split("."), s = i.pop(), r = [
      e
    ].concat(i).join("."), o = t[n].split("."), l = o.pop(), a = o.join(".");
    lt.route(r, s, a, l);
  });
}
function b1(e) {
  return "id" in e && "defaults" in e;
}
class M1 {
  constructor() {
    this.controllers = new ir(Sn, "datasets", !0), this.elements = new ir(ae, "elements"), this.plugins = new ir(Object, "plugins"), this.scales = new ir(mi, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, n, i) {
    [
      ...n
    ].forEach((s) => {
      const r = i || this._getRegistryForType(s);
      i || r.isForType(s) || r === this.plugins && s.id ? this._exec(t, r, s) : j(s, (o) => {
        const l = i || this._getRegistryForType(o);
        this._exec(t, l, o);
      });
    });
  }
  _exec(t, n, i) {
    const s = au(t);
    Q(i["before" + s], [], i), n[t](i), Q(i["after" + s], [], i);
  }
  _getRegistryForType(t) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const i = this._typedRegistries[n];
      if (i.isForType(t))
        return i;
    }
    return this.plugins;
  }
  _get(t, n, i) {
    const s = n.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + i + ".");
    return s;
  }
}
var pe = /* @__PURE__ */ new M1();
class C1 {
  constructor() {
    this._init = [];
  }
  notify(t, n, i, s) {
    n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const r = s ? this._descriptors(t).filter(s) : this._descriptors(t), o = this._notify(r, t, n, i);
    return n === "afterDestroy" && (this._notify(r, t, "stop"), this._notify(this._init, t, "uninstall")), o;
  }
  _notify(t, n, i, s) {
    s = s || {};
    for (const r of t) {
      const o = r.plugin, l = o[i], a = [
        n,
        s,
        r.options
      ];
      if (Q(l, a, o) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    U(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const i = t && t.config, s = A(i.options && i.options.plugins, {}), r = P1(i);
    return s === !1 && !n ? [] : T1(t, r, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], i = this._cache, s = (r, o) => r.filter((l) => !o.some((a) => l.plugin.id === a.plugin.id));
    this._notify(s(n, i), t, "stop"), this._notify(s(i, n), t, "start");
  }
}
function P1(e) {
  const t = {}, n = [], i = Object.keys(pe.plugins.items);
  for (let r = 0; r < i.length; r++)
    n.push(pe.getPlugin(i[r]));
  const s = e.plugins || [];
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    n.indexOf(o) === -1 && (n.push(o), t[o.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function E1(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function T1(e, { plugins: t, localIds: n }, i, s) {
  const r = [], o = e.getContext();
  for (const l of t) {
    const a = l.id, u = E1(i[a], s);
    u !== null && r.push({
      plugin: l,
      options: O1(e.config, {
        plugin: l,
        local: n[a]
      }, u, o)
    });
  }
  return r;
}
function O1(e, { plugin: t, local: n }, i, s) {
  const r = e.pluginScopeKeys(t), o = e.getOptionScopes(i, r);
  return n && t.defaults && o.push(t.defaults), e.createResolver(o, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ra(e, t) {
  const n = lt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function D1(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function R1(e, t) {
  return e === t ? "_index_" : "_value_";
}
function wf(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function L1(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function oa(e, ...t) {
  if (wf(e))
    return e;
  for (const n of t) {
    const i = n.axis || L1(n.position) || e.length > 1 && wf(e[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function kf(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function z1(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((i) => i.xAxisID === e || i.yAxisID === e);
    if (n.length)
      return kf(e, "x", n[0]) || kf(e, "y", n[0]);
  }
  return {};
}
function A1(e, t) {
  const n = On[e.type] || {
    scales: {}
  }, i = t.scales || {}, s = ra(e.type, t), r = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((o) => {
    const l = i[o];
    if (!N(l))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const a = oa(o, l, z1(o, e), lt.scales[l.type]), u = R1(a, s), c = n.scales || {};
    r[o] = Ki(/* @__PURE__ */ Object.create(null), [
      {
        axis: a
      },
      l,
      c[a],
      c[u]
    ]);
  }), e.data.datasets.forEach((o) => {
    const l = o.type || e.type, a = o.indexAxis || ra(l, t), c = (On[l] || {}).scales || {};
    Object.keys(c).forEach((f) => {
      const d = D1(f, a), h = o[d + "AxisID"] || d;
      r[h] = r[h] || /* @__PURE__ */ Object.create(null), Ki(r[h], [
        {
          axis: d
        },
        i[h],
        c[f]
      ]);
    });
  }), Object.keys(r).forEach((o) => {
    const l = r[o];
    Ki(l, [
      lt.scales[l.type],
      lt.scale
    ]);
  }), r;
}
function Ap(e) {
  const t = e.options || (e.options = {});
  t.plugins = A(t.plugins, {}), t.scales = A1(e, t);
}
function Ip(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function I1(e) {
  return e = e || {}, e.data = Ip(e.data), Ap(e), e;
}
const Sf = /* @__PURE__ */ new Map(), Fp = /* @__PURE__ */ new Set();
function sr(e, t) {
  let n = Sf.get(e);
  return n || (n = t(), Sf.set(e, n), Fp.add(n)), n;
}
const Ti = (e, t, n) => {
  const i = Tn(t, n);
  i !== void 0 && e.add(i);
};
class F1 {
  constructor(t) {
    this._config = I1(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = Ip(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), Ap(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return sr(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return sr(`${t}.transition.${n}`, () => [
      [
        `datasets.${t}.transitions.${n}`,
        `transitions.${n}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, n) {
    return sr(`${t}-${n}`, () => [
      [
        `datasets.${t}.elements.${n}`,
        `datasets.${t}`,
        `elements.${n}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const n = t.id, i = this.type;
    return sr(`${i}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const i = this._scopeCache;
    let s = i.get(t);
    return (!s || n) && (s = /* @__PURE__ */ new Map(), i.set(t, s)), s;
  }
  getOptionScopes(t, n, i) {
    const { options: s, type: r } = this, o = this._cachedScopes(t, i), l = o.get(n);
    if (l)
      return l;
    const a = /* @__PURE__ */ new Set();
    n.forEach((c) => {
      t && (a.add(t), c.forEach((f) => Ti(a, t, f))), c.forEach((f) => Ti(a, s, f)), c.forEach((f) => Ti(a, On[r] || {}, f)), c.forEach((f) => Ti(a, lt, f)), c.forEach((f) => Ti(a, na, f));
    });
    const u = Array.from(a);
    return u.length === 0 && u.push(/* @__PURE__ */ Object.create(null)), Fp.has(n) && o.set(n, u), u;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      On[n] || {},
      lt.datasets[n] || {},
      {
        type: n
      },
      lt,
      na
    ];
  }
  resolveNamedOptions(t, n, i, s = [
    ""
  ]) {
    const r = {
      $shared: !0
    }, { resolver: o, subPrefixes: l } = bf(this._resolverCache, t, s);
    let a = o;
    if (B1(o, n)) {
      r.$shared = !1, i = rn(i) ? i() : i;
      const u = this.createResolver(t, i, l);
      a = fi(o, i, u);
    }
    for (const u of n)
      r[u] = a[u];
    return r;
  }
  createResolver(t, n, i = [
    ""
  ], s) {
    const { resolver: r } = bf(this._resolverCache, t, i);
    return N(n) ? fi(r, n, void 0, s) : r;
  }
}
function bf(e, t, n) {
  let i = e.get(t);
  i || (i = /* @__PURE__ */ new Map(), e.set(t, i));
  const s = n.join();
  let r = i.get(s);
  return r || (r = {
    resolver: mu(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, i.set(s, r)), r;
}
const N1 = (e) => N(e) && Object.getOwnPropertyNames(e).some((t) => rn(e[t]));
function B1(e, t) {
  const { isScriptable: n, isIndexable: i } = _p(e);
  for (const s of t) {
    const r = n(s), o = i(s), l = (o || r) && e[s];
    if (r && (rn(l) || N1(l)) || o && ct(l))
      return !0;
  }
  return !1;
}
var j1 = "4.4.7";
const W1 = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Mf(e, t) {
  return e === "top" || e === "bottom" || W1.indexOf(e) === -1 && t === "x";
}
function Cf(e, t) {
  return function(n, i) {
    return n[e] === i[e] ? n[t] - i[t] : n[e] - i[e];
  };
}
function Pf(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Q(n && n.onComplete, [
    e
  ], t);
}
function H1(e) {
  const t = e.chart, n = t.options.animation;
  Q(n && n.onProgress, [
    e
  ], t);
}
function Np(e) {
  return _u() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Sr = {}, Ef = (e) => {
  const t = Np(e);
  return Object.values(Sr).filter((n) => n.canvas === t).pop();
};
function V1(e, t, n) {
  const i = Object.keys(e);
  for (const s of i) {
    const r = +s;
    if (r >= t) {
      const o = e[s];
      delete e[s], (n > 0 || r > t) && (e[r + n] = o);
    }
  }
}
function $1(e, t, n, i) {
  return !n || e.type === "mouseout" ? null : i ? t : e;
}
function rr(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function U1(e, t) {
  const { xScale: n, yScale: i } = e;
  return n && i ? {
    left: rr(n, t, "left"),
    right: rr(n, t, "right"),
    top: rr(i, t, "top"),
    bottom: rr(i, t, "bottom")
  } : t;
}
var Ie;
let ku = (Ie = class {
  static register(...t) {
    pe.add(...t), Tf();
  }
  static unregister(...t) {
    pe.remove(...t), Tf();
  }
  constructor(t, n) {
    const i = this.config = new F1(n), s = Np(t), r = Ef(s);
    if (r)
      throw new Error("Canvas is already in use. Chart with ID '" + r.id + "' must be destroyed before the canvas with ID '" + r.canvas.id + "' can be reused.");
    const o = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || a1(s))(), this.platform.updateConfig(i);
    const l = this.platform.acquireContext(s, o.aspectRatio), a = l && l.canvas, u = a && a.height, c = a && a.width;
    if (this.id = V0(), this.ctx = l, this.canvas = a, this.width = c, this.height = u, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new C1(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ly((f) => this.update(f), o.resizeDelay || 0), this._dataChanges = [], Sr[this.id] = this, !l || !a) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    we.listen(this, "complete", Pf), we.listen(this, "progress", H1), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: i, height: s, _aspectRatio: r } = this;
    return U(t) ? n && r ? r : s ? i / s : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return pe;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Gc(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Xc(this.canvas, this.ctx), this;
  }
  stop() {
    return we.stop(this), this;
  }
  resize(t, n) {
    we.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const i = this.options, s = this.canvas, r = i.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(s, t, n, r), l = i.devicePixelRatio || this.platform.getDevicePixelRatio(), a = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Gc(this, l, !0) && (this.notifyPlugins("resize", {
      size: o
    }), Q(i.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(a) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    j(n, (i, s) => {
      i.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, i = this.scales, s = Object.keys(i).reduce((o, l) => (o[l] = !1, o), {});
    let r = [];
    n && (r = r.concat(Object.keys(n).map((o) => {
      const l = n[o], a = oa(o, l), u = a === "r", c = a === "x";
      return {
        options: l,
        dposition: u ? "chartArea" : c ? "bottom" : "left",
        dtype: u ? "radialLinear" : c ? "category" : "linear"
      };
    }))), j(r, (o) => {
      const l = o.options, a = l.id, u = oa(a, l), c = A(l.type, o.dtype);
      (l.position === void 0 || Mf(l.position, u) !== Mf(o.dposition)) && (l.position = o.dposition), s[a] = !0;
      let f = null;
      if (a in i && i[a].type === c)
        f = i[a];
      else {
        const d = pe.getScale(c);
        f = new d({
          id: a,
          type: c,
          ctx: this.ctx,
          chart: this
        }), i[f.id] = f;
      }
      f.init(l, t);
    }), j(s, (o, l) => {
      o || delete i[l];
    }), j(i, (o) => {
      Qt.configure(this, o, o.options), Qt.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, i = t.length;
    if (t.sort((s, r) => s.index - r.index), i > n) {
      for (let s = n; s < i; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, i - n);
    }
    this._sortedMetasets = t.slice(0).sort(Cf("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((i, s) => {
      n.filter((r) => r === i._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let i, s;
    for (this._removeUnreferencedMetasets(), i = 0, s = n.length; i < s; i++) {
      const r = n[i];
      let o = this.getDatasetMeta(i);
      const l = r.type || this.config.type;
      if (o.type && o.type !== l && (this._destroyDatasetMeta(i), o = this.getDatasetMeta(i)), o.type = l, o.indexAxis = r.indexAxis || ra(l, this.options), o.order = r.order || 0, o.index = i, o.label = "" + r.label, o.visible = this.isDatasetVisible(i), o.controller)
        o.controller.updateIndex(i), o.controller.linkScales();
      else {
        const a = pe.getController(l), { datasetElementType: u, dataElementType: c } = lt.datasets[l];
        Object.assign(a, {
          dataElementType: pe.getElement(c),
          datasetElementType: u && pe.getElement(u)
        }), o.controller = new a(this, i), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    j(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const i = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !i.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const r = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let u = 0, c = this.data.datasets.length; u < c; u++) {
      const { controller: f } = this.getDatasetMeta(u), d = !s && r.indexOf(f) === -1;
      f.buildOrUpdateElements(d), o = Math.max(+f.getMaxOverflow(), o);
    }
    o = this._minPadding = i.layout.autoPadding ? o : 0, this._updateLayout(o), s || j(r, (u) => {
      u.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Cf("z", "_idx"));
    const { _active: l, _lastEvent: a } = this;
    a ? this._eventHandler(a, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    j(this.scales, (t) => {
      Qt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), i = new Set(t.events);
    (!Fc(n, i) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: i, start: s, count: r } of n) {
      const o = i === "_removeElements" ? -r : r;
      V1(t, s, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, i = (r) => new Set(t.filter((o) => o[0] === r).map((o, l) => l + "," + o.splice(1).join(","))), s = i(0);
    for (let r = 1; r < n; r++)
      if (!Fc(s, i(r)))
        return;
    return Array.from(s).map((r) => r.split(",")).map((r) => ({
      method: r[1],
      start: +r[2],
      count: +r[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    Qt.update(this, this.width, this.height, t);
    const n = this.chartArea, i = n.width <= 0 || n.height <= 0;
    this._layers = [], j(this.boxes, (s) => {
      i && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, r) => {
      s._idx = r;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let n = 0, i = this.data.datasets.length; n < i; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, i = this.data.datasets.length; n < i; ++n)
        this._updateDataset(n, rn(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const i = this.getDatasetMeta(t), s = {
      meta: i,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (i.controller._update(n), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (we.has(this) ? this.attached && !we.running(this) && we.start(this) : (this.draw(), Pf({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: i, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(i, s);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const n = this._layers;
    for (t = 0; t < n.length && n[t].z <= 0; ++t)
      n[t].draw(this.chartArea);
    for (this._drawDatasets(); t < n.length; ++t)
      n[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const n = this._sortedMetasets, i = [];
    let s, r;
    for (s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      (!t || o.visible) && i.push(o);
    }
    return i;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let n = t.length - 1; n >= 0; --n)
      this._drawDataset(t[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const n = this.ctx, i = t._clip, s = !i.disabled, r = U1(t, this.chartArea), o = {
      meta: t,
      index: t.index,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetDraw", o) !== !1 && (s && hu(n, {
      left: i.left === !1 ? 0 : r.left - i.left,
      right: i.right === !1 ? this.width : r.right + i.right,
      top: i.top === !1 ? 0 : r.top - i.top,
      bottom: i.bottom === !1 ? this.height : r.bottom + i.bottom
    }), t.controller.draw(), s && pu(n), o.cancelable = !1, this.notifyPlugins("afterDatasetDraw", o));
  }
  isPointInArea(t) {
    return xs(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, i, s) {
    const r = Wv.modes[n];
    return typeof r == "function" ? r(this, t, i, s) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], i = this._metasets;
    let s = i.filter((r) => r && r._dataset === n).pop();
    return s || (s = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: n && n.order || 0,
      index: t,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, i.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Ln(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const n = this.data.datasets[t];
    if (!n)
      return !1;
    const i = this.getDatasetMeta(t);
    return typeof i.hidden == "boolean" ? !i.hidden : !n.hidden;
  }
  setDatasetVisibility(t, n) {
    const i = this.getDatasetMeta(t);
    i.hidden = !n;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, n, i) {
    const s = i ? "show" : "hide", r = this.getDatasetMeta(t), o = r.controller._resolveAnimations(void 0, s);
    ys(n) ? (r.data[n].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), o.update(r, {
      visible: i
    }), this.update((l) => l.datasetIndex === t ? s : void 0));
  }
  hide(t, n) {
    this._updateVisibility(t, n, !1);
  }
  show(t, n) {
    this._updateVisibility(t, n, !0);
  }
  _destroyDatasetMeta(t) {
    const n = this._metasets[t];
    n && n.controller && n.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, n;
    for (this.stop(), we.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Xc(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Sr[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, i = (r, o) => {
      n.addEventListener(this, r, o), t[r] = o;
    }, s = (r, o, l) => {
      r.offsetX = o, r.offsetY = l, this._eventHandler(r);
    };
    j(this.options.events, (r) => i(r, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, i = (a, u) => {
      n.addEventListener(this, a, u), t[a] = u;
    }, s = (a, u) => {
      t[a] && (n.removeEventListener(this, a, u), delete t[a]);
    }, r = (a, u) => {
      this.canvas && this.resize(a, u);
    };
    let o;
    const l = () => {
      s("attach", l), this.attached = !0, this.resize(), i("resize", r), i("detach", o);
    };
    o = () => {
      this.attached = !1, s("resize", r), this._stop(), this._resize(0, 0), i("attach", l);
    }, n.isAttached(this.canvas) ? l() : o();
  }
  unbindEvents() {
    j(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, j(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, i) {
    const s = i ? "set" : "remove";
    let r, o, l, a;
    for (n === "dataset" && (r = this.getDatasetMeta(t[0].datasetIndex), r.controller["_" + s + "DatasetHoverStyle"]()), l = 0, a = t.length; l < a; ++l) {
      o = t[l];
      const u = o && this.getDatasetMeta(o.datasetIndex).controller;
      u && u[s + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], i = t.map(({ datasetIndex: r, index: o }) => {
      const l = this.getDatasetMeta(r);
      if (!l)
        throw new Error("No dataset found at index " + r);
      return {
        datasetIndex: r,
        element: l.data[o],
        index: o
      };
    });
    !Gr(i, n) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, n));
  }
  notifyPlugins(t, n, i) {
    return this._plugins.notify(this, t, n, i);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, i) {
    const s = this.options.hover, r = (a, u) => a.filter((c) => !u.some((f) => c.datasetIndex === f.datasetIndex && c.index === f.index)), o = r(n, t), l = i ? t : r(t, n);
    o.length && this.updateHoverStyle(o, s.mode, !1), l.length && s.mode && this.updateHoverStyle(l, s.mode, !0);
  }
  _eventHandler(t, n) {
    const i = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, s = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", i, s) === !1)
      return;
    const r = this._handleEvent(t, n, i.inChartArea);
    return i.cancelable = !1, this.notifyPlugins("afterEvent", i, s), (r || i.changed) && this.render(), this;
  }
  _handleEvent(t, n, i) {
    const { _active: s = [], options: r } = this, o = n, l = this._getActiveElements(t, s, i, o), a = Q0(t), u = $1(t, this._lastEvent, i, a);
    i && (this._lastEvent = null, Q(r.onHover, [
      t,
      l,
      this
    ], this), a && Q(r.onClick, [
      t,
      l,
      this
    ], this));
    const c = !Gr(l, s);
    return (c || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = u, c;
  }
  _getActiveElements(t, n, i, s) {
    if (t.type === "mouseout")
      return [];
    if (!i)
      return n;
    const r = this.options.hover;
    return this.getElementsAtEventForMode(t, r.mode, r, s);
  }
}, O(Ie, "defaults", lt), O(Ie, "instances", Sr), O(Ie, "overrides", On), O(Ie, "registry", pe), O(Ie, "version", j1), O(Ie, "getChart", Ef), Ie);
function Tf() {
  return j(ku.instances, (e) => e._plugins.invalidate());
}
function Y1(e, t, n) {
  const { startAngle: i, pixelMargin: s, x: r, y: o, outerRadius: l, innerRadius: a } = t;
  let u = s / l;
  e.beginPath(), e.arc(r, o, l, i - u, n + u), a > s ? (u = s / a, e.arc(r, o, a, n + u, i - u, !0)) : e.arc(r, o, s, n + dt, i - dt), e.closePath(), e.clip();
}
function X1(e) {
  return gu(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function K1(e, t, n, i) {
  const s = X1(e.options.borderRadius), r = (n - t) / 2, o = Math.min(r, i * t / 2), l = (a) => {
    const u = (n - Math.min(r, a)) * i / 2;
    return St(a, 0, Math.min(r, u));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: St(s.innerStart, 0, o),
    innerEnd: St(s.innerEnd, 0, o)
  };
}
function In(e, t, n, i) {
  return {
    x: n + e * Math.cos(t),
    y: i + e * Math.sin(t)
  };
}
function no(e, t, n, i, s, r) {
  const { x: o, y: l, startAngle: a, pixelMargin: u, innerRadius: c } = t, f = Math.max(t.outerRadius + i + n - u, 0), d = c > 0 ? c + i + n + u : 0;
  let h = 0;
  const m = s - a;
  if (i) {
    const B = c > 0 ? c - i : 0, H = f > 0 ? f - i : 0, Y = (B + H) / 2, C = Y !== 0 ? m * Y / (Y + i) : m;
    h = (m - C) / 2;
  }
  const y = Math.max(1e-3, m * f - n / rt) / f, _ = (m - y) / 2, p = a + _ + h, g = s - _ - h, { outerStart: v, outerEnd: x, innerStart: w, innerEnd: k } = K1(t, d, f, g - p), S = f - v, b = f - x, E = p + v / S, P = g - x / b, R = d + w, z = d + k, J = p + w / R, vt = g - k / z;
  if (e.beginPath(), r) {
    const B = (E + P) / 2;
    if (e.arc(o, l, f, E, B), e.arc(o, l, f, B, P), x > 0) {
      const D = In(b, P, o, l);
      e.arc(D.x, D.y, x, P, g + dt);
    }
    const H = In(z, g, o, l);
    if (e.lineTo(H.x, H.y), k > 0) {
      const D = In(z, vt, o, l);
      e.arc(D.x, D.y, k, g + dt, vt + Math.PI);
    }
    const Y = (g - k / d + (p + w / d)) / 2;
    if (e.arc(o, l, d, g - k / d, Y, !0), e.arc(o, l, d, Y, p + w / d, !0), w > 0) {
      const D = In(R, J, o, l);
      e.arc(D.x, D.y, w, J + Math.PI, p - dt);
    }
    const C = In(S, p, o, l);
    if (e.lineTo(C.x, C.y), v > 0) {
      const D = In(S, E, o, l);
      e.arc(D.x, D.y, v, p - dt, E);
    }
  } else {
    e.moveTo(o, l);
    const B = Math.cos(E) * f + o, H = Math.sin(E) * f + l;
    e.lineTo(B, H);
    const Y = Math.cos(P) * f + o, C = Math.sin(P) * f + l;
    e.lineTo(Y, C);
  }
  e.closePath();
}
function Q1(e, t, n, i, s) {
  const { fullCircles: r, startAngle: o, circumference: l } = t;
  let a = t.endAngle;
  if (r) {
    no(e, t, n, i, a, s);
    for (let u = 0; u < r; ++u)
      e.fill();
    isNaN(l) || (a = o + (l % st || st));
  }
  return no(e, t, n, i, a, s), e.fill(), a;
}
function G1(e, t, n, i, s) {
  const { fullCircles: r, startAngle: o, circumference: l, options: a } = t, { borderWidth: u, borderJoinStyle: c, borderDash: f, borderDashOffset: d } = a, h = a.borderAlign === "inner";
  if (!u)
    return;
  e.setLineDash(f || []), e.lineDashOffset = d, h ? (e.lineWidth = u * 2, e.lineJoin = c || "round") : (e.lineWidth = u, e.lineJoin = c || "bevel");
  let m = t.endAngle;
  if (r) {
    no(e, t, n, i, m, s);
    for (let y = 0; y < r; ++y)
      e.stroke();
    isNaN(l) || (m = o + (l % st || st));
  }
  h && Y1(e, t, m), r || (no(e, t, n, i, m, s), e.stroke());
}
class Ii extends ae {
  constructor(n) {
    super();
    O(this, "circumference");
    O(this, "endAngle");
    O(this, "fullCircles");
    O(this, "innerRadius");
    O(this, "outerRadius");
    O(this, "pixelMargin");
    O(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, n && Object.assign(this, n);
  }
  inRange(n, i, s) {
    const r = this.getProps([
      "x",
      "y"
    ], s), { angle: o, distance: l } = cp(r, {
      x: n,
      y: i
    }), { startAngle: a, endAngle: u, innerRadius: c, outerRadius: f, circumference: d } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), h = (this.options.spacing + this.options.borderWidth) / 2, m = A(d, u - a), y = _s(o, a, u) && a !== u, _ = m >= st || y, p = Ue(l, c + h, f + h);
    return _ && p;
  }
  getCenterPoint(n) {
    const { x: i, y: s, startAngle: r, endAngle: o, innerRadius: l, outerRadius: a } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], n), { offset: u, spacing: c } = this.options, f = (r + o) / 2, d = (l + a + c + u) / 2;
    return {
      x: i + Math.cos(f) * d,
      y: s + Math.sin(f) * d
    };
  }
  tooltipPosition(n) {
    return this.getCenterPoint(n);
  }
  draw(n) {
    const { options: i, circumference: s } = this, r = (i.offset || 0) / 4, o = (i.spacing || 0) / 2, l = i.circular;
    if (this.pixelMargin = i.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > st ? Math.floor(s / st) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    n.save();
    const a = (this.startAngle + this.endAngle) / 2;
    n.translate(Math.cos(a) * r, Math.sin(a) * r);
    const u = 1 - Math.sin(Math.min(rt, s || 0)), c = r * u;
    n.fillStyle = i.backgroundColor, n.strokeStyle = i.borderColor, Q1(n, this, c, o, l), G1(n, this, c, o, l), n.restore();
  }
}
O(Ii, "id", "arc"), O(Ii, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0
}), O(Ii, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), O(Ii, "descriptors", {
  _scriptable: !0,
  _indexable: (n) => n !== "borderDash"
});
function Bp(e, t, n = t) {
  e.lineCap = A(n.borderCapStyle, t.borderCapStyle), e.setLineDash(A(n.borderDash, t.borderDash)), e.lineDashOffset = A(n.borderDashOffset, t.borderDashOffset), e.lineJoin = A(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = A(n.borderWidth, t.borderWidth), e.strokeStyle = A(n.borderColor, t.borderColor);
}
function Z1(e, t, n) {
  e.lineTo(n.x, n.y);
}
function J1(e) {
  return e.stepped ? xy : e.tension || e.cubicInterpolationMode === "monotone" ? wy : Z1;
}
function jp(e, t, n = {}) {
  const i = e.length, { start: s = 0, end: r = i - 1 } = n, { start: o, end: l } = t, a = Math.max(s, o), u = Math.min(r, l), c = s < o && r < o || s > l && r > l;
  return {
    count: i,
    start: a,
    loop: t.loop,
    ilen: u < a && !c ? i + u - a : u - a
  };
}
function q1(e, t, n, i) {
  const { points: s, options: r } = t, { count: o, start: l, loop: a, ilen: u } = jp(s, n, i), c = J1(r);
  let { move: f = !0, reverse: d } = i || {}, h, m, y;
  for (h = 0; h <= u; ++h)
    m = s[(l + (d ? u - h : h)) % o], !m.skip && (f ? (e.moveTo(m.x, m.y), f = !1) : c(e, y, m, d, r.stepped), y = m);
  return a && (m = s[(l + (d ? u : 0)) % o], c(e, y, m, d, r.stepped)), !!a;
}
function t_(e, t, n, i) {
  const s = t.points, { count: r, start: o, ilen: l } = jp(s, n, i), { move: a = !0, reverse: u } = i || {};
  let c = 0, f = 0, d, h, m, y, _, p;
  const g = (x) => (o + (u ? l - x : x)) % r, v = () => {
    y !== _ && (e.lineTo(c, _), e.lineTo(c, y), e.lineTo(c, p));
  };
  for (a && (h = s[g(0)], e.moveTo(h.x, h.y)), d = 0; d <= l; ++d) {
    if (h = s[g(d)], h.skip)
      continue;
    const x = h.x, w = h.y, k = x | 0;
    k === m ? (w < y ? y = w : w > _ && (_ = w), c = (f * c + x) / ++f) : (v(), e.lineTo(x, w), m = k, f = 0, y = _ = w), p = w;
  }
  v();
}
function la(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? t_ : q1;
}
function e_(e) {
  return e.stepped ? qy : e.tension || e.cubicInterpolationMode === "monotone" ? tv : gn;
}
function n_(e, t, n, i) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, i) && s.closePath()), Bp(e, t.options), e.stroke(s);
}
function i_(e, t, n, i) {
  const { segments: s, options: r } = t, o = la(t);
  for (const l of s)
    Bp(e, r, l.style), e.beginPath(), o(e, t, l, {
      start: n,
      end: n + i - 1
    }) && e.closePath(), e.stroke();
}
const s_ = typeof Path2D == "function";
function r_(e, t, n, i) {
  s_ && !t.options.segment ? n_(e, t, n, i) : i_(e, t, n, i);
}
class Fi extends ae {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const s = i.spanGaps ? this._loop : this._fullLoop;
      Uy(this._points, i, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = av(this, this.options.segment));
  }
  first() {
    const t = this.segments, n = this.points;
    return t.length && n[t[0].start];
  }
  last() {
    const t = this.segments, n = this.points, i = t.length;
    return i && n[t[i - 1].end];
  }
  interpolate(t, n) {
    const i = this.options, s = t[n], r = this.points, o = rv(this, {
      property: n,
      start: s,
      end: s
    });
    if (!o.length)
      return;
    const l = [], a = e_(i);
    let u, c;
    for (u = 0, c = o.length; u < c; ++u) {
      const { start: f, end: d } = o[u], h = r[f], m = r[d];
      if (h === m) {
        l.push(h);
        continue;
      }
      const y = Math.abs((s - h[n]) / (m[n] - h[n])), _ = a(h, m, y, i.stepped);
      _[n] = t[n], l.push(_);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, i) {
    return la(this)(t, this, n, i);
  }
  path(t, n, i) {
    const s = this.segments, r = la(this);
    let o = this._loop;
    n = n || 0, i = i || this.points.length - n;
    for (const l of s)
      o &= r(t, this, l, {
        start: n,
        end: n + i - 1
      });
    return !!o;
  }
  draw(t, n, i, s) {
    const r = this.options || {};
    (this.points || []).length && r.borderWidth && (t.save(), r_(t, this, i, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
O(Fi, "id", "line"), O(Fi, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), O(Fi, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), O(Fi, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function Of(e, t, n, i) {
  const s = e.options, { [n]: r } = e.getProps([
    n
  ], i);
  return Math.abs(t - r) < s.radius + s.hitRadius;
}
class br extends ae {
  constructor(n) {
    super();
    O(this, "parsed");
    O(this, "skip");
    O(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, n && Object.assign(this, n);
  }
  inRange(n, i, s) {
    const r = this.options, { x: o, y: l } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(n - o, 2) + Math.pow(i - l, 2) < Math.pow(r.hitRadius + r.radius, 2);
  }
  inXRange(n, i) {
    return Of(this, n, "x", i);
  }
  inYRange(n, i) {
    return Of(this, n, "y", i);
  }
  getCenterPoint(n) {
    const { x: i, y: s } = this.getProps([
      "x",
      "y"
    ], n);
    return {
      x: i,
      y: s
    };
  }
  size(n) {
    n = n || this.options || {};
    let i = n.radius || 0;
    i = Math.max(i, i && n.hoverRadius || 0);
    const s = i && n.borderWidth || 0;
    return (i + s) * 2;
  }
  draw(n, i) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !xs(this, i, this.size(s) / 2) || (n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.fillStyle = s.backgroundColor, ia(n, s, this.x, this.y));
  }
  getRange() {
    const n = this.options || {};
    return n.radius + n.hitRadius;
  }
}
O(br, "id", "point"), /**
* @type {any}
*/
O(br, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
O(br, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function Wp(e, t) {
  const { x: n, y: i, base: s, width: r, height: o } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, a, u, c, f;
  return e.horizontal ? (f = o / 2, l = Math.min(n, s), a = Math.max(n, s), u = i - f, c = i + f) : (f = r / 2, l = n - f, a = n + f, u = Math.min(i, s), c = Math.max(i, s)), {
    left: l,
    top: u,
    right: a,
    bottom: c
  };
}
function Ye(e, t, n, i) {
  return e ? 0 : St(t, n, i);
}
function o_(e, t, n) {
  const i = e.options.borderWidth, s = e.borderSkipped, r = vp(i);
  return {
    t: Ye(s.top, r.top, 0, n),
    r: Ye(s.right, r.right, 0, t),
    b: Ye(s.bottom, r.bottom, 0, n),
    l: Ye(s.left, r.left, 0, t)
  };
}
function l_(e, t, n) {
  const { enableBorderRadius: i } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, r = ni(s), o = Math.min(t, n), l = e.borderSkipped, a = i || N(s);
  return {
    topLeft: Ye(!a || l.top || l.left, r.topLeft, 0, o),
    topRight: Ye(!a || l.top || l.right, r.topRight, 0, o),
    bottomLeft: Ye(!a || l.bottom || l.left, r.bottomLeft, 0, o),
    bottomRight: Ye(!a || l.bottom || l.right, r.bottomRight, 0, o)
  };
}
function a_(e) {
  const t = Wp(e), n = t.right - t.left, i = t.bottom - t.top, s = o_(e, n / 2, i / 2), r = l_(e, n / 2, i / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: i,
      radius: r
    },
    inner: {
      x: t.left + s.l,
      y: t.top + s.t,
      w: n - s.l - s.r,
      h: i - s.t - s.b,
      radius: {
        topLeft: Math.max(0, r.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, r.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, r.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, r.bottomRight - Math.max(s.b, s.r))
      }
    }
  };
}
function rl(e, t, n, i) {
  const s = t === null, r = n === null, l = e && !(s && r) && Wp(e, i);
  return l && (s || Ue(t, l.left, l.right)) && (r || Ue(n, l.top, l.bottom));
}
function u_(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function c_(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ol(e, t, n = {}) {
  const i = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, r = (e.x + e.w !== n.x + n.w ? t : 0) - i, o = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + i,
    y: e.y + s,
    w: e.w + r,
    h: e.h + o,
    radius: e.radius
  };
}
class Mr extends ae {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: n, options: { borderColor: i, backgroundColor: s } } = this, { inner: r, outer: o } = a_(this), l = u_(o.radius) ? qr : c_;
    t.save(), (o.w !== r.w || o.h !== r.h) && (t.beginPath(), l(t, ol(o, n, r)), t.clip(), l(t, ol(r, -n, o)), t.fillStyle = i, t.fill("evenodd")), t.beginPath(), l(t, ol(r, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, i) {
    return rl(this, t, n, i);
  }
  inXRange(t, n) {
    return rl(this, t, null, n);
  }
  inYRange(t, n) {
    return rl(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: i, base: s, horizontal: r } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: r ? (n + s) / 2 : n,
      y: r ? i : (i + s) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
O(Mr, "id", "bar"), O(Mr, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), O(Mr, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
const Df = (e, t) => {
  let { boxHeight: n = t, boxWidth: i = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), i = e.pointStyleWidth || Math.min(i, t)), {
    boxWidth: i,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, f_ = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Rf extends ae {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n, i) {
    this.maxWidth = t, this.maxHeight = n, this._margins = i, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let n = Q(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (n = n.filter((i) => t.filter(i, this.chart.data))), t.sort && (n = n.sort((i, s) => t.sort(i, s, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const i = t.labels, s = bt(i.font), r = s.size, o = this._computeTitleHeight(), { boxWidth: l, itemHeight: a } = Df(i, r);
    let u, c;
    n.font = s.string, this.isHorizontal() ? (u = this.maxWidth, c = this._fitRows(o, r, l, a) + 10) : (c = this.maxHeight, u = this._fitCols(o, s, l, a) + 10), this.width = Math.min(u, t.maxWidth || this.maxWidth), this.height = Math.min(c, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, i, s) {
    const { ctx: r, maxWidth: o, options: { labels: { padding: l } } } = this, a = this.legendHitBoxes = [], u = this.lineWidths = [
      0
    ], c = s + l;
    let f = t;
    r.textAlign = "left", r.textBaseline = "middle";
    let d = -1, h = -c;
    return this.legendItems.forEach((m, y) => {
      const _ = i + n / 2 + r.measureText(m.text).width;
      (y === 0 || u[u.length - 1] + _ + 2 * l > o) && (f += c, u[u.length - (y > 0 ? 0 : 1)] = 0, h += c, d++), a[y] = {
        left: 0,
        top: h,
        row: d,
        width: _,
        height: s
      }, u[u.length - 1] += _ + l;
    }), f;
  }
  _fitCols(t, n, i, s) {
    const { ctx: r, maxHeight: o, options: { labels: { padding: l } } } = this, a = this.legendHitBoxes = [], u = this.columnSizes = [], c = o - t;
    let f = l, d = 0, h = 0, m = 0, y = 0;
    return this.legendItems.forEach((_, p) => {
      const { itemWidth: g, itemHeight: v } = d_(i, n, r, _, s);
      p > 0 && h + v + 2 * l > c && (f += d + l, u.push({
        width: d,
        height: h
      }), m += d + l, y++, d = h = 0), a[p] = {
        left: m,
        top: h,
        col: y,
        width: g,
        height: v
      }, d = Math.max(d, g), h += v + l;
    }), f += d, u.push({
      width: d,
      height: h
    }), f;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: i, labels: { padding: s }, rtl: r } } = this, o = ii(r, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, a = wt(i, this.left + s, this.right - this.lineWidths[l]);
      for (const u of n)
        l !== u.row && (l = u.row, a = wt(i, this.left + s, this.right - this.lineWidths[l])), u.top += this.top + t + s, u.left = o.leftForLtr(o.x(a), u.width), a += u.width + s;
    } else {
      let l = 0, a = wt(i, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const u of n)
        u.col !== l && (l = u.col, a = wt(i, this.top + t + s, this.bottom - this.columnSizes[l].height)), u.top = a, u.left += this.left + s, u.left = o.leftForLtr(o.x(u.left), u.width), a += u.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      hu(t, this), this._draw(), pu(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: i, ctx: s } = this, { align: r, labels: o } = t, l = lt.color, a = ii(t.rtl, this.left, this.width), u = bt(o.font), { padding: c } = o, f = u.size, d = f / 2;
    let h;
    this.drawTitle(), s.textAlign = a.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = u.string;
    const { boxWidth: m, boxHeight: y, itemHeight: _ } = Df(o, f), p = function(k, S, b) {
      if (isNaN(m) || m <= 0 || isNaN(y) || y < 0)
        return;
      s.save();
      const E = A(b.lineWidth, 1);
      if (s.fillStyle = A(b.fillStyle, l), s.lineCap = A(b.lineCap, "butt"), s.lineDashOffset = A(b.lineDashOffset, 0), s.lineJoin = A(b.lineJoin, "miter"), s.lineWidth = E, s.strokeStyle = A(b.strokeStyle, l), s.setLineDash(A(b.lineDash, [])), o.usePointStyle) {
        const P = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: b.pointStyle,
          rotation: b.rotation,
          borderWidth: E
        }, R = a.xPlus(k, m / 2), z = S + d;
        yp(s, P, R, z, o.pointStyleWidth && m);
      } else {
        const P = S + Math.max((f - y) / 2, 0), R = a.leftForLtr(k, m), z = ni(b.borderRadius);
        s.beginPath(), Object.values(z).some((J) => J !== 0) ? qr(s, {
          x: R,
          y: P,
          w: m,
          h: y,
          radius: z
        }) : s.rect(R, P, m, y), s.fill(), E !== 0 && s.stroke();
      }
      s.restore();
    }, g = function(k, S, b) {
      ws(s, b.text, k, S + _ / 2, u, {
        strikethrough: b.hidden,
        textAlign: a.textAlign(b.textAlign)
      });
    }, v = this.isHorizontal(), x = this._computeTitleHeight();
    v ? h = {
      x: wt(r, this.left + c, this.right - i[0]),
      y: this.top + c + x,
      line: 0
    } : h = {
      x: this.left + c,
      y: wt(r, this.top + x + c, this.bottom - n[0].height),
      line: 0
    }, bp(this.ctx, t.textDirection);
    const w = _ + c;
    this.legendItems.forEach((k, S) => {
      s.strokeStyle = k.fontColor, s.fillStyle = k.fontColor;
      const b = s.measureText(k.text).width, E = a.textAlign(k.textAlign || (k.textAlign = o.textAlign)), P = m + d + b;
      let R = h.x, z = h.y;
      a.setWidth(this.width), v ? S > 0 && R + P + c > this.right && (z = h.y += w, h.line++, R = h.x = wt(r, this.left + c, this.right - i[h.line])) : S > 0 && z + w > this.bottom && (R = h.x = R + n[h.line].width + c, h.line++, z = h.y = wt(r, this.top + x + c, this.bottom - n[h.line].height));
      const J = a.x(R);
      if (p(J, z, k), R = ay(E, R + m + d, v ? R + P : this.right, t.rtl), g(a.x(R), z, k), v)
        h.x += P + c;
      else if (typeof k.text != "string") {
        const vt = u.lineHeight;
        h.y += Hp(k, vt) + c;
      } else
        h.y += w;
    }), Mp(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, i = bt(n.font), s = te(n.padding);
    if (!n.display)
      return;
    const r = ii(t.rtl, this.left, this.width), o = this.ctx, l = n.position, a = i.size / 2, u = s.top + a;
    let c, f = this.left, d = this.width;
    if (this.isHorizontal())
      d = Math.max(...this.lineWidths), c = this.top + u, f = wt(t.align, f, this.right - d);
    else {
      const m = this.columnSizes.reduce((y, _) => Math.max(y, _.height), 0);
      c = u + wt(t.align, this.top, this.bottom - m - t.labels.padding - this._computeTitleHeight());
    }
    const h = wt(l, f, f + d);
    o.textAlign = r.textAlign(cu(l)), o.textBaseline = "middle", o.strokeStyle = n.color, o.fillStyle = n.color, o.font = i.string, ws(o, n.text, h, c, i);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = bt(t.font), i = te(t.padding);
    return t.display ? n.lineHeight + i.height : 0;
  }
  _getLegendItemAt(t, n) {
    let i, s, r;
    if (Ue(t, this.left, this.right) && Ue(n, this.top, this.bottom)) {
      for (r = this.legendHitBoxes, i = 0; i < r.length; ++i)
        if (s = r[i], Ue(t, s.left, s.left + s.width) && Ue(n, s.top, s.top + s.height))
          return this.legendItems[i];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!g_(t.type, n))
      return;
    const i = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, r = f_(s, i);
      s && !r && Q(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = i, i && !r && Q(n.onHover, [
        t,
        i,
        this
      ], this);
    } else i && Q(n.onClick, [
      t,
      i,
      this
    ], this);
  }
}
function d_(e, t, n, i, s) {
  const r = h_(i, e, t, n), o = p_(s, i, t.lineHeight);
  return {
    itemWidth: r,
    itemHeight: o
  };
}
function h_(e, t, n, i) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((r, o) => r.length > o.length ? r : o)), t + n.size / 2 + i.measureText(s).width;
}
function p_(e, t, n) {
  let i = e;
  return typeof t.text != "string" && (i = Hp(t, n)), i;
}
function Hp(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function g_(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var m_ = {
  id: "legend",
  _element: Rf,
  start(e, t, n) {
    const i = e.legend = new Rf({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    Qt.configure(e, i, n), Qt.addBox(e, i);
  },
  stop(e) {
    Qt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const i = e.legend;
    Qt.configure(e, i, n), i.options = n;
  },
  afterUpdate(e) {
    const t = e.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(e, t) {
    t.replay || e.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(e, t, n) {
      const i = t.datasetIndex, s = n.chart;
      s.isDatasetVisible(i) ? (s.hide(i), t.hidden = !0) : (s.show(i), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: i, textAlign: s, color: r, useBorderRadius: o, borderRadius: l } } = e.legend.options;
        return e._getSortedDatasetMetas().map((a) => {
          const u = a.controller.getStyle(n ? 0 : void 0), c = te(u.borderWidth);
          return {
            text: t[a.index].label,
            fillStyle: u.backgroundColor,
            fontColor: r,
            hidden: !a.visible,
            lineCap: u.borderCapStyle,
            lineDash: u.borderDash,
            lineDashOffset: u.borderDashOffset,
            lineJoin: u.borderJoinStyle,
            lineWidth: (c.width + c.height) / 4,
            strokeStyle: u.borderColor,
            pointStyle: i || u.pointStyle,
            rotation: u.rotation,
            textAlign: s || u.textAlign,
            borderRadius: o && (l || u.borderRadius),
            datasetIndex: a.index
          };
        }, this);
      }
    },
    title: {
      color: (e) => e.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (e) => !e.startsWith("on"),
    labels: {
      _scriptable: (e) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(e)
    }
  }
};
class Vp extends ae {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n) {
    const i = this.options;
    if (this.left = 0, this.top = 0, !i.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = n;
    const s = ct(i.text) ? i.text.length : 1;
    this._padding = te(i.padding);
    const r = s * bt(i.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = r : this.width = r;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: i, bottom: s, right: r, options: o } = this, l = o.align;
    let a = 0, u, c, f;
    return this.isHorizontal() ? (c = wt(l, i, r), f = n + t, u = r - i) : (o.position === "left" ? (c = i + t, f = wt(l, s, n), a = rt * -0.5) : (c = r - t, f = wt(l, n, s), a = rt * 0.5), u = s - n), {
      titleX: c,
      titleY: f,
      maxWidth: u,
      rotation: a
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const i = bt(n.font), r = i.lineHeight / 2 + this._padding.top, { titleX: o, titleY: l, maxWidth: a, rotation: u } = this._drawArgs(r);
    ws(t, n.text, 0, 0, i, {
      color: n.color,
      maxWidth: a,
      rotation: u,
      textAlign: cu(n.align),
      textBaseline: "middle",
      translation: [
        o,
        l
      ]
    });
  }
}
function y_(e, t) {
  const n = new Vp({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Qt.configure(e, n, t), Qt.addBox(e, n), e.titleBlock = n;
}
var v_ = {
  id: "title",
  _element: Vp,
  start(e, t, n) {
    y_(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    Qt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const i = e.titleBlock;
    Qt.configure(e, i, n), i.options = n;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const Ni = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, i = /* @__PURE__ */ new Set(), s = 0, r = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const a = l.tooltipPosition();
        i.add(a.x), s += a.y, ++r;
      }
    }
    return r === 0 || i.size === 0 ? !1 : {
      x: [
        ...i
      ].reduce((l, a) => l + a) / i.size,
      y: s / r
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, i = t.y, s = Number.POSITIVE_INFINITY, r, o, l;
    for (r = 0, o = e.length; r < o; ++r) {
      const a = e[r].element;
      if (a && a.hasValue()) {
        const u = a.getCenterPoint(), c = ea(t, u);
        c < s && (s = c, l = a);
      }
    }
    if (l) {
      const a = l.tooltipPosition();
      n = a.x, i = a.y;
    }
    return {
      x: n,
      y: i
    };
  }
};
function de(e, t) {
  return t && (ct(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function ke(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function __(e, t) {
  const { element: n, datasetIndex: i, index: s } = t, r = e.getDatasetMeta(i).controller, { label: o, value: l } = r.getLabelAndValue(s);
  return {
    chart: e,
    label: o,
    parsed: r.getParsed(s),
    raw: e.data.datasets[i].data[s],
    formattedValue: l,
    dataset: r.getDataset(),
    dataIndex: s,
    datasetIndex: i,
    element: n
  };
}
function Lf(e, t) {
  const n = e.chart.ctx, { body: i, footer: s, title: r } = e, { boxWidth: o, boxHeight: l } = t, a = bt(t.bodyFont), u = bt(t.titleFont), c = bt(t.footerFont), f = r.length, d = s.length, h = i.length, m = te(t.padding);
  let y = m.height, _ = 0, p = i.reduce((x, w) => x + w.before.length + w.lines.length + w.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, f && (y += f * u.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const x = t.displayColors ? Math.max(l, a.lineHeight) : a.lineHeight;
    y += h * x + (p - h) * a.lineHeight + (p - 1) * t.bodySpacing;
  }
  d && (y += t.footerMarginTop + d * c.lineHeight + (d - 1) * t.footerSpacing);
  let g = 0;
  const v = function(x) {
    _ = Math.max(_, n.measureText(x).width + g);
  };
  return n.save(), n.font = u.string, j(e.title, v), n.font = a.string, j(e.beforeBody.concat(e.afterBody), v), g = t.displayColors ? o + 2 + t.boxPadding : 0, j(i, (x) => {
    j(x.before, v), j(x.lines, v), j(x.after, v);
  }), g = 0, n.font = c.string, j(e.footer, v), n.restore(), _ += m.width, {
    width: _,
    height: y
  };
}
function x_(e, t) {
  const { y: n, height: i } = t;
  return n < i / 2 ? "top" : n > e.height - i / 2 ? "bottom" : "center";
}
function w_(e, t, n, i) {
  const { x: s, width: r } = i, o = n.caretSize + n.caretPadding;
  if (e === "left" && s + r + o > t.width || e === "right" && s - r - o < 0)
    return !0;
}
function k_(e, t, n, i) {
  const { x: s, width: r } = n, { width: o, chartArea: { left: l, right: a } } = e;
  let u = "center";
  return i === "center" ? u = s <= (l + a) / 2 ? "left" : "right" : s <= r / 2 ? u = "left" : s >= o - r / 2 && (u = "right"), w_(u, e, t, n) && (u = "center"), u;
}
function zf(e, t, n) {
  const i = n.yAlign || t.yAlign || x_(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || k_(e, t, n, i),
    yAlign: i
  };
}
function S_(e, t) {
  let { x: n, width: i } = e;
  return t === "right" ? n -= i : t === "center" && (n -= i / 2), n;
}
function b_(e, t, n) {
  let { y: i, height: s } = e;
  return t === "top" ? i += n : t === "bottom" ? i -= s + n : i -= s / 2, i;
}
function Af(e, t, n, i) {
  const { caretSize: s, caretPadding: r, cornerRadius: o } = e, { xAlign: l, yAlign: a } = n, u = s + r, { topLeft: c, topRight: f, bottomLeft: d, bottomRight: h } = ni(o);
  let m = S_(t, l);
  const y = b_(t, a, u);
  return a === "center" ? l === "left" ? m += u : l === "right" && (m -= u) : l === "left" ? m -= Math.max(c, d) + s : l === "right" && (m += Math.max(f, h) + s), {
    x: St(m, 0, i.width - t.width),
    y: St(y, 0, i.height - t.height)
  };
}
function or(e, t, n) {
  const i = te(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - i.right : e.x + i.left;
}
function If(e) {
  return de([], ke(e));
}
function M_(e, t, n) {
  return Ln(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Ff(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const $p = {
  beforeTitle: xe,
  title(e) {
    if (e.length > 0) {
      const t = e[0], n = t.chart.data.labels, i = n ? n.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (i > 0 && t.dataIndex < i)
        return n[t.dataIndex];
    }
    return "";
  },
  afterTitle: xe,
  beforeBody: xe,
  beforeLabel: xe,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return U(n) || (t += n), t;
  },
  labelColor(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: n.borderColor,
      backgroundColor: n.backgroundColor,
      borderWidth: n.borderWidth,
      borderDash: n.borderDash,
      borderDashOffset: n.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: n.pointStyle,
      rotation: n.rotation
    };
  },
  afterLabel: xe,
  afterBody: xe,
  beforeFooter: xe,
  footer: xe,
  afterFooter: xe
};
function Rt(e, t, n, i) {
  const s = e[t].call(n, i);
  return typeof s > "u" ? $p[t].call(n, i) : s;
}
class aa extends ae {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const n = this.chart, i = this.options.setContext(this.getContext()), s = i.enabled && n.options.animation && i.animations, r = new Pp(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = M_(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: i } = n, s = Rt(i, "beforeTitle", this, t), r = Rt(i, "title", this, t), o = Rt(i, "afterTitle", this, t);
    let l = [];
    return l = de(l, ke(s)), l = de(l, ke(r)), l = de(l, ke(o)), l;
  }
  getBeforeBody(t, n) {
    return If(Rt(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: i } = n, s = [];
    return j(t, (r) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, l = Ff(i, r);
      de(o.before, ke(Rt(l, "beforeLabel", this, r))), de(o.lines, Rt(l, "label", this, r)), de(o.after, ke(Rt(l, "afterLabel", this, r))), s.push(o);
    }), s;
  }
  getAfterBody(t, n) {
    return If(Rt(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: i } = n, s = Rt(i, "beforeFooter", this, t), r = Rt(i, "footer", this, t), o = Rt(i, "afterFooter", this, t);
    let l = [];
    return l = de(l, ke(s)), l = de(l, ke(r)), l = de(l, ke(o)), l;
  }
  _createItems(t) {
    const n = this._active, i = this.chart.data, s = [], r = [], o = [];
    let l = [], a, u;
    for (a = 0, u = n.length; a < u; ++a)
      l.push(__(this.chart, n[a]));
    return t.filter && (l = l.filter((c, f, d) => t.filter(c, f, d, i))), t.itemSort && (l = l.sort((c, f) => t.itemSort(c, f, i))), j(l, (c) => {
      const f = Ff(t.callbacks, c);
      s.push(Rt(f, "labelColor", this, c)), r.push(Rt(f, "labelPointStyle", this, c)), o.push(Rt(f, "labelTextColor", this, c));
    }), this.labelColors = s, this.labelPointStyles = r, this.labelTextColors = o, this.dataPoints = l, l;
  }
  update(t, n) {
    const i = this.options.setContext(this.getContext()), s = this._active;
    let r, o = [];
    if (!s.length)
      this.opacity !== 0 && (r = {
        opacity: 0
      });
    else {
      const l = Ni[i.position].call(this, s, this._eventPosition);
      o = this._createItems(i), this.title = this.getTitle(o, i), this.beforeBody = this.getBeforeBody(o, i), this.body = this.getBody(o, i), this.afterBody = this.getAfterBody(o, i), this.footer = this.getFooter(o, i);
      const a = this._size = Lf(this, i), u = Object.assign({}, l, a), c = zf(this.chart, i, u), f = Af(i, u, c, this.chart);
      this.xAlign = c.xAlign, this.yAlign = c.yAlign, r = {
        opacity: 1,
        x: f.x,
        y: f.y,
        width: a.width,
        height: a.height,
        caretX: l.x,
        caretY: l.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, r && this._resolveAnimations().update(this, r), t && i.external && i.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, i, s) {
    const r = this.getCaretPosition(t, i, s);
    n.lineTo(r.x1, r.y1), n.lineTo(r.x2, r.y2), n.lineTo(r.x3, r.y3);
  }
  getCaretPosition(t, n, i) {
    const { xAlign: s, yAlign: r } = this, { caretSize: o, cornerRadius: l } = i, { topLeft: a, topRight: u, bottomLeft: c, bottomRight: f } = ni(l), { x: d, y: h } = t, { width: m, height: y } = n;
    let _, p, g, v, x, w;
    return r === "center" ? (x = h + y / 2, s === "left" ? (_ = d, p = _ - o, v = x + o, w = x - o) : (_ = d + m, p = _ + o, v = x - o, w = x + o), g = _) : (s === "left" ? p = d + Math.max(a, c) + o : s === "right" ? p = d + m - Math.max(u, f) - o : p = this.caretX, r === "top" ? (v = h, x = v - o, _ = p - o, g = p + o) : (v = h + y, x = v + o, _ = p + o, g = p - o), w = v), {
      x1: _,
      x2: p,
      x3: g,
      y1: v,
      y2: x,
      y3: w
    };
  }
  drawTitle(t, n, i) {
    const s = this.title, r = s.length;
    let o, l, a;
    if (r) {
      const u = ii(i.rtl, this.x, this.width);
      for (t.x = or(this, i.titleAlign, i), n.textAlign = u.textAlign(i.titleAlign), n.textBaseline = "middle", o = bt(i.titleFont), l = i.titleSpacing, n.fillStyle = i.titleColor, n.font = o.string, a = 0; a < r; ++a)
        n.fillText(s[a], u.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + l, a + 1 === r && (t.y += i.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, i, s, r) {
    const o = this.labelColors[i], l = this.labelPointStyles[i], { boxHeight: a, boxWidth: u } = r, c = bt(r.bodyFont), f = or(this, "left", r), d = s.x(f), h = a < c.lineHeight ? (c.lineHeight - a) / 2 : 0, m = n.y + h;
    if (r.usePointStyle) {
      const y = {
        radius: Math.min(u, a) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, _ = s.leftForLtr(d, u) + u / 2, p = m + a / 2;
      t.strokeStyle = r.multiKeyBackground, t.fillStyle = r.multiKeyBackground, ia(t, y, _, p), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, ia(t, y, _, p);
    } else {
      t.lineWidth = N(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const y = s.leftForLtr(d, u), _ = s.leftForLtr(s.xPlus(d, 1), u - 2), p = ni(o.borderRadius);
      Object.values(p).some((g) => g !== 0) ? (t.beginPath(), t.fillStyle = r.multiKeyBackground, qr(t, {
        x: y,
        y: m,
        w: u,
        h: a,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), qr(t, {
        x: _,
        y: m + 1,
        w: u - 2,
        h: a - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = r.multiKeyBackground, t.fillRect(y, m, u, a), t.strokeRect(y, m, u, a), t.fillStyle = o.backgroundColor, t.fillRect(_, m + 1, u - 2, a - 2));
    }
    t.fillStyle = this.labelTextColors[i];
  }
  drawBody(t, n, i) {
    const { body: s } = this, { bodySpacing: r, bodyAlign: o, displayColors: l, boxHeight: a, boxWidth: u, boxPadding: c } = i, f = bt(i.bodyFont);
    let d = f.lineHeight, h = 0;
    const m = ii(i.rtl, this.x, this.width), y = function(b) {
      n.fillText(b, m.x(t.x + h), t.y + d / 2), t.y += d + r;
    }, _ = m.textAlign(o);
    let p, g, v, x, w, k, S;
    for (n.textAlign = o, n.textBaseline = "middle", n.font = f.string, t.x = or(this, _, i), n.fillStyle = i.bodyColor, j(this.beforeBody, y), h = l && _ !== "right" ? o === "center" ? u / 2 + c : u + 2 + c : 0, x = 0, k = s.length; x < k; ++x) {
      for (p = s[x], g = this.labelTextColors[x], n.fillStyle = g, j(p.before, y), v = p.lines, l && v.length && (this._drawColorBox(n, t, x, m, i), d = Math.max(f.lineHeight, a)), w = 0, S = v.length; w < S; ++w)
        y(v[w]), d = f.lineHeight;
      j(p.after, y);
    }
    h = 0, d = f.lineHeight, j(this.afterBody, y), t.y -= r;
  }
  drawFooter(t, n, i) {
    const s = this.footer, r = s.length;
    let o, l;
    if (r) {
      const a = ii(i.rtl, this.x, this.width);
      for (t.x = or(this, i.footerAlign, i), t.y += i.footerMarginTop, n.textAlign = a.textAlign(i.footerAlign), n.textBaseline = "middle", o = bt(i.footerFont), n.fillStyle = i.footerColor, n.font = o.string, l = 0; l < r; ++l)
        n.fillText(s[l], a.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + i.footerSpacing;
    }
  }
  drawBackground(t, n, i, s) {
    const { xAlign: r, yAlign: o } = this, { x: l, y: a } = t, { width: u, height: c } = i, { topLeft: f, topRight: d, bottomLeft: h, bottomRight: m } = ni(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + f, a), o === "top" && this.drawCaret(t, n, i, s), n.lineTo(l + u - d, a), n.quadraticCurveTo(l + u, a, l + u, a + d), o === "center" && r === "right" && this.drawCaret(t, n, i, s), n.lineTo(l + u, a + c - m), n.quadraticCurveTo(l + u, a + c, l + u - m, a + c), o === "bottom" && this.drawCaret(t, n, i, s), n.lineTo(l + h, a + c), n.quadraticCurveTo(l, a + c, l, a + c - h), o === "center" && r === "left" && this.drawCaret(t, n, i, s), n.lineTo(l, a + f), n.quadraticCurveTo(l, a, l + f, a), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, i = this.$animations, s = i && i.x, r = i && i.y;
    if (s || r) {
      const o = Ni[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const l = this._size = Lf(this, t), a = Object.assign({}, o, this._size), u = zf(n, t, a), c = Af(t, a, u, n);
      (s._to !== c.x || r._to !== c.y) && (this.xAlign = u.xAlign, this.yAlign = u.yAlign, this.width = l.width, this.height = l.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, c));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const n = this.options.setContext(this.getContext());
    let i = this.opacity;
    if (!i)
      return;
    this._updateAnimationTarget(n);
    const s = {
      width: this.width,
      height: this.height
    }, r = {
      x: this.x,
      y: this.y
    };
    i = Math.abs(i) < 1e-3 ? 0 : i;
    const o = te(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = i, this.drawBackground(r, t, s, n), bp(t, n.textDirection), r.y += o.top, this.drawTitle(r, t, n), this.drawBody(r, t, n), this.drawFooter(r, t, n), Mp(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const i = this._active, s = t.map(({ datasetIndex: l, index: a }) => {
      const u = this.chart.getDatasetMeta(l);
      if (!u)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: u.data[a],
        index: a
      };
    }), r = !Gr(i, s), o = this._positionChanged(s, n);
    (r || o) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, i = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, r = this._active || [], o = this._getActiveElements(t, r, n, i), l = this._positionChanged(o, t), a = n || !Gr(o, r) || l;
    return a && (this._active = o, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), a;
  }
  _getActiveElements(t, n, i, s) {
    const r = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return n.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(t, r.mode, r, i);
    return r.reverse && o.reverse(), o;
  }
  _positionChanged(t, n) {
    const { caretX: i, caretY: s, options: r } = this, o = Ni[r.position].call(this, t, n);
    return o !== !1 && (i !== o.x || s !== o.y);
  }
}
O(aa, "positioners", Ni);
var C_ = {
  id: "tooltip",
  _element: aa,
  positioners: Ni,
  afterInit(e, t, n) {
    n && (e.tooltip = new aa({
      chart: e,
      options: n
    }));
  },
  beforeUpdate(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  reset(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const n = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...n,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const n = t.replay;
      e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (e, t) => t.bodyFont.size,
    boxWidth: (e, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: $p
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (e) => e !== "filter" && e !== "itemSort" && e !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
const P_ = (e, t, n, i) => (typeof t == "string" ? (n = e.push(t) - 1, i.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function E_(e, t, n, i) {
  const s = e.indexOf(t);
  if (s === -1)
    return P_(e, t, n, i);
  const r = e.lastIndexOf(t);
  return s !== r ? n : s;
}
const T_ = (e, t) => e === null ? null : St(Math.round(e), 0, t);
function Nf(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class ua extends mi {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const i = this.getLabels();
      for (const { index: s, label: r } of n)
        i[s] === r && i.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (U(t))
      return null;
    const i = this.getLabels();
    return n = isFinite(n) && i[n] === t ? n : E_(i, t, A(n, t), this._addedLabels), T_(n, i.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: i, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (i = 0), n || (s = this.getLabels().length - 1)), this.min = i, this.max = s;
  }
  buildTicks() {
    const t = this.min, n = this.max, i = this.options.offset, s = [];
    let r = this.getLabels();
    r = t === 0 && n === r.length - 1 ? r : r.slice(t, n + 1), this._valueRange = Math.max(r.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? 0.5 : 0);
    for (let o = t; o <= n; o++)
      s.push({
        value: o
      });
    return s;
  }
  getLabelForValue(t) {
    return Nf.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
O(ua, "id", "category"), O(ua, "defaults", {
  ticks: {
    callback: Nf
  }
});
function O_(e, t) {
  const n = [], { bounds: s, step: r, min: o, max: l, precision: a, count: u, maxTicks: c, maxDigits: f, includeBounds: d } = e, h = r || 1, m = c - 1, { min: y, max: _ } = t, p = !U(o), g = !U(l), v = !U(u), x = (_ - y) / (f + 1);
  let w = Bc((_ - y) / m / h) * h, k, S, b, E;
  if (w < 1e-14 && !p && !g)
    return [
      {
        value: y
      },
      {
        value: _
      }
    ];
  E = Math.ceil(_ / w) - Math.floor(y / w), E > m && (w = Bc(E * w / m / h) * h), U(a) || (k = Math.pow(10, a), w = Math.ceil(w * k) / k), s === "ticks" ? (S = Math.floor(y / w) * w, b = Math.ceil(_ / w) * w) : (S = y, b = _), p && g && r && q0((l - o) / r, w / 1e3) ? (E = Math.round(Math.min((l - o) / w, c)), w = (l - o) / E, S = o, b = l) : v ? (S = p ? o : S, b = g ? l : b, E = u - 1, w = (b - S) / E) : (E = (b - S) / w, Qi(E, Math.round(E), w / 1e3) ? E = Math.round(E) : E = Math.ceil(E));
  const P = Math.max(jc(w), jc(S));
  k = Math.pow(10, U(a) ? P : a), S = Math.round(S * k) / k, b = Math.round(b * k) / k;
  let R = 0;
  for (p && (d && S !== o ? (n.push({
    value: o
  }), S < o && R++, Qi(Math.round((S + R * w) * k) / k, o, Bf(o, x, e)) && R++) : S < o && R++); R < E; ++R) {
    const z = Math.round((S + R * w) * k) / k;
    if (g && z > l)
      break;
    n.push({
      value: z
    });
  }
  return g && d && b !== l ? n.length && Qi(n[n.length - 1].value, l, Bf(l, x, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!g || b === l) && n.push({
    value: b
  }), n;
}
function Bf(e, t, { horizontal: n, minRotation: i }) {
  const s = Ee(i), r = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, o = 0.75 * t * ("" + e).length;
  return Math.min(t / r, o);
}
class D_ extends mi {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return U(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: i } = this.getUserBounds();
    let { min: s, max: r } = this;
    const o = (a) => s = n ? s : a, l = (a) => r = i ? r : a;
    if (t) {
      const a = ve(s), u = ve(r);
      a < 0 && u < 0 ? l(0) : a > 0 && u > 0 && o(0);
    }
    if (s === r) {
      let a = r === 0 ? 1 : Math.abs(r * 0.05);
      l(r + a), t || o(s - a);
    }
    this.min = s, this.max = r;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: i } = t, s;
    return i ? (s = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), n = n || 11), n && (s = Math.min(n, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let i = this.getTickLimit();
    i = Math.max(2, i);
    const s = {
      maxTicks: i,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, r = this._range || this, o = O_(s, r);
    return t.bounds === "ticks" && ty(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, i = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (i - n) / Math.max(t.length - 1, 1) / 2;
      n -= s, i += s;
    }
    this._startValue = n, this._endValue = i, this._valueRange = i - n;
  }
  getLabelForValue(t) {
    return du(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class ca extends D_ {
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = qt(t) ? t : 0, this.max = qt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, i = Ee(this.options.ticks.minRotation), s = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, r = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, r.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
O(ca, "id", "linear"), O(ca, "defaults", {
  ticks: {
    callback: mp.formatters.numeric
  }
});
const wo = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, zt = /* @__PURE__ */ Object.keys(wo);
function jf(e, t) {
  return e - t;
}
function Wf(e, t) {
  if (U(t))
    return null;
  const n = e._adapter, { parser: i, round: s, isoWeekday: r } = e._parseOpts;
  let o = t;
  return typeof i == "function" && (o = i(o)), qt(o) || (o = typeof i == "string" ? n.parse(o, i) : n.parse(o)), o === null ? null : (s && (o = s === "week" && (vs(r) || r === !0) ? n.startOf(o, "isoWeek", r) : n.startOf(o, s)), +o);
}
function Hf(e, t, n, i) {
  const s = zt.length;
  for (let r = zt.indexOf(e); r < s - 1; ++r) {
    const o = wo[zt[r]], l = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((n - t) / (l * o.size)) <= i)
      return zt[r];
  }
  return zt[s - 1];
}
function R_(e, t, n, i, s) {
  for (let r = zt.length - 1; r >= zt.indexOf(n); r--) {
    const o = zt[r];
    if (wo[o].common && e._adapter.diff(s, i, o) >= t - 1)
      return o;
  }
  return zt[n ? zt.indexOf(n) : 0];
}
function L_(e) {
  for (let t = zt.indexOf(e) + 1, n = zt.length; t < n; ++t)
    if (wo[zt[t]].common)
      return zt[t];
}
function Vf(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: i, hi: s } = uu(n, t), r = n[i] >= t ? n[i] : n[s];
    e[r] = !0;
  }
}
function z_(e, t, n, i) {
  const s = e._adapter, r = +s.startOf(t[0].value, i), o = t[t.length - 1].value;
  let l, a;
  for (l = r; l <= o; l = +s.add(l, 1, i))
    a = n[l], a >= 0 && (t[a].major = !0);
  return t;
}
function $f(e, t, n) {
  const i = [], s = {}, r = t.length;
  let o, l;
  for (o = 0; o < r; ++o)
    l = t[o], s[l] = o, i.push({
      value: l,
      major: !1
    });
  return r === 0 || !n ? i : z_(e, i, s, n);
}
class io extends mi {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n = {}) {
    const i = t.time || (t.time = {}), s = this._adapter = new Iv._date(t.adapters.date);
    s.init(n), Ki(i.displayFormats, s.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Wf(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, n = this._adapter, i = t.time.unit || "day";
    let { min: s, max: r, minDefined: o, maxDefined: l } = this.getUserBounds();
    function a(u) {
      !o && !isNaN(u.min) && (s = Math.min(s, u.min)), !l && !isNaN(u.max) && (r = Math.max(r, u.max));
    }
    (!o || !l) && (a(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && a(this.getMinMax(!1))), s = qt(s) && !isNaN(s) ? s : +n.startOf(Date.now(), i), r = qt(r) && !isNaN(r) ? r : +n.endOf(Date.now(), i) + 1, this.min = Math.min(s, r - 1), this.max = Math.max(s + 1, r);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    return t.length && (n = t[0], i = t[t.length - 1]), {
      min: n,
      max: i
    };
  }
  buildTicks() {
    const t = this.options, n = t.time, i = t.ticks, s = i.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const r = this.min, o = this.max, l = ry(s, r, o);
    return this._unit = n.unit || (i.autoSkip ? Hf(n.minUnit, this.min, this.max, this._getLabelCapacity(r)) : R_(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : L_(this._unit), this.initOffsets(s), t.reverse && l.reverse(), $f(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, i = 0, s, r;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, r = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? i = r : i = (r - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    n = St(n, 0, o), i = St(i, 0, o), this._offsets = {
      start: n,
      end: i,
      factor: 1 / (n + 1 + i)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, i = this.max, s = this.options, r = s.time, o = r.unit || Hf(r.minUnit, n, i, this._getLabelCapacity(n)), l = A(s.ticks.stepSize, 1), a = o === "week" ? r.isoWeekday : !1, u = vs(a) || a === !0, c = {};
    let f = n, d, h;
    if (u && (f = +t.startOf(f, "isoWeek", a)), f = +t.startOf(f, u ? "day" : o), t.diff(i, n, o) > 1e5 * l)
      throw new Error(n + " and " + i + " are too far apart with stepSize of " + l + " " + o);
    const m = s.ticks.source === "data" && this.getDataTimestamps();
    for (d = f, h = 0; d < i; d = +t.add(d, l, o), h++)
      Vf(c, d, m);
    return (d === i || s.bounds === "ticks" || h === 1) && Vf(c, d, m), Object.keys(c).sort(jf).map((y) => +y);
  }
  getLabelForValue(t) {
    const n = this._adapter, i = this.options.time;
    return i.tooltipFormat ? n.format(t, i.tooltipFormat) : n.format(t, i.displayFormats.datetime);
  }
  format(t, n) {
    const s = this.options.time.displayFormats, r = this._unit, o = n || s[r];
    return this._adapter.format(t, o);
  }
  _tickFormatFunction(t, n, i, s) {
    const r = this.options, o = r.ticks.callback;
    if (o)
      return Q(o, [
        t,
        n,
        i
      ], this);
    const l = r.time.displayFormats, a = this._unit, u = this._majorUnit, c = a && l[a], f = u && l[u], d = i[n], h = u && f && d && d.major;
    return this._adapter.format(t, s || (h ? f : c));
  }
  generateTickLabels(t) {
    let n, i, s;
    for (n = 0, i = t.length; n < i; ++n)
      s = t[n], s.label = this._tickFormatFunction(s.value, n, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const n = this._offsets, i = this.getDecimalForValue(t);
    return this.getPixelForDecimal((n.start + i) * n.factor);
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return this.min + i * (this.max - this.min);
  }
  _getLabelSize(t) {
    const n = this.options.ticks, i = this.ctx.measureText(t).width, s = Ee(this.isHorizontal() ? n.maxRotation : n.minRotation), r = Math.cos(s), o = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: i * r + l * o,
      h: i * o + l * r
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, i = n.displayFormats, s = i[n.unit] || i.millisecond, r = this._tickFormatFunction(t, 0, $f(this, [
      t
    ], this._majorUnit), s), o = this._getLabelSize(r), l = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
    return l > 0 ? l : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, i;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (n = 0, i = s.length; n < i; ++n)
      t = t.concat(s[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, i;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (n = 0, i = s.length; n < i; ++n)
      t.push(Wf(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return dp(t.sort(jf));
  }
}
O(io, "id", "time"), O(io, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function lr(e, t, n) {
  let i = 0, s = e.length - 1, r, o, l, a;
  n ? (t >= e[i].pos && t <= e[s].pos && ({ lo: i, hi: s } = _n(e, "pos", t)), { pos: r, time: l } = e[i], { pos: o, time: a } = e[s]) : (t >= e[i].time && t <= e[s].time && ({ lo: i, hi: s } = _n(e, "time", t)), { time: r, pos: l } = e[i], { time: o, pos: a } = e[s]);
  const u = o - r;
  return u ? l + (a - l) * (t - r) / u : l;
}
class Uf extends io {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = lr(n, this.min), this._tableRange = lr(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: i } = this, s = [], r = [];
    let o, l, a, u, c;
    for (o = 0, l = t.length; o < l; ++o)
      u = t[o], u >= n && u <= i && s.push(u);
    if (s.length < 2)
      return [
        {
          time: n,
          pos: 0
        },
        {
          time: i,
          pos: 1
        }
      ];
    for (o = 0, l = s.length; o < l; ++o)
      c = s[o + 1], a = s[o - 1], u = s[o], Math.round((c + a) / 2) !== u && r.push({
        time: u,
        pos: o / (l - 1)
      });
    return r;
  }
  _generate() {
    const t = this.min, n = this.max;
    let i = super.getDataTimestamps();
    return (!i.includes(t) || !i.length) && i.splice(0, 0, t), (!i.includes(n) || i.length === 1) && i.push(n), i.sort((s, r) => s - r);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), i = this.getLabelTimestamps();
    return n.length && i.length ? t = this.normalize(n.concat(i)) : t = n.length ? n : i, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (lr(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return lr(this._table, i * this._tableRange + this._minPos, !0);
  }
}
O(Uf, "id", "timeseries"), O(Uf, "defaults", io.defaults);
const Up = "label";
function Yf(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function A_(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Yp(e, t) {
  e.labels = t;
}
function Xp(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Up;
  const i = [];
  e.datasets = t.map((s) => {
    const r = e.datasets.find((o) => o[n] === s[n]);
    return !r || !s.data || i.includes(r) ? {
      ...s
    } : (i.push(r), Object.assign(r, s), r);
  });
}
function I_(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Up;
  const n = {
    labels: [],
    datasets: []
  };
  return Yp(n, e.labels), Xp(n, e.datasets, t), n;
}
function F_(e, t) {
  const { height: n = 150, width: i = 300, redraw: s = !1, datasetIdKey: r, type: o, data: l, options: a, plugins: u = [], fallbackContent: c, updateMode: f, ...d } = e, h = it.useRef(null), m = it.useRef(), y = () => {
    h.current && (m.current = new ku(h.current, {
      type: o,
      data: I_(l, r),
      options: a && {
        ...a
      },
      plugins: u
    }), Yf(t, m.current));
  }, _ = () => {
    Yf(t, null), m.current && (m.current.destroy(), m.current = null);
  };
  return it.useEffect(() => {
    !s && m.current && a && A_(m.current, a);
  }, [
    s,
    a
  ]), it.useEffect(() => {
    !s && m.current && Yp(m.current.config.data, l.labels);
  }, [
    s,
    l.labels
  ]), it.useEffect(() => {
    !s && m.current && l.datasets && Xp(m.current.config.data, l.datasets, r);
  }, [
    s,
    l.datasets
  ]), it.useEffect(() => {
    m.current && (s ? (_(), setTimeout(y)) : m.current.update(f));
  }, [
    s,
    a,
    l.labels,
    l.datasets,
    f
  ]), it.useEffect(() => {
    m.current && (_(), setTimeout(y));
  }, [
    o
  ]), it.useEffect(() => (y(), () => _()), []), /* @__PURE__ */ dg.createElement("canvas", Object.assign({
    ref: h,
    role: "img",
    height: n,
    width: i
  }, d), c);
}
const N_ = /* @__PURE__ */ it.forwardRef(F_);
function B_({ type: e, data: t, options: n = {} }) {
  return /* @__PURE__ */ it.createElement("div", { className: "chart-container" }, /* @__PURE__ */ it.createElement(N_, { type: e, data: t, options: n }));
}
ku.register(
  ua,
  ca,
  br,
  Fi,
  Mr,
  Ii,
  v_,
  C_,
  m_,
  wr,
  xr,
  sa,
  Qn
);
function j_() {
  const [e] = Ko("chart_type"), [t] = Ko("chart_data"), [n] = Ko("chart_options");
  return /* @__PURE__ */ it.createElement(
    B_,
    {
      type: e,
      data: t,
      options: n
    }
  );
}
const V_ = {
  render: x0(j_)
};
export {
  V_ as default
};
