# box-shadow-generator

This project can be used to draw using the box-shadow property. It is not entirely finished yet!

## Usage

First decide the width and the height of the container (it is in pixels). Then click on the generate container button and start drawing. Color can be changed at any time by entering rgb, hex or word value (like 'red' or 'green'). and then pressing change color. There is also the option the undo the last action if the user is disatisfied. At the end press the 'copy box-shadow' button to copy the box shadow property and place it in the desired element.


## How it works

Box-shadow drawing can be achieved by setting a container - for example 200px by 200px and then having element inside with width and height set to 1px and 1px for example. The child of the container is basically the pixel that appears as a drawing. An example is shown below: 

* Create a container and place the child inside:  

~~~ html
  <div id = 'container' class = 'container-class'>
      <div id = 'draw' class="draw-container"></div>
  </div>
~~~

* Set the properties for the container and the child: 

~~~ css
.container-class{
    position: relative;
    width: 200px;
    height: 200px;
}
.draw-container{
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 1px;
    height: 1px;
}
~~~

* Then after your box-shadow property is ready just copy it in the child element's class and the end result will be the drawing from the application. This can be used to create different logos, effects or just for fun. 

## Note

The project is in quite early stages. There are some performance bugs and very limited options. This is due to change in the near future.

## Author 

Written by Atanas Kolev 
