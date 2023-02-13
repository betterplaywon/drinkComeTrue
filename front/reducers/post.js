import produce from 'immer';
import * as AT from '../actionType';

export const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],

  isMorePosts: true,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  imageUploadLoading: false,
  imageUploadDone: false,
  imageUploadError: null,
};

export const addPost = data => ({
  type: AT.ADD_POST_REQUEST,
  data,
});

export const addComment = data => ({
  type: AT.ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AT.ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case AT.ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case AT.ADD_POST_FAILURE:
        draft.addPostLoading = false;
        addPostError = action.error;
        break;
      case AT.LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case AT.LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case AT.LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      case AT.LOAD_USER_POSTS_REQUEST:
      case AT.LOAD_HASTAG_POSTS_REQUEST:
      case AT.LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case AT.LOAD_USER_POSTS_SUCCESS:
      case AT.LOAD_HASTAG_POSTS_SUCCESS:
      case AT.LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.isMorePosts = action.data.length === 10;
        break;
      case AT.LOAD_USER_POSTS_FAILURE:
      case AT.LOAD_HASTAG_POSTS_FAILURE:
      case AT.LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case AT.REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case AT.REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(f => f.id !== action.data.PostId);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case AT.REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case AT.ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case AT.ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(x => x.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case AT.ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      case AT.LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case AT.LIKE_POST_SUCCESS: {
        draft.likePostLoading = false;
        draft.likePostDone = true;
        const post = draft.mainPosts.find(m => m.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        break;
      }
      case AT.LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case AT.UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case AT.UNLIKE_POST_SUCCESS: {
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        const post = draft.mainPosts.find(m => m.id === action.data.PostId);
        post.likers = post.Likers.filter(m => m.id !== action.data.UserId);
        break;
      }
      case AT.UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      case AT.IMAGE_UPLOAD_REQUEST:
        draft.imageUploadLoading = false;
        draft.imageUploadDone = false;
        draft.imageUploadError = null;

        break;
      case AT.IMAGE_UPLOAD_SUCCESS: {
        draft.imageUploadLoading = false;
        draft.imageUploadDone = true;
        draft.imagePaths = action.data;
        break;
      }
      case AT.IMAGE_UPLOAD_FAILURE:
        draft.imageUploadLoading = false;
        draft.imageUploadError = action.error;
        break;

      case AT.IMAGE_REMOVE:
        draft.imagePaths = draft.imagePaths.filter((m, idx) => idx !== action.data);
        break;

      default:
        break;
    }
  });

export default reducer;
