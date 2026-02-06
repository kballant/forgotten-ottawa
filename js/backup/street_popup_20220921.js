/* function getPopupContent() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			//document.getElementById("demo").innerHTML = xhttp.responseText;
			out_content = xhttp.responseText;
			//alert(out_content);
			return out_content;
		}
	};
	xhttp.open("GET", "../files/street_popup_html.txt", false);
	xhttp.send();
	out_content = xhttp.responseText;
	//alert(out_content);
	return out_content;
} */

/* function get_kml() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			//document.getElementById("demo").innerHTML = xhttp.responseText;
			out_content = xhttp.responseText;
			//alert(out_content);
			return out_content;
		}
	};
	xhttp.open("GET", "../files/Ottawa_Bygone_Buildings.geojson", false);
	xhttp.send();
	out_content = xhttp.responseText;
	//alert(out_content);
	return out_content;
} */

var template_fn = "../files/street_popup_html.txt";

function createPopup(id_num) {
	//var xmlDoc = new DOMParser().parseFromString(get_kml(),'text/xml');
	
	// jsonDoc = get_kml();
	
	// json_data = JSON.parse(jsonDoc);
	
	//alert(json_data);
	
	// features = json_data.features;
	
	//alert(features)

	var build_id = "";
	
	for (i=0; i<features.length; i++) {
		var feat = features[i];
		var props = feat.properties;
		
		var building_info = new Object();
		
		//alert(props['id']);
		
		building_info['id'] = props['id'];
		building_info['buildingName'] = props['buildingName'];
		building_info['dateBuilt'] = props['dateBuilt'];
		building_info['dateDemolished'] = props['dateDemolished'];
		building_info['architect'] = props['architects']['name'];
		building_info['status'] = props['status'];
		building_info['history'] = props['history'];
		building_info['occupant'] = props['occupant'];
		building_info['address'] = props['address'];
		building_info['architects'] = props['architects'];
		
		building_info['sources'] = props['sources'];
		
		building_info['photos'] = props['photos'];
		
		if (id_num == building_info["id"]) { break; }
	}
	
	showPopup(building_info);
	
	/* var kml = xmlDoc.getElementsByTagName("Placemark");
	
	var build_id = "";
	
	for (i=0; i<kml.length; i++) { 
			//extended_data = kml.item(i).getElementsByTagName("ExtendedData");
			data_list = kml.item(i).getElementsByTagName("Data");
			//build_id = data.getElementsByName("id")[0];
			//build_name = kml.item(i).getElementsByTagName("name")[0].firstChild.nodeValue;
			
			var building_info = new Object();
			
			for (j=0; j<data_list.length; j++) {
				field_name = data_list[j].attributes['name'].nodeValue
				value = data_list[j].getElementsByTagName("value")[0].textContent
				building_info[field_name] = value
			}
			
			if (id_num == building_info["id"]) { break; }
			
			//if (build_id == id_num) {
			//	alert(build_name)
			//}
	} */
	
	//alert(building_info['name']);
	
}

/* function checkInput(in_text) {
	if (in_text) {
		return in_text;
	} else {
		return "n/a";
	}
} */

var img_height = 0;
var img_width = 0;

function imgClick() {
	$("#cf2 img.top").toggleClass("transparent");
}

