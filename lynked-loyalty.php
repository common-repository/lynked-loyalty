<?php

/**
 * Plugin Name:       Lynked Loyalty
 * Description:       Lynked Loyalty's Woocommerce plugin lets businesses integrate our rewards system both online and in-store, offering a seamless and modern loyalty …
 * Version:           1.1.10
 * Requires at least: 5.3
 * Requires PHP:      7.0
 * Author:            Lynked Loyalty
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lynked
 */

add_action( 'admin_menu', 'lynked_init_menu' );

/**
 * Init Admin Menu.
 *
 * @return void
 */
function lynked_init_menu() {
    add_menu_page( __( 'Lynked', 'lynked'), __( 'Lynked', 'lynked'), 'manage_options', 'lynked', 'lynked_admin_page', 'dashicons-admin-post', '2.1' );
}
function getUrl()
{
    $dev = false;
    if($dev){
        return [
            'api' => 'https://api.dev.lynked.ie',
            'dashboard' => 'https://dev.lynked.ie',
            'shopify' => '.shopify.dev.lynked.ie',
        ];
    }else{
        return [
            'api' => 'https://api.lynked.ie',
            'dashboard' => 'https://app.lynked.ie',
            'shopify' => '.shopify.lynked.ie',
        ];
    }
}

function lynked_set_settings_endpoint_phrase( $request ) {
    $settings = [
        'bg_color' => $request['bg_color'],
        'text_color' => $request['text_color'],
        'position' => $request['position'],
        'popup_bg' => $request['popup_bg'],
        'popup_text' => $request['popup_text'],
        'popup_icon' => $request['popup_icon'],
        'lynked_login_url' => $request['lynked_login_url'],
        'lynked_register_url' => $request['lynked_register_url'],
    ];
    update_option('dw_quotes', serialize($settings));

    return rest_ensure_response(['status' => true]);
}

function lynked_save_plugin_settings_routes(): void
{
    register_rest_route( 'lynked', '/lynked-plugin-settings-save', array(
        'methods'  => WP_REST_Server::CREATABLE,
        'callback' => 'lynked_set_settings_endpoint_phrase',
        'permission_callback' => '__return_true',
    ) );
}

add_action( 'rest_api_init', 'lynked_save_plugin_settings_routes' );

function lynked_get_settings_endpoint_phrase( $request ) {
    $quotes = get_option('dw_quotes', null);
    $loginUrl = get_permalink( get_option('woocommerce_myaccount_page_id'));

    return rest_ensure_response(['status' => true, 'settings' => unserialize($quotes), 'default_login_url' => $loginUrl]);
}

function lynked_get_plugin_settings_routes(): void
{
    register_rest_route( 'lynked', '/lynked-plugin-settings-get', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'lynked_get_settings_endpoint_phrase',
        'permission_callback' => '__return_true',
    ) );
}

add_action( 'rest_api_init', 'lynked_get_plugin_settings_routes' );

function lynked_add_registration_fields() {
    ?>
  <div class="lynkedloyalty" style="display: flex; justify-content: space-between; margin-top: 20px;">
    <label for="lynkedloyalty">Sign up to our loyalty program with <a href="https://lynkedloyalty.com/lynked-app/" target="_blank">Lynked Loyalty</a></label>
    <input id="lynkedloyalty" style="width: 20px; height: 20px; margin-left: 15px;" type="checkbox" name="customer_lynkedloyalty_allow">
  </div>
    <?php
}

add_action( 'register_form', 'lynked_add_registration_fields' );

function lynked_registration_save( $user_id ) {

    if ( isset( $_POST['customer_lynkedloyalty_allow'] ) )
        update_user_meta($user_id, 'customer_lynkedloyalty_allow', $_POST['customer_lynkedloyalty_allow']);

}

add_action( 'user_register', 'lynked_registration_save', 10, 1 );

add_action( 'woocommerce_register_form', 'lynked_wc_account_registration_field' );
function lynked_wc_account_registration_field(){
    ?>
  <div class="lynkedloyalty" style="display: flex; justify-content: space-between; margin-top: 20px;">
    <label for="lynkedloyalty">Sign up to our loyalty program with <a href="https://lynkedloyalty.com/lynked-app/" style="color: #0074ff; text-decoration: none;" target="_blank">Lynked Loyalty</a></label>
    <input id="lynkedloyalty" type="checkbox" style="width: 20px; height: 20px; margin-left: 15px;" name="customer_lynkedloyalty_allow">
  </div>
    <?php
}

