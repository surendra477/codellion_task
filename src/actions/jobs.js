import firebase from '../firebase';

export const FETCH_JOBS = 'FETCH_JOBS';
const requestedJobs = () => {
  return {
    type: FETCH_JOBS
  };
}

export const RECEIVED_JOBS_SUCCESS = 'RECEIVED_JOBS_SUCCESS';
const receivedJobsSuccess = (payload) => {
  return {
    type: RECEIVED_JOBS_SUCCESS,
    payload
  };
}

export const RECEIVED_JOBS_FAIL = 'RECEIVED_JOBS_FAIL';
const receivedJobsFail = (payload) => {
  return {
    type: RECEIVED_JOBS_FAIL,
    payload
  };
}

export const fetchJobs = () => {
  debugger;
  return dispatch => {
    const jobsRef = firebase.database().ref('jobs');
    jobsRef.on('value', (snapshot) => {
      let jobs = snapshot.val();
      dispatch(receivedJobsSuccess({jobs}));
    });
  };
}

