{render,h,Component} = require 'preact'

window.log = console.log.bind(console)
Style = require './components/Style.coffee'
AlertDot = require './components/AlertDot.coffee'
Input = require './components/Input.coffee'
Menu = require './components/Menu.coffee'
MenuTab = require './components/MenuTab.coffee'
Section = require './components/Section.coffee'
Bar = require './components/Bar.coffee'
Chip = require './components/Chip.coffee'
AlertOverlay = require './components/AlertOverlay.coffee'
css = require './demo.less'
lerp_logo = require './lerp-logo-40.svg'


ModelGridExample = require './model-grid-example.coffee'


class SvgIcon extends Component
	componentDidMount: ->
		@base.innerHTML = @props.icon;
	render: ->
		h 'div',
			className: 'icon'
				@props.icon


class MenuSection extends Component
	constructor: (props)->
		super(props)
		@state=
			x: 0
			y: 0 
	shouldComponentUpdate: (props,state)->
		_c = @context.__theme.primary.color[0] + '-' + @context.__theme.secondary.color[0]
		if @_c != _c
			@_c = _c
			return true
	
		if props.big != @props.big || state.x != @state.x || state.y != @state.y || state.toggle_drag != @state.toggle_drag
			return true
		return false
	onMove: (e)=>
		@setState
			x: e.clientX+20
			y: e.clientY+20
	onStop: (e)=>
		window.removeEventListener 'mousemove',@onMove
		window.removeEventListener 'click',@onStop
		e.preventDefault()
		e.stopPropagation()
		@props.onDragStop?()
		@setState
			x: 0
			y: 0
			toggle_drag: no
		return false
	onDrag: (e)=>
		window.addEventListener 'mousemove',@onMove
		window.addEventListener 'click',@onStop
		e.preventDefault()
		e.stopPropagation()
		@props.onDragStart?()
		@setState
			x: e.clientX+20
			y: e.clientY+20
			toggle_drag: yes
		return false

	

	render: (props,state)->
		h Section,
			title: 'menu'
			h 'p',{},'menus are a mix of vertical and horizontal bars with a variety of options. `render_hidden` controls whether hidden tabs are rendered into the DOM which is needed for fixed menus to make sure that menu options do not overflow the allowed space'
			h Menu,
				vert: no
				render_hidden: no
				alternate: no
				hover_reveal: yes
				x: 0
				y: 0
				big: props.big
				# max_x: window.innerWidth
				# max_y: window.innerHeight
				# min_x: 0
				# min_y: 0
				force_split_top: true
				h MenuTab,
					vert: yes
					# reveal: yes
					content: h Input,
						type: 'button'
						i: 'settings'
						onClick: @toggleBarBig
						label: 'bar item 1'
						h AlertDot
					h MenuTab,
						content: h Input,
							label: 'tab 1.a'
							placeholder: 'tab 1 input'
					h MenuTab,
						content: h Input,
							label: 'tab 1.b'
							placeholder: 'tab 1 input'
				h MenuTab,
					vert: yes
					# reveal: yes
					content: h Input,
						type: 'button'
						btn_type: 'flat'
						label: 'bar item 2'
					h MenuTab,
						vert: yes
						
						content: h Input,
							label: 'tab 2.a'
							btn_type: 'primary'
							placeholder: 'tab 1 input'
						h MenuTab,
							content: h Input,
								label: 'tab 2.a.a'
								type: 'button'
								i: 'chat'
						h MenuTab,
							content: h Input,
								label: 'tab 2.a.b'
								type: 'button'
								i: 'chat'
					h MenuTab,
						# reveal: yes
						content: h Input,

							label: 'tab 2.b'
							type: 'button'
							i: 'search'
						h MenuTab,
							content: h Input,
								label: 'tab 2.a.a'
								type: 'button'
								i: 'chat'
						h MenuTab,
							content: h Input,
								label: 'tab 2.a.b'
								type: 'button'
								i: 'chat'
							# placeholder: 'tab 1 input'
				h MenuTab,
					vert: no
					# big: no
					# reveal: yes
					content: h Input,
						type: 'button'
						label: 'tab 3'
					h MenuTab,
						content: h Input,
							i: 'bookmark'
							type: 'button'
							btn_type: 'primary'
							label: 'tab 3.a'
							placeholder: 'tab 1 input'
					h MenuTab,
						vert: yes

						content: h Input,
							i: 'bookmark'
							type: 'button'
							label: 'tab 3.b'
							placeholder: 'tab 1 input'
						h MenuTab,
							content: h Input,
								label: 'tab 3.b.a'
								type: 'button'
								i: 'chat'
						h MenuTab,
							content: h Input,
								label: 'tab 3.b.b'
								type: 'button'
								i: 'chat'
			h 'p',{},'the menu below is a fixed menu. click and drag the drag button to drag the menu around the screen and see how it responds.'
			h Input,
				type: 'checkbox'
				onClick: @onDrag
				checked: state.toggle_drag
				label: 'toggle drag'
					
			h Menu,
				vert: no
				fixed: state.toggle_drag && yes
				render_hidden: state.toggle_drag && yes
				hover_reveal: !state.toggle_drag
				x: @state.x
				y: @state.y
				big: props.big
				max_x: window.innerWidth-17
				max_y: window.innerHeight
				min_x: 0
				min_y: 0

				h MenuTab,
					content: h Input,
						type: 'button'
						label: 'tab A'
				h MenuTab,
					vert: yes
					reveal: state.toggle_drag || undefined
					content: h Input,
						type: 'button'
						label: 'tab B'
					h MenuTab,
						content: h Input,
							type: 'button'
							label: 'tab B 1 width ----'
					h MenuTab,
						reveal: state.toggle_drag || undefined
						content: h Input,
							type: 'button'
							label: 'tab B 2'
						h MenuTab,
							content: h Input,
								type: 'button'
								label: 'tab B 2 A width -----'
						h MenuTab,
							content: h Input,
								type: 'button'
								label: 'tab B 2 B'
						h MenuTab,
							content: h Input,
								type: 'button'
								label: 'tab B 2 C'
					h MenuTab,
						content: h Input,
							type: 'button'
							label: 'tab B 3'
				h MenuTab,
					content: h Input,
						type: 'button'
						label: 'tab C'
				h MenuTab,
					content: h Input,
						type: 'button'
						label: 'tab D'
			h 'div',
				style: 
					height: '200px'
					width: '100%'



