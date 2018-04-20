import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable'
import Loading from './Loading'
import fakeDelay from './fakeDelay'
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import SidebarMdm from '../../components/SidebarMdm/';
import Breadcrumb from '../../components/Breadcrumb/';
//import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import DashboardMdm from '../../views/Dashboard/Mdm';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';
import Buttons from '../../views/Components/Buttons/';
import Cards from '../../views/Components/Cards/';
import Forms from '../../views/Components/Forms/';
import Modals from '../../views/Components/Modals/';
import SocialButtons from '../../views/Components/SocialButtons/';
import Switches from '../../views/Components/Switches/';
import Tables from '../../views/Components/Tables/';
import Tabs from '../../views/Components/Tabs/';
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';


// //////////////////Spazeee

// import Meta from '../../views/Setting/Meta/'
// ////AREA
import Area from '../../views/Setting/Area/All/'
import NewArea from '../../views/Setting/Area/New/'
import EditArea from '../../views/Setting/Area/Edit/'

////Event Type
import Event from '../../views/Setting/Event/All/'
import NewEvent from '../../views/Setting/Event/New/'
import EditEvent from '../../views/Setting/Event/Edit/'

// ////Event Type
// import Employment from '../../views/Setting/Employment/All/'
// import NewEmployment from '../../views/Setting/Employment/New/'
// import EditEmployment from '../../views/Setting/Employment/Edit/'

// ////Bank
// import Bank from '../../views/Setting/Bank/All/'
// import NewBank from '../../views/Setting/Bank/New/'
// import EditBank from '../../views/Setting/Bank/Edit/'


// ////PAyment Type
// import Payment from '../../views/Setting/Payment/All/'
// import NewPayment from '../../views/Setting/Payment/New/'
// import EditPayment from '../../views/Setting/Payment/Edit/'

// ////PAyment Type
// import Notif from '../../views/Setting/Notif/All/'
// import NewNotif from '../../views/Setting/Notif/New/'
// import EditNotif from '../../views/Setting/Notif/Edit/'


////Brand Type
import BrandType from '../../views/Setting/Brand/All/'
import NewBrandType from '../../views/Setting/Brand/New/'
import EditBrandType from '../../views/Setting/Brand/Edit/'

////Brand Category
import BrandCategory from '../../views/Setting/BrandCat/All/'
import NewBrandCategory from '../../views/Setting/BrandCat/New/'
import EditBrandCategory from '../../views/Setting/BrandCat/Edit/'

////Main Category Brand
import Category from '../../views/Setting/Category/All/'
import NewCategory from '../../views/Setting/Category/New/'
import EditCategory from '../../views/Setting/Category/Edit/'


// ////Category Partners
// import CategoryPartners from '../../views/Setting/PartnerCat/All/'
// import NewCategoryPartners from '../../views/Setting/PartnerCat/New/'
// import EditCategoryPartners from '../../views/Setting/PartnerCat/Edit/'

// ////Facility Partners
// import Facility from '../../views/Setting/Facility/All/'
// import NewFacility from '../../views/Setting/Facility/New/'
// import EditFacility from '../../views/Setting/Facility/Edit/'

// ////Visitor Type
// import Visitor from '../../views/Setting/Visitor/All/'
// import NewVisitor from '../../views/Setting/Visitor/New/'
// import EditVisitor from '../../views/Setting/Visitor/Edit/'


// ////BAnner
// import Banner from '../../views/Banner/All/'
// import NewBanner from '../../views/Banner/New/'
// import EditBanner from '../../views/Banner/Edit/'


// ////Pages
// import Page from '../../views/Pages/Static/All/'
// import NewPage from '../../views/Pages/Static/New/'
// import EditPage from '../../views/Pages/Static/Edit/'


// ////MDM
// import Mdm from '../../views/Mdm/All/'
// import NewMdm from '../../views/Mdm/New/'
// import EditMdm from '../../views/Mdm/Edit/'


