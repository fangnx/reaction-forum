// Workaround since Radium.merge does not work
export const mergeStyles = styles => {
	console.log(styles);
	return Object.assign({}, ...styles);
};

export const capitalizeTag = word => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};
