import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { ToastContainer} from 'react-toastify';
import partnerStore from '../Store/Store';
import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import slugify from 'slugify';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import 'react-select-plus/dist/react-select-plus.css';
import { Link} from 'react-router-dom'





const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <i className="fa fa-map-marker Demo__suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
)

const renderFooter = () => (
  <div className="Demo__dropdown-footer">
    <div>
      
    </div>
  </div>
)

const cssClasses = {
  root: 'form-group',
  input: 'Demo__search-input',
  autocompleteContainer: 'Demo__autocomplete-container',
}

const shouldFetchSuggestions = ({ value }) => value.length > 2

const onError = (status, clearSuggestions) => {
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  )
  clearSuggestions()
}


// our main component
const Partner = inject('partnerStore')(
  observer(
    class extends Component {

    
      constructor(props) {
        super(props)
        this.state = { 
        address: '',
        geocodeResults: null,
        loading: false,
        name: '',
        slug:'',
        picName: '',
        picPhone: '',
        avgVisitor: '',
        avgSpending: '',
        lat: '',
        lng: '',
        peakHour: '',
        partnerId: 'cjdysomf1sf0h0159w4r1erz3',
        inclusions: '',
        exclusions: '',
        categoryId: '',
        userId: localStorage.getItem('uid'),
        areaId: '',
        visitorsIds: [],
        facilitiesIds: [],
        typesIds:[],
        collabsIds:[],
        nearby: '',
        workingHour:'',
        facebook: '',
        instagram: '',
        website: '',
        imageUrl:'',
        imageId:'',
        selectedOption: '',
        uploadedFile: null
        }
        //this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
         this.handleSelectChangeEvent = this.handleSelectChangeEvent.bind(this)
        this.handleSelectChangeCollab = this.handleSelectChangeCollab.bind(this)
        this.handleChangex = this.handleChangex.bind(this)
        this.handleChangez = this.handleChangez.bind(this)
        this.handleChangeVit = this.handleChangeVit.bind(this)
        //this.handleChangeRe = this.handleChangeRe.bind(this)

        this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
        
      }
   ////

 handleSelect(address) {
    this.setState({
      address,
      loading: true,
    })

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Geocode Success', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false,
          lat: lat,
          lng: lng
        })
        console.log(this.geocodeResults)
      })
      .catch(error => {
        console.log('Geocode Error', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false,
        })
      })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    })
  }


   handlePost = () => this.props.partnerStore.createPartner(
    this.state.name, 
    this.state.areaId,
    this.state.categoryId, 
    this.state.address, 
    this.state.picName, 
    this.state.picPhone, 
    this.state.nearby, 
    this.state.peakHour, 
    this.state.website, 
    this.state.facebook, 
    this.state.facilities, 
    this.state.instagram, 
    this.state.inclusions, 
    this.state.exclusions, 
    this.state.avgSpending, 
    this.state.avgVisitor, 
    this.state.userId, 
    this.state.visitorsIds, 
    this.state.facilitiesIds, 
    this.state.lat, 
    this.state.lng, 
    this.state.collabsIds, 
    this.state.typesIds,
    this.state.workingHour

    );

   
    
    handleSelectChange (value) {

    const map1 = value.map(x => x.id);
    this.setState({ facilitiesIds: map1 });


     console.log('You\'ve selectedxx:', map1);
  }

  /////////////////////////////////////////


    handleSelectChangeEvent (value) {

    const map1 = value.map(x => x.id);

    this.setState({ typesIds: map1 });


     console.log('You\'ve selected type:', map1);
  }

      //////////


    handleSelectChangeCollab (value) {

    const map1 = value.map(x => x.id);

    this.setState({ collabsIds: map1 });


     console.log('You\'ve selected collab:', map1);
  }

      //////////
       handleChangex = (categoryId) => {
        this.setState({ categoryId : categoryId.value});
        console.log(`category: ${categoryId.value}`);
      }

  
       handleChangez = (areaId) => {
        this.setState({ 
          areaId:areaId.value
        });
        console.log(`area: ${areaId.value}`);
      }

     handleChangeVit (value) {

    const map1 = value.map(x => x.id);

    this.setState({ visitorsIds: map1 });


     console.log('Visitor:', map1);
  }
 ///////////////////////

renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude:{' '}
        <strong>
          {lat}, {lng}
        </strong>
      </div>
    )
  }


 //////////////////////

      render() {

       var sluger =  slugify(this.state.name , {
                replacement: '-',    // replace spaces with replacement
                remove: /[$*_+~.()'"!\-:@,]/g,        // regex to remove characters
                lower: true          // result in lower case
              })

         const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        //console.log('Blur event!')
      },
      onFocus: () => {
        //console.log('Focused!')
      },
      autoFocus: true,
      placeholder: 'Address',
      name: 'Demo__input',
      id: 'my-input-id',
    }

        const { error, loading, count, areas, categories, visitors, facilities, events, collabs } = this.props.partnerStore;
        console.log(count);

        if (error) console.error(error);
        else if (loading) return(
            
            <div><Spinner name="double-bounce" /></div>

          );
        else if (count === 0) console.warn('No Partner :(');

        return (

        
     <div className="animated fadeIn">
     <ToastContainer autoClose={1000} />
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> Spaces
              </div>
              <div className="card-block">
                <form  className="form-horizontal">
                   <div className="row">
                   <div className="col-md-6">
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input"></label>
                    <div className="col-md-9">
                      <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>
                           
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Partner Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="partner name"
                      onChange={(e) => this.setState({name: e.target.value})}
                       onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picName} name="picName" className="form-control" placeholder="pic name"
                      onChange={(e) => this.setState({picName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picPhone} name="picPhone" className="form-control" placeholder="pic Phone"
                      onChange={(e) => this.setState({picPhone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Average Visitor</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.avgVisitor} name="avgVisitor" className="form-control" placeholder="average visitor"
                      onChange={(e) => this.setState({avgVisitor: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Average Spending</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.avgSpending} name="avgSpending" className="form-control" placeholder="average spendding"
                      onChange={(e) => this.setState({avgSpending: e.target.value})}
                      />
                    </div>
                  </div>

                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Peak Hours</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.peakHour} name="peakHour" className="form-control" placeholder="peak hours"
                      onChange={(e) => this.setState({peakHour: e.target.value})}
                      />
                    </div>
                  </div>
                  
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">NearBy</label>
                    <div className="col-md-9">
                        <textarea className="form-control" rows="5" value={this.state.nearby} name="nearby"
                         onChange={(e) => this.setState({nearby: e.target.value})}></textarea>
                    
                    </div>
                  </div>


                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Inclusions</label>
                    <div className="col-md-9">
                    
                      <textarea className="form-control" rows="5" value={this.state.inclusions} name="inclusions"
                         onChange={(e) => this.setState({inclusions: e.target.value})}></textarea>
                    </div>
                  </div>
              

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Exclusion</label>
                    <div className="col-md-9">
                    
                      <textarea className="form-control" rows="5" value={this.state.exclusions} name="exclusions"
                         onChange={(e) => this.setState({exclusions: e.target.value})}></textarea>
                    </div>
                  </div>
              
                   </div>
                   <div className="col-md-6">
   

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                       <Select
                        name="categoryId"
                        placeholder="Select Category"
                        value={this.state.categoryId}
                        onChange={this.handleChangex}
                        options={categories.map((category) => (
                           
                           {value: category.id, label: category.name}


                          ))}
                      />
                       
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Address</label>
                    <div className="col-md-9">
                      <PlacesAutocomplete
                        renderSuggestion={renderSuggestion}
                        renderFooter={renderFooter}
                        inputProps={inputProps}
                        classNames={cssClasses}
                        onSelect={this.handleSelect}
                        onEnterKeyDown={this.handleSelect}
                        onError={onError}
                        shouldFetchSuggestions={shouldFetchSuggestions}
                      />
                      {this.state.loading && (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        )}
        {this.state.geocodeResults && (
           <div>
           <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Latitude</label>
                    <div className="col-md-9">
                      <input disabled type="text" id="text-input" value={this.state.lat} name="lat" className="form-control" placeholder="average spendding"
                      onChange={(e) => this.setState({lat: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Longitude</label>
                    <div className="col-md-9">
                      <input  disabled type="text" id="text-input" value={this.state.lng} name="lng" className="form-control" placeholder="average spendding"
                      onChange={(e) => this.setState({lng: e.target.value})}
                      />
                    </div>
                  </div>
                 </div>
        )}
                    </div>
                  </div>


                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Area / Regional</label>
                    <div className="col-md-9">
                      
                      <Select
                        name="areaId"
                        placeholder="Select Area / regional"
                        value={this.state.areaId}
                        onChange={this.handleChangez}
                        options={areas.map((area) => (
                           
                           {value: area.id, label: area.name}


                          ))}
                      />
                      
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Visitor Type</label>
                    <div className="col-md-9">
                         
                      <Multiselect
                       onChange={this.handleChangeVit}
                        data={visitors.map((visitorx) => (
                           
                           {id: visitorx.id, name: visitorx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Visitor Type"
                        defaultValue={[]}
                      />
                      
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Facility</label>
                    <div className="col-md-9">
                      
                      <Multiselect
                       onChange={this.handleSelectChange}
                        data={facilities.map((facilityx) => (
                           
                           {id: facilityx.id, name: facilityx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Facility"
                        defaultValue={[]}
                      />
                      
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Event Type</label>
                    <div className="col-md-9">
                      
                      <Multiselect
                       onChange={this.handleSelectChangeEvent}
                        data={events.map((eventx) => (
                           
                           {id: eventx.id, name: eventx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Event Types"
                        defaultValue={[]}
                      />
                      
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Event Collabs</label>
                    <div className="col-md-9">
                      
                      <Multiselect
                       onChange={this.handleSelectChangeCollab}
                        data={collabs.map((collabx) => (
                           
                           {id: collabx.id, name: collabx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Event Collabs"
                        defaultValue={[]}
                      />
                      
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Working Hour</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.workingHour} name="workingHour" className="form-control" placeholder="Working Hour"
                      onChange={(e) => this.setState({workingHour: e.target.value})}
                      />
                    </div>
                  </div>
    
                     <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Website</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.website} name="website" className="form-control" placeholder="http://www.example.com"
                      onChange={(e) => this.setState({website: e.target.value})}
                      />
                    </div>
                  </div>
                   
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Facebook</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.facebook} name="facebook" className="form-control" placeholder="https://facebook.com/"
                      onChange={(e) => this.setState({facebook: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Instagram</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.instagram} name="instagram" className="form-control" placeholder="https://instagram.com/"
                      onChange={(e) => this.setState({instagram: e.target.value})}
                      />
                    </div>
                  </div>
                
              
                  

                   </div>
                </div>
                
                 
      
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/partners/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>

          )
      }
     

    }
  )
);



const stores = { partnerStore };

const AddSpace = () => (
  <Provider {...stores}>
    <Partner />
  </Provider>
);


export default AddSpace;
