Color = require 'color'
{render,h,Component} = require 'preact'
Slide = require 'preact-slide'
Style = require './Style.coffee'
Input = require './Input.coffee'
AlertDot = require './AlertDot.coffee'
require 'normalize.css'
css = require './ModelGrid.less'
Bar = require './Bar.coffee'
MenuTab = require './MenuTab.coffee'
Menu = require './Menu.coffee'
{MultiGrid} = require 'react-virtualized/dist/commonjs/MultiGrid'
# {CellMeasurer,CellMeasurerCache} = require 'react-virtualized/dist/commonjs/CellMeasurer'
CHAR_W = 7.8
CELL_PAD = 10
class ModelGridMenu extends Component
	constructor: (props)->
		super(props)
		@state =
			menu_backdrop: false
			selected_layout_index: 0
			selected_filter_index: 0
	
	
	mapMenuStaticsButtons: (static_method,i)=>
		h MenuTab,
			key: i
			# className: css['model-grid-menu-tab-option']
			content: h Input,
				onClick: static_method.fn?.bind(undefined,static_method)
				type: 'button'
				# btn_type: 'flat'
				label: static_method.method_label
	

	mapMenuFilterButtons: (filter,i)=>
		h MenuTab,
			key: i
			content: h Input,
				# onClick: @togglePinMenu.bind(@,'layout')
				onClick: @props.onSelectFilter.bind(null,filter)
				type: 'button'
				label: filter.label

	mapMenuLayoutButtons: (layout,i)=>
		h MenuTab,
			key: i
			# onClick: @togglePinMenu.bind(@,'layout')
			content: h Input,
				invalid:yes
				onClick: @props.onSelectLayout.bind(null,layout)
				focus: if layout == @props.opts.layouts[@props.cfg.layout_index] then false else undefined
				btn_type: layout == @props.opts.layouts[@props.cfg.layout_index] && 'primary'
				type: 'button'
				label: [
					layout.label.padEnd(10)
					h 'span',{className: css['model-grid-opaque']},String(layout.keys)
				]

	mapMenuSearchButtons: (key_name,i)=>
		key = @props.opts.keys[key_name]
		h MenuTab,
			key: i
			content: h Input,
				invalid:yes
				onClick: @props.onSelectSearchKey.bind(null,key_name)

				focus: if key_name == @props.cfg.search_key then false else undefined
				# focus: if layout == @props.opts.layouts[@props.selected_layout_index] then false else undefined
				btn_type: key_name == @props.cfg.search_key && 'primary'
				type: 'button'
				label: key.label

	
	togglePinMenu: (pin_menu_name,toggle)=>
		@setState
			pin_menu_name: pin_menu_name
			menu_backdrop: toggle

	# onAddDocumentButton: ()=>
	# 	@setState
	# 		show_create_document_modal: yes
	onNewDocFormInput: (key_name,e)=>
		@props.cfg.new_doc[key_name] = e.target.value
		@setState()
	renderNewDocForm: (props)->
		lc = props.opts.keys_array.reduce (pre,key_name)->
			if key_name.length > pre
				return key_name.length
			return pre
		,0

		# log props.cfg.new_doc

		h 'form',
			className: css['model-grid-add-doc-form']
			style:
				background: @context.__theme.primary.inv[0]
			# style:
			# 	maxHeight: @_grid_slide._outer.clientHeight ||'300px'
			h Bar,
				vert: true
				big: false
				props.opts.keys_array.map (key_name,i)=>
					if !props.opts.keys[key_name].form_render
						return null
					# log key_name
					key = props.opts.keys[key_name]
					key_val = props.cfg.new_doc[key_name] || key.form_autofill
					h Input,
						key: i
						label: key.label.padStart(lc+4," ")
						bar: yes
						disabled: key.form_autofill && yes
						required: key.form_required && yes
						is_valid: key.form_validate?(key_val) || undefined
						value: key_val
						onInput: @onNewDocFormInput.bind(null,key_name)
						placeholder: key.form_placeholder || key_name
				h Input,
					big: yes
					type: 'submit'
					btn_type: 'primary'
					# label: 'create'


		# props.cfg.new_doc
	
	
	getPinMenuBoolean: (pin_menu_name)->
		if @state.pin_menu_name == pin_menu_name then true else undefined

	render: (props,state)->
		opts = props.opts
		data = props.data
		cfg = props.cfg
		if opts.parent_category
			list_label = [
				h 'span',{},opts.parent_category
				h 'span',{className: css['model-grid-slash']},'/'
				h 'span',{style:{fontWeight:600,color:@context.__theme.primary.color[0]}},opts.label
			]
		else
			list_label = opts.label

		selected_layout = opts.layouts[@props.cfg.layout_index]
		selected_filter = opts.filters[@props.cfg.filter_index]
		h Slide,
			dim: 40
			vert : no
			className: css['menu-slide']
			h Menu,
				vert: no
				max_x: window.innerWidth-17
				max_y: window.innerHeight
				hover_reveal: yes
				render_hidden: no
				show_backdrop: @state.menu_backdrop
				onClickBackdrop: @togglePinMenu.bind(@,null,false)
				big: true
				h MenuTab,
					vert: yes
					content: h Input,
						type: 'button'
						btn_type: 'flat'
						i: 'menu'
					opts.statics.map @mapMenuStaticsButtons
				h MenuTab,
					reveal: @getPinMenuBoolean('add-doc')
					onClick: @togglePinMenu.bind(@,'add-doc',true)
					content: h Input,
						type: 'button'
						btn_type: 'flat'
						i: 'add'
					@getPinMenuBoolean('add-doc') && @renderNewDocForm(props)
				h MenuTab,
					reveal: @getPinMenuBoolean('statics')
					content: h Input,
						type: 'label'
						name: 'statics'
						btn_type: 'flat'
						label: list_label
				h MenuTab,
					big: false
					hover_reveal: no
					# onClick: @togglePinMenu.bind(@,'search-keys')
					reveal: @getPinMenuBoolean('search-keys')
					content: h Input,
						onFocus: @togglePinMenu.bind(@,'search-keys',true)
						type: 'input'
						btn_type: 'flat'
						i: 'search'
						bar: yes
						placeholder: 'search by [ '+cfg.search_key+' ]'
					opts.keys_array.map @mapMenuSearchButtons
				

			h Menu,
				vert: no
				max_x: window.innerWidth-17
				max_y: window.innerHeight
				className: css['model-grid-list-menu-right']
				big: true
				enable_backdrop: yes
				show_backdrop: @state.menu_backdrop
				force_split_left: yes
				onClickBackdrop: @togglePinMenu.bind(@,null,false)
				hover_reveal: yes
				render_hidden: no
				h MenuTab,
					vert: yes
					onClick: @togglePinMenu.bind(@,'layouts',true)
					reveal: @getPinMenuBoolean('layouts')
					content: h Input,
						# className: css['model-grid-list-layout-button']
						type: 'button'
						btn_type: 'flat'
						i: 'view_week'
						label: [
							h 'span',{className: css['model-grid-slash']},'/'
							selected_layout.label
						]
					opts.layouts.map @mapMenuLayoutButtons
				h MenuTab,
					vert: yes
					onClick: @togglePinMenu.bind(@,'filters',true)
					reveal: @getPinMenuBoolean('filters')
					content: h Input,
						type: 'button'
						btn_type: 'flat'
						i: 'filter_list'
						label: [
							h 'span',{className: css['model-grid-slash']},'/'
							selected_filter.label
						]
					opts.filters.map @mapMenuFilterButtons
				# h MenuTab,
				# 	vert: yes
				# 	onClick: @togglePinMenu.bind(@,'layouts',true)
				# 	reveal: @getPinMenuBoolean('layouts')
				# 	content: h Input,
				# 		# className: css['model-grid-list-layout-button']
				# 		type: 'button'
				# 		btn_type: 'flat'
				# 		i: 'format_list_numbered'
				# 		# label: selected_layout.label
				# 	# opts.layouts.map @mapMenuSortButtons



			# h Input,
			# 	type: 'input'
			# 	name: 'methods'
			# 	btn_type: 'flat'
			# 	i: 'settings'
			# 	label: h 'div',{}
			# 		h 'span',{},'layout'
			# 		h 'span',{},'/'
			# 		h 'span',{},''
			



