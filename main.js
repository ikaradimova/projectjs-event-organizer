console.log("Welcome to the JS Event Organizer!");

/**
 * variable for switching on and off the app.
 */
let switchOrganizer = true;

/**
 * const messages
 * @type {string}
 */
const noEventsAvailable = `No events available!`;
const noClientsAvailable = `No clients available!`;
const noNameInserted = `You must enter a name.`;
const noEventIdInserted = `You must enter an event id.`;
const noClientIdInserted = `You must enter a client id.`;
const noGenderInserted = `You must enter a gender.`;
const noAgeInserted = `You must enter age.`;
const noWalletInserted = `You must enter a wallet.`;
const noPointsInserted = `You must enter points.`;
const accessWarning = `Access must be 1(18+) or 0(for all)`;
const priceWarning = `Price must be a number.`;
const eventIdWarning = `Event id must be a number.`;
const clientIdWarning = `Client id must be a number.`;
const ageWarning = `Age must be a number.`;
const walletWarning = `Wallet money must be a number.`;
const noEvent = `No event with this id.`;
const noClient = `No client with this id.`;

/**
 * function for switching on and off the organizer
 */
function switchOrganizerFunc(switchOrg) {
    switchOrganizer = switchOrg;
    if (switchOrg === true) {
        console.log(`Organizer has been switched on. You can use all available functionalities.`);
    } else {
        console.log(`Organizer has been switched off. In order to use it, please switch it on first.`);
    }
}

/**
 * Message if organizer has been switched  off.
 */
function switchedOffOrganizerMessage() {
    console.log(`Organizer switched off. All functionality not available until switched on.`);
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

/**
 * function for creating events
 * @param name
 * @param access
 * @param price
 */
function createEvent(name, access, price) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if mandatory fields are filled */
    if (checkMandatoryField(name) === false) {
        console.log(noNameInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkMandatoryField(access) !== false) && (checkIfNumber(access) === false)) {

        console.log(accessWarning);
        return;
    }
    if ((checkMandatoryField(price) !== false) && (checkIfNumber(price) === false)) {
        console.log(priceWarning);
        return;
    }

    /** creating events */
    let events = [];
    /** if no events in localStorage */
    if (localStorage.getItem('events') == null || localStorage.getItem('events') === '[]') {
        let id = 1;
        let event = new Event(id, name, access, price);
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
        /** if there are any events in localStorage */
    } else {
        let id = JSON.parse(localStorage.getItem('events')).pop().id + 1;
        let event = new Event(id, name, access, price);
        JSON.parse(localStorage.getItem('events')).forEach(function (item) {
            events.push(item);
        });
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }

    /** success message */
    console.log(`New event has been created.`);
}

/**
 * function for getting all events
 */
function getEvents() {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** get events */
    let events = [];
    JSON.parse(localStorage.getItem('events')).forEach(function (event) {
        events.push(event);
    });
    return events;
}

/**
 * function for getting a specific event by id
 * @param eventId
 */
function getEventById(eventId) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if mandatory fields are filled */
    if (checkMandatoryField(eventId) === false) {
        console.log(noEventIdInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(eventId) === false)) {
        console.log(eventIdWarning);
        return;
    }

    /** gets single event */
    let event = {};
    getEvents().forEach(function (el) {
        if (el.id === eventId) {
            event = el;
        }
    });
    if (isEmpty(event)){
        console.log(noEvent);
        return;
    }
    return event;
}

/**
 * function for showing all the events
 * if used with no parameters it returns all events
 * if parameter set to '1' returns all archieved events
 * if parameter set to '0' returns all active events
 */
function showEvents() {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if there are any events in the localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    let archieve = arguments[0];
    console.log('Events list: ');
    getEvents().forEach(function (item) {
        /** check which events to show */
        if (archieve === undefined || archieve === '') {
            /** shows all events */
            printEvents(item);
        } else {
            /** shows only active/archieved events */
            if (item.archieve === archieve) {
                printEvents(item);
            }
        }
    });
}

