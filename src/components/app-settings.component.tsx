import React, {useCallback, useEffect, useState} from "react";
import {HiMiniCog6Tooth} from "react-icons/hi2";
import {IoCloseSharp} from "react-icons/io5";

export const AppSettings: React.FC = () => {
	const [active, setActive] = useState(false);

	const handleEsc = useCallback((e: any) => {
		if (e.key !== 'Escape') {
			return;
		}
		setActive(false);
	}, [setActive]);

	useEffect(() => {
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		}
	}, [handleEsc]);

	useEffect(() => {
		if (active) {
			document.body.classList.add('settings-lock');
		} else {
			document.body.classList.remove('settings-lock');
		}
	}, [active]);

	return <div className={'app-settings-icon' + (active ? ' active' : '')}>
		<a href="#" onClick={() => setActive(true)}>
			<HiMiniCog6Tooth/>
		</a>
		<div className={'app-settings-backdrop'} onClick={() => setActive(false)}></div>

		<div className={'app-settings-container'}>
			<h1>
				Appearance
				<div className={'app-settings-close'} onClick={() => setActive(false)}><IoCloseSharp/></div>
			</h1>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae consequatur eum eveniet
			exercitationem fugit modi provident quae. Adipisci ducimus, est eveniet ipsa libero maiores perferendis
			quia quidem repellat sunt.
		</div>
	</div>;
}
