var React = require('react')
var NavLink = require('fluxible-router').NavLink

var VolunteerStore = require('../../stores/Volunteer')
var IntegrationsStore = require('../../stores/Integrations')
var BasicForm = require('./BasicForm.jsx')
var ProfileSettings = require('./ProfileSettings.jsx')
var MyTextarea = require('./../Formsy/MyTextarea.jsx')
var InstagramSetting = require('./InstagramSetting.jsx')

var Integration = function(props) {
  return (<li>Aplikacja: <b>{props.name}</b></li>)
}

var Settings = React.createClass({

  getInitialState: function () {
    return {
      profile: this.props.context.getStore(VolunteerStore).getState().profile,
      integrations: this.props.context.getStore(IntegrationsStore).getState().integrations
    }
  },

  _changeListener: function() {
    this.setState(this.props.context.getStore(VolunteerStore).getState())
  },

  _changeListener2: function() {
    this.setState(this.props.context.getStore(IntegrationsStore).getState())
  },

  componentDidMount: function() {
    this.props.context.getStore(VolunteerStore)
      .addChangeListener(this._changeListener)

    this.props.context.getStore(IntegrationsStore)
      .addChangeListener(this._changeListener2)
  },

  componentWillUnmount: function componentWillUnmount() {
    // Usuń funkcję nasłychującą
    this.props.context.getStore(VolunteerStore)
      .removeChangeListener(this._changeListener)

    this.props.context.getStore(IntegrationsStore)
      .removeChangeListener(this._changeListener2)
  },

  handleSuccessSnackbarClose: function() {
    this.setState({
      success: false
    })
  },

  handleErrorSnackbarClose: function() {
    this.setState({
      error: false
    })
  },

  render: function() {

    var integrations = this.state.integrations.map(function(integration) {
      return (<Integration name={integration.name} key={integration.id} />)
    })

    return (
      <div>

        <BasicForm {...this.state.profile} context={this.props.context} />

        <ProfileSettings
          profileId={this.state.profile.id}
          context={this.props.context}
          success={this.state.success}
          error={this.state.error}>

          <label htmlFor="first_name">
            <h2>Kim jestem?</h2>
          </label>

          <MyTextarea
            id="who_question"
            name="who_question"
            placeholder=""
            value={this.state.profile.who_question}
            validations={{
              maxLength: 500
            }}
            validationErrors={{
              maxLength: 'Limit znaków wynosi 500.'
            }} />

          <label htmlFor="first_name">
            <h2>Co chciałbym robić w życiu najbardziej?</h2>
          </label>

          <MyTextarea
            id="what_question"
            name="what_question"
            placeholder=""
            value={this.state.profile.what_question}
            validations={{
              maxLength: 500
            }}
            validationErrors={{
              maxLength: 'Limit znaków wynosi 500.'
            }} />

          <label htmlFor="first_name">
            <h2>Dlaczego angażuję się w wolontariat ŚDM?</h2>
          </label>

          <MyTextarea
            id="why_question"
            name="why_question"
            placeholder=""
            value={this.state.profile.why_question}
            validations={{
              maxLength: 500
            }}
            validationErrors={{
              maxLength: 'Limit znaków wynosi 500.'
            }} />

        </ProfileSettings>

        <h1>
          Aplikacje
        </h1>

        <div ref={node => node && node.setAttribute('container', '')}>
          <div ref={node => node && node.setAttribute('row', '')}>
            <div ref={node => node && node.setAttribute('column', '7')}>
              <p>Lista integracji:</p>
              <ul>
                <li><InstagramSetting context={this.props.context} /></li>
              </ul>
              <p>Lista aplikacji:</p>
              <ul>
                {integrations}
              </ul>
              <NavLink href="/ustawienia/developer">Dla deweloperów</NavLink>
            </div>
            <div ref={node => node && node.setAttribute('column', '5')}>
              <div className="alert">
                <p>
                  Informacja o tym jakie są możliwe integracje.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
})

module.exports = Settings
