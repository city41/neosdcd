# .neo file format

This is the file format of normal, cart based, .neo files. Mostly focused on the header

# Header - first 4096 bytes

format is
offset (hex), length hex): description

// opening tag
0,1: "N" (4e)
1,1: "E" (45)
2,1: "O" (4f)
3,1: 01
// rom file sizes
4,4: p data length
8,4: s data length
c,4: m data length
10,4: v1 data length
14,4: v2 data length
18,4: c data length
// metadata
1c,4: year
20,4: genre number
24,4: screenshot number
28,4: NGH number (zero for homebrew)
29,21: game name, padded with zeros as needed
4a,11: manufacturer, padded with zeros as needed
52,fa5: filler, all zeroes, 4005d bytes long

# data

P Data, S Data, M Data, V Data then C Data. The size of each data section is game dependent and recorded in the header. The data sections have specific requirements such as interleaving, see neosdconv's source code for more info.



