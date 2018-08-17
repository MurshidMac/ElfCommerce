import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, ListGroup, ListGroupItem, Row, Col, Button
} from 'reactstrap';
import CartItem from '../components/CartItem';
import '../App.css';

class Cart extends Component {
  render() {
    return (
      <Container>
        <div className="text-center lead">
          My Shopping Cart
        </div>
        <Row>
          <Col md={12}>
            <ListGroup>
              {
                this.props.cart.map(cartItem => (
                  <ListGroupItem key={cartItem.productName}>
                    <CartItem
                      productImage={cartItem.productImage}
                      productName={cartItem.productName}
                      productURL={cartItem.productURL}
                      productPrice={cartItem.productPrice}
                      productQuantity={cartItem.productQuantity}
                    />
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <div>
              <strong>
Subtotal:
                <span className="price">$123.16</span>
              </strong>
            </div>
            <br />
            <Button bsStyle="primary" style={{ float: 'right' }}>Checkout</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Cart);