css = require './Style.less'
cn = require 'classnames'
{StyleContext} = require './Style.coffee'


class Chip extends Component
	constructor: (props)->
		super(props)
		@state = 
			value: undefined
	onMouseEnter: (e)=>
		@setState
			hover: yes
		@props.onMouseEnter?(e)
	
	onMouseLeave: (e)=>
		@setState
			hover: no
		@props.onMouseLeave?(e)
	
	getButtonStyle: (props,state)->
		offset = offset || 0
		value = if props.value? then props.value else state.value
		select = props.select
		focus = (state.focus) || state.hover



		btn_style = {}
		if props.type == 'button'
			btn_style.cursor = 'pointer'
		if props.btn_type == 'primary'
			if select
				btn_style.color = @context.secondary.inv[1]
				btn_style.background = @context.secondary.color[0]
			else if focus
				btn_style.color = @context.secondary.inv[1]
				btn_style.background = @context.secondary.color[0]
			else
				btn_style.color = @context.secondary.inv[2]
				btn_style.background = @context.secondary.color[1]
		
		else if props.btn_type == 'flat'
			if select
				btn_style.color = @context.primary.color[1]
				btn_style.background = @context.primary.inv[1]
			else if focus
				btn_style.color = @context.primary.color[1]
				btn_style.background = @context.primary.inv[1]
			else
				btn_style.color = @context.primary.color[2]
				btn_style.background = @context.primary.inv[0]			
		
		else
			if select
				btn_style.color = @context.primary.color[1]
				btn_style.background = @context.primary.inv[2]
			else if focus
				btn_style.color = @context.primary.color[1]
				btn_style.background = @context.primary.inv[2]
			else
				btn_style.color = @context.primary.color[2]
				btn_style.background = @context.primary.inv[1]

		return btn_style
	
	render: ->
		chip_props = Object.assign {},@props,
			onMouseEnter: @onMouseEnter
			onMouseLeave: @onMouseLeave
			className: cn(@props.disabled && 'disabled',css['btn'],css['chip'],@props.className)
			style: Object.assign({},@getButtonStyle(@props,@state),@props.style)

		h 'span',chip_props,@props.children


Chip.contextType = StyleContext
module.exports = Chip