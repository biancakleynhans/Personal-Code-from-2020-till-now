import * as React from 'react';
import availableThemes, { themes } from './Themes'

export function setTheme(name: string){
    setThemeAttr(themes[name])
    window.localStorage.setItem( 'theme',JSON.stringify(name) )
}

export function setThemeAttr(theme:any) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
}

export function getAvailableThemes(){
    return availableThemes;
}

export default function FindAndSetTheme() {
    var x  = window.localStorage.getItem("theme")
    var y = x && JSON.parse(x)
    console.log(x,' ???')
    
    if(x === null){
        setTheme("Dark")
        return availableThemes.map(theme=><button className="themeButton" key={theme.name} onClick={()=>{ setTheme(theme.name)}}>{theme.name}</button>)  
    }
    else{
        setTheme(y)
        return availableThemes.map(theme=><button className="themeButton" key={theme.name} onClick={()=>{ setTheme(theme.name)}}>{theme.name}</button>)
    }
}


export function Spinner()
{
    return <div className="spinner">
                <div className="lds-css ng-scope">
                    <div className="lds-ellipsis">
                        <div><div></div></div>
                        <div><div></div></div>
                        <div><div></div></div>
                        <div><div></div></div>
                        <div><div></div></div>
                    </div>
                </div> 
            </div>           
}


