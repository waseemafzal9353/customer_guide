/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import arrowDown from '../images/arrow_down_ckb.svg';
import SearchBar from './SearchBar';
import NestedMenu from './NestedLinks';
import findObjectBySlug from './helper';
import { useCkbData } from './ContextApi/CkbContextProvider';

export default function Sidebar() {
  const { apiData, loading } = useCkbData();
  const [expand, setExpand] = useState(true);
  const [menuExpand, setMenuExpand] = useState(true);
  const { slug } = useParams();
  const childData = apiData?.child;
  let tableData;
  let tableOfContent = [];
  if (slug && childData) {
    tableData = findObjectBySlug(childData, slug);
    if (tableData) {
      tableOfContent = tableData?.tagwise_data.filter((data) => data?.tag === 'h2' || data?.tag === 'h3');
    }
  }
  console.log("tableOfContent")
  return (
    <div className="sidebar">
      <SearchBar />
      {loading === false
    && (
      tableOfContent?.length === 0 && slug === undefined ? (<div />) : (
        <div className="">
          <button className="bg-body border-0" type="button" onClick={() => setExpand(!expand)}>
            <div className="d-flex">
              <p className="mt-3">Table of Contents</p>
              <img src={arrowDown} alt="no data" />
            </div>
          </button>
          <div style={{ display: expand ? 'block' : 'none' }}>
            {tableData && Object.keys(tableData).length > 0 && (<Link to={slug} className="ps-2">{tableData.title}</Link>)}
            {tableOfContent?.map((textContent) => (
              <ul className="m-0 text-start" style={{ listStyleType: 'none' }}>
                <li>
                  <a href={`#${textContent.id}`} className="mt-5 text-start" dangerouslySetInnerHTML={{ __html: textContent?.text }} />
                </li>
              </ul>
            ))}
          </div>
        </div>
      )
    )}
      <div className="mx-2" style={{ display: expand ? 'block' : 'none' }}>
        <a href={`${childData?.slug}`} className="">
          <span className="text-primary">{childData?.title}</span>
        </a>
      </div>
      {tableOfContent?.length === 0 && slug === undefined
        ? (<p className="mt-5 mb-4">Recommended Topics</p>) : (
          <button className="bg-body d-flex align-items-center mt-5 border-0 p-0 mb-3" type="button" onClick={() => setMenuExpand(!menuExpand)}>
            <p className="m-0">Menu</p>
            <img src={arrowDown} alt="no data" />
          </button>
        )}
      <div style={{ display: menuExpand ? 'flex ' : 'none', marginTop: menuExpand ? '0rem' : 'none' }}>
        <NestedMenu items={childData} />
      </div>
    </div>
  );
}
