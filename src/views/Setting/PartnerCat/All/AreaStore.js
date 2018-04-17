import { runInAction, extendObservable, action } from "mobx";
import { createApolloFetch } from 'apollo-fetch';
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../../views/Api/';


const query = `
  query {
   allAreas{
    id
    name
    slug
  }
  }
`

const uri = 'https://api.graph.cool/simple/v1/cjclrjf294mcv0145jddunb6p';
console.log('result.data');
export default extendObservable(this, {
  Area: [],
  loading: false,
  loadArea: action(async () => {
    this.loading = true;
    // fetch data from api and update people
    const apolloFetch = await createApolloFetch({uri});
     apolloFetch({ query}) //all apolloFetch arguments are optional 
      .then(result => {
        //const { data, error, extensions } = result;
        const json = result;
        //GraphQL errors and extensions are optional 
        console.log(json);
        
      })
      .catch(error => {
        //respond to a network error 
      });


 
  })
});
