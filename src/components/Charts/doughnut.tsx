/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface ChartDoughnutProps {
  items: {
    color: string
    name: string
    value: number
  }[]
}

export const ChartDoughnut = ({ items }: ChartDoughnutProps) => (
  <Doughnut
    data={{
      labels: items.map(item => item.name),
      datasets: [
        {
          // @ts-ignores
          cutout: '70%',
          label: ' ',
          hoverOffset: 4,
          borderWidth: 0,
          data: items.map(item => item.value),
          backgroundColor: items.map(item => item.color)
        }
      ]
    }}
    options={{
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            padding: 24,
            color: '#FAFAF9',
            font: { size: 15 }
          }
        }
      }
    }}
  />
)
