import {create} from 'zustand';

export type IAuthState = {
	fetching: boolean
	loginData: {
		id?: string
		name?: string
		lastLogin?: string
		provider?: string
		avatar?: string
		error?: any
	}
}

export const useAuthStore = create<IAuthState>(() => ({
	fetching: true,
	loginData: {
	}
}));
