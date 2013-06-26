/*! Build revision: 0064 (16.12.2012 22:49) */
/*!
 * Copyright 2011 Hakim El Hattab
 * 
 * @version 1.0
 */
/**
 * @author Hakim El Hattab
 */

(function( window ) {
	
	var handheld = navigator.userAgent.match( /(iphone|ipad|ipod|android)/gi );
	
	/**
	 * 
	 */
	function initialize() {

		if( handheld ) {
			$( document.body ).addClass( 'touch-device' );
		}
		
		buildOverlay();
		
		HE.history.initialize();
		HE.articles.initialize();
		HE.navigation.initialize();
		HE.header.initialize();
		HE.comments.initialize();
		HE.tracking.initialize();
		// HE.scroll.initialize();
		
		HE.history.broadcast();
		
		$( window ).resize( layout );
		$( window ).load( HE.header.showNav );
		
		$("footer").fadeIn();
		
		layout();
	}
	
	/**
	 * 
	 */
	function showOverlay() {
		layout();
		
		$( "html" ).addClass( 'overlay' );
		$( "#overlay" ).fadeIn();	
	}

	function hideOverlay() {
		HE.history.stripArticle();
		HE.navigation.deselectArticle();
		HE.comments.hide();
		
		$( "html" ).removeClass( 'overlay' );
		$( "#overlay" ).hide();
	}
	
	/**
	 * 
	 */
	function buildOverlay() {
		$( "#overlay" ).click( function( event ) {
			hideOverlay();
		} );
	}
	
	/**
	 * 
	 */
	function layout( overrideHeight ) {
		// $( "#overlay" ).height( overrideHeight || $( document ).height() );	
	}
	
	// Return the public API for this class
	window.HE = {
		handheld: handheld,
		
		initialize: initialize,
		showOverlay: showOverlay,
		hideOverlay: hideOverlay,
		updateLayout: layout
	};
	
}( window )) // Self execute














HE.util = {};

HE.util.REGEX_PROTOCOL_URL = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
HE.util.REGEX_WWW_URL = /(^|[^\/])(www\.[\S]+(\b|$))/gim
HE.util.REGEX_MAILTO = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim

/**
 * From http://stackoverflow.com/questions/37684/replace-url-with-html-links-javascript
 */
HE.util.linkify = function(inputText) {

	var replaceText, replacePattern1, replacePattern2, replacePattern3;
	
	//URLs starting with http://, https://, or ftp://
	replacePattern1 = HE.util.REGEX_PROTOCOL_URL;
	replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
	
	//URLs starting with www. (without // before it, or it'd re-link the ones done above)
	replacePattern2 = HE.util.REGEX_WWW_URL;
	replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
	
	//Change email addresses to mailto:: links
	replacePattern3 = HE.util.REGEX_MAILTO;
	replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
	
	return replacedText
	
}

/**
 * 
 */
HE.util.isURL = function( candidate ) {

	return candidate.match( HE.util.REGEX_PROTOCOL_URL ) || !candidate.match( HE.util.REGEX_WWW_URL );
	
}

