/* eslint-disable */
import { FC } from "react"
import { PermitStatus } from "src/store/States/WorkPermit/WorkPermitApplications/types"
import Charts, { Bar, ChartComponentProps } from 'react-chartjs-2'

export interface InputChartData {
  DRAFTED: number;
  REVIEWED: number;
  VERIFIED: number;
  APPROVED: number;
  SENT_SERVICE_FEE: number;
  ACCEPTED_SERVICE_FEE: number;
}

const BarChart: FC<InputChartData> = (props) => {
  const length = Object.values(PermitStatus).length
  const labels = Object.values(PermitStatus).slice(0, length - 1).map(item => `${item}`.replace("_", " "))
  const data = {
    labels,
    datasets: [{
      label: 'Total Amount',
      data: [props.DRAFTED, props.REVIEWED, props.VERIFIED, props.APPROVED, props.SENT_SERVICE_FEE, props.ACCEPTED_SERVICE_FEE],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1,
      barThickness: 50
    }]
  };

  const config = {
    type: 'bar',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },

    },
  };

  return (
    <>
      <Bar {...config} />
    </>
  )
}

export default BarChart