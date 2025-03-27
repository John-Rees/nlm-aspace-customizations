# NLM ArchivesSpace customizations
Local adjustments to NLM Aspace pui for config settings, branding, layouts, re-ordering of display elements, etc.

1. <a href="#config" id="config">Config</a>
2. <a href="#pui" id="pui">PUI</a>
3. <a href="#puihelp" id="puihelp">PUI_help_home</a>

## Version

Tested against aspace v2.8.1 and v3.1.1


<a name="config">&nbsp;</a>
# config
Configurations to the core code configuration file config.rb

1. Change search default from OR to AND
```
## Configuring search operator to be AND by default - ANW-427
AppConfig[:solr_params] = { 'q.op' => 'AND' }
```
config-v.3.4.1.rb PUI inheritance adjustments to remove notes etc. inheriting from the resource record to the archival object view (really messy):
```
## PUI Inheritance
## Define the fields for a record type that are inherited from ancestors
## if they don't have a value in the record itself.
## This is used in common/record_inheritance.rb and was developed to support
## the public UI application.
## Note - any changes to record_inheritance config will require a reindex of pui
## records to take affect. To do this remove files from indexer_pui_state
AppConfig[:record_inheritance] = {
  :archival_object => {
    :inherited_fields => [
                          {
                            :property => 'title',
                            :inherit_directly => true
                          },
                          {
                            :property => 'component_id',
                            :inherit_directly => false
                          },
                         
                         ]
  }
}
```

2. Local Plugins
```
## Plug-ins to load. They will load in the order specified
AppConfig[:plugins] = ['local',  'lcnaf', 'pui_help_home', 'as_spreadsheet_bulk_updater']
```

3. Branding image alt text not in a locales file for some reason
```
AppConfig[:pui_branding_img_alt_text] = 'NLM logo'
```

4. Main menu navigation tabs; true means 'hide me'
```
## The following determine which 'tabs' are on the main horizontal menu
#AppConfig[:pui_hide] = {}
#AppConfig[:pui_hide][:repositories] = false
#AppConfig[:pui_hide][:resources] = false
#AppConfig[:pui_hide][:digital_objects] = false
AppConfig[:pui_hide][:accessions] = true
#AppConfig[:pui_hide][:subjects] = false
#AppConfig[:pui_hide][:agents] = false
AppConfig[:pui_hide][:classifications] = true
#AppConfig[:pui_hide][:search_tab] = false
```
5. Turn off circulation request function/badge (citation and PDF print remain, top right of pages)
```
## Enable / disable PUI resource/archival object page actions
#AppConfig[:pui_page_actions_cite] = true
AppConfig[:pui_page_actions_request] = false
#AppConfig[:pui_page_actions_print] = true
```
6. Human-readale URLs. URLs based on /repo/eadid instead of /repo/randomnumberid. 
- More aligned with how DLXS worked
- Similar to DLXS short URL modrewrite rules
- more stable? Meaning if you delete/re-import an existing EAD the EADID will be thew same, whereas the randomnumberid would change, thus need to manage those aspace-generated URLS closely
```
## Human-Readable URLs options
## use_human_readable_urls: determines whether fields and options related to human-readable URLs appear in the staff interface
#
## Changing this option will not remove or clear any slugs that exist currently.
## This setting only affects links that are displayed. URLs that point to valid slugs will still work.
## WARNING: Changing this setting may require an index rebuild for changes to take effect.
#
AppConfig[:use_human_readable_urls] = true
#
## Use the repository in human-readable URLs
## Warning: setting repo_name_in_slugs to true when it has previously been set to false will break links, unless all slugs are regenerated.
AppConfig[:repo_name_in_slugs] = true
#
## Autogenerate slugs based on IDs. If this is set to false, then slugs will autogenerate based on name or title.
AppConfig[:auto_generate_slugs_with_id] = true
#
## For Resources: if this option and auto_generate_slugs_with_id are both enabled, then slugs for Resources will be generated with EADID instead of the identifier.
AppConfig[:generate_resource_slugs_with_eadid] = true
#
## For archival objects: if this option and auto_generate_slugs_with_id are both enabled, then slugs for archival resources will be generated with Component Unique Identifier instead of the identifier.
AppConfig[:generate_archival_object_slugs_with_cuid] = true
```

<a name="pui">&nbsp;</a>
# PUI 

Customizations to the built-in "local" plugin, specifically its "public" directory, found at **/path-to-aspace/plugins/local/public/**. These customized files are located in this repo's /public/ directory, and are also described below. Other change notes/explanations recorded as comments in-line.

- assets/custom.css - custom CSS file, which overwrites the default styling. Explanations for each overwrite are in the custom.css file itself.
- assets/favicon.ico - NIH favicon
- assets/images/ - NLM header and footer logo files, to replace the default ArchivesSpace logo.
- DELETED assets/js/nlm-scripts.js - GWU's javascript file that adds a message to certain pages (based on URL) with instructions for requesting boxes. linked from views/layouts/application.html.erb
- locales/en.yml - Ruby on Rails vocabulary file, where we set the header title, welcome text on home page, and other standard vocabulary terms throughout the site. Having this file in the plugin overwrites the equivalent file in the core code.
- views/shared/_footer.html.erb - customized footer, which is based on and overwrites the equivalent file in the core code.
- views/shared/_header.html.erb - customized header, which is based on and overwrites the equivalent file in the core code.
- DELETED views/shared/_record_innards.html.erb - return to defaults.
- views/layouts/application.html.erb - customized shared layout file for all pages. REMOVED - link to javascript file (js/gw-scripts.js) was added to this file, for the purpose of adding a message to certain pages (based on URL) with instructions for requesting boxes
- views/layout_head.html.erb - this file is used to "activate" the custom css file
- views/welcome/show.html.erb - customized with NLM welcome language (other paragraph below search boxes comes from locales/en.yml file)

<a name="puihelp">&nbsp;</a>
# PUI Help and Home plugin

- lives in **/path-to-aspace/plugins**
- Adds Help link to navigation row and text
- Adds Home link to navigation row; destination is main Welcome screen

# Primo request
- a plugin forked from University of Oregon
- Provides direct collection fulfillment service
- adds "Get It" request button to every Archival Object in PUI
- Requires MMS ID in string2 aspace field; if none, 'more info' error message displays
- uses Alma MMSID and Primo search API to send customers from Archival Object to catalog record Get It view in Primo
