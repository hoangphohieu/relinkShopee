var theFiles = File.openDialog("please select files", "*.psd;*.tif;*.jpg;*.png", true)
var folderSaveJPG = Folder("~/Desktop/file phoneCase");
if (!folderSaveJPG.exists) {
      folderSaveJPG.create();
}
jpgOption = new JPEGSaveOptions();
jpgOption.quality = 10;



if (theFiles) {
      app.documents.add(1200, 2400, 300, "aaaa");
      for (var m = 0; m < theFiles.length; m++) {
            var theNewNameSelect = theFiles[m].name.match(/(.*)\.[^\.]+$/)[1];

            app.open(File(theFiles[m]), OpenDocumentType.JPEG, true);
            var width = app.activeDocument.width;
            var height = app.activeDocument.height;
            if (height / width >= 2) {
                  height = height * 1200 / width;
                  width = 1200;
                  app.activeDocument.resizeImage(1200, height * 1200 / width);
            }
            else {
                  width = width * 2400 / height;
                  height = 2400;
                  app.activeDocument.resizeImage(width * 2400 / height, 2400);
            }
            app.activeDocument.activeLayer.duplicate(app.documents["aaaa"]);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            app.activeDocument.activeLayer.translate((1200 - width) / 2, (2400 - height) / 2);
            app.activeDocument.saveAs(Folder(theFiles[m]), jpgOption, true, Extension.LOWERCASE);
            app.activeDocument.activeLayer.remove();





            var customerChildren = Folder("~/Desktop/mockup phoneCase").getFiles("*.tif");
            Folder("~/Desktop/file phoneCase/" + theNewNameSelect).create();
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
                  app.activeDocument.saveAs(Folder("~/Desktop/file phoneCase/" + theNewNameSelect + "/" + theNewNameSelect + "-" + theNewNameDesign + ".jpg"), jpgOption, true, Extension.LOWERCASE);
                  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }
            app.open(File(theFiles[m]));
            app.activeDocument.saveAs(Folder("~/Desktop/file phoneCase/" + theNewNameSelect + "/" + theNewNameSelect + ".jpg"), jpgOption, true, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
      }
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

}




// var linkname=app.activeDocument.activeLayer;

// var fileDialog = app.openDialog();
// var file = new File(fileDialog);



