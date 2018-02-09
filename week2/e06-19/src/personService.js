import axios from 'axios'

const api = axios.create({
    baseURL: '/api/persons'
})

const extractResult = result => result.data

const getAll = async () => extractResult(await api.get('/'))
const create = async (data) => extractResult(await api.post('/', data))
const update = async (id, data) => extractResult(await api.patch(`/${id}`, data))
const remove = async (id) => extractResult(await api.delete(`/${id}`))

export default { getAll, create, update, remove }