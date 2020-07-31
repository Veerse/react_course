import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {id: '1', name: 'Nassim Abdelqader'},
    {id: '2', name: 'Sasuke Uchiwa'},
    {id: '3', name: 'Itachi Uchiwa'},
    {id: '4', name: 'Jiraya'},
    {id: '5', name: 'Rock Lee'},
    {id: '6', name: 'Gai Maito'},
    {id: '7', name: 'Naruto Uzumaki'}
]

const UsersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {

    }
})

export default UsersSlice.reducer