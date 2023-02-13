import produce from 'immer';
import * as AT from '../actionType';

export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  signupLoading: false,
  signupDone: false,
  signupError: null,

  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

  loadAnotherUserInfoLoading: false,
  loadAnotherUserInfoDone: false,
  loadAnotherUserInfoError: null,

  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,

  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,

  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,

  user: null,
  anotherUser: null,
  signupData: {},
  loginData: {},
};

export const loginRequestAction = data => ({
  type: AT.LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: AT.LOG_OUT_REQUEST,
});

export const signupRequestAction = data => ({
  type: AT.SIGN_UP_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // ------------------- login / logout -------------------
      case AT.LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case AT.LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.user = action.data;
        break;
      case AT.LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case AT.LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case AT.LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.user = null;
        break;
      case AT.LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = true;
        break;
      // ------------------- signup -------------------
      case AT.SIGN_UP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;
      case AT.SIGN_UP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      case AT.SIGN_UP_FAILURE:
        draft.signupLoading = false;
        draft.signupError = true;
        break;
      case AT.ADD_POST_TO_ME:
        draft.user.Posts.unshift({ id: action.data });
        break;
      case AT.REMOVE_POST_OF_ME:
        draft.user.Posts = draft.user.Posts.filter(f => f.id !== action.data);
        break;

      //  ------------------- FOLLOW REDUCER -------------------

      case AT.FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case AT.FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.user.Followings.push({ id: action.data.UserId });
        break;
      case AT.FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      case AT.UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case AT.UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.user.Followings = draft.user.Followings.filter(m => m.id !== action.data.UserId);
        break;
      case AT.UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      case AT.LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = false;
        draft.loadFollowersError = null;
        break;
      case AT.LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        draft.user.Followers = action.data;
        break;
      case AT.LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;

      case AT.LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsDone = false;
        draft.loadFollowingsError = null;
        break;
      case AT.LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        draft.user.Followings = action.data;
        break;
      case AT.LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;

      case AT.REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerDone = false;
        draft.removeFollowerError = null;

        break;
      case AT.REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        draft.user.Followers = draft.user.Followers.filter(m => m.id !== action.data.UserId);
        break;
      case AT.REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error;
        break;

      // ------------------- User info -------------------
      case AT.LOAD_MY_INFO_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      case AT.LOAD_MY_INFO_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.user = action.data;
        break;
      case AT.LOAD_MY_INFO_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;

      case AT.LOAD_ANOTHER_USER_INFO_REQUEST:
        draft.loadAnotherUserInfoLoading = true;
        draft.loadAnotherUserInfoDone = false;
        draft.loadAnotherUserInfoError = null;
        break;
      case AT.LOAD_ANOTHER_USER_INFO_SUCCESS:
        draft.loadAnotherUserInfoLoading = false;
        draft.loadAnotherUserInfoDone = true;
        draft.anotherUser = action.data;
        break;
      case AT.LOAD_ANOTHER_USER_INFO_FAILURE:
        draft.loadAnotherUserInfoLoading = false;
        draft.loadAnotherUserInfoError = action.error;
        break;

      // ------------------- change nickname -------------------
      case AT.CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case AT.CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.user.nickname = action.data.nickname;
        break;
      case AT.CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
