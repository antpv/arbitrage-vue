import moment from 'moment'
import ApiService from './ApiService'

export default {
  async getStatistics(params) {
    const response = await ApiService.post('/api/stat', { params })
    const data = response.data
    const results = []

    for (const CreatedAt in data) {
      const item = Object.assign({}, data[CreatedAt], { CreatedAt })

      results.push(item)
    }

    return results.slice().sort((a, b) => {
      return moment(a.CreatedAt).isBefore(b.CreatedAt)
    })
  }
}
