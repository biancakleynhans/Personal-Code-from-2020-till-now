import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties } from 'react'

export interface FavProps {
    icon?: any
    mask?: any
    className?: string
    color?: string
    spin?: boolean
    pulse?: boolean
    border?: boolean
    fixedWidth?: boolean
    inverse?: boolean
    listItem?: boolean
    flip?: string //"horizontal" | "vertical" | "both" | undefined
    size?: string //"xs" | "lg" | "sm" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" | undefined
    pull?: string //"left" | "right" | undefined
    rotation?: string //90 | 180 | 270 | undefined
    transform?: any
    symbol?: string
    style?: CSSProperties
    tabIndex?: number;
    title?: string;
}

var fP: FavProps = {}


export const FavList = {


    test:{
        name: 'test',
        tag: '',
        favProps: fP,
        icon: <span className="ico"><FontAwesomeIcon  icon="home"/></span>,
    },
    layerTest:{
        name: 'layerTest',
        tag: '',
        favProps: fP,
        icon: <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon="square" color="green" />
                <FontAwesomeIcon icon="check" inverse transform="shrink-6" />
            </span>
    },

    search:{
        name: 'search',
        tag: 'search',
        favProps: fP,
        icon: <span className="ico"><FontAwesomeIcon  icon="search" style={{color: "var(--text-color)"}}/></span>,
    },

    //emoji
    sad:{
        name: 'sad',
        tag: '',
        favProps: fP,
        icon: <span className="ico"><FontAwesomeIcon  icon="sad-cry" style={{color: "var(--text-color)"}} size='3x'/></span>,
    },

    //other
    heart:{
        name: 'heart',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="heart" style={{color: "var(--text-color)"}}/>,
    },
    fire:{
        name: 'fire',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="fire" style={{color: "var(--text-color)"}}/>,
    },
    fireAlt:{
        name: 'fire-alt',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="fire-alt" style={{color: "var(--text-color)"}}/>,
    },
    calender:{
        name: 'calender',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="calendar" style={{color: "var(--text-color)"}}/>,
    },
    calenderAlt:{
        name: 'calender',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="calendar-alt" style={{color: "var(--text-color)"}}/>,
    },


    //nav
    arrowLeftALT:{
        name: 'arrowLeft',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon= {'chevron-left'} style={{color: "var(--text-color)"}}/>,
    },
    arrowRightALT:{
        name: 'arrowRight',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon= {'chevron-right'} style={{color: "var(--text-color)"}}/>,
    },
    arrowLeft:{
        name: 'arrowLeft',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon= {'arrow-left'} style={{color: "var(--text-color)"}}/>,
    },
    arrowRight:{
        name: 'arrowRight',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon= {'arrow-right'} style={{color: "var(--text-color)"}}/>,
    },
    spinner:{
        name: 'spinner',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon= {['fas','spinner']} style={{color: "var(--text-color)"}} spin/>,
    },
    edit:{
        name: 'spinner',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon= {['fas','pen-fancy']} style={{color: "var(--text-color)"}}  size="lg" pull="left" />,
    },
    add:{
        name: 'add',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="plus-circle" style={{color: "var(--text-color)"}}/>,
    },
    remove:{
        name: 'add',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="minus-circle" style={{color: "var(--text-color)"}}/>,
    },
    done:{
        name: 'done',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="check" style={{color: "var(--text-color)"}} size="5x"/>,
    },
    delete:{
        name: 'delete',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="trash" style={{color: "var(--text-color)"}} size="5x"/>,
    },

    //icons
    burger:{
        name: 'burger',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="hamburger" style={{color: "black"}}/>,
    },
    breadSlice:{
        name: 'breadSlice',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="bread-slice" style={{color: "var(--text-color)"}} title="Carbs"/>,
    },
    bacon:{
        name: 'bacon',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="bacon" style={{color: "var(--text-color)"}} title="Fat"/>,
    },
    egg:{
        name: 'egg',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="egg" style={{color: "var(--text-color)"}} title="Protein"/>,
    },
    carrot:{
        name: 'carrot',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="carrot" style={{color: "var(--text-color)"}}/>,
    },
    candy:{
        name: 'candy-cane',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="candy-cane" style={{color: "var(--text-color)"}}/>,
    },
    lemon:{
        name: 'lemon',
        tag: '',
        favProps: fP,
        icon: <FontAwesomeIcon  icon="lemon" style={{color: "var(--text-color)"}}/>,
    },
    
}

//conditional render 
/* 
    <FontAwesomeIcon
        id={icon.id}
        onClick={() => this.toggleIcon(icon.id)}
        icon={this.state[icon.id] ? faHeart : faCalendarAlt }
    />
 */