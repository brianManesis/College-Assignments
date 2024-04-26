// Q1
function MaxDef(a: int, b: int): int
{
    if a > b then a else b
}

function MinDef(a: int, b: int): int
{
    if a < b then a else b
}

method Max(a: int, b: int) returns (m: int)
ensures m == MaxDef(a,b)
{
    if(a>=b){
        m:=a;
    }
    else{
        m:=b;
    }
}

method {:test} TestMax()
{
    var x := Max(2, 3);
    assert x == 3;

    var y := Max(-4, 1);
    assert y == 1;

    var z := Max(0, 0);
    assert z == 0;
}

method Min(a: int, b: int) returns (m: int)
ensures m == MinDef(a,b)
{
    if(a<=b){
        m:=a;
    }
    else{
        m:=b;
    }
}

method {:test} TestMin()
{
    var x := Min(2, 3);
    assert x == 2;

    var y := Min(-4, 1);
    assert y == -4;

    var z := Min(0, 0);
    assert z == 0;
}

// Q2
function pow2(n: nat): nat
{
    if n == 0 then
        1
    else
        2*pow2(n-1)
}

function pow(a:int, n: nat): int
{
    if n == 0 then
        1
    else
        a*pow(a, n-1)
}
//Q3

method Pow(a: int, n: nat) returns (result: int)
ensures result == pow(a, n)
{
    // todo
    result := 1;
    var i := 0;
    while i < n
        invariant 0 <= i <= n
        invariant result == pow(a, i)
        decreases n-i
    {
        result := result * a;
        i := i + 1;
    }
}

// Q4

function Abs(n: int): int
{
    if n < 0 then
        -n
    else
        n
}

function gcd(a: int, b: int): int
    requires a > 0 && b > 0
    decreases Abs(a) + Abs(b)
{
    if a == b then
      a
    else if b > a then
      gcd(b - a, a)
    else
      gcd(b, a - b)
}

// Q5
predicate sorted(a: array<int>)
    reads a
{
     forall i, j | 0 <= i < j < a.Length :: a[i] <= a[j]
}

method BinarySearch(a: array<int>, value: int) returns (index: int)
    requires sorted(a)
    ensures index == -1 || 0 <= index < a.Length
     ensures index == -1 ==> value !in a[..]
     ensures index >= 0  ==> value in a[..]
{
    var low := 0;
    var high := a.Length;

    while low < high
        invariant 0 <= low <= high <= a.Length
        invariant value !in a[..low] && value !in a[high..]
    {
        var mid := (high + low) / 2;

        if a[mid] < value {
            low := mid + 1;
        } else if a[mid] > value {
            high := mid;
        } else {
            return mid;
        }
    }
    index := -1;
}
