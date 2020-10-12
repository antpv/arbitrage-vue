import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: { crossDomain: true, withCredentials: true }
})

export default instance
