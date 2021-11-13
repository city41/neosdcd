#!/bin/bash


xxd $1 > /tmp/diff1.hex
xxd $2 > /tmp/diff2.hex

vimdiff /tmp/diff1.hex /tmp/diff2.hex