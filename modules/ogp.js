import sharp from 'sharp'
import TextToSVG from 'text-to-svg'
import axios from 'axios'
const textToSVG = TextToSVG.loadSync('./static/font.otf')
const generateOGP = function (title, filename) {
    const textSvg = textToSVG.getSVG(title, {
        x: 0,
        y: 0,
        fontSize: 75,
        anchor: 'top',
        attributes: { fill: 'rgba(31, 41, 55, var(--tw-text-opacity))', stroke: 'black' }
    })
    sharp('./static/bgimg.png')
        .composite([
            {
                input: Buffer.from(textSvg)
            }
        ])
        .resize(1200, 630)
        .toFile(`./static/ogp/${filename}.png`, (error) => {
            // eslint-disable-next-line no-console
            if (error) console.log('OGP Generate Error: ' + error)
        })

}
module.exports = function () {
    this.nuxt.hook('build:before', async () => {
        // eslint-disable-next-line no-console
        console.log('OgpGenerater:start')

        const pages = await axios.get(
            process.env.API_URL + "inaridiy?limit=100",
            { headers: { "X-API-KEY": process.env.API_KEY } }
        )
        pages.data.contents.map(content => {
            generateOGP(content.title, content.id)
        })
        // eslint-disable-next-line no-console
        console.log('OgpGenerater:finish')
    })
}   