/**
 * @module core-components/LoginForm/styles
 */

import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
  checkbox: {
    '&:checked': {
      color: theme.palette.grey[600],
    },
  },
  errorMessage: {
    boxSizing: 'border-box',
    position: 'absolute',
    backgroundColor: theme.palette.error.main,
    padding: '5px 24px',
    top: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: '10px 48px',
    },
  },
  errorMessageAppear: {
    transform: 'translate(0px, -20px)',
    opacity: 0.1,
  },
  errorMessageAppearActive: {
    opacity: 1,
    transform: 'translate(0px, 0px)',
    transition: 'transform 0.5s cubic-bezier(0, 0, 0.2, 1) 0ms, opacity 0.5s ease',
  },
  form: {
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: (props) => (props.errorMessage ? '30px' : 0),
    [theme.breakpoints.up('sm')]: {
      paddingTop: (props) => (props.errorMessage ? '40px' : 0),
    },
  },
  checkboxLabel: {
    color: theme.palette.grey[500],
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    },
  },
  formSubmitContainer: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  submitButton: {
    '&&': {
      width: '100%',
      borderRadius: theme.shape.borderRadiusMedium,
      border: 'none',
      [theme.breakpoints.up('sm')]: {
        width: '180px',
      },
    },
  },
}))
