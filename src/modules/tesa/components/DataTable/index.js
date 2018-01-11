import * as hash from 'object-hash'

import {
  Header,
  Icon,
  Input,
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

import Datetime from 'react-datetime'
import { Dropdown } from 'semantic-ui-react'
import LineChart from 'modules/tesa/components/LineChart'
import React from 'react'
import _ from 'lodash'
import { media } from 'common/mixins/'
import moment from 'moment'
import styled from 'styled-components'

const StyledLineChart = styled(LineChart)`
  width: 70%;
  ${media.xs`
    width: 100%;
  `};
`
const LineChartContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const StyledTableHeaderCell = styled(TableHeaderCell)`
  .left {
    display: block;
    float: left;
    ${media.xs`
      float: unset;
    `};
  }
  .right {
    display: block;
    float: right;
    ${media.xs`
      display: none;
    `};
    .asc {
      display: ${props => (props.Asc || !props.doActive ? 'block' : 'none')};
    }
    .desc {
      display: ${props => (!props.Asc || !props.doActive ? 'block' : 'none')};
    }
  }
`

const ToolboxContainer = styled.div`
  display: block;
  width: 100%;
  > * {
    display: block;
    float: left;
    margin: 10px 20px;
  }

  .datetime {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    > span {
      padding: 0 20px;
      font-weight: bold;
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
      increasingSort: true,
      startDate: null,
      endDate: null
    }
  }

  componentWillReceiveProps(nextProps) {
    let data = nextProps.data
    let dropdownValue = this.state.dropdownValue
    if (nextProps.filterable && dropdownValue != -1) {
      data = data.filter(v => v.teamID == dropdownValue)
    }

    const numberOfPages = Math.ceil(data.length / this.props.rowsPerPage)
    const columns = nextProps.columnHeader || Object.keys(data[0] || [])
    const dataLength = data.length

    this.setState({
      numberOfPages,
      columns,
      dataLength,
      data
    })
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

  handleDateChange = (time, attr) => {
    if (typeof time == 'string') {
      return
    }

    let { startDate, endDate } = this.state
    let data = this.props.data

    if (attr == 'startDate') {
      startDate = time
    } else {
      endDate = time
    }

    if (startDate && endDate) {
      data = data.filter(d => {
        const da = moment(d.date)
        return da >= startDate && da <= endDate
      })
    }
    let dropdownValue = this.state.dropdownValue
    data = data.filter(v => v.teamID == dropdownValue)
    const numberOfPages = Math.ceil(data.length / this.props.rowsPerPage)
    const columns = this.props.columnHeader || Object.keys(data[0] || [])
    const dataLength = data.length

    this.setState({ [attr]: time, data, columns, dataLength, numberOfPages })
  }

  onDropdownChange = (e, d) => {
    if (this.state.dropdownValue != d.value) {
      let data = this.props.data
      let dropdownValue = d.value
      if (dropdownValue != -1) {
        data = data.filter(v => v.teamID == dropdownValue)
      }
      const numberOfPages = Math.ceil(data.length / this.props.rowsPerPage)
      const columns = this.props.columnHeader || Object.keys(data[0] || [])
      const dataLength = data.length

      this.setState({ dropdownValue, data, columns, dataLength, numberOfPages })
    }
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

  renderInput = props => {
    return (
      <Input icon placeholder={props.placeholder}>
        <input {...props} />
        <Icon name="calendar" />
      </Input>
    )
  }

  renderFilterToolbox = () => {
    const options = [{ key: 1123011, value: -1, text: 'ALL' }]
    const dropdownOpt = _.sortBy(
      _.uniqBy(this.props.data, d => d.teamID).map(v => ({ key: v.teamID, value: v.teamID, text: `TEAM ${v.teamID}` })),
      d => d.value
    )
    options.push(...dropdownOpt)
    return (
      <ToolboxContainer>
        <Dropdown placeholder="ALL" options={options} search selection onChange={this.onDropdownChange} />
        <div className="datetime">
          <span> Start Date </span>
          <Datetime
            onChange={moment => this.handleDateChange(moment, 'startDate')}
            value={this.state.startDate}
            renderInput={this.renderInput}
            placeholder={'Select Date'}
            inputProps={{
              id: 'startDate',
              name: 'startDate',
              text: 'Start Date',
              required: true
            }}
          />
        </div>
        <div className="datetime">
          <span> End Date </span>
          <Datetime
            onChange={moment => this.handleDateChange(moment, 'endDate')}
            value={this.state.endDate}
            renderInput={this.renderInput}
            placeholder={'Select Date'}
            inputProps={{
              id: 'endDate',
              name: 'endDate',
              text: 'End Date',
              required: true
            }}
          />
        </div>
      </ToolboxContainer>
    )
  }

  render() {
    const { title, className, filterable, disableGraph } = this.props
    const { currentPage, rowsPerPage, numberOfPages, columns, sortBy, increasingSort, dropdownValue } = this.state

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
    let val = [],
      val_x = [],
      val_y = [],
      val_z = []
    if (dropdownValue != -1) {
      for (let i = 0; i < data.length; i++) {
        let datum = data[i]
        if (datum.val != null) {
          val.push({ x: moment(datum.date), y: datum.val })
        } else {
          val_x.push({ x: moment(datum.date), y: datum.val_x })
          val_y.push({ x: moment(datum.date), y: datum.val_y })
          val_z.push({ x: moment(datum.date), y: datum.val_z })
        }
      }
    }

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

        {dropdownValue != -1 &&
          !disableGraph && (
            <LineChartContainer>
              <StyledLineChart val={val} val_x={val_x} val_z={val_z} val_y={val_y} />
            </LineChartContainer>
          )}

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
