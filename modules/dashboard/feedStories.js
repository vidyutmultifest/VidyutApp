import React, {useEffect, useState} from "react";
import dataFetch from "../../utils/dataFetch";
import StoryViewer from "../../components/dashboard/StoryViewer";
const moment = require('moment');


const FeedStories = () => {

    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState();

    const query = `{
      viewStories
      {
        name
        stories
        {
          id
          image
          created
          link
        }
      }
    }`;

    const getStories = async () => await dataFetch({ query });


    useEffect(() => {
        if(!isQueried)
        {
            getStories().then((response) =>{
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
                    setData(response.data.viewStories);
                    setLoaded(true);
                }
            })
        }
    });

    const getFeedData = () => {
        const feeds = [];

        data.map( f => {
            const stories = [];
            f.stories.map(s => {
                stories.push([
                    s.id,
                    "photo",
                    5,
                    s.image,
                    s.image,
                    s.link ? s.link : '',
                    s.link ? 'View More' : false,
                    '',
                    moment(s.created).toDate() / 1000
                ])
            });
            feeds.push({
                id: f.name,
                name: f.name,
                cover: f.stories[0].image,
                stories: stories
            });
        });
        return feeds;
    };

    return isLoaded ? <StoryViewer feeds={getFeedData()} /> :  null

};

export default FeedStories;