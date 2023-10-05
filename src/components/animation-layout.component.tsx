import {motion} from "framer-motion";
import React from "react";
import {Outlet, useLocation} from 'react-router-dom';

// @ts-ignore
const PageLayout = ({children}) => children;

const pageVariants = {
	initial: {
		opacity: 0,
		transform: 'translateY(-20px)'
	},
	in: {
		opacity: 1,
		transform: 'translateY(0)'
	},
	out: {
		opacity: 0,
		transform: 'translateY(400px)'
	}
};

const pageTransition = {
	type: "tween",
	ease: "circIn",
	duration: 0.5
};

export const AnimationLayout: React.FC = () => {
	const {pathname} = useLocation();
	return (
		<PageLayout>
			<motion.div
				key={pathname}
				initial="initial"
				animate="in"
				variants={pageVariants}
				transition={pageTransition}
				style={{display: 'flex', width: '100%', height: '100%'}}
			>
				<Outlet/>
			</motion.div>
		</PageLayout>
	);
};
