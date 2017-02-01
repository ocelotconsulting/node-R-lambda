const config = require('./config/default.json')
const spawn = require('child_process').spawn

const echoData = (data) => {
  console.log(`stdout: ${data}`)
}

const spawnPromise = (child) =>
  new Promise((resolve, reject) => {
    child.addListener('error', reject)
    child.addListener('close', resolve)
    child.stdout.on('data', echoData)
  })

const spawnR = () => {
  const whereWeR = `${process.env['LAMBDA_TASK_ROOT'] || process.env['PWD']}/lib/portableR`
  process.env['LD_LIBRARY_PATH'] = `${whereWeR}/lib`
  process.env['R_HOME'] = `${whereWeR}/`
  process.env['R_HOME_DIR'] = `${whereWeR}/`
  process.env['R_LIBS_SITE'] = `${whereWeR}/site-library:${whereWeR}/library`

  return spawn(
    './lib/portableR/R',
    [
      '--no-restore',
      `--file=${process.env['PWD']}/hello_world.r`
    ])
}

const runRScript = (options, context) =>
  Promise.all([spawnPromise(spawnR())])
  .then((msgs) => context.succeed(msgs))

module.exports = { handler: runRScript }
