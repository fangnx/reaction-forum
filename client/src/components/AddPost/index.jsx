import React from 'react';
import {
  Image,
  Label,
  Card,
  Form,
  Segment,
  TextArea,
  Input
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddPost.css';

class AddPost extends React.Component {
  render() {
    return (
      <div className="addPost-wrapper">
        <Card className="addPost-card" fluid>
          <Card.Header className="addPost-card-header">
            <Label as="a" color="blue" size="large" image>
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
                <Input id="title" />
              </Form.Field>

              <Form.Field>
                <Label size="large" style={{ marginBottom: '20px' }}>
                  Content
                </Label>
                <TextArea id="content" placeholder="..." rows="12" />
              </Form.Field>

              <Form.Field>
                <Label size="large">Tags</Label>
                <Input id="tags" />
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default AddPost;
