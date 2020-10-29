<?php

/**
 * 
 * @package TodoList
 */

class toDoListDeactivate {
     
    public static function deactivate() {
        flush_rewrite_rules();
    }
}