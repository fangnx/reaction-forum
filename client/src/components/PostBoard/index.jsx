import React from 'react';
import {
  Image,
  Label,
  Card,
  Form,
  TextArea,
  Input,
  Button,
  Segment,
  Icon
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostBoard.css';
import { getAllPosts } from '../../actions/postService';

class PostBoard extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    getAllPosts().then(res => {
      console.log(res.data);
      if (res.data) {
        this.setState({ posts: [] });
      }
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="postView-wrapper">
        <Card>{posts}</Card>
      </div>
    );
  }
}

export default PostBoard;
