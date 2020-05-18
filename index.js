

function play(){
    var nbl=document.getElementById("inbl").value;
    var taille=document.getElementById("itaille").value;
    if(parseInt(taille)>=parseInt(nbl)){
        var lien="game/index.html?"+taille+"&"+nbl;
        Javascript:window.open(lien);
    }
    else{
        alert("EH ! Comment voulez vous aligner un nombre de pions plus grand que la taille du plateau ?")
    }
}






