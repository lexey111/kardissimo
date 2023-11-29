import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

export type TBackButtonProps = {
	returnTo?: string
}

export const BackButton: React.FC<TBackButtonProps> = ({returnTo = 'back'}) => {
	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		if (returnTo === 'back') {
			navigate(-1);
			return;
		}
		navigate(returnTo);
	}, [navigate, returnTo]);

	return <div className={'go-back'} onClick={handleBack} tabIndex={1}>
		<FaArrowLeft/>
	</div>
}
