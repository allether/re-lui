css = require './Style.less'
Bar = require './Bar.coffee'
Color = require 'color'
{createContext} = require 'react'
{StyleContext} = require './Style.coffee'

# Overlay = require './Overlay.coffee'

MenuContext = createContext({})
global.MenuContext = MenuContext

class Menu extends Component
	constructor: (props)->
		super(props)
		@state=
			width: 0
			height: 0
			tab_branch: []
			backdrop_color: props.backdrop_color || '#000'
		
		

	
	getContext: =>
		onContextTabReveal: @onContextTabReveal
		backdrop_color: @props.backdrop_color || @state.backdrop_color
		spliceTabBranch: @spliceTabBranch
		onClickBackdrop: @props.onClickBackdrop
		tab_branch: @state.tab_branch
		alternate: @props.alternate
		vert: @props.vert
		render_unrevealed_children: @props.render_unrevealed_children || false
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
	
	spliceTabBranch: (tab)=>
		tab_i = @state.tab_branch.indexOf(tab)

		if tab_i < 0
			return
		@state.tab_branch.splice(tab_i)
		@forceUpdate()

	# componentWillUpdate: (props,state)->
	# 	if props.backdrop_color != @props.backdrop_color
	# 		state.backdrop_opaque_color = @setColor(props.backdrop_color)


	# componentDidUpdate: ->	
	# 	@state.reveal = undefined
		

	componentDidMount: =>
		@forceUpdate()


	onClickBackdrop: (e)=>
		@clearTabBranch(e)
		@props.onClickBackdrop?(e)


	clearTabBranch: (e)=>
		@state.tab_branch.length = 0
		@forceUpdate()


	onContextTabReveal: (tab_branch,e)=>
		@setState
			tab_branch: tab_branch


	render: ->

		bar_style = {}

		if @props.fixed
			bar_style.left = @props.left
			bar_style.top = @props.top
			bar_style.position = 'fixed'
		if @props.style
			Object.assign bar_style,@props.style
		h MenuContext.Provider,
			value: @getContext()
			h Bar,
				btn: false
				vert: @props.vert
				big: @props.big
				style: bar_style
				className: @props.className
				@props.children
				# backdrop

		
Menu.defaultProps = 
	x: 0
	y: 0
	split_x: 1
	# force_split_x: 0
	# force_split_y: 0
	split_y: 1
	bar_dir_x: 1
	bar_dir_y: 1
	bounding_box: {x:0,y:0,width:Infinity,height:Infinity}
	show_backdrop: undefined

Menu.contextType = StyleContext

module.exports = Menu