import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function CkbBreadCrumbs() {
  const history = useLocation();
  const [routesHistory, setRoutesHistory] = useState(JSON.parse(localStorage.getItem('sessionCKB')) || []);
  const path = history.pathname;
  const pathname = path?.split('/').filter((x) => x);

  useEffect(() => {
    if (pathname) {
      const uniqueNames = [...new Set([...routesHistory, ...pathname])];
      setRoutesHistory(uniqueNames);
      localStorage.setItem('sessionCKB', JSON.stringify(uniqueNames));
    }
  }, [path, pathname]);

  const handleRouteIndex = (name, index) => {
    const newHistory = routesHistory.slice(0, index + 1);
    localStorage.setItem('sessionCKB', JSON.stringify(newHistory));
    setRoutesHistory(newHistory);
  };

  const handleItemClick = (index) => {
    const selectedItems = routesHistory.slice(0, index + 1);
    setRoutesHistory(selectedItems);
  };

  useEffect(() => {
    localStorage.removeItem('sessionCKB');
    setRoutesHistory([]);
  }, [history]);

  return (
    <div>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href="/" className="breadcrumb-text">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/products" className="breadcrumb-text">FBA Deals Homepage</Breadcrumb.Item>
        {routesHistory.map((name, index) => (
          <Breadcrumb.Item key={name} className={`${index === routesHistory.length - 1 ? '' : 'breadcrumb-text'}`} onClick={() => handleItemClick(index)}>
            {index === routesHistory.length - 1 ? (
              `${name.charAt(0).toUpperCase() + name.slice(1)}`
            ) : (
              <Link
                to={index === 0 ? `/${name}` : `/customerknowledgebase/${name}`}
                onClick={() => handleRouteIndex(name, index)}
              >
                {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
              </Link>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default CkbBreadCrumbs;
