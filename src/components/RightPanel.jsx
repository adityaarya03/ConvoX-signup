import React from 'react'

export default function RightPanel({ children }) {
  return (
    <div className="md:w-1/3 w-2/3 bg-white flex flex-col justify-center items-center mx-[3em] px-16 py-20">
      {children}
    </div>
  );
}