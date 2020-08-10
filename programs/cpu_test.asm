
# Used to test CPU instructions

addi x10, x0, 0x04
lw   x11, 0x0(x10)
add  x12, x11, x10
sw   x12, 0(x10)
