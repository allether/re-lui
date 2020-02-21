module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./components/index.coffee");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/AlertDot.coffee":
/*!************************************!*\
  !*** ./components/AlertDot.coffee ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AlertDot, StyleContext, cn, css;

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

cn = __webpack_require__(/*! classnames */ "classnames");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

AlertDot = class AlertDot extends Component {
  render() {
    var alert_style;
    alert_style = Object.assign({}, this.props.style);
    if (this.props.color) {
      alert_style.background = this.props.color;
    } else if (this.props.error) {
      alert_style.background = this.context.secondary.error;
    } else {
      alert_style.background = this.context.secondary.highlight;
    }
    return h('div', {
      className: css['alert-dot'],
      ref: (dot) => {
        return this.base = dot;
      },
      style: alert_style
    });
  }

};

AlertDot.contextType = StyleContext;

module.exports = AlertDot;


/***/ }),

/***/ "./components/AlertOverlay.coffee":
/*!****************************************!*\
  !*** ./components/AlertOverlay.coffee ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AlertOverlay, Overlay, Slide, StyleContext, cn, css;

Overlay = __webpack_require__(/*! ./Overlay.coffee */ "./components/Overlay.coffee");

Slide = __webpack_require__(/*! re-slide */ "re-slide");

cn = __webpack_require__(/*! classnames */ "classnames");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

// log StyleContext
AlertOverlay = class AlertOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.message,
      show_alert: false
    };
  }

  UNSAFE_componentWillUpdate(props, state) {
    if (props.visible) {
      this.state.message = props.message;
      return this.state.alert_type = props.alert_type;
    }
  }

  componentDidUpdate(props) {
    if (props.visible !== this.props.visible) {
      return this.setState({
        show_alert: this.props.visible && this.props.message
      });
    }
  }

  render() {
    var alert_bg, alert_color, slide_pos;
    // log @context
    // log @context
    if (this.state.show_alert) {
      slide_pos = 1;
    } else {
      slide_pos = 0;
    }
    if (this.state.alert_type === 'error') {
      alert_bg = this.context.primary.false;
    } else if (this.state.alert_type === 'success') {
      alert_bg = this.context.primary.true;
    } else {
      alert_bg = this.context.primary.inv[0];
    }
    alert_color = 'white';
    return h(Overlay, {
      onClick: this.props.onClick,
      visible: this.props.visible,
      initial_visible: this.props.initial_visible,
      style: this.props.style,
      transparent: this.props.transparent,
      backdrop_color: this.props.backdrop_color
    }, h(Slide, {
      className: css['overlay-slide'],
      slide: true,
      vert: true,
      beta: 100,
      pos: slide_pos
    }, h(Slide, {
      beta: 100,
      center: true
    }, this.props.children || null), h(Slide, {
      dim: 200,
      className: css['overlay-alert'],
      onClick: this.props.onClick,
      style: {
        background: alert_bg,
        color: alert_color
      },
      center: true
    }, this.state.message)));
  }

};

AlertOverlay.contextType = StyleContext;

module.exports = AlertOverlay;


/***/ }),

/***/ "./components/Bar.coffee":
/*!*******************************!*\
  !*** ./components/Bar.coffee ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Bar, StyleContext, cn, css,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

cn = __webpack_require__(/*! classnames */ "classnames");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

Bar = class Bar extends Component {
  constructor(props) {
    super(props);
    this.baseRef = this.baseRef.bind(this);
  }

  baseRef(el) {
    boundMethodCheck(this, Bar);
    return this.base = el;
  }

  render() {
    var bar_props;
    bar_props = {
      ref: this.baseRef,
      className: cn(this.props.className, this.props.btn && css['bar-btn'], this.props.vert && css['bar-vert'], css['bar'], this.props.big && css['bar-big'] || css['bar-small']),
      style: this.props.style
    };
    return h('div', bar_props, this.props.children);
  }

};

module.exports = Bar;


/***/ }),

/***/ "./components/Chip.coffee":
/*!********************************!*\
  !*** ./components/Chip.coffee ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Chip, StyleContext, cn, css,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

cn = __webpack_require__(/*! classnames */ "classnames");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

Chip = class Chip extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      value: void 0
    };
  }

  onMouseEnter(e) {
    var base;
    boundMethodCheck(this, Chip);
    this.setState({
      hover: true
    });
    return typeof (base = this.props).onMouseEnter === "function" ? base.onMouseEnter(e) : void 0;
  }

  onMouseLeave(e) {
    var base;
    boundMethodCheck(this, Chip);
    this.setState({
      hover: false
    });
    return typeof (base = this.props).onMouseLeave === "function" ? base.onMouseLeave(e) : void 0;
  }

  getButtonStyle(props, state) {
    var btn_style, focus, offset, select, value;
    offset = offset || 0;
    value = props.value != null ? props.value : state.value;
    select = props.select;
    focus = state.focus || state.hover;
    btn_style = {};
    if (props.type === 'button') {
      btn_style.cursor = 'pointer';
    }
    if (props.btn_type === 'primary') {
      if (select) {
        btn_style.color = this.context.secondary.inv[1];
        btn_style.background = this.context.secondary.color[0];
      } else if (focus) {
        btn_style.color = this.context.secondary.inv[1];
        btn_style.background = this.context.secondary.color[0];
      } else {
        btn_style.color = this.context.secondary.inv[2];
        btn_style.background = this.context.secondary.color[1];
      }
    } else if (props.btn_type === 'flat') {
      if (select) {
        btn_style.color = this.context.primary.color[1];
        btn_style.background = this.context.primary.inv[1];
      } else if (focus) {
        btn_style.color = this.context.primary.color[1];
        btn_style.background = this.context.primary.inv[1];
      } else {
        btn_style.color = this.context.primary.color[2];
        btn_style.background = this.context.primary.inv[0];
      }
    } else {
      if (select) {
        btn_style.color = this.context.primary.color[1];
        btn_style.background = this.context.primary.inv[2];
      } else if (focus) {
        btn_style.color = this.context.primary.color[1];
        btn_style.background = this.context.primary.inv[2];
      } else {
        btn_style.color = this.context.primary.color[2];
        btn_style.background = this.context.primary.inv[1];
      }
    }
    return btn_style;
  }

  render() {
    var chip_props;
    chip_props = Object.assign({}, this.props, {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      className: cn(this.props.disabled && 'disabled', css['btn'], css['chip'], this.props.className),
      style: Object.assign({}, this.getButtonStyle(this.props, this.state), this.props.style)
    });
    return h('span', chip_props, this.props.children);
  }

};

Chip.contextType = StyleContext;

module.exports = Chip;


/***/ }),

/***/ "./components/CircleToggle.coffee":
/*!****************************************!*\
  !*** ./components/CircleToggle.coffee ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CircleToggle, cn, css;

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

cn = __webpack_require__(/*! classnames */ "classnames");

CircleToggle = class CircleToggle extends Component {
  render() {
    return h('div', {
      className: css['checkbox-circle'],
      style: {
        background: this.props.background
      }
    }, h('div', {
      className: cn(css['checkbox-circle-inner'], this.props.is_selected && css['active']),
      style: {
        background: this.props.color
      }
    }));
  }

};

module.exports = CircleToggle;


/***/ }),

/***/ "./components/Input.coffee":
/*!*********************************!*\
  !*** ./components/Input.coffee ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AlertDot, CircleToggle, Color, IS_TOUCH, Input, Slide, StyleContext, TOUCH_V, cn, css, isTouch,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

cn = __webpack_require__(/*! classnames */ "classnames");

Color = __webpack_require__(/*! color */ "color");

Slide = __webpack_require__(/*! re-slide */ "re-slide");

AlertDot = __webpack_require__(/*! ./AlertDot.coffee */ "./components/AlertDot.coffee");

CircleToggle = __webpack_require__(/*! ./CircleToggle.coffee */ "./components/CircleToggle.coffee");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

isTouch = __webpack_require__(/*! ./isTouch.js */ "./components/isTouch.js");

IS_TOUCH = isTouch();

// TOUCH_X = 0
TOUCH_V = 0;

window.addEventListener('touchmove', function(e) {
  return TOUCH_V = Date.now();
});

// log TOUCH_X,TOUCH_Y
window.addEventListener('scroll', function(e) {
  return TOUCH_V = Date.now();
});

