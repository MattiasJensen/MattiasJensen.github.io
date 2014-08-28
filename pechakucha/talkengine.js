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
	    TalkEngine.handleCategories(data.categories, data.siteSettings);
		TalkEngine.handleTalks(data.talks, null, data.times);
	},
	handleCategories: function(categories, siteSettings){
		var categoriesWrapper = document.getElementById("js-categories");
		var clearbtn = document.createElement("button");
		var heading = document.getElementById("heading");
		heading.innerHTML = siteSettings[0].headingText;
		clearbtn.innerHTML = "Alla";
	    clearbtn.className = "filterbtn";
		clearbtn.onclick = function () {
	        TalkEngine.handleTalks(data.talks, null, data.times);
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
			    TalkEngine.handleTalks(data.talks, this.dataset.id, data.times);
				console.log(this);
			    //Filter talks by id.
			}
			categoriesWrapper.appendChild(btn);
		    
		};
	},
	handleTalks: function(talks, categoryId, times){
	    var talksWrapper = document.getElementById("js-talks");
	    talksWrapper.innerHTML = "";
	    id = categoryId;
	    console.log(times);

	    for (var k = 0; k < times.length; k++) {
	        var timeWrapper = document.createElement("div");
	        var timeTitle = document.createElement("h2");
	        var timeTitleText = document.createTextNode(times[k].time);

	        timeTitle.appendChild(timeTitleText);
	        timeWrapper.appendChild(timeTitle);
	        timeWrapper.className = "timeWrapper";
	        
	        for (var i = 0; i < talks.length; i++) {
	            
	            var talk = talks[i];

	            var talkdiv = document.createElement("div");

	            var title = document.createElement("h3");
	            var titletext = document.createTextNode(talk.title);

	            var speaker = document.createElement("p");
	            var speakertext = document.createTextNode(talk.speaker);

	            var location = document.createElement("p");
	            var locationtext = document.createTextNode(talk.location);
	            location.className = "location";

	            title.appendChild(titletext);
	            speaker.appendChild(speakertext);
	            location.appendChild(locationtext);

	            talkdiv.appendChild(title);
	            talkdiv.appendChild(speaker);
	            talkdiv.appendChild(location);
	            talkdiv.className = "talkWrapper";

	            if (talk.timeId == times[k].id && (id == null || talk.categoryId == id)) {
	                timeWrapper.appendChild(talkdiv);
	            }
	        };

	        if (timeWrapper.childNodes.length > 1) {
	            talksWrapper.appendChild(timeWrapper);
	        }
	        
	    }

		
	},
	handleTimes: function(times) {
	    
	}
}
window.onload = TalkEngine.init;