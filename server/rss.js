/**
 * rss.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-03 17:22:30
 * @last-modified 2019-07-03 18:41:24
 */

import axios from 'axios';
import Post from './models/Post';

const rssToJson = ' https://api.rss2json.com/v1/api.json?rss_url=';

/**
 * Get from the RSS source in JSON format and create a list of post fields.
 * @param {String} url
 * @param {String} sourceName
 * @param {Array} tags
 * @param {Number} numOfItem
 */
const parseRssSource = (url, sourceName, tags, numOfItems) => {
	return axios.get(rssToJson + url).then(res => {
		if (res.data.items) {
			const postFieldsArr = [];
			const rawItems = res.data.items.slice(0, numOfItems);

			rawItems.forEach(item => {
				const postFields = {
					title: item.title,
					content: item.description,
					author: sourceName,
					authorEmail: 'no@email.com',
					timeStamp: item.pubDate,
					tags: tags,
					viewCount: 0,
					likeCount: 0
				};
				postFieldsArr.push(postFields);
			});
			// console.log(postFieldsArr);
			return postFieldsArr;
		}
	});
};

/**
 * Add a list of posts to the datebase.
 * @param {Array} posts - list of post fields.
 */
const submitPosts = posts => {
	posts.forEach(postFields => {
		const newPost = new Post(postFields);
		newPost
			.save()
			.then(value => console.log('Success!'))
			.catch(err => console.log(err));
	});
};

/**
 *
 * @param {String} url
 * @param {String} sourceName
 * @param {Array} tags
 * @param {Number} numOfItem
 */
const postFromRssSource = async (url, sourceName, tags, numOfItems) => {
	const posts = await parseRssSource(url, sourceName, tags, numOfItems);
	console.log(posts);
	submitPosts(posts);
};

export { postFromRssSource };
