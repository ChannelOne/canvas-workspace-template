/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var View = __webpack_require__(1);
	new View.CanvasView("main-canvas");
	var Controller = (function () {
	    function Controller() {
	        var panelField = document.getElementById("panel-field");
	        this._panel = new View.PanelView();
	        this._panel.appendTo(panelField);
	    }
	    return Controller;
	}());
	new Controller();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var viewCanvas_1 = __webpack_require__(2);
	exports.CanvasView = viewCanvas_1.CanvasView;
	var viewPanel_1 = __webpack_require__(8);
	exports.PanelView = viewPanel_1.PanelView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var util_1 = __webpack_require__(3);
	var camera_1 = __webpack_require__(5);
	var fabric = __webpack_require__(7);
	var counter = 0;
	var CanvasView = (function (_super) {
	    __extends(CanvasView, _super);
	    function CanvasView(painterId, classStr) {
	        if (classStr === void 0) { classStr = ""; }
	        var _this = _super.call(this, "div", classStr) || this;
	        _this._mouseStartPos = null;
	        _this._startCameraPos = null;
	        var winWidth = window.innerWidth, winHeight = window.innerHeight;
	        _this._viewportSize = {
	            x: winWidth,
	            y: winHeight,
	        };
	        _this._camera = new camera_1.Camera();
	        _this._center = {
	            x: 0,
	            y: 0,
	        };
	        _this._canvasElemId = painterId + "_" + counter++;
	        _this._canvasElem = util_1.DomHelper.Generic.elem("canvas");
	        _this._canvasElem.setAttribute("id", _this._canvasElemId);
	        _this._canvasElem.width = winWidth;
	        _this._canvasElem.height = winHeight;
	        _this._parent = document.getElementById(painterId);
	        _this._parent.appendChild(_this._canvasElem);
	        document.getElementById("test-scroll").addEventListener("scroll", function (e) {
	            _this.handleScroll(e);
	        });
	        window.addEventListener("scroll", function (e) {
	            _this.handleScroll(e);
	        });
	        _this._parent.addEventListener("click", function (e) {
	            _this.handleClick(e);
	        });
	        _this._parent.addEventListener("scroll", function (e) {
	            _this.handleScroll(e);
	        });
	        _this._parent.addEventListener("contextmenu", function (e) {
	            e.preventDefault();
	        });
	        _this._parent.addEventListener("mousedown", function (e) {
	            _this.handleMouseDown(e);
	        });
	        _this._parent.addEventListener("mouseup", function (e) {
	            _this.handleMouseUp(e);
	        });
	        _this._parent.addEventListener("mousemove", function (e) {
	            _this.handleMouseMove(e);
	        });
	        _this._fabricCanvas = new fabric.Canvas(_this._canvasElemId, {
	            selection: false
	        });
	        _this.drawBackground();
	        return _this;
	    }
	    CanvasView.prototype.render = function () {
	        var matrix = this._camera.getTransformMatrix().slice();
	        matrix[4] += this._viewportSize.x / 2;
	        matrix[5] += this._viewportSize.y / 2;
	        this._fabricCanvas.viewportTransform = matrix;
	        this._fabricCanvas.renderAll();
	    };
	    CanvasView.prototype.handleScroll = function (e) {
	        var height = window.scrollY;
	        this._camera.scale = height * 0.0005 + 1;
	        this.render();
	    };
	    CanvasView.prototype.handleClick = function (e) {
	        var newRect = new fabric.Rect({
	            top: 0,
	            left: 0,
	            width: 100,
	            height: 100,
	            fill: "blue"
	        });
	        this._fabricCanvas.add(newRect);
	    };
	    CanvasView.prototype.handleMouseDown = function (e) {
	        // left button
	        if (e.which === 3) {
	            e.preventDefault();
	            this._mouseStartPos = {
	                x: e.screenX,
	                y: e.screenY,
	            };
	            this._startCameraPos = {
	                x: this._camera.position.x,
	                y: this._camera.position.y,
	            };
	        }
	    };
	    CanvasView.prototype.handleMouseUp = function (e) {
	        // left button
	        if (e.which === 3) {
	            e.preventDefault();
	            this._mouseStartPos = null;
	        }
	    };
	    CanvasView.prototype.handleMouseMove = function (e) {
	        if (this._mouseStartPos !== null) {
	            var vector = {
	                x: e.screenX - this._mouseStartPos.x,
	                y: e.screenY - this._mouseStartPos.y,
	            };
	            this._camera.position = {
	                x: this._startCameraPos.x + vector.x,
	                y: this._startCameraPos.y + vector.y,
	            };
	            this.render();
	        }
	    };
	    CanvasView.prototype.drawBackground = function () {
	        var centerCircle = new fabric.Circle({
	            left: this._center.x - 8,
	            top: this._center.y - 8,
	            radius: 16,
	            fill: "red",
	            evented: false,
	            hasControls: false,
	            hasBorders: false,
	        });
	        this._fabricCanvas.add(centerCircle);
	        this.render();
	    };
	    Object.defineProperty(CanvasView.prototype, "transformMatrix", {
	        get: function () {
	            return this._transformMatrix;
	        },
	        set: function (v) {
	            this._transformMatrix = v;
	            this._fabricCanvas.viewportTransform = v;
	            this._fabricCanvas.renderAll();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CanvasView;
	}(util_1.DomHelper.FixedElement));
	exports.CanvasView = CanvasView;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dom_1 = __webpack_require__(4);
	exports.DomHelper = dom_1.DomHelper;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var DomHelper;
	(function (DomHelper) {
	    function elem(elemName, className, props) {
	        var _elm = document.createElement(elemName);
	        if (className)
	            _elm.setAttribute("class", className);
	        if (props && typeof props === "object") {
	            for (var key in props) {
	                _elm.setAttribute(key, props[key]);
	            }
	        }
	        return _elm;
	    }
	    DomHelper.elem = elem;
	    function isIDOMWrapper(object) {
	        return (typeof object === "object")
	            && (object.element && object.addEventListener && object.appendTo)
	            && (typeof object.element === "function"
	                && typeof object.addEventListener === "function"
	                && typeof object.appendTo === "function");
	    }
	    DomHelper.isIDOMWrapper = isIDOMWrapper;
	    var AppendableDomWrapper = (function () {
	        function AppendableDomWrapper(elemName, className, props) {
	            this._dom = elem(elemName, className, props);
	        }
	        AppendableDomWrapper.prototype.element = function () {
	            return this._dom;
	        };
	        AppendableDomWrapper.prototype.appendTo = function (elem) {
	            elem.appendChild(this._dom);
	        };
	        AppendableDomWrapper.prototype.on = function (name, _fun) {
	            this._dom.addEventListener(name, _fun, false);
	        };
	        AppendableDomWrapper.prototype.addEventListener = function (name, _fun, useCapture) {
	            this._dom.addEventListener(name, _fun, useCapture);
	        };
	        AppendableDomWrapper.prototype.removeEventListener = function (name, _fun, useCapture) {
	            this._dom.removeEventListener(name, _fun, useCapture);
	        };
	        AppendableDomWrapper.prototype.remove = function () {
	            this._dom.remove();
	        };
	        return AppendableDomWrapper;
	    }());
	    DomHelper.AppendableDomWrapper = AppendableDomWrapper;
	    var ResizableElement = (function (_super) {
	        __extends(ResizableElement, _super);
	        function ResizableElement() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._width = -1;
	            _this._height = -1;
	            return _this;
	        }
	        Object.defineProperty(ResizableElement.prototype, "width", {
	            get: function () {
	                return this._width;
	            },
	            set: function (v) {
	                if (this._width !== v) {
	                    this._width = v;
	                    if (v < 0)
	                        this._dom.style.width = "";
	                    else
	                        this._dom.style.width = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ResizableElement.prototype, "height", {
	            get: function () {
	                return this._height;
	            },
	            set: function (v) {
	                if (this._height !== v) {
	                    this._height = v;
	                    if (v < 0)
	                        this._dom.style.height = "";
	                    else
	                        this._dom.style.height = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        return ResizableElement;
	    }(AppendableDomWrapper));
	    DomHelper.ResizableElement = ResizableElement;
	    var PositionElement = (function (_super) {
	        __extends(PositionElement, _super);
	        function PositionElement() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._left = -1;
	            _this._right = -1;
	            _this._top = -1;
	            _this._bottom = -1;
	            _this._margin = -1;
	            _this._marginLeft = -1;
	            _this._marginRight = -1;
	            _this._marginTop = -1;
	            _this._marginBottom = -1;
	            return _this;
	        }
	        Object.defineProperty(PositionElement.prototype, "left", {
	            get: function () {
	                return this._left;
	            },
	            set: function (v) {
	                if (this._left !== v) {
	                    this._left = v;
	                    if (v < 0)
	                        this._dom.style.left = "";
	                    else
	                        this._dom.style.left = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PositionElement.prototype, "right", {
	            get: function () {
	                return this._right;
	            },
	            set: function (v) {
	                if (this._right !== v) {
	                    this._right = v;
	                    if (v < 0)
	                        this._dom.style.right = "";
	                    else
	                        this._dom.style.right = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PositionElement.prototype, "top", {
	            get: function () {
	                return this._top;
	            },
	            set: function (v) {
	                if (this._top !== v) {
	                    this._top = v;
	                    if (v < 0)
	                        this._dom.style.top = "";
	                    else
	                        this._dom.style.top = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PositionElement.prototype, "bottom", {
	            get: function () {
	                return this._bottom;
	            },
	            set: function (v) {
	                if (this._bottom !== v) {
	                    this._bottom = v;
	                    if (v < 0)
	                        this._dom.style.bottom = "";
	                    else
	                        this._dom.style.bottom = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PositionElement.prototype, "margin", {
	            get: function () {
	                return this._margin;
	            },
	            set: function (v) {
	                if (this._margin !== v) {
	                    this._margin = v;
	                    if (v < 0)
	                        this._dom.style.margin = "";
	                    else
	                        this._dom.style.margin = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PositionElement.prototype, "marginLeft", {
	            get: function () {
	                return this._marginLeft;
	            },
	            set: function (v) {
	                if (this._marginLeft !== v) {
	                    this._marginLeft = v;
	                    if (v < 0)
	                        this._dom.style.marginLeft = "";
	                    else
	                        this._dom.style.marginLeft = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PositionElement.prototype, "marginRight", {
	            get: function () {
	                return this._marginRight;
	            },
	            set: function (v) {
	                if (this._marginRight !== v) {
	                    this._marginRight = v;
	                    if (v < 0)
	                        this._dom.style.marginRight = "";
	                    else
	                        this._dom.style.marginRight = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PositionElement.prototype, "marginTop", {
	            get: function () {
	                return this._marginTop;
	            },
	            set: function (v) {
	                if (this._marginTop !== v) {
	                    this._marginTop = v;
	                    if (v < 0)
	                        this._dom.style.marginTop = "";
	                    else
	                        this._dom.style.marginTop = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PositionElement.prototype, "marginBottom", {
	            get: function () {
	                return this._marginBottom;
	            },
	            set: function (v) {
	                if (this._marginBottom !== v) {
	                    this._marginBottom = v;
	                    if (v < 0)
	                        this._dom.style.marginBottom = "";
	                    else
	                        this._dom.style.marginBottom = v + "px";
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        return PositionElement;
	    }(ResizableElement));
	    var FixedElement = (function (_super) {
	        __extends(FixedElement, _super);
	        function FixedElement(elemName, className, props) {
	            var _this = _super.call(this, elemName, className, props) || this;
	            _this._dom.style.position = "fixed";
	            return _this;
	        }
	        return FixedElement;
	    }(PositionElement));
	    DomHelper.FixedElement = FixedElement;
	    var AbsoluteElement = (function (_super) {
	        __extends(AbsoluteElement, _super);
	        function AbsoluteElement(elemName, className, props) {
	            var _this = _super.call(this, elemName, className, props) || this;
	            _this._dom.style.position = "absolute";
	            return _this;
	        }
	        return AbsoluteElement;
	    }(PositionElement));
	    DomHelper.AbsoluteElement = AbsoluteElement;
	    var Generic;
	    (function (Generic) {
	        function elem(elemName, className, props) {
	            var _elm = document.createElement(elemName);
	            if (className)
	                _elm.setAttribute("class", className);
	            if (props && typeof props === "object") {
	                for (var key in props) {
	                    _elm.setAttribute(key, props[key]);
	                }
	            }
	            return _elm;
	        }
	        Generic.elem = elem;
	        function isIDOMWrapper(object) {
	            return (typeof object === "object")
	                && (object.element && object.addEventListener && object.appendTo)
	                && (typeof object.element === "function"
	                    && typeof object.addEventListener === "function"
	                    && typeof object.appendTo === "function");
	        }
	        Generic.isIDOMWrapper = isIDOMWrapper;
	        var AppendableDomWrapper = (function () {
	            function AppendableDomWrapper(elemName, className, props) {
	                this._dom = elem(elemName, className, props);
	            }
	            AppendableDomWrapper.prototype.element = function () {
	                return this._dom;
	            };
	            AppendableDomWrapper.prototype.appendTo = function (elem) {
	                elem.appendChild(this._dom);
	            };
	            AppendableDomWrapper.prototype.on = function (name, _fun) {
	                this._dom.addEventListener(name, _fun, false);
	            };
	            AppendableDomWrapper.prototype.addEventListener = function (name, _fun, useCapture) {
	                this._dom.addEventListener(name, _fun, useCapture);
	            };
	            AppendableDomWrapper.prototype.removeEventListener = function (name, _fun, useCapture) {
	                this._dom.removeEventListener(name, _fun, useCapture);
	            };
	            AppendableDomWrapper.prototype.remove = function () {
	                this._dom.remove();
	            };
	            return AppendableDomWrapper;
	        }());
	        Generic.AppendableDomWrapper = AppendableDomWrapper;
	        var ResizableElement = (function (_super) {
	            __extends(ResizableElement, _super);
	            function ResizableElement() {
	                var _this = _super !== null && _super.apply(this, arguments) || this;
	                _this._width = -1;
	                _this._height = -1;
	                return _this;
	            }
	            Object.defineProperty(ResizableElement.prototype, "width", {
	                get: function () {
	                    return this._width;
	                },
	                set: function (v) {
	                    if (this._width !== v) {
	                        this._width = v;
	                        if (v < 0)
	                            this._dom.style.width = "";
	                        else
	                            this._dom.style.width = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(ResizableElement.prototype, "height", {
	                get: function () {
	                    return this._height;
	                },
	                set: function (v) {
	                    if (this._height !== v) {
	                        this._height = v;
	                        if (v < 0)
	                            this._dom.style.height = "";
	                        else
	                            this._dom.style.height = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            return ResizableElement;
	        }(AppendableDomWrapper));
	        Generic.ResizableElement = ResizableElement;
	        var PositionElement = (function (_super) {
	            __extends(PositionElement, _super);
	            function PositionElement() {
	                var _this = _super !== null && _super.apply(this, arguments) || this;
	                _this._left = -1;
	                _this._right = -1;
	                _this._top = -1;
	                _this._bottom = -1;
	                _this._margin = -1;
	                _this._marginLeft = -1;
	                _this._marginRight = -1;
	                _this._marginTop = -1;
	                _this._marginBottom = -1;
	                return _this;
	            }
	            Object.defineProperty(PositionElement.prototype, "left", {
	                get: function () {
	                    return this._left;
	                },
	                set: function (v) {
	                    if (this._left !== v) {
	                        this._left = v;
	                        if (v < 0)
	                            this._dom.style.left = "";
	                        else
	                            this._dom.style.left = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(PositionElement.prototype, "right", {
	                get: function () {
	                    return this._right;
	                },
	                set: function (v) {
	                    if (this._right !== v) {
	                        this._right = v;
	                        if (v < 0)
	                            this._dom.style.right = "";
	                        else
	                            this._dom.style.right = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(PositionElement.prototype, "top", {
	                get: function () {
	                    return this._top;
	                },
	                set: function (v) {
	                    if (this._top !== v) {
	                        this._top = v;
	                        if (v < 0)
	                            this._dom.style.top = "";
	                        else
	                            this._dom.style.top = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(PositionElement.prototype, "bottom", {
	                get: function () {
	                    return this._bottom;
	                },
	                set: function (v) {
	                    if (this._bottom !== v) {
	                        this._bottom = v;
	                        if (v < 0)
	                            this._dom.style.bottom = "";
	                        else
	                            this._dom.style.bottom = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(PositionElement.prototype, "margin", {
	                get: function () {
	                    return this._margin;
	                },
	                set: function (v) {
	                    if (this._margin !== v) {
	                        this._margin = v;
	                        if (v < 0)
	                            this._dom.style.margin = "";
	                        else
	                            this._dom.style.margin = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(PositionElement.prototype, "marginLeft", {
	                get: function () {
	                    return this._marginLeft;
	                },
	                set: function (v) {
	                    if (this._marginLeft !== v) {
	                        this._marginLeft = v;
	                        if (v < 0)
	                            this._dom.style.marginLeft = "";
	                        else
	                            this._dom.style.marginLeft = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(PositionElement.prototype, "marginRight", {
	                get: function () {
	                    return this._marginRight;
	                },
	                set: function (v) {
	                    if (this._marginRight !== v) {
	                        this._marginRight = v;
	                        if (v < 0)
	                            this._dom.style.marginRight = "";
	                        else
	                            this._dom.style.marginRight = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(PositionElement.prototype, "marginTop", {
	                get: function () {
	                    return this._marginTop;
	                },
	                set: function (v) {
	                    if (this._marginTop !== v) {
	                        this._marginTop = v;
	                        if (v < 0)
	                            this._dom.style.marginTop = "";
	                        else
	                            this._dom.style.marginTop = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            Object.defineProperty(PositionElement.prototype, "marginBottom", {
	                get: function () {
	                    return this._marginBottom;
	                },
	                set: function (v) {
	                    if (this._marginBottom !== v) {
	                        this._marginBottom = v;
	                        if (v < 0)
	                            this._dom.style.marginBottom = "";
	                        else
	                            this._dom.style.marginBottom = v + "px";
	                    }
	                },
	                enumerable: true,
	                configurable: true
	            });
	            return PositionElement;
	        }(ResizableElement));
	        var FixedElement = (function (_super) {
	            __extends(FixedElement, _super);
	            function FixedElement(elemName, className, props) {
	                var _this = _super.call(this, elemName, className, props) || this;
	                _this._dom.style.position = "fixed";
	                return _this;
	            }
	            return FixedElement;
	        }(PositionElement));
	        Generic.FixedElement = FixedElement;
	        var AbsoluteElement = (function (_super) {
	            __extends(AbsoluteElement, _super);
	            function AbsoluteElement(elemName, className, props) {
	                var _this = _super.call(this, elemName, className, props) || this;
	                _this._dom.style.position = "absolute";
	                return _this;
	            }
	            return AbsoluteElement;
	        }(PositionElement));
	        Generic.AbsoluteElement = AbsoluteElement;
	    })(Generic = DomHelper.Generic || (DomHelper.Generic = {}));
	})(DomHelper = exports.DomHelper || (exports.DomHelper = {}));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var camera_1 = __webpack_require__(6);
	exports.Camera = camera_1.Camera;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var Camera = (function () {
	    function Camera() {
	        this._position = {
	            x: 0, y: 0
	        };
	        this._scale = 1;
	    }
	    Camera.prototype.reset = function () {
	        this._position = { x: 0, y: 0 };
	        this._scale = 1;
	    };
	    Camera.prototype.getTransformMatrix = function () {
	        return [this._scale, 0, 0, this._scale, this._position.x, this._position.y];
	    };
	    Object.defineProperty(Camera.prototype, "position", {
	        get: function () {
	            return this._position;
	        },
	        set: function (pos) {
	            this._position = pos;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Camera.prototype, "scale", {
	        get: function () {
	            return this._scale;
	        },
	        set: function (v) {
	            this._scale = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Camera;
	}());
	exports.Camera = Camera;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = fabric;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var util_1 = __webpack_require__(3);
	var PanelView = (function (_super) {
	    __extends(PanelView, _super);
	    function PanelView() {
	        var _this = _super.call(this, "div") || this;
	        _this.left = 0;
	        _this.top = 0;
	        _this.width = 230;
	        _this.height = window.innerHeight;
	        window.addEventListener("resize", function (e) {
	            _this.height = window.innerHeight;
	        });
	        _this._container = util_1.DomHelper.Generic.elem("div");
	        _this._dom.appendChild(_this._container);
	        _this._subpanels = [];
	        return _this;
	    }
	    PanelView.prototype.addPanel = function (subPanel) {
	        this._subpanels.push(subPanel);
	        subPanel.appendTo(this._container);
	    };
	    return PanelView;
	}(util_1.DomHelper.FixedElement));
	exports.PanelView = PanelView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map