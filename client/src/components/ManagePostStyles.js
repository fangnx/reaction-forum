/**
 * ManagePostStyles.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-22 21:15:17
 * @last-modified 2019-09-09 23:41:02
 */

export const ManagePostStyles = {
	wrapper: {
		width: '100%',
		margin: '0 auto'
	},
	card: {
		background: 'var(--theme-white-t)'
	},
	cardContent: {
		width: '97.5%',
		margin: '0 auto'
	},
	field: {
		marginTop: '15px',
		width: '100%',
		background: 'var(--theme-white)',
		border: '1px solid #ddd',
		boxShadow: 'none'
	},
	label: {
		background: 'var(--theme-navy)',
		color: 'var(--theme-white)'
	},
	title: {
		fontSize: '1.5em',
		fontWeight: '600',
		background: 'var(--theme-white-1)'
	},
	content: {
		fontSize: '1em',
		minHeight: '236px', // Set equal to 12 rows in TextArea.
		background: 'var(--theme-white-1)'
	},
	tags: {
		background: 'var(--theme-white-1)'
	},
	tagInput: {},
	subforum: {},
	message: {},
	button: {},
	iconGroup: {
		background: 'transparent',
		padding: 'none',
		float: 'right'
	},
	icon: { margin: '0' },
	errorMessage: {
		display: 'block',
		marginTop1: '2%',
		fontFamily: 'monospace',
		fontSize: '0.9em',
		fontStyle: 'normal',
		color: 'red'
	}
};
