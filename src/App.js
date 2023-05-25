import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import {LINES_API} from "./config";
import ClientPage from "./components/ClientPage/ClientPage";

const App = () => {
    const [lines, setLines] = useState([])
    const getLines = () => {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        fetch(LINES_API, {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(json => {
                setLines(json)
            })
            .catch(error => console.log('Authorization failed: ' + error.message));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getLines()
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 60000,
        cssEase: "linear"
    };
    return (
        <Slider {...settings}>
            {lines.map((el,index)=>{
                return(
                    <ClientPage key={index} el={el._id}/>
                )
            })}
        </Slider>
    );
};

export default App;