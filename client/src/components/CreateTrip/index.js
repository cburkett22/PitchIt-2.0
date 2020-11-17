import React from "react";
import axios from 'axios';
import CalendarComponent from "../Calendar/CalendarComponent"

class CreateTrip extends React.Component {
    constructor(props) {
        super(props);
        this.handleCalendarStartDateSelected = this.handleCalendarStartDateSelected.bind(this);
        this.handleCalendarEndDateSelected = this.handleCalendarEndDateSelected.bind(this);
        this.state = {
            title: '',
            location: '',
            date: '',
            campers: '',
            items: '',
            displayStartCalendar: false,
            displayEndCalendar: false
        };
    };

    // Handling name/value as targets
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    openCalendarStart = () => {
        this.setState({displayStartCalendar: true})
    };

    openCalendarEnd = () => {
        this.setState({displayEndCalendar: true})
    };

    handleCalendarStartDateSelected(userSelection) {
        this.setState({ startDate: userSelection });
        this.setState({displayStartCalendar: false});
    };

    handleCalendarEndDateSelected(userSelection) {
        this.setState({ endDate: userSelection });
        this.setState({displayEndCalendar: false});
    };

    // POSTing trip data with axios
    submit = (event) => {
        event.preventDefault();

        const payload = {
            title: this.state.title,
            location: this.state.location,
            date: this.state.startDate + " - " + this.state.endDate,
            campers: this.state.campers,
            items: this.state.items
        };

        axios({
            url: '/api/create',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server!');
                this.resetUserInputs();
            })
            .catch((err) => {
                console.log('Internal server error :(', err);
            });

    };

    // Reset inputs
    resetUserInputs = () => {
        this.setState({
            title: '',
            location: '',
            date: '',
            campers: '',
            items: '',
            isCalendarOpen: false
        });
    };

    render(){
        console.log('State: ', this.state);
        return(
            <>
            <div className=  "blurBackground" >
                <div style={{paddingTop: "6%", paddingLeft: "6%", paddingRight: "6%", paddingBottom: "6%"}}>
                    <form id="create-adventure" onSubmit={this.submit}>
                        <div>
                            <label htmlFor="title">Adventure Name:</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            ></input>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="location">National Park:</label>
                            <input
                                list="campground-list"
                                type="text"
                                name="location"
                                id="location"
                                placeholder="search..."
                                value={this.state.location}
                                onChange={this.handleChange}
                            ></input>
                            <datalist id="campground-list">
                            </datalist>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="startDate">Start Date:</label>
                            <input
                                type="text"
                                name="startDate"
                                id="startDate"
                                placeholder="Start Date..."
                                value={this.state.startDate}
                                onChange={this.handleChange}
                                onClick={this.openCalendarStart}
                            ></input>
                            <CalendarComponent show={this.state.displayStartCalendar} onSelectionChange={this.handleCalendarStartDateSelected}/>
                        </div>
                        <div>
                            <label htmlFor="endDate">End Date:</label>
                            <input
                                type="text"
                                name="endDate"
                                id="endDate"
                                placeholder="End Date..."
                                value={this.state.endDate}
                                onChange={this.handleChange}
                                onClick={this.openCalendarEnd}
                            ></input>
                            <CalendarComponent show={this.state.displayEndCalendar} onSelectionChange={this.handleCalendarEndDateSelected}/>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="campers">Additional Camper's Username:</label>
                            <input
                                list="campers-list"
                                type="text"
                                name="campers"
                                id="campers"
                                value={this.state.campers}
                                onChange={this.handleChange}
                            ></input>
                            <datalist id="campers-list">
                                {/* {{#each user}}
                                    <option>{{this.name}}</option>
                                {{/each}} */}
                            </datalist>
                            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect add-btn">
                                <i className="material-icons">add</i>
                            </button>
                            <ul className="added-campers">
                            </ul>
                        </div>
                        <br></br>
                        <div className="form-group supply-list">
                            <label htmlFor="exampleFormControlTextarea1">Backpack:</label>
                            <textarea
                                className="form-control"
                                name="items"
                                id="items"
                                rows="3"
                                value={this.state.items}
                                onChange={this.handleChange}
                            ></textarea>
                        </div>
                    <a className="submit-trip" href="/dashboard"><button type="submit" className="btn btn-outline-success">Submit</button></a>
                    <a className="cancel" href="/dashboard"><button type="button" className="btn btn-outline-success">Cancel</button></a>
                    </form>
                </div>
                </div>
                
                
            </>
        );
    }
}

export default CreateTrip;