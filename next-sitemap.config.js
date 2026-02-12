/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://reelcreator.network',
    generateRobotsTxt: true,
    exclude: ['/dashboard/*', '/admin/*', '/auth/*'],
    robotsTxtOptions: {
        additionalSitemaps: [],
    },
}
