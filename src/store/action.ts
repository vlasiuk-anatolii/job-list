import { Job } from '../react-app-env'

export enum ActionType {
  SET_ALL_JOBS = 'SET_ALL_JOBS',
}

export interface SetAllJobs {
  type: ActionType.SET_ALL_JOBS
  payload: Job[]
}

export const setAllJobs = (payload: Job[]): SetAllJobs => ({
  type: ActionType.SET_ALL_JOBS,
  payload
})
