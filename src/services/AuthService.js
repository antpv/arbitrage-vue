import ApiService from './ApiService'

export default {
  async login(params) {
    const response = await ApiService.post('/', { params })

    return response
  }
}
