import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

export const GoBackButton: React.FC = () => {
	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		navigate(`/collections`);
	}, []);


	return <div className={'go-back'} onClick={handleBack} tabIndex={1}>
		<FaArrowLeft/>
	</div>
}
