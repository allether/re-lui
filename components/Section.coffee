css = require './Style.less'
cn = require 'classnames'
class Section extends Component
	render: ->
		h 'div',
			className: cn(css['section'],@props.className)
			style: @props.style
			h 'h2',
				className: css['section-title']
				style:
					opacity: 0.7
					color: @context.primary.color[2]
				@props.title
				h 'div',
					className: css['section-title-bar']
					style:
						background: @context.primary.inv[1]
						
			h 'div',
				className: cn(css['section-content'],@props.contentClassName)
				@props.children
Section.contextType = StyleContext
module.exports = Section