import http from "http";
import app from "./server";

const server = http.createServer(app);
server.listen(3000);

if (module.hot) {
    module.hot.accept("./server", () => {
        server.removeListener("request", app);
       	const currentApp = require('./server').default
        server.on("request", currentApp);
    });
}
