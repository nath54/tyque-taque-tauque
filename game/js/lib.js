
function nettoyage_table(taille=3){
    for(x=0;x<taille;x++){
        for(y=0;y<taille;y++){
            for(c of document.getElementById("case"+x+"|"+y).children){
                document.getElementById("case"+x+"|"+y).removeChild(c);
            }
            document.getElementById("case"+x+"|"+y).children=[];
            document.getElementById("case"+x+"|"+y).setAttribute("class","case");
        }
    }
}

function actualiser_pos_gagne(lcases,nbl=3,tx=3,ty=3){
    liste=[];
    for(x=0;x<tx;x++){
        for(y=0;y<ty;y++){
            //on est sur chaque case du plateau
            //on va tester l'alignement horizontal vers la droite
            if(tx-x>=nbl){
                var l1=[];
                var l2=[];
                for(xx=0;xx<nbl;xx++){
                    l1.push(lcases[x+xx][y])
                    l2.push([x+xx,y])
                }
                //on garde la syntaxe que j'avais mis à la base
                var ll=[];
                for(l of l1){ ll.push(l); }
                for(l of l2){ ll.push(l); }
                if(!(liste.includes(ll))){ liste.push(ll); }
            }
            //on va tester l'alignement vertical vers le bas
            if(ty-y>=nbl){
                var l1=[];
                var l2=[];
                for(yy=0;yy<nbl;yy++){
                    l1.push(lcases[x][y+yy])
                    l2.push([x,y+yy])
                }
                //on garde la syntaxe que j'avais mis à la base
                var ll=[];
                for(l of l1){ ll.push(l); }
                for(l of l2){ ll.push(l); }
                if(!(liste.includes(ll))){ liste.push(ll); }
            }
            //on va tester la diagonale vers le bas a droite
            if(tx-x>=nbl && ty-y>=nbl){
                var l1=[];
                var l2=[];
                for(xy=0;xy<nbl;xy++){
                    l1.push(lcases[x+xy][y+xy])
                    l2.push([x+xy,y+xy])
                }
                //on garde la syntaxe que j'avais mis à la base
                var ll=[];
                for(l of l1){ ll.push(l); }
                for(l of l2){ ll.push(l); }
                if(!(liste.includes(ll))){ liste.push(ll); }
            }
            //on va tester la diagonale vers le bas a gauche
            if(x>=nbl-1 && ty-y>=nbl){
                var l1=[];
                var l2=[];
                for(xy=0;xy<nbl;xy++){
                    l1.push(lcases[x-xy][y+xy])
                    l2.push([x-xy,y+xy])
                }
                //on garde la syntaxe que j'avais mis à la base
                var ll=[];
                for(l of l1){ ll.push(l); }
                for(l of l2){ ll.push(l); }
                if(!(liste.includes(ll))){ liste.push(ll); }
            }
        }
    }
    //console.log(liste);
    return liste;
}

//ancienne fonction
/*
function actualiser_pos_gagne(lcases){
    return [
        [lcases[0][0],lcases[1][0],lcases[2][0],[0,0],[1,0],[2,0]],
        [lcases[0][1],lcases[1][1],lcases[2][1],[0,1],[1,1],[2,1]],
        [lcases[0][2],lcases[1][2],lcases[2][2],[0,2],[1,2],[2,2]],
        [lcases[0][0],lcases[0][1],lcases[0][2],[0,0],[0,1],[0,2]],
        [lcases[1][0],lcases[1][1],lcases[1][2],[1,0],[1,1],[1,2]],
        [lcases[2][0],lcases[2][1],lcases[2][2],[2,0],[2,1],[2,2]],
        [lcases[0][0],lcases[1][1],lcases[2][2],[0,0],[1,1],[2,2]],
        [lcases[2][0],lcases[1][1],lcases[0][2],[2,0],[1,1],[0,2]]
    ];
}
*/

function teste_alignements(posesal,nbl=3){
    if(window.partie=="en cour"){
        for(pa of posesal){
            var cond=true;
            var a=pa[0];
            if(a==0){ cond=false; }
            for(i=1;i<nbl;i++){
                if(pa[i]!=a){ cond=false; }
            }
            if(cond){ return pa; }
        }
    }
    return null;
}

function teste_egalite(lcases){
    nbcasesvides=0;
    for(x=0;x<3;x++){
        for(y=0;y<3;y++){
            if(lcases[x][y]==0){ nbcasesvides++; }
        }
    }
    return nbcasesvides;
}


