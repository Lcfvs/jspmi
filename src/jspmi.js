#!/usr/bin/env node
import { Command } from 'commander'
import proceed from './proceed.js'

const program = new Command('jspmi')
  .enablePositionalOptions()
  .usage('command [options] <dependencies...>')

program
  .command('install')
  .alias('i')
  .usage('<dependencies...>')
  .option('-c, --config <config>', 'Custom jspmi.config.json')
  .passThroughOptions()
  .allowUnknownOption()
  .action(proceed)

program
  .command('uninstall')
  .alias('un')
  .usage('<dependencies...>')
  .option('-c, --config <config>', 'Custom jspmi.config.json')
  .passThroughOptions()
  .allowUnknownOption()
  .action(proceed)

program.parse(process.argv)

/*


const jspmi = program.command('jspmi')
  .action(() => program.help())
  .argument('<dependencies...>')
  .allowUnknownOption()

jspmi
  .command('install', 'Installs the dependencies')
  .alias('i')
  .action(proceed)

jspmi
  .command('uninstall', 'Uninstalls the dependencies')
  .alias('un')
  .action(proceed)

jspmi
  .parse(process.argv)

*/
