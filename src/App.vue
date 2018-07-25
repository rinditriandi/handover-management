<template>
    <v-app id="inspire">

        <!-- start # snackbar -->
        <v-snackbar :timeout="timeout" :color="color" :top="'top'" :right="'right'" :multi-line="'multi-line'" v-model="alert">
            {{message}}
            <v-btn dark flat @click.native="alert = false">Close</v-btn>
        </v-snackbar>
        <!-- end # snackbar -->

        <!-- start # loading animation -->
        <div class="loader" v-if="loading">
            <center class="loader-center">
                <hexagon :size="90" class="loader-position"></hexagon>
                <span class="loader-text">{{loaderText}}</span>
            </center>
        </div>
        <!-- end # loading animation -->

        <!-- start # navigation drawer -->
        <v-navigation-drawer temporary style="background-color: #F5F5F5; width: 275px;" persistent :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
            <v-list dense>

                <template v-for="item in __filterMainMenus">

                    <!-- start # if -->
                    <v-list-group v-if="item.IDX_M_Parent > 0"  v-model="item.Model" :key="item.Name" :prepend-icon="item.Model == 1 ? item.Icons : item.Icons2" append-icon="">
                        
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.Name }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile v-for="(child, i) in __filterSubMainMenus(item.Group, item.Level)" :to="child.Url" :key="i" @click="1 == 1" class="padding-child-list-tile">
                            <v-list-tile-action v-if="child.Icons">
                                <v-icon>{{ child.Icons }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.Name }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                    </v-list-group>
                    <!-- end # if -->


                    <!-- start # else if -->
                    <v-list-tile v-else @click="1 == 1" :to="item.Url" :key="item.Name">
                        <v-list-tile-action>
                            <v-icon>{{ item.Icons }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.Name }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <!-- end # else if -->


                </template>

            </v-list>
        </v-navigation-drawer>
        <!-- end # navigation drawer -->


        <!-- start # toolbar -->
        <v-toolbar dark color="primary" app :clipped-left="clipped">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span v-text="this._longApplicationName" class="toolbar-text hidden-sm-and-down"></span>
            <span class="toolbar-text hidden-md-and-up">{{ this._shortApplicationName }}</span>
            <v-spacer></v-spacer>
            <span v-text="this._fullName" class="toolbar-text hidden-sm-and-down"></span>
            <v-menu transition="scale-transition" origin="center center">
                <v-btn icon slot="activator">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                    <v-card class="sidebar-card">
                        <v-card-media class="card-media">
                            <img src="http://10.10.0.51/public/img/faces/guest_male.png" class="img-profile"/>
                            <v-layout>
                                <v-card-title class="white--text">
                                    <div class="subheading">{{ this._fullName }}</div>
                                </v-card-title>
                            </v-layout>
                        </v-card-media>
                        <v-list two-line>
                            
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="indigo">account_circle</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ this._accessId }}</v-list-tile-title>
                                    <v-list-tile-sub-title>Here is your access id</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="indigo">vpn_key</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title wrap>{{ this._sessionId }}</v-list-tile-title>
                                    <v-list-tile-sub-title>Here is your session id</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-divider inset class="mt-3"></v-divider>

                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="indigo">business</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title wrap>{{ this._company }}</v-list-tile-title>
                                    <v-list-tile-sub-title>Current company</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon color="indigo">extension</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title wrap>{{ this._branch }}</v-list-tile-title>
                                    <v-list-tile-sub-title>Current branch</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-divider inset></v-divider>

                            <v-list-tile @click="tasks()">
                                <v-list-tile-action>
                                    <v-badge color="red">
                                        <span slot="badge">{{ this._tasks }}</span>
                                        <v-icon color="indigo">assignment</v-icon>
                                    </v-badge>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>Tasks</v-list-tile-title>
                                    <v-list-tile-sub-title>Manage your tasks</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile @click="tickets()">
                                <v-list-tile-action>
                                    <v-badge color="red">
                                        <span slot="badge">{{ this._tickets }}</span>
                                        <v-icon color="indigo">local_offer</v-icon>
                                    </v-badge>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>Tickets</v-list-tile-title>
                                    <v-list-tile-sub-title>Manage your tickets</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile @click="tickets()">
                                <v-list-tile-action>
                                    <v-badge color="red">
                                        <span slot="badge">{{ this._messsages }}</span>
                                        <v-icon color="indigo">message</v-icon>
                                    </v-badge>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>Messages</v-list-tile-title>
                                    <v-list-tile-sub-title>Collaborate with others</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-divider inset></v-divider>

                            <v-list-tile @click="logout">
                                <v-list-tile-action>
                                    <v-icon color="indigo">power_settings_new</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>Logout</v-list-tile-title>
                                    <v-list-tile-sub-title>exit current program</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>

                        </v-list>
                    </v-card>
                </v-list>

            </v-menu>
        </v-toolbar>
        <!-- end # toolbar -->


        <!-- start # content -->
        <v-content class="grey lighten-2">
            <div>
                <transition name="scale-transition" mode="out-in">
                    <router-view v-bind="_propsRouter"/>
                </transition>
            </div>
        </v-content>
        <!-- end # content -->


        <!-- start # footer -->
        <v-footer class="footer-box" :fixed="fixed" app>
            <span class="footer-span">&copy; 2018. All rights reserved. Developed By ICT Alam Sutera. <br /> Version {{ this._version }}</span>
        </v-footer>
        <!-- end # footer -->


    </v-app>
