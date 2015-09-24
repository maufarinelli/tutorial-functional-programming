(function(_) {
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

    for(var i = 0; i < cities.length; i++) {
        cities[i].pacote = (cities[i].passagem + cities[i].hotel) * 0.8;
    }

    // Initial state
    var template = _.template('<% _.forEach(cities, function(city) { %>'+
        '<li class="col-xs-4">'+ 
            '<div class="list-group-item">'+
                '<h4 class="list-group-item-heading"><%- city.name %></h4>'+
                '<p class="list-group-item-text">Passagem: R$ <%- city.passagem %></p>'+
                '<p class="list-group-item-text">Hotel: R$ <%- city.hotel %></p>'+
                '<p class="list-group-item-text">Pacote completo: R$ <%- city.pacote %></p>'+
            '</div>'+
        '</li>'+
    '<% }); %>'),
        compiled = template({cities: cities});

    var travelBoard = document.getElementById('travel-board');
    travelBoard.innerHTML = compiled;

    function clearAllFilterButtons() {
        for(var i = 0; i < filterButtons.length; i++) {
            filterButtons[i].setAttribute('class', '');
        }
    }

    function filterList(event) {
        var filterSelected = event.currentTarget,
            category = filterSelected.getAttribute('data-category'),
            filteredList = [];

        // Active nav-pills
        clearAllFilterButtons();
        filterSelected.setAttribute('class', 'active');

        if(category === 'all') {
            filteredList = cities;
        }
        else {
            for(var i = 0; i < cities.length; i++) {
                if(cities[i].category === category) {
                    filteredList.push(cities[i]);
                }
            }
        }

        compiled = template({cities: filteredList});
        travelBoard.innerHTML = compiled;
    }

    var filterButtons = document.querySelector('.continents-filter').querySelectorAll('li');
    for(var i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', filterList);
    }

})(window._)

