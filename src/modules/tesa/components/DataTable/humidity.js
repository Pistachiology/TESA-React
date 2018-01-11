import DataTable from './index'
import React from 'react'

const HumidityDataTable = ({ className, data, filterable }) => {
  return (
    <div className={className}>
      <DataTable
        title="Humidity"
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

export default HumidityDataTable