class SelectPresetButton extends Component
	render: (props)->
		h 'div',
			className: css['color-preset-button-wrap']
			h Input,
				type: 'button'
				select: props.select
				onClick: =>
					@props.onPresetSelect(@props.primary,@props.secondary) 
				label: 'select'
			h 'div',
				className: css['color-preset-button']
				h 'div',
					style: 
						background: props.primary
				h 'div',
					style: 
						background: props.secondary



class Demo extends Component
	constructor: (props)->
		super(props)
		@state = 
			test:true
			btn_select: false
			bar_big: yes
			primary:'#1B1C1D'
			secondary:'#414277'
			test_color: '#00f3dd'
	setTestColor: (e)=>
		@setState
			test_color: e.target.value
	onBtnClick: =>
		@setState
			btn_select: !@state.btn_select
	toggleBarBig: =>
		@setState
			bar_big: !@state.bar_big

	onToggle: (e)=>
		@setState
			toggle_checked: e.target.checked
	onInput: (e)=>
		@setState
			input_value: e.target.value


	setPrimaryColor: (e)=>
		@setState
			primary: e.target.value


	setSecondaryColor: (e)=>
		@setState
			secondary: e.target.value


	onPresetSelect: (primary,secondary)=>
		@setState
			primary:primary
			secondary: secondary
	onListInput: (value)=>
		@setState
			list_value: value

	showOverlay: =>
		@setState
			show_overlay: yes
			show_overlay_error: no

	showOverlayError: =>
		@setState
			show_overlay: yes
			show_overlay_error: yes
	hideOverlay: =>
		@setState
			show_overlay: no
			show_overlay_error: no

	

	render: (props,state)->
		h Style,
			primary: state.primary
			secondary: state.secondary
			onSetStyle: (@primary,@secondary)=>
				document.body.style.background = @primary.inv[0]
				document.body.style.color = @primary.color[0]
			
			# tertiary: '#379CC6'
			h 'div',
				className: 'app'
				h AlertOverlay,
					onClick: @hideOverlay
					transparent: false
					visible: @state.show_overlay
					alert_type: @state.show_overlay_error && 'error' || 'success'
					message:@state.show_overlay_error && 'error message' || 'success message'
				
				h Section,
					title: 'buttons'
					h 'p',{},'Examples of buttons containing text, an <AlertDot> is added to the primary button.'
					h Input,
						type: 'button'
						onClick: @onBtnClick
						select: state.btn_select
						label: 'toggle select'
					
					h Input,
						type: 'button'
						btn_type: 'primary'
						select: state.btn_select
						label: 'primary'
						h AlertDot
					h Input,
						type: 'button'
						btn_type: 'flat'
						select: state.btn_select
						label: 'flat'
					h Input,
						type: 'button'
						btn_type: 'flat'
						i: 'star'
						select: state.btn_select
					h Input,
						type: 'button'
						btn_type: 'primary'
						i: 'face'
						select: state.btn_select
					h Input,
						type: 'button'
						i: 'accessibility'
						select: state.btn_select
					h 'p',{},'disabled buttons by type'
					h Input,
						type: 'button'
						btn_type: 'primary'
						disabled: yes
						select: state.btn_select
						# onClick: @onBtnClick
						label: 'disabled primary'
					h Input,
						type: 'button'
						btn_type: 'flat'
						disabled: yes
						select: state.btn_select
						label: 'disabled flat'
					h Input,
						type: 'button'
						disabled: yes
						select: state.btn_select
						label: 'disabled default'

					h 'p',{},'set buttons to be bigger with `big:true` '
					h Input,
						type: 'button'
						i: 'bookmark'
						big: true
						label: 'bookmark'
						h AlertDot
					h Input,
						type: 'button'
						i: 'done'
						big: true
						btn_type: 'primary'
						label: 'done'
					h Input,
						type: 'button'
						i: 'save'
						big: true
						select: state.btn_select
					h 'p',{},'buttons with alternative icon colors `i_type:primary` and `i_type:highlight`'
					h Input,
						type: 'button'
						i: 'bookmark'
						i_type: 'primary'
						label: 'bookmark'
						h AlertDot
					h Input,
						type: 'button'
						i: 'done'
						i_type: 'highlight'
						btn_type: 'primary'
						label: 'done'
					
			
				h Section,
					title: 'Basic Input'
					h 'p',{},'the input below will fire an alert when input does not match required regex'
					h Input,
						btn_type: 'default'
						# i_type: 'primary'
						i: 'search'
						label: 'search..'
						top_label: yes
						type: 'search'
						placeholder: 'search...'
						value: state.input_value
					h Input,
						btn_type: 'default'
						bar: yes
						type: 'date'
						i:'date_range'
						label: 'DOB'
						placeholder: 'basic text input'
					h 'p',{},'inputs inherit their style from buttons, so setting `big:true` works the same as for buttons'
					h Input,
						btn_type: 'primary'
						type: 'text'
						label: 'top label goes here'
						top_label: yes
						bar: yes
						big: true
						onInput: @onInput
						placeholder: 'top label + bar'
						invalid: state.input_value?.length < 4
						value: state.input_value
					h Input,
						btn_type: 'primary'
						type: 'text'
						label: 'input'

						bar: yes
						big: true
						onInput: @onInput
						placeholder: 'min 4 characters'
						invalid: state.input_value?.length < 4
						value: state.input_value
					h Input,
						btn_type: 'default'
						# i_type: 'primary'
						bar: yes
						i: 'chat_bubble'
						type: 'text'
						big:yes
						placeholder: 'chat...'
						value: state.input_value
					h Input,
						btn_type: 'default'
						# i_type: 'primary'
						i: 'chat_bubble'
						type: 'text'
						big:yes
						placeholder: 'no bar + icon'
						value: state.input_value
					h Input,
						btn_type: 'flat'
						type: 'text'
						label: 'input'
						i: 'reply'
						bar: yes
						big: true
						onInput: @onInput
						placeholder: 'flat style'
						invalid: state.input_value?.length < 4
						value: state.input_value

					h 'p',{},'create color inputs with `type:color`'
					
					h Input,
						btn_type: 'flat'
						type: 'color'
						label: 'color'
						onInput: @setTestColor
						value: state.test_color
					h Input,
						type: 'color'
						label: 'color'
						onInput: @setTestColor
						value: state.test_color
					h Input,
						btn_type: 'primary'
						type: 'color'
						label: 'color'
						onInput: @setTestColor
						value: state.test_color
					h 'p',{},'you can also create lists with `type:list`'
					h Input,
						btn_type: 'primary'
						type: 'list'
						value: state.list_value
						onInput: @onListInput
						placeholder: 'comma seperated list'
					h Input,
						type: 'list'
						placeholder: 'comma seperated list'
					
					h Chip,
						btn_type: 'primary'
						'chip A'
					
					h Chip,
						btn_type: 'flat'
						'chip B'
					
					h Chip,
						btn_type: undefined
						'chip C'

					h 'p',{},'the two types of boolean inputs are checkbox followed by radio. Set `alt_label`'
					h Input,
						checked: state.toggle_checked
						onInput:@onToggle
						type: 'checkbox'
						label: 'toggle label'
					h Input,
						checked: state.toggle_checked
						onInput: @onToggle
						btn_type: 'flat'
						type: 'checkbox'
						label: 'flat style'
						# placeholder: 'comma seperated list'
					h Input,
						checked: state.toggle_checked
						onInput:@onToggle
						btn_type: 'primary'
						type: 'checkbox'
						label: 'toggle me!'
					h 'p',{},'you can also input into a large text area'
					h Input,
						# checked: state.toggle_checked
						# onInput:@onToggle
						type: 'textarea'
						label: 'Messsage:'
						bar: yes
						placeholder: 'type text...'
				h Section,
					title: 'select type input'
					h Input,
						# checked: state.toggle_checked
						# onInput:@onToggle
						type: 'select'
						label: 'select'
						options: ['option 1','option 2','option 3']
						placeholder: 'placeholder'
				h Section,
					title: 'Bar'
					h 'p',{},'buttons inside bar dont have margins unless specified'
					h Bar,
						big: state.bar_big
						h Input,
							type: 'button'
							i: 'settings'
							select: state.bar_big
							onClick: @toggleBarBig
							label: 'toggle big'
							h AlertDot
						h Input,
							type: 'button'
							btn_type: 'flat'
							label: 'flat'
						h Input,
							type: 'button'
							i: 'favorite'
							btn_type: 'primary'
							label: 'like'
						h Input,
							type: 'button'
							i: 'save'
							# i_type: 'primary'
							btn_type: 'flat'
						h Input,
							type: 'button'
							btn_type: 'default'
							# i_type: 'primary'
							i: 'search'
							type: 'search'
							placeholder: 'search...'
							value: state.input_value
					h 'p',{},'bars can also be vertical.'
					h Bar,
						big: state.bar_big
						vert: yes
						h Input,
							type: 'button'
							i: 'settings'
							select: state.bar_big
							onClick: @toggleBarBig 
							label: 'toggle big'
							h AlertDot
						h Input,
							type: 'button'
							btn_type: 'flat'
							label: 'flat'
						h Input,
							type: 'button'
							i: 'favorite'
							btn_type: 'primary'
							label: 'like'
				h MenuSection,
					big: state.bar_big
					onDragStart: ()=>
						@showOverlay('menu dragging')
					onDragStop: ()=>
						@hideOverlay()

				h Section,
					title: 'ModelGrid'
					h 'p',{},'custom extensible model gird list component. requires peer dependency `react-virtualized` '
					h ModelGridExample
				h Section,
					title: 'colors'
					h 'p',{},'all theme colors that can be passed to the `Style` wrapper'
					h Input,
						btn_type: 'default'
						type: 'color'
						label: 'primary'
						bar: yes
						big: state.bar_big
						value: state.primary
						onInput: @setPrimaryColor
					h Input,
						btn_type: 'default'
						type: 'color'
						big: state.bar_big
						label: 'secondary'
						value: state.secondary
						onInput: @setSecondaryColor
					h 'p',{},'check out some of these presets...'
					h SelectPresetButton,
						primary: '#1B1C1D'
						secondary: '#414277'
						select: state.primary == '#1B1C1D'
						onPresetSelect: @onPresetSelect
					h SelectPresetButton,
						primary: '#F8EED3'
						secondary: '#FD5F55'
						select: state.primary == '#F8EED3'
						onPresetSelect: @onPresetSelect
					h SelectPresetButton,
						primary: '#D5CBDD'
						select: state.primary == '#D5CBDD'
						secondary: '#9559A6'
						onPresetSelect: @onPresetSelect
					h SelectPresetButton,
						primary: '#FFFFFF'
						select: state.primary == '#FFFFFF'
						secondary: '#5F9B9D'
						onPresetSelect: @onPresetSelect

				h Section,
					title: 'overlay'
					h Input,
						label: 'show overlay'
						type: 'button'
						onClick: @showOverlay
					h Input,
						label: 'show overlay error'
						type: 'button'
						onClick: @showOverlayError

			
	render: (props,state)->
		h Style,
			primary: state.primary
			secondary: state.secondary
			onSetStyle: (@primary,@secondary)=>
				document.body.style.background = @primary.inv[0]
				document.body.style.color = @primary.color[0]
			h ModelGridExample






render(h(Demo),document.body)