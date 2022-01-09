import dispatchTypes from '../constants';
let initialState = {
    feeds: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.isLoading:
            return { ...state };
        case dispatchTypes.storeFeeds:
            return {...state, feeds:action.payload};
        default:
            return state;
    }
}