Bar = require './Bar.coffee'
css = require './Style.less'
Overlay = require './Overlay.coffee'
{createContext} = require 'react'
{StyleContext} = require './Style.coffee'


MenuTabContext = createContext()
global.MenuTabContext = MenuTabContext
class MenuTab extends Component
	constructor: (props)->
		super(props)
		@state =
			reveal: props.reveal || false
			pre_render_visibility : false
			# show_backdrop: false


	getContext: ->
		onContextTabReveal: @context.onContextTabReveal
		spliceTabBranch: @context.spliceTabBranch
		onClickBackdrop: @context.onClickBackdrop
		backdrop_color: @context.backdrop_color
		alternate: @context.alternate
		render_unrevealed_children: if @props.render_unrevealed_children? then @props.render_unrevealed_children else @context.render_unrevealed_children
		bounding_box: if @props.bounding_box? then @props.bounding_box else @context.bounding_box
		big: if @props.big? then @props.big else @context.big
		vert: @getBarSplitVert(@props)
		onContextTabReveal: @onContextTabReveal
		tab_branch: @context.tab_branch
		level: @context.level+1
		bar_dir_x: @state.bar_dir_x
		bar_dir_y: @state.bar_dir_y
		split_x: @state.split_x
		split_y: @state.split_y
		force_split_x: if @props.force_split_x? then @props.force_split_x else @context.force_split_x
		force_split_y: if @props.force_split_y? then @props.force_split_y else @context.force_split_y
		hover_reveal_enabled: if @props.hover_reveal_enabled? then @props.hover_reveal_enabled else @context.hover_reveal_enabled
		click_reveal_enabled: if @props.click_reveal_enabled? then @props.click_reveal_enabled else @context.click_reveal_enabled
		big: if @props.big? then @props.big else @context.big
		reveal: if @state.reveal == false then false else @context.reveal


	childContainer: (el)=>
		@_child_container = el?.base



	componentDidMount: ()->
		@forceUpdate()


	componentWillUnmount: ->
		clearTimeout @_hide_backdrop_timeout


	componentWillMount: ->
		@state.hide_rendered_children = true
		@calculateRevealState(@props,@state)
		if @calculateSplitDirections(@props,@state)
			@state.hide_rendered_children = true
			setTimeout @forceUpdate.bind(@),0

	
	revealSelfTab: (e)=>
		@context.tab_branch.length = 0
		@context.tab_branch[0] = @
		@context.onContextTabReveal(@context.tab_branch,e)
		return false
	

	onContextTabReveal: (tree,e)=>
		tree.unshift @
		@context.onContextTabReveal(tree,e)

	
	onTabClick: (e)=>
		if @props.reveal == false then return @props.onClick?(e)
		if @props.hover_reveal_enabled == true || @context.hover_reveal_enabled == true
			return
		if @props.click_reveal_enabled == true || @context.click_reveal_enabled == true
			@revealSelfTab(e)
		@props.onClick?(e)
		return false
	

	onTabMouseEnter: (e)=>
		@props.onMouseEnter?(e)
		# log @context.hover_reveal_enabled,@state.reveal
		if @props.hover_reveal_enabled == false
			return false

		if @context.hover_reveal_enabled && @state.reveal
			return false

		if !@state.reveal && @props.children
			return @revealSelfTab(e)
	
		
		# return false

	onClickBackdrop: (e)=>
		if @props.onClickBackdrop
			@props.onClickBackdrop(e)
		else if @context.onClickBackdrop
			@context.onClickBackdrop(e)
		e.preventDefault()
		e.stopPropagation()
		return false
	

	onTabMouseLeave: (e)=>
		# log 'mouse leave'
		@props.onMouseLeave?(e)
		if (@props.hover_reveal_enabled == false || @context.hover_reveal_enabled == false) || (@props.click_reveal_enabled || @context.click_reveal_enabled) || @props.reveal?
			# log 'ret'
			return

		@context.spliceTabBranch(@)
		

	getFullBoundingBoxOverflowBounds: (rr)->
		split_vert = !@context.vert
		bb = @props.bounding_box || @context.bounding_box
		# log bb,rr
		rr.top = rr.top - bb.y
		rr.bottom = rr.bottom - (bb.y+bb.height)
		rr.left = rr.left - bb.x
		rr.right = rr.right - (bb.x+bb.width)
		return rr


	getFullBoundingBox: (split_x,split_y,bar_dir_x,bar_dir_y)->
		split_vert = !@context.vert
		rr = {}
		rect = @base?.getBoundingClientRect()
		# log rect
		if !rect
			return rr
		
		cw = @_child_container?.clientWidth
		ch = @_child_container?.clientHeight

		if rect
			rr.left = rect.x
			rr.right = rect.x + rect.width
			rr.top = rect.y
			rr.bottom = rect.y + rect.height

		

		if split_vert && !split_y
			throw new Error 'split_vert && !split_y'

		else if !split_vert && !split_x
			throw new Error '!split_vert && !split_x'

		else if !split_vert && !bar_dir_y
			throw new Error '!split_vert && !bar_dir_y'

		else if split_vert && !bar_dir_x
			throw new Error '!split_vert && !bar_dir_y'

		if split_vert
			if split_y < 0
				rr.top -= ch
			else
				rr.bottom += ch
			if bar_dir_x > 0
				rr.right += cw - rect.width
			else
				rr.left -= cw - rect.width

		else if !split_vert
			if split_x < 0
				rr.left -= cw
			else
				rr.right += cw

			if bar_dir_y > 0
				rr.bottom += ch - rect.height
			else
				rr.top -= ch - rect.height

		return rr


	calculateRevealState: (props)->
		if !(props.reveal?)
			if @context.tab_branch[@context.level] != @
				@state.reveal = false
				return
			else
				@state.reveal = true
				return
		
		if props.reveal?
			@state.reveal = props.reveal
			return

		if @context.reveal == false
			@state.reveal = false
			return


	getBarSplitVert: (props)->
		if props.vert?
			split_vert = props.vert
		else
			split_vert = if @context.alternate then !@context.vert else @context.vert
		return split_vert

	calculateSplitDirections : (props,state)->
		
		split_vert = !@context.vert
	
		split_x = (props.split_x || @context.split_x)# where the children bar will be located relative to the tab (left or right)
		split_y = (props.split_y || @context.split_y)# where the children bar will be located (top or bottom)
		if !split_x && !split_y
			if split_vert
				split_y = 1
			else
				split_x = 1

		bar_children_split_vert = @getBarSplitVert(props)

		
		bar_dir_y = if props.bar_dir_y? then props.bar_dir_y else @context.split_y
		bar_dir_x = if props.bar_dir_x? then props.bar_dir_x else @context.split_x

	
		ob = @getFullBoundingBoxOverflowBounds(@getFullBoundingBox(split_x,split_y,bar_dir_x,bar_dir_y))
		# log ob

		if split_y > 0 && ob.bottom > 0 && split_vert
			split_y = -1
		else if split_y < 0 && ob.top < 0 && split_vert
			split_y = 1
		
		else if split_x < 0 && ob.left < 0 && !split_vert
			split_x = 1
		else if split_x > 0 && ob.right > 0 && !split_vert
			split_x = -1

		if !split_vert && ob.top < 0
			bar_dir_y = 1
		else if !split_vert && ob.bottom > 0
			bar_dir_y = -1
		
		else if split_vert && ob.left < 0
			bar_dir_x = 1
		else if split_vert && ob.right > 0
			bar_dir_x = -1


		

		@state.split_vert = split_vert
		split_x = if props.force_split_x? then props.force_split_x else split_x
		split_y = if props.force_split_y? then props.force_split_y else split_y
		bar_dir_x = if props.force_bar_dir_x? then props.force_bar_dir_x else bar_dir_x
		bar_dir_y = if props.force_bar_dir_y? then props.force_bar_dir_y else bar_dir_y
		force_update = false
		if (split_y != @state.split_y || @state.bar_dir_x != bar_dir_x || split_x != @state.split_x || @state.bar_dir_y != bar_dir_y)
			# log 'force update',split_y != @state.split_y,@state.bar_dir_x != bar_dir_x,split_y != @state.split_y,@state.bar_dir_x != bar_dir_x
			force_update = true

		@state.split_x = split_x
		@state.split_y = split_y
		@state.bar_dir_x = bar_dir_x
		@state.bar_dir_y = bar_dir_y
		
		@state.z_index = (@context.level+1)*100
		
		@state.bar_children_split_vert = bar_children_split_vert
		
		@state.render_unrevealed_children = if props.render_unrevealed_children? then props.render_unrevealed_children else @context.render_unrevealed_children
		@state.hover_reveal_enabled = if props.hover_reveal_enabled? then props.hover_reveal_enabled else @context.hover_reveal_enabled
		
		# log @state.hover_reveal_enabled
		if @state.render_unrevealed_children || @state.reveal
			@state.render_children = true
		else
			@state.render_children = false

		return force_update


	componentWillUpdate: (props,state)->

		if props.show_backdrop
			@state.backdrop_visible = true
		else
			if @props.show_backdrop
				clearTimeout(@_hide_backdrop_timeout)
				@_hide_backdrop_timeout = setTimeout ()=>
					@_hide_backdrop_timeout = null
					if !@props.show_backdrop
						@setState
							backdrop_visible: false
				,310
			else
				@state.backdrop_visible = false

		if !props.children
			@state.hide_rendered_children = false
			return
		@state.hide_rendered_children = false
		@calculateRevealState(props)
		force_update = @calculateSplitDirections(props,state)

		if @state.skipped_last_children_render && @state.render_children
			@state.skipped_last_children_render = false
			force_update = true
		else if !@state.render_children && @props.children
			@state.skipped_last_children_render = true
		
		# log 'update'
		# log @state.hide_rendered_children
		if force_update
			@state.hide_rendered_children = true
			setTimeout @forceUpdate.bind(@),0

	baseRef: (el)=>
		@base = el
		# log @base

	render: ->
		props = @props
		state = @state
		if @state.backdrop_visible 
			@state.z_index = (@context.level+1)*100 + 10000
		else
			@state.z_index = (@context.level+1)*100

		reveal = state.reveal
		
		backdrop = null
		if @state.backdrop_visible
			backdrop = h Overlay,
				z_index: -1
				initial_visible: false
				onClick: @onClickBackdrop
				backdrop_color: props.backdrop_color || @context.backdrop_color
				visible: @props.show_backdrop


		if !@state.render_children
			return h 'div',
				ref: @baseRef
				style: Object.assign({zIndex: @state.z_index},props.tab_style)
				className: css['tab-wrapper'] + ' ' + (props.className || '')
				onMouseLeave: @state.hover_reveal_enabled && @onTabMouseLeave || undefined
				onMouseEnter: @state.hover_reveal_enabled && @onTabMouseEnter || undefined
				onClick: @onTabClick
				props.content
				backdrop


		bar_style = {}
		if props.bar_style
			Object.assign bar_style,props.bar_style
		
		
		if !@state.split_vert && @state.split_x > 0
			bar_style.right = null
			bar_style.left = '100%'
		else if !@state.split_vert && @state.split_x < 0
			bar_style.right = '100%'
			bar_style.left = null


		if @state.split_vert && @state.split_y < 0
			bar_style.top = null
			bar_style.bottom = '100%'
		else if @state.split_vert && @state.split_y > 0
			bar_style.top = '100%'
			bar_style.bottom = null


		if !@state.split_vert && @state.bar_dir_y < 0
			flex_dir = 'column-reverse'
		else if !@state.split_vert && @state.bar_dir_y > 0
			flex_dir = 'column'
		else if @state.split_vert && @state.bar_dir_x < 0
			flex_dir = 'row-reverse'
		else if @state.split_vert && @state.bar_dir_x > 0
			flex_dir = 'row'

			
		bar_style.zIndex = @state.z_index

	
		if @state.hide_rendered_children
			bar_style.visibility = 'hidden'
		else
			bar_style.visible = 'visible'

	
		bar = h MenuContext.Provider,
			value: @getContext()
			h Bar,
				big: if props.big? then props.big else @context.big
				className: css['menu-bar']
				ref: @childContainer
				vert: @state.bar_children_split_vert
				style: bar_style
				props.children

		
		tab_style = {}
		if props.tab_style
			Object.assign tab_style,props.tab_style
		
		tab_style.zIndex = @state.z_index || 'unset'
		tab_style.flexDirection = flex_dir
		
		h 'div',
			ref: @baseRef
			className: css['tab-wrapper'] + ' ' + (props.className || '')
			onMouseLeave: @state.hover_reveal_enabled && @onTabMouseLeave || undefined
			onMouseEnter: @state.hover_reveal_enabled && @onTabMouseEnter || undefined
			onClick: @onTabClick
			onKeyDown: @props.onKeyDown
			style: tab_style
			h MenuTabContext.Provider,
				value: reveal
				props.content
			bar
			backdrop

# MenuTab.defaultProps = 
MenuTab.contextType = MenuContext
module.exports = MenuTab