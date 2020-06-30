const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
	<div class="cell" contenteditable ></div>
	`
}

function toColum(col) {
  return `
		<div class="column">
      ${col}
  	</div>
	`
}

function createRow(content, numberRow) {
  return `
		<div class="row">
			<div class="row-info">${numberRow}</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColum)
      .join('')

  rows.push(createRow(cols, ''))
  for (let i = 0; i < rowsCount; i++) {
  	const cells = new Array(colsCount)
			  .fill('')
			  .map(toCell)
			  .join('')

    rows.push(createRow(cells, i+1))
  }

  return rows.join('')
}
