import React, { Component } from 'react'
import Griddle, { plugins } from 'griddle-react'
import fakeData from './MOCK_DATA'

const fakeLoadDataFromAPI = (currentPage, pageSize, callback) => {
  // setTimeout(() => {
  callback({
    data: fakeData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    currentPage,
  })
  // }, 100)
}
class MyGriddle extends Component {
  constructor() {
    super()
    this.state = {
      data: fakeData.slice(0, 5),
      currentPage: 1,
      pageSize: 5,
      recordCount: fakeData.length,
      // recordCount: 20,
    }
  }
  render() {
    const { data, currentPage, pageSize, recordCount } = this.state

    return (
      <div>
        <Griddle
        //  Enabling this plugin enables filter, but disables pagination!
          plugins={[plugins.LocalPlugin]}

          data={data}
          pageProperties={{ data, currentPage, pageSize, recordCount }}
          events={{
            onNext: this._onNext,
            onPrevious: this._onPrevious,
            onGetPage: this._onGetPage,
          }}
          components={{
            // Filter: () => <span />,
            // hide settings toggle button
            SettingsToggle: () => <span />,
          }}
          styleConfig={{
            icons: {
              TableHeadingCell: {
                sortDescendingIcon: '▼',
                sortAscendingIcon: '▲',
              },
            },
            classNames: {
              Cell: 'griddle-cell',
              Filter: 'griddle-filter',
              Loading: 'griddle-loadingResults',
              NextButton: 'griddle-next-button',
              NoResults: 'griddle-noResults',
              PageDropdown: 'griddle-page-select',
              Pagination: 'griddle-pagination',
              PreviousButton: 'griddle-previous-button',
              Row: 'griddle-row',
              RowDefinition: 'griddle-row-definition',
              Settings: 'griddle-settings',
              SettingsToggle: 'griddle-settings-toggle',
              Table: 'griddle-table',
              TableBody: 'griddle-table-body',
              TableHeading: 'griddle-table-heading',
              TableHeadingCell: 'griddle-table-heading-cell',
              TableHeadingCellAscending: 'griddle-heading-ascending',
              TableHeadingCellDescending: 'griddle-heading-descending',
            },
            styles: {},
          }}
        />
      </div>
    )
  }
  updateTableState = ({ data, currentPage }) => {
    this.setState({ data, currentPage })
  }

  _onNext = () => {
    const { currentPage, pageSize } = this.state
    fakeLoadDataFromAPI(currentPage + 1, pageSize, this.updateTableState)
  }

  _onPrevious = () => {
    const { currentPage, pageSize } = this.state
    fakeLoadDataFromAPI(currentPage - 1, pageSize, this.updateTableState)
  }
  _onGetPage = (pageNumber) => {
    const { pageSize } = this.state
    fakeLoadDataFromAPI(pageNumber, pageSize, this.updateTableState)
  }
}

export default MyGriddle
