// Button.jsx
const Button = ({ onClick, disabled, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`block w-48 lg:w-48 py-2 lg:py-6 text-gray-700 drop-shadow-md ${
      disabled ? 'bg-gray-500' : 'bg-yellow-100'
    } text-gray-200`}
  >
    {label}
  </button>
)

export default Button
