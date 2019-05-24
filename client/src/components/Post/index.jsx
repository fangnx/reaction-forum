import React from 'react';
import { Container, Label, Grid, Divider } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import styled from 'styled-components';
import './Post.css';

class Post extends React.Component {
  render() {
    return (
      <Container text className="post-container">
        <Grid padded className="post-grid">
          <Grid.Row>
            <Label as="a" color="blue" size="large" image>
              <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
              <span>
                YX S &nbsp;&nbsp;
                <i class="france flag" />
              </span>
              <Label.Detail>User</Label.Detail>
            </Label>
          </Grid.Row>

          <Grid.Row>
            <img
              class="post-image"
              src="https://images.unsplash.com/photo-1555508275-b5451b4c240a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            />
          </Grid.Row>

          <Grid.Row>
            <FontAwesomeIcon icon={['far', 'thumbs-up']} size="2x" />
          </Grid.Row>

          <Grid.Row>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
              elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
              leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
              Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
              Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
              ullamcorper ultricies nisi.
            </p>
          </Grid.Row>
        </Grid>

        <Divider />
      </Container>
    );
  }
}

export default Post;
