import React, { useState, useEffect, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const ProjectCard = ({ value }) => {
  const { name, description, imgUrl, mainText } = value;
  return (
    <Col md={6}>
      <Card className="card shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Card.Title as="h5">{name || <Skeleton />} </Card.Title>
          <Card.Text>
            {!description ? "" : description || <Skeleton count={3} />}{" "}
          </Card.Text>
          <Card.Text
            style={{
              display: "block",
              marginBottom: "10px",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            한 줄 회고 : {mainText}
          </Card.Text>
          <img
            src={imgUrl}
            style={{
              width: "100%",
              maxHeight: "277px",
              objectFit: "cover",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></img>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProjectCard;
