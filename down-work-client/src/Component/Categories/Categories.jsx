import React, { use, useEffect, useState } from "react";

import Category from "./Category";
import useAxios from "../../hooks/useAxios";



const Categories = () => {
  const axios = useAxios()
  const [categoriesData, setCategoriesData] = useState([])

  useEffect(() => {
    axios.get('/category')
    .then(result => {
      //console.log(result.data)
      setCategoriesData(result.data)
    })
  },[])
  
  //console.log(categoriesData)

  return (
    <div className="max-w-360 py-20 sm:py-25 mx-auto">
      <h2 className="group text-2xl sm:text-3xl text-center font-bold mb-10 sm:mb-15">Categor<span className="group-hover:text-primary">i</span>es</h2>
      <div className="w-8/10 grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-6 text-center mx-auto items-stretch">
      {categoriesData?.map((category) => <Category key={category._id} category={category}></Category>)}
    </div>
    </div>
  );
};

export default Categories;
