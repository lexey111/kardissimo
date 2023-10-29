import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

export const BackToRunButton: React.FC = () => {
	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		navigate('/run');
	}, []);

	const handleKeydown = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleBack();
		}
	}, []);


	return <div className={'scene-go-back'}
	            onKeyDown={handleKeydown}
	            onClick={handleBack} tabIndex={1}>
		<FaArrowLeft/>
	</div>
}
