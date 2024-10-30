const defaults = require('@wordpress/scripts/config/webpack.config');
const path = require( 'path' );

module.exports = {
    ...defaults,
    entry: {

        ...defaults.entry,

        index: path.resolve( process.cwd(), 'src', 'index.js' ),

        admin: path.resolve( process.cwd(), 'src', 'admin.js' )

    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};