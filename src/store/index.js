import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import { 
  FLUSH, PAUSE, PERSIST, PURGE, REGISTER, 
  REHYDRATE, persistReducer, persistStore 
} from 'redux-persist';

const rootReducer = combineReducers({
  user: userReducer
})

const persistConfig = { /* 리덕스store안에 있는 데이터를 로컬스토리지나 세션스토리지 어디에 저장을 할건지 */
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})


export const persistor = persistStore(store);