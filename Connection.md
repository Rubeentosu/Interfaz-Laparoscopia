# Connection
This interface will operate with a client/server connection using socket.io.
## Server
For the interface to work correctly, the server must send the data for each component in the following way, as shown in the server.js file:
### Tools
For the tools to work correctly, you must pass an array of one to four ToolData objects with the following attributes:
1. **depth:** this attribute must be a float type, it represents the tool's depth in centimeters.
2. **angle:** this attribute must be a float type, it represents the opening angle of the tool.
3. **position:** this attribute must be an int type, it represents the position where the tool will be placed.

#### Errors
Some of the errors when entering data in the attributes can be:
1. **depth:** this attribute must not receive a negative number, a number greater than 15 or something other than a float.
2. **angle:** this attribute must not receive a negative number, a number greater than 90 or something other than a float.
3. **position:** this attribute must not receive a number smaller than 1, a number greater than 4 or something other than a int.

![image](https://github.com/user-attachments/assets/56069f7a-2b0d-4a80-80fb-8f6e68539af7)  
<sub>Figure 1. Sending the tool information.</sub>

In the Figure 1, we see an example of how the server should send the tool data. In it, both depth and angle use functions that have been used solely to simulate the operation of a real server. These functions are incremental functions, which start at 0 and reset when reaching the maximum value allowed by each attribute.

### Camera
For the camera to work correctly, you must pass a type float number, it represents the camera's depth in centimeters.
#### Errors
1. **cameraDepth:** this attribute must not receive a negative number, a number greater than 15 or something other than a float.

![image](https://github.com/user-attachments/assets/6251f94e-cae2-40a7-b9d8-fa42abd0276b)  
<sub>Figure 2. Sending the camera information.</sub> 

In the figure 2, we see an example of how the server should send the camera data. In it detph use a function that have been used solely to simulate the operation of a real server. This function is incremental function, which start at 0 and reset when reaching the maximum value allowed by the attribute.

### Message Container
For the messages to work correctly, you must pass an array of one to five ConsoleMessageData objects with the following attributes:
1. **text:**  this attribute must be a string type, it represents the message's content.
2. **type:** this attribute must be a string type, it represents the message's type.
3. **toolPosition:** this attribute must be a int type, this number refers to the position of the affected tool.

#### Errors
Some of the errors when entering data in the attributes can be:
1. **text:** this attribute must receive a string between 0 and 400 characters, if it has more than 400 characters it may overflow.
2. **type:** this attribute must receive one of the following strings: "error", "warning", or "info".
3. **toolPosition:** this attribute must not receive a number smaller than 0 (0 corresponds to the camera position), a number greater than 4 or something other than a int.

![image](https://github.com/user-attachments/assets/aca20603-53bb-4d9e-95b6-831fb6193989)  
<sub>Figure 3. Sending the message information.</sub> 

In the figure 3, we see an example of how the server should send the message data.

## Socket.io Connection
### SocketManager Class
The SocketManager class encapsulates the management of a WebSocket connection using Socket.IO. It allows you to listen for custom events (tool, camera, messages) and define functions that are executed when these events occur.

#### Constructor
* serverUrl: WebSocket server URL.
* this.socket = io(serverUrl): Creates a connection with the server.
* Three private properties are initialized to store callbacks (_toolCallback, _cameraCallback, _messagesCallback).
* The _initListeners() method is called to set up the event listeners.

![image](https://github.com/user-attachments/assets/ea7f0b07-031d-4e9c-ba29-f957b0e3afe0)  
<sub>Figure 4. SocketManager constructor.</sub> 

#### Callback
These methods allow the class user to register functions that will be executed when data is received from the server:

* onTool: for "tool" type events.
* onCamera: for "camera" type events.
* onMessages: for "messages" type events.

![image](https://github.com/user-attachments/assets/b4809650-f852-4dc5-be2d-3d376c955183)  
<sub>Figure 5. SocketManager callback.</sub> 

#### initListeners
This method listens for events from the server:
- If a "tool" event is received, it executes the corresponding callback with the received data.
- The same applies for "camera" and "messages" events.
- It allows the data handling logic to be separated from the connection code.

![image](https://github.com/user-attachments/assets/87a7ed2a-548a-4935-bd98-cdd71e07b47a)  
<sub>Figure 6. SocketManager initListeners.</sub> 

### App.svelte
The server sends data about tools, camera, and messages through WebSocket.  
SocketManager: Receives that data, updates the reactive variables (using writable) and is used to manage the server's WebSocket events. The connection is established with new SocketManager("server IP").  
UI: The Svelte components update automatically when the reactive variables change (for example, tools, cameraControl, message). 
#### Assignment of the callbacks
1. Tools (onTool): The tools are updated based on the data received from the server. ToolData instances are created using only the first 4 objects sent by the server, and the tools store is updated.

![image](https://github.com/user-attachments/assets/22d168c9-9822-4a4f-9e69-15aee98757d2)  
<sub>Figure 7. onTool Callback assign.</sub> 

2. Camera (onCamera): Updates the camera controller (cameraControl) with the new data from the server.

![image](https://github.com/user-attachments/assets/ed6c2e0a-c906-49c8-8071-2d00148c23b9)  
<sub>Figure 8. onCamera Callback assign.</sub> 

3. Messages (onMessages): Handles messages of type info, warning, and error, and adds them to the list of displayed messages. Each message is adjusted with an icon to differentiate the types (❌ for errors, ⚠️ for warnings, and ℹ️ for information).

![image](https://github.com/user-attachments/assets/383e07a6-2afe-4f84-8eaa-e97bbad3ada0)  
<sub>Figure 9. onMessages Callback assign.</sub>

#### Components
The user interface is organized to display components and real-time data:
- **MessageContainer:** Shows the messages stored in the message store.
- **Camera:** Displays the camera’s visual interface.
- **CameraControlDisplay:** Shows the camera control with the color of the most urgent message.
- **Tool:** These are iterated with each and displayed dynamically, with a tool number and a message color associated based on the message priority.  
Each tool is associated with its own ToolUIController.  
If a message has the highest priority (error), an "error" symbol (⨉) is shown instead of the tool number.  
The color of each tool adjusts according to the priority of the messages associated with that tool.

![image](https://github.com/user-attachments/assets/9ab8c55c-6290-49e1-b538-72f83463ea01)  
<sub>Figure 10. Components.</sub>

## CameraControl
### CameraControllerData Class
Class that manages the camera’s depth and position. The camera depth (cameraDepth) must be between 0 and 15, otherwise, an error is thrown. The class also manages the camera’s position (_cameraPosition), 
which starts at 0, and provides getters and setters to access and modify these values.

![image](https://github.com/user-attachments/assets/20953d74-7bf5-4ba5-9998-4f3e11c6fe38)  
<sub>Figure 11. CameraControllerData Class.</sub>

### CameraUIController Class
Class that manages the camera’s visual interface. The constructor receives an instance of CameraControllerData and checks that it is of the correct type, if not, it throws an error.
 The class maintains a visibility state (visible) and provides methods to hide (hideCamera), show (showCamera), and get the camera instance (getCamera).

 ![image](https://github.com/user-attachments/assets/12cd3d31-b4ea-447c-ad9e-e27d3ab7540d)  
<sub>Figure 12. CameraUIController Class.</sub>

## MessageContentControl
### ConsoleMessageData Class
Class to represent console messages, storing the text, the type (which must be an instance of MessageType), and the position. It provides methods to access each of these values.

![image](https://github.com/user-attachments/assets/e022b018-7dc7-48fd-bdef-3f349e30d63e)  
<sub>Figure 13. ConsoleMessageData Class.</sub>

### MessageType
Class that represents the message type ("info", "warning", or "error") and only allows instances to be created with those valid values.

![image](https://github.com/user-attachments/assets/17ca750e-2ad6-4447-9a95-9c004daa5d32)  
<sub>Figure 14. ConsoleMessageData Class.</sub>

### ConsoleMessageUIController
This class manages the display and handling of console messages. It receives instances of ConsoleMessageData, allows adding and removing messages from an array, 
changes the color based on the message type, and gets the most important message type using the function getHighestPriorityMessageType, given an array of messages and a position, 
returns the most important message in case there is more than one message for the same component. The order of importance is info < warning < error.

![image](https://github.com/user-attachments/assets/da06d343-00e2-4413-9f84-4592fe0be32c)  
<sub>Figure 15. ConsoleMessageUIController Class.</sub>

## ToolControl
### ToolData Class
Class that represents a tool with depth, angle, and position, validating their ranges upon creation. It calculates an opening value based on the angle and allows adding or 
removing the tool from an array. It provides getters and setters for each property.

![image](https://github.com/user-attachments/assets/40f20bc3-544c-44bc-95af-1df8c6098988)  
<sub>Figure 16. ToolData Class.</sub>

### ToolUIController
Class that manages the visual interface of a tool. It receives an instance of ToolData, controls its visibility (show/hide), allows access to the tool, and assigns a visual position based on a given number.

![image](https://github.com/user-attachments/assets/89a01128-930d-4fc3-b23b-b43d6035e3be)  
<sub>Figure 17. ToolUIController Class.</sub>
