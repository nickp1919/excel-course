import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = '120px'
const DEFAULT_HEIGHT = '24px'

function getWidth(state, index) {
  return state[index] || DEFAULT_WIDTH
}

function getHeight(state = {}, index) {
  return state[index] || DEFAULT_HEIGHT
}

function toCell(state, row) {

  return function(_, col) {
  	const width = getWidth(state.colState, col)
	  const id = `${row}:${col}`
	  const data = state.dataState[id]
	  const styles = toInlineStyles({
		  ...defaultStyles,
		  ...state.stylesState[id]
	  })
  	return `
			<div 
			class="cell" 
			contenteditable 
			data-col="${col}"
			data-type="cell"
			data-id="${id}"
			data-value="${data || ''}"
			style="width:${width}; ${styles}"
			>
			${parse(data) || ''}
</div>
		`
  }

}

function toColumn({col, index, width}) {
  return `
		<div 
		class="column" 
		data-type="resizable" 
		data-col="${index}" 
		style="width:${width}"
		>
      ${col}
      <div class="col-resize" data-resize="col"></div>
  	</div>
	`
	

}

function createRow(content, numberRow, state) {
  const height = getHeight(state.rowState, numberRow)
  const resize = numberRow
	  ? '<div class="row-resize" data-resize="row"></div>'
	  : ''
  return `
		<div 
		class="row" 
		data-type="resizable" 
		data-row="${numberRow}" 
		style="height:${height}"
		>
			<div class="row-info">
					${numberRow}
					${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function widthWidthFrom(state) {
  return function(col, index) {
	  return {
		  col,
		  index,
		  width: getWidth(state.colState, index)
	  }
  }

}

export function createTable(rowsCount = 20, initTableState) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(widthWidthFrom(initTableState))
      .map(toColumn)
      .join('')

  rows.push(createRow(cols, '', initTableState))
  for (let row = 0; row < rowsCount; row++) {
  	const cells = new Array(colsCount)
			  .fill('')
			  .map(toCell(initTableState, row))
			  .join('')

    rows.push(createRow(cells, row+1, initTableState))
  }

  return rows.join('')
}
