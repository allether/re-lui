css = require './Style.less'
cn = require 'classnames'
Color = require 'color'
Slide = require 're-slide'
AlertDot = require './AlertDot.coffee'
CircleToggle = require './CircleToggle.coffee'
{StyleContext} = require './Style.coffee'

isTouch = require './isTouch.js'

IS_TOUCH  = isTouch()
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
		# log 'on input',e
		if @props.onInput
			if @props.type == 'file' && e.target.files && e.target.files.length
				input_files = []
				for file in e.target.files
					input_files.push file.name
				# log input_files
				@setState 
					input_files: input_files
			else if @props.type == 'list'
				if @state.list_chip_value
					@props.onInput(@state.list_chip_value+','+e.target.value)
					return
			@props.onInput(e)
		if @props.onInputValue?
			@props.onInputValue(e.target.value)
		return

	inputValue: (val)=>
		# log 'INPUT VALUE',val

		@onInput
			target:
				value: val
	
	
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
		if e.key == 'Enter'
			@onEnter(e)
	
	onEnter: (e)=>
		if @props.type == 'checkbox'
			return @_input.click()
		else
			@_input.blur()
		
		if @props.autofill?.length
			autofill_match_res = @props.autofill[0].match(new RegExp('^'+@props.value,'i'))
			# log autofill_match_res
			if autofill_match_res?[0]
				@props.onInputValue?(@props.autofill[0])
				if @props.onInput
					@props.onInput
						target:
							value: @props.autofill[0]
		
		return @props.onEnter?(e)



	onClick: (e)=>
		# log 'on click'
		if @props.onClick
			e.preventDefault()
			e.stopPropagation()
		
		if IS_TOUCH
			return false
		
		 
		@_input?.focus()
		if !IS_TOUCH
			@_input?.click()
			@props.onClick?(e)

	

	onInputClick: (e)=>
		e.stopPropagation()
		# e.preventDefault()
		return false


	setValue: (value)=>
		@_input.value = value


	inputRef: (el)=>
		@_input = el


	componentWillUpdate: (props)->
		if props.type == 'color' && props.value != @props.value
			@state.is_dark = Color(props.value).isDark()

		if props.type == 'file' && @state.input_files && !props.value
			@setState
				input_files: null


	onTouchStart: (e)=>
		if @props.onClick
			e.stopPropagation()
			# e.preventDefault()
		@state.hover = yes
		@state.touch_started = yes
		# log 'touch started'
		@forceUpdate()
		# @props.onTouchStart?(e)


	onTouchEnd: (e)=>
		if @props.onClick
			e.stopPropagation()
			e.preventDefault()

		if !@state.touch_started
			return false
		@setState
			hover: no
			touch_started: no
		# log 'touch end'
		@props.onClick?(e)
		if @props.type != 'file'
			@_input?.focus()
			@_input?.click()

		
		
		
		
		
		

	
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
			# btn_style.cursor = 'default'
		
		# if props.type == 'button' || props.type == 'file'
			# btn_style.cursor = 'pointer'
		
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
				bar_style.background = @context.secondary.color[2]
				bar_style.color = @context.secondary.color[3]
			else if props.btn_type == 'flat'
				bar_style.background = @context.primary.inv[1]
				bar_style.color = @context.primary.inv[2]
			else
				bar_style.background = @context.primary.inv[2]
				bar_style.color = @context.primary.inv[3]
			
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
		# log 'drag enter'
		e.preventDefault()
		e.stopPropagation()
		@setState
			hover: yes
			drag: yes
		return false
	onDragLeave: (e)=>
		# log 'drag leave'
		# log e
		e.preventDefault()
		e.stopPropagation()
		@setState
			hover: no
			drag: no
		return false
	
	outerRef: (el)=>
		@_outer = el
	
	renderInput: ->
		# log 'render input'

		input_name = @props.name
		props = @props
		state = @state
		value = @props.value
		select = props.select
		focus = state.focus || state.hover || select
		button_style = @getButtonStyle(props,state)

		if @state.input_files && @state.input_files.length
			if @props.value?
				value = @props.value
			else
				value = @state.input_files.length > 1 && (@state.input_files.length + ' files') || @state.input_files[0]
		
		icon_style = @getIconStyle(props,state)
		bar_style = @getBarStyle(props,state)

		if !props.label && @props.label_width
			icon_style.width = @props.label_width
		
		if props.style
			style = Object.assign button_style,props.style
		else
			style = button_style

		if props.i_style
			Object.assign icon_style,props.i_style

		

		if props.type == 'label'
			select = false
		else
			style.userSelect = 'none'
			style.cursor = 'pointer'
		if props.type == 'color' || props.type == 'checkbox' || props.type == 'button'
			input_hidden = true


		


		if props.type == 'checkbox'

			if props.checkbox_type == 'circle'
				if @props.checked
					if @props.btn_type == 'primary'
						toggle_circle_fill_color = @context.secondary.true
					else
						toggle_circle_fill_color = @context.primary.true
				else
					toggle_circle_fill_color = bar_style.color 

					# toggle_circle_fill_color = @context.secondary.color[0]
				toggle = h CircleToggle,
					background: bar_style.background
					color: toggle_circle_fill_color
					is_selected: props.checked
			else
				toggle_bar_on_style = 
					background: @context.secondary.true
				toggle_bar_off_style = 
					background: @context.secondary.false
				if props.btn_type == 'primary'
					toggle_bar_style = 
						background: @context.secondary.color[0]
						color: @context.secondary.color[1]
				else if props.btn_type == 'flat'
					toggle_bar_style = 
						background: @context.primary.inv[1]
						color: @context.primary.inv[2]
				else
					toggle_bar_style = 
						background: @context.primary.inv[2]
						color: @context.primary.inv[3]
				
				toggle = h Slide,
					className: css['toggle']
					slide: yes
					pos: if props.checked then 0 else 2
					h Slide,
						className: css['toggle-on']
						style: toggle_bar_on_style
						beta: 100
						offset: -12
					h Slide,
						width: 12
						center: yes
						style: toggle_bar_style
						h 'div',
							style:
								background: toggle_bar_style.color
							className: css['toggle-bar']
					h Slide,
						className: css['toggle-off']
						style: toggle_bar_off_style
						beta: 100
						offset: -12


		if props.i || props.i_class
			icon = h 'i',
				onClick: @props.onIconClick
				className: cn( props.i_class || 'material-icons',!@props.label && css['label'])
				style: icon_style
				props.i 


		if props.label
			label = h 'div',
				style:
					color: props.top_label && @context.primary.color[0] || undefined
					width: @props.label_width
				className: cn(value && css['label-opaque'],css['label'],props.top_label && css['top-label'])
				props.label


		if props.bar
			bar = h 'div',
				className: css['input-bar']
				style: Object.assign bar_style,props.bar_style


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
				label2 = value && h 'div',
					className: cn css['label'],css['label-2']
					style:
						opacity: 1
					value
			else
				if @props.placeholder?
					label2 = @props.placeholder && h 'span',
						className: cn css['label'],css['label-2']
						@props.placeholder
				else
					label2 = @props.placeholder && h 'span',
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
				name: input_name
				onDragEnter: @onDragEnter
				ref: @inputRef
				placeholder: @props.placeholder
				onFocus: @onFocus
				onBlur: @onBlur
				value: value || ''

			if @props.input_props
				Object.assign input_props,@props.input_props
		


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


		# log @props.autofill
		if @props.autofill
			style.height = DIM2 * 2
			style.paddingTop = DIM2


		if @props.overlay_input
			overlay_input = h 'div',
				style:
					color: @context.primary.color[3]
				className: cn(css['input'],css['overlay-input'])
				@props.overlay_input
		
		if @props.autofill && (!@props.overlay_input || @props.force_autofill_buttons)
			input_val_style =
				background: @context.primary.color[1]
				color: @context.primary.inv[1]


			if !@props.autofill.length
				overlay_autofill_buttons = h 'div',
					className: css['overlay-input-val-wrap']
					
					h 'div',
						className: css['overlay-input-val']
						style: 
							background: @context.primary.inv[0]
							color: @context.primary.color[0]
						'...'
					

			else


				# log @props.autofill
				autofill_match_res = @props.autofill[0].match(new RegExp('^'+@props.value,'i'))
				if autofill_match_res?[0]
					overlay_input_text = @props.value + @props.autofill[0].slice(@props.value.length)
				
				if @props.force_autofill_buttons || @state.focus

					autofill_buttons = @props.autofill.slice(0,@props.autofill_count || 3).map (val,i)=>
						if i == 0 && overlay_input_text
							val_style = 
								background: @context.secondary.color[0]
								color: @context.secondary.inv[0]
						else
							val_style = input_val_style

						h 'div',
							onMouseDown: @inputValue.bind(@,val)
							className: css['overlay-input-val']
							style: val_style
							key: val
							val

				
				

				if @state.focus
					enter_hint = h 'div',
						style:
							background: @context.primary.inv[0]
							color: @context.primary.color[0]
						onMouseDown: @onEnter
						className: cn(css['overlay-input-val'],css['overlay-input-hint'])
						'enter ⏎'


					overlay_input = h 'div',
						style:
							color: @context.primary.color[3]
						className: cn(css['input'],css['overlay-input'])
						overlay_input_text
				
				overlay_autofill_buttons = h 'div',
					className: css['overlay-input-val-wrap']
					autofill_buttons
					enter_hint

		if @props.width
			style.width = @props.width
			wrap_input_style = 
				width: @props.width	

		if input && props.type == 'text' || props.type == 'email' || props.type == 'phone'
			input = h 'div',
				className: css['input-wrap']
				style:wrap_input_style
				overlay_input
				input
		
		


		outer_props = 
			onClick: @onClick
			htmlFor: input_name
			onTouchStart: @onTouchStart
			onTouchEnd: @onTouchEnd
			ref: @outerRef
			onMouseEnter: !IS_TOUCH && @onMouseEnter || undefined
			onMouseLeave:  !IS_TOUCH && @onMouseLeave || undefined
			className: cn(props.hint && css['trans_fixed'],props.type == 'textarea' && css['btn-textarea'],props.big && css['btn-big'],css['btn'],!label && icon && props.type == 'button' && css['btn-icon-square'],props.disabled && css['disabled'],props.type == 'select' && css['type-select'],props.className)
			href: props.href	
			style: style

		if @props.href
			outer_props.target = '_blank'
		Object.assign outer_props,@props.outer_props




		if @props.hint
			hint_label = h 'div',
				className: css['hint-label']
				@props.hint





		h (props.href && 'a' || 'label'),
			outer_props
			toggle
			chips
			icon
			label
			bar
			input
			color_circle
			label2
			overlay_icon
			overlay_autofill_buttons
			props.children
			hint_label


Input.contextType = StyleContext
Input.defaultProps = 
	autofill_count: 3
	name: 'input'
	type: 'text'
	btn_type: 'default'
	i_type: 'default'

module.exports = Input