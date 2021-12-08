/*!
 * VERSION: 0.14.7
 * DATE: 2016-05-25
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Requires TweenLite and CSSPlugin version 1.17.0 or later (TweenMax contains both TweenLite and CSSPlugin). ThrowPropsPlugin is required for momentum-based continuation of movement after the mouse/touch is released (ThrowPropsPlugin is a membership benefit of Club GreenSock - http://greensock.com/club/).
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine(
        "utils.Draggable",
        ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"],
        function (a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k,
                l,
                m = { css: {} },
                n = { css: {} },
                o = { css: {} },
                p = { css: {} },
                q = _gsScope._gsDefine.globals,
                r = {},
                s = document,
                t = s.documentElement || {},
                u = function (a) {
                    return s.createElementNS ? s.createElementNS("http://www.w3.org/1999/xhtml", a) : s.createElement(a);
                },
                v = u("div"),
                w = [],
                x = function () {
                    return !1;
                },
                y = 180 / Math.PI,
                z = 999999999999999,
                A =
                    Date.now ||
                    function () {
                        return new Date().getTime();
                    },
                B = !(s.addEventListener || !s.all),
                C = s.createElement("div"),
                D = [],
                E = {},
                F = 0,
                G = /^(?:a|input|textarea|button|select)$/i,
                H = 0,
                I = -1 !== navigator.userAgent.toLowerCase().indexOf("android"),
                J = 0,
                K = {},
                L = {},
                M = function (a) {
                    if (("string" == typeof a && (a = b.selector(a)), !a || a.nodeType)) return [a];
                    var c,
                        d = [],
                        e = a.length;
                    for (c = 0; c !== e; d.push(a[c++]));
                    return d;
                },
                N = function (a) {
                    var b,
                        c = {};
                    for (b in a) c[b] = a[b];
                    return c;
                },
                O = function () {
                    for (var a = D.length; --a > -1; ) D[a]();
                },
                P = function (a) {
                    D.push(a), 1 === D.length && b.ticker.addEventListener("tick", O, this, !1, 1);
                },
                Q = function (a) {
                    for (var c = D.length; --c > -1; ) D[c] === a && D.splice(c, 1);
                    b.to(R, 0, { overwrite: "all", delay: 15, onComplete: R });
                },
                R = function () {
                    D.length || b.ticker.removeEventListener("tick", O);
                },
                S = function (a, b) {
                    var c;
                    for (c in b) void 0 === a[c] && (a[c] = b[c]);
                    return a;
                },
                T = function () {
                    return null != window.pageYOffset ? window.pageYOffset : null != s.scrollTop ? s.scrollTop : t.scrollTop || s.body.scrollTop || 0;
                },
                U = function () {
                    return null != window.pageXOffset ? window.pageXOffset : null != s.scrollLeft ? s.scrollLeft : t.scrollLeft || s.body.scrollLeft || 0;
                },
                V = function (a, b) {
                    Ia(a, "scroll", b), X(a.parentNode) || V(a.parentNode, b);
                },
                W = function (a, b) {
                    Ja(a, "scroll", b), X(a.parentNode) || W(a.parentNode, b);
                },
                X = function (a) {
                    return !(a && a !== t && a !== s && a !== s.body && a !== window && a.nodeType && a.parentNode);
                },
                Y = function (a, b) {
                    var c = "x" === b ? "Width" : "Height",
                        d = "scroll" + c,
                        e = "client" + c,
                        f = s.body;
                    return Math.max(0, X(a) ? Math.max(t[d], f[d]) - (window["inner" + c] || t[e] || f[e]) : a[d] - a[e]);
                },
                Z = function (a) {
                    var b = X(a),
                        c = Y(a, "x"),
                        d = Y(a, "y");
                    b ? (a = L) : Z(a.parentNode), (a._gsMaxScrollX = c), (a._gsMaxScrollY = d), (a._gsScrollX = a.scrollLeft || 0), (a._gsScrollY = a.scrollTop || 0);
                },
                $ = function (a, b) {
                    return (a = a || window.event), (r.pageX = a.clientX + s.body.scrollLeft + t.scrollLeft), (r.pageY = a.clientY + s.body.scrollTop + t.scrollTop), b && (a.returnValue = !1), r;
                },
                _ = function (a) {
                    return a ? ("string" == typeof a && (a = b.selector(a)), a.length && a !== window && a[0] && a[0].style && !a.nodeType && (a = a[0]), a === window || (a.nodeType && a.style) ? a : null) : a;
                },
                aa = function (a, b) {
                    var c,
                        e,
                        f,
                        g = a.style;
                    if (void 0 === g[b]) {
                        for (f = ["O", "Moz", "ms", "Ms", "Webkit"], e = 5, c = b.charAt(0).toUpperCase() + b.substr(1); --e > -1 && void 0 === g[f[e] + c]; );
                        if (0 > e) return "";
                        (d = 3 === e ? "ms" : f[e]), (b = d + c);
                    }
                    return b;
                },
                ba = function (a, b, c) {
                    var d = a.style;
                    d && (void 0 === d[b] && (b = aa(a, b)), null == c ? (d.removeProperty ? d.removeProperty(b.replace(/([A-Z])/g, "-$1").toLowerCase()) : d.removeAttribute(b)) : void 0 !== d[b] && (d[b] = c));
                },
                ca = s.defaultView ? s.defaultView.getComputedStyle : x,
                da = /(?:Left|Right|Width)/i,
                ea = /(?:\d|\-|\+|=|#|\.)*/g,
                fa = function (a, b, c, d, e) {
                    if ("px" === d || !d) return c;
                    if ("auto" === d || !c) return 0;
                    var f,
                        g = da.test(b),
                        h = a,
                        i = v.style,
                        j = 0 > c;
                    return (
                        j && (c = -c),
                        "%" === d && -1 !== b.indexOf("border")
                            ? (f = (c / 100) * (g ? a.clientWidth : a.clientHeight))
                            : ((i.cssText = "border:0 solid red;position:" + ha(a, "position", !0) + ";line-height:0;"),
                              "%" !== d && h.appendChild ? (i[g ? "borderLeftWidth" : "borderTopWidth"] = c + d) : ((h = a.parentNode || s.body), (i[g ? "width" : "height"] = c + d)),
                              h.appendChild(v),
                              (f = parseFloat(v[g ? "offsetWidth" : "offsetHeight"])),
                              h.removeChild(v),
                              0 !== f || e || (f = fa(a, b, c, d, !0))),
                        j ? -f : f
                    );
                },
                ga = function (a, b) {
                    if ("absolute" !== ha(a, "position", !0)) return 0;
                    var c = "left" === b ? "Left" : "Top",
                        d = ha(a, "margin" + c, !0);
                    return a["offset" + c] - (fa(a, b, parseFloat(d), (d + "").replace(ea, "")) || 0);
                },
                ha = function (a, b, c) {
                    var d,
                        e = (a._gsTransform || {})[b];
                    return e || 0 === e
                        ? e
                        : (a.style[b] ? (e = a.style[b]) : (d = ca(a)) ? ((e = d.getPropertyValue(b.replace(/([A-Z])/g, "-$1").toLowerCase())), (e = e || d.length ? e : d[b])) : a.currentStyle && (e = a.currentStyle[b]),
                          "auto" !== e || ("top" !== b && "left" !== b) || (e = ga(a, b)),
                          c ? e : parseFloat(e) || 0);
                },
                ia = function (a, b, c) {
                    var d = a.vars,
                        e = d[c],
                        f = a._listeners[b];
                    "function" == typeof e && e.apply(d[c + "Scope"] || d.callbackScope || a, d[c + "Params"] || [a.pointerEvent]), f && a.dispatchEvent(b);
                },
                ja = function (a, b) {
                    var c,
                        d,
                        e,
                        f = _(a);
                    return f
                        ? Da(f, b)
                        : void 0 !== a.left
                        ? ((e = xa(b)), { left: a.left - e.x, top: a.top - e.y, width: a.width, height: a.height })
                        : ((d = a.min || a.minX || a.minRotation || 0), (c = a.min || a.minY || 0), { left: d, top: c, width: (a.max || a.maxX || a.maxRotation || 0) - d, height: (a.max || a.maxY || 0) - c });
                },
                ka = function () {
                    if (!s.createElementNS) return (g = 0), void (h = !1);
                    var a,
                        b,
                        c,
                        d,
                        e = u("div"),
                        f = s.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        l = u("div"),
                        m = e.style,
                        n = s.body || t;
                    s.body &&
                        na &&
                        ((m.position = "absolute"),
                        n.appendChild(l),
                        l.appendChild(e),
                        (d = e.offsetParent),
                        (l.style[na] = "rotate(1deg)"),
                        (k = e.offsetParent === d),
                        (l.style.position = "absolute"),
                        (m.height = "10px"),
                        (d = e.offsetTop),
                        (l.style.border = "5px solid red"),
                        (j = d !== e.offsetTop),
                        n.removeChild(l)),
                        (m = f.style),
                        f.setAttributeNS(null, "width", "400px"),
                        f.setAttributeNS(null, "height", "400px"),
                        f.setAttributeNS(null, "viewBox", "0 0 400 400"),
                        (m.display = "block"),
                        (m.boxSizing = "border-box"),
                        (m.border = "0px solid red"),
                        (m.transform = "none"),
                        (e.style.cssText = "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;"),
                        n.appendChild(e),
                        e.appendChild(f),
                        (c = f.createSVGPoint().matrixTransform(f.getScreenCTM())),
                        (b = c.y),
                        (e.scrollTop = 100),
                        (c.x = c.y = 0),
                        (c = c.matrixTransform(f.getScreenCTM())),
                        (i = b - c.y < 100.1 ? 0 : b - c.y - 150),
                        e.removeChild(f),
                        n.removeChild(e),
                        n.appendChild(f),
                        (a = f.getScreenCTM()),
                        (b = a.e),
                        (m.border = "50px solid red"),
                        (a = f.getScreenCTM()),
                        0 === b && 0 === a.e && 0 === a.f && 1 === a.a ? ((g = 1), (h = !0)) : ((g = b !== a.e ? 1 : 0), (h = 1 !== a.a)),
                        n.removeChild(f);
                },
                la = "" !== aa(v, "perspective"),
                ma = aa(v, "transformOrigin")
                    .replace(/^ms/g, "Ms")
                    .replace(/([A-Z])/g, "-$1")
                    .toLowerCase(),
                na = aa(v, "transform"),
                oa = na
                    .replace(/^ms/g, "Ms")
                    .replace(/([A-Z])/g, "-$1")
                    .toLowerCase(),
                pa = {},
                qa = {},
                ra = window.SVGElement,
                sa = function (a) {
                    return !!(ra && "function" == typeof a.getBBox && a.getCTM && (!a.parentNode || (a.parentNode.getBBox && a.parentNode.getCTM)));
                },
                ta = (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) && parseFloat(RegExp.$1) < 11,
                ua = [],
                va = [],
                wa = function (a) {
                    if (!a.getBoundingClientRect || !a.parentNode || !na) return { offsetTop: 0, offsetLeft: 0, scaleX: 1, scaleY: 1, offsetParent: t };
                    if (Sa.cacheSVGData !== !1 && a._gsCache && a._gsCache.lastUpdate === b.ticker.frame) return a._gsCache;
                    var c,
                        d,
                        e,
                        f,
                        j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r = a,
                        u = ya(a);
                    if (((u.lastUpdate = b.ticker.frame), a.getBBox && !u.isSVGRoot)) {
                        for (r = a.parentNode, c = a.getBBox(); r && "svg" !== (r.nodeName + "").toLowerCase(); ) r = r.parentNode;
                        return (f = wa(r)), (u.offsetTop = c.y * f.scaleY), (u.offsetLeft = c.x * f.scaleX), (u.scaleX = f.scaleX), (u.scaleY = f.scaleY), (u.offsetParent = r || t), u;
                    }
                    for (
                        e = u.offsetParent, e === s.body && (e = t), va.length = ua.length = 0;
                        r && ((j = ha(r, na, !0)), "matrix(1, 0, 0, 1, 0, 0)" !== j && "none" !== j && "translate3d(0px, 0px, 0px)" !== j && (va.push(r), ua.push(r.style[na]), (r.style[na] = "none")), r !== e);

                    )
                        r = r.parentNode;
                    for (
                        d = e.getBoundingClientRect(),
                            j = a.getScreenCTM(),
                            m = a.createSVGPoint(),
                            l = m.matrixTransform(j),
                            m.x = m.y = 10,
                            m = m.matrixTransform(j),
                            u.scaleX = (m.x - l.x) / 10,
                            u.scaleY = (m.y - l.y) / 10,
                            void 0 === g && ka(),
                            u.borderBox &&
                                !h &&
                                a.getAttribute("width") &&
                                ((f = ca(a) || {}),
                                (n = parseFloat(f.borderLeftWidth) + parseFloat(f.borderRightWidth) || 0),
                                (o = parseFloat(f.borderTopWidth) + parseFloat(f.borderBottomWidth) || 0),
                                (p = parseFloat(f.width) || 0),
                                (q = parseFloat(f.height) || 0),
                                (u.scaleX *= (p - n) / p),
                                (u.scaleY *= (q - o) / q)),
                            i ? ((c = a.getBoundingClientRect()), (u.offsetLeft = c.left - d.left), (u.offsetTop = c.top - d.top)) : ((u.offsetLeft = l.x - d.left), (u.offsetTop = l.y - d.top)),
                            u.offsetParent = e,
                            k = va.length;
                        --k > -1;

                    )
                        va[k].style[na] = ua[k];
                    return u;
                },
                xa = function (a, c) {
                    if (((c = c || {}), !a || a === t || !a.parentNode || a === window)) return { x: 0, y: 0 };
                    var d = ca(a),
                        e = ma && d ? d.getPropertyValue(ma) : "50% 50%",
                        f = e.split(" "),
                        g = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : f[0],
                        h = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : f[1];
                    return (
                        ("center" === h || null == h) && (h = "50%"),
                        ("center" === g || isNaN(parseFloat(g))) && (g = "50%"),
                        a.getBBox && sa(a)
                            ? (a._gsTransform || (b.set(a, { x: "+=0", overwrite: !1 }), void 0 === a._gsTransform.xOrigin && console.log("Draggable requires at least GSAP 1.17.0")),
                              (e = a.getBBox()),
                              (c.x = a._gsTransform.xOrigin - e.x),
                              (c.y = a._gsTransform.yOrigin - e.y))
                            : (a.getBBox && -1 !== (g + h).indexOf("%") && ((a = a.getBBox()), (a = { offsetWidth: a.width, offsetHeight: a.height })),
                              (c.x = -1 !== g.indexOf("%") ? (a.offsetWidth * parseFloat(g)) / 100 : parseFloat(g)),
                              (c.y = -1 !== h.indexOf("%") ? (a.offsetHeight * parseFloat(h)) / 100 : parseFloat(h))),
                        c
                    );
                },
                ya = function (a) {
                    if (Sa.cacheSVGData !== !1 && a._gsCache && a._gsCache.lastUpdate === b.ticker.frame) return a._gsCache;
                    var c,
                        d = (a._gsCache = a._gsCache || {}),
                        e = ca(a),
                        f = a.getBBox && sa(a),
                        g = "svg" === (a.nodeName + "").toLowerCase();
                    if (((d.isSVG = f), (d.isSVGRoot = g), (d.borderBox = "border-box" === e.boxSizing), (d.computedStyle = e), g)) (c = a.parentNode || t), c.insertBefore(v, a), (d.offsetParent = v.offsetParent || t), c.removeChild(v);
                    else if (f) {
                        for (c = a.parentNode; c && "svg" !== (c.nodeName + "").toLowerCase(); ) c = c.parentNode;
                        d.offsetParent = c;
                    } else d.offsetParent = a.offsetParent;
                    return d;
                },
                za = function (a, b, c, d) {
                    if (a === window || !a || !a.style || !a.parentNode) return [1, 0, 0, 1, 0, 0];
                    var e,
                        f,
                        h,
                        i,
                        l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r,
                        u,
                        v,
                        w,
                        x = a._gsCache || ya(a),
                        y = a.parentNode,
                        z = y._gsCache || ya(y),
                        A = x.computedStyle,
                        B = x.isSVG ? z.offsetParent : y.offsetParent;
                    return (
                        (e = x.isSVG && -1 !== (a.style[na] + "").indexOf("matrix") ? a.style[na] : A ? A.getPropertyValue(oa) : a.currentStyle ? a.currentStyle[na] : "1,0,0,1,0,0"),
                        a.getBBox && -1 !== (a.getAttribute("transform") + "").indexOf("matrix") && (e = a.getAttribute("transform")),
                        (e = (e + "").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g) || [1, 0, 0, 1, 0, 0]),
                        e.length > 6 && (e = [e[0], e[1], e[4], e[5], e[12], e[13]]),
                        d
                            ? (e[4] = e[5] = 0)
                            : x.isSVG &&
                              (l = a._gsTransform) &&
                              (l.xOrigin || l.yOrigin) &&
                              ((e[0] = parseFloat(e[0])),
                              (e[1] = parseFloat(e[1])),
                              (e[2] = parseFloat(e[2])),
                              (e[3] = parseFloat(e[3])),
                              (e[4] = parseFloat(e[4]) - (l.xOrigin - (l.xOrigin * e[0] + l.yOrigin * e[2]))),
                              (e[5] = parseFloat(e[5]) - (l.yOrigin - (l.xOrigin * e[1] + l.yOrigin * e[3])))),
                        b &&
                            (void 0 === g && ka(),
                            (h = x.isSVG || x.isSVGRoot ? wa(a) : a),
                            x.isSVG
                                ? ((i = a.getBBox()), (q = z.isSVGRoot ? { x: 0, y: 0 } : y.getBBox()), (h = { offsetLeft: i.x - q.x, offsetTop: i.y - q.y, offsetParent: x.offsetParent }))
                                : x.isSVGRoot
                                ? ((r = parseInt(A.borderTopWidth, 10) || 0),
                                  (u = parseInt(A.borderLeftWidth, 10) || 0),
                                  (v = (e[0] - g) * u + e[2] * r),
                                  (w = e[1] * u + (e[3] - g) * r),
                                  (m = b.x),
                                  (n = b.y),
                                  (o = m - (m * e[0] + n * e[2])),
                                  (p = n - (m * e[1] + n * e[3])),
                                  (e[4] = parseFloat(e[4]) + o),
                                  (e[5] = parseFloat(e[5]) + p),
                                  (b.x -= o),
                                  (b.y -= p),
                                  (m = h.scaleX),
                                  (n = h.scaleY),
                                  (b.x *= m),
                                  (b.y *= n),
                                  (e[0] *= m),
                                  (e[1] *= n),
                                  (e[2] *= m),
                                  (e[3] *= n),
                                  ta || ((b.x += v), (b.y += w)))
                                : !j && a.offsetParent && ((b.x += parseInt(ha(a.offsetParent, "borderLeftWidth"), 10) || 0), (b.y += parseInt(ha(a.offsetParent, "borderTopWidth"), 10) || 0)),
                            (f = y === t || y === s.body),
                            (e[4] = Number(e[4]) + b.x + (h.offsetLeft || 0) - c.x - (f ? 0 : y.scrollLeft || 0)),
                            (e[5] = Number(e[5]) + b.y + (h.offsetTop || 0) - c.y - (f ? 0 : y.scrollTop || 0)),
                            y && "fixed" === ha(a, "position", A) && ((e[4] += U()), (e[5] += T())),
                            !y ||
                                y === t ||
                                B !== h.offsetParent ||
                                z.isSVG ||
                                (k && "100100" !== za(y).join("")) ||
                                ((h = z.isSVGRoot ? wa(y) : y),
                                (e[4] -= h.offsetLeft || 0),
                                (e[5] -= h.offsetTop || 0),
                                j || !z.offsetParent || x.isSVG || x.isSVGRoot || ((e[4] -= parseInt(ha(z.offsetParent, "borderLeftWidth"), 10) || 0), (e[5] -= parseInt(ha(z.offsetParent, "borderTopWidth"), 10) || 0)))),
                        e
                    );
                },
                Aa = function (a, b) {
                    if (!a || a === window || !a.parentNode) return [1, 0, 0, 1, 0, 0];
                    for (var c, d, e, f, g, h, i, j, k = xa(a, pa), l = xa(a.parentNode, qa), m = za(a, k, l); (a = a.parentNode) && a.parentNode && a !== t; )
                        (k = l),
                            (l = xa(a.parentNode, k === pa ? qa : pa)),
                            (i = za(a, k, l)),
                            (c = m[0]),
                            (d = m[1]),
                            (e = m[2]),
                            (f = m[3]),
                            (g = m[4]),
                            (h = m[5]),
                            (m[0] = c * i[0] + d * i[2]),
                            (m[1] = c * i[1] + d * i[3]),
                            (m[2] = e * i[0] + f * i[2]),
                            (m[3] = e * i[1] + f * i[3]),
                            (m[4] = g * i[0] + h * i[2] + i[4]),
                            (m[5] = g * i[1] + h * i[3] + i[5]);
                    return (
                        b &&
                            ((c = m[0]),
                            (d = m[1]),
                            (e = m[2]),
                            (f = m[3]),
                            (g = m[4]),
                            (h = m[5]),
                            (j = c * f - d * e),
                            (m[0] = f / j),
                            (m[1] = -d / j),
                            (m[2] = -e / j),
                            (m[3] = c / j),
                            (m[4] = (e * h - f * g) / j),
                            (m[5] = -(c * h - d * g) / j)),
                        m
                    );
                },
                Ba = function (a, b, c, d, e) {
                    a = _(a);
                    var f = Aa(a, !1, e),
                        g = b.x,
                        h = b.y;
                    return c && (xa(a, b), (g -= b.x), (h -= b.y)), (d = d === !0 ? b : d || {}), (d.x = g * f[0] + h * f[2] + f[4]), (d.y = g * f[1] + h * f[3] + f[5]), d;
                },
                Ca = function (a, b, c) {
                    var d = a.x * b[0] + a.y * b[2] + b[4],
                        e = a.x * b[1] + a.y * b[3] + b[5];
                    return (a.x = d * c[0] + e * c[2] + c[4]), (a.y = d * c[1] + e * c[3] + c[5]), a;
                },
                Da = function (a, b, c) {
                    if (!(a = _(a))) return null;
                    b = _(b);
                    var d,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r,
                        u,
                        v,
                        w,
                        x,
                        y,
                        z,
                        A,
                        C = a.getBBox && sa(a);
                    if (a === window)
                        (g = T()), (e = U()), (f = e + (t.clientWidth || a.innerWidth || s.body.clientWidth || 0)), (h = g + ((a.innerHeight || 0) - 20 < t.clientHeight ? t.clientHeight : a.innerHeight || s.body.clientHeight || 0));
                    else {
                        if (void 0 === b || b === window) return a.getBoundingClientRect();
                        (d = xa(a)),
                            (e = -d.x),
                            (g = -d.y),
                            C
                                ? ((o = a.getBBox()), (p = o.width), (q = o.height))
                                : "svg" !== (a.nodeName + "").toLowerCase() && a.offsetWidth
                                ? ((p = a.offsetWidth), (q = a.offsetHeight))
                                : ((z = ca(a)), (p = parseFloat(z.width)), (q = parseFloat(z.height))),
                            (f = e + p),
                            (h = g + q),
                            "svg" !== a.nodeName.toLowerCase() ||
                                B ||
                                ((r = wa(a)),
                                (A = r.computedStyle || {}),
                                (w = (a.getAttribute("viewBox") || "0 0").split(" ")),
                                (x = parseFloat(w[0])),
                                (y = parseFloat(w[1])),
                                (u = parseFloat(A.borderLeftWidth) || 0),
                                (v = parseFloat(A.borderTopWidth) || 0),
                                (f -= p - (p - u) / r.scaleX - x),
                                (h -= q - (q - v) / r.scaleY - y),
                                (e -= u / r.scaleX - x),
                                (g -= v / r.scaleY - y),
                                z && ((f += (parseFloat(A.borderRightWidth) + u) / r.scaleX), (h += (v + parseFloat(A.borderBottomWidth)) / r.scaleY)));
                    }
                    return a === b
                        ? { left: e, top: g, width: f - e, height: h - g }
                        : ((i = Aa(a)),
                          (j = Aa(b, !0)),
                          (k = Ca({ x: e, y: g }, i, j)),
                          (l = Ca({ x: f, y: g }, i, j)),
                          (m = Ca({ x: f, y: h }, i, j)),
                          (n = Ca({ x: e, y: h }, i, j)),
                          (e = Math.min(k.x, l.x, m.x, n.x)),
                          (g = Math.min(k.y, l.y, m.y, n.y)),
                          (K.x = K.y = 0),
                          c && xa(b, K),
                          { left: e + K.x, top: g + K.y, width: Math.max(k.x, l.x, m.x, n.x) - e, height: Math.max(k.y, l.y, m.y, n.y) - g });
                },
                Ea = function (a) {
                    return a && a.length && a[0] && ((a[0].nodeType && a[0].style && !a.nodeType) || (a[0].length && a[0][0])) ? !0 : !1;
                },
                Fa = function (a) {
                    var b,
                        c,
                        d,
                        e = [],
                        f = a.length;
                    for (b = 0; f > b; b++)
                        if (((c = a[b]), Ea(c))) for (d = c.length, d = 0; d < c.length; d++) e.push(c[d]);
                        else c && 0 !== c.length && e.push(c);
                    return e;
                },
                Ga = "ontouchstart" in t && "orientation" in window,
                Ha = (function (a) {
                    for (
                        var b = a.split(","),
                            c = (void 0 !== v.onpointerdown ? "pointerdown,pointermove,pointerup,pointercancel" : void 0 !== v.onmspointerdown ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : a).split(","),
                            d = {},
                            e = 8;
                        --e > -1;

                    )
                        (d[b[e]] = c[e]), (d[c[e]] = b[e]);
                    return d;
                })("touchstart,touchmove,touchend,touchcancel"),
                Ia = function (a, b, c, d) {
                    a.addEventListener ? a.addEventListener(Ha[b] || b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
                },
                Ja = function (a, b, c) {
                    a.removeEventListener ? a.removeEventListener(Ha[b] || b, c) : a.detachEvent && a.detachEvent("on" + b, c);
                },
                Ka = function (a, b) {
                    for (var c = a.length; --c > -1; ) if (a[c].identifier === b) return !0;
                    return !1;
                },
                La = function (a) {
                    (e = a.touches && H < a.touches.length), Ja(a.target, "touchend", La);
                },
                Ma = function (a) {
                    (e = a.touches && H < a.touches.length), Ia(a.target, "touchend", La);
                },
                Na = function (a, b, c, d, e, f) {
                    var g,
                        h,
                        i,
                        j = {};
                    if (b)
                        if (1 !== e && b instanceof Array) {
                            for (j.end = g = [], i = b.length, h = 0; i > h; h++) g[h] = b[h] * e;
                            (c += 1.1), (d -= 1.1);
                        } else
                            "function" == typeof b
                                ? (j.end = function (c) {
                                      return b.call(a, c) * e;
                                  })
                                : (j.end = b);
                    return (c || 0 === c) && (j.max = c), (d || 0 === d) && (j.min = d), f && (j.velocity = 0), j;
                },
                Oa = function (a) {
                    var b;
                    return a && a.getAttribute && "BODY" !== a.nodeName
                        ? "true" === (b = a.getAttribute("data-clickable")) || ("false" !== b && (a.onclick || G.test(a.nodeName + "") || "true" === a.getAttribute("contentEditable")))
                            ? !0
                            : Oa(a.parentNode)
                        : !1;
                },
                Pa = function (a, b) {
                    for (var c, d = a.length; --d > -1; ) (c = a[d]), (c.ondragstart = c.onselectstart = b ? null : x), ba(c, "userSelect", b ? "text" : "none");
                },
                Qa = (function () {
                    var a,
                        b = s.createElement("div"),
                        c = s.createElement("div"),
                        d = c.style,
                        e = s.body || v;
                    return (
                        (d.display = "inline-block"),
                        (d.position = "relative"),
                        (b.style.cssText = c.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden"),
                        b.appendChild(c),
                        e.appendChild(b),
                        (l = c.offsetHeight + 18 > b.scrollHeight),
                        (d.width = "100%"),
                        na || ((d.paddingRight = "500px"), (a = b.scrollLeft = b.scrollWidth - b.clientWidth), (d.left = "-90px"), (a = a !== b.scrollLeft)),
                        e.removeChild(b),
                        a
                    );
                })(),
                Ra = function (a, c) {
                    (a = _(a)), (c = c || {});
                    var d,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j = s.createElement("div"),
                        k = j.style,
                        m = a.firstChild,
                        n = 0,
                        o = 0,
                        p = a.scrollTop,
                        q = a.scrollLeft,
                        r = a.scrollWidth,
                        t = a.scrollHeight,
                        u = 0,
                        v = 0,
                        w = 0;
                    la && c.force3D !== !1 ? ((h = "translate3d("), (i = "px,0px)")) : na && ((h = "translate("), (i = "px)")),
                        (this.scrollTop = function (a, b) {
                            return arguments.length ? void this.top(-a, b) : -this.top();
                        }),
                        (this.scrollLeft = function (a, b) {
                            return arguments.length ? void this.left(-a, b) : -this.left();
                        }),
                        (this.left = function (d, e) {
                            if (!arguments.length) return -(a.scrollLeft + o);
                            var f = a.scrollLeft - q,
                                g = o;
                            return (f > 2 || -2 > f) && !e
                                ? ((q = a.scrollLeft), b.killTweensOf(this, !0, { left: 1, scrollLeft: 1 }), this.left(-q), void (c.onKill && c.onKill()))
                                : ((d = -d),
                                  0 > d ? ((o = (d - 0.5) | 0), (d = 0)) : d > v ? ((o = (d - v) | 0), (d = v)) : (o = 0),
                                  (o || g) && (h ? this._suspendTransforms || (k[na] = h + -o + "px," + -n + i) : (k.left = -o + "px"), Qa && o + u >= 0 && (k.paddingRight = o + u + "px")),
                                  (a.scrollLeft = 0 | d),
                                  void (q = a.scrollLeft));
                        }),
                        (this.top = function (d, e) {
                            if (!arguments.length) return -(a.scrollTop + n);
                            var f = a.scrollTop - p,
                                g = n;
                            return (f > 2 || -2 > f) && !e
                                ? ((p = a.scrollTop), b.killTweensOf(this, !0, { top: 1, scrollTop: 1 }), this.top(-p), void (c.onKill && c.onKill()))
                                : ((d = -d),
                                  0 > d ? ((n = (d - 0.5) | 0), (d = 0)) : d > w ? ((n = (d - w) | 0), (d = w)) : (n = 0),
                                  (n || g) && (h ? this._suspendTransforms || (k[na] = h + -o + "px," + -n + i) : (k.top = -n + "px")),
                                  (a.scrollTop = 0 | d),
                                  void (p = a.scrollTop));
                        }),
                        (this.maxScrollTop = function () {
                            return w;
                        }),
                        (this.maxScrollLeft = function () {
                            return v;
                        }),
                        (this.disable = function () {
                            for (m = j.firstChild; m; ) (g = m.nextSibling), a.appendChild(m), (m = g);
                            a === j.parentNode && a.removeChild(j);
                        }),
                        (this.enable = function () {
                            if (((m = a.firstChild), m !== j)) {
                                for (; m; ) (g = m.nextSibling), j.appendChild(m), (m = g);
                                a.appendChild(j), this.calibrate();
                            }
                        }),
                        (this.calibrate = function (b) {
                            var c,
                                g,
                                h = a.clientWidth === d;
                            (p = a.scrollTop),
                                (q = a.scrollLeft),
                                (!h || a.clientHeight !== e || j.offsetHeight !== f || r !== a.scrollWidth || t !== a.scrollHeight || b) &&
                                    ((n || o) && ((c = this.left()), (g = this.top()), this.left(-a.scrollLeft), this.top(-a.scrollTop)),
                                    (!h || b) && ((k.display = "block"), (k.width = "auto"), (k.paddingRight = "0px"), (u = Math.max(0, a.scrollWidth - a.clientWidth)), u && (u += ha(a, "paddingLeft") + (l ? ha(a, "paddingRight") : 0))),
                                    (k.display = "inline-block"),
                                    (k.position = "relative"),
                                    (k.overflow = "visible"),
                                    (k.verticalAlign = "top"),
                                    (k.width = "100%"),
                                    (k.paddingRight = u + "px"),
                                    l && (k.paddingBottom = ha(a, "paddingBottom", !0)),
                                    B && (k.zoom = "1"),
                                    (d = a.clientWidth),
                                    (e = a.clientHeight),
                                    (r = a.scrollWidth),
                                    (t = a.scrollHeight),
                                    (v = a.scrollWidth - d),
                                    (w = a.scrollHeight - e),
                                    (f = j.offsetHeight),
                                    (k.display = "block"),
                                    (c || g) && (this.left(c), this.top(g)));
                        }),
                        (this.content = j),
                        (this.element = a),
                        (this._suspendTransforms = !1),
                        this.enable();
                },
                Sa = function (d, g) {
                    a.call(this, d),
                        (d = _(d)),
                        f || (f = q.com.greensock.plugins.ThrowPropsPlugin),
                        (this.vars = g = N(g || {})),
                        (this.target = d),
                        (this.x = this.y = this.rotation = 0),
                        (this.dragResistance = parseFloat(g.dragResistance) || 0),
                        (this.edgeResistance = isNaN(g.edgeResistance) ? 1 : parseFloat(g.edgeResistance) || 0),
                        (this.lockAxis = g.lockAxis),
                        (this.autoScroll = g.autoScroll || 0),
                        (this.lockedAxis = null),
                        (this.allowEventDefault = !!g.allowEventDefault);
                    var h,
                        i,
                        j,
                        k,
                        l,
                        r,
                        u,
                        v,
                        x,
                        D,
                        G,
                        K,
                        O,
                        R,
                        T,
                        U,
                        Y,
                        aa,
                        ca,
                        da,
                        ea,
                        fa,
                        ga,
                        ka,
                        la,
                        ma,
                        na,
                        oa,
                        pa,
                        qa,
                        ra,
                        sa,
                        ta = (g.type || (B ? "top,left" : "x,y")).toLowerCase(),
                        ua = -1 !== ta.indexOf("x") || -1 !== ta.indexOf("y"),
                        va = -1 !== ta.indexOf("rotation"),
                        wa = va ? "rotation" : ua ? "x" : "left",
                        xa = ua ? "y" : "top",
                        ya = -1 !== ta.indexOf("x") || -1 !== ta.indexOf("left") || "scroll" === ta,
                        za = -1 !== ta.indexOf("y") || -1 !== ta.indexOf("top") || "scroll" === ta,
                        Ca = g.minimumMovement || 2,
                        Da = this,
                        Ea = M(g.trigger || g.handle || d),
                        Fa = {},
                        La = 0,
                        Qa = !1,
                        Ta = g.clickableTest || Oa,
                        Ua = 0,
                        Va = function (a) {
                            if (Da.autoScroll && Da.isDragging && (Qa || aa)) {
                                var b,
                                    c,
                                    e,
                                    f,
                                    g,
                                    h,
                                    j,
                                    k,
                                    l = d,
                                    m = 15 * Da.autoScroll;
                                for (
                                    Qa = !1,
                                        L.scrollTop = null != window.pageYOffset ? window.pageYOffset : null != t.scrollTop ? t.scrollTop : s.body.scrollTop,
                                        L.scrollLeft = null != window.pageXOffset ? window.pageXOffset : null != t.scrollLeft ? t.scrollLeft : s.body.scrollLeft,
                                        f = Da.pointerX - L.scrollLeft,
                                        g = Da.pointerY - L.scrollTop;
                                    l && !c;

                                )
                                    (c = X(l.parentNode)),
                                        (b = c ? L : l.parentNode),
                                        (e = c ? { bottom: Math.max(t.clientHeight, window.innerHeight || 0), right: Math.max(t.clientWidth, window.innerWidth || 0), left: 0, top: 0 } : b.getBoundingClientRect()),
                                        (h = j = 0),
                                        za &&
                                            ((k = b._gsMaxScrollY - b.scrollTop),
                                            0 > k
                                                ? (j = k)
                                                : g > e.bottom - 40 && k
                                                ? ((Qa = !0), (j = Math.min(k, (m * (1 - Math.max(0, e.bottom - g) / 40)) | 0)))
                                                : g < e.top + 40 && b.scrollTop && ((Qa = !0), (j = -Math.min(b.scrollTop, (m * (1 - Math.max(0, g - e.top) / 40)) | 0))),
                                            j && (b.scrollTop += j)),
                                        ya &&
                                            ((k = b._gsMaxScrollX - b.scrollLeft),
                                            0 > k
                                                ? (h = k)
                                                : f > e.right - 40 && k
                                                ? ((Qa = !0), (h = Math.min(k, (m * (1 - Math.max(0, e.right - f) / 40)) | 0)))
                                                : f < e.left + 40 && b.scrollLeft && ((Qa = !0), (h = -Math.min(b.scrollLeft, (m * (1 - Math.max(0, f - e.left) / 40)) | 0))),
                                            h && (b.scrollLeft += h)),
                                        c && (h || j) && (window.scrollTo(b.scrollLeft, b.scrollTop), gb(Da.pointerX + h, Da.pointerY + j)),
                                        (l = b);
                            }
                            if (aa) {
                                var n = Da.x,
                                    o = Da.y,
                                    p = 1e-6;
                                p > n && n > -p && (n = 0),
                                    p > o && o > -p && (o = 0),
                                    va
                                        ? ((oa.data.rotation = Da.rotation = n), oa.setRatio(1))
                                        : i
                                        ? (za && i.top(o), ya && i.left(n))
                                        : ua
                                        ? (za && (oa.data.y = o), ya && (oa.data.x = n), oa.setRatio(1))
                                        : (za && (d.style.top = o + "px"), ya && (d.style.left = n + "px")),
                                    !v || a || ra || ((ra = !0), ia(Da, "drag", "onDrag"), (ra = !1));
                            }
                            aa = !1;
                        },
                        Xa = function (a, c) {
                            var e,
                                f = Da.x,
                                g = Da.y;
                            d._gsTransform || (!ua && !va) || b.set(d, { x: "+=0", overwrite: !1 }),
                                ua
                                    ? ((Da.y = d._gsTransform.y), (Da.x = d._gsTransform.x))
                                    : va
                                    ? (Da.x = Da.rotation = d._gsTransform.rotation)
                                    : i
                                    ? ((Da.y = i.top()), (Da.x = i.left()))
                                    : ((Da.y = parseInt(d.style.top, 10) || 0), (Da.x = parseInt(d.style.left, 10) || 0)),
                                (!da && !ea) || c || (da && ((e = da(Da.x)), e !== Da.x && ((Da.x = e), va && (Da.rotation = e))), ea && ((e = ea(Da.y)), e !== Da.y && (Da.y = e))),
                                (f !== Da.x || g !== Da.y) && Va(!0),
                                a || ia(Da, "throwupdate", "onThrowUpdate");
                        },
                        Ya = function () {
                            var a, b, c, e;
                            (u = !1),
                                i
                                    ? (i.calibrate(), (Da.minX = D = -i.maxScrollLeft()), (Da.minY = K = -i.maxScrollTop()), (Da.maxX = x = Da.maxY = G = 0), (u = !0))
                                    : g.bounds &&
                                      ((a = ja(g.bounds, d.parentNode)),
                                      va
                                          ? ((Da.minX = D = a.left), (Da.maxX = x = a.left + a.width), (Da.minY = K = Da.maxY = G = 0))
                                          : void 0 !== g.bounds.maxX || void 0 !== g.bounds.maxY
                                          ? ((a = g.bounds), (Da.minX = D = a.minX), (Da.minY = K = a.minY), (Da.maxX = x = a.maxX), (Da.maxY = G = a.maxY))
                                          : ((b = ja(d, d.parentNode)),
                                            (Da.minX = D = ha(d, wa) + a.left - b.left),
                                            (Da.minY = K = ha(d, xa) + a.top - b.top),
                                            (Da.maxX = x = D + (a.width - b.width)),
                                            (Da.maxY = G = K + (a.height - b.height))),
                                      D > x && ((Da.minX = x), (Da.maxX = x = D), (D = Da.minX)),
                                      K > G && ((Da.minY = G), (Da.maxY = G = K), (K = Da.minY)),
                                      va && ((Da.minRotation = D), (Da.maxRotation = x)),
                                      (u = !0)),
                                g.liveSnap &&
                                    ((c = g.liveSnap === !0 ? g.snap || {} : g.liveSnap),
                                    (e = c instanceof Array || "function" == typeof c),
                                    va
                                        ? ((da = db(e ? c : c.rotation, D, x, 1)), (ea = null))
                                        : (ya && (da = db(e ? c : c.x || c.left || c.scrollLeft, D, x, i ? -1 : 1)), za && (ea = db(e ? c : c.y || c.top || c.scrollTop, K, G, i ? -1 : 1))));
                        },
                        Za = function () {
                            (Da.isThrowing = !1), ia(Da, "throwcomplete", "onThrowComplete");
                        },
                        $a = function () {
                            Da.isThrowing = !1;
                        },
                        _a = function (a, b) {
                            var c, e, h, j;
                            a && f
                                ? (a === !0 &&
                                      ((c = g.snap || {}),
                                      (e = c instanceof Array || "function" == typeof c),
                                      (a = { resistance: (g.throwResistance || g.resistance || 1e3) / (va ? 10 : 1) }),
                                      va
                                          ? (a.rotation = Na(Da, e ? c : c.rotation, x, D, 1, b))
                                          : (ya && (a[wa] = Na(Da, e ? c : c.x || c.left || c.scrollLeft, x, D, i ? -1 : 1, b || "x" === Da.lockedAxis)),
                                            za && (a[xa] = Na(Da, e ? c : c.y || c.top || c.scrollTop, G, K, i ? -1 : 1, b || "y" === Da.lockedAxis)))),
                                  (Da.isThrowing = !0),
                                  (j = isNaN(g.overshootTolerance) ? (1 === g.edgeResistance ? 0 : 1 - Da.edgeResistance + 0.2) : g.overshootTolerance),
                                  (Da.tween = h = f.to(
                                      i || d,
                                      { throwProps: a, ease: g.ease || q.Power3.easeOut, onComplete: Za, onOverwrite: $a, onUpdate: g.fastMode ? ia : Xa, onUpdateParams: g.fastMode ? [Da, "onthrowupdate", "onThrowUpdate"] : w },
                                      isNaN(g.maxDuration) ? 2 : g.maxDuration,
                                      isNaN(g.minDuration) ? (0 === j ? 0 : 0.5) : g.minDuration,
                                      j
                                  )),
                                  g.fastMode ||
                                      (i && (i._suspendTransforms = !0),
                                      h.render(h.duration(), !0, !0),
                                      Xa(!0, !0),
                                      (Da.endX = Da.x),
                                      (Da.endY = Da.y),
                                      va && (Da.endRotation = Da.x),
                                      h.play(0),
                                      Xa(!0, !0),
                                      i && (i._suspendTransforms = !1)))
                                : u && Da.applyBounds();
                        },
                        ab = function (a) {
                            var b,
                                c,
                                e,
                                f,
                                g,
                                h,
                                i,
                                l,
                                m,
                                n = ka || [1, 0, 0, 1, 0, 0];
                            (ka = Aa(d.parentNode, !0)),
                                a &&
                                    Da.isPressed &&
                                    n.join(",") !== ka.join(",") &&
                                    ((b = n[0]),
                                    (c = n[1]),
                                    (e = n[2]),
                                    (f = n[3]),
                                    (g = n[4]),
                                    (h = n[5]),
                                    (i = b * f - c * e),
                                    (l = j * (f / i) + k * (-e / i) + (e * h - f * g) / i),
                                    (m = j * (-c / i) + k * (b / i) + -(b * h - c * g) / i),
                                    (k = l * ka[1] + m * ka[3] + ka[5]),
                                    (j = l * ka[0] + m * ka[2] + ka[4])),
                                ka[1] || ka[2] || 1 != ka[0] || 1 != ka[3] || 0 != ka[4] || 0 != ka[5] || (ka = null);
                        },
                        bb = function () {
                            var a = 1 - Da.edgeResistance;
                            ab(!1),
                                ka && ((j = Da.pointerX * ka[0] + Da.pointerY * ka[2] + ka[4]), (k = Da.pointerX * ka[1] + Da.pointerY * ka[3] + ka[5])),
                                aa && (gb(Da.pointerX, Da.pointerY), Va(!0)),
                                i
                                    ? (Ya(), (r = i.top()), (l = i.left()))
                                    : (cb() ? (Xa(!0, !0), Ya()) : Da.applyBounds(),
                                      va
                                          ? ((Y = Ba(d, { x: 0, y: 0 })), Xa(!0, !0), (l = Da.x), (r = Da.y = Math.atan2(Y.y - Da.pointerY, Da.pointerX - Y.x) * y))
                                          : ((ma = d.parentNode ? d.parentNode.scrollTop || 0 : 0), (na = d.parentNode ? d.parentNode.scrollLeft || 0 : 0), (r = ha(d, xa)), (l = ha(d, wa)))),
                                u && a && (l > x ? (l = x + (l - x) / a) : D > l && (l = D - (D - l) / a), va || (r > G ? (r = G + (r - G) / a) : K > r && (r = K - (K - r) / a)));
                        },
                        cb = function () {
                            return Da.tween && Da.tween.isActive();
                        },
                        db = function (a, b, c, d) {
                            return "function" == typeof a
                                ? function (e) {
                                      var f = Da.isPressed ? 1 - Da.edgeResistance : 1;
                                      return a.call(Da, e > c ? c + (e - c) * f : b > e ? b + (e - b) * f : e) * d;
                                  }
                                : a instanceof Array
                                ? function (d) {
                                      for (var e, f, g = a.length, h = 0, i = z; --g > -1; ) (e = a[g]), (f = e - d), 0 > f && (f = -f), i > f && e >= b && c >= e && ((h = g), (i = f));
                                      return a[h];
                                  }
                                : isNaN(a)
                                ? function (a) {
                                      return a;
                                  }
                                : function () {
                                      return a * d;
                                  };
                        },
                        eb = function (a) {
                            var c;
                            if (!(!h || Da.isPressed || !a || (("mousedown" === a.type || "pointerdown" === a.type) && A() - Ua < 30 && Ha[Da.pointerEvent.type]))) {
                                if (
                                    ((la = cb()),
                                    (Da.pointerEvent = a),
                                    Ha[a.type]
                                        ? ((ga = -1 !== a.type.indexOf("touch") ? a.currentTarget || a.target : s), Ia(ga, "touchend", hb), Ia(ga, "touchmove", fb), Ia(ga, "touchcancel", hb), Ia(s, "touchstart", Ma))
                                        : ((ga = null), Ia(s, "mousemove", fb)),
                                    (qa = null),
                                    Ia(s, "mouseup", hb),
                                    a && a.target && Ia(a.target, "mouseup", hb),
                                    (fa = Ta.call(Da, a.target) && !g.dragClickables))
                                )
                                    return Ia(a.target, "change", hb), ia(Da, "press", "onPress"), void Pa(Ea, !0);
                                if (
                                    ((pa = !ga || ya === za || i || Da.vars.allowNativeTouchScrolling === !1 ? !1 : ya ? "y" : "x"),
                                    B ? (a = $(a, !0)) : pa || Da.allowEventDefault || (a.preventDefault(), a.preventManipulation && a.preventManipulation()),
                                    a.changedTouches ? ((a = T = a.changedTouches[0]), (U = a.identifier)) : a.pointerId ? (U = a.pointerId) : (T = U = null),
                                    H++,
                                    P(Va),
                                    (k = Da.pointerY = a.pageY),
                                    (j = Da.pointerX = a.pageX),
                                    (pa || Da.autoScroll) && Z(d.parentNode),
                                    !Da.autoScroll || va || i || !d.parentNode || d.getBBox || !d.parentNode._gsMaxScrollX || C.parentNode || ((C.style.width = d.parentNode.scrollWidth + "px"), d.parentNode.appendChild(C)),
                                    bb(),
                                    Da.tween && Da.tween.kill(),
                                    (Da.isThrowing = !1),
                                    b.killTweensOf(i || d, !0, Fa),
                                    i && b.killTweensOf(d, !0, { scrollTo: 1 }),
                                    (Da.tween = Da.lockedAxis = null),
                                    (g.zIndexBoost || (!va && !i && g.zIndexBoost !== !1)) && (d.style.zIndex = Sa.zIndex++),
                                    (Da.isPressed = !0),
                                    (v = !(!g.onDrag && !Da._listeners.drag)),
                                    !va)
                                )
                                    for (c = Ea.length; --c > -1; ) ba(Ea[c], "cursor", g.cursor || "move");
                                ia(Da, "press", "onPress");
                            }
                        },
                        fb = function (a) {
                            var b,
                                c,
                                d,
                                f,
                                g = a;
                            if (h && !e && Da.isPressed && a) {
                                if (((Da.pointerEvent = a), (b = a.changedTouches))) {
                                    if (((a = b[0]), a !== T && a.identifier !== U)) {
                                        for (f = b.length; --f > -1 && (a = b[f]).identifier !== U; );
                                        if (0 > f) return;
                                    }
                                } else if (a.pointerId && U && a.pointerId !== U) return;
                                if (B) a = $(a, !0);
                                else {
                                    if (
                                        ga &&
                                        pa &&
                                        !qa &&
                                        ((c = a.pageX),
                                        (d = a.pageY),
                                        ka && ((f = c * ka[0] + d * ka[2] + ka[4]), (d = c * ka[1] + d * ka[3] + ka[5]), (c = f)),
                                        (qa = Math.abs(c - j) > Math.abs(d - k) && ya ? "x" : "y"),
                                        Da.vars.lockAxisOnTouchScroll !== !1 && ((Da.lockedAxis = "x" === qa ? "y" : "x"), "function" == typeof Da.vars.onLockAxis && Da.vars.onLockAxis.call(Da, g)),
                                        I && pa === qa)
                                    )
                                        return void hb(g);
                                    Da.allowEventDefault || (pa && (!qa || pa === qa)) || g.cancelable === !1 || (g.preventDefault(), g.preventManipulation && g.preventManipulation());
                                }
                                Da.autoScroll && (Qa = !0), gb(a.pageX, a.pageY);
                            }
                        },
                        gb = function (a, b) {
                            var c,
                                d,
                                e,
                                f,
                                g,
                                h,
                                i = 1 - Da.dragResistance,
                                m = 1 - Da.edgeResistance;
                            (Da.pointerX = a),
                                (Da.pointerY = b),
                                va
                                    ? ((f = Math.atan2(Y.y - b, a - Y.x) * y), (g = Da.y - f), (Da.y = f), g > 180 ? (r -= 360) : -180 > g && (r += 360), (e = l + (r - f) * i))
                                    : (ka && ((h = a * ka[0] + b * ka[2] + ka[4]), (b = a * ka[1] + b * ka[3] + ka[5]), (a = h)),
                                      (d = b - k),
                                      (c = a - j),
                                      Ca > d && d > -Ca && (d = 0),
                                      Ca > c && c > -Ca && (c = 0),
                                      (Da.lockAxis || Da.lockedAxis) &&
                                          (c || d) &&
                                          ((h = Da.lockedAxis),
                                          h || ((Da.lockedAxis = h = ya && Math.abs(c) > Math.abs(d) ? "y" : za ? "x" : null), h && "function" == typeof Da.vars.onLockAxis && Da.vars.onLockAxis.call(Da, Da.pointerEvent)),
                                          "y" === h ? (d = 0) : "x" === h && (c = 0)),
                                      (e = l + c * i),
                                      (f = r + d * i)),
                                da || ea ? (da && (e = da(e)), ea && (f = ea(f))) : u && (e > x ? (e = x + (e - x) * m) : D > e && (e = D + (e - D) * m), va || (f > G ? (f = G + (f - G) * m) : K > f && (f = K + (f - K) * m))),
                                va || ((e = Math.round(e)), (f = Math.round(f))),
                                (Da.x !== e || (Da.y !== f && !va)) &&
                                    (va ? (Da.endRotation = Da.x = Da.endX = e) : (za && (Da.y = Da.endY = f), ya && (Da.x = Da.endX = e)),
                                    (aa = !0),
                                    !Da.isDragging && Da.isPressed && ((Da.isDragging = !0), ia(Da, "dragstart", "onDragStart")));
                        },
                        hb = function (a, c) {
                            if (h && Da.isPressed && (!a || null == U || c || !((a.pointerId && a.pointerId !== U) || (a.changedTouches && !Ka(a.changedTouches, U))))) {
                                Da.isPressed = !1;
                                var e,
                                    f,
                                    i,
                                    j,
                                    k = a,
                                    l = Da.isDragging;
                                if (
                                    (ga ? (Ja(ga, "touchend", hb), Ja(ga, "touchmove", fb), Ja(ga, "touchcancel", hb), Ja(s, "touchstart", Ma)) : Ja(s, "mousemove", fb),
                                    Ja(s, "mouseup", hb),
                                    a && a.target && Ja(a.target, "mouseup", hb),
                                    (aa = !1),
                                    C.parentNode && C.parentNode.removeChild(C),
                                    fa)
                                )
                                    return a && Ja(a.target, "change", hb), Pa(Ea, !1), ia(Da, "release", "onRelease"), ia(Da, "click", "onClick"), void (fa = !1);
                                if ((Q(Va), !va)) for (f = Ea.length; --f > -1; ) ba(Ea[f], "cursor", g.cursor || "move");
                                if ((l && ((La = J = A()), (Da.isDragging = !1)), H--, a)) {
                                    if ((B && (a = $(a, !1)), (e = a.changedTouches), e && ((a = e[0]), a !== T && a.identifier !== U))) {
                                        for (f = e.length; --f > -1 && (a = e[f]).identifier !== U; );
                                        if (0 > f) return;
                                    }
                                    (Da.pointerEvent = k), (Da.pointerX = a.pageX), (Da.pointerY = a.pageY);
                                }
                                return (
                                    k && !l
                                        ? (la && (g.snap || g.bounds) && _a(g.throwProps),
                                          ia(Da, "release", "onRelease"),
                                          (I && "touchmove" === k.type) ||
                                              (ia(Da, "click", "onClick"),
                                              (j = k.target || k.srcElement || d),
                                              (Ua = A()),
                                              b.delayedCall(1e-5, function () {
                                                  Ua !== sa &&
                                                      Da.enabled() &&
                                                      !Da.isPressed &&
                                                      (j.click
                                                          ? j.click()
                                                          : s.createEvent &&
                                                            ((i = s.createEvent("MouseEvents")),
                                                            i.initMouseEvent("click", !0, !0, window, 1, Da.pointerEvent.screenX, Da.pointerEvent.screenY, Da.pointerX, Da.pointerY, !1, !1, !1, !1, 0, null),
                                                            j.dispatchEvent(i)));
                                              })))
                                        : (_a(g.throwProps),
                                          B ||
                                              Da.allowEventDefault ||
                                              !k ||
                                              (!g.dragClickables && Ta.call(Da, k.target)) ||
                                              !l ||
                                              (pa && (!qa || pa !== qa)) ||
                                              k.cancelable === !1 ||
                                              (k.preventDefault(), k.preventManipulation && k.preventManipulation()),
                                          ia(Da, "release", "onRelease")),
                                    l && ia(Da, "dragend", "onDragEnd"),
                                    !0
                                );
                            }
                        },
                        ib = function (a) {
                            if (a && Da.isDragging) {
                                var b = a.target || a.srcElement || d.parentNode,
                                    c = b.scrollLeft - b._gsScrollX,
                                    e = b.scrollTop - b._gsScrollY;
                                (c || e) && (ka ? ((j -= c * ka[0] + e * ka[2]), (k -= e * ka[3] + c * ka[1])) : ((j -= c), (k -= e)), (b._gsScrollX += c), (b._gsScrollY += e), gb(Da.pointerX, Da.pointerY));
                            }
                        },
                        jb = function (a) {
                            var b = A(),
                                c = 40 > b - Ua,
                                d = 40 > b - La;
                            return c && sa !== Ua
                                ? void (sa = Ua)
                                : void (
                                      (Da.isPressed || d || c) &&
                                      (a.preventDefault ? (a.preventDefault(), (c || (d && Da.vars.suppressClickOnDrag !== !1)) && a.stopImmediatePropagation()) : (a.returnValue = !1), a.preventManipulation && a.preventManipulation())
                                  );
                        };
                    (ca = Sa.get(this.target)),
                        ca && ca.kill(),
                        (this.startDrag = function (a) {
                            eb(a), Da.isDragging || ((Da.isDragging = !0), ia(Da, "dragstart", "onDragStart"));
                        }),
                        (this.drag = fb),
                        (this.endDrag = function (a) {
                            hb(a, !0);
                        }),
                        (this.timeSinceDrag = function () {
                            return Da.isDragging ? 0 : (A() - La) / 1e3;
                        }),
                        (this.hitTest = function (a, b) {
                            return Sa.hitTest(Da.target, a, b);
                        }),
                        (this.getDirection = function (a, b) {
                            var c,
                                d,
                                e,
                                g,
                                h,
                                i,
                                j = "velocity" === a && f ? a : "object" != typeof a || va ? "start" : "element";
                            return (
                                "element" === j && ((h = Wa(Da.target)), (i = Wa(a))),
                                (c = "start" === j ? Da.x - l : "velocity" === j ? f.getVelocity(this.target, wa) : h.left + h.width / 2 - (i.left + i.width / 2)),
                                va
                                    ? 0 > c
                                        ? "counter-clockwise"
                                        : "clockwise"
                                    : ((b = b || 2),
                                      (d = "start" === j ? Da.y - r : "velocity" === j ? f.getVelocity(this.target, xa) : h.top + h.height / 2 - (i.top + i.height / 2)),
                                      (e = Math.abs(c / d)),
                                      (g = 1 / b > e ? "" : 0 > c ? "left" : "right"),
                                      b > e && ("" !== g && (g += "-"), (g += 0 > d ? "up" : "down")),
                                      g)
                            );
                        }),
                        (this.applyBounds = function (a) {
                            var b, c, e, f, h, i;
                            if (a && g.bounds !== a) return (g.bounds = a), Da.update(!0);
                            if ((Xa(!0), Ya(), u)) {
                                if (
                                    ((b = Da.x),
                                    (c = Da.y),
                                    b > x ? (b = x) : D > b && (b = D),
                                    c > G ? (c = G) : K > c && (c = K),
                                    (Da.x !== b || Da.y !== c) && ((e = !0), (Da.x = Da.endX = b), va ? (Da.endRotation = b) : (Da.y = Da.endY = c), (aa = !0), Va(!0), Da.autoScroll && !Da.isDragging))
                                )
                                    for (
                                        Z(d.parentNode),
                                            f = d,
                                            L.scrollTop = null != window.pageYOffset ? window.pageYOffset : null != t.scrollTop ? t.scrollTop : s.body.scrollTop,
                                            L.scrollLeft = null != window.pageXOffset ? window.pageXOffset : null != t.scrollLeft ? t.scrollLeft : s.body.scrollLeft;
                                        f && !i;

                                    )
                                        (i = X(f.parentNode)),
                                            (h = i ? L : f.parentNode),
                                            za && h.scrollTop > h._gsMaxScrollY && (h.scrollTop = h._gsMaxScrollY),
                                            ya && h.scrollLeft > h._gsMaxScrollX && (h.scrollLeft = h._gsMaxScrollX),
                                            (f = h);
                                Da.isThrowing && (e || Da.endX > x || Da.endX < D || Da.endY > G || Da.endY < K) && _a(g.throwProps, e);
                            }
                            return Da;
                        }),
                        (this.update = function (a, b, c) {
                            var e = Da.x,
                                f = Da.y;
                            return (
                                ab(!b),
                                a ? Da.applyBounds() : (aa && c && Va(!0), Xa(!0)),
                                gb(Da.pointerX, Da.pointerY),
                                aa && Va(!0),
                                Da.isPressed && !b && ((ya && Math.abs(e - Da.x) > 0.01) || (za && Math.abs(f - Da.y) > 0.01 && !va)) && bb(),
                                Da.autoScroll && (Z(d.parentNode), (Qa = Da.isDragging), Va(!0)),
                                Da.autoScroll && (W(d, ib), V(d, ib)),
                                Da
                            );
                        }),
                        (this.enable = function (a) {
                            var e, j, k;
                            if ("soft" !== a) {
                                for (j = Ea.length; --j > -1; )
                                    (k = Ea[j]),
                                        Ia(k, "mousedown", eb),
                                        Ia(k, "touchstart", eb),
                                        Ia(k, "click", jb, !0),
                                        va || ba(k, "cursor", g.cursor || "move"),
                                        ba(k, "touchCallout", "none"),
                                        ba(k, "touchAction", ya === za || i ? "none" : ya ? "pan-y" : "pan-x");
                                Pa(Ea, !1);
                            }
                            return (
                                V(d, ib),
                                (h = !0),
                                f && "soft" !== a && f.track(i || d, ua ? "x,y" : va ? "rotation" : "top,left"),
                                i && i.enable(),
                                (d._gsDragID = e = "d" + F++),
                                (E[e] = this),
                                i && (i.element._gsDragID = e),
                                b.set(d, { x: "+=0", overwrite: !1 }),
                                (oa = {
                                    t: d,
                                    data: B ? R : d._gsTransform,
                                    tween: {},
                                    setRatio: B
                                        ? function () {
                                              b.set(d, O);
                                          }
                                        : c._internals.setTransformRatio || c._internals.set3DTransformRatio,
                                }),
                                bb(),
                                Da.update(!0),
                                Da
                            );
                        }),
                        (this.disable = function (a) {
                            var b,
                                c,
                                e = Da.isDragging;
                            if (!va) for (b = Ea.length; --b > -1; ) ba(Ea[b], "cursor", null);
                            if ("soft" !== a) {
                                for (b = Ea.length; --b > -1; ) (c = Ea[b]), ba(c, "touchCallout", null), ba(c, "touchAction", null), Ja(c, "mousedown", eb), Ja(c, "touchstart", eb), Ja(c, "click", jb);
                                Pa(Ea, !0), ga && (Ja(ga, "touchcancel", hb), Ja(ga, "touchend", hb), Ja(ga, "touchmove", fb)), Ja(s, "mouseup", hb), Ja(s, "mousemove", fb);
                            }
                            return (
                                W(d, ib),
                                (h = !1),
                                f && "soft" !== a && f.untrack(i || d, ua ? "x,y" : va ? "rotation" : "top,left"),
                                i && i.disable(),
                                Q(Va),
                                (Da.isDragging = Da.isPressed = fa = !1),
                                e && ia(Da, "dragend", "onDragEnd"),
                                Da
                            );
                        }),
                        (this.enabled = function (a, b) {
                            return arguments.length ? (a ? Da.enable(b) : Da.disable(b)) : h;
                        }),
                        (this.kill = function () {
                            return (Da.isThrowing = !1), b.killTweensOf(i || d, !0, Fa), Da.disable(), delete E[d._gsDragID], Da;
                        }),
                        -1 !== ta.indexOf("scroll") &&
                            ((i = this.scrollProxy = new Ra(
                                d,
                                S(
                                    {
                                        onKill: function () {
                                            Da.isPressed && hb(null);
                                        },
                                    },
                                    g
                                )
                            )),
                            (d.style.overflowY = za && !Ga ? "auto" : "hidden"),
                            (d.style.overflowX = ya && !Ga ? "auto" : "hidden"),
                            (d = i.content)),
                        g.force3D !== !1 && b.set(d, { force3D: !0 }),
                        va ? (Fa.rotation = 1) : (ya && (Fa[wa] = 1), za && (Fa[xa] = 1)),
                        va ? ((O = p), (R = O.css), (O.overwrite = !1)) : ua && ((O = ya && za ? m : ya ? n : o), (R = O.css), (O.overwrite = !1)),
                        this.enable();
                },
                Ta = (Sa.prototype = new a());
            (Ta.constructor = Sa),
                (Ta.pointerX = Ta.pointerY = 0),
                (Ta.isDragging = Ta.isPressed = !1),
                (Sa.version = "0.14.7"),
                (Sa.zIndex = 1e3),
                Ia(s, "touchcancel", function () {}),
                Ia(s, "contextmenu", function (a) {
                    var b;
                    for (b in E) E[b].isPressed && E[b].endDrag();
                }),
                (Sa.create = function (a, c) {
                    "string" == typeof a && (a = b.selector(a));
                    for (var d = a && 0 !== a.length ? (Ea(a) ? Fa(a) : [a]) : [], e = d.length; --e > -1; ) d[e] = new Sa(d[e], c);
                    return d;
                }),
                (Sa.get = function (a) {
                    return E[(_(a) || {})._gsDragID];
                }),
                (Sa.timeSinceDrag = function () {
                    return (A() - J) / 1e3;
                });
            var Ua = {},
                Va = function (a) {
                    var b,
                        c,
                        d = 0,
                        e = 0;
                    for (a = _(a), b = a.offsetWidth, c = a.offsetHeight; a; ) (d += a.offsetTop), (e += a.offsetLeft), (a = a.offsetParent);
                    return { top: d, left: e, width: b, height: c };
                },
                Wa = function (a, b) {
                    if (a === window)
                        return (
                            (Ua.left = Ua.top = 0),
                            (Ua.width = Ua.right = t.clientWidth || a.innerWidth || s.body.clientWidth || 0),
                            (Ua.height = Ua.bottom = (a.innerHeight || 0) - 20 < t.clientHeight ? t.clientHeight : a.innerHeight || s.body.clientHeight || 0),
                            Ua
                        );
                    var c = a.pageX !== b ? { left: a.pageX - U(), top: a.pageY - T(), right: a.pageX - U() + 1, bottom: a.pageY - T() + 1 } : a.nodeType || a.left === b || a.top === b ? (B ? Va(a) : _(a).getBoundingClientRect()) : a;
                    return (
                        c.right === b && c.width !== b
                            ? ((c.right = c.left + c.width), (c.bottom = c.top + c.height))
                            : c.width === b && (c = { width: c.right - c.left, height: c.bottom - c.top, right: c.right, left: c.left, bottom: c.bottom, top: c.top }),
                        c
                    );
                };
            return (
                (Sa.hitTest = function (a, b, c) {
                    if (a === b) return !1;
                    var d,
                        e,
                        f,
                        g = Wa(a),
                        h = Wa(b),
                        i = h.left > g.right || h.right < g.left || h.top > g.bottom || h.bottom < g.top;
                    return i || !c
                        ? !i
                        : ((f = -1 !== (c + "").indexOf("%")),
                          (c = parseFloat(c) || 0),
                          (d = { left: Math.max(g.left, h.left), top: Math.max(g.top, h.top) }),
                          (d.width = Math.min(g.right, h.right) - d.left),
                          (d.height = Math.min(g.bottom, h.bottom) - d.top),
                          d.width < 0 || d.height < 0 ? !1 : f ? ((c *= 0.01), (e = d.width * d.height), e >= g.width * g.height * c || e >= h.width * h.height * c) : d.width > c && d.height > c);
                }),
                (C.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;"),
                Sa
            );
        },
        !0
    );
}),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    (function (a) {
        "use strict";
        var b = function () {
            return (_gsScope.GreenSockGlobals || _gsScope)[a];
        };
        "function" == typeof define && define.amd
            ? define(["../TweenLite", "../plugins/CSSPlugin"], b)
            : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), require("../plugins/CSSPlugin.js"), (module.exports = b()));
    })("Draggable");
