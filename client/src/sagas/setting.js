import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchStoreSettingsSuccess,
  fetchStoreSettingsFailed,
  authFailed,
} from '../actions';
import config from '../config';

export function* fetchStoreSettings(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/asdfasdfasdfasd`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchStoreSettingsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(authFailed());
    } else {
      yield put(fetchStoreSettingsFailed());
    }
  }
}
