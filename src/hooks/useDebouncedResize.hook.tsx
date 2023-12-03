import {useCallback, useEffect, useRef, useState} from "react";

export const useDebouncedResizeHook = () => {

	const [display, setDisplay] = useState(true);
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
		setDisplay(false);
		debouncedCheck();
	}, []);

	const debouncedCheck = useCallback(() => {
		debouncer.current && clearTimeout(debouncer.current);

		debouncer.current = setTimeout(() => {
			finalizeResize();
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

	const finalizeResize = useCallback(() => {
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
		setDisplay(true);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', onResize);

		finalizeResize(); // immediately

		return () => {
			debouncer.current && clearTimeout(debouncer.current);
			window.removeEventListener('resize', onResize);

			resizeObserver.current && resizeObserver.current.unobserve(container.current);
			mutationObserver.current && mutationObserver.current.disconnect();
		}
	}, []);

	return {display};
}
