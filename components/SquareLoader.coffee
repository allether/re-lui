css = require './Style.less'
cn = require 'classnames'
class SquareLoader extends Component
	render: ->
		h 'div',
			className: cn css['loader-wrapper'],@props.center && css['absolute-center']
			h 'div',
				style:
					background: @props.background
					opacity: if @props.opacity? then @props.opacity else undefined
				className: cn css['loader'],!@props.is_loading && css['loader-stop'],@props.className

module.exports = SquareLoader