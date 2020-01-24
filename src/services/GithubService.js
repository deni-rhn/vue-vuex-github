import Api from '@/services/Api'

export default {
  searchUser (params) {
    return Api().get('users/' + params.username)
  },
  searchRepos (params) {
    return Api().get('users/' + params.username + '/repos')
  },
  getReposReadMe (owner, repo) {
    return Api().get('repos/' + owner + '/' + repo + '/readme')
  }
}
