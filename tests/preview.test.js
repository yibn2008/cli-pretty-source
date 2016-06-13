'use strict'

const assert = require('assert')
const strip = require('strip-ansi')
const preview = require('..')

const source = `'use strict'

const chalk = require('chalk')

const PREVIEW_OPTS = {
  offset: 5,
  lineNumber: true,
  delimiter: '\\n'
}
const DELIMITER = '-'.repeat(40)

function rightPad (text, width) {
  return text + (width > text.length ? ' '.repeat(width - text.length) : '')
}
`

describe('preivew source code', function () {
  it('should read source code', function () {
    // read with offset
    let lines = preview.readSource(source, 3)
    assert.equal(lines[2].number, 3)
    assert(lines[2].source.indexOf('chalk') > 0)

    // read without offset
    lines = preview.readSource(source, 5, 5, 0)
    assert.equal(lines[0].number, 5)
    assert(lines[0].source.indexOf('PREVIEW_OPTS') > 0)
  })

  it('should preview source code', function () {
    // preview single line
    let parts = preview(source, 3)
    assert(parts.match(/\[3\].+?chalk/))

    // preview line range
    parts = preview(source, [1, 3], { offset: 0 })
    assert(parts.indexOf('use strict') > 0)
    assert(parts.indexOf('chalk') > 0)
    assert(parts.indexOf('PREVIEW_OPTS') < 0)

    // preview line/column
    parts = preview(source, { line: 3, column: 5 }, { offset: 0 })
    assert(parts.indexOf('chalk') > 0)
    assert(parts.match(/\n\s{10}\^/))

    // preview without line number
    parts = strip(preview(source, 3, { lineNumber: false }))
    assert(parts.indexOf('\nconst chalk') > 0)
  })
})
