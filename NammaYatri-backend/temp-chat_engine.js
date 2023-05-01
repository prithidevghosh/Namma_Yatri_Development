class ChatEngine {
    constructor() {

        this.socket = io.connect("http://localhost:5000")
        this.connectionHandler();
    }


    connectionHandler() {
        let self = this;
        this.socket.on('connect', function () {
            console.log("connection established");
        })

        self.socket.on('newmsg', function (e) {

            console.log(e.message);

        })

    }
}