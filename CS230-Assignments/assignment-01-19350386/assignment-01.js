
    document.getElementById("Button1").innerHTML = 0;
    document.getElementById("Button2").innerHTML = 0;
    document.getElementById("Button3").innerHTML = 0;
    document.getElementById("Button4").innerHTML = 0;
    document.getElementById("Button5").innerHTML = 0;
    document.getElementById("Button6").innerHTML = 0;

    function addDate(){
        document.getElementById("date").innerHTML = document.getElementById("Date").value;
    }
    function decrement(id){
        var button = document.getElementById(id);
        var count = parseInt(button.innerHTML);
        if(count > 0){
            count--;
        }
        button.innerHTML = count;
    }
    function increment(id){
        var button = document.getElementById(id);
        var count =  parseInt(button.innerHTML);
        count++;
        button.innerHTML = count;
    }