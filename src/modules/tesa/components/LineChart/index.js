import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory'

import React from 'react'
import moment from 'moment'

const LineChart = ({ className, lineProps, chartProps, val, val_x, val_y, val_z, ...props }) => {
  return (
    <div className={className} {...props}>
      <VictoryChart
        theme={VictoryTheme.material}
        {...chartProps}
        width="800"
        height="400"
        style={{
          tickLabels: { angle: 45 }
        }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
      >
        <VictoryAxis
          style={{
            axisLabel: { fontSize: 16 },
            ticks: { stroke: '#ccc' },
            tickLabels: { fontSize: 14, fontWeight: 'bold', angle: 45 },
            grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
          }}
          dependentAxis
        />
        <VictoryAxis
          style={{
            axisLabel: { fontSize: 16 },
            ticks: { stroke: '#ccc' },
            tickLabels: { fontSize: 10, fontWeight: 'bold', angle: 45 }
          }}
          tickFormat={t => moment(t).format('DD/MM HH:mm:ss')}
        />
        {val.length != 0 && (
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #fff' }
            }}
            data={val}
            {...lineProps}
          />
        )}
        {val_x.length != 0 && (
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
            data={val_x}
            {...lineProps}
          />
        )}
        {val_y.length != 0 && (
          <VictoryLine
            style={{
              data: { stroke: '#9CDCF0' },
              parent: { border: '1px solid #999' }
            }}
            data={val_y}
            {...lineProps}
          />
        )}
        {val_z.length != 0 && (
          <VictoryLine
            style={{
              data: { stroke: '#38C6B0' },
              parent: { border: '1px solid #444' }
            }}
            data={val_z}
            {...lineProps}
          />
        )}
      </VictoryChart>
    </div>
  )
}

export default LineChart
