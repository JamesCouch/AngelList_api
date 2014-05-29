var Search = {

	setup: function(){
		$(document).on('click', '.search_btn', Search.submitSearch);
	}
	,submitSearch: function(){
		var result = $('#q').val()
		$.ajax({type: 'GET',
            url: '/search',
            data: {q: result},
            timeout: 5000,
            success: Search.results,
            error: function(xhrObj, textStatus, exception) { console.log("There is an error"); }
		});
		return(false);
	}
	,results: function(data){
		if(data["success"] == false){
			Search.resultFail();
		}
		else {
			Search.resultSuccess(data);
		}
	}
	,resultFail: function(){
		$('#list_group').hide();
		var html = '<div class="alert alert-notice">The startup could not be found</div>';
		$('.border-form-div').delay(500).append($(html).hide().fadeIn('normal', function(){
			$(this).delay(2000).fadeOut();
		}));
	}
	,resultSuccess: function(data) {
		console.log(data)
		
		var name = data.name;
		var location = data.locations[0].display_name;
		var location_link = data.locations[0].angellist_url;
		var desc1 = (typeof(data.markets[0]) != "undefined") ? data.markets[0].display_name : "";
		var desc1_link = (typeof(data.markets[0]) != "undefined") ? data.markets[0].angellist_url : "";
		var desc2 = (typeof(data.markets[1]) != "undefined") ? data.markets[1].display_name : "";
		var desc2_link = (typeof(data.markets[1]) != "undefined") ? data.markets[1].angellist_url : "";
		var img1_orig = (typeof(data.screenshots[0]) != "undefined") ? data.screenshots[0].original : "";
		var img1_thumb = (typeof(data.screenshots[0]) != "undefined") ? data.screenshots[0].thumb : "";

		var html = "<div id='list_group'>";
			html += '<div class="result_header row">'
		    	html += '<div class="span1"><img class="result_image" src='+data.logo_url+'></img></div>'
		    	html += '<div class="result_name span3">'+name+''
		    		html += '<div class="subtext">'+data.high_concept+'</div>'
		    	html += '</div>'
		    	html += '<div class="span4">'
		    		html += '<div class="well">'
		    			html += '<ul>'
		    			html += '<li>Size: '+data.company_size+' employees</li>'
		    			html += '<li>Followers: '+data.follower_count+'</li>'
		    			html += '<li>AngelList URL: <a href="'+data.angellist_url+'">'+data.angellist_url+'</li>'
		    			html += '</ul>'
		    		html += '</div>'

		    	html += '</div>'
			html += '</div>'
			html += '<div class="result_header_about row text-center">'
				html += '<div class="span1"><a href="'+location_link+'">'+location+'</a></div>'
				html += '<div class="span1"><a href="'+desc1_link+'">'+desc1+'</a></div>'
				html += '<div class="span1"><a href="'+desc2_link+'">'+desc2+'</a></div>'
			html += '</div>'
			html += '<div class="result_body_about">'
				html += '<div class="row">'
					html += '<h3>About '+name
					html += '<hr>'
					html += '<div class="span5">'
						html += '<h4>'+data.product_desc
					html += '</div>'
					html += '<div class="span5">'
						html += '<img src="http://maps.googleapis.com/maps/api/staticmap?center='+location+'&zoom=12&size=300x150&sensor=false"></img>'
					html += '</div>'
				html += '</div>'
			html += '</div>'
			html += '<div class="result_body_images">'
				html += '<div class="row">'
					html += '<div class="span3">'
						html += '<a class="gallery" href='+img1_orig+'><img class="img_tile" src='+img1_thumb+'></img></a>'
					html += '</div>'
				html += '</div>'
			html += '</div>'
		html += "</div>";
		$('.search_results').animate({opacity:0}, 500, function(){
			$('.search_results').html(html);
			$('a.gallery').colorbox({ opacity:1.0 , scalePhotos:true, maxHeight:"1000px", maxWidth:"1000px", rel:"group1" });
			$('.search_results').css("height","auto"); 
		});
		$('.search_results').animate({opacity:1}, 500);
	}
}
$(Search.setup)