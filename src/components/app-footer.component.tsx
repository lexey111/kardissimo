import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";

export const AppFooter: React.FC = () => {
	const navigate = useNavigate();

	const goFaq = useCallback(() => {
		navigate('/faq');
	}, []);

	return <div id='app-footer'>
		<div id='app-footer-content'>
			&copy; 2023 Oleksii Koshkin aka lexey111
			<span onClick={goFaq}>Version 1.0.0</span>
		</div>
	</div>;
};
