import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface UserState {
    loading: boolean;
    users: Array<User>;
    error: string | undefined;
}

const initialState: UserState = {
    loading: false,
    users: [],
    error: undefined,
}

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    () => {
        const res = fetch('/api/user').then(data => data.json());
        return res;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Array<User>>) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });
    },
    reducers: {}
})

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;