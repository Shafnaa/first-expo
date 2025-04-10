import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { BACKEND_URL } from '@lib/constants';

// Define types
export interface Expense {
  id: string;
  amount: number;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export type ExpenseCreateInput = Omit<Expense, 'id'>;
export type ExpenseUpdateInput = Partial<ExpenseCreateInput>;

// API base URL
const API_BASE_URL = `${BACKEND_URL}/expenses`;

// API functions
export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data.data;
};

export const fetchExpenseById = async (id: string): Promise<Expense> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data.data;
};

export const createExpense = async (expense: ExpenseCreateInput): Promise<Expense> => {
  const response = await axios.post(API_BASE_URL, expense);
  return response.data.data;
};

export const updateExpense = async ({
  id,
  ...data
}: { id: string } & ExpenseUpdateInput): Promise<Expense> => {
  const response = await axios.patch(`${API_BASE_URL}/${id}`, data);
  return response.data.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data.message;
};

// React Query hooks
export const useExpenses = () => {
  return useQuery<Expense[], Error>({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
  });
};

export const useExpense = (id: string) => {
  return useQuery<Expense, Error>({
    queryKey: ['expenses', id],
    queryFn: () => fetchExpenseById(id),
    enabled: Boolean(id),
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<Expense, Error, ExpenseCreateInput>({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<Expense, Error, { id: string } & ExpenseUpdateInput>({
    mutationFn: updateExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expenses', data.id] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};
