import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';

it('App snapshots match', () => {
  const component = shallow(<App />)

  expect(component).toMatchSnapshot();
});