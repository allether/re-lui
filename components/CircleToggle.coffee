css = require './Style.less'
cn = require 'classnames'
class CircleToggle extends Component
	render: ->
		h 'div',
			className: css['checkbox-circle']
			style: 
				background: @props.background
			h 'div',
				className: cn css['checkbox-circle-inner'],@props.is_selected && css['active']
				style:
					background: @props.color
					



module.exports = CircleToggle