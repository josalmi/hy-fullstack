import React from 'react'
import Input from './Input'

const Filter = ({ name, onChange, values }) => (
    <div>
        rajaa näytettäviä <Input name={name} onChange={onChange} values={values} type="search" />
    </div>
)

export default Filter