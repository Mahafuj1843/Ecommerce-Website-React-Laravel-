import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import Navber from '../../layout/frontend/Navber';
import Footer from '../../layout/frontend/Footer';
import My_account from './myAcc/My_account';
import MyOrder from './myAcc/MyOrder';
import AccountInfo from './myAcc/AccountInfo';
import AddressBook from './myAcc/AddressBook';
import '../../asset/frontend/css/navber.css';
import '../../asset/frontend/css/footer.css';


function MyAccounts(){
    return (
        <div>
           <Navber />
           <ReactBootStrap.Container>
           <h3 className="mt-3">My Account</h3>

           <ReactBootStrap.Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <ReactBootStrap.Row className="my-3">
                    <ReactBootStrap.Col sm={3}>
                    <ReactBootStrap.Nav variant="pills" className="flex-column">
                        <ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Link eventKey="first">My Account</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Link eventKey="second">My Order</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Link eventKey="third">Address Book</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Link eventKey="fourth">Account Information</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Item>
                        <ReactBootStrap.Nav.Link eventKey="five">My Product Review</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Item>
                    </ReactBootStrap.Nav>
                    </ReactBootStrap.Col>
                    <ReactBootStrap.Col sm={9}>
                    <ReactBootStrap.Tab.Content>
                        <ReactBootStrap.Tab.Pane eventKey="first">
                           <My_account/>
                        </ReactBootStrap.Tab.Pane>
                        <ReactBootStrap.Tab.Pane eventKey="second">
                           <MyOrder/>
                        </ReactBootStrap.Tab.Pane>
                        <ReactBootStrap.Tab.Pane eventKey="third">
                           <AddressBook/>
                        </ReactBootStrap.Tab.Pane>
                        <ReactBootStrap.Tab.Pane eventKey="fourth">
                           <AccountInfo/>
                        </ReactBootStrap.Tab.Pane>
                        <ReactBootStrap.Tab.Pane eventKey="five">
                        Tab-5
                        </ReactBootStrap.Tab.Pane>
                    </ReactBootStrap.Tab.Content>
                    </ReactBootStrap.Col>
                </ReactBootStrap.Row>
                </ReactBootStrap.Tab.Container>
           </ReactBootStrap.Container>
           <Footer/>
        </div>
        
    );
}

export default MyAccounts;