Input = class Input extends Component {
  constructor(props) {
    super(props);
    this.onInput = this.onInput.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.setValue = this.setValue.bind(this);
    this.inputRef = this.inputRef.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.outerRef = this.outerRef.bind(this);
    this.state = {
      value: '',
      input_files: void 0
    };
    if (props.type === 'color') {
      this.state.is_dark = Color(props.value).isDark();
    }
    this.list = [];
  }

  onInput(e) {
    var file, input_files, j, len, ref;
    boundMethodCheck(this, Input);
    // log 'on input',e
    if (this.props.onInput) {
      if (this.props.type === 'file' && e.target.files && e.target.files.length) {
        input_files = [];
        ref = e.target.files;
        for (j = 0, len = ref.length; j < len; j++) {
          file = ref[j];
          input_files.push(file.name);
        }
        // log input_files
        this.setState({
          input_files: input_files
        });
      } else if (this.props.type === 'list') {
        if (this.state.list_chip_value) {
          this.props.onInput(this.state.list_chip_value + ',' + e.target.value);
          return;
        }
      }
      this.props.onInput(e);
    }
    if (this.props.onInputValue != null) {
      this.props.onInputValue(e.target.value);
    }
  }

  inputValue(val) {
    boundMethodCheck(this, Input);
    // log 'INPUT VALUE',val
    return this.onInput({
      target: {
        value: val
      }
    });
  }

  onFocus(e) {
    var base;
    boundMethodCheck(this, Input);
    this.setState({
      focus: true
    });
    return typeof (base = this.props).onFocus === "function" ? base.onFocus(e) : void 0;
  }

  onBlur(e) {
    var base;
    boundMethodCheck(this, Input);
    this.setState({
      focus: false
    });
    return typeof (base = this.props).onBlur === "function" ? base.onBlur(e) : void 0;
  }

  onTouchStart(e) {
    var base;
    boundMethodCheck(this, Input);
    this._rect = TOUCH_V;
    this.setState({
      hover: true
    });
    return typeof (base = this.props).onMouseEnter === "function" ? base.onMouseEnter(e) : void 0;
  }

  onTouchEnd(e) {
    var base, rect;
    boundMethodCheck(this, Input);
    rect = TOUCH_V;
    this.setState({
      focus: this.props.type === 'color' || this.props.type === 'button' || this.props.type === 'checkbox' ? false : this.state.focus,
      hover: false,
      drag: false
    });
    if (rect === this._rect) {
      return typeof (base = this.props).onClick === "function" ? base.onClick(e) : void 0;
    }
  }

  onMouseEnter(e) {
    var base;
    boundMethodCheck(this, Input);
    this.setState({
      hover: true
    });
    return typeof (base = this.props).onMouseEnter === "function" ? base.onMouseEnter(e) : void 0;
  }

  onMouseLeave(e) {
    var base;
    boundMethodCheck(this, Input);
    this.setState({
      focus: this.props.type === 'color' || this.props.type === 'button' || this.props.type === 'checkbox' ? false : this.state.focus,
      hover: false,
      drag: false
    });
    return typeof (base = this.props).onMouseLeave === "function" ? base.onMouseLeave(e) : void 0;
  }

  onKeyDown(e) {
    boundMethodCheck(this, Input);
    // log e.key
    if (e.key === 'Enter' || (e.key === 'Tab' && (this.props.autofill != null))) {
      return this.onEnter(e);
    }
  }

  onEnter(e) {
    var autofill_match_res, base, base1, ref;
    boundMethodCheck(this, Input);
    if (this.props.type === 'checkbox') {
      return this._input.click();
    } else {
      this._input.blur();
    }
    if ((ref = this.props.autofill) != null ? ref.length : void 0) {
      autofill_match_res = this.props.autofill[0].match(new RegExp('^' + this.props.value, 'i'));
      // log autofill_match_res
      if (autofill_match_res != null ? autofill_match_res[0] : void 0) {
        if (typeof (base = this.props).onInputValue === "function") {
          base.onInputValue(this.props.autofill[0]);
        }
        if (this.props.onInput) {
          this.props.onInput({
            target: {
              value: this.props.autofill[0]
            }
          });
        }
      }
    }
    return typeof (base1 = this.props).onEnter === "function" ? base1.onEnter(e) : void 0;
  }

  onClick(e) {
    var base, base1;
    boundMethodCheck(this, Input);
    // log 'ON CLICK'
    e.preventDefault();
    e.stopPropagation();
    if (this.props.type === 'checkbox') {
      if (this.props.onInput) {
        return this.props.onInput(e);
      } else {
        return typeof (base = this.props).onClick === "function" ? base.onClick(e) : void 0;
      }
    } else {
      return typeof (base1 = this.props).onClick === "function" ? base1.onClick(e) : void 0;
    }
  }

  onInputClick(e) {
    boundMethodCheck(this, Input);
    e.stopPropagation();
    // e.preventDefault()
    return false;
  }

  setValue(value) {
    boundMethodCheck(this, Input);
    return this._input.value = value;
  }

  inputRef(el) {
    boundMethodCheck(this, Input);
    return this._input = el;
  }

  componentDidUpdate(props) {
    var is_dark;
    if (this.props.type === 'color' && props.value !== this.props.value) {
      is_dark = Color(props.value).isDark();
      if (is_dark !== this.state.is_dark) {
        this.setState({
          is_dark: is_dark
        });
      }
    }
    if (this.props.type === 'file' && this.state.input_files && !this.props.value) {
      return this.setState({
        input_files: null
      });
    }
  }

  // onTouchStart: (e)=>
  // 	if @props.onClick
  // 		e.stopPropagation()
  // 		# e.preventDefault()
  // 	@state.hover = yes
  // 	@state.touch_started = yes
  // 	# log 'touch started'
  // 	@forceUpdate()
  // 	# @props.onTouchStart?(e)

    // onTouchEnd: (e)=>
  // 	if @props.onClick
  // 		e.stopPropagation()
  // 		e.preventDefault()

    // 	if !@state.touch_started
  // 		return false
  // 	@setState
  // 		hover: no
  // 		touch_started: no
  // 	# log 'touch end'
  // 	@props.onClick?(e)
  // 	if @props.type != 'file'
  // 		@_input?.focus()
  // 		@_input?.click()
  getButtonStyle(props, state) {
    var btn_style, focus, offset, select, value;
    offset = offset || 0;
    value = props.value != null ? props.value : state.value;
    select = props.select;
    focus = state.focus || state.hover;
    if (props.focus != null) {
      focus = props.focus;
    }
    btn_style = {};
    if (props.type === 'label') {
      focus = false;
    }
    // btn_style.cursor = 'default'

    // if props.type == 'button' || props.type == 'file'
    // btn_style.cursor = 'pointer'
    if (props.btn_type === 'true') {
      if (select) {
        btn_style.color = this.context.primary.true_inv_hover;
        btn_style.background = this.context.primary.true_hover;
      } else if (focus) {
        btn_style.color = this.context.primary.true_inv_hover;
        btn_style.background = this.context.primary.true_hover;
      } else {
        btn_style.color = this.context.primary.true_inv;
        btn_style.background = this.context.primary.true;
      }
    } else if (props.btn_type === 'false') {
      if (select) {
        btn_style.color = this.context.primary.false_inv_hover;
        btn_style.background = this.context.primary.false_hover;
      } else if (focus) {
        btn_style.color = this.context.primary.false_inv_hover;
        btn_style.background = this.context.primary.false_hover;
      } else {
        btn_style.color = this.context.primary.false_inv;
        btn_style.background = this.context.primary.false;
      }
    } else if (props.btn_type === 'primary') {
      if (select) {
        btn_style.color = this.context.secondary.color[0];
        btn_style.background = this.context.secondary.inv[2];
      } else if (focus) {
        btn_style.color = this.context.secondary.color[0];
        btn_style.background = this.context.secondary.inv[1];
      } else {
        btn_style.color = this.context.secondary.color[1];
        btn_style.background = this.context.secondary.inv[0];
      }
    } else if (props.btn_type === 'flat') {
      if (select) {
        btn_style.color = this.context.primary.color[0];
        btn_style.background = this.context.primary.inv[2];
      } else if (focus) {
        btn_style.color = this.context.primary.color[0];
        btn_style.background = this.context.primary.inv[1];
      } else {
        btn_style.color = this.context.primary.color[1];
        btn_style.background = this.context.primary.inv[0];
      }
    } else {
      if (select) {
        btn_style.color = this.context.primary.color[1];
        btn_style.background = this.context.primary.inv[2];
      } else if (focus) {
        btn_style.color = this.context.primary.color[1];
        btn_style.background = this.context.primary.inv[2];
      } else {
        btn_style.color = this.context.primary.color[2];
        btn_style.background = this.context.primary.inv[1];
      }
    }
    if (props.center) {
      btn_style.justifyContent = 'center';
    }
    return btn_style;
  }

  getChipStyle(props, state, offset) {
    var btn_style, focus, select, value;
    offset = offset || 0;
    value = props.value != null ? props.value : state.value;
    select = props.select;
    focus = state.focus;
    btn_style = {};
    if (props.btn_type === 'primary') {
      btn_style.color = this.context.secondary.color[0];
      btn_style.background = this.context.secondary.inv[2];
    } else if (props.btn_type === 'flat') {
      btn_style.color = this.context.primary.color[0];
      btn_style.background = this.context.primary.inv[2];
    } else {
      btn_style.color = this.context.primary.inv[0];
      btn_style.background = this.context.primary.color[2];
    }
    return btn_style;
  }

  getIconStyle(props, state) {
    var focus, i_style, select;
    i_style = {};
    select = props.select;
    focus = state.focus || state.hover;
    if (props.i_type === 'primary') {
      i_style.color = this.context.secondary.color[0];
    } else if (props.i_type === 'highlight') {
      i_style.color = this.context.secondary.highlight;
    } else {
      if (props.btn_type === 'true') {
        if (select) {
          i_style.color = this.context.primary.true_inv_hover;
        } else if (focus) {
          i_style.color = this.context.primary.true_inv_hover;
        } else {
          i_style.color = this.context.primary.true_inv;
        }
      } else if (props.btn_type === 'false') {
        if (select) {
          i_style.color = this.context.primary.false_inv_hover;
        } else if (focus) {
          i_style.color = this.context.primary.false_inv_hover;
        } else {
          i_style.color = this.context.primary.false_inv;
        }
      } else if (props.btn_type === 'primary') {
        if (focus || select) {
          i_style.color = this.context.secondary.color[0];
        } else {
          i_style.color = this.context.secondary.color[1];
        }
      } else if (props.btn_type === 'flat') {
        if (focus || select) {
          i_style.color = this.context.primary.color[2];
        } else {
          i_style.color = this.context.primary.color[3];
        }
      } else {
        if (focus || select) {
          i_style.color = this.context.primary.color[0];
        } else {
          i_style.color = this.context.primary.color[1];
        }
      }
    }
    return i_style;
  }

  getBarStyle(props, state) {
    var bar_style, focus, select, value;
    bar_style = {};
    
    // if (!props.label || props.top_label) && !props.i 
    // 	bar_style.marginLeft = 0
    if (props.bar_style) {
      // Object.assign bar_style,props.bar_style
      return props.bar_style;
    }
    value = props.value != null ? props.value : state.value;
    select = props.select;
    focus = state.focus;
    if (!value) {
      if (props.required && !props.value) {
        bar_style.background = this.context.secondary.warn;
      } else if (props.btn_type === 'primary') {
        bar_style.background = this.context.secondary.inv[1];
        bar_style.color = this.context.secondary.inv[3];
      } else if (props.btn_type === 'flat') {
        bar_style.background = this.context.primary.inv[1];
        bar_style.color = this.context.primary.inv[2];
      } else {
        bar_style.background = this.context.primary.inv[2];
        bar_style.color = this.context.primary.inv[3];
      }
    } else if (props.invalid === true || props.is_valid === false) {
      bar_style.background = this.context.secondary.false;
    } else if (props.invalid === false || props.is_valid === true) {
      bar_style.background = this.context.secondary.true;
    } else {
      if (props.btn_type === 'primary') {
        bar_style.background = this.context.secondary.color[0];
      } else if (props.btn_type === 'flat') {
        bar_style.background = this.context.primary.color[1];
      } else {
        bar_style.background = this.context.primary.color[2];
      }
    }
    return bar_style;
  }

  
    // removeChip: (i)->

    // 	@forceUpdate()

    // componentDidUpdate: ->

    // 	if @props.type == 'date'
  // 		if @_input.hasAttribute('data-has-picker') && !@_input.hasAttribute('data-has-listener')
  // 			@_input.addEventListener 'change',@onInput
  // 			@_input.setAttribute('data-has-listener','true')
  renderChips(props, state) {
    var chip_style, chips, items, value;
    value = props.value != null ? props.value : state.value;
    if (!value) {
      value = '';
    }
    chips = value.split(',') || [];
    this.state.list_value = chips.pop() || '';
    chip_style = this.getChipStyle(props, state, 1);
    items = chips.map((item, i) => {
      if (this.props.chipRenderer) {
        item = this.props.chipRenderer(item);
      }
      return h('div', {
        key: 'chip-' + i,
        className: css['chip'],
        // onClick: @removeChip.bind(@,i)
        style: chip_style
      }, item);
    });
    this.state.list_chip_value = chips.join(',');
    return items;
  }

  render() {
    return h(MenuTabContext.Consumer, {}, (value) => {
      // log value
      if (value === true) {
        this.state.focus = true;
      }
      // log @state.reveal
      return this.renderInput();
    });
  }

  onDragEnter(e) {
    boundMethodCheck(this, Input);
    // log 'drag enter'
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      hover: true,
      drag: true
    });
    return false;
  }

  onDragLeave(e) {
    boundMethodCheck(this, Input);
    // log 'drag leave'
    // log e
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      hover: false,
      drag: false
    });
    return false;
  }

  outerRef(el) {
    boundMethodCheck(this, Input);
    return this._outer = el;
  }

  renderInput() {
    var autofill_buttons, autofill_match_res, bar, bar_style, button_style, chips, color_circle, enter_hint, focus, hint_label, icon, icon_style, input, input_hidden, input_name, input_props, input_val_style, label, label2, outer_props, overlay_autofill_buttons, overlay_icon, overlay_input, overlay_input_text, props, select, state, style, toggle, toggle_bar_off_style, toggle_bar_on_style, toggle_bar_style, toggle_circle_fill_color, value, wrap_input_style;
    // log 'render input'
    input_name = this.props.name;
    props = this.props;
    state = this.state;
    value = this.props.value;
    select = props.select;
    focus = state.focus || state.hover || select;
    button_style = this.getButtonStyle(props, state);
    if (this.state.input_files && this.state.input_files.length) {
      if (this.props.value != null) {
        value = this.props.value;
      } else {
        value = this.state.input_files.length > 1 && (this.state.input_files.length + ' files') || this.state.input_files[0];
      }
    }
    icon_style = this.getIconStyle(props, state);
    bar_style = this.getBarStyle(props, state);
    if (!props.label && this.props.label_width) {
      icon_style.width = this.props.label_width;
    }
    if (props.style) {
      style = Object.assign(button_style, props.style);
    } else {
      style = button_style;
    }
    if (props.i_style) {
      Object.assign(icon_style, props.i_style);
    }
    if (props.type === 'label') {
      select = false;
    } else {
      style.userSelect = 'none';
      style.cursor = 'pointer';
    }
    if (props.type === 'color' || props.type === 'checkbox' || props.type === 'button') {
      input_hidden = true;
    }
    // input_hidden = false
    if (props.type === 'checkbox') {
      if (props.checkbox_type === 'circle') {
        if (this.props.checked) {
          if (this.props.btn_type === 'primary') {
            toggle_circle_fill_color = this.context.secondary.true;
          } else {
            toggle_circle_fill_color = this.context.primary.true;
          }
        } else {
          toggle_circle_fill_color = bar_style.color;
        }
        
        // toggle_circle_fill_color = @context.secondary.color[0]
        toggle = h(CircleToggle, {
          background: bar_style.background,
          color: toggle_circle_fill_color,
          is_selected: props.checked
        });
      } else {
        toggle_bar_on_style = {
          background: this.context.secondary.true
        };
        toggle_bar_off_style = {
          background: this.context.secondary.false
        };
        if (props.btn_type === 'primary') {
          toggle_bar_style = {
            background: this.context.secondary.inv[0],
            color: this.context.secondary.inv[1]
          };
        } else if (props.btn_type === 'flat') {
          toggle_bar_style = {
            background: this.context.primary.inv[1],
            color: this.context.primary.inv[2]
          };
        } else {
          toggle_bar_style = {
            background: this.context.primary.inv[2],
            color: this.context.primary.inv[3]
          };
        }
        toggle = h(Slide, {
          className: css['toggle'],
          slide: true,
          pos: props.checked ? 0 : 2
        }, h(Slide, {
          className: css['toggle-on'],
          style: toggle_bar_on_style,
          beta: 100,
          offset: -12
        }), h(Slide, {
          width: 12,
          center: true,
          style: toggle_bar_style
        }, h('div', {
          style: {
            background: toggle_bar_style.color
          },
          className: css['toggle-bar']
        })), h(Slide, {
          className: css['toggle-off'],
          style: toggle_bar_off_style,
          beta: 100,
          offset: -12
        }));
      }
    }
    if (props.i || props.i_class) {
      icon = h('i', {
        onClick: this.props.onIconClick,
        className: cn(props.i_class || 'material-icons', !this.props.label && css['label']),
        style: icon_style
      }, props.i);
    }
    if (props.label) {
      label = h('div', {
        style: {
          color: props.top_label && this.context.primary.color[0] || void 0,
          width: this.props.label_width
        },
        className: cn(value && css['label-opaque'], css['label'], props.top_label && css['top-label'])
      }, props.label);
    }
    if (props.bar) {
      bar = h('div', {
        className: css['input-bar'],
        style: bar_style
      });
    }
    if (props.type === 'color') {
      color_circle = h('div', {
        className: cn(css['input-color-circle'], css['chip']),
        style: {
          background: props.value || '#fff'
        }
      }, h('span', {
        className: css['input-color-text'],
        style: {
          color: state.is_dark && 'white' || 'black'
        }
      }, props.value));
    } else if (props.type === 'list') {
      chips = this.renderChips(props, state);
      // log @state.list_value
      value = this.state.list_value;
    } else if (props.type === 'file') {
      if (this.state.input_files && this.state.input_files.length) {
        label2 = value && h('div', {
          className: cn(css['label'], css['label-2']),
          style: {
            opacity: 1
          }
        }, value);
      } else {
        if (this.props.placeholder != null) {
          label2 = this.props.placeholder && h('span', {
            className: cn(css['label'], css['label-2'])
          }, this.props.placeholder);
        } else {
          label2 = this.props.placeholder && h('span', {
            className: cn(css['label'], css['label-2'])
          }, 'browse or drop file');
        }
      }
      overlay_icon = h('div', {
        className: cn('material-icons', css['overlay-icon']),
        style: {
          opacity: (this.state.input_files || this.state.drag) && 1 || 0.3
        }
      }, 'insert_drive_file');
      value = '';
    }
    // if props.type == 'select'
    if (props.type !== 'button' && props.type !== 'label') {
      input_props = {
        className: input_hidden && css['hidden'],
        onKeyDown: this.onKeyDown,
        type: this.props.type,
        onChange: this.onInput,
        // onSelect: @props.onSelect
        name: input_name,
        onDragEnter: this.onDragEnter,
        ref: this.inputRef,
        placeholder: this.props.placeholder,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        value: value || ''
      };
      if (this.props.autoheight) {
        input_props.style = {
          height: 'auto',
          whiteSpace: 'normal',
          maxHeight: 'auto'
        };
      }
      if (props.type === 'date' && !props.placeholder) {
        input_props.placeholder = 'mm/dd/yyyy';
      }
      if (this.props.input_props) {
        Object.assign(input_props, this.props.input_props);
      }
      input_props.onClick = this.onInputClick;
      if (props.input_props) {
        Object.assign(input_props, props.input_props);
      }
      if (props.type === 'textarea') {
        input = h('textarea', input_props);
      } else if (props.type === 'select') {
        input = h('select', input_props, props.options);
      } else {
        input = h('input', input_props);
      }
    }
    // log @props.autofill
    if (this.props.autofill) {
      style.height = DIM2 * 2;
      style.paddingTop = DIM2;
    }
    if (this.props.overlay_input) {
      overlay_input = h('div', {
        style: {
          color: this.context.primary.color[3]
        },
        className: cn(css['input'], css['overlay-input'])
      }, this.props.overlay_input);
    }
    if (this.props.autofill && (!this.props.overlay_input || this.props.force_autofill_buttons)) {
      input_val_style = {
        background: this.context.primary.color[1],
        color: this.context.primary.inv[1]
      };
      if (!this.props.autofill.length) {
        overlay_autofill_buttons = h('div', {
          className: css['overlay-input-val-wrap']
        }, h('div', {
          className: css['overlay-input-val'],
          style: {
            background: this.context.primary.inv[0],
            color: this.context.primary.color[0]
          }
        }, '...'));
      } else {
        autofill_match_res = this.props.autofill[0].match(new RegExp('^' + this.props.value, 'i'));
        if (autofill_match_res != null ? autofill_match_res[0] : void 0) {
          overlay_input_text = this.props.value + this.props.autofill[0].slice(this.props.value.length);
        }
        if (this.props.force_autofill_buttons || this.state.focus) {
          autofill_buttons = this.props.autofill.slice(0, this.props.autofill_count || 3).map((val, i) => {
            var val_style;
            if (i === 0 && overlay_input_text) {
              val_style = {
                background: this.context.secondary.inv[0],
                color: this.context.secondary.color[0]
              };
            } else {
              val_style = input_val_style;
            }
            return h('div', {
              onClick: this.inputValue.bind(this, val),
              className: css['overlay-input-val'],
              style: val_style,
              key: val
            }, val);
          });
        }
        if (this.state.focus) {
          enter_hint = h('div', {
            style: {
              background: this.context.primary.inv[0],
              color: this.context.primary.color[0]
            },
            onClick: this.onEnter,
            className: cn(css['overlay-input-val'], css['overlay-input-hint'])
          }, "tab");
          overlay_input = h('div', {
            style: {
              color: this.context.primary.color[3]
            },
            className: cn(css['input'], css['overlay-input'])
          }, overlay_input_text);
        }
        overlay_autofill_buttons = h('div', {
          className: css['overlay-input-val-wrap']
        }, autofill_buttons, enter_hint);
      }
    }
    if (this.props.width) {
      style.width = this.props.width;
      wrap_input_style = {
        width: this.props.width
      };
    }
    if (input && props.type === 'text' || props.type === 'email' || props.type === 'phone') {
      input = h('div', {
        className: css['input-wrap'],
        style: wrap_input_style
      }, overlay_input, input);
    }
    if (this.props.autoheight) {
      style.height = 'auto';
      style.whiteSpace = 'normal';
      style.maxHeight = 'auto';
    }
    outer_props = {
      onClick: !IS_TOUCH && this.onClick || void 0,
      htmlFor: input_name,
      ref: this.outerRef,
      onTouchStart: IS_TOUCH && this.onTouchStart || void 0,
      onTouchEnd: IS_TOUCH && this.onTouchEnd || void 0,
      onMouseEnter: !IS_TOUCH && this.onMouseEnter || void 0,
      onMouseLeave: !IS_TOUCH && this.onMouseLeave || void 0,
      className: cn(IS_TOUCH && (props.type === 'button' || props.type === 'label') && css['noselect'], props.hint && css['trans_fixed'], props.type === 'textarea' && css['btn-textarea'], props.big && css['btn-big'], css['btn'], !label && icon && !this.props.children && props.type === 'button' && css['btn-icon-square'], props.disabled && css['disabled'], props.type === 'select' && css['type-select'], props.className),
      href: props.href,
      style: style
    };
    if (this.props.href) {
      outer_props.target = '_blank';
    }
    Object.assign(outer_props, this.props.outer_props);
    if (this.props.hint) {
      hint_label = h('div', {
        className: css['hint-label']
      }, this.props.hint);
    }
    return h(props.href && 'a' || 'label', outer_props, toggle, chips, icon, label, bar, input, color_circle, label2, overlay_icon, overlay_autofill_buttons, props.children, hint_label);
  }

};