/**
 * function for deleting event by id
 * @param id
 */
function removeEvent(id) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if mandatory fields are filled */
    if (checkMandatoryField(id) === false) {
        console.log(noEventIdInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(id) === false)) {
        console.log(eventIdWarning);
        return;
    }

    /** check if event exists */
    if(isEmpty(id)){
        console.log(noEvent);
        return;
    }

    /** gets all events in localStorage */
    let events = [];
    getEvents().forEach(function (item) {
        events.push(item);
    });

    /** removes event which id is equal to the event to be deleted */
    let eventsAfterDeletion = [];
    events.forEach(function (el) {
        if (el.id !== id) {
            eventsAfterDeletion.push(el);
        }
    });

    /** push events back to localStorage */
    localStorage.setItem('events', JSON.stringify(eventsAfterDeletion));

    /** displays message after successful deletion */
    console.log(`Event ${id} has been deleted.`);
}

/**
 * function for updating event (general)
 * only id and name parameters are mantatory
 * @param id
 * @param name
 * @param access - by default is '0' which makes the event suitable for all clients (no age restrictions)
 * @param price - by default is '0' which makes it charity event
 */
function updateEvent(id, name, access = 0, price = 0) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if all mantadory fields are filled */
    if (checkMandatoryField(id) === false) {
        console.log(noEventIdInserted);
        return;
    }
    if (checkMandatoryField(name) === false) {
        console.log(noNameInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(id) === false)) {
        console.log(eventIdWarning);
        return;
    }
    if ((checkIfNumber(access) === false)) {
        console.log(accessWarning);
        return;
    }
    if ((checkIfNumber(price) === false)) {
        console.log(priceWarning);
        return;
    }

    /** getting all events from localStorage */
    let events = getEvents();
    events.forEach(function (event) {
        /** check for desired event */
        if (event.id === id) {
            /** update values */
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

    console.log(events);
    /** localStorage updates */
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(events));

    /** Success message */
    console.log(`Event ${id} has been updated`);
}

/**
 * function for creating a client
 * @param name
 * @param gender
 * @param age
 * @param wallet
 */
function createClient(name, gender, age, wallet) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(name) === false) {
        console.log(noNameInserted);
        return;
    }
    if (checkMandatoryField(gender) === false) {
        console.log(noGenderInserted);
        return;
    }
    if (checkMandatoryField(age) === false) {
        console.log(noAgeInserted);
        return;
    }
    if (checkMandatoryField(wallet) === false) {
        console.log(noWalletInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    /** gender not validated because everybody has the right to choose their own gender */
    if ((checkIfNumber(age) === false)) {
        console.log(ageWarning);
        return;
    }
    if ((checkIfNumber(wallet) === false)) {
        console.log(walletWarning);
        return;
    }

    /** creating new clients */
    let clients = [];
    if (localStorage.getItem('clients') == null) {
        /** if there are no clients in localStorage */
        let id = 1; // starts counting from 1
        let client = new Client(id, name, gender, age, wallet);
        clients.push(client);
        /** update localStorage */
        localStorage.setItem('clients', JSON.stringify(clients));
    } else {
        /** if there are some clients in localStorage */
        let id = JSON.parse(localStorage.getItem('clients')).pop().id + 1; // starts counting from the last id
        let client = new Client(id, name, gender, age, wallet);
        JSON.parse(localStorage.getItem('clients')).forEach(function (item) {
            clients.push(item);
        });
        clients.push(client);
        /** update localStorage */
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    /** success message */
    console.log(`New client has been created.`);
}


/**
 * function for getting all clients
 */
function getClients() {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** gets all clients */
    let clients = [];
    JSON.parse(localStorage.getItem('clients')).forEach(function (client) {
        clients.push(client);
    });
    return clients;
}

/**
 * function for getting a client by it's id
 * @param clientId
 */
function getClientById(clientId) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if mandatory fields are filled */
    if (checkMandatoryField(clientId) === false) {
        console.log(noClientIdInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(clientId) === false)) {
        console.log(clientIdWarning);
        return;
    }

    /** get client by id */
    let clients = getClients();
    let client = {};
    clients.forEach(function (el) {
        if (el.id === clientId) {
            client = el;
        }
    });
    return client;
}

/**
 * function for displaying all clients
 */
function showClients() {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** displaying clients */
    console.log(`Clients list: `);
    getClients().forEach(function (item) {
        console.log(`Client ${item.id}`);
        console.log(`Name: ${item.name}`);
        console.log(`Gender: ${item.gender}`);
        console.log(`Age: ${item.age}`);
        console.log(`Wallet money: ${item.wallet}`);
    });
}

/**
 * function for deleting client by it's id
 * @param id
 */
function removeClient(id) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(id) === false) {
        console.log(noClientIdInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(id) === false)) {
        console.log(clientIdWarning);
        return;
    }

    /** check if client with this id exists */
    if(isEmpty(id)){
        console.log(noClient);
        return;
    }

    /** gets all clients */
    let clients = [];
    getClients().forEach(function (item) {
        clients.push(item);
    });

    /** removes client with id equal to the client supposed to be deleted */
    let clientsAfterDeletion = [];
    clients.forEach(function (el) {
        if (el.id !== id) {
            clientsAfterDeletion.push(el);
        }
    });

    /** update localStorage */
    localStorage.setItem('clients', JSON.stringify(clientsAfterDeletion));

    /** success message */
    console.log(`Client ${id} has been deleted.`);
}

