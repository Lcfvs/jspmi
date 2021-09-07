# jspmi

A utility to install some NPM dependencies and to push them into an
[`importmap`](https://github.com/WICG/import-maps) file at once,
based on the [JSPM Generator](https://www.npmjs.com/package/@jspm/generator).

## install

`npm i jspmi -g`

## Commands

### The `install` command

 * `jspmi install [options] <dependencies...>`
 * `jspmi i [options] <dependencies...>`

### The `uninstall` command

 * `jspmi uninstall [options] <dependencies...>`
 * `jspmi un [options] <dependencies...>`

## Options

 * `-c jspmi.config.json`/`--config jspmi.config.json`

### Configuration

```json
{
  "installer": "npm",
  "map": "production.importmap",
  "settings": {
    "env": ["production", "browser"]
  },
  "locals": {
    "/assets/js/dist.js": "/assets/js/main.js"
  }
}
```
 * `installer`: your preferred module installer (`npm`, `pnpm`, ...)
 * `map`: the input/output file path
 * `settings`: your **JSPM Generator** settings
 * `locals`: **optional**, your website modules, useful to make a progressive `importmap` support.

### Install Example

```sh
# Installing the anticore components
jspmi i anticore anticore/defaults.js anticore/trigger.js
# Installs the anticore basic contracts
jspmi i @anticore-contracts/tree-insert/on.js @anticore-contracts/tree-view/on.js
```
 * Installs the NPM dependencies
 * Generates the following importmap

```json
{
  "imports": {
    "@anticore-contracts/tree-insert/on.js": "https://ga.jspm.io/npm:@anticore-contracts/tree-insert@2.0.5/on.js",
    "@anticore-contracts/tree-view/on.js": "https://ga.jspm.io/npm:@anticore-contracts/tree-view@1.0.5/on.js",
    "anticore": "https://ga.jspm.io/npm:anticore@4.6.3/index.js",
    "anticore/defaults.js": "https://ga.jspm.io/npm:anticore@4.6.3/defaults.js",
    "anticore/trigger.js": "https://ga.jspm.io/npm:anticore@4.6.3/trigger.js",
    "/assets/js/dist.js": "/assets/js/main.js"
  }
}
```

Then you can include it into your HTML or SVG layout, like:
```html
<script type="importmap">
{
  "imports": {
    "@anticore-contracts/tree-insert/on.js": "https://ga.jspm.io/npm:@anticore-contracts/tree-insert@2.0.5/on.js",
    "@anticore-contracts/tree-view/on.js": "https://ga.jspm.io/npm:@anticore-contracts/tree-view@1.0.5/on.js",
    "anticore": "https://ga.jspm.io/npm:anticore@4.6.3/index.js",
    "anticore/defaults.js": "https://ga.jspm.io/npm:anticore@4.6.3/defaults.js",
    "anticore/trigger.js": "https://ga.jspm.io/npm:anticore@4.6.3/trigger.js",
    "/assets/js/dist.js": "/assets/js/main.js"
  }
}
</script>
<script type="module">import '/assets/js/dist.js'</script>
```
Which imports `'/assets/js/dist.js'`, targeting your bundle on the browsers which doesn't support the `importmap`,
but targeting the non-bundled entrypoint, resolved by the `importmap`, on the others.

## License

[MIT](./license.md)