window.requestAnimFrame = (function(){
   return  window.requestAnimationFrame       ||
 		  window.webkitRequestAnimationFrame ||
 		  window.mozRequestAnimationFrame    ||
 		  window.oRequestAnimationFrame      ||
 		  window.msRequestAnimationFrame     ||
 		  function( callback ){
 			window.setTimeout(callback, 1000 / 60);
 		  };
 })()

 // Rob Penner's easing equations
 jQuery.extend( jQuery.easing,
 {
 	def: 'easeOutQuad',
 	swing: function (x, t, b, c, d) {
 		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
 	},
 	easeInQuad: function (x, t, b, c, d) {
 		return c*(t/=d)*t + b;
 	},
 	easeOutQuad: function (x, t, b, c, d) {
 		return -c *(t/=d)*(t-2) + b;
 	},
 	easeInOutQuad: function (x, t, b, c, d) {
 		if ((t/=d/2) < 1) return c/2*t*t + b;
 		return -c/2 * ((--t)*(t-2) - 1) + b;
 	},
 	easeInCubic: function (x, t, b, c, d) {
 		return c*(t/=d)*t*t + b;
 	},
 	easeOutCubic: function (x, t, b, c, d) {
 		return c*((t=t/d-1)*t*t + 1) + b;
 	},
 	easeInOutCubic: function (x, t, b, c, d) {
 		if ((t/=d/2) < 1) return c/2*t*t*t + b;
 		return c/2*((t-=2)*t*t + 2) + b;
 	},
 	easeInQuart: function (x, t, b, c, d) {
 		return c*(t/=d)*t*t*t + b;
 	},
 	easeOutQuart: function (x, t, b, c, d) {
 		return -c * ((t=t/d-1)*t*t*t - 1) + b;
 	},
 	easeInOutQuart: function (x, t, b, c, d) {
 		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
 		return -c/2 * ((t-=2)*t*t*t - 2) + b;
 	},
 	easeInQuint: function (x, t, b, c, d) {
 		return c*(t/=d)*t*t*t*t + b;
 	},
 	easeOutQuint: function (x, t, b, c, d) {
 		return c*((t=t/d-1)*t*t*t*t + 1) + b;
 	},
 	easeInOutQuint: function (x, t, b, c, d) {
 		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
 		return c/2*((t-=2)*t*t*t*t + 2) + b;
 	},
 	easeInSine: function (x, t, b, c, d) {
 		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
 	},
 	easeOutSine: function (x, t, b, c, d) {
 		return c * Math.sin(t/d * (Math.PI/2)) + b;
 	},
 	easeInOutSine: function (x, t, b, c, d) {
 		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
 	},
 	easeInExpo: function (x, t, b, c, d) {
 		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
 	},
 	easeOutExpo: function (x, t, b, c, d) {
 		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
 	},
 	easeInOutExpo: function (x, t, b, c, d) {
 		if (t==0) return b;
 		if (t==d) return b+c;
 		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
 		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
 	},
 	easeInCirc: function (x, t, b, c, d) {
 		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
 	},
 	easeOutCirc: function (x, t, b, c, d) {
 		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
 	},
 	easeInOutCirc: function (x, t, b, c, d) {
 		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
 		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
 	},
 	easeInElastic: function (x, t, b, c, d) {
 		var s=1.70158;var p=0;var a=c;
 		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
 		if (a < Math.abs(c)) { a=c; var s=p/4; }
 		else var s = p/(2*Math.PI) * Math.asin (c/a);
 		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
 	},
 	easeOutElastic: function (x, t, b, c, d) {
 		var s=1.70158;var p=0;var a=c;
 		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
 		if (a < Math.abs(c)) { a=c; var s=p/4; }
 		else var s = p/(2*Math.PI) * Math.asin (c/a);
 		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
 	},
 	easeInOutElastic: function (x, t, b, c, d) {
 		var s=1.70158;var p=0;var a=c;
 		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
 		if (a < Math.abs(c)) { a=c; var s=p/4; }
 		else var s = p/(2*Math.PI) * Math.asin (c/a);
 		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
 		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
 	},
 	easeInBack: function (x, t, b, c, d, s) {
 		if (s == undefined) s = 1.70158;
 		return c*(t/=d)*t*((s+1)*t - s) + b;
 	},
 	easeOutBack: function (x, t, b, c, d, s) {
 		if (s == undefined) s = 1.70158;
 		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
 	},
 	easeInOutBack: function (x, t, b, c, d, s) {
 		if (s == undefined) s = 1.70158; 
 		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
 		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
 	},
 	easeInBounce: function (x, t, b, c, d) {
 		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
 	},
 	easeOutBounce: function (x, t, b, c, d) {
 		if ((t/=d) < (1/2.75)) {
 			return c*(7.5625*t*t) + b;
 		} else if (t < (2/2.75)) {
 			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
 		} else if (t < (2.5/2.75)) {
 			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
 		} else {
 			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
 		}
 	},
 	easeInOutBounce: function (x, t, b, c, d) {
 		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
 		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
 	}
 });/**
 * @author Hakim El Hattab
 */
