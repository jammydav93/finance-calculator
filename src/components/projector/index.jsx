import React from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IntitialBalance from '../form/initialBalance/InitialBalance';
import Recurrences from '../recurrences/Recurrences';
import DateRangeInput from '../form/date/DateRangeInput';
import Loading from '../loading';
import './projector.scss';
import TransactionChartTable from '../TransactionsChartTable';

const AllRecurrences = ({ formExpandedDefault }) => (
  <React.Fragment>
    <div className="primary-fields">
      <DateRangeInput type="startDate" label="Start" />
      <DateRangeInput type="endDate" label="End" />
      <IntitialBalance type="initialBalance" label="Balance" />
    </div>
    <div className="recurrences-and-chart">
      <div className="recurrences">
        <Recurrences type="income" className="recurrenceTable" formExpandedDefault={formExpandedDefault} />
        <Recurrences type="outcome" className="recurrenceTable" formExpandedDefault={formExpandedDefault} />
      </div>
      <TransactionChartTable />
    </div>
  </React.Fragment>
);

AllRecurrences.propTypes = {
  formExpandedDefault: PropTypes.bool.isRequired,
};

const renderProjector = ({ loading, loadingForm, loadedFormData }) => {
  if (loading) {
    return null;
  } if (loadingForm) {
    return <Loading />;
  }

  return <AllRecurrences formExpandedDefault={!loadedFormData} />;
};

renderProjector.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingForm: PropTypes.bool.isRequired,
  loadedFormData: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.sessionState.loading,
  loadingForm: state.recurrencesState.loading,
  loadedFormData: path(['recurrencesState', 'formData', 'loadedCounter'], state) > 0,
});

export default connect(mapStateToProps)(renderProjector);
