//uncomment if preview image is fixed. This function converts uploaded image to base64. Courtesy: Alyssa
/*function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}*/

function convertStringToArrayBufferView(str) {
  var bytes = new Uint8Array(str.length);
  for (var iii = 0; iii < str.length; iii++) 
  {
      bytes[iii] = str.charCodeAt(iii);
  }

  return bytes;
}

function convertArrayBufferToHexaDecimal(buffer) {
    var data_view = new DataView(buffer);
    var iii, len, hex = '', c;

    for(iii = 0, len = data_view.byteLength; iii < len; iii += 1) 
    {
        c = data_view.getUint8(iii).toString(16);
        if(c.length < 2) 
        {
            c = '0' + c;
        }
    
        hex += c;
    }

    return hex;
}

function hashIt() {
  var nBytes = 0,
      oFiles = document.getElementById("uploadInput").files,
      nFiles = oFiles.length;
      
  //This for loop is in case we support multiple file uploads    
  for (var nFileId = 0; nFileId < nFiles; nFileId++) {
	  var reader = new FileReader();
	  
	  reader.onload = function(e) {
      var text = reader.result;
        
      //TODO: if image is uploaded then show preview. Right now its not working :(
      //document.getElementById("previewImg").src ='data:image/png;base64,'+(arrayBufferToBase64(reader.result)); 
	 
      var promise = crypto.subtle.digest({name: "SHA-256"},   convertStringToArrayBufferView(text));   
    
      promise.then(function(result){
        var hashValue = convertArrayBufferToHexaDecimal(result);
        document.getElementById("output").textContent = hashValue;
      });
		  	  
    };

    reader.readAsText(oFiles[nFileId]);
	  
    nBytes += oFiles[nFileId].size;
  }
  
  var sOutput = nBytes + " bytes";
  
  // optional code for multiples approximation
  for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
    sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
  }
  // end of optional code
  
  //document.getElementById("fileNum").innerHTML = nFiles;
  document.getElementById("fileSize").innerHTML = sOutput;
}
