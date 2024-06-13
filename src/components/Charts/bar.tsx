import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// export const ChartBar = ({ labels, values }: ChartBarProps) => (
export const ChartBar = (props: ChartData<'bar'>) => (
  <Bar
    options={{
      scales: {
        y: { beginAtZero: true }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: false },
        legend: { display: false }
      }
    }}
    data={props}
    // data={{
    //   labels: ['Despesas', 'Receitas'],
    //   datasets: [
    //     {
    //       data: [3299.67, 7345.0],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(75, 192, 192, 0.2)'
    //       ],
    //       borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
    //       borderWidth: 1
    //     }
    //   ]
    // }}
  />
)
