import React, { FC } from 'react'
import Bar from './Bar'
 
export interface InputChartData {
  DRAFTED: number; 
  REVIEWED: number;
  VERIFIED: number;
  APPROVED: number;
  PAYMENTS: number;
  FINISHED: number;
}

const BarChart: FC<InputChartData> = (props) => {
  return (
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Bar
        DRAFTED={props.DRAFTED}
        REVIEWED={props.REVIEWED}
        VERIFIED={props.VERIFIED}
        APPROVED={props.APPROVED}
        PAYMENTS={props.PAYMENTS}
        FINISHED={props.FINISHED}
      />
    </div>
  )
}

export default BarChart