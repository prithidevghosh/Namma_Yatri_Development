class ChatEngine {
    constructor() {
        this.socket = io.connect("http://localhost:8000", {
            withCredentials: false

        });
        this.connectionHandler();
    }

    connectionHandler() {
        let self = this;
        this.socket.on('connect', function () {
            console.log("connection established");
        })

        self.socket.on('newmsg', function (e) {
            console.log(e.message);
        });
    }
}

let chatEngine = new ChatEngine();

