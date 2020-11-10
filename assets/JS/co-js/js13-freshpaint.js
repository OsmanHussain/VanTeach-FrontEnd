// Portions of this code are licensed under the Apache License Version 2.0. A
// copy of the License can be obtained at:
// https://www.apache.org/licenses/LICENSE-2.0
(function() {
    (function() {
        function Y(a) {
            if (null === a) return null;
            switch (typeof a) {
                case "object":
                    if (d.isDate(a) && 0 <= a.getTime()) return a.getTime();
                    break;
                case "boolean":
                    return Number(a);
                case "number":
                    return a;
                case "string":
                    return a = Number(a), !isNaN(a) ? a : 0
            }
            return null
        }

        function M(a) {
            if (null === a) return !1;
            switch (typeof a) {
                case "boolean":
                    return a;
                case "number":
                    return 0 !== a;
                case "string":
                    return 0 < a.length;
                case "object":
                    if (d.isArray(a) && 0 < a.length || d.isDate(a) && 0 < a.getTime() || d.isObject(a) && !d.isEmptyObject(a)) return !0
            }
            return !1
        }

        function ra(a, b) {
            if (!a.operator || "datetime" !== a.operator || !a.children || 1 !== a.children.length) throw "Invalid cast operator: datetime " + a;
            var c = u(a.children[0], b);
            if (null === c) return null;
            switch (typeof c) {
                case "number":
                case "string":
                    c = new Date(c);
                    if (isNaN(c.getTime())) break;
                    return c;
                case "object":
                    if (d.isDate(c)) return c
            }
            return null
        }

        function sa(a, b) {
            if (!a.operator || -1 === ["-", "*", "/", "%"].indexOf(a.operator) || !a.children || 2 > a.children.length) throw "Invalid arithmetic operator " + a;
            var c = u(a.children[0], b),
                f = u(a.children[1], b);
            if ("number" === typeof c && "number" === typeof f) switch (a.operator) {
                case "-":
                    return c - f;
                case "*":
                    return c * f;
                case "/":
                    if (0 !== f) return c / f;
                    break;
                case "%":
                    if (0 === f) break;
                    return 0 === c ? 0 : 0 > c && 0 < f || 0 < c && 0 > f ? -(Math.floor(c / f) * f - c) : c % f;
                default:
                    throw "Unknown operator: " + a.operator;
            }
            return null
        }

        function ta(a, b) {
            if (a === b) return !0;
            if (null === a || null === b || a.length !== b.length) return !1;
            for (var c = 0; c < a.length; c++)
                if (a[c] !== b[c]) return !1;
            return !0
        }

        function ua(a, b) {
            if (null === a && a === b) return !0;
            if (typeof a ===
                typeof b) switch (typeof a) {
                case "number":
                case "string":
                case "boolean":
                    return a === b;
                case "object":
                    if (d.isArray(a) && d.isArray(b)) return ta(a, b);
                    if (d.isDate(a) && d.isDate(b)) return a.getTime() === b.getTime();
                    if (d.isObject(a) && d.isObject(b)) return JSON.stringify(a) === JSON.stringify(b)
            }
            return !1
        }

        function va(a, b) {
            if (!a.operator || -1 === [">", ">=", "<", "<="].indexOf(a.operator) || !a.children || 2 !== a.children.length) throw "Invalid comparison operator " + a;
            var c = u(a.children[0], b),
                f = u(a.children[1], b);
            if (typeof c === typeof f)
                if ("number" ===
                    typeof f || d.isDate(f)) switch (c = Y(c), f = Y(f), a.operator) {
                        case ">":
                            return c > f;
                        case ">=":
                            return c >= f;
                        case "<":
                            return c < f;
                        case "<=":
                            return c <= f
                    } else if ("string" === typeof f) switch (c = c.localeCompare(f), a.operator) {
                        case ">":
                            return 0 < c;
                        case ">=":
                            return 0 <= c;
                        case "<":
                            return 0 > c;
                        case "<=":
                            return 0 >= c
                    }
                    return null
        }

        function wa(a, b) {
            if (!a.operator) throw "Invalid operator: operator key missing " + a;
            switch (a.operator) {
                case "and":
                    if (!a.operator || "and" !== a.operator || !a.children || 2 !== a.children.length) throw "Invalid operator: AND " +
                        a;
                    return M(u(a.children[0], b)) && M(u(a.children[1], b));
                case "or":
                    if (!a.operator || "or" !== a.operator || !a.children || 2 !== a.children.length) throw "Invalid operator: OR " + a;
                    return M(u(a.children[0], b)) || M(u(a.children[1], b));
                case "in":
                case "not in":
                    if (!a.operator || -1 === ["in", "not in"].indexOf(a.operator) || !a.children || 2 !== a.children.length) throw "Invalid operator: IN/NOT IN " + a;
                    var c = u(a.children[0], b),
                        f = u(a.children[1], b);
                    if (!d.isArray(f) && !d.isString(f)) throw "Invalid operand for operator IN: invalid type" +
                        f;
                    c = -1 < f.indexOf(c);
                    return "not in" === a.operator ? !c : c;
                case "+":
                    if (!a.operator || "+" !== a.operator || !a.children || 2 > a.children.length) throw "Invalid operator: PLUS " + a;
                    c = u(a.children[0], b);
                    f = u(a.children[1], b);
                    return "number" === typeof c && "number" === typeof f || "string" === typeof c && "string" === typeof f ? c + f : null;
                case "-":
                case "*":
                case "/":
                case "%":
                    return sa(a, b);
                case "==":
                case "!=":
                    a: {
                        if (!a.operator || -1 === ["==", "!="].indexOf(a.operator) || !a.children || 2 !== a.children.length) throw "Invalid equality operator " + a;
                        f = ua(u(a.children[0], b), u(a.children[1], b));
                        switch (a.operator) {
                            case "==":
                                c = f;
                                break a;
                            case "!=":
                                c = !f
                        }
                    }
                    return c;
                case ">":
                case "<":
                case ">=":
                case "<=":
                    return va(a, b);
                case "boolean":
                    if (!a.operator || "boolean" !== a.operator || !a.children || 1 !== a.children.length) throw "Invalid cast operator: boolean " + a;
                    return M(u(a.children[0], b));
                case "datetime":
                    return ra(a, b);
                case "list":
                    if (!a.operator || "list" !== a.operator || !a.children || 1 !== a.children.length) throw "Invalid cast operator: list " + a;
                    c = u(a.children[0], b);
                    c = null ===
                        c ? null : d.isArray(c) ? c : null;
                    return c;
                case "number":
                    if (!a.operator || "number" !== a.operator || !a.children || 1 !== a.children.length) throw "Invalid cast operator: number " + a;
                    return Y(u(a.children[0], b));
                case "string":
                    a: {
                        if (!a.operator || "string" !== a.operator || !a.children || 1 !== a.children.length) throw "Invalid cast operator: string " + a;c = u(a.children[0], b);
                        switch (typeof c) {
                            case "object":
                                c = d.isDate(c) ? c.toJSON() : JSON.stringify(c);
                                break a
                        }
                        c = "" + c
                    }
                    return c;
                case "defined":
                case "not defined":
                    if (!a.operator || -1 === ["defined",
                            "not defined"
                        ].indexOf(a.operator) || !a.children || 1 !== a.children.length) throw "Invalid defined/not defined operator: " + a;
                    c = null !== u(a.children[0], b);
                    return "not defined" === a.operator ? !c : c;
                case "not":
                    if (!a.operator || "not" !== a.operator || !a.children || 1 !== a.children.length) throw "Invalid not operator: " + a;
                    c = u(a.children[0], b);
                    return null === c ? !0 : "boolean" === typeof c ? !c : null
            }
        }

        function u(a, b) {
            if (a.property) {
                var c;
                a: {
                    if (!a.property || !a.value) throw "Invalid operand: missing required keys " + a;
                    switch (a.property) {
                        case "event":
                            c =
                                void 0 !== b[a.value] ? b[a.value] : null;
                            break a;
                        case "literal":
                            if ("now" === a.value) {
                                c = new Date;
                                break a
                            }
                            if ("object" === typeof a.value) {
                                var f = a.value;
                                c = f.window;
                                if (!c || !c.unit || !c.value) throw "Invalid window: missing required keys " + JSON.stringify(f);
                                f = new Date;
                                switch (c.unit) {
                                    case "hour":
                                        f.setTime(f.getTime() + -36E5 * c.value);
                                        break;
                                    case "day":
                                        f.setTime(f.getTime() + -864E5 * c.value);
                                        break;
                                    case "week":
                                        f.setTime(f.getTime() + -6048E5 * c.value);
                                        break;
                                    case "month":
                                        f.setTime(f.getTime() + -2592E6 * c.value);
                                        break;
                                    default:
                                        throw "Invalid unit: " +
                                            c.unit;
                                }
                                c = f
                            } else c = a.value;
                            break a;
                        default:
                            throw "Invalid operand: Invalid property type " + a.property;
                    }
                }
                return c
            }
            if (a.operator) return wa(a, b)
        }

        function Q(a) {
            switch (typeof a.className) {
                case "string":
                    return a.className;
                case "object":
                    return a.className.baseVal || a.getAttribute("class") || "";
                default:
                    return ""
            }
        }

        function xa(a) {
            var b = "";
            Z(a) && a.childNodes && a.childNodes.length && d.each(a.childNodes, function(a) {
                a && 3 === a.nodeType && a.textContent && (b += d.trim(a.textContent).split(/(\s+)/).filter($).join("").replace(/[\r\n]/g,
                    " ").replace(/[ ]+/g, " ").substring(0, 255))
            });
            return d.trim(b)
        }

        function H(a, b) {
            return a && a.tagName && a.tagName.toLowerCase() === b.toLowerCase()
        }

        function ya(a, b) {
            if (!a || H(a, "html") || !(a && 1 === a.nodeType)) return !1;
            switch (a.tagName.toLowerCase()) {
                case "html":
                    return !1;
                case "form":
                    return "submit" === b.type;
                case "input":
                    return -1 === ["button", "submit"].indexOf(a.getAttribute("type")) ? "change" === b.type : "click" === b.type;
                case "select":
                case "textarea":
                    return "change" === b.type;
                default:
                    return "click" === b.type
            }
        }

        function Z(a) {
            for (var b =
                    a; b.parentNode && !H(b, "body"); b = b.parentNode) {
                var c = Q(b).split(" ");
                if (d.includes(c, "fp-sensitive") || d.includes(c, "fp-no-track")) return !1
            }
            if (d.includes(Q(a).split(" "), "fp-include")) return !0;
            if (H(a, "input") || H(a, "select") || H(a, "textarea") || "true" === a.getAttribute("contenteditable")) return !1;
            b = a.type || "";
            if ("string" === typeof b) switch (b.toLowerCase()) {
                case "hidden":
                    return !1;
                case "password":
                    return !1
            }
            a = a.name || a.id || "";
            return "string" === typeof a && /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(a.replace(/[^a-zA-Z0-9]/g,
                "")) ? !1 : !0
        }

        function $(a) {
            if (null === a || d.isUndefined(a) || "string" === typeof a && (a = d.trim(a), /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test((a || "").replace(/[\- ]/g, "")) || /(^\d{3}-?\d{2}-?\d{4}$)/.test(a))) return !1;
            return !0
        }

        function za(a, b) {
            ga(!0, a, b)
        }

        function Aa(a, b) {
            ga(!1, a, b)
        }

        function Ba(a, b) {
            return "1" === R(b).get(S(a, b))
        }

        function ha(a, b) {
            return "0" === R(b).get(S(a, b))
        }

        function G(a) {
            return aa(a,
                function(a) {
                    return this.get_config(a)
                })
        }

        function B(a) {
            return aa(a, function(a) {
                return this._get_config(a)
            })
        }

        function I(a) {
            return aa(a, function(a) {
                return this._get_config(a)
            })
        }

        function Ca(a, b) {
            b = b || {};
            R(b).remove(S(a, b), !!b.crossSubdomainCookie)
        }

        function R(a) {
            a = a || {};
            return "localStorage" === a.persistenceType ? d.localStorage : d.cookie
        }

        function S(a, b) {
            b = b || {};
            return (b.persistencePrefix || Da) + a
        }

        function ga(a, b, c) {
            !d.isString(b) || !b.length ? console.error("gdpr." + (a ? "optIn" : "optOut") + " called with an invalid token") :
                (c = c || {}, R(c).set(S(b, c), a ? 1 : 0, d.isNumber(c.cookieExpiration) ? c.cookieExpiration : null, !!c.crossSubdomainCookie, !!c.secureCookie), c.track && a && c.track(c.trackEventName || "$opt_in", c.trackProperties))
        }

        function aa(a, b) {
            return function() {
                var c = !1;
                try {
                    var f = b.call(this, "token"),
                        d = b.call(this, "opt_out_tracking_persistence_type"),
                        g = b.call(this, "opt_out_tracking_cookie_prefix"),
                        e = b.call(this, "window");
                    f && (c = ha(f, {
                        persistenceType: d,
                        persistencePrefix: g,
                        window: e
                    }))
                } catch (i) {
                    console.error("Unexpected error when checking tracking opt-out status: " +
                        i)
                }
                if (!c) return a.apply(this, arguments);
                c = arguments[arguments.length - 1];
                "function" === typeof c && c(0)
            }
        }

        function Ea(a) {
            return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        }

        function Fa(a, b) {
            for (var c = {
                    All: !1
                }, f = d.keys(a.enabled_client_destinations), p = 0; p < f.length; p++) {
                var g = b[f[p]].name;
                g && (c[g] = !0)
            }
            return new ia(a.name, a.id, ja(a.filter), c, a.snapshots || [], a.segment_compatible || !1)
        }

        function ja(a) {
            if ("and" === a.type) {
                for (var b = [], c = 0; c < a.filters.length; c++) b.push(ja(a.filters[c]));
                return new ba(b)
            }
            return "prop_filter" ===
                a.type ? new ka(a.prop, a.op, a.val) : new ba([])
        }

        function Ga(a, b, c) {
            if (!window.XMLHttpRequest) return c({
                eventDefs: [],
                destInfo: []
            });
            try {
                var f = new XMLHttpRequest;
                f.open("GET", a + "/event-definitions/" + b, !0);
                f.onreadystatechange = function() {
                    if (4 === f.readyState)
                        if (200 === f.status) {
                            if (c) try {
                                for (var a = JSON.parse(f.responseText), b = [], d = a.dest_info, p = {}, e = 0; e < d.length; e++) {
                                    var h = d[e];
                                    p[h.id] = h
                                }
                                for (e = 0; e < a.event_defs.length; e++) b.push(Fa(a.event_defs[e], p));
                                c({
                                    eventDefs: b,
                                    destInfo: d
                                })
                            } catch (q) {
                                console.error(q), c({
                                    eventDefs: [],
                                    destInfo: []
                                })
                            }
                        } else 404 === f.status ? console.error("The above 404 is expected. It appears you have not setup your Freshpaint account yet.") : console.error("Bad HTTP status: " + f.status + " " + f.statusText), c({
                            eventDefs: [],
                            destInfo: []
                        })
                };
                f.send(null)
            } catch (d) {
                console.error(d)
            }
        }

        function N(a) {
            return "freshpaint" === a || "perfalytics" === a
        }
        var E = !1,
            o;
        if ("undefined" === typeof window) {
            var z = {
                hostname: ""
            };
            o = {
                navigator: {
                    userAgent: ""
                },
                document: {
                    location: z,
                    referrer: ""
                },
                screen: {
                    width: 0,
                    height: 0
                },
                location: z
            }
        } else o = window;
        var z = Array.prototype,
            y = Object.prototype,
            J = z.slice,
            O = y.toString,
            T = y.hasOwnProperty,
            x = o.console,
            K = o.navigator,
            l = o.document,
            P = o.opera,
            U = o.screen,
            v = K.userAgent,
            ca = Function.prototype.bind,
            la = z.forEach,
            ma = z.indexOf,
            z = Array.isArray,
            da = {},
            na = /[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i,
            d = {
                trim: function(a) {
                    return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                }
            },
            m = {
                log: function() {
                    if (E && !d.isUndefined(x) && x) try {
                        x.log.apply(x, arguments)
                    } catch (a) {
                        d.each(arguments, function(a) {
                            x.log(a)
                        })
                    }
                },
                error: function() {
                    if (E &&
                        !d.isUndefined(x) && x) {
                        var a = ["Freshpaint error:"].concat(d.toArray(arguments));
                        try {
                            x.error.apply(x, a)
                        } catch (b) {
                            d.each(a, function(a) {
                                x.error(a)
                            })
                        }
                    }
                },
                critical: function() {
                    if (!d.isUndefined(x) && x) {
                        var a = ["Freshpaint error:"].concat(d.toArray(arguments));
                        try {
                            x.error.apply(x, a)
                        } catch (b) {
                            d.each(a, function(a) {
                                x.error(a)
                            })
                        }
                    }
                }
            };
        d.bind = function(a, b) {
            var c, f;
            if (ca && a.bind === ca) return ca.apply(a, J.call(arguments, 1));
            if (!d.isFunction(a)) throw new TypeError;
            c = J.call(arguments, 2);
            return f = function() {
                if (!(this instanceof f)) return a.apply(b, c.concat(J.call(arguments)));
                var d = {};
                d.prototype = a.prototype;
                var g = new d;
                d.prototype = null;
                d = a.apply(g, c.concat(J.call(arguments)));
                return Object(d) === d ? d : g
            }
        };
        d.bind_instance_methods = function(a) {
            for (var b in a) "function" === typeof a[b] && (a[b] = d.bind(a[b], a))
        };
        d.each = function(a, b, c) {
            if (!(null === a || void 0 === a))
                if (la && a.forEach === la) a.forEach(b, c);
                else if (a.length === +a.length)
                for (var f = 0, d = a.length; f < d && !(f in a && b.call(c, a[f], f, a) === da); f++);
            else
                for (f in a)
                    if (T.call(a, f) && b.call(c,
                            a[f], f, a) === da) break
        };
        d.escapeHTML = function(a) {
            a && d.isString(a) && (a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"));
            return a
        };
        d.extend = function(a) {
            d.each(J.call(arguments, 1), function(b) {
                for (var c in b) void 0 !== b[c] && (a[c] = b[c])
            });
            return a
        };
        d.isArray = z || function(a) {
            return "[object Array]" === O.call(a)
        };
        d.isFunction = function(a) {
            try {
                return /^\s*\bfunction\b/.test(a)
            } catch (b) {
                return !1
            }
        };
        d.isArguments = function(a) {
            return !(!a || !T.call(a, "callee"))
        };
        d.toArray = function(a) {
            return !a ? [] : a.toArray ? a.toArray() : d.isArray(a) || d.isArguments(a) ? J.call(a) : d.values(a)
        };
        d.keys = function(a) {
            var b = [];
            if (null === a) return b;
            d.each(a, function(a, f) {
                b[b.length] = f
            });
            return b
        };
        d.values = function(a) {
            var b = [];
            if (null === a) return b;
            d.each(a, function(a) {
                b[b.length] = a
            });
            return b
        };
        d.identity = function(a) {
            return a
        };
        d.include = function(a, b) {
            var c = !1;
            if (null === a) return c;
            if (ma && a.indexOf === ma) return -1 != a.indexOf(b);
            d.each(a, function(a) {
                if (c || (c = a === b)) return da
            });
            return c
        };
        d.includes =
            function(a, b) {
                return -1 !== a.indexOf(b)
            };
        d.inherit = function(a, b) {
            a.prototype = new b;
            a.prototype.constructor = a;
            a.superclass = b.prototype;
            return a
        };
        d.isObject = function(a) {
            return a === Object(a) && !d.isArray(a)
        };
        d.isEmptyObject = function(a) {
            if (d.isObject(a)) {
                for (var b in a)
                    if (T.call(a, b)) return !1;
                return !0
            }
            return !1
        };
        d.isUndefined = function(a) {
            return void 0 === a
        };
        d.isString = function(a) {
            return "[object String]" == O.call(a)
        };
        d.isDate = function(a) {
            return "[object Date]" == O.call(a)
        };
        d.isNumber = function(a) {
            return "[object Number]" ==
                O.call(a)
        };
        d.isElement = function(a) {
            return !!(a && 1 === a.nodeType)
        };
        d.encodeDates = function(a) {
            d.each(a, function(b, c) {
                d.isDate(b) ? a[c] = d.formatDate(b) : d.isObject(b) && (a[c] = d.encodeDates(b))
            });
            return a
        };
        d.timestamp = function() {
            Date.now = Date.now || function() {
                return +new Date
            };
            return Date.now()
        };
        d.formatDate = function(a) {
            function b(a) {
                return 10 > a ? "0" + a : a
            }
            return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds())
        };
        d.safewrap =
            function(a) {
                return function() {
                    try {
                        return a.apply(this, arguments)
                    } catch (b) {
                        m.critical("Implementation error. Please turn on debug and contact support@fresphaint.io."), E && m.critical(b)
                    }
                }
            };
        d.safewrap_class = function(a, b) {
            for (var c = 0; c < b.length; c++) a.prototype[b[c]] = d.safewrap(a.prototype[b[c]])
        };
        d.safewrap_instance_methods = function(a) {
            for (var b in a) "function" === typeof a[b] && (a[b] = d.safewrap(a[b]))
        };
        d.strip_empty_properties = function(a) {
            var b = {};
            d.each(a, function(a, f) {
                d.isString(a) && 0 < a.length && (b[f] =
                    a)
            });
            return b
        };
        d.truncate = function(a, b) {
            var c;
            "string" === typeof a ? c = a.slice(0, b) : d.isArray(a) ? (c = [], d.each(a, function(a) {
                c.push(d.truncate(a, b))
            })) : d.isObject(a) ? (c = {}, d.each(a, function(a, p) {
                c[p] = d.truncate(a, b)
            })) : c = a;
            return c
        };
        d.JSONEncode = function() {
            return function(a) {
                var b = function(a) {
                        var b = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                            c = {
                                "\u0008": "\\b",
                                "\t": "\\t",
                                "\n": "\\n",
                                "\u000c": "\\f",
                                "\r": "\\r",
                                '"': '\\"',
                                "\\": "\\\\"
                            };
                        b.lastIndex = 0;
                        return b.test(a) ? '"' + a.replace(b, function(a) {
                            var b = c[a];
                            return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                        }) + '"' : '"' + a + '"'
                    },
                    c = function(a, d) {
                        var g = "",
                            e = 0,
                            i = e = "",
                            i = 0,
                            h = g,
                            s = [],
                            n = d[a];
                        n && "object" === typeof n && "function" === typeof n.toJSON && (n = n.toJSON(a));
                        switch (typeof n) {
                            case "string":
                                return b(n);
                            case "number":
                                return isFinite(n) ? "" + n : "null";
                            case "boolean":
                            case "null":
                                return "" + n;
                            case "object":
                                if (!n) return "null";
                                g += "    ";
                                s = [];
                                if ("[object Array]" === O.apply(n)) {
                                    i =
                                        n.length;
                                    for (e = 0; e < i; e += 1) s[e] = c(e, n) || "null";
                                    return i = 0 === s.length ? "[]" : g ? "[\n" + g + s.join(",\n" + g) + "\n" + h + "]" : "[" + s.join(",") + "]"
                                }
                                for (e in n) T.call(n, e) && (i = c(e, n)) && s.push(b(e) + (g ? ": " : ":") + i);
                                return i = 0 === s.length ? "{}" : g ? "{" + s.join(",") + "" + h + "}" : "{" + s.join(",") + "}"
                        }
                    };
                return c("", {
                    "": a
                })
            }
        }();
        d.JSONDecode = function() {
            var a, b, c = {
                    '"': '"',
                    "\\": "\\",
                    "/": "/",
                    b: "\u0008",
                    f: "\u000c",
                    n: "\n",
                    r: "\r",
                    t: "\t"
                },
                f, d = function(b) {
                    b = new SyntaxError(b);
                    b.at = a;
                    b.text = f;
                    throw b;
                },
                g = function(c) {
                    c && c !== b && d("Expected '" +
                        c + "' instead of '" + b + "'");
                    b = f.charAt(a);
                    a += 1;
                    return b
                },
                e = function() {
                    var a;
                    a = "";
                    "-" === b && (a = "-", g("-"));
                    for (;
                        "0" <= b && "9" >= b;) a += b, g();
                    if ("." === b)
                        for (a += "."; g() && "0" <= b && "9" >= b;) a += b;
                    if ("e" === b || "E" === b) {
                        a += b;
                        g();
                        if ("-" === b || "+" === b) a += b, g();
                        for (;
                            "0" <= b && "9" >= b;) a += b, g()
                    }
                    a = +a;
                    if (isFinite(a)) return a;
                    d("Bad number")
                },
                i = function() {
                    var a, f, e = "",
                        i;
                    if ('"' === b)
                        for (; g();) {
                            if ('"' === b) return g(), e;
                            if ("\\" === b)
                                if (g(), "u" === b) {
                                    for (f = i = 0; 4 > f; f += 1) {
                                        a = parseInt(g(), 16);
                                        if (!isFinite(a)) break;
                                        i = 16 * i + a
                                    }
                                    e += String.fromCharCode(i)
                                } else if ("string" ===
                                typeof c[b]) e += c[b];
                            else break;
                            else e += b
                        }
                    d("Bad string")
                },
                h = function() {
                    for (; b && " " >= b;) g()
                },
                s = function() {
                    switch (b) {
                        case "t":
                            return g("t"), g("r"), g("u"), g("e"), !0;
                        case "f":
                            return g("f"), g("a"), g("l"), g("s"), g("e"), !1;
                        case "n":
                            return g("n"), g("u"), g("l"), g("l"), null
                    }
                    d('Unexpected "' + b + '"')
                },
                n;
            n = function() {
                h();
                switch (b) {
                    case "{":
                        var a;
                        a: {
                            var c, f = {};
                            if ("{" === b) {
                                g("{");
                                h();
                                if ("}" === b) {
                                    g("}");
                                    a = f;
                                    break a
                                }
                                for (; b;) {
                                    c = i();
                                    h();
                                    g(":");
                                    Object.hasOwnProperty.call(f, c) && d('Duplicate key "' + c + '"');
                                    f[c] = n();
                                    h();
                                    if ("}" === b) {
                                        g("}");
                                        a = f;
                                        break a
                                    }
                                    g(",");
                                    h()
                                }
                            }
                            d("Bad object")
                        }
                        return a;
                    case "[":
                        a: {
                            a = [];
                            if ("[" === b) {
                                g("[");
                                h();
                                if ("]" === b) {
                                    g("]");
                                    c = a;
                                    break a
                                }
                                for (; b;) {
                                    a.push(n());
                                    h();
                                    if ("]" === b) {
                                        g("]");
                                        c = a;
                                        break a
                                    }
                                    g(",");
                                    h()
                                }
                            }
                            d("Bad array")
                        }
                        return c;
                    case '"':
                        return i();
                    case "-":
                        return e();
                    default:
                        return "0" <= b && "9" >= b ? e() : s()
                }
            };
            return function(c) {
                f = c;
                a = 0;
                b = " ";
                c = n();
                h();
                b && d("Syntax error");
                return c
            }
        }();
        d.base64Encode = function(a) {
            var b, c, f, p, g = 0,
                e = 0,
                i = "",
                i = [];
            if (!a) return a;
            a = d.utf8Encode(a);
            do b = a.charCodeAt(g++), c =
                a.charCodeAt(g++), f = a.charCodeAt(g++), p = b << 16 | c << 8 | f, b = p >> 18 & 63, c = p >> 12 & 63, f = p >> 6 & 63, p &= 63, i[e++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(p); while (g < a.length);
            i = i.join("");
            switch (a.length % 3) {
                case 1:
                    i = i.slice(0, -2) + "==";
                    break;
                case 2:
                    i =
                        i.slice(0, -1) + "="
            }
            return i
        };
        d.utf8Encode = function(a) {
            var a = (a + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
                b = "",
                c, f, d = 0,
                g;
            c = f = 0;
            d = a.length;
            for (g = 0; g < d; g++) {
                var e = a.charCodeAt(g),
                    i = null;
                128 > e ? f++ : i = 127 < e && 2048 > e ? String.fromCharCode(e >> 6 | 192, e & 63 | 128) : String.fromCharCode(e >> 12 | 224, e >> 6 & 63 | 128, e & 63 | 128);
                null !== i && (f > c && (b += a.substring(c, f)), b += i, c = f = g + 1)
            }
            f > c && (b += a.substring(c, a.length));
            return b
        };
        d.UUID = function() {
            var a = function() {
                    for (var a = 1 * new Date, b = 0; a == 1 * new Date;) b++;
                    return a.toString(16) + b.toString(16)
                },
                b = function() {
                    function a(b, c) {
                        var d, f = 0;
                        for (d = 0; d < c.length; d++) f |= g[d] << 8 * d;
                        return b ^ f
                    }
                    var b, d, g = [],
                        e = 0;
                    for (b = 0; b < v.length; b++) d = v.charCodeAt(b), g.unshift(d & 255), 4 <= g.length && (e = a(e, g), g = []);
                    0 < g.length && (e = a(e, g));
                    return e.toString(16)
                };
            return function() {
                var c = (U.height * U.width).toString(16);
                return a() + "-" + Math.random().toString(16).replace(".", "") + "-" + b() + "-" + c + "-" + a()
            }
        }();
        d.isBlockedUA = function(a) {
            return /(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(a) ? !0 : !1
        };
        d.HTTPBuildQuery =
            function(a, b) {
                var c, f, p = [];
                d.isUndefined(b) && (b = "&");
                d.each(a, function(a, b) {
                    c = encodeURIComponent(a.toString());
                    f = encodeURIComponent(b);
                    p[p.length] = f + "=" + c
                });
                return p.join(b)
            };
        d.getQueryParam = function(a, b) {
            var b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
                c = RegExp("[\\?&]" + b + "=([^&#]*)").exec(a);
            return null === c || c && "string" !== typeof c[1] && c[1].length ? "" : decodeURIComponent(c[1]).replace(/\+/g, " ")
        };
        d.getHashParam = function(a, b) {
            var c = a.match(RegExp(b + "=([^&]*)"));
            return c ? c[1] : null
        };
        d.cookie = {
            get: function(a) {
                for (var a =
                        a + "=", b = l.cookie.split(";"), c = 0; c < b.length; c++) {
                    for (var d = b[c];
                        " " == d.charAt(0);) d = d.substring(1, d.length);
                    if (0 === d.indexOf(a)) return decodeURIComponent(d.substring(a.length, d.length))
                }
                return null
            },
            parse: function(a) {
                var b;
                try {
                    b = d.JSONDecode(d.cookie.get(a)) || {}
                } catch (c) {}
                return b
            },
            set_seconds: function(a, b, c, d, p) {
                var f;
                var g = "",
                    e = "",
                    i = "";
                d && (f = (g = (g = l.location.hostname.match(na)) ? g[0] : "") ? "; domain=." + g : "", g = f);
                c && (e = new Date, e.setTime(e.getTime() + 1E3 * c), e = "; expires=" + e.toGMTString());
                p && (i = "; secure");
                l.cookie = a + "=" + encodeURIComponent(b) + e + "; path=/" + g + i
            },
            set: function(a, b, c, d, p) {
                var f;
                var g = "",
                    e = "",
                    i = "";
                d && (f = (g = (g = l.location.hostname.match(na)) ? g[0] : "") ? "; domain=." + g : "", g = f);
                c && (e = new Date, e.setTime(e.getTime() + 864E5 * c), e = "; expires=" + e.toGMTString());
                p && (i = "; secure");
                a = a + "=" + encodeURIComponent(b) + e + "; path=/" + g + i;
                return l.cookie = a
            },
            remove: function(a, b) {
                d.cookie.set(a, "", -1, b)
            }
        };
        var ea = null;
        d.localStorage = {
            is_supported: function() {
                if (null !== ea) return ea;
                var a = !0;
                try {
                    d.localStorage.set("__mplssupport__",
                        "xyz"), "xyz" !== d.localStorage.get("__mplssupport__") && (a = !1), d.localStorage.remove("__mplssupport__")
                } catch (b) {
                    a = !1
                }
                a || m.error("localStorage unsupported; falling back to cookie store");
                return ea = a
            },
            error: function(a) {
                m.error("localStorage error: " + a)
            },
            get: function(a) {
                try {
                    return window.localStorage.getItem(a)
                } catch (b) {
                    d.localStorage.error(b)
                }
                return null
            },
            parse: function(a) {
                try {
                    return d.JSONDecode(d.localStorage.get(a)) || {}
                } catch (b) {}
                return null
            },
            set: function(a, b) {
                try {
                    window.localStorage.setItem(a, b)
                } catch (c) {
                    d.localStorage.error(c)
                }
            },
            remove: function(a) {
                try {
                    window.localStorage.removeItem(a)
                } catch (b) {
                    d.localStorage.error(b)
                }
            }
        };
        d.register_event = function() {
            function a(a, f, p) {
                return function(g) {
                    if (g = g || b(window.event)) {
                        var e = !0,
                            i;
                        d.isFunction(p) && (i = p(g));
                        g = f.call(a, g);
                        if (!1 === i || !1 === g) e = !1;
                        return e
                    }
                }
            }

            function b(a) {
                if (a) a.preventDefault = b.preventDefault, a.stopPropagation = b.stopPropagation;
                return a
            }
            b.preventDefault = function() {
                this.returnValue = !1
            };
            b.stopPropagation = function() {
                this.cancelBubble = !0
            };
            return function(b, d, p, g, e) {
                b ? b.addEventListener &&
                    !g ? b.addEventListener(d, p, !!e) : (d = "on" + d, b[d] = a(b, p, b[d])) : m.error("No valid element provided to register_event")
            }
        }();
        var Ha = /^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/;
        d.dom_query = function() {
            function a(a, b) {
                var d;
                return 0 <= (" " + a.className + " ").replace(c, " ").indexOf(" " + b + " ")
            }

            function b(b) {
                if (!l.getElementsByTagName) return [];
                var b = b.split(" "),
                    c, g, e, i, h, s, n, q = [l];
                for (i = 0; i < b.length; i++)
                    if (c = b[i].replace(/^\s+/, "").replace(/\s+$/, ""), -1 < c.indexOf("#")) {
                        g = c.split("#");
                        c = g[0];
                        q = l.getElementById(g[1]);
                        if (!q || c && q.nodeName.toLowerCase() != c) return [];
                        q = [q]
                    } else if (-1 < c.indexOf(".")) {
                    g = c.split(".");
                    c = g[0];
                    var A = g[1];
                    c || (c = "*");
                    g = [];
                    for (h = e = 0; h < q.length; h++) {
                        n = "*" == c ? q[h].all ? q[h].all : q[h].getElementsByTagName("*") : q[h].getElementsByTagName(c);
                        for (s = 0; s < n.length; s++) g[e++] = n[s]
                    }
                    q = [];
                    for (h = c = 0; h < g.length; h++) g[h].className && d.isString(g[h].className) && a(g[h], A) && (q[c++] = g[h])
                } else if (g = c.match(Ha)) {
                    c = g[1];
                    var j = g[2],
                        A = g[3],
                        k = g[4];
                    c || (c = "*");
                    g = [];
                    for (h = e = 0; h < q.length; h++) {
                        n = "*" == c ? q[h].all ? q[h].all : q[h].getElementsByTagName("*") :
                            q[h].getElementsByTagName(c);
                        for (s = 0; s < n.length; s++) g[e++] = n[s]
                    }
                    q = [];
                    c = 0;
                    switch (A) {
                        case "=":
                            A = function(a) {
                                return a.getAttribute(j) == k
                            };
                            break;
                        case "~":
                            A = function(a) {
                                return a.getAttribute(j).match(RegExp("\\b" + k + "\\b"))
                            };
                            break;
                        case "|":
                            A = function(a) {
                                return a.getAttribute(j).match(RegExp("^" + k + "-?"))
                            };
                            break;
                        case "^":
                            A = function(a) {
                                return 0 === a.getAttribute(j).indexOf(k)
                            };
                            break;
                        case "$":
                            A = function(a) {
                                return a.getAttribute(j).lastIndexOf(k) == a.getAttribute(j).length - k.length
                            };
                            break;
                        case "*":
                            A = function(a) {
                                return -1 <
                                    a.getAttribute(j).indexOf(k)
                            };
                            break;
                        default:
                            A = function(a) {
                                return a.getAttribute(j)
                            }
                    }
                    q = [];
                    for (h = c = 0; h < g.length; h++) A(g[h]) && (q[c++] = g[h])
                } else {
                    g = [];
                    for (h = e = 0; h < q.length; h++) {
                        n = q[h].getElementsByTagName(c);
                        for (s = 0; s < n.length; s++) g[e++] = n[s]
                    }
                    q = g
                }
                return q
            }
            var c = /[\t\r\n]/g;
            return function(a) {
                return d.isElement(a) ? [a] : d.isObject(a) && !d.isUndefined(a.length) ? a : b.call(this, a)
            }
        }();
        d.info = {
            campaignParams: function() {
                var a = "utm_source utm_medium utm_campaign utm_content utm_term".split(" "),
                    b = "",
                    c = {};
                d.each(a,
                    function(a) {
                        b = d.getQueryParam(l.URL, a);
                        b.length && (c[a] = b)
                    });
                return c
            },
            searchEngine: function(a) {
                return 0 === a.search("https?://(.*)google.([^/?]*)") ? "google" : 0 === a.search("https?://(.*)bing.com") ? "bing" : 0 === a.search("https?://(.*)yahoo.com") ? "yahoo" : 0 === a.search("https?://(.*)duckduckgo.com") ? "duckduckgo" : null
            },
            searchInfo: function(a) {
                var b = d.info.searchEngine(a),
                    c;
                c = {};
                if (null !== b) c.$search_engine = b, a = d.getQueryParam(a, "yahoo" != b ? "q" : "p"), a.length && (c.mp_keyword = a);
                return c
            },
            browser: function(a, b, c) {
                b =
                    b || "";
                return c || d.includes(a, " OPR/") ? d.includes(a, "Mini") ? "Opera Mini" : "Opera" : /(BlackBerry|PlayBook|BB10)/i.test(a) ? "BlackBerry" : d.includes(a, "IEMobile") || d.includes(a, "WPDesktop") ? "Internet Explorer Mobile" : d.includes(a, "Edge") ? "Microsoft Edge" : d.includes(a, "FBIOS") ? "Facebook Mobile" : d.includes(a, "Chrome") ? "Chrome" : d.includes(a, "CriOS") ? "Chrome iOS" : d.includes(a, "UCWEB") || d.includes(a, "UCBrowser") ? "UC Browser" : d.includes(a, "FxiOS") ? "Firefox iOS" : d.includes(b, "Apple") ? d.includes(a, "Mobile") ? "Mobile Safari" :
                    "Safari" : d.includes(a, "Android") ? "Android Mobile" : d.includes(a, "Konqueror") ? "Konqueror" : d.includes(a, "Firefox") ? "Firefox" : d.includes(a, "MSIE") || d.includes(a, "Trident/") ? "Internet Explorer" : d.includes(a, "Gecko") ? "Mozilla" : ""
            },
            browserVersion: function(a, b, c) {
                b = {
                    "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
                    "Microsoft Edge": /Edge\/(\d+(\.\d+)?)/,
                    Chrome: /Chrome\/(\d+(\.\d+)?)/,
                    "Chrome iOS": /CriOS\/(\d+(\.\d+)?)/,
                    "UC Browser": /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
                    Safari: /Version\/(\d+(\.\d+)?)/,
                    "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
                    Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
                    Firefox: /Firefox\/(\d+(\.\d+)?)/,
                    "Firefox iOS": /FxiOS\/(\d+(\.\d+)?)/,
                    Konqueror: /Konqueror:(\d+(\.\d+)?)/,
                    BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
                    "Android Mobile": /android\s(\d+(\.\d+)?)/,
                    "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
                    Mozilla: /rv:(\d+(\.\d+)?)/
                }[d.info.browser(a, b, c)];
                if (void 0 === b) return null;
                a = a.match(b);
                return !a ? null : parseFloat(a[a.length - 2])
            },
            os: function() {
                return /Windows/i.test(v) ? /Phone/.test(v) || /WPDesktop/.test(v) ? "Windows Phone" : "Windows" :
                    /(iPhone|iPad|iPod)/.test(v) ? "iOS" : /Android/.test(v) ? "Android" : /(BlackBerry|PlayBook|BB10)/i.test(v) ? "BlackBerry" : /Mac/i.test(v) ? "Mac OS X" : /Linux/.test(v) ? "Linux" : /CrOS/.test(v) ? "Chrome OS" : ""
            },
            device: function(a) {
                return /Windows Phone/i.test(a) || /WPDesktop/.test(a) ? "Windows Phone" : /iPad/.test(a) ? "iPad" : /iPod/.test(a) ? "iPod Touch" : /iPhone/.test(a) ? "iPhone" : /(BlackBerry|PlayBook|BB10)/i.test(a) ? "BlackBerry" : /Android/.test(a) ? "Android" : ""
            },
            referringDomain: function(a) {
                a = a.split("/");
                return 3 <= a.length ?
                    a[2] : ""
            },
            properties: function() {
                return d.extend(d.strip_empty_properties({
                    $os: d.info.os(),
                    $browser: d.info.browser(v, K.vendor, P),
                    $referrer: l.referrer,
                    $referring_domain: d.info.referringDomain(l.referrer),
                    $device: d.info.device(v)
                }), {
                    $host: window.location.host,
                    $pathname: o.location.pathname,
                    $current_url: o.location.href,
                    $browser_version: d.info.browserVersion(v, K.vendor, P),
                    $screen_height: U.height,
                    $screen_width: U.width,
                    mp_lib: "web",
                    $lib_version: "1.3.0",
                    $insert_id: Math.random().toString(36).substring(2, 10) +
                        Math.random().toString(36).substring(2, 10),
                    time: d.timestamp() / 1E3
                })
            },
            people_properties: function() {
                return d.extend(d.strip_empty_properties({
                    $os: d.info.os(),
                    $browser: d.info.browser(v, K.vendor, P)
                }), {
                    $browser_version: d.info.browserVersion(v, K.vendor, P)
                })
            },
            pageviewInfo: function(a) {
                return d.strip_empty_properties({
                    mp_page: a,
                    mp_referrer: l.referrer,
                    mp_browser: d.info.browser(v, K.vendor, P),
                    mp_platform: d.info.os()
                })
            }
        };
        d.toArray = d.toArray;
        d.isObject = d.isObject;
        d.JSONEncode = d.JSONEncode;
        d.JSONDecode = d.JSONDecode;
        d.isBlockedUA = d.isBlockedUA;
        d.isEmptyObject = d.isEmptyObject;
        d.info = d.info;
        d.info.device = d.info.device;
        d.info.browser = d.info.browser;
        d.info.properties = d.info.properties;
        var F = {
            _initializedTokens: [],
            _previousElementSibling: function(a) {
                if (a.previousElementSibling) return a.previousElementSibling;
                do a = a.previousSibling; while (a && !(a && 1 === a.nodeType));
                return a
            },
            _loadScript: function(a, b) {
                var c = document.createElement("script");
                c.type = "text/javascript";
                c.src = a;
                c.onload = b;
                var d = document.getElementsByTagName("script");
                0 < d.length ? d[0].parentNode.insertBefore(c, d[0]) : document.body.appendChild(c)
            },
            _getPropertiesFromElement: function(a, b) {
                var c = {
                    attr__class: Q(b),
                    tag_name: b.tagName.toLowerCase(),
                    attr__id: b.id
                };
                if ("5a690268-f2da-4301-ab9f-c8f5284ba3f2" === a.get_config("token") && b.attributes["data-testid"]) c["attr__data-testid"] = b.attributes["data-testid"].value;
                for (var d = 1, e = 1, g = b; g = this._previousElementSibling(g);) d++, g.tagName === b.tagName && e++;
                c.nth_child = d;
                c.nth_of_type = e;
                return c
            },
            _getDefaultProperties: function(a) {
                return {
                    $event_type: a,
                    $ce_version: 1
                }
            },
            _extractCustomPropertyValue: function(a) {
                var b = [];
                d.each(document.querySelectorAll(a.css_selector), function(a) {
                    var d; - 1 < ["input", "select"].indexOf(a.tagName.toLowerCase()) ? d = a.value : a.textContent && (d = a.textContent);
                    $(d) && b.push(d)
                });
                return b.join(", ")
            },
            _getCustomProperties: function(a) {
                var b = {};
                d.each(this._customProperties, function(c) {
                    d.each(c.event_selectors, function(f) {
                        f = document.querySelectorAll(f);
                        d.each(f, function(f) {
                                d.includes(a, f) && Z(f) && (b[c.name] = this._extractCustomPropertyValue(c))
                            },
                            this)
                    }, this)
                }, this);
                return b
            },
            _getEventTarget: function(a) {
                return "undefined" === typeof a.target ? a.srcElement : a.target
            },
            _trackEvent: function(a, b) {
                var c = this._getEventTarget(a);
                if (c && 3 === c.nodeType) c = c.parentNode;
                if (ya(c, a)) {
                    for (var f = [c], e = c; e.parentNode && !H(e, "body");) f.push(e.parentNode), e = e.parentNode;
                    var g = [],
                        h, i = !1;
                    d.each(f, function(a) {
                        var c = Z(a);
                        "a" === a.tagName.toLowerCase() && (h = a.getAttribute("href"), h = c && $(h) && h);
                        c = Q(a).split(" ");
                        d.includes(c, "fp-no-track") && (i = !0);
                        g.push(this._getPropertiesFromElement(b,
                            a))
                    }, this);
                    if (i) return !1;
                    var D;
                    (c = xa(c)) && c.length && (D = c);
                    f = d.extend({}, this._getDefaultProperties(a.type), {
                        $elements: g,
                        $el_attr__href: h,
                        $el_text: D
                    }, this._getCustomProperties(f));
                    b._processEvent("$web_event", a, {}, f);
                    return !0
                }
            },
            _navigate: function(a) {
                window.location.href = a
            },
            _interceptFunction: function(a, b, c) {
                var d = a[b];
                a[b] = function() {
                    var b = d.apply(a, arguments);
                    c();
                    return b
                }
            },
            _addDomEventHandlers: function(a) {
                var b = d.bind(function(b) {
                    b = b || window.event;
                    this._trackEvent(b, a)
                }, this);
                d.register_event(document,
                    "submit", b, !1, !0);
                d.register_event(document, "change", b, !1, !0);
                d.register_event(document, "click", b, !1, !0);
                if (window.history.pushState) {
                    var c = this,
                        b = function() {
                            c._prevPageviewPath !== window.location.pathname && c._triggerPageview(a)
                        };
                    this._interceptFunction(window.history, "pushState", b);
                    this._interceptFunction(window.history, "replaceState", b);
                    window.addEventListener("popstate", b, !0)
                }
            },
            _customProperties: {},
            init: function(a) {
                if (!document || !document.body) console.log("document not ready yet, trying again in 500 milliseconds..."),
                    setTimeout(function() {
                        this.init(a)
                    }, 500);
                else {
                    var b = a.get_config("token"); - 1 < this._initializedTokens.indexOf(b) ? console.log('autotrack already initialized for token "' + b + '"') : (this._initializedTokens.push(b), this._maybeLoadEditor(a) || (this._triggerPageview(a), this._addDomEventHandlers(a)))
                }
            },
            _prevPageviewPath: null,
            _triggerPageview: function(a) {
                this._prevPageviewPath = window.location.pathname;
                a.register({
                    $pageview_id: d.UUID()
                });
                var b = d.extend({}, {
                    $title: document.title
                }, this._getDefaultProperties("pageview"));
                a._processEvent("$web_event", null, {}, b)
            },
            _editorParamsFromHash: function(a, b) {
                var c;
                try {
                    var f = d.getHashParam(b, "state"),
                        f = JSON.parse(decodeURIComponent(f));
                    c = {
                        temporaryToken: f.temporaryToken,
                        projectToken: f.projectToken
                    };
                    window.sessionStorage.setItem("editorParams", JSON.stringify(c));
                    f.desiredHash ? window.location.hash = f.desiredHash : window.history ? history.replaceState("", document.title, window.location.pathname + window.location.search) : window.location.hash = ""
                } catch (e) {
                    console.error("Unable to parse data from hash",
                        e)
                }
                return c
            },
            _maybeLoadEditor: function(a) {
                try {
                    var b = !1;
                    if (d.getHashParam(window.location.hash, "state")) var c = d.getHashParam(window.location.hash, "state"),
                        c = JSON.parse(decodeURIComponent(c)),
                        b = "mpeditor" === c.action;
                    var f = !!window.sessionStorage.getItem("_mpcehash"),
                        e;
                    b ? e = this._editorParamsFromHash(a, window.location.hash) : f ? (e = this._editorParamsFromHash(a, window.sessionStorage.getItem("_mpcehash")), window.sessionStorage.removeItem("_mpcehash")) : e = JSON.parse(window.sessionStorage.getItem("editorParams") ||
                        "{}");
                    return e.projectToken && a.get_config("token") === e.projectToken ? (this._loadEditor(a, e), !0) : !1
                } catch (g) {
                    return !1
                }
            },
            _loadEditor: function(a, b) {
                return !window._mpEditorLoaded ? (window._mpEditorLoaded = !0, this._loadScript(a.get_config("app_host") + "/static/js/editor.js", function() {
                    window.fp_load_editor(b)
                }), !0) : !1
            },
            enabledForProject: function(a, b, c) {
                for (var b = !d.isUndefined(b) ? b : 10, c = !d.isUndefined(c) ? c : 10, f = 0, e = 0; e < a.length; e++) f += a.charCodeAt(e);
                return f % b < c
            },
            isBrowserSupported: function() {
                return d.isFunction(document.querySelectorAll)
            }
        };
        d.bind_instance_methods(F);
        d.safewrap_instance_methods(F);
        var Da = "__mp_opt_in_out_",
            z = {
                set_action: function(a, b) {
                    var c = {},
                        f = {};
                    d.isObject(a) ? d.each(a, function(a, b) {
                        this._is_reserved_property(b) || (f[b] = a)
                    }, this) : f[a] = b;
                    c.$set = f;
                    return c
                },
                unset_action: function(a) {
                    var b = {},
                        c = [];
                    d.isArray(a) || (a = [a]);
                    d.each(a, function(a) {
                        this._is_reserved_property(a) || c.push(a)
                    }, this);
                    b.$unset = c;
                    return b
                },
                set_once_action: function(a, b) {
                    var c = {},
                        f = {};
                    d.isObject(a) ? d.each(a, function(a, b) {
                        this._is_reserved_property(b) || (f[b] =
                            a)
                    }, this) : f[a] = b;
                    c.$set_once = f;
                    return c
                },
                union_action: function(a, b) {
                    var c = {},
                        f = {};
                    d.isObject(a) ? d.each(a, function(a, b) {
                        this._is_reserved_property(b) || (f[b] = d.isArray(a) ? a : [a])
                    }, this) : f[a] = d.isArray(b) ? b : [b];
                    c.$union = f;
                    return c
                },
                append_action: function(a, b) {
                    var c = {},
                        f = {};
                    d.isObject(a) ? d.each(a, function(a, b) {
                        this._is_reserved_property(b) || (f[b] = a)
                    }, this) : f[a] = b;
                    c.$append = f;
                    return c
                },
                remove_action: function(a, b) {
                    var c = {},
                        f = {};
                    d.isObject(a) ? d.each(a, function(a, b) {
                            this._is_reserved_property(b) || (f[b] = a)
                        },
                        this) : f[a] = b;
                    c.$remove = f;
                    return c
                },
                delete_action: function() {
                    return {
                        $delete: ""
                    }
                }
            },
            r = function() {};
        d.extend(r.prototype, z);
        r.prototype._init = function(a, b, c) {
            this._freshpaint = a;
            this._group_key = b;
            this._group_id = c
        };
        r.prototype.set = I(function(a, b, c) {
            var f = this.set_action(a, b);
            d.isObject(a) && (c = b);
            return this._send_request(f, c)
        });
        r.prototype.set_once = I(function(a, b, c) {
            var f = this.set_once_action(a, b);
            d.isObject(a) && (c = b);
            return this._send_request(f, c)
        });
        r.prototype.unset = I(function(a, b) {
            return this._send_request(this.unset_action(a),
                b)
        });
        r.prototype.union = I(function(a, b, c) {
            d.isObject(a) && (c = b);
            return this._send_request(this.union_action(a, b), c)
        });
        r.prototype["delete"] = I(function(a) {
            return this._send_request(this.delete_action(), a)
        });
        r.prototype.remove = I(function(a, b, c) {
            return this._send_request(this.remove_action(a, b), c)
        });
        r.prototype._send_request = function(a, b) {
            a.$group_key = this._group_key;
            a.$group_id = this._group_id;
            a.$token = this._get_config("token");
            var c = d.encodeDates(a),
                f = d.truncate(c, 255),
                c = d.JSONEncode(c),
                c = d.base64Encode(c);
            m.log(a);
            this._freshpaint._send_request(this._freshpaint.get_config("api_host") + "/groups/", {
                data: c
            }, this._freshpaint._prepare_callback(b, f));
            return f
        };
        r.prototype._is_reserved_property = function(a) {
            return "$group_key" === a || "$group_id" === a
        };
        r.prototype._get_config = function(a) {
            return this._freshpaint.get_config(a)
        };
        r.prototype.toString = function() {
            return this._freshpaint.toString() + ".group." + this._group_key + "." + this._group_id
        };
        r.prototype.remove = r.prototype.remove;
        r.prototype.set = r.prototype.set;
        r.prototype.set_once =
            r.prototype.set_once;
        r.prototype.union = r.prototype.union;
        r.prototype.unset = r.prototype.unset;
        r.prototype.toString = r.prototype.toString;
        var ia = function(a, b, c, d, e, g) {
            this.name = a;
            this.id = b;
            this.filter = c;
            this.enabledDestinations = d;
            this.snapshots = e;
            this.segmentCompatible = g
        };
        ia.prototype.matches = function(a, b) {
            return this.filter.matches(a, b)
        };
        var ka = function(a, b, c) {
            this.propName = a;
            this.opName = b;
            this.val = c
        };
        ka.prototype.matches = function(a, b) {
            var c = b[this.propName];
            return "=" === this.opName ? c === this.val : "contains" ===
                this.opName ? c.includes(this.val) : "css_matches" === this.opName ? null !== a.target.closest(this.val) : "wildcard_matches" === this.opName ? RegExp("^" + this.val.split("*").map(Ea).join(".*") + "$").test(c) : !1
        };
        var ba = function(a) {
            this.filters = a
        };
        ba.prototype.matches = function(a, b) {
            for (var c = 0; c < this.filters.length; c++)
                if (!this.filters[c].matches(a, b)) return !1;
            return !0
        };
        var fa, t, Ia = "__mps,__mpso,__mpus,__mpa,__mpap,__mpr,__mpu,$people_distinct_id,__alias,__cmpns,__timers,__user_props,__group_id,__group_props,__last_event_time".split(","),
            V = o.XMLHttpRequest && "withCredentials" in new XMLHttpRequest,
            oa = !V && -1 === v.indexOf("MSIE") && -1 === v.indexOf("Mozilla"),
            pa = {
                api_host: "https://api.perfalytics.com",
                app_host: "https://perfalytics.com",
                autotrack: !0,
                cdn: "https://perfalytics.com",
                cross_subdomain_cookie: !0,
                persistence: "cookie",
                persistence_name: "",
                cookie_name: "",
                loaded: function() {},
                store_google: !0,
                save_referrer: !0,
                test: !1,
                verbose: !1,
                img: !1,
                track_pageview: !0,
                debug: !1,
                track_links_timeout: 300,
                cookie_expiration: 365,
                upgrade: !1,
                disable_persistence: !1,
                disable_cookie: !1,
                secure_cookie: !1,
                ip: !0,
                opt_out_tracking_by_default: !1,
                opt_out_persistence_by_default: !1,
                opt_out_tracking_persistence_type: "localStorage",
                opt_out_tracking_cookie_prefix: null,
                property_blacklist: [],
                xhr_headers: {},
                inapp_protocol: "//",
                inapp_link_new_window: !1
            },
            qa = !1,
            y = function() {};
        y.prototype.create_properties = function() {};
        y.prototype.event_handler = function() {};
        y.prototype.after_track_handler = function() {};
        y.prototype.init = function(a) {
            this.mp = a;
            return this
        };
        y.prototype.track = function(a,
            b, c, f) {
            var e = this,
                g = d.dom_query(a);
            if (0 === g.length) m.error("The DOM query (" + a + ") returned 0 elements");
            else return d.each(g, function(a) {
                d.register_event(a, this.override_event, function(a) {
                    var d = {},
                        g = e.create_properties(c, this),
                        h = e.mp.get_config("track_links_timeout");
                    e.event_handler(a, this, d);
                    o.setTimeout(e.track_callback(f, g, d, !0), h);
                    e.mp.track(b, g, e.track_callback(f, g, d))
                })
            }, this), !0
        };
        y.prototype.track_callback = function(a, b, c, d) {
            var d = d || !1,
                e = this;
            return function() {
                if (!c.callback_fired) c.callback_fired = !0, a && !1 === a(d, b) || e.after_track_handler(b, c, d)
            }
        };
        y.prototype.create_properties = function(a, b) {
            return "function" === typeof a ? a(b) : d.extend({}, a)
        };
        var L = function() {
            this.override_event = "click"
        };
        d.inherit(L, y);
        L.prototype.create_properties = function(a, b) {
            var c = L.superclass.create_properties.apply(this, arguments);
            if (b.href) c.url = b.href;
            return c
        };
        L.prototype.event_handler = function(a, b, c) {
            c.new_tab = 2 === a.which || a.metaKey || a.ctrlKey || "_blank" === b.target;
            c.href = b.href;
            c.new_tab || a.preventDefault()
        };
        L.prototype.after_track_handler =
            function(a, b) {
                b.new_tab || setTimeout(function() {
                    o.location = b.href
                }, 0)
            };
        var W = function() {
            this.override_event = "submit"
        };
        d.inherit(W, y);
        W.prototype.event_handler = function(a, b, c) {
            c.element = b;
            a.preventDefault()
        };
        W.prototype.after_track_handler = function(a, b) {
            setTimeout(function() {
                b.element.submit()
            }, 0)
        };
        var k = function(a) {
            this.props = {};
            this.campaign_params_saved = !1;
            this.name = a.persistence_name ? "mp_" + a.persistence_name : "mp_" + a.token + "_perfalytics";
            var b = a.persistence;
            if ("cookie" !== b && "localStorage" !== b) m.critical("Unknown persistence type " +
                b + "; falling back to cookie"), b = a.persistence = "cookie";
            this.storage = "localStorage" === b && d.localStorage.is_supported() ? d.localStorage : d.cookie;
            this.load();
            this.update_config(a);
            this.upgrade(a);
            this.save()
        };
        k.prototype.properties = function() {
            var a = {};
            d.each(this.props, function(b, c) {
                d.include(Ia, c) || (a[c] = b)
            });
            return a
        };
        k.prototype._customSuperProperties = function() {
            var a = {},
                b = "utm_source,utm_medium,utm_campaign,utm_content,utm_term,mp_keyword,distinct_id,mp_name_tag,mp_page,mp_referrer,mp_browser,mp_platform,mp_lib".split(",");
            d.each(this.properties(), function(c, f) {
                0 < f.length && "$" !== f[0] && !d.include(b, f) && (a[f] = c)
            });
            return a
        };
        k.prototype.load = function() {
            if (!this.disabled) {
                var a = this.storage.parse(this.name);
                a && (this.props = d.extend({}, a))
            }
        };
        k.prototype.upgrade = function(a) {
            var b = a.upgrade,
                c;
            if (b) c = "mp_super_properties", "string" === typeof b && (c = b), b = this.storage.parse(c), this.storage.remove(c), this.storage.remove(c, !0), b && (this.props = d.extend(this.props, b.all, b.events));
            if (!a.cookie_name && "freshpaint" !== a.name && (c = "mp_" + a.token +
                    "_" + a.name, b = this.storage.parse(c))) this.storage.remove(c), this.storage.remove(c, !0), this.register_once(b);
            this.storage === d.localStorage && (b = d.cookie.parse(this.name), d.cookie.remove(this.name), d.cookie.remove(this.name, !0), b && this.register_once(b))
        };
        k.prototype.save = function() {
            this.disabled || (this._expire_notification_campaigns(), this.storage.set(this.name, d.JSONEncode(this.props), this.expire_days, this.cross_subdomain, this.secure))
        };
        k.prototype.remove = function() {
            this.storage.remove(this.name, !1);
            this.storage.remove(this.name, !0)
        };
        k.prototype.clear = function() {
            this.remove();
            this.props = {}
        };
        k.prototype.register_once = function(a, b, c) {
            return d.isObject(a) ? ("undefined" === typeof b && (b = "None"), this.expire_days = "undefined" === typeof c ? this.default_expiry : c, d.each(a, function(a, c) {
                if (!this.props.hasOwnProperty(c) || this.props[c] === b) this.props[c] = a
            }, this), this.save(), !0) : !1
        };
        k.prototype.register = function(a, b) {
            return d.isObject(a) ? (this.expire_days = "undefined" === typeof b ? this.default_expiry : b, d.extend(this.props,
                a), this.save(), !0) : !1
        };
        k.prototype.unregister = function(a) {
            a in this.props && (delete this.props[a], this.save())
        };
        k.prototype._expire_notification_campaigns = d.safewrap(function() {
            var a = this.props.__cmpns,
                b = E ? 6E4 : 36E5;
            if (a) {
                for (var c in a) 1 * new Date - a[c] > b && delete a[c];
                d.isEmptyObject(a) && delete this.props.__cmpns
            }
        });
        k.prototype._maybeStartNewSession = function() {
            var a = d.timestamp(),
                b = {};
            b.__last_event_time = a;
            var c = this.props.__last_event_time;
            if (!c || c < a - 18E5) b.$session_id = d.UUID();
            this.register(b);
            return !!b.$session_id
        };
        k.prototype.update_campaign_params = function() {
            if (!this.campaign_params_saved) this.register_once(d.info.campaignParams()), this.campaign_params_saved = !0
        };
        k.prototype.update_search_keyword = function(a) {
            this.register(d.info.searchInfo(a))
        };
        k.prototype.update_referrer_info = function(a) {
            this.register_once({
                $initial_referrer: a || "$direct",
                $initial_referring_domain: d.info.referringDomain(a) || "$direct"
            }, "")
        };
        k.prototype.get_referrer_info = function() {
            return d.strip_empty_properties({
                $initial_referrer: this.props.$initial_referrer,
                $initial_referring_domain: this.props.$initial_referring_domain
            })
        };
        k.prototype.safe_merge = function(a) {
            d.each(this.props, function(b, c) {
                c in a || (a[c] = b)
            });
            return a
        };
        k.prototype.update_config = function(a) {
            this.default_expiry = this.expire_days = a.cookie_expiration;
            this.set_disabled(a.disable_persistence);
            this.set_cross_subdomain(a.cross_subdomain_cookie);
            this.set_secure(a.secure_cookie)
        };
        k.prototype.set_disabled = function(a) {
            (this.disabled = a) ? this.remove(): this.save()
        };
        k.prototype.set_cross_subdomain = function(a) {
            if (a !==
                this.cross_subdomain) this.cross_subdomain = a, this.remove(), this.save()
        };
        k.prototype.get_cross_subdomain = function() {
            return this.cross_subdomain
        };
        k.prototype.set_secure = function(a) {
            if (a !== this.secure) this.secure = a ? !0 : !1, this.remove(), this.save()
        };
        k.prototype._add_to_people_queue = function(a, b) {
            var c = this._get_queue_key(a),
                f = b[a],
                e = this._get_or_create_queue("$set"),
                g = this._get_or_create_queue("$set_once"),
                h = this._get_or_create_queue("$unset"),
                i = this._get_or_create_queue("$add"),
                D = this._get_or_create_queue("$union"),
                j = this._get_or_create_queue("$remove", []),
                n = this._get_or_create_queue("$append", []);
            "__mps" === c ? (d.extend(e, f), this._pop_from_people_queue("$add", f), this._pop_from_people_queue("$union", f), this._pop_from_people_queue("$unset", f)) : "__mpso" === c ? (d.each(f, function(a, b) {
                b in g || (g[b] = a)
            }), this._pop_from_people_queue("$unset", f)) : "__mpus" === c ? d.each(f, function(a) {
                d.each([e, g, i, D], function(b) {
                    a in b && delete b[a]
                });
                d.each(n, function(b) {
                    a in b && delete b[a]
                });
                h[a] = !0
            }) : "__mpa" === c ? (d.each(f, function(a, b) {
                b in
                    e ? e[b] += a : (b in i || (i[b] = 0), i[b] += a)
            }, this), this._pop_from_people_queue("$unset", f)) : "__mpu" === c ? (d.each(f, function(a, b) {
                d.isArray(a) && (b in D || (D[b] = []), D[b] = D[b].concat(a))
            }), this._pop_from_people_queue("$unset", f)) : "__mpr" === c ? (j.push(f), this._pop_from_people_queue("$append", f)) : "__mpap" === c && (n.push(f), this._pop_from_people_queue("$unset", f));
            m.log("FRESHPAINT PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):");
            m.log(b);
            this.save()
        };
        k.prototype._pop_from_people_queue = function(a, b) {
            var c = this._get_queue(a);
            d.isUndefined(c) || (d.each(b, function(b, e) {
                "$append" === a || "$remove" === a ? d.each(c, function(a) {
                    a[e] === b && delete a[e]
                }) : delete c[e]
            }, this), this.save())
        };
        k.prototype._get_queue_key = function(a) {
            if ("$set" === a) return "__mps";
            if ("$set_once" === a) return "__mpso";
            if ("$unset" === a) return "__mpus";
            if ("$add" === a) return "__mpa";
            if ("$append" === a) return "__mpap";
            if ("$remove" === a) return "__mpr";
            if ("$union" === a) return "__mpu";
            m.error("Invalid queue:", a)
        };
        k.prototype._get_queue = function(a) {
            return this.props[this._get_queue_key(a)]
        };
        k.prototype._get_or_create_queue = function(a, b) {
            var c = this._get_queue_key(a),
                b = d.isUndefined(b) ? {} : b;
            return this.props[c] || (this.props[c] = b)
        };
        k.prototype.set_event_timer = function(a, b) {
            var c = this.props.__timers || {};
            c[a] = b;
            this.props.__timers = c;
            this.save()
        };
        k.prototype.remove_event_timer = function(a) {
            var b = (this.props.__timers || {})[a];
            d.isUndefined(b) || (delete this.props.__timers[a], this.save());
            return b
        };
        var e = function() {},
            j = function() {},
            h;
        d.extend(j.prototype, z);
        var X = function(a, b, c, f, h) {
            var g, C = N(c) ?
                t : t[c];
            if (C && 0 === fa) g = C;
            else {
                if (C && !d.isArray(C)) {
                    m.error("You have already initialized " + c);
                    return
                }
                g = new e
            }
            g._cached_groups = {};
            g._user_decide_check_complete = !1;
            g._events_tracked_before_user_decide_check_complete = [];
            g._eventDefs = f;
            g._pageviewProperties = {};
            g._init(a, b, c);
            g.people = new j;
            g.people._init(g);
            g._destInfo = {};
            d.each(h, function(a) {
                g._destInfo[a.name] = a
            });
            E = E || g.get_config("debug");
            !d.isUndefined(C) && d.isArray(C) && (g._execute_array.call(g.people, C.people), g._execute_array(C));
            g.__autotrack_enabled =
                g.get_config("autotrack");
            if (g.get_config("autotrack")) F.enabledForProject(g.get_config("token"), 100, 100) ? F.isBrowserSupported() ? F.init(g) : (g.__autotrack_enabled = !1, m.log("Disabling Automatic Event Collection because this browser is not supported")) : (g.__autotrack_enabled = !1, m.log("Not in active bucket: disabling Automatic Event Collection."));
            return g
        };
        e.prototype.init = function(a, b, c) {
            if (d.isUndefined(c)) m.error("You must name your new library: init(token, config, name)");
            else if (N(c)) m.error("You must initialize the main freshpaint object right after you include the Freshpaint js snippet");
            else return a = X(a, b, c, []), t[c] = a, a._loaded(), a
        };
        e.prototype._init = function(a, b, c) {
            this.__loaded = !0;
            this.config = {};
            this._triggered_notifs = [];
            this.set_config(d.extend({}, pa, b, {
                name: c,
                token: a,
                callback_fn: (N(c) ? c : "freshpaint." + c) + "._jsc"
            }));
            this._jsc = function() {};
            this.__dom_loaded_queue = [];
            this.__request_queue = [];
            this.__disabled_events = [];
            this._flags = {
                disable_all_events: !1,
                identify_called: !1
            };
            this.persistence = this.cookie = new k(this.config);
            this._gdpr_init();
            a = d.UUID();
            this.get_distinct_id() || this.register_once({
                distinct_id: a,
                $device_id: a
            }, "")
        };
        e.prototype._loaded = function() {
            this.get_config("loaded")(this)
        };
        e.prototype._dom_loaded = function() {
            d.each(this.__dom_loaded_queue, function(a) {
                this._track_dom.apply(this, a)
            }, this);
            this.has_opted_out_tracking() || d.each(this.__request_queue, function(a) {
                this._send_request.apply(this, a)
            }, this);
            delete this.__dom_loaded_queue;
            delete this.__request_queue
        };
        e.prototype._track_dom = function(a, b) {
            if (this.get_config("img")) return m.error("You can't use DOM tracking functions with img = true."), !1;
            if (!qa) return this.__dom_loaded_queue.push([a, b]), !1;
            var c = (new a).init(this);
            return c.track.apply(c, b)
        };
        e.prototype._prepare_callback = function(a, b) {
            if (d.isUndefined(a)) return null;
            if (V) return function(c) {
                a(c, b)
            };
            var c = this._jsc,
                f = "" + Math.floor(1E8 * Math.random()),
                e = this.get_config("callback_fn") + "[" + f + "]";
            c[f] = function(d) {
                delete c[f];
                a(d, b)
            };
            return e
        };
        e.prototype._send_request = function(a, b, c) {
            if (oa) this.__request_queue.push(arguments);
            else {
                var f = this.get_config("verbose");
                b.verbose && (f = !0);
                this.get_config("test") &&
                    (b.test = 1);
                f && (b.verbose = 1);
                this.get_config("img") && (b.img = 1);
                if (!V)
                    if (c) b.callback = c;
                    else if (f || this.get_config("test")) b.callback = "(function(){})";
                b.ip = this.get_config("ip") ? 1 : 0;
                b._ = (new Date).getTime().toString();
                a += "?" + d.HTTPBuildQuery(b);
                if ("img" in b) {
                    var e = l.createElement("img");
                    e.src = a;
                    l.body.appendChild(e)
                } else if (V) try {
                    var g = new XMLHttpRequest;
                    g.open("GET", a, !0);
                    e = this.get_config("xhr_headers");
                    d.each(e, function(a, b) {
                        g.setRequestHeader(b, a)
                    });
                    g.onreadystatechange = function() {
                        if (4 === g.readyState)
                            if (200 ===
                                g.status) {
                                if (c)
                                    if (f) {
                                        var a;
                                        try {
                                            a = d.JSONDecode(g.responseText)
                                        } catch (b) {
                                            m.error(b);
                                            return
                                        }
                                        c(a)
                                    } else c(Number(g.responseText))
                            } else a = "Bad HTTP status: " + g.status + " " + g.statusText, m.error(a), c && (f ? c({
                                status: 0,
                                error: a
                            }) : c(0))
                    };
                    g.send(null)
                } catch (h) {
                    m.error(h)
                } else {
                    e = l.createElement("script");
                    e.type = "text/javascript";
                    e.async = !0;
                    e.defer = !0;
                    e.src = a;
                    var i = l.getElementsByTagName("script")[0];
                    i.parentNode.insertBefore(e, i)
                }
            }
        };
        e.prototype._execute_array = function(a) {
            var b, c = [],
                f = [],
                e = [];
            d.each(a, function(a) {
                a &&
                    (b = a[0], d.isArray(b) ? e.push(a) : "function" === typeof a ? a.call(this) : d.isArray(a) && "alias" === b ? c.push(a) : d.isArray(a) && -1 !== b.indexOf("track") && "function" === typeof this[b] ? e.push(a) : f.push(a))
            }, this);
            a = function(a, b) {
                d.each(a, function(a) {
                    if (d.isArray(a[0])) {
                        var c = b;
                        d.each(a, function(a) {
                            c = c[a[0]].apply(c, a.slice(1))
                        })
                    } else this[a[0]].apply(this, a.slice(1))
                }, b)
            };
            a(c, this);
            a(f, this);
            a(e, this)
        };
        e.prototype.push = function(a) {
            this._execute_array([a])
        };
        e.prototype.disable = function(a) {
            "undefined" === typeof a ? this._flags.disable_all_events = !0 : this.__disabled_events = this.__disabled_events.concat(a)
        };
        e.prototype._processEvent = function(a, b, c, d, e, g) {
            this.persistence._maybeStartNewSession() && this._sendEvent("$web_event", null, {}, F._getDefaultProperties("session"));
            this._sendEvent(a, b, c, d, e, g)
        };
        e.prototype._sendEvent = function(a, b, c, f, e, g) {
            "undefined" === typeof e && (e = {});
            "function" !== typeof g && (g = function() {});
            if (this._event_is_disabled(a)) g(0);
            else {
                var c = d.extend({}, c, this._pageviewProperties),
                    h = d.extend({}, c, f, {
                        $event_name: a
                    });
                h.token = this.get_config("token");
                f = this.persistence.remove_event_timer(a);
                if (!d.isUndefined(f)) f = (new Date).getTime() - f, h.$duration = parseFloat((f / 1E3).toFixed(3));
                this.persistence.update_search_keyword(l.referrer);
                this.get_config("store_google") && this.persistence.update_campaign_params();
                this.get_config("save_referrer") && this.persistence.update_referrer_info(l.referrer);
                h = d.extend({}, d.info.properties(), this.persistence.properties(), h, {
                    $options: e
                });
                f = this.get_config("property_blacklist");
                d.isArray(f) ? d.each(f, function(a) {
                        delete h[a]
                    }) :
                    m.error("Invalid value for property_blacklist config: " + f);
                b = this._find_matching_event_defs(a, b, h);
                f = this._get_snapshot_properties(b);
                h = d.extend({}, h, f);
                c = d.extend({}, c, f, this.persistence._customSuperProperties());
                this._send_event_to_destinations(a, b, c, e);
                a = {
                    event: a,
                    properties: h
                };
                c = d.truncate(a, 255);
                e = d.JSONEncode(c);
                e = d.base64Encode(e);
                m.log("FRESHPAINT REQUEST:");
                m.log(c);
                this._send_request(this.get_config("api_host") + "/track", {
                    data: e
                }, this._prepare_callback(g, c));
                this._check_and_handle_triggered_notifications(a);
                return c
            }
        };
        e.prototype._find_matching_event_defs = function(a, b, c) {
            a = [];
            if (this._eventDefs)
                for (var d = 0; d < this._eventDefs.length; d++) try {
                    var e = this._eventDefs[d];
                    e.matches(b, c) && a.push(e)
                } catch (g) {}
            return a
        };
        e.prototype._get_snapshot_properties = function(a) {
            for (var b = {}, c = 0; c < a.length; c++)
                for (var d = a[c], e = 0; e < d.snapshots.length; e++) {
                    var g = d.snapshots[e];
                    b[g.name] = F._extractCustomPropertyValue(g)
                }
            return b
        };
        e.prototype._isManuallyTrackedEvent = function(a) {
            return 0 === a.length || "$" !== a[0]
        };
        var Ja = function(a,
            b) {
            this.name = a;
            this.props = b
        };
        e.prototype._transformEventForDest = function(a, b, c) {
            var f = a.name;
            this._destInfo && this._destInfo[c] && this._destInfo[c].settings && this._destInfo[c].mapping && d.each(this._destInfo[c].mapping, function(b) {
                var d = b.fpEvent,
                    b = b.destEvent;
                d === a.id && (m.log("Renaming event ", d, " from ", a.name, " to ", b, " because it matches the standard event for ", c), f = b)
            });
            return new Ja(f, b)
        };
        e.prototype._calculateDestinations = function(a, b, c) {
            var f = {},
                a = d.extend({
                    integrations: {}
                }, a);
            d.each(this._destInfo,
                function(d, e) {
                    c ? a.integrations[e] ? f[e] = a.integrations[e] : !1 !== a.integrations.All && !1 !== a.integrations[e] && (f[e] = !0) : b[e] && (f[e] = a.integrations[e] || b[e] || !0)
                });
            return f
        };
        e.prototype._send_event_to_destinations = function(a, b, c, f) {
            var e = this,
                g = d.extend({
                    integrations: {}
                }, f);
            if (0 === b.length && this._isManuallyTrackedEvent(a)) try {
                this._callIntegrations("track", a, c, f)
            } catch (h) {} else
                for (a = 0; a < b.length; a++) try {
                    var i = b[a],
                        j = this._calculateDestinations(g, i.enabledDestinations, i.segmentCompatible);
                    m.log("iterating over destinationsToSendTo",
                        j);
                    d.each(j, function(a, b) {
                        var d = g[b] || a;
                        if (d) {
                            var d = e._makeIntegrationSettingsForSingleDestination(g, b, d),
                                f = e._transformEventForDest(i, c, b);
                            e._callIntegrations("track", f.name, f.props, d)
                        }
                    })
                } catch (k) {}
        };
        e.prototype._makeIntegrationSettingsForSingleDestination = function(a, b, c) {
            var f = {
                All: !1
            };
            f[b] = c || !0;
            return d.extend({}, a, {
                integrations: f
            })
        };
        e.prototype._callIntegrations = function() {
            var a = o.freshpaintIntegrations;
            a.setAnonymousId(this.get_property("$device_id"));
            var b = arguments[0],
                c = Array.prototype.slice.call(arguments,
                    1);
            return a[b].apply(a, c)
        };
        e.prototype.track = G(function(a, b, c, f) {
            "function" !== typeof f && (f = function() {});
            if (d.isUndefined(a)) m.error("No event name provided to freshpaint.track");
            else return this._processEvent(a, null, b, {}, c, f)
        });
        e.prototype.set_group = G(function(a, b, c) {
            d.isArray(b) || (b = [b]);
            var f = {};
            f[a] = b;
            this.register(f);
            return this.people.set(a, b, c)
        });
        e.prototype.add_group = G(function(a, b, c) {
            var d = this.get_property(a);
            if (void 0 === d) {
                var e = {};
                e[a] = [b];
                this.register(e)
            } else -1 === d.indexOf(b) && (d.push(b),
                this.register(e));
            return this.people.union(a, b, c)
        });
        e.prototype.remove_group = G(function(a, b, c) {
            var d = this.get_property(a);
            if (void 0 !== d) {
                var e = d.indexOf(b); - 1 < e && (d.splice(e, 1), this.register({
                    group_key: d
                }));
                0 === d.length && this.unregister(a)
            }
            return this.people.remove(a, b, c)
        });
        e.prototype.track_with_groups = G(function(a, b, c, f) {
            var e = d.extend({}, b || {});
            d.each(c, function(a, b) {
                null !== a && void 0 !== a && (e[b] = a)
            });
            return this.track(a, e, f)
        });
        e.prototype._create_map_key = function(a, b) {
            return a + "_" + JSON.stringify(b)
        };
        e.prototype._remove_group_from_cache = function(a, b) {
            delete this._cached_groups[this._create_map_key(a, b)]
        };
        e.prototype.get_group = function(a, b) {
            var c = this._create_map_key(a, b),
                d = this._cached_groups[c];
            if (void 0 === d || d._group_key !== a || d._group_id !== b) d = new r, d._init(this, a, b), this._cached_groups[c] = d;
            return d
        };
        e.prototype.track_pageview = function(a) {
            if (d.isUndefined(a)) a = l.location.href;
            this.track("mp_page_view", d.info.pageviewInfo(a))
        };
        e.prototype.track_links = function() {
            return this._track_dom.call(this,
                L, arguments)
        };
        e.prototype.track_forms = function() {
            return this._track_dom.call(this, W, arguments)
        };
        e.prototype.time_event = function(a) {
            d.isUndefined(a) ? m.error("No event name provided to freshpaint.time_event") : this._event_is_disabled(a) || this.persistence.set_event_timer(a, (new Date).getTime())
        };
        e.prototype.register = function(a, b) {
            this.persistence.register(a, b)
        };
        e.prototype.addPageviewProperties = function(a) {
            this._pageviewProperties = d.extend({}, this._pageviewProperties, a)
        };
        e.prototype.register_once = function(a,
            b, c) {
            this.persistence.register_once(a, b, c)
        };
        e.prototype.unregister = function(a) {
            this.persistence.unregister(a)
        };
        e.prototype._register_single = function(a, b) {
            var c = {};
            c[a] = b;
            this.register(c)
        };
        e.prototype.identify = function(a, b, c, f) {
            d.isObject(a) && (b = a, a = void 0);
            var b = "undefined" === typeof b ? {} : b,
                e = this.get_distinct_id();
            if (a === e || "undefined" === typeof a || !this._flags.identify_called) var g = this.get_property("__user_props") || {},
                b = d.extend({}, g, b);
            g = {};
            g.__user_props = b;
            this.register(g);
            "undefined" === typeof a ?
                (this.track("$identify", {
                    $anon_distinct_id: e,
                    $user_props: b
                }), this._flags.identify_called ? this._callIntegrations("identify", this.get_distinct_id(), b, c, f) : this._callIntegrations("identify", b, c, f)) : (this.register({
                    $user_id: a
                }), this.get_property("$device_id") || this.register_once({
                    $had_persisted_distinct_id: !0,
                    $device_id: e
                }, ""), a !== e && a !== this.get_property("__alias") && (this.unregister("__alias"), this.register({
                    distinct_id: a
                })), this._flags.identify_called = !0, this.track("$identify", {
                    distinct_id: a,
                    $anon_distinct_id: e,
                    $user_props: b
                }), this._callIntegrations("identify", a, b, c, f))
        };
        e.prototype.alias = function(a, b, c, f) {
            d.isObject(b) && (c = b, b = this.get_distinct_id());
            this.track("$alias", {
                $alias_id: a,
                $previous_id: b
            });
            this._callIntegrations("alias", a, b, c, f)
        };
        e.prototype.page = function(a, b, c, f, e) {
            "function" === typeof f && (e = f, f = null);
            "function" === typeof c && (e = c, f = c = null);
            "function" === typeof b && (e = b, f = c = b = null);
            d.isObject(a) && (f = b, c = a, b = a = null);
            d.isObject(b) && (f = c, c = b, b = null);
            "string" === typeof a && "string" !== typeof b && (b = a, a = null);
            this.track("$page", {
                $category: a,
                $name: b,
                $page_props: c
            });
            this._callIntegrations("page", a, b, c, f, e)
        };
        e.prototype.group = function(a, b, c, f) {
            if (0 === arguments.length) return this.group_object();
            d.isObject(a) && (b = a, a = void 0);
            var b = "undefined" === typeof b ? {} : b,
                e = this.get_property("__group_id");
            if (a === e || "undefined" === typeof a || "undefined" === typeof e) var g = this.get_property("__group_props") || {},
                b = d.extend({}, g, b);
            g = {};
            g.__group_props = b;
            this.register(g);
            "undefined" === typeof a ? (this.track("$group", {
                $group_id: e,
                $group_props: b
            }), "undefined" !== typeof e ? this._callIntegrations("group", e, b, c, f) : this._callIntegrations("group", b, c, f)) : (g = {}, g.__group_id = a, this.register(g), this.track("$group", {
                $group_id: a,
                $prev_group_id: e,
                $group_props: b
            }), this._callIntegrations("group", a, b, c, f))
        };
        e.prototype.ready = function(a) {
            this._callIntegrations("ready", a)
        };
        e.prototype.reset = function() {
            this.persistence.clear();
            this._flags.identify_called = !1;
            var a = d.UUID();
            this.register_once({
                distinct_id: a,
                $device_id: a
            }, "");
            this._callIntegrations("reset")
        };
        e.prototype.get_distinct_id = function() {
            return this.get_property("distinct_id")
        };
        e.prototype.alias = function(a, b) {
            if (a === this.get_property("$people_distinct_id")) return m.critical("Attempting to create alias for existing People user - aborting."), -2;
            var c = this;
            d.isUndefined(b) && (b = this.get_distinct_id());
            if (a !== b) return this._register_single("__alias", a), this.track("$create_alias", {
                alias: a,
                distinct_id: b
            }, function() {
                c.identify(a)
            });
            m.error("alias matches current distinct_id - skipping api call.");
            this.identify(a);
            return -1
        };
        e.prototype.user = function() {
            var a = this;
            return {
                id: function() {
                    return a.get_distinct_id()
                },
                traits: function(b) {
                    if (0 === arguments.length) return a.get_property("__user_props");
                    var c = {};
                    c.__user_props = b;
                    a.register(c);
                    a._callIntegrations("user").traits(b);
                    return null
                },
                anonymousId: function() {
                    return a.get_property("$device_id")
                }
            }
        };
        e.prototype.group_object = function() {
            var a = this;
            return {
                id: function() {
                    return a.get_property("__group_id")
                },
                traits: function(b) {
                    if (0 === arguments.length) return a.get_property("__group_props");
                    var c = {};
                    c.__group_props = b;
                    a.register(c);
                    a._callIntegrations("group").traits(b);
                    return null
                }
            }
        };
        e.prototype.name_tag = function(a) {
            this._register_single("mp_name_tag", a)
        };
        e.prototype.set_config = function(a) {
            if (d.isObject(a)) d.extend(this.config, a), this.get_config("persistence_name") || (this.config.persistence_name = this.config.cookie_name), this.get_config("disable_persistence") || (this.config.disable_persistence = this.config.disable_cookie), this.persistence && this.persistence.update_config(this.config), E =
                E || this.get_config("debug")
        };
        e.prototype.get_config = function(a) {
            return this.config[a]
        };
        e.prototype.get_property = function(a) {
            return this.persistence.props[a]
        };
        e.prototype.toString = function() {
            var a = this.get_config("name");
            N(a) || (a = "freshpaint." + a);
            return a
        };
        e.prototype._event_is_disabled = function(a) {
            return d.isBlockedUA(v) || this._flags.disable_all_events || d.include(this.__disabled_events, a)
        };
        e.prototype._check_and_handle_triggered_notifications = G(function(a) {
            if (this._user_decide_check_complete)
                for (var b =
                        this._triggered_notifs, c = 0; c < b.length; c++) {
                    if ((new h(b[c], this))._matches_event_data(a)) {
                        this._show_notification(b[c]);
                        break
                    }
                } else this._events_tracked_before_user_decide_check_complete.push(a)
        });
        e.prototype._check_and_handle_notifications = G(function(a) {
            a && !this._flags.identify_called && !this.get_config("disable_notifications") && (m.log("FRESHPAINT NOTIFICATION CHECK"), a = {
                verbose: !0,
                version: "3",
                lib: "web",
                token: this.get_config("token"),
                distinct_id: a
            }, this._send_request(this.get_config("api_host") + "/decide/",
                a, this._prepare_callback(d.bind(function(a) {
                    if (a.notifications && 0 < a.notifications.length) {
                        this._triggered_notifs = [];
                        var c = [];
                        d.each(a.notifications, function(a) {
                            (a.display_triggers && 0 < a.display_triggers.length ? this._triggered_notifs : c).push(a)
                        }, this);
                        0 < c.length && this._show_notification.call(this, c[0])
                    }
                    this._handle_user_decide_check_complete()
                }, this))))
        });
        e.prototype._handle_user_decide_check_complete = function() {
            this._user_decide_check_complete = !0;
            for (var a = this._events_tracked_before_user_decide_check_complete; 0 <
                a.length;) this._check_and_handle_triggered_notifications(a.shift())
        };
        e.prototype._show_notification = function(a) {
            (new h(a, this)).show()
        };
        e.prototype._gdpr_init = function() {
            "localStorage" === this.get_config("opt_out_tracking_persistence_type") && d.localStorage.is_supported() && (!this.has_opted_in_tracking() && this.has_opted_in_tracking({
                    persistence_type: "cookie"
                }) && this.opt_in_tracking({
                    enable_persistence: !1
                }), !this.has_opted_out_tracking() && this.has_opted_out_tracking({
                    persistence_type: "cookie"
                }) && this.opt_out_tracking({
                    clear_persistence: !1
                }),
                this.clear_opt_in_out_tracking({
                    persistence_type: "cookie",
                    enable_persistence: !1
                }));
            if (this.has_opted_out_tracking()) this._gdpr_update_persistence({
                clear_persistence: !0
            });
            else if (!this.has_opted_in_tracking() && (this.get_config("opt_out_tracking_by_default") || d.cookie.get("mp_optout"))) d.cookie.remove("mp_optout"), this.opt_out_tracking({
                clear_persistence: this.get_config("opt_out_persistence_by_default")
            })
        };
        e.prototype._gdpr_update_persistence = function(a) {
            if (a && a.clear_persistence) a = !0;
            else if (a && a.enable_persistence) a = !1;
            else return;
            !this.get_config("disable_persistence") && this.persistence.disabled !== a && this.persistence.set_disabled(a)
        };
        e.prototype._gdpr_call_func = function(a, b) {
            b = d.extend({
                    track: d.bind(this.track, this),
                    persistence_type: this.get_config("opt_out_tracking_persistence_type"),
                    cookie_prefix: this.get_config("opt_out_tracking_cookie_prefix"),
                    cookie_expiration: this.get_config("cookie_expiration"),
                    cross_subdomain_cookie: this.get_config("cross_subdomain_cookie"),
                    secure_cookie: this.get_config("secure_cookie")
                },
                b);
            d.localStorage.is_supported() || (b.persistence_type = "cookie");
            return a(this.get_config("token"), {
                track: b.track,
                trackEventName: b.track_event_name,
                trackProperties: b.track_properties,
                persistenceType: b.persistence_type,
                persistencePrefix: b.cookie_prefix,
                cookieExpiration: b.cookie_expiration,
                crossSubdomainCookie: b.cross_subdomain_cookie,
                secureCookie: b.secure_cookie
            })
        };
        e.prototype.opt_in_tracking = function(a) {
            a = d.extend({
                enable_persistence: !0
            }, a);
            this._gdpr_call_func(za, a);
            this._gdpr_update_persistence(a)
        };
        e.prototype.opt_out_tracking = function(a) {
            a = d.extend({
                clear_persistence: !0,
                delete_user: !0
            }, a);
            a.delete_user && this.people && this.people._identify_called() && (this.people.delete_user(), this.people.clear_charges());
            this._gdpr_call_func(Aa, a);
            this._gdpr_update_persistence(a)
        };
        e.prototype.has_opted_in_tracking = function(a) {
            return this._gdpr_call_func(Ba, a)
        };
        e.prototype.has_opted_out_tracking = function(a) {
            return this._gdpr_call_func(ha, a)
        };
        e.prototype.clear_opt_in_out_tracking = function(a) {
            a = d.extend({
                    enable_persistence: !0
                },
                a);
            this._gdpr_call_func(Ca, a);
            this._gdpr_update_persistence(a)
        };
        j.prototype._init = function(a) {
            this._freshpaint = a
        };
        j.prototype.set = B(function(a, b, c) {
            var f = this.set_action(a, b);
            d.isObject(a) && (c = b);
            this._get_config("save_referrer") && this._freshpaint.persistence.update_referrer_info(l.referrer);
            f.$set = d.extend({}, d.info.people_properties(), this._freshpaint.persistence.get_referrer_info(), f.$set);
            return this._send_request(f, c)
        });
        j.prototype.set_once = B(function(a, b, c) {
            var f = this.set_once_action(a, b);
            d.isObject(a) &&
                (c = b);
            return this._send_request(f, c)
        });
        j.prototype.unset = B(function(a, b) {
            return this._send_request(this.unset_action(a), b)
        });
        j.prototype.increment = B(function(a, b, c) {
            var f = {},
                e = {};
            d.isObject(a) ? (d.each(a, function(a, b) {
                this._is_reserved_property(b) || (isNaN(parseFloat(a)) ? m.error("Invalid increment value passed to freshpaint.people.increment - must be a number") : e[b] = a)
            }, this), c = b) : (d.isUndefined(b) && (b = 1), e[a] = b);
            f.$add = e;
            return this._send_request(f, c)
        });
        j.prototype.append = B(function(a, b, c) {
            d.isObject(a) &&
                (c = b);
            return this._send_request(this.append_action(a, b), c)
        });
        j.prototype.remove = B(function(a, b, c) {
            d.isObject(a) && (c = b);
            return this._send_request(this.remove_action(a, b), c)
        });
        j.prototype.union = B(function(a, b, c) {
            d.isObject(a) && (c = b);
            return this._send_request(this.union_action(a, b), c)
        });
        j.prototype.track_charge = B(function(a, b, c) {
            if (!d.isNumber(a) && (a = parseFloat(a), isNaN(a))) {
                m.error("Invalid value passed to freshpaint.people.track_charge - must be a number");
                return
            }
            return this.append("$transactions",
                d.extend({
                    $amount: a
                }, b), c)
        });
        j.prototype.clear_charges = function(a) {
            return this.set("$transactions", [], a)
        };
        j.prototype.delete_user = function() {
            if (this._identify_called()) return this._send_request({
                $delete: this._freshpaint.get_distinct_id()
            });
            m.error("freshpaint.people.delete_user() requires you to call identify() first")
        };
        j.prototype.toString = function() {
            return this._freshpaint.toString() + ".people"
        };
        j.prototype._send_request = function(a, b) {
            a.$token = this._get_config("token");
            a.$distinct_id = this._freshpaint.get_distinct_id();
            var c = this._freshpaint.get_property("$device_id"),
                f = this._freshpaint.get_property("$user_id"),
                e = this._freshpaint.get_property("$had_persisted_distinct_id");
            c && (a.$device_id = c);
            f && (a.$user_id = f);
            e && (a.$had_persisted_distinct_id = e);
            f = d.encodeDates(a);
            c = d.truncate(f, 255);
            f = d.JSONEncode(f);
            f = d.base64Encode(f);
            if (!this._identify_called()) return this._enqueue(a), d.isUndefined(b) || (this._get_config("verbose") ? b({
                status: -1,
                error: null
            }) : b(-1)), c;
            m.log("FRESHPAINT PEOPLE REQUEST:");
            m.log(c);
            this._freshpaint._send_request(this._get_config("api_host") +
                "/engage/", {
                    data: f
                }, this._freshpaint._prepare_callback(b, c));
            return c
        };
        j.prototype._get_config = function(a) {
            return this._freshpaint.get_config(a)
        };
        j.prototype._identify_called = function() {
            return !0 === this._freshpaint._flags.identify_called
        };
        j.prototype._enqueue = function(a) {
            "$set" in a ? this._freshpaint.persistence._add_to_people_queue("$set", a) : "$set_once" in a ? this._freshpaint.persistence._add_to_people_queue("$set_once", a) : "$unset" in a ? this._freshpaint.persistence._add_to_people_queue("$unset", a) : "$add" in
                a ? this._freshpaint.persistence._add_to_people_queue("$add", a) : "$append" in a ? this._freshpaint.persistence._add_to_people_queue("$append", a) : "$remove" in a ? this._freshpaint.persistence._add_to_people_queue("$remove", a) : "$union" in a ? this._freshpaint.persistence._add_to_people_queue("$union", a) : m.error("Invalid call to _enqueue():", a)
        };
        j.prototype._flush_one_queue = function(a, b, c, f) {
            var e = this,
                g = d.extend({}, this._freshpaint.persistence._get_queue(a)),
                h = g;
            !d.isUndefined(g) && d.isObject(g) && !d.isEmptyObject(g) &&
                (e._freshpaint.persistence._pop_from_people_queue(a, g), f && (h = f(g)), b.call(e, h, function(b, f) {
                    0 === b && e._freshpaint.persistence._add_to_people_queue(a, g);
                    d.isUndefined(c) || c(b, f)
                }))
        };
        j.prototype._flush = function(a, b, c, e, h, g, j) {
            var i = this,
                k = this._freshpaint.persistence._get_queue("$append"),
                l = this._freshpaint.persistence._get_queue("$remove");
            this._flush_one_queue("$set", this.set, a);
            this._flush_one_queue("$set_once", this.set_once, e);
            this._flush_one_queue("$unset", this.unset, g, function(a) {
                return d.keys(a)
            });
            this._flush_one_queue("$add", this.increment, b);
            this._flush_one_queue("$union", this.union, h);
            if (!d.isUndefined(k) && d.isArray(k) && k.length) {
                for (var n, a = function(a, b) {
                        0 === a && i._freshpaint.persistence._add_to_people_queue("$append", n);
                        d.isUndefined(c) || c(a, b)
                    }, b = k.length - 1; 0 <= b; b--) n = k.pop(), d.isEmptyObject(n) || i.append(n, a);
                i._freshpaint.persistence.save()
            }
            if (!d.isUndefined(l) && d.isArray(l) && l.length) {
                for (var m, k = function(a, b) {
                        0 === a && i._freshpaint.persistence._add_to_people_queue("$remove", m);
                        d.isUndefined(j) ||
                            j(a, b)
                    }, a = l.length - 1; 0 <= a; a--) m = l.pop(), d.isEmptyObject(m) || i.remove(m, k);
                i._freshpaint.persistence.save()
            }
        };
        j.prototype._is_reserved_property = function(a) {
            return "$distinct_id" === a || "$token" === a || "$device_id" === a || "$user_id" === a || "$had_persisted_distinct_id" === a
        };
        e._Notification = function(a, b) {
            d.bind_instance_methods(this);
            this.freshpaint = b;
            this.persistence = this.freshpaint.persistence;
            this.resource_protocol = this.freshpaint.get_config("inapp_protocol");
            this.cdn_host = this.freshpaint.get_config("cdn");
            this.campaign_id = d.escapeHTML(a.id);
            this.message_id = d.escapeHTML(a.message_id);
            this.body = (d.escapeHTML(a.body) || "").replace(/\n/g, "<br/>");
            this.cta = d.escapeHTML(a.cta) || "Close";
            this.notif_type = d.escapeHTML(a.type) || "takeover";
            this.style = d.escapeHTML(a.style) || "light";
            this.title = d.escapeHTML(a.title) || "";
            this.video_width = h.VIDEO_WIDTH;
            this.video_height = h.VIDEO_HEIGHT;
            this.display_triggers = a.display_triggers || [];
            this.dest_url = a.cta_url || null;
            this.image_url = a.image_url || null;
            this.thumb_image_url = a.thumb_image_url ||
                null;
            this.video_url = a.video_url || null;
            if (this.thumb_image_url && 0 === this.thumb_image_url.indexOf("//")) this.thumb_image_url = this.thumb_image_url.replace("//", this.resource_protocol);
            this.clickthrough = !0;
            if (!this.dest_url) this.dest_url = "#dismiss", this.clickthrough = !1;
            this.mini = "mini" === this.notif_type;
            if (!this.mini) this.notif_type = "takeover";
            this.notif_width = !this.mini ? h.NOTIF_WIDTH : h.NOTIF_WIDTH_MINI;
            this._set_client_config();
            this.imgs_to_preload = this._init_image_html();
            this._init_video()
        };
        h = e._Notification;
        h.ANIM_TIME = 200;
        h.MARKUP_PREFIX = "perfalytics-notification";
        h.BG_OPACITY = 0.6;
        h.NOTIF_TOP = 25;
        h.NOTIF_START_TOP = 200;
        h.NOTIF_WIDTH = 388;
        h.NOTIF_WIDTH_MINI = 420;
        h.NOTIF_HEIGHT_MINI = 85;
        h.THUMB_BORDER_SIZE = 5;
        h.THUMB_IMG_SIZE = 60;
        h.THUMB_OFFSET = Math.round(h.THUMB_IMG_SIZE / 2);
        h.VIDEO_WIDTH = 595;
        h.VIDEO_HEIGHT = 334;
        h.prototype.show = function() {
            var a = this;
            this._set_client_config();
            this.body_el ? (this._init_styles(), this._init_notification_el(), this._preload_images(this._attach_and_animate)) : setTimeout(function() {
                    a.show()
                },
                300)
        };
        h.prototype.dismiss = d.safewrap(function() {
            this.marked_as_shown || this._mark_delivery({
                invisible: !0
            });
            var a = this.showing_video ? this._get_el("video") : this._get_notification_display_el();
            if (this.use_transitions) this._remove_class("bg", "visible"), this._add_class(a, "exiting"), setTimeout(this._remove_notification_el, h.ANIM_TIME);
            else {
                var b, c, d;
                this.mini ? (b = "right", c = 20, d = -100) : (b = "top", c = h.NOTIF_TOP, d = h.NOTIF_START_TOP + h.NOTIF_TOP);
                this._animate_els([{
                    el: this._get_el("bg"),
                    attr: "opacity",
                    start: h.BG_OPACITY,
                    goal: 0
                }, {
                    el: a,
                    attr: "opacity",
                    start: 1,
                    goal: 0
                }, {
                    el: a,
                    attr: b,
                    start: c,
                    goal: d
                }], h.ANIM_TIME, this._remove_notification_el)
            }
        });
        h.prototype._add_class = d.safewrap(function(a, b) {
            b = h.MARKUP_PREFIX + "-" + b;
            "string" === typeof a && (a = this._get_el(a));
            a.className ? ~(" " + a.className + " ").indexOf(" " + b + " ") || (a.className += " " + b) : a.className = b
        });
        h.prototype._remove_class = d.safewrap(function(a, b) {
            b = h.MARKUP_PREFIX + "-" + b;
            "string" === typeof a && (a = this._get_el(a));
            if (a.className) a.className = (" " + a.className + " ").replace(" " +
                b + " ", "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
        });
        h.prototype._animate_els = d.safewrap(function(a, b, c, d) {
            var e = this,
                g = !1,
                h, i;
            h = 1 * new Date;
            var j, d = d || h;
            j = h - d;
            for (h = 0; h < a.length; h++) {
                i = a[h];
                if ("undefined" === typeof i.val) i.val = i.start;
                if (i.val !== i.goal) {
                    var g = !0,
                        k = i.goal >= i.start ? 1 : -1;
                    i.val = i.start + (i.goal - i.start) * j / b;
                    if ("opacity" !== i.attr) i.val = Math.round(i.val);
                    if (0 < k && i.val >= i.goal || 0 > k && i.val <= i.goal) i.val = i.goal
                }
            }
            if (g) {
                for (h = 0; h < a.length; h++) i = a[h], i.el && (i.el.style[i.attr] = "" + i.val +
                    ("opacity" === i.attr ? "" : "px"));
                setTimeout(function() {
                    e._animate_els(a, b, c, d)
                }, 10)
            } else c && c()
        });
        h.prototype._attach_and_animate = d.safewrap(function() {
            var a = this;
            if (!this.shown && !this._get_shown_campaigns()[this.campaign_id]) {
                this.shown = !0;
                this.body_el.appendChild(this.notification_el);
                setTimeout(function() {
                    var b = a._get_notification_display_el();
                    if (a.use_transitions) a.mini || a._add_class("bg", "visible"), a._add_class(b, "visible"), a._mark_as_shown();
                    else {
                        var d, e, g;
                        a.mini ? (d = "right", e = -100, g = 20) : (d = "top",
                            e = h.NOTIF_START_TOP + h.NOTIF_TOP, g = h.NOTIF_TOP);
                        a._animate_els([{
                            el: a._get_el("bg"),
                            attr: "opacity",
                            start: 0,
                            goal: h.BG_OPACITY
                        }, {
                            el: b,
                            attr: "opacity",
                            start: 0,
                            goal: 1
                        }, {
                            el: b,
                            attr: d,
                            start: e,
                            goal: g
                        }], h.ANIM_TIME, a._mark_as_shown)
                    }
                }, 100);
                d.register_event(a._get_el("cancel"), "click", function(b) {
                    b.preventDefault();
                    a.dismiss()
                });
                var b = a._get_el("button") || a._get_el("mini-content");
                d.register_event(b, "click", function(b) {
                    b.preventDefault();
                    a.show_video ? (a._track_event("$campaign_open", {
                            $resource_type: "video"
                        }),
                        a._switch_to_video()) : (a.dismiss(), a.clickthrough && (b = null, a.freshpaint.get_config("inapp_link_new_window") ? o.open(a.dest_url) : b = function() {
                        o.location.href = a.dest_url
                    }, a._track_event("$campaign_open", {
                        $resource_type: "link"
                    }, b)))
                })
            }
        });
        h.prototype._get_el = function(a) {
            return l.getElementById(h.MARKUP_PREFIX + "-" + a)
        };
        h.prototype._get_notification_display_el = function() {
            return this._get_el(this.notif_type)
        };
        h.prototype._get_shown_campaigns = function() {
            return this.persistence.props.__cmpns || (this.persistence.props.__cmpns = {})
        };
        h.prototype._matches_event_data = d.safewrap(function(a) {
            for (var b = a.event || "", c = 0; c < this.display_triggers.length; c++) {
                var e = this.display_triggers[c];
                if ("$any_event" === (e.event || "") || b === e.event)
                    if (e.selector && !d.isEmptyObject(e.selector)) {
                        if (u(e.selector, a.properties)) return !0
                    } else return !0
            }
            return !1
        });
        h.prototype._browser_lte = function(a, b) {
            return this.browser_versions[a] && this.browser_versions[a] <= b
        };
        h.prototype._init_image_html = function() {
            var a = [];
            this.mini ? (this.thumb_image_url = this.thumb_image_url ||
                this.cdn_host + "/site_media/images/icons/notifications/mini-news-dark.png", a.push(this.thumb_image_url)) : (this.image_url ? (a.push(this.image_url), this.img_html = '<img id="img" src="' + this.image_url + '"/>') : this.img_html = "", this.thumb_image_url ? (a.push(this.thumb_image_url), this.thumb_img_html = '<div id="thumbborder-wrapper"><div id="thumbborder"></div></div><img id="thumbnail" src="' + this.thumb_image_url + '" width="' + h.THUMB_IMG_SIZE + '" height="' + h.THUMB_IMG_SIZE + '"/><div id="thumbspacer"></div>') : this.thumb_img_html =
                "");
            return a
        };
        h.prototype._init_notification_el = function() {
            var a = "",
                b = "",
                c = "";
            this.notification_el = l.createElement("div");
            this.notification_el.id = h.MARKUP_PREFIX + "-wrapper";
            if (this.mini) a = '<div id="mini"><div id="mainbox"><div id="cancel"><div id="cancel-icon"></div></div><div id="mini-content"><div id="mini-icon"><div id="mini-icon-img"></div></div><div id="body"><div id="body-text"><div>' + this.body + '</div></div></div></div></div><div id="mini-border"></div></div>';
            else {
                var a = this.clickthrough ||
                    this.show_video ? "" : '<div id="button-close"></div>',
                    d = this.show_video ? '<div id="button-play"></div>' : "";
                this._browser_lte("ie", 7) && (d = a = "");
                a = '<div id="takeover">' + this.thumb_img_html + '<div id="mainbox"><div id="cancel"><div id="cancel-icon"></div></div><div id="content">' + this.img_html + '<div id="title">' + this.title + '</div><div id="body">' + this.body + '</div><div id="tagline"><a href="http://perfalytics.com?from=inapp" target="_blank">POWERED BY PERFALYTICS</a></div></div><div id="button">' + a + '<a id="button-link" href="' +
                    this.dest_url + '">' + this.cta + "</a>" + d + "</div></div></div>"
            }
            this.youtube_video ? (b = this.resource_protocol + "www.youtube.com/embed/" + this.youtube_video + "?wmode=transparent&showinfo=0&modestbranding=0&rel=0&autoplay=1&loop=0&vq=hd1080", this.yt_custom && (b += "&enablejsapi=1&html5=1&controls=0", c = '<div id="video-controls"><div id="video-progress" class="video-progress-el"><div id="video-progress-total" class="video-progress-el"></div><div id="video-elapsed" class="video-progress-el"></div></div><div id="video-time" class="video-progress-el"></div></div>')) :
                this.vimeo_video && (b = this.resource_protocol + "player.vimeo.com/video/" + this.vimeo_video + "?autoplay=1&title=0&byline=0&portrait=0");
            if (this.show_video) this.video_iframe = '<iframe id="' + h.MARKUP_PREFIX + '-video-frame" width="' + this.video_width + '" height="' + this.video_height + '"  src="' + b + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen="1" scrolling="no"></iframe>', c = '<div id="video-' + (this.flip_animate ? "" : "no") + 'flip"><div id="video"><div id="video-holder"></div>' + c + "</div></div>";
            b = c + a;
            this.flip_animate && (b = (this.mini ? a : "") + '<div id="flipcontainer"><div id="flipper">' + (this.mini ? c : b) + "</div></div>");
            this.notification_el.innerHTML = ('<div id="overlay" class="' + this.notif_type + '"><div id="campaignid-' + this.campaign_id + '"><div id="bgwrapper"><div id="bg"></div>' + b + "</div></div></div>").replace(/class=\"/g, 'class="' + h.MARKUP_PREFIX + "-").replace(/id=\"/g, 'id="' + h.MARKUP_PREFIX + "-")
        };
        h.prototype._init_styles = function() {
            this.style_vals = "dark" === this.style ? {
                bg: "#1d1f25",
                bg_actions: "#282b32",
                bg_hover: "#3a4147",
                bg_light: "#4a5157",
                border_gray: "#32353c",
                cancel_opacity: "0.4",
                mini_hover: "#2a3137",
                text_title: "#fff",
                text_main: "#9498a3",
                text_tagline: "#464851",
                text_hover: "#ddd"
            } : {
                bg: "#fff",
                bg_actions: "#e7eaee",
                bg_hover: "#eceff3",
                bg_light: "#f5f5f5",
                border_gray: "#e4ecf2",
                cancel_opacity: "1.0",
                mini_hover: "#fafafa",
                text_title: "#5c6578",
                text_main: "#8b949b",
                text_tagline: "#ced9e6",
                text_hover: "#7c8598"
            };
            var a = "0px 0px 35px 0px rgba(45, 49, 56, 0.7)",
                b = a,
                c = a,
                e = h.THUMB_IMG_SIZE + 2 * h.THUMB_BORDER_SIZE,
                j = h.ANIM_TIME /
                1E3 + "s";
            this.mini && (a = "none");
            var g = {};
            g["@media only screen and (max-width: " + (h.NOTIF_WIDTH_MINI + 20 - 1) + "px)"] = {
                "#overlay": {
                    display: "none"
                }
            };
            a = {
                ".flipped": {
                    transform: "rotateY(180deg)"
                },
                "#overlay": {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    "text-align": "center",
                    "z-index": "10000",
                    "font-family": '"Helvetica", "Arial", sans-serif',
                    "-webkit-font-smoothing": "antialiased",
                    "-moz-osx-font-smoothing": "grayscale"
                },
                "#overlay.mini": {
                    height: "0",
                    overflow: "visible"
                },
                "#overlay a": {
                    width: "initial",
                    padding: "0",
                    "text-decoration": "none",
                    "text-transform": "none",
                    color: "inherit"
                },
                "#bgwrapper": {
                    position: "relative",
                    width: "100%",
                    height: "100%"
                },
                "#bg": {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    "min-width": 4 * this.doc_width + "px",
                    "min-height": 4 * this.doc_height + "px",
                    "background-color": "black",
                    opacity: "0.0",
                    "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                    filter: "alpha(opacity=60)",
                    transition: "opacity " + j
                },
                "#bg.visible": {
                    opacity: h.BG_OPACITY
                },
                ".mini #bg": {
                    width: "0",
                    height: "0",
                    "min-width": "0"
                },
                "#flipcontainer": {
                    perspective: "1000px",
                    position: "absolute",
                    width: "100%"
                },
                "#flipper": {
                    position: "relative",
                    "transform-style": "preserve-3d",
                    transition: "0.3s"
                },
                "#takeover": {
                    position: "absolute",
                    left: "50%",
                    width: h.NOTIF_WIDTH + "px",
                    "margin-left": Math.round(-h.NOTIF_WIDTH / 2) + "px",
                    "backface-visibility": "hidden",
                    transform: "rotateY(0deg)",
                    opacity: "0.0",
                    top: h.NOTIF_START_TOP + "px",
                    transition: "opacity " + j + ", top " + j
                },
                "#takeover.visible": {
                    opacity: "1.0",
                    top: h.NOTIF_TOP + "px"
                },
                "#takeover.exiting": {
                    opacity: "0.0",
                    top: h.NOTIF_START_TOP + "px"
                },
                "#thumbspacer": {
                    height: h.THUMB_OFFSET + "px"
                },
                "#thumbborder-wrapper": {
                    position: "absolute",
                    top: -h.THUMB_BORDER_SIZE + "px",
                    left: h.NOTIF_WIDTH / 2 - h.THUMB_OFFSET - h.THUMB_BORDER_SIZE + "px",
                    width: e + "px",
                    height: e / 2 + "px",
                    overflow: "hidden"
                },
                "#thumbborder": {
                    position: "absolute",
                    width: e + "px",
                    height: e + "px",
                    "border-radius": e + "px",
                    "background-color": this.style_vals.bg_actions,
                    opacity: "0.5"
                },
                "#thumbnail": {
                    position: "absolute",
                    top: "0px",
                    left: h.NOTIF_WIDTH / 2 - h.THUMB_OFFSET + "px",
                    width: h.THUMB_IMG_SIZE +
                        "px",
                    height: h.THUMB_IMG_SIZE + "px",
                    overflow: "hidden",
                    "z-index": "100",
                    "border-radius": h.THUMB_IMG_SIZE + "px"
                },
                "#mini": {
                    position: "absolute",
                    right: "20px",
                    top: h.NOTIF_TOP + "px",
                    width: this.notif_width + "px",
                    height: 2 * h.NOTIF_HEIGHT_MINI + "px",
                    "margin-top": 20 - h.NOTIF_HEIGHT_MINI + "px",
                    "backface-visibility": "hidden",
                    opacity: "0.0",
                    transform: "rotateX(90deg)",
                    transition: "opacity 0.3s, transform 0.3s, right 0.3s"
                },
                "#mini.visible": {
                    opacity: "1.0",
                    transform: "rotateX(0deg)"
                },
                "#mini.exiting": {
                    opacity: "0.0",
                    right: "-150px"
                },
                "#mainbox": {
                    "border-radius": "4px",
                    "box-shadow": a,
                    "text-align": "center",
                    "background-color": this.style_vals.bg,
                    "font-size": "14px",
                    color: this.style_vals.text_main
                },
                "#mini #mainbox": {
                    height: h.NOTIF_HEIGHT_MINI + "px",
                    "margin-top": h.NOTIF_HEIGHT_MINI + "px",
                    "border-radius": "3px",
                    transition: "background-color " + j
                },
                "#mini-border": {
                    height: h.NOTIF_HEIGHT_MINI + 6 + "px",
                    width: h.NOTIF_WIDTH_MINI + 6 + "px",
                    position: "absolute",
                    top: "-3px",
                    left: "-3px",
                    "margin-top": h.NOTIF_HEIGHT_MINI + "px",
                    "border-radius": "6px",
                    opacity: "0.25",
                    "background-color": "#fff",
                    "z-index": "-1",
                    "box-shadow": c
                },
                "#mini-icon": {
                    position: "relative",
                    display: "inline-block",
                    width: "75px",
                    height: h.NOTIF_HEIGHT_MINI + "px",
                    "border-radius": "3px 0 0 3px",
                    "background-color": this.style_vals.bg_actions,
                    background: "linear-gradient(135deg, " + this.style_vals.bg_light + " 0%, " + this.style_vals.bg_actions + " 100%)",
                    transition: "background-color " + j
                },
                "#mini:hover #mini-icon": {
                    "background-color": this.style_vals.mini_hover
                },
                "#mini:hover #mainbox": {
                    "background-color": this.style_vals.mini_hover
                },
                "#mini-icon-img": {
                    position: "absolute",
                    "background-image": "url(" + this.thumb_image_url + ")",
                    width: "48px",
                    height: "48px",
                    top: "20px",
                    left: "12px"
                },
                "#content": {
                    padding: "30px 20px 0px 20px"
                },
                "#mini-content": {
                    "text-align": "left",
                    height: h.NOTIF_HEIGHT_MINI + "px",
                    cursor: "pointer"
                },
                "#img": {
                    width: "328px",
                    "margin-top": "30px",
                    "border-radius": "5px"
                },
                "#title": {
                    "max-height": "600px",
                    overflow: "hidden",
                    "word-wrap": "break-word",
                    padding: "25px 0px 20px 0px",
                    "font-size": "19px",
                    "font-weight": "bold",
                    color: this.style_vals.text_title
                },
                "#body": {
                    "max-height": "600px",
                    "margin-bottom": "25px",
                    overflow: "hidden",
                    "word-wrap": "break-word",
                    "line-height": "21px",
                    "font-size": "15px",
                    "font-weight": "normal",
                    "text-align": "left"
                },
                "#mini #body": {
                    display: "inline-block",
                    "max-width": "250px",
                    margin: "0 0 0 30px",
                    height: h.NOTIF_HEIGHT_MINI + "px",
                    "font-size": "16px",
                    "letter-spacing": "0.8px",
                    color: this.style_vals.text_title
                },
                "#mini #body-text": {
                    display: "table",
                    height: h.NOTIF_HEIGHT_MINI + "px"
                },
                "#mini #body-text div": {
                    display: "table-cell",
                    "vertical-align": "middle"
                },
                "#tagline": {
                    "margin-bottom": "15px",
                    "font-size": "10px",
                    "font-weight": "600",
                    "letter-spacing": "0.8px",
                    color: "#ccd7e0",
                    "text-align": "left"
                },
                "#tagline a": {
                    color: this.style_vals.text_tagline,
                    transition: "color " + j
                },
                "#tagline a:hover": {
                    color: this.style_vals.text_hover
                },
                "#cancel": {
                    position: "absolute",
                    right: "0",
                    width: "8px",
                    height: "8px",
                    padding: "10px",
                    "border-radius": "20px",
                    margin: "12px 12px 0 0",
                    "box-sizing": "content-box",
                    cursor: "pointer",
                    transition: "background-color " + j
                },
                "#mini #cancel": {
                    margin: "7px 7px 0 0"
                },
                "#cancel-icon": {
                    width: "8px",
                    height: "8px",
                    overflow: "hidden",
                    "background-image": "url(" + this.cdn_host + "/site_media/images/icons/notifications/cancel-x.png)",
                    opacity: this.style_vals.cancel_opacity
                },
                "#cancel:hover": {
                    "background-color": this.style_vals.bg_hover
                },
                "#button": {
                    display: "block",
                    height: "60px",
                    "line-height": "60px",
                    "text-align": "center",
                    "background-color": this.style_vals.bg_actions,
                    "border-radius": "0 0 4px 4px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "background-color " + j
                },
                "#button-close": {
                    display: "inline-block",
                    width: "9px",
                    height: "60px",
                    "margin-right": "8px",
                    "vertical-align": "top",
                    "background-image": "url(" + this.cdn_host + "/site_media/images/icons/notifications/close-x-" + this.style + ".png)",
                    "background-repeat": "no-repeat",
                    "background-position": "0px 25px"
                },
                "#button-play": {
                    display: "inline-block",
                    width: "30px",
                    height: "60px",
                    "margin-left": "15px",
                    "background-image": "url(" + this.cdn_host + "/site_media/images/icons/notifications/play-" + this.style + "-small.png)",
                    "background-repeat": "no-repeat",
                    "background-position": "0px 15px"
                },
                "a#button-link": {
                    display: "inline-block",
                    "vertical-align": "top",
                    "text-align": "center",
                    "font-size": "17px",
                    "font-weight": "bold",
                    overflow: "hidden",
                    "word-wrap": "break-word",
                    color: this.style_vals.text_title,
                    transition: "color " + j
                },
                "#button:hover": {
                    "background-color": this.style_vals.bg_hover,
                    color: this.style_vals.text_hover
                },
                "#button:hover a": {
                    color: this.style_vals.text_hover
                },
                "#video-noflip": {
                    position: "relative",
                    top: 2 * -this.video_height + "px"
                },
                "#video-flip": {
                    "backface-visibility": "hidden",
                    transform: "rotateY(180deg)"
                },
                "#video": {
                    position: "absolute",
                    width: this.video_width - 1 + "px",
                    height: this.video_height + "px",
                    top: h.NOTIF_TOP + "px",
                    "margin-top": "100px",
                    left: "50%",
                    "margin-left": Math.round(-this.video_width / 2) + "px",
                    overflow: "hidden",
                    "border-radius": "5px",
                    "box-shadow": b,
                    transform: "translateZ(1px)",
                    transition: "opacity " + j + ", top " + j
                },
                "#video.exiting": {
                    opacity: "0.0",
                    top: this.video_height + "px"
                },
                "#video-holder": {
                    position: "absolute",
                    width: this.video_width - 1 + "px",
                    height: this.video_height + "px",
                    overflow: "hidden",
                    "border-radius": "5px"
                },
                "#video-frame": {
                    "margin-left": "-1px",
                    width: this.video_width + "px"
                },
                "#video-controls": {
                    opacity: "0",
                    transition: "opacity 0.5s"
                },
                "#video:hover #video-controls": {
                    opacity: "1.0"
                },
                "#video .video-progress-el": {
                    position: "absolute",
                    bottom: "0",
                    height: "25px",
                    "border-radius": "0 0 0 5px"
                },
                "#video-progress": {
                    width: "90%"
                },
                "#video-progress-total": {
                    width: "100%",
                    "background-color": this.style_vals.bg,
                    opacity: "0.7"
                },
                "#video-elapsed": {
                    width: "0",
                    "background-color": "#6cb6f5",
                    opacity: "0.9"
                },
                "#video #video-time": {
                    width: "10%",
                    right: "0",
                    "font-size": "11px",
                    "line-height": "25px",
                    color: this.style_vals.text_main,
                    "background-color": "#666",
                    "border-radius": "0 0 5px 0"
                }
            };
            this._browser_lte("ie", 8) && d.extend(a, {
                "* html #overlay": {
                    position: "absolute"
                },
                "* html #bg": {
                    position: "absolute"
                },
                "html, body": {
                    height: "100%"
                }
            });
            this._browser_lte("ie", 7) && d.extend(a, {
                "#mini #body": {
                    display: "inline",
                    zoom: "1",
                    border: "1px solid " + this.style_vals.bg_hover
                },
                "#mini #body-text": {
                    padding: "20px"
                },
                "#mini #mini-icon": {
                    display: "none"
                }
            });
            var b = "backface-visibility,border-radius,box-shadow,opacity,perspective,transform,transform-style,transition".split(","),
                c = ["khtml", "moz", "ms", "o", "webkit"],
                k;
            for (k in a)
                for (e = 0; e < b.length; e++)
                    if (j = b[e], j in a[k])
                        for (var i = a[k][j], m = 0; m < c.length; m++) a[k]["-" + c[m] + "-" + j] = i;
                    (function(a, b) {
                        var c = function(a) {
                                var b = "",
                                    c;
                                for (c in a) {
                                    var d = c.replace(/#/g, "#" + h.MARKUP_PREFIX + "-").replace(/\./g, "." + h.MARKUP_PREFIX + "-"),
                                        b = b + ("\n" + d + " {"),
                                        d = a[c],
                                        e;
                                    for (e in d) b += e + ":" + d[e] + ";";
                                    b += "}"
                                }
                                return b
                            },
                            d = c(a) + function(a) {
                                var b = "",
                                    d;
                                for (d in a) b += "\n" + d + " {" + c(a[d]) + "\n}";
                                return b
                            }(b),
                            e = l.head || l.getElementsByTagName("head")[0] || l.documentElement,
                            f = l.createElement("style");
                        e.appendChild(f);
                        f.setAttribute("type", "text/css");
                        f.styleSheet ? f.styleSheet.cssText = d : f.textContent = d
                    })(a, g)
        };
        h.prototype._init_video = d.safewrap(function() {
            if (this.video_url) {
                var a = this;
                a.yt_custom = "postMessage" in o;
                a.dest_url = a.video_url;
                var b = a.video_url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i),
                    c = a.video_url.match(/vimeo\.com\/.*?(\d+)/i);
                if (b) {
                    if (a.show_video = !0, a.youtube_video = b[1], a.yt_custom) o.onYouTubeIframeAPIReady =
                        function() {
                            a._get_el("video-frame") && a._yt_video_ready()
                        }, b = l.createElement("script"), b.src = a.resource_protocol + "www.youtube.com/iframe_api", c = l.getElementsByTagName("script")[0], c.parentNode.insertBefore(b, c)
                } else if (c) a.show_video = !0, a.vimeo_video = c[1];
                if (a._browser_lte("ie", 7) || a._browser_lte("firefox", 3)) a.show_video = !1, a.clickthrough = !0
            }
        });
        h.prototype._mark_as_shown = d.safewrap(function() {
            var a = this;
            d.register_event(a._get_el("bg"), "click", function() {
                a.dismiss()
            });
            var b = function(a, b) {
                var c = {};
                if (l.defaultView && l.defaultView.getComputedStyle) c = l.defaultView.getComputedStyle(a, null);
                else if (a.currentStyle) c = a.currentStyle;
                return c[b]
            };
            if (this.campaign_id) {
                var c = this._get_el("overlay");
                c && "hidden" !== b(c, "visibility") && "none" !== b(c, "display") && this._mark_delivery()
            }
        });
        h.prototype._mark_delivery = d.safewrap(function(a) {
            if (!this.marked_as_shown) this.marked_as_shown = !0, this.campaign_id && (this._get_shown_campaigns()[this.campaign_id] = 1 * new Date, this.persistence.save()), this._track_event("$campaign_delivery",
                a), this.freshpaint.people.append({
                $campaigns: this.campaign_id,
                $notifications: {
                    campaign_id: this.campaign_id,
                    message_id: this.message_id,
                    type: "web",
                    time: new Date
                }
            })
        });
        h.prototype._preload_images = function(a) {
            var b = this;
            if (0 === this.imgs_to_preload.length) a();
            else {
                for (var c = 0, d = [], e = function() {
                        c++;
                        c === b.imgs_to_preload.length && a && (a(), a = null)
                    }, g = 0; g < this.imgs_to_preload.length; g++) {
                    var h = new Image;
                    h.onload = e;
                    h.src = this.imgs_to_preload[g];
                    h.complete && e();
                    d.push(h)
                }
                this._browser_lte("ie", 7) && setTimeout(function() {
                    var b = !0;
                    for (g = 0; g < d.length; g++) d[g].complete || (b = !1);
                    b && a && (a(), a = null)
                }, 500)
            }
        };
        h.prototype._remove_notification_el = d.safewrap(function() {
            o.clearInterval(this._video_progress_checker);
            this.notification_el.style.visibility = "hidden";
            this.body_el.removeChild(this.notification_el)
        });
        h.prototype._set_client_config = function() {
            var a = function(a) {
                return (a = navigator.userAgent.match(a)) && a[1]
            };
            this.browser_versions = {};
            this.browser_versions.chrome = a(/Chrome\/(\d+)/);
            this.browser_versions.firefox = a(/Firefox\/(\d+)/);
            this.browser_versions.ie = a(/MSIE (\d+).+/);
            !this.browser_versions.ie && !o.ActiveXObject && "ActiveXObject" in o && (this.browser_versions.ie = 11);
            if (this.body_el = l.body || l.getElementsByTagName("body")[0]) this.doc_width = Math.max(this.body_el.scrollWidth, l.documentElement.scrollWidth, this.body_el.offsetWidth, l.documentElement.offsetWidth, this.body_el.clientWidth, l.documentElement.clientWidth), this.doc_height = Math.max(this.body_el.scrollHeight, l.documentElement.scrollHeight, this.body_el.offsetHeight, l.documentElement.offsetHeight,
                this.body_el.clientHeight, l.documentElement.clientHeight);
            var b = this.browser_versions.ie,
                c = l.createElement("div").style,
                a = function(a) {
                    if (a in c) return !0;
                    if (!b)
                        for (var a = a[0].toUpperCase() + a.slice(1), a = ["O" + a, "Webkit" + a, "Moz" + a], d = 0; d < a.length; d++)
                            if (a[d] in c) return !0;
                    return !1
                };
            this.use_transitions = this.body_el && a("transition") && a("transform");
            this.flip_animate = (33 <= this.browser_versions.chrome || 15 <= this.browser_versions.firefox) && this.body_el && a("backfaceVisibility") && a("perspective") && a("transform")
        };
        h.prototype._switch_to_video = d.safewrap(function() {
            var a = this,
                b = [{
                    el: a._get_notification_display_el(),
                    attr: "opacity",
                    start: 1,
                    goal: 0
                }, {
                    el: a._get_notification_display_el(),
                    attr: "top",
                    start: h.NOTIF_TOP,
                    goal: -500
                }, {
                    el: a._get_el("video-noflip"),
                    attr: "opacity",
                    start: 0,
                    goal: 1
                }, {
                    el: a._get_el("video-noflip"),
                    attr: "top",
                    start: 2 * -a.video_height,
                    goal: 0
                }];
            if (a.mini) {
                var c = a._get_el("bg"),
                    d = a._get_el("overlay");
                c.style.width = "100%";
                c.style.height = "100%";
                d.style.width = "100%";
                a._add_class(a._get_notification_display_el(),
                    "exiting");
                a._add_class(c, "visible");
                b.push({
                    el: a._get_el("bg"),
                    attr: "opacity",
                    start: 0,
                    goal: h.BG_OPACITY
                })
            }
            a._get_el("video-holder").innerHTML = a.video_iframe;
            c = function() {
                o.YT && o.YT.loaded && a._yt_video_ready();
                a.showing_video = !0;
                a._get_notification_display_el().style.visibility = "hidden"
            };
            a.flip_animate ? (a._add_class("flipper", "flipped"), setTimeout(c, h.ANIM_TIME)) : a._animate_els(b, h.ANIM_TIME, c)
        });
        h.prototype._track_event = function(a, b, c) {
            this.campaign_id ? (b = b || {}, b = d.extend(b, {
                campaign_id: this.campaign_id,
                message_id: this.message_id,
                message_type: "web_inapp",
                message_subtype: this.notif_type
            }), this.freshpaint.track(a, b, c)) : c && c.call()
        };
        h.prototype._yt_video_ready = d.safewrap(function() {
            var a = this;
            if (!a.video_inited) {
                a.video_inited = !0;
                var b = a._get_el("video-elapsed"),
                    c = a._get_el("video-time"),
                    e = a._get_el("video-progress");
                new o.YT.Player(h.MARKUP_PREFIX + "-video-frame", {
                    events: {
                        onReady: function(h) {
                            var g = h.target,
                                j = g.getDuration(),
                                i = function(a) {
                                    var a = Math.round(j - a),
                                        b = Math.floor(a / 60),
                                        d = Math.floor(b / 60),
                                        a =
                                        a - 60 * b;
                                    c.innerHTML = "-" + (d ? d + ":" : "") + ("00" + (b - 60 * d)).slice(-2) + ":" + ("00" + a).slice(-2)
                                };
                            i(0);
                            a._video_progress_checker = o.setInterval(function() {
                                var a = g.getCurrentTime();
                                b.style.width = 100 * (a / j) + "%";
                                i(a)
                            }, 250);
                            d.register_event(e, "click", function(a) {
                                a = Math.max(0, a.pageX - e.getBoundingClientRect().left);
                                g.seekTo(j * a / e.clientWidth, !0)
                            })
                        }
                    }
                })
            }
        });
        e.prototype.init = e.prototype.init;
        e.prototype.reset = e.prototype.reset;
        e.prototype.ready = e.prototype.ready;
        e.prototype.disable = e.prototype.disable;
        e.prototype.time_event =
            e.prototype.time_event;
        e.prototype.track = e.prototype.track;
        e.prototype.track_links = e.prototype.track_links;
        e.prototype.track_forms = e.prototype.track_forms;
        e.prototype.track_pageview = e.prototype.track_pageview;
        e.prototype.register = e.prototype.register;
        e.prototype.register_once = e.prototype.register_once;
        e.prototype.unregister = e.prototype.unregister;
        e.prototype.addEventProperties = e.prototype.register;
        e.prototype.addInitialEventProperties = e.prototype.register_once;
        e.prototype.removeEventProperty = e.prototype.unregister;
        e.prototype.addPageviewProperties = e.prototype.addPageviewProperties;
        e.prototype.identify = e.prototype.identify;
        e.prototype.user = e.prototype.user;
        e.prototype.group = e.prototype.group;
        e.prototype.alias = e.prototype.alias;
        e.prototype.page = e.prototype.page;
        e.prototype.name_tag = e.prototype.name_tag;
        e.prototype.set_config = e.prototype.set_config;
        e.prototype.get_config = e.prototype.get_config;
        e.prototype.get_property = e.prototype.get_property;
        e.prototype.get_distinct_id = e.prototype.get_distinct_id;
        e.prototype.toString =
            e.prototype.toString;
        e.prototype._check_and_handle_notifications = e.prototype._check_and_handle_notifications;
        e.prototype._handle_user_decide_check_complete = e.prototype._handle_user_decide_check_complete;
        e.prototype._processEvent = e.prototype._processEvent;
        e.prototype._show_notification = e.prototype._show_notification;
        e.prototype.opt_out_tracking = e.prototype.opt_out_tracking;
        e.prototype.opt_in_tracking = e.prototype.opt_in_tracking;
        e.prototype.has_opted_out_tracking = e.prototype.has_opted_out_tracking;
        e.prototype.has_opted_in_tracking = e.prototype.has_opted_in_tracking;
        e.prototype.clear_opt_in_out_tracking = e.prototype.clear_opt_in_out_tracking;
        e.prototype.get_group = e.prototype.get_group;
        e.prototype.set_group = e.prototype.set_group;
        e.prototype.add_group = e.prototype.add_group;
        e.prototype.remove_group = e.prototype.remove_group;
        e.prototype.track_with_groups = e.prototype.track_with_groups;
        k.prototype.properties = k.prototype.properties;
        k.prototype.update_search_keyword = k.prototype.update_search_keyword;
        k.prototype.update_referrer_info =
            k.prototype.update_referrer_info;
        k.prototype.get_cross_subdomain = k.prototype.get_cross_subdomain;
        k.prototype.clear = k.prototype.clear;
        j.prototype.set = j.prototype.set;
        j.prototype.set_once = j.prototype.set_once;
        j.prototype.unset = j.prototype.unset;
        j.prototype.increment = j.prototype.increment;
        j.prototype.append = j.prototype.append;
        j.prototype.remove = j.prototype.remove;
        j.prototype.union = j.prototype.union;
        j.prototype.track_charge = j.prototype.track_charge;
        j.prototype.clear_charges = j.prototype.clear_charges;
        j.prototype.delete_user = j.prototype.delete_user;
        j.prototype.toString = j.prototype.toString;
        d.safewrap_class(e, ["identify", "_check_and_handle_notifications", "_show_notification"]);
        var w = {},
            Ka = function() {
                d.each(w, function(a, b) {
                    N(b) || (t[b] = a)
                });
                t._ = d
            },
            La = function() {
                t.init = function(a, b, c) {
                    if (c) return t[c] || (t[c] = w[c] = X(a, b, c, []), t[c]._loaded()), t[c];
                    c = t;
                    if (w.freshpaint || w.perfalytics) c = w.freshpaint || w.perfalytics;
                    else if (a) c = X(a, b, "freshpaint", []), c._loaded(), w.freshpaint = c, w.perfalytics = c;
                    t = c;
                    if (1 ===
                        fa) o.freshpaint = t, o.perfalytics = t;
                    Ka()
                }
            },
            Ma = function() {
                function a() {
                    if (!a.done) qa = a.done = !0, oa = !1, d.each(w, function(a) {
                        a._dom_loaded()
                    })
                }

                function b() {
                    try {
                        l.documentElement.doScroll("left")
                    } catch (c) {
                        setTimeout(b, 1);
                        return
                    }
                    a()
                }
                if (l.addEventListener) "complete" === l.readyState ? a() : l.addEventListener("DOMContentLoaded", a, !1);
                else if (l.attachEvent) {
                    l.attachEvent("onreadystatechange", a);
                    var c = !1;
                    try {
                        c = null === o.frameElement
                    } catch (e) {}
                    l.documentElement.doScroll && c && b()
                }
                d.register_event(o, "load", a, !0)
            };
        (function() {
            fa =
                1;
            t = o.freshpaint || o.perfalytics;
            if (d.isUndefined(t)) m.critical('"freshpaint" object not initialized. Ensure you are using the latest version of the Freshpaint JS Library along with the snippet we provide.');
            else if (t.__loaded || t.config && t.persistence) m.error("Freshpaint library has already been downloaded at least once.");
            else {
                var a = t.__SV || 0;
                if (1.1 > a) m.critical("Version mismatch; please ensure you're using the latest version of the Freshpaint code snippet.");
                else {
                    var b = t._i[0],
                        c = b[0],
                        e = d.extend({},
                            pa, b[1] || {});
                    Ga(e.app_host, c, function(b) {
                        F._loadScript(e.app_host + "/static/js/integrations.js", function() {
                            for (var c = b.destInfo, e = {}, f = 0; f < c.length; f++) {
                                var h = c[f];
                                e[h.name] = h.settings
                            }
                            o.freshpaintIntegrations.init(e, {
                                user: {
                                    cookie: {
                                        key: "fpjs_user_id"
                                    },
                                    localStorage: {
                                        key: "fpjs_user_traits"
                                    }
                                },
                                group: {
                                    cookie: {
                                        key: "fpjs_group_id"
                                    },
                                    localStorage: {
                                        key: "fpjs_group_properties"
                                    }
                                }
                            });
                            var j = b.eventDefs;
                            d.each(t._i, function(a) {
                                a && d.isArray(a) && (w[a[a.length - 1]] = X.apply(this, a.concat([j, c])))
                            });
                            La();
                            t.init();
                            1.3 >=
                                a && t.page();
                            d.each(w, function(a) {
                                a._loaded()
                            });
                            w.freshpaint = w.freshpaint || w.perfalytics;
                            w.perfalytics = w.freshpaint;
                            Ma()
                        })
                    })
                }
            }
        })()
    })();
})();