class ChatEngine {
    constructor() {

        this.socket = io.connect("http://localhost:3000")
        this.connectionHandler();
    }


    connectionHandler() {
        this.socket.on('connect', function () {
            console.log("connection established");
        })
    }
}