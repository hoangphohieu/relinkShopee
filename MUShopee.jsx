var theFiles = File.openDialog("please select files", "*.psd;*.tif;*.jpg;*.png", true)
var folderSaveJPG = Folder("~/Desktop/save a4");
if (!folderSaveJPG.exists) {
      folderSaveJPG.create();
}
jpgOption = new JPEGSaveOptions();
jpgOption.quality = 11;



if (theFiles) {
      for (var m = 0; m < theFiles.length; m++) {
            // Replace SmartObject
            // theLayer = replaceContents(theFiles[m], theLayer);
            var theNewNameSelect = theFiles[m].name.match(/(.*)\.[^\.]+$/)[1];
            // alert(theFiles[m].name)

            var customerChildren = Folder("~/Desktop/save customer").getFiles("*.tif");
            for (var i = 0; i < customerChildren.length; i++) {
                  app.open(File(customerChildren[i]));
                  app.activeDocument.activeLayer = app.activeDocument.artLayers['aaaa'];
                  var theNewNameDesign = customerChildren[i].name.match(/(.*)\.[^\.]+$/)[1];
                  var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
                  var desc3 = new ActionDescriptor();
                  var idnull = charIDToTypeID("null");
                  desc3.putPath(idnull, new File(theFiles[m]));
                  var idPgNm = charIDToTypeID("PgNm");
                  desc3.putInteger(idPgNm, 1);
                  executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
                  app.activeDocument.saveAs(Folder("~/Desktop/save a4/" + theNewNameSelect + "-" + theNewNameDesign + ".jpg"), jpgOption, true, Extension.LOWERCASE);
                  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }
            // Save JPG
            // myDocument.saveAs((new File(thePath + "/" + theName + "_" +
            //       theNewName + ".psd")), psdOpts, true);
      }
}




// var linkname=app.activeDocument.activeLayer;

// var fileDialog = app.openDialog();
// var file = new File(fileDialog);



