import { configureStore } from '@reduxjs/toolkit';
import user from './user/userSlice'

const store = configureStore({
    reducer: {
        user
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;