import http from 'api/http-common'

const getCorp = data => {
  return http.get("/api/v1/finstate/corp", data);
};

export default {
    getCorp,
};