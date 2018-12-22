Overlay = require './Overlay.coffee'
Slide = require 're-slide'
cn = require 'classnames'
css = require './Style.less'
# log StyleContext
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
				show_alert: @props.visible && @props.message

		

	render: ->
		# log @context
		if @state.show_alert
			slide_pos = 1
		else
			slide_pos = 0

		if @state.alert_type == 'error' 
			alert_bg = @context.primary.false
		else if @state.alert_type == 'success'
			alert_bg = @context.primary.true
		else
			alert_bg = @context.primary.inv[0]
		alert_color = 'white'
		
		h Overlay,
			onClick: @props.onClick
			visible: @props.visible
			initial_visible: @props.initial_visible
			style: @props.style
			transparent: @props.transparent
			backdrop_color: @props.backdrop_color
			h Slide,
				className: css['overlay-slide']
				slide: yes
				vert: yes
				beta: 100
				pos: slide_pos
				h Slide,
					beta: 100
					center: yes
					@props.children || null
				h Slide,
					height: 40
					className: css['overlay-alert']
					onClick: @props.onClick
					style:
						background: alert_bg
						color: alert_color
					center: yes
					@state.message

AlertOverlay.contextType = StyleContext
module.exports = AlertOverlay