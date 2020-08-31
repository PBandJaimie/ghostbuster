import React from 'react';
import { Bar } from 'react-chartjs-2';

// eslint-disable-next-line react/prefer-stateless-function
export default class CommitsBarChart extends React.Component {
  render() {
    const { commits } = this.props;
    const commitsWithCalendarDate = commits.map(commit => ({
      name: commit.name,
      date: commit.date.split('T')[0]
    }));
    const numberOfCommitsByDate = {};
    // eslint-disable-next-line no-return-assign
    commitsWithCalendarDate.forEach(commit =>
      numberOfCommitsByDate[commit.date]
        ? (numberOfCommitsByDate[commit.date] += 1)
        : (numberOfCommitsByDate[commit.date] = 1)
    );
    const commitData = {
      labels: Object.keys(numberOfCommitsByDate),
      datasets: [
        {
          label: 'Commits',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: Object.values(numberOfCommitsByDate)
        }
      ]
    };
    return (
      <div>
        <Bar
          data={commitData}
          options={{
            title: {
              display: true,
              text: 'Commits by date',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 25
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}
