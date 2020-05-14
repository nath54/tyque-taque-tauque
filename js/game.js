window.partie="pas commence"

function nettoyage_table(){
    for(x=0;x<=2;x++){
        for(y=0;y<=2;y++){
            document.getElementById("case"+x+y).children=[];
        }
    }
}

function jouer(x,y,pc=false){
    //alert(x+" "+y);
    //on teste que c'est bien le bon joueur qui joue
    if( (pc==false && window.js[window.ajouer-1]!="humain") || (pc==true && window.js[window.ajouer-1]!="bot")){
        return ;
    }
    //test case vide
    if(document.getElementById("case"+x+y).children.length==0){
        //on joue le coup
        var c=document.createElement("p");
        c.setAttribute("class","pion");
        c.innerHTML=window.cacs[window.ajouer-1];
        document.getElementById("case"+x+y).appendChild(c);
        //on change le joueur
        if(window.ajouer==1){ window.ajouer=2; }
        else{ window.ajouer=1; }
    }
    else{
        //on ne peut pas jouer
    }
}


function init_partie(){
    //
    nettoyage_table();
    //
    window.j1="humain";
    window.j2="humain";
    window.js=[window.j1,window.j2];
    window.cacj1="X";
    window.cacj2="O";
    window.cacs=[window.cacj1,window.cacj2];
    window.clj1="rgb(0,0,0);"
    window.clj2="rgb(200,200,200);"
    window.ajouer=1; //1 = j1 , 2 = j2 
    window.partie="en cour"
    //
}





