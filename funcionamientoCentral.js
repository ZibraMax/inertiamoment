
	document.getElementById("coord").addEventListener("keyup", function(event) {event.preventDefault();if (event.keyCode === 13) {document.getElementById("btn").click();}});
		var color = document.getElementById("colores").value;
		var cuadro = document.getElementById("canvas");
		var papel = cuadro.getContext("2d");
		papel.font = "10px Arial";
		var areTotal = 0;
		var inerciaTotal = 0;
		var centroideXTotal = 0;
		var centroideYTotal = 0;
		var coordenadaMaxima = 0;
		var figuras = [];
		function enter(event) {
			if (event.keyCode == 13) {
				agregarPunto();
				} else {
			}
		}
		function agregarPunto() {
			var puntos = [];
			var figura = [];
			puntos = document.getElementById("coord").value.split(";");
			if (puntos.length >= 4 && puntos[0] == puntos[puntos.length-1]) {
				papel.clearRect(0, 0, 600, 600);
				for (var i = 0; i < puntos.length; i++) {
					if (coordenadaMaxima < parseFloat(puntos[i].split(",")[0])) {
						coordenadaMaxima = parseFloat(puntos[i].split(",")[0]);
					}
					if (coordenadaMaxima < parseFloat(puntos[i].split(",")[1])) {
						coordenadaMaxima = parseFloat(puntos[i].split(",")[1]);
					}
				}
				var multi = parseInt(document.getElementById("figruaSselect").value);
				figura.push(multi*Math.abs(calcularArea(puntos)));
				figura.push(calcularCentroide(puntos));
				figura.push(puntos);
				figura.push(multi*inerciaCentroidal(puntos));
				if (multi == -1) {figura.push("red");} else {figura.push(document.getElementById("colores").value);					}
				figuras.push(figura);
				centroideXTotal = 0;
				centroideYTotal = 0;
				inerciaTotal = 0;
				for (var i = 0; i < figuras.length; i++) {
					areTotal += (parseFloat(figuras[i][0]));
					centroideXTotal += parseFloat(figuras[i][1].split(",")[0])*parseFloat(figuras[i][0]);
					centroideYTotal += parseFloat(figuras[i][1].split(",")[1])*parseFloat(figuras[i][0]);
					pintar(figuras[i][2], figuras[i][4]);
					drawc("blue", parseFloat(figuras[i][1].split(",")[0]), parseFloat(figuras[i][1].split(",")[1]), parseFloat(figuras[i][1].split(",")[0]) + 1, parseFloat(figuras[i][1].split(",")[1])+1, papel);
				}
				centroideXTotal = centroideXTotal/areTotal; 
				centroideYTotal = centroideYTotal/areTotal;
				for (var i = 0; i < figuras.length; i++) {
					var inerciacero = parseFloat(figuras[i][3]);
					var distanciacuadrado = Math.pow(Math.abs(parseFloat(figuras[i][1].split(",")[1]) - centroideYTotal),2);
					var areaparcial = figuras[i][0];
					inerciaTotal += inerciacero + areaparcial*distanciacuadrado;
				}
				drawc("red", centroideXTotal, centroideYTotal, centroideXTotal + 1, centroideYTotal+1, papel);
				document.getElementById("txt1").innerHTML = "Centroide en x: " + centroideXTotal;
				document.getElementById("txt2").innerHTML = "Centroide en y: " + centroideYTotal;
				document.getElementById("txt3").innerHTML = "Area: " + areTotal;
				document.getElementById("txt4").innerHTML = "Inercia: " + inerciaTotal;
				drawEjes(papel);
				dibujarSeparaciones();
				centroideXTotal = 0;
				centroideYTotal = 0;
				inerciaTotal = 0;
				areTotal = 0;
			} else {
				var mods = document.querySelectorAll('.modal > [type=checkbox]');
    			[].forEach.call(mods, function(mod){ mod.checked = true; });
			}
		}
		function borrar() {
			areTotal = 0;
			inerciaTotal = 0;
			centroideXTotal = 0;
			centroideYTotal = 0;
			coordenadaMaxima = 0;
			figuras = [];
			papel.clearRect(0, 0, 600, 600);
			document.getElementById("txt1").innerHTML = "Centroide en x: " + centroideXTotal;
			document.getElementById("txt2").innerHTML = "Centroide en y: " + centroideYTotal;
			document.getElementById("txt3").innerHTML = "Area: " + areTotal;
			document.getElementById("txt4").innerHTML = "Inercia: " + inerciaTotal;
		}
		//-------------------------------------------------------------------------------------------------
		function inerciaCentroidal(puntos) {
			var inercia = 0;
			for (var i = 0; i < puntos.length - 1; i++) {
				var x = parseFloat(puntos[i].split(",")[0]) - centroideXTotal;
				var x1 = parseFloat(puntos[i+1].split(",")[0]) - centroideXTotal;
				var y = parseFloat(puntos[i].split(",")[1]) - centroideYTotal;
				var y1 = parseFloat(puntos[i+1].split(",")[1]) - centroideYTotal;
				inercia += (y*y +y*y1 + y1*y1)*(x*y1-x1*y);
			}
			return Math.abs(inercia/12);
		}
		function drawEjes(lienzo) {
	        lienzo.beginPath();
		    lienzo.strokeStyle = "blue";
		    lienzo.lineWidth = "3";
		    lienzo.moveTo( 50, 0);
		    lienzo.lineTo( 50, 600);
		    lienzo.moveTo( 45, 7);
		    lienzo.lineTo( 50, 3);
		    lienzo.moveTo( 50, 3);
		    lienzo.lineTo( 55, 7);
		    lienzo.moveTo( 593, 545);
		    lienzo.lineTo( 597, 550);
		    lienzo.moveTo( 597, 550);
		    lienzo.lineTo( 593, 555);
		    lienzo.moveTo( 0, 550);
		    lienzo.lineTo( 600, 550);
		    lienzo.stroke();
		    lienzo.closePath();
		    lienzo.fillText("Eje Y",5,10);
		    lienzo.fillText("Eje X",560,540);
		}
		function pintar(puntos, colorlinea) {
			for (var i = 0; i < puntos.length - 1; i++) {
				var x = puntos[i].split(",")[0];
				var y = puntos[i].split(",")[1];
				var x1 = puntos[i + 1].split(",")[0];
				var y1 = puntos[i + 1].split(",")[1];
				var colorcito = document.getElementById("colores").value;
				draw(colorcito, x, y, x1, y1, papel, colorlinea);
			}
		}
		function calcularArea(puntos) {
				var area = 0;
				for (var i = 0; i < puntos.length - 1; i++) {
					area = area + parseFloat(puntos[i].split(",")[0]) * parseFloat(puntos[i + 1].split(",")[1]);
					area = area - parseFloat(puntos[i].split(",")[1]) * parseFloat(puntos[i + 1].split(",")[0]);
				}
				return (area/2);
		}
		function calcularCentroide(puntos) {
			for (var i = 0; i < puntos.length -1; i++) {
				centroideXTotal += (parseFloat(puntos[i].split(",")[0]) + parseFloat(puntos[i + 1].split(",")[0]))*(parseFloat(puntos[i].split(",")[0])*parseFloat(puntos[i + 1].split(",")[1]) - parseFloat(puntos[i+1].split(",")[0])*parseFloat(puntos[i].split(",")[1]));
				centroideYTotal += (parseFloat(puntos[i].split(",")[1]) + parseFloat(puntos[i + 1].split(",")[1]))*(parseFloat(puntos[i].split(",")[0])*parseFloat(puntos[i + 1].split(",")[1]) - parseFloat(puntos[i+1].split(",")[0])*parseFloat(puntos[i].split(",")[1]));
			}
			centroideXTotal = centroideXTotal/(6*parseFloat(calcularArea(puntos)));
			centroideYTotal = centroideYTotal/(6*parseFloat(calcularArea(puntos)));
			return "" + centroideXTotal + "," + centroideYTotal; 
		}

		function draw(color, xi, yi, xf, yf, lienzo, colorobligatorio) {
			var mult = 500/coordenadaMaxima;
	        lienzo.beginPath();
	        lienzo.strokeStyle = colorobligatorio;
		    lienzo.lineWidth = "2";
		    lienzo.moveTo(xi*mult + 50 , 550 - yi*mult);
		    lienzo.lineTo(xf*mult + 50 , 550 - yf*mult);
		    lienzo.stroke();
		    lienzo.closePath();
		}
		function dibujarSeparaciones() {
			var a = 500/coordenadaMaxima
			var lienzo = papel;
			for (var i = 0; i < 500/a + 1; i++) {
				if (i%(coordenadaMaxima/10) == 0) {
					lienzo.fillText("" + i , 30, 553 - i*a);
					lienzo.beginPath();
	  				lienzo.strokeStyle = "black";
	 				lienzo.lineWidth = "2";
					lienzo.moveTo(50, 550 - i*a);
	    			lienzo.lineTo(55, 550 - i*a);
	    			lienzo.stroke();
	    			lienzo.closePath();
					lienzo.save();
					lienzo.translate(( 550 - i*a), 565);
					lienzo.rotate(Math.PI/2);
					lienzo.translate(-( 550 - i*a), -565);
					lienzo.fillText("" + coordenadaMaxima - i ,( 540 - i*a), 568);
					lienzo.restore();
					lienzo.beginPath();
	  				lienzo.strokeStyle = "black";
	 				lienzo.lineWidth = "2";
					lienzo.moveTo(( 550 - i*a), 550);
	    			lienzo.lineTo(( 550 - i*a), 545);
	    			lienzo.stroke();
	    			lienzo.closePath();
				}
			}
		}
		function drawc(color, xi, yi, xf, yf, lienzo) {
			var mult = 500/coordenadaMaxima;
			lienzo.beginPath();
			lienzo.strokeStyle = color;
			lienzo.lineWidth = "10";
			lienzo.moveTo(xi*mult + 50 , 550 - yi*mult);
			lienzo.lineTo(xi*mult + 51 , 549 - yi*mult);
	        lienzo.moveTo(xi*mult + 51 , 550 - yi*mult);
			lienzo.lineTo(xi*mult + 50 , 549 - yi*mult);
			lienzo.fillText("("+ xi.toFixed(2) +", "+ yi.toFixed(2) +")", xi*mult + 50 + 5, 553 - yi*mult);
			lienzo.stroke();
			lienzo.closePath();
		}
		function drawCircle(x, y, radius,a,b) {
			papel.beginPath();
			papel.arc(x,y,radius,a,b,true);
			papel.lineWidth = "2";
			papel.strokeStyle = color;
			papel.stroke();
			papel.closePath();
		}
		function descargarFigura() {
			var a = "";

			for (var i = 0; i < figuras.length; i++) {
				a += figuras[i][2].join(";") + "$$$";
				a += figuras[i][4] + "$$$";

				var b = 0;
				if (figuras[i][0]+Math.abs(figuras[i][0]) == 0) {
					b = 1;
				}
				a += b;
				a +="\n";
			}

			download(a,"Figura: "+ new Date().toLocaleString() +".txt", "text/txt");
		}