import PushList from './PushList'

export default {
  name: 'PushList',
  path: '/pushlist',
  component: PushList,
  meta: {
    requiresAuth: true
  }
}
