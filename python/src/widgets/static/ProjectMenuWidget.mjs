function nc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bi = { exports: {} }, T = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gt = Symbol.for("react.element"), tc = Symbol.for("react.portal"), rc = Symbol.for("react.fragment"), lc = Symbol.for("react.strict_mode"), oc = Symbol.for("react.profiler"), uc = Symbol.for("react.provider"), ic = Symbol.for("react.context"), sc = Symbol.for("react.forward_ref"), ac = Symbol.for("react.suspense"), cc = Symbol.for("react.memo"), fc = Symbol.for("react.lazy"), Ou = Symbol.iterator;
function dc(e) {
  return e === null || typeof e != "object" ? null : (e = Ou && e[Ou] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Wi = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Hi = Object.assign, Qi = {};
function ut(e, n, t) {
  this.props = e, this.context = n, this.refs = Qi, this.updater = t || Wi;
}
ut.prototype.isReactComponent = {};
ut.prototype.setState = function(e, n) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, n, "setState");
};
ut.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ki() {
}
Ki.prototype = ut.prototype;
function Uo(e, n, t) {
  this.props = e, this.context = n, this.refs = Qi, this.updater = t || Wi;
}
var $o = Uo.prototype = new Ki();
$o.constructor = Uo;
Hi($o, ut.prototype);
$o.isPureReactComponent = !0;
var Du = Array.isArray, Yi = Object.prototype.hasOwnProperty, Vo = { current: null }, Xi = { key: !0, ref: !0, __self: !0, __source: !0 };
function Gi(e, n, t) {
  var r, l = {}, o = null, u = null;
  if (n != null) for (r in n.ref !== void 0 && (u = n.ref), n.key !== void 0 && (o = "" + n.key), n) Yi.call(n, r) && !Xi.hasOwnProperty(r) && (l[r] = n[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = t;
  else if (1 < i) {
    for (var s = Array(i), c = 0; c < i; c++) s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: Gt, type: e, key: o, ref: u, props: l, _owner: Vo.current };
}
function pc(e, n) {
  return { $$typeof: Gt, type: e.type, key: n, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ao(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Gt;
}
function mc(e) {
  var n = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(t) {
    return n[t];
  });
}
var Fu = /\/+/g;
function wl(e, n) {
  return typeof e == "object" && e !== null && e.key != null ? mc("" + e.key) : n.toString(36);
}
function wr(e, n, t, r, l) {
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
        case Gt:
        case tc:
          u = !0;
      }
  }
  if (u) return u = e, l = l(u), e = r === "" ? "." + wl(u, 0) : r, Du(l) ? (t = "", e != null && (t = e.replace(Fu, "$&/") + "/"), wr(l, n, t, "", function(c) {
    return c;
  })) : l != null && (Ao(l) && (l = pc(l, t + (!l.key || u && u.key === l.key ? "" : ("" + l.key).replace(Fu, "$&/") + "/") + e)), n.push(l)), 1;
  if (u = 0, r = r === "" ? "." : r + ":", Du(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var s = r + wl(o, i);
    u += wr(o, n, t, s, l);
  }
  else if (s = dc(e), typeof s == "function") for (e = s.call(e), i = 0; !(o = e.next()).done; ) o = o.value, s = r + wl(o, i++), u += wr(o, n, t, s, l);
  else if (o === "object") throw n = String(e), Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  return u;
}
function tr(e, n, t) {
  if (e == null) return e;
  var r = [], l = 0;
  return wr(e, r, "", "", function(o) {
    return n.call(t, o, l++);
  }), r;
}
function vc(e) {
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
var se = { current: null }, Sr = { transition: null }, hc = { ReactCurrentDispatcher: se, ReactCurrentBatchConfig: Sr, ReactCurrentOwner: Vo };
function Zi() {
  throw Error("act(...) is not supported in production builds of React.");
}
T.Children = { map: tr, forEach: function(e, n, t) {
  tr(e, function() {
    n.apply(this, arguments);
  }, t);
}, count: function(e) {
  var n = 0;
  return tr(e, function() {
    n++;
  }), n;
}, toArray: function(e) {
  return tr(e, function(n) {
    return n;
  }) || [];
}, only: function(e) {
  if (!Ao(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
T.Component = ut;
T.Fragment = rc;
T.Profiler = oc;
T.PureComponent = Uo;
T.StrictMode = lc;
T.Suspense = ac;
T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = hc;
T.act = Zi;
T.cloneElement = function(e, n, t) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Hi({}, e.props), l = e.key, o = e.ref, u = e._owner;
  if (n != null) {
    if (n.ref !== void 0 && (o = n.ref, u = Vo.current), n.key !== void 0 && (l = "" + n.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (s in n) Yi.call(n, s) && !Xi.hasOwnProperty(s) && (r[s] = n[s] === void 0 && i !== void 0 ? i[s] : n[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = t;
  else if (1 < s) {
    i = Array(s);
    for (var c = 0; c < s; c++) i[c] = arguments[c + 2];
    r.children = i;
  }
  return { $$typeof: Gt, type: e.type, key: l, ref: o, props: r, _owner: u };
};
T.createContext = function(e) {
  return e = { $$typeof: ic, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: uc, _context: e }, e.Consumer = e;
};
T.createElement = Gi;
T.createFactory = function(e) {
  var n = Gi.bind(null, e);
  return n.type = e, n;
};
T.createRef = function() {
  return { current: null };
};
T.forwardRef = function(e) {
  return { $$typeof: sc, render: e };
};
T.isValidElement = Ao;
T.lazy = function(e) {
  return { $$typeof: fc, _payload: { _status: -1, _result: e }, _init: vc };
};
T.memo = function(e, n) {
  return { $$typeof: cc, type: e, compare: n === void 0 ? null : n };
};
T.startTransition = function(e) {
  var n = Sr.transition;
  Sr.transition = {};
  try {
    e();
  } finally {
    Sr.transition = n;
  }
};
T.unstable_act = Zi;
T.useCallback = function(e, n) {
  return se.current.useCallback(e, n);
};
T.useContext = function(e) {
  return se.current.useContext(e);
};
T.useDebugValue = function() {
};
T.useDeferredValue = function(e) {
  return se.current.useDeferredValue(e);
};
T.useEffect = function(e, n) {
  return se.current.useEffect(e, n);
};
T.useId = function() {
  return se.current.useId();
};
T.useImperativeHandle = function(e, n, t) {
  return se.current.useImperativeHandle(e, n, t);
};
T.useInsertionEffect = function(e, n) {
  return se.current.useInsertionEffect(e, n);
};
T.useLayoutEffect = function(e, n) {
  return se.current.useLayoutEffect(e, n);
};
T.useMemo = function(e, n) {
  return se.current.useMemo(e, n);
};
T.useReducer = function(e, n, t) {
  return se.current.useReducer(e, n, t);
};
T.useRef = function(e) {
  return se.current.useRef(e);
};
T.useState = function(e) {
  return se.current.useState(e);
};
T.useSyncExternalStore = function(e, n, t) {
  return se.current.useSyncExternalStore(e, n, t);
};
T.useTransition = function() {
  return se.current.useTransition();
};
T.version = "18.3.1";
Bi.exports = T;
var ue = Bi.exports;
const N = /* @__PURE__ */ nc(ue);
var Ji = { exports: {} }, we = {}, qi = { exports: {} }, bi = {};
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
  function n(x, z) {
    var L = x.length;
    x.push(z);
    e: for (; 0 < L; ) {
      var H = L - 1 >>> 1, G = x[H];
      if (0 < l(G, z)) x[H] = z, x[L] = G, L = H;
      else break e;
    }
  }
  function t(x) {
    return x.length === 0 ? null : x[0];
  }
  function r(x) {
    if (x.length === 0) return null;
    var z = x[0], L = x.pop();
    if (L !== z) {
      x[0] = L;
      e: for (var H = 0, G = x.length, er = G >>> 1; H < er; ) {
        var yn = 2 * (H + 1) - 1, gl = x[yn], gn = yn + 1, nr = x[gn];
        if (0 > l(gl, L)) gn < G && 0 > l(nr, gl) ? (x[H] = nr, x[gn] = L, H = gn) : (x[H] = gl, x[yn] = L, H = yn);
        else if (gn < G && 0 > l(nr, L)) x[H] = nr, x[gn] = L, H = gn;
        else break e;
      }
    }
    return z;
  }
  function l(x, z) {
    var L = x.sortIndex - z.sortIndex;
    return L !== 0 ? L : x.id - z.id;
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
  var s = [], c = [], v = 1, m = null, p = 3, w = !1, g = !1, S = !1, D = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(x) {
    for (var z = t(c); z !== null; ) {
      if (z.callback === null) r(c);
      else if (z.startTime <= x) r(c), z.sortIndex = z.expirationTime, n(s, z);
      else break;
      z = t(c);
    }
  }
  function h(x) {
    if (S = !1, d(x), !g) if (t(s) !== null) g = !0, hl(k);
    else {
      var z = t(c);
      z !== null && yl(h, z.startTime - x);
    }
  }
  function k(x, z) {
    g = !1, S && (S = !1, f(P), P = -1), w = !0;
    var L = p;
    try {
      for (d(z), m = t(s); m !== null && (!(m.expirationTime > z) || x && !Pe()); ) {
        var H = m.callback;
        if (typeof H == "function") {
          m.callback = null, p = m.priorityLevel;
          var G = H(m.expirationTime <= z);
          z = e.unstable_now(), typeof G == "function" ? m.callback = G : m === t(s) && r(s), d(z);
        } else r(s);
        m = t(s);
      }
      if (m !== null) var er = !0;
      else {
        var yn = t(c);
        yn !== null && yl(h, yn.startTime - z), er = !1;
      }
      return er;
    } finally {
      m = null, p = L, w = !1;
    }
  }
  var C = !1, _ = null, P = -1, W = 5, M = -1;
  function Pe() {
    return !(e.unstable_now() - M < W);
  }
  function at() {
    if (_ !== null) {
      var x = e.unstable_now();
      M = x;
      var z = !0;
      try {
        z = _(!0, x);
      } finally {
        z ? ct() : (C = !1, _ = null);
      }
    } else C = !1;
  }
  var ct;
  if (typeof a == "function") ct = function() {
    a(at);
  };
  else if (typeof MessageChannel < "u") {
    var Ru = new MessageChannel(), ec = Ru.port2;
    Ru.port1.onmessage = at, ct = function() {
      ec.postMessage(null);
    };
  } else ct = function() {
    D(at, 0);
  };
  function hl(x) {
    _ = x, C || (C = !0, ct());
  }
  function yl(x, z) {
    P = D(function() {
      x(e.unstable_now());
    }, z);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(x) {
    x.callback = null;
  }, e.unstable_continueExecution = function() {
    g || w || (g = !0, hl(k));
  }, e.unstable_forceFrameRate = function(x) {
    0 > x || 125 < x ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : W = 0 < x ? Math.floor(1e3 / x) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return t(s);
  }, e.unstable_next = function(x) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var z = 3;
        break;
      default:
        z = p;
    }
    var L = p;
    p = z;
    try {
      return x();
    } finally {
      p = L;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(x, z) {
    switch (x) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        x = 3;
    }
    var L = p;
    p = x;
    try {
      return z();
    } finally {
      p = L;
    }
  }, e.unstable_scheduleCallback = function(x, z, L) {
    var H = e.unstable_now();
    switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? H + L : H) : L = H, x) {
      case 1:
        var G = -1;
        break;
      case 2:
        G = 250;
        break;
      case 5:
        G = 1073741823;
        break;
      case 4:
        G = 1e4;
        break;
      default:
        G = 5e3;
    }
    return G = L + G, x = { id: v++, callback: z, priorityLevel: x, startTime: L, expirationTime: G, sortIndex: -1 }, L > H ? (x.sortIndex = L, n(c, x), t(s) === null && x === t(c) && (S ? (f(P), P = -1) : S = !0, yl(h, L - H))) : (x.sortIndex = G, n(s, x), g || w || (g = !0, hl(k))), x;
  }, e.unstable_shouldYield = Pe, e.unstable_wrapCallback = function(x) {
    var z = p;
    return function() {
      var L = p;
      p = z;
      try {
        return x.apply(this, arguments);
      } finally {
        p = L;
      }
    };
  };
})(bi);
qi.exports = bi;
var yc = qi.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gc = ue, ge = yc;
function y(e) {
  for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++) n += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var es = /* @__PURE__ */ new Set(), Rt = {};
function Mn(e, n) {
  bn(e, n), bn(e + "Capture", n);
}
function bn(e, n) {
  for (Rt[e] = n, e = 0; e < n.length; e++) es.add(n[e]);
}
var Qe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ql = Object.prototype.hasOwnProperty, wc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Iu = {}, ju = {};
function Sc(e) {
  return Ql.call(ju, e) ? !0 : Ql.call(Iu, e) ? !1 : wc.test(e) ? ju[e] = !0 : (Iu[e] = !0, !1);
}
function kc(e, n, t, r) {
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
function Ec(e, n, t, r) {
  if (n === null || typeof n > "u" || kc(e, n, t, r)) return !0;
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
function ae(e, n, t, r, l, o, u) {
  this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = t, this.propertyName = e, this.type = n, this.sanitizeURL = o, this.removeEmptyString = u;
}
var ee = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ee[e] = new ae(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var n = e[0];
  ee[n] = new ae(n, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ee[e] = new ae(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ee[e] = new ae(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ee[e] = new ae(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ee[e] = new ae(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ee[e] = new ae(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ee[e] = new ae(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ee[e] = new ae(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Bo = /[\-:]([a-z])/g;
function Wo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var n = e.replace(
    Bo,
    Wo
  );
  ee[n] = new ae(n, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var n = e.replace(Bo, Wo);
  ee[n] = new ae(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var n = e.replace(Bo, Wo);
  ee[n] = new ae(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ee[e] = new ae(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ee.xlinkHref = new ae("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ee[e] = new ae(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ho(e, n, t, r) {
  var l = ee.hasOwnProperty(n) ? ee[n] : null;
  (l !== null ? l.type !== 0 : r || !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (Ec(n, t, l, r) && (t = null), r || l === null ? Sc(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : l.mustUseProperty ? e[l.propertyName] = t === null ? l.type === 3 ? !1 : "" : t : (n = l.attributeName, r = l.attributeNamespace, t === null ? e.removeAttribute(n) : (l = l.type, t = l === 3 || l === 4 && t === !0 ? "" : "" + t, r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
}
var Ge = gc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, rr = Symbol.for("react.element"), Fn = Symbol.for("react.portal"), In = Symbol.for("react.fragment"), Qo = Symbol.for("react.strict_mode"), Kl = Symbol.for("react.profiler"), ns = Symbol.for("react.provider"), ts = Symbol.for("react.context"), Ko = Symbol.for("react.forward_ref"), Yl = Symbol.for("react.suspense"), Xl = Symbol.for("react.suspense_list"), Yo = Symbol.for("react.memo"), Je = Symbol.for("react.lazy"), rs = Symbol.for("react.offscreen"), Uu = Symbol.iterator;
function ft(e) {
  return e === null || typeof e != "object" ? null : (e = Uu && e[Uu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var A = Object.assign, Sl;
function wt(e) {
  if (Sl === void 0) try {
    throw Error();
  } catch (t) {
    var n = t.stack.trim().match(/\n( *(at )?)/);
    Sl = n && n[1] || "";
  }
  return `
` + Sl + e;
}
var kl = !1;
function El(e, n) {
  if (!e || kl) return "";
  kl = !0;
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
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], n);
    } else {
      try {
        n.call();
      } catch (c) {
        r = c;
      }
      e.call(n.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
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
    kl = !1, Error.prepareStackTrace = t;
  }
  return (e = e ? e.displayName || e.name : "") ? wt(e) : "";
}
function xc(e) {
  switch (e.tag) {
    case 5:
      return wt(e.type);
    case 16:
      return wt("Lazy");
    case 13:
      return wt("Suspense");
    case 19:
      return wt("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = El(e.type, !1), e;
    case 11:
      return e = El(e.type.render, !1), e;
    case 1:
      return e = El(e.type, !0), e;
    default:
      return "";
  }
}
function Gl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case In:
      return "Fragment";
    case Fn:
      return "Portal";
    case Kl:
      return "Profiler";
    case Qo:
      return "StrictMode";
    case Yl:
      return "Suspense";
    case Xl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ts:
      return (e.displayName || "Context") + ".Consumer";
    case ns:
      return (e._context.displayName || "Context") + ".Provider";
    case Ko:
      var n = e.render;
      return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Yo:
      return n = e.displayName || null, n !== null ? n : Gl(e.type) || "Memo";
    case Je:
      n = e._payload, e = e._init;
      try {
        return Gl(e(n));
      } catch {
      }
  }
  return null;
}
function Cc(e) {
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
      return Gl(n);
    case 8:
      return n === Qo ? "StrictMode" : "Mode";
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
function dn(e) {
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
function ls(e) {
  var n = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
}
function _c(e) {
  var n = ls(e) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), r = "" + e[n];
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
function lr(e) {
  e._valueTracker || (e._valueTracker = _c(e));
}
function os(e) {
  if (!e) return !1;
  var n = e._valueTracker;
  if (!n) return !0;
  var t = n.getValue(), r = "";
  return e && (r = ls(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== t ? (n.setValue(e), !0) : !1;
}
function Mr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Zl(e, n) {
  var t = n.checked;
  return A({}, n, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: t ?? e._wrapperState.initialChecked });
}
function $u(e, n) {
  var t = n.defaultValue == null ? "" : n.defaultValue, r = n.checked != null ? n.checked : n.defaultChecked;
  t = dn(n.value != null ? n.value : t), e._wrapperState = { initialChecked: r, initialValue: t, controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null };
}
function us(e, n) {
  n = n.checked, n != null && Ho(e, "checked", n, !1);
}
function Jl(e, n) {
  us(e, n);
  var t = dn(n.value), r = n.type;
  if (t != null) r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  n.hasOwnProperty("value") ? ql(e, n.type, t) : n.hasOwnProperty("defaultValue") && ql(e, n.type, dn(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
}
function Vu(e, n, t) {
  if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
    var r = n.type;
    if (!(r !== "submit" && r !== "reset" || n.value !== void 0 && n.value !== null)) return;
    n = "" + e._wrapperState.initialValue, t || n === e.value || (e.value = n), e.defaultValue = n;
  }
  t = e.name, t !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, t !== "" && (e.name = t);
}
function ql(e, n, t) {
  (n !== "number" || Mr(e.ownerDocument) !== e) && (t == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
}
var St = Array.isArray;
function Yn(e, n, t, r) {
  if (e = e.options, n) {
    n = {};
    for (var l = 0; l < t.length; l++) n["$" + t[l]] = !0;
    for (t = 0; t < e.length; t++) l = n.hasOwnProperty("$" + e[t].value), e[t].selected !== l && (e[t].selected = l), l && r && (e[t].defaultSelected = !0);
  } else {
    for (t = "" + dn(t), n = null, l = 0; l < e.length; l++) {
      if (e[l].value === t) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      n !== null || e[l].disabled || (n = e[l]);
    }
    n !== null && (n.selected = !0);
  }
}
function bl(e, n) {
  if (n.dangerouslySetInnerHTML != null) throw Error(y(91));
  return A({}, n, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Au(e, n) {
  var t = n.value;
  if (t == null) {
    if (t = n.children, n = n.defaultValue, t != null) {
      if (n != null) throw Error(y(92));
      if (St(t)) {
        if (1 < t.length) throw Error(y(93));
        t = t[0];
      }
      n = t;
    }
    n == null && (n = ""), t = n;
  }
  e._wrapperState = { initialValue: dn(t) };
}
function is(e, n) {
  var t = dn(n.value), r = dn(n.defaultValue);
  t != null && (t = "" + t, t !== e.value && (e.value = t), n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)), r != null && (e.defaultValue = "" + r);
}
function Bu(e) {
  var n = e.textContent;
  n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
}
function ss(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function eo(e, n) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? ss(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var or, as = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(n, t, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(n, t, r, l);
    });
  } : e;
}(function(e, n) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = n;
  else {
    for (or = or || document.createElement("div"), or.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = or.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; n.firstChild; ) e.appendChild(n.firstChild);
  }
});
function Ot(e, n) {
  if (n) {
    var t = e.firstChild;
    if (t && t === e.lastChild && t.nodeType === 3) {
      t.nodeValue = n;
      return;
    }
  }
  e.textContent = n;
}
var xt = {
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
}, Nc = ["Webkit", "ms", "Moz", "O"];
Object.keys(xt).forEach(function(e) {
  Nc.forEach(function(n) {
    n = n + e.charAt(0).toUpperCase() + e.substring(1), xt[n] = xt[e];
  });
});
function cs(e, n, t) {
  return n == null || typeof n == "boolean" || n === "" ? "" : t || typeof n != "number" || n === 0 || xt.hasOwnProperty(e) && xt[e] ? ("" + n).trim() : n + "px";
}
function fs(e, n) {
  e = e.style;
  for (var t in n) if (n.hasOwnProperty(t)) {
    var r = t.indexOf("--") === 0, l = cs(t, n[t], r);
    t === "float" && (t = "cssFloat"), r ? e.setProperty(t, l) : e[t] = l;
  }
}
var Pc = A({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function no(e, n) {
  if (n) {
    if (Pc[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(y(137, e));
    if (n.dangerouslySetInnerHTML != null) {
      if (n.children != null) throw Error(y(60));
      if (typeof n.dangerouslySetInnerHTML != "object" || !("__html" in n.dangerouslySetInnerHTML)) throw Error(y(61));
    }
    if (n.style != null && typeof n.style != "object") throw Error(y(62));
  }
}
function to(e, n) {
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
var ro = null;
function Xo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var lo = null, Xn = null, Gn = null;
function Wu(e) {
  if (e = qt(e)) {
    if (typeof lo != "function") throw Error(y(280));
    var n = e.stateNode;
    n && (n = ol(n), lo(e.stateNode, e.type, n));
  }
}
function ds(e) {
  Xn ? Gn ? Gn.push(e) : Gn = [e] : Xn = e;
}
function ps() {
  if (Xn) {
    var e = Xn, n = Gn;
    if (Gn = Xn = null, Wu(e), n) for (e = 0; e < n.length; e++) Wu(n[e]);
  }
}
function ms(e, n) {
  return e(n);
}
function vs() {
}
var xl = !1;
function hs(e, n, t) {
  if (xl) return e(n, t);
  xl = !0;
  try {
    return ms(e, n, t);
  } finally {
    xl = !1, (Xn !== null || Gn !== null) && (vs(), ps());
  }
}
function Dt(e, n) {
  var t = e.stateNode;
  if (t === null) return null;
  var r = ol(t);
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
  if (t && typeof t != "function") throw Error(y(231, n, typeof t));
  return t;
}
var oo = !1;
if (Qe) try {
  var dt = {};
  Object.defineProperty(dt, "passive", { get: function() {
    oo = !0;
  } }), window.addEventListener("test", dt, dt), window.removeEventListener("test", dt, dt);
} catch {
  oo = !1;
}
function zc(e, n, t, r, l, o, u, i, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    n.apply(t, c);
  } catch (v) {
    this.onError(v);
  }
}
var Ct = !1, Rr = null, Or = !1, uo = null, Lc = { onError: function(e) {
  Ct = !0, Rr = e;
} };
function Tc(e, n, t, r, l, o, u, i, s) {
  Ct = !1, Rr = null, zc.apply(Lc, arguments);
}
function Mc(e, n, t, r, l, o, u, i, s) {
  if (Tc.apply(this, arguments), Ct) {
    if (Ct) {
      var c = Rr;
      Ct = !1, Rr = null;
    } else throw Error(y(198));
    Or || (Or = !0, uo = c);
  }
}
function Rn(e) {
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
function ys(e) {
  if (e.tag === 13) {
    var n = e.memoizedState;
    if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
  }
  return null;
}
function Hu(e) {
  if (Rn(e) !== e) throw Error(y(188));
}
function Rc(e) {
  var n = e.alternate;
  if (!n) {
    if (n = Rn(e), n === null) throw Error(y(188));
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
        if (o === t) return Hu(l), e;
        if (o === r) return Hu(l), n;
        o = o.sibling;
      }
      throw Error(y(188));
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
        if (!u) throw Error(y(189));
      }
    }
    if (t.alternate !== r) throw Error(y(190));
  }
  if (t.tag !== 3) throw Error(y(188));
  return t.stateNode.current === t ? e : n;
}
function gs(e) {
  return e = Rc(e), e !== null ? ws(e) : null;
}
function ws(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var n = ws(e);
    if (n !== null) return n;
    e = e.sibling;
  }
  return null;
}
var Ss = ge.unstable_scheduleCallback, Qu = ge.unstable_cancelCallback, Oc = ge.unstable_shouldYield, Dc = ge.unstable_requestPaint, Q = ge.unstable_now, Fc = ge.unstable_getCurrentPriorityLevel, Go = ge.unstable_ImmediatePriority, ks = ge.unstable_UserBlockingPriority, Dr = ge.unstable_NormalPriority, Ic = ge.unstable_LowPriority, Es = ge.unstable_IdlePriority, nl = null, Ue = null;
function jc(e) {
  if (Ue && typeof Ue.onCommitFiberRoot == "function") try {
    Ue.onCommitFiberRoot(nl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Re = Math.clz32 ? Math.clz32 : Vc, Uc = Math.log, $c = Math.LN2;
function Vc(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Uc(e) / $c | 0) | 0;
}
var ur = 64, ir = 4194304;
function kt(e) {
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
function Fr(e, n) {
  var t = e.pendingLanes;
  if (t === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, u = t & 268435455;
  if (u !== 0) {
    var i = u & ~l;
    i !== 0 ? r = kt(i) : (o &= u, o !== 0 && (r = kt(o)));
  } else u = t & ~l, u !== 0 ? r = kt(u) : o !== 0 && (r = kt(o));
  if (r === 0) return 0;
  if (n !== 0 && n !== r && !(n & l) && (l = r & -r, o = n & -n, l >= o || l === 16 && (o & 4194240) !== 0)) return n;
  if (r & 4 && (r |= t & 16), n = e.entangledLanes, n !== 0) for (e = e.entanglements, n &= r; 0 < n; ) t = 31 - Re(n), l = 1 << t, r |= e[t], n &= ~l;
  return r;
}
function Ac(e, n) {
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
function Bc(e, n) {
  for (var t = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var u = 31 - Re(o), i = 1 << u, s = l[u];
    s === -1 ? (!(i & t) || i & r) && (l[u] = Ac(i, n)) : s <= n && (e.expiredLanes |= i), o &= ~i;
  }
}
function io(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function xs() {
  var e = ur;
  return ur <<= 1, !(ur & 4194240) && (ur = 64), e;
}
function Cl(e) {
  for (var n = [], t = 0; 31 > t; t++) n.push(e);
  return n;
}
function Zt(e, n, t) {
  e.pendingLanes |= n, n !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, n = 31 - Re(n), e[n] = t;
}
function Wc(e, n) {
  var t = e.pendingLanes & ~n;
  e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= n, e.mutableReadLanes &= n, e.entangledLanes &= n, n = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < t; ) {
    var l = 31 - Re(t), o = 1 << l;
    n[l] = 0, r[l] = -1, e[l] = -1, t &= ~o;
  }
}
function Zo(e, n) {
  var t = e.entangledLanes |= n;
  for (e = e.entanglements; t; ) {
    var r = 31 - Re(t), l = 1 << r;
    l & n | e[r] & n && (e[r] |= n), t &= ~l;
  }
}
var O = 0;
function Cs(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var _s, Jo, Ns, Ps, zs, so = !1, sr = [], rn = null, ln = null, on = null, Ft = /* @__PURE__ */ new Map(), It = /* @__PURE__ */ new Map(), be = [], Hc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Ku(e, n) {
  switch (e) {
    case "focusin":
    case "focusout":
      rn = null;
      break;
    case "dragenter":
    case "dragleave":
      ln = null;
      break;
    case "mouseover":
    case "mouseout":
      on = null;
      break;
    case "pointerover":
    case "pointerout":
      Ft.delete(n.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      It.delete(n.pointerId);
  }
}
function pt(e, n, t, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: n, domEventName: t, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, n !== null && (n = qt(n), n !== null && Jo(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, l !== null && n.indexOf(l) === -1 && n.push(l), e);
}
function Qc(e, n, t, r, l) {
  switch (n) {
    case "focusin":
      return rn = pt(rn, e, n, t, r, l), !0;
    case "dragenter":
      return ln = pt(ln, e, n, t, r, l), !0;
    case "mouseover":
      return on = pt(on, e, n, t, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Ft.set(o, pt(Ft.get(o) || null, e, n, t, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, It.set(o, pt(It.get(o) || null, e, n, t, r, l)), !0;
  }
  return !1;
}
function Ls(e) {
  var n = kn(e.target);
  if (n !== null) {
    var t = Rn(n);
    if (t !== null) {
      if (n = t.tag, n === 13) {
        if (n = ys(t), n !== null) {
          e.blockedOn = n, zs(e.priority, function() {
            Ns(t);
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
function kr(e) {
  if (e.blockedOn !== null) return !1;
  for (var n = e.targetContainers; 0 < n.length; ) {
    var t = ao(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
    if (t === null) {
      t = e.nativeEvent;
      var r = new t.constructor(t.type, t);
      ro = r, t.target.dispatchEvent(r), ro = null;
    } else return n = qt(t), n !== null && Jo(n), e.blockedOn = t, !1;
    n.shift();
  }
  return !0;
}
function Yu(e, n, t) {
  kr(e) && t.delete(n);
}
function Kc() {
  so = !1, rn !== null && kr(rn) && (rn = null), ln !== null && kr(ln) && (ln = null), on !== null && kr(on) && (on = null), Ft.forEach(Yu), It.forEach(Yu);
}
function mt(e, n) {
  e.blockedOn === n && (e.blockedOn = null, so || (so = !0, ge.unstable_scheduleCallback(ge.unstable_NormalPriority, Kc)));
}
function jt(e) {
  function n(l) {
    return mt(l, e);
  }
  if (0 < sr.length) {
    mt(sr[0], e);
    for (var t = 1; t < sr.length; t++) {
      var r = sr[t];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (rn !== null && mt(rn, e), ln !== null && mt(ln, e), on !== null && mt(on, e), Ft.forEach(n), It.forEach(n), t = 0; t < be.length; t++) r = be[t], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < be.length && (t = be[0], t.blockedOn === null); ) Ls(t), t.blockedOn === null && be.shift();
}
var Zn = Ge.ReactCurrentBatchConfig, Ir = !0;
function Yc(e, n, t, r) {
  var l = O, o = Zn.transition;
  Zn.transition = null;
  try {
    O = 1, qo(e, n, t, r);
  } finally {
    O = l, Zn.transition = o;
  }
}
function Xc(e, n, t, r) {
  var l = O, o = Zn.transition;
  Zn.transition = null;
  try {
    O = 4, qo(e, n, t, r);
  } finally {
    O = l, Zn.transition = o;
  }
}
function qo(e, n, t, r) {
  if (Ir) {
    var l = ao(e, n, t, r);
    if (l === null) Dl(e, n, r, jr, t), Ku(e, r);
    else if (Qc(l, e, n, t, r)) r.stopPropagation();
    else if (Ku(e, r), n & 4 && -1 < Hc.indexOf(e)) {
      for (; l !== null; ) {
        var o = qt(l);
        if (o !== null && _s(o), o = ao(e, n, t, r), o === null && Dl(e, n, r, jr, t), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Dl(e, n, r, null, t);
  }
}
var jr = null;
function ao(e, n, t, r) {
  if (jr = null, e = Xo(r), e = kn(e), e !== null) if (n = Rn(e), n === null) e = null;
  else if (t = n.tag, t === 13) {
    if (e = ys(n), e !== null) return e;
    e = null;
  } else if (t === 3) {
    if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
    e = null;
  } else n !== e && (e = null);
  return jr = e, null;
}
function Ts(e) {
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
      switch (Fc()) {
        case Go:
          return 1;
        case ks:
          return 4;
        case Dr:
        case Ic:
          return 16;
        case Es:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var nn = null, bo = null, Er = null;
function Ms() {
  if (Er) return Er;
  var e, n = bo, t = n.length, r, l = "value" in nn ? nn.value : nn.textContent, o = l.length;
  for (e = 0; e < t && n[e] === l[e]; e++) ;
  var u = t - e;
  for (r = 1; r <= u && n[t - r] === l[o - r]; r++) ;
  return Er = l.slice(e, 1 < r ? 1 - r : void 0);
}
function xr(e) {
  var n = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function ar() {
  return !0;
}
function Xu() {
  return !1;
}
function Se(e) {
  function n(t, r, l, o, u) {
    this._reactName = t, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = u, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (t = e[i], this[i] = t ? t(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? ar : Xu, this.isPropagationStopped = Xu, this;
  }
  return A(n.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var t = this.nativeEvent;
    t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = ar);
  }, stopPropagation: function() {
    var t = this.nativeEvent;
    t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = ar);
  }, persist: function() {
  }, isPersistent: ar }), n;
}
var it = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, eu = Se(it), Jt = A({}, it, { view: 0, detail: 0 }), Gc = Se(Jt), _l, Nl, vt, tl = A({}, Jt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: nu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== vt && (vt && e.type === "mousemove" ? (_l = e.screenX - vt.screenX, Nl = e.screenY - vt.screenY) : Nl = _l = 0, vt = e), _l);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Nl;
} }), Gu = Se(tl), Zc = A({}, tl, { dataTransfer: 0 }), Jc = Se(Zc), qc = A({}, Jt, { relatedTarget: 0 }), Pl = Se(qc), bc = A({}, it, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ef = Se(bc), nf = A({}, it, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), tf = Se(nf), rf = A({}, it, { data: 0 }), Zu = Se(rf), lf = {
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
}, of = {
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
}, uf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function sf(e) {
  var n = this.nativeEvent;
  return n.getModifierState ? n.getModifierState(e) : (e = uf[e]) ? !!n[e] : !1;
}
function nu() {
  return sf;
}
var af = A({}, Jt, { key: function(e) {
  if (e.key) {
    var n = lf[e.key] || e.key;
    if (n !== "Unidentified") return n;
  }
  return e.type === "keypress" ? (e = xr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? of[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: nu, charCode: function(e) {
  return e.type === "keypress" ? xr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? xr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), cf = Se(af), ff = A({}, tl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ju = Se(ff), df = A({}, Jt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: nu }), pf = Se(df), mf = A({}, it, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), vf = Se(mf), hf = A({}, tl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), yf = Se(hf), gf = [9, 13, 27, 32], tu = Qe && "CompositionEvent" in window, _t = null;
Qe && "documentMode" in document && (_t = document.documentMode);
var wf = Qe && "TextEvent" in window && !_t, Rs = Qe && (!tu || _t && 8 < _t && 11 >= _t), qu = " ", bu = !1;
function Os(e, n) {
  switch (e) {
    case "keyup":
      return gf.indexOf(n.keyCode) !== -1;
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
function Ds(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var jn = !1;
function Sf(e, n) {
  switch (e) {
    case "compositionend":
      return Ds(n);
    case "keypress":
      return n.which !== 32 ? null : (bu = !0, qu);
    case "textInput":
      return e = n.data, e === qu && bu ? null : e;
    default:
      return null;
  }
}
function kf(e, n) {
  if (jn) return e === "compositionend" || !tu && Os(e, n) ? (e = Ms(), Er = bo = nn = null, jn = !1, e) : null;
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
      return Rs && n.locale !== "ko" ? null : n.data;
    default:
      return null;
  }
}
var Ef = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ei(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n === "input" ? !!Ef[e.type] : n === "textarea";
}
function Fs(e, n, t, r) {
  ds(r), n = Ur(n, "onChange"), 0 < n.length && (t = new eu("onChange", "change", null, t, r), e.push({ event: t, listeners: n }));
}
var Nt = null, Ut = null;
function xf(e) {
  Ks(e, 0);
}
function rl(e) {
  var n = Vn(e);
  if (os(n)) return e;
}
function Cf(e, n) {
  if (e === "change") return n;
}
var Is = !1;
if (Qe) {
  var zl;
  if (Qe) {
    var Ll = "oninput" in document;
    if (!Ll) {
      var ni = document.createElement("div");
      ni.setAttribute("oninput", "return;"), Ll = typeof ni.oninput == "function";
    }
    zl = Ll;
  } else zl = !1;
  Is = zl && (!document.documentMode || 9 < document.documentMode);
}
function ti() {
  Nt && (Nt.detachEvent("onpropertychange", js), Ut = Nt = null);
}
function js(e) {
  if (e.propertyName === "value" && rl(Ut)) {
    var n = [];
    Fs(n, Ut, e, Xo(e)), hs(xf, n);
  }
}
function _f(e, n, t) {
  e === "focusin" ? (ti(), Nt = n, Ut = t, Nt.attachEvent("onpropertychange", js)) : e === "focusout" && ti();
}
function Nf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return rl(Ut);
}
function Pf(e, n) {
  if (e === "click") return rl(n);
}
function zf(e, n) {
  if (e === "input" || e === "change") return rl(n);
}
function Lf(e, n) {
  return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
}
var De = typeof Object.is == "function" ? Object.is : Lf;
function $t(e, n) {
  if (De(e, n)) return !0;
  if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
  var t = Object.keys(e), r = Object.keys(n);
  if (t.length !== r.length) return !1;
  for (r = 0; r < t.length; r++) {
    var l = t[r];
    if (!Ql.call(n, l) || !De(e[l], n[l])) return !1;
  }
  return !0;
}
function ri(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function li(e, n) {
  var t = ri(e);
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
    t = ri(t);
  }
}
function Us(e, n) {
  return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Us(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
}
function $s() {
  for (var e = window, n = Mr(); n instanceof e.HTMLIFrameElement; ) {
    try {
      var t = typeof n.contentWindow.location.href == "string";
    } catch {
      t = !1;
    }
    if (t) e = n.contentWindow;
    else break;
    n = Mr(e.document);
  }
  return n;
}
function ru(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
}
function Tf(e) {
  var n = $s(), t = e.focusedElem, r = e.selectionRange;
  if (n !== t && t && t.ownerDocument && Us(t.ownerDocument.documentElement, t)) {
    if (r !== null && ru(t)) {
      if (n = r.start, e = r.end, e === void 0 && (e = n), "selectionStart" in t) t.selectionStart = n, t.selectionEnd = Math.min(e, t.value.length);
      else if (e = (n = t.ownerDocument || document) && n.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = t.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = li(t, o);
        var u = li(
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
var Mf = Qe && "documentMode" in document && 11 >= document.documentMode, Un = null, co = null, Pt = null, fo = !1;
function oi(e, n, t) {
  var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
  fo || Un == null || Un !== Mr(r) || (r = Un, "selectionStart" in r && ru(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Pt && $t(Pt, r) || (Pt = r, r = Ur(co, "onSelect"), 0 < r.length && (n = new eu("onSelect", "select", null, n, t), e.push({ event: n, listeners: r }), n.target = Un)));
}
function cr(e, n) {
  var t = {};
  return t[e.toLowerCase()] = n.toLowerCase(), t["Webkit" + e] = "webkit" + n, t["Moz" + e] = "moz" + n, t;
}
var $n = { animationend: cr("Animation", "AnimationEnd"), animationiteration: cr("Animation", "AnimationIteration"), animationstart: cr("Animation", "AnimationStart"), transitionend: cr("Transition", "TransitionEnd") }, Tl = {}, Vs = {};
Qe && (Vs = document.createElement("div").style, "AnimationEvent" in window || (delete $n.animationend.animation, delete $n.animationiteration.animation, delete $n.animationstart.animation), "TransitionEvent" in window || delete $n.transitionend.transition);
function ll(e) {
  if (Tl[e]) return Tl[e];
  if (!$n[e]) return e;
  var n = $n[e], t;
  for (t in n) if (n.hasOwnProperty(t) && t in Vs) return Tl[e] = n[t];
  return e;
}
var As = ll("animationend"), Bs = ll("animationiteration"), Ws = ll("animationstart"), Hs = ll("transitionend"), Qs = /* @__PURE__ */ new Map(), ui = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function mn(e, n) {
  Qs.set(e, n), Mn(n, [e]);
}
for (var Ml = 0; Ml < ui.length; Ml++) {
  var Rl = ui[Ml], Rf = Rl.toLowerCase(), Of = Rl[0].toUpperCase() + Rl.slice(1);
  mn(Rf, "on" + Of);
}
mn(As, "onAnimationEnd");
mn(Bs, "onAnimationIteration");
mn(Ws, "onAnimationStart");
mn("dblclick", "onDoubleClick");
mn("focusin", "onFocus");
mn("focusout", "onBlur");
mn(Hs, "onTransitionEnd");
bn("onMouseEnter", ["mouseout", "mouseover"]);
bn("onMouseLeave", ["mouseout", "mouseover"]);
bn("onPointerEnter", ["pointerout", "pointerover"]);
bn("onPointerLeave", ["pointerout", "pointerover"]);
Mn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Mn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Mn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Mn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Mn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Mn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Et = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Df = new Set("cancel close invalid load scroll toggle".split(" ").concat(Et));
function ii(e, n, t) {
  var r = e.type || "unknown-event";
  e.currentTarget = t, Mc(r, n, void 0, e), e.currentTarget = null;
}
function Ks(e, n) {
  n = (n & 4) !== 0;
  for (var t = 0; t < e.length; t++) {
    var r = e[t], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (n) for (var u = r.length - 1; 0 <= u; u--) {
        var i = r[u], s = i.instance, c = i.currentTarget;
        if (i = i.listener, s !== o && l.isPropagationStopped()) break e;
        ii(l, i, c), o = s;
      }
      else for (u = 0; u < r.length; u++) {
        if (i = r[u], s = i.instance, c = i.currentTarget, i = i.listener, s !== o && l.isPropagationStopped()) break e;
        ii(l, i, c), o = s;
      }
    }
  }
  if (Or) throw e = uo, Or = !1, uo = null, e;
}
function I(e, n) {
  var t = n[yo];
  t === void 0 && (t = n[yo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  t.has(r) || (Ys(n, e, 2, !1), t.add(r));
}
function Ol(e, n, t) {
  var r = 0;
  n && (r |= 4), Ys(t, e, r, n);
}
var fr = "_reactListening" + Math.random().toString(36).slice(2);
function Vt(e) {
  if (!e[fr]) {
    e[fr] = !0, es.forEach(function(t) {
      t !== "selectionchange" && (Df.has(t) || Ol(t, !1, e), Ol(t, !0, e));
    });
    var n = e.nodeType === 9 ? e : e.ownerDocument;
    n === null || n[fr] || (n[fr] = !0, Ol("selectionchange", !1, n));
  }
}
function Ys(e, n, t, r) {
  switch (Ts(n)) {
    case 1:
      var l = Yc;
      break;
    case 4:
      l = Xc;
      break;
    default:
      l = qo;
  }
  t = l.bind(null, n, t, e), l = void 0, !oo || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(n, t, { capture: !0, passive: l }) : e.addEventListener(n, t, !0) : l !== void 0 ? e.addEventListener(n, t, { passive: l }) : e.addEventListener(n, t, !1);
}
function Dl(e, n, t, r, l) {
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
        if (u = kn(i), u === null) return;
        if (s = u.tag, s === 5 || s === 6) {
          r = o = u;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  hs(function() {
    var c = o, v = Xo(t), m = [];
    e: {
      var p = Qs.get(e);
      if (p !== void 0) {
        var w = eu, g = e;
        switch (e) {
          case "keypress":
            if (xr(t) === 0) break e;
          case "keydown":
          case "keyup":
            w = cf;
            break;
          case "focusin":
            g = "focus", w = Pl;
            break;
          case "focusout":
            g = "blur", w = Pl;
            break;
          case "beforeblur":
          case "afterblur":
            w = Pl;
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
            w = Gu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Jc;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = pf;
            break;
          case As:
          case Bs:
          case Ws:
            w = ef;
            break;
          case Hs:
            w = vf;
            break;
          case "scroll":
            w = Gc;
            break;
          case "wheel":
            w = yf;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = tf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = Ju;
        }
        var S = (n & 4) !== 0, D = !S && e === "scroll", f = S ? p !== null ? p + "Capture" : null : p;
        S = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var h = d.stateNode;
          if (d.tag === 5 && h !== null && (d = h, f !== null && (h = Dt(a, f), h != null && S.push(At(a, h, d)))), D) break;
          a = a.return;
        }
        0 < S.length && (p = new w(p, g, null, t, v), m.push({ event: p, listeners: S }));
      }
    }
    if (!(n & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", p && t !== ro && (g = t.relatedTarget || t.fromElement) && (kn(g) || g[Ke])) break e;
        if ((w || p) && (p = v.window === v ? v : (p = v.ownerDocument) ? p.defaultView || p.parentWindow : window, w ? (g = t.relatedTarget || t.toElement, w = c, g = g ? kn(g) : null, g !== null && (D = Rn(g), g !== D || g.tag !== 5 && g.tag !== 6) && (g = null)) : (w = null, g = c), w !== g)) {
          if (S = Gu, h = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (S = Ju, h = "onPointerLeave", f = "onPointerEnter", a = "pointer"), D = w == null ? p : Vn(w), d = g == null ? p : Vn(g), p = new S(h, a + "leave", w, t, v), p.target = D, p.relatedTarget = d, h = null, kn(v) === c && (S = new S(f, a + "enter", g, t, v), S.target = d, S.relatedTarget = D, h = S), D = h, w && g) n: {
            for (S = w, f = g, a = 0, d = S; d; d = On(d)) a++;
            for (d = 0, h = f; h; h = On(h)) d++;
            for (; 0 < a - d; ) S = On(S), a--;
            for (; 0 < d - a; ) f = On(f), d--;
            for (; a--; ) {
              if (S === f || f !== null && S === f.alternate) break n;
              S = On(S), f = On(f);
            }
            S = null;
          }
          else S = null;
          w !== null && si(m, p, w, S, !1), g !== null && D !== null && si(m, D, g, S, !0);
        }
      }
      e: {
        if (p = c ? Vn(c) : window, w = p.nodeName && p.nodeName.toLowerCase(), w === "select" || w === "input" && p.type === "file") var k = Cf;
        else if (ei(p)) if (Is) k = zf;
        else {
          k = Nf;
          var C = _f;
        }
        else (w = p.nodeName) && w.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (k = Pf);
        if (k && (k = k(e, c))) {
          Fs(m, k, t, v);
          break e;
        }
        C && C(e, p, c), e === "focusout" && (C = p._wrapperState) && C.controlled && p.type === "number" && ql(p, "number", p.value);
      }
      switch (C = c ? Vn(c) : window, e) {
        case "focusin":
          (ei(C) || C.contentEditable === "true") && (Un = C, co = c, Pt = null);
          break;
        case "focusout":
          Pt = co = Un = null;
          break;
        case "mousedown":
          fo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          fo = !1, oi(m, t, v);
          break;
        case "selectionchange":
          if (Mf) break;
        case "keydown":
        case "keyup":
          oi(m, t, v);
      }
      var _;
      if (tu) e: {
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
      else jn ? Os(e, t) && (P = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (P = "onCompositionStart");
      P && (Rs && t.locale !== "ko" && (jn || P !== "onCompositionStart" ? P === "onCompositionEnd" && jn && (_ = Ms()) : (nn = v, bo = "value" in nn ? nn.value : nn.textContent, jn = !0)), C = Ur(c, P), 0 < C.length && (P = new Zu(P, e, null, t, v), m.push({ event: P, listeners: C }), _ ? P.data = _ : (_ = Ds(t), _ !== null && (P.data = _)))), (_ = wf ? Sf(e, t) : kf(e, t)) && (c = Ur(c, "onBeforeInput"), 0 < c.length && (v = new Zu("onBeforeInput", "beforeinput", null, t, v), m.push({ event: v, listeners: c }), v.data = _));
    }
    Ks(m, n);
  });
}
function At(e, n, t) {
  return { instance: e, listener: n, currentTarget: t };
}
function Ur(e, n) {
  for (var t = n + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Dt(e, t), o != null && r.unshift(At(e, o, l)), o = Dt(e, n), o != null && r.push(At(e, o, l))), e = e.return;
  }
  return r;
}
function On(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function si(e, n, t, r, l) {
  for (var o = n._reactName, u = []; t !== null && t !== r; ) {
    var i = t, s = i.alternate, c = i.stateNode;
    if (s !== null && s === r) break;
    i.tag === 5 && c !== null && (i = c, l ? (s = Dt(t, o), s != null && u.unshift(At(t, s, i))) : l || (s = Dt(t, o), s != null && u.push(At(t, s, i)))), t = t.return;
  }
  u.length !== 0 && e.push({ event: n, listeners: u });
}
var Ff = /\r\n?/g, If = /\u0000|\uFFFD/g;
function ai(e) {
  return (typeof e == "string" ? e : "" + e).replace(Ff, `
`).replace(If, "");
}
function dr(e, n, t) {
  if (n = ai(n), ai(e) !== n && t) throw Error(y(425));
}
function $r() {
}
var po = null, mo = null;
function vo(e, n) {
  return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
}
var ho = typeof setTimeout == "function" ? setTimeout : void 0, jf = typeof clearTimeout == "function" ? clearTimeout : void 0, ci = typeof Promise == "function" ? Promise : void 0, Uf = typeof queueMicrotask == "function" ? queueMicrotask : typeof ci < "u" ? function(e) {
  return ci.resolve(null).then(e).catch($f);
} : ho;
function $f(e) {
  setTimeout(function() {
    throw e;
  });
}
function Fl(e, n) {
  var t = n, r = 0;
  do {
    var l = t.nextSibling;
    if (e.removeChild(t), l && l.nodeType === 8) if (t = l.data, t === "/$") {
      if (r === 0) {
        e.removeChild(l), jt(n);
        return;
      }
      r--;
    } else t !== "$" && t !== "$?" && t !== "$!" || r++;
    t = l;
  } while (t);
  jt(n);
}
function un(e) {
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
function fi(e) {
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
var st = Math.random().toString(36).slice(2), je = "__reactFiber$" + st, Bt = "__reactProps$" + st, Ke = "__reactContainer$" + st, yo = "__reactEvents$" + st, Vf = "__reactListeners$" + st, Af = "__reactHandles$" + st;
function kn(e) {
  var n = e[je];
  if (n) return n;
  for (var t = e.parentNode; t; ) {
    if (n = t[Ke] || t[je]) {
      if (t = n.alternate, n.child !== null || t !== null && t.child !== null) for (e = fi(e); e !== null; ) {
        if (t = e[je]) return t;
        e = fi(e);
      }
      return n;
    }
    e = t, t = e.parentNode;
  }
  return null;
}
function qt(e) {
  return e = e[je] || e[Ke], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Vn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(y(33));
}
function ol(e) {
  return e[Bt] || null;
}
var go = [], An = -1;
function vn(e) {
  return { current: e };
}
function j(e) {
  0 > An || (e.current = go[An], go[An] = null, An--);
}
function F(e, n) {
  An++, go[An] = e.current, e.current = n;
}
var pn = {}, le = vn(pn), de = vn(!1), Nn = pn;
function et(e, n) {
  var t = e.type.contextTypes;
  if (!t) return pn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in t) l[o] = n[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function pe(e) {
  return e = e.childContextTypes, e != null;
}
function Vr() {
  j(de), j(le);
}
function di(e, n, t) {
  if (le.current !== pn) throw Error(y(168));
  F(le, n), F(de, t);
}
function Xs(e, n, t) {
  var r = e.stateNode;
  if (n = n.childContextTypes, typeof r.getChildContext != "function") return t;
  r = r.getChildContext();
  for (var l in r) if (!(l in n)) throw Error(y(108, Cc(e) || "Unknown", l));
  return A({}, t, r);
}
function Ar(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || pn, Nn = le.current, F(le, e), F(de, de.current), !0;
}
function pi(e, n, t) {
  var r = e.stateNode;
  if (!r) throw Error(y(169));
  t ? (e = Xs(e, n, Nn), r.__reactInternalMemoizedMergedChildContext = e, j(de), j(le), F(le, e)) : j(de), F(de, t);
}
var Ae = null, ul = !1, Il = !1;
function Gs(e) {
  Ae === null ? Ae = [e] : Ae.push(e);
}
function Bf(e) {
  ul = !0, Gs(e);
}
function hn() {
  if (!Il && Ae !== null) {
    Il = !0;
    var e = 0, n = O;
    try {
      var t = Ae;
      for (O = 1; e < t.length; e++) {
        var r = t[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ae = null, ul = !1;
    } catch (l) {
      throw Ae !== null && (Ae = Ae.slice(e + 1)), Ss(Go, hn), l;
    } finally {
      O = n, Il = !1;
    }
  }
  return null;
}
var Bn = [], Wn = 0, Br = null, Wr = 0, ke = [], Ee = 0, Pn = null, Be = 1, We = "";
function wn(e, n) {
  Bn[Wn++] = Wr, Bn[Wn++] = Br, Br = e, Wr = n;
}
function Zs(e, n, t) {
  ke[Ee++] = Be, ke[Ee++] = We, ke[Ee++] = Pn, Pn = e;
  var r = Be;
  e = We;
  var l = 32 - Re(r) - 1;
  r &= ~(1 << l), t += 1;
  var o = 32 - Re(n) + l;
  if (30 < o) {
    var u = l - l % 5;
    o = (r & (1 << u) - 1).toString(32), r >>= u, l -= u, Be = 1 << 32 - Re(n) + l | t << l | r, We = o + e;
  } else Be = 1 << o | t << l | r, We = e;
}
function lu(e) {
  e.return !== null && (wn(e, 1), Zs(e, 1, 0));
}
function ou(e) {
  for (; e === Br; ) Br = Bn[--Wn], Bn[Wn] = null, Wr = Bn[--Wn], Bn[Wn] = null;
  for (; e === Pn; ) Pn = ke[--Ee], ke[Ee] = null, We = ke[--Ee], ke[Ee] = null, Be = ke[--Ee], ke[Ee] = null;
}
var ye = null, he = null, U = !1, Me = null;
function Js(e, n) {
  var t = xe(5, null, null, 0);
  t.elementType = "DELETED", t.stateNode = n, t.return = e, n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t);
}
function mi(e, n) {
  switch (e.tag) {
    case 5:
      var t = e.type;
      return n = n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, ye = e, he = un(n.firstChild), !0) : !1;
    case 6:
      return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, ye = e, he = null, !0) : !1;
    case 13:
      return n = n.nodeType !== 8 ? null : n, n !== null ? (t = Pn !== null ? { id: Be, overflow: We } : null, e.memoizedState = { dehydrated: n, treeContext: t, retryLane: 1073741824 }, t = xe(18, null, null, 0), t.stateNode = n, t.return = e, e.child = t, ye = e, he = null, !0) : !1;
    default:
      return !1;
  }
}
function wo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function So(e) {
  if (U) {
    var n = he;
    if (n) {
      var t = n;
      if (!mi(e, n)) {
        if (wo(e)) throw Error(y(418));
        n = un(t.nextSibling);
        var r = ye;
        n && mi(e, n) ? Js(r, t) : (e.flags = e.flags & -4097 | 2, U = !1, ye = e);
      }
    } else {
      if (wo(e)) throw Error(y(418));
      e.flags = e.flags & -4097 | 2, U = !1, ye = e;
    }
  }
}
function vi(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ye = e;
}
function pr(e) {
  if (e !== ye) return !1;
  if (!U) return vi(e), U = !0, !1;
  var n;
  if ((n = e.tag !== 3) && !(n = e.tag !== 5) && (n = e.type, n = n !== "head" && n !== "body" && !vo(e.type, e.memoizedProps)), n && (n = he)) {
    if (wo(e)) throw qs(), Error(y(418));
    for (; n; ) Js(e, n), n = un(n.nextSibling);
  }
  if (vi(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(y(317));
    e: {
      for (e = e.nextSibling, n = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (t === "/$") {
            if (n === 0) {
              he = un(e.nextSibling);
              break e;
            }
            n--;
          } else t !== "$" && t !== "$!" && t !== "$?" || n++;
        }
        e = e.nextSibling;
      }
      he = null;
    }
  } else he = ye ? un(e.stateNode.nextSibling) : null;
  return !0;
}
function qs() {
  for (var e = he; e; ) e = un(e.nextSibling);
}
function nt() {
  he = ye = null, U = !1;
}
function uu(e) {
  Me === null ? Me = [e] : Me.push(e);
}
var Wf = Ge.ReactCurrentBatchConfig;
function ht(e, n, t) {
  if (e = t.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (t._owner) {
      if (t = t._owner, t) {
        if (t.tag !== 1) throw Error(y(309));
        var r = t.stateNode;
      }
      if (!r) throw Error(y(147, e));
      var l = r, o = "" + e;
      return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === o ? n.ref : (n = function(u) {
        var i = l.refs;
        u === null ? delete i[o] : i[o] = u;
      }, n._stringRef = o, n);
    }
    if (typeof e != "string") throw Error(y(284));
    if (!t._owner) throw Error(y(290, e));
  }
  return e;
}
function mr(e, n) {
  throw e = Object.prototype.toString.call(n), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e));
}
function hi(e) {
  var n = e._init;
  return n(e._payload);
}
function bs(e) {
  function n(f, a) {
    if (e) {
      var d = f.deletions;
      d === null ? (f.deletions = [a], f.flags |= 16) : d.push(a);
    }
  }
  function t(f, a) {
    if (!e) return null;
    for (; a !== null; ) n(f, a), a = a.sibling;
    return null;
  }
  function r(f, a) {
    for (f = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? f.set(a.key, a) : f.set(a.index, a), a = a.sibling;
    return f;
  }
  function l(f, a) {
    return f = fn(f, a), f.index = 0, f.sibling = null, f;
  }
  function o(f, a, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
  }
  function u(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function i(f, a, d, h) {
    return a === null || a.tag !== 6 ? (a = Wl(d, f.mode, h), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function s(f, a, d, h) {
    var k = d.type;
    return k === In ? v(f, a, d.props.children, h, d.key) : a !== null && (a.elementType === k || typeof k == "object" && k !== null && k.$$typeof === Je && hi(k) === a.type) ? (h = l(a, d.props), h.ref = ht(f, a, d), h.return = f, h) : (h = Tr(d.type, d.key, d.props, null, f.mode, h), h.ref = ht(f, a, d), h.return = f, h);
  }
  function c(f, a, d, h) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Hl(d, f.mode, h), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function v(f, a, d, h, k) {
    return a === null || a.tag !== 7 ? (a = _n(d, f.mode, h, k), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function m(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = Wl("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case rr:
          return d = Tr(a.type, a.key, a.props, null, f.mode, d), d.ref = ht(f, null, a), d.return = f, d;
        case Fn:
          return a = Hl(a, f.mode, d), a.return = f, a;
        case Je:
          var h = a._init;
          return m(f, h(a._payload), d);
      }
      if (St(a) || ft(a)) return a = _n(a, f.mode, d, null), a.return = f, a;
      mr(f, a);
    }
    return null;
  }
  function p(f, a, d, h) {
    var k = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return k !== null ? null : i(f, a, "" + d, h);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case rr:
          return d.key === k ? s(f, a, d, h) : null;
        case Fn:
          return d.key === k ? c(f, a, d, h) : null;
        case Je:
          return k = d._init, p(
            f,
            a,
            k(d._payload),
            h
          );
      }
      if (St(d) || ft(d)) return k !== null ? null : v(f, a, d, h, null);
      mr(f, d);
    }
    return null;
  }
  function w(f, a, d, h, k) {
    if (typeof h == "string" && h !== "" || typeof h == "number") return f = f.get(d) || null, i(a, f, "" + h, k);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case rr:
          return f = f.get(h.key === null ? d : h.key) || null, s(a, f, h, k);
        case Fn:
          return f = f.get(h.key === null ? d : h.key) || null, c(a, f, h, k);
        case Je:
          var C = h._init;
          return w(f, a, d, C(h._payload), k);
      }
      if (St(h) || ft(h)) return f = f.get(d) || null, v(a, f, h, k, null);
      mr(a, h);
    }
    return null;
  }
  function g(f, a, d, h) {
    for (var k = null, C = null, _ = a, P = a = 0, W = null; _ !== null && P < d.length; P++) {
      _.index > P ? (W = _, _ = null) : W = _.sibling;
      var M = p(f, _, d[P], h);
      if (M === null) {
        _ === null && (_ = W);
        break;
      }
      e && _ && M.alternate === null && n(f, _), a = o(M, a, P), C === null ? k = M : C.sibling = M, C = M, _ = W;
    }
    if (P === d.length) return t(f, _), U && wn(f, P), k;
    if (_ === null) {
      for (; P < d.length; P++) _ = m(f, d[P], h), _ !== null && (a = o(_, a, P), C === null ? k = _ : C.sibling = _, C = _);
      return U && wn(f, P), k;
    }
    for (_ = r(f, _); P < d.length; P++) W = w(_, f, P, d[P], h), W !== null && (e && W.alternate !== null && _.delete(W.key === null ? P : W.key), a = o(W, a, P), C === null ? k = W : C.sibling = W, C = W);
    return e && _.forEach(function(Pe) {
      return n(f, Pe);
    }), U && wn(f, P), k;
  }
  function S(f, a, d, h) {
    var k = ft(d);
    if (typeof k != "function") throw Error(y(150));
    if (d = k.call(d), d == null) throw Error(y(151));
    for (var C = k = null, _ = a, P = a = 0, W = null, M = d.next(); _ !== null && !M.done; P++, M = d.next()) {
      _.index > P ? (W = _, _ = null) : W = _.sibling;
      var Pe = p(f, _, M.value, h);
      if (Pe === null) {
        _ === null && (_ = W);
        break;
      }
      e && _ && Pe.alternate === null && n(f, _), a = o(Pe, a, P), C === null ? k = Pe : C.sibling = Pe, C = Pe, _ = W;
    }
    if (M.done) return t(
      f,
      _
    ), U && wn(f, P), k;
    if (_ === null) {
      for (; !M.done; P++, M = d.next()) M = m(f, M.value, h), M !== null && (a = o(M, a, P), C === null ? k = M : C.sibling = M, C = M);
      return U && wn(f, P), k;
    }
    for (_ = r(f, _); !M.done; P++, M = d.next()) M = w(_, f, P, M.value, h), M !== null && (e && M.alternate !== null && _.delete(M.key === null ? P : M.key), a = o(M, a, P), C === null ? k = M : C.sibling = M, C = M);
    return e && _.forEach(function(at) {
      return n(f, at);
    }), U && wn(f, P), k;
  }
  function D(f, a, d, h) {
    if (typeof d == "object" && d !== null && d.type === In && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case rr:
          e: {
            for (var k = d.key, C = a; C !== null; ) {
              if (C.key === k) {
                if (k = d.type, k === In) {
                  if (C.tag === 7) {
                    t(f, C.sibling), a = l(C, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (C.elementType === k || typeof k == "object" && k !== null && k.$$typeof === Je && hi(k) === C.type) {
                  t(f, C.sibling), a = l(C, d.props), a.ref = ht(f, C, d), a.return = f, f = a;
                  break e;
                }
                t(f, C);
                break;
              } else n(f, C);
              C = C.sibling;
            }
            d.type === In ? (a = _n(d.props.children, f.mode, h, d.key), a.return = f, f = a) : (h = Tr(d.type, d.key, d.props, null, f.mode, h), h.ref = ht(f, a, d), h.return = f, f = h);
          }
          return u(f);
        case Fn:
          e: {
            for (C = d.key; a !== null; ) {
              if (a.key === C) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                t(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                t(f, a);
                break;
              }
              else n(f, a);
              a = a.sibling;
            }
            a = Hl(d, f.mode, h), a.return = f, f = a;
          }
          return u(f);
        case Je:
          return C = d._init, D(f, a, C(d._payload), h);
      }
      if (St(d)) return g(f, a, d, h);
      if (ft(d)) return S(f, a, d, h);
      mr(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (t(f, a.sibling), a = l(a, d), a.return = f, f = a) : (t(f, a), a = Wl(d, f.mode, h), a.return = f, f = a), u(f)) : t(f, a);
  }
  return D;
}
var tt = bs(!0), ea = bs(!1), Hr = vn(null), Qr = null, Hn = null, iu = null;
function su() {
  iu = Hn = Qr = null;
}
function au(e) {
  var n = Hr.current;
  j(Hr), e._currentValue = n;
}
function ko(e, n, t) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === t) break;
    e = e.return;
  }
}
function Jn(e, n) {
  Qr = e, iu = Hn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & n && (fe = !0), e.firstContext = null);
}
function _e(e) {
  var n = e._currentValue;
  if (iu !== e) if (e = { context: e, memoizedValue: n, next: null }, Hn === null) {
    if (Qr === null) throw Error(y(308));
    Hn = e, Qr.dependencies = { lanes: 0, firstContext: e };
  } else Hn = Hn.next = e;
  return n;
}
var En = null;
function cu(e) {
  En === null ? En = [e] : En.push(e);
}
function na(e, n, t, r) {
  var l = n.interleaved;
  return l === null ? (t.next = t, cu(n)) : (t.next = l.next, l.next = t), n.interleaved = t, Ye(e, r);
}
function Ye(e, n) {
  e.lanes |= n;
  var t = e.alternate;
  for (t !== null && (t.lanes |= n), t = e, e = e.return; e !== null; ) e.childLanes |= n, t = e.alternate, t !== null && (t.childLanes |= n), t = e, e = e.return;
  return t.tag === 3 ? t.stateNode : null;
}
var qe = !1;
function fu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function ta(e, n) {
  e = e.updateQueue, n.updateQueue === e && (n.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function He(e, n) {
  return { eventTime: e, lane: n, tag: 0, payload: null, callback: null, next: null };
}
function sn(e, n, t) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, R & 2) {
    var l = r.pending;
    return l === null ? n.next = n : (n.next = l.next, l.next = n), r.pending = n, Ye(e, t);
  }
  return l = r.interleaved, l === null ? (n.next = n, cu(r)) : (n.next = l.next, l.next = n), r.interleaved = n, Ye(e, t);
}
function Cr(e, n, t) {
  if (n = n.updateQueue, n !== null && (n = n.shared, (t & 4194240) !== 0)) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, Zo(e, t);
  }
}
function yi(e, n) {
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
function Kr(e, n, t, r) {
  var l = e.updateQueue;
  qe = !1;
  var o = l.firstBaseUpdate, u = l.lastBaseUpdate, i = l.shared.pending;
  if (i !== null) {
    l.shared.pending = null;
    var s = i, c = s.next;
    s.next = null, u === null ? o = c : u.next = c, u = s;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, i = v.lastBaseUpdate, i !== u && (i === null ? v.firstBaseUpdate = c : i.next = c, v.lastBaseUpdate = s));
  }
  if (o !== null) {
    var m = l.baseState;
    u = 0, v = c = s = null, i = o;
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
          var g = e, S = i;
          switch (p = n, w = t, S.tag) {
            case 1:
              if (g = S.payload, typeof g == "function") {
                m = g.call(w, m, p);
                break e;
              }
              m = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = S.payload, p = typeof g == "function" ? g.call(w, m, p) : g, p == null) break e;
              m = A({}, m, p);
              break e;
            case 2:
              qe = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [i] : p.push(i));
      } else w = { eventTime: w, lane: p, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, v === null ? (c = v = w, s = m) : v = v.next = w, u |= p;
      if (i = i.next, i === null) {
        if (i = l.shared.pending, i === null) break;
        p = i, i = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (s = m), l.baseState = s, l.firstBaseUpdate = c, l.lastBaseUpdate = v, n = l.shared.interleaved, n !== null) {
      l = n;
      do
        u |= l.lane, l = l.next;
      while (l !== n);
    } else o === null && (l.shared.lanes = 0);
    Ln |= u, e.lanes = u, e.memoizedState = m;
  }
}
function gi(e, n, t) {
  if (e = n.effects, n.effects = null, e !== null) for (n = 0; n < e.length; n++) {
    var r = e[n], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = t, typeof l != "function") throw Error(y(191, l));
      l.call(r);
    }
  }
}
var bt = {}, $e = vn(bt), Wt = vn(bt), Ht = vn(bt);
function xn(e) {
  if (e === bt) throw Error(y(174));
  return e;
}
function du(e, n) {
  switch (F(Ht, n), F(Wt, e), F($e, bt), e = n.nodeType, e) {
    case 9:
    case 11:
      n = (n = n.documentElement) ? n.namespaceURI : eo(null, "");
      break;
    default:
      e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = eo(n, e);
  }
  j($e), F($e, n);
}
function rt() {
  j($e), j(Wt), j(Ht);
}
function ra(e) {
  xn(Ht.current);
  var n = xn($e.current), t = eo(n, e.type);
  n !== t && (F(Wt, e), F($e, t));
}
function pu(e) {
  Wt.current === e && (j($e), j(Wt));
}
var $ = vn(0);
function Yr(e) {
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
var jl = [];
function mu() {
  for (var e = 0; e < jl.length; e++) jl[e]._workInProgressVersionPrimary = null;
  jl.length = 0;
}
var _r = Ge.ReactCurrentDispatcher, Ul = Ge.ReactCurrentBatchConfig, zn = 0, V = null, Y = null, Z = null, Xr = !1, zt = !1, Qt = 0, Hf = 0;
function ne() {
  throw Error(y(321));
}
function vu(e, n) {
  if (n === null) return !1;
  for (var t = 0; t < n.length && t < e.length; t++) if (!De(e[t], n[t])) return !1;
  return !0;
}
function hu(e, n, t, r, l, o) {
  if (zn = o, V = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, _r.current = e === null || e.memoizedState === null ? Xf : Gf, e = t(r, l), zt) {
    o = 0;
    do {
      if (zt = !1, Qt = 0, 25 <= o) throw Error(y(301));
      o += 1, Z = Y = null, n.updateQueue = null, _r.current = Zf, e = t(r, l);
    } while (zt);
  }
  if (_r.current = Gr, n = Y !== null && Y.next !== null, zn = 0, Z = Y = V = null, Xr = !1, n) throw Error(y(300));
  return e;
}
function yu() {
  var e = Qt !== 0;
  return Qt = 0, e;
}
function Ie() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Z === null ? V.memoizedState = Z = e : Z = Z.next = e, Z;
}
function Ne() {
  if (Y === null) {
    var e = V.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Y.next;
  var n = Z === null ? V.memoizedState : Z.next;
  if (n !== null) Z = n, Y = e;
  else {
    if (e === null) throw Error(y(310));
    Y = e, e = { memoizedState: Y.memoizedState, baseState: Y.baseState, baseQueue: Y.baseQueue, queue: Y.queue, next: null }, Z === null ? V.memoizedState = Z = e : Z = Z.next = e;
  }
  return Z;
}
function Kt(e, n) {
  return typeof n == "function" ? n(e) : n;
}
function $l(e) {
  var n = Ne(), t = n.queue;
  if (t === null) throw Error(y(311));
  t.lastRenderedReducer = e;
  var r = Y, l = r.baseQueue, o = t.pending;
  if (o !== null) {
    if (l !== null) {
      var u = l.next;
      l.next = o.next, o.next = u;
    }
    r.baseQueue = l = o, t.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var i = u = null, s = null, c = o;
    do {
      var v = c.lane;
      if ((zn & v) === v) s !== null && (s = s.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var m = {
          lane: v,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        s === null ? (i = s = m, u = r) : s = s.next = m, V.lanes |= v, Ln |= v;
      }
      c = c.next;
    } while (c !== null && c !== o);
    s === null ? u = r : s.next = i, De(r, n.memoizedState) || (fe = !0), n.memoizedState = r, n.baseState = u, n.baseQueue = s, t.lastRenderedState = r;
  }
  if (e = t.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, V.lanes |= o, Ln |= o, l = l.next;
    while (l !== e);
  } else l === null && (t.lanes = 0);
  return [n.memoizedState, t.dispatch];
}
function Vl(e) {
  var n = Ne(), t = n.queue;
  if (t === null) throw Error(y(311));
  t.lastRenderedReducer = e;
  var r = t.dispatch, l = t.pending, o = n.memoizedState;
  if (l !== null) {
    t.pending = null;
    var u = l = l.next;
    do
      o = e(o, u.action), u = u.next;
    while (u !== l);
    De(o, n.memoizedState) || (fe = !0), n.memoizedState = o, n.baseQueue === null && (n.baseState = o), t.lastRenderedState = o;
  }
  return [o, r];
}
function la() {
}
function oa(e, n) {
  var t = V, r = Ne(), l = n(), o = !De(r.memoizedState, l);
  if (o && (r.memoizedState = l, fe = !0), r = r.queue, gu(sa.bind(null, t, r, e), [e]), r.getSnapshot !== n || o || Z !== null && Z.memoizedState.tag & 1) {
    if (t.flags |= 2048, Yt(9, ia.bind(null, t, r, l, n), void 0, null), J === null) throw Error(y(349));
    zn & 30 || ua(t, n, l);
  }
  return l;
}
function ua(e, n, t) {
  e.flags |= 16384, e = { getSnapshot: n, value: t }, n = V.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, V.updateQueue = n, n.stores = [e]) : (t = n.stores, t === null ? n.stores = [e] : t.push(e));
}
function ia(e, n, t, r) {
  n.value = t, n.getSnapshot = r, aa(n) && ca(e);
}
function sa(e, n, t) {
  return t(function() {
    aa(n) && ca(e);
  });
}
function aa(e) {
  var n = e.getSnapshot;
  e = e.value;
  try {
    var t = n();
    return !De(e, t);
  } catch {
    return !0;
  }
}
function ca(e) {
  var n = Ye(e, 1);
  n !== null && Oe(n, e, 1, -1);
}
function wi(e) {
  var n = Ie();
  return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Kt, lastRenderedState: e }, n.queue = e, e = e.dispatch = Yf.bind(null, V, e), [n.memoizedState, e];
}
function Yt(e, n, t, r) {
  return e = { tag: e, create: n, destroy: t, deps: r, next: null }, n = V.updateQueue, n === null ? (n = { lastEffect: null, stores: null }, V.updateQueue = n, n.lastEffect = e.next = e) : (t = n.lastEffect, t === null ? n.lastEffect = e.next = e : (r = t.next, t.next = e, e.next = r, n.lastEffect = e)), e;
}
function fa() {
  return Ne().memoizedState;
}
function Nr(e, n, t, r) {
  var l = Ie();
  V.flags |= e, l.memoizedState = Yt(1 | n, t, void 0, r === void 0 ? null : r);
}
function il(e, n, t, r) {
  var l = Ne();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Y !== null) {
    var u = Y.memoizedState;
    if (o = u.destroy, r !== null && vu(r, u.deps)) {
      l.memoizedState = Yt(n, t, o, r);
      return;
    }
  }
  V.flags |= e, l.memoizedState = Yt(1 | n, t, o, r);
}
function Si(e, n) {
  return Nr(8390656, 8, e, n);
}
function gu(e, n) {
  return il(2048, 8, e, n);
}
function da(e, n) {
  return il(4, 2, e, n);
}
function pa(e, n) {
  return il(4, 4, e, n);
}
function ma(e, n) {
  if (typeof n == "function") return e = e(), n(e), function() {
    n(null);
  };
  if (n != null) return e = e(), n.current = e, function() {
    n.current = null;
  };
}
function va(e, n, t) {
  return t = t != null ? t.concat([e]) : null, il(4, 4, ma.bind(null, n, e), t);
}
function wu() {
}
function ha(e, n) {
  var t = Ne();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && vu(n, r[1]) ? r[0] : (t.memoizedState = [e, n], e);
}
function ya(e, n) {
  var t = Ne();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && vu(n, r[1]) ? r[0] : (e = e(), t.memoizedState = [e, n], e);
}
function ga(e, n, t) {
  return zn & 21 ? (De(t, n) || (t = xs(), V.lanes |= t, Ln |= t, e.baseState = !0), n) : (e.baseState && (e.baseState = !1, fe = !0), e.memoizedState = t);
}
function Qf(e, n) {
  var t = O;
  O = t !== 0 && 4 > t ? t : 4, e(!0);
  var r = Ul.transition;
  Ul.transition = {};
  try {
    e(!1), n();
  } finally {
    O = t, Ul.transition = r;
  }
}
function wa() {
  return Ne().memoizedState;
}
function Kf(e, n, t) {
  var r = cn(e);
  if (t = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null }, Sa(e)) ka(n, t);
  else if (t = na(e, n, t, r), t !== null) {
    var l = ie();
    Oe(t, e, r, l), Ea(t, n, r);
  }
}
function Yf(e, n, t) {
  var r = cn(e), l = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null };
  if (Sa(e)) ka(n, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = n.lastRenderedReducer, o !== null)) try {
      var u = n.lastRenderedState, i = o(u, t);
      if (l.hasEagerState = !0, l.eagerState = i, De(i, u)) {
        var s = n.interleaved;
        s === null ? (l.next = l, cu(n)) : (l.next = s.next, s.next = l), n.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    t = na(e, n, l, r), t !== null && (l = ie(), Oe(t, e, r, l), Ea(t, n, r));
  }
}
function Sa(e) {
  var n = e.alternate;
  return e === V || n !== null && n === V;
}
function ka(e, n) {
  zt = Xr = !0;
  var t = e.pending;
  t === null ? n.next = n : (n.next = t.next, t.next = n), e.pending = n;
}
function Ea(e, n, t) {
  if (t & 4194240) {
    var r = n.lanes;
    r &= e.pendingLanes, t |= r, n.lanes = t, Zo(e, t);
  }
}
var Gr = { readContext: _e, useCallback: ne, useContext: ne, useEffect: ne, useImperativeHandle: ne, useInsertionEffect: ne, useLayoutEffect: ne, useMemo: ne, useReducer: ne, useRef: ne, useState: ne, useDebugValue: ne, useDeferredValue: ne, useTransition: ne, useMutableSource: ne, useSyncExternalStore: ne, useId: ne, unstable_isNewReconciler: !1 }, Xf = { readContext: _e, useCallback: function(e, n) {
  return Ie().memoizedState = [e, n === void 0 ? null : n], e;
}, useContext: _e, useEffect: Si, useImperativeHandle: function(e, n, t) {
  return t = t != null ? t.concat([e]) : null, Nr(
    4194308,
    4,
    ma.bind(null, n, e),
    t
  );
}, useLayoutEffect: function(e, n) {
  return Nr(4194308, 4, e, n);
}, useInsertionEffect: function(e, n) {
  return Nr(4, 2, e, n);
}, useMemo: function(e, n) {
  var t = Ie();
  return n = n === void 0 ? null : n, e = e(), t.memoizedState = [e, n], e;
}, useReducer: function(e, n, t) {
  var r = Ie();
  return n = t !== void 0 ? t(n) : n, r.memoizedState = r.baseState = n, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: n }, r.queue = e, e = e.dispatch = Kf.bind(null, V, e), [r.memoizedState, e];
}, useRef: function(e) {
  var n = Ie();
  return e = { current: e }, n.memoizedState = e;
}, useState: wi, useDebugValue: wu, useDeferredValue: function(e) {
  return Ie().memoizedState = e;
}, useTransition: function() {
  var e = wi(!1), n = e[0];
  return e = Qf.bind(null, e[1]), Ie().memoizedState = e, [n, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, n, t) {
  var r = V, l = Ie();
  if (U) {
    if (t === void 0) throw Error(y(407));
    t = t();
  } else {
    if (t = n(), J === null) throw Error(y(349));
    zn & 30 || ua(r, n, t);
  }
  l.memoizedState = t;
  var o = { value: t, getSnapshot: n };
  return l.queue = o, Si(sa.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Yt(9, ia.bind(null, r, o, t, n), void 0, null), t;
}, useId: function() {
  var e = Ie(), n = J.identifierPrefix;
  if (U) {
    var t = We, r = Be;
    t = (r & ~(1 << 32 - Re(r) - 1)).toString(32) + t, n = ":" + n + "R" + t, t = Qt++, 0 < t && (n += "H" + t.toString(32)), n += ":";
  } else t = Hf++, n = ":" + n + "r" + t.toString(32) + ":";
  return e.memoizedState = n;
}, unstable_isNewReconciler: !1 }, Gf = {
  readContext: _e,
  useCallback: ha,
  useContext: _e,
  useEffect: gu,
  useImperativeHandle: va,
  useInsertionEffect: da,
  useLayoutEffect: pa,
  useMemo: ya,
  useReducer: $l,
  useRef: fa,
  useState: function() {
    return $l(Kt);
  },
  useDebugValue: wu,
  useDeferredValue: function(e) {
    var n = Ne();
    return ga(n, Y.memoizedState, e);
  },
  useTransition: function() {
    var e = $l(Kt)[0], n = Ne().memoizedState;
    return [e, n];
  },
  useMutableSource: la,
  useSyncExternalStore: oa,
  useId: wa,
  unstable_isNewReconciler: !1
}, Zf = { readContext: _e, useCallback: ha, useContext: _e, useEffect: gu, useImperativeHandle: va, useInsertionEffect: da, useLayoutEffect: pa, useMemo: ya, useReducer: Vl, useRef: fa, useState: function() {
  return Vl(Kt);
}, useDebugValue: wu, useDeferredValue: function(e) {
  var n = Ne();
  return Y === null ? n.memoizedState = e : ga(n, Y.memoizedState, e);
}, useTransition: function() {
  var e = Vl(Kt)[0], n = Ne().memoizedState;
  return [e, n];
}, useMutableSource: la, useSyncExternalStore: oa, useId: wa, unstable_isNewReconciler: !1 };
function Le(e, n) {
  if (e && e.defaultProps) {
    n = A({}, n), e = e.defaultProps;
    for (var t in e) n[t] === void 0 && (n[t] = e[t]);
    return n;
  }
  return n;
}
function Eo(e, n, t, r) {
  n = e.memoizedState, t = t(r, n), t = t == null ? n : A({}, n, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t);
}
var sl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Rn(e) === e : !1;
}, enqueueSetState: function(e, n, t) {
  e = e._reactInternals;
  var r = ie(), l = cn(e), o = He(r, l);
  o.payload = n, t != null && (o.callback = t), n = sn(e, o, l), n !== null && (Oe(n, e, l, r), Cr(n, e, l));
}, enqueueReplaceState: function(e, n, t) {
  e = e._reactInternals;
  var r = ie(), l = cn(e), o = He(r, l);
  o.tag = 1, o.payload = n, t != null && (o.callback = t), n = sn(e, o, l), n !== null && (Oe(n, e, l, r), Cr(n, e, l));
}, enqueueForceUpdate: function(e, n) {
  e = e._reactInternals;
  var t = ie(), r = cn(e), l = He(t, r);
  l.tag = 2, n != null && (l.callback = n), n = sn(e, l, r), n !== null && (Oe(n, e, r, t), Cr(n, e, r));
} };
function ki(e, n, t, r, l, o, u) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, u) : n.prototype && n.prototype.isPureReactComponent ? !$t(t, r) || !$t(l, o) : !0;
}
function xa(e, n, t) {
  var r = !1, l = pn, o = n.contextType;
  return typeof o == "object" && o !== null ? o = _e(o) : (l = pe(n) ? Nn : le.current, r = n.contextTypes, o = (r = r != null) ? et(e, l) : pn), n = new n(t, o), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = sl, e.stateNode = n, n._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), n;
}
function Ei(e, n, t, r) {
  e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(t, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(t, r), n.state !== e && sl.enqueueReplaceState(n, n.state, null);
}
function xo(e, n, t, r) {
  var l = e.stateNode;
  l.props = t, l.state = e.memoizedState, l.refs = {}, fu(e);
  var o = n.contextType;
  typeof o == "object" && o !== null ? l.context = _e(o) : (o = pe(n) ? Nn : le.current, l.context = et(e, o)), l.state = e.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Eo(e, n, o, t), l.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (n = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), n !== l.state && sl.enqueueReplaceState(l, l.state, null), Kr(e, t, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function lt(e, n) {
  try {
    var t = "", r = n;
    do
      t += xc(r), r = r.return;
    while (r);
    var l = t;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: n, stack: l, digest: null };
}
function Al(e, n, t) {
  return { value: e, source: null, stack: t ?? null, digest: n ?? null };
}
function Co(e, n) {
  try {
    console.error(n.value);
  } catch (t) {
    setTimeout(function() {
      throw t;
    });
  }
}
var Jf = typeof WeakMap == "function" ? WeakMap : Map;
function Ca(e, n, t) {
  t = He(-1, t), t.tag = 3, t.payload = { element: null };
  var r = n.value;
  return t.callback = function() {
    Jr || (Jr = !0, Do = r), Co(e, n);
  }, t;
}
function _a(e, n, t) {
  t = He(-1, t), t.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = n.value;
    t.payload = function() {
      return r(l);
    }, t.callback = function() {
      Co(e, n);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (t.callback = function() {
    Co(e, n), typeof r != "function" && (an === null ? an = /* @__PURE__ */ new Set([this]) : an.add(this));
    var u = n.stack;
    this.componentDidCatch(n.value, { componentStack: u !== null ? u : "" });
  }), t;
}
function xi(e, n, t) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Jf();
    var l = /* @__PURE__ */ new Set();
    r.set(n, l);
  } else l = r.get(n), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(n, l));
  l.has(t) || (l.add(t), e = fd.bind(null, e, n, t), n.then(e, e));
}
function Ci(e) {
  do {
    var n;
    if ((n = e.tag === 13) && (n = e.memoizedState, n = n !== null ? n.dehydrated !== null : !0), n) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function _i(e, n, t, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === n ? e.flags |= 65536 : (e.flags |= 128, t.flags |= 131072, t.flags &= -52805, t.tag === 1 && (t.alternate === null ? t.tag = 17 : (n = He(-1, 1), n.tag = 2, sn(t, n, 1))), t.lanes |= 1), e);
}
var qf = Ge.ReactCurrentOwner, fe = !1;
function oe(e, n, t, r) {
  n.child = e === null ? ea(n, null, t, r) : tt(n, e.child, t, r);
}
function Ni(e, n, t, r, l) {
  t = t.render;
  var o = n.ref;
  return Jn(n, l), r = hu(e, n, t, r, o, l), t = yu(), e !== null && !fe ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, Xe(e, n, l)) : (U && t && lu(n), n.flags |= 1, oe(e, n, r, l), n.child);
}
function Pi(e, n, t, r, l) {
  if (e === null) {
    var o = t.type;
    return typeof o == "function" && !Pu(o) && o.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (n.tag = 15, n.type = o, Na(e, n, o, r, l)) : (e = Tr(t.type, null, r, n, n.mode, l), e.ref = n.ref, e.return = n, n.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var u = o.memoizedProps;
    if (t = t.compare, t = t !== null ? t : $t, t(u, r) && e.ref === n.ref) return Xe(e, n, l);
  }
  return n.flags |= 1, e = fn(o, r), e.ref = n.ref, e.return = n, n.child = e;
}
function Na(e, n, t, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if ($t(o, r) && e.ref === n.ref) if (fe = !1, n.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (fe = !0);
    else return n.lanes = e.lanes, Xe(e, n, l);
  }
  return _o(e, n, t, r, l);
}
function Pa(e, n, t) {
  var r = n.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(n.mode & 1)) n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, F(Kn, ve), ve |= t;
  else {
    if (!(t & 1073741824)) return e = o !== null ? o.baseLanes | t : t, n.lanes = n.childLanes = 1073741824, n.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, n.updateQueue = null, F(Kn, ve), ve |= e, null;
    n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : t, F(Kn, ve), ve |= r;
  }
  else o !== null ? (r = o.baseLanes | t, n.memoizedState = null) : r = t, F(Kn, ve), ve |= r;
  return oe(e, n, l, t), n.child;
}
function za(e, n) {
  var t = n.ref;
  (e === null && t !== null || e !== null && e.ref !== t) && (n.flags |= 512, n.flags |= 2097152);
}
function _o(e, n, t, r, l) {
  var o = pe(t) ? Nn : le.current;
  return o = et(n, o), Jn(n, l), t = hu(e, n, t, r, o, l), r = yu(), e !== null && !fe ? (n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l, Xe(e, n, l)) : (U && r && lu(n), n.flags |= 1, oe(e, n, t, l), n.child);
}
function zi(e, n, t, r, l) {
  if (pe(t)) {
    var o = !0;
    Ar(n);
  } else o = !1;
  if (Jn(n, l), n.stateNode === null) Pr(e, n), xa(n, t, r), xo(n, t, r, l), r = !0;
  else if (e === null) {
    var u = n.stateNode, i = n.memoizedProps;
    u.props = i;
    var s = u.context, c = t.contextType;
    typeof c == "object" && c !== null ? c = _e(c) : (c = pe(t) ? Nn : le.current, c = et(n, c));
    var v = t.getDerivedStateFromProps, m = typeof v == "function" || typeof u.getSnapshotBeforeUpdate == "function";
    m || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== r || s !== c) && Ei(n, u, r, c), qe = !1;
    var p = n.memoizedState;
    u.state = p, Kr(n, r, u, l), s = n.memoizedState, i !== r || p !== s || de.current || qe ? (typeof v == "function" && (Eo(n, t, v, r), s = n.memoizedState), (i = qe || ki(n, t, i, r, p, s, c)) ? (m || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = s), u.props = r, u.state = s, u.context = c, r = i) : (typeof u.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
  } else {
    u = n.stateNode, ta(e, n), i = n.memoizedProps, c = n.type === n.elementType ? i : Le(n.type, i), u.props = c, m = n.pendingProps, p = u.context, s = t.contextType, typeof s == "object" && s !== null ? s = _e(s) : (s = pe(t) ? Nn : le.current, s = et(n, s));
    var w = t.getDerivedStateFromProps;
    (v = typeof w == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== m || p !== s) && Ei(n, u, r, s), qe = !1, p = n.memoizedState, u.state = p, Kr(n, r, u, l);
    var g = n.memoizedState;
    i !== m || p !== g || de.current || qe ? (typeof w == "function" && (Eo(n, t, w, r), g = n.memoizedState), (c = qe || ki(n, t, c, r, p, g, s) || !1) ? (v || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, g, s), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(r, g, s)), typeof u.componentDidUpdate == "function" && (n.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = g), u.props = r, u.state = g, u.context = s, r = c) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (n.flags |= 1024), r = !1);
  }
  return No(e, n, t, r, o, l);
}
function No(e, n, t, r, l, o) {
  za(e, n);
  var u = (n.flags & 128) !== 0;
  if (!r && !u) return l && pi(n, t, !1), Xe(e, n, o);
  r = n.stateNode, qf.current = n;
  var i = u && typeof t.getDerivedStateFromError != "function" ? null : r.render();
  return n.flags |= 1, e !== null && u ? (n.child = tt(n, e.child, null, o), n.child = tt(n, null, i, o)) : oe(e, n, i, o), n.memoizedState = r.state, l && pi(n, t, !0), n.child;
}
function La(e) {
  var n = e.stateNode;
  n.pendingContext ? di(e, n.pendingContext, n.pendingContext !== n.context) : n.context && di(e, n.context, !1), du(e, n.containerInfo);
}
function Li(e, n, t, r, l) {
  return nt(), uu(l), n.flags |= 256, oe(e, n, t, r), n.child;
}
var Po = { dehydrated: null, treeContext: null, retryLane: 0 };
function zo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ta(e, n, t) {
  var r = n.pendingProps, l = $.current, o = !1, u = (n.flags & 128) !== 0, i;
  if ((i = u) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, n.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), F($, l & 1), e === null)
    return So(n), e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (n.mode & 1 ? e.data === "$!" ? n.lanes = 8 : n.lanes = 1073741824 : n.lanes = 1, null) : (u = r.children, e = r.fallback, o ? (r = n.mode, o = n.child, u = { mode: "hidden", children: u }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = u) : o = fl(u, r, 0, null), e = _n(e, r, t, null), o.return = n, e.return = n, o.sibling = e, n.child = o, n.child.memoizedState = zo(t), n.memoizedState = Po, e) : Su(n, u));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return bf(e, n, u, r, i, l, t);
  if (o) {
    o = r.fallback, u = n.mode, l = e.child, i = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(u & 1) && n.child !== l ? (r = n.child, r.childLanes = 0, r.pendingProps = s, n.deletions = null) : (r = fn(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = fn(i, o) : (o = _n(o, u, t, null), o.flags |= 2), o.return = n, r.return = n, r.sibling = o, n.child = r, r = o, o = n.child, u = e.child.memoizedState, u = u === null ? zo(t) : { baseLanes: u.baseLanes | t, cachePool: null, transitions: u.transitions }, o.memoizedState = u, o.childLanes = e.childLanes & ~t, n.memoizedState = Po, r;
  }
  return o = e.child, e = o.sibling, r = fn(o, { mode: "visible", children: r.children }), !(n.mode & 1) && (r.lanes = t), r.return = n, r.sibling = null, e !== null && (t = n.deletions, t === null ? (n.deletions = [e], n.flags |= 16) : t.push(e)), n.child = r, n.memoizedState = null, r;
}
function Su(e, n) {
  return n = fl({ mode: "visible", children: n }, e.mode, 0, null), n.return = e, e.child = n;
}
function vr(e, n, t, r) {
  return r !== null && uu(r), tt(n, e.child, null, t), e = Su(n, n.pendingProps.children), e.flags |= 2, n.memoizedState = null, e;
}
function bf(e, n, t, r, l, o, u) {
  if (t)
    return n.flags & 256 ? (n.flags &= -257, r = Al(Error(y(422))), vr(e, n, u, r)) : n.memoizedState !== null ? (n.child = e.child, n.flags |= 128, null) : (o = r.fallback, l = n.mode, r = fl({ mode: "visible", children: r.children }, l, 0, null), o = _n(o, l, u, null), o.flags |= 2, r.return = n, o.return = n, r.sibling = o, n.child = r, n.mode & 1 && tt(n, e.child, null, u), n.child.memoizedState = zo(u), n.memoizedState = Po, o);
  if (!(n.mode & 1)) return vr(e, n, u, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(y(419)), r = Al(o, r, void 0), vr(e, n, u, r);
  }
  if (i = (u & e.childLanes) !== 0, fe || i) {
    if (r = J, r !== null) {
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
      l = l & (r.suspendedLanes | u) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ye(e, l), Oe(r, e, l, -1));
    }
    return Nu(), r = Al(Error(y(421))), vr(e, n, u, r);
  }
  return l.data === "$?" ? (n.flags |= 128, n.child = e.child, n = dd.bind(null, e), l._reactRetry = n, null) : (e = o.treeContext, he = un(l.nextSibling), ye = n, U = !0, Me = null, e !== null && (ke[Ee++] = Be, ke[Ee++] = We, ke[Ee++] = Pn, Be = e.id, We = e.overflow, Pn = n), n = Su(n, r.children), n.flags |= 4096, n);
}
function Ti(e, n, t) {
  e.lanes |= n;
  var r = e.alternate;
  r !== null && (r.lanes |= n), ko(e.return, n, t);
}
function Bl(e, n, t, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: r, tail: t, tailMode: l } : (o.isBackwards = n, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = t, o.tailMode = l);
}
function Ma(e, n, t) {
  var r = n.pendingProps, l = r.revealOrder, o = r.tail;
  if (oe(e, n, r.children, t), r = $.current, r & 2) r = r & 1 | 2, n.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = n.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ti(e, t, n);
      else if (e.tag === 19) Ti(e, t, n);
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
  if (F($, r), !(n.mode & 1)) n.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (t = n.child, l = null; t !== null; ) e = t.alternate, e !== null && Yr(e) === null && (l = t), t = t.sibling;
      t = l, t === null ? (l = n.child, n.child = null) : (l = t.sibling, t.sibling = null), Bl(n, !1, l, t, o);
      break;
    case "backwards":
      for (t = null, l = n.child, n.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Yr(e) === null) {
          n.child = l;
          break;
        }
        e = l.sibling, l.sibling = t, t = l, l = e;
      }
      Bl(n, !0, t, null, o);
      break;
    case "together":
      Bl(n, !1, null, null, void 0);
      break;
    default:
      n.memoizedState = null;
  }
  return n.child;
}
function Pr(e, n) {
  !(n.mode & 1) && e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2);
}
function Xe(e, n, t) {
  if (e !== null && (n.dependencies = e.dependencies), Ln |= n.lanes, !(t & n.childLanes)) return null;
  if (e !== null && n.child !== e.child) throw Error(y(153));
  if (n.child !== null) {
    for (e = n.child, t = fn(e, e.pendingProps), n.child = t, t.return = n; e.sibling !== null; ) e = e.sibling, t = t.sibling = fn(e, e.pendingProps), t.return = n;
    t.sibling = null;
  }
  return n.child;
}
function ed(e, n, t) {
  switch (n.tag) {
    case 3:
      La(n), nt();
      break;
    case 5:
      ra(n);
      break;
    case 1:
      pe(n.type) && Ar(n);
      break;
    case 4:
      du(n, n.stateNode.containerInfo);
      break;
    case 10:
      var r = n.type._context, l = n.memoizedProps.value;
      F(Hr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = n.memoizedState, r !== null)
        return r.dehydrated !== null ? (F($, $.current & 1), n.flags |= 128, null) : t & n.child.childLanes ? Ta(e, n, t) : (F($, $.current & 1), e = Xe(e, n, t), e !== null ? e.sibling : null);
      F($, $.current & 1);
      break;
    case 19:
      if (r = (t & n.childLanes) !== 0, e.flags & 128) {
        if (r) return Ma(e, n, t);
        n.flags |= 128;
      }
      if (l = n.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), F($, $.current), r) break;
      return null;
    case 22:
    case 23:
      return n.lanes = 0, Pa(e, n, t);
  }
  return Xe(e, n, t);
}
var Ra, Lo, Oa, Da;
Ra = function(e, n) {
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
Lo = function() {
};
Oa = function(e, n, t, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = n.stateNode, xn($e.current);
    var o = null;
    switch (t) {
      case "input":
        l = Zl(e, l), r = Zl(e, r), o = [];
        break;
      case "select":
        l = A({}, l, { value: void 0 }), r = A({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = bl(e, l), r = bl(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = $r);
    }
    no(t, r);
    var u;
    t = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var i = l[c];
      for (u in i) i.hasOwnProperty(u) && (t || (t = {}), t[u] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Rt.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (i = l != null ? l[c] : void 0, r.hasOwnProperty(c) && s !== i && (s != null || i != null)) if (c === "style") if (i) {
        for (u in i) !i.hasOwnProperty(u) || s && s.hasOwnProperty(u) || (t || (t = {}), t[u] = "");
        for (u in s) s.hasOwnProperty(u) && i[u] !== s[u] && (t || (t = {}), t[u] = s[u]);
      } else t || (o || (o = []), o.push(
        c,
        t
      )), t = s;
      else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, i = i ? i.__html : void 0, s != null && i !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Rt.hasOwnProperty(c) ? (s != null && c === "onScroll" && I("scroll", e), o || i === s || (o = [])) : (o = o || []).push(c, s));
    }
    t && (o = o || []).push("style", t);
    var c = o;
    (n.updateQueue = c) && (n.flags |= 4);
  }
};
Da = function(e, n, t, r) {
  t !== r && (n.flags |= 4);
};
function yt(e, n) {
  if (!U) switch (e.tailMode) {
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
function te(e) {
  var n = e.alternate !== null && e.alternate.child === e.child, t = 0, r = 0;
  if (n) for (var l = e.child; l !== null; ) t |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) t |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = t, n;
}
function nd(e, n, t) {
  var r = n.pendingProps;
  switch (ou(n), n.tag) {
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
      return te(n), null;
    case 1:
      return pe(n.type) && Vr(), te(n), null;
    case 3:
      return r = n.stateNode, rt(), j(de), j(le), mu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pr(n) ? n.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, Me !== null && (jo(Me), Me = null))), Lo(e, n), te(n), null;
    case 5:
      pu(n);
      var l = xn(Ht.current);
      if (t = n.type, e !== null && n.stateNode != null) Oa(e, n, t, r, l), e.ref !== n.ref && (n.flags |= 512, n.flags |= 2097152);
      else {
        if (!r) {
          if (n.stateNode === null) throw Error(y(166));
          return te(n), null;
        }
        if (e = xn($e.current), pr(n)) {
          r = n.stateNode, t = n.type;
          var o = n.memoizedProps;
          switch (r[je] = n, r[Bt] = o, e = (n.mode & 1) !== 0, t) {
            case "dialog":
              I("cancel", r), I("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              I("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Et.length; l++) I(Et[l], r);
              break;
            case "source":
              I("error", r);
              break;
            case "img":
            case "image":
            case "link":
              I(
                "error",
                r
              ), I("load", r);
              break;
            case "details":
              I("toggle", r);
              break;
            case "input":
              $u(r, o), I("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, I("invalid", r);
              break;
            case "textarea":
              Au(r, o), I("invalid", r);
          }
          no(t, o), l = null;
          for (var u in o) if (o.hasOwnProperty(u)) {
            var i = o[u];
            u === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && dr(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && dr(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : Rt.hasOwnProperty(u) && i != null && u === "onScroll" && I("scroll", r);
          }
          switch (t) {
            case "input":
              lr(r), Vu(r, o, !0);
              break;
            case "textarea":
              lr(r), Bu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = $r);
          }
          r = l, n.updateQueue = r, r !== null && (n.flags |= 4);
        } else {
          u = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ss(t)), e === "http://www.w3.org/1999/xhtml" ? t === "script" ? (e = u.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = u.createElement(t, { is: r.is }) : (e = u.createElement(t), t === "select" && (u = e, r.multiple ? u.multiple = !0 : r.size && (u.size = r.size))) : e = u.createElementNS(e, t), e[je] = n, e[Bt] = r, Ra(e, n, !1, !1), n.stateNode = e;
          e: {
            switch (u = to(t, r), t) {
              case "dialog":
                I("cancel", e), I("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                I("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Et.length; l++) I(Et[l], e);
                l = r;
                break;
              case "source":
                I("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                I(
                  "error",
                  e
                ), I("load", e), l = r;
                break;
              case "details":
                I("toggle", e), l = r;
                break;
              case "input":
                $u(e, r), l = Zl(e, r), I("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = A({}, r, { value: void 0 }), I("invalid", e);
                break;
              case "textarea":
                Au(e, r), l = bl(e, r), I("invalid", e);
                break;
              default:
                l = r;
            }
            no(t, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var s = i[o];
              o === "style" ? fs(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && as(e, s)) : o === "children" ? typeof s == "string" ? (t !== "textarea" || s !== "") && Ot(e, s) : typeof s == "number" && Ot(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Rt.hasOwnProperty(o) ? s != null && o === "onScroll" && I("scroll", e) : s != null && Ho(e, o, s, u));
            }
            switch (t) {
              case "input":
                lr(e), Vu(e, r, !1);
                break;
              case "textarea":
                lr(e), Bu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + dn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Yn(e, !!r.multiple, o, !1) : r.defaultValue != null && Yn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = $r);
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
      return te(n), null;
    case 6:
      if (e && n.stateNode != null) Da(e, n, e.memoizedProps, r);
      else {
        if (typeof r != "string" && n.stateNode === null) throw Error(y(166));
        if (t = xn(Ht.current), xn($e.current), pr(n)) {
          if (r = n.stateNode, t = n.memoizedProps, r[je] = n, (o = r.nodeValue !== t) && (e = ye, e !== null)) switch (e.tag) {
            case 3:
              dr(r.nodeValue, t, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && dr(r.nodeValue, t, (e.mode & 1) !== 0);
          }
          o && (n.flags |= 4);
        } else r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[je] = n, n.stateNode = r;
      }
      return te(n), null;
    case 13:
      if (j($), r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (U && he !== null && n.mode & 1 && !(n.flags & 128)) qs(), nt(), n.flags |= 98560, o = !1;
        else if (o = pr(n), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(y(318));
            if (o = n.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(y(317));
            o[je] = n;
          } else nt(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
          te(n), o = !1;
        } else Me !== null && (jo(Me), Me = null), o = !0;
        if (!o) return n.flags & 65536 ? n : null;
      }
      return n.flags & 128 ? (n.lanes = t, n) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (n.child.flags |= 8192, n.mode & 1 && (e === null || $.current & 1 ? X === 0 && (X = 3) : Nu())), n.updateQueue !== null && (n.flags |= 4), te(n), null);
    case 4:
      return rt(), Lo(e, n), e === null && Vt(n.stateNode.containerInfo), te(n), null;
    case 10:
      return au(n.type._context), te(n), null;
    case 17:
      return pe(n.type) && Vr(), te(n), null;
    case 19:
      if (j($), o = n.memoizedState, o === null) return te(n), null;
      if (r = (n.flags & 128) !== 0, u = o.rendering, u === null) if (r) yt(o, !1);
      else {
        if (X !== 0 || e !== null && e.flags & 128) for (e = n.child; e !== null; ) {
          if (u = Yr(e), u !== null) {
            for (n.flags |= 128, yt(o, !1), r = u.updateQueue, r !== null && (n.updateQueue = r, n.flags |= 4), n.subtreeFlags = 0, r = t, t = n.child; t !== null; ) o = t, e = r, o.flags &= 14680066, u = o.alternate, u === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = u.childLanes, o.lanes = u.lanes, o.child = u.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = u.memoizedProps, o.memoizedState = u.memoizedState, o.updateQueue = u.updateQueue, o.type = u.type, e = u.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), t = t.sibling;
            return F($, $.current & 1 | 2), n.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Q() > ot && (n.flags |= 128, r = !0, yt(o, !1), n.lanes = 4194304);
      }
      else {
        if (!r) if (e = Yr(u), e !== null) {
          if (n.flags |= 128, r = !0, t = e.updateQueue, t !== null && (n.updateQueue = t, n.flags |= 4), yt(o, !0), o.tail === null && o.tailMode === "hidden" && !u.alternate && !U) return te(n), null;
        } else 2 * Q() - o.renderingStartTime > ot && t !== 1073741824 && (n.flags |= 128, r = !0, yt(o, !1), n.lanes = 4194304);
        o.isBackwards ? (u.sibling = n.child, n.child = u) : (t = o.last, t !== null ? t.sibling = u : n.child = u, o.last = u);
      }
      return o.tail !== null ? (n = o.tail, o.rendering = n, o.tail = n.sibling, o.renderingStartTime = Q(), n.sibling = null, t = $.current, F($, r ? t & 1 | 2 : t & 1), n) : (te(n), null);
    case 22:
    case 23:
      return _u(), r = n.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (n.flags |= 8192), r && n.mode & 1 ? ve & 1073741824 && (te(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : te(n), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(y(156, n.tag));
}
function td(e, n) {
  switch (ou(n), n.tag) {
    case 1:
      return pe(n.type) && Vr(), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 3:
      return rt(), j(de), j(le), mu(), e = n.flags, e & 65536 && !(e & 128) ? (n.flags = e & -65537 | 128, n) : null;
    case 5:
      return pu(n), null;
    case 13:
      if (j($), e = n.memoizedState, e !== null && e.dehydrated !== null) {
        if (n.alternate === null) throw Error(y(340));
        nt();
      }
      return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
    case 19:
      return j($), null;
    case 4:
      return rt(), null;
    case 10:
      return au(n.type._context), null;
    case 22:
    case 23:
      return _u(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var hr = !1, re = !1, rd = typeof WeakSet == "function" ? WeakSet : Set, E = null;
function Qn(e, n) {
  var t = e.ref;
  if (t !== null) if (typeof t == "function") try {
    t(null);
  } catch (r) {
    B(e, n, r);
  }
  else t.current = null;
}
function To(e, n, t) {
  try {
    t();
  } catch (r) {
    B(e, n, r);
  }
}
var Mi = !1;
function ld(e, n) {
  if (po = Ir, e = $s(), ru(e)) {
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
        var u = 0, i = -1, s = -1, c = 0, v = 0, m = e, p = null;
        n: for (; ; ) {
          for (var w; m !== t || l !== 0 && m.nodeType !== 3 || (i = u + l), m !== o || r !== 0 && m.nodeType !== 3 || (s = u + r), m.nodeType === 3 && (u += m.nodeValue.length), (w = m.firstChild) !== null; )
            p = m, m = w;
          for (; ; ) {
            if (m === e) break n;
            if (p === t && ++c === l && (i = u), p === o && ++v === r && (s = u), (w = m.nextSibling) !== null) break;
            m = p, p = m.parentNode;
          }
          m = w;
        }
        t = i === -1 || s === -1 ? null : { start: i, end: s };
      } else t = null;
    }
    t = t || { start: 0, end: 0 };
  } else t = null;
  for (mo = { focusedElem: e, selectionRange: t }, Ir = !1, E = n; E !== null; ) if (n = E, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null) e.return = n, E = e;
  else for (; E !== null; ) {
    n = E;
    try {
      var g = n.alternate;
      if (n.flags & 1024) switch (n.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (g !== null) {
            var S = g.memoizedProps, D = g.memoizedState, f = n.stateNode, a = f.getSnapshotBeforeUpdate(n.elementType === n.type ? S : Le(n.type, S), D);
            f.__reactInternalSnapshotBeforeUpdate = a;
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
          throw Error(y(163));
      }
    } catch (h) {
      B(n, n.return, h);
    }
    if (e = n.sibling, e !== null) {
      e.return = n.return, E = e;
      break;
    }
    E = n.return;
  }
  return g = Mi, Mi = !1, g;
}
function Lt(e, n, t) {
  var r = n.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && To(n, t, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function al(e, n) {
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
function Mo(e) {
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
function Fa(e) {
  var n = e.alternate;
  n !== null && (e.alternate = null, Fa(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && (delete n[je], delete n[Bt], delete n[yo], delete n[Vf], delete n[Af])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Ia(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ri(e) {
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
function Ro(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, n ? t.nodeType === 8 ? t.parentNode.insertBefore(e, n) : t.insertBefore(e, n) : (t.nodeType === 8 ? (n = t.parentNode, n.insertBefore(e, t)) : (n = t, n.appendChild(e)), t = t._reactRootContainer, t != null || n.onclick !== null || (n.onclick = $r));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ro(e, n, t), e = e.sibling; e !== null; ) Ro(e, n, t), e = e.sibling;
}
function Oo(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, n ? t.insertBefore(e, n) : t.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Oo(e, n, t), e = e.sibling; e !== null; ) Oo(e, n, t), e = e.sibling;
}
var q = null, Te = !1;
function Ze(e, n, t) {
  for (t = t.child; t !== null; ) ja(e, n, t), t = t.sibling;
}
function ja(e, n, t) {
  if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
    Ue.onCommitFiberUnmount(nl, t);
  } catch {
  }
  switch (t.tag) {
    case 5:
      re || Qn(t, n);
    case 6:
      var r = q, l = Te;
      q = null, Ze(e, n, t), q = r, Te = l, q !== null && (Te ? (e = q, t = t.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t)) : q.removeChild(t.stateNode));
      break;
    case 18:
      q !== null && (Te ? (e = q, t = t.stateNode, e.nodeType === 8 ? Fl(e.parentNode, t) : e.nodeType === 1 && Fl(e, t), jt(e)) : Fl(q, t.stateNode));
      break;
    case 4:
      r = q, l = Te, q = t.stateNode.containerInfo, Te = !0, Ze(e, n, t), q = r, Te = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!re && (r = t.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, u = o.destroy;
          o = o.tag, u !== void 0 && (o & 2 || o & 4) && To(t, n, u), l = l.next;
        } while (l !== r);
      }
      Ze(e, n, t);
      break;
    case 1:
      if (!re && (Qn(t, n), r = t.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = t.memoizedProps, r.state = t.memoizedState, r.componentWillUnmount();
      } catch (i) {
        B(t, n, i);
      }
      Ze(e, n, t);
      break;
    case 21:
      Ze(e, n, t);
      break;
    case 22:
      t.mode & 1 ? (re = (r = re) || t.memoizedState !== null, Ze(e, n, t), re = r) : Ze(e, n, t);
      break;
    default:
      Ze(e, n, t);
  }
}
function Oi(e) {
  var n = e.updateQueue;
  if (n !== null) {
    e.updateQueue = null;
    var t = e.stateNode;
    t === null && (t = e.stateNode = new rd()), n.forEach(function(r) {
      var l = pd.bind(null, e, r);
      t.has(r) || (t.add(r), r.then(l, l));
    });
  }
}
function ze(e, n) {
  var t = n.deletions;
  if (t !== null) for (var r = 0; r < t.length; r++) {
    var l = t[r];
    try {
      var o = e, u = n, i = u;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            q = i.stateNode, Te = !1;
            break e;
          case 3:
            q = i.stateNode.containerInfo, Te = !0;
            break e;
          case 4:
            q = i.stateNode.containerInfo, Te = !0;
            break e;
        }
        i = i.return;
      }
      if (q === null) throw Error(y(160));
      ja(o, u, l), q = null, Te = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (c) {
      B(l, n, c);
    }
  }
  if (n.subtreeFlags & 12854) for (n = n.child; n !== null; ) Ua(n, e), n = n.sibling;
}
function Ua(e, n) {
  var t = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ze(n, e), Fe(e), r & 4) {
        try {
          Lt(3, e, e.return), al(3, e);
        } catch (S) {
          B(e, e.return, S);
        }
        try {
          Lt(5, e, e.return);
        } catch (S) {
          B(e, e.return, S);
        }
      }
      break;
    case 1:
      ze(n, e), Fe(e), r & 512 && t !== null && Qn(t, t.return);
      break;
    case 5:
      if (ze(n, e), Fe(e), r & 512 && t !== null && Qn(t, t.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Ot(l, "");
        } catch (S) {
          B(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, u = t !== null ? t.memoizedProps : o, i = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          i === "input" && o.type === "radio" && o.name != null && us(l, o), to(i, u);
          var c = to(i, o);
          for (u = 0; u < s.length; u += 2) {
            var v = s[u], m = s[u + 1];
            v === "style" ? fs(l, m) : v === "dangerouslySetInnerHTML" ? as(l, m) : v === "children" ? Ot(l, m) : Ho(l, v, m, c);
          }
          switch (i) {
            case "input":
              Jl(l, o);
              break;
            case "textarea":
              is(l, o);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var w = o.value;
              w != null ? Yn(l, !!o.multiple, w, !1) : p !== !!o.multiple && (o.defaultValue != null ? Yn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Yn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Bt] = o;
        } catch (S) {
          B(e, e.return, S);
        }
      }
      break;
    case 6:
      if (ze(n, e), Fe(e), r & 4) {
        if (e.stateNode === null) throw Error(y(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (S) {
          B(e, e.return, S);
        }
      }
      break;
    case 3:
      if (ze(n, e), Fe(e), r & 4 && t !== null && t.memoizedState.isDehydrated) try {
        jt(n.containerInfo);
      } catch (S) {
        B(e, e.return, S);
      }
      break;
    case 4:
      ze(n, e), Fe(e);
      break;
    case 13:
      ze(n, e), Fe(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (xu = Q())), r & 4 && Oi(e);
      break;
    case 22:
      if (v = t !== null && t.memoizedState !== null, e.mode & 1 ? (re = (c = re) || v, ze(n, e), re = c) : ze(n, e), Fe(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !v && e.mode & 1) for (E = e, v = e.child; v !== null; ) {
          for (m = E = v; E !== null; ) {
            switch (p = E, w = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Lt(4, p, p.return);
                break;
              case 1:
                Qn(p, p.return);
                var g = p.stateNode;
                if (typeof g.componentWillUnmount == "function") {
                  r = p, t = p.return;
                  try {
                    n = r, g.props = n.memoizedProps, g.state = n.memoizedState, g.componentWillUnmount();
                  } catch (S) {
                    B(r, t, S);
                  }
                }
                break;
              case 5:
                Qn(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  Fi(m);
                  continue;
                }
            }
            w !== null ? (w.return = p, E = w) : Fi(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = m.stateNode, s = m.memoizedProps.style, u = s != null && s.hasOwnProperty("display") ? s.display : null, i.style.display = cs("display", u));
              } catch (S) {
                B(e, e.return, S);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = c ? "" : m.memoizedProps;
            } catch (S) {
              B(e, e.return, S);
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
      ze(n, e), Fe(e), r & 4 && Oi(e);
      break;
    case 21:
      break;
    default:
      ze(
        n,
        e
      ), Fe(e);
  }
}
function Fe(e) {
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
        throw Error(y(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Ot(l, ""), r.flags &= -33);
          var o = Ri(e);
          Oo(e, o, l);
          break;
        case 3:
        case 4:
          var u = r.stateNode.containerInfo, i = Ri(e);
          Ro(e, i, u);
          break;
        default:
          throw Error(y(161));
      }
    } catch (s) {
      B(e, e.return, s);
    }
    e.flags &= -3;
  }
  n & 4096 && (e.flags &= -4097);
}
function od(e, n, t) {
  E = e, $a(e);
}
function $a(e, n, t) {
  for (var r = (e.mode & 1) !== 0; E !== null; ) {
    var l = E, o = l.child;
    if (l.tag === 22 && r) {
      var u = l.memoizedState !== null || hr;
      if (!u) {
        var i = l.alternate, s = i !== null && i.memoizedState !== null || re;
        i = hr;
        var c = re;
        if (hr = u, (re = s) && !c) for (E = l; E !== null; ) u = E, s = u.child, u.tag === 22 && u.memoizedState !== null ? Ii(l) : s !== null ? (s.return = u, E = s) : Ii(l);
        for (; o !== null; ) E = o, $a(o), o = o.sibling;
        E = l, hr = i, re = c;
      }
      Di(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, E = o) : Di(e);
  }
}
function Di(e) {
  for (; E !== null; ) {
    var n = E;
    if (n.flags & 8772) {
      var t = n.alternate;
      try {
        if (n.flags & 8772) switch (n.tag) {
          case 0:
          case 11:
          case 15:
            re || al(5, n);
            break;
          case 1:
            var r = n.stateNode;
            if (n.flags & 4 && !re) if (t === null) r.componentDidMount();
            else {
              var l = n.elementType === n.type ? t.memoizedProps : Le(n.type, t.memoizedProps);
              r.componentDidUpdate(l, t.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = n.updateQueue;
            o !== null && gi(n, o, r);
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
              gi(n, u, t);
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
              var c = n.alternate;
              if (c !== null) {
                var v = c.memoizedState;
                if (v !== null) {
                  var m = v.dehydrated;
                  m !== null && jt(m);
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
            throw Error(y(163));
        }
        re || n.flags & 512 && Mo(n);
      } catch (p) {
        B(n, n.return, p);
      }
    }
    if (n === e) {
      E = null;
      break;
    }
    if (t = n.sibling, t !== null) {
      t.return = n.return, E = t;
      break;
    }
    E = n.return;
  }
}
function Fi(e) {
  for (; E !== null; ) {
    var n = E;
    if (n === e) {
      E = null;
      break;
    }
    var t = n.sibling;
    if (t !== null) {
      t.return = n.return, E = t;
      break;
    }
    E = n.return;
  }
}
function Ii(e) {
  for (; E !== null; ) {
    var n = E;
    try {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          var t = n.return;
          try {
            al(4, n);
          } catch (s) {
            B(n, t, s);
          }
          break;
        case 1:
          var r = n.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = n.return;
            try {
              r.componentDidMount();
            } catch (s) {
              B(n, l, s);
            }
          }
          var o = n.return;
          try {
            Mo(n);
          } catch (s) {
            B(n, o, s);
          }
          break;
        case 5:
          var u = n.return;
          try {
            Mo(n);
          } catch (s) {
            B(n, u, s);
          }
      }
    } catch (s) {
      B(n, n.return, s);
    }
    if (n === e) {
      E = null;
      break;
    }
    var i = n.sibling;
    if (i !== null) {
      i.return = n.return, E = i;
      break;
    }
    E = n.return;
  }
}
var ud = Math.ceil, Zr = Ge.ReactCurrentDispatcher, ku = Ge.ReactCurrentOwner, Ce = Ge.ReactCurrentBatchConfig, R = 0, J = null, K = null, b = 0, ve = 0, Kn = vn(0), X = 0, Xt = null, Ln = 0, cl = 0, Eu = 0, Tt = null, ce = null, xu = 0, ot = 1 / 0, Ve = null, Jr = !1, Do = null, an = null, yr = !1, tn = null, qr = 0, Mt = 0, Fo = null, zr = -1, Lr = 0;
function ie() {
  return R & 6 ? Q() : zr !== -1 ? zr : zr = Q();
}
function cn(e) {
  return e.mode & 1 ? R & 2 && b !== 0 ? b & -b : Wf.transition !== null ? (Lr === 0 && (Lr = xs()), Lr) : (e = O, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ts(e.type)), e) : 1;
}
function Oe(e, n, t, r) {
  if (50 < Mt) throw Mt = 0, Fo = null, Error(y(185));
  Zt(e, t, r), (!(R & 2) || e !== J) && (e === J && (!(R & 2) && (cl |= t), X === 4 && en(e, b)), me(e, r), t === 1 && R === 0 && !(n.mode & 1) && (ot = Q() + 500, ul && hn()));
}
function me(e, n) {
  var t = e.callbackNode;
  Bc(e, n);
  var r = Fr(e, e === J ? b : 0);
  if (r === 0) t !== null && Qu(t), e.callbackNode = null, e.callbackPriority = 0;
  else if (n = r & -r, e.callbackPriority !== n) {
    if (t != null && Qu(t), n === 1) e.tag === 0 ? Bf(ji.bind(null, e)) : Gs(ji.bind(null, e)), Uf(function() {
      !(R & 6) && hn();
    }), t = null;
    else {
      switch (Cs(r)) {
        case 1:
          t = Go;
          break;
        case 4:
          t = ks;
          break;
        case 16:
          t = Dr;
          break;
        case 536870912:
          t = Es;
          break;
        default:
          t = Dr;
      }
      t = Ya(t, Va.bind(null, e));
    }
    e.callbackPriority = n, e.callbackNode = t;
  }
}
function Va(e, n) {
  if (zr = -1, Lr = 0, R & 6) throw Error(y(327));
  var t = e.callbackNode;
  if (qn() && e.callbackNode !== t) return null;
  var r = Fr(e, e === J ? b : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || n) n = br(e, r);
  else {
    n = r;
    var l = R;
    R |= 2;
    var o = Ba();
    (J !== e || b !== n) && (Ve = null, ot = Q() + 500, Cn(e, n));
    do
      try {
        ad();
        break;
      } catch (i) {
        Aa(e, i);
      }
    while (!0);
    su(), Zr.current = o, R = l, K !== null ? n = 0 : (J = null, b = 0, n = X);
  }
  if (n !== 0) {
    if (n === 2 && (l = io(e), l !== 0 && (r = l, n = Io(e, l))), n === 1) throw t = Xt, Cn(e, 0), en(e, r), me(e, Q()), t;
    if (n === 6) en(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !id(l) && (n = br(e, r), n === 2 && (o = io(e), o !== 0 && (r = o, n = Io(e, o))), n === 1)) throw t = Xt, Cn(e, 0), en(e, r), me(e, Q()), t;
      switch (e.finishedWork = l, e.finishedLanes = r, n) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          Sn(e, ce, Ve);
          break;
        case 3:
          if (en(e, r), (r & 130023424) === r && (n = xu + 500 - Q(), 10 < n)) {
            if (Fr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ie(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = ho(Sn.bind(null, e, ce, Ve), n);
            break;
          }
          Sn(e, ce, Ve);
          break;
        case 4:
          if (en(e, r), (r & 4194240) === r) break;
          for (n = e.eventTimes, l = -1; 0 < r; ) {
            var u = 31 - Re(r);
            o = 1 << u, u = n[u], u > l && (l = u), r &= ~o;
          }
          if (r = l, r = Q() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ud(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = ho(Sn.bind(null, e, ce, Ve), r);
            break;
          }
          Sn(e, ce, Ve);
          break;
        case 5:
          Sn(e, ce, Ve);
          break;
        default:
          throw Error(y(329));
      }
    }
  }
  return me(e, Q()), e.callbackNode === t ? Va.bind(null, e) : null;
}
function Io(e, n) {
  var t = Tt;
  return e.current.memoizedState.isDehydrated && (Cn(e, n).flags |= 256), e = br(e, n), e !== 2 && (n = ce, ce = t, n !== null && jo(n)), e;
}
function jo(e) {
  ce === null ? ce = e : ce.push.apply(ce, e);
}
function id(e) {
  for (var n = e; ; ) {
    if (n.flags & 16384) {
      var t = n.updateQueue;
      if (t !== null && (t = t.stores, t !== null)) for (var r = 0; r < t.length; r++) {
        var l = t[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!De(o(), l)) return !1;
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
function en(e, n) {
  for (n &= ~Eu, n &= ~cl, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n; ) {
    var t = 31 - Re(n), r = 1 << t;
    e[t] = -1, n &= ~r;
  }
}
function ji(e) {
  if (R & 6) throw Error(y(327));
  qn();
  var n = Fr(e, 0);
  if (!(n & 1)) return me(e, Q()), null;
  var t = br(e, n);
  if (e.tag !== 0 && t === 2) {
    var r = io(e);
    r !== 0 && (n = r, t = Io(e, r));
  }
  if (t === 1) throw t = Xt, Cn(e, 0), en(e, n), me(e, Q()), t;
  if (t === 6) throw Error(y(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = n, Sn(e, ce, Ve), me(e, Q()), null;
}
function Cu(e, n) {
  var t = R;
  R |= 1;
  try {
    return e(n);
  } finally {
    R = t, R === 0 && (ot = Q() + 500, ul && hn());
  }
}
function Tn(e) {
  tn !== null && tn.tag === 0 && !(R & 6) && qn();
  var n = R;
  R |= 1;
  var t = Ce.transition, r = O;
  try {
    if (Ce.transition = null, O = 1, e) return e();
  } finally {
    O = r, Ce.transition = t, R = n, !(R & 6) && hn();
  }
}
function _u() {
  ve = Kn.current, j(Kn);
}
function Cn(e, n) {
  e.finishedWork = null, e.finishedLanes = 0;
  var t = e.timeoutHandle;
  if (t !== -1 && (e.timeoutHandle = -1, jf(t)), K !== null) for (t = K.return; t !== null; ) {
    var r = t;
    switch (ou(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Vr();
        break;
      case 3:
        rt(), j(de), j(le), mu();
        break;
      case 5:
        pu(r);
        break;
      case 4:
        rt();
        break;
      case 13:
        j($);
        break;
      case 19:
        j($);
        break;
      case 10:
        au(r.type._context);
        break;
      case 22:
      case 23:
        _u();
    }
    t = t.return;
  }
  if (J = e, K = e = fn(e.current, null), b = ve = n, X = 0, Xt = null, Eu = cl = Ln = 0, ce = Tt = null, En !== null) {
    for (n = 0; n < En.length; n++) if (t = En[n], r = t.interleaved, r !== null) {
      t.interleaved = null;
      var l = r.next, o = t.pending;
      if (o !== null) {
        var u = o.next;
        o.next = l, r.next = u;
      }
      t.pending = r;
    }
    En = null;
  }
  return e;
}
function Aa(e, n) {
  do {
    var t = K;
    try {
      if (su(), _r.current = Gr, Xr) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Xr = !1;
      }
      if (zn = 0, Z = Y = V = null, zt = !1, Qt = 0, ku.current = null, t === null || t.return === null) {
        X = 1, Xt = n, K = null;
        break;
      }
      e: {
        var o = e, u = t.return, i = t, s = n;
        if (n = b, i.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var c = s, v = i, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var p = v.alternate;
            p ? (v.updateQueue = p.updateQueue, v.memoizedState = p.memoizedState, v.lanes = p.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var w = Ci(u);
          if (w !== null) {
            w.flags &= -257, _i(w, u, i, o, n), w.mode & 1 && xi(o, c, n), n = w, s = c;
            var g = n.updateQueue;
            if (g === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(s), n.updateQueue = S;
            } else g.add(s);
            break e;
          } else {
            if (!(n & 1)) {
              xi(o, c, n), Nu();
              break e;
            }
            s = Error(y(426));
          }
        } else if (U && i.mode & 1) {
          var D = Ci(u);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), _i(D, u, i, o, n), uu(lt(s, i));
            break e;
          }
        }
        o = s = lt(s, i), X !== 4 && (X = 2), Tt === null ? Tt = [o] : Tt.push(o), o = u;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, n &= -n, o.lanes |= n;
              var f = Ca(o, s, n);
              yi(o, f);
              break e;
            case 1:
              i = s;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (an === null || !an.has(d)))) {
                o.flags |= 65536, n &= -n, o.lanes |= n;
                var h = _a(o, i, n);
                yi(o, h);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Ha(t);
    } catch (k) {
      n = k, K === t && t !== null && (K = t = t.return);
      continue;
    }
    break;
  } while (!0);
}
function Ba() {
  var e = Zr.current;
  return Zr.current = Gr, e === null ? Gr : e;
}
function Nu() {
  (X === 0 || X === 3 || X === 2) && (X = 4), J === null || !(Ln & 268435455) && !(cl & 268435455) || en(J, b);
}
function br(e, n) {
  var t = R;
  R |= 2;
  var r = Ba();
  (J !== e || b !== n) && (Ve = null, Cn(e, n));
  do
    try {
      sd();
      break;
    } catch (l) {
      Aa(e, l);
    }
  while (!0);
  if (su(), R = t, Zr.current = r, K !== null) throw Error(y(261));
  return J = null, b = 0, X;
}
function sd() {
  for (; K !== null; ) Wa(K);
}
function ad() {
  for (; K !== null && !Oc(); ) Wa(K);
}
function Wa(e) {
  var n = Ka(e.alternate, e, ve);
  e.memoizedProps = e.pendingProps, n === null ? Ha(e) : K = n, ku.current = null;
}
function Ha(e) {
  var n = e;
  do {
    var t = n.alternate;
    if (e = n.return, n.flags & 32768) {
      if (t = td(t, n), t !== null) {
        t.flags &= 32767, K = t;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        X = 6, K = null;
        return;
      }
    } else if (t = nd(t, n, ve), t !== null) {
      K = t;
      return;
    }
    if (n = n.sibling, n !== null) {
      K = n;
      return;
    }
    K = n = e;
  } while (n !== null);
  X === 0 && (X = 5);
}
function Sn(e, n, t) {
  var r = O, l = Ce.transition;
  try {
    Ce.transition = null, O = 1, cd(e, n, t, r);
  } finally {
    Ce.transition = l, O = r;
  }
  return null;
}
function cd(e, n, t, r) {
  do
    qn();
  while (tn !== null);
  if (R & 6) throw Error(y(327));
  t = e.finishedWork;
  var l = e.finishedLanes;
  if (t === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, t === e.current) throw Error(y(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = t.lanes | t.childLanes;
  if (Wc(e, o), e === J && (K = J = null, b = 0), !(t.subtreeFlags & 2064) && !(t.flags & 2064) || yr || (yr = !0, Ya(Dr, function() {
    return qn(), null;
  })), o = (t.flags & 15990) !== 0, t.subtreeFlags & 15990 || o) {
    o = Ce.transition, Ce.transition = null;
    var u = O;
    O = 1;
    var i = R;
    R |= 4, ku.current = null, ld(e, t), Ua(t, e), Tf(mo), Ir = !!po, mo = po = null, e.current = t, od(t), Dc(), R = i, O = u, Ce.transition = o;
  } else e.current = t;
  if (yr && (yr = !1, tn = e, qr = l), o = e.pendingLanes, o === 0 && (an = null), jc(t.stateNode), me(e, Q()), n !== null) for (r = e.onRecoverableError, t = 0; t < n.length; t++) l = n[t], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Jr) throw Jr = !1, e = Do, Do = null, e;
  return qr & 1 && e.tag !== 0 && qn(), o = e.pendingLanes, o & 1 ? e === Fo ? Mt++ : (Mt = 0, Fo = e) : Mt = 0, hn(), null;
}
function qn() {
  if (tn !== null) {
    var e = Cs(qr), n = Ce.transition, t = O;
    try {
      if (Ce.transition = null, O = 16 > e ? 16 : e, tn === null) var r = !1;
      else {
        if (e = tn, tn = null, qr = 0, R & 6) throw Error(y(331));
        var l = R;
        for (R |= 4, E = e.current; E !== null; ) {
          var o = E, u = o.child;
          if (E.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var s = 0; s < i.length; s++) {
                var c = i[s];
                for (E = c; E !== null; ) {
                  var v = E;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Lt(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, E = m;
                  else for (; E !== null; ) {
                    v = E;
                    var p = v.sibling, w = v.return;
                    if (Fa(v), v === c) {
                      E = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = w, E = p;
                      break;
                    }
                    E = w;
                  }
                }
              }
              var g = o.alternate;
              if (g !== null) {
                var S = g.child;
                if (S !== null) {
                  g.child = null;
                  do {
                    var D = S.sibling;
                    S.sibling = null, S = D;
                  } while (S !== null);
                }
              }
              E = o;
            }
          }
          if (o.subtreeFlags & 2064 && u !== null) u.return = o, E = u;
          else e: for (; E !== null; ) {
            if (o = E, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Lt(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, E = f;
              break e;
            }
            E = o.return;
          }
        }
        var a = e.current;
        for (E = a; E !== null; ) {
          u = E;
          var d = u.child;
          if (u.subtreeFlags & 2064 && d !== null) d.return = u, E = d;
          else e: for (u = a; E !== null; ) {
            if (i = E, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  al(9, i);
              }
            } catch (k) {
              B(i, i.return, k);
            }
            if (i === u) {
              E = null;
              break e;
            }
            var h = i.sibling;
            if (h !== null) {
              h.return = i.return, E = h;
              break e;
            }
            E = i.return;
          }
        }
        if (R = l, hn(), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
          Ue.onPostCommitFiberRoot(nl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      O = t, Ce.transition = n;
    }
  }
  return !1;
}
function Ui(e, n, t) {
  n = lt(t, n), n = Ca(e, n, 1), e = sn(e, n, 1), n = ie(), e !== null && (Zt(e, 1, n), me(e, n));
}
function B(e, n, t) {
  if (e.tag === 3) Ui(e, e, t);
  else for (; n !== null; ) {
    if (n.tag === 3) {
      Ui(n, e, t);
      break;
    } else if (n.tag === 1) {
      var r = n.stateNode;
      if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (an === null || !an.has(r))) {
        e = lt(t, e), e = _a(n, e, 1), n = sn(n, e, 1), e = ie(), n !== null && (Zt(n, 1, e), me(n, e));
        break;
      }
    }
    n = n.return;
  }
}
function fd(e, n, t) {
  var r = e.pingCache;
  r !== null && r.delete(n), n = ie(), e.pingedLanes |= e.suspendedLanes & t, J === e && (b & t) === t && (X === 4 || X === 3 && (b & 130023424) === b && 500 > Q() - xu ? Cn(e, 0) : Eu |= t), me(e, n);
}
function Qa(e, n) {
  n === 0 && (e.mode & 1 ? (n = ir, ir <<= 1, !(ir & 130023424) && (ir = 4194304)) : n = 1);
  var t = ie();
  e = Ye(e, n), e !== null && (Zt(e, n, t), me(e, t));
}
function dd(e) {
  var n = e.memoizedState, t = 0;
  n !== null && (t = n.retryLane), Qa(e, t);
}
function pd(e, n) {
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
      throw Error(y(314));
  }
  r !== null && r.delete(n), Qa(e, t);
}
var Ka;
Ka = function(e, n, t) {
  if (e !== null) if (e.memoizedProps !== n.pendingProps || de.current) fe = !0;
  else {
    if (!(e.lanes & t) && !(n.flags & 128)) return fe = !1, ed(e, n, t);
    fe = !!(e.flags & 131072);
  }
  else fe = !1, U && n.flags & 1048576 && Zs(n, Wr, n.index);
  switch (n.lanes = 0, n.tag) {
    case 2:
      var r = n.type;
      Pr(e, n), e = n.pendingProps;
      var l = et(n, le.current);
      Jn(n, t), l = hu(null, n, r, e, l, t);
      var o = yu();
      return n.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (n.tag = 1, n.memoizedState = null, n.updateQueue = null, pe(r) ? (o = !0, Ar(n)) : o = !1, n.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, fu(n), l.updater = sl, n.stateNode = l, l._reactInternals = n, xo(n, r, e, t), n = No(null, n, r, !0, o, t)) : (n.tag = 0, U && o && lu(n), oe(null, n, l, t), n = n.child), n;
    case 16:
      r = n.elementType;
      e: {
        switch (Pr(e, n), e = n.pendingProps, l = r._init, r = l(r._payload), n.type = r, l = n.tag = vd(r), e = Le(r, e), l) {
          case 0:
            n = _o(null, n, r, e, t);
            break e;
          case 1:
            n = zi(null, n, r, e, t);
            break e;
          case 11:
            n = Ni(null, n, r, e, t);
            break e;
          case 14:
            n = Pi(null, n, r, Le(r.type, e), t);
            break e;
        }
        throw Error(y(
          306,
          r,
          ""
        ));
      }
      return n;
    case 0:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Le(r, l), _o(e, n, r, l, t);
    case 1:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Le(r, l), zi(e, n, r, l, t);
    case 3:
      e: {
        if (La(n), e === null) throw Error(y(387));
        r = n.pendingProps, o = n.memoizedState, l = o.element, ta(e, n), Kr(n, r, null, t);
        var u = n.memoizedState;
        if (r = u.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: u.cache, pendingSuspenseBoundaries: u.pendingSuspenseBoundaries, transitions: u.transitions }, n.updateQueue.baseState = o, n.memoizedState = o, n.flags & 256) {
          l = lt(Error(y(423)), n), n = Li(e, n, r, t, l);
          break e;
        } else if (r !== l) {
          l = lt(Error(y(424)), n), n = Li(e, n, r, t, l);
          break e;
        } else for (he = un(n.stateNode.containerInfo.firstChild), ye = n, U = !0, Me = null, t = ea(n, null, r, t), n.child = t; t; ) t.flags = t.flags & -3 | 4096, t = t.sibling;
        else {
          if (nt(), r === l) {
            n = Xe(e, n, t);
            break e;
          }
          oe(e, n, r, t);
        }
        n = n.child;
      }
      return n;
    case 5:
      return ra(n), e === null && So(n), r = n.type, l = n.pendingProps, o = e !== null ? e.memoizedProps : null, u = l.children, vo(r, l) ? u = null : o !== null && vo(r, o) && (n.flags |= 32), za(e, n), oe(e, n, u, t), n.child;
    case 6:
      return e === null && So(n), null;
    case 13:
      return Ta(e, n, t);
    case 4:
      return du(n, n.stateNode.containerInfo), r = n.pendingProps, e === null ? n.child = tt(n, null, r, t) : oe(e, n, r, t), n.child;
    case 11:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Le(r, l), Ni(e, n, r, l, t);
    case 7:
      return oe(e, n, n.pendingProps, t), n.child;
    case 8:
      return oe(e, n, n.pendingProps.children, t), n.child;
    case 12:
      return oe(e, n, n.pendingProps.children, t), n.child;
    case 10:
      e: {
        if (r = n.type._context, l = n.pendingProps, o = n.memoizedProps, u = l.value, F(Hr, r._currentValue), r._currentValue = u, o !== null) if (De(o.value, u)) {
          if (o.children === l.children && !de.current) {
            n = Xe(e, n, t);
            break e;
          }
        } else for (o = n.child, o !== null && (o.return = n); o !== null; ) {
          var i = o.dependencies;
          if (i !== null) {
            u = o.child;
            for (var s = i.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = He(-1, t & -t), s.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var v = c.pending;
                    v === null ? s.next = s : (s.next = v.next, v.next = s), c.pending = s;
                  }
                }
                o.lanes |= t, s = o.alternate, s !== null && (s.lanes |= t), ko(
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
            if (u = o.return, u === null) throw Error(y(341));
            u.lanes |= t, i = u.alternate, i !== null && (i.lanes |= t), ko(u, t, n), u = o.sibling;
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
        oe(e, n, l.children, t), n = n.child;
      }
      return n;
    case 9:
      return l = n.type, r = n.pendingProps.children, Jn(n, t), l = _e(l), r = r(l), n.flags |= 1, oe(e, n, r, t), n.child;
    case 14:
      return r = n.type, l = Le(r, n.pendingProps), l = Le(r.type, l), Pi(e, n, r, l, t);
    case 15:
      return Na(e, n, n.type, n.pendingProps, t);
    case 17:
      return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : Le(r, l), Pr(e, n), n.tag = 1, pe(r) ? (e = !0, Ar(n)) : e = !1, Jn(n, t), xa(n, r, l), xo(n, r, l, t), No(null, n, r, !0, e, t);
    case 19:
      return Ma(e, n, t);
    case 22:
      return Pa(e, n, t);
  }
  throw Error(y(156, n.tag));
};
function Ya(e, n) {
  return Ss(e, n);
}
function md(e, n, t, r) {
  this.tag = e, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function xe(e, n, t, r) {
  return new md(e, n, t, r);
}
function Pu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function vd(e) {
  if (typeof e == "function") return Pu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Ko) return 11;
    if (e === Yo) return 14;
  }
  return 2;
}
function fn(e, n) {
  var t = e.alternate;
  return t === null ? (t = xe(e.tag, n, e.key, e.mode), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = n, t.type = e.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = e.flags & 14680064, t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, n = e.dependencies, t.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t;
}
function Tr(e, n, t, r, l, o) {
  var u = 2;
  if (r = e, typeof e == "function") Pu(e) && (u = 1);
  else if (typeof e == "string") u = 5;
  else e: switch (e) {
    case In:
      return _n(t.children, l, o, n);
    case Qo:
      u = 8, l |= 8;
      break;
    case Kl:
      return e = xe(12, t, n, l | 2), e.elementType = Kl, e.lanes = o, e;
    case Yl:
      return e = xe(13, t, n, l), e.elementType = Yl, e.lanes = o, e;
    case Xl:
      return e = xe(19, t, n, l), e.elementType = Xl, e.lanes = o, e;
    case rs:
      return fl(t, l, o, n);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ns:
          u = 10;
          break e;
        case ts:
          u = 9;
          break e;
        case Ko:
          u = 11;
          break e;
        case Yo:
          u = 14;
          break e;
        case Je:
          u = 16, r = null;
          break e;
      }
      throw Error(y(130, e == null ? e : typeof e, ""));
  }
  return n = xe(u, t, n, l), n.elementType = e, n.type = r, n.lanes = o, n;
}
function _n(e, n, t, r) {
  return e = xe(7, e, r, n), e.lanes = t, e;
}
function fl(e, n, t, r) {
  return e = xe(22, e, r, n), e.elementType = rs, e.lanes = t, e.stateNode = { isHidden: !1 }, e;
}
function Wl(e, n, t) {
  return e = xe(6, e, null, n), e.lanes = t, e;
}
function Hl(e, n, t) {
  return n = xe(4, e.children !== null ? e.children : [], e.key, n), n.lanes = t, n.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, n;
}
function hd(e, n, t, r, l) {
  this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Cl(0), this.expirationTimes = Cl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Cl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function zu(e, n, t, r, l, o, u, i, s) {
  return e = new hd(e, n, t, i, s), n === 1 ? (n = 1, o === !0 && (n |= 8)) : n = 0, o = xe(3, null, null, n), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: t, cache: null, transitions: null, pendingSuspenseBoundaries: null }, fu(o), e;
}
function yd(e, n, t) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Fn, key: r == null ? null : "" + r, children: e, containerInfo: n, implementation: t };
}
function Xa(e) {
  if (!e) return pn;
  e = e._reactInternals;
  e: {
    if (Rn(e) !== e || e.tag !== 1) throw Error(y(170));
    var n = e;
    do {
      switch (n.tag) {
        case 3:
          n = n.stateNode.context;
          break e;
        case 1:
          if (pe(n.type)) {
            n = n.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      n = n.return;
    } while (n !== null);
    throw Error(y(171));
  }
  if (e.tag === 1) {
    var t = e.type;
    if (pe(t)) return Xs(e, t, n);
  }
  return n;
}
function Ga(e, n, t, r, l, o, u, i, s) {
  return e = zu(t, r, !0, e, l, o, u, i, s), e.context = Xa(null), t = e.current, r = ie(), l = cn(t), o = He(r, l), o.callback = n ?? null, sn(t, o, l), e.current.lanes = l, Zt(e, l, r), me(e, r), e;
}
function dl(e, n, t, r) {
  var l = n.current, o = ie(), u = cn(l);
  return t = Xa(t), n.context === null ? n.context = t : n.pendingContext = t, n = He(o, u), n.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (n.callback = r), e = sn(l, n, u), e !== null && (Oe(e, l, u, o), Cr(e, l, u)), u;
}
function el(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function $i(e, n) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var t = e.retryLane;
    e.retryLane = t !== 0 && t < n ? t : n;
  }
}
function Lu(e, n) {
  $i(e, n), (e = e.alternate) && $i(e, n);
}
function gd() {
  return null;
}
var Za = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Tu(e) {
  this._internalRoot = e;
}
pl.prototype.render = Tu.prototype.render = function(e) {
  var n = this._internalRoot;
  if (n === null) throw Error(y(409));
  dl(e, n, null, null);
};
pl.prototype.unmount = Tu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var n = e.containerInfo;
    Tn(function() {
      dl(null, e, null, null);
    }), n[Ke] = null;
  }
};
function pl(e) {
  this._internalRoot = e;
}
pl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var n = Ps();
    e = { blockedOn: null, target: e, priority: n };
    for (var t = 0; t < be.length && n !== 0 && n < be[t].priority; t++) ;
    be.splice(t, 0, e), t === 0 && Ls(e);
  }
};
function Mu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function ml(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Vi() {
}
function wd(e, n, t, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = el(u);
        o.call(c);
      };
    }
    var u = Ga(n, r, e, 0, null, !1, !1, "", Vi);
    return e._reactRootContainer = u, e[Ke] = u.current, Vt(e.nodeType === 8 ? e.parentNode : e), Tn(), u;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var c = el(s);
      i.call(c);
    };
  }
  var s = zu(e, 0, !1, null, null, !1, !1, "", Vi);
  return e._reactRootContainer = s, e[Ke] = s.current, Vt(e.nodeType === 8 ? e.parentNode : e), Tn(function() {
    dl(n, s, t, r);
  }), s;
}
function vl(e, n, t, r, l) {
  var o = t._reactRootContainer;
  if (o) {
    var u = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var s = el(u);
        i.call(s);
      };
    }
    dl(n, u, e, l);
  } else u = wd(t, n, e, l, r);
  return el(u);
}
_s = function(e) {
  switch (e.tag) {
    case 3:
      var n = e.stateNode;
      if (n.current.memoizedState.isDehydrated) {
        var t = kt(n.pendingLanes);
        t !== 0 && (Zo(n, t | 1), me(n, Q()), !(R & 6) && (ot = Q() + 500, hn()));
      }
      break;
    case 13:
      Tn(function() {
        var r = Ye(e, 1);
        if (r !== null) {
          var l = ie();
          Oe(r, e, 1, l);
        }
      }), Lu(e, 1);
  }
};
Jo = function(e) {
  if (e.tag === 13) {
    var n = Ye(e, 134217728);
    if (n !== null) {
      var t = ie();
      Oe(n, e, 134217728, t);
    }
    Lu(e, 134217728);
  }
};
Ns = function(e) {
  if (e.tag === 13) {
    var n = cn(e), t = Ye(e, n);
    if (t !== null) {
      var r = ie();
      Oe(t, e, n, r);
    }
    Lu(e, n);
  }
};
Ps = function() {
  return O;
};
zs = function(e, n) {
  var t = O;
  try {
    return O = e, n();
  } finally {
    O = t;
  }
};
lo = function(e, n, t) {
  switch (n) {
    case "input":
      if (Jl(e, t), n = t.name, t.type === "radio" && n != null) {
        for (t = e; t.parentNode; ) t = t.parentNode;
        for (t = t.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < t.length; n++) {
          var r = t[n];
          if (r !== e && r.form === e.form) {
            var l = ol(r);
            if (!l) throw Error(y(90));
            os(r), Jl(r, l);
          }
        }
      }
      break;
    case "textarea":
      is(e, t);
      break;
    case "select":
      n = t.value, n != null && Yn(e, !!t.multiple, n, !1);
  }
};
ms = Cu;
vs = Tn;
var Sd = { usingClientEntryPoint: !1, Events: [qt, Vn, ol, ds, ps, Cu] }, gt = { findFiberByHostInstance: kn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, kd = { bundleType: gt.bundleType, version: gt.version, rendererPackageName: gt.rendererPackageName, rendererConfig: gt.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ge.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = gs(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: gt.findFiberByHostInstance || gd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var gr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!gr.isDisabled && gr.supportsFiber) try {
    nl = gr.inject(kd), Ue = gr;
  } catch {
  }
}
we.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sd;
we.createPortal = function(e, n) {
  var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Mu(n)) throw Error(y(200));
  return yd(e, n, null, t);
};
we.createRoot = function(e, n) {
  if (!Mu(e)) throw Error(y(299));
  var t = !1, r = "", l = Za;
  return n != null && (n.unstable_strictMode === !0 && (t = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), n = zu(e, 1, !1, null, null, t, !1, r, l), e[Ke] = n.current, Vt(e.nodeType === 8 ? e.parentNode : e), new Tu(n);
};
we.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var n = e._reactInternals;
  if (n === void 0)
    throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
  return e = gs(n), e = e === null ? null : e.stateNode, e;
};
we.flushSync = function(e) {
  return Tn(e);
};
we.hydrate = function(e, n, t) {
  if (!ml(n)) throw Error(y(200));
  return vl(null, e, n, !0, t);
};
we.hydrateRoot = function(e, n, t) {
  if (!Mu(e)) throw Error(y(405));
  var r = t != null && t.hydratedSources || null, l = !1, o = "", u = Za;
  if (t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (u = t.onRecoverableError)), n = Ga(n, null, e, 1, t ?? null, l, !1, o, u), e[Ke] = n.current, Vt(e), r) for (e = 0; e < r.length; e++) t = r[e], l = t._getVersion, l = l(t._source), n.mutableSourceEagerHydrationData == null ? n.mutableSourceEagerHydrationData = [t, l] : n.mutableSourceEagerHydrationData.push(
    t,
    l
  );
  return new pl(n);
};
we.render = function(e, n, t) {
  if (!ml(n)) throw Error(y(200));
  return vl(null, e, n, !1, t);
};
we.unmountComponentAtNode = function(e) {
  if (!ml(e)) throw Error(y(40));
  return e._reactRootContainer ? (Tn(function() {
    vl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ke] = null;
    });
  }), !0) : !1;
};
we.unstable_batchedUpdates = Cu;
we.unstable_renderSubtreeIntoContainer = function(e, n, t, r) {
  if (!ml(t)) throw Error(y(200));
  if (e == null || e._reactInternals === void 0) throw Error(y(38));
  return vl(e, n, t, !1, r);
};
we.version = "18.3.1-next-f1338f8080-20240426";
function Ja() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ja);
    } catch (e) {
      console.error(e);
    }
}
Ja(), Ji.exports = we;
var Ed = Ji.exports, qa, Ai = Ed;
qa = Ai.createRoot, Ai.hydrateRoot;
let ba = ue.createContext(
  /** @type {any} */
  null
);
function xd() {
  let e = ue.useContext(ba);
  if (!e) throw new Error("RenderContext not found");
  return e;
}
function Cd() {
  return xd().model;
}
function Dn(e) {
  let n = Cd(), [t, r] = ue.useState(n.get(e));
  return ue.useEffect(() => {
    let l = () => r(n.get(e));
    return n.on(`change:${e}`, l), () => n.off(`change:${e}`, l);
  }, [n, e]), [
    t,
    (l) => {
      n.set(e, l), n.save_changes();
    }
  ];
}
function _d(e) {
  return ({ el: n, model: t, experimental: r }) => {
    let l = qa(n);
    return l.render(
      ue.createElement(
        ue.StrictMode,
        null,
        ue.createElement(
          ba.Provider,
          { value: { model: t, experimental: r } },
          ue.createElement(e)
        )
      )
    ), () => l.unmount();
  };
}
const Nd = ({
  projects: e,
  onSelectProject: n,
  selectedProjectId: t
}) => /* @__PURE__ */ N.createElement("div", { className: "border rounded", role: "listbox" }, e.map((r) => /* @__PURE__ */ N.createElement(
  "button",
  {
    key: r.id,
    className: `w-full text-left p-3 hover:bg-gray-50 ${t === r.id ? "bg-blue-100 border-l-4 border-blue-500" : ""}`,
    onClick: () => n(r.id),
    "aria-selected": t === r.id,
    role: "option"
  },
  /* @__PURE__ */ N.createElement("h3", { className: "font-medium" }, r.name)
))), Pd = ({
  project: e,
  onClose: n,
  onSave: t
}) => {
  const [r, l] = ue.useState(e.name), [o, u] = ue.useState(e.description);
  N.useEffect(() => {
    l(e.name), u(e.description);
  }, [e]);
  const i = () => {
    l(e.name), u(e.description), n();
  }, s = (c) => {
    c.preventDefault(), t(r, o);
  };
  return /* @__PURE__ */ N.createElement("div", { className: "p-4" }, /* @__PURE__ */ N.createElement("h2", { className: "text-lg font-semibold mb-4" }, "Project Details"), /* @__PURE__ */ N.createElement("form", { onSubmit: s }, /* @__PURE__ */ N.createElement("div", { className: "mb-4" }, /* @__PURE__ */ N.createElement("label", { className: "block mb-2" }, "Name"), /* @__PURE__ */ N.createElement(
    "input",
    {
      type: "text",
      value: r,
      onChange: (c) => l(c.target.value),
      className: "w-full border rounded p-2"
    }
  )), /* @__PURE__ */ N.createElement("div", { className: "mb-4" }, /* @__PURE__ */ N.createElement("label", { className: "block mb-2" }, "Description"), /* @__PURE__ */ N.createElement(
    "textarea",
    {
      value: o,
      onChange: (c) => u(c.target.value),
      className: "w-full border rounded p-2",
      rows: 4
    }
  )), /* @__PURE__ */ N.createElement("div", { className: "flex justify-end gap-2" }, /* @__PURE__ */ N.createElement(
    "button",
    {
      type: "button",
      onClick: i,
      className: "px-4 py-2 border rounded"
    },
    "Cancel"
  ), /* @__PURE__ */ N.createElement(
    "button",
    {
      type: "submit",
      className: "px-4 py-2 bg-blue-500 text-white rounded"
    },
    "Save"
  ))));
}, zd = ({
  scenarios: e,
  projectId: n,
  onSelectScenario: t,
  selectedScenarioId: r
}) => {
  const l = e.filter(
    (o) => o.projectId === n
  );
  return /* @__PURE__ */ N.createElement("div", { className: "mt-4" }, /* @__PURE__ */ N.createElement("h3", { className: "text-md font-semibold mb-2" }, "Scenarios"), /* @__PURE__ */ N.createElement("div", { className: "border rounded", role: "listbox" }, l.map((o) => /* @__PURE__ */ N.createElement(
    "button",
    {
      key: o.id,
      className: `w-full text-left p-2 hover:bg-gray-50 ${r === o.id ? "bg-blue-100 border-l-4 border-blue-500" : ""}`,
      onClick: () => t == null ? void 0 : t(o.id),
      "aria-selected": r === o.id,
      role: "option"
    },
    o.name
  ))));
}, Ld = ({ projects: e, scenarios: n, onUpdateProject: t, onSelectProject: r, onSelectScenario: l, selectedProjectId: o, selectedScenarioId: u, onClose: i }) => {
  const s = N.useRef(o), c = N.useRef(u), v = e.find((g) => g.id === o), m = N.useMemo(
    () => n.filter((g) => g.projectId === o),
    [n, o]
  ), p = (g) => {
    g === null ? (r(s.current ?? null), l(c.current), i()) : (r(g), g !== o && l(null));
  }, w = (g, S) => {
    o && t(o, g, S);
  };
  return /* @__PURE__ */ N.createElement("div", { className: "flex flex-col gap-4" }, /* @__PURE__ */ N.createElement("h1", { className: "text-2xl font-bold mb-4" }, "Project Browser"), /* @__PURE__ */ N.createElement("div", { className: "flex gap-4 h-full" }, /* @__PURE__ */ N.createElement("div", { className: "w-1/3 min-w-[250px]" }, /* @__PURE__ */ N.createElement(
    Nd,
    {
      projects: e,
      onSelectProject: p,
      selectedProjectId: o ?? void 0
    }
  ), o && /* @__PURE__ */ N.createElement(
    zd,
    {
      scenarios: m,
      projectId: o,
      onSelectScenario: l,
      selectedScenarioId: u ?? void 0
    }
  )), v && /* @__PURE__ */ N.createElement("div", { className: "flex-1" }, /* @__PURE__ */ N.createElement(
    Pd,
    {
      project: v,
      isOpen: !0,
      onClose: () => p(null),
      onSave: w
    }
  ))));
}, Td = ({
  isOpen: e,
  onClose: n,
  projects: t,
  scenarios: r,
  onUpdateProject: l,
  onSelectProject: o,
  onSelectScenario: u,
  selectedProjectId: i,
  selectedScenarioId: s
}) => {
  if (!e) return null;
  const c = (v) => {
    v.target === v.currentTarget && n();
  };
  return /* @__PURE__ */ N.createElement("div", { className: "modal-overlay", onClick: c }, /* @__PURE__ */ N.createElement("div", { className: "modal-container" }, /* @__PURE__ */ N.createElement("button", { className: "modal-close-button", onClick: n }, /* @__PURE__ */ N.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ N.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }))), /* @__PURE__ */ N.createElement("div", { className: "modal-content" }, /* @__PURE__ */ N.createElement(
    Ld,
    {
      projects: t,
      scenarios: r,
      onUpdateProject: l,
      onSelectProject: o,
      onSelectScenario: u,
      selectedProjectId: i,
      selectedScenarioId: s,
      onClose: n
    }
  ))));
}, Md = ({
  selectedProjectName: e,
  selectedScenarioName: n,
  projects: t,
  scenarios: r,
  onUpdateProject: l,
  onSelectProject: o,
  onSelectScenario: u,
  changed: i,
  hasSelection: s,
  onSave: c,
  selectedProjectId: v,
  selectedScenarioId: m
}) => {
  const [p, w] = N.useState(!1), [g, S] = N.useState(!1), D = () => {
    w(!1), e ? c() : S(!0);
  };
  return /* @__PURE__ */ N.createElement("div", { className: "inline-block relative" }, /* @__PURE__ */ N.createElement("div", { className: "flex items-center h-9 border rounded-lg bg-white shadow-sm" }, /* @__PURE__ */ N.createElement("div", { className: "flex items-center px-2 h-full border-r" }, e ? /* @__PURE__ */ N.createElement("div", { className: "flex items-center gap-1.5" }, i && /* @__PURE__ */ N.createElement("div", { className: "w-2 h-2 rounded-full bg-blue-500" }), /* @__PURE__ */ N.createElement("span", { className: "px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-xs font-medium" }, e), n && /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.createElement("span", { className: "text-gray-400 text-sm" }, "/"), /* @__PURE__ */ N.createElement("span", { className: "px-2 py-0.5 bg-green-100 text-green-800 rounded-md text-xs font-medium" }, n))) : /* @__PURE__ */ N.createElement("span", { className: "text-gray-500 italic text-xs" }, "No project selected")), /* @__PURE__ */ N.createElement(
    "button",
    {
      onClick: () => w(!p),
      className: "h-full px-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 text-xs font-medium transition-colors"
    },
    /* @__PURE__ */ N.createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ N.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }))
  )), p && /* @__PURE__ */ N.createElement("div", { className: "dropdown-menu" }, /* @__PURE__ */ N.createElement(
    "button",
    {
      onClick: () => {
        S(!0), w(!1);
      },
      className: "dropdown-item"
    },
    "Save as..."
  ), s && i && /* @__PURE__ */ N.createElement(
    "button",
    {
      onClick: D,
      className: "dropdown-item"
    },
    "Save"
  )), g && /* @__PURE__ */ N.createElement(
    Td,
    {
      isOpen: g,
      onClose: () => S(!1),
      projects: t,
      scenarios: r,
      onUpdateProject: l,
      onSelectProject: o,
      onSelectScenario: u,
      selectedProjectId: v,
      selectedScenarioId: m
    }
  ));
};
function Rd() {
  console.log("ProjectMenuWidget loaded");
  const [e, n] = Dn("projects"), [t, r] = Dn("selected_project_id"), [l, o] = Dn("selected_scenario_id"), [u, i] = Dn("changed"), [s, c] = Dn("scenarios"), [v, m] = Dn("do_save"), [p, w] = ue.useState(!1), g = e == null ? void 0 : e.find((h) => h.id === t), S = s == null ? void 0 : s.find((h) => h.id === l), D = (h, k, C) => {
    const _ = e == null ? void 0 : e.map(
      (P) => P.id === h ? { ...P, name: k, description: C } : P
    );
    n(_ || []), w(!1);
  }, f = (h) => {
    r(h);
  }, a = (h) => {
    o(h);
  }, d = () => {
    m(!0), setTimeout(() => m(!1), 100);
  };
  return /* @__PURE__ */ ue.createElement("div", { className: "widget" }, /* @__PURE__ */ ue.createElement(
    Md,
    {
      selectedProjectName: g == null ? void 0 : g.name,
      selectedScenarioName: S == null ? void 0 : S.name,
      projects: e || [],
      scenarios: s || [],
      onUpdateProject: D,
      onSelectProject: f,
      onSelectScenario: a,
      onSave: d,
      changed: u || !1,
      hasSelection: !!(t && l),
      selectedProjectId: t,
      selectedScenarioId: l
    }
  ));
}
const Od = {
  render: _d(Rd)
};
export {
  Od as default
};
