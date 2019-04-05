var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche(){
//creation d'un element p
	recherches = document.createElement("p");
	recherches.className = 'titre-recherche';
//création d'un élément label
	label = document.createElement("label");
//création d'un élément img
	var effacer = document.createElement("img");
	effacer.src = 'croix30.jpg';
	effacer.className = 'icone-croix';
//récupération de la zone_saisie
	var texte_recherche = document.createTextNode(zone_saisie.value);
//ajout dans recherche_stockees des éléments
	recherches.appendChild(label);
	label.appendChild(texte_recherche);
	recherches.appendChild(effacer);
	var recherche_stockees = document.getElementById("recherches-stockees");
	recherche_stockees.appendChild(recherches);
	zone_saisie.value="";
//ajout des données cliquables 1.2)
	var croix = document.getElementsByClassName("icone-croix");
	for(var h = 0; h < croix.length ; h++){
		croix[h].setAttribute("onclick", "supprimer_recherche(this)");
		label.setAttribute("onclick", "selectionner_recherche(this)");
	}
	//création du cookie recherches
	var cookieVal = JSON.stringify(recherches.textContent);
	$.cookie("recherches", cookieVal, { expires : 1000});
}

function supprimer_recherche(e){
	var div = e.parentNode.parentNode;
	var p = e.parentNode;
	div.removeChild(p);
	//création du cookie recherches
	var objJson = JSON.stringify(recherches.textContent);
	$.cookie("recherches", objJson, { expires : 1000});
}


function selectionner_recherche(e){
		recherche_courante = e.lastChild.textContent;
		$('#zone_saisie').val(recherche_courante);
		if(typeof $.cookie(recherche_courante) != 'undefined' && $.cookie(recherche_courante) != ""){
			$('#resultats').children().remove();
			var obj_JSON = JSON.parse($.cookie(recherche_courante));
			recherche_courante_news = obj_JSON;
			obj_JSON.forEach(function(element){
				$('#resultats').append("<p class=\"titre_result\"><a class=\"titre_news\" href=\"" +  element.url + "\" target=\"_blank\">"+element.titre+"</a><span class=\"date_news\">"+ element.date + "</span><span class=\"action_news\" \"><img src=\"disk15.jpg\"/></span></p>");
			});
		}
}


function rechercher_nouvelles(){
		$('#resultats').children().remove();
		$('#wait').css( "display", "block" );
		var search  = $('#zone_saisie').val();
		recherche_courante = search;
		ajax_get_request(maj_resultats,"search.php?data=".concat(search) ,true);
		if(typeof $.cookie(recherche_courante) != 'undefined' && $.cookie(recherche_courante) != "" && recherche_courante != ""){
			var objJSON = JSON.parse($.cookie(recherche_courante));
			recherche_courante_news = objJSON;
		}

}


function maj_resultats(res){
	$('#wait').css( "display", "none" );
	var obj = JSON.parse(res);
	obj.forEach(function(element){
		var date = format(element.date);
		element.date = date;
		if(indexOf(recherche_courante_news,element) != -1){
			strFunct = "supprimer_nouvelle(this)";
			strPNG = "disk15"
		} else {
			strFunct = "sauver_nouvelle(this)";
			strPNG = "horloge15"
		}
		$('#resultats').append("<p class=\"titre_result\"><a class=\"titre_news\" href=\"" +  element.url + "\" target=\"_blank\">"+element.titre+"</a><span class=\"date_news\">"+ date + "</span><span class=\"action_news\" onclick=\"" + strFunct + "\"><img src=\""+ strPNG + ".jpg\"/></span></p>");
	});
}


function sauver_nouvelle(e){
	$(e).children().attr("src", "disk15.jpg");
	$(e).attr("onclick", "supprimer_nouvelle(this)");
	var titre = $(e.parentNode).children()[0].text;
	var date = $(e.parentNode).children()[0].href;
	var url = $(e.parentNode).children()[1].innerText;
	var obj  = {
		titre: titre,
	 	date: url,
		url : date
	};
	if(indexOf(recherche_courante_news, obj) == -1){
		recherche_courante_news.push(obj);
	}
	var strJSON = JSON.stringify(recherche_courante_news);
	$.cookie(recherche_courante, strJSON, 1000);
}


function supprimer_nouvelle(e){
	$(e).children().attr("src", "horloge15.jpg");
//création d'un élément labelattr("src", "horloge15.jpg");
	$(e).attr("onclick", "sauver_nouvelle(this)");
	var titre = $(e.parentNode).children()[0].text;
	var date = $(e.parentNode).children()[0].href;
	var url = $(e.parentNode).children()[1].innerText;
	var obj  = {
		 titre: titre,
		 date: url,
		 url : date
	};
	if(indexOf(recherche_courante_news,obj) != -1){
		var i = indexOf(recherche_courante_news,obj);
		recherche_courante_news.splice(i,1);
	}
	var strJSON = JSON.stringify(recherche_courante_news);
	$.cookie(recherche_courante, strJSON, 1000);
}


function ajax_get_request(callback,url,async){
	var xhr = new XMLHttpRequest();
	//création de l'objet
	xhr.onreadystatechange= function() {
		if ((xhr.readyState==4) && (xhr.status == 200)) {
			callback(xhr.responseText);
		}
	};
	// ouverture de l'objet xhr
	xhr.open("GET",url, async);
	// envoi de la requête HTTP
	xhr.send();
}


function init(){
	document.getElementById("save").onclick = ajouter_recherche;

	// if ($.cookie("recherches") != null){
	// 	var obj = JSON.parse($.cookie("recherches"));
	// 	 obj.forEach(function(recherches.textContent){
	// 	 	$('#recherches-stockees').append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">"+ recherches.textContent + "</label><img onclick=\"supprimer_recherche(this)\" src=\"croix30.jpg\" class=\"icone-croix\"/> </p>");
	// 	 	recherches.push(recherches.textContent);
	// 	 });
	//}
}
