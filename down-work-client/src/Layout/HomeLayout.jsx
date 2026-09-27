import React, { Suspense, useContext, useEffect } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import Banner from '../Component/Banner/Banner';
import Categories from '../Component/Categories/Categories';
import Featuredjob from '../Component/Featuredjobs/Featuredjobs';
import Loading from '../Component/Loading';
import { useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Footer from '../Component/Footer';

const HomeLayout = () => {
    const {loading} = useContext(AuthContext)
    const location = useLocation()
    useEffect(() => {
        if(location.hash == "#categories"){
            document.getElementById("categories")?.scrollIntoView({
                behavior:'smooth'
            }
                
            )
        }
    },[location])

    return (
        <>
         
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

            
            <footer>
                <Footer></Footer>
            </footer>
            
        </div>

        </>
    );
};

export default HomeLayout;