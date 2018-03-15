import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
// import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import { selectItems, getLoadingStatus } from './selectors';
import reducer from './reducer';
import { NAMESPACE } from './constants';
import { fetchItems } from './actions';
import saga from './sagas';

import style from './style';

class DashboardPage extends Component {
  state = {
    items: this.props.items,
    filterPattern: ''
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

  handleFilterPatternChange = ({ target: { value } }) => {
    this.setState({ filterPattern: value.toLowerCase() });
  };

  renderLoadableElement = element => {
    const { loading } = this.props;

    if (!loading) return element;

    return (
      <div>
        <CircularProgress size={ 60 } thickness={ 4 } />
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { items } = this.state;

    const itemsListElements = items && this.getFilteredItems().map(item => {
      return (
        <ListItem key={ item.id }>
          <ListItemText primary={ item.title } secondary={ items.description } />
        </ListItem>
      );
    });

    const listOfItems = (
      <List>
        { itemsListElements }
      </List>
    );

    return (
      <div>
        <h2
          className={ classes.dashboardHeader }
        >
          Dashboard Page
        </h2>
        <TextField
          label="Search"
          className={ classes.input }
          onChange={ this.handleFilterPatternChange }
        />
        <div>
          Dashboard Items:
          { this.renderLoadableElement(listOfItems) }
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
  // Actions
  getItems: PropTypes.func
};

const mapStateToProps = () => createStructuredSelector({
  items: selectItems(),
  loading: getLoadingStatus()
});

const mapDispatchToProps = {
  getItems: fetchItems
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: NAMESPACE, reducer });
const withSaga = injectSaga({ key: NAMESPACE, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withStyles(style)(DashboardPage));