/**
 * function for updating client (general)
 * all parameters are mandatory
 * @param id
 * @param name
 * @param gender
 * @param age
 * @param wallet
 */
function updateClient(id, name, gender, age, wallet) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if mandatory fields are filled */
    if (checkMandatoryField(id) === false) {
        console.log(noClientIdInserted);
        return;
    }
    if (checkMandatoryField(name) === false) {
        console.log(noNameInserted);
        return;
    }
    if (checkMandatoryField(gender) === false) {
        console.log(noGenderInserted);
        return;
    }
    if (checkMandatoryField(age) === false) {
        console.log(noAgeInserted);
        return;
    }
    if (checkMandatoryField(wallet) === false) {
        console.log(noWalletInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(id) === false)) {
        console.log(clientIdWarning);
        return;
    }
    if ((checkIfNumber(age) === false)) {
        console.log(ageWarning);
        return;
    }
    if ((checkIfNumber(wallet) === false)) {
        console.log(walletWarning);
        return;
    }

    /** getting all clients */
    let clients = getClients();
    clients.forEach(function (client) {
        if (client.id === id) {
            /** updating client */
            client.name = name;
            client.gender = gender;
            client.age = age;
            client.wallet = wallet;
        }
    });

    /** localStorage update */
    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(clients));

    /** success message */
    console.log(`Client ${id} has been updated`);
}

/**
 * function for updating client's name by it's id
 * all parameters mandatory
 * @param id
 * @param name
 */
function updateClientName(id, name) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(id) === false) {
        console.log(noClientIdInserted);
        return;
    }
    if (checkMandatoryField(name) === false) {
        console.log(noNameInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(id) === false)) {
        console.log(clientIdWarning);
        return;
    }

    /** gets all clients */
    let clients = getClients();
    clients.forEach(function (client) {
        if (client.id === id) {
            /** update single client */
            client.name = name;
        }
    });

    /** localStorage update */
    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(clients));

    /** success message */
    console.log(`Client ${id} has been updated`);
}

/**
 * function for updating client's gender by it's id
 * all parameters are mandatory
 * @param id
 * @param gender
 */
