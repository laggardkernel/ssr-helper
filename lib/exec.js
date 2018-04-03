const shell = require('shelljs')
const Conf = require('conf')
const config = new Conf()
const defaultConfig = new Conf({configName: 'default'})

function main (order, back) {
  if (defaultConfig.size === 0) console.error('Error: the default connection is unset!')
  else {
    if (order === 'start') {
      order = (back ? '' : '"') + config.get('ssr-path') +
        '/ss-local" -c ' + defaultConfig.path +
        ' -f /usr/local/var/run/shadowsocksr-libev.pid -u'
      if (back) return order
      else {
        console.log(order)
        let result = shell.exec(order)
        if (result.code !== 0) shell.echo(
          'Error: Script execute failed!')
        else shell.echo('Success!')
      }
    } else if (order === 'sudostart') {
      order = (back ? '' : 'sudo "') + config.get('ssr-path') +
        '/ss-local" -c ' + defaultConfig.path +
        ' -f /usr/local/var/run/shadowsocksr-libev.pid -u'
      if (back) return order
      else {
        console.log(order)
        let result = shell.exec(order)
        if (result.code !== 0) shell.echo(
          'Error: Script execute failed!')
        else shell.echo('Success!')
      }
    } else if (order === 'stop') {
      let res = shell.exec(
        'cat /usr/local/var/run/shadowsocksr-libev.pid', {
          silent: true
        }
      )
      if (res.code === 0) {
        let res1 = shell.exec('ps ' + res.stdout, {
          silent: true
        })
        if (res1.code === 0) {
          let result = shell.exec('kill -9 ' + res.stdout)
          if (result.code !== 0) shell.echo(
            'Error: Script execute failed!')
          else shell.echo('Success!')
        }
      } else console.log('Error: no process is running!')
    } else if (order === 'sudostop') {
      let res = shell.exec(
        'sudo cat /usr/local/var/run/shadowsocksr-libev.pid', {
          silent: true
        }
      )
      if (res.code === 0) {
        let res1 = shell.exec('ps ' + res.stdout, {
          silent: true
        })
        if (res1.code === 0) {
          let result = shell.exec('sudo kill -9 ' + res.stdout)
          if (result.code !== 0) shell.echo(
            'Error: Script execute failed!')
          else shell.echo('Success!')
        }
      } else console.log('Error: no process is running!')
    } else if (order === 'restart') {
      let res = shell.exec(
        'cat /usr/local/var/run/shadowsocksr-libev.pid', {
          silent: true
        }
      )
      if (res.code === 0) {
        let res1 = shell.exec('ps ' + res.stdout, {
          silent: true
        })
        if (res1.code === 0) {
          let result = shell.exec('kill -9 ' + res.stdout)
          if (result.code !== 0) shell.echo(
            'Info: No process is running!')
          else shell.echo('Stop process succeeded!')
        }
      }
      console.log('Starting new process...')
      order = '"' + config.get('ssr-path') + '/ss-local" -c ' +
        defaultConfig.path +
        ' -f /usr/local/var/run/shadowsocksr-libev.pid -u'
      let result = shell.exec(order)
      if (result.code !== 0) shell.echo('Error: Script execute failed!')
      else shell.echo('Success!')
    } else if (order === 'sudorestart') {
      let res = shell.exec(
        'sudo cat /usr/local/var/run/shadowsocksr-libev.pid', {
          silent: true
        }
      )
      if (res.code === 0) {
        let res1 = shell.exec('ps ' + res.stdout, {
          silent: true
        })
        if (res1.code === 0) {
          let result = shell.exec('sudo kill -9 ' + res.stdout)
          if (result.code !== 0) shell.echo(
            'Info: No process is running!')
          else shell.echo('Stop process succeeded!')
        }
      }
      console.log('Starting new process...')
      order = 'sudo "' + config.get('ssr-path') + '/ss-local" -c ' +
        defaultConfig.path +
        ' -f /usr/local/var/run/shadowsocksr-libev.pid -u'
      let result = shell.exec(order)
      if (result.code !== 0) shell.echo('Error: Script execute failed!')
      else shell.echo('Success!')
    }
    shell.exit(1)
  }
}

module.exports = main
