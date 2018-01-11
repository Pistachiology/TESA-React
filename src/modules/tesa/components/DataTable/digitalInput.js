import DataTable from './index'
import React from 'react'

const DigitalInputDataTable = ({ className, data, filterable }) => {
  return (
    <div className={className}>
      <DataTable
        title="Digital Input"
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

export default DigitalInputDataTable
