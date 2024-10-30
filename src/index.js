import App from "./App";
import { render } from '@wordpress/element';

/**
 * Import the stylesheet for the plugin.
 */
import './style/main.scss';

// fetch('/wp-json/wp/v2/users')
//     .then(response => response.json())
//     .then(posts => console.log(posts));
// Render the App component into the DOM
render(<App />, document.querySelector('#lynked-store'));