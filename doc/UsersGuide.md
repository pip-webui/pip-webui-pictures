# Pip.WebUI.Pictures User's Guide

## <a name="contents"></a> Contents
- [Installing](#install)
- [pip-picture directive](#picture)
- [pip-picture-edit directive](#picture_edit)
- [pip-avatar directive](#avatar)
- [pip-avatar-edit directive](#avatar_edit)
- [pip-picture-list-edit directive](#picture_list_edit)
- [pip-collage directive](#collage)
- [pip-add-image directive](#add_image)
- [pipCameraDialog](#camera_dialog)
- [pipPictureUrlDialog](#picture_url_dialog)
- [pipGallerySearchDialog](#gallery_search_dialog)
- [Questions and bugs](#issues)


## <a name="install"></a> Installing

Add dependency to **pip-webui** into your **bower.json** or **package.json** file depending what you use.
```javascript
"dependencies": {
  ...
  "pip-webui": "*"
  ...
}
```

Alternatively you can install **pip-webui** manually using **bower**:
```bash
bower install pip-webui
```

or install it using **npm**:
```bash
npm install pip-webui
```

Include **pip-webui** files into your web application.
```html
<link rel="stylesheet" href=".../pip-webui-lib.min.css"/>
...
<script src=".../pip-webui-lib.min.js"></script>
<script src=".../pip-webui-test.min.js"></script>
```

Register **pipPictures** module in angular module dependencies.
```javascript
angular.module('myApp',[..., 'pipPictures']);
```


## <a name="picture"></a> pip-picture directive

**Picture view** is the simplest control that loads from the server and visualizes a single image. 

Todo: Replace the screenshot
<img src="images/img-picture-simple.png"/>


## <a name="picture_edit"></a> pip-picture-edit directive

**Picture edit** control allows to set a single image and upload it to server.

<img src="images/img-picture-edit-control.png"/>


## <a name="avatar"></a> pip-avatar directive

**Avatar view** control is identical to **Picture view**, the only difference is in URL on the server to upload image.

<img src="images/img-avatar-control.png"/>


## <a name="avatar_edit"></a> pip-avatar-edit directive


## <a name="picture_list_edit"></a> pip-picture-list-edit directive

**Picture list** control allows to upload a collection of images at once. 

<img src="images/img-picture-list-edit.png"/>


## <a name="collage"></a> pip-collage directive

**Collage** control visualizes a collection of images as random collage 

Todo: Show collages with different number of images
<img src="images/img-picture-collage.png"/>


## <a name="add_picture"></a> pip-add-picture directive

**Add picture** dialog let user add image from different sources: from file, camera, web link or image library.

Todo: Add screenshots for every picture dialog except file
<img src="images/img-picture-dialog.png"/>

<img src="images/img-add-image-directive.png"/>


## <a name="issues"></a> Questions and bugs

If you have any questions regarding the module, you can ask them using our 
[discussion forum](https://groups.google.com/forum/#!forum/pip-webui).

Bugs related to this module can be reported using [github issues](https://github.com/pip-webui/pip-webui-pictures/issues).
