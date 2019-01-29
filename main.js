console.log("Welcome to the JS Event Organizer!");
let switchOrganizer = true;

if (!switchOrganizer) {
    console.log('Organizer has been switched off. In order to use it, please switch it on first.')
}

function switchOrganizerFunc(switchOrg) {
    switchOrganizer = switchOrg;
    if(switchOrg === true){
        console.log('Organizer has been switched on. You can use all available functionalities.');
    } else {
        console.log('Organizer has been switched off. In order to use it, please switch it on first.')
    }
}

function switchedOffOrganizerMessage() {
    console.log('Organizer switched off. All functionality not available until switched on.')
}

class Event {
    constructor(id, name, access = 0, price = 0) {
        this.id = id;
        this.name = name;
        this.access = access;
        this.clients = [];
        this.price = price;
        this.dateCreated = new Date(Date.now()).toLocaleString();
        this.dateUpdated = new Date(Date.now()).toLocaleString();
        this.archieve = 0;
        this.income = 0;
        this.rating = 0;
        this.points = 0;
        this.clientsRated = 0;
    }
}

class Client {
    constructor(id, name, gender, age, wallet) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.wallet = wallet;
        this.events = [];
        this.vip = 0;
    }
}

function createEvent(name, access, price) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (name === '' || name == null) {
        console.log('You must enter a name in order to create an event.');
        return;
    }
    // if ((access !== '' || access != null) && !Number.isInteger(access)) {
    //     console.log('Access must be 1(18+) or 0(for all)');
    //     return;
    // }
    // if ((price !== '' || price != null) && !Number.isInteger(price)) {
    //     console.log('Price must be a number.');
    //     return;
    // }
    let events = [];

    if (localStorage.getItem('events') == null || localStorage.getItem('events') === '[]') {
        let id = 1;
        let event = new Event(id, name, access, price);
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    } else {
        let id = JSON.parse(localStorage.getItem('events')).pop().id + 1;
        let event = new Event(id, name, access, price);
        JSON.parse(localStorage.getItem('events')).forEach(function (item) {
            events.push(item);
        });
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }

    console.log('New event has been created.');

}

function getEvents() {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (localStorage.getItem('events') != null) {
        let events = [];
        JSON.parse(localStorage.getItem('events')).forEach(function (event) {
            events.push(event);
        });
        return events;
    } else {
        console.log('No events in list');
    }
}

function getEventById(eventId) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (!Number.isInteger(eventId)) {
        console.log('Event id must be number.');
        return;
    }
    if (localStorage.getItem('events') != null) {
        let events = getEvents();
        let event = {};
        events.forEach(function (el) {
            if (el.id === eventId) {
                event = el;
            }
        });
        return event;
    } else {
        console.log('No events in list');
    }
}

function showEvents() {
    let archieve = arguments[0];
    // console.log(archieve);
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (localStorage.getItem('events') == null) {
        console.log('No events available!');
        return;
    }
    console.log('Events list: ');
    getEvents().forEach(function (item) {
        if(archieve === undefined || archieve === ''){
            // console.log(archieve);
            // console.log(item);
            printEvents(item);
        } else {
            if(item.archieve === archieve){
                printEvents(item);
            }
        }
        // console.log('----- Event ' + item.id + ' -----');
        // let nameValue = 'Name: ' + item.name;
        // if (item.archieve === 1) {
        //     nameValue = addSpecialSymbol('~', nameValue);
        // }
        // if (item.price === 0 || item.price === '' || item.price === undefined) {
        //     nameValue = addSpecialSymbol('!', nameValue);
        // } else {
        //     nameValue = addSpecialSymbol('$', nameValue);
        // }
        // if (item.access === 1) {
        //     nameValue = addSpecialSymbol('*', nameValue);
        // } else {
        //     nameValue = addSpecialSymbol('#', nameValue);
        // }
        // console.log(nameValue);
        // if (item.access === 0) {
        //     console.log('Accessible for all.');
        // } else {
        //     console.log('Accessible for 18+.');
        // }
        // console.log('Price: ', item.price);
        // if (item.clients === '') {
        //     console.log('No clients for this event.');
        // } else {
        //     console.log('--- Clients ---');
        //     showEventsClientsList(item.id);
        // }
        // console.log('Creation date: ' + item.dateCreated);
        // console.log('Last update: ' + item.dateUpdated);
        // // console.log('-------')
    });

}

