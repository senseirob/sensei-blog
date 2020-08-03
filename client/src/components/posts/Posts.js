import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import react_image from '../../images/react.png';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      {loading ? (
        <h1> loading </h1>
      ) : (
        <div className='sticky-container'>
          <div className='navigation'>
            <div className='navigation-assets'>
              <div className='nav-bar-logo'>
                <h4>SoftwareSensei.com</h4>
              </div>
              <div className='nav-bar-right'>
                <ul>
                  <li>Courses</li>
                  <li>Reviews</li>
                  <li>Resources</li>
                  <li>Login</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='blog_banner'>
            <h1>Resources</h1>
            <p>
              From blog videos to productivity tools, customer interviews and
              livestream Q&A's. Here you'll find resources that help you start
              and grow a wildly profitable business.
            </p>
          </div>

          <div className='blog_container'>
            <div className='blog_section'>
              {posts.map((post) => (
                <div className='blog_post' key={post._id}>
                  <Link link to={`/posts/${post._id}`}>
                    <div className='blog_post_image'>
                      <img src={react_image} alt='react' />
                    </div>
                    <div className='blog_post_details'>
                      <div className='blog_post_headline'>BLOG ARTICLE</div>
                      <h5>{post.title}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className='try_us'>
            <h3>Try Software Sensei for free</h3>
            <button>Get Started Free</button>
          </div>

          <div className='footer'>
            <div className='footer_box footer_1'>
              <h5>Company</h5>
              <p>Our story</p>
              <p>Our philosophy</p>
              <p>Our company</p>
            </div>
            <div className='footer_box footer_2'>
              <h5>Courses</h5>
              <p>Methodology</p>
              <p>Zero To Developer</p>
              <p>Uplevel</p>
              <p>Mastermind</p>
            </div>
            <div className='footer_box footer_3'>
              <h5>Resources</h5>
              <p>Blog</p>
              <p>Customer Service</p>
            </div>
            <div className='footer_box footer_4'>
              <h5>Extras</h5>
              <p>Free Trial</p>
              <p>Free Webinar</p>
              <p>Free Community</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
