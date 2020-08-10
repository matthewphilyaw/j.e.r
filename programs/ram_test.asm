
# Used to test CPU instructions

addi  x1, x0, 15
sw    x1, 0x80(x0)

lw    x2, 0x80(x0)
add   x3, x1, x2
sw    x3, 0x84(x0)
lw    x4, 0x84(x0)
