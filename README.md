# NLM aspace customizations
Local adjustments to NLM Aspace pui for config settings, branding, layouts, re-ordering of display elements, etc.

1. Config <a href="#user-content-config" id="config">#</a>
2. PUI <a href="#user-content-PUI" id="PUI">#</a>

## Version

Tested against aspace v2.8.1



# config
Configurations to the core code configuration file config.rb

Change search default from OR to AND
```
## Configuring search operator to be AND by default - ANW-427
AppConfig[:solr_params] = { 'mm' => '100%' }
```

Plugins
```
## Plug-ins to load. They will load in the order specified
AppConfig[:plugins] = ['local',  'lcnaf']
```

Branding image alt text not in a locales file for some reason
```
AppConfig[:pui_branding_img_alt_text] = 'NLM logo'
```

Main menu navigation tabs; true means 'hide me'
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
Turn off circulation request function/badge (citation and PDF print remain, top right of pages)
```
## Enable / disable PUI resource/archival object page actions
#AppConfig[:pui_page_actions_cite] = true
AppConfig[:pui_page_actions_request] = false
#AppConfig[:pui_page_actions_print] = true
```
Human-readale URLs. URLs based on /repo/eadid instead of /repo/randomnumberid. 
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

ARKs - something to test later

# PUI
Customizations to the built-in "local" plugin, specifically its "public" directory, found at /path/to/aspace/plugins/local/public/. These customized files are located in this repo's/public/ directory, and are also described below.


