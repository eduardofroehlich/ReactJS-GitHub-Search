import axios from "axios";
import { notification } from "antd";
const instance = axios.create({
	baseURL: 'https://api-github-challenge.onrender.com',
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
});

async function getAllUsers(usersPerPage, currentPage) {
	try {
		const response = await instance.get('/searchAllUsers');
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

async function getRepositories(name) {
	try {
		const response = await instance.get('/getRepositories', {
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
	getUserByName,
	getRepositories
};