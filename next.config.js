const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
const OptimizedImages = require('next-optimized-images');
const videos = require('next-videos');
const fetch = require('isomorphic-unfetch');

const withSourceMaps = require( '@zeit/next-source-maps' );


const nextConfig = {
    exportTrailingSlash: true,
    exportPathMap: async function() {
        const paths = {
            '/': {page: '/'},
            '/admin': {page: '/admin'},
            '/competitions': {page: '/competitions'},
            '/dashboard': {page: '/dashboard'},
            '/login': {page: '/login'},
            '/logout': {page: '/logout'},
            '/shows': {page: '/shows'},
            '/purchase': {page: '/purchase'},
            '/workshops': {page: '/workshops'},
            '/restricted/accept-payment': {page: '/restricted/accept-payment'},
            '/profile/upload-collegeID': {page: '/profile/upload-collegeID'},
            '/profile/upload-selfie': {page: '/profile/upload-selfie'},

        };

        return paths;
    }
};

module.exports = withPlugins([
    [withSourceMaps],
    [css],
    [OptimizedImages],
    [videos],
    [sass, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
    }],
], nextConfig);