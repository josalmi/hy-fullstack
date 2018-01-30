import React from 'react'
import Input from './Input'

const PersonForm = ({ onSubmit, onChange, values }) => (
    <form onSubmit={onSubmit}>
        <h2>Lisää uusi</h2>
        <div>
            nimi: <Input name="newName" onChange={onChange} values={values} />
        </div>
        <div>
            numero: <Input name="newNumber" onChange={onChange} values={values} />
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
)

export default PersonForm