import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {PageHeader} from "../components/utils/page-header.component.tsx";

export const FaqPage: React.FC = () => {
	return <AppPage title={'FAQ'} authOnly={false}>
		<p>&nbsp;</p>
		<PageHeader
			title={'About page'}
			subtitle={'Some hidden wisdom'}
		/>
		<div className={'page-32 page-960'}>

			<h1>The project</h1>
			<p>
				This site was created as a side project to touch on some libraries and technologies that I am not used
				to.
			</p>
			<p>
				<b>3D text</b> with <b>ThreeJS</b> comes first, then <b>Zustand</b> as state manager instead of my
				usual <b>MobX</b>, then <b>Supabase</b> as Cloud DB instead GCP/AWS solutions, and, of course, <b>React
				Query</b> to make state and cache.
			</p>

			<p>
				The second goal was to create a flash card storage and runner engine to help me learn Spanish.
			</p>

			<p>
				That's basically it.
			</p>

			<p>
				Enjoy!
			</p>

			<p>
				&copy; 2023-2024 Oleksii Koshkin aka Lexey111
			</p>

			<h1>Technology stack</h1>
			<div className={'packages-container'}>
				<a className={'used-packages'} href="https://react.dev/" target={'_blank'}>React</a>

				<a className={'used-packages'} href="https://reactrouter.com/en/main" target={'_blank'}>React router</a>

				<a className={'used-packages'} href="https://tanstack.com/" target={'_blank'}>React query</a>

				<a className={'used-packages'} href="https://supabase.com" target={'_blank'}>Supabase</a>

				<a className={'used-packages'} href="https://react-icons.github.io/react-icons" target={'_blank'}>React
					icons</a>

				<a className={'used-packages'} href="https://headlessui.com/" target={'_blank'}>Headless UI</a>

				<a className={'used-packages'} href="https://threejs.org/" target={'_blank'}>ThreeJS</a>

				<a
					className={'used-packages'} href="https://protectwise.github.io/troika/troika-three-text/"
					target={'_blank'}>Troika 3D text</a>

				<a className={'used-packages'} href="https://github.com/pmndrs/drei" target={'_blank'}>Drei 3D</a>

				<a
					className={'used-packages'} href="https://docs.pmnd.rs/react-three-fiber"
					target={'_blank'}>React Three Fiber</a>

				<a
					className={'used-packages'} href="https://docs.pmnd.rs/react-three-fiber"
					target={'_blank'}>React Three Fiber</a>

				<a className={'used-packages'} href="https://www.framer.com/motion/" target={'_blank'}>Framer motion</a>

				<a className={'used-packages'} href="https://www.papaparse.com/" target={'_blank'}>Papa Parse</a>

				<a className={'used-packages'} href="https://react-select.com/" target={'_blank'}>React Select</a>

				<a
					className={'used-packages'} href="https://github.com/schrodinger/rc-slider"
					target={'_blank'}>RC Slider</a>

				<a
					className={'used-packages'} href="https://react-tooltip.com/docs/getting-started"
					target={'_blank'}>React tooltip</a>

				<a className={'used-packages'} href="https://www.typescriptlang.org/" target={'_blank'}>Typescript</a>

				<a className={'used-packages'} href="https://vitejs.dev/" target={'_blank'}>Vite</a>

				<a className={'used-packages'} href="https://eslint.org/" target={'_blank'}>ESLint</a>

				<a className={'used-packages'} href="https://sass-lang.com/" target={'_blank'}>SASS</a>
			</div>

			<h1>Packages used but later removed</h1>

			<div className={'packages-container'}>
				<a className={'removed-packages'} href="https://github.com/pmndrs/zustand" target={'_blank'}>Zustand</a>

				<a className={'removed-packages'} href="https://formik.org/" target={'_blank'}>Formik</a>

				<a className={'removed-packages'} href="https://casesandberg.github.io/react-color/d" target={'_blank'}>React
					color picker</a>

			</div>
			<p>
				<b>Zustand</b> – nice state manager, but it has no sense with Supabase + React Query.
			</p>

			<p>
				<b>Formik</b> - I spent too much time struggling with the library during complex validations. Despite
				the fact that it later turned out that I didn’t need such validations at all, the library was removed
				and replaced with simple, understandable code.
			</p>

			<p>
				<b>React color picker</b> – not as flexible as I would like, but color schemes have replaced it anyway.
			</p>

		</div>
	</AppPage>;
};
