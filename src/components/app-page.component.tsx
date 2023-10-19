import React from "react";
import {matchRoutes} from "react-router";
import {AppRoutes} from "../routes.tsx";
import {useLocation} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";


const topAnimationParams = {
	initial: {
		opacity: 0,
		transform: 'translateY(-20px)'
	},
	in: {
		opacity: 1,
		transform: 'translateY(0)'
	},
	exit: {
		opacity: 0,
		transform: 'translateY(20px)'
	}
};

// const sideAnimationParams = {
// 	initial: {
// 		opacity: 0,
// 		transform: 'scale(0.5)'
// 	},
// 	in: {
// 		opacity: 1,
// 		transform: 'scale(1)'
// 	},
// 	exit: {
// 		opacity: 0,
// 		transform: 'scale(0.5)',
// 	}
// };

const pageTransition = {
	type: 'tween',
	ease: 'circIn',
	duration: .2
};

export type TAppPageProps = {
	title?: string
	children: any
	header?: JSX.Element
}

export const AppPage: React.FC<TAppPageProps> = ({title, children}) => {
	const location = useLocation();
	const currentRouteTitle = (matchRoutes(AppRoutes, location)?.pop() as any)?.route?.['handle'];

	if (title) {
		window.document.title = title + (currentRouteTitle ? ' | ' + currentRouteTitle : '');
	} else {
		window.document.title = 'My Cool App';
	}

	return <>
		<AnimatePresence mode="popLayout">
			<motion.main
				key={location.pathname}
				className="app-page"
				initial={'initial'}
				exit={'exit'}
				animate={'in'}
				variants={topAnimationParams}
				transition={pageTransition}
				style={{display: 'flex', width: '100%', height: '100%'}}
			>
				<div className='app-page-wrapper'>
					<div className={'app-page-content'}>
						{children}
					</div>
				</div>
			</motion.main>
		</AnimatePresence>

	</>;
};
