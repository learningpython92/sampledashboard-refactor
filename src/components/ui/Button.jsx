const Button = ({ children, onClick, variant = "primary" }) => {
    const base = "rounded px-4 py-2 font-medium transition";
    const styles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    };
    return (
      <button onClick={onClick} className={`${base} ${styles[variant]}`}>
        {children}
      </button>
    );
  };
  
  export default Button;
  