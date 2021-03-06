import './OrdersTable.css';
import Table from 'react-bootstrap/Table';
import OrderTableRow from '../OrderTableRow/OrderTableRow';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import EmailTableRow from '../EmailTableRow/EmailTableRow';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function OrdersTable() {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders);
    const emails = useSelector(store => store.emails);
    const [tab, setTab] = useState('orders');
    const [dateQuery, setDateQuery] = useState('');

    React.useEffect(() => {
        dispatch({ type: 'FETCH_ALL_ORDERS' });
        dispatch({ type: 'FETCH_EMAIL_HISTORY' })
    }, []);

    const handleInputChange = (event)=> {
        if (tab === 'orders'){
            /* dispatch({type: 'CLEAR_ORDERS'}); */
            dispatch({type: 'SEARCH_ORDERS', payload: event.target.value});
        }
        else if (tab === 'emails'){
            /* dispatch({type: 'CLEAR_EMAILS'}); */
            dispatch({type: 'SEARCH_EMAILS', payload: event.target.value});
        }
    }

    const handleDateSearch = () => {
        if (tab === 'orders'){
            /* dispatch({type: 'CLEAR_ORDERS'}); */
            dispatch({type: 'SEARCH_ORDER_DATES', payload: dateQuery});
        }
        else if (tab === 'emails'){
            /* dispatch({type: 'CLEAR_EMAILS'}); */
            dispatch({type: 'SEARCH_EMAIL_DATES', payload: dateQuery});
        }
    }
    return (
        <Col className="align-items-center justify-content-center">
            {/*ORDERS SEARCH */}
          <InputGroup className="mb-3">
          <InputGroup.Text id="input-name-text">
              <span>Search</span>
              </InputGroup.Text>
              <FormControl
                    onChange={handleInputChange}
                    placeholder="Name or email..."
                    type="text"
                />
              <InputGroup.Text id="input-group-text">
              <span>Or date</span>
              </InputGroup.Text>
              <FormControl
                    id="search-dates-orders-emails"
                    onChange={() => setDateQuery(event.target.value)}
                    type="date"
                />
                    <InputGroup.Append>          
                    <Button
                        onClick={()=>{
                            let input = document.getElementById("search-dates-orders-emails").value;
                            if (input === ''){
                                alert("Please enter a date to search");
                            }
                            handleDateSearch();}}
                        variant="outline-dark"
                    >GO</Button>
                </InputGroup.Append>
            </InputGroup>
             {/* *************** */}

            <Tabs 
            onSelect={(t) => {
                setTab(t);
                dispatch({ type: 'FETCH_ALL_ORDERS' });
                dispatch({ type: 'FETCH_EMAIL_HISTORY' })
            }}
            activeKey={tab} id="tabz">
                <Tab eventKey="orders" title="Orders">
                    <Table bordered hover className="Tables">
                        <thead>
                            <tr>
                            <th width="10%">
                                    Status
                                </th>
                                <th width="10%">
                                    Date
                                </th>
                                <th width="25%">
                                    Name
                                </th>
                                <th width="25%">
                                    Email
                                </th>
                                <th width="10%">
                                    Total
                                </th>
                                <th width="20%">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {orders.map(order => {
                            return (
                                <tbody key={order.id}>
                                    <OrderTableRow order={order} />
                                </tbody>
                            )
                        })}
                    </Table>
                </Tab>
                <Tab eventKey="emails" title="Emails" className="Tables">
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th width="15%">
                                    Date Sent
                                </th>
                                <th width="20%">
                                    Name
                                </th>
                                <th width="25%">
                                    Email
                                </th>
                                <th width="15%">
                                    Amount Paid
                                </th>
                                <th width="15%">
                                    View Email / Photos
                                </th>
                            </tr>
                        </thead>
                        {emails.map(email => {
                            return (
                                <tbody key={email.id}>
                                    <EmailTableRow email={email} />
                                </tbody>
                            )
                        })}
                    </Table>
                </Tab>
            </Tabs>
        </Col>

    );
}

export default OrdersTable;