// Generated by CoffeeScript 2.5.1
(function() {
  var Color, IS_TOUCH, Overlay, StyleContext, cn, css, isTouch,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

  cn = require('classnames');

  Color = require('color');

  css = require('./Style.less');

  ({StyleContext} = require('./Style.coffee'));

  isTouch = require('./isTouch.js');

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

}).call(this);

//# sourceMappingURL=Overlay.js.map
