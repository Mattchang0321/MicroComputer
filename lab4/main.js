const express = require("express")
const app = express()


app.use(express.static("./public"))

app.get("/index",(req,res)=>{
    let q = req.query;
    console.log(q)
    let response = {
        "led":[
            q.led1,q.led2,q.led3,q.led4
        ],
        "operation":q.operation,        
    }
    response.led.forEach((e,i)=>{
        if( e == "true")
            //console.log(123);
            controlLED(i+1,q.operation);
    });
    res.send(response);
    
    
});
app.get("/Frequency",(req,res)=>{
    switchLED(parseInt(req.query.times));
    res.status(200).send("good");
});
// LED 1-4 , POWER :on,off
let controlLED =(LED,POWER)=>{
    let child_process = require("child_process");
    
    let process = child_process.execFile("sudo",["./c++/main",LED,POWER]);
    console.log(LED,POWER)
    process.stdout.on('data',(data)=>{
        console.log(`stdout:${data}`);
    })
    process.stderr.on('data',(data)=>{
        console.log(`stderr:${data}`);
    });
};
let switchLED =(times)=>{
    let child_process = require("child_process");
    
    let process = child_process.execFile("sudo",["./c++/main2",times]);
    console.log(times);
    process.stdout.on('data',(data)=>{
        console.log(`stdout:${data}`);
    })
    process.stderr.on('data',(data)=>{
        console.log(`stderr:${data}`);
    });
};
const PORT =process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});