// Workaround since Radium.merge does not work
export const mergeStyles = styles => {
	return Object.assign({}, ...styles);
};

export const capitalizeTag = word => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const SPACE_KEY = 32;
export const COMMA_KEY = 188;
export const BACKSPACE_KEY = 8;
export const TAG_COLORS = [
	'orange',
	'yellow',
	'olive',
	'green',
	'teal',
	'blue',
	'purple',
	'brown',
	'grey'
];
