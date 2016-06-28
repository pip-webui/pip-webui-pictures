# Pip.WebUI Pictures Controls

Pictures Control UI components is a sub-module of Pip.Services platform and can be used in applications
based on the platform.

This module provides next functionality:

* Picture view control
* Picture edit control
* Avatar control
* Picture list edit control
* Collage control
* Picture dialog
* Add image directive

In the version 1.0.0 the implementation was cleaned up and covered with unit tests.
Implementation became fully portable across browser and devices.


### The complete library

 * [https://github.com/pip-webui/pip-webui](https://github.com/pip-webui/pip-webui)

## Demos

[Examples Online](http://webui.pipdevs.com/pip-webui-pictures/index.html)


## Quick links

* [Module dependencies](#dependencies)
* [Components](#components)
  - [Picture view control](#picture_view)
  - [Picture edit control](#picture_edit)
  - [Avatar control](#avatar)
  - [Picture list edit control](#picture_list_edit)
  - [Collage control](#collage)
  - [Picture dialog](#picture_dialog)
  - [Add image directive](#add_image_directive)
* [Browsers compatibility](#compatibility)
* [Community](#community)
* [Contributing](#contributing)
* [Build](#build)
* [License](#license)


## <a name="dependencies"></a>Module dependencies

* <a href="https://github.com/pip-webui/pip-webui-tasks">pip-webui-tasks</a> - Helpful tasks for development
* <a href="https://github.com/pip-webui/pip-webui-lib">pip-webui-lib</a> - Vendor libraries
* <a href="https://github.com/pip-webui/pip-webui-css">pip-webui-css</a> - CSS Framework
* <a href="https://github.com/pip-webui/pip-webui-core">pip-webui-core</a> - Core platform module
* <a href="https://github.com/pip-webui/pip-webui-rest">pip-webui-rest</a> - REST API module
* <a href="https://github.com/pip-webui/pip-webui-controls">pip-webui-controls</a> - Assets of control components
* <a href="https://github.com/pip-webui/pip-webui-layouts">pip-webui-layouts</a> - Document layouts
* <a href="https://github.com/pip-webui/pip-webui-test">pip-webui-test</a> - Provides mocked data needed for unit testing

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


## <a name="compatibility"></a>Compatibility

PIP.WEBUI has been thoroughly tested against all major browsers and supports:

 * IE11+,
 * Edge
 * Chrome 47+,
 * Firefox 43
 * Opera 35

## <a name="community"></a>Community

* Follow [@pip.webui on Twitter](http://link.com)
* Subscribe to the [PIP.WebUI Newsletter](http://link.com)
* Have a question that's not a feature request or bug report? Discuss on the [PIP Forum](https://groups.google.com/forum/#!forum/pipdevs)
* Have a feature request or find a bug? [Submit an issue](http://link.com)
* Join our Community Slack Group! [PIP Worldwide](http://link.com)


## <a name="contributing"></a>Contributing

Developers interested in contributing should read the following guidelines:

* [Issue Guidelines](http://somelink.com)
* [Contributing Guidelines](http://somelink.com)
* [Coding guidelines](http://somelink.com)

> Please do **not** ask general questions in an issue. Issues are only to report bugs, request
  enhancements, or request new features. For general questions and discussions, use the
  [Pip Devs Forum](https://groups.google.com/forum/#!forum/pipdevs).

It is important to note that for each release, the [ChangeLog](CHANGELOG.md) is a resource that will
itemize all:

- Bug Fixes
- New Features
- Breaking Changes

## <a name="build"></a>Build

Projects environment deploy is occurred using npm and gulp.

First install or update your local project's **npm** tools:

```bash
# First install all the NPM tools:
npm install

# Or update
npm update
```

Then run the **gulp** tasks:

```bash
# To clean '/build' and '/dist' directories
gulp clean

# To build distribution files in the `/dist` directory
gulp build

# To launch samples (build will open samples/index page in web browser)
gulp launch
```

For more details on how the build process works and additional commands (available for testing and
debugging) developers should read the [Build Instructions](docs/guides/BUILD.md).


## <a name="license"></a>License

PIP.WebUI is under [MIT licensed](LICENSE).

