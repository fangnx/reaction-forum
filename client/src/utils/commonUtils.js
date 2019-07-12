/**
 * Workaround since Radium.merge does not work
 */
export const mergeStyles = styles => {
	return Object.assign({}, ...styles);
};

export const capitalizeTag = word => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const mapStringToArbitraryNumber = (str, maxNumber) => {
	return str
		? (str.charCodeAt(0) + str.charCodeAt(str.length - 1)) % maxNumber
		: 0;
};

export const SPACE_KEY = 32;
export const COMMA_KEY = 188;
export const BACKSPACE_KEY = 8;

export const SHADES_OF_GREEN = [
	'rgba(72, 133, 164, 0.5)',
	'rgba(51, 132, 157, 0.5)',
	'rgba(30, 131, 148, 0.5)',
	'rgba(6, 129, 137, 0.5)',
	'rgba(0, 127, 124, 0.5)',
	'rgba(8, 129, 121, 0.5)',
	'rgba(19, 132, 118, 0.5)',
	'rgba(29, 134, 115, 0.5)'
];

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

export const TAG_COLORS_SOFT = ['olive', 'green', 'teal', 'blue', 'purple'];

/**
 * Compare two timestamps: the latest time goes first.
 */
export const compareTimestamp = (a, b) => {
	if (a > b) {
		return -1;
	}
	return 1;
};
