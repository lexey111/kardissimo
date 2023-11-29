import {useCallback, useEffect, useRef, useState} from "react";

export const useHeight = (addHeight: number) => {
	const [needToShowScroll, setNeedToShow] = useState(false);

	const container = useRef<any>(null)
	const destroying = useRef<any>(false);
	const debouncer = useRef<any>(null);
	const resizeObserver = useRef<any>(null);
	const mutationObserver = useRef<any>(null);

	useEffect(() => {
		return () => {
			destroying.current = true;
		};
	}, []);

	const onResize = useCallback(() => {
		debouncedCheck();
	}, []);

	const debouncedCheck = useCallback(() => {
		debouncer.current && clearTimeout(debouncer.current);

		debouncer.current = setTimeout(() => {
			checkScroll();
		}, 200);
	}, []);

	const createObservers = useCallback(() => {
		if (!container.current) {
			return;
		}
		resizeObserver.current = new ResizeObserver(debouncedCheck);
		mutationObserver.current = new MutationObserver(debouncedCheck)
		//
		resizeObserver.current.observe(container.current);
		mutationObserver.current.observe(container.current, {
			childList: true,
			subtree: true,
		});
	}, []);

	const checkScroll = useCallback(() => {
		if (destroying.current) {
			return;
		}

		if (!container.current) {
			container.current = document.querySelector('#root'); // first
			createObservers();
		}

		if (!container.current) {
			return;
		}

		const scrollLength = container.current?.offsetHeight - window.innerHeight;

		if (scrollLength > addHeight * 2) {
			document.body.classList.add('deep-scroll-size');
			setNeedToShow(true);
		}
		if (scrollLength <= addHeight) {
			document.body.classList.remove('deep-scroll-size');
			setNeedToShow(false);
		}
//		setNeedToShow(document.body.clientHeight - addHeight < container.current?.offsetHeight);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', onResize);

		debouncedCheck();
		// checkScroll(); // immediately

		return () => {
			document.body.classList.remove('deep-scroll-size');
			debouncer.current && clearTimeout(debouncer.current);
			window.removeEventListener('resize', onResize);

			resizeObserver.current && resizeObserver.current.unobserve(container.current);
			mutationObserver.current && mutationObserver.current.disconnect();
		}
	}, []);

	return {needToShowScroll, checkScroll};
}
