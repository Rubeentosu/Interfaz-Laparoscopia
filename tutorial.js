let a = 1;

function test(a, b){
    a = a+1;
    return b+a
}

console.log(test(a, 1));
console.log(test(a, 1));

class Student{
    constructor(id,name){
        this.id = id;
        this.name = name;
    }

    equals(other){
        return this.id == other.id;
    }
}


let paco = new Student(1, "Paco");
let juan = new Student(1, "Juan");

if(paco.equals(juan)){
    console.log("Weeee")
}else{
    console.log("Wiiii")
}