import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post';
import ReactHtmlParser from 'react-html-parser';

const Post = ({ getPostById, post: { post, loading }, match }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, post]);

  return loading ? (
    <h1>loading</h1>
  ) : (
    <Fragment>
      <div className='sticky-container'>
        <div className='navigation'>
          <div className='navigation-assets'>
            <div className='nav-bar-logo'>
              <h4>
                <a href='www.google.com'>SoftwareSensei.com</a>
              </h4>
            </div>
            <div className='nav-bar-right'>
              <ul>
                <li>
                  <a href='www.google.com'>Courses</a>
                </li>
                <li>
                  <a href='www.google.com'>Reviews</a>
                </li>
                <li>
                  <a href='www.google.com'> Resources</a>
                </li>
                <li>
                  <a href='www.google.com'>Login</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='article-container'>
          <div className='blog-article'>
            <div className='article-headline'>
              <h1>{post.title}</h1>
              <h5>
                This is the core imporant thing that we're talking about this
                week.
              </h5>
            </div>
            <div className='blog-video'>
              <iframe
                src='https://player.vimeo.com/video/425247590'
                width='100%'
                height='100%'
                allow='autoplay; fullscreen'
                allowfullscreen
              ></iframe>
            </div>
            <div className='article'>
              <h5>summary</h5>
              {ReactHtmlParser(post.post)}
            </div>
            <div className='blog-comments'></div>
          </div>

          <div className='promotion-container'>
            <div className='promotion-box'>
              <h3>
                Learn to program and get your first sofware job in 12 months.
                months.
              </h3>
              <p>
                If you're looking to learn skills to start your career as a
                software developer - attend my free software workshop by
                clicking the button below.
              </p>
            </div>
            <div className='free-trial'>
              <button>Start free trial</button>
            </div>
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
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostById })(Post);
