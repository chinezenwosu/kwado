const routes = {
  getHome: () => {
    return '/'
  },
  getLogin: () => {
    return '/login'
  },
  getLogout: () => {
    return '/logout'
  },
  getSignup: () => {
    return '/signup'
  },
  getDashboard: () => {
    return '/dashboard'
  },
  getDiary: (slug: string) => {
    return `/diary/${slug}`
  }
}

export default routes
