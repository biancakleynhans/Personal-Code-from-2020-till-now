import * as React from 'react';

interface HomeProps {}

export class Home extends React.PureComponent<HomeProps> {

    render(){
        return <div>
            <h1>Home page</h1>
            <img className="imgdark" src="/Images/coffee.png" alt="coffee" />
        </div>
    }
}

export default Home



