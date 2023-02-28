import React from "react";

import Card from "../components/Card";
import PageContent from "../components/Layout/PageContent";

const Home = () => {
  return (
    <>
      <PageContent>
        {/* LHS - Your Assets */}
        <Card title="your assets">{/* wallet contents table */}</Card>

        {/* RHS - Yields (depends on assets) */}
        <Card title="yields"></Card>
      </PageContent>
    </>
  );
};

export default Home;
