import React from 'react';

import { z } from 'zod';
import { Text } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { router, Stack, useLocalSearchParams } from 'expo-router';

import { useExpense, useUpdateExpense } from '@lib/api/expenses';

import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';

import { Container } from '@components/container';

import Spinner from '@components/spinner';

const formSchema = z.object({
  notes: z.string().min(1, 'Notes is required'),
  amount: z.number().min(1, 'Amount is required'),
});

function ExpenseUpdate() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useExpense(id as string);
  const { mutateAsync } = useUpdateExpense();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
      amount: 0,
    },
  });

  React.useEffect(() => {
    if (data) {
      form.reset({
        notes: data.notes,
        amount: data.amount,
      });
    }
  }, [data]);

  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({ id: id as string, ...data });

      form.reset();

      // After successful update, navigate to home page
      router.back();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Update Expense' }} />
      <Container>
        <Card>
          {isLoading && <Spinner />}
          {isError && <Text>Error: {error.message}</Text>}
          {data && (
            <>
              <CardHeader>
                <CardTitle>Update Expense</CardTitle>
                <CardDescription>Update the expense record to track your progress.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Controller
                  name="notes"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Notes"
                      value={value}
                      onChangeText={onChange}
                      className="w-full"
                    />
                  )}
                />

                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Amount"
                      value={value.toString()}
                      onChangeText={(text) => onChange(Number(text))}
                      className="w-full"
                    />
                  )}
                />

                <Button onPress={form.handleSubmit(submitHandler)}>
                  {form.formState.isLoading ? (
                    <Spinner />
                  ) : (
                    <Text className="text-white">Update</Text>
                  )}
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}

export default ExpenseUpdate;