</template>

<script>
    import { Hexagon } from 'vue-loading-spinner'

    export default {
        props: {

        },
        components: {
            Hexagon
        },
        data() {
            return {
                //general
                loading: false,
                loaderText: null,
                fixed: true,
                
                // return information
                returnStatus: null,
                returnMessage: null,

                // alert
                alert: false,
                message: null,
                timeout: 0,
                color: null,

                //navigation drawer
                clipped: true,
                drawer: false,
                fixed: false,

                // menu
                idxGroup: 0,
                idxLevel: 0,


                // data
                items: [
                    {
                        icon: 'dashboard',
                        text: 'Dashboard',
                        path: '/2BF82CC1-D709-46A8-8E03-88C2EF44C364/dashboard'
                    },
                    {
                        icon: 'contacts',
                        text: 'Financial Receive',
                        path: '/2BF82CC1-D709-46A8-8E03-88C2EF44C364/financial-receive'
                    },
                    {
                        icon: 'history',
                        text: 'Receiving Purchase Order',
                        path: 'receiving-purchase-order'
                    },
                    {
                        icon: 'content_copy',
                        text: 'Duplicates',
                        path: 'duplicates'
                    },
                    {
                        icon: 'keyboard_arrow_up',
                        'icon-alt': 'keyboard_arrow_down',
                        text: 'Labels',
                        path: '',
                        model: false,
                        children: [{
                            icon: 'add',
                            text: 'Create label',
                            path: 'create-label'
                        }]
                    },
                    {
                        icon: 'keyboard_arrow_up',
                        'icon-alt': 'keyboard_arrow_down',
                        text: 'More',
                        path: '',
                        model: false,
                        children: [{
                                icon: 'settings',
                                text: 'Import',
                                path: 'import'
                            },
                            {
                                icon: 'chat_bubble',
                                text: 'Export',
                                path: 'export'
                            },
                            {
                                icon: 'phonelink',
                                text: 'Print',
                                path: 'print'
                            },
                            {
                                icon: 'keyboard',
                                text: 'Undo changes',
                                path: 'undo-changes'
                            },
                            {
                                icon: 'phonelink',
                                text: 'Other contacts',
                                path: 'other-contacts'
                            }
                        ]
                    },
                    {
                        icon: 'settings',
                        text: 'Settings',
                        path: 'settings'
                    },
                    {
                        icon: 'chat_bubble',
                        text: 'Send feedback',
                        path: 'send-feedback'
                    },
                    {
                        icon: 'help',
                        text: 'Help',
                        path: 'help'
                    },
                    {
                        icon: 'phonelink',
                        text: 'App downloads',
                        path: 'app-downloads'
                    },
                    {
                        icon: 'keyboard',
                        text: 'Go to the old version',
                        path: 'go-to-the-old-version'
                    }
                ],
            }
        },
        computed: {
            // props
            _propsRouter() { return { ajaxCheckReturn: this.ajaxCheckReturn, ajaxGo: this.ajaxGo, sendSnackbar: this.sendSnackbar, validateSession: this.validateSession, validatePage: this.validatePage, parseRupiah: this.parseRupiah } },

            // general
            _longApplicationName() { return this.$store.state.longApplicationName; },
            _shortApplicationName() { return this.$store.state.shortApplicationName; },
            _serviceUrl() { return this.$store.state.serviceUrl; },

            _sessionId() { return this.$store.state.sessionId; },
            _fullName() { return this.$store.state.fullName; },
            _accessId() { return this.$store.state.accessId; },
            _ipAddress() { return this.$store.state.ipAddress },
            _company() { return this.$store.state.company; },
            _branch() { return this.$store.state.branch; },
            _menus() { return this.$store.state.menus; },
            _version() { return this.$store.state.version; },

             // path
            _portal() { return this.$store.state.portal; },

            // timeout
            _successTimeout() { return this.$store.state.successTimeout; },
            _otherTimeout() { return this.$store.state.otherTimeout; },

            // loader
            _fetchingLoader() { return this.$store.state.fetchingLoader; },
            _savingLoader() { return this.$store.state.savingLoader; },
            _processingLoader() { return this.$store.state.processingLoader; },

            // data
            _withData() { return this.$store.state.withData; },
            _withoutData() { return this.$store.state.withoutData; },

            //snackbar
            _withSnackBar() { return this.$store.state.withSnackBar; },
            _withoutSnackBar() { return this.$store.state.withoutSnackBar; },


            // toolbar information
            _tasks() { return this.$store.state.tasks; },
            _tickets() { return this.$store.state.tickets; },
            _messsages() { return this.$store.state.messages; },

            // current file
            __returnStatus() { return this.returnStatus.toString().toLowerCase(); },
            __returnMessage() { return this.returnMessage; },
            __timeout() { return this.timeout; },
            __filterMainMenus() { return this._menus.filter(function(item) { return item.Level == 0 }); },
            
        },
        beforeMount() {
            
        },
        created() {

        },
        methods: {
            __filterSubMainMenus(group, level) {
                let data = this._menus;
                return data.filter(function(item) {
                    return item.Group == group && item.Level == level + 1
                });
            },
            logout() {
                window.close();
            },
            tasks() {

            },
            tickets() {

            },


            /* ============================================= CORE METHOD  ============================================= */

            validatePage(data) {
                let isRead = data[0].R;
                if (isRead == 0) { 
                    let returnStatus = "error"; let returnMessage = "You don't have access for this page !"; let timeout = 4000; 
                    setTimeout(function() { self.sendSnackbar(returnStatus, returnMessage, timeout); }, 100);
                    let self = this; setTimeout(function(){ self.$router.push("/404"); return true; }, self.timeout)
                    return false;
                }
                else {
                    return true;
                }
            },

            validateSession(returnstatus, returnmessage) {
                this.returnStatus = returnstatus; this.returnMessage = returnmessage; this.timeout = 4000;  this.showSnackbar();
                localStorage.clear(); 
                let self = this; setTimeout(function(){ self.$router.push("/404"); return true; }, self.timeout); 
            },

            showSnackbar() {
                this.alert = true;
                this.message = this.__returnMessage;
                this.color = this.__returnStatus;
                this.timeout = this.__timeout;
            },

            sendSnackbar(returnstatus, returnmessage, timeout) {
                let self = this;
                this.alert = false;

                if (returnstatus == "Failed") { returnstatus = "warning"; }
                else if (returnstatus == "Success")  { returnstatus = "success"; }
                else if (returnstatus == "Info") { returnstatus = "info"; }
                else if (returnstatus == "Error") { returnstatus = "error"; }

                this.returnMessage = returnmessage;
                this.returnStatus = returnstatus;
                this.timeout = timeout;

                setTimeout(function(){ self.showSnackbar(); }, 100);
                
                return true;
            },

            ajaxCheckReturn(data) {
                let obj = data;
                let countobj = Object.keys(obj).length;
                let returnstatus = data[countobj-1][0].ReturnStatus;

                if (returnstatus == "Success" || returnstatus == "success") { return true; } else { return false; }
            },

            ajaxGo(type, method, param, loaderText, isdata, issnackbar) {
                let JSONString = null;
                let self = this;

                self.loading = true;
                self.loaderText = loaderText;
                if (issnackbar) { self.alert  = false; }
                
                return type == 'POST' ? this.axios.post(this._serviceUrl + method, { 'id': JSON.stringify(param) }).then(onComplete).catch(onFailed)
                    : this.axios.get(this._serviceUrl + method, { params: { 'id': JSON.stringify(param) }}).then(onComplete).catch(onFailed)

                    function onComplete(response) {
                        self.loading = false;
                        
                        let data = response.data; 
                        let countdata = 0;

                        if (data == '') {
                            self.returnStatus = "Unauthorized";
                            self.returnMessage = "There is no response data. In 4 seconds, you'll be closed or directed to login portal. Please re-login !";
                            checkResponse();
                            return false;
                        }
                        
                        countdata = Object.keys(data).length; 

                        if (isdata == 0) {
                            self.returnStatus = response.data[0][0].ReturnStatus; 
                            self.returnMessage = self.returnStatus + " : " + response.data[0][0].ReturnMessage;
                            checkResponse(); if (issnackbar) { self.showSnackbar(); }
                            return data[0];
                        }
                        else {
                            self.returnStatus = response.data[countdata-1][0].ReturnStatus; 
                            self.returnMessage = self.returnStatus + " : " + response.data[countdata-1][0].ReturnMessage;
                            checkResponse(); if (issnackbar) { self.showSnackbar(); }
                            return data;
                        }
                    }

                    function onFailed(error) {
                        self.returnStatus = "error"; self.returnMessage = error.toString(); self.timeout = 0; self.showSnackbar(); self.loading = false; 
                        return undefined;
                    }

                    function checkResponse() {
                        if (self.returnStatus == "Success") { self.timeout = 4000; } 
                        else if (self.returnStatus == "Failed") { self.returnStatus = "warning"; self.timeout = 0; }
                        else if (self.returnStatus == "Error") { self.returnStatus = "error"; self.timeout = 0; }
                        else if (self.returnStatus == "UnderMaintenance" || self.returnStatus == "Unauthorized") { 
                            self.returnStatus = "error"; self.timeout = 4000;  self.showSnackbar();
                            localStorage.clear(); 
                            self.$router.push("/"); setTimeout(function(){ location.reload(); window.close(); }, 4000); 
                        }
                    }
            },
            
            parseRupiah(param) {
                return parseFloat(param.replace(/\./g,''));
            }
        }
    }
