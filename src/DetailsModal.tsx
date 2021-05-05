import React from 'react';
import {Dialog, DialogTitle, DialogActions, DialogContent, Button} from '@material-ui/core';

interface IProps {
  open: boolean,
  handleClose: () => void,
  body?: string,
  title?: string,
  link?: string,
}

function DetailsModal (props:IProps) {
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <div>
          Stack Overflow link: <a href={props.link}>{props.link}</a>
        </div>
        <div className="mt-2 fs-4">
          Question Body:
        </div>
        <div dangerouslySetInnerHTML={{__html: props.body ? props.body : ''}}/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={props.handleClose} color="default">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailsModal;