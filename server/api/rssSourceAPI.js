/**
 * rssSourceAPI.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-04 20:00:48
 * @last-modified 2019-07-04 21:30:31
 */

import express from 'express';
import Source from '../models/Source';

const router = express.Router();

router.post('/subscribe', (req, res) => {
	Source.findOne({ sourceUrl: req.body.sourceUrl }).then(source => {
		if (source) {
			return res
				.status(400)
				.json({ sourceUrl: 'Source URL already subscribed :(' });
		} else {
			const newSource = new Source({
				name: req.body.name,
				sourceUrl: req.body.sourceUrl,
				description: req.body.description,
				category: req.body.category,
				// avatar: '',
				active: true
			});
			newSource
				.save()
				.then(source => res.json(source))
				.catch(err => console.log(err));
		}
	});
});

export { router as sources };
