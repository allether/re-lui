{h,Component} = require 'preact'
css = require './Style.less'
Bar = require './Bar.coffee'

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

	getChildContext: =>
		hide_delay: @props.hide_delay
		alternate: @props.alternate
		tabClassName: @props.tabClassName
		tabsClassName: @props.tabsClassName
		selectedTabClassName: @props.selectedTabClassName
		vert: @props.vert
		render_hidden: @props.render_hidden
		min_x: @props.min_x
		min_y: @props.min_y
		max_x: @props.max_x
		max_y: @props.max_y
		big: @props.big
		hover_reveal: @props.hover_reveal
		level: 0
		force_split_left: if @props.force_split_left? then @props.force_split_left else @state.force_split_left
		force_split_top: if @props.force_split_top? then @props.force_split_top else @state.force_split_top
		forceSplitTop: @forceSplitTop
		forceSplitLeft: @forceSplitLeft



	componentDidUpdate: ->
		
		
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

		if props.fixed
			fixed_style=
				left: x
				top: y
				position:'fixed'
				zIndex: 10

		h Bar,
			vert: props.vert
			big: props.big
			style: fixed_style
			className: props.className
			props.children


	forceSplitLeft: (overflow)=>
		overflow = @props.x - overflow
		if overflow <= 0
			return
		
		@setState
			force_split_left: true
			force_split_left_x: overflow
	
	forceSplitTop: (overflow)=>
		overflow = @props.y - overflow
		if overflow <= 0
			return
		
		@setState
			force_split_top: true
			force_split_top_y: overflow
		
Menu.defaultProps = 
	x: 0
	y: 0
	min_x: 0
	min_y: 0
	hide_delay: 0

module.exports = Menu