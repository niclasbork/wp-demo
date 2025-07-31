<?php
/**
 * Functions and definitions
 *
 * @package DemoTheme
 */

if ( ! function_exists( 'demotheme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the `after_setup_theme` hook, which
	 * runs before the `init` hook. The `init` hook is too late for some features,
	 * such as indicating support for post thumbnails.
	 */
	function demotheme_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on demotheme, use a find and replace
		 * to change 'demotheme' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'demotheme', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'demotheme' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'demotheme_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets in Customizer.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/custom-logo/
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'demotheme_setup' );

/**
 * Enqueue scripts and styles.
 */
function demotheme_scripts() {
	wp_enqueue_style( 'demotheme-style', get_stylesheet_uri() );

	

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'demotheme_scripts' );

/**
 * Register the Demo Hero Block.
 */
function demotheme_register_demo_hero_block() {
    register_block_type( get_template_directory() . '/components/demo-hero-block' );
}
add_action( 'init', 'demotheme_register_demo_hero_block' );

/**
 * Register the Demo Slider Block.
 */
function demotheme_register_demo_slider_block() {
    register_block_type( get_template_directory() . '/components/demo-slider-block' );
}
add_action( 'init', 'demotheme_register_demo_slider_block' );

/**
 * Register the Demo Contact Form Block.
 */
function demotheme_register_demo_contact_form_block() {
    register_block_type( get_template_directory() . '/components/demo-contact-form-block' );
}
add_action( 'init', 'demotheme_register_demo_contact_form_block' );

/**
 * Register REST API endpoint for contact form submission.
 */
function demotheme_register_contact_form_endpoint() {
    register_rest_route( 'demo-theme/v1', '/submit-contact-form', array(
        'methods' => 'POST',
        'callback' => 'demotheme_handle_contact_form_submission',
        'permission_callback' => '__return_true', // No authentication required for public form
    ) );
}
add_action( 'rest_api_init', 'demotheme_register_contact_form_endpoint' );

/**
 * Handle contact form submission.
 */
function demotheme_handle_contact_form_submission( WP_REST_Request $request ) {
    $params = $request->get_json_params();

    $name = sanitize_text_field( $params['name'] );
    $email = sanitize_email( $params['email'] );
    $subject = sanitize_text_field( $params['subject'] );
    $message = sanitize_textarea_field( $params['message'] );
    $to_email = sanitize_email( $params['toEmail'] ); // Recipient email from block attribute

    // Basic validation
    if ( empty( $name ) || empty( $email ) || empty( $subject ) || empty( $message ) || empty( $to_email ) ) {
        return new WP_REST_Response( array( 'success' => false, 'message' => 'All fields are required.' ), 400 );
    }

    if ( ! is_email( $email ) ) {
        return new WP_REST_Response( array( 'success' => false, 'message' => 'Invalid email format.' ), 400 );
    }

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $name . ' <' . $email . '>',
        'Reply-To: ' . $email,
    );

    $mail_subject = 'Contact Form Submission: ' . $subject;
    $mail_body = '<p><strong>Name:</strong> ' . $name . '</p>'
               . '<p><strong>Email:</strong> ' . $email . '</p>'
               . '<p><strong>Subject:</strong> ' . $subject . '</p>'
               . '<p><strong>Message:</strong><br>' . nl2br( $message ) . '</p>';

    $sent = wp_mail( $to_email, $mail_subject, $mail_body, $headers );

    if ( $sent ) {
        return new WP_REST_Response( array( 'success' => true, 'message' => 'Email sent successfully!' ), 200 );
    } else {
        return new WP_REST_Response( array( 'success' => false, 'message' => 'Failed to send email.' ), 500 );
    }
}

/**
 * Enqueue block editor assets for the contact form block.
 */
function demotheme_enqueue_contact_form_block_assets() {
    // Enqueue wpApiSettings for the frontend script
    wp_localize_script(
        'demo-theme-demo-contact-form-block-view-script', // Handle of your view.js script
        'wpApiSettings',
        array(
            'root' => esc_url_raw( rest_url() ),
            'nonce' => wp_create_nonce( 'wp_rest' ),
        )
    );
}
add_action( 'rest_api_init', 'demotheme_register_contact_form_endpoint' );
add_action( 'enqueue_block_assets', 'demotheme_enqueue_contact_form_block_assets' );