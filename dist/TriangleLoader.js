// Generated by CoffeeScript 2.5.0
(function() {
  var PATH_H, PATH_W, StyleContext, TriangleLoader,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

  PATH_W = 35.24;

  PATH_H = 39;

  ({StyleContext} = require('./Style.coffee'));

  TriangleLoader = class TriangleLoader extends Component {
    constructor(props) {
      super(props);
      // stopAll: =>
      // 	clearInterval(@_rotate)
      // 	clearTimeout(@_stop_timer)

      // 	@_stop_timer = undefined 
      // 	@_rotate = undefined
      this.rotate = this.rotate.bind(this);
      this.svgRef = this.svgRef.bind(this);
      this.state = {
        rotation: 120,
        dir: 1
      };
    }

    componentDidMount() {
      return this.checkState();
    }

    componentWillUnmount() {
      return this.stopRotate();
    }

    checkState() {
      if (!this.props.is_loading && this._rotate) {
        this.stopRotate();
      }
      if (this.props.is_loading && !this._rotate) {
        return this.startRotate();
      }
    }

    componentDidUpdate(props) {
      // log @props.is_loading,props.is_loading
      if (this.props.is_loading !== props.is_loading) {
        return this.checkState();
      }
    }

    startRotate() {
      this._rotate = setInterval(this.rotate, 400);
      // log 'START ROTATE'
      return this.rotate();
    }

    stopRotate() {
      clearInterval(this._rotate);
      return this._rotate = void 0;
    }

    rotate() {
      boundMethodCheck(this, TriangleLoader);
      // log @state.rotation
      // if !@_svg
      // 	clearInterval(@_rotate)
      // 	@_rotate = undefined
      // 	return false
      return this.setState({
        dir: this.state.dir * -1,
        rotation: this.props.start_rotation + (this.state.rotation + 120 * this.state.dir)
      });
    }

    svgRef(el) {
      boundMethodCheck(this, TriangleLoader);
      return this._svg = el;
    }

    render() {
      var cx, cy, opacity, rot, scale;
      // log (@state.rotation)
      scale = (this.props.dim / 35.24) * .4;
      rot = this.state.rotation;
      cx = (this.props.dim / 2) / scale - PATH_W / 2;
      cy = (this.props.dim / 2) / scale - PATH_H / 2;
      if (this.props.opacity != null) {
        opacity = this.props.opacity;
      } else if (this._rotate) {
        opacity = 1;
      } else {
        opacity = .5;
      }
      
      // log @props.is_loading
      return h('svg', {
        height: this.props.dim,
        width: this.props.dim,
        style: {
          width: this.props.dim,
          height: this.props.dim,
          pointerEvents: 'none',
          transform: `rotate(${rot}deg)`,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: opacity
        },
        ref: this.svgRef
      }, h('path', {
        d: 'M12.8501 2.91051C14.9747 -0.769488 20.2863 -0.769487 22.411 2.91051L34.5007 23.8505C36.6253 27.5305 33.9695 32.1305 29.7202 32.1305H5.54081C1.29151 32.1305 -1.3643 27.5305 0.760348 23.8505L12.8501 2.91051Z',
        fill: this.props.color || this.context.primary.color[4],
        // opacity: @props.is_loading && 1 || 0.5
        transition: 'opacity',
        // transition: 'transform 0.3s ease'
        transform: `scale(${scale}) translate(${cx} ${cy}) `
      }));
    }

  };

  TriangleLoader.defaultProps = {
    color: 'black',
    dim: 30,
    start_rotation: 0
  };

  TriangleLoader.contextType = StyleContext;

  module.exports = TriangleLoader;

}).call(this);

//# sourceMappingURL=TriangleLoader.js.map