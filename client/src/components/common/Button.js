import './Button.css';

const Button = ({ onClick, title, disabled = false, fullWidth = false }) => (
  <button
    className={`button ${fullWidth ? 'full-width' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
);

export default Button;
