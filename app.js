//On définit une variable et on créé une instance de l'objet xmlhttprequest
var httpRequest = new XMLHttpRequest();
//On sélectionne tous les liens qui ont la classe météo
var result = document.getElementById('result')
var links = document.querySelectorAll('.meteo')
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    //on ajoute un evenement au click et function où sera logé le code AJAX
    link.addEventListener('click', function (e) {
        e.preventDefault()
        //On ajoute un message "chargement..." avant et pendant l'exécution de la requête
        result.innerHTML = "Chargement..."
        //On définit l'action à faire une fois que la requête est bien executé
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                //Si la rêquete renvoie un status 200, on traite la reponse
                if(httpRequest.status === 200)
                {
                    //result.innerHTML = httpRequest.responseText
                result.innerHTML = " "
                var results = JSON.parse(httpRequest.responseText)
                var ul = document.createElement('ul')
                result.appendChild(ul)
                for (i = 0; i < results.length; i++)
                {
                    var li = document.createElement('li')
                    li.innerHTML = results[i].name
                    ul.appendChild(li)
                }

                }else{
                    //En cas d'erreur 404, lors de la requête, on envoie un message d'alerte
                    alert('Impossible de contacter le serveur')
                }
            
            }
        }
        //On définit la méthode, l'url et true pour continuer la requête pendant son execution
        httpRequest.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
        //On envoie les informations dans l'objet pour lancer cet appel avec la méthode send()
        httpRequest.send()
    })
}

