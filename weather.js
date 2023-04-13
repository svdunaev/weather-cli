#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
	if(!token.length) {
		printError('Token required')
		return
	}
  try {
    await saveKeyValue(TOKEN_DICIONARY.token, token)
    printSuccess('Token saved')
  } catch (error) {
    printError(error.message)
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
  }
  if (args.s) {
    // save city
  }
  if (args.t) {
    // save token
    return saveToken(args.t)
  }

  // return weather report
	getWeather('moscow')
}

initCLI()
