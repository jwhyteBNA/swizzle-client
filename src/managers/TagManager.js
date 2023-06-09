export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    }).then((response) => response.json());
  };
  
  export const createTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(tag),
    });
  };
  
  export const updateTag = (id, tag) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(tag),
    });
  };
  
  export const deleteTag = (id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
  };
  