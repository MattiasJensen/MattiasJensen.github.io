var TalkEngine = {
	init: function(){
		TalkEngine.getJSONData();
	},
	getJSONData: function(){

		request = new XMLHttpRequest();
		request.open('GET', 'talks.json', true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400){
		    data = JSON.parse(request.responseText);
		    
		    TalkEngine.handleResponse(data);
		  } else {
		    // We reached our target server, but it returned an error.
		  }
		};
		request.onerror = function() {
		  // There was a connection error of some sort.
		};
		request.send();
	},
	handleResponse: function(data){
	    //TalkEngine.handleCategories(data.categories);
	    console.log(data);
		TalkEngine.handleTalks(data.talks, data.categories);
	},
	handleCategories: function(categories){
		var categoriesWrapper = document.getElementById("js-categories");
		var clearbtn = document.createElement("button");
		
		clearbtn.innerHTML = "Alla";
	    clearbtn.className = "filterbtn";
		clearbtn.onclick = function () {
	        TalkEngine.handleTalks(data.talks, null);
	    };
		categoriesWrapper.appendChild(clearbtn);
		for (var i = 0; i < categories.length; i++) {
		    
			var category = categories[i];
			var btn = document.createElement("button");
			var btnText = document.createTextNode(category.name);
			btn.appendChild(btnText);
			btn.setAttribute("data-id", category.id);
			btn.className = "filterbtn";

			btn.onclick = function () {
			    TalkEngine.handleTalks(data.talks, this.dataset.id);
				console.log(this);
			    //Filter talks by id.
			}
			categoriesWrapper.appendChild(btn);
		    
		};
	},
	handleTalks: function(talks, categories){
	    var talksWrapper = document.getElementById("js-talks");
	    talksWrapper.innerHTML = "";
	    var talklist = document.createElement("ul");

	    
	    
        for (var i = 0; i < talks.length; i++) {
            
        	var talk = talks[i];
        	var li = document.createElement("li");

        	var title = document.createElement("h2");
        	var titletext = document.createTextNode(talk.title);

        	var talkDetails = document.createElement("div");
        	talkDetails.className = "talkDetails";

        	var speaker = document.createElement("p");
            var speakertext = document.createTextNode("By " + talk.speaker + ", " + categories[talk.categoryId].name + " " + talk.country);

            var location = document.createElement("p");
            var locationtext = document.createTextNode(talk.time + " " + talk.date + " " +talk.location);
            location.className = "location";

            title.className = categories[talk.categoryId].color;
            title.appendChild(titletext);
            speaker.appendChild(speakertext);
            location.appendChild(locationtext);

            li.appendChild(title);
            talkDetails.appendChild(speaker);
            talkDetails.appendChild(location);
            li.appendChild(talkDetails);
            talklist.appendChild(li);


        };
        talksWrapper.appendChild(talklist);
		
	}
}
window.onload = TalkEngine.init;