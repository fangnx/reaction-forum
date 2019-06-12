import React from 'react';
import {
  Image,
  Label,
  Card,
  Form,
  Segment,
  TextArea,
  Input,
  Button
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddPost.css';
import dateFormat from 'dateformat';
import { addPost } from '../../actions/postService';

class AddPost extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      author: 'f',
      timeStamp: '',
      tags: []
    };
  }

  onChange = (e, data) => {
    this.setState({ [data.id]: data.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newPost = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author,
      timeStamp: dateFormat(new Date(), 'isoDateTime'),
      tags: this.state.tags,
      viewCount: 0,
      likeCount: 0
    };

    addPost(newPost);
    console.log('!');
  };

  render() {
    return (
      <div className="addPost-wrapper">
        <Card className="addPost-card" fluid>
          <Card.Header className="addPost-card-header">
            <Label as="a" color="teal" size="large" image>
              <Image src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
              <span>
                Yuxi Shi &nbsp;&nbsp;
                <i class="france flag" />
              </span>
              <Label.Detail>User</Label.Detail>
            </Label>
          </Card.Header>

          <Card.Content className="addPost-card-content">
            <Form className="addPost-form">
              <Form.Field>
                <Label size="large">Title</Label>
                <Input
                  id="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </Form.Field>

              <Form.Field>
                <Label size="large" style={{ marginBottom: '20px' }}>
                  Content
                </Label>
                <TextArea
                  id="content"
                  value={this.state.content}
                  onChange={this.onChange}
                  placeholder="Write whatever you want ;)"
                  rows="12"
                />
              </Form.Field>

              <Form.Field>
                <Label size="large">Tags</Label>
                <Input
                  id="tags"
                  value={this.state.tags}
                  onChange={this.onChange}
                />
              </Form.Field>

              <Form.Field
                as={Button}
                className="addPost-button"
                disabled={false}
                onClick={this.onSubmit}
                animated="vertical"
                size="big"
                primary
              >
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  <FontAwesomeIcon icon={['fas', 'check']} size="1x" />
                </Button.Content>
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default AddPost;