function removeEvent(id) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (localStorage.getItem('events') == null) {
        console.log('No events to delete!');
        return;
    }
    if (!Number.isInteger(id)) {
        console.log('Event id mus be number.');
        return;
    }
    let events = [];
    getEvents().forEach(function (item) {
        events.push(item);
    });
    let elements = [];
    events.forEach(function (el) {
        // console.log(item.id);
        if (el.id !== id) {
            elements.push(el);
        }
    });
    localStorage.setItem('events', JSON.stringify(elements));
    console.log('Event ' + id + ' has been deleted.');

}

function updateEvent(id, name, access = 0, price = 0) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (id === '' || id == null) {
        console.log('You must enter an id in order to update an event');
        return;
    }
    if (name === '' || name == null) {
        console.log('You must enter a name in order to update an event.');
        return;
    }
    if (!Number.isInteger(id)) {
        console.log('Event id must be number.');
        return;
    }
    if (!Number.isInteger(access)) {
        console.log('Access must be 1(18+) or 0(for all).');
        return;
    }
    if (!Number.isInteger(price)) {
        console.log('Price must be a number.');
        return;
    }

    let events = getEvents();
    events.forEach(function (event) {
        if (event.id === id) {
            // console.log(event);
            // console.log(typeof event);
            event.name = name;
            if (access !== '' || access != null) {
                event.access = access;
            }
            if (price !== '' || price != null) {
                event.price = price;
            }
            event.dateUpdated = new Date(Date.now()).toLocaleString();
        }
    });
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(events));

    console.log('Event ' + id + ' has been updated');

}

function createClient(name, gender, age, wallet) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (name === '' || name == null) {
        console.log('You must enter a name in order to create a client.');
        return;
    }
    if (gender === '' || gender == null) {
        console.log('You must enter gender in order to create a client.');
        return;
    }
    if (age === '' || age == null) {
        console.log('You must enter an age in order to create a client.');
        return;
    }
    if (wallet === '' || wallet == null) {
        console.log('You must enter wallet money in order to create a client.');
        return;
    }
    if (!Number.isInteger(age)) {
        console.log('Age value must be a number');
        return;
    }
    if (!Number.isInteger(wallet)) {
        console.log('Wallet money value must be a number');
        return;
    }

    let clients = [];
    if (localStorage.getItem('clients') == null) {
        let id = 1;
        let client = new Client(id, name, gender, age, wallet);
        clients.push(client);
        localStorage.setItem('clients', JSON.stringify(clients));
    } else {
        let id = JSON.parse(localStorage.getItem('clients')).pop().id + 1;
        let client = new Client(id, name, gender, age, wallet);
        JSON.parse(localStorage.getItem('clients')).forEach(function (item) {
            clients.push(item);
        });
        clients.push(client);
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    console.log('New client has been created.');
}

function getClients() {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (localStorage.getItem('clients') != null) {
        let clients = [];
        JSON.parse(localStorage.getItem('clients')).forEach(function (client) {
            clients.push(client);
        });
        return clients;
    }
}

function getClientById(clientId) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (!Number.isInteger(clientId)) {
        console.log('Client id must be number.');
        return;
    }
    if (localStorage.getItem('clients') != null) {
        let clients = getClients();
        let client = {};
        clients.forEach(function (el) {
            if (el.id === clientId) {
                client = el;
            }
        });
        return client;
    } else {
        console.log('No clients in list');
    }
}

