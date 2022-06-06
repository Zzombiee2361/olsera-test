/**
 * Checks authentication
 * @param {{
 *  next: import('vue-router').NavigationGuardNext,
 *  router: import('vue-router').Router
 * }} args
 * @returns {any}
 */
export default function ({ next, router }) {
  if (!window.localStorage.getItem('app.auth')) {
    return router.push({ name: 'login' })
  }
  return next()
}
