import { FunctionComponent } from "react";
import { Card, Col } from "react-bootstrap";

interface CardProps {
  title: string;
  content: string;
}

const CardItem: FunctionComponent<CardProps> = ({ content, title }) => {
  return (
    <Col className="col-xs-12 col-md-6">
      <Card className="card">
        <span className="spanLine"></span>
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Title className="title">
            <h2> {title}</h2>
          </Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardItem;
