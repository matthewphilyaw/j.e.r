.MODEL SMALL

.DATA
.CODE
proc:
 

    MOV $AX DATA
    MOV $DX $AX

    MOV $AL 20
    MOV $CL 10
    MOV $AH 00
    DIV $CL
    MOV $DX $AX
    ADD $DX 0X3030
    MOV $AH 0X02
    INT 0X21

    MOV $DL $DH
    INT 0X21




    MOV $AX 0X4C00
    INT 0X21

MAIN ENDP
END MAIN