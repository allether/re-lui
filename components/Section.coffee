{h} = require 'preact'
css = require './Style.less'
class Section
	render: (props)->
		h 'div',
			style:
				background: @context.__theme.primary.inv[0]
				color: @context.__theme.primary.color[2]
			className: css['section']
			h 'h2',
				className: css['section-title']
				props.title
				h 'div',
					className: css['section-title-bar']
					style:
						background: @context.__theme.primary.inv[1]
			h 'div',
				className: css['section-content']
				props.children
module.exports = Section