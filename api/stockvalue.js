import http from 'api/http-common'

const stockName = data => {
  return http.post("/api/v1/stockvalue/stock_name/", data);
};

const naverReport = data => {
  return http.get("/api/v1/stockvalue/naver_report/", data);
};

const getResult = data => {
  return http.post("/api/v1/stockvalue/get_result/", data);
};

export default {
    stockName,
    naverReport,
    getResult
};