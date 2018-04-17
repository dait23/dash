import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import SidebarMerchant from '../../components/SidebarMerchant/';
import Breadcrumb from '../../components/Breadcrumb/';
//import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import DashboardMerchant from '../../views/Dashboard/Merchant';
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
// import Area from '../../views/Setting/Area/All/'
// import NewArea from '../../views/Setting/Area/New/'
// import EditArea from '../../views/Setting/Area/Edit/'

// ////Event Type
// import Event from '../../views/Setting/Event/All/'
// import NewEvent from '../../views/Setting/Event/New/'
// import EditEvent from '../../views/Setting/Event/Edit/'

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



////Brand
import Brand from '../../views/Brand/All/'
import NewBrand from '../../views/Brand/New/'
import EditBrand from '../../views/Brand/Edit/'
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

////Iquiry
import Place from '../../views/Place/All/'
import NewPlace from '../../views/Place/New/'
import EditPlace from '../../views/Place/Edit/'

////Request
import Request from '../../views/Request/All/'
import NewRequest from '../../views/Request/New/'
//import EditRequest from '../../views/Request/Edit/'

class FullMerchant extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <SidebarMerchant {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={DashboardMerchant}/>
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
                <Route path="/setting/brand-type/all" name="Brand" component={BrandType}/>
                <Route path="/setting/brand-type/new" name="New" component={NewBrandType}/>
                <Route path="/setting/brand-type/edit/:id" name="Edit" component={EditBrandType}/>
                <Route path="/setting/brand-category/all" name="category" component={BrandCategory}/>
                <Route path="/setting/brand-category/new" name="New" component={NewBrandCategory}/>
                <Route path="/setting/brand-category/edit/:id" name="New" component={EditBrandCategory}/>
                <Route path="/place/all" name="All" component={Place}/>
                <Route path="/place/new" name="New" component={NewPlace}/>
                <Route path="/place/edit/:id" name="Edit" component={EditPlace} />
                  <Route path="/request/all" name="All" component={Request}/>
                 <Route path="/request/new" name="New" component={NewRequest}/>
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

export default FullMerchant;
