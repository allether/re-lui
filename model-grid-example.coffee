{render,h,Component} = require 'preact'

ModelGrid = require './components/ModelGrid.coffee'
ModelForm = require './components/ModelForm.coffee'

Input = require './components/Input.coffee'

onStaticFn = (opts)->
	console.log opts
onMethodFn = (opts)->
	console.log opts
onFormSubmit = (opts)->
	console.log opts

user_data = [
	{
		project: 'My Project'
		_id: 1
		_name: 'Jake'
		_age: 10
	},{
		project: 'My Project'
		_id: 2
		_name: 'Paul'
		_age: 11
	},{
		project: 'My Project'
		_id: 3
		_name: 'Sam Hyde'
		_age: 13
	},{
		project: 'Your Project'
		_id: 4
		_name: 'Ron'
	}
]


for i in [0...1000]
	user_data.push
		project: Math.random().toString(Math.floor(2+Math.random()*5)).substring(2)
		_id: Math.random().toString(36).substring(7)
		_name: Math.random().toString(36).substring(7) + ' ' + Math.random().toString(36).substring(7).toLocaleUpperCase()
		_age: Math.floor(Math.random()*100)

room_data = [
	{
		project: 'My Project'
		_id: 1
		_type: 'private'
	},{
		project: 'My Project'
		_id: 2
		_type: 'public'
	}
]

event_data = [
	{
		project: 'My Project'
		_id: 1
		_name: 'birthday party'
		created_at: Date.now()
	},{
		project: 'My Project'
		_id: 2
		_name: 'meeting'
		created_at: Date.now() - 1000
	}
]


user_model = 
	name: 'user'
	label: 'Users'
	parent_category: 'My Project'
	global_filter: (obj)->
		obj.project == 'My Project'
	
	filters: [
		{
			label: 'noteworthy'
			fn: (obj)->
				if obj._name == 'Same Hyde'
					return true
				return false
		}
	]

	layouts: [
		{
			label: 'short'
			keys: ['project','_name','_age']
		},
		{
			label: 'full'
			keys: ['project','_id','_name','_age']
		}
	]

	keys:
		_id:
			label: 'ID'
			col_width: 300
			placeholder: '-'
			onEdit: (val)->
				alert('_id edit '+val)
		_name:
			label: 'Name'
			col_width: 100
			placeholder: '-'
			onEdit: (val)->
				alert('_name edit '+val)
		_age:
			label: 'Age'
			col_width: 40
			center: yes
			placeholder: '-'
			onEdit: (val)->
				alert('_age edit '+val)
		project:
			label: 'Project'
			col_width: 250
			placeholder: '-'
			onEdit: (val)->
				alert('_age edit '+val)
	
	statics: [
		{
			method_label: 'update all users'
			method_name: 'update-all-users'
			fn: onStaticFn
		},
		{
			method_label: 'alert all users'
			method_name: 'update-all-users'
			fn: onStaticFn
		},
		{
			method_name: 'add-user'
			method_label: 'add new user'
			render: ()->
				h ModelGridForm,
					values: [
						{
							key:'name'
							required:true
							validate: (val)->
								if val == 'bad'
									return false
								return true
						},{
							key:'age'
							label:'User Age'
							required:false
						},{
							key:'sex'
							label: 'User Sex'
							required:false
							placeholder: 'male'
						}
					]
					submit:
						label: 'submit'
						fn: onFormSubmit
		}
	]

	methods: [
		{
			method_label: 'Delete User'
			method_name: 'delete'
			fn: onMethodFn
		},
		{
			method_label: 'View User'
			method_name: 'view'
			fn: onMethodFn
		},
		{
			method_label: 'Rank User'
			method_name: 'set-rank'
			render: ->
				h ModelGridForm,
					values: [
						{
							key: 'rank'
							required: yes
							type: 'text'
							validate: (val)->
								if val != 'admin'
									return false
								return true
						}
						{
							render: (opts)->
								h 'div',
									classNam: 'seperator'
									'-------'
						}
						{
							key: 'rank'
							type: 'toggle'
							required: yes
						}
					]
					submit:
						label: 'submit'
						fn: onFormSubmit
		}
	]


event_model =
	layouts: [
		{
			label: 'full'
			keys: ['_id','_name','created_at']
		}
	]
	keys: [
		_id:
			label: 'ID'
			col_width: 300
			placeholder: '-'
			onEdit: (val)->
				alert('_id edit '+val)
		_name:
			label: 'Name'
			col_width: 100
			placeholder: '-'
			onEdit: (val)->
				alert('_name edit '+val)
		created_at:
			label: 'Created At'
			col_width: 60
			placeholder: '-'
			onEdit: (val)->
				alert('created_at edit '+val)
	]


room_model =
	layouts: [
		{
			label: 'full'
			keys: ['_id','_type']
		}
	]
	keys: [
		_id:
			label: 'ID'
			col_width: 300
			placeholder: '-'
			onEdit: (val)->
				alert('_id edit '+val)
		_type:
			label: 'Type'
			col_width: 100
			placeholder: '-'
			onEdit: (val)->
				alert('_type edit '+val)
	]	





class ModelGridExample extends Component
	render: (props,state)->
		h ModelGrid,
			opts: user_model
			data: user_data

module.exports = ModelGridExample