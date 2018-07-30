css = require './Style.module.less'
cn = require 'classnames'
{h,Component} = require 'preact'


class AlertDot extends Component
	render: (props,state)->
		alert_style = {}
		if props.color
			alert_style.background = props.color
		else if props.error
			alert_style.background = @context.__theme.secondary.error
		else
			alert_style.background = @context.__theme.secondary.highlight

		h 'div',
			className: css['alert-dot']
			style: alert_style
module.exports = AlertDot