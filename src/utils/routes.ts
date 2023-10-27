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
	getDiaries: () => {
		return '/diaries'
	},
	getDiary: (slug: string) => {
		return `/diaries/${slug}`
	},
}

export default routes
