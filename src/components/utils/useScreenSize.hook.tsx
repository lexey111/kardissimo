import {useEffect, useState} from 'react';

export const useScreenSize = (desiredMinWidth?: number) => {

	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const [show, setShow] = useState(desiredMinWidth ? window.innerWidth >= desiredMinWidth : false);

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});

			if (desiredMinWidth) {
				setShow(window.innerWidth >= desiredMinWidth);
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {
		screenSize,
		show
	};
};
