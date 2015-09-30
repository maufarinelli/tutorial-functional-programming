(function(_) {
    var utilities = {};

    utilities.map = function(list, callback) {
        var resultList = [];
        for(var i = 0; i < list.length; i++) {
            resultList.push(callback(list[i]));

        }
        return resultList;
    };

    /**
     * toClone 
     * @param {String} 2 strings as parameters: object or array
     * @return {Function} the right function to clone 
     */
    utilities.toClone = function() {
        if(arguments[0] === "object") {
            return function(obj) {
                var clone = {};
                for(var prop in obj)
                    if (obj.hasOwnProperty(prop))
                        clone[prop] = obj[prop];

                return clone;
            };
        }
        if(arguments[0] === "array") {
            return function(obj) {
                var arrayClone = [];
                for(var i = 0; i < obj.length; i++) {
                    arrayClone.push(obj);
                }
                return arrayClone;
            };
        }
    };

    // Data
    var cities = [
        {name: 'Nova York', passagem: 1550.00, hotel: 1800.00, category: 'north-america'},
        {name: 'Paris',     passagem: 1720.00, hotel: 2100.00, category: 'europe'},
        {name: 'Londres',   passagem: 1630.00, hotel: 2500.00, category: 'europe'},
        {name: 'Amsterdam', passagem: 1430.00, hotel: 1750.00, category: 'europe'},
        {name: 'Santiago',  passagem: 600.00,  hotel: 1150.00, category: 'south-america'},
        {name: 'Buenos Aires', passagem: 520.00, hotel: 950.00, category: 'south-america'},
        {name: 'Barcelona', passagem: 1390.00, hotel: 1670.00, category: 'europe'},
        {name: 'Lisboa',    passagem: 1280.00, hotel: 1450.00, category: 'europe'},
        {name: 'Vancouver', passagem: 1590.00, hotel: 320.00, category: 'north-america'},
        {name: 'Roma',      passagem: 1400.00, hotel: 1950.00, category: 'europe'},
    ];

    var citiesWithPackages = utilities.map(cities, function(city) {
        if(typeof city.passagem !== 'undefined' && typeof city.hotel !== 'undefined') {
            var clone = utilities.toClone("object");
            var city = clone(city);
            city.pacote = (city.passagem + city.hotel) * 0.8;
        }
        return city;
    });

    console.log("cities - 1 item: ", cities[0]);
    console.log("citiesWithPackages - 1 item  ", citiesWithPackages[0]);



    //DOM manipulation
    var travelBoard = document.getElementById('travel-board'),
        filterButtons = document.querySelector('.continents-filter').querySelectorAll('li');



    // Templating
    var template, 
        compiled;
    function getTemplate() {
        return _.template('<% _.forEach(data, function(city) { %>'+
            '<li class="col-xs-4">'+ 
                '<div class="list-group-item">'+
                    '<h4 class="list-group-item-heading"><%- city.name %></h4>'+
                    '<p class="list-group-item-text">Passagem: R$ <%- city.passagem %></p>'+
                    '<p class="list-group-item-text">Hotel: R$ <%- city.hotel %></p>'+
                    '<p class="list-group-item-text">Pacote completo: R$ <%- city.pacote %></p>'+
                '</div>'+
            '</li>'+
        '<% }); %>');
    }

    function compileTemplate(template, list) {
        return template({data: list});
    }

    function appendTemplateToDOM() {
        travelBoard.innerHTML = compiled;
    }



    // Filter Buttons
    function clearAllFilterButtons() {
        for(var i = 0; i < filterButtons.length; i++) {
            filterButtons[i].setAttribute('class', '');
        }
    }

    function activateSelectedFilterButton(selectedElement) {
        selectedElement.setAttribute('class', 'active');
    }



    // Filter Results as a List 
    function getFilteredList(category) {
        var filteredList = [];

        if(category === 'all') {
            return cities;
        }

        for(var i = 0; i < cities.length; i++) {
            if(cities[i].category === category) {
                filteredList.push(cities[i]);
            }
        }
        return filteredList;
    }

    function filterList(event) {
        var filterSelected = event.currentTarget,
            continent = filterSelected.getAttribute('data-category'),
            filteredList = [];

        // Active nav-pills
        clearAllFilterButtons();
        activateSelectedFilterButton(filterSelected);

        // Get filtered list
        filteredList = getFilteredList(continent);

        // Compile and append new templato to the DOM
        compiled = compileTemplate(template, filteredList);
        appendTemplateToDOM();
    }



    // Bind events
    function addListenersFiltersClick() {
        for(var i = 0; i < filterButtons.length; i++) {
            filterButtons[i].addEventListener('click', filterList);
        }
    }
     


    // Initialize app
    function init() {
        template = getTemplate();

        compiled = compileTemplate(template, citiesWithPackages);
        appendTemplateToDOM();

        addListenersFiltersClick();
    }
    init();

})(window._)

