{h,Component} = require 'preact'
Bar = require './Bar.coffee'
DEFAULT_DIM = 30


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

class MenuTab extends Component
	constructor: (props)->
		super(props)
		@state =
			reveal: props.reveal || false
			x1:0
			x2:0
			y1:0
			y2:0
			cw:0
			ch:0
			
	getChildContext: ->
		vert: if @context.alternate then !@context.vert else @context.vert
		level: @context.level+1
		reveal: if @state.reveal == false then false else @context.reveal

	childContainer: (el)=>
		@_child_container = el
	onMouseLeave: (e)=>
		@setState
			reveal: no
	onMouseEnter: (e)=>
		@setState
			reveal: yes
	onClick: (e)=>
		@props.onClick?()

		if !@props.children.length then return
		@setState
			reveal: !@state.reveal
		e.preventDefault()
		return false

	componentDidUpdate: ->
		@_rect = @base.getBoundingClientRect()
		x1 = @_rect.left
		x2 = @_rect.left + @_rect.width
		y1 = @_rect.top
		y2 = @_rect.top + @_rect.height


		cw = @_child_container?.clientWidth || 0
		ch = @_child_container?.clientHeight || 0


		if @state.x1 == x1 && @state.x2 == x2 && @state.y1 == y1 && @state.y2 == y2 && cw == @state.cw && ch == @state.ch
			return
	
		if @props.vert?
			split_vert = @props.vert
		else
			split_vert = if @context.alternate then !@context.vert else @context.vert


		if y2 + ch > @context.max_y && !@context.force_split_top
			return @context.forceSplitTop(y2 + ch - @context.max_y)
		
		if x2 + cw > @context.max_x && !@context.force_split_left
			# log x2,cw,@context.max_x
			# console.dir @base
			return @context.forceSplitLeft(x2 + cw - @context.max_x)


		@setState
			x1: x1
			x2: x2
			y1: y1
			y2: y2
			cw: cw
			ch: ch


	render: (props)->
		if @context.reveal == false
			reveal = false
		else if @state.reveal == false
			reveal = false
		else
			reveal = true

		if @context.hover_reveal?
			hover_reveal = @context.hover_reveal
		else if props.hover_reveal
			hover_reveal = props.hover_reveal

		if props.className?
			tabClassName = props.className
		else
			tabClassName = @context.tabClassName

		if props.tabsClassName?
			tabsClassName = props.tabsClassName
		else
			tabsClassName = @context.tabsClassName

		if reveal && props.children.length
			tabClassName += ' ' + (@props.selectedTabClassName || @context.selectedTabClassName)


		if props.vert?
			split_vert = props.vert
		else
			split_vert = if @context.alternate then !@context.vert else @context.vert

		if @base && @state.reveal
			if !@context.vert
				if @state.x1 + @state.cw > @context.max_x || @context.force_split_left
					log 'right'
					# log @context.force_split_left
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

		h 'div',
			style:
				position: 'relative'
			onMouseLeave: hover_reveal && @onMouseLeave
			h 'div',
				className: tabClassName
				onMouseEnter: hover_reveal && @onMouseEnter
				props.content
			h Bar,
				vert: split_vert
				style:
					zIndex: @context.level
					position: 'absolute'
					left: left
					top: top
					visibility: reveal && 'visible' || 'hidden'
					bottom: bottom
					right: right
					display: 'flex'
					flexDirection: flex_dir
				props.children

module.exports = {Menu,MenuTab}