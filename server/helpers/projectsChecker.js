const githubQuery = require('./githubQuery');
const { allCohorts } = require('../config/cohorts');

// so node won't throw an error and crash when a student doesn't have a fork
process.on('uncaughtException', err => {
  console.log('Caught exception: ', err);
});

const getStudentsList = cohortName => {
  const studentsList = allCohorts.filter(x => x.name === cohortName);
  return studentsList && studentsList.length ? studentsList[0].students : [];
};

const getCommits = async repoName => {
  const url = `http://api.github.com/repos/${repoName}/commits`;
  const response = await githubQuery(url);
  const commits = response.map(res => ({
    name: res.commit.message,
    date: res.commit.author.date
  }));
  return commits || [];
};

module.exports = {
  getStudentsList,
  getCommits
};
