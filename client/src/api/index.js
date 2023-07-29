const baseURL = `http://localhost:5000`;

// Monkey patching with Fetch

const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
  let [resource, options] = args;

  if (localStorage.getItem("profile")) {
    options.headers["authorization"] = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  const response = await originalFetch(resource, options);
  return response;
};

export const fetchPost = async (id) => {
  
  const options = {
    method: "GET",
    headers: {}
  };

  const response = await fetch(`${baseURL}/posts/${id}`, options);
  const data = await response.json();
  return data;
};

export const fetchPosts = async (page) => {
  const options = {
    method: "GET",
    headers: {}
  };

  const response = await fetch(`${baseURL}/posts?page=${page}`, options);
  const data = await response.json();
  return data;
};

export const fetchPostsBySearch = async (searchQuery) => {
  
  const options = {
    method: "GET",
    headers: {}
  };
  
  const response = await fetch(`${baseURL}/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`, options);
  const data = await response.json();
  return data;
}

export const fetchPostsByCreator = async (name) => {
  const options = {
    method: "GET",
    headers: {}
  };

  const response = await fetch(`${baseURL}/posts/creator?name=${name}`, options);
  const data = await response.json();
  return data;
}

export const createPost = async (newPost) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  };

  const response = await fetch(`${baseURL}/posts`, options);
  const data = await response.json();
  return data;
};

export const updatePost = async (id, postData) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  const response = await fetch(`${baseURL}/posts/${id}`, options);
  const data = await response.json();
  return data;
};

export const deletePost = async (id) => {
  const response = await fetch(`${baseURL}/posts/${id}`, {
    method: "DELETE",
    headers: {}
  });

  const data = await response.json();
  return data;
};

export const likePost = async (id) => {
  const response = await fetch(`${baseURL}/posts/${id}/likePost`, {
    method: "PATCH",
    headers: {}
  });

  const data = await response.json();
  return data;
};

export const commentPost = async (value, id) => {
  const response = await fetch(`${baseURL}/posts/${id}/commentPost`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({value}),
  });

  const data = await response.json();
  return data;
};

export const login = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${baseURL}/user/login`, options);
  const data = await response.json();
  return data;
};

export const signup = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${baseURL}/user/signup`, options);
  const data = await response.json();
  return data;
};
