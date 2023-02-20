import React, { useEffect, useState } from 'react';

const Van = () => {
  const [int, setInt] = useState(0);
  const increase = () => {
    setInt(int + 1);
  };
  return (
    <>
      <div>
        <button onClick={increase}>{int}</button>
      </div>
    </>
  );
};

export default Van;
