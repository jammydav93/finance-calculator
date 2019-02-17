import React from 'react';
import { path } from 'ramda'
import { connect } from 'react-redux'
import Recurrences from '../recurrences/Recurrences';
import DateRangeInput from '../form/date/DateRangeInput';
import IntitialBalance from '../form/initialBalance/InitialBalance';
import Chart from '../chart';
import Loading from '../loading';
import './projector.scss';

const AllRecurrences = ({formExpandedDefault}) => (
  <React.Fragment>
    <div className="primary-fields">
      <DateRangeInput type='startDate' label='Start' />
      <DateRangeInput type='endDate' label='End' />
      <IntitialBalance type='initialBalance' label='Balance' />
    </div>
    <div className='recurrences-and-chart'>
      <div className='recurrences'>
        <Recurrences type='income' className='recurrenceTable' formExpandedDefault={formExpandedDefault} />
        <Recurrences type='outcome' className='recurrenceTable' formExpandedDefault={formExpandedDefault} />
      </div>
      <Chart className='chart' />
    </div>
  </React.Fragment>
);

const renderProjector = ({ loading, loadingForm, loadedFormData }) => {
  if (loading) {
    return null
   } else if (loadingForm) {
     return <Loading />
   }

   return <AllRecurrences formExpandedDefault={!loadedFormData} /> 
  }

const mapStateToProps = (state) => ({
  loading: state.sessionState.loading,
  loadingForm: state.recurrencesState.loading,
  loadedFormData: path(['recurrencesState', 'formData', 'loadedCounter'], state) > 0
})

export default connect(mapStateToProps)(renderProjector)
