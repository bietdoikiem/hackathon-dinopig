
import React from 'react'
import { Pie } from 'react-chartjs-2'

const data = {
  labels: ['topic 1', 'topic 2', 'topic 3', 'topic 4'],
  datasets: [
    {
      label: 'topics',
      data: [-0.0821794871794872, -0.06512820512820514, -0.05019230769230769, -0.06512820512820514],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const PieChart = () => (
  <div>
    <div className='header'>
      <h1 className='title'></h1>
    </div>
    <Pie data={data} />
  </div>
)

export default PieChart