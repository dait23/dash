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
    allCollabs (orderBy: createdAt_DESC){
      id
      name
      slug     
     }
  }
`;

const createPostSingle = gql`
  query Collab($id: ID!) {
      Collab(id: $id) {
      id
      name
    }
  }
`;


const createCollabMutation = gql`
  mutation createCollab(
      $name: String!,
      $slug: String
      ) {
    createCollab(name: $name, slug: $slug) {
      id
    }
  }
`;

const updateCollabMutation = gql`
  mutation updateCollab(
      $id: ID!,
      $name: String!,
      $slug: String
      ) {
    updateCollab(id: $id, name: $name, slug: $slug) {
      id
    }
  }
`;

const deleteCollabMutation = gql`
  mutation deleteCollab(
      $id: ID!,
      ) {
    deleteCollab(id: $id) {
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
const collabsStore = new class {
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
      get collabs() {
         return (this.allQuery.data.allCollabs && toJS(this.allQuery.data.allCollabs)) || [];
       },
        get collab() {
         return graphql({ client, query: createPostSingle });
      },
       get single() {
         return (this.singleCollab && toJS(this.singleCollab));

      },
      get count() {
        return this.collabs.length;
      }
     
    });
    //console.log(this.collab);

  }

  createCollab = (name, slug) =>
    client
      .mutate({
        mutation: createCollabMutation,
        variables: { name, slug },
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Created a new Collabs ..'), toast('Create Collabs Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, window.location.href='/setting/collabs/all') )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));

 //////////////update store
 updateCollab = (id, name, slug) =>
    client
      .mutate({
        mutation: updateCollabMutation,
        variables: { id, name, slug },
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Update Collabs ..'), toast('Update Collabs Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }) )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));




//////////////Delete store
 deleteCollab = (id) =>
    client
      .mutate({
        mutation: deleteCollabMutation,
        variables: { id },
        refetchQueries: [{ query: allTeamQuery }]
      })
      .then(() => console.log('Delete Success ..'), toast('Delete Success ', { type: toast.TYPE.SUCCESS, autoClose: 2000 }) )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));


  //////////////update store
 singleCollab = (id) =>
    client
      .query({
        query: createPostSingle,
        variables: { id },
      })
      .then(function (results) {


        const xxx = results.data.Collab
   
       console.log(xxx)

      })
      .catch(error => console.error(error.message));

}();


export default collabsStore;