import { Job, RootState } from '../react-app-env'

export const getAllJobsSelector = (state: RootState): Job[] => state.allJobs
