<?php
/* <%= title %> functions and definitions. */

if ( ! function_exists( '<%= title %>_setup' ) ) :

	function <%= title %>_setup() {

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );

	add_theme_support( 'post-thumbnails' ); /* support for thumbnails on posts and pages */

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', '<%= title %>' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.

	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );
	*/

	/* Post Formats */
	add_theme_support( 'post-formats', array(
			// 'aside',
		'image',
		'video',
			// 'quote',
		'link',
		) );
	}
endif;

add_action( 'after_setup_theme', '<%= title %>_setup' );


/**************************************/
/**************************************/
/*     Enqueue scripts and styles     */
/**************************************/
/**************************************/

function <%= title %>_scripts() {
	wp_enqueue_style( '<%= title %>-style', get_stylesheet_uri() );

	// wp_enqueue_script( '<%= title %>-jquery', get_template_directory_uri() . '/theme/components/jquery/dist/jquery.min.js', array(), '2.1.4', true );

	// if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
	// 	wp_enqueue_script( 'comment-reply' );
	// }
}
add_action( 'wp_enqueue_scripts', '<%= title %>_scripts' );

/* Load Jetpack compatibility file */
// require get_template_directory() . '/includes/jetpack.php';

/*********************
** theme customizer **
*********************/
/**
 * Adds the individual sections, settings, and controls to the theme customizer
 */
function roscoe_customizer( $wp_customize ) {
		$wp_customize->remove_section( 'colors' );

    $wp_customize->add_section(
        'socialmedia_section',
        array(
            'title' => 'Social Media',
            'description' => 'This is a settings section for social media information.',
            'capability' => 'edit_theme_options',
            'priority' => 35,
        )
    );
    // Facebook
    // get_theme_mod( 'facebook_url' )
    $wp_customize->add_setting(
	    'facebook_url',
	    array(
	        'default' => '',
	    )
		);
    $wp_customize->add_control( 'facebook_url', array(
		    'type'     => 'url',
		    'sanitize_callback' => 'esc_url_raw',
		    'priority' => 10,
		    'section'  => 'socialmedia_section',
		    'description' => 'http://www.facebook.com',
		    'label'    => 'Facebook URL Field',
		) );

    // twitter
    // get_theme_mod( 'twitter_url' )
    $wp_customize->add_setting(
	    'twitter_url',
	    array(
	        'default' => '',
	    )
		);
    $wp_customize->add_control( 'twitter_url', array(
		    'type'     => 'url',
		    'sanitize_callback' => 'esc_url_raw',
		    'priority' => 10,
		    'section'  => 'socialmedia_section',
		    'description' => 'http://www.twitter.com',
		    'label'    => 'Twitter URL Field',
		) );

		// instagram
		// get_theme_mod( 'instagram_url' )
    $wp_customize->add_setting(
	    'instagram_url',
	    array(
	        'default' => '',
	    )
		);
    $wp_customize->add_control( 'instagram_url', array(
		    'type'     => 'url',
		    'sanitize_callback' => 'esc_url_raw',
		    'priority' => 10,
		    'section'  => 'socialmedia_section',
		    'description' => 'http://www.instagram.com',
		    'label'    => 'Instagram URL Field',
		) );

		// linkedIn
		// get_theme_mod( 'linkedin_url' )
    $wp_customize->add_setting(
	    'linkedin_url',
	    array(
	        'default' => '',
	    )
		);
    $wp_customize->add_control( 'linkedin_url', array(
		    'type'     => 'url',
		    'sanitize_callback' => 'esc_url_raw',
		    'priority' => 10,
		    'section'  => 'socialmedia_section',
		    'description' => 'http://www.linkedin.com',
		    'label'    => 'LinkedIn URL Field',
		) );

}
add_action( 'customize_register', 'roscoe_customizer' );
