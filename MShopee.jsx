app.preferences.rulerUnits = Units.PIXELS; // hệ đo pixel
var theFiles = File.openDialog("please select files", "*.jpg;*.png", true); // dialog chọn các file cần chạy tool
var folderSaveJPG = Folder("~/Desktop/file phoneCase"); // nếu chưa có thư mục lưu file thì tạo mới
if (!folderSaveJPG.exists) {
      folderSaveJPG.create();
}
jpgOption = new JPEGSaveOptions(); // lưu ảnh mức 10
jpgOption.quality = 10;



if (theFiles) {
      app.documents.add(1200, 2400, 300, "aaaa"); // tạo file aaaa
      for (var m = 0; m < theFiles.length; m++) {
            var theNewNameSelect = theFiles[m].name.match(/(.*)\.[^\.]+$/)[1]; // tên file
            app.open(File(theFiles[m]), OpenDocumentType.JPEG, true); // mở file đó lên
            var width = app.activeDocument.width;
            var height = app.activeDocument.height;
            if (height / width >= 2) { // nếu ảnh dài thì cố định chiều rộng, chiều rộng =1200 và chiều dài chắc chắn lớn hơn 2400
                  height = height * 1200 / width;
                  width = 1200;
                  app.activeDocument.resizeImage(1200, height * 1200 / width);
            }
            else { // nếu ảnh rộng thì cố định chiều dài
                  width = width * 2400 / height;
                  height = 2400;
                  app.activeDocument.resizeImage(width * 2400 / height, 2400);
            }
            app.activeDocument.activeLayer.duplicate(app.documents["aaaa"]); // duplicate sang document aaaa
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); // đóng document chứa ảnh lại
            app.activeDocument.activeLayer.translate((1200 - width) / 2, (2400 - height) / 2); // di chuyển ảnh vào vị trí có thể nằm giữa
            if (theFiles[m].name.split(".")[1] === "jpg" || theFiles[m].name.split(".")[1] === "jpeg") {  // lưu đè sang file ảnh hiện tại, do saveOptions của jpg và png khác nhau nên phải làm 2 lần
                  app.activeDocument.saveAs(Folder(theFiles[m]), JPEGSaveOptions, true, Extension.LOWERCASE);
            }
            else if (theFiles[m].name.split(".")[1] === "png") {
                  app.activeDocument.saveAs(Folder(theFiles[m]), PNGSaveOptions, true, Extension.LOWERCASE); // saveOptions của png
            }

            app.activeDocument.activeLayer.remove(); // xóa layer hiện tại, nhiều quá document sẽ bị nặng





            var customerChildren = Folder("~/Desktop/mockup phoneCase").getFiles("*.tif"); // lấy mác file mockup, mặc định là file tif
            Folder("~/Desktop/file phoneCase/" + theNewNameSelect).create(); // tạo thư mực lưu file cuối cùng, trùng tên với file ảnh ban đầu
            for (var i = 0; i < customerChildren.length; i++) {
                  app.open(File(customerChildren[i]));
                  app.activeDocument.activeLayer = app.activeDocument.artLayers['aaaa']; // activeLayer là layer aaaa
                  var theNewNameDesign = customerChildren[i].name.match(/(.*)\.[^\.]+$/)[1]; // tên file mockup
                  var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents"); // dòng 51-57: chỉ để relink sang file ảnh đã resize ở trên
                  var desc3 = new ActionDescriptor();
                  var idnull = charIDToTypeID("null");
                  desc3.putPath(idnull, new File(theFiles[m]));
                  var idPgNm = charIDToTypeID("PgNm");
                  desc3.putInteger(idPgNm, 1);
                  executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
                  app.activeDocument.saveAs(Folder("~/Desktop/file phoneCase/" + theNewNameSelect + "/" + theNewNameSelect + "-" + theNewNameDesign + ".jpg"), jpgOption, true, Extension.LOWERCASE); // lưu file mockup đã relink
                  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);// đóng file mockup lại, chuyển sang làm file mockup tiếp thep
            }
            app.open(File(theFiles[m])); // 61-63: lưu file design vào cùng thư mục luôn
            app.activeDocument.saveAs(Folder("~/Desktop/file phoneCase/" + theNewNameSelect + "/" + theNewNameSelect + ".jpg"), jpgOption, true, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
      }
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); // đóng file aaaa

}




