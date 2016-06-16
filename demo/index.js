'use strict'

const preview = require('..')

const SOURCE = `
function Foo () {
  this.p1 = 'aaa'
  this.p2 = 'bbb'
  this.p3 = 'ccc'

  throw new Error('test')
}

new Foo()
`

try {
  eval(SOURCE)
} catch (err) {
  let matches = err.stack.match(/<anonymous>:(\d+):(\d+)/)

  console.log(preview(SOURCE, {
    line: matches[1],
    column: matches[2]
  }))
  console.error(err.stack)
}
