window.Laya = function(t, e)
	{
		var i = {
			__internals: [],
			__packages:
			{},
			__classmap:
			{
				Object: Object,
				Function: Function,
				Array: Array,
				String: String
			},
			__sysClass:
			{
				object: "Object",
				array: "Array",
				string: "String",
				dictionary: "Dictionary"
			},
			__propun:
			{
				writable: !0,
				enumerable: !1,
				configurable: !0
			},
			__presubstr: String.prototype.substr,
			__substr: function(t, e)
			{
				return 1 == arguments.length ? i.__presubstr.call(this, t) : i.__presubstr.call(this, t, e > 0 ? e : this.length + e)
			},
			__init: function(t)
			{
				t.forEach(function(t)
				{
					t.__init$ && t.__init$()
				})
			},
			__isClass: function(t)
			{
				return t && (t.__isclass || t == Object || t == String || t == Array)
			},
			__newvec: function(t, e)
			{
				var i = [];
				i.length = t;
				for (var n = 0; t > n; n++) i[n] = e;
				return i
			},
			__extend: function(t, e)
			{
				function n()
				{
					i.un(this, "constructor", t)
				}
				for (var s in e)
					if (e.hasOwnProperty(s))
					{
						var r = e.__lookupGetter__(s),
							a = e.__lookupSetter__(s);
						r || a ? (r && t.__defineGetter__(s, r), a && t.__defineSetter__(s, a)) : t[s] = e[s]
					}
				n.prototype = e.prototype, t.prototype = new n, i.un(t.prototype, "__imps", i.__copy(
				{}, e.prototype.__imps))
			},
			__copy: function(t, e)
			{
				if (!e) return null;
				t = t ||
				{};
				for (var i in e) t[i] = e[i];
				return t
			},
			__package: function(e, n)
			{
				if (!i.__packages[e])
				{
					i.__packages[e] = !0;
					var s = t,
						r = e.split(".");
					if (r.length > 1)
						for (var a = 0, o = r.length - 1; o > a; a++)
						{
							var h = s[r[a]];
							s = h ? h : s[r[a]] = {}
						}
					s[r[r.length - 1]] || (s[r[r.length - 1]] = n ||
					{})
				}
			},
			__hasOwnProperty: function(t, e)
			{
				function i(t, e)
				{
					if (Object.hasOwnProperty.call(e.prototype, t)) return !0;
					var n = e.prototype.__super;
					return null == n ? null : i(t, n)
				}
				return e = e || this, Object.hasOwnProperty.call(e, t) || i(t, e.__class)
			},
			__typeof: function(t, e)
			{
				if (!t || !e) return !1;
				if (e == String) return "string" == typeof t;
				if (e == Number) return "number" == typeof t;
				if (e.__interface__) e = e.__interface__;
				else if ("string" != typeof e) return t instanceof e;
				return t.__imps && t.__imps[e] || t.__class == e
			},
			__as: function(t, e)
			{
				return this.__typeof(t, e) ? t : null
			},
			"interface": function(e, n)
			{
				i.__package(e,
				{});
				var s = i.__internals,
					r = s[e] = s[e] ||
					{};
				r.self = e, n && (r.extend = s[n] = s[n] ||
				{});
				for (var a = t, o = e.split("."), h = 0; h < o.length - 1; h++) a = a[o[h]];
				a[o[o.length - 1]] = {
					__interface__: e
				}
			},
			"class": function(e, n, s, r)
			{
				if (s && i.__extend(e, s), n)
					if (i.__package(n, e), i.__classmap[n] = e, n.indexOf(".") > 0)
					{
						if (0 == n.indexOf("laya."))
						{
							var a = n.split(".");
							r = r || a[a.length - 1], i[r], i[r] = e
						}
					}
					else "Main" == n ? t.Main = e : (i[n] && console.log("Err!,Same class:" + n, i[n]), i[n] = e);
				var o = i.un,
					h = e.prototype;
				o(h, "hasOwnProperty", i.__hasOwnProperty), o(h, "__class", e), o(h, "__super", s), o(h, "__className", n), o(e, "__super", s), o(e, "__className", n), o(e, "__isclass", !0), o(e, "super", function(t)
				{
					this.__super.call(t)
				})
			},
			imps: function(t, e)
			{
				if (!e) return null;
				var n = t.__imps || i.un(t, "__imps",
				{});
				for (var s in e)
				{
					n[s] = e[s];
					for (var r = s;
						(r = this.__internals[r]) && (r = r.extend);) r = r.self, n[r] = !0
				}
			},
			getset: function(t, e, n, s, r)
			{
				t ? (s && (e["_$GET_" + n] = s), r && (e["_$SET_" + n] = r)) : (s && i.un(e, "_$get_" + n, s), r && i.un(e, "_$set_" + n, r)), s && r ? Object.defineProperty(e, n,
				{
					get: s,
					set: r,
					enumerable: !1
				}) : (s && Object.defineProperty(e, n,
				{
					get: s,
					enumerable: !1
				}), r && Object.defineProperty(e, n,
				{
					set: r,
					enumerable: !1
				}))
			},
			"static": function(t, e)
			{
				function i()
				{
					var i = e[n],
						s = e[n + 1];
					Object.defineProperty(t, i,
					{
						get: function()
						{
							return delete this[i], this[i] = s.call(this)
						},
						set: function(t)
						{
							delete this[i], this[i] = t
						},
						enumerable: !0,
						configurable: !0
					})
				}
				for (var n = 0, s = e.length; s > n; n += 2) "length" == e[n] ? t.length = e[n + 1].call(t) : i()
			},
			un: function(t, e, n)
			{
				return n || (n = t[e]), i.__propun.value = n, Object.defineProperty(t, e, i.__propun), n
			},
			uns: function(t, e)
			{
				e.forEach(function(e)
				{
					i.un(t, e)
				})
			}
		};
		return t.console = t.console ||
		{
			log: function() {}
		}, t.trace = t.console.log, Error.prototype.throwError = function()
		{
			throw arguments
		}, String.prototype.substr = i.__substr, Object.defineProperty(Array.prototype, "fixed",
		{
			enumerable: !1
		}), i
	}(window, document),
	function(t, e, i)
	{
		i.un, i.uns, i["static"], i["class"], i.getset, i.__newvec
	}(window, document, Laya),
	function(window, document, Laya)
	{
		var __un = Laya.un,
			__uns = Laya.uns,
			__static = Laya["static"],
			__class = Laya["class"],
			__getset = Laya.getset,
			__newvec = Laya.__newvec;
		Laya["interface"]("laya.runtime.IConchNode"), Laya["interface"]("laya.runtime.IPlatform"), Laya["interface"]("laya.runtime.ICPlatformClass"), Laya["interface"]("laya.filters.IFilterAction"), Laya["interface"]("laya.resource.IDispose"), Laya["interface"]("laya.filters.IFilter"), Laya["interface"]("laya.display.ILayout"), Laya["interface"]("laya.runtime.IMarket"), Laya["interface"]("laya.runtime.IPlatformClass", "laya.runtime.IPlatform");
		var RunDriver = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.RunDriver"), t.FILTER_ACTIONS = [], t.pixelRatio = -1, t._charSizeTestDiv = null, t.now = function()
				{
					return Date.now()
				}, t.getWindow = function()
				{
					return window
				}, t.newWebGLContext = function(t, e)
				{
					return t.getContext(e,
					{
						stencil: !0,
						alpha: !1,
						antialias: Config.isAntialias,
						premultipliedAlpha: !1
					})
				}, t.getPixelRatio = function()
				{
					if (t.pixelRatio < 0)
					{
						var e = Browser.context,
							i = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
						t.pixelRatio = (Browser.window.devicePixelRatio || 1) / i
					}
					return t.pixelRatio
				}, t.getIncludeStr = function(t)
				{
					return null
				}, t.createShaderCondition = function(t)
				{
					var e = "(function() {return " + t + ";})";
					return Browser.window.eval(e)
				}, t.measureText = function(e, i)
				{
					if (Render.isConchApp)
					{
						var n = ConchTextCanvas;
						return n.font = i, n.measureText(e)
					}
					return null == t._charSizeTestDiv && (t._charSizeTestDiv = Browser.createElement("div"), t._charSizeTestDiv.style.cssText = "z-index:10000000;padding:0px;position: absolute;left:0px;visibility:hidden;top:0px;background:white", Browser.container.appendChild(t._charSizeTestDiv)), t._charSizeTestDiv.style.font = i, t._charSizeTestDiv.innerText = " " == e ? "i" : e,
					{
						width: t._charSizeTestDiv.offsetWidth,
						height: t._charSizeTestDiv.offsetHeight
					}
				}, t.beginFlush = function() {}, t.endFinish = function() {}, t.addToAtlas = null, t.flashFlushImage = function(t) {}, t.drawToCanvas = function(t, e, i, n, s, r)
				{
					var a = HTMLCanvas.create("2D"),
						o = new RenderContext(i, n, a);
					return RenderSprite.renders[e]._fun(t, o, s, r), a
				}, t.createParticleTemplate2D = null, t.createGLTextur = null, t.createWebGLContext2D = null, t.changeWebGLSize = function(t, e) {}, t.createRenderSprite = function(t, e)
				{
					return new RenderSprite(t, e)
				}, t.createFilterAction = function(t)
				{
					return new ColorFilterAction
				}, t.createGraphics = function()
				{
					return new Graphics
				}, t.clear = function(t)
				{
					Render._context.ctx.clear()
				}, t.clearAtlas = function(t) {}, t.addTextureToAtlas = function(t) {}, t.getTexturePixels = function(t, e, i, n, s)
				{
					return null
				}, t.fillTextureShader = function(t, e, i, n, s)
				{
					return null
				}, t.skinAniSprite = function()
				{
					return null
				}, t
			}(),
			___Laya = function()
			{
				return __getset(1, Laya, "alertGlobalError", null, function(t)
				{
					var e = 0;
					t ? Browser.window.onerror = function(t, i, n, s, r)
					{
						e++ < 5 && r && alert("出错啦，请把此信息截图给研发商\n" + t + "\n" + r.stack)
					} : Browser.window.onerror = null
				}), Laya.init = function(t, e, i)
				{
					for (var n = [], s = 2, r = arguments.length; r > s; s++) n.push(arguments[s]);
					Browser.__init__(), Context.__init__(), Graphics.__init__(), Laya.timer = new Timer, Laya.loader = new LoaderManager;
					for (var s = 0, a = n.length; a > s; s++) n[s].enable && n[s].enable();
					Font.__init__(), Style.__init__(), ResourceManager.__init__(), CacheManger.beginCheck(), Laya.stageBox = Laya.stage = new Stage, Laya.stage.model && Laya.stage.model.setRootNode();
					var o = Browser.window.location,
						h = o.pathname;
					return h = ":" == h.charAt(2) ? h.substring(1) : h, URL.rootPath = URL.basePath = URL.getPath("file:" == o.protocol ? h : o.href), Laya.render = new Render(50, 50), Laya.stage.size(t, e), RenderSprite.__init__(), KeyBoardManager.__init__(), MouseManager.instance.__init__(Laya.stage, Render.canvas), Input.__init__(), SoundManager.autoStopMusic = !0, LocalStorage.__init__(), Render.canvas
				}, Laya.stage = null, Laya.timer = null, Laya.loader = null, Laya.render = null, Laya.version = "1.4.0", Laya.stageBox = null, __static(Laya, ["conchMarket", function()
				{
					return this.conchMarket = window.conch ? conchMarket : null
				}, "PlatformClass", function()
				{
					return this.PlatformClass = window.PlatformClass
				}]), Laya
			}(),
			Config = function()
			{
				function t()
				{}
				return __class(t, "Config"), t.WebGLTextCacheCount = 500, t.atlasEnable = !1, t.showCanvasMark = !1, t.CPUMemoryLimit = 125829120, t.GPUMemoryLimit = 167772160, t.animationInterval = 30, t.isAntialias = !1, t
			}(),
			EventDispatcher = function()
			{
				function t()
				{
					this._events = null
				}
				var e;
				__class(t, "laya.events.EventDispatcher");
				var i = t.prototype;
				return i.hasListener = function(t)
				{
					var e = this._events && this._events[t];
					return !!e
				}, i.event = function(t, e)
				{
					if (!this._events || !this._events[t]) return !1;
					var i = this._events[t];
					if (i.run) i.once && delete this._events[t], null != e ? i.runWith(e) : i.run();
					else
					{
						for (var n = 0, s = i.length; s > n; n++)
						{
							var r = i[n];
							r && (null != e ? r.runWith(e) : r.run()), r && !r.once || (i.splice(n, 1), n--, s--)
						}
						0 === i.length && delete this._events[t]
					}
					return !0
				}, i.on = function(t, e, i, n)
				{
					return this._createListener(t, e, i, n, !1)
				}, i.once = function(t, e, i, n)
				{
					return this._createListener(t, e, i, n, !0)
				}, i._createListener = function(t, i, n, s, r)
				{
					this.off(t, i, n, r);
					var a = e.create(i || this, n, s, r);
					this._events || (this._events = {});
					var o = this._events;
					return o[t] ? o[t].run ? o[t] = [o[t], a] : o[t].push(a) : o[t] = a, this
				}, i.off = function(t, e, i, n)
				{
					if (void 0 === n && (n = !1), !this._events || !this._events[t]) return this;
					var s = this._events[t];
					if (null != i)
						if (s.run) e && s.caller !== e || s.method !== i || n && !s.once || (delete this._events[t], s.recover());
						else
						{
							for (var r = 0, a = 0, o = s.length; o > a; a++)
							{
								var h = s[a];
								!h || e && h.caller !== e || h.method !== i || n && !h.once || (r++, s[a] = null, h.recover())
							}
							r === o && delete this._events[t]
						}
					return this
				}, i.offAll = function(t)
				{
					var e = this._events;
					if (!e) return this;
					if (t) this._recoverHandlers(e[t]), delete e[t];
					else
					{
						for (var i in e) this._recoverHandlers(e[i]);
						this._events = null
					}
					return this
				}, i._recoverHandlers = function(t)
				{
					if (t)
						if (t.run) t.recover();
						else
							for (var e = t.length - 1; e > -1; e--) t[e] && (t[e].recover(), t[e] = null)
				}, i.isMouseEvent = function(e)
				{
					return t.MOUSE_EVENTS[e]
				}, t.MOUSE_EVENTS = {
					rightmousedown: !0,
					rightmouseup: !0,
					rightclick: !0,
					mousedown: !0,
					mouseup: !0,
					mousemove: !0,
					mouseover: !0,
					mouseout: !0,
					click: !0,
					doubleclick: !0
				}, t.__init$ = function()
				{
					e = function(t)
					{
						function e(t, i, n, s)
						{
							e.__super.call(this, t, i, n, s)
						}
						__class(e, "", t);
						var i = e.prototype;
						return i.recover = function()
						{
							this._id > 0 && (this._id = 0, e._pool.push(this.clear()))
						}, e.create = function(t, i, n, s)
						{
							return void 0 === s && (s = !0), e._pool.length ? e._pool.pop().setTo(t, i, n, s) : new e(t, i, n, s)
						}, e._pool = [], e
					}(Handler)
				}, t
			}(),
			Handler = function()
			{
				function t(t, e, i, n)
				{
					this.once = !1, this._id = 0, void 0 === n && (n = !1), this.setTo(t, e, i, n)
				}
				__class(t, "laya.utils.Handler");
				var e = t.prototype;
				return e.setTo = function(e, i, n, s)
				{
					return this._id = t._gid++, this.caller = e, this.method = i, this.args = n, this.once = s, this
				}, e.run = function()
				{
					if (null == this.method) return null;
					var t = this._id,
						e = this.method.apply(this.caller, this.args);
					return this._id === t && this.once && this.recover(), e
				}, e.runWith = function(t)
				{
					if (null == this.method) return null;
					var e = this._id;
					if (null == t) var i = this.method.apply(this.caller, this.args);
					else i = this.args || t.unshift ? this.args ? this.method.apply(this.caller, this.args.concat(t)) : this.method.apply(this.caller, t) : this.method.call(this.caller, t);
					return this._id === e && this.once && this.recover(), i
				}, e.clear = function()
				{
					return this.caller = null, this.method = null, this.args = null, this
				}, e.recover = function()
				{
					this._id > 0 && (this._id = 0, t._pool.push(this.clear()))
				}, t.create = function(e, i, n, s)
				{
					return void 0 === s && (s = !0), t._pool.length ? t._pool.pop().setTo(e, i, n, s) : new t(e, i, n, s)
				}, t._pool = [], t._gid = 1, t
			}(),
			BitmapFont = function()
			{
				function t()
				{
					this.fontSize = 12, this.autoScaleSize = !1, this._texture = null, this._fontCharDic = {}, this._complete = null, this._path = null, this._maxHeight = 0, this._maxWidth = 0, this._spaceWidth = 10, this._leftPadding = 0, this._rightPadding = 0, this._letterSpacing = 0
				}
				__class(t, "laya.display.BitmapFont");
				var e = t.prototype;
				return e.loadFont = function(t, e)
				{
					this._path = t, this._complete = e, Laya.loader.load([
					{
						url: this._path,
						type: "xml"
					},
					{
						url: this._path.replace(".fnt", ".png"),
						type: "image"
					}], Handler.create(this, this.onLoaded))
				}, e.onLoaded = function()
				{
					this.parseFont(Loader.getRes(this._path), Loader.getRes(this._path.replace(".fnt", ".png"))), this._complete && this._complete.run()
				}, e.parseFont = function(t, e)
				{
					if (null != t && null != e)
					{
						this._texture = e;
						var i = 1,
							n = t.getElementsByTagName("info");
						this.fontSize = parseInt(n[0].attributes.size.nodeValue);
						var s = n[0].attributes.padding.nodeValue,
							r = s.split(","),
							a = parseInt(r[0]),
							o = parseInt(r[2]);
						this._leftPadding = parseInt(r[3]), this._rightPadding = parseInt(r[1]);
						var h = t.getElementsByTagName("char"),
							l = 0;
						for (l = 0; l < h.length; l++)
						{
							var u = h[l].attributes,
								c = parseInt(u.id.nodeValue),
								_ = parseInt(u.xoffset.nodeValue) / i,
								d = parseInt(u.yoffset.nodeValue) / i,
								f = (parseInt(u.xadvance.nodeValue) / i, new Rectangle);
							f.x = parseInt(u.x.nodeValue), f.y = parseInt(u.y.nodeValue), f.width = parseInt(u.width.nodeValue), f.height = parseInt(u.height.nodeValue);
							var p = Texture.create(e, f.x, f.y, f.width, f.height, _, d);
							this._maxHeight = Math.max(this._maxHeight, a + o + p.height), this._maxWidth = Math.max(this._maxWidth, p.width), this._fontCharDic[c] = p
						}
						this.getCharTexture(" ") && this.setSpaceWidth(this.getCharWidth(" "))
					}
				}, e.getCharTexture = function(t)
				{
					return this._fontCharDic[t.charCodeAt(0)]
				}, e.destroy = function()
				{
					var t = null;
					for (var e in this._fontCharDic) t = this._fontCharDic[e], t && t.destroy(), delete this._fontCharDic[e];
					this._texture.destroy()
				}, e.setSpaceWidth = function(t)
				{
					this._spaceWidth = t
				}, e.getCharWidth = function(t)
				{
					if (" " == t) return this._spaceWidth + this._letterSpacing;
					var e = this.getCharTexture(t);
					return e ? e.width + 2 * e.offsetX + this._letterSpacing : 0
				}, e.getTextWidth = function(t)
				{
					for (var e = 0, i = 0, n = t.length; n > i; i++) e += this.getCharWidth(t.charAt(i));
					return e
				}, e.getMaxWidth = function()
				{
					return this._maxWidth + this._letterSpacing
				}, e.getMaxHeight = function()
				{
					return this._maxHeight
				}, e.drawText = function(t, e, i, n, s, r)
				{
					for (var a, o = 0, h = 0, l = t.length; l > h; h++) o += this.getCharWidth(t.charAt(h));
					var u = this._leftPadding;
					"center" === s && (u = (r - o) / 2), "right" === s && (u = r - o - this._rightPadding);
					var c = 0;
					for (h = 0, l = t.length; l > h; h++) a = this.getCharTexture(t.charAt(h)), a && e.graphics.drawTexture(a, i + c + u, n, a.width, a.height), c += this.getCharWidth(t.charAt(h))
				}, __getset(0, e, "letterSpacing", function()
				{
					return this._letterSpacing
				}, function(t)
				{
					this._letterSpacing = t
				}), t
			}(),
			Style = function()
			{
				function t()
				{
					this.alpha = 1, this.visible = !0, this.scrollRect = null, this.blendMode = null, this._type = 0, this._tf = t._TF_EMPTY
				}
				__class(t, "laya.display.css.Style");
				var e = t.prototype;
				return e.getTransform = function()
				{
					return this._tf
				}, e.setTransform = function(e)
				{
					this._tf = "none" !== e && e ? e : t._TF_EMPTY
				}, e.setTranslateX = function(e)
				{
					this._tf === t._TF_EMPTY && (this._tf = t._createTransform()), this._tf.translateX = e
				}, e.setTranslateY = function(e)
				{
					this._tf === t._TF_EMPTY && (this._tf = t._createTransform()), this._tf.translateY = e
				}, e.setScaleX = function(e)
				{
					this._tf === t._TF_EMPTY && (this._tf = t._createTransform()), this._tf.scaleX = e
				}, e.setScaleY = function(e)
				{
					this._tf === t._TF_EMPTY && (this._tf = t._createTransform()), this._tf.scaleY = e
				}, e.setRotate = function(e)
				{
					this._tf === t._TF_EMPTY && (this._tf = t._createTransform()), this._tf.rotate = e
				}, e.setSkewX = function(e)
				{
					this._tf === t._TF_EMPTY && (this._tf = t._createTransform()), this._tf.skewX = e
				}, e.setSkewY = function(e)
				{
					this._tf === t._TF_EMPTY && (this._tf = t._createTransform()), this._tf.skewY = e
				}, e.destroy = function()
				{
					this.scrollRect = null
				}, e.render = function(t, e, i, n) {}, e.getCSSStyle = function()
				{
					return CSSStyle.EMPTY
				}, e._enableLayout = function()
				{
					return !1
				}, __getset(0, e, "block", function()
				{
					return 0 != (1 & this._type)
				}), __getset(0, e, "paddingTop", function()
				{
					return 0
				}), __getset(0, e, "scaleX", function()
				{
					return this._tf.scaleX
				}, function(t)
				{
					this.setScaleX(t)
				}), __getset(0, e, "scaleY", function()
				{
					return this._tf.scaleY
				}, function(t)
				{
					this.setScaleY(t)
				}), __getset(0, e, "transform", function()
				{
					return this.getTransform()
				}, function(t)
				{
					this.setTransform(t)
				}), __getset(0, e, "translateX", function()
				{
					return this._tf.translateX
				}, function(t)
				{
					this.setTranslateX(t)
				}), __getset(0, e, "translateY", function()
				{
					return this._tf.translateY
				}, function(t)
				{
					this.setTranslateY(t)
				}), __getset(0, e, "rotate", function()
				{
					return this._tf.rotate
				}, function(t)
				{
					this.setRotate(t)
				}), __getset(0, e, "skewX", function()
				{
					return this._tf.skewX
				}, function(t)
				{
					this.setSkewX(t)
				}), __getset(0, e, "skewY", function()
				{
					return this._tf.skewY
				}, function(t)
				{
					this.setSkewY(t)
				}), __getset(0, e, "absolute", function()
				{
					return !0
				}), __getset(0, e, "paddingLeft", function()
				{
					return 0
				}), t.__init__ = function()
				{
					t._TF_EMPTY = t._createTransform(), t.EMPTY = new t
				}, t._createTransform = function()
				{
					return {
						translateX: 0,
						translateY: 0,
						scaleX: 1,
						scaleY: 1,
						rotate: 0,
						skewX: 0,
						skewY: 0
					}
				}, t.EMPTY = null, t._TF_EMPTY = null, t
			}(),
			Font = function()
			{
				function t(e)
				{
					this._type = 0, this._weight = 0, this._decoration = null, this._text = null, this.indent = 0, this._color = Color.create(t.defaultColor), this.family = t.defaultFamily, this.stroke = t._STROKE, this.size = t.defaultSize, e && e !== t.EMPTY && e.copyTo(this)
				}
				__class(t, "laya.display.css.Font");
				var e = t.prototype;
				return e.set = function(t)
				{
					this._text = null;
					for (var e = t.split(" "), i = 0, n = e.length; n > i; i++)
					{
						var s = e[i];
						switch (s)
						{
							case "italic":
								this.italic = !0;
								continue;
							case "bold":
								this.bold = !0;
								continue
						}
						s.indexOf("px") > 0 && (this.size = parseInt(s), this.family = e[i + 1], i++)
					}
				}, e.toString = function()
				{
					return this._text = "", this.italic && (this._text += "italic "), this.bold && (this._text += "bold "), this._text += this.size + "px " + this.family
				}, e.copyTo = function(e)
				{
					e._type = this._type, e._text = this._text, e._weight = this._weight, e._color = this._color, e.family = this.family, e.stroke = this.stroke != t._STROKE ? this.stroke.slice() : t._STROKE, e.indent = this.indent, e.size = this.size
				}, __getset(0, e, "color", function()
				{
					return this._color.strColor
				}, function(t)
				{
					this._color = Color.create(t)
				}), __getset(0, e, "decoration", function()
				{
					return this._decoration ? this._decoration.value : "none"
				}, function(t)
				{
					var e = t.split(" ");
					switch (this._decoration || (this._decoration = {}), e[0])
					{
						case "_":
							this._decoration.type = "underline";
							break;
						case "-":
							this._decoration.type = "line-through";
							break;
						case "overline":
							this._decoration.type = "overline";
							break;
						default:
							this._decoration.type = e[0]
					}
					e[1] && (this._decoration.color = Color.create(e)), this._decoration.value = t
				}), __getset(0, e, "italic", function()
				{
					return 0 !== (512 & this._type)
				}, function(t)
				{
					t ? this._type |= 512 : this._type &= -513
				}), __getset(0, e, "bold", function()
				{
					return 0 !== (2048 & this._type)
				}, function(t)
				{
					t ? this._type |= 2048 : this._type &= -2049
				}), __getset(0, e, "password", function()
				{
					return 0 !== (1024 & this._type)
				}, function(t)
				{
					t ? this._type |= 1024 : this._type &= -1025
				}), __getset(0, e, "weight", function()
				{
					return "" + this._weight
				}, function(t)
				{
					var e = 0;
					switch (t)
					{
						case "normal":
							break;
						case "bold":
							this.bold = !0, e = 700;
							break;
						case "bolder":
							e = 800;
							break;
						case "lighter":
							e = 100;
							break;
						default:
							e = parseInt(t)
					}
					this._weight = e, this._text = null
				}), t.__init__ = function()
				{
					t.EMPTY = new t(null)
				}, t.EMPTY = null, t.defaultColor = "#000000", t.defaultSize = 12, t.defaultFamily = "Arial", t.defaultFont = "12px Arial", t._STROKE = [0, "#000000"], t._ITALIC = 512, t._PASSWORD = 1024, t._BOLD = 2048, t
			}(),
			Graphics = function()
			{
				function t()
				{
					this._one = null, this._cmds = null, this._render = this._renderEmpty, this._render = this._renderEmpty, Render.isConchNode && (this._nativeObj = new _conchGraphics, this.id = this._nativeObj.conchID)
				}
				__class(t, "laya.display.Graphics");
				var e = t.prototype;
				return e.destroy = function()
				{
					this.clear(), this._temp = null, this._bounds = null, this._rstBoundPoints = null, this._sp && (this._sp._renderType = 0), this._sp = null
				}, e.clear = function()
				{
					if (this._one = null, this._render = this._renderEmpty, this._cmds = null, this._temp && (this._temp.length = 0), this._sp && (this._sp._renderType &= -2), this._sp && (this._sp._renderType &= -257), this._repaint(), this._vectorgraphArray)
					{
						for (var t = 0, e = this._vectorgraphArray.length; e > t; t++) VectorGraphManager.getInstance().deleteShape(this._vectorgraphArray[t]);
						this._vectorgraphArray.length = 0
					}
				}, e._repaint = function()
				{
					this._temp && (this._temp.length = 0), this._sp && this._sp.repaint()
				}, e._isOnlyOne = function()
				{
					return !this._cmds || 0 === this._cmds.length
				}, e.getBounds = function()
				{
					return (!this._bounds || !this._temp || this._temp.length < 1) && (this._bounds = Rectangle._getWrapRec(this.getBoundPoints(), this._bounds)), this._bounds
				}, e.getBoundPoints = function()
				{
					return (!this._temp || this._temp.length < 1) && (this._temp = this._getCmdPoints()), this._rstBoundPoints = Utils.copyArray(this._rstBoundPoints, this._temp)
				}, e._addCmd = function(t)
				{
					this._cmds = this._cmds || [], t.callee = t.shift(), this._cmds.push(t)
				}, e._getCmdPoints = function()
				{
					var e, i = Render._context,
						n = this._cmds;
					if (e = this._temp || (this._temp = []), e.length = 0, n || null == this._one || (t._tempCmds.length = 0, t._tempCmds.push(this._one), n = t._tempCmds), !n) return e;
					var s;
					s = t._tempMatrixArrays, s.length = 0;
					var r = t._initMatrix;
					r.identity();
					for (var a, o = t._tempMatrix, h = 0, l = n.length; l > h; h++) switch (a = n[h], a.callee)
					{
						case i.save:
						case 7:
							s.push(r), r = r.clone();
							break;
						case i.restore:
						case 8:
							r = s.pop();
							break;
						case i._scale:
						case 5:
							o.identity(), o.translate(-a[2], -a[3]), o.scale(a[0], a[1]), o.translate(a[2], a[3]), this._switchMatrix(r, o);
							break;
						case i._rotate:
						case 3:
							o.identity(), o.translate(-a[1], -a[2]), o.rotate(a[0]), o.translate(a[1], a[2]), this._switchMatrix(r, o);
							break;
						case i._translate:
						case 6:
							o.identity(), o.translate(a[0], a[1]), this._switchMatrix(r, o);
							break;
						case i._transform:
						case 4:
							o.identity(), o.translate(-a[1], -a[2]), o.concat(a[0]), o.translate(a[1], a[2]), this._switchMatrix(r, o);
							break;
						case 16:
						case 24:
							t._addPointArrToRst(e, Rectangle._getBoundPointS(a[0], a[1], a[2], a[3]), r);
							break;
						case 17:
							r.copyTo(o), o.concat(a[4]), t._addPointArrToRst(e, Rectangle._getBoundPointS(a[0], a[1], a[2], a[3]), o);
							break;
						case i._drawTexture:
						case i._fillTexture:
							if (a[3] && a[4]) t._addPointArrToRst(e, Rectangle._getBoundPointS(a[1], a[2], a[3], a[4]), r);
							else
							{
								var u = a[0];
								t._addPointArrToRst(e, Rectangle._getBoundPointS(a[1], a[2], u.width, u.height), r)
							}
							break;
						case i._drawTextureWithTransform:
							r.copyTo(o), o.concat(a[5]), a[3] && a[4] ? t._addPointArrToRst(e, Rectangle._getBoundPointS(a[1], a[2], a[3], a[4]), o) : (u = a[0], t._addPointArrToRst(e, Rectangle._getBoundPointS(a[1], a[2], u.width, u.height), o));
							break;
						case i._drawRect:
						case 13:
							t._addPointArrToRst(e, Rectangle._getBoundPointS(a[0], a[1], a[2], a[3]), r);
							break;
						case i._drawCircle:
						case i._fillCircle:
						case 14:
							t._addPointArrToRst(e, Rectangle._getBoundPointS(a[0] - a[2], a[1] - a[2], a[2] + a[2], a[2] + a[2]), r);
							break;
						case i._drawLine:
						case 20:
							t._tempPoints.length = 0;
							var c = NaN;
							c = .5 * a[5], a[0] == a[2] ? t._tempPoints.push(a[0] + c, a[1], a[2] + c, a[3], a[0] - c, a[1], a[2] - c, a[3]) : a[1] == a[3] ? t._tempPoints.push(a[0], a[1] + c, a[2], a[3] + c, a[0], a[1] - c, a[2], a[3] - c) : t._tempPoints.push(a[0], a[1], a[2], a[3]), t._addPointArrToRst(e, t._tempPoints, r);
							break;
						case i._drawCurves:
						case 22:
							t._addPointArrToRst(e, Bezier.I.getBezierPoints(a[2]), r, a[0], a[1]);
							break;
						case i._drawPoly:
						case i._drawLines:
						case 18:
							t._addPointArrToRst(e, a[2], r, a[0], a[1]);
							break;
						case i._drawPath:
						case 19:
							t._addPointArrToRst(e, this._getPathPoints(a[2]), r, a[0], a[1]);
							break;
						case i._drawPie:
						case 15:
							t._addPointArrToRst(e, this._getPiePoints(a[0], a[1], a[2], a[3], a[4]), r)
					}
					return e.length > 200 ? e = Utils.copyArray(e, Rectangle._getWrapRec(e)._getBoundPoints()) : e.length > 8 && (e = GrahamScan.scanPList(e)), e
				}, e._switchMatrix = function(t, e)
				{
					e.concat(t), e.copyTo(t)
				}, e.drawTexture = function(t, e, i, n, s, r)
				{
					if (void 0 === n && (n = 0), void 0 === s && (s = 0), t && (n || (n = t.sourceWidth), s || (s = t.sourceHeight), n = n - t.sourceWidth + t.width, s = s - t.sourceHeight + t.height, !t.loaded || !(0 >= n || 0 >= s)))
					{
						e += t.offsetX, i += t.offsetY, this._sp && (this._sp._renderType |= 256);
						var a = [t, e, i, n, s, r];
						a.callee = r ? Render._context._drawTextureWithTransform : Render._context._drawTexture, null != this._one || r ? this._saveToCmd(a.callee, a) : (this._one = a, this._render = this._renderOneImg), t.loaded || t.once("loaded", this, this._textureLoaded, [t, a]), this._repaint()
					}
				}, e.fillTexture = function(t, e, i, n, s, r, a)
				{
					if (void 0 === n && (n = 0), void 0 === s && (s = 0), void 0 === r && (r = "repeat"), t)
					{
						var o = [t, e, i, n, s, r, a];
						if (t.loaded || t.once("loaded", this, this._textureLoaded, [t, o]), Render.isWebGL)
						{
							var h = RunDriver.fillTextureShader(t, e, i, n, s);
							o.push(h)
						}
						this._saveToCmd(Render._context._fillTexture, o)
					}
				}, e._textureLoaded = function(t, e)
				{
					e[3] = e[3] || t.width, e[4] = e[4] || t.height, this._repaint()
				}, e._saveToCmd = function(t, e)
				{
					return this._sp && (this._sp._renderType |= 256), null == this._one ? (this._one = e, this._render = this._renderOne) : (this._sp && (this._sp._renderType &= -2), this._render = this._renderAll, 0 === (this._cmds || (this._cmds = [])).length && this._cmds.push(this._one), this._cmds.push(e)), e.callee = t, this._temp && (this._temp.length = 0), this._repaint(), e
				}, e.clipRect = function(t, e, i, n)
				{
					this._saveToCmd(Render._context._clipRect, [t, e, i, n])
				}, e.fillText = function(t, e, i, n, s, r)
				{
					this._saveToCmd(Render._context._fillText, [t, e, i, n || Font.defaultFont, s, r])
				}, e.fillBorderText = function(t, e, i, n, s, r, a, o)
				{
					this._saveToCmd(Render._context._fillBorderText, [t, e, i, n || Font.defaultFont, s, r, a, o])
				}, e.strokeText = function(t, e, i, n, s, r, a)
				{
					this._saveToCmd(Render._context._strokeText, [t, e, i, n || Font.defaultFont, s, r, a])
				}, e.alpha = function(t)
				{
					this._saveToCmd(Render._context._alpha, [t])
				}, e.transform = function(t, e, i)
				{
					void 0 === e && (e = 0), void 0 === i && (i = 0), this._saveToCmd(Render._context._transform, [t, e, i])
				}, e.rotate = function(t, e, i)
				{
					void 0 === e && (e = 0), void 0 === i && (i = 0), this._saveToCmd(Render._context._rotate, [t, e, i])
				}, e.scale = function(t, e, i, n)
				{
					void 0 === i && (i = 0), void 0 === n && (n = 0), this._saveToCmd(Render._context._scale, [t, e, i, n])
				}, e.translate = function(t, e)
				{
					this._saveToCmd(Render._context._translate, [t, e])
				}, e.save = function()
				{
					this._saveToCmd(Render._context._save, [])
				}, e.restore = function()
				{
					this._saveToCmd(Render._context._restore, [])
				}, e.replaceText = function(t)
				{
					this._repaint();
					var e = this._cmds;
					if (e)
					{
						for (var i = e.length - 1; i > -1; i--)
							if (this._isTextCmd(e[i].callee)) return e[i][0].toUpperCase ? e[i][0] = t : e[i][0].setText(t), !0
					}
					else if (this._one && this._isTextCmd(this._one.callee)) return this._one[0].toUpperCase ? this._one[0] = t : this._one[0].setText(t), !0;
					return !1
				}, e._isTextCmd = function(t)
				{
					return t === Render._context._fillText || t === Render._context._fillBorderText || t === Render._context._strokeText
				}, e.replaceTextColor = function(t)
				{
					this._repaint();
					var e = this._cmds;
					if (e)
						for (var i = e.length - 1; i > -1; i--) this._isTextCmd(e[i].callee) && (e[i][4] = t, e[i][0].toUpperCase || (e[i][0].changed = !0));
					else this._one && this._isTextCmd(this._one.callee) && (this._one[4] = t, this._one[0].toUpperCase || (this._one[0].changed = !0))
				}, e.loadImage = function(t, e, i, n, s, r)
				{
					function a(t)
					{
						t && (o.drawTexture(t, e, i, n, s), null != r && r.call(o._sp, t))
					}
					var o = this;
					void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === s && (s = 0);
					var h = Loader.getRes(t);
					h ? a(h) : Laya.loader.load(t, Handler.create(null, a), null, "image")
				}, e._renderEmpty = function(t, e, i, n) {}, e._renderAll = function(t, e, i, n)
				{
					for (var s, r = this._cmds, a = 0, o = r.length; o > a; a++)(s = r[a]).callee.call(e, i, n, s)
				}, e._renderOne = function(t, e, i, n)
				{
					this._one.callee.call(e, i, n, this._one)
				}, e._renderOneImg = function(t, e, i, n)
				{
					this._one.callee.call(e, i, n, this._one), 2305 !== t._renderType && (t._renderType |= 1)
				}, e.drawLine = function(t, e, i, n, s, r)
				{
					void 0 === r && (r = 1);
					var a = 0;
					Render.isWebGL && (a = VectorGraphManager.getInstance().getId(), null == this._vectorgraphArray && (this._vectorgraphArray = []), this._vectorgraphArray.push(a));
					var o = [t + .5, e + .5, i + .5, n + .5, s, r, a];
					this._saveToCmd(Render._context._drawLine, o)
				}, e.drawLines = function(t, e, i, n, s)
				{
					void 0 === s && (s = 1);
					var r = 0;
					Render.isWebGL && (r = VectorGraphManager.getInstance().getId(), null == this._vectorgraphArray && (this._vectorgraphArray = []), this._vectorgraphArray.push(r));
					var a = [t + .5, e + .5, i, n, s, r];
					this._saveToCmd(Render._context._drawLines, a)
				}, e.drawCurves = function(t, e, i, n, s)
				{
					void 0 === s && (s = 1);
					var r = [t + .5, e + .5, i, n, s];
					this._saveToCmd(Render._context._drawCurves, r)
				}, e.drawRect = function(t, e, i, n, s, r, a)
				{
					void 0 === a && (a = 1);
					var o = r ? .5 : 0,
						h = [t + o, e + o, i, n, s, r, a];
					this._saveToCmd(Render._context._drawRect, h)
				}, e.drawCircle = function(t, e, i, n, s, r)
				{
					void 0 === r && (r = 1);
					var a = s ? .5 : 0,
						o = 0;
					Render.isWebGL && (o = VectorGraphManager.getInstance().getId(), null == this._vectorgraphArray && (this._vectorgraphArray = []), this._vectorgraphArray.push(o));
					var h = [t + a, e + a, i, n, s, r, o];
					this._saveToCmd(Render._context._drawCircle, h)
				}, e.drawPie = function(t, e, i, n, s, r, a, o)
				{
					void 0 === o && (o = 1);
					var h = a ? .5 : 0,
						l = 0;
					Render.isWebGL && (l = VectorGraphManager.getInstance().getId(), null == this._vectorgraphArray && (this._vectorgraphArray = []), this._vectorgraphArray.push(l));
					var u = [t + h, e + h, i, n, s, r, a, o, l];
					u[3] = Utils.toRadian(n), u[4] = Utils.toRadian(s), this._saveToCmd(Render._context._drawPie, u)
				}, e._getPiePoints = function(e, i, n, s, r)
				{
					var a = t._tempPoints;
					t._tempPoints.length = 0, a.push(e, i);
					var o = Math.PI / 10,
						h = NaN;
					for (h = s; r > h; h += o) a.push(e + n * Math.cos(h), i + n * Math.sin(h));
					return r != h && a.push(e + n * Math.cos(r), i + n * Math.sin(r)), a
				}, e.drawPoly = function(t, e, i, n, s, r)
				{
					void 0 === r && (r = 1);
					var a = s ? .5 : 0,
						o = 0;
					if (Render.isWebGL)
					{
						o = VectorGraphManager.getInstance().getId(), null == this._vectorgraphArray && (this._vectorgraphArray = []), this._vectorgraphArray.push(o);
						var h = !1;
						h = !(i.length > 6)
					}
					var l = [t + a, e + a, i, n, s, r, o, h];
					this._saveToCmd(Render._context._drawPoly, l)
				}, e._getPathPoints = function(e)
				{
					var i = 0,
						n = 0,
						s = t._tempPoints;
					s.length = 0, n = e.length;
					var r;
					for (i = 0; n > i; i++) r = e[i], r.length > 1 && (s.push(r[1], r[2]), r.length > 3 && s.push(r[3], r[4]));
					return s
				}, e.drawPath = function(t, e, i, n, s)
				{
					var r = [t + .5, e + .5, i, n, s];
					this._saveToCmd(Render._context._drawPath, r)
				}, __getset(0, e, "cmds", function()
				{
					return this._cmds
				}, function(t)
				{
					this._sp && (this._sp._renderType |= 256), this._cmds = t, this._render = this._renderAll, this._repaint()
				}), t.__init__ = function()
				{
					if (Render.isConchNode)
					{
						for (var t = laya.display.Graphics.prototype, e = ConchGraphics.prototype, i = ["clear", "destroy", "alpha", "rotate", "transform", "scale", "translate", "save", "restore", "clipRect", "blendMode", "fillText", "fillBorderText", "_fands", "drawRect", "drawCircle", "drawPie", "drawPoly", "drawPath", "drawImageM", "drawLine", "drawLines", "_drawPs", "drawCurves", "replaceText", "replaceTextColor", "_fillImage", "fillTexture"], n = 0, s = i.length; s >= n; n++)
						{
							var r = i[n];
							t[r] = e[r]
						}
						t._saveToCmd = null, t.drawTexture = function(t, e, i, n, s, r)
						{
							if (void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === s && (s = 0), t && t.loaded && t.bitmap && t.source && (n || (n = t.sourceWidth), s || (s = t.sourceHeight), n = n - t.sourceWidth + t.width, s = s - t.sourceHeight + t.height, !(0 >= n || 0 >= s)))
							{
								e += t.offsetX, i += t.offsetY;
								var a = t.uv,
									o = t.bitmap.width,
									h = t.bitmap.height;
								this.drawImageM(t.bitmap.source, a[0] * o, a[1] * h, (a[2] - a[0]) * o, (a[5] - a[3]) * h, e, i, n, s, r)
							}
						}, t.fillTexture = function(t, e, i, n, s, r, a)
						{
							if (void 0 === n && (n = 0), void 0 === s && (s = 0), void 0 === r && (r = "repeat"), t && t.loaded)
							{
								var o, h = Render._context.ctx,
									l = t.bitmap.width,
									u = t.bitmap.height,
									c = t.uv;
								o = t.uv != Texture.DEF_UV ? h.createPattern(t.bitmap.source, r, c[0] * l, c[1] * u, (c[2] - c[0]) * l, (c[5] - c[3]) * u) : h.createPattern(t.bitmap.source, r);
								var _ = 0,
									d = 0;
								a && (e += a.x % t.width, i += a.y % t.height, _ -= a.x % t.width, d -= a.y % t.height), this._fillImage(o, e, i, _, d, n, s)
							}
						}
					}
				}, t._addPointArrToRst = function(e, i, n, s, r)
				{
					void 0 === s && (s = 0), void 0 === r && (r = 0);
					var a = 0,
						o = 0;
					for (o = i.length, a = 0; o > a; a += 2) t._addPointToRst(e, i[a] + s, i[a + 1] + r, n)
				}, t._addPointToRst = function(t, e, i, n)
				{
					var s = Point.TEMP;
					s.setTo(e ? e : 0, i ? i : 0), n.transformPoint(s), t.push(s.x, s.y)
				}, t._tempPoints = [], t._tempMatrixArrays = [], t._tempCmds = [], __static(t, ["_tempMatrix", function()
				{
					return this._tempMatrix = new Matrix
				}, "_initMatrix", function()
				{
					return this._initMatrix = new Matrix
				}]), t
			}(),
			Event = function()
			{
				function t()
				{}
				__class(t, "laya.events.Event");
				var e = t.prototype;
				return e.setTo = function(t, e, i)
					{
						return this.type = t, this.currentTarget = e, this.target = i, this
					}, e.stopPropagation = function()
					{
						this._stoped = !0
					}, __getset(0, e, "shiftKey", function()
					{
						return this.nativeEvent.shiftKey
					}), __getset(0, e, "touches", function()
					{
						var t = this.nativeEvent.touches;
						if (t)
							for (var e = 0, i = t.length; i > e; e++)
							{
								var n = t[e],
									s = Point.TEMP;
								s.setTo(n.clientX, n.clientY), Laya.stage._canvasTransform.invertTransformPoint(s), n.stageX = s.x, n.stageY = s.y
							}
						return t
					}), __getset(0, e, "altKey", function()
					{
						return this.nativeEvent.altKey
					}), __getset(0, e, "stageX", function()
					{
						return Laya.stage.mouseX
					}), __getset(0, e, "stageY", function()
					{
						return Laya.stage.mouseY
					}), __getset(0, e, "ctrlKey", function()
					{
						return this.nativeEvent.ctrlKey
					}), __getset(0, e, "keyLocation", function()
					{
						return this.nativeEvent.keyLocation
					}), __getset(0, e, "charCode", function()
					{
						return this.nativeEvent.charCode
					}), t.EMPTY = new t, t.MOUSE_DOWN = "mousedown", t.MOUSE_UP = "mouseup", t.CLICK = "click", t.RIGHT_MOUSE_DOWN = "rightmousedown", t.RIGHT_MOUSE_UP = "rightmouseup", t.RIGHT_CLICK = "rightclick", t.MOUSE_MOVE = "mousemove", t.MOUSE_OVER = "mouseover", t.MOUSE_OUT = "mouseout", t.MOUSE_WHEEL = "mousewheel", t.ROLL_OVER = "mouseover", t.ROLL_OUT = "mouseout", t.DOUBLE_CLICK = "doubleclick", t.CHANGE = "change", t.CHANGED = "changed", t.RESIZE = "resize", t.ADDED = "added", t.REMOVED = "removed", t.DISPLAY = "display", t.UNDISPLAY = "undisplay", t.ERROR = "error", t.COMPLETE = "complete", t.LOADED = "loaded", t.PROGRESS = "progress", t.INPUT = "input",
					t.RENDER = "render", t.OPEN = "open", t.MESSAGE = "message", t.CLOSE = "close", t.KEY_DOWN = "keydown", t.KEY_PRESS = "keypress", t.KEY_UP = "keyup", t.FRAME = "enterframe", t.DRAG_START = "dragstart", t.DRAG_MOVE = "dragmove", t.DRAG_END = "dragend", t.ENTER = "enter", t.SELECT = "select", t.BLUR = "blur", t.FOCUS = "focus", t.PLAYED = "played", t.PAUSED = "paused", t.STOPPED = "stopped", t.START = "start", t.END = "end", t.ENABLED_CHANGED = "enabledchanged", t.COMPONENT_ADDED = "componentadded", t.COMPONENT_REMOVED = "componentremoved", t.ACTIVE_CHANGED = "activechanged", t.LAYER_CHANGED = "layerchanged", t.HIERARCHY_LOADED = "hierarchyloaded", t.RECOVERING = "recovering", t.RECOVERED = "recovered", t.RELEASED = "released", t.LINK = "link", t.LABEL = "label", t.FULL_SCREEN_CHANGE = "fullscreenchange", t.DEVICE_LOST = "devicelost", t.MESH_CHANGED = "meshchanged", t.MATERIAL_CHANGED = "materialchanged", t.RENDERQUEUE_CHANGED = "renderqueuechanged", t.WORLDMATRIX_NEEDCHANGE = "worldmatrixneedchanged", t.ANIMATION_CHANGED = "actionchanged", t.INSTAGE_CHANGED = "instagechanged", t.CACHEFRAMEINDEX_CHANGED = "cacheframeindexchanged", t
			}(),
			Keyboard = function()
			{
				function t()
				{}
				return __class(t, "laya.events.Keyboard"), t.NUMBER_0 = 48, t.NUMBER_1 = 49, t.NUMBER_2 = 50, t.NUMBER_3 = 51, t.NUMBER_4 = 52, t.NUMBER_5 = 53, t.NUMBER_6 = 54, t.NUMBER_7 = 55, t.NUMBER_8 = 56, t.NUMBER_9 = 57, t.A = 65, t.B = 66, t.C = 67, t.D = 68, t.E = 69, t.F = 70, t.G = 71, t.H = 72, t.I = 73, t.J = 74, t.K = 75, t.L = 76, t.M = 77, t.N = 78, t.O = 79, t.P = 80, t.Q = 81, t.R = 82, t.S = 83, t.T = 84, t.U = 85, t.V = 86, t.W = 87, t.X = 88, t.Y = 89, t.Z = 90, t.F1 = 112, t.F2 = 113, t.F3 = 114, t.F4 = 115, t.F5 = 116, t.F6 = 117, t.F7 = 118, t.F8 = 119, t.F9 = 120, t.F10 = 121, t.F11 = 122, t.F12 = 123, t.F13 = 124, t.F14 = 125, t.F15 = 126, t.NUMPAD = 21, t.NUMPAD_0 = 96, t.NUMPAD_1 = 97, t.NUMPAD_2 = 98, t.NUMPAD_3 = 99, t.NUMPAD_4 = 100, t.NUMPAD_5 = 101, t.NUMPAD_6 = 102, t.NUMPAD_7 = 103, t.NUMPAD_8 = 104, t.NUMPAD_9 = 105, t.NUMPAD_ADD = 107, t.NUMPAD_DECIMAL = 110, t.NUMPAD_DIVIDE = 111, t.NUMPAD_ENTER = 108, t.NUMPAD_MULTIPLY = 106, t.NUMPAD_SUBTRACT = 109, t.SEMICOLON = 186, t.EQUAL = 187, t.COMMA = 188, t.MINUS = 189, t.PERIOD = 190, t.SLASH = 191, t.BACKQUOTE = 192, t.LEFTBRACKET = 219, t.BACKSLASH = 220, t.RIGHTBRACKET = 221, t.QUOTE = 222, t.ALTERNATE = 18, t.BACKSPACE = 8, t.CAPS_LOCK = 20, t.COMMAND = 15, t.CONTROL = 17, t.DELETE = 46, t.ENTER = 13, t.ESCAPE = 27, t.PAGE_UP = 33, t.PAGE_DOWN = 34, t.END = 35, t.HOME = 36, t.LEFT = 37, t.UP = 38, t.RIGHT = 39, t.DOWN = 40, t.SHIFT = 16, t.SPACE = 32, t.TAB = 9, t.INSERT = 45, t
			}(),
			KeyBoardManager = function()
			{
				function t()
				{}
				return __class(t, "laya.events.KeyBoardManager"), t.__init__ = function()
				{
					t._addEvent("keydown"), t._addEvent("keypress"), t._addEvent("keyup")
				}, t._addEvent = function(t)
				{
					Browser.document.addEventListener(t, function(e)
					{
						laya.events.KeyBoardManager._dispatch(e, t)
					}, !0)
				}, t._dispatch = function(e, i)
				{
					if (t.enabled)
					{
						t._event._stoped = !1, t._event.nativeEvent = e, t._event.keyCode = e.keyCode || e.which || e.charCode, "keydown" === i ? t._pressKeys[t._event.keyCode] = !0 : "keyup" === i && (t._pressKeys[t._event.keyCode] = null);
						for (var n = Laya.stage.focus && null != Laya.stage.focus.event ? Laya.stage.focus : Laya.stage, s = n; s;) s.event(i, t._event.setTo(i, s, n)), s = s.parent
					}
				}, t.hasKeyDown = function(e)
				{
					return t._pressKeys[e]
				}, t._pressKeys = {}, t.enabled = !0, __static(t, ["_event", function()
				{
					return this._event = new Event
				}]), t
			}(),
			KeyLocation = function()
			{
				function t()
				{}
				return __class(t, "laya.events.KeyLocation"), t.STANDARD = 0, t.LEFT = 1, t.RIGHT = 2, t.NUM_PAD = 3, t
			}(),
			MouseManager = function()
			{
				function t()
				{
					this.mouseX = 0, this.mouseY = 0, this.disableMouseEvent = !1, this.mouseDownTime = 0, this._stage = null, this._target = null, this._lastOvers = [], this._currOvers = [], this._lastClickTimer = 0, this._lastMoveTimer = 0, this._isDoubleClick = !1, this._isLeftMouse = !1, this._eventList = [], this._event = new Event, this._matrix = new Matrix, this._point = new Point, this._rect = new Rectangle
				}
				__class(t, "laya.events.MouseManager");
				var e = t.prototype;
				return e.__init__ = function(e, i)
				{
					var n = this;
					this._stage = e;
					var s = this,
						r = this._eventList;
					i.oncontextmenu = function(e)
					{
						return t.enabled ? !1 : void 0
					}, i.addEventListener("mousedown", function(e)
					{
						t.enabled && (e.preventDefault(), r.push(e), s.mouseDownTime = Browser.now())
					}), i.addEventListener("mouseup", function(e)
					{
						t.enabled && (e.preventDefault(), r.push(e), s.mouseDownTime = -Browser.now())
					}, !0), i.addEventListener("mousemove", function(e)
					{
						if (t.enabled)
						{
							e.preventDefault();
							var i = Browser.now();
							if (i - s._lastMoveTimer < 10) return;
							s._lastMoveTimer = i, r.push(e)
						}
					}, !0), i.addEventListener("mouseout", function(e)
					{
						t.enabled && r.push(e)
					}), i.addEventListener("mouseover", function(e)
					{
						t.enabled && r.push(e)
					}), i.addEventListener("touchstart", function(e)
					{
						t.enabled && (r.push(e), n.runEvent(), Input.isInputting || e.preventDefault(), s.mouseDownTime = Browser.now())
					}), i.addEventListener("touchend", function(e)
					{
						t.enabled && (Input.isInputting || e.preventDefault(), r.push(e), s.mouseDownTime = -Browser.now())
					}, !0), i.addEventListener("touchmove", function(e)
					{
						t.enabled && (e.preventDefault(), r.push(e))
					}, !0), i.addEventListener("mousewheel", function(e)
					{
						t.enabled && r.push(e)
					}), i.addEventListener("DOMMouseScroll", function(e)
					{
						t.enabled && r.push(e)
					})
				}, e.initEvent = function(t, e)
				{
					var i = this;
					i._event._stoped = !1, i._event.nativeEvent = e || t, i._target = null, this._point.setTo(t.clientX, t.clientY), this._stage._canvasTransform.invertTransformPoint(this._point), i.mouseX = this._point.x, i.mouseY = this._point.y, i._event.touchId = t.identifier
				}, e.checkMouseWheel = function(t)
				{
					this._event.delta = t.wheelDelta ? .025 * t.wheelDelta : -t.detail;
					for (var e = 0, i = this._lastOvers.length; i > e; e++)
					{
						var n = this._lastOvers[e];
						n.event("mousewheel", this._event.setTo("mousewheel", n, this._target))
					}
					this._stage.event("mousewheel", this._event.setTo("mousewheel", this._stage, this._target))
				}, e.checkMouseOut = function()
				{
					if (!this.disableMouseEvent)
					{
						for (var t = 0, e = this._lastOvers.length; e > t; t++)
						{
							var i = this._lastOvers[t];
							!i.destroyed && this._currOvers.indexOf(i) < 0 && (i._set$P("$_MOUSEOVER", !1), i.event("mouseout", this._event.setTo("mouseout", i, this._target)))
						}
						var n = this._lastOvers;
						this._lastOvers = this._currOvers, this._currOvers = n, this._currOvers.length = 0
					}
				}, e.onMouseMove = function(t)
				{
					this.sendMouseMove(t), this._event._stoped = !1, this.sendMouseOver(this._target)
				}, e.sendMouseMove = function(t)
				{
					t.event("mousemove", this._event.setTo("mousemove", t, this._target)), !this._event._stoped && t.parent && this.sendMouseMove(t.parent)
				}, e.sendMouseOver = function(t)
				{
					t.parent && (t._get$P("$_MOUSEOVER") || (t._set$P("$_MOUSEOVER", !0), t.event("mouseover", this._event.setTo("mouseover", t, this._target))), this._currOvers.push(t)), !this._event._stoped && t.parent && this.sendMouseOver(t.parent)
				}, e.onMouseDown = function(t)
				{
					this._isLeftMouse ? (t._set$P("$_MOUSEDOWN", !0), t.event("mousedown", this._event.setTo("mousedown", t, this._target))) : (t._set$P("$_RIGHTMOUSEDOWN", !0), t.event("rightmousedown", this._event.setTo("rightmousedown", t, this._target))), !this._event._stoped && t.parent && this.onMouseDown(t.parent)
				}, e.onMouseUp = function(t)
				{
					var e = this._isLeftMouse ? "mouseup" : "rightmouseup";
					this.sendMouseUp(t, e), this._event._stoped = !1, this.sendClick(this._target, e)
				}, e.sendMouseUp = function(t, e)
				{
					t.event(e, this._event.setTo(e, t, this._target)), !this._event._stoped && t.parent && this.sendMouseUp(t.parent, e)
				}, e.sendClick = function(t, e)
				{
					t.destroyed || ("mouseup" === e && t._get$P("$_MOUSEDOWN") ? (t._set$P("$_MOUSEDOWN", !1), t.event("click", this._event.setTo("click", t, this._target)), this._isDoubleClick && t.event("doubleclick", this._event.setTo("doubleclick", t, this._target))) : "rightmouseup" === e && t._get$P("$_RIGHTMOUSEDOWN") && (t._set$P("$_RIGHTMOUSEDOWN", !1), t.event("rightclick", this._event.setTo("rightclick", t, this._target))), !this._event._stoped && t.parent && this.sendClick(t.parent, e))
				}, e.check = function(t, e, i, n)
				{
					var s = t.transform || this._matrix,
						r = t.pivotX,
						a = t.pivotY;
					if (0 === r && 0 === a) s.setTranslate(t.x, t.y);
					else if (s === this._matrix) s.setTranslate(t.x - r, t.y - a);
					else
					{
						var o = s.cos,
							h = s.sin;
						s.setTranslate(t.x - (r * o - a * h) * t.scaleX, t.y - (r * h + a * o) * t.scaleY)
					}
					s.invertTransformPoint(this._point.setTo(e, i)), s.setTranslate(0, 0), e = this._point.x, i = this._point.y;
					var l = t.scrollRect;
					if (l)
					{
						this._rect.setTo(0, 0, l.width, l.height);
						var u = this._rect.contains(e, i);
						if (!u) return !1
					}
					if (!this.disableMouseEvent)
					{
						var c = !1;
						if (t.hitTestPrior && !t.mouseThrough && !this.hitTest(t, e, i)) return !1;
						for (var _ = t._childs.length - 1; _ > -1; _--)
						{
							var d = t._childs[_];
							if (!d.destroyed && d.mouseEnabled && d.visible && (c = this.check(d, e + (l ? l.x : 0), i + (l ? l.y : 0), n))) return !0
						}
					}
					return u = this.hitTest(t, e, i), u ? (this._target = t, n.call(this, t)) : n === this.onMouseUp && t === this._stage && (this._target = this._stage, n.call(this, this._target)), u
				}, e.hitTest = function(t, e, i)
				{
					var n = !1;
					if (t.hitArea instanceof laya.utils.HitArea) return t.hitArea.isHit(e, i);
					if (t.width > 0 && t.height > 0 || t.mouseThrough || t.hitArea)
					{
						var s = this._rect;
						t.mouseThrough ? n = t.getGraphicBounds().contains(e, i) : (t.hitArea ? s = t.hitArea : s.setTo(0, 0, t.width, t.height), n = s.contains(e, i))
					}
					return n
				}, e.runEvent = function()
				{
					var e = this._eventList.length;
					if (e)
					{
						for (var i = this, n = 0; e > n;)
						{
							var s = this._eventList[n];
							switch (s.type)
							{
								case "mousedown":
									t._isTouchRespond ? t._isTouchRespond = !1 : (i._isLeftMouse = 0 === s.button, i.initEvent(s), i.check(i._stage, i.mouseX, i.mouseY, i.onMouseDown));
									break;
								case "mouseup":
									i._isLeftMouse = 0 === s.button;
									var r = Browser.now();
									i._isDoubleClick = r - i._lastClickTimer < 300, i._lastClickTimer = r, i.initEvent(s), i.check(i._stage, i.mouseX, i.mouseY, i.onMouseUp);
									break;
								case "mousemove":
									i.initEvent(s), i.check(i._stage, i.mouseX, i.mouseY, i.onMouseMove), i.checkMouseOut();
									break;
								case "touchstart":
									t._isTouchRespond = !0, i._isLeftMouse = !0;
									for (var a = s.changedTouches, o = 0, h = a.length; h > o; o++) i.initEvent(a[o], s), i.check(i._stage, i.mouseX, i.mouseY, i.onMouseDown);
									break;
								case "touchend":
									t._isTouchRespond = !0, i._isLeftMouse = !0, r = Browser.now(), i._isDoubleClick = r - i._lastClickTimer < 300, i._lastClickTimer = r;
									var l = s.changedTouches;
									for (o = 0, h = l.length; h > o; o++) i.initEvent(l[o], s), i.check(i._stage, i.mouseX, i.mouseY, i.onMouseUp);
									break;
								case "touchmove":
									var u = s.changedTouches;
									for (o = 0, h = u.length; h > o; o++) i.initEvent(u[o], s), i.check(i._stage, i.mouseX, i.mouseY, i.onMouseMove);
									i.checkMouseOut();
									break;
								case "wheel":
								case "mousewheel":
								case "DOMMouseScroll":
									i.checkMouseWheel(s);
									break;
								case "mouseout":
									i._stage.event("mouseout", i._event.setTo("mouseout", i._stage, i._stage));
									break;
								case "mouseover":
									i._stage.event("mouseover", i._event.setTo("mouseover", i._stage, i._stage))
							}
							n++
						}
						this._eventList.length = 0
					}
				}, t.enabled = !0, t._isTouchRespond = !1, __static(t, ["instance", function()
				{
					return this.instance = new t
				}]), t
			}(),
			Filter = function()
			{
				function t()
				{
					this._action = null
				}
				__class(t, "laya.filters.Filter");
				var e = t.prototype;
				return Laya.imps(e,
				{
					"laya.filters.IFilter": !0
				}), e.callNative = function(t) {}, __getset(0, e, "type", function()
				{
					return -1
				}), __getset(0, e, "action", function()
				{
					return this._action
				}), t.BLUR = 16, t.COLOR = 32, t.GLOW = 8, t._filterStart = null, t._filterEnd = null, t._EndTarget = null, t._recycleScope = null, t._filter = null, t._useSrc = null, t._endSrc = null, t._useOut = null, t._endOut = null, t
			}(),
			ColorFilterAction = function()
			{
				function t()
				{
					this.data = null
				}
				__class(t, "laya.filters.ColorFilterAction");
				var e = t.prototype;
				return Laya.imps(e,
				{
					"laya.filters.IFilterAction": !0
				}), e.apply = function(t)
				{
					var e = t.ctx.ctx,
						i = t.ctx.ctx.canvas;
					if (0 == i.width || 0 == i.height) return i;
					for (var n, s = e.getImageData(0, 0, i.width, i.height), r = s.data, a = 0, o = r.length; o > a; a += 4) n = this.getColor(r[a], r[a + 1], r[a + 2], r[a + 3]), 0 != r[a + 3] && (r[a] = n[0], r[a + 1] = n[1], r[a + 2] = n[2], r[a + 3] = n[3]);
					return e.putImageData(s, 0, 0), t
				}, e.getColor = function(t, e, i, n)
				{
					var s = [];
					if (this.data._mat && this.data._alpha)
					{
						var r = this.data._mat,
							a = this.data._alpha;
						s[0] = r[0] * t + r[1] * e + r[2] * i + r[3] * n + a[0], s[1] = r[4] * t + r[5] * e + r[6] * i + r[7] * n + a[1], s[2] = r[8] * t + r[9] * e + r[10] * i + r[11] * n + a[2], s[3] = r[12] * t + r[13] * e + r[14] * i + r[15] * n + a[3]
					}
					return s
				}, t
			}(),
			Arith = function()
			{
				function t()
				{}
				return __class(t, "laya.maths.Arith"), t.formatR = function(t)
				{
					return t > Math.PI && (t -= 2 * Math.PI), t < -Math.PI && (t += 2 * Math.PI), t
				}, t.isPOT = function(t, e)
				{
					return t > 0 && 0 === (t & t - 1) && e > 0 && 0 === (e & e - 1)
				}, t.setMatToArray = function(t, e)
				{
					t.a, t.b, t.c, t.d, t.tx + 20, t.ty + 20, 1, e[0] = t.a, e[1] = t.b, e[4] = t.c, e[5] = t.d, e[12] = t.tx, e[13] = t.ty
				}, t
			}(),
			Bezier = function()
			{
				function t()
				{
					this._controlPoints = [new Point, new Point, new Point], this._calFun = this.getPoint2
				}
				__class(t, "laya.maths.Bezier");
				var e = t.prototype;
				return e._switchPoint = function(t, e)
				{
					var i = this._controlPoints.shift();
					i.setTo(t, e), this._controlPoints.push(i)
				}, e.getPoint2 = function(t, e)
				{
					var i = this._controlPoints[0],
						n = this._controlPoints[1],
						s = this._controlPoints[2],
						r = Math.pow(1 - t, 2) * i.x + 2 * t * (1 - t) * n.x + Math.pow(t, 2) * s.x,
						a = Math.pow(1 - t, 2) * i.y + 2 * t * (1 - t) * n.y + Math.pow(t, 2) * s.y;
					e.push(r, a)
				}, e.getPoint3 = function(t, e)
				{
					var i = this._controlPoints[0],
						n = this._controlPoints[1],
						s = this._controlPoints[2],
						r = this._controlPoints[3],
						a = Math.pow(1 - t, 3) * i.x + 3 * n.x * t * (1 - t) * (1 - t) + 3 * s.x * t * t * (1 - t) + r.x * Math.pow(t, 3),
						o = Math.pow(1 - t, 3) * i.y + 3 * n.y * t * (1 - t) * (1 - t) + 3 * s.y * t * t * (1 - t) + r.y * Math.pow(t, 3);
					e.push(a, o)
				}, e.insertPoints = function(t, e)
				{
					var i = NaN;
					t = t > 0 ? t : 5;
					var n = NaN;
					for (n = 1 / t, i = 0; 1 >= i; i += n) this._calFun(i, e)
				}, e.getBezierPoints = function(t, e, i)
				{
					void 0 === e && (e = 5), void 0 === i && (i = 2);
					var n = 0,
						s = 0;
					if (s = t.length, 2 * (i + 1) > s) return [];
					var r;
					switch (r = [], i)
					{
						case 2:
							this._calFun = this.getPoint2;
							break;
						case 3:
							this._calFun = this.getPoint3;
							break;
						default:
							return []
					}
					for (n = 0; 2 * i > n; n += 2) this._switchPoint(t[n], t[n + 1]);
					for (n = 2 * i; s > n; n += 2) this._switchPoint(t[n], t[n + 1]), n / 2 % i == 0 && this.insertPoints(e, r);
					return r
				}, __static(t, ["I", function()
				{
					return this.I = new t
				}]), t
			}(),
			GrahamScan = function()
			{
				function t()
				{}
				return __class(t, "laya.maths.GrahamScan"), t.multiply = function(t, e, i)
				{
					return (t.x - i.x) * (e.y - i.y) - (e.x - i.x) * (t.y - i.y)
				}, t.dis = function(t, e)
				{
					return (t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y)
				}, t._getPoints = function(e, i, n)
				{
					for (void 0 === i && (i = !1), t._mPointList || (t._mPointList = []); t._mPointList.length < e;) t._mPointList.push(new Point);
					return n || (n = []), n.length = 0, i ? t.getFrom(n, t._mPointList, e) : t.getFromR(n, t._mPointList, e), n
				}, t.getFrom = function(t, e, i)
				{
					var n = 0;
					for (n = 0; i > n; n++) t.push(e[n]);
					return t
				}, t.getFromR = function(t, e, i)
				{
					var n = 0;
					for (n = 0; i > n; n++) t.push(e.pop());
					return t
				}, t.pListToPointList = function(e, i)
				{
					void 0 === i && (i = !1);
					var n = 0,
						s = e.length / 2,
						r = t._getPoints(s, i, t._tempPointList);
					for (n = 0; s > n; n++) r[n].setTo(e[n + n], e[n + n + 1]);
					return r
				}, t.pointListToPlist = function(e)
				{
					var i, n = 0,
						s = e.length,
						r = t._temPList;
					for (r.length = 0, n = 0; s > n; n++) i = e[n], r.push(i.x, i.y);
					return r
				}, t.scanPList = function(e)
				{
					return Utils.copyArray(e, t.pointListToPlist(t.scan(t.pListToPointList(e, !0))))
				}, t.scan = function(e)
				{
					var i, n, s, r = 0,
						a = 0,
						o = 0,
						h = e.length,
						l = {};
					for (n = t._temArr, n.length = 0, h = e.length, r = h - 1; r >= 0; r--) i = e[r], s = i.x + "_" + i.y, l.hasOwnProperty(s) || (l[s] = !0, n.push(i));
					for (h = n.length, Utils.copyArray(e, n), r = 1; h > r; r++)(e[r].y < e[o].y || e[r].y == e[o].y && e[r].x < e[o].x) && (o = r);
					for (i = e[0], e[0] = e[o], e[o] = i, r = 1; h - 1 > r; r++)
					{
						for (o = r, a = r + 1; h > a; a++)(t.multiply(e[a], e[o], e[0]) > 0 || 0 == t.multiply(e[a], e[o], e[0]) && t.dis(e[0], e[a]) < t.dis(e[0], e[o])) && (o = a);
						i = e[r], e[r] = e[o], e[o] = i
					}
					if (n = t._temArr, n.length = 0, e.length < 3) return Utils.copyArray(n, e);
					for (n.push(e[0], e[1], e[2]), r = 3; h > r; r++)
					{
						for (; n.length >= 2 && t.multiply(e[r], n[n.length - 1], n[n.length - 2]) >= 0;) n.pop();
						e[r] && n.push(e[r])
					}
					return n
				}, t._mPointList = null, t._tempPointList = [], t._temPList = [], t._temArr = [], t
			}(),
			MathUtil = function()
			{
				function t()
				{}
				return __class(t, "laya.maths.MathUtil"), t.subtractVector3 = function(t, e, i)
				{
					i[0] = t[0] - e[0], i[1] = t[1] - e[1], i[2] = t[2] - e[2]
				}, t.lerp = function(t, e, i)
				{
					return t * (1 - i) + e * i
				}, t.scaleVector3 = function(t, e, i)
				{
					i[0] = t[0] * e, i[1] = t[1] * e, i[2] = t[2] * e
				}, t.lerpVector3 = function(t, e, i, n)
				{
					var s = t[0],
						r = t[1],
						a = t[2];
					n[0] = s + i * (e[0] - s), n[1] = r + i * (e[1] - r), n[2] = a + i * (e[2] - a)
				}, t.lerpVector4 = function(t, e, i, n)
				{
					var s = t[0],
						r = t[1],
						a = t[2],
						o = t[3];
					n[0] = s + i * (e[0] - s), n[1] = r + i * (e[1] - r), n[2] = a + i * (e[2] - a), n[3] = o + i * (e[3] - o)
				}, t.slerpQuaternionArray = function(t, e, i, n, s, r, a)
				{
					var o, h, l, u, c, _ = t[e + 0],
						d = t[e + 1],
						f = t[e + 2],
						p = t[e + 3],
						g = i[n + 0],
						m = i[n + 1],
						v = i[n + 2],
						y = i[n + 3];
					return h = _ * g + d * m + f * v + p * y, 0 > h && (h = -h, g = -g, m = -m, v = -v, y = -y), 1 - h > 1e-6 ? (o = Math.acos(h), l = Math.sin(o), u = Math.sin((1 - s) * o) / l, c = Math.sin(s * o) / l) : (u = 1 - s, c = s), r[a + 0] = u * _ + c * g, r[a + 1] = u * d + c * m, r[a + 2] = u * f + c * v, r[a + 3] = u * p + c * y, r
				}, t.getRotation = function(t, e, i, n)
				{
					return Math.atan2(n - e, i - t) / Math.PI * 180
				}, t.sortBigFirst = function(t, e)
				{
					return t == e ? 0 : e > t ? 1 : -1
				}, t.sortSmallFirst = function(t, e)
				{
					return t == e ? 0 : e > t ? -1 : 1
				}, t.sortNumBigFirst = function(t, e)
				{
					return parseFloat(e) - parseFloat(t)
				}, t.sortNumSmallFirst = function(t, e)
				{
					return parseFloat(t) - parseFloat(e)
				}, t.sortByKey = function(e, i, n)
				{
					void 0 === i && (i = !1), void 0 === n && (n = !0);
					var s;
					return s = i ? n ? t.sortNumBigFirst : t.sortBigFirst : n ? t.sortNumSmallFirst : t.sortSmallFirst,
						function(t, i)
						{
							return s(t[e], i[e])
						}
				}, t
			}(),
			Matrix = function()
			{
				function t(t, e, i, n, s, r)
				{
					this.cos = 1, this.sin = 0, this.inPool = !1, this.bTransform = !1, void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 1), void 0 === s && (s = 0), void 0 === r && (r = 0), this.a = t, this.b = e, this.c = i, this.d = n, this.tx = s, this.ty = r, this._checkTransform()
				}
				__class(t, "laya.maths.Matrix");
				var e = t.prototype;
				return e.identity = function()
				{
					return this.a = this.d = 1, this.b = this.tx = this.ty = this.c = 0, this.bTransform = !1, this
				}, e._checkTransform = function()
				{
					return this.bTransform = 1 !== this.a || 0 !== this.b || 0 !== this.c || 1 !== this.d
				}, e.setTranslate = function(t, e)
				{
					return this.tx = t, this.ty = e, this
				}, e.translate = function(t, e)
				{
					return this.tx += t, this.ty += e, this
				}, e.scale = function(t, e)
				{
					this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this.bTransform = !0
				}, e.rotate = function(t)
				{
					var e = this.cos = Math.cos(t),
						i = this.sin = Math.sin(t),
						n = this.a,
						s = this.c,
						r = this.tx;
					this.a = n * e - this.b * i, this.b = n * i + this.b * e, this.c = s * e - this.d * i, this.d = s * i + this.d * e, this.tx = r * e - this.ty * i, this.ty = r * i + this.ty * e, this.bTransform = !0
				}, e.skew = function(t, e)
				{
					var i = Math.tan(t),
						n = Math.tan(e),
						s = this.a,
						r = this.b;
					return this.a += n * this.c, this.b += n * this.d, this.c += i * s, this.d += i * r, this
				}, e.invertTransformPoint = function(t)
				{
					var e = this.a,
						i = this.b,
						n = this.c,
						s = this.d,
						r = this.tx,
						a = e * s - i * n,
						o = s / a,
						h = -i / a,
						l = -n / a,
						u = e / a,
						c = (n * this.ty - s * r) / a,
						_ = -(e * this.ty - i * r) / a;
					return t.setTo(o * t.x + l * t.y + c, h * t.x + u * t.y + _)
				}, e.transformPoint = function(t)
				{
					return t.setTo(this.a * t.x + this.c * t.y + this.tx, this.b * t.x + this.d * t.y + this.ty)
				}, e.transformPointArray = function(t, e)
				{
					for (var i = t.length, n = 0; i > n; n += 2)
					{
						var s = t[n],
							r = t[n + 1];
						e[n] = this.a * s + this.c * r + this.tx, e[n + 1] = this.b * s + this.d * r + this.ty
					}
					return e
				}, e.transformPointArrayScale = function(t, e)
				{
					for (var i = t.length, n = 0; i > n; n += 2)
					{
						var s = t[n],
							r = t[n + 1];
						e[n] = this.a * s + this.c * r, e[n + 1] = this.b * s + this.d * r
					}
					return e
				}, e.getScaleX = function()
				{
					return 0 === this.b ? this.a : Math.sqrt(this.a * this.a + this.b * this.b)
				}, e.getScaleY = function()
				{
					return 0 === this.c ? this.d : Math.sqrt(this.c * this.c + this.d * this.d)
				}, e.invert = function()
				{
					var t = this.a,
						e = this.b,
						i = this.c,
						n = this.d,
						s = this.tx,
						r = t * n - e * i;
					return this.a = n / r, this.b = -e / r, this.c = -i / r, this.d = t / r, this.tx = (i * this.ty - n * s) / r, this.ty = -(t * this.ty - e * s) / r, this
				}, e.setTo = function(t, e, i, n, s, r)
				{
					return this.a = t, this.b = e, this.c = i, this.d = n, this.tx = s, this.ty = r, this
				}, e.concat = function(t)
				{
					var e = this.a,
						i = this.c,
						n = this.tx;
					return this.a = e * t.a + this.b * t.c, this.b = e * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, this.d = i * t.b + this.d * t.d, this.tx = n * t.a + this.ty * t.c + t.tx, this.ty = n * t.b + this.ty * t.d + t.ty, this
				}, e.clone = function()
				{
					var e = t._cache,
						i = e._length ? e[--e._length] : new t;
					return i.a = this.a, i.b = this.b, i.c = this.c, i.d = this.d, i.tx = this.tx, i.ty = this.ty, i.bTransform = this.bTransform, i
				}, e.copyTo = function(t)
				{
					return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t.bTransform = this.bTransform, t
				}, e.toString = function()
				{
					return this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.tx + "," + this.ty
				}, e.destroy = function()
				{
					if (!this.inPool)
					{
						var e = t._cache;
						this.inPool = !0, e._length || (e._length = 0), e[e._length++] = this, this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this.bTransform = !1
					}
				}, t.mul = function(t, e, i)
				{
					var n = t.a,
						s = t.b,
						r = t.c,
						a = t.d,
						o = t.tx,
						h = t.ty,
						l = e.a,
						u = e.b,
						c = e.c,
						_ = e.d,
						d = e.tx,
						f = e.ty;
					return 0 !== u || 0 !== c ? (i.a = n * l + s * c, i.b = n * u + s * _, i.c = r * l + a * c, i.d = r * u + a * _, i.tx = l * o + c * h + d, i.ty = u * o + _ * h + f) : (i.a = n * l, i.b = s * _, i.c = r * l, i.d = a * _, i.tx = l * o + d, i.ty = _ * h + f), i
				}, t.mulPre = function(t, e, i, n, s, r, a, o)
				{
					var h = t.a,
						l = t.b,
						u = t.c,
						c = t.d,
						_ = t.tx,
						d = t.ty;
					return 0 !== i || 0 !== n ? (o.a = h * e + l * n, o.b = h * i + l * s, o.c = u * e + c * n, o.d = u * i + c * s, o.tx = e * _ + n * d + r, o.ty = i * _ + s * d + a) : (o.a = h * e, o.b = l * s, o.c = u * e, o.d = c * s, o.tx = e * _ + r, o.ty = s * d + a), o
				}, t.mulPos = function(t, e, i, n, s, r, a, o)
				{
					var h = t.a,
						l = t.b,
						u = t.c,
						c = t.d,
						_ = t.tx,
						d = t.ty;
					return 0 !== l || 0 !== u ? (o.a = e * h + i * u, o.b = e * l + i * c, o.c = n * h + s * u, o.d = n * l + s * c, o.tx = h * r + u * a + _, o.ty = l * r + c * a + d) : (o.a = e * h, o.b = i * c, o.c = n * h, o.d = s * c, o.tx = h * r + _, o.ty = c * a + d), o
				}, t.preMul = function(t, e, i)
				{
					var n = t.a,
						s = t.b,
						r = t.c,
						a = t.d,
						o = e.a,
						h = e.b,
						l = e.c,
						u = e.d,
						c = e.tx,
						_ = e.ty;
					return i.a = o * n, i.b = i.c = 0, i.d = u * a, i.tx = c * n + t.tx, i.ty = _ * a + t.ty, 0 === h && 0 === l && 0 === s && 0 === r || (i.a += h * r, i.d += l * s, i.b += o * s + h * a, i.c += l * n + u * r, i.tx += _ * r, i.ty += c * s), i
				}, t.preMulXY = function(t, e, i, n)
				{
					var s = t.a,
						r = t.b,
						a = t.c,
						o = t.d;
					return n.a = s, n.b = r, n.c = a, n.d = o, n.tx = e * s + t.tx + i * a, n.ty = i * o + t.ty + e * r, n
				}, t.create = function()
				{
					var e = t._cache,
						i = e._length ? e[--e._length] : new t;
					return i.inPool = !1, i
				}, t.EMPTY = new t, t.TEMP = new t, t._cache = [], t
			}(),
			Point = function()
			{
				function t(t, e)
				{
					void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
				}
				__class(t, "laya.maths.Point");
				var e = t.prototype;
				return e.setTo = function(t, e)
				{
					return this.x = t, this.y = e, this
				}, e.distance = function(t, e)
				{
					return Math.sqrt((this.x - t) * (this.x - t) + (this.y - e) * (this.y - e))
				}, e.toString = function()
				{
					return this.x + "," + this.y
				}, e.normalize = function()
				{
					var t = Math.sqrt(this.x * this.x + this.y * this.y);
					if (t > 0)
					{
						var e = 1 / t;
						this.x *= e, this.y *= e
					}
				}, t.TEMP = new t, t.EMPTY = new t, t
			}(),
			Rectangle = function()
			{
				function t(t, e, i, n)
				{
					void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), this.x = t, this.y = e, this.width = i, this.height = n
				}
				__class(t, "laya.maths.Rectangle");
				var e = t.prototype;
				return e.setTo = function(t, e, i, n)
				{
					return this.x = t, this.y = e, this.width = i, this.height = n, this
				}, e.copyFrom = function(t)
				{
					return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
				}, e.contains = function(t, e)
				{
					return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.right && e >= this.y && e < this.bottom
				}, e.intersects = function(t)
				{
					return !(t.x > this.right || t.right < this.x || t.y > this.bottom || t.bottom < this.y)
				}, e.intersection = function(e, i)
				{
					return this.intersects(e) ? (i || (i = new t), i.x = Math.max(this.x, e.x), i.y = Math.max(this.y, e.y), i.width = Math.min(this.right, e.right) - i.x, i.height = Math.min(this.bottom, e.bottom) - i.y, i) : null
				}, e.union = function(e, i)
				{
					return i || (i = new t), this.clone(i), e.width <= 0 || e.height <= 0 ? i : (i.addPoint(e.x, e.y), i.addPoint(e.right, e.bottom), this)
				}, e.clone = function(e)
				{
					return e || (e = new t), e.x = this.x, e.y = this.y, e.width = this.width, e.height = this.height, e
				}, e.toString = function()
				{
					return this.x + "," + this.y + "," + this.width + "," + this.height
				}, e.equals = function(t)
				{
					return !(!t || t.x !== this.x || t.y !== this.y || t.width !== this.width || t.height !== this.height)
				}, e.addPoint = function(t, e)
				{
					return this.x > t && (this.width += this.x - t, this.x = t), this.y > e && (this.height += this.y - e, this.y = e), this.width < t - this.x && (this.width = t - this.x), this.height < e - this.y && (this.height = e - this.y), this
				}, e._getBoundPoints = function()
				{
					var e = t._temB;
					return e.length = 0, 0 == this.width || 0 == this.height ? e : (e.push(this.x, this.y, this.x + this.width, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height), e)
				}, e.isEmpty = function()
				{
					return this.width <= 0 || this.height <= 0
				}, __getset(0, e, "right", function()
				{
					return this.x + this.width
				}), __getset(0, e, "bottom", function()
				{
					return this.y + this.height
				}), t._getBoundPointS = function(e, i, n, s)
				{
					var r = t._temA;
					return r.length = 0, 0 == n || 0 == s ? r : (r.push(e, i, e + n, i, e, i + s, e + n, i + s), r)
				}, t._getWrapRec = function(e, i)
				{
					if (!e || e.length < 1) return i ? i.setTo(0, 0, 0, 0) : t.TEMP.setTo(0, 0, 0, 0);
					i = i ? i : new t;
					var n, s, r, a, o, h = e.length,
						l = Point.TEMP;
					for (s = a = 99999, r = o = -s, n = 0; h > n; n += 2) l.x = e[n], l.y = e[n + 1], s = s < l.x ? s : l.x, a = a < l.y ? a : l.y, r = r > l.x ? r : l.x, o = o > l.y ? o : l.y;
					return i.setTo(s, a, r - s, o - a)
				}, t.EMPTY = new t, t.TEMP = new t, t._temB = [], t._temA = [], t
			}(),
			SoundManager = function()
			{
				function t()
				{}
				return __class(t, "laya.media.SoundManager"), __getset(1, t, "autoStopMusic", function()
				{
					return t._autoStopMusic
				}, function(e)
				{
					Laya.stage.off("blur", null, t._stageOnBlur), Laya.stage.off("focus", null, t._stageOnFocus), t._autoStopMusic = e, e && (Laya.stage.on("blur", null, t._stageOnBlur), Laya.stage.on("focus", null, t._stageOnFocus))
				}), __getset(1, t, "muted", function()
				{
					return t._muted
				}, function(e)
				{
					e && t.stopAll(), t._muted = e
				}), __getset(1, t, "soundMuted", function()
				{
					return t._soundMuted
				}, function(e)
				{
					t._soundMuted = e
				}), __getset(1, t, "musicMuted", function()
				{
					return t._musicMuted
				}, function(e)
				{
					e ? (t._tMusic && t.stopSound(t._tMusic), t._musicMuted = e) : (t._musicMuted = e, t._tMusic && t.playMusic(t._tMusic))
				}), t.addChannel = function(e)
				{
					t._channels.indexOf(e) >= 0 || t._channels.push(e)
				}, t.removeChannel = function(e)
				{
					var i = 0;
					for (i = t._channels.length - 1; i >= 0; i--) t._channels[i] == e && t._channels.splice(i, 1)
				}, t._stageOnBlur = function()
				{
					t._musicChannel && (t._musicChannel.isStopped || (t._blurPaused = !0, t._musicLoops = t._musicChannel.loops, t._musicCompleteHandler = t._musicChannel.completeHandler, t._musicPosition = t._musicChannel.position, t._musicChannel.stop()))
				}, t._stageOnFocus = function()
				{
					t._blurPaused && (t.playMusic(t._tMusic, t._musicLoops, t._musicCompleteHandler, t._musicPosition), t._blurPaused = !1)
				}, t.playSound = function(e, i, n, s, r)
				{
					if (void 0 === i && (i = 1), void 0 === r && (r = 0), t._muted) return null;
					if (e == t._tMusic)
					{
						if (t._musicMuted) return null
					}
					else if (t._soundMuted) return null;
					var a = Laya.loader.getRes(e);
					s || (s = t._soundClass), a || (a = new s, a.load(e), Loader.cacheRes(e, a));
					var o;
					return o = a.play(r, i), o.url = e, o.volume = e == t._tMusic ? t.musicVolume : t.soundVolume, o.completeHandler = n, o
				}, t.destroySound = function(t)
				{
					var e = Laya.loader.getRes(t);
					e && (Loader.clearRes(t), e.dispose())
				}, t.playMusic = function(e, i, n, s)
				{
					return void 0 === i && (i = 0), void 0 === s && (s = 0), t._tMusic = e, t._musicChannel && t._musicChannel.stop(), t._musicChannel = t.playSound(e, i, n, null, s)
				}, t.stopSound = function(e)
				{
					var i, n = 0;
					for (n = t._channels.length - 1; n >= 0; n--) i = t._channels[n], i.url == e && i.stop()
				}, t.stopAll = function()
				{
					var e, i = 0;
					for (i = t._channels.length - 1; i >= 0; i--) e = t._channels[i], e.stop()
				}, t.stopMusic = function()
				{
					t._musicChannel && t._musicChannel.stop()
				}, t.setSoundVolume = function(e, i)
				{
					i ? t._setVolume(i, e) : t.soundVolume = e
				}, t.setMusicVolume = function(e)
				{
					t.musicVolume = e, t._setVolume(t._tMusic, e)
				}, t._setVolume = function(e, i)
				{
					var n, s = 0;
					for (s = t._channels.length - 1; s >= 0; s--) n = t._channels[s], n.url == e && (n.volume = i)
				}, t.musicVolume = 1, t.soundVolume = 1, t._muted = !1, t._soundMuted = !1, t._musicMuted = !1, t._tMusic = null, t._musicChannel = null, t._channels = [], t._autoStopMusic = !1, t._blurPaused = !1, t._musicLoops = 0, t._musicPosition = 0, t._musicCompleteHandler = null, t._soundClass = null, t
			}(),
			LocalStorage = function()
			{
				function t()
				{}
				var e;
				return __class(t, "laya.net.LocalStorage"), t.__init__ = function()
				{
					t._baseClass || (t._baseClass = e, e.init()), t.items = t._baseClass.items, t.support = t._baseClass.support
				}, t.setItem = function(e, i)
				{
					t._baseClass.setItem(e, i)
				}, t.getItem = function(e)
				{
					return t._baseClass.getItem(e)
				}, t.setJSON = function(e, i)
				{
					t._baseClass.setJSON(e, i)
				}, t.getJSON = function(e)
				{
					return t._baseClass.getJSON(e)
				}, t.removeItem = function(e)
				{
					t._baseClass.removeItem(e)
				}, t.clear = function()
				{
					t._baseClass.clear()
				}, t._baseClass = null, t.items = null, t.support = !1, t.__init$ = function()
				{
					e = function()
					{
						function t()
						{}
						return __class(t, ""), t.init = function()
						{
							if (window.localStorage)
							{
								t.items = window.localStorage;
								try
								{
									t.setItem("laya", "1"), t.removeItem("laya"), t.support = !0
								}
								catch (e)
								{}
							}
							t.support || console.log("LocalStorage is not supprot or browser is private mode.")
						}, t.setItem = function(e, i)
						{
							try
							{
								t.support && t.items.setItem(e, i)
							}
							catch (n)
							{
								console.log("set localStorage failed", n)
							}
						}, t.getItem = function(e)
						{
							return t.support ? t.items.getItem(e) : null
						}, t.setJSON = function(e, i)
						{
							try
							{
								t.support && t.items.setItem(e, JSON.stringify(i))
							}
							catch (n)
							{
								console.log("set localStorage failed", n)
							}
						}, t.getJSON = function(e)
						{
							return JSON.parse(t.support ? t.items.getItem(e) : null)
						}, t.removeItem = function(e)
						{
							t.support && t.items.removeItem(e)
						}, t.clear = function()
						{
							t.support && t.items.clear()
						}, t.items = null, t.support = !1, t
					}()
				}, t
			}(),
			URL = function()
			{
				function t(e)
				{
					this._url = null, this._path = null, this._url = t.formatURL(e), this._path = t.getPath(e)
				}
				__class(t, "laya.net.URL");
				var e = t.prototype;
				return __getset(0, e, "url", function()
				{
					return this._url
				}), __getset(0, e, "path", function()
				{
					return this._path
				}), t.formatURL = function(e, i)
				{
					if (null != t.customFormat && (e = t.customFormat(e, i)), !e) return "null path";
					if (0 == Render.isConchApp && t.version[e] && (e += "?v=" + t.version[e]), "~" == e.charAt(0)) return t.rootPath + e.substring(1);
					if (t.isAbsolute(e)) return e;
					var n = (i || t.basePath) + e;
					return n
				}, t.formatRelativePath = function(t)
				{
					if (t.indexOf("../") > -1)
					{
						for (var e = t.split("/"), i = 0, n = e.length; n > i; i++) ".." == e[i] && (e.splice(i - 1, 2), i -= 2);
						return e.join("/")
					}
					return t
				}, t.isAbsolute = function(t)
				{
					return t.indexOf(":") > 0 || "/" == t.charAt(0)
				}, t.getPath = function(t)
				{
					var e = t.lastIndexOf("/");
					return e > 0 ? t.substr(0, e + 1) : ""
				}, t.getFileName = function(t)
				{
					var e = t.lastIndexOf("/");
					return e > 0 ? t.substr(e + 1) : t
				}, t.version = {}, t.basePath = "", t.rootPath = "", t.customFormat = null, t
			}(),
			Render = function()
			{
				function t(e, i)
				{
					function n()
					{
						Laya.stage._loop(), Browser.window.requestAnimationFrame(n)
					}
					var s = t._mainCanvas.source.style;
					s.position = "absolute", s.top = s.left = "0px", s.background = "#000000", t._mainCanvas.source.id = t._mainCanvas.source.id || "layaCanvas";
					var r = laya.renders.Render.isWebGL;
					r && t.WebGL.init(t._mainCanvas, e, i), (t._mainCanvas.source.nodeName || laya.renders.Render.isConchApp) && Browser.container.appendChild(t._mainCanvas.source), t._context = new RenderContext(e, i, r ? null : t._mainCanvas), t._context.ctx.setIsMainContext(), Browser.window.requestAnimationFrame(n)
				}
				__class(t, "laya.renders.Render");
				var e = t.prototype;
				return e._enterFrame = function(t)
				{
					Laya.stage._loop()
				}, __getset(1, t, "isConchApp", function()
				{
					return 4 == (4 & window.ConchRenderType)
				}), __getset(1, t, "isConchNode", function()
				{
					return 5 == (5 & window.ConchRenderType)
				}, function(t)
				{
					t ? window.ConchRenderType |= 1 : window.ConchRenderType &= -2
				}), __getset(1, t, "context", function()
				{
					return t._context
				}), __getset(1, t, "isConchWebGL", function()
				{
					return 6 == window.ConchRenderType
				}, function(e)
				{
					e ? (t.isConchNode = !1, window.ConchRenderType |= 2) : window.ConchRenderType &= -3
				}), __getset(1, t, "canvas", function()
				{
					return t._mainCanvas.source
				}), t._context = null, t._mainCanvas = null, t.WebGL = null, t.NODE = 1, t.WEBGL = 2, t.CONCH = 4, t.isWebGL = !1, t.is3DMode = !1, t.optimizeTextureMemory = function(t, e)
				{
					return !0
				}, t.__init$ = function()
				{
					window.ConchRenderType = window.ConchRenderType || 1, window.ConchRenderType |= window.conch ? 4 : 0
				}, t
			}(),
			RenderContext = function()
			{
				function t(e, i, n)
				{
					this.x = 0, this.y = 0, this._drawTexture = function(t, e, i)
					{
						i[0].loaded && this.ctx.drawTexture(i[0], i[1], i[2], i[3], i[4], t, e)
					}, this._fillTexture = function(t, e, i)
					{
						if (i[0].loaded)
						{
							var n, s = i[0],
								r = this.ctx;
							if (Render.isWebGL)
							{
								var a = i[7];
								if (a)
								{
									i[6] ? a.initTexture(s, i[1], i[2], i[3], i[4], i[6].x, i[6].y) : a.initTexture(s, i[1], i[2], i[3], i[4], 0, 0);
									var o = this.ctx;
									a.render(o, t, e)
								}
								return
							}
							if (Render.isConchApp)
								if (s.uv != Texture.DEF_UV)
								{
									var h = s.bitmap.width,
										l = s.bitmap.height,
										u = s.uv;
									n = i[7] ? i[7] : i[7] = r.createPattern(s.bitmap.source, i[5], u[0] * h, u[1] * l, (u[2] - u[0]) * h, (u[5] - u[3]) * l)
								}
								else n = i[7] ? i[7] : i[7] = r.createPattern(s.bitmap.source, i[5]);
							else
							{
								if (s.uv != Texture.DEF_UV)
								{
									var c = new HTMLCanvas("2D");
									c.getContext("2d"), c.size(s.width, s.height), c.context.drawTexture(s, 0, 0, s.width, s.height, 0, 0), i[0] = s = new Texture(c)
								}
								n = i[7] ? i[7] : i[7] = r.createPattern(s.bitmap.source, i[5])
							}
							var _ = t + i[1],
								d = e + i[2],
								f = 0,
								p = 0;
							i[6] && (_ += i[6].x % s.width, d += i[6].y % s.height, f -= i[6].x % s.width, p -= i[6].y % s.height), r.translate(_, d), r.fillStyle = n, r.fillRect(f, p, i[3], i[4]), r.translate(-_, -d)
						}
					}, this._drawTextureWithTransform = function(t, e, i)
					{
						i[0].loaded && this.ctx.drawTextureWithTransform(i[0], i[1], i[2], i[3], i[4], i[5], t, e)
					}, this._fillQuadrangle = function(t, e, i)
					{
						this.ctx.fillQuadrangle(i[0], i[1], i[2], i[3], i[4])
					}, this._drawRect = function(t, e, i)
					{
						var n = this.ctx;
						null != i[4] && (n.fillStyle = i[4], n.fillRect(t + i[0], e + i[1], i[2], i[3], null)), null != i[5] && (n.strokeStyle = i[5], n.lineWidth = i[6], n.strokeRect(t + i[0], e + i[1], i[2], i[3], i[6]))
					}, this._drawPie = function(t, e, i)
					{
						var n = this.ctx;
						Render.isWebGL && n.setPathId(i[8]), n.beginPath(), Render.isWebGL ? (n.movePath(i[0] + t, i[1] + e), n.moveTo(0, 0)) : n.moveTo(t + i[0], e + i[1]), n.arc(t + i[0], e + i[1], i[2], i[3], i[4]), n.closePath(), this._fillAndStroke(i[5], i[6], i[7], !0)
					}, this._clipRect = function(t, e, i)
					{
						this.ctx.clipRect(t + i[0], e + i[1], i[2], i[3])
					}, this._fillRect = function(t, e, i)
					{
						this.ctx.fillRect(t + i[0], e + i[1], i[2], i[3], i[4])
					}, this._drawCircle = function(e, i, n)
					{
						var s = this.ctx;
						Render.isWebGL && s.setPathId(n[6]), Stat.drawCall++, s.beginPath(), Render.isWebGL && s.movePath(n[0] + e, n[1] + i), s.arc(n[0] + e, n[1] + i, n[2], 0, t.PI2), s.closePath(), this._fillAndStroke(n[3], n[4], n[5], !0)
					}, this._fillCircle = function(e, i, n)
					{
						Stat.drawCall++;
						var s = this.ctx;
						s.beginPath(), s.fillStyle = n[3], s.arc(n[0] + e, n[1] + i, n[2], 0, t.PI2),
							s.fill()
					}, this._setShader = function(t, e, i)
					{
						this.ctx.setShader(i[0])
					}, this._drawLine = function(t, e, i)
					{
						var n = this.ctx;
						Render.isWebGL && n.setPathId(i[6]), n.beginPath(), n.strokeStyle = i[4], n.lineWidth = i[5], Render.isWebGL ? (n.movePath(t, e), n.moveTo(i[0], i[1]), n.lineTo(i[2], i[3])) : (n.moveTo(t + i[0], e + i[1]), n.lineTo(t + i[2], e + i[3])), n.stroke()
					}, this._drawLines = function(t, e, i)
					{
						var n = this.ctx;
						Render.isWebGL && n.setPathId(i[5]), n.beginPath(), t += i[0], e += i[1], Render.isWebGL && n.movePath(t, e), n.strokeStyle = i[3], n.lineWidth = i[4];
						var s = i[2],
							r = 2,
							a = s.length;
						if (Render.isWebGL)
							for (n.moveTo(s[0], s[1]); a > r;) n.lineTo(s[r++], s[r++]);
						else
							for (n.moveTo(t + s[0], e + s[1]); a > r;) n.lineTo(t + s[r++], e + s[r++]);
						n.stroke()
					}, this._drawLinesWebGL = function(t, e, i)
					{
						this.ctx.drawLines(t + this.x + i[0], e + this.y + i[1], i[2], i[3], i[4])
					}, this._drawCurves = function(t, e, i)
					{
						var n = this.ctx;
						Render.isWebGL && n.setPathId(-1), n.beginPath(), n.strokeStyle = i[3], n.lineWidth = i[4];
						var s = i[2];
						t += i[0], e += i[1], n.moveTo(t + s[0], e + s[1]);
						for (var r = 2, a = s.length; a > r;) n.quadraticCurveTo(t + s[r++], e + s[r++], t + s[r++], e + s[r++]);
						n.stroke()
					}, this._draw = function(t, e, i)
					{
						i[0].call(null, this, t, e)
					}, this._transformByMatrix = function(t, e, i)
					{
						this.ctx.transformByMatrix(i[0])
					}, this._setTransform = function(t, e, i)
					{
						this.ctx.setTransform(i[0], i[1], i[2], i[3], i[4], i[5])
					}, this._setTransformByMatrix = function(t, e, i)
					{
						this.ctx.setTransformByMatrix(i[0])
					}, this._save = function(t, e, i)
					{
						this.ctx.save()
					}, this._restore = function(t, e, i)
					{
						this.ctx.restore()
					}, this._translate = function(t, e, i)
					{
						this.ctx.translate(i[0], i[1])
					}, this._transform = function(t, e, i)
					{
						this.ctx.translate(i[1] + t, i[2] + e);
						var n = i[0];
						this.ctx.transform(n.a, n.b, n.c, n.d, n.tx, n.ty), this.ctx.translate(-t - i[1], -e - i[2])
					}, this._rotate = function(t, e, i)
					{
						this.ctx.translate(i[1] + t, i[2] + e), this.ctx.rotate(i[0]), this.ctx.translate(-t - i[1], -e - i[2])
					}, this._scale = function(t, e, i)
					{
						this.ctx.translate(i[2] + t, i[3] + e), this.ctx.scale(i[0], i[1]), this.ctx.translate(-t - i[2], -e - i[3])
					}, this._alpha = function(t, e, i)
					{
						this.ctx.globalAlpha *= i[0]
					}, this._setAlpha = function(t, e, i)
					{
						this.ctx.globalAlpha = i[0]
					}, this._fillText = function(t, e, i)
					{
						this.ctx.fillText(i[0], i[1] + t, i[2] + e, i[3], i[4], i[5])
					}, this._strokeText = function(t, e, i)
					{
						this.ctx.strokeText(i[0], i[1] + t, i[2] + e, i[3], i[4], i[5], i[6])
					}, this._fillBorderText = function(t, e, i)
					{
						this.ctx.fillBorderText(i[0], i[1] + t, i[2] + e, i[3], i[4], i[5], i[6], i[7])
					}, this._blendMode = function(t, e, i)
					{
						this.ctx.globalCompositeOperation = i[0]
					}, this._beginClip = function(t, e, i)
					{
						this.ctx.beginClip && this.ctx.beginClip(t + i[0], e + i[1], i[2], i[3])
					}, this._setIBVB = function(t, e, i)
					{
						this.ctx.setIBVB(i[0] + t, i[1] + e, i[2], i[3], i[4], i[5], i[6], i[7])
					}, this._fillTrangles = function(t, e, i)
					{
						this.ctx.fillTrangles(i[0], i[1] + t, i[2] + e, i[3], i[4])
					}, this._drawPath = function(t, e, i)
					{
						var n = this.ctx;
						Render.isWebGL && n.setPathId(-1), n.beginPath(), t += i[0], e += i[1];
						for (var s = i[2], r = 0, a = s.length; a > r; r++)
						{
							var o = s[r];
							switch (o[0])
							{
								case "moveTo":
									n.moveTo(t + o[1], e + o[2]);
									break;
								case "lineTo":
									n.lineTo(t + o[1], e + o[2]);
									break;
								case "arcTo":
									n.arcTo(t + o[1], e + o[2], t + o[3], e + o[4], o[5]);
									break;
								case "closePath":
									n.closePath()
							}
						}
						var h = i[3];
						null != h && (n.fillStyle = h.fillStyle, n.fill());
						var l = i[4];
						null != l && (n.strokeStyle = l.strokeStyle, n.lineWidth = l.lineWidth || 1, n.lineJoin = l.lineJoin, n.lineCap = l.lineCap, n.miterLimit = l.miterLimit, n.stroke())
					}, this.drawPoly = function(t, e, i)
					{
						this.ctx.drawPoly(t + this.x + i[0], e + this.y + i[1], i[2], i[3], i[4], i[5], i[6])
					}, this._drawPoly = function(t, e, i)
					{
						var n = this.ctx,
							s = i[2],
							r = 2,
							a = s.length;
						if (Render.isWebGL)
							for (n.setPathId(i[6]), n.beginPath(), t += i[0], e += i[1], n.movePath(t, e), n.moveTo(s[0], s[1]); a > r;) n.lineTo(s[r++], s[r++]);
						else
							for (n.beginPath(), t += i[0], e += i[1], n.moveTo(t + s[0], e + s[1]); a > r;) n.lineTo(t + s[r++], e + s[r++]);
						n.closePath(), this._fillAndStroke(i[3], i[4], i[5], i[7])
					}, this._drawSkin = function(t, e, i)
					{
						var n = i[0];
						if (n)
						{
							var s = this.ctx;
							n.render(s, t, e)
						}
					}, this._drawParticle = function(t, e, i)
					{
						this.ctx.drawParticle(t + this.x, e + this.y, i[0])
					}, n ? this.ctx = n.getContext("2d") : (n = HTMLCanvas.create("3D"), this.ctx = RunDriver.createWebGLContext2D(n), n._setContext(this.ctx)), n.size(e, i), this.canvas = n
				}
				__class(t, "laya.renders.RenderContext");
				var e = t.prototype;
				return e.destroy = function()
				{
					this.canvas && (this.canvas.destroy(), this.canvas = null), this.ctx && (this.ctx.destroy(), this.ctx = null)
				}, e.drawTexture = function(t, e, i, n, s)
				{
					t.loaded && this.ctx.drawTexture(t, e, i, n, s, this.x, this.y)
				}, e.drawTextureWithTransform = function(t, e, i, n, s, r)
				{
					t.loaded && this.ctx.drawTextureWithTransform(t, e, i, n, s, r, this.x, this.y)
				}, e.fillQuadrangle = function(t, e, i, n, s)
				{
					this.ctx.fillQuadrangle(t, e, i, n, s)
				}, e.drawCanvas = function(t, e, i, n, s)
				{
					this.ctx.drawCanvas(t, e + this.x, i + this.y, n, s)
				}, e.drawRect = function(t, e, i, n, s, r)
				{
					void 0 === r && (r = 1);
					var a = this.ctx;
					a.strokeStyle = s, a.lineWidth = r, a.strokeRect(t + this.x, e + this.y, i, n, r)
				}, e._fillAndStroke = function(t, e, i, n)
				{
					void 0 === n && (n = !1);
					var s = this.ctx;
					null != t && (s.fillStyle = t, Render.isWebGL ? s.fill(n) : s.fill()), null != e && i > 0 && (s.strokeStyle = e, s.lineWidth = i, s.stroke())
				}, e.clipRect = function(t, e, i, n)
				{
					this.ctx.clipRect(t + this.x, e + this.y, i, n)
				}, e.fillRect = function(t, e, i, n, s)
				{
					this.ctx.fillRect(t + this.x, e + this.y, i, n, s)
				}, e.drawCircle = function(e, i, n, s, r)
				{
					void 0 === r && (r = 1), Stat.drawCall++;
					var a = this.ctx;
					a.beginPath(), a.strokeStyle = s, a.lineWidth = r, a.arc(e + this.x, i + this.y, n, 0, t.PI2), a.stroke()
				}, e.fillCircle = function(e, i, n, s)
				{
					Stat.drawCall++;
					var r = this.ctx;
					r.beginPath(), r.fillStyle = s, r.arc(e + this.x, i + this.y, n, 0, t.PI2), r.fill()
				}, e.setShader = function(t)
				{
					this.ctx.setShader(t)
				}, e.drawLine = function(t, e, i, n, s, r)
				{
					void 0 === r && (r = 1);
					var a = this.ctx;
					a.beginPath(), a.strokeStyle = s, a.lineWidth = r, a.moveTo(this.x + t, this.y + e), a.lineTo(this.x + i, this.y + n), a.stroke()
				}, e.clear = function()
				{
					this.ctx.clear()
				}, e.transformByMatrix = function(t)
				{
					this.ctx.transformByMatrix(t)
				}, e.setTransform = function(t, e, i, n, s, r)
				{
					this.ctx.setTransform(t, e, i, n, s, r)
				}, e.setTransformByMatrix = function(t)
				{
					this.ctx.setTransformByMatrix(t)
				}, e.save = function()
				{
					this.ctx.save()
				}, e.restore = function()
				{
					this.ctx.restore()
				}, e.translate = function(t, e)
				{
					this.ctx.translate(t, e)
				}, e.transform = function(t, e, i, n, s, r)
				{
					this.ctx.transform(t, e, i, n, s, r)
				}, e.rotate = function(t)
				{
					this.ctx.rotate(t)
				}, e.scale = function(t, e)
				{
					this.ctx.scale(t, e)
				}, e.alpha = function(t)
				{
					this.ctx.globalAlpha *= t
				}, e.setAlpha = function(t)
				{
					this.ctx.globalAlpha = t
				}, e.fillWords = function(t, e, i, n, s)
				{
					this.ctx.fillWords(t, e, i, n, s)
				}, e.fillText = function(t, e, i, n, s, r)
				{
					this.ctx.fillText(t, e + this.x, i + this.y, n, s, r)
				}, e.strokeText = function(t, e, i, n, s, r, a)
				{
					this.ctx.strokeText(t, e + this.x, i + this.y, n, s, r, a)
				}, e.blendMode = function(t)
				{
					this.ctx.globalCompositeOperation = t
				}, e.flush = function()
				{
					this.ctx.flush && this.ctx.flush()
				}, e.addRenderObject = function(t)
				{
					this.ctx.addRenderObject(t)
				}, e.beginClip = function(t, e, i, n)
				{
					this.ctx.beginClip && this.ctx.beginClip(t, e, i, n)
				}, e.endClip = function()
				{
					this.ctx.endClip && this.ctx.endClip()
				}, e.fillTrangles = function(t, e, i)
				{
					this.ctx.fillTrangles(i[0], i[1], i[2], i[3], i.length > 4 ? i[4] : null)
				}, t.PI2 = 2 * Math.PI, t
			}(),
			RenderSprite = function()
			{
				function t(e, i)
				{
					switch (this._next = i || t.NORENDER, e)
					{
						case 0:
							return void(this._fun = this._no);
						case 1:
							return void(this._fun = this._image);
						case 2:
							return void(this._fun = this._alpha);
						case 4:
							return void(this._fun = this._transform);
						case 32:
							return void(this._fun = this._blend);
						case 8:
							return void(this._fun = this._canvas);
						case 64:
							return void(this._fun = this._clip);
						case 128:
							return void(this._fun = this._style);
						case 256:
							return void(this._fun = this._graphics);
						case 2048:
							return void(this._fun = this._childs);
						case 512:
							return void(this._fun = this._custom);
						case 257:
							return void(this._fun = this._image2);
						case 261:
							return void(this._fun = this._image2);
						case 16:
							return void(this._fun = Filter._filter);
						case 69905:
							return void(this._fun = t._initRenderFun)
					}
					this.onCreate(e)
				}
				__class(t, "laya.renders.RenderSprite");
				var e = t.prototype;
				return e.onCreate = function(t) {}, e._style = function(t, e, i, n)
				{
					t._style.render(t, e, i, n);
					var s = this._next;
					s._fun.call(s, t, e, i, n)
				}, e._no = function(t, e, i, n) {}, e._custom = function(t, e, i, n)
				{
					t.customRender(e, i, n);
					var s = t._style._tf;
					this._next._fun.call(this._next, t, e, i - s.translateX, n - s.translateY)
				}, e._clip = function(e, i, n, s)
				{
					var r = this._next;
					if (r != t.NORENDER)
					{
						var a = e._style.scrollRect;
						i.ctx.save(), i.ctx.clipRect(n, s, a.width, a.height), r._fun.call(r, e, i, n - a.x, s - a.y), i.ctx.restore()
					}
				}, e._blend = function(t, e, i, n)
				{
					var s = t._style;
					s.blendMode && (e.ctx.globalCompositeOperation = s.blendMode);
					var r = this._next;
					r._fun.call(r, t, e, i, n);
					var a = t.mask;
					a && (e.ctx.globalCompositeOperation = "destination-in", (a.numChildren > 0 || !a.graphics._isOnlyOne()) && (a.cacheAsBitmap = !0), a.render(e, i, n)), e.ctx.globalCompositeOperation = "source-over"
				}, e._graphics = function(t, e, i, n)
				{
					var s = t._style._tf;
					t._graphics && t._graphics._render(t, e, i - s.translateX, n - s.translateY);
					var r = this._next;
					r._fun.call(r, t, e, i, n)
				}, e._image = function(t, e, i, n)
				{
					var s = t._style;
					e.ctx.drawTexture2(i, n, s._tf.translateX, s._tf.translateY, t.transform, s.alpha, s.blendMode, t._graphics._one)
				}, e._image2 = function(t, e, i, n)
				{
					var s = t._style._tf;
					e.ctx.drawTexture2(i, n, s.translateX, s.translateY, t.transform, 1, null, t._graphics._one)
				}, e._alpha = function(t, e, i, n)
				{
					var s, r = t._style;
					if ((s = r.alpha) > .01)
					{
						var a = e.ctx.globalAlpha;
						e.ctx.globalAlpha *= s;
						var o = this._next;
						o._fun.call(o, t, e, i, n), e.ctx.globalAlpha = a
					}
				}, e._transform = function(e, i, n, s)
				{
					var r = e.transform,
						a = this._next;
					r && a != t.NORENDER ? (i.save(), i.transform(r.a, r.b, r.c, r.d, r.tx + n, r.ty + s), a._fun.call(a, e, i, 0, 0), i.restore()) : a._fun.call(a, e, i, n, s)
				}, e._childs = function(t, e, i, n)
				{
					var s = t._style;
					i += -s._tf.translateX + s.paddingLeft, n += -s._tf.translateY + s.paddingTop;
					var r = t._getWords();
					r && e.fillWords(r, i, n, s.font, s.color);
					var a, o = t._childs,
						h = o.length;
					if (t.optimizeScrollRect && null != t.scrollRect)
					{
						var l = t.scrollRect;
						for (u = 0; h > u; ++u) a = o[u], a.visible && l.intersects(Rectangle.TEMP.setTo(a.x, a.y, a.width, a.height)) && a.render(e, i, n)
					}
					else
						for (var u = 0; h > u; ++u)(a = o[u]).visible && a.render(e, i, n)
				}, e._canvas = function(t, e, i, n)
				{
					var s = t._$P.cacheCanvas,
						r = this._next;
					if (!s) return void r._fun.call(r, t, u, i, n);
					var a, o, h, l, u = s.ctx,
						c = t._needRepaint() || !u;
					if ("bitmap" === s.type ? Stat.canvasBitmap++ : Stat.canvasNormal++, c)
					{
						s._cacheRec || (s._cacheRec = new Rectangle);
						var _, d;
						if (l = t.getSelfBounds(), Render.isWebGL && "bitmap" === s.type && (l.width > 2048 || l.height > 2048)) return console.log("cache bitmap size larger than 2048,cache ignored"), void r._fun.call(r, t, u, i, n);
						l.x -= t.pivotX, l.y -= t.pivotY, l.x -= 10, l.y -= 10, l.width += 20, l.height += 20, l.x = Math.floor(l.x + i) - i, l.y = Math.floor(l.y + n) - n, l.width = Math.floor(l.width), l.height = Math.floor(l.height), s._cacheRec.copyFrom(l), l = s._cacheRec;
						var f = Render.isWebGL ? 1 : Browser.pixelRatio * Laya.stage.clientScaleX,
							p = Render.isWebGL ? 1 : Browser.pixelRatio * Laya.stage.clientScaleY;
						if (!Render.isWebGL)
						{
							var g, m = 1,
								v = 1;
							for (g = t; g && g != Laya.stage;) m *= g.scaleX, v *= g.scaleY, g = g.parent;
							m > 1 && (f *= m), v > 1 && (p *= v)
						}
						_ = l.width * f, d = l.height * p, o = l.x, h = l.y, u || (u = s.ctx = Pool.getItem("RenderContext") || new RenderContext(_, d, HTMLCanvas.create("AUTO")), u.ctx.sprite = t), a = u.canvas, "bitmap" === s.type && (a.context.asBitmap = !0), a.clear(), (a.width != _ || a.height != d) && a.size(_, d);
						var y;
						if (1 != f || 1 != p)
						{
							var w = u.ctx;
							w.save(), w.scale(f, p), !Render.isConchWebGL && Render.isConchApp && (y = t._$P.cf, y && w.setFilterMatrix && w.setFilterMatrix(y._mat, y._alpha)), r._fun.call(r, t, u, -o, -h), w.restore(), Render.isConchApp && !Render.isConchWebGL || t._applyFilters()
						}
						else w = u.ctx, !Render.isConchWebGL && Render.isConchApp && (y = t._$P.cf, y && w.setFilterMatrix && w.setFilterMatrix(y._mat, y._alpha)), r._fun.call(r, t, u, -o, -h), Render.isConchApp && !Render.isConchWebGL || t._applyFilters();
						t._$P.staticCache && (s.reCache = !1), Stat.canvasReCache++
					}
					else l = s._cacheRec, o = l.x, h = l.y, a = u.canvas;
					e.drawCanvas(a, i + o, n + h, l.width, l.height)
				}, t.__init__ = function()
				{
					function e(e, i)
					{
						for (var n = 0, s = 0; s < e.length; s++) n |= e[s], t.renders[n] = i
					}
					var i, n = 0,
						s = 0;
					for (i = RunDriver.createRenderSprite(69905, null), s = t.renders.length = 4096, n = 0; s > n; n++) t.renders[n] = i;
					t.renders[0] = RunDriver.createRenderSprite(0, null), e([1, 256, 4, 2], new t(1, null)), t.renders[257] = RunDriver.createRenderSprite(257, null), t.renders[261] = new t(261, null)
				}, t._initRenderFun = function(e, i, n, s)
				{
					var r = e._renderType,
						a = t.renders[r] = t._getTypeRender(r);
					a._fun(e, i, n, s)
				}, t._getTypeRender = function(t)
				{
					for (var e = null, i = 2048; i > 1;) i & t && (e = RunDriver.createRenderSprite(i, e)), i >>= 1;
					return e
				}, t.IMAGE = 1, t.ALPHA = 2, t.TRANSFORM = 4, t.CANVAS = 8, t.FILTERS = 16, t.BLEND = 32, t.CLIP = 64, t.STYLE = 128, t.GRAPHICS = 256, t.CUSTOM = 512, t.CHILDS = 2048, t.INIT = 69905, t.renders = [], t.NORENDER = new t(0, null), t
			}(),
			Context = function()
			{
				function t()
				{
					this._repaint = !1
				}
				__class(t, "laya.resource.Context");
				var e = t.prototype;
				return e.setIsMainContext = function() {}, e.drawCanvas = function(t, e, i, n, s)
				{
					Stat.drawCall++, this.drawImage(t.source, e, i, n, s)
				}, e.fillRect = function(t, e, i, n, s)
				{
					Stat.drawCall++, s && (this.fillStyle = s), this.__fillRect(t, e, i, n)
				}, e.fillText = function(t, e, i, n, s, r)
				{
					Stat.drawCall++, arguments.length > 3 && null != n && (this.font = n, this.fillStyle = s, this.textAlign = r, this.textBaseline = "top"), this.__fillText(t, e, i)
				}, e.fillBorderText = function(t, e, i, n, s, r, a, o)
				{
					Stat.drawCall++, this.font = n, this.fillStyle = s, this.textBaseline = "top", this.strokeStyle = r, this.lineWidth = a, this.textAlign = o, this.__strokeText(t, e, i), this.__fillText(t, e, i)
				}, e.strokeText = function(t, e, i, n, s, r, a)
				{
					Stat.drawCall++, arguments.length > 3 && null != n && (this.font = n, this.strokeStyle = s, this.lineWidth = r, this.textAlign = a, this.textBaseline = "top"), this.__strokeText(t, e, i)
				}, e.transformByMatrix = function(t)
				{
					this.transform(t.a, t.b, t.c, t.d, t.tx, t.ty)
				}, e.setTransformByMatrix = function(t)
				{
					this.setTransform(t.a, t.b, t.c, t.d, t.tx, t.ty)
				}, e.clipRect = function(t, e, i, n)
				{
					Stat.drawCall++, this.beginPath(), this.rect(t, e, i, n), this.clip()
				}, e.drawTexture = function(t, e, i, n, s, r, a)
				{
					Stat.drawCall++;
					var o = t.uv,
						h = t.bitmap.width,
						l = t.bitmap.height;
					this.drawImage(t.source, o[0] * h, o[1] * l, (o[2] - o[0]) * h, (o[5] - o[3]) * l, e + r, i + a, n, s)
				}, e.drawTextureWithTransform = function(t, e, i, n, s, r, a, o)
				{
					Stat.drawCall++;
					var h = t.uv,
						l = t.bitmap.width,
						u = t.bitmap.height;
					this.save(), this.transform(r.a, r.b, r.c, r.d, r.tx + a, r.ty + o), this.drawImage(t.source, h[0] * l, h[1] * u, (h[2] - h[0]) * l, (h[5] - h[3]) * u, e, i, n, s), this.restore()
				}, e.drawTexture2 = function(t, e, i, n, s, r, a, o)
				{
					"use strict";
					var h = o[0];
					if (h.loaded && h.bitmap && h.source)
					{
						Stat.drawCall++;
						var l = 1 !== r;
						if (l)
						{
							var u = this.globalAlpha;
							this.globalAlpha *= r
						}
						var c = h.uv,
							_ = h.bitmap.width,
							d = h.bitmap.height;
						s ? (this.save(), this.transform(s.a, s.b, s.c, s.d, s.tx + t, s.ty + e), this.drawImage(h.source, c[0] * _, c[1] * d, (c[2] - c[0]) * _, (c[5] - c[3]) * d, o[1] - i, o[2] - n, o[3], o[4]), this.restore()) : this.drawImage(h.source, c[0] * _, c[1] * d, (c[2] - c[0]) * _, (c[5] - c[3]) * d, o[1] - i + t, o[2] - n + e, o[3], o[4]), l && (this.globalAlpha = u)
					}
				}, e.flush = function()
				{
					return 0
				}, e.fillWords = function(t, e, i, n, s)
				{
					n && (this.font = n), s && (this.fillStyle = s);
					this.textBaseline = "top", this.textAlign = "left";
					for (var r = 0, a = t.length; a > r; r++)
					{
						var o = t[r];
						this.__fillText(o["char"], o.x + e, o.y + i)
					}
				}, e.destroy = function()
				{
					this.canvas.width = this.canvas.height = 0
				}, e.clear = function()
				{
					this.clearRect(0, 0, this._canvas.width, this._canvas.height), this._repaint = !1
				}, t.__init__ = function(t)
				{
					var e = laya.resource.Context.prototype;
					t = t || CanvasRenderingContext2D.prototype, t.__fillText = t.fillText, t.__fillRect = t.fillRect, t.__strokeText = t.strokeText;
					var i = ["fillWords", "setIsMainContext", "fillRect", "strokeText", "fillText", "transformByMatrix", "setTransformByMatrix", "clipRect", "drawTexture", "drawTexture2", "drawTextureWithTransform", "flush", "clear", "destroy", "drawCanvas", "fillBorderText"];
					i.forEach(function(i)
					{
						t[i] = e[i] || t[i]
					})
				}, t._default = new t, t
			}(),
			ResourceManager = function()
			{
				function t()
				{
					this._id = 0, this._name = null, this._resources = null, this._memorySize = 0, this._garbageCollectionRate = NaN, this._isOverflow = !1, this.autoRelease = !1, this.autoReleaseMaxSize = 0, this._id = ++t._uniqueIDCounter, this._name = "Content Manager", t._isResourceManagersSorted = !1, this._memorySize = 0, this._isOverflow = !1, this.autoRelease = !1, this.autoReleaseMaxSize = 536870912, this._garbageCollectionRate = .2, t._resourceManagers.push(this), this._resources = []
				}
				__class(t, "laya.resource.ResourceManager");
				var e = t.prototype;
				return Laya.imps(e,
				{
					"laya.resource.IDispose": !0
				}), e.getResourceByIndex = function(t)
				{
					return this._resources[t]
				}, e.getResourcesLength = function()
				{
					return this._resources.length
				}, e.addResource = function(t)
				{
					t.resourceManager && t.resourceManager.removeResource(t);
					var e = this._resources.indexOf(t);
					return -1 === e ? (t._resourceManager = this, this._resources.push(t), this.addSize(t.memorySize), !0) : !1
				}, e.removeResource = function(t)
				{
					var e = this._resources.indexOf(t);
					return -1 !== e ? (this._resources.splice(e, 1), t._resourceManager = null, this._memorySize -= t.memorySize, !0) : !1
				}, e.unload = function()
				{
					for (var t = this._resources.slice(0, this._resources.length), e = 0; e < t.length; e++)
					{
						var i = t[e];
						i.dispose()
					}
					t.length = 0
				}, e.setUniqueName = function(e)
				{
					for (var i = !0, n = 0; n < t._resourceManagers.length; n++)
						if (t._resourceManagers[n]._name === e && t._resourceManagers[n] !== this) return void(i = !1);
					i ? this.name != e && (this.name = e, t._isResourceManagersSorted = !1) : this.setUniqueName(e.concat("-copy"))
				}, e.dispose = function()
				{
					if (this === t._systemResourceManager) throw new Error("systemResourceManager不能被释放！");
					t._resourceManagers.splice(t._resourceManagers.indexOf(this), 1), t._isResourceManagersSorted = !1;
					for (var e = this._resources.slice(0, this._resources.length), i = 0; i < e.length; i++)
					{
						var n = e[i];
						n.resourceManager.removeResource(n), n.dispose()
					}
					e.length = 0
				}, e.addSize = function(t)
				{
					t && (this.autoRelease && t > 0 && this._memorySize + t > this.autoReleaseMaxSize && this.garbageCollection((1 - this._garbageCollectionRate) * this.autoReleaseMaxSize), this._memorySize += t)
				}, e.garbageCollection = function(t)
				{
					var e = this._resources;
					e = e.slice(), e.sort(function(t, e)
					{
						if (!t || !e) throw new Error("a或b不能为空！");
						return t.released && e.released ? 0 : t.released ? 1 : e.released ? -1 : t.lastUseFrameCount - e.lastUseFrameCount
					});
					for (var i = Stat.loopCount, n = 0, s = e.length; s > n; n++)
					{
						var r = e[n];
						if (!(i - r.lastUseFrameCount > 1)) return void(this._memorySize >= t && (this._isOverflow = !0));
						if (r.releaseResource(), this._memorySize < t) return void(this._isOverflow = !1)
					}
				}, __getset(0, e, "id", function()
				{
					return this._id
				}), __getset(0, e, "name", function()
				{
					return this._name
				}, function(e)
				{
					!e && "" === e || this._name === e || (this._name = e, t._isResourceManagersSorted = !1)
				}), __getset(0, e, "memorySize", function()
				{
					return this._memorySize
				}), __getset(1, t, "sortedResourceManagersByName", function()
				{
					return t._isResourceManagersSorted || (t._isResourceManagersSorted = !0, t._resourceManagers.sort(t.compareResourceManagersByName)), t._resourceManagers
				}), __getset(1, t, "systemResourceManager", function()
				{
					return null === t._systemResourceManager && (t._systemResourceManager = new t, t._systemResourceManager._name = "System Resource Manager"), t._systemResourceManager
				}), t.__init__ = function()
				{
					t.currentResourceManager = t.systemResourceManager
				}, t.getLoadedResourceManagerByIndex = function(e)
				{
					return t._resourceManagers[e]
				}, t.getLoadedResourceManagersCount = function()
				{
					return t._resourceManagers.length
				}, t.recreateContentManagers = function(e)
				{
					void 0 === e && (e = !1);
					for (var i = t.currentResourceManager, n = 0; n < t._resourceManagers.length; n++)
					{
						t.currentResourceManager = t._resourceManagers[n];
						for (var s = 0; s < t.currentResourceManager._resources.length; s++) t.currentResourceManager._resources[s].releaseResource(e), t.currentResourceManager._resources[s].activeResource(e)
					}
					t.currentResourceManager = i
				}, t.releaseContentManagers = function(e)
				{
					void 0 === e && (e = !1);
					for (var i = t.currentResourceManager, n = 0; n < t._resourceManagers.length; n++)
					{
						t.currentResourceManager = t._resourceManagers[n];
						for (var s = 0; s < t.currentResourceManager._resources.length; s++)
						{
							var r = t.currentResourceManager._resources[s];
							!r.released && r.releaseResource(e)
						}
					}
					t.currentResourceManager = i
				}, t.compareResourceManagersByName = function(t, e)
				{
					if (t == e) return 0;
					var i = t._name,
						n = e._name;
					if (null == i) return null == n ? 0 : -1;
					if (null == n) return 1;
					var s = i.localeCompare(n);
					return 0 != s ? s : (e.setUniqueName(n), n = e._name, i.localeCompare(n))
				}, t._uniqueIDCounter = 0, t._systemResourceManager = null, t._isResourceManagersSorted = !1, t._resourceManagers = [], t.currentResourceManager = null, t
			}(),
			WXCanvas = function()
			{
				function t(t)
				{
					this._ctx = null, this._id = null, this.style = {}, this._id = t
				}
				__class(t, "laya.resource.WXCanvas");
				var e = t.prototype;
				return e.getContext = function()
				{
					var t = laya.resource.WXCanvas.wx,
						e = t.createContext();
					return e.id = this._id, e.fillRect = function(t, e, i, n)
					{
						this.rect(t, e, i, n), this.fill()
					}, e.strokeRect = function(t, e, i, n)
					{
						this.rect(t, e, i, n), this.stroke()
					}, e.___drawImage = e.drawImage, e.drawImage = function()
					{
						var t = arguments[0].tempFilePath;
						if (null != t) switch (arguments.length)
						{
							case 3:
								return void this.___drawImage(t, arguments[1], arguments[2], arguments[0].width, arguments[0].height);
							case 5:
								return void this.___drawImage(t, arguments[1], arguments[2], arguments[3], arguments[4]);
							case 9:
								return void this.___drawImage(t, arguments[5], arguments[6], arguments[7], arguments[8])
						}
					}, Object.defineProperty(e, "strokeStyle",
					{
						set: function(t)
						{
							this.setStrokeStyle(t)
						},
						enumerable: !1
					}), Object.defineProperty(e, "fillStyle",
					{
						set: function(t)
						{
							this.setFillStyle(t)
						},
						enumerable: !1
					}), Object.defineProperty(e, "fontSize",
					{
						set: function(t)
						{
							this.setFontSize(t)
						},
						enumerable: !1
					}), Object.defineProperty(e, "lineWidth",
					{
						set: function(t)
						{
							this.setLineWidth(t)
						},
						enumerable: !1
					}), Context.__init__(e), e.flush = function()
					{
						t.drawCanvas(
						{
							canvasId: this.id,
							actions: this.getActions()
						})
					}, e
				}, e.oncontextmenu = function(t) {}, e.addEventListener = function() {}, __getset(0, e, "id", function()
				{
					return this._id
				}, function(t)
				{
					this._id = t
				}), t.wx = null, t
			}(),
			System = function()
			{
				function System()
				{}
				return __class(System, "laya.system.System"), System.changeDefinition = function(name, classObj)
				{
					Laya[name] = classObj;
					var str = name + "=classObj";
					eval(str)
				}, System.__init__ = function()
				{
					Render.isConchApp && (conch.disableConchResManager(), conch.disableConchAutoRestoreLostedDevice())
				}, System
			}(),
			Browser = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.Browser"), __getset(1, t, "clientWidth", function()
				{
					return t.__init__(), t.window.innerWidth || t.document.body.clientWidth
				}), __getset(1, t, "clientHeight", function()
				{
					return t.__init__(), t.window.innerHeight || t.document.body.clientHeight || t.document.documentElement.clientHeight
				}), __getset(1, t, "window", function()
				{
					return t.__init__(), t._window
				}), __getset(1, t, "pixelRatio", function()
				{
					return t.__init__(), RunDriver.getPixelRatio()
				}), __getset(1, t, "width", function()
				{
					return t.__init__(), (Laya.stage && Laya.stage.canvasRotation ? t.clientHeight : t.clientWidth) * t.pixelRatio
				}), __getset(1, t, "height", function()
				{
					return t.__init__(), (Laya.stage && Laya.stage.canvasRotation ? t.clientWidth : t.clientHeight) * t.pixelRatio
				}), __getset(1, t, "container", function()
				{
					return t.__init__(), t._container || (t._container = t.createElement("div"), t._container.id = "layaContainer", t._container.style.cssText = "width:100%;height:100%", t.document.body.appendChild(t._container)), t._container
				}, function(e)
				{
					t._container = e
				}), __getset(1, t, "document", function()
				{
					return t.__init__(), t._document
				}), t.__init__ = function()
				{
					if (!t._window)
					{
						t._window = RunDriver.getWindow(), t._document = t.window.document, t.document.__createElement = t.document.createElement, window.requestAnimationFrame = function()
						{
							return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(t)
							{
								return window.setTimeout(t, 1e3 / 60)
							}
						}();
						var e = window.document.body.style;
						e.margin = 0, e.overflow = "hidden";
						for (var i = window.document.getElementsByTagName("meta"), n = 0, s = !1, r = "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"; n < i.length;)
						{
							var a = i[n];
							if ("viewport" == a.name)
							{
								a.content = r, s = !0;
								break
							}
							n++
						}
						s || (a = document.createElement("meta"), a.name = "viewport", a.content = r, document.getElementsByTagName("head")[0].appendChild(a)), t.userAgent = t.window.navigator.userAgent, t.u = t.userAgent, t.onIOS = !!t.u.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/), t.onMobile = t.u.indexOf("Mobile") > -1, t.onIPhone = t.u.indexOf("iPhone") > -1, t.onIPad = t.u.indexOf("iPad") > -1, t.onAndriod = t.u.indexOf("Android") > -1 || t.u.indexOf("Adr") > -1, t.onWP = t.u.indexOf("Windows Phone") > -1, t.onQQBrowser = t.u.indexOf("QQBrowser") > -1, t.onMQQBrowser = t.u.indexOf("MQQBrowser") > -1, t.onWeiXin = t.u.indexOf("MicroMessenger") > -1, t.onPC = !t.onMobile, t.onSafari = !!t.u.match(/Version\/\d\.\d\x20Mobile\/\S+\x20Safari/), t.httpProtocol = "http:" == t.window.location.protocol, t.webAudioEnabled = !!(t.window.AudioContext || t.window.webkitAudioContext || t.window.mozAudioContext), t.soundType = t.webAudioEnabled ? "WEBAUDIOSOUND" : "AUDIOSOUND", Sound = t.webAudioEnabled ? WebAudioSound : AudioSound, t.webAudioEnabled && WebAudioSound.initWebAudio(), t.enableTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, window.focus(), SoundManager._soundClass = Sound;
						var o = null;
						if (t.window.MainCanvasID)
						{
							var h = wx;
							if (h && !h.createContext && (h = null), null != (WXCanvas.wx = h))
							{
								o = new WXCanvas(t.window.MainCanvasID);
								var l = Context.prototype;
								l.flush = null, t.window.Image = function()
								{
									this.setSrc = function(t)
									{
										this.__src = t;
										this.success()
									}, this.success = function(t)
									{
										this.width = 200, this.height = 200, this.tempFilePath = t ? t.tempFilePath : this.__src, this.onload && this.onload()
									}, this.getSrc = function()
									{
										return this.__src
									}, Object.defineProperty(this, "src",
									{
										get: this.getSrc,
										set: this.setSrc,
										enumerable: !1
									})
								}
							}
							else o = t.document.getElementById(t.window.MainCanvasID)
						}
						Render._mainCanvas = Render._mainCanvas || HTMLCanvas.create("2D", o), t.canvas || (t.canvas = HTMLCanvas.create("2D"), t.context = t.canvas.getContext("2d"))
					}
				}, t.createElement = function(e)
				{
					return t.__init__(), t.document.__createElement(e)
				}, t.getElementById = function(e)
				{
					return t.__init__(), t.document.getElementById(e)
				}, t.removeElement = function(t)
				{
					t && t.parentNode && t.parentNode.removeChild(t)
				}, t.now = function()
				{
					return RunDriver.now()
				}, t._window = null, t._document = null, t._container = null, t.userAgent = null, t.u = null, t.onIOS = !1, t.onMobile = !1, t.onIPhone = !1, t.onIPad = !1, t.onAndriod = !1, t.onWP = !1, t.onQQBrowser = !1, t.onMQQBrowser = !1, t.onSafari = !1, t.onWeiXin = !1, t.onPC = !1, t.httpProtocol = !1, t.webAudioEnabled = !1, t.soundType = null, t.enableTouch = !1, t.canvas = null, t.context = null, t.__init$ = function() {}, t
			}(),
			Byte = function()
			{
				function t(t)
				{
					this._xd_ = !0, this._allocated_ = 8, this._pos_ = 0, this._length = 0, t ? (this._u8d_ = new Uint8Array(t), this._d_ = new DataView(this._u8d_.buffer), this._length = this._d_.byteLength) : this.___resizeBuffer(this._allocated_)
				}
				__class(t, "laya.utils.Byte");
				var e = t.prototype;
				return e.___resizeBuffer = function(t)
				{
					try
					{
						var e = new Uint8Array(t);
						null != this._u8d_ && (this._u8d_.length <= t ? e.set(this._u8d_) : e.set(this._u8d_.subarray(0, t))), this._u8d_ = e, this._d_ = new DataView(e.buffer)
					}
					catch (i)
					{
						throw "___resizeBuffer err:" + t
					}
				}, e.getString = function()
				{
					return this.rUTF(this.getUint16())
				}, e.getFloat32Array = function(t, e)
				{
					var i = new Float32Array(this._d_.buffer.slice(t, t + e));
					return this._pos_ += e, i
				}, e.getUint8Array = function(t, e)
				{
					var i = new Uint8Array(this._d_.buffer.slice(t, t + e));
					return this._pos_ += e, i
				}, e.getInt16Array = function(t, e)
				{
					var i = new Int16Array(this._d_.buffer.slice(t, t + e));
					return this._pos_ += e, i
				}, e.getFloat32 = function()
				{
					var t = this._d_.getFloat32(this._pos_, this._xd_);
					return this._pos_ += 4, t
				}, e.writeFloat32 = function(t)
				{
					this.ensureWrite(this._pos_ + 4), this._d_.setFloat32(this._pos_, t, this._xd_), this._pos_ += 4
				}, e.getInt32 = function()
				{
					var t = this._d_.getInt32(this._pos_, this._xd_);
					return this._pos_ += 4, t
				}, e.getUint32 = function()
				{
					var t = this._d_.getUint32(this._pos_, this._xd_);
					return this._pos_ += 4, t
				}, e.writeInt32 = function(t)
				{
					this.ensureWrite(this._pos_ + 4), this._d_.setInt32(this._pos_, t, this._xd_), this._pos_ += 4
				}, e.writeUint32 = function(t)
				{
					this.ensureWrite(this._pos_ + 4), this._d_.setUint32(this._pos_, t, this._xd_), this._pos_ += 4
				}, e.getInt16 = function()
				{
					var t = this._d_.getInt16(this._pos_, this._xd_);
					return this._pos_ += 2, t
				}, e.getUint16 = function()
				{
					var t = this._d_.getUint16(this._pos_, this._xd_);
					return this._pos_ += 2, t
				}, e.writeUint16 = function(t)
				{
					this.ensureWrite(this._pos_ + 2), this._d_.setUint16(this._pos_, t, this._xd_), this._pos_ += 2
				}, e.writeInt16 = function(t)
				{
					this.ensureWrite(this._pos_ + 2), this._d_.setInt16(this._pos_, t, this._xd_), this._pos_ += 2
				}, e.getUint8 = function()
				{
					return this._d_.getUint8(this._pos_++)
				}, e.writeUint8 = function(t)
				{
					this.ensureWrite(this._pos_ + 1), this._d_.setUint8(this._pos_, t, this._xd_), this._pos_++
				}, e._getUInt8 = function(t)
				{
					return this._d_.getUint8(t)
				}, e._getUint16 = function(t)
				{
					return this._d_.getUint16(t, this._xd_)
				}, e._getMatrix = function()
				{
					var t = new Matrix(this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32());
					return t
				}, e.rUTF = function(t)
				{
					for (var e = "", i = this._pos_ + t, n = 0, s = 0, r = 0, a = String.fromCharCode, o = this._u8d_, h = 0; this._pos_ < i;) n = o[this._pos_++], 128 > n ? 0 != n && (e += a(n)) : 224 > n ? e += a((63 & n) << 6 | 127 & o[this._pos_++]) : 240 > n ? (s = o[this._pos_++], e += a((31 & n) << 12 | (127 & s) << 6 | 127 & o[this._pos_++])) : (s = o[this._pos_++], r = o[this._pos_++], e += a((15 & n) << 18 | (127 & s) << 12 | r << 6 & 127 | 127 & o[this._pos_++])), h++;
					return e
				}, e.getCustomString = function(t)
				{
					for (var e = "", i = 0, n = 0, s = 0, r = String.fromCharCode, a = this._u8d_; t > 0;)
						if (n = a[this._pos_], 128 > n) e += r(n), this._pos_++, t--;
						else
							for (i = n - 128, this._pos_++, t -= i; i > 0;) n = a[this._pos_++], s = a[this._pos_++], e += r(s << 8 | n), i--;
					return e
				}, e.clear = function()
				{
					this._pos_ = 0, this.length = 0
				}, e.__getBuffer = function()
				{
					return this._d_.buffer
				}, e.writeUTFBytes = function(t)
				{
					t += "";
					for (var e = 0, i = t.length; i > e; e++)
					{
						var n = t.charCodeAt(e);
						127 >= n ? this.writeByte(n) : 2047 >= n ? (this.writeByte(192 | n >> 6), this.writeByte(128 | 63 & n)) : 65535 >= n ? (this.writeByte(224 | n >> 12), this.writeByte(128 | n >> 6 & 63), this.writeByte(128 | 63 & n)) : (this.writeByte(240 | n >> 18), this.writeByte(128 | n >> 12 & 63), this.writeByte(128 | n >> 6 & 63), this.writeByte(128 | 63 & n))
					}
				}, e.writeUTFString = function(t)
				{
					var e = 0;
					e = this.pos, this.writeUint16(1), this.writeUTFBytes(t);
					var i = 0;
					i = this.pos - e - 2, this._d_.setUint16(e, i, this._xd_)
				}, e.readUTFString = function()
				{
					var t = 0;
					t = this.pos;
					var e = 0;
					return e = this.getUint16(), this.readUTFBytes(e)
				}, e.getUTFString = function()
				{
					return this.readUTFString()
				}, e.readUTFBytes = function(t)
				{
					return void 0 === t && (t = -1), 0 == t ? "" : (t = t > 0 ? t : this.bytesAvailable, this.rUTF(t))
				}, e.getUTFBytes = function(t)
				{
					return void 0 === t && (t = -1), this.readUTFBytes(t)
				}, e.writeByte = function(t)
				{
					this.ensureWrite(this._pos_ + 1), this._d_.setInt8(this._pos_, t), this._pos_ += 1
				}, e.readByte = function()
				{
					return this._d_.getInt8(this._pos_++)
				}, e.getByte = function()
				{
					return this.readByte()
				}, e.ensureWrite = function(t)
				{
					this._length < t && (this._length = t), this._allocated_ < t && (this.length = t)
				}, e.writeArrayBuffer = function(t, e, i)
				{
					if (void 0 === e && (e = 0), void 0 === i && (i = 0), 0 > e || 0 > i) throw "writeArrayBuffer error - Out of bounds";
					0 == i && (i = t.byteLength - e), this.ensureWrite(this._pos_ + i);
					var n = new Uint8Array(t);
					this._u8d_.set(n.subarray(e, e + i), this._pos_), this._pos_ += i
				}, __getset(0, e, "buffer", function()
				{
					var t = this._d_.buffer;
					return t.byteLength == this.length ? t : t.slice(0, this.length)
				}), __getset(0, e, "endian", function()
				{
					return this._xd_ ? "littleEndian" : "bigEndian"
				}, function(t)
				{
					this._xd_ = "littleEndian" == t
				}), __getset(0, e, "bytesAvailable", function()
				{
					return this.length - this._pos_
				}), __getset(0, e, "length", function()
				{
					return this._length
				}, function(t)
				{
					this._allocated_ < t ? this.___resizeBuffer(this._allocated_ = Math.floor(Math.max(t, 2 * this._allocated_))) : this._allocated_ > t && this.___resizeBuffer(this._allocated_ = t), this._length = t
				}), __getset(0, e, "pos", function()
				{
					return this._pos_
				}, function(t)
				{
					this._pos_ = t, this._d_.byteOffset = t
				}), t.getSystemEndian = function()
				{
					if (!t._sysEndian)
					{
						var e = new ArrayBuffer(2);
						new DataView(e).setInt16(0, 256, !0), t._sysEndian = 256 === new Int16Array(e)[0] ? "littleEndian" : "bigEndian"
					}
					return t._sysEndian
				}, t.BIG_ENDIAN = "bigEndian", t.LITTLE_ENDIAN = "littleEndian", t._sysEndian = null, t
			}(),
			CacheManger = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.CacheManger"), t.regCacheByFunction = function(e, i)
				{
					t.unRegCacheByFunction(e, i);
					var n;
					n = {
						tryDispose: e,
						getCacheList: i
					}, t._cacheList.push(n)
				}, t.unRegCacheByFunction = function(e, i)
				{
					var n = 0,
						s = 0;
					for (s = t._cacheList.length, n = 0; s > n; n++)
						if (t._cacheList[n].tryDispose == e && t._cacheList[n].getCacheList == i) return void t._cacheList.splice(n, 1)
				}, t.forceDispose = function()
				{
					var e = 0,
						i = t._cacheList.length;
					for (e = 0; i > e; e++) t._cacheList[e].tryDispose(!0)
				}, t.beginCheck = function(e)
				{
					void 0 === e && (e = 15e3), Laya.timer.loop(e, null, t._checkLoop)
				}, t.stopCheck = function()
				{
					Laya.timer.clear(null, t._checkLoop)
				}, t._checkLoop = function()
				{
					var e = t._cacheList;
					if (!(e.length < 1))
					{
						var i = Browser.now(),
							n = 0,
							s = 0;
						for (s = n = e.length; n > 0 && (t._index++, t._index = t._index % s, e[t._index].tryDispose(!1), !(Browser.now() - i > t.loopTimeLimit));) n--
					}
				}, t.loopTimeLimit = 2, t._cacheList = [], t._index = 0, t
			}(),
			ClassUtils = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.ClassUtils"), t.regClass = function(e, i)
				{
					t._classMap[e] = i
				}, t.getRegClass = function(e)
				{
					return t._classMap[e]
				}, t.getInstance = function(e)
				{
					var i = t.getClass(e);
					return i ? new i : (console.log("[error] Undefined class:", e), null)
				}, t.createByJson = function(e, i, n, s, r)
				{
					"string" == typeof e && (e = JSON.parse(e));
					var a = e.props;
					if (!i && (i = r ? r.runWith(e.instanceParams) : t.getInstance(a.runtime || e.type), !i)) return null;
					var o = e.child;
					if (o)
						for (var h = 0, l = o.length; l > h; h++)
						{
							var u = o[h];
							if ("render" !== u.props.name && "render" !== u.props.renderType || !i._$set_itemRender)
								if ("Graphic" == u.type) t.addGraphicsToSprite(u, i);
								else if (t.isDrawType(u.type)) t.addGraphicToSprite(u, i, !0);
							else
							{
								var c = t.createByJson(u, null, n, s, r);
								"Script" == u.type ? c.owner = i : "mask" == u.props.renderType ? i.mask = c : i.addChild(c)
							}
							else i.itemRender = u
						}
					if (a)
						for (var _ in a)
						{
							var d = a[_];
							"var" === _ && n ? n[d] = i : d instanceof Array && "function" == typeof i[_] ? i[_].apply(i, d) : i[_] = d
						}
					var f = e.customProps;
					if (s && f)
						for (_ in f) d = f[_], s.runWith([i, _, d]);
					return i.created && i.created(), i
				}, t.addGraphicsToSprite = function(e, i)
				{
					var n;
					if (n = e.child, n && !(n.length < 1))
					{
						var s;
						s = t._getGraphicsFromSprite(e, i);
						var r = 0,
							a = 0;
						e.props && (r = t._getObjVar(e.props, "x", 0), a = t._getObjVar(e.props, "y", 0)), 0 != r && 0 != a && s.translate(r, a);
						var o = 0,
							h = 0;
						for (h = n.length, o = 0; h > o; o++) t._addGraphicToGraphics(n[o], s);
						0 != r && 0 != a && s.translate(-r, -a)
					}
				}, t.addGraphicToSprite = function(e, i, n)
				{
					void 0 === n && (n = !1);
					var s;
					s = n ? t._getGraphicsFromSprite(e, i) : i.graphics, t._addGraphicToGraphics(e, s)
				}, t._getGraphicsFromSprite = function(t, e)
				{
					var i;
					if (!t || !t.props) return e.graphics;
					var n;
					switch (n = t.props.renderType)
					{
						case "hit":
						case "unHit":
							var s;
							e.hitArea || (e.hitArea = new HitArea), s = e.hitArea, s[n] || (s[n] = new Graphics), i = s[n]
					}
					return i || (i = e.graphics), i
				}, t._getTransformData = function(e)
				{
					var i;
					(e.hasOwnProperty("pivotX") || e.hasOwnProperty("pivotY")) && (i = i || new Matrix, i.translate(-t._getObjVar(e, "pivotX", 0), -t._getObjVar(e, "pivotY", 0)));
					var n = t._getObjVar(e, "scaleX", 1),
						s = t._getObjVar(e, "scaleY", 1),
						r = t._getObjVar(e, "rotation", 0);
					t._getObjVar(e, "skewX", 0), t._getObjVar(e, "skewY", 0);
					return 1 == n && 1 == s && 0 == r || (i = i || new Matrix, i.scale(n, s), i.rotate(.0174532922222222 * r)), i
				}, t._addGraphicToGraphics = function(e, i)
				{
					var n;
					if (n = e.props)
					{
						var s;
						if (s = t.DrawTypeDic[e.type])
						{
							var r;
							r = i;
							var a, o = t._getParams(n, s[1], s[2], s[3]);
							a = o.m, a && (r.save(), r.transform(a)), r[s[0]].apply(r, o), a && r.restore()
						}
					}
				}, t._adptLineData = function(t)
				{
					return t[2] = parseFloat(t[0]) + parseFloat(t[2]), t[3] = parseFloat(t[1]) + parseFloat(t[3]), t
				}, t._adptTextureData = function(t)
				{
					return t[0] = Loader.getRes(t[0]), t
				}, t._adptLinesData = function(e)
				{
					return e[2] = t._getPointListByStr(e[2]), e
				}, t.isDrawType = function(e)
				{
					return "Image" == e ? !1 : t.DrawTypeDic.hasOwnProperty(e)
				}, t._getParams = function(e, i, n, s)
				{
					void 0 === n && (n = 0);
					var r;
					r = t._temParam, r.length = i.length;
					var a = 0,
						o = 0;
					for (o = i.length, a = 0; o > a; a++) r[a] = t._getObjVar(e, i[a][0], i[a][1]);
					var h;
					return h = t._getTransformData(e), h ? (n || (n = 0), h.translate(r[n], r[n + 1]), r[n] = r[n + 1] = 0, r.m = h) : r.map = null, s && t[s] && (r = t[s](r)), r
				}, t._getPointListByStr = function(t)
				{
					var e;
					e = t.split(",");
					var i = 0,
						n = 0;
					for (n = e.length, i = 0; n > i; i++) e[i] = parseFloat(e[i]);
					return e
				}, t._getObjVar = function(t, e, i)
				{
					return t.hasOwnProperty(e) ? t[e] : i
				}, t._temParam = [], t._classMap = {
					Sprite: "laya.display.Sprite",
					Text: "laya.display.Text",
					Animation: "laya.display.Animation",
					Skeleton: "laya.ani.bone.Skeleton",
					Particle2D: "laya.particle.Particle2D",
					div: "laya.html.dom.HTMLDivElement",
					img: "laya.html.dom.HTMLImageElement",
					span: "laya.html.dom.HTMLElement",
					br: "laya.html.dom.HTMLBrElement",
					style: "laya.html.dom.HTMLStyleElement",
					font: "laya.html.dom.HTMLElement",
					a: "laya.html.dom.HTMLElement",
					"#text": "laya.html.dom.HTMLElement"
				}, t.getClass = function(e)
				{
					var i = t._classMap[e] || e;
					return "string" == typeof i ? Laya.__classmap[i] : i
				}, __static(t, ["DrawTypeDic", function()
				{
					return this.DrawTypeDic = {
						Rect: ["drawRect", [
							["x", 0],
							["y", 0],
							["width", 0],
							["height", 0],
							["fillColor", null],
							["lineColor", null],
							["lineWidth", 1]
						]],
						Circle: ["drawCircle", [
							["x", 0],
							["y", 0],
							["radius", 0],
							["fillColor", null],
							["lineColor", null],
							["lineWidth", 1]
						]],
						Pie: ["drawPie", [
							["x", 0],
							["y", 0],
							["radius", 0],
							["startAngle", 0],
							["endAngle", 0],
							["fillColor", null],
							["lineColor", null],
							["lineWidth", 1]
						]],
						Image: ["drawTexture", [
							["x", 0],
							["y", 0],
							["width", 0],
							["height", 0]
						]],
						Texture: ["drawTexture", [
							["skin", null],
							["x", 0],
							["y", 0],
							["width", 0],
							["height", 0]
						], 1, "_adptTextureData"],
						FillTexture: ["fillTexture", [
							["skin", null],
							["x", 0],
							["y", 0],
							["width", 0],
							["height", 0],
							["repeat", null]
						], 1, "_adptTextureData"],
						FillText: ["fillText", [
							["text", ""],
							["x", 0],
							["y", 0],
							["font", null],
							["color", null],
							["textAlign", null]
						], 1],
						Line: ["drawLine", [
							["x", 0],
							["y", 0],
							["toX", 0],
							["toY", 0],
							["lineColor", null],
							["lineWidth", 0]
						], 0, "_adptLineData"],
						Lines: ["drawLines", [
							["x", 0],
							["y", 0],
							["points", ""],
							["lineColor", null],
							["lineWidth", 0]
						], 0, "_adptLinesData"],
						Curves: ["drawCurves", [
							["x", 0],
							["y", 0],
							["points", ""],
							["lineColor", null],
							["lineWidth", 0]
						], 0, "_adptLinesData"],
						Poly: ["drawPoly", [
							["x", 0],
							["y", 0],
							["points", ""],
							["fillColor", null],
							["lineColor", null],
							["lineWidth", 1]
						], 0, "_adptLinesData"]
					}
				}]), t
			}(),
			Color = function()
			{
				function t(e)
				{
					if (this._color = [], "string" == typeof e)
					{
						this.strColor = e, null === e && (e = "#000000"), "#" == e.charAt(0) && (e = e.substr(1));
						var i = this.numColor = parseInt(e, 16),
							n = 8 == e.length;
						if (n) return void(this._color = [parseInt(e.substr(0, 2), 16) / 255, ((16711680 & i) >> 16) / 255, ((65280 & i) >> 8) / 255, (255 & i) / 255])
					}
					else i = this.numColor = e, this.strColor = Utils.toHexColor(i);
					this._color = [((16711680 & i) >> 16) / 255, ((65280 & i) >> 8) / 255, (255 & i) / 255, 1], this._color.__id = ++t._COLODID
				}
				return __class(t, "laya.utils.Color"), t._initDefault = function()
				{
					t._DEFAULT = {};
					for (var e in t._COLOR_MAP) t._SAVE[e] = t._DEFAULT[e] = new t(t._COLOR_MAP[e]);
					return t._DEFAULT
				}, t._initSaveMap = function()
				{
					t._SAVE_SIZE = 0, t._SAVE = {};
					for (var e in t._DEFAULT) t._SAVE[e] = t._DEFAULT[e]
				}, t.create = function(e)
				{
					var i = t._SAVE[e + ""];
					return null != i ? i : (t._SAVE_SIZE < 1e3 || t._initSaveMap(), t._SAVE[e + ""] = new t(e))
				}, t._SAVE = {}, t._SAVE_SIZE = 0, t._COLOR_MAP = {
					white: "#FFFFFF",
					red: "#FF0000",
					green: "#00FF00",
					blue: "#0000FF",
					black: "#000000",
					yellow: "#FFFF00",
					gray: "#AAAAAA"
				}, t._DEFAULT = t._initDefault(), t._COLODID = 1, t
			}(),
			Dictionary = function()
			{
				function t()
				{
					this._values = [], this._keys = []
				}
				__class(t, "laya.utils.Dictionary");
				var e = t.prototype;
				return e.set = function(t, e)
				{
					var i = this.indexOf(t);
					return i >= 0 ? void(this._values[i] = e) : (this._keys.push(t), void this._values.push(e))
				}, e.indexOf = function(t)
				{
					var e = this._keys.indexOf(t);
					return e >= 0 ? e : (t = "string" == typeof t ? Number(t) : "number" == typeof t ? t.toString() : t, this._keys.indexOf(t))
				}, e.get = function(t)
				{
					var e = this.indexOf(t);
					return 0 > e ? null : this._values[e]
				}, e.remove = function(t)
				{
					var e = this.indexOf(t);
					return e >= 0 ? (this._keys.splice(e, 1), this._values.splice(e, 1), !0) : !1
				}, e.clear = function()
				{
					this._values.length = 0, this._keys.length = 0
				}, __getset(0, e, "values", function()
				{
					return this._values
				}), __getset(0, e, "keys", function()
				{
					return this._keys
				}), t
			}(),
			Dragging = function()
			{
				function t()
				{
					this.ratio = .92, this.maxOffset = 60, this._dragging = !1, this._clickOnly = !0
				}
				__class(t, "laya.utils.Dragging");
				var e = t.prototype;
				return e.start = function(t, e, i, n, s, r, a)
				{
					this.clearTimer(), this.target = t, this.area = e, this.hasInertia = i, this.elasticDistance = n, this.elasticBackTime = s, this.data = r, this._disableMouseEvent = a, this._clickOnly = !0, this._dragging = !0, this._elasticRateX = this._elasticRateY = 1, this._lastX = Laya.stage.mouseX, this._lastY = Laya.stage.mouseY, Laya.stage.on("mouseup", this, this.onStageMouseUp), Laya.stage.on("mouseout", this, this.onStageMouseUp), Laya.timer.frameLoop(1, this, this.loop)
				}, e.clearTimer = function()
				{
					Laya.timer.clear(this, this.loop), Laya.timer.clear(this, this.tweenMove), this._tween && (this._tween.recover(), this._tween = null)
				}, e.stop = function()
				{
					this._dragging && (MouseManager.instance.disableMouseEvent = !1, Laya.stage.off("mouseup", this, this.onStageMouseUp), Laya.stage.off("mouseout", this, this.onStageMouseUp), this._dragging = !1, this.target && this.area && this.backToArea(), this.clear())
				}, e.loop = function()
				{
					var t = Laya.stage.mouseX,
						e = Laya.stage.mouseY,
						i = t - this._lastX,
						n = e - this._lastY;
					if (this._clickOnly)
					{
						if (!(Math.abs(i * Laya.stage._canvasTransform.getScaleX()) > 1 || Math.abs(n * Laya.stage._canvasTransform.getScaleY()) > 1)) return;
						this._clickOnly = !1, this._offsets || (this._offsets = []), this._offsets.length = 0, this.target.event("dragstart", this.data), MouseManager.instance.disableMouseEvent = this._disableMouseEvent, this.target._set$P("$_MOUSEDOWN", !1)
					}
					else this._offsets.push(i, n);
					0 === i && 0 === n || (this._lastX = t, this._lastY = e, this.target.x += i * this._elasticRateX, this.target.y += n * this._elasticRateY, this.area && this.checkArea(), this.target.event("dragmove", this.data))
				}, e.checkArea = function()
				{
					if (this.elasticDistance <= 0) this.backToArea();
					else
					{
						if (this.target.x < this.area.x) var t = this.area.x - this.target.x;
						else t = this.target.x > this.area.x + this.area.width ? this.target.x - this.area.x - this.area.width : 0;
						if (this._elasticRateX = Math.max(0, 1 - t / this.elasticDistance), this.target.y < this.area.y) var e = this.area.y - this.target.y;
						else e = this.target.y > this.area.y + this.area.height ? this.target.y - this.area.y - this.area.height : 0;
						this._elasticRateY = Math.max(0, 1 - e / this.elasticDistance)
					}
				}, e.backToArea = function()
				{
					this.target.x = Math.min(Math.max(this.target.x, this.area.x), this.area.x + this.area.width), this.target.y = Math.min(Math.max(this.target.y, this.area.y), this.area.y + this.area.height)
				}, e.onStageMouseUp = function(t)
				{
					if (MouseManager.instance.disableMouseEvent = !1, Laya.stage.off("mouseup", this, this.onStageMouseUp), Laya.stage.off("mouseout", this, this.onStageMouseUp), Laya.timer.clear(this, this.loop), !this._clickOnly && this.target)
						if (this.hasInertia)
						{
							this._offsets.length < 1 && this._offsets.push(Laya.stage.mouseX - this._lastX, Laya.stage.mouseY - this._lastY), this._offsetX = this._offsetY = 0;
							for (var e = this._offsets.length, i = Math.min(e, 6), n = this._offsets.length - i, s = e - 1; s > n; s--) this._offsetY += this._offsets[s--], this._offsetX += this._offsets[s];
							this._offsetX = this._offsetX / i * 2, this._offsetY = this._offsetY / i * 2, Math.abs(this._offsetX) > this.maxOffset && (this._offsetX = this._offsetX > 0 ? this.maxOffset : -this.maxOffset), Math.abs(this._offsetY) > this.maxOffset && (this._offsetY = this._offsetY > 0 ? this.maxOffset : -this.maxOffset), Laya.timer.frameLoop(1, this, this.tweenMove)
						}
						else this.elasticDistance > 0 ? this.checkElastic() : this.clear()
				}, e.checkElastic = function()
				{
					var t = NaN,
						e = NaN;
					if (this.target.x < this.area.x ? t = this.area.x : this.target.x > this.area.x + this.area.width && (t = this.area.x + this.area.width), this.target.y < this.area.y ? e = this.area.y : this.target.y > this.area.y + this.area.height && (e = this.area.y + this.area.height), isNaN(t) && isNaN(e)) this.clear();
					else
					{
						var i = {};
						isNaN(t) || (i.x = t), isNaN(e) || (i.y = e), this._tween = Tween.to(this.target, i, this.elasticBackTime, Ease.sineOut, Handler.create(this, this.clear), 0, !1, !1)
					}
				}, e.tweenMove = function()
				{
					this._offsetX *= this.ratio * this._elasticRateX, this._offsetY *= this.ratio * this._elasticRateY, this.target.x += this._offsetX, this.target.y += this._offsetY, this.area && this.checkArea(), this.target.event("dragmove", this.data), (Math.abs(this._offsetX) < 1 && Math.abs(this._offsetY) < 1 || this._elasticRateX < .5 || this._elasticRateY < .5) && (Laya.timer.clear(this, this.tweenMove), this.elasticDistance > 0 ? this.checkElastic() : this.clear())
				}, e.clear = function()
				{
					if (this.target)
					{
						this.clearTimer();
						var t = this.target;
						this.target = null, t.event("dragend", this.data)
					}
				}, t
			}(),
			Ease = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.Ease"), t.linearNone = function(t, e, i, n)
				{
					return i * t / n + e
				}, t.linearIn = function(t, e, i, n)
				{
					return i * t / n + e
				}, t.linearInOut = function(t, e, i, n)
				{
					return i * t / n + e
				}, t.linearOut = function(t, e, i, n)
				{
					return i * t / n + e
				}, t.bounceIn = function(e, i, n, s)
				{
					return n - t.bounceOut(s - e, 0, n, s) + i
				}, t.bounceInOut = function(e, i, n, s)
				{
					return .5 * s > e ? .5 * t.bounceIn(2 * e, 0, n, s) + i : .5 * t.bounceOut(2 * e - s, 0, n, s) + .5 * n + i
				}, t.bounceOut = function(t, e, i, n)
				{
					return (t /= n) < 1 / 2.75 ? i * (7.5625 * t * t) + e : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
				}, t.backIn = function(t, e, i, n, s)
				{
					return void 0 === s && (s = 1.70158), i * (t /= n) * t * ((s + 1) * t - s) + e
				}, t.backInOut = function(t, e, i, n, s)
				{
					return void 0 === s && (s = 1.70158), (t /= .5 * n) < 1 ? .5 * i * (t * t * (((s *= 1.525) + 1) * t - s)) + e : i / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + e
				}, t.backOut = function(t, e, i, n, s)
				{
					return void 0 === s && (s = 1.70158), i * ((t = t / n - 1) * t * ((s + 1) * t + s) + 1) + e
				}, t.elasticIn = function(e, i, n, s, r, a)
				{
					void 0 === r && (r = 0), void 0 === a && (a = 0);
					var o;
					return 0 == e ? i : 1 == (e /= s) ? i + n : (a || (a = .3 * s), !r || n > 0 && n > r || 0 > n && -n > r ? (r = n, o = a / 4) : o = a / t.PI2 * Math.asin(n / r), -(r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * s - o) * t.PI2 / a)) + i)
				}, t.elasticInOut = function(e, i, n, s, r, a)
				{
					void 0 === r && (r = 0), void 0 === a && (a = 0);
					var o;
					return 0 == e ? i : 2 == (e /= .5 * s) ? i + n : (a || (a = s * (.3 * 1.5)), !r || n > 0 && n > r || 0 > n && -n > r ? (r = n, o = a / 4) : o = a / t.PI2 * Math.asin(n / r), 1 > e ? -.5 * (r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * s - o) * t.PI2 / a)) + i : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * s - o) * t.PI2 / a) * .5 + n + i)
				}, t.elasticOut = function(e, i, n, s, r, a)
				{
					void 0 === r && (r = 0), void 0 === a && (a = 0);
					var o;
					return 0 == e ? i : 1 == (e /= s) ? i + n : (a || (a = .3 * s), !r || n > 0 && n > r || 0 > n && -n > r ? (r = n, o = a / 4) : o = a / t.PI2 * Math.asin(n / r), r * Math.pow(2, -10 * e) * Math.sin((e * s - o) * t.PI2 / a) + n + i)
				}, t.strongIn = function(t, e, i, n)
				{
					return i * (t /= n) * t * t * t * t + e
				}, t.strongInOut = function(t, e, i, n)
				{
					return (t /= .5 * n) < 1 ? .5 * i * t * t * t * t * t + e : .5 * i * ((t -= 2) * t * t * t * t + 2) + e
				}, t.strongOut = function(t, e, i, n)
				{
					return i * ((t = t / n - 1) * t * t * t * t + 1) + e
				}, t.sineInOut = function(t, e, i, n)
				{
					return .5 * -i * (Math.cos(Math.PI * t / n) - 1) + e
				}, t.sineIn = function(e, i, n, s)
				{
					return -n * Math.cos(e / s * t.HALF_PI) + n + i
				}, t.sineOut = function(e, i, n, s)
				{
					return n * Math.sin(e / s * t.HALF_PI) + i
				}, t.quintIn = function(t, e, i, n)
				{
					return i * (t /= n) * t * t * t * t + e
				}, t.quintInOut = function(t, e, i, n)
				{
					return (t /= .5 * n) < 1 ? .5 * i * t * t * t * t * t + e : .5 * i * ((t -= 2) * t * t * t * t + 2) + e
				}, t.quintOut = function(t, e, i, n)
				{
					return i * ((t = t / n - 1) * t * t * t * t + 1) + e
				}, t.quartIn = function(t, e, i, n)
				{
					return i * (t /= n) * t * t * t + e
				}, t.quartInOut = function(t, e, i, n)
				{
					return (t /= .5 * n) < 1 ? .5 * i * t * t * t * t + e : .5 * -i * ((t -= 2) * t * t * t - 2) + e
				}, t.quartOut = function(t, e, i, n)
				{
					return -i * ((t = t / n - 1) * t * t * t - 1) + e
				}, t.cubicIn = function(t, e, i, n)
				{
					return i * (t /= n) * t * t + e
				}, t.cubicInOut = function(t, e, i, n)
				{
					return (t /= .5 * n) < 1 ? .5 * i * t * t * t + e : .5 * i * ((t -= 2) * t * t + 2) + e
				}, t.cubicOut = function(t, e, i, n)
				{
					return i * ((t = t / n - 1) * t * t + 1) + e
				}, t.quadIn = function(t, e, i, n)
				{
					return i * (t /= n) * t + e
				}, t.quadInOut = function(t, e, i, n)
				{
					return (t /= .5 * n) < 1 ? .5 * i * t * t + e : .5 * -i * (--t * (t - 2) - 1) + e
				}, t.quadOut = function(t, e, i, n)
				{
					return -i * (t /= n) * (t - 2) + e
				}, t.expoIn = function(t, e, i, n)
				{
					return 0 == t ? e : i * Math.pow(2, 10 * (t / n - 1)) + e - .001 * i
				}, t.expoInOut = function(t, e, i, n)
				{
					return 0 == t ? e : t == n ? e + i : (t /= .5 * n) < 1 ? .5 * i * Math.pow(2, 10 * (t - 1)) + e : .5 * i * (-Math.pow(2, -10 * --t) + 2) + e
				}, t.expoOut = function(t, e, i, n)
				{
					return t == n ? e + i : i * (-Math.pow(2, -10 * t / n) + 1) + e
				}, t.circIn = function(t, e, i, n)
				{
					return -i * (Math.sqrt(1 - (t /= n) * t) - 1) + e
				}, t.circInOut = function(t, e, i, n)
				{
					return (t /= .5 * n) < 1 ? .5 * -i * (Math.sqrt(1 - t * t) - 1) + e : .5 * i * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
				}, t.circOut = function(t, e, i, n)
				{
					return i * Math.sqrt(1 - (t = t / n - 1) * t) + e
				}, t.HALF_PI = .5 * Math.PI, t.PI2 = 2 * Math.PI, t
			}(),
			HitArea = function()
			{
				function t()
				{
					this.hit = null, this.unHit = null
				}
				__class(t, "laya.utils.HitArea");
				var e = t.prototype;
				return e.isHit = function(e, i)
				{
					return t.isHitGraphic(e, i, this.hit) ? !t.isHitGraphic(e, i, this.unHit) : !1
				}, t.isHitGraphic = function(e, i, n)
				{
					if (!n) return !1;
					var s;
					if (s = n.cmds, !s && n._one && (s = t._tCmds, s.length = 1, s[0] = n._one), !s) return !1;
					var r = 0,
						a = 0;
					a = s.length;
					var o;
					for (r = 0; a > r; r++)
						if (o = s[r])
						{
							var h = Render._context;
							switch (o.callee)
							{
								case h._translate:
								case 6:
									e -= o[0], i -= o[1]
							}
							if (t.isHitCmd(e, i, o)) return !0
						}
					return !1
				}, t.isHitCmd = function(e, i, n)
				{
					if (!n) return !1;
					var s = Render._context,
						r = !1;
					switch (n.callee)
					{
						case s._drawRect:
						case 13:
							t._rec.setTo(n[0], n[1], n[2], n[3]), r = t._rec.contains(e, i);
							break;
						case s._drawCircle:
						case s._fillCircle:
						case 14:
							var a = NaN;
							e -= n[0], i -= n[1], a = e * e + i * i, r = a < n[2] * n[2];
							break;
						case s._drawPoly:
						case 18:
							e -= n[0], i -= n[1], r = t.ptInPolygon(e, i, n[2])
					}
					return r
				}, t.ptInPolygon = function(e, i, n)
				{
					var s;
					s = t._ptPoint, s.setTo(e, i);
					var r = 0,
						a = NaN,
						o = NaN,
						h = NaN,
						l = NaN,
						u = 0;
					u = n.length;
					for (var c = 0; u > c; c += 2)
					{
						a = n[c], o = n[c + 1], h = n[(c + 2) % u], l = n[(c + 3) % u];
						n[c], n[(c + 1) % n.length];
						if (o != l && !(s.y < Math.min(o, l) || s.y >= Math.max(o, l)))
						{
							var _ = (s.y - o) * (h - a) / (l - o) + a;
							_ > s.x && r++
						}
					}
					return r % 2 == 1
				}, t._tCmds = [], __static(t, ["_rec", function()
				{
					return this._rec = new Rectangle
				}, "_ptPoint", function()
				{
					return this._ptPoint = new Point
				}]), t
			}(),
			HTMLChar = function()
			{
				function t(e, i, n, s)
				{
					this["char"] = e, this.charNum = e.charCodeAt(0), this._x = this._y = 0, this.width = i, this.height = n, this.style = s, this.isWord = !t._isWordRegExp.test(e)
				}
				__class(t, "laya.utils.HTMLChar");
				var e = t.prototype;
				return Laya.imps(e,
				{
					"laya.display.ILayout": !0
				}), e.setSprite = function(t)
				{
					this._sprite = t
				}, e.getSprite = function()
				{
					return this._sprite
				}, e._isChar = function()
				{
					return !0
				}, e._getCSSStyle = function()
				{
					return this.style
				}, __getset(0, e, "x", function()
				{
					return this._x
				}, function(t)
				{
					this._sprite && (this._sprite.x = t), this._x = t
				}), __getset(0, e, "y", function()
				{
					return this._y
				}, function(t)
				{
					this._sprite && (this._sprite.y = t), this._y = t
				}), __getset(0, e, "width", function()
				{
					return this._w
				}, function(t)
				{
					this._w = t
				}), __getset(0, e, "height", function()
				{
					return this._h
				}, function(t)
				{
					this._h = t
				}), t._isWordRegExp = new RegExp("[\\w.]", ""), t
			}(),
			Log = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.Log"), t.enable = function()
				{
					t._logdiv || (t._logdiv = Browser.window.document.createElement("div"), Browser.window.document.body.appendChild(t._logdiv), t._logdiv.style.cssText = "pointer-events:none;border:white;overflow:hidden;z-index:1000000;background:rgba(100,100,100,0.6);color:white;position: absolute;left:0px;top:0px;width:50%;height:50%;")
				}, t.toggle = function()
				{
					var e = t._logdiv.style;
					"1px" == e.width ? e.width = e.height = "50%" : e.width = e.height = "1px"
				}, t.print = function(e)
				{
					t._logdiv && (t._count >= t.maxCount && t.clear(), t._count++, t._logdiv.innerText += e + "\n", t._logdiv.scrollTop = t._logdiv.scrollHeight)
				}, t.clear = function()
				{
					t._logdiv.innerText = "", t._count = 0
				}, t._logdiv = null, t._count = 0, t.maxCount = 20, t
			}(),
			Mouse = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.Mouse"), __getset(1, t, "cursor", function()
				{
					return t._style.cursor
				}, function(e)
				{
					t._style.cursor = e
				}), t.hide = function()
				{
					"none" != t.cursor && (t._preCursor = t.cursor, t.cursor = "none")
				}, t.show = function()
				{
					"none" == t.cursor && (t._preCursor ? t.cursor = t._preCursor : t.cursor = "auto")
				}, t._preCursor = null, __static(t, ["_style", function()
				{
					return this._style = Browser.document.body.style
				}]), t
			}(),
			Pool = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.Pool"), t.getPoolBySign = function(e)
				{
					return t._poolDic[e] || (t._poolDic[e] = [])
				}, t.clearBySign = function(e)
				{
					t._poolDic[e] && (t._poolDic[e].length = 0)
				}, t.recover = function(e, i)
				{
					i.__InPool || (i.__InPool = !0, t.getPoolBySign(e).push(i))
				}, t.getItemByClass = function(e, i)
				{
					var n = t.getPoolBySign(e),
						s = n.length ? n.pop() : new i;
					return s.__InPool = !1, s
				}, t.getItemByCreateFun = function(e, i)
				{
					var n = t.getPoolBySign(e),
						s = n.length ? n.pop() : i();
					return s.__InPool = !1, s
				}, t.getItem = function(e)
				{
					var i = t.getPoolBySign(e),
						n = i.length ? i.pop() : null;
					return n && (n.__InPool = !1), n
				}, t._poolDic = {}, t.InPoolSign = "__InPool", t
			}(),
			PoolCache = function()
			{
				function t()
				{
					this.sign = null, this.maxCount = 1e3
				}
				__class(t, "laya.utils.PoolCache");
				var e = t.prototype;
				return e.getCacheList = function()
				{
					return Pool.getPoolBySign(this.sign)
				}, e.tryDispose = function(t)
				{
					var e;
					e = Pool.getPoolBySign(this.sign), e.length > this.maxCount && e.splice(this.maxCount, e.length - this.maxCount)
				}, t.addPoolCacheManager = function(e, i)
				{
					void 0 === i && (i = 100);
					var n;
					n = new t, n.sign = e, n.maxCount = i, CacheManger.regCacheByFunction(Utils.bind(n.tryDispose, n), Utils.bind(n.getCacheList, n))
				}, t
			}(),
			Stat = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.Stat"), __getset(1, t, "onclick", null, function(e)
				{
					t._canvas.source.onclick = e, t._canvas.source.style.pointerEvents = ""
				}), t.show = function(e, i)
				{
					if (void 0 === e && (e = 0), void 0 === i && (i = 0), Render.isConchApp) return void(conch.showFPS && conch.showFPS(e, i));
					var n = Browser.pixelRatio;
					t._width = 120 * n, t._vx = 70 * n, t._view[0] = {
						title: "FPS(Canvas)",
						value: "_fpsStr",
						color: "yellow",
						units: "int"
					}, t._view[1] = {
						title: "Sprite",
						value: "spriteCount",
						color: "white",
						units: "int"
					}, t._view[2] = {
						title: "DrawCall",
						value: "drawCall",
						color: "white",
						units: "int"
					}, t._view[3] = {
						title: "CurMem",
						value: "currentMemorySize",
						color: "yellow",
						units: "M"
					}, Render.isWebGL ? (t._view[4] = {
						title: "Shader",
						value: "shaderCall",
						color: "white",
						units: "int"
					}, Render.is3DMode ? (t._view[0].title = "FPS(3D)", t._view[5] = {
						title: "TriFaces",
						value: "trianglesFaces",
						color: "white",
						units: "int"
					}) : (t._view[0].title = "FPS(WebGL)", t._view[5] = {
						title: "Canvas",
						value: "_canvasStr",
						color: "white",
						units: "int"
					})) : t._view[4] = {
						title: "Canvas",
						value: "_canvasStr",
						color: "white",
						units: "int"
					}, t._fontSize = 12 * n;
					for (var s = 0; s < t._view.length; s++) t._view[s].x = 4, t._view[s].y = s * t._fontSize + 2 * n;
					t._height = n * (12 * t._view.length + 3 * n), t._canvas || (t._canvas = new HTMLCanvas("2D"), t._canvas.size(t._width, t._height), t._ctx = t._canvas.getContext("2d"), t._ctx.textBaseline = "top", t._ctx.font = t._fontSize + "px Sans-serif", t._canvas.source.style.cssText = "pointer-events:none;background:rgba(150,150,150,0.8);z-index:100000;position: absolute;left:" + e + "px;top:" + i + "px;width:" + t._width / n + "px;height:" + t._height / n + "px;"), t._first = !0, t.loop(), t._first = !1, Browser.container.appendChild(t._canvas.source), t.enable()
				}, t.enable = function()
				{
					Laya.timer.frameLoop(1, t, t.loop)
				}, t.hide = function()
				{
					Browser.removeElement(t._canvas.source), Laya.timer.clear(t, t.loop)
				}, t.clear = function()
				{
					t.trianglesFaces = t.drawCall = t.shaderCall = t.spriteCount = t.canvasNormal = t.canvasBitmap = t.canvasReCache = 0
				}, t.loop = function()
				{
					t._count++;
					var e = Browser.now();
					if (!(e - t._timer < 1e3))
					{
						var i = t._count;
						if (t.FPS = Math.round(1e3 * i / (e - t._timer)), t._canvas)
						{
							t.trianglesFaces = Math.round(t.trianglesFaces / i), t.drawCall = Math.round(t.drawCall / i) - 2, t.shaderCall = Math.round(t.shaderCall / i), t.spriteCount = Math.round(t.spriteCount / i) - 1, t.canvasNormal = Math.round(t.canvasNormal / i), t.canvasBitmap = Math.round(t.canvasBitmap / i), t.canvasReCache = Math.ceil(t.canvasReCache / i), t._fpsStr = t.FPS + (t.renderSlow ? " slow" : ""), t._canvasStr = t.canvasReCache + "/" + t.canvasNormal + "/" + t.canvasBitmap, t.currentMemorySize = ResourceManager.systemResourceManager.memorySize;
							var n = t._ctx;
							n.clearRect(t._first ? 0 : t._vx, 0, t._width, t._height);
							for (var s = 0; s < t._view.length; s++)
							{
								var r = t._view[s];
								t._first && (n.fillStyle = "white", n.fillText(r.title, r.x, r.y, null, null, null)), n.fillStyle = r.color;
								var a = t[r.value];
								"M" == r.units && (a = Math.floor(a / 1048576 * 100) / 100 + " M"), n.fillText(a + "", r.x + t._vx, r.y, null, null, null)
							}
							t.clear()
						}
						t._count = 0, t._timer = e
					}
				}, t.loopCount = 0, t.shaderCall = 0, t.drawCall = 0, t.trianglesFaces = 0, t.spriteCount = 0, t.FPS = 0, t.canvasNormal = 0, t.canvasBitmap = 0, t.canvasReCache = 0, t.renderSlow = !1, t.currentMemorySize = 0, t._fpsStr = null, t._canvasStr = null, t._canvas = null, t._ctx = null, t._timer = 0, t._count = 0, t._width = 120, t._height = 100, t._view = [], t._fontSize = 12, t._first = !1, t._vx = NaN, t
			}(),
			StringKey = function()
			{
				function t()
				{
					this._strs = {}, this._length = 0
				}
				__class(t, "laya.utils.StringKey");
				var e = t.prototype;
				return e.add = function(t)
				{
					var e = this._strs[t];
					return null != e ? e : this._strs[t] = this._length++
				}, e.get = function(t)
				{
					var e = this._strs[t];
					return null == e ? -1 : e
				}, t
			}(),
			Timer = function()
			{
				function t()
				{
					this._delta = 0, this.scale = 1, this.currFrame = 0, this._mid = 1, this._map = [], this._laters = [], this._handlers = [], this._temp = [], this._count = 0, this.currTimer = Browser.now(), this._lastTimer = Browser.now(), Laya.timer && Laya.timer.frameLoop(1, this, this._update)
				}
				var e;
				__class(t, "laya.utils.Timer");
				var i = t.prototype;
				return i._update = function()
				{
					if (this.scale <= 0) return void(this._lastTimer = Browser.now());
					var t = this.currFrame = this.currFrame + this.scale,
						e = Browser.now();
					this._delta = (e - this._lastTimer) * this.scale;
					var i = this.currTimer = this.currTimer + this._delta;
					this._lastTimer = e;
					var n = this._handlers;
					for (this._count = 0, a = 0, o = n.length; o > a; a++)
						if (h = n[a], null !== h.method)
						{
							var s = h.userFrame ? t : i;
							s >= h.exeTime && (h.repeat ? s > h.exeTime && (h.exeTime += h.delay, h.run(!1), s > h.exeTime && (h.exeTime += Math.ceil((s - h.exeTime) / h.delay) * h.delay)) : h.run(!0))
						}
						else this._count++;
						(this._count > 30 || t % 200 === 0) && this._clearHandlers();
					for (var r = this._laters, a = 0, o = r.length - 1; o >= a; a++)
					{
						var h = r[a];
						null !== h.method && h.run(!1), this._recoverHandler(h), a === o && (o = r.length - 1)
					}
					r.length = 0
				}, i._clearHandlers = function()
				{
					for (var t = this._handlers, e = 0, i = t.length; i > e; e++)
					{
						var n = t[e];
						null !== n.method ? this._temp.push(n) : this._recoverHandler(n)
					}
					this._handlers = this._temp, this._temp = t, this._temp.length = 0
				}, i._recoverHandler = function(e)
				{
					this._map[e.key] = null, e.clear(), t._pool.push(e)
				}, i._create = function(i, n, s, r, a, o, h)
				{
					if (!s) return void a.apply(r, o);
					if (h)
					{
						var l = this._getHandler(r, a);
						if (l) return l.repeat = n, l.userFrame = i, l.delay = s, l.caller = r, l.method = a, l.args = o, void(l.exeTime = s + (i ? this.currFrame : this.currTimer))
					}
					l = t._pool.length > 0 ? t._pool.pop() : new e, l.repeat = n, l.userFrame = i, l.delay = s, l.caller = r, l.method = a, l.args = o, l.exeTime = s + (i ? this.currFrame : this.currTimer), this._indexHandler(l), this._handlers.push(l)
				}, i._indexHandler = function(t)
				{
					var e = t.caller,
						i = t.method,
						n = e ? e.$_GID || (e.$_GID = Utils.getGID()) : 0,
						s = i.$_TID || (i.$_TID = 1e5 * this._mid++);
					t.key = n + s, this._map[t.key] = t
				}, i.once = function(t, e, i, n, s)
				{
					void 0 === s && (s = !0), this._create(!1, !1, t, e, i, n, s)
				}, i.loop = function(t, e, i, n, s)
				{
					void 0 === s && (s = !0), this._create(!1, !0, t, e, i, n, s)
				}, i.frameOnce = function(t, e, i, n, s)
				{
					void 0 === s && (s = !0), this._create(!0, !1, t, e, i, n, s)
				}, i.frameLoop = function(t, e, i, n, s)
				{
					void 0 === s && (s = !0), this._create(!0, !0, t, e, i, n, s)
				}, i.toString = function()
				{
					return "callLater:" + this._laters.length + " handlers:" + this._handlers.length + " pool:" + t._pool.length
				}, i.clear = function(t, e)
				{
					var i = this._getHandler(t, e);
					i && (this._map[i.key] = null, i.key = 0, i.clear())
				}, i.clearAll = function(t)
				{
					for (var e = 0, i = this._handlers.length; i > e; e++)
					{
						var n = this._handlers[e];
						n.caller === t && (this._map[n.key] = null, n.key = 0, n.clear())
					}
				}, i._getHandler = function(t, e)
				{
					var i = t ? t.$_GID || (t.$_GID = Utils.getGID()) : 0,
						n = e.$_TID || (e.$_TID = 1e5 * this._mid++);
					return this._map[i + n]
				}, i.callLater = function(i, n, s)
				{
					if (null == this._getHandler(i, n))
					{
						if (t._pool.length) var r = t._pool.pop();
						else r = new e;
						r.caller = i, r.method = n, r.args = s, this._indexHandler(r), this._laters.push(r)
					}
				}, i.runCallLater = function(t, e)
				{
					var i = this._getHandler(t, e);
					i && null != i.method && (this._map[i.key] = null, i.run(!0))
				}, __getset(0, i, "delta", function()
				{
					return this._delta
				}), t._pool = [], t.__init$ = function()
				{
					e = function()
					{
						function t()
						{
							this.key = 0, this.repeat = !1, this.delay = 0, this.userFrame = !1, this.exeTime = 0, this.caller = null, this.method = null, this.args = null
						}
						__class(t, "");
						var e = t.prototype;
						return e.clear = function()
						{
							this.caller = null, this.method = null, this.args = null
						}, e.run = function(t)
						{
							var e = this.caller;
							if (e && e.destroyed) return this.clear();
							var i = this.method,
								n = this.args;
							t && this.clear(), null != i && (n ? i.apply(e, n) : i.call(e))
						}, t
					}()
				}, t
			}(),
			Tween = function()
			{
				function t()
				{
					this.gid = 0
				}
				__class(t, "laya.utils.Tween");
				var e = t.prototype;
				return e.to = function(t, e, i, n, s, r, a)
				{
					return void 0 === r && (r = 0), void 0 === a && (a = !1), this._create(t, e, i, n, s, r, a, !0, !1, !0)
				}, e.from = function(t, e, i, n, s, r, a)
				{
					return void 0 === r && (r = 0), void 0 === a && (a = !1), this._create(t, e, i, n, s, r, a, !1, !1, !0)
				}, e._create = function(e, i, n, s, r, a, o, h, l, u)
				{
					if (!e) throw new Error("Tween:target is null");
					this._target = e, this._duration = n || i.duration || 0, this._ease = s || i.ease || t.easeNone, this._complete = r || i.complete, this._delay = a, this._props = [], this._usedTimer = 0, this._startTimer = Browser.now(), this._usedPool = l, this.update = i.update;
					var c = e.$_GID || (e.$_GID = Utils.getGID());
					return t.tweenMap[c] ? (o && t.clearTween(e), t.tweenMap[c].push(this)) : t.tweenMap[c] = [this], u ? 0 >= a ? this.firstStart(e, i, h) : Laya.timer.once(a, this, this.firstStart, [e, i, h]) : this._initProps(e, i, h), this
				}, e.firstStart = function(t, e, i)
				{
					this._initProps(t, e, i), this._beginLoop()
				}, e._initProps = function(t, e, i)
				{
					for (var n in e)
						if ("number" == typeof t[n])
						{
							var s = i ? t[n] : e[n],
								r = i ? e[n] : t[n];
							this._props.push([n, s, r - s])
						}
				}, e._beginLoop = function()
				{
					Laya.timer.frameLoop(1, this, this._doEase)
				}, e._doEase = function()
				{
					this._updateEase(Browser.now())
				}, e._updateEase = function(e)
				{
					var i = this._target;
					if (i.destroyed) return t.clearTween(i);
					var n = this._usedTimer = e - this._startTimer - this._delay;
					if (!(0 > n))
					{
						if (n >= this._duration) return this.complete();
						for (var s = n > 0 ? this._ease(n, 0, 1, this._duration) : 0, r = this._props, a = 0, o = r.length; o > a; a++)
						{
							var h = r[a];
							i[h[0]] = h[1] + s * h[2]
						}
						this.update && this.update.run()
					}
				}, e.complete = function()
				{
					if (this._target)
					{
						for (var t = this._target, e = this._props, i = this._complete, n = 0, s = e.length; s > n; n++)
						{
							var r = e[n];
							t[r[0]] = r[1] + r[2]
						}
						this.update && this.update.run(), this.clear(), i && i.run()
					}
				}, e.pause = function()
				{
					Laya.timer.clear(this, this._beginLoop), Laya.timer.clear(this, this._doEase)
				}, e.setStartTime = function(t)
				{
					this._startTimer = t
				}, e.clear = function()
				{
					this._target && (this._remove(), this._clear())
				}, e._clear = function()
				{
					this.pause(), Laya.timer.clear(this, this.firstStart), this._complete = null, this._target = null, this._ease = null, this._props = null, this._usedPool && (this.update = null, Pool.recover("tween", this))
				}, e.recover = function()
				{
					this._usedPool = !0, this._clear()
				}, e._remove = function()
				{
					var e = t.tweenMap[this._target.$_GID];
					if (e)
						for (var i = 0, n = e.length; n > i; i++)
							if (e[i] === this)
							{
								e.splice(i, 1);
								break
							}
				}, e.restart = function()
				{
					this.pause(), this._usedTimer = 0, this._startTimer = Browser.now();
					for (var t = this._props, e = 0, i = t.length; i > e; e++)
					{
						var n = t[e];
						this._target[n[0]] = n[1]
					}
					Laya.timer.once(this._delay, this, this._beginLoop)
				}, e.resume = function()
				{
					this._usedTimer >= this._duration || (this._startTimer = Browser.now() - this._usedTimer - this._delay, this._beginLoop())
				}, __getset(0, e, "progress", null, function(t)
				{
					var e = t * this._duration;
					this._startTimer = Browser.now() - this._delay - e
				}), t.to = function(e, i, n, s, r, a, o, h)
				{
					return void 0 === a && (a = 0), void 0 === o && (o = !1), void 0 === h && (h = !0), Pool.getItemByClass("tween", t)._create(e, i, n, s, r, a, o, !0, h, !0)
				}, t.from = function(e, i, n, s, r, a, o, h)
				{
					return void 0 === a && (a = 0), void 0 === o && (o = !1), void 0 === h && (h = !0), Pool.getItemByClass("tween", t)._create(e, i, n, s, r, a, o, !1, h, !0)
				}, t.clearAll = function(e)
				{
					if (e && e.$_GID)
					{
						var i = t.tweenMap[e.$_GID];
						if (i)
						{
							for (var n = 0, s = i.length; s > n; n++) i[n]._clear();
							i.length = 0
						}
					}
				}, t.clear = function(t)
				{
					t.clear()
				}, t.clearTween = function(e)
				{
					t.clearAll(e)
				}, t.easeNone = function(t, e, i, n)
				{
					return i * t / n + e
				}, t.tweenMap = {}, t
			}(),
			Utils = function()
			{
				function t()
				{}
				return __class(t, "laya.utils.Utils"), t.toRadian = function(e)
				{
					return e * t._pi2
				}, t.toAngle = function(e)
				{
					return e * t._pi
				}, t.toHexColor = function(t)
				{
					if (0 > t || isNaN(t)) return null;
					for (var e = t.toString(16); e.length < 6;) e = "0" + e;
					return "#" + e
				}, t.getGID = function()
				{
					return t._gid++
				}, t.concatArray = function(t, e)
				{
					if (!e) return t;
					if (!t) return e;
					var i = 0,
						n = e.length;
					for (i = 0; n > i; i++) t.push(e[i]);
					return t
				}, t.clearArray = function(t)
				{
					return t ? (t.length = 0, t) : t
				}, t.copyArray = function(t, e)
				{
					if (t || (t = []), !e) return t;
					t.length = e.length;
					var i = 0,
						n = e.length;
					for (i = 0; n > i; i++) t[i] = e[i];
					return t
				}, t.getGlobalRecByPoints = function(t, e, i, n, s)
				{
					var r;
					r = new Point(e, i), r = t.localToGlobal(r);
					var a;
					return a = new Point(n, s), a = t.localToGlobal(a), Rectangle._getWrapRec([r.x, r.y, a.x, a.y])
				}, t.getGlobalPosAndScale = function(e)
				{
					return t.getGlobalRecByPoints(e, 0, 0, 1, 1)
				}, t.bind = function(t, e)
				{
					var i = t;
					return i = t.bind(e)
				}, t.measureText = function(t, e)
				{
					return RunDriver.measureText(t, e)
				}, t.updateOrder = function(t)
				{
					if (!t || t.length < 2) return !1;
					var e = t[0],
						i = 1,
						n = t.length,
						s = e._zOrder,
						r = NaN,
						a = NaN,
						o = NaN,
						h = NaN,
						l = !1;
					for (i = 1; n > i; i++)
						if (e = t[i], e && ((s = e._zOrder) < 0 && (s = e._zOrder), s < t[i - 1]._zOrder))
						{
							for (o = r = 0, a = i - 1; a >= r && (o = r + a >>> 1, t[o]);)
								if (h = t[o]._zOrder, 0 > h && (h = t[o]._zOrder), s > h) r = o + 1;
								else
								{
									if (!(h > s)) break;
									a = o - 1
								}
							s > t[o]._zOrder && o++;
							var u = e.parent;
							t.splice(i, 1), t.splice(o, 0, e), u && u.model && (u.model && u.model.removeChild(e.model), u.model && u.model.addChildAt(e.model, o)), l = !0
						}
					return l
				}, t.transPointList = function(t, e, i)
				{
					var n = 0,
						s = t.length;
					for (n = 0; s > n; n += 2) t[n] += e, t[n + 1] += i
				}, t.parseInt = function(t, e)
				{
					void 0 === e && (e = 0);
					var i = Browser.window.parseInt(t, e);
					return isNaN(i) ? 0 : i
				}, t._gid = 1, t._pi = 180 / Math.PI, t._pi2 = Math.PI / 180, t.parseXMLFromString = function(t)
				{
					var e;
					if (t = t.replace(/>\s+</g, "><"), e = (new DOMParser).parseFromString(t, "text/xml"), e.firstChild.textContent.indexOf("This page contains the following errors") > -1) throw new Error(e.firstChild.firstChild.textContent);
					return e
				}, t
			}(),
			VectorGraphManager = function()
			{
				function t()
				{
					this.useDic = {}, this.shapeDic = {}, this.shapeLineDic = {}, this._id = 0, this._checkKey = !1, this._freeIdArray = [], Render.isWebGL && CacheManger.regCacheByFunction(Utils.bind(this.startDispose, this), Utils.bind(this.getCacheList, this))
				}
				__class(t, "laya.utils.VectorGraphManager");
				var e = t.prototype;
				return e.getId = function()
				{
					return this._id++
				}, e.addShape = function(t, e)
				{
					this.shapeDic[t] = e, this.useDic[t] || (this.useDic[t] = !0)
				}, e.addLine = function(t, e)
				{
					this.shapeLineDic[t] = e, this.shapeLineDic[t] || (this.shapeLineDic[t] = !0);
				}, e.getShape = function(t)
				{
					this._checkKey && null != this.useDic[t] && (this.useDic[t] = !0)
				}, e.deleteShape = function(t)
				{
					this.shapeDic[t] && (this.shapeDic[t] = null, delete this.shapeDic[t]), this.shapeLineDic[t] && (this.shapeLineDic[t] = null, delete this.shapeLineDic[t]), null != this.useDic[t] && delete this.useDic[t]
				}, e.getCacheList = function()
				{
					var t, e = [];
					for (t in this.shapeDic) e.push(this.shapeDic[t]);
					for (t in this.shapeLineDic) e.push(this.shapeLineDic[t]);
					return e
				}, e.startDispose = function(t)
				{
					var e;
					for (e in this.useDic) this.useDic[e] = !1;
					this._checkKey = !0
				}, e.endDispose = function()
				{
					if (this._checkKey)
					{
						var t;
						for (t in this.useDic) this.useDic[t] || this.deleteShape(t);
						this._checkKey = !1
					}
				}, t.getInstance = function()
				{
					return t.instance = t.instance || new t
				}, t.instance = null, t
			}(),
			WordText = function()
			{
				function t()
				{
					this.id = NaN, this.save = [], this.toUpperCase = null, this.changed = !1, this._text = null
				}
				__class(t, "laya.utils.WordText");
				var e = t.prototype;
				return e.setText = function(t)
				{
					this.changed = !0, this._text = t
				}, e.toString = function()
				{
					return this._text
				}, e.charCodeAt = function(t)
				{
					return this._text ? this._text.charCodeAt(t) : NaN
				}, e.charAt = function(t)
				{
					return this._text ? this._text.charAt(t) : null
				}, __getset(0, e, "length", function()
				{
					return this._text ? this._text.length : 0
				}), t
			}(),
			Node = function(t)
			{
				function e()
				{
					this.name = "", this.destroyed = !1, this._displayedInStage = !1, this._parent = null, this.model = null, e.__super.call(this), this._childs = e.ARRAY_EMPTY, this.timer = Laya.timer, this._$P = e.PROP_EMPTY, this.model = Render.isConchNode ? new ConchNode : null
				}
				__class(e, "laya.display.Node", t);
				var i = e.prototype;
				return i.destroy = function(t)
				{
					void 0 === t && (t = !0), this.destroyed = !0, this._parent && this._parent.removeChild(this), this._childs && (t ? this.destroyChildren() : this.removeChildren()), this._childs = null, this._$P = null, this.offAll()
				}, i.destroyChildren = function()
				{
					if (this._childs)
						for (var t = this._childs.length - 1; t > -1; t--) this._childs[t].destroy(!0)
				}, i.addChild = function(t)
				{
					return t === this ? t : (t._parent === this ? (this._childs.splice(this.getChildIndex(t), 1), this._childs.push(t), this.model && (this.model.removeChild(t.model), this.model.addChildAt(t.model, this._childs.length - 1)), this._childChanged()) : (t.parent && t.parent.removeChild(t), this._childs === e.ARRAY_EMPTY && (this._childs = []), this._childs.push(t), this.model && this.model.addChildAt(t.model, this._childs.length - 1), t.parent = this), t)
				}, i.addChildren = function(t)
				{
					for (var e = arguments, i = 0, n = e.length; n > i;) this.addChild(e[i++])
				}, i.addChildAt = function(t, i)
				{
					if (t === this) return t;
					if (i >= 0 && i <= this._childs.length)
					{
						if (t._parent === this)
						{
							var n = this.getChildIndex(t);
							this._childs.splice(n, 1), this._childs.splice(i, 0, t), this.model && (this.model.removeChild(t.model), this.model.addChildAt(t.model, i)), this._childChanged()
						}
						else t.parent && t.parent.removeChild(t), this._childs === e.ARRAY_EMPTY && (this._childs = []), this._childs.splice(i, 0, t), this.model && this.model.addChildAt(t.model, i), t.parent = this;
						return t
					}
					throw new Error("appendChildAt:The index is out of bounds")
				}, i.getChildIndex = function(t)
				{
					return this._childs.indexOf(t)
				}, i.getChildByName = function(t)
				{
					for (var e = this._childs, i = 0, n = e.length; n > i; i++)
					{
						var s = e[i];
						if (s.name === t) return s
					}
					return null
				}, i._get$P = function(t)
				{
					return this._$P[t]
				}, i._set$P = function(t, i)
				{
					return this._$P === e.PROP_EMPTY && (this._$P = {}), this._$P[t] = i, i
				}, i.getChildAt = function(t)
				{
					return this._childs[t]
				}, i.setChildIndex = function(t, e)
				{
					var i = this._childs;
					if (0 > e || e >= i.length) throw new Error("setChildIndex:The index is out of bounds.");
					var n = this.getChildIndex(t);
					if (0 > n) throw new Error("setChildIndex:node is must child of this object.");
					return i.splice(n, 1), i.splice(e, 0, t), this.model && (this.model.removeChild(t.model), this.model.addChildAt(t.model, e)), this._childChanged(), t
				}, i._childChanged = function(t) {}, i.removeChild = function(t)
				{
					if (!this._childs) return t;
					var e = this._childs.indexOf(t);
					return this.removeChildAt(e)
				}, i.removeSelf = function()
				{
					return this._parent && this._parent.removeChild(this), this
				}, i.removeChildByName = function(t)
				{
					var e = this.getChildByName(t);
					return e && this.removeChild(e), e
				}, i.removeChildAt = function(t)
				{
					var e = this.getChildAt(t);
					return e && (this._childs.splice(t, 1), this.model && this.model.removeChild(e.model), e.parent = null), e
				}, i.removeChildren = function(t, i)
				{
					if (void 0 === t && (t = 0), void 0 === i && (i = 2147483647), this._childs.length > 0)
					{
						var n = this._childs;
						if (0 === t && i >= a)
						{
							var s = n;
							this._childs = e.ARRAY_EMPTY
						}
						else s = n.splice(t, i - t);
						for (var r = 0, a = s.length; a > r; r++) s[r].parent = null, this.model && this.model.removeChild(s[r].model)
					}
					return this
				}, i.replaceChild = function(t, e)
				{
					var i = this._childs.indexOf(e);
					return i > -1 ? (this._childs.splice(i, 1, t), this.model && (this.model.removeChild(e.model), this.model.addChildAt(t.model, i)), e.parent = null, t.parent = this, t) : null
				}, i._setDisplay = function(t)
				{
					this._displayedInStage !== t && (this._displayedInStage = t, t ? this.event("display") : this.event("undisplay"))
				}, i._displayChild = function(t, e)
				{
					var i = t._childs;
					if (i)
						for (var n = i.length - 1; n > -1; n--)
						{
							var s = i[n];
							s._setDisplay(e), s._childs.length && this._displayChild(s, e)
						}
					t._setDisplay(e)
				}, i.contains = function(t)
				{
					if (t === this) return !0;
					for (; t;)
					{
						if (t.parent === this) return !0;
						t = t.parent
					}
					return !1
				}, i.timerLoop = function(t, e, i, n, s)
				{
					void 0 === s && (s = !0), this.timer._create(!1, !0, t, e, i, n, s)
				}, i.timerOnce = function(t, e, i, n, s)
				{
					void 0 === s && (s = !0), this.timer._create(!1, !1, t, e, i, n, s)
				}, i.frameLoop = function(t, e, i, n, s)
				{
					void 0 === s && (s = !0), this.timer._create(!0, !0, t, e, i, n, s)
				}, i.frameOnce = function(t, e, i, n, s)
				{
					void 0 === s && (s = !0), this.timer._create(!0, !1, t, e, i, n, s)
				}, i.clearTimer = function(t, e)
				{
					this.timer.clear(t, e)
				}, __getset(0, i, "displayedInStage", function()
				{
					return this._displayedInStage
				}), __getset(0, i, "numChildren", function()
				{
					return this._childs.length
				}), __getset(0, i, "parent", function()
				{
					return this._parent
				}, function(t)
				{
					this._parent !== t && (t ? (this._parent = t, this.event("added"), t.displayedInStage && this._displayChild(this, !0), t._childChanged(this)) : (this.event("removed"), this._parent._childChanged(), this._displayChild(this, !1), this._parent = t))
				}), e.ARRAY_EMPTY = [], e.PROP_EMPTY = {}, e
			}(EventDispatcher),
			CSSStyle = function(t)
			{
				function e(t)
				{
					this._bgground = null, this._border = null, this._rect = null, this.lineHeight = 0, e.__super.call(this), this._padding = e._PADDING, this._spacing = e._SPACING, this._aligns = e._ALIGNS, this._font = Font.EMPTY, this._ower = t
				}
				__class(e, "laya.display.css.CSSStyle", t);
				var i = e.prototype;
				return i.destroy = function()
				{
					this._ower = null, this._font = null, this._rect = null
				}, i.inherit = function(t)
				{
					this._font = t._font, this._spacing = t._spacing === e._SPACING ? e._SPACING : t._spacing.slice(), this.lineHeight = t.lineHeight
				}, i._widthAuto = function()
				{
					return 0 !== (262144 & this._type)
				}, i.widthed = function(t)
				{
					return 0 != (8 & this._type)
				}, i._calculation = function(t, e)
				{
					function i(t, e, i)
					{
						return t * i[0] + e * i[1] + i[2]
					}

					function n(t)
					{
						var e = r.width,
							n = s.width;
						a.width && (s.width = i(e, n, a.width)), a.height && (s.height = i(e, n, a.height)), a.left && (s.x = i(e, n, a.left)), a.top && (s.y = i(e, n, a.top))
					}
					if (e.indexOf("%") < 0) return !1;
					var s = this._ower,
						r = s.parent,
						a = this._rect;
					null === a && (r._getCSSStyle()._type |= 524288, r.on("resize", this, n), this._rect = a = {
						input:
						{}
					});
					var o = e.split(" ");
					return o[0] = parseFloat(o[0]) / 100, 1 == o.length ? o[1] = o[2] = 0 : (o[1] = parseFloat(o[1]) / 100, o[2] = parseFloat(o[2])), a[t] = o, a.input[t] = e, n(t), !0
				}, i.heighted = function(t)
				{
					return 0 != (8192 & this._type)
				}, i.size = function(t, e)
				{
					var i = this._ower,
						n = !1; - 1 !== t && t != this._ower.width && (this._type |= 8, this._ower.width = t, n = !0), -1 !== e && e != this._ower.height && (this._type |= 8192, this._ower.height = e, n = !0), n && (i._layoutLater(), 524288 & this._type && i.event("resize", this))
				}, i._getAlign = function()
				{
					return this._aligns[0]
				}, i._getValign = function()
				{
					return this._aligns[1]
				}, i._getCssFloat = function()
				{
					return 0 != (32768 & this._type) ? 32768 : 0
				}, i._createFont = function()
				{
					return 4096 & this._type ? this._font : (this._type |= 4096, this._font = new Font(this._font))
				}, i.render = function(t, e, i, n)
				{
					var s = t.width,
						r = t.height;
					i -= t.pivotX, n -= t.pivotY, this._bgground && null != this._bgground.color && e.ctx.fillRect(i, n, s, r, this._bgground.color), this._border && this._border.color && e.drawRect(i, n, s, r, this._border.color.strColor, this._border.size)
				}, i.getCSSStyle = function()
				{
					return this
				}, i.cssText = function(t)
				{
					this.attrs(e.parseOneCSS(t, ";"))
				}, i.attrs = function(t)
				{
					if (t)
						for (var e = 0, i = t.length; i > e; e++)
						{
							var n = t[e];
							this[n[0]] = n[1]
						}
				}, i.setTransform = function(t)
				{
					"none" === t ? this._tf = Style._TF_EMPTY : this.attrs(e.parseOneCSS(t, ","))
				}, i.translate = function(t, e)
				{
					this._tf === Style._TF_EMPTY && (this._tf = Style._createTransform()), this._tf.translateX = t, this._tf.translateY = e
				}, i.scale = function(t, e)
				{
					this._tf === Style._TF_EMPTY && (this._tf = Style._createTransform()), this._tf.scaleX = t, this._tf.scaleY = e
				}, i._enableLayout = function()
				{
					return 0 === (2 & this._type) && 0 === (4 & this._type)
				}, __getset(0, i, "align", function()
				{
					return e._aligndef[this._aligns[0]]
				}, function(t)
				{
					this._aligns === e._ALIGNS && (this._aligns = [0, 0, 0]), this._aligns[0] = e._aligndef[t]
				}), __getset(0, i, "paddingTop", function()
				{
					return this.padding[0]
				}), __getset(0, i, "block", t.prototype._$get_block, function(t)
				{
					t ? this._type |= 1 : this._type &= -2
				}), __getset(0, i, "padding", function()
				{
					return this._padding
				}, function(t)
				{
					this._padding = t
				}), __getset(0, i, "width", null, function(t)
				{
					if (this._type |= 8, "string" == typeof t)
					{
						var e = t.indexOf("auto");
						if (e >= 0 && (this._type |= 262144, t = t.substr(0, e)), this._calculation("width", t)) return;
						t = parseInt(t)
					}
					this.size(t, -1)
				}), __getset(0, i, "height", null, function(t)
				{
					if (this._type |= 8192, "string" == typeof t)
					{
						if (this._calculation("height", t)) return;
						t = parseInt(t)
					}
					this.size(-1, t)
				}), __getset(0, i, "_scale", null, function(t)
				{
					this._ower.scale(t[0], t[1])
				}), __getset(0, i, "cssFloat", function()
				{
					return 0 != (32768 & this._type) ? "right" : "left"
				}, function(t)
				{
					this.lineElement = !1, "right" === t ? this._type |= 32768 : this._type &= -32769
				}), __getset(0, i, "font", function()
				{
					return this._font.toString()
				}, function(t)
				{
					this._createFont().set(t)
				}), __getset(0, i, "lineElement", function()
				{
					return 0 != (65536 & this._type)
				}, function(t)
				{
					t ? this._type |= 65536 : this._type &= -65537
				}), __getset(0, i, "valign", function()
				{
					return e._valigndef[this._aligns[1]]
				}, function(t)
				{
					this._aligns === e._ALIGNS && (this._aligns = [0, 0, 0]), this._aligns[1] = e._valigndef[t]
				}), __getset(0, i, "border", function()
				{
					return this._border ? this._border.value : ""
				}, function(t)
				{
					if ("none" == t) return void(this._border = null);
					this._border || (this._border = {}), this._border.value = t;
					var e = t.split(" ");
					if (this._border.color = Color.create(e[e.length - 1]), 1 == e.length) return this._border.size = 1, void(this._border.type = "solid");
					var i = 0;
					e[0].indexOf("px") > 0 ? (this._border.size = parseInt(e[0]), i++) : this._border.size = 1, this._border.type = e[i], this._ower._renderType |= 128
				}), __getset(0, i, "leading", function()
				{
					return this._spacing[1]
				}, function(t)
				{
					"string" == typeof t && (t = parseInt(t + "")), this._spacing === e._SPACING && (this._spacing = [0, 0]), this._spacing[1] = t
				}), __getset(0, i, "left", null, function(t)
				{
					var e = this._ower;
					if ("string" == typeof t)
					{
						if ("center" === t ? t = "50% -50% 0" : "right" === t && (t = "100% -100% 0"), this._calculation("left", t)) return;
						t = parseInt(t)
					}
					e.x = t
				}), __getset(0, i, "position", function()
				{
					return 4 & this._type ? "absolute" : ""
				}, function(t)
				{
					"absolute" == t ? this._type |= 4 : this._type &= -5
				}), __getset(0, i, "top", null, function(t)
				{
					var e = this._ower;
					if ("string" == typeof t)
					{
						if ("middle" === t ? t = "50% -50% 0" : "bottom" === t && (t = "100% -100% 0"), this._calculation("top", t)) return;
						t = parseInt(t)
					}
					e.y = t
				}), __getset(0, i, "whiteSpace", function()
				{
					return 131072 & this._type ? "nowrap" : ""
				}, function(t)
				{
					"nowrap" === t && (this._type |= 131072), "none" === t && (this._type &= -131073)
				}), __getset(0, i, "wordWrap", function()
				{
					return 0 === (131072 & this._type)
				}, function(t)
				{
					t ? this._type &= -131073 : this._type |= 131072
				}), __getset(0, i, "bold", function()
				{
					return this._font.bold
				}, function(t)
				{
					this._createFont().bold = t
				}), __getset(0, i, "password", function()
				{
					return this._font.password
				}, function(t)
				{
					this._createFont().password = t
				}), __getset(0, i, "weight", null, function(t)
				{
					this._createFont().weight = t
				}), __getset(0, i, "letterSpacing", function()
				{
					return this._spacing[0]
				}, function(t)
				{
					"string" == typeof t && (t = parseInt(t + "")), this._spacing === e._SPACING && (this._spacing = [0, 0]), this._spacing[0] = t
				}), __getset(0, i, "fontSize", function()
				{
					return this._font.size
				}, function(t)
				{
					this._createFont().size = t
				}), __getset(0, i, "italic", function()
				{
					return this._font.italic
				}, function(t)
				{
					this._createFont().italic = t
				}), __getset(0, i, "fontFamily", function()
				{
					return this._font.family
				}, function(t)
				{
					this._createFont().family = t
				}), __getset(0, i, "fontWeight", function()
				{
					return this._font.weight
				}, function(t)
				{
					this._createFont().weight = t
				}), __getset(0, i, "textDecoration", function()
				{
					return this._font.decoration
				}, function(t)
				{
					this._createFont().decoration = t
				}), __getset(0, i, "color", function()
				{
					return this._font.color
				}, function(t)
				{
					this._createFont().color = t
				}), __getset(0, i, "strokeColor", function()
				{
					return this._font.stroke[1]
				}, function(t)
				{
					this._createFont().stroke === Font._STROKE && (this._font.stroke = [0, "#000000"]), this._font.stroke[1] = t
				}), __getset(0, i, "borderColor", function()
				{
					return this._border && this._border.color ? this._border.color.strColor : null
				}, function(t)
				{
					return t ? (this._border || (this._border = {
						size: 1,
						type: "solid"
					}), this._border.color = null == t ? null : Color.create(t), this._ower.model && this._ower.model.border(this._border.color.strColor), void(this._ower._renderType |= 128)) : void(this._border = null)
				}), __getset(0, i, "stroke", function()
				{
					return this._font.stroke[0]
				}, function(t)
				{
					this._createFont().stroke === Font._STROKE && (this._font.stroke = [0, "#000000"]), this._font.stroke[0] = t
				}), __getset(0, i, "backgroundColor", function()
				{
					return this._bgground ? this._bgground.color : null
				}, function(t)
				{
					"none" === t ? this._bgground = null : (this._bgground || (this._bgground = {}), this._bgground.color = t), this._ower.model && this._ower.model.bgColor(t), this._ower._renderType |= 128
				}), __getset(0, i, "absolute", function()
				{
					return 0 !== (4 & this._type)
				}), __getset(0, i, "background", null, function(t)
				{
					return t ? (this._bgground || (this._bgground = {}), this._bgground.color = t, this._ower.model && this._ower.model.bgColor(t), this._type |= 16384, void(this._ower._renderType |= 128)) : void(this._bgground = null)
				}), __getset(0, i, "paddingLeft", function()
				{
					return this.padding[3]
				}), __getset(0, i, "display", null, function(t)
				{
					switch (t)
					{
						case "":
							this._type &= -3, this.visible = !0;
							break;
						case "none":
							this._type |= 2, this.visible = !1, this._ower._layoutLater()
					}
				}), __getset(0, i, "_translate", null, function(t)
				{
					this.translate(t[0], t[1])
				}), __getset(0, i, "_rotate", null, function(t)
				{
					this._ower.rotation = t
				}), e.parseOneCSS = function(t, i)
				{
					for (var n, s = [], r = t.split(i), a = 0, o = r.length; o > a; a++)
					{
						var h = r[a],
							l = h.indexOf(":"),
							u = h.substr(0, l).replace(/^\s+|\s+$/g, "");
						if (0 != u.length)
						{
							var c = h.substr(l + 1).replace(/^\s+|\s+$/g, ""),
								_ = [u, c];
							switch (u)
							{
								case "italic":
								case "bold":
									_[1] = "true" == c;
									break;
								case "line-height":
									_[0] = "lineHeight", _[1] = parseInt(c);
									break;
								case "font-size":
									_[0] = "fontSize", _[1] = parseInt(c);
									break;
								case "padding":
									n = c.split(" "), n.length > 1 || (n[1] = n[2] = n[3] = n[0]), _[1] = [parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), parseInt(n[3])];
									break;
								case "rotate":
									_[0] = "_rotate", _[1] = parseFloat(c);
									break;
								case "scale":
									n = c.split(" "), _[0] = "_scale", _[1] = [parseFloat(n[0]), parseFloat(n[1])];
									break;
								case "translate":
									n = c.split(" "), _[0] = "_translate", _[1] = [parseInt(n[0]), parseInt(n[1])];
									break;
								default:
									(_[0] = e._CSSTOVALUE[u]) || (_[0] = u)
							}
							s.push(_)
						}
					}
					return s
				}, e.parseCSS = function(t, i)
				{
					for (var n; null != (n = e._parseCSSRegExp.exec(t));) e.styleSheets[n[1]] = e.parseOneCSS(n[2], ";")
				}, e.EMPTY = new e(null), e._CSSTOVALUE = {
					"letter-spacing": "letterSpacing",
					"line-spacing": "lineSpacing",
					"white-space": "whiteSpace",
					"line-height": "lineHeight",
					"scale-x": "scaleX",
					"scale-y": "scaleY",
					"translate-x": "translateX",
					"translate-y": "translateY",
					"font-family": "fontFamily",
					"font-weight": "fontWeight",
					"vertical-align": "valign",
					"text-decoration": "textDecoration",
					"background-color": "backgroundColor",
					"border-color": "borderColor",
					"float": "cssFloat"
				}, e._parseCSSRegExp = new RegExp("([.#]\\w+)\\s*{([\\s\\S]*?)}", "g"), e._aligndef = {
					left: 0,
					center: 1,
					right: 2,
					0: "left",
					1: "center",
					2: "right"
				}, e._valigndef = {
					top: 0,
					middle: 1,
					bottom: 2,
					0: "top",
					1: "middle",
					2: "bottom"
				}, e.styleSheets = {}, e.ALIGN_CENTER = 1, e.ALIGN_RIGHT = 2, e.VALIGN_MIDDLE = 1, e.VALIGN_BOTTOM = 2, e._CSS_BLOCK = 1, e._DISPLAY_NONE = 2, e._ABSOLUTE = 4, e._WIDTH_SET = 8, e._PADDING = [0, 0, 0, 0], e._RECT = [-1, -1, -1, -1], e._SPACING = [0, 0], e._ALIGNS = [0, 0, 0], e.ADDLAYOUTED = 512, e._NEWFONT = 4096, e._HEIGHT_SET = 8192, e._BACKGROUND_SET = 16384, e._FLOAT_RIGHT = 32768, e._LINE_ELEMENT = 65536, e._NOWARP = 131072, e._WIDTHAUTO = 262144, e._LISTERRESZIE = 524288, e
			}(Style),
			AudioSound = function(t)
			{
				function e()
				{
					this.url = null, this.audio = null, this.loaded = !1, e.__super.call(this)
				}
				__class(e, "laya.media.h5audio.AudioSound", t);
				var i = e.prototype;
				return i.dispose = function()
				{
					var t = e._audioCache[this.url];
					t && (t.src = "", delete e._audioCache[this.url])
				}, i.load = function(t)
				{
					function i()
					{
						s(), a.loaded = !0, a.event("complete")
					}

					function n()
					{
						s(), a.event("error")
					}

					function s()
					{
						r.removeEventListener("canplaythrough", i), r.removeEventListener("error", n)
					}
					this.url = t;
					var r = e._audioCache[t];
					if (r && r.readyState >= 2) return void this.event("complete");
					r || (r = Browser.createElement("audio"), r.src = t, e._audioCache[t] = r), r.addEventListener("canplaythrough", i), r.addEventListener("error", n);
					var a = this;
					this.audio = r, r.load()
				}, i.play = function(t, i)
				{
					if (void 0 === t && (t = 0), void 0 === i && (i = 0), !this.url) return null;
					var n;
					if (n = e._audioCache[this.url], !n) return null;
					var s;
					s = Pool.getItem("audio:" + this.url), s = s ? s : n.cloneNode(!0);
					var r = new AudioSoundChannel(s);
					return r.url = this.url, r.loops = i, r.startTime = t, r.play(), SoundManager.addChannel(r), r
				}, e._audioCache = {}, e
			}(EventDispatcher),
			SoundChannel = function(t)
			{
				function e()
				{
					this.url = null, this.loops = 0, this.startTime = NaN, this.isStopped = !1, this.completeHandler = null, e.__super.call(this)
				}
				__class(e, "laya.media.SoundChannel", t);
				var i = e.prototype;
				return i.play = function() {}, i.stop = function() {}, i.__runComplete = function(t)
				{
					t && t.run()
				}, __getset(0, i, "volume", function()
				{
					return 1
				}, function(t) {}), __getset(0, i, "position", function()
				{
					return 0
				}), e
			}(EventDispatcher),
			Sound = function(t)
			{
				function e()
				{
					e.__super.call(this)
				}
				__class(e, "laya.media.Sound", t);
				var i = e.prototype;
				return i.load = function(t) {}, i.play = function(t, e)
				{
					return void 0 === t && (t = 0), void 0 === e && (e = 0), null
				}, i.dispose = function() {}, e
			}(EventDispatcher),
			WebAudioSound = function(t)
			{
				function e()
				{
					this.url = null, this.loaded = !1, this.data = null, this.audioBuffer = null, this.__toPlays = null, e.__super.call(this)
				}
				__class(e, "laya.media.webaudio.WebAudioSound", t);
				var i = e.prototype;
				return i.load = function(t)
				{
					var i = this;
					if (this.url = t, this.audioBuffer = e._dataCache[t], this.audioBuffer) return void this._loaded(this.audioBuffer);
					if (e.e.on("loaded:" + t, this, this._loaded), e.e.on("err:" + t, this, this._err), !e.__loadingSound[t])
					{
						e.__loadingSound[t] = !0;
						var n = new Browser.window.XMLHttpRequest;
						n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function()
						{
							i.data = n.response, e.buffs.push(
							{
								buffer: i.data,
								url: i.url
							}), e.decode()
						}, n.send()
					}
				}, i._err = function()
				{
					this._removeLoadEvents(), this.event("error")
				}, i._loaded = function(t)
				{
					this._removeLoadEvents(), this.audioBuffer = t, e._dataCache[this.url] = this.audioBuffer, this.loaded = !0, this.event("complete")
				}, i._removeLoadEvents = function()
				{
					e.e.off("loaded:" + this.url, this, this._loaded), e.e.off("err:" + this.url, this, this._err)
				}, i.__playAfterLoaded = function()
				{
					if (this.__toPlays)
					{
						var t, e = 0,
							i = 0;
						t = this.__toPlays, i = t.length;
						var n;
						for (e = 0; i > e; e++) n = t[e], n[2] && !n[2].isStopped && this.play(n[0], n[1], n[2]);
						this.__toPlays.length = 0
					}
				}, i.play = function(t, e, i)
				{
					return void 0 === t && (t = 0), void 0 === e && (e = 0), i = i ? i : new WebAudioSoundChannel, this.audioBuffer || this.url && (this.__toPlays || (this.__toPlays = []), this.__toPlays.push([t, e, i]), this.once("complete", this, this.__playAfterLoaded), this.load(this.url)), i.url = this.url, i.loops = e, i.audioBuffer = this.audioBuffer, i.startTime = t, i.play(), SoundManager.addChannel(i), i
				}, i.dispose = function()
				{
					delete e._dataCache[this.url], delete e.__loadingSound[this.url]
				}, e.decode = function()
				{
					e.buffs.length <= 0 || e.isDecoding || (e.isDecoding = !0, e.tInfo = e.buffs.shift(), e.ctx.decodeAudioData(e.tInfo.buffer, e._done, e._fail))
				}, e._done = function(t)
				{
					e.e.event("loaded:" + e.tInfo.url, t), e.isDecoding = !1, e.decode()
				}, e._fail = function()
				{
					e.e.event("err:" + e.tInfo.url, null), e.isDecoding = !1, e.decode()
				}, e._playEmptySound = function()
				{
					if (null != e.ctx)
					{
						var t = e.ctx.createBufferSource();
						t.buffer = e._miniBuffer, t.connect(e.ctx.destination), t.start(0, 0, 0)
					}
				}, e._unlock = function()
				{
					e._unlocked || (e._playEmptySound(), "running" == e.ctx.state && (Browser.document.removeEventListener("mousedown", e._unlock, !0), Browser.document.removeEventListener("touchend", e._unlock, !0), e._unlocked = !0))
				}, e.initWebAudio = function()
				{
					"running" != e.ctx.state && (e._unlock(), Browser.document.addEventListener("mousedown", e._unlock, !0), Browser.document.addEventListener("touchend", e._unlock, !0))
				}, e._dataCache = {}, e.buffs = [], e.isDecoding = !1, e._unlocked = !1, e.tInfo = null, e.__loadingSound = {}, __static(e, ["window", function()
				{
					return this.window = Browser.window
				}, "webAudioEnabled", function()
				{
					return this.webAudioEnabled = e.window.AudioContext || e.window.webkitAudioContext || e.window.mozAudioContext
				}, "ctx", function()
				{
					return this.ctx = e.webAudioEnabled ? new(e.window.AudioContext || e.window.webkitAudioContext || e.window.mozAudioContext) : void 0
				}, "_miniBuffer", function()
				{
					return this._miniBuffer = e.ctx.createBuffer(1, 1, 22050)
				}, "e", function()
				{
					return this.e = new EventDispatcher
				}]), e
			}(EventDispatcher),
			ColorFilter = function(t)
			{
				function e(t)
				{
					e.__super.call(this), t || (t = [.3, .59, .11, 0, 0, .3, .59, .11, 0, 0, .3, .59, .11, 0, 0, 0, 0, 0, 1, 0]), this._mat = new Float32Array(16), this._alpha = new Float32Array(4);
					for (var i = 0, n = 0, s = 0; 20 > s; s++) s % 5 != 4 ? this._mat[i++] = t[s] : this._alpha[n++] = t[s];
					this._action = RunDriver.createFilterAction(32), this._action.data = this
				}
				__class(e, "laya.filters.ColorFilter", t);
				var i = e.prototype;
				return Laya.imps(i,
				{
					"laya.filters.IFilter": !0
				}), i.callNative = function(t)
				{
					t._$P.cf = this;
					t.model && t.model.setFilterMatrix && t.model.setFilterMatrix(this._mat, this._alpha)
				}, __getset(0, i, "type", function()
				{
					return 32
				}), __getset(0, i, "action", function()
				{
					return this._action
				}), __getset(1, e, "DEFAULT", function()
				{
					return e._DEFAULT || (e._DEFAULT = new e([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0])), e._DEFAULT
				}, laya.filters.Filter._$SET_DEFAULT), __getset(1, e, "GRAY", function()
				{
					return e._GRAY || (e._GRAY = new e([.3, .59, .11, 0, 0, .3, .59, .11, 0, 0, .3, .59, .11, 0, 0, 0, 0, 0, 1, 0])), e._GRAY
				}, laya.filters.Filter._$SET_GRAY), e._DEFAULT = null, e._GRAY = null, e
			}(Filter),
			HttpRequest = function(t)
			{
				function e()
				{
					this._responseType = null, this._data = null, e.__super.call(this), this._http = new Browser.window.XMLHttpRequest
				}
				__class(e, "laya.net.HttpRequest", t);
				var i = e.prototype;
				return i.send = function(t, e, i, n, s)
				{
					void 0 === i && (i = "get"), void 0 === n && (n = "text"), this._responseType = n, this._data = null;
					var r = this,
						a = this._http;
					if (a.open(i, t, !0), s)
						for (var o = 0; o < s.length; o++) a.setRequestHeader(s[o++], s[o]);
					else e && "string" != typeof e ? a.setRequestHeader("Content-Type", "application/json") : a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					a.responseType = "arraybuffer" !== n ? "text" : "arraybuffer", a.onerror = function(t)
					{
						r._onError(t)
					}, a.onabort = function(t)
					{
						r._onAbort(t)
					}, a.onprogress = function(t)
					{
						r._onProgress(t)
					}, a.onload = function(t)
					{
						r._onLoad(t)
					}, a.send(e)
				}, i._onProgress = function(t)
				{
					t && t.lengthComputable && this.event("progress", t.loaded / t.total)
				}, i._onAbort = function(t)
				{
					this.error("Request was aborted by user")
				}, i._onError = function(t)
				{
					this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText)
				}, i._onLoad = function(t)
				{
					var e = this._http,
						i = void 0 !== e.status ? e.status : 200;
					200 === i || 204 === i || 0 === i ? this.complete() : this.error("[" + e.status + "]" + e.statusText + ":" + e.responseURL)
				}, i.error = function(t)
				{
					this.clear(), this.event("error", t)
				}, i.complete = function()
				{
					this.clear();
					try
					{
						"json" === this._responseType ? this._data = JSON.parse(this._http.responseText) : "xml" === this._responseType ? this._data = Utils.parseXMLFromString(this._http.responseText) : this._data = this._http.response || this._http.responseText, this.event("complete", this._data instanceof Array ? [this._data] : this._data)
					}
					catch (t)
					{
						this.error(t.message)
					}
				}, i.clear = function()
				{
					var t = this._http;
					t.onerror = t.onabort = t.onprogress = t.onload = null
				}, __getset(0, i, "data", function()
				{
					return this._data
				}), __getset(0, i, "url", function()
				{
					return this._http.responseURL
				}), e
			}(EventDispatcher),
			Loader = function(t)
			{
				function e()
				{
					this._data = null, this._url = null, this._type = null, this._cache = !1, this._http = null, e.__super.call(this)
				}
				__class(e, "laya.net.Loader", t);
				var i = e.prototype;
				return i.load = function(t, i, n)
				{
					return void 0 === n && (n = !0), t = e._parseURL(t), this._url = t, this._type = i || (i = this.getTypeFromUrl(t)), this._cache = n, this._data = null, e.loadedMap[t] ? (this._data = e.loadedMap[t], this.event("progress", 1), void this.event("complete", this._data)) : null != e.parserMap[i] ? void(e.parserMap[i] instanceof laya.utils.Handler ? e.parserMap[i].runWith(this) : e.parserMap[i].call(null, this)) : "image" === i || "htmlimage" === i || "nativeimage" === i ? this._loadImage(t) : "sound" === i ? this._loadSound(t) : (this._http || (this._http = new HttpRequest, this._http.on("progress", this, this.onProgress), this._http.on("error", this, this.onError), this._http.on("complete", this, this.onLoaded)), void this._http.send(t, null, "get", "atlas" !== i ? i : "json"))
				}, i.getTypeFromUrl = function(t)
				{
					e._extReg.lastIndex = t.lastIndexOf(".");
					var i = e._extReg.exec(t);
					return i && i.length > 1 ? e.typeMap[i[1].toLowerCase()] : (console.log("Not recognize the resources suffix", t), "text")
				}, i._loadImage = function(t)
				{
					function e()
					{
						i.onload = null, i.onerror = null
					}
					var i, n = this,
						s = function()
						{
							e(), n.onLoaded(i)
						},
						r = function()
						{
							e(), n.event("error", "Load image filed")
						};
					"nativeimage" === this._type ? (i = new Browser.window.Image, i.crossOrigin = "", i.onload = s, i.onerror = r, i.src = t) : new HTMLImage.create(t,
					{
						onload: s,
						onerror: r,
						onCreate: function(t)
						{
							i = t
						}
					})
				}, i._loadSound = function(t)
				{
					function e()
					{
						n(), r.onLoaded(s)
					}

					function i()
					{
						n(), r.event("error", "Load sound filed")
					}

					function n()
					{
						s.offAll()
					}
					var s = new SoundManager._soundClass,
						r = this;
					s.on("complete", this, e), s.on("error", this, i), s.load(t)
				}, i.onProgress = function(t)
				{
					"atlas" === this._type ? this.event("progress", .3 * t) : this.event("progress", t)
				}, i.onError = function(t)
				{
					this.event("error", t)
				}, i.onLoaded = function(t)
				{
					var i = this._type;
					if ("image" === i)
					{
						var n = new Texture(t);
						n.url = this._url, this.complete(n)
					}
					else if ("sound" === i || "htmlimage" === i || "nativeimage" === i) this.complete(t);
					else if ("atlas" === i)
					{
						if (!t.src)
						{
							if (!this._data)
							{
								if (this._data = t, t.meta && t.meta.image)
								{
									var s = t.meta.image.split(","),
										r = this._url.indexOf("/") >= 0 ? "/" : "\\",
										a = this._url.lastIndexOf(r),
										o = a >= 0 ? this._url.substr(0, a + 1) : "";
									a = this._url.indexOf("?");
									var h;
									h = a >= 0 ? this._url.substr(a) : "";
									for (var l = 0, u = s.length; u > l; l++) s[l] = o + s[l] + h
								}
								else s = [this._url.replace(".json", ".png")];
								s.reverse(), t.toLoads = s, t.pics = []
							}
							return this.event("progress", .3 + 1 / s.length * .6), this._loadImage(URL.formatURL(s.pop()))
						}
						if (this._data.pics.push(t), this._data.toLoads.length > 0) return this.event("progress", .3 + 1 / this._data.toLoads.length * .6), this._loadImage(URL.formatURL(this._data.toLoads.pop()));
						var c = this._data.frames,
							_ = this._data.meta && this._data.meta.prefix ? URL.basePath + this._data.meta.prefix : this._url.substring(0, this._url.lastIndexOf(".")) + "/",
							d = this._data.pics,
							f = e.atlasMap[this._url] || (e.atlasMap[this._url] = []);
						f.dir = _;
						for (var p in c)
						{
							var g = c[p],
								m = d[g.frame.idx ? g.frame.idx : 0],
								v = _ + p;
							e.loadedMap[v] = Texture.create(m, g.frame.x, g.frame.y, g.frame.w, g.frame.h, g.spriteSourceSize.x, g.spriteSourceSize.y, g.sourceSize.w, g.sourceSize.h), e.loadedMap[v].url = v, f.push(v)
						}
						this.complete(this._data)
					}
					else this.complete(t)
				}, i.complete = function(t)
				{
					this._data = t, e._loaders.push(this), e._isWorking || e.checkNext()
				}, i.endLoad = function(t)
				{
					t && (this._data = t), this._cache && (e.loadedMap[this._url] = this._data), this.event("progress", 1), this.event("complete", this.data instanceof Array ? [this.data] : this.data)
				}, __getset(0, i, "cache", function()
				{
					return this._cache
				}), __getset(0, i, "data", function()
				{
					return this._data
				}), __getset(0, i, "url", function()
				{
					return this._url
				}), __getset(0, i, "type", function()
				{
					return this._type
				}), e.checkNext = function()
				{
					e._isWorking = !0;
					for (var t = Browser.now(), i = t; e._startIndex < e._loaders.length;)
						if (i = Browser.now(), e._loaders[e._startIndex].endLoad(), e._startIndex++, Browser.now() - t > e.maxTimeOut) return console.log("loader callback cost a long time:" + (Browser.now() - t) + " url=" + e._loaders[e._startIndex - 1].url), void Laya.timer.frameOnce(1, null, e.checkNext);
					e._loaders.length = 0, e._startIndex = 0, e._isWorking = !1
				}, e._parseURL = function(t)
				{
					if (!t) return t;
					if (0 == t.indexOf("data:image")) return t;
					if (t.indexOf(",") < 0) t = URL.formatURL(t);
					else
					{
						for (var e = t.split(","), i = e.length - 1; i > -1; i--) e[i] = URL.formatURL(e[i]);
						t = e.join(",")
					}
					return t
				}, e.clearRes = function(t)
				{
					t = URL.formatURL(t);
					var i = e.atlasMap[t];
					if (i)
					{
						for (var n = 0, s = i.length; s > n; n++)
						{
							var r = i[n],
								a = e.getRes(r);
							a && a.destroy(), delete e.loadedMap[r]
						}
						i.length = 0, delete e.atlasMap[t], delete e.loadedMap[t]
					}
					else
					{
						var o = e.loadedMap[t];
						o && (o instanceof laya.resource.Texture && o.bitmap && o.destroy(), delete e.loadedMap[t])
					}
				}, e.getRes = function(t)
				{
					return e.loadedMap[e._parseURL(t)]
				}, e.getAtlas = function(t)
				{
					return e.atlasMap[URL.formatURL(t)]
				}, e.cacheRes = function(t, i)
				{
					e.loadedMap[URL.formatURL(t)] = i
				}, e.TEXT = "text", e.JSON = "json", e.XML = "xml", e.BUFFER = "arraybuffer", e.IMAGE = "image", e.SOUND = "sound", e.ATLAS = "atlas", e.typeMap = {
					png: "image",
					jpg: "image",
					jpeg: "image",
					txt: "text",
					json: "json",
					xml: "xml",
					als: "atlas",
					mp3: "sound",
					ogg: "sound",
					wav: "sound",
					part: "json"
				}, e.parserMap = {}, e.loadedMap = {}, e.maxTimeOut = 100, e.atlasMap = {}, e._loaders = [], e._isWorking = !1, e._startIndex = 0, e._extReg = /\.(\w+)\??/g, e
			}(EventDispatcher),
			LoaderManager = function(t)
			{
				function e()
				{
					this.retryNum = 1, this.maxLoader = 5, this._loaders = [], this._loaderCount = 0, this._resInfos = [], this._resMap = {}, this._infoPool = [], this._maxPriority = 5, this._failRes = {}, e.__super.call(this);
					for (var t = 0; t < this._maxPriority; t++) this._resInfos[t] = []
				}
				var i;
				__class(e, "laya.net.LoaderManager", t);
				var n = e.prototype;
				return n.load = function(t, e, n, s, r, a)
				{
					if (void 0 === r && (r = 1), void 0 === a && (a = !0), t instanceof Array) return this._loadAssets(t, e, n, s, r, a);
					t = Loader._parseURL(t);
					var o = Loader.getRes(t);
					if (null != o) e && e.runWith(o), this._loaderCount || this.event("complete");
					else
					{
						var h = this._resMap[t];
						h ? (e && h.on("complete", e.caller, e.method, e.args), n && h.on("progress", n.caller, n.method, n.args)) : (h = this._infoPool.length ? this._infoPool.pop() : new i, h.url = t, h.type = s, h.cache = a, e && h.on("complete", e.caller, e.method, e.args), n && h.on("progress", n.caller, n.method, n.args), this._resMap[t] = h, r = r < this._maxPriority ? r : this._maxPriority - 1, this._resInfos[r].push(h), this._next())
					}
					return this
				}, n._next = function()
				{
					if (!(this._loaderCount >= this.maxLoader))
					{
						for (var t = 0; t < this._maxPriority; t++)
						{
							var e = this._resInfos[t];
							if (e.length > 0)
							{
								var i = e.shift();
								if (i) return this._doLoad(i)
							}
						}
						this._loaderCount || this.event("complete")
					}
				}, n._doLoad = function(t)
				{
					function e(e)
					{
						i.offAll(), i._data = null, n._loaders.push(i), n._endLoad(t, e), n._loaderCount--, n._next()
					}
					this._loaderCount++;
					var i = this._loaders.length ? this._loaders.pop() : new Loader;
					i.on("complete", null, e), i.on("progress", null, function(e)
					{
						t.event("progress", e)
					}), i.on("error", null, function(t)
					{
						e(null)
					});
					var n = this;
					i.load(t.url, t.type, t.cache)
				}, n._endLoad = function(t, e)
				{
					if (null === e)
					{
						var i = this._failRes[t.url] || 0;
						if (i < this.retryNum) return console.log("[warn]Retry to load:", t.url), this._failRes[t.url] = i + 1, void this._resInfos[this._maxPriority - 1].push(t);
						console.log("[error]Failed to load:", t.url), this.event("error", t.url)
					}
					delete this._resMap[t.url], t.event("complete", e), t.offAll(), this._infoPool.push(t)
				}, n.clearRes = function(t)
				{
					Loader.clearRes(t)
				}, n.getRes = function(t)
				{
					return Loader.getRes(t)
				}, n.clearUnLoaded = function()
				{
					for (var t = 0; t < this._maxPriority; t++)
					{
						for (var e = this._resInfos[t], i = e.length - 1; i > -1; i--)
						{
							var n = e[i];
							n && (n.offAll(), this._infoPool.push(n))
						}
						e.length = 0
					}
					this._loaderCount = 0, this._resMap = {}
				}, n.cancelLoadByUrls = function(t)
				{
					if (t)
						for (var e = 0, i = t.length; i > e; e++) this.cancelLoadByUrl(t[e])
				}, n.cancelLoadByUrl = function(t)
				{
					t = URL.formatURL(t);
					for (var e = 0; e < this._maxPriority; e++)
						for (var i = this._resInfos[e], n = i.length - 1; n > -1; n--)
						{
							var s = i[n];
							s && s.url === t && (i[n] = null, s.offAll(), this._infoPool.push(s))
						}
					this._resMap[t] && delete this._resMap[t]
				}, n._loadAssets = function(t, e, i, n, s, r)
				{
					function a(t, i)
					{
						l++, t.progress = 1, l === h && e && e.run()
					}

					function o(t, e)
					{
						if (null != i)
						{
							t.progress = e;
							for (var n = 0, s = c.length, r = 0; s > r; r++)
							{
								var a = c[r];
								n += a.size * a.progress
							}
							var o = n / u;
							i.runWith(o)
						}
					}
					void 0 === s && (s = 1), void 0 === r && (r = !0);
					for (var h = t.length, l = 0, u = 0, c = [], _ = n || "image", d = 0; h > d; d++)
					{
						var f = t[d];
						"string" == typeof f && (f = {
							url: f,
							type: _,
							size: 1,
							priority: s
						}), f.size || (f.size = 1), f.progress = 0, u += f.size, c.push(f);
						var p = i ? Handler.create(this, o, [f], !1) : null;
						this.load(f.url, Handler.create(f, a, [f]), p, f.type, f.priority || 1, r)
					}
					return this
				}, e.cacheRes = function(t, e)
				{
					Loader.cacheRes(t, e)
				}, e.__init$ = function()
				{
					i = function(t)
					{
						function e()
						{
							this.url = null, this.type = null, this.cache = !1, e.__super.call(this)
						}
						return __class(e, "", t), e
					}(EventDispatcher)
				}, e
			}(EventDispatcher),
			Socket = function(t)
			{
				function e(t, i, n)
				{
					this._endian = null, this._stamp = NaN, this._socket = null, this._connected = !1, this._addInputPosition = 0, this._input = null, this._output = null, this.timeout = 0, this.objectEncoding = 0, this._byteClass = null, void 0 === i && (i = 0), e.__super.call(this), this._byteClass = n, this._byteClass = this._byteClass ? this._byteClass : Byte, this.endian = "bigEndian", this.timeout = 2e4, this._addInputPosition = 0, t && i > 0 && 65535 > i && this.connect(t, i)
				}
				__class(e, "laya.net.Socket", t);
				var i = e.prototype;
				return i.connect = function(t, e)
				{
					var i = "ws://" + t + ":" + e;
					this.connectByUrl(i)
				}, i.connectByUrl = function(t)
				{
					var e = this;
					null != this._socket && this.close(), this._socket && this._cleanSocket(), this._socket = new Browser.window.WebSocket(t), this._socket.binaryType = "arraybuffer", this._output = new this._byteClass, this._output.endian = this.endian, this._input = new this._byteClass, this._input.endian = this.endian, this._addInputPosition = 0, this._socket.onopen = function(t)
					{
						e._onOpen(t)
					}, this._socket.onmessage = function(t)
					{
						e._onMessage(t)
					}, this._socket.onclose = function(t)
					{
						e._onClose(t)
					}, this._socket.onerror = function(t)
					{
						e._onError(t)
					}
				}, i._cleanSocket = function()
				{
					try
					{
						this._socket.close()
					}
					catch (t)
					{}
					this._connected = !1, this._socket.onopen = null, this._socket.onmessage = null, this._socket.onclose = null, this._socket.onerror = null, this._socket = null
				}, i.close = function()
				{
					null != this._socket && this._cleanSocket()
				}, i._onOpen = function(t)
				{
					this._connected = !0, this.event("open", t)
				}, i._onMessage = function(t)
				{
					this._input.length > 0 && this._input.bytesAvailable < 1 && (this._input.clear(), this._addInputPosition = 0);
					var e = this._input.pos;
					if (!this._addInputPosition && (this._addInputPosition = 0), this._input.pos = this._addInputPosition, t && t.data)
					{
						var i = t.data;
						i && ("string" == typeof i ? this._input.writeUTFBytes(i) : this._input.writeArrayBuffer(i), this._addInputPosition = this._input.pos, this._input.pos = e), this.event("message", i)
					}
				}, i._onClose = function(t)
				{
					this._connected = !1, this.event("close", t)
				}, i._onError = function(t)
				{
					this.event("error", t)
				}, i.send = function(t)
				{
					this._socket.send(t)
				}, i.flush = function()
				{
					if (this._output && this._output.length > 0) try
					{
						this._socket && this._socket.send(this._output.__getBuffer().slice(0, this._output.length)), this._output.endian = this.endian, this._output.clear()
					}
					catch (t)
					{
						this.event("error", t)
					}
				}, __getset(0, i, "input", function()
				{
					return this._input
				}), __getset(0, i, "output", function()
				{
					return this._output
				}), __getset(0, i, "connected", function()
				{
					return this._connected
				}), __getset(0, i, "endian", function()
				{
					return this._endian
				}, function(t)
				{
					this._endian = t, null != this._input && (this._input.endian = t), null != this._output && (this._output.endian = t)
				}), e.LITTLE_ENDIAN = "littleEndian", e.BIG_ENDIAN = "bigEndian", e
			}(EventDispatcher),
			Resource = function(t)
			{
				function e()
				{
					this._id = 0, this._lastUseFrameCount = 0, this._memorySize = 0, this._name = null, this._released = !1, this._resourceManager = null, this.lock = !1, e.__super.call(this), this._$1__id = ++e._uniqueIDCounter, e._loadedResources.push(this), e._isLoadedResourcesSorted = !1, this._released = !0, this.lock = !1, this._memorySize = 0, this._lastUseFrameCount = -1, ResourceManager.currentResourceManager && ResourceManager.currentResourceManager.addResource(this)
				}
				__class(e, "laya.resource.Resource", t);
				var i = e.prototype;
				return Laya.imps(i,
				{
					"laya.resource.IDispose": !0
				}), i.recreateResource = function()
				{
					this.startCreate(), this.completeCreate()
				}, i.detoryResource = function() {}, i.activeResource = function(t)
				{
					void 0 === t && (t = !1), this._lastUseFrameCount = Stat.loopCount, (this._released || t) && this.recreateResource()
				}, i.releaseResource = function(t)
				{
					return void 0 === t && (t = !1), !t && this.lock ? !1 : !this._released || t ? (this.detoryResource(), this._released = !0, this._lastUseFrameCount = -1, this.event("released", this), !0) : !1
				}, i.setUniqueName = function(t)
				{
					for (var i = !0, n = 0; n < e._loadedResources.length; n++)
						if (e._loadedResources[n]._name === t && e._loadedResources[n] !== this) return void(i = !1);
					i ? this.name != t && (this.name = t, e._isLoadedResourcesSorted = !1) : this.setUniqueName(t.concat("-copy"))
				}, i.dispose = function()
				{
					if (null !== this._resourceManager) throw new Error("附属于resourceManager的资源不能独立释放！");
					this.lock = !1, this.releaseResource();
					var t = e._loadedResources.indexOf(this); - 1 !== t && (e._loadedResources.splice(t, 1), e._isLoadedResourcesSorted = !1)
				}, i.startCreate = function()
				{
					this.event("recovering", this)
				}, i.completeCreate = function()
				{
					this._released = !1, this.event("recovered", this)
				}, __getset(0, i, "id", function()
				{
					return this._$1__id
				}), __getset(0, i, "lastUseFrameCount", function()
				{
					return this._lastUseFrameCount
				}), __getset(0, i, "name", function()
				{
					return this._name
				}, function(t)
				{
					!t && "" === t || this.name === t || (this._name = t, e._isLoadedResourcesSorted = !1)
				}), __getset(0, i, "resourceManager", function()
				{
					return this._resourceManager
				}), __getset(0, i, "memorySize", function()
				{
					return this._memorySize
				}, function(t)
				{
					var e = t - this._memorySize;
					this._memorySize = t, this.resourceManager && this.resourceManager.addSize(e)
				}), __getset(0, i, "released", function()
				{
					return this._released
				}), __getset(1, e, "sortedLoadedResourcesByName", function()
				{
					return e._isLoadedResourcesSorted || (e._isLoadedResourcesSorted = !0, e._loadedResources.sort(e.compareResourcesByName)), e._loadedResources
				}, laya.events.EventDispatcher._$SET_sortedLoadedResourcesByName), e.getLoadedResourceByIndex = function(t)
				{
					return e._loadedResources[t]
				}, e.getLoadedResourcesCount = function()
				{
					return e._loadedResources.length
				}, e.compareResourcesByName = function(t, e)
				{
					if (t === e) return 0;
					var i = t.name,
						n = e.name;
					if (null === i) return null === n ? 0 : -1;
					if (null == n) return 1;
					var s = i.localeCompare(n);
					return 0 != s ? s : (e.setUniqueName(n), n = e.name, i.localeCompare(n))
				}, e.animationCache = {}, e.meshCache = {}, e.materialCache = {}, e._uniqueIDCounter = 0, e._loadedResources = [], e._isLoadedResourcesSorted = !1, e
			}(EventDispatcher),
			Texture = function(t)
			{
				function e(t, i)
				{
					this.offsetX = 0, this.offsetY = 0, this.sourceWidth = 0, this.sourceHeight = 0, this._w = 0, this._h = 0, this._uvID = 0, e.__super.call(this), t && t.useNum++, this.setTo(t, i)
				}
				__class(e, "laya.resource.Texture", t);
				var i = e.prototype;
				return i.setTo = function(t, i)
				{
					if (this.bitmap = t, this.uv = i || e.DEF_UV, t)
					{
						this._w = t.width, this._h = t.height, this.sourceWidth = this.sourceWidth || this._w, this.sourceHeight = this.sourceHeight || this._h, this._loaded = this._w > 0;
						var n = this;
						if (this._loaded) RunDriver.addToAtlas && RunDriver.addToAtlas(n);
						else
						{
							var s = t;
							s instanceof laya.resource.HTMLImage && s.image && s.image.addEventListener("load", function(t)
							{
								RunDriver.addToAtlas && RunDriver.addToAtlas(n)
							}, !1)
						}
					}
				}, i.active = function()
				{
					this.bitmap.activeResource()
				}, i.destroy = function(t)
				{
					void 0 === t && (t = !1), this.bitmap && this.bitmap.useNum > 0 && (t ? (this.bitmap.dispose(), this.bitmap.useNum = 0) : (this.bitmap.useNum--, 0 == this.bitmap.useNum && this.bitmap.dispose()), this.bitmap = null, this.url && this === Laya.loader.getRes(this.url) && Laya.loader.clearRes(this.url), this._loaded = !1)
				}, i.load = function(t)
				{
					var e = this;
					this._loaded = !1;
					var i = this.bitmap || (this.bitmap = HTMLImage.create(URL.formatURL(t)));
					i && i.useNum++;
					var n = this;
					i.onload = function()
					{
						i.onload = null, n._loaded = !0, e.sourceWidth = e._w = i.width, e.sourceHeight = e._h = i.height, n.event("loaded", this), RunDriver.addToAtlas && RunDriver.addToAtlas(n)
					}
				}, i.addTextureToAtlas = function(t)
				{
					RunDriver.addTextureToAtlas(this)
				}, i.getPixels = function(t, e, i, n)
				{
					if (Render.isWebGL) return RunDriver.getTexturePixels(this, t, e, i, n);
					Browser.canvas.size(t + i, e + n), Browser.context.drawImage(this.bitmap.source, 0, 0);
					var s = Browser.context.getImageData(t, e, i, n);
					return s.data
				}, __getset(0, i, "height", function()
				{
					return this._h ? this._h : this.uv && this.uv !== e.DEF_UV ? (this.uv[5] - this.uv[1]) * this.bitmap.height : this.bitmap.height
				}, function(t)
				{
					this._h = t, this.sourceHeight || (this.sourceHeight = t)
				}), __getset(0, i, "loaded", function()
				{
					return this._loaded
				}), __getset(0, i, "released", function()
				{
					return this.bitmap.released
				}), __getset(0, i, "repeat", function()
				{
					return Render.isWebGL && this.bitmap ? this.bitmap.repeat : !0
				}, function(t)
				{
					t && Render.isWebGL && this.bitmap && (this.bitmap.repeat = t, t && (this.bitmap.enableMerageInAtlas = !1))
				}), __getset(0, i, "source", function()
				{
					return this.bitmap.activeResource(), this.bitmap.source
				}), __getset(0, i, "width", function()
				{
					return this._w ? this._w : this.uv && this.uv !== e.DEF_UV ? (this.uv[2] - this.uv[0]) * this.bitmap.width : this.bitmap.width
				}, function(t)
				{
					this._w = t, this.sourceWidth || (this.sourceWidth = t)
				}), __getset(0, i, "isLinearSampling", function()
				{
					return Render.isWebGL ? 9728 != this.bitmap.minFifter : !0
				}, function(t)
				{
					!t && Render.isWebGL && (t || -1 != this.bitmap.minFifter || -1 != this.bitmap.magFifter || (this.bitmap.minFifter = 9728, this.bitmap.magFifter = 9728, this.bitmap.enableMerageInAtlas = !1))
				}), e.moveUV = function(t, e, i)
				{
					for (var n = 0; 8 > n; n += 2) i[n] += t, i[n + 1] += e;
					return i
				}, e.create = function(t, i, n, s, r, a, o, h, l)
				{
					void 0 === a && (a = 0), void 0 === o && (o = 0), void 0 === h && (h = 0), void 0 === l && (l = 0);
					var u = t instanceof laya.resource.Texture,
						c = u ? t.uv : e.DEF_UV,
						_ = u ? t.bitmap : t,
						d = new e(_, null);
					d.width = s, d.height = r, d.offsetX = a, d.offsetY = o, d.sourceWidth = h || s, d.sourceHeight = l || r;
					var f = 1 / _.width,
						p = 1 / _.height;
					i *= f, n *= p, s *= f, r *= p;
					var g = d.uv[0],
						m = d.uv[1],
						v = d.uv[4],
						y = d.uv[5],
						w = v - g,
						x = y - m,
						T = e.moveUV(c[0], c[1], [i, n, i + s, n, i + s, n + r, i, n + r]);
					return d.uv = [g + T[0] * w, m + T[1] * x, v - (1 - T[2]) * w, m + T[3] * x, v - (1 - T[4]) * w, y - (1 - T[5]) * x, g + T[6] * w, y - (1 - T[7]) * x], d
				}, e.createFromTexture = function(t, i, n, s, r)
				{
					var a = Rectangle.TEMP.setTo(i - t.offsetX, n - t.offsetY, s, r),
						o = a.intersection(e._rect1.setTo(0, 0, t.width, t.height), e._rect2);
					if (!o) return null;
					var h = e.create(t, o.x, o.y, o.width, o.height, o.x - a.x, o.y - a.y, s, r);
					return h.bitmap.useNum--, h
				}, e.DEF_UV = [0, 0, 1, 0, 1, 1, 0, 1], e.INV_UV = [0, 1, 1, 1, 1, 0, 0, 0], e._rect1 = new Rectangle, e._rect2 = new Rectangle, e
			}(EventDispatcher),
			TimeLine = function(t)
			{
				function e()
				{
					this._labelDic = null, this._tweenDic = {}, this._tweenDataList = [], this._endTweenDataList = null, this._currTime = 0, this._lastTime = 0, this._startTime = 0, this._index = 0, this._gidIndex = 0, this._firstTweenDic = {}, this._startTimeSort = !1, this._endTimeSort = !1, this._loopKey = !1, this.scale = 1, this._frameRate = 60, this._frameIndex = 0, this._total = 0, e.__super.call(this)
				}
				var i;
				__class(e, "laya.utils.TimeLine", t);
				var n = e.prototype;
				return n.to = function(t, e, i, n, s)
				{
					return void 0 === s && (s = 0), this._create(t, e, i, n, s, !0)
				}, n.from = function(t, e, i, n, s)
				{
					return void 0 === s && (s = 0), this._create(t, e, i, n, s, !1)
				}, n._create = function(t, e, n, s, r, a)
				{
					var o = new i;
					return o.isTo = a, o.type = 0, o.target = t, o.duration = n, o.data = e, o.startTime = this._startTime + r, o.endTime = o.startTime + o.duration, o.ease = s, this._startTime = Math.max(o.endTime, this._startTime), this._tweenDataList.push(o), this._startTimeSort = !0, this._endTimeSort = !0, this
				}, n.addLabel = function(t, e)
				{
					var n = new i;
					return n.type = 1, n.data = t, n.endTime = n.startTime = this._startTime + e, this._labelDic || (this._labelDic = {}), this._labelDic[t] = n, this._tweenDataList.push(n), this
				}, n.removeLabel = function(t)
				{
					if (this._labelDic && this._labelDic[t])
					{
						var e = this._labelDic[t];
						if (e)
						{
							var i = this._tweenDataList.indexOf(e);
							i > -1 && this._tweenDataList.splice(i, 1)
						}
						delete this._labelDic[t]
					}
				}, n.gotoTime = function(t)
				{
					function e(t, e)
					{
						return t.endTime > e.endTime ? 1 : t.endTime < e.endTime ? -1 : 0
					}
					if (null != this._tweenDataList && 0 != this._tweenDataList.length)
					{
						var i, n;
						for (var s in this._firstTweenDic)
							if (n = this._firstTweenDic[s])
								for (var r in n) n.diyTarget.hasOwnProperty(r) && (n.diyTarget[r] = n[r]);
						for (s in this._tweenDic) i = this._tweenDic[s], i.clear(), delete this._tweenDic[s];
						this._index = 0, this._gidIndex = 0, this._currTime = t, this._lastTime = Browser.now();
						var a;
						null == this._endTweenDataList || this._endTimeSort ? (this._endTimeSort = !1, this._endTweenDataList = a = this._tweenDataList.concat(), a.sort(e)) : a = this._endTweenDataList;
						for (var o, h = 0, l = a.length; l > h; h++)
							if (o = a[h], 0 == o.type)
							{
								if (!(t >= o.endTime)) break;
								this._index = Math.max(this._index, h + 1);
								var u = o.data;
								for (var c in u) o.isTo && (o.target[c] = u[c])
							}
						for (h = 0, l = this._tweenDataList.length; l > h; h++) o = this._tweenDataList[h], 0 == o.type && t >= o.startTime && t < o.endTime && (this._index = Math.max(this._index, h + 1), this._gidIndex++, i = Pool.getItemByClass("tween", Tween), i._create(o.target, o.data, o.duration, o.ease, Handler.create(this, this._animComplete, [this._gidIndex]), 0, !1, o.isTo, !0, !1), i.setStartTime(this._currTime - (t - o.startTime)), i._updateEase(this._currTime), i.gid = this._gidIndex, this._tweenDic[this._gidIndex] = i)
					}
				}, n.gotoLabel = function(t)
				{
					if (null != this._labelDic)
					{
						var e = this._labelDic[t];
						e && this.gotoTime(e.startTime)
					}
				}, n.pause = function()
				{
					Laya.timer.clear(this, this._update)
				}, n.resume = function()
				{
					this.play(this._currTime, this._loopKey)
				}, n.play = function(t, e)
				{
					function i(t, e)
					{
						return t.startTime > e.startTime ? 1 : t.startTime < e.startTime ? -1 : 0
					}
					if (void 0 === t && (t = 0), void 0 === e && (e = !1), this._startTimeSort)
					{
						this._startTimeSort = !1, this._tweenDataList.sort(i);
						for (var n = 0, s = this._tweenDataList.length; s > n; n++)
						{
							var r = this._tweenDataList[n];
							if (null != r && 0 == r.type)
							{
								var a = r.target,
									o = a.$_GID || (a.$_GID = Utils.getGID()),
									h = null;
								null == this._firstTweenDic[o] ? (h = {}, h.diyTarget = a, this._firstTweenDic[o] = h) : h = this._firstTweenDic[o];
								for (var l in r.data) null == h[l] && (h[l] = a[l])
							}
						}
					}
					"string" == typeof t ? this.gotoLabel(t) : this.gotoTime(t), this._loopKey = e, this._lastTime = Browser.now(), Laya.timer.frameLoop(1, this, this._update)
				}, n._update = function()
				{
					if (this._currTime >= this._startTime)
					{
						if (!this._loopKey) return this._complete(), void this.pause();
						this._complete(), this.gotoTime(0)
					}
					var t = Browser.now(),
						e = t - this._lastTime,
						i = this._currTime += e * this.scale;
					this._lastTime = t;
					var n;
					if (0 != this._tweenDataList.length && this._index < this._tweenDataList.length)
					{
						var s = this._tweenDataList[this._index];
						i >= s.startTime && (this._index++, 0 == s.type ? (this._gidIndex++, n = new Tween, n._create(s.target, s.data, s.duration, s.ease, new Handler(this, this._animComplete, [this._gidIndex]), 0, !1, s.isTo, !0, !1), n.setStartTime(i), n.gid = this._gidIndex, this._tweenDic[this._gidIndex] = n) : this.event("label", s.data))
					}
					for (var r in this._tweenDic) n = this._tweenDic[r], n._updateEase(i)
				}, n._animComplete = function(t)
				{
					var e = this._tweenDic[t];
					e && delete this._tweenDic[t]
				}, n._complete = function()
				{
					this.event("complete")
				}, n.reset = function()
				{
					var t;
					if (this._labelDic)
						for (t in this._labelDic) delete this._labelDic[t];
					var e;
					for (t in this._tweenDic) e = this._tweenDic[t], e.clear(), delete this._tweenDic[t];
					for (t in this._firstTweenDic) delete this._firstTweenDic[t];
					this._endTweenDataList = null, this._tweenDataList.length = 0, this._currTime = 0, this._lastTime = 0, this._startTime = 0, this._index = 0, this._gidIndex = 0, this.scale = 1, Laya.timer.clear(this, this._update)
				}, n.destroy = function()
				{
					this.reset(), this._labelDic = null, this._tweenDic = null, this._tweenDataList = null, this._firstTweenDic = null
				}, __getset(0, n, "index", function()
				{
					return this._frameIndex
				}, function(t)
				{
					this._frameIndex = t, this.gotoTime(this._frameIndex / this._frameRate * 1e3)
				}), __getset(0, n, "total", function()
				{
					return this._total = Math.floor(this._startTime / 1e3 * this._frameRate), this._total
				}), e.to = function(t, i, n, s, r)
				{
					return void 0 === r && (r = 0), (new e).to(t, i, n, s, r)
				}, e.from = function(t, i, n, s, r)
				{
					return void 0 === r && (r = 0), (new e).from(t, i, n, s, r)
				}, e.__init$ = function()
				{
					i = function()
					{
						function t()
						{
							this.type = 0, this.isTo = !0, this.startTime = NaN, this.endTime = NaN, this.target = null, this.duration = NaN, this.ease = null, this.data = null
						}
						return __class(t, ""), t
					}()
				}, e
			}(EventDispatcher),
			Sprite = function(t)
			{
				function e()
				{
					this.mouseThrough = !1, this._transform = null, this._tfChanged = !1, this._x = 0, this._y = 0, this._width = 0, this._height = 0, this._repaint = 1, this._mouseEnableState = 0, this._zOrder = 0, this._graphics = null, this._renderType = 0, this.autoSize = !1, this.hitTestPrior = !1, this._optimizeScrollRect = !1, e.__super.call(this), this._style = Style.EMPTY
				}
				__class(e, "laya.display.Sprite", t);
				var i = e.prototype;
				return Laya.imps(i,
				{
					"laya.display.ILayout": !0
				}), i.destroy = function(e)
				{
					void 0 === e && (e = !0), t.prototype.destroy.call(this, e), this._style && this._style.destroy(), this._transform = null, this._style = null, this._graphics = null
				}, i.updateZOrder = function()
				{
					Utils.updateOrder(this._childs) && this.repaint()
				}, i.reCache = function()
				{
					this._$P.cacheCanvas && (this._$P.cacheCanvas.reCache = !0)
				}, i.setBounds = function(t)
				{
					this._set$P("uBounds", t)
				}, i.getBounds = function()
				{
					return this._$P.mBounds || this._set$P("mBounds", new Rectangle), Rectangle._getWrapRec(this._boundPointsToParent(), this._$P.mBounds)
				}, i.getSelfBounds = function()
				{
					return this._$P.mBounds || this._set$P("mBounds", new Rectangle), Rectangle._getWrapRec(this._getBoundPointsM(!1), this._$P.mBounds)
				}, i._boundPointsToParent = function(t)
				{
					void 0 === t && (t = !1);
					var e = 0,
						i = 0;
					this._style && (e = this._style._tf.translateX, i = this._style._tf.translateY, t = t || 0 !== this._style._tf.rotate, this._style.scrollRect && (e += this._style.scrollRect.x, i += this._style.scrollRect.y));
					var n = this._getBoundPointsM(t);
					if (!n || n.length < 1) return n;
					if (8 != n.length && (n = t ? GrahamScan.scanPList(n) : Rectangle._getWrapRec(n, Rectangle.TEMP)._getBoundPoints()), !this.transform) return Utils.transPointList(n, this.x - e, this.y - i), n;
					var s = Point.TEMP,
						r = 0,
						a = n.length;
					for (r = 0; a > r; r += 2) s.x = n[r], s.y = n[r + 1], this.toParentPoint(s), n[r] = s.x, n[r + 1] = s.y;
					return n
				}, i.getGraphicBounds = function()
				{
					return this._graphics ? this._graphics.getBounds() : Rectangle.TEMP.setTo(0, 0, 0, 0)
				}, i._getBoundPointsM = function(t)
				{
					if (void 0 === t && (t = !1), this._$P.uBounds) return this._$P.uBounds._getBoundPoints();
					if (this._$P.temBM || this._set$P("temBM", []), this.scrollRect)
					{
						var e = Utils.clearArray(this._$P.temBM),
							i = Rectangle.TEMP;
						return i.copyFrom(this.scrollRect), Utils.concatArray(e, i._getBoundPoints()), e
					}
					var n, s, r, a = this._graphics ? this._graphics.getBoundPoints() : Utils.clearArray(this._$P.temBM);
					r = this._childs;
					for (var o = 0, h = r.length; h > o; o++) n = r[o], n instanceof laya.display.Sprite && 1 == n.visible && (s = n._boundPointsToParent(t), s && (a = a ? Utils.concatArray(a, s) : s));
					return a
				}, i.getStyle = function()
				{
					return this._style === Style.EMPTY && (this._style = new Style), this._style
				}, i.setStyle = function(t)
				{
					this._style = t
				}, i._adjustTransform = function()
				{
					"use strict";
					this._tfChanged = !1;
					var t, e = this._style,
						i = e._tf,
						n = i.scaleX,
						s = i.scaleY;
					if (i.rotate || 1 !== n || 1 !== s || i.skewX || i.skewY)
					{
						if (t = this._transform || (this._transform = Matrix.create()), t.bTransform = !0, i.rotate)
						{
							var r = .0174532922222222 * i.rotate,
								a = t.cos = Math.cos(r),
								o = t.sin = Math.sin(r);
							return t.a = n * a, t.b = n * o, t.c = -s * o, t.d = s * a, t.tx = t.ty = 0, t
						}
						return t.a = n, t.d = s, t.c = t.b = t.tx = t.ty = 0, i.skewX || i.skewY ? t.skew(.0174532922222222 * i.skewX, .0174532922222222 * i.skewY) : t
					}
					return this._transform && this._transform.destroy(), this._transform = null, this._renderType &= -5, t
				}, i.pos = function(t, e)
				{
					return this._x === t && this._y === e || (this.x = t, this.y = e), this
				}, i.pivot = function(t, e)
				{
					return this.pivotX = t, this.pivotY = e, this
				}, i.size = function(t, e)
				{
					return this.width = t, this.height = e, this
				}, i.scale = function(t, e)
				{
					return this.scaleX = t, this.scaleY = e, this
				}, i.skew = function(t, e)
				{
					return this.skewX = t, this.skewY = e, this
				}, i.render = function(t, e, i)
				{
					Stat.spriteCount++, RenderSprite.renders[this._renderType]._fun(this, t, e + this._x, i + this._y), this._repaint = 0
				}, i.drawToCanvas = function(t, e, i, n)
				{
					return RunDriver.drawToCanvas(this, this._renderType, t, e, i, n)
				}, i.customRender = function(t, e, i)
				{
					this._renderType |= 512
				}, i._applyFilters = function()
				{
					if (!Render.isWebGL)
					{
						var t;
						if (t = this._$P.filters, t && !(t.length < 1))
							for (var e = 0, i = t.length; i > e; e++) t[e].action.apply(this._$P.cacheCanvas)
					}
				}, i._isHaveGlowFilter = function()
				{
					var t = 0,
						e = 0;
					if (this.filters)
						for (t = 0; t < this.filters.length; t++)
							if (8 == this.filters[t].type) return !0;
					for (t = 0, e = this._childs.length; e > t; t++)
						if (this._childs[t]._isHaveGlowFilter()) return !0;
					return !1
				}, i.localToGlobal = function(t, e)
				{
					if (void 0 === e && (e = !1), !this._displayedInStage || !t) return t;
					e === !0 && (t = new Point(t.x, t.y));
					for (var i = this; i && i != Laya.stage;) t = i.toParentPoint(t), i = i.parent;
					return t
				}, i.globalToLocal = function(t, e)
				{
					if (void 0 === e && (e = !1), !this._displayedInStage || !t) return t;
					e === !0 && (t = new Point(t.x, t.y));
					for (var i = this, n = []; i && i != Laya.stage;) n.push(i), i = i.parent;
					for (var s = n.length - 1; s >= 0;) i = n[s], t = i.fromParentPoint(t), s--;
					return t
				}, i.toParentPoint = function(t)
				{
					if (!t) return t;
					t.x -= this.pivotX, t.y -= this.pivotY, this.transform && this._transform.transformPoint(t), t.x += this._x, t.y += this._y;
					var e = this._style.scrollRect;
					return e && (t.x -= e.x, t.y -= e.y), t
				}, i.fromParentPoint = function(t)
				{
					if (!t) return t;
					t.x -= this._x, t.y -= this._y;
					var e = this._style.scrollRect;
					return e && (t.x += e.x, t.y += e.y), this.transform && this._transform.invertTransformPoint(t), t.x += this.pivotX, t.y += this.pivotY, t
				}, i.on = function(t, e, i, n)
				{
					return 1 !== this._mouseEnableState && this.isMouseEvent(t) && (this._displayedInStage ? this._$2__onDisplay() : laya.events.EventDispatcher.prototype.once.call(this, "display", this, this._$2__onDisplay)), laya.events.EventDispatcher.prototype.on.call(this, t, e, i, n)
				}, i.once = function(t, e, i, n)
				{
					return 1 !== this._mouseEnableState && this.isMouseEvent(t) && (this._displayedInStage ? this._$2__onDisplay() : laya.events.EventDispatcher.prototype.once.call(this, "display", this, this._$2__onDisplay)), laya.events.EventDispatcher.prototype.once.call(this, t, e, i, n)
				}, i._$2__onDisplay = function()
				{
					if (1 !== this._mouseEnableState)
						for (var t = this; t && 1 !== t._mouseEnableState;) t.mouseEnabled = !0, t = t.parent
				}, i.loadImage = function(t, e, i, n, s, r)
				{
					function a(t)
					{
						o.destroyed || (o.size(e + (n || t.width), i + (s || t.height)), o.repaint(), r && r.runWith(t))
					}
					var o = this;
					return void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === s && (s = 0), this.graphics.loadImage(t, e, i, n, s, a), this
				}, i.repaint = function()
				{
					this.model && this.model.repaint && this.model.repaint(), 0 === this._repaint && (this._repaint = 1, this.parentRepaint()), this._$P && this._$P.maskParent && this._$P.maskParent.repaint()
				}, i._needRepaint = function()
				{
					return 0 !== this._repaint && this._$P.cacheCanvas && this._$P.cacheCanvas.reCache
				}, i._childChanged = function(t)
				{
					this._childs.length ? this._renderType |= 2048 : this._renderType &= -2049, t && t.zOrder && Laya.timer.callLater(this, this.updateZOrder), this.repaint()
				}, i.parentRepaint = function()
				{
					var t = this._parent;
					t && 0 === t._repaint && (t._repaint = 1, t.parentRepaint())
				}, i.startDrag = function(t, e, i, n, s, r)
				{
					void 0 === e && (e = !1), void 0 === i && (i = 0), void 0 === n && (n = 300), void 0 === r && (r = !1), this._$P.dragging || this._set$P("dragging", new Dragging), this._$P.dragging.start(this, t, e, i, n, s, r)
				}, i.stopDrag = function()
				{
					this._$P.dragging && this._$P.dragging.stop()
				}, i._setDisplay = function(e)
				{
					if (!e && this._$P.cacheCanvas && this._$P.cacheCanvas.ctx && (Pool.recover("RenderContext", this._$P.cacheCanvas.ctx), this._$P.cacheCanvas.ctx = null), !e)
					{
						var i = this._$P._filterCache;
						i && (i.destroy(), i.recycle(), this._set$P("_filterCache", null)), this._$P._isHaveGlowFilter && this._set$P("_isHaveGlowFilter", !1)
					}
					t.prototype._setDisplay.call(this, e)
				}, i.hitTestPoint = function(t, e)
				{
					var i = this.globalToLocal(Point.TEMP.setTo(t, e)),
						n = this._$P.hitArea ? this._$P.hitArea : Rectangle.EMPTY.setTo(0, 0, this._width, this._height);
					return n.contains(i.x, i.y)
				}, i.getMousePoint = function()
				{
					return this.globalToLocal(Point.TEMP.setTo(Laya.stage.mouseX, Laya.stage.mouseY))
				}, i._getWords = function()
				{
					return null
				}, i._addChildsToLayout = function(t)
				{
					var e = this._getWords();
					if (null == e && 0 == this._childs.length) return !1;
					if (e)
						for (var i = 0, n = e.length; n > i; i++) t.push(e[i]);
					return this._childs.forEach(function(e, i, n)
					{
						e._style._enableLayout() && e._addToLayout(t)
					}), !0
				}, i._addToLayout = function(t)
				{
					this._style.absolute || (this._style.block ? t.push(this) : this._addChildsToLayout(t) && (this.x = this.y = 0))
				}, i._isChar = function()
				{
					return !1
				}, i._getCSSStyle = function()
				{
					return this._style.getCSSStyle()
				}, i._setAttributes = function(t, e)
				{
					switch (t)
					{
						case "x":
							this.x = parseFloat(e);
							break;
						case "y":
							this.y = parseFloat(e);
							break;
						case "width":
							this.width = parseFloat(e);
							break;
						case "height":
							this.height = parseFloat(e);
							break;
						default:
							this[t] = e
					}
				}, i._layoutLater = function()
				{
					this.parent && this.parent._layoutLater()
				}, __getset(0, i, "optimizeScrollRect", function()
				{
					return this._optimizeScrollRect
				}, function(t)
				{
					this._optimizeScrollRect != t && (this._optimizeScrollRect = t, this.model && this.model.optimizeScrollRect(t))
				}), __getset(0, i, "scaleX", function()
				{
					return this._style._tf.scaleX
				}, function(t)
				{
					var e = this.getStyle();
					if (e._tf.scaleX !== t)
					{
						e.setScaleX(t), this._tfChanged = !0, this.model && this.model.scale(t, e._tf.scaleY), this._renderType |= 4;
						var i = this._parent;
						i && 0 === i._repaint && (i._repaint = 1, i.parentRepaint())
					}
				}), __getset(0, i, "cacheAsBitmap", function()
				{
					return "none" !== this.cacheAs
				}, function(t)
				{
					this.cacheAs = t ? this._$P.hasFilter ? "none" : "normal" : "none"
				}), __getset(0, i, "customRenderEnable", null, function(t)
				{
					if (t && (this._renderType |= 512, Render.isConchNode))
					{
						laya.display.Sprite.CustomList.push(this);
						var e = new HTMLCanvas("2d");
						e._setContext(new CanvasRenderingContext2D), this.customContext = new RenderContext(0, 0, e), e.context.setCanvasType && e.context.setCanvasType(2), this.model.custom(e.context)
					}
				}), __getset(0, i, "cacheAs", function()
				{
					return null == this._$P.cacheCanvas ? "none" : this._$P.cacheCanvas.type
				}, function(t)
				{
					var e = this._$P.cacheCanvas;
					t !== (e ? e.type : "none") && ("none" !== t ? (e || (e = this._set$P("cacheCanvas", Pool.getItemByClass("cacheCanvas", Object))), e.type = t, e.reCache = !0, this._renderType |= 8, "bitmap" == t && this.model && this.model.cacheAs(1), this._set$P("cacheForFilters", !1)) : this._$P.hasFilter ? this._set$P("cacheForFilters", !0) : (e && Pool.recover("cacheCanvas", e), this._$P.cacheCanvas = null, this._renderType &= -9, this.model && this.model.cacheAs(0)), this.repaint())
				}), __getset(0, i, "staticCache", function()
				{
					return this._$P.staticCache
				}, function(t)
				{
					this._set$P("staticCache", t), !t && this._$P.cacheCanvas && (this._$P.cacheCanvas.reCache = !0)
				}), __getset(0, i, "x", function()
				{
					return this._x
				}, function(t)
				{
					if (!this.destroyed)
					{
						var e = this._parent;
						this._x !== t && (this._x = t, this.model && this.model.pos(t, this._y), e && 0 === e._repaint && (e._repaint = 1, e.parentRepaint()), this._$P.maskParent && 0 === this._$P.maskParent._repaint && (this._$P.maskParent._repaint = 1, this._$P.maskParent.parentRepaint()))
					}
				}), __getset(0, i, "y", function()
				{
					return this._y
				}, function(t)
				{
					if (!this.destroyed)
					{
						var e = this._parent;
						this._y !== t && (this._y = t, this.model && this.model.pos(this._x, t), e && 0 === e._repaint && (e._repaint = 1, e.parentRepaint()), this._$P.maskParent && 0 === this._$P.maskParent._repaint && (this._$P.maskParent._repaint = 1, this._$P.maskParent.parentRepaint()))
					}
				}), __getset(0, i, "skewX", function()
				{
					return this._style._tf.skewX
				}, function(t)
				{
					var e = this.getStyle();
					if (e._tf.skewX !== t)
					{
						e.setSkewX(t), this._tfChanged = !0, this._renderType |= 4;
						var i = this._parent;
						i && 0 === i._repaint && (i._repaint = 1, i.parentRepaint())
					}
				}), __getset(0, i, "width", function()
				{
					return this.autoSize ? this.getSelfBounds().width : this._width
				}, function(t)
				{
					this._width !== t && (this._width = t, this.model && this.model.size(t, this._height), this.repaint())
				}), __getset(0, i, "height", function()
				{
					return this.autoSize ? this.getSelfBounds().height : this._height
				}, function(t)
				{
					this._height !== t && (this._height = t, this.model && this.model.size(this._width, t), this.repaint())
				}), __getset(0, i, "hitArea", function()
				{
					return this._$P.hitArea
				}, function(t)
				{
					this._set$P("hitArea", t)
				}), __getset(0, i, "rotation", function()
				{
					return this._style._tf.rotate
				}, function(t)
				{
					var e = this.getStyle();
					if (e._tf.rotate !== t)
					{
						e.setRotate(t), this._tfChanged = !0, this.model && this.model.rotate(t), this._renderType |= 4;
						var i = this._parent;
						i && 0 === i._repaint && (i._repaint = 1, i.parentRepaint())
					}
				}), __getset(0, i, "scaleY", function()
				{
					return this._style._tf.scaleY
				}, function(t)
				{
					var e = this.getStyle();
					if (e._tf.scaleY !== t)
					{
						e.setScaleY(t), this._tfChanged = !0, this.model && this.model.scale(e._tf.scaleX, t), this._renderType |= 4;
						var i = this._parent;
						i && 0 === i._repaint && (i._repaint = 1, i.parentRepaint())
					}
				}), __getset(0, i, "blendMode", function()
				{
					return this._style.blendMode
				}, function(t)
				{
					this.getStyle().blendMode = t, this.model && this.model.blendMode(t), t && "source-over" != t ? this._renderType |= 32 : this._renderType &= -33, this.parentRepaint()
				}), __getset(0, i, "skewY", function()
				{
					return this._style._tf.skewY
				}, function(t)
				{
					var e = this.getStyle();
					if (e._tf.skewY !== t)
					{
						e.setSkewY(t), this._tfChanged = !0, this.model && this.model.skew(e._tf.skewX, t), this._renderType |= 4;
						var i = this._parent;
						i && 0 === i._repaint && (i._repaint = 1, i.parentRepaint())
					}
				}), __getset(0, i, "transform", function()
				{
					return this._tfChanged ? this._adjustTransform() : this._transform
				}, function(t)
				{
					this._tfChanged = !1, this._transform = t, t && (this._x = t.tx, this._y = t.ty, t.tx = t.ty = 0, this.model && this.model.transform(t.a, t.b, t.c, t.d, this._x, this._y)), t ? this._renderType |= 4 : (this._renderType &= -5, this.model && this.model.removeType(4)), this.parentRepaint()
				}), __getset(0, i, "pivotX", function()
				{
					return this._style._tf.translateX
				}, function(t)
				{
					this.getStyle().setTranslateX(t), this.model && this.model.pivot(t, this._style._tf.translateY), this.repaint()
				}), __getset(0, i, "pivotY", function()
				{
					return this._style._tf.translateY
				}, function(t)
				{
					this.getStyle().setTranslateY(t), this.model && this.model.pivot(this._style._tf.translateX, t), this.repaint()
				}), __getset(0, i, "alpha", function()
				{
					return this._style.alpha
				}, function(t)
				{
					this._style && this._style.alpha !== t && (t = 0 > t ? 0 : t > 1 ? 1 : t, this.getStyle().alpha = t, this.model && this.model.alpha(t), 1 !== t ? this._renderType |= 2 : this._renderType &= -3, this.parentRepaint())
				}), __getset(0, i, "visible", function()
				{
					return this._style.visible
				}, function(t)
				{
					this._style && this._style.visible !== t && (this.getStyle().visible = t, this.model && this.model.visible(t), this.parentRepaint())
				}), __getset(0, i, "globalScaleY", function()
				{
					for (var t = 1, e = this; e && e !== Laya.stage;) t *= e.scaleX, e = e.parent;
					return t
				}), __getset(0, i, "graphics", function()
				{
					return this._graphics || (this.graphics = RunDriver.createGraphics())
				}, function(t)
				{
					this._graphics && (this._graphics._sp = null), this._graphics = t, t ? (this._renderType &= -2, this._renderType |= 256, t._sp = this, this.model && this.model.graphics(this._graphics)) : (this._renderType &= -257, this._renderType &= -2, this.model && this.model.removeType(256)), this.repaint()
				}), __getset(0, i, "scrollRect", function()
				{
					return this._style.scrollRect
				}, function(t)
				{
					this.getStyle().scrollRect = t, this.repaint(), t ? (this._renderType |= 64, this.model && this.model.scrollRect(t.x, t.y, t.width, t.height)) : (this._renderType &= -65, this.model && this.model.removeType(64))
				}), __getset(0, i, "filters", function()
				{
					return this._$P.filters
				}, function(t)
				{
					t && 0 === t.length && (t = null), this._$P.filters != t && (this._set$P("filters", t ? t.slice() : null), Render.isConchApp && (this.model && this.model.removeType(16), this._$P.filters && 1 == this._$P.filters.length && this._$P.filters[0].callNative(this)), Render.isWebGL && (t && t.length ? this._renderType |= 16 : this._renderType &= -17), t && t.length > 0 ? Render.isWebGL && 1 == t.length && t[0] instanceof laya.filters.ColorFilter || ("bitmap" != this.cacheAs && (Render.isConchNode || (this.cacheAs = "bitmap"), this._set$P("cacheForFilters", !0)), this._set$P("hasFilter", !0)) : (this._set$P("hasFilter", !1), this._$P.cacheForFilters && "bitmap" == this.cacheAs && (this.cacheAs = "none")), this.repaint())
				}), __getset(0, i, "mask", function()
				{
					return this._$P._mask
				}, function(t)
				{
					t && this.mask && this.mask._$P.maskParent || (t ? (this.cacheAs = "bitmap", this._set$P("_mask", t), t._set$P("maskParent", this)) : (this.cacheAs = "none", this.mask && this.mask._set$P("maskParent", null), this._set$P("_mask", t)), this.model && this.model.mask(t ? t.model : null), this._renderType |= 32, this.parentRepaint())
				}), __getset(0, i, "stage", function()
				{
					return Laya.stage
				}), __getset(0, i, "mouseEnabled", function()
				{
					return this._mouseEnableState > 1
				}, function(t)
				{
					this._mouseEnableState = t ? 2 : 1
				}), __getset(0, i, "globalScaleX", function()
				{
					for (var t = 1, e = this; e && e !== Laya.stage;) t *= e.scaleX, e = e.parent;
					return t
				}), __getset(0, i, "mouseX", function()
				{
					return this.getMousePoint().x
				}), __getset(0, i, "mouseY", function()
				{
					return this.getMousePoint().y
				}), __getset(0, i, "zOrder", function()
				{
					return this._zOrder
				}, function(t)
				{
					this._zOrder != t && (this._zOrder = t, this._parent && Laya.timer.callLater(this._parent, this.updateZOrder))
				}), e.fromImage = function(t)
				{
					return (new e).loadImage(t)
				}, e.CustomList = [], e
			}(Node),
			AudioSoundChannel = function(t)
			{
				function e(t)
				{
					this._audio = null, this._onEnd = null, this._resumePlay = null, e.__super.call(this), this._onEnd = Utils.bind(this.__onEnd, this), this._resumePlay = Utils.bind(this.__resumePlay, this), t.addEventListener("ended", this._onEnd), this._audio = t
				}
				__class(e, "laya.media.h5audio.AudioSoundChannel", t);
				var i = e.prototype;
				return i.__onEnd = function()
				{
					return 1 == this.loops ? (this.completeHandler && (Laya.timer.once(10, this, this.__runComplete, [this.completeHandler], !1), this.completeHandler = null), this.stop(), void this.event("complete")) : (this.loops > 0 && this.loops--, void this.play())
				}, i.__resumePlay = function()
				{
					try
					{
						this._audio.removeEventListener("canplay", this._resumePlay),
							this._audio.currentTime = this.startTime, Browser.container.appendChild(this._audio), this._audio.play()
					}
					catch (t)
					{
						this.event("error")
					}
				}, i.play = function()
				{
					try
					{
						this._audio.currentTime = this.startTime
					}
					catch (t)
					{
						return void this._audio.addEventListener("canplay", this._resumePlay)
					}
					Browser.container.appendChild(this._audio), this._audio.play()
				}, i.stop = function()
				{
					this.isStopped = !0, SoundManager.removeChannel(this), this.completeHandler = null, this._audio && (this._audio.pause(), this._audio.removeEventListener("ended", this._onEnd), this._audio.removeEventListener("canplay", this._resumePlay), Pool.recover("audio:" + this.url, this._audio), Browser.removeElement(this._audio), this._audio = null)
				}, __getset(0, i, "position", function()
				{
					return this._audio ? this._audio.currentTime : 0
				}), __getset(0, i, "volume", function()
				{
					return this._audio ? this._audio.volume : 1
				}, function(t)
				{
					this._audio && (this._audio.volume = t)
				}), e
			}(SoundChannel),
			WebAudioSoundChannel = function(t)
			{
				function e()
				{
					this.audioBuffer = null, this.gain = null, this.bufferSource = null, this._currentTime = 0, this._volume = 1, this._startTime = 0, this._onPlayEnd = null, this.context = WebAudioSound.ctx, e.__super.call(this), this._onPlayEnd = Utils.bind(this.__onPlayEnd, this), this.context.createGain ? this.gain = this.context.createGain() : this.gain = this.context.createGainNode()
				}
				__class(e, "laya.media.webaudio.WebAudioSoundChannel", t);
				var i = e.prototype;
				return i.play = function()
				{
					if (this._clearBufferSource(), this.audioBuffer)
					{
						var t = this.context,
							e = this.gain,
							i = t.createBufferSource();
						this.bufferSource = i, i.buffer = this.audioBuffer, i.connect(e), e && e.disconnect(), e.connect(t.destination), i.onended = this._onPlayEnd, this._startTime = Browser.now(), this.gain.gain.value = this._volume, 0 == this.loops && (i.loop = !0), i.start(0, this.startTime), this._currentTime = 0
					}
				}, i.__onPlayEnd = function()
				{
					return 1 == this.loops ? (this.completeHandler && (Laya.timer.once(10, this, this.__runComplete, [this.completeHandler], !1), this.completeHandler = null), this.stop(), void this.event("complete")) : (this.loops > 0 && this.loops--, void this.play())
				}, i._clearBufferSource = function()
				{
					if (this.bufferSource)
					{
						var t = this.bufferSource;
						t.stop ? t.stop(0) : t.noteOff(0), t.disconnect(0), t.onended = null, e._tryCleanFailed || this._tryClearBuffer(t), this.bufferSource = null
					}
				}, i._tryClearBuffer = function(t)
				{
					try
					{
						t.buffer = WebAudioSound._miniBuffer
					}
					catch (i)
					{
						e._tryCleanFailed = !0
					}
				}, i.stop = function()
				{
					this._clearBufferSource(), this.audioBuffer = null, this.gain && this.gain.disconnect(), this.isStopped = !0, SoundManager.removeChannel(this), this.completeHandler = null
				}, __getset(0, i, "position", function()
				{
					return this.bufferSource ? (Browser.now() - this._startTime) / 1e3 + this.startTime : 0
				}), __getset(0, i, "volume", function()
				{
					return this._volume
				}, function(t)
				{
					this.isStopped || (this._volume = t, this.gain.gain.value = t)
				}), e._tryCleanFailed = !1, e
			}(SoundChannel),
			Bitmap = function(t)
			{
				function e()
				{
					this.useNum = 0, e.__super.call(this), this._w = 0, this._h = 0
				}
				__class(e, "laya.resource.Bitmap", t);
				var i = e.prototype;
				return i.dispose = function()
				{
					this._resourceManager.removeResource(this), t.prototype.dispose.call(this)
				}, __getset(0, i, "source", function()
				{
					return this._source
				}), __getset(0, i, "width", function()
				{
					return this._w
				}), __getset(0, i, "height", function()
				{
					return this._h
				}), e
			}(Resource),
			AnimationPlayerBase = function(t)
			{
				function e()
				{
					this.loop = !1, this._index = 0, this._count = 0, this._isPlaying = !1, this._labels = null, this._controlNode = null, e.__super.call(this), this._interval = Config.animationInterval
				}
				__class(e, "laya.display.AnimationPlayerBase", t);
				var i = e.prototype;
				return i.play = function(t, e, i)
				{
					void 0 === t && (t = 0), void 0 === e && (e = !0), void 0 === i && (i = ""), this._isPlaying = !0, this.index = "string" == typeof t ? this._getFrameByLabel(t) : t, this.loop = e, this.interval > 0 && this.timerLoop(this.interval, this, this._frameLoop, null, !0)
				}, i._getFrameByLabel = function(t)
				{
					var e = 0;
					for (e = 0; e < this._count; e++)
						if (this._labels[e] == t) return e;
					return 0
				}, i._frameLoop = function()
				{
					if (this._index++, this._index >= this._count)
					{
						if (!this.loop) return this._index--, this.stop(), void this.event("complete");
						this._index = 0, this.event("complete")
					}
					this.index = this._index
				}, i._setControlNode = function(t)
				{
					this._controlNode && (this._controlNode.off("display", this, this._$3__onDisplay), this._controlNode.off("undisplay", this, this._$3__onDisplay)), this._controlNode = t, t && t != this && (t.on("display", this, this._$3__onDisplay), t.on("undisplay", this, this._$3__onDisplay))
				}, i._setDisplay = function(e)
				{
					t.prototype._setDisplay.call(this, e), this._$3__onDisplay()
				}, i._$3__onDisplay = function()
				{
					this._isPlaying && (this._controlNode.displayedInStage ? this.play(this._index, this.loop) : this.clearTimer(this, this._frameLoop))
				}, i.stop = function()
				{
					this._isPlaying = !1, this.clearTimer(this, this._frameLoop)
				}, i.addLabel = function(t, e)
				{
					this._labels || (this._labels = {}), this._labels[e] = t
				}, i.removeLabel = function(t)
				{
					if (t)
					{
						if (this._labels)
							for (var e in this._labels)
								if (this._labels[e] === t)
								{
									delete this._labels[e];
									break
								}
					}
					else this._labels = null
				}, i.gotoAndStop = function(t)
				{
					this.index = "string" == typeof t ? this._getFrameByLabel(t) : t, this.stop()
				}, i._displayToIndex = function(t) {}, i.clear = function()
				{
					this.stop(), this._labels = null
				}, __getset(0, i, "count", function()
				{
					return this._count
				}), __getset(0, i, "interval", function()
				{
					return this._interval
				}, function(t)
				{
					this._interval = t, this._isPlaying && t > 0 && this.timerLoop(t, this, this._frameLoop, null, !0)
				}), __getset(0, i, "isPlaying", function()
				{
					return this._isPlaying
				}), __getset(0, i, "index", function()
				{
					return this._index
				}, function(t)
				{
					this._index = t, this._displayToIndex(t), this._labels && this._labels[t] && this.event("label", this._labels[t])
				}), e
			}(Sprite),
			Text = function(t)
			{
				function e()
				{
					this._clipPoint = null, this._currBitmapFont = null, this._text = null, this._isChanged = !1, this._textWidth = 0, this._textHeight = 0, this._lines = [], this._lineWidths = [], this._startX = NaN, this._startY = NaN, this._lastVisibleLineIndex = -1, this._words = null, this._charSize = {}, this.underline = !1, this._underlineColor = null, e.__super.call(this), this.overflow = e.VISIBLE, this._style = new CSSStyle(this), this._style.wordWrap = !1
				}
				__class(e, "laya.display.Text", t);
				var i = e.prototype;
				return i.destroy = function(e)
				{
					void 0 === e && (e = !0), t.prototype.destroy.call(this, e), this._lines = null, this._words && (this._words.length = 0, this._words = null)
				}, i._getBoundPointsM = function(t)
				{
					void 0 === t && (t = !1);
					var e = Rectangle.TEMP;
					return e.setTo(0, 0, this.width, this.height), e._getBoundPoints()
				}, i.getGraphicBounds = function()
				{
					var t = Rectangle.TEMP;
					return t.setTo(0, 0, this.width, this.height), t
				}, i._getCSSStyle = function()
				{
					return this._style
				}, i.lang = function(t, i, n, s, r, a, o, h, l, u, c)
				{
					if (t = e.langPacks && e.langPacks[t] ? e.langPacks[t] : t, arguments.length < 2) this._text = t;
					else
					{
						for (var _ = 0, d = arguments.length; d > _; _++) t = t.replace("{" + _ + "}", arguments[_ + 1]);
						this._text = t
					}
				}, i.renderText = function(t, e)
				{
					var i = this.graphics;
					i.clear();
					var n = (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + this.font;
					Browser.context.font = n;
					var s = this.padding,
						r = s[3],
						a = "left",
						o = this._lines,
						h = this.leading + this._charSize.height,
						l = this._currBitmapFont;
					l && (h = this.leading + l.getMaxHeight());
					var u = s[0];
					if (!l && this._width > 0 && this._textWidth <= this._width && ("right" == this.align ? (a = "right", r = this._width - s[1]) : "center" == this.align && (a = "center", r = .5 * this._width + s[3] - s[1])), this._height > 0)
					{
						var c = this._textHeight > this._height ? "top" : this.valign;
						"middle" === c ? u = .5 * (this._height - e * h) + s[0] - s[2] : "bottom" === c && (u = this._height - e * h - s[2])
					}
					var _ = this._style;
					if (l && l.autoScaleSize) var d = l.fontSize / this.fontSize;
					if (this._clipPoint)
						if (i.save(), l && l.autoScaleSize)
						{
							var f = 0,
								p = 0;
							f = this._width ? this._width - s[3] - s[1] : this._textWidth, p = this._height ? this._height - s[0] - s[2] : this._textHeight, f *= d, p *= d, i.clipRect(s[3], s[0], f, p)
						}
						else i.clipRect(s[3], s[0], this._width ? this._width - s[3] - s[1] : this._textWidth, this._height ? this._height - s[0] - s[2] : this._textHeight);
					var g = _.password;
					"prompt" in this && this.prompt == this._text && (g = !1);
					for (var m = 0, v = 0, y = Math.min(this._lines.length, e + t) || 1, w = t; y > w; w++)
					{
						var x, T = o[w];
						if (g)
						{
							var C = T.length;
							T = "";
							for (var S = C; S > 0; S--) T += "●"
						}
						if (m = r - (this._clipPoint ? this._clipPoint.x : 0), v = u + h * w - (this._clipPoint ? this._clipPoint.y : 0), this.underline && this.drawUnderline(a, m, v, w), l)
						{
							var b = this.width;
							l.autoScaleSize && (b = this.width * d), l.drawText(T, this, m, v, this.align, b)
						}
						else Render.isWebGL ? (this._words || (this._words = []), x = this._words.length > w - t ? this._words[w - t] : new WordText, x.setText(T)) : x = T, _.stroke ? i.fillBorderText(x, m, v, n, this.color, _.strokeColor, _.stroke, a) : i.fillText(x, m, v, n, this.color, a)
					}
					if (l && l.autoScaleSize)
					{
						var P = 1 / d;
						this.scale(P, P)
					}
					this._clipPoint && i.restore(), this._startX = r, this._startY = u
				}, i.drawUnderline = function(t, e, i, n)
				{
					var s = this._lineWidths[n];
					switch (t)
					{
						case "center":
							e -= s / 2;
							break;
						case "right":
							e -= s;
							break;
						case "left":
					}
					i += this._charSize.height, this._graphics.drawLine(e, i, e + s, i, this.underlineColor || this.color, 1)
				}, i.typeset = function()
				{
					if (this._isChanged = !1, !this._text) return this._clipPoint = null, this._textWidth = this._textHeight = 0, void this.graphics.clear();
					Browser.context.font = this._getCSSStyle().font, this._lines.length = 0, this._lineWidths.length = 0, this.parseLines(this._text), this.evalTextSize(), this.checkEnabledViewportOrNot() ? this._clipPoint || (this._clipPoint = new Point(0, 0)) : this._clipPoint = null;
					var t = this._lines.length;
					if (this.overflow != e.VISIBLE)
					{
						var i = this.overflow == e.HIDDEN ? Math.floor : Math.ceil;
						t = Math.min(t, i((this.height - this.padding[0] - this.padding[2]) / (this.leading + this._charSize.height)))
					}
					var n = this.scrollY / (this._charSize.height + this.leading) | 0;
					this.renderText(n, t), this.repaint()
				}, i.evalTextSize = function()
				{
					var t = NaN,
						e = NaN;
					t = Math.max.apply(this, this._lineWidths), e = this._currBitmapFont ? this._lines.length * (this._currBitmapFont.getMaxHeight() + this.leading) + this.padding[0] + this.padding[2] : this._lines.length * (this._charSize.height + this.leading) + this.padding[0] + this.padding[2], t == this._textWidth && e == this._textHeight || (this._textWidth = t, this._textHeight = e, this._width && this._height || this.model && this.model.size(this._width || this._textWidth, this._height || this._textHeight))
				}, i.checkEnabledViewportOrNot = function()
				{
					return this.overflow == e.SCROLL && (this._width > 0 && this._textWidth > this._width || this._height > 0 && this._textHeight > this._height)
				}, i.changeText = function(t)
				{
					this._text !== t && (this.lang(t + ""), this._graphics && this._graphics.replaceText(this._text) || this.typeset())
				}, i.parseLines = function(t)
				{
					var i = this.wordWrap || this.overflow == e.HIDDEN;
					if (i) var n = this.getWordWrapWidth();
					var s = Browser.context.measureText("阳");
					this._charSize.width = s.width, this._charSize.height = s.height || this.fontSize;
					for (var r = t.replace(/\r\n/g, "\n").split("\n"), a = 0, o = r.length; o > a; a++)
					{
						o - 1 > a && (r[a] += "\n");
						var h = r[a];
						i ? this.parseLine(h, n) : (this._lineWidths.push(this.getTextWidth(h)), this._lines.push(h))
					}
				}, i.parseLine = function(t, i)
				{
					var n, s = (Browser.context, this._lines),
						r = 0,
						a = NaN,
						o = NaN,
						h = 0;
					if (a = this.getTextWidth(t), i >= a) return s.push(t), void this._lineWidths.push(a);
					a = this._currBitmapFont ? this._currBitmapFont.getMaxWidth() : this._charSize.width, r = Math.floor(i / a), 0 == r && (r = 1), a = this.getTextWidth(t.substring(0, r)), o = a;
					for (var l = r, u = t.length; u > l; l++)
						if (a = this.getTextWidth(t.charAt(l)), o += a, o > i)
							if (this.wordWrap)
							{
								var c = t.substring(h, l);
								if (c.charCodeAt(c.length - 1) < 255 && (n = /[^\x20-]+$/.exec(c), n && (l = n.index + h, 0 == n.index ? l += c.length : c = t.substring(h, l))), s.push(c), this._lineWidths.push(o - a), h = l, !(u > l + r))
								{
									s.push(t.substring(h, u)), this._lineWidths.push(this.getTextWidth(s[s.length - 1])), h = -1;
									break
								}
								l += r, a = this.getTextWidth(t.substring(h, l)), o = a, l--
							}
							else if (this.overflow == e.HIDDEN) return s.push(t.substring(0, l)), void this._lineWidths.push(this.getTextWidth(s[s.length - 1]));
					this.wordWrap && -1 != h && (s.push(t.substring(h, u)), this._lineWidths.push(this.getTextWidth(s[s.length - 1])))
				}, i.getTextWidth = function(t)
				{
					return this._currBitmapFont ? this._currBitmapFont.getTextWidth(t) : Browser.context.measureText(t).width
				}, i.getWordWrapWidth = function()
				{
					var t = this.padding,
						e = NaN;
					return e = this._currBitmapFont && this._currBitmapFont.autoScaleSize ? this._width * (this._currBitmapFont.fontSize / this.fontSize) : this._width, 0 >= e && (e = this.wordWrap ? 100 : Browser.width), 0 >= e && (e = 100), e - t[3] - t[1]
				}, i.getCharPoint = function(t, e)
				{
					this._isChanged && Laya.timer.runCallLater(this, this.typeset);
					for (var i = 0, n = this._lines, s = 0, r = 0, a = n.length; a > r; r++)
					{
						if (i += n[r].length, i > t)
						{
							var o = r;
							break
						}
						s = i
					}
					var h = (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + this.font;
					Browser.context.font = h;
					var l = this.getTextWidth(this._text.substring(s, t)),
						u = e || new Point;
					return u.setTo(this._startX + l - (this._clipPoint ? this._clipPoint.x : 0), this._startY + o * (this._charSize.height + this.leading) - (this._clipPoint ? this._clipPoint.y : 0))
				}, __getset(0, i, "textHeight", function()
				{
					return this._isChanged && Laya.timer.runCallLater(this, this.typeset), this._textHeight
				}), __getset(0, i, "width", function()
				{
					return this._width ? this._width : this.textWidth
				}, function(e)
				{
					e != this._width && (t.prototype._$set_width.call(this, e), this.isChanged = !0)
				}), __getset(0, i, "font", function()
				{
					return this._getCSSStyle().fontFamily
				}, function(t)
				{
					this._currBitmapFont && (this._currBitmapFont = null, this.scale(1, 1)), e._bitmapFonts && e._bitmapFonts[t] && (this._currBitmapFont = e._bitmapFonts[t]), this._getCSSStyle().fontFamily = t, this.isChanged = !0
				}), __getset(0, i, "height", function()
				{
					return this._height ? this._height : this.textHeight
				}, function(e)
				{
					e != this._height && (t.prototype._$set_height.call(this, e), this.isChanged = !0)
				}), __getset(0, i, "leading", function()
				{
					return this._getCSSStyle().leading
				}, function(t)
				{
					this._getCSSStyle().leading = t, this.isChanged = !0
				}), __getset(0, i, "text", function()
				{
					return this._text || ""
				}, function(t)
				{
					this._text !== t && (this.lang(t + ""), this.isChanged = !0, this.event("change"))
				}), __getset(0, i, "lines", function()
				{
					return this._lines
				}), __getset(0, i, "textWidth", function()
				{
					return this._isChanged && Laya.timer.runCallLater(this, this.typeset), this._textWidth
				}), __getset(0, i, "fontSize", function()
				{
					return this._getCSSStyle().fontSize
				}, function(t)
				{
					this._getCSSStyle().fontSize = t, this.isChanged = !0
				}), __getset(0, i, "bold", function()
				{
					return this._getCSSStyle().bold
				}, function(t)
				{
					this._getCSSStyle().bold = t, this.isChanged = !0
				}), __getset(0, i, "color", function()
				{
					return this._getCSSStyle().color
				}, function(t)
				{
					this._getCSSStyle().color != t && (this._getCSSStyle().color = t, !this._isChanged && this._graphics ? this._graphics.replaceTextColor(this.color) : this.isChanged = !0)
				}), __getset(0, i, "strokeColor", function()
				{
					return this._getCSSStyle().strokeColor
				}, function(t)
				{
					this._getCSSStyle().strokeColor = t, this.isChanged = !0
				}), __getset(0, i, "italic", function()
				{
					return this._getCSSStyle().italic
				}, function(t)
				{
					this._getCSSStyle().italic = t, this.isChanged = !0
				}), __getset(0, i, "align", function()
				{
					return this._getCSSStyle().align
				}, function(t)
				{
					this._getCSSStyle().align = t, this.isChanged = !0
				}), __getset(0, i, "valign", function()
				{
					return this._getCSSStyle().valign
				}, function(t)
				{
					this._getCSSStyle().valign = t, this.isChanged = !0
				}), __getset(0, i, "wordWrap", function()
				{
					return this._getCSSStyle().wordWrap
				}, function(t)
				{
					this._getCSSStyle().wordWrap = t, this.isChanged = !0
				}), __getset(0, i, "padding", function()
				{
					return this._getCSSStyle().padding
				}, function(t)
				{
					this._getCSSStyle().padding = t, this.isChanged = !0
				}), __getset(0, i, "bgColor", function()
				{
					return this._getCSSStyle().backgroundColor
				}, function(t)
				{
					this._getCSSStyle().backgroundColor = t, this.isChanged = !0
				}), __getset(0, i, "borderColor", function()
				{
					return this._getCSSStyle().borderColor
				}, function(t)
				{
					this._getCSSStyle().borderColor = t, this.isChanged = !0
				}), __getset(0, i, "stroke", function()
				{
					return this._getCSSStyle().stroke
				}, function(t)
				{
					this._getCSSStyle().stroke = t, this.isChanged = !0
				}), __getset(0, i, "isChanged", null, function(t)
				{
					this._isChanged !== t && (this._isChanged = t, t && Laya.timer.callLater(this, this.typeset))
				}), __getset(0, i, "scrollX", function()
				{
					return this._clipPoint ? this._clipPoint.x : 0
				}, function(t)
				{
					if (!(this.overflow != e.SCROLL || this.textWidth < this._width) && this._clipPoint)
					{
						t = t < this.padding[3] ? this.padding[3] : t;
						var i = this._textWidth - this._width;
						t = t > i ? i : t;
						var n = this._height / (this._charSize.height + this.leading) | 1;
						this._clipPoint.x = t, this.renderText(this._lastVisibleLineIndex, n)
					}
				}), __getset(0, i, "scrollY", function()
				{
					return this._clipPoint ? this._clipPoint.y : 0
				}, function(t)
				{
					if (!(this.overflow != e.SCROLL || this.textHeight < this._height) && this._clipPoint)
					{
						t = t < this.padding[0] ? this.padding[0] : t;
						var i = this._textHeight - this._height;
						t = t > i ? i : t;
						var n = t / (this._charSize.height + this.leading) | 0;
						this._lastVisibleLineIndex = n;
						var s = (this._height / (this._charSize.height + this.leading) | 0) + 1;
						this._clipPoint.y = t, this.renderText(n, s)
					}
				}), __getset(0, i, "maxScrollX", function()
				{
					return this.textWidth < this._width ? 0 : this._textWidth - this._width
				}), __getset(0, i, "maxScrollY", function()
				{
					return this.textHeight < this._height ? 0 : this._textHeight - this._height
				}), __getset(0, i, "underlineColor", function()
				{
					return this._underlineColor
				}, function(t)
				{
					this._underlineColor = t, this._isChanged = !0, this.typeset()
				}), e.registerBitmapFont = function(t, i)
				{
					e._bitmapFonts || (e._bitmapFonts = {}), e._bitmapFonts[t] = i
				}, e.unregisterBitmapFont = function(t, i)
				{
					if (void 0 === i && (i = !0), e._bitmapFonts && e._bitmapFonts[t])
					{
						var n = e._bitmapFonts[t];
						i && n.destroy(), delete e._bitmapFonts[t]
					}
				}, e.langPacks = null, e.VISIBLE = "visible", e.SCROLL = "scroll", e.HIDDEN = "hidden", e._bitmapFonts = null, e
			}(Sprite),
			Stage = function(t)
			{
				function e()
				{
					function t()
					{
						"hidden" == Browser.document[s] ? (i.event("blur"), i._isInputting() && (Input.inputElement.target.focus = !1)) : i.event("focus")
					}
					this.focus = null, this._offset = null, this.frameRate = "fast", this.desginWidth = 0, this.desginHeight = 0, this.canvasRotation = !1, this.canvasDegree = 0, this.renderingEnabled = !0, this._screenMode = "none", this._scaleMode = "noscale", this._alignV = "top", this._alignH = "left", this._bgColor = "black", this._mouseMoveTime = 0, this._renderCount = 0, this._safariOffsetY = 0, e.__super.call(this), this.offset = new Point, this._canvasTransform = new Matrix, this.mouseEnabled = !0, this.hitTestPrior = !0, this._displayedInStage = !0;
					var i = this,
						n = Browser.window;
					n.addEventListener("focus", function()
					{
						i.event("focus")
					}), n.addEventListener("blur", function()
					{
						i.event("blur"), i._isInputting() && (Input.inputElement.target.focus = !1)
					});
					var s = "visibilityState",
						r = "visibilitychange",
						a = n.document;
					"undefined" != typeof a.hidden ? (r = "visibilitychange", s = "visibilityState") : "undefined" != typeof a.mozHidden ? (r = "mozvisibilitychange", s = "mozVisibilityState") : "undefined" != typeof a.msHidden ? (r = "msvisibilitychange", s = "msVisibilityState") : "undefined" != typeof a.webkitHidden && (r = "webkitvisibilitychange", s = "webkitVisibilityState"), n.document.addEventListener(r, t), n.addEventListener("resize", function()
					{
						i._isInputting() || (Browser.onSafari && (i._safariOffsetY = (Browser.document.body.clientHeight || Browser.document.documentElement.clientHeight) - Browser.window.innerHeight), i._resetCanvas())
					}), n.addEventListener("orientationchange", function(t)
					{
						i._isInputting() && (Input.inputElement.target.focus = !1), i._resetCanvas()
					}), this.on("mousemove", this, this._onmouseMove), Browser.onMobile && this.on("mousedown", this, this._onmouseMove)
				}
				__class(e, "laya.display.Stage", t);
				var i = e.prototype;
				return i._isInputting = function()
				{
					return Browser.onMobile && Input.isInputting
				}, i._changeCanvasSize = function()
				{
					this.setScreenSize(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio)
				}, i._resetCanvas = function()
				{
					var t = Render._mainCanvas,
						e = t.source.style;
					t.size(1, 1), e.transform = e.webkitTransform = e.msTransform = e.mozTransform = e.oTransform = "", this.renderingEnabled = !1, Laya.timer.once(100, this, this._changeCanvasSize)
				}, i.setScreenSize = function(t, e)
				{
					var i = !1;
					if ("none" !== this._screenMode)
					{
						var n = 1 > t / e ? "vertical" : "horizontal";
						if (i = n !== this._screenMode)
						{
							var s = e;
							e = t, t = s
						}
					}
					this.canvasRotation = i;
					var r = Render._mainCanvas,
						a = r.source.style,
						o = this._canvasTransform.identity(),
						h = this._scaleMode,
						l = t / this.desginWidth,
						u = e / this.desginHeight,
						c = this.desginWidth,
						_ = this.desginHeight,
						d = t,
						f = e,
						p = Browser.pixelRatio;
					switch (this._width = this.desginWidth, this._height = this.desginHeight, h)
					{
						case "noscale":
							l = u = 1, d = this.desginWidth, f = this.desginHeight;
							break;
						case "showall":
							l = u = Math.min(l, u), c = d = Math.round(this.desginWidth * l), _ = f = Math.round(this.desginHeight * u);
							break;
						case "noborder":
							l = u = Math.max(l, u), d = Math.round(this.desginWidth * l), f = Math.round(this.desginHeight * u);
							break;
						case "full":
							l = u = 1, this._width = c = t, this._height = _ = e;
							break;
						case "fixedwidth":
							u = l, this._height = e / l, _ = Math.round(e / l);
							break;
						case "fixedheight":
							l = u, this._width = t / u, c = Math.round(t / u)
					}
					l *= this.scaleX, u *= this.scaleY, 1 === l && 1 === u ? this.transform && this.transform.identity() : (this.transform || (this.transform = new Matrix), this.transform.a = l / (d / c), this.transform.d = u / (f / _), this.model && this.model.scale(this.transform.a, this.transform.d)), r.size(c, _), RunDriver.changeWebGLSize(c, _), o.scale(d / c / p, f / _ / p), "left" === this._alignH ? this.offset.x = 0 : "right" === this._alignH ? this.offset.x = t - d : this.offset.x = .5 * (t - d) / p, "top" === this._alignV ? this.offset.y = 0 : "bottom" === this._alignV ? this.offset.y = e - f : this.offset.y = .5 * (e - f) / p, this._offset || (this._offset = new Point(parseInt(a.left) || 0, parseInt(a.top) || 0), a.left = a.top = "0px"), this.offset.x += this._offset.x, this.offset.y += this._offset.y, this.offset.x = Math.round(this.offset.x), this.offset.y = Math.round(this.offset.y), a.top = this._safariOffsetY + "px", o.translate(this.offset.x, this.offset.y), this.canvasDegree = 0, i && ("horizontal" === this._screenMode ? (o.rotate(Math.PI / 2), o.translate(e / p, 0), this.canvasDegree = 90) : (o.rotate(-Math.PI / 2), o.translate(0, t / p), this.canvasDegree = -90)), o.a < 1e-14 && (o.a = o.d = 0), o.tx < 1e-14 && (o.tx = 0), o.ty < 1e-14 && (o.ty = 0), a.transformOrigin = a.webkitTransformOrigin = a.msTransformOrigin = a.mozTransformOrigin = a.oTransformOrigin = "0px 0px 0px", a.transform = a.webkitTransform = a.msTransform = a.mozTransform = a.oTransform = "matrix(" + o.toString() + ")", this.renderingEnabled = !0, this._repaint = 1, this.event("resize")
				}, i.repaint = function()
				{
					this._repaint = 1
				}, i.parentRepaint = function() {}, i._loop = function()
				{
					return this.render(Render.context, 0, 0), !0
				}, i._onmouseMove = function(t)
				{
					this._mouseMoveTime = Browser.now()
				}, i.render = function(e, i, n)
				{
					Render.isFlash && this.repaint(), this._renderCount++;
					var s = "mouse" === this.frameRate ? Browser.now() - this._mouseMoveTime < 2e3 ? "fast" : "slow" : this.frameRate,
						r = "slow" !== s,
						a = this._renderCount % 2 === 0,
						o = e;
					if (Stat.renderSlow = !r, r || a)
					{
						if (Stat.loopCount++, MouseManager.instance.runEvent(), Laya.timer._update(), Render.isConchNode)
						{
							for (var h = Sprite.CustomList, l = 0, u = h.length; u > l; l++) h[l].customRender(h[l].customContext, 0, 0);
							return
						}
						this.renderingEnabled && (Render.isWebGL ? o.clear() : RunDriver.clear(this._bgColor), t.prototype.render.call(this, e, i, n))
					}
					Render.isConchNode || (!this.renderingEnabled || !r && a || (Render.isWebGL && RunDriver.clear(this._bgColor), RunDriver.beginFlush(), e.flush(), RunDriver.endFinish()), VectorGraphManager.instance && VectorGraphManager.getInstance().endDispose())
				}, i._requestFullscreen = function()
				{
					var t = Browser.document.documentElement;
					t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen()
				}, i._fullScreenChanged = function()
				{
					Laya.stage.event("fullscreenchange")
				}, i.exitFullscreen = function()
				{
					var t = Browser.document;
					t.exitFullscreen ? t.exitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen && t.webkitExitFullscreen()
				}, __getset(0, i, "alignV", function()
				{
					return this._alignV
				}, function(t)
				{
					this._alignV = t, Laya.timer.callLater(this, this._changeCanvasSize)
				}), __getset(0, i, "width", t.prototype._$get_width, function(e)
				{
					this.desginWidth = e, t.prototype._$set_width.call(this, e), Laya.timer.callLater(this, this._changeCanvasSize)
				}), __getset(0, i, "height", t.prototype._$get_height, function(e)
				{
					this.desginHeight = e, t.prototype._$set_height.call(this, e), Laya.timer.callLater(this, this._changeCanvasSize)
				}), __getset(0, i, "mouseX", function()
				{
					return Math.round(MouseManager.instance.mouseX / this.clientScaleX)
				}), __getset(0, i, "mouseY", function()
				{
					return Math.round(MouseManager.instance.mouseY / this.clientScaleY)
				}), __getset(0, i, "scaleMode", function()
				{
					return this._scaleMode
				}, function(t)
				{
					this._scaleMode = t, Laya.timer.callLater(this, this._changeCanvasSize)
				}), __getset(0, i, "alignH", function()
				{
					return this._alignH
				}, function(t)
				{
					this._alignH = t, Laya.timer.callLater(this, this._changeCanvasSize)
				}), __getset(0, i, "bgColor", function()
				{
					return this._bgColor
				}, function(t)
				{
					this._bgColor = t, this.model && this.model.bgColor(t), t ? Render.canvas.style.background = t : Render.canvas.style.background = "none"
				}), __getset(0, i, "clientScaleX", function()
				{
					return this._transform ? this._transform.getScaleX() : 1
				}), __getset(0, i, "clientScaleY", function()
				{
					return this._transform ? this._transform.getScaleY() : 1
				}), __getset(0, i, "screenMode", function()
				{
					return this._screenMode
				}, function(t)
				{
					this._screenMode = t
				}), __getset(0, i, "fullScreenEnabled", null, function(t)
				{
					var e = Browser.document,
						i = Render.canvas;
					t ? (i.addEventListener("mousedown", this._requestFullscreen), i.addEventListener("touchstart", this._requestFullscreen), e.addEventListener("fullscreenchange", this._fullScreenChanged), e.addEventListener("mozfullscreenchange", this._fullScreenChanged), e.addEventListener("webkitfullscreenchange", this._fullScreenChanged), e.addEventListener("msfullscreenchange", this._fullScreenChanged)) : (i.removeEventListener("mousedown", this._requestFullscreen), i.removeEventListener("touchstart", this._requestFullscreen), e.removeEventListener("fullscreenchange", this._fullScreenChanged), e.removeEventListener("mozfullscreenchange", this._fullScreenChanged), e.removeEventListener("webkitfullscreenchange", this._fullScreenChanged), e.removeEventListener("msfullscreenchange", this._fullScreenChanged))
				}), e.SCALE_NOSCALE = "noscale", e.SCALE_EXACTFIT = "exactfit", e.SCALE_SHOWALL = "showall", e.SCALE_NOBORDER = "noborder", e.SCALE_FULL = "full", e.SCALE_FIXED_WIDTH = "fixedwidth", e.SCALE_FIXED_HEIGHT = "fixedheight", e.ALIGN_LEFT = "left", e.ALIGN_RIGHT = "right", e.ALIGN_CENTER = "center", e.ALIGN_TOP = "top", e.ALIGN_MIDDLE = "middle", e.ALIGN_BOTTOM = "bottom", e.SCREEN_NONE = "none", e.SCREEN_HORIZONTAL = "horizontal", e.SCREEN_VERTICAL = "vertical", e.FRAME_FAST = "fast", e.FRAME_SLOW = "slow", e.FRAME_MOUSE = "mouse", e
			}(Sprite),
			SoundNode = function(t)
			{
				function e()
				{
					this.url = null, this._channel = null, this._tar = null, this._playEvents = null, this._stopEvents = null, e.__super.call(this), this.visible = !1, this.on("added", this, this._onParentChange), this.on("removed", this, this._onParentChange)
				}
				__class(e, "laya.media.SoundNode", t);
				var i = e.prototype;
				return i._onParentChange = function()
				{
					this.target = this.parent
				}, i.play = function(t, e)
				{
					void 0 === t && (t = 1), isNaN(t) && (t = 1), this.url && (this.stop(), this._channel = SoundManager.playSound(this.url, t, e))
				}, i.stop = function()
				{
					this._channel && !this._channel.isStopped && this._channel.stop(), this._channel = null
				}, i._setPlayAction = function(t, e, i, n)
				{
					void 0 === n && (n = !0), this[i] && t && (n ? t.on(e, this, this[i]) : t.off(e, this, this[i]))
				}, i._setPlayActions = function(t, e, i, n)
				{
					if (void 0 === n && (n = !0), t && e)
					{
						var s = e.split(","),
							r = 0,
							a = 0;
						for (a = s.length, r = 0; a > r; r++) this._setPlayAction(t, s[r], i, n)
					}
				}, __getset(0, i, "playEvent", null, function(t)
				{
					this._playEvents = t, t && this._tar && this._setPlayActions(this._tar, t, "play")
				}), __getset(0, i, "target", null, function(t)
				{
					this._tar && (this._setPlayActions(this._tar, this._playEvents, "play", !1), this._setPlayActions(this._tar, this._stopEvents, "stop", !1)), this._tar = t, this._tar && (this._setPlayActions(this._tar, this._playEvents, "play", !0), this._setPlayActions(this._tar, this._stopEvents, "stop", !0))
				}), __getset(0, i, "stopEvent", null, function(t)
				{
					this._stopEvents = t, t && this._tar && this._setPlayActions(this._tar, t, "stop")
				}), e
			}(Sprite),
			Scene2D = function(t)
			{
				function e()
				{
					e.__super.call(this), this.createChildren()
				}
				__class(e, "laya.scene.Scene2D", t);
				var i = e.prototype;
				return i.createChildren = function() {}, i.createView = function(t)
				{
					ClassUtils.createByJson(t, this, this)
				}, e
			}(Sprite),
			FileBitmap = function(t)
			{
				function e()
				{
					this._src = null, this._onload = null, this._onerror = null, e.__super.call(this)
				}
				__class(e, "laya.resource.FileBitmap", t);
				var i = e.prototype;
				return __getset(0, i, "onload", null, function(t) {}), __getset(0, i, "src", function()
				{
					return this._src
				}, function(t)
				{
					this._src = t
				}), __getset(0, i, "onerror", null, function(t) {}), e
			}(Bitmap),
			HTMLCanvas = function(t)
			{
				function e(t, i)
				{
					this._is2D = !1, e.__super.call(this);
					var n = this;
					if (this._source = this, "2D" === t || "AUTO" === t && !Render.isWebGL)
					{
						this._is2D = !0, this._source = i || Browser.createElement("canvas");
						var s = this;
						s.getContext = function(t, e)
						{
							if (n._ctx) return n._ctx;
							var i = n._ctx = n._source.getContext(t, e);
							return i && (i._canvas = s, Render.isFlash || (i.size = function(t, e) {})), i
						}
					}
					else this._source = {}
				}
				__class(e, "laya.resource.HTMLCanvas", t);
				var i = e.prototype;
				return i.clear = function()
				{
					this._ctx && this._ctx.clear()
				}, i.destroy = function()
				{
					this._ctx && this._ctx.destroy(), this._ctx = null
				}, i.release = function() {}, i._setContext = function(t)
				{
					this._ctx = t
				}, i.getContext = function(t, i)
				{
					return this._ctx ? this._ctx : this._ctx = e._createContext(this)
				}, i.getMemSize = function()
				{
					return 0
				}, i.size = function(t, e)
				{
					this._w == t && this._h == e || (this._w = t, this._h = e, this._ctx && this._ctx.size(t, e), this._source && (this._source.height = e, this._source.width = t))
				}, __getset(0, i, "context", function()
				{
					return this._ctx
				}), __getset(0, i, "asBitmap", null, function(t) {}), e.create = function(t, i)
				{
					return new e(t, i)
				}, e.TYPE2D = "2D", e.TYPE3D = "3D", e.TYPEAUTO = "AUTO", e._createContext = null, e
			}(Bitmap),
			HTMLSubImage = function(t)
			{
				function e(t, i, n, s, r, a, o, h)
				{
					throw e.__super.call(this), new Error("不允许new！")
				}
				return __class(e, "laya.resource.HTMLSubImage", t), e.create = function(t, i, n, s, r, a, o, h)
				{
					return void 0 === h && (h = !1), new e(t, i, n, s, r, a, o, h)
				}, e
			}(Bitmap),
			Animation = function(t)
			{
				function e()
				{
					this._frames = null, this._url = null, e.__super.call(this), this._setControlNode(this)
				}
				__class(e, "laya.display.Animation", t);
				var i = e.prototype;
				return i.destroy = function(t)
				{
					void 0 === t && (t = !0), this.stop(), laya.display.Sprite.prototype.destroy.call(this, t), this._frames = null, this._labels = null
				}, i.play = function(t, e, i)
				{
					void 0 === t && (t = 0), void 0 === e && (e = !0), void 0 === i && (i = ""), i && this._setFramesFromCache(this._url?this._url+"#"+i:i), this._isPlaying = !0, this.index = "string" == typeof t ? this._getFrameByLabel(t) : t, this.loop = e, this._frames && this._frames.length > 1 && this.interval > 0 && this.timerLoop(this.interval, this, this._frameLoop, null, !0)
				}, i._setFramesFromCache = function(t)
				{
					return t && e.framesMap[t] ? (this._frames = e.framesMap[t], this._count = this._frames.length, !0) : !1
				}, i._frameLoop = function()
				{
					this._style.visible && this._style.alpha > .01 && t.prototype._frameLoop.call(this)
				}, i._displayToIndex = function(t)
				{
					this._frames && (this.graphics = this._frames[t])
				}, i.clear = function()
				{
					this.stop(), this.graphics = null, this._frames = null, this._labels = null
				}, i.loadImages = function(t, i)
				{
					return void 0 === i && (i = ""), this._url = "", this._setFramesFromCache(i) || (this.frames = e.createFrames(t, e.framesMap["#" + i] ? "" : i)), this
				}, i.loadAtlas = function(t, i, n)
				{
					function s(s)
					{
						t === s && (r.frames = e.createFrames(t, e.framesMap[t + "#" + n] ? "" : n), i && i.run())
					}
					void 0 === n && (n = "");
					var r = this;
					return this._url = t, r._setFramesFromCache(n) || (Loader.getAtlas(t) ? s(t) : Laya.loader.load(t, Handler.create(null, s, [t]), null, "atlas")), this
				}, i.loadAnimation = function(t, i)
				{
					function n(n)
					{
						if (t === n)
						{
							var r = s._parseGraphicAnimation(Loader.getRes(t));
							if (!r) return;
							var a = r.animationDic;
							for (var o in a) e.framesMap[t + "#" + o] = a[o];
							e.framesMap[t] = s.frames = r.animationList[0], i && i.run()
						}
					}
					var s = this;
					return this._url = t, s._setFramesFromCache(t) || (Loader.getRes(t) ? n(t) : Laya.loader.load(t, Handler.create(null, n, [t]), null, "json"), Loader.clearRes(t)), this
				}, i._parseGraphicAnimation = function(t)
				{
					return GraphicAnimation.parseAnimationData(t)
				}, __getset(0, i, "frames", function()
				{
					return this._frames
				}, function(t)
				{
					this._frames = t, t && (this._count = t.length, this._isPlaying ? this.play(this._index, this.loop) : this.index = this._index)
				}), __getset(0, i, "source", null, function(t)
				{
					t.indexOf(".ani") > -1 ? this.loadAnimation(t) : t.indexOf(".json") > -1 || t.indexOf("als") > -1 ? this.loadAtlas(t) : this.loadImages(t.split(","))
				}), __getset(0, i, "autoPlay", null, function(t)
				{
					t ? this.play() : this.stop()
				}), e.createFrames = function(t, i)
				{
					var n;
					if ("string" == typeof t)
					{
						var s = Loader.getAtlas(t);
						if (s && s.length)
						{
							n = [];
							for (var r = 0, a = s.length; a > r; r++)
							{
								var o = new Graphics;
								o.drawTexture(Loader.getRes(s[r]), 0, 0), n.push(o)
							}
						}
					}
					else if (t instanceof Array)
						for (n = [], r = 0, a = t.length; a > r; r++) o = new Graphics, o.loadImage(t[r], 0, 0), n.push(o);
					return i && (e.framesMap[i] = n), n
				}, e.framesMap = {}, e
			}(AnimationPlayerBase),
			FrameAnimation = function(t)
			{
				function e()
				{
					this._targetDic = null, this._animationData = null, e.__super.call(this), null == e._sortIndexFun && (e._sortIndexFun = MathUtil.sortByKey("index", !1, !0));
				}
				__class(e, "laya.display.FrameAnimation", t);
				var i = e.prototype;
				return i._setUp = function(t, e)
				{
					this._labels = null, this._targetDic = t, this._animationData = e, this.interval = 1e3 / e.frameRate, this._calculateDatas()
				}, i.clear = function()
				{
					t.prototype.clear.call(this), this._targetDic = null, this._animationData = null
				}, i._displayToIndex = function(t)
				{
					if (this._animationData)
					{
						0 > t && (t = 0), t > this._count && (t = this._count);
						var e = this._animationData.nodes,
							i = 0,
							n = e.length;
						for (i = 0; n > i; i++) this._displayNodeToFrame(e[i], t)
					}
				}, i._displayNodeToFrame = function(t, e, i)
				{
					i || (i = this._targetDic);
					var n = i[t.target];
					if (n)
					{
						var s, r, a, o = t.frames,
							h = t.keys,
							l = 0,
							u = h.length;
						for (l = 0; u > l; l++) s = h[l], r = o[s], a = r.length > e ? r[e] : r[r.length - 1], n[s] = a
					}
				}, i._calculateDatas = function()
				{
					if (this._animationData)
					{
						var t, e = this._animationData.nodes,
							i = 0,
							n = e.length;
						for (this._count = 0, i = 0; n > i; i++) t = e[i], this._calculateNodeKeyFrames(t);
						this._count += 1
					}
				}, i._calculateNodeKeyFrames = function(t)
				{
					var i, n, s = t.keyframes,
						r = t.target;
					t.frames || (t.frames = {}), t.keys ? t.keys.length = 0 : t.keys = [];
					for (i in s) n = s[i], t.frames[i] || (t.frames[i] = []), n.sort(e._sortIndexFun), t.keys.push(i), this._calculateNodePropFrames(n, t.frames[i], i, r)
				}, i._calculateNodePropFrames = function(t, e, i, n)
				{
					var s = 0,
						r = t.length - 1;
					for (e.length = t[r].index + 1, s = 0; r > s; s++) this._dealKeyFrame(t[s]), this._calculateFrameValues(t[s], t[s + 1], e);
					0 == r && (e[0] = t[0].value), this._dealKeyFrame(t[s])
				}, i._dealKeyFrame = function(t)
				{
					t.label && "" != t.label && this.addLabel(t.label, t.index)
				}, i._calculateFrameValues = function(t, e, i)
				{
					var n, s = 0,
						r = t.index,
						a = e.index,
						o = t.value,
						h = e.value - t.value,
						l = a - r;
					if (a > this._count && (this._count = a), t.tween)
						for (n = Ease[t.tweenMethod], null == n && (n = Ease.linearNone), s = r; a > s; s++) i[s] = n(s - r, o, h, l);
					else
						for (s = r; a > s; s++) i[s] = o;
					i[e.index] = e.value
				}, e._sortIndexFun = null, e
			}(AnimationPlayerBase),
			Input = function(t)
			{
				function e()
				{
					this._focus = !1, this._multiline = !1, this._editable = !0, this._restrictPattern = null, this._type = "text", this._prompt = "", this._promptColor = "#A9A9A9", this._originColor = "#000000", this._content = "", e.__super.call(this), this._maxChars = 1e5, this._width = 100, this._height = 20, this.multiline = !1, this.overflow = Text.SCROLL, this.on("mousedown", this, this._onMouseDown), this.on("undisplay", this, this._onUnDisplay)
				}
				__class(e, "laya.display.Input", t);
				var i = e.prototype;
				return i.setSelection = function(t, e)
				{
					laya.display.Input.inputElement.selectionStart = t, laya.display.Input.inputElement.selectionEnd = e
				}, i._onUnDisplay = function(t)
				{
					this.focus = !1
				}, i._onMouseDown = function(t)
				{
					this.focus = !0, Laya.stage.on("mousedown", this, this._checkBlur)
				}, i._checkBlur = function(t)
				{
					t.nativeEvent.target != laya.display.Input.input && t.nativeEvent.target != laya.display.Input.area && t.target != this && (this.focus = !1)
				}, i.render = function(t, e, i)
				{
					laya.display.Sprite.prototype.render.call(this, t, e, i)
				}, i._syncInputTransform = function()
				{
					var t, i = (this.nativeInput.style, Laya.stage);
					t = Utils.getGlobalPosAndScale(this);
					var n = i._canvasTransform.clone(),
						s = n.clone();
					s.rotate(-Math.PI / 180 * Laya.stage.canvasDegree), s.scale(Laya.stage.clientScaleX, Laya.stage.clientScaleY);
					var r = Laya.stage.canvasDegree % 180 != 0,
						a = r ? s.d : s.a,
						o = r ? s.a : s.d;
					s.destroy();
					var h = this.padding[3],
						l = this.padding[0];
					0 == Laya.stage.canvasDegree ? (h += t.x, l += t.y, h *= a, l *= o, h += n.tx, l += n.ty) : 90 == Laya.stage.canvasDegree ? (h += t.y, l += t.x, h *= a, l *= o, h = n.tx - h, l += n.ty) : (h += t.y, l += t.x, h *= a, l *= o, h += n.tx, l = n.ty - l), a *= r ? t.height : t.width, o *= r ? t.width : t.height, n.tx = 0, n.ty = 0, e.inputContainer.style.transform = "scale(" + a + "," + o + ") rotate(" + Laya.stage.canvasDegree + "deg)", e.inputContainer.setPos(h, l), n.destroy();
					var u = this._width - this.padding[1] - this.padding[3],
						c = this._height - this.padding[0] - this.padding[2];
					this.nativeInput.setSize(u, c), this._getVisible() || (this.focus = !1), Render.isConchApp && (this.nativeInput.setPos(h, l), this.nativeInput.setScale(a, o))
				}, i._getVisible = function()
				{
					for (var t = this; t;)
					{
						if (t.visible === !1) return !1;
						t = t.parent
					}
					return !0
				}, i.select = function()
				{
					this.nativeInput.select()
				}, i._setInputMethod = function()
				{
					e.input.parentElement && e.inputContainer.removeChild(e.input), e.area.parentElement && e.inputContainer.removeChild(e.area), e.inputElement = this._multiline ? e.area : e.input, e.inputContainer.appendChild(e.inputElement)
				}, i._focusIn = function()
				{
					laya.display.Input.isInputting = !0;
					var t = this.nativeInput;
					this._focus = !0;
					var e = t.style;
					e.whiteSpace = this.wordWrap ? "pre-wrap" : "nowrap", this._setPromptColor(), t.readOnly = !this._editable, t.maxLength = this._maxChars;
					this.padding;
					t.type = this._type, t.value = this._content, t.placeholder = this._prompt, Laya.stage.off("keydown", this, this._onKeyDown), Laya.stage.on("keydown", this, this._onKeyDown), Laya.stage.focus = this, this.event("focus"), Browser.onPC && t.focus();
					this._text;
					this._text = null, this.typeset(), t.setColor(this._originColor), t.setFontSize(this.fontSize), t.setFontFace(this.font), Render.isConchApp && t.setMultiAble && t.setMultiAble(this._multiline), e.lineHeight = this.leading + this.fontSize + "px", e.fontStyle = this.italic ? "italic" : "normal", e.fontWeight = this.bold ? "bold" : "normal", e.textAlign = this.align, e.padding = "0 0", this._syncInputTransform(), !Render.isConchApp && Browser.onPC && Laya.timer.frameLoop(1, this, this._syncInputTransform)
				}, i._setPromptColor = function()
				{
					e.promptStyleDOM = Browser.getElementById("promptStyle"), e.promptStyleDOM || (e.promptStyleDOM = Browser.createElement("style"), Browser.document.head.appendChild(e.promptStyleDOM)), e.promptStyleDOM.innerText = "input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color:" + this._promptColor + "}input:-moz-placeholder, textarea:-moz-placeholder {color:" + this._promptColor + "}input::-moz-placeholder, textarea::-moz-placeholder {color:" + this._promptColor + "}input:-ms-input-placeholder, textarea:-ms-input-placeholder {color:" + this._promptColor + "}"
				}, i._focusOut = function()
				{
					laya.display.Input.isInputting = !1, this._focus = !1, this._text = null, this._content = this.nativeInput.value, this._content ? (t.prototype._$set_text.call(this, this._content), t.prototype._$set_color.call(this, this._originColor)) : (t.prototype._$set_text.call(this, this._prompt), t.prototype._$set_color.call(this, this._promptColor)), Laya.stage.off("keydown", this, this._onKeyDown), Laya.stage.focus = null, this.event("blur"), Render.isConchApp && this.nativeInput.blur(), Browser.onPC && Laya.timer.clear(this, this._syncInputTransform), Laya.stage.off("mousedown", this, this._checkBlur)
				}, i._onKeyDown = function(t)
				{
					13 === t.keyCode && (Browser.onMobile && !this._multiline && (this.focus = !1), this.event("enter"))
				}, i.changeText = function(e)
				{
					this._content = e, this._focus ? (this.nativeInput.value = e || "", this.event("change")) : t.prototype.changeText.call(this, e)
				}, __getset(0, i, "multiline", function()
				{
					return this._multiline
				}, function(t)
				{
					this._multiline = t, this.valign = t ? "top" : "middle"
				}), __getset(0, i, "color", t.prototype._$get_color, function(e)
				{
					this._focus && this.nativeInput.setColor(e), t.prototype._$set_color.call(this, this._content ? e : this._promptColor), this._originColor = e
				}), __getset(0, i, "promptColor", function()
				{
					return this._promptColor
				}, function(e)
				{
					this._promptColor = e, this._content || t.prototype._$set_color.call(this, e)
				}), __getset(0, i, "nativeInput", function()
				{
					return this._multiline ? e.area : e.input
				}), __getset(0, i, "focus", function()
				{
					return this._focus
				}, function(t)
				{
					var i = this.nativeInput;
					this._focus !== t && (t ? (i.target && (i.target.focus = !1), i.target = this, this._setInputMethod(), this._focusIn()) : (i.target = null, this._focusOut(), Render.isConchApp ? i.setPos(-1e4, -1e4) : e.inputContainer.contains(i) && e.inputContainer.removeChild(i)))
				}), __getset(0, i, "text", function()
				{
					return this._focus ? this.nativeInput.value : this._content || ""
				}, function(e)
				{
					t.prototype._$set_color.call(this, this._originColor), e += "", this._focus ? (this.nativeInput.value = e || "", this.event("change")) : (this._multiline || (e = e.replace(/\r?\n/g, "")), this._content = e, e ? t.prototype._$set_text.call(this, e) : (t.prototype._$set_text.call(this, this._prompt), t.prototype._$set_color.call(this, this.promptColor)))
				}), __getset(0, i, "maxChars", function()
				{
					return this._maxChars
				}, function(t)
				{
					0 >= t && (t = 1e5), this._maxChars = t
				}), __getset(0, i, "prompt", function()
				{
					return this._prompt
				}, function(e)
				{
					!this._text && e && t.prototype._$set_color.call(this, this._promptColor), this.promptColor = this._promptColor, this._text ? t.prototype._$set_text.call(this, this._text == this._prompt ? e : this._text) : t.prototype._$set_text.call(this, e), this._prompt = e
				}), __getset(0, i, "restrict", function()
				{
					return this._restrictPattern ? this._restrictPattern.source : ""
				}, function(t)
				{
					t ? (t = "[^" + t + "]", t.indexOf("^^") > -1 && (t = t.replace("^^", "")), this._restrictPattern = new RegExp(t, "g")) : this._restrictPattern = null
				}), __getset(0, i, "editable", function()
				{
					return this._editable
				}, function(t)
				{
					this._editable = t
				}), __getset(0, i, "inputElementYAdjuster", function()
				{
					return console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementYAdjuster已弃用。"), 0
				}, function(t)
				{
					console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementYAdjuster已弃用。")
				}), __getset(0, i, "type", function()
				{
					return this._type
				}, function(t)
				{
					"password" == t ? this._getCSSStyle().password = !0 : this._getCSSStyle().password = !1, this._type = t
				}), __getset(0, i, "inputElementXAdjuster", function()
				{
					return console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementXAdjuster已弃用。"), 0
				}, function(t)
				{
					console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementXAdjuster已弃用。")
				}), __getset(0, i, "asPassword", function()
				{
					return this._getCSSStyle().password
				}, function(t)
				{
					this._getCSSStyle().password = t, this._type = "password", console.warn('deprecated: 使用type="password"替代设置asPassword, asPassword将在下次重大更新时删去'), this.isChanged = !0
				}), e.__init__ = function()
				{
					e._createInputElement(), Browser.onMobile && Render.canvas.addEventListener(e.IOS_IFRAME ? "click" : "touchend", e._popupInputMethod)
				}, e._popupInputMethod = function(t)
				{
					if (laya.display.Input.isInputting)
					{
						var e = laya.display.Input.inputElement;
						e.focus()
					}
				}, e._createInputElement = function()
				{
					e._initInput(e.area = Browser.createElement("textarea")), e._initInput(e.input = Browser.createElement("input")), e.inputContainer = Browser.createElement("div"), e.inputContainer.style.position = "absolute", e.inputContainer.style.zIndex = 1e5, Browser.container.appendChild(e.inputContainer), e.inputContainer.setPos = function(t, i)
					{
						e.inputContainer.style.left = t + "px", e.inputContainer.style.top = i + "px"
					}
				}, e._initInput = function(t)
				{
					var i = t.style;
					i.cssText = "position:absolute;overflow:hidden;resize:none;transform-origin:0 0;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;", i.resize = "none", i.backgroundColor = "transparent", i.border = "none", i.outline = "none", t.addEventListener("input", e._processInputting), t.addEventListener("mousemove", e._stopEvent), t.addEventListener("mousedown", e._stopEvent), t.addEventListener("touchmove", e._stopEvent), Render.isConchApp || (t.setColor = function(e)
					{
						t.style.color = e
					}, t.setFontSize = function(e)
					{
						t.style.fontSize = e + "px"
					}, t.setSize = function(e, i)
					{
						t.style.width = e + "px", t.style.height = i + "px"
					}), t.setFontFace = function(e)
					{
						t.style.fontFamily = e
					}
				}, e._processInputting = function(t)
				{
					var e = laya.display.Input.inputElement.target,
						i = laya.display.Input.inputElement.value;
					e._restrictPattern && (i = i.replace(/\u2006|\x27/g, ""), e._restrictPattern.test(i) && (i = i.replace(e._restrictPattern, ""), laya.display.Input.inputElement.value = i)), e._text = i, e.event("input")
				}, e._stopEvent = function(t)
				{
					"touchmove" == t.type && t.preventDefault(), t.stopPropagation && t.stopPropagation()
				}, e.TYPE_TEXT = "text", e.TYPE_PASSWORD = "password", e.TYPE_EMAIL = "email", e.TYPE_URL = "url", e.TYPE_NUMBER = "number", e.TYPE_RANGE = "range", e.TYPE_DATE = "date", e.TYPE_MONTH = "month", e.TYPE_WEEK = "week", e.TYPE_TIME = "time", e.TYPE_DATE_TIME = "datetime", e.TYPE_DATE_TIME_LOCAL = "datetime-local", e.TYPE_SEARCH = "search", e.input = null, e.area = null, e.inputElement = null, e.inputContainer = null, e.confirmButton = null, e.promptStyleDOM = null, e.inputHeight = 45, e.isInputting = !1, __static(e, ["IOS_IFRAME", function()
				{
					return this.IOS_IFRAME = Browser.onIOS && Browser.window.top != Browser.window.self
				}]), e
			}(Text),
			HTMLImage = function(t)
			{
				function e(t, i)
				{
					this._recreateLock = !1, this._needReleaseAgain = !1, e.__super.call(this), this._init_(t, i)
				}
				__class(e, "laya.resource.HTMLImage", t);
				var i = e.prototype;
				return i._init_ = function(t, e)
				{
					this._src = t, this._source = new Browser.window.Image, e && (e.onload && (this.onload = e.onload), e.onerror && (this.onerror = e.onerror), e.onCreate && e.onCreate(this)), 0 != t.indexOf("data:image") && (this._source.crossOrigin = ""), t && (this._source.src = t)
				}, i.recreateResource = function()
				{
					var t = this;
					if ("" === this._src) throw new Error("src no null！");
					if (this._needReleaseAgain = !1, this._source)
					{
						if (this._recreateLock) return;
						this.startCreate(), this.memorySize = this._w * this._h * 4, this._recreateLock = !1, this.completeCreate()
					}
					else
					{
						this._recreateLock = !0, this.startCreate();
						var e = this;
						this._source = new Browser.window.Image, this._source.crossOrigin = "", this._source.onload = function()
						{
							return e._needReleaseAgain ? (e._needReleaseAgain = !1, e._source.onload = null, void(e._source = null)) : (e._source.onload = null, e.memorySize = t._w * t._h * 4, e._recreateLock = !1, void e.completeCreate())
						}, this._source.src = this._src
					}
				}, i.detoryResource = function()
				{
					this._recreateLock && (this._needReleaseAgain = !0), this._source && (this._source = null, this.memorySize = 0)
				}, i.onresize = function()
				{
					this._w = this._source.width, this._h = this._source.height
				}, __getset(0, i, "onload", null, function(t)
				{
					var e = this;
					this._onload = t, this._source && (this._source.onload = null != this._onload ? function()
					{
						e.onresize(), e._onload()
					} : null)
				}), __getset(0, i, "onerror", null, function(t)
				{
					var e = this;
					this._onerror = t, this._source && (this._source.onerror = null != this._onerror ? function()
					{
						e._onerror()
					} : null)
				}), e.create = function(t, i)
				{
					return new e(t, i)
				}, e
			}(FileBitmap),
			GraphicAnimation = function(t)
			{
				function e()
				{
					this.animationList = null, this.animationDic = null, this._nodeList = null, this._nodeDefaultProps = null, this._gList = null, this._nodeIDAniDic = {}, e.__super.call(this)
				}
				__class(e, "laya.display.GraphicAnimation", t);
				var i = e.prototype;
				return i._parseNodeList = function(t)
				{
					this._nodeList || (this._nodeList = []), this._nodeDefaultProps[t.compId] = t.props, t.compId && this._nodeList.push(t.compId);
					var e = t.child;
					if (e)
					{
						var i = 0,
							n = e.length;
						for (i = 0; n > i; i++) this._parseNodeList(e[i])
					}
				}, i._calGraphicData = function(t)
				{
					this._setUp(null, t), this._createGraphicData()
				}, i._createGraphicData = function()
				{
					var t = [],
						e = 0,
						i = this.count;
					for (e = 0; i > e; e++) t.push(this._createFrameGraphic(e));
					this._gList = t
				}, i._createFrameGraphic = function(t)
				{
					var e = new Graphics,
						i = 0,
						n = this._nodeList.length,
						s = 0;
					for (i = 0; n > i; i++) s = this._nodeList[i], this._addNodeGraphic(s, e, t);
					return e
				}, i._calculateNodeKeyFrames = function(e)
				{
					t.prototype._calculateNodeKeyFrames.call(this, e), this._nodeIDAniDic[e.target] = e
				}, i.getNodeDataByID = function(t)
				{
					return this._nodeIDAniDic[t]
				}, i._getParams = function(t, i, n, s)
				{
					var r = e._temParam;
					r.length = i.length;
					var a = 0,
						o = i.length;
					for (a = 0; o > a; a++) r[a] = this._getObjVar(t, i[a][0], n, i[a][1], s);
					return r
				}, i._getObjVar = function(t, e, i, n, s)
				{
					if (t.hasOwnProperty(e))
					{
						var r = t[e];
						return i >= r.length && (i = r.length - 1), t[e][i]
					}
					return s.hasOwnProperty(e) ? s[e] : n
				}, i._addNodeGraphic = function(t, i, n)
				{
					var s = this.getNodeDataByID(t);
					if (s)
					{
						var r = s.frames,
							a = this._getParams(r, e._drawTextureCmd, n, this._nodeDefaultProps[t]);
						if ("" != a[0])
						{
							a[0] = this._getTextureByUrl(a[0]);
							var o, h = a[5],
								l = a[6];
							0 == h && 0 == l || (o = o || new Matrix, o.translate(-h, -l));
							var u = a[7],
								c = a[8],
								_ = a[9];
							1 == u && 1 == c && 0 == _ || (o = o || new Matrix, o.scale(u, c), o.rotate(.0174532922222222 * _)), o && (o.translate(a[1], a[2]), a[1] = a[2] = 0), i.drawTexture(a[0], a[1], a[2], a[3], a[4], o)
						}
					}
				}, i._getTextureByUrl = function(t)
				{
					return Loader.getRes(t)
				}, i.setAniData = function(t)
				{
					if (t.animations)
					{
						this._nodeDefaultProps = {}, this._parseNodeList(t);
						var e, i = {},
							n = [],
							s = t.animations,
							r = 0,
							a = s.length;
						for (r = 0; a > r; r++) e = s[r], this._calGraphicData(e), n.push(this._gList), i[e.name] = this._gList;
						this.animationList = n, this.animationDic = i
					}
				}, e.parseAnimationData = function(t)
				{
					e._I || (e._I = new e), e._I.setAniData(t);
					var i;
					return i = {}, i.animationList = e._I.animationList, i.animationDic = e._I.animationDic, i
				}, e._temParam = [], e._I = null, __static(e, ["_drawTextureCmd", function()
				{
					return this._drawTextureCmd = [
						["skin", null],
						["x", 0],
						["y", 0],
						["width", 0],
						["height", 0],
						["pivotX", 0],
						["pivotY", 0],
						["scaleX", 1],
						["scaleY", 1],
						["rotation", 0]
					]
				}]), e
			}(FrameAnimation);
		Laya.__init([EventDispatcher, Render, Browser, Timer, LoaderManager, LocalStorage, TimeLine])
	}(window, document, Laya),
	function(t, e, i)
	{
		var n = (i.un, i.uns, i["static"], i["class"]),
			s = (i.getset, i.__newvec, function()
			{
				function t()
				{}
				return n(t, "LayaMain"), t
			}());
		new s
	}(window, document, Laya);