function showClients() {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (localStorage.getItem('clients') == null) {
        console.log('No clients!');
        return;
    }
    console.log('Clients list: ');
    getClients().forEach(function (item) {
        console.log('Client ' + item.id);
        console.log('Name: ' + item.name);
        console.log('Gender: ' + item.gender);
        console.log('Age: ' + item.age);
        console.log('Wallet money: ' + item.wallet);
        // console.log('-------')
    });
}

function removeClient(id) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (localStorage.getItem('clients') == null) {
        console.log('No clients to delete!');
        return;
    }
    if (!Number.isInteger(id)) {
        console.log('Client id must be integer.');
        return;
    }
    let clients = [];
    getClients().forEach(function (item) {
        clients.push(item);
    });
    let elements = [];
    clients.forEach(function (el) {
        if (el.id !== id) {
            elements.push(el);
        }
    });
    localStorage.setItem('clients', JSON.stringify(elements));
    console.log('Client ' + id + ' has been deleted.');

}

function updateClient(id, name, gender, age, wallet) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (id === '' || id == null) {
        console.log('You must enter an id in order to update a client.');
        return;
    }
    if (name === '' || name == null) {
        console.log('You must enter a name in order to update a client.');
        return;
    }
    if (gender === '' || gender == null) {
        console.log('You must enter a gender in order to update a client.');
        return;
    }
    if (age === '' || age == null) {
        console.log('You must enter an age in order to update a client.');
        return;
    }
    if (wallet === '' || wallet == null) {
        console.log('You must enter wallet money in order to create a client.');
        return;
    }
    if (!Number.isInteger(id)) {
        console.log('Client id must be a number.');
        return;
    }
    if (!Number.isInteger(age)) {
        console.log('Age must be a number.');
        return;
    }
    if (!Number.isInteger(wallet)) {
        console.log('Wallet money must be a number.');
        return;
    }

    let clients = getClients();
    clients.forEach(function (client) {
        if (client.id === id) {
            client.name = name;
            client.gender = gender;
            client.age = age;
            client.wallet = wallet;
        }
    });
    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(clients));

    console.log('Client ' + id + ' has been updated');
}


function addClientToEvent(eventId, clientId) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (eventId === '' || eventId == null) {
        console.log('Event id must be entered.');
        return;
    }
    if (clientId === '' || clientId == null) {
        console.log('Client id must be entered.');
        return;
    }
    if (!Number.isInteger(eventId)) {
        console.log('Event id must be a number.');
        return;
    }
    if (!Number.isInteger(clientId)) {
        console.log('Client id must be a number.');
        return;
    }

    let event = getEventById(eventId);
    let client = getClientById(clientId);
    if (isEmpty(client)) {
        console.log('No client with id = ' + clientId);
        return;
    }
    if (isEmpty(event)) {
        console.log('No event with id = ' + eventId);
        return;
    }

    if(event.archieve === 1){
        console.log('Event archieved. Clients cannot be added anymore.');
        return;
    }

    if(client.wallet < event.price){
        console.log('Client doesn\'t have enough money to attend the event.');
        return;
    }

    let events = getEvents();
    let error = 0;
    events.forEach(function (el) {
        if (el.id === eventId) {
            el.clients.forEach(function (cl) {
                if (cl.id === clientId) {
                    console.log('Player has been added to the list already.');
                    error++;
                    return;
                }
                error = 0;
            });
            if (el.access === 1 && client.age < 18) {
                console.log('Event not suitable for this client. Will not be added.');
                error++;
                return;
            }
            if(client.vip === 0){
                el.income += el.price;
            }
            el.clients.push(client);
        }
    });
    if (error === 0) {
        let clients = getClients();
        if(client.vip == 1 ){
            // console.log('vip');
            clients.forEach(function (cl) {
                if (cl.id === clientId) {
                    cl.vip = 0;
                    cl.events.push(event);
                }
            });
        } else {
            // console.log('not vip');
            clients.forEach(function (cl) {
                if (cl.id === clientId) {
                    cl.wallet = client.wallet - event.price;
                    cl.events.push(event);
                    if(cl.events.length % 6 == 5){
                        cl.vip = 1;
                    } else  {
                        cl.vip = 0;
                    }
                }
            });
        }
        localStorage.removeItem('clients');
        localStorage.setItem('clients', JSON.stringify(clients));
        console.log('Client with id = ' + clientId + ' has been added to event with id = ' + eventId);
        localStorage.setItem('events', JSON.stringify(events));
    }
}

