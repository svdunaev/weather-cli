#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue } from './services/storage.service.js'

const saveToken = async (token) => {
	if(!token.length) {
		printError('Token required')
		return
	}
  try {
    await saveKeyValue('token', token)
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
}

initCLI()
