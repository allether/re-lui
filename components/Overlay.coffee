{h,Component} = require 'preact'
cn = require 'classnames'
css = require './Style.less'

class Overlay extends Component
	constructor: (props)->
		super(props)
		@state=
			visible: props.visible
			render: props.visible

	componentWillUpdate: (props)->
		if @props.visible != props.visible
			if props.visible
				@state.render = true
	
		

	componentDidUpdate: (p_props,p_state)->
		if @state.visible != @props.visible
			setTimeout ()=>
				@setState
					visible: @props.visible
			,0
			

			if !@props.visible
				setTimeout ()=>
					@setState
						render: @props.visible
				,1000

	
	render: (props,state)->
		h 'div',
			onClick: props.onClick
			className: cn(css['overlay'],!@state.visible && css['overlay-hidden'],props.className)
			style:
				display: !@state.render && 'none' || ''
				background: props.background || @context.__theme.primary.inv[0]
			props.children




module.exports = Overlay