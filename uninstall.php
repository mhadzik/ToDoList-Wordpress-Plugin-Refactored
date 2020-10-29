<?php

/**
 * Trigger this file on Plugin unistall
 * 
 * @package TodoList
 */


if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die;
}


// Clear database data

$tasks = get_posts( array( 'post_type' => 'task', 'numberposts' => -1 ) );

foreach( $tasks as $task ) {
	wp_delete_post($task->ID, false  );
}