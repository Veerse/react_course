import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = [
    //{lastName: "ok", firstName: "fn", username:" ab", name:"aze", id:"sd"}
]

export const fetchUsers = createAsyncThunk ('users/fetchUsers', async() => {
    const response = await client.get('fakeApi/users')
    return response.users
})

const UsersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            //state = state.concat(action.payload)
            return action.payload
        }
    }
})

export default UsersSlice.reducer