import { useState } from 'react';
import './InputField.css';

const InputField = ({
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  icon = '',
  fullWidth = false,
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const isPasswordField = name.toLowerCase().includes('password');

  return (
    <div>
      <div className={`InputField ${fullWidth ? 'full-width' : ''}`}>
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete='off'
        />
        {isPasswordField && (
          <i
            className={`bx ${
              inputType === 'password' ? 'bx-show-alt' : 'bx-hide'
            }`}
            onClick={togglePasswordVisibility}
            title={inputType === 'password' ? 'Show Password' : 'Hide Password'}
          />
        )}
        <i className={icon}></i>
      </div>
    </div>
  );
};

export default InputField;
