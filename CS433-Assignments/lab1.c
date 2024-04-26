#include <stdio.h>

int main() { 
    int res; 
    __asm__ (   "movl ch, '3';"
                "movl cl, '3';"
                "mov dl, '*' ":"=a"(res)
            ); 
    printf("%d \n", res);
    return 0; 
  
} 