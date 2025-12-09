"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false, 
});

interface JoditWrapperProps {
  value: string;
  config: object;
  onChange: (value: string) => void;
}

const JoditWrapper: React.FC<JoditWrapperProps> = ({ value, config, onChange }) => {
  return (
    <JoditEditor
      config={config}
      value={value}
      onChange={onChange}
      className="jodit-container" 
    />
  );
};

export default JoditWrapper;