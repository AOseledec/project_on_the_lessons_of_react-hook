import React, { useEffect, useState } from 'react';
import BackendErrorMessages from './backendErrorMessages';

const ArticleForm = ({onSubmit, errors, initialValues}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({title, body, description, tagList: tagList.split(' ')});
  }

  useEffect(() => {
    if (!initialValues) return

    const {title, body, description, tagList} = initialValues;

    setTitle(title);
    setDescription(description);
    setBody(body);
    setTagList(tagList.join(' '));
  }, [initialValues]);

  return (
    <>
      <div className='aditor-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-xs-12'>
              {errors && <BackendErrorMessages backendErrors={errors} />}
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      placeholder='Article title'
                      type='text'
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      placeholder='What is this article about'
                      type='text'
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      />
                  </fieldset>
                  <fieldset className='form-group'>
                    <textarea
                      className='form-control'
                      placeholder='Write your article (in markdown)'
                      rows='8'
                      value={body}
                      onChange={e => setBody(e.target.value)}
                    ></textarea>
                  </fieldset>
                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      placeholder='Enter tags'
                      type='text'
                      value={tagList}
                      onChange={e => setTagList(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className='form-group'>
                    <button
                      type='submit'
                      className='btn btn-lg pull-xs-right btn-primary'>
                      Publish article
                    </button>
                  </fieldset>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleForm