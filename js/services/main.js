const API_URL = "http://localhost:3000/pills"

let pills = null;

const fetchData = async () => {
    if (pills) {
        return;
    }
    const response = await fetch(API_URL)
    pills = await response.json();
}

const getCategories = async () => {
    if (!pills) {
        await fetchData();
    }
    const categories = Object.entries(pills).map(pill => pill[1].category).filter(pill => pill !== "")
    
    return new Set(categories);
}

const getPills = async () => {
    if (!pills) {
        await fetchData()
    }

    return pills;
}

export { getCategories, getPills }