import React, {Children, useReducer} from "react";


export default (reducer, actions, defaultValues)=>{
    const Context = React.createContext();
    const  Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, defaultValues);
        const boundActions ={};
                
        for (let key in actions) {
            boundActions[key]= actions[key](dispatch);

        }
        return (
            <Context.Provider value = {{state, ...boundActions}} >
                {console.log(children)}
                {children}
                

            </Context.Provider>
        );

    }
    return {Context,Provider};
}