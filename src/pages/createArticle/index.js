import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import ArticleForm from '../../components/articleForm';
import { CurrentUserContext } from '../../contexts/currentUser';
import useFetch from '../../hooks/useFetch';

const CreateArticle = () => {
  const apiUrl = '/articles'
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const handleSubmit = article => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    if (!response) return
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === false) return <Redirect to='/' />;
  if (isSuccessfullSubmit) return <Redirect to={`/articles/${response.article.slug}`} />;

  return (
    <>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default CreateArticle;