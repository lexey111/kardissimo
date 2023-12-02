export type TUser = {
	id?: string
	name?: string
	lastLogin?: string
	provider?: string
	avatar?: string
	error?: string
}

export const noUserData = {
	id: undefined,
	name: undefined,
	provider: undefined,
	lastLogin: undefined,
	avatar: undefined,
};
