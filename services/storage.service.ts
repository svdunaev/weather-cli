import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json');

enum TOKEN_DICIONARY  {
	token = 'token',
	city = 'city'
}

const saveKeyValue = async (key: string, value: string): Promise<void> => {
  let data:{[key: string]: string} = {}

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    data = JSON.parse(file.toString())
  }

  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async (key: string) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    const data = JSON.parse(file.toString())

    return data[key]
  }
  return undefined
}

const isExist = async (path: string): Promise<boolean> => {
  try {
    await promises.stat(path)
    return true
  } catch (error) {
    return false
  }
}

export { saveKeyValue, getKeyValue, TOKEN_DICIONARY }
