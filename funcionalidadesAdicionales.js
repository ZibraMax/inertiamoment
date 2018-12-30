	var x = "";
	var fileInput = document.getElementById("csv"),
	readFile = function () {
	var reader = new FileReader();
	reader.onload = function () {
	var g = reader.result.split("\n");
	for (var i = 0; i < g.length - 1; i++) {
		datosArchivo = g[i];

		document.getElementById("figruaSselect").selectedIndex = parseInt(datosArchivo.split("$$$")[2]);
		document.getElementById("colores").value = datosArchivo.split("$$$")[1];
		document.getElementById("coord").value = datosArchivo.split("$$$")[0];

		document.getElementById("btn").click();
	}
	};
	reader.readAsBinaryString(fileInput.files[0]);
	};
	document.getElementById("csv").addEventListener('change', readFile);

	function download(text, name, type) {
		var a = document.getElementById("a");
		var file = new Blob([text], {type: type});
		a.href = URL.createObjectURL(file);
		a.download = name;
	}
	document.onkeydown = function(e){
  if (e.keyCode == 27) {
    var mods = document.querySelectorAll('.modal > [type=checkbox]');
    [].forEach.call(mods, function(mod){ mod.checked = false; });
  }
}