class ModelGridList extends Component

	componentWillMount: ->
		# @buildCellCache()
	
	buildCellCache : =>
		@_cell_cache = new CellMeasurerCache
			minWidth: 55
			fixedHeight: true
			defaultWidth: 255
			# defaultWidth: 100,
  			
			# defaultHeight: 30
			# fixedWidth: no
	
	gridRef: (el)=>
		# log el
		@_grid = el
		window.grid = el
		# log @_grid
	
	slideRef: (el)=>
		@_grid_slide = el



	
	# onGridScroll: (opt)->
		# if opt.scrollTop == 0 && opt.scrollLeft == 0
		# 	face.enableAutoUpdate()
		# 	return
		# else
		# 	face.disableAutoUpdate()
		# if @state.show_search_options
		# 	@_search._input.blur()
		# 	@setState
		# 		show_search_options: false

		# if opt.scrollTop > opt.scrollHeight - 1000 && !@props.search.max_reached && !@props.is_loading[@props.search_model]
		# 	return face.searchCollection(@props.search.model,@props.search.query,@props.search.sort_value)

	# onToggleKeySort: (key_name)=>

	onSelectDocumentById: (doc_id)=>
		@props.onSelectDocumentById(doc_id)

	mapMenuMethodsButtons: (doc_method,i)=>
		h MenuTab,
			key: i
			vert: yes
			# className: css['model-grid-menu-tab-option']
			content: h Input,
				onClick: doc_method.fn?.bind(undefined,doc_method)
				type: 'button'
				btn_type: 'primary'
				label: doc_method.method_label

	columnWidth: (g_opts)=>
		if g_opts.index == 0
			return 30
		opts = @props.opts
		key_name = opts.layouts[@props.cfg.layout_index || 0]?.keys[g_opts.index-1] || opts.layouts[0].keys[g_opts.index-1]
		key = opts.keys[key_name]
		# log key_name
		# if key.col_width
		return key.col_width
		# else
		# 	return @_cell_cache.columnWidth(g_opts)

	renderDocumentMethodMenu: (g_opts)->
		opts = @props.opts
		data = @props.data
		# log 'r'
		# h Style,
		# 	primary: @context.__theme.primary.inv[0]
		# 	secondary: @context.__theme.secondary.color[0]
		h Menu,
			# key: 'model-method-menu'
			vert: no
			max_x: window.innerWidth-17
			max_y: window.innerHeight
			# className: css['model-grid-list-menu-right']
			big: no
			enable_backdrop: yes
			# show_backdrop: @state.menu_backdrop
			# force_split_left: yes
			# onClickBackdrop: @togglePinMenu.bind(@,null,false)
			hover_reveal: yes
			render_hidden: no
			# reveal: yes
			h MenuTab,
				vert: yes
				reveal: yes
				content: h Input,
					type: 'button'
					btn_type: 'primary'
					i: 'menu'
				h MenuTab,
					key:1
					# vert: yes
					content: h Input,
						type: 'button'
						btn_type: 'primary'
						i: 'delete'
				h MenuTab,
					key:2
					# vert: yes
					content: h Input,
						type: 'button'
						btn_type: 'primary'
						i: 'code'
				# h MenuTab,
				# 	key:3
				# 	vert: yes
				# 	content: h Input,
				# 		type: 'button'
				# 		btn_type: 'primary'
				# 		i: 'more_horiz'
				# 	opts.methods.map @mapMenuMethodsButtons


	# {index, isScrolling, key, parent, style}
	renderCell: (g_opts)=>
		opts = @props.opts
		cfg = @props.cfg
		data = @props.data
		is_key = g_opts.rowIndex == 0
		g_opts.style.whiteSpace = 'nowrap'
		if g_opts.rowIndex % 2 == 0
			alt_cell = true
		if alt_cell
			g_opts.style.background = @context.__theme.primary.inv[1]

		if g_opts.rowIndex != 0 && @props.cfg.selected_doc_id == data[g_opts.rowIndex-1]._id
			g_opts.style.background = @context.__theme.secondary.color[0]
			g_opts.style.color = @context.__theme.secondary.inv[0]
			render_method_menu = true
		# render document method menu
		if g_opts.columnIndex == 0
			return h 'div',
				# className: css['']
				style: g_opts.style
				key: g_opts.key
				render_method_menu && @renderDocumentMethodMenu(g_opts) || null



		key_name = opts.layouts[@props.cfg.layout_index || 0]?.keys[g_opts.columnIndex-1] || opts.layouts[0].keys[g_opts.columnIndex-1]
		key = opts.keys[key_name]
		
		
		
		
		g_opts.style.width = key.col_width
		g_opts.style.overflow = 'hidden'
		if key.center
			g_opts.style.textAlign = 'center'

		# else
		# 	g_opts.style.width = 'auto'
		# log g_opts.style.width
		
		
		# if g_opts.columnIndex % 2 != 0 && g_opts.rowIndex % 2 == 0
		# 	alt_cell = true
		# if g_opts.rowIndex % 2 != 0
		# 	alt_cell = true
		
		# if g_opts.columnIndex % 2 != 0
		# 	alt_cell = false
		# 	if g_opts.rowIndex % 2 != 0
		# 		alt_cell = true
		if !is_key
			value = data[g_opts.rowIndex-1][key_name]

	
		
		
		
	
		if !is_key && typeof value == 'string'
			v_w = value.length * CHAR_W + CELL_PAD*2
			max_l = Math.floor( (key.col_width- CELL_PAD*2) / CHAR_W)
			if v_w > key.col_width
				value = value.substring(0,max_l-2)+'..'


		# log is_key
		if is_key
			if !cfg.sort[key_name]
				arrow_color = @context.__theme.primary.color[2]
				rotate_arrow = 0
			else if cfg.sort[key_name] == 1
				rotate_arrow = 90
				arrow_color = @context.__theme.secondary.false

			else if cfg.sort[key_name] == -1
				rotate_arrow = -90
				arrow_color = @context.__theme.secondary.true
			g_opts.style.color = arrow_color
			return h 'div',
				className: (css['model-grid-cell']+' '+css['model-grid-key'])
				style: g_opts.style
				key: g_opts.key
				onClick: @props.onToggleKeySort.bind(null,key_name)
				h 'div',className:css['model-grid-label'],key.label
				h 'i',
					className: 'material-icons '+css['model-grid-key-toggle']
					style:
						transform: 'rotate('+rotate_arrow+'deg)'
					'arrow_left'

		
		
		return h 'div',
			className: css['model-grid-cell']
			onClick: @onSelectDocumentById.bind(null,data[g_opts.rowIndex-1]._id)
			style: g_opts.style
			key: g_opts.key
			value
	

	columnCount: ->
		return 5


	getGridKey: (props)->
		layout = props.opts.layouts[props.cfg.layout_index || 0] || props.opts.layouts[0]
		filter = props.opts.filters[props.cfg.filter_index]?.label || null
		sort_str = JSON.stringify(props.cfg.sort)
		(filter || 'all') + '-' + (layout.label)+'-'+props.cfg.selected_doc_id+'-'+sort_str


	componentDidUpdate: ->
		# log @_grid
		if @getGridKey(@props) != @state.grid_key
			@state.grid_key = @getGridKey(@props)
			@_grid.recomputeGridSize()


	render: (props)->
		layout = props.opts.layouts[props.cfg.layout_index]
		filter = props.opts.filters[props.cfg.filter_index]?.label || null
		# log props.selected_layout_index
		opts = props.opts
		data = props.data
		grid_key = @getGridKey(props)
		# log grid_key
		if @_grid_slide
			grid = h MultiGrid,
				className: css['model-grid-list']
				ref: @gridRef
				# key: grid_key
				onScroll: @onGridScroll
				cellRenderer: @renderCell
				columnWidth: @columnWidth
				columnCount: layout.keys.length+1
				fixedColumnCount:0
				fixedRowCount:1
				height:@_grid_slide._outer.clientHeight
				rowHeight:30
				rowCount:data.length+1
				width:@_grid_slide._outer.clientWidth
		
		h Slide,
			beta: 100
			ref: @slideRef
			grid || null



