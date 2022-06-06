export default {
  namespaced: true,
  state () {
    let user = window.localStorage.getItem('app.auth')
    if (user) {
      user = JSON.parse(user)
    }
    return { user }
  },
  getters: {
    isLogged (state) {
      return !!state.user
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      window.localStorage.setItem('app.auth', JSON.stringify(user))
    }
  }
}
