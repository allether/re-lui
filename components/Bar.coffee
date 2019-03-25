css = require './Style.less'
cn = require 'classnames'
{StyleContext} = require './Style.coffee'


class Bar extends Component
	constructor: (props)->
		super(props)
	baseRef: (el)=>
		@base = el
	render: ->
		bar_props = 
			ref: @baseRef
			className: cn(@props.className,@props.btn && css['bar-btn'],@props.vert && css['bar-vert'],css['bar'],@props.big && css['bar-big'] || css['bar-small'])
			style: @props.style
	
		h 'div',bar_props,@props.children


module.exports = Bar