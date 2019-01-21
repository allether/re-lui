Color = require 'color'
require 'normalize.css'
css = require './Style.less'
{createElement,Component,createContext} = require 'react'
global.h = createElement
global.Component = Component
global.IS_TOUCH = require('./is_touch')()
# class Pallet extends Component
# 	constructor: ->
StyleContext = createContext({})

addFontsToHead = ->
	a = document.createElement('link')
	a.setAttribute('href','https://fonts.googleapis.com/icon?family=Material+Icons')
	a.setAttribute('rel','stylesheet')
	document.head.appendChild(a)

	b = document.createElement('link')
	b.setAttribute('href','https://fonts.googleapis.com/css?family=Open+Sans:400,700')
	b.setAttribute('rel','stylesheet')
	document.head.appendChild(b)

addFontsToHead()



createPallet = (color,inv,factors)->
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


lightenPallet = (props)=>
	c = createPallet(props.color,props.color.lighten(props.lighten_factor),props.factors)
	c.highlight = props.color.lighten(1).saturate(.85).hex()
	c.true = props.color.lighten(1).mix(props.true,0.7).hex();
	c.false = props.color.lighten(1).mix(props.false,0.7).hex();
	c.warn = props.color.lighten(1).mix(props.warn,0.7).hex();
	return c


darkenPallet = (props)->
	c = createPallet(props.color,props.color.darken(props.darken_factor),props.factors)
	c.highlight = props.color.darken(0.5).saturate(.85).hex()
	c.true = props.color.darken(0.5).mix(props.true,0.7).hex();
	c.false = props.color.darken(0.5).mix(props.false,0.7).hex();
	c.warn = props.color.darken(0.5).mix(props.warn,0.7).hex();
	return c



generateStyle = (props)->
	primary_c = Color(props.primary)
	secondary_c = Color(props.secondary)

	if primary_c.isLight()
		primary = darkenPallet
			color: primary_c
			lighten_factor: props.lighten_factor
			darken_factor: props.darken_factor
			factors: props.primary_factors
			true: props.true
			false: props.false
			warn: props.warn
		
	else
		primary = lightenPallet
			color: primary_c
			lighten_factor: props.lighten_factor
			darken_factor: props.darken_factor
			factors: props.primary_factors
			true: props.true
			false: props.false
			warn: props.warn


	if secondary_c.isLight()
		secondary = darkenPallet
			color: secondary_c
			lighten_factor: props.lighten_factor
			darken_factor: props.darken_factor
			factors: props.secondary_factors
			true: props.true
			false: props.false
			warn: props.warn
	else
		secondary = lightenPallet
			color: secondary_c
			lighten_factor: props.lighten_factor
			darken_factor: props.darken_factor
			factors: props.secondary_factors
			true: props.true
			false: props.false
			warn: props.warn


	return	
		primary: primary
		secondary: secondary


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
		@renderStyle(@props,@state)



	renderStyle: (props,state)=>
		@_theme = generateStyle
			lighten_factor: props.lighten_factor
			darken_factor: props.darken_factor
			primary_factors: props.primary_factors
			secondary_factors: props.secondary_factors
			false: @false
			true: @true
			warn: @warn
			primary: props.primary
			secondary: props.secondary


		@primary = @_theme.primary
		@secondary = @_theme.secondary

		# console.log props.primary,props.secondary


	componentWillUpdate: (props,state)->
		if @props.primary != props.primary || @props.secondary != props.secondary || @props.tertiary != props.tertiary
			@renderStyle(props,state)
			state.rendered_style = true


	componentDidUpdate: ->
		if @state.rendered_style
			@state.rendered_style = false
			

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



module.exports = {Style,StyleContext,generateStyle}