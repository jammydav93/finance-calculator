import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
// import validate from './validate'


const FieldForm = props => (
    <form>
      {props.label}:
      <div>
        <Field 
          name={props.type}
          label={props.label} 
          component="input"
          type="number"
        />
      </div>
    </form>
);

// No need to map intialState to form as linked within Recurrences component
export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
