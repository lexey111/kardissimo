import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

export const BackToCollectionsButton: React.FC = () => {
	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		//navigate('/collections', {preventScrollReset: true});
		navigate(-1);
	}, [navigate]);

	return <div className={'go-back'} onClick={handleBack} tabIndex={1}>
		<FaArrowLeft/>
	</div>
}
