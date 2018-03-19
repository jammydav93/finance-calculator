import React from 'react';
import { db } from '../firebase';

const LoadButton = () =>
  <button
    type="button"
    onClick={() => db.getUser('UJdMfumwMhbF5Nhf8r1TxnYDzze2')}
  >
    Load
  </button>

export default LoadButton;
