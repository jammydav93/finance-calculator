import React from 'react';
import { reduxForm } from 'redux-form';
import CurrencyField from './form/CurrencyField';

// import validate from './validate'

const FieldForm = props => (
    <form>
      {props.label}:
      <div>
        <CurrencyField
          name={props.type}
          componentToRender="input"
        />
      </div>
    </form>
);

// No need to map intialState to form as linked within Recurrences component
export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
