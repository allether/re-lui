{h,render,Component} = require 'preact'
css = require './Style.less'
Bar = require './Bar.coffee'
Overlay = require './Overlay.coffee'
Color = require 'color'
class Menu extends Component
	constructor: (props)->
		super(props)
		# @resetBackdropCache()
		@state=
			width: 0
			height: 0
			tab_branch: []
			backdrop_theme_color: null
			backdrop_opaque_color: null

	getChildContext: =>
		onContextTabReveal: @onContextTabReveal
		clearTabBranch: @clearTabBranch
		tab_branch: @state.tab_branch
		alternate: @props.alternate
		selectedTabClassName: @props.selectedTabClassName
		vert: @props.vert
		render_unrevealed_children: @props.render_unrevealed_children
		bounding_box: @props.bounding_box
		big: @props.big
		hover_reveal_enabled: @props.hover_reveal_enabled
		click_reveal_enabled: @props.click_reveal_enabled
		level: 0
		split_x: @props.split_x
		split_y: @props.split_y
		bar_dir_x: @props.bar_dir_x
		bar_dir_y: @props.bar_dir_y
		force_split_x: @props.force_split_x
		force_split_y: @props.force_split_y
		

	# componentWillUpdate: ->
	componentWillUpdate: (props)->
		if props.backdrop_opaque_color 
			@state.backdrop_opaque_color = props.backdrop_opaque_color
		

	componentDidUpdate: ->	
		# log @state.reveal	
		if @state.width != @base.clientWidth || @state.height != @base.clientHeight || @props.x < @state.force_split_left_x || @props.y < @state.force_split_top_y
			if @props.x < @state.force_split_left_x
				@state.force_split_left = false
				@state.force_split_left_x = 0
			
			if @props.y < @state.force_split_top_y
				@state.force_split_top = false
				@state.force_split_top_y = 0
			
			@state.width = @base.clientWidth
			@state.height = @base.clientHeight
		
		@state.reveal = undefined
		

		@props.enable_backdrop && @renderBackdrop()


	componentDidMount: =>
		@forceUpdate()


	# clampPosX: (x)->

	# 	if x + @base.clientWidth > @props.max_x
	# 		return @props.max_x - @base.clientWidth
	# 	return x


	# clampPosY: (y)->
	# 	if y + @base.clientHeight > @props.max_y
	# 		return @props.max_y - @base.clientHeight
	# 	return y


	onClickBackdrop: (e)=>
		@clearTabBranch(e)
		@props.onClickBackdrop?(e)


	renderBackdrop: =>
		overlay = h Overlay,
			z_index: 90
			onClick: @onClickBackdrop
			background: @state.backdrop_opaque_color
			visible: @props.show_backdrop
		
		@_backdrop = render(overlay,document.body,@_backdrop)


	clearTabBranch: (e)=>
		@state.tab_branch.length = 0
		@setState()


	onContextTabReveal: (tab_branch,e)=>
		@setState
			tab_branch: tab_branch


	componentWillUnmount: ->
		@_backdrop?.remove()


	render: (props)->
		# log 'render menu'
		props.bounding_box.right = window.innerWidth
		props.bounding_box.bottom = window.innerHeight
		x = props.x
		y = props.y

		if @state.backdrop_color != @context.__theme.primary.color[3]
			@state.backdrop_color = @context.__theme.primary.color[3]
			@state.backdrop_opaque_color = Color(@state.backdrop_color).alpha(.8).string()


		# if @base
		# 	x = @clampPosX(x)
		# 	y = @clampPosY(y)


		if props.fixed
			fixed_style=
				left: x
				top: y
				position:'fixed'
				zIndex: props.zIndex || 999


		h Bar,
			vert: props.vert
			big: props.big
			style: fixed_style
			className: props.className
			props.children


	# forceSplitLeft: (overflow)=>
	# 	overflow = @props.x - overflow
	# 	if overflow <= 0
	# 		return
		
	# 	@setState
	# 		force_split_left: true
	# 		force_split_left_x: overflow

	
	# forceSplitTop: (overflow)=>
	# 	overflow = @props.y - overflow
	# 	if overflow <= 0
	# 		return
		
	# 	@setState
	# 		force_split_top: true
	# 		force_split_top_y: overflow

		
Menu.defaultProps = 
	x: 0
	y: 0
	split_x: 1
	force_split_x: 0
	force_split_y: 0
	split_y: 1
	bar_dir_x: 1
	bar_dir_y: 1
	bounding_box: {left:0,top:0,right:Infinity,bottom:Infinity}
	enable_backdrop: false

module.exports = Menu