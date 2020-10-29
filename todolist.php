<?php

/**
 * 
 * @package TodoList
 * @wordpress-plugin
 * Plugin Name:       To Do List 
 * Author:            mhadzik
 * Version: 1.0.1
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

class toDoList {

	function __construct() {
		$this->create_post_type();
	}

	protected function create_post_type(){
		add_action( 'init', array( $this, 'custom_post_type' ) );
	}

	function register() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'admin_menu', array( $this, 'add_admin_pages' ) );
	}

	public function add_admin_pages() {
		add_menu_page( 'ToDoList', 'ToDoList', 'manage_options', 'todolist_plugin', array( $this, 'admin_index' ), 'dashicons-saved', 110 );
	}

	public function admin_index() {
		 require_once plugin_dir_path( __FILE__ ) . 'includes/admin/partials/todolist-admin-display.php';
	}

	// Custom post type
	function custom_post_type() {
		register_post_type( 'task', ['public' => true, 'label' => 'ToDoList'] );
	}

	function enqueue() {
		wp_enqueue_style( 'toDoListStyle', plugins_url( '/includes/admin/public/bundle.css', __FILE__ ) );
		wp_enqueue_script( 'toDoListScripts', plugins_url( '/includes/admin/public/bundle.js', __FILE__ ) );

	}

	function activate() {
		require_once plugin_dir_path( __FILE__, ) . '/includes/todolist-plugin-activate.php';
		toDoListActivate::activate();
	}

	function deactivate() {
		require_once plugin_dir_path( __FILE__, ) . '/includes/todolist-plugin-deactivate.php';
		toDoListDeactivate::deactivate();
	}

}

if ( class_exists( 'toDoList' ) ) {
	$todolist = new toDoList();
	$todolist->register();
}

// activation hook

register_activation_hook( __FILE__, array( $todolist, 'activate' ) );

// deactivation hook

register_deactivation_hook( __FILE__, array( 'toDoListDeactivate', 'deactivate' ) );

