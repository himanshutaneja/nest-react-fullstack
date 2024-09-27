import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

export interface UserState {
    loading: boolean;
    users: Array<User>;
    error: string | undefined;
}

interface DeleteUserState {
    message: string;
    user: User;
}

const initialState: UserState = {
    loading: false,
    users: [],
    error: undefined,
}

export const fetchUsers = createAsyncThunk<User[]>(
    "users/fetchUsers",
    async () => {
        const res = await fetch('/api/user');
        return res.json();
    }
)

export const deleteUser = createAsyncThunk<DeleteUserState, string>(
    "users/deleteUser",
    async (userID, { dispatch }) => {
        const res = await fetch(`/api/user?userID=${userID}`, {
            method: "DELETE",
        });
        // dispatch(fetchUsers());
        return res.json();
    }
);

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
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<DeleteUserState>) => {
            state.loading = false;
            const deletedUserId = action.payload.user._id;
            state.users = state.users.filter(({_id}) => _id !== deletedUserId);
        })
    },
    reducers: {}
})

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;