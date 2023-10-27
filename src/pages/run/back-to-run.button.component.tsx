import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

export const BackToRunButton: React.FC = () => {
	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		navigate('/run');
	}, []);


	return <div className={'scene-go-back'} onClick={handleBack} tabIndex={1}>
		<FaArrowLeft/>
	</div>
}
