export class PrimaryButtonController{
    constructor(title, borderRadius){
        this.title = title;
        this.onClick = null;
        this.borderRadius = borderRadius;
    }


    _handleOnClickEvent(){
        if(this.onClick){
            this.onClick();
        }
    }

}