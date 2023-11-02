import React from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from './constants';
import useFetch from './useFetch';
import Footer from '../Footer';
import Header from '../Header';
import Sidebar from './Sidebar';
import CkbPages from './CkbPages';
import findObjectBySlug from './helper';
import { useCkbData } from './ContextApi/CkbContextProvider';
import Loader from '../vendorRequest/Loader';
import CkbPagination from './CkbPagination';

export default function CustomerKnowledgeBase() {
  const { slug } = useParams();
  const homeContentUrl = `${API_BASE_URL}/api/v2/pages/?type=cms.CustomPage&slug=customer-knowledgebase&fields=body`;
  const homeContent = useFetch(homeContentUrl);
  const sluggifiedHomeContent = { ...homeContent };
  if (sluggifiedHomeContent.data) sluggifiedHomeContent.data.items[0].slug = null;

  const urlPath = window.location.pathname;
  const pageData = [];
  const { apiData, loading } = useCkbData();

  if (urlPath.includes(slug)) {
    const tree = apiData?.child;
    const slugData = findObjectBySlug(tree, slug);
    if (slugData) {
      pageData.push(slugData);
    }
  }

  return (
    <>
      <Header />
      {
      loading === true ? <Loader />
        : (
          <>
            <div className="marginedContainer grid-page mx-2">
              <Sidebar />
              <CkbPages data={urlPath.includes(slug) ? pageData : homeContent?.data?.items} />
            </div>
            <CkbPagination />
            <Footer />
          </>
        )
      }
    </>

  );
}
