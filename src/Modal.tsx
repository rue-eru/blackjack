import { useEffect } from 'react';

type ModalProps = {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    className?: string;
}

const Modal = ({ children, open, onClose, className = '' }: ModalProps) => {

     // Close modal when pressing Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = "hidden"; //Prevent scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-950 bg-opacity-50 font-sans font-semibold transition-all duration-300 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}">
        <div 
           className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`}
           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
         >
           <div className="p-6">
             {children}
             <div className="mt-4 flex justify-center">
               <button
                 onClick={onClose}
                 className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                 autoFocus // Focus the button by default
               >
                 OK
               </button>
             </div>
           </div>
        </div>
    </div>
  );
};

export default Modal;
