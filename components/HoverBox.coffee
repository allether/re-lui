css = require './HoverBox.less'

cn = require 'classnames'
Color = require 'color'

{StyleContext} = require './Style.coffee'
Math.clamp = (num,min,max)->
	return Math.min(Math.max(num, min), max)

class HoverBox extends Component
	constructor: ->
		super()
		@state = 
			offset_left: 0
			offset_top: 0



	onComponentDidMount: ->
		# @_overlay




	getBoxPosition: ->
		overlay_rect = @_overlay.getBoundingClientRect()

		el = @props.getBindElement()

		dim = @props.getSize()

		get_rect = el.getBoundingClientRect()
	

		btn = 
			top : get_rect.top
			bottom : get_rect.bottom
			left : get_rect.left
			right : get_rect.right
			width: get_rect.width
			height: get_rect.height

		# log btn
			

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


		# max_y = @props.max_y || window.innerHeight
		# max_x = @props.max_x || window.innerWidth
		pad = 8
		pad_top = DIM+3.75*2


		height = Math.min(overlay_rect.bottom-overlay_rect.top-pad-pad_top,dim.height)
		width = Math.min(overlay_rect.right-overlay_rect.left-pad*2,dim.width)

		# log overlay_rect.right-overlay_rect.left


		
		bar_x = 0
		bar_y = 0
		bar_w = 6
		bar_h = 6

		min_x = overlay_rect.left + pad_top
		max_x = overlay_rect.right - pad - width
		min_y = overlay_rect.top + pad
		max_y = overlay_rect.bottom - pad - height



	
		
		if snap_y > 0
			pos_y = btn.bottom + pad
		else if snap_y < 0
			pos_y = btn.top - height - pad
		else if align_y > 0
			pos_y = btn.top
		else
			pos_y = btn.bottom - height

		
		if snap_x > 0
			pos_x = btn.right + pad
		else if snap_x < 0
			pos_x = btn.left - width - pad
		else if align_x > 0
			pos_x = btn.left
		else
			pos_x = btn.right - width

		if pos_x >= btn.right
			bar_x = btn.right + pad
			bar_y = btn.top + (btn.height/2)
			bar_h = 12
			bar_w = 6
		else if pos_x+width <= btn.left
			bar_x = btn.left - pad
			bar_y = btn.top + (btn.height/2)
			bar_h = 12
			bar_w = 6
		

		else if pos_y >= btn.bottom
			bar_x = btn.left + (btn.width/2)
			bar_y = btn.bottom + pad
			bar_h = 6
			bar_w = 12
		else
			bar_x = btn.left + (btn.width/2)
			bar_y = btn.top - pad
			bar_h = 6
			bar_w = 12

		
		
		
		pos_y = Math.clamp(pos_y,min_y,max_y)-overlay_rect.top
		pos_x = Math.clamp(pos_x,min_x,max_x)-overlay_rect.left


		# pos_y = Math.max(pos_y,pad)
		# pos_y = Math.min(pos_y,window.innerHeight - pad - height)
		# pos_x = Math.max(pos_x,pad)
		# pos_x = Math.min(pos_x,window.innerWidth - pad - width)


		return
			x: pos_x
			y: pos_y
			bar_x: bar_x-overlay_rect.left
			bar_y: bar_y-overlay_rect.top
			bar_w: bar_w
			bar_h: bar_h
			width: width
			height: height



	overlayRef: (el)=>
		@_overlay = el

	UNSAFE_componentWillUpdate: ->
		overlay_rect = @_overlay.getBoundingClientRect()

		@state.offset_left = overlay_rect.left
		@state.offset_top = overlay_rect.top

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
			@_box?.onClose?(e)
			@props.onClickOverlay(e)
	

	setBackdropColor: (bg,alpha)=>
		if bg == 'none'
			return 'none'
		return Color(bg).alpha(alpha).string()

	refBox: (el)=>
		@_box = el


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
				@props.renderContent?(@state.offset_left,@state.offset_top,@refBox)

		else if @state.visible
			box = h 'div',
				className: cn css['hover-box'],css['modal-shadow'],css['hover-box-scroll']
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
				@props.renderContent?(@state.offset_left,@state.offset_top,@refBox)


		if @props.visible || @state.visible
			box_bar = h 'div',
				className: css['hover-box-bar']
				style:
					top: pos.bar_y
					left: pos.bar_x
					width: pos.bar_w
					height: pos.bar_h
					background: @context.secondary.inv[0]

		if pos & @props.show_close_btn
			close_btn = h Input,
				type: 'button'
				i: 'close'
				big: yes
				onClick: @props.onClickOverlay && @onClickOverlay
				style:
					color: 'white'
					position: 'fixed'
					background: 'none'
					left: pos.x+pos.width-DIM-3.75
					top: pos.y-DIM-3.75-3.75
				i_style:
					color: 'white'

		h 'div',
			ref: @overlayRef
			onMouseDown: (e)=>
				@setState
					down_target: e.target
			onMouseUp: (e)=>
				if e.target != @state.down_target
					return
				@props.onClickOverlay && @onClickOverlay(e)
				
			className: cn css['hover-box-overlay'],@state.visible && @props.onClickOverlay && css['visible']
			style:
				background: overlay_background
			box
			close_btn


HoverBox.contextType = StyleContext
module.exports = HoverBox