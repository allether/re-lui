css = require './Style.less'
{h,Component} = require 'preact'
cn = require 'classnames'

module.exports = class Chip extends Component
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
				btn_style.color = @context.__theme.secondary.inv[1]
				btn_style.background = @context.__theme.secondary.color[0]
			else if focus
				btn_style.color = @context.__theme.secondary.inv[1]
				btn_style.background = @context.__theme.secondary.color[0]
			else
				btn_style.color = @context.__theme.secondary.inv[2]
				btn_style.background = @context.__theme.secondary.color[1]
		
		else if props.btn_type == 'flat'
			if select
				btn_style.color = @context.__theme.primary.color[1]
				btn_style.background = @context.__theme.primary.inv[1]
			else if focus
				btn_style.color = @context.__theme.primary.color[1]
				btn_style.background = @context.__theme.primary.inv[1]
			else
				btn_style.color = @context.__theme.primary.color[2]
				btn_style.background = @context.__theme.primary.inv[0]			
		
		else
			if select
				btn_style.color = @context.__theme.primary.color[1]
				btn_style.background = @context.__theme.primary.inv[2]
			else if focus
				btn_style.color = @context.__theme.primary.color[1]
				btn_style.background = @context.__theme.primary.inv[2]
			else
				btn_style.color = @context.__theme.primary.color[2]
				btn_style.background = @context.__theme.primary.inv[1]

		return btn_style
	
	render: (props,state)->
		h 'span',
			onMouseEnter: @onMouseEnter
			onMouseLeave: @onMouseLeave
			style: @getButtonStyle(props,state)
			className: cn(props.disabled && 'disabled',css['btn'],css['chip'],props.inline && css['chip-inline'])
			props.children