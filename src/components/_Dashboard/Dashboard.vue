<template>
    <div>
        <v-container grid-list-md fluid>

            <v-layout row wrap mt-3>
                
                <v-flex d-flex md3 sm6>
                    <v-card class="mt-2">
                        <v-layout row wrap text-xs-center class="padding-card">
                            <v-flex md3 sm12>
                                <v-btn fab dark color="success">
                                    <v-icon dark>announcement</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex md9 sm12 text-sm-center text-md-left>
                                <div class="content-height ml-3">
                                    <h3 class="headline mb-2">Business Process</h3>
                                    <span>Learn application business process</span>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-card-actions class="grey lighten-3 padding-card">
                            <v-layout row text-xs-center>
                                <v-flex d-flex xs12>
                                    <v-btn dark large color="success" @click="openDialog('dialog1')">Open</v-btn> <!--v-bind:disabled="me.ProgramStatusNumeric > 1" -->
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex d-flex md3 sm6>
                    <v-card class="mt-2">
                        <v-layout row wrap text-xs-center class="padding-card">
                            <v-flex md3 sm12>
                                <v-btn fab dark color="info">
                                    <v-icon dark>announcement</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex md9 sm12 text-sm-center text-md-left>
                                <div class="content-height ml-3">
                                    <h3 class="headline mb-2">Update</h3>
                                    <span>Find new updates</span>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-card-actions class="grey lighten-3 padding-card">
                            <v-layout row text-xs-center>
                                <v-flex d-flex xs12>
                                    <v-btn dark large color="info" @click="openDialog('dialog2')">Open</v-btn> <!--v-bind:disabled="me.ProgramStatusNumeric > 1" -->
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex d-flex md3 sm6>
                    <v-card class="mt-2">
                        <v-layout row wrap text-xs-center class="padding-card">
                            <v-flex md3 sm12>
                                <v-btn fab dark color="warning">
                                    <v-icon dark>info</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex md9 sm12 text-sm-center text-md-left>
                                <div class="content-height ml-3">
                                    <h3 class="headline mb-2">F.A.Q</h3>
                                    <span>Find a common question</span>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-card-actions class="grey lighten-3 padding-card">
                            <v-layout row text-xs-center>
                                <v-flex d-flex xs12>
                                    <v-btn dark large color="warning" @click="openDialog('dialog3')">Open</v-btn> <!--v-bind:disabled="me.ProgramStatusNumeric > 1" -->
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex d-flex md3 sm6>
                    <v-card class="mt-2">
                        <v-layout row wrap text-xs-center class="padding-card">
                            <v-flex md3 sm12>
                                <v-btn fab dark color="error">
                                    <v-icon dark>headset_mic</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex md9 sm12 text-sm-center text-md-left>
                                <div class="content-height ml-3">
                                    <h3 class="headline mb-2">Helpdesk</h3>
                                    <span>Find your IT Helper</span>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-card-actions class="grey lighten-3 padding-card">
                            <v-layout row text-xs-center>
                                <v-flex d-flex xs12>
                                    <v-btn dark large color="error" @click="openDialog('dialog4')">Open</v-btn> <!--v-bind:disabled="me.ProgramStatusNumeric > 1" -->
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-flex>

            </v-layout>

        </v-container>

        <!-- Start # Dialog Business Process -->
        <v-dialog v-model="dialog1" max-width="900px">
            <v-card>
                <v-toolbar card dark color="success">
                    <v-btn icon dark @click="closeDialog('dialog1')">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Business Process <small style="font-style: italic">[ learn application business process ]</small></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="closeDialog('dialog1')">Close</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-btn color="primary" dark @click="closeDialog('dialog1')">Close Dialog 1</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- End # Dialog Business Process -->

        <!-- Start # Dialog Update -->
        <v-dialog v-model="dialog2" max-width="900px">
            <v-card>
                <v-toolbar card dark color="info">
                    <v-btn icon dark @click="closeDialog('dialog2')">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Update <small style="font-style: italic">[ find new updates ]</small></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="closeDialog('dialog2')">Close</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-btn color="primary" dark @click="closeDialog('dialog2')">Close Dialog 2</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- End # Dialog Update -->

        <!-- Start # Dialog FAQ -->
        <v-dialog v-model="dialog3" max-width="900px">
             <v-card>
                <v-toolbar card dark color="warning">
                    <v-btn icon dark @click="closeDialog('dialog3')">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>F.A.Q <small style="font-style: italic">[ find a common question ]</small></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="closeDialog('dialog3')">Close</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-btn color="primary" dark @click="closeDialog('dialog3')">Close Dialog 3</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- End # Dialog FAQ -->

        <!-- Start # Dialog Helpdesk -->
        <v-dialog v-model="dialog4" max-width="900px">
            <v-card>
                <v-toolbar card dark color="error">
                    <v-btn icon dark @click="closeDialog('dialog4')">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Helpdesk <small style="font-style: italic">[ Find your IT Helper ]</small></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="closeDialog('dialog4')">Close</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-btn color="primary" dark @click="closeDialog('dialog4')">Close Dialog 4</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- End # Dialog Helpdesk -->

    </div>
