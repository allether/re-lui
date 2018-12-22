css = require './Style.less'
cn = require 'classnames'
{StyleContext} = require './Style.coffee'


class AlertDot extends Component
	render: ->
		alert_style = {}
		if @props.color
			alert_style.background = @props.color
		else if @props.error
			alert_style.background = @context.secondary.error
		else
			alert_style.background = @context.secondary.highlight

		h 'div',
			className: css['alert-dot']
			style: alert_style

AlertDot.contextType = StyleContext
module.exports = AlertDot