import http from 'api/http-common'

const getCorps = () => {
  return http.get("api/v1/finstate/get_corps/");
};

const stockName = data => {
  return http.post("/analyzeme/", data);
};

export default {
    getCorps,
    stockName
};