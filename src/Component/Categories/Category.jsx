import React from 'react';
import {
  FaCode,
  FaLaptopCode,
  FaPenNib,
  FaChartLine,
  FaBullhorn,
  FaCalculator,
  FaUsers,
  FaHeadset
} from "react-icons/fa";
import { Link } from 'react-router';

const icons = {
  FaCode: FaCode,
  FaLaptopCode,
  FaPenNib,
  FaChartLine,
  FaBullhorn,
  FaCalculator,
  FaUsers,
  FaHeadset
};

const Category = ({category}) => {
    const jobs = category.jobs
    //console.log(jobs[0])
         const Icon = icons[category.icon];
        return (
          <Link to={`/category/${category.id}`}>
            <div key={category.id} className="group p-4 max-w-70  h-full hover:bg-primary hover:text-white hover:shadow-blue-300 hover:shadow-lg shadow-sm mx-auto">
            <Icon className="mx-auto text-3xl text-primary group-hover:text-white" />
            <p className='text-md sm:text-lg mt-4 font-semibold'>{category.name}</p>
            <p className='text-sm sm:text-md text-gray-400 group-hover:text-gray-100 p-3'>
                {jobs[0]}, {jobs[1]}, {jobs[2]} and more jobs
            </p>
          </div>
          </Link>
        );

};

export default Category;