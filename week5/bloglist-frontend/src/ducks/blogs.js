import axios from "axios";

export default function reducer(
  state = { blogs: [], form: { title: "", author: "", url: "" } },
  action
) {
  switch (action.type) {
    case "GET_BLOGS":
      return {
        ...state,
        blogs: action.payload
      };
    case "GET_BLOG":
      return {
        ...state,
        blogs: state.blogs.map(
          blog => (blog._id === action.payload._id ? action.payload : blog)
        )
      };
    case "CREATE_BLOG":
      return {
        ...state,
        blogs: [...state.blogs, action.payload]
      };
    case "BLOG_INPUT_CHANGE":
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value
        }
      };
    default:
      return state;
  }
}

export function getBlogs() {
  return async dispatch => {
    const blogs = (await axios.get("/api/blogs")).data;
    dispatch({
      type: "GET_BLOGS",
      payload: blogs
    });
  };
}

export function like(blog) {
  return async dispatch => {
    const updatedBlog = (await axios.put(`/api/blogs/${blog._id}`, {
      ...blog,
      user: blog.user._id,
      likes: blog.likes + 1
    })).data;
    dispatch({
      type: "GET_BLOG",
      payload: updatedBlog
    });
  };
}

export function blogFormInputChange(e) {
  return {
    type: "BLOG_INPUT_CHANGE",
    payload: {
      name: e.target.name,
      value: e.target.value
    }
  };
}

export function createBlog(blog) {
  return async (dispatch, getState) => {
    const { token } = getState().sessions.user;
    const addedBlog = (await axios.post("/api/blogs", blog, {
      headers: { Authorization: `Bearer ${token}` }
    })).data;
    dispatch({
      type: "CREATE_BLOG",
      payload: addedBlog
    });
  };
}

export function comment(id, comment) {
  return async dispatch => {
    const updatedBlog = (await axios.post(`/api/blogs/${id}/comments`, {
      comment
    })).data;
    dispatch({
      type: "GET_BLOG",
      payload: updatedBlog
    });
  };
}
