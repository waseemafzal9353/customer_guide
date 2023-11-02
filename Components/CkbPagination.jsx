/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCkbData } from './ContextApi/CkbContextProvider';
import arrowleft from '../images/arrow_left_ckb.svg';
import arrowright from '../images/arrow_right_ckb.svg';

function CkbPagination() {
  const { apiData, loading } = useCkbData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dataArray = apiData.child;

  // Function to handle "next" button click
  const handleNext = () => {
    if (!isEndOfArray()) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to handle "previous" button click
  const handlePrevious = () => {
    if (!isStartOfArray()) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isStartOfArray = () => currentIndex === 0;
  const isEndOfArray = () => currentIndex === dataArray.length - 1;

  return (
    <div className="d-flex justify-content-end pe-5 mb-4 mt-3">
      <div className="d-flex justify-content-between pe-5 w-75">
        <div className="d-flex align-items-center">
          <img src={arrowleft} alt="no data" />
          <Link
            to={isStartOfArray() ? '#' : dataArray[currentIndex - 1].slug}
            onClick={handlePrevious}
          >
            Prev. Topic -
          </Link>
          <p className="m-0 text-primary ps-1">
            {isStartOfArray() ? '' : (
              `${dataArray[currentIndex - 1].title}`
            )}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <p className="m-0 text-primary pe-1">
            {isEndOfArray() ? ''
              : (
                `${dataArray[currentIndex + 1].title}`
              )}
          </p>
          <Link
            to={isEndOfArray() ? '#' : dataArray[currentIndex + 1].slug}
            onClick={handleNext}
          >
            - Next Topic
          </Link>
          <img src={arrowright} alt="no data" />

        </div>
      </div>
      <div />
    </div>
  );
}

export default CkbPagination;
