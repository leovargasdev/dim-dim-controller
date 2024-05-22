import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartLineProps {
  labels: string[]
  values: number[]
}

export const ChartLine = ({ labels, values }: ChartLineProps) => (
  <Line
    options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          border: { color: 'transparent' },
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        },
        x: {
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
          border: { color: 'rgba(0, 0, 0, 0.1)' }
        }
      }
    }}
    data={{
      labels,
      datasets: [
        {
          data: values,
          borderColor: '#3B82F6',
          tension: 0.2
        }
      ]
    }}
  />
)