function removeClientFromEvent(eventId, clientId) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (eventId === '' || eventId == null) {
        console.log('Event id must be entered.');
        return;
    }
    if (clientId === '' || clientId == null) {
        console.log('Client id must be entered.');
        return;
    }
    if (!Number.isInteger(eventId)) {
        console.log('Event id must be number.');
        return;
    }
    if (!Number.isInteger(clientId)) {
        console.log('Client id must be number.');
        return;
    }

    let event = getEventById(eventId);
    let client = getClientById(clientId);
    if (isEmpty(client)) {
        console.log('No client with id = ' + clientId);
        return;
    }
    if (isEmpty(event)) {
        console.log('No event with id = ' + eventId);
        return;
    }

    let clients = [];
    let newEvents = [];
    getEvents().forEach(function (el) {
        if (el.id === eventId) {
            for (let client of event.clients) {
                if (client.id !== clientId) {
                    clients.push(client);
                }
            }
        }
    });

    event.clients = {};
    event.clients = clients;

    getEvents().forEach(function (el) {
        if (el.id === eventId) {
            newEvents.push(event);
        } else {
            newEvents.push(el);
        }
    });

    console.log(newEvents);


    let events = [];
    let newClients = [];
    getClients().forEach(function (cl) {
        if (cl.id === clientId) {
            for (let event of client.events) {
                if (event.id !== eventId) {
                    events.push(event);
                }
            }
        }
    });

    client.events = {};
    client.events = events;
    getClients().forEach(function (cl) {
        if (cl.id === clientId) {
            newClients.push(client);
        } else {
            newClients.push(cl);
        }
    });

    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(newEvents));

    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(newClients));
}

function showEventsClientsList(eventId, gender = 0) {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (!Number.isInteger(eventId)) {
        console.log('Event id must be a number.');
        return;
    }
    let event = getEventById(eventId);
    if (isEmpty(event)) {
        console.log('No event with id = ' + eventId);
        return;
    }
    if(event.clients.length < 1){
        console.log('Event doesn\'t have any clients');
        return;
    }
    if (gender !== 0) {
        event.clients.forEach(function (client) {
            if (client.gender === gender) {
                console.log('Client ' + client.id);
                console.log('Name: ' + client.name);
                console.log('Gender: ' + client.gender);
                console.log('Age: ' + client.age);
                console.log('-------')
            }
        });
        return;
    }
    event.clients.forEach(function (client) {
        console.log('Client ' + client.id);
        console.log('Name: ' + client.name);
        console.log('Gender: ' + client.gender);
        console.log('Age: ' + client.age);
        console.log('-------')
    });
}

function getEventWithMostClients() {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    let events = getEvents();
    if (localStorage.getItem('events') == null) {
        console.log('No events available.');
        return;
    }
    let maxClientCount = events[0].clients.length;
    events.forEach(function (event) {
        if (event.clients.length > maxClientCount) {
            maxClientCount = event.clients.length;
        }
    });
    console.log('Event(s) with most clients: ');
    events.forEach(function (event) {
        if (event.clients.length === maxClientCount) {
            console.log('\'' + event.name + '\' has ' + maxClientCount + ' clients.');
        }
    });
    // console.log(maxClientCount);
}

