import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: {},
    loading:false,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
          SetUsers(state, action) {
            state.users = action.payload
        },
        SetLoading(state, action) {
            state.loading = action.payload
        }
    }
})

export const { SetUsers, SetLoading} = adminSlice.actions

export default adminSlice.reducer