import { Localized } from 'fluent-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileForm from '../../profile-form/profile-form';
import StateTree from '../../../stores/tree';
import { User } from '../../../stores/user';
import Alert from '../../alert/alert';
import { Button, Hr } from '../../ui/ui';

interface WhyProfileState {
  expanded: boolean;
}

class WhyProfile extends React.Component<{}, WhyProfileState> {
  state = { expanded: false };

  private toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded } = this.state;
    return (
      <div>
        <div id="why-profile-title">
          {expanded ? (
            <Localized id="why-profile-title">
              <span />
            </Localized>
          ) : (
            <Localized id="why-profile-title">
              <a href="javascript:void(0)" onClick={this.toggle} />
            </Localized>
          )}
        </div>
        {expanded && (
          <div id="why-profile">
            <Localized id="why-profile-text">
              <p id="why-profile-text" />
            </Localized>
            <a href="javascript:void(0)" onClick={this.toggle}>
              Close
            </a>
          </div>
        )}
      </div>
    );
  }
}

interface PropsFromState {
  hasEnteredInfo: boolean;
}

interface State {
  profileFormVisible: boolean;
  alertVisible: boolean;
}

class ProfileActions extends React.Component<PropsFromState, State> {
  state: State = {
    profileFormVisible: false,
    alertVisible: false,
  };

  private toggleProfileForm = () => {
    this.setState({
      profileFormVisible: !this.state.profileFormVisible,
      alertVisible: this.props.hasEnteredInfo,
    });
  };

  private closeAlert = () => {
    this.setState({
      alertVisible: false,
    });
  };

  render() {
    const { profileFormVisible, alertVisible } = this.state;
    return (
      <div id="profile-actions">
        {!profileFormVisible && <Hr />}
        {alertVisible && (
          <Alert autoHide onClose={this.closeAlert}>
            Success, profile created!
          </Alert>
        )}
        {this.props.hasEnteredInfo ? (
          <Localized id="edit-profile">
            <Link to="/profile" />
          </Localized>
        ) : (
          <div>
            {profileFormVisible ? (
              <div id="profile-form-container">
                <ProfileForm onExit={this.toggleProfileForm} />
              </div>
            ) : (
              <Button outline onClick={this.toggleProfileForm}>
                Create a profile
              </Button>
            )}
            <WhyProfile />
          </div>
        )}
      </div>
    );
  }
}

export default connect<PropsFromState>(({ user }: StateTree) => ({
  hasEnteredInfo: User.selectors.hasEnteredInfo(user),
}))(ProfileActions);
