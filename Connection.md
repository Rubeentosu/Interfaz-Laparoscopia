# Socket.io Connection
This interface will operate with a client/server connection using socket.io, this project has been developed using Svelte and Vite.  
To run the project, the first thing you need to do is execute the command "npm run build" (you must run this command every time you make a change) to build the program.  
To view it, you should run the command "npm run preview".  


### Tools
Topic 'tool'  
message
```
     [
      {
        depth: <number>,
        angle: <number>,
        position: <number>
      }
    ];
```
  
For the tools to work correctly, you must pass an array of one to four ToolData objects with the following attributes:
1. **depth:** this attribute must be a float type, it represents the tool's depth in centimeters.
2. **angle:** this attribute must be a float type, it represents the opening angle of the tool.
3. **position:** this attribute must be an int type, it represents the position where the tool will be placed.

#### Errors
Some of the errors when entering data in the attributes can be:
1. **depth:** this attribute must not receive a negative number, a number greater than 15 or something other than a float.
2. **angle:** this attribute must not receive a negative number, a number greater than 90 or something other than a float.
3. **position:** this attribute must not receive a number smaller than 1, a number greater than 4 or something other than a int.


### Camera
Topic 'camera'  
message
```
    {
     camera: <number>
    }
```
  
For the camera to work correctly, you must pass a type float number, it represents the camera's depth in centimeters.
#### Errors
1. **cameraDepth:** this attribute must not receive a negative number, a number greater than 15 or something other than a float.

### Message Container
Topic 'messages'  
message
```
     [
      { text: <string>,
        type: <string>,
        toolPosition: <number>}
    ];
```
  
For the messages to work correctly, you must pass an array of one to five ConsoleMessageData objects with the following attributes:
1. **text:**  this attribute must be a string type, it represents the message's content.
2. **type:** this attribute must be a string type, it represents the message's type.
3. **toolPosition:** this attribute must be a int type, this number refers to the position of the affected tool.

#### Errors
Some of the errors when entering data in the attributes can be:
1. **text:** this attribute must receive a string between 0 and 400 characters, if it has more than 400 characters it may overflow.
2. **type:** this attribute must receive one of the following strings: "error", "warning", or "info".
3. **toolPosition:** this attribute must not receive a number smaller than 0 (0 corresponds to the camera position), a number greater than 4 or something other than a int.

### CameraVisualInterface
When the program runs, it will search for a video device connected via USB and set the incoming image from this device as the background.

## Classes

### SocketManager Class
The SocketManager class encapsulates the management of a WebSocket connection using Socket.IO. It allows you to listen for custom events (tool, camera, messages) and define functions that are executed when these events occur.

#### Constructor
* serverUrl: WebSocket server URL.
* this.socket = io(serverUrl): Creates a connection with the server.
* Three private properties are initialized to store callbacks (_toolCallback, _cameraCallback, _messagesCallback).
* The _initListeners() method is called to set up the event listeners.

#### Callback
These methods allow the class user to register functions that will be executed when data is received from the server:

* onTool: for "tool" type events.
* onCamera: for "camera" type events.
* onMessages: for "messages" type events.

#### initListeners
This method listens for events from the server:
- If a "tool" event is received, it executes the corresponding callback with the received data.
- The same applies for "camera" and "messages" events.
- It allows the data handling logic to be separated from the connection code.
```
import { io } from "socket.io-client";
export class SocketManager {
	constructor(serverUrl) {
		this.socket = io(serverUrl);
		this._toolCallback = null;
		this._cameraCallback = null;
		this._messagesCallback = null;
		this._initListeners();
	}
	onTool(callback) {
		this._toolCallback = callback;
	}
	onCamera(callback) {
		this._cameraCallback = callback;
	}
	onMessages(callback) {
		this._messagesCallback = callback;
	}
	_initListeners() {
		this.socket.on("tool", (data) => {
			if (this._toolCallback) {
				this._toolCallback(data);
			}
		});
		this.socket.on("camera", (data) => {
			if (this._cameraCallback) {
				this._cameraCallback(data);
			}
		});
		this.socket.on("messages", (data) => {
			if (this._messagesCallback) {
				this._messagesCallback(data);
			}
		});
	}
	disconnect() {
		this.socket.disconnect();
	}
}
```
### App.svelte
The server sends data about tools, camera, and messages through WebSocket.  
SocketManager: Receives that data, updates the reactive variables (using writable) and is used to manage the server's WebSocket events. The connection is established with new SocketManager("server IP").  
UI: The Svelte components update automatically when the reactive variables change (for example, tools, cameraControl, message). 
#### Assignment of the callbacks
1. Tools (onTool): The tools are updated based on the data received from the server. ToolData instances are created using only the first 4 objects sent by the server, and the tools store is updated.

