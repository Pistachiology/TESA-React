import DataTable from './index'
import React from 'react'

const AccelerometerDataTable = ({ className, data, filterable }) => {
  return (
    <div className={className}>
      <DataTable
        title="Accelerometer"
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
        columnHeader={['teamID', 'sensID', 'val_x', 'val_y', 'val_z', 'date']}
      />
    </div>
  )
}

export default AccelerometerDataTable
