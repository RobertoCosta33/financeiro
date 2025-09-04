import React from 'react';
import {
  Typography,
  LinearProgress,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import { Edit, Delete, CreditCard as CreditCardIcon } from '@mui/icons-material';
import { CreditCard as CreditCardType } from '../../types';
import { calculateCardUtilization, formatCurrency, getBudgetColor } from '../../utils/calculations';
import {
  StyledCard,
  CardHeader,
  CardContent,
  ProgressContainer,
  CardActions
} from './styles';

interface CreditCardProps {
  card: CreditCardType;
  onEdit: (card: CreditCardType) => void;
  onDelete: (id: string) => void;
}

const CreditCard: React.FC<CreditCardProps> = ({ card, onEdit, onDelete }) => {
  const utilization = calculateCardUtilization(card);
  const progressColor = getBudgetColor(utilization);

  return (
    <StyledCard>
      <CardHeader>
        <Box display="flex" alignItems="center" gap={1}>
          <CreditCardIcon color="primary" />
          <Typography variant="h6" component="div">
            {card.name}
          </Typography>
        </Box>
        <Chip 
          label={card.type} 
          size="small" 
          color={card.type === 'credit' ? 'primary' : 'secondary'}
        />
      </CardHeader>

      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Limite:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatCurrency(card.limit)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Saldo Atual:
          </Typography>
          <Typography 
            variant="body2" 
            fontWeight="bold"
            color={utilization > 80 ? 'error' : 'text.primary'}
          >
            {formatCurrency(card.currentBalance)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Disponível:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatCurrency(card.limit - card.currentBalance)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Vencimento:
          </Typography>
          <Typography variant="body2">
            {card.dueDate}º
          </Typography>
        </Box>

        <ProgressContainer>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="caption" color="text.secondary">
              Utilização
            </Typography>
            <Typography variant="caption" fontWeight="bold">
              {utilization.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(utilization, 100)}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(0,0,0,0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: progressColor,
              }
            }}
          />
        </ProgressContainer>
      </CardContent>

      <CardActions>
        <IconButton
          size="small"
          onClick={() => onEdit(card)}
          color="primary"
        >
          <Edit />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onDelete(card.id)}
          color="error"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};

export default CreditCard;

