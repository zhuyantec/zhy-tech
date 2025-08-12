import React from 'react';
import Image from "next/legacy/image";

interface CircularVisualProps {
  src: string;
  alt: string;
  size: 'xs' | 'sm' | 'md' | 'lg'; // Example sizes, adjust as needed
  positionClasses: string; // Tailwind classes for absolute positioning (e.g., 'top-0 left-1/4')
  isShape?: boolean; // Flag to differentiate shapes from people images (optional styling)
}

const CircularVisual: React.FC<CircularVisualProps> = ({ 
  src, 
  alt, 
  size, 
  positionClasses,
  isShape = false 
}) => {

  let sizeClasses = '';
  switch (size) {
    case 'xs':
      sizeClasses = 'w-20 h-20 md:w-28 md:h-28'; // Smallest (e.g., Person 2)
      break;
    case 'sm':
      sizeClasses = 'w-24 h-24 md:w-32 md:h-32'; // Person 1
      break;
    case 'md':
      sizeClasses = 'w-32 h-32 md:w-40 md:h-40'; // Shape 2
      break;
    case 'lg':
      sizeClasses = 'w-48 h-48 md:w-64 md:h-64'; // Shape 1
      break;
    default:
      sizeClasses = 'w-24 h-24 md:w-32 md:h-32';
  }

  return (
    <div 
      className={`absolute ${positionClasses} ${sizeClasses} rounded-full overflow-hidden shadow-lg border-4 border-white transform`}
    >
      <Image 
        src={src} 
        alt={alt} 
        layout="fill" 
        objectFit="cover" 
        // Add filter or other styling if needed for shapes vs people
        className={isShape ? 'opacity-90' : ''} // Slightly less opacity for shapes if desired, or remove
      />
    </div>
  );
};

export default CircularVisual; 