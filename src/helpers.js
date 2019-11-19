const returnValue = (values) => (values.length === 1 ? values[0] : values);

const exists = (value) => value !== undefined && value !== null;

const isString = (value) => typeof value === 'string';

const isArray = (value) => Array.isArray(value);

export {
  returnValue, exists, isString, isArray,
};
