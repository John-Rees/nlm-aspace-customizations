Plugins::extend_aspace_routes(File.join(File.dirname(__FILE__), "routes.rb"))
Plugins::add_menu_item('help', 'help.menu_label')

Plugins::add_menu_item('/', 'Home', 0)
