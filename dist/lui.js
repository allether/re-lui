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
    alert_style = {};
    if (this.props.color) {
      alert_style.background = this.props.color;
    } else if (this.props.error) {
      alert_style.background = this.context.secondary.error;
    } else {
      alert_style.background = this.context.secondary.highlight;
    }
    return h('div', {
      className: css['alert-dot'],
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

  componentWillUpdate(props, state) {
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
      height: 40,
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
    // log props.vert
    bar_props = {
      ref: this.baseRef,
      className: cn(this.props.className, this.props.btn && css['bar-btn'], this.props.vert && css['bar-vert'], css['bar'], this.props.big && css['bar-big'] || css['bar-small']),
      style: this.props.style
    };
    
    // bar_props = Object.assign {},@props,my_props
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

var AlertDot, CircleToggle, Color, Input, Slide, StyleContext, cn, css,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

cn = __webpack_require__(/*! classnames */ "classnames");

Color = __webpack_require__(/*! color */ "color");

Slide = __webpack_require__(/*! re-slide */ "re-slide");

AlertDot = __webpack_require__(/*! ./AlertDot.coffee */ "./components/AlertDot.coffee");

CircleToggle = __webpack_require__(/*! ./CircleToggle.coffee */ "./components/CircleToggle.coffee");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

Input = class Input extends Component {
  constructor(props) {
    super(props);
    this.onInput = this.onInput.bind(this);
    // return false
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.setValue = this.setValue.bind(this);
    this.inputRef = this.inputRef.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.state = {
      is_touch: false,
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
    // e.preventDefault()
    // e.stopPropagation()
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
  }

  onFocus(e) {
    var base;
    boundMethodCheck(this, Input);
    'input focus event';
    this.setState({
      focus: true
    });
    return typeof (base = this.props).onFocus === "function" ? base.onFocus(e) : void 0;
  }

  onBlur(e) {
    var base;
    boundMethodCheck(this, Input);
    'input blur event';
    this.setState({
      focus: false
    });
    return typeof (base = this.props).onBlur === "function" ? base.onBlur(e) : void 0;
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
    var base, base1, code;
    boundMethodCheck(this, Input);
    code = e.key;
    if (code === 'Enter' && this.props.onEnter) {
      this._input.blur();
      return this.props.onEnter(e);
    }
    if (code === 'Enter' && this.props.type === 'checkbox') {
      return this._input.click();
    } else if (this.props.type === 'list') {
      if ((code === 'Enter') && this.props.value) {
        return typeof (base = this.props).onInput === "function" ? base.onInput(this.props.value + ',') : void 0;
      } else if (code === 'Backspace' && !this._input.value && this.props.value) {
        log(this.props.value.substr(0, this.props.value.length - 1));
        return typeof (base1 = this.props).onInput === "function" ? base1.onInput(this.props.value.substr(0, this.props.value.length - 1)) : void 0;
      }
    }
  }

  onClick(e) {
    var base, ref, ref1;
    boundMethodCheck(this, Input);
    if ((ref = this._input) != null) {
      ref.focus();
    }
    if (!this.state.is_touch) {
      if ((ref1 = this._input) != null) {
        ref1.click();
      }
      return typeof (base = this.props).onClick === "function" ? base.onClick(e) : void 0;
    }
  }

  onInputClick(e) {
    boundMethodCheck(this, Input);
    e.stopPropagation();
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

  componentWillUpdate(props) {
    if (props.type === 'color' && props.value !== this.props.value) {
      this.state.is_dark = Color(props.value).isDark();
    }
    if (props.type === 'file' && this.state.input_files && !props.value) {
      return this.setState({
        input_files: null
      });
    }
  }

  onTouchStart(e) {
    var base;
    boundMethodCheck(this, Input);
    this.setState({
      is_touch: true,
      hover: true
    });
    return typeof (base = this.props).onTouchStart === "function" ? base.onTouchStart(e) : void 0;
  }

  onTouchEnd(e) {
    var base, ref, ref1;
    boundMethodCheck(this, Input);
    this.setState({
      hover: false
    });
    if (typeof (base = this.props).onClick === "function") {
      base.onClick(e);
    }
    if (this.props.type !== 'file') {
      if ((ref = this._input) != null) {
        ref.focus();
      }
      return (ref1 = this._input) != null ? ref1.click() : void 0;
    }
  }

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
    if (props.btn_type === 'primary') {
      if (select) {
        btn_style.color = this.context.secondary.inv[0];
        btn_style.background = this.context.secondary.color[0];
      } else if (focus) {
        btn_style.color = this.context.secondary.inv[0];
        btn_style.background = this.context.secondary.color[0];
      } else {
        btn_style.color = this.context.secondary.inv[2];
        btn_style.background = this.context.secondary.color[1];
      }
    } else if (props.btn_type === 'flat') {
      if (select) {
        btn_style.color = this.context.primary.color[0];
        btn_style.background = this.context.primary.inv[1];
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
      btn_style.color = this.context.secondary.inv[0];
      btn_style.background = this.context.secondary.color[2];
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
      if (props.btn_type === 'primary') {
        if (focus || select) {
          i_style.color = this.context.secondary.inv[0];
        } else {
          i_style.color = this.context.secondary.inv[2];
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
    value = props.value != null ? props.value : state.value;
    select = props.select;
    focus = state.focus;
    bar_style = {};
    if (!value) {
      if (props.required && !props.value) {
        bar_style.background = this.context.secondary.warn;
      } else if (props.btn_type === 'primary') {
        bar_style.background = this.context.secondary.color[2];
        bar_style.color = this.context.secondary.color[3];
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
    } else if (props.color === 'color') {
      bar_style.background = props.value;
    } else {
      if (props.btn_type === 'primary') {
        bar_style.background = this.context.secondary.inv[0];
      } else if (props.btn_type === 'flat') {
        bar_style.background = this.context.primary.color[1];
      } else {
        bar_style.background = this.context.primary.color[2];
      }
    }
    if ((!props.label || props.top_label) && !props.i) {
      bar_style.marginLeft = 0;
    }
    return bar_style;
  }

  
  // removeChip: (i)->

  // 	@forceUpdate()
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

  renderInput() {
    var bar, bar_style, button_style, chips, color_circle, focus, icon, icon_style, input, input_hidden, input_name, input_props, label, label2, outer_props, overlay_icon, props, ref, select, state, style, toggle, toggle_bar_off_style, toggle_bar_on_style, toggle_bar_style, toggle_circle_fill_color, value;
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
            background: this.context.secondary.color[0],
            color: this.context.secondary.color[1]
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
    if (props.i) {
      icon = h('i', {
        onClick: this.props.onIconClick,
        className: props.i_class || 'material-icons',
        style: icon_style
      }, props.i);
    } else if (props.i_class) {
      icon = h('i', {
        onClick: this.props.onIconClick,
        className: props.i_class,
        style: icon_style
      });
    }
    if (props.label) {
      label = h('div', {
        style: {
          color: props.top_label && this.context.primary.color[0] || void 0
        },
        className: cn(value && css['label-opaque'], css['label'], props.top_label && css['top-label'])
      }, props.label);
    }
    if (props.bar) {
      bar = h('div', {
        className: css['input-bar'],
        style: Object.assign(bar_style, props.bar_style)
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
        name: input_name,
        onDragEnter: this.onDragEnter,
        ref: this.inputRef,
        placeholder: this.props.placeholder,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        value: value
      };
      if (this.props.input_props) {
        Object.assign(input_props, this.props.input_props);
      }
      
      // input_props = Object.assign {},props,self_input_props

      // if props.type == 'button'
      // input_props.style = cursor: 'pointer'
      input_props.onClick = this.onInputClick;
      if (props.input_props) {
        Object.assign(input_props, props.input_props);
      }
      if (props.type === 'textarea') {
        input = h('textarea', input_props);
      } else if (props.type === 'select') {
        input = h('select', input_props, (ref = props.options) != null ? ref.map(function(opt, i) {
          return h('option', {
            key: i,
            value: opt
          }, opt);
        }) : void 0);
      } else {
        input = h('input', input_props);
      }
    }
    outer_props = {
      onClick: !IS_TOUCH && this.onClick || void 0,
      htmlFor: input_name,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      onMouseEnter: !this.state.is_touch && this.onMouseEnter || void 0,
      onMouseLeave: !this.state.is_touch && this.onMouseLeave || void 0,
      className: cn(props.type === 'textarea' && css['btn-textarea'], props.big && css['btn-big'], css['btn'], css['input'], !label && icon && props.type === 'button' && css['btn-icon-square'], props.disabled && css['disabled'], props.className),
      href: props.href,
      style: style
    };
    Object.assign(outer_props, this.props.outer_props);
    
    // if props.invalid || props.is_valid == false
    // 	alert = h AlertDot,
    // 		error: yes
    return h(props.href && 'a' || 'label', outer_props, toggle, chips, icon, label, bar, input, color_circle, label2, overlay_icon, props.children);
  }

};

Input.contextType = StyleContext;

Input.defaultProps = {
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

  componentWillUnmount() {
    return clearTimeout(this._hide_backdrop_timeout);
  }

  componentWillMount() {
    this.state.hide_rendered_children = true;
    this.calculateRevealState(this.props, this.state);
    if (this.calculateSplitDirections(this.props, this.state)) {
      this.state.hide_rendered_children = true;
      return setTimeout(this.forceUpdate.bind(this), 0);
    }
  }

  revealSelfTab(e) {
    boundMethodCheck(this, MenuTab);
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

  componentWillUpdate(props, state) {
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
      onClick: this.onTabClick,
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

var Color, Overlay, StyleContext, cn, css,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

cn = __webpack_require__(/*! classnames */ "classnames");

Color = __webpack_require__(/*! color */ "color");

css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

({StyleContext} = __webpack_require__(/*! ./Style.coffee */ "./components/Style.coffee"));

Overlay = class Overlay extends Component {
  constructor(props) {
    super(props);
    this.setBackdropColor = this.setBackdropColor.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.state = {
      visible: props.initial_visible != null ? props.initial_visible : props.visible,
      render: props.visible
    };
  }

  setBackdropColor(bg) {
    boundMethodCheck(this, Overlay);
    if (bg === 'none') {
      return 'none';
    }
    return Color(bg).alpha(.9).string();
  }

  componentWillMount() {
    if (!this.props.transparent) {
      this.state.backdrop_color = this.props.backdrop_color || this.context.primary.inv[0];
      this.state.backdrop_opaque_color = this.setBackdropColor(this.state.backdrop_color);
    }
    this.state.visible = this.props.initial_visible != null ? this.props.initial_visible : this.props.visible;
    return this.state.render = this.props.visible;
  }

  componentWillUpdate(props, state) {
    if (props.backdrop_color !== this.props.backdrop_color || (this.context.primary.inv[0] !== this.state.backdrop_color)) {
      if (!props.transparent) {
        state.backdrop_color = props.backdrop_color || this.context.primary.inv[0];
        state.backdrop_opaque_color = this.setBackdropColor(state.backdrop_color);
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
    if (this._touch || !this.props.visible) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return typeof (base = this.props).onClick === "function" ? base.onClick(e) : void 0;
  }

  onTouchStart(e) {
    var base;
    boundMethodCheck(this, Overlay);
    this._touch = true;
    if (!this.props.visible) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return typeof (base = this.props).onClick === "function" ? base.onClick(e) : void 0;
  }

  render() {
    var overlay_style;
    overlay_style = Object.assign({
      zIndex: this.props.z_index || 666,
      display: !this.state.render && 'none' || '',
      pointerEvents: !this.state.render && 'none',
      background: this.props.transparent && 'none' || this.state.backdrop_opaque_color
    }, this.props.style);
    return h('div', {
      onClick: !IS_TOUCH && this.onClick || void 0,
      onTouchStart: this.onTouchStart,
      className: cn(css['overlay'], this.props.center && css['center'], !this.state.visible && css['overlay-hidden'], this.props.className, this.props.transparent && css['overlay-transparent']),
      style: overlay_style
    }, this.props.children);
  }

};

Overlay.contextType = StyleContext;

module.exports = Overlay;


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
      style: {
        background: this.props.background
      },
      className: cn(css['loader'], !this.props.is_loading && css['loader-stop'], this.props.className)
    });
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

/* WEBPACK VAR INJECTION */(function(global) {var Color, Component, Style, StyleContext, createContext, createElement, createPallet, css, darkenPallet, generateStyle, lightenPallet,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

Color = __webpack_require__(/*! color */ "color");

// require 'normalize.css'
css = __webpack_require__(/*! ./Style.less */ "./components/Style.less");

({createElement, Component, createContext} = __webpack_require__(/*! react */ "react"));

global.h = createElement;

global.Component = Component;

global.IS_TOUCH = __webpack_require__(/*! ./is_touch */ "./components/is_touch.js")();

StyleContext = createContext({});

createPallet = function(color, inv, factors) {
  var c, color_factor, inv_factor;
  color_factor = color_factor || 1;
  inv_factor = inv_factor || 1;
  c = {};
  c.color = [color.hex(), color.mix(inv, factors.color[0]).hex(), color.mix(inv, factors.color[1]).hex(), color.mix(inv, factors.color[2]).hex(), color.mix(inv, factors.color[3]).hex()];
  c.inv = [inv.hex(), inv.mix(color, factors.inv[0]).hex(), inv.mix(color, factors.inv[1]).hex(), inv.mix(color, factors.inv[2]).hex(), inv.mix(color, factors.inv[3]).hex()];
  return c;
};

lightenPallet = (props) => {
  var c;
  c = createPallet(props.color, props.color.lighten(props.lighten_factor), props.factors);
  c.highlight = props.color.lighten(1).saturate(.85).hex();
  c.true = props.color.lighten(1).mix(props.true, 0.7).hex();
  c.false = props.color.lighten(1).mix(props.false, 0.7).hex();
  c.warn = props.color.lighten(1).mix(props.warn, 0.7).hex();
  return c;
};

darkenPallet = function(props) {
  var c;
  c = createPallet(props.color, props.color.darken(props.darken_factor), props.factors);
  c.highlight = props.color.darken(0.5).saturate(.85).hex();
  c.true = props.color.darken(0.5).mix(props.true, 0.7).hex();
  c.false = props.color.darken(0.5).mix(props.false, 0.7).hex();
  c.warn = props.color.darken(0.5).mix(props.warn, 0.7).hex();
  return c;
};

generateStyle = function(props) {
  var c_false, c_true, c_warn, primary, primary_c, secondary, secondary_c;
  primary_c = Color(props.primary);
  secondary_c = Color(props.secondary);
  c_true = Color(props.true);
  c_false = Color(props.false);
  c_warn = Color(props.warn);
  if (primary_c.isLight()) {
    primary = darkenPallet({
      color: primary_c,
      lighten_factor: props.lighten_factor,
      darken_factor: props.darken_factor,
      factors: props.primary_factors,
      true: c_true,
      false: c_false,
      warn: c_warn
    });
  } else {
    primary = lightenPallet({
      color: primary_c,
      lighten_factor: props.lighten_factor,
      darken_factor: props.darken_factor,
      factors: props.primary_factors,
      true: c_true,
      false: c_false,
      warn: c_warn
    });
  }
  if (secondary_c.isLight()) {
    secondary = darkenPallet({
      color: secondary_c,
      lighten_factor: props.lighten_factor,
      darken_factor: props.darken_factor,
      factors: props.secondary_factors,
      true: c_true,
      false: c_false,
      warn: c_warn
    });
  } else {
    secondary = lightenPallet({
      color: secondary_c,
      lighten_factor: props.lighten_factor,
      darken_factor: props.darken_factor,
      factors: props.secondary_factors,
      true: c_true,
      false: c_false,
      warn: c_warn
    });
  }
  return {
    primary: primary,
    secondary: secondary
  };
};

Style = class Style extends Component {
  constructor() {
    super();
    this.renderStyle = this.renderStyle.bind(this);
    this.state = {
      rendered_style: true
    };
  }

  componentWillMount() {
    return this.renderStyle(this.props, this.state);
  }

  renderStyle(props, state) {
    boundMethodCheck(this, Style);
    if (props.style) {
      this._theme = props.style;
    } else {
      this._theme = generateStyle({
        lighten_factor: props.lighten_factor,
        darken_factor: props.darken_factor,
        primary_factors: props.primary_factors,
        secondary_factors: props.secondary_factors,
        false: props.false,
        true: props.true,
        warn: props.warn,
        primary: props.primary,
        secondary: props.secondary
      });
    }
    this.primary = this._theme.primary;
    return this.secondary = this._theme.secondary;
  }

  componentWillUpdate(props, state) {
    if (this.props.style !== props.style || this.props.primary !== props.primary || this.props.secondary !== props.secondary || this.props.tertiary !== props.tertiary) {
      this.renderStyle(props, state);
      return state.rendered_style = true;
    }
  }

  componentDidUpdate() {
    if (this.state.rendered_style) {
      return this.state.rendered_style = false;
    }
  }

  render() {
    return h(StyleContext.Provider, {
      value: this._theme
    }, this.props.children);
  }

};

Style.defaultProps = {
  primary: '#18262a',
  secondary: 'whitesmoke',
  true: '#21FF48',
  false: '#FC0020',
  warn: '#E7BC08',
  darken_factor: .75,
  lighten_factor: 9.0,
  primary_factors: {
    color: [.1, .3, .6, .9],
    inv: [.05, .1, .15, .25]
  },
  secondary_factors: {
    color: [.1, .3, .6, .9],
    inv: [.05, .1, .15, .25]
  }
};

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
module.exports = {"center":"lui-center","section":"lui-section","section-content":"lui-section-content","section-title":"lui-section-title","section-title-bar":"lui-section-title-bar","alert-dot":"lui-alert-dot","input-bar":"lui-input-bar","modal-shadow":"lui-modal-shadow","btn":"lui-btn","chip":"lui-chip","label":"lui-label","top-label":"lui-top-label","label-opaque":"lui-label-opaque","btn-textarea":"lui-btn-textarea","btn-big":"lui-btn-big","btn-icon-square":"lui-btn-icon-square","overlay-icon":"lui-overlay-icon","hidden":"lui-hidden","label-2":"lui-label-2","checkbox-circle":"lui-checkbox-circle","checkbox-circle-inner":"lui-checkbox-circle-inner","active":"lui-active","toggle":"lui-toggle","toggle-on":"lui-toggle-on","toggle-off":"lui-toggle-off","input-color-circle":"lui-input-color-circle","input-color-text":"lui-input-color-text","disabled":"lui-disabled","toggle-bar":"lui-toggle-bar","sqaure-btn":"lui-sqaure-btn","square-btn-big":"lui-square-btn-big","square-btn-small":"lui-square-btn-small","bar":"lui-bar","bar-btn":"lui-bar-btn","bar-vert":"lui-bar-vert","tab-wrapper":"lui-tab-wrapper","bar-big":"lui-bar-big","bar-small":"lui-bar-small","tab-content":"lui-tab-content","menu-bar":"lui-menu-bar","overlay":"lui-overlay","overlay-hidden":"lui-overlay-hidden","overlay-slide":"lui-overlay-slide","overlay-transparent":"lui-overlay-transparent","loader":"lui-loader","_ii_rotate":"lui-_ii_rotate","loader-stop":"lui-loader-stop"};

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

/***/ "./components/is_touch.js":
/*!********************************!*\
  !*** ./components/is_touch.js ***!
  \********************************/
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