import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import {MainApi, MainLink} from '../../../views/Api/';
import { extendObservable, toJS } from 'mobx';
//import { inject, observer, Provider } from 'mobx-react';

import { toast } from 'react-toastify';
global.fetch = fetch;



// queries and mutations
const allTeamQuery = gql`
  {
    allPartners (orderBy: createdAt_DESC){
      id
      name
    address
    avgVisitor
    avgSpending
    nearby
    peakHour
    picName
    picPhone
    inclusions{
      id
      name
    }
    exclusions{
      id
      name
    }
    website
    status
    workingHour
    facebook
    instagram
    user{
      id
    }
    area{
      id
      name
    }
    visitors{
      id
      name
    }
    facilities{
      id
      name
    }
    category{
      id
      name
    }
    spaces{
      id
      title
    }
     
     }
  }
`;

// queries and mutations
const allAreaQuery = gql`
  {
    allAreas {
      id
      name
      
     }
  }
`;

const allCategoryQuery = gql`
  {
    allPartnerCategories {
      id
      name
      
     }
  }
`;

const allFacilityQuery = gql`
  {
    allFacilities {
      id
      name
      
     }
  }
`;

const allInclusionQuery = gql`
  {
    allInclusions {
      id
      name
      
     }
  }
`;

const allExclusionQuery = gql`
  {
    allExclusions {
      id
      name
      
     }
  }
`;
const allVisitorQuery = gql`
  {
    allVisitorTypes {
      id
      name
      
     }
  }
`;

const allCollabsQuery = gql`
  {
    allCollabs {
      id
      name
      
     }
  }
`;

const allEventQuery = gql`
  {
    allEventTypes {
      id
      name
      
     }
  }
`;


const createPartnerMutation = gql`
  mutation createPartner(
      $name: String,
      $address: String,
      $picName: String,
      $picPhone: String,
      $avgSpending: String,
      $avgVisitor: String,
      $peakHour: String,
      $nearby: String,
      $website: String,
      $facebook: String,
      $instagram: String,
      $areaId: ID,
      $categoryId: ID,
      $userId:ID,
      $facilitiesIds: [ID!],
      $visitorsIds: [ID!],
      $lat: Float,
      $lng: Float,
      $collabsIds: [ID!], 
      $typesIds: [ID!],
      $workingHour: String,
      $exclusionsIds: [ID!],
      $inclusionsIds: [ID!]
    
    
      ) {
    createPartner(
        name: $name, 
        areaId: $areaId, 
        categoryId: $categoryId,
        address:$address,
        picName: $picName,
        picPhone: $picPhone,
        avgSpending: $avgSpending,
        avgVisitor: $avgVisitor,
        peakHour: $peakHour,
        nearby: $nearby,
        website: $website,
        facebook: $facebook,
        instagram: $instagram,
        inclusionsIds: $inclusionsIds,
        exclusionsIds: $exclusionsIds,
        userId: $userId
        visitorsIds: $visitorsIds,
        facilitiesIds:  $facilitiesIds,
        lat: $lat,
        lng: $lng,
        collabsIds: $collabsIds, 
        typesIds: $typesIds,
        workingHour: $workingHour
        ) {
      id
    }
  }
`;

