import React, { Suspense } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import Banner from '../Component/Banner/Banner';
import Categories from '../Component/Categories/Categories';
import Featuredjob from '../Component/Featuredjobs/Featuredjobs';
import Loading from '../Component/Loading';

const HomeLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
                <Banner></Banner>
            </header>

            <main>
                <section id='categories'>
                    <Suspense fallback={<Loading></Loading>}>
                        <Categories></Categories>
                    </Suspense>
                </section>
                <section>
                    <Featuredjob></Featuredjob>
                </section>
            </main>
            
        </div>
    );
};

export default HomeLayout;