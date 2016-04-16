! function (a, b) {
	function c(a) {
		try {
			return 0 !== angular.element(a).length
		} catch (b) {
			return !1
		}
	}

	function d(a, b) {
		if (!a || "" === a || e.hasOwnProperty(a)) throw "textAngular Error: A unique name is required for a Tool Definition";
		if (b.display && ("" === b.display || !c(b.display)) || !b.display && !b.buttontext && !b.iconclass) throw 'textAngular Error: Tool Definition for "' + a + '" does not have a valid display/iconclass/buttontext value';
		e[a] = b
	}
	b["true"] = a;
	var e = {};
	angular.module("textAngularSetup", []).constant("taRegisterTool", d).value("taTools", e).value("taOptions", {
			forceTextAngularSanitize: !0,
			keyMappings: [],
			toolbar: [["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "quote"], ["bold", "italics", "underline", "strikeThrough", "ul", "ol", "redo", "undo", "clear"], ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"], ["html", "insertImage", "insertLink", "insertVideo", "wordcount", "charcount"]],
			classes: {
				focussed: "focussed",
				toolbar: "btn-toolbar",
				toolbarGroup: "btn-group",
				toolbarButton: "btn btn-default",
				toolbarButtonActive: "active",
				disabled: "disabled",
				textEditor: "form-control",
				htmlEditor: "form-control"
			},
			defaultTagAttributes: {
				a: {
					target: ""
				}
			},
			setup: {
				textEditorSetup: function (a) {},
				htmlEditorSetup: function (a) {}
			},
			defaultFileDropHandler: function (a, b) {
				var c = new FileReader;
				return "image" === a.type.substring(0, 5) ? (c.onload = function () {
					"" !== c.result && b("insertImage", c.result, !0)
				}, c.readAsDataURL(a), !0) : !1
			}
		}).value("taSelectableElements", ["a", "img"]).value("taCustomRenderers", [{
			selector: "img",
			customAttribute: "ta-insert-video",
			renderLogic: function (a) {
				var b = angular.element("<iframe></iframe>"),
					c = a.prop("attributes");
				angular.forEach(c, function (a) {
					b.attr(a.name, a.value)
				}), b.attr("src", b.attr("ta-insert-video")), a.replaceWith(b)
			}
		}]).value("taTranslations", {
			html: {
				tooltip: "Toggle html / Rich Text"
			},
			heading: {
				tooltip: "Заголовок "
			},
			p: {
				tooltip: "Параграф"
			},
			pre: {
				tooltip: "Preformatted text"
			},
			ul: {
				tooltip: "Неупорядоченный список"
			},
			ol: {
				tooltip: "Упорядоченный список"
			},
			quote: {
				tooltip: "Ковычки"
			},
			undo: {
				tooltip: "Отменить"
			},
			redo: {
				tooltip: "Назад"
			},
			bold: {
				tooltip: "Жирное начертание"
			},
			italic: {
				tooltip: "Курсив"
			},
			underline: {
				tooltip: "Подчеркивание"
			},
			strikeThrough: {
				tooltip: "зачеркивание"
			},
			justifyLeft: {
				tooltip: "Выровнять текст по левому краю"
			},
			justifyRight: {
				tooltip: "Выровнять текст по правому краю"
			},
			justifyFull: {
				tooltip: "Justify text"
			},
			justifyCenter: {
				tooltip: "Выровнять текст по центру"
			},
			indent: {
				tooltip: "Increase indent"
			},
			outdent: {
				tooltip: "Decrease indent"
			},
			clear: {
				tooltip: "Clear formatting"
			},
			insertImage: {
				dialogPrompt: "Please enter an image URL to insert",
				tooltip: "Вставить изображение",
				hotkey: "the - possibly language dependent hotkey ... for some future implementation"
			},
			insertVideo: {
				tooltip: "Вставить видео",
				dialogPrompt: "Please enter a youtube URL to embed"
			},
			insertLink: {
				tooltip: "Вставить или редактировать ссылку",
				dialogPrompt: "Please enter a URL to insert"
			},
			editLink: {
				reLinkButton: {
					tooltip: "Relink"
				},
				unLinkButton: {
					tooltip: "Unlink"
				},
				targetToggle: {
					buttontext: "Open in New Window"
				}
			},
			wordcount: {
				tooltip: "Display words Count"
			},
			charcount: {
				tooltip: "Display characters Count"
			}
		}).factory("taToolFunctions", ["$window", "taTranslations", function (a, b) {
			return {
				imgOnSelectAction: function (a, b, c) {
					var d = function () {
						c.updateTaBindtaTextElement(), c.hidePopover()
					};
					a.preventDefault(), c.displayElements.popover.css("width", "375px");
					var e = c.displayElements.popoverContainer;
					e.empty();
					var f = angular.element('<div class="btn-group" style="padding-right: 6px;">'),
						g = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
					g.on("click", function (a) {
						a.preventDefault(), b.css({
							width: "100%",
							height: ""
						}), d()
					});
					var h = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
					h.on("click", function (a) {
						a.preventDefault(), b.css({
							width: "50%",
							height: ""
						}), d()
					});
					var i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
					i.on("click", function (a) {
						a.preventDefault(), b.css({
							width: "25%",
							height: ""
						}), d()
					});
					var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
					j.on("click", function (a) {
						a.preventDefault(), b.css({
							width: "",
							height: ""
						}), d()
					}), f.append(g), f.append(h), f.append(i), f.append(j), e.append(f), f = angular.element('<div class="btn-group" style="padding-right: 6px;">');
					var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
					k.on("click", function (a) {
						a.preventDefault(), b.css("float", "left"), b.css("cssFloat", "left"), b.css("styleFloat", "left"), d()
					});
					var l = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
					l.on("click", function (a) {
						a.preventDefault(), b.css("float", "right"), b.css("cssFloat", "right"), b.css("styleFloat", "right"), d()
					});
					var m = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
					m.on("click", function (a) {
						a.preventDefault(), b.css("float", ""), b.css("cssFloat", ""), b.css("styleFloat", ""), d()
					}), f.append(k), f.append(m), f.append(l), e.append(f), f = angular.element('<div class="btn-group">');
					var n = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
					n.on("click", function (a) {
						a.preventDefault(), b.remove(), d()
					}), f.append(n), e.append(f), c.showPopover(b), c.showResizeOverlay(b)
				},
				aOnSelectAction: function (c, d, e) {
					c.preventDefault(), e.displayElements.popover.css("width", "436px");
					var f = e.displayElements.popoverContainer;
					f.empty(), f.css("line-height", "28px");
					var g = angular.element('<a href="' + d.attr("href") + '" target="_blank">' + d.attr("href") + "</a>");
					g.css({
						display: "inline-block",
						"max-width": "200px",
						overflow: "hidden",
						"text-overflow": "ellipsis",
						"white-space": "nowrap",
						"vertical-align": "middle"
					}), f.append(g);
					var h = angular.element('<div class="btn-group pull-right">'),
						i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + b.editLink.reLinkButton.tooltip + '"><i class="fa fa-edit icon-edit"></i></button>');
					i.on("click", function (c) {
						c.preventDefault();
						var f = a.prompt(b.insertLink.dialogPrompt, d.attr("href"));
						f && "" !== f && "http://" !== f && (d.attr("href", f), e.updateTaBindtaTextElement()), e.hidePopover()
					}), h.append(i);
					var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + b.editLink.unLinkButton.tooltip + '"><i class="fa fa-unlink icon-unlink"></i></button>');
					j.on("click", function (a) {
						a.preventDefault(), d.replaceWith(d.contents()), e.updateTaBindtaTextElement(), e.hidePopover()
					}), h.append(j);
					var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">' + b.editLink.targetToggle.buttontext + "</button>");
					"_blank" === d.attr("target") && k.addClass("active"), k.on("click", function (a) {
						a.preventDefault(), d.attr("target", "_blank" === d.attr("target") ? "" : "_blank"), k.toggleClass("active"), e.updateTaBindtaTextElement()
					}), h.append(k), f.append(h), e.showPopover(d)
				},
				extractYoutubeVideoId: function (a) {
					var b = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,
						c = a.match(b);
					return c && c[1] || null
				}
			}
		}]).run(["taRegisterTool", "$window", "taTranslations", "taSelection", "taToolFunctions", "$sanitize", "taOptions", function (a, b, c, d, e, f, g) {
			var h = {};
			if (f("", h), g.forceTextAngularSanitize === !0 && "taSanitize" !== h.version) throw angular.$$minErr("textAngular")("textAngularSetup", "The textAngular-sanitize provider has been replaced by another -- have you included angular-sanitize by mistake?");
			a("html", {
				iconclass: "fa fa-code",
				tooltiptext: c.html.tooltip,
				action: function () {
					this.$editor().switchView()
				},
				activeState: function () {
					return this.$editor().showHtml
				}
			});
			var i = function (a) {
					return function () {
						return this.$editor().queryFormatBlockState(a)
					}
				},
				j = function () {
					return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() + ">")
				};
			angular.forEach(["h1", "h2", "h3", "h4", "h5", "h6"], function (b) {
				a(b.toLowerCase(), {
					buttontext: b.toUpperCase(),
					tooltiptext: c.heading.tooltip + b.charAt(1),
					action: j,
					activeState: i(b.toLowerCase())
				})
			}), a("p", {
				buttontext: "P",
				tooltiptext: c.p.tooltip,
				action: function () {
					return this.$editor().wrapSelection("formatBlock", "<P>")
				},
				activeState: function () {
					return this.$editor().queryFormatBlockState("p")
				}
			}), a("pre", {
				buttontext: "pre",
				tooltiptext: c.pre.tooltip,
				action: function () {
					return this.$editor().wrapSelection("formatBlock", "<PRE>")
				},
				activeState: function () {
					return this.$editor().queryFormatBlockState("pre")
				}
			}), a("ul", {
				iconclass: "fa fa-list-ul",
				tooltiptext: c.ul.tooltip,
				action: function () {
					return this.$editor().wrapSelection("insertUnorderedList", null)
				},
				activeState: function () {
					return this.$editor().queryCommandState("insertUnorderedList")
				}
			}), a("ol", {
				iconclass: "fa fa-list-ol",
				tooltiptext: c.ol.tooltip,
				action: function () {
					return this.$editor().wrapSelection("insertOrderedList", null)
				},
				activeState: function () {
					return this.$editor().queryCommandState("insertOrderedList")
				}
			}), a("quote", {
				iconclass: "fa fa-quote-right",
				tooltiptext: c.quote.tooltip,
				action: function () {
					return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>")
				},
				activeState: function () {
					return this.$editor().queryFormatBlockState("blockquote")
				}
			}), a("undo", {
				iconclass: "fa fa-undo",
				tooltiptext: c.undo.tooltip,
				action: function () {
					return this.$editor().wrapSelection("undo", null)
				}
			}), a("redo", {
				iconclass: "fa fa-repeat",
				tooltiptext: c.redo.tooltip,
				action: function () {
					return this.$editor().wrapSelection("redo", null)
				}
			}), a("bold", {
				iconclass: "fa fa-bold",
				tooltiptext: c.bold.tooltip,
				action: function () {
					return this.$editor().wrapSelection("bold", null)
				},
				activeState: function () {
					return this.$editor().queryCommandState("bold")
				},
				commandKeyCode: 98
			}), a("justifyLeft", {
				iconclass: "fa fa-align-left",
				tooltiptext: c.justifyLeft.tooltip,
				action: function () {
					return this.$editor().wrapSelection("justifyLeft", null)
				},
				activeState: function (a) {
					if (a && "#document" === a.nodeName) return !1;
					var b = !1;
					return a && (b = "left" === a.css("text-align") || "left" === a.attr("align") || "right" !== a.css("text-align") && "center" !== a.css("text-align") && "justify" !== a.css("text-align") && !this.$editor().queryCommandState("justifyRight") && !this.$editor().queryCommandState("justifyCenter") && !this.$editor().queryCommandState("justifyFull")), b = b || this.$editor().queryCommandState("justifyLeft")
				}
			}), a("justifyRight", {
				iconclass: "fa fa-align-right",
				tooltiptext: c.justifyRight.tooltip,
				action: function () {
					return this.$editor().wrapSelection("justifyRight", null)
				},
				activeState: function (a) {
					if (a && "#document" === a.nodeName) return !1;
					var b = !1;
					return a && (b = "right" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyRight")
				}
			}), a("justifyFull", {
				iconclass: "fa fa-align-justify",
				tooltiptext: c.justifyFull.tooltip,
				action: function () {
					return this.$editor().wrapSelection("justifyFull", null)
				},
				activeState: function (a) {
					var b = !1;
					return a && (b = "justify" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyFull")
				}
			}), a("justifyCenter", {
				iconclass: "fa fa-align-center",
				tooltiptext: c.justifyCenter.tooltip,
				action: function () {
					return this.$editor().wrapSelection("justifyCenter", null)
				},
				activeState: function (a) {
					if (a && "#document" === a.nodeName) return !1;
					var b = !1;
					return a && (b = "center" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyCenter")
				}
			}), a("indent", {
				iconclass: "fa fa-indent",
				tooltiptext: c.indent.tooltip,
				action: function () {
					return this.$editor().wrapSelection("indent", null)
				},
				activeState: function () {
					return this.$editor().queryFormatBlockState("blockquote")
				},
				commandKeyCode: "TabKey"
			}), a("outdent", {
				iconclass: "fa fa-outdent",
				tooltiptext: c.outdent.tooltip,
				action: function () {
					return this.$editor().wrapSelection("outdent", null)
				},
				activeState: function () {
					return !1
				},
				commandKeyCode: "ShiftTabKey"
			}), a("italics", {
				iconclass: "fa fa-italic",
				tooltiptext: c.italic.tooltip,
				action: function () {
					return this.$editor().wrapSelection("italic", null)
				},
				activeState: function () {
					return this.$editor().queryCommandState("italic")
				},
				commandKeyCode: 105
			}), a("underline", {
				iconclass: "fa fa-underline",
				tooltiptext: c.underline.tooltip,
				action: function () {
					return this.$editor().wrapSelection("underline", null)
				},
				activeState: function () {
					return this.$editor().queryCommandState("underline")
				},
				commandKeyCode: 117
			}), a("strikeThrough", {
				iconclass: "fa fa-strikethrough",
				tooltiptext: c.strikeThrough.tooltip,
				action: function () {
					return this.$editor().wrapSelection("strikeThrough", null)
				},
				activeState: function () {
					return document.queryCommandState("strikeThrough")
				}
			}), a("clear", {
				iconclass: "fa fa-ban",
				tooltiptext: c.clear.tooltip,
				action: function (a, b) {
					var c;
					this.$editor().wrapSelection("removeFormat", null);
					var e = angular.element(d.getSelectionElement()),
						f = function (a) {
							a = angular.element(a);
							var b = a;
							angular.forEach(a.children(), function (a) {
								var c = angular.element("<p></p>");
								c.html(angular.element(a).html()), b.after(c), b = c
							}), a.remove()
						};
					if (angular.forEach(e.find("ul"), f), angular.forEach(e.find("ol"), f), "li" === e[0].tagName.toLowerCase()) {
						var g = e[0].parentNode.childNodes,
							h = [],
							i = [],
							j = !1;
						for (c = 0; c < g.length; c++) g[c] === e[0] ? j = !0 : j ? i.push(g[c]) : h.push(g[c]);
						var k = angular.element(e[0].parentNode),
							l = angular.element("<p></p>");
						if (l.html(angular.element(e[0]).html()), 0 === h.length || 0 === i.length) 0 === i.length ? k.after(l) : k[0].parentNode.insertBefore(l[0], k[0]), 0 === h.length && 0 === i.length ? k.remove() : angular.element(e[0]).remove();
						else {
							var m = angular.element("<" + k[0].tagName + "></" + k[0].tagName + ">"),
								n = angular.element("<" + k[0].tagName + "></" + k[0].tagName + ">");
							for (c = 0; c < h.length; c++) m.append(angular.element(h[c]));
							for (c = 0; c < i.length; c++) n.append(angular.element(i[c]));
							k.after(n), k.after(l), k.after(m), k.remove()
						}
						d.setSelectionToElementEnd(l[0])
					}
					var o = this.$editor(),
						p = function (a) {
							a = angular.element(a), a[0] !== o.displayElements.text[0] && a.removeAttr("class"), angular.forEach(a.children(), p)
						};
					angular.forEach(e, p), "li" !== e[0].tagName.toLowerCase() && "ol" !== e[0].tagName.toLowerCase() && "ul" !== e[0].tagName.toLowerCase() && this.$editor().wrapSelection("formatBlock", "default"), b()
				}
			}), a("insertImage", {
				iconclass: "fa fa-picture-o",
				tooltiptext: c.insertImage.tooltip,
				action: function () {
					var a;
					return a = b.prompt(c.insertImage.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("insertImage", a, !0) : void 0
				},
				onElementSelect: {
					element: "img",
					action: e.imgOnSelectAction
				}
			}), a("insertVideo", {
				iconclass: "fa fa-youtube-play",
				tooltiptext: c.insertVideo.tooltip,
				action: function () {
					var a;
					if (a = b.prompt(c.insertVideo.dialogPrompt, "https://"), a && "" !== a && "https://" !== a && (videoId = e.extractYoutubeVideoId(a), videoId)) {
						var d = "https://www.youtube.com/embed/" + videoId,
							f = '<img class="ta-insert-video" src="https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg" ta-insert-video="' + d + '" contenteditable="false" allowfullscreen="true" frameborder="0" />';
						return this.$editor().wrapSelection("insertHTML", f, !0)
					}
				},
				onElementSelect: {
					element: "img",
					onlyWithAttrs: ["ta-insert-video"],
					action: e.imgOnSelectAction
				}
			}), a("insertLink", {
				tooltiptext: c.insertLink.tooltip,
				iconclass: "fa fa-link",
				action: function () {
					var a;
					return a = b.prompt(c.insertLink.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("createLink", a, !0) : void 0
				},
				activeState: function (a) {
					return a ? "A" === a[0].tagName : !1
				},
				onElementSelect: {
					element: "a",
					action: e.aOnSelectAction
				}
			}), a("wordcount", {
				display: '<div id="toolbarWC" style="display:block; min-width:50px;">Слов: <span ng-bind="wordcount"></span></div>',
				disabled: !0,
				wordcount: 0,
				activeState: function () {
					var a = this.$editor().displayElements.text,
						b = a[0].innerHTML || "",
						c = 0;
					return "" !== b.replace(/\s*<[^>]*?>\s*/g, "") && (c = b.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi, "").replace(/(<[^>]*?>\s*<[^>]*?>)/gi, " ").replace(/(<[^>]*?>)/gi, "").replace(/\s+/gi, " ").match(/\S+/g).length), this.wordcount = c, this.$editor().wordcount = c, !1
				}
			}), a("charcount", {
				display: '<div id="toolbarCC" style="display:block; min-width:50px;">Букв: <span ng-bind="charcount"></span></div>',
				disabled: !0,
				charcount: 0,
				activeState: function () {
					var a = this.$editor().displayElements.text,
						b = a[0].innerText || a[0].textContent,
						c = b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+/g, " ").replace(/\s+$/g, " ").length;
					return this.charcount = c, this.$editor().charcount = c, !1
				}
			})
		}]),
		/*
		@license textAngular
		Author : Austin Anderson
		License : 2013 MIT
		Version 1.5.0

		See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
		*/
		"undefined" != typeof module && "undefined" != typeof a && module.exports === a && (module.exports = "textAngular"),
		function () {
			"use strict";
			var b = {
					ie: function () {
						for (var a, b = 3, c = document.createElement("div"), d = c.getElementsByTagName("i"); c.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->", d[0];);
						return b > 4 ? b : a
					}(),
					webkit: /AppleWebKit\/([\d.]+)/i.test(navigator.userAgent)
				},
				c = !1;
			b.webkit && (document.addEventListener("mousedown", function (a) {
				var b = a || window.event,
					d = b.target;
				if (c && null !== d) {
					for (var e = !1, f = d; null !== f && "html" !== f.tagName.toLowerCase() && !e;) e = "true" === f.contentEditable, f = f.parentNode;
					e || (document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0, 0), d.focus(), d.select && d.select())
				}
				c = !1
			}, !1), angular.element(document).ready(function () {
				angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" class="ta-hidden-input" aria-hidden="true" unselectable="on" tabIndex="-1">'))
			}));
			var d = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/i,
				f = /^(ul|li|ol)$/i,
				g = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video|li)$/i;
			String.prototype.trim || (String.prototype.trim = function () {
				return this.replace(/^\s+|\s+$/g, "")
			});
			var h, i, j, k, l, m;
			if (b.ie > 8 || void 0 === b.ie) {
				for (var n = document.styleSheets, o = 0; o < n.length; o++)
					if ((0 === n[o].media.length || n[o].media.mediaText.match(/(all|screen)/gi)) && n[o].href && n[o].href.match(/textangular\.(min\.|)css/gi)) {
						h = n[o];
						break
					}
				h || (h = function () {
					var a = document.createElement("style");
					return b.webkit && a.appendChild(document.createTextNode("")), document.getElementsByTagName("head")[0].appendChild(a), a.sheet
				}()), i = function (a, b) {
					return k(h, a, b)
				}, k = function (a, b, c) {
					var d, e;
					return a.cssRules ? d = Math.max(a.cssRules.length - 1, 0) : a.rules && (d = Math.max(a.rules.length - 1, 0)), a.insertRule ? a.insertRule(b + "{" + c + "}", d) : a.addRule(b, c, d), h.rules ? e = h.rules[d] : h.cssRules && (e = h.cssRules[d]), e
				}, m = function (a, b) {
					var c, d;
					for (c = 0; c < b.length; c++)
						if (b[c].cssText === a.cssText) {
							d = c;
							break
						}
					return d
				}, j = function (a) {
					l(h, a)
				}, l = function (a, b) {
					var c = a.cssRules || a.rules;
					if (c && 0 !== c.length) {
						var d = m(b, c);
						a.removeRule ? a.removeRule(d) : a.deleteRule(d)
					}
				}
			}
			angular.module("textAngular.factories", []).factory("taBrowserTag", [function () {
				return function (a) {
					return a ? "" === a ? void 0 === b.ie ? "div" : b.ie <= 8 ? "P" : "p" : b.ie <= 8 ? a.toUpperCase() : a : b.ie <= 8 ? "P" : "p"
				}
			}]).factory("taApplyCustomRenderers", ["taCustomRenderers", "taDOM", function (a, b) {
				return function (c) {
					var d = angular.element("<div></div>");
					return d[0].innerHTML = c, angular.forEach(a, function (a) {
						var c = [];
						a.selector && "" !== a.selector ? c = d.find(a.selector) : a.customAttribute && "" !== a.customAttribute && (c = b.getByAttribute(d, a.customAttribute)), angular.forEach(c, function (b) {
							b = angular.element(b), a.selector && "" !== a.selector && a.customAttribute && "" !== a.customAttribute ? void 0 !== b.attr(a.customAttribute) && a.renderLogic(b) : a.renderLogic(b)
						})
					}), d[0].innerHTML
				}
			}]).factory("taFixChrome", function () {
				var a = function (a) {
					if (!a || !angular.isString(a) || a.length <= 0) return a;
					for (var b, c, d, e = /<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi, f = "", g = 0; b = e.exec(a);) c = b[3] || b[4], c && c.match(/line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;/i) && (c = c.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;/gi, ""), d = "<" + b[1].trim(), c.trim().length > 0 && (d += " style=" + b[2].substring(0, 1) + c + b[2].substring(0, 1)), d += b[5].trim() + ">", f += a.substring(g, b.index) + d, g = b.index + b[0].length);
					return f += a.substring(g), g > 0 ? f.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/gi, "$1") : a
				};
				return a
			}).factory("taSanitize", ["$sanitize", function (a) {
				function b(a, b) {
					for (var c, d = 0, e = 0, f = /<[^>]*>/gi; c = f.exec(a);)
						if (e = c.index, "/" === c[0].substr(1, 1)) {
							if (0 === d) break;
							d--
						} else d++;
					return b + a.substring(0, e) + angular.element(b)[0].outerHTML.substring(b.length) + a.substring(e)
				}

				function c(a) {
					if (!a || !angular.isString(a) || a.length <= 0) return a;
					for (var d, f, g, h, i, k, l = /<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi, m = "", n = "", o = 0; f = l.exec(a);) {
						h = f[3] || f[4];
						var p = new RegExp(j, "i");
						if (angular.isString(h) && p.test(h)) {
							i = "";
							for (var q = new RegExp(j, "ig"); g = q.exec(h);)
								for (d = 0; d < e.length; d++) g[2 * d + 2] && (i += "<" + e[d].tag + ">");
							k = c(a.substring(o, f.index)), n += m.length > 0 ? b(k, m) : k, h = h.replace(new RegExp(j, "ig"), ""), n += "<" + f[1].trim(), h.length > 0 && (n += ' style="' + h + '"'), n += f[5] + ">", o = f.index + f[0].length, m = i
						}
					}
					return n += m.length > 0 ? b(a.substring(o), m) : a.substring(o)
				}

				function d(a) {
					if (!a || !angular.isString(a) || a.length <= 0) return a;
					for (var b, c = /<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/gi, d = "", e = 0; b = c.exec(a);) {
						d += a.substring(e, b.index), e = b.index + b[0].length;
						var f = "<" + b[1] + b[5];
						/style=("([^"]+)"|'([^']+)')/gi.test(f) ? f = f.replace(/style=("([^"]+)"|'([^']+)')/i, 'style="$2$3 text-align:' + (b[3] || b[4]) + ';"') : f += ' style="text-align:' + (b[3] || b[4]) + ';"', f += ">", d += f
					}
					return d + a.substring(e)
				}
				for (var e = [{
						property: "font-weight",
						values: ["bold"],
						tag: "b"
					}, {
						property: "font-style",
						values: ["italic"],
						tag: "i"
					}], f = [], g = 0; g < e.length; g++) {
					for (var h = "(" + e[g].property + ":\\s*(", i = 0; i < e[g].values.length; i++) i > 0 && (h += "|"), h += e[g].values[i];
					h += ");)", f.push(h)
				}
				var j = "(" + f.join("|") + ")";
				return function (b, e, f) {
					if (!f) try {
						b = c(b)
					} catch (g) {}
					b = d(b);
					var h;
					try {
						h = a(b), f && (h = b)
					} catch (g) {
						h = e || ""
					}
					var i, j = h.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/gi),
						k = h.replace(/(&#(9|10);)*/gi, ""),
						l = /<pre[^>]*>.*?<\/pre[^>]*>/gi,
						m = 0,
						n = 0;
					for (h = ""; null !== (i = l.exec(k)) && m < j.length;) h += k.substring(n, i.index) + j[m], n = i.index + i[0].length, m++;
					return h + k.substring(n)
				}
			}]).factory("taToolExecuteAction", ["$q", "$log", function (a, b) {
				return function (c) {
					void 0 !== c && (this.$editor = function () {
						return c
					});
					var d, e = a.defer(),
						f = e.promise,
						g = this.$editor();
					try {
						d = this.action(e, g.startAction()), f["finally"](function () {
							g.endAction.call(g)
						})
					} catch (h) {
						b.error(h)
					}(d || void 0 === d) && e.resolve()
				}
			}]), angular.module("textAngular.DOM", ["textAngular.factories"]).factory("taExecCommand", ["taSelection", "taBrowserTag", "$document", function (a, b, c) {
				var e = function (b, c) {
						var d, e, f = b.find("li");
						for (e = f.length - 1; e >= 0; e--) d = angular.element("<" + c + ">" + f[e].innerHTML + "</" + c + ">"), b.after(d);
						b.remove(), a.setSelectionToElementEnd(d[0])
					},
					g = function (b) {
						/(<br(|\/)>)$/i.test(b.innerHTML.trim()) ? a.setSelectionBeforeElement(angular.element(b).find("br")[0]) : a.setSelectionToElementEnd(b)
					},
					h = function (a, b) {
						var c = angular.element("<" + b + ">" + a[0].innerHTML + "</" + b + ">");
						a.after(c), a.remove(), g(c.find("li")[0])
					},
					i = function (a, c, d) {
						for (var e = "", f = 0; f < a.length; f++) e += "<" + b("li") + ">" + a[f].innerHTML + "</" + b("li") + ">";
						var h = angular.element("<" + d + ">" + e + "</" + d + ">");
						c.after(h), c.remove(), g(h.find("li")[0])
					};
				return function (g, j) {
					return g = b(g),
						function (k, l, m, n) {
							var o, p, q, r, s, t, u, v = angular.element("<" + g + ">");
							try {
								u = a.getSelectionElement()
							} catch (w) {}
							var x = angular.element(u);
							if (void 0 !== u) {
								var y = u.tagName.toLowerCase();
								if ("insertorderedlist" === k.toLowerCase() || "insertunorderedlist" === k.toLowerCase()) {
									var z = b("insertorderedlist" === k.toLowerCase() ? "ol" : "ul");
									if (y === z) return e(x, g);
									if ("li" === y && x.parent()[0].tagName.toLowerCase() === z && 1 === x.parent().children().length) return e(x.parent(), g);
									if ("li" === y && x.parent()[0].tagName.toLowerCase() !== z && 1 === x.parent().children().length) return h(x.parent(), z);
									if (y.match(d) && !x.hasClass("ta-bind")) {
										if ("ol" === y || "ul" === y) return h(x, z);
										var A = !1;
										return angular.forEach(x.children(), function (a) {
											a.tagName.match(d) && (A = !0)
										}), A ? i(x.children(), x, z) : i([angular.element("<div>" + u.innerHTML + "</div>")[0]], x, z)
									}
									if (y.match(d)) {
										if (r = a.getOnlySelectedElements(), 0 === r.length) p = angular.element("<" + z + "><li>" + u.innerHTML + "</li></" + z + ">"), x.html(""), x.append(p);
										else {
											if (1 === r.length && ("ol" === r[0].tagName.toLowerCase() || "ul" === r[0].tagName.toLowerCase())) return r[0].tagName.toLowerCase() === z ? e(angular.element(r[0]), g) : h(angular.element(r[0]), z);
											q = "";
											var B = [];
											for (o = 0; o < r.length; o++)
												if (3 !== r[o].nodeType) {
													var C = angular.element(r[o]);
													if ("li" === r[o].tagName.toLowerCase()) continue;
													q += "ol" === r[o].tagName.toLowerCase() || "ul" === r[o].tagName.toLowerCase() ? C[0].innerHTML : "span" !== r[o].tagName.toLowerCase() || "ol" !== r[o].childNodes[0].tagName.toLowerCase() && "ul" !== r[o].childNodes[0].tagName.toLowerCase() ? "<" + b("li") + ">" + C[0].innerHTML + "</" + b("li") + ">" : C[0].childNodes[0].innerHTML, B.unshift(C)
												}
											p = angular.element("<" + z + ">" + q + "</" + z + ">"), B.pop().replaceWith(p), angular.forEach(B, function (a) {
												a.remove()
											})
										}
										return void a.setSelectionToElementEnd(p[0])
									}
								} else {
									if ("formatblock" === k.toLowerCase()) {
										for (t = m.toLowerCase().replace(/[<>]/gi, ""), "default" === t.trim() && (t = g, m = "<" + g + ">"), p = "li" === y ? x.parent() : x; !p[0].tagName || !p[0].tagName.match(d) && !p.parent().attr("contenteditable");) p = p.parent(), y = (p[0].tagName || "").toLowerCase();
										if (y === t) {
											r = p.children();
											var D = !1;
											for (o = 0; o < r.length; o++) D = D || r[o].tagName.match(d);
											D ? (p.after(r), s = p.next(), p.remove(), p = s) : (v.append(p[0].childNodes), p.after(v), p.remove(), p = v)
										} else if (p.parent()[0].tagName.toLowerCase() !== t || p.parent().hasClass("ta-bind"))
											if (y.match(f)) p.wrap(m);
											else {
												for (r = a.getOnlySelectedElements(), 0 === r.length && (r = [p[0]]), o = 0; o < r.length; o++)
													if (3 === r[o].nodeType || !r[o].tagName.match(d))
														for (; 3 === r[o].nodeType || !r[o].tagName || !r[o].tagName.match(d);) r[o] = r[o].parentNode;
												if (angular.element(r[0]).hasClass("ta-bind")) p = angular.element(m), p[0].innerHTML = r[0].innerHTML, r[0].innerHTML = p[0].outerHTML;
												else if ("blockquote" === t) {
													for (q = "", o = 0; o < r.length; o++) q += r[o].outerHTML;
													for (p = angular.element(m), p[0].innerHTML = q, r[0].parentNode.insertBefore(p[0], r[0]), o = r.length - 1; o >= 0; o--) r[o].parentNode && r[o].parentNode.removeChild(r[o])
												} else
													for (o = 0; o < r.length; o++) p = angular.element(m), p[0].innerHTML = r[o].innerHTML, r[o].parentNode.insertBefore(p[0], r[o]), r[o].parentNode.removeChild(r[o])
											} else {
											var E = p.parent(),
												F = E.contents();
											for (o = 0; o < F.length; o++) E.parent().hasClass("ta-bind") && 3 === F[o].nodeType && (v = angular.element("<" + g + ">"), v[0].innerHTML = F[o].outerHTML, F[o] = v[0]), E.parent()[0].insertBefore(F[o], E[0]);
											E.remove()
										}
										return void a.setSelectionToElementEnd(p[0])
									}
									if ("createlink" === k.toLowerCase()) {
										var G = '<a href="' + m + '" target="' + (n.a.target ? n.a.target : "") + '">',
											H = "</a>",
											I = a.getSelection();
										if (I.collapsed) a.insertHtml(G + m + H, j);
										else if (rangy.getSelection().getRangeAt(0).canSurroundContents()) {
											var J = angular.element(G + H)[0];
											rangy.getSelection().getRangeAt(0).surroundContents(J)
										}
										return
									}
									if ("inserthtml" === k.toLowerCase()) return void a.insertHtml(m, j)
								}
							}
							try {
								c[0].execCommand(k, l, m)
							} catch (w) {}
						}
				}
			}]).service("taSelection", ["$window", "$document", "taDOM", function (a, b, c) {
				var e = b[0],
					f = a.rangy,
					h = function (a, b) {
						return a.tagName && a.tagName.match(/^br$/i) && 0 === b && !a.previousSibling ? {
							element: a.parentNode,
							offset: 0
						} : {
							element: a,
							offset: b
						}
					},
					i = {
						getSelection: function () {
							var a = f.getSelection().getRangeAt(0),
								b = a.commonAncestorContainer,
								c = {
									start: h(a.startContainer, a.startOffset),
									end: h(a.endContainer, a.endOffset),
									collapsed: a.collapsed
								};
							return b = 3 === b.nodeType ? b.parentNode : b, b.parentNode === c.start.element || b.parentNode === c.end.element ? c.container = b.parentNode : c.container = b, c
						},
						getOnlySelectedElements: function () {
							var a = f.getSelection().getRangeAt(0),
								b = a.commonAncestorContainer;
							return b = 3 === b.nodeType ? b.parentNode : b, a.getNodes([1], function (a) {
								return a.parentNode === b
							})
						},
						getSelectionElement: function () {
							return i.getSelection().container
						},
						setSelection: function (a, b, c) {
							var d = f.createRange();
							d.setStart(a, b), d.setEnd(a, c), f.getSelection().setSingleRange(d)
						},
						setSelectionBeforeElement: function (a) {
							var b = f.createRange();
							b.selectNode(a), b.collapse(!0), f.getSelection().setSingleRange(b)
						},
						setSelectionAfterElement: function (a) {
							var b = f.createRange();
							b.selectNode(a), b.collapse(!1), f.getSelection().setSingleRange(b)
						},
						setSelectionToElementStart: function (a) {
							var b = f.createRange();
							b.selectNodeContents(a), b.collapse(!0), f.getSelection().setSingleRange(b)
						},
						setSelectionToElementEnd: function (a) {
							var b = f.createRange();
							b.selectNodeContents(a), b.collapse(!1), a.childNodes && a.childNodes[a.childNodes.length - 1] && "br" === a.childNodes[a.childNodes.length - 1].nodeName && (b.startOffset = b.endOffset = b.startOffset - 1), f.getSelection().setSingleRange(b)
						},
						insertHtml: function (a, b) {
							var h, j, k, l, m, n, o, p = angular.element("<div>" + a + "</div>"),
								q = f.getSelection().getRangeAt(0),
								r = e.createDocumentFragment(),
								s = p[0].childNodes,
								t = !0;
							if (s.length > 0) {
								for (l = [], k = 0; k < s.length; k++) "p" === s[k].nodeName.toLowerCase() && "" === s[k].innerHTML.trim() || 3 === s[k].nodeType && "" === s[k].nodeValue.trim() || (t = t && !d.test(s[k].nodeName), l.push(s[k]));
								for (var u = 0; u < l.length; u++) n = r.appendChild(l[u]);
								!t && q.collapsed && /^(|<br(|\/)>)$/i.test(q.startContainer.innerHTML) && q.selectNode(q.startContainer)
							} else t = !0, n = r = e.createTextNode(a);
							if (t) q.deleteContents();
							else if (q.collapsed && q.startContainer !== b)
								if (q.startContainer.innerHTML && q.startContainer.innerHTML.match(/^<[^>]*>$/i)) h = q.startContainer, 1 === q.startOffset ? (q.setStartAfter(h), q.setEndAfter(h)) : (q.setStartBefore(h), q.setEndBefore(h));
								else {
									if (3 === q.startContainer.nodeType && q.startContainer.parentNode !== b)
										for (h = q.startContainer.parentNode, j = h.cloneNode(), c.splitNodes(h.childNodes, h, j, q.startContainer, q.startOffset); !g.test(h.nodeName);) {
											angular.element(h).after(j), h = h.parentNode;
											var v = j;
											j = h.cloneNode(), c.splitNodes(h.childNodes, h, j, v)
										} else h = q.startContainer, j = h.cloneNode(), c.splitNodes(h.childNodes, h, j, void 0, void 0, q.startOffset);
									if (angular.element(h).after(j), q.setStartAfter(h), q.setEndAfter(h), /^(|<br(|\/)>)$/i.test(h.innerHTML.trim()) && (q.setStartBefore(h), q.setEndBefore(h), angular.element(h).remove()), /^(|<br(|\/)>)$/i.test(j.innerHTML.trim()) && angular.element(j).remove(), "li" === h.nodeName.toLowerCase()) {
										for (o = e.createDocumentFragment(), m = 0; m < r.childNodes.length; m++) p = angular.element("<li>"), c.transferChildNodes(r.childNodes[m], p[0]), c.transferNodeAttributes(r.childNodes[m], p[0]), o.appendChild(p[0]);
										r = o, n && (n = r.childNodes[r.childNodes.length - 1], n = n.childNodes[n.childNodes.length - 1])
									}
								} else q.deleteContents();
							q.insertNode(r), n && i.setSelectionToElementEnd(n)
						}
					};
				return i
			}]).service("taDOM", function () {
				var a = {
					getByAttribute: function (b, c) {
						var d = [],
							e = b.children();
						return e.length && angular.forEach(e, function (b) {
							d = d.concat(a.getByAttribute(angular.element(b), c))
						}), void 0 !== b.attr(c) && d.push(b), d
					},
					transferChildNodes: function (a, b) {
						for (b.innerHTML = ""; a.childNodes.length > 0;) b.appendChild(a.childNodes[0]);
						return b
					},
					splitNodes: function (b, c, d, e, f, g) {
						if (!e && isNaN(g)) throw new Error("taDOM.splitNodes requires a splitNode or splitIndex");
						for (var h = document.createDocumentFragment(), i = document.createDocumentFragment(), j = 0; b.length > 0 && (isNaN(g) || g !== j) && b[0] !== e;) h.appendChild(b[0]), j++;
						for (!isNaN(f) && f >= 0 && b[0] && (h.appendChild(document.createTextNode(b[0].nodeValue.substring(0, f))), b[0].nodeValue = b[0].nodeValue.substring(f)); b.length > 0;) i.appendChild(b[0]);
						a.transferChildNodes(h, c), a.transferChildNodes(i, d)
					},
					transferNodeAttributes: function (a, b) {
						for (var c = 0; c < a.attributes.length; c++) b.setAttribute(a.attributes[c].name, a.attributes[c].value);
						return b
					}
				};
				return a
			}), angular.module("textAngular.validators", []).directive("taMaxText", function () {
				return {
					restrict: "A",
					require: "ngModel",
					link: function (a, b, c, d) {
						var e = parseInt(a.$eval(c.taMaxText));
						if (isNaN(e)) throw "Max text must be an integer";
						c.$observe("taMaxText", function (a) {
							if (e = parseInt(a), isNaN(e)) throw "Max text must be an integer";
							d.$dirty && d.$validate()
						}), d.$validators.taMaxText = function (a) {
							var b = angular.element("<div/>");
							return b.html(a), b.text().length <= e
						}
					}
				}
			}).directive("taMinText", function () {
				return {
					restrict: "A",
					require: "ngModel",
					link: function (a, b, c, d) {
						var e = parseInt(a.$eval(c.taMinText));
						if (isNaN(e)) throw "Min text must be an integer";
						c.$observe("taMinText", function (a) {
							if (e = parseInt(a), isNaN(e)) throw "Min text must be an integer";
							d.$dirty && d.$validate()
						}), d.$validators.taMinText = function (a) {
							var b = angular.element("<div/>");
							return b.html(a), !b.text().length || b.text().length >= e
						}
					}
				}
			}), angular.module("textAngular.taBind", ["textAngular.factories", "textAngular.DOM"]).service("_taBlankTest", [function () {
				var a = /<(a|abbr|acronym|bdi|bdo|big|cite|code|del|dfn|img|ins|kbd|label|map|mark|q|ruby|rp|rt|s|samp|time|tt|var)[^>]*(>|$)/i;
				return function (b) {
					return function (c) {
						if (!c) return !0;
						var d, e = /(^[^<]|>)[^<]/i.exec(c);
						return e ? d = e.index : (c = c.toString().replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, ""), d = c.indexOf(">")), c = c.trim().substring(d, d + 100), /^[^<>]+$/i.test(c) ? !1 : 0 === c.length || c === b || /^>(\s|&nbsp;)*<\/[^>]+>$/gi.test(c) ? !0 : />\s*[^\s<]/i.test(c) || a.test(c) ? !1 : !0
					}
				}
			}]).directive("taButton", [function () {
				return {
					link: function (a, b, c) {
						b.attr("unselectable", "on"), b.on("mousedown", function (a, b) {
							return b && angular.extend(a, b), a.preventDefault(), !1
						})
					}
				}
			}]).directive("taBind", ["taSanitize", "$timeout", "$window", "$document", "taFixChrome", "taBrowserTag", "taSelection", "taSelectableElements", "taApplyCustomRenderers", "taOptions", "_taBlankTest", "$parse", "taDOM", "textAngularManager", function (a, e, f, h, k, l, m, n, o, q, r, s, t, u) {
				return {
					priority: 2,
					require: ["ngModel", "?ngModelOptions"],
					link: function (l, v, w, x) {
						function y(a) {
							var b;
							return R.forEach(function (c) {
								if (c.keyCode === a.keyCode) {
									var d = (a.metaKey ? O : 0) + (a.ctrlKey ? N : 0) + (a.shiftKey ? Q : 0) + (a.altKey ? P : 0);
									if (c.forbiddenModifiers & d) return;
									c.mustHaveModifiers.every(function (a) {
										return d & a
									}) && (b = c.specialKey)
								}
							}), b
						}
						var z, A, B, C, D = x[0],
							E = x[1] || {},
							F = void 0 !== v.attr("contenteditable") && v.attr("contenteditable"),
							G = F || "textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase(),
							H = !1,
							I = !1,
							J = !1,
							K = w.taUnsafeSanitizer || q.disableSanitizer,
							L = /^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i,
							M = /^(8|13|32|46|59|61|107|109|173|186|187|188|189|190|191|192|219|220|221|222)$/i,
							N = 1,
							O = 2,
							P = 4,
							Q = 8,
							R = [{
								specialKey: "UndoKey",
								forbiddenModifiers: P + Q,
								mustHaveModifiers: [O + N],
								keyCode: 90
							}, {
								specialKey: "RedoKey",
								forbiddenModifiers: P,
								mustHaveModifiers: [O + N, Q],
								keyCode: 90
							}, {
								specialKey: "RedoKey",
								forbiddenModifiers: P + Q,
								mustHaveModifiers: [O + N],
								keyCode: 89
							}, {
								specialKey: "TabKey",
								forbiddenModifiers: O + Q + P + N,
								mustHaveModifiers: [],
								keyCode: 9
							}, {
								specialKey: "ShiftTabKey",
								forbiddenModifiers: O + P + N,
								mustHaveModifiers: [Q],
								keyCode: 9
							}];
						void 0 === w.taDefaultWrap && (w.taDefaultWrap = "p"), "" === w.taDefaultWrap ? (B = "", C = void 0 === b.ie ? "<div><br></div>" : b.ie >= 11 ? "<p><br></p>" : b.ie <= 8 ? "<P>&nbsp;</P>" : "<p>&nbsp;</p>") : (B = void 0 === b.ie || b.ie >= 11 ? "<" + w.taDefaultWrap + "><br></" + w.taDefaultWrap + ">" : b.ie <= 8 ? "<" + w.taDefaultWrap.toUpperCase() + "></" + w.taDefaultWrap.toUpperCase() + ">" : "<" + w.taDefaultWrap + "></" + w.taDefaultWrap + ">", C = void 0 === b.ie || b.ie >= 11 ? "<" + w.taDefaultWrap + "><br></" + w.taDefaultWrap + ">" : b.ie <= 8 ? "<" + w.taDefaultWrap.toUpperCase() + ">&nbsp;</" + w.taDefaultWrap.toUpperCase() + ">" : "<" + w.taDefaultWrap + ">&nbsp;</" + w.taDefaultWrap + ">"), E.$options || (E.$options = {});
						var S = r(C),
							T = function (a) {
								if (S(a)) return a;
								var b = angular.element("<div>" + a + "</div>");
								if (0 === b.children().length) a = "<" + w.taDefaultWrap + ">" + a + "</" + w.taDefaultWrap + ">";
								else {
									var c, e = b[0].childNodes,
										f = !1;
									for (c = 0; c < e.length && !(f = e[c].nodeName.toLowerCase().match(d)); c++);
									if (f)
										for (a = "", c = 0; c < e.length; c++) {
											var g = e[c],
												h = g.nodeName.toLowerCase();
											if ("#comment" === h) a += "<!--" + g.nodeValue + "-->";
											else if ("#text" === h) {
												var i = g.textContent;
												a += i.trim() ? "<" + w.taDefaultWrap + ">" + i + "</" + w.taDefaultWrap + ">" : i
											} else if (h.match(d)) a += g.outerHTML;
											else {
												var j = g.outerHTML || g.nodeValue;
												a += "" !== j.trim() ? "<" + w.taDefaultWrap + ">" + j + "</" + w.taDefaultWrap + ">" : j
											}
										} else a = "<" + w.taDefaultWrap + ">" + a + "</" + w.taDefaultWrap + ">"
								}
								return a
							};
						w.taPaste && (A = s(w.taPaste)), v.addClass("ta-bind");
						var U;
						l["$undoManager" + (w.id || "")] = D.$undoManager = {
							_stack: [],
							_index: 0,
							_max: 1e3,
							push: function (a) {
								return "undefined" == typeof a || null === a || "undefined" != typeof this.current() && null !== this.current() && a === this.current() ? a : (this._index < this._stack.length - 1 && (this._stack = this._stack.slice(0, this._index + 1)), this._stack.push(a), U && e.cancel(U), this._stack.length > this._max && this._stack.shift(), this._index = this._stack.length - 1, a)
							},
							undo: function () {
								return this.setToIndex(this._index - 1)
							},
							redo: function () {
								return this.setToIndex(this._index + 1)
							},
							setToIndex: function (a) {
								return 0 > a || a > this._stack.length - 1 ? void 0 : (this._index = a, this.current())
							},
							current: function () {
								return this._stack[this._index]
							}
						};
						var V, W = l["$undoTaBind" + (w.id || "")] = function () {
								if (!H && F) {
									var a = D.$undoManager.undo();
									"undefined" != typeof a && null !== a && (ka(a), Z(a, !1), V && e.cancel(V), V = e(function () {
										v[0].focus(), m.setSelectionToElementEnd(v[0])
									}, 1))
								}
							},
							X = l["$redoTaBind" + (w.id || "")] = function () {
								if (!H && F) {
									var a = D.$undoManager.redo();
									"undefined" != typeof a && null !== a && (ka(a), Z(a, !1), V && e.cancel(V), V = e(function () {
										v[0].focus(), m.setSelectionToElementEnd(v[0])
									}, 1))
								}
							},
							Y = function () {
								if (F) return v[0].innerHTML;
								if (G) return v.val();
								throw "textAngular Error: attempting to update non-editable taBind"
							},
							Z = function (a, b, c) {
								J = c || !1, ("undefined" == typeof b || null === b) && (b = F), ("undefined" == typeof a || null === a) && (a = Y()), S(a) ? ("" !== D.$viewValue && D.$setViewValue(""), b && "" !== D.$undoManager.current() && D.$undoManager.push("")) : (ja(), D.$viewValue !== a && (D.$setViewValue(a), b && D.$undoManager.push(a))), D.$render()
							};
						l["updateTaBind" + (w.id || "")] = function () {
							H || Z(void 0, void 0, !0)
						};
						var $ = function (b) {
							return D.$oldViewValue = a(k(b), D.$oldViewValue, K)
						};
						if (v.attr("required") && (D.$validators.required = function (a, b) {
								return !S(a || b)
							}), D.$parsers.push($), D.$parsers.unshift(T), D.$formatters.push($), D.$formatters.unshift(T), D.$formatters.unshift(function (a) {
								return D.$undoManager.push(a || "")
							}), G)
							if (l.events = {}, F) {
								var _ = !1,
									aa = function (b) {
										if (b && b.trim().length) {
											if (b.match(/class=["']*Mso(Normal|List)/i) || b.match(/content=["']*Word.Document/i)) {
												var c = b.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);
												c = c ? c[1] : b, c = c.replace(/<o:p>[\s\S]*?<\/o:p>/gi, "").replace(/class=(["']|)MsoNormal(["']|)/gi, "");
												var d = angular.element("<div>" + c + "</div>"),
													f = angular.element("<div></div>"),
													g = {
														element: null,
														lastIndent: [],
														lastLi: null,
														isUl: !1
													};
												g.lastIndent.peek = function () {
													var a = this.length;
													return a > 0 ? this[a - 1] : void 0
												};
												for (var h = function (a) {
														g.isUl = a, g.element = angular.element(a ? "<ul>" : "<ol>"), g.lastIndent = [], g.lastIndent.peek = function () {
															var a = this.length;
															return a > 0 ? this[a - 1] : void 0
														}, g.lastLevelMatch = null
													}, i = 0; i <= d[0].childNodes.length; i++)
													if (d[0].childNodes[i] && "#text" !== d[0].childNodes[i].nodeName) {
														var j = d[0].childNodes[i].tagName.toLowerCase();
														if ("p" === j || "h1" === j || "h2" === j || "h3" === j || "h4" === j || "h5" === j || "h6" === j) {
															var k = angular.element(d[0].childNodes[i]),
																n = (k.attr("class") || "").match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);
															if (n) {
																if (k[0].childNodes.length < 2 || k[0].childNodes[1].childNodes.length < 1) continue;
																var o = "bullet" === n[1].toLowerCase() || "number" !== n[1].toLowerCase() && !(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(k[0].childNodes[1].innerHTML) || /^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(k[0].childNodes[1].childNodes[0].innerHTML)),
																	p = (k.attr("style") || "").match(/margin-left:([\-\.0-9]*)/i),
																	q = parseFloat(p ? p[1] : 0),
																	r = (k.attr("style") || "").match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);
																if (r && r[2] && (q = parseInt(r[2])), r && (!g.lastLevelMatch || r[1] !== g.lastLevelMatch[1]) || !n[3] || "first" === n[3].toLowerCase() || null === g.lastIndent.peek() || g.isUl !== o && g.lastIndent.peek() === q) h(o), f.append(g.element);
																else if (null != g.lastIndent.peek() && g.lastIndent.peek() < q) g.element = angular.element(o ? "<ul>" : "<ol>"), g.lastLi.append(g.element);
																else if (null != g.lastIndent.peek() && g.lastIndent.peek() > q) {
																	for (; null != g.lastIndent.peek() && g.lastIndent.peek() > q;)
																		if ("li" !== g.element.parent()[0].tagName.toLowerCase()) {
																			if (!/[uo]l/i.test(g.element.parent()[0].tagName.toLowerCase())) break;
																			g.element = g.element.parent(), g.lastIndent.pop()
																		} else g.element = g.element.parent();
																	g.isUl = "ul" === g.element[0].tagName.toLowerCase(), o !== g.isUl && (h(o), f.append(g.element))
																}
																g.lastLevelMatch = r, q !== g.lastIndent.peek() && g.lastIndent.push(q), g.lastLi = angular.element("<li>"), g.element.append(g.lastLi), g.lastLi.html(k.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/gi, "")), k.remove()
															} else h(!1), f.append(k)
														}
													}
												var s = function (a) {
													a = angular.element(a);
													for (var b = a[0].childNodes.length - 1; b >= 0; b--) a.after(a[0].childNodes[b]);
													a.remove()
												};
												angular.forEach(f.find("span"), function (a) {
													a.removeAttribute("lang"), a.attributes.length <= 0 && s(a)
												}), angular.forEach(f.find("font"), s), b = f.html()
											} else {
												if (b = b.replace(/<(|\/)meta[^>]*?>/gi, ""), b.match(/<[^>]*?(ta-bind)[^>]*?>/)) {
													if (b.match(/<[^>]*?(text-angular)[^>]*?>/)) {
														var u = angular.element("<div>" + b + "</div>");
														u.find("textarea").remove();
														for (var w = t.getByAttribute(u, "ta-bind"), x = 0; x < w.length; x++) {
															for (var y = w[x][0].parentNode.parentNode, z = 0; z < w[x][0].childNodes.length; z++) y.parentNode.insertBefore(w[x][0].childNodes[z], y);
															y.parentNode.removeChild(y)
														}
														b = u.html().replace('<br class="Apple-interchange-newline">', "")
													}
												} else b.match(/^<span/) && (b.match(/<span class=(\"Apple-converted-space\"|\'Apple-converted-space\')>.<\/span>/gi) || (b = b.replace(/<(|\/)span[^>]*?>/gi, "")));
												b = b.replace(/<br class="Apple-interchange-newline"[^>]*?>/gi, "").replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/gi, "&nbsp;")
											}
											/<li(\s.*)?>/i.test(b) && /(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(b) === !1 && (b = b.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i, "<ul>$&</ul>")), b = b.replace(/^[ |\u00A0]+/gm, function (a) {
												for (var b = "", c = 0; c < a.length; c++) b += "&nbsp;";
												return b
											}).replace(/\n|\r\n|\r/g, "<br />").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"), A && (b = A(l, {
												$html: b
											}) || b), b = a(b, "", K), m.insertHtml(b, v[0]), e(function () {
												D.$setViewValue(Y()), _ = !1, v.removeClass("processing-paste")
											}, 0)
										} else _ = !1, v.removeClass("processing-paste")
									};
								v.on("paste", l.events.paste = function (a, b) {
									if (b && angular.extend(a, b), H || _) return a.stopPropagation(), a.preventDefault(), !1;
									_ = !0, v.addClass("processing-paste");
									var c, d = (a.originalEvent || a).clipboardData;
									if (d && d.getData && d.types.length > 0) {
										for (var g = "", i = 0; i < d.types.length; i++) g += " " + d.types[i];
										return /text\/html/i.test(g) ? c = d.getData("text/html") : /text\/plain/i.test(g) && (c = d.getData("text/plain")), aa(c), a.stopPropagation(), a.preventDefault(), !1
									}
									var j = f.rangy.saveSelection(),
										k = angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');
									h.find("body").append(k), k[0].focus(), e(function () {
										f.rangy.restoreSelection(j), aa(k[0].innerHTML), v[0].focus(), k.remove()
									}, 0)
								}), v.on("cut", l.events.cut = function (a) {
									H ? a.preventDefault() : e(function () {
										D.$setViewValue(Y())
									}, 0)
								}), v.on("keydown", l.events.keydown = function (a, b) {
									b && angular.extend(a, b), a.specialKey = y(a);
									var c;
									if (q.keyMappings.forEach(function (b) {
											a.specialKey === b.commandKeyCode && (a.specialKey = void 0), b.testForKey(a) && (c = b.commandKeyCode), ("UndoKey" === b.commandKeyCode || "RedoKey" === b.commandKeyCode) && (b.enablePropagation || a.preventDefault())
										}), "undefined" != typeof c && (a.specialKey = c), "undefined" == typeof a.specialKey || "UndoKey" === a.specialKey && "RedoKey" === a.specialKey || (a.preventDefault(), u.sendKeyCommand(l, a)), !H && ("UndoKey" === a.specialKey && (W(), a.preventDefault()), "RedoKey" === a.specialKey && (X(), a.preventDefault()), 13 === a.keyCode && !a.shiftKey)) {
										var d, e = function (a, b) {
												for (var c = 0; c < a.length; c++)
													if (a[c] === b) return !0;
												return !1
											},
											f = m.getSelectionElement();
										if (!f.tagName.match(g)) return;
										var h = angular.element(B),
											i = ["blockquote", "ul", "ol"];
										if (e(i, f.parentNode.tagName.toLowerCase())) {
											if (/^<br(|\/)>$/i.test(f.innerHTML.trim()) && !f.nextSibling) {
												d = angular.element(f);
												var j = d.parent();
												j.after(h), d.remove(), 0 === j.children().length && j.remove(), m.setSelectionToElementStart(h[0]), a.preventDefault()
											}
											/^<[^>]+><br(|\/)><\/[^>]+>$/i.test(f.innerHTML.trim()) && (d = angular.element(f), d.after(h), d.remove(), m.setSelectionToElementStart(h[0]), a.preventDefault())
										}
									}
								});
								var ba;
								if (v.on("keyup", l.events.keyup = function (a, b) {
										if (b && angular.extend(a, b), 9 === a.keyCode) {
											var c = m.getSelection();
											return void(c.start.element === v[0] && v.children().length && m.setSelectionToElementStart(v.children()[0]))
										}
										if (U && e.cancel(U), !H && !L.test(a.keyCode)) {
											if ("" !== B && 13 === a.keyCode && !a.shiftKey) {
												for (var d = m.getSelectionElement(); !d.tagName.match(g) && d !== v[0];) d = d.parentNode;
												if (d.tagName.toLowerCase() !== w.taDefaultWrap && "li" !== d.tagName.toLowerCase() && ("" === d.innerHTML.trim() || "<br>" === d.innerHTML.trim())) {
													var f = angular.element(B);
													angular.element(d).replaceWith(f), m.setSelectionToElementStart(f[0])
												}
											}
											var h = Y();
											"" !== B && "" === h.trim() ? (ka(B), m.setSelectionToElementStart(v.children()[0])) : "<" !== h.substring(0, 1) && "" !== w.taDefaultWrap;
											var i = z !== a.keyCode && M.test(a.keyCode);
											ba && e.cancel(ba), ba = e(function () {
												Z(h, i, !0)
											}, E.$options.debounce || 400), i || (U = e(function () {
												D.$undoManager.push(h)
											}, 250)), z = a.keyCode
										}
									}), v.on("blur", l.events.blur = function () {
										I = !1, H ? (J = !0, D.$render()) : Z(void 0, void 0, !0)
									}), w.placeholder && (b.ie > 8 || void 0 === b.ie)) {
									var ca;
									if (!w.id) throw "textAngular Error: An unique ID is required for placeholders to work";
									ca = i("#" + w.id + ".placeholder-text:before", 'content: "' + w.placeholder + '"'), l.$on("$destroy", function () {
										j(ca)
									})
								}
								v.on("focus", l.events.focus = function () {
									I = !0, v.removeClass("placeholder-text"), ja()
								}), v.on("mouseup", l.events.mouseup = function () {
									var a = m.getSelection();
									a.start.element === v[0] && v.children().length && m.setSelectionToElementStart(v.children()[0])
								}), v.on("mousedown", l.events.mousedown = function (a, b) {
									b && angular.extend(a, b), a.stopPropagation()
								})
							} else {
								v.on("change blur", l.events.change = l.events.blur = function () {
									H || D.$setViewValue(Y())
								}), v.on("keydown", l.events.keydown = function (a, b) {
									if (b && angular.extend(a, b), 9 === a.keyCode) {
										var c = this.selectionStart,
											d = this.selectionEnd,
											e = v.val();
										if (a.shiftKey) {
											var f = e.lastIndexOf("\n", c),
												g = e.lastIndexOf("	", c); - 1 !== g && g >= f && (v.val(e.substring(0, g) + e.substring(g + 1)), this.selectionStart = this.selectionEnd = c - 1)
										} else v.val(e.substring(0, c) + "	" + e.substring(d)), this.selectionStart = this.selectionEnd = c + 1;
										a.preventDefault()
									}
								});
								var da = function (a, b) {
										for (var c = "", d = 0; b > d; d++) c += a;
										return c
									},
									ea = function (a, b, c) {
										for (var d = 0; d < a.length; d++) b.call(c, d, a[d])
									},
									fa = function (a, b) {
										var c = "",
											d = a.childNodes;
										return b++, c += da("	", b - 1) + a.outerHTML.substring(0, 4), ea(d, function (a, d) {
											var e = d.nodeName.toLowerCase();
											return "#comment" === e ? void(c += "<!--" + d.nodeValue + "-->") : "#text" === e ? void(c += d.textContent) : void(d.outerHTML && (c += "ul" === e || "ol" === e ? "\n" + fa(d, b) : "\n" + da("	", b) + d.outerHTML))
										}), c += "\n" + da("	", b - 1) + a.outerHTML.substring(a.outerHTML.lastIndexOf("<"))
									};
								D.$formatters.unshift(function (a) {
									var b = angular.element("<div>" + a + "</div>")[0].childNodes;
									return b.length > 0 && (a = "", ea(b, function (b, c) {
										var d = c.nodeName.toLowerCase();
										return "#comment" === d ? void(a += "<!--" + c.nodeValue + "-->") : "#text" === d ? void(a += c.textContent) : void(c.outerHTML && (a.length > 0 && (a += "\n"), a += "ul" === d || "ol" === d ? "" + fa(c, 0) : "" + c.outerHTML))
									})), a
								})
							}
						var ga, ha = function (a) {
								return l.$emit("ta-element-select", this), a.preventDefault(), !1
							},
							ia = function (a, b) {
								if (b && angular.extend(a, b), !p && !H) {
									p = !0;
									var c;
									c = a.originalEvent ? a.originalEvent.dataTransfer : a.dataTransfer, l.$emit("ta-drop-event", this, a, c), e(function () {
										p = !1, Z(void 0, void 0, !0)
									}, 100)
								}
							},
							ja = l["reApplyOnSelectorHandlers" + (w.id || "")] = function () {
								H || angular.forEach(n, function (a) {
									v.find(a).off("click", ha).on("click", ha)
								})
							},
							ka = function (a) {
								v[0].innerHTML = a
							},
							la = !1;
						D.$render = function () {
							if (!la) {
								la = !0;
								var a = D.$viewValue || "";
								J || (F && I && (v.removeClass("placeholder-text"), ga && e.cancel(ga), ga = e(function () {
									I || (v[0].focus(), m.setSelectionToElementEnd(v.children()[v.children().length - 1])), ga = void 0
								}, 1)), F ? (ka(w.placeholder ? "" === a ? B : a : "" === a ? B : a), H ? v.off("drop", ia) : (ja(), v.on("drop", ia))) : "textarea" !== v[0].tagName.toLowerCase() && "input" !== v[0].tagName.toLowerCase() ? ka(o(a)) : v.val(a)), F && w.placeholder && ("" === a ? I ? v.removeClass("placeholder-text") : v.addClass("placeholder-text") : v.removeClass("placeholder-text")), la = J = !1
							}
						}, w.taReadonly && (H = l.$eval(w.taReadonly), H ? (v.addClass("ta-readonly"), ("textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase()) && v.attr("disabled", "disabled"), void 0 !== v.attr("contenteditable") && v.attr("contenteditable") && v.removeAttr("contenteditable")) : (v.removeClass("ta-readonly"), "textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase() ? v.removeAttr("disabled") : F && v.attr("contenteditable", "true")), l.$watch(w.taReadonly, function (a, b) {
							b !== a && (a ? (v.addClass("ta-readonly"), ("textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase()) && v.attr("disabled", "disabled"),
								void 0 !== v.attr("contenteditable") && v.attr("contenteditable") && v.removeAttr("contenteditable"), angular.forEach(n, function (a) {
									v.find(a).on("click", ha)
								}), v.off("drop", ia)) : (v.removeClass("ta-readonly"), "textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase() ? v.removeAttr("disabled") : F && v.attr("contenteditable", "true"), angular.forEach(n, function (a) {
								v.find(a).off("click", ha)
							}), v.on("drop", ia)), H = a)
						})), F && !H && (angular.forEach(n, function (a) {
							v.find(a).on("click", ha)
						}), v.on("drop", ia), v.on("blur", function () {
							b.webkit && (c = !0)
						}))
					}
				}
			}]);
			var p = !1,
				q = angular.module("textAngular", ["ngSanitize", "textAngularSetup", "textAngular.factories", "textAngular.DOM", "textAngular.validators", "textAngular.taBind"]);
			q.config([function () {
				angular.forEach(e, function (a, b) {
					delete e[b]
				})
			}]), q.run([function () {
				if ("function" == typeof define && define.amd) define(function (a) {
					window.rangy = a("rangy"), window.rangy.saveSelection = a("rangy/lib/rangy-selectionsaverestore")
				});
				else if ("function" == typeof require && "undefined" != typeof module && "object" == typeof a) window.rangy = require("rangy"), window.rangy.saveSelection = require("rangy/lib/rangy-selectionsaverestore");
				else {
					if (!window.rangy) throw "rangy-core.js and rangy-selectionsaverestore.js are required for textAngular to work correctly, rangy-core is not yet loaded.";
					if (window.rangy.init(), !window.rangy.saveSelection) throw "rangy-selectionsaverestore.js is required for textAngular to work correctly."
				}
			}]), q.directive("textAngular", ["$compile", "$timeout", "taOptions", "taSelection", "taExecCommand", "textAngularManager", "$window", "$document", "$animate", "$log", "$q", "$parse", function (a, b, c, d, e, f, g, h, i, j, k, l) {
				return {
					require: "?ngModel",
					scope: {},
					restrict: "EA",
					priority: 2,
					link: function (m, n, o, p) {
						var q, r, s, t, u, v, w, x, y, z, A, B = o.serial ? o.serial : Math.floor(1e16 * Math.random());
						m._name = o.name ? o.name : "textAngularEditor" + B;
						var C = function (a, c, d) {
							b(function () {
								var b = function () {
									a.off(c, b), d.apply(this, arguments)
								};
								a.on(c, b)
							}, 100)
						};
						if (y = e(o.taDefaultWrap), angular.extend(m, angular.copy(c), {
								wrapSelection: function (a, b, c) {
									"undo" === a.toLowerCase() ? m["$undoTaBindtaTextElement" + B]() : "redo" === a.toLowerCase() ? m["$redoTaBindtaTextElement" + B]() : (y(a, !1, b, m.defaultTagAttributes), c && m["reApplyOnSelectorHandlerstaTextElement" + B](), m.displayElements.text[0].focus())
								},
								showHtml: m.$eval(o.taShowHtml) || !1
							}), o.taFocussedClass && (m.classes.focussed = o.taFocussedClass), o.taTextEditorClass && (m.classes.textEditor = o.taTextEditorClass), o.taHtmlEditorClass && (m.classes.htmlEditor = o.taHtmlEditorClass), o.taDefaultTagAttributes) try {
							angular.extend(m.defaultTagAttributes, angular.fromJson(o.taDefaultTagAttributes))
						} catch (D) {
							j.error(D)
						}
						o.taTextEditorSetup && (m.setup.textEditorSetup = m.$parent.$eval(o.taTextEditorSetup)), o.taHtmlEditorSetup && (m.setup.htmlEditorSetup = m.$parent.$eval(o.taHtmlEditorSetup)), o.taFileDrop ? m.fileDropHandler = m.$parent.$eval(o.taFileDrop) : m.fileDropHandler = m.defaultFileDropHandler, w = n[0].innerHTML, n[0].innerHTML = "", m.displayElements = {
							forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
							html: angular.element("<textarea></textarea>"),
							text: angular.element("<div></div>"),
							scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
							popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),
							popoverArrow: angular.element('<div class="arrow"></div>'),
							popoverContainer: angular.element('<div class="popover-content"></div>'),
							resize: {
								overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
								background: angular.element('<div class="ta-resizer-handle-background"></div>'),
								anchors: [angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],
								info: angular.element('<div class="ta-resizer-handle-info"></div>')
							}
						}, m.displayElements.popover.append(m.displayElements.popoverArrow), m.displayElements.popover.append(m.displayElements.popoverContainer), m.displayElements.scrollWindow.append(m.displayElements.popover), m.displayElements.popover.on("mousedown", function (a, b) {
							return b && angular.extend(a, b), a.preventDefault(), !1
						}), m.showPopover = function (a) {
							m.displayElements.popover.css("display", "block"), m.reflowPopover(a), i.addClass(m.displayElements.popover, "in"), C(h.find("body"), "click keyup", function () {
								m.hidePopover()
							})
						}, m.reflowPopover = function (a) {
							m.displayElements.text[0].offsetHeight - 51 > a[0].offsetTop ? (m.displayElements.popover.css("top", a[0].offsetTop + a[0].offsetHeight + m.displayElements.scrollWindow[0].scrollTop + "px"), m.displayElements.popover.removeClass("top").addClass("bottom")) : (m.displayElements.popover.css("top", a[0].offsetTop - 54 + m.displayElements.scrollWindow[0].scrollTop + "px"), m.displayElements.popover.removeClass("bottom").addClass("top"));
							var b = m.displayElements.text[0].offsetWidth - m.displayElements.popover[0].offsetWidth,
								c = a[0].offsetLeft + a[0].offsetWidth / 2 - m.displayElements.popover[0].offsetWidth / 2;
							m.displayElements.popover.css("left", Math.max(0, Math.min(b, c)) + "px"), m.displayElements.popoverArrow.css("margin-left", Math.min(c, Math.max(0, c - b)) - 11 + "px")
						}, m.hidePopover = function () {
							m.displayElements.popover.css("display", ""), m.displayElements.popoverContainer.attr("style", ""), m.displayElements.popoverContainer.attr("class", "popover-content"), m.displayElements.popover.removeClass("in")
						}, m.displayElements.resize.overlay.append(m.displayElements.resize.background), angular.forEach(m.displayElements.resize.anchors, function (a) {
							m.displayElements.resize.overlay.append(a)
						}), m.displayElements.resize.overlay.append(m.displayElements.resize.info), m.displayElements.scrollWindow.append(m.displayElements.resize.overlay), m.reflowResizeOverlay = function (a) {
							a = angular.element(a)[0], m.displayElements.resize.overlay.css({
								display: "block",
								left: a.offsetLeft - 5 + "px",
								top: a.offsetTop - 5 + "px",
								width: a.offsetWidth + 10 + "px",
								height: a.offsetHeight + 10 + "px"
							}), m.displayElements.resize.info.text(a.offsetWidth + " x " + a.offsetHeight)
						}, m.showResizeOverlay = function (a) {
							var b = h.find("body");
							z = function (c) {
								var d = {
									width: parseInt(a.attr("width")),
									height: parseInt(a.attr("height")),
									x: c.clientX,
									y: c.clientY
								};
								(void 0 === d.width || isNaN(d.width)) && (d.width = a[0].offsetWidth), (void 0 === d.height || isNaN(d.height)) && (d.height = a[0].offsetHeight), m.hidePopover();
								var e = d.height / d.width,
									f = function (b) {
										function c(a) {
											return Math.round(Math.max(0, a))
										}
										var f = {
												x: Math.max(0, d.width + (b.clientX - d.x)),
												y: Math.max(0, d.height + (b.clientY - d.y))
											},
											g = void 0 !== o.taResizeForceAspectRatio,
											h = o.taResizeMaintainAspectRatio,
											i = g || h && !b.shiftKey;
										if (i) {
											var j = f.y / f.x;
											f.x = e > j ? f.x : f.y / e, f.y = e > j ? f.x * e : f.y
										}
										var k = angular.element(a);
										k.css("height", c(f.y) + "px"), k.css("width", c(f.x) + "px"), m.reflowResizeOverlay(a)
									};
								b.on("mousemove", f), C(b, "mouseup", function (a) {
									a.preventDefault(), a.stopPropagation(), b.off("mousemove", f), m.$apply(function () {
										m.hidePopover(), m.updateTaBindtaTextElement()
									}, 100)
								}), c.stopPropagation(), c.preventDefault()
							}, m.displayElements.resize.anchors[3].off("mousedown"), m.displayElements.resize.anchors[3].on("mousedown", z), m.reflowResizeOverlay(a), C(b, "click", function () {
								m.hideResizeOverlay()
							})
						}, m.hideResizeOverlay = function () {
							m.displayElements.resize.anchors[3].off("mousedown", z), m.displayElements.resize.overlay.css("display", "")
						}, m.setup.htmlEditorSetup(m.displayElements.html), m.setup.textEditorSetup(m.displayElements.text), m.displayElements.html.attr({
							id: "taHtmlElement" + B,
							"ng-show": "showHtml",
							"ta-bind": "ta-bind",
							"ng-model": "html",
							"ng-model-options": n.attr("ng-model-options")
						}), m.displayElements.text.attr({
							id: "taTextElement" + B,
							contentEditable: "true",
							"ta-bind": "ta-bind",
							"ng-model": "html",
							"ng-model-options": n.attr("ng-model-options")
						}), m.displayElements.scrollWindow.attr({
							"ng-hide": "showHtml"
						}), o.taDefaultWrap && m.displayElements.text.attr("ta-default-wrap", o.taDefaultWrap), o.taUnsafeSanitizer && (m.displayElements.text.attr("ta-unsafe-sanitizer", o.taUnsafeSanitizer), m.displayElements.html.attr("ta-unsafe-sanitizer", o.taUnsafeSanitizer)), m.displayElements.scrollWindow.append(m.displayElements.text), n.append(m.displayElements.scrollWindow), n.append(m.displayElements.html), m.displayElements.forminput.attr("name", m._name), n.append(m.displayElements.forminput), o.tabindex && (n.removeAttr("tabindex"), m.displayElements.text.attr("tabindex", o.tabindex), m.displayElements.html.attr("tabindex", o.tabindex)), o.placeholder && (m.displayElements.text.attr("placeholder", o.placeholder), m.displayElements.html.attr("placeholder", o.placeholder)), o.taDisabled && (m.displayElements.text.attr("ta-readonly", "disabled"), m.displayElements.html.attr("ta-readonly", "disabled"), m.disabled = m.$parent.$eval(o.taDisabled), m.$parent.$watch(o.taDisabled, function (a) {
							m.disabled = a, m.disabled ? n.addClass(m.classes.disabled) : n.removeClass(m.classes.disabled)
						})), o.taPaste && (m._pasteHandler = function (a) {
							return l(o.taPaste)(m.$parent, {
								$html: a
							})
						}, m.displayElements.text.attr("ta-paste", "_pasteHandler($html)")), a(m.displayElements.scrollWindow)(m), a(m.displayElements.html)(m), m.updateTaBindtaTextElement = m["updateTaBindtaTextElement" + B], m.updateTaBindtaHtmlElement = m["updateTaBindtaHtmlElement" + B], n.addClass("ta-root"), m.displayElements.scrollWindow.addClass("ta-text ta-editor " + m.classes.textEditor), m.displayElements.html.addClass("ta-html ta-editor " + m.classes.htmlEditor), m._actionRunning = !1;
						var E = !1;
						if (m.startAction = function () {
								return m._actionRunning = !0, E = g.rangy.saveSelection(),
									function () {
										E && g.rangy.restoreSelection(E)
									}
							}, m.endAction = function () {
								m._actionRunning = !1, E && (m.showHtml ? m.displayElements.html[0].focus() : m.displayElements.text[0].focus(), g.rangy.removeMarkers(E)), E = !1, m.updateSelectedStyles(), m.showHtml || m["updateTaBindtaTextElement" + B]()
							}, u = function () {
								m.focussed = !0, n.addClass(m.classes.focussed), x.focus(), n.triggerHandler("focus")
							}, m.displayElements.html.on("focus", u), m.displayElements.text.on("focus", u), v = function (a) {
								return m._actionRunning || h[0].activeElement === m.displayElements.html[0] || h[0].activeElement === m.displayElements.text[0] || (n.removeClass(m.classes.focussed), x.unfocus(), b(function () {
									m._bUpdateSelectedStyles = !1, n.triggerHandler("blur"), m.focussed = !1
								}, 0)), a.preventDefault(), !1
							}, m.displayElements.html.on("blur", v), m.displayElements.text.on("blur", v), m.displayElements.text.on("paste", function (a) {
								n.triggerHandler("paste", a)
							}), m.queryFormatBlockState = function (a) {
								return !m.showHtml && a.toLowerCase() === h[0].queryCommandValue("formatBlock").toLowerCase()
							}, m.queryCommandState = function (a) {
								return m.showHtml ? "" : h[0].queryCommandState(a)
							}, m.switchView = function () {
								m.showHtml = !m.showHtml, i.enabled(!1, m.displayElements.html), i.enabled(!1, m.displayElements.text), m.showHtml ? b(function () {
									return i.enabled(!0, m.displayElements.html), i.enabled(!0, m.displayElements.text), m.displayElements.html[0].focus()
								}, 100) : b(function () {
									return i.enabled(!0, m.displayElements.html), i.enabled(!0, m.displayElements.text), m.displayElements.text[0].focus()
								}, 100)
							}, o.ngModel) {
							var F = !0;
							p.$render = function () {
								if (F) {
									F = !1;
									var a = m.$parent.$eval(o.ngModel);
									void 0 !== a && null !== a || !w || "" === w || p.$setViewValue(w)
								}
								m.displayElements.forminput.val(p.$viewValue), m.html = p.$viewValue || ""
							}, n.attr("required") && (p.$validators.required = function (a, b) {
								var c = a || b;
								return !(!c || "" === c.trim())
							})
						} else m.displayElements.forminput.val(w), m.html = w;
						if (m.$watch("html", function (a, b) {
								a !== b && (o.ngModel && p.$viewValue !== a && p.$setViewValue(a), m.displayElements.forminput.val(a))
							}), o.taTargetToolbars) x = f.registerEditor(m._name, m, o.taTargetToolbars.split(","));
						else {
							var G = angular.element('<div text-angular-toolbar name="textAngularToolbar' + B + '">');
							o.taToolbar && G.attr("ta-toolbar", o.taToolbar), o.taToolbarClass && G.attr("ta-toolbar-class", o.taToolbarClass), o.taToolbarGroupClass && G.attr("ta-toolbar-group-class", o.taToolbarGroupClass), o.taToolbarButtonClass && G.attr("ta-toolbar-button-class", o.taToolbarButtonClass), o.taToolbarActiveButtonClass && G.attr("ta-toolbar-active-button-class", o.taToolbarActiveButtonClass), o.taFocussedClass && G.attr("ta-focussed-class", o.taFocussedClass), n.prepend(G), a(G)(m.$parent), x = f.registerEditor(m._name, m, ["textAngularToolbar" + B])
						}
						m.$on("$destroy", function () {
							f.unregisterEditor(m._name), angular.element(window).off("blur")
						}), m.$on("ta-element-select", function (a, b) {
							x.triggerElementSelect(a, b) && m["reApplyOnSelectorHandlerstaTextElement" + B]()
						}), m.$on("ta-drop-event", function (a, c, d, e) {
							m.displayElements.text[0].focus(), e && e.files && e.files.length > 0 ? (angular.forEach(e.files, function (a) {
								try {
									k.when(m.fileDropHandler(a, m.wrapSelection) || m.fileDropHandler !== m.defaultFileDropHandler && k.when(m.defaultFileDropHandler(a, m.wrapSelection))).then(function () {
										m["updateTaBindtaTextElement" + B]()
									})
								} catch (b) {
									j.error(b)
								}
							}), d.preventDefault(), d.stopPropagation()) : b(function () {
								m["updateTaBindtaTextElement" + B]()
							}, 0)
						}), m._bUpdateSelectedStyles = !1, angular.element(window).on("blur", function () {
							m._bUpdateSelectedStyles = !1, m.focussed = !1
						}), m.updateSelectedStyles = function () {
							var a;
							A && b.cancel(A), void 0 !== (a = d.getSelectionElement()) && a.parentNode !== m.displayElements.text[0] ? x.updateSelectedStyles(angular.element(a)) : x.updateSelectedStyles(), m._bUpdateSelectedStyles && (A = b(m.updateSelectedStyles, 200))
						}, q = function () {
							return m.focussed ? void(m._bUpdateSelectedStyles || (m._bUpdateSelectedStyles = !0, m.$apply(function () {
								m.updateSelectedStyles()
							}))) : void(m._bUpdateSelectedStyles = !1)
						}, m.displayElements.html.on("keydown", q), m.displayElements.text.on("keydown", q), r = function () {
							m._bUpdateSelectedStyles = !1
						}, m.displayElements.html.on("keyup", r), m.displayElements.text.on("keyup", r), s = function (a, b) {
							b && angular.extend(a, b), m.$apply(function () {
								return x.sendKeyCommand(a) ? (m._bUpdateSelectedStyles || m.updateSelectedStyles(), a.preventDefault(), !1) : void 0
							})
						}, m.displayElements.html.on("keypress", s), m.displayElements.text.on("keypress", s), t = function () {
							m._bUpdateSelectedStyles = !1, m.$apply(function () {
								m.updateSelectedStyles()
							})
						}, m.displayElements.html.on("mouseup", t), m.displayElements.text.on("mouseup", t)
					}
				}
			}]), q.service("textAngularManager", ["taToolExecuteAction", "taTools", "taRegisterTool", function (a, b, c) {
				var d = {},
					e = {};
				return {
					registerEditor: function (c, f, g) {
						if (!c || "" === c) throw "textAngular Error: An editor requires a name";
						if (!f) throw "textAngular Error: An editor requires a scope";
						if (e[c]) throw 'textAngular Error: An Editor with name "' + c + '" already exists';
						var h = [];
						return angular.forEach(g, function (a) {
							d[a] && h.push(d[a])
						}), e[c] = {
							scope: f,
							toolbars: g,
							_registerToolbar: function (a) {
								this.toolbars.indexOf(a.name) >= 0 && h.push(a)
							},
							editorFunctions: {
								disable: function () {
									angular.forEach(h, function (a) {
										a.disabled = !0
									})
								},
								enable: function () {
									angular.forEach(h, function (a) {
										a.disabled = !1
									})
								},
								focus: function () {
									angular.forEach(h, function (a) {
										a._parent = f, a.disabled = !1, a.focussed = !0, f.focussed = !0
									})
								},
								unfocus: function () {
									angular.forEach(h, function (a) {
										a.disabled = !0, a.focussed = !1
									}), f.focussed = !1
								},
								updateSelectedStyles: function (a) {
									angular.forEach(h, function (b) {
										angular.forEach(b.tools, function (c) {
											c.activeState && (b._parent = f, c.active = c.activeState(a))
										})
									})
								},
								sendKeyCommand: function (c) {
									var d = !1;
									return (c.ctrlKey || c.metaKey || c.specialKey) && angular.forEach(b, function (b, e) {
										if (b.commandKeyCode && (b.commandKeyCode === c.which || b.commandKeyCode === c.specialKey))
											for (var g = 0; g < h.length; g++)
												if (void 0 !== h[g].tools[e]) {
													a.call(h[g].tools[e], f), d = !0;
													break
												}
									}), d
								},
								triggerElementSelect: function (a, c) {
									var d = function (a, b) {
											for (var c = !0, d = 0; d < b.length; d++) c = c && a.attr(b[d]);
											return c
										},
										e = [],
										g = {},
										i = !1;
									c = angular.element(c);
									var j = !1;
									if (angular.forEach(b, function (a, b) {
											a.onElementSelect && a.onElementSelect.element && a.onElementSelect.element.toLowerCase() === c[0].tagName.toLowerCase() && (!a.onElementSelect.filter || a.onElementSelect.filter(c)) && (j = j || angular.isArray(a.onElementSelect.onlyWithAttrs) && d(c, a.onElementSelect.onlyWithAttrs), (!a.onElementSelect.onlyWithAttrs || d(c, a.onElementSelect.onlyWithAttrs)) && (g[b] = a))
										}), j ? (angular.forEach(g, function (a, b) {
											a.onElementSelect.onlyWithAttrs && d(c, a.onElementSelect.onlyWithAttrs) && e.push({
												name: b,
												tool: a
											})
										}), e.sort(function (a, b) {
											return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length
										})) : angular.forEach(g, function (a, b) {
											e.push({
												name: b,
												tool: a
											})
										}), e.length > 0)
										for (var k = 0; k < e.length; k++) {
											for (var l = e[k].tool, m = e[k].name, n = 0; n < h.length; n++)
												if (void 0 !== h[n].tools[m]) {
													l.onElementSelect.action.call(h[n].tools[m], a, c, f), i = !0;
													break
												}
											if (i) break
										}
									return i
								}
							}
						}, e[c].editorFunctions
					},
					retrieveEditor: function (a) {
						return e[a]
					},
					unregisterEditor: function (a) {
						delete e[a]
					},
					registerToolbar: function (a) {
						if (!a) throw "textAngular Error: A toolbar requires a scope";
						if (!a.name || "" === a.name) throw "textAngular Error: A toolbar requires a name";
						if (d[a.name]) throw 'textAngular Error: A toolbar with name "' + a.name + '" already exists';
						d[a.name] = a, angular.forEach(e, function (b) {
							b._registerToolbar(a)
						})
					},
					retrieveToolbar: function (a) {
						return d[a]
					},
					retrieveToolbarsViaEditor: function (a) {
						var b = [],
							c = this;
						return angular.forEach(this.retrieveEditor(a).toolbars, function (a) {
							b.push(c.retrieveToolbar(a))
						}), b
					},
					unregisterToolbar: function (a) {
						delete d[a]
					},
					updateToolsDisplay: function (a) {
						var b = this;
						angular.forEach(a, function (a, c) {
							b.updateToolDisplay(c, a)
						})
					},
					resetToolsDisplay: function () {
						var a = this;
						angular.forEach(b, function (b, c) {
							a.resetToolDisplay(c)
						})
					},
					updateToolDisplay: function (a, b) {
						var c = this;
						angular.forEach(d, function (d, e) {
							c.updateToolbarToolDisplay(e, a, b)
						})
					},
					resetToolDisplay: function (a) {
						var b = this;
						angular.forEach(d, function (c, d) {
							b.resetToolbarToolDisplay(d, a)
						})
					},
					updateToolbarToolDisplay: function (a, b, c) {
						if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
						d[a].updateToolDisplay(b, c)
					},
					resetToolbarToolDisplay: function (a, c) {
						if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
						d[a].updateToolDisplay(c, b[c], !0)
					},
					removeTool: function (a) {
						delete b[a], angular.forEach(d, function (b) {
							delete b.tools[a];
							for (var c = 0; c < b.toolbar.length; c++) {
								for (var d, e = 0; e < b.toolbar[c].length; e++) {
									if (b.toolbar[c][e] === a) {
										d = {
											group: c,
											index: e
										};
										break
									}
									if (void 0 !== d) break
								}
								void 0 !== d && (b.toolbar[d.group].slice(d.index, 1), b._$element.children().eq(d.group).children().eq(d.index).remove())
							}
						})
					},
					addTool: function (a, b, e, f) {
						c(a, b), angular.forEach(d, function (c) {
							c.addTool(a, b, e, f)
						})
					},
					addToolToToolbar: function (a, b, e, f, g) {
						c(a, b), d[e].addTool(a, b, f, g)
					},
					refreshEditor: function (a) {
						if (!e[a]) throw 'textAngular Error: No Editor with name "' + a + '" exists';
						e[a].scope.updateTaBindtaTextElement(), e[a].scope.$$phase || e[a].scope.$digest()
					},
					sendKeyCommand: function (a, b) {
						var c = e[a._name];
						return c && c.editorFunctions.sendKeyCommand(b) ? (a._bUpdateSelectedStyles || a.updateSelectedStyles(), b.preventDefault(), !1) : void 0
					}
				}
			}]), q.directive("textAngularToolbar", ["$compile", "textAngularManager", "taOptions", "taTools", "taToolExecuteAction", "$window", function (a, b, c, d, e, f) {
				return {
					scope: {
						name: "@"
					},
					restrict: "EA",
					link: function (g, h, i) {
						if (!g.name || "" === g.name) throw "textAngular Error: A toolbar requires a name";
						angular.extend(g, angular.copy(c)), i.taToolbar && (g.toolbar = g.$parent.$eval(i.taToolbar)), i.taToolbarClass && (g.classes.toolbar = i.taToolbarClass), i.taToolbarGroupClass && (g.classes.toolbarGroup = i.taToolbarGroupClass), i.taToolbarButtonClass && (g.classes.toolbarButton = i.taToolbarButtonClass), i.taToolbarActiveButtonClass && (g.classes.toolbarButtonActive = i.taToolbarActiveButtonClass), i.taFocussedClass && (g.classes.focussed = i.taFocussedClass), g.disabled = !0, g.focussed = !1, g._$element = h, h[0].innerHTML = "", h.addClass("ta-toolbar " + g.classes.toolbar), g.$watch("focussed", function () {
							g.focussed ? h.addClass(g.classes.focussed) : h.removeClass(g.classes.focussed)
						});
						var j = function (b, c) {
							var d;
							if (d = b && b.display ? angular.element(b.display) : angular.element("<button type='button'>"), b && b["class"] ? d.addClass(b["class"]) : d.addClass(g.classes.toolbarButton), d.attr("name", c.name), d.attr("ta-button", "ta-button"), d.attr("ng-disabled", "isDisabled()"), d.attr("tabindex", "-1"), d.attr("ng-click", "executeAction()"), d.attr("ng-class", "displayActiveToolClass(active)"), b && b.tooltiptext && d.attr("title", b.tooltiptext), b && !b.display && !c._display && (d[0].innerHTML = "", b.buttontext && (d[0].innerHTML = b.buttontext), b.iconclass)) {
								var e = angular.element("<i>"),
									f = d[0].innerHTML;
								e.addClass(b.iconclass), d[0].innerHTML = "", d.append(e), f && "" !== f && d.append("&nbsp;" + f)
							}
							return c._lastToolDefinition = angular.copy(b), a(d)(c)
						};
						g.tools = {}, g._parent = {
							disabled: !0,
							showHtml: !1,
							queryFormatBlockState: function () {
								return !1
							},
							queryCommandState: function () {
								return !1
							}
						};
						var k = {
							$window: f,
							$editor: function () {
								return g._parent
							},
							isDisabled: function () {
								return "function" != typeof this.$eval("disabled") && this.$eval("disabled") || this.$eval("disabled()") || "html" !== this.name && this.$editor().showHtml || this.$parent.disabled || this.$editor().disabled
							},
							displayActiveToolClass: function (a) {
								return a ? g.classes.toolbarButtonActive : ""
							},
							executeAction: e
						};
						angular.forEach(g.toolbar, function (a) {
							var b = angular.element("<div>");
							b.addClass(g.classes.toolbarGroup), angular.forEach(a, function (a) {
								g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
									name: a
								}), g.tools[a].$element = j(d[a], g.tools[a]), b.append(g.tools[a].$element)
							}), h.append(b)
						}), g.updateToolDisplay = function (a, b, c) {
							var d = g.tools[a];
							if (d) {
								if (d._lastToolDefinition && !c && (b = angular.extend({}, d._lastToolDefinition, b)), null === b.buttontext && null === b.iconclass && null === b.display) throw 'textAngular Error: Tool Definition for updating "' + a + '" does not have a valid display/iconclass/buttontext value';
								null === b.buttontext && delete b.buttontext, null === b.iconclass && delete b.iconclass, null === b.display && delete b.display;
								var e = j(b, d);
								d.$element.replaceWith(e), d.$element = e
							}
						}, g.addTool = function (a, b, c, e) {
							g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
								name: a
							}), g.tools[a].$element = j(d[a], g.tools[a]);
							var f;
							void 0 === c && (c = g.toolbar.length - 1), f = angular.element(h.children()[c]), void 0 === e ? (f.append(g.tools[a].$element), g.toolbar[c][g.toolbar[c].length - 1] = a) : (f.children().eq(e).after(g.tools[a].$element), g.toolbar[c][e] = a)
						}, b.registerToolbar(g), g.$on("$destroy", function () {
							b.unregisterToolbar(g.name)
						})
					}
				}
			}]) , q.directive('taWidthPr', ['$window', '$timeout', function($window, $timeout){
				return {
					restrict: 'A',
					link: function(scope, el, attr){
						var width = parseInt(attr.taWidthPr),
								call = function(){
									el.hide().css({
										width: (el.parent().eq(0).width()/100*width)+'px'
									}).show();
								}
						$timeout(function(){
							call()
						});
						angular.element($window).bind('resize', call);
					}
				}
			}])
		}()
}({}, function () {
	return this
}());