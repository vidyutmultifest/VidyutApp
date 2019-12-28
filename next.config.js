
const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
const OptimizedImages = require('next-optimized-images');
const videos = require('next-videos');

const withSourceMaps = require( '@zeit/next-source-maps' );

const fetch = require('isomorphic-unfetch');


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
            '/coc': {page: '/coc'},
            '/merchandise': {page: '/merchandise'},
            '/privacy': {page: '/privacy'},
            '/my-schedule': {page: '/my-schedule'},
            '/terms': {page: '/terms'},
            '/purchase': {page: '/purchase'},
            '/workshops': {page: '/workshops'},
            '/restricted/accept-payment': {page: '/restricted/accept-payment'},
            '/profile/upload-collegeID': {page: '/profile/upload-collegeID'},
            '/profile/upload-selfie': {page: '/profile/upload-selfie'},
            '/profile/edit-profile': {page: '/profile/edit-profile'},
            '/pay/authorize': {page: '/pay/authorize'},
            '/pay/gateway': {page: '/pay/gateway'},
            '/pay/qr-pay': {page: '/pay/qr-pay'},
            '/teams/my-teams': {page: '/teams/my-teams'},
            '/teams/view': {page: '/teams/view'},
        };

        const query = `{
          listCompetitions
          {
            slug
          }
          listWorkshops
          {
            slug
          }
        }`;

        const apiConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        };
        const API_URL = 'https://vidyut.rivivo.xyz/';

        const res = await  fetch(API_URL, apiConfig);
        const events = await res.json().then(json => json);

        events.data.listCompetitions.forEach(c => {
            paths[`/competition/${c.slug}`] = { page: '/competition/[slug]', query: { slug: c.slug } };
        });

        events.data.listWorkshops.forEach(c => {
            console.log(c);
            paths[`/workshop/${c.slug}`] = { page: '/workshop/[slug]', query: { slug: c.slug } };
        });

        return paths;
    },
    distDir: '_next',
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