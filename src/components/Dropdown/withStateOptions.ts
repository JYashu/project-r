import { connect } from 'react-redux';
import { STATES } from '../../utils/consts';

export const mapStatesToOptions = (statesArray: string[]) => {
  return statesArray.map(state => ({ label: state, value: state }));
};

const mapState = () => {
  const options = mapStatesToOptions(STATES);

  return {
    noOptionsMessage: 'No states',
    options,
    placeholder: 'Select state',
  };
};

export default connect(mapState);
