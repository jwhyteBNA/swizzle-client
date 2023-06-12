export const getUsers = () => {
  return fetch("http://localhost:8000/user", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getMixologist = (userId) => {
  return fetch(`http://localhost:8000/mixologists/${userId}/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((response) => response.json());
};

export const subscribeToMixologist = (mixologistId) => {
  return fetch(`http://localhost:8000/mixologists/${mixologistId}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(mixologistId),
  }).then((res) => res.json());
};

export const unsubscribeToUser = (mixologistId) => {
  return fetch(
    `http://localhost:8000/mixologists/${mixologistId}/unsubscribe`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(mixologistId),
    }
  ).then((res) => res.json());
};

export const resubscribeToUser = (mixologistId) => {
  return fetch(`http://localhost:8000/mixologists/${mixologistId}/subscribe`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(mixologistId),
  }).then((res) => res.json());
};
