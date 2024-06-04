const LogEvents=require('./logEvents')
const EventEmitter=require('events')

class MyEventEmitter extends EventEmitter {}

const myeventemmitter= new MyEventEmitter

myeventemmitter.on('event', (msg) =>  LogEvents(msg));

  setTimeout(()=>{
    myeventemmitter.emit('event','log event emitted')
  },2000);