export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Front Elements',
      wrapper: {            // optional wrapper object
        element: "span",      // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ""             // optional class names space delimited list for title item ex: "text-center"
    },
    // {
    //   name: 'Components',
    //   url: '/components',
    //   icon: 'icon-puzzle',
    //   children: [
    //     {
    //       name: 'Buttons',
    //       url: '/components/buttons',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Social Buttons',
    //       url: '/components/social-buttons',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Cards',
    //       url: '/components/cards',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Forms',
    //       url: '/components/forms',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Modals',
    //       url: '/components/modals',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Switches',
    //       url: '/components/switches',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tables',
    //       url: '/components/tables',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tabs',
    //       url: '/components/tabs',
    //       icon: 'icon-puzzle'
    //     }
    //   ]
    // },
    {
      name: 'Members',
      url: '/members',
      icon: 'icon-people',
      children: [
        {
          name: 'MDM',
          url: '/members/mdm',
          icon: 'icon-people',
        },
        {
          name: 'BDE',
          url: '/members/bde',
          icon: 'icon-people',
        },
        {
          name: 'Users',
          url: '/members/users',
          icon: 'icon-people',
        },
      ]
    },
    {
      name: 'Brands',
      url: '/brands',
      icon: 'icon-cup',
    },
    {
      name: 'partners',
      url: '/partners',
      icon: 'fa fa-building-o',
    },
    {
      name: 'Inquiry',
      url: '/inquiry',
      icon: 'fa fa-bookmark',
    },
    {
      name: 'Transaction',
      url: '/transaction',
      icon: 'icon-handbag',
      children: [
        {
          name: 'Invoice',
          url: '/transaction/invoice',
          icon: 'fa fa-clipboard',
        },
        {
          name: 'Withdraw',
          url: '/transaction/withdraw',
          icon: 'fa fa-credit-card',
        },
        {
          name: 'Users',
          url: '/members/users',
          icon: 'icon-people',
        },
      ]
    },
    {
      name: 'Mdm Workflow',
      url: '/workflow',
      icon: 'icon-layers',
    },
    {
      name: 'Notification',
      url: '/notification',
      icon: 'icon-bulb',
    },
    {
      name: 'Reviews',
      url: '/review',
      icon: 'icon-bubble',
    },
    // {
    //   name: 'Icons',
    //   url: '/icons',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Font Awesome',
    //       url: '/icons/font-awesome',
    //       icon: 'icon-star',
    //       badge: {
    //         variant: 'secondary',
    //         text: '4.7'
    //       }
    //     },
    //     {
    //       name: 'Simple Line Icons',
    //       url: '/icons/simple-line-icons',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    // {
    //   name: 'Widgets',
    //   url: '/widgets',
    //   icon: 'icon-calculator',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // },
    {
      name: 'Performance',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'SETTINGS'
    },
    {
      name: 'Web Settings',
      url: '/settings',
      icon: 'icon-screen-desktop',
      children: [
        {
          name: 'Meta Information',
          url: '/settings/meta',
          icon: 'fa fa-globe'
        },
        {
          name: 'User',
          url: '/settings/user',
          icon: 'icon-user-follow'
        }
      ]
    },
    {
      name: 'App Settings',
      url: '/settings',
      icon: 'icon-rocket',
      children: [
        {
          name: 'Product Type',
          url: '/settings/product-type',
          icon: 'icon-list'
        },
        {
          name: 'Visitor Type',
          url: '/settings/visitor',
          icon: 'icon-puzzle'
        },
        {
          name: 'Business Category',
          url: '/settings/business-category',
          icon: 'icon-folder-alt'
        },
        {
          name: 'Facility Partners',
          url: '/settings/facility',
          icon: 'icon-folder-alt'
        },
        {
          name: 'Category Partners',
          url: '/settings/category-partners',
          icon: 'icon-folder-alt'
        },
        {
          name: 'Area / Regional',
          url: '/settings/area',
          icon: 'icon-map'
        },
        {
          name: 'Brand Category',
          url: '/settings/brand-category',
          icon: 'fa fa-barcode'
        },
        {
          name: 'Brand Type',
          url: '/settings/brand-type',
          icon: 'fa fa-barcode'
        },
        {
          name: 'Event Type',
          url: '/settings/event-type',
          icon: 'fa fa-calendar'
        },
        {
          name: 'Notif Type',
          url: '/settings/notif-type',
          icon: 'fa fa-bullhorn'
        },
        {
          name: 'Employment',
          url: '/settings/employment',
          icon: 'icon-briefcase'
        },
        {
          name: 'Payment Type',
          url: '/settings/payment',
          icon: 'fa fa-money'
        },
        {
          name: 'Bank List',
          url: '/settings/bank',
          icon: 'fa fa-bank'
        },

      ]
    },
    {
      name: 'Components',
      url: '/components',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Static Pages',
          url: '/components/pages',
          icon: 'icon-puzzle'
        },
        {
          name: 'Banner',
          url: '/banner/all',
          icon: 'fa fa-image'
        },
        {
          name: 'Promo',
          url: '/components/promo',
          icon: 'icon-present'
        },
      ]
    },
//    {
//      name: 'Pages',
//      url: '/pages',
//      icon: 'icon-star',
//      children: [
//        {
  //        name: 'Login',
    //      url: '/login',
    //      icon: 'icon-star'
      //  },
    //    {
      //    name: 'Register',
    //      url: '/register',
    //      icon: 'icon-star'
      //  },
  //      {
    //      name: 'Error 404',
    //      url: '/404',
      ///    icon: 'icon-star'
      //  },
        //{
      //    name: 'Error 500',
      //    url: '/500',
    //      icon: 'icon-star'
      //  }
    //  ]
    //},
    {
      divider: true
    },
    {
      title: true,
      name: '3rd Party Plugin'
    },
    {
      name: 'Google',
      url: '/settings/google',
      icon: 'fa fa-google',
    },
    {
      name: 'Amazon',
      url: '/settings/aws',
      icon: 'fa fa-amazon',
    },
    {
      name: 'Cloudinary',
      url: '/settings/cloudinary',
      icon: 'fa fa-mixcloud',
    },
    {
      name: 'Mailchimp',
      url: '/settings/mailchimp',
      icon: 'icon-envelope-letter',
    },
    {
      name: 'OneSignal',
      url: '/settings/onesignal',
      icon: 'icon-bulb',
    },
    {
      name: 'Mailgun',
      url: '/settings/mailgun',
      icon: 'icon-envelope-open',
    },
    {
      divider: true
    },
  ]
};
