css = require './Style.module.less'
cn = require 'classnames'
{h,Component} = require 'preact'


class Button extends Component
	# onClick: (e)=>
	# 	clearTimeout @_timeout
	# 	@setState
	# 		tap: yes
	# 	@_timeout = setTimeout =>
	# 		@setState
	# 			tap: false
	# 	,75
	# 	@props.onClick?(e)

	onMouseEnter: (e)=>
		@setState
			focus: yes
		@props.onMouseEnter?()


	onMouseLeave: (e)=>
		@setState
			focus: no
		@props.onMouseLeave?()

	onBlur: (e)=>
		@setState
			focus: no
		@props.onBlur?()

	onFocus: (e)=>
		@setState
			focus: yes
		@props.onFocus?()

	getButtonStyle: (props,state)->
		value = if props.value? then props.value else state.value
		select = props.select
		focus = state.focus

		btn_style = {}
		if props.btn_type == 'primary'
			if select
				btn_style.color = @context.__theme.secondary.inv[0]
				btn_style.background = @context.__theme.secondary.color[0]
			else if focus
				btn_style.color = @context.__theme.secondary.inv[0]
				btn_style.background = @context.__theme.secondary.color[0]
			else
				btn_style.color = @context.__theme.secondary.inv[1]
				btn_style.background = @context.__theme.secondary.color[1]

			if props.disabled
				btn_style.color = @context.__theme.secondary.inv[2]
		
		else if props.btn_type == 'flat'
			if select
				btn_style.color = @context.__theme.primary.color[0]
				btn_style.background = @context.__theme.primary.inv[1]
			else if focus
				btn_style.color = @context.__theme.primary.color[0]
				btn_style.background = @context.__theme.primary.inv[1]
			else
				btn_style.color = @context.__theme.primary.color[1]
				btn_style.background = @context.__theme.primary.inv[0]			
		
		else
			if select
				btn_style.color = @context.__theme.primary.color[0]
				btn_style.background = @context.__theme.primary.inv[2]
			else if focus
				btn_style.color = @context.__theme.primary.color[0]
				btn_style.background = @context.__theme.primary.inv[2]
			else
				btn_style.color = @context.__theme.primary.color[1]
				btn_style.background = @context.__theme.primary.inv[1]

		return btn_style
	

	getIconStyle: (props,state)->
		i_style = {}
		select = props.select
		focus = state.focus
		if props.i_type == 'primary'
			i_style.color = @context.__theme.secondary.color[0]
		else if props.i_type == 'highlight'
			i_style.color = @context.__theme.secondary.highlight
		else
			if props.btn_type == 'primary'
				i_style.color = @context.__theme.secondary.inv[0]
			else if props.btn_type == 'flat'
				if focus || select
					i_style.color = @context.__theme.primary.color[1]
				else
					i_style.color = @context.__theme.primary.color[2]
			else
				if focus || select
					i_style.color = @context.__theme.primary.color[0]
				else
					i_style.color = @context.__theme.primary.color[1]
		
		return i_style

	render: (props,state)->

		select = props.select
		focus = state.focus

		if props.i
			icon = h 'i',
				className: cn('material-icons')
				style: @getIconStyle(props,state)
				props.i 

		if props.label
			label = h 'span',
				className: css['label']
				props.label

		h 'button',
			onClick: props.onClick
			onMouseEnter: !props.disabled && @onMouseEnter
			onMouseLeave: !props.disabled && @onMouseLeave
			onBlur: @onBlur
			style: @getButtonStyle(props,state)
			onFocus: !props.disabled && @onFocus
			className: cn(css['btn'],props.big && css['btn-big'],icon && css['btn-icon'],@context.__i_bar && css['btn-bar'],!label && icon && css['btn-icon-square'],props.disabled && css['disabled'])
			icon
			label
			props.children

Button.defaultProps = 
	type: 'default'
	i_type: 'default'

module.exports = Button