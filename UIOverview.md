# UI Overview  
This user interface is designed to provide an overview of the tools in use. It displays a visual representation of the camera and tool data, and also includes a message container.  
## Interface's elements  
### Tools UI
These panels represent medical tools. Each one has the same format and contains:

1. **Minimize button:** allows you to hide or minimize the panel.
2. **Maximize button:** allows you to show or expand the panel.
3. **Tool angle:** represents the degree of opening of the surgical tool.
4. **Tool depth:** indicates the depth of the instrument inside the body.
5. **Identifier number:** shows the tool number, if the tool has an error, an X will be displayed instead of the number (5a).
6. **Border color:** indicates the status of the tool, if it is linked to an error (6b) or warning (6a) message, its color will be different.

There are panels on the left and right sides of the image, for a total of 4 active tools.  
  
![Tools](https://github.com/user-attachments/assets/f5d9f758-5d41-48d3-af0c-fa9827287ea5)

### Camera UI
This panel represent a camera which contains:

1. Minimize button: allows you to hide or minimize the panel.
2. Maximize button: allows you to show or expand the panel.
3. Identifier icon: shows the camera icon, if the camera has an error, an X will be displayed instead of the icon (3a).
4. Border color: indicates the status of the tool, if it is linked to an error or warning message, its color will be different.

It is located at the bottom center of the interface.  

![CameraControl](https://github.com/user-attachments/assets/dcec10a2-9bd9-4eae-8d1b-b618c77a621c)  

### Message Container UI
This panel represents a message container:

1. Message color: each message is represented with a color depending on its type, which can be error (1a), warning (1b), information (1c).
2. Message icon: at the beginning of each message there is an icon according to the message type (error (2a), warning (2b), information (2c)).
3. Message tooltip: if the message overflows the container, it will not be shown in full (it will display three dots); when hovering over it, the complete content will be shown.

It is located at the bottom left of the interface. 

![Container (1)](https://github.com/user-attachments/assets/fae600fc-b77b-407e-85ca-494e5b308323)
