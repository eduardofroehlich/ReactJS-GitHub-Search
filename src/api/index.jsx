import axios from "axios";
import { notification } from "antd";
const instance = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
});

async function getAllUsers() {
	try {
		const response = await instance.get('/searchAllUsers', {
			params: {
				pagination: 10
			}
		});
		return response.data
	} catch (error) {
		console.error(error);
		notification.error({
            message: 'Sorry, something went wrong.',
            description: error.message,
            duration: 4,
        });
	}
}

async function getUserByName(name) {
	try {
		const response = await instance.get('/searchProfileByName', {
			params: {
				name: name
			}
		});
		return response.data
	} catch (error) {
		console.error(error);
        notification.error({
            message: 'Sorry, something went wrong.',
            description: error.message,
            duration: 4,
        });
	}
}

export const useGitHubApi = {
	getAllUsers,
	getUserByName
};