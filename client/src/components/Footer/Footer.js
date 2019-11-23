import React, {Component} from 'react';
import './Footer.css';
import './made-with-bulma.png';
class Footer extends Component {
    render() {
      return (
        <footer className="footer">
            <div className="content has-text-centered horizontal">
                <p>Copyright &copy; {new Date().getFullYear()} Pontus Särland</p>
                {/* <a href="https://bulma.io">
                  <img src="made-with-bulma.png" alt="Made with Bulma" width="128" height="24" />
                </a> */}
            </div>
        </footer>
      ) 
    }
}
export default Footer;