import { configureStore } from "@reduxjs/toolkit";
import AuthSlice, { initialState as AuthSliceInitial } from './slices/auth';
import { authMiddleware, rehydrateAuthStore } from './middlewares/auth.middleware';

const store = configureStore({
    reducer: {
        [AuthSlice.name]: AuthSlice.reducer,
    },
    preloadedState: {
        [AuthSlice.name]: {
            ...AuthSliceInitial,
            ...rehydrateAuthStore(),
        },
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: true, serializableCheck: false })
          .concat(authMiddleware);
    },
});

export default store;