import React, {useState} from "react";
import {useOutlet} from "react-router";
import {ScrollRestoration, useLocation} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {CollectionMenu} from "./pages/collection/sub-pages/collection-menu.component.tsx";
import {AppMenu} from "./components/app-menu.component.tsx";
import {AppFooter} from "./components/app-footer.component.tsx";
import {AppHeader} from "./components/app-header.component.tsx";


const AnimatedOutlet: React.FC = () => {
	const o = useOutlet();
	const [outlet] = useState(o);
	return <>{outlet}</>;
};

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

export const App: React.FC = () => {
	const location = useLocation();

	return <>
		<CollectionMenu/>

		<div id={'app_main_container'}>
			<AppMenu/>
			<AppHeader/>
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
					<AnimatedOutlet/>
				</motion.main>
			</AnimatePresence>

			<ScrollRestoration
				getKey={(location) => {
					return location.pathname;
				}}
			/>
			<AppFooter/>
		</div>
	</>;
};
