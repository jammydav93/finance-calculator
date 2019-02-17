import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

it('App snapshots match', () => {
  const component = shallow(<App />);

  expect(component).toMatchSnapshot();
});
