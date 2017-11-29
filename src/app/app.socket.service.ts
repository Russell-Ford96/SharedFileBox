import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

export class AppSocketService {
    private url = 'http://localhost:3100';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new_message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new_message', (message) => {
                console.log("new message ");
                console.log(message);
                observer.next(message);
            });
        });
    }
    // sent message
    public sendMessageToSent(message){
        this.socket.emit('sent_message', message);
    }
    public getMessagesFromSent = () => {
        return Observable.create( (observer) => {
          this.socket.on('sent_message', (message) => {
             console.log('message----->', message);
             observer.next(message);
          })
        })
    }


}
