/**
 * Gets authentication middleware
 */
export function getAuthMiddleware ({ checkLogin }) {
  /**
   * @param {{
   *  next: import('vue-router').NavigationGuardNext,
   *  router: import('vue-router').Router
   * }} args
   * @returns {any}
   */
  return ({ next, router }) => {
    const isLogged = !!window.localStorage.getItem('app.auth')
    if (checkLogin && !isLogged) {
      return router.push({ name: 'login' })
    }
    if (!checkLogin && isLogged) {
      return router.push({ name: 'home' })
    }
    return next()
  }
}
