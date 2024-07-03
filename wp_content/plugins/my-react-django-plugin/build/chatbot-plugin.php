<?php
/*
Plugin Name: My React Django Plugin
Description: A WordPress plugin to integrate a React frontend with a Django backend.
Version: 1.0
Author:Shanmuga Hospital
*/

function enqueue_chatbot_assets() {
    // Enqueue the main React app file
    wp_enqueue_script(
        'chatbot-react-app',
        plugin_dir_url(__FILE__) . 'build/static/js/main.js',
        array(), // Dependencies, e.g., jQuery
        filemtime(plugin_dir_path(__FILE__) . 'build/static/js/main.js'),
        true // Load in the footer
    );

    // Enqueue the CSS file
    wp_enqueue_style(
        'chatbot-react-app-style',
        plugin_dir_url(__FILE__) . 'build/static/css/main.css',
        array(), // Dependencies
        filemtime(plugin_dir_path(__FILE__) . 'build/static/css/main.css')
    );
}

add_action('wp_enqueue_scripts', 'enqueue_chatbot_assets');

// Shortcode to display the React app
function display_chatbot_app() {
    return '<div id="chatbot-root"></div>';
}

add_shortcode('chatbot', 'display_chatbot_app');
