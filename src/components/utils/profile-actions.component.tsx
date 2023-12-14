import React, {useCallback, useState} from "react";
import {Modal} from "./modal-component.tsx";
import {FaTrashCan} from "react-icons/fa6";
import {Button} from "./button.component.tsx";
import {FaArrowLeft} from "react-icons/fa";
import {useSubscribe} from "../../subscribe.ts";
import {useAuthQuery} from "../../store/auth/hooks/useAuthHook.ts";
import {useAuthLogout} from "../../store/auth/hooks/useAuthLogoutHook.ts";
import {UserAvatar} from "./user-avatar.component.tsx";

export const ProfileActions: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const {data: userData, isLoading} = useAuthQuery();
	const {mutate: logout} = useAuthLogout();

	const handleProfileSignal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handleLogout = useCallback(() => {
		setIsOpen(false);
		void logout();
	}, []);

	useSubscribe('profile-show', handleProfileSignal);

	if (isLoading || !userData) {
		return null;
	}

	return <Modal
		open={isOpen}
		type={'normal'}
		onClose={() => setIsOpen(false)}
		title={'Profile'}
		body={<>
			<div className={'profile-data'}>
				<UserAvatar src={userData.avatar} name={userData.name}/>
				<p>{userData.name}</p>
			</div>
			<div className={'profile-text'}>
				<p>
					Are you sure you want to logout?
				</p>
			</div>
		</>}
		actions={<>
			<Button type={'secondary'} icon={<FaArrowLeft/>} onClick={() => setIsOpen(false)}>
				Cancel (Esc)
			</Button>
			<Button type={'danger'} onClick={handleLogout} icon={<FaTrashCan/>}>
				Log out
			</Button>
		</>}
	/>;
};
