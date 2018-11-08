import {Config} from "./config.interface";
import {Point, ResultMessage, StartMessage} from "./message.interface";

addEventListener('message', (message: MessageEvent) => {
    try {
        let data = <StartMessage> message.data;
        config = data.config;
        if (data.action === 'abort') {
            isRunning = false;
        }
        postMessage(<ResultMessage>{
            info: '',
            status: "finished",
            result: runCode()
        });
    }
    catch (e) {
        postMessage(<ResultMessage>{info: e.toString(), result: [], status: "error"});
    }
});

let isRunning = false;
let isFinished = false;

let config: Config;

function runCode(): Point[] {
    isRunning = true;
    isFinished = false;
    const dots: Point[] = [{x: 10, y: 10}];
    for (let i = 0; i < 1000 && isRunning; i++) {
        if (config.goRectangular) {
            dots.push(
                (Math.random() > 0.5) ?
                    {
                        x: dots[dots.length - 1].x + config.stepSize,
                        y: dots[dots.length - 1].y
                    } : {
                        y: dots[dots.length - 1].y + config.stepSize,
                        x: dots[dots.length - 1].x
                    });

        }
    }
    if (isRunning = false) {
        return dots;
    }
    isRunning = false;
    isFinished = true;
    return dots;
}