import DataTable from './index'
import React from 'react'

const PressureDataTable = ({ className, data, filterable }) => {
  return (
    <div className={className}>
      <DataTable
        title="Pressure"
        data={data.toJS()}
        filterable={filterable}
        tableProps={{
          compact: true,
          basic: 'very',
          striped: true,
          size: 'small'
        }}
        header
        rowsPerPage={10}
        columnHeader={['teamID', 'sensID', 'val', 'date']}
      />
    </div>
  )
}

export default PressureDataTable
