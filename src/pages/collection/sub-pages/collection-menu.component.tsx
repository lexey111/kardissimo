import React from "react";
import {NavLink, useParams, useSearchParams} from "react-router-dom";
import {countCards, getCollection} from "../../../store/data/collections-store.selectors.ts";
import {FaGrip} from "react-icons/fa6";
import {FiMaximize} from "react-icons/fi";
import {IoBarChart} from "react-icons/io5";
import {MdDesignServices} from "react-icons/md";
import {GoBackButton} from "./go-back.component.tsx";

export const CollectionMenu: React.FC = () => {
	const params = useParams();
	const collection = getCollection(params.id);
	const count = countCards(params.id);
	const [searchParams] = useSearchParams();
	const exclusiveLock = searchParams.get('new') !== null;

	if (!collection) {
		document.body.classList.remove('with-side-menu');
		return null;
	}
	document.body.classList.add('with-side-menu');

	return <div className={'side-menu' + (exclusiveLock ? ' locked' : '')}>
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
