{h} = require 'preact'
css = require './Style.less'
class Footer
	render: (props)->
		h 'div',
			style:
				background: @context.__theme.primary.inv[0]
				color: @context.__theme.primary.color[2]
			className: css['footer']
			props.children
module.exports = Section