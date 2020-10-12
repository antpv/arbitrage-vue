import ApiService from './ApiService'

export default {
  async getTemplates() {
    try {
      const response = await ApiService.post('/api/templates/')

      console.log(response)
    } catch (error) {
      console.log(error)
    }

    return [
      {
        CreatedAt: '0001-01-01T00:00:00Z'
      }
    ]
  }
}
