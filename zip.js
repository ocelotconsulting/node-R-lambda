const archiver = require('archiver')
const fs = require('fs')

const output = fs.createWriteStream('dist.zip')
output.on('close', () => {
  console.log('dist.zip created')
})
const zipfile = archiver('zip')
zipfile.on('error', (err) => {
  throw err
})
zipfile.pipe(output)
zipfile.bulk([
  { expand: true, cwd: './/', src: ['app.js', 'hello_world.r'] },
  { expand: true, cwd: './', src: ['config/**'] },
  { expand: true, cwd: './', src: ['lib/**'] },
  { expand: true, cwd: './', src: ['src/**'] },
  { expand: true, cwd: './build', src: ['**'] }
])
zipfile.finalize()
