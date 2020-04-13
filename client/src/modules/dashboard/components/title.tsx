import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

type TitleProps = {
  children: PropTypes.ReactNodeLike
}

export default function Title(props: TitleProps) {
  
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
