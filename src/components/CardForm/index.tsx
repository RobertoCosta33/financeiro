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
import { CreditCard as CreditCardType } from '../../types';
import {
  StyledDialog,
  FormContainer,
  FormRow,
  ButtonContainer
} from './styles';

interface CardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (card: Omit<CreditCardType, 'id'>) => void;
  card?: CreditCardType;
}

const CardForm: React.FC<CardFormProps> = ({ open, onClose, onSubmit, card }) => {
  const [formData, setFormData] = useState({
    name: '',
    limit: '',
    currentBalance: '',
    weeklyLimit: '',
    type: 'credit' as 'credit' | 'debit' | 'checking',
    color: '#1976d2',
    dueDate: '',
    closingDate: ''
  });

  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name || '',
        limit: (card.limit || 0).toString(),
        currentBalance: (card.currentBalance || 0).toString(),
        weeklyLimit: card.weeklyLimit ? card.weeklyLimit.toString() : '',
        type: card.type || 'credit',
        color: card.color || '#1976d2',
        dueDate: (card.dueDate || 1).toString(),
        closingDate: (card.closingDate || 1).toString()
      });
    } else {
      setFormData({
        name: '',
        limit: '',
        currentBalance: '',
        weeklyLimit: '',
        type: 'credit',
        color: '#1976d2',
        dueDate: '',
        closingDate: ''
      });
    }
  }, [card]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weeklyLimitValue = formData.weeklyLimit ? parseFloat(formData.weeklyLimit) : undefined;
    
    // Validar se o limite semanal é válido (mínimo R$ 10,00)
    if (weeklyLimitValue !== undefined && weeklyLimitValue < 10) {
      alert('O limite semanal deve ser pelo menos R$ 10,00 ou deixe em branco para não usar limite semanal.');
      return;
    }
    
    onSubmit({
      name: formData.name,
      limit: parseFloat(formData.limit) || 0,
      currentBalance: parseFloat(formData.currentBalance) || 0,
      weeklyLimit: weeklyLimitValue,
      type: formData.type,
      color: formData.color,
      dueDate: parseInt(formData.dueDate) || 1,
      closingDate: parseInt(formData.closingDate) || 1
    });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {card ? 'Editar Cartão' : 'Adicionar Novo Cartão'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <TextField
              label="Nome do Cartão"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />

            <FormRow>
              <TextField
                label="Limite Total"
                type="number"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                fullWidth
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
              <TextField
                label="Saldo Atual"
                type="number"
                value={formData.currentBalance}
                onChange={(e) => setFormData({ ...formData, currentBalance: e.target.value })}
                fullWidth
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
            </FormRow>

            <FormRow>
              <TextField
                label="Limite Semanal (Opcional)"
                type="number"
                value={formData.weeklyLimit}
                onChange={(e) => setFormData({ ...formData, weeklyLimit: e.target.value })}
                fullWidth
                inputProps={{ min: 0, step: 0.01 }}
                helperText="Mínimo R$ 10,00 ou deixe em branco"
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => setFormData({ ...formData, weeklyLimit: '' })}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                Remover
              </Button>
            </FormRow>

            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                label="Tipo"
              >
                <MenuItem value="credit">Cartão de Crédito</MenuItem>
                <MenuItem value="debit">Cartão de Débito</MenuItem>
                <MenuItem value="checking">Conta Corrente</MenuItem>
              </Select>
            </FormControl>

            <FormRow>
              <TextField
                label="Dia do Vencimento"
                type="number"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                fullWidth
                required
                inputProps={{ min: 1, max: 31 }}
              />
              <TextField
                label="Dia do Fechamento"
                type="number"
                value={formData.closingDate}
                onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                fullWidth
                required
                inputProps={{ min: 1, max: 31 }}
              />
            </FormRow>

            <Box>
              <TextField
                label="Cor do Cartão"
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
                {card ? 'Atualizar' : 'Adicionar'}
              </Button>
            </ButtonContainer>
          </FormContainer>
        </form>
      </DialogContent>
    </StyledDialog>
  );
};

export default CardForm;

