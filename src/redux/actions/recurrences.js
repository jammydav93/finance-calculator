export const ADD_LOADED_FORM_DATA = 'ADD_LOADED_FORM_DATA';

export const addLoadedFormData = article => (
  {
    type: ADD_LOADED_FORM_DATA,
    payload: article,
  }
);

export default {
  addLoadedFormData,
};