2. Camera (onCamera): Updates the camera controller (cameraControl) with the new data from the server.

3. Messages (onMessages): Handles messages of type info, warning, and error, and adds them to the list of displayed messages. Each message is adjusted with an icon to differentiate the types (❌ for errors, ⚠️ for warnings, and ℹ️ for information).


#### Components
The user interface is organized to display components and real-time data:
- **MessageContainer:** Shows the messages stored in the message store.
- **Camera:** Displays the camera’s visual interface.
- **CameraControlDisplay:** Shows the camera control with the color of the most urgent message.
- **Tool:** These are iterated with each and displayed dynamically, with a tool number and a message color associated based on the message priority.  
Each tool is associated with its own ToolUIController.  
If a message has the highest priority (error), an "error" symbol (⨉) is shown instead of the tool number.  
The color of each tool adjusts according to the priority of the messages associated with that tool.

## CameraControl
### CameraControllerData Class
Class that manages the camera’s depth and position. The camera depth (cameraDepth) must be between 0 and 15, otherwise, an error is thrown. The class also manages the camera’s position (_cameraPosition), 
which starts at 0, and provides getters and setters to access and modify these values.
```
export class CameraControllerData {
	constructor(cameraDepth) {
		if (cameraDepth < 0 || cameraDepth > 15) {
			throw new Error("The Camera Depth must be a number between 0 and 15");
		}else{
			this._cameraDepth = cameraDepth;
		}
		this._cameraPosition = 0;
	}
	get cameraDepth() {
		return this._cameraDepth;
	}
	set cameraDepth(value) {
		this._cameraDepth = value;
	}
	get position(){
		return this._cameraPosition;
	}
}
```
### CameraUIController Class
Class that manages the camera’s visual interface. The constructor receives an instance of CameraControllerData and checks that it is of the correct type, if not, it throws an error.
 The class maintains a visibility state (visible) and provides methods to hide (hideCamera), show (showCamera), and get the camera instance (getCamera).
