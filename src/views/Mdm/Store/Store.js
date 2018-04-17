import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import {MainApi} from '../../../views/Api/';
import { extendObservable, toJS } from 'mobx';
//import { inject, observer, Provider } from 'mobx-react';

global.fetch = fetch;



// queries and mutations
const allTeamQuery = gql`
  {
    allMDMs {
       id
       firstName
       lastName
       imageId
       user{
          id
          email
          name
       }
     }
  }
`;

// const postsQuery = gql`
// {
//    query User($id: ID!){
      
//       User(id:$id){
//         id
//         name
//      }


//    }
//  `;

// const createPostMutation = gql`
//   mutation createPost($title: String!) {
//     createPost(title: $title) {
//       id
//       title
//     }
//   }
// `;

const uri = MainApi;

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});

// building a mobx store
const mdmStore = new class {
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
      get teams() {
         return (this.allQuery.data.allMDMs && toJS(this.allQuery.data.allMDMs)) || [];
       },
      // get mdms {
      //    return graphql({ client, query: postsQuery, variables });
      // },
      //  get single() {
      //    return (this.postx.data.Post && toJS(this.postx.data.Post));

      // },
      get count() {
        return this.teams.length;
      }
     
    });

  }

  // createPost = title =>
  //   client
  //     .mutate({
  //       mutation: createPostMutation,
  //       variables: { title },
  //       refetchQueries: [{ query: allTeamQuery }]
  //     })
  //     .then(() => console.warn('Created a new post ..'))
  //     .catch(error => console.error(error.message));
}();


export default mdmStore;