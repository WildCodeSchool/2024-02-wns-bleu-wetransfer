import axios, {AxiosInstance} from "axios";

const api: AxiosInstance = axios.create({
	baseURL: 'http://localhost:7002/backend',
	withCredentials: true,
})

export default api