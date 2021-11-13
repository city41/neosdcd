# Mag Lord and Rally Chase exploration

## swapping ISO's kind of works

using ralchase.neo and having mag lord iso data in ralchase/, when playing mag lord does load and plays just fine. Noted issues are some graphical glitches on the fixed layer and no redbook audio plays. Sound effects play just fine.

## cd files

SPR - sprite files, equivalent to C ROMs, usually 1mb in size
OBJ -- sprite files, but compressed with RLE
FIX - fix layer tileset, equivalent to S ROMs, max size 128kb
PCM - sound data, equivalent to V ROMs, max size 512kb
Z80 -- sound driver, equivalent to M1 ROMs, max size 64kb
PRG - 68k machine code, equivalent to P ROMs but not byteswapped
-- bigger games can have PRG files that just contain data such as level maps
PAT -- patches for z80 code, seem to be used to switch out sound effect tables
SYS -- holds tile and palette data to load the game's logo on the CDZ menu screen

cpy.txt -- copyright
bib.txt -- bibliography file
abs.txt -- abstracted by SNK file
ipl.txt -- Initial Program Load, indicates which files should be loaded by the system ROM at startup.

## mounted maglord ISO listing

-r-xr-xr-x 1 root root 32 Apr 11 1994 abs.txt
-r-xr-xr-x 1 root root 37 Apr 11 1994 bib.txt
-r-xr-xr-x 1 root root 30 Apr 11 1994 cpy.txt
-r-xr-xr-x 1 root root 88 Oct 5 1994 ipl.txt
-r-xr-xr-x 1 root root 1048576 Jun 17 1994 ml0.spr
-r-xr-xr-x 1 root root 1048576 Jun 17 1994 ml1.spr
-r-xr-xr-x 1 root root 1048576 Jun 17 1994 ml2.spr
-r-xr-xr-x 1 root root 131072 Sep 26 1994 ml.fix
-r-xr-xr-x 1 root root 524288 Aug 23 1994 ml.pcm
-r-xr-xr-x 1 root root 524288 Sep 27 1994 ml.prg
-r-xr-xr-x 1 root root 65536 Aug 24 1994 ml.z80

### ipl.txt

ML.FIX,0,0
ML.Z80,0,0
ML.PCM,0,0
ML0.SPR,0,0
ML1.SPR,1,0
ML2.SPR,2,0
ML.PRG,0,0

## mounted ralchase ISO listing

-r-xr-xr-x 1 root root 32 Apr 11 1994 abs.txt
-r-xr-xr-x 1 root root 37 Apr 11 1994 bib.txt
-r-xr-xr-x 1 root root 30 Apr 11 1994 cpy.txt
-r-xr-xr-x 1 root root 109 Oct 6 1994 ipl.txt
-r-xr-xr-x 1 root root 1048576 Aug 8 1994 rally0.spr
-r-xr-xr-x 1 root root 1048576 Mar 10 1994 rally1.spr
-r-xr-xr-x 1 root root 1048576 Mar 10 1994 rally2.spr
-r-xr-xr-x 1 root root 131072 Sep 26 1994 rally.fix
-r-xr-xr-x 1 root root 917504 May 17 1994 rally.pcm
-r-xr-xr-x 1 root root 1048576 Sep 27 1994 rally.prg
-r-xr-xr-x 1 root root 65536 Aug 25 1994 rally.z80

### ipl.txt

RALLY.FIX,0,0
RALLY.Z80,0,0
RALLY.PCM,0,0
RALLY0.SPR,0,0
RALLY1.SPR,1,0
RALLY2.SPR,2,0
RALLY.PRG,0,0
