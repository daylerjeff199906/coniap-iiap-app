const isProduction = process.env.NODE_ENV === 'production'
const urlProd = process.env.API_URL_PROD
const urlLocal = process.env.API_URL_LOCAL
const appName = process.env.APP_NAME

const urlBase = isProduction ? urlProd : urlLocal

export function getUrlBase() {
  return urlBase
}

export function getAppName() {
  return appName
}
