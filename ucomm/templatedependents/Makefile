
# Find our file that says were the code and icons are from
citations := $(shell find . \( -name "codeFrom.txt" \) -print)


# Define all of our variables for the CSS stuff

# Find our core css file that is generated and compressed
# If it isn't there define a variable to where it should be
main_css_uncompressed := $(shell find . \( -name "main.master.css" \) -print)
ifeq ($(main_css),)
main_css_uncompressed := $(join $(dir $(shell find . \( -name "default.master.css" \) -print)), main.master.css )
endif

# Order matters for the css files that will be combined in the end
part_master_css_files := $(shell find . \( -name "default.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "search.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "footer.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "layout.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "shelf.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "hcard.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "weather.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "globalstyle.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "images.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "typography.master.css" \) -print)
part_master_css_files += $(shell find . \( -name "mimetypes.master.css" \) -print)

# Find all the files to be compressed, and set the extension for our rules
css_masters = $(shell find . \( -name "*.master.css" \) -print)
css_files = $(css_masters:%.master.css=%.css)


# Find our core js file that is generated and compressed
# If it isn't there define a variable to where it should be
main_js_uncompressed := $(shell find . \( -name "all_compressed.master.js" \) -print)
ifeq ($(main_js_uncompressed),)
main_js_uncompressed := $(join $(dir $(shell find . \( -name "xmlhttp.js" \) -print)), all_compressed.master.js )
endif

# Order matters for the js files that will be combined in the end
part_master_js_files := $(shell find . \( -name "xmlhttp.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "basescripts.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "random_promo.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "menu.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "sifr.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "scrollbar.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "spry.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "shelf.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "zebra.master.js" \) -print)
part_master_js_files += $(shell find . \( -name "overLabels.master.js" \) -print)

# Find all the files to be compressed, and set the extension for our rules
js_masters = $(shell find . \( -name "*.master.js" \) -print)
js_files = $(js_masters:%.master.js=%.js)

.PHONY: all clean

all: $(css_files) $(js_files) $(main_css_uncompressed) $(main_js_uncompressed)

$(main_css_uncompressed): $(part_master_css_files)
	@ echo "Creating: " $@
	@ echo "/* GENERATED FILE - DO NOT EDIT */" > $@
	@ cat $+ >> $@

$(main_js_uncompressed): $(part_master_js_files)
	@ echo "Creating: " $@
	@ echo "// GENERATED FILE - DO NOT EDIT " > $@
	@ cat $+ >> $@


%.css: %.master.css $(citations)
	@ echo "Compressing: " $<
	@ ./stripCSSComments.sh $< > $@
	@ cat $(citations) >> $@

%.js: %.master.js $(citations)
	@ echo "Compressing: " $<
	@ java JSMin $< > $@
	@ cat $(citations) >> $@


clean:
	rm -f $(css_files)
	rm -r $(js_files)
