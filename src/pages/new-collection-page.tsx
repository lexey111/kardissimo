import React, {useCallback} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionScene} from "../components/scene/collection-scene.component.tsx";
import {AppPageHeader} from "../components/app-page-header.component.tsx";
import {useNavigate} from 'react-router-dom';

export const NewCollectionPage: React.FC = () => {
	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		console.log('go back');
		navigate(-1);
	}, []);

	return <AppPage title={'New collection page'}>
		<AppPageHeader
			title={'New collection'}
			subtitle={'Create your own set of cards'}
			image={<CollectionScene/>}
			onBack={handleBack}
		/>
	</AppPage>;
};
