console.log("Welcome to the JS Event Organizer!");

class Event {
    constructor(id, name, access = 0) {
        this.id = id;
        this.name = name;
        this.access = access;
        this.clients = [];
    }
}

class Client {
    constructor(id, name, gender, age) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
}

function createEvent(name, access) {
    if (name == '' || name == null) {
        console.log('You must enter a name in order to create an event.');
        return;
    }
    if (!Number.isInteger(access)) {
        console.log('Access must be 1(18+) or 0(for all)');
        return;
    }
    let events = [];

    if (localStorage.getItem('events') == null || localStorage.getItem('events') == '[]') {
        let id = 1;
        let event = new Event(id, name, access);
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    } else {
        let id = JSON.parse(localStorage.getItem('events')).pop().id + 1;
        let event = new Event(id, name, access);
        JSON.parse(localStorage.getItem('events')).forEach(function (item) {
            events.push(item);
        });
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }

    console.log('New event has been created.');

}

function getEvents() {
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
    if (!Number.isInteger(eventId)) {
        console.log('Event id must be number.');
        return;
    }
    if (localStorage.getItem('events') != null) {
        let events = getEvents();
        let event = {};
        events.forEach(function (el) {
            if (el.id == eventId) {
                event = el;
            }
        });
        return event;
    } else {
        console.log('No events in list');
    }
}

function showEvents() {
    if (localStorage.getItem('events') == null) {
        console.log('No events available!');
    } else {
        console.log('Events list: ');
        getEvents().forEach(function (item) {
            console.log('----- Event ' + item.id + ' -----');
            console.log('Name: ' + item.name);
            if (item.access == 0) {
                console.log('Accessible for all.');
            } else {
                console.log('Accessible for 18+.');
            }
            if (item.clients == '') {
                console.log('No clients for this event.');
            } else {
                console.log('--- Clients ---');
                // console.log(item.clients);
                showEventsClientsList(item.id);
            }
            // console.log('-------')
        });
    }
}

function removeEvent(id) {
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
        if (el.id != id) {
            elements.push(el);
        }
    });
    localStorage.setItem('events', JSON.stringify(elements));
    console.log('Event ' + id + ' has been deleted.');

}

function updateEvent(id, name, access = 0) {
    if (id == '' || id == null) {
        console.log('You must enter an id in order to update an event');
        return;
    }
    if (name == '' || name == null) {
        console.log('You must enter a name in order to update an event.');
        return;
    }
    if (!Number.isInteger(id)) {
        console.log('Event id must be number.');
        return;
    }
    let events = getEvents();
    events.forEach(function (event) {
        if (event.id == id) {
            // console.log(event);
            // console.log(typeof event);
            event.name = name;
            if (access != '' || access != null) {
                event.access = access;
            }
        }
    });
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(events));

    console.log('Event ' + id + ' has been updated');

}

function createClient(name, gender, age) {
    if (name == '' || name == null) {
        console.log('You must enter a name in order to create a client.');
        return;
    }
    if (gender == '' || gender == null) {
        console.log('You must enter gender in order to create a client.');
        return;
    }
    if (age == '' || age == null) {
        console.log('You must enter an age in order to create a client.');
        return;
    }
    if (!Number.isInteger(age)) {
        console.log('Age value must be a number');
        return;
    }

    let clients = [];
    if (localStorage.getItem('clients') == null) {
        let id = 1;
        let client = new Client(id, name, gender, age);
        clients.push(client);
        localStorage.setItem('clients', JSON.stringify(clients));
    } else {
        let id = JSON.parse(localStorage.getItem('clients')).pop().id + 1;
        let client = new Client(id, name, gender, age);
        JSON.parse(localStorage.getItem('clients')).forEach(function (item) {
            clients.push(item);
        });
        clients.push(client);
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    console.log('New client has been created.');
}

function getClients() {
    if (localStorage.getItem('clients') != null) {
        let clients = [];
        JSON.parse(localStorage.getItem('clients')).forEach(function (client) {
            clients.push(client);
        });
        return clients;
    }
}

function getClientById(clientId) {
    if (!Number.isInteger(clientId)) {
        console.log('Client id must be number.');
        return;
    }
    if (localStorage.getItem('clients') != null) {
        let clients = getClients();
        let client = {};
        clients.forEach(function (el) {
            if (el.id == clientId) {
                client = el;
            }
        });
        return client;
    } else {
        console.log('No clients in list');
    }
}

function showClients() {
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
        // console.log('-------')
    });
}

