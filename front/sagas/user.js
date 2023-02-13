import { put, all, fork, takeLatest, delay, call } from 'redux-saga/effects';
import * as AT from '../actionType';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: AT.LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: AT.LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: AT.LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: AT.LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function signupAPI(data) {
  return axios.post('/user', data);
}

function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log(result);
    yield put({
      type: AT.SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: AT.SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: AT.FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: AT.FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: AT.UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: AT.UNFOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function loadFollowersAPI(data) {
  return axios.get(`/user/followers`, data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: AT.LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: AT.LOAD_FOLLOWERS_FAILURE,
    });
  }
}

function loadFollowingsAPI(data) {
  return axios.get(`/user/followings`, data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: AT.LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: AT.LOAD_FOLLOWINGS_FAILURE,
    });
  }
}

function loadUserAPI() {
  return axios.get('/user');
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: AT.LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: AT.LOAD_MY_INFO_FAILURE,
      error: error.response.data,
    });
  }
}

function loadAnotherUSerInfoAPI(data) {
  return axios.get(`/user/${data}`);
}

function* loadAnotherUserInfo(action) {
  try {
    const result = yield call(loadAnotherUSerInfoAPI, action.data);
    yield put({
      type: AT.LOAD_ANOTHER_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: AT.LOAD_ANOTHER_USER_INFO_FAILURE,
      error: error.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: AT.CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: AT.CHANGE_NICKNAME_FAILURE,
      error: error.response.data,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollowers(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: AT.REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: AT.REMOVE_FOLLOWER_FAILURE,
    });
  }
}

function* watchLogin() {
  yield takeLatest(AT.LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(AT.LOG_OUT_REQUEST, logout);
}

function* watchSignup() {
  yield takeLatest(AT.SIGN_UP_REQUEST, signup);
}

function* watchFollow() {
  yield takeLatest(AT.FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(AT.UNFOLLOW_REQUEST, unfollow);
}

function* watchLoadUser() {
  yield takeLatest(AT.LOAD_MY_INFO_REQUEST, loadUser);
}

function* watchLoadAnotherUserInfo() {
  yield takeLatest(AT.LOAD_ANOTHER_USER_INFO_REQUEST, loadAnotherUserInfo);
}

function* watchChangeNickname() {
  yield takeLatest(AT.CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowers() {
  yield takeLatest(AT.LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(AT.LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollowers() {
  yield takeLatest(AT.REMOVE_FOLLOWER_REQUEST, removeFollowers);
}
1;

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadUser),
    fork(watchLoadAnotherUserInfo),
    fork(watchChangeNickname),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollowers),
  ]);
}
