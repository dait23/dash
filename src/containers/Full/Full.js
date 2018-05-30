import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable'
import Loading from './Loading'
import fakeDelay from './fakeDelay'
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
//import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
// import Charts from '../../views/Charts/';
// import Widgets from '../../views/Widgets/';
// import Buttons from '../../views/Components/Buttons/';
// import Cards from '../../views/Components/Cards/';
// import Forms from '../../views/Components/Forms/';
// import Modals from '../../views/Components/Modals/';
// import SocialButtons from '../../views/Components/SocialButtons/';
// import Switches from '../../views/Components/Switches/';
// import Tables from '../../views/Components/Tables/';
// import Tabs from '../../views/Components/Tabs/';
// import FontAwesome from '../../views/Icons/FontAwesome/';
// import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';


//////////////////Spazeee





// import Meta from '../../views/Setting/Meta/'
////AREA
// import Area from '../../views/Setting/Area/All/'
// import NewArea from '../../views/Setting/Area/New/'
// import EditArea from '../../views/Setting/Area/Edit/'




////Event Type
// import Event from '../../views/Setting/Event/All/'
// import NewEvent from '../../views/Setting/Event/New/'
// import EditEvent from '../../views/Setting/Event/Edit/'




// ////Event Type
// import Employment from '../../views/Setting/Employment/All/'
// import NewEmployment from '../../views/Setting/Employment/New/'
// import EditEmployment from '../../views/Setting/Employment/Edit/'



////Bank
// import Bank from '../../views/Setting/Bank/All/'
// import NewBank from '../../views/Setting/Bank/New/'
// import EditBank from '../../views/Setting/Bank/Edit/'




////PAyment Type
// import Payment from '../../views/Setting/Payment/All/'
// import NewPayment from '../../views/Setting/Payment/New/'
// import EditPayment from '../../views/Setting/Payment/Edit/'



// ////PAyment Type
// import Notif from '../../views/Setting/Notif/All/'
// import NewNotif from '../../views/Setting/Notif/New/'
// import EditNotif from '../../views/Setting/Notif/Edit/'




// ////Brand Type
// import BrandType from '../../views/Setting/Brand/All/'
// import NewBrandType from '../../views/Setting/Brand/New/'
// import EditBrandType from '../../views/Setting/Brand/Edit/'



// ////Brand Category
// import BrandCategory from '../../views/Setting/BrandCat/All/'
// import NewBrandCategory from '../../views/Setting/BrandCat/New/'
// import EditBrandCategory from '../../views/Setting/BrandCat/Edit/'




// ////Main Category Brand
// import Category from '../../views/Setting/Category/All/'
// import NewCategory from '../../views/Setting/Category/New/'
// import EditCategory from '../../views/Setting/Category/Edit/'




////Category Partners
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




////Visitor Type
// import Size from '../../views/Setting/Size/All/'
// import NewSize from '../../views/Setting/Size/New/'
// import EditSize from '../../views/Setting/Size/Edit/'




////BAnner
// import Banner from '../../views/Banner/All/'
// import NewBanner from '../../views/Banner/New/'
// import EditBanner from '../../views/Banner/Edit/'




////Pages
// import Page from '../../views/Pages/Static/All/'
// import NewPage from '../../views/Pages/Static/New/'
// import EditPage from '../../views/Pages/Static/Edit/'



// ////MDM
// import Mdm from '../../views/Mdm/All/'
// import NewMdm from '../../views/Mdm/New/'
// import EditMdm from '../../views/Mdm/Edit/'



// ////Member
// import Members from '../../views/Member/All/'
// import NewMember from '../../views/Member/New/'
// import EditMember from '../../views/Member/Edit/'




////BDE
// import Bde from '../../views/Bde/All/'
// import NewBde from '../../views/Bde/New/'
// import EditBde from '../../views/Bde/Edit/'





