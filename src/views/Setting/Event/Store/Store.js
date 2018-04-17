import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import {MainApi} from '../../../../views/Api/';
import { extendObservable, toJS } from 'mobx';
//import { inject, observer, Provider } from 'mobx-react';
import {toast } from 'react-toastify';

global.fetch = fetch;



// queries and mutations
const allTeamQuery = gql`
  {
    allEventTypes(orderBy: createdAt_DESC){
      id
      name
      slug     
     }
  }
`;

const createPostSingle = gql`
  query EventType($id: ID!) {
      EventType(id: $id) {
      id
      name
    }
  }
`;


const createEventMutation = gql`
  mutation createEventType(
      $name: String!,
      $slug: String
      ) {
    createEventType(name: $name, slug: $slug) {
      id
    }
  }
`;

const updateEventMutation = gql`
  mutation updateCollab(
      $id: ID!,
      $name: String!,
      $slug: String
      ) {
    updateEventType(id: $id, name: $name, slug: $slug) {
      id
    }
  }
`;

const deleteEventMutation = gql`
  mutation deleteEventType(
      $id: ID!,
      ) {
    deleteEventType(id: $id) {
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
const eventsStore = new class {
  constructor() {
    extendObservable(this, {
      get allQuery() {
        return graphql({ client, query: allTeamQuery });
      },
      get error() {
        return (this.allQuery.error && this.allQuery.error.message) || null;
       },
      get loading() {
        return this.allQuery.loading;
      },
      get events() {
         return (this.allQuery.data.allEventTypes && toJS(this.allQuery.data.allEventTypes)) || [];
       },
        get event() {
         return graphql({ client, query: createPostSingle });
      },
       get single() {
         return (this.singleCollab && toJS(this.singleCollab));

      },
      get count() {
        return this.events.length;
      }
     
    });
    console.log(this.events);

  }

  createEvent = (name, slug) =>
    client
      .mutate({
        mutation: createEventMutation,
        variables: { name, slug },
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Created a new event type ..'), toast('Create Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, window.location.href='/setting/event-type/all') )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));

 //////////////update store
 updateEvent = (id, name, slug) =>
    client
      .mutate({
        mutation: updateEventMutation,
        variables: { id, name, slug },
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Update Event Type ..'), toast('Update Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }) )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));




//////////////Delete store
 deleteEvent = (id) =>
    client
      .mutate({
        mutation: deleteEventMutation,
        variables: { id },
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Delete Success ..'), toast('Delete Success ', { type: toast.TYPE.SUCCESS, autoClose: 2000 }) )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));


  //////////////update store
 singleEvent = (id) =>
    client
      .query({
        query: createPostSingle,
        variables: { id },
      })
      .then(function (results) {


        const xxx = results.data.EventType
   
       console.log(xxx)

      })
      .catch(error => console.error(error.message));

}();


export default eventsStore;