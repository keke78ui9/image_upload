/*
support client image upload.
support browser: IE10 or above, chrome, firefox
*/
var img_upload = img_upload || {};
img_upload = (function () {
    var _opts = {
        targetDOM: {
            // input file element's id name
            image: "imgUpload",
            // hidden input for saving image data at client
            imageFileData: "imgPlaceHolder",
            // place to display image at client
            imagePreview: "imgPreview"
        },
        maxUpload: 5
    };

    // get image byte data from client html element
    var getImageData = function () {
        var imgPh = document.getElementById(_opts.targetDOM.imageFileData);

        if (imgPh.value) {
            return JSON.parse(imgPh.value);
        }

        return [];
    };

    var displayImageData = function (dataObj) {
        if (!dataObj || !dataObj.length) {
            return;
        }

        var imgPreview = document.getElementById(_opts.targetDOM.imagePreview);
        imgPreview.value = "";
        var i = 0,
            len = dataObj.length;

        for (len = dataObj.length; i < len; ++i) {
            var img = dataObj[i];
            imgPreview.innerHTML += ("<p><span>" + img.Name + "</span><span>" + img.FileType +"</span><td><img width='25%' src=" + img.FileData + "></p>");
        }
    }

    // TODO: need validation
    var validation = function () {

    };

    var _imgSelected = function (e) {

        var imgSelector = e.currentTarget,
            imageList = [],
            imgFiles = imgSelector.files;

        validation(imgFiles);

        for (var i = 0, len = imgFiles.length; i < len; ++i) {
            var imgItem = imgFiles[i];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {

                var imgObj = getImageData();
                if (imgObj.length === _opts.maxUpload) {
                    // TODO: max
                    return;
                }

                var imgByteArray = fileLoadedEvent.target.result;
                imgObj.push(
                 {
                     Name: imgItem.name,
                     Size: imgItem.size,
                     FileType: imgItem.type,
                     FileData: imgByteArray
                 });

                document.getElementById(_opts.targetDOM.imageFileData).value = JSON.stringify(imgObj);
            };

            fileReader.onloadend = function () {
                displayImageData(getImageData());
            };

            fileReader.readAsDataURL(imgFiles[i]);
        }
    };

    var _bindImgEvent = function (imgId) {

        document.getElementById(imgId).onchange = _imgSelected;
    };


    var _init = function () {
        document.getElementById(_opts.targetDOM.image).onchange = _imgSelected;
    };

    _init();

    return {
        bindImgSelect: _bindImgEvent
    };
})();
