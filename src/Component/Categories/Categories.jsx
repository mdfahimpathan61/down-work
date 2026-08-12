import React, { use } from "react";

import Category from "./Category";

const categoriesPromise = fetch("/categories.json").then((res) => res.json());

const Categories = () => {
  const categoriesData = use(categoriesPromise);
  //console.log(categoriesData)

  return (
    <div className="max-w-360 py-25 ">
      <h2 className="group text-xl sm:text-3xl text-center font-bold mb-15">Categor<span className="group-hover:text-primary">i</span>es</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-6 text-center mx-auto items-stretch">
      {categoriesData.map((category) => <Category key={category.id} category={category}></Category>)}
    </div>
    </div>
  );
};

export default Categories;
