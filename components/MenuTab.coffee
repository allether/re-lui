{h,Component} = require 'preact'
Bar = require './Bar.coffee'
css = require './Style.less'
Overlay = require './Overlay.coffee'
class MenuTab extends Component
	constructor: (props)->
		super(props)
		@state =
			reveal: props.reveal || false
			pre_render_visibility : false
			# show_backdrop: false



	

	getChildContext: ->
		vert: @getBarSplitVert(@props)
		onContextTabReveal: @onContextTabReveal
		tab_branch: @context.tab_branch
		level: @context.level+1
		bar_dir_x: @state.bar_dir_x
		bar_dir_y: @state.bar_dir_y
		split_x: @state.split_x
		split_y: @state.split_y
		hover_reveal_enabled: if @props.hover_reveal_enabled? then @props.hover_reveal_enabled else @context.hover_reveal_enabled
		click_reveal_enabled: if @props.click_reveal_enabled? then @props.click_reveal_enabled else @context.click_reveal_enabled
		big: if @props.big? then @props.big else @context.big
		reveal: if @state.reveal == false then false else @context.reveal


	childContainer: (el)=>
		@_child_container = el?.base
	

	
	componentDidMount: ()->
		@forceUpdate()

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
		e.preventDefault()
		e.stopPropagation()
		return false
	

	onContextTabReveal: (tree,e)=>
		# log tree
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
			return

		if @context.hover_reveal_enabled && @state.reveal
			return

		if !@state.reveal
			@revealSelfTab(e)
		
		return false

	onClickBackdrop: (e)=>
		if @props.onClickBackdrop
			@props.onClickBackdrop(e)
		else if @context.onClickBackdrop
			@context.onClickBackdrop(e)
		e.preventDefault()
		e.stopPropagation()
		return false
	

	onTabMouseLeave: (e)=>
		@props.onMouseLeave?(e)
		
		if @props.hover_reveal_enabled == false
			return

		if @context.hover_reveal_enabled && @state.reveal
			return
		@context.spliceTabBranch(@)
		

	getFullBoundingBoxOverflowBounds: (rr)->
		split_vert = !@context.vert
		bb = @props.bounding_box || @context.bounding_box
		rr.top = rr.top - bb.y
		rr.bottom = rr.bottom - (bb.y+bb.height)
		rr.left = rr.left - bb.x
		rr.right = rr.right - (bb.x+bb.width)
		return rr


	getFullBoundingBox: (split_x,split_y,bar_dir_x,bar_dir_y)->
		split_vert = !@context.vert
		rr = {}
		rect = @base?.getBoundingClientRect()
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


		if (split_y != @state.split_y || @state.bar_dir_x != bar_dir_x || split_y != @state.split_y || @state.bar_dir_x != bar_dir_x)
			force_update = true

		@state.split_vert = split_vert
		@state.split_x = if props.force_split_x? then props.force_split_x else split_x
		@state.split_y = if props.force_split_y? then props.force_split_y else split_y
		@state.bar_dir_x = if props.force_bar_dir_x? then props.force_bar_dir_x else bar_dir_x
		@state.bar_dir_y = if props.force_bar_dir_y? then props.force_bar_dir_y else bar_dir_y
		@state.z_index = (@context.level+1)*100
		
		@state.bar_children_split_vert = bar_children_split_vert
		
		@state.render_unrevealed_children = if props.render_unrevealed_children? then props.render_unrevealed_children else @context.render_unrevealed_children
		@state.hover_reveal_enabled = if props.hover_reveal_enabled? then props.hover_reveal_enabled else @context.hover_reveal_enabled
		
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
					if !@props.show_backdrop
						@setState
							backdrop_visible: false
				,310
			else
				@state.backdrop_visible = false

		if !props.children.length
			@state.hide_rendered_children = false
			return
		@state.hide_rendered_children = false
		@calculateRevealState(props)
		force_update = @calculateSplitDirections(props,state)

		if @state.skipped_last_children_render && @state.render_children
			@state.skipped_last_children_render = false
			force_update = true
		else if !@state.render_children && @props.children.length
			@state.skipped_last_children_render = true
		
		if force_update
			
			@state.hide_rendered_children = true
			setTimeout @forceUpdate.bind(@),0



	render: (props,state)->
		if @state.backdrop_visible 
			@state.z_index = (@context.level+1)*100 + 10000
		else
			@state.z_index = (@context.level+1)*100

		reveal = state.reveal
		if props.children.length && !props.disabled
			props.content.attributes.select = state.reveal
		backdrop = null
		if @state.backdrop_visible
			backdrop = h Overlay,
				z_index: -1
				initial_visible: false
				onClick: @onClickBackdrop
				background: @props.backdrop_opaque_color || @context.backdrop_opaque_color
				visible: @props.show_backdrop


		if !@state.render_children
			return h 'div',
				style: Object.assign({zIndex: @state.z_index},props.tab_style)
				className: css['tab-wrapper'] + ' ' + (props.className || '')
				onMouseLeave: @state.hover_reveal_enabled && @onTabMouseLeave
				onMouseEnter: @state.hover_reveal_enabled && @onTabMouseEnter
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


		bar = h Bar,
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
			className: css['tab-wrapper'] + ' ' + (props.className || '')
			onMouseLeave: @state.hover_reveal_enabled && @onTabMouseLeave
			onMouseEnter: @state.hover_reveal_enabled && @onTabMouseEnter
			onClick: @onTabClick
			style: tab_style
			props.content
			bar
			backdrop

# MenuTab.defaultProps = 
module.exports = MenuTab