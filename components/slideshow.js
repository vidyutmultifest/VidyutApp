import React, {useEffect, useState} from "react";
import Carousel from 'nuka-carousel';
import dataFetch from "../utils/dataFetch";

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
        <div className="slideshow-card card-shadow">
            <Carousel>
                {
                    data && data.length > 0 ?
                        data[0].slides.map(s =>
                            <img src={s.image} />
                        )
                    : null
                }
            </Carousel>
        </div>
    );
};

export default Slideshow;