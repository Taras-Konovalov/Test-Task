import { API_URL } from ".";

export const fetchToken = () => {
  return fetch(API_URL.TOKEN).then((res) => res.json());
};

export const fetchPosition = () => {
  return fetch(API_URL.POSITIONS).then((res) => res.json());
};

export const fetchUsers = (link) => {
  return fetch(link).then((res) => res.json());
};
