export interface User {
	id: number | string
	username?: string
	email?: string
	confirmed?: boolean
	blocked?: boolean
}
