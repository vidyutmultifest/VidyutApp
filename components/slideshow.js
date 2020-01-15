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
        <div className="slideshow-card card-shadow p-0">
            <Carousel
                autoplay
                transitionMode="scroll3d"
                autoplayReverse
                autoplayInterval={6000}
                wrapAround
            >
                {
                    data && data.length > 0 ?
                        data[0].slides.map(s =>
                            <a href={s.link ? s.link : null}>
                                <img src={s.image} />
                            </a>
                        )
                    : null
                }
            </Carousel>
        </div>
    );
};

export default Slideshow;