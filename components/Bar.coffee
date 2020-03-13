css = require './Style.less'
cn = require 'classnames'
{StyleContext} = require './Style.coffee'


class Bar extends Component
	constructor: (props)->
		super(props)
	baseRef: (el)=>
		@base = el
	render: ->

		style = Object.assign {},@props.style

		if @props.margin_left || @props.margin_top || @props.margin_bottom || @props.margin_right
			style.marginLeft = @props.margin_left && DIM * 1/8 || '0px'
			style.marginRight = @props.margin_right && DIM * 1/8 || '0px'
			style.marginBottom = @props.margin_bottom && DIM * 1/8 || '0px'
			style.marginTop = @props.margin_top && DIM * 1/8 || '0px'

		bar_props = 
			ref: @baseRef
			className: cn(@props.className,@props.btn && css['bar-btn'],@props.vert && css['bar-vert'],css['bar'],@props.big && css['bar-big'] || css['bar-small'])
			style: style
	
		h 'div',bar_props,@props.children


module.exports = Bar