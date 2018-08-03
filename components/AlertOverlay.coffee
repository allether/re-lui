Overlay = require './Overlay.coffee'
{Component,h} = require 'preact'
Slide = require 'preact-slide'
cn = require 'classnames'
css = require './Style.less'

class AlertOverlay extends Component
	constructor: (props)->
		super(props)
		@state=
			error: props.message
			show_alert: false
	
	componentWillUpdate: (props,state)->
		if props.visible
			@state.message = props.message
			@state.alert_type = props.alert_type


	componentDidUpdate: (props)->
		if props.visible != @props.visible
			@setState
				show_alert: @props.visible

		

	render: (props,state)->

		if state.show_alert
			slide_pos = 1
		else
			slide_pos = 0
		
		h Overlay,
			onClick: props.onClick
			visible: props.visible
			className: props.transparent && css['overlay-empty']
			background: props.transparent && 'none' || props.background
			h Slide,
				className: css['overlay-slide']
				slide: yes
				vert: yes
				beta: 100
				pos: slide_pos
				h Slide,
					beta: 100
					@state.render && props.children || null
				h Slide,
					height: 40
					className: css['overlay-alert']
					style:
						background: @state.alert_type == 'error' && @context.__theme.primary.false || @context.__theme.primary.true
						color: 'white'
					center: yes
					@state.message


module.exports = AlertOverlay