```
import { CameraControllerData } from "./CameraControllerData";
export class CameraUIController {
    constructor(cameraDataInstance) {
        if (!(cameraDataInstance instanceof CameraControllerData)) {
            throw new Error('Se requiere una instancia de ToolData');
        }
        this.camera = cameraDataInstance;
        this.visible = true;
    }
    hideCamera(){
        this.visible = false;
    }
    showCamera(){
        this.visible = true;
    }
    getCamera() {
        return this.camera;
    }
}
```
## MessageContentControl
### ConsoleMessageData Class
Class to represent console messages, storing the text, the type (which must be an instance of MessageType), and the position. It provides methods to access each of these values.
```
export class ConsoleMessageData {
    constructor(text, type, position) {
        this._text = text;
        if(!(type instanceof MessageType)){
        throw new Error("Console message must be created with a MessageType");
        }
        this._type = type;
        this._position = position;        
	}
    get text(){
        return this._text;
    }
    get type(){
        return this._type;
    }
    get position() {
        return this._position;
    }
}
```
### MessageType
Class that represents the message type ("info", "warning", or "error") and only allows instances to be created with those valid values.
```
export class MessageType{
    static info = new MessageType("info");
    static warning = new MessageType("warning");
    static error = new MessageType("error");
    constructor(type){
        this._type = type;
        if(type != "info" && type != "warning" && type != "error"){
        throw new Error("Cant create Console Message with that type");
        }
    }
    get type(){
        return this._type;
    }
}
```
### ConsoleMessageUIController
This class manages the display and handling of console messages. It receives instances of ConsoleMessageData, allows adding and removing messages from an array, 
changes the color based on the message type, and gets the most important message type using the function getHighestPriorityMessageType, given an array of messages and a position, 
returns the most important message in case there is more than one message for the same component. The order of importance is info < warning < error.
```
import { ConsoleMessageData } from "./ConsoleMessageData";
export class ConsoleMessageUIController {
    constructor(messageDataInstance) {
            if (!(messageDataInstance instanceof ConsoleMessageData)) {
                throw new Error('Se requiere una instancia de ConsoleMessageData');
            }   
            this.message = messageDataInstance;
        }
        getMessage() {
            return this.message;
        }
        addMessage(array){
            array.push(this);
            return array;
        }
        deleteMessage(array){
            array.shift();
            return array;
        }
        deleteAllMessage(array){
            array.length = 0;
            return array;
        }
        changeColor(type){
            if (type === "warning") return '#ffd966';
            if (type === "error") return '#ff723e';
        return '#B2FFD6';
        }
        getHighestPriorityMessageType(messages, position) {
            const priority = { error: 2, warning: 1 };
            let bestType = null;
            let bestPriority = 0;
            for (const messageController of messages) {
            const message = messageController.getMessage();    
            if (message.position === position) {
                const typePriority = priority[message.type._type] || 0;
                if (typePriority > bestPriority) {
                bestPriority = typePriority;
                bestType = message.type;
                }
            }
            }
            return bestType;
        } 
}
```
## ToolControl
### ToolData Class
Class that represents a tool with depth, angle, and position, validating their ranges upon creation. It calculates an opening value based on the angle and allows adding or 
removing the tool from an array. It provides getters and setters for each property.
```
export class ToolData {
    constructor(toolDepth, toolAngle, toolPosition) {
		if (toolDepth < 0 || toolDepth > 15) {
			throw new Error("The Tool Depth must be a number between 0 and 15");
		}else{
			this._toolDepth = toolDepth;	
		}
		if (toolAngle < 0 || toolAngle > 90) {
			throw new Error("The Tool Angle must be a number between 0 and 90");
		}else{
			this._toolAngle = toolAngle;
		}
		if(toolPosition > 4 || toolPosition < 1){
			throw new Error("The Tool Positon must be a number between 1 and 4");
		}else{
			this._toolPosition = toolPosition;
		}
        this._toolOpening = this.openingAngle();
	}
	get toolDepth() {
		return this._toolDepth;
	}
	set toolDepth(value) {
		this._toolDepth = value;
    }
    get toolAngle() {
		return this._toolAngle;
	}
	set toolAngle(value) {
		this._toolAngle = value;
    }
	get toolPosition() {
		return this._toolPosition;
	}
	set toolPosition(value) {
		this._toolPosition = value;
    }
	get toolOpening() {
		return this._toolOpening;
	}
    openingAngle() {
		let anglePosition = this._toolAngle;
		let fill;
		if (anglePosition <= 14) {
			fill = 3;
		} else {
			fill = anglePosition - 10;
		}
		let position = String(fill);
		return `0,0 -${position},-30 ${position},-30`;
	}
	deleteTool(array){
        array.shift();
        return array;
    }
    addTool(array){
        array.push(this);
        return array;
    }
}
```

### ToolUIController
Class that manages the visual interface of a tool. It receives an instance of ToolData, controls its visibility (show/hide), allows access to the tool, and assigns a visual position based on a given number.  
```
import { ToolData } from "./ToolData";
export class ToolUIController {
	constructor(toolDataInstance) {
		if (!(toolDataInstance instanceof ToolData)) {
			throw new Error('Se requiere una instancia de ToolData');
		}
		this.tool = toolDataInstance;
		this.visible = true;
	}
	hideTool(){
		this.visible = false;
	}
	showTool(){
		this.visible = true;
	}
	getTool() {
		return this.tool;
	}
	assignToolPosition(position){
		switch(position){
			case 1:
				return "top-right";
			case 2:
				return "top-left";
			case 3:
				return "bottom-left";
			case 4:
				return "bottom-right";	
		}
	}
}
```
