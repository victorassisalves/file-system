import React from "react";
import  { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./pages/main/main";
import Folders from "./pages/folders/folders";



const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/folders" exact component={Folders} />
            <Route path="/folders/:id" component={Folders} />
        </Switch>
    </BrowserRouter>
);

export default Routes;