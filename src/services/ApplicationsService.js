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
  }
}