add_action( 'woocommerce_created_customer', 'lynked_save_account_registration_field' );
function lynked_save_account_registration_field( $customer_id ) {
    if ( isset( $_POST['customer_lynkedloyalty_allow'] ) ) {
        update_user_meta( $customer_id, 'customer_lynkedloyalty_allow', sanitize_text_field( $_POST['customer_lynkedloyalty_allow'] ) );
    }
}

add_action( 'gform_user_registered', 'lynked_set_allow', 10, 4 );
function lynked_set_allow( $user_id, $feed, $entry, $user_pass ) {
    update_user_meta( $user_id, 'customer_lynkedloyalty_allow', rgar($entry, '8.1') === 'true'?'on':'off');
}

/**
 * Init Admin Page.
 *
 * @return void
 */
function lynked_admin_page() {
    require_once plugin_dir_path( __FILE__ ) . 'templates/app.php';
}

add_action( 'admin_enqueue_scripts', 'lynked_admin_enqueue_scripts' );

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function lynked_admin_enqueue_scripts() {
    wp_enqueue_style( 'lynked-admin-style', plugin_dir_url( __FILE__ ) . 'build/admin.css' );
    wp_enqueue_script( 'lynked-admin-script', plugin_dir_url( __FILE__ ) . 'build/admin.js', array( 'wp-element' ), '1.0.0', true );
}

function insert_html_in_header() {
    wp_enqueue_style( 'lynked-style', plugin_dir_url( __FILE__ ) . 'build/index.css' );
    wp_enqueue_script( 'lynked-script', plugin_dir_url( __FILE__ ) . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
    wp_localize_script('lynked-script', 'wpApiSettings', [
        'nonce' => wp_create_nonce('wp_rest')
    ]);
    $loginUrl = get_permalink( get_option('woocommerce_myaccount_page_id'));
    echo '<div id="lynked-store" data-login-page="' . $loginUrl . '"></div>';
}

/* Front End */
add_action( 'wp_head', 'insert_html_in_header' );

function set_username_cookie( $user_login, $user ) {
    setcookie('user_login', $user->user_email, strtotime('+1 day'), '/', getUrl()['shopify']);
}

function remove_username_cookie() {
    setcookie('user_login', '', strtotime('+1 day'), '/', getUrl()['shopify']);
}

add_action('wp_login', 'set_username_cookie', 10, 2);
add_action('wp_logout', 'remove_username_cookie', 10, 2);

/**
 * This is our callback function that embeds our phrase in a WP_REST_Response
 */
function prefix_get_endpoint_phrase( $request ) {
    $shop = (string) $request['shop'];
    $email = (string) $request['email'];
    $password = (string) $request['password'];

    $store_name     = get_option( 'blogname' );
    $store_address     = get_option( 'woocommerce_store_address' );
    $store_city        = get_option( 'woocommerce_store_city' );
    $store_raw_country = get_option( 'woocommerce_default_country' );
    $split_country = explode( ":", $store_raw_country );
    $store_country = $split_country[0];
    $store_state   = $split_country[1];

    $addressShop = str_replace(" ", "+", $store_city . ' ' . $store_country);

    $responseCoordinate = wp_remote_get('https://nominatim.openstreetmap.org/search?q=' . $addressShop . '&format=json');
    $bodyCoordinate = json_decode(wp_remote_retrieve_body( $responseCoordinate ), true);
    $jsonToArr = reset($bodyCoordinate);
    $location = [
        'display_name' => $jsonToArr['display_name'],
        'lat' => $jsonToArr['lat'],
        'lon' => $jsonToArr['lon']
    ];

    $address = $location['display_name'];
    $lat = $location['lat'];
    $lon = $location['lon'];

    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json'
        ),
        'body' => json_encode([
            'email' => $email,
            'password' => $password,
            'shop' => $shop,
            'address' => $address,
            'lat' => $lat,
            'lon' => $lon
        ])
    );

    $response = wp_remote_post( getUrl()['api'].'/wordpress/sign-in', $args);
    $body     = wp_remote_retrieve_body( $response );

    return rest_ensure_response( [json_decode($body), $store_name ]);
}

