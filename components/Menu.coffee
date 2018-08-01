{h,Component} = require 'preact'


class Menu extends Component
	constructor: (props)->
		super(props)
		@state=
			width: 0
			height: 0
			force_split_left: false
			force_split_left_x: 0
			force_split_top: false
			force_split_top_x: 0

	getChildContext: ->
		alternate: @props.alternate
		tabClassName: @props.tabClassName
		tabsClassName: @props.tabsClassName
		selectedTabClassName: @props.selectedTabClassName
		vert: @props.vert
		min_x: @props.min_x
		min_y: @props.min_y
		max_x: @props.max_x
		max_y: @props.max_y
		hover_reveal: @props.hover_reveal
		level: 0
		force_split_left: @state.force_split_left
		force_split_left_x: @state.force_split_left_x
		force_split_top: @state.force_split_top
		force_split_top_y: @state.force_split_top_y
		forceSplitTop: @forceSplitTop
		forceSplitLeft: @forceSplitLeft



	componentDidUpdate: ->
		
		# log @state.force_split_left_x
		if @state.width != @base.clientWidth || @state.height != @base.clientHeight || @props.x < @state.force_split_left_x || @props.y < @state.force_split_top_y
			if @props.x < @state.force_split_left_x
				@state.force_split_left = false
				@state.force_split_left_x = 0
			
			if @props.y < @state.force_split_top_y
				@state.force_split_top = false
				@state.force_split_top_y = 0
			
			@setState
				width: @base.clientWidth
				height: @base.clientHeight


	componentDidMount: =>
		@forceUpdate()

	clampPosX: (x)->
		if x + @base.clientWidth > @props.max_x
			return @props.max_x - @base.clientWidth
		return x

	clampPosY: (y)->
		if y + @base.clientHeight > @props.max_y
			return @props.max_y - @base.clientHeight
		return y

	render: (props)->
		x = props.x
		y = props.y

		if @base
			x = @clampPosX(x)
			y = @clampPosY(y)

		h 'div',
			className: props.className
			style: 
				position: 'absolute'
				display: 'flex'
				flexDirection: props.vert && 'column' || 'row'
				left: x
				top: y
			props.children


	forceSplitLeft: (overflow)=>
		overflow = @props.x - overflow
		if overflow <= 0
			return
		# log overflow
		@setState
			force_split_left: true
			force_split_left_x: overflow
	
	forceSplitTop: (overflow)=>
		overflow = @props.y - overflow
		if overflow <= 0
			return
		# log overflow
		@setState
			force_split_top: true
			force_split_top_y: overflow
		
Menu.defaultProps = 
	x: 0
	y: 0
	min_x: 0
	min_y: 0
	tabsClassName: 'menu-tabs'
	tabClassName: 'menu-tab'
	className: 'menu'

module.exports = Menu