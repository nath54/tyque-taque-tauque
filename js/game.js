window.partie="pas commence";
window.cases=[[0,0,0],[0,0,0],[0,0,0]];

function actualiser_pos_gagne(){
    window.posalignments=[
        [window.cases[0][0],window.cases[1][0],window.cases[2][0],[0,0],[1,0],[2,0]],
        [window.cases[0][1],window.cases[1][1],window.cases[2][1],[0,1],[1,1],[2,1]],
        [window.cases[0][2],window.cases[1][2],window.cases[2][2],[0,2],[1,2],[2,2]],
        [window.cases[0][0],window.cases[0][1],window.cases[0][2],[0,0],[0,1],[0,2]],
        [window.cases[1][0],window.cases[1][1],window.cases[1][2],[1,0],[1,1],[1,2]],
        [window.cases[2][0],window.cases[2][1],window.cases[2][2],[2,0],[2,1],[2,2]],
        [window.cases[0][0],window.cases[1][1],window.cases[2][2],[0,0],[1,1],[2,2]],
        [window.cases[2][0],window.cases[1][1],window.cases[0][2],[2,0],[1,1],[0,2]]
    ];
}

function nettoyage_table(){
    for(x=0;x<=2;x++){
        for(y=0;y<=2;y++){
            for(c of document.getElementById("case"+x+y).children){
                document.getElementById("case"+x+y).removeChild(c);
            }
            document.getElementById("case"+x+y).children=[];
            document.getElementById("case"+x+y).setAttribute("class","case");
        }
    }
}

function test_gagne(){
    //test des alignements
    actualiser_pos_gagne();
    if(window.partie=="en cour"){
        for(pa of window.posalignments){
            if((pa[0]==1 && pa[1]==1 && pa[2]==1) || (pa[0]==2 && pa[1]==2 && pa[2]==2)){
                window.partie="finie";
                window.gagne=pa[0];
                document.getElementById("case"+pa[3][0]+pa[3][1]).setAttribute("class","case_victoire");
                document.getElementById("case"+pa[4][0]+pa[4][1]).setAttribute("class","case_victoire");
                document.getElementById("case"+pa[5][0]+pa[5][1]).setAttribute("class","case_victoire");
            }
            
        }
    }
    //test pour egalité
    if(window.partie=="en cour"){
        nbcasesvides=0;
        for(x=0;x<3;x++){
            for(y=0;y<3;y++){
                if(window.cases[x][y]==0){
                    nbcasesvides++;
                }
            }
        }
        if(nbcasesvides==0){
            window.gagne=0;
            window.partie="finie"
        }
    }
    if(window.partie!="en cour"){
        finit_partie();
    }
}

function jouerbotalea(){
    cx=parseInt(Math.random()*3);
    cy=parseInt(Math.random()*3);
    jouer(cx,cy,isbot=true);
}

function jouer(x,y,isbot=false){
    //alert(x+" "+y);
    //on teste l'état de la partie
    if(window.partie!="en cour"){
        alert("La partie est soit finie, soit pas encore commencée !");
        return ;
    }
    //on teste que c'est bien le bon joueur qui joue
    if( (isbot==false && window.js[window.ajouer-1]!="humain") || (isbot==true && window.js[window.ajouer-1]=="humain")){
        return ;
    }
    //test case vide
    if(window.cases[x][y]==0){
        //on joue le coup
        var c=document.createElement("p");
        c.setAttribute("class","pion");
        c.style.color=window.jcolors[window.ajouer-1];
        c.innerHTML=window.cacs[window.ajouer-1];
        document.getElementById("case"+x+y).appendChild(c);
        window.cases[x][y]=window.ajouer;
        //on teste si gagne
        test_gagne();
        //on change le joueur
        if(window.ajouer==1){ window.ajouer=2; }
        else{ window.ajouer=1; }
    }
    //si le joueur suivant est un bot
    if(window.partie=="en cour"){
        if(window.js[window.ajouer-1]=="bot - aléatoire"){ jouerbotalea(); }
    }
    
}

function init_partie(){
    //
    nettoyage_table();
    //
    window.j1=document.getElementById("tj1").value;
    window.j2=document.getElementById("tj2").value;
    window.js=[window.j1,window.j2];
    window.cacj1=document.getElementById("pj1").value;
    window.cacj2=document.getElementById("pj2").value;
    window.cacs=[window.cacj1,window.cacj2];
    window.clj1=document.getElementById("clj1").value;
    window.clj2=document.getElementById("clj2").value;
    window.jcolors=[window.clj1,window.clj2];
    window.ajouer=1; //1 = j1 , 2 = j2 
    window.partie="en cour"
    window.cases=[[0,0,0],[0,0,0],[0,0,0]];
    window.gagne=null;
    //si le joueur suivant est un bot
    if(window.partie=="en cour"){
        if(window.js[window.ajouer-1]=="bot - aléatoire"){ jouerbotalea(); }
    }
}

function finit_partie(){
    var txt="égalité";
    if(window.gagne==1){ txt="le joueur 1 a gagné !"; }
    else if(window.gagne==2){ txt="le joueur 2 a gagné !"; }
    document.getElementById("gagnant").innerHTML=txt;
}

