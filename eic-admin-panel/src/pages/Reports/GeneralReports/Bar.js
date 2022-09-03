// @source sourceCode
import React from 'react'
import { Chart } from 'react-charts'

export default (props) => {
  console.log("llzz", props)

  const data = [
    {
      label: 'Permits',
      data: [['DRAFTED', props.DRAFTED], ['REVIEWED', props.REVIEWED], ['VERIFIED', props.VERIFIED], ['APPROVED', props.APPROVED], ['PAYMENTS', props.PAYMENTS], ['FINISHED', props.FINISHED]]
    }
  ]
  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { position: 'bottom', type: 'linear', stacked: true }
    ],
    []
  )
  return (
    <>
      <Chart data={data} series={series} axes={axes} tooltip />
    </>
  )
}