// ////BDE
// import Bde from '../../views/Bde/All/'
// import NewBde from '../../views/Bde/New/'
// import EditBde from '../../views/Bde/Edit/'


// ////Merchant
// import Merchant from '../../views/Merchant/All/'
// import NewMerchant from '../../views/Merchant/New/'
//import EditMerchant from '../../views/Merchant/Edit/'

////Brand
// import Brand from '../../views/Brand/Mdm/'
// import NewBrand from '../../views/Brand/New/'
// import EditBrand from '../../views/Brand/Edit/'



////Request
// import Partners from '../../views/Partners/All/'
// import NewPartners from '../../views/Partners/New/'
// import EditPartners from '../../views/Partners/Edit/'




////Invoice
import Invoice from '../../views/Invoice/All/'
import NewInvoice from '../../views/Invoice/New/'
//import EditInvoice from '../../views/Invoice/Edit/'

////Iquiry
import Inquiry from '../../views/Inquiry/All/'
import NewInquiry from '../../views/Inquiry/New/'
import EditInquiry from '../../views/Inquiry/Edit/'


////Workflow
import Workflow from '../../views/Workflow/All/'
import NewWorkflow from '../../views/Workflow/New/'
//import EditWorkflow from '../../views/Workflow/Edit/'



////Request
import Request from '../../views/Request/All/'
import NewRequest from '../../views/Request/New/'
import EditRequest from '../../views/Request/Edit/'


////Teams
import MdmTeam from '../../views/Teams/Mdm/All/'
import MdmPerformance from '../../views/Teams/Mdm/Performance/'



const Brand = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Brand/Mdm/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewBrand = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Brand/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditBrand = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Brand/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});
/////////////////////////////////////////////


const Partners = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Partners/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewPartners = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Partners/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditPartners = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Partners/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const AddSpace = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Partners/Space/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const AddEditSpace = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Partners/SpaceEdit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});



const Collabs = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Collab/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewCollabs = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Collab/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditCollabs = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Collab/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

///////////////////////////size

const Size = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Size/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewSize = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Size/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditSize = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Size/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

///////////////visitor

const Visitor = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Visitor/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewVisitor = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Visitor/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditVisitor = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Visitor/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const Facility = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Facility/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewFacility = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Facility/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditFacility = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Facility/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

//////////////////catpart
const CategoryPartners = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/PartnerCat/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewCategoryPartners = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/PartnerCat/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditCategoryPartners = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/PartnerCat/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Inclusion = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Inclusion/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewInclusion = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Inclusion/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditInclusion = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Inclusion/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const Exclusion = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Exclusion/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewExclusion = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Exclusion/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditExclusion = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Exclusion/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

