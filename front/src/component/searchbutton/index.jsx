import * as React from 'react';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const StyleButton = styled(Button)({
  paddingRight:"13px"

})

export default function SearchButton({onClick}) {
  return (
      <StyleButton variant="contained" onClick={onClick} startIcon={<Search/>} size="large">
      </StyleButton>
  )
}