import React, { Fragment, useEffect, useState, history } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById, updatePost, deletePost } from '../../actions/post';
import { Link, withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
// import CKEditor from 'react-ckeditor-component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialState = {
  title: '',
  post: '',
  author: '',
  tags: '',
  video: '',
  image: '',
};

const PostEdit = ({
  getPostById,
  updatePost,
  deletePost,
  post: { post, loading },
  match,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    getPostById(match.params.id);
    if (!loading && post) {
      const postData = { ...initialState };
      for (const key in post) {
        if (key in postData) postData[key] = post[key];
      }
      setFormData(postData);
    }
  }, [getPostById, post]);

  const { title, _post, author, tags, video, image } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeCKEditor = (e, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      post: data,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updatePost(formData, history, match.params.id);
  };

  const onDeletePost = (e) => {
    // e.preventDefault();
    deletePost(history, match.params.id);
  };

  return loading ? (
    <h1>loading</h1>
  ) : (
    <Fragment>
      <div className='blog-container'>
        <div className='additional-container'>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* <!--  --> */}
            <div className='blog-section headline-section'>
              <div className='headline-left'>
                <h1>Create a new blog article</h1>
              </div>
              <div className='headline-right'>
                <Link link to='/dashboard'>
                  <button>Back</button>
                </Link>
              </div>
            </div>
            {/* <!-- Title --> */}
            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Title</h3>
              </div>
              <div className='blog-section-body'>
                <textarea
                  name='title'
                  value={title}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
            {/* <!-- Post --> */}
            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Post</h3>
              </div>
              <div className='blog-section-body'>
                <CKEditor
                  id='blog-body'
                  name='post'
                  data={_post}
                  // data={formData.post}
                  editor={ClassicEditor}
                  onChange={onChangeCKEditor}
                />
              </div>
            </div>
            {/* <!-- Tags --> */}
            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Tags</h3>
              </div>
              <div className='blog-section-body'>
                <textarea
                  name='tags'
                  value={tags}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
            {/* <!-- Video --> */}
            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Video URL</h3>
              </div>
              <div className='blog-section-body'>
                <textarea
                  name='video'
                  value={video}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
            {/* <!-- Image --> */}
            <div className='blog-section'>
              <div className='blog-section-headline'>
                <h3>Image</h3>
              </div>
              <div className='blog-section-body'>
                <textarea
                  name='image'
                  value={image}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
            {/* <!--  --> */}
            <div className='blog-footer'>
              <div className='edit-left'>
                <h3>
                  <p onClick={(e) => onDeletePost(e)}>delete</p>
                </h3>
              </div>
              <div className='edit-right'>
                <input type='submit' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

PostEdit.propTypes = {
  getPostById: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  updatePost,
  getPostById,
  deletePost,
})(withRouter(PostEdit));