Input.contextType = StyleContext;

Input.defaultProps = {
  autofill_count: 3,
  name: 'input',
  type: 'text',
  btn_type: 'default',
  i_type: 'default'
};

module.exports = Input;


/***/ }),

/***/ "./components/Menu.coffee":
/*!********************************!*\
  !*** ./components/Menu.coffee ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Bar, Color, Menu, MenuContext, StyleContext, createContext, css,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

Bar = __webpack_require__(/*! ./Bar.coffee */ "./components/Bar.coffee");

Color = __webpack_require__(/*! color */ "color");

({createContext} = __webpack_require__(/*! react */ "react"));

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

// Overlay = require './Overlay.coffee'
MenuContext = createContext({});

global.MenuContext = MenuContext;

Menu = class Menu extends Component {
  constructor(props) {
    super(props);
    this.getContext = this.getContext.bind(this);
    this.spliceTabBranch = this.spliceTabBranch.bind(this);
    // componentWillUpdate: (props,state)->
    // 	if props.backdrop_color != @props.backdrop_color
    // 		state.backdrop_opaque_color = @setColor(props.backdrop_color)

    // componentDidUpdate: ->	
    // 	@state.reveal = undefined
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onClickBackdrop = this.onClickBackdrop.bind(this);
    this.clearTabBranch = this.clearTabBranch.bind(this);
    this.onContextTabReveal = this.onContextTabReveal.bind(this);
    this.state = {
      width: 0,
      height: 0,
      tab_branch: [],
      backdrop_color: props.backdrop_color || '#000'
    };
  }

  getContext() {
    boundMethodCheck(this, Menu);
    return {
      onContextTabReveal: this.onContextTabReveal,
      backdrop_color: this.props.backdrop_color || this.state.backdrop_color,
      spliceTabBranch: this.spliceTabBranch,
      onClickBackdrop: this.props.onClickBackdrop,
      tab_branch: this.state.tab_branch,
      alternate: this.props.alternate,
      vert: this.props.vert,
      render_unrevealed_children: this.props.render_unrevealed_children || false,
      bounding_box: this.props.bounding_box,
      big: this.props.big,
      hover_reveal_enabled: this.props.hover_reveal_enabled,
      click_reveal_enabled: this.props.click_reveal_enabled,
      level: 0,
      split_x: this.props.split_x,
      split_y: this.props.split_y,
      bar_dir_x: this.props.bar_dir_x,
      bar_dir_y: this.props.bar_dir_y,
      force_split_x: this.props.force_split_x,
      force_split_y: this.props.force_split_y
    };
  }

  spliceTabBranch(tab) {
    var tab_i;
    boundMethodCheck(this, Menu);
    tab_i = this.state.tab_branch.indexOf(tab);
    if (tab_i < 0) {
      return;
    }
    this.state.tab_branch.splice(tab_i);
    return this.forceUpdate();
  }

  componentDidMount() {
    boundMethodCheck(this, Menu);
    return this.forceUpdate();
  }

  onClickBackdrop(e) {
    var base;
    boundMethodCheck(this, Menu);
    this.clearTabBranch(e);
    return typeof (base = this.props).onClickBackdrop === "function" ? base.onClickBackdrop(e) : void 0;
  }

  clearTabBranch(e) {
    boundMethodCheck(this, Menu);
    this.state.tab_branch.length = 0;
    return this.forceUpdate();
  }

  onContextTabReveal(tab_branch, e) {
    boundMethodCheck(this, Menu);
    return this.setState({
      tab_branch: tab_branch
    });
  }

  render() {
    var bar_style;
    bar_style = {};
    if (this.props.fixed) {
      bar_style.left = this.props.left;
      bar_style.top = this.props.top;
      bar_style.position = 'fixed';
    }
    if (this.props.style) {
      Object.assign(bar_style, this.props.style);
    }
    return h(MenuContext.Provider, {
      value: this.getContext()
    }, h(Bar, {
      btn: false,
      vert: this.props.vert,
      big: this.props.big,
      style: bar_style,
      className: this.props.className
    }, this.props.children));
  }

};

