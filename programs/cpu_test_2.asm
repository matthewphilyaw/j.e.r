
# Used to test CPU instructions

lw    x11, 4(x0)
addi  x11, x11, 4
sw    x11, 4(x0)

addi  x12, x0, 12
add   x13, x11, x12
sw    x13, 0(x0)
