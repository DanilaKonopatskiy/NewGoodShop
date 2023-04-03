import { configureStore } from "@reduxjs/toolkit";
import AuthSlice, { initialState as AuthSliceInitial } from './slices/auth';
import CartSlice, { initialState as CartSliceInitial } from './slices/cart';
import { authMiddleware, rehydrateAuthStore } from './middlewares/auth.middleware';
import { cartMiddleware, rehydrateCartStore } from "./middlewares/cart.middleware";

const store = configureStore({
    reducer: {
        [AuthSlice.name]: AuthSlice.reducer,
        [CartSlice.name]: CartSlice.reducer,
    },
    preloadedState: {
        [AuthSlice.name]: {
            ...AuthSliceInitial,
            ...rehydrateAuthStore(),
        },
        [CartSlice.name]: {
          ...CartSliceInitial,
          ...rehydrateCartStore(),
        },
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: true, serializableCheck: false })
          .concat(authMiddleware, cartMiddleware);
    },
});

export const authActions = AuthSlice.actions;
export const cartActions = CartSlice.actions;

export default store;