// backdrop
Menu.defaultProps = {
  x: 0,
  y: 0,
  split_x: 1,
  // force_split_x: 0
  // force_split_y: 0
  split_y: 1,
  bar_dir_x: 1,
  bar_dir_y: 1,
  bounding_box: {
    x: 0,
    y: 0,
    width: 2e308,
    height: 2e308
  },
  show_backdrop: void 0
};

Menu.contextType = StyleContext;

module.exports = Menu;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/MenuTab.coffee":
/*!***********************************!*\
  !*** ./components/MenuTab.coffee ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Bar, MenuTab, MenuTabContext, Overlay, StyleContext, createContext, css,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

Bar = __webpack_require__(/*! ./Bar.coffee */ "./components/Bar.coffee");

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

Overlay = __webpack_require__(/*! ./Overlay.coffee */ "./components/Overlay.coffee");

({createContext} = __webpack_require__(/*! react */ "react"));

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

MenuTabContext = createContext();

global.MenuTabContext = MenuTabContext;

MenuTab = class MenuTab extends Component {
  constructor(props) {
    super(props);
    this.childContainer = this.childContainer.bind(this);
    this.revealSelfTab = this.revealSelfTab.bind(this);
    this.onContextTabReveal = this.onContextTabReveal.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
    this.onTabMouseEnter = this.onTabMouseEnter.bind(this);
    
    // return false
    this.onClickBackdrop = this.onClickBackdrop.bind(this);
    this.onTabMouseLeave = this.onTabMouseLeave.bind(this);
    this.baseRef = this.baseRef.bind(this);
    this.state = {
      reveal: props.reveal || false,
      pre_render_visibility: false
    };
  }

  getContext() {
    return {
      onContextTabReveal: this.context.onContextTabReveal,
      spliceTabBranch: this.context.spliceTabBranch,
      onClickBackdrop: this.context.onClickBackdrop,
      backdrop_color: this.context.backdrop_color,
      alternate: this.context.alternate,
      render_unrevealed_children: this.props.render_unrevealed_children != null ? this.props.render_unrevealed_children : this.context.render_unrevealed_children,
      bounding_box: this.props.bounding_box != null ? this.props.bounding_box : this.context.bounding_box,
      big: this.props.big != null ? this.props.big : this.context.big,
      vert: this.getBarSplitVert(this.props),
      onContextTabReveal: this.onContextTabReveal,
      tab_branch: this.context.tab_branch,
      level: this.context.level + 1,
      bar_dir_x: this.state.bar_dir_x,
      bar_dir_y: this.state.bar_dir_y,
      split_x: this.state.split_x,
      split_y: this.state.split_y,
      force_split_x: this.props.force_split_x != null ? this.props.force_split_x : this.context.force_split_x,
      force_split_y: this.props.force_split_y != null ? this.props.force_split_y : this.context.force_split_y,
      hover_reveal_enabled: this.props.hover_reveal_enabled != null ? this.props.hover_reveal_enabled : this.context.hover_reveal_enabled,
      click_reveal_enabled: this.props.click_reveal_enabled != null ? this.props.click_reveal_enabled : this.context.click_reveal_enabled,
      big: this.props.big != null ? this.props.big : this.context.big,
      reveal: this.state.reveal === false ? false : this.context.reveal
    };
  }

  childContainer(el) {
    boundMethodCheck(this, MenuTab);
    return this._child_container = el != null ? el.base : void 0;
  }

  componentDidMount() {
    return this.forceUpdate();
  }

  // log @props.reveal
  // if @props.reveal
  // 	log 'reveal tab',@
  // 	@revealSelfTab()
  componentWillUnmount() {
    return clearTimeout(this._hide_backdrop_timeout);
  }

  UNSAFE_componentWillMount() {
    this.state.hide_rendered_children = true;
    this.calculateRevealState(this.props, this.state);
    if (this.calculateSplitDirections(this.props, this.state)) {
      this.state.hide_rendered_children = true;
      return setTimeout(this.forceUpdate.bind(this), 0);
    }
  }

  revealSelfTab(e) {
    boundMethodCheck(this, MenuTab);
    // log 'REVEAL SELF TAB'
    this.context.tab_branch.length = 0;
    this.context.tab_branch[0] = this;
    this.context.onContextTabReveal(this.context.tab_branch, e);
    return false;
  }

  onContextTabReveal(tree, e) {
    boundMethodCheck(this, MenuTab);
    tree.unshift(this);
    return this.context.onContextTabReveal(tree, e);
  }

  onTabClick(e) {
    var base, base1;
    boundMethodCheck(this, MenuTab);
    if (this.props.reveal === false) {
      return typeof (base = this.props).onClick === "function" ? base.onClick(e) : void 0;
    }
    if (this.props.hover_reveal_enabled === true || this.context.hover_reveal_enabled === true) {
      return;
    }
    if (this.props.click_reveal_enabled === true || this.context.click_reveal_enabled === true) {
      this.revealSelfTab(e);
    }
    if (typeof (base1 = this.props).onClick === "function") {
      base1.onClick(e);
    }
    return false;
  }

  onTabMouseEnter(e) {
    var base;
    boundMethodCheck(this, MenuTab);
    if (typeof (base = this.props).onMouseEnter === "function") {
      base.onMouseEnter(e);
    }
    // log @context.hover_reveal_enabled,@state.reveal
    if (this.props.hover_reveal_enabled === false) {
      return false;
    }
    if (this.context.hover_reveal_enabled && this.state.reveal) {
      return false;
    }
    if (!this.state.reveal && this.props.children) {
      return this.revealSelfTab(e);
    }
  }

  onClickBackdrop(e) {
    boundMethodCheck(this, MenuTab);
    if (this.props.onClickBackdrop) {
      this.props.onClickBackdrop(e);
    } else if (this.context.onClickBackdrop) {
      this.context.onClickBackdrop(e);
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  onTabMouseLeave(e) {
    var base;
    boundMethodCheck(this, MenuTab);
    if (typeof (base = this.props).onMouseLeave === "function") {
      base.onMouseLeave(e);
    }
    if ((this.props.hover_reveal_enabled === false || this.context.hover_reveal_enabled === false) || (this.props.click_reveal_enabled || this.context.click_reveal_enabled) || (this.props.reveal != null)) {
      return;
    }
    // log 'ret'
    return this.context.spliceTabBranch(this);
  }

  getFullBoundingBoxOverflowBounds(rr) {
    var bb, split_vert;
    split_vert = !this.context.vert;
    bb = this.props.bounding_box || this.context.bounding_box;
    // log bb,rr
    rr.top = rr.top - bb.y;
    rr.bottom = rr.bottom - (bb.y + bb.height);
    rr.left = rr.left - bb.x;
    rr.right = rr.right - (bb.x + bb.width);
    return rr;
  }

  getFullBoundingBox(split_x, split_y, bar_dir_x, bar_dir_y) {
    var ch, cw, rect, ref, ref1, ref2, rr, split_vert;
    split_vert = !this.context.vert;
    rr = {};
    rect = (ref = this.base) != null ? ref.getBoundingClientRect() : void 0;
    if (!rect) {
      return rr;
    }
    cw = (ref1 = this._child_container) != null ? ref1.clientWidth : void 0;
    ch = (ref2 = this._child_container) != null ? ref2.clientHeight : void 0;
    if (rect) {
      rr.left = rect.x;
      rr.right = rect.x + rect.width;
      rr.top = rect.y;
      rr.bottom = rect.y + rect.height;
    }
    if (split_vert && !split_y) {
      throw new Error('split_vert && !split_y');
    } else if (!split_vert && !split_x) {
      throw new Error('!split_vert && !split_x');
    } else if (!split_vert && !bar_dir_y) {
      throw new Error('!split_vert && !bar_dir_y');
    } else if (split_vert && !bar_dir_x) {
      throw new Error('!split_vert && !bar_dir_y');
    }
    if (split_vert) {
      if (split_y < 0) {
        rr.top -= ch;
      } else {
        rr.bottom += ch;
      }
      if (bar_dir_x > 0) {
        rr.right += cw - rect.width;
      } else {
        rr.left -= cw - rect.width;
      }
    } else if (!split_vert) {
      if (split_x < 0) {
        rr.left -= cw;
      } else {
        rr.right += cw;
      }
      if (bar_dir_y > 0) {
        rr.bottom += ch - rect.height;
      } else {
        rr.top -= ch - rect.height;
      }
    }
    return rr;
  }

  calculateRevealState(props) {
    if (!(props.reveal != null)) {
      if (this.context.tab_branch[this.context.level] !== this) {
        this.state.reveal = false;
        return;
      } else {
        this.state.reveal = true;
        return;
      }
    }
    if (props.reveal != null) {
      this.state.reveal = props.reveal;
      return;
    }
    if (this.context.reveal === false) {
      this.state.reveal = false;
    }
  }

  getBarSplitVert(props) {
    var split_vert;
    if (props.vert != null) {
      split_vert = props.vert;
    } else {
      split_vert = this.context.alternate ? !this.context.vert : this.context.vert;
    }
    return split_vert;
  }

  calculateSplitDirections(props, state) {
    var bar_children_split_vert, bar_dir_x, bar_dir_y, force_update, ob, split_vert, split_x, split_y;
    split_vert = !this.context.vert;
    split_x = props.split_x || this.context.split_x; // where the children bar will be located relative to the tab (left or right)
    split_y = props.split_y || this.context.split_y; // where the children bar will be located (top or bottom)
    if (!split_x && !split_y) {
      if (split_vert) {
        split_y = 1;
      } else {
        split_x = 1;
      }
    }
    bar_children_split_vert = this.getBarSplitVert(props);
    bar_dir_y = props.bar_dir_y != null ? props.bar_dir_y : this.context.split_y;
    bar_dir_x = props.bar_dir_x != null ? props.bar_dir_x : this.context.split_x;
    ob = this.getFullBoundingBoxOverflowBounds(this.getFullBoundingBox(split_x, split_y, bar_dir_x, bar_dir_y));
    // log ob
    if (split_y > 0 && ob.bottom > 0 && split_vert) {
      split_y = -1;
    } else if (split_y < 0 && ob.top < 0 && split_vert) {
      split_y = 1;
    } else if (split_x < 0 && ob.left < 0 && !split_vert) {
      split_x = 1;
    } else if (split_x > 0 && ob.right > 0 && !split_vert) {
      split_x = -1;
    }
    if (!split_vert && ob.top < 0) {
      bar_dir_y = 1;
    } else if (!split_vert && ob.bottom > 0) {
      bar_dir_y = -1;
    } else if (split_vert && ob.left < 0) {
      bar_dir_x = 1;
    } else if (split_vert && ob.right > 0) {
      bar_dir_x = -1;
    }
    this.state.split_vert = split_vert;
    split_x = props.force_split_x != null ? props.force_split_x : split_x;
    split_y = props.force_split_y != null ? props.force_split_y : split_y;
    bar_dir_x = props.force_bar_dir_x != null ? props.force_bar_dir_x : bar_dir_x;
    bar_dir_y = props.force_bar_dir_y != null ? props.force_bar_dir_y : bar_dir_y;
    force_update = false;
    if (split_y !== this.state.split_y || this.state.bar_dir_x !== bar_dir_x || split_x !== this.state.split_x || this.state.bar_dir_y !== bar_dir_y) {
      // log 'force update',split_y != @state.split_y,@state.bar_dir_x != bar_dir_x,split_y != @state.split_y,@state.bar_dir_x != bar_dir_x
      force_update = true;
    }
    this.state.split_x = split_x;
    this.state.split_y = split_y;
    this.state.bar_dir_x = bar_dir_x;
    this.state.bar_dir_y = bar_dir_y;
    this.state.z_index = (this.context.level + 1) * 100;
    this.state.bar_children_split_vert = bar_children_split_vert;
    this.state.render_unrevealed_children = props.render_unrevealed_children != null ? props.render_unrevealed_children : this.context.render_unrevealed_children;
    this.state.hover_reveal_enabled = props.hover_reveal_enabled != null ? props.hover_reveal_enabled : this.context.hover_reveal_enabled;
    
    // log @state.hover_reveal_enabled
    if (this.state.render_unrevealed_children || this.state.reveal) {
      this.state.render_children = true;
    } else {
      this.state.render_children = false;
    }
    return force_update;
  }

  UNSAFE_componentWillUpdate(props, state) {
    var force_update;
    if (props.show_backdrop) {
      this.state.backdrop_visible = true;
    } else {
      if (this.props.show_backdrop) {
        clearTimeout(this._hide_backdrop_timeout);
        this._hide_backdrop_timeout = setTimeout(() => {
          this._hide_backdrop_timeout = null;
          if (!this.props.show_backdrop) {
            return this.setState({
              backdrop_visible: false
            });
          }
        }, 310);
      } else {
        this.state.backdrop_visible = false;
      }
    }
    if (!props.children) {
      this.state.hide_rendered_children = false;
      return;
    }
    this.state.hide_rendered_children = false;
    this.calculateRevealState(props);
    force_update = this.calculateSplitDirections(props, state);
    if (this.state.skipped_last_children_render && this.state.render_children) {
      this.state.skipped_last_children_render = false;
      force_update = true;
    } else if (!this.state.render_children && this.props.children) {
      this.state.skipped_last_children_render = true;
    }
    
    // log 'update'
    // log @state.hide_rendered_children
    if (force_update) {
      this.state.hide_rendered_children = true;
      return setTimeout(this.forceUpdate.bind(this), 0);
    }
  }

  baseRef(el) {
    boundMethodCheck(this, MenuTab);
    return this.base = el;
  }

  // log @base
  render() {
    var backdrop, bar, bar_style, flex_dir, props, reveal, state, tab_style;
    props = this.props;
    state = this.state;
    if (this.state.backdrop_visible) {
      this.state.z_index = (this.context.level + 1) * 100 + 10000;
    } else {
      this.state.z_index = (this.context.level + 1) * 100;
    }
    reveal = state.reveal;
    backdrop = null;
    if (this.state.backdrop_visible) {
      backdrop = h(Overlay, {
        z_index: -1,
        initial_visible: false,
        onClick: this.onClickBackdrop,
        backdrop_color: props.backdrop_color || this.context.backdrop_color,
        visible: this.props.show_backdrop
      });
    }
    if (!this.state.render_children) {
      return h('div', {
        ref: this.baseRef,
        style: Object.assign({
          zIndex: this.state.z_index
        }, props.tab_style),
        className: css['tab-wrapper'] + ' ' + (props.className || ''),
        onMouseLeave: this.state.hover_reveal_enabled && this.onTabMouseLeave || void 0,
        onMouseEnter: this.state.hover_reveal_enabled && this.onTabMouseEnter || void 0,
        onClick: this.onTabClick
      }, props.content, backdrop);
    }
    bar_style = {};
    if (props.bar_style) {
      Object.assign(bar_style, props.bar_style);
    }
    if (!this.state.split_vert && this.state.split_x > 0) {
      bar_style.right = null;
      bar_style.left = '100%';
    } else if (!this.state.split_vert && this.state.split_x < 0) {
      bar_style.right = '100%';
      bar_style.left = null;
    } else {
      if (this.state.split_x > 0) {
        bar_style.left = '0%';
        bar_style.right = null;
      } else {
        bar_style.left = null;
        bar_style.right = '0%';
      }
    }
    if (this.state.split_vert && this.state.split_y < 0) {
      bar_style.top = null;
      bar_style.bottom = '100%';
    } else if (this.state.split_vert && this.state.split_y > 0) {
      bar_style.top = '100%';
      bar_style.bottom = null;
    }
    if (!this.state.split_vert && this.state.bar_dir_y < 0) {
      flex_dir = 'column-reverse';
    } else if (!this.state.split_vert && this.state.bar_dir_y > 0) {
      flex_dir = 'column';
    } else if (this.state.split_vert && this.state.bar_dir_x < 0) {
      flex_dir = 'row-reverse';
    } else if (this.state.split_vert && this.state.bar_dir_x > 0) {
      flex_dir = 'row';
    }
    bar_style.zIndex = this.state.z_index;
    if (this.state.hide_rendered_children) {
      bar_style.visibility = 'hidden';
    } else {
      bar_style.visible = 'visible';
    }
    // bar_style.transform = 'translate(0,0)'
    bar = h(MenuContext.Provider, {
      value: this.getContext()
    }, h(Bar, {
      big: props.big != null ? props.big : this.context.big,
      className: css['menu-bar'],
      ref: this.childContainer,
      vert: this.state.bar_children_split_vert,
      style: bar_style
    }, props.children));
    tab_style = {};
    if (props.tab_style) {
      Object.assign(tab_style, props.tab_style);
    }
    tab_style.zIndex = this.state.z_index || 'unset';
    tab_style.flexDirection = flex_dir;
    return h('div', {
      ref: this.baseRef,
      className: css['tab-wrapper'] + ' ' + (props.className || ''),
      onMouseLeave: this.state.hover_reveal_enabled && this.onTabMouseLeave || void 0,
      onMouseEnter: this.state.hover_reveal_enabled && this.onTabMouseEnter || void 0,
      // onClick: @onTabClick
      onKeyDown: this.props.onKeyDown,
      style: tab_style
    }, h(MenuTabContext.Provider, {
      value: reveal
    }, props.content), bar, backdrop);
  }

};

// MenuTab.defaultProps = 
MenuTab.contextType = MenuContext;

module.exports = MenuTab;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/Overlay.coffee":
/*!***********************************!*\
  !*** ./components/Overlay.coffee ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Color, IS_TOUCH, Overlay, StyleContext, cn, css, isTouch,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

cn = __webpack_require__(/*! classnames */ "classnames");

Color = __webpack_require__(/*! color */ "color");

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

isTouch = __webpack_require__(/*! ./isTouch.js */ "./components/isTouch.js");

IS_TOUCH = isTouch();

Overlay = class Overlay extends Component {
  constructor(props) {
    super(props);
    this.setBackdropColor = this.setBackdropColor.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.overlayRef = this.overlayRef.bind(this);
    this.state = {
      visible: props.initial_visible != null ? props.initial_visible : props.visible,
      render: props.visible
    };
  }

  setBackdropColor(bg, alpha) {
    boundMethodCheck(this, Overlay);
    if (bg === 'none') {
      return 'none';
    }
    return Color(bg).alpha(alpha).string();
  }

  UNSAFE_componentWillMount() {
    if (!this.props.transparent) {
      this.state.backdrop_color = this.props.backdrop_color || this.context.primary.inv[0];
      this.state.backdrop_opaque_color = this.setBackdropColor(this.state.backdrop_color, this.props.alpha);
    }
    this.state.visible = this.props.initial_visible != null ? this.props.initial_visible : this.props.visible;
    return this.state.render = this.props.visible;
  }

  UNSAFE_componentWillUpdate(props, state) {
    if (props.backdrop_color !== this.props.backdrop_color || (this.context.primary.inv[0] !== this.state.backdrop_color) || props.alpha !== this.props.alpha) {
      if (!props.transparent) {
        state.backdrop_color = props.backdrop_color || this.context.primary.inv[0];
        state.backdrop_opaque_color = this.setBackdropColor(state.backdrop_color, props.alpha);
      }
    }
    if (this.props.visible !== props.visible) {
      if (props.visible) {
        return state.render = true;
      }
    }
  }

  componentDidUpdate(p_props, p_state) {
    if (this.state.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible
      });
      if (!this.props.visible) {
        return this._timeout = setTimeout(() => {
          return this.setState({
            render: this.props.visible
          });
        }, 350);
      }
    }
  }

  componentDidMount(p_props, p_state) {
    if (this.state.visible !== this.props.visible) {
      return setTimeout(() => {
        return this.setState({
          visible: this.props.visible
        });
      }, 0);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
    return this._timeout = null;
  }

  onClick(e) {
    var base;
    boundMethodCheck(this, Overlay);
    if (e.target !== this._overlay) {
      return;
    }
    try {
      e.stopPropagation();
      e.preventDefault();
    } catch (error) {
      e = error;
    }
    if (IS_TOUCH || !this.props.visible) {
      return false;
    }
    if (typeof (base = this.props).onClick === "function") {
      base.onClick(e);
    }
    return false;
  }

  onTouchStart(e) {
    boundMethodCheck(this, Overlay);
    if (e.target !== this._overlay) {
      return;
    }
    this.touch_started = true;
    return false;
  }

  onTouchEnd(e) {
    var base;
    boundMethodCheck(this, Overlay);
    if (e.target !== this._overlay) {
      return;
    }
    try {
      e.stopPropagation();
      e.preventDefault();
    } catch (error) {
      e = error;
    }
    if (!this.touch_started) {
      return false;
    }
    this.touch_started = false;
    if (typeof (base = this.props).onClick === "function") {
      base.onClick(e);
    }
    return false;
  }

  overlayRef(el) {
    boundMethodCheck(this, Overlay);
    return this._overlay = el;
  }

  render() {
    var overlay_style;
    overlay_style = Object.assign({
      zIndex: this.props.z_index || 666,
      display: !this.state.render && 'none' || '',
      pointerEvents: !this.state.render && 'none',
      background: this.props.background || this.state.backdrop_opaque_color || 'none'
    }, this.props.style);
    return h('div', {
      onClick: this.props.pointer_events && this.onClick || null,
      ref: this.overlayRef,
      onTouchStart: this.props.pointer_events && this.onTouchStart || null,
      onTouchEnd: this.props.pointer_events && this.onTouchEnd || null,
      className: cn(css['overlay'], this.props.center && css['center'], !this.state.visible && css['overlay-hidden'], this.props.className, this.props.children_pointer_events && css['overlay-children-pointer-events'], this.props.pointer_events && css['overlay-blocking']),
      style: overlay_style
    }, this.props.children);
  }

};

