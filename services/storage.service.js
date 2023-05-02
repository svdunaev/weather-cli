var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
const filePath = join(homedir(), 'weather-data.json');
var TOKEN_DICIONARY;
(function (TOKEN_DICIONARY) {
    TOKEN_DICIONARY["token"] = "token";
    TOKEN_DICIONARY["city"] = "city";
})(TOKEN_DICIONARY || (TOKEN_DICIONARY = {}));
const saveKeyValue = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    if (yield isExist(filePath)) {
        const file = yield promises.readFile(filePath);
        data = JSON.parse(file.toString());
    }
    data[key] = value;
    yield promises.writeFile(filePath, JSON.stringify(data));
});
const getKeyValue = (key) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield isExist(filePath)) {
        const file = yield promises.readFile(filePath);
        const data = JSON.parse(file.toString());
        return data[key];
    }
    return undefined;
});
const isExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises.stat(path);
        return true;
    }
    catch (error) {
        return false;
    }
});
export { saveKeyValue, getKeyValue, TOKEN_DICIONARY };
