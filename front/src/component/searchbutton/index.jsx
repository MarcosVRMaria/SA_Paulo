import * as React from 'react';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';

export default function SearchButton({onClick}) {
  return (
      <Button variant="contained" onClick={onClick} endIcon={<Search />}>
      </Button>
  );
}