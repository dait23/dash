import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import {MainApi, MainLink} from '../../../views/Api/';
import { extendObservable, toJS } from 'mobx';
//import { inject, observer, Provider } from 'mobx-react';

import { ToastContainer, toast } from 'react-toastify';
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
    inclusions
    exclusions
    website
    status
    facebook
    instagram
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
      $inclusions: String,
      $exclusions: String,
      $areaId: ID,
      $categoryId: ID,
      $userId:ID,
      $facilitiesIds: [ID!],
      $visitorsIds: [ID!],
      $lat: Float,
      $lng: Float,
      $collabsIds: [ID!], 
      $typesIds: [ID!]
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
        inclusions: $inclusions,
        exclusions: $exclusions,
        userId: $userId
        visitorsIds: $visitorsIds,
        facilitiesIds:  $facilitiesIds,
        lat: $lat,
        lng: $lng,
        collabsIds: $collabsIds, 
        typesIds: $typesIds
        ) {
      id
    }
  }
`;

const createBrandMutation = gql`
  mutation createBrand(
      $name: String,
      $categoryId: ID
      ) {
    createBrand(name: $name, categoryId: $categoryId) {
      id
    }
  }
`;


const createAreaMutation = gql`
  mutation createArea(
      $name: String,
      $partnerId: ID
      ) {
    createArea(name: $name, partnerId: $partnerId) {
      id
    }
  }
`;

const createCoworkerMutation = gql`
  mutation createCoworker(
      $name: String,
      $areaId: ID
      ) {
    createCoworker(name: $name, areaId: $areaId) {
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
const brandStore = new class {
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

  createPartner = (name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, inclusions, exclusions, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds) =>
    client
      .mutate({
        mutation: createPartnerMutation,
        variables: { name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, inclusions, exclusions, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds },
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Created a new partners ..'), toast('Create Partner Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }) )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));

  createArea = (name, partnerId) =>
    client
      .mutate({
        mutation: createAreaMutation,
        variables: { name, partnerId },
        refetchQueries: [{ query: allAreaQuery }]
      })
      .then(() => console.warn('Created a new Areas ..'))
      .catch(error => console.error(error.message));

  createBrand = (name, categoryId) =>
    client
      .mutate({
        mutation: createBrandMutation,
        variables: { name, categoryId},
        refetchQueries: [{ query: allAreaQuery }]
      })
      .then(

         window.location= MainLink + "brand/all"

        )
      .catch(error => console.error(error.message));


   createCoworker = (name, areaId) =>
    client
      .mutate({
        mutation: createCoworkerMutation,
        variables: { name, areaId},
        refetchQueries: [{ query: allAreaQuery }]
      })
      .then(() => toast('Create Coworker Success', { type: toast.TYPE.SUCCESS, autoClose: 5000 }))
      .catch(error => console.error(error.message));

}();


export default brandStore;