import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";

import Slider from "react-slick";
import "../../styles/common/slideshow.sass";

const Slideshow = ({ feedSlug }) => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);

    const query = `{
      viewSlides(slug: "${feedSlug}")
      {
        name
        slides
        {
          image
          link
        }
      }
    }`;

    const getSlides = async () => await dataFetch({ query });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    };

    useEffect(() => {
        if(!isQueried)
        {
            getSlides().then(  response => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.viewSlides);
                }
            })
        }
    });

    return (
        <div className="slideshow-component">
            <Slider {...settings}>
                {
                    data && data.length > 0 ?
                        data[0].slides.map(s =>
                            <a className="slide" href={s.link ? s.link : null}>
                                <img src={s.image} />
                            </a>
                        )
                        : null
                }
            </Slider>
        </div>
    )

};

export default Slideshow;