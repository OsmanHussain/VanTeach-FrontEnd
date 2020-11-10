(function() {
    /* 
     
     Copyright The Closure Library Authors. 
     SPDX-License-Identifier: Apache-2.0 
    */
    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var k = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }
    var n = ba(this),
        ca = "function" === typeof Symbol && "symbol" === typeof Symbol("x"),
        p = {},
        da = {};

    function q(a, b) {
        var c = da[b];
        if (null == c) return a[b];
        c = a[c];
        return void 0 !== c ? c : a[b]
    }

    function r(a, b, c) {
        if (b) a: {
            var d = a.split(".");a = 1 === d.length;
            var e = d[0],
                f;!a && e in p ? f = p : f = n;
            for (e = 0; e < d.length - 1; e++) {
                var g = d[e];
                if (!(g in f)) break a;
                f = f[g]
            }
            d = d[d.length - 1];c = ca && "es6" === c ? f[d] : null;b = b(c);null != b && (a ? k(p, d, {
                configurable: !0,
                writable: !0,
                value: b
            }) : b !== c && (da[d] = ca ? n.Symbol(d) : "$jscp$" + d, d = da[d], k(f, d, {
                configurable: !0,
                writable: !0,
                value: b
            })))
        }
    }
    r("String.prototype.endsWith", function(a) {
        return a ? a : function(b, c) {
            if (null == this) throw new TypeError("The 'this' value for String.prototype.endsWith must not be null or undefined");
            if (b instanceof RegExp) throw new TypeError("First argument to String.prototype.endsWith must not be a regular expression");
            void 0 === c && (c = this.length);
            c = Math.max(0, Math.min(c | 0, this.length));
            for (var d = b.length; 0 < d && 0 < c;)
                if (this[--c] != b[--d]) return !1;
            return 0 >= d
        }
    }, "es6");
    r("Symbol", function(a) {
        function b(e) {
            if (this instanceof b) throw new TypeError("Symbol is not a constructor");
            return new c("jscomp_symbol_" + (e || "") + "_" + d++, e)
        }

        function c(e, f) {
            this.a = e;
            k(this, "description", {
                configurable: !0,
                writable: !0,
                value: f
            })
        }
        if (a) return a;
        c.prototype.toString = function() {
            return this.a
        };
        var d = 0;
        return b
    }, "es6");
    r("Symbol.iterator", function(a) {
        if (a) return a;
        a = (0, p.Symbol)("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = n[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && k(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ea(aa(this))
                }
            })
        }
        return a
    }, "es6");

    function ea(a) {
        a = {
            next: a
        };
        a[q(p.Symbol, "iterator")] = function() {
            return this
        };
        return a
    }

    function fa(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[q(p.Symbol, "iterator")] = function() {
            return e
        };
        return e
    }
    r("Array.prototype.values", function(a) {
        return a ? a : function() {
            return fa(this, function(b, c) {
                return c
            })
        }
    }, "es8");
    r("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
            return c
        }
    }, "es8");
    r("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return fa(this, function(b) {
                return b
            })
        }
    }, "es6");
    var t = this || self,
        ha = /^[\w+/_-]+[=]{0,2}$/,
        ia = null;

    function ja(a) {
        return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && ha.test(a) ? a : ""
    }

    function ka(a) {
        return a
    };

    function x(a) {
        a = parseFloat(a);
        return isNaN(a) || 1 < a || 0 > a ? 0 : a
    };

    function la(a) {
        var b = !1,
            c;
        return function() {
            b || (c = a(), b = !0);
            return c
        }
    };
    var ma = Array.prototype.some ? function(a, b) {
        return Array.prototype.some.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) return !0;
        return !1
    };
    var y;

    function na(a, b) {
        this.a = b === oa ? a : ""
    }
    var oa = {};

    function pa(a) {
        if (void 0 === y) {
            var b = null;
            var c = t.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {
                        createHTML: ka,
                        createScript: ka,
                        createScriptURL: ka
                    })
                } catch (d) {
                    t.console && t.console.error(d.message)
                }
                y = b
            } else y = b
        }
        a = (b = y) ? b.createScriptURL(a) : a;
        return new na(a, oa)
    };
    var z;
    a: {
        var qa = t.navigator;
        if (qa) {
            var sa = qa.userAgent;
            if (sa) {
                z = sa;
                break a
            }
        }
        z = ""
    };

    function ta(a, b) {
        a.src = b instanceof na && b.constructor === na ? b.a : "type_error:TrustedResourceUrl";
        (b = a.ownerDocument && a.ownerDocument.defaultView) && b != t ? b = ja(b.document) : (null === ia && (ia = ja(t.document)), b = ia);
        b && a.setAttribute("nonce", b)
    };

    function ua(a) {
        ua[" "](a);
        return a
    }
    ua[" "] = function() {};

    function va(a) {
        var b = document;
        a = String(a);
        "application/xhtml+xml" === b.contentType && (a = a.toLowerCase());
        return b.createElement(a)
    };
    var wa = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

    function xa(a) {
        var b = a.match(wa);
        a = b[5];
        var c = b[6];
        b = b[7];
        var d = "";
        a && (d += a);
        c && (d += "?" + c);
        b && (d += "#" + b);
        return d
    }

    function A(a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
            var f = a.charCodeAt(b - 1);
            if (38 == f || 63 == f)
                if (f = a.charCodeAt(b + e), !f || 61 == f || 38 == f || 35 == f) return b;
            b += e + 1
        }
        return -1
    }
    var B = /#|$/;

    function C(a, b) {
        var c = a.search(B),
            d = A(a, 0, b, c);
        if (0 > d) return null;
        var e = a.indexOf("&", d);
        if (0 > e || e > c) e = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "))
    }
    var ya = /[?&]($|#)/;

    function D(a, b, c) {
        for (var d = a.search(B), e = 0, f, g = []; 0 <= (f = A(a, e, b, d));) g.push(a.substring(e, f)), e = Math.min(a.indexOf("&", f) + 1 || d, d);
        g.push(a.substr(e));
        a = g.join("").replace(ya, "$1");
        c = null != c ? "=" + encodeURIComponent(String(c)) : "";
        (b += c) ? (c = a.indexOf("#"), 0 > c && (c = a.length), d = a.indexOf("?"), 0 > d || d > c ? (d = c, e = "") : e = a.substring(d + 1, c), c = [a.substr(0, d), e, a.substr(c)], a = c[1], c[1] = b ? a ? a + "&" + b : b : a, b = c[0] + (c[1] ? "?" + c[1] : "") + c[2]) : b = a;
        return b
    };

    function za() {
        if (!t.crypto) return Math.random();
        try {
            var a = new Uint32Array(1);
            t.crypto.getRandomValues(a);
            return a[0] / 65536 / 65536
        } catch (b) {
            return Math.random()
        }
    }

    function Aa(a, b) {
        if (a)
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
    }
    var Ca = la(function() {
            return ma(["Google Web Preview", "Mediapartners-Google", "Google-Read-Aloud", "Google-Adwords"], Ba) || 1E-4 > Math.random()
        }),
        Da = la(function() {
            return -1 != z.indexOf("MSIE")
        });

    function Ba(a) {
        return -1 != z.indexOf(a)
    }

    function E(a) {
        return /^true$/.test(a)
    };
    var Ea = x("0.20"),
        Fa = x("0.002"),
        Ga = x("0.00"),
        Ha = x("0.00"),
        Ia = x("1"),
        Ja = E("true"),
        Ka = E("true"),
        La = E("true"),
        Ma = E("true"),
        Na = E("true");
    var F = null;

    function Oa() {
        if (null === F) {
            F = "";
            try {
                var a = "";
                try {
                    a = t.top.location.hash
                } catch (c) {
                    a = t.location.hash
                }
                if (a) {
                    var b = a.match(/\bdeid=([\d,]+)/);
                    F = b ? b[1] : ""
                }
            } catch (c) {}
        }
        return F
    }

    function Pa(a, b) {
        var c;
        c = (c = Oa()) ? (c = c.match(new RegExp("\\b(" + a.join("|") + ")\\b"))) ? c[0] : null : null;
        if (c) a = c;
        else a: {
            if (!Da() && !Ca() && (c = Math.random(), c < b)) {
                c = za();
                a = a[Math.floor(c * a.length)];
                break a
            }
            a = null
        }
        return a
    }

    function Qa(a, b, c) {
        "" != b && (c ? a.a.hasOwnProperty(c) && (a.a[c] = b) : a.b[b] = !0)
    }

    function G(a, b, c) {
        var d = H;
        (c ? d.a.hasOwnProperty(c) && "" == d.a[c] : 1) && (a = Pa(a, b)) && Qa(d, a, c)
    }

    function I(a) {
        var b = H;
        return b.a.hasOwnProperty(a) ? b.a[a] : ""
    }

    function Ra() {
        var a = H,
            b = [];
        Aa(a.b, function(c, d) {
            b.push(d)
        });
        Aa(a.a, function(c) {
            "" != c && b.push(c)
        });
        return b
    };
    var Sa = {
            s: 2,
            D: 13,
            C: 14,
            v: 16,
            u: 17
        },
        H = null;

    function Ta() {
        if (H) {
            var a = Pa(["910057690", "910057691"], Ia);
            a ? Qa(H, a, 17) : Qa(H, "910057692", 17)
        }
    }

    function Ua() {
        return !!H && "592230571" == I(16)
    };
    var J = window,
        Va = document;
    var Wa = {};

    function K(a) {
        Wa.TAGGING = Wa.TAGGING || [];
        Wa.TAGGING[a] = !0
    };

    function Xa(a, b) {
        if (Array.prototype.indexOf) return a = a.indexOf(b), "number" == typeof a ? a : -1;
        for (var c = 0; c < a.length; c++)
            if (a[c] === b) return c;
        return -1
    }

    function Ya(a, b) {
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
    };
    var Za = {};

    function L(a) {
        return void 0 == Za[a] ? !1 : Za[a]
    };
    var M = [];

    function N() {
        var a = {};
        var b = J.google_tag_data;
        J.google_tag_data = void 0 === b ? a : b;
        a = J.google_tag_data;
        a.ics || (a.ics = {
            entries: {},
            set: $a,
            update: ab,
            addListener: bb,
            notifyListeners: cb,
            active: !1
        });
        return a.ics
    }

    function $a(a, b, c, d, e, f) {
        var g = N();
        g.active = !0;
        if (void 0 != b) {
            var h = g.entries;
            g = h[a] || {};
            var l = g.region;
            c = c && "string" == typeof c ? c.toUpperCase() : void 0;
            d = d.toUpperCase();
            e = e.toUpperCase();
            if (c === e || (c === d ? l !== e : !c && !l)) {
                d = !!(f && 0 < f && void 0 === g.update);
                var m = {
                    region: c,
                    initial: "granted" === b,
                    update: g.update,
                    quiet: d
                };
                h[a] = m;
                d && J.setTimeout(function() {
                    h[a] === m && m.quiet && (m.quiet = !1, db(a), cb(), K(2))
                }, f)
            }
        }
    }

    function ab(a, b) {
        var c = N();
        c.active = !0;
        if (void 0 != b) {
            var d = O(a);
            c = c.entries;
            c = c[a] = c[a] || {};
            c.update = "granted" === b;
            b = O(a);
            c.quiet ? (c.quiet = !1, db(a)) : b !== d && db(a)
        }
    }

    function bb(a, b) {
        M.push({
            g: a,
            i: b
        })
    }

    function db(a) {
        for (var b = 0; b < M.length; ++b) {
            var c = M[b];
            "[object Array]" == Object.prototype.toString.call(Object(c.g)) && -1 !== c.g.indexOf(a) && (c.h = !0)
        }
    }

    function cb(a) {
        for (var b = 0; b < M.length; ++b) {
            var c = M[b];
            if (c.h) {
                c.h = !1;
                try {
                    c.i({
                        F: a
                    })
                } catch (d) {}
            }
        }
    }

    function O(a) {
        a = N().entries[a] || {};
        return void 0 !== a.update ? a.update : void 0 !== a.initial ? a.initial : void 0
    }

    function eb(a) {
        return !(N().entries[a] || {}).quiet
    }

    function fb() {
        return L("gtag_cs_api") ? N().active : !1
    }

    function gb(a, b) {
        N().addListener(a, b)
    }

    function hb(a) {
        function b() {
            for (var e = 0; e < c.length; e++)
                if (!eb(c[e])) return !0;
            return !1
        }
        var c = ["ad_storage"];
        if (b()) {
            var d = !1;
            gb(c, function(e) {
                d || b() || (d = !0, a(e))
            })
        } else a({})
    }

    function ib(a) {
        if (!1 === O("ad_storage")) {
            var b = !1;
            gb(["ad_storage"], function(c) {
                !b && O("ad_storage") && (a(c), b = !0)
            })
        }
    };
    var jb = /:[0-9]+$/;

    function kb(a, b) {
        a = a.split("&");
        for (var c = 0; c < a.length; c++) {
            var d = a[c].split("=");
            if (decodeURIComponent(d[0]).replace(/\+/g, " ") === b) return decodeURIComponent(d.slice(1).join("=")).replace(/\+/g, " ")
        }
    }

    function lb(a, b) {
        var c = "query";
        if ("protocol" === c || "port" === c) a.protocol = mb(a.protocol) || mb(J.location.protocol);
        "port" === c ? a.port = String(Number(a.hostname ? a.port : J.location.port) || ("http" == a.protocol ? 80 : "https" == a.protocol ? 443 : "")) : "host" === c && (a.hostname = (a.hostname || J.location.hostname).replace(jb, "").toLowerCase());
        var d = mb(a.protocol);
        c && (c = String(c).toLowerCase());
        switch (c) {
            case "url_no_fragment":
                b = "";
                a && a.href && (b = a.href.indexOf("#"), b = 0 > b ? a.href : a.href.substr(0, b));
                a = b;
                break;
            case "protocol":
                a =
                    d;
                break;
            case "host":
                a = a.hostname.replace(jb, "").toLowerCase();
                break;
            case "port":
                a = String(Number(a.port) || ("http" == d ? 80 : "https" == d ? 443 : ""));
                break;
            case "path":
                a.pathname || a.hostname || K(1);
                a = "/" == a.pathname.charAt(0) ? a.pathname : "/" + a.pathname;
                a = a.split("/");
                0 <= Xa([], a[a.length - 1]) && (a[a.length - 1] = "");
                a = a.join("/");
                break;
            case "query":
                a = a.search.replace("?", "");
                b && (a = kb(a, b));
                break;
            case "extension":
                a = a.pathname.split(".");
                a = 1 < a.length ? a[a.length - 1] : "";
                a = a.split("/")[0];
                break;
            case "fragment":
                a = a.hash.replace("#",
                    "");
                break;
            default:
                a = a && a.href
        }
        return a
    }

    function mb(a) {
        return a ? a.replace(":", "").toLowerCase() : ""
    };

    function nb(a, b, c, d) {
        if (ob(d)) {
            d = [];
            b = String(b || document.cookie).split(";");
            for (var e = 0; e < b.length; e++) {
                var f = b[e].split("="),
                    g = f[0].replace(/^\s*|\s*$/g, "");
                g && g == a && ((f = f.slice(1).join("=").replace(/^\s*|\s*$/g, "")) && c && (f = decodeURIComponent(f)), d.push(f))
            }
            a = d
        } else a = [];
        return a
    }

    function pb(a, b, c, d) {
        var e = document.cookie;
        document.cookie = a;
        a = document.cookie;
        return e != a || void 0 != c && 0 <= nb(b, a, !1, d).indexOf(c)
    }

    function qb(a, b, c) {
        function d(u, v, ra) {
            if (null == ra) return delete g[v], u;
            g[v] = ra;
            return u + "; " + v + "=" + ra
        }

        function e(u, v) {
            if (null == v) return delete g[v], u;
            g[v] = !0;
            return u + "; " + v
        }
        if (ob(c.c)) {
            if (void 0 == b) var f = a + "=deleted; expires=" + (new Date(0)).toUTCString();
            else c.encode && (b = encodeURIComponent(b)), b = rb(b), f = a + "=" + b;
            var g = {};
            f = d(f, "path", c.path);
            if (c.expires instanceof Date) var h = c.expires.toUTCString();
            else null != c.expires && (h = c.expires);
            f = d(f, "expires", h);
            f = d(f, "max-age", c.H);
            f = d(f, "samesite", c.I);
            c.J && (f = e(f, "secure"));
            h = c.domain;
            if ("auto" === h) {
                h = sb();
                for (var l = 0; l < h.length; ++l) {
                    var m = "none" !== h[l] ? h[l] : void 0,
                        w = d(f, "domain", m);
                    w = e(w, c.flags);
                    if (!tb(m, c.path) && pb(w, a, b, c.c)) break
                }
            } else h && "none" !== h && (f = d(f, "domain", h)), f = e(f, c.flags), tb(h, c.path) || pb(f, a, b, c.c)
        }
    }

    function rb(a) {
        a && 1200 < a.length && (a = a.substring(0, 1200));
        return a
    }
    var ub = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
        vb = /(^|\.)doubleclick\.net$/i;

    function tb(a, b) {
        return vb.test(document.location.hostname) || "/" === b && ub.test(a)
    }

    function sb() {
        var a = [],
            b = document.location.hostname.split(".");
        if (4 === b.length) {
            var c = b[b.length - 1];
            if (parseInt(c, 10).toString() === c) return ["none"]
        }
        for (c = b.length - 2; 0 <= c; c--) a.push(b.slice(c).join("."));
        b = document.location.hostname;
        vb.test(b) || ub.test(b) || a.push("none");
        return a
    }

    function ob(a) {
        if (!L("gtag_cs_api") || !a || !fb()) return !0;
        if (!eb(a)) return !1;
        a = O(a);
        return null == a ? !0 : !!a
    };

    function wb(a, b) {
        var c, d = a.G;
        null == d && (d = 7776E3);
        0 !== d && (c = new Date((b || (new Date).getTime()) + 1E3 * d));
        return {
            path: a.path,
            domain: a.domain,
            flags: a.flags,
            encode: !0,
            expires: c
        }
    };
    var xb = /^\w+$/,
        yb = /^[\w-]+$/,
        zb = /^~?[\w-]+$/,
        Ab = {
            aw: "_aw",
            dc: "_dc",
            gf: "_gf",
            ha: "_ha",
            gp: "_gp"
        };

    function Bb() {
        if (!L("gtag_cs_api") || !fb()) return !0;
        var a = O("ad_storage");
        return null == a ? !0 : !!a
    }

    function Cb(a, b) {
        eb("ad_storage") ? Bb() ? a() : ib(a) : b ? K(3) : hb(function() {
            Cb(a, !0)
        })
    }

    function Db(a, b) {
        var c = [];
        if (!a.cookie) return c;
        a = nb(b, a.cookie, void 0, "ad_storage");
        if (!a || 0 == a.length) return c;
        for (b = 0; b < a.length; b++) {
            var d = Eb(a[b]);
            d && -1 === Xa(c, d) && c.push(d)
        }
        return Fb(c)
    }

    function Gb(a) {
        return a && "string" == typeof a && a.match(xb) ? a : "_gcl"
    }

    function Hb() {
        var a = J.location.href,
            b = Va.createElement("a");
        a && (b.href = a);
        var c = b.pathname;
        "/" !== c[0] && (a || K(1), c = "/" + c);
        a = b.hostname.replace(jb, "");
        var d = {
            href: b.href,
            protocol: b.protocol,
            host: b.host,
            hostname: a,
            pathname: c,
            search: b.search,
            hash: b.hash,
            port: b.port
        };
        b = lb(d, "gclid");
        c = lb(d, "gclsrc");
        a = lb(d, "dclid");
        b && c || (d = d.hash.replace("#", ""), b = b || kb(d, "gclid"), c = c || kb(d, "gclsrc"));
        return Ib(b, c, a)
    }

    function Ib(a, b, c) {
        function d(f, g) {
            e[g] || (e[g] = []);
            e[g].push(f)
        }
        var e = {};
        e.gclid = a;
        e.gclsrc = b;
        e.dclid = c;
        if (void 0 !== a && a.match(yb)) switch (b) {
            case void 0:
                d(a, "aw");
                break;
            case "aw.ds":
                d(a, "aw");
                d(a, "dc");
                break;
            case "ds":
                d(a, "dc");
                break;
            case "3p.ds":
                L("gtm_3pds") && d(a, "dc");
                break;
            case "gf":
                d(a, "gf");
                break;
            case "ha":
                d(a, "ha");
                break;
            case "gp":
                d(a, "gp")
        }
        c && d(c, "dc");
        return e
    }

    function Jb() {
        var a = {},
            b = Hb();
        Cb(function() {
            Kb(b, a)
        })
    }

    function Kb(a, b, c) {
        function d(l) {
            return ["GCL", h, l].join(".")
        }

        function e(l, m) {
            l = Ab[l];
            l = void 0 !== l ? f + l : void 0;
            l && (null == g.path && (g.path = "/"), g.domain || (g.domain = "auto"), qb(l, m, g))
        }
        b = b || {};
        var f = Gb(b.prefix);
        c = c || (new Date).getTime();
        var g = wb(b, c);
        g.c = "ad_storage";
        var h = Math.round(c / 1E3);
        a.aw && (!0 === b.K ? e("aw", d("~" + a.aw[0])) : e("aw", d(a.aw[0])));
        a.dc && e("dc", d(a.dc[0]));
        a.gf && e("gf", d(a.gf[0]));
        a.ha && e("ha", d(a.ha[0]));
        a.gp && e("gp", d(a.gp[0]))
    }

    function Eb(a) {
        a = a.split(".");
        if (3 == a.length && "GCL" == a[0] && a[1]) return a[2]
    }

    function Fb(a) {
        return a.filter(function(b) {
            return zb.test(b)
        })
    }

    function Lb() {
        for (var a = ["aw"], b = {}, c = Gb(b.prefix), d = {}, e = 0; e < a.length; e++) Ab[a[e]] && (d[a[e]] = Ab[a[e]]);
        Cb(function() {
            Ya(d, function(f, g) {
                g = nb(c + g, Va.cookie, void 0, "ad_storage");
                if (g.length) {
                    g = g[0];
                    var h = g.split(".");
                    h = 3 !== h.length || "GCL" !== h[0] ? 0 : 1E3 * (Number(h[1]) || 0);
                    var l = {};
                    l[f] = [Eb(g)];
                    Kb(l, b, h)
                }
            })
        })
    };
    var Mb = /^UA-\d+-\d+%3A[\w-]+(?:%2C[\w-]+)*(?:%3BUA-\d+-\d+%3A[\w-]+(?:%2C[\w-]+)*)*$/,
        Nb = /^~?[\w-]+(?:\.~?[\w-]+)*$/,
        Ob = /^\d+\.fls\.doubleclick\.net$/,
        Pb = /;gac=([^;?]+)/,
        Qb = /;gclaw=([^;?]+)/;

    function Rb(a, b) {
        if (Ob.test(a.location.host)) {
            if ((a = a.location.href.match(Qb)) && 2 == a.length && a[1].match(Nb)) return a[1]
        } else if (a = Db(a, (b || "_gcl") + "_aw"), 0 < a.length) return a.join(".");
        return ""
    }

    function Sb(a) {
        0 !== Db(document, "_gcl_aw").length || a && 0 !== Db(document, a + "_aw").length || (Jb(), Lb())
    };

    function Tb(a) {
        var b = t.performance;
        return b && b.timing && b.timing[a] || 0
    };
    var Ub = {
        A: 0,
        l: 1,
        B: 2,
        o: 3,
        m: 4
    };

    function P() {
        this.a = {}
    }

    function Q(a, b, c) {
        "number" === typeof c && 0 < c && (a.a[b] = Math.round(c))
    }

    function Vb(a) {
        var b = P.a();
        var c = void 0 === c ? t : c;
        c = c.performance;
        Q(b, a, c && c.now ? c.now() : null)
    }

    function Wb() {
        function a() {
            return Q(b, 0, Tb("loadEventStart") - Tb("navigationStart"))
        }
        var b = P.a();
        0 != Tb("loadEventStart") ? a() : window.addEventListener("load", a)
    }

    function Xb(a, b) {
        b.google_tag_manager && b.google_tag_manager._li && (b = b.google_tag_manager._li, Q(a, 4, b.cbt), Q(a, 3, b.cst))
    }

    function Yb() {
        var a = P.a();
        return q(Object, "values").call(Object, Ub).map(function(b) {
            return [b, a.a[b] || 0]
        })
    }
    P.b = void 0;
    P.a = function() {
        return P.b ? P.b : P.b = new P
    };

    function Zb(a, b, c) {
        a = $b(a, !0);
        if (a[b]) return !1;
        a[b] = [];
        a[b][0] = c;
        return !0
    }

    function $b(a, b) {
        var c = a.GooglebQhCsO;
        c || (c = {}, b && (a.GooglebQhCsO = c));
        return c
    };
    var ac = {},
        R = null;

    function bc(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255, e >>= 8);
            b[c++] = e
        }
        a = 4;
        void 0 === a && (a = 0);
        if (!R)
            for (R = {}, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                ac[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    void 0 === R[h] && (R[h] = g)
                }
            }
        a = ac[a];
        c = [];
        for (d = 0; d < b.length; d += 3) {
            var l = b[d],
                m = (e = d + 1 < b.length) ? b[d + 1] : 0;
            h = (f = d + 2 < b.length) ? b[d + 2] : 0;
            g = l >> 2;
            l = (l & 3) << 4 | m >> 4;
            m = (m & 15) << 2 | h >> 6;
            h &= 63;
            f || (h = 64, e || (m = 64));
            c.push(a[g], a[l], a[m] || "", a[h] || "")
        }
        return c.join("")
    };

    function cc(a, b, c, d) {
        var e = C(c, "fmt");
        if (d) {
            var f = C(c, "random"),
                g = C(c, "label") || "";
            if (!f) return !1;
            f = bc(decodeURIComponent(g.replace(/\+/g, " ")) + ":" + decodeURIComponent(f.replace(/\+/g, " ")));
            if (!Zb(a, f, d)) return !1
        }
        e && 4 != e && (c = D(c, "rfmt", e));
        e = D(c, "fmt", 4);
        c = va("SCRIPT");
        e = pa(e);
        ta(c, e);
        c.onload = function() {
            a.google_noFurtherRedirects && d && d.call && (a.google_noFurtherRedirects = null, d())
        };
        b.getElementsByTagName("script")[0].parentElement.appendChild(c);
        return !0
    };
    var dc = E("false");

    function ec() {
        if ("function" == typeof J.__uspapi) {
            var a = "";
            try {
                J.__uspapi("getUSPData", 1, function(b, c) {
                    c && b && (b = b.uspString) && /^[\da-zA-Z-]{1,20}$/.test(b) && (a = b)
                })
            } catch (b) {}
            return a
        }
    };
    var fc = {
            id: !0,
            origin: !0,
            destination: !0,
            start_date: !0,
            end_date: !0,
            location_id: !0
        },
        gc = "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_enable_display_cookie_match google_gtag_event_data google_remarketing_only google_conversion_linker google_tag_for_child_directed_treatment google_tag_for_under_age_of_consent google_allow_ad_personalization_signals google_restricted_data_processing google_conversion_items google_conversion_merchant_id google_user_id google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_gtm_url_processor google_conversion_page_url google_conversion_referrer_url google_gtm google_gcl_cookie_prefix google_read_gcl_cookie_opt_out google_basket_feed_country google_basket_feed_language google_basket_discount google_basket_transaction_type google_additional_conversion_params google_additional_params google_transport_url".split(" ");

    function hc(a, b) {
        var c = a;
        return function() {
            --c;
            0 >= c && b()
        }
    }

    function S(a) {
        return null != a ? encodeURIComponent(String(a)) : ""
    }

    function ic(a) {
        if (null != a) {
            a = String(a).substring(0, 512);
            var b = a.indexOf("#");
            return -1 == b ? a : a.substring(0, b)
        }
        return ""
    }

    function T(a, b) {
        b = S(b);
        return "" != b && (a = S(a), "" != a) ? "&".concat(a, "=", b) : ""
    }

    function jc(a) {
        var b = typeof a;
        return null == a || "object" == b || "function" == b ? null : String(a).replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/=/g, "\\=")
    }

    function kc(a) {
        if (!a || "object" != typeof a || "function" == typeof a.join) return "";
        var b = [],
            c;
        for (c in a)
            if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = a[c];
                if (d && "function" == typeof d.join) {
                    for (var e = [], f = 0; f < d.length; ++f) {
                        var g = jc(d[f]);
                        null != g && e.push(g)
                    }
                    d = 0 == e.length ? null : e.join(",")
                } else d = jc(d);
                (e = jc(c)) && null != d && b.push(e + "=" + d)
            }
        return b.join(";")
    }

    function lc(a, b) {
        b = void 0 === b ? null : b;
        a = kc(a.google_custom_params);
        b = kc(b);
        b = a.concat(0 < a.length && 0 < b.length ? ";" : "", b);
        return "" == b ? "" : "&".concat("data=", encodeURIComponent(b))
    }

    function mc(a) {
        return null == a || 0 != a && 1 != a ? "" : T("tfcd", a)
    }

    function nc(a) {
        return null == a || 0 != a && 1 != a ? "" : T("tfua", a)
    }

    function oc(a) {
        return !1 === a ? T("npa", 1) : !0 === a ? T("npa", 0) : ""
    }

    function pc(a) {
        return La ? !0 === a ? T("rdp", 1) : !1 === a ? T("rdp", 0) : "" : ""
    }

    function qc(a) {
        if (null != a) {
            a = a.toString();
            if (2 == a.length) return T("hl", a);
            if (5 == a.length) return T("hl", a.substring(0, 2)) + T("gl", a.substring(3, 5))
        }
        return ""
    }

    function U(a) {
        return "number" != typeof a && "string" != typeof a ? "" : S(a.toString())
    }

    function rc(a) {
        if (!a) return "";
        a = a.google_conversion_items;
        if (!a) return "";
        for (var b = [], c = 0, d = a.length; c < d; c++) {
            var e = a[c],
                f = [];
            e && (f.push(U(e.value)), f.push(U(e.quantity)), f.push(U(e.item_id)), f.push(U(e.start_date)), f.push(U(e.end_date)), b.push("(" + f.join("*") + ")"))
        }
        return 0 < b.length ? "&item=" + b.join("") : ""
    }

    function sc(a, b) {
        if (b.google_read_gcl_cookie_opt_out || b.google_remarketing_only || b.google_conversion_domain && (!b.google_gcl_cookie_prefix || !/^_ycl/.test(b.google_gcl_cookie_prefix))) return "";
        var c = "";
        if (b.google_gcl_cookie_prefix && /^[a-zA-Z0-9_]+$/.test(b.google_gcl_cookie_prefix) && "_gcl" != b.google_gcl_cookie_prefix) return c = Rb(a, b.google_gcl_cookie_prefix), T("gclaw", c);
        (b = Rb(a)) && (c = T("gclaw", b));
        if (Ob.test(a.location.host)) var d = (d = a.location.href.match(Pb)) && 2 == d.length && d[1].match(Mb) ? decodeURIComponent(d[1]) :
            "";
        else {
            if (Bb()) {
                b = [];
                a = a.cookie.split(";");
                for (var e = /^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/, f = 0; f < a.length; f++) {
                    var g = a[f].match(e);
                    g && b.push({
                        f: g[1],
                        value: g[2]
                    })
                }
                a = {};
                if (b && b.length)
                    for (e = 0; e < b.length; e++) f = b[e].value.split("."), "1" == f[0] && 3 == f.length && f[1] && (a[b[e].f] || (a[b[e].f] = []), a[b[e].f].push({
                        timestamp: f[1],
                        j: f[2]
                    }));
                b = a
            } else b = {};
            a = [];
            for (d in b) {
                e = [];
                f = b[d];
                for (g = 0; g < f.length; g++) e.push(f[g].j);
                a.push(d + ":" + e.join(","))
            }
            d = 0 < a.length ? a.join(";") : ""
        }
        return c + (d ? T("gac", d) : "")
    }

    function tc(a, b, c) {
        var d = [];
        if (a) {
            var e = a.screen;
            e && (d.push(T("u_h", e.height)), d.push(T("u_w", e.width)), d.push(T("u_ah", e.availHeight)), d.push(T("u_aw", e.availWidth)), d.push(T("u_cd", e.colorDepth)));
            a.history && d.push(T("u_his", a.history.length))
        }
        c && "function" == typeof c.getTimezoneOffset && d.push(T("u_tz", -c.getTimezoneOffset()));
        b && ("function" == typeof b.javaEnabled && d.push(T("u_java", b.javaEnabled())), b.plugins && d.push(T("u_nplug", b.plugins.length)), b.mimeTypes && d.push(T("u_nmime", b.mimeTypes.length)));
        return d.join("")
    }

    function uc(a) {
        function b(d) {
            try {
                return decodeURIComponent(d), !0
            } catch (e) {
                return !1
            }
        }
        a = a ? a.title : "";
        if (void 0 == a || "" == a) return "";
        a = encodeURIComponent(a);
        for (var c = 256; !b(a.substr(0, c));) c--;
        return "&tiba=" + a.substr(0, c)
    }

    function vc(a, b, c, d) {
        var e = "";
        if (b) {
            if (a.top == a) var f = 0;
            else {
                var g = a.location.ancestorOrigins;
                if (g) f = g[g.length - 1] == a.location.origin ? 1 : 2;
                else {
                    g = a.top;
                    try {
                        var h;
                        if (h = !!g && null != g.location.href) c: {
                            try {
                                ua(g.foo);
                                h = !0;
                                break c
                            } catch (l) {}
                            h = !1
                        }
                        f = h
                    } catch (l) {
                        f = !1
                    }
                    f = f ? 1 : 2
                }
            }
            a = c ? c : 1 == f ? a.top.location.href : a.location.href;
            e += T("frm", f);
            e += T("url", ic(a));
            e += T("ref", ic(d || b.referrer))
        }
        return e
    }

    function V(a, b, c, d, e, f) {
        f = void 0 === f ? null : f;
        var g = "https://",
            h = "landing" === d.google_conversion_type ? "/extclk" : "/";
        switch (e) {
            default: return "";
            case 2:
                    case 3:
                    var l = "googleads.g.doubleclick.net/";
                var m = "pagead/viewthroughconversion/";
                break;
            case 1:
                    l = "www.google.com/";m = "pagead/1p-conversion/";
                break;
            case 0:
                    l = d.google_conversion_domain || "www.googleadservices.com/",
                m = "pagead/conversion/"
        }
        Ja && d.google_transport_url && (l = d.google_transport_url);
        "/" !== l[l.length - 1] && (l += "/");
        if (0 === l.indexOf("http://") || 0 ===
            l.indexOf("https://")) g = "";
        g = [g, l, m, S(d.google_conversion_id), h, "?random=", S(d.google_conversion_time)].join("");
        f = void 0 === f ? null : f;
        a = [T("cv", d.google_conversion_js_version), T("fst", d.google_conversion_first_time), T("num", d.google_conversion_snippets), T("fmt", d.google_conversion_format), d.google_remarketing_only ? T("userId", d.google_user_id) : "", mc(d.google_tag_for_child_directed_treatment), nc(d.google_tag_for_under_age_of_consent), oc(d.google_allow_ad_personalization_signals), pc(d.google_restricted_data_processing),
            T("value", d.google_conversion_value), T("currency_code", d.google_conversion_currency), T("label", d.google_conversion_label), T("oid", d.google_conversion_order_id), T("bg", d.google_conversion_color), qc(d.google_conversion_language), T("guid", "ON"), !d.google_conversion_domain && "GooglemKTybQhCsO" in t && "function" == typeof t.GooglemKTybQhCsO ? T("resp", "GooglemKTybQhCsO") : "", T("disvt", d.google_disable_viewthrough), T("eid", Ra().join()), tc(a, b, d.google_conversion_date), T("gtm", d.google_gtm), b && b.sendBeacon ? T("sendb",
                "1") : "", wc(), T("ig", /googleadservices\.com/.test("www.googleadservices.com") ? 1 : 0), lc(d, f), sc(c, d), vc(a, c, d.google_conversion_page_url, d.google_conversion_referrer_url), uc(c), xc(d.google_additional_params), xc(d.google_remarketing_only ? {} : d.google_additional_conversion_params), "&hn=" + S("www.googleadservices.com"), yc(a)
        ].join("");
        b = Oa();
        a += 0 < b.length ? "&debug_experiment_id=" + b : "";
        d.google_remarketing_only || d.google_conversion_domain ? d = a : (b = [T("mid", d.google_conversion_merchant_id), T("fcntr", d.google_basket_feed_country),
            T("flng", d.google_basket_feed_language), T("dscnt", d.google_basket_discount), T("bttype", d.google_basket_transaction_type)
        ].join(""), d = [a, b, rc(d)].join(""), d = 4E3 < d.length ? [a, T("item", "elngth")].join("") : d);
        g += d;
        1 === e ? g += [T("gcp", 1), T("sscte", 1), T("ct_cookie_present", 1)].join("") : 3 == e && (g += T("gcp", 1), g += T("ct_cookie_present", 1));
        Ka && (e = ec(), void 0 !== e && (g += T("us_privacy", e || "error")));
        return g
    }

    function zc(a) {
        if (!dc) {
            var b = va("IFRAME");
            b.style.display = "none";
            b.src = "https://bid.g.doubleclick.net/xbbe/pixel?d=KAE";
            a.body.appendChild(b)
        }
    }

    function Ac() {
        return new Image
    }

    function W(a, b, c, d) {
        var e = c.onload_callback,
            f;
        e && e.call ? f = e : f = function() {};
        d += T("async", "1");
        e = c.google_gtm_url_processor;
        "function" == typeof e && (d = e(d));
        var g = (e = c.opt_image_generator) && e.call,
            h;
        if (!(h = g || !1)) {
            if (c.google_conversion_domain) var l = !1;
            else try {
                l = cc(a, b, d, f)
            } catch (m) {
                l = !1
            }
            h = !l
        }
        h && (a = Ac, g && (a = e), a = a(), a.src = d, a.onload = f)
    }

    function Bc(a, b) {
        H && "376635471" == I(2) && ("complete" === b.readyState ? zc(b) : a.addEventListener ? a.addEventListener("load", function() {
            zc(b)
        }) : a.attachEvent("onload", function() {
            zc(b)
        }))
    }

    function Cc(a) {
        if ("landing" == a.google_conversion_type || !a.google_conversion_id || a.google_remarketing_only && a.google_disable_viewthrough) return !1;
        a.google_conversion_date = new Date;
        a.google_conversion_time = a.google_conversion_date.getTime();
        a.google_conversion_snippets = "number" == typeof a.google_conversion_snippets && 0 < a.google_conversion_snippets ? a.google_conversion_snippets + 1 : 1;
        "number" != typeof a.google_conversion_first_time && (a.google_conversion_first_time = a.google_conversion_time);
        a.google_conversion_js_version =
            "9";
        0 != a.google_conversion_format && 1 != a.google_conversion_format && 2 != a.google_conversion_format && 3 != a.google_conversion_format && (a.google_conversion_format = 3);
        !1 !== a.google_enable_display_cookie_match && (a.google_enable_display_cookie_match = !0);
        return !0
    }

    function Dc(a, b) {
        function c(f) {
            d[f] = b && null != b[f] ? b[f] : a[f]
        }
        for (var d = {}, e = 0; e < gc.length; e++) c(gc[e]);
        c("onload_callback");
        return d
    }

    function Ec(a) {
        for (var b = {}, c = 0; c < a.length; c++) {
            var d = a[c],
                e = void 0;
            d.hasOwnProperty("google_business_vertical") ? (e = d.google_business_vertical, b[e] = b[e] || {
                google_business_vertical: e
            }) : (e = "", Object.prototype.hasOwnProperty.call(b, e) || (b[e] = {}));
            e = b[e];
            for (var f = q(Object, "keys").call(Object, d).filter(function(l) {
                    return fc.hasOwnProperty(l)
                }), g = 0; g < f.length; g++) {
                var h = f[g];
                h in e || (e[h] = []);
                e[h].push(d[h])
            }
        }
        return q(Object, "values").call(Object, b)
    }

    function wc() {
        var a = "";
        Ua() && (a = Yb().map(function(b) {
            return b.join("-")
        }).join("_"));
        return T("li", a)
    }

    function yc(a) {
        if (!Na || !a.__gsaExp || !a.__gsaExp.id) return "";
        a = a.__gsaExp.id;
        if ("function" != typeof a) return "";
        try {
            var b = Number(a());
            return isNaN(b) ? "" : T("gsaexp", b)
        } catch (c) {
            return ""
        }
    }

    function xc(a) {
        if (!a) return "";
        var b = "",
            c;
        for (c in a) a.hasOwnProperty(c) && (b += T(c, a[c]));
        return b
    };

    function Fc(a, b, c, d) {
        Ua() && (Vb(2), d.google_gtm && Xb(P.a(), a));
        var e = !1;
        if (!d || 3 != d.google_conversion_format) return !1;
        try {
            if (Cc(d)) {
                d.google_remarketing_only && d.google_enable_display_cookie_match && !dc && H && G(["376635470", "376635471"], Ea, 2);
                d.google_remarketing_only && !d.google_conversion_domain && H && G(["759238990", "759238991"], Ha, 13);
                !d.google_remarketing_only || d.google_conversion_domain || H && ("759248991" == I(14) || "759248990" == I(14)) || H && G(["759248990", "759248991"], Ga, 14);
                !1 === d.google_conversion_linker ||
                    d.google_gtm || Sb(d.google_gcl_cookie_prefix);
                if (1 == d.google_remarketing_only && null != d.google_gtag_event_data && null != d.google_gtag_event_data.items && d.google_gtag_event_data.items.constructor === Array && 0 < d.google_gtag_event_data.items.length) Gc(a, b, c, d);
                else {
                    var f = !1;
                    !d.google_remarketing_only && q("www.googleadservices.com", "endsWith").call("www.googleadservices.com", "google.com") && (Ma ? f = !0 : (Ta(), f = !!H && "910057691" == I(17)));
                    f ? (d.onload_callback && "function" == typeof d.onload_callback.call ? d.onload_callback = hc(2, d.onload_callback) :
                        d.onload_callback = function() {}, W(a, c, d, V(a, b, c, d, 1)), W(a, c, d, V(a, b, c, d, 3))) : W(a, c, d, V(a, b, c, d, d.google_remarketing_only ? 2 : 0))
                }
                d.google_remarketing_only && d.google_enable_display_cookie_match && Bc(a, c);
                e = !0
            }
        } catch (g) {}
        return e
    }

    function Gc(a, b, c, d) {
        var e = Ec(d.google_gtag_event_data.items);
        d.onload_callback && "function" == typeof d.onload_callback.call ? d.onload_callback = hc(e.length, d.onload_callback) : d.onload_callback = function() {};
        for (var f = 0; f < e.length; f++) W(a, c, d, V(a, b, c, d, 2, e[f])), d.google_conversion_time += 1
    };
    H = new function() {
        var a = [],
            b = 0,
            c;
        for (c in Sa) a[b++] = Sa[c];
        this.b = {};
        this.a = {};
        a = a || [];
        b = 0;
        for (c = a.length; b < c; ++b) this.a[a[b]] = ""
    };
    G(["592230570", "592230571"], Fa, 16);
    Ua() && (Vb(1), Wb());

    function Hc(a, b, c) {
        function d(m, w) {
            var u = new Image;
            u.onload = m;
            u.src = w
        }

        function e() {
            --f;
            if (0 >= f) {
                var m = $b(a, !1),
                    w = m[b];
                w && (delete m[b], (m = w[0]) && m.call && m())
            }
        }
        var f = c.length + 1;
        if (2 == c.length) {
            var g = c[0],
                h = c[1];
            0 <= A(g, 0, "rmt_tld", g.search(B)) && 0 <= A(g, 0, "ipr", g.search(B)) && !h.match(wa)[6] && (h += xa(g), c[1] = D(h, "rmt_tld", "1"))
        }
        for (g = 0; g < c.length; g++) {
            h = c[g];
            var l = C(h, "fmt");
            switch (parseInt(l, 10)) {
                case 1:
                case 2:
                    (l = a.document.getElementById("goog_conv_iframe")) && !l.src ? (l.onload = e, l.src = h) : d(e, h);
                    break;
                case 4:
                    cc(a,
                        a.document, h, e);
                    break;
                case 5:
                    if (a.navigator && a.navigator.sendBeacon)
                        if (a.navigator.sendBeacon(h, "")) {
                            e();
                            break
                        } else h = D(h, "sendb", 2);
                    h = D(h, "fmt", 3);
                default:
                    d(e, h)
            }
        }
        e()
    }
    var X = ["GooglemKTybQhCsO"],
        Y = t;
    X[0] in Y || "undefined" == typeof Y.execScript || Y.execScript("var " + X[0]);
    for (var Z; X.length && (Z = X.shift());) X.length || void 0 === Hc ? Y[Z] && Y[Z] !== Object.prototype[Z] ? Y = Y[Z] : Y = Y[Z] = {} : Y[Z] = Hc;
    window.google_trackConversion = function(a) {
        var b = window,
            c = navigator,
            d = document;
        a = Dc(b, a);
        a.google_conversion_format = 3;
        Za.gtag_cs_api = !!a.google_gtm;
        return Fc(b, c, d, a)
    };
}).call(this);