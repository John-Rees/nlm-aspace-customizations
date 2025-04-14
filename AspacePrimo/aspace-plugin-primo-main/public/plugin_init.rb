Plugins::extend_aspace_routes(File.join(File.dirname(__FILE__), "routes.rb"))
Plugins::add_record_page_action_erb(['resource', 'archival_object'], 'primo/primo_request_action')

