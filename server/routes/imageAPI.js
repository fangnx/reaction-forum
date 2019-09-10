/**
 * imageAPI.js
 * @author fangnx
 * @description
 * @created 2019-06-23T00:53:48.481Z-04:00
 * @copyright
 * @last-modified 2019-06-23T17:33:57.177Z-04:00
 */

import express from 'express';
import Image from '../models/AvatarImage';

const router = express.Router();

router.route('/uploadavatar').post((req, res, next) => {
	const newImage = new Image({
		name: req.body.name,
		imageData: req.body.imageData
	});
	newImage
		.save()
		.then(value => res.status(200).json({ success: true, document: value }))
		.catch(err => next(err));
});

// Deprecated Multer implementation

// // Specify path to the destination folder & file name
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) =>
// 		cb(null, __dirname.replace('/api', '') + '/avatars/'),
// 	filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
// });

// // Filter file types that will be accepted by the server
// const fileFilter = (req, file, cb) => {
// 	if (
// 		file.mimetype === 'image/jpeg' ||
// 		file.mimetype === 'image/jpg' ||
// 		file.mimetype === 'image/png'
// 	) {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// };

// const upload = multer({
// 	storage,
// 	limits: {
// 		fileSize: 1024 * 1024 * 5
// 	},
// 	fileFilter
// });

// router
// 	.route('/uploadavatar')
// 	.post(upload.single('imageData'), (req, res, next) => {
// 		const newImage = new Image({
// 			name: req.body.name,
// 			imageData: req.file.path
// 		});

// 		newImage
// 			.save()
// 			.then(value => {
// 				console.log(value);
// 				res.status(200).json({
// 					success: true,
// 					document: value
// 				});
// 			})
// 			.catch(err => next(err));
// 	});

export { router as images };
