import React from "react";
import {AppFooter} from "./app-footer.component.tsx";
import {motion} from "framer-motion";
import {AppMenu} from "./app-menu.component.tsx";

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

const sideAnimationParams = {
	initial: {
		opacity: 0,
		transform: 'translateX(-40px)'
	},
	in: {
		opacity: 1,
		transform: 'translateX(0)'
	},
	exit: {
		opacity: 0,
		transform: 'translateX(40px)',
	}
};

const pageTransition = {
	type: 'tween',
	ease: 'circIn',
	duration: 0.1
};

export type TAppPageProps = {
	title?: string
	children: any
	header?: JSX.Element
	float?: JSX.Element
	sideTransition?: boolean
}

export const AppPage: React.FC<TAppPageProps> = ({title, children, header, float, sideTransition = false}) => {
	if (title) {
		window.document.title = title;
	} else {
		window.document.title = 'My Cool App';
	}

	return <div id={'app_main_container'} className={(sideTransition ? ' side-card' : '')}>
		{sideTransition ? null : <AppMenu/>}
		{!!header && header}
		<motion.main
			className="app-page"
			initial={'initial'}
			exit={'exit'}
			animate={'in'}
			variants={sideTransition ? sideAnimationParams : topAnimationParams}
			transition={pageTransition}
			style={{display: 'flex', width: '100%', height: '100%'}}
		>
			<div className='app-page-wrapper'>
				<div className={'app-page-content'}>
					{children}
				</div>
				{float && float}
			</div>
		</motion.main>
		<AppFooter/>
	</div>;
};
