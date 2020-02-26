import { all, fork } from 'redux-saga/effects'
import saga from './saga';

export default function* root() {
	yield all([
		fork(saga)
	])
}
