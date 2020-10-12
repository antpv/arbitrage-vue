// import ApiService from './ApiService'

export default {
  async getApplications() {
    // const response = await ApiService.post('/api/apps/')
    // console.log(response)

    return [
      {
        ID: 4,
        CreatedAt: '0001-01-01T00:00:00Z',
        UpdatedAt: '0001-01-01T00:00:00Z',
        DeletedAt: null,
        Name: '',
        BundleId: 'com.apple.greed',
        MagicCheckerId: '',
        FacebookId: '',
        PushApiKey: ''
      },
      {
        ID: 5,
        CreatedAt: '0001-01-01T00:00:00Z',
        UpdatedAt: '0001-01-01T00:00:00Z',
        DeletedAt: null,
        Name: '',
        BundleId: 'ABC',
        MagicCheckerId: '',
        FacebookId: '',
        PushApiKey: ''
      }
    ]
  }
}
