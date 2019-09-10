/**
 * animations.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-09 22:30:53
 * @last-modified 2019-07-09 22:35:06
 */

import Radium from 'radium';
import { fadeIn } from 'react-animations';

export const AnimationStyles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	}
};
