import React, { Component } from 'react'
import firebase from 'firebase'
const db = firebase.firestore()
const citiesRef = db.collection("cities")

class Cities extends Component {
    constructor() {
        super()
        this.state = {
            cities: [],
            results: {}
        }
    }
    async componentDidMount() {
        // this.initCities()
        await this.queryWithWhere()

        try {
            const querySnapshot = await citiesRef.get()

            const cities = []
            querySnapshot.forEach(doc => {
                cities.push({ id: doc.id, data: doc.data() })
            })
            this.setState({ cities })
        }
        catch (e) {
            console.log(e.message)
        }
    }
    initCities = () => {
        citiesRef.doc("SF").set({
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"] })
        citiesRef.doc("LA").set({
            name: "Los Angeles", state: "CA", country: "USA",
            capital: false, population: 3900000,
            regions: ["west_coast", "socal"] })
        citiesRef.doc("DC").set({
            name: "Washington, D.C.", state: null, country: "USA",
            capital: true, population: 680000,
            regions: ["east_coast"] })
        citiesRef.doc("TOK").set({
            name: "Tokyo", state: null, country: "Japan",
            capital: true, population: 9000000,
            regions: ["kanto", "honshu"] })
        citiesRef.doc("BJ").set({
            name: "Beijing", state: null, country: "China",
            capital: true, population: 21500000,
            regions: ["jingjinji", "hebei"] })
    }
    queryWithWhere = async () => {
        const querys = [
            // conditional operater
            citiesRef.where("state", "==", "CA").get(),
            citiesRef.where("population", "<", 100000).get(),
            citiesRef.where("name", ">=", "San Francisco").get(),
            // array contains
            // citiesRef.where("regions", "array-contains", "west_coast").get(),
            // several where statement
            citiesRef.where("state", "==", "CO").where("name", "==", "Denver").get(),
            citiesRef.where("country", "==", "USA").where("capital", "==", false).where("state", "==", "CA").where("population", "==", 860000).get(),
            citiesRef.where("country", "==", "USA").orderBy("population", "asc").get(),
            citiesRef.where("country", "==", "USA").where("population", "<", 3800000).get(),
            citiesRef.where("country", "==", "USA").where("population", ">", 690000).get(),
            citiesRef.where("country", "==", "USA").orderBy("population", "desc").get(),

            citiesRef.where("country", "==", "USA")
                    .where("population", "<", 3800000)
                    .orderBy("population", "desc").get(),

            citiesRef.where("country", "==", "USA")
                    .where("population", ">", 690000)
                    .orderBy("population", "desc").get(),

            // citiesRef.where("regions", "array_contains", "east_coast")
            //         .where("capital", "==", true).get()
        ]
        try {
            
            const extractDataFromSnapshot = querySnapshot => {
                const data = []
                querySnapshot.forEach(doc => {
                    data.push({ id: doc.id, data: doc.data() })
                })
                return data
            }
            const querySnapshots = await Promise.all(querys)
            const results = querySnapshots.map(snap => extractDataFromSnapshot(snap))

            this.setState({ results })
        }
        catch (e) {
            console.log(e.message)
        }
    }
    render() {
        console.log('results', this.state.results)
        return (
            <div className='Cities'>
                <h2>Cities</h2>
                <ul>
                    {this.state.cities.map(({id, data}) => (
                        <li key={id}>{JSON.stringify(data, null, 3)}</li>
                    ))}
                </ul>
                <pre>
                    {JSON.stringify(this.state.results, null, 3)}
                </pre>
            </div>
        )
    }
}


export default Cities