# jspmi

[ALPHA] A utility to install some NPM dependencies and to push them into an `importmap` file
at once, based on the [JSPM Generator](https://www.npmjs.com/package/@jspm/generator) .

## install

`npm i jspmi -g`

## Commands

### The `install` command

 * `jspmi install [options] <dependencies...>`
 * `jspmi i [options] <dependencies...>`

Example: `jspmi i anticore/defaults.js anticore/trigger.js`

### The `uninstall` command

 * `jspmi uninstall [options] <dependencies...>`
 * `jspmi un [options] <dependencies...>`

Example: `jspmi un anticore/defaults.js anticore/trigger.js`

## Options

 * `-c jspmi.config.json`/`--config jspmi.config.json`

### Configuration

```json
{
  "installer": "npm",
  "map": "production.importmap",
  "dist": "/assets/js/dist.js",
  "main": "/assets/js/main.js",
  "settings": {
    "env": ["production", "browser"]
  }
}
```
 * `installer`: your preferred module installer (`npm`, `pnpm`, ...)
 * `map`: the input/output file path
 * `dist`: your bundle (as a fallback for the browsers which doesn't supports the importmap, yet) path to access it from your website
 * `main`: your main path (resolved by the importmap on the browser) to access it from your website
 * `settings`: your **JSPM Generator** settings

## License

[MIT](./license.md)