</script>

<style>
    .loader{
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2500;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        background: rgba(0, 0, 0, 0.90);
    }
    .loader-center{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
    }
    .loader-text{
        margin-top: 10px;
        font-weight: bold;
        color: #FFFFFF;
        font-size: 16px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .loader-position{
        margin-left: 70px;
        margin-bottom: -60px;
    }
    img{
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
    }
    .tabs__slider{
        height: 5px;
    }
    /* .btn--floating .btn__content{
        margin-top: 15px;
    }
    .btn--floating.btn--small .btn__content{
        margin-top: 11px;
    }
    .btn--floating.btn--large .btn__content{
        margin-top: 20px;
    } */
    .padding-card{
        padding: 15px;
    }
    .list--dense .list__tile:not(.list__tile--avatar) {
        height: 50px;
    }
    .subheading{
        font-weight: 500;
    }
    .list__tile{
        font-size: 14px;
        font-weight: 500;
    }
    .input-group--select .input-group__selections__comma{
        font-size: 14px;
    }
    .tabs__container{
        height: 100px;
    }
    .snack{
        font-size: 16px;
    }
    .snack__content .btn__content{
        font-size: 16px;
    }
    .warning{
        background-color: rgb(255,193,7, .4);
    }
    .padding-child-list-tile{
        padding-left: 30px;
        height: 50px;
    }
    .footer-span{
        font-size: 12px;
        text-align: center; 
        width: 100%;
        font-weight: 500;
    }
    .footer-box{
        height: 45px !important; box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.2);
    }
    .toolbar-text{
        font-size: 16px;
        font-weight: 500;
    }
    .navigation-drawer > .list .list__tile{
        height: 50px;
    }
    .sidebar-card{
        -webkit-box-shadow: none;
        box-shadow: none;
        background: url('http://10.10.0.51/public/img/toolbar/background.png');
        width: 300px;
    }
    .card-media{
        background: rgb(0,0,0,0.6);
        height: 100px !important;
    }
    .img-profile{
        width: 100px !important;
    }
    .subheading{
        font-weight: 500;
    }
    .list__tile__sub-title, .list__tile__title{
        display: inline-table;
        white-space: inherit;
        overflow: auto;
    }
    .page-title{
        color: #757575;
    }
    .datatable-header{
        font-size: 14px !important;
        font-weight: 600 !important;
        color: #616161 !important;
    }
    .datatable__actions__select{
        font-size: 13px;
        font-weight: 600;
    }
    .datatable__actions__pagination{
        font-size: 13px;
        font-weight: 600;
    }
    .dialog-title{
        width: 100%;
        text-align: center;
    }
    .btn-small-table{
        width: 30px;
        height: 30px;
        margin: 2px;
    }
    .btn-small-table .icon{
        font-size: 18px;
    }
    .input-group--text-field input, .input-group--text-field textarea{
        font-size: 14px;
    }
    .input-group label{
        font-size: 14px;
    }
    .label-info{
        font-weight: 500;
    }
</style>