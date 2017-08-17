import { compose, withState, lifecycle } from 'recompose';
import { ESFieldsSelect as Component } from './es_fields_select';
import { fetch } from '../../../common/lib/fetch';
import chrome from 'ui/chrome';

const basePath = chrome.getBasePath();
const apiPath = `${basePath}/api/canvas/es_fields`;

const getFields = (index) => {
  index = index || '_all';
  return fetch.get(`${apiPath}?index=${index}`)
    .then(res => Object.keys(res.data).sort());
};

export const ESFieldsSelect = compose(
  withState('fields', 'setFields', []),
  lifecycle({
    componentDidMount() {
      getFields(this.props.index)
      .then(this.props.setFields);
    },
    componentDidUpdate({ index }) {
      if (this.props.index !== index) {
        getFields(this.props.index)
        .then(this.props.setFields);
      }
    },
  })
)(Component);
