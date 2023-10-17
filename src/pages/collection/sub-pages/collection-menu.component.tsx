import React from "react";
import {NavLink, useParams} from "react-router-dom";
import {countCards, getCollection} from "../../../store/data/collections-store.selectors.ts";
import {GoBackButton} from "./go-back.component.tsx";
import {FaGrip} from "react-icons/fa6";
import {FiMaximize} from "react-icons/fi";
import {IoBarChart} from "react-icons/io5";
import {MdDesignServices} from "react-icons/md";

export type TCollectionMenuProps = {
	exclusiveLock: boolean
}

export const CollectionMenu: React.FC<TCollectionMenuProps> = ({exclusiveLock}) => {
	const params = useParams();
	const collection = getCollection(params.id);
	const count = countCards(params.id);

	if (!collection) {
		return null;
	}

	return <div className={'collection-menu' + (exclusiveLock ? ' locked' : '')}>
		<div className={'menu-content'}>
			<div className={'menu-title'}><GoBackButton/></div>

			<div className={'menu-links'}>
				<NavLink to={'/collections/' + collection.id + '/overview'}>
					<FiMaximize/>
					Overview
				</NavLink>

				<NavLink to={'/collections/' + collection.id + '/details'}>
					<MdDesignServices/>
					Change
				</NavLink>

				{/*<NavLink to={'/collections/' + collection.id + '/appearance'}>*/}
				{/*	<FaBrush/>*/}
				{/*	Appearance*/}
				{/*</NavLink>*/}

				<NavLink to={'/collections/' + collection.id + '/cards'}>
					<FaGrip/>
					Cards <span className={'badge badge-white'}>{count}</span>
				</NavLink>

				<NavLink to={'/collections/' + collection.id + '/stat'}>
					<IoBarChart/>
					Statistics
				</NavLink>
			</div>
		</div>
	</div>;
}
