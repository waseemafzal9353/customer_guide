import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NestedMenu({ items }) {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  return (
    <ul style={{ listStyleType: 'none' }} className="p-0">
      {items && items?.map((item, index) => (
        <>
          <li key={index} className="d-flex">
            <span>
              {index + 1}
              .
            </span>
            <div onClick={() => handleClick(item)} className="ms-2">
              {/* {console.log(first)} */}
              <Link to={`${item?.slug}`}>{item.title}</Link>
            </div>
          </li>
          <li className="ps-3">
            {activeItem === item && item.child && item.child.length > 0 && (
            <NestedMenu items={item.child} />
            )}
          </li>
        </>
      ))}
    </ul>
  );
}
