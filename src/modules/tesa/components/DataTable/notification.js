import DataTable from './index'
import React from 'react'

const NotificationDataTable = ({ className, data, filterable }) => {
  return (
    <div className={className}>
      <DataTable
        title="Nofication"
        data={data.toJS()}
        tableProps={{
          compact: true,
          basic: 'very',
          striped: true,
          size: 'small'
        }}
        header
        disableGraph
        filterable={filterable}
        rowsPerPage={20}
        columnHeader={['teamID', 'description', 'date']}
      />
    </div>
  )
}

export default NotificationDataTable
