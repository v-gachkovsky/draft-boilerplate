export const addPrefix = (prefix, name) => `${prefix}/${name}`;

export const selectNamespace = state => namespace => state.get(namespace);

export const createAction = type => (payload, error) => ({
  type,
  payload,
  error
});
