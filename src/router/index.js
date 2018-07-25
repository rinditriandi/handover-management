import Vue from 'vue'
import Router from 'vue-router'


// Dashboard
import Dashboard from '@/components/_Dashboard/Dashboard'


// Master
import AddressType from '@/components/_Master/AddressType/AddressType'


// Transaction
import HandoverLetter from '@/components/_Transaction/Handover/HandoverLetter'
import HandoverConstruction from '@/components/_Transaction/Handover/HandoverConstruction'
import HandoverConstructionForm from '@/components/_Transaction/Handover/HandoverConstructionForm'
import HomeCheckingLetter from '@/components/_Transaction/Handover/HomeCheckingLetter'
import UnilateralLetter from '@/components/_Transaction/Handover/UnilateralLetter'
import RetentionLetter from '@/components/_Transaction/Handover/RetentionLetter'
import TakingPBBLetter from '@/components/_Transaction/Handover/TakingPBBLetter'
import HandoverLetter2 from '@/components/_Transaction/Handover/HandoverLetter2'

import InvitationLetter from '@/components/_Transaction/InvitationLetter/InvitationLetter'



import ConstructionProgress from '@/components/_Transaction/Construction/ConstructionProgress'
import ConstructionProgressForm from '@/components/_Transaction/Construction/ConstructionProgressForm'



// Report


// Others
import _404 from '@/components/_Others/_404'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/handover',
    routes: [
        // dashboard
        { path: '/:sessionid/dashboard', name: 'Dashboard', component: Dashboard },
        

        // master
        { path: '/:sessionid/address-type', name: 'AddressType', component: AddressType },

        // transaction
        { path: '/:sessionid/handover-letter', name: 'HandoverLetter', component: HandoverLetter },
        { path: '/:sessionid/handover-construction', name: 'HandoverConstruction', component: HandoverConstruction },
        { path: '/:sessionid/handover-construction-form', name: 'HandoverConstructionForm', component: HandoverConstructionForm },
        { path: '/:sessionid/construction-progress', name: 'ConstructionProgress', component: ConstructionProgress },
        { path: '/:sessionid/construction-progress-form', name: 'ConstructionProgressForm', component: ConstructionProgressForm },
        { path: '/:sessionid/home-checking-letter', name: 'HomeCheckingLetter', component: HomeCheckingLetter },
        { path: '/:sessionid/unilateral-letter', name: 'UnilateralLetter', component: UnilateralLetter },
        { path: '/:sessionid/retention-letter', name: 'RetentionLetter', component: RetentionLetter },
        { path: '/:sessionid/pbb-letter', name: 'TakingPBBLetter', component: TakingPBBLetter },
        { path: '/:sessionid/handover-letter2', name: 'TakingPBBLetter', component: HandoverLetter2 },
        { path: '/:sessionid/invitation-letter', name: 'InvitationLetter', component: InvitationLetter },

        
        // report
        

        // others
        //{ path: '/404', name: '_404', component: _404 },
        { path: '*', name: '_404', component: _404 },
    ]
})
