import { useState } from 'react'


export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  const inputProps = {
    name,
    value,
    onChange
  }

  return {
    inputProps,
    reset
  }
}

// modules can have several named exports

// export const useAnotherHook = () => {
// }