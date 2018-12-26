Color = require 'color'
require 'normalize.css'
css = require './Style.less'
{createElement,Component,createContext} = require 'react'
global.h = createElement
global.Component = Component

# class Pallet extends Component
# 	constructor: ->
StyleContext = createContext({})

addFontsToHead = ->
	a = document.createElement('link')
	a.setAttribute('href','https://fonts.googleapis.com/icon?family=Material+Icons')
	a.setAttribute('rel','stylesheet')
	document.head.append(a)

	b = document.createElement('link')
	b.setAttribute('href','https://fonts.googleapis.com/css?family=Open+Sans:400,700')
	b.setAttribute('rel','stylesheet')
	document.head.append(b)

addFontsToHead()


class Style extends Component
	constructor: ->
		super()
		@white = Color('#F4F4F4')
		@black = Color('#141414')
		@false = Color('#FC0020')
		@warn = Color('#E7BC08')
		@true = Color('#21FF48')
		@state = 
			rendered_style: yes

	componentWillMount: ->
		@renderStyle(@props)



	createPallet: (color,inv,factors)->
		color_factor = color_factor || 1
		inv_factor = inv_factor || 1

		c = {}
		c.color = [
			color.hex()
			color.mix(inv,factors.color[0]).hex()
			color.mix(inv,factors.color[1]).hex()
			color.mix(inv,factors.color[2]).hex()
			color.mix(inv,factors.color[3]).hex()
		]

		c.inv = [
			inv.hex()
			inv.mix(color,factors.inv[0]).hex()
			inv.mix(color,factors.inv[1]).hex()
			inv.mix(color,factors.inv[2]).hex()
			inv.mix(color,factors.inv[3]).hex()
		]

		return c


	lightenPallet: (color,factors)=>
		c = @createPallet(color,color.lighten(@props.lighten_factor),factors)
		c.highlight = color.lighten(1).saturate(.85).hex()
		c.true = color.lighten(1).mix(@true,0.7).hex();
		c.false = color.lighten(1).mix(@false,0.7).hex();
		c.warn = color.lighten(1).mix(@warn,0.7).hex();
		return c


	darkenPallet: (color,factors)->
		c = @createPallet(color,color.darken(@props.darken_factor),factors)
		c.highlight = color.darken(0.5).saturate(.85).hex()
		c.true = color.darken(0.5).mix(@true,0.7).hex();
		c.false = color.darken(0.5).mix(@false,0.7).hex();
		c.warn = color.darken(0.5).mix(@warn,0.7).hex();
		return c


	renderStyle: (props)=>
		primary_c = Color(props.primary)
		secondary_c = Color(props.secondary)

		if primary_c.isLight()
			@primary = @darkenPallet(primary_c,props.primary_factors)
		else
			@primary = @lightenPallet(primary_c,props.primary_factors)

		if secondary_c.isLight()
			@secondary = @darkenPallet(secondary_c,props.secondary_factors)
		else
			@secondary = @lightenPallet(secondary_c,props.secondary_factors)
		
		@_theme = 
			primary: @primary
			secondary: @secondary


	componentWillUpdate: (props,state)->
		if @props.primary != props.primary || @props.secondary != props.secondary || @props.tertiary != props.tertiary
			@renderStyle(props,state)
			state.rendered_style = true

	componentDidUpdate: ->
		if @state.rendered_style
			@state.rendered_style = false
			# @props.onSetStyle?(@primary,@secondary)



	render: ->
		h StyleContext.Provider,
			value: @_theme
			@props.children


Style.defaultProps = 
	primary: '#18262a'
	secondary: 'whitesmoke'
	darken_factor: .75
	lighten_factor: 9.0
	primary_factors: 
		color: [.1,.3,.6,.9]
		inv: [.05,.1,.15,.25]
	secondary_factors: 
		color: [.1,.3,.6,.9]
		inv: [.05,.1,.15,.25]



module.exports = {Style,StyleContext}