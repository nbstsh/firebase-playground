import React, { Component } from 'react'
import './RealtimeDatabaseContainer.scss'
import { firebase } from '../../utils/firebase-init'


class RealtimeDatabaseContainer extends Component {
    constructor() {
        super()
        this.state = {
            object: {},
            list: []
        }
    }
    componentDidMount() {
        const dbRefObject = firebase.database().ref().child('object')
        const dbRefList = dbRefObject.child('hobbies')

        dbRefObject.on('value', snap => {
            this.setState({
                object: snap.val()
            })
        })

        dbRefList.on('child_added', snap => {
           this.setState(state => {
               state.list.push({ key: snap.key, val: snap.val() })
               return state
           })
        })

        dbRefList.on('child_changed', snap => {
            console.log(snap.val())
            this.setState(state => {
                const item = state.list.find(item => item.key === snap.key)
                item.val = snap.val()
                return state
            })
        })

        dbRefList.on('child_removed', snap => {
            this.setState(state => {
                const index = state.list.findIndex(item => item.key === snap.key)
                state.list.splice(index, 1)
                return state
            })
        })
    }
    render() {
        const objectStr = JSON.stringify(this.state.object, null, 3)

        return (
            <div className='RealtimeDatabaseContainer'>
                <h1>RealtimeDatabase</h1>

                <pre>
                    {objectStr}
                </pre>

                <ul>
                    {this.state.list.map(item => <li key={item.key}>{item.val}</li>)}
                </ul>

            </div>
        )
    }
}


// const RealtimeDatabaseContainer = () => {

//     const dbRefObject = firebase.database().ref().child('object')
//     const dbRefList = dbRefObject.child('hobbies')

//     dbRefObject.once('value').then(snap => {
//         const str = JSON.stringify(snap.val(), null, 3)
//         const pre = document.querySelector('.RealtimeDatabaseContainer > pre')
//         if (!pre) return 
//         pre.textContent = str
//     })

//     dbRefList.once('value').then(snap => {
//         const ul = document.querySelector('.RealtimeDatabaseContainer > ul')
//         if (!ul) return 

//         Object.entries(snap.val()).forEach(([key, value]) => {
//             const li = document.createElement('li')
//             li.textContent = value
//             li.id = key
//             ul.appendChild(li)
//         })
//     })


//     dbRefObject.on('value', snap => {
//         const str = JSON.stringify(snap.val(), null, 3)
//         const pre = document.querySelector('.RealtimeDatabaseContainer > pre')
//         if (!pre) return 
//         pre.textContent = str
//     })

//     dbRefList.on('child_added', snap => {
//         const li = document.createElement('li')
//         li.textContent = snap.val()
//         li.id = snap.key
//         const ul = document.querySelector('.RealtimeDatabaseContainer > ul')
//         if (!ul) return 
//         ul.appendChild(li)
//     })

//     dbRefList.on('child_changed', snap => {
//         const liChanged = document.getElementById(snap.key)
//         if (!liChanged) return 
//         liChanged.textContent = snap.val()
//     })

//     dbRefList.on('child_removed', snap => {
//         const liRemoved = document.getElementById(snap.key)
//         if (!liRemoved) return 
//         liRemoved.remove()
//     })


//     return (
//         <div className='RealtimeDatabaseContainer'>
//             <h1>RealtimeDatabase</h1>

//             <pre>
//             </pre>

//             <ul>
//             </ul>

//         </div>
//     )
// }

export default RealtimeDatabaseContainer