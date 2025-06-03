const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
          {children}
          <button onClick={onClose} className="mt-4 text-sm text-blue-600">Close</button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  