HE.history = (function( window ) {
	
	var previousHash = '';
	
	// An interval used to check if the hash has changed
	var hashCheckInterval = -1;
	
	// Safari 5 on Mac is not disatching initial popState
	// at startup (like Chrome does) so we need to make an
	// exception broadcast at startup - this flag makes sure
	// that only happens once.
	var hasNavigated = false;
	
	/**
	 * 
	 */
	function initialize() {
		// Set up monetoring of changes to the history depending
		// on which type of history the browser supports
		if( supportsHistoryPushState() ) {
			// Woop, History API support detected. All we need now
			// is to listen to the popstate event
			$( window ).bind( "popstate", onPopState );
		}
		else {
			// Bummer, we need to fall back to hackistry and manually 
			// monitor changes to the URL.
			$( window ).bind( "hashchange", onHashChange );
		}
		
		var pathname = prependSlash( document.location.pathname );
		
		if( pathname === '/' ) {
			pathname = document.location.hash.slice(1);
		}
		
		var view = pathname.split("/")[1];
		var article = pathname.split("/")[2];
		
		if( !article ) {
			if( pathname.split('').pop() === '/' ) {
				pathname = pathname.slice( 0, pathname.lastIndexOf( '/' ) );
				doReplaceState( pathname );
			}
		}
		else {
			doReplaceState( pathname );
		}
	}
	
	/**
	 * Pushes a URL to the history stack, effectively 
	 * causing that URL to become the current location.
	 * 
	 * @param url {String} the URL that should be pushed
	 * to the history stack.
	 */
	function doPushState( url ) {
		if ( supportsHistoryPushState() ) {
			window.history.pushState('', '', url);
		}
		else {
			previousHash = '#' + prependSlash( url );
			document.location.hash = prependSlash( url );
		}
	}
	
	/**
	 * Replaces the current URL at the top of the history stack
	 * with a new one.
	 * 
	 * @param url {String} the URL that should take the place of
	 * the current URL in the history stack
	 */
	function doReplaceState( url ) {
		if ( supportsHistoryPushState() ) {
			window.history.replaceState('', '', url);
		}
		else {
			previousHash = '#' + prependSlash( url );
			document.location.hash = prependSlash( url );
		}
	}
	
	/**
	 * 
	 */
	function stripArticle() {
		
		var view = document.location.pathname.split( '/' )[1];
		
		if( !supportsHistoryPushState() ) {
			view = document.location.hash.slice( 1 ).split('/')[1];
		}
		
		if ( view ) {
			doReplaceState( '/' + view );
		}
		
	}
	
	/**
	 * 
	 */
	function prependSlash( path ) {
		if( path.indexOf('/') === 0 ) {
			return path;
		}
		
		return '/' + path;
	}
	
	/**
	 * 
	 */
	function broadcast() {
		
		setTimeout( function() {
			if (!hasNavigated) {
				if (supportsHistoryPushState()) {
					navigateToPath(document.location.pathname);
				}
				else {
					navigateToPath( prependSlash( document.location.hash.slice( 1 ) ) );
					
					previousHash = document.location.hash;
				}
			}
		}, 100 );
		
	}
	
	/**
	 * Check if HTML5's History API is supported.
	 */
	function supportsHistoryPushState() {
		return ('pushState' in window.history) && window.history['pushState'] !== null;
	}
	
	/**
	 * Called at an interval for browsers that do not support
	 * the history API. Checks if the hash has changed and issues 
	 * a navigation if so.
	 */
	function onHashChange() {
		if( document.location.hash !== previousHash ) {
			navigateToPath( prependSlash( document.location.hash.slice( 1 ) ) );
			
			previousHash = document.location.hash;
		}
	}
	
	/**
	 * Event handler for the window.onpopstate event.
	 * Causes the application to navigate to the state
	 * that was popped.
	 */
	function onPopState( event ) {
		navigateToPath( document.location.pathname );
	}
	
	/**
	 * Navigates to a certain path in the application.
	 * 
	 * The application does not use paths to navigate
	 * internally so we need this intermediary function
	 * to translate the path (i.e. URL) into an actual
	 * navigation.
	 * 
	 * @param pathname {String} the deeplink path which
	 * we want to navigate to, such as "/chapter/3" or
	 * "/home".
	 */
	function navigateToPath( pathname ) {
		
		if( pathname.split('').pop() === '/' ) {
			pathname = pathname.slice( 0, pathname.lastIndexOf( '/' ) );
		}
		
		if( pathname.indexOf( '/' ) !== 0 ) {
			pathname = '/' + pathname;
		}
		
		if( !pathname.match( /thoughts|experiments|projects|about/gi ) ) {
			pathname = '/';
		}
		
		// Flag that we have now navigated
		hasNavigated = true;
		
		// Extract the path name parts
		var view = pathname.split("/")[1];
		var article = pathname.split("/")[2];
		
		//console.log( 'HE.history.navigateToPath: ' + pathname );
		
		HE.navigation.navigateToView( view, article );
		
	}
	
	return {
		initialize: initialize,
		pushState: doPushState,
		replaceState: doReplaceState,
		stripArticle: stripArticle,
		prependSlash: prependSlash,
		broadcast: broadcast
	};
	
})( window );

/**
 * @author Hakim El Hattab
 */
