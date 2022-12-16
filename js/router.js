import * as mainController from './controllers/main.js'

const hashCheck = () => {
    if (window.location.hash !== "") {
        console.log('abc')
        return;
    }
    console.log('starting main controller')
    mainController.start()
}

const start = hashCheck;
window.onhashchange = hashCheck;

export { start }