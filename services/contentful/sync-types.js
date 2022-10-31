require('dotenv').config({ path: '.env.local' })
const { spawn } = require('node:child_process')

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN } = process.env

const sync = spawn('npx', [
  'cf-content-types-generator', '-s', CONTENTFUL_SPACE_ID, '-t', CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN, '-o', './services/contentful/types/']
)

sync.stdout.setEncoding('utf8')
sync.stderr.setEncoding('utf8')

sync.stdout.on('data', (data) => {
  console.log(data.toString())
})

sync.stderr.on('data', (data) => {
  console.error(data.toString())
})
