import React, { use } from "react";

import Category from "./Category";

const categoriesPromise = fetch("/categories.json").then((res) => res.json());

const Categories = () => {
  const categoriesData = use(categoriesPromise);
  //console.log(categoriesData)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10 text-center max-w-360 mx-auto my-36">
      {categoriesData.map((category) => <Category key={category.id} category={category}></Category>)}
    </div>
  );
};

export default Categories;