function updateClientGender(id, gender) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(id) === false) {
        console.log(noClientIdInserted);
        return;
    }
    if (checkMandatoryField(gender) === false) {
        console.log(noGenderInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(id) === false)) {
        console.log(clientIdWarning);
        return;
    }

    /** gets all clients */
    let clients = getClients();
    clients.forEach(function (client) {
        if (client.id === id) {
            /** update single client */
            client.gender = gender;
        }
    });
    /**localStorage update */
    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(clients));

    /** success message */
    console.log(`Client ${id} has been updated`);
}

/**
 * function for updating client's age by it's id
 * all parameters are mandatory
 * @param id
 * @param age
 */
function updateClientAge(id, age) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(id) === false) {
        console.log(noClientIdInserted);
        return;
    }
    if (checkMandatoryField(age) === false) {
        console.log(noAgeInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(id) === false)) {
        console.log(clientIdWarning);
        return;
    }
    if ((checkIfNumber(age) === false)) {
        console.log(ageWarning);
        return;
    }

    /** gets all clients */
    let clients = getClients();
    clients.forEach(function (client) {
        if (client.id === id) {
            /** update single client */
            client.age = age;
        }
    });

    /** update localStorage */
    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(clients));

    /** success message */
    console.log(`Client ${id} has been updated`);
}

/**
 * function for updating client's wallet by it's id
 * all parameters are mandatory
 * @param id
 * @param wallet
 */
function updateClientWallet(id, wallet) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(id) === false) {
        console.log(noClientIdInserted);
        return;
    }
    if (checkMandatoryField(wallet) === false) {
        console.log(noWalletInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(id) === false)) {
        console.log(clientIdWarning);
        return;
    }
    if ((checkIfNumber(wallet) === false)) {
        console.log(walletWarning);
        return;
    }

    /** gets all clients */
    let clients = getClients();
    clients.forEach(function (client) {
        if (client.id === id) {
            /** single client update */
            client.wallet = wallet;
        }
    });
    /** localStorage update */
    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(clients));

    /** success message */
    console.log(`Client ${id} has been updated`);
}

/**
 * function for adding a client to an event
 * @param eventId
 * @param clientId
 */
function addClientToEvent(eventId, clientId) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(eventId) === false)) {
        console.log(eventIdWarning);
        return;
    }
    if ((checkIfNumber(clientId) === false)) {
        console.log(clientIdWarning);
        return;
    }

    let event = getEventById(eventId);
    let client = getClientById(clientId);

    /** check for archieved events */
    if (event.archieve === 1) {
        console.log(`Event archieved. Clients cannot be added anymore.`);
        return;
    }

    /** check if client has enough money to attend this event */
    if (client.wallet < event.price) {
        console.log(`Client doesn't have enough money to attend the event.`);
        return;
    }


    let events = getEvents();
    let error = 0;
    events.forEach(function (el) {
        if (el.id === eventId) {
            el.clients.forEach(function (cl) {
                /** check if client already in list */
                if (cl.id === clientId) {
                    console.log(`Player has been added to the list already.`);
                    error++;
                    return;
                }
                error = 0;
            });
            /** check if event suitable for client */
            if (el.access === 1 && client.age < 18) {
                console.log(`Event not suitable for this client. Will not be added.`);
                error++;
                return;
            }

            /** if client not vip increase income */
            if (client.vip === 0) {
                el.income += el.price;
            }
            el.clients.push(client);
        }
    });
    if (error === 0) {
        let clients = getClients();
        /** check if client vip */
        if (client.vip === 1) {
            clients.forEach(function (cl) {
                if (cl.id === clientId) {
                    cl.vip = 0; // change to not vip status
                    cl.events.push(event);
                }
            });
        } else {
            clients.forEach(function (cl) {
                if (cl.id === clientId) {
                    /** decreasing wallet money after player has signed for the event */
                    cl.wallet = client.wallet - event.price;
                    cl.events.push(event);
                    /** check if client has attented the amount of events needed to get a vip status */
                    if (cl.events.length % 6 === 5) {
                        cl.vip = 1;
                    } else {
                        cl.vip = 0;
                    }
                }
            });
        }
        /** update localStorage */
        localStorage.removeItem('clients');
        localStorage.setItem('clients', JSON.stringify(clients));
        localStorage.setItem('events', JSON.stringify(events));

        /** success message */
        console.log(`Client ${clientId} has been added to event ${eventId}`);
    }
}

