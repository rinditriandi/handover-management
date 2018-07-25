<template>
    <div style="margin-top: -25px">
        <v-container grid-list-md fluid mb-5>
            
            <div class="text-xs-center mt-5 mb-3">
                <h3 class="page-title">Undangan Retensi Aktif</h3>
            </div>
             <v-toolbar dark color="primary" class="mt-4">     
                <v-icon dark>search</v-icon>       
                <v-toolbar-title class="subheading">Search</v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex md3>
                            <v-text-field v-model="searchLetterNo" @keyup.enter="loadPage()" label="No Surat"></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-text-field v-model="searchCustomerName" @keyup.enter="loadPage()" label="Nama Konsumen"></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-text-field v-model="searchProductDesc" @keyup.enter="loadPage()" label="Alamat"></v-text-field>
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
                        <v-tooltip top>
                        <v-btn slot="activator" icon dark @click="openDialog('dialog1', 'Add')" v-if="this.auth.I">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <span>Tambah Retensi Aktif</span>
                        </v-tooltip>
                    </v-flex>

                    <v-flex md4 class="text-xs-center" mt-3>
                          <v-toolbar-title class="subheading">Daftar {{ page }}</v-toolbar-title>
                    </v-flex>                                   
                </v-layout>
            </v-toolbar>

            <v-data-table :headers="headers1" :items="listItems" :pagination.sync="pagination1" :total-items="totalItems" class="elevation-1">
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="data">
                    <td>
                        <v-layout>
                        <v-tooltip top>
                            <v-btn v-if="auth.R && data.item.HandoverLetterStatus == 'DRAFT'" slot="activator" fab color="error" class="btn-small-table" @click="openDialog('dialog1', 'Edit', data.item)">
                                <v-icon dark>edit</v-icon>
                            </v-btn>
                            <span>Ubah</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <v-btn v-if="auth.R" slot="activator" fab dark color="primary" class="btn-small-table" @click="openDialog('dialog1', 'Info', data.item)">
                                <v-icon dark>search</v-icon>
                            </v-btn>
                            <span>Lihat</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <v-btn fab dark color="indigo" slot="activator" class="btn-small-table" @click="testPrint(data.item.IDX_T_RetentionLetter)">
                                <v-icon>cloud_download</v-icon>
                            </v-btn>
                            <span>Unduh</span>
                        </v-tooltip>
                         <!-- <v-tooltip top>
                                <v-btn fab dark color="success" slot="activator" class="btn-small-table" @click="sentData('Email', data.item)">
                                    <v-icon>send</v-icon>
                                </v-btn>
                                <span>Kirim Email</span>
                            </v-tooltip> -->
                            <v-tooltip top>
                                <v-btn  v-if="auth.R && data.item.HandoverLetterStatus == 'TERKIRIM'  || data.item.HandoverLetterStatus == 'DRAFT'" fab dark color="success" slot="activator" class="btn-small-table" @click="openDialog('dialog1', 'Approve', data.item)">
                                    <v-icon>check_box</v-icon>
                                </v-btn>
                                <span>Konfirmasi</span>
                        </v-tooltip>
                        </v-layout>
                    </td>
                    <td>{{ data.item.RunningNumber }}</td>
                    <td>{{ data.item.LetterNo }}</td>
                    <td>{{ data.item.CustomerName }}</td>
                    <td><router-link class="blue-grey--text" :to="'/' + _sessionid + '/view-invitation/' + data.item.IDX_T_HandoverLetter">{{ data.item.SBPNO }} </router-link></td>
                    <td>{{ data.item.DefaultCode }}</td>
                    <td>{{ data.item.Address }}</td>
                    <td>{{ data.item.DateLetter ? moment(data.item.DateLetter).format('DD-MM-YYYY') : '' }}</td>
                    <td> 
                        <v-chip v-if="data.item.HandoverLetterStatus == 'DRAFT'" small color="pink" text-color="white"> {{ data.item.HandoverLetterStatus }}</v-chip>
                        <v-chip v-else-if="data.item.HandoverLetterStatus == 'TERKIRIM'" small color="primary" text-color="white"> {{ data.item.HandoverLetterStatus }}</v-chip>
                        <v-chip v-else small color="teal" text-color="white"> {{ data.item.HandoverLetterStatus }}</v-chip>
                    </td>
                </template>
                <template slot="no-data">
                    <h2 class="text-xs-center mt-4 mb-4">No Data</h2>
                </template>
            </v-data-table>

        </v-container>

        <!-- Start # Input Data -->
         <v-dialog v-model="dialog1" width="auto">
            <v-card v-if="type == 'Add'">
                <v-toolbar card dark color="indigo">
                      <v-btn icon dark @click.native="dialog1 = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle1 }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                     <v-toolbar-items>
                        <v-btn dark flat @click="saveData()">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-title>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                        <v-flex md12>
                            <span class="subheading">Kepala Surat</span> 
                        </v-flex>
                        <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider>
                    </v-container>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="No Surat" v-model="input.LetterNo" readonly></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-menu
                                    ref="menu1"
                                    :close-on-content-click="false"
                                    v-model="menu1"
                                    :nudge-right="40"
                                    :return-value.sync="input.DateLetter"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                    >
                                    <v-text-field 
                                        slot="activator"
                                        v-model="input.DateLetter"
                                        label="Tanggal Surat"
                                        prepend-icon="event"
                                        readonly
                                    ></v-text-field>
                                        <v-date-picker v-model="input.DateLetter" @input="$refs.menu1.save(input.DateLetter)" no-title scrollable></v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md5>
                                <v-text-field label="Produk" v-model="input.product" :counter="64" maxlength="64" required></v-text-field>
                            </v-flex>
                             <v-flex md1>
                                <v-btn fab small right @click="openDialog('dialog2', 'Add')">
                                    <v-icon>search</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex md6>
                                <v-text-field label="Perihal" v-model="input.subject" :counter="32" maxlength="32"></v-text-field>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="Nama Konsumen" v-model="input.CustomerName" readonly></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field v-model="input.address" label="Alamat" readonly></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="Email" v-model="input.email" readonly></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field v-model="input.idx_sbp" label="IDX SBP" readonly></v-text-field>
                            </v-flex>
                        </v-layout> <br>
                        <v-layout row wrap>
                            <v-flex md12>
                                <span class="subheading">Isi Surat</span> 
                            </v-flex>
                            <v-spacer></v-spacer>
                        </v-layout>
                         <v-divider class="mt-3"></v-divider> <br>
                          <v-layout row wrap>
                             <v-flex md6>
                                <v-text-field label="Lokasi" v-model="input.location"></v-text-field>
                            </v-flex>
                             <v-flex md6>
                                <v-text-field label="Masa Retensi" v-model="input.RetentionPeriod"></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout>
                            <v-layout row wrap>
                             <v-flex md6>
                                <v-menu
                                ref="menu2"
                                :close-on-content-click="false"
                                v-model="menu2"
                                :nudge-right="40"
                                :return-value.sync="input.StartTime"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                                >
                                <v-text-field 
                                    slot="activator"
                                    v-model="input.StartTime"
                                    label="Tanggal Mulai Pemeliharaan"
                                    prepend-icon="event"
                                    readonly
                                ></v-text-field>
                                    <v-date-picker v-model="input.StartTime" @input="$refs.menu2.save(input.StartTime)" no-title scrollable></v-date-picker>
                                </v-menu>
                            </v-flex>    

                             <v-flex md6>
                                <v-menu
                                ref="menu3"
                                :close-on-content-click="false"
                                v-model="menu3"
                                :nudge-right="40"
                                :return-value.sync="input.EndTime"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                                >
                                <v-text-field 
                                    slot="activator"
                                    v-model="input.EndTime"
                                    label="Tanggal Selesai Pemeliharaan"
                                    prepend-icon="event"
                                    readonly
                                ></v-text-field>
                                    <v-date-picker v-model="input.EndTime" @input="$refs.menu3.save(input.EndTime)" no-title scrollable></v-date-picker>
                                </v-menu>
                            </v-flex>    
                        </v-layout>
                        
                        </v-layout> <br>
                        <v-layout row wrap>
                            <v-flex md12>
                                <v-text-field label="Catatan" v-model="input.notes" multi-line></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>

            <v-card v-if="type == 'Edit'">
                <v-toolbar card dark color="indigo">
                      <v-btn icon dark @click.native="dialog1 = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle1 }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                     <v-toolbar-items>
                        <v-btn dark flat @click="updateData()">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-title>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                        <v-flex md12>
                            <span class="subheading">Kepala Surat</span> 
                        </v-flex>
                        <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider>
                    </v-container>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="No Surat" v-model="input.LetterNo" readonly></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-menu
                                    ref="menu1"
                                    :close-on-content-click="false"
                                    v-model="menu1"
                                    :nudge-right="40"
                                    :return-value.sync="input.DateLetter"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                    >
                                    <v-text-field 
                                        slot="activator"
                                        v-model="input.DateLetter"
                                        label="Tanggal Surat"
                                        prepend-icon="event"
                                        readonly
                                    ></v-text-field>
                                        <v-date-picker v-model="input.DateLetter" @input="$refs.menu1.save(input.DateLetter)" no-title scrollable></v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md5>
                                <v-text-field label="Produk" v-model="input.product" :counter="64" maxlength="64" required></v-text-field>
                            </v-flex>
                             <v-flex md1>
                                <v-btn fab small right @click="openDialog('dialog2', 'Add')">
                                    <v-icon>search</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex md6>
                                <v-text-field label="Perihal" v-model="input.subject" :counter="32" maxlength="32"></v-text-field>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="Nama Konsumen" v-model="input.CustomerName" readonly></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field v-model="input.address" label="Alamat" readonly></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md6>
                                <v-text-field label="Email" v-model="input.email" readonly></v-text-field>
                            </v-flex>
                            <v-flex md6>
                                <v-text-field v-model="input.idx_sbp" label="IDX SBP" readonly></v-text-field>
                            </v-flex>
                        </v-layout> <br>
                        <v-layout row wrap>
                            <v-flex md12>
                                <span class="subheading">Isi Surat</span> 
                            </v-flex>
                            <v-spacer></v-spacer>
                        </v-layout>
                         <v-divider class="mt-3"></v-divider> <br>
                          <v-layout row wrap>
                             <v-flex md6>
                                <v-text-field label="Lokasi" v-model="input.location"></v-text-field>
                            </v-flex>
                             <v-flex md6>
                                <v-text-field label="Masa Retensi" v-model="input.RetentionPeriod"></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout>
                            <v-layout row wrap>
                             <v-flex md6>
                                <v-menu
                                ref="menu2"
                                :close-on-content-click="false"
                                v-model="menu2"
                                :nudge-right="40"
                                :return-value.sync="input.StartTime"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                                >
                                <v-text-field 
                                    slot="activator"
                                    v-model="input.StartTime"
                                    label="Tanggal Mulai Pemeliharaan"
                                    prepend-icon="event"
                                    readonly
                                ></v-text-field>
                                    <v-date-picker v-model="input.StartTime" @input="$refs.menu2.save(input.StartTime)" no-title scrollable></v-date-picker>
                                </v-menu>
                            </v-flex>    

                             <v-flex md6>
                                <v-menu
                                ref="menu3"
                                :close-on-content-click="false"
                                v-model="menu3"
                                :nudge-right="40"
                                :return-value.sync="input.EndTime"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                                >
                                <v-text-field 
                                    slot="activator"
                                    v-model="input.EndTime"
                                    label="Tanggal Selesai Pemeliharaan"
                                    prepend-icon="event"
                                    readonly
                                ></v-text-field>
                                    <v-date-picker v-model="input.EndTime" @input="$refs.menu3.save(input.EndTime)" no-title scrollable></v-date-picker>
                                </v-menu>
                            </v-flex>    
                        </v-layout>
                        
                        </v-layout> <br>
                        <v-layout row wrap>
                            <v-flex md12>
                                <v-text-field label="Catatan" v-model="input.notes" multi-line></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>

            <v-card v-if="type=='Info'">
                <v-toolbar card dark color="indigo">
                     <v-btn icon dark @click.native="dialog1 = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle1 }}</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                        <v-flex md12>
                            <span class="subheading">Kepala Surat</span> 
                        </v-flex>
                        <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider> <br>
                        <v-layout row wrap>
                            <v-flex md3>
                                <h4>No Surat:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.LetterNo }}</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4>Tanggal Surat:</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4 class="info--text">{{ moment(input.DateLetter).format('DD-MM-YYYY') }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md3>
                                <h4>Produk:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.ProductID }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Judul:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.subject }}</h4>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                            <v-flex md3>
                                <h4>Nama Konsumen:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.CustomerName }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Alamat:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.address }}</h4>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                            <v-flex md3>
                                <h4>Email:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.email }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>IDX SBP:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.idx_sbp }}</h4>
                            </v-flex>
                        </v-layout> <br>
                         <v-divider class="mt-3"></v-divider> <br>
                        <v-layout row wrap>
                            <v-flex md12>
                                <span class="subheading">Isi Surat</span> 
                            </v-flex>
                            <v-spacer></v-spacer>
                        </v-layout>
                            <v-divider class="mt-3"></v-divider> <br>
                        <v-layout row wrap>
                             <v-flex md3>
                                <h4>Tanggal Undangan Serah Terima Sebelumnya:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ moment(input.DateLetterBefore).format('DD-MM-YYYY') }}</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4>Masa Retensi:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.RetentionPeriod }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md3>
                                <h4>Tanggal Terhitung:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ moment(input.CountedDate).format('DD-MM-YYYY') }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Lokasi:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.location }}</h4>
                            </v-flex>
                        </v-layout>

                         <v-layout row wrap>
                             <v-flex md3>
                                <h4>Tanggal Mulai Pemeliharaan:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.StartTime }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Tanggal Selesai Pemeliharaan</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.EndTime }}</h4>
                            </v-flex>
                        </v-layout> <br>
                         <v-divider class="mt-3"></v-divider> <br>
                            
                        <v-layout row wrap>
                             <v-flex md12>
                                <h4>Catatan</h4>
                                <h4 class="info--text">{{ input.notes }}</h4>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>

            <v-card v-if="type=='Approve'">
                <v-toolbar card dark color="indigo">
                     <v-btn icon dark @click.native="dialog1 = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle1 }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                     <v-toolbar-items>
                        <v-btn dark flat @click="approveData('Mail')">Approve</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                        <v-flex md12>
                            <span class="subheading">Kepala Surat</span> 
                        </v-flex>
                        <v-spacer></v-spacer>
                        </v-layout>
                        <v-divider class="mt-3"></v-divider> <br>
                        <v-layout row wrap>
                            <v-flex md3>
                                <h4>No Surat:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.LetterNo }}</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4>Tanggal Surat:</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4 class="info--text">{{ moment(input.DateLetter).format('DD-MM-YYYY') }}</h4>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md3>
                                <h4>Produk:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.ProductID }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Judul:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="info--text">{{ input.subject }}</h4>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                            <v-flex md3>
                                <h4>Nama Konsumen:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.CustomerName }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>Alamat:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.address }}</h4>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                            <v-flex md3>
                                <h4>Email:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.email }}</h4>
                            </v-flex>
                             <v-flex md3>
                                <h4>IDX SBP:</h4>
                            </v-flex>
                            <v-flex md3>
                                <h4 class="success--text">{{ input.idx_sbp }}</h4>
                            </v-flex>
                        </v-layout> <br>
                         <v-divider class="mt-3"></v-divider> <br>
                         <v-layout row wrap>
                             <v-flex md6>
                                 <v-select :items="courier" label="Courier" v-model="input.courier"></v-select>
                             </v-flex>
                              <v-flex md6>
                                 <v-text-field label="Nomor Resi" v-model="input.ResiNo"></v-text-field>
                             </v-flex>
                         </v-layout>
                          <v-layout row wrap>
                               <v-flex md6>
                                    <v-menu
                                    ref="menu5"
                                    :close-on-content-click="false"
                                    v-model="menu5"
                                    :nudge-right="40"
                                    :return-value.sync="SentDate"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                    >
                                    <v-text-field 
                                        slot="activator"
                                        v-model="input.SentDate"
                                        label="Tanggal Kirim"
                                        prepend-icon="event"
                                        readonly
                                    ></v-text-field>
                                        <v-date-picker v-model="input.SentDate" @input="$refs.menu5.save(SentDate)" no-title scrollable></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex md6>
                                    <v-text-field label="Catatan" v-model="input.ApprovalNotes"></v-text-field>
                                </v-flex>
                        </v-layout>
                        
                    </v-container>
                </v-card-text>
            </v-card>

        </v-dialog>

         <!-- Start # Input Data -->
         <v-dialog v-model="dialog2" width="900">
             <v-card v-if="type == 'Add'">
                <v-toolbar card dark color="indigo">
                    <v-btn icon dark @click.native="dialog2 = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    <v-toolbar-title class="dialog-title">{{ this.input.dialogtitle2 }}</v-toolbar-title>
                </v-toolbar>
                 <v-card-text>
                    <v-container grid-list-md fluid>
                        <v-layout row wrap>
                            <v-flex md5>
                                <!-- <v-text-field label="Name" v-model="input.name" :counter="64" maxlength="64" required></v-text-field> -->
                                <v-select :items="company" label="Company" v-model="input.searchCompany" @input="dropdownCompany()" single-line item-text="Company" item-value="IDX_M_GroupsCompany"></v-select>
                            </v-flex>
                            <v-flex md5>
                                <v-text-field label="Keyword" v-model="input.keyword" :counter="32" maxlength="32"></v-text-field>
                            </v-flex>
                            <v-flex md2>
                              <v-btn small fab color="primary" @click="dropdownCompany()">
                                <v-icon>search</v-icon>
                              </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                 <v-data-table :headers="headers2" :items="listProducts" :pagination.sync="pagination2" :total-items="totalProducts" class="elevation-1">
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
                          <td>{{ data.item.ProductDesc }}</td>
                        
                      </template>
                    <template slot="no-data">
                    <h2 class="text-xs-center mt-4 mb-4">No Data</h2>
                </template>
            </v-data-table>
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
            DateLetter: null,
            menu: false,
            modal: false,
            menu2: false,
            menu3: false,
            menu4: false,
            menu5: false,
            handoverDate: null,
            HomeCheckingDate: null,
            StartTime: null,
            EndTime: null,
            menu1: false,
            header: 'Letterhead',
            content: 'Content Of Letter',
            pickup: 'Pickup',
            courier: [
                'JNE', 'J&T', 'POS', 'WAHANA', 'TIKI'
            ],
           
            company: [],

            // main table
             keyword: '',
            IDX_M_GroupCompany: '',
            searchLetterNo: '',
            searchCustomerName: '',
            searchProductDesc: '',
            totalItems: 0,
            totalProducts: 0,
            listItems: [],
            listProducts: [],
            pagination1: {
                page: 1,
                rowsPerPage: 10
            },
             pagination2: {
                page: 1,
                rowsPerPage: 10
            },
            headers1: [
                { class: 'datatable-header', text: 'Action', value: '', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'No', value: 'RowNo', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'No Surat', value: 'NoSurat', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Nama Konsumen', value: 'NamaKonsumen', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'No SBP', value: 'NoSBP', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Kode Produk', value: 'KodeProduk', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Alamat', value: 'Alamat', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Tanggal Surat', value: 'TanggalSurat', align: 'left', sortable: false },
                { class: 'datatable-header', text: 'Status', value: 'Status', align: 'left', sortable: false },
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
            formid: 'HOL06',
            page: 'Undangan Retensi Aktif',
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
        pagination1: { handler() { if (this.flagWatch) { this.loadPage(); } }, deep: true },
        pagination2: { handler() { if (this.flagWatch) { this.dropdownCompany(); } }, deep: true }
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
            
            return this.ajaxGo('GET', this._handover + "/retention-letter", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
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
            
            return this.ajaxGo('GET', this._handover + "/retention-letter", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
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

       loadAdditionaList() {
            // validation


            // declare
            let self = this;
            let arrayList = [];

            // prepare
           let id = {
                SessionID: this._sessionid,
                FormID: this.formid,

            };
            // console.log(id);
             // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/additional-list", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
               
                    self.company = data[3];
                   // console.log(self.company);
            });
        },
         
        dropdownCompany() {
             // validation


            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                //sessionid: this._sessionid,
                SessionID: this._sessionid,
                FormID: this.formid,
                Keyword: this.input.keyword,
                IDX_M_GroupCompany: this.input.searchCompany,
                CurrentPage: this.pagination2.page,
                PageSize: this.pagination2.rowsPerPage
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/home-checking-letter-form", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.listProducts = data[3];
                    self.totalProducts = data[4][0].TotalRecords;
                }
            });
        },

        selectItem(data) {
            console.log(data);
            this.input.idx_sbp = data.ID,
            this.input.address = data.ProductDesc,
            this.input.product = data.ProductID,
            this.input.cluster = data.SubCluster,
            this.input.luasBangunan = data.LuasBangunan,
            this.input.luasTanah = data.LuasTanah,
            this.input.idx_product = data.IDX_M_Product,
            this.input.handoverDate = data.HandoverDate ? this.moment(data.HandoverDate).format('DD-MM-YYYY'): '',
            this.input.CustomerName = data.CustomerName,
            this.input.email = data.Email,
            this.input.subject = 'Pemberitahuan Pengaktifan Masa Pemeliharaan Bangunan',
            this.input.location = 'Tangerang',
            this.input.DateLetter = this.moment(new Date()).format('YYYY-MM-DD');
            this.input.RetentionPeriod = '100';
            this.dialog2 = false;
        },
        
        /* ====================================== post method ====================================== */

         loadRetentionLetter() {
            // validation
            
    
            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                SessionID: this._sessionid,
                FormID: this.formid,

                IDX_T_RetentionLetter : this.input.IDX_T_RetentionLetter
            };
            console.log(id);
            // push
            arrayList.push(id);
            
            return this.ajaxGo('GET', this._handover + "/retention-letter-info", arrayList, this._fetchingLoader, this._withData, this._withoutSnackBar).then(function(data) {
                // if (self.ajaxCheckReturn(data)) {
                    console.log(data[3][0]);
                    self.input.LetterNo = data[3][0].LetterNo;
                    self.input.idx_m_product = data[3][0].IDX_M_Product;
                    self.input.product = data[3][0].ProductID;
                    self.input.DateLetter = data[3][0].DateLetter ?  self.moment(data[3][0].DateLetter).format('YYYY-MM-DD') : '';
                    self.input.idx_sbp = data[3][0].IDX_SBP;
                    self.input.ProductID = data[3][0].ProductID;
                    self.input.subject = data[3][0].Subject;
                    self.input.CustomerName = data[3][0].CustomerName;
                    self.input.address = data[3][0].Address;
                    self.input.location = data[3][0].Location;
                    self.input.email = data[3][0].Email;
                    self.input.RetentionPeriod = data[3][0].RetentionPeriod;
                    self.input.StartTime = data[3][0].StartTime ? self.moment(data[3][0].StartTime).format('YYYY-MM-DD') : '';
                    self.input.EndTime = data[3][0].EndTime ? self.moment(data[3][0].EndTime).format('YYYY-MM-DD') : '';
                    self.input.notes = data[3][0].Notes;
                //  }
            });
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
                IDX_M_LetterType: 3,
                LetterNo: this.input.LetterNo,
                DateLetter: this.input.DateLetter,
                Subject: this.input.subject,
                RetentionPeriod: this.input.retentionPeriod,
                Location: this.input.location,
                StartTime: this.input.StartTime,
                EndTime: this.input.EndTime,
                Notes: this.input.notes,
                
               
            };

            // push
            arrayList.push(id);
            
            return this.ajaxGo('POST', this._handover + "/retention-letter-save", arrayList, this._savingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};

                    self.closeDialog('dialog1');
                    self.loadPage();

                    // self.$router.push('/' + self._sessionid + '/handover-letter');
                    // console.log('/' + self._sessionid + '/handover-construction');
                }
            });
        },

        updateData() {
              // validation
            if (this.input.ProductID == undefined) { this.sendSnackbar("Warning", "Please Select Product", this._otherTimeout); return false; }

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                SessionID: this._sessionid,
                FormID: this.formid,

                IDX_M_Product: this.input.idx_m_product,
                IDX_T_SalesOrderHeader: this.input.idx_sbp,
                IDX_T_RetentionLetter: this.input.IDX_T_RetentionLetter,
                LetterNo: this.input.LetterNo,
                DateLetter: this.input.DateLetter,
                Subject: this.input.subject,
                RetentionPeriod: this.input.RetentionPeriod,
                Location: this.input.location,
                StartTime: this.input.StartTime,
                EndTime: this.input.EndTime,
                Notes: this.input.notes,
                
               
            };
            console.log(id);
            // push
            arrayList.push(id);
            
            return this.ajaxGo('POST', this._handover + "/retention-letter-edit", arrayList, this._savingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};

                    self.closeDialog('dialog1');
                    //self.$router.push('/' + self._sessionid + '/handover-letter');
                    // console.log('/' + self._sessionid + '/handover-construction');
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

        approveData(param) {
             // validation
            if (this.input.ApprovalNotes == undefined) { this.sendSnackbar("Warning", "Please Input Notes", this._otherTimeout); return false; }

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                SessionID: this._sessionid,
                FormID: this.formid,

                IDX_T_RetentionLetter : this.input.IDX_T_RetentionLetter,
                Courier : this.input.courier,
                ResiNo : this.input.ResiNo,
                SentDate : this.input.SentDate,
                ApprovalNotes : this.input.ApprovalNotes,
                FlagSent : param
            };

            // push
            arrayList.push(id);
            
            
            return this.ajaxGo('POST', this._handover + "/retention-letter-approve", arrayList, this._savingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};
                    self.closeDialog('dialog1');
                    self.loadPage();

                    
                    // console.log('/' + self._sessionid + '/handover-construction');
                 }
            });
        },

        sentData(param, data) {
               // validation
            // if (this.input.ApprovalNotes == undefined) { this.sendSnackbar("Warning", "Please Input Notes", this._otherTimeout); return false; }

            // declare
            let self = this;
            let arrayList = [];

            // prepare
            let id = {
                SessionID: this._sessionid,
                FormID: this.formid,

                IDX_T_RetentionLetter : data.IDX_T_RetentionLetter,
                Courier : null,
                ResiNo : null,
                SentDate : null,
                ApprovalNotes : null,
                FlagSent : param
            };

            // push
            arrayList.push(id);
            
            
            return this.ajaxGo('POST', this._handover + "/retention-letter-approve", arrayList, this._savingLoader, this._withData, this._withSnackBar).then(function(data) {
                if (self.ajaxCheckReturn(data)) {
                    self.input = {};
                    // self.closeDialog('dialog1');
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

                if (type == "Add") {
                    this.input.button1 = "Save";
                    this.dialog1 = true;
                }
                else if (type == "Edit") {
                    this.input.button1 = "Update";
                    // console.log(data);
                    this.input.IDX_T_RetentionLetter = data.IDX_T_RetentionLetter;
                    this.loadRetentionLetter().then(() => { this.dialog1 = true;  });
                    // this.dialog1 = true;
                }
                else if (type == "Info") {
                    this.input.IDX_T_RetentionLetter = data.IDX_T_RetentionLetter;
                    //this.input = {};
                    this.loadRetentionLetter().then(() => { this.dialog1 = true; });
                    //this.dialog1 = true;

                }
                else if (type == "Approve") {
                    this.input.IDX_T_RetentionLetter = data.IDX_T_RetentionLetter;
                    //this.input = {};
                    this.loadRetentionLetter().then(() => { this.dialog1 = true; });
                    //this.dialog1 = true;

                }
                else if (type == "Sent") {
                    this.input.IDX_T_RetentionLetter = data.IDX_T_RetentionLetter;
                    //this.input = {};
                    this.loadRetentionLetter().then(() => { this.dialog1 = true; });
                    //this.dialog1 = true;

                }
            }
            else if (param == 'dialog2') {
                this.input.dialogtitle2 = 'Pilih Produk';
                this.loadAdditionaList();

                 if (type == "Add") {
                    this.input.button1 = "Save";
                    this.dialog2 = true;
                }
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
            window.open('http://10.10.0.51:9014/web/handover/retention-letterprint?id=' + id + '&&sessionid=' + this._sessionid + '&&formid=' + this.formid);
        }
    }
}
</script>

<style>

</style>
