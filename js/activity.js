var zoom = 0;
var rot = 0;
var imagearray = new Array();
var imagex = new Array();
var imagey = new Array();
var index =0;
var name;
var content;
var image,canvas,choose,toolbar,ctx;
$(document).ready(function() {

		image = document.getElementById('main-image');
		canvas = document.getElementById('imageCanvas');
		choose = document.getElementById('init-image');
		toolbar = document.getElementsByClassName('toolbar');
		ctx = canvas.getContext('2d');
		canvas.setAttribute('width', window.innerWidth);
		canvas.setAttribute('height', window.innerHeight - 55);
		$('#large-screen').hide();
		$('#imageCanvas').hide();
		
		$("#exit-fullscreen").hide();
		$("#zoom-in").click(function() {
			console.log("Zoom-In");
			zoom +=5;
			image.height = image.height + image.height*0.05;
			image.width = image.width + image.width*0.05;
					ctx.drawImage(image,image.width, image.height);
			});

		$("#zoom-out").click(function() {
			console.log("Zoom-Out");
			zoom -=5;
			image.height = image.height - image.height*0.05;
			image.width = image.width - image.width*0.05;
					ctx.drawImage(image,image.width, image.height);
			});

		$("#zoom-best").unbind('click').click(function() {
			console.log("Fit to Wiindow");
			console.log(image.height);
			console.log(image.width);
			var h,w;
			h = window.innerHeight - 55;
			w= window.innerWidth;
			console.log(h);
			console.log(w);
			if ((h/image.height) < (w/image.width)){
				image.height =h;
				image.width = image.width * h/image.height;
					ctx.drawImage(image,image.width, image.height);
			}
			else{
				image.width = w;
				image.height = image.height * w/image.width;
					ctx.drawImage(image,image.width, image.height);
			}
			});

		$("#zoom-original").unbind('click').click(function() {
				console.log(index);
				console.log("Zoom-Original");

				image.width = imagey[index];
				image.height = imagex[index];
					ctx.drawImage(image,image.width, image.height);
				});

		$("#next-image").unbind('click').click(function() {
		if (index < imagearray.length -1){
				console.log("Next image");
				console.log(index);
				index +=1;
				image.src = imagearray[index];
				console.log(image)
			ctx.drawImage(image,-image.width/2,-image.width/2);
				}
				});

		$("#previous-image").unbind('click').click(function() {
				if (index  > 0 ){
				console.log("Previous image");
				console.log(index);
				index -=1;
				console.log(index);
				image.src = imagearray[index];
				console.log(image)
				ctx.drawImage(image,-image.width/2,-image.width/2);
				}
				});

		$("#rotate-anticlockwise").unbind('click').click(function() {

				console.log("Rotating Anticlockwise");
				rot -= 90
				rotateImage(rot);
				});

		$("#rotate-clockwise").unbind('click').click(function() {
				console.log("Rotating Clockwise");
				rot += 90
				rotateImage(rot);
				});

		function rotateImage(degree) {

			//			    ctx.clearRect(0,0,canvas.width,canvas.height);
			//			    ctx.save();
			//		            ctx.translate(canvas.width/2,canvas.height/2);
			//		            ctx.rotate(degree*Math.PI/180);
			ctx.drawImage(image,-image.width/2,-image.width/2);
			//			    ctx.restore();
		}
		$("#fullscreen").unbind("click").click(function() {
				console.log("Switching to fullscreen");
				$('#large-screen').show();
				$(".toolbar").fadeIn('slow');
				$("#canvas").css('top', '0px');
				$("#exit-fullscreen").show();
				$('#large-screen').fadeOut( 2000, "linear" );
				$('#exit-fullscreen').fadeOut( 2000, "linear" );
				});

		$("#exit-fullscreen").click(function() {
				console.log("Exiting fullscreen");
				$(".toolbar").show()
				$("#canvas").css('top', '55px');
				$("#exit-fullscreen").hide();
				$('#large-screen').hide();
				});


		$("#init-image button").unbind('click').bind('click' ,function(e) {
				$('#search_image').trigger("click");
				});

		$("#add-image").bind('click', function(e) {
				$('#search_image').unbind('click').trigger("click");
				$('#open-button').unbind('click').trigger("click");
				});

		$('#open-button').bind('click' ,function(e) {
				e.preventDefault();
				var fileInput = document.getElementById('search_image');
				var imageType = /image.*/;

				fileInput.addEventListener('change', function(e) {
					e.preventDefault();
					var file = fileInput.files[0];
					console.log(file);
					var reader = new FileReader();
					reader.onload = function(e) {
					var imageSrc = reader.result;
					imagearray.push(imageSrc);
					index = imagearray.length -1;
					console.log(index);
					console.log(imagearray[0]);
					if (imagearray.length > 1)
					console.log(imagearray[1]);
					choose.style.display = 'none';
					canvas.style.zIndex = 1;
					image.onload=function(){
					ctx.drawImage(image,canvas.width/2-image.width/2,canvas.height/2-image.width/2);
					imagex.push(image.height);
					imagey.push(image.width);
					}
					image.src = imageSrc;
					//		rotateImage(0);
					}
					reader.readAsDataURL(file);
				});
		});



		$("#plugin").unbind('click').bind('click' ,function(e) {
				$('#search_plugin').unbind('click').trigger("click");
			
				console.log("in here");
				e.preventDefault();
				var fileInput = document.getElementById('search_plugin');
				console.log(fileInput);

				fileInput.addEventListener('change', function(e) {
					console.log("in here");
					e.preventDefault();
					var file = fileInput.files[0];
					console.log(file["name"]);
					var filename = "plugins/" + file["name"];
					console.log(filename);
					$.getJSON(filename, function(json) {
						content = json;
    					//console.log(content["VALUES"]["svg"]); 
    					name = content["VALUES"]["name"]; 
    					names = "#" + name; 
    					button_icon = content["VALUES"]["svg"];
    					console.log(name);
    					console.log(button_icon); 

    					var button = document.createElement("button");  
    					var att = button.setAttribute("class","toolbarbutton");       // Create a "class" attribute
					//	att.value = "toolbutton";
    				//	button.setAttributeNode(att);

    					var id = button.setAttribute("id","plugin_work");       // Create a "class" attribute				

						var title = button.setAttribute("title",name);       // Create a "class" attribute
						var image = button.setAttribute("background-image", button_icon);
					//	var background-image = button.setAttribute("background",button_icon);

						document.getElementById("main-toolbar").appendChild(button);

				});

				});
		});

		$(document).unbind('click').on('click', '#plugin_work', function() {
    console.log("done");
    console.log(content["VALUES"]);
    var contrast = content["VALUES"]["contrast"];
    var noise = content["VALUES"]["noise"]
    var sepia = content["VALUES"]["sepia"];
    var gamma = content["VALUES"]["gamma"];
    var brightness = content["VALUES"]["brightness"];
    path = imagearray[0]


  //  setInterval(function(){ 
    //code goes here that will be run every 5 seconds.    
//}, 1000);

  setTimeout(function(){ 
				Caman("#imageCanvas2", path, function () {
						  // manipulate image here
					  document.getElementById("change").innerHTML = "Changing Contrast";
				   			console.log("1");
	    			this.contrast(5);
	    			this.render();
				});
			},1500);

setTimeout(function(){
	Caman("#imageCanvas2", path, function () {
						  // manipulate image here
					  console.log("2");
				   			document.getElementById("change").innerHTML = "Changing Noise";
	    			this.noise(10);
	    			this.render();
	    			});
				}, 3000);

setTimeout(function(){
	Caman("#imageCanvas2", path, function () {
						  // manipulate image here
					  console.log("3");
				   			document.getElementById("change").innerHTML = "Changing Sepia";
	    			this.sepia(100);
	    			this.render();
	    			});
				}, 4500);

setTimeout(function(){
	Caman("#imageCanvas2", path, function () {
						  // manipulate image here
					  console.log("4");
				   			document.getElementById("change").innerHTML = "Changing Gamma";
	    			this.gamma(0.87);
	    			this.render();
	    			});
				}, 6000);
setTimeout(function(){
document.getElementById("change").innerHTML = "Vintage Effect CREATED";
},8000);


});

	//	$("#plugin_work").unbind('click').bind('click' ,function(e) {
//			console.log("done");
//		});


		$("#caman").unbind('click').bind('click' ,function(e) {
				$.getJSON("plugins/vintage.json", function(json) {
    				console.log(json); // this will show the info it in firebug console
				});
				console.log('Vikram ahuja');
				console.log(imagearray[0])
				path = imagearray[0]
				Caman("#imageCanvas2", path, function () {
						  // manipulate image here
					  this.contrast(5);
					  this.noise(3);
					  this.sepia(100);
					  this.gamma(0.87);
						//  this.brightness(5);
    				this.render();
				});
		});

		


		$('#openss-button').click(function() {
				var fileInput = document.getElementById('search_image');
				var imageType = /image.*/;
				i +=1;
				fileInput.addEventListener('change', function(e) {
					var file = fileInput.files[0];
					console.log(file)
					imagearray.push(e.target.files[0])
					image.src = imagearray[i];
					//$("#main-image").attr('src',URL.createObjectURL(e.target.files[0]));
					$('#init-image').hide();
					rotateImage(0);
					});

});

	});



window.addEventListener("keydown", function (event) {
		if (event.defaultPrevented) {
		return; // Should do nothing if the key event was already consumed.
		}

		switch (event.key) {
		case "Left":
			if (index > 0){
			console.log(index);
			index -=1;
			console.log(index);
			image.src = imagearray[index];
			ctx.drawImage(image,-image.width/2,-image.width/2);
			}
		break;
		case "Right":
		if (index < imagearray.length -1){
			console.log(index);
			index +=1;
			console.log(index);
			image.src = imagearray[index];
			ctx.drawImage(image,-image.width/2,-image.width/2);}
		break;
		case "Esc":
			$(".toolbar").show()
			console.log("Exiting fullscreen");
			$("#canvas").css('top', '55px');
			$("#exit-fullscreen").hide();
			$('#large-screen').hide();
		break;
		default:
		return; // Quit when this doesn't handle the key event.
		}

		event.preventDefault();
}, true);
