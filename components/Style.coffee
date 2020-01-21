Color = require 'color'
css = require './Style.less'
{createElement,Component,createContext} = require 'react'
global.h = createElement
global.Component = Component

{generateStyle,generatePalette} = require './Palette'

class Style extends Component
	constructor: (props)->
		super(props)
		@state = {}

		@generate(Style.prototype.ease_linear)



	generate: (default_ease)->
		# log 'GENERATE'
		if @props.style
			@primary = @props.style.primary
			@secondary = @props.style.secondary
		else
			@primary = generatePalette(@props.primary,@props.primary_inv,@props.step_count || 10,@props.primary_ease || default_ease,@props.primary_inv_ease || default_ease)
			@secondary = generatePalette(@props.secondary,@props.secondary_inv,@props.step_count || 10,@props.secondary_ease || default_ease,@props.secondary_inv_ease || default_ease)	
	


	ease_linear: (i,count)->
		1/count*i

	ease_in: (i,count)->
		n = 1/count*i*(i/count)
		
		return n
	ease_in_2: (i,count)->
		Math.pow(i,3)/Math.pow(count,3)

	ease_out: (i,count)->
		1/count*Math.sqrt(i*count)

	ease_out_2: (i,count)->
		Math.pow(1/count*Math.sqrt(Math.sqrt(i*count)*count),1.2)


	componentDidUpdate: (props,state)->
		if @props.style != props.style || @props.primary != props.primary || @props.secondary != props.secondary
			@generate(Style.prototype.ease_linear)
			@setState({})

	
		
	render: ->
		h StyleContext.Provider,
			value: 
				primary: @primary
				secondary: @secondary
			@props.children



step_mix = (a,b,count,step_fn)->
	# log Style.prototype.ease_linear
	steps = []
	c = Color(a)
	c2 = Color(b)
	for i in [0...count]
		steps.push Color(c).mix(c2,step_fn(i,count)).rgb().string()
	return steps






StyleContext = createContext({})



module.exports = {Style,StyleContext,generateStyle}