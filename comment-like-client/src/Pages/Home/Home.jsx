import React from 'react';
import Feed from '../Feed/Feed';
import Navbar from '../../component/Navbar';


const Home = () => {

    return (
        <div>
            <Navbar></Navbar>
            {/* this is Home */}
            <Feed></Feed>
        </div>
    );
};

export default Home;