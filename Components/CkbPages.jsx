import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import categories from './categories.json';

export default function CkbPages({ data }) {
  let slugValue;
  if (data) {
    slugValue = data[0].slug;
  }
  const idFromUrl = window.location.hash.substring(1);
  const targetRef = useRef(null);
  let paraId;
  useEffect(() => {
    if (idFromUrl && targetRef) {
      const targetData = data[0]?.tagwise_data?.find(
        (content) => content?.id === Number(idFromUrl));
      console.log('targetData', targetData, idFromUrl, slugValue);
      if (targetData) {
        data[0]?.tagwise_data?.map((content) => paraId = content.id);
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [data, idFromUrl]);
  console.log('targetRef', targetRef);
  return (
    <div className="">
      {
          slugValue === null ? (
            <div className="overflow-scroll scrollbar-ckb">
              <div>
                {data?.map((content) => (
                  <div>
                    <h2 className="text-start mt-0 fw-bold display-5">
                      {content.title}
                    </h2>
                    {/* eslint-disable-next-line react/no-danger */}
                    <div className="mt-5 text-start" dangerouslySetInnerHTML={{ __html: content.body }} />
                  </div>
                ))}
              </div>
              <div className="mt-5 mb-5">
                <h6 className="text-start popular-category-text fs-2">POPULAR CATEGORIES</h6>
                <div className="row mx-1 mt-5">
                  {categories?.map((category) => (
                    <div className="col-3 pt-2 mx-2 border" key={category.title}>
                      <p className="fs-5 ckm-category-text">{category.title}</p>
                      <div className="mx-3">
                        <p className="mb-0 ckm-category-text">
                          <Link to="/">
                            {category.descriptionLink1}
                          </Link>
                        </p>
                        <p className="mb-2 ckm-category-text">
                          <Link to="/">{category.descriptionLink2}</Link>
                        </p>
                        <p className="mb-4 ckm-category-text">
                          <Link to="/">{category.descriptionLink2}</Link>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
            : (
              <div className="overflow-scroll scrollbar-ckb">
                <div>
                  {data?.map((content) => (
                    <div ref={paraId === idFromUrl ? targetRef : null}>
                      <h2 className="text-start mt-5 fw-bold display-5">
                        {content?.title}
                      </h2>
                      <div className="mt-5 " dangerouslySetInnerHTML={{ __html: content.body }} />
                    </div>
                  ))}
                </div>
              </div>
            )
      }
    </div>
  );
}
