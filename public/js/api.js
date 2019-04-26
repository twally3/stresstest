import { fetchJson } from './helpers.js';

export const getCommentsForPost = async postId =>
	fetchJson(`http://jsonplaceholder.typicode.com/comments?postId=${postId}`);

export const getCommentsForPosts = async postIds =>
	(await Promise.all(postIds.map(id => getCommentsForPost(id)))).reduce(
		(current, next) =>
			current.concat(next.map(({ body }) => body.replace(/\n/g, ' '))),
		[]
	);

export const getPostsForUser = async userId =>
	fetchJson(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

export const getAllUsers = async _ =>
	fetchJson('https://jsonplaceholder.typicode.com/users').then(users =>
		users.reduce(
			(current, { username, id }) =>
				Object.assign(current, { [username.toLowerCase()]: { id } }),
			{}
		)
	);
