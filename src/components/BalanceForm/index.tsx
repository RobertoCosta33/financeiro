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
  FormControlLabel,
  Checkbox,
  Box
} from '@mui/material';
import { Balance as BalanceType } from '../../types';
import {
  StyledDialog,
  FormContainer,
  FormRow,
  ButtonContainer
} from './styles';

interface BalanceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (balance: Omit<BalanceType, 'id'>) => void;
  balance?: BalanceType;
}

const BalanceForm: React.FC<BalanceFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  balance 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: 'other' as const,
    description: '',
    date: '',
    isRecurring: false,
    frequency: 'monthly' as const
  });

  useEffect(() => {
    if (balance) {
      setFormData({
        name: balance.name || '',
        amount: (balance.amount || 0).toString(),
        type: balance.type || 'other',
        description: balance.description || '',
        date: balance.date || new Date().toISOString().split('T')[0],
        isRecurring: balance.isRecurring || false,
        frequency: balance.frequency || 'monthly'
      });
    } else {
      setFormData({
        name: '',
        amount: '',
        type: 'other',
        description: '',
        date: new Date().toISOString().split('T')[0],
        isRecurring: false,
        frequency: 'monthly'
      });
    }
  }, [balance]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      amount: parseFloat(formData.amount) || 0,
      type: formData.type,
      description: formData.description,
      date: formData.date,
      isRecurring: formData.isRecurring,
      frequency: formData.isRecurring ? formData.frequency : undefined
    });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {balance ? 'Editar Saldo' : 'Adicionar Novo Saldo'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <TextField
              label="Nome do Saldo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
              placeholder="Ex: Salário, Bônus, Investimentos..."
            />

            <FormRow>
              <TextField
                label="Valor"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                fullWidth
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  label="Tipo"
                >
                  <MenuItem value="salary">Salário</MenuItem>
                  <MenuItem value="bonus">Bônus</MenuItem>
                  <MenuItem value="investment">Investimento</MenuItem>
                  <MenuItem value="other">Outro</MenuItem>
                </Select>
              </FormControl>
            </FormRow>

            <TextField
              label="Descrição"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              placeholder="Ex: Salário da empresa, Bônus de fim de ano..."
              multiline
              rows={2}
            />

            <FormRow>
              <TextField
                label="Data"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                fullWidth
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                  />
                }
                label="Recorrente"
              />
            </FormRow>

            {formData.isRecurring && (
              <FormControl fullWidth>
                <InputLabel>Frequência</InputLabel>
                <Select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                  label="Frequência"
                >
                  <MenuItem value="weekly">Semanal</MenuItem>
                  <MenuItem value="monthly">Mensal</MenuItem>
                  <MenuItem value="yearly">Anual</MenuItem>
                </Select>
              </FormControl>
            )}

            <ButtonContainer>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {balance ? 'Atualizar' : 'Adicionar'}
              </Button>
            </ButtonContainer>
          </FormContainer>
        </form>
      </DialogContent>
    </StyledDialog>
  );
};

export default BalanceForm;
