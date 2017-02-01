const config = require('./config/default.json')
const spawn = require('child_process').spawn
const MemoryWritable = require('./src/MemoryWritable')

const spawnPromise = (child) => {
  const output = new MemoryWritable()

  child.stdout.pipe(output)
  return new Promise((resolve, reject) => {
    child.addListener('error', reject)
    child.addListener('close', resolve)
  }).then(() => output.toString())
}

const spawnR = () => {
  const pwd = `${process.env['LAMBDA_TASK_ROOT'] || process.env['PWD']}`
  const whereWeR = `${pwd}/lib/portableR`
  process.env['LD_LIBRARY_PATH'] = `${whereWeR}/lib`
  process.env['R_HOME'] = `${whereWeR}/`
  process.env['R_HOME_DIR'] = `${whereWeR}/`
  process.env['R_LIBS_SITE'] = `${whereWeR}/site-library:${whereWeR}/library`

  return spawn(
    './lib/portableR/R',
    [
      '--no-restore',
      `--file=${pwd}/hello_world.r`,
      '--slave'
    ])
}

const runRScript = (options, context) =>
  Promise.all([spawnPromise(spawnR())])
  .then((msgs) => context.succeed(msgs))

module.exports = { handler: runRScript }
