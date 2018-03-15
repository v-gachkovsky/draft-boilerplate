import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { TextField } from 'redux-form-material-ui';
import { withStyles } from 'material-ui';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import formConfig, * as fields from '../../forms/newItemForm';

import style from './style';

const NewItemForm = props => (
  <form>
    <Field
      className={ props.classes.input }
      name={ fields.ITEM_TITLE_FIELD_NAME }
      component={ TextField }
      label="Title"
    />

    <Field
      className={ props.classes.input }
      name={ fields.ITEM_DESCRIPTION_FIELD_NAME }
      component={ TextField }
      label="Description"
    />

    <Button
      className={ props.classes.button }
      variant="raised"
      color="primary"
      onClick={ props.handleSubmit(props.onSubmit) }
    >
      Add Item
    </Button>
  </form>
);

NewItemForm.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default compose(
  reduxForm(formConfig)
)(withStyles(style)(NewItemForm));
