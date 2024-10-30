import AppAdmin from "./AppAdmin";
import { render } from '@wordpress/element';

/**
 * Import the stylesheet for the plugin.
 */
import './style/admin.scss';

// Render the App component into the DOM
render(<AppAdmin />, document.getElementById('lynked'));