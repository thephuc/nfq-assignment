import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import itemReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import { combineReducers } from 'redux'

export default function configureStore(preloadedState) {
  const history = createBrowserHistory()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      itemStore: itemReducer
    }),
    preloadedState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
      )
    ),
  )
  sagaMiddleware.run(sagas)
  return { store, history }
}
