import React, { Component } from 'react';
import userService from '../Services/userService.js'


var Topbar = (props) => (<div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
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
                             <div className="dropdown">
                               <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 <i className="material-icons md-36">settings</i>
                               </button>
                               <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                 <a className="dropdown-item" onClick={ (event) => {
                                                                        
                                                                          userService.logOut()
                                                                        
                                                                        } } href="#">Logout</a>
                               </div>
                             </div>
                           </div>
                         </div>
)

export { Topbar };