/* var real_width = 0;
var real_height = 0;
var prev_src = "";

function addMouseMoveMag(obj) {
	
	obj.mousemove(function(e){
		if (obj.parent().hasClass("active")) {
			
			//Find the child button
			//var button_child = $(this).children(".btn");
			
			//if (button_child.hasClass("active")) {
			
			var large_child = obj.children(".large");
			var small_child = obj.children(".small");
			
			if (prev_src != small_child.attr("src")) {
				real_width = 0;
				real_height = 0;
				prev_src = small_child.attr("src");
				//large_child.css('margin', small_child.css('margin'));
				margins = small_child.css('margin').split(" ");
			}
		
			//When the user hovers on the image, the script will first calculate
			//the native dimensions if they don't exist. Only after the native dimensions
			//are available, the script will show the zoomed version.
			if (!real_width && !real_height) {
				//This will create a new image object with the same image as that in .small
				//We cannot directly get the dimensions from .small because of the 
				//width specified to 200px in the html. To get the actual dimensions we have
				//created this image object.
				var image_object = new Image();
				image_object.src = small_child.attr("src");
				
				//This code is wrapped in the .load function which is important.
				//width and height of the object would return 0 if accessed before 
				//the image gets loaded.
				real_width = image_object.width;
				real_height = image_object.height;
			} else {
				//x/y coordinates of the mouse
				//This is the position of .magnify with respect to the document.
				//NOTE: $(this) = div.magnify
				var magnify_offset = obj.offset();
				//var magnify_offset = $(this).position()
				
				//We will deduct the positions of .magnify from the mouse positions with
				//respect to the document to get the mouse positions with respect to the 
				//container(.magnify)
				var mouse_x = e.pageX - magnify_offset.left;
				var mouse_y = e.pageY - magnify_offset.top;
				
				//Finally the code to fade out the glass if the mouse is outside the 
				//	container
				if (mouse_x < obj.width() && mouse_y < obj.height() && 
					mouse_x > 0 && mouse_y > 0) {
					large_child.fadeIn(100);
				} else {
					large_child.fadeOut(100);
				}
				
				if (large_child.is(":visible"))
				{
					//The background position of .large will be changed according to the position
					//of the mouse over the .small image. So we will get the ratio of the pixel
					//under the mouse pointer with respect to the image and use that to position 
					//the large image inside the magnifying glass
					var lrg_img_x = Math.round(mouse_x / small_child.width() * real_width - 
						large_child.width() / 2) * -1;
					var lrg_img_y = Math.round(mouse_y / small_child.height() * real_height - 
						large_child.height() / 2) * -1;
					//Margin adjustment
					ratio = real_width / small_child.width();
					if (margins[1] == undefined) {
						obj_width = obj.width();
						small_width = small_child.width();
						x_margin = ((obj_width - small_width) / 2) * ratio;
					} else {
						x_margin = parseInt(margins[1].replace("px", "")) * ratio;
					}
					var bgp = (lrg_img_x + x_margin) + "px " + lrg_img_y + "px";
					
					//Time to move the magnifying glass with the mouse
					var mag_x = mouse_x - large_child.width() / 2;
					var mag_y = mouse_y - large_child.height() / 2;
					//Now the glass moves with the mouse
					//The logic is to deduct half of the glass's width and height from the 
					//mouse coordinates to place it with its center at the mouse coordinates
					
					//If you hover on the image now, you should see the magnifying glass in action
					large_child.css({left: mag_x, top: mag_y, backgroundPosition: bgp});
				}
			}
		}
	})
} */

/* function toggleMagnify(btn) {
	var mg_obj = $(btn).closest(".magbutton").siblings(".mag-div");
	if ($(btn).hasClass("active")) {
		mg_obj.removeClass("magnify");
		mg_obj.unbind('mousemove');
	} else {
		mg_obj.addClass("magnify");
		addMouseMoveMag(mg_obj);
	}
} */

