import React from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {useParams, useSearchParams} from "react-router-dom";
import {useExclusiveHook} from "../../components/utils/useExclusive.hook.tsx";

export const RunEngineSubpage: React.FC = () => {
	let [searchParams] = useSearchParams();
	const params = useParams();

	useExclusiveHook();

	return <AppPage title={'Run'}>
		<div className={'sub-page'}>
			<p>
				collection: {params.collectionId}
			</p>
			<p>
				order: {searchParams?.get('order')}
			</p>
			<p>
				side: {searchParams?.get('side')}
			</p>
			<p>
				num: {searchParams?.get('num')}
			</p>
		</div>
	</AppPage>;
};