/**
 * function for removing a client to an event that he/she has been added
 * @param eventId
 * @param clientId
 */
function removeClientFromEvent(eventId, clientId) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(eventId) === false) {
        console.log(noEventIdInserted);
        return;
    }
    if (checkMandatoryField(clientId) === false) {
        console.log(noClientIdInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(eventId) === false)) {
        console.log(eventIdWarning);
        return;
    }
    if ((checkIfNumber(clientId) === false)) {
        console.log(clientIdWarning);
        return;
    }

    let event = getEventById(eventId);
    let client = getClientById(clientId);

    /** gets all events */
    let clients = [];
    let newEvents = [];
    getEvents().forEach(function (el) {
        /** find event */
        if (el.id === eventId) {
            for (let client of event.clients) {
                /** remove client from event's list */
                if (client.id !== clientId) {
                    clients.push(client);
                }
            }
        }
    });

    event.clients = {};
    event.clients = clients;
    /** updated list of all events */
    getEvents().forEach(function (el) {
        if (el.id === eventId) {
            newEvents.push(event);
        } else {
            newEvents.push(el);
        }
    });

    /** get all clients */
    let events = [];
    let newClients = [];
    getClients().forEach(function (cl) {
        /** find client */
        if (cl.id === clientId) {
            for (let event of client.events) {
                /** remove event from client's list */
                if (event.id !== eventId) {
                    events.push(event);
                }
            }
        }
    });

    client.events = {};
    client.events = events;
    /** update list of all clients */
    getClients().forEach(function (cl) {
        if (cl.id === clientId) {
            newClients.push(client);
        } else {
            newClients.push(cl);
        }
    });

    /** update localStorage */
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(newEvents));

    localStorage.removeItem('clients');
    localStorage.setItem('clients', JSON.stringify(newClients));

    /** success message */
    console.log(`Client ${clientId} has been removed from event ${eventId}`);
}

/**
 * function for showing a list of the clients attending a certain event
 * @param eventId
 * @param gender - if no gender parameter it displays all clients, no matter the gender
 *                 if gender = 'male' only displays male clients
 *                 if gender = 'female' only displays female clients
 *                 if gender = something else, id shows the clients that belong to this gender, if any
 */
function showEventsClientsList(eventId, gender = 0) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if mandatory fields are filled */
    if (checkMandatoryField(eventId) === false) {
        console.log(noEventIdInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(eventId) === false)) {
        console.log(eventIdWarning);
        return;
    }

    /** check if event exists */
    let event = getEventById(eventId);
    if (isEmpty(event)) {
        console.log(`No event with id ${eventId}`);
        return;
    }

    /** check if event has clients */
    if (event.clients.length < 1) {
        console.log(`Event doesn't have any clients`);
        return;
    }

    /** gender check */
    if (gender !== 0) {
        /** if specified gender */
        event.clients.forEach(function (client) {
            if (client.gender === gender) {
                console.log(`Client ${client.id}`);
                console.log(`Name: ${client.name}`);
                console.log(`Gender: ${client.gender}`);
                console.log(`Age: ${client.age}`);
                console.log(`-------`)
            }
        });
        return;
    }
    /** if no gender specified show all */
    event.clients.forEach(function (client) {
        console.log(`Client ${client.id}`);
        console.log(`Name: ${client.name}`);
        console.log(`Gender: ${client.gender}`);
        console.log(`Age: ${client.age}`);
        console.log(`-------`)
    });
}

/**
 * function for getting the event with most clients
 * if events are more than one, displays all
 */
