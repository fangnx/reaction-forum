import React from "react";
import { Container, Label, Image, Grid } from "semantic-ui-react";

class Post extends React.Component {
  render() {
    return (
      // <Container fluid>
        <Grid>
          <Grid.Row width={2}>
            <Label as="a" color="blue" size="large" image>
              <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
              <span>
                Claire He &nbsp;&nbsp;
                <i class="france flag" />
              </span>
              <Label.Detail>User</Label.Detail>
            </Label>
          </Grid.Row>

          <Grid.Row width={14}> 
            <Image
              src="https://images.unsplash.com/photo-1555508275-b5451b4c240a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              size="large"
            />
          </Grid.Row>
        </Grid>
      // </Container>
    );
  }
}

export default Post;
