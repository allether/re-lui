css = require './Style.less'
cn = require 'classnames'
Color = require 'color'
Slide = require 'preact-slide'
AlertDot = require './AlertDot.coffee'
{h,Component} = require 'preact'




class Input extends Component
	constructor: (props)->
		super(props)
		@state=
			value: null
		if props.type == 'color'
			@state.is_dark = Color(props.value).isDark()
		@list = []
	onInput: (e)=>
		if !@props.onInput
			return @setState
				value: e.target.value
		e.preventDefault()
		e.stopPropagation()
		@props.onInput?(e)
		return false
	onFocus: (e)=>
		@setState
			focus: yes
		@props.onFocus?(e)
	onBlur: (e)=>
		@setState
			focus: no
		@props.onBlur?(e)
	onMouseEnter: (e)=>
		@setState
			hover: yes
		@props.onMouseEnter?(e)
	onMouseLeave: (e)=>
		@setState
			focus: if @props.type == 'color' || @props.type == 'button' || @props.type == 'checkbox' then no else @state.focus
			hover: no
		@props.onMouseLeave?(e)
	onKeyDown: (e)=>
		if e.code == 'Enter' && @props.type == 'checkbox'
			@_input.click()
		else if e.code == 'Enter' && @props.type == 'list' && @list.value
			log @list.value
			@list.push(@list.value)
			@list.value = ''
			@state.value = ''
			@_input.value = ''
			@forceUpdate()
		else if e.code == 'Backspace' && @props.type == 'list' && !@list.value
			@list.pop()
			@forceUpdate()
			

	onClick: (e)=>
		log 'click'
		@_input.click()
		@_input.focus()
		@props.onClick?(e)
	
	onInputClick: (e)=>
		# e.preventDefault()
		e.stopPropagation()
		return false

	inputRef: (el)=>
		@_input = el

	componentWillUpdate: (props)->
		if props.type == 'color' && props.value != @props.value
			@state.is_dark = Color(props.value).isDark()
	
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
				btn_style.color = @context.__theme.secondary.inv[0]
				btn_style.background = @context.__theme.secondary.color[0]
			else if focus
				btn_style.color = @context.__theme.secondary.inv[0]
				btn_style.background = @context.__theme.secondary.color[0]
			else
				btn_style.color = @context.__theme.secondary.inv[1]
				btn_style.background = @context.__theme.secondary.color[1]
		
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
	
	getChipStyle: (props,state,offset)->
		offset = offset || 0
		value = if props.value? then props.value else state.value
		select = props.select
		focus = state.focus

		btn_style = {}
		if props.btn_type == 'primary'
			btn_style.color = @context.__theme.secondary.inv[0]
			btn_style.background = @context.__theme.secondary.color[2]
		
	
		else if props.btn_type == 'flat'
			
			btn_style.color = @context.__theme.primary.color[0]
			btn_style.background = @context.__theme.primary.inv[2]
				
		
		else
			
			btn_style.color = @context.__theme.primary.inv[0]
			btn_style.background = @context.__theme.primary.color[2]


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

	getBarStyle: (props,state)->
		value = if props.value? then props.value else state.value
		select = props.select
		focus = state.focus

		bar_style = {}
		if !value
			if props.btn_type == 'primary'
				bar_style.background = @context.__theme.secondary.color[0]
			else if props.btn_type == 'flat'
				bar_style.background = @context.__theme.primary.inv[1]
			else
				bar_style.background = @context.__theme.primary.inv[2]
		else if props.invalid == true
			bar_style.background = @context.__theme.secondary.false
		else if props.invalid == false
			bar_style.background = @context.__theme.secondary.true
		else if props.color == 'color'
			bar_style.background = props.value
		else
			if props.btn_type == 'primary'
				bar_style.background = @context.__theme.secondary.inv[0]
			else if props.btn_type == 'flat'
				bar_style.background = @context.__theme.primary.color[1]
			else
				
				bar_style.background = @context.__theme.primary.color[2]
		return bar_style

	
	removeChip: (i)->
		@list.splice(i,1)
		@forceUpdate()
	renderChips: (props,state)->
		value = if props.value? then props.value else state.value
		select = props.select
		focus = state.focus

		
				
		if value?[value.length-1] == ',' 
			if @list.value
				@list.push value.substring(0,value.length-1)
			@list.value = ''
		else
			@list.value = value #value.replace(/(^\s+)|(\s+$)/g,'')

		

		chip_style = @getChipStyle(props,state,1)
		return @list.map (item,i)=>
			h 'div',
				className: css['chip']
				onClick: @removeChip.bind(@,i)
				style: chip_style
				item





	render: (props,state)->
		value = if props.value? then props.value else state.value
		select = props.select
		focus = state.focus || state.hover || select

		if props.type == 'color' || props.type == 'checkbox' || props.type == 'button'
			input_hidden = true

		if props.type == 'checkbox'
			toggle_bar_on_style = 
				background: @context.__theme.secondary.true
			toggle_bar_off_style = 
				background: @context.__theme.secondary.false
			if props.btn_type == 'primary'
				toggle_bar_style = 
					background: @context.__theme.secondary.color[0]
			else if props.btn_type == 'flat'
				toggle_bar_style = 
					background: @context.__theme.primary.inv[1]
			else
				toggle_bar_style = 
					background: @context.__theme.primary.inv[2]
			
			toggle = h Slide,
				width: 30
				# onClick: @onClick
				className: css['toggle']
				beta: 70
				height: '70%'
				slide: yes
				pos: if props.checked then 0 else 2
				h Slide,
					className: css['toggle-on']
					style: toggle_bar_on_style
					beta: 100
					offset: -12
				h Slide,
					width: 12
					className: css['toggle-bar']
					center: yes
					style: toggle_bar_style
					h 'i',
						className: 'material-icons'
						'more_vert'
				h Slide,
					className: css['toggle-off']
					style: toggle_bar_off_style
					beta: 100
					offset: -12


		if props.i
			icon = h 'i',
				className: 'material-icons'
				style: @getIconStyle(props,state)
				props.i 

		if props.label
			label = h 'div',
				className: css['label']
				props.label

		if props.bar
			bar = h 'div',
				className: css['input-bar']
				style: @getBarStyle(props,state)
	
		if props.type == 'color'
			color_circle = h 'div',
				className: css['input-color-circle']
				style:
					background: props.value || '#fff'
				h 'span',
					className: css['input-color-text']
					style:
						color: state.is_dark && 'white' || 'black'
					props.value

		if props.type == 'list'
			chips = @renderChips(props,state)
			value = @list.value



		self_input_props = 
			className: input_hidden && css['hidden']
			onKeyDown: @onKeyDown
			onInput: @onInput
			ref: @inputRef
			onFocus: @onFocus
			onBlur: @onBlur
			value: value



		
		input_props = Object.assign {},props,self_input_props

		if props.type == 'button'
			input_props.style = cursor: 'pointer'

		input_props.onClick = @onInputClick

		input = h 'input',input_props


	



		if props.invalid
			alert = h AlertDot,
				error: yes

		h 'div',
			onClick: @onClick
			onMouseEnter: @onMouseEnter
			onMouseLeave: @onMouseLeave
			className: cn(props.big && css['btn-big'],css['btn'],css['input'],!label && icon && props.type == 'button' && css['btn-icon-square'],props.disabled && css['disabled'])
			style: @getButtonStyle(props,state)
			chips
			icon
			label
			toggle
			bar
			# alt_label
			input
			color_circle
			alert
			props.children



Input.defaultProps = 
	type: 'text'
	btn_type: 'default'
	i_type: 'default'

module.exports = Input