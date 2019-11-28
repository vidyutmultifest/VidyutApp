const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
const OptimizedImages = require('next-optimized-images');
const videos = require('next-videos');

const withSourceMaps = require( '@zeit/next-source-maps' );

module.exports = withPlugins([
    [withSourceMaps],
    [css],
    [OptimizedImages],
    [videos],
    [sass, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
    }],
]);