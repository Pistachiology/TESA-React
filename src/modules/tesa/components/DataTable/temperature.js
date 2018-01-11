import DataTable from './index'
import React from 'react'

const TemperatureDataTable = ({ className, data, filterable }) => {
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
        rowsPerPage={20}
        columnHeader={['teamID', 'sensID', 'val', 'date']}
      />
    </div>
  )
}

export default TemperatureDataTable
