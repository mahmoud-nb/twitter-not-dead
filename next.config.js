const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {}

const path = require('path')
const moduleExports = {
    ...nextConfig,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    reactStrictMode: false,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },
    // Exclude "/favicon.ico" from prerendering
    trailingSlash: true // Ensure this line is present
}

module.exports = withNextIntl(moduleExports)