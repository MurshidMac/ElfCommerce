import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { fetchManufacturers } from '../../actions';
import { ManufacturerListItem } from '../../components';

class ManufacturerList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    //TODO: to replace the store ID passing to action creator
    dispatch(fetchManufacturers('asdfasdfasdfasd'));
  }

  onViewClick = id => {
    this.props.history.push(`/suppliers/${id}`);
  };

  render() {
    const {
      history,
      manufacturers,
      intl: { formatMessage },
    } = this.props;

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.manufacturers" />
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
                <Button
                  size="sm"
                  color="primary"
                  className="pull-right form-btn"
                  onClick={() => history.push('/new-supplier')}
                >
                  <FiPlusCircle />
                  &nbsp;
                  <FormattedMessage id="sys.addNew" />
                </Button>
              </div>
              <br />
              <Table responsive>
                <thead className="table-header">
                  <tr>
                    <th>
                      <FormattedMessage id="sys.comLogo" />
                    </th>
                    <th>
                      <FormattedMessage id="sys.name" />
                    </th>
                    <th>
                      <FormattedMessage id="sys.contactInfo" />
                    </th>
                    <th>
                      <FormattedMessage id="sys.status" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {manufacturers.map(manufacturer => (
                    <ManufacturerListItem
                      key={manufacturer.code}
                      id={manufacturer.code}
                      logo={manufacturer.logo}
                      name={manufacturer.name}
                      url={manufacturer.url}
                      address={manufacturer.address}
                      email={manufacturer.email}
                      contact={manufacturer.contact}
                      status={manufacturer.status}
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

const mapStateToProps = state => ({
  manufacturers: state.manufacturerReducer.manufacturers,
});

ManufacturerList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  manufacturers: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(ManufacturerList))
);
