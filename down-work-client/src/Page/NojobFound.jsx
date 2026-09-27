import React from 'react';
import noJobImg from '/nojob.png'
 
const NojobFound = () => {
    return (
        <div className='h-screen'>
            <img className='mx-auto w-3/4 sm:w-2/5 mt-7 ' src={noJobImg} alt="" />
            
        </div>
    );
};

export default NojobFound;