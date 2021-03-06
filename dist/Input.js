// Generated by CoffeeScript 2.5.1
(function() {
  var AlertDot, CircleToggle, Color, IS_TOUCH, Input, Slide, StyleContext, TOUCH_V, cn, css, isTouch,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

  css = require('./Style.less');

  cn = require('classnames');

  Color = require('color');

  Slide = require('re-slide');

  AlertDot = require('./AlertDot.coffee');

  CircleToggle = require('./CircleToggle.coffee');

  ({StyleContext} = require('./Style.coffee'));

  isTouch = require('./isTouch.js');

  IS_TOUCH = isTouch();

  TOUCH_V = 0;

  window.addEventListener('touchmove', function(e) {
    return TOUCH_V = Date.now();
  });

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
      if (props.type === 'color' && props.value) {
        try {
          this.state.is_dark = Color(props.value).isDark();
        } catch (error) {
          this.state.is_dark = false;
        }
      }
      this.list = [];
    }

    onInput(e) {
      var chips, file, input_files, j, len, ref;
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
          chips = this.props.chips || [];
          if (e.target.value[e.target.value.length - 1] === ',') {
            chips.push(e.target.value.substring(0, e.target.value.length - 2));
          } else if (!chips.length) {
            chips.push(e.target.value);
          } else {
            chips[chips.length - 1] = e.target.value;
          }
          this.props.onInput(chips);
          return;
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
      if (this.props.type === 'color') {
        return this._input.click();
      } else if (this.props.type === 'checkbox') {
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
      if (this.props.type === 'color') {
        return this._input.click();
      }
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
      if (this.props.type === 'color' && props.value !== this.props.value && this.props.value) {
        try {
          is_dark = Color(props.value).isDark();
        } catch (error) {
          is_dark = false;
        }
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

    getChipStyle() {
      var btn_style;
      btn_style = {};
      if (this.props.btn_type === 'primary') {
        btn_style.color = this.context.secondary.color[0];
        btn_style.background = this.context.secondary.inv[2];
      } else if (this.props.btn_type === 'flat') {
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

    renderChips() {
      var chips, ref;
      if ((ref = this.props.chips) != null ? ref.length : void 0) {
        chips = this.props.chips.slice(0, this.props.chips.length - 1);
      } else {
        chips = [];
      }
      return chips.map((item, i) => {
        if (this.props.chipRenderer) {
          item = this.props.chipRenderer(item);
        }
        return h('div', {
          key: 'chip-' + i,
          className: css['chip'],
          style: this.getChipStyle()
        }, item);
      });
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
      var autofill_buttons, autofill_match_res, bar, bar_style, button_style, chips, color_circle, enter_hint, focus, hint_label, icon, icon_img, icon_style, input, input_hidden, input_name, input_props, input_val_style, label, label2, outer_props, overlay_autofill_buttons, overlay_icon, overlay_input, overlay_input_text, props, select, state, style, toggle, toggle_bar_off_style, toggle_bar_on_style, toggle_bar_style, toggle_circle_fill_color, value, wrap_input_style;
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
          if (this.props.checked || this.props.select) {
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
            is_selected: props.checked || props.select
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
            pos: (props.checked || props.select) ? 0 : 2
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
      if (props.icon_img) {
        icon_img = h('img', {
          onClick: this.props.onIconClick,
          style: {
            height: 40,
            width: 40
          },
          src: props.icon_img
        });
      }
      if (props.label) {
        label = h('div', {
          style: {
            // color: props.top_label && @context.primary.color[0] || undefined
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
        chips = this.renderChips();
        value = this.state.chip_input_value;
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
        if (props.type === 'range') {
          input_props.style = {
            background: button_style.color,
            borderRadius: DIM * 1 / 8
          };
        } else if (this.props.autoheight) {
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
      if (this.props.pad) {
        style.padding = DIM * (1 / 3);
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
      if (input && props.type === 'text' || props.type === 'email' || props.type === 'phone' || props.type === 'input') {
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
      if (this.props.margin_left || this.props.margin_top || this.props.margin_bottom || this.props.margin_right) {
        style.marginLeft = this.props.margin_left && DIM * 1 / 8 || '0px';
        style.marginRight = this.props.margin_right && DIM * 1 / 8 || '0px';
        style.marginBottom = this.props.margin_bottom && DIM * 1 / 8 || '0px';
        style.marginTop = this.props.margin_top && DIM * 1 / 8 || '0px';
      }
      // log "FULL",@props.full
      outer_props = {
        onClick: !IS_TOUCH && this.onClick || void 0,
        htmlFor: input_name,
        ref: this.outerRef,
        onTouchStart: IS_TOUCH && this.onTouchStart || void 0,
        onTouchEnd: IS_TOUCH && this.onTouchEnd || void 0,
        onMouseEnter: !IS_TOUCH && this.onMouseEnter || void 0,
        onMouseLeave: !IS_TOUCH && this.onMouseLeave || void 0,
        className: cn(IS_TOUCH && (props.type === 'button' || props.type === 'label') && css['noselect'], props.hint && css['trans_fixed'], props.type === 'textarea' && css['btn-textarea'], props.big && css['btn-big'], css['btn'], !label && icon && !this.props.children && props.type === 'button' && css['btn-icon-square'], props.disabled && css['disabled'], props.type === 'select' && css['type-select'], props.className, props.top_label && css['top-label-btn'], props.full && css['input-full-w']),
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
      return h(props.href && 'a' || 'label', outer_props, toggle, chips, icon, icon_img, label, bar, input, color_circle, label2, overlay_icon, overlay_autofill_buttons, props.children, hint_label);
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

}).call(this);

//# sourceMappingURL=Input.js.map
