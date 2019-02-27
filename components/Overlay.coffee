cn = require 'classnames'
Color = require 'color'
css = require './Style.less'
{StyleContext} = require './Style.coffee'


class Overlay extends Component
	constructor: (props)->
		super(props)
		@state=
			visible: if props.initial_visible? then props.initial_visible else props.visible
			render: props.visible
			
		
		
	
	setBackdropColor: (bg)=>
		if bg == 'none'
			return 'none'
		return Color(bg).alpha(.9).string()
	
	componentWillMount: ->

		if !@props.transparent
			@state.backdrop_color = @props.backdrop_color || @context.primary.inv[0]
			@state.backdrop_opaque_color = @setBackdropColor(@state.backdrop_color)
		
		@state.visible = if @props.initial_visible? then @props.initial_visible else @props.visible
		@state.render = @props.visible

	componentWillUpdate: (props,state)->
		if props.backdrop_color != @props.backdrop_color || (@context.primary.inv[0] != @state.backdrop_color)
			if !props.transparent
				state.backdrop_color = props.backdrop_color || @context.primary.inv[0]
				state.backdrop_opaque_color = @setBackdropColor(state.backdrop_color)
		
		if @props.visible != props.visible
			if props.visible
				state.render = true

	componentDidUpdate: (p_props,p_state)->
		if @state.visible != @props.visible
			@setState
				visible: @props.visible
			
			if !@props.visible
				@_timeout = setTimeout ()=>
					@setState
						render: @props.visible
				,350
	
	componentDidMount: (p_props,p_state)->
		if @state.visible != @props.visible
			setTimeout =>
				@setState
					visible: @props.visible
			,0

	componentWillUnmount: ->
		clearTimeout @_timeout
		@_timeout = null
	
	onClick: (e)=>
		if IS_TOUCH || !@props.visible
			e.preventDefault()
			e.stopPropagation()
			return false
		e.preventDefault()
		e.stopPropagation()
		@props.onClick?(e)
	
	onTouchStart: (e)=>
		@touch_started = true
		e.preventDefault()
		e.stopPropagation()
		return false

	onTouchEnd: (e)=>
		if !@touch_started
			return false
		@touch_started = false
		e.preventDefault()
		e.stopPropagation()
		@props.onClick?(e)


	render: ->
		overlay_style = Object.assign 
			zIndex: @props.z_index || 666
			display: !@state.render && 'none' || ''
			pointerEvents: !@state.render && 'none'
			background: @props.transparent && 'none' || @state.backdrop_opaque_color
		,@props.style
		
		h 'div',
			onClick: @onClick
			onTouchStart: @onTouchStart
			onTouchEnd: @onTouchEnd
			className: cn(css['overlay'],@props.center && css['center'],!@state.visible && css['overlay-hidden'],@props.className,@props.transparent && css['overlay-transparent'])
			style: overlay_style
			@props.children

Overlay.contextType = StyleContext


module.exports = Overlay