import React from 'react';
import { Field } from 'redux-form';

const currencyRegex = /(\d*).?(\d?\d?)/

const CurrencyField = ({ name, componentToRender }) =>
  <Field
    name={name}
    type="number"
    component={componentToRender}
    format={(a) => {
      if (a) {
        const b = String(a).match(currencyRegex)
        console.log('b=', b)
         if (b) {
          const formatted = (b[1] ? b[1] / 100 : '') + (b[2] ? `.${b[2]}` : '')
          return formatted; 
         }
      }
      return ''
    }}
    parse={(a) => {
      if (a) {
        const b = a.match(currencyRegex)
        if (b) {
          const pence = b[2] ? ( b[2].length === 1 ? b[2] * 10 : b[2]) : 0
          const totalPence = parseInt(b[1] ? b[1]*100 : 0, 10) + parseInt(pence, 10)
         console.log('totalPence=', totalPence)
          return totalPence;
        }
      }
      return ''
    }}
  />

export default CurrencyField;
            


            