////Merchant
import Merchant from '../../views/Merchant/All/'
import NewMerchant from '../../views/Merchant/New/'
import EditMerchant from '../../views/Merchant/Edit/'


// ////Brand
// import Brand from '../../views/Brand/All/'
// import NewBrand from '../../views/Brand/New/'
// import EditBrand from '../../views/Brand/Edit/'






////Invoice
import Invoice from '../../views/Invoice/All/'
import NewInvoice from '../../views/Invoice/New/'
import EditInvoice from '../../views/Invoice/Edit/'


////Iquiry
import Inquiry from '../../views/Inquiry/All/'
import NewInquiry from '../../views/Inquiry/New/'
import EditInquiry from '../../views/Inquiry/Edit/'
//import ViewInquiry from '../../views/Inquiry/View/'

////Iquiry
import Place from '../../views/Place/All/'
import NewPlace from '../../views/Place/New/'
import EditPlace from '../../views/Place/Edit/'

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


////Request
// import Partners from '../../views/Partners/All/'
// import NewPartners from '../../views/Partners/New/'
// import EditPartners from '../../views/Partners/Edit/'





////Space
import Spaces from '../../views/Spaces/All/'
// import NewPartners from '../../views/Partners/New/'
// import EditPartners from '../../views/Partners/Edit/'

// import AddSpace from '../../views/Partners/Space/'

// import AddEditSpace from '../../views/Partners/SpaceEdit/'







////Event Collabs
import Collabs from '../../views/Setting/Collab/All/'
import NewCollabs from '../../views/Setting/Collab/New/'
import EditCollabs from '../../views/Setting/Collab/Edit/'


const Meta = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Meta/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Area = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Area/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewArea = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Area/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditArea = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Area/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Event = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Event/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const NewEvent = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Event/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditEvent = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Event/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const Employment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Employment/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const NewEmployment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Employment/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditEmployment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Employment/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});



const Bank = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Bank/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const NewBank = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Bank/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditBank = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Bank/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const Payment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Payment/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const NewPayment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Payment/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditPayment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Payment/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const Notif = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Notif/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const NewNotif = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Notif/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditNotif = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Notif/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});



const BrandType = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Brand/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const NewBrandType = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Brand/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditBrandType = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Brand/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const BrandCategory = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/BrandCat/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewBrandCategory = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/BrandCat/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditBrandCategory = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/BrandCat/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Category = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Category/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewCategory = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Category/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditCategory = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Category/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


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

const Banner = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Banner/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewBanner = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Banner/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditBanner = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Banner/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Page = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Pages/Static/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewPage = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Pages/Static/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditPage = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Pages/Static/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Mdm = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Mdm/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewMdm = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Mdm/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditMdm = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Mdm/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Members = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Member/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewMember = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Member/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditMember = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Member/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const Bde = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Bde/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewBde = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Bde/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditBde = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Bde/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Brand = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Brand/All/')),
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


const AddGallery = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Partners/Gallery/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const AddEditSpace = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Partners/SpaceEdit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const AddEditGallery = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Partners/GalEdit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const Rent = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Rent/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewRent = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Rent/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditRent = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Rent/Edit/')),
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

///////////////

