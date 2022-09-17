import { connect } from 'react-redux';
import { State } from '../../redux/types';
import CBook from './CBook';

const mapState = (state: State) => ({
  order: state.cbook.order,
  data: state.cbook.data,
});

export default connect(mapState)(CBook);
