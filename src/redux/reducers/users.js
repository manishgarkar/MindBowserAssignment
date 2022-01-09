import dispatchTypes from '../constants';
let initialState = {
    userId: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.storeUserDetails:
            return {...state, userId:action.payload};
        default:
            return state;
    }
}