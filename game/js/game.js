
//on recupere les arguments
var parameters = location.search.substring(1).split("&");
window.taille = parseInt(parameters[0]);
window.nbl = parseInt(parameters[1]);
window.cases=[];
//on crée le tableau
for(y=0;y<window.taille;y++){
    var ttr=document.createElement("tr");
    window.cases.push([]);
    for(x=0;x<window.taille;x++){
        window.cases[y].push([]);
        var ttd=document.createElement("td");
        var dd=document.createElement("div");
        dd.setAttribute("id","case"+x+"|"+y);
        dd.setAttribute("class","case");
        dd.setAttribute("onclick","jouer("+x+","+y+")");
        ttd.appendChild(dd);
        ttr.appendChild(ttd);
    }
    document.getElementById("table_cases").appendChild(ttr)
}

window.partie="pas commence";

function test_gagne(){
    //test des alignements
    var posesal=actualiser_pos_gagne(Array.from(window.cases),window.nbl,window.taille,window.taille);
    var pa=teste_alignements(posesal,window.nbl);
    if(pa!=null){
        for(p of pa){
            if(Array.isArray(p) && p.length==2){
                document.getElementById("case"+p[0]+"|"+p[1]).setAttribute("class","case_victoire");
            }
        }
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
    cx=parseInt(Math.random()*window.taille);
    cy=parseInt(Math.random()*window.taille);
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
        document.getElementById("case"+x+"|"+y).appendChild(c);
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
    nettoyage_table(window.taille);
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
    window.partie="en cour";
    window.cases=[];
    for(x=0;x<window.taille;x++){
        window.cases.push([]);
        for(y=0;y<window.taille;y++){
            window.cases[x].push(0);
        }
    }
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