const MainCategory = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/MainCategory/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewMainCategory = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/MainCategory/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditMainCategory = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/MainCategory/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Segment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Segment/All/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const NewSegment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Segment/New/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const EditSegment = Loadable({
 loader: () => fakeDelay(500).then(() => import('../../views/Setting/Segment/Edit/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/setting/meta" name="Meta" component={Meta}/>
                <Route path="/setting/area/all" name="Area" component={Area}/>
                <Route path="/setting/area/new" name="New" component={NewArea}/>
                <Route path="/setting/category/all" name="Category" component={Category}/>
                <Route path="/setting/category/new" name="New" component={NewCategory}/>
                <Route path="/setting/category/edit/:id" name="Edit" component={EditCategory}/>
                <Route path="/setting/area/edit/:id" name="Edit" component={EditArea}/>
                <Route path="/setting/event-type/all" name="event" component={Event}/>
                <Route path="/setting/event-type/new" name="new" component={NewEvent}/>
                <Route path="/setting/event-type/edit/:id" name="Edit" component={EditEvent}/>
                <Route path="/setting/employment/all" name="employment" component={Employment}/>
                <Route path="/setting/employment/new" name="employment" component={NewEmployment}/>
                <Route path="/setting/employment/edit/:id" name="Edit" component={EditEmployment}/>
                <Route path="/setting/bank/all" name="Bank" component={Bank}/>
                <Route path="/setting/bank/new" name="New" component={NewBank}/>
                <Route path="/setting/bank/edit/:id" name="New" component={EditBank}/>
                <Route path="/setting/payment/all" name="Payment" component={Payment}/>
                <Route path="/setting/payment/new" name="New" component={NewPayment}/>
                <Route path="/setting/payment/edit/:id" name="Edit" component={EditPayment}/>
                <Route path="/setting/notif-type/all" name="notif" component={Notif}/>
                <Route path="/setting/notif-type/new" name="New" component={NewNotif}/>
                <Route path="/setting/notif-type/edit/:id" name="Edit" component={EditNotif}/>
                <Route path="/setting/brand-type/all" name="Brand" component={BrandType}/>
                <Route path="/setting/brand-type/new" name="New" component={NewBrandType}/>
                <Route path="/setting/brand-type/edit/:id" name="Edit" component={EditBrandType}/>
                <Route path="/setting/brand-category/all" name="category" component={BrandCategory}/>
                <Route path="/setting/brand-category/new" name="New" component={NewBrandCategory}/>
                <Route path="/setting/brand-category/edit/:id" name="New" component={EditBrandCategory}/>
                <Route path="/setting/category-partners/all" name="category" component={CategoryPartners}/>
                <Route path="/setting/category-partners/new" name="New" component={NewCategoryPartners}/>
                <Route path="/setting/category-partners/edit/:id" name="New" component={EditCategoryPartners}/>
                <Route path="/setting/facility-partners/all" name="Facility" component={Facility}/>
                <Route path="/setting/facility-partners/new" name="New" component={NewFacility}/>
                <Route path="/setting/facility-partners/edit/:id" name="Edit" component={EditFacility}/>
                <Route path="/setting/visitor-type/all" name="Visitor" component={Visitor}/>
                <Route path="/setting/visitor-type/new" name="New" component={NewVisitor}/>
                <Route path="/setting/visitor-type/edit/:id" name="Edit" component={EditVisitor}/>
                <Route path="/setting/size/all" name="Size" component={Size}/>
                <Route path="/setting/size/new" name="New" component={NewSize}/>
                <Route path="/setting/size/edit/:id" name="Edit" component={EditSize}/>
                <Route path="/setting/collabs/all" name="All" component={Collabs}/>
                <Route path="/setting/collabs/new" name="New" component={NewCollabs}/>
                <Route path="/setting/collabs/edit/:id" name="Edit" component={EditCollabs}/>
                <Route path="/banner/all" name="Banner" component={Banner}/>
                <Route path="/banner/new" name="Banner" component={NewBanner}/>
                <Route path="/banner/edit/:id" name="Edit" component={EditBanner}/>
                <Route path="/mdm/all" name="Mdm" component={Mdm}/>
                <Route path="/mdm/new" name="New" component={NewMdm}/>
                <Route path="/mdm/edit/:id" name="Edit" component={EditMdm}/>
                <Route path="/page/all" name="Page" component={Page}/>
                <Route path="/page/new" name="New" component={NewPage}/>
                <Route path="/page/edit/:id" name="Edit" component={EditPage}/>
                <Route path="/bde/all" name="Bde" component={Bde}/>
                <Route path="/bde/new" name="New" component={NewBde}/>
                <Route path="/bde/edit/:id" name="Edit" component={EditBde}/>
                <Route path="/merchant/all" name="Merchant" component={Merchant}/>
                <Route path="/merchant/new" name="New" component={NewMerchant}/>
                <Route path="/merchant/edit/:id" name="Edit" component={EditMerchant}/>
                <Route path="/brand/all" name="All" component={Brand}/>
                <Route path="/brand/new" name="New" component={NewBrand}/>
                <Route path="/brand/edit/:id" name="Edit" component={EditBrand}/>
                <Route path="/invoice/all" name="All" component={Invoice}/>
                <Route path="/invoice/new" name="All" component={NewInvoice}/>
                <Route path="/invoice/edit/:id" name="Edit" component={EditInvoice} />
                <Route path="/inquiry/all" name="All" component={Inquiry}/>
                <Route path="/inquiry/new" name="All" component={NewInquiry}/>
                <Route path="/inquiry/edit/:id" name="Edit" component={EditInquiry} />
                <Route path="/place/all" name="All" component={Place}/>
                <Route path="/place/new" name="New" component={NewPlace}/>
                <Route path="/place/edit/:id" name="Edit" component={EditPlace} />
                <Route path="/mdm-workflow/all" name="All" component={Workflow}/>
                <Route path="/mdm-workflow/new" name="New" component={NewWorkflow}/>
                <Route path="/request/all" name="All" component={Request}/>
                <Route path="/request/new" name="New" component={NewRequest}/>
                <Route path="/request/edit/:id" name="Edit" component={EditRequest} />
                <Route path="/mdm-team/all" name="Team" component={MdmTeam}/>
                <Route path="/mdm-team/performance" name="Team performance" component={MdmPerformance}/>
                <Route path="/partners/all" name="All" component={Partners}/>
                <Route path="/partners/new" name="New" component={NewPartners}/>
                 <Route path="/partners/edit/:id" name="Edit" component={EditPartners} />

                <Route path="/partners/space/:id" name="Add Sapce" component={AddSpace} />
                <Route path="/partners/gallery/:id" name="Add Gallery" component={AddGallery} />
                <Route path="/partners/gallery-edit/:id" name="Edit Gallery" component={AddEditGallery} />
                <Route path="/partners/space-edit/:id" name="Edit" component={AddEditSpace} />

                <Route path="/member/all" name="Member" component={Members}/>
                <Route path="/member/new" name="New" component={NewMember}/>
                <Route path="/member/edit/:id" name="Edit" component={EditMember} />


                <Route path="/setting/rent-type/all" name="Size" component={Rent}/>
                <Route path="/setting/rent-type/new" name="New" component={NewRent}/>
                <Route path="/setting/rent-type/edit/:id" name="Edit" component={EditRent}/>

                <Route path="/setting/inclusion/all" name="Size" component={Inclusion}/>
                <Route path="/setting/inclusion/new" name="New" component={NewInclusion}/>
                <Route path="/setting/inclusion/edit/:id" name="Edit" component={EditInclusion}/>

                <Route path="/setting/exclusion/all" name="Size" component={Exclusion}/>
                <Route path="/setting/exclusion/new" name="New" component={NewExclusion}/>
                <Route path="/setting/exclusion/edit/:id" name="Edit" component={EditExclusion}/>


                 <Route path="/setting/main-category/all" name="MainCategory" component={MainCategory}/>
                  <Route path="/setting/main-category/new" name="New" component={NewMainCategory}/>
                  <Route path="/setting/main-category/edit/:id" name="Edit" component={EditMainCategory}/>

                  <Route path="/setting/segment/all" name="All" component={Segment}/>
                  <Route path="/setting/segment/new" name="New" component={NewSegment}/>
                  <Route path="/setting/segment/edit/:id" name="Edit" component={EditSegment}/>

                <Route path="/spaces/all" name="All" component={Spaces}/>

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

export default Full;
