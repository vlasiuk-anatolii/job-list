import { legacy_createStore as createStore } from 'redux'
import { RootState } from '../react-app-env'
import { SetAllJobs, ActionType } from '../store/action'

const initialState: RootState = {
  allJobs: []
}

const rootReducer = (state = initialState, action: SetAllJobs): any => {
  switch (action.type) {
    case ActionType.SET_ALL_JOBS:
      return {
        ...state,
        allJobs: action.payload
      }

    default:
      return state
  }
}

export const store = createStore(
  rootReducer
)

export default store
