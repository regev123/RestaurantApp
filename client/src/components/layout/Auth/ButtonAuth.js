import './ButtonAuth.css';

const ButtonAuth = ({
  onClick,
  title,
  disabled = false,
  fullWidth = false,
}) => (
  <button
    className={`buttonAuth ${fullWidth ? 'full-width' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
);

export default ButtonAuth;
