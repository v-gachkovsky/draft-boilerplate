import { isEmpty } from 'validator';

import {
  ITEM_TITLE_FIELD_NAME
} from './index';

export const validate = values => {
  const errors = {};

  if (isEmpty(values[ITEM_TITLE_FIELD_NAME])) {
    errors[ITEM_TITLE_FIELD_NAME] = "Title can't be empty";
  }

  if (values[ITEM_TITLE_FIELD_NAME].length > 80) {
    errors[ITEM_TITLE_FIELD_NAME] = "Title can't be very long";
  }

  return errors;
};

export default validate;