function getEventWithMostClients() {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** get event with max clients */
    let events = getEvents();
    let maxClientCount = events[0].clients.length;
    events.forEach(function (event) {
        if (event.clients.length > maxClientCount) {
            maxClientCount = event.clients.length;
        }
    });
    /** display list with all events with max clients */
    console.log(`Event(s) with most clients: `);
    events.forEach(function (event) {
        if (event.clients.length === maxClientCount) {
            console.log(`${event.name} has ${maxClientCount} clients.`);
        }
    });
}

/**
 * function for getting all events that are suitable for people under 18
 */
function getEventsForUnderEighteen() {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    let events = getEvents();
    /** display list with all events suitable for underage clients */
    console.log(`Events suitable for people below 18: `);
    events.forEach(function (event) {
        if (event.access === 0) {
            console.log(event.name);
        }
    });
}

/**
 * function for archieving event by it's id
 * @param eventId
 */
function archieveEvent(eventId) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(eventId) === false) {
        console.log(noEventIdInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(eventId) === false)) {
        console.log(eventIdWarning);
        return;
    }

    /** archieve event */
    let event = getEventById(eventId);
    let events = getEvents();
    events.forEach(function (event) {
        if (event.id === eventId) {
            event.archieve = 1;
        }
    });

    /** update localStorage */
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(events));

    /** success message */
    console.log(`${event.name} archieved.`);
}

/**
 * function for event rating
 * all fields mandatory
 * only archieved events can be rated
 * @param eventId
 * @param clientId
 * @param points
 */
function rateEvent(eventId, clientId, points) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if any clients in localStorage */
    if (checkAvailability('clients') === false) {
        console.log(noClientsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(eventId) === false) {
        console.log(noEventIdInserted);
        return;
    }
    if (checkMandatoryField(clientId) === false) {
        console.log(noClientIdInserted);
        return;
    }
    if (checkMandatoryField(points) === false) {
        console.log(noPointsInserted);
        return;
    }

    /** check if fields requiring numbers are receiving numbers */
    if ((checkIfNumber(eventId) === false)) {
        console.log(eventIdWarning);
        return;
    }
    if ((checkIfNumber(clientId) === false)) {
        console.log(clientIdWarning);
        return;
    }
    if ((checkIfNumber(points) === false)) {
        console.log(`Points must be a number.`);
        return;
        /** check if points given are from 1 do 10 */
    } else if (points < 1 || points > 10) {
        console.log(`Invalid number of points.`);
        return;
    }

    /** check if event archieved, as active ones cannot be rated */
    let client = getClientById(clientId);
    let event = getEventById(eventId);
    if (event.archieve === 0) {
        console.log(`Active events cannot be rated.`);
        return;
    }

    /** check if client has attended the event */
    let exists = false;
    event.clients.forEach(function (eventClient) {
        if (eventClient.id === clientId) {
            exists = true;
        }
    });

    if (!exists) {
        console.log(`Client cannot rate event they hadn't attended.`);
        return;
    }

    /** event update with new rating */
    let events = getEvents();
    events.forEach(function (ev) {
        if (ev.id === eventId) {
            ev.points += points;
            ev.clientsRated++;
            ev.rating = calculateRating(ev.clientsRated, ev.points); // calculating the rating
        }

    });
    /** update localStorage */
    localStorage.removeItem('events');
    localStorage.setItem('events', JSON.stringify(events));

    /** success message */
    console.log(`Event ${eventId} has been rated by ${points} by client ${clientId}.`);
}

/**
 * filter function
 * @param param -(name/access)
 * @param value - what to filter by
 *                if filtered by name - gets events which name contains the given value
 *                if filtered by access - gets events witch access is equal to the given value
 */
