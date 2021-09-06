import { Generator } from '@jspm/generator'
import { dirname, resolve } from 'path'
import { cwd } from 'process'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { execSync } from 'child_process'

const pattern = /^((?:@[^/]+\/)?[^/]+(?:@[^/])?)/

const read = async src => JSON.parse(`${await readFile(src)}`)

const write = async (src, data) => {
const path = resolve(cwd(), src)

await mkdir(dirname(path), { recursive: true })

return writeFile(path, JSON.stringify(data))
}

export default async (options, cmd) => {
  const {
    config = 'jspmi.config.json'
  } = options

  const command = cmd.name()

  const { args } = cmd

  const { dist, map, settings, installer, main } = await read(config)

  await Promise.all(
    Object.entries({ dist, map, settings, installer, main })
      .map(([key, value]) =>
        value ?? Promise.reject(new Error(`Missing ${key} into your ${config}`))))

  const generator = new Generator(settings)

  const { imports: { [dist]: d, ...imports } = {} } = await read(map).catch(() => ({}))

  const files = args.filter(arg => !arg.startsWith('-'))

  const dependencies = new Set(files.map(arg => arg.match(pattern)[1]))

  const flags = args.filter(arg => !files.includes(arg))

  const keys = new Set(Object.keys(imports))

  try {
    execSync([installer, command, ...dependencies, ...flags].join(' '), {
      stdio: 'inherit'
    })
  } catch {
    process.exit()
  }

  for (const file of files) {
    if (command === 'install') {
      keys.add(file)
    } else {
      keys.delete(file)
    }
  }

  await generator.install([...keys])

  const importmap = { ...generator.getMap() }

  importmap.imports = {
    ...importmap.imports,
    [dist]: main
  }

  await write(map, importmap)
}
