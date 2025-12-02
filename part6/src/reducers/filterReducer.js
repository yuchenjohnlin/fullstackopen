// basically we have to add a reducer that does some action according to the action but now we want to change the state of the filter
export const inputFilter = filter => {
    return {
        type: 'INPUT_FILTER',
        payload: {filter}
    }
}

const filterReducer = (state = '', action) => {
    // why does the reducer have to return something
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'INPUT_FILTER':
            return action.payload.filter
        default:
            return state
    }
}

export default filterReducer
