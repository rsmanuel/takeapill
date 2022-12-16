import * as mainService from "../services/main.js"
import * as mainView from "../views/main.js"

const start = async () => {
    const categories = await mainService.getCategories()
    const pills = await mainService.getPills()
    mainView.render(categories, pills)
}

export { start }