/**
 * This function is where we register our routes for our example endpoint.
 */
function prefix_register_example_routes(): void
{
    // register_rest_route() handles more arguments but we are going to stick to the basics for now.
    register_rest_route( 'lynked', '/connect-business', array(
        // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
        'methods'  => WP_REST_Server::CREATABLE,
        // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
        'callback' => 'prefix_get_endpoint_phrase',
        'permission_callback' => '__return_true',
    ) );
}

add_action( 'rest_api_init', 'prefix_register_example_routes' );

function prefix_get_shop_info_phrase( $request ) {
    $store_name     = get_option( 'blogname' );
    $currency = get_option('woocommerce_currency');
    $symbols = get_woocommerce_currency_symbol($currency);
    $user = wp_get_current_user();
    return rest_ensure_response( [
        'shop_name' => $store_name,
        'currency' => $currency,
        'currency_symbol'=>$symbols,
        'user' => $user
    ]);
}

add_action( 'rest_api_init', 'prefix_get_shop_info_routes' );

/**
 * This function is where we register our routes for our example endpoint.
 */
function prefix_get_shop_info_routes(): void
{
    register_rest_route( 'lynked', 'shop-info', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'prefix_get_shop_info_phrase',
        'permission_callback' => '__return_true',
    ) );
}


function prefix_add_discount( $request ) {
    $shop = (string) $request['shop'];
    $code = (string) $request['code'];
    $reward = (int) $request['reward'];
    $is_add = (bool) $request['isAdd'];
    if (!session_id()) {
        session_start();
    }
    if (!isset($_SESSION)) { session_start();}
    if(wc_get_coupon_id_by_code($code)){
        //$couponId = wc_get_coupon_id_by_code($code);
        $coupon = new WC_Coupon($code);
        if($is_add) {
            $_SESSION['coupon_code'] = $code;
        }
        return rest_ensure_response( [
            'coupon'=>$coupon->get_data()
        ]);
    }
    $coupon = new WC_Coupon();

    $coupon->set_code( $code );
    $coupon->set_amount( $reward );
    $coupon->set_individual_use(false);
    //$coupon->set_discount_type( 'percent' );
    //$coupon->set_date_expires( '31-12-2022' );
    $coupon->set_usage_limit( 1 );
    $coupon->set_usage_limit_per_user( 1 );
    $coupon->save();

    if($is_add){
        $_SESSION['coupon_code'] = $code;
    }

    return rest_ensure_response( [
        'coupon'=>$coupon->get_data()
    ]);
}

add_action( 'rest_api_init', 'prefix_add_discount_routes' );

/**
 * This function is where we register our routes for our example endpoint.
 */
function prefix_add_discount_routes(): void
{
    register_rest_route( 'lynked', 'discount', array(
        'methods'  => WP_REST_Server::CREATABLE,
        'callback' => 'prefix_add_discount',
        'permission_callback' => '__return_true',
    ) );
}

function wpdocs_detect_plugin_activation( $plugin, $network_activation ) {

}
add_action( 'activated_plugin', 'wpdocs_detect_plugin_activation', 10, 2 );


add_action( 'woocommerce_order_status_completed', 'create_invoice_for_wc_order2', 1);

