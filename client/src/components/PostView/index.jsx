import React from 'react';
import PropTypes from 'prop-types';
import { Image, Label, Card, Grid } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostView.css';

class PostView extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="postView-wrapper">
        <Card className="postView-card" fluid>
          <Card.Header className="post-card-header">
            <Label as="a" size="large" image>
              <Image src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
              <span>
                {this.props.author} &nbsp;&nbsp;
                {/* <i class="france flag" /> */}
              </span>
            </Label>
          </Card.Header>

          <Card.Content className="postView-card-content">
            <Grid padded className="postView-card-grid">
              <Grid.Row>{this.props.title}</Grid.Row>
              <Grid.Row>{this.props.content}}</Grid.Row>
              <Grid.Row>{this.props.likeCount}</Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
export default PostView;

PostView.propTypes = {
  title: String
};
