(function(window){

	function init(){
		if(Modernizr.history){
			YB.html5History.init();
			YB.navigation.init();
		}
	}

	window.YB = {
		init: init
	}

}(window)) // Self execute

YB.html5History = (function(window){

	function init(){
		$(window).bind("popstate",onPopState);
	}

	function onPopState(){
		if(document.location.pathname.split('').pop() != "/"){
			YB.navigation.loadContent(document.location.pathname);
		}	
		
		
	}

	function doPushState(url){
		if (Modernizr.history) {
			window.history.pushState('', '', url);
		}
	}

	return {
		init : init,
		doPushState : doPushState
	};

})(window);

YB.navigation = (function(window){

	var $elements;

	function init(){
		$elements = $(".article-list a,.homelink");
		$elements.on('click',navigateToClickedItem);
		$("h1").on('click',function(){
			$(".articleContent").fadeOut();
		});
	}

	function navigateToClickedItem(event){
		var url = $(this).attr("href").split('/').pop();

		loadContent(url);
		YB.html5History.doPushState(url);	
		event.preventDefault();
	}

	function loadContent(href){
		var pelle = href + " #page";
		$("#page").load(pelle,function(response){
			init();
			$(".articleContent").fadeIn();
		});
	}

	return {
		init : init,
		loadContent : loadContent
	};

})(window);