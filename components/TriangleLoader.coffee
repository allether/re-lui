PATH_W = 35.24
PATH_H = 39

{StyleContext} = require './Style.coffee'

class TriangleLoader extends Component
	constructor: (props)->
		super props
		@state = 
			rotation: 120
			dir: 1
	componentDidMount: ->
		@checkState()

	componentWillUnmount: ->
		@stopRotate()
	
	checkState: ->
		if !@props.is_loading && @_rotate
			@stopRotate()

		if @props.is_loading && !@_rotate
			@startRotate()
			

	componentDidUpdate: (props)->
		# log @props.is_loading,props.is_loading
		if @props.is_loading != props.is_loading
			@checkState()

	startRotate: ->
		@_rotate = setInterval(@rotate,400)
		# log 'START ROTATE'
		@rotate()

	stopRotate: ->
		clearInterval(@_rotate)
		@_rotate = undefined


	# stopAll: =>
	# 	clearInterval(@_rotate)
	# 	clearTimeout(@_stop_timer)

	# 	@_stop_timer = undefined 
	# 	@_rotate = undefined
		

	
	rotate: =>
		# log @state.rotation
		# if !@_svg
		# 	clearInterval(@_rotate)
		# 	@_rotate = undefined
		# 	return false

		@setState
			dir: (@state.dir) * -1
			rotation: @props.start_rotation + (@state.rotation + 120 * @state.dir)
	
	svgRef: (el)=>
		@_svg = el
	
	render: ->
		# log (@state.rotation)
		

		scale = (@props.dim/35.24)*.4


		rot = @state.rotation

		cx = (@props.dim / 2 ) / scale - PATH_W/2
		cy = (@props.dim / 2 ) / scale - PATH_H/2


		


		if @props.opacity?
			opacity = @props.opacity
		else if @_rotate
			opacity = 1
		else
			opacity = .5
	 
		# log @props.is_loading
		h 'svg',
			height: @props.dim
			width: @props.dim
			style:	
				width: @props.dim
				height: @props.dim
				pointerEvents: 'none'
				transform: "rotate(#{rot}deg)"
				transition: 'opacity 0.3s ease, transform 0.3s ease'
				opacity: opacity
			ref: @svgRef
			h 'path',
				d: 'M12.8501 2.91051C14.9747 -0.769488 20.2863 -0.769487 22.411 2.91051L34.5007 23.8505C36.6253 27.5305 33.9695 32.1305 29.7202 32.1305H5.54081C1.29151 32.1305 -1.3643 27.5305 0.760348 23.8505L12.8501 2.91051Z'
				fill: @props.color || @context.primary.color[4]
				# opacity: @props.is_loading && 1 || 0.5
				transition: 'opacity'
				# transition: 'transform 0.3s ease'
				transform: "scale(#{scale}) translate(#{cx} #{cy}) "
				

TriangleLoader.defaultProps = 
	color: 'black'
	dim: 30
	start_rotation: 0

TriangleLoader.contextType = StyleContext
module.exports = TriangleLoader