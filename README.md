## To Do List plugin for Wordpress Admin panel

#### Steps to do to install plugin:
1. Copy the folder of the plugin to your wordpress/wp_content/plugins directory
2. Open your Wordpress Plugins page and install To Do List plugin

### How to use the plugin?

Basically once you have installed the plugin it should be self explanatory. 
On the Wordpress menu of your admin panel you should see a new icon with plugin name. 
Go to that page and you will be able to use the plugin.

#### Functions of the plugin:
1. Create a new task by entering it's name and click Enter
2. Edit your tasks' names and statuses
3. Delete completed tasks


### Technical specification

Once the plugin is installed to your Wordress Admin panel there is a new table created in your database (wp_tasks). 
It is responsible for storing your data so it's always there. To clear that database (not by manually deleting records from TodoList plugin page) you can simply uninstall
the plugin and install it again. It means that once the plugin is uninstalled the table in database is destroyed.

Javascript files and Styles are bundled using the newest Webpack (frontend-bundle.js).
In order to minify the impact of potentially huge SCSS files I have implemented MiniCssExtractPlugin, which is a great option here. It extracts CSS files into separated
files and creates a CSS file per JS file which contains CSS. It is a good way to support on-demand-loading of CSS.

For grid and some components I have implemented the newest version of Bootstrap. It is my favourite griding system so I decided to use it here. 

For the definitive majority I have used ES6 syntax for JS scripts, however in some cases jQuery was an unavoidable option.

If you want to see a github version of this plugin, you can find it here: https://github.com/mhadzik/ToDoList-Wordpress-Plugin
