'use strict'
const stream = require('stream')

class MemoryWritable extends stream.Writable {
  constructor () {
    super()
    this.buffer = []
  }

  _write (chunk, enc, next) {
    this.buffer.push(chunk)
    console.log(chunk.toString())
    next()
  }

  toString () {
    return this.buffer.join('')
  }
}

module.exports = MemoryWritable
