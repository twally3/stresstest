export const fetchJson = (...args) => fetch(...args).then(res => res.json());
