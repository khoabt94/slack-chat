import { configureStore } from "@reduxjs/toolkit";
import { reducer as app } from "../slice/appSlice";

const rootReducer = {
  app,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
