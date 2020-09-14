import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import ArticleForm from '../../components/articleForm';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/currentUser';

const EditArticle = ({match}) => {
  const {slug} = match.params;
  const apiUrl = `/articles/${slug}`;
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl);
  const [
    {
      response: updateArticleResponse,
      error: updateArticlError
    }, doUpdateArticle] = useFetch(apiUrl);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);
  const [initialValues, setInitialValues] = useState(null)

  const handleSubmit = article => {
    doUpdateArticle({
      method: 'put',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) return
    const {title, description, body, tagList} = fetchArticleResponse.article
    setInitialValues({title, description, body, tagList});
  }, [fetchArticleResponse])

  useEffect(() => {
    if (!updateArticleResponse) return
    setIsSuccessfullSubmit(true)
  }, [updateArticleResponse]);
  
  if (currentUserState.isLoggedIn === false) return <Redirect to='/' />;
  if (isSuccessfullSubmit) return <Redirect to={`/articles/${slug}`} />;

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      errors={(updateArticlError && updateArticlError.errors) || {}}
    />
  )
}

export default EditArticle;