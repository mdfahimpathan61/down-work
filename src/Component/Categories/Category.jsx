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
          <div key={category.id} className="p-5 w-70 h-70 hover:bg-primary hover:text-white hover:shadow-blue-400 hover:shadow-lg shadow-md mx-auto">
            <Icon className="mx-auto text-4xl" />
            <p className='text-lg mt-4 font-semibold'>{category.name}</p>
            <p className='text-gray-400 hover:text-gray-100 p-3'>
                {jobs[0]}, {jobs[1]}, {jobs[2]} and more jobs
            </p>
          </div>
        );

};

export default Category;