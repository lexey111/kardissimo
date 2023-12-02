import {create} from 'zustand';

export type TUser = {
	id?: string
	name?: string
	lastLogin?: string
	provider?: string
	avatar?: string
	error?: string
}

export type IAuthState = {
	fetching: boolean
	loginData: TUser & {
		error?: any
	}
}

export const noUserData = {
	id: undefined,
	name: undefined,
	provider: undefined,
	lastLogin: undefined,
	avatar: undefined,
};

export const useAuthStore = create<IAuthState>(() => ({
	fetching: true,
	loginData: {}
}));
