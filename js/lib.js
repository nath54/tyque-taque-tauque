
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
function teste_alignements(posesal){
    if(window.partie=="en cour"){
        for(pa of posesal){
            if((pa[0]==1 && pa[1]==1 && pa[2]==1) || (pa[0]==2 && pa[1]==2 && pa[2]==2)){ return pa; }
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


