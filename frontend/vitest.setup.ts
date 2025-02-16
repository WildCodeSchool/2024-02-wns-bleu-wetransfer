global.window = global.window || {};
window.matchMedia = window.matchMedia || (() => {
	return {
		matches: false,
		addListener: () => {
		},
		removeListener: () => {
		}
	};
});