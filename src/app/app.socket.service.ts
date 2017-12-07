import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

export class AppSocketService {
    private url = 'http://10.73.30.110:3100';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendNotification(message) {
        this.socket.emit('new_notification', message);
    }

    public sendMessage(message) {
        this.socket.emit('new_message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new_message', (message) => {
                console.log("new message ");
                console.log(message);
                //console.log(message.body);
                observer.next(message);
            });
        });
    }

    public getNotification = () => {
        return Observable.create((observer) => {
            this.socket.on('new_notification', (message) => {
                console.log("new_notification");
                console.log(message);
                observer.next(message);
            });
        });
    }

}
