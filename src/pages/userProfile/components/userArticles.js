import React, { useEffect } from 'react';
import {stringify} from 'query-string';

import {getPaginator, limit} from '../../../utils';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/loading';
import ErrorMessage from '../../../components/errorMessage';
import Pagination from '../../../components/pagination';
import Feed from '../../../components/feed';

const getApiUrl = ({username, offset, isFavorites}) => {
  const params = isFavorites
    ? {limit, offset, favorited: username}
    : {limit, offset, author: username}
  return `/articles?${stringify(params)}`;
}

const UserArticles = ({username, location, isFavorites, url}) => {
  const {offset, currentPage} = getPaginator(location.search);
  let apiUrl = getApiUrl({username, offset, isFavorites});
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);

  return (
    <>
      {isLoading && <Loading/>}
      {error && <ErrorMessage/>}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles}/>
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  )
}

export default UserArticles;