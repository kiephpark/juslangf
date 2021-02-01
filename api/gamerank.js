import http from 'api/http-common'

const gevolution = data => {
  return http.post("/gevolution/", data);
};

export default {
  gevolution,
};