const updatePartnerMutation = gql`
  mutation updatePartner(
      $id: ID!,
      $name: String,
      $address: String,
      $picName: String,
      $picPhone: String,
      $avgSpending: String,
      $avgVisitor: String,
      $peakHour: String,
      $nearby: String,
      $website: String,
      $facebook: String,
      $instagram: String,
      $areaId: ID,
      $categoryId: ID,
      $userId:ID,
      $facilitiesIds: [ID!],
      $visitorsIds: [ID!],
      $lat: Float,
      $lng: Float,
      $collabsIds: [ID!], 
      $typesIds: [ID!],
      $workingHour: String,
      $exclusionsIds: [ID!],
      $inclusionsIds: [ID!]
    
    
      ) {
    updatePartner(
        id: $id,
        name: $name, 
        areaId: $areaId, 
        categoryId: $categoryId,
        address:$address,
        picName: $picName,
        picPhone: $picPhone,
        avgSpending: $avgSpending,
        avgVisitor: $avgVisitor,
        peakHour: $peakHour,
        nearby: $nearby,
        website: $website,
        facebook: $facebook,
        instagram: $instagram,
        inclusionsIds: $inclusionsIds,
        exclusionsIds: $exclusionsIds,
        userId: $userId
        visitorsIds: $visitorsIds,
        facilitiesIds:  $facilitiesIds,
        lat: $lat,
        lng: $lng,
        collabsIds: $collabsIds, 
        typesIds: $typesIds,
        workingHour: $workingHour
        ) {
      id
    }
  }
`;

const uri = MainApi;

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});

// building a mobx store
const partnerStore = new class {
  constructor() {
    extendObservable(this, {
      get allQuery() {
        return graphql({ client, query: allTeamQuery });
      },
      get allQueryArea() {
        return graphql({ client, query: allAreaQuery });
      },
       get allQueryCategory() {
        return graphql({ client, query: allCategoryQuery });
      },
      get allQueryVisitor() {
        return graphql({ client, query: allVisitorQuery });
      },
       get allQueryFacility() {
        return graphql({ client, query: allFacilityQuery });
      },
       get allQueryInclusion() {
        return graphql({ client, query: allInclusionQuery });
      },
       get allQueryExclusion() {
        return graphql({ client, query: allExclusionQuery });
      },
       get allQueryCollabs() {
        return graphql({ client, query: allCollabsQuery });
      },
       get allQueryEvents() {
        return graphql({ client, query: allEventQuery });
      },
      get error() {
        return (this.allQuery.error && this.allQuery.error.message) || null;
       },
      get loading() {
        return this.allQuery.loading;
      },
      get partners() {
         return (this.allQuery.data.allPartners && toJS(this.allQuery.data.allPartners)) || [];
       },
      get areas() {
         return (this.allQueryArea.data.allAreas && toJS(this.allQueryArea.data.allAreas)) || [];
       },
      get categories() {
         return (this.allQueryCategory.data.allPartnerCategories && toJS(this.allQueryCategory.data.allPartnerCategories)) || [];
       },
      get visitors() {
         return (this.allQueryVisitor.data.allVisitorTypes && toJS(this.allQueryVisitor.data.allVisitorTypes)) || [];
       },
        get facilities() {
         return (this.allQueryFacility.data.allFacilities && toJS(this.allQueryFacility.data.allFacilities)) || [];
       },
        get inclusions() {
         return (this.allQueryInclusion.data.allInclusions && toJS(this.allQueryInclusion.data.allInclusions)) || [];
       },
        get exclusions() {
         return (this.allQueryExclusion.data.allExclusions && toJS(this.allQueryExclusion.data.allExclusions)) || [];
       },
        get collabs() {
         return (this.allQueryCollabs.data.allCollabs && toJS(this.allQueryCollabs.data.allCollabs)) || [];
       },
        get events() {
         return (this.allQueryEvents.data.allEventTypes && toJS(this.allQueryEvents.data.allEventTypes)) || [];
       },
      get count() {
        return this.partners.length;
      }
     
    });
   // console.log(this.allQueryFacility);

  }

  createPartner = (name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour, inclusionsIds, exclusionsIds) =>
    client
      .mutate({
        mutation: createPartnerMutation,
        variables: { name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour, inclusionsIds, exclusionsIds},
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Created a new partners ..'), toast('Create Partner Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';",2000)))
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));

/////////////updated

updatePartner = (id, name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram,  avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour, inclusionsIds, exclusionsIds) =>
    client
      .mutate({
        mutation: updatePartnerMutation,
        variables: { id, name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour, inclusionsIds, exclusionsIds},
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Update partners ..'), toast('Update Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';",2000)))
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));

 

   
}();


export default partnerStore;