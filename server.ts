// Load env variables
const env = process.env.NODE_ENV
require('dotenv').config({path: require('path').resolve(__dirname, `.env.${env}`)})

const nextConfig = require('./next.config')
const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

// Initialize NextJS app and request handler
const app = next({
  dir: '.',
  dev: env === 'development',
  quiet: env === 'production',
  conf: nextConfig,
})
const handler = app.getRequestHandler()

// Server creation error handler
const errorHandler = (err: any) => {
  if (err) {
    throw err
  }
  console.info(`NextJS Server ready`)
}

const withLocale = (handler: any) => {
  return async (req: any, res: any, url: any) => {
    const lang = 'en'
    req.lang = lang
    return handler(req, res, url)
  }
}

app.prepare().then(() => {
  createServer((req: any, res: any) => {
    const url = parse(req.url, true)
    const {pathname} = url

    if (pathname.startsWith('/_next/') || pathname === '/favicon.ico') {
      // NextJS server resources
      handler(req, res, url)
    } else if (pathname.startsWith('/api/')) {
      // API
      handler(req, res, url)
    } else {
      (withLocale(handler))(req, res, url)
    }
  }).listen(80, errorHandler)
})

export {}