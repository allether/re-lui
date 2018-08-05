{h} = require 'preact'
css = require './Style.less'
cn = require 'classnames'
class Section
	render: (props)->
		section_props = Object.assign props,
			style:
				background: @context.__theme.primary.inv[0]
				color: @context.__theme.primary.color[1]
			className: cn(css['section'],props.className)
		h 'div',section_props,
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