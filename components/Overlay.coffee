{h,Component} = require 'preact'
cn = require 'classnames'
Color = require 'color'
css = require './Style.less'

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
			@state.backdrop_color = @props.backdrop_color || @context.__theme.primary.inv[0]
			@state.backdrop_opaque_color = @setBackdropColor(@state.backdrop_color)
		
		@state.visible = if @props.initial_visible? then @props.initial_visible else @props.visible
		@state.render = @props.visible

	componentWillUpdate: (props,state)->
		if props.backdrop_color != @props.backdrop_color || (@context.__theme.primary.inv[0] != @state.backdrop_color)
			if !props.transparent
				state.backdrop_color = props.backdrop_color || @context.__theme.primary.inv[0]
				state.backdrop_opaque_color = @setBackdropColor(state.backdrop_color)
		
		if @props.visible != props.visible
			if props.visible
				state.render = true

	componentDidUpdate: (p_props,p_state)->
		if @state.visible != @props.visible
			@setState
				visible: @props.visible
			
			if !@props.visible
				setTimeout ()=>
					@setState
						render: @props.visible
				,1000
	
	componentDidMount: (p_props,p_state)->
		if @state.visible != @props.visible
			@setState
				visible: @props.visible
			

	render: (props,state)->
		# log props.overlay_style
		# log props.backdrop_color
		overlay_style = Object.assign 
			zIndex: props.z_index || 666
			display: !@state.render && 'none' || ''
			background: props.transparent && 'none' || state.backdrop_opaque_color
		,props.style

		# log props.style
		
		h 'div',
			onClick: props.onClick
			className: cn(css['overlay'],!@state.visible && css['overlay-hidden'],props.className,props.transparent && css['overlay-transparent'])
			style: overlay_style
			props.children




module.exports = Overlay