Overlay.contextType = StyleContext;

Overlay.defaultProps = {
  pointer_events: true,
  transparent: false,
  alpha: 0.96
};

module.exports = Overlay;


/***/ }),

/***/ "./components/Palette.coffee":
/*!***********************************!*\
  !*** ./components/Palette.coffee ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Color, ease_in, ease_in_2, ease_linear, ease_out, ease_out_2, easings, generatePalette, generateStyle, step_mix;

Color = __webpack_require__(/*! color */ "color");

ease_linear = function(i, count) {
  return 1 / count * i;
};

ease_in = function(i, count) {
  var n;
  n = 1 / count * i * (i / count);
  return n;
};

ease_in_2 = function(i, count) {
  return Math.pow(i, 3) / Math.pow(count, 3);
};

ease_out = function(i, count) {
  return 1 / count * Math.sqrt(i * count);
};

ease_out_2 = function(i, count) {
  return Math.pow(1 / count * Math.sqrt(Math.sqrt(i * count) * count), 1.2);
};

step_mix = function(a, b, count, step_fn) {
  var c, c2, i, j, ref, steps;
  // log Style.prototype.ease_linear
  steps = [];
  c = Color(a);
  c2 = Color(b);
  for (i = j = 0, ref = count; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    steps.push(Color(c).mix(c2, step_fn(i, count)).hex());
  }
  return steps;
};

