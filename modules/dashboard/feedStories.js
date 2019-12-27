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
          image
          created
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
                stories.push({
                    url: s.image,
                    header: {
                        heading: f.name,
                        subheading: `Posted ${moment(s.created).fromNow()}`,
                    }
                })
            });
            feeds.push({
                name: f.name,
                stories: stories
            });
        });
        return feeds
    };

    return isLoaded ? <StoryViewer feeds={getFeedData()} /> :  null

};

export default FeedStories;