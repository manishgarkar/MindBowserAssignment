import dispatchType from '../constants';

export const storeUserDetails = (data) => dispatch => dispatch({type:dispatchType.storeUserDetails,payload:data})