import Cookies from 'js-cookie'

const token = Cookies.get('token')
// let baseURL = process.env.VUE_APP_HTTP_S + process.env.VUE_APP_BASE_URL + process.env.VUE_APP_API_POSTFIX
const baseURL = 'http://api.lc/api/'

let axios = require('axios').create({
    baseURL: baseURL
})

//let axios_err = require('axios')

if (token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`



export default axios
