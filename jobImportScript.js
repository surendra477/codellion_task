var fetch = require('node-fetch');
const API_URI = 'https://goremote.io/api/jobs/';

const firebase = require('firebase');

let fbConfig = {
  apiKey: "AIzaSyAlxh6BBHemP08QctcpSuAEJFOolx7TLRk",
  authDomain: "jobhunt-io-001.firebaseapp.com",
  databaseURL: "https://jobhunt-io-001.firebaseio.com",
  projectId: "jobhunt-io-001",
  storageBucket: "jobhunt-io-001.appspot.com",
  messagingSenderId: "376285375752"
};

firebase.initializeApp(fbConfig);

function fetchJobs() {
  fetch(API_URI)
    .then((resp) => resp.json())
    .then(jobs => {
      jobs.forEach(job => {
        saveToFirebase(job);
      });
      console.log('Finished Saving Jobs')
      return 'Done';
    })
    .catch(err => console.log(err));
    console.log('Should have ended the prog')
    return "Done";
}

function parsedTags(tags) {
  if (Array.isArray(tags)) {
    return tags;
  }
  return Object.entries(tags)[1];
}


function saveToFirebase(job) {
  console.log('Saving job: ' + job.position);
  firebase.database().ref('/jobs').push({
    apply: job.applyurl,
    description: job.description,
    title: job.position,
    remote: job.sourceid in [1, 2, 11] ? true : false,
    timestamp: -Date.parse(job.dateadded),
    logoUrl: null,
    createdBy: 'admin',
    company: job.companyname,
    source: job.sourcename,
    tags: parsedTags(job.tags)
  });
}

fetchJobs();