HE.navigation = (function( window ) {
	
	// Animation settings
	var TRANSITION_DURATION = 900;
	var TRANSITION_EASING = 'easeInOutQuart';
	
	// Lists all available article elements, this list is
	// never modified after its definition at startup. The
	// articles herein are only cloned when they need to be 
	// shown.
	var articles = null;
	
	var container = null;
	var grid = null;
	
	var currentView = null;
	var previousViewID = '';
	
	/**
	 * 
	 */
	function initialize() {
		
		// Grab references to our related DOM elements
		container = $( "#main" );
		grid = $( "#grid" );
		
		// Store all of the original articles
		articles = $( "article", grid ).clone();
		
		// Remove the default grid now that we've grabbed the articles
		grid.remove();
		
		// Bind click listener to the logo
		$( "header h1 a" ).click( onHeaderLogoClick );
		
		// Bind click listeners for the main nav
		$( "header nav ul li:not(.external) a" ).click( onNavigationItemClick );
		
		$( window ).resize( onWindowResizeHandler );
		
	}
	
	function onWindowResizeHandler() {
		updateAllGrids();
	}
	
	function onHeaderLogoClick( event ) {
		
		HE.navigation.navigateToView( "" );
		HE.history.pushState( "/" );
		
		event.preventDefault();
		
	}
	
	function onNavigationItemClick( event ) {
		
		// Determine which view the clicked button points to
		var view = $( this ).attr( "href" );
		
		if( view.indexOf( '/' ) === 0 ) {
			view = view.slice(1);
		}
		
		if( view ) {
			HE.navigation.navigateToView( view );
			HE.history.pushState( view );
		}
		
		event.preventDefault();
		
	}
	
	function onArticleHeaderClick( event ) {
		
		var name = $( event.target ).parent( "article" ).attr( "id" );
		
		selectArticle( name, true );
		HE.tracking.trackPageView();
		
		event.preventDefault();
		
	}
	
	function onArticleActionLink( event ) {
		
		var name = $( event.target ).parents( "article" ).attr( "id" );
		
		selectArticle( name, true );
		HE.tracking.trackPageView();
		
		event.preventDefault();
		
	}
	
	function onArticleActionComment( event ) {
		
		var name = $( event.target ).parents( "article" ).attr( "id" );
		
		selectArticle( name, true );
		
		event.preventDefault();
		
	}
	
	function scrollTo( top ) {
		// Animate the scrolling
		$("html, body").stop(true,true).animate( {
			scrollTop: top
		}, TRANSITION_DURATION, TRANSITION_EASING );
	}
	
	function selectArticle( name, pushToHistory ) {
		
		if( name && name.length > 0 ) {
			// Attempt to find the article to select
			var article = $( "#" + name, grid );
			
			if( pushToHistory ) {
				
				var view = article.attr( "class" ).split( " " )[0];
				var name = article.attr( "id" );
				
				HE.history.pushState( "/" + view + "/" + name );
				
			}
			
			// If this article is already selected, deselect it (toggle)
			if( article.hasClass( "selected" ) ) {
				
				HE.hideOverlay();
				
			}
			else {
				
				if( article.length > 0 ) {
					
					article.addClass( "selected" );
					
					HE.showOverlay();
					
					// Only show comments if they are available to this
					// article
					if( $( '.actions .comment', article ).length ) {
						HE.comments.show( article );
					}
					
					var isAbove = article.position().top < $(window).scrollTop() - container.offset().top;
					var isBelow = article.position().top + article.outerHeight() > $(window).scrollTop() + $(window).height() - container.offset().top;
					
					if ( isAbove || isBelow ) {
						scrollTo(article.position().top + HE.header.getMinSizeScrollTop());
					}
					
				}
				
			}
		}
		
	}
	
	function deselectArticle() {
		// Deselect all articles
		$( "article" ).removeClass( "selected" );
	}
	
	function update() {
		updateAllGrids();
	}
	
	function navigateToView( viewID, articleID ) {
		
		if( viewID === this.currentView ) {
			return;
		}
		
		this.currentView = viewID;
		
		HE.tracking.trackPageView();
		
		$( "body" ).removeClass( previousViewID ).addClass( viewID );
		
		previousViewID = viewID;
		
		// Flags if a grid existed before this one was added
		var previousGridExisted = $( "#grid" ).length > 0;
		
		// Push a new grid to the stack
		pushGrid();
		
		var article = null;
		
		articles.each( function() {
			
			article = $( this );
			
			var isHomePage = !viewID,
				isExclusive = !article.attr('data-exclusive'),
				showIn = article.attr('data-showin') || '';
			
			// If the view is empty or matches that of the current 
			// article, show it
			if( isHomePage || showIn.match( viewID ) || article.hasClass( viewID ) ) {
				
				// Ensure that this article is not exlusive IF we are on 
				// the home page
				if ( !isHomePage || isExclusive ) {
				
					// 1. Clone the matched article
					// 2. Append the clone to the current grid
					// 3. Show the article
					article = article.clone().appendTo(grid).show();
					
					article.children("h2").click(onArticleHeaderClick);
					article.children(".actions").children(".link").click(onArticleActionLink);
					article.children(".actions").children(".comment").click(onArticleActionComment);
					article.find(".footer-comment").click(onArticleActionComment);
					
					article.children("a.image-link").each( function() {
						
						var imageLink = $(this);
						
						if( imageLink.length && imageLink.attr( 'title' ).length ) {
							imageLink.append( '<p>'+ imageLink.attr( 'title' ) +'</p>' );
							imageLink.addClass( 'caption' );
							imageLink.attr( 'title', '' );
						}
						
					} );
					
				}
				
			}
			
		} );
		
		updateAllGrids();
		
		// Only run the slide animation if this is not the first
		// grid
		if (previousGridExisted) {
			// If the user is scrolled down, we'll auto-scroll to the
			// top to show the new content
			if ($(window).scrollTop() > $('header').height()) {
				scrollTo(HE.header.getMinSizeScrollTop());
			}
			
			// Store all the default vertical sizing values of the grid
			var target = {
				height: grid.height(),
				marginTop: parseFloat(grid.css("margin-top")),
				marginBottom: parseFloat(grid.css("margin-bottom")),
				paddingTop: parseFloat(grid.css("padding-top")),
				paddingBottom: parseFloat(grid.css("padding-bottom"))
			};
			
			// Set all vertical sizing values to 0
			grid.css({
				height: 0,
				marginTop: 0,
				marginBottom: 0,
				paddingTop: 0,
				paddingBottom: 0
			});
			
			// Animate all vertical sizing values back up to their 
			// default values
			grid.animate({
				height: target.height,
				marginTop: target.marginTop,
				marginBottom: target.marginBottom,
				paddingTop: target.paddingTop,
				paddingBottom: target.paddingBottom
			}, TRANSITION_DURATION, TRANSITION_EASING );
			
		}
		
		// Attempt to select the article given to us by the history
		// manager
		selectArticle( articleID );
		
		// Social components are hidden from sigh during startup
		setTimeout( function() {
			$( '.social-component', grid ).removeClass( 'social-component' );
		}, 500 );
		
	}
	
	/**
	 * Pushes a new, empty, grid to the stack and inactivates
	 * the current one.
	 */
	function pushGrid( immediate ) {
		
		// Make the current grid anonymouse since we won't be 
		// changing it anymore
		grid.removeAttr( "id" );
		
		// Hide and remove this old grid
		grid.animate({
			height: 0,
			marginTop: 0,
			marginBottom: 0,
			paddingTop: 0,
			paddingBottom: 0
		}, TRANSITION_DURATION, TRANSITION_EASING, function() {
			$(this).remove();
		} );
		
		// Insert a new grid and prepend it to the grid
		// container
		grid = $( "<div id='grid' />" ).prependTo( container );
		
	}
	
	/**
	 * 
	 */
	function updateAllGrids() {
		
		// Positioning constants for our grid structure
		var CELL_WIDTH = 360;
		var CELL_MARGIN_X = 15;
		var CELL_MARGIN_Y = 15;
		
		// The maximum number of columns that fit on one row
		var columns = Math.floor( $( 'body' ).width() / ( CELL_WIDTH + CELL_MARGIN_X ) );
		
		$( "#main>div" ).each( function ( gridIndex, gridElement ) {
			
			gridElement = $( gridElement );
			
			gridElement.masonry({
			  itemSelector: 'article',
			  columnWidth: CELL_WIDTH,
			  gutterWidth: CELL_MARGIN_X
			});
			
			var width = columns * ( CELL_WIDTH + CELL_MARGIN_X );
			var height = 0;
			
			$( "article", gridElement ).each( function( articleIndex, articleElement ) {
				articleElement = $( articleElement );
				articleElement.attr( 'data-clearleft', 'true' );
				articleElement.attr( 'data-clearright', 'true' );
				
				if( articleElement.position().left === 0 ) {
					articleElement.attr( 'data-clearleft', 'false' );
				}
				
				if( articleElement.position().left + articleElement.width() > width - CELL_WIDTH ) {
					articleElement.attr( 'data-clearright', 'false' );
				}
				
				height = Math.max( height, articleElement.position().top + articleElement.height() + ( CELL_MARGIN_Y * 2 ) );
			});
			
			if( $( '#comments' ).get(0) ) {
				height = Math.max( height, $( '#comments' ).offset().top + $( '#comments' ).height() );
			}
			
			// Since cells are positioned using absolute values we
			// need to set the explicit height of the container
			gridElement.css( {
				position: "relative",
				height: height,
				width: width + ( CELL_MARGIN_X * ( columns - 2 ) ),
				left: "50%",
				marginLeft: -( width / 2 )
			} );
			
		});
		
		// Animate the height of the container to avoid having the
		// vertical scrollbar look out of sync
		$( container ).stop().animate({
			height: grid.height()
		}, TRANSITION_DURATION, TRANSITION_EASING, function() {
			HE.updateLayout();
		} );

		HE.updateLayout( grid.height() );

		HE.scroll.update();
		
	}
	
	return {
		initialize: initialize,
		selectArticle: selectArticle,
		deselectArticle: deselectArticle,
		navigateToView: navigateToView,
		update: update
	};
	
})( window );

