export const getFieldMap = (fields) => {
  const fieldMap = Object.create(null);
  for (const [key, fc] of Object.entries(fields)) {
    fieldMap[key] = fc.map || key;
  }
  return fieldMap;
};
