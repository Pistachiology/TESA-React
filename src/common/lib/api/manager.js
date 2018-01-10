import * as httpStatus from 'http-status'

import Immutable from 'immutable'
import _ from 'lodash'
import axios from 'axios'
import objectToForm from 'common/utils/objectToForm'

// const camelcaseKeys = require('camelcase-keys')

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  transformRequest: axios.defaults.transformRequest.concat((data, headers) => {
    // TODO: make localStorage singleton with Autocheck Storage Exists
    try {
      const token = localStorage.getItem(process.env.tokenName)
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    } catch (e) {} // eslint-disable-line no-empty
    return data
  }),
  transformResponse: axios.defaults.transformResponse.concat(data => {
    return Immutable.fromJS(data)
  })
})

const verbs = ['get', 'post', 'put', 'patch', 'delete']

class ApiManager {}

function handleSuccess(res) {
  if (httpStatus.NO_CONTENT == res.status) {
    return Immutable.fromJS({
      success: true
    })
  }
  return res.data.set('code', res.status)
}

function handleFailed(res) {
  return Promise.reject(Immutable.fromJS(res.data || {}).set('code', res.status))
}

function preparePostFiles(data, files) {
  try {
    const formData = objectToForm(files)
    formData.append('payload', JSON.stringify(data))
    return formData
  } catch (e) {
    return undefined
  }
}

/* handle each verb here */
for (let verb of verbs) {
  if (!_.includes(['get', 'delete'], verb)) {
    ApiManager.prototype[`${verb}WithFiles`] = function(url, data, files, config = {}) {
      const postData = preparePostFiles(data, files)
      config = Object.assign({ headers: { 'Content-Type': 'multipart/form-data' } }, config)
      return api[verb](url, postData, config).then(handleSuccess, handleFailed)
    }

    ApiManager.prototype[verb] = function(url, data, config) {
      return api[verb](url, data, config).then(handleSuccess, handleFailed)
    }
  } else {
    ApiManager.prototype[verb] = function(url, config) {
      return api[verb](url, config).then(handleSuccess, handleFailed)
    }
  }
}

export default new ApiManager()
