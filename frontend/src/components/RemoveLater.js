import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const StyledSlider = styled(Slider)(({ success, theme }) => ({
  width: 600,
  ...(success && {
    color: theme.palette.success.main,
    '& .MuiSlider-thumb': {
      [`&:hover, &.Mui-focusVisible`]: {
        boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
      },
      [`&.Mui-active`]: {
        boxShadow: `0px 0px 0px 24px ${alpha(theme.palette.success.main, 0.16)}`,
      },
    },
  }),
}));

// export default function DynamicCSS() {
//   const [success1, setSuccess] = React.useState(false);

//   const handleChange = (event) => {
//     setSuccess(event.target.checked);
//   };

//   return (
//     <React.Fragment>
//       <FormControlLabel
//         control={
//           <Switch
//             checked={success1}
//             onChange={handleChange}
//             color="primary"
//             value="dynamic-class-name"
//           />
//         }
//         label="Success"
//       />
//       <StyledSlider success={success1} defaultValue={30} sx={{ mt: 1 }} />
//     </React.Fragment>
//   );
// }