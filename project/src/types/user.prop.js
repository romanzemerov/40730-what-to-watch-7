import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
});
