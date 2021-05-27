import {
  FETCH_JOBS,
  RECEIVED_JOBS_SUCCESS
} from '../actions/jobs';

const initialState = {
  jobs: [],
  isLoaded: true,
  error: false,
  message: null
}

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return Object.assign({}, state, {
        isLoaded: false
      });
    case RECEIVED_JOBS_SUCCESS:
      return Object.assign({}, state, {
        isLoaded: true,
        jobs: action.payload.jobs
      });
    default:
      return state
  }
}

export default jobsReducer;