generateStyle = function(props) {
  var default_ease, style;
  default_ease = ease_linear;
  style = {};
  style.primary = generatePalette(props.primary, props.primary_inv, props.step_count || 10, props.primary_ease || default_ease, props.primary_inv_ease || default_ease);
  style.secondary = generatePalette(props.secondary, props.secondary_inv, props.step_count || 10, props.secondary_ease || default_ease, props.secondary_inv_ease || default_ease);
  return style;
};

generatePalette = function(color, inverse_color, step_count, step_fn, inverse_step_fn) {
  var c, default_ease;
  // log step_fn,inverse_step_fn
  c = [];
  color = Color(color);
  inverse_color = Color(inverse_color);
  c[0] = step_mix(color, inverse_color, step_count, step_fn);
  c[1] = step_mix(inverse_color, color, step_count, inverse_step_fn);
  c.color = c[0];
  c.inv = c[1];
  if (Color(c.inv[0]).isDark()) {
    c.inv.is_dark = true;
    c.color.is_dark = false;
  } else {
    c.inv.is_dark = false;
    c.color.is_dark = true;
  }
  default_ease = ease_in_2;
  c.inv.darker = step_mix(inverse_color, '#000', 5, default_ease);
  c.inv.lighter = step_mix(inverse_color, '#fff', 5, default_ease);
  c.color.darker = step_mix(color, '#000', 5, default_ease);
  c.color.lighter = step_mix(color, '#fff', 5, default_ease);
  c.false = Color('red').mix(color, 0.25).hex();
  c.false_hover = Color('red').mix(color, 0.15).hex();
  if (Color(c.false).isDark()) {
    c.false_inv = Color(c.false).mix(Color('white'), 0.9).hex();
    c.false_inv_hover = Color(c.false).mix(Color('white'), 0.95).hex();
  } else {
    c.false_inv = Color(c.false).mix(Color('black'), 0.9).hex();
    c.false_inv_hover = Color(c.false).mix(Color('black'), 0.95).hex();
  }
  c.true = Color('lime').mix(color, 0.25).hex();
  c.true_hover = Color('lime').mix(color, 0.15).hex();
  if (Color(c.true).isDark()) {
    c.true_inv = Color(c.true).mix(Color('white'), 0.9).hex();
    c.true_inv_hover = Color(c.true).mix(Color('white'), 0.95).hex();
  } else {
    c.true_inv = Color(c.true).mix(Color('black'), 0.9).hex();
    c.true_inv_hover = Color(c.true).mix(Color('black'), 0.95).hex();
  }
  c.warn = Color('yellow').mix(color, 0.25).hex();
  return c;
};