/**
 * Controls the header and main menu of the site.
 * 
 * @author Hakim El Hattab
 */
HE.header = (function( window ) {
	
	var MIN_SCALE = 0.4;
	
	var maxHeaderHeight,
		maxTitlePaddingTop,
		maxTitleFontSize,
		maxNavItemsHeight,
		totalNavItemBorderHeight = null,
		currentHeaderHeight = 0;
	
	// DOM element references
	var header = null; 
	
	/**
	 * 
	 */
	function initialize() {
		
		// Only listen to scrolling and scale the header for desktop
		// browsers
		if ( !HE.handheld ) {
			$(window).bind("scroll", onWindowScroll);
		}
		
		// Fetch a reference to the header element and show it
		header = $("header").show();
		
		maxHeaderHeight = header.height();
		
		maxTitleFontSize = parseFloat($("h1", header).css("font-size"));
		maxTitlePaddingTop = parseFloat($("h1", header).css("padding-top"));
		
		// The maximum height navigation items should ever reach
		maxNavItemsHeight = $("nav ul li a", header).height();
		
		// Determine the combined height of the top and bottom
		// borders for navigation items
		totalNavItemBorderHeight = parseFloat( $("nav ul li", header).css( "border-top-width" ) ) 
									+ parseFloat( $( "nav ul li", header ).css( "border-bottom-width" ) );
		
	}
	
	function showNav() {
		$("nav", header).fadeIn( 150 );
	}
	
	function getMinSizeScrollTop() {
		return maxHeaderHeight * MIN_SCALE;
	}
	
	function onWindowScroll( event ) {
		// Determines the current scroll top progress on a scale 
		// of 0-1, 1 being the bottom.
		// [ scrollTop / ( height of document - height of one page ) ]
		// var scrollFactor = $(window).scrollTop() / ( $(document).height() - $(window).height() );
		
		var scale = Math.max( ( maxHeaderHeight - $(window).scrollTop() ) / maxHeaderHeight, MIN_SCALE );
		
		if (maxHeaderHeight * scale !== currentHeaderHeight) {
			currentHeaderHeight = maxHeaderHeight * scale;
			
			header.height(currentHeaderHeight);
			
			$("h1", header).css("font-size", maxTitleFontSize * scale);
			
			$("nav ul li a", header).height((maxNavItemsHeight * scale) - (totalNavItemBorderHeight * (1 - scale)));
		}
		
	}
	
	// Return our public API
	return {
		initialize: initialize,
		showNav: showNav,
		getMinSizeScrollTop: getMinSizeScrollTop
	};
	
})( window );

