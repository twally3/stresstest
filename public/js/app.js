import PostsList from './PostsList.js';
import WordsTable from './WordsTable.js';
import WordsHistogram from './WordsHistogram.js';
import { getPostsForUser, getCommentsForPosts, getAllUsers } from './api.js';

const userSelect = document.getElementById('user-select');
const userInput = document.getElementById('user-input');

// Store this promise so that it can easily be resolved later
// If the data on the server was to change then the page would need to be refreshed
// But it doesn't so I am stashing it to make development faster.
let users = getAllUsers();

// Classes to manage the three main components
const postsList = new PostsList(document.getElementById('posts-container'));
const wordsTable = new WordsTable(document.getElementById('table-container'));
const wordsHistogram = new WordsHistogram(
	document.querySelector('.histogram-container')
);

// No point in making another API call if the username hasn't changed
// This is only the case because the dataset doesnt change
// A proper cacheing mechanism could use a timeout to clear the lastUser var
let lastUser;
async function updatePosts() {
	const userName = userInput.value.toLowerCase();
	if (lastUser === userName) return;
	lastUser = userName;

	postsList.clear();
	wordsTable.clear();
	wordsHistogram.clear();

	const user = (await users)[userName];
	if (!user) return;

	const posts = await getPostsForUser(user.id);
	postsList.updateBody(posts);

	const comments = await getCommentsForPosts(posts.map(({ id }) => id));

	// Create a lookup table key: word -> value: count
	const wordCounts = comments
		.reduce((current, next) => current.concat(next.split(' ')), [])
		.reduce(
			(current, next) =>
				Object.assign(current, {
					[next]: current[next] ? current[next] + 1 : 1
				}),
			{}
		);

	// TODO: Realistically this process could be made more efficient as Object,entries is SLOW
	const sortedWords = Object.entries(wordCounts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 10);
	const totalWordCount = Object.values(wordCounts).reduce(
		(current, next) => current + next,
		0
	);

	wordsTable.updateBody(sortedWords, totalWordCount);
	wordsHistogram.updateBody(sortedWords);
}

userSelect.addEventListener('click', updatePosts);
userInput.addEventListener('keydown', async ({ keyCode }) => {
	if (keyCode === 13) await updatePosts();
});
