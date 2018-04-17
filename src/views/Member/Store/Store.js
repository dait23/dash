import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import {MainApi} from '../../../views/Api/';
import { extendObservable, toJS } from 'mobx';
//import { inject, observer, Provider } from 'mobx-react';

import {toast } from 'react-toastify';

global.fetch = fetch;



// queries and mutations
const allMemberQuery = gql`
  {
    allMembers(orderBy: createdAt_DESC) {
       id
       firstName
      lastName
      phone
      bio
      imageId
      imageUrl
       user{
          id
          email
          name
       }
     }
  }
`;

const createMemberMutation = gql`
  mutation createMember(
      $email: String!, $password: String!, $jabatan: String, $firstName: String, $lastName: String
      ) {
   signupMember(email: $email, password: $password, jabatan: $jabatan, firstName: $firstName, lastName: $lastName) {
      id
      token
    }
  }
`;


const uri = MainApi;

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});

// building a mobx store
const memberStore = new class {
  constructor() {
    extendObservable(this, {
      get allQuery() {
        return graphql({ client, query: allMemberQuery });
      },
      get error() {
        return (this.allQuery.error && this.allQuery.error.message) || null;
       },
      get loading() {
        return this.allQuery.loading;
      },
      get members() {
         return (this.allQuery.data.allMembers && toJS(this.allQuery.data.allMembers)) || [];
       },
     
      get count() {
        return this.members.length;
      }
     
    });

  }

  createMember = (email, password, jabatan, firstName, lastName) =>
    client
      .mutate({
        mutation: createMemberMutation,
        variables: { email, password, jabatan, firstName, lastName },
        refetchQueries: [{ query: allMemberQuery }]
      })
      .then(() => console.log('Created a new Member ..'), toast('Create Member Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/member/all';",2000)) )
      .catch(error => toast(error.message, { type: toast.TYPE.ERROR, autoClose: 2000 }, console.log(error.message)));


 //////////////////////
}();


export default memberStore;