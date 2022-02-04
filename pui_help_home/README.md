ArchivesSpace PUI Help_Home Page Plugin
======================================

**Forked this plugin from University of Oregon, who got it from U. Louisville. Thanks for the community sharing!**

This is a plugin that adds a Help page/link and Home link to the ArchivesSpace PUI navigation bar. I simply tacked on the Home link bits to the original plugin; probably a kluge, but it works.


Enable the plugin
-----------------
Make the directory ./plugins/pui_help_home

Download/copy this /public/ directory there

Edit `config.rb` and append:

```
AppConfig[:plugins] << "pui_help_home"
```
Edit the views/help/index.html.erb file as desired to populate your Help page.

Restart ArchivesSpace.

---
