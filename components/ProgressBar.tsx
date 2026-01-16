import React from 'react';

interface ProgressBarProps {
  total: number;
  current: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
  // Calculate percentage, ensure it's at least a small visible amount
  const progress = Math.min(100, Math.max(0, ((current + 1) / total) * 100));

  return (
    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-8 backdrop-blur-sm">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;