# header

## first four bytes

42 45 4f 1
"N" "E" "0" 1

just like normal .neo files

# CD game listings in the directory

For the most part, the NeoSD doesn't seem fully aware that a given game is a CD game. I say that because:

* the "(CD)" in the name is hard coded into the .neo file
* the presence or absence or the corresponding cd folder has no impact on the listing
  * if you try to load a cd game that is missing the folder, the NeoSD resets instead
    * this suggests to me the NeoSD blindly starts loading the game, is then told "hey go load these cd files" and has an exception when they aren't found. So it feels like the initial loading process of a game is the same for cart and cd games.

## NEOCD

However, when a CD game is focused, the details pane has "NEOCD: V00" shown, which cart games lack. So it does look like there is at least some meta data that is CD specific that the directory listing is surfacing.

