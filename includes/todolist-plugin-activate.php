<?php

/**
 * 
 * @package TodoList
 */

class toDoListActivate {

    public static function activate() {
        flush_rewrite_rules();
    }
}