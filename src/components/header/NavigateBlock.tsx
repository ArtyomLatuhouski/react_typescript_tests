// OUTER
import React, {useState, useEffect} from 'react'


//LOCAL
import "./NavigateBlock.css"
import MenuItem from "./minuItems/MenuItem"

interface INavItems{
    path:string,
    name:string
}

const navItems:INavItems[]=[
    {path:"",name:"ajax TypeScript"},
    {path:"scene",name:"scene experts"},
    {path:"camera",name:"camera experts"},
    {path:"geo-mat",name:"geometry & materials experts"},
]

const NavigateBlock: React.FC = () => {
    return (
        <div className="nav_container">
            <nav className="navMenu">
                <ul className="navMenu__ul">
                    {navItems.map((item:INavItems):JSX.Element=>{
                        return <MenuItem data={item}/>
                    })}
                </ul>
            </nav>

        </div>
    )
}

export default NavigateBlock
