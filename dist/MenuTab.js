// Generated by CoffeeScript 2.5.1
(function() {
  var Bar, MenuTab, MenuTabContext, Overlay, StyleContext, createContext, css,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

  Bar = require('./Bar.coffee');

  css = require('./Style.less');

  Overlay = require('./Overlay.coffee');

  ({createContext} = require('react'));

  ({StyleContext} = require('./Style.coffee'));

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

}).call(this);

//# sourceMappingURL=MenuTab.js.map