</template>

<script>
export default {
    props: {
        ajaxCheckReturn: Function,
        ajaxGo: Function,
        sendSnackbar: Function,
        validateSession: Function
    },
    components: {

    },
    data() {
        return {
            // session
            sessionid: undefined,

            // dialog
            dialog1: false, //dialog business process
            dialog2: false, //dialog updates
            dialog3: false, //dialog faq
            dialog4: false, //dialog helpdesk

            // object
            items: [],
            formid: '',
        }
    },
    computed: {
        // path
        _dashboard() { return this.$store.state.dashboard; },

        _handover() { return this.$store.state.handover; },

        // timeout
        _successTimeout() { return this.$store.state.successTimeout; },
        _otherTimeout() { return this.$store.state.otherTimeout; },

        // loader
        _fetchingLoader() { return this.$store.state.fetchingLoader; },
        _savingLoader() { return this.$store.state.savingLoader; },
        _processingLoader() { return this.$store.state.processingLoader; },

        // data
        _withData() {  return this.$store.state.withData; },
        _withoutData() {  return this.$store.state.withoutData; },

        // snackbar
        _withSnackBar() { return this.$store.state.withSnackBar; },
        _withoutSnackBar() { return this.$store.state.withoutSnackBar; },

        // session
        _sessionid() { return this.$route.params.sessionid; }
    },
    beforeMount() {
        let sessionid = this.$route.params.sessionid;
        this.sessionid = sessionid;
        if (this.sessionid == undefined) { this.validateSession("error", "There is no session id !"); return false; }
    },
    created() {
        this.loadPage();
    },
    methods: {
        /* ====================================== load method ====================================== */

        loadPage() {
            // validation


            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                SessionID: this._sessionid
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/dashboard", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    document.title = data[1][0].DocumentTitle;

                    self.$store.dispatch("setMenus", data[0]);
                    self.$store.dispatch("setLongApplicationName", data[1][0].DocumentTitle);
                    self.$store.dispatch("setCompany", data[1][0].Company);
                    self.$store.dispatch("setBranch", data[1][0].Branch);
                    self.$store.dispatch("setSessionId", data[1][0].SessionID);
                    self.$store.dispatch("setAccessId", data[1][0].AccessID);
                    self.$store.dispatch("setFullname", data[1][0].Fullname);
                    self.$store.dispatch("setTasks", data[1][0].Tasks);
                    self.$store.dispatch("setTickets", data[1][0].Tickets);
                    self.$store.dispatch("setMessages", data[1][0].Messages);
                    self.$store.dispatch("setVersion", data[1][0].VersionApps);
                }
            });
        },

        /* ====================================== post method ====================================== */


        /* ====================================== dialog method ==================================== */

        openDialog(param) {
            if (param == "dialog1") {
                this.dialog1 = true;
            }
            else if (param == "dialog2") {
                this.dialog2 = true;
            }
            else if (param == "dialog3") {
                this.dialog3 = true;
            }
            else if (param == "dialog4") {
                this.dialog4 = true;
            }

        },
        closeDialog(param) {
            if (param == "dialog1") {
                this.dialog1 = false;
            }
            else if (param == "dialog2") {
                this.dialog2 = false;
            }
            else if (param == "dialog3") {
                this.dialog3 = false;
            }
            else if (param == "dialog4") {
                this.dialog4 = false;
            }

        },

        /* ====================================== logic functions ================================= */

    }
}
</script>

<style scoped>
    .content-height {
        height: 100px;
    }
</style>