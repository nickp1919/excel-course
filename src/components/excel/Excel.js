export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  render() {
    // eslint-disable-next-line no-tabs,no-mixed-spaces-and-tabs
  	// this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)
		 const node = document.createElement('h1')
		 node.textContent = 'TEST'
		 this.$el.append(node)
  }

}
