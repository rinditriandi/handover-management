<template>
    <div style="margin-top: -25px">
        <v-container grid-list-md fluid mb-5>
            
            <div class="text-xs-center mt-5 mb-3">
                <h3 class="page-title">Construction Progress</h3>
            </div>
             <v-toolbar color="primary" class="mt-4">     
                <v-icon dark>search</v-icon>       
                <v-toolbar-title class="subheading">Search</v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex md3>
                            <v-text-field v-model="searchLetterNo" label="No Letter"></v-text-field>
                        </v-flex>
                        <v-flex md4>
                            <v-text-field v-model="searchCustomerName" label="Customer Name"></v-text-field>
                        </v-flex>
                        <v-flex md4>
                            <v-text-field v-model="searchProductDesc" label="Product Description"></v-text-field>
                        </v-flex>
                        <v-flex md1>
                            <v-btn fab small color="blue-grey darken-4" dark @click="loadPage()">
                                <v-icon>search</v-icon>
                            </v-btn>
                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card>

            <v-toolbar color="primary" class="mt-4">
                <v-layout>
                    <v-flex md4 ml-2>
                        <v-btn fab small color="blue-grey darken-4" dark :to="'/' + _sessionid + '/construction-progress-form'">
                            <v-icon>add</v-icon>
                        </v-btn>
                        
                    </v-flex>

                    <v-flex md4 class="text-xs-center" mt-3>
                          <v-toolbar-title class="subheading">{{ page }} List</v-toolbar-title>
                    </v-flex>

                    
                            <!-- <v-flex md4 class="text-xs-right">
                                <v-btn fab small color="blue-grey darken-4" dark>
                                    <v-icon>refresh</v-icon>
                                </v-btn>
                            </v-flex> -->
                                   
                </v-layout>
            </v-toolbar>

            <v-data-table :headers="headers1" :items="listItems" :pagination.sync="pagination1" :total-items="totalItems" class="elevation-1">
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="data">
                    <td>
                        <v-tooltip top>
                            <v-btn slot="activator" fab color="success" class="btn-small-table" @click="openDialog('dialog1', 'Add', data.item)">
                                <v-icon dark>edit</v-icon>
                            </v-btn>
                            <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <v-btn v-if="auth.R" slot="activator" fab dark color="primary" class="btn-small-table" @click="openDialog('dialog1', 'Edit', data.item)">
                                <v-icon color="blue-grey darken-4">search</v-icon>
                            </v-btn>
                            <span>View</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <v-btn fab dark color="indigo" slot="activator" class="btn-small-table" @click="testPrint(data.item.IDX_T_HandoverLetter)">
                                <v-icon>cloud_download</v-icon>
                            </v-btn>
                            <span>Download</span>
                        </v-tooltip>
                    </td>
                    <td>{{ data.item.RunningNumber }}</td>
                    <td>{{ data.item.LetterNo }}</td>
                    <td>{{ data.item.CustomerName }}</td>
                    <td><router-link class="blue-grey--text" :to="'/' + _sessionid + '/view-invitation/' + data.item.IDX_T_HandoverLetter">{{ data.item.SBPNO }} </router-link></td>
                    <td>{{ data.item.DefaultCode }}</td>
                    <td>{{ data.item.Address }}</td>
                    <td>{{ data.item.DateLetter ? moment(data.item.DateLetter).format('DD-MM-YYYY') : '' }}</td>
                </template>
                <template slot="no-data">
                    <h2 class="text-xs-center mt-4 mb-4">No Data</h2>
                </template>
            </v-data-table>

        </v-container>

        <!-- Start # Input Data -->
        <v-dialog v-model="dialog1" max-width="900px" persistent>
            <v-card v-if="type!='Info'">
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
                            <v-btn dark color="success" @click="testPrint()">Print</v-btn>
                            <v-btn dark flat color="info" @click="closeDialog('dialog1')">Close</v-btn>
                        </v-flex>
                     </v-layout>
                </v-card-actions>
            </v-card>
            <v-card v-if="type=='Info'">
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
        <!-- <v-dialog v-model="dialog2" max-width="500px">
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
        </v-dialog> -->
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
            items: [
                '--Select--',
                'Alam Sutera Realty', 
                'Alfa Goldland Realty',
                'Delta Mega Persada',
                'Duta Realtindo Jaya'
            ],

            // main table
            searchLetterNo: '',
            searchCustomerName: '',
            searchProductDesc: '',
            totalItems: 0,
            listItems: [],
            pagination1: {
                page: 1,
                rowsPerPage: 10
            },
            headers1: [
                { class: 'datatable-header', text: 'Action', value: '', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'No', value: 'RowNo', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Product ID', value: 'NoLetter', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Product Desc', value: 'CustomerName', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'SPK No', value: 'ProductID', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Contractor', value: 'ProductDesc', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Progress Plan', value: 'DateLetter', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Progress Actual', value: 'DateLetter', align: 'left', sortable: false },
            ],

            // dialog
            dialog1: false,
            dialog2: false,
            
            // member
            flagWatch: false,
            formid: 'HOL01',
            page: 'Construction Progress',
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
                //sessionid: this._sessionid,
                SessionID: this._sessionid,
                FormID: this.formid,
                LetterNo: this.searchLetterNo,
                CustomerName: this.CustomerName,
                ProductDesc: this.searchProductDesc,
                CurrentPage: this.pagination1.page,
                PageSize: this.pagination1.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/handover-letter", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
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
                //sessionid: this._sessionid,
                SessionID: this._sessionid,
                FormID: this.formid,
                LetterNo: this.searchLetterNo,
                CustomerName: this.searchCustomerName,
                ProductDesc: this.searchProductDesc,
                CurrentPage: this.pagination1.page,
                PageSize: this.pagination1.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/handover-letter", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
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
                SessionID: this._sessionid,
                FormID: this.formid,

                IDX_T_HandoverLetter : this.input.IDX_T_HandoverLetter
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/handover-letterprint", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                // if (self.ajaxCheckReturn(data)) {
                    self.input.name = data[3].LetterNo;
                    self.input.alias = data[3].Subject;
                    self.input.remarks = data[3].Purpose;
                // }
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
                    this.input.IDX_T_HandoverLetter = data.IDX_T_HandoverLetter;
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

        testPrint(id) {
            // this.ajaxGo('GET', this._handover + '/testdoc', null, true, false, false)
            window.open('http://10.10.0.51:9004/web/handover//handover-letterprint?id=' + id + '&&sessionid=' + this._sessionid + '&&formid=' + this.formid);
        }
    }
}
</script>

<style>

</style>
