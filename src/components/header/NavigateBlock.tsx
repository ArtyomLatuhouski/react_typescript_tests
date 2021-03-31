// OUTER
import React from 'react'


//LOCAL
import "./NavigateBlock.css"
import MenuItem from "./minuItems/MenuItem"

interface INavItems{
    path:string,
    name:string
}

const navItems:INavItems[]=[
    {path:"",name:"ajax TypeScript"},
    // {path:"scene",name:"scene experts"},
    {path:"camera",name:"camera experts"},
    {path:"box",name:"box photo"},
    {path:"other",name:"Other experts"}
]

const NavigateBlock: React.FC = () => {
    return (
        <div className="nav_container">
            <nav className="navMenu">
                <ul className="navMenu__ul">
                    {navItems.map((item:INavItems,index):JSX.Element=>{
                        return <MenuItem key={index} data={item}/>
                    })}
                </ul>
            </nav>

        </div>
    )
}

export default NavigateBlock
