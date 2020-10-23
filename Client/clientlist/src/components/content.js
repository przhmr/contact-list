import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {BrowserRouter , Switch, Route} from 'react-router-dom'
import Home from '../components/pages/home'
import Login from '../components/auth/login'
import Register from '../components/auth/register'



function Content(){

return(
<>
<div>
        
<Switch>
    
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />\
    <Route path="/register" component={Register} />
    
    
</Switch>
    
    </div>
</>
)

}

export default Content;
