import DataTable from './index'
import React from 'react'

const HumidityDataTable = ({ className, data }) => {
  return (
    <div className={className}>
      <DataTable
        title="Humidity"
        data={data.toJS()}
        tableProps={{
          compact: true,
          basic: 'very',
          striped: true,
          size: 'small'
        }}
        header
        rowsPerPage={20}
        columnHeader={['sensID', 'val', 'date']}
      />
    </div>
  )
}

export default HumidityDataTable
