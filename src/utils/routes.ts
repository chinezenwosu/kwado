const routes = {
  getHome: () => {
    return '/'
  },
  getDiary: (slug: string) => {
    return `/diary/${slug}`
  }
}

export default routes