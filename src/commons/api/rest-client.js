function performRequest(request, callback) {
  fetch(request)
    .then(function (response) {
      if (response.ok) {
        response.json().then((json) => callback(json, response.status, null));
      } else {
        response.json().then((err) => callback(null, response.status, err));
      }
    })
    .catch(function (err) {
      callback(null, 1, err);
    });
}

module.exports = {
  performRequest,
};
