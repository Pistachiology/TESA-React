import DataTable from './index'
import React from 'react'

const TemperatureDataTable = ({ className, data, filterable, showGraph }) => {
  return (
    <div className={className}>
      <DataTable
        title="Temperature"
        data={data.toJS()}
        filterable={filterable}
        tableProps={{
          compact: true,
          basic: 'very',
          striped: true,
          size: 'small'
        }}
        header
        showGraph={showGraph}
        rowsPerPage={20}
        columnHeader={['teamID', 'sensID', 'val', 'date']}
      />
    </div>
  )
}

export default TemperatureDataTable
