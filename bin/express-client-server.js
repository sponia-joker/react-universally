import express from 'express'
import path from 'path'
import webpack from 'webpack'
import compress from 'compression'
import webpack_config_client from '../webpack.config.client'
const compiler = webpack(webpack_config_client)
const app = new express()
app.use(compress())

console.log('Enabling webpack dev and HMR middleware')

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpack_config_client.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
}))
app.use(require("webpack-hot-middleware")(compiler));



app.listen(3001, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('==> 🚧  Webpack development server listening on port %s', 3001);
    }
})
