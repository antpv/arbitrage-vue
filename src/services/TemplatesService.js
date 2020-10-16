import ApiService from './ApiService'

export default {
  async getTemplates() {
    try {
      const response = await ApiService.get('/api/templates/')
      const results = response.data

      return results
    } catch (error) {
      throw Error(error)
    }
  },

  async createTemplate(payload) {
    console.log('POST', payload)

    try {
      const response = await ApiService.post('/api/templates/', payload)

      console.log('RESPONSE', response)

      return response
    } catch (error) {
      throw Error(error)
    }
  }
}
