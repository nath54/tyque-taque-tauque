window.partie="pas commence";
window.cases=[[0,0,0],[0,0,0],[0,0,0]];



function test_gagne(){
    //test des alignements
    var posesal=actualiser_pos_gagne(Array.from(window.cases));
    var pa=teste_alignements(posesal);
    if(pa!=null){
        document.getElementById("case"+pa[3][0]+pa[3][1]).setAttribute("class","case_victoire");
        document.getElementById("case"+pa[4][0]+pa[4][1]).setAttribute("class","case_victoire");
        document.getElementById("case"+pa[5][0]+pa[5][1]).setAttribute("class","case_victoire");
        window.partie="finie";
        window.gagne=pa[0];
    }
    //test pour egalité
    if(window.partie=="en cour"){
        var nbcasesvides=teste_egalite(Array.from(window.cases));
        if(nbcasesvides==0){
            window.gagne=0;
            window.partie="finie";
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

//INUTILE POUR L'INSTANT, PAS IMPORTANT
/*
function eval_pos(plateau,joueur){
    var position=1; // 0=faut pas 1=bof 2=bien
    //on teste si le bot gagne
    var posal=actualiser_pos_gagne(plateau);
    var pa=teste_alignements(posal);
    //l'un des deux joueurs a gagne
    if(pa!=null){
        if(pa[0]==joueur){ position=2; } 
        else{ position=0; }
    }
    return position;
}

function pcoup(cx,cy,plateau,joueur){
    plat=Array.from(plateau);
    plat[cx][cy]=joueur;
    return plat;
}

function ccoups(pcases){
    var coupos=[];
    for(x=0;x<3;x++){
        for(y=0;y<3;y++){
            if(pcases[x][y]==0){ coupos.push([x,y]); }
        }
    }
    return coupos;
}

function rech_arbre(plat,joueur){
    //console.log(plat,joueur);
    var listeev={};
    //on regarde les coups possibles
    //console.log("plateau : ",plat);
    var coupos=ccoups(plat);
    //on va tester chaque coup
    if(coupos.length>0){
        for(c of coupos){
            var np=pcoup(c[0],c[1],plat,joueur);
            if(joueur==1){ var nj=2; }
            else{ var nj=1; }
            var r=rech_arbre(np,nj);
            if(r.length>0){
                listeev[c]=r;
            }
        }
    }
    return listeev;
}

function choice_arbre(plateau,joueur){
    console.log("debut choice arbre");
    var arbre=rech_arbre(plateau,joueur);
    console.log("arbre : ",arbre);
    var ka=Object.keys(arbre);
    var c=ka[parseInt(Math.random()*ka.length)];
    if(!(c==undefined) && c.length==2 ){
        cx,cy=c;
        return cx,cy;
    }
    else{
        cx=parseInt(Math.random()*3);
        cy=parseInt(Math.random()*3);
        return cx,cy;
    }
}

function bot_arbre_jouer(){
    //on va chercher la meilleure case
    cx,cy=choice_arbre(Array.from(window.cases),window.ajouer);
    //on joue
    jouer(cx,cy,isbot=true);
}
*/


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
        if(window.js[window.ajouer-1]=="bot - fort"){ bot_arbre_jouer(); }
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
        if(window.js[window.ajouer-1]=="bot - fort"){ bot_arbre_jouer(); }
    }
}

function finit_partie(){
    var txt="égalité";
    if(window.gagne==1){ txt="le joueur 1 a gagné !"; }
    else if(window.gagne==2){ txt="le joueur 2 a gagné !"; }
    document.getElementById("gagnant").innerHTML=txt;
}

