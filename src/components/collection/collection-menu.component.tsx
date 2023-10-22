import React from "react";
import {NavLink, useParams} from "react-router-dom";
import {countCards, getCollection} from "../../store/data/collections-store.selectors.ts";
import {FaGrip} from "react-icons/fa6";
import {FiMaximize} from "react-icons/fi";
import {IoBarChart} from "react-icons/io5";
import {MdDesignServices} from "react-icons/md";

export const CollectionMenu: React.FC = () => {
	const params = useParams();
	const collectionId = params.collectionId;
	const isNew = collectionId === 'new';
	const collection = isNew ? null : getCollection(collectionId);
	const count = isNew ? 0 : countCards(collectionId);

	if (!isNew && !collection) {
		document.body.classList.remove('with-side-menu');
		return null;
	}
	document.body.classList.add('with-side-menu');

	return <div className={'side-menu' + (isNew ? ' locked' : '')}>
		<div className={'menu-content'}>
			{/*<div className={'menu-title'}><GoBackButton/></div>*/}

			<div className={'menu-links'}>
				<NavLink to={'/collections/' + collectionId + '/overview'}>
					<FiMaximize/>
					Overview
				</NavLink>

				<NavLink to={'/collections/' + collectionId + '/details'}>
					<MdDesignServices/>
					Change
				</NavLink>

				<NavLink to={'/collections/' + collectionId + '/cards'}>
					<FaGrip/>
					Cards <span className={'badge badge-white'}>{count}</span>
				</NavLink>

				<NavLink to={'/collections/' + collectionId + '/stat'}>
					<IoBarChart/>
					Statistics
				</NavLink>
			</div>
		</div>
	</div>;
}
