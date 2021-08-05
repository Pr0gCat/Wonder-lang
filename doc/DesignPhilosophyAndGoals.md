# Design Philosophy and Goals

## Painless

Try not to put "Handcuffs" to users more than they need unless they want to. Beside the **MUST** exist restrictions, design that is vital to keep things work and clean (syntaxs, file convention etc.). There should be restrictions that enhance development (naming convention checking, restrict danger operations etc.), user might want to toggle these restrictions for better, reliable code. This kind of restrictions should be disable by default and the user could decide what they want.

## Clean

**No Ambiguity/Uncertainty**

Everything should be well define, so we won't encounter weird problems.

**Readability is EVERYTHING**

Speed optimization is compiler's job! If your compiler could not output code that you want, why bother use it?

## Portable

OSDev friendly, thats why I start this.

## Standalone

Standalone standard library, no libc involved.

## Warning is meaningless

Lets be honest, who cares about warnings? If it is so important, it should be an error.

## Eliminate differences among platforms

The 'LF' and 'CRLF' thing, the '/path' and '\path' thing etc. I am sick of it!

