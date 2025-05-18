import React from "react";
import Header from "./components/Header";
import { TypographyP } from "./components/Typography/TypographyP";
const Home = () => {
  return (
    <div>
      <Header />
      <div className="my-3 mx-auto">
        <TypographyP>
          Plan your project. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ad veniam, sit sint explicabo aliquid porro aperiam iste hic,
          mollitia voluptatem dolor laboriosam optio dolores quibusdam. Porro
          architecto velit illum mollitia.
        </TypographyP>
      </div>
    </div>
  );
};

export default Home;
