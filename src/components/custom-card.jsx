import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

export default function CustomCard({text, subtext, buttonClick, buttonTitle}){
  return (
    <Card className=" w-75 align-self-center">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={8} md={9}>
            <h5 className="card-title" style={{ marginBottom: 0 }}>{text}</h5>
            <small className="sub-text" style={{ marginTop: 0 }}>{subtext}</small>
          </Col>
          <Col>
            <Button onClick={buttonClick} className="float-sm-end">{buttonTitle}</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};