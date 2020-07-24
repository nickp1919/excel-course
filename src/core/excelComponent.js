import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {

  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.store = options.store
    this.storeSub = null

    this.prepare()
  }

  // Настраиваем наш компонент до init
  prepare() {
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach( unsub => unsub())
    this.storeSub.unsubscribe()
  }

}
