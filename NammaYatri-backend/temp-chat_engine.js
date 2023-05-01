class ChatEngine {
    constructor() {
        this.socket = io.connect("https://namma-yatri-development.vercel.app/", {
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
