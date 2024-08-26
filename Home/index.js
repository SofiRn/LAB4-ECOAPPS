async function createPost() {
	const title = document.getElementById('title').value.trim();
	const description = document.getElementById('description').value.trim();
	const imageUrl = document.getElementById('image-url').value.trim();
	const username = localStorage.getItem('username'); // Get the logged-in username from local storage

	const post = { username, title, description, imageUrl };

	try {
		const response = await fetch('http://localhost:5050/home', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(post),
		});

		if (response.ok) {
			alert('Post created successfully!');
			fetchPosts(); // Refresh posts after creation
		}
	} catch (error) {
		console.error(error);
	}
}

async function fetchPosts() {
	try {
		const response = await fetch('http://localhost:5050/home');
		if (response.ok) {
			const posts = await response.json();
			renderPosts(posts);
		}
	} catch (error) {
		console.error(error);
	}
}

function renderPosts(posts) {
	const container = document.getElementById('posts-container');
	container.innerHTML = '';

	posts.forEach((post) => {
		const div = document.createElement('div');
		div.className = 'post';
		div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}">` : ''}
          <small>Posted by ${post.username}</small>
      `;
		container.appendChild(div);
	});
}

window.onload = fetchPosts;

