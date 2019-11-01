
Color = require 'color'

ease_linear = (i,count)->
	1/count*i

ease_in = (i,count)->
	n = 1/count*i*(i/count)
	
	return n
ease_in_2 = (i,count)->
	Math.pow(i,3)/Math.pow(count,3)

ease_out = (i,count)->
	1/count*Math.sqrt(i*count)

ease_out_2 = (i,count)->
	Math.pow(1/count*Math.sqrt(Math.sqrt(i*count)*count),1.2)




step_mix = (a,b,count,step_fn)->
	# log Style.prototype.ease_linear
	steps = []
	c = Color(a)
	c2 = Color(b)
	for i in [0...count]
		steps.push Color(c).mix(c2,step_fn(i,count)).hex()
	return steps


generateStyle = (props)->
	default_ease = ease_linear
	style = {}
	style.primary = generatePalette(props.primary,props.primary_inv,props.step_count || 10,props.primary_ease || default_ease,props.primary_inv_ease || default_ease)
	style.secondary = generatePalette(props.secondary,props.secondary_inv,props.step_count || 10,props.secondary_ease || default_ease,props.secondary_inv_ease || default_ease)
	return style


generatePalette = (color,inverse_color,step_count,step_fn,inverse_step_fn)->
	# log step_fn,inverse_step_fn
	c = []
	color = Color(color)
	inverse_color = Color(inverse_color)


	c[0] = step_mix(color,inverse_color,step_count,step_fn)
	c[1] = step_mix(inverse_color,color,step_count,inverse_step_fn)
	c.color = c[0]
	c.inv = c[1]

	default_ease = ease_in_2

	c.inv.darker = step_mix(inverse_color,'#000',5,default_ease)
	c.inv.lighter = step_mix(inverse_color,'#fff',5,default_ease)
	
	c.color.darker = step_mix(color,'#000',5,default_ease)
	c.color.lighter = step_mix(color,'#fff',5,default_ease)

	c.false = Color('red').mix(color,0.25).hex()
	c.false_hover = Color('red').mix(color,0.15).hex()
	
	if Color(c.false).isDark()
		c.false_inv = Color(c.false).mix(Color('white'),0.9).hex()
		c.false_inv_hover = Color(c.false).mix(Color('white'),0.95).hex()
	else
		c.false_inv = Color(c.false).mix(Color('black'),0.9).hex()
		c.false_inv_hover = Color(c.false).mix(Color('black'),0.95).hex()

	
	



	c.true = Color('lime').mix(color,0.25).hex()
	c.true_hover = Color('lime').mix(color,0.15).hex()

	if Color(c.true).isDark()
		c.true_inv = Color(c.true).mix(Color('white'),0.9).hex()
		c.true_inv_hover = Color(c.true).mix(Color('white'),0.95).hex()
	else
		c.true_inv = Color(c.true).mix(Color('black'),0.9).hex()
		c.true_inv_hover = Color(c.true).mix(Color('black'),0.95).hex()

	c.warn = Color('yellow').mix(color,0.25).hex()
	return c

easings = 
	ease_linear: ease_linear
	ease_in: ease_in
	ease_in_2: ease_in_2
	ease_out: ease_out
	ease_out_2: ease_out_2



module.exports = {generateStyle,generatePalette,easings}
