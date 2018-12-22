css = require './Style.less'
cn = require 'classnames'


class Bar extends Component
	constructor: (props)->
		super(props)
	baseRef: (el)=>
		@base = el
	render: ->
		# log props.vert
		bar_props = 
			ref: @baseRef
			className: cn(@props.vert && css['bar-vert'],css['bar'],@props.big && css['bar-big'] || css['bar-small'],@props.className)
			style: @props.style
	
		# bar_props = Object.assign {},@props,my_props

		h 'div',bar_props,@props.children


module.exports = Bar