import React, {useCallback, useEffect, useState} from "react";
import {HiMiniCog6Tooth} from "react-icons/hi2";
import {CloseCross} from "../utils/close-cross.component.tsx";
import {AppearanceSelector} from "./appearance-selector.component.tsx";
import {useUpdateSettingsMutation} from "../../store/settings/hooks/useSettingsUpdateHook.tsx";

export const AppSettings: React.FC = () => {
	const [active, setActive] = useState(false);

	const updateSettingsMutation = useUpdateSettingsMutation();

	const handleEsc = useCallback((e: any) => {
		if (e.key !== 'Escape') {
			return;
		}
		setActive(false);
	}, [setActive]);

	const handleApply = useCallback((id: string) => {
		//setCurrentAppearance(id);
		updateSettingsMutation.mutate({currentAppearance: id});
		setActive(false);
	}, []);

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
			{active && <>
				<AppearanceSelector onApply={handleApply}/>
			</>}
		</div>
	</div>;
}
