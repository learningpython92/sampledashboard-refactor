const Card = ({ children, className = "" }) => (
    <div className={`rounded-xl shadow p-4 bg-white ${className}`}>
      {children}
    </div>
  );
  
  export default Card;
  