import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from './constants';

export default function SearchBar() {
  const [searchIndex, setSearchIndex] = useState();
  const [showSearchData, setShowSearchData] = useState(false);
  const [showSearchSlug, setShowSearchSlug] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [errors, setErrors] = useState('');

  const handleSearchSlug = (data) => {
    setSearchIndex(data.title);
    setShowSearchSlug(true);
    localStorage.setItem('searchBool', JSON.stringify(true));
    localStorage.setItem('allCkbChilds', JSON.stringify(data));
  };

  const handleSearchBar = (e) => {
    const searchItem = e.target.value;
    if (searchIndex && !e.target) {
      setShowSearchData(false);
    }
    fetch(
      `${API_BASE_URL}/search/${searchItem}`,
    )
      .then((response) => (response?.json())).then((res) => {
        setSearchSuggestions(res);
      }).catch((error) => {
        if (!errors) {
          setErrors(error);
        }
      });
  };

  return (
    <div className="position-relative w-75">
      <input
        id="nickname"
        autoComplete="off"
        placeholder="Search Topic"
        value={searchIndex}
        defaultValue={searchIndex}
        onChange={(e) => {
          handleSearchBar(e);
          setSearchIndex(e.target.value);
          setShowSearchData(true);
          //   setIsNext(false);
          //   setShowCrumbsData(false);
        }}
        className="form-control w-100 ckm-search-style mt-2 form-placeholder p-2 rounded-0"
        name="WarehouseNickName"
      />
      {showSearchData && (
      <div className={searchSuggestions.length > 1 ? 'search-prediction scrollbar-ckb border-0 overflow-auto' : 'search-prediction scrollbar-ckb border-0 h-auto overflow-auto'}>
        {searchSuggestions?.slice(0, 5)?.map((searchData) => (
          <button
            key={searchData.slug}
            type="button"
            className="bg-body w-100 border-0 px-0 mx-0"
            onClick={() => {
              handleSearchSlug(searchData);
              localStorage.setItem('showCrumbsData', JSON.stringify(true));
              localStorage.setItem('isNext', JSON.stringify(true));
              //   setShowCrumbsData(true);
              //   setIsNext(false);
            }}
          >
            <div className="w-100 border overflow-hidden px-0">
              <Link to={`${searchData?.slug}`} style={{ maxHeight: '113px' }}>

                <p className="text-start  w-100 mb-0 text-primary  mt-1 fs-5 px-2">{searchData.title}</p>
                {/* <hr className="dropdown-divider w-100 p-0 m-0" /> */}
                <div className=" px-2">
                  {/* eslint-disable-next-line react/no-danger */}
                  {/* <span className="text-start w-100 mt-0 text-secondary" dangerouslySetInnerHTML={{ __html: searchData.body }} /> */}
                </div>
              </Link>
            </div>

          </button>
        ))}
      </div>
      )}
    </div>
  );
}
