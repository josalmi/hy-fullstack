import React from 'react'

const Input = ({ name, onChange, values, ...rest }) => (
    <input name={name} onChange={onChange} value={values[name]} {...rest} />
)

export default Input