import Radium from 'radium';
import { fadeIn, headShake } from 'react-animations';

export const PostBoardStyles = {
	fadeIn: {
		animation: '1 1s',
		animationName: Radium.keyframes(fadeIn)
	},

	postViewAnimated: {
		animation: '1 1s',
		animationName: Radium.keyframes(headShake)
	},

	postBoardSeparator: {
		visibility: 'hidden',
		height: '30px'
	},

	toolbar: {
		width: '100%'
		// background: 'transparent',
		// border: 'none'
	}
};
