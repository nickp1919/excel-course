class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
	    ? document.querySelector(selector)
	    : selector
  }

  get data() {
    return this.$el.dataset
  }

  html(html) {
  	if (typeof html === 'string') {
  		this.$el.innerHTML = html
		  return this
	  }
  	return this.$el.outerHTML.trim()
  }

  text(text) {
	  if (typeof text !== 'undefined') {
		  this.$el.textContent = text
		  return this
	  }
	  if (this.$el.tagName.toLowerCase() === 'input') {
	  	return this.$el.value.trim()
	  }
  	return this.$el.textContent.trim()
  }

  clear() {
  	this.html('')
	  return this
  }

  on(eventType, callback) {
  	this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
	  this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
  	if (node instanceof Dom) {
  		node = node.$el
	  }
  	if (Element.prototype.append) {
  		this.$el.append(node)
	  } else {
  		this.$el.appendChild(node)
	  }
  	return this
  }

  find(selector) {
  	return $(this.$el.querySelector(selector))
  }

  closest(selector) {
  	return $(this.$el.closest(selector))
  }

  getCoords() {
  	return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
  	return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
  	 Object.keys(styles).forEach(k => {
  		this.$el.style[k] = styles[k]
	  })
  }

  getStyle(styles = []) {
  	return styles.reduce((res, s) => {
  		res[s] = this.$el.style[s]
		  return res
	  }, {})
  }

  id(parse) {
  	if (parse) {
  		const parsed = this.id().split(':')
		  return {
  			row: +parsed[0],
			  col: +parsed[1]
		  }
	  }
  	return this.data.id
  }

  addClass(className) {
  	this.$el.classList.add(className)
	  return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }

  focus() {
  	this.$el.focus()
	  return this
  }

  attr(name, value) {
  	if (value) {
  		this.$el.setAttribute(name, value)
		  return this
	  }
  	return this.$el.getAttribute(name)
  }

}

$('div').html('<h1>Test</h1>').clear()

export function $(selector) {
	 return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
 		el.classList.add(classes)
  }
  return $(el)
}

