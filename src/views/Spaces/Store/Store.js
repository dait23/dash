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
     }
  }
`;


// queries and mutations
const allSpaceQuery = gql`
  {
    allSpaces(orderBy: createdAt_DESC){
      id
      title
      slug
      description
      imageId
      imageUrl
      price1
      price7
      price30
      total
      wide{
        id
        size
      }
      partner{
        id
        name
      }
     
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
      $typesIds: [ID!],
      $workingHour: String
    
    
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
      $typesIds: [ID!],
      $workingHour: String
    
    
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
        inclusions: $inclusions,
        exclusions: $exclusions,
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
const spaceStore = new class {
  constructor() {
    extendObservable(this, {
      get allQuery() {
        return graphql({ client, query: allSpaceQuery });
      },
     
      get error() {
        return (this.allQuery.error && this.allQuery.error.message) || null;
       },
      get loading() {
        return this.allQuery.loading;
      },
      get spaces() {
         return (this.allQuery.data.allSpaces && toJS(this.allQuery.data.allSpaces)) || [];
       },
      get count() {
        return this.spaces.length;
      }
     
    });
   // console.log(this.allQueryFacility);

  }

  createPartner = (name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, inclusions, exclusions, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour) =>
    client
      .mutate({
        mutation: createPartnerMutation,
        variables: { name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, inclusions, exclusions, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour},
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Created a new partners ..'), toast('Create Partner Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';",2000)))
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));

/////////////updated

updatePartner = (id, name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, inclusions, exclusions, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour) =>
    client
      .mutate({
        mutation: updatePartnerMutation,
        variables: { id, name, areaId, categoryId, address, picName, picPhone, nearby, peakHour, website, facebook, facilities, instagram, inclusions, exclusions, avgSpending, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour},
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Update partners ..'), toast('Update Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';",2000)))
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));

 

   
}();


export default spaceStore;