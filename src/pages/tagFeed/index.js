import React, { useEffect } from 'react';
import { stringify } from 'query-string'; 

import useFetch from '../../hooks/useFetch';
import Feed from '../../components/feed';
import Pagination from '../../components/pagination';
import { getPaginator, limit } from '../../utils';
import PopularTags from '../../components/popularTags';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import FeedToggler from '../../components/feedToggler';

const TagFeed = ({location, match}) => {
  const {offset, currentPage} = getPaginator(location.search)
  const tagName = match.params.slug;
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName
  })
  const apiUrl = `/articles?${stringifiedParams}`
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const { url } = match;

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="contaier">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles}/>
                <Pagination
                  total={response.articlesCount}
                  currentPage={currentPage}
                  limit={limit}
                  url={url}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>

  );
}

export default TagFeed;