/**
 * Controls the comments component which is available
 * for some articles.
 * 
 * @author Hakim El Hattab
 */
HE.comments = (function( window ) {
	
	// Animation settings
	var TRANSITION_DURATION = 900;
	var TRANSITION_EASING = 'easeInOutQuart';
	
	var COMMENTS_SERVICE = '/comments/';
	
	var MIN_WIDTH = 330;
	
	// DOM element references
	var module = null,
		commentHeader = null,
		commentList = null,
		nameInput = null,
		siteInput = null,
		bodyInput = null,
		submitInput = null; 
	
	var defaultWidth = -1;
	
	// The article for which comments are currently shown
	var article = null;
	
	// The number of ongoing AJAX requests
	var requests = 0;
	
	function initialize() {
		
		// Create the main container for the comments module
		module = $( "<div>", {
			id: "comments"
		} );
		
		module.append( "<h3>Leave a Comment</h3>" );
		
		var html = '';
		
		html +=	'<form id="comment-form">';
		html +=	'	<input type="text" id="comment-name" placeholder="Name" maxlength="30" />';
		html +=	'	<input type="text" id="comment-site" placeholder="Web site (optional)" maxlength="90" />';
		html +=	'	<textarea id="comment-body" cols="43" rows="15" placeholder="What\'s up?" maxlength="20000" />';
		html +=	'	<input type="submit" id="comment-submit" value="Submit" />';
		html +=	'</form>';
		html += '<ul id="comment-list"></ul>';
		module.append( html );
		
		$( window ).resize( onWindowResize );
		
		commentHeader = $( "h3", module );
		commentList = $( "#comment-list", module );
		nameInput = $( "#comment-name", module );
		siteInput = $( "#comment-site", module );
		bodyInput = $( "#comment-body", module );
		submitInput = $( "#comment-submit", module );
		
		$( "form", module ).unbind( 'submit' ).bind( 'submit', onSubmit );
		
	}
	
	function onWindowResize() {
		updateLayout();
	}
	
	function onSubmit( event ) {
		
		try {
			resetErrors();
			
			var success = true;
			
			if (nameInput.val().length < 2) {
				nameInput.addClass('error');
				success = false;
			}
			
			if (bodyInput.val().length < 4) {
				bodyInput.addClass('error');
				success = false;
			}
			
			if (siteInput.val().length !== 0) {
			
				if (!HE.util.isURL(siteInput.val())) {
				
					siteInput.addClass('error');
					success = false;
					
				}
				
			}
			
			if (success) {
			
				saveComment(nameInput.val(), siteInput.val(), HE.util.linkify(bodyInput.val()));
				
			}
		}
		finally {
			return false;
		}
		
	}
	
	function resetErrors() {
		nameInput.removeClass( 'error' );
		bodyInput.removeClass( 'error' );
		siteInput.removeClass( 'error' );
	}
	
	function resetInputs() {
		nameInput.val( '' );
		bodyInput.val( '' );
		siteInput.val( '' );
	}
	
	function loadComments() {
		
		// Only load if there is no request in the pipeline
		if( requests === 0 ) {
			
			requests ++;
			
			commentList.addClass( 'loading' );
			
			$.post( COMMENTS_SERVICE, {
					method: 'load',
					article: article.attr( "id" )
					
				} )
				
				.success( function( data ) {
					commentList.removeClass( 'loading' );
					
					var newComments = $( data );
					
					commentList.append( newComments );

					// HE.articles.linkify( '#comment-list li a' );
					
					HE.navigation.update();
					HE.updateLayout();
					
					newComments.hide().fadeIn( 1000 );
					
					requests --;
				} )
			
				.error( function() {
					commentList.removeClass( 'loading' );
					
					commentList.append( '<p class="status">An error occured while loading comments.</p>' );
					
					requests --;
				}
			);
		
		}
		
	}
	
	function saveComment( name, site, body ) {
		
		// Only save if there is no request in the pipeline
		if( requests === 0 ) {
			
			requests ++;
			
			$.post( COMMENTS_SERVICE, {
					method: 'save',
					article: escape( article.attr( "id" ) ),
					name: escape( name ),
					site: escape( site ),
					body: escape( body )
				} )
				
				.success( function( data ) {
					
					// Increase the comment count
					var counter = $( '.actions .comment', article );
					counter.text( parseInt( counter.text() ) + 1 );
					
					var newComment = $( data );
					
					commentList.prepend( newComment );
					
					HE.navigation.update();
					HE.updateLayout();
					
					animateHeightExpand( newComment, 600, TRANSITION_EASING );
					
					resetErrors();
					resetInputs();
					
					requests --;
					
				} )
			
				.error( function() {
					
					alert( 'An error occured while saving your comment.' );
					
					requests --;
					
				}
			);
			
		}
		
		
	}
	
	function animateHeightExpand( element, duration, easing ) {
		
		// Store all the default vertical sizing values of the element
		var target = {
			height: element.height(),
			marginTop: parseFloat(element.css("margin-top")),
			marginBottom: parseFloat(element.css("margin-bottom")),
			paddingTop: parseFloat(element.css("padding-top")),
			paddingBottom: parseFloat(element.css("padding-bottom"))
		};
		
		// Set all vertical sizing values to 0
		element.css({
			height: 0,
			opacity: 0,
			marginTop: 0,
			marginBottom: 0,
			paddingTop: 0,
			paddingBottom: 0
		});
		
		element.animate({
			height: target.height,
			marginTop: target.marginTop,
			marginBottom: target.marginBottom,
			paddingTop: target.paddingTop,
			paddingBottom: target.paddingBottom,
			opacity: 1
		}, duration, easing );
		
	}
	
	function updateLayout() {
		
		if( defaultWidth === -1 ) {
			defaultWidth = Math.max( module.width(), MIN_WIDTH );
		}
		
		module.width( defaultWidth );
		module.removeClass( 'double' );
		
		if (article) {
		
			var left = -parseInt(article.css('border-top-width'));
			var top = article.outerHeight() + parseInt(article.css('margin-bottom'));
			var width = defaultWidth;
			
			// Spacing values surrounding this article
			var spacing = {
				top: parseInt(article.css('margin-top')) + parseInt(article.css('border-top-width')),
				left: parseInt(article.css('margin-left')) * 2 + (parseInt(article.css('border-left-width')) * 4),
				right: parseInt(article.css('margin-right')) * 2 + (parseInt(article.css('border-right-width')) * 2)
			};
			
			if (article.attr('data-clearright') === 'true') {
				// Position comments on right side
				left = article.outerWidth() + spacing.right;
				top = -parseInt(article.css('border-top-width'));
			}
			else 
				if (article.attr('data-clearleft') === 'true') {
					// Position comments on left side
					left = -module.outerWidth() - spacing.left;
					top = -parseInt(article.css('border-top-width'));
				}
				else {
					// Position comments below
					module.width(article.width());
					
					if (article.hasClass('double')) {
						module.addClass('double');
					}
				}
			
			module.css({
				height: 'auto',
				left: left,
				top: top,
				margin: 0
			});
			
		}
		
	}
	
	function show( articleElement ) {
		
		article = articleElement;
		
		module.appendTo( article );
		
		updateLayout();
		
		commentHeader.children( 'span' ).text( 'on "' + article.children('h2').text() + '"' );
		commentList.empty();
		
		resetErrors();
		resetInputs();
		
		loadComments( article );
		
		HE.updateLayout();

		$( "form", module ).unbind( 'submit' ).bind( 'submit', onSubmit );
		
	}
	
	function hide() {
		
		HE.navigation.update();
		HE.updateLayout();
		
		module.remove();
		
	}
	
	// Return our public API
	return {
		initialize: initialize,
		show: show,
		hide: hide
	};
	
})( window );

