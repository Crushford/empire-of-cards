import React, { useState } from 'react'
import styled from 'styled-components'
import { Dialog, Typography, withStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import MuiDialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const LatestMessages = styled.h5`
  color: purple;
  margin: 3px;
`
const ShowLog = styled.button``

const LogList = styled.ol`
  margin: 20px;
  max-height: 300px;
  overflow-y: scroll;
`
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

export const BattleLog = ({ log }) => {
  const [logOpen, setLogOpen] = useState(false)

  const openLog = () => {
    setLogOpen(true)
  }
  const closeLog = () => {
    setLogOpen(false)
  }
  return (
    <>
      {log[log.length - 4] && (
        <LatestMessages>{log[log.length - 4]}</LatestMessages>
      )}
      {log[log.length - 3] && (
        <LatestMessages>{log[log.length - 3]}</LatestMessages>
      )}
      {log[log.length - 2] && (
        <LatestMessages>{log[log.length - 2]}</LatestMessages>
      )}
      <LatestMessages>
        Latest Battle Update: {log[log.length - 1]}
      </LatestMessages>
      <ShowLog onClick={openLog}>Show Entire Log</ShowLog>
      <Dialog open={logOpen} onClose={closeLog}>
        <DialogTitle id="customized-dialog-title" onClose={closeLog}>
          Entire Log
        </DialogTitle>
        <LogList>
          {log.map(message => (
            <li>{message}</li>
          ))}
        </LogList>
      </Dialog>
    </>
  )
}
