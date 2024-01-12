import axios from 'axios'
import domain from './domain'
import cachios from 'cachios'
import store from '@/store'
// import { EventBus } from '../eventBus'

const BASE_URL = process.env.VUE_APP_API_SERVER

const axiosInstance = axios.create({
  baseURL: '/',
  headers: { 'Cache-Control': 'no-cache' }
})

const cachedHttp = cachios.create(axiosInstance, { stdTTL: 30, checkperiod: 120 })

const _generateUrl = (url, params, mapping = null) => {
  if (params == null) {
    return url
  } else {
    let result = []
    let list = url.split('/')
    for (let item of list) {
      let resultItem = item
      if (item.startsWith('#')) {
        let key = item.substring(1)
        if (key && key.length > 0) {
          if (mapping != null) {
            resultItem = mapping[key] ? mapping[key] : ''
          } else {
            resultItem = params[key] ? params[key] : ''

            delete params[key]
          }
        }
      }
      result.push(resultItem)
    }
    return result.join('/')
  }
}

export default {
  removeCache: () => {
    cachedHttp.cache.flushAll()
  },

  process: (name, action, params, mapping = null) => {
    return new Promise((resolve, reject) => {
      const accessToken = store.state.user.token
      let info = domain[name][action]
      if (info) {
        let headers = {}

        let newUrl = _generateUrl(info.url, params, mapping)
        let base = BASE_URL

        console.log(base)
        // if(info.target == 'firebase') {
        // 	base = 'https://localhost:8090'
        // }
        if (info.requestAuth) {
          headers = Object.assign(headers, { Authorization: `Bearer ${accessToken}` })
        }
        newUrl = base + newUrl
        let method = 'get'
        if (info.task == 'post' || info.task == 'uploadFile') {
          method = 'post'
        } else if (info.task == 'put') {
          method = 'put'
        } else if (info.task == 'delete') {
          method = 'delete'
        }

        let newParams = params
        if (info.task == 'uploadFile') {
          const formData = new FormData()
          formData.append('file', params.file)
          newParams = formData
        }

        let p = null
        if (method == 'get' || method == 'delete') {
          let opt = {
            params: newParams,
            headers: headers
          }
          if (info.cache != undefined && info.cache == 'disable') {
            p = axiosInstance[method](newUrl, opt)
          } else {
            p = cachedHttp[method](newUrl, opt)
          }
        } else if (method == 'post' || method == 'put') {
          p = axiosInstance[method](newUrl, newParams, {
            headers: headers
          })
        }
        return p
          .then((response) => {
            resolve(response.data)
          })
          .catch((err) => {
            let res = err.response
            if (!res) {
              // network error
              if (!info.domain) {
                // EventBus.$emit("network:error")
                console.log('네트워크 에러')
              }
              reject(err)
            } else {
              if (res.status == 401) {
                console.log(`${res.status}, ${res.data.error}`)
                // EventBus.$emit('user:invalid')
                reject(err)
              } else if (res.data) {
                console.log(`${res.status}`)
                reject(res.data)
              } else {
                reject(err)
              }
            }
          })
      } else {
        reject('no domain info')
      }
    })
  }
}
