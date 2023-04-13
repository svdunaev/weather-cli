import { getKeyValue, TOKEN_DICIONARY } from './storage.service.js';
import axios from 'axios';

const getWeather = async (city) => {
	const token = await getKeyValue(TOKEN_DICIONARY.token);
	if(!token) {
		throw new Error('не задан ключ API, задайте его через -t [API_KEY]')
	}
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	})

	return data;
}

export { getWeather };