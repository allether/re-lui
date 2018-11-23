{h,Component} = require 'preact'
Bar = require './Bar.coffee'
css = require './Style.less'

class MenuTab extends Component
	constructor: (props)->
		super(props)
		@state =
			reveal: props.reveal || false
			show_backdrop: false
			x1:0
			x2:0
			y1:0
			y2:0
			cw:0
			ch:0


	getSplitVert: (props)->
		if props.vert?
			split_vert = props.vert
		else
			split_vert = if @context.alternate then !@context.vert else @context.vert
		return split_vert
	

	getChildContext: ->
		vert: @getSplitVert(@props)
		onContextTabReveal: @onContextTabReveal
		tab_branch: @context.tab_branch
		level: @context.level+1
		hover_reveal: if @props.hover_reveal? then @props.hover_reveal else @context.hover_reveal
		click_reveal: if @props.click_reveal? then @props.click_reveal else @context.click_reveal
		big: @props.big || @context.big
		reveal: if @state.reveal == false then false else @context.reveal


	childContainer: (el)=>
		@_child_container = el?.base


	# disableReveal: (e)=>
	# 	if @props.reveal? then return false
	# 	clearInterval @_hide_timeout
	# 	if @props.children?.length
	# 		@_hide_timeout = setTimeout ()=>
	# 			@setState
	# 				reveal: no
	# 		,@context.hide_delay
	# 	else
	# 		@setState
	# 			reveal: no
	

	# enableReveal: (e)=>
	# 	if @props.reveal? then return false
	# 	clearInterval @_hide_timeout
	# 	@setState
	# 		reveal: yes
	
	syncRevealState: (props)->
		if props.reveal?
			@state.reveal = props.reveal
			return

		if @context.reveal == false
			@state.reveal = false
			return


	componentWillMount: ->
		@syncRevealState(@props)
	
	componentWillUpdate: (props)->
		# log @context.tab_branch && @context.tab_branch.length

		# if @context.click_reveal || @props.click_reveal
		# log props.reveal
		if !(props.reveal?)
			if @context.tab_branch[@context.level] != @
				@state.reveal = false
			else
				@state.reveal = true
			
		@syncRevealState(props)




	componentDidUpdate: ->
		@_rect = @base.getBoundingClientRect()
		x1 = @_rect.left
		x2 = @_rect.left + @_rect.width
		y1 = @_rect.top
		y2 = @_rect.top + @_rect.height

		cw = @_child_container?.clientWidth || 0
		ch = @_child_container?.clientHeight || 0

		@state.x1 = x1
		@state.x2 = x2
		@state.y1 = y1
		@state.y2 = y2
		@state.cw = cw
		@state.ch = ch
		
		if @state.x1 == x1 && @state.x2 == x2 && @state.y1 == y1 && @state.y2 == y2 && cw == @state.cw && ch == @state.ch
			return
	
		if @props.vert?
			split_vert = @props.vert
		else
			split_vert = if @context.alternate then !@context.vert else @context.vert

		if y2 + ch > @context.max_y && !@context.force_split_top
			return @context.forceSplitTop(y2 + ch - @context.max_y)
		
		if x2 + cw > @context.max_x && !@context.force_split_left
			return @context.forceSplitLeft(x2 + cw - @context.max_x)

		@setState()






	revealSelfTab: (e)=>
		@context.tab_branch.length = 0
		@context.tab_branch[0] = @
		@context.onContextTabReveal(@context.tab_branch,e)
		e.preventDefault()
		e.stopPropagation()
		return false
	
	onContextTabReveal: (tree,e)=>

		tree.unshift @
		@context.onContextTabReveal(tree,e)

	
	onTabClick: (e)=>
		@revealSelfTab(e)
		@props.onClick?(e)
		return false
	
	onTabMouseEnter: (e)=>
		if !@state.reveal
			@revealSelfTab(e)
		@props.onMouseEnter?(e)
		return false
	
	onTabMouseLeave: (e)=>
		if @props.reveal then return
		if (!@context.hover_reveal || @props.hover_reveal == false) then return
		if @context.level == 0
			@context.clearTabBranch(e)
		# @disableReveal(e)
		@props.onMouseLeave?(e)
		return false
	

	render: (props,state)->
		

		if @context.hover_reveal?
			hover_reveal = @context.hover_reveal
		else if props.hover_reveal
			hover_reveal = props.hover_reveal

		split_vert = @getSplitVert(props)
		if @base && state.reveal
			if !@context.vert
				if @state.x1 + @state.cw > @context.max_x || @context.force_split_left
					right = '0%'
					left = null
				else
					left = '0%'
					right = null

				if (@state.y2 + @state.ch > @context.max_y) || @context.force_split_top
					top = null
					bottom = '100%'
				else 
					top = '100%'
					bottom = null
				
			else
				if @state.x2 + @state.cw > @context.max_x || @context.force_split_left
					right = '100%'
					left = null
				else
					left = '100%'
					right = null
					flex_dir = 'row'
					
				if @state.y1 + @state.ch > @context.max_y || @context.force_split_top
					bottom = '0%'
					top = null
				else
					top = '0%'
					bottom = null


		if split_vert
			if @state.y2 + @state.ch > @context.max_y || @context.force_split_top
				flex_dir = 'column-reverse'
			else
				flex_dir = 'column'
		else
			if @state.x2 + @state.cw > @context.max_x || @context.force_split_left
				flex_dir = 'row-reverse'
			else
				flex_dir = 'row'

		z_index = (@context.level+1)*100

		
			# @context.showBackdrop()

		if (@context.render_hidden? && @context.render_hidden) || !@context.render_hidden? || @props.render_hidden || state.reveal
			bar = h Bar,
				big: if props.big? then props.big else @context.big
				className: css['menu-bar']##+' ' + css['modal-shadow']
				ref: @childContainer
				vert: split_vert
				style:
					zIndex: z_index
					left: left
					top: top
					visibility: state.reveal && 'visible' || 'hidden'
					bottom: bottom
					right: right
					flexDirection: flex_dir
				props.children

		if props.children.length && !props.disabled
			props.content.attributes.select = state.reveal
		
		h 'div',
			className: css['tab-wrapper'] + ' ' + (props.className || '')
			onMouseLeave: @onTabMouseLeave
			onMouseEnter: @onTabMouseEnter
			onClick: @onTabClick
			style:
				zIndex: state.reveal && z_index || 'unset'
			props.content
			bar




module.exports = MenuTab