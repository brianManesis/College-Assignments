method SumFirst(n: nat) returns (sum: nat)
    ensures sum == n * (n + 1) / 2
{
    sum := 0;

    var i := 0;

    while i < n
    invariant n == 0 ==> i == 0
    invariant n != 0 ==> 0 <= i <= n
    invariant sum == i * (i + 1)/2
    {
        i := i + 1;
        sum := sum + i;
    }
}

// Q2

function Fib(n: nat): nat
{
    if n < 2 then n else Fib(n - 1) + Fib(n - 2)
}

method FibIter(n: nat) returns (x: nat)
    ensures x == Fib(n)
{
    var i := 0 ;
    x := 0 ;
    var y := 1 ;

    while  i < n
    invariant 0<=i<=n
    invariant x==Fib(i)
    invariant y == Fib(i+1)
    {
        x , y := y , x+y ;
        i := i + 1 ;
    }
}


// Q3
method Smallest(a: array<int>) returns (minIndex: nat)
requires a.Length > 0
ensures 0 <= minIndex < a.Length
ensures forall k :: 0 <= k < a.Length ==> a[k] >= a[minIndex]
{
    minIndex := 0;
    var i := 1;
    var n := a.Length;

    while i<n
    invariant 0 <= minIndex < i
    invariant 0 <= i <= n 
    invariant forall k :: 0 <= k < i ==> a[k] >= a[minIndex]
    {
        if a[i] < a[minIndex] {
            minIndex := i;
        }
        i := i + 1;
    }
}


//Q4

method Filter<T>(a: array<T>, P: T -> bool) returns (s: seq<T>)
requires a.Length > 0
ensures forall k :: 0 <= k < a.Length && a[k] in s ==> P(a[k])
ensures s== [] && forall k :: 0 <= k < a.Length && a[k] in s ==> !P(a[k])
ensures multiset(s) <= multiset(a[..])
{
    s := [];

    var i := 0;

    while i < |s|
    
    {
        if(P(a[i])){
            s := s + [a[i]];
        }
        i:=i+1;
    }
}