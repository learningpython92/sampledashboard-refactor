const Input = ({ placeholder, value, onChange }) => (
    <input
      className="border px-3 py-2 rounded w-full"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
  
  export default Input;
  