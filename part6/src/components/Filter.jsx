import { useDispatch, useSelector } from 'react-redux'
import {inputFilter} from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    // what do we want it to happen when user changes the filter ? 
    // we want the list to be filtered by the input
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        // dispatch(inputFilter(event.target.filter.value)) // because this is not the form like in the anecdote list, the form would have a input as chid with the name attribute
        dispatch(inputFilter(event.target.value))        
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input name="filter" onChange={handleChange}/>
        </div>
    )
}

export default Filter