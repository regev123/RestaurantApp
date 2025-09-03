import './LinkCall.css';
import { Link } from 'react-router-dom';

const LinkCall = ({ title = '', link, linkName }) => (
  <div className='link'>
    <p className='link-text'>
      {title}
      <Link to={link} className='link-name'>
        {' '}
        {linkName}
      </Link>
    </p>
  </div>
);

export default LinkCall;
