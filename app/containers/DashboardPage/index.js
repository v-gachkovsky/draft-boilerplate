import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { lt, gt } from 'lodash';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { Column, Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import { SortDirection, SortIndicator } from 'utils/sorting';
import NewItemForm from './components/NewItemForm';
import { selectItems, getLoadingStatus } from './selectors';
import reducer from './reducer';
import { NAMESPACE } from './constants';
import { fetchItems, addItem } from './actions';
import saga from './sagas';

import style from './style';

class DashboardPage extends Component {
  state = {
    items: this.props.items,
    filterPattern: '',
    sortBy: 'id',
    sortDirection: SortDirection.ASC
  };

  componentDidMount() {
    const { getItems } = this.props;
    getItems();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      filterPattern: ''
    });
  }

  getFilteredItems = () => {
    const { items, filterPattern } = this.state;

    return items.filter(item => item.title.toLowerCase().includes(filterPattern));
  };

  getSortingValue = (row, sortBy) => {
    const value = row[sortBy];

    if (sortBy === 'id') {
      return value
        ? +value
        : 0;
    }

    return value
      ? value.toLowerCase()
      : '';
  };

  isLoaded = () => {
    const { loading } = this.props;

    return !loading;
  };

  handleFilterPatternChange = ({ target: { value } }) => {
    this.setState({ filterPattern: value.toLowerCase() });
  };

  sortList = ({ sortBy, sortDirection }) => {
    const { items } = this.state;
    const applySorting = (items, sortBy, sortFunction) => {
      return items.sort((a, b) => {
        return sortFunction(this.getSortingValue(a, sortBy), this.getSortingValue(b, sortBy));
      });
    };

    return applySorting(items, sortBy, sortDirection === SortDirection.ASC ? gt : lt);
  };

  sort = ({ sortBy, sortDirection }) => {
    const items = this.sortList({ sortBy, sortDirection });

    this.setState({
      sortBy,
      sortDirection,
      items
    });
  };

  headerRenderer = ({ dataKey, sortBy, sortDirection, label }) => (
    <div>
      { label }
      { sortBy === dataKey && (
        <SortIndicator sortDirection={ sortDirection } />
      ) }
    </div>
  );

  handleSubmit = data => {
    const { createItem } = this.props;
    createItem(data);
  };

  renderLoadableElement = element => {
    if (this.isLoaded()) return element;

    return (
      <div>
        <CircularProgress size={ 60 } thickness={ 4 } />
      </div>
    );
  };

  render() {
    const { classes, errors } = this.props;
    const {
      items,
      sortBy,
      sortDirection
    } = this.state;

    const listOfItems = items && this.getFilteredItems();

    const tableOfItems = (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={ width }
            height={ height - 40 }
            headerHeight={ 20 }
            rowHeight={ 50 }
            rowCount={ listOfItems.length || 0 }
            rowGetter={ ({ index }) => listOfItems[index] }
            sort={ this.sort }
            sortBy={ sortBy }
            sortDirection={ sortDirection }
          >

            <Column
              width={ 180 }
              flexGrow={ 1 }
              label="ID"
              dataKey="id"
              headerRenderer={ this.headerRenderer }
            />

            <Column
              width={ 180 }
              flexGrow={ 1 }
              label="Title"
              dataKey="title"
              headerRenderer={ this.headerRenderer }
            />

            <Column
              width={ 180 }
              flexGrow={ 1 }
              label="Description"
              dataKey="description"
              headerRenderer={ this.headerRenderer }
            />
          </Table>
      ) }
      </AutoSizer>
    );

    return (
      <div>
        <h2 className={ classes.dashboardHeader }>
          Dashboard Page
        </h2>

        <div>
          <h4>
            Dashboard Items:
          </h4>

          <div>
            { this.isLoaded() && (
              <TextField
                label="Search by title"
                className={ classes.input }
                onChange={ this.handleFilterPatternChange }
              />
            ) }
          </div>

          <div className={ classes.newItemButtons }>
            { this.isLoaded() && (
              <NewItemForm
                errors={ errors }
                onSubmit={ this.handleSubmit }
              />
            ) }
          </div>

          <div className={ classes.table }>
            { this.renderLoadableElement(tableOfItems) }
          </div>

        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object,
  // Data
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  loading: PropTypes.bool,
  errors: PropTypes.object,
  // Actions
  getItems: PropTypes.func,
  createItem: PropTypes.func
};

const mapStateToProps = () => createStructuredSelector({
  items: selectItems(),
  loading: getLoadingStatus()
});

const mapDispatchToProps = {
  getItems: fetchItems,
  createItem: addItem
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: NAMESPACE, reducer });
const withSaga = injectSaga({ key: NAMESPACE, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withStyles(style)(DashboardPage));
