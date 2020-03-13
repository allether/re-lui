css = require './HoverBox.less'

cn = require 'classnames'
Color = require 'color'

{StyleContext} = require './Style.coffee'

class HoverBox extends Component
	constructor: ->
		super()
		@state = {}



	onComponentDidMount: ->
		# @_overlay




	getBoxPosition: ->
		el = @props.getBindElement()

		dim = @props.getSize()

		get_rect = el.getBoundingClientRect()
	
		off_x = @props.offset_x || 0
		off_y = @props.offset_y || 0
		
		bounding_rect = 

			top : get_rect.top + off_y
			bottom : get_rect.bottom + off_y
			left : get_rect.left + off_x
			right : get_rect.right + off_x
			width: get_rect.width
			height: get_rect.height
			

		snap_y = @props.snap_y
		snap_x = @props.snap_x


		if snap_x && snap_y
			snap_y = 0

		if !snap_x && !snap_y
			snap_y = 1
		
		align_x = @props.align_x
		align_y = @props.align_y
		
		pos_x = 0
		pos_y = 0


		max_y = @props.max_y || window.innerHeight
		max_x = @props.max_x || window.innerWidth


		pad = 4
		bar_x = 0
		bar_y = 0
		bar_w = 6
		bar_h = 6
		
		if snap_y > 0
			pos_y = bounding_rect.bottom + pad

			if pos_y + dim.height > max_y
				pos_y =  bounding_rect.top - dim.height - pad
		
		else if snap_y < 0
			pos_y = bounding_rect.top - dim.height - pad
			if pos_y < 0
				pos_y = bounding_rect.bottom + pad
		
		else
			if align_y > 0
				pos_y = bounding_rect.top
				if pos_y + dim.height > max_y
					pos_y = bounding_rect.bottom - dim.height
				
			else
				pos_y = bounding_rect.bottom - dim.height
				if pos_y < 0
					pos_y = bounding_rect.top


		if snap_x > 0
			pos_x = bounding_rect.right + pad
			if pos_x + dim.width > max_x
				pos_x = bounding_rect.left - dim.width - pad

		else if snap_x < 0
			pos_x = bounding_rect.left - dim.width - pad
			if pos_x < 0
				pos_x = bounding_rect.right + pad

		
		else
			if align_x > 0
				pos_x = bounding_rect.left
				if pos_x + dim.width > max_x
					pos_x = bounding_rect.right - dim.width
			else
				pos_x = bounding_rect.right - dim.width
				if pos_x < 0
					pos_x = bounding_rect.left


		if pos_x >= bounding_rect.right
			bar_x = bounding_rect.right + pad
			bar_y = bounding_rect.top + (bounding_rect.height/2)
			bar_h = 12
			bar_w = 6
		else if pos_x+dim.width <= bounding_rect.left
			bar_x = bounding_rect.left - pad
			bar_y = bounding_rect.top + (bounding_rect.height/2)
			bar_h = 12
			bar_w = 6
		

		else if pos_y >= bounding_rect.bottom
			bar_x = bounding_rect.left + (bounding_rect.width/2)
			bar_y = bounding_rect.bottom + pad
			bar_h = 6
			bar_w = 12
		else
			bar_x = bounding_rect.left + (bounding_rect.width/2)
			bar_y = bounding_rect.top - pad
			bar_h = 6
			bar_w = 12

		pad = 7.5

		height = Math.min(window.innerHeight-pad*2,dim.height)
		width = Math.min(window.innerWidth-pad*2,dim.width)


		pos_y = Math.max(pos_y,pad)
		pos_y = Math.min(pos_y,window.innerHeight - pad - height)
		pos_x = Math.max(pos_x,pad)
		pos_x = Math.min(pos_x,window.innerWidth - pad - width)


		return
			x: pos_x
			y: pos_y
			bar_x: bar_x
			bar_y: bar_y
			bar_w: bar_w
			bar_h: bar_h
			width: width
			height: height



	overlayRef: (el)=>
		@_overlay = el


	componentDidUpdate: (prev_props,prev_state)->

		# log @props.show_delay
		# if
		# log @props.visible,@state.render_box
		if @props.visible && @_hide_box_timer
			@resetHideTimer()

		if @props.visible != prev_props.visible || @props.visible != @state.visible
			if @props.visible
				# log 'RENDER'
				@resetHideTimer()
				
				if @props.visible_delay
					@_render_box_timer = setTimeout ()=>
						@_render_box_timer = null
						@setState
							visible: yes
					,if @props.show_delay? then @props.show_delay else 600
				else
					@setState
						visible: yes
			
			else
				@resetHideTimer()
				@_hide_box_timer = setTimeout ()=>
					@_hide_box_timer = null
					@setState
						visible: no
				,if @props.hide_delay? then @props.hide_delay else 200
	
			

	resetHideTimer: =>
		clearTimeout(@_hide_box_timer)
		clearTimeout(@_render_box_timer)
		@_render_box_timer = null
		@_hide_box_timer = null


	onMouseEnter: =>
		@setState
			hover: yes
		
		@resetHideTimer()
	
	onMouseLeave: =>
		@setState
			hover: no

		@resetHideTimer()
		@forceUpdate()
		

	onClickOverlay: (e)=>
		if e.target == @_overlay
			@props.onClickOverlay(e)
	

	setBackdropColor: (bg,alpha)=>
		if bg == 'none'
			return 'none'
		return Color(bg).alpha(alpha).string()


	render: ->
		if @state.visible || @props.visible
			pos = @getBoxPosition()


		if @props.onClickOverlay && @state.visible
			overlay_background = @setBackdropColor(@props.background,0.7)
		else
			overlay_background = @setBackdropColor(@props.background,0.0)

		if @props.flat && @state.visible
			box = h 'div',
				className: css['hover-box-flat']
				onMouseEnter: @props.box_pointer_events && @onMouseEnter || null
				onMouseLeave: @props.box_pointer_events && @onMouseLeave || null
				style:
					pointerEvents: @props.box_pointer_events && 'all' || 'none'
					top: pos.y
					left: pos.x
					width: pos.width
					height: pos.height
					color: @context.primary.color[0]
				@props.renderContent?()

		else if @state.visible
			box = h 'div',
				className: cn css['hover-box'],css['modal-shadow'],@props.scroll && css['hover-box-scroll']
				onMouseEnter: @props.box_pointer_events && @onMouseEnter || null
				onMouseLeave: @props.box_pointer_events && @onMouseLeave || null
				style:
					pointerEvents: @props.box_pointer_events && 'all' || 'none'
					top: pos.y
					left: pos.x
					width: pos.width
					height: pos.height
					color: @context.primary.color[0]
					background: @context.primary.inv[0]
				@props.renderContent?()


		if @props.visible || @state.visible
			box_bar = h 'div',
				className: css['hover-box-bar']
				style:
					top: pos.bar_y
					left: pos.bar_x
					width: pos.bar_w
					height: pos.bar_h
					background: @context.secondary.inv[0]



		h 'div',
			ref: @overlayRef
			onClick: @props.onClickOverlay && @onClickOverlay
			className: cn css['hover-box-overlay'],@state.visible && @props.onClickOverlay && css['visible']
			style:
				background: overlay_background
			box
			box_bar



HoverBox.contextType = StyleContext

module.exports = HoverBox