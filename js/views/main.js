let categories = null;
let pills = null;
let loggedInUser = null;
let shoppingCartCount = 0;

const render = (fetchedCategories, fetchedPills) => {
    categories = fetchedCategories;
    pills = fetchedPills;
    renderCategoriesMenu();
    loginButton();
    logOut();
    registerButton();
    registerLoginButton();
    registerSaveUserButton()
    openTopSalesModal();
    registerShoppingCart();
}

const registerLoginButton = () => {
    $(document).on('click', '#register-btn',  () => {
        onRegister();
    })
}

const logOut = () => {
    $(document).on('click', '#log-out-btn',  () => {
        loggedInUser = null;
        const nav = $('#nav-buttons')
        nav.empty();
        const signinBtn = $(`<button class="btn btn-default" id="signin-btn">Aderir</button>`)
        nav.append(signinBtn)
        loginButton();
    })
}

const registerShoppingCart = () => {
    
}

const saveUser = () => {
    const name = $('#name-register-input').val()
    const username = $('#login-register-input').val()
    const password = $('#password-register-input').val()
    
    let user = JSON.parse(localStorage.getItem(username));
    if (user){
        alert('Algo de errado não está certo')
        $('#password-input').val('')
        $('#login-input').val('')
        return
    }
    loggedInUser = [name, username, password]
    const array = JSON.stringify([name, username,password])
    localStorage.setItem(username, array);
    const modal = $('#pharmacyModal').get(0);
    modal.classList.replace("modal-visible","modal-invisible");
    onEndOfLogin();
}

const registerSaveUserButton = () => {
    $(document).on('click', '#login-modal-btn',  () => {
        logIn();
    })
}

const logIn = () => {
    const password = $('#password-input').val()
    const username = $('#login-input').val()

    let user = JSON.parse(localStorage.getItem(username));
    if (!user || user[2] !== password) {
        alert('Algo de errado não está certo')
        $('#password-input').val('')
        $('#login-input').val('')
        return
    }
    loggedInUser = user;
    const modal = $('#pharmacyModal').get(0);
    modal.classList.replace("modal-visible","modal-invisible");
    onEndOfLogin()
}

const onEndOfLogin = () => {
    const nav = $('#nav-buttons')
    const btn = $('#signin-btn').removeAttr('class');
    btn.remove();
    const name = $(`
    <div style="display: flex; justify-content: center; align-items: center">
        <div style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <img src="../../img/shopping-cart.png" style="width: 30px;margin-left: 20px/>
        <span id="shopping-cart-count" style="margin-right: 20px">${shoppingCartCount}</span>  
        </div>
        <img src="../../img/user-icon.png" style="width: 30px; margin-right: 10px; margin-left: 20px">
        <span style="font-weight: 600; font-size: large; margin-right: 20px">${loggedInUser[0]}</span>
        <a id="log-out-btn" class="log-out">Terminar Sessão</a>
    </div>
    `)
    nav.append(name)
    addToCartEventListener();
}

const registerButton = () => {
    $(document).on('click', '#register-save-btn',  () => {
        saveUser();
    })
}

const onRegister = () => {
    const modal = $('#pharmacyModal').get(0);
    $('#pharmacyModal').empty()
    const modalView =$(`<div id="login-modal-content">
        <span id="close-button" class="close-button">X</span>
        <div>
            <label for="login">Nome</label>
            <input name="login" type="text" id="name-register-input" required/>
        </div>
        <div>
            <label for="login">Nome de utilizador</label>
            <input name="login" type="text" id="login-register-input" required />
        </div>
        <div>
            <label for="login">Palavra-passe</label>
            <input name="password" id="password-register-input" type="password" required>
        </div>
        <div class="register-div">
            <button class="btn btn-default" id="register-save-btn" >Aderir</button>
        </div>
    </div>`).get(0);
    modal.appendChild(modalView);
    closeModal(modal);
    modal.classList.replace("modal-invisible","modal-visible");
}