/* $(document).on("wb-ready.wb-lbx", function(event) {
	/* var real_width = 0;
	var real_height = 0;
	var prev_src = ""; 
	
	//$(".large").css("background","url('" + $(".small").attr("src") + "') no-repeat");
	$(".large").each(function() {
		small_sib = $(this).siblings(".small");
		$(this).css("background","url('" + small_sib.attr("src") + "') no-repeat");
		var image_object = new Image();
		image_object.src = small_sib.attr("src");
		sm_width = small_sib.width();
		sm_height = small_sib.height();
		lg_width = image_object.width;
		lg_height = image_object.height;
		
		if (sm_width == lg_width && sm_height == lg_height) {
			$(this).parent().removeClass("magnify");
		}
	});
	
	//Now the mousemove function
	/* $(".magnify").mousemove(function(e){
		if ($(this).parent().hasClass("active")) {
			
			//Find the child button
			//var button_child = $(this).children(".btn");
			
			//if (button_child.hasClass("active")) {
			
			var large_child = $(this).children(".large");
			var small_child = $(this).children(".small");
			
			if (prev_src != small_child.attr("src")) {
				real_width = 0;
				real_height = 0;
				prev_src = small_child.attr("src");
				//large_child.css('margin', small_child.css('margin'));
				margins = small_child.css('margin').split(" ");
			}
		
			//When the user hovers on the image, the script will first calculate
			//the native dimensions if they don't exist. Only after the native dimensions
			//are available, the script will show the zoomed version.
			if (!real_width && !real_height) {
				//This will create a new image object with the same image as that in .small
				//We cannot directly get the dimensions from .small because of the 
				//width specified to 200px in the html. To get the actual dimensions we have
				//created this image object.
				var image_object = new Image();
				image_object.src = small_child.attr("src");
				
				//This code is wrapped in the .load function which is important.
				//width and height of the object would return 0 if accessed before 
				//the image gets loaded.
				real_width = image_object.width;
				real_height = image_object.height;
			} else {
				//x/y coordinates of the mouse
				//This is the position of .magnify with respect to the document.
				//NOTE: $(this) = div.magnify
				var magnify_offset = $(this).offset();
				//var magnify_offset = $(this).position()
				
				//We will deduct the positions of .magnify from the mouse positions with
				//respect to the document to get the mouse positions with respect to the 
				//container(.magnify)
				var mouse_x = e.pageX - magnify_offset.left;
				var mouse_y = e.pageY - magnify_offset.top;
				
				//Finally the code to fade out the glass if the mouse is outside the 
				//	container
				if (mouse_x < $(this).width() && mouse_y < $(this).height() && 
					mouse_x > 0 && mouse_y > 0) {
					large_child.fadeIn(100);
				} else {
					large_child.fadeOut(100);
				}
				
				if (large_child.is(":visible"))
				{
					//The background position of .large will be changed according to the position
					//of the mouse over the .small image. So we will get the ratio of the pixel
					//under the mouse pointer with respect to the image and use that to position 
					//the large image inside the magnifying glass
					var lrg_img_x = Math.round(mouse_x / small_child.width() * real_width - 
						large_child.width() / 2) * -1;
					var lrg_img_y = Math.round(mouse_y / small_child.height() * real_height - 
						large_child.height() / 2) * -1;
					//Margin adjustment
					ratio = real_width / small_child.width();
					x_margin = parseInt(margins[1].replace("px", "")) * ratio;
					var bgp = (lrg_img_x + x_margin) + "px " + lrg_img_y + "px";
					
					//Time to move the magnifying glass with the mouse
					var mag_x = mouse_x - large_child.width() / 2;
					var mag_y = mouse_y - large_child.height() / 2;
					//Now the glass moves with the mouse
					//The logic is to deduct half of the glass's width and height from the 
					//mouse coordinates to place it with its center at the mouse coordinates
					
					//If you hover on the image now, you should see the magnifying glass in action
					large_child.css({left: mag_x, top: mag_y, backgroundPosition: bgp});
				}
			}
		}
	})
}); */

function create_photo_html(photos) {
	
	var photo_html = '';
	
	for (var i = 0; i < photos.length; i++) {
		caption = photos[i]['caption'];
		//link = photos[i]['link'];
		img_url = photos[i]['url'];
		source_url = photos[i]['sourceUrl'];
		date_taken = photos[i]['date'];
		
		/* photo_html += ['', '<div class="row">', 
						'<div class="col-md-12" style="display: flex; justify-content: center;">', 
						'<img src="' + img_url + '">', 
						'</div>', 
						'</div>'
					].join('\n'); */
		photo_html += ['', '<div class="street-photo">', 
						'<figure>', 
						'<img style="width: 100%" href="' + source_url + '" src="' + img_url + '">', 
						'<figcaption class="street-figcaption">' + caption + '</figcaption>', 
						'</figure>', 
						'</div>'
					].join('\n');
	}
					
	return photo_html;
}

