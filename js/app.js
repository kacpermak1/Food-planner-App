
document.addEventListener("DOMContentLoaded", function () {

    // main-app-view

    const liList = document.querySelectorAll(".aside-menu li");

    for (let i = 0; i < liList.length; i++) {

        liList[i].querySelector("a").addEventListener("click", function () {
            for (let j = 0; j < liList.length; j++) {
                liList[j].querySelector("i").classList.remove("fas");
                liList[j].querySelector("i").classList.remove("fa-chevron-right");
                liList[j].querySelector("a").classList.remove("border-left");
            }

            liList[i].querySelector("i").classList.add("fas");
            liList[i].querySelector("i").classList.add("fa-chevron-right");
            liList[i].querySelector("a").classList.add("border-left");
        });
    }

    //app_navigation_buttons

    const desktopButton = $('#desktop_button');
    const allRecipesBtn = $('#all_recipes_button');
    const allPlansButton = $('#all_plans_button');
    const addRecipeIcon = $('#add_recipe_icon');
    const addPlanIcon = $('#add_plan_icon');

    desktopButton.on('click', function () {

        $('.add_plan_modal').css('display', 'none');
        $('.add_recipe_modal').css('display', 'none');
        $('.all_recipes_modal').css('display', 'none');
        $('.all_plans_modal').css('display', 'none');
    });

    allRecipesBtn.on('click', function () {
        $('.all_plans_modal').css('display', 'none');
        $('.all_recipes_modal').css('display', 'flex');
        if ($('.add_recipe_modal').css('display') === "flex") {
            $('.add_recipe_modal').css('display', 'none')
        }
        if ($('.add_plan_modal').css('display') === "flex") {
            $('.add_plan_modal').css('display', 'none')
        }
        $('.recipes_list').empty();
        loadRecipesList();
    });

    allPlansButton.on('click', function () {
        $('.all_recipes_modal').css('display', 'none');
        $('.all_plans_modal').css('display', 'flex');
        if ($('.add_recipe_modal').css('display') === "flex") {
            $('.add_recipe_modal').css('display', 'none')
        }
        if ($('.add_plan_modal').css('display') === "flex") {
            $('.add_plan_modal').css('display', 'none')
        }
        $('.plans_list').empty();
        loadPlansList()
    })

    addRecipeIcon.on('click', function () {
        $('.add_recipe_modal').css('display', 'flex');
    })

    addPlanIcon.on('click', function () {
        $('.add_plan_modal').css('display', 'flex');
    })

    // saving name

    const nameInput = document.querySelector('input[name="lastname"]');
    const readyButton = document.querySelector('#name_button');
    const nameProfil = document.querySelector('.name');
    const defaultNameProfil = nameProfil.innerHTML;
    const firstPanel = document.querySelector('.firstvisit_form');
    const mainPanel = document.querySelector('.main-panel');


    readyButton.addEventListener('click', function storeName() {

        let nameValue = nameInput.value;

        if (nameValue.length > 0) {
            localStorage.setItem("savedName", nameValue);
            return localStorage.savedName;

        } else if (nameValue.length === 0 && localStorage.getItem("savedName") != null) {
            return "Name exists or invalid name"
        }
    });

    function checkName() {
        if (localStorage.getItem("savedName") != null) { // if the name exists
            nameProfil.innerHTML = localStorage.savedName;
            firstPanel.style.display = "none";
            mainPanel.style.display = "block";
            liList[0].querySelector("i").classList.add("fas");
            liList[0].querySelector("i").classList.add("fa-chevron-right");
            liList[0].querySelector("a").classList.add("border-left");
            $('#menu_blocker').css('display','none');

            return nameProfil.innerHTML;

        } else { // if the name doesn't exist
            nameProfil.innerHTML = defaultNameProfil;
            firstPanel.style.visibility = 'inline-block';
            mainPanel.style.display = "none";
            $('#menu_blocker').css('display','block');

            return nameProfil.innerHTML;
        }
    }

    nameProfil.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared
        if (localStorage.getItem("savedName") != null) {
            localStorage.removeItem("savedName");
            location.reload();
        } else {
            location.reload();
            localStorage.clear();
        }

    });

    checkName();


    // add_recipe & add_plan widgets

    document.getElementById('add_recipe').addEventListener('click', function () {
        document.querySelector('.add_recipe_modal').style.display = 'flex'
    });

    document.getElementById('add_plan').addEventListener('click', function () {
        document.querySelector('.add_plan_modal').style.display = 'flex'
    });

    //closing add_new_plan and add_new_recipe window


    document.getElementById('exit_plan_button').addEventListener('click', function () {
        document.querySelector('.add_plan_modal').style.display = 'none'
    });

    document.getElementById('exit_recipe_button').addEventListener('click', function () {

    });


    // closing the widgets notifications

    const exitFirst = document.querySelector(".exit-first");
    const exitSecond = document.querySelector(".exit-second");
    const exitThird = document.querySelector(".exit-third");

    function closeInfoOne() {
        exitFirst.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    function closeInfoTwo() {
        exitSecond.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    function closeInfoThree() {
        exitThird.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    closeInfoOne();
    closeInfoTwo();
    closeInfoThree();

    // new plan save

    const savePlanButton = document.querySelector("#exit_plan_button"); //przycisk zapisz i zamknij

    let newWeekPlan = {
        id: null,
        weekPlanName: "",
        weekPlanDescription: "",
        weekPlanByDay: [],
    };


    function saveNewWeekPlanToLocalStorage(newObject) {
        let planLocalStorage = [];

        if (localStorage.getItem("plans") != null) {
            planLocalStorage = JSON.parse(localStorage.getItem("plans"));
            planLocalStorage.push(newWeekPlan);

            localStorage.setItem("plans", JSON.stringify(planLocalStorage));
        }
        else {
            planLocalStorage.push(newWeekPlan);
            localStorage.setItem("plans", JSON.stringify(planLocalStorage));
            localStorage.setItem("currentPlan", 0);
        }

        widgetUpdate();
        $('.plans_list').empty();
        loadPlansList();
    }

    savePlanButton.addEventListener("click", function (e) {
        e.preventDefault();

        const planName = document.querySelector("#plan_name");
        const planDescription = document.querySelector("#plan_description");
        const weekNumber = document.querySelector("#week_number");

        const dishesList = document.querySelectorAll("select");

        const dailyDishesArray = [];  //array with dishes

        for (let i = 0; i < dishesList.length; i++) {
            dailyDishesArray.push(dishesList[i].value)
        }

        newWeekPlan.id = weekNumber.value;
        newWeekPlan.weekPlanName = planName.value;
        newWeekPlan.weekPlanDescription = planDescription.value;
        newWeekPlan.weekPlanByDay = dailyDishesArray;

        const errors = [];
        const ids = [];
        let idExist;

        const plans = JSON.parse(localStorage.getItem("plans"));
        if (plans) {
            for (let i = 0; i < plans.length; i++) {
                const allId = Object.values(plans[i])[0];
                ids.push(allId);
            }
            if (ids.includes(weekNumber.value)) {
                idExist = true;
            } else {
                idExist = false;
            }
        }

        if (newWeekPlan.id === null || isNaN(newWeekPlan.id) === true) {
            errors.push("Provide a correct week number for this plan");
        }
        else if (idExist) {
            errors.push("Plan for this week already exists. Please provide a different one!");
        }
        else if (newWeekPlan.weekPlanName === "") {
            errors.push("Provide name for this plan");
        }
        else if (newWeekPlan.weekPlanDescription === "") {
            errors.push("Provide Description");
        }
        else {
            saveNewWeekPlanToLocalStorage(newWeekPlan);
            weekNumber.value = "";
            planName.value = "";
            planDescription.value = "";
            const select = $('.add_plan_modal').find('select');
            for (let i = 0; i < select.length; i++) {
                select.eq(i).val(select.eq(i).children().eq(0).text());
            }
            const menuBlocker = $('#menu_blocker')
            if (menuBlocker.css('display') === 'block') {
                menuBlocker.css('display', 'none')
            }
            if ((localStorage.getItem("currentPlan") == null)){
                localStorage.setItem("currentPlan" , "0")
            }
            displayCurrentPlan();
        }
        if (errors.length > 0) {
            alert(errors);
        }
    });

    //New Recipe ADD JS

    //add instructions to list
    const add_inst_button = document.getElementById('plus_instructions');
    const text_instructions = document.getElementById('instructions');
    const instructions_list = document.getElementById('instructions_list');

    add_inst_button.addEventListener('click', function () {

        if (text_instructions.value === "") { alert("Provide instructions") } else {
            const li = document.createElement("li");
            let span = document.createElement("span");
            let editButton = document.createElement("i");
            editButton.className = 'far fa-edit';
            let removeButton = document.createElement("i");
            removeButton.className = 'fas fa-trash-alt';
            let text_value = text_instructions.value;
            span.innerHTML = text_value;
            li.appendChild(span);
            li.appendChild(editButton);
            li.appendChild(removeButton);
            instructions_list.appendChild(li);
            text_instructions.value = "";
        }
    });

    //add ingridients to list

    const add_ingrid_button = document.getElementById('plus_ingridients');
    const text_ingridients = document.getElementById('ingridients');
    const ingridients_list = document.getElementById('ingridients_list');

    add_ingrid_button.addEventListener('click', function () {
        if (text_ingridients.value === "") { alert("Provide Ingredients") } else {
            var li_ing = document.createElement("li");
            let span = document.createElement("span");
            let editButton = document.createElement("i");
            editButton.className = 'far fa-edit';
            let removeButton = document.createElement("i");
            removeButton.className = 'fas fa-trash-alt';
            let text_value_ing = text_ingridients.value;
            span.innerHTML = text_value_ing;
            li_ing.appendChild(span);
            li_ing.appendChild(editButton);
            li_ing.appendChild(removeButton);
            ingridients_list.appendChild(li_ing);
            text_ingridients.value = "";
        }
    });

    // REMOVE/EDIT INSTRUCTIONS & INGRIDIENTS RECIPE_ADD

    const recipeModal = $('.add_recipe_modal');

    recipeModal.on('click', '.fa-trash-alt', function () {
        const thisIcon = $(this);
        thisIcon.parent().remove();
    })

    recipeModal.on('click', '.fa-edit', function () {
        const thisIcon = $(this);
        const span = thisIcon.parent().find('span');
        span.toggleClass('editable');
        if (span.hasClass('editable')) {
            const spanVal = span.text();
            span.replaceWith(`<input class="input_editable" value="${spanVal}"/>`);
            thisIcon.css('font-size', '30px');
        } else {
            const input = thisIcon.parent().find('input');
            const inputVal = input.val();
            input.replaceWith(`<span>${inputVal}</span>`)
            thisIcon.css('font-size', '16px');
        }
    })

    // update recipes

    function loadAllRecipes() {
        if (localStorage.recipes) {
            const recipesDisplay = JSON.parse(localStorage.recipes);
            const select = document.querySelectorAll("select");
            let arr = [];

            for (let i = 0; i < recipesDisplay.length; i++) {
                arr.push(`<option>${recipesDisplay[i].title}</option>`);
            }

            let options = arr.join("").toString();
            select.forEach(function (select, index) {
                select.innerHTML = `${options}`;
            })
        }
    }

    loadAllRecipes()


    //save Recipe

    const saveRecipeButton = document.getElementById('exit_recipe_button');

    const newRecipe = {
        title: "",
        description: "",
        instructions: [],
        ingridients: [],
    };

    function saveNewRecipeToLocalStorage(newObject) {
        let recipelocalStorage = [];

        if (localStorage.getItem("recipes") != null) {
            recipelocalStorage = JSON.parse(localStorage.getItem("recipes"));
            recipelocalStorage.push(newRecipe);

            localStorage.setItem("recipes", JSON.stringify(recipelocalStorage));
        }
        else {
            recipelocalStorage.push(newRecipe);

            localStorage.setItem("recipes", JSON.stringify(recipelocalStorage));
        }

        loadAllRecipes();
        widgetUpdate();
        $('.recipes_list').empty();
        loadRecipesList();
    }

    saveRecipeButton.addEventListener("click", function (e) {
        e.preventDefault();

        const recipeName = document.getElementById('recipe_name');
        const recipeDescription = document.getElementById('recipe_description');
        const ingridients_list = document.getElementById('ingridients_list');
        const eachIngr = ingridients_list.querySelectorAll("span");
        const instructions_list = document.getElementById('instructions_list');
        const eachLi = instructions_list.querySelectorAll('span');
        const recipe_modal = document.querySelector('.add_recipe_modal');

        document.querySelector('.add_recipe_modal').style.display = 'none'

        let instr = [];
        for (let i = 0; i < eachLi.length; i++) {
            instr.push(eachLi[i].innerText);
        }

        let ingr = [];
        for (let i = 0; i < eachIngr.length; i++) {
            ingr.push(eachIngr[i].innerText);
        }

        newRecipe.title = recipeName.value;
        newRecipe.description = recipeDescription.value;
        newRecipe.instructions = instr;
        newRecipe.ingridients = ingr;

        const nonValid = [];

        if (newRecipe.title === "") {
            nonValid.push("You forgot to provide recipe's name");
        }
        else if (newRecipe.description === "") {
            nonValid.push("You forgot to provide description!");
        }
        else if (instructions_list.innerHTML === "") {
            nonValid.push("You should provide some instructions to your recipe!");
        }
        else if (ingridients_list.innerHTML === "") {
            nonValid.push("You didn't provide any ingredients!");
        }
        else {
            saveNewRecipeToLocalStorage(newRecipe);
            recipeName.value = "";
            recipeDescription.value = "";
            instructions_list.innerHTML = '';
            ingridients_list.innerHTML = '';
            const menuBlocker = $('#menu_blocker');
            if (menuBlocker.css('display') === 'block') {
                menuBlocker.css('display', 'none')
            }
        }

        if (nonValid.length > 0) {
            alert(nonValid);
        }

    });

    //plan display
    function displayCurrentPlan() {
        let index;

        if ((localStorage.getItem("currentPlan") != null) && (localStorage.getItem("plans") !== "[]")) {

            index = JSON.parse(localStorage.getItem("currentPlan"))

            const exPlan = JSON.parse(localStorage.getItem("plans"))[index].weekPlanByDay;
            const weekNo = document.getElementById("week_no");
            weekNo.innerHTML = JSON.parse(localStorage.getItem("plans"))[index].id;

            let mondayPlan = [];
            let tuesdayPlan = [];
            let wednesdayPlan = [];
            let thursdayPlan = [];
            let fridayPlan = [];
            let saturdayPlan = [];
            let sundayPlan = [];

            for (let i = 0; i < 5; i++) {
                mondayPlan.push(exPlan[i])
            }
            for (let i = 5; i < 10; i++) {
                tuesdayPlan.push(exPlan[i])
            }
            for (let i = 10; i < 15; i++) {
                wednesdayPlan.push(exPlan[i])
            }
            for (let i = 15; i < 20; i++) {
                thursdayPlan.push(exPlan[i])
            }
            for (let i = 20; i < 25; i++) {
                fridayPlan.push(exPlan[i])
            }
            for (let i = 25; i < 30; i++) {
                saturdayPlan.push(exPlan[i])
            }
            for (let i = 30; i < 35; i++) {
                sundayPlan.push(exPlan[i])
            }

            const monday = document.querySelectorAll(".monday");
            const tuesday = document.querySelectorAll(".tuesday");
            const wednesday = document.querySelectorAll(".wednesday");
            const thursday = document.querySelectorAll(".thursday");
            const friday = document.querySelectorAll(".friday");
            const saturday = document.querySelectorAll(".saturday");
            const sunday = document.querySelectorAll(".sunday");

            for (let i = 0; i < 5; i++) {
                monday[i].innerText = mondayPlan[i];
                tuesday[i].innerText = tuesdayPlan[i];
                wednesday[i].innerText = wednesdayPlan[i];
                thursday[i].innerText = thursdayPlan[i];
                friday[i].innerText = fridayPlan[i];
                saturday[i].innerText = saturdayPlan[i];
                sunday[i].innerText = sundayPlan[i];
            }
        }
    }

    displayCurrentPlan();

    // next plan

    function nextPlan() {

        if (localStorage.getItem("currentPlan") != null) {
            if ((JSON.parse(localStorage.plans).length) == (JSON.parse(localStorage.getItem("currentPlan")) + 1)) {
                localStorage.setItem("currentPlan", 0)
            } else {
                let currentPlan = JSON.parse(localStorage.getItem("currentPlan"));
                localStorage.setItem("currentPlan", currentPlan + 1)
            }
        }
    }

    function prevPlan() {

        if (localStorage.getItem("currentPlan") != null) {
            if (JSON.parse(localStorage.getItem("currentPlan")) == 0) {
                localStorage.setItem("currentPlan", (JSON.parse(localStorage.plans).length - 1))
            } else {
                let currentPlan = JSON.parse(localStorage.getItem("currentPlan"));
                localStorage.setItem("currentPlan", currentPlan - 1)
            }
        }
    }

    const next = $('#next');
    next.on('click', function () {
        nextPlan();
        displayCurrentPlan();
    });

    const prev = $('#previous');
    prev.on('click', function () {
        prevPlan();
        displayCurrentPlan();
    });

    // widgets info

    widgetUpdate();

    function widgetUpdate() {
        const recipeWidget = $('#recipe_widget');
        const planWidget = $('#plan_widget');
        if (localStorage.recipes != null) {
            recipeWidget.text(`The number of your recipes is ${JSON.parse(localStorage.recipes).length}, nice!`)
        }
        if (localStorage.recipes != null && JSON.parse(localStorage.recipes).length === 0) {
            recipeWidget.text(`You have 0 recipes!`)
        }
        if (localStorage.plans != null) {
            planWidget.text(`You have ${JSON.parse(localStorage.plans).length} plan/s, remember to set plan for the current week!`)
        }
        if (localStorage.plans != null && JSON.parse(localStorage.plans).length === 0) {
            planWidget.text(`You have 0 plans!`)
        }
    }

    //ALL RECIPES DISPLAY
    loadRecipesList();

    function loadRecipesList() {
        if (localStorage.recipes) {

            const allRecipes = JSON.parse(localStorage.recipes);
            const recipesList = $('.recipes_list');

            for (let i = 0; i < allRecipes.length; i++) {
                const recipes = allRecipes[i];
                let html = $(`
            <div class="each_recipe" data-instructions="${recipes.instructions}" data-ingridients="${recipes.ingridients}">
                <h2>${i + 1}</h2>
                <h2 id="recipe_titles">${recipes.title}</h2>
                <p id="recipe_descriptions">${recipes.description}</p>
                <div class="icons"><i class="far fa-edit"></i><i class="fas fa-trash-alt"></i></div>
            </div>`);

                recipesList.append(html);
            }
        }
    }

    //ALL PLANS DISPLAY
    loadPlansList();

    function loadPlansList() {

        if (localStorage.plans) {
            const allPlans = JSON.parse(localStorage.plans);
            const plansList = $('.plans_list');

            for (let i = 0; i < allPlans.length; i++) {
                const plans = allPlans[i];
                let html = $(`
        <div class="each_plan" data-plan="${plans.weekPlanByDay}">
            <h2>${i + 1}</h2>
            <h2>${plans.weekPlanName}</h2>
            <p>${plans.weekPlanDescription}</p>
            <h2>${plans.id}</h2>
        <div class="icons"><i class="far fa-edit"></i><i class="fas fa-trash-alt"></i></div>
    </div>`);

                plansList.append(html);
            }
        }
    }

    //RECIPE DELETE

    const allRecipes = $('.recipes_list');

    allRecipes.on('click', '.fa-trash-alt', function () {
        const thisIcon = $(this);
        thisIcon.parent().parent().remove();
        removeRecipeFromLocal();
        loadAllRecipes();
        widgetUpdate();
    });

    function removeRecipeFromLocal() {

        let newRecipes = [];
        const eachRecipe = allRecipes.find('.each_recipe');

        for (let i = 0; i < eachRecipe.length; i++) {

            let title = eachRecipe[i].children[1].innerText;
            let description = eachRecipe[i].children[2].innerText;
            let instructions = eachRecipe[i].getAttribute('data-instructions');
            let ingridients = eachRecipe[i].getAttribute('data-ingridients');

            let newRec = {
                title: title,
                description: description,
                instructions: instructions.split(','),
                ingridients: ingridients.split(','),
            };

            newRecipes.push(newRec);
        }

        localStorage.setItem("recipes", JSON.stringify(newRecipes))
    }

    //PLAN DELETE

    const allPlans = $('.plans_list');

    allPlans.on('click', '.fa-trash-alt', function () {
        const thisIcon = $(this);
        thisIcon.parent().parent().remove();
        removePlanFromLocal();
        widgetUpdate();
        displayCurrentPlan();
    });

    function removePlanFromLocal() {

        let newPlans = [];
        const eachPlan = allPlans.find('.each_plan');
        let currentPlan = JSON.parse(localStorage.getItem("currentPlan"));
        let plansLength = JSON.parse(localStorage.getItem("plans")).length;

        for (let i = 0; i < eachPlan.length; i++) {

            let title = eachPlan[i].children[1].innerText;
            let description = eachPlan[i].children[2].innerText;
            let weekNumber = eachPlan[i].children[3].innerText;
            let planByDay = eachPlan[i].getAttribute('data-plan');

            let newPln = {
                id: weekNumber,
                weekPlanName: title,
                weekPlanDescription: description,
                weekPlanByDay: planByDay.split(','),
            };
            newPlans.push(newPln);
        }

        localStorage.setItem("plans", JSON.stringify(newPlans))

        if ((currentPlan === 0) && (plansLength > 1)) {
            localStorage.setItem("currentPlan", currentPlan)
        }else if((currentPlan === 0) && (plansLength = 1)){
            localStorage.removeItem("currentPlan")
        } else {
            localStorage.setItem("currentPlan", currentPlan - 1)
        };
    }

    //RECIPE EDIT

    allRecipes.on('click', '.fa-edit', function () {

        const thisEdit = $(this);
        const editableElement = thisEdit.parent().parent();
        const modal = $('.add_recipe_modal');
        const menuBlocker = $('#menu_blocker');

        modal.css('display', 'flex');

        let title = editableElement.find('#recipe_titles').text();
        let description = editableElement.find('p').text();
        let titleInput = modal.find('#recipe_name');
        let descriptionInput = modal.find('#recipe_description');
        let instructions = editableElement.attr('data-instructions').split(',');
        let ingridients = editableElement.attr('data-ingridients').split(',');

        titleInput.val(title);
        descriptionInput.val(description);

        for (let i = 0; i < instructions.length; i++) {
            let html = $(`<li><span>${instructions[i]}</span><i class="far fa-edit"></i><i class="fas fa-trash-alt"></i></li>`);
            $('#instructions_list').append(html);
        }
        for (let i = 0; i < ingridients.length; i++) {
            let html = $(`<li><span>${ingridients[i]}</span><i class="far fa-edit"></i><i class="fas fa-trash-alt"></i></li>`);
            $('#ingridients_list').append(html);
        }

        editableElement.remove();
        removeRecipeFromLocal();
        menuBlocker.css('display', 'block');

    });

    //PLAN EDIT

    allPlans.on('click', '.fa-edit', function () {
        const thisIcon = $(this);
        const editableElement = thisIcon.parent().parent();
        const modal = $('.add_plan_modal');
        const menuBlocker = $('#menu_blocker');

        const planName = editableElement.children().eq(1).text();
        const planDescription = editableElement.children().eq(2).text();
        const planWeekNumber = editableElement.children().eq(3).text();
        const nameInput = modal.find('#plan_name');
        const descriptionInput = modal.find('#plan_description');
        const weekNumberInput = modal.find('#week_number');
        const select = modal.find('select');
        const planByDay = editableElement.attr('data-plan').split(',');

        modal.css('display', 'flex');
        nameInput.val(planName);
        descriptionInput.val(planDescription);
        weekNumberInput.val(planWeekNumber);
        for (let i = 0; i < select.length; i++) {
            select.eq(i).val(planByDay[i]);
        }
        editableElement.remove();
        removePlanFromLocal();
        menuBlocker.css('display', 'block');
    });
});