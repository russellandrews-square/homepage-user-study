$(document).ready(function(){
	populateWidgets()
	sizeWidgets();

	shuffleWidgets();


	$( ".draggable" ).draggable({ 
		snap: ".draggable, .website-content, .widgets",
		containment: "body"
	});

	$( ".website-content" ).droppable({
		classes: {
	        "ui-droppable-hover": "ui-state-hover"
	      },
		drop: function(event, ui) {

			$(this).addClass( "ui-state-highlight" );

			var containerOffset = $(this).offset();

			var thisWidgetOffset = $(ui.draggable).offset();

			var relX = thisWidgetOffset.left - containerOffset.left;
			var relY = thisWidgetOffset.top - containerOffset.top;


	      	if ($(ui.draggable).parent().hasClass('widgets') == true){
	        	$(ui.draggable).detach().css({top: relY,left: relX, position: 'absolute'}).appendTo($('.website-content'));
	      	}

	      	resizeWebsite();
        }
	});

	$(".widgets").droppable({
		drop: function(event, ui) {
	      	if ($(ui.draggable).parent().hasClass('website-content') == true){
	      		$(ui.draggable).detach().css({top: 0,left: 0, position: 'relative'}).appendTo($('.widgets'));
	        }
        }
	})

	var counter = 1;

	$(".widget").mousedown(function(){
		$(this).css("z-index", counter);
		counter++;
		if ( $(this).parent().hasClass('widgets') == true ){
			$('div.instructions').addClass('active');
		}
	});

	$(".widget").mouseup(function(){
		$('div.instructions').removeClass('active');
	});

	$(window).resize(function(){
		sizeWidgets();
	});

});


function populateWidgets(){
	var i;

	for (var i = 1 ; i <= 23; i++) {
		if ( i < 10 ){
			$('div.widgets').append("<img class='widget draggable' src='assets/tile-0" + i + ".png'>");
		} else if (i < 22) {
			$('div.widgets').append("<img class='widget draggable' src='assets/tile-" + i + ".png'>");
		} else if (i >= 22) {
			$('div.widgets').append("<img class='widget draggable two-column' src='assets/tile-" + i + ".png'>");
		}
	}

}

function resizeWebsite(){
	var i = 1;

	var numWidgets = $('.website-content').children('.widget').length;

	var array = [];

	for (var i = 2 ; i <= numWidgets + 1 ; i++){

		var widgetPosition = $('.website-content .widget:nth-child('+ i + 'n)').position();
		var widgetHeight = $('.website-content .widget:nth-child('+ i + 'n)').height();

		var widgetPositionTop = widgetPosition.top;

		var variable = widgetPosition.top + widgetHeight;

		array.push(variable);
	}

	var largest = 0;

	for (x = 0; x < array.length; x++) {
	    if (array[x] > largest) {
	        largest = array[x];
	    }
	}

	console.log(largest);

	if( largest >= 284 ){
		$('.website-content').height(largest + 320);
	}
}

function shuffleWidgets(){
    var parent = $(".widgets");
    var divs = parent.children('img');
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
}

function sizeWidgets(){
	var websiteWidth = $('div.website-content').width();

	// $('div.website').css('margin-left', websiteWidth/2);

	// $('img.widget').css('width', websiteWidth/2);

	// $('div.widgets').css('width', websiteWidth/2);
}