function showPopup(props, featId) {
	//info.tooltip('hide');

	$(".modal-title").html(props['street_name']).text();
	
	origin = props['origin'];
	photos = props['photos'];
	source = props['source'];
	
	popup_html = getPopupContent(template_fn);
	popup_html = popup_html.replace('${id}', checkInput(props['id']));
	popup_html = popup_html.replace('${origin}', checkInput(props['origin']));
	// popup_html = popup_html.replace('${photo}', checkInput(props['photo']));
	// popup_html = popup_html.replace('${source}', checkInput(props['source']));
	
	photo_html = create_photo_html(photos);
	popup_html = popup_html.replace('${photo}', photo_html);
	
	// Create links for sources:
	sources = checkInput(props['sources']);
	if (sources.length > 0) {
		//sources = sources.replace(/<a/g, '<a target="_blank" class="popup-a"');
		source_html = '';
		for (var i = 0; i < sources.length; i++) {
			src_name = sources[i]['name'];
			src_url = sources[i]['url'];
			source_html += [src_name + ':',
							'<a class="on-white" href="' + src_url + '" target="_blank">', 
								src_url, 
							'</a>', 
							'<br>'
						  ].join('\n');
		}
		popup_html = popup_html.replace('${sources}', source_html);
	} else {
		popup_html = popup_html.replace('${sources}', 'n/a');
	}
	
	/* photo_html = props['photos'];
	parser = new DOMParser();
	htmlDoc = parser.parseFromString(photo_html, "text/html");
	
	// Correct htmlDoc if null
	if (htmlDoc == null) {
		htmlDoc = document.createElement('div');
		htmlDoc.innerHTML = photo_html;
	}
	
	table_elements = htmlDoc.getElementsByClassName('container');
	
	// Grab each photo info:
	var photos = [];
	for (var i = 0; i < table_elements.length; i++) {
		
		var photo = {};
		child_elements = table_elements[i].children;
		
		// Get the caption
		caption = child_elements[0].innerText;
		photo['caption'] = caption;
		
		// Get the source URL of photo
		img_element = child_elements[1].getElementsByTagName('img');
		var img_src = [];
		if (img_element.length > 1) {
			img_src.push(img_element[1].src);
			img_src.push(img_element[0].src);
		} else {
			img_src.push(img_element[0].src);
		}
		photo['img_src'] = img_src;
		
		// Parse source info
		source_str = child_elements[2].innerText;
		sources = source_str.trim().split(/\r?\n/).filter(Boolean);
		var filter_srcs = sources.filter(function(v){return v.replace(/\s/g,'')!==''});
		date_taken = filter_srcs[0];
		if (filter_srcs.length == 3) {
			source = filter_srcs[2];
		} else {
			source = "";
		}
		photo['date_taken'] = date_taken;
		photo['source'] = source;
		
		// Get the link info from source
		a_element = child_elements[2].getElementsByTagName('a');
		if (a_element.length == 0) {
			photo['link'] = "";
		} else {
			link = a_element[0].href;
			photo['link'] = link;
		}
		photos.push(photo);
	} */
	
	/* photo_info = props['photos'];
	
	//alert(photo_info);
	
	new_ph_html = create_photo_html(photo_info);
	//alert(new_ph_html);
	
	popup_html = popup_html.replace('${photos}', new_ph_html); */
	if (featId > -1 && featId != null) {
		popup_html += "\n<!--Feature_ID=" + featId.toString() + "-->"
	}
	
	triggerPopup(popup_html);
	
	/* $(".modal-body").html(popup_html);
	
	$(document).trigger("open.wb-lbx", [
		[
			{
				src: "#inline_content",
				type: "inline"
			}
		]
	]); */
	
	// Added from website to have proper working thumbnails
	/* (function(window, $, undefined) {

		var conf = {
			center: true,
			backgroundControl: false
		};

		var cache = {
			$carouselContainer: $('.thumbnails-carousel').parent(),
			$thumbnailsLi: $('.thumbnails-carousel li'),
			$controls: $('.thumbnails-carousel').parent().find('.carousel-control')
		};

		function init() {
			cache.$carouselContainer.find('ol.carousel-indicators').addClass('indicators-fix');
			cache.$thumbnailsLi.first().addClass('active-thumbnail');

			if(!conf.backgroundControl) {
				cache.$carouselContainer.find('.carousel-control').addClass('controls-background-reset');
			}
			else {
				cache.$controls.height(cache.$carouselContainer.find('.carousel-inner').height());
			}

			if(conf.center) {
				cache.$thumbnailsLi.wrapAll("<div class='center clearfix'></div>");
			}
		}

		function refreshOpacities(domEl) {
			cache.$thumbnailsLi.removeClass('active-thumbnail');
			cache.$thumbnailsLi.eq($(domEl).index()).addClass('active-thumbnail');
		}	

		function bindUiActions() {
			cache.$carouselContainer.on('slide.bs.carousel', function(e) {
				refreshOpacities(e.relatedTarget);
			});

			cache.$thumbnailsLi.click(function(){
				cache.$carouselContainer.carousel($(this).index());
			});
		}

		$.fn.thumbnailsCarousel = function(options) {
			conf = $.extend(conf, options);

			init();
			bindUiActions();

			return this;
		}

	})(window, jQuery); */

	$('.thumbnails-carousel').thumbnailsCarousel();
}