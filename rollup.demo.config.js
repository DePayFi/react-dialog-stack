import globals from './rollup.globals'
import pkg from './package.json'
import rollup from './rollup.module.config.js'

export default Object.assign({}, rollup, {
  input: 'demo/src/index.jsx',
  output: [
    {
      format: 'umd',
      name: 'DemoStack',
      globals: globals,
      file: 'tmp/index.demo.js'
    },
    {
      format: 'umd',
      name: 'DemoStack',
      globals: globals,
      file: 'demo/dist/index.js'
    },
  ]
})
