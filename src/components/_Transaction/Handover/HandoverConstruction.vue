<template>
    <div style="margin-top: -25px">
        <v-container grid-list-md fluid mb-5>
            
            <div class="text-xs-center mt-5 mb-3">
                <h3 class="page-title">Handover Construction</h3>
            </div>
             <v-toolbar dark color="primary" class="mt-4">     
                <v-icon dark>search</v-icon>       
                <v-toolbar-title class="subheading">Search</v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex md3>
                            <v-text-field v-model="searchProductID" label="Product ID"></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-text-field v-model="searchSubCluster" label="Sub Cluster"></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-text-field v-model="searchAddress" label="Address"></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-btn color="blue-grey darken-4" dark @click="loadPage()">Search</v-btn>
                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card>

            <v-toolbar dark color="primary" class="mt-4">
                <v-layout>
                    <v-flex md4 ml-2>
                        <v-btn fab small color="blue-grey darken-4" dark :to="'/' + _sessionid + '/handover-construction-form'">
                            <v-icon>add</v-icon>
                        </v-btn>
                        
                    </v-flex>

                    <v-flex md4 class="text-xs-center" mt-3>
                          <v-toolbar-title class="subheading">{{ page }} List</v-toolbar-title>
                    </v-flex>
                                   
                </v-layout>
            </v-toolbar>

            <v-data-table :headers="headers1" :items="listItems" :pagination.sync="pagination1" :total-items="totalItems" class="elevation-1">
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="data">
                    <td>
                        <v-tooltip top>
                            <v-btn slot="activator" fab color="error" class="btn-small-table" @click="openDialog('dialog1', 'Edit', data.item)">
                                <v-icon dark>edit</v-icon>
                            </v-btn>
                            <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <v-btn v-if="auth.R" slot="activator" fab dark color="primary" class="btn-small-table" @click="openDialog('dialog1', 'Info', data.item)">
                                <v-icon dark>search</v-icon>
                            </v-btn>
                            <span>Info</span>
                        </v-tooltip>
                         <v-tooltip top>
                            <v-btn v-if="auth.R && data.item.HandoverConstructionStatus == 'D'" slot="activator" fab dark color="warning" class="btn-small-table" @click="openDialog('dialog1', 'Approve', data.item)">
                                <v-icon dark>assignment_turned_in</v-icon>
                            </v-btn>
                            <span>Approve</span>
                        </v-tooltip>
                    </td>
                    <td>{{ data.item.RunningNumber }}</td>
                    <td>{{ data.item.ProductID }}</td>
                    <td>{{ data.item.Address }}</td>
                    <td>{{ data.item.SubClusterName }}</td>
                    <td>{{ data.item.Type }}</td>
                    <td>{{ data.item.HandoverDate ? moment(data.item.HandoverDate).format('DD-MM-YYYY') : '' }}</td>
                    <td>
                        <v-chip small label color="red" text-color="white" v-if="data.item.HandoverConstructionStatus == 'D'">
                            Draft
                        </v-chip>
                         <v-chip small label color="warning" text-color="white" v-if="data.item.HandoverConstructionStatus == 'A'">
                            Approve
                        </v-chip>
                    </td>
                </template>
                <template slot="no-data">
                    <h2 class="text-xs-center mt-4 mb-4">No Data</h2>
                </template>
            </v-data-table>

        </v-container>

        <!-- Start # Input Data -->
        <v-dialog v-model="dialog1" max-width="900px" persistent>
            <v-card v-if="type=='Add'">
                <v-toolbar card dark color="indigo">
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle1 }}</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                            <v-flex md5>
                                <!-- <v-text-field label="Name" v-model="input.name" :counter="64" maxlength="64" required></v-text-field> -->
                                <v-select :items="company" label="Company" v-model="input.searchCompany" @input="dropdownCompany(input.searchCompany)" single-line item-text="Company" item-value="IDX_M_GroupsCompany"></v-select>
                            </v-flex>
                            <v-flex md5>
                                <v-text-field label="Keyword" v-model="input.keyword" :counter="32" maxlength="32"></v-text-field>
                            </v-flex>
                            <v-flex md2>
                              <v-btn small fab color="primary" @click="loadCompany()">
                                <v-icon>search</v-icon>
                              </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                 <v-data-table :headers="headers2" :items="listItems" :pagination.sync="pagination1" :total-items="totalItems" class="elevation-1">
                   <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                      <template slot="items" slot-scope="data">
                          <td>
                              <v-tooltip top>
                                  <v-btn slot="activator" fab color="success" class="btn-small-table" @click="selectItem(data.item)">
                                      <v-icon dark>done</v-icon>
                                  </v-btn>
                                  <span>Select</span>
                              </v-tooltip>
                          </td>
                          <td>{{ data.item.RunningNumber }}</td>
                          <td>{{ data.item.SalesOrderNumber }}</td>
                          <td>{{ data.item.SubCluster }}</td>
                          <td>{{ data.item.ProductID  }}</td>
                          <td>{{ data.item.ProductDes }}</td>
                        
                      </template>
                    <template slot="no-data">
                        <h2 class="text-xs-center mt-4 mb-4">No Data</h2>
                    </template>
            </v-data-table>
                <v-card-actions class="grey lighten-3 padding-card">
                    <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn dark color="error" @click="removeData()" v-show="auth.D && input.agree">{{ this.input.button1 }}</v-btn>
                            <v-btn dark flat color="info" @click="closeDialog('dialog1')">Close</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>
            <v-card v-if="type == 'Edit'">
                <v-toolbar card dark color="indigo">
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle1 }}</v-toolbar-title>
                </v-toolbar>
                <v-card-title>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                        <v-flex md12>
                            <span class="subheading">Product Information</span> 
                        </v-flex>
                        <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider>
                    </v-container>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                            <v-flex md5>
                                <v-text-field label="ProductID" v-model="input.ProductID" :counter="64" maxlength="64" required></v-text-field>
                            </v-flex>
                             <v-flex md1>
                                <v-btn fab small right @click="openDialog('dialog1', 'Add')">
                                    <v-icon>search</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex md6>
                                <v-text-field label="idx SBP" v-model="input.idx_sbp" :counter="32" maxlength="32"></v-text-field>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="Cluster" v-model="input.cluster" readonly></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field v-model="input.Address" label="Address" readonly></v-text-field>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="Luas Bangunan" v-model="input.LuasBangunan" readonly></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field label="Luas Tanah" v-model="input.LuasTanah" readonly></v-text-field>
                            </v-flex>
                        </v-layout>
                         <v-layout>
                            <v-flex md6>
                                <v-text-field label="Type"></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field label="BAST Date" v-model="input.BASTDate" readonly></v-text-field>
                            </v-flex>
                        </v-layout> <br>
                        <v-layout row wrap>
                            <v-flex md12>
                                <span class="subheading">Handover Construction Information</span> 
                            </v-flex>
                            </v-layout>
                            <v-divider class="mt-3 mb-5"></v-divider>
                            <v-layout>
                                <v-flex md6>
                                <v-menu
                                ref="menu"
                                :close-on-content-click="false"
                                v-model="menu"
                                :nudge-right="40"
                                :return-value.sync="date"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                                >
                                <v-text-field 
                                    slot="activator"
                                    v-model="input.HandoverConstructionDate"
                                    label="Handover Construction Date"
                                    prepend-icon="event"
                                    readonly
                                ></v-text-field>
                                    <v-date-picker v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                            </v-layout>
                          <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="Pihak CRM" v-model="input.PIC_CRM"></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field label="Pihak Konstruksi" v-model="input.PIC_Construction"></v-text-field>
                            </v-flex>
                         </v-layout>
                          <v-layout row wrap>
                            <v-flex md12>
                                <v-text-field label="Notes" v-model="input.Notes" multi-line></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions class="grey lighten-3 padding-card">
                    <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn dark flat color="info" @click="closeDialog('dialog1')">Close</v-btn>
                            <v-btn dark flat color="error" @click="updateData()">Update</v-btn>
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
                        <v-flex md12>
                            <span class="subheading">Product Information</span> 
                        </v-flex>
                        <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider> <br>
                        <v-layout row wrap>
                            <v-flex md3>
                                <h4>Product:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.ProductID }}</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4>Index SBP:</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4 class="success--text">{{ input.idx_sbp }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md3>
                                <h4>Cluster:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.SubClusterName }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Address:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.Address }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                             <v-flex md3>
                                <h4>Luas Bangunan:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.LuasBangunan }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Luas Tanah</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.LuasTanah }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                             <v-flex md3>
                                <h4>Type:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.Type }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>BAST Date</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.BASTDate }}</h4>
                            </v-flex>
                        </v-layout> <br>

                        <v-layout row wrap>
                            <v-flex md12>
                                <span class="subheading">Handover Information</span> 
                            </v-flex>
                            <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider> <br>
                        <v-layout row wrap>
                             <v-flex md3>
                                <h4>Handover Construction Date</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.HandoverConstructionDate }}</h4>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                             <v-flex md3>
                                <h4>Pihak CRM</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.PIC_CRM }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Pihak Konstruksi</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.PIC_Construction }}</h4>
                            </v-flex>
                        </v-layout>
                            
                        <v-layout row wrap>
                             <v-flex md12>
                                <h4>Notes</h4>
                                <h4 class="info--text">{{ input.Notes }}</h4>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions class="grey lighten-3 padding-card">
                     <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn dark flat color="info" @click="closeDialog('dialog1')">Close</v-btn>
                        </v-flex>
                     </v-layout>
                </v-card-actions>
            </v-card>
             <v-card v-if="type=='Approve'">
                <v-toolbar card dark color="indigo">
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle1 }}</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                        <v-flex md12>
                            <span class="subheading">Product Information</span> 
                        </v-flex>
                        <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider> <br>
                        <v-layout row wrap>
                            <v-flex md3>
                                <h4>Product:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.ProductID }}</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4>Index SBP:</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4 class="success--text">{{ input.idx_sbp }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md3>
                                <h4>Cluster:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.SubClusterName }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Address:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.Address }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                             <v-flex md3>
                                <h4>Luas Bangunan:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.LuasBangunan }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Luas Tanah</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.LuasTanah }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                             <v-flex md3>
                                <h4>Type:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.Type }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>BAST Date</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.BASTDate }}</h4>
                            </v-flex>
                        </v-layout> <br>

                        <v-layout row wrap>
                            <v-flex md12>
                                <span class="subheading">Handover Information</span> 
                            </v-flex>
                            <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider> <br>
                        <v-layout row wrap>
                             <v-flex md3>
                                <h4>Handover Construction Date</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.HandoverConstructionDate }}</h4>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                             <v-flex md3>
                                <h4>Pihak CRM</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.PIC_CRM }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Pihak Konstruksi</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.PIC_Construction }}</h4>
                            </v-flex>
                        </v-layout>
                            
                        <v-layout row wrap>
                             <v-flex md12>
                                <h4>Notes</h4>
                                <h4 class="info--text">{{ input.Notes }}</h4>
                            </v-flex>
                        </v-layout> <br>
                              
                        <v-layout row wrap>
                             <v-flex md12>
                               
                                <v-text-field v-model="input.ApprovalNotes" label="Approval Notes" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions class="grey lighten-3 padding-card">
                     <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn dark flat color="info" @click="closeDialog('dialog1')">Close</v-btn>
                             <v-btn dark flat color="success" @click="approveData()">Approve</v-btn>
                        </v-flex>
                     </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
            searchProductID: '',
            searchSubCluster: '',
            searchAddress: '',
            totalItems: 0,
            listItems: [],
            company: [],

            keyword: '',
            IDX_M_GroupCompany: '',
            pagination1: {
                page: 1,
                rowsPerPage: 10
            },
            headers1: [
                { class: 'datatable-header', text: 'Action', value: '', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'No', value: 'RowNo', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Product ID', value: 'ProductID', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Address', value: 'Address', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Cluster', value: 'Cluster', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Type', value: 'Type', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Handover Date', value: 'HandoverDate', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Status', value: 'Status', align: 'center', sortable: false }
            ],
            headers2: [
                { class: 'datatable-header', text: 'Action', value: '', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'No', value: 'RowNo', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'SBP No', value: 'SBPNo', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Cluster', value: 'Cluster', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Product ID', value: 'ProductID', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Product Desc', value: 'ProductDesc', align: 'left', sortable: false },
          ],

            // dialog
            dialog1: false,
            dialog2: false,
            
            // member
            flagWatch: false,
            formid: 'HOL04',
            page: 'Handover Construction',
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
                ProductID: this.searchProductID,
                SubCluster: this.searchSubCluster,
                Address: this.searchAddress,
                CurrentPage: this.pagination1.page,
                PageSize: this.pagination1.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/handover-construction", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
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
                ProductID: this.searchProductID,
                SubCluster: this.searchSubCluster,
                Address: this.searchAddress,
                CurrentPage: this.pagination1.page,
                PageSize: this.pagination1.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/handover-construction", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data) && self.validatePage(data[1])) {
                    self.listItems = data[3];
                    self.totalItems = data[4][0].TotalRecords;
                }
            });
        },

        loadCompany() {
            // validation


            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                //sessionid: this._sessionid,
                SessionID: this._sessionid,
                FormID: this.formid,
                Keyword: this.input.keyword ? this.input.keyword: '',
                IDX_M_GroupCompany: this.input.searchCompany,
                CurrentPage: this.pagination1.page,
                PageSize: this.pagination1.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/handover-construction-form", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data) && self.validatePage(data[1])) {
                    self.listItems = data[3];
                    self.totalItems = data[4][0].TotalRecords;
                }
            });
        },

         loadAdditionaList() {
            // validation


            // declare
            let self = this;
            let arrayList = [];

            // prepare
          
            
            return this.ajaxGo('GET', this._handover + "/additional-list", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
               
                    self.company = data[0];
                   // console.log(self.company);
            });
        },

         dropdownCompany(param) {
             // validation


            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                //sessionid: this._sessionid,
                SessionID: this._sessionid,
                FormID: this.formid,
                Keyword: this.input.alias,
                IDX_M_GroupCompany: param,
                CurrentPage: this.pagination1.page,
                PageSize: this.pagination1.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/handover-construction-form", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.listItems = data[3];
                    self.totalItems = data[4][0].TotalRecords;
                }
            });
        },

        selectItem(data) {
            console.log(data);
            this.input.idx_sbp = data.IDX_SBP,
            this.input.address = data.ProductDes,
            this.input.product = data.ProductID,
            this.input.cluster = data.SubCluster,
            this.input.luasBangunan = data.LuasBangunan,
            this.input.luasTanah = data.LuasTanah,
            this.input.idx_product = data.IDX_M_Product,
            this.input.handoverDate = data.HandoverDate ? this.moment(data.HandoverDate).format('DD-MM-YYYY'): '',
            this.dialog1 = false;
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

                IDX_T_HandoverConstruction : this.input.IDX_T_HandoverConstruction
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/handover-construction-info", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                // if (self.ajaxCheckReturn(data)) {
                    self.input.ProductID = data[3][0].ProductID;
                    self.input.idx_sbp = data[3][0].IDX_SBP;
                    self.input.cluster = data[3][0].SubClusterName;
                    self.input.SubClusterName = data[3][0].SubClusterName;
                    self.input.Address = data[3][0].Address;
                    self.input.LuasBangunan = data[3][0].LuasBangunan;
                    self.input.LuasTanah = data[3][0].LuasTanah;
                    self.input.Type = data[3][0].Type;
                    self.input.BASTDate = data[3][0].BASTDate ? self.moment(data[3][0].BASTDate).format('DD-MM-YYYY') : '';
                    self.input.PIC_CRM = data[3][0].PIC_CRM;
                    self.input.PIC_Construction = data[3][0].PIC_Construction;
                    self.input.HandoverConstructionDate = data[3][0].HandoverConstructionDate ? self.moment(data[3][0].HandoverConstructionDate).format('DD-MM-YYYY') : '';
                    self.input.Notes = data[3][0].Notes;
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

         approveData() {
            // validation
            if (this.input.ApprovalNotes == undefined) { this.sendSnackbar("Warning", "Please Input Notes", this._otherTimeout); return false; }

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                SessionID: this._sessionid,
                FormID: this.formid,

                IDX_T_HandoverConstruction : this.input.IDX_T_HandoverConstruction,
                ApprovalNotes : this.input.ApprovalNotes
            };

            // push
            arrayList.push(id);
            
            
            return this.ajaxGo('POST', this._handover + "/handover-construction-approve", arrayList, this._savingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};
                    self.closeDialog('dialog1');
                    self.loadPage();

                    
                    // console.log('/' + self._sessionid + '/handover-construction');
                 }
            });
        },

         updateData() {
            // validation
            //if (this.input.ApprovalNotes == undefined) { this.sendSnackbar("Warning", "Please Input Notes", this._otherTimeout); return false; }

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                SessionID: this._sessionid,
                FormID: this.formid,

                IDX_T_HandoverConstruction : this.input.IDX_T_HandoverConstruction,
                ApprovalNotes : this.input.ApprovalNotes
            };

            // push
            arrayList.push(id);
            
            
            return this.ajaxGo('POST', this._handover + "/handover-construction-approve", arrayList, this._savingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};
                    self.closeDialog('dialog1');
                    self.loadPage();

                    
                    // console.log('/' + self._sessionid + '/handover-construction');
                 }
            });
        },



        /* ====================================== dialog method ==================================== */

        openDialog(param, type, data) {
            this.input = {};
            this.type = type;

            if (param == 'dialog1') {
                this.input.dialogtitle1 = this.type + ' ' + this.page;
                this.loadAdditionaList ();

                if (type == "Add") {
                    this.input.button1 = "Save";
                    this.dialog1 = true;
                }
                else if (type == "Edit") {
                    // this.input.button1 = "Update";
                    this.input.IDX_T_HandoverConstruction = data.IDX_T_HandoverConstruction;
                    this.loadDetail().then(() => { this.dialog1 = true;  });
                }
                else if (type == "Info") {
                    this.input.IDX_T_HandoverConstruction = data.IDX_T_HandoverConstruction;
                    this.loadDetail().then(() => { this.dialog1 = true; });

                }
                else if (type == "Approve") {
                    this.input.IDX_T_HandoverConstruction = data.IDX_T_HandoverConstruction;
                    this.loadDetail().then(() => { this.dialog1 = true; });

                }

                // Tanpa memanggil SP 
                //  else if (type == "Info") {
                //     this.input = {};
                //     this.input.dialogtitle1 = this.type + ' ' + this.page;
                //     this.input.IDX_T_HandoverConstruction = data.IDX_T_HandoverConstruction;
                //     this.input.ProductID = data.ProductID;
                //     this.input.idx_sbp = data.IDX_SBP
                //     this.dialog1 = true;
                // come this is nnote
                // }
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
    }
}
</script>

<style>

</style>
