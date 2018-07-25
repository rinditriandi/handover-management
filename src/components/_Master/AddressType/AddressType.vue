<template>
    <div>

        <v-container grid-list-md fluid mb-5>
            
            <div class="text-xs-center mt-3 mb-3">
                <h3 class="page-title">Address Type</h3>
            </div>
            
            <v-toolbar color="grey lighten-1">
                <v-toolbar-title class="subheading">Advance Search</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab dark small color="indigo" @click="refreshPage()">
                    <v-icon dark>refresh</v-icon>
                </v-btn>
                <v-btn fab dark small color="indigo" @click="loadPage()">
                    <v-icon dark>search</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card>
                <v-container grid-list-md fluid>
                    <v-layout row wrap>
                    
                        <v-flex md12>
                            <v-text-field label="Searching ..." v-model="search1" :counter="32" maxlength="32" @keyup.enter="loadPage()"></v-text-field>
                        </v-flex>

                    </v-layout>   
                </v-container>
            </v-card>

            <v-layout row wrap mt-4 text-xs-center>
                <v-flex md-12>
                    <v-btn dark color="indigo" @click="openDialog('dialog1', 'Add')" v-if="this.auth.I">
                        Add Address Type
                    </v-btn>
                </v-flex>
            </v-layout>

            <v-toolbar color="grey lighten-1" class="mt-4">
                <v-toolbar-title class="subheading">List Address Type</v-toolbar-title>
            </v-toolbar>

            <v-data-table :headers="headers1" :items="listItems" :pagination.sync="pagination1" :total-items="totalItems" class="elevation-1">
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="data">
                    <td>
                        <v-btn fab dark color="primary" class="btn-small-table" @click="openDialog('dialog1', 'Edit', data.item)">
                            <v-icon dark>edit</v-icon>
                        </v-btn>
                        <v-btn fab dark color="primary" class="btn-small-table" @click="openDialog('dialog2', 'Remove', data.item)">
                            <v-icon dark>delete</v-icon>
                        </v-btn>
                    </td>
                    <td>{{ data.item.RowNo }}</td>
                    <td>{{ data.item.Name }}</td>
                    <td>{{ data.item.Alias }}</td>
                </template>
                <template slot="no-data">
                    <h2 class="text-xs-center mt-4 mb-4">No Data</h2>
                </template>
            </v-data-table>

        </v-container>

        <!-- Start # Input Data -->
        <v-dialog v-model="dialog1" max-width="900px">
            <v-card>
                <v-toolbar card dark color="indigo">
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle1 }}</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="Name" v-model="input.name" :counter="64" maxlength="64" required></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field label="Alias" v-model="input.alias" :counter="32" maxlength="32"></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                             <v-flex md12>
                                <v-text-field label="Remarks" v-model="input.remarks" :counter="256" maxlength="256" multi-line></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions class="grey lighten-3 padding-card">
                     <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn dark color="success" @click="saveData()" v-if="auth.I && type == 'Add'">{{ this.input.button1 }}</v-btn>
                            <v-btn dark color="success" @click="saveData()" v-if="auth.U && type == 'Edit'">{{ this.input.button1 }}</v-btn>
                            <v-btn dark flat color="info" @click="closeDialog('dialog1')">Close</v-btn>
                        </v-flex>
                     </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End # Input Data -->

        <!-- Start # Input Data -->
        <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
                <v-toolbar card dark color="indigo">
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle2 }}</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                            <v-flex sm4 xs12 text-xs-right>
                                 <label class="label-info">Name</label>
                                 <span class="ml-2 mr-2">:</span>
                            </v-flex>
                            <v-flex sm8 xs12>
                                <span>{{ input.name }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex sm4 xs12 text-xs-right>
                                 <label class="label-info">Alias</label>
                                 <span class="ml-2 mr-2">:</span>
                            </v-flex>
                            <v-flex sm8 xs12>
                                <span>{{ input.alias }}</span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex sm4 xs12 text-xs-right>
                                 <label class="label-info">Remarks</label>
                                 <span class="ml-2 mr-2">:</span>
                            </v-flex>
                            <v-flex sm8 xs12>
                                <span>{{ input.remarks }}</span>
                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-3 mb-3"></v-divider>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-checkbox label="Are you sure want to remove this address type ?" v-model="input.agree" color="indigo" value="indigo" hide-details></v-checkbox>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions class="grey lighten-3 padding-card">
                    <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn dark color="error" @click="removeData()" v-show="auth.D && input.agree">{{ this.input.button1 }}</v-btn>
                            <v-btn dark flat color="info" @click="closeDialog('dialog2')">Close</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End # Input Data -->

    </div>
</template>

<script>
export default {
    props: {
        ajaxCheckReturn: Function,
        ajaxGo: Function,
        sendSnackbar: Function,
        validateSession: Function,
        validatePage: Function
    },
    components: {
        
    },
    data() {
        return {

            // main table
            search1: undefined,
            totalItems: 0,
            listItems: [],
            pagination1: {
                page: 1,
                rowsPerPage: 10
            },
            headers1: [
                { class: 'datatable-header', text: 'Action', value: '', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'No', value: 'RowNo', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Name', value: 'Name', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Alias', value: 'Alias', align: 'left', sortable: false },
            ],

            // dialog
            dialog1: false,
            dialog2: false,
            
            // member
            flagWatch: false,
            formid: 'STM01',
            page: 'Address Type',
            type: undefined,

            // object
            auth: {},
            input: {},

            // list
            listRoles: [],
        }
    },
    computed: {
        // path
        _addresstype() { return this.$store.state.addresstype; },

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
        _sessionid() { return this.$route.params.sessionid; },
    },
    mounted () {
        this.initialPage().then(res => { this.flagWatch = true; });
    },
    beforeMount() {
        let sessionid = this.$route.params.sessionid;
        this.sessionid = sessionid;
        if (this.sessionid == undefined) { this.validateSession("error", "There is no session id !"); return false; }
    },
    created() {

    },
    watch: {
        pagination1: { handler() { if (this.flagWatch) { this.loadPage(); } }, deep: true }
    },
    methods: {

        /* ====================================== initial page ====================================== */

        initialPage() {
            // validation


            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                sessionid: this._sessionid,
                formid: this.formid,
                keyword: this.search1 ? this.search1 : null,
                currentpage: this.pagination1.page,
                pagesize: this.pagination1.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo(this._addresstype + "/loadpage", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data) && self.validatePage(data[1])) {
                    document.title = data[2][0].DocumentTitle;

                    self.$store.dispatch("setMenus", data[0]);
                    self.$store.dispatch("setLongApplicationName", data[2][0].DocumentTitle);
                    self.$store.dispatch("setCompany", data[2][0].Company);
                    self.$store.dispatch("setBranch", data[2][0].Branch);
                    self.$store.dispatch("setSessionId", data[2][0].SessionID);
                    self.$store.dispatch("setAccessId", data[2][0].AccessID);
                    self.$store.dispatch("setFullname", data[2][0].Fullname);
                    self.$store.dispatch("setTasks", data[2][0].Tasks);
                    self.$store.dispatch("setTickets", data[2][0].Tickets);
                    self.$store.dispatch("setMessages", data[2][0].Messages);
                    self.$store.dispatch("setVersion", data[2][0].VersionApps);

                    self.listRoles = data[1];
                    self.prepareRoles();
                    
                    self.listItems = data[3];
                    self.totalItems = data[4][0].TotalRecords;
                }
            });
        },
        
        prepareRoles() {
            let obj = this.listRoles;
            this.auth.R = obj[0].R; this.auth.I = obj[0].I; this.auth.U = obj[0].U; this.auth.D = obj[0].D; this.auth.P = obj[0].P;
            this.auth.V = obj[0].V; this.auth.A = obj[0].A; this.auth.G = obj[0].G; this.auth.L = obj[0].L; this.auth.S = obj[0].S;
        },

        /* ====================================== load method ====================================== */

        loadPage() {
            // validation


            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                sessionid: this._sessionid,
                formid: this.formid,
                keyword: this.search1 ? this.search1 : null,
                currentpage: this.pagination1.page,
                pagesize: this.pagination1.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo(this._addresstype + "/loadpage", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data) && self.validatePage(data[1])) {
                    self.listItems = data[3];
                    self.totalItems = data[4][0].TotalRecords;
                }
            });
        },

        refreshPage() {
            this.pagination1.page = 1;
            this.search1 = null;
            this.loadPage();
        },

        loadDetail() {
            // validation
            

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                sessionid: this._sessionid,
                formid: this.formid,

                idx_m_addresstype : this.input.idx_m_addresstype
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo(this._addresstype + "/loadDetail", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input.name = data[0][0].Name;
                    self.input.alias = data[0][0].Alias;
                    self.input.remarks = data[0][0].Remarks;
                }
            });
        },
        
        /* ====================================== post method ====================================== */

        saveData() {
            // validation
            if (this.input.name == undefined) { this.sendSnackbar("Warning", "Please input name", this._otherTimeout); return false; }

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                sessionid: this._sessionid,
                formid: this.formid,
                
                idx_m_addresstype: this.input.idx_m_addresstype ? this.input.idx_m_addresstype : 0,
                name: this.input.name,
                alias: this.input.alias,
                remarks: this.input.remarks
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo(this._addresstype + "/saveAddressType", arrayList, this._savingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};
                    self.closeDialog('dialog1');
                    self.loadPage();
                }
            });
        },
        
        removeData() {
            // validation
            if (this.input.name == undefined) { this.sendSnackbar("Warning", "Please input name", this._otherTimeout); return false; }

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                sessionid: this._sessionid,
                formid: this.formid,
                
                idx_m_addresstype: this.input.idx_m_addresstype ? this.input.idx_m_addresstype : 0
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo(this._addresstype + "/removeAddressType", arrayList, this._processingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};
                    self.closeDialog('dialog2');
                    self.loadPage();
                }
            });
        },

        /* ====================================== dialog method ==================================== */

        openDialog(param, type, data) {
            this.input = {};
            this.type = type;

            if (param == 'dialog1') {
                this.input.dialogtitle1 = this.type + ' ' + this.page;

                if (type == "Add") {
                    this.input.button1 = "Save";
                    this.dialog1 = true;
                }
                else if (type == "Edit") {
                    this.input.button1 = "Update";
                    this.input.idx_m_addresstype = data.IDX_M_AddressType;
                    this.loadDetail().then(() => { this.dialog1 = true;  });
                }
            }
            else if (param == 'dialog2') {
                this.input.dialogtitle2 = this.type + ' ' + this.page;
                this.input.button1 = "Delete";
                this.input.idx_m_addresstype = data.IDX_M_AddressType;
                this.loadDetail().then(() => { this.dialog2 = true;  });
            }
        },

        closeDialog(param) {
            if (param == 'dialog1') {
                this.input = {};
                this.dialog1 = false;
            }
            else if (param == 'dialog2') {
                this.input = {};
                this.dialog2 = false;
            }
        },

        /* ====================================== logic functions ================================= */


    }
}
</script>

<style>

</style>
