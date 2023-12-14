import {useEffect} from "react";

function subscribe(eventName: string, listener: any) {
	document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: any) {
	document.removeEventListener(eventName, listener);
}

function publish(eventName: string, data: any) {
	const event = new CustomEvent(eventName, {detail: data});
	document.dispatchEvent(event);
}

function useSubscribe(signal: string, processFn: (data?: any) => any) {
	useEffect(() => {
		subscribe(signal, processFn);

		return () => {
			unsubscribe(signal, processFn);
		}
	}, [signal, processFn]);
}

export {publish, subscribe, unsubscribe, useSubscribe};
