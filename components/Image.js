import React from "react";
import ProgressiveImage from 'react-progressive-image';

const Image = ({ src, alt }) => {

    return (
        <ProgressiveImage src={src} placeholder={require('../images/assets/vidyut_placeholder.jpg')}>
            {(src, loading) => (
                <img style={{ opacity: loading ? 0.5 : 1 }} src={src} alt={alt ? alt : null} />
            )}
        </ProgressiveImage>
    )
};

export default Image;