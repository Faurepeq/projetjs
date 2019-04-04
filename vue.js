var view ={};


view.setAttribute = function(element,attribut,valeur){
  element.setAttribute(attribut,valeur);
}


//retourne la value de la zone de saisie
view.getValZoneSaisie = function(){
  return document.getElementById("zone_saisie").value;
}


//set la value dans la zone de saisie
view.setValZoneSaisie = function(value){
  document.getElementById("zone_saisie").value = value;
}


view.creerRecherche = function(sauvegarde,id){
  //creation d'un element p
  var recherches = document.createElement("p");
  var	recherches.className = 'titre-recherche';
  //création d'un élément label
  var label = document.createElement("label");
  label.innerHTML =  sauvegarde;
  label.setAttribute("onclick","controler.selectionner_recherche(this)");
  label.setAttribute("id",id);
  // change le nom de la recherche stockée
  label.setAttribute("ondblclick","controler.modifIdRecherche(this)");
  recherches.append(label);
  //création d'un élément img pour supprimer une recherche
  var effacer = document.createElement("img");
  effacer.src = 'croix30.jpg';
  effacer.className = 'icone-croix';
  effacer.setAttribute("onclick","controler.supprimer_recherche(this)");
  recherches.append(effacer);
  document.getElementById("recherches-stockees").append(p);
}
