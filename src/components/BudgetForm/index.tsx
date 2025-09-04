import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { BudgetLimit as BudgetLimitType } from '../../types';
import {
  StyledDialog,
  FormContainer,
  FormRow,
  ButtonContainer
} from './styles';

interface BudgetFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (budgetLimit: Omit<BudgetLimitType, 'id'>) => void;
  budgetLimit?: BudgetLimitType;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ open, onClose, onSubmit, budgetLimit }) => {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    spent: '',
    period: 'monthly' as 'weekly' | 'monthly',
    color: '#1976d2'
  });

  useEffect(() => {
    if (budgetLimit) {
      setFormData({
        category: budgetLimit.category,
        limit: budgetLimit.limit.toString(),
        spent: budgetLimit.spent.toString(),
        period: budgetLimit.period,
        color: budgetLimit.color
      });
    } else {
      setFormData({
        category: '',
        limit: '',
        spent: '',
        period: 'monthly',
        color: '#1976d2'
      });
    }
  }, [budgetLimit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category: formData.category,
      limit: parseFloat(formData.limit) || 0,
      spent: parseFloat(formData.spent) || 0,
      period: formData.period,
      color: formData.color
    });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {budgetLimit ? 'Editar Limite de Orçamento' : 'Adicionar Limite de Orçamento'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <TextField
              label="Categoria"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
              required
              placeholder="Ex: Lazer, Alimentação, Transporte..."
            />

            <FormRow>
              <TextField
                label="Limite"
                type="number"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                fullWidth
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
              <TextField
                label="Gasto Atual"
                type="number"
                value={formData.spent}
                onChange={(e) => setFormData({ ...formData, spent: e.target.value })}
                fullWidth
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
            </FormRow>

            <FormControl fullWidth>
              <InputLabel>Período</InputLabel>
              <Select
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value as any })}
                label="Período"
              >
                <MenuItem value="weekly">Semanal</MenuItem>
                <MenuItem value="monthly">Mensal</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <TextField
                label="Cor da Categoria"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                fullWidth
                required
              />
            </Box>

            <ButtonContainer>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {budgetLimit ? 'Atualizar' : 'Adicionar'}
              </Button>
            </ButtonContainer>
          </FormContainer>
        </form>
      </DialogContent>
    </StyledDialog>
  );
};

export default BudgetForm;

