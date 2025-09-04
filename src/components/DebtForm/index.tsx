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
import { Debt as DebtType, CreditCard } from '../../types';
import {
  StyledDialog,
  FormContainer,
  FormRow,
  ButtonContainer
} from './styles';

interface DebtFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (debt: Omit<DebtType, 'id'>) => void;
  debt?: DebtType;
  selectedCardId?: string | null;
  cards: CreditCard[];
}

const DebtForm: React.FC<DebtFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  debt, 
  selectedCardId,
  cards 
}) => {
  const [formData, setFormData] = useState({
    cardId: '',
    description: '',
    amount: '',
    date: '',
    category: '',
    isPaid: false,
    totalInstallments: '1',
    remainingInstallments: '1',
    installmentValue: ''
  });

  useEffect(() => {
    if (debt) {
      setFormData({
        cardId: debt.cardId,
        description: debt.description,
        amount: debt.amount.toString(),
        date: debt.date,
        category: debt.category,
        isPaid: debt.isPaid,
        totalInstallments: (debt.totalInstallments || 1).toString(),
        remainingInstallments: (debt.remainingInstallments || 1).toString(),
        installmentValue: (debt.installmentValue || debt.amount).toString()
      });
    } else if (selectedCardId) {
      setFormData({
        cardId: selectedCardId,
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        isPaid: false,
        totalInstallments: '1',
        remainingInstallments: '1',
        installmentValue: ''
      });
    } else {
      setFormData({
        cardId: '',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        isPaid: false,
        totalInstallments: '1',
        remainingInstallments: '1',
        installmentValue: ''
      });
    }
  }, [debt, selectedCardId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cardId: formData.cardId,
      description: formData.description,
      amount: parseFloat(formData.amount) || 0,
      date: formData.date,
      category: formData.category,
      isPaid: formData.isPaid,
      totalInstallments: parseInt(formData.totalInstallments) || 1,
      remainingInstallments: parseInt(formData.remainingInstallments) || 1,
      installmentValue: parseFloat(formData.installmentValue) || parseFloat(formData.amount) || 0
    });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {debt ? 'Editar Dívida' : 'Adicionar Nova Dívida'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormControl fullWidth>
              <InputLabel>Cartão</InputLabel>
              <Select
                value={formData.cardId}
                onChange={(e) => setFormData({ ...formData, cardId: e.target.value })}
                label="Cartão"
                disabled={!!selectedCardId}
              >
                {(cards || []).map((card) => (
                  <MenuItem key={card.id} value={card.id}>
                    {card.name} - {card.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Descrição da Dívida"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              required
              placeholder="Ex: Compras no supermercado"
            />

                         <FormRow>
               <TextField
                 label="Valor Total"
                 type="number"
                 value={formData.amount}
                 onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                 fullWidth
                 required
                 inputProps={{ min: 0, step: 0.01 }}
               />
               <TextField
                 label="Data"
                 type="date"
                 value={formData.date}
                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                 fullWidth
                 required
               />
             </FormRow>

             <FormRow>
               <TextField
                 label="Total de Parcelas"
                 type="number"
                 value={formData.totalInstallments}
                 onChange={(e) => {
                   const total = parseInt(e.target.value) || 1;
                   setFormData({ 
                     ...formData, 
                     totalInstallments: e.target.value,
                     remainingInstallments: Math.min(parseInt(formData.remainingInstallments) || 1, total).toString()
                   });
                 }}
                 fullWidth
                 required
                 inputProps={{ min: 1, max: 60 }}
               />
               <TextField
                 label="Parcelas Restantes"
                 type="number"
                 value={formData.remainingInstallments}
                 onChange={(e) => setFormData({ ...formData, remainingInstallments: e.target.value })}
                 fullWidth
                 required
                 inputProps={{ min: 0, max: parseInt(formData.totalInstallments) || 1 }}
               />
             </FormRow>

             <TextField
               label="Valor da Parcela"
               type="number"
               value={formData.installmentValue}
               onChange={(e) => setFormData({ ...formData, installmentValue: e.target.value })}
               fullWidth
               required
               inputProps={{ min: 0, step: 0.01 }}
               helperText="Valor de cada parcela"
             />

            <TextField
              label="Categoria"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
              placeholder="Ex: Alimentação, Lazer, Transporte..."
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isPaid}
                  onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
                />
              }
              label="Dívida Paga"
            />

            <ButtonContainer>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {debt ? 'Atualizar' : 'Adicionar'}
              </Button>
            </ButtonContainer>
          </FormContainer>
        </form>
      </DialogContent>
    </StyledDialog>
  );
};

export default DebtForm;