easings = {
  ease_linear: ease_linear,
  ease_in: ease_in,
  ease_in_2: ease_in_2,
  ease_out: ease_out,
  ease_out_2: ease_out_2
};

module.exports = {generateStyle, generatePalette, easings};


/***/ }),

/***/ "./components/Section.coffee":
/*!***********************************!*\
  !*** ./components/Section.coffee ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Section, StyleContext, cn, css;

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

cn = __webpack_require__(/*! classnames */ "classnames");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

Section = class Section extends Component {
  render() {
    return h('div', {
      className: cn(css['section'], this.props.className),
      style: this.props.style
    }, h('h2', {
      className: css['section-title'],
      style: {
        opacity: 0.7,
        color: this.context.primary.color[2]
      }
    }, this.props.title, h('div', {
      className: css['section-title-bar'],
      style: {
        background: this.context.primary.inv[1]
      }
    })), this.props.children && h('div', {
      className: cn(css['section-content'], this.props.contentClassName)
    }, this.props.children));
  }

};

Section.contextType = StyleContext;

module.exports = Section;


/***/ }),

/***/ "./components/SquareLoader.coffee":
/*!****************************************!*\
  !*** ./components/SquareLoader.coffee ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SquareLoader, cn, css;

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

cn = __webpack_require__(/*! classnames */ "classnames");

