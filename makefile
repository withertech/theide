.ONESHELL:
all:
	yarn
	cd theide
	yarn package:preview
.ONESHELL:
package:
	yarn
	cd theide
	yarn package
.ONESHELL:
run:
	yarn
	cd theide
	yarn package:preview
	dist/linux-unpacked/theide-ide