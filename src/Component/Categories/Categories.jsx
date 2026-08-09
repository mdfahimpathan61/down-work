import React, { use } from "react";

import Category from "./Category";

const categoriesPromise = fetch("/categories.json").then((res) => res.json());

const Categories = () => {
  const categoriesData = use(categoriesPromise);
  //console.log(categoriesData)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-6 text-center max-w-360 mx-auto py-36">
      {categoriesData.map((category) => <Category key={category.id} category={category}></Category>)}
    </div>
  );
};

export default Categories;
