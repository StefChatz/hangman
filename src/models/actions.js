import { STORE_WORD } from './actionTypes';


function storeWord(payload) {
	return {
		type: STORE_WORD,
		payload
	}
}

export { storeWord };

