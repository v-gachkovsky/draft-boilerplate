import { addPrefix } from 'utils/reduxHelpers';
import { NAMESPACE } from '../../constants';
import validate from './validate';

export const FORM_NAME = addPrefix(NAMESPACE, 'NewItemForm');

export const ITEM_TITLE_FIELD_NAME = 'title';
export const ITEM_DESCRIPTION_FIELD_NAME = 'description';

const formConfig = {
  form: FORM_NAME,
  validate,
  touchOnChange: true,
  initialValues: {
    [ITEM_TITLE_FIELD_NAME]: '',
    [ITEM_DESCRIPTION_FIELD_NAME]: ''
  }
};

export default formConfig;