class ModelGrid extends Component
	constructor: (props)->
		super(props)
		@state =
			layout_index: 0
			filter_index: 0
			selected_doc_id: 1
			search_key: props.opts.keys_array[0]
			new_doc: {}
			sort: {}
	onSelectDocumentById: (doc_id)=>
		@setState
			selected_doc_id: doc_id
	onSelectSearchKey: (key_name)=>
		@setState
			search_key: key_name
	onSelectLayout: (layout)=>
		@setState
			layout_index: @props.opts.layouts.indexOf(layout) || 0
	
	onSelectFilter: (filter)=>
		@setState
			filter_index: @props.opts.filters.indexOf(filter) || 0

	onToggleKeySort: (key_name)=>
		if !@state.sort[key_name]
			@state.sort[key_name] = -1
		else if @state.sort[key_name] == -1
			@state.sort[key_name] = 1
		else
			@state.sort[key_name] = undefined
		@setState()


	
	# onNewDocFormInput: (key_name,e)=>
	# 	@state.new_doc[key_name] = e.target.value

	
	render: (props,state)->
		opts = props.opts
		data = props.data
		# log @state.new_doc
		props.cfg = @state
		props.onSelectLayout = @onSelectLayout
		props.onSelectFilter = @onSelectFilter
		props.onSelectDocumentById = @onSelectDocumentById
		props.onSelectSearchKey = @onSelectSearchKey
		props.onToggleKeySort = @onToggleKeySort
		# props.onNewDocFormInput = @onNewDocFormInput
		props.onAddDocumentButton = @onAddDocumentButton
		
		h Slide,
			vert: yes
			className: css['model-grid']
			h ModelGridMenu,props
			h ModelGridList,props




module.exports = ModelGrid