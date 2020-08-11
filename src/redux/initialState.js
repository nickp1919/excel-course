import {defaultStyles, defaultTitle} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
  title: defaultTitle,
  openedDate: new Date().toJSON(),
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {}
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state
    ? normalize(state)
    : clone(defaultState)
}


