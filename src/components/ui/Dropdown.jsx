const Dropdown = ({ options, selected, onChange }) => (
    <select
      className="border px-3 py-2 rounded"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
  
  export default Dropdown;
  