class FullMdm extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <SidebarMdm {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={DashboardMdm}/>
                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                <Route path="/components/cards" name="Cards" component={Cards}/>
                <Route path="/components/forms" name="Forms" component={Forms}/>
                <Route path="/components/modals" name="Modals" component={Modals}/>
                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/components/switches" name="Swithces" component={Switches}/>
                <Route path="/components/tables" name="Tables" component={Tables}/>
                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/charts" name="Charts" component={Charts}/>
                <Route path="/brand/all" name="All" component={Brand}/>
                <Route path="/brand/new" name="New" component={NewBrand}/>
                <Route path="/brand/edit/:id" name="Edit" component={EditBrand}/>
                <Route path="/invoice/all" name="All" component={Invoice}/>
                <Route path="/invoice/new" name="All" component={NewInvoice}/>
                <Route path="/inquiry/all" name="All" component={Inquiry}/>
                <Route path="/inquiry/new" name="All" component={NewInquiry}/>
                <Route path="/inquiry/edit/:id" name="Edit" component={EditInquiry} />
                <Route path="/mdm-workflow/all" name="All" component={Workflow}/>
                <Route path="/mdm-workflow/new" name="New" component={NewWorkflow}/>
                 <Route path="/request/all" name="All" component={Request}/>
                <Route path="/request/new" name="New" component={NewRequest}/>
                <Route path="/request/edit/:id" name="Edit" component={EditRequest} />
                <Route path="/setting/area/all" name="Area" component={Area}/>
                <Route path="/setting/area/new" name="New" component={NewArea}/>
                <Route path="/setting/category/all" name="Category" component={Category}/>
                <Route path="/setting/category/new" name="New" component={NewCategory}/>
                <Route path="/setting/category/edit/:id" name="Edit" component={EditCategory}/>
                <Route path="/setting/area/edit/:id" name="Edit" component={EditArea}/>
                <Route path="/setting/event-type/all" name="event" component={Event}/>
                <Route path="/setting/event-type/new" name="new" component={NewEvent}/>
                <Route path="/setting/event-type/edit/:id" name="Edit" component={EditEvent}/>
                <Route path="/setting/brand-type/all" name="Brand" component={BrandType}/>
                <Route path="/setting/brand-type/new" name="New" component={NewBrandType}/>
                <Route path="/setting/brand-type/edit/:id" name="Edit" component={EditBrandType}/>
                <Route path="/setting/brand-category/all" name="category" component={BrandCategory}/>
                <Route path="/setting/brand-category/new" name="New" component={NewBrandCategory}/>
                <Route path="/setting/brand-category/edit/:id" name="New" component={EditBrandCategory}/>
                <Route path="/partners/all" name="All" component={Partners}/>
                <Route path="/partners/new" name="New" component={NewPartners}/>
                <Route path="/partners/edit/:id" name="Edit" component={EditPartners} />

                <Route path="/partners/space/:id" name="Add Sapce" component={AddSpace} />
                <Route path="/partners/space-edit/:id" name="Edit" component={AddEditSpace} />
                <Route path="/mdm-team/all" name="Team" component={MdmTeam}/>
                 <Route path="/mdm-team/performance" name="Team performance" component={MdmPerformance}/>

                <Route path="/setting/collabs/all" name="All" component={Collabs}/>
                <Route path="/setting/collabs/new" name="New" component={NewCollabs}/>
                <Route path="/setting/collabs/edit/:id" name="Edit" component={EditCollabs}/>
                 <Route path="/setting/size/all" name="Size" component={Size}/>
                <Route path="/setting/size/new" name="New" component={NewSize}/>
                <Route path="/setting/size/edit/:id" name="Edit" component={EditSize}/>
                 <Route path="/setting/visitor-type/all" name="Visitor" component={Visitor}/>
                <Route path="/setting/visitor-type/new" name="New" component={NewVisitor}/>
                <Route path="/setting/visitor-type/edit/:id" name="Edit" component={EditVisitor}/>
                <Route path="/setting/facility-partners/all" name="Facility" component={Facility}/>
                <Route path="/setting/facility-partners/new" name="New" component={NewFacility}/>
                <Route path="/setting/facility-partners/edit/:id" name="Edit" component={EditFacility}/>
                <Route path="/setting/category-partners/all" name="category" component={CategoryPartners}/>
                <Route path="/setting/category-partners/new" name="New" component={NewCategoryPartners}/>
                <Route path="/setting/category-partners/edit/:id" name="New" component={EditCategoryPartners}/>

                
                <Route path="/setting/inclusion/all" name="Size" component={Inclusion}/>
                <Route path="/setting/inclusion/new" name="New" component={NewInclusion}/>
                <Route path="/setting/inclusion/edit/:id" name="Edit" component={EditInclusion}/>

                <Route path="/setting/exclusion/all" name="Size" component={Exclusion}/>
                <Route path="/setting/exclusion/new" name="New" component={NewExclusion}/>
                <Route path="/setting/exclusion/edit/:id" name="Edit" component={EditExclusion}/>

                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default FullMdm;
