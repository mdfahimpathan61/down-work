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
          <Link to={`/jobs/${category.id}`}>
            <div key={category.id} className="px-4 py-6 max-w-70  h-full hover:bg-primary hover:text-white hover:shadow-blue-400 hover:shadow-lg shadow-md mx-auto">
            <Icon className="mx-auto text-3xl" />
            <p className='text-lg mt-4 font-semibold'>{category.name}</p>
            <p className='text-gray-400 hover:text-gray-100 p-3'>
                {jobs[0]}, {jobs[1]}, {jobs[2]} and more jobs
            </p>
          </div>
          </Link>
        );

};

export default Category;