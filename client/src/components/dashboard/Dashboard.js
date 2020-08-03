import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const Dashboard = ({
  post: { posts, loading },
  getPosts,
  auth: { isAuthenticated },
  logout,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <h1>loading</h1>
  ) : (
    <Fragment>
      <div className='dashboard-container'>
        <div className='dashboard-header'>
          <div className='header-left'>
            <h1>Blog Articles</h1>
          </div>
          <div className='header-right'>
            <button>
              <Link to='/create-post'>Add article</Link>
            </button>
            <a onClick={logout} href='#!'>
              Logout
            </a>
          </div>
        </div>
        <div className='dashboard-body'>
          <table id='articles'>
            <tbody>
              <tr>
                <th>Article Name</th>
                <th>Date Published</th>
                <th>Tags</th>
                <th>Edit</th>
              </tr>

              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>
                    <Moment format='MM/DD/YYYY'>{post.date}</Moment>
                  </td>
                  <td>{post.tags}</td>
                  <td>
                    <Link link to={`/edit-post/${post._id}`}>
                      <a href='#!'>edit</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { logout, getPosts })(Dashboard);
