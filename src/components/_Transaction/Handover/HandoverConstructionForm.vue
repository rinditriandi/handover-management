<template>
  <div>
    <v-container grid-list-md fluid mb-5>
      <v-card>
        <v-toolbar card color="grey lighten-3">
          <v-flex md12 class="text-xs-center" mt-3>
            <v-toolbar-title class="dialog-title" color="blue">Handover Construction Form</v-toolbar-title>
          </v-flex>
          
        </v-toolbar>
        <v-card-title>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex md12>
                <span class="subheading">{{ header }}</span> 
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
                  <v-text-field label="Product" v-model="input.product" readonly required></v-text-field>
               </v-flex>
                <v-flex md1>
                  <v-btn fab small right @click="openDialog('dialog1', 'Add')">
                    <v-icon>search</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex>
                    <v-text-field label="idx SBP" v-model="input.idx_sbp" disabled></v-text-field>
                </v-flex>
              
             </v-layout>

            <v-layout row wrap>
                <v-flex md6>
                <v-text-field label="Cluster" v-model="input.cluster" readonly></v-text-field>
              </v-flex>
              <v-flex md6>
                  <v-text-field v-model="input.address" label="Address" readonly></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex md6>
                <v-text-field label="Luas Bangunan" v-model="input.luasBangunan" readonly></v-text-field>
              </v-flex>
              <v-flex md6>
                  <v-text-field label="Luas Tanah" v-model="input.luasTanah" readonly></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex md6>
                    <v-text-field label="Type"></v-text-field>
                </v-flex>
                <v-flex md6>
                   <v-text-field label="BAST Date" v-model="input.handoverDate" readonly></v-text-field>
                </v-flex>
            </v-layout> <br>

            <v-layout row wrap>
              <v-flex md12>
                <span class="subheading">{{ content }}</span> 
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
                    v-model="date"
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
                <v-text-field label="Pihak CRM" v-model="input.pic_crm"></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field label="Pihak Konstruksi" v-model="input.pic_construction"></v-text-field>
              </v-flex>
            </v-layout>
            
            <v-layout row wrap>
              <v-flex md12>
                <v-text-field label="Notes" v-model="input.notes" multi-line></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

         <v-card-actions class="grey lighten-3 padding-card">
                     <v-layout row text-xs-center>
                        <v-flex xs12>
                            <v-btn dark color="info" @click="saveData()" v-if="auth.I">Save</v-btn>
                            <v-btn dark color="error" :to="'/' + _sessionid + '/handover-construction'" >Close</v-btn>
                        </v-flex>
                     </v-layout>
                </v-card-actions>
      </v-card>
    </v-container>

     <v-dialog v-model="dialog1" max-width="990px">
            <v-card>
                <v-toolbar dark card color="primary">
                    <v-toolbar-title class="dialog-title">{{ dialogtitle1 }}</v-toolbar-title>
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
                              <v-btn small fab color="primary" @click="loadPage()">
                                <v-icon>search</v-icon>
                              </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                 <v-data-table :headers="headers1" :items="listItems" :pagination.sync="pagination1" :total-items="totalItems" class="elevation-1">
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
    data() {
      return {
        date: null,
        menu: false,
        modal: false,
        menu2: false,
        date2: null,
        menu1: false,
        header: 'Products',
        content: 'Handover Information',

        company: [],

        // main table
        keyword: '',
        IDX_M_GroupCompany: '',
        totalItems: 0,
        listItems: [],
        pagination1: {
            page: 1,
            rowsPerPage: 10
        },
        headers1: [
                { class: 'datatable-header', text: 'Action', value: '', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'No', value: 'RowNo', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'SBP No', value: 'SBPNo', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Cluster', value: 'Cluster', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Product ID', value: 'ProductID', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Product Desc', value: 'ProductDesc', align: 'left', sortable: false },
          ],

        dialog1: false,

        // member
        flagWatch: false,
        formid: 'HOL04',
        page: 'Address Type',
        dialogtitle1: 'Search Product',
        type: undefined,
        
        // object
        auth: {},
        input: {},
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
      testPrint() {
        // this.ajaxGo('GET', this._handover + '/testdoc', null, true, false, false)
        window.open('http://localhost:9004/web/handover/testdoc6');
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
            
            return this.ajaxGo('GET', this._handover + "/handover-construction-form", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
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

        saveData() {
            // validation
            if (this.input.product == undefined) { this.sendSnackbar("Warning", "Please Selecet Product", this._otherTimeout); return false; }

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                SessionID: this._sessionid,
                FormID: this.formid,

                IDX_M_Product: this.input.idx_product,
                IDX_T_SalesOrderHeader: this.input.idx_sbp,
                HandoverConstructionDate: this.date,
                PIC_CRM: this.input.pic_crm,
                PIC_Construction: this.input.pic_construction,
                Notes: this.input.notes,
                
               
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('POST', this._handover + "/handover-construction-save", arrayList, this._savingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};

                    self.$router.push('/' + self._sessionid + '/handover-construction');
                    // console.log('/' + self._sessionid + '/handover-construction');
                }
            });
        },


    }

  }

</script>

<style>


</style>
