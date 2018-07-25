// Core
import Vue from 'vue'

// Additional Core
import Vuex from 'vuex'


// Impelement additional core
Vue.use(Vuex)

/* ======================== DECLARE CONSTANTA ========================  */

// general
// const _serviceUrl = "http://localhost:9004/web/"; // localhost
const _serviceUrl = "http://10.10.0.51:9014/web/"; // development
//const _serviceUrl = "http://localhost:9001/web/"; // production


const _longApplicationName = "Alam Sutera - Handover Customer";
const _shortApplicationName = "ASST";
const _sessionId = undefined;
const _accessId = undefined;
const _ipAddress = undefined; 
const _fullName = undefined;
const _company = undefined;
const _branch = undefined;
const _menus = [];
const _version = undefined;

// path
const _dashboard = "dashboard";
const _addresstype = "addresstype";
const _handover = "handover";

// timeout
const _otherTimeout = 0;
const _successTimeout = 3000;

// loader
const _fetchingLoader = "Fetching data ...";
const _savingLoader = "Saving data ...";
const _processingLoader = 'Processing data ...';

// data
const _withData = 1;
const _withoutData = 0;

// snackbar
const _withSnackBar = 1;
const _withoutSnackBar = 0;

// toolbar information
const _tasks = 0;
const _tickets = 0;
const _messages = 0;

/* ======================== EXPORT VUEX STORE ======================== */

export const store = new Vuex.Store({
    state: {
        // general
        serviceUrl: _serviceUrl,
        longApplicationName: _longApplicationName,
        shortApplicationName : _shortApplicationName,
        sessionId: _sessionId,
        accessId: _accessId,
        ipAddress: _ipAddress,
        fullName: _fullName,
        company: _company,
        branch: _branch,
        menus: _menus,
        version: _version,

        // path dashboard
        dashboard: _dashboard,
        // path master
        addresstype: _addresstype,

        //api
        handover: _handover,
        // path transaction

        // path report


        
        // timeout
        otherTimeout: _otherTimeout,
        successTimeout: _successTimeout,

        // loader
        fetchingLoader: _fetchingLoader,
        savingLoader: _savingLoader,
        processingLoader: _processingLoader,

        // data
        withData: _withData,
        withoutData: _withoutData,

        // snackbar
        withSnackBar: _withSnackBar,
        withoutSnackBar: _withoutSnackBar,

        // toolbar information
        tasks: _tasks,
        tickets: _tickets,
        messages: _messages
    },
    getters: {
        // general
        serviceUrl: (state) => {
            return state.serviceUrl;
        },
        longApplicationName: (state) => {
            return state.longApplicationName;
        },
        shortApplicationName: (state) => {
            return state.shortApplicationName;
        },
        sessionId: (state) => {
            return state.sessionId;
        },
        accessId: (state) => {
            return state.accessId;
        },
        ipAddress: (state) => {
            return state.ipAddress;
        },
        fullName: (state) => {
            return state.fullName;
        },
        company: (state) => {
            return state.company;
        },
        branch: (state) => {
            return state.branch;
        },
        menus: (state) => {
            return state.menus;
        },
        version: (state) => {
            return state.version;
        },

        // path dashboard
        dashboard: (state) => {
            return state.dashboard;
        },
        // path master
        addresstype: (state) => {
            return state.addresstype;
        },
        // path transaction

        // path report


        // timeout
        otherTimeout: (state) => {
            return state.otherTimeout;
        },
        successTimeout: (state) => {
            return state.successTimeout;
        },

        // loader
        fetchingLoader: (state) => {
            return state.fetchingLoader;
        },
        savingLoader: (state) => {
            return state.savingLoader;
        },
        processingLoader: (state) => {
            return state.processingLoader;
        },

        // data
        withData: (state) => {
            return state.withData;
        },
        withoutData: (state) => {
            return state.withoutData;
        },

        // snackbar
        withSnackBar: (state) => {
            return state.withSnackBar;
        },
        withoutSnackBar: (state) => {
            return state.withoutSnackBar;
        },

        // toolbar information
        tasks: (state) => {
            return state.tasks;
        },
        tickets: (state) => {
            return state.tickets;
        },
        messages: (state) => {
            return state.messages;
        },
    },
    mutations: {
        changeLongApplicationName: (state, value) => {
            state.longApplicationName = value;
        },
        changeTasks: (state, value) => {
            state.tasks = value;
        },
        changeTickets: (state, value) => {
            state.tickets = value;
        },
        changeMessages: (state, value) => {
            state.messages = value;
        },
        changeSessionId: (state, value) => {
            state.sessionId = value;
        },
        changeAccessId: (state, value) => {
            state.accessId = value;
        },
        changeIpAddress: (state, value) => {
            state.ipAddress = value;
        },
        changeFullName: (state, value) => {
            state.fullName = value;
        },
        changeCompany: (state, value) => {
            state.company = value;
        },
        changeBranch: (state, value) => {
            state.branch = value;
        },
        changeMenus: (state, value) => {
            state.menus = value;
        },
        changeVersion: (state, value) => {
            state.version = value;
        },
    },
    actions: {
        setLongApplicationName: (context, value) => {
            context.commit("changeLongApplicationName", value);
        },
        setTasks: (context, value) => {
            context.commit("changeTasks", value);
        },
        setTickets: (context, value) => {
            context.commit("changeTickets", value);
        },
        setMessages: (context, value) => {
            context.commit("changeMessages", value);
        },
        setSessionId: (context, value) => {
            context.commit("changeSessionId", value);
        },
        setAccessId: (context, value) => {
            context.commit("changeAccessId", value);
        },
        setIpAddress: (context, value) => {
            context.commit("changeIpAddress", value);
        },
        setFullname: (context, value) => {
            context.commit("changeFullName", value);
        },
        setCompany: (context, value) => {
            context.commit("changeCompany", value);
        },
        setBranch: (context, value) => {
            context.commit("changeBranch", value);
        },
        setMenus: (context, value) => {
            context.commit("changeMenus", value);
        },
        setVersion: (context, value) => {
            context.commit("changeVersion", value);
        },
    }
});