import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FiSearch, FiPlusCircle } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { fetchOrders } from '../../actions';
import { OrderListItem } from '../../components';
import 'react-datepicker/dist/react-datepicker.css';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1 };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchOrders());
  }

  onViewClick = id => {
    const { history } = this.props;
    history.push(`/orders/${id}`);
  };

  render() {
    const { orders, history, intl: { formatMessage } } = this.props;

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button
              color="link"
              onClick={() => this.props.history.push('/dashboard')}
            >
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.orders" />
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="content-body">
          <div className="table-container">
            <Col md={12} className="table-content">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <InputGroup size="sm">
                    <Input placeholder={formatMessage({ id: 'sys.search' })} />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary">
                        <FiSearch />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div>
                  <div>       
                    <FormattedMessage id="sys.orderDate" />
                    :&nbsp;
                    <DatePicker
                      dateFormat="YYYY-MM-DD"
                      selected={moment()}
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: '10px, 10px',
                        },
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    size="sm"
                    color="primary"
                    className="pull-right form-btn"
                    onClick={() => history.push('/new-order')}
                  >
                    <FiPlusCircle />
                    &nbsp;
                    <FormattedMessage id="sys.addNew" />
                  </Button>
                </div>
              </div>
              <br />
              <Table responsive>
                <thead className="table-header">
                  <tr>
                    <th>
                      <FormattedMessage id="sys.orderNumber" />
                    </th>
                    <th>
                      <FormattedMessage id="sys.orderedBy" />
                    </th>
                    <th>
                      <FormattedMessage id="sys.orderDate" />
                    </th>
                    <th>
                      <FormattedMessage id="sys.payBy" />
                    </th>
                    <th>
                      <FormattedMessage id="sys.orderStatus" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <OrderListItem
                      key={order.id}
                      number={order.number}
                      customer={order.customer}
                      date={order.date}
                      payment={order.payment}
                      status={order.status}
                      onClick={this.onViewClick}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </div>
          <ReactPaginate 
            pageCount={20}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            pageClassName="page-item"
            breakClassName="page-item"
            breakLabel="..."
            pageLinkClassName="page-link"
            previousLabel={formatMessage({ id: 'sys.prev' })}
            nextLabel={formatMessage({ id: 'sys.next' })}
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>
    );
  }
}

OrderList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  orders: state.orderReducer.orders,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(OrderList))
);
