import React from "react";
import {CardListModeSelector} from "./card-list-mode-selector.component.tsx";
import {useSettingsQuery} from "../../../store/settings/hooks/useSettingsHook.tsx";
import {TSCardbox, TSCardboxKey} from "../../../store/cardboxes/types-cardbox.ts";
import {WaitInline} from "../../../components/utils/wait-inline.component.tsx";
import {MinScreenWidthContainer} from "../../../components/utils/min-screen-width-container.tsx";

export type TCardListHeaderProps = {
	cardbox: TSCardbox
}

export const CardListHeader: React.FC<TCardListHeaderProps> = ({cardbox}) => {
	const {isLoading, data: appState} = useSettingsQuery();

	if (isLoading || !appState) {
		return <WaitInline text={'Loading data...'}/>;
	}

	const showSideNames = appState.cardListStyle === 'list';

	return <div className={'card-sides-header'}>
		<MinScreenWidthContainer minScreenWidth={800}>
			{showSideNames && [1, 2].map((side, idx) => {
				return <div className={'card-side-name'} key={idx.toString()}>
					{cardbox[`side${side}title` as TSCardboxKey] as string}
				</div>
			})}
		</MinScreenWidthContainer>

		<CardListModeSelector cardbox={cardbox}/>
	</div>;
};
