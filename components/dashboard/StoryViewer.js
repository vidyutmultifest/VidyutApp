import React from "react";
import '../../styles/vidyutStories.sass';

class StoryViewer extends React.Component {
    constructor(props){
        super(props);
        this.storiesElement = null;
        this.storiesApi = null;
        const Zuck = require('zuck.js');

        var timestamp = function() {
            var timeIndex = 0;
            var shifts = [35, 60, 60 * 3, 60 * 60 * 2, 60 * 60 * 25, 60 * 60 * 24 * 4, 60 * 60 * 24 * 10];

            var now = new Date();
            var shift = shifts[timeIndex++] || 0;
            var date = new Date(now - shift * 1000);

            return date.getTime() / 1000;
        };

        const stories = [];
        props.feeds.map(f => (
            stories.push(
                Zuck.buildTimelineItem(
                    f.id,
                    f.cover,
                    f.name,
                    "",
                    timestamp(),
                    f.stories
                )
            )
        ));

        this.state = {
            stories
        }
    }

    componentDidMount() {
        const Zuck = require('zuck.js');
        let currentSkin = {
            name: 'snapssenger',
            params: {
                avatars: true,
                list: false,
                autoFullScreen: true,
                cubeEffect: true,
                paginationArrows: true
            }
        };
        this.storiesApi = new Zuck(this.storiesElement, {
            backNative: true,
            previousTap: true,
            skin: currentSkin['name'],
            autoFullScreen: currentSkin['params']['autoFullScreen'],
            avatars: currentSkin['params']['avatars'],
            paginationArrows: currentSkin['params']['paginationArrows'],
            list: currentSkin['params']['list'],
            cubeEffect: currentSkin['params']['cubeEffect'],
            localStorage: true,
            stories: this.state.stories,
            reactive: true,
            callbacks: {
                onDataUpdate: function (currentState, callback) {
                    this.setState(state => {
                        state.stories = currentState;
                        return state;
                    }, () => {
                        callback();
                    });
                }.bind(this)
            }
        });
    }
    render() {
        const timelineItems = [];
        this.state.stories.forEach((story, storyId) => {
            const storyItems = [];
            story.items.forEach((storyItem) => {
                storyItems.push(
                    <li
                        key={storyItem.id}
                        data-id={storyItem.id}
                        data-time={storyItem.time}
                        className={(storyItem.seen ? 'seen' : '')}
                    >
                        <a
                            href={storyItem.src}
                            data-type={storyItem.type}
                            data-length={storyItem.length}
                            data-link={storyItem.link}
                            data-linkText={storyItem.linkText}
                        >
                            <img src={storyItem.preview} />
                        </a>
                    </li>
                );
            });

            let arrayFunc = story.seen ? 'push' : 'unshift';
            timelineItems[arrayFunc](
                <div className={(story.seen ? 'story seen' : 'story')} key={storyId} data-id={storyId} data-last-updated={story.lastUpdated} data-photo={story.photo}>
                    <a className="item-link" href={story.link}>
                      <span className="item-preview">
                        <img src={story.photo} />
                      </span>
                      <span className="info d-none" itemProp="author" itemScope="" itemType="http://schema.org/Person">
                        <strong className="name" itemProp="name">{story.name}</strong>
                        <span className="time">{story.lastUpdated}</span>
                      </span>
                    </a>
                    <ul className="items">
                        {storyItems}
                    </ul>
                </div>
            );
        });
        return (
            <div>
                <div ref={node => this.storiesElement = node}  id="vidyut-stories" className="card-shadow storiesWrapper">
                    {timelineItems}
                </div>
            </div>
        );
    }
}

export default StoryViewer;