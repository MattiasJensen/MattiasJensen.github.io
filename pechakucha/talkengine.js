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
		  }
		};
		request.onerror = function() {};
		request.send();
	},
	handleResponse: function(data){

	    TalkEngine.handleCategories(data.categories);
	    TalkEngine.createTimeSlots(data.timeslots);
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

			btn.onclick = function (e) {
				e.preventDefault();
			    TalkEngine.handleTalks(data.talks, categories, this.dataset.id);
			    TalkEngine.toggleClass("filter-active");	 
			}
			li.appendChild(btn);
			filteList.appendChild(li);
			categoriesWrapper.appendChild(filteList);
		}
	},
	handleTalks: function(talks, categories, id){
	    var talksWrapper = document.getElementById("js-talks");
	    var talklist = document.createElement("ul");
	    var categoryTalkList = document.createElement("ul");
	    var timeslots = data.timeslots;

	    
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
            var locationtext = document.createTextNode(timeslots[talk.timeId].time + " " + talk.date + " " +talk.location);
            location.className = "location";           
        
            title.className = categories[talk.categoryId].color;
            title.appendChild(titletext);
            speaker.appendChild(speakertext);
            location.appendChild(locationtext);

            li.appendChild(title);
            talkDetails.appendChild(speaker);
            talkDetails.appendChild(location);
            li.appendChild(talkDetails);
            
		

			if(typeof id === 'undefined'){

				switch(talk.timeId){
					case 0:
						var wrapper = document.getElementById("timeslot-0");
						var testlist = document.createElement("ul");
						break;
					case 1:
						var wrapper = document.getElementById("timeslot-1");
						var testlist = document.createElement("ul");
						break;
					case 2:
						var wrapper = document.getElementById("timeslot-2");
						var testlist = document.createElement("ul");
						break;
					case 3:
						var wrapper = document.getElementById("timeslot-3");
						var testlist = document.createElement("ul");
						break;
					case 4:
						var wrapper = document.getElementById("timeslot-4");
						var testlist = document.createElement("ul");
						break;
				}

				testlist.appendChild(li);
				wrapper.appendChild(testlist);
			}else{
				if(talk.categoryId == id){
            		categoryTalkList.appendChild(li);
            	}
			}

        };
       
        if(categoryTalkList.children.length){
        	talksWrapper.innerHTML = "";
        	talksWrapper.appendChild(categoryTalkList);
        }
        
		
	},
	createTimeSlots: function(timeslots){

		var talksWrapper = document.getElementById("js-talks");
		talksWrapper.innerHTML = "";

		for (var i = 0; i < timeslots.length; i++) {
			var wrapper = document.createElement("div");
			var heading = document.createElement("h2");
			heading.className = "timeslotHeading";
			heading.innerHTML = timeslots[i].time;
			wrapper.id = "timeslot-" + timeslots[i].id;
			wrapper.appendChild(heading);
			talksWrapper.appendChild(wrapper);
		};


	},
	getElementsWithAttribute: function(attribute){
		var matchingElements = [];
		var allElements = document.getElementsByTagName('*');
		for (var i = 0, n = allElements.length; i < n; i++){
			if (allElements[i].getAttribute(attribute)){
				matchingElements.push(allElements[i]);
			}
		}
		return matchingElements;
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