# <img src="https://github.com/pip-webui/pip-webui/blob/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Picture controls

![](https://img.shields.io/badge/license-MIT-blue.svg)

## <a name="components"></a>Module components

### <a name="picture_view"></a>Picture view control
<a href="doc/images/img-picture-simple.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-picture-simple.png"/>
</a>

The directive provides simple image block. It allows three attribute types:
* **pip-src** - full url address
* **pip-picture-id** - unique ID due to image naming agreement
* **pip-default-icon** - Some default icon

[Online Example](http://webui.pipdevs.com/pip-webui-entry/index.html#/signin)

```html
    <pip-picture pip-src="img/welcome.png"/>
    </pip-picture>
```

<br/>

### <a name="picture_edit"></a>Picture edit control
<a href="doc/images/img-picture-edit-control.png" style="border: 3px ridge #c8d2df; margin: auto; display: inline-block">
    <img src="doc/images/img-picture-edit-control.png"/>
</a>

This control provides editable picture component. There can be changed image via URL, local image, images gallery and camera snapshot.
This directive accepts more attributes for manage image change or update etc.


[Online Example](http://webui.pipdevs.com/pip-webui-pictures/index.html#/picture)

<br/>


### <a name="avatar"></a>Avatar control
<a href="doc/images/img-avatar-control.png" style="border: 3px ridge #c8d2df; margin: auto; display: inline-block">
    <img src="doc/images/img-avatar-control.png"/>
</a>

Avatar control is a directive provides circle or square block with different content. Inside this one can be any image, icon or a char
(means the first letter of the first name). This field can be disabled via corresponded attribute.

[Online Example](http://webui.pipdevs.com/pip-webui-pictures/index.html#/avatar)

<br/>

### <a name="picture_list_edit"></a>Picture list edit control
<a href="doc/images/img-picture-list-edit.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-picture-list-edit.png"/>
</a>

This control provides assets of picture edit controls. Each picture can be dropped or uploads new one.

[Online Example](http://webui.pipdevs.com/pip-webui-pictures/index.html#/pictures)


<br/>

### <a name="collage"></a>Collage control
<a href="doc/images/img-picture-collage.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-picture-collage.png"/>
</a>

This control provides arranged images collage. In dependence on images amount they are arranged is predefined way.
The images amount can be arbitrary.


[Online Example](http://webui.pipdevs.com/pip-webui-pictures/index.html#/collage)

<br/>

### <a name="picture_dialog"></a>Picture dialog
<a href="doc/images/img-picture-dialog.png" style="border: 3px ridge #c8d2df; margin: auto; display: inline-block">
    <img src="doc/images/img-picture-dialog.png"/>
</a>

This dialog list is available in the each editable picture control. It allows to change/add image view several ways. It
provides keyboard arrows navigation.

[Online Example](http://webui.pipdevs.com/pip-webui-pictures/index.html#/picture)

<br/>

### <a name="add_image_directive"></a>Add image directive
<a href="doc/images/img-add-image-directive.png" style="border: 3px ridge #c8d2df; margin: auto; display: inline-block">
    <img src="doc/images/img-add-image-directive.png"/>
</a>

It is a visual UI component which implemented picture dialog. Via this control can be added more than one images.

[Online Example](http://webui.pipdevs.com/pip-webui-pictures/index.html#/picture)


## Learn more about the module

- [User's guide](doc/UsersGuide.md)
- [Online samples](http://webui.pipdevs.com/pip-webui-pictures/index.html)
- [API reference](http://webui-api.pipdevs.com/pip-webui-pictures/index.html)
- [Developer's guide](doc/DevelopersGuide.md)
- [Changelog](CHANGELOG.md)
- [Pip.WebUI project website](http://www.pipwebui.org)
- [Pip.WebUI project wiki](https://github.com/pip-webui/pip-webui/wiki)
- [Pip.WebUI discussion forum](https://groups.google.com/forum/#!forum/pip-webui)
- [Pip.WebUI team blog](https://pip-webui.blogspot.com/)

## <a name="dependencies"></a>Module dependencies

* [pip-webui-lib](https://github.com/pip-webui/pip-webui-lib): angular, angular material and other 3rd party libraries
* [pip-webui-css](https://github.com/pip-webui/pip-webui-css): CSS styles and web components
* [pip-webui-core](https://github.com/pip-webui/pip-webui-core): localization and other core services
* [pip-webui-rest](https://github.com/pip-webui/pip-webui-rest): REST resources for files
* [pip-webui-pictures](https://github.com/pip-webui/pip-webui-pictures): user avatar control

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
