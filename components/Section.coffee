{h} = require 'preact'
css = require './Style.less'
cn = require 'classnames'
class Section
	render: (props)->
		section_props = Object.assign props,
			className: cn(css['section'],props.className)
		title = section_props.title
		delete section_props.title
		h 'div',section_props,
			h 'h2',
				className: css['section-title']
				style:
					opacity: 0.7
					color: @context.__theme.primary.color[2]
				title
				h 'div',
					className: css['section-title-bar']
					style:
						background: @context.__theme.primary.inv[1]
						
			h 'div',
				className: cn(css['section-content'],props.contentClassName)
				props.children
module.exports = Section