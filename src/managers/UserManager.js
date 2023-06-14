export const getUsers = () => {
  return fetch("http://localhost:8000/users", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getMixologists = () => {
  return fetch("http://localhost:8000/mixologists", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getMixologist = (userId) => {
  return fetch(`http://localhost:8000/mixologists/${userId}`, {
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

export const unsubscribeToMixologist = (mixologistId) => {
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
