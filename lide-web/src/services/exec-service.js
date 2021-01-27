import axios from "../configs/axios-config";

function killExecution() {
    return axios.post(`/killexec`)
}

export default {
    killExecution,
};