const openTopSalesModal = () => {
    $('#pill-100').click(() => {
        addClickEventListener(pills.filter(pill => pill.id === "15")[0], $('#pharmacyModal').get(0), true)
    })
    $('#pill-101').click(() => {
        addClickEventListener(pills.filter(pill => pill.id === "20")[0], $('#pharmacyModal').get(0), true)
    })
    $('#pill-102').click(() => {
        addClickEventListener(pills.filter(pill => pill.id === "41")[0], $('#pharmacyModal').get(0), true)
    })
    $('#pill-103').click(() => {
        addClickEventListener(pills.filter(pill => pill.id === "54")[0], $('#pharmacyModal').get(0), true)
    })
}

const loginButton = () => {
    const btn = $('#signin-btn')
    btn.click(() => {
        openLoginModal();
    })
}

const openLoginModal = () => {
    const modal = $('#pharmacyModal').get(0);
    $('#pharmacyModal').empty()
    const modalView =$(`<div id="login-modal-content">
        <span id="close-button" class="close-button">X</span>
        <div>
            <label for="login">Nome de utilizador</label>
            <input name="login" type="text" id="login-input" required/>
        </div>
        <div>
            <label for="login">Palavra-passe</label>
            <input name="password" id="password-input" type="password" required>
        </div>
        <div class="register-div">
            <a id="register-btn">Aderir</a>
            <button type="submit" class="btn btn-default" id="login-modal-btn">Iniciar Sessão</button>
        </div>
    </div>`).get(0);
    modal.appendChild(modalView);
    closeModal(modal);
    modal.classList.replace("modal-invisible","modal-visible");
}

const addClickEventListener = (pill, modal, top) => {
    if (top) {
        $('#pharmacyModal').empty()
        const modalView= $(`<div class="modal-content">
            <span id="close-button" class="close-button">X</span>
            <h2 class="modal-name">${pill.name}</h2>
            <div class="modal-info">
                <img class="modal-photo" src="./img/pills/pill_${pill.id}.png">
                <div>
                <p class="modal-price">€ ${pill.price}</p>
                <p class="modal-description">${pill.description}</p>
                </div>
            </div>
        </div>`).get(0);
        modal.appendChild(modalView);
        closeModal(modal);
        modal.classList.replace("modal-invisible","modal-visible");
        return
    }
    $(`#pill-${pill.id}`).click(function() {
        $('#pharmacyModal').empty()
        const modalView =$(`<div class="modal-content">
        <span id="close-button" class="close-button">X</span>
        <h2 class="modal-name">${pill.name}</h2>
        <div class="modal-info">
            <img class="modal-photo" src="./img/pills/pill_${pill.id}.png">
            <div>
            <p class="modal-price">€ ${pill.price}</p>
            <p class="modal-description">${pill.description}</p>
            </div>
        </div>
    </div>`).get(0);
        modal.appendChild(modalView);
        closeModal(modal);
        modal.classList.replace("modal-invisible","modal-visible");
    })
}

const addToCartEventListener = () => {
    pills.forEach(pill => {
        $(document).on('click', `#add-cart-${pill.id}`,  (e) => {
            if(loggedInUser) {
                e.stopPropagation();
                setTimeout(() => {
                    let el =document.getElementById('shopping-cart-count-123')
                    shoppingCartCount++;
                    el = '';
                    el = shoppingCartCount
                }, 1000)
            }
        })
    })
}

const renderCategoriesMenu = () => {
    const menu = $('#category-menu').get(0);
    const navigation = $('#navigate-menu').get(0);
    const modal = $('#pharmacyModal').get(0);

    pills.forEach(pill => {
        const product = $(`
        <div class="top-item-wrapper" id="pill-${pill.id}"><div class="top-item">
        <div class="top-img-wrapper">
                <img src="./img/pills/pill_${pill.id}.png" class="top-img">
            </div>
            <div class="top-info">
                    <span class="top-name">${pill.name}</span>
                <span class="top-price">€ ${pill.price}</span>
            </div>
            <button class="btn add-btn" id="add-cart-${pill.id}">Adicionar ao Carrinho</button>
        </div></div>`).get(0);
        menu.append(product);
        addClickEventListener(pill, modal)
    })
    
    var els = document.getElementsByClassName("top-name");

    Array.prototype.forEach.call(els, function(el) {
        if (el.innerHTML.length > 56){
            el.classList.add('truncate')
            }
    });
}

const closeModal = (modal) => {
    $('#close-button').click(function() {
        modal.classList.replace("modal-visible","modal-invisible");
    })
}

export { render } 