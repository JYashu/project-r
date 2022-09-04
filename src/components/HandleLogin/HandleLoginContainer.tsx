import { connect } from 'react-redux';

import { completeSignIn } from '../../redux/me';
import HandleLogin from './HandleLogin';

const mapDispatch = {
  completeSignIn: completeSignIn.request,
};

export default connect(null, mapDispatch)(HandleLogin);
