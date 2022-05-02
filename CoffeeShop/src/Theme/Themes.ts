interface nd<T>{
    [k:string]:T
}

export const Dark = {
    name: 'Dark',
    // base style colors
    'primary-color': '#454547',
    'background-color': '#444',
    'text-color': '#ffffff',
    //   nav style colors
    'nav-primary-color':'#d1d1d1',
    'nav-selected-color': '#454547',
    'nav-hover-color': '#2f2f31',
    //   interactive style colors
    'button-color': '#2f2f31',
    'hover-color': '#454547',
    'disable-color': '#2f2f31',
    'submit-color': '#9fff80',
    //palet colors
    'p1-color': '#9fff80',
    'p2-color': '#80ffdf',
    'p3-color': '#06aef0',
    'p4-color': '#e580ff',
    'p5-color': '#ff80b3',
    'p6-color': '#ffcc80',
    // errors color
    'error': '#ff0000',
    'link-color': '#c7d9f5'
    // Font Size 
    //need to add sizing here as well
}

export const Light= {
    name: 'Light',
    // base style colors
    'primary-color': '#665990',
    'background-color': '#FFF',
    'text-color': '#383838',
    //   nav style colors
    'nav-primary-color':'#AAA5D1',
    'nav-selected-color': '#F8ACAC',
    'nav-hover-color': '#AAA5D1',
    //   interactive style colors
    'button-color': '#665990',
    'hover-color': '#F7C9CE',
    'disable-color': '#CC00CC',
    'submit-color': '#665990',
    //palet colors
    'p1-color': '#9fff80',
    'p2-color': '#80ffdf',
    'p3-color': '#8080ff',
    'p4-color': '#e580ff',
    'p5-color': '#ff80b3',
    'p6-color': '#ffcc80',
    // errors color
    'error': '#ff0000',
  'link-color': '#4088f3'
  
};

export const themes:nd<{name:string}>={
    "Light":Light,
    "Dark":Dark,
}


export var availableThemes = Object.keys(themes).map(k=>themes[k])

export default availableThemes