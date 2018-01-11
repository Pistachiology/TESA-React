import * as hash from 'object-hash'

import {
  Header,
  Icon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow
} from 'semantic-ui-react'

import { Dropdown } from 'semantic-ui-react'
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import styled from 'styled-components'

const StyledTableHeaderCell = styled(TableHeaderCell)`
  .left {
    display: block;
    float: left;
  }
  .right {
    display: block;
    float: right;
    .asc {
      display: ${props => (props.Asc || !props.doActive ? 'block' : 'none')};
    }
    .desc {
      display: ${props => (!props.Asc || !props.doActive ? 'block' : 'none')};
    }
  }
`

export default class DataTable extends React.Component {
  constructor(props) {
    super(props)

    let data = props.data

    const rowsPerPage = props.rowsPerPage || 5
    const numberOfPages = Math.ceil(data.length / rowsPerPage)
    const columns = props.columnHeader || Object.keys(data[0] || [])

    this.state = {
      currentPage: 1,
      rowsPerPage: rowsPerPage,
      numberOfPages: numberOfPages,
      columns: columns,
      dataLength: data.length,
      data: data,
      dropdownValue: -1,
      sortBy: 'sensID',
      increasingSort: true
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let data = nextProps.data
    let dropdownValue = nextState.dropdownValue || this.state.dropdownValue
    if (nextProps.filterable && dropdownValue != -1) {
      data = data.filter(v => v.teamID == dropdownValue)
    }

    const numberOfPages = Math.ceil(data.length / this.props.rowsPerPage)
    const columns = nextProps.columnHeader || Object.keys(data[0] || [])
    const dataLength = data.length

    if (
      (dataLength !== this.props.data.length && nextState.dataLength != dataLength) ||
      (nextState.dropdownValue && this.state.dropdownValue != nextState.dropdownValue)
    ) {
      this.setState({
        numberOfPages,
        columns,
        dataLength,
        data
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

  onDropdownChange = (e, d) => {
    this.setState({ dropdownValue: d.value })
  }

  renderFilterToolbox = () => {
    const options = [{ key: 1123011, value: -1, text: 'ALL' }]
    const dropdownOpt = _.uniqBy(this.props.data, d => d.teamID).map(v => ({ key: v.teamID, value: v.teamID, text: `TEAM ${v.teamID}` }))
    options.push(...dropdownOpt)
    return (
      <div className={this.props.className}>
        <Dropdown placeholder="ALL" options={options} search selection onChange={this.onDropdownChange} />
      </div>
    )
  }

  handleSort = idx => {
    if (this.state.sortBy == idx) {
      this.setState({ increasingSort: !this.state.increasingSort })
    } else {
      this.setState({ sortBy: idx })
    }
  }

  transformContent = (content, key) => {
    if (typeof content == 'number' && key !== 'sensID' && key !== 'teamID') {
      return content.toPrecision(5)
    }
    return content
  }

  render() {
    const { title, className, filterable } = this.props
    const { currentPage, rowsPerPage, numberOfPages, columns, sortBy, increasingSort } = this.state

    let { data } = this.state

    if (sortBy != 'date') {
      data = _.sortBy(data, [sortBy]).map(value => {
        value.date = moment(value.date).format('LLL')
        return value
      })
    } else {
      data = _.sortBy(data, o => new moment(o.date).format('YYYYMMDDHHmmSS')).map(value => {
        value.date = moment(value.date).format('LLL')
        return value
      })
    }
    if (!increasingSort) data = data.reverse()

    //slice current data set (more filters could be added, and also sorting)
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

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

    return (
      <div className={className}>
        {title && <Header size="large"> {title} </Header>}
        {filterable && this.renderFilterToolbox()}

        <Table {...this.props.tableProps}>
          {this.props.header && (
            <TableHeader>
              <TableRow>
                {columns.map(key => (
                  <StyledTableHeaderCell key={key} onClick={() => this.handleSort(key)} Asc={increasingSort} doActive={key == sortBy}>
                    <span className="left"> {key} </span>
                    <span className="right">
                      <Icon name="triangle up" className="asc" />
                      <Icon name="triangle down" className="desc" />
                    </span>
                  </StyledTableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {currentData.map(row => (
              <TableRow key={hash(row)}>
                {columns.map(key => <TableCell key={hash({ ...row, key })} content={this.transformContent(row[key], key)} />)}
              </TableRow>
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
