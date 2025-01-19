var Wi = { exports: {} }, O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nr = Symbol.for("react.element"), oc = Symbol.for("react.portal"), uc = Symbol.for("react.fragment"), ic = Symbol.for("react.strict_mode"), sc = Symbol.for("react.profiler"), ac = Symbol.for("react.provider"), cc = Symbol.for("react.context"), fc = Symbol.for("react.forward_ref"), dc = Symbol.for("react.suspense"), pc = Symbol.for("react.memo"), mc = Symbol.for("react.lazy"), Fu = Symbol.iterator;
function vc(e) {
  return e === null || typeof e != "object" ? null : (e = Fu && e[Fu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Qi = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Ki = Object.assign, Yi = {};
function dt(e, n, t) {
  this.props = e, this.context = n, this.refs = Yi, this.updater = t || Qi;
}
dt.prototype.isReactComponent = {};
dt.prototype.setState = function(e, n) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, n, "setState");
};
dt.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Xi() {
}
Xi.prototype = dt.prototype;
function Ao(e, n, t) {
  this.props = e, this.context = n, this.refs = Yi, this.updater = t || Qi;
}
var Bo = Ao.prototype = new Xi();
Bo.constructor = Ao;
Ki(Bo, dt.prototype);
Bo.isPureReactComponent = !0;
var ju = Array.isArray, Gi = Object.prototype.hasOwnProperty, Ho = { current: null }, Zi = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ji(e, n, t) {
  var r, l = {}, o = null, u = null;
  if (n != null) for (r in n.ref !== void 0 && (u = n.ref), n.key !== void 0 && (o = "" + n.key), n) Gi.call(n, r) && !Zi.hasOwnProperty(r) && (l[r] = n[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = t;
  else if (1 < i) {
    for (var s = Array(i), f = 0; f < i; f++) s[f] = arguments[f + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: nr, type: e, key: o, ref: u, props: l, _owner: Ho.current };
}
function hc(e, n) {
  return { $$typeof: nr, type: e.type, key: n, ref: e.ref, props: e.props, _owner: e._owner };
}
function Wo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === nr;
}
function yc(e) {
  var n = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(t) {
    return n[t];
  });
}
var Uu = /\/+/g;
function El(e, n) {
  return typeof e == "object" && e !== null && e.key != null ? yc("" + e.key) : n.toString(36);
}
function Cr(e, n, t, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var u = !1;
  if (e === null) u = !0;
  else switch (o) {
    case "string":
    case "number":
      u = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case nr:
        case oc:
          u = !0;
      }
  }
  if (u) return u = e, l = l(u), e = r === "" ? "." + El(u, 0) : r, ju(l) ? (t = "", e != null && (t = e.replace(Uu, "$&/") + "/"), Cr(l, n, t, "", function(f) {
    return f;
  })) : l != null && (Wo(l) && (l = hc(l, t + (!l.key || u && u.key === l.key ? "" : ("" + l.key).replace(Uu, "$&/") + "/") + e)), n.push(l)), 1;
  if (u = 0, r = r === "" ? "." : r + ":", ju(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var s = r + El(o, i);
    u += Cr(o, n, t, s, l);
  }
  else if (s = vc(e), typeof s == "function") for (e = s.call(e), i = 0; !(o = e.next()).done; ) o = o.value, s = r + El(o, i++), u += Cr(o, n, t, s, l);
  else if (o === "object") throw n = String(e), Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  return u;
}
function ur(e, n, t) {
  if (e == null) return e;
  var r = [], l = 0;
  return Cr(e, r, "", "", function(o) {
    return n.call(t, o, l++);
  }), r;
}
function gc(e) {
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
var pe = { current: null }, _r = { transition: null }, wc = { ReactCurrentDispatcher: pe, ReactCurrentBatchConfig: _r, ReactCurrentOwner: Ho };
function qi() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = { map: ur, forEach: function(e, n, t) {
  ur(e, function() {
    n.apply(this, arguments);
  }, t);
}, count: function(e) {
  var n = 0;
  return ur(e, function() {
    n++;
  }), n;
}, toArray: function(e) {
  return ur(e, function(n) {
    return n;
  }) || [];
}, only: function(e) {
  if (!Wo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
O.Component = dt;
O.Fragment = uc;
O.Profiler = sc;
O.PureComponent = Ao;
O.StrictMode = ic;
O.Suspense = dc;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wc;
O.act = qi;
O.cloneElement = function(e, n, t) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Ki({}, e.props), l = e.key, o = e.ref, u = e._owner;
  if (n != null) {
    if (n.ref !== void 0 && (o = n.ref, u = Ho.current), n.key !== void 0 && (l = "" + n.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (s in n) Gi.call(n, s) && !Zi.hasOwnProperty(s) && (r[s] = n[s] === void 0 && i !== void 0 ? i[s] : n[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = t;
  else if (1 < s) {
    i = Array(s);
    for (var f = 0; f < s; f++) i[f] = arguments[f + 2];
    r.children = i;
  }
  return { $$typeof: nr, type: e.type, key: l, ref: o, props: r, _owner: u };
};
O.createContext = function(e) {
  return e = { $$typeof: cc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: ac, _context: e }, e.Consumer = e;
};
O.createElement = Ji;
O.createFactory = function(e) {
  var n = Ji.bind(null, e);
  return n.type = e, n;
};
O.createRef = function() {
  return { current: null };
};
O.forwardRef = function(e) {
  return { $$typeof: fc, render: e };
};
O.isValidElement = Wo;
O.lazy = function(e) {
  return { $$typeof: mc, _payload: { _status: -1, _result: e }, _init: gc };
};
O.memo = function(e, n) {
  return { $$typeof: pc, type: e, compare: n === void 0 ? null : n };
};
O.startTransition = function(e) {
  var n = _r.transition;
  _r.transition = {};
  try {
    e();
  } finally {
    _r.transition = n;
  }
};
O.unstable_act = qi;
O.useCallback = function(e, n) {
  return pe.current.useCallback(e, n);
};
O.useContext = function(e) {
  return pe.current.useContext(e);
};
O.useDebugValue = function() {
};
O.useDeferredValue = function(e) {
  return pe.current.useDeferredValue(e);
};
O.useEffect = function(e, n) {
  return pe.current.useEffect(e, n);
};
O.useId = function() {
  return pe.current.useId();
};
O.useImperativeHandle = function(e, n, t) {
  return pe.current.useImperativeHandle(e, n, t);
};
O.useInsertionEffect = function(e, n) {
  return pe.current.useInsertionEffect(e, n);
};
O.useLayoutEffect = function(e, n) {
  return pe.current.useLayoutEffect(e, n);
};
O.useMemo = function(e, n) {
  return pe.current.useMemo(e, n);
};
O.useReducer = function(e, n, t) {
  return pe.current.useReducer(e, n, t);
};
O.useRef = function(e) {
  return pe.current.useRef(e);
};
O.useState = function(e) {
  return pe.current.useState(e);
};
O.useSyncExternalStore = function(e, n, t) {
  return pe.current.useSyncExternalStore(e, n, t);
};
O.useTransition = function() {
  return pe.current.useTransition();
};
O.version = "18.3.1";
Wi.exports = O;
var U = Wi.exports, bi = { exports: {} }, _e = {}, es = { exports: {} }, ns = {};
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
  function n(C, T) {
    var L = C.length;
    C.push(T);
    e: for (; 0 < L; ) {
      var H = L - 1 >>> 1, h = C[H];
      if (0 < l(h, T)) C[H] = T, C[L] = h, L = H;
      else break e;
    }
  }
  function t(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var T = C[0], L = C.pop();
    if (L !== T) {
      C[0] = L;
      e: for (var H = 0, h = C.length, D = h >>> 1; H < D; ) {
        var z = 2 * (H + 1) - 1, b = C[z], Y = z + 1, tn = C[Y];
        if (0 > l(b, L)) Y < h && 0 > l(tn, b) ? (C[H] = tn, C[Y] = L, H = Y) : (C[H] = b, C[z] = L, H = z);
        else if (Y < h && 0 > l(tn, L)) C[H] = tn, C[Y] = L, H = Y;
        else break e;
      }
    }
    return T;
  }
  function l(C, T) {
    var L = C.sortIndex - T.sortIndex;
    return L !== 0 ? L : C.id - T.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var u = Date, i = u.now();
    e.unstable_now = function() {
      return u.now() - i;
    };
  }
  var s = [], f = [], v = 1, m = null, p = 3, w = !1, S = !1, k = !1, R = typeof setTimeout == "function" ? setTimeout : null, c = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(C) {
    for (var T = t(f); T !== null; ) {
      if (T.callback === null) r(f);
      else if (T.startTime <= C) r(f), T.sortIndex = T.expirationTime, n(s, T);
      else break;
      T = t(f);
    }
  }
  function y(C) {
    if (k = !1, d(C), !S) if (t(s) !== null) S = !0, vt(E);
    else {
      var T = t(f);
      T !== null && ht(y, T.startTime - C);
    }
  }
  function E(C, T) {
    S = !1, k && (k = !1, c(x), x = -1), w = !0;
    var L = p;
    try {
      for (d(T), m = t(s); m !== null && (!(m.expirationTime > T) || C && !ue()); ) {
        var H = m.callback;
        if (typeof H == "function") {
          m.callback = null, p = m.priorityLevel;
          var h = H(m.expirationTime <= T);
          T = e.unstable_now(), typeof h == "function" ? m.callback = h : m === t(s) && r(s), d(T);
        } else r(s);
        m = t(s);
      }
      if (m !== null) var D = !0;
      else {
        var z = t(f);
        z !== null && ht(y, z.startTime - T), D = !1;
      }
      return D;
    } finally {
      m = null, p = L, w = !1;
    }
  }
  var P = !1, N = null, x = -1, $ = 5, M = -1;
  function ue() {
    return !(e.unstable_now() - M < $);
  }
  function nn() {
    if (N !== null) {
      var C = e.unstable_now();
      M = C;
      var T = !0;
      try {
        T = N(!0, C);
      } finally {
        T ? Pe() : (P = !1, N = null);
      }
    } else P = !1;
  }
  var Pe;
  if (typeof a == "function") Pe = function() {
    a(nn);
  };
  else if (typeof MessageChannel < "u") {
    var In = new MessageChannel(), Sl = In.port2;
    In.port1.onmessage = nn, Pe = function() {
      Sl.postMessage(null);
    };
  } else Pe = function() {
    R(nn, 0);
  };
  function vt(C) {
    N = C, P || (P = !0, Pe());
  }
  function ht(C, T) {
    x = R(function() {
      C(e.unstable_now());
    }, T);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    S || w || (S = !0, vt(E));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return t(s);
  }, e.unstable_next = function(C) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var T = 3;
        break;
      default:
        T = p;
    }
    var L = p;
    p = T;
    try {
      return C();
    } finally {
      p = L;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, T) {
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
    var L = p;
    p = C;
    try {
      return T();
    } finally {
      p = L;
    }
  }, e.unstable_scheduleCallback = function(C, T, L) {
    var H = e.unstable_now();
    switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? H + L : H) : L = H, C) {
      case 1:
        var h = -1;
        break;
      case 2:
        h = 250;
        break;
      case 5:
        h = 1073741823;
        break;
      case 4:
        h = 1e4;
        break;
      default:
        h = 5e3;
    }
    return h = L + h, C = { id: v++, callback: T, priorityLevel: C, startTime: L, expirationTime: h, sortIndex: -1 }, L > H ? (C.sortIndex = L, n(f, C), t(s) === null && C === t(f) && (k ? (c(x), x = -1) : k = !0, ht(y, L - H))) : (C.sortIndex = h, n(s, C), S || w || (S = !0, vt(E))), C;
  }, e.unstable_shouldYield = ue, e.unstable_wrapCallback = function(C) {
    var T = p;
    return function() {
      var L = p;
      p = T;
      try {
        return C.apply(this, arguments);
      } finally {
        p = L;
      }
    };
  };
})(ns);
es.exports = ns;
var Sc = es.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kc = U, Ce = Sc;
function g(e) {
  for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++) n += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ts = /* @__PURE__ */ new Set(), It = {};
function jn(e, n) {
  ot(e, n), ot(e + "Capture", n);
}
function ot(e, n) {
  for (It[e] = n, e = 0; e < n.length; e++) ts.add(n[e]);
}
var Ze = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Xl = Object.prototype.hasOwnProperty, Ec = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Iu = {}, $u = {};
function Cc(e) {
  return Xl.call($u, e) ? !0 : Xl.call(Iu, e) ? !1 : Ec.test(e) ? $u[e] = !0 : (Iu[e] = !0, !1);
}
function _c(e, n, t, r) {
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
function xc(e, n, t, r) {
  if (n === null || typeof n > "u" || _c(e, n, t, r)) return !0;
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
function me(e, n, t, r, l, o, u) {
  this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = t, this.propertyName = e, this.type = n, this.sanitizeURL = o, this.removeEmptyString = u;
}
var oe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  oe[e] = new me(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var n = e[0];
  oe[n] = new me(n, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  oe[e] = new me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  oe[e] = new me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  oe[e] = new me(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  oe[e] = new me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  oe[e] = new me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  oe[e] = new me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  oe[e] = new me(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Qo = /[\-:]([a-z])/g;
function Ko(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var n = e.replace(
    Qo,
    Ko
  );
  oe[n] = new me(n, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var n = e.replace(Qo, Ko);
  oe[n] = new me(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var n = e.replace(Qo, Ko);
  oe[n] = new me(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  oe[e] = new me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
oe.xlinkHref = new me("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  oe[e] = new me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Yo(e, n, t, r) {
  var l = oe.hasOwnProperty(n) ? oe[n] : null;
  (l !== null ? l.type !== 0 : r || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (xc(n, t, l, r) && (t = null), r || l === null ? Cc(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : l.mustUseProperty ? e[l.propertyName] = t === null ? l.type === 3 ? !1 : "" : t : (n = l.attributeName, r = l.attributeNamespace, t === null ? e.removeAttribute(n) : (l = l.type, t = l === 3 || l === 4 && t === !0 ? "" : "" + t, r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
}
var en = kc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ir = Symbol.for("react.element"), An = Symbol.for("react.portal"), Bn = Symbol.for("react.fragment"), Xo = Symbol.for("react.strict_mode"), Gl = Symbol.for("react.profiler"), rs = Symbol.for("react.provider"), ls = Symbol.for("react.context"), Go = Symbol.for("react.forward_ref"), Zl = Symbol.for("react.suspense"), Jl = Symbol.for("react.suspense_list"), Zo = Symbol.for("react.memo"), ln = Symbol.for("react.lazy"), os = Symbol.for("react.offscreen"), Vu = Symbol.iterator;
function yt(e) {
  return e === null || typeof e != "object" ? null : (e = Vu && e[Vu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var K = Object.assign, Cl;
function xt(e) {
  if (Cl === void 0) try {
    throw Error();
  } catch (t) {
    var n = t.stack.trim().match(/\n( *(at )?)/);
    Cl = n && n[1] || "";
  }
  return `
` + Cl + e;
}
var _l = !1;
function xl(e, n) {
  if (!e || _l) return "";
  _l = !0;
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
      } catch (f) {
        var r = f;
      }
      Reflect.construct(e, [], n);
    } else {
      try {
        n.call();
      } catch (f) {
        r = f;
      }
      e.call(n.prototype);
    }
    else {
      try {
        throw Error();
      } catch (f) {
        r = f;
      }
      e();
    }
  } catch (f) {
    if (f && r && typeof f.stack == "string") {
      for (var l = f.stack.split(`
`), o = r.stack.split(`
`), u = l.length - 1, i = o.length - 1; 1 <= u && 0 <= i && l[u] !== o[i]; ) i--;
      for (; 1 <= u && 0 <= i; u--, i--) if (l[u] !== o[i]) {
        if (u !== 1 || i !== 1)
          do
            if (u--, i--, 0 > i || l[u] !== o[i]) {
              var s = `
` + l[u].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= u && 0 <= i);
        break;
      }
    }
  } finally {
    _l = !1, Error.prepareStackTrace = t;
  }
  return (e = e ? e.displayName || e.name : "") ? xt(e) : "";
}
function Pc(e) {
  switch (e.tag) {
    case 5:
      return xt(e.type);
    case 16:
      return xt("Lazy");
    case 13:
      return xt("Suspense");
    case 19:
      return xt("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = xl(e.type, !1), e;
    case 11:
      return e = xl(e.type.render, !1), e;
    case 1:
      return e = xl(e.type, !0), e;
    default:
      return "";
  }
}
function ql(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Bn:
      return "Fragment";
    case An:
      return "Portal";
    case Gl:
      return "Profiler";
    case Xo:
      return "StrictMode";
    case Zl:
      return "Suspense";
    case Jl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ls:
      return (e.displayName || "Context") + ".Consumer";
    case rs:
      return (e._context.displayName || "Context") + ".Provider";
    case Go:
      var n = e.render;
      return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Zo:
      return n = e.displayName || null, n !== null ? n : ql(e.type) || "Memo";
    case ln:
      n = e._payload, e = e._init;
      try {
        return ql(e(n));
      } catch {
      }
  }
  return null;
}
function Nc(e) {
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
      return ql(n);
    case 8:
      return n === Xo ? "StrictMode" : "Mode";
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
function wn(e) {
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
function us(e) {
  var n = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
}
function zc(e) {
  var n = us(e) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), r = "" + e[n];
  if (!e.hasOwnProperty(n) && typeof t < "u" && typeof t.get == "function" && typeof t.set == "function") {
    var l = t.get, o = t.set;
    return Object.defineProperty(e, n, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(u) {
      r = "" + u, o.call(this, u);
    } }), Object.defineProperty(e, n, { enumerable: t.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(u) {
      r = "" + u;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[n];
    } };
  }
}
function sr(e) {
  e._valueTracker || (e._valueTracker = zc(e));
}
function is(e) {
  if (!e) return !1;
  var n = e._valueTracker;
  if (!n) return !0;
  var t = n.getValue(), r = "";
  return e && (r = us(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== t ? (n.setValue(e), !0) : !1;
}
function Fr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function bl(e, n) {
  var t = n.checked;
  return K({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: t ?? e._wrapperState.initialChecked });
}
function Au(e, n) {
  var t = n.defaultValue == null ? "" : n.defaultValue, r = n.checked != null ? n.checked : n.defaultChecked;
  t = wn(n.value != null ? n.value : t), e._wrapperState = { initialChecked: r, initialValue: t, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
}
function ss(e, n) {
  n = n.checked, n != null && Yo(e, "checked", n, !1);
}
function eo(e, n) {
  ss(e, n);
  var t = wn(n.value), r = n.type;
  if (t != null) r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  n.hasOwnProperty("value") ? no(e, n.type, t) : n.hasOwnProperty("defaultValue") && no(e, n.type, wn(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
}
function Bu(e, n, t) {
  if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
    var r = n.type;
    if (!(r !== "submit" && r !== "reset" || n.value !== void 0 && n.value !== null)) return;
    n = "" + e._wrapperState.initialValue, t || n === e.value || (e.value = n), e.defaultValue = n;
  }
  t = e.name, t !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, t !== "" && (e.name = t);
}
function no(e, n, t) {
  (n !== "number" || Fr(e.ownerDocument) !== e) && (t == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
}
var Pt = Array.isArray;
function bn(e, n, t, r) {
  if (e = e.options, n) {
    n = {};
    for (var l = 0; l < t.length; l++) n["$" + t[l]] = !0;
    for (t = 0; t < e.length; t++) l = n.hasOwnProperty("$" + e[t].value), e[t].selected !== l && (e[t].selected = l), l && r && (e[t].defaultSelected = !0);
  } else {
    for (t = "" + wn(t), n = null, l = 0; l < e.length; l++) {
      if (e[l].value === t) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      n !== null || e[l].disabled || (n = e[l]);
    }
    n !== null && (n.selected = !0);
  }
}
function to(e, n) {
  if (n.dangerouslySetInnerHTML != null) throw Error(g(91));
  return K({}, n, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Hu(e, n) {
  var t = n.value;
  if (t == null) {
    if (t = n.children, n = n.defaultValue, t != null) {
      if (n != null) throw Error(g(92));
      if (Pt(t)) {
        if (1 < t.length) throw Error(g(93));
        t = t[0];
      }
      n = t;
    }
    n == null && (n = ""), t = n;
  }
  e._wrapperState = { initialValue: wn(t) };
}
function as(e, n) {
  var t = wn(n.value), r = wn(n.defaultValue);
  t != null && (t = "" + t, t !== e.value && (e.value = t), n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)), r != null && (e.defaultValue = "" + r);
}
function Wu(e) {
  var n = e.textContent;
  n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
}
function cs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ro(e, n) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? cs(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var ar, fs = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, t, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(n, t, r, l);
    });
  } : e;
}(function(e, n) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n;
  else {
    for (ar = ar || document.createElement("div"), ar.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = ar.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; n.firstChild; ) e.appendChild(n.firstChild);
  }
});
function $t(e, n) {
  if (n) {
    var t = e.firstChild;
    if (t && t === e.lastChild && t.nodeType === 3) {
      t.nodeValue = n;
      return;
    }
  }
  e.textContent = n;
}
var Tt = {
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
}, Tc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Tt).forEach(function(e) {
  Tc.forEach(function(n) {
    n = n + e.charAt(0).toUpperCase() + e.substring(1), Tt[n] = Tt[e];
  });
});
function ds(e, n, t) {
  return n == null || typeof n == "boolean" || n === "" ? "" : t || typeof n != "number" || n === 0 || Tt.hasOwnProperty(e) && Tt[e] ? ("" + n).trim() : n + "px";
}
function ps(e, n) {
  e = e.style;
  for (var t in n) if (n.hasOwnProperty(t)) {
    var r = t.indexOf("--") === 0, l = ds(t, n[t], r);
    t === "float" && (t = "cssFloat"), r ? e.setProperty(t, l) : e[t] = l;
  }
}
var Lc = K({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function lo(e, n) {
  if (n) {
    if (Lc[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(g(137, e));
    if (n.dangerouslySetInnerHTML != null) {
      if (n.children != null) throw Error(g(60));
      if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(g(61));
    }
    if (n.style != null && typeof n.style != "object") throw Error(g(62));
  }
}
function oo(e, n) {
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
var uo = null;
function Jo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var io = null, et = null, nt = null;
function Qu(e) {
  if (e = lr(e)) {
    if (typeof io != "function") throw Error(g(280));
    var n = e.stateNode;
    n && (n = al(n), io(e.stateNode, e.type, n));
  }
}
function ms(e) {
  et ? nt ? nt.push(e) : nt = [e] : et = e;
}
function vs() {
  if (et) {
    var e = et, n = nt;
    if (nt = et = null, Qu(e), n) for (e = 0; e < n.length; e++) Qu(n[e]);
  }
}
function hs(e, n) {
  return e(n);
}
function ys() {
}
var Pl = !1;
function gs(e, n, t) {
  if (Pl) return e(n, t);
  Pl = !0;
  try {
    return hs(e, n, t);
  } finally {
    Pl = !1, (et !== null || nt !== null) && (ys(), vs());
  }
}
function Vt(e, n) {
  var t = e.stateNode;
  if (t === null) return null;
  var r = al(t);
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
  if (t && typeof t != "function") throw Error(g(231, n, typeof t));
  return t;
}
var so = !1;
if (Ze) try {
  var gt = {};
  Object.defineProperty(gt, "passive", { get: function() {
    so = !0;
  } }), window.addEventListener("test", gt, gt), window.removeEventListener("test", gt, gt);
} catch {
  so = !1;
}
function Dc(e, n, t, r, l, o, u, i, s) {
  var f = Array.prototype.slice.call(arguments, 3);
  try {
    n.apply(t, f);
  } catch (v) {
    this.onError(v);
  }
}
var Lt = !1, jr = null, Ur = !1, ao = null, Rc = { onError: function(e) {
  Lt = !0, jr = e;
} };
function Mc(e, n, t, r, l, o, u, i, s) {
  Lt = !1, jr = null, Dc.apply(Rc, arguments);
}
function Oc(e, n, t, r, l, o, u, i, s) {
  if (Mc.apply(this, arguments), Lt) {
    if (Lt) {
      var f = jr;
      Lt = !1, jr = null;
    } else throw Error(g(198));
    Ur || (Ur = !0, ao = f);
  }
}
function Un(e) {
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
function ws(e) {
  if (e.tag === 13) {
    var n = e.memoizedState;
    if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
  }
  return null;
}
function Ku(e) {
  if (Un(e) !== e) throw Error(g(188));
}
function Fc(e) {
  var n = e.alternate;
  if (!n) {
    if (n = Un(e), n === null) throw Error(g(188));
    return n !== e ? null : e;
  }
  for (var t = e, r = n; ; ) {
    var l = t.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (r = l.return, r !== null) {
        t = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === t) return Ku(l), e;
        if (o === r) return Ku(l), n;
        o = o.sibling;
      }
      throw Error(g(188));
    }
    if (t.return !== r.return) t = l, r = o;
    else {
      for (var u = !1, i = l.child; i; ) {
        if (i === t) {
          u = !0, t = l, r = o;
          break;
        }
        if (i === r) {
          u = !0, r = l, t = o;
          break;
        }
        i = i.sibling;
      }
      if (!u) {
        for (i = o.child; i; ) {
          if (i === t) {
            u = !0, t = o, r = l;
            break;
          }
          if (i === r) {
            u = !0, r = o, t = l;
            break;
          }
          i = i.sibling;
        }
        if (!u) throw Error(g(189));
      }
    }
    if (t.alternate !== r) throw Error(g(190));
  }
  if (t.tag !== 3) throw Error(g(188));
  return t.stateNode.current === t ? e : n;
}
function Ss(e) {
  return e = Fc(e), e !== null ? ks(e) : null;
}
function ks(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var n = ks(e);
    if (n !== null) return n;
    e = e.sibling;
  }
  return null;
}
var Es = Ce.unstable_scheduleCallback, Yu = Ce.unstable_cancelCallback, jc = Ce.unstable_shouldYield, Uc = Ce.unstable_requestPaint, G = Ce.unstable_now, Ic = Ce.unstable_getCurrentPriorityLevel, qo = Ce.unstable_ImmediatePriority, Cs = Ce.unstable_UserBlockingPriority, Ir = Ce.unstable_NormalPriority, $c = Ce.unstable_LowPriority, _s = Ce.unstable_IdlePriority, ol = null, He = null;
function Vc(e) {
  if (He && typeof He.onCommitFiberRoot == "function") try {
    He.onCommitFiberRoot(ol, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ue = Math.clz32 ? Math.clz32 : Hc, Ac = Math.log, Bc = Math.LN2;
function Hc(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Ac(e) / Bc | 0) | 0;
}
var cr = 64, fr = 4194304;
function Nt(e) {
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
function $r(e, n) {
  var t = e.pendingLanes;
  if (t === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, u = t & 268435455;
  if (u !== 0) {
    var i = u & ~l;
    i !== 0 ? r = Nt(i) : (o &= u, o !== 0 && (r = Nt(o)));
  } else u = t & ~l, u !== 0 ? r = Nt(u) : o !== 0 && (r = Nt(o));
  if (r === 0) return 0;
  if (n !== 0 && n !== r && !(n & l) && (l = r & -r, o = n & -n, l >= o || l === 16 && (o & 4194240) !== 0)) return n;
  if (r & 4 && (r |= t & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= r; 0 < n; ) t = 31 - Ue(n), l = 1 << t, r |= e[t], n &= ~l;
  return r;
}
function Wc(e, n) {
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
function Qc(e, n) {
  for (var t = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var u = 31 - Ue(o), i = 1 << u, s = l[u];
    s === -1 ? (!(i & t) || i & r) && (l[u] = Wc(i, n)) : s <= n && (e.expiredLanes |= i), o &= ~i;
  }
}
function co(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function xs() {
  var e = cr;
  return cr <<= 1, !(cr & 4194240) && (cr = 64), e;
}
function Nl(e) {
  for (var n = [], t = 0; 31 > t; t++) n.push(e);
  return n;
}
function tr(e, n, t) {
  e.pendingLanes |= n, n !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, n = 31 - Ue(n), e[n] = t;
}
function Kc(e, n) {
  var t = e.pendingLanes & ~n;
  e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n, n = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < t; ) {
    var l = 31 - Ue(t), o = 1 << l;
    n[l] = 0, r[l] = -1, e[l] = -1, t &= ~o;
  }
}
function bo(e, n) {
  var t = e.entangledLanes |= n;
  for (e = e.entanglements; t; ) {
    var r = 31 - Ue(t), l = 1 << r;
    l & n | e[r] & n && (e[r] |= n), t &= ~l;
  }
}
var j = 0;
function Ps(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ns, eu, zs, Ts, Ls, fo = !1, dr = [], fn = null, dn = null, pn = null, At = /* @__PURE__ */ new Map(), Bt = /* @__PURE__ */ new Map(), un = [], Yc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Xu(e, n) {
  switch (e) {
    case "focusin":
    case "focusout":
      fn = null;
      break;
    case "dragenter":
    case "dragleave":
      dn = null;
      break;
    case "mouseover":
    case "mouseout":
      pn = null;
      break;
    case "pointerover":
    case "pointerout":
      At.delete(n.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Bt.delete(n.pointerId);
  }
}
function wt(e, n, t, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: n, domEventName: t, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, n !== null && (n = lr(n), n !== null && eu(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, l !== null && n.indexOf(l) === -1 && n.push(l), e);
}
function Xc(e, n, t, r, l) {
  switch (n) {
    case "focusin":
      return fn = wt(fn, e, n, t, r, l), !0;
    case "dragenter":
      return dn = wt(dn, e, n, t, r, l), !0;
    case "mouseover":
      return pn = wt(pn, e, n, t, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return At.set(o, wt(At.get(o) || null, e, n, t, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Bt.set(o, wt(Bt.get(o) || null, e, n, t, r, l)), !0;
  }
  return !1;
}
function Ds(e) {
  var n = Pn(e.target);
  if (n !== null) {
    var t = Un(n);
    if (t !== null) {
      if (n = t.tag, n === 13) {
        if (n = ws(t), n !== null) {
          e.blockedOn = n, Ls(e.priority, function() {
            zs(t);
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
function xr(e) {
  if (e.blockedOn !== null) return !1;
  for (var n = e.targetContainers; 0 < n.length; ) {
    var t = po(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
    if (t === null) {
      t = e.nativeEvent;
      var r = new t.constructor(t.type, t);
      uo = r, t.target.dispatchEvent(r), uo = null;
    } else return n = lr(t), n !== null && eu(n), e.blockedOn = t, !1;
    n.shift();
  }
  return !0;
}
function Gu(e, n, t) {
  xr(e) && t.delete(n);
}
function Gc() {
  fo = !1, fn !== null && xr(fn) && (fn = null), dn !== null && xr(dn) && (dn = null), pn !== null && xr(pn) && (pn = null), At.forEach(Gu), Bt.forEach(Gu);
}
function St(e, n) {
  e.blockedOn === n && (e.blockedOn = null, fo || (fo = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, Gc)));
}
function Ht(e) {
  function n(l) {
    return St(l, e);
  }
  if (0 < dr.length) {
    St(dr[0], e);
    for (var t = 1; t < dr.length; t++) {
      var r = dr[t];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (fn !== null && St(fn, e), dn !== null && St(dn, e), pn !== null && St(pn, e), At.forEach(n), Bt.forEach(n), t = 0; t < un.length; t++) r = un[t], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < un.length && (t = un[0], t.blockedOn === null); ) Ds(t), t.blockedOn === null && un.shift();
}
var tt = en.ReactCurrentBatchConfig, Vr = !0;
function Zc(e, n, t, r) {
  var l = j, o = tt.transition;
  tt.transition = null;
  try {
    j = 1, nu(e, n, t, r);
  } finally {
    j = l, tt.transition = o;
  }
}
function Jc(e, n, t, r) {
  var l = j, o = tt.transition;
  tt.transition = null;
  try {
    j = 4, nu(e, n, t, r);
  } finally {
    j = l, tt.transition = o;
  }
}
function nu(e, n, t, r) {
  if (Vr) {
    var l = po(e, n, t, r);
    if (l === null) Ul(e, n, r, Ar, t), Xu(e, r);
    else if (Xc(l, e, n, t, r)) r.stopPropagation();
    else if (Xu(e, r), n & 4 && -1 < Yc.indexOf(e)) {
      for (; l !== null; ) {
        var o = lr(l);
        if (o !== null && Ns(o), o = po(e, n, t, r), o === null && Ul(e, n, r, Ar, t), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ul(e, n, r, null, t);
  }
}
var Ar = null;
function po(e, n, t, r) {
  if (Ar = null, e = Jo(r), e = Pn(e), e !== null) if (n = Un(e), n === null) e = null;
  else if (t = n.tag, t === 13) {
    if (e = ws(n), e !== null) return e;
    e = null;
  } else if (t === 3) {
    if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
    e = null;
  } else n !== e && (e = null);
  return Ar = e, null;
}
function Rs(e) {
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
      switch (Ic()) {
        case qo:
          return 1;
        case Cs:
          return 4;
        case Ir:
        case $c:
          return 16;
        case _s:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var an = null, tu = null, Pr = null;
function Ms() {
  if (Pr) return Pr;
  var e, n = tu, t = n.length, r, l = "value" in an ? an.value : an.textContent, o = l.length;
  for (e = 0; e < t && n[e] === l[e]; e++) ;
  var u = t - e;
  for (r = 1; r <= u && n[t - r] === l[o - r]; r++) ;
  return Pr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Nr(e) {
  var n = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function pr() {
  return !0;
}
function Zu() {
  return !1;
}
function xe(e) {
  function n(t, r, l, o, u) {
    this._reactName = t, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = u, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (t = e[i], this[i] = t ? t(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? pr : Zu, this.isPropagationStopped = Zu, this;
  }
  return K(n.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var t = this.nativeEvent;
    t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = pr);
  }, stopPropagation: function() {
    var t = this.nativeEvent;
    t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = pr);
  }, persist: function() {
  }, isPersistent: pr }), n;
}
var pt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ru = xe(pt), rr = K({}, pt, { view: 0, detail: 0 }), qc = xe(rr), zl, Tl, kt, ul = K({}, rr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: lu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== kt && (kt && e.type === "mousemove" ? (zl = e.screenX - kt.screenX, Tl = e.screenY - kt.screenY) : Tl = zl = 0, kt = e), zl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Tl;
} }), Ju = xe(ul), bc = K({}, ul, { dataTransfer: 0 }), ef = xe(bc), nf = K({}, rr, { relatedTarget: 0 }), Ll = xe(nf), tf = K({}, pt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), rf = xe(tf), lf = K({}, pt, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), of = xe(lf), uf = K({}, pt, { data: 0 }), qu = xe(uf), sf = {
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
}, af = {
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
}, cf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function ff(e) {
  var n = this.nativeEvent;
  return n.getModifierState ? n.getModifierState(e) : (e = cf[e]) ? !!n[e] : !1;
}
function lu() {
  return ff;
}
var df = K({}, rr, { key: function(e) {
  if (e.key) {
    var n = sf[e.key] || e.key;
    if (n !== "Unidentified") return n;
  }
  return e.type === "keypress" ? (e = Nr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? af[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: lu, charCode: function(e) {
  return e.type === "keypress" ? Nr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Nr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), pf = xe(df), mf = K({}, ul, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), bu = xe(mf), vf = K({}, rr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: lu }), hf = xe(vf), yf = K({}, pt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), gf = xe(yf), wf = K({}, ul, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Sf = xe(wf), kf = [9, 13, 27, 32], ou = Ze && "CompositionEvent" in window, Dt = null;
Ze && "documentMode" in document && (Dt = document.documentMode);
var Ef = Ze && "TextEvent" in window && !Dt, Os = Ze && (!ou || Dt && 8 < Dt && 11 >= Dt), ei = " ", ni = !1;
function Fs(e, n) {
  switch (e) {
    case "keyup":
      return kf.indexOf(n.keyCode) !== -1;
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
function js(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Hn = !1;
function Cf(e, n) {
  switch (e) {
    case "compositionend":
      return js(n);
    case "keypress":
      return n.which !== 32 ? null : (ni = !0, ei);
    case "textInput":
      return e = n.data, e === ei && ni ? null : e;
    default:
      return null;
  }
}
function _f(e, n) {
  if (Hn) return e === "compositionend" || !ou && Fs(e, n) ? (e = Ms(), Pr = tu = an = null, Hn = !1, e) : null;
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
      return Os && n.locale !== "ko" ? null : n.data;
    default:
      return null;
  }
}
var xf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ti(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n === "input" ? !!xf[e.type] : n === "textarea";
}
function Us(e, n, t, r) {
  ms(r), n = Br(n, "onChange"), 0 < n.length && (t = new ru("onChange", "change", null, t, r), e.push({ event: t, listeners: n }));
}
var Rt = null, Wt = null;
function Pf(e) {
  Xs(e, 0);
}
function il(e) {
  var n = Kn(e);
  if (is(n)) return e;
}
function Nf(e, n) {
  if (e === "change") return n;
}
var Is = !1;
if (Ze) {
  var Dl;
  if (Ze) {
    var Rl = "oninput" in document;
    if (!Rl) {
      var ri = document.createElement("div");
      ri.setAttribute("oninput", "return;"), Rl = typeof ri.oninput == "function";
    }
    Dl = Rl;
  } else Dl = !1;
  Is = Dl && (!document.documentMode || 9 < document.documentMode);
}
function li() {
  Rt && (Rt.detachEvent("onpropertychange", $s), Wt = Rt = null);
}
function $s(e) {
  if (e.propertyName === "value" && il(Wt)) {
    var n = [];
    Us(n, Wt, e, Jo(e)), gs(Pf, n);
  }
}
function zf(e, n, t) {
  e === "focusin" ? (li(), Rt = n, Wt = t, Rt.attachEvent("onpropertychange", $s)) : e === "focusout" && li();
}
function Tf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return il(Wt);
}
function Lf(e, n) {
  if (e === "click") return il(n);
}
function Df(e, n) {
  if (e === "input" || e === "change") return il(n);
}
function Rf(e, n) {
  return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
}
var $e = typeof Object.is == "function" ? Object.is : Rf;
function Qt(e, n) {
  if ($e(e, n)) return !0;
  if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
  var t = Object.keys(e), r = Object.keys(n);
  if (t.length !== r.length) return !1;
  for (r = 0; r < t.length; r++) {
    var l = t[r];
    if (!Xl.call(n, l) || !$e(e[l], n[l])) return !1;
  }
  return !0;
}
function oi(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ui(e, n) {
  var t = oi(e);
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
    t = oi(t);
  }
}
function Vs(e, n) {
  return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Vs(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
}
function As() {
  for (var e = window, n = Fr(); n instanceof e.HTMLIFrameElement; ) {
    try {
      var t = typeof n.contentWindow.location.href == "string";
    } catch {
      t = !1;
    }
    if (t) e = n.contentWindow;
    else break;
    n = Fr(e.document);
  }
  return n;
}
function uu(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
}
function Mf(e) {
  var n = As(), t = e.focusedElem, r = e.selectionRange;
  if (n !== t && t && t.ownerDocument && Vs(t.ownerDocument.documentElement, t)) {
    if (r !== null && uu(t)) {
      if (n = r.start, e = r.end, e === void 0 && (e = n), "selectionStart" in t) t.selectionStart = n, t.selectionEnd = Math.min(e, t.value.length);
      else if (e = (n = t.ownerDocument || document) && n.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = t.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ui(t, o);
        var u = ui(
          t,
          r
        );
        l && u && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== u.node || e.focusOffset !== u.offset) && (n = n.createRange(), n.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(n), e.extend(u.node, u.offset)) : (n.setEnd(u.node, u.offset), e.addRange(n)));
      }
    }
    for (n = [], e = t; e = e.parentNode; ) e.nodeType === 1 && n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof t.focus == "function" && t.focus(), t = 0; t < n.length; t++) e = n[t], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Of = Ze && "documentMode" in document && 11 >= document.documentMode, Wn = null, mo = null, Mt = null, vo = !1;
function ii(e, n, t) {
  var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
  vo || Wn == null || Wn !== Fr(r) || (r = Wn, "selectionStart" in r && uu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Mt && Qt(Mt, r) || (Mt = r, r = Br(mo, "onSelect"), 0 < r.length && (n = new ru("onSelect", "select", null, n, t), e.push({ event: n, listeners: r }), n.target = Wn)));
}
function mr(e, n) {
  var t = {};
  return t[e.toLowerCase()] = n.toLowerCase(), t["Webkit" + e] = "webkit" + n, t["Moz" + e] = "moz" + n, t;
}
var Qn = { animationend: mr("Animation", "AnimationEnd"), animationiteration: mr("Animation", "AnimationIteration"), animationstart: mr("Animation", "AnimationStart"), transitionend: mr("Transition", "TransitionEnd") }, Ml = {}, Bs = {};
Ze && (Bs = document.createElement("div").style, "AnimationEvent" in window || (delete Qn.animationend.animation, delete Qn.animationiteration.animation, delete Qn.animationstart.animation), "TransitionEvent" in window || delete Qn.transitionend.transition);
function sl(e) {
  if (Ml[e]) return Ml[e];
  if (!Qn[e]) return e;
  var n = Qn[e], t;
  for (t in n) if (n.hasOwnProperty(t) && t in Bs) return Ml[e] = n[t];
  return e;
}
var Hs = sl("animationend"), Ws = sl("animationiteration"), Qs = sl("animationstart"), Ks = sl("transitionend"), Ys = /* @__PURE__ */ new Map(), si = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function kn(e, n) {
  Ys.set(e, n), jn(n, [e]);
}
for (var Ol = 0; Ol < si.length; Ol++) {
  var Fl = si[Ol], Ff = Fl.toLowerCase(), jf = Fl[0].toUpperCase() + Fl.slice(1);
  kn(Ff, "on" + jf);
}
kn(Hs, "onAnimationEnd");
kn(Ws, "onAnimationIteration");
kn(Qs, "onAnimationStart");
kn("dblclick", "onDoubleClick");
kn("focusin", "onFocus");
kn("focusout", "onBlur");
kn(Ks, "onTransitionEnd");
ot("onMouseEnter", ["mouseout", "mouseover"]);
ot("onMouseLeave", ["mouseout", "mouseover"]);
ot("onPointerEnter", ["pointerout", "pointerover"]);
ot("onPointerLeave", ["pointerout", "pointerover"]);
jn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
jn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
jn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
jn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
jn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
jn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var zt = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Uf = new Set("cancel close invalid load scroll toggle".split(" ").concat(zt));
function ai(e, n, t) {
  var r = e.type || "unknown-event";
  e.currentTarget = t, Oc(r, n, void 0, e), e.currentTarget = null;
}
function Xs(e, n) {
  n = (n & 4) !== 0;
  for (var t = 0; t < e.length; t++) {
    var r = e[t], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (n) for (var u = r.length - 1; 0 <= u; u--) {
        var i = r[u], s = i.instance, f = i.currentTarget;
        if (i = i.listener, s !== o && l.isPropagationStopped()) break e;
        ai(l, i, f), o = s;
      }
      else for (u = 0; u < r.length; u++) {
        if (i = r[u], s = i.instance, f = i.currentTarget, i = i.listener, s !== o && l.isPropagationStopped()) break e;
        ai(l, i, f), o = s;
      }
    }
  }
  if (Ur) throw e = ao, Ur = !1, ao = null, e;
}
function V(e, n) {
  var t = n[So];
  t === void 0 && (t = n[So] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  t.has(r) || (Gs(n, e, 2, !1), t.add(r));
}
function jl(e, n, t) {
  var r = 0;
  n && (r |= 4), Gs(t, e, r, n);
}
var vr = "_reactListening" + Math.random().toString(36).slice(2);
function Kt(e) {
  if (!e[vr]) {
    e[vr] = !0, ts.forEach(function(t) {
      t !== "selectionchange" && (Uf.has(t) || jl(t, !1, e), jl(t, !0, e));
    });
    var n = e.nodeType === 9 ? e : e.ownerDocument;
    n === null || n[vr] || (n[vr] = !0, jl("selectionchange", !1, n));
  }
}
function Gs(e, n, t, r) {
  switch (Rs(n)) {
    case 1:
      var l = Zc;
      break;
    case 4:
      l = Jc;
      break;
    default:
      l = nu;
  }
  t = l.bind(null, n, t, e), l = void 0, !so || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(n, t, { capture: !0, passive: l }) : e.addEventListener(n, t, !0) : l !== void 0 ? e.addEventListener(n, t, { passive: l }) : e.addEventListener(n, t, !1);
}
function Ul(e, n, t, r, l) {
  var o = r;
  if (!(n & 1) && !(n & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var u = r.tag;
    if (u === 3 || u === 4) {
      var i = r.stateNode.containerInfo;
      if (i === l || i.nodeType === 8 && i.parentNode === l) break;
      if (u === 4) for (u = r.return; u !== null; ) {
        var s = u.tag;
        if ((s === 3 || s === 4) && (s = u.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        u = u.return;
      }
      for (; i !== null; ) {
        if (u = Pn(i), u === null) return;
        if (s = u.tag, s === 5 || s === 6) {
          r = o = u;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  gs(function() {
    var f = o, v = Jo(t), m = [];
    e: {
      var p = Ys.get(e);
      if (p !== void 0) {
        var w = ru, S = e;
        switch (e) {
          case "keypress":
            if (Nr(t) === 0) break e;
          case "keydown":
          case "keyup":
            w = pf;
            break;
          case "focusin":
            S = "focus", w = Ll;
            break;
          case "focusout":
            S = "blur", w = Ll;
            break;
          case "beforeblur":
          case "afterblur":
            w = Ll;
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
            w = Ju;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = ef;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = hf;
            break;
          case Hs:
          case Ws:
          case Qs:
            w = rf;
            break;
          case Ks:
            w = gf;
            break;
          case "scroll":
            w = qc;
            break;
          case "wheel":
            w = Sf;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = of;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = bu;
        }
        var k = (n & 4) !== 0, R = !k && e === "scroll", c = k ? p !== null ? p + "Capture" : null : p;
        k = [];
        for (var a = f, d; a !== null; ) {
          d = a;
          var y = d.stateNode;
          if (d.tag === 5 && y !== null && (d = y, c !== null && (y = Vt(a, c), y != null && k.push(Yt(a, y, d)))), R) break;
          a = a.return;
        }
        0 < k.length && (p = new w(p, S, null, t, v), m.push({ event: p, listeners: k }));
      }
    }
    if (!(n & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", p && t !== uo && (S = t.relatedTarget || t.fromElement) && (Pn(S) || S[Je])) break e;
        if ((w || p) && (p = v.window === v ? v : (p = v.ownerDocument) ? p.defaultView || p.parentWindow : window, w ? (S = t.relatedTarget || t.toElement, w = f, S = S ? Pn(S) : null, S !== null && (R = Un(S), S !== R || S.tag !== 5 && S.tag !== 6) && (S = null)) : (w = null, S = f), w !== S)) {
          if (k = Ju, y = "onMouseLeave", c = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (k = bu, y = "onPointerLeave", c = "onPointerEnter", a = "pointer"), R = w == null ? p : Kn(w), d = S == null ? p : Kn(S), p = new k(y, a + "leave", w, t, v), p.target = R, p.relatedTarget = d, y = null, Pn(v) === f && (k = new k(c, a + "enter", S, t, v), k.target = d, k.relatedTarget = R, y = k), R = y, w && S) n: {
            for (k = w, c = S, a = 0, d = k; d; d = $n(d)) a++;
            for (d = 0, y = c; y; y = $n(y)) d++;
            for (; 0 < a - d; ) k = $n(k), a--;
            for (; 0 < d - a; ) c = $n(c), d--;
            for (; a--; ) {
              if (k === c || c !== null && k === c.alternate) break n;
              k = $n(k), c = $n(c);
            }
            k = null;
          }
          else k = null;
          w !== null && ci(m, p, w, k, !1), S !== null && R !== null && ci(m, R, S, k, !0);
        }
      }
      e: {
        if (p = f ? Kn(f) : window, w = p.nodeName && p.nodeName.toLowerCase(), w === "select" || w === "input" && p.type === "file") var E = Nf;
        else if (ti(p)) if (Is) E = Df;
        else {
          E = Tf;
          var P = zf;
        }
        else (w = p.nodeName) && w.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (E = Lf);
        if (E && (E = E(e, f))) {
          Us(m, E, t, v);
          break e;
        }
        P && P(e, p, f), e === "focusout" && (P = p._wrapperState) && P.controlled && p.type === "number" && no(p, "number", p.value);
      }
      switch (P = f ? Kn(f) : window, e) {
        case "focusin":
          (ti(P) || P.contentEditable === "true") && (Wn = P, mo = f, Mt = null);
          break;
        case "focusout":
          Mt = mo = Wn = null;
          break;
        case "mousedown":
          vo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          vo = !1, ii(m, t, v);
          break;
        case "selectionchange":
          if (Of) break;
        case "keydown":
        case "keyup":
          ii(m, t, v);
      }
      var N;
      if (ou) e: {
        switch (e) {
          case "compositionstart":
            var x = "onCompositionStart";
            break e;
          case "compositionend":
            x = "onCompositionEnd";
            break e;
          case "compositionupdate":
            x = "onCompositionUpdate";
            break e;
        }
        x = void 0;
      }
      else Hn ? Fs(e, t) && (x = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (x = "onCompositionStart");
      x && (Os && t.locale !== "ko" && (Hn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Hn && (N = Ms()) : (an = v, tu = "value" in an ? an.value : an.textContent, Hn = !0)), P = Br(f, x), 0 < P.length && (x = new qu(x, e, null, t, v), m.push({ event: x, listeners: P }), N ? x.data = N : (N = js(t), N !== null && (x.data = N)))), (N = Ef ? Cf(e, t) : _f(e, t)) && (f = Br(f, "onBeforeInput"), 0 < f.length && (v = new qu("onBeforeInput", "beforeinput", null, t, v), m.push({ event: v, listeners: f }), v.data = N));
    }
    Xs(m, n);
  });
}
function Yt(e, n, t) {
  return { instance: e, listener: n, currentTarget: t };
}
function Br(e, n) {
  for (var t = n + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Vt(e, t), o != null && r.unshift(Yt(e, o, l)), o = Vt(e, n), o != null && r.push(Yt(e, o, l))), e = e.return;
  }
  return r;
}
function $n(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ci(e, n, t, r, l) {
  for (var o = n._reactName, u = []; t !== null && t !== r; ) {
    var i = t, s = i.alternate, f = i.stateNode;
    if (s !== null && s === r) break;
    i.tag === 5 && f !== null && (i = f, l ? (s = Vt(t, o), s != null && u.unshift(Yt(t, s, i))) : l || (s = Vt(t, o), s != null && u.push(Yt(t, s, i)))), t = t.return;
  }
  u.length !== 0 && e.push({ event: n, listeners: u });
}
var If = /\r\n?/g, $f = /\u0000|\uFFFD/g;
function fi(e) {
  return (typeof e == "string" ? e : "" + e).replace(If, `
`).replace($f, "");
}
function hr(e, n, t) {
  if (n = fi(n), fi(e) !== n && t) throw Error(g(425));
}
function Hr() {
}
var ho = null, yo = null;
function go(e, n) {
  return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
}
var wo = typeof setTimeout == "function" ? setTimeout : void 0, Vf = typeof clearTimeout == "function" ? clearTimeout : void 0, di = typeof Promise == "function" ? Promise : void 0, Af = typeof queueMicrotask == "function" ? queueMicrotask : typeof di < "u" ? function(e) {
  return di.resolve(null).then(e).catch(Bf);
} : wo;
function Bf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Il(e, n) {
  var t = n, r = 0;
  do {
    var l = t.nextSibling;
    if (e.removeChild(t), l && l.nodeType === 8) if (t = l.data, t === "/$") {
      if (r === 0) {
        e.removeChild(l), Ht(n);
        return;
      }
      r--;
    } else t !== "$" && t !== "$?" && t !== "$!" || r++;
    t = l;
  } while (t);
  Ht(n);
}
function mn(e) {
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
function pi(e) {
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
var mt = Math.random().toString(36).slice(2), Be = "__reactFiber$" + mt, Xt = "__reactProps$" + mt, Je = "__reactContainer$" + mt, So = "__reactEvents$" + mt, Hf = "__reactListeners$" + mt, Wf = "__reactHandles$" + mt;
function Pn(e) {
  var n = e[Be];
  if (n) return n;
  for (var t = e.parentNode; t; ) {
    if (n = t[Je] || t[Be]) {
      if (t = n.alternate, n.child !== null || t !== null && t.child !== null) for (e = pi(e); e !== null; ) {
        if (t = e[Be]) return t;
        e = pi(e);
      }
      return n;
    }
    e = t, t = e.parentNode;
  }
  return null;
}
function lr(e) {
  return e = e[Be] || e[Je], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Kn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(g(33));
}
function al(e) {
  return e[Xt] || null;
}
var ko = [], Yn = -1;
function En(e) {
  return { current: e };
}
function A(e) {
  0 > Yn || (e.current = ko[Yn], ko[Yn] = null, Yn--);
}
function I(e, n) {
  Yn++, ko[Yn] = e.current, e.current = n;
}
var Sn = {}, ce = En(Sn), ye = En(!1), Dn = Sn;
function ut(e, n) {
  var t = e.type.contextTypes;
  if (!t) return Sn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in t) l[o] = n[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ge(e) {
  return e = e.childContextTypes, e != null;
}
function Wr() {
  A(ye), A(ce);
}
function mi(e, n, t) {
  if (ce.current !== Sn) throw Error(g(168));
  I(ce, n), I(ye, t);
}
function Zs(e, n, t) {
  var r = e.stateNode;
  if (n = n.childContextTypes, typeof r.getChildContext != "function") return t;
  r = r.getChildContext();
  for (var l in r) if (!(l in n)) throw Error(g(108, Nc(e) || "Unknown", l));
  return K({}, t, r);
}
function Qr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Sn, Dn = ce.current, I(ce, e), I(ye, ye.current), !0;
}
function vi(e, n, t) {
  var r = e.stateNode;
  if (!r) throw Error(g(169));
  t ? (e = Zs(e, n, Dn), r.__reactInternalMemoizedMergedChildContext = e, A(ye), A(ce), I(ce, e)) : A(ye), I(ye, t);
}
var Ke = null, cl = !1, $l = !1;
function Js(e) {
  Ke === null ? Ke = [e] : Ke.push(e);
}
function Qf(e) {
  cl = !0, Js(e);
}
function Cn() {
  if (!$l && Ke !== null) {
    $l = !0;
    var e = 0, n = j;
    try {
      var t = Ke;
      for (j = 1; e < t.length; e++) {
        var r = t[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ke = null, cl = !1;
    } catch (l) {
      throw Ke !== null && (Ke = Ke.slice(e + 1)), Es(qo, Cn), l;
    } finally {
      j = n, $l = !1;
    }
  }
  return null;
}
var Xn = [], Gn = 0, Kr = null, Yr = 0, Ne = [], ze = 0, Rn = null, Ye = 1, Xe = "";
function _n(e, n) {
  Xn[Gn++] = Yr, Xn[Gn++] = Kr, Kr = e, Yr = n;
}
function qs(e, n, t) {
  Ne[ze++] = Ye, Ne[ze++] = Xe, Ne[ze++] = Rn, Rn = e;
  var r = Ye;
  e = Xe;
  var l = 32 - Ue(r) - 1;
  r &= ~(1 << l), t += 1;
  var o = 32 - Ue(n) + l;
  if (30 < o) {
    var u = l - l % 5;
    o = (r & (1 << u) - 1).toString(32), r >>= u, l -= u, Ye = 1 << 32 - Ue(n) + l | t << l | r, Xe = o + e;
  } else Ye = 1 << o | t << l | r, Xe = e;
}
function iu(e) {
  e.return !== null && (_n(e, 1), qs(e, 1, 0));
}
function su(e) {
  for (; e === Kr; ) Kr = Xn[--Gn], Xn[Gn] = null, Yr = Xn[--Gn], Xn[Gn] = null;
  for (; e === Rn; ) Rn = Ne[--ze], Ne[ze] = null, Xe = Ne[--ze], Ne[ze] = null, Ye = Ne[--ze], Ne[ze] = null;
}
var Ee = null, ke = null, B = !1, je = null;
function bs(e, n) {
  var t = Te(5, null, null, 0);
  t.elementType = "DELETED", t.stateNode = n, t.return = e, n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t);
}
function hi(e, n) {
  switch (e.tag) {
    case 5:
      var t = e.type;
      return n = n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, Ee = e, ke = mn(n.firstChild), !0) : !1;
    case 6:
      return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, Ee = e, ke = null, !0) : !1;
    case 13:
      return n = n.nodeType !== 8 ? null : n, n !== null ? (t = Rn !== null ? { id: Ye, overflow: Xe } : null, e.memoizedState = { dehydrated: n, treeContext: t, retryLane: 1073741824 }, t = Te(18, null, null, 0), t.stateNode = n, t.return = e, e.child = t, Ee = e, ke = null, !0) : !1;
    default:
      return !1;
  }
}
function Eo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Co(e) {
  if (B) {
    var n = ke;
    if (n) {
      var t = n;
      if (!hi(e, n)) {
        if (Eo(e)) throw Error(g(418));
        n = mn(t.nextSibling);
        var r = Ee;
        n && hi(e, n) ? bs(r, t) : (e.flags = e.flags & -4097 | 2, B = !1, Ee = e);
      }
    } else {
      if (Eo(e)) throw Error(g(418));
      e.flags = e.flags & -4097 | 2, B = !1, Ee = e;
    }
  }
}
function yi(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ee = e;
}
function yr(e) {
  if (e !== Ee) return !1;
  if (!B) return yi(e), B = !0, !1;
  var n;
  if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !go(e.type, e.memoizedProps)), n && (n = ke)) {
    if (Eo(e)) throw ea(), Error(g(418));
    for (; n; ) bs(e, n), n = mn(n.nextSibling);
  }
  if (yi(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(g(317));
    e: {
      for (e = e.nextSibling, n = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (t === "/$") {
            if (n === 0) {
              ke = mn(e.nextSibling);
              break e;
            }
            n--;
          } else t !== "$" && t !== "$!" && t !== "$?" || n++;
        }
        e = e.nextSibling;
      }
      ke = null;
    }
  } else ke = Ee ? mn(e.stateNode.nextSibling) : null;
  return !0;
}
function ea() {
  for (var e = ke; e; ) e = mn(e.nextSibling);
}
function it() {
  ke = Ee = null, B = !1;
}
function au(e) {
  je === null ? je = [e] : je.push(e);
}
var Kf = en.ReactCurrentBatchConfig;
function Et(e, n, t) {
  if (e = t.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (t._owner) {
      if (t = t._owner, t) {
        if (t.tag !== 1) throw Error(g(309));
        var r = t.stateNode;
      }
      if (!r) throw Error(g(147, e));
      var l = r, o = "" + e;
      return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === o ? n.ref : (n = function(u) {
        var i = l.refs;
        u === null ? delete i[o] : i[o] = u;
      }, n._stringRef = o, n);
    }
    if (typeof e != "string") throw Error(g(284));
    if (!t._owner) throw Error(g(290, e));
  }
  return e;
}
function gr(e, n) {
  throw e = Object.prototype.toString.call(n), Error(g(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
}
function gi(e) {
  var n = e._init;
  return n(e._payload);
}
function na(e) {
  function n(c, a) {
    if (e) {
      var d = c.deletions;
      d === null ? (c.deletions = [a], c.flags |= 16) : d.push(a);
    }
  }
  function t(c, a) {
    if (!e) return null;
    for (; a !== null; ) n(c, a), a = a.sibling;
    return null;
  }
  function r(c, a) {
    for (c = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? c.set(a.key, a) : c.set(a.index, a), a = a.sibling;
    return c;
  }
  function l(c, a) {
    return c = gn(c, a), c.index = 0, c.sibling = null, c;
  }
  function o(c, a, d) {
    return c.index = d, e ? (d = c.alternate, d !== null ? (d = d.index, d < a ? (c.flags |= 2, a) : d) : (c.flags |= 2, a)) : (c.flags |= 1048576, a);
  }
  function u(c) {
    return e && c.alternate === null && (c.flags |= 2), c;
  }
  function i(c, a, d, y) {
    return a === null || a.tag !== 6 ? (a = Kl(d, c.mode, y), a.return = c, a) : (a = l(a, d), a.return = c, a);
  }
  function s(c, a, d, y) {
    var E = d.type;
    return E === Bn ? v(c, a, d.props.children, y, d.key) : a !== null && (a.elementType === E || typeof E == "object" && E !== null && E.$$typeof === ln && gi(E) === a.type) ? (y = l(a, d.props), y.ref = Et(c, a, d), y.return = c, y) : (y = Or(d.type, d.key, d.props, null, c.mode, y), y.ref = Et(c, a, d), y.return = c, y);
  }
  function f(c, a, d, y) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Yl(d, c.mode, y), a.return = c, a) : (a = l(a, d.children || []), a.return = c, a);
  }
  function v(c, a, d, y, E) {
    return a === null || a.tag !== 7 ? (a = Ln(d, c.mode, y, E), a.return = c, a) : (a = l(a, d), a.return = c, a);
  }
  function m(c, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = Kl("" + a, c.mode, d), a.return = c, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ir:
          return d = Or(a.type, a.key, a.props, null, c.mode, d), d.ref = Et(c, null, a), d.return = c, d;
        case An:
          return a = Yl(a, c.mode, d), a.return = c, a;
        case ln:
          var y = a._init;
          return m(c, y(a._payload), d);
      }
      if (Pt(a) || yt(a)) return a = Ln(a, c.mode, d, null), a.return = c, a;
      gr(c, a);
    }
    return null;
  }
  function p(c, a, d, y) {
    var E = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : i(c, a, "" + d, y);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ir:
          return d.key === E ? s(c, a, d, y) : null;
        case An:
          return d.key === E ? f(c, a, d, y) : null;
        case ln:
          return E = d._init, p(
            c,
            a,
            E(d._payload),
            y
          );
      }
      if (Pt(d) || yt(d)) return E !== null ? null : v(c, a, d, y, null);
      gr(c, d);
    }
    return null;
  }
  function w(c, a, d, y, E) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return c = c.get(d) || null, i(a, c, "" + y, E);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ir:
          return c = c.get(y.key === null ? d : y.key) || null, s(a, c, y, E);
        case An:
          return c = c.get(y.key === null ? d : y.key) || null, f(a, c, y, E);
        case ln:
          var P = y._init;
          return w(c, a, d, P(y._payload), E);
      }
      if (Pt(y) || yt(y)) return c = c.get(d) || null, v(a, c, y, E, null);
      gr(a, y);
    }
    return null;
  }
  function S(c, a, d, y) {
    for (var E = null, P = null, N = a, x = a = 0, $ = null; N !== null && x < d.length; x++) {
      N.index > x ? ($ = N, N = null) : $ = N.sibling;
      var M = p(c, N, d[x], y);
      if (M === null) {
        N === null && (N = $);
        break;
      }
      e && N && M.alternate === null && n(c, N), a = o(M, a, x), P === null ? E = M : P.sibling = M, P = M, N = $;
    }
    if (x === d.length) return t(c, N), B && _n(c, x), E;
    if (N === null) {
      for (; x < d.length; x++) N = m(c, d[x], y), N !== null && (a = o(N, a, x), P === null ? E = N : P.sibling = N, P = N);
      return B && _n(c, x), E;
    }
    for (N = r(c, N); x < d.length; x++) $ = w(N, c, x, d[x], y), $ !== null && (e && $.alternate !== null && N.delete($.key === null ? x : $.key), a = o($, a, x), P === null ? E = $ : P.sibling = $, P = $);
    return e && N.forEach(function(ue) {
      return n(c, ue);
    }), B && _n(c, x), E;
  }
  function k(c, a, d, y) {
    var E = yt(d);
    if (typeof E != "function") throw Error(g(150));
    if (d = E.call(d), d == null) throw Error(g(151));
    for (var P = E = null, N = a, x = a = 0, $ = null, M = d.next(); N !== null && !M.done; x++, M = d.next()) {
      N.index > x ? ($ = N, N = null) : $ = N.sibling;
      var ue = p(c, N, M.value, y);
      if (ue === null) {
        N === null && (N = $);
        break;
      }
      e && N && ue.alternate === null && n(c, N), a = o(ue, a, x), P === null ? E = ue : P.sibling = ue, P = ue, N = $;
    }
    if (M.done) return t(
      c,
      N
    ), B && _n(c, x), E;
    if (N === null) {
      for (; !M.done; x++, M = d.next()) M = m(c, M.value, y), M !== null && (a = o(M, a, x), P === null ? E = M : P.sibling = M, P = M);
      return B && _n(c, x), E;
    }
    for (N = r(c, N); !M.done; x++, M = d.next()) M = w(N, c, x, M.value, y), M !== null && (e && M.alternate !== null && N.delete(M.key === null ? x : M.key), a = o(M, a, x), P === null ? E = M : P.sibling = M, P = M);
    return e && N.forEach(function(nn) {
      return n(c, nn);
    }), B && _n(c, x), E;
  }
  function R(c, a, d, y) {
    if (typeof d == "object" && d !== null && d.type === Bn && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ir:
          e: {
            for (var E = d.key, P = a; P !== null; ) {
              if (P.key === E) {
                if (E = d.type, E === Bn) {
                  if (P.tag === 7) {
                    t(c, P.sibling), a = l(P, d.props.children), a.return = c, c = a;
                    break e;
                  }
                } else if (P.elementType === E || typeof E == "object" && E !== null && E.$$typeof === ln && gi(E) === P.type) {
                  t(c, P.sibling), a = l(P, d.props), a.ref = Et(c, P, d), a.return = c, c = a;
                  break e;
                }
                t(c, P);
                break;
              } else n(c, P);
              P = P.sibling;
            }
            d.type === Bn ? (a = Ln(d.props.children, c.mode, y, d.key), a.return = c, c = a) : (y = Or(d.type, d.key, d.props, null, c.mode, y), y.ref = Et(c, a, d), y.return = c, c = y);
          }
          return u(c);
        case An:
          e: {
            for (P = d.key; a !== null; ) {
              if (a.key === P) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                t(c, a.sibling), a = l(a, d.children || []), a.return = c, c = a;
                break e;
              } else {
                t(c, a);
                break;
              }
              else n(c, a);
              a = a.sibling;
            }
            a = Yl(d, c.mode, y), a.return = c, c = a;
          }
          return u(c);
        case ln:
          return P = d._init, R(c, a, P(d._payload), y);
      }
      if (Pt(d)) return S(c, a, d, y);
      if (yt(d)) return k(c, a, d, y);
      gr(c, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (t(c, a.sibling), a = l(a, d), a.return = c, c = a) : (t(c, a), a = Kl(d, c.mode, y), a.return = c, c = a), u(c)) : t(c, a);
  }
  return R;
}
var st = na(!0), ta = na(!1), Xr = En(null), Gr = null, Zn = null, cu = null;
function fu() {
  cu = Zn = Gr = null;
}
function du(e) {
  var n = Xr.current;
  A(Xr), e._currentValue = n;
}
function _o(e, n, t) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === t) break;
    e = e.return;
  }
}
function rt(e, n) {
  Gr = e, cu = Zn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & n && (he = !0), e.firstContext = null);
}
function De(e) {
  var n = e._currentValue;
  if (cu !== e) if (e = { context: e, memoizedValue: n, next: null }, Zn === null) {
    if (Gr === null) throw Error(g(308));
    Zn = e, Gr.dependencies = { lanes: 0, firstContext: e };
  } else Zn = Zn.next = e;
  return n;
}
var Nn = null;
function pu(e) {
  Nn === null ? Nn = [e] : Nn.push(e);
}
function ra(e, n, t, r) {
  var l = n.interleaved;
  return l === null ? (t.next = t, pu(n)) : (t.next = l.next, l.next = t), n.interleaved = t, qe(e, r);
}
function qe(e, n) {
  e.lanes |= n;
  var t = e.alternate;
  for (t !== null && (t.lanes |= n), t = e, e = e.return; e !== null; ) e.childLanes |= n, t = e.alternate, t !== null && (t.childLanes |= n), t = e, e = e.return;
  return t.tag === 3 ? t.stateNode : null;
}
var on = !1;
function mu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function la(e, n) {
  e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ge(e, n) {
  return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
}
function vn(e, n, t) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, F & 2) {
    var l = r.pending;
    return l === null ? n.next = n : (n.next = l.next, l.next = n), r.pending = n, qe(e, t);
  }
  return l = r.interleaved, l === null ? (n.next = n, pu(r)) : (n.next = l.next, l.next = n), r.interleaved = n, qe(e, t);
}
function zr(e, n, t) {
  if (n = n.updateQueue, n !== null && (n = n.shared, (t & 4194240) !== 0)) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, bo(e, t);
  }
}
function wi(e, n) {
  var t = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, t === r)) {
    var l = null, o = null;
    if (t = t.firstBaseUpdate, t !== null) {
      do {
        var u = { eventTime: t.eventTime, lane: t.lane, tag: t.tag, payload: t.payload, callback: t.callback, next: null };
        o === null ? l = o = u : o = o.next = u, t = t.next;
      } while (t !== null);
      o === null ? l = o = n : o = o.next = n;
    } else l = o = n;
    t = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = t;
    return;
  }
  e = t.lastBaseUpdate, e === null ? t.firstBaseUpdate = n : e.next = n, t.lastBaseUpdate = n;
}
function Zr(e, n, t, r) {
  var l = e.updateQueue;
  on = !1;
  var o = l.firstBaseUpdate, u = l.lastBaseUpdate, i = l.shared.pending;
  if (i !== null) {
    l.shared.pending = null;
    var s = i, f = s.next;
    s.next = null, u === null ? o = f : u.next = f, u = s;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, i = v.lastBaseUpdate, i !== u && (i === null ? v.firstBaseUpdate = f : i.next = f, v.lastBaseUpdate = s));
  }
  if (o !== null) {
    var m = l.baseState;
    u = 0, v = f = s = null, i = o;
    do {
      var p = i.lane, w = i.eventTime;
      if ((r & p) === p) {
        v !== null && (v = v.next = {
          eventTime: w,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var S = e, k = i;
          switch (p = n, w = t, k.tag) {
            case 1:
              if (S = k.payload, typeof S == "function") {
                m = S.call(w, m, p);
                break e;
              }
              m = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = k.payload, p = typeof S == "function" ? S.call(w, m, p) : S, p == null) break e;
              m = K({}, m, p);
              break e;
            case 2:
              on = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [i] : p.push(i));
      } else w = { eventTime: w, lane: p, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, v === null ? (f = v = w, s = m) : v = v.next = w, u |= p;
      if (i = i.next, i === null) {
        if (i = l.shared.pending, i === null) break;
        p = i, i = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (s = m), l.baseState = s, l.firstBaseUpdate = f, l.lastBaseUpdate = v, n = l.shared.interleaved, n !== null) {
      l = n;
      do
        u |= l.lane, l = l.next;
      while (l !== n);
    } else o === null && (l.shared.lanes = 0);
    On |= u, e.lanes = u, e.memoizedState = m;
  }
}
function Si(e, n, t) {
  if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
    var r = e[n], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = t, typeof l != "function") throw Error(g(191, l));
      l.call(r);
    }
  }
}
var or = {}, We = En(or), Gt = En(or), Zt = En(or);
function zn(e) {
  if (e === or) throw Error(g(174));
  return e;
}
function vu(e, n) {
  switch (I(Zt, n), I(Gt, e), I(We, or), e = n.nodeType, e) {
    case 9:
    case 11:
      n = (n = n.documentElement) ? n.namespaceURI : ro(null, "");
      break;
    default:
      e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = ro(n, e);
  }
  A(We), I(We, n);
}
function at() {
  A(We), A(Gt), A(Zt);
}
function oa(e) {
  zn(Zt.current);
  var n = zn(We.current), t = ro(n, e.type);
  n !== t && (I(Gt, e), I(We, t));
}
function hu(e) {
  Gt.current === e && (A(We), A(Gt));
}
var W = En(0);
function Jr(e) {
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
var Vl = [];
function yu() {
  for (var e = 0; e < Vl.length; e++) Vl[e]._workInProgressVersionPrimary = null;
  Vl.length = 0;
}
var Tr = en.ReactCurrentDispatcher, Al = en.ReactCurrentBatchConfig, Mn = 0, Q = null, J = null, ee = null, qr = !1, Ot = !1, Jt = 0, Yf = 0;
function ie() {
  throw Error(g(321));
}
function gu(e, n) {
  if (n === null) return !1;
  for (var t = 0; t < n.length && t < e.length; t++) if (!$e(e[t], n[t])) return !1;
  return !0;
}
function wu(e, n, t, r, l, o) {
  if (Mn = o, Q = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, Tr.current = e === null || e.memoizedState === null ? Jf : qf, e = t(r, l), Ot) {
    o = 0;
    do {
      if (Ot = !1, Jt = 0, 25 <= o) throw Error(g(301));
      o += 1, ee = J = null, n.updateQueue = null, Tr.current = bf, e = t(r, l);
    } while (Ot);
  }
  if (Tr.current = br, n = J !== null && J.next !== null, Mn = 0, ee = J = Q = null, qr = !1, n) throw Error(g(300));
  return e;
}
function Su() {
  var e = Jt !== 0;
  return Jt = 0, e;
}
function Ae() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ee === null ? Q.memoizedState = ee = e : ee = ee.next = e, ee;
}
function Re() {
  if (J === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var n = ee === null ? Q.memoizedState : ee.next;
  if (n !== null) ee = n, J = e;
  else {
    if (e === null) throw Error(g(310));
    J = e, e = { memoizedState: J.memoizedState, baseState: J.baseState, baseQueue: J.baseQueue, queue: J.queue, next: null }, ee === null ? Q.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function qt(e, n) {
  return typeof n == "function" ? n(e) : n;
}
function Bl(e) {
  var n = Re(), t = n.queue;
  if (t === null) throw Error(g(311));
  t.lastRenderedReducer = e;
  var r = J, l = r.baseQueue, o = t.pending;
  if (o !== null) {
    if (l !== null) {
      var u = l.next;
      l.next = o.next, o.next = u;
    }
    r.baseQueue = l = o, t.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var i = u = null, s = null, f = o;
    do {
      var v = f.lane;
      if ((Mn & v) === v) s !== null && (s = s.next = { lane: 0, action: f.action, hasEagerState: f.hasEagerState, eagerState: f.eagerState, next: null }), r = f.hasEagerState ? f.eagerState : e(r, f.action);
      else {
        var m = {
          lane: v,
          action: f.action,
          hasEagerState: f.hasEagerState,
          eagerState: f.eagerState,
          next: null
        };
        s === null ? (i = s = m, u = r) : s = s.next = m, Q.lanes |= v, On |= v;
      }
      f = f.next;
    } while (f !== null && f !== o);
    s === null ? u = r : s.next = i, $e(r, n.memoizedState) || (he = !0), n.memoizedState = r, n.baseState = u, n.baseQueue = s, t.lastRenderedState = r;
  }
  if (e = t.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Q.lanes |= o, On |= o, l = l.next;
    while (l !== e);
  } else l === null && (t.lanes = 0);
  return [n.memoizedState, t.dispatch];
}
function Hl(e) {
  var n = Re(), t = n.queue;
  if (t === null) throw Error(g(311));
  t.lastRenderedReducer = e;
  var r = t.dispatch, l = t.pending, o = n.memoizedState;
  if (l !== null) {
    t.pending = null;
    var u = l = l.next;
    do
      o = e(o, u.action), u = u.next;
    while (u !== l);
    $e(o, n.memoizedState) || (he = !0), n.memoizedState = o, n.baseQueue === null && (n.baseState = o), t.lastRenderedState = o;
  }
  return [o, r];
}
function ua() {
}
function ia(e, n) {
  var t = Q, r = Re(), l = n(), o = !$e(r.memoizedState, l);
  if (o && (r.memoizedState = l, he = !0), r = r.queue, ku(ca.bind(null, t, r, e), [e]), r.getSnapshot !== n || o || ee !== null && ee.memoizedState.tag & 1) {
    if (t.flags |= 2048, bt(9, aa.bind(null, t, r, l, n), void 0, null), ne === null) throw Error(g(349));
    Mn & 30 || sa(t, n, l);
  }
  return l;
}
function sa(e, n, t) {
  e.flags |= 16384, e = { getSnapshot: n, value: t }, n = Q.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, Q.updateQueue = n, n.stores = [e]) : (t = n.stores, t === null ? n.stores = [e] : t.push(e));
}
function aa(e, n, t, r) {
  n.value = t, n.getSnapshot = r, fa(n) && da(e);
}
function ca(e, n, t) {
  return t(function() {
    fa(n) && da(e);
  });
}
function fa(e) {
  var n = e.getSnapshot;
  e = e.value;
  try {
    var t = n();
    return !$e(e, t);
  } catch {
    return !0;
  }
}
function da(e) {
  var n = qe(e, 1);
  n !== null && Ie(n, e, 1, -1);
}
function ki(e) {
  var n = Ae();
  return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: qt, lastRenderedState: e }, n.queue = e, e = e.dispatch = Zf.bind(null, Q, e), [n.memoizedState, e];
}
function bt(e, n, t, r) {
  return e = { tag: e, create: n, destroy: t, deps: r, next: null }, n = Q.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, Q.updateQueue = n, n.lastEffect = e.next = e) : (t = n.lastEffect, t === null ? n.lastEffect = e.next = e : (r = t.next, t.next = e, e.next = r, n.lastEffect = e)), e;
}
function pa() {
  return Re().memoizedState;
}
function Lr(e, n, t, r) {
  var l = Ae();
  Q.flags |= e, l.memoizedState = bt(1 | n, t, void 0, r === void 0 ? null : r);
}
function fl(e, n, t, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (J !== null) {
    var u = J.memoizedState;
    if (o = u.destroy, r !== null && gu(r, u.deps)) {
      l.memoizedState = bt(n, t, o, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = bt(1 | n, t, o, r);
}
function Ei(e, n) {
  return Lr(8390656, 8, e, n);
}
function ku(e, n) {
  return fl(2048, 8, e, n);
}
function ma(e, n) {
  return fl(4, 2, e, n);
}
function va(e, n) {
  return fl(4, 4, e, n);
}
function ha(e, n) {
  if (typeof n == "function") return e = e(), n(e), function() {
    n(null);
  };
  if (n != null) return e = e(), n.current = e, function() {
    n.current = null;
  };
}
function ya(e, n, t) {
  return t = t != null ? t.concat([e]) : null, fl(4, 4, ha.bind(null, n, e), t);
}
function Eu() {
}
function ga(e, n) {
  var t = Re();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && gu(n, r[1]) ? r[0] : (t.memoizedState = [e, n], e);
}
function wa(e, n) {
  var t = Re();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && gu(n, r[1]) ? r[0] : (e = e(), t.memoizedState = [e, n], e);
}
function Sa(e, n, t) {
  return Mn & 21 ? ($e(t, n) || (t = xs(), Q.lanes |= t, On |= t, e.baseState = !0), n) : (e.baseState && (e.baseState = !1, he = !0), e.memoizedState = t);
}
function Xf(e, n) {
  var t = j;
  j = t !== 0 && 4 > t ? t : 4, e(!0);
  var r = Al.transition;
  Al.transition = {};
  try {
    e(!1), n();
  } finally {
    j = t, Al.transition = r;
  }
}
function ka() {
  return Re().memoizedState;
}
function Gf(e, n, t) {
  var r = yn(e);
  if (t = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null }, Ea(e)) Ca(n, t);
  else if (t = ra(e, n, t, r), t !== null) {
    var l = de();
    Ie(t, e, r, l), _a(t, n, r);
  }
}
function Zf(e, n, t) {
  var r = yn(e), l = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null };
  if (Ea(e)) Ca(n, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = n.lastRenderedReducer, o !== null)) try {
      var u = n.lastRenderedState, i = o(u, t);
      if (l.hasEagerState = !0, l.eagerState = i, $e(i, u)) {
        var s = n.interleaved;
        s === null ? (l.next = l, pu(n)) : (l.next = s.next, s.next = l), n.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    t = ra(e, n, l, r), t !== null && (l = de(), Ie(t, e, r, l), _a(t, n, r));
  }
}
function Ea(e) {
  var n = e.alternate;
  return e === Q || n !== null && n === Q;
}
function Ca(e, n) {
  Ot = qr = !0;
  var t = e.pending;
  t === null ? n.next = n : (n.next = t.next, t.next = n), e.pending = n;
}
function _a(e, n, t) {
  if (t & 4194240) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, bo(e, t);
  }
}
var br = { readContext: De, useCallback: ie, useContext: ie, useEffect: ie, useImperativeHandle: ie, useInsertionEffect: ie, useLayoutEffect: ie, useMemo: ie, useReducer: ie, useRef: ie, useState: ie, useDebugValue: ie, useDeferredValue: ie, useTransition: ie, useMutableSource: ie, useSyncExternalStore: ie, useId: ie, unstable_isNewReconciler: !1 }, Jf = { readContext: De, useCallback: function(e, n) {
  return Ae().memoizedState = [e, n === void 0 ? null : n], e;
}, useContext: De, useEffect: Ei, useImperativeHandle: function(e, n, t) {
  return t = t != null ? t.concat([e]) : null, Lr(
    4194308,
    4,
    ha.bind(null, n, e),
    t
  );
}, useLayoutEffect: function(e, n) {
  return Lr(4194308, 4, e, n);
}, useInsertionEffect: function(e, n) {
  return Lr(4, 2, e, n);
}, useMemo: function(e, n) {
  var t = Ae();
  return n = n === void 0 ? null : n, e = e(), t.memoizedState = [e, n], e;
}, useReducer: function(e, n, t) {
  var r = Ae();
  return n = t !== void 0 ? t(n) : n, r.memoizedState = r.baseState = n, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: n }, r.queue = e, e = e.dispatch = Gf.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var n = Ae();
  return e = { current: e }, n.memoizedState = e;
}, useState: ki, useDebugValue: Eu, useDeferredValue: function(e) {
  return Ae().memoizedState = e;
}, useTransition: function() {
  var e = ki(!1), n = e[0];
  return e = Xf.bind(null, e[1]), Ae().memoizedState = e, [n, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, n, t) {
  var r = Q, l = Ae();
  if (B) {
    if (t === void 0) throw Error(g(407));
    t = t();
  } else {
    if (t = n(), ne === null) throw Error(g(349));
    Mn & 30 || sa(r, n, t);
  }
  l.memoizedState = t;
  var o = { value: t, getSnapshot: n };
  return l.queue = o, Ei(ca.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, bt(9, aa.bind(null, r, o, t, n), void 0, null), t;
}, useId: function() {
  var e = Ae(), n = ne.identifierPrefix;
  if (B) {
    var t = Xe, r = Ye;
    t = (r & ~(1 << 32 - Ue(r) - 1)).toString(32) + t, n = ":" + n + "R" + t, t = Jt++, 0 < t && (n += "H" + t.toString(32)), n += ":";
  } else t = Yf++, n = ":" + n + "r" + t.toString(32) + ":";
  return e.memoizedState = n;
}, unstable_isNewReconciler: !1 }, qf = {
  readContext: De,
  useCallback: ga,
  useContext: De,
  useEffect: ku,
  useImperativeHandle: ya,
  useInsertionEffect: ma,
  useLayoutEffect: va,
  useMemo: wa,
  useReducer: Bl,
  useRef: pa,
  useState: function() {
    return Bl(qt);
  },
  useDebugValue: Eu,
  useDeferredValue: function(e) {
    var n = Re();
    return Sa(n, J.memoizedState, e);
  },
  useTransition: function() {
    var e = Bl(qt)[0], n = Re().memoizedState;
    return [e, n];
  },
  useMutableSource: ua,
  useSyncExternalStore: ia,
  useId: ka,
  unstable_isNewReconciler: !1
}, bf = { readContext: De, useCallback: ga, useContext: De, useEffect: ku, useImperativeHandle: ya, useInsertionEffect: ma, useLayoutEffect: va, useMemo: wa, useReducer: Hl, useRef: pa, useState: function() {
  return Hl(qt);
}, useDebugValue: Eu, useDeferredValue: function(e) {
  var n = Re();
  return J === null ? n.memoizedState = e : Sa(n, J.memoizedState, e);
}, useTransition: function() {
  var e = Hl(qt)[0], n = Re().memoizedState;
  return [e, n];
}, useMutableSource: ua, useSyncExternalStore: ia, useId: ka, unstable_isNewReconciler: !1 };
function Oe(e, n) {
  if (e && e.defaultProps) {
    n = K({}, n), e = e.defaultProps;
    for (var t in e) n[t] === void 0 && (n[t] = e[t]);
    return n;
  }
  return n;
}
function xo(e, n, t, r) {
  n = e.memoizedState, t = t(r, n), t = t == null ? n : K({}, n, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t);
}
var dl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Un(e) === e : !1;
}, enqueueSetState: function(e, n, t) {
  e = e._reactInternals;
  var r = de(), l = yn(e), o = Ge(r, l);
  o.payload = n, t != null && (o.callback = t), n = vn(e, o, l), n !== null && (Ie(n, e, l, r), zr(n, e, l));
}, enqueueReplaceState: function(e, n, t) {
  e = e._reactInternals;
  var r = de(), l = yn(e), o = Ge(r, l);
  o.tag = 1, o.payload = n, t != null && (o.callback = t), n = vn(e, o, l), n !== null && (Ie(n, e, l, r), zr(n, e, l));
}, enqueueForceUpdate: function(e, n) {
  e = e._reactInternals;
  var t = de(), r = yn(e), l = Ge(t, r);
  l.tag = 2, n != null && (l.callback = n), n = vn(e, l, r), n !== null && (Ie(n, e, r, t), zr(n, e, r));
} };
function Ci(e, n, t, r, l, o, u) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, u) : n.prototype && n.prototype.isPureReactComponent ? !Qt(t, r) || !Qt(l, o) : !0;
}
function xa(e, n, t) {
  var r = !1, l = Sn, o = n.contextType;
  return typeof o == "object" && o !== null ? o = De(o) : (l = ge(n) ? Dn : ce.current, r = n.contextTypes, o = (r = r != null) ? ut(e, l) : Sn), n = new n(t, o), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = dl, e.stateNode = n, n._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), n;
}
function _i(e, n, t, r) {
  e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(t, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(t, r), n.state !== e && dl.enqueueReplaceState(n, n.state, null);
}
function Po(e, n, t, r) {
  var l = e.stateNode;
  l.props = t, l.state = e.memoizedState, l.refs = {}, mu(e);
  var o = n.contextType;
  typeof o == "object" && o !== null ? l.context = De(o) : (o = ge(n) ? Dn : ce.current, l.context = ut(e, o)), l.state = e.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (xo(e, n, o, t), l.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (n = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), n !== l.state && dl.enqueueReplaceState(l, l.state, null), Zr(e, t, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function ct(e, n) {
  try {
    var t = "", r = n;
    do
      t += Pc(r), r = r.return;
    while (r);
    var l = t;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: n, stack: l, digest: null };
}
function Wl(e, n, t) {
  return { value: e, source: null, stack: t ?? null, digest: n ?? null };
}
function No(e, n) {
  try {
    console.error(n.value);
  } catch (t) {
    setTimeout(function() {
      throw t;
    });
  }
}
var ed = typeof WeakMap == "function" ? WeakMap : Map;
function Pa(e, n, t) {
  t = Ge(-1, t), t.tag = 3, t.payload = { element: null };
  var r = n.value;
  return t.callback = function() {
    nl || (nl = !0, Uo = r), No(e, n);
  }, t;
}
function Na(e, n, t) {
  t = Ge(-1, t), t.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = n.value;
    t.payload = function() {
      return r(l);
    }, t.callback = function() {
      No(e, n);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (t.callback = function() {
    No(e, n), typeof r != "function" && (hn === null ? hn = /* @__PURE__ */ new Set([this]) : hn.add(this));
    var u = n.stack;
    this.componentDidCatch(n.value, { componentStack: u !== null ? u : "" });
  }), t;
}
function xi(e, n, t) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new ed();
    var l = /* @__PURE__ */ new Set();
    r.set(n, l);
  } else l = r.get(n), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(n, l));
  l.has(t) || (l.add(t), e = md.bind(null, e, n, t), n.then(e, e));
}
function Pi(e) {
  do {
    var n;
    if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ni(e, n, t, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === n ? e.flags |= 65536 : (e.flags |= 128, t.flags |= 131072, t.flags &= -52805, t.tag === 1 && (t.alternate === null ? t.tag = 17 : (n = Ge(-1, 1), n.tag = 2, vn(t, n, 1))), t.lanes |= 1), e);
}
var nd = en.ReactCurrentOwner, he = !1;
function fe(e, n, t, r) {
  n.child = e === null ? ta(n, null, t, r) : st(n, e.child, t, r);
}
function zi(e, n, t, r, l) {
  t = t.render;
  var o = n.ref;
  return rt(n, l), r = wu(e, n, t, r, o, l), t = Su(), e !== null && !he ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, be(e, n, l)) : (B && t && iu(n), n.flags |= 1, fe(e, n, r, l), n.child);
}
function Ti(e, n, t, r, l) {
  if (e === null) {
    var o = t.type;
    return typeof o == "function" && !Lu(o) && o.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (n.tag = 15, n.type = o, za(e, n, o, r, l)) : (e = Or(t.type, null, r, n, n.mode, l), e.ref = n.ref, e.return = n, n.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var u = o.memoizedProps;
    if (t = t.compare, t = t !== null ? t : Qt, t(u, r) && e.ref === n.ref) return be(e, n, l);
  }
  return n.flags |= 1, e = gn(o, r), e.ref = n.ref, e.return = n, n.child = e;
}
function za(e, n, t, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Qt(o, r) && e.ref === n.ref) if (he = !1, n.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (he = !0);
    else return n.lanes = e.lanes, be(e, n, l);
  }
  return zo(e, n, t, r, l);
}
function Ta(e, n, t) {
  var r = n.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(n.mode & 1)) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, I(qn, Se), Se |= t;
  else {
    if (!(t & 1073741824)) return e = o !== null ? o.baseLanes | t : t, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, n.updateQueue = null, I(qn, Se), Se |= e, null;
    n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : t, I(qn, Se), Se |= r;
  }
  else o !== null ? (r = o.baseLanes | t, n.memoizedState = null) : r = t, I(qn, Se), Se |= r;
  return fe(e, n, l, t), n.child;
}
function La(e, n) {
  var t = n.ref;
  (e === null && t !== null || e !== null && e.ref !== t) && (n.flags |= 512, n.flags |= 2097152);
}
function zo(e, n, t, r, l) {
  var o = ge(t) ? Dn : ce.current;
  return o = ut(n, o), rt(n, l), t = wu(e, n, t, r, o, l), r = Su(), e !== null && !he ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, be(e, n, l)) : (B && r && iu(n), n.flags |= 1, fe(e, n, t, l), n.child);
}
function Li(e, n, t, r, l) {
  if (ge(t)) {
    var o = !0;
    Qr(n);
  } else o = !1;
  if (rt(n, l), n.stateNode === null) Dr(e, n), xa(n, t, r), Po(n, t, r, l), r = !0;
  else if (e === null) {
    var u = n.stateNode, i = n.memoizedProps;
    u.props = i;
    var s = u.context, f = t.contextType;
    typeof f == "object" && f !== null ? f = De(f) : (f = ge(t) ? Dn : ce.current, f = ut(n, f));
    var v = t.getDerivedStateFromProps, m = typeof v == "function" || typeof u.getSnapshotBeforeUpdate == "function";
    m || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== r || s !== f) && _i(n, u, r, f), on = !1;
    var p = n.memoizedState;
    u.state = p, Zr(n, r, u, l), s = n.memoizedState, i !== r || p !== s || ye.current || on ? (typeof v == "function" && (xo(n, t, v, r), s = n.memoizedState), (i = on || Ci(n, t, i, r, p, s, f)) ? (m || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = s), u.props = r, u.state = s, u.context = f, r = i) : (typeof u.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
  } else {
    u = n.stateNode, la(e, n), i = n.memoizedProps, f = n.type === n.elementType ? i : Oe(n.type, i), u.props = f, m = n.pendingProps, p = u.context, s = t.contextType, typeof s == "object" && s !== null ? s = De(s) : (s = ge(t) ? Dn : ce.current, s = ut(n, s));
    var w = t.getDerivedStateFromProps;
    (v = typeof w == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== m || p !== s) && _i(n, u, r, s), on = !1, p = n.memoizedState, u.state = p, Zr(n, r, u, l);
    var S = n.memoizedState;
    i !== m || p !== S || ye.current || on ? (typeof w == "function" && (xo(n, t, w, r), S = n.memoizedState), (f = on || Ci(n, t, f, r, p, S, s) || !1) ? (v || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, S, s), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(r, S, s)), typeof u.componentDidUpdate == "function" && (n.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = S), u.props = r, u.state = S, u.context = s, r = f) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 1024), r = !1);
  }
  return To(e, n, t, r, o, l);
}
function To(e, n, t, r, l, o) {
  La(e, n);
  var u = (n.flags & 128) !== 0;
  if (!r && !u) return l && vi(n, t, !1), be(e, n, o);
  r = n.stateNode, nd.current = n;
  var i = u && typeof t.getDerivedStateFromError != "function" ? null : r.render();
  return n.flags |= 1, e !== null && u ? (n.child = st(n, e.child, null, o), n.child = st(n, null, i, o)) : fe(e, n, i, o), n.memoizedState = r.state, l && vi(n, t, !0), n.child;
}
function Da(e) {
  var n = e.stateNode;
  n.pendingContext ? mi(e, n.pendingContext, n.pendingContext !== n.context) : n.context && mi(e, n.context, !1), vu(e, n.containerInfo);
}
function Di(e, n, t, r, l) {
  return it(), au(l), n.flags |= 256, fe(e, n, t, r), n.child;
}
var Lo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Do(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ra(e, n, t) {
  var r = n.pendingProps, l = W.current, o = !1, u = (n.flags & 128) !== 0, i;
  if ((i = u) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), I(W, l & 1), e === null)
    return Co(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (n.mode & 1 ? e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824 : n.lanes = 1, null) : (u = r.children, e = r.fallback, o ? (r = n.mode, o = n.child, u = { mode: "hidden", children: u }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = u) : o = vl(u, r, 0, null), e = Ln(e, r, t, null), o.return = n, e.return = n, o.sibling = e, n.child = o, n.child.memoizedState = Do(t), n.memoizedState = Lo, e) : Cu(n, u));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return td(e, n, u, r, i, l, t);
  if (o) {
    o = r.fallback, u = n.mode, l = e.child, i = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(u & 1) && n.child !== l ? (r = n.child, r.childLanes = 0, r.pendingProps = s, n.deletions = null) : (r = gn(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = gn(i, o) : (o = Ln(o, u, t, null), o.flags |= 2), o.return = n, r.return = n, r.sibling = o, n.child = r, r = o, o = n.child, u = e.child.memoizedState, u = u === null ? Do(t) : { baseLanes: u.baseLanes | t, cachePool: null, transitions: u.transitions }, o.memoizedState = u, o.childLanes = e.childLanes & ~t, n.memoizedState = Lo, r;
  }
  return o = e.child, e = o.sibling, r = gn(o, { mode: "visible", children: r.children }), !(n.mode & 1) && (r.lanes = t), r.return = n, r.sibling = null, e !== null && (t = n.deletions, t === null ? (n.deletions = [e], n.flags |= 16) : t.push(e)), n.child = r, n.memoizedState = null, r;
}
function Cu(e, n) {
  return n = vl({ mode: "visible", children: n }, e.mode, 0, null), n.return = e, e.child = n;
}
function wr(e, n, t, r) {
  return r !== null && au(r), st(n, e.child, null, t), e = Cu(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
}
function td(e, n, t, r, l, o, u) {
  if (t)
    return n.flags & 256 ? (n.flags &= -257, r = Wl(Error(g(422))), wr(e, n, u, r)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (o = r.fallback, l = n.mode, r = vl({ mode: "visible", children: r.children }, l, 0, null), o = Ln(o, l, u, null), o.flags |= 2, r.return = n, o.return = n, r.sibling = o, n.child = r, n.mode & 1 && st(n, e.child, null, u), n.child.memoizedState = Do(u), n.memoizedState = Lo, o);
  if (!(n.mode & 1)) return wr(e, n, u, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(g(419)), r = Wl(o, r, void 0), wr(e, n, u, r);
  }
  if (i = (u & e.childLanes) !== 0, he || i) {
    if (r = ne, r !== null) {
      switch (u & -u) {
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
      l = l & (r.suspendedLanes | u) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, qe(e, l), Ie(r, e, l, -1));
    }
    return Tu(), r = Wl(Error(g(421))), wr(e, n, u, r);
  }
  return l.data === "$?" ? (n.flags |= 128, n.child = e.child, n = vd.bind(null, e), l._reactRetry = n, null) : (e = o.treeContext, ke = mn(l.nextSibling), Ee = n, B = !0, je = null, e !== null && (Ne[ze++] = Ye, Ne[ze++] = Xe, Ne[ze++] = Rn, Ye = e.id, Xe = e.overflow, Rn = n), n = Cu(n, r.children), n.flags |= 4096, n);
}
function Ri(e, n, t) {
  e.lanes |= n;
  var r = e.alternate;
  r !== null && (r.lanes |= n), _o(e.return, n, t);
}
function Ql(e, n, t, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: r, tail: t, tailMode: l } : (o.isBackwards = n, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = t, o.tailMode = l);
}
function Ma(e, n, t) {
  var r = n.pendingProps, l = r.revealOrder, o = r.tail;
  if (fe(e, n, r.children, t), r = W.current, r & 2) r = r & 1 | 2, n.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = n.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ri(e, t, n);
      else if (e.tag === 19) Ri(e, t, n);
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
  if (I(W, r), !(n.mode & 1)) n.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (t = n.child, l = null; t !== null; ) e = t.alternate, e !== null && Jr(e) === null && (l = t), t = t.sibling;
      t = l, t === null ? (l = n.child, n.child = null) : (l = t.sibling, t.sibling = null), Ql(n, !1, l, t, o);
      break;
    case "backwards":
      for (t = null, l = n.child, n.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Jr(e) === null) {
          n.child = l;
          break;
        }
        e = l.sibling, l.sibling = t, t = l, l = e;
      }
      Ql(n, !0, t, null, o);
      break;
    case "together":
      Ql(n, !1, null, null, void 0);
      break;
    default:
      n.memoizedState = null;
  }
  return n.child;
}
function Dr(e, n) {
  !(n.mode & 1) && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2);
}
function be(e, n, t) {
  if (e !== null && (n.dependencies = e.dependencies), On |= n.lanes, !(t & n.childLanes)) return null;
  if (e !== null && n.child !== e.child) throw Error(g(153));
  if (n.child !== null) {
    for (e = n.child, t = gn(e, e.pendingProps), n.child = t, t.return = n; e.sibling !== null; ) e = e.sibling, t = t.sibling = gn(e, e.pendingProps), t.return = n;
    t.sibling = null;
  }
  return n.child;
}
function rd(e, n, t) {
  switch (n.tag) {
    case 3:
      Da(n), it();
      break;
    case 5:
      oa(n);
      break;
    case 1:
      ge(n.type) && Qr(n);
      break;
    case 4:
      vu(n, n.stateNode.containerInfo);
      break;
    case 10:
      var r = n.type._context, l = n.memoizedProps.value;
      I(Xr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = n.memoizedState, r !== null)
        return r.dehydrated !== null ? (I(W, W.current & 1), n.flags |= 128, null) : t & n.child.childLanes ? Ra(e, n, t) : (I(W, W.current & 1), e = be(e, n, t), e !== null ? e.sibling : null);
      I(W, W.current & 1);
      break;
    case 19:
      if (r = (t & n.childLanes) !== 0, e.flags & 128) {
        if (r) return Ma(e, n, t);
        n.flags |= 128;
      }
      if (l = n.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(W, W.current), r) break;
      return null;
    case 22:
    case 23:
      return n.lanes = 0, Ta(e, n, t);
  }
  return be(e, n, t);
}
var Oa, Ro, Fa, ja;
Oa = function(e, n) {
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
Ro = function() {
};
Fa = function(e, n, t, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = n.stateNode, zn(We.current);
    var o = null;
    switch (t) {
      case "input":
        l = bl(e, l), r = bl(e, r), o = [];
        break;
      case "select":
        l = K({}, l, { value: void 0 }), r = K({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = to(e, l), r = to(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Hr);
    }
    lo(t, r);
    var u;
    t = null;
    for (f in l) if (!r.hasOwnProperty(f) && l.hasOwnProperty(f) && l[f] != null) if (f === "style") {
      var i = l[f];
      for (u in i) i.hasOwnProperty(u) && (t || (t = {}), t[u] = "");
    } else f !== "dangerouslySetInnerHTML" && f !== "children" && f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && f !== "autoFocus" && (It.hasOwnProperty(f) ? o || (o = []) : (o = o || []).push(f, null));
    for (f in r) {
      var s = r[f];
      if (i = l != null ? l[f] : void 0, r.hasOwnProperty(f) && s !== i && (s != null || i != null)) if (f === "style") if (i) {
        for (u in i) !i.hasOwnProperty(u) || s && s.hasOwnProperty(u) || (t || (t = {}), t[u] = "");
        for (u in s) s.hasOwnProperty(u) && i[u] !== s[u] && (t || (t = {}), t[u] = s[u]);
      } else t || (o || (o = []), o.push(
        f,
        t
      )), t = s;
      else f === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, i = i ? i.__html : void 0, s != null && i !== s && (o = o || []).push(f, s)) : f === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(f, "" + s) : f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && (It.hasOwnProperty(f) ? (s != null && f === "onScroll" && V("scroll", e), o || i === s || (o = [])) : (o = o || []).push(f, s));
    }
    t && (o = o || []).push("style", t);
    var f = o;
    (n.updateQueue = f) && (n.flags |= 4);
  }
};
ja = function(e, n, t, r) {
  t !== r && (n.flags |= 4);
};
function Ct(e, n) {
  if (!B) switch (e.tailMode) {
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
function se(e) {
  var n = e.alternate !== null && e.alternate.child === e.child, t = 0, r = 0;
  if (n) for (var l = e.child; l !== null; ) t |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) t |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = t, n;
}
function ld(e, n, t) {
  var r = n.pendingProps;
  switch (su(n), n.tag) {
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
      return se(n), null;
    case 1:
      return ge(n.type) && Wr(), se(n), null;
    case 3:
      return r = n.stateNode, at(), A(ye), A(ce), yu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (yr(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, je !== null && (Vo(je), je = null))), Ro(e, n), se(n), null;
    case 5:
      hu(n);
      var l = zn(Zt.current);
      if (t = n.type, e !== null && n.stateNode != null) Fa(e, n, t, r, l), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
      else {
        if (!r) {
          if (n.stateNode === null) throw Error(g(166));
          return se(n), null;
        }
        if (e = zn(We.current), yr(n)) {
          r = n.stateNode, t = n.type;
          var o = n.memoizedProps;
          switch (r[Be] = n, r[Xt] = o, e = (n.mode & 1) !== 0, t) {
            case "dialog":
              V("cancel", r), V("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              V("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < zt.length; l++) V(zt[l], r);
              break;
            case "source":
              V("error", r);
              break;
            case "img":
            case "image":
            case "link":
              V(
                "error",
                r
              ), V("load", r);
              break;
            case "details":
              V("toggle", r);
              break;
            case "input":
              Au(r, o), V("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, V("invalid", r);
              break;
            case "textarea":
              Hu(r, o), V("invalid", r);
          }
          lo(t, o), l = null;
          for (var u in o) if (o.hasOwnProperty(u)) {
            var i = o[u];
            u === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && hr(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && hr(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : It.hasOwnProperty(u) && i != null && u === "onScroll" && V("scroll", r);
          }
          switch (t) {
            case "input":
              sr(r), Bu(r, o, !0);
              break;
            case "textarea":
              sr(r), Wu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Hr);
          }
          r = l, n.updateQueue = r, r !== null && (n.flags |= 4);
        } else {
          u = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = cs(t)), e === "http://www.w3.org/1999/xhtml" ? t === "script" ? (e = u.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = u.createElement(t, { is: r.is }) : (e = u.createElement(t), t === "select" && (u = e, r.multiple ? u.multiple = !0 : r.size && (u.size = r.size))) : e = u.createElementNS(e, t), e[Be] = n, e[Xt] = r, Oa(e, n, !1, !1), n.stateNode = e;
          e: {
            switch (u = oo(t, r), t) {
              case "dialog":
                V("cancel", e), V("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                V("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < zt.length; l++) V(zt[l], e);
                l = r;
                break;
              case "source":
                V("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                V(
                  "error",
                  e
                ), V("load", e), l = r;
                break;
              case "details":
                V("toggle", e), l = r;
                break;
              case "input":
                Au(e, r), l = bl(e, r), V("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = K({}, r, { value: void 0 }), V("invalid", e);
                break;
              case "textarea":
                Hu(e, r), l = to(e, r), V("invalid", e);
                break;
              default:
                l = r;
            }
            lo(t, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var s = i[o];
              o === "style" ? ps(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && fs(e, s)) : o === "children" ? typeof s == "string" ? (t !== "textarea" || s !== "") && $t(e, s) : typeof s == "number" && $t(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (It.hasOwnProperty(o) ? s != null && o === "onScroll" && V("scroll", e) : s != null && Yo(e, o, s, u));
            }
            switch (t) {
              case "input":
                sr(e), Bu(e, r, !1);
                break;
              case "textarea":
                sr(e), Wu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + wn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? bn(e, !!r.multiple, o, !1) : r.defaultValue != null && bn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Hr);
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
      return se(n), null;
    case 6:
      if (e && n.stateNode != null) ja(e, n, e.memoizedProps, r);
      else {
        if (typeof r != "string" && n.stateNode === null) throw Error(g(166));
        if (t = zn(Zt.current), zn(We.current), yr(n)) {
          if (r = n.stateNode, t = n.memoizedProps, r[Be] = n, (o = r.nodeValue !== t) && (e = Ee, e !== null)) switch (e.tag) {
            case 3:
              hr(r.nodeValue, t, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && hr(r.nodeValue, t, (e.mode & 1) !== 0);
          }
          o && (n.flags |= 4);
        } else r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[Be] = n, n.stateNode = r;
      }
      return se(n), null;
    case 13:
      if (A(W), r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (B && ke !== null && n.mode & 1 && !(n.flags & 128)) ea(), it(), n.flags |= 98560, o = !1;
        else if (o = yr(n), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(g(318));
            if (o = n.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(g(317));
            o[Be] = n;
          } else it(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
          se(n), o = !1;
        } else je !== null && (Vo(je), je = null), o = !0;
        if (!o) return n.flags & 65536 ? n : null;
      }
      return n.flags & 128 ? (n.lanes = t, n) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (n.child.flags |= 8192, n.mode & 1 && (e === null || W.current & 1 ? q === 0 && (q = 3) : Tu())), n.updateQueue !== null && (n.flags |= 4), se(n), null);
    case 4:
      return at(), Ro(e, n), e === null && Kt(n.stateNode.containerInfo), se(n), null;
    case 10:
      return du(n.type._context), se(n), null;
    case 17:
      return ge(n.type) && Wr(), se(n), null;
    case 19:
      if (A(W), o = n.memoizedState, o === null) return se(n), null;
      if (r = (n.flags & 128) !== 0, u = o.rendering, u === null) if (r) Ct(o, !1);
      else {
        if (q !== 0 || e !== null && e.flags & 128) for (e = n.child; e !== null; ) {
          if (u = Jr(e), u !== null) {
            for (n.flags |= 128, Ct(o, !1), r = u.updateQueue, r !== null && (n.updateQueue = r, n.flags |= 4), n.subtreeFlags = 0, r = t, t = n.child; t !== null; ) o = t, e = r, o.flags &= 14680066, u = o.alternate, u === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = u.childLanes, o.lanes = u.lanes, o.child = u.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = u.memoizedProps, o.memoizedState = u.memoizedState, o.updateQueue = u.updateQueue, o.type = u.type, e = u.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), t = t.sibling;
            return I(W, W.current & 1 | 2), n.child;
          }
          e = e.sibling;
        }
        o.tail !== null && G() > ft && (n.flags |= 128, r = !0, Ct(o, !1), n.lanes = 4194304);
      }
      else {
        if (!r) if (e = Jr(u), e !== null) {
          if (n.flags |= 128, r = !0, t = e.updateQueue, t !== null && (n.updateQueue = t, n.flags |= 4), Ct(o, !0), o.tail === null && o.tailMode === "hidden" && !u.alternate && !B) return se(n), null;
        } else 2 * G() - o.renderingStartTime > ft && t !== 1073741824 && (n.flags |= 128, r = !0, Ct(o, !1), n.lanes = 4194304);
        o.isBackwards ? (u.sibling = n.child, n.child = u) : (t = o.last, t !== null ? t.sibling = u : n.child = u, o.last = u);
      }
      return o.tail !== null ? (n = o.tail, o.rendering = n, o.tail = n.sibling, o.renderingStartTime = G(), n.sibling = null, t = W.current, I(W, r ? t & 1 | 2 : t & 1), n) : (se(n), null);
    case 22:
    case 23:
      return zu(), r = n.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (n.flags |= 8192), r && n.mode & 1 ? Se & 1073741824 && (se(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : se(n), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(g(156, n.tag));
}
function od(e, n) {
  switch (su(n), n.tag) {
    case 1:
      return ge(n.type) && Wr(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 3:
      return at(), A(ye), A(ce), yu(), e = n.flags, e & 65536 && !(e & 128) ? (n.flags = e & -65537 | 128, n) : null;
    case 5:
      return hu(n), null;
    case 13:
      if (A(W), e = n.memoizedState, e !== null && e.dehydrated !== null) {
        if (n.alternate === null) throw Error(g(340));
        it();
      }
      return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 19:
      return A(W), null;
    case 4:
      return at(), null;
    case 10:
      return du(n.type._context), null;
    case 22:
    case 23:
      return zu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Sr = !1, ae = !1, ud = typeof WeakSet == "function" ? WeakSet : Set, _ = null;
function Jn(e, n) {
  var t = e.ref;
  if (t !== null) if (typeof t == "function") try {
    t(null);
  } catch (r) {
    X(e, n, r);
  }
  else t.current = null;
}
function Mo(e, n, t) {
  try {
    t();
  } catch (r) {
    X(e, n, r);
  }
}
var Mi = !1;
function id(e, n) {
  if (ho = Vr, e = As(), uu(e)) {
    if ("selectionStart" in e) var t = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      t = (t = e.ownerDocument) && t.defaultView || window;
      var r = t.getSelection && t.getSelection();
      if (r && r.rangeCount !== 0) {
        t = r.anchorNode;
        var l = r.anchorOffset, o = r.focusNode;
        r = r.focusOffset;
        try {
          t.nodeType, o.nodeType;
        } catch {
          t = null;
          break e;
        }
        var u = 0, i = -1, s = -1, f = 0, v = 0, m = e, p = null;
        n: for (; ; ) {
          for (var w; m !== t || l !== 0 && m.nodeType !== 3 || (i = u + l), m !== o || r !== 0 && m.nodeType !== 3 || (s = u + r), m.nodeType === 3 && (u += m.nodeValue.length), (w = m.firstChild) !== null; )
            p = m, m = w;
          for (; ; ) {
            if (m === e) break n;
            if (p === t && ++f === l && (i = u), p === o && ++v === r && (s = u), (w = m.nextSibling) !== null) break;
            m = p, p = m.parentNode;
          }
          m = w;
        }
        t = i === -1 || s === -1 ? null : { start: i, end: s };
      } else t = null;
    }
    t = t || { start: 0, end: 0 };
  } else t = null;
  for (yo = { focusedElem: e, selectionRange: t }, Vr = !1, _ = n; _ !== null; ) if (n = _, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, _ = e;
  else for (; _ !== null; ) {
    n = _;
    try {
      var S = n.alternate;
      if (n.flags & 1024) switch (n.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var k = S.memoizedProps, R = S.memoizedState, c = n.stateNode, a = c.getSnapshotBeforeUpdate(n.elementType === n.type ? k : Oe(n.type, k), R);
            c.__reactInternalSnapshotBeforeUpdate = a;
          }
          break;
        case 3:
          var d = n.stateNode.containerInfo;
          d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(g(163));
      }
    } catch (y) {
      X(n, n.return, y);
    }
    if (e = n.sibling, e !== null) {
      e.return = n.return, _ = e;
      break;
    }
    _ = n.return;
  }
  return S = Mi, Mi = !1, S;
}
function Ft(e, n, t) {
  var r = n.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Mo(n, t, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function pl(e, n) {
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
function Oo(e) {
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
function Ua(e) {
  var n = e.alternate;
  n !== null && (e.alternate = null, Ua(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && (delete n[Be], delete n[Xt], delete n[So], delete n[Hf], delete n[Wf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Ia(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Oi(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ia(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Fo(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, n ? t.nodeType === 8 ? t.parentNode.insertBefore(e, n) : t.insertBefore(e, n) : (t.nodeType === 8 ? (n = t.parentNode, n.insertBefore(e, t)) : (n = t, n.appendChild(e)), t = t._reactRootContainer, t != null || n.onclick !== null || (n.onclick = Hr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Fo(e, n, t), e = e.sibling; e !== null; ) Fo(e, n, t), e = e.sibling;
}
function jo(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, n ? t.insertBefore(e, n) : t.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (jo(e, n, t), e = e.sibling; e !== null; ) jo(e, n, t), e = e.sibling;
}
var re = null, Fe = !1;
function rn(e, n, t) {
  for (t = t.child; t !== null; ) $a(e, n, t), t = t.sibling;
}
function $a(e, n, t) {
  if (He && typeof He.onCommitFiberUnmount == "function") try {
    He.onCommitFiberUnmount(ol, t);
  } catch {
  }
  switch (t.tag) {
    case 5:
      ae || Jn(t, n);
    case 6:
      var r = re, l = Fe;
      re = null, rn(e, n, t), re = r, Fe = l, re !== null && (Fe ? (e = re, t = t.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t)) : re.removeChild(t.stateNode));
      break;
    case 18:
      re !== null && (Fe ? (e = re, t = t.stateNode, e.nodeType === 8 ? Il(e.parentNode, t) : e.nodeType === 1 && Il(e, t), Ht(e)) : Il(re, t.stateNode));
      break;
    case 4:
      r = re, l = Fe, re = t.stateNode.containerInfo, Fe = !0, rn(e, n, t), re = r, Fe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ae && (r = t.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, u = o.destroy;
          o = o.tag, u !== void 0 && (o & 2 || o & 4) && Mo(t, n, u), l = l.next;
        } while (l !== r);
      }
      rn(e, n, t);
      break;
    case 1:
      if (!ae && (Jn(t, n), r = t.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = t.memoizedProps, r.state = t.memoizedState, r.componentWillUnmount();
      } catch (i) {
        X(t, n, i);
      }
      rn(e, n, t);
      break;
    case 21:
      rn(e, n, t);
      break;
    case 22:
      t.mode & 1 ? (ae = (r = ae) || t.memoizedState !== null, rn(e, n, t), ae = r) : rn(e, n, t);
      break;
    default:
      rn(e, n, t);
  }
}
function Fi(e) {
  var n = e.updateQueue;
  if (n !== null) {
    e.updateQueue = null;
    var t = e.stateNode;
    t === null && (t = e.stateNode = new ud()), n.forEach(function(r) {
      var l = hd.bind(null, e, r);
      t.has(r) || (t.add(r), r.then(l, l));
    });
  }
}
function Me(e, n) {
  var t = n.deletions;
  if (t !== null) for (var r = 0; r < t.length; r++) {
    var l = t[r];
    try {
      var o = e, u = n, i = u;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            re = i.stateNode, Fe = !1;
            break e;
          case 3:
            re = i.stateNode.containerInfo, Fe = !0;
            break e;
          case 4:
            re = i.stateNode.containerInfo, Fe = !0;
            break e;
        }
        i = i.return;
      }
      if (re === null) throw Error(g(160));
      $a(o, u, l), re = null, Fe = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (f) {
      X(l, n, f);
    }
  }
  if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) Va(n, e), n = n.sibling;
}
function Va(e, n) {
  var t = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Me(n, e), Ve(e), r & 4) {
        try {
          Ft(3, e, e.return), pl(3, e);
        } catch (k) {
          X(e, e.return, k);
        }
        try {
          Ft(5, e, e.return);
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 1:
      Me(n, e), Ve(e), r & 512 && t !== null && Jn(t, t.return);
      break;
    case 5:
      if (Me(n, e), Ve(e), r & 512 && t !== null && Jn(t, t.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          $t(l, "");
        } catch (k) {
          X(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, u = t !== null ? t.memoizedProps : o, i = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          i === "input" && o.type === "radio" && o.name != null && ss(l, o), oo(i, u);
          var f = oo(i, o);
          for (u = 0; u < s.length; u += 2) {
            var v = s[u], m = s[u + 1];
            v === "style" ? ps(l, m) : v === "dangerouslySetInnerHTML" ? fs(l, m) : v === "children" ? $t(l, m) : Yo(l, v, m, f);
          }
          switch (i) {
            case "input":
              eo(l, o);
              break;
            case "textarea":
              as(l, o);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var w = o.value;
              w != null ? bn(l, !!o.multiple, w, !1) : p !== !!o.multiple && (o.defaultValue != null ? bn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : bn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Xt] = o;
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 6:
      if (Me(n, e), Ve(e), r & 4) {
        if (e.stateNode === null) throw Error(g(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 3:
      if (Me(n, e), Ve(e), r & 4 && t !== null && t.memoizedState.isDehydrated) try {
        Ht(n.containerInfo);
      } catch (k) {
        X(e, e.return, k);
      }
      break;
    case 4:
      Me(n, e), Ve(e);
      break;
    case 13:
      Me(n, e), Ve(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Pu = G())), r & 4 && Fi(e);
      break;
    case 22:
      if (v = t !== null && t.memoizedState !== null, e.mode & 1 ? (ae = (f = ae) || v, Me(n, e), ae = f) : Me(n, e), Ve(e), r & 8192) {
        if (f = e.memoizedState !== null, (e.stateNode.isHidden = f) && !v && e.mode & 1) for (_ = e, v = e.child; v !== null; ) {
          for (m = _ = v; _ !== null; ) {
            switch (p = _, w = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Ft(4, p, p.return);
                break;
              case 1:
                Jn(p, p.return);
                var S = p.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = p, t = p.return;
                  try {
                    n = r, S.props = n.memoizedProps, S.state = n.memoizedState, S.componentWillUnmount();
                  } catch (k) {
                    X(r, t, k);
                  }
                }
                break;
              case 5:
                Jn(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  Ui(m);
                  continue;
                }
            }
            w !== null ? (w.return = p, _ = w) : Ui(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, f ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = m.stateNode, s = m.memoizedProps.style, u = s != null && s.hasOwnProperty("display") ? s.display : null, i.style.display = ds("display", u));
              } catch (k) {
                X(e, e.return, k);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = f ? "" : m.memoizedProps;
            } catch (k) {
              X(e, e.return, k);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            v === m && (v = null), m = m.return;
          }
          v === m && (v = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      Me(n, e), Ve(e), r & 4 && Fi(e);
      break;
    case 21:
      break;
    default:
      Me(
        n,
        e
      ), Ve(e);
  }
}
function Ve(e) {
  var n = e.flags;
  if (n & 2) {
    try {
      e: {
        for (var t = e.return; t !== null; ) {
          if (Ia(t)) {
            var r = t;
            break e;
          }
          t = t.return;
        }
        throw Error(g(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && ($t(l, ""), r.flags &= -33);
          var o = Oi(e);
          jo(e, o, l);
          break;
        case 3:
        case 4:
          var u = r.stateNode.containerInfo, i = Oi(e);
          Fo(e, i, u);
          break;
        default:
          throw Error(g(161));
      }
    } catch (s) {
      X(e, e.return, s);
    }
    e.flags &= -3;
  }
  n & 4096 && (e.flags &= -4097);
}
function sd(e, n, t) {
  _ = e, Aa(e);
}
function Aa(e, n, t) {
  for (var r = (e.mode & 1) !== 0; _ !== null; ) {
    var l = _, o = l.child;
    if (l.tag === 22 && r) {
      var u = l.memoizedState !== null || Sr;
      if (!u) {
        var i = l.alternate, s = i !== null && i.memoizedState !== null || ae;
        i = Sr;
        var f = ae;
        if (Sr = u, (ae = s) && !f) for (_ = l; _ !== null; ) u = _, s = u.child, u.tag === 22 && u.memoizedState !== null ? Ii(l) : s !== null ? (s.return = u, _ = s) : Ii(l);
        for (; o !== null; ) _ = o, Aa(o), o = o.sibling;
        _ = l, Sr = i, ae = f;
      }
      ji(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, _ = o) : ji(e);
  }
}
function ji(e) {
  for (; _ !== null; ) {
    var n = _;
    if (n.flags & 8772) {
      var t = n.alternate;
      try {
        if (n.flags & 8772) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            ae || pl(5, n);
            break;
          case 1:
            var r = n.stateNode;
            if (n.flags & 4 && !ae) if (t === null) r.componentDidMount();
            else {
              var l = n.elementType === n.type ? t.memoizedProps : Oe(n.type, t.memoizedProps);
              r.componentDidUpdate(l, t.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = n.updateQueue;
            o !== null && Si(n, o, r);
            break;
          case 3:
            var u = n.updateQueue;
            if (u !== null) {
              if (t = null, n.child !== null) switch (n.child.tag) {
                case 5:
                  t = n.child.stateNode;
                  break;
                case 1:
                  t = n.child.stateNode;
              }
              Si(n, u, t);
            }
            break;
          case 5:
            var i = n.stateNode;
            if (t === null && n.flags & 4) {
              t = i;
              var s = n.memoizedProps;
              switch (n.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && t.focus();
                  break;
                case "img":
                  s.src && (t.src = s.src);
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
              var f = n.alternate;
              if (f !== null) {
                var v = f.memoizedState;
                if (v !== null) {
                  var m = v.dehydrated;
                  m !== null && Ht(m);
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
            throw Error(g(163));
        }
        ae || n.flags & 512 && Oo(n);
      } catch (p) {
        X(n, n.return, p);
      }
    }
    if (n === e) {
      _ = null;
      break;
    }
    if (t = n.sibling, t !== null) {
      t.return = n.return, _ = t;
      break;
    }
    _ = n.return;
  }
}
function Ui(e) {
  for (; _ !== null; ) {
    var n = _;
    if (n === e) {
      _ = null;
      break;
    }
    var t = n.sibling;
    if (t !== null) {
      t.return = n.return, _ = t;
      break;
    }
    _ = n.return;
  }
}
function Ii(e) {
  for (; _ !== null; ) {
    var n = _;
    try {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          var t = n.return;
          try {
            pl(4, n);
          } catch (s) {
            X(n, t, s);
          }
          break;
        case 1:
          var r = n.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = n.return;
            try {
              r.componentDidMount();
            } catch (s) {
              X(n, l, s);
            }
          }
          var o = n.return;
          try {
            Oo(n);
          } catch (s) {
            X(n, o, s);
          }
          break;
        case 5:
          var u = n.return;
          try {
            Oo(n);
          } catch (s) {
            X(n, u, s);
          }
      }
    } catch (s) {
      X(n, n.return, s);
    }
    if (n === e) {
      _ = null;
      break;
    }
    var i = n.sibling;
    if (i !== null) {
      i.return = n.return, _ = i;
      break;
    }
    _ = n.return;
  }
}
var ad = Math.ceil, el = en.ReactCurrentDispatcher, _u = en.ReactCurrentOwner, Le = en.ReactCurrentBatchConfig, F = 0, ne = null, Z = null, le = 0, Se = 0, qn = En(0), q = 0, er = null, On = 0, ml = 0, xu = 0, jt = null, ve = null, Pu = 0, ft = 1 / 0, Qe = null, nl = !1, Uo = null, hn = null, kr = !1, cn = null, tl = 0, Ut = 0, Io = null, Rr = -1, Mr = 0;
function de() {
  return F & 6 ? G() : Rr !== -1 ? Rr : Rr = G();
}
function yn(e) {
  return e.mode & 1 ? F & 2 && le !== 0 ? le & -le : Kf.transition !== null ? (Mr === 0 && (Mr = xs()), Mr) : (e = j, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Rs(e.type)), e) : 1;
}
function Ie(e, n, t, r) {
  if (50 < Ut) throw Ut = 0, Io = null, Error(g(185));
  tr(e, t, r), (!(F & 2) || e !== ne) && (e === ne && (!(F & 2) && (ml |= t), q === 4 && sn(e, le)), we(e, r), t === 1 && F === 0 && !(n.mode & 1) && (ft = G() + 500, cl && Cn()));
}
function we(e, n) {
  var t = e.callbackNode;
  Qc(e, n);
  var r = $r(e, e === ne ? le : 0);
  if (r === 0) t !== null && Yu(t), e.callbackNode = null, e.callbackPriority = 0;
  else if (n = r & -r, e.callbackPriority !== n) {
    if (t != null && Yu(t), n === 1) e.tag === 0 ? Qf($i.bind(null, e)) : Js($i.bind(null, e)), Af(function() {
      !(F & 6) && Cn();
    }), t = null;
    else {
      switch (Ps(r)) {
        case 1:
          t = qo;
          break;
        case 4:
          t = Cs;
          break;
        case 16:
          t = Ir;
          break;
        case 536870912:
          t = _s;
          break;
        default:
          t = Ir;
      }
      t = Ga(t, Ba.bind(null, e));
    }
    e.callbackPriority = n, e.callbackNode = t;
  }
}
function Ba(e, n) {
  if (Rr = -1, Mr = 0, F & 6) throw Error(g(327));
  var t = e.callbackNode;
  if (lt() && e.callbackNode !== t) return null;
  var r = $r(e, e === ne ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || n) n = rl(e, r);
  else {
    n = r;
    var l = F;
    F |= 2;
    var o = Wa();
    (ne !== e || le !== n) && (Qe = null, ft = G() + 500, Tn(e, n));
    do
      try {
        dd();
        break;
      } catch (i) {
        Ha(e, i);
      }
    while (!0);
    fu(), el.current = o, F = l, Z !== null ? n = 0 : (ne = null, le = 0, n = q);
  }
  if (n !== 0) {
    if (n === 2 && (l = co(e), l !== 0 && (r = l, n = $o(e, l))), n === 1) throw t = er, Tn(e, 0), sn(e, r), we(e, G()), t;
    if (n === 6) sn(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !cd(l) && (n = rl(e, r), n === 2 && (o = co(e), o !== 0 && (r = o, n = $o(e, o))), n === 1)) throw t = er, Tn(e, 0), sn(e, r), we(e, G()), t;
      switch (e.finishedWork = l, e.finishedLanes = r, n) {
        case 0:
        case 1:
          throw Error(g(345));
        case 2:
          xn(e, ve, Qe);
          break;
        case 3:
          if (sn(e, r), (r & 130023424) === r && (n = Pu + 500 - G(), 10 < n)) {
            if ($r(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              de(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = wo(xn.bind(null, e, ve, Qe), n);
            break;
          }
          xn(e, ve, Qe);
          break;
        case 4:
          if (sn(e, r), (r & 4194240) === r) break;
          for (n = e.eventTimes, l = -1; 0 < r; ) {
            var u = 31 - Ue(r);
            o = 1 << u, u = n[u], u > l && (l = u), r &= ~o;
          }
          if (r = l, r = G() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ad(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = wo(xn.bind(null, e, ve, Qe), r);
            break;
          }
          xn(e, ve, Qe);
          break;
        case 5:
          xn(e, ve, Qe);
          break;
        default:
          throw Error(g(329));
      }
    }
  }
  return we(e, G()), e.callbackNode === t ? Ba.bind(null, e) : null;
}
function $o(e, n) {
  var t = jt;
  return e.current.memoizedState.isDehydrated && (Tn(e, n).flags |= 256), e = rl(e, n), e !== 2 && (n = ve, ve = t, n !== null && Vo(n)), e;
}
function Vo(e) {
  ve === null ? ve = e : ve.push.apply(ve, e);
}
function cd(e) {
  for (var n = e; ; ) {
    if (n.flags & 16384) {
      var t = n.updateQueue;
      if (t !== null && (t = t.stores, t !== null)) for (var r = 0; r < t.length; r++) {
        var l = t[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!$e(o(), l)) return !1;
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
function sn(e, n) {
  for (n &= ~xu, n &= ~ml, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n; ) {
    var t = 31 - Ue(n), r = 1 << t;
    e[t] = -1, n &= ~r;
  }
}
function $i(e) {
  if (F & 6) throw Error(g(327));
  lt();
  var n = $r(e, 0);
  if (!(n & 1)) return we(e, G()), null;
  var t = rl(e, n);
  if (e.tag !== 0 && t === 2) {
    var r = co(e);
    r !== 0 && (n = r, t = $o(e, r));
  }
  if (t === 1) throw t = er, Tn(e, 0), sn(e, n), we(e, G()), t;
  if (t === 6) throw Error(g(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = n, xn(e, ve, Qe), we(e, G()), null;
}
function Nu(e, n) {
  var t = F;
  F |= 1;
  try {
    return e(n);
  } finally {
    F = t, F === 0 && (ft = G() + 500, cl && Cn());
  }
}
function Fn(e) {
  cn !== null && cn.tag === 0 && !(F & 6) && lt();
  var n = F;
  F |= 1;
  var t = Le.transition, r = j;
  try {
    if (Le.transition = null, j = 1, e) return e();
  } finally {
    j = r, Le.transition = t, F = n, !(F & 6) && Cn();
  }
}
function zu() {
  Se = qn.current, A(qn);
}
function Tn(e, n) {
  e.finishedWork = null, e.finishedLanes = 0;
  var t = e.timeoutHandle;
  if (t !== -1 && (e.timeoutHandle = -1, Vf(t)), Z !== null) for (t = Z.return; t !== null; ) {
    var r = t;
    switch (su(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Wr();
        break;
      case 3:
        at(), A(ye), A(ce), yu();
        break;
      case 5:
        hu(r);
        break;
      case 4:
        at();
        break;
      case 13:
        A(W);
        break;
      case 19:
        A(W);
        break;
      case 10:
        du(r.type._context);
        break;
      case 22:
      case 23:
        zu();
    }
    t = t.return;
  }
  if (ne = e, Z = e = gn(e.current, null), le = Se = n, q = 0, er = null, xu = ml = On = 0, ve = jt = null, Nn !== null) {
    for (n = 0; n < Nn.length; n++) if (t = Nn[n], r = t.interleaved, r !== null) {
      t.interleaved = null;
      var l = r.next, o = t.pending;
      if (o !== null) {
        var u = o.next;
        o.next = l, r.next = u;
      }
      t.pending = r;
    }
    Nn = null;
  }
  return e;
}
function Ha(e, n) {
  do {
    var t = Z;
    try {
      if (fu(), Tr.current = br, qr) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        qr = !1;
      }
      if (Mn = 0, ee = J = Q = null, Ot = !1, Jt = 0, _u.current = null, t === null || t.return === null) {
        q = 1, er = n, Z = null;
        break;
      }
      e: {
        var o = e, u = t.return, i = t, s = n;
        if (n = le, i.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var f = s, v = i, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var p = v.alternate;
            p ? (v.updateQueue = p.updateQueue, v.memoizedState = p.memoizedState, v.lanes = p.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var w = Pi(u);
          if (w !== null) {
            w.flags &= -257, Ni(w, u, i, o, n), w.mode & 1 && xi(o, f, n), n = w, s = f;
            var S = n.updateQueue;
            if (S === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(s), n.updateQueue = k;
            } else S.add(s);
            break e;
          } else {
            if (!(n & 1)) {
              xi(o, f, n), Tu();
              break e;
            }
            s = Error(g(426));
          }
        } else if (B && i.mode & 1) {
          var R = Pi(u);
          if (R !== null) {
            !(R.flags & 65536) && (R.flags |= 256), Ni(R, u, i, o, n), au(ct(s, i));
            break e;
          }
        }
        o = s = ct(s, i), q !== 4 && (q = 2), jt === null ? jt = [o] : jt.push(o), o = u;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, n &= -n, o.lanes |= n;
              var c = Pa(o, s, n);
              wi(o, c);
              break e;
            case 1:
              i = s;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (hn === null || !hn.has(d)))) {
                o.flags |= 65536, n &= -n, o.lanes |= n;
                var y = Na(o, i, n);
                wi(o, y);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Ka(t);
    } catch (E) {
      n = E, Z === t && t !== null && (Z = t = t.return);
      continue;
    }
    break;
  } while (!0);
}
function Wa() {
  var e = el.current;
  return el.current = br, e === null ? br : e;
}
function Tu() {
  (q === 0 || q === 3 || q === 2) && (q = 4), ne === null || !(On & 268435455) && !(ml & 268435455) || sn(ne, le);
}
function rl(e, n) {
  var t = F;
  F |= 2;
  var r = Wa();
  (ne !== e || le !== n) && (Qe = null, Tn(e, n));
  do
    try {
      fd();
      break;
    } catch (l) {
      Ha(e, l);
    }
  while (!0);
  if (fu(), F = t, el.current = r, Z !== null) throw Error(g(261));
  return ne = null, le = 0, q;
}
function fd() {
  for (; Z !== null; ) Qa(Z);
}
function dd() {
  for (; Z !== null && !jc(); ) Qa(Z);
}
function Qa(e) {
  var n = Xa(e.alternate, e, Se);
  e.memoizedProps = e.pendingProps, n === null ? Ka(e) : Z = n, _u.current = null;
}
function Ka(e) {
  var n = e;
  do {
    var t = n.alternate;
    if (e = n.return, n.flags & 32768) {
      if (t = od(t, n), t !== null) {
        t.flags &= 32767, Z = t;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        q = 6, Z = null;
        return;
      }
    } else if (t = ld(t, n, Se), t !== null) {
      Z = t;
      return;
    }
    if (n = n.sibling, n !== null) {
      Z = n;
      return;
    }
    Z = n = e;
  } while (n !== null);
  q === 0 && (q = 5);
}
function xn(e, n, t) {
  var r = j, l = Le.transition;
  try {
    Le.transition = null, j = 1, pd(e, n, t, r);
  } finally {
    Le.transition = l, j = r;
  }
  return null;
}
function pd(e, n, t, r) {
  do
    lt();
  while (cn !== null);
  if (F & 6) throw Error(g(327));
  t = e.finishedWork;
  var l = e.finishedLanes;
  if (t === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, t === e.current) throw Error(g(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = t.lanes | t.childLanes;
  if (Kc(e, o), e === ne && (Z = ne = null, le = 0), !(t.subtreeFlags & 2064) && !(t.flags & 2064) || kr || (kr = !0, Ga(Ir, function() {
    return lt(), null;
  })), o = (t.flags & 15990) !== 0, t.subtreeFlags & 15990 || o) {
    o = Le.transition, Le.transition = null;
    var u = j;
    j = 1;
    var i = F;
    F |= 4, _u.current = null, id(e, t), Va(t, e), Mf(yo), Vr = !!ho, yo = ho = null, e.current = t, sd(t), Uc(), F = i, j = u, Le.transition = o;
  } else e.current = t;
  if (kr && (kr = !1, cn = e, tl = l), o = e.pendingLanes, o === 0 && (hn = null), Vc(t.stateNode), we(e, G()), n !== null) for (r = e.onRecoverableError, t = 0; t < n.length; t++) l = n[t], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (nl) throw nl = !1, e = Uo, Uo = null, e;
  return tl & 1 && e.tag !== 0 && lt(), o = e.pendingLanes, o & 1 ? e === Io ? Ut++ : (Ut = 0, Io = e) : Ut = 0, Cn(), null;
}
function lt() {
  if (cn !== null) {
    var e = Ps(tl), n = Le.transition, t = j;
    try {
      if (Le.transition = null, j = 16 > e ? 16 : e, cn === null) var r = !1;
      else {
        if (e = cn, cn = null, tl = 0, F & 6) throw Error(g(331));
        var l = F;
        for (F |= 4, _ = e.current; _ !== null; ) {
          var o = _, u = o.child;
          if (_.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var s = 0; s < i.length; s++) {
                var f = i[s];
                for (_ = f; _ !== null; ) {
                  var v = _;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ft(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, _ = m;
                  else for (; _ !== null; ) {
                    v = _;
                    var p = v.sibling, w = v.return;
                    if (Ua(v), v === f) {
                      _ = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = w, _ = p;
                      break;
                    }
                    _ = w;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var k = S.child;
                if (k !== null) {
                  S.child = null;
                  do {
                    var R = k.sibling;
                    k.sibling = null, k = R;
                  } while (k !== null);
                }
              }
              _ = o;
            }
          }
          if (o.subtreeFlags & 2064 && u !== null) u.return = o, _ = u;
          else e: for (; _ !== null; ) {
            if (o = _, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Ft(9, o, o.return);
            }
            var c = o.sibling;
            if (c !== null) {
              c.return = o.return, _ = c;
              break e;
            }
            _ = o.return;
          }
        }
        var a = e.current;
        for (_ = a; _ !== null; ) {
          u = _;
          var d = u.child;
          if (u.subtreeFlags & 2064 && d !== null) d.return = u, _ = d;
          else e: for (u = a; _ !== null; ) {
            if (i = _, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  pl(9, i);
              }
            } catch (E) {
              X(i, i.return, E);
            }
            if (i === u) {
              _ = null;
              break e;
            }
            var y = i.sibling;
            if (y !== null) {
              y.return = i.return, _ = y;
              break e;
            }
            _ = i.return;
          }
        }
        if (F = l, Cn(), He && typeof He.onPostCommitFiberRoot == "function") try {
          He.onPostCommitFiberRoot(ol, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      j = t, Le.transition = n;
    }
  }
  return !1;
}
function Vi(e, n, t) {
  n = ct(t, n), n = Pa(e, n, 1), e = vn(e, n, 1), n = de(), e !== null && (tr(e, 1, n), we(e, n));
}
function X(e, n, t) {
  if (e.tag === 3) Vi(e, e, t);
  else for (; n !== null; ) {
    if (n.tag === 3) {
      Vi(n, e, t);
      break;
    } else if (n.tag === 1) {
      var r = n.stateNode;
      if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (hn === null || !hn.has(r))) {
        e = ct(t, e), e = Na(n, e, 1), n = vn(n, e, 1), e = de(), n !== null && (tr(n, 1, e), we(n, e));
        break;
      }
    }
    n = n.return;
  }
}
function md(e, n, t) {
  var r = e.pingCache;
  r !== null && r.delete(n), n = de(), e.pingedLanes |= e.suspendedLanes & t, ne === e && (le & t) === t && (q === 4 || q === 3 && (le & 130023424) === le && 500 > G() - Pu ? Tn(e, 0) : xu |= t), we(e, n);
}
function Ya(e, n) {
  n === 0 && (e.mode & 1 ? (n = fr, fr <<= 1, !(fr & 130023424) && (fr = 4194304)) : n = 1);
  var t = de();
  e = qe(e, n), e !== null && (tr(e, n, t), we(e, t));
}
function vd(e) {
  var n = e.memoizedState, t = 0;
  n !== null && (t = n.retryLane), Ya(e, t);
}
function hd(e, n) {
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
      throw Error(g(314));
  }
  r !== null && r.delete(n), Ya(e, t);
}
var Xa;
Xa = function(e, n, t) {
  if (e !== null) if (e.memoizedProps !== n.pendingProps || ye.current) he = !0;
  else {
    if (!(e.lanes & t) && !(n.flags & 128)) return he = !1, rd(e, n, t);
    he = !!(e.flags & 131072);
  }
  else he = !1, B && n.flags & 1048576 && qs(n, Yr, n.index);
  switch (n.lanes = 0, n.tag) {
    case 2:
      var r = n.type;
      Dr(e, n), e = n.pendingProps;
      var l = ut(n, ce.current);
      rt(n, t), l = wu(null, n, r, e, l, t);
      var o = Su();
      return n.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, ge(r) ? (o = !0, Qr(n)) : o = !1, n.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, mu(n), l.updater = dl, n.stateNode = l, l._reactInternals = n, Po(n, r, e, t), n = To(null, n, r, !0, o, t)) : (n.tag = 0, B && o && iu(n), fe(null, n, l, t), n = n.child), n;
    case 16:
      r = n.elementType;
      e: {
        switch (Dr(e, n), e = n.pendingProps, l = r._init, r = l(r._payload), n.type = r, l = n.tag = gd(r), e = Oe(r, e), l) {
          case 0:
            n = zo(null, n, r, e, t);
            break e;
          case 1:
            n = Li(null, n, r, e, t);
            break e;
          case 11:
            n = zi(null, n, r, e, t);
            break e;
          case 14:
            n = Ti(null, n, r, Oe(r.type, e), t);
            break e;
        }
        throw Error(g(
          306,
          r,
          ""
        ));
      }
      return n;
    case 0:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Oe(r, l), zo(e, n, r, l, t);
    case 1:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Oe(r, l), Li(e, n, r, l, t);
    case 3:
      e: {
        if (Da(n), e === null) throw Error(g(387));
        r = n.pendingProps, o = n.memoizedState, l = o.element, la(e, n), Zr(n, r, null, t);
        var u = n.memoizedState;
        if (r = u.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: u.cache, pendingSuspenseBoundaries: u.pendingSuspenseBoundaries, transitions: u.transitions }, n.updateQueue.baseState = o, n.memoizedState = o, n.flags & 256) {
          l = ct(Error(g(423)), n), n = Di(e, n, r, t, l);
          break e;
        } else if (r !== l) {
          l = ct(Error(g(424)), n), n = Di(e, n, r, t, l);
          break e;
        } else for (ke = mn(n.stateNode.containerInfo.firstChild), Ee = n, B = !0, je = null, t = ta(n, null, r, t), n.child = t; t; ) t.flags = t.flags & -3 | 4096, t = t.sibling;
        else {
          if (it(), r === l) {
            n = be(e, n, t);
            break e;
          }
          fe(e, n, r, t);
        }
        n = n.child;
      }
      return n;
    case 5:
      return oa(n), e === null && Co(n), r = n.type, l = n.pendingProps, o = e !== null ? e.memoizedProps : null, u = l.children, go(r, l) ? u = null : o !== null && go(r, o) && (n.flags |= 32), La(e, n), fe(e, n, u, t), n.child;
    case 6:
      return e === null && Co(n), null;
    case 13:
      return Ra(e, n, t);
    case 4:
      return vu(n, n.stateNode.containerInfo), r = n.pendingProps, e === null ? n.child = st(n, null, r, t) : fe(e, n, r, t), n.child;
    case 11:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Oe(r, l), zi(e, n, r, l, t);
    case 7:
      return fe(e, n, n.pendingProps, t), n.child;
    case 8:
      return fe(e, n, n.pendingProps.children, t), n.child;
    case 12:
      return fe(e, n, n.pendingProps.children, t), n.child;
    case 10:
      e: {
        if (r = n.type._context, l = n.pendingProps, o = n.memoizedProps, u = l.value, I(Xr, r._currentValue), r._currentValue = u, o !== null) if ($e(o.value, u)) {
          if (o.children === l.children && !ye.current) {
            n = be(e, n, t);
            break e;
          }
        } else for (o = n.child, o !== null && (o.return = n); o !== null; ) {
          var i = o.dependencies;
          if (i !== null) {
            u = o.child;
            for (var s = i.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = Ge(-1, t & -t), s.tag = 2;
                  var f = o.updateQueue;
                  if (f !== null) {
                    f = f.shared;
                    var v = f.pending;
                    v === null ? s.next = s : (s.next = v.next, v.next = s), f.pending = s;
                  }
                }
                o.lanes |= t, s = o.alternate, s !== null && (s.lanes |= t), _o(
                  o.return,
                  t,
                  n
                ), i.lanes |= t;
                break;
              }
              s = s.next;
            }
          } else if (o.tag === 10) u = o.type === n.type ? null : o.child;
          else if (o.tag === 18) {
            if (u = o.return, u === null) throw Error(g(341));
            u.lanes |= t, i = u.alternate, i !== null && (i.lanes |= t), _o(u, t, n), u = o.sibling;
          } else u = o.child;
          if (u !== null) u.return = o;
          else for (u = o; u !== null; ) {
            if (u === n) {
              u = null;
              break;
            }
            if (o = u.sibling, o !== null) {
              o.return = u.return, u = o;
              break;
            }
            u = u.return;
          }
          o = u;
        }
        fe(e, n, l.children, t), n = n.child;
      }
      return n;
    case 9:
      return l = n.type, r = n.pendingProps.children, rt(n, t), l = De(l), r = r(l), n.flags |= 1, fe(e, n, r, t), n.child;
    case 14:
      return r = n.type, l = Oe(r, n.pendingProps), l = Oe(r.type, l), Ti(e, n, r, l, t);
    case 15:
      return za(e, n, n.type, n.pendingProps, t);
    case 17:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Oe(r, l), Dr(e, n), n.tag = 1, ge(r) ? (e = !0, Qr(n)) : e = !1, rt(n, t), xa(n, r, l), Po(n, r, l, t), To(null, n, r, !0, e, t);
    case 19:
      return Ma(e, n, t);
    case 22:
      return Ta(e, n, t);
  }
  throw Error(g(156, n.tag));
};
function Ga(e, n) {
  return Es(e, n);
}
function yd(e, n, t, r) {
  this.tag = e, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Te(e, n, t, r) {
  return new yd(e, n, t, r);
}
function Lu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function gd(e) {
  if (typeof e == "function") return Lu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Go) return 11;
    if (e === Zo) return 14;
  }
  return 2;
}
function gn(e, n) {
  var t = e.alternate;
  return t === null ? (t = Te(e.tag, n, e.key, e.mode), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = n, t.type = e.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = e.flags & 14680064, t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, n = e.dependencies, t.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t;
}
function Or(e, n, t, r, l, o) {
  var u = 2;
  if (r = e, typeof e == "function") Lu(e) && (u = 1);
  else if (typeof e == "string") u = 5;
  else e: switch (e) {
    case Bn:
      return Ln(t.children, l, o, n);
    case Xo:
      u = 8, l |= 8;
      break;
    case Gl:
      return e = Te(12, t, n, l | 2), e.elementType = Gl, e.lanes = o, e;
    case Zl:
      return e = Te(13, t, n, l), e.elementType = Zl, e.lanes = o, e;
    case Jl:
      return e = Te(19, t, n, l), e.elementType = Jl, e.lanes = o, e;
    case os:
      return vl(t, l, o, n);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case rs:
          u = 10;
          break e;
        case ls:
          u = 9;
          break e;
        case Go:
          u = 11;
          break e;
        case Zo:
          u = 14;
          break e;
        case ln:
          u = 16, r = null;
          break e;
      }
      throw Error(g(130, e == null ? e : typeof e, ""));
  }
  return n = Te(u, t, n, l), n.elementType = e, n.type = r, n.lanes = o, n;
}
function Ln(e, n, t, r) {
  return e = Te(7, e, r, n), e.lanes = t, e;
}
function vl(e, n, t, r) {
  return e = Te(22, e, r, n), e.elementType = os, e.lanes = t, e.stateNode = { isHidden: !1 }, e;
}
function Kl(e, n, t) {
  return e = Te(6, e, null, n), e.lanes = t, e;
}
function Yl(e, n, t) {
  return n = Te(4, e.children !== null ? e.children : [], e.key, n), n.lanes = t, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
}
function wd(e, n, t, r, l) {
  this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Nl(0), this.expirationTimes = Nl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Nl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Du(e, n, t, r, l, o, u, i, s) {
  return e = new wd(e, n, t, i, s), n === 1 ? (n = 1, o === !0 && (n |= 8)) : n = 0, o = Te(3, null, null, n), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: t, cache: null, transitions: null, pendingSuspenseBoundaries: null }, mu(o), e;
}
function Sd(e, n, t) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: An, key: r == null ? null : "" + r, children: e, containerInfo: n, implementation: t };
}
function Za(e) {
  if (!e) return Sn;
  e = e._reactInternals;
  e: {
    if (Un(e) !== e || e.tag !== 1) throw Error(g(170));
    var n = e;
    do {
      switch (n.tag) {
        case 3:
          n = n.stateNode.context;
          break e;
        case 1:
          if (ge(n.type)) {
            n = n.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      n = n.return;
    } while (n !== null);
    throw Error(g(171));
  }
  if (e.tag === 1) {
    var t = e.type;
    if (ge(t)) return Zs(e, t, n);
  }
  return n;
}
function Ja(e, n, t, r, l, o, u, i, s) {
  return e = Du(t, r, !0, e, l, o, u, i, s), e.context = Za(null), t = e.current, r = de(), l = yn(t), o = Ge(r, l), o.callback = n ?? null, vn(t, o, l), e.current.lanes = l, tr(e, l, r), we(e, r), e;
}
function hl(e, n, t, r) {
  var l = n.current, o = de(), u = yn(l);
  return t = Za(t), n.context === null ? n.context = t : n.pendingContext = t, n = Ge(o, u), n.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (n.callback = r), e = vn(l, n, u), e !== null && (Ie(e, l, u, o), zr(e, l, u)), u;
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
function Ai(e, n) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var t = e.retryLane;
    e.retryLane = t !== 0 && t < n ? t : n;
  }
}
function Ru(e, n) {
  Ai(e, n), (e = e.alternate) && Ai(e, n);
}
function kd() {
  return null;
}
var qa = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Mu(e) {
  this._internalRoot = e;
}
yl.prototype.render = Mu.prototype.render = function(e) {
  var n = this._internalRoot;
  if (n === null) throw Error(g(409));
  hl(e, n, null, null);
};
yl.prototype.unmount = Mu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var n = e.containerInfo;
    Fn(function() {
      hl(null, e, null, null);
    }), n[Je] = null;
  }
};
function yl(e) {
  this._internalRoot = e;
}
yl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var n = Ts();
    e = { blockedOn: null, target: e, priority: n };
    for (var t = 0; t < un.length && n !== 0 && n < un[t].priority; t++) ;
    un.splice(t, 0, e), t === 0 && Ds(e);
  }
};
function Ou(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function gl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Bi() {
}
function Ed(e, n, t, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var f = ll(u);
        o.call(f);
      };
    }
    var u = Ja(n, r, e, 0, null, !1, !1, "", Bi);
    return e._reactRootContainer = u, e[Je] = u.current, Kt(e.nodeType === 8 ? e.parentNode : e), Fn(), u;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var f = ll(s);
      i.call(f);
    };
  }
  var s = Du(e, 0, !1, null, null, !1, !1, "", Bi);
  return e._reactRootContainer = s, e[Je] = s.current, Kt(e.nodeType === 8 ? e.parentNode : e), Fn(function() {
    hl(n, s, t, r);
  }), s;
}
function wl(e, n, t, r, l) {
  var o = t._reactRootContainer;
  if (o) {
    var u = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var s = ll(u);
        i.call(s);
      };
    }
    hl(n, u, e, l);
  } else u = Ed(t, n, e, l, r);
  return ll(u);
}
Ns = function(e) {
  switch (e.tag) {
    case 3:
      var n = e.stateNode;
      if (n.current.memoizedState.isDehydrated) {
        var t = Nt(n.pendingLanes);
        t !== 0 && (bo(n, t | 1), we(n, G()), !(F & 6) && (ft = G() + 500, Cn()));
      }
      break;
    case 13:
      Fn(function() {
        var r = qe(e, 1);
        if (r !== null) {
          var l = de();
          Ie(r, e, 1, l);
        }
      }), Ru(e, 1);
  }
};
eu = function(e) {
  if (e.tag === 13) {
    var n = qe(e, 134217728);
    if (n !== null) {
      var t = de();
      Ie(n, e, 134217728, t);
    }
    Ru(e, 134217728);
  }
};
zs = function(e) {
  if (e.tag === 13) {
    var n = yn(e), t = qe(e, n);
    if (t !== null) {
      var r = de();
      Ie(t, e, n, r);
    }
    Ru(e, n);
  }
};
Ts = function() {
  return j;
};
Ls = function(e, n) {
  var t = j;
  try {
    return j = e, n();
  } finally {
    j = t;
  }
};
io = function(e, n, t) {
  switch (n) {
    case "input":
      if (eo(e, t), n = t.name, t.type === "radio" && n != null) {
        for (t = e; t.parentNode; ) t = t.parentNode;
        for (t = t.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < t.length; n++) {
          var r = t[n];
          if (r !== e && r.form === e.form) {
            var l = al(r);
            if (!l) throw Error(g(90));
            is(r), eo(r, l);
          }
        }
      }
      break;
    case "textarea":
      as(e, t);
      break;
    case "select":
      n = t.value, n != null && bn(e, !!t.multiple, n, !1);
  }
};
hs = Nu;
ys = Fn;
var Cd = { usingClientEntryPoint: !1, Events: [lr, Kn, al, ms, vs, Nu] }, _t = { findFiberByHostInstance: Pn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, _d = { bundleType: _t.bundleType, version: _t.version, rendererPackageName: _t.rendererPackageName, rendererConfig: _t.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: en.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ss(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: _t.findFiberByHostInstance || kd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Er = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Er.isDisabled && Er.supportsFiber) try {
    ol = Er.inject(_d), He = Er;
  } catch {
  }
}
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cd;
_e.createPortal = function(e, n) {
  var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ou(n)) throw Error(g(200));
  return Sd(e, n, null, t);
};
_e.createRoot = function(e, n) {
  if (!Ou(e)) throw Error(g(299));
  var t = !1, r = "", l = qa;
  return n != null && (n.unstable_strictMode === !0 && (t = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), n = Du(e, 1, !1, null, null, t, !1, r, l), e[Je] = n.current, Kt(e.nodeType === 8 ? e.parentNode : e), new Mu(n);
};
_e.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var n = e._reactInternals;
  if (n === void 0)
    throw typeof e.render == "function" ? Error(g(188)) : (e = Object.keys(e).join(","), Error(g(268, e)));
  return e = Ss(n), e = e === null ? null : e.stateNode, e;
};
_e.flushSync = function(e) {
  return Fn(e);
};
_e.hydrate = function(e, n, t) {
  if (!gl(n)) throw Error(g(200));
  return wl(null, e, n, !0, t);
};
_e.hydrateRoot = function(e, n, t) {
  if (!Ou(e)) throw Error(g(405));
  var r = t != null && t.hydratedSources || null, l = !1, o = "", u = qa;
  if (t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (u = t.onRecoverableError)), n = Ja(n, null, e, 1, t ?? null, l, !1, o, u), e[Je] = n.current, Kt(e), r) for (e = 0; e < r.length; e++) t = r[e], l = t._getVersion, l = l(t._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [t, l] : n.mutableSourceEagerHydrationData.push(
    t,
    l
  );
  return new yl(n);
};
_e.render = function(e, n, t) {
  if (!gl(n)) throw Error(g(200));
  return wl(null, e, n, !1, t);
};
_e.unmountComponentAtNode = function(e) {
  if (!gl(e)) throw Error(g(40));
  return e._reactRootContainer ? (Fn(function() {
    wl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Je] = null;
    });
  }), !0) : !1;
};
_e.unstable_batchedUpdates = Nu;
_e.unstable_renderSubtreeIntoContainer = function(e, n, t, r) {
  if (!gl(t)) throw Error(g(200));
  if (e == null || e._reactInternals === void 0) throw Error(g(38));
  return wl(e, n, t, !1, r);
};
_e.version = "18.3.1-next-f1338f8080-20240426";
function ba() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ba);
    } catch (e) {
      console.error(e);
    }
}
ba(), bi.exports = _e;
var xd = bi.exports, ec, Hi = xd;
ec = Hi.createRoot, Hi.hydrateRoot;
let nc = U.createContext(
  /** @type {any} */
  null
);
function Pd() {
  let e = U.useContext(nc);
  if (!e) throw new Error("RenderContext not found");
  return e;
}
function Nd() {
  return Pd().model;
}
function Vn(e) {
  let n = Nd(), [t, r] = U.useState(n.get(e));
  return U.useEffect(() => {
    let l = () => r(n.get(e));
    return n.on(`change:${e}`, l), () => n.off(`change:${e}`, l);
  }, [n, e]), [
    t,
    (l) => {
      n.set(e, l), n.save_changes();
    }
  ];
}
function zd(e) {
  return ({ el: n, model: t, experimental: r }) => {
    let l = ec(n);
    return l.render(
      U.createElement(
        U.StrictMode,
        null,
        U.createElement(
          nc.Provider,
          { value: { model: t, experimental: r } },
          U.createElement(e)
        )
      )
    ), () => l.unmount();
  };
}
function Td({
  items: e,
  selectedIds: n,
  selectionMode: t,
  onChange: r,
  disabled: l = !1,
  label_update: o,
  onLabelUpdate: u,
  move_update: i,
  onMoveUpdate: s,
  model: f
}) {
  const v = U.useMemo(() => {
    const h = {};
    return Object.entries(e).forEach(([D, z]) => {
      h[D] = {
        ...z,
        id: z.id || D,
        is_expanded: z.is_expanded ?? !1
      };
    }), h;
  }, [e]), [m, p] = U.useState(
    new Set(Object.values(v).filter((h) => h.is_expanded).map((h) => h.id))
  );
  U.useEffect(() => {
    p(new Set(Object.values(v).filter((h) => h.is_expanded).map((h) => h.id)));
  }, [v]);
  const w = (h) => {
    if (l || t === "none") return;
    let D;
    t === "single" ? D = [h] : D = n.includes(h) ? n.filter((z) => z !== h) : [...n, h], r(D);
  }, S = (h) => {
    p((D) => {
      const z = new Set(D);
      return z.has(h) ? z.delete(h) : z.add(h), z;
    });
  }, [k, R] = U.useState(null), [c, a] = U.useState(""), d = (h, D) => {
    h.stopPropagation(), !l && !k && w(D);
  }, y = (h, D, z) => {
    h.stopPropagation(), l || (R(D), a(z));
  }, E = (h) => {
    a(h.target.value);
  }, P = async (h) => {
    if (c.trim())
      try {
        await u(h, c.trim()), R(null);
      } catch (D) {
        console.error("Failed to update label:", D), a(e[h].label), R(null);
      }
    else
      R(null);
  }, N = async (h) => {
    var D;
    if (h.key === "Enter" && k) {
      h.preventDefault(), h.stopPropagation();
      const z = k, b = c;
      if (R(null), b.trim())
        try {
          await u(z, b.trim());
        } catch (Y) {
          console.error("Failed to update label:", Y);
        }
    } else h.key === "Escape" && (R(null), a(((D = e[k]) == null ? void 0 : D.label) || ""), h.preventDefault(), h.stopPropagation());
  }, [x, $] = U.useState(null), [M, ue] = U.useState(null), [nn, Pe] = U.useState(null), In = (h, D) => {
    var b, Y;
    let z = (b = e[h]) == null ? void 0 : b.parent_id;
    for (; z; ) {
      if (z === D) return !0;
      z = (Y = e[z]) == null ? void 0 : Y.parent_id;
    }
    return !1;
  }, Sl = (h, D) => {
    var b;
    if (l) {
      h.preventDefault();
      return;
    }
    h.stopPropagation(), $(D), h.dataTransfer.setData("text/plain", D), h.dataTransfer.effectAllowed = "move";
    const z = document.createElement("div");
    z.textContent = ((b = e[D]) == null ? void 0 : b.label) || "", z.style.position = "absolute", z.style.top = "-1000px", document.body.appendChild(z), h.dataTransfer.setDragImage(z, 0, 0), setTimeout(() => document.body.removeChild(z), 0);
  }, vt = (h, D) => {
    if (l || !x) return;
    if (x === D || In(D, x)) {
      h.dataTransfer.dropEffect = "none";
      return;
    }
    h.preventDefault(), h.stopPropagation();
    const z = h.currentTarget.getBoundingClientRect(), Y = h.clientY - z.top;
    Y < z.height * 0.25 ? Pe("above") : Y > z.height * 0.75 ? Pe("below") : Pe("child"), ue(D), h.dataTransfer.dropEffect = "move";
  }, ht = (h) => {
    h.preventDefault(), h.stopPropagation(), !h.currentTarget.contains(h.relatedTarget) && (ue(null), Pe(null));
  }, C = (h) => {
    $(null), ue(null), Pe(null);
  }, T = async (h, D) => {
    h.preventDefault(), h.stopPropagation();
    const z = x, b = nn;
    if (ue(null), Pe(null), $(null), !(!z || z === D || In(D, z)))
      try {
        const Y = b === "child" ? D : e[D].parent_id;
        await s(z, Y) || console.log("Move validation failed");
      } catch (Y) {
        console.error("Failed to move item:", Y);
      }
  }, L = (h, D = 0) => {
    const z = v[h];
    if (!z) return null;
    const b = Object.values(v).filter((te) => te.parent_id === h), Y = b.length > 0, tn = m.has(h), kl = k === h, tc = x === h, rc = M === h, lc = x && x !== h && !In(h, x);
    return /* @__PURE__ */ U.createElement(
      "div",
      {
        key: h,
        className: `tree-node-wrapper 
                    ${tc ? "dragging" : ""} 
                    ${rc && lc ? `drop-target drop-${nn}` : ""}`
      },
      /* @__PURE__ */ U.createElement(
        "div",
        {
          className: `tree-node ${n.includes(h) ? "selected" : ""} ${l ? "disabled" : ""} ${kl ? "editing" : ""}`,
          style: { paddingLeft: `${D * 24}px` },
          draggable: !l && !kl,
          onClick: (te) => d(te, h),
          onDoubleClick: (te) => y(te, h, z.label),
          onDragStart: (te) => Sl(te, h),
          onDragOver: (te) => vt(te, h),
          onDragLeave: ht,
          onDragEnd: C,
          onDrop: (te) => T(te, h)
        },
        Y && /* @__PURE__ */ U.createElement(
          "span",
          {
            className: `tree-toggle ${tn ? "open" : ""} ${l ? "disabled" : ""}`,
            onClick: (te) => {
              l || (te.stopPropagation(), S(h));
            }
          },
          /* @__PURE__ */ U.createElement(
            "svg",
            {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            },
            /* @__PURE__ */ U.createElement("polyline", { points: "6 9 12 15 18 9" })
          )
        ),
        kl ? /* @__PURE__ */ U.createElement(
          "input",
          {
            type: "text",
            value: c,
            onChange: E,
            onKeyDown: N,
            onBlur: async () => await P(h),
            autoFocus: !0,
            onClick: (te) => te.stopPropagation(),
            className: "tree-label-input"
          }
        ) : /* @__PURE__ */ U.createElement("span", { className: "tree-label" }, z.label)
      ),
      Y && tn && /* @__PURE__ */ U.createElement("div", { className: "tree-children" }, b.map((te) => L(te.id, D + 1)))
    );
  }, H = Object.values(v).filter((h) => !h.parent_id).map((h) => h.id);
  return /* @__PURE__ */ U.createElement("div", { className: "tree-browser" }, /* @__PURE__ */ U.createElement("div", { className: "tree-root" }, H.map((h) => L(h))));
}
function Ld({ model: e }) {
  const [n] = Vn("items"), [t, r] = Vn("selected_ids"), [l] = Vn("selection_mode"), [o] = Vn("disabled"), [u, i] = Vn("label_update"), [s, f] = Vn("move_update"), v = (w) => {
    o || r(w);
  }, m = async (w, S) => (console.log("Updating label:", w, S), await i({ [w]: S }), new Promise((k) => {
    var c;
    (c = n[w]) == null || c.label;
    const R = setInterval(() => {
      var a;
      ((a = n[w]) == null ? void 0 : a.label) === S && (clearInterval(R), k());
    }, 100);
    setTimeout(() => {
      clearInterval(R), k();
    }, 2e3);
  })), p = async (w, S) => (await f({ item_id: w, parent_id: S }), new Promise((k) => {
    var c;
    (c = n[w]) == null || c.parent_id;
    const R = setInterval(() => {
      var a;
      ((a = n[w]) == null ? void 0 : a.parent_id) === S && (clearInterval(R), k(!0));
    }, 100);
    setTimeout(() => {
      clearInterval(R), k(!1);
    }, 2e3);
  }));
  return /* @__PURE__ */ U.createElement(
    Td,
    {
      items: n,
      selectedIds: t,
      selectionMode: l,
      onChange: v,
      disabled: o,
      label_update: u,
      onLabelUpdate: m,
      model: e,
      move_update: s,
      onMoveUpdate: p
    }
  );
}
const Dd = {
  render: zd(Ld)
};
export {
  Dd as default
};
