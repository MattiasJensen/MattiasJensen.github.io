var TalkEngine = {
	init: function(){
		TalkEngine.getJSONData();
		TalkEngine.toggleNav();
	},
	toggleNav: function(){
		var filterTrigger = document.getElementById("js-filter-trigger");
		var hideFilter = document.getElementById("hide-filter")
		var filter = document.getElementById("filter");

		hideFilter.onclick = function(e){
			e.preventDefault();
			var className = "filter-active";
			TalkEngine.toggleClass(className);
		};

		filterTrigger.onclick = function(e){
			e.preventDefault();
			var className = "filter-active";
			TalkEngine.toggleClass(className);
		};
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

	    TalkEngine.handleCategories(data.categories);
		TalkEngine.handleTalks(data.talks, data.categories);
	},
	handleCategories: function(categories){
		var categoriesWrapper = document.getElementById("js-categories");
		var filteList = document.createElement("ul");

		for (var i = 0; i < categories.length; i++) {
			var category = categories[i];
			var li = document.createElement("li");
			var btn = document.createElement("a");
			var btnText = document.createTextNode(category.name);
			btn.href = "#";
			btn.setAttribute("data-id", category.id);
			btn.className = "filter-btn " + category.color;
			btn.appendChild(btnText);

			btn.onclick = function () {
			    //TalkEngine.handleTalks(data.talks, categories, this.dataset.id); 
			}
			li.appendChild(btn);
			filteList.appendChild(li);
			categoriesWrapper.appendChild(filteList);
		}
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
		
	},
	toggleClass: function(className){
		
		var body = document.body;

		if (body.classList) {
			body.classList.toggle(className);
		} else {
			var classes = body.className.split(' ');
			var existingIndex = classes.indexOf(className);

			if (existingIndex >= 0){
				classes.splice(existingIndex, 1);
			}else{
				classes.push(className);	
			}
			
			body.className = classes.join(' ');
		}
	}
}
window.onload = TalkEngine.init;