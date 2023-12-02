export const authUpdate = () => {
	(window as any)['__queryClient'].refetchQueries();
}
