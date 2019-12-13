app.preferences.rulerUnits = Units.PIXELS; // hệ đo pixel
var theFiles = File.openDialog("please select files", "*.psd;*.tif;*.jpg;*.png", true);
var folderSaveJPG = Folder("~/Desktop/file select");
if (!folderSaveJPG.exists) {
      folderSaveJPG.create();
}
jpgOption = new JPEGSaveOptions();
jpgOption.quality = 11;


app.documents.add(1200, 2400, 300, "aaaa");

if (theFiles) {
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
            app.activeDocument.saveAs(Folder("~/Desktop/file select/" + theNewNameSelect + ".jpg"), jpgOption, true, Extension.LOWERCASE);
            app.activeDocument.activeLayer.remove();
      }

}