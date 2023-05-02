import chalk from 'chalk';
import dedent from 'dedent-js';

interface WeatherData {
	id: string,
	main: string,
	description: string,
	icon: string
}

interface Result {
	name: string,
	weather: WeatherData[],
	main: {
		temp: string,
		humidity: string,
		feels_like: string
	},
	wind: {
		speed: string
	}
}

const printError = (error: string) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error)
};

const printSuccess = (msg: string) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg)
};

const printHelp = () => {
	console.log(
		dedent`
		${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
	);
}

const printWeather = (res: Result, icon: string) => {
	console.log(
		dedent`
		${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
	);
}

export {printError, printSuccess, printHelp, printWeather}