SquareLoader = class SquareLoader extends Component {
  render() {
    return h('div', {
      className: cn(css['loader-wrapper'], this.props.center && css['absolute-center'])
    }, h('div', {
      style: {
        background: this.props.background,
        opacity: this.props.opacity != null ? this.props.opacity : void 0
      },
      className: cn(css['loader'], !this.props.is_loading && css['loader-stop'], this.props.className)
    }));
  }

};

module.exports = SquareLoader;


/***/ }),

/***/ "./components/Style.coffee":
/*!*********************************!*\
  !*** ./components/Style.coffee ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Color, Component, Style, StyleContext, createContext, createElement, css, generatePalette, generateStyle, step_mix;

Color = __webpack_require__(/*! color */ "color");

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

({createElement, Component, createContext} = __webpack_require__(/*! react */ "react"));

global.h = createElement;

global.Component = Component;

({generateStyle, generatePalette} = __webpack_require__(/*! ./Palette */ "./components/Palette.coffee"));

Style = class Style extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.generate(Style.prototype.ease_linear);
  }

  generate(default_ease) {
    // log 'GENERATE'
    if (this.props.style) {
      this.primary = this.props.style.primary;
      return this.secondary = this.props.style.secondary;
    } else {
      this.primary = generatePalette(this.props.primary, this.props.primary_inv, this.props.step_count || 10, this.props.primary_ease || default_ease, this.props.primary_inv_ease || default_ease);
      return this.secondary = generatePalette(this.props.secondary, this.props.secondary_inv, this.props.step_count || 10, this.props.secondary_ease || default_ease, this.props.secondary_inv_ease || default_ease);
    }
  }

  ease_linear(i, count) {
    return 1 / count * i;
  }

  ease_in(i, count) {
    var n;
    n = 1 / count * i * (i / count);
    return n;
  }

  ease_in_2(i, count) {
    return Math.pow(i, 3) / Math.pow(count, 3);
  }

  ease_out(i, count) {
    return 1 / count * Math.sqrt(i * count);
  }

  ease_out_2(i, count) {
    return Math.pow(1 / count * Math.sqrt(Math.sqrt(i * count) * count), 1.2);
  }

  componentDidUpdate(props, state) {
    if (this.props.style !== props.style || this.props.primary !== props.primary || this.props.secondary !== props.secondary) {
      this.generate(Style.prototype.ease_linear);
      return this.setState({});
    }
  }

  render() {
    return h(StyleContext.Provider, {
      value: {
        primary: this.primary,
        secondary: this.secondary
      }
    }, this.props.children);
  }

};

step_mix = function(a, b, count, step_fn) {
  var c, c2, i, j, ref, steps;
  // log Style.prototype.ease_linear
  steps = [];
  c = Color(a);
  c2 = Color(b);
  for (i = j = 0, ref = count; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    steps.push(Color(c).mix(c2, step_fn(i, count)).rgb().string());
  }
  return steps;
};

StyleContext = createContext({});

module.exports = {Style, StyleContext, generateStyle};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/Style.less":
/*!*******************************!*\
  !*** ./components/Style.less ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"center":"lui-center","section":"lui-section","noselect":"lui-noselect","section-content":"lui-section-content","absolute-center":"lui-absolute-center","section-title":"lui-section-title","section-title-bar":"lui-section-title-bar","alert-dot":"lui-alert-dot","input-bar":"lui-input-bar","hint-label":"lui-hint-label","overlay-input":"lui-overlay-input","input-wrap":"lui-input-wrap","modal-shadow":"lui-modal-shadow","btn":"lui-btn","trans_fixed":"lui-trans_fixed","chip":"lui-chip","label":"lui-label","top-label":"lui-top-label","label-opaque":"lui-label-opaque","btn-textarea":"lui-btn-textarea","btn-big":"lui-btn-big","btn-icon-square":"lui-btn-icon-square","overlay-icon":"lui-overlay-icon","overlay-input-val":"lui-overlay-input-val","overlay-input-hint":"lui-overlay-input-hint","overlay-input-val-wrap":"lui-overlay-input-val-wrap","input":"lui-input","hidden":"lui-hidden","label-2":"lui-label-2","checkbox-circle":"lui-checkbox-circle","checkbox-circle-inner":"lui-checkbox-circle-inner","active":"lui-active","toggle":"lui-toggle","toggle-on":"lui-toggle-on","toggle-off":"lui-toggle-off","input-color-circle":"lui-input-color-circle","input-color-text":"lui-input-color-text","disabled":"lui-disabled","toggle-bar":"lui-toggle-bar","sqaure-btn":"lui-sqaure-btn","square-btn-big":"lui-square-btn-big","square-btn-small":"lui-square-btn-small","bar":"lui-bar","bar-btn":"lui-bar-btn","bar-vert":"lui-bar-vert","tab-wrapper":"lui-tab-wrapper","bar-big":"lui-bar-big","bar-small":"lui-bar-small","tab-content":"lui-tab-content","menu-bar":"lui-menu-bar","overlay":"lui-overlay","overlay-hidden":"lui-overlay-hidden","overlay-slide":"lui-overlay-slide","overlay-children-pointer-events":"lui-overlay-children-pointer-events","overlay-blocking":"lui-overlay-blocking","overlay-alert":"lui-overlay-alert","loader-wrapper":"lui-loader-wrapper","loader":"lui-loader","_ii_rotate":"lui-_ii_rotate","loader-stop":"lui-loader-stop"};

/***/ }),

/***/ "./components/index.coffee":
/*!*********************************!*\
  !*** ./components/index.coffee ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AlertDot, AlertOverlay, Bar, Chip, Input, Menu, MenuTab, Overlay, Section, SquareLoader, Style, StyleContext, generateStyle;

({Style, StyleContext, generateStyle} = __webpack_require__(/*! ./Style */ "./components/Style.coffee"));

Bar = __webpack_require__(/*! ./Bar */ "./components/Bar.coffee");

Menu = __webpack_require__(/*! ./Menu */ "./components/Menu.coffee");

MenuTab = __webpack_require__(/*! ./MenuTab */ "./components/MenuTab.coffee");

Input = __webpack_require__(/*! ./Input */ "./components/Input.coffee");

Section = __webpack_require__(/*! ./Section */ "./components/Section.coffee");

AlertDot = __webpack_require__(/*! ./AlertDot */ "./components/AlertDot.coffee");

Overlay = __webpack_require__(/*! ./Overlay */ "./components/Overlay.coffee");

AlertOverlay = __webpack_require__(/*! ./AlertOverlay */ "./components/AlertOverlay.coffee");

SquareLoader = __webpack_require__(/*! ./SquareLoader */ "./components/SquareLoader.coffee");

Chip = __webpack_require__(/*! ./Chip */ "./components/Chip.coffee");

module.exports.Bar = Bar;

module.exports.Input = Input;

module.exports.Menu = Menu;

module.exports.Style = Style;

module.exports.StyleContext = StyleContext;

module.exports.generateStyle = generateStyle;

module.exports.Section = Section;

module.exports.MenuTab = MenuTab;

module.exports.AlertDot = AlertDot;

module.exports.Overlay = Overlay;

module.exports.AlertOverlay = AlertOverlay;

module.exports.SquareLoader = SquareLoader;

module.exports.Chip = Chip;


/***/ }),

/***/ "./components/isTouch.js":
/*!*******************************!*\
  !*** ./components/isTouch.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

module.exports = is_touch_device

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "color":
/*!************************!*\
  !*** external "color" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("color");

/***/ }),

/***/ "re-slide":
/*!***************************!*\
  !*** external "re-slide" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("re-slide");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=lui.js.map