function create_invoice_for_wc_order2($order_id){
    $order = wc_get_order($order_id);
    $coupons = $order->get_coupon_codes();
    $discountCode = '';
    if(count($coupons)){
        $discountCode = reset($coupons);
    }
    $shop = parse_url($order->get_edit_order_url(),PHP_URL_HOST);
    $user = wp_get_current_user();
    $basket = [];
    $productInfo = [];
    foreach ( $order->get_items() as $item ) {
        $categories = strip_tags(wc_get_product_category_list($item->get_product_id()));
//         $categoriesArr = [];
//         foreach(explode("||", $categories) as $category){
//             $categoriesArr[] = strip_tags($category);
//         }
        $tags = strip_tags(wc_get_product_tag_list($item->get_product_id()));
//         $tagsArr = [];
//         foreach(explode("||", $tags) as $tag){
//             $tagsArr[] = strip_tags($tag);
//         }
        $basket[] = [
            'product_id' => $item->get_product_id(),
            'variation_id' => $item->get_variation_id(),
            'product' => $item->get_product(),
            'name' => $item->get_name(),
            'quantity' => $item->get_quantity(),
            'price' => $item->get_subtotal(),
            'total' => $item->get_total(),
            'item_type' => $item->get_type()
        ];
        $productInfo[] = [
            'id' => $item->get_product_id(),
            'product_type' => $categories,
            'tags' => $tags,
        ];
    }
//     error_log(json_encode($basket));
    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json'
        ),
            'body' => json_encode([
                'email' => $order->get_billing_email(),
                'id' => $order->get_id(),
                'total_price' => $order->get_total(),
                'total' => $order->get_total(),
                'currency' => $order->get_currency(),
                'referring_site' => $order->get_edit_order_url(),
                'discount_code' => $discountCode,
                'discount_codes' => $coupons,
                'shop_url' => $shop,
                'user_id' => $order->get_user_id(),
                'shop_name' => get_bloginfo("name"),
                'source_name' => 'web',
                'location_id' => 0,
                'basket' => json_encode($basket),
                'products_info' => json_encode($productInfo),
                'allow_create_account' => 1,
                'order_number' => $order->get_id(),
                'total_tax' => $order->get_total_tax(),
                'paymentType' => $order->get_payment_method_title(),
                'total_shipping_price' => $order->get_shipping_total(),
                'lynked_barcode' => json_encode([
                    [
                        'name' => 'barcode',
                        'value' => $user->user_email
                    ]
                ])
        ])
    );
//     error_log(json_encode($args),0);

    $response = wp_remote_post( getUrl()['api'].'/wordpress/webhook-checkout-creation', $args);
    $body     = wp_remote_retrieve_body( $response );
    //$url = $order->get_edit_order_url();
    //error_log($shop,0);
//     error_log($order, 0);
    return rest_ensure_response( [json_decode($body), $discountCode ]);
}


add_action( 'user_register', 'myplugin_registration_save', 10, 1 );

function myplugin_registration_save( $user_id ) {
    $user = get_user_by('id', $user_id);
    $allowLynked = get_user_meta( $user_id, 'customer_lynkedloyalty_allow', true);
    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json'
        ),
        'body' => json_encode([
            'email' => $user->user_email,
            'first_name' => '',
            'last_name' => '',
            'allow_create_account' => $allowLynked === 'on' ? 1 : 0,
            'shop' => parse_url(home_url(), PHP_URL_HOST),
        ])
    );
//     error_log(print_r(getUrl(), true), 0);
//     error_log(getUrl()['api'].'/wordpress/webhook-customer-creation', 0);
//     error_log(json_encode($args), 0);
    $response = wp_remote_post( getUrl()['api'].'/wordpress/webhook-customer-creation', $args);
    $body     = wp_remote_retrieve_body( $response );

//     error_log(json_encode($user), 0);
}

function ts_apply_discount_to_cart() {
    if (!session_id()) {
        session_start();
    }
    if (!isset($_SESSION)) { session_start();}
    if(!isset($_SESSION['coupon_code'])){
        return;
    }
    $coupon_code = $_SESSION['coupon_code'];
    if ( ! empty( $coupon_code ) && ! WC()->cart->has_discount( $coupon_code ) ){
        WC()->cart->add_discount( $coupon_code ); // apply the coupon discount
        unset($_SESSION['coupon_code']);
        //WC()->session->__unset( 'coupon_code' ); // remove coupon code from session
    }
}
add_action( 'template_redirect', 'ts_apply_discount_to_cart', 10, 0 );

/**
 * Auto Complete all WooCommerce orders.
 */
add_action( 'woocommerce_thankyou', 'custom_woocommerce_auto_complete_order' );
function custom_woocommerce_auto_complete_order( $order_id ) {
    if ( ! $order_id ) {
        return;
    }

    $order = wc_get_order( $order_id );
    $order->update_status( 'completed' );
}
