import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    event.preventDefault()
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}


