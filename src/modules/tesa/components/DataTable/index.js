import * as hash from 'object-hash'

import { Header, Menu, MenuItem, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react'

import React from 'react'

export default class DataTable extends React.Component {
  constructor(props) {
    super(props)

    const rowsPerPage = props.rowsPerPage || 5
    const numberOfPages = Math.ceil(props.data.length / rowsPerPage)
    const columns = props.columnHeader || Object.keys(props.data[0] || [])

    this.state = {
      currentPage: 1,
      rowsPerPage: rowsPerPage,
      numberOfPages: numberOfPages,
      columns: columns,
      dataLength: props.data.length
    }
  }

  componentWillUpdate(nextProps) {
    const numberOfPages = Math.ceil(nextProps.data.length / this.props.rowsPerPage)
    const columns = nextProps.columnHeader || Object.keys(nextProps.data[0] || [])
    const dataLength = nextProps.data.length
    if (dataLength !== this.props.data.length) {
      this.setState({
        numberOfPages,
        columns,
        dataLength
      })
    }
  }

  handlePageClick = e => {
    this.setState({
      currentPage: parseInt(e.currentTarget.dataset['page'])
    })
  }

  handleDirectionClick = e => {
    let direction = e.currentTarget.dataset['direction']

    let change = 0
    if (direction === 'LEFT' && this.state.currentPage > 1) {
      change = -1
    } else if (direction === 'RIGHT' && this.state.currentPage < this.state.numberOfPages) {
      change = 1
    }

    if (change !== 0) {
      this.setState({
        currentPage: this.state.currentPage + change
      })
    }
  }

  render() {
    const { data, title, className } = this.props
    const { currentPage, rowsPerPage, numberOfPages, columns } = this.state

    //slice current data set (more filters could be added, and also sorting)
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    console.log(currentData) // eslint-disable-line

    //define start page
    let startPage
    if (numberOfPages <= 3 || this.state.currentPage === 1) {
      startPage = 1
    } else if (this.state.currentPage === numberOfPages) {
      startPage = this.state.currentPage - 2
    } else {
      startPage = this.state.currentPage - 1
    }

    let pageRange = Array.from(new Array(Math.min(3, numberOfPages)), (x, i) => i + startPage)
    console.log(startPage, pageRange) //eslint-disable-line

    return (
      <div className={className}>
        {title && <Header size="large"> {title} </Header>}
        <Table {...this.props.tableProps}>
          {this.props.header && (
            <TableHeader>
              <TableRow>{columns.map(key => <TableHeaderCell key={key}>{key}</TableHeaderCell>)}</TableRow>
            </TableHeader>
          )}
          <TableBody>
            {currentData.map(row => (
              <TableRow key={hash(row)}>{columns.map(key => <TableCell key={hash({ ...row, key })} content={row[key]} />)}</TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHeaderCell {...{ colSpan: 3 }}>
                <Menu floated="right" pagination>
                  <MenuItem icon="angle double left" data-page={1} onClick={this.handlePageClick} />
                  <MenuItem data-direction="LEFT" onClick={this.handleDirectionClick} icon="angle left" />
                  {pageRange.map(pageIndex => (
                    <MenuItem
                      key={pageIndex}
                      content={`${pageIndex}`}
                      data-page={pageIndex}
                      onClick={this.handlePageClick}
                      active={pageIndex === this.state.currentPage}
                      as="a"
                    />
                  ))}
                  <MenuItem data-direction="RIGHT" onClick={this.handleDirectionClick} icon="angle right" />
                  <MenuItem icon="angle double right" data-page={numberOfPages} onClick={this.handlePageClick} />
                </Menu>
              </TableHeaderCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}
