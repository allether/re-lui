{render,h,Component} = require 'preact'

window.log = console.log.bind(console)
Style = require './components/Style.coffee'
AlertDot = require './components/AlertDot.coffee'
Input = require './components/Input.coffee'
{Menu,MenuTab} = require './components/Menu.coffee'
Section = require './components/Section.coffee'
Bar = require './components/Bar.coffee'
css = require './demo.less'
lerp_logo = require './lerp-logo-40.svg'


class SvgIcon extends Component
	componentDidMount: ->
		@base.innerHTML = @props.icon;
	render: ->
		h 'div',
			className: 'icon'
				@props.icon

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

	render: (props,state)->
		h Style,
			primary: state.primary
			secondary: state.secondary
			
			# tertiary: '#379CC6'
			h 'div',
				className: 'app'
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
						placeholder: 'comma seperated list'
					h Input,
						type: 'list'
						placeholder: 'comma seperated list'
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

				h Section,
					title: 'bar'
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
					title: 'context menu'
					h 'p',{},'context menu made out of bars'
					h Menu,
						vert: false
						alternate: yes
						h MenuTab,
							content: h Input,
								btn_type: 'button'
								label: 'option 1'
								h Input,
									btn_type: 'button'
									label: 'option 1 a'
								h Input,
									btn_type: 'button'
									label: 'option 1 b'
								h Input,
									btn_type: 'button'
									label: 'option 1 c'
						h MenuTab,
							content: h Input,
								btn_type: 'button'
								label: 'option 1'
						h MenuTab,
							content: h Input,
								btn_type: 'button'
								label: 'option 1'




render(h(Demo),document.body)