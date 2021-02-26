import axios from "@utils/http.js";

export const getList = params => axios.get('v1/list', params)