function removeClient(id) {
    if (localStorage.getItem('clients') == null) {
        console.log('No clients to delete!');
        return;
    }
    if (!Number.isInteger(id)) {
        console.log('Client id must be integer.');
        return;
    }
    // isValueInteger(id);
    let clients = [];
    getClients().forEach(function (item) {
        clients.push(item);
    });
    let elements = [];
    clients.forEach(function (el) {
        if (el.id != id) {
            elements.push(el);
        }
    });
    localStorage.setItem('clients', JSON.stringify(elements));
    console.log('Client ' + id + ' has been deleted.');

}

function updateClient(id, name, gender, age) {
    if (id == '' || id == null) {
        console.log('You must enter an id in order to update a client.');
        return;
    }
    if (name == '' || name == null) {
        console.log('You must enter a name in order to update a client.');
        return;
    }
    if (gender == '' || gender == null) {
        console.log('You must enter a gender in order to update a client.');
        return;
    }
    if (age == '' || age == null) {
        console.log('You must enter an age in order to update a client.');
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

    let clients = getClients();
    clients.forEach(function (client) {
        if (client.id == id) {
            client.name = name;
            client.gender = gender;
            client.age = age;
        }
    });
    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(clients));

    console.log('Client ' + id + ' has been updated');
}


function addClientToEvent(eventId, clientId) {
    if (eventId == '' || eventId == null) {
        console.log('Event id must be entered.');
        return;
    }
    if (clientId == '' || clientId == null) {
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

    let events = getEvents();
    let error = 0;
    events.forEach(function (el) {
        if (el.id == eventId) {
            el.clients.forEach(function (cl) {
                if (cl.id == clientId) {
                    console.log('Player has been added to the list already.');
                    error++;
                }
            });
            if (el.access == 1 && client.age < 18) {
                console.log('Event not suitable for this client. Will not be added.');
                error++;
            }
            el.clients.push(client);
        }
    });
    if (error = 0) {
        console.log('Client with id = ' + clientId + ' has been added to event with id = ' + eventId);
        localStorage.setItem('events', JSON.stringify(events));
    }
}

function removeClientFromEvent(eventId, clientId) {
    if (eventId == '' || eventId == null) {
        console.log('Event id must be entered.');
        return;
    }
    if (clientId == '' || clientId == null) {
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

    // console.log(getEvents());
    // let event = getEventById(eventId);
    // let client = getClientById(clientId);
    let clients = [];
    let newEvents = [];
    getEvents().forEach(function (el) {
        if (el.id == eventId) {
            for (let client of event.clients) {
                if (client.id != clientId) {
                    clients.push(client);
                }
            }
        } else {
            newEvents.push(el);
        }

    });

    event.clients = {};
    event.clients = clients;
    newEvents.push(event);
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(newEvents));
}

function showEventsClientsList(eventId, gender = 0) {
    if (!Number.isInteger(eventId)) {
        console.log('Event id must be a number.');
        return;
    }
    let event = getEventById(eventId);
    if (isEmpty(event)) {
        console.log('No event with id = ' + eventId);
        return;
    }
    if (gender != 0) {
        event.clients.forEach(function (client) {
            if (client.gender == gender) {
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
        // console.log(client);
        console.log('Client ' + client.id);
        console.log('Name: ' + client.name);
        console.log('Gender: ' + client.gender);
        console.log('Age: ' + client.age);
        console.log('-------')
    });
    // console.log(event.clients);
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