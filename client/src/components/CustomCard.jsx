import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import React from "react";

const CustomCard = ({ title, children, restStyles }) => {
  return (
    <Card
      marginBottom={2}
      marginX={{ base: 2, md: 0 }}
      variant="elevated"
      borderRadius={10}
    >
      {title && (
        <CardHeader>
          <Heading size="sm">{title}</Heading>
        </CardHeader>
      )}

      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CustomCard;
