import React from 'react';

import { z } from 'zod';
import { View } from 'react-native';
import { router, Stack } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateExpense } from '@lib/api/expenses';

import { Text } from '@components/ui/text';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';

import Spinner from '@components/spinner';
import { Container } from '@components/container';

const formSchema = z.object({
  notes: z.string().min(1, 'Notes is required'),
  amount: z.number().min(1, 'Amount is required'),
});

export default function NewRecord() {
  const { mutateAsync } = useCreateExpense();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
      amount: 0,
    },
  });

  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync(data);
      form.reset();

      // After successful creation, navigate to home page
      router.replace('/');
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Create New' }} />
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>Create new record</CardTitle>
            <CardDescription>Create a new expnse record to track your progress.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Controller
              name="notes"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <View className="flex flex-col gap-2">
                  <Label htmlFor="notes" nativeID="notes">
                    Notes
                  </Label>
                  <Input
                    placeholder="Groceries..."
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="notes"
                  />
                  {form.formState.errors.notes && (
                    <Text className="text-red-500">{form.formState.errors.notes.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              name="amount"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <View className="flex flex-col gap-2">
                  <Label htmlFor="amount" nativeID="amount">
                    Amount
                  </Label>
                  <Input
                    keyboardType="numeric"
                    placeholder="1000"
                    onChangeText={(text) => onChange(text === '' ? 0 : parseFloat(text))}
                    value={value.toString()}
                    aria-labelledby="amount"
                  />
                  {form.formState.errors.amount && (
                    <Text className="text-red-500">{form.formState.errors.amount.message}</Text>
                  )}
                </View>
              )}
            />

            <Button onPress={form.handleSubmit(submitHandler)} className="w-full bg-primary">
              {form.formState.isLoading ? <Spinner /> : <Text className="text-white">Create</Text>}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
