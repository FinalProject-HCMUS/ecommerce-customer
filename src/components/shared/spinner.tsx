import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
};

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader
        color="#4338ca"
        loading={true}
        cssOverride={override}
        size={70}
      />
    </div>
  );
};

export default Spinner;
