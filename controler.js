// var controler = {};
//
// controler.ajouter_recherche = function(){
// //récupération de la zone_saisie
// 	var texte_recherche = document.createTextNode(zone_saisie.value);
// //ajout dans recherche_stockees des éléments
// 	recherches.appendChild(label);
// 	label.appendChild(texte_recherche);
// 	recherches.appendChild(effacer);
// 	var recherche_stockees = document.getElementById("recherches-stockees");
// 	recherche_stockees.appendChild(recherches);
// 	zone_saisie.value="";
// //ajout des données cliquables 1.2)
// 	var croix = document.getElementsByClassName("icone-croix");
// 	for(var h = 0; h < croix.length ; h++){
// 		croix[h].setAttribute("onclick", "controler.supprimer_recherche(this)");
// 		label.setAttribute("onclick", "controler.selectionner_recherche(this)");
// 	}
// 	//création du cookie recherches
// 	var cookieVal = JSON.stringify(recherches.textContent);
// 	$.cookie("recherches", cookieVal, { expires : 1000});
// }
//
// controler.supprimer_recherche = function(e){
//   var div = e.parentNode.parentNode;
//   var p = e.parentNode;
//   div.removeChild(p);
//   //création du cookie recherches
//   var objJson = JSON.stringify(recherches.textContent);
//   $.cookie("recherches", objJson, { expires : 1000});
// }
//
//
// controler.selectionner_recherche = function(e){
//   recherche_courante = e.lastChild.textContent;
//   $('#zone_saisie').val(recherche_courante);
//   if(typeof $.cookie(recherche_courante) != 'undefined' && $.cookie(recherche_courante) != ""){
//     $('#resultats').children().remove();
//     var objJSON = JSON.parse($.cookie(recherche_courante));
//     recherche_courante_news = objJSON;
//     objJSON.forEach(function(element){
//       $('#resultats').append("<p class=\"titre_result\"><a class=\"titre_news\" href=\"" +  element.url + "\" target=\"_blank\">"+element.titre+"</a><span class=\"date_news\">"+ element.date + "</span><span class=\"action_news\" \"><img src=\"disk15.jpg\"/></span></p>");
//     });
//   }
// }
//
// controler.rechercher_nouvelles = function(){
//   $('#resultats').children().remove();
//   $('#wait').css( "display", "block" );
//   var search  = $('#zone_saisie').val();
//   recherche_courante = search;
//   ajax_get_request(maj_resultats,"search.php?data=".concat(search) ,true);
//   if(typeof $.cookie(recherche_courante) != 'undefined' && $.cookie(recherche_courante) != "" && recherche_courante != ""){
//     var objJSON = JSON.parse($.cookie(recherche_courante));
//     recherche_courante_news = objJSON;
//   }
//
// }
//
//
//
// controler.maj_resultats = function(res){
//   $('#wait').css( "display", "none" );
//   var obj = JSON.parse(res);
//   obj.forEach(function(element){
//     var date = format(element.date);
//     element.date = date;
//     if(indexOf(recherche_courante_news,element) != -1){
//       strFunct = "supprimer_nouvelle(this)";
//       strPNG = "disk15"
//     } else {
//       strFunct = "sauver_nouvelle(this)";
//       strPNG = "horloge15"
//     }
//     $('#resultats').append("<p class=\"titre_result\"><a class=\"titre_news\" href=\"" +  element.url + "\" target=\"_blank\">"+element.titre+"</a><span class=\"date_news\">"+ date + "</span><span class=\"action_news\" onclick=\"" + strFunct + "\"><img src=\""+ strPNG + ".jpg\"/></span></p>");
//   });
// }
//
//
// controler.sauver_nouvelle = function(e){
//   $(e).children().attr("src", "disk15.jpg");
// 	$(e).attr("onclick", "supprimer_nouvelle(this)");
// 	var titre = $(e.parentNode).children()[0].text;
// 	var date = $(e.parentNode).children()[0].href;
// 	var url = $(e.parentNode).children()[1].innerText;
// 	var obj  = {   titre: titre,
// 								 date: url,
// 								 url : date
// 	};
//
// 	if(indexOf(recherche_courante_news, obj) == -1){
// 		recherche_courante_news.push(obj);
// 	}
// 	console.log(recherche_courante_news);
//
//
// 	var strJSON = JSON.stringify(recherche_courante_news);
// 	console.log(strJSON);
// 	$.cookie(recherche_courante, strJSON, 1000);
// }
//
//
// controler.supprimer_nouvelle = function(e){
//   $(e).children();
//   console.log($(e).children());
// //création d'un élément labelattr("src", "horloge15.jpg");
//   $(e).attr("onclick", "sauver_nouvelle(this)");
//   var titre = $(e.parentNode).children()[0].text;
//   var date = $(e.parentNode).children()[0].href;
//   var url = $(e.parentNode).children()[1].innerText;
//   var obj  = {   titre: titre,
//                  date: url,
//                  url : date
//             };
//             console.log(recherche_courante_news);
//             console.log(obj);
//             console.log(indexOf(recherche_courante_news,obj));
//   if(indexOf(recherche_courante_news,obj) != -1){
//     var i = indexOf(recherche_courante_news,obj);
//     recherche_courante_news.splice(i,1);
//   }
//
//   var strJSON = JSON.stringify(recherche_courante_news);
//   $.cookie(recherche_courante, strJSON, 1000);
//
// }
//
// ////////////////////////////////////////////////
// /////////////// Autres focntions ///////////////
// ////////////////////////////////////////////////
//
// //AJAX GET
// controler.ajax_get_request = function(callback,url,async){
//   var xhr = new XMLHttpRequest();
// 	//création de l'objet
// 	xhr.onreadystatechange= function() {
// 		if ((xhr.readyState==4) && (xhr.status == 200)) {
// 			callback(xhr.responseText);
// 		}
// 	};
// 	// ouverture de l'objet xhr
// 	xhr.open("GET",url, async);
// 	// envoi de la requête HTTP
// 	xhr.send();
// }
//
// //worker pour mettre Ã  jour les rÃ©sultats : aprÃ¨s recherche et aprÃ¨s click sur recherches stockÃ©es
// controler.maj_resultats_worker= function(tableau){
//
// 	view.retirerGifAttente();
// 	//tri selon les dates : OPTIONS
// 	tableau.sort(dateInf);
//
// 	for(var i = 0; i < tableau.length; i++){
// 		view.creerResultats(tableau[i]);
// 	}
// }
//
// controler.init = function(){
//   document.getElementById("save").onclick = ajouter_recherche;
//
// 	// if ($.cookie("recherches") != null){
// 	// 	var obj = JSON.parse($.cookie("recherches"));
// 	// 	console.log(obj);
// 	// 	console.log($.cookie("recherches"));
// 	// 	 obj.forEach(function(recherches.textContent){
// 	// 	 	$('#recherches-stockees').append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">"+ recherches.textContent + "</label><img onclick=\"supprimer_recherche(this)\" src=\"croix30.jpg\" class=\"icone-croix\"/> </p>");
// 	// 	 	recherches.push(recherches.textContent);
// 	// 	 });
// 	//}
// }
