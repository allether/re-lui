{StyleContext} = require './Style.coffee'
cn = require 'classnames'
class BarSeparator extends Component
	render: ->
		h 'div',
			className: cn 'pad',@props.center && 'full-w center'
			h 'div',
				className: 'list-seperator'
				style:
					width: @props.width || undefined
					background: @props.background || @context.primary.inv[3]

BarSeparator.contextType = StyleContext
module.exports = BarSeparator