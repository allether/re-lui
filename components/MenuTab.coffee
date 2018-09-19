{h,Component} = require 'preact'
Bar = require './Bar.coffee'
css = require './Style.less'

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

	getSplitVert: (props)->
		if props.vert?
			split_vert = props.vert
		else
			split_vert = if @context.alternate then !@context.vert else @context.vert
		return split_vert
	
	getChildContext: ->
		vert: @getSplitVert(@props)
		level: @context.level+1
		reveal: if @state.reveal == false then false else @context.reveal

	childContainer: (el)=>
		@_child_container = el
	onMouseLeave: (e)=>
		if @props.reveal? then return false
		clearInterval @_hide_timeout
		@_hide_timeout = setTimeout ()=>
			@setState
				reveal: no
		,@context.hide_delay
	onMouseEnter: (e)=>
		if @props.reveal? then return false
		clearInterval @_hide_timeout
		@setState
			reveal: yes
	onClick: (e)=>
		@props.onClick?()

		if !@props.children.length then return
		@setState
			reveal: !@state.reveal
		e.preventDefault()
		return false
	componentWillUpdate: (props)->
		if props.reveal != @props.reveal && props.reveal?

			@setState
				reveal: props.reveal

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


		split_vert = @getSplitVert(props)

		if @base && @state.reveal
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

		if (@context.render_hidden? && @context.render_hidden) || !@context.render_hidden? || @props.render_hidden || reveal
			bar = h Bar,
				big: if props.big? then props.big else @context.big
				className: css['menu-bar']
				vert: split_vert
				style:
					zIndex: @context.level+300
					left: left
					top: top
					visibility: reveal && 'visible' || 'hidden'
					bottom: bottom
					right: right
					flexDirection: flex_dir
				props.children
		props.content.attributes.select = reveal

		h 'div',
			className: css['tab-wrapper']
			onMouseLeave: hover_reveal && @onMouseLeave
			onMouseEnter: hover_reveal && @onMouseEnter	
			props.content

			bar




module.exports = MenuTab