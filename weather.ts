#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICIONARY,
} from "./services/storage.service.js";
import { AxiosError } from 'axios';

const saveToken = async (token: string | boolean) => {
  if (typeof token === "string") {
    if (!token.length) {
      printError("Token required");
      return;
    }
    try {
      await saveKeyValue(TOKEN_DICIONARY.token, token);
      printSuccess("Token saved");
    } catch (error: unknown) {
      printError(`Ошибка: ${error}`);
    }
  } else {
    throw new Error("token is Missing");
  }
};

const saveCity = async (city: string | boolean) => {
  if (typeof city === "string") {
    if (!city.length) {
      printError("City required");
      return;
    }

    try {
      await saveKeyValue(TOKEN_DICIONARY.city, city);
      printSuccess("City saved");
    } catch (error) {
      printError(`Ошибка: ${error}`);
    }
  } else {
    throw new Error("city is missing");
  }
};

const getForecast = async () => {
  const city = await getKeyValue(TOKEN_DICIONARY.city);
  try {
    const weather = await getWeather(city);

    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
		const err = error as AxiosError;
    if (err?.response?.status == 404) {
      printError("Неверно указан город");
    } else if (err?.response?.status == 401) {
      printError("Неверно указан токен");
    } else {
      printError(err.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    // save city
    return saveCity(args.s);
  }
  if (args.t) {
    // save token
    return saveToken(args.t);
  }

  return getForecast();
};

initCLI();
