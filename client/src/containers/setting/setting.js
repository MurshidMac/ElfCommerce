import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TabContent,
  TabPane,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Table,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import { FiSave } from 'react-icons/fi';
import { fetchStoreSettings } from '../../actions';
import {
  StoreSettingForm,
  AccountSettingForm,
  PasswordForm,
  CredentialForm,
} from '../forms';
import { CredentialListItem } from '../../components';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchStoreSettings());
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  handleSettingSubmit = values => {
    console.log(values);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { settings, history } = this.props;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.settings" />
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="content-body">
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '1',
                  })}
                  onClick={() => {
                    this.toggle('1');
                  }}
                >
                  <FormattedMessage id="sys.storeSettings" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '2',
                  })}
                  onClick={() => {
                    this.toggle('2');
                  }}
                >
                  <FormattedMessage id="sys.acctSettings" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '3',
                  })}
                  onClick={() => {
                    this.toggle('3');
                  }}
                >
                  <FormattedMessage id="sys.credentials" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '4',
                  })}
                  onClick={() => {
                    this.toggle('4');
                  }}
                >
                  <FormattedMessage id="sys.pwd" />
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent
              activeTab={this.state.activeTab}
              className="bg-white padding-v20 padding-h20"
            >
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Button size="sm" color="primary" className="pull-right">
                      <FiSave />
                      &nbsp;
                      <FormattedMessage id="sys.save" />
                    </Button>
                    <br />
                    <br />
                    <StoreSettingForm
                      onSubmit={this.handleSettingSubmit}
                      currencies={[
                        { id: 3, name: 'SGD' },
                        { id: 2, name: 'USD' },
                        { id: 1, name: 'MYR' },
                      ]}
                      countries={[
                        { id: 3, name: 'Singapore' },
                        { id: 2, name: 'United States' },
                        { id: 1, name: 'Malaysia' },
                      ]}
                      languages={[
                        { id: 'en', name: 'English' },
                        { id: 'zh-cn', name: '简体中文' },
                        { id: 'my', name: 'Malay' },
                      ]}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Button size="sm" color="primary" className="pull-right">
                      <FiSave />
                      &nbsp;
                      <FormattedMessage id="sys.save" />
                    </Button>
                    <br />
                    <br />
                    <AccountSettingForm
                      onSubmit={this.handleApiSettingSubmit}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col md={12}>
                    <Table>
                      <thead className="table-header">
                        <tr>
                          <th>
                            <FormattedMessage id="sys.company" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.apiKey" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.apiSecret" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <CredentialListItem
                          logo="http://mediad.publicbroadcasting.net/p/wkar/files/styles/medium/public/201706/10398927_9465478123_740_n.jpg"
                          apiKey="13adfjkE23hrjkFESfjk2hjk3hkErjkFE122j"
                          apiSecret="1kE23hrjkESfjasdfjkE23hrjkFESfjk2hjkE23hrjkFESfj3421D"
                        />
                        <CredentialListItem
                          logo="https://cdn.logojoy.com/wp-content/uploads/2017/07/Etsy_logo.png"
                          apiKey="12323kE23hrjkF4jk2hjk3hDSF3hrjkFESfj"
                          apiSecret="j23asd12323kE23hrjkF4jk2hjk3hDSF3hrjkFESfjfjkE23hrjk"
                        />
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col md={{ size: 4, offset: 4 }}>
                    <PasswordForm onSubmit={this.handleApiSettingSubmit} />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}

Setting.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default connect(
  null,
  null
)(injectIntl(withRouter(Setting)));
