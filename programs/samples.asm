foo: bar
1:      auipc   t0, %pcrel_hi(mtvec)(1a3)        # load mtvec(hi)
        addi    t0, t0, %pcrel_lo(1b)       # load mtvec(lo)
        ld      a1, 0(a0)
        sd      a1, 0(a0)
