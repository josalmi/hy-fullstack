import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/persons'
})

const extractResult = result => result.data

const getAll = async () => extractResult(await api.get('/'))
const create = async (data) => extractResult(await api.post('/', data))

export default { getAll, create }