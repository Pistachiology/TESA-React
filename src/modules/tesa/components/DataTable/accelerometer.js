import DataTable from './index'
import React from 'react'

const AccelerometerDataTable = ({ className, data }) => {
  return (
    <div className={className}>
      <DataTable
        title="Accelerometer"
        data={data.toJS()}
        tableProps={{
          compact: true,
          basic: 'very',
          striped: true,
          size: 'small'
        }}
        header
        rowsPerPage={20}
        columnHeader={['sensID', 'val_x', 'val_y', 'val_z', 'date']}
      />
    </div>
  )
}

export default AccelerometerDataTable
