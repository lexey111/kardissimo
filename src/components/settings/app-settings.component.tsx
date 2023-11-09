import React, {useCallback, useEffect, useState} from "react";
import {HiMiniCog6Tooth} from "react-icons/hi2";
import {CloseCross} from "../utils/close-cross.component.tsx";
import {AppearanceSelector} from "./appearance-selector.component.tsx";

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
				<div className={'app-settings-close'}>
					<CloseCross onClick={() => setActive(false)}/>
				</div>
			</h1>
			<AppearanceSelector/>
		</div>
	</div>;
}
