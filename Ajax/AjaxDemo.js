function showTime(){
    const date =new Date();
    return date.getHours+"Hrs:"+date.getMinutes+"Mins:"+date.getSeconds()+"Secs";
}

function showSessionExpires(){
    console.log("Activity-B:your session expired at "+showTime());
}

console.log("Activity-A:Trigerring Activity-B at "+showTime());
setTimeout(showSessionExpires,5000);
console.log("Activity-A:Trigerring Activity-B at "+showTime()+"will execute after 5 sec");