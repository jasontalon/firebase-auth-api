const tryGetHttpResponseError = err => {
  const { response: { data: { error = null } = {} } = {} } = err;
  return error;
};

const removeStackProperty = obj =>
  Object.getOwnPropertyNames(obj).reduce((acc, key) => {
    if (key.toLowerCase() !== "stack") {
      acc[key] = obj[key];
      return acc;
    } else return acc;
  }, {});

const cleanErrorResponse = err =>
  tryGetHttpResponseError(err) || removeStackProperty(err);

const sendErrorResponse = (res, err) => res.status(400).send(cleanErrorResponse(err));

module.exports = {
  sendErrorResponse,
  removeStackProperty,
  cleanErrorResponse,
  tryGetHttpResponseError
};
