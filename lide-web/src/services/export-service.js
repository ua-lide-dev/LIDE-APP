import axios from "../configs/axios-config";

function exporter() {
    return axios({
      url: '/export',
      method: 'GET',
      responseType: 'blob',
    })
  }

  export default {
    exporter,
};
