import React, {useCallback} from "react";
import {BigAddButton} from "../../../../../components/utils/big-add-button.component.tsx";
import {useSettingsQuery} from "../../../../../store/settings/hooks/useSettingsHook.tsx";

export type TCardListAddProps = {
	onClick: () => void;
}

export const CardListAdd: React.FC<TCardListAddProps> = ({onClick}) => {
	const {isLoading, error, data: appState} = useSettingsQuery();

	const handleAdd = useCallback(() => {
		onClick();
	}, [onClick]);

	if (isLoading || error || !appState) {
		return null;
	}

	return <div className={`card-list list-style-${appState.cardListStyle}`}>
		<div className={`card-list-add-${appState.cardListStyle}`}>
			<span></span>
			<div className={'card-item add'}>
				<div className={'card-sides'}>
					{[1, 2].map((_, idx) => {
						if (appState.cardListStyle === 'cards' && idx > 0) {
							return null
						}
						return <div key={'new' + idx.toString()} className={'card-side-content'}></div>;
					})}
				</div>
				<BigAddButton onClick={handleAdd} center/>
			</div>
			<span></span>
		</div>
	</div>;
};
