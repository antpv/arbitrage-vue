import ApiService from './ApiService'

export default {
  async getApplications() {
    try {
      const response = await ApiService.get('/api/apps/')
      const results = response.data

      return results
    } catch (error) {
      throw Error(error)
    }
  },

  async createApplication(payload) {
    try {
      const response = await ApiService.post('/api/apps/', payload)

      return response
    } catch (error) {
      throw Error(error)
    }
  },

  async editApplication(id, payload) {
    try {
      const response = await ApiService.post(`/api/apps/${id}/`, payload)

      return response
    } catch (error) {
      throw Error(error)
    }
  }
}
