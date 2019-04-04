var model = {};
model.recherche_courante="";
model.recherches=[];
model.recherche_courante_news=[];

model.setRechercheCourante = function(recherche)
{
  this.recherche_courante = recherche;
}

model.getRechercheCourante = function()
{
  return this.recherche_courante;
}
