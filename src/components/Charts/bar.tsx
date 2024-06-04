import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartBarProps {
  labels: string[]
  values: number[]
}

// export const ChartBar = ({ labels, values }: ChartBarProps) => (
export const ChartBar = () => (
  <Bar
    options={{
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false
        },
        legend: {
          display: false
        }
      }
    }}
    data={{
      labels: ['Despesas', 'Receitas'],
      datasets: [
        {
          data: [3299.67, 7345.0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          borderWidth: 1
        }
      ]
    }}
  />
)
