export const addPrefix = (prefix, name) => `${prefix}/${name}`;

export const createAction = type => (payload, error) => ({
  type,
  payload,
  error
});
