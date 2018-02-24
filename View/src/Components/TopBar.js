import React, { Component } from 'react';
import userService from '../Services/userService.js'


var Topbar = ({props}) => (<div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
                             <div className='col-sm-4'>
                               <button onClick={ (event) => {
                                                 
                                                   window.history.back();
                                                 } } className='btn btn-secondary'>
                                 back
                               </button>
                             </div>
                             <div className='col-sm-4'>
                               <h2>{ props.title }</h2>
                             </div>
                             <div className='col-sm-4'>
                               <button onClick={ (event) => {
                                                 
                                                   userService.logOut()
                                                 
                                                 } } className='btn btn-danger'>
                                 log out
                               </button>
                             </div>
                           </div>
)

export { Topbar };