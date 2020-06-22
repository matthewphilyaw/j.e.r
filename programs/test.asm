addi sp, x31, -32
addi sp, x31, %blah(test)(t0)
addi a1, x4, %super(test)
nop
nop
add  t0, a1, sp
addi sp, x31, 1000
addi sp, x5, %someOther(FREE)(x4)
