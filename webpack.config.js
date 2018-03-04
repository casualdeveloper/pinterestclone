const path                      = require("path");
const ExtractTextPlugin         = require("extract-text-webpack-plugin");
const webpack                   = require("webpack");
const ManifestPlugin            = require("webpack-manifest-plugin");
const CleanWebpackPlugin        = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin   = require("optimize-css-assets-webpack-plugin");
const cssnano                   = require("cssnano");
const BundleAnalyzerPlugin      = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


const PATHS = {
    app:path.join(__dirname,"src/js/app.js"),
    style:path.join(__dirname,"src/styles/main.scss"),
    build:path.join(__dirname, "/public") 
};

const autoprefix = function() {
    return {
        loader: "postcss-loader",
        options: {
            plugins: () => ([
                require("autoprefixer"),
            ]),
        },
    };
};

const cssLoader = function() {
    return {
        loader: "css-loader",
        options:{
            url: true,
            importLoaders: 1
        }
    }
}

module.exports = {
    entry: {
        app:PATHS.app,
    },
    devtool:(process.env.NODE_ENV !== "production")?"eval":false,
    output: {
        filename: (process.env.NODE_ENV === "production") ? "[name].[chunkhash].js" : "[name].js",
        path: PATHS.build
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //include: PATHS.style,
                use: ExtractTextPlugin.extract({
                    use: [cssLoader(), autoprefix()],
                    fallback: "style-loader",
                }),
            },
            {
                test: /\.scss$/,
                include: PATHS.style,
                use: ExtractTextPlugin.extract({
                    use: [cssLoader(), autoprefix(), "sass-loader"],
                    fallback: "style-loader",
                }),
            },
            {
                test: /(\.js|.jsx)$/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|svg|jpg|ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                },
            },
        ]
    },
    resolve:{
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        } 
    },
    plugins:[
        new CleanWebpackPlugin([PATHS.build]),
        new ExtractTextPlugin({
            filename: (process.env.NODE_ENV === "production") ? "[name].[contenthash].css" : "[name].css",
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "bundle",

            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf("node_modules") >= 0 &&
                resource.match(/\.js$/)
            ),
        }),
        /* new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
                // Run cssnano in safe mode to avoid
                // potentially unsafe transformations.
                safe: true,
            },
            canPrint: false,
        }), */
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }), 
        new ManifestPlugin(),
        //new BundleAnalyzerPlugin()
    ]
};