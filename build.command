#!/bin/sh
#
# ENVIRONMENT
#
PROJECTNAME="Nest.js"
PROJECTVERSION="0.14.0"
COPYRIGHT="Copyright (c) 2014 Daniele Veneroni"
LICENSE="Licensed under the MIT License (X11 License)"
PROJECTDIR="/Users/Venerons/github/local/Nest.js/"
YUI="/Users/Venerons/Documents/Developer/yuicompressor-2.4.8.jar"
buildjs() {
	jsmin nest.js nest.min.js
}
#
# BUILD PROCEDURE
#
clear
BLUE="\033[1;34m"
GREEN="\033[32m"
MAGENTA="\033[35m"
NORMAL="\033[0m"
echo "$BLUE \bStarting $PROJECTNAME Build...$NORMAL"
cd $PROJECTDIR
echo "// $PROJECTNAME v$PROJECTVERSION | $COPYRIGHT | $LICENSE" > headerjs
jsmin() {
	if [ -e $2 ]; then
		rm $2;
	fi
	java -jar $YUI $1 -o $2 --type js --charset utf-8 --preserve-semi
	echo "" >> $2
	mv $2 tmp
	cat headerjs tmp > $2
	rm tmp
}
echo "$MAGENTA \bStarting JS compression...$NORMAL"
buildjs
echo "$GREEN \bJS compression finished.$NORMAL"
rm headerjs
echo "$BLUE \b$PROJECTNAME build finished.$NORMAL"
