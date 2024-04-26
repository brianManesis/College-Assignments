#include <stdio.h>
#define squared(x) ((x)*(x))

int main ( void )
{
    double ans = 18.0 / squared(2+1);
    printf( "%lf\n",ans) ;
    return 0; 
}