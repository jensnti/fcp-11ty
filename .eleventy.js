const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(`./src/assets/${src}`, {
        widths: [300, 800, null],
        formats: ['avif', 'jpeg'],
        urlPath: '/images/',
        outputDir: './public/images/',
    });

    let imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
    };

    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ './src/assets/images/': '/images' });
    eleventyConfig.addPassthroughCopy({ './src/assets/favicons': '/' });

    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
    eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);

    eleventyConfig.addFilter('imageUrl', (imageObj) => {
        if (imageObj.title.length > 0) {
            return imageObj.date + imageObj.title;
        } else {
            return imageObj.date + imageObj.description;
        }
        // return title.length > 0 ? title : description;
    });

    return {
        dir: {
            input: 'src',
            output: 'public',
        },
    };
};
