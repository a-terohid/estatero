import React from 'react';

// ImageModule component displays a modal containing an image or other content.
// It is shown when the 'show' prop is true and hidden when it is false.
// The component takes a title (optional) and children as props to customize the content inside the modal.
const ImageModule = ({
    show,
    onClose,
    title,
    children,
  }: {
    show: boolean; // Determines whether the modal is visible
    onClose: () => void; // Callback function to handle modal close action
    title?: string; // Optional title to display at the top of the modal
    children: React.ReactNode; // Content (e.g., image) to be displayed inside the modal
  }) => {
    // If the 'show' prop is false, return null to prevent rendering the modal
    if (!show) return null;
  
    return (
      // The modal container, centered with a semi-transparent background
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
          {/* Modal header with the title and close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            {/* Close button that triggers the onClose callback */}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          {/* Modal body displaying the content passed as children */}
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  };
  

export default ImageModule;