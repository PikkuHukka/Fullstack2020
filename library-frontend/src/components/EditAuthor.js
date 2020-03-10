

import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select';

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'


const EditAuthor = (props) => {
  const [born, setBorn] = useState('')
  const [select, setSelect] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const result = useQuery(ALL_AUTHORS)


  const handleSelect = (selectedOption) => {
    setSelect(selectedOption.value)
  }



  if (!props.show) {
    return null
  }
  if (result.loading || result.loading) {
    return <div>loading...</div>
  }

  const options = result.data.allAuthors.map(a => Object({ value: a.name, label: a.name }))

  const submit = async (event) => {
    event.preventDefault()


    var bornToAsNumber = Number(born)
    var name = select

    editAuthor({
      variables: { name, bornToAsNumber }
    })

    setBorn('')
  }


  return (
    <div>
      <Select
        value={select.label}
        onChange={handleSelect}
        options={options}
      />

      <form onSubmit={submit}>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>edit author</button>
      </form>
    </div>
  )




}


export default EditAuthor