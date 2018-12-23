css = require './Style.less'
cn = require 'classnames'
Color = require 'color'
Slide = require 're-slide'
AlertDot = require './AlertDot.coffee'
{StyleContext} = require './Style.coffee'

require './MaterialIcons.css'


class Input extends Component
	constructor: (props)->
		super(props)
		@state=
			value: ''
			input_files: undefined
		if props.type == 'color'
			@state.is_dark = Color(props.value).isDark()
		@list = []
	onInput: (e)=>
		e.preventDefault()
		e.stopPropagation()
		
		if @props.onInput
			if @props.type == 'file' && e.target.files && e.target.files.length
				input_files = []
				for file in e.target.files
					input_files.push file.name
				# log 'set state'
				@setState 
					input_files: input_files
			else if @props.type == 'list'
				if @state.list_chip_value
					@props.onInput(@state.list_chip_value+','+e.target.value)
					return false
			@props.onInput(e)
		
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
			drag: no
		@props.onMouseLeave?(e)
	onKeyDown: (e)=>
		code = e.key
		if code == 'Enter' && @props.onEnter
			@_input.blur()
			return @props.onEnter(e)


		if code == 'Enter' && @props.type == 'checkbox'
			@_input.click()
		else if @props.type == 'list'
			if (code == 'Enter') && @props.value
				@props.onInput?(@props.value + ',')
			else if code == 'Backspace' && !@_input.value && @props.value
				log @props.value.substr(0,@props.value.length-1)
				@props.onInput?(@props.value.substr(0,@props.value.length-1))
			

	onClick: (e)=>
		@_input?.click()
		@_input?.focus()
		@props.onClick?(e)
	

	onInputClick: (e)=>
		e.stopPropagation()
		return false


	setValue: (value)=>
		@_input.value = value


	inputRef: (el)=>
		@_input = el


	componentWillUpdate: (props)->
		if props.type == 'color' && props.value != @props.value
			@state.is_dark = Color(props.value).isDark()

		# if props.type == 'file'
		# 	log @state.input_files
		# if props.type == 'file' && @state.input_files && (!@state.input_files.length || !props.value)
		# 	@setState
		# 		input_files: null

	
	getButtonStyle: (props,state)->
		offset = offset || 0
		value = if props.value? then props.value else state.value
		select = props.select
		focus = (state.focus) || state.hover
		if props.focus?
			focus = props.focus



		btn_style = {}
		if props.type == 'label'
			focus = false
			btn_style.cursor = 'default'
		
		if props.type == 'button' || props.type == 'file'
			btn_style.cursor = 'pointer'
		
		if props.btn_type == 'primary'
			if select
				btn_style.color = @context.secondary.inv[0]
				btn_style.background = @context.secondary.color[0]
			else if focus
				btn_style.color = @context.secondary.inv[0]
				btn_style.background = @context.secondary.color[0]
			else
				btn_style.color = @context.secondary.inv[2]
				btn_style.background = @context.secondary.color[1]
		
		else if props.btn_type == 'flat'
			if select
				btn_style.color = @context.primary.color[0]
				btn_style.background = @context.primary.inv[1]
			else if focus
				btn_style.color = @context.primary.color[0]
				btn_style.background = @context.primary.inv[1]
			else
				btn_style.color = @context.primary.color[1]
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

		if props.center
			btn_style.justifyContent = 'center'

		return btn_style
	
	getChipStyle: (props,state,offset)->
		offset = offset || 0
		value = if props.value? then props.value else state.value
		select = props.select
		focus = state.focus

		btn_style = {}
		if props.btn_type == 'primary'
			btn_style.color = @context.secondary.inv[0]
			btn_style.background = @context.secondary.color[2]
		
	
		else if props.btn_type == 'flat'
			
			btn_style.color = @context.primary.color[0]
			btn_style.background = @context.primary.inv[2]
				
		
		else
			
			btn_style.color = @context.primary.inv[0]
			btn_style.background = @context.primary.color[2]


		return btn_style

	getIconStyle: (props,state)->
		i_style = {}
		select = props.select
		focus = (state.focus) || state.hover
		if props.i_type == 'primary'
			i_style.color = @context.secondary.color[0]
		else if props.i_type == 'highlight'
			i_style.color = @context.secondary.highlight
		else
			if props.btn_type == 'primary'
				if focus || select
					i_style.color = @context.secondary.inv[0]
				else
					i_style.color = @context.secondary.inv[2]
				
			else if props.btn_type == 'flat'
				if focus || select
					i_style.color = @context.primary.color[2]
				else
					i_style.color = @context.primary.color[3]
			else
				if focus || select
					i_style.color = @context.primary.color[0]
				else
					i_style.color = @context.primary.color[1]
		
		return i_style

	getBarStyle: (props,state)->
		value = if props.value? then props.value else state.value
		select = props.select
		focus = state.focus
		bar_style = {}
		if !value
			if props.required && !props.value
				bar_style.background = @context.secondary.warn
			else if props.btn_type == 'primary'
				bar_style.background = @context.secondary.color[0]
			else if props.btn_type == 'flat'
				bar_style.background = @context.primary.inv[1]
			else
				bar_style.background = @context.primary.inv[2]
			
		else if props.invalid == true || props.is_valid == false
			bar_style.background = @context.secondary.false
		else if props.invalid == false || props.is_valid == true
			bar_style.background = @context.secondary.true
		else if props.color == 'color'
			bar_style.background = props.value
		else
			if props.btn_type == 'primary'
				bar_style.background = @context.secondary.inv[0]
			else if props.btn_type == 'flat'
				bar_style.background = @context.primary.color[1]
			else
				
				bar_style.background = @context.primary.color[2]

		if (!props.label || props.top_label) && !props.i 
			bar_style.marginLeft = 0
		return bar_style

	
	# removeChip: (i)->
		
	# 	@forceUpdate()
	
	renderChips: (props,state)->
		value = if props.value? then props.value else state.value
		if !value
			value = ''

		chips = value.split(',') || []
		@state.list_value = chips.pop() || ''
		chip_style = @getChipStyle(props,state,1)
		items = chips.map (item,i)=>
			if @props.chipRenderer
				item = @props.chipRenderer(item)
			h 'div',
				key: 'chip-'+i
				className: css['chip']
				# onClick: @removeChip.bind(@,i)
				style: chip_style
				item
		@state.list_chip_value = chips.join(',')

		return items


	render: ->
		return h MenuTabContext.Consumer,{},(value)=>
			# log value
			if value == true
				@state.focus = true

			# log @state.reveal
			@renderInput()

	onDragEnter: (e)=>
		# log e
		e.preventDefault()
		e.stopPropagation()
		@setState
			hover: yes
			drag: yes
		return false
	onDragLeave: (e)=>
		# log e
		e.preventDefault()
		e.stopPropagation()
		@setState
			hover: no
			drag: no
		return false

	renderInput: ->
		# log 'render input'
		props = @props
		state = @state
		value = @props.value
		select = props.select
		focus = state.focus || state.hover || select

		if @state.input_files && @state.input_files.length
			value = @state.input_files.length > 1 && (@state.input_files.length + ' files') || @state.input_files[0]
		

		if props.style
			style = Object.assign @getButtonStyle(props,state),props.style
		else
			style = @getButtonStyle(props,state)
		

		if props.type == 'label'
			select = false
		if props.type == 'color' || props.type == 'checkbox' || props.type == 'button'
			input_hidden = true

		if props.type == 'checkbox'
			toggle_bar_on_style = 
				background: @context.secondary.true
			toggle_bar_off_style = 
				background: @context.secondary.false
			if props.btn_type == 'primary'
				toggle_bar_style = 
					background: @context.secondary.color[0]
			else if props.btn_type == 'flat'
				toggle_bar_style = 
					background: @context.primary.inv[1]
			else
				toggle_bar_style = 
					background: @context.primary.inv[2]
			
			toggle = h Slide,
				width: 30
				# onClick: @onClick
				className: css['toggle']
				beta: 70
				height: 20
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
				onClick: @props.onIconClick
				className: 'material-icons'
				style: @getIconStyle(props,state)
				props.i 
		

		else if props.i_class
			icon = h 'i',
				onClick: @props.onIconClick
				className: props.i_class
				style: @getIconStyle(props,state)


		if props.label
			label = h 'div',
				style:
					color: props.top_label && @context.primary.color[0] || undefined
				className: cn(value && css['label-opaque'],css['label'],props.top_label && css['top-label'])
				props.label


		if props.bar
			bar = h 'div',
				className: css['input-bar']
				style: Object.assign @getBarStyle(props,state),props.bar_style


		if props.type == 'color'
			color_circle = h 'div',
				className: cn(css['input-color-circle'],css['chip'])
				style:
					background: props.value || '#fff'
				h 'span',
					className: css['input-color-text']
					style:
						color: state.is_dark && 'white' || 'black'
					props.value


		else if props.type == 'list'
			chips = @renderChips(props,state)
			# log @state.list_value
			value = @state.list_value

		else if props.type == 'file'
			if @state.input_files && @state.input_files.length
				label2 = h 'div',
					className: cn css['label'],css['label-2']
					style:
						opacity: 1
					value
			else
				label2 = h 'label',
					className: cn css['label'],css['label-2']
					'browse or drop file'
			overlay_icon = h 'div',
				className: cn 'material-icons',css['overlay-icon']
				style:
					opacity: (@state.input_files || @state.drag) && 1 || 0.3
				'insert_drive_file'
			value = ''

		# if props.type == 'select'

		if props.type != 'button' && props.type != 'label'
			input_props = 
				className: input_hidden && css['hidden']
				onKeyDown: @onKeyDown
				type: @props.type
				onChange: @onInput
				onDragEnter: @onDragEnter
				ref: @inputRef
				placeholder: @props.placeholder
				onFocus: @onFocus
				onBlur: @onBlur
				value: value
		
			# input_props = Object.assign {},props,self_input_props

			if props.type == 'button'
				input_props.style = cursor: 'pointer'

			input_props.onClick = @onInputClick
			if props.input_props
				Object.assign input_props,props.input_props

			if props.type == 'textarea'
				input = h 'textarea',input_props
			else if props.type == 'select'
				input = h 'select',input_props,
					props.options?.map (opt,i)->
						h 'option',
							key: i
							value: opt
							opt
			else
				input = h 'input',input_props
			
		



		# if props.invalid || props.is_valid == false
		# 	alert = h AlertDot,
		# 		error: yes
		

		h (props.href && 'a' || 'div'),
			onClick: @onClick
			onMouseEnter: @onMouseEnter
			onMouseLeave: @onMouseLeave
			className: cn(props.type == 'textarea' && css['btn-textarea'],props.big && css['btn-big'],css['btn'],css['input'],!label && icon && props.type == 'button' && css['btn-icon-square'],props.disabled && css['disabled'],props.className)
			href: props.href	
			style: style
			chips
			icon
			label
			toggle
			bar
			input
			color_circle
			label2
			overlay_icon
			props.children


Input.contextType = StyleContext
Input.defaultProps = 
	type: 'text'
	btn_type: 'default'
	i_type: 'default'

module.exports = Input