css = require './Style.module.less'
cn = require 'classnames'
{h,Component} = require 'preact'


class Bar extends Component
	constructor: (props)->
		super(props)
	getChildContext: ->
		__i_bar: true
	render: (props,state)->
		my_props = 
			className: cn(props.vert && css['bar-vert'],css['bar'],props.big && css['bar-big'])
		bar_props = Object.assign {},props,my_props

		h 'div',bar_props,props.children

module.exports = Bar