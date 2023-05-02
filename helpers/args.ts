export function getArgs (args: string[]): {[key: string]: boolean | string} {
	const res: {[key: string]: boolean | string} = {};
	const [executer, file, ...rest] = args;

	rest.forEach((value, index, array) => {
		if(value.charAt(0) === '-') {
			if(index === array.length - 1) {
				res[value.substring(1)] = true;
			} else if(array[index + 1].charAt(0) !== '-') {
				res[value.substring(1)] = array[index + 1]
			} else {
				res[value.substring(1)] = true;
			}
		}
	});

	return res;
};
