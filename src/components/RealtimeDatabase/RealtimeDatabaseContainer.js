import React from 'react'
import './RealtimeDatabaseContainer.scss'
import { firebase } from '../../utils/firebase-init'




const RealtimeDatabaseContainer = () => {

    const dbRefObject = firebase.database().ref().child('object')
    const dbRefList = dbRefObject.child('hobbies')

    dbRefObject.once('value').then(snap => {
        const str = JSON.stringify(snap.val(), null, 3)
        const pre = document.querySelector('.RealtimeDatabaseContainer > pre')
        if (!pre) return 
        pre.textContent = str
    })

    dbRefList.once('value').then(snap => {
        const ul = document.querySelector('.RealtimeDatabaseContainer > ul')
        if (!ul) return 

        Object.entries(snap.val()).forEach(([key, value]) => {
            const li = document.createElement('li')
            li.textContent = value
            li.id = key
            ul.appendChild(li)
        })
    })


    dbRefObject.on('value', snap => {
        const str = JSON.stringify(snap.val(), null, 3)
        const pre = document.querySelector('.RealtimeDatabaseContainer > pre')
        if (!pre) return 
        pre.textContent = str
    })

    dbRefList.on('child_added', snap => {
        const li = document.createElement('li')
        li.textContent = snap.val()
        li.id = snap.key
        const ul = document.querySelector('.RealtimeDatabaseContainer > ul')
        if (!ul) return 
        ul.appendChild(li)
    })

    dbRefList.on('child_changed', snap => {
        const liChanged = document.getElementById(snap.key)
        if (!liChanged) return 
        liChanged.textContent = snap.val()
    })

    dbRefList.on('child_removed', snap => {
        const liRemoved = document.getElementById(snap.key)
        if (!liRemoved) return 
        liRemoved.remove()
    })


    return (
        <div className='RealtimeDatabaseContainer'>
            <h1>RealtimeDatabase</h1>

            <pre>
            </pre>

            <ul>
            </ul>

        </div>
    )
}

export default RealtimeDatabaseContainer