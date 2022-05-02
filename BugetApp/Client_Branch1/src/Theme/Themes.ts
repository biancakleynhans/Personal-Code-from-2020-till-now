interface nd<T>{
    [k:string]:T
}

export const Dark = {
    name: 'Dark',
    // base style colors
    'primary-color': '#69166E',
    'background-color': '#43394F',
    'text-color': '#B6B4B2',
    //   nav style colors
    'nav-primary-color':'#B6B4B2',
    'nav-selected-color': '#6B709E',
    'nav-hover-color': '#69166E',
    //   interactive style colors
    'button-color': '#804C78',
    'hover-color': '#69166E',
    'disable-color': '#43394F',
    'submit-color': '#6B709E',
    //palet colors
    'p1-color': '#69166E',
    'p2-color': '#B6B4B2',
    'p3-color': '#69166E',
    'p4-color': '#804C78',
    'p5-color': '#ff80b3',
    'p6-color': '#6B709E',
    // errors color
    'error': '#ff0000',
    'link-color': '#B6B4B2'
    // Font Size 
    //need to add sizing here as well
}

export const Light= {
    name: 'Light',
    // base style colors
    'primary-color': '#8C9299',
    'background-color': '#A18FA1',
    'text-color': '#292429',
    // nav style colors
    'nav-primary-color':'#8C9299',
    'nav-selected-color': '#BBC6BE',
    'nav-hover-color': '#8C9299',
    // interactive style colors
    'button-color': '#8C9299',
    'hover-color': '#8C9299',
    'disable-color': '#6969B3',
    'submit-color': '#BBC6BE',
    // palet colors
    'p1-color': '#79458D',
    'p2-color': '#6969B3',
    'p3-color': '#8C9299',
    'p4-color': '#BBC6BE',
    'p5-color': '#A997DF',
    'p6-color': '#DDC4DD',
    // errors color
    'error': '#ff0000',
    'link-color': '#8C9299'
  
};

export const themes:nd<{name:string}>={
    "Light":Light,
    "Dark":Dark,
}


export var availableThemes = Object.keys(themes).map(k=>themes[k])

export default availableThemes