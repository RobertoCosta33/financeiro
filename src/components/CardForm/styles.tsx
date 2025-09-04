import styled from 'styled-components';
import { Dialog } from '@mui/material';

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    min-width: 400px;
    padding: 24px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

