import dispatchType from '../constants';

export const storeFeeds = (data) => dispatch => dispatch({type:dispatchType.storeFeeds,payload:data})