import DataTable from './index'
import React from 'react'

const PressureDataTable = ({ className, data }) => {
  return (
    <div className={className}>
      <DataTable
        title="Pressure"
        data={data.toJS()}
        tableProps={{
          compact: true,
          basic: 'very',
          striped: true,
          size: 'small'
        }}
        header
        rowsPerPage={10}
        columnHeader={['sensID', 'val', 'date']}
      />
    </div>
  )
}

export default PressureDataTable
