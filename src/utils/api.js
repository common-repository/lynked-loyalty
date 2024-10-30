import axios from 'axios';

class ApiError extends Error {
  response = null;

  constructor(error) {
    super(error);
    this.response = error.response;
  }
}

export class ApiClient {
  constructor() {
  }

  async post(path, data) {
    const headers = {
      'Content-Type': 'application/json'
    };

    return await axios
      .post(path, data, {
        headers: headers
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new ApiError(error);
      });
  }

  async get(path, nonce = {}) {
    return await axios
      .get(path, {
        headers: {
          'Content-Type': 'application/json',
          ...nonce
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new ApiError(error);
      });
  }
}