/**
 * @author Hakim El Hattab
 */
HE.articles = (function(){

	var supports3DTransforms =  document.body.style['webkitPerspective'] !== undefined || 
								document.body.style['MozPerspective'] !== undefined || 
								document.body.style['OPerspective'] !== undefined ||
								document.body.style['perspective'] !== undefined

	function initialize() {
		if( !HE.handheld ) {
			var selector = [
				'#grid article>p a',
				'#grid article>dl a',
				'#grid article>ul a',
				'#grid article>div.two-columns a'
			].join( ', ' );

			linkify( selector );
		}
	}

	function linkify( selector ) {
		if( !HE.handheld && supports3DTransforms ) {
			
			var nodes = document.querySelectorAll( selector );

			for( var i = 0, len = nodes.length; i < len; i++ ) {
				var node = nodes[i];

				// Only manipulate the node once
				if( !node.className || !node.className.match( /roll/g ) ) {
					node.className += ' roll';
					node.innerHTML = '<span data-title="'+ node.text +'">' + node.innerHTML + '</span>';
				}
			};
		}
	}

	return {
		initialize: initialize,
		linkify: linkify
	}

})()/**
 * @author Hakim El Hattab
 */
HE.social = (function(window){

	// Flags if the Twitter Anywhere library has been loaded
	var twitterAnywhereLoaded = false;
	
	// Flags if the Twitter widgets library has been loaded
	var twitterWidgetsLoaded = false;
	
	function loadTwitterAnywhere( success, error ) {
		$.ajax({
			url: 'http://platform.twitter.com/anywhere.js?id=ze8pzwG2YHW0RRWMwWWw&v=1',
			type: 'GET',
			dataType: 'script'
		})
		.success( function() {
			twitterAnywhereLoaded = true;
			if( success ) success.apply( null );
		} )
		.error( function() {
			twitterAnywhereLoaded = false;
			if( error ) error.apply( null );
		} );
	}
	
	function injectTwitterFollowButton( containerID, followName, success ) {
		// If the TA library is loaded, proceed to inject button
		if( twitterAnywhereLoaded ) {
			
			twttr.anywhere(function(T){
				T( '#' + containerID ).followButton( followName );
				
				if( success ) success.apply( null );
			});
			
		}
		// If the TA library is not already loaded, load it now
		else {
			loadTwitterAnywhere( function() {
				
				// Ensure that the load flag has changed and call this
				// method again
				if (twitterAnywhereLoaded) {
					injectTwitterFollowButton( containerID, followName, success );
				}
				
			} );
		}
	}
	
	function loadTwitterWidgets( success, error ) {
		$.ajax({
			url: 'http://platform.twitter.com/widgets.js',
			type: 'GET',
			dataType: 'script'
		})
		.success( function() {
			twitterWidgetsLoaded = true;
			if( success ) success.apply( null );
		} )
		.error( function() {
			twitterWidgetsLoaded = false;
			if( error ) error.apply( null );
		} );
	}
	
	function loadFacebookLike() {
		$( '.sharing .facebook-button' ).html( '<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fhakim.se%2Fexperiments&amp;layout=box_count&amp;show_faces=false&amp;width=52&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;height=65" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:52px; height:65px;" allowTransparency="true"></iframe>' );
	}

	function loadGooglePlusOne() {
		try { gapi.plusone.render( "experiments-plus-one", { size: "tall", href: "http://hakim.se/experiments" } ) } catch( e ) {};
	}
	
	return {
		injectTwitterFollowButton: injectTwitterFollowButton,
		loadTwitterWidgets: loadTwitterWidgets,
		loadFacebookLike: loadFacebookLike,
		loadGooglePlusOne: loadGooglePlusOne
	};
	
}());
	/**
 * @author Hakim El Hattab
 */
HE.tracking = (function(window){

	var firstPageView = true;
	
	var originalDocumentWrite = null;
	
	function initialize() {
		
	}
	
	function trackPageView() {
		
		if ( !firstPageView ) {
			_gaq.push(['_trackPageview']);
		}
		
		firstPageView = false;
	}
	
	return {
		initialize: initialize,
		trackPageView: trackPageView,
	};
	
}());
/**
 * Controls the site's scrolling logic.
 * 
 * @author Hakim El Hattab
 */
HE.scroll = (function( window ) {
	
	function initialize() {
		update();

		$( window ).bind( 'resize', update );
		$( document.body ).bind( 'scroll', update );
	}

	function update() {
		
		$( 'img[data-image-src]' ).each( function( element ) {
			
		} );

	}
	
	// Return our public API
	return {
		initialize: initialize,
		update: update
	};
	
})( window );
