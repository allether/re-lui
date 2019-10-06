cn = require 'classnames'
Color = require 'color'
css = require './Style.less'
{StyleContext} = require './Style.coffee'

isTouch = require('./isTouch.js')
IS_TOUCH = isTouch()
class Overlay extends Component
	constructor: (props)->
		super(props)
		@state=
			visible: if props.initial_visible? then props.initial_visible else props.visible
			render: props.visible
			
		
		
	
	setBackdropColor: (bg,alpha)=>
		if bg == 'none'
			return 'none'
		return Color(bg).alpha(alpha).string()
	
	componentWillMount: ->

		if !@props.transparent
			@state.backdrop_color = @props.backdrop_color || @context.primary.inv[0]
			@state.backdrop_opaque_color = @setBackdropColor(@state.backdrop_color,@props.alpha)
		
		@state.visible = if @props.initial_visible? then @props.initial_visible else @props.visible
		@state.render = @props.visible

	componentWillUpdate: (props,state)->
		if props.backdrop_color != @props.backdrop_color || (@context.primary.inv[0] != @state.backdrop_color) || props.alpha != @props.alpha
			if !props.transparent
				state.backdrop_color = props.backdrop_color || @context.primary.inv[0]
				state.backdrop_opaque_color = @setBackdropColor(state.backdrop_color,props.alpha)

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
		if e.target != @_overlay
			return
		if IS_TOUCH || !@props.visible
			return false
		
		@props.onClick?(e)
	
	onTouchStart: (e)=>
		if e.target != @_overlay
			return
		@touch_started = true


		return false

	onTouchEnd: (e)=>
		if e.target != @_overlay
			return

		if !@touch_started
			return false
		
		@touch_started = false
		@props.onClick?(e)

	overlayRef: (el)=>
		@_overlay = el

	render: ->

		overlay_style = Object.assign 
			zIndex: @props.z_index || 666
			display: !@state.render && 'none' || ''
			pointerEvents: !@state.render && 'none'
			background: @props.background || @state.backdrop_opaque_color || 'none'
		,@props.style

		
		h 'div',
			onClick: @props.pointer_events && @onClick || null
			ref: @overlayRef
			onTouchStart: @props.pointer_events && @onTouchStart || null
			onTouchEnd: @props.pointer_events && @onTouchEnd || null
			className: cn(css['overlay'],@props.center && css['center'],!@state.visible && css['overlay-hidden'],@props.className,@props.children_pointer_events && css['overlay-children-pointer-events'],@props.pointer_events && css['overlay-blocking'])
			style: overlay_style
			@props.children

Overlay.contextType = StyleContext

Overlay.defaultProps = 
	pointer_events: yes
	transparent: no
	alpha: 0.96
module.exports = Overlay