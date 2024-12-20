var Ss = { exports: {} }, N = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lr = Symbol.for("react.element"), jc = Symbol.for("react.portal"), Uc = Symbol.for("react.fragment"), Bc = Symbol.for("react.strict_mode"), Gc = Symbol.for("react.profiler"), Wc = Symbol.for("react.provider"), Qc = Symbol.for("react.context"), Kc = Symbol.for("react.forward_ref"), Xc = Symbol.for("react.suspense"), Yc = Symbol.for("react.memo"), qc = Symbol.for("react.lazy"), uu = Symbol.iterator;
function Zc(e) {
  return e === null || typeof e != "object" ? null : (e = uu && e[uu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ws = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Cs = Object.assign, _s = {};
function fn(e, t, n) {
  this.props = e, this.context = t, this.refs = _s, this.updater = n || ws;
}
fn.prototype.isReactComponent = {};
fn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
fn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Rs() {
}
Rs.prototype = fn.prototype;
function ai(e, t, n) {
  this.props = e, this.context = t, this.refs = _s, this.updater = n || ws;
}
var ci = ai.prototype = new Rs();
ci.constructor = ai;
Cs(ci, fn.prototype);
ci.isPureReactComponent = !0;
var su = Array.isArray, ks = Object.prototype.hasOwnProperty, di = { current: null }, Es = { key: !0, ref: !0, __self: !0, __source: !0 };
function xs(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) ks.call(t, r) && !Es.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), a = 0; a < u; a++) s[a] = arguments[a + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: lr, type: e, key: o, ref: i, props: l, _owner: di.current };
}
function Jc(e, t) {
  return { $$typeof: lr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function fi(e) {
  return typeof e == "object" && e !== null && e.$$typeof === lr;
}
function bc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var au = /\/+/g;
function $l(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? bc("" + e.key) : t.toString(36);
}
function Ir(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else switch (o) {
    case "string":
    case "number":
      i = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case lr:
        case jc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + $l(i, 0) : r, su(l) ? (n = "", e != null && (n = e.replace(au, "$&/") + "/"), Ir(l, t, n, "", function(a) {
    return a;
  })) : l != null && (fi(l) && (l = Jc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(au, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", su(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var s = r + $l(o, u);
    i += Ir(o, t, n, s, l);
  }
  else if (s = Zc(e), typeof s == "function") for (e = s.call(e), u = 0; !(o = e.next()).done; ) o = o.value, s = r + $l(o, u++), i += Ir(o, t, n, s, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function dr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Ir(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function ed(e) {
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
var ce = { current: null }, $r = { transition: null }, td = { ReactCurrentDispatcher: ce, ReactCurrentBatchConfig: $r, ReactCurrentOwner: di };
function Ps() {
  throw Error("act(...) is not supported in production builds of React.");
}
N.Children = { map: dr, forEach: function(e, t, n) {
  dr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return dr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return dr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!fi(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
N.Component = fn;
N.Fragment = Uc;
N.Profiler = Gc;
N.PureComponent = ai;
N.StrictMode = Bc;
N.Suspense = Xc;
N.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = td;
N.act = Ps;
N.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Cs({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = di.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in t) ks.call(t, s) && !Es.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var a = 0; a < s; a++) u[a] = arguments[a + 2];
    r.children = u;
  }
  return { $$typeof: lr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
N.createContext = function(e) {
  return e = { $$typeof: Qc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Wc, _context: e }, e.Consumer = e;
};
N.createElement = xs;
N.createFactory = function(e) {
  var t = xs.bind(null, e);
  return t.type = e, t;
};
N.createRef = function() {
  return { current: null };
};
N.forwardRef = function(e) {
  return { $$typeof: Kc, render: e };
};
N.isValidElement = fi;
N.lazy = function(e) {
  return { $$typeof: qc, _payload: { _status: -1, _result: e }, _init: ed };
};
N.memo = function(e, t) {
  return { $$typeof: Yc, type: e, compare: t === void 0 ? null : t };
};
N.startTransition = function(e) {
  var t = $r.transition;
  $r.transition = {};
  try {
    e();
  } finally {
    $r.transition = t;
  }
};
N.unstable_act = Ps;
N.useCallback = function(e, t) {
  return ce.current.useCallback(e, t);
};
N.useContext = function(e) {
  return ce.current.useContext(e);
};
N.useDebugValue = function() {
};
N.useDeferredValue = function(e) {
  return ce.current.useDeferredValue(e);
};
N.useEffect = function(e, t) {
  return ce.current.useEffect(e, t);
};
N.useId = function() {
  return ce.current.useId();
};
N.useImperativeHandle = function(e, t, n) {
  return ce.current.useImperativeHandle(e, t, n);
};
N.useInsertionEffect = function(e, t) {
  return ce.current.useInsertionEffect(e, t);
};
N.useLayoutEffect = function(e, t) {
  return ce.current.useLayoutEffect(e, t);
};
N.useMemo = function(e, t) {
  return ce.current.useMemo(e, t);
};
N.useReducer = function(e, t, n) {
  return ce.current.useReducer(e, t, n);
};
N.useRef = function(e) {
  return ce.current.useRef(e);
};
N.useState = function(e) {
  return ce.current.useState(e);
};
N.useSyncExternalStore = function(e, t, n) {
  return ce.current.useSyncExternalStore(e, t, n);
};
N.useTransition = function() {
  return ce.current.useTransition();
};
N.version = "18.3.1";
Ss.exports = N;
var $ = Ss.exports, Fs = { exports: {} }, Re = {}, Ms = { exports: {} }, zs = {};
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
  function t(k, z) {
    var I = k.length;
    k.push(z);
    e: for (; 0 < I; ) {
      var Q = I - 1 >>> 1, Z = k[Q];
      if (0 < l(Z, z)) k[Q] = z, k[I] = Z, I = Q;
      else break e;
    }
  }
  function n(k) {
    return k.length === 0 ? null : k[0];
  }
  function r(k) {
    if (k.length === 0) return null;
    var z = k[0], I = k.pop();
    if (I !== z) {
      k[0] = I;
      e: for (var Q = 0, Z = k.length, ar = Z >>> 1; Q < ar; ) {
        var Rt = 2 * (Q + 1) - 1, Il = k[Rt], kt = Rt + 1, cr = k[kt];
        if (0 > l(Il, I)) kt < Z && 0 > l(cr, Il) ? (k[Q] = cr, k[kt] = I, Q = kt) : (k[Q] = Il, k[Rt] = I, Q = Rt);
        else if (kt < Z && 0 > l(cr, I)) k[Q] = cr, k[kt] = I, Q = kt;
        else break e;
      }
    }
    return z;
  }
  function l(k, z) {
    var I = k.sortIndex - z.sortIndex;
    return I !== 0 ? I : k.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, u = i.now();
    e.unstable_now = function() {
      return i.now() - u;
    };
  }
  var s = [], a = [], p = 1, v = null, d = 3, g = !1, h = !1, y = !1, E = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(k) {
    for (var z = n(a); z !== null; ) {
      if (z.callback === null) r(a);
      else if (z.startTime <= k) r(a), z.sortIndex = z.expirationTime, t(s, z);
      else break;
      z = n(a);
    }
  }
  function S(k) {
    if (y = !1, m(k), !h) if (n(s) !== null) h = !0, Ml(C);
    else {
      var z = n(a);
      z !== null && zl(S, z.startTime - k);
    }
  }
  function C(k, z) {
    h = !1, y && (y = !1, f(P), P = -1), g = !0;
    var I = d;
    try {
      for (m(z), v = n(s); v !== null && (!(v.expirationTime > z) || k && !fe()); ) {
        var Q = v.callback;
        if (typeof Q == "function") {
          v.callback = null, d = v.priorityLevel;
          var Z = Q(v.expirationTime <= z);
          z = e.unstable_now(), typeof Z == "function" ? v.callback = Z : v === n(s) && r(s), m(z);
        } else r(s);
        v = n(s);
      }
      if (v !== null) var ar = !0;
      else {
        var Rt = n(a);
        Rt !== null && zl(S, Rt.startTime - z), ar = !1;
      }
      return ar;
    } finally {
      v = null, d = I, g = !1;
    }
  }
  var R = !1, x = null, P = -1, j = 5, L = -1;
  function fe() {
    return !(e.unstable_now() - L < j);
  }
  function mn() {
    if (x !== null) {
      var k = e.unstable_now();
      L = k;
      var z = !0;
      try {
        z = x(!0, k);
      } finally {
        z ? vn() : (R = !1, x = null);
      }
    } else R = !1;
  }
  var vn;
  if (typeof c == "function") vn = function() {
    c(mn);
  };
  else if (typeof MessageChannel < "u") {
    var iu = new MessageChannel(), Hc = iu.port2;
    iu.port1.onmessage = mn, vn = function() {
      Hc.postMessage(null);
    };
  } else vn = function() {
    E(mn, 0);
  };
  function Ml(k) {
    x = k, R || (R = !0, vn());
  }
  function zl(k, z) {
    P = E(function() {
      k(e.unstable_now());
    }, z);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(k) {
    k.callback = null;
  }, e.unstable_continueExecution = function() {
    h || g || (h = !0, Ml(C));
  }, e.unstable_forceFrameRate = function(k) {
    0 > k || 125 < k ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < k ? Math.floor(1e3 / k) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(k) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var z = 3;
        break;
      default:
        z = d;
    }
    var I = d;
    d = z;
    try {
      return k();
    } finally {
      d = I;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(k, z) {
    switch (k) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        k = 3;
    }
    var I = d;
    d = k;
    try {
      return z();
    } finally {
      d = I;
    }
  }, e.unstable_scheduleCallback = function(k, z, I) {
    var Q = e.unstable_now();
    switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? Q + I : Q) : I = Q, k) {
      case 1:
        var Z = -1;
        break;
      case 2:
        Z = 250;
        break;
      case 5:
        Z = 1073741823;
        break;
      case 4:
        Z = 1e4;
        break;
      default:
        Z = 5e3;
    }
    return Z = I + Z, k = { id: p++, callback: z, priorityLevel: k, startTime: I, expirationTime: Z, sortIndex: -1 }, I > Q ? (k.sortIndex = I, t(a, k), n(s) === null && k === n(a) && (y ? (f(P), P = -1) : y = !0, zl(S, I - Q))) : (k.sortIndex = Z, t(s, k), h || g || (h = !0, Ml(C))), k;
  }, e.unstable_shouldYield = fe, e.unstable_wrapCallback = function(k) {
    var z = d;
    return function() {
      var I = d;
      d = z;
      try {
        return k.apply(this, arguments);
      } finally {
        d = I;
      }
    };
  };
})(zs);
Ms.exports = zs;
var nd = Ms.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rd = $, Ce = nd;
function w(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Is = /* @__PURE__ */ new Set(), jn = {};
function Tt(e, t) {
  ln(e, t), ln(e + "Capture", t);
}
function ln(e, t) {
  for (jn[e] = t, e = 0; e < t.length; e++) Is.add(t[e]);
}
var qe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), fo = Object.prototype.hasOwnProperty, ld = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, cu = {}, du = {};
function od(e) {
  return fo.call(du, e) ? !0 : fo.call(cu, e) ? !1 : ld.test(e) ? du[e] = !0 : (cu[e] = !0, !1);
}
function id(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function ud(e, t, n, r) {
  if (t === null || typeof t > "u" || id(e, t, n, r)) return !0;
  if (r) return !1;
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
function de(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ne[e] = new de(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ne[t] = new de(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ne[e] = new de(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ne[e] = new de(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ne[e] = new de(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ne[e] = new de(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ne[e] = new de(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ne[e] = new de(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ne[e] = new de(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var pi = /[\-:]([a-z])/g;
function gi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    pi,
    gi
  );
  ne[t] = new de(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(pi, gi);
  ne[t] = new de(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(pi, gi);
  ne[t] = new de(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ne[e] = new de(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new de("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ne[e] = new de(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function mi(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (ud(t, n, l, r) && (n = null), r || l === null ? od(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var et = rd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, fr = Symbol.for("react.element"), Ht = Symbol.for("react.portal"), jt = Symbol.for("react.fragment"), vi = Symbol.for("react.strict_mode"), po = Symbol.for("react.profiler"), $s = Symbol.for("react.provider"), Ls = Symbol.for("react.context"), hi = Symbol.for("react.forward_ref"), go = Symbol.for("react.suspense"), mo = Symbol.for("react.suspense_list"), yi = Symbol.for("react.memo"), nt = Symbol.for("react.lazy"), Ns = Symbol.for("react.offscreen"), fu = Symbol.iterator;
function hn(e) {
  return e === null || typeof e != "object" ? null : (e = fu && e[fu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, Ll;
function Pn(e) {
  if (Ll === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ll = t && t[1] || "";
  }
  return `
` + Ll + e;
}
var Nl = !1;
function Vl(e, t) {
  if (!e || Nl) return "";
  Nl = !0;
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
      } catch (a) {
        var r = a;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (a) {
        r = a;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (var l = a.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, u = o.length - 1; 1 <= i && 0 <= u && l[i] !== o[u]; ) u--;
      for (; 1 <= i && 0 <= u; i--, u--) if (l[i] !== o[u]) {
        if (i !== 1 || u !== 1)
          do
            if (i--, u--, 0 > u || l[i] !== o[u]) {
              var s = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= i && 0 <= u);
        break;
      }
    }
  } finally {
    Nl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Pn(e) : "";
}
function sd(e) {
  switch (e.tag) {
    case 5:
      return Pn(e.type);
    case 16:
      return Pn("Lazy");
    case 13:
      return Pn("Suspense");
    case 19:
      return Pn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Vl(e.type, !1), e;
    case 11:
      return e = Vl(e.type.render, !1), e;
    case 1:
      return e = Vl(e.type, !0), e;
    default:
      return "";
  }
}
function vo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case jt:
      return "Fragment";
    case Ht:
      return "Portal";
    case po:
      return "Profiler";
    case vi:
      return "StrictMode";
    case go:
      return "Suspense";
    case mo:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ls:
      return (e.displayName || "Context") + ".Consumer";
    case $s:
      return (e._context.displayName || "Context") + ".Provider";
    case hi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case yi:
      return t = e.displayName || null, t !== null ? t : vo(e.type) || "Memo";
    case nt:
      t = e._payload, e = e._init;
      try {
        return vo(e(t));
      } catch {
      }
  }
  return null;
}
function ad(e) {
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
      return vo(t);
    case 8:
      return t === vi ? "StrictMode" : "Mode";
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
function ht(e) {
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
function Vs(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function cd(e) {
  var t = Vs(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(i) {
      r = "" + i, o.call(this, i);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(i) {
      r = "" + i;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function pr(e) {
  e._valueTracker || (e._valueTracker = cd(e));
}
function Ds(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Vs(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Br(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ho(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function pu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ht(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ts(e, t) {
  t = t.checked, t != null && mi(e, "checked", t, !1);
}
function yo(e, t) {
  Ts(e, t);
  var n = ht(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? So(e, t.type, n) : t.hasOwnProperty("defaultValue") && So(e, t.type, ht(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function gu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function So(e, t, n) {
  (t !== "number" || Br(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Fn = Array.isArray;
function Jt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + ht(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function wo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(w(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function mu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(w(92));
      if (Fn(n)) {
        if (1 < n.length) throw Error(w(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ht(n) };
}
function Os(e, t) {
  var n = ht(t.value), r = ht(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function vu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function As(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Co(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? As(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var gr, Hs = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (gr = gr || document.createElement("div"), gr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = gr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Un(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var In = {
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
}, dd = ["Webkit", "ms", "Moz", "O"];
Object.keys(In).forEach(function(e) {
  dd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), In[t] = In[e];
  });
});
function js(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || In.hasOwnProperty(e) && In[e] ? ("" + t).trim() : t + "px";
}
function Us(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = js(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var fd = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function _o(e, t) {
  if (t) {
    if (fd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(w(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(w(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(w(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(w(62));
  }
}
function Ro(e, t) {
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
var ko = null;
function Si(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Eo = null, bt = null, en = null;
function hu(e) {
  if (e = ur(e)) {
    if (typeof Eo != "function") throw Error(w(280));
    var t = e.stateNode;
    t && (t = hl(t), Eo(e.stateNode, e.type, t));
  }
}
function Bs(e) {
  bt ? en ? en.push(e) : en = [e] : bt = e;
}
function Gs() {
  if (bt) {
    var e = bt, t = en;
    if (en = bt = null, hu(e), t) for (e = 0; e < t.length; e++) hu(t[e]);
  }
}
function Ws(e, t) {
  return e(t);
}
function Qs() {
}
var Dl = !1;
function Ks(e, t, n) {
  if (Dl) return e(t, n);
  Dl = !0;
  try {
    return Ws(e, t, n);
  } finally {
    Dl = !1, (bt !== null || en !== null) && (Qs(), Gs());
  }
}
function Bn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = hl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
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
  if (n && typeof n != "function") throw Error(w(231, t, typeof n));
  return n;
}
var xo = !1;
if (qe) try {
  var yn = {};
  Object.defineProperty(yn, "passive", { get: function() {
    xo = !0;
  } }), window.addEventListener("test", yn, yn), window.removeEventListener("test", yn, yn);
} catch {
  xo = !1;
}
function pd(e, t, n, r, l, o, i, u, s) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (p) {
    this.onError(p);
  }
}
var $n = !1, Gr = null, Wr = !1, Po = null, gd = { onError: function(e) {
  $n = !0, Gr = e;
} };
function md(e, t, n, r, l, o, i, u, s) {
  $n = !1, Gr = null, pd.apply(gd, arguments);
}
function vd(e, t, n, r, l, o, i, u, s) {
  if (md.apply(this, arguments), $n) {
    if ($n) {
      var a = Gr;
      $n = !1, Gr = null;
    } else throw Error(w(198));
    Wr || (Wr = !0, Po = a);
  }
}
function Ot(e) {
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
function Xs(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function yu(e) {
  if (Ot(e) !== e) throw Error(w(188));
}
function hd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ot(e), t === null) throw Error(w(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return yu(l), e;
        if (o === r) return yu(l), t;
        o = o.sibling;
      }
      throw Error(w(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var i = !1, u = l.child; u; ) {
        if (u === n) {
          i = !0, n = l, r = o;
          break;
        }
        if (u === r) {
          i = !0, r = l, n = o;
          break;
        }
        u = u.sibling;
      }
      if (!i) {
        for (u = o.child; u; ) {
          if (u === n) {
            i = !0, n = o, r = l;
            break;
          }
          if (u === r) {
            i = !0, r = o, n = l;
            break;
          }
          u = u.sibling;
        }
        if (!i) throw Error(w(189));
      }
    }
    if (n.alternate !== r) throw Error(w(190));
  }
  if (n.tag !== 3) throw Error(w(188));
  return n.stateNode.current === n ? e : t;
}
function Ys(e) {
  return e = hd(e), e !== null ? qs(e) : null;
}
function qs(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = qs(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Zs = Ce.unstable_scheduleCallback, Su = Ce.unstable_cancelCallback, yd = Ce.unstable_shouldYield, Sd = Ce.unstable_requestPaint, K = Ce.unstable_now, wd = Ce.unstable_getCurrentPriorityLevel, wi = Ce.unstable_ImmediatePriority, Js = Ce.unstable_UserBlockingPriority, Qr = Ce.unstable_NormalPriority, Cd = Ce.unstable_LowPriority, bs = Ce.unstable_IdlePriority, pl = null, Ue = null;
function _d(e) {
  if (Ue && typeof Ue.onCommitFiberRoot == "function") try {
    Ue.onCommitFiberRoot(pl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ve = Math.clz32 ? Math.clz32 : Ed, Rd = Math.log, kd = Math.LN2;
function Ed(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Rd(e) / kd | 0) | 0;
}
var mr = 64, vr = 4194304;
function Mn(e) {
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
function Kr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = Mn(u) : (o &= i, o !== 0 && (r = Mn(o)));
  } else i = n & ~l, i !== 0 ? r = Mn(i) : o !== 0 && (r = Mn(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ve(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function xd(e, t) {
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
function Pd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Ve(o), u = 1 << i, s = l[i];
    s === -1 ? (!(u & n) || u & r) && (l[i] = xd(u, t)) : s <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function Fo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function ea() {
  var e = mr;
  return mr <<= 1, !(mr & 4194240) && (mr = 64), e;
}
function Tl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function or(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ve(t), e[t] = n;
}
function Fd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ve(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Ci(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ve(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var D = 0;
function ta(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var na, _i, ra, la, oa, Mo = !1, hr = [], at = null, ct = null, dt = null, Gn = /* @__PURE__ */ new Map(), Wn = /* @__PURE__ */ new Map(), lt = [], Md = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function wu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      at = null;
      break;
    case "dragenter":
    case "dragleave":
      ct = null;
      break;
    case "mouseover":
    case "mouseout":
      dt = null;
      break;
    case "pointerover":
    case "pointerout":
      Gn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Wn.delete(t.pointerId);
  }
}
function Sn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = ur(t), t !== null && _i(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function zd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return at = Sn(at, e, t, n, r, l), !0;
    case "dragenter":
      return ct = Sn(ct, e, t, n, r, l), !0;
    case "mouseover":
      return dt = Sn(dt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Gn.set(o, Sn(Gn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Wn.set(o, Sn(Wn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function ia(e) {
  var t = Pt(e.target);
  if (t !== null) {
    var n = Ot(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Xs(n), t !== null) {
          e.blockedOn = t, oa(e.priority, function() {
            ra(n);
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
function Lr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = zo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ko = r, n.target.dispatchEvent(r), ko = null;
    } else return t = ur(n), t !== null && _i(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Cu(e, t, n) {
  Lr(e) && n.delete(t);
}
function Id() {
  Mo = !1, at !== null && Lr(at) && (at = null), ct !== null && Lr(ct) && (ct = null), dt !== null && Lr(dt) && (dt = null), Gn.forEach(Cu), Wn.forEach(Cu);
}
function wn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Mo || (Mo = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, Id)));
}
function Qn(e) {
  function t(l) {
    return wn(l, e);
  }
  if (0 < hr.length) {
    wn(hr[0], e);
    for (var n = 1; n < hr.length; n++) {
      var r = hr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (at !== null && wn(at, e), ct !== null && wn(ct, e), dt !== null && wn(dt, e), Gn.forEach(t), Wn.forEach(t), n = 0; n < lt.length; n++) r = lt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lt.length && (n = lt[0], n.blockedOn === null); ) ia(n), n.blockedOn === null && lt.shift();
}
var tn = et.ReactCurrentBatchConfig, Xr = !0;
function $d(e, t, n, r) {
  var l = D, o = tn.transition;
  tn.transition = null;
  try {
    D = 1, Ri(e, t, n, r);
  } finally {
    D = l, tn.transition = o;
  }
}
function Ld(e, t, n, r) {
  var l = D, o = tn.transition;
  tn.transition = null;
  try {
    D = 4, Ri(e, t, n, r);
  } finally {
    D = l, tn.transition = o;
  }
}
function Ri(e, t, n, r) {
  if (Xr) {
    var l = zo(e, t, n, r);
    if (l === null) Kl(e, t, r, Yr, n), wu(e, r);
    else if (zd(l, e, t, n, r)) r.stopPropagation();
    else if (wu(e, r), t & 4 && -1 < Md.indexOf(e)) {
      for (; l !== null; ) {
        var o = ur(l);
        if (o !== null && na(o), o = zo(e, t, n, r), o === null && Kl(e, t, r, Yr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Kl(e, t, r, null, n);
  }
}
var Yr = null;
function zo(e, t, n, r) {
  if (Yr = null, e = Si(r), e = Pt(e), e !== null) if (t = Ot(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Xs(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Yr = e, null;
}
function ua(e) {
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
      switch (wd()) {
        case wi:
          return 1;
        case Js:
          return 4;
        case Qr:
        case Cd:
          return 16;
        case bs:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var it = null, ki = null, Nr = null;
function sa() {
  if (Nr) return Nr;
  var e, t = ki, n = t.length, r, l = "value" in it ? it.value : it.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Nr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Vr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function yr() {
  return !0;
}
function _u() {
  return !1;
}
function ke(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? yr : _u, this.isPropagationStopped = _u, this;
  }
  return G(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = yr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = yr);
  }, persist: function() {
  }, isPersistent: yr }), t;
}
var pn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ei = ke(pn), ir = G({}, pn, { view: 0, detail: 0 }), Nd = ke(ir), Ol, Al, Cn, gl = G({}, ir, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: xi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Ol = e.screenX - Cn.screenX, Al = e.screenY - Cn.screenY) : Al = Ol = 0, Cn = e), Ol);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Al;
} }), Ru = ke(gl), Vd = G({}, gl, { dataTransfer: 0 }), Dd = ke(Vd), Td = G({}, ir, { relatedTarget: 0 }), Hl = ke(Td), Od = G({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Ad = ke(Od), Hd = G({}, pn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), jd = ke(Hd), Ud = G({}, pn, { data: 0 }), ku = ke(Ud), Bd = {
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
}, Gd = {
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
}, Wd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Qd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Wd[e]) ? !!t[e] : !1;
}
function xi() {
  return Qd;
}
var Kd = G({}, ir, { key: function(e) {
  if (e.key) {
    var t = Bd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Vr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Gd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: xi, charCode: function(e) {
  return e.type === "keypress" ? Vr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Vr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Xd = ke(Kd), Yd = G({}, gl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Eu = ke(Yd), qd = G({}, ir, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: xi }), Zd = ke(qd), Jd = G({}, pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), bd = ke(Jd), ef = G({}, gl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), tf = ke(ef), nf = [9, 13, 27, 32], Pi = qe && "CompositionEvent" in window, Ln = null;
qe && "documentMode" in document && (Ln = document.documentMode);
var rf = qe && "TextEvent" in window && !Ln, aa = qe && (!Pi || Ln && 8 < Ln && 11 >= Ln), xu = " ", Pu = !1;
function ca(e, t) {
  switch (e) {
    case "keyup":
      return nf.indexOf(t.keyCode) !== -1;
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
function da(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Ut = !1;
function lf(e, t) {
  switch (e) {
    case "compositionend":
      return da(t);
    case "keypress":
      return t.which !== 32 ? null : (Pu = !0, xu);
    case "textInput":
      return e = t.data, e === xu && Pu ? null : e;
    default:
      return null;
  }
}
function of(e, t) {
  if (Ut) return e === "compositionend" || !Pi && ca(e, t) ? (e = sa(), Nr = ki = it = null, Ut = !1, e) : null;
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
      return aa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var uf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Fu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!uf[e.type] : t === "textarea";
}
function fa(e, t, n, r) {
  Bs(r), t = qr(t, "onChange"), 0 < t.length && (n = new Ei("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Nn = null, Kn = null;
function sf(e) {
  Ra(e, 0);
}
function ml(e) {
  var t = Wt(e);
  if (Ds(t)) return e;
}
function af(e, t) {
  if (e === "change") return t;
}
var pa = !1;
if (qe) {
  var jl;
  if (qe) {
    var Ul = "oninput" in document;
    if (!Ul) {
      var Mu = document.createElement("div");
      Mu.setAttribute("oninput", "return;"), Ul = typeof Mu.oninput == "function";
    }
    jl = Ul;
  } else jl = !1;
  pa = jl && (!document.documentMode || 9 < document.documentMode);
}
function zu() {
  Nn && (Nn.detachEvent("onpropertychange", ga), Kn = Nn = null);
}
function ga(e) {
  if (e.propertyName === "value" && ml(Kn)) {
    var t = [];
    fa(t, Kn, e, Si(e)), Ks(sf, t);
  }
}
function cf(e, t, n) {
  e === "focusin" ? (zu(), Nn = t, Kn = n, Nn.attachEvent("onpropertychange", ga)) : e === "focusout" && zu();
}
function df(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return ml(Kn);
}
function ff(e, t) {
  if (e === "click") return ml(t);
}
function pf(e, t) {
  if (e === "input" || e === "change") return ml(t);
}
function gf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Oe = typeof Object.is == "function" ? Object.is : gf;
function Xn(e, t) {
  if (Oe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!fo.call(t, l) || !Oe(e[l], t[l])) return !1;
  }
  return !0;
}
function Iu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function $u(e, t) {
  var n = Iu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
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
    n = Iu(n);
  }
}
function ma(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ma(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function va() {
  for (var e = window, t = Br(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Br(e.document);
  }
  return t;
}
function Fi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function mf(e) {
  var t = va(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ma(n.ownerDocument.documentElement, n)) {
    if (r !== null && Fi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = $u(n, o);
        var i = $u(
          n,
          r
        );
        l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var vf = qe && "documentMode" in document && 11 >= document.documentMode, Bt = null, Io = null, Vn = null, $o = !1;
function Lu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  $o || Bt == null || Bt !== Br(r) || (r = Bt, "selectionStart" in r && Fi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Vn && Xn(Vn, r) || (Vn = r, r = qr(Io, "onSelect"), 0 < r.length && (t = new Ei("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Bt)));
}
function Sr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Gt = { animationend: Sr("Animation", "AnimationEnd"), animationiteration: Sr("Animation", "AnimationIteration"), animationstart: Sr("Animation", "AnimationStart"), transitionend: Sr("Transition", "TransitionEnd") }, Bl = {}, ha = {};
qe && (ha = document.createElement("div").style, "AnimationEvent" in window || (delete Gt.animationend.animation, delete Gt.animationiteration.animation, delete Gt.animationstart.animation), "TransitionEvent" in window || delete Gt.transitionend.transition);
function vl(e) {
  if (Bl[e]) return Bl[e];
  if (!Gt[e]) return e;
  var t = Gt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ha) return Bl[e] = t[n];
  return e;
}
var ya = vl("animationend"), Sa = vl("animationiteration"), wa = vl("animationstart"), Ca = vl("transitionend"), _a = /* @__PURE__ */ new Map(), Nu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function wt(e, t) {
  _a.set(e, t), Tt(t, [e]);
}
for (var Gl = 0; Gl < Nu.length; Gl++) {
  var Wl = Nu[Gl], hf = Wl.toLowerCase(), yf = Wl[0].toUpperCase() + Wl.slice(1);
  wt(hf, "on" + yf);
}
wt(ya, "onAnimationEnd");
wt(Sa, "onAnimationIteration");
wt(wa, "onAnimationStart");
wt("dblclick", "onDoubleClick");
wt("focusin", "onFocus");
wt("focusout", "onBlur");
wt(Ca, "onTransitionEnd");
ln("onMouseEnter", ["mouseout", "mouseover"]);
ln("onMouseLeave", ["mouseout", "mouseover"]);
ln("onPointerEnter", ["pointerout", "pointerover"]);
ln("onPointerLeave", ["pointerout", "pointerover"]);
Tt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Tt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Tt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Tt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Tt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Tt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var zn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Sf = new Set("cancel close invalid load scroll toggle".split(" ").concat(zn));
function Vu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, vd(r, t, void 0, e), e.currentTarget = null;
}
function Ra(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], s = u.instance, a = u.currentTarget;
        if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Vu(l, u, a), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], s = u.instance, a = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Vu(l, u, a), o = s;
      }
    }
  }
  if (Wr) throw e = Po, Wr = !1, Po = null, e;
}
function O(e, t) {
  var n = t[To];
  n === void 0 && (n = t[To] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (ka(t, e, 2, !1), n.add(r));
}
function Ql(e, t, n) {
  var r = 0;
  t && (r |= 4), ka(n, e, r, t);
}
var wr = "_reactListening" + Math.random().toString(36).slice(2);
function Yn(e) {
  if (!e[wr]) {
    e[wr] = !0, Is.forEach(function(n) {
      n !== "selectionchange" && (Sf.has(n) || Ql(n, !1, e), Ql(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[wr] || (t[wr] = !0, Ql("selectionchange", !1, t));
  }
}
function ka(e, t, n, r) {
  switch (ua(t)) {
    case 1:
      var l = $d;
      break;
    case 4:
      l = Ld;
      break;
    default:
      l = Ri;
  }
  n = l.bind(null, t, n, e), l = void 0, !xo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Kl(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var u = r.stateNode.containerInfo;
      if (u === l || u.nodeType === 8 && u.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var s = i.tag;
        if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        i = i.return;
      }
      for (; u !== null; ) {
        if (i = Pt(u), i === null) return;
        if (s = i.tag, s === 5 || s === 6) {
          r = o = i;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  Ks(function() {
    var a = o, p = Si(n), v = [];
    e: {
      var d = _a.get(e);
      if (d !== void 0) {
        var g = Ei, h = e;
        switch (e) {
          case "keypress":
            if (Vr(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = Xd;
            break;
          case "focusin":
            h = "focus", g = Hl;
            break;
          case "focusout":
            h = "blur", g = Hl;
            break;
          case "beforeblur":
          case "afterblur":
            g = Hl;
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
            g = Ru;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Zd;
            break;
          case ya:
          case Sa:
          case wa:
            g = Ad;
            break;
          case Ca:
            g = bd;
            break;
          case "scroll":
            g = Nd;
            break;
          case "wheel":
            g = tf;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Eu;
        }
        var y = (t & 4) !== 0, E = !y && e === "scroll", f = y ? d !== null ? d + "Capture" : null : d;
        y = [];
        for (var c = a, m; c !== null; ) {
          m = c;
          var S = m.stateNode;
          if (m.tag === 5 && S !== null && (m = S, f !== null && (S = Bn(c, f), S != null && y.push(qn(c, S, m)))), E) break;
          c = c.return;
        }
        0 < y.length && (d = new g(d, h, null, n, p), v.push({ event: d, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", d && n !== ko && (h = n.relatedTarget || n.fromElement) && (Pt(h) || h[Ze])) break e;
        if ((g || d) && (d = p.window === p ? p : (d = p.ownerDocument) ? d.defaultView || d.parentWindow : window, g ? (h = n.relatedTarget || n.toElement, g = a, h = h ? Pt(h) : null, h !== null && (E = Ot(h), h !== E || h.tag !== 5 && h.tag !== 6) && (h = null)) : (g = null, h = a), g !== h)) {
          if (y = Ru, S = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (y = Eu, S = "onPointerLeave", f = "onPointerEnter", c = "pointer"), E = g == null ? d : Wt(g), m = h == null ? d : Wt(h), d = new y(S, c + "leave", g, n, p), d.target = E, d.relatedTarget = m, S = null, Pt(p) === a && (y = new y(f, c + "enter", h, n, p), y.target = m, y.relatedTarget = E, S = y), E = S, g && h) t: {
            for (y = g, f = h, c = 0, m = y; m; m = At(m)) c++;
            for (m = 0, S = f; S; S = At(S)) m++;
            for (; 0 < c - m; ) y = At(y), c--;
            for (; 0 < m - c; ) f = At(f), m--;
            for (; c--; ) {
              if (y === f || f !== null && y === f.alternate) break t;
              y = At(y), f = At(f);
            }
            y = null;
          }
          else y = null;
          g !== null && Du(v, d, g, y, !1), h !== null && E !== null && Du(v, E, h, y, !0);
        }
      }
      e: {
        if (d = a ? Wt(a) : window, g = d.nodeName && d.nodeName.toLowerCase(), g === "select" || g === "input" && d.type === "file") var C = af;
        else if (Fu(d)) if (pa) C = pf;
        else {
          C = df;
          var R = cf;
        }
        else (g = d.nodeName) && g.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (C = ff);
        if (C && (C = C(e, a))) {
          fa(v, C, n, p);
          break e;
        }
        R && R(e, d, a), e === "focusout" && (R = d._wrapperState) && R.controlled && d.type === "number" && So(d, "number", d.value);
      }
      switch (R = a ? Wt(a) : window, e) {
        case "focusin":
          (Fu(R) || R.contentEditable === "true") && (Bt = R, Io = a, Vn = null);
          break;
        case "focusout":
          Vn = Io = Bt = null;
          break;
        case "mousedown":
          $o = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          $o = !1, Lu(v, n, p);
          break;
        case "selectionchange":
          if (vf) break;
        case "keydown":
        case "keyup":
          Lu(v, n, p);
      }
      var x;
      if (Pi) e: {
        switch (e) {
          case "compositionstart":
            var P = "onCompositionStart";
            break e;
          case "compositionend":
            P = "onCompositionEnd";
            break e;
          case "compositionupdate":
            P = "onCompositionUpdate";
            break e;
        }
        P = void 0;
      }
      else Ut ? ca(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (aa && n.locale !== "ko" && (Ut || P !== "onCompositionStart" ? P === "onCompositionEnd" && Ut && (x = sa()) : (it = p, ki = "value" in it ? it.value : it.textContent, Ut = !0)), R = qr(a, P), 0 < R.length && (P = new ku(P, e, null, n, p), v.push({ event: P, listeners: R }), x ? P.data = x : (x = da(n), x !== null && (P.data = x)))), (x = rf ? lf(e, n) : of(e, n)) && (a = qr(a, "onBeforeInput"), 0 < a.length && (p = new ku("onBeforeInput", "beforeinput", null, n, p), v.push({ event: p, listeners: a }), p.data = x));
    }
    Ra(v, t);
  });
}
function qn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function qr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Bn(e, n), o != null && r.unshift(qn(e, o, l)), o = Bn(e, t), o != null && r.push(qn(e, o, l))), e = e.return;
  }
  return r;
}
function At(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Du(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, a = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && a !== null && (u = a, l ? (s = Bn(n, o), s != null && i.unshift(qn(n, s, u))) : l || (s = Bn(n, o), s != null && i.push(qn(n, s, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var wf = /\r\n?/g, Cf = /\u0000|\uFFFD/g;
function Tu(e) {
  return (typeof e == "string" ? e : "" + e).replace(wf, `
`).replace(Cf, "");
}
function Cr(e, t, n) {
  if (t = Tu(t), Tu(e) !== t && n) throw Error(w(425));
}
function Zr() {
}
var Lo = null, No = null;
function Vo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Do = typeof setTimeout == "function" ? setTimeout : void 0, _f = typeof clearTimeout == "function" ? clearTimeout : void 0, Ou = typeof Promise == "function" ? Promise : void 0, Rf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ou < "u" ? function(e) {
  return Ou.resolve(null).then(e).catch(kf);
} : Do;
function kf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Xl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Qn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Qn(t);
}
function ft(e) {
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
function Au(e) {
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
var gn = Math.random().toString(36).slice(2), je = "__reactFiber$" + gn, Zn = "__reactProps$" + gn, Ze = "__reactContainer$" + gn, To = "__reactEvents$" + gn, Ef = "__reactListeners$" + gn, xf = "__reactHandles$" + gn;
function Pt(e) {
  var t = e[je];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ze] || n[je]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Au(e); e !== null; ) {
        if (n = e[je]) return n;
        e = Au(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ur(e) {
  return e = e[je] || e[Ze], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Wt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(w(33));
}
function hl(e) {
  return e[Zn] || null;
}
var Oo = [], Qt = -1;
function Ct(e) {
  return { current: e };
}
function A(e) {
  0 > Qt || (e.current = Oo[Qt], Oo[Qt] = null, Qt--);
}
function T(e, t) {
  Qt++, Oo[Qt] = e.current, e.current = t;
}
var yt = {}, ue = Ct(yt), me = Ct(!1), $t = yt;
function on(e, t) {
  var n = e.type.contextTypes;
  if (!n) return yt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ve(e) {
  return e = e.childContextTypes, e != null;
}
function Jr() {
  A(me), A(ue);
}
function Hu(e, t, n) {
  if (ue.current !== yt) throw Error(w(168));
  T(ue, t), T(me, n);
}
function Ea(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(w(108, ad(e) || "Unknown", l));
  return G({}, n, r);
}
function br(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || yt, $t = ue.current, T(ue, e), T(me, me.current), !0;
}
function ju(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(w(169));
  n ? (e = Ea(e, t, $t), r.__reactInternalMemoizedMergedChildContext = e, A(me), A(ue), T(ue, e)) : A(me), T(me, n);
}
var Qe = null, yl = !1, Yl = !1;
function xa(e) {
  Qe === null ? Qe = [e] : Qe.push(e);
}
function Pf(e) {
  yl = !0, xa(e);
}
function _t() {
  if (!Yl && Qe !== null) {
    Yl = !0;
    var e = 0, t = D;
    try {
      var n = Qe;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Qe = null, yl = !1;
    } catch (l) {
      throw Qe !== null && (Qe = Qe.slice(e + 1)), Zs(wi, _t), l;
    } finally {
      D = t, Yl = !1;
    }
  }
  return null;
}
var Kt = [], Xt = 0, el = null, tl = 0, Ee = [], xe = 0, Lt = null, Ke = 1, Xe = "";
function Et(e, t) {
  Kt[Xt++] = tl, Kt[Xt++] = el, el = e, tl = t;
}
function Pa(e, t, n) {
  Ee[xe++] = Ke, Ee[xe++] = Xe, Ee[xe++] = Lt, Lt = e;
  var r = Ke;
  e = Xe;
  var l = 32 - Ve(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Ve(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Ke = 1 << 32 - Ve(t) + l | n << l | r, Xe = o + e;
  } else Ke = 1 << o | n << l | r, Xe = e;
}
function Mi(e) {
  e.return !== null && (Et(e, 1), Pa(e, 1, 0));
}
function zi(e) {
  for (; e === el; ) el = Kt[--Xt], Kt[Xt] = null, tl = Kt[--Xt], Kt[Xt] = null;
  for (; e === Lt; ) Lt = Ee[--xe], Ee[xe] = null, Xe = Ee[--xe], Ee[xe] = null, Ke = Ee[--xe], Ee[xe] = null;
}
var we = null, Se = null, H = !1, Ne = null;
function Fa(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Uu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, we = e, Se = ft(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, we = e, Se = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Lt !== null ? { id: Ke, overflow: Xe } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, we = e, Se = null, !0) : !1;
    default:
      return !1;
  }
}
function Ao(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ho(e) {
  if (H) {
    var t = Se;
    if (t) {
      var n = t;
      if (!Uu(e, t)) {
        if (Ao(e)) throw Error(w(418));
        t = ft(n.nextSibling);
        var r = we;
        t && Uu(e, t) ? Fa(r, n) : (e.flags = e.flags & -4097 | 2, H = !1, we = e);
      }
    } else {
      if (Ao(e)) throw Error(w(418));
      e.flags = e.flags & -4097 | 2, H = !1, we = e;
    }
  }
}
function Bu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  we = e;
}
function _r(e) {
  if (e !== we) return !1;
  if (!H) return Bu(e), H = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Vo(e.type, e.memoizedProps)), t && (t = Se)) {
    if (Ao(e)) throw Ma(), Error(w(418));
    for (; t; ) Fa(e, t), t = ft(t.nextSibling);
  }
  if (Bu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(w(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Se = ft(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Se = null;
    }
  } else Se = we ? ft(e.stateNode.nextSibling) : null;
  return !0;
}
function Ma() {
  for (var e = Se; e; ) e = ft(e.nextSibling);
}
function un() {
  Se = we = null, H = !1;
}
function Ii(e) {
  Ne === null ? Ne = [e] : Ne.push(e);
}
var Ff = et.ReactCurrentBatchConfig;
function _n(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(w(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(w(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(w(284));
    if (!n._owner) throw Error(w(290, e));
  }
  return e;
}
function Rr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(w(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Gu(e) {
  var t = e._init;
  return t(e._payload);
}
function za(e) {
  function t(f, c) {
    if (e) {
      var m = f.deletions;
      m === null ? (f.deletions = [c], f.flags |= 16) : m.push(c);
    }
  }
  function n(f, c) {
    if (!e) return null;
    for (; c !== null; ) t(f, c), c = c.sibling;
    return null;
  }
  function r(f, c) {
    for (f = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? f.set(c.key, c) : f.set(c.index, c), c = c.sibling;
    return f;
  }
  function l(f, c) {
    return f = vt(f, c), f.index = 0, f.sibling = null, f;
  }
  function o(f, c, m) {
    return f.index = m, e ? (m = f.alternate, m !== null ? (m = m.index, m < c ? (f.flags |= 2, c) : m) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, c, m, S) {
    return c === null || c.tag !== 6 ? (c = no(m, f.mode, S), c.return = f, c) : (c = l(c, m), c.return = f, c);
  }
  function s(f, c, m, S) {
    var C = m.type;
    return C === jt ? p(f, c, m.props.children, S, m.key) : c !== null && (c.elementType === C || typeof C == "object" && C !== null && C.$$typeof === nt && Gu(C) === c.type) ? (S = l(c, m.props), S.ref = _n(f, c, m), S.return = f, S) : (S = Ur(m.type, m.key, m.props, null, f.mode, S), S.ref = _n(f, c, m), S.return = f, S);
  }
  function a(f, c, m, S) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== m.containerInfo || c.stateNode.implementation !== m.implementation ? (c = ro(m, f.mode, S), c.return = f, c) : (c = l(c, m.children || []), c.return = f, c);
  }
  function p(f, c, m, S, C) {
    return c === null || c.tag !== 7 ? (c = It(m, f.mode, S, C), c.return = f, c) : (c = l(c, m), c.return = f, c);
  }
  function v(f, c, m) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = no("" + c, f.mode, m), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case fr:
          return m = Ur(c.type, c.key, c.props, null, f.mode, m), m.ref = _n(f, null, c), m.return = f, m;
        case Ht:
          return c = ro(c, f.mode, m), c.return = f, c;
        case nt:
          var S = c._init;
          return v(f, S(c._payload), m);
      }
      if (Fn(c) || hn(c)) return c = It(c, f.mode, m, null), c.return = f, c;
      Rr(f, c);
    }
    return null;
  }
  function d(f, c, m, S) {
    var C = c !== null ? c.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number") return C !== null ? null : u(f, c, "" + m, S);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case fr:
          return m.key === C ? s(f, c, m, S) : null;
        case Ht:
          return m.key === C ? a(f, c, m, S) : null;
        case nt:
          return C = m._init, d(
            f,
            c,
            C(m._payload),
            S
          );
      }
      if (Fn(m) || hn(m)) return C !== null ? null : p(f, c, m, S, null);
      Rr(f, m);
    }
    return null;
  }
  function g(f, c, m, S, C) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return f = f.get(m) || null, u(c, f, "" + S, C);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case fr:
          return f = f.get(S.key === null ? m : S.key) || null, s(c, f, S, C);
        case Ht:
          return f = f.get(S.key === null ? m : S.key) || null, a(c, f, S, C);
        case nt:
          var R = S._init;
          return g(f, c, m, R(S._payload), C);
      }
      if (Fn(S) || hn(S)) return f = f.get(m) || null, p(c, f, S, C, null);
      Rr(c, S);
    }
    return null;
  }
  function h(f, c, m, S) {
    for (var C = null, R = null, x = c, P = c = 0, j = null; x !== null && P < m.length; P++) {
      x.index > P ? (j = x, x = null) : j = x.sibling;
      var L = d(f, x, m[P], S);
      if (L === null) {
        x === null && (x = j);
        break;
      }
      e && x && L.alternate === null && t(f, x), c = o(L, c, P), R === null ? C = L : R.sibling = L, R = L, x = j;
    }
    if (P === m.length) return n(f, x), H && Et(f, P), C;
    if (x === null) {
      for (; P < m.length; P++) x = v(f, m[P], S), x !== null && (c = o(x, c, P), R === null ? C = x : R.sibling = x, R = x);
      return H && Et(f, P), C;
    }
    for (x = r(f, x); P < m.length; P++) j = g(x, f, P, m[P], S), j !== null && (e && j.alternate !== null && x.delete(j.key === null ? P : j.key), c = o(j, c, P), R === null ? C = j : R.sibling = j, R = j);
    return e && x.forEach(function(fe) {
      return t(f, fe);
    }), H && Et(f, P), C;
  }
  function y(f, c, m, S) {
    var C = hn(m);
    if (typeof C != "function") throw Error(w(150));
    if (m = C.call(m), m == null) throw Error(w(151));
    for (var R = C = null, x = c, P = c = 0, j = null, L = m.next(); x !== null && !L.done; P++, L = m.next()) {
      x.index > P ? (j = x, x = null) : j = x.sibling;
      var fe = d(f, x, L.value, S);
      if (fe === null) {
        x === null && (x = j);
        break;
      }
      e && x && fe.alternate === null && t(f, x), c = o(fe, c, P), R === null ? C = fe : R.sibling = fe, R = fe, x = j;
    }
    if (L.done) return n(
      f,
      x
    ), H && Et(f, P), C;
    if (x === null) {
      for (; !L.done; P++, L = m.next()) L = v(f, L.value, S), L !== null && (c = o(L, c, P), R === null ? C = L : R.sibling = L, R = L);
      return H && Et(f, P), C;
    }
    for (x = r(f, x); !L.done; P++, L = m.next()) L = g(x, f, P, L.value, S), L !== null && (e && L.alternate !== null && x.delete(L.key === null ? P : L.key), c = o(L, c, P), R === null ? C = L : R.sibling = L, R = L);
    return e && x.forEach(function(mn) {
      return t(f, mn);
    }), H && Et(f, P), C;
  }
  function E(f, c, m, S) {
    if (typeof m == "object" && m !== null && m.type === jt && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case fr:
          e: {
            for (var C = m.key, R = c; R !== null; ) {
              if (R.key === C) {
                if (C = m.type, C === jt) {
                  if (R.tag === 7) {
                    n(f, R.sibling), c = l(R, m.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (R.elementType === C || typeof C == "object" && C !== null && C.$$typeof === nt && Gu(C) === R.type) {
                  n(f, R.sibling), c = l(R, m.props), c.ref = _n(f, R, m), c.return = f, f = c;
                  break e;
                }
                n(f, R);
                break;
              } else t(f, R);
              R = R.sibling;
            }
            m.type === jt ? (c = It(m.props.children, f.mode, S, m.key), c.return = f, f = c) : (S = Ur(m.type, m.key, m.props, null, f.mode, S), S.ref = _n(f, c, m), S.return = f, f = S);
          }
          return i(f);
        case Ht:
          e: {
            for (R = m.key; c !== null; ) {
              if (c.key === R) if (c.tag === 4 && c.stateNode.containerInfo === m.containerInfo && c.stateNode.implementation === m.implementation) {
                n(f, c.sibling), c = l(c, m.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = ro(m, f.mode, S), c.return = f, f = c;
          }
          return i(f);
        case nt:
          return R = m._init, E(f, c, R(m._payload), S);
      }
      if (Fn(m)) return h(f, c, m, S);
      if (hn(m)) return y(f, c, m, S);
      Rr(f, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, m), c.return = f, f = c) : (n(f, c), c = no(m, f.mode, S), c.return = f, f = c), i(f)) : n(f, c);
  }
  return E;
}
var sn = za(!0), Ia = za(!1), nl = Ct(null), rl = null, Yt = null, $i = null;
function Li() {
  $i = Yt = rl = null;
}
function Ni(e) {
  var t = nl.current;
  A(nl), e._currentValue = t;
}
function jo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function nn(e, t) {
  rl = e, $i = Yt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ge = !0), e.firstContext = null);
}
function Me(e) {
  var t = e._currentValue;
  if ($i !== e) if (e = { context: e, memoizedValue: t, next: null }, Yt === null) {
    if (rl === null) throw Error(w(308));
    Yt = e, rl.dependencies = { lanes: 0, firstContext: e };
  } else Yt = Yt.next = e;
  return t;
}
var Ft = null;
function Vi(e) {
  Ft === null ? Ft = [e] : Ft.push(e);
}
function $a(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Vi(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Je(e, r);
}
function Je(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var rt = !1;
function Di(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function La(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ye(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function pt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, V & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Je(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Vi(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Je(e, n);
}
function Dr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ci(e, n);
  }
}
function Wu(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? l = o = i : o = o.next = i, n = n.next;
      } while (n !== null);
      o === null ? l = o = t : o = o.next = t;
    } else l = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function ll(e, t, n, r) {
  var l = e.updateQueue;
  rt = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u, a = s.next;
    s.next = null, i === null ? o = a : i.next = a, i = s;
    var p = e.alternate;
    p !== null && (p = p.updateQueue, u = p.lastBaseUpdate, u !== i && (u === null ? p.firstBaseUpdate = a : u.next = a, p.lastBaseUpdate = s));
  }
  if (o !== null) {
    var v = l.baseState;
    i = 0, p = a = s = null, u = o;
    do {
      var d = u.lane, g = u.eventTime;
      if ((r & d) === d) {
        p !== null && (p = p.next = {
          eventTime: g,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var h = e, y = u;
          switch (d = t, g = n, y.tag) {
            case 1:
              if (h = y.payload, typeof h == "function") {
                v = h.call(g, v, d);
                break e;
              }
              v = h;
              break e;
            case 3:
              h.flags = h.flags & -65537 | 128;
            case 0:
              if (h = y.payload, d = typeof h == "function" ? h.call(g, v, d) : h, d == null) break e;
              v = G({}, v, d);
              break e;
            case 2:
              rt = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, d = l.effects, d === null ? l.effects = [u] : d.push(u));
      } else g = { eventTime: g, lane: d, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, p === null ? (a = p = g, s = v) : p = p.next = g, i |= d;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        d = u, u = d.next, d.next = null, l.lastBaseUpdate = d, l.shared.pending = null;
      }
    } while (!0);
    if (p === null && (s = v), l.baseState = s, l.firstBaseUpdate = a, l.lastBaseUpdate = p, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Vt |= i, e.lanes = i, e.memoizedState = v;
  }
}
function Qu(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(w(191, l));
      l.call(r);
    }
  }
}
var sr = {}, Be = Ct(sr), Jn = Ct(sr), bn = Ct(sr);
function Mt(e) {
  if (e === sr) throw Error(w(174));
  return e;
}
function Ti(e, t) {
  switch (T(bn, t), T(Jn, e), T(Be, sr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Co(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Co(t, e);
  }
  A(Be), T(Be, t);
}
function an() {
  A(Be), A(Jn), A(bn);
}
function Na(e) {
  Mt(bn.current);
  var t = Mt(Be.current), n = Co(t, e.type);
  t !== n && (T(Jn, e), T(Be, n));
}
function Oi(e) {
  Jn.current === e && (A(Be), A(Jn));
}
var U = Ct(0);
function ol(e) {
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
var ql = [];
function Ai() {
  for (var e = 0; e < ql.length; e++) ql[e]._workInProgressVersionPrimary = null;
  ql.length = 0;
}
var Tr = et.ReactCurrentDispatcher, Zl = et.ReactCurrentBatchConfig, Nt = 0, B = null, Y = null, J = null, il = !1, Dn = !1, er = 0, Mf = 0;
function re() {
  throw Error(w(321));
}
function Hi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Oe(e[n], t[n])) return !1;
  return !0;
}
function ji(e, t, n, r, l, o) {
  if (Nt = o, B = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Tr.current = e === null || e.memoizedState === null ? Lf : Nf, e = n(r, l), Dn) {
    o = 0;
    do {
      if (Dn = !1, er = 0, 25 <= o) throw Error(w(301));
      o += 1, J = Y = null, t.updateQueue = null, Tr.current = Vf, e = n(r, l);
    } while (Dn);
  }
  if (Tr.current = ul, t = Y !== null && Y.next !== null, Nt = 0, J = Y = B = null, il = !1, t) throw Error(w(300));
  return e;
}
function Ui() {
  var e = er !== 0;
  return er = 0, e;
}
function He() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return J === null ? B.memoizedState = J = e : J = J.next = e, J;
}
function ze() {
  if (Y === null) {
    var e = B.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Y.next;
  var t = J === null ? B.memoizedState : J.next;
  if (t !== null) J = t, Y = e;
  else {
    if (e === null) throw Error(w(310));
    Y = e, e = { memoizedState: Y.memoizedState, baseState: Y.baseState, baseQueue: Y.baseQueue, queue: Y.queue, next: null }, J === null ? B.memoizedState = J = e : J = J.next = e;
  }
  return J;
}
function tr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Jl(e) {
  var t = ze(), n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = Y, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var u = i = null, s = null, a = o;
    do {
      var p = a.lane;
      if ((Nt & p) === p) s !== null && (s = s.next = { lane: 0, action: a.action, hasEagerState: a.hasEagerState, eagerState: a.eagerState, next: null }), r = a.hasEagerState ? a.eagerState : e(r, a.action);
      else {
        var v = {
          lane: p,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null
        };
        s === null ? (u = s = v, i = r) : s = s.next = v, B.lanes |= p, Vt |= p;
      }
      a = a.next;
    } while (a !== null && a !== o);
    s === null ? i = r : s.next = u, Oe(r, t.memoizedState) || (ge = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, B.lanes |= o, Vt |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function bl(e) {
  var t = ze(), n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    Oe(o, t.memoizedState) || (ge = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Va() {
}
function Da(e, t) {
  var n = B, r = ze(), l = t(), o = !Oe(r.memoizedState, l);
  if (o && (r.memoizedState = l, ge = !0), r = r.queue, Bi(Aa.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || J !== null && J.memoizedState.tag & 1) {
    if (n.flags |= 2048, nr(9, Oa.bind(null, n, r, l, t), void 0, null), b === null) throw Error(w(349));
    Nt & 30 || Ta(n, t, l);
  }
  return l;
}
function Ta(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = B.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, B.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Oa(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ha(t) && ja(e);
}
function Aa(e, t, n) {
  return n(function() {
    Ha(t) && ja(e);
  });
}
function Ha(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Oe(e, n);
  } catch {
    return !0;
  }
}
function ja(e) {
  var t = Je(e, 1);
  t !== null && De(t, e, 1, -1);
}
function Ku(e) {
  var t = He();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: tr, lastRenderedState: e }, t.queue = e, e = e.dispatch = $f.bind(null, B, e), [t.memoizedState, e];
}
function nr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = B.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, B.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ua() {
  return ze().memoizedState;
}
function Or(e, t, n, r) {
  var l = He();
  B.flags |= e, l.memoizedState = nr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Sl(e, t, n, r) {
  var l = ze();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Y !== null) {
    var i = Y.memoizedState;
    if (o = i.destroy, r !== null && Hi(r, i.deps)) {
      l.memoizedState = nr(t, n, o, r);
      return;
    }
  }
  B.flags |= e, l.memoizedState = nr(1 | t, n, o, r);
}
function Xu(e, t) {
  return Or(8390656, 8, e, t);
}
function Bi(e, t) {
  return Sl(2048, 8, e, t);
}
function Ba(e, t) {
  return Sl(4, 2, e, t);
}
function Ga(e, t) {
  return Sl(4, 4, e, t);
}
function Wa(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Qa(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Sl(4, 4, Wa.bind(null, t, e), n);
}
function Gi() {
}
function Ka(e, t) {
  var n = ze();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Hi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Xa(e, t) {
  var n = ze();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Hi(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ya(e, t, n) {
  return Nt & 21 ? (Oe(n, t) || (n = ea(), B.lanes |= n, Vt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ge = !0), e.memoizedState = n);
}
function zf(e, t) {
  var n = D;
  D = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Zl.transition;
  Zl.transition = {};
  try {
    e(!1), t();
  } finally {
    D = n, Zl.transition = r;
  }
}
function qa() {
  return ze().memoizedState;
}
function If(e, t, n) {
  var r = mt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Za(e)) Ja(t, n);
  else if (n = $a(e, t, n, r), n !== null) {
    var l = ae();
    De(n, e, r, l), ba(n, t, r);
  }
}
function $f(e, t, n) {
  var r = mt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Za(e)) Ja(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, Oe(u, i)) {
        var s = t.interleaved;
        s === null ? (l.next = l, Vi(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = $a(e, t, l, r), n !== null && (l = ae(), De(n, e, r, l), ba(n, t, r));
  }
}
function Za(e) {
  var t = e.alternate;
  return e === B || t !== null && t === B;
}
function Ja(e, t) {
  Dn = il = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function ba(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Ci(e, n);
  }
}
var ul = { readContext: Me, useCallback: re, useContext: re, useEffect: re, useImperativeHandle: re, useInsertionEffect: re, useLayoutEffect: re, useMemo: re, useReducer: re, useRef: re, useState: re, useDebugValue: re, useDeferredValue: re, useTransition: re, useMutableSource: re, useSyncExternalStore: re, useId: re, unstable_isNewReconciler: !1 }, Lf = { readContext: Me, useCallback: function(e, t) {
  return He().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Me, useEffect: Xu, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Or(
    4194308,
    4,
    Wa.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Or(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Or(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = He();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = He();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = If.bind(null, B, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = He();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ku, useDebugValue: Gi, useDeferredValue: function(e) {
  return He().memoizedState = e;
}, useTransition: function() {
  var e = Ku(!1), t = e[0];
  return e = zf.bind(null, e[1]), He().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = B, l = He();
  if (H) {
    if (n === void 0) throw Error(w(407));
    n = n();
  } else {
    if (n = t(), b === null) throw Error(w(349));
    Nt & 30 || Ta(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Xu(Aa.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, nr(9, Oa.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = He(), t = b.identifierPrefix;
  if (H) {
    var n = Xe, r = Ke;
    n = (r & ~(1 << 32 - Ve(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = er++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Mf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Nf = {
  readContext: Me,
  useCallback: Ka,
  useContext: Me,
  useEffect: Bi,
  useImperativeHandle: Qa,
  useInsertionEffect: Ba,
  useLayoutEffect: Ga,
  useMemo: Xa,
  useReducer: Jl,
  useRef: Ua,
  useState: function() {
    return Jl(tr);
  },
  useDebugValue: Gi,
  useDeferredValue: function(e) {
    var t = ze();
    return Ya(t, Y.memoizedState, e);
  },
  useTransition: function() {
    var e = Jl(tr)[0], t = ze().memoizedState;
    return [e, t];
  },
  useMutableSource: Va,
  useSyncExternalStore: Da,
  useId: qa,
  unstable_isNewReconciler: !1
}, Vf = { readContext: Me, useCallback: Ka, useContext: Me, useEffect: Bi, useImperativeHandle: Qa, useInsertionEffect: Ba, useLayoutEffect: Ga, useMemo: Xa, useReducer: bl, useRef: Ua, useState: function() {
  return bl(tr);
}, useDebugValue: Gi, useDeferredValue: function(e) {
  var t = ze();
  return Y === null ? t.memoizedState = e : Ya(t, Y.memoizedState, e);
}, useTransition: function() {
  var e = bl(tr)[0], t = ze().memoizedState;
  return [e, t];
}, useMutableSource: Va, useSyncExternalStore: Da, useId: qa, unstable_isNewReconciler: !1 };
function $e(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Uo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var wl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ot(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = mt(e), o = Ye(r, l);
  o.payload = t, n != null && (o.callback = n), t = pt(e, o, l), t !== null && (De(t, e, l, r), Dr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = mt(e), o = Ye(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = pt(e, o, l), t !== null && (De(t, e, l, r), Dr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ae(), r = mt(e), l = Ye(n, r);
  l.tag = 2, t != null && (l.callback = t), t = pt(e, l, r), t !== null && (De(t, e, r, n), Dr(t, e, r));
} };
function Yu(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Xn(n, r) || !Xn(l, o) : !0;
}
function ec(e, t, n) {
  var r = !1, l = yt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Me(o) : (l = ve(t) ? $t : ue.current, r = t.contextTypes, o = (r = r != null) ? on(e, l) : yt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = wl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function qu(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && wl.enqueueReplaceState(t, t.state, null);
}
function Bo(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Di(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Me(o) : (o = ve(t) ? $t : ue.current, l.context = on(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Uo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && wl.enqueueReplaceState(l, l.state, null), ll(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function cn(e, t) {
  try {
    var n = "", r = t;
    do
      n += sd(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function eo(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Go(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Df = typeof WeakMap == "function" ? WeakMap : Map;
function tc(e, t, n) {
  n = Ye(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    al || (al = !0, ei = r), Go(e, t);
  }, n;
}
function nc(e, t, n) {
  n = Ye(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Go(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Go(e, t), typeof r != "function" && (gt === null ? gt = /* @__PURE__ */ new Set([this]) : gt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Zu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Df();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = qf.bind(null, e, t, n), t.then(e, e));
}
function Ju(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function bu(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ye(-1, 1), t.tag = 2, pt(n, t, 1))), n.lanes |= 1), e);
}
var Tf = et.ReactCurrentOwner, ge = !1;
function se(e, t, n, r) {
  t.child = e === null ? Ia(t, null, n, r) : sn(t, e.child, n, r);
}
function es(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return nn(t, l), r = ji(e, t, n, r, o, l), n = Ui(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, be(e, t, l)) : (H && n && Mi(t), t.flags |= 1, se(e, t, r, l), t.child);
}
function ts(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Ji(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, rc(e, t, o, r, l)) : (e = Ur(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Xn, n(i, r) && e.ref === t.ref) return be(e, t, l);
  }
  return t.flags |= 1, e = vt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function rc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Xn(o, r) && e.ref === t.ref) if (ge = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ge = !0);
    else return t.lanes = e.lanes, be(e, t, l);
  }
  return Wo(e, t, n, r, l);
}
function lc(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, T(Zt, ye), ye |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, T(Zt, ye), ye |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, T(Zt, ye), ye |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, T(Zt, ye), ye |= r;
  return se(e, t, l, n), t.child;
}
function oc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Wo(e, t, n, r, l) {
  var o = ve(n) ? $t : ue.current;
  return o = on(t, o), nn(t, l), n = ji(e, t, n, r, o, l), r = Ui(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, be(e, t, l)) : (H && r && Mi(t), t.flags |= 1, se(e, t, n, l), t.child);
}
function ns(e, t, n, r, l) {
  if (ve(n)) {
    var o = !0;
    br(t);
  } else o = !1;
  if (nn(t, l), t.stateNode === null) Ar(e, t), ec(t, n, r), Bo(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var s = i.context, a = n.contextType;
    typeof a == "object" && a !== null ? a = Me(a) : (a = ve(n) ? $t : ue.current, a = on(t, a));
    var p = n.getDerivedStateFromProps, v = typeof p == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    v || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== a) && qu(t, i, r, a), rt = !1;
    var d = t.memoizedState;
    i.state = d, ll(t, r, i, l), s = t.memoizedState, u !== r || d !== s || me.current || rt ? (typeof p == "function" && (Uo(t, n, p, r), s = t.memoizedState), (u = rt || Yu(t, n, u, r, d, s, a)) ? (v || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = a, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, La(e, t), u = t.memoizedProps, a = t.type === t.elementType ? u : $e(t.type, u), i.props = a, v = t.pendingProps, d = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = Me(s) : (s = ve(n) ? $t : ue.current, s = on(t, s));
    var g = n.getDerivedStateFromProps;
    (p = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== v || d !== s) && qu(t, i, r, s), rt = !1, d = t.memoizedState, i.state = d, ll(t, r, i, l);
    var h = t.memoizedState;
    u !== v || d !== h || me.current || rt ? (typeof g == "function" && (Uo(t, n, g, r), h = t.memoizedState), (a = rt || Yu(t, n, a, r, d, h, s) || !1) ? (p || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, h, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, h, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = h), i.props = r, i.state = h, i.context = s, r = a) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Qo(e, t, n, r, o, l);
}
function Qo(e, t, n, r, l, o) {
  oc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && ju(t, n, !1), be(e, t, o);
  r = t.stateNode, Tf.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = sn(t, e.child, null, o), t.child = sn(t, null, u, o)) : se(e, t, u, o), t.memoizedState = r.state, l && ju(t, n, !0), t.child;
}
function ic(e) {
  var t = e.stateNode;
  t.pendingContext ? Hu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Hu(e, t.context, !1), Ti(e, t.containerInfo);
}
function rs(e, t, n, r, l) {
  return un(), Ii(l), t.flags |= 256, se(e, t, n, r), t.child;
}
var Ko = { dehydrated: null, treeContext: null, retryLane: 0 };
function Xo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function uc(e, t, n) {
  var r = t.pendingProps, l = U.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), T(U, l & 1), e === null)
    return Ho(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Rl(i, r, 0, null), e = It(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Xo(n), t.memoizedState = Ko, e) : Wi(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Of(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = vt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = vt(u, o) : (o = It(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Xo(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Ko, r;
  }
  return o = e.child, e = o.sibling, r = vt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Wi(e, t) {
  return t = Rl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function kr(e, t, n, r) {
  return r !== null && Ii(r), sn(t, e.child, null, n), e = Wi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Of(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = eo(Error(w(422))), kr(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Rl({ mode: "visible", children: r.children }, l, 0, null), o = It(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && sn(t, e.child, null, i), t.child.memoizedState = Xo(i), t.memoizedState = Ko, o);
  if (!(t.mode & 1)) return kr(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(w(419)), r = eo(o, r, void 0), kr(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, ge || u) {
    if (r = b, r !== null) {
      switch (i & -i) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Je(e, l), De(r, e, l, -1));
    }
    return Zi(), r = eo(Error(w(421))), kr(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Zf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Se = ft(l.nextSibling), we = t, H = !0, Ne = null, e !== null && (Ee[xe++] = Ke, Ee[xe++] = Xe, Ee[xe++] = Lt, Ke = e.id, Xe = e.overflow, Lt = t), t = Wi(t, r.children), t.flags |= 4096, t);
}
function ls(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), jo(e.return, t, n);
}
function to(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function sc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (se(e, t, r.children, n), r = U.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ls(e, n, t);
      else if (e.tag === 19) ls(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (T(U, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ol(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), to(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ol(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      to(t, !0, n, null, o);
      break;
    case "together":
      to(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Ar(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function be(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Vt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(w(153));
  if (t.child !== null) {
    for (e = t.child, n = vt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = vt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Af(e, t, n) {
  switch (t.tag) {
    case 3:
      ic(t), un();
      break;
    case 5:
      Na(t);
      break;
    case 1:
      ve(t.type) && br(t);
      break;
    case 4:
      Ti(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      T(nl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (T(U, U.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? uc(e, t, n) : (T(U, U.current & 1), e = be(e, t, n), e !== null ? e.sibling : null);
      T(U, U.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return sc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), T(U, U.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, lc(e, t, n);
  }
  return be(e, t, n);
}
var ac, Yo, cc, dc;
ac = function(e, t) {
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
Yo = function() {
};
cc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Mt(Be.current);
    var o = null;
    switch (n) {
      case "input":
        l = ho(e, l), r = ho(e, r), o = [];
        break;
      case "select":
        l = G({}, l, { value: void 0 }), r = G({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = wo(e, l), r = wo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Zr);
    }
    _o(n, r);
    var i;
    n = null;
    for (a in l) if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null) if (a === "style") {
      var u = l[a];
      for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else a !== "dangerouslySetInnerHTML" && a !== "children" && a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (jn.hasOwnProperty(a) ? o || (o = []) : (o = o || []).push(a, null));
    for (a in r) {
      var s = r[a];
      if (u = l != null ? l[a] : void 0, r.hasOwnProperty(a) && s !== u && (s != null || u != null)) if (a === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
      } else n || (o || (o = []), o.push(
        a,
        n
      )), n = s;
      else a === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (o = o || []).push(a, s)) : a === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(a, "" + s) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && (jn.hasOwnProperty(a) ? (s != null && a === "onScroll" && O("scroll", e), o || u === s || (o = [])) : (o = o || []).push(a, s));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
dc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Rn(e, t) {
  if (!H) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Hf(e, t, n) {
  var r = t.pendingProps;
  switch (zi(t), t.tag) {
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
      return le(t), null;
    case 1:
      return ve(t.type) && Jr(), le(t), null;
    case 3:
      return r = t.stateNode, an(), A(me), A(ue), Ai(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (_r(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ne !== null && (ri(Ne), Ne = null))), Yo(e, t), le(t), null;
    case 5:
      Oi(t);
      var l = Mt(bn.current);
      if (n = t.type, e !== null && t.stateNode != null) cc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(w(166));
          return le(t), null;
        }
        if (e = Mt(Be.current), _r(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[je] = t, r[Zn] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              O("cancel", r), O("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              O("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < zn.length; l++) O(zn[l], r);
              break;
            case "source":
              O("error", r);
              break;
            case "img":
            case "image":
            case "link":
              O(
                "error",
                r
              ), O("load", r);
              break;
            case "details":
              O("toggle", r);
              break;
            case "input":
              pu(r, o), O("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, O("invalid", r);
              break;
            case "textarea":
              mu(r, o), O("invalid", r);
          }
          _o(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && Cr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && Cr(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : jn.hasOwnProperty(i) && u != null && i === "onScroll" && O("scroll", r);
          }
          switch (n) {
            case "input":
              pr(r), gu(r, o, !0);
              break;
            case "textarea":
              pr(r), vu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Zr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = As(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[je] = t, e[Zn] = r, ac(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = Ro(n, r), n) {
              case "dialog":
                O("cancel", e), O("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                O("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < zn.length; l++) O(zn[l], e);
                l = r;
                break;
              case "source":
                O("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                O(
                  "error",
                  e
                ), O("load", e), l = r;
                break;
              case "details":
                O("toggle", e), l = r;
                break;
              case "input":
                pu(e, r), l = ho(e, r), O("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = G({}, r, { value: void 0 }), O("invalid", e);
                break;
              case "textarea":
                mu(e, r), l = wo(e, r), O("invalid", e);
                break;
              default:
                l = r;
            }
            _o(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var s = u[o];
              o === "style" ? Us(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Hs(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Un(e, s) : typeof s == "number" && Un(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (jn.hasOwnProperty(o) ? s != null && o === "onScroll" && O("scroll", e) : s != null && mi(e, o, s, i));
            }
            switch (n) {
              case "input":
                pr(e), gu(e, r, !1);
                break;
              case "textarea":
                pr(e), vu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ht(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Jt(e, !!r.multiple, o, !1) : r.defaultValue != null && Jt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Zr);
            }
            switch (n) {
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
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return le(t), null;
    case 6:
      if (e && t.stateNode != null) dc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(w(166));
        if (n = Mt(bn.current), Mt(Be.current), _r(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[je] = t, (o = r.nodeValue !== n) && (e = we, e !== null)) switch (e.tag) {
            case 3:
              Cr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Cr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[je] = t, t.stateNode = r;
      }
      return le(t), null;
    case 13:
      if (A(U), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (H && Se !== null && t.mode & 1 && !(t.flags & 128)) Ma(), un(), t.flags |= 98560, o = !1;
        else if (o = _r(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(w(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(w(317));
            o[je] = t;
          } else un(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          le(t), o = !1;
        } else Ne !== null && (ri(Ne), Ne = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || U.current & 1 ? q === 0 && (q = 3) : Zi())), t.updateQueue !== null && (t.flags |= 4), le(t), null);
    case 4:
      return an(), Yo(e, t), e === null && Yn(t.stateNode.containerInfo), le(t), null;
    case 10:
      return Ni(t.type._context), le(t), null;
    case 17:
      return ve(t.type) && Jr(), le(t), null;
    case 19:
      if (A(U), o = t.memoizedState, o === null) return le(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Rn(o, !1);
      else {
        if (q !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = ol(e), i !== null) {
            for (t.flags |= 128, Rn(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return T(U, U.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && K() > dn && (t.flags |= 128, r = !0, Rn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ol(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Rn(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !H) return le(t), null;
        } else 2 * K() - o.renderingStartTime > dn && n !== 1073741824 && (t.flags |= 128, r = !0, Rn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = K(), t.sibling = null, n = U.current, T(U, r ? n & 1 | 2 : n & 1), t) : (le(t), null);
    case 22:
    case 23:
      return qi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ye & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(w(156, t.tag));
}
function jf(e, t) {
  switch (zi(t), t.tag) {
    case 1:
      return ve(t.type) && Jr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return an(), A(me), A(ue), Ai(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Oi(t), null;
    case 13:
      if (A(U), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(w(340));
        un();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return A(U), null;
    case 4:
      return an(), null;
    case 10:
      return Ni(t.type._context), null;
    case 22:
    case 23:
      return qi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Er = !1, ie = !1, Uf = typeof WeakSet == "function" ? WeakSet : Set, _ = null;
function qt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    W(e, t, r);
  }
  else n.current = null;
}
function qo(e, t, n) {
  try {
    n();
  } catch (r) {
    W(e, t, r);
  }
}
var os = !1;
function Bf(e, t) {
  if (Lo = Xr, e = va(), Fi(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, o = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, o.nodeType;
        } catch {
          n = null;
          break e;
        }
        var i = 0, u = -1, s = -1, a = 0, p = 0, v = e, d = null;
        t: for (; ; ) {
          for (var g; v !== n || l !== 0 && v.nodeType !== 3 || (u = i + l), v !== o || r !== 0 && v.nodeType !== 3 || (s = i + r), v.nodeType === 3 && (i += v.nodeValue.length), (g = v.firstChild) !== null; )
            d = v, v = g;
          for (; ; ) {
            if (v === e) break t;
            if (d === n && ++a === l && (u = i), d === o && ++p === r && (s = i), (g = v.nextSibling) !== null) break;
            v = d, d = v.parentNode;
          }
          v = g;
        }
        n = u === -1 || s === -1 ? null : { start: u, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (No = { focusedElem: e, selectionRange: n }, Xr = !1, _ = t; _ !== null; ) if (t = _, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, _ = e;
  else for (; _ !== null; ) {
    t = _;
    try {
      var h = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (h !== null) {
            var y = h.memoizedProps, E = h.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? y : $e(t.type, y), E);
            f.__reactInternalSnapshotBeforeUpdate = c;
          }
          break;
        case 3:
          var m = t.stateNode.containerInfo;
          m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(w(163));
      }
    } catch (S) {
      W(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, _ = e;
      break;
    }
    _ = t.return;
  }
  return h = os, os = !1, h;
}
function Tn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && qo(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Cl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Zo(e) {
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
function fc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, fc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[je], delete t[Zn], delete t[To], delete t[Ef], delete t[xf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function pc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function is(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || pc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Jo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Zr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Jo(e, t, n), e = e.sibling; e !== null; ) Jo(e, t, n), e = e.sibling;
}
function bo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (bo(e, t, n), e = e.sibling; e !== null; ) bo(e, t, n), e = e.sibling;
}
var ee = null, Le = !1;
function tt(e, t, n) {
  for (n = n.child; n !== null; ) gc(e, t, n), n = n.sibling;
}
function gc(e, t, n) {
  if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
    Ue.onCommitFiberUnmount(pl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ie || qt(n, t);
    case 6:
      var r = ee, l = Le;
      ee = null, tt(e, t, n), ee = r, Le = l, ee !== null && (Le ? (e = ee, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null && (Le ? (e = ee, n = n.stateNode, e.nodeType === 8 ? Xl(e.parentNode, n) : e.nodeType === 1 && Xl(e, n), Qn(e)) : Xl(ee, n.stateNode));
      break;
    case 4:
      r = ee, l = Le, ee = n.stateNode.containerInfo, Le = !0, tt(e, t, n), ee = r, Le = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ie && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && qo(n, t, i), l = l.next;
        } while (l !== r);
      }
      tt(e, t, n);
      break;
    case 1:
      if (!ie && (qt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        W(n, t, u);
      }
      tt(e, t, n);
      break;
    case 21:
      tt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ie = (r = ie) || n.memoizedState !== null, tt(e, t, n), ie = r) : tt(e, t, n);
      break;
    default:
      tt(e, t, n);
  }
}
function us(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Uf()), t.forEach(function(r) {
      var l = Jf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Ie(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, u = i;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            ee = u.stateNode, Le = !1;
            break e;
          case 3:
            ee = u.stateNode.containerInfo, Le = !0;
            break e;
          case 4:
            ee = u.stateNode.containerInfo, Le = !0;
            break e;
        }
        u = u.return;
      }
      if (ee === null) throw Error(w(160));
      gc(o, i, l), ee = null, Le = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (a) {
      W(l, t, a);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) mc(t, e), t = t.sibling;
}
function mc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ie(t, e), Ae(e), r & 4) {
        try {
          Tn(3, e, e.return), Cl(3, e);
        } catch (y) {
          W(e, e.return, y);
        }
        try {
          Tn(5, e, e.return);
        } catch (y) {
          W(e, e.return, y);
        }
      }
      break;
    case 1:
      Ie(t, e), Ae(e), r & 512 && n !== null && qt(n, n.return);
      break;
    case 5:
      if (Ie(t, e), Ae(e), r & 512 && n !== null && qt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Un(l, "");
        } catch (y) {
          W(e, e.return, y);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && o.type === "radio" && o.name != null && Ts(l, o), Ro(u, i);
          var a = Ro(u, o);
          for (i = 0; i < s.length; i += 2) {
            var p = s[i], v = s[i + 1];
            p === "style" ? Us(l, v) : p === "dangerouslySetInnerHTML" ? Hs(l, v) : p === "children" ? Un(l, v) : mi(l, p, v, a);
          }
          switch (u) {
            case "input":
              yo(l, o);
              break;
            case "textarea":
              Os(l, o);
              break;
            case "select":
              var d = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var g = o.value;
              g != null ? Jt(l, !!o.multiple, g, !1) : d !== !!o.multiple && (o.defaultValue != null ? Jt(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Jt(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Zn] = o;
        } catch (y) {
          W(e, e.return, y);
        }
      }
      break;
    case 6:
      if (Ie(t, e), Ae(e), r & 4) {
        if (e.stateNode === null) throw Error(w(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (y) {
          W(e, e.return, y);
        }
      }
      break;
    case 3:
      if (Ie(t, e), Ae(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Qn(t.containerInfo);
      } catch (y) {
        W(e, e.return, y);
      }
      break;
    case 4:
      Ie(t, e), Ae(e);
      break;
    case 13:
      Ie(t, e), Ae(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Xi = K())), r & 4 && us(e);
      break;
    case 22:
      if (p = n !== null && n.memoizedState !== null, e.mode & 1 ? (ie = (a = ie) || p, Ie(t, e), ie = a) : Ie(t, e), Ae(e), r & 8192) {
        if (a = e.memoizedState !== null, (e.stateNode.isHidden = a) && !p && e.mode & 1) for (_ = e, p = e.child; p !== null; ) {
          for (v = _ = p; _ !== null; ) {
            switch (d = _, g = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Tn(4, d, d.return);
                break;
              case 1:
                qt(d, d.return);
                var h = d.stateNode;
                if (typeof h.componentWillUnmount == "function") {
                  r = d, n = d.return;
                  try {
                    t = r, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
                  } catch (y) {
                    W(r, n, y);
                  }
                }
                break;
              case 5:
                qt(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  as(v);
                  continue;
                }
            }
            g !== null ? (g.return = d, _ = g) : as(v);
          }
          p = p.sibling;
        }
        e: for (p = null, v = e; ; ) {
          if (v.tag === 5) {
            if (p === null) {
              p = v;
              try {
                l = v.stateNode, a ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = v.stateNode, s = v.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = js("display", i));
              } catch (y) {
                W(e, e.return, y);
              }
            }
          } else if (v.tag === 6) {
            if (p === null) try {
              v.stateNode.nodeValue = a ? "" : v.memoizedProps;
            } catch (y) {
              W(e, e.return, y);
            }
          } else if ((v.tag !== 22 && v.tag !== 23 || v.memoizedState === null || v === e) && v.child !== null) {
            v.child.return = v, v = v.child;
            continue;
          }
          if (v === e) break e;
          for (; v.sibling === null; ) {
            if (v.return === null || v.return === e) break e;
            p === v && (p = null), v = v.return;
          }
          p === v && (p = null), v.sibling.return = v.return, v = v.sibling;
        }
      }
      break;
    case 19:
      Ie(t, e), Ae(e), r & 4 && us(e);
      break;
    case 21:
      break;
    default:
      Ie(
        t,
        e
      ), Ae(e);
  }
}
function Ae(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (pc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(w(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Un(l, ""), r.flags &= -33);
          var o = is(e);
          bo(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = is(e);
          Jo(e, u, i);
          break;
        default:
          throw Error(w(161));
      }
    } catch (s) {
      W(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Gf(e, t, n) {
  _ = e, vc(e);
}
function vc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; _ !== null; ) {
    var l = _, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Er;
      if (!i) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || ie;
        u = Er;
        var a = ie;
        if (Er = i, (ie = s) && !a) for (_ = l; _ !== null; ) i = _, s = i.child, i.tag === 22 && i.memoizedState !== null ? cs(l) : s !== null ? (s.return = i, _ = s) : cs(l);
        for (; o !== null; ) _ = o, vc(o), o = o.sibling;
        _ = l, Er = u, ie = a;
      }
      ss(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, _ = o) : ss(e);
  }
}
function ss(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ie || Cl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ie) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : $e(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Qu(t, o, r);
            break;
          case 3:
            var i = t.updateQueue;
            if (i !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Qu(t, i, n);
            }
            break;
          case 5:
            var u = t.stateNode;
            if (n === null && t.flags & 4) {
              n = u;
              var s = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && n.focus();
                  break;
                case "img":
                  s.src && (n.src = s.src);
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
              var a = t.alternate;
              if (a !== null) {
                var p = a.memoizedState;
                if (p !== null) {
                  var v = p.dehydrated;
                  v !== null && Qn(v);
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
            throw Error(w(163));
        }
        ie || t.flags & 512 && Zo(t);
      } catch (d) {
        W(t, t.return, d);
      }
    }
    if (t === e) {
      _ = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, _ = n;
      break;
    }
    _ = t.return;
  }
}
function as(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t === e) {
      _ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, _ = n;
      break;
    }
    _ = t.return;
  }
}
function cs(e) {
  for (; _ !== null; ) {
    var t = _;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Cl(4, t);
          } catch (s) {
            W(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              W(t, l, s);
            }
          }
          var o = t.return;
          try {
            Zo(t);
          } catch (s) {
            W(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Zo(t);
          } catch (s) {
            W(t, i, s);
          }
      }
    } catch (s) {
      W(t, t.return, s);
    }
    if (t === e) {
      _ = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, _ = u;
      break;
    }
    _ = t.return;
  }
}
var Wf = Math.ceil, sl = et.ReactCurrentDispatcher, Qi = et.ReactCurrentOwner, Fe = et.ReactCurrentBatchConfig, V = 0, b = null, X = null, te = 0, ye = 0, Zt = Ct(0), q = 0, rr = null, Vt = 0, _l = 0, Ki = 0, On = null, pe = null, Xi = 0, dn = 1 / 0, Ge = null, al = !1, ei = null, gt = null, xr = !1, ut = null, cl = 0, An = 0, ti = null, Hr = -1, jr = 0;
function ae() {
  return V & 6 ? K() : Hr !== -1 ? Hr : Hr = K();
}
function mt(e) {
  return e.mode & 1 ? V & 2 && te !== 0 ? te & -te : Ff.transition !== null ? (jr === 0 && (jr = ea()), jr) : (e = D, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ua(e.type)), e) : 1;
}
function De(e, t, n, r) {
  if (50 < An) throw An = 0, ti = null, Error(w(185));
  or(e, n, r), (!(V & 2) || e !== b) && (e === b && (!(V & 2) && (_l |= n), q === 4 && ot(e, te)), he(e, r), n === 1 && V === 0 && !(t.mode & 1) && (dn = K() + 500, yl && _t()));
}
function he(e, t) {
  var n = e.callbackNode;
  Pd(e, t);
  var r = Kr(e, e === b ? te : 0);
  if (r === 0) n !== null && Su(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Su(n), t === 1) e.tag === 0 ? Pf(ds.bind(null, e)) : xa(ds.bind(null, e)), Rf(function() {
      !(V & 6) && _t();
    }), n = null;
    else {
      switch (ta(r)) {
        case 1:
          n = wi;
          break;
        case 4:
          n = Js;
          break;
        case 16:
          n = Qr;
          break;
        case 536870912:
          n = bs;
          break;
        default:
          n = Qr;
      }
      n = kc(n, hc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function hc(e, t) {
  if (Hr = -1, jr = 0, V & 6) throw Error(w(327));
  var n = e.callbackNode;
  if (rn() && e.callbackNode !== n) return null;
  var r = Kr(e, e === b ? te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = dl(e, r);
  else {
    t = r;
    var l = V;
    V |= 2;
    var o = Sc();
    (b !== e || te !== t) && (Ge = null, dn = K() + 500, zt(e, t));
    do
      try {
        Xf();
        break;
      } catch (u) {
        yc(e, u);
      }
    while (!0);
    Li(), sl.current = o, V = l, X !== null ? t = 0 : (b = null, te = 0, t = q);
  }
  if (t !== 0) {
    if (t === 2 && (l = Fo(e), l !== 0 && (r = l, t = ni(e, l))), t === 1) throw n = rr, zt(e, 0), ot(e, r), he(e, K()), n;
    if (t === 6) ot(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Qf(l) && (t = dl(e, r), t === 2 && (o = Fo(e), o !== 0 && (r = o, t = ni(e, o))), t === 1)) throw n = rr, zt(e, 0), ot(e, r), he(e, K()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(w(345));
        case 2:
          xt(e, pe, Ge);
          break;
        case 3:
          if (ot(e, r), (r & 130023424) === r && (t = Xi + 500 - K(), 10 < t)) {
            if (Kr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ae(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Do(xt.bind(null, e, pe, Ge), t);
            break;
          }
          xt(e, pe, Ge);
          break;
        case 4:
          if (ot(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Ve(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = K() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Wf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Do(xt.bind(null, e, pe, Ge), r);
            break;
          }
          xt(e, pe, Ge);
          break;
        case 5:
          xt(e, pe, Ge);
          break;
        default:
          throw Error(w(329));
      }
    }
  }
  return he(e, K()), e.callbackNode === n ? hc.bind(null, e) : null;
}
function ni(e, t) {
  var n = On;
  return e.current.memoizedState.isDehydrated && (zt(e, t).flags |= 256), e = dl(e, t), e !== 2 && (t = pe, pe = n, t !== null && ri(t)), e;
}
function ri(e) {
  pe === null ? pe = e : pe.push.apply(pe, e);
}
function Qf(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Oe(o(), l)) return !1;
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
function ot(e, t) {
  for (t &= ~Ki, t &= ~_l, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ve(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ds(e) {
  if (V & 6) throw Error(w(327));
  rn();
  var t = Kr(e, 0);
  if (!(t & 1)) return he(e, K()), null;
  var n = dl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Fo(e);
    r !== 0 && (t = r, n = ni(e, r));
  }
  if (n === 1) throw n = rr, zt(e, 0), ot(e, t), he(e, K()), n;
  if (n === 6) throw Error(w(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, xt(e, pe, Ge), he(e, K()), null;
}
function Yi(e, t) {
  var n = V;
  V |= 1;
  try {
    return e(t);
  } finally {
    V = n, V === 0 && (dn = K() + 500, yl && _t());
  }
}
function Dt(e) {
  ut !== null && ut.tag === 0 && !(V & 6) && rn();
  var t = V;
  V |= 1;
  var n = Fe.transition, r = D;
  try {
    if (Fe.transition = null, D = 1, e) return e();
  } finally {
    D = r, Fe.transition = n, V = t, !(V & 6) && _t();
  }
}
function qi() {
  ye = Zt.current, A(Zt);
}
function zt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, _f(n)), X !== null) for (n = X.return; n !== null; ) {
    var r = n;
    switch (zi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Jr();
        break;
      case 3:
        an(), A(me), A(ue), Ai();
        break;
      case 5:
        Oi(r);
        break;
      case 4:
        an();
        break;
      case 13:
        A(U);
        break;
      case 19:
        A(U);
        break;
      case 10:
        Ni(r.type._context);
        break;
      case 22:
      case 23:
        qi();
    }
    n = n.return;
  }
  if (b = e, X = e = vt(e.current, null), te = ye = t, q = 0, rr = null, Ki = _l = Vt = 0, pe = On = null, Ft !== null) {
    for (t = 0; t < Ft.length; t++) if (n = Ft[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    Ft = null;
  }
  return e;
}
function yc(e, t) {
  do {
    var n = X;
    try {
      if (Li(), Tr.current = ul, il) {
        for (var r = B.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        il = !1;
      }
      if (Nt = 0, J = Y = B = null, Dn = !1, er = 0, Qi.current = null, n === null || n.return === null) {
        q = 1, rr = t, X = null;
        break;
      }
      e: {
        var o = e, i = n.return, u = n, s = t;
        if (t = te, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var a = s, p = u, v = p.tag;
          if (!(p.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var d = p.alternate;
            d ? (p.updateQueue = d.updateQueue, p.memoizedState = d.memoizedState, p.lanes = d.lanes) : (p.updateQueue = null, p.memoizedState = null);
          }
          var g = Ju(i);
          if (g !== null) {
            g.flags &= -257, bu(g, i, u, o, t), g.mode & 1 && Zu(o, a, t), t = g, s = a;
            var h = t.updateQueue;
            if (h === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(s), t.updateQueue = y;
            } else h.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Zu(o, a, t), Zi();
              break e;
            }
            s = Error(w(426));
          }
        } else if (H && u.mode & 1) {
          var E = Ju(i);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256), bu(E, i, u, o, t), Ii(cn(s, u));
            break e;
          }
        }
        o = s = cn(s, u), q !== 4 && (q = 2), On === null ? On = [o] : On.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = tc(o, s, t);
              Wu(o, f);
              break e;
            case 1:
              u = s;
              var c = o.type, m = o.stateNode;
              if (!(o.flags & 128) && (typeof c.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (gt === null || !gt.has(m)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var S = nc(o, u, t);
                Wu(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Cc(n);
    } catch (C) {
      t = C, X === n && n !== null && (X = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Sc() {
  var e = sl.current;
  return sl.current = ul, e === null ? ul : e;
}
function Zi() {
  (q === 0 || q === 3 || q === 2) && (q = 4), b === null || !(Vt & 268435455) && !(_l & 268435455) || ot(b, te);
}
function dl(e, t) {
  var n = V;
  V |= 2;
  var r = Sc();
  (b !== e || te !== t) && (Ge = null, zt(e, t));
  do
    try {
      Kf();
      break;
    } catch (l) {
      yc(e, l);
    }
  while (!0);
  if (Li(), V = n, sl.current = r, X !== null) throw Error(w(261));
  return b = null, te = 0, q;
}
function Kf() {
  for (; X !== null; ) wc(X);
}
function Xf() {
  for (; X !== null && !yd(); ) wc(X);
}
function wc(e) {
  var t = Rc(e.alternate, e, ye);
  e.memoizedProps = e.pendingProps, t === null ? Cc(e) : X = t, Qi.current = null;
}
function Cc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = jf(n, t), n !== null) {
        n.flags &= 32767, X = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        q = 6, X = null;
        return;
      }
    } else if (n = Hf(n, t, ye), n !== null) {
      X = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      X = t;
      return;
    }
    X = t = e;
  } while (t !== null);
  q === 0 && (q = 5);
}
function xt(e, t, n) {
  var r = D, l = Fe.transition;
  try {
    Fe.transition = null, D = 1, Yf(e, t, n, r);
  } finally {
    Fe.transition = l, D = r;
  }
  return null;
}
function Yf(e, t, n, r) {
  do
    rn();
  while (ut !== null);
  if (V & 6) throw Error(w(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(w(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Fd(e, o), e === b && (X = b = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xr || (xr = !0, kc(Qr, function() {
    return rn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Fe.transition, Fe.transition = null;
    var i = D;
    D = 1;
    var u = V;
    V |= 4, Qi.current = null, Bf(e, n), mc(n, e), mf(No), Xr = !!Lo, No = Lo = null, e.current = n, Gf(n), Sd(), V = u, D = i, Fe.transition = o;
  } else e.current = n;
  if (xr && (xr = !1, ut = e, cl = l), o = e.pendingLanes, o === 0 && (gt = null), _d(n.stateNode), he(e, K()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (al) throw al = !1, e = ei, ei = null, e;
  return cl & 1 && e.tag !== 0 && rn(), o = e.pendingLanes, o & 1 ? e === ti ? An++ : (An = 0, ti = e) : An = 0, _t(), null;
}
function rn() {
  if (ut !== null) {
    var e = ta(cl), t = Fe.transition, n = D;
    try {
      if (Fe.transition = null, D = 16 > e ? 16 : e, ut === null) var r = !1;
      else {
        if (e = ut, ut = null, cl = 0, V & 6) throw Error(w(331));
        var l = V;
        for (V |= 4, _ = e.current; _ !== null; ) {
          var o = _, i = o.child;
          if (_.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var a = u[s];
                for (_ = a; _ !== null; ) {
                  var p = _;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Tn(8, p, o);
                  }
                  var v = p.child;
                  if (v !== null) v.return = p, _ = v;
                  else for (; _ !== null; ) {
                    p = _;
                    var d = p.sibling, g = p.return;
                    if (fc(p), p === a) {
                      _ = null;
                      break;
                    }
                    if (d !== null) {
                      d.return = g, _ = d;
                      break;
                    }
                    _ = g;
                  }
                }
              }
              var h = o.alternate;
              if (h !== null) {
                var y = h.child;
                if (y !== null) {
                  h.child = null;
                  do {
                    var E = y.sibling;
                    y.sibling = null, y = E;
                  } while (y !== null);
                }
              }
              _ = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, _ = i;
          else e: for (; _ !== null; ) {
            if (o = _, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Tn(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, _ = f;
              break e;
            }
            _ = o.return;
          }
        }
        var c = e.current;
        for (_ = c; _ !== null; ) {
          i = _;
          var m = i.child;
          if (i.subtreeFlags & 2064 && m !== null) m.return = i, _ = m;
          else e: for (i = c; _ !== null; ) {
            if (u = _, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  Cl(9, u);
              }
            } catch (C) {
              W(u, u.return, C);
            }
            if (u === i) {
              _ = null;
              break e;
            }
            var S = u.sibling;
            if (S !== null) {
              S.return = u.return, _ = S;
              break e;
            }
            _ = u.return;
          }
        }
        if (V = l, _t(), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
          Ue.onPostCommitFiberRoot(pl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      D = n, Fe.transition = t;
    }
  }
  return !1;
}
function fs(e, t, n) {
  t = cn(n, t), t = tc(e, t, 1), e = pt(e, t, 1), t = ae(), e !== null && (or(e, 1, t), he(e, t));
}
function W(e, t, n) {
  if (e.tag === 3) fs(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      fs(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gt === null || !gt.has(r))) {
        e = cn(n, e), e = nc(t, e, 1), t = pt(t, e, 1), e = ae(), t !== null && (or(t, 1, e), he(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function qf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ae(), e.pingedLanes |= e.suspendedLanes & n, b === e && (te & n) === n && (q === 4 || q === 3 && (te & 130023424) === te && 500 > K() - Xi ? zt(e, 0) : Ki |= n), he(e, t);
}
function _c(e, t) {
  t === 0 && (e.mode & 1 ? (t = vr, vr <<= 1, !(vr & 130023424) && (vr = 4194304)) : t = 1);
  var n = ae();
  e = Je(e, t), e !== null && (or(e, t, n), he(e, n));
}
function Zf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), _c(e, n);
}
function Jf(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(w(314));
  }
  r !== null && r.delete(t), _c(e, n);
}
var Rc;
Rc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || me.current) ge = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ge = !1, Af(e, t, n);
    ge = !!(e.flags & 131072);
  }
  else ge = !1, H && t.flags & 1048576 && Pa(t, tl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ar(e, t), e = t.pendingProps;
      var l = on(t, ue.current);
      nn(t, n), l = ji(null, t, r, e, l, n);
      var o = Ui();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (o = !0, br(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Di(t), l.updater = wl, t.stateNode = l, l._reactInternals = t, Bo(t, r, e, n), t = Qo(null, t, r, !0, o, n)) : (t.tag = 0, H && o && Mi(t), se(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ar(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = ep(r), e = $e(r, e), l) {
          case 0:
            t = Wo(null, t, r, e, n);
            break e;
          case 1:
            t = ns(null, t, r, e, n);
            break e;
          case 11:
            t = es(null, t, r, e, n);
            break e;
          case 14:
            t = ts(null, t, r, $e(r.type, e), n);
            break e;
        }
        throw Error(w(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Wo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), ns(e, t, r, l, n);
    case 3:
      e: {
        if (ic(t), e === null) throw Error(w(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, La(e, t), ll(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = cn(Error(w(423)), t), t = rs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = cn(Error(w(424)), t), t = rs(e, t, r, n, l);
          break e;
        } else for (Se = ft(t.stateNode.containerInfo.firstChild), we = t, H = !0, Ne = null, n = Ia(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (un(), r === l) {
            t = be(e, t, n);
            break e;
          }
          se(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Na(t), e === null && Ho(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Vo(r, l) ? i = null : o !== null && Vo(r, o) && (t.flags |= 32), oc(e, t), se(e, t, i, n), t.child;
    case 6:
      return e === null && Ho(t), null;
    case 13:
      return uc(e, t, n);
    case 4:
      return Ti(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = sn(t, null, r, n) : se(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), es(e, t, r, l, n);
    case 7:
      return se(e, t, t.pendingProps, n), t.child;
    case 8:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, T(nl, r._currentValue), r._currentValue = i, o !== null) if (Oe(o.value, i)) {
          if (o.children === l.children && !me.current) {
            t = be(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var s = u.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = Ye(-1, n & -n), s.tag = 2;
                  var a = o.updateQueue;
                  if (a !== null) {
                    a = a.shared;
                    var p = a.pending;
                    p === null ? s.next = s : (s.next = p.next, p.next = s), a.pending = s;
                  }
                }
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), jo(
                  o.return,
                  n,
                  t
                ), u.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(w(341));
            i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), jo(i, n, t), i = o.sibling;
          } else i = o.child;
          if (i !== null) i.return = o;
          else for (i = o; i !== null; ) {
            if (i === t) {
              i = null;
              break;
            }
            if (o = i.sibling, o !== null) {
              o.return = i.return, i = o;
              break;
            }
            i = i.return;
          }
          o = i;
        }
        se(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, nn(t, n), l = Me(l), r = r(l), t.flags |= 1, se(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = $e(r, t.pendingProps), l = $e(r.type, l), ts(e, t, r, l, n);
    case 15:
      return rc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Ar(e, t), t.tag = 1, ve(r) ? (e = !0, br(t)) : e = !1, nn(t, n), ec(t, r, l), Bo(t, r, l, n), Qo(null, t, r, !0, e, n);
    case 19:
      return sc(e, t, n);
    case 22:
      return lc(e, t, n);
  }
  throw Error(w(156, t.tag));
};
function kc(e, t) {
  return Zs(e, t);
}
function bf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new bf(e, t, n, r);
}
function Ji(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function ep(e) {
  if (typeof e == "function") return Ji(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === hi) return 11;
    if (e === yi) return 14;
  }
  return 2;
}
function vt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ur(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Ji(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case jt:
      return It(n.children, l, o, t);
    case vi:
      i = 8, l |= 8;
      break;
    case po:
      return e = Pe(12, n, t, l | 2), e.elementType = po, e.lanes = o, e;
    case go:
      return e = Pe(13, n, t, l), e.elementType = go, e.lanes = o, e;
    case mo:
      return e = Pe(19, n, t, l), e.elementType = mo, e.lanes = o, e;
    case Ns:
      return Rl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case $s:
          i = 10;
          break e;
        case Ls:
          i = 9;
          break e;
        case hi:
          i = 11;
          break e;
        case yi:
          i = 14;
          break e;
        case nt:
          i = 16, r = null;
          break e;
      }
      throw Error(w(130, e == null ? e : typeof e, ""));
  }
  return t = Pe(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function It(e, t, n, r) {
  return e = Pe(7, e, r, t), e.lanes = n, e;
}
function Rl(e, t, n, r) {
  return e = Pe(22, e, r, t), e.elementType = Ns, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function no(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function ro(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function tp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Tl(0), this.expirationTimes = Tl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function bi(e, t, n, r, l, o, i, u, s) {
  return e = new tp(e, t, n, u, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Pe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Di(o), e;
}
function np(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ht, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Ec(e) {
  if (!e) return yt;
  e = e._reactInternals;
  e: {
    if (Ot(e) !== e || e.tag !== 1) throw Error(w(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(w(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return Ea(e, n, t);
  }
  return t;
}
function xc(e, t, n, r, l, o, i, u, s) {
  return e = bi(n, r, !0, e, l, o, i, u, s), e.context = Ec(null), n = e.current, r = ae(), l = mt(n), o = Ye(r, l), o.callback = t ?? null, pt(n, o, l), e.current.lanes = l, or(e, l, r), he(e, r), e;
}
function kl(e, t, n, r) {
  var l = t.current, o = ae(), i = mt(l);
  return n = Ec(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ye(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = pt(l, t, i), e !== null && (De(e, l, i, o), Dr(e, l, i)), i;
}
function fl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ps(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function eu(e, t) {
  ps(e, t), (e = e.alternate) && ps(e, t);
}
function rp() {
  return null;
}
var Pc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function tu(e) {
  this._internalRoot = e;
}
El.prototype.render = tu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(w(409));
  kl(e, t, null, null);
};
El.prototype.unmount = tu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Dt(function() {
      kl(null, e, null, null);
    }), t[Ze] = null;
  }
};
function El(e) {
  this._internalRoot = e;
}
El.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = la();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < lt.length && t !== 0 && t < lt[n].priority; n++) ;
    lt.splice(n, 0, e), n === 0 && ia(e);
  }
};
function nu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function xl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function gs() {
}
function lp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var a = fl(i);
        o.call(a);
      };
    }
    var i = xc(t, r, e, 0, null, !1, !1, "", gs);
    return e._reactRootContainer = i, e[Ze] = i.current, Yn(e.nodeType === 8 ? e.parentNode : e), Dt(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var a = fl(s);
      u.call(a);
    };
  }
  var s = bi(e, 0, !1, null, null, !1, !1, "", gs);
  return e._reactRootContainer = s, e[Ze] = s.current, Yn(e.nodeType === 8 ? e.parentNode : e), Dt(function() {
    kl(t, s, n, r);
  }), s;
}
function Pl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = fl(i);
        u.call(s);
      };
    }
    kl(t, i, e, l);
  } else i = lp(n, t, e, l, r);
  return fl(i);
}
na = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Mn(t.pendingLanes);
        n !== 0 && (Ci(t, n | 1), he(t, K()), !(V & 6) && (dn = K() + 500, _t()));
      }
      break;
    case 13:
      Dt(function() {
        var r = Je(e, 1);
        if (r !== null) {
          var l = ae();
          De(r, e, 1, l);
        }
      }), eu(e, 1);
  }
};
_i = function(e) {
  if (e.tag === 13) {
    var t = Je(e, 134217728);
    if (t !== null) {
      var n = ae();
      De(t, e, 134217728, n);
    }
    eu(e, 134217728);
  }
};
ra = function(e) {
  if (e.tag === 13) {
    var t = mt(e), n = Je(e, t);
    if (n !== null) {
      var r = ae();
      De(n, e, t, r);
    }
    eu(e, t);
  }
};
la = function() {
  return D;
};
oa = function(e, t) {
  var n = D;
  try {
    return D = e, t();
  } finally {
    D = n;
  }
};
Eo = function(e, t, n) {
  switch (t) {
    case "input":
      if (yo(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = hl(r);
            if (!l) throw Error(w(90));
            Ds(r), yo(r, l);
          }
        }
      }
      break;
    case "textarea":
      Os(e, n);
      break;
    case "select":
      t = n.value, t != null && Jt(e, !!n.multiple, t, !1);
  }
};
Ws = Yi;
Qs = Dt;
var op = { usingClientEntryPoint: !1, Events: [ur, Wt, hl, Bs, Gs, Yi] }, kn = { findFiberByHostInstance: Pt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ip = { bundleType: kn.bundleType, version: kn.version, rendererPackageName: kn.rendererPackageName, rendererConfig: kn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: et.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ys(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: kn.findFiberByHostInstance || rp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Pr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Pr.isDisabled && Pr.supportsFiber) try {
    pl = Pr.inject(ip), Ue = Pr;
  } catch {
  }
}
Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = op;
Re.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!nu(t)) throw Error(w(200));
  return np(e, t, null, n);
};
Re.createRoot = function(e, t) {
  if (!nu(e)) throw Error(w(299));
  var n = !1, r = "", l = Pc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = bi(e, 1, !1, null, null, n, !1, r, l), e[Ze] = t.current, Yn(e.nodeType === 8 ? e.parentNode : e), new tu(t);
};
Re.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(w(188)) : (e = Object.keys(e).join(","), Error(w(268, e)));
  return e = Ys(t), e = e === null ? null : e.stateNode, e;
};
Re.flushSync = function(e) {
  return Dt(e);
};
Re.hydrate = function(e, t, n) {
  if (!xl(t)) throw Error(w(200));
  return Pl(null, e, t, !0, n);
};
Re.hydrateRoot = function(e, t, n) {
  if (!nu(e)) throw Error(w(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = Pc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = xc(t, null, e, 1, n ?? null, l, !1, o, i), e[Ze] = t.current, Yn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new El(t);
};
Re.render = function(e, t, n) {
  if (!xl(t)) throw Error(w(200));
  return Pl(null, e, t, !1, n);
};
Re.unmountComponentAtNode = function(e) {
  if (!xl(e)) throw Error(w(40));
  return e._reactRootContainer ? (Dt(function() {
    Pl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ze] = null;
    });
  }), !0) : !1;
};
Re.unstable_batchedUpdates = Yi;
Re.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!xl(n)) throw Error(w(200));
  if (e == null || e._reactInternals === void 0) throw Error(w(38));
  return Pl(e, t, n, !1, r);
};
Re.version = "18.3.1-next-f1338f8080-20240426";
function Fc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fc);
    } catch (e) {
      console.error(e);
    }
}
Fc(), Fs.exports = Re;
var up = Fs.exports, Mc, ms = up;
Mc = ms.createRoot, ms.hydrateRoot;
let zc = $.createContext(
  /** @type {any} */
  null
);
function sp() {
  let e = $.useContext(zc);
  if (!e) throw new Error("RenderContext not found");
  return e;
}
function ap() {
  return sp().model;
}
function En(e) {
  let t = ap(), [n, r] = $.useState(t.get(e));
  return $.useEffect(() => {
    let l = () => r(t.get(e));
    return t.on(`change:${e}`, l), () => t.off(`change:${e}`, l);
  }, [t, e]), [
    n,
    (l) => {
      t.set(e, l), t.save_changes();
    }
  ];
}
function cp(e) {
  return ({ el: t, model: n, experimental: r }) => {
    let l = Mc(t);
    return l.render(
      $.createElement(
        $.StrictMode,
        null,
        $.createElement(
          zc.Provider,
          { value: { model: n, experimental: r } },
          $.createElement(e)
        )
      )
    ), () => l.unmount();
  };
}
/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function st(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function _e(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: st(n, r[e])
    }));
  };
}
function Fl(e) {
  return e instanceof Function;
}
function dp(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function fp(e, t) {
  const n = [], r = (l) => {
    l.forEach((o) => {
      n.push(o);
      const i = t(o);
      i != null && i.length && r(i);
    });
  };
  return r(e), n;
}
function F(e, t, n) {
  let r = [], l;
  return (o) => {
    let i;
    n.key && n.debug && (i = Date.now());
    const u = e(o);
    if (!(u.length !== r.length || u.some((p, v) => r[v] !== p)))
      return l;
    r = u;
    let a;
    if (n.key && n.debug && (a = Date.now()), l = t(...u), n == null || n.onChange == null || n.onChange(l), n.key && n.debug && n != null && n.debug()) {
      const p = Math.round((Date.now() - i) * 100) / 100, v = Math.round((Date.now() - a) * 100) / 100, d = v / 16, g = (h, y) => {
        for (h = String(h); h.length < y; )
          h = " " + h;
        return h;
      };
      console.info(`%c⏱ ${g(v, 5)} /${g(p, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * d, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return l;
  };
}
function M(e, t, n, r) {
  return {
    debug: () => {
      var l;
      return (l = e == null ? void 0 : e.debugAll) != null ? l : e[t];
    },
    key: !1,
    onChange: r
  };
}
function pp(e, t, n, r) {
  const l = () => {
    var i;
    return (i = o.getValue()) != null ? i : e.options.renderFallbackValue;
  }, o = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: l,
    getContext: F(() => [e, n, t, o], (i, u, s, a) => ({
      table: i,
      column: u,
      row: s,
      cell: a,
      getValue: a.getValue,
      renderValue: a.renderValue
    }), M(e.options, "debugCells"))
  };
  return e._features.forEach((i) => {
    i.createCell == null || i.createCell(o, n, t, e);
  }, {}), o;
}
function gp(e, t, n, r) {
  var l, o;
  const u = {
    ...e._getDefaultColumnDef(),
    ...t
  }, s = u.accessorKey;
  let a = (l = (o = u.id) != null ? o : s ? typeof String.prototype.replaceAll == "function" ? s.replaceAll(".", "_") : s.replace(/\./g, "_") : void 0) != null ? l : typeof u.header == "string" ? u.header : void 0, p;
  if (u.accessorFn ? p = u.accessorFn : s && (s.includes(".") ? p = (d) => {
    let g = d;
    for (const y of s.split(".")) {
      var h;
      g = (h = g) == null ? void 0 : h[y];
    }
    return g;
  } : p = (d) => d[u.accessorKey]), !a)
    throw new Error();
  let v = {
    id: `${String(a)}`,
    accessorFn: p,
    parent: r,
    depth: n,
    columnDef: u,
    columns: [],
    getFlatColumns: F(() => [!0], () => {
      var d;
      return [v, ...(d = v.columns) == null ? void 0 : d.flatMap((g) => g.getFlatColumns())];
    }, M(e.options, "debugColumns")),
    getLeafColumns: F(() => [e._getOrderColumnsFn()], (d) => {
      var g;
      if ((g = v.columns) != null && g.length) {
        let h = v.columns.flatMap((y) => y.getLeafColumns());
        return d(h);
      }
      return [v];
    }, M(e.options, "debugColumns"))
  };
  for (const d of e._features)
    d.createColumn == null || d.createColumn(v, e);
  return v;
}
const oe = "debugHeaders";
function vs(e, t, n) {
  var r;
  let o = {
    id: (r = n.id) != null ? r : t.id,
    column: t,
    index: n.index,
    isPlaceholder: !!n.isPlaceholder,
    placeholderId: n.placeholderId,
    depth: n.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const i = [], u = (s) => {
        s.subHeaders && s.subHeaders.length && s.subHeaders.map(u), i.push(s);
      };
      return u(o), i;
    },
    getContext: () => ({
      table: e,
      header: o,
      column: t
    })
  };
  return e._features.forEach((i) => {
    i.createHeader == null || i.createHeader(o, e);
  }), o;
}
const mp = {
  createTable: (e) => {
    e.getHeaderGroups = F(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, l) => {
      var o, i;
      const u = (o = r == null ? void 0 : r.map((v) => n.find((d) => d.id === v)).filter(Boolean)) != null ? o : [], s = (i = l == null ? void 0 : l.map((v) => n.find((d) => d.id === v)).filter(Boolean)) != null ? i : [], a = n.filter((v) => !(r != null && r.includes(v.id)) && !(l != null && l.includes(v.id)));
      return Fr(t, [...u, ...a, ...s], e);
    }, M(e.options, oe)), e.getCenterHeaderGroups = F(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, l) => (n = n.filter((o) => !(r != null && r.includes(o.id)) && !(l != null && l.includes(o.id))), Fr(t, n, e, "center")), M(e.options, oe)), e.getLeftHeaderGroups = F(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var l;
      const o = (l = r == null ? void 0 : r.map((i) => n.find((u) => u.id === i)).filter(Boolean)) != null ? l : [];
      return Fr(t, o, e, "left");
    }, M(e.options, oe)), e.getRightHeaderGroups = F(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var l;
      const o = (l = r == null ? void 0 : r.map((i) => n.find((u) => u.id === i)).filter(Boolean)) != null ? l : [];
      return Fr(t, o, e, "right");
    }, M(e.options, oe)), e.getFooterGroups = F(() => [e.getHeaderGroups()], (t) => [...t].reverse(), M(e.options, oe)), e.getLeftFooterGroups = F(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), M(e.options, oe)), e.getCenterFooterGroups = F(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), M(e.options, oe)), e.getRightFooterGroups = F(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), M(e.options, oe)), e.getFlatHeaders = F(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), M(e.options, oe)), e.getLeftFlatHeaders = F(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), M(e.options, oe)), e.getCenterFlatHeaders = F(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), M(e.options, oe)), e.getRightFlatHeaders = F(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), M(e.options, oe)), e.getCenterLeafHeaders = F(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), M(e.options, oe)), e.getLeftLeafHeaders = F(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), M(e.options, oe)), e.getRightLeafHeaders = F(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), M(e.options, oe)), e.getLeafHeaders = F(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var l, o, i, u, s, a;
      return [...(l = (o = t[0]) == null ? void 0 : o.headers) != null ? l : [], ...(i = (u = n[0]) == null ? void 0 : u.headers) != null ? i : [], ...(s = (a = r[0]) == null ? void 0 : a.headers) != null ? s : []].map((p) => p.getLeafHeaders()).flat();
    }, M(e.options, oe));
  }
};
function Fr(e, t, n, r) {
  var l, o;
  let i = 0;
  const u = function(d, g) {
    g === void 0 && (g = 1), i = Math.max(i, g), d.filter((h) => h.getIsVisible()).forEach((h) => {
      var y;
      (y = h.columns) != null && y.length && u(h.columns, g + 1);
    }, 0);
  };
  u(e);
  let s = [];
  const a = (d, g) => {
    const h = {
      depth: g,
      id: [r, `${g}`].filter(Boolean).join("_"),
      headers: []
    }, y = [];
    d.forEach((E) => {
      const f = [...y].reverse()[0], c = E.column.depth === h.depth;
      let m, S = !1;
      if (c && E.column.parent ? m = E.column.parent : (m = E.column, S = !0), f && (f == null ? void 0 : f.column) === m)
        f.subHeaders.push(E);
      else {
        const C = vs(n, m, {
          id: [r, g, m.id, E == null ? void 0 : E.id].filter(Boolean).join("_"),
          isPlaceholder: S,
          placeholderId: S ? `${y.filter((R) => R.column === m).length}` : void 0,
          depth: g,
          index: y.length
        });
        C.subHeaders.push(E), y.push(C);
      }
      h.headers.push(E), E.headerGroup = h;
    }), s.push(h), g > 0 && a(y, g - 1);
  }, p = t.map((d, g) => vs(n, d, {
    depth: i,
    index: g
  }));
  a(p, i - 1), s.reverse();
  const v = (d) => d.filter((h) => h.column.getIsVisible()).map((h) => {
    let y = 0, E = 0, f = [0];
    h.subHeaders && h.subHeaders.length ? (f = [], v(h.subHeaders).forEach((m) => {
      let {
        colSpan: S,
        rowSpan: C
      } = m;
      y += S, f.push(C);
    })) : y = 1;
    const c = Math.min(...f);
    return E = E + c, h.colSpan = y, h.rowSpan = E, {
      colSpan: y,
      rowSpan: E
    };
  });
  return v((l = (o = s[0]) == null ? void 0 : o.headers) != null ? l : []), s;
}
const vp = (e, t, n, r, l, o, i) => {
  let u = {
    id: t,
    index: r,
    original: n,
    depth: l,
    parentId: i,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (s) => {
      if (u._valuesCache.hasOwnProperty(s))
        return u._valuesCache[s];
      const a = e.getColumn(s);
      if (a != null && a.accessorFn)
        return u._valuesCache[s] = a.accessorFn(u.original, r), u._valuesCache[s];
    },
    getUniqueValues: (s) => {
      if (u._uniqueValuesCache.hasOwnProperty(s))
        return u._uniqueValuesCache[s];
      const a = e.getColumn(s);
      if (a != null && a.accessorFn)
        return a.columnDef.getUniqueValues ? (u._uniqueValuesCache[s] = a.columnDef.getUniqueValues(u.original, r), u._uniqueValuesCache[s]) : (u._uniqueValuesCache[s] = [u.getValue(s)], u._uniqueValuesCache[s]);
    },
    renderValue: (s) => {
      var a;
      return (a = u.getValue(s)) != null ? a : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => fp(u.subRows, (s) => s.subRows),
    getParentRow: () => u.parentId ? e.getRow(u.parentId, !0) : void 0,
    getParentRows: () => {
      let s = [], a = u;
      for (; ; ) {
        const p = a.getParentRow();
        if (!p) break;
        s.push(p), a = p;
      }
      return s.reverse();
    },
    getAllCells: F(() => [e.getAllLeafColumns()], (s) => s.map((a) => pp(e, u, a, a.id)), M(e.options, "debugRows")),
    _getAllCellsByColumnId: F(() => [u.getAllCells()], (s) => s.reduce((a, p) => (a[p.column.id] = p, a), {}), M(e.options, "debugRows"))
  };
  for (let s = 0; s < e._features.length; s++) {
    const a = e._features[s];
    a == null || a.createRow == null || a.createRow(u, e);
  }
  return u;
}, hp = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, Ic = (e, t, n) => {
  var r, l;
  const o = n == null || (r = n.toString()) == null ? void 0 : r.toLowerCase();
  return !!(!((l = e.getValue(t)) == null || (l = l.toString()) == null || (l = l.toLowerCase()) == null) && l.includes(o));
};
Ic.autoRemove = (e) => Te(e);
const $c = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
$c.autoRemove = (e) => Te(e);
const Lc = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Lc.autoRemove = (e) => Te(e);
const Nc = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
Nc.autoRemove = (e) => Te(e) || !(e != null && e.length);
const Vc = (e, t, n) => !n.some((r) => {
  var l;
  return !((l = e.getValue(t)) != null && l.includes(r));
});
Vc.autoRemove = (e) => Te(e) || !(e != null && e.length);
const Dc = (e, t, n) => n.some((r) => {
  var l;
  return (l = e.getValue(t)) == null ? void 0 : l.includes(r);
});
Dc.autoRemove = (e) => Te(e) || !(e != null && e.length);
const Tc = (e, t, n) => e.getValue(t) === n;
Tc.autoRemove = (e) => Te(e);
const Oc = (e, t, n) => e.getValue(t) == n;
Oc.autoRemove = (e) => Te(e);
const ru = (e, t, n) => {
  let [r, l] = n;
  const o = e.getValue(t);
  return o >= r && o <= l;
};
ru.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, l = typeof n != "number" ? parseFloat(n) : n, o = t === null || Number.isNaN(r) ? -1 / 0 : r, i = n === null || Number.isNaN(l) ? 1 / 0 : l;
  if (o > i) {
    const u = o;
    o = i, i = u;
  }
  return [o, i];
};
ru.autoRemove = (e) => Te(e) || Te(e[0]) && Te(e[1]);
const We = {
  includesString: Ic,
  includesStringSensitive: $c,
  equalsString: Lc,
  arrIncludes: Nc,
  arrIncludesAll: Vc,
  arrIncludesSome: Dc,
  equals: Tc,
  weakEquals: Oc,
  inNumberRange: ru
};
function Te(e) {
  return e == null || e === "";
}
const yp = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: _e("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? We.includesString : typeof r == "number" ? We.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? We.equals : Array.isArray(r) ? We.arrIncludes : We.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return Fl(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : We[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var n, r, l;
      return ((n = e.columnDef.enableColumnFilter) != null ? n : !0) && ((r = t.options.enableColumnFilters) != null ? r : !0) && ((l = t.options.enableFilters) != null ? l : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var n;
      return (n = t.getState().columnFilters) == null || (n = n.find((r) => r.id === e.id)) == null ? void 0 : n.value;
    }, e.getFilterIndex = () => {
      var n, r;
      return (n = (r = t.getState().columnFilters) == null ? void 0 : r.findIndex((l) => l.id === e.id)) != null ? n : -1;
    }, e.setFilterValue = (n) => {
      t.setColumnFilters((r) => {
        const l = e.getFilterFn(), o = r == null ? void 0 : r.find((p) => p.id === e.id), i = st(n, o ? o.value : void 0);
        if (hs(l, i, e)) {
          var u;
          return (u = r == null ? void 0 : r.filter((p) => p.id !== e.id)) != null ? u : [];
        }
        const s = {
          id: e.id,
          value: i
        };
        if (o) {
          var a;
          return (a = r == null ? void 0 : r.map((p) => p.id === e.id ? s : p)) != null ? a : [];
        }
        return r != null && r.length ? [...r, s] : [s];
      });
    };
  },
  createRow: (e, t) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (t) => {
      const n = e.getAllLeafColumns(), r = (l) => {
        var o;
        return (o = st(t, l)) == null ? void 0 : o.filter((i) => {
          const u = n.find((s) => s.id === i.id);
          if (u) {
            const s = u.getFilterFn();
            if (hs(s, i.value, u))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(r);
    }, e.resetColumnFilters = (t) => {
      var n, r;
      e.setColumnFilters(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.columnFilters) != null ? n : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function hs(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Sp = (e, t, n) => n.reduce((r, l) => {
  const o = l.getValue(e);
  return r + (typeof o == "number" ? o : 0);
}, 0), wp = (e, t, n) => {
  let r;
  return n.forEach((l) => {
    const o = l.getValue(e);
    o != null && (r > o || r === void 0 && o >= o) && (r = o);
  }), r;
}, Cp = (e, t, n) => {
  let r;
  return n.forEach((l) => {
    const o = l.getValue(e);
    o != null && (r < o || r === void 0 && o >= o) && (r = o);
  }), r;
}, _p = (e, t, n) => {
  let r, l;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r === void 0 ? i >= i && (r = l = i) : (r > i && (r = i), l < i && (l = i)));
  }), [r, l];
}, Rp = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((l) => {
    let o = l.getValue(e);
    o != null && (o = +o) >= o && (++n, r += o);
  }), n) return r / n;
}, kp = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((o) => o.getValue(e));
  if (!dp(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), l = n.sort((o, i) => o - i);
  return n.length % 2 !== 0 ? l[r] : (l[r - 1] + l[r]) / 2;
}, Ep = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), xp = (e, t) => new Set(t.map((n) => n.getValue(e))).size, Pp = (e, t) => t.length, lo = {
  sum: Sp,
  min: wp,
  max: Cp,
  extent: _p,
  mean: Rp,
  median: kp,
  unique: Ep,
  uniqueCount: xp,
  count: Pp
}, Fp = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var t, n;
      return (t = (n = e.getValue()) == null || n.toString == null ? void 0 : n.toString()) != null ? t : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: _e("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, t) => {
    e.toggleGrouping = () => {
      t.setGrouping((n) => n != null && n.includes(e.id) ? n.filter((r) => r !== e.id) : [...n ?? [], e.id]);
    }, e.getCanGroup = () => {
      var n, r;
      return ((n = e.columnDef.enableGrouping) != null ? n : !0) && ((r = t.options.enableGrouping) != null ? r : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.includes(e.id);
    }, e.getGroupedIndex = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const n = e.getCanGroup();
      return () => {
        n && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      if (typeof r == "number")
        return lo.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return lo.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return Fl(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : lo[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (t) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(t), e.resetGrouping = (t) => {
      var n, r;
      e.setGrouping(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.grouping) != null ? n : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, t) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (n) => {
      if (e._groupingValuesCache.hasOwnProperty(n))
        return e._groupingValuesCache[n];
      const r = t.getColumn(n);
      return r != null && r.columnDef.getGroupingValue ? (e._groupingValuesCache[n] = r.columnDef.getGroupingValue(e.original), e._groupingValuesCache[n]) : e.getValue(n);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, t, n, r) => {
    e.getIsGrouped = () => t.getIsGrouped() && t.id === n.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped(), e.getIsAggregated = () => {
      var l;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((l = n.subRows) != null && l.length);
    };
  }
};
function Mp(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((o) => !t.includes(o.id));
  return n === "remove" ? r : [...t.map((o) => e.find((i) => i.id === o)).filter(Boolean), ...r];
}
const zp = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: _e("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = F((n) => [Hn(t, n)], (n) => n.findIndex((r) => r.id === e.id), M(t.options, "debugColumns")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = Hn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const l = Hn(t, n);
      return ((r = l[l.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = F(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (l) => {
      let o = [];
      if (!(t != null && t.length))
        o = l;
      else {
        const i = [...t], u = [...l];
        for (; u.length && i.length; ) {
          const s = i.shift(), a = u.findIndex((p) => p.id === s);
          a > -1 && o.push(u.splice(a, 1)[0]);
        }
        o = [...o, ...u];
      }
      return Mp(o, n, r);
    }, M(e.options, "debugTable"));
  }
}, oo = () => ({
  left: [],
  right: []
}), Ip = {
  getInitialState: (e) => ({
    columnPinning: oo(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: _e("columnPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const r = e.getLeafColumns().map((l) => l.id).filter(Boolean);
      t.setColumnPinning((l) => {
        var o, i;
        if (n === "right") {
          var u, s;
          return {
            left: ((u = l == null ? void 0 : l.left) != null ? u : []).filter((v) => !(r != null && r.includes(v))),
            right: [...((s = l == null ? void 0 : l.right) != null ? s : []).filter((v) => !(r != null && r.includes(v))), ...r]
          };
        }
        if (n === "left") {
          var a, p;
          return {
            left: [...((a = l == null ? void 0 : l.left) != null ? a : []).filter((v) => !(r != null && r.includes(v))), ...r],
            right: ((p = l == null ? void 0 : l.right) != null ? p : []).filter((v) => !(r != null && r.includes(v)))
          };
        }
        return {
          left: ((o = l == null ? void 0 : l.left) != null ? o : []).filter((v) => !(r != null && r.includes(v))),
          right: ((i = l == null ? void 0 : l.right) != null ? i : []).filter((v) => !(r != null && r.includes(v)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((r) => {
      var l, o, i;
      return ((l = r.columnDef.enablePinning) != null ? l : !0) && ((o = (i = t.options.enableColumnPinning) != null ? i : t.options.enablePinning) != null ? o : !0);
    }), e.getIsPinned = () => {
      const n = e.getLeafColumns().map((u) => u.id), {
        left: r,
        right: l
      } = t.getState().columnPinning, o = n.some((u) => r == null ? void 0 : r.includes(u)), i = n.some((u) => l == null ? void 0 : l.includes(u));
      return o ? "left" : i ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const l = e.getIsPinned();
      return l ? (n = (r = t.getState().columnPinning) == null || (r = r[l]) == null ? void 0 : r.indexOf(e.id)) != null ? n : -1 : 0;
    };
  },
  createRow: (e, t) => {
    e.getCenterVisibleCells = F(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, l) => {
      const o = [...r ?? [], ...l ?? []];
      return n.filter((i) => !o.includes(i.column.id));
    }, M(t.options, "debugRows")), e.getLeftVisibleCells = F(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((o) => n.find((i) => i.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "left"
    })), M(t.options, "debugRows")), e.getRightVisibleCells = F(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((o) => n.find((i) => i.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "right"
    })), M(t.options, "debugRows"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? oo() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : oo());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var l, o;
        return !!((l = r.left) != null && l.length || (o = r.right) != null && o.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = F(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((l) => l.id === r)).filter(Boolean), M(e.options, "debugColumns")), e.getRightLeafColumns = F(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((l) => l.id === r)).filter(Boolean), M(e.options, "debugColumns")), e.getCenterLeafColumns = F(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const l = [...n ?? [], ...r ?? []];
      return t.filter((o) => !l.includes(o.id));
    }, M(e.options, "debugColumns"));
  }
}, Mr = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, io = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), $p = {
  getDefaultColumnDef: () => Mr,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: io(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: _e("columnSizing", e),
    onColumnSizingInfoChange: _e("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, l;
      const o = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Mr.minSize, (r = o ?? e.columnDef.size) != null ? r : Mr.size), (l = e.columnDef.maxSize) != null ? l : Mr.maxSize);
    }, e.getStart = F((n) => [n, Hn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((l, o) => l + o.getSize(), 0), M(t.options, "debugColumns")), e.getAfter = F((n) => [n, Hn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((l, o) => l + o.getSize(), 0), M(t.options, "debugColumns")), e.resetSize = () => {
      t.setColumnSizing((n) => {
        let {
          [e.id]: r,
          ...l
        } = n;
        return l;
      });
    }, e.getCanResize = () => {
      var n, r;
      return ((n = e.columnDef.enableResizing) != null ? n : !0) && ((r = t.options.enableColumnResizing) != null ? r : !0);
    }, e.getIsResizing = () => t.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, t) => {
    e.getSize = () => {
      let n = 0;
      const r = (l) => {
        if (l.subHeaders.length)
          l.subHeaders.forEach(r);
        else {
          var o;
          n += (o = l.column.getSize()) != null ? o : 0;
        }
      };
      return r(e), n;
    }, e.getStart = () => {
      if (e.index > 0) {
        const n = e.headerGroup.headers[e.index - 1];
        return n.getStart() + n.getSize();
      }
      return 0;
    }, e.getResizeHandler = (n) => {
      const r = t.getColumn(e.column.id), l = r == null ? void 0 : r.getCanResize();
      return (o) => {
        if (!r || !l || (o.persist == null || o.persist(), uo(o) && o.touches && o.touches.length > 1))
          return;
        const i = e.getSize(), u = e ? e.getLeafHeaders().map((f) => [f.column.id, f.column.getSize()]) : [[r.id, r.getSize()]], s = uo(o) ? Math.round(o.touches[0].clientX) : o.clientX, a = {}, p = (f, c) => {
          typeof c == "number" && (t.setColumnSizingInfo((m) => {
            var S, C;
            const R = t.options.columnResizeDirection === "rtl" ? -1 : 1, x = (c - ((S = m == null ? void 0 : m.startOffset) != null ? S : 0)) * R, P = Math.max(x / ((C = m == null ? void 0 : m.startSize) != null ? C : 0), -0.999999);
            return m.columnSizingStart.forEach((j) => {
              let [L, fe] = j;
              a[L] = Math.round(Math.max(fe + fe * P, 0) * 100) / 100;
            }), {
              ...m,
              deltaOffset: x,
              deltaPercentage: P
            };
          }), (t.options.columnResizeMode === "onChange" || f === "end") && t.setColumnSizing((m) => ({
            ...m,
            ...a
          })));
        }, v = (f) => p("move", f), d = (f) => {
          p("end", f), t.setColumnSizingInfo((c) => ({
            ...c,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, g = n || typeof document < "u" ? document : null, h = {
          moveHandler: (f) => v(f.clientX),
          upHandler: (f) => {
            g == null || g.removeEventListener("mousemove", h.moveHandler), g == null || g.removeEventListener("mouseup", h.upHandler), d(f.clientX);
          }
        }, y = {
          moveHandler: (f) => (f.cancelable && (f.preventDefault(), f.stopPropagation()), v(f.touches[0].clientX), !1),
          upHandler: (f) => {
            var c;
            g == null || g.removeEventListener("touchmove", y.moveHandler), g == null || g.removeEventListener("touchend", y.upHandler), f.cancelable && (f.preventDefault(), f.stopPropagation()), d((c = f.touches[0]) == null ? void 0 : c.clientX);
          }
        }, E = Lp() ? {
          passive: !1
        } : !1;
        uo(o) ? (g == null || g.addEventListener("touchmove", y.moveHandler, E), g == null || g.addEventListener("touchend", y.upHandler, E)) : (g == null || g.addEventListener("mousemove", h.moveHandler, E), g == null || g.addEventListener("mouseup", h.upHandler, E)), t.setColumnSizingInfo((f) => ({
          ...f,
          startOffset: s,
          startSize: i,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: u,
          isResizingColumn: r.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (t) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(t), e.setColumnSizingInfo = (t) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(t), e.resetColumnSizing = (t) => {
      var n;
      e.setColumnSizing(t ? {} : (n = e.initialState.columnSizing) != null ? n : {});
    }, e.resetHeaderSizeInfo = (t) => {
      var n;
      e.setColumnSizingInfo(t ? io() : (n = e.initialState.columnSizingInfo) != null ? n : io());
    }, e.getTotalSize = () => {
      var t, n;
      return (t = (n = e.getHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, l) => r + l.getSize(), 0)) != null ? t : 0;
    }, e.getLeftTotalSize = () => {
      var t, n;
      return (t = (n = e.getLeftHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, l) => r + l.getSize(), 0)) != null ? t : 0;
    }, e.getCenterTotalSize = () => {
      var t, n;
      return (t = (n = e.getCenterHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, l) => r + l.getSize(), 0)) != null ? t : 0;
    }, e.getRightTotalSize = () => {
      var t, n;
      return (t = (n = e.getRightHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, l) => r + l.getSize(), 0)) != null ? t : 0;
    };
  }
};
let zr = null;
function Lp() {
  if (typeof zr == "boolean") return zr;
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    }, n = () => {
    };
    window.addEventListener("test", n, t), window.removeEventListener("test", n);
  } catch {
    e = !1;
  }
  return zr = e, zr;
}
function uo(e) {
  return e.type === "touchstart";
}
const Np = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: _e("columnVisibility", e)
  }),
  createColumn: (e, t) => {
    e.toggleVisibility = (n) => {
      e.getCanHide() && t.setColumnVisibility((r) => ({
        ...r,
        [e.id]: n ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var n, r;
      const l = e.columns;
      return (n = l.length ? l.some((o) => o.getIsVisible()) : (r = t.getState().columnVisibility) == null ? void 0 : r[e.id]) != null ? n : !0;
    }, e.getCanHide = () => {
      var n, r;
      return ((n = e.columnDef.enableHiding) != null ? n : !0) && ((r = t.options.enableHiding) != null ? r : !0);
    }, e.getToggleVisibilityHandler = () => (n) => {
      e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
    };
  },
  createRow: (e, t) => {
    e._getAllVisibleCells = F(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), M(t.options, "debugRows")), e.getVisibleCells = F(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, l) => [...n, ...r, ...l], M(t.options, "debugRows"));
  },
  createTable: (e) => {
    const t = (n, r) => F(() => [r(), r().filter((l) => l.getIsVisible()).map((l) => l.id).join("_")], (l) => l.filter((o) => o.getIsVisible == null ? void 0 : o.getIsVisible()), M(e.options, "debugColumns"));
    e.getVisibleFlatColumns = t("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = t("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = t("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = t("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = t("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (n) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(n), e.resetColumnVisibility = (n) => {
      var r;
      e.setColumnVisibility(n ? {} : (r = e.initialState.columnVisibility) != null ? r : {});
    }, e.toggleAllColumnsVisible = (n) => {
      var r;
      n = (r = n) != null ? r : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((l, o) => ({
        ...l,
        [o.id]: n || !(o.getCanHide != null && o.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((n) => !(n.getIsVisible != null && n.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((n) => n.getIsVisible == null ? void 0 : n.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (n) => {
      var r;
      e.toggleAllColumnsVisible((r = n.target) == null ? void 0 : r.checked);
    };
  }
};
function Hn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Vp = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Dp = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: _e("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (t) => {
      var n;
      const r = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[t.id]) == null ? void 0 : n.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (e, t) => {
    e.getCanGlobalFilter = () => {
      var n, r, l, o;
      return ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) && ((r = t.options.enableGlobalFilter) != null ? r : !0) && ((l = t.options.enableFilters) != null ? l : !0) && ((o = t.options.getColumnCanGlobalFilter == null ? void 0 : t.options.getColumnCanGlobalFilter(e)) != null ? o : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => We.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return Fl(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : We[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, Tp = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: _e("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetExpanded = () => {
      var r, l;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (l = e.options.autoResetAll) != null ? l : e.options.autoResetExpanded) != null ? r : !e.options.manualExpanding) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetExpanded(), n = !1;
        });
      }
    }, e.setExpanded = (r) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(r), e.toggleAllRowsExpanded = (r) => {
      r ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (r) => {
      var l, o;
      e.setExpanded(r ? {} : (l = (o = e.initialState) == null ? void 0 : o.expanded) != null ? l : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((r) => r.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (r) => {
      r.persist == null || r.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const r = e.getState().expanded;
      return r === !0 || Object.values(r).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const r = e.getState().expanded;
      return typeof r == "boolean" ? r === !0 : !(!Object.keys(r).length || e.getRowModel().flatRows.some((l) => !l.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let r = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((o) => {
        const i = o.split(".");
        r = Math.max(r, i.length);
      }), r;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, t) => {
    e.toggleExpanded = (n) => {
      t.setExpanded((r) => {
        var l;
        const o = r === !0 ? !0 : !!(r != null && r[e.id]);
        let i = {};
        if (r === !0 ? Object.keys(t.getRowModel().rowsById).forEach((u) => {
          i[u] = !0;
        }) : i = r, n = (l = n) != null ? l : !o, !o && n)
          return {
            ...i,
            [e.id]: !0
          };
        if (o && !n) {
          const {
            [e.id]: u,
            ...s
          } = i;
          return s;
        }
        return r;
      });
    }, e.getIsExpanded = () => {
      var n;
      const r = t.getState().expanded;
      return !!((n = t.options.getIsRowExpanded == null ? void 0 : t.options.getIsRowExpanded(e)) != null ? n : r === !0 || r != null && r[e.id]);
    }, e.getCanExpand = () => {
      var n, r, l;
      return (n = t.options.getRowCanExpand == null ? void 0 : t.options.getRowCanExpand(e)) != null ? n : ((r = t.options.enableExpanding) != null ? r : !0) && !!((l = e.subRows) != null && l.length);
    }, e.getIsAllParentsExpanded = () => {
      let n = !0, r = e;
      for (; n && r.parentId; )
        r = t.getRow(r.parentId, !0), n = r.getIsExpanded();
      return n;
    }, e.getToggleExpandedHandler = () => {
      const n = e.getCanExpand();
      return () => {
        n && e.toggleExpanded();
      };
    };
  }
}, li = 0, oi = 10, so = () => ({
  pageIndex: li,
  pageSize: oi
}), Op = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...so(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: _e("pagination", e)
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetPageIndex = () => {
      var r, l;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (l = e.options.autoResetAll) != null ? l : e.options.autoResetPageIndex) != null ? r : !e.options.manualPagination) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetPageIndex(), n = !1;
        });
      }
    }, e.setPagination = (r) => {
      const l = (o) => st(r, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(l);
    }, e.resetPagination = (r) => {
      var l;
      e.setPagination(r ? so() : (l = e.initialState.pagination) != null ? l : so());
    }, e.setPageIndex = (r) => {
      e.setPagination((l) => {
        let o = st(r, l.pageIndex);
        const i = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return o = Math.max(0, Math.min(o, i)), {
          ...l,
          pageIndex: o
        };
      });
    }, e.resetPageIndex = (r) => {
      var l, o;
      e.setPageIndex(r ? li : (l = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? l : li);
    }, e.resetPageSize = (r) => {
      var l, o;
      e.setPageSize(r ? oi : (l = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? l : oi);
    }, e.setPageSize = (r) => {
      e.setPagination((l) => {
        const o = Math.max(1, st(r, l.pageSize)), i = l.pageSize * l.pageIndex, u = Math.floor(i / o);
        return {
          ...l,
          pageIndex: u,
          pageSize: o
        };
      });
    }, e.setPageCount = (r) => e.setPagination((l) => {
      var o;
      let i = st(r, (o = e.options.pageCount) != null ? o : -1);
      return typeof i == "number" && (i = Math.max(-1, i)), {
        ...l,
        pageCount: i
      };
    }), e.getPageOptions = F(() => [e.getPageCount()], (r) => {
      let l = [];
      return r && r > 0 && (l = [...new Array(r)].fill(null).map((o, i) => i)), l;
    }, M(e.options, "debugTable")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: r
      } = e.getState().pagination, l = e.getPageCount();
      return l === -1 ? !0 : l === 0 ? !1 : r < l - 1;
    }, e.previousPage = () => e.setPageIndex((r) => r - 1), e.nextPage = () => e.setPageIndex((r) => r + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var r;
      return (r = e.options.pageCount) != null ? r : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var r;
      return (r = e.options.rowCount) != null ? r : e.getPrePaginationRowModel().rows.length;
    };
  }
}, ao = () => ({
  top: [],
  bottom: []
}), Ap = {
  getInitialState: (e) => ({
    rowPinning: ao(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: _e("rowPinning", e)
  }),
  createRow: (e, t) => {
    e.pin = (n, r, l) => {
      const o = r ? e.getLeafRows().map((s) => {
        let {
          id: a
        } = s;
        return a;
      }) : [], i = l ? e.getParentRows().map((s) => {
        let {
          id: a
        } = s;
        return a;
      }) : [], u = /* @__PURE__ */ new Set([...i, e.id, ...o]);
      t.setRowPinning((s) => {
        var a, p;
        if (n === "bottom") {
          var v, d;
          return {
            top: ((v = s == null ? void 0 : s.top) != null ? v : []).filter((y) => !(u != null && u.has(y))),
            bottom: [...((d = s == null ? void 0 : s.bottom) != null ? d : []).filter((y) => !(u != null && u.has(y))), ...Array.from(u)]
          };
        }
        if (n === "top") {
          var g, h;
          return {
            top: [...((g = s == null ? void 0 : s.top) != null ? g : []).filter((y) => !(u != null && u.has(y))), ...Array.from(u)],
            bottom: ((h = s == null ? void 0 : s.bottom) != null ? h : []).filter((y) => !(u != null && u.has(y)))
          };
        }
        return {
          top: ((a = s == null ? void 0 : s.top) != null ? a : []).filter((y) => !(u != null && u.has(y))),
          bottom: ((p = s == null ? void 0 : s.bottom) != null ? p : []).filter((y) => !(u != null && u.has(y)))
        };
      });
    }, e.getCanPin = () => {
      var n;
      const {
        enableRowPinning: r,
        enablePinning: l
      } = t.options;
      return typeof r == "function" ? r(e) : (n = r ?? l) != null ? n : !0;
    }, e.getIsPinned = () => {
      const n = [e.id], {
        top: r,
        bottom: l
      } = t.getState().rowPinning, o = n.some((u) => r == null ? void 0 : r.includes(u)), i = n.some((u) => l == null ? void 0 : l.includes(u));
      return o ? "top" : i ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const l = e.getIsPinned();
      if (!l) return -1;
      const o = (n = l === "top" ? t.getTopRows() : t.getBottomRows()) == null ? void 0 : n.map((i) => {
        let {
          id: u
        } = i;
        return u;
      });
      return (r = o == null ? void 0 : o.indexOf(e.id)) != null ? r : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (t) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(t), e.resetRowPinning = (t) => {
      var n, r;
      return e.setRowPinning(t ? ao() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : ao());
    }, e.getIsSomeRowsPinned = (t) => {
      var n;
      const r = e.getState().rowPinning;
      if (!t) {
        var l, o;
        return !!((l = r.top) != null && l.length || (o = r.bottom) != null && o.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e._getPinnedRows = (t, n, r) => {
      var l;
      return ((l = e.options.keepPinnedRows) == null || l ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (n ?? []).map((i) => {
          const u = e.getRow(i, !0);
          return u.getIsAllParentsExpanded() ? u : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (n ?? []).map((i) => t.find((u) => u.id === i))
      )).filter(Boolean).map((i) => ({
        ...i,
        position: r
      }));
    }, e.getTopRows = F(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), M(e.options, "debugRows")), e.getBottomRows = F(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), M(e.options, "debugRows")), e.getCenterRows = F(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const l = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((o) => !l.has(o.id));
    }, M(e.options, "debugRows"));
  }
}, Hp = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: _e("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (t) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(t), e.resetRowSelection = (t) => {
      var n;
      return e.setRowSelection(t ? {} : (n = e.initialState.rowSelection) != null ? n : {});
    }, e.toggleAllRowsSelected = (t) => {
      e.setRowSelection((n) => {
        t = typeof t < "u" ? t : !e.getIsAllRowsSelected();
        const r = {
          ...n
        }, l = e.getPreGroupedRowModel().flatRows;
        return t ? l.forEach((o) => {
          o.getCanSelect() && (r[o.id] = !0);
        }) : l.forEach((o) => {
          delete r[o.id];
        }), r;
      });
    }, e.toggleAllPageRowsSelected = (t) => e.setRowSelection((n) => {
      const r = typeof t < "u" ? t : !e.getIsAllPageRowsSelected(), l = {
        ...n
      };
      return e.getRowModel().rows.forEach((o) => {
        ii(l, o.id, r, !0, e);
      }), l;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = F(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? co(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, M(e.options, "debugTable")), e.getFilteredSelectedRowModel = F(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? co(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, M(e.options, "debugTable")), e.getGroupedSelectedRowModel = F(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? co(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, M(e.options, "debugTable")), e.getIsAllRowsSelected = () => {
      const t = e.getFilteredRowModel().flatRows, {
        rowSelection: n
      } = e.getState();
      let r = !!(t.length && Object.keys(n).length);
      return r && t.some((l) => l.getCanSelect() && !n[l.id]) && (r = !1), r;
    }, e.getIsAllPageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows.filter((l) => l.getCanSelect()), {
        rowSelection: n
      } = e.getState();
      let r = !!t.length;
      return r && t.some((l) => !n[l.id]) && (r = !1), r;
    }, e.getIsSomeRowsSelected = () => {
      var t;
      const n = Object.keys((t = e.getState().rowSelection) != null ? t : {}).length;
      return n > 0 && n < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : t.filter((n) => n.getCanSelect()).some((n) => n.getIsSelected() || n.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (t) => {
      e.toggleAllRowsSelected(t.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (t) => {
      e.toggleAllPageRowsSelected(t.target.checked);
    };
  },
  createRow: (e, t) => {
    e.toggleSelected = (n, r) => {
      const l = e.getIsSelected();
      t.setRowSelection((o) => {
        var i;
        if (n = typeof n < "u" ? n : !l, e.getCanSelect() && l === n)
          return o;
        const u = {
          ...o
        };
        return ii(u, e.id, n, (i = r == null ? void 0 : r.selectChildren) != null ? i : !0, t), u;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return lu(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return ui(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return ui(e, n) === "all";
    }, e.getCanSelect = () => {
      var n;
      return typeof t.options.enableRowSelection == "function" ? t.options.enableRowSelection(e) : (n = t.options.enableRowSelection) != null ? n : !0;
    }, e.getCanSelectSubRows = () => {
      var n;
      return typeof t.options.enableSubRowSelection == "function" ? t.options.enableSubRowSelection(e) : (n = t.options.enableSubRowSelection) != null ? n : !0;
    }, e.getCanMultiSelect = () => {
      var n;
      return typeof t.options.enableMultiRowSelection == "function" ? t.options.enableMultiRowSelection(e) : (n = t.options.enableMultiRowSelection) != null ? n : !0;
    }, e.getToggleSelectedHandler = () => {
      const n = e.getCanSelect();
      return (r) => {
        var l;
        n && e.toggleSelected((l = r.target) == null ? void 0 : l.checked);
      };
    };
  }
}, ii = (e, t, n, r, l) => {
  var o;
  const i = l.getRow(t, !0);
  n ? (i.getCanMultiSelect() || Object.keys(e).forEach((u) => delete e[u]), i.getCanSelect() && (e[t] = !0)) : delete e[t], r && (o = i.subRows) != null && o.length && i.getCanSelectSubRows() && i.subRows.forEach((u) => ii(e, u.id, n, r, l));
};
function co(e, t) {
  const n = e.getState().rowSelection, r = [], l = {}, o = function(i, u) {
    return i.map((s) => {
      var a;
      const p = lu(s, n);
      if (p && (r.push(s), l[s.id] = s), (a = s.subRows) != null && a.length && (s = {
        ...s,
        subRows: o(s.subRows)
      }), p)
        return s;
    }).filter(Boolean);
  };
  return {
    rows: o(t.rows),
    flatRows: r,
    rowsById: l
  };
}
function lu(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function ui(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length)) return !1;
  let l = !0, o = !1;
  return e.subRows.forEach((i) => {
    if (!(o && !l) && (i.getCanSelect() && (lu(i, t) ? o = !0 : l = !1), i.subRows && i.subRows.length)) {
      const u = ui(i, t);
      u === "all" ? o = !0 : (u === "some" && (o = !0), l = !1);
    }
  }), l ? "all" : o ? "some" : !1;
}
const si = /([0-9]+)/gm, jp = (e, t, n) => Ac(St(e.getValue(n)).toLowerCase(), St(t.getValue(n)).toLowerCase()), Up = (e, t, n) => Ac(St(e.getValue(n)), St(t.getValue(n))), Bp = (e, t, n) => ou(St(e.getValue(n)).toLowerCase(), St(t.getValue(n)).toLowerCase()), Gp = (e, t, n) => ou(St(e.getValue(n)), St(t.getValue(n))), Wp = (e, t, n) => {
  const r = e.getValue(n), l = t.getValue(n);
  return r > l ? 1 : r < l ? -1 : 0;
}, Qp = (e, t, n) => ou(e.getValue(n), t.getValue(n));
function ou(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function St(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Ac(e, t) {
  const n = e.split(si).filter(Boolean), r = t.split(si).filter(Boolean);
  for (; n.length && r.length; ) {
    const l = n.shift(), o = r.shift(), i = parseInt(l, 10), u = parseInt(o, 10), s = [i, u].sort();
    if (isNaN(s[0])) {
      if (l > o)
        return 1;
      if (o > l)
        return -1;
      continue;
    }
    if (isNaN(s[1]))
      return isNaN(i) ? -1 : 1;
    if (i > u)
      return 1;
    if (u > i)
      return -1;
  }
  return n.length - r.length;
}
const xn = {
  alphanumeric: jp,
  alphanumericCaseSensitive: Up,
  text: Bp,
  textCaseSensitive: Gp,
  datetime: Wp,
  basic: Qp
}, Kp = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: _e("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const l of n) {
        const o = l == null ? void 0 : l.getValue(e.id);
        if (Object.prototype.toString.call(o) === "[object Date]")
          return xn.datetime;
        if (typeof o == "string" && (r = !0, o.split(si).length > 1))
          return xn.alphanumeric;
      }
      return r ? xn.text : xn.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return Fl(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : xn[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const l = e.getNextSortingOrder(), o = typeof n < "u" && n !== null;
      t.setSorting((i) => {
        const u = i == null ? void 0 : i.find((g) => g.id === e.id), s = i == null ? void 0 : i.findIndex((g) => g.id === e.id);
        let a = [], p, v = o ? n : l === "desc";
        if (i != null && i.length && e.getCanMultiSort() && r ? u ? p = "toggle" : p = "add" : i != null && i.length && s !== i.length - 1 ? p = "replace" : u ? p = "toggle" : p = "replace", p === "toggle" && (o || l || (p = "remove")), p === "add") {
          var d;
          a = [...i, {
            id: e.id,
            desc: v
          }], a.splice(0, a.length - ((d = t.options.maxMultiSortColCount) != null ? d : Number.MAX_SAFE_INTEGER));
        } else p === "toggle" ? a = i.map((g) => g.id === e.id ? {
          ...g,
          desc: v
        } : g) : p === "remove" ? a = i.filter((g) => g.id !== e.id) : a = [{
          id: e.id,
          desc: v
        }];
        return a;
      });
    }, e.getFirstSortDir = () => {
      var n, r;
      return ((n = (r = e.columnDef.sortDescFirst) != null ? r : t.options.sortDescFirst) != null ? n : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (n) => {
      var r, l;
      const o = e.getFirstSortDir(), i = e.getIsSorted();
      return i ? i !== o && ((r = t.options.enableSortingRemoval) == null || r) && // If enableSortRemove, enable in general
      (!(n && (l = t.options.enableMultiRemove) != null) || l) ? !1 : i === "desc" ? "asc" : "desc" : o;
    }, e.getCanSort = () => {
      var n, r;
      return ((n = e.columnDef.enableSorting) != null ? n : !0) && ((r = t.options.enableSorting) != null ? r : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var n, r;
      return (n = (r = e.columnDef.enableMultiSort) != null ? r : t.options.enableMultiSort) != null ? n : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var n;
      const r = (n = t.getState().sorting) == null ? void 0 : n.find((l) => l.id === e.id);
      return r ? r.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var n, r;
      return (n = (r = t.getState().sorting) == null ? void 0 : r.findIndex((l) => l.id === e.id)) != null ? n : -1;
    }, e.clearSorting = () => {
      t.setSorting((n) => n != null && n.length ? n.filter((r) => r.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const n = e.getCanSort();
      return (r) => {
        n && (r.persist == null || r.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? t.options.isMultiSortEvent == null ? void 0 : t.options.isMultiSortEvent(r) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (t) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(t), e.resetSorting = (t) => {
      var n, r;
      e.setSorting(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.sorting) != null ? n : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, Xp = [
  mp,
  Np,
  zp,
  Ip,
  hp,
  yp,
  Vp,
  //depends on ColumnFaceting
  Dp,
  //depends on ColumnFiltering
  Kp,
  Fp,
  //depends on RowSorting
  Tp,
  Op,
  Ap,
  Hp,
  $p
];
function Yp(e) {
  var t, n;
  const r = [...Xp, ...(t = e._features) != null ? t : []];
  let l = {
    _features: r
  };
  const o = l._features.reduce((d, g) => Object.assign(d, g.getDefaultOptions == null ? void 0 : g.getDefaultOptions(l)), {}), i = (d) => l.options.mergeOptions ? l.options.mergeOptions(o, d) : {
    ...o,
    ...d
  };
  let s = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  l._features.forEach((d) => {
    var g;
    s = (g = d.getInitialState == null ? void 0 : d.getInitialState(s)) != null ? g : s;
  });
  const a = [];
  let p = !1;
  const v = {
    _features: r,
    options: {
      ...o,
      ...e
    },
    initialState: s,
    _queue: (d) => {
      a.push(d), p || (p = !0, Promise.resolve().then(() => {
        for (; a.length; )
          a.shift()();
        p = !1;
      }).catch((g) => setTimeout(() => {
        throw g;
      })));
    },
    reset: () => {
      l.setState(l.initialState);
    },
    setOptions: (d) => {
      const g = st(d, l.options);
      l.options = i(g);
    },
    getState: () => l.options.state,
    setState: (d) => {
      l.options.onStateChange == null || l.options.onStateChange(d);
    },
    _getRowId: (d, g, h) => {
      var y;
      return (y = l.options.getRowId == null ? void 0 : l.options.getRowId(d, g, h)) != null ? y : `${h ? [h.id, g].join(".") : g}`;
    },
    getCoreRowModel: () => (l._getCoreRowModel || (l._getCoreRowModel = l.options.getCoreRowModel(l)), l._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => l.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (d, g) => {
      let h = (g ? l.getPrePaginationRowModel() : l.getRowModel()).rowsById[d];
      if (!h && (h = l.getCoreRowModel().rowsById[d], !h))
        throw new Error();
      return h;
    },
    _getDefaultColumnDef: F(() => [l.options.defaultColumn], (d) => {
      var g;
      return d = (g = d) != null ? g : {}, {
        header: (h) => {
          const y = h.header.column.columnDef;
          return y.accessorKey ? y.accessorKey : y.accessorFn ? y.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (h) => {
          var y, E;
          return (y = (E = h.renderValue()) == null || E.toString == null ? void 0 : E.toString()) != null ? y : null;
        },
        ...l._features.reduce((h, y) => Object.assign(h, y.getDefaultColumnDef == null ? void 0 : y.getDefaultColumnDef()), {}),
        ...d
      };
    }, M(e, "debugColumns")),
    _getColumnDefs: () => l.options.columns,
    getAllColumns: F(() => [l._getColumnDefs()], (d) => {
      const g = function(h, y, E) {
        return E === void 0 && (E = 0), h.map((f) => {
          const c = gp(l, f, E, y), m = f;
          return c.columns = m.columns ? g(m.columns, c, E + 1) : [], c;
        });
      };
      return g(d);
    }, M(e, "debugColumns")),
    getAllFlatColumns: F(() => [l.getAllColumns()], (d) => d.flatMap((g) => g.getFlatColumns()), M(e, "debugColumns")),
    _getAllFlatColumnsById: F(() => [l.getAllFlatColumns()], (d) => d.reduce((g, h) => (g[h.id] = h, g), {}), M(e, "debugColumns")),
    getAllLeafColumns: F(() => [l.getAllColumns(), l._getOrderColumnsFn()], (d, g) => {
      let h = d.flatMap((y) => y.getLeafColumns());
      return g(h);
    }, M(e, "debugColumns")),
    getColumn: (d) => l._getAllFlatColumnsById()[d]
  };
  Object.assign(l, v);
  for (let d = 0; d < l._features.length; d++) {
    const g = l._features[d];
    g == null || g.createTable == null || g.createTable(l);
  }
  return l;
}
function qp() {
  return (e) => F(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(l, o, i) {
      o === void 0 && (o = 0);
      const u = [];
      for (let a = 0; a < l.length; a++) {
        const p = vp(e, e._getRowId(l[a], a, i), l[a], a, o, void 0, i == null ? void 0 : i.id);
        if (n.flatRows.push(p), n.rowsById[p.id] = p, u.push(p), e.options.getSubRows) {
          var s;
          p.originalSubRows = e.options.getSubRows(l[a], a), (s = p.originalSubRows) != null && s.length && (p.subRows = r(p.originalSubRows, o + 1, p));
        }
      }
      return u;
    };
    return n.rows = r(t), n;
  }, M(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function Zp(e) {
  const t = [], n = (r) => {
    var l;
    t.push(r), (l = r.subRows) != null && l.length && r.getIsExpanded() && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function Jp(e) {
  return (t) => F(() => [t.getState().pagination, t.getPrePaginationRowModel(), t.options.paginateExpandedRows ? void 0 : t.getState().expanded], (n, r) => {
    if (!r.rows.length)
      return r;
    const {
      pageSize: l,
      pageIndex: o
    } = n;
    let {
      rows: i,
      flatRows: u,
      rowsById: s
    } = r;
    const a = l * o, p = a + l;
    i = i.slice(a, p);
    let v;
    t.options.paginateExpandedRows ? v = {
      rows: i,
      flatRows: u,
      rowsById: s
    } : v = Zp({
      rows: i,
      flatRows: u,
      rowsById: s
    }), v.flatRows = [];
    const d = (g) => {
      v.flatRows.push(g), g.subRows.length && g.subRows.forEach(d);
    };
    return v.rows.forEach(d), v;
  }, M(t.options, "debugTable"));
}
function bp() {
  return (e) => F(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
    if (!n.rows.length || !(t != null && t.length))
      return n;
    const r = e.getState().sorting, l = [], o = r.filter((s) => {
      var a;
      return (a = e.getColumn(s.id)) == null ? void 0 : a.getCanSort();
    }), i = {};
    o.forEach((s) => {
      const a = e.getColumn(s.id);
      a && (i[s.id] = {
        sortUndefined: a.columnDef.sortUndefined,
        invertSorting: a.columnDef.invertSorting,
        sortingFn: a.getSortingFn()
      });
    });
    const u = (s) => {
      const a = s.map((p) => ({
        ...p
      }));
      return a.sort((p, v) => {
        for (let g = 0; g < o.length; g += 1) {
          var d;
          const h = o[g], y = i[h.id], E = y.sortUndefined, f = (d = h == null ? void 0 : h.desc) != null ? d : !1;
          let c = 0;
          if (E) {
            const m = p.getValue(h.id), S = v.getValue(h.id), C = m === void 0, R = S === void 0;
            if (C || R) {
              if (E === "first") return C ? -1 : 1;
              if (E === "last") return C ? 1 : -1;
              c = C && R ? 0 : C ? E : -E;
            }
          }
          if (c === 0 && (c = y.sortingFn(p, v, h.id)), c !== 0)
            return f && (c *= -1), y.invertSorting && (c *= -1), c;
        }
        return p.index - v.index;
      }), a.forEach((p) => {
        var v;
        l.push(p), (v = p.subRows) != null && v.length && (p.subRows = u(p.subRows));
      }), a;
    };
    return {
      rows: u(n.rows),
      flatRows: l,
      rowsById: n.rowsById
    };
  }, M(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function ys(e, t) {
  return e ? eg(e) ? /* @__PURE__ */ $.createElement(e, t) : e : null;
}
function eg(e) {
  return tg(e) || typeof e == "function" || ng(e);
}
function tg(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function ng(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function rg(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = $.useState(() => ({
    current: Yp(t)
  })), [r, l] = $.useState(() => n.current.initialState);
  return n.current.setOptions((o) => ({
    ...o,
    ...e,
    state: {
      ...r,
      ...e.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (i) => {
      l(i), e.onStateChange == null || e.onStateChange(i);
    }
  })), n.current;
}
function lg({
  data: e,
  columns: t,
  pageSize: n,
  className: r = "",
  onSelectionChange: l
}) {
  const [o, i] = $.useState([]), [u, s] = $.useState(/* @__PURE__ */ new Set()), [a] = $.useState("onChange"), p = rg({
    data: e,
    columns: t,
    state: {
      sorting: o
    },
    onSortingChange: i,
    getCoreRowModel: qp(),
    getSortedRowModel: bp(),
    getPaginationRowModel: Jp(),
    columnResizeMode: a
  });
  $.useEffect(() => {
    p.setPageSize(n);
  }, [n]);
  const v = (d) => {
    const g = new Set(u);
    g.has(d) ? g.delete(d) : g.add(d), s(g), l(Array.from(g));
  };
  return /* @__PURE__ */ $.createElement("div", { className: `table-container ${r}` }, /* @__PURE__ */ $.createElement("table", { className: "table" }, /* @__PURE__ */ $.createElement("thead", null, p.getHeaderGroups().map((d) => /* @__PURE__ */ $.createElement("tr", { key: d.id }, /* @__PURE__ */ $.createElement("th", { className: "selection-cell" }, /* @__PURE__ */ $.createElement(
    "input",
    {
      type: "checkbox",
      checked: p.getRowModel().rows.every(
        (g) => u.has(g.index)
      ),
      onChange: (g) => {
        const h = /* @__PURE__ */ new Set();
        g.target.checked && p.getRowModel().rows.forEach(
          (y) => h.add(y.index)
        ), s(h), l(Array.from(h));
      }
    }
  )), d.headers.map((g) => /* @__PURE__ */ $.createElement(
    "th",
    {
      key: g.id,
      onClick: g.column.getToggleSortingHandler(),
      className: g.column.getCanSort() ? "sortable" : "",
      style: {
        width: g.getSize(),
        position: "relative"
      }
    },
    ys(
      g.column.columnDef.header,
      g.getContext()
    ),
    g.column.getCanSort() && /* @__PURE__ */ $.createElement("span", { className: "sort-indicator" }, g.column.getIsSorted() === "asc" ? " ↑" : g.column.getIsSorted() === "desc" ? " ↓" : " ↕"),
    /* @__PURE__ */ $.createElement(
      "div",
      {
        className: "resizer",
        onMouseDown: g.getResizeHandler(),
        onTouchStart: g.getResizeHandler()
      }
    )
  ))))), /* @__PURE__ */ $.createElement("tbody", null, p.getRowModel().rows.map((d) => /* @__PURE__ */ $.createElement(
    "tr",
    {
      key: d.id,
      className: u.has(d.index) ? "selected" : ""
    },
    /* @__PURE__ */ $.createElement("td", { className: "selection-cell" }, /* @__PURE__ */ $.createElement(
      "input",
      {
        type: "checkbox",
        checked: u.has(d.index),
        onChange: () => v(d.index)
      }
    )),
    d.getVisibleCells().map((g) => /* @__PURE__ */ $.createElement("td", { key: g.id }, ys(
      g.column.columnDef.cell,
      g.getContext()
    )))
  )))), /* @__PURE__ */ $.createElement("div", { className: "pagination" }, /* @__PURE__ */ $.createElement(
    "button",
    {
      onClick: () => p.setPageIndex(0),
      disabled: !p.getCanPreviousPage()
    },
    "<<"
  ), /* @__PURE__ */ $.createElement(
    "button",
    {
      onClick: () => p.previousPage(),
      disabled: !p.getCanPreviousPage()
    },
    "<"
  ), /* @__PURE__ */ $.createElement("span", null, "Page", " ", /* @__PURE__ */ $.createElement("strong", null, p.getState().pagination.pageIndex + 1, " of", " ", p.getPageCount())), /* @__PURE__ */ $.createElement(
    "button",
    {
      onClick: () => p.nextPage(),
      disabled: !p.getCanNextPage()
    },
    ">"
  ), /* @__PURE__ */ $.createElement(
    "button",
    {
      onClick: () => p.setPageIndex(p.getPageCount() - 1),
      disabled: !p.getCanNextPage()
    },
    ">>"
  )));
}
function og() {
  const [e] = En("data"), [t] = En("columns"), [n] = En("page_size"), [r] = En("class_name"), [l, o] = En("selected_rows");
  return /* @__PURE__ */ $.createElement(
    lg,
    {
      data: e,
      columns: t,
      pageSize: n,
      className: r,
      onSelectionChange: o
    }
  );
}
const ig = {
  render: cp(og)
};
export {
  ig as default
};
