const POLLING_LIST = {};

export default function poller({ type, func, time }) {
	clearInterval(POLLING_LIST[type]);
	POLLING_LIST[type] = setInterval(func, time);
}
