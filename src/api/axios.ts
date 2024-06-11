import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
