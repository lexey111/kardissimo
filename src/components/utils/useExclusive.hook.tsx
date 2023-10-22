import {useEffect} from "react";

let counter = 0;
export const useExclusiveHook = () => {
	useEffect(() => {
		counter++;

		document.body.classList.add('exclusive-lock');

		return () => {
			counter--;

			if (counter === 0) {
				document.body.classList.remove('exclusive-lock');
			}
		}
	}, []);
};
