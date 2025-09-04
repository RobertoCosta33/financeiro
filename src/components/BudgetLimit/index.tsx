import React from 'react';
import {
  Typography,
  LinearProgress,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import { Edit, Delete, AccountBalance } from '@mui/icons-material';
import { BudgetLimit as BudgetLimitType } from '../../types';
import { calculateBudgetPercentage, formatCurrency, getBudgetColor } from '../../utils/calculations';
import {
  StyledCard,
  BudgetHeader,
  BudgetContent,
  ProgressContainer,
  BudgetActions
} from './styles';

interface BudgetLimitProps {
  budgetLimit: BudgetLimitType;
  onEdit: (budgetLimit: BudgetLimitType) => void;
  onDelete: (id: string) => void;
}

const BudgetLimit: React.FC<BudgetLimitProps> = ({ budgetLimit, onEdit, onDelete }) => {
  const percentage = calculateBudgetPercentage(budgetLimit.limit, budgetLimit.spent);
  const progressColor = getBudgetColor(percentage);

  return (
    <StyledCard>
      <BudgetHeader>
        <Box display="flex" alignItems="center" gap={1}>
          <AccountBalance color="primary" />
          <Typography variant="h6" component="div">
            {budgetLimit.category}
          </Typography>
        </Box>
        <Chip 
          label={budgetLimit.period} 
          size="small" 
          color={budgetLimit.period === 'weekly' ? 'primary' : 'secondary'}
        />
      </BudgetHeader>

      <BudgetContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Limite:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatCurrency(budgetLimit.limit)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Gasto:
          </Typography>
          <Typography 
            variant="body2" 
            fontWeight="bold"
            color={percentage > 80 ? 'error' : 'text.primary'}
          >
            {formatCurrency(budgetLimit.spent)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Restante:
          </Typography>
          <Typography 
            variant="body2" 
            fontWeight="bold"
            color={budgetLimit.limit - budgetLimit.spent < 0 ? 'error' : 'success.main'}
          >
            {formatCurrency(budgetLimit.limit - budgetLimit.spent)}
          </Typography>
        </Box>

        <ProgressContainer>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="caption" color="text.secondary">
              Progresso
            </Typography>
            <Typography variant="caption" fontWeight="bold">
              {percentage.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(percentage, 100)}
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
      </BudgetContent>

      <BudgetActions>
        <IconButton
          size="small"
          onClick={() => onEdit(budgetLimit)}
          color="primary"
        >
          <Edit />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onDelete(budgetLimit.id)}
          color="error"
        >
          <Delete />
        </IconButton>
      </BudgetActions>
    </StyledCard>
  );
};

export default BudgetLimit;

