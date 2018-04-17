import fetch from 'isomorphic-fetch';
import gql from 'graphql-tag';
import graphql from 'mobx-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
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
          workflows (orderBy: updatedAt_DESC, last: 1){
            updatedAt
          }
          fu1:_workflowsMeta (
        filter:{
          status:1,
        }
      ){
        count
      }
    fu2:_workflowsMeta (
        filter:{
          status:2
        }
      ){
        count
      }
      fu3:_workflowsMeta (
        filter:{
          status:3
        }
      ){
        count
      }
       }
     }
  }
`;

// const postsQuery = gql`
//   {
//    Post( 
//       id:"cjdkh61pkkp7w0158cghpstn9"
//   ){
//     title
//     id
//   }
//   }
// `;

// const createPostMutation = gql`
//   mutation createPost($title: String!) {
//     createPost(title: $title) {
//       id
//       title
//     }
//   }
// `;

const uri = 'https://api.graph.cool/simple/v1/cjclrjf294mcv0145jddunb6p';

const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});

// building a mobx store
const mdmStore = new class {
  constructor() {
    extendObservable(this, {
      get allWorkflows() {
        return graphql({ client, query: allTeamQuery });
      },
      get error() {
        return (this.allWorkflows.error && this.allWorkflows.error.message) || null;
       },
      get loading() {
        return this.allWorkflows.loading;
      },
      get teams() {
         return (this.allWorkflows.data.allMDMs && toJS(this.allWorkflows.data.allMDMs)) || [];
       },
      // get postx() {
      //    return graphql({ client, query: postsQuery });
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