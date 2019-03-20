import React from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IntitialBalance from '../Form/InitialBalance';
import Recurrences from '../Recurrences';
import DateRangeInput from '../Form/Date';
import Loading from '../Loading';
import styles from './index.module.scss';
import TransactionChartTable from '../TransactionsChartTable';

const AllRecurrences = ({ formExpandedDefault }) => (
  <React.Fragment>
    <div className={styles['primary-fields']}>
      <DateRangeInput type="startDate" label="Start" />
      <DateRangeInput type="endDate" label="End" />
      <IntitialBalance type="initialBalance" label="Balance" />
    </div>
    <div className={styles['recurrences-and-chart']}>
      <div className={styles.recurrences}>
        <Recurrences type="income" className={styles.recurrenceTable} formExpandedDefault={formExpandedDefault} />
        <Recurrences type="outcome" className={styles.recurrenceTable} formExpandedDefault={formExpandedDefault} />
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