function filterFunc(param, value) {
    /** check if organizer is switched on */
    if (!switchOrganizer) {
        switchedOffOrganizerMessage();
        return;
    }

    /** check if any events in localStorage */
    if (checkAvailability('events') === false) {
        console.log(noEventsAvailable);
        return;
    }

    /** check if all mandatory fields are filled */
    if (checkMandatoryField(param) === false) {
        console.log(`Enter what you want to filter (name/access).`);
        return;
    }
    if (checkMandatoryField(value) === false) {
        console.log(`Enter what you want to filter by.`);
        return;
    }

    let events = getEvents();
    let filteredEvents = [];
    /** filter event's name by what it contains */
    if (param === 'name') {
        filteredEvents = events.filter(event => event.name.toLowerCase().includes(value.toLowerCase()));
        /** filter event's acces by given value */
    } else if (param === 'access') {
        filteredEvents = events.filter(event => event.access === value)
    } else {
        console.log(`You cannot filter ${param}`);
        return;
    }

    /** if no results */
    if (isEmpty(filteredEvents)){
        console.log(`No results.`);
        return;
    }
    filteredEvents.forEach(function (singleFilteredEvent) {
        printEvents(singleFilteredEvent);
    });
}

/**
 * function for calculating ratings
 * @param clientsCount - number of clients that has rated the event
 * @param points - sum of the points of all clients that rated the event
 * @returns {number}
 */
function calculateRating(clientsCount, points) {
    return (6 * points) / (10 * clientsCount);
}

/**
 * function for event details printing
 * @param item - single event
 */
function printEvents(item) {
    console.log(`----- Event ${item.id} -----`);
    let nameValue = `Name: ${item.name}`;
    /** archieve check */
    if (item.archieve === 1) {
        nameValue = addSpecialSymbol(`~`, nameValue); // Adds '~' if event is archieved
    }
    /** price check */
    if (item.price === 0 || item.price === '' || item.price === undefined) {
        nameValue = addSpecialSymbol(`!`, nameValue); // Adds '!' if event is free
    } else {
        nameValue = addSpecialSymbol(`$`, nameValue); // Adds '$' if event has price
    }
    /** access check */
    if (item.access === 1) {
        nameValue = addSpecialSymbol(`*`, nameValue); // Adds '*' if event is suitable for clients that are 18+
    } else {
        nameValue = addSpecialSymbol(`#`, nameValue); // Adds '#' if event is suitable for clients under 18
    }
    console.log(nameValue);
    /** access check */
    if (item.access === 0) {
        console.log(`Accessible for all.`);
    } else {
        console.log(`Accessible for 18+.`);
    }
    console.log(`Price: ${item.price}`);
    /** clients check */
    if (item.clients === '' || item.clients.length < 1) {
        console.log(`No clients for this event.`);
    } else {
        console.log(`--- Clients ---`);
        showEventsClientsList(item.id);
    }
    console.log(`Creation date: ${item.dateCreated}`);
    console.log(`Last update: ${item.dateUpdated}`);
    /** rate check */
    if (item.archieve === 0 && item.clientsRated === 0) {
        console.log(`Event is still active. Rating will be announced soon.`);
    } else {
        console.log(`Rating: ${item.rating}`);
    }
}

/**
 * checks if object is empty
 * @param object
 * @returns {boolean}
 */
function isEmpty(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * function for adding special symbols when printing specific events
 * @param symbol
 * @param message
 * @returns {*}
 */
function addSpecialSymbol(symbol, message) {
    return symbol + message;
}

/**
 * function for checking if there are any events/clients in the localStorage
 * @param item
 * @returns {boolean}
 */
function checkAvailability(item) {
    if (item === 'events') {
        if (localStorage.getItem('events') == null) {
            return false;
        }
    } else if (item === 'clients') {
        if (localStorage.getItem('clients') == null) {
            return false;
        }
    }
}

/**
 * function for checking if item exists
 * @param item
 * @returns {boolean}
 */
function checkMandatoryField(item) {
    if (item === '' || item == null || item === undefined) {
        return false;
    }
}

/**
 * checks if value is integer
 * @param value
 */
function checkIfNumber(value) {
    if (Number.isInteger(value) === false) {
        return false;
    }
}