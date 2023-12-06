import React from "react";
import {CardboxScene} from "../../components/3d/cardbox-scene.component.tsx";
import {PageHeader} from "../../components/utils/page-header.component.tsx";
import {NavLink} from "react-router-dom";

export const RunNoData: React.FC = () => {
	return <div className={'run-list'}>
		<PageHeader
			hasBack={false}
			noBg={true}
			title={'There are no ready to run card boxes yet'}
			image={<CardboxScene type={'run'}/>}
		/>
		<div className={'page-32'}>
			<div className={'cards-import'}>
				<h1>Oops</h1>
				<p>
					Unfortunately, you have no card boxes ready to run yet.
				</p>
				<p>
					To be able to work, there must be at least one card in the card box. You need to open the <NavLink
					to={'/cardboxes'}>Card Boxes page</NavLink> and create or import one – or more – card box.
				</p>
			</div>
		</div>
	</div>;
};