function getEventsForUnderEighteen() {
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    let events = getEvents();
    if (localStorage.getItem('events') == null) {
        console.log('No events available.');
        return;
    }
    console.log('Events suitable for people below 18: ');
    events.forEach(function (event) {
        if (event.access === 0) {
            console.log(event.name);
        }
    });
}

function archieveEvent(eventId){
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    let event = getEventById(eventId);
    let events = getEvents();
    events.forEach(function (event) {
        if(event.id === eventId){
            event.archieve = 1;
        }
    });
    // console.log(events);
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(events));
    console.log('Event \'' + event.name + '\' archieved.');
}

function rateEvent(eventId, clientId, points){
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }
    if (eventId === '' || eventId == null) {
        console.log('Event id must be entered.');
        return;
    }
    if (clientId === '' || clientId == null) {
        console.log('Client id must be entered.');
        return;
    }
    if (points === '' || points == null) {
        console.log('Points must be entered.');
        return;
    }
    if (!Number.isInteger(eventId)) {
        console.log('Event id must be a number.');
        return;
    }
    if (!Number.isInteger(clientId)) {
        console.log('Client id must be a number.');
        return;
    }

    if (!Number.isInteger(points)) {
        console.log('Points must be a number.');
        return;
    } else if(points < 1 || points > 10){
        console.log('Invalid number of points.');
        return;
    }

    let event = getEventById(eventId);
    let client = getClientById(clientId);
    if (isEmpty(client)) {
        console.log('No client with id = ' + clientId);
        return;
    }
    if (isEmpty(event)) {
        console.log('No event with id = ' + eventId);
        return;
    }
    if (event.archieve == 0) {
        console.log('Active events cannot be rated.');
        return;
    }
    let exists = false;
    event.clients.forEach(function (eventClient) {
        if(eventClient.id === clientId){
            exists = true;
            // eventClient.points += points;
        }
    });

    if(!exists){
        console.log('Client cannot rate event they hadn\'t attended.');
        return;
    }


    let events = getEvents();
    events.forEach(function (ev) {
        if(ev.id === eventId){
            // let clientsCount = ev.clients.length;
            ev.points += points;
            ev.clientsRated++;
            // console.log(ev.clientsRated);
            // console.log(ev.points);
            ev.rating = calculateRating(ev.clientsRated, ev.points);
        }

    });
    console.log(events);
    // console.log(events);
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(events));

}

function calculateRating(clientsCount, points){
    return (6 * points) / (10 * clientsCount);
}

function printEvents(item){
    console.log('----- Event ' + item.id + ' -----');
    let nameValue = 'Name: ' + item.name;
    if (item.archieve === 1) {
        nameValue = addSpecialSymbol('~', nameValue);
    }
    if (item.price === 0 || item.price === '' || item.price === undefined) {
        nameValue = addSpecialSymbol('!', nameValue);
    } else {
        nameValue = addSpecialSymbol('$', nameValue);
    }
    if (item.access === 1) {
        nameValue = addSpecialSymbol('*', nameValue);
    } else {
        nameValue = addSpecialSymbol('#', nameValue);
    }
    console.log(nameValue);
    if (item.access === 0) {
        console.log('Accessible for all.');
    } else {
        console.log('Accessible for 18+.');
    }
    console.log('Price: ', item.price);
    if (item.clients === '' || item.clients.length < 1) {
        console.log('No clients for this event.');
    } else {
        console.log('--- Clients ---');
        showEventsClientsList(item.id);
    }
    console.log('Creation date: ' + item.dateCreated);
    console.log('Last update: ' + item.dateUpdated);
    if (item.archieve === 0 && item.clientsRated === 0){
        console.log('Event is still active. Rating will be announced soon.');
    } else {
        console.log('Rating: ' + item.rating);
    }
}


function isEmpty(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key))
            return false;
    }
    return true;
}

function isValueInteger(value) {
    if (!Number.isInteger(value)) {
        console.log('Must be a number.');
    }
}

function addSpecialSymbol(symbol, message) {
    return symbol + message;
}
