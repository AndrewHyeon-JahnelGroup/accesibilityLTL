import React from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  Button as MuiButton,
  Checkbox,
  FormControlLabel,
  TextField,
  useTheme,
} from '@material-ui/core'
import { Button, Typography } from '@material-ui/core'

import useStyles from './styles'
// import SocialLoginOptions, { SocialPlatform } from './SocialLoginOptions'

/**
 * Interface for LoginForm component
 * @property {string} errorMessage if there is an error message, display it
 * @property {Object} rememberMe object of things relating to rememberMe checkbox ex:labels/onClicks
 * @property {Object} password object of things relating to password ex: labels/onClicks
 * @property {Object} socialLogin contains whether we can log into social platforms/which
 * @property {Object} submit object of things relating to submit button ex: labels/onClicks
 * @property {Object} username object of things relating to username ex: labels/onClicks
 */

const BadTutorial = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()

  const {
    errorMessage = '',
    rememberMe: { label: checkboxLabel, onChange: onRememberMeChange, checked = false },
    password: {
      inputLabel: passwordLabel,
      forgotLabel: passwordForgotLabel,
      onForgotClick: onForgotPasswordClick,
    },
    socialLogin: { restrictedSocial = false, socialPlatforms = [], loginWithLabel = '' } = {},
    submit: { onClick: onSubmit, label: submitLabel, disabled = false },
    username: {
      inputLabel: usernameLabel,
      forgotLabel: usernameForgotLabel,
      onForgotClick: onForgotUsernameClick,
    },
  } = props

  return (
    <>
      {errorMessage && (
        <CSSTransition
          appear
          classNames={{
            appear: classes.errorMessageAppear,
            appearActive: classes.errorMessageAppearActive,
          }}
          in={!!errorMessage}
          timeout={{
            enter: 400,
          }}
        >
          <Typography color="commonWhite" className={classes.errorMessage}>
            {errorMessage}
          </Typography>
        </CSSTransition>
      )}
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField label={usernameLabel} type="text" />

        <MuiButton onClick={onForgotUsernameClick} size="small" color="primary">
          <Typography variant="bodyLarge" color="inherit" component="span">
            {usernameForgotLabel}
          </Typography>
        </MuiButton>

        <TextField label={passwordLabel} type="password" />

        <MuiButton onClick={onForgotPasswordClick} size="small" color="primary">
          <Typography variant="bodyLarge" color="inherit" component="span">
            {passwordForgotLabel}
          </Typography>
        </MuiButton>

        <div className={classes.formSubmitContainer}>
          <FormControlLabel
            classes={{ label: classes.checkboxLabel }}
            control={(
              <Checkbox
                className={classes.checkbox}
                checked={checked}
                onChange={onRememberMeChange}
              />
            )}
            label={checkboxLabel}
          />
          <Button
            size="lg"
            buttonVariant="text"
            disabled={disabled}
            onClick={onSubmit}
            text={submitLabel}
            id="submitLoginBtn"
            bgColorOverride={theme.palette.primary.main}
            type="filled"
            textColorOverride={theme.palette.common.white}
            classes={{ container: classes.submitButton }}
          />
        </div>
        {/* {!restrictedSocial && (
          // <SocialLoginOptions socialPlatforms={socialPlatforms} loginWithLabel={loginWithLabel} />
        )} */}
      </form>
    </>
  )
}

export default BadTutorial
