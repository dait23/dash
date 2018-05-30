const routes = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/components': 'Components',
  '/charts': 'Charts',
  '/components/buttons': 'Buttons',
  '/components/social-buttons': 'Social Buttons',
  '/components/cards': 'Cards',
  '/components/forms': 'Forms',
  '/components/modals': 'Modals',
  '/components/switches': 'Switches',
  '/components/tables': 'Tables',
  '/components/tabs': 'Tabs',
  '/icons': 'Icons',
  '/icons/font-awesome': 'Font Awesome',
  '/icons/simple-line-icons': 'Simple Line Icons',
  '/widgets': 'Widgets',
  '/banner': 'Banner',
  '/banner/all': 'All Banner ',
  '/banner/new': 'New Banner',
  '/banner/edit': 'Edit',
  '/banner/edit/:id': 'Edit Detail',
  '/page': 'Page',
  '/page/all': 'All Page',
  '/page/new': 'New Page',
  '/page/edit': 'Edit Page',
  '/plugin': 'Plugin',
  '/plugin/google': 'Google',
  '/plugin/mailchimp': 'Mailchimp',
  '/plugin/cloudinary': 'Cloudinary',
  '/plugin/mailgun': 'Mailgun',
  '/plugin/sendgrid': 'Sendgrid',
  '/plugin/amazon': 'Amazon',
  '/setting': 'Setting',
  '/profile': 'Profile',
  '/setting/meta': 'Meta',
  '/setting/user/all': 'All User',
  '/setting/user/new': 'New',
  '/setting/user/edit': 'Edit',
  '/setting/user/edit/:id': 'Edit Detail',
  '/setting/product-type/all': 'All',
  '/setting/product-type/new': 'New',
  '/setting/product-type/edit': 'Edit',
  '/setting/product-type/edit/:id': 'Edit',
  '/setting/visitor-type/all': 'All Visitor Type',
  '/setting/visitor-type/new': 'New',
  '/setting/visitor-type/edit': 'Edit',
  '/setting/visitor-type/edit/:id': 'Edit',
  '/setting/business-category/all': 'All',
  '/setting/business-category/new': 'New',
  '/setting/business-category/edit': 'Edit',
  '/setting/business-category/edit/:id': 'Edit Detail',
  '/setting/facility-partners/all': 'All Facility Partners',
  '/setting/facility-partners/new': 'New',
  '/setting/facility-partners/edit': 'Edit',
  '/setting/facility-partners/edit/:id': 'Edit Detail',
  '/setting/category-partners/all': 'All Category Partners',
  '/setting/category-partners/new': 'New',
  '/setting/category-partners/edit': 'Edit',
  '/setting/category-partners/edit/:id': 'Edit Detail',
  '/setting/area/all': 'All Area',
  '/setting/area/new': 'New',
  '/setting/area/edit': 'Edit',
  '/setting/category/all': 'All Main Category',
  '/setting/category/new': 'New',
  '/setting/category/edit': 'Edit',
  '/setting/category/edit/:id': 'Edit Detail',
  '/setting/main-category/all': 'All Main Category',
  '/setting/main-category/new': 'New',
  '/setting/main-category/edit': 'Edit',
  '/setting/main-category/edit/:id': 'Edit Detail',
  '/setting/brand-category/all': 'All Brand Category',
  '/setting/brand-category/new': 'New ',
  '/setting/brand-category/edit': 'Edit',
  '/setting/brand-category/edit/:id': 'Edit Detail',
  '/setting/brand-type/all': 'All Brand Type',
  '/setting/brand-type/new': 'New ',
  '/setting/brand-type/edit': 'Edit',
  '/setting/brand-type/edit/:id': 'Edit Detail',
  '/setting/event-type/all': 'All Event Type',
  '/setting/event-type/new': 'New ',
  '/setting/event-type/edit': 'Edit',
  '/setting/event-type/edit/:id': 'Edit Detail',
  '/setting/notif-type/all': 'All Notification Type',
  '/setting/notif-type/new': 'New ',
  '/setting/notif-type/edit': 'Edit',
  '/setting/notif-type/edit/:id': 'Edit Detail',
  '/setting/employment/all': 'All Employment',
  '/setting/employment/new': 'New ',
  '/setting/employment/edit': 'Edit',
  '/setting/employment/edit/:id': 'Edit Detail',
  '/setting/payment/all': 'All Payment',
  '/setting/payment/new': 'New ',
  '/setting/payment/edit': 'Edit',
  '/setting/payment/edit/:id': 'Edit Detail',
  '/setting/bank/all': 'All Bank',
  '/setting/bank/new': 'New ',
  '/setting/bank/edit': 'Edit',
  '/setting/bank/edit/:id': 'Edit Detail',
  '/setting/size/all': 'All space size',
  '/setting/size/new': 'New',
  '/setting/size/edit': 'Edit',
  '/setting/size/edit/:id': 'Edit Detail',
  '/setting/collabs/all': 'All Collab',
  '/setting/collabs/new': 'New',
  '/setting/collabs/edit': 'Edit',
  '/setting/collabs/edit/:id': 'Edit Detail',
  '/setting/rent-type/all': 'All',
  '/setting/rent-type/new': 'New',
  '/setting/rent-type/edit': 'Edit',
  '/setting/rent-type/edit/:id': 'Edit Detail',
  '/setting/inclusion/all': 'All Inclusion',
  '/setting/inclusion/new': 'New ',
  '/setting/inclusion/edit': 'Edit',
  '/setting/payment/edit/:id': 'Edit Detail',
  '/setting/exclusion/all': 'All Exclusion',
  '/setting/exclusion/new': 'New ',
  '/setting/exclusion/edit': 'Edit',
  '/setting/payment/edit/:id': 'Edit Detail',
  '/setting/segment/all': 'All Segment',
  '/setting/segment/new': 'New',
  '/setting/segment/edit': 'Edit',
  '/setting/segment/edit/:id': 'Edit Detail',
  '/mdm': 'Mdm',
  '/mdm/all': 'All Mdm Member',
  '/mdm/new': 'New ',
  '/mdm/edit': 'Edit',
  '/mdm/edit/:id': 'Edit Detail',
  '/member': 'Member',
  '/member/all': 'All Member',
  '/member/new': 'New ',
  '/member/edit': 'Edit',
  '/member/edit/:id': 'Edit Detail',
  '/bde': 'Bde',
  '/bde/all': 'All Bde Member',
  '/bde/new': 'New ',
  '/bde/edit': 'Edit',
  '/bde/edit/:id': 'Edit Detail',
  '/merchant': 'Merchant',
  '/merchant/all': 'All Merchant Member',
  '/merchant/new': 'New ',
  '/merchant/edit': 'Edit',
  '/merchant/edit/:id': 'Edit Detail',
  '/brand': 'Brand',
  '/brand/all': 'All Brand',
  '/brand/new': 'New ',
  '/brand/edit': 'Edit',
  '/brand/edit/:id': 'Edit Detail',
  '/partners': 'Partners',
  '/partners/all': 'All Partners',
  '/partners/new': 'New ',
  '/partners/edit': 'Edit',
  '/partners/edit/:id': 'Edit Detail',
  '/partners/space/:id': 'Add Space',
  '/partners/gallery/:id': 'Add Gallery',
  '/partners/gallery-edit/:id': 'Edit Gallery',
  '/partners/space-edit/:id': 'Edit Space',
  '/invoice': 'Invoice',
  '/invoice/all': 'All Invoice',
  '/invoice/new': 'New ',
  '/invoice/edit': 'Edit',
  '/invoice/edit/:id': 'Edit Detail',
  '/invoice/view': 'View',
  '/invoice/view/:id': 'View Detail',
  '/inquiry': 'Inquiry',
  '/inquiry/all': 'All Inquiry',
  '/inquiry/new': 'New ',
  '/inquiry/edit': 'Edit',
  '/inquiry/edit/:id': 'Edit Detail',
  '/place': 'Place',
  '/place/all': 'All Place',
  '/place/new': 'New ',
  '/place/edit': 'Edit',
  '/place/edit/:id': 'Edit Detail',
   '/messages': 'Messages',
  '/messages/all': 'All Messages',
  '/messages/new': 'New ',
  '/messages/edit': 'Edit',
  '/messages/edit/:id': 'Edit Detail',
  '/mdm-workflow': 'Workflow',
  '/mdm-workflow/all': 'All Workflow',
  '/mdm-workflow/new': 'New ',
  '/mdm-workflow/edit': 'Edit',
  '/mdm-workflow/edit/:id': 'Edit Detail',
  '/mdm-workflow/fu1': 'FU1',
  '/mdm-workflow/fu2': 'FU2',
  '/mdm-workflow/fu3': 'FU3',
  '/mdm-team': 'Teams',
  '/mdm-team/all': 'All Teams',
  '/mdm-team/performance': 'All Performance',
  '/mdm-team/performance/:id': 'Detail',
  '/request': 'Request',
  '/request/all': 'All Request',
  '/request/new': 'New ',
  '/request/edit': 'Edit',
  '/request/edit/:id': 'Edit Detail',
  '/bde-workflow': 'Workflow',
  '/bde-workflow/all': 'All Workflow',
  '/bde-workflow/new': 'New ',
  '/bde-workflow/edit': 'Edit',
  '/bde-workflow/edit/:id': 'Edit Detail',
  '/bde-workflow/fu1': 'FU1',
  '/bde-workflow/fu2': 'FU2',
  '/bde-workflow/fu3